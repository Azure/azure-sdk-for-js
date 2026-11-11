# JavaScript and Rust-backed item reads: latency, CPU, and memory


## 1. Test environment and measurements



- **VM:** `js-sdk-rust-read-perf-vm`, `Standard_D4ds_v5`, four virtual CPUs
  (vCPUs), Linux, in **East US**.
- **Database:** Azure Cosmos DB account `rust-migration-eastus`; its read and
  write regions were **East US**, the same region as the VM. The separate
  workload and results containers each used **10,000 RU/s of manually
  provisioned capacity**, unchanged during the tests. RU/s means request units
  per second, the service-side capacity measure.
- **Networking:** accelerated networking was **enabled** on the VM's network
  interface and verified in the saved preflight evidence.
- **Binding framework:** **NAPI-RS** connects the JavaScript wrapper to the
  Rust driver through the native addon.
- **Rust runtime:** **four Tokio worker threads** in every Rust sequence.
  Tokio schedules asynchronous Rust work; legacy JS does not use it.
- **Workload:** one SDK client reading from 1,000 prepared orders.
- **Observed outcome:** **zero reported read errors and no observed
  throttling (HTTP 429)** in the completed experiments shown below.
  Correctness and service-request coverage checks passed. The earlier failed
  harness attempt is excluded.

**Legacy JS** means the existing JavaScript read path in the tested prototype
build, not a separately downloaded historical SDK release.
**Rust + system** and **Rust + mimalloc** use the Rust-backed path with different
allocators, which manage memory allocations and releases in the native addon.

An **iteration** consists of a 120-second legacy-JS run followed by a
120-second Rust run. Warm-up is excluded from the results.

**Reads/s** measures successful reads per second. **CPU utilization** is the
measured process's share of the entire four-vCPU VM. **CPU time per read**
measures process CPU work per successful read, including benchmark work.
**P50, P95, and P99** are response-time percentiles in milliseconds; latency
includes the full SDK response processing. **Peak RSS** is sampled whole-process
resident memory, including benchmark buffers; one MiB is 1,048,576 bytes.
Percentages below use unrounded measurements, so rounded table values may
produce slightly different results.

**Why is Rust's CPU utilization higher than legacy JS?** It completes more
reads per second **and** consumes more CPU time per read. Higher throughput
explains part, but not all, of the increased CPU utilization. These unprofiled
measurements do not identify which internal components cause the extra CPU work.

## 2. Read test: one read in flight

The customer app starts one read, waits for the full SDK response, and then
starts the next. **Concurrency is one**: at most one read is outstanding.
Four Tokio workers do not turn this into four simultaneous reads.

These are all six iterations from the allocator-block experiment. Rust used mimalloc
in iterations 1-3 and the system allocator in iterations 4-6. Each Rust row has its own
legacy-JS control immediately above it.

| Iteration | Implementation  | Reads/s | CPU time per read (microseconds) | CPU utilization | P50 ms | P95 ms | P99 ms | Peak RSS MiB |
| --------- | --------------- | ------: | -------------------------------: | --------------: | -----: | -----: | -----: | -----------: |
| 1         | Legacy JS       |   344.6 |                            257.4 |           2.22% |  2.821 |  3.498 |  5.026 |        111.3 |
| 1         | Rust + mimalloc |   452.9 |                            296.2 |           3.35% |  2.167 |  2.638 |  3.263 |        129.8 |
| 2         | Legacy JS       |   338.5 |                            227.5 |           1.93% |  2.865 |  3.669 |  5.546 |        112.8 |
| 2         | Rust + mimalloc |   409.2 |                            294.9 |           3.02% |  2.395 |  2.832 |  3.369 |        119.6 |
| 3         | Legacy JS       |   377.8 |                            238.1 |           2.25% |  2.602 |  3.098 |  3.571 |        111.9 |
| 3         | Rust + mimalloc |   403.2 |                            301.9 |           3.04% |  2.516 |  3.092 |  4.690 |        118.7 |
| 4         | Legacy JS       |   339.6 |                            247.9 |           2.10% |  2.815 |  3.732 |  5.666 |        111.7 |
| 4         | Rust + system   |   404.9 |                            325.4 |           3.29% |  2.516 |  3.056 |  4.020 |        104.2 |
| 5         | Legacy JS       |   353.6 |                            234.4 |           2.07% |  2.749 |  3.404 |  4.738 |        111.3 |
| 5         | Rust + system   |   385.0 |                            333.1 |           3.21% |  2.578 |  3.099 |  4.501 |        104.6 |
| 6         | Legacy JS       |   350.7 |                            252.0 |           2.21% |  2.756 |  3.571 |  4.918 |        110.7 |
| 6         | Rust + system   |   415.8 |                            324.0 |           3.37% |  2.356 |  2.925 |  4.030 |        102.6 |

