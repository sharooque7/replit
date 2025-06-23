import { useState } from "react";
import {
  ArrowLeft,
  Code,
  Database,
  Server,
  Brain,
  Monitor,
  Network,
  X,
  Play,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface useCase {
  useCase: string;
  link: string;
}
interface Problem {
  name: string;
  link: string;
}

interface ConceptDetails {
  overview: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  keyTechniques: {
    name: string;
    explanation: string;
    codeExample: string;
    useCases: useCase[];
  }[];
  commonProblems: Problem[];
}

interface Concept {
  name: string;
  description: string;
  difficulty: string;
  topics: string[];
  details?: ConceptDetails;
}

const projectCategories: Record<
  string,
  {
    title: string;
    icon: any;
    description: string;
    concepts: Concept[];
  }
> = {
  "system-design": {
    title: "System Design",
    icon: Network,
    description: "Large-scale distributed systems and architecture patterns",
    concepts: [
      {
        name: "Load Balancing",
        description:
          "Horizontal scaling with Nginx and HAProxy implementations",
        difficulty: "Intermediate",
        topics: [
          "Round Robin",
          "Weighted Routing",
          "Health Checks",
          "Session Persistence",
        ],
      },
      {
        name: "Database Sharding",
        description: "Partitioning strategies for PostgreSQL at scale",
        difficulty: "Advanced",
        topics: [
          "Horizontal Partitioning",
          "Consistent Hashing",
          "Cross-shard Queries",
          "Rebalancing",
        ],
      },
      {
        name: "Microservices Architecture",
        description: "Service decomposition and communication patterns",
        difficulty: "Advanced",
        topics: [
          "Service Discovery",
          "Circuit Breaker",
          "Event Sourcing",
          "SAGA Pattern",
        ],
      },
      {
        name: "Caching Strategies",
        description: "Redis and Memcached implementation patterns",
        difficulty: "Intermediate",
        topics: [
          "Cache-aside",
          "Write-through",
          "Write-behind",
          "Cache Invalidation",
        ],
      },
    ],
  },
  linux: {
    title: "Linux & DevOps",
    icon: Monitor,
    description: "System administration and infrastructure automation",
    concepts: [
      {
        name: "Process Management",
        description:
          "Understanding, controlling, and monitoring Linux system processes.",
        difficulty: "Beginner",
        topics: [
          "Foreground/Background",
          "Signals",
          "Systemd",
          "Monitoring Tools",
        ],
        details: {
          overview:
            "Process management in Linux involves handling the lifecycle of system processes — from creation and execution to termination. It also includes monitoring, signaling, and configuring services using tools like `ps`, `top`, and `systemctl`.",
          timeComplexity:
            "O(1) for signaling; O(n) for scanning all processes (e.g., ps/top)",
          spaceComplexity:
            "Depends on number of active processes; typically O(n)",
          keyTechniques: [
            {
              name: "Listing and Managing Processes",
              explanation:
                "Use commands like `ps`, `top`, and `htop` to list active processes. Combine with `grep`, `sort`, and `kill` to filter and manage them.",
              codeExample: `ps aux | grep python
      kill -9 <PID>
      top`,
              useCases: [
                {
                  useCase: "Find running process by name",
                  link: "https://linux.die.net/man/1/ps",
                },
                {
                  useCase: "Kill a stuck or zombie process",
                  link: "https://linuxize.com/post/how-to-kill-a-process-in-linux/",
                },
                {
                  useCase: "Live monitoring of CPU/memory usage",
                  link: "https://linux.die.net/man/1/top",
                },
              ],
            },
            {
              name: "Background & Foreground Jobs",
              explanation:
                "Run commands in the background using `&`. Use `jobs`, `fg`, `bg`, and `kill` to manage job states.",
              codeExample: `sleep 60 &
      jobs
      fg %1`,
              useCases: [
                {
                  useCase: "Run long tasks in background",
                  link: "https://www.geeksforgeeks.org/run-processes-in-background-linux/",
                },
                {
                  useCase: "Bring background job to foreground",
                  link: "https://linuxize.com/post/how-to-use-fg-command-in-linux/",
                },
                {
                  useCase: "List all active jobs",
                  link: "https://www.baeldung.com/linux/jobs-command",
                },
              ],
            },
            {
              name: "Service Management with systemd",
              explanation:
                "Use `systemctl` to manage system services (start, stop, enable, disable) and inspect logs.",
              codeExample: `systemctl start nginx
      systemctl status nginx
      journalctl -u nginx`,
              useCases: [
                {
                  useCase: "Start or restart a service",
                  link: "https://www.digitalocean.com/community/tutorials/systemctl-essential-commands",
                },
                {
                  useCase: "Enable service on boot",
                  link: "https://www.cyberciti.biz/faq/how-to-enable-disable-services-in-linux/",
                },
                {
                  useCase: "Check service logs",
                  link: "https://www.freedesktop.org/software/systemd/man/journalctl.html",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Kill process using PID",
              link: "https://www.geeksforgeeks.org/how-to-kill-a-process-in-linux/",
            },
            {
              name: "List top CPU-consuming processes",
              link: "https://www.howtogeek.com/668986/how-to-use-the-top-command-on-linux/",
            },
            {
              name: "Restart a systemd service",
              link: "https://www.tecmint.com/manage-systemd-services-using-systemctl-in-linux/",
            },
          ],
        },
      },

      {
        name: "File System & Permissions",
        description:
          "Understand Linux directory structure and manage access using permissions.",
        difficulty: "Beginner",
        topics: ["/bin", "/etc", "/home", "chmod", "chown", "umask"],
        details: {
          overview:
            "The Linux file system is a hierarchical structure starting at the root `/`, organizing everything into directories. File permissions and ownership determine who can read, write, or execute a file or directory, critical for system security and stability.",
          timeComplexity:
            "O(1) for permission changes, O(n) for recursive operations",
          spaceComplexity:
            "Negligible unless processing deeply nested directories",
          keyTechniques: [
            {
              name: "Understanding Linux File System Structure",
              explanation:
                "Familiar directories include `/bin` for binaries, `/etc` for configurations, `/home` for user data, `/var` for logs, and `/tmp` for temporary files. Each serves a distinct system role.",
              codeExample: `ls /
      cd /etc
      ls -l /home`,
              useCases: [
                {
                  useCase: "Locate config files",
                  link: "https://www.geeksforgeeks.org/etc-directory-in-linux/",
                },
                {
                  useCase: "Check user directories",
                  link: "https://www.baeldung.com/linux/home-directory",
                },
                {
                  useCase: "Access executable programs",
                  link: "https://linuxhandbook.com/bin-directory/",
                },
              ],
            },
            {
              name: "File Permissions with chmod",
              explanation:
                "Permissions are divided into user, group, and others. Use `chmod` to set read (r), write (w), and execute (x) permissions.",
              codeExample: `chmod 755 script.sh
      chmod u+x script.sh
      chmod -R 644 /var/www`,
              useCases: [
                {
                  useCase: "Make script executable",
                  link: "https://www.geeksforgeeks.org/chmod-command-linux-example/",
                },
                {
                  useCase: "Restrict access to group/others",
                  link: "https://linuxize.com/post/linux-file-permissions/",
                },
                {
                  useCase: "Change permissions recursively",
                  link: "https://www.cyberciti.biz/faq/linux-recursively-change-file-permissions/",
                },
              ],
            },
            {
              name: "Ownership Management with chown",
              explanation:
                "Each file/directory is owned by a user and a group. Use `chown` to change ownership and `chgrp` to change group.",
              codeExample: `chown user:group file.txt
      chown -R ubuntu:www-data /var/www`,
              useCases: [
                {
                  useCase: "Set ownership after file transfer",
                  link: "https://www.geeksforgeeks.org/chown-command-in-linux-with-examples/",
                },
                {
                  useCase: "Fix web server file permissions",
                  link: "https://linuxize.com/post/linux-chown-command/",
                },
                {
                  useCase: "Assign group ownership",
                  link: "https://www.baeldung.com/linux/chgrp-command",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Permission denied error fix",
              link: "https://phoenixnap.com/kb/linux-file-permissions",
            },
            {
              name: "Make file executable",
              link: "https://linuxize.com/post/how-to-make-a-file-executable-in-linux/",
            },
            {
              name: "Change file owner and group",
              link: "https://www.geeksforgeeks.org/chown-command-in-linux-with-examples/",
            },
          ],
        },
      },
      {
        name: "Networking",
        description:
          "Understanding core networking tools and communication in Linux.",
        difficulty: "Beginner",
        topics: ["IP", "DNS", "Ping", "Netstat", "Curl", "SSH", "Ports"],
        details: {
          overview:
            "Linux networking enables communication between systems and services. Core tools help diagnose, configure, and troubleshoot network connectivity, making networking essential for servers, DevOps, and backend systems.",
          timeComplexity:
            "Most networking tools operate in O(1) or O(n) where n = number of connections/interfaces",
          spaceComplexity: "Negligible for typical diagnostic commands",
          keyTechniques: [
            {
              name: "Check IP and Network Interfaces",
              explanation:
                "Use `ip` or `ifconfig` to list active network interfaces, IP addresses, and connection status.",
              codeExample: `ip a
      ifconfig
      ip route show`,
              useCases: [
                {
                  useCase: "Find local IP address",
                  link: "https://www.cyberciti.biz/faq/how-to-find-ip-address-in-linux/",
                },
                {
                  useCase: "Debug routing issues",
                  link: "https://linuxize.com/post/ip-command-examples/",
                },
                {
                  useCase: "List all network interfaces",
                  link: "https://www.geeksforgeeks.org/ifconfig-command-in-linux-with-examples/",
                },
              ],
            },
            {
              name: "DNS & Connectivity Checks",
              explanation:
                "Use `ping`, `dig`, and `nslookup` to check if hosts are reachable and resolve DNS names to IP addresses.",
              codeExample: `ping google.com
      dig openai.com
      nslookup github.com`,
              useCases: [
                {
                  useCase: "Check server reachability",
                  link: "https://www.geeksforgeeks.org/ping-command-in-linux-with-examples/",
                },
                {
                  useCase: "Debug DNS resolution",
                  link: "https://linuxize.com/post/dig-command-in-linux/",
                },
                {
                  useCase: "Check DNS records",
                  link: "https://www.geeksforgeeks.org/nslookup-command-in-linux-with-examples/",
                },
              ],
            },
            {
              name: "Network Connections & Ports",
              explanation:
                "Use `netstat`, `ss`, and `lsof` to inspect open ports, listening services, and active network connections.",
              codeExample: `netstat -tuln
      ss -tulwn
      lsof -i :8080`,
              useCases: [
                {
                  useCase: "Check what’s using a port",
                  link: "https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/",
                },
                {
                  useCase: "List active TCP/UDP services",
                  link: "https://www.geeksforgeeks.org/netstat-command-in-linux-with-examples/",
                },
                {
                  useCase: "Debug failed network binding",
                  link: "https://linuxize.com/post/ss-command-in-linux/",
                },
              ],
            },
            {
              name: "Curl for HTTP Requests",
              explanation:
                "Use `curl` to test APIs and endpoints by sending HTTP requests directly from the terminal.",
              codeExample: `curl https://api.github.com
      curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' https://api.example.com`,
              useCases: [
                {
                  useCase: "Test REST APIs",
                  link: "https://www.baeldung.com/linux/curl-send-http-request",
                },
                {
                  useCase: "Debug HTTP status codes",
                  link: "https://linuxize.com/post/curl-command-examples/",
                },
                {
                  useCase: "Download files",
                  link: "https://www.geeksforgeeks.org/curl-command-in-linux-with-examples/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Port already in use",
              link: "https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac",
            },
            {
              name: "Unable to resolve DNS",
              link: "https://linuxconfig.org/how-to-fix-dns-problems-using-resolv-conf-in-linux",
            },
            {
              name: "Check if host is reachable",
              link: "https://www.geeksforgeeks.org/ping-command-in-linux-with-examples/",
            },
          ],
        },
      },

      {
        name: "Text Processing",
        description:
          "Powerful command-line tools for manipulating and analyzing text.",
        difficulty: "Beginner",
        topics: ["grep", "awk", "sed", "cut", "sort", "uniq", "wc"],
        details: {
          overview:
            "Linux provides powerful tools for processing and manipulating text directly from the command line. These tools are essential for tasks like filtering logs, extracting fields, transforming data, and counting lines or patterns.",
          timeComplexity:
            "O(n) for line-by-line processing where n is number of lines in a file",
          spaceComplexity:
            "Usually O(1) as most commands stream data line-by-line without full memory load",
          keyTechniques: [
            {
              name: "Pattern Searching with grep",
              explanation:
                "`grep` searches for lines that match a given pattern. Useful for finding errors, filtering logs, or identifying matches.",
              codeExample: `grep "ERROR" app.log
      grep -i "login" server.log | grep -v "success"`,
              useCases: [
                {
                  useCase: "Search error logs",
                  link: "https://www.geeksforgeeks.org/grep-command-in-unixlinux/",
                },
                {
                  useCase: "Filter specific lines",
                  link: "https://linuxize.com/post/grep-command-in-linux/",
                },
                {
                  useCase: "Case-insensitive search",
                  link: "https://www.baeldung.com/linux/grep-case-insensitive",
                },
              ],
            },
            {
              name: "Field Extraction with cut & awk",
              explanation:
                "`cut` extracts specific fields or columns, while `awk` is more powerful for pattern-based processing and field manipulation.",
              codeExample: `cut -d':' -f1 /etc/passwd
      awk '{print $1, $NF}' file.txt`,
              useCases: [
                {
                  useCase: "Extract usernames",
                  link: "https://www.geeksforgeeks.org/cut-command-linux-examples/",
                },
                {
                  useCase: "Print specific fields",
                  link: "https://www.geeksforgeeks.org/awk-command-unixlinux-examples/",
                },
                {
                  useCase: "Transform column format",
                  link: "https://www.baeldung.com/linux/awk-transform-columns",
                },
              ],
            },
            {
              name: "Stream Editing with sed",
              explanation:
                "`sed` is a stream editor used for substitutions, deletions, insertions, and transformations in a text stream.",
              codeExample: `sed 's/error/ERROR/g' logfile.txt
      sed -n '5,10p' config.txt`,
              useCases: [
                {
                  useCase: "Replace text in file",
                  link: "https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/",
                },
                {
                  useCase: "Delete specific lines",
                  link: "https://linuxize.com/post/sed-command-in-linux/",
                },
                {
                  useCase: "Print line ranges",
                  link: "https://www.baeldung.com/linux/sed-line-range",
                },
              ],
            },
            {
              name: "Counting and Sorting Text",
              explanation:
                "Commands like `wc`, `sort`, and `uniq` help with counting lines, sorting text files, and removing duplicates.",
              codeExample: `wc -l file.txt
      sort file.txt | uniq -c`,
              useCases: [
                {
                  useCase: "Count lines or words",
                  link: "https://www.geeksforgeeks.org/wc-command-in-linux-with-examples/",
                },
                {
                  useCase: "Sort a file alphabetically",
                  link: "https://www.geeksforgeeks.org/sort-command-linuxunix-examples/",
                },
                {
                  useCase: "Find duplicate lines",
                  link: "https://linuxize.com/post/uniq-command-in-linux/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Search for keyword in logs",
              link: "https://www.geeksforgeeks.org/grep-command-in-unixlinux/",
            },
            {
              name: "Extract and manipulate columns in a CSV",
              link: "https://www.geeksforgeeks.org/awk-command-unixlinux-examples/",
            },
            {
              name: "Replace text across multiple lines",
              link: "https://linuxize.com/post/sed-command-in-linux/",
            },
          ],
        },
      },
      {
        name: "System Monitoring & Logging",
        description:
          "Monitor performance and analyze system behavior in real time.",
        difficulty: "Intermediate",
        topics: ["top", "htop", "vmstat", "iostat", "journalctl", "log files"],
        details: {
          overview:
            "System monitoring tools help track CPU, memory, disk, and process activity in real time, while logging tools capture system events for debugging, auditing, and performance tuning.",
          timeComplexity:
            "O(1) per sample collection; tools run continuously in background",
          spaceComplexity:
            "Depends on log file size; tools themselves use minimal memory",
          keyTechniques: [
            {
              name: "Real-time Resource Monitoring (top, htop, vmstat, iostat)",
              explanation:
                "Use CLI tools to view running processes, memory usage, CPU load, and I/O statistics in real time.",
              codeExample: `top         # Live process monitoring
      htop        # Enhanced top with GUI
      vmstat 1    # Memory, swap, CPU report every second
      iostat -x 2 # Detailed disk I/O every 2s`,
              useCases: [
                {
                  useCase: "Monitor CPU/memory usage",
                  link: "https://www.geeksforgeeks.org/top-command-in-linux-with-examples/",
                },
                {
                  useCase: "Identify slow I/O",
                  link: "https://www.baeldung.com/linux/iostat-command",
                },
                {
                  useCase: "Analyze memory bottlenecks",
                  link: "https://www.geeksforgeeks.org/vmstat-command-in-linux-with-examples/",
                },
              ],
            },
            {
              name: "System Logs with journalctl & /var/log",
              explanation:
                "`journalctl` queries the systemd journal for logs. `/var/log` contains kernel, auth, application, and daemon logs.",
              codeExample: `journalctl -xe            # Show recent logs with priority
      journalctl -u nginx.service  # Logs from specific service
      tail -f /var/log/syslog      # Follow system logs`,
              useCases: [
                {
                  useCase: "Debug service failures",
                  link: "https://www.baeldung.com/linux/journalctl-command",
                },
                {
                  useCase: "Track authentication events",
                  link: "https://www.tecmint.com/linux-log-files/",
                },
                {
                  useCase: "Live log monitoring",
                  link: "https://linuxize.com/post/using-tail-command-in-linux/",
                },
              ],
            },
            {
              name: "Monitoring Tools Integration",
              explanation:
                "Combine native tools with Prometheus, Grafana, or ELK stack for historical analysis, alerting, and visual dashboards.",
              codeExample: `# Export metrics to Prometheus:
      node_exporter
      
      # Monitor logs with:
      Filebeat -> Logstash -> Elasticsearch -> Kibana`,
              useCases: [
                {
                  useCase: "Visualize metrics with Grafana",
                  link: "https://grafana.com/docs/grafana/latest/getting-started/",
                },
                {
                  useCase: "Centralized log monitoring with ELK",
                  link: "https://www.elastic.co/what-is/elk-stack",
                },
                {
                  useCase: "Set up custom alerts",
                  link: "https://prometheus.io/docs/alerting/latest/alertmanager/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "High CPU usage analysis",
              link: "https://www.geeksforgeeks.org/top-command-in-linux-with-examples/",
            },
            {
              name: "Debug service crash via journalctl",
              link: "https://www.baeldung.com/linux/journalctl-command",
            },
            {
              name: "Track failed SSH login attempts",
              link: "https://linuxhandbook.com/check-login-history-linux/",
            },
          ],
        },
      },
      {
        name: "Disk & Storage",
        description:
          "Understand and manage disk partitions, mounting, and usage.",
        difficulty: "Intermediate",
        topics: [
          "df",
          "du",
          "mount",
          "umount",
          "fstab",
          "lsblk",
          "parted",
          "lvm",
        ],
        details: {
          overview:
            "Disk and storage management involves understanding how storage devices are structured, partitioned, and accessed by the OS. It includes checking disk space, managing mount points, and configuring partitions or logical volumes.",
          timeComplexity:
            "O(1) for command execution; some disk operations can be O(n)",
          spaceComplexity:
            "Depends on output and logs; negligible for most CLI tools",
          keyTechniques: [
            {
              name: "Disk Usage Analysis (df, du)",
              explanation:
                "`df` shows disk space on mounted filesystems. `du` shows file and directory space usage.",
              codeExample: `df -h          # Show disk space in human-readable format
      du -sh *       # Show size of all files/folders in current dir
      du -ah /path   # Recursive file size display`,
              useCases: [
                {
                  useCase: "Find out free disk space",
                  link: "https://www.geeksforgeeks.org/df-command-in-linux-with-examples/",
                },
                {
                  useCase: "Identify large files/folders",
                  link: "https://www.geeksforgeeks.org/du-command-in-linux-with-examples/",
                },
                {
                  useCase: "Monitor disk space for cleanup",
                  link: "https://linuxize.com/post/check-disk-space-linux/",
                },
              ],
            },
            {
              name: "Mounting and Filesystem Configuration (mount, umount, fstab)",
              explanation:
                "`mount` attaches a filesystem to a directory tree. `fstab` defines permanent mount rules.",
              codeExample: `mount /dev/sdb1 /mnt/data      # Mount disk
      umount /mnt/data              # Unmount
      cat /etc/fstab                # Persistent mount config`,
              useCases: [
                {
                  useCase: "Mount external drives",
                  link: "https://linuxize.com/post/how-to-mount-and-unmount-drives-in-linux/",
                },
                {
                  useCase: "Automount filesystems at boot",
                  link: "https://wiki.archlinux.org/title/fstab",
                },
                {
                  useCase: "Resolve mount permission issues",
                  link: "https://ostechnix.com/fix-mount-error-in-linux/",
                },
              ],
            },
            {
              name: "Partitioning & LVM (lsblk, parted, lvm)",
              explanation:
                "Use `lsblk` to inspect block devices. `parted` and `fdisk` manage partitions. LVM allows flexible volume resizing and snapshotting.",
              codeExample: `lsblk                         # View disks and mount points
      sudo parted /dev/sdb          # Partition editor
      sudo lvcreate -L 5G -n lv1 vg # Create logical volume`,
              useCases: [
                {
                  useCase: "Resize or create disk partitions",
                  link: "https://www.geeksforgeeks.org/parted-command-in-linux-with-examples/",
                },
                {
                  useCase: "Create logical volumes with LVM",
                  link: "https://linuxconfig.org/logical-volume-management-lvm-on-linux",
                },
                {
                  useCase: "Inspect mounted disks",
                  link: "https://linuxize.com/post/linux-lsblk-command/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Check available disk space",
              link: "https://linuxize.com/post/check-disk-space-linux/",
            },
            {
              name: "Fix full root partition",
              link: "https://www.tecmint.com/free-up-space-in-linux/",
            },
            {
              name: "Create partition and mount it",
              link: "https://www.geeksforgeeks.org/how-to-partition-and-format-a-disk-in-linux/",
            },
          ],
        },
      },
      {
        name: "Docker",
        description:
          "Containerization platform for building, shipping, and running applications.",
        difficulty: "Intermediate",
        topics: [
          "Dockerfile",
          "Containers vs Images",
          "Volumes",
          "Docker Compose",
          "Networking",
          "Build, Run, Push",
        ],
        details: {
          overview:
            "Docker allows you to package applications and their dependencies into isolated environments called containers. It provides consistency across development, testing, and production systems.",
          timeComplexity:
            "O(1) for container start/stop; O(n) for image build depending on Dockerfile steps.",
          spaceComplexity:
            "Depends on base image size and layers; optimized Dockerfiles reduce space usage.",
          keyTechniques: [
            {
              name: "Dockerfile & Image Building",
              explanation:
                "A Dockerfile contains instructions to build an image layer-by-layer using commands like `FROM`, `RUN`, `COPY`, and `CMD`.",
              codeExample: `# Sample Dockerfile
      FROM openjdk:17
      WORKDIR /app
      COPY . .
      RUN javac Main.java
      CMD ["java", "Main"]`,
              useCases: [
                {
                  useCase: "Create reproducible environments",
                  link: "https://docs.docker.com/engine/reference/builder/",
                },
                {
                  useCase: "Build optimized images",
                  link: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/",
                },
                {
                  useCase: "Multi-stage builds for smaller image sizes",
                  link: "https://docs.docker.com/develop/develop-images/multistage-build/",
                },
              ],
            },
            {
              name: "Volumes and Data Persistence",
              explanation:
                "Docker volumes allow you to persist data outside of containers and share files between containers and the host system.",
              codeExample: `# Create volume and run container
      docker volume create mydata
      docker run -v mydata:/app/data myimage`,
              useCases: [
                {
                  useCase: "Persist database data",
                  link: "https://docs.docker.com/storage/volumes/",
                },
                {
                  useCase: "Share config files with containers",
                  link: "https://docs.docker.com/storage/bind-mounts/",
                },
                {
                  useCase: "Backup and restore container state",
                  link: "https://phoenixnap.com/kb/docker-backup-container",
                },
              ],
            },
            {
              name: "Docker Compose & Multi-container Apps",
              explanation:
                "Compose allows defining multi-container apps with YAML configuration, enabling easy startup and orchestration.",
              codeExample: `# docker-compose.yml
      version: '3'
      services:
        web:
          image: nginx
          ports:
            - "80:80"
        app:
          build: .
          volumes:
            - .:/code`,
              useCases: [
                {
                  useCase: "Define dev environment with DB + API + frontend",
                  link: "https://docs.docker.com/compose/",
                },
                {
                  useCase: "Deploy services locally",
                  link: "https://docs.docker.com/get-started/08_using_compose/",
                },
                {
                  useCase: "Network multiple services together",
                  link: "https://docs.docker.com/compose/networking/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Dockerize a Java application",
              link: "https://www.baeldung.com/dockerizing-spring-boot-application",
            },
            {
              name: "Build and push Docker images",
              link: "https://docs.docker.com/engine/reference/commandline/push/",
            },
            {
              name: "Fix volume permission issues",
              link: "https://stackoverflow.com/questions/29261811/permission-denied-on-docker-mounted-volume",
            },
          ],
        },
      },
      {
        name: "Kubernetes",
        description:
          "Container orchestration platform for managing scalable and distributed applications.",
        difficulty: "Advanced",
        topics: [
          "Pods & Deployments",
          "Services",
          "ConfigMaps & Secrets",
          "Namespaces",
          "Horizontal Scaling",
          "Helm",
        ],
        details: {
          overview:
            "Kubernetes automates the deployment, scaling, and management of containerized applications. It provides features such as rolling updates, service discovery, self-healing, and load balancing for distributed systems.",
          timeComplexity:
            "O(1) to O(n) for scheduling and scaling based on cluster size and pod requirements.",
          spaceComplexity:
            "Depends on node configurations and volume storage used by pods.",
          keyTechniques: [
            {
              name: "Pods & Deployments",
              explanation:
                "A Pod is the smallest unit in Kubernetes that encapsulates one or more containers. Deployments manage replica sets and ensure the desired number of pods are running.",
              codeExample: `# deployment.yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: my-app
      spec:
        replicas: 3
        selector:
          matchLabels:
            app: my-app
        template:
          metadata:
            labels:
              app: my-app
          spec:
            containers:
            - name: app
              image: my-app:latest
              ports:
              - containerPort: 8080`,
              useCases: [
                {
                  useCase: "Run scalable applications",
                  link: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
                },
                {
                  useCase: "Rolling updates and rollbacks",
                  link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/",
                },
                {
                  useCase: "Manage application versions",
                  link: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment",
                },
              ],
            },
            {
              name: "Services & Load Balancing",
              explanation:
                "Services expose pods to external or internal traffic. They ensure reliable communication using labels and selectors.",
              codeExample: `# service.yaml
      apiVersion: v1
      kind: Service
      metadata:
        name: my-service
      spec:
        selector:
          app: my-app
        ports:
          - protocol: TCP
            port: 80
            targetPort: 8080
        type: LoadBalancer`,
              useCases: [
                {
                  useCase: "Expose applications to the internet",
                  link: "https://kubernetes.io/docs/concepts/services-networking/service/",
                },
                {
                  useCase: "Service discovery within the cluster",
                  link: "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
                },
                {
                  useCase: "Load balancing traffic to pods",
                  link: "https://kubernetes.io/docs/concepts/services-networking/#loadbalancer",
                },
              ],
            },
            {
              name: "ConfigMaps & Secrets",
              explanation:
                "ConfigMaps and Secrets provide configuration and sensitive data to applications without hardcoding them into images.",
              codeExample: `# configmap.yaml
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: app-config
      data:
        LOG_LEVEL: debug
      
      # secret.yaml
      apiVersion: v1
      kind: Secret
      metadata:
        name: db-secret
      type: Opaque
      data:
        password: cGFzc3dvcmQ=  # base64 encoded`,
              useCases: [
                {
                  useCase: "Inject config into containers",
                  link: "https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/",
                },
                {
                  useCase: "Handle credentials securely",
                  link: "https://kubernetes.io/docs/concepts/configuration/secret/",
                },
                {
                  useCase: "Decouple environment-specific settings",
                  link: "https://kubernetes.io/docs/concepts/configuration/overview/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "CrashLoopBackOff debugging",
              link: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-crash/",
            },
            {
              name: "Expose service via Ingress",
              link: "https://kubernetes.io/docs/concepts/services-networking/ingress/",
            },
            {
              name: "Horizontal Pod Autoscaler",
              link: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
            },
          ],
        },
      },
    ],
  },
  dsa: {
    title: "Data Structures & Algorithms",
    icon: Brain,
    description: "Core computer science concepts and problem-solving patterns",
    concepts: [
      {
        name: "Array & String Manipulation",
        description:
          "Fundamental operations and optimization techniques for linear data structures.",
        difficulty: "Beginner",
        topics: [
          "Two Pointers",
          "Sliding Window",
          "Prefix Sums",
          "String Matching",
        ],
        details: {
          overview:
            "Arrays and strings are the most commonly used data structures. Efficient manipulation of these structures is crucial for solving a wide range of coding problems, especially those involving search, iteration, and optimization.",
          timeComplexity:
            "Typically O(n) for linear scans, O(n^2) for brute-force comparisons.",
          spaceComplexity:
            "O(1) for in-place operations, O(n) if auxiliary structures like prefix arrays are used.",
          keyTechniques: [
            {
              name: "Two Pointers",
              explanation:
                "Use two pointers either moving in the same direction or towards each other to reduce time complexity in problems involving comparisons or scanning.",
              codeExample: `def two_sum_sorted(arr, target):
          left, right = 0, len(arr) - 1
      
          while left < right:
              current_sum = arr[left] + arr[right]
              if current_sum == target:
                  return [left, right]
              elif current_sum < target:
                  left += 1
              else:
                  right -= 1
      
          return [-1, -1]`,
              useCases: [
                {
                  useCase: "Two Sum in sorted array",
                  link: "https://leetcode.com/problems/two-sum/description/",
                },
                {
                  useCase: "Removing duplicates",
                  link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
                },
                {
                  useCase: "Checking for palindromes",
                  link: "https://leetcode.com/problems/palindrome-number/description/",
                },
              ],
            },
            {
              name: "Sliding Window",
              explanation:
                "Maintain a window of elements and move it across the array or string to process contiguous data efficiently.",
              codeExample: `def max_sum_subarray(arr, k):
          if len(arr) < k:
              return -1
      
          window_sum = sum(arr[:k])
          max_sum = window_sum
      
          for i in range(k, len(arr)):
              window_sum = window_sum - arr[i - k] + arr[i]
              max_sum = max(max_sum, window_sum)
      
          return max_sum`,
              useCases: [
                {
                  useCase: "Maximum sum subarray of size k",
                  link: "https://leetcode.com/problems/maximum-average-subarray-i/",
                },
                {
                  useCase: "Longest substring without repeating characters",
                  link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                },
                {
                  useCase: "Minimum window substring",
                  link: "https://leetcode.com/problems/minimum-window-substring/",
                },
              ],
            },
            {
              name: "Prefix Sums",
              explanation:
                "Precompute cumulative sums to quickly answer range sum queries in constant time.",
              codeExample: `def range_sum(arr, left, right):
          prefix = [0] * (len(arr) + 1)
          for i in range(len(arr)):
              prefix[i + 1] = prefix[i] + arr[i]
          return prefix[right + 1] - prefix[left]`,
              useCases: [
                {
                  useCase: "Range sum queries",
                  link: "https://leetcode.com/problems/range-sum-query-immutable/",
                },
                {
                  useCase: "Subarray sum problems",
                  link: "https://leetcode.com/problems/subarray-sum-equals-k/",
                },
                {
                  useCase: "Difference array techniques",
                  link: "https://leetcode.com/problems/corporate-flight-bookings/", // classic diff array usage
                },
              ],
            },
            {
              name: "String Matching (KMP)",
              explanation:
                "Use the KMP algorithm to efficiently search for a pattern inside a string by avoiding redundant comparisons.",
              codeExample: `def kmp_search(text, pattern):
          def build_lps(pattern):
              lps = [0] * len(pattern)
              length = 0
              i = 1
              while i < len(pattern):
                  if pattern[i] == pattern[length]:
                      length += 1
                      lps[i] = length
                      i += 1
                  else:
                      if length != 0:
                          length = lps[length - 1]
                      else:
                          lps[i] = 0
                          i += 1
              return lps
      
          lps = build_lps(pattern)
          i = j = 0
          while i < len(text):
              if text[i] == pattern[j]:
                  i += 1
                  j += 1
              if j == len(pattern):
                  return i - j
              elif i < len(text) and text[i] != pattern[j]:
                  if j != 0:
                      j = lps[j - 1]
                  else:
                      i += 1
          return -1`,
              useCases: [
                {
                  useCase: "Substring search",
                  link: "https://leetcode.com/problems/implement-strstr/", // Classic KMP use case
                },
                {
                  useCase: "DNA sequence matching",
                  link: "https://leetcode.com/problems/repeated-dna-sequences/", // Uses efficient string matching
                },
                {
                  useCase: "Autocomplete and search engines",
                  link: "https://leetcode.com/problems/design-search-autocomplete-system/", // Real-world application
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Two Sum",
              link: "https://leetcode.com/problems/two-sum/",
            },
            {
              name: "Three Sum",
              link: "https://leetcode.com/problems/3sum/",
            },
            {
              name: "Container With Most Water",
              link: "https://leetcode.com/problems/container-with-most-water/",
            },
            {
              name: "Longest Substring Without Repeating Characters",
              link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            },
            {
              name: "Minimum Window Substring",
              link: "https://leetcode.com/problems/minimum-window-substring/",
            },
            {
              name: "Range Sum Query",
              link: "https://leetcode.com/problems/range-sum-query-immutable/",
            },
            {
              name: "Find All Anagrams in a String",
              link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
            },
            {
              name: "Implement strStr() (KMP)",
              link: "https://leetcode.com/problems/implement-strstr/",
            },
          ],
        },
      },
      {
        name: "Stack & Queue",
        description:
          "Linear data structures for ordered processing and LIFO/FIFO access",
        difficulty: "Beginner",
        topics: [
          "Monotonic Stack",
          "Min Stack",
          "Queue using Stacks",
          "Circular Queue",
        ],
        details: {
          overview:
            "Stacks follow Last-In-First-Out (LIFO) access, while queues follow First-In-First-Out (FIFO). These structures are fundamental for expression evaluation, backtracking, and scheduling problems.",
          timeComplexity:
            "O(1) for push/pop in stack and enqueue/dequeue in queue (amortized with dynamic resizing)",
          spaceComplexity: "O(n) where n is the number of elements stored",
          keyTechniques: [
            {
              name: "Monotonic Stack",
              explanation:
                "A stack that maintains its elements in a sorted order (increasing or decreasing), useful for range-based problems.",
              codeExample: `def next_greater_elements(nums):
          result = [-1] * len(nums)
          stack = []
          for i in range(len(nums)):
              while stack and nums[i] > nums[stack[-1]]:
                  index = stack.pop()
                  result[index] = nums[i]
              stack.append(i)
          return result`,
              useCases: [
                {
                  useCase: "Next greater element",
                  link: "https://leetcode.com/problems/next-greater-element-i/",
                },
                {
                  useCase: "Largest rectangle in histogram",
                  link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                },
                {
                  useCase: "Daily temperatures",
                  link: "https://leetcode.com/problems/daily-temperatures/",
                },
              ],
            },
            {
              name: "Queue with Stack",
              explanation:
                "Simulate queue behavior using two stacks to reverse the order for dequeue operations.",
              codeExample: `class MyQueue:
          def __init__(self):
              self.in_stack = []
              self.out_stack = []
      
          def push(self, x):
              self.in_stack.append(x)
      
          def pop(self):
              self.peek()
              return self.out_stack.pop()
      
          def peek(self):
              if not self.out_stack:
                  while self.in_stack:
                      self.out_stack.append(self.in_stack.pop())
              return self.out_stack[-1]
      
          def empty(self):
              return not self.in_stack and not self.out_stack`,
              useCases: [
                {
                  useCase: "Implement queue using stacks",
                  link: "https://leetcode.com/problems/implement-queue-using-stacks/",
                },
              ],
            },
            {
              name: "Min Stack",
              explanation:
                "Stack that supports retrieving the minimum element in O(1) time by maintaining a secondary stack.",
              codeExample: `class MinStack:
          def __init__(self):
              self.stack = []
              self.min_stack = []
      
          def push(self, val):
              self.stack.append(val)
              if not self.min_stack or val <= self.min_stack[-1]:
                  self.min_stack.append(val)
      
          def pop(self):
              val = self.stack.pop()
              if val == self.min_stack[-1]:
                  self.min_stack.pop()
      
          def top(self):
              return self.stack[-1]
      
          def getMin(self):
              return self.min_stack[-1]`,
              useCases: [
                {
                  useCase: "Min Stack",
                  link: "https://leetcode.com/problems/min-stack/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Valid Parentheses",
              link: "https://leetcode.com/problems/valid-parentheses/",
            },
            {
              name: "Min Stack",
              link: "https://leetcode.com/problems/min-stack/",
            },
            {
              name: "Implement Queue Using Stacks",
              link: "https://leetcode.com/problems/implement-queue-using-stacks/",
            },
            {
              name: "Daily Temperatures",
              link: "https://leetcode.com/problems/daily-temperatures/",
            },
            {
              name: "Next Greater Element I",
              link: "https://leetcode.com/problems/next-greater-element-i/",
            },
            {
              name: "Largest Rectangle in Histogram",
              link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            },
          ],
        },
      },
      {
        name: "Heap & Priority Queue",
        description: "Tree-based data structures for efficient priority access",
        difficulty: "Intermediate",
        topics: [
          "Min Heap",
          "Max Heap",
          "Heapify",
          "Custom Comparators",
          "Kth Largest",
        ],
        details: {
          overview:
            "Heaps are binary trees with specific ordering properties. They’re commonly used to implement priority queues and efficiently access the smallest or largest element.",
          timeComplexity:
            "O(log n) for insert and remove; O(n) for heapify; O(1) for peek",
          spaceComplexity: "O(n) for storing elements",
          keyTechniques: [
            {
              name: "Min Heap",
              explanation:
                "A binary heap where the parent node is always smaller than or equal to its children. Used for extracting minimum elements efficiently.",
              codeExample: `import heapq
      
      def find_k_smallest(nums, k):
          heapq.heapify(nums)
          return [heapq.heappop(nums) for _ in range(k)]`,
              useCases: [
                {
                  useCase: "K smallest elements",
                  link: "https://leetcode.com/problems/k-closest-points-to-origin/",
                },
                {
                  useCase: "Merge K sorted lists",
                  link: "https://leetcode.com/problems/merge-k-sorted-lists/",
                },
                {
                  useCase: "Top K frequent elements",
                  link: "https://leetcode.com/problems/top-k-frequent-elements/",
                },
              ],
            },
            {
              name: "Max Heap",
              explanation:
                "A binary heap where the parent node is always greater than or equal to its children. Can be simulated using Python’s `heapq` by negating values.",
              codeExample: `import heapq
      
      def find_k_largest(nums, k):
          return heapq.nlargest(k, nums)`,
              useCases: [
                {
                  useCase: "Kth largest element",
                  link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                },
                {
                  useCase: "Sliding window maximum",
                  link: "https://leetcode.com/problems/sliding-window-maximum/",
                },
              ],
            },
            {
              name: "Custom Heap Comparators",
              explanation:
                "When built-in ordering is insufficient, define a custom class or use tuples to simulate comparator-based behavior.",
              codeExample: `import heapq
      
      class Item:
          def __init__(self, val, priority):
              self.val = val
              self.priority = priority
      
          def __lt__(self, other):
              return self.priority < other.priority
      
      def custom_priority_queue(items):
          heap = [Item(val, prio) for val, prio in items]
          heapq.heapify(heap)
          return [heapq.heappop(heap).val for _ in range(len(heap))]`,
              useCases: [
                {
                  useCase: "Task scheduling with priority",
                  link: "https://leetcode.com/problems/reorganize-string/",
                },
                {
                  useCase: "Rearrange characters by frequency",
                  link: "https://leetcode.com/problems/sort-characters-by-frequency/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Kth Largest Element in an Array",
              link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            },
            {
              name: "Merge K Sorted Lists",
              link: "https://leetcode.com/problems/merge-k-sorted-lists/",
            },
            {
              name: "Top K Frequent Elements",
              link: "https://leetcode.com/problems/top-k-frequent-elements/",
            },
            {
              name: "Sliding Window Maximum",
              link: "https://leetcode.com/problems/sliding-window-maximum/",
            },
            {
              name: "K Closest Points to Origin",
              link: "https://leetcode.com/problems/k-closest-points-to-origin/",
            },
            {
              name: "Sort Characters by Frequency",
              link: "https://leetcode.com/problems/sort-characters-by-frequency/",
            },
          ],
        },
      },
      {
        name: "Linked Lists",
        description: "Dynamic data structures and pointer manipulation",
        difficulty: "Beginner",
        topics: [
          "Reversal",
          "Cycle Detection",
          "Merging",
          "Dummy Nodes",
          "Random Pointers",
          "Multilevel",
          "Splitting",
        ],
        details: {
          overview:
            "Linked lists are linear dynamic data structures where each node points to the next. They enable efficient insertions and deletions and form the foundation for many system-level and algorithmic problems.",
          timeComplexity:
            "O(1) insertion/deletion at head, O(n) for access or search",
          spaceComplexity:
            "O(1) for in-place, O(n) for recursive or extra structures",
          keyTechniques: [
            {
              name: "List Reversal",
              explanation:
                "Reverse the list by manipulating the next pointers. Can be done iteratively or recursively.",
              codeExample: `def reverse_list(head):
          prev = None
          current = head
          while current:
              next_temp = current.next
              current.next = prev
              prev = current
              current = next_temp
          return prev`,
              useCases: [
                {
                  useCase: "Reverse entire list",
                  link: "https://leetcode.com/problems/reverse-linked-list/",
                },
                {
                  useCase: "Reverse in groups",
                  link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                },
                {
                  useCase: "Palindrome checking",
                  link: "https://leetcode.com/problems/palindrome-linked-list/",
                },
              ],
            },
            {
              name: "Cycle Detection (Floyd’s Algorithm)",
              explanation:
                "Detect a cycle using slow and fast pointers, and optionally locate the cycle's start.",
              codeExample: `def has_cycle(head):
          slow = fast = head
          while fast and fast.next:
              slow = slow.next
              fast = fast.next.next
              if slow == fast:
                  return True
          return False`,
              useCases: [
                {
                  useCase: "Cycle detection",
                  link: "https://leetcode.com/problems/linked-list-cycle/",
                },
                {
                  useCase: "Finding cycle start",
                  link: "https://leetcode.com/problems/linked-list-cycle-ii/",
                },
                {
                  useCase: "List intersection",
                  link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
                },
              ],
            },
            {
              name: "Dummy Node Pattern",
              explanation:
                "Use a dummy head to simplify edge cases when inserting or removing nodes at the beginning.",
              codeExample: `def remove_elements(head, val):
          dummy = ListNode(0, head)
          prev, curr = dummy, head
          while curr:
              if curr.val == val:
                  prev.next = curr.next
              else:
                  prev = curr
              curr = curr.next
          return dummy.next`,
              useCases: [
                {
                  useCase: "Remove elements",
                  link: "https://leetcode.com/problems/remove-linked-list-elements/",
                },
                {
                  useCase: "Remove duplicates",
                  link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
                },
                {
                  useCase: "Merge k sorted lists",
                  link: "https://leetcode.com/problems/merge-k-sorted-lists/",
                },
              ],
            },
            {
              name: "Copy List with Random Pointer",
              explanation:
                "Use a hashmap or interweaving technique to clone a list with next and random pointers.",
              codeExample: `def copy_random_list(head):
          old_to_new = {}
          curr = head
          while curr:
              old_to_new[curr] = Node(curr.val)
              curr = curr.next
          curr = head
          while curr:
              old_to_new[curr].next = old_to_new.get(curr.next)
              old_to_new[curr].random = old_to_new.get(curr.random)
              curr = curr.next
          return old_to_new.get(head)`,
              useCases: [
                {
                  useCase: "Clone complex structure",
                  link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
                },
              ],
            },
            {
              name: "Flatten Multilevel Linked List",
              explanation:
                "Recursively flatten a doubly linked list where nodes may contain child lists.",
              codeExample: `def flatten(head):
          if not head:
              return head
          stack, curr = [], head
          while curr:
              if curr.child:
                  if curr.next:
                      stack.append(curr.next)
                  curr.next = curr.child
                  curr.child.prev = curr
                  curr.child = None
              elif not curr.next and stack:
                  nxt = stack.pop()
                  curr.next = nxt
                  nxt.prev = curr
              curr = curr.next
          return head`,
              useCases: [
                {
                  useCase: "Flatten nested structures",
                  link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
                },
              ],
            },
            {
              name: "Split Linked List",
              explanation:
                "Split a list into k parts with approximately equal length.",
              codeExample: `def split_list_to_parts(head, k):
          length = 0
          curr = head
          while curr:
              length += 1
              curr = curr.next
          part_len, extra = divmod(length, k)
          parts = []
          curr = head
          for i in range(k):
              parts.append(curr)
              for j in range(part_len + (i < extra) - 1):
                  if curr:
                      curr = curr.next
              if curr:
                  next_part = curr.next
                  curr.next = None
                  curr = next_part
          return parts`,
              useCases: [
                {
                  useCase: "Split list into parts",
                  link: "https://leetcode.com/problems/split-linked-list-in-parts/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Reverse Linked List",
              link: "https://leetcode.com/problems/reverse-linked-list/",
            },
            {
              name: "Merge Two Sorted Lists",
              link: "https://leetcode.com/problems/merge-two-sorted-lists/",
            },
            {
              name: "Merge K Sorted Lists",
              link: "https://leetcode.com/problems/merge-k-sorted-lists/",
            },
            {
              name: "Linked List Cycle",
              link: "https://leetcode.com/problems/linked-list-cycle/",
            },
            {
              name: "Linked List Cycle II",
              link: "https://leetcode.com/problems/linked-list-cycle-ii/",
            },
            {
              name: "Remove Duplicates from Sorted List",
              link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
            },
            {
              name: "Remove Nth Node From End",
              link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            },
            {
              name: "Add Two Numbers",
              link: "https://leetcode.com/problems/add-two-numbers/",
            },
            {
              name: "Copy List with Random Pointer",
              link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
            },
            {
              name: "Flatten a Multilevel Doubly Linked List",
              link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
            },
            {
              name: "Split Linked List in Parts",
              link: "https://leetcode.com/problems/split-linked-list-in-parts/",
            },
          ],
        },
      },

      {
        name: "Trees & Graphs",
        description: "Hierarchical and network data structures",
        difficulty: "Intermediate",
        topics: [
          "DFS/BFS",
          "Binary Search Trees",
          "Union-Find",
          "Topological Sort",
          "Shortest Path",
          "Trie",
        ],
        details: {
          overview:
            "Trees and graphs are non-linear data structures. Trees model hierarchical relationships, while graphs represent complex networks with cycles, directions, and weights.",
          timeComplexity:
            "O(V + E) for traversal, O(log n) for balanced BST operations",
          spaceComplexity:
            "O(h) for tree recursion, O(V) for visited/queue structures",
          keyTechniques: [
            {
              name: "Depth-First Search (DFS)",
              explanation:
                "DFS explores as far as possible along each path before backtracking, useful for connectivity and backtracking problems.",
              codeExample: `def dfs_recursive(node, visited=None):
          if visited is None:
              visited = set()
          visited.add(node)
          print(node.val)
          for neighbor in node.neighbors:
              if neighbor not in visited:
                  dfs_recursive(neighbor, visited)
      
      def dfs_iterative(root):
          stack = [root]
          visited = set()
          while stack:
              node = stack.pop()
              if node not in visited:
                  visited.add(node)
                  print(node.val)
                  for neighbor in node.neighbors:
                      if neighbor not in visited:
                          stack.append(neighbor)`,
              useCases: [
                {
                  useCase: "Tree traversal",
                  link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
                },
                {
                  useCase: "Path finding",
                  link: "https://leetcode.com/problems/path-sum/",
                },
                {
                  useCase: "Connected components",
                  link: "https://leetcode.com/problems/number-of-provinces/",
                },
                {
                  useCase: "Topological sorting",
                  link: "https://leetcode.com/problems/course-schedule/",
                },
              ],
            },
            {
              name: "Breadth-First Search (BFS)",
              explanation:
                "BFS explores all neighbors at the current level before moving deeper, ideal for shortest paths or level-order traversal.",
              codeExample: `from collections import deque
      def bfs(root):
          queue = deque([root])
          visited = set([root])
          while queue:
              node = queue.popleft()
              print(node.val)
              for neighbor in node.neighbors:
                  if neighbor not in visited:
                      visited.add(neighbor)
                      queue.append(neighbor)`,
              useCases: [
                {
                  useCase: "Level-order traversal",
                  link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                },
                {
                  useCase: "Shortest path in unweighted graph",
                  link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
                },
                {
                  useCase: "Minimum depth of tree",
                  link: "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
                },
              ],
            },
            {
              name: "Binary Search Trees (BST)",
              explanation:
                "Binary trees where left < root < right. Enable fast lookups, inserts, and deletions.",
              codeExample: `def search_bst(root, val):
          if not root or root.val == val:
              return root
          if val < root.val:
              return search_bst(root.left, val)
          return search_bst(root.right, val)`,
              useCases: [
                {
                  useCase: "Search & insert in BST",
                  link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
                },
                {
                  useCase: "Validate BST",
                  link: "https://leetcode.com/problems/validate-binary-search-tree/",
                },
                {
                  useCase: "Lowest Common Ancestor",
                  link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                },
              ],
            },
            {
              name: "Topological Sort",
              explanation:
                "Used for ordering tasks based on prerequisites in a DAG (Directed Acyclic Graph).",
              codeExample: `from collections import defaultdict, deque
      def topo_sort(numCourses, prerequisites):
          graph = defaultdict(list)
          indegree = [0] * numCourses
          for dest, src in prerequisites:
              graph[src].append(dest)
              indegree[dest] += 1
          queue = deque([i for i in range(numCourses) if indegree[i] == 0])
          result = []
          while queue:
              node = queue.popleft()
              result.append(node)
              for neighbor in graph[node]:
                  indegree[neighbor] -= 1
                  if indegree[neighbor] == 0:
                      queue.append(neighbor)
          return result if len(result) == numCourses else []`,
              useCases: [
                {
                  useCase: "Course scheduling",
                  link: "https://leetcode.com/problems/course-schedule/",
                },
                {
                  useCase: "Task ordering",
                  link: "https://leetcode.com/problems/course-schedule-ii/",
                },
              ],
            },
            {
              name: "Union-Find (Disjoint Set)",
              explanation:
                "A set structure supporting efficient find and union operations, used in Kruskal's MST, cycle detection, and connectivity.",
              codeExample: `def find(parent, x):
          if parent[x] != x:
              parent[x] = find(parent, parent[x])
          return parent[x]
      
      def union(parent, rank, x, y):
          rootX = find(parent, x)
          rootY = find(parent, y)
          if rootX != rootY:
              if rank[rootX] < rank[rootY]:
                  parent[rootX] = rootY
              elif rank[rootX] > rank[rootY]:
                  parent[rootY] = rootX
              else:
                  parent[rootY] = rootX
                  rank[rootX] += 1`,
              useCases: [
                {
                  useCase: "Detect cycle in graph",
                  link: "https://leetcode.com/problems/graph-valid-tree/",
                },
                {
                  useCase: "Find number of provinces",
                  link: "https://leetcode.com/problems/number-of-provinces/",
                },
                {
                  useCase: "Smallest equivalent string",
                  link: "https://leetcode.com/problems/satisfiability-of-equality-equations/",
                },
              ],
            },
            {
              name: "Trie (Prefix Tree)",
              explanation:
                "A tree used for efficient prefix matching and dictionary-related problems.",
              codeExample: `class TrieNode:
          def __init__(self):
              self.children = {}
              self.isWord = False
      
      class Trie:
          def __init__(self):
              self.root = TrieNode()
      
          def insert(self, word):
              node = self.root
              for char in word:
                  if char not in node.children:
                      node.children[char] = TrieNode()
                  node = node.children[char]
              node.isWord = True`,
              useCases: [
                {
                  useCase: "Autocomplete system",
                  link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                },
                {
                  useCase: "Word search",
                  link: "https://leetcode.com/problems/word-search-ii/",
                },
                {
                  useCase: "Prefix dictionary",
                  link: "https://leetcode.com/problems/replace-words/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Binary Tree Inorder Traversal",
              link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            },
            {
              name: "Maximum Depth of Binary Tree",
              link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            },
            {
              name: "Validate Binary Search Tree",
              link: "https://leetcode.com/problems/validate-binary-search-tree/",
            },
            {
              name: "Course Schedule",
              link: "https://leetcode.com/problems/course-schedule/",
            },
            {
              name: "Course Schedule II",
              link: "https://leetcode.com/problems/course-schedule-ii/",
            },
            {
              name: "Number of Islands",
              link: "https://leetcode.com/problems/number-of-islands/",
            },
            {
              name: "Word Search II",
              link: "https://leetcode.com/problems/word-search-ii/",
            },
            {
              name: "Lowest Common Ancestor of a BST",
              link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            },
            {
              name: "Graph Valid Tree",
              link: "https://leetcode.com/problems/graph-valid-tree/",
            },
            {
              name: "Shortest Path in Binary Matrix",
              link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            },
          ],
        },
      },

      {
        name: "Dynamic Programming",
        description: "Optimization problems with overlapping subproblems",
        difficulty: "Advanced",
        topics: [
          "Memoization",
          "Tabulation",
          "State Transition",
          "Optimization",
          "1D/2D DP",
        ],
        details: {
          overview:
            "Dynamic programming (DP) is used to solve problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computation. It's commonly applied in optimization problems with overlapping subproblems and optimal substructure.",
          timeComplexity:
            "Typically O(n), O(n²), or O(n³) depending on the state space",
          spaceComplexity:
            "O(n) to O(n²) depending on whether memoization or tabulation is used",
          keyTechniques: [
            {
              name: "Memoization (Top-Down)",
              explanation:
                "Recursively break the problem into subproblems and cache the results to prevent redundant work.",
              codeExample: `def fib_memo(n, memo={}):
          if n in memo:
              return memo[n]
          if n <= 1:
              return n
          memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
          return memo[n]
      
      def coin_change_memo(coins, amount, memo={}):
          if amount in memo:
              return memo[amount]
          if amount == 0:
              return 0
          if amount < 0:
              return -1
          min_coins = float('inf')
          for coin in coins:
              result = coin_change_memo(coins, amount - coin, memo)
              if result >= 0:
                  min_coins = min(min_coins, result + 1)
          memo[amount] = min_coins if min_coins != float('inf') else -1
          return memo[amount]`,
              useCases: [
                {
                  useCase: "Fibonacci sequence",
                  link: "https://leetcode.com/problems/fibonacci-number/",
                },
                {
                  useCase: "Coin change",
                  link: "https://leetcode.com/problems/coin-change/",
                },
                {
                  useCase: "Longest common subsequence",
                  link: "https://leetcode.com/problems/longest-common-subsequence/",
                },
              ],
            },
            {
              name: "Tabulation (Bottom-Up)",
              explanation:
                "Iteratively build the solution by solving smaller subproblems first and using them to solve larger ones.",
              codeExample: `def fib_tab(n):
          if n <= 1:
              return n
          dp = [0] * (n+1)
          dp[1] = 1
          for i in range(2, n+1):
              dp[i] = dp[i-1] + dp[i-2]
          return dp[n]
      
      def coin_change_tab(coins, amount):
          dp = [float('inf')] * (amount + 1)
          dp[0] = 0
          for i in range(1, amount + 1):
              for coin in coins:
                  if i >= coin:
                      dp[i] = min(dp[i], dp[i - coin] + 1)
          return dp[amount] if dp[amount] != float('inf') else -1`,
              useCases: [
                {
                  useCase: "Knapsack problem",
                  link: "https://leetcode.com/problems/partition-equal-subset-sum/",
                },
                {
                  useCase: "Edit distance",
                  link: "https://leetcode.com/problems/edit-distance/",
                },
                {
                  useCase: "Maximum subarray sum",
                  link: "https://leetcode.com/problems/maximum-subarray/",
                },
              ],
            },
            {
              name: "State Optimization",
              explanation:
                "Reduce the memory used by a DP table by reusing results from only recent states (e.g., from O(n²) to O(n)).",
              codeExample: `def climb_stairs(n):
          if n <= 2:
              return n
          a, b = 1, 2
          for _ in range(3, n + 1):
              a, b = b, a + b
          return b`,
              useCases: [
                {
                  useCase: "Climbing stairs",
                  link: "https://leetcode.com/problems/climbing-stairs/",
                },
                {
                  useCase: "House robber",
                  link: "https://leetcode.com/problems/house-robber/",
                },
              ],
            },
            {
              name: "2D DP Grid Traversal",
              explanation:
                "Solve problems involving matrices or grids, like counting paths or minimizing cost.",
              codeExample: `def unique_paths(m, n):
          dp = [[1]*n for _ in range(m)]
          for i in range(1, m):
              for j in range(1, n):
                  dp[i][j] = dp[i-1][j] + dp[i][j-1]
          return dp[-1][-1]`,
              useCases: [
                {
                  useCase: "Unique paths",
                  link: "https://leetcode.com/problems/unique-paths/",
                },
                {
                  useCase: "Minimum path sum",
                  link: "https://leetcode.com/problems/minimum-path-sum/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Climbing Stairs",
              link: "https://leetcode.com/problems/climbing-stairs/",
            },
            {
              name: "House Robber",
              link: "https://leetcode.com/problems/house-robber/",
            },
            {
              name: "Coin Change",
              link: "https://leetcode.com/problems/coin-change/",
            },
            {
              name: "Longest Increasing Subsequence",
              link: "https://leetcode.com/problems/longest-increasing-subsequence/",
            },
            {
              name: "Edit Distance",
              link: "https://leetcode.com/problems/edit-distance/",
            },
            {
              name: "Partition Equal Subset Sum",
              link: "https://leetcode.com/problems/partition-equal-subset-sum/",
            },
            {
              name: "Maximum Subarray",
              link: "https://leetcode.com/problems/maximum-subarray/",
            },
            {
              name: "Longest Palindromic Substring",
              link: "https://leetcode.com/problems/longest-palindromic-substring/",
            },
            {
              name: "Interleaving String",
              link: "https://leetcode.com/problems/interleaving-string/",
            },
            {
              name: "Burst Balloons",
              link: "https://leetcode.com/problems/burst-balloons/",
            },
          ],
        },
      },
    ],
  },
  databases: {
    title: "Database Engineering",
    icon: Database,
    description: "Database design, optimization, and administration",
    // concepts: [
    //   {
    //     name: "Query Optimization",
    //     description: "SQL performance tuning and execution plans",
    //     difficulty: "Intermediate",
    //     topics: [
    //       "Index Strategies",
    //       "Join Optimization",
    //       "Query Plans",
    //       "Statistics",
    //     ],
    //   },
    //   {
    //     name: "ACID Properties",
    //     description: "Transaction management and consistency guarantees",
    //     difficulty: "Intermediate",
    //     topics: [
    //       "Isolation Levels",
    //       "Deadlock Prevention",
    //       "Rollback Strategies",
    //       "Locking",
    //     ],
    //   },
    //   {
    //     name: "NoSQL Patterns",
    //     description: "Document and key-value store design patterns",
    //     difficulty: "Intermediate",
    //     topics: [
    //       "MongoDB Aggregation",
    //       "Redis Data Types",
    //       "Document Modeling",
    //       "Eventual Consistency",
    //     ],
    //   },
    //   {
    //     name: "Database Scaling",
    //     description: "Horizontal and vertical scaling strategies",
    //     difficulty: "Advanced",
    //     topics: [
    //       "Read Replicas",
    //       "Master-Slave Setup",
    //       "Connection Pooling",
    //       "Data Partitioning",
    //     ],
    //   },
    // ],
    concepts: [
      {
        name: "Relational Databases (RDBMS)",
        description:
          "Structured data management using tables and relationships.",
        difficulty: "Beginner",
        topics: [
          "Tables, Rows, Columns",
          "Primary & Foreign Keys",
          "Entity Relationships",
          "ER Diagrams",
        ],
        details: {
          overview:
            "Relational databases organize data into tables composed of rows and columns. Each table represents an entity, and relationships between entities are established using keys. This model supports data integrity, normalization, and efficient querying through SQL.",
          // timeComplexity:
          //   "O(1) for indexed lookups, O(n) for full scans or joins without indexes.",
          // spaceComplexity:
          //   "Depends on number of rows, columns, indexes, and data types; generally O(n) where n is the number of records.",
          keyTechniques: [
            {
              name: "Primary & Foreign Keys",
              explanation:
                "Primary keys uniquely identify each record in a table. Foreign keys establish a link between data in two tables, enforcing referential integrity.",
              codeExample: `-- Users table with a primary key
      CREATE TABLE Users (
        user_id INT PRIMARY KEY,
        name VARCHAR(100)
      );
      
      -- Orders table with a foreign key referencing Users
      CREATE TABLE Orders (
        order_id INT PRIMARY KEY,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
      );`,
              useCases: [
                {
                  useCase: "Referencing user data in orders",
                  link: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/", // Example using joins
                },
                {
                  useCase: "Ensuring relational integrity",
                  link: "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
                },
              ],
            },
            {
              name: "Entity Relationships",
              explanation:
                "Defines how entities relate to each other: One-to-One, One-to-Many, and Many-to-Many. Relationships are essential for database normalization and querying.",
              codeExample: `-- One-to-Many: A user can have many orders
      -- Already shown above with Users and Orders
      
      -- Many-to-Many: Students and Courses
      CREATE TABLE Students (
        student_id INT PRIMARY KEY,
        name VARCHAR(100)
      );
      
      CREATE TABLE Courses (
        course_id INT PRIMARY KEY,
        title VARCHAR(100)
      );
      
      CREATE TABLE StudentCourses (
        student_id INT,
        course_id INT,
        PRIMARY KEY (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES Students(student_id),
        FOREIGN KEY (course_id) REFERENCES Courses(course_id)
      );`,
              useCases: [
                {
                  useCase: "Modeling course enrollments",
                  link: "https://leetcode.com/problems/project-employees-i/",
                },
                {
                  useCase: "Building normalized schemas",
                  link: "https://leetcode.com/problems/employees-with-missing-information/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Customer Who Visited but Did Not Make Any Transactions",
              link: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
            },
            {
              name: "Employees Earning More Than Their Managers",
              link: "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
            },
            {
              name: "Project Employees I",
              link: "https://leetcode.com/problems/project-employees-i/",
            },
            {
              name: "Employees With Missing Information",
              link: "https://leetcode.com/problems/employees-with-missing-information/",
            },
          ],
        },
      },
      {
        name: "Normalization",
        description:
          "Reducing redundancy and improving data integrity through database design.",
        difficulty: "Beginner",
        topics: [
          "1NF",
          "2NF",
          "3NF",
          "BCNF",
          "Data Redundancy",
          "Functional Dependency",
        ],
        details: {
          overview:
            "Normalization is a process in relational database design used to eliminate redundant data and ensure data integrity. It involves organizing data into tables in such a way that dependencies are properly enforced by database constraints.",
          // timeComplexity:
          //   "O(n) for normalization steps (design-time), but can improve query performance at runtime.",
          // spaceComplexity:
          //   "May increase schema size due to more tables, but reduces duplicated data — generally O(n) for n records.",
          keyTechniques: [
            {
              name: "1NF - First Normal Form",
              explanation:
                "Ensures that each column contains atomic (indivisible) values and each record is unique.",
              codeExample: `-- Unnormalized (multiple values in one column)
      CREATE TABLE Orders (
        order_id INT,
        product_names VARCHAR(255)
      );
      
      -- 1NF: Atomic values
      CREATE TABLE Orders (
        order_id INT,
        product_name VARCHAR(100)
      );`,
              useCases: [
                {
                  useCase: "Flattening multi-valued attributes",
                  link: "https://leetcode.com/problems/products-sales-analysis-i/",
                },
              ],
            },
            {
              name: "2NF - Second Normal Form",
              explanation:
                "Builds on 1NF by removing partial dependencies — non-key columns must depend on the whole primary key.",
              codeExample: `-- Example of violation:
      -- (student_id, course_id) -> course_name violates 2NF
      
      -- Normalize by splitting
      CREATE TABLE Courses (
        course_id INT PRIMARY KEY,
        course_name VARCHAR(100)
      );
      
      CREATE TABLE Enrollments (
        student_id INT,
        course_id INT,
        PRIMARY KEY (student_id, course_id),
        FOREIGN KEY (course_id) REFERENCES Courses(course_id)
      );`,
              useCases: [
                {
                  useCase: "Splitting tables by partial dependency",
                  link: "https://leetcode.com/problems/students-and-examinations/",
                },
              ],
            },
            {
              name: "3NF & BCNF",
              explanation:
                "3NF removes transitive dependencies; BCNF further tightens rules so every determinant is a candidate key.",
              codeExample: `-- 3NF example:
      -- student_id → advisor_id → advisor_name is a transitive dependency
      
      -- Normalize by separating advisors
      CREATE TABLE Advisors (
        advisor_id INT PRIMARY KEY,
        advisor_name VARCHAR(100)
      );
      
      CREATE TABLE Students (
        student_id INT PRIMARY KEY,
        advisor_id INT,
        FOREIGN KEY (advisor_id) REFERENCES Advisors(advisor_id)
      );`,
              useCases: [
                {
                  useCase: "Eliminating transitive dependencies",
                  link: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Products Sales Analysis I",
              link: "https://leetcode.com/problems/products-sales-analysis-i/",
            },
            {
              name: "Students and Examinations",
              link: "https://leetcode.com/problems/students-and-examinations/",
            },
            {
              name: "Employees Whose Manager Left the Company",
              link: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
            },
          ],
        },
      },
      {
        name: "ACID Properties",
        description:
          "Core properties that ensure reliable transaction processing in databases.",
        difficulty: "Beginner",
        topics: [
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability",
          "Transactions",
        ],
        details: {
          overview:
            "ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties guarantee that database transactions are processed reliably, maintaining data integrity even in cases of failures or concurrent access.",
          // timeComplexity:
          //   "Varies based on implementation and isolation level (e.g., Serializable may have higher cost).",
          // spaceComplexity:
          //   "O(n) for maintaining logs or rollback segments depending on transaction size.",
          keyTechniques: [
            {
              name: "Atomicity",
              explanation:
                "Ensures that a transaction is either fully completed or fully rolled back. Partial transactions are not allowed.",
              codeExample: `-- Pseudocode
      BEGIN TRANSACTION;
        UPDATE accounts SET balance = balance - 100 WHERE id = 1;
        UPDATE accounts SET balance = balance + 100 WHERE id = 2;
      COMMIT;
      
      -- If any update fails, rollback ensures both changes are undone.`,
              useCases: [
                {
                  useCase: "Money transfer transactions",
                  link: "https://leetcode.com/problems/bank-transfer-validation/",
                },
              ],
            },
            {
              name: "Consistency",
              explanation:
                "Guarantees that a transaction brings the database from one valid state to another, respecting all constraints.",
              codeExample: `-- Constraint example
      CREATE TABLE Users (
        id INT PRIMARY KEY,
        age INT CHECK (age >= 0)
      );
      
      -- Any transaction that violates constraints will be rejected.`,
              useCases: [
                {
                  useCase: "Enforcing integrity constraints",
                  link: "https://leetcode.com/problems/find-customer-referee/",
                },
              ],
            },
            {
              name: "Isolation",
              explanation:
                "Ensures concurrent transactions do not affect each other’s execution. Levels include Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
              codeExample: `-- Example (conceptual)
      SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
      
      BEGIN TRANSACTION;
        SELECT * FROM orders WHERE status = 'pending';
        -- Ensures no other transaction changes 'pending' rows until commit
      COMMIT;`,
              useCases: [
                {
                  useCase: "Concurrent transaction handling",
                  link: "https://leetcode.com/problems/concurrent-transactions/",
                },
              ],
            },
            {
              name: "Durability",
              explanation:
                "Ensures that once a transaction is committed, the changes are permanent even in the event of a system failure.",
              codeExample: `-- Conceptual: Logs written before commit
      COMMIT; 
      -- Changes flushed to disk or WAL (write-ahead log)`,
              useCases: [
                {
                  useCase: "Crash recovery mechanisms",
                  link: "https://en.wikipedia.org/wiki/Write-ahead_logging",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Bank Transfer Validation",
              link: "https://leetcode.com/problems/bank-transfer-validation/",
            },
            {
              name: "Find Customer Referee",
              link: "https://leetcode.com/problems/find-customer-referee/",
            },
            {
              name: "Concurrent Transactions",
              link: "https://leetcode.com/problems/concurrent-transactions/",
            },
          ],
        },
      },
      {
        name: "Indexing",
        description:
          "Techniques to speed up data retrieval in relational databases.",
        difficulty: "Intermediate",
        topics: [
          "B-Tree",
          "Hash Indexes",
          "Clustered Index",
          "Non-Clustered Index",
          "Composite Index",
          "Covering Index",
        ],
        details: {
          overview:
            "Indexes are database structures that improve the speed of data retrieval at the cost of additional storage and slower writes. Common types include B-Tree and Hash indexes, and design considerations include whether to use clustered, non-clustered, or composite indexes.",
          // timeComplexity:
          //   "O(log n) for B-Tree index lookups, O(1) for Hash indexes (ideal case)",
          // spaceComplexity:
          //   "O(n) for maintaining the index structure in addition to the data table",
          keyTechniques: [
            {
              name: "B-Tree Index",
              explanation:
                "Balanced tree structure used by most relational databases for sorted indexing. Supports range queries and ordered scans.",
              codeExample: `-- Create B-Tree index (default in MySQL/PostgreSQL)
      CREATE INDEX idx_user_email ON users(email);`,
              useCases: [
                {
                  useCase: "Range queries on ordered data",
                  link: "https://leetcode.com/problems/range-frequency-queries/",
                },
                {
                  useCase: "Efficient sorting and filtering",
                  link: "https://leetcode.com/problems/top-k-frequent-elements/",
                },
              ],
            },
            {
              name: "Hash Index",
              explanation:
                "Uses a hash function for indexing. Very fast for equality lookups but does not support range queries.",
              codeExample: `-- Hash index (PostgreSQL only)
      CREATE INDEX idx_user_hash ON users USING hash(email);`,
              useCases: [
                {
                  useCase: "Exact match queries",
                  link: "https://leetcode.com/problems/find-duplicate-file-in-system/",
                },
              ],
            },
            {
              name: "Clustered vs Non-Clustered",
              explanation:
                "Clustered index determines the physical order of rows. A table can have only one. Non-clustered indexes store pointers to actual rows.",
              codeExample: `-- SQL Server example
      -- Clustered
      CREATE CLUSTERED INDEX idx_user_id ON users(id);
      
      -- Non-clustered
      CREATE NONCLUSTERED INDEX idx_user_name ON users(name);`,
              useCases: [
                {
                  useCase:
                    "Primary key (clustered), search on non-key column (non-clustered)",
                  link: "https://leetcode.com/problems/primary-key/",
                },
              ],
            },
            {
              name: "Composite and Covering Index",
              explanation:
                "Composite indexes include multiple columns in a defined order. Covering indexes contain all columns required by a query, avoiding full row access.",
              codeExample: `-- Composite index
      CREATE INDEX idx_user_name_email ON users(name, email);`,
              useCases: [
                {
                  useCase: "Multi-column search optimization",
                  link: "https://leetcode.com/problems/search-suggestions-system/",
                },
                {
                  useCase: "Queries served by index only (covering)",
                  link: "https://leetcode.com/problems/employee-importance/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Range Frequency Queries",
              link: "https://leetcode.com/problems/range-frequency-queries/",
            },
            {
              name: "Top K Frequent Elements",
              link: "https://leetcode.com/problems/top-k-frequent-elements/",
            },
            {
              name: "Search Suggestions System",
              link: "https://leetcode.com/problems/search-suggestions-system/",
            },
            {
              name: "Find Duplicate File in System",
              link: "https://leetcode.com/problems/find-duplicate-file-in-system/",
            },
            {
              name: "Employee Importance",
              link: "https://leetcode.com/problems/employee-importance/",
            },
          ],
        },
      },
      {
        name: "SQL Mastery",
        description:
          "Core SQL features used for querying and manipulating relational data.",
        difficulty: "Intermediate",
        topics: [
          "DDL (CREATE, DROP, ALTER)",
          "DML (SELECT, INSERT, UPDATE, DELETE)",
          "Joins",
          "Subqueries",
          "CTEs",
          "Window Functions",
          "GROUP BY / HAVING / ORDER BY",
        ],
        details: {
          overview:
            "Structured Query Language (SQL) is used to create, modify, and query relational databases. Mastery of both data definition and data manipulation aspects, along with advanced querying techniques, is essential for effective backend and data-intensive development.",
          // timeComplexity:
          //   "Depends on the query plan and indexing; SELECT with index is typically O(log n), joins and aggregations can go up to O(n^2)",
          // spaceComplexity:
          // "O(n) depending on temporary tables, result sets, and intermediate computation during joins or aggregation",
          keyTechniques: [
            {
              name: "Data Definition Language (DDL)",
              explanation:
                "Defines schema structure using commands like CREATE, DROP, and ALTER.",
              codeExample: `-- Create a table
      CREATE TABLE users (
        id INT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      );
      
      -- Alter table
      ALTER TABLE users ADD COLUMN age INT;`,
              useCases: [
                {
                  useCase: "Create and modify database schema",
                  link: "https://leetcode.com/problems/create-table/",
                },
              ],
            },
            {
              name: "Data Manipulation Language (DML)",
              explanation:
                "Handles data retrieval and modification using SELECT, INSERT, UPDATE, DELETE.",
              codeExample: `-- Select
      SELECT * FROM users WHERE age > 25;
      
      -- Insert
      INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com');
      
      -- Update
      UPDATE users SET age = 30 WHERE id = 1;
      
      -- Delete
      DELETE FROM users WHERE id = 1;`,
              useCases: [
                {
                  useCase: "Data querying and updating",
                  link: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
                },
              ],
            },
            {
              name: "Joins",
              explanation:
                "Combine rows from two or more tables based on a related column. Includes INNER, LEFT, RIGHT, and FULL OUTER joins.",
              codeExample: `-- Inner Join
      SELECT u.name, o.order_date
      FROM users u
      JOIN orders o ON u.id = o.user_id;`,
              useCases: [
                {
                  useCase: "Combine user and transaction data",
                  link: "https://leetcode.com/problems/confirmation-rate/",
                },
              ],
            },
            {
              name: "Subqueries, CTEs, and Window Functions",
              explanation:
                "Advanced SQL constructs for organizing complex logic. CTEs improve readability, window functions perform calculations across sets of rows.",
              codeExample: `-- CTE + Window Function
      WITH ranked_products AS (
        SELECT *,
               RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rnk
        FROM products
      )
      SELECT * FROM ranked_products WHERE rnk = 1;`,
              useCases: [
                {
                  useCase: "Top-k queries by group",
                  link: "https://leetcode.com/problems/rank-scores/",
                },
                {
                  useCase: "Complex aggregations",
                  link: "https://leetcode.com/problems/monthly-transactions-i/",
                },
              ],
            },
            {
              name: "GROUP BY / HAVING / ORDER BY",
              explanation:
                "Used for aggregating results, filtering on aggregates, and sorting output.",
              codeExample: `SELECT category, COUNT(*) AS total
      FROM products
      GROUP BY category
      HAVING COUNT(*) > 10
      ORDER BY total DESC;`,
              useCases: [
                {
                  useCase: "Sales or category-based grouping",
                  link: "https://leetcode.com/problems/product-sales-analysis-i/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Create Table",
              link: "https://leetcode.com/problems/create-table/",
            },
            {
              name: "Recyclable and Low Fat Products",
              link: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
            },
            {
              name: "Confirmation Rate",
              link: "https://leetcode.com/problems/confirmation-rate/",
            },
            {
              name: "Rank Scores",
              link: "https://leetcode.com/problems/rank-scores/",
            },
            {
              name: "Monthly Transactions I",
              link: "https://leetcode.com/problems/monthly-transactions-i/",
            },
            {
              name: "Product Sales Analysis I",
              link: "https://leetcode.com/problems/product-sales-analysis-i/",
            },
          ],
        },
      },
      {
        name: "Transactions & Views",
        description:
          "Transactional control, consistency, and abstraction mechanisms in relational databases.",
        difficulty: "Intermediate",
        topics: [
          "BEGIN / COMMIT / ROLLBACK",
          "Savepoints",
          "Isolation Levels",
          "Deadlocks",
          "Stored Procedures",
          "Triggers",
          "Views",
          "Materialized Views",
        ],
        details: {
          overview:
            "Transactions ensure data integrity and consistency through atomic units of work. Isolation levels control concurrency behavior, and views provide logical abstraction of complex queries. Stored procedures and triggers encapsulate server-side logic for automation and validation.",
          // timeComplexity:
          //   "Depends on query execution plan and locking; transactions with indexing are typically O(log n), worst case O(n^2) due to contention.",
          // spaceComplexity:
          //   "O(n) for temporary logs, buffers, and rollback segments depending on transaction size and concurrency.",
          keyTechniques: [
            {
              name: "Transaction Control (ACID)",
              explanation:
                "`BEGIN`, `COMMIT`, and `ROLLBACK` are used to define and control transactions. Transactions ensure atomicity, consistency, isolation, and durability.",
              codeExample: `BEGIN;
      
      UPDATE accounts SET balance = balance - 100 WHERE id = 1;
      UPDATE accounts SET balance = balance + 100 WHERE id = 2;
      
      COMMIT;`,
              useCases: [
                {
                  useCase: "Bank transfers",
                  link: "https://leetcode.com/problems/bank-transaction-analysis/",
                },
                {
                  useCase: "Inventory updates",
                  link: "https://leetcode.com/problems/monthly-transactions-i/",
                },
              ],
            },
            {
              name: "Savepoints & Rollback",
              explanation:
                "Savepoints allow partial rollback within a transaction, useful for error handling.",
              codeExample: `BEGIN;
      
      UPDATE orders SET status = 'processing' WHERE id = 100;
      SAVEPOINT before_payment;
      
      -- simulate failure
      ROLLBACK TO before_payment;
      
      COMMIT;`,
              useCases: [
                {
                  useCase: "Undo intermediate steps in transactions",
                  link: "https://www.postgresql.org/docs/current/sql-savepoint.html",
                },
              ],
            },
            {
              name: "Isolation Levels & Deadlocks",
              explanation:
                "Isolation levels control the visibility of data changes between transactions (e.g., Read Uncommitted, Read Committed, Repeatable Read, Serializable). Poor isolation can lead to deadlocks or anomalies.",
              codeExample: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
      
      BEGIN;
      -- critical queries
      COMMIT;`,
              useCases: [
                {
                  useCase: "Prevent dirty reads and phantom reads",
                  link: "https://leetcode.com/problems/confirmation-rate/",
                },
                {
                  useCase: "Avoid deadlocks in concurrent systems",
                  link: "https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/",
                },
              ],
            },
            {
              name: "Stored Procedures & Triggers",
              explanation:
                "Procedures are precompiled routines, and triggers are event-driven logic blocks executed on INSERT, UPDATE, or DELETE.",
              codeExample: `-- Stored Procedure
      DELIMITER //
      CREATE PROCEDURE update_salary(IN emp_id INT, IN new_salary DECIMAL)
      BEGIN
        UPDATE employees SET salary = new_salary WHERE id = emp_id;
      END;
      //
      DELIMITER ;
      
      -- Trigger
      CREATE TRIGGER update_audit
      AFTER UPDATE ON employees
      FOR EACH ROW
      INSERT INTO audit_log (emp_id, action) VALUES (OLD.id, 'UPDATED');`,
              useCases: [
                {
                  useCase: "Automated auditing",
                  link: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
                },
                {
                  useCase: "Encapsulated business logic",
                  link: "https://www.geeksforgeeks.org/stored-procedure-in-mysql/",
                },
              ],
            },
            {
              name: "Views & Materialized Views",
              explanation:
                "Views are virtual tables based on SQL queries. Materialized views store results physically, offering faster access for complex joins and aggregates.",
              codeExample: `-- View
      CREATE VIEW high_salary_emps AS
      SELECT name, salary FROM employees WHERE salary > 100000;
      
      -- Materialized View (syntax varies by DB)
      CREATE MATERIALIZED VIEW monthly_sales AS
      SELECT product_id, SUM(amount) AS total
      FROM sales
      GROUP BY product_id;`,
              useCases: [
                {
                  useCase: "Abstract complex joins",
                  link: "https://leetcode.com/problems/project-employees-i/",
                },
                {
                  useCase: "Improve read performance",
                  link: "https://www.postgresql.org/docs/current/sql-creatematerializedview.html",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Bank Transaction Analysis",
              link: "https://leetcode.com/problems/bank-transaction-analysis/",
            },
            {
              name: "Monthly Transactions I",
              link: "https://leetcode.com/problems/monthly-transactions-i/",
            },
            {
              name: "Confirmation Rate",
              link: "https://leetcode.com/problems/confirmation-rate/",
            },
            {
              name: "Employees Whose Manager Left the Company",
              link: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
            },
            {
              name: "Project Employees I",
              link: "https://leetcode.com/problems/project-employees-i/",
            },
          ],
        },
      },
      {
        name: "Database Design & Optimization",
        description:
          "Best practices for schema design and techniques to write performant queries.",
        difficulty: "Advanced",
        topics: [
          "Schema Design",
          "Data Types",
          "Query Optimization",
          "Execution Plans",
          "Index Usage",
          "N+1 Problem",
          "Denormalization",
        ],
        details: {
          overview:
            "Designing an efficient database involves choosing the right schema, data types, and indexing strategies. Query optimization ensures that queries are executed with minimal resource usage. Understanding execution plans, avoiding common performance pitfalls like the N+1 problem, and knowing when to denormalize are critical for scalable systems.",
          // timeComplexity:
          //   "Depends on schema, indexes, and query plan. Good design allows O(log n) access for queries that otherwise might be O(n).",
          // spaceComplexity:
          // "Varies depending on normalization and index overhead. Denormalized schemas use more space for faster reads.",
          keyTechniques: [
            {
              name: "Schema Design & Data Types",
              explanation:
                "Design your tables based on the nature of data and relationships. Choose appropriate data types to reduce storage and improve performance.",
              codeExample: `-- Bad: Storing numbers as VARCHAR
      CREATE TABLE orders (
        id INT,
        quantity VARCHAR(255) -- ❌ inefficient
      );
      
      -- Good:
      CREATE TABLE orders (
        id INT,
        quantity INT -- ✅ uses less space, better for aggregation
      );`,
              useCases: [
                {
                  useCase: "Efficient column storage",
                  link: "https://use-the-index-luke.com/sql/schema-design/data-types",
                },
                {
                  useCase: "Faster comparisons and indexing",
                  link: "https://www.postgresql.org/docs/current/datatype.html",
                },
              ],
            },
            {
              name: "Query Optimization & Execution Plans",
              explanation:
                "Use `EXPLAIN` or `EXPLAIN ANALYZE` to inspect how a query runs. Refactor queries, add indexes, or rewrite joins to improve performance.",
              codeExample: `EXPLAIN SELECT * FROM users WHERE email = 'a@example.com';`,
              useCases: [
                {
                  useCase: "Analyzing slow queries",
                  link: "https://www.postgresql.org/docs/current/using-explain.html",
                },
                {
                  useCase: "Tuning queries with WHERE, JOIN, ORDER BY",
                  link: "https://dev.mysql.com/doc/refman/8.0/en/explain.html",
                },
              ],
            },
            {
              name: "Index Usage",
              explanation:
                "Indexes speed up searches but come with write overhead. Use single, composite, or covering indexes as needed.",
              codeExample: `CREATE INDEX idx_email ON users(email);
      
      -- Composite index
      CREATE INDEX idx_name_dob ON users(last_name, date_of_birth);`,
              useCases: [
                {
                  useCase: "Speed up lookups and filtering",
                  link: "https://leetcode.com/problems/confirmation-rate/",
                },
                {
                  useCase: "Support ORDER BY and GROUP BY",
                  link: "https://use-the-index-luke.com/",
                },
              ],
            },
            {
              name: "Avoiding N+1 Problem",
              explanation:
                "The N+1 query problem occurs when you execute one query to fetch rows, then N additional queries to fetch related data. Use `JOIN`, `IN`, or eager loading to avoid it.",
              codeExample: `-- N+1 Problem
      SELECT * FROM posts;
      -- Then for each post:
      SELECT * FROM comments WHERE post_id = ?;
      
      -- Solution:
      SELECT posts.*, comments.*
      FROM posts
      LEFT JOIN comments ON posts.id = comments.post_id;`,
              useCases: [
                {
                  useCase: "Prevent unnecessary DB calls in ORMs",
                  link: "https://stackoverflow.com/questions/97197/what-is-the-n1-selects-issue",
                },
                {
                  useCase: "Optimize nested relationships",
                  link: "https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/",
                },
              ],
            },
            {
              name: "Denormalization Strategies",
              explanation:
                "Denormalization is storing redundant data to reduce joins and speed up read-heavy queries. Best used when data volume is huge and reads are frequent.",
              codeExample: `-- Add redundant data to avoid joins
      -- Normalized:
      CREATE TABLE orders (
        id INT,
        customer_id INT
      );
      
      -- Denormalized:
      CREATE TABLE orders (
        id INT,
        customer_id INT,
        customer_name TEXT
      );`,
              useCases: [
                {
                  useCase: "Reporting and analytics tables",
                  link: "https://cloud.google.com/architecture/denormalization-in-bigquery",
                },
                {
                  useCase: "Improved read performance in distributed databases",
                  link: "https://docs.mongodb.com/manual/core/data-model-design/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Confirmation Rate",
              link: "https://leetcode.com/problems/confirmation-rate/",
            },
            {
              name: "Daily Leads and Partners",
              link: "https://leetcode.com/problems/daily-leads-and-partners/",
            },
            {
              name: "Group Sold Products By The Date",
              link: "https://leetcode.com/problems/group-sold-products-by-the-date/",
            },
            {
              name: "Project Employees I",
              link: "https://leetcode.com/problems/project-employees-i/",
            },
            {
              name: "Monthly Transactions I",
              link: "https://leetcode.com/problems/monthly-transactions-i/",
            },
          ],
        },
      },
      {
        name: "Data Warehousing & OLAP",
        description:
          "Techniques for analytical processing over large volumes of structured data.",
        difficulty: "Advanced",
        topics: [
          "Star Schema",
          "Snowflake Schema",
          "Fact Tables",
          "Dimension Tables",
          "OLAP Cubes",
        ],
        details: {
          overview:
            "Data warehousing is designed for analytical queries and reporting. It organizes data into schemas like Star or Snowflake, where fact tables store quantitative data and dimension tables provide context. OLAP (Online Analytical Processing) enables complex queries and aggregation over these structures.",
          // timeComplexity:
          //   "Depends on indexing and aggregation strategy; OLAP queries may take O(n log n) or more depending on cube complexity.",
          // spaceComplexity:
          //   "Large due to pre-aggregations and denormalized storage; trade-off between speed and space.",
          keyTechniques: [
            {
              name: "Star vs Snowflake Schema",
              explanation:
                "In Star schema, dimensions are denormalized for simplicity and performance. Snowflake schema normalizes dimension tables to reduce redundancy but can be slower to query.",
              codeExample: `-- Star Schema Example
      Fact_Sales (sale_id, product_id, date_id, store_id, amount)
      Dim_Product (product_id, name, category)
      Dim_Date (date_id, day, month, year)
      Dim_Store (store_id, name, region)
      
      -- Snowflake Schema Example
      Dim_Product (product_id, name, category_id)
      Dim_Category (category_id, category_name)`,
              useCases: [
                {
                  useCase: "Business intelligence systems",
                  link: "https://www.geeksforgeeks.org/star-schema-in-data-warehouse-model/",
                },
                {
                  useCase: "Data warehouse schema design",
                  link: "https://www.geeksforgeeks.org/snowflake-schema-in-data-warehouse-model/",
                },
              ],
            },
            {
              name: "Fact and Dimension Tables",
              explanation:
                "Fact tables store measurable, quantitative data (e.g., sales, revenue), while dimension tables store descriptive attributes (e.g., product name, date, region).",
              codeExample: `-- Fact Table
      Fact_Sales (sale_id, product_id, customer_id, revenue)
      
      -- Dimension Table
      Dim_Customer (customer_id, name, email, city)`,
              useCases: [
                {
                  useCase: "Summarizing sales by region or product",
                  link: "https://www.learndataprep.com/what-are-fact-and-dimension-tables/",
                },
                {
                  useCase: "Customer behavior analytics",
                  link: "https://www.geeksforgeeks.org/difference-between-fact-and-dimension-table/",
                },
              ],
            },
            {
              name: "OLAP Cubes",
              explanation:
                "OLAP cubes pre-aggregate data across multiple dimensions for fast analytical queries, enabling slicing, dicing, roll-up, and drill-down operations.",
              codeExample: `-- Pseudo-OLAP Query
      -- Show total sales by region and year
      SELECT region, year, SUM(amount)
      FROM Fact_Sales
      JOIN Dim_Date ON Fact_Sales.date_id = Dim_Date.date_id
      JOIN Dim_Store ON Fact_Sales.store_id = Dim_Store.store_id
      GROUP BY region, year;`,
              useCases: [
                {
                  useCase: "KPI dashboards",
                  link: "https://www.ibm.com/docs/en/cognos-analytics/11.1.0?topic=cubes-about-olap-cubes",
                },
                {
                  useCase: "Drill-down reporting",
                  link: "https://docs.oracle.com/cd/B28359_01/olap.111/b28126/cubes.htm",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Sales Analysis by Month and Product",
              link: "https://leetcode.com/problems/monthly-sales/",
            },
            {
              name: "Product Sales Analysis II",
              link: "https://leetcode.com/problems/product-sales-analysis-ii/",
            },
            {
              name: "Customer Order Frequency",
              link: "https://leetcode.com/problems/frequent-customers/",
            },
          ],
        },
      },
    ],
  },
  "backend-apis": {
    title: "Backend APIs",
    icon: Server,
    description: "RESTful and GraphQL API design and implementation",
    concepts: [
      {
        name: "API Architecture & Design",
        description:
          "Principles and patterns to design scalable, maintainable, and RESTful APIs.",
        difficulty: "Intermediate",
        topics: [
          "RESTful Design",
          "URI Conventions",
          "Statelessness",
          "Request/Response Standards",
          "HTTP Methods & Status Codes",
        ],
        details: {
          overview:
            "API architecture involves designing endpoints, data formats, and protocols that enable reliable communication between clients and servers. A good API is predictable, consistent, and easy to use. REST is the most commonly used architectural style in web APIs.",
          // timeComplexity:
          //   "Depends on implementation — typically constant-time routing, linear-time data handling.",
          // spaceComplexity:
          //   "Depends on payload size and in-memory caching strategy.",
          keyTechniques: [
            {
              name: "RESTful Endpoint Design",
              explanation:
                "Use meaningful resource URIs and proper HTTP methods to represent actions on resources. Follow best practices like plural nouns for resources and nested routes for hierarchy.",
              codeExample: `// Example: RESTful Controller in Spring Boot (Java)
      @RestController
      @RequestMapping("/api/products")
      public class ProductController {
      
          @GetMapping
          public List<Product> getAllProducts() {
              return productService.findAll();
          }
      
          @PostMapping
          public ResponseEntity<Product> createProduct(@RequestBody Product product) {
              Product saved = productService.save(product);
              return new ResponseEntity<>(saved, HttpStatus.CREATED);
          }
      
          @GetMapping("/{id}")
          public Product getProductById(@PathVariable Long id) {
              return productService.findById(id);
          }
      
          @PutMapping("/{id}")
          public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
              return productService.update(id, product);
          }
      
          @DeleteMapping("/{id}")
          public void deleteProduct(@PathVariable Long id) {
              productService.delete(id);
          }
      }`,
              useCases: [
                {
                  useCase: "CRUD API design",
                  link: "https://restfulapi.net/resource-naming/",
                },
                {
                  useCase: "Stateless HTTP services",
                  link: "https://developer.mozilla.org/en-US/docs/Glossary/Stateless",
                },
                {
                  useCase: "Designing URI structures",
                  link: "https://restfulapi.net/resource-naming/",
                },
              ],
            },
            {
              name: "HTTP Methods & Status Codes",
              explanation:
                "Use appropriate HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and return meaningful status codes (200 OK, 201 Created, 404 Not Found, etc.) to communicate operation results clearly.",
              codeExample: `// Example Status Code Handling (Spring Boot)
      @PostMapping("/users")
      public ResponseEntity<User> register(@RequestBody User user) {
          if (userService.exists(user.getEmail())) {
              return ResponseEntity.status(HttpStatus.CONFLICT).build();
          }
          User saved = userService.save(user);
          return ResponseEntity.status(HttpStatus.CREATED).body(saved);
      }`,
              useCases: [
                {
                  useCase: "REST status codes",
                  link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
                },
                {
                  useCase: "HTTP method conventions",
                  link: "https://restfulapi.net/http-methods/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Design a RESTful API for a Blog",
              link: "https://www.designyourapi.com/blog-api-design-example",
            },
            {
              name: "Implement REST endpoints for a Product Catalog",
              link: "https://spring.io/guides/gs/rest-service/",
            },
            {
              name: "Build CRUD API with Spring Boot",
              link: "https://www.baeldung.com/spring-boot-crud-thymeleaf",
            },
          ],
        },
      },
      {
        name: "Routing & Request Lifecycle",
        description:
          "Defines how incoming HTTP requests are mapped to controllers and how requests are processed through the application.",
        difficulty: "Intermediate",
        topics: [
          "Routing",
          "Request Mapping",
          "Middleware",
          "Filters",
          "Request Lifecycle",
        ],
        details: {
          overview:
            "Routing defines how a server handles HTTP requests for different paths. The request lifecycle includes all the steps a request goes through—from receiving it, running through filters/interceptors, executing controller logic, to returning a response.",
          // timeComplexity: "O(1) for routing resolution in most frameworks",
          // spaceComplexity:
          //   "O(n) depending on request size or filters in the stack",
          keyTechniques: [
            {
              name: "Request Mapping and Routing",
              explanation:
                "Map incoming HTTP requests to appropriate controller methods using annotations like `@RequestMapping`, `@GetMapping`, etc.",
              codeExample: `@RestController
      @RequestMapping("/api/users")
      public class UserController {
      
          @GetMapping("/{id}")
          public User getUser(@PathVariable Long id) {
              return userService.findById(id);
          }
      
          @PostMapping
          public ResponseEntity<User> createUser(@RequestBody User user) {
              return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
          }
      }`,
              useCases: [
                {
                  useCase: "Route handling in REST APIs",
                  link: "https://spring.io/guides/gs/rest-service/",
                },
                {
                  useCase:
                    "Parameter binding with @PathVariable and @RequestParam",
                  link: "https://www.baeldung.com/spring-requestparam-vs-pathvariable",
                },
              ],
            },
            {
              name: "Request Lifecycle & Filters",
              explanation:
                "The request lifecycle includes filters (pre/post processing), interceptors, controller logic, and response building. Filters can modify request/response globally.",
              codeExample: `@Component
      public class LoggingFilter implements Filter {
      
          @Override
          public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                  throws IOException, ServletException {
      
              HttpServletRequest req = (HttpServletRequest) request;
              System.out.println("Incoming Request: " + req.getRequestURI());
              
              chain.doFilter(request, response);
      
              System.out.println("Outgoing Response: " + response.getContentType());
          }
      }`,
              useCases: [
                {
                  useCase: "Global request logging",
                  link: "https://www.baeldung.com/spring-http-logging",
                },
                {
                  useCase: "Authentication filters",
                  link: "https://www.baeldung.com/spring-security-filter-chain",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Build a custom request logging filter",
              link: "https://www.baeldung.com/spring-boot-add-filter",
            },
            {
              name: "Implement routing with path variables and query params",
              link: "https://www.baeldung.com/spring-requestparam-vs-pathvariable",
            },
            {
              name: "Understanding Spring request lifecycle",
              link: "https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet-lifecycle",
            },
          ],
        },
      },
      {
        name: "Security & Authorization",
        description:
          "Protecting APIs using authentication and role-based access control mechanisms.",
        difficulty: "Advanced",
        topics: [
          "Authentication",
          "Authorization",
          "JWT",
          "Role-Based Access",
          "Spring Security",
        ],
        details: {
          overview:
            "Security in backend APIs involves verifying users (authentication) and controlling what they can access (authorization). Common approaches include Basic Auth, JWT, OAuth2, and role-based access control (RBAC). In Spring Boot, Spring Security is the standard framework to handle security concerns.",
          timeComplexity:
            "O(1) per request for token validation (JWT); may vary for DB lookups",
          spaceComplexity: "O(n) depending on token/user data stored",
          keyTechniques: [
            {
              name: "JWT Authentication",
              explanation:
                "Use JSON Web Tokens to authenticate users in a stateless manner. JWTs are signed and sent with each request via headers, eliminating the need for server-side sessions.",
              codeExample: `@PostMapping("/login")
      public ResponseEntity<?> authenticate(@RequestBody AuthRequest request) {
          Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
          
          SecurityContextHolder.getContext().setAuthentication(authentication);
          String token = jwtUtil.generateToken(authentication);
          return ResponseEntity.ok(new AuthResponse(token));
      }`,
              useCases: [
                {
                  useCase: "Stateless authentication with JWT",
                  link: "https://www.baeldung.com/spring-security-oauth-jwt",
                },
                {
                  useCase: "Securing APIs with Authorization header",
                  link: "https://www.baeldung.com/spring-security-http-basic-authentication",
                },
              ],
            },
            {
              name: "Role-Based Access Control (RBAC)",
              explanation:
                "Use roles like ADMIN, USER to define access permissions on API endpoints. Enforced using `@PreAuthorize`, `@Secured`, or route-level config.",
              codeExample: `@RestController
      @RequestMapping("/admin")
      @PreAuthorize("hasRole('ADMIN')")
      public class AdminController {
      
          @GetMapping("/dashboard")
          public String dashboard() {
              return "Welcome, Admin!";
          }
      }`,
              useCases: [
                {
                  useCase: "Admin-only endpoints",
                  link: "https://www.baeldung.com/spring-security-method-security",
                },
                {
                  useCase: "Custom permission annotations",
                  link: "https://www.baeldung.com/spring-security-custom-annotation",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Secure endpoints with JWT",
              link: "https://www.baeldung.com/spring-security-oauth-jwt",
            },
            {
              name: "Enable role-based method security",
              link: "https://www.baeldung.com/spring-security-method-security",
            },
            {
              name: "Configure custom login endpoint",
              link: "https://www.baeldung.com/spring-security-login",
            },
          ],
        },
      },
      {
        name: "Validation & Input Handling",
        description:
          "Ensuring data correctness and protecting your API from invalid or malicious input.",
        difficulty: "Intermediate",
        topics: [
          "DTOs",
          "Bean Validation",
          "Error Binding",
          "Exception Handling",
        ],
        details: {
          overview:
            "Input validation is a critical part of API development. It ensures that clients send valid, safe, and expected data. Spring Boot supports validation using annotations (`@Valid`, `@NotNull`, etc.) and centralized error handling via `@ControllerAdvice`.",
          timeComplexity: "O(1) per field validation",
          spaceComplexity: "O(n) where n is number of input fields",
          keyTechniques: [
            {
              name: "Bean Validation with Annotations",
              explanation:
                "Spring uses JSR-380 (Jakarta Bean Validation) annotations to enforce constraints on input data. You can annotate DTOs with rules and use `@Valid` to trigger validation automatically.",
              codeExample: `public class UserDTO {
          @NotBlank(message = "Username is required")
          private String username;
      
          @Email(message = "Invalid email format")
          private String email;
      
          @Size(min = 6, message = "Password must be at least 6 characters")
          private String password;
      }
      
      @PostMapping("/register")
      public ResponseEntity<?> register(@Valid @RequestBody UserDTO user) {
          // Proceed with registration logic
          return ResponseEntity.ok("Registered");
      }`,
              useCases: [
                {
                  useCase: "Validate form or JSON input",
                  link: "https://www.baeldung.com/spring-boot-bean-validation",
                },
                {
                  useCase: "Field-level constraints with annotations",
                  link: "https://jakarta.ee/specifications/bean-validation/3.0/apidocs/",
                },
              ],
            },
            {
              name: "Centralized Exception Handling",
              explanation:
                "Use `@ControllerAdvice` to handle validation exceptions globally and return user-friendly error responses.",
              codeExample: `@ControllerAdvice
      public class GlobalExceptionHandler {
          @ExceptionHandler(MethodArgumentNotValidException.class)
          public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {
              Map<String, String> errors = new HashMap<>();
              ex.getBindingResult().getFieldErrors().forEach(error ->
                  errors.put(error.getField(), error.getDefaultMessage()));
              return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
          }
      }`,
              useCases: [
                {
                  useCase: "Global validation error response",
                  link: "https://www.baeldung.com/global-error-handler-in-a-spring-rest-api",
                },
                {
                  useCase: "Standardized error format for clients",
                  link: "https://reflectoring.io/bean-validation-with-spring-boot/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Spring Boot Bean Validation",
              link: "https://www.baeldung.com/spring-boot-bean-validation",
            },
            {
              name: "Handling Validation Exceptions",
              link: "https://www.baeldung.com/global-error-handler-in-a-spring-rest-api",
            },
            {
              name: "Create Custom Validation Annotations",
              link: "https://www.baeldung.com/spring-mvc-custom-validator",
            },
          ],
        },
      },
      {
        name: "Performance & Optimization",
        description:
          "Improve API responsiveness, throughput, and resource efficiency.",
        difficulty: "Advanced",
        topics: [
          "Caching",
          "Lazy Loading",
          "Database Optimization",
          "Asynchronous Processing",
        ],
        details: {
          overview:
            "Optimizing backend APIs involves improving latency, reducing database load, and minimizing computational overhead. Techniques like caching, indexing, connection pooling, and async processing help build responsive and scalable APIs.",
          timeComplexity:
            "Varies based on technique; caching reduces O(n) lookups to O(1)",
          spaceComplexity:
            "Depends on caching/data duplication — typically O(n)",
          keyTechniques: [
            {
              name: "Caching with Spring Cache",
              explanation:
                "Use Spring’s caching abstraction to reduce redundant processing and expensive DB calls. Supports multiple providers like Ehcache, Redis, etc.",
              codeExample: `@Service
      public class ProductService {
          @Cacheable("products")
          public Product getProductById(Long id) {
              // Expensive DB call
              return productRepository.findById(id).orElseThrow();
          }
      }`,
              useCases: [
                {
                  useCase: "Avoid repeated DB calls for same data",
                  link: "https://www.baeldung.com/spring-cache-tutorial",
                },
                {
                  useCase: "Use Redis or in-memory caching",
                  link: "https://www.baeldung.com/spring-boot-redis-cache",
                },
              ],
            },
            {
              name: "Asynchronous Processing",
              explanation:
                "Improve response time by offloading non-blocking or long-running operations using `@Async`.",
              codeExample: `@Service
      public class EmailService {
          @Async
          public void sendWelcomeEmail(String email) {
              // simulate delay
              Thread.sleep(3000);
              System.out.println("Email sent to: " + email);
          }
      }`,
              useCases: [
                {
                  useCase: "Send emails or logs without blocking user",
                  link: "https://www.baeldung.com/spring-async",
                },
                {
                  useCase: "Improve response time of endpoints",
                  link: "https://www.baeldung.com/spring-scheduled-tasks",
                },
              ],
            },
            {
              name: "Database Indexing & Query Optimization",
              explanation:
                "Use database indexes, avoid N+1 queries, and write efficient SQL with pagination and projections to reduce DB load.",
              codeExample: `@Query("SELECT p.name FROM Product p WHERE p.category = :category")
      List<String> findNamesByCategory(@Param("category") String category);`,
              useCases: [
                {
                  useCase: "Use indexes to speed up search queries",
                  link: "https://use-the-index-luke.com/",
                },
                {
                  useCase: "Avoid SELECT * and large joins",
                  link: "https://www.baeldung.com/spring-data-jpa-query",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Spring Cache with Redis",
              link: "https://www.baeldung.com/spring-boot-redis-cache",
            },
            {
              name: "Avoiding N+1 Query Problem",
              link: "https://thorben-janssen.com/hibernate-n-plus-one-select-problem/",
            },
            {
              name: "Asynchronous REST Calls",
              link: "https://www.baeldung.com/spring-async",
            },
          ],
        },
      },
      {
        name: "Monitoring & Observability",
        description:
          "Track system health, performance, and errors using logging, metrics, and tracing.",
        difficulty: "Intermediate",
        topics: ["Logging", "Metrics", "Distributed Tracing", "Health Checks"],
        details: {
          overview:
            "Monitoring and observability are essential for maintaining the health of production systems. Logs help with debugging, metrics provide system performance insights, and tracing reveals how requests flow through microservices.",
          timeComplexity:
            "O(1) per log/metric operation, though high volume can affect I/O",
          spaceComplexity:
            "Depends on log/metric retention policy (external tools recommended)",
          keyTechniques: [
            {
              name: "Centralized Logging (Spring + ELK)",
              explanation:
                "Use structured logs (JSON format) and forward them to Elasticsearch using Logstash or Filebeat. Visualize with Kibana.",
              codeExample: `@RestController
      @RequestMapping("/api")
      public class UserController {
          private static final Logger logger = LoggerFactory.getLogger(UserController.class);
      
          @GetMapping("/users")
          public List<User> getUsers() {
              logger.info("Fetching all users");
              return userService.getAllUsers();
          }
      }`,
              useCases: [
                {
                  useCase: "Track application events or errors",
                  link: "https://www.baeldung.com/spring-boot-logging",
                },
                {
                  useCase: "Centralize logs with ELK",
                  link: "https://www.elastic.co/what-is/elk-stack",
                },
              ],
            },
            {
              name: "Application Metrics (Micrometer + Prometheus)",
              explanation:
                "Use Micrometer to expose application metrics in Prometheus format, and visualize with Grafana.",
              codeExample: `@RestController
      public class MetricsController {
          private final Counter userCounter;
      
          public MetricsController(MeterRegistry registry) {
              this.userCounter = registry.counter("api.user.access");
          }
      
          @GetMapping("/users")
          public List<User> getUsers() {
              userCounter.increment();
              return userService.getAllUsers();
          }
      }`,
              useCases: [
                {
                  useCase: "Track endpoint usage, response time, errors",
                  link: "https://micrometer.io/docs",
                },
                {
                  useCase: "Grafana dashboard from Prometheus",
                  link: "https://grafana.com/docs/",
                },
              ],
            },
            {
              name: "Distributed Tracing (OpenTelemetry)",
              explanation:
                "Track the lifecycle of requests as they flow across services, especially in microservices architecture.",
              codeExample: `// Spring Boot with OpenTelemetry auto-instrumentation
      // Configuration-based setup. No custom code example required.`,
              useCases: [
                {
                  useCase: "Trace slow API calls across services",
                  link: "https://opentelemetry.io/docs/instrumentation/java/",
                },
                {
                  useCase: "Monitor microservice request lifecycle",
                  link: "https://www.baeldung.com/opentelemetry",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Log Aggregation with ELK",
              link: "https://www.baeldung.com/spring-boot-elk",
            },
            {
              name: "Exposing Metrics to Prometheus",
              link: "https://www.baeldung.com/spring-boot-actuators-prometheus",
            },
            {
              name: "Tracing with OpenTelemetry",
              link: "https://opentelemetry.io/docs/instrumentation/java/",
            },
          ],
        },
      },
      {
        name: "Testing & Quality Assurance",
        description:
          "Ensure code correctness, reliability, and maintainability through automated testing techniques.",
        difficulty: "Intermediate",
        topics: [
          "Unit Testing",
          "Integration Testing",
          "Mocking",
          "Test Coverage",
        ],
        details: {
          overview:
            "Testing is critical to ensure that backend APIs work as expected. This involves verifying individual components with unit tests, ensuring collaboration between components with integration tests, and simulating edge cases and failure modes. Mocking frameworks help isolate units, and code coverage tools ensure important paths are tested.",
          timeComplexity:
            "Test runtime depends on test size; typically linear with test input size.",
          spaceComplexity:
            "Negligible per test; scales with mocks and data setups.",
          keyTechniques: [
            {
              name: "Unit Testing with JUnit",
              explanation:
                "Test individual methods or classes in isolation. Avoid external dependencies like DB or network.",
              codeExample: `@SpringBootTest
      public class CalculatorServiceTest {
      
          @Autowired
          private CalculatorService calculator;
      
          @Test
          public void testAddition() {
              assertEquals(5, calculator.add(2, 3));
          }
      }`,
              useCases: [
                {
                  useCase: "Validate core business logic",
                  link: "https://www.baeldung.com/junit-5",
                },
                {
                  useCase: "Test service-layer independently",
                  link: "https://junit.org/junit5/",
                },
              ],
            },
            {
              name: "Integration Testing with Spring Boot",
              explanation:
                "Test API endpoints and component wiring with a real Spring context, possibly using in-memory DBs like H2.",
              codeExample: `@SpringBootTest
      @AutoConfigureMockMvc
      public class UserControllerTest {
      
          @Autowired
          private MockMvc mockMvc;
      
          @Test
          public void testGetUsers() throws Exception {
              mockMvc.perform(get("/api/users"))
                  .andExpect(status().isOk());
          }
      }`,
              useCases: [
                {
                  useCase: "Test REST controllers with MockMvc",
                  link: "https://www.baeldung.com/spring-boot-testing",
                },
                {
                  useCase: "Verify full request/response lifecycle",
                  link: "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing",
                },
              ],
            },
            {
              name: "Mocking with Mockito",
              explanation:
                "Mock dependencies to isolate the unit under test and verify interactions or simulate behaviors.",
              codeExample: `@ExtendWith(MockitoExtension.class)
      public class UserServiceTest {
      
          @Mock
          private UserRepository userRepo;
      
          @InjectMocks
          private UserService userService;
      
          @Test
          public void testGetUserById() {
              User mockUser = new User(1L, "Alice");
              when(userRepo.findById(1L)).thenReturn(Optional.of(mockUser));
      
              User result = userService.getUserById(1L);
              assertEquals("Alice", result.getName());
          }
      }`,
              useCases: [
                {
                  useCase: "Mock repository or external services",
                  link: "https://www.baeldung.com/mockito-series",
                },
                {
                  useCase: "Verify method interactions",
                  link: "https://site.mockito.org/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Unit Test with JUnit",
              link: "https://www.baeldung.com/junit-5",
            },
            {
              name: "Integration Testing with MockMvc",
              link: "https://www.baeldung.com/spring-boot-testing",
            },
            {
              name: "Mocking with Mockito",
              link: "https://www.baeldung.com/mockito-annotations",
            },
          ],
        },
      },
      {
        name: "Clean Architecture & Dependency Management",
        description:
          "Organize code into layers and manage dependencies to improve maintainability, testability, and scalability.",
        difficulty: "Advanced",
        topics: [
          "Layered Architecture",
          "Dependency Inversion",
          "Modularization",
          "Dependency Injection",
        ],
        details: {
          overview:
            "Clean architecture promotes separation of concerns by organizing code into layers like controllers, services, and repositories. Dependency inversion ensures that high-level modules are not dependent on low-level implementations. Spring Boot aids this via dependency injection and modular configuration.",
          timeComplexity:
            "No direct impact — improves maintainability, not algorithmic performance.",
          spaceComplexity: "Minimal; structural organization overhead only.",
          keyTechniques: [
            {
              name: "Layered Architecture (Controller → Service → Repository)",
              explanation:
                "Divide your codebase into layers to separate responsibilities. Each layer communicates only with adjacent ones.",
              codeExample: `// Controller Layer
      @RestController
      @RequestMapping("/api/users")
      public class UserController {
          @Autowired
          private UserService userService;
      
          @GetMapping("/{id}")
          public ResponseEntity<User> getUser(@PathVariable Long id) {
              return ResponseEntity.ok(userService.getUserById(id));
          }
      }
      
      // Service Layer
      @Service
      public class UserService {
          @Autowired
          private UserRepository userRepository;
      
          public User getUserById(Long id) {
              return userRepository.findById(id).orElseThrow();
          }
      }`,
              useCases: [
                {
                  useCase: "Maintain separation of concerns",
                  link: "https://www.baeldung.com/spring-service-layer",
                },
                {
                  useCase: "Test business logic independently",
                  link: "https://reflectoring.io/spring-boot-clean-architecture/",
                },
              ],
            },
            {
              name: "Dependency Injection (DI)",
              explanation:
                "Inject dependencies through constructors or annotations to decouple class implementations and promote testing.",
              codeExample: `@Service
      public class NotificationService {
          private final EmailClient emailClient;
      
          @Autowired
          public NotificationService(EmailClient emailClient) {
              this.emailClient = emailClient;
          }
      
          public void sendWelcomeEmail(String to) {
              emailClient.send(to, "Welcome!");
          }
      }`,
              useCases: [
                {
                  useCase: "Replace dependencies in tests easily",
                  link: "https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring",
                },
                {
                  useCase: "Improve reusability and configuration flexibility",
                  link: "https://docs.spring.io/spring-framework/reference/core/beans.html",
                },
              ],
            },
            {
              name: "Modularization & Packages",
              explanation:
                "Group related features in packages/modules to isolate functionalities, reduce coupling, and improve readability.",
              codeExample: `com.example.app
      ├── controller
      ├── service
      ├── repository
      └── model`,
              useCases: [
                {
                  useCase: "Domain-driven design structure",
                  link: "https://reflectoring.io/spring-boot-modularization/",
                },
                {
                  useCase: "Team collaboration and scalable architecture",
                  link: "https://dzone.com/articles/modular-monolith-architecture-with-spring-boot",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Implement Layered Architecture",
              link: "https://www.baeldung.com/spring-service-layer",
            },
            {
              name: "Use Constructor Injection in Spring",
              link: "https://www.baeldung.com/constructor-injection-in-spring",
            },
            {
              name: "Structure Projects with Clean Architecture",
              link: "https://reflectoring.io/spring-boot-clean-architecture/",
            },
          ],
        },
      },
      {
        name: "Documentation & Developer Experience",
        description:
          "Enhancing API usability with clear, accessible documentation and smooth integration tools.",
        difficulty: "Intermediate",
        topics: [
          "OpenAPI",
          "Swagger",
          "Postman Collections",
          "API Versioning",
          "Onboarding Tools",
        ],
        details: {
          overview:
            "Good documentation makes it easier for other developers (or even your future self) to understand and use your APIs. Tools like Swagger and Postman automate the documentation process and improve the development workflow. Providing clear error messages, versioning, and testing endpoints helps create a robust developer experience.",
          timeComplexity:
            "No direct impact — affects usability and adoption, not performance.",
          spaceComplexity: "Negligible — metadata and tooling overhead only.",
          keyTechniques: [
            {
              name: "OpenAPI Specification (Swagger)",
              explanation:
                "Automatically generate interactive API documentation using annotations that describe endpoints, request/response models, and parameters.",
              codeExample: `@RestController
      @RequestMapping("/api/books")
      public class BookController {
      
          @Operation(summary = "Get a book by its ID")
          @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "Found the book"),
              @ApiResponse(responseCode = "404", description = "Book not found")
          })
          @GetMapping("/{id}")
          public ResponseEntity<Book> getBook(@PathVariable Long id) {
              // ...
          }
      }`,
              useCases: [
                {
                  useCase: "Interactive Swagger UI for developers",
                  link: "https://springdoc.org/",
                },
                {
                  useCase:
                    "Auto-generate OpenAPI specs for frontend/backend teams",
                  link: "https://github.com/springdoc/springdoc-openapi",
                },
              ],
            },
            {
              name: "API Versioning",
              explanation:
                "Version APIs using path or header strategies to allow backward compatibility and smoother upgrades.",
              codeExample: `@RestController
      @RequestMapping("/api/v1/books")
      public class BookV1Controller {
          // Old API version
      }
      
      @RestController
      @RequestMapping("/api/v2/books")
      public class BookV2Controller {
          // New API version
      }`,
              useCases: [
                {
                  useCase:
                    "Handle breaking changes without affecting consumers",
                  link: "https://www.baeldung.com/spring-rest-api-versioning",
                },
                {
                  useCase:
                    "Support multiple clients with different capabilities",
                  link: "https://www.toptal.com/back-end/versioning-restful-web-services",
                },
              ],
            },
            {
              name: "Postman Collections & API Onboarding",
              explanation:
                "Use Postman collections to share ready-to-test API endpoints and request examples for new developers or stakeholders.",
              codeExample: `// Postman UI — No code
      1. Create collection → Add sample requests
      2. Include headers, params, and body
      3. Share via exported .json or public link`,
              useCases: [
                {
                  useCase: "Quickstart API testing for devs & QA",
                  link: "https://learning.postman.com/docs/publishing-your-api/documenting-your-api/",
                },
                {
                  useCase: "Internal or public API onboarding",
                  link: "https://blog.postman.com/how-to-document-apis-with-postman/",
                },
              ],
            },
          ],
          commonProblems: [
            {
              name: "Generate API Docs with springdoc-openapi",
              link: "https://springdoc.org/",
            },
            {
              name: "Version REST APIs in Spring Boot",
              link: "https://www.baeldung.com/spring-rest-api-versioning",
            },
            {
              name: "Use Postman to Document APIs",
              link: "https://blog.postman.com/how-to-document-apis-with-postman/",
            },
          ],
        },
      },
    ],
  },
};

export default function ProjectsDetail() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof projectCategories>("system-design");
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openConceptModal = (concept: any) => {
    setSelectedConcept(concept);
    setIsModalOpen(true);
  };

  const closeConceptModal = () => {
    setIsModalOpen(false);
    setSelectedConcept(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const currentCategory = projectCategories[selectedCategory];
  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="flex items-center text-slate-600 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-xl font-semibold text-secondary">
              Technical Projects & Concepts
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-secondary mb-4">
                Categories
              </h2>
              <nav className="space-y-2">
                {Object.entries(projectCategories).map(([key, category]) => {
                  const CategoryIcon = category.icon;
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setSelectedCategory(
                          key as keyof typeof projectCategories
                        )
                      }
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                      }`}
                    >
                      <CategoryIcon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary">
                    {currentCategory.title}
                  </h2>
                  <p className="text-slate-600">
                    {currentCategory.description}
                  </p>
                </div>
              </div>

              {/* Concepts Grid */}
              <div className="grid gap-6">
                {currentCategory.concepts.map((concept, index) => {
                  const conceptWithDetails = concept as any;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
                      onClick={() =>
                        conceptWithDetails.details && openConceptModal(concept)
                      }
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-secondary">
                          {concept.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(
                              concept.difficulty
                            )}`}
                          >
                            {concept.difficulty}
                          </Badge>
                          {conceptWithDetails.details && (
                            <Badge variant="outline" className="text-xs">
                              Click to explore
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4">
                        {concept.description}
                      </p>

                      <div>
                        <h4 className="font-medium text-secondary mb-2">
                          Key Topics:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {concept.topics.map((topic, topicIndex) => (
                            <Badge
                              key={topicIndex}
                              variant="outline"
                              className="text-sm"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Modal */}
      {isModalOpen && selectedConcept && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={closeConceptModal}
          />

          {/* Modal Panel - 70% width sliding from right */}
          <div
            className={`w-[70%] bg-white h-full overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isModalOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-secondary">
                    {selectedConcept.name}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {selectedConcept.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeConceptModal}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6">
              {selectedConcept.details && (
                <div className="space-y-8">
                  {/* Overview */}
                  <section>
                    <h3 className="text-xl font-semibold text-secondary mb-4">
                      Overview
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedConcept.details.overview}
                    </p>
                  </section>

                  {/* Complexity Analysis */}
                  {selectedConcept.details.timeComplexity &&
                    selectedConcept.details.spaceComplexity && (
                      <section>
                        <h3 className="text-xl font-semibold text-secondary mb-4">
                          Complexity Analysis
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <h4 className="font-medium text-secondary mb-2">
                              Time Complexity
                            </h4>
                            <code className="text-sm text-slate-600">
                              {selectedConcept.details.timeComplexity}
                            </code>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <h4 className="font-medium text-secondary mb-2">
                              Space Complexity
                            </h4>
                            <code className="text-sm text-slate-600">
                              {selectedConcept.details.spaceComplexity}
                            </code>
                          </div>
                        </div>
                      </section>
                    )}

                  {/* Key Techniques */}
                  <section>
                    <h3 className="text-xl font-semibold text-secondary mb-4">
                      Key Techniques & Implementation
                    </h3>
                    <div className="space-y-6">
                      {selectedConcept.details.keyTechniques.map(
                        (technique: any, index: number) => (
                          <div
                            key={index}
                            className="border border-slate-200 rounded-lg p-6"
                          >
                            <h4 className="text-lg font-semibold text-secondary mb-3">
                              {technique.name}
                            </h4>
                            <p className="text-slate-600 mb-4">
                              {technique.explanation}
                            </p>

                            {/* Code Example */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-secondary">
                                  Implementation
                                </h5>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(technique.codeExample)
                                  }
                                  className="flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4" />
                                  Copy
                                </Button>
                              </div>
                              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{technique.codeExample}</code>
                              </pre>
                            </div>

                            {/* Use Cases */}
                            <div>
                              <h5 className="font-medium text-secondary mb-2">
                                Common Use Cases
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {technique.useCases.map(
                                  (useCase: useCase, ucIndex: number) => (
                                    <Badge
                                      key={ucIndex}
                                      variant="outline"
                                      className="text-sm"
                                    >
                                      <a
                                        key={ucIndex}
                                        href={useCase.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {useCase.useCase}
                                      </a>
                                      {/* {useCase} */}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>

                  {/* Common Problems */}
                  <section>
                    <h3 className="text-xl font-semibold text-secondary mb-4">
                      Practice Problems
                    </h3>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-medium text-secondary mb-3">
                        Recommended LeetCode Problems
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {selectedConcept.details.commonProblems.map(
                          (problem: Problem, index: number) => (
                            <a
                              key={index}
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div
                                key={index}
                                className="flex items-center p-3 bg-white rounded border"
                              >
                                <Play className="w-4 h-4 text-green-500 mr-2" />

                                {problem.name}
                                {/* <span className="text-slate-700">
                                {problem.name}
                              </span> */}
                              </div>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
