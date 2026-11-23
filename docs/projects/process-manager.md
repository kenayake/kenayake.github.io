# C Process Manager — Native Linux Task Manager

This Windows Task Manager clone was a project I made during my journey learning low-level programming and C. It's a native GTK 4 Linux process monitor that tracks live system and process usage through `/proc`. Features include hierarchical process groups, real-time CPU and disk usage, process search and management, and theme preferences using GSettings.

---

<ProjectCarousel
  title="C Process Manager Desktop Interface"
  :slides="[
    { src: '/images/process-manager/screenshot_1.png', alt: 'C Process Manager Dark Mode', caption: 'Dark Theme: Live Process Table, Resource Columns, Hierarchical PGID Process Trees' },
    { src: '/images/process-manager/screenshot_2.png', alt: 'C Process Manager Settings Page', caption: 'Application Settings: GSettings-Backed Theme Preferences & Refresh Rates' },
    { src: '/images/process-manager/screenshot_3.png', alt: 'C Process Manager Light Mode with Expanded Trees', caption: 'Light Theme: Search Filtering, Dynamic Sorters & Resource Highlighting' }
  ]"
/>

---

## 🛠️ Technology Stack & Architecture

- **Core Language**: C11 (manual memory lifecycles, POSIX system interfaces).
- **Desktop UI & Toolkit**: GTK 4, GLib / GObject, GResource asset compilation.
- **Linux Telemetry**: Linux `/proc` filesystem (`stat`, `status`, `statm`, `io`), POSIX signals.
- **Build & Packaging**: Meson & Ninja.

```
┌───────────────────────────────────────┐
│ Linux Kernel Telemetry                │
│ ├── /proc/[pid] (stat, status, io)    │
│ └── /proc (stat, meminfo, diskstats)  │
└───────────────────┬───────────────────┘
                    │ Raw C Telemetry
                    ▼
┌───────────────────────────────────────┐
│ Three-Pass Model Engine               │
│ ├── Pass 1: Scan & PGID Grouping      │
│ ├── Pass 2: In-place Reconcile & Prune│
│ └── Pass 3: Append New Groups/Children│
└───────────────────┬───────────────────┘
                    │ GObject Property Bindings
                    ▼
┌───────────────────────────────────────┐
│ GTK 4 Desktop Interface               │
│ ├── GtkColumnView (Zero-flicker view) │
│ ├── GtkTreeListModel (PGID hierarchy) │
│ └── GSettings (Theme & Preferences)   │
└───────────────────────────────────────┘
```

---

## 🚀 Key Engineering Contributions

### 1. Multi-File `/proc` Scraping & Metric Delta Computation
I parsed Linux pseudo-files directly in C without high-level library wrappers. I extracted execution states, priority, and CPU ticks from `/proc/[pid]/stat`, Resident Set Size from `/proc/[pid]/status`, memory page breakdowns from `statm`, and I/O throughput from `io`. Using global CPU and disk baselines from `/proc/stat` and `/proc/diskstats`, I computed accurate, normalized percentage deltas across user-configured refresh intervals.

### 2. Three-Pass Process Model Synchronization
To keep the GTK 4 list store synchronized with volatile OS processes without expensive UI recreations, I built a three-pass synchronization pipeline:
- **Pass 1**: Scans active processes from `/proc` and groups them by Process Group ID (PGID).
- **Pass 2**: Reconciles against existing `GListStore` items in-place, updating active metrics and pruning dead processes to avoid UI flickering and preserve selection states.
- **Pass 3**: Inserts newly discovered process groups and appends child subprocesses to their respective parent trees.

### 3. Modern GTK 4 List Architecture & Desktop Integration
I structured the UI using modern GTK 4 list primitives (`GtkColumnView`, `GtkTreeListModel`, `GtkFilterListModel`, and `GtkSortListModel`) to render hundreds of processes smoothly. I implemented real-time multi-field search (by name, PID, or user), context actions for inspecting process metadata and dispatching POSIX termination signals (`SIGTERM`, `SIGKILL`), and full GNOME desktop integration via GSettings preferences, GResource asset bundling, and Flatpak packaging.

---

## 🔗 Project Links

- 💻 [GitHub Repository](https://github.com/kenayake/c-process-manager-linux)