### Mimalloc versus system allocator

Comparing system-to-mimalloc iterations **4 to 1, 5 to 2, and 6 to 3**, respectively:

- **CPU time per read:** decreased **9.0%, 11.5%, and 6.8%**.
- **CPU utilization:** increased **1.8%** in the first comparison, then decreased
  **5.9% and 9.6%**.
- **Throughput:** increased **11.9% and 6.3%**, then decreased **3.0%**.
- **P99:** improved **18.8% and 25.2%**, then worsened **16.4%**.
- **Peak RSS:** increased **24.5%, 14.4%, and 15.7%**.

The first comparison illustrates the distinction: **mimalloc used less CPU
per read, but completed enough additional reads per second that total CPU
utilization increased slightly.**

### Compared with legacy JS

Against their respective matched legacy-JS controls:

- **Rust + system allocator:** **8.9-19.2% higher throughput**, but
  **28.6-42.1% more CPU time per read**.
- **Rust + mimalloc:** **6.7-31.4% higher throughput**, but
  **15.1-29.6% more CPU time per read**.

## 3. Load test: 32 reads in flight

The customer app starts 32 reads and replaces each completed read with another.
**Concurrency is 32**, using one shared SDK client. This is not 32 JavaScript
threads or 32 Tokio workers. When the measurement period ends, the harness stops
new submissions and lets outstanding reads finish before reporting.

These are all four iterations from the concurrent allocator experiment. Rust used
the system allocator in iterations 1 and 4, and mimalloc in iterations 2 and 3.

| Iteration | Implementation  | Reads/s | CPU time per read (microseconds) | CPU utilization | P50 ms | P95 ms | P99 ms | Peak RSS MiB |
| --------- | --------------- | ------: | -------------------------------: | --------------: | -----: | -----: | -----: | -----------: |
| 1         | Legacy JS       |   6,103 |                            168.3 |           25.7% |  5.094 |  7.241 |  8.201 |        148.9 |
| 1         | Rust + system   |   8,399 |                            320.8 |           67.4% |  3.660 |  5.339 |  7.640 |        158.0 |
| 2         | Legacy JS       |   6,103 |                            168.2 |           25.7% |  5.086 |  7.221 |  8.182 |        149.8 |
| 2         | Rust + mimalloc |   8,972 |                            266.0 |           59.7% |  3.485 |  4.674 |  6.220 |        167.5 |
| 3         | Legacy JS       |   6,085 |                            168.5 |           25.6% |  5.071 |  7.161 |  8.558 |        148.9 |
| 3         | Rust + mimalloc |   8,477 |                            267.8 |           56.8% |  3.713 |  4.879 |  6.276 |        167.1 |
| 4         | Legacy JS       |   6,147 |                            166.8 |           25.6% |  5.009 |  7.104 |  8.529 |        147.9 |
| 4         | Rust + system   |   8,425 |                            321.2 |           67.6% |  3.688 |  5.123 |  6.808 |        159.4 |

### Mimalloc versus system allocator

Comparing system-to-mimalloc iterations **1 to 2 and 4 to 3**, respectively:

- **CPU time per read:** decreased **17.1% and 16.6%**.
- **CPU utilization:** decreased **11.4% and 16.1% relatively**, equivalent to
  **7.69 and 10.89 percentage points** of VM capacity.
- **Throughput:** increased **6.8% and 0.6%**.
- **P99:** improved **18.6% and 7.8%**.
- **Peak RSS:** increased **6.0% and 4.8%**, equivalent to **9.6 and 7.7 MiB**.

**Mimalloc completed more reads while using less total CPU than the system
allocator in both concurrent comparisons.**

### Compared with legacy JS

Against their respective matched legacy-JS controls:

- **Rust + system allocator:** **37.1-37.6% higher throughput**, but
  **90.6-92.5% more CPU time per read**.
- **Rust + mimalloc:** **39.3-47.0% higher throughput**, but
  **58.2-59.0% more CPU time per read**.

For example, in iteration 2, Rust + mimalloc completed **8,972 reads/s versus
6,103**, but each read consumed **266.0 microseconds of CPU versus 168.2**.
Together, these explain its **59.7% CPU utilization versus 25.7%**. This was
an equal-concurrency test, **not an equal-throughput test**.

## 4. Conclusion

**Mimalloc is promising for concurrent workloads:** compared with the system
allocator, it reduced CPU work per read and CPU utilization, improved P99,
and increased RSS in both concurrent comparisons.



Rust + mimalloc remains faster but less CPU-efficient than legacy JS in these
measurements. The allocator change narrowed that CPU-efficiency gap; it did
not eliminate it.
