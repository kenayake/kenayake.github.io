/**
 * Kenneth Evan Ekanayake - Portfolio Scripts
 * Handles Theme Toggle, Navigation, Carousels, and the Zoomable/Pannable Lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Navigation & Theme Toggle
       ========================================================================== */
    
    // Theme Toggle Elements
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-moon';
    }

    // Toggle Theme Click Event
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    // Mobile Menu Toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        mobileNavToggle.querySelector('i').className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close Mobile Menu on Nav Link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // Scroll Active State Highlighter
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       2. Carousel Engine
       ========================================================================== */

    // Array to store info about all carousels for lightbox usage
    const carouselsData = {};

    const carouselContainers = document.querySelectorAll('.carousel');
    
    carouselContainers.forEach(carousel => {
        const id = carousel.getAttribute('data-carousel-id');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        const dots = carousel.querySelectorAll('.indicator-dot');
        
        let currentIndex = 0;
        const totalItems = items.length;

        // Store slides sources and captions for lightbox connection
        const slides = Array.from(items).map(item => {
            const img = item.querySelector('.carousel-img');
            const caption = item.querySelector('.carousel-caption');
            return {
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                caption: caption ? caption.textContent : ''
            };
        });

        carouselsData[id] = {
            slides: slides,
            currentIndex: currentIndex
        };

        // Navigation Functions
        const updateCarousel = (newIndex) => {
            // Remove active classes
            items[currentIndex].classList.remove('active');
            if (dots.length > 0) dots[currentIndex].classList.remove('active');
            
            currentIndex = (newIndex + totalItems) % totalItems;
            
            // Add active classes
            items[currentIndex].classList.add('active');
            if (dots.length > 0) dots[currentIndex].classList.add('active');
            
            // Update reference
            carouselsData[id].currentIndex = currentIndex;
        };

        // Event Listeners for controls
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering lightbox click
            updateCarousel(currentIndex - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering lightbox click
            updateCarousel(currentIndex + 1);
        });

        // Click indicators dots
        dots.forEach((dot, dotIdx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCarousel(dotIdx);
            });
        });

        // Image Click -> Trigger Lightbox
        items.forEach((item, itemIdx) => {
            const img = item.querySelector('.carousel-img');
            img.addEventListener('click', () => {
                openLightbox(id, itemIdx);
            });
        });
    });


    /* ==========================================================================
       3. Zoomable & Pannable Lightbox
       ========================================================================== */

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const zoomLevelEl = document.getElementById('zoomLevel');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    // Zoom control buttons
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomResetBtn = document.getElementById('zoomReset');

    // Lightbox State
    let activeCarouselId = null;
    let currentImageIndex = 0;
    
    // Zoom/Pan State
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    
    // Drag/Pan State
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Mobile touch pinch state
    let lastTouchDistance = 0;

    // Minimum & Maximum Zoom settings
    const MIN_SCALE = 1;
    const MAX_SCALE = 5;
    const ZOOM_STEP = 0.25;

    // Open Lightbox
    const openLightbox = (carouselId, index) => {
        activeCarouselId = carouselId;
        currentImageIndex = index;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
        
        loadImage(currentImageIndex);
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable background scrolling
        
        // Reset transforms
        resetZoom();
        
        activeCarouselId = null;
    };

    // Load Image in Lightbox
    const loadImage = (index) => {
        if (!activeCarouselId) return;
        const projectData = carouselsData[activeCarouselId];
        const slide = projectData.slides[index];
        
        // Disable transition while replacing src to avoid ugly jumps
        lightboxImg.style.transition = 'none';
        lightboxImg.src = slide.src;
        lightboxImg.alt = slide.alt;
        lightboxCaption.textContent = slide.caption;
        
        // Show/hide navigation arrows based on total slides
        if (projectData.slides.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }

        // Wait for image loading to apply transitions again
        lightboxImg.onload = () => {
            lightboxImg.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        };

        resetZoom();
    };

    // Next / Previous Lightbox Image
    const navigateLightbox = (direction) => {
        if (!activeCarouselId) return;
        const projectData = carouselsData[activeCarouselId];
        const totalSlides = projectData.slides.length;
        
        currentImageIndex = (currentImageIndex + direction + totalSlides) % totalSlides;
        loadImage(currentImageIndex);
    };

    // Zoom Functions
    const setZoom = (newScale, focusX = null, focusY = null) => {
        const prevScale = scale;
        scale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
        
        // If zooming, calculate offset adjustments so zoom targets mouse position
        if (focusX !== null && focusY !== null && scale !== prevScale) {
            const rect = lightboxImg.getBoundingClientRect();
            
            // Coordinates relative to the image center
            const imgCenterX = rect.left + rect.width / 2;
            const imgCenterY = rect.top + rect.height / 2;
            
            // Factor of scale difference
            const factor = (scale / prevScale) - 1;
            
            translateX -= (focusX - imgCenterX) * factor;
            translateY -= (focusY - imgCenterY) * factor;
        }

        applyTransform();
        updateZoomLabel();
    };

    const resetZoom = () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
        updateZoomLabel();
    };

    const updateZoomLabel = () => {
        zoomLevelEl.textContent = `${Math.round(scale * 100)}%`;
    };

    const applyTransform = () => {
        // Enforce boundary constraints when zoomed out or in
        if (scale === 1) {
            translateX = 0;
            translateY = 0;
            lightboxImg.style.cursor = 'zoom-in';
        } else {
            lightboxImg.style.cursor = 'grab';
            
            // Constrain dragging offsets to keep the image centered/bounded inside viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const imgWidth = lightboxImg.offsetWidth * scale;
            const imgHeight = lightboxImg.offsetHeight * scale;
            
            const maxOffsetX = Math.max(0, (imgWidth - viewportWidth) / 2 + 100);
            const maxOffsetY = Math.max(0, (imgHeight - viewportHeight) / 2 + 100);
            
            translateX = Math.min(Math.max(translateX, -maxOffsetX), maxOffsetX);
            translateY = Math.min(Math.max(translateY, -maxOffsetY), maxOffsetY);
        }
        
        lightboxImg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    };

    /* ==========================================================================
       4. Mouse and Touch Event Listeners for Lightbox
       ========================================================================== */

    // Close on Close button or Overlay click
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        // Close if click is outside the image, toolbar, or navigation buttons
        if (e.target === lightbox || e.target === document.getElementById('lightboxContent')) {
            closeLightbox();
        }
    });

    // Navigation arrow clicks
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    // Zoom Toolbar Click Handlers
    zoomInBtn.addEventListener('click', () => setZoom(scale + ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => setZoom(scale - ZOOM_STEP));
    zoomResetBtn.addEventListener('click', resetZoom);

    // Mouse scroll to zoom
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = -e.deltaY;
        const zoomFactor = delta > 0 ? (1 + ZOOM_STEP) : (1 - ZOOM_STEP);
        
        // Perform zoom centered on mouse cursor position
        setZoom(scale * zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Double click to toggle zoom (1x to 2.5x)
    lightboxImg.addEventListener('dblclick', (e) => {
        if (scale > 1) {
            resetZoom();
        } else {
            setZoom(2.5, e.clientX, e.clientY);
        }
    });

    // Drag / Pan mouse events
    lightboxImg.addEventListener('mousedown', (e) => {
        if (scale <= 1) return; // Only allow panning when zoomed
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.transition = 'none'; // Instant response on drag
        lightboxImg.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        lightboxImg.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        lightboxImg.style.cursor = 'grab';
    });

    // Mobile Touch/Gestures (Pinch to Zoom & Touch Pan)
    lightboxImg.addEventListener('touchstart', (e) => {
        lightboxImg.style.transition = 'none';
        
        if (e.touches.length === 1 && scale > 1) {
            // Touch Pan Start
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        } else if (e.touches.length === 2) {
            // Touch Pinch Start
            isDragging = false;
            lastTouchDistance = getTouchDistance(e.touches);
        }
    }, { passive: true });

    lightboxImg.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging) {
            // Touch Pan Drag
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            applyTransform();
        } else if (e.touches.length === 2) {
            // Touch Pinch Move
            const currentDistance = getTouchDistance(e.touches);
            const factor = currentDistance / lastTouchDistance;
            
            // Calculate pinch center coordinates
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            
            setZoom(scale * factor, midX, midY);
            lastTouchDistance = currentDistance;
        }
    }, { passive: true });

    lightboxImg.addEventListener('touchend', () => {
        isDragging = false;
        lightboxImg.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Helper: calculate distance between two fingers
    const getTouchDistance = (touches) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Keyboard support: Escape to exit, Arrows to navigate
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

});
