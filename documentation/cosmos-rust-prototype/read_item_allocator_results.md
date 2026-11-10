# JavaScript and Rust-backed item reads: latency, CPU, and memory

## Table of contents

1. [Start with the customer question](#1-start-with-the-customer-question)
2. [Understand the setup and measurements](#2-understand-the-setup-and-measurements)
3. [Read test: one read in flight](#3-read-test-one-read-in-flight)
4. [Load test: 32 reads in flight](#4-load-test-32-reads-in-flight)
5. [Why Rust uses more CPU than legacy JavaScript](#5-why-rust-uses-more-cpu-than-legacy-javascript)
6. [What mimalloc improved over the system allocator](#6-what-mimalloc-improved-over-the-system-allocator)
7. [What these results establish](#7-what-these-results-establish)

## 1. Start with the customer question

A **customer app** uses the SDK to read an order from the Cosmos DB
**service backend**, the remote service that stores the data. The question is
whether the Rust-backed SDK returns that order faster, handles more reads,
and uses less client CPU and memory than the existing JavaScript path.

These are separate questions. **A faster response does not necessarily mean
less CPU work.** This report shows both response time and resource consumption
for tests completed on November 10, 2026.

**Legacy JS** means the existing JavaScript read path in the tested prototype
build, not a separately downloaded historical SDK release.
**Rust + mimalloc** means the JavaScript wrapper and its native binding calling
the Rust driver. A **binding** connects the JavaScript and Rust code.
An **allocator** manages memory allocations and releases; **mimalloc** is the
alternative allocator selected for Rust allocations in the tested native addon.
This does not mean JavaScript itself was rewritten in Rust.

**Rust + system** uses the same Rust-backed read path with the system allocator
instead of mimalloc. Both tables include all three implementations and every
matched legacy-JS control, so the CPU benefit and memory trade-off are visible.
Section 6 quantifies the allocator comparisons.

## 2. Understand the setup and measurements

### What stayed fixed

Both experiments used the same four-vCPU Linux VM in East US. A **vCPU** is a
virtual processor available to the VM. Each measured process used one SDK
client and read from the same set of 1,000 prepared orders. Workload and
results containers each retained their existing 10,000 request units per
second capacity. **Request units** measure service-side work; they are not
client CPU time.

**Every Rust row used four Tokio worker threads.** Tokio is the runtime that
schedules asynchronous Rust work. These are runtime workers, not the number
of reads in flight, not a count of every thread in the process, and not a
claim that four workers is optimal. Legacy JS does not use Tokio.

The SDK build, Rust driver revision, and native allocator binaries were
unchanged between these experiments. The load test used an updated benchmark
harness, the code that starts reads and records measurements, to support
concurrent reads and a larger bounded histogram buffer.

### How each pair was measured

A **pair** consists of a 120-second legacy-JS sequence followed by a
120-second Rust sequence, run separately rather than simultaneously.
The tables retain each pair independently; they do not average percentiles
or combine different runs into a single score. Pair numbers belong to their
respective experiment.

Both implementations exclude the initial warm-up using the same rule:
retain only recorded measurement intervals whose start is at least
11 seconds into the sequence. Reads/s and CPU measurements use the actual
retained duration, including any final partial interval.

### What the columns mean

**Reads/s** is successful reads divided by elapsed seconds. Higher means
greater throughput: more completed reads in the same amount of time.

**CPU time per read (microseconds)** is total process CPU time divided by
successful reads. One microsecond is one-millionth of a second. Lower means
less CPU work per completed read. CPU time is summed across the measured
process's threads and includes the SDK, binding, Rust driver when selected,
runtime, and benchmark code. It is not a Rust-driver-only measurement.

**CPU utilization** is that process's average CPU consumption as a percentage
of the entire four-vCPU VM:

```text
CPU utilization (%) = process CPU seconds / elapsed seconds / 4 * 100
```

Using one full core is 25%; using all four is 100%. This does not include
other processes on the VM. Lower utilization alone is not proof of better
efficiency: a process doing fewer reads can also use less CPU.

**P50, P95, and P99** are response-time percentiles in milliseconds. P99 is
the time within which 99% of measured successful reads completed; it is not
the maximum. Lower is better. These values come from the combined latency
histogram within each sequence, not averages of interval percentiles.
A **histogram** counts how many reads fell into each measured duration.

The response timer covers the full public `await Item.read()` call, including
SDK receive-side decoding, JSON parsing, diagnostics, and response construction.
It is not service-backend latency or time to the first response byte.
Benchmark correctness checks after the call are outside this latency timer,
but their CPU work is included in the process CPU measurement.
Result reporting happens after the read loop and is excluded from that loop's
CPU and latency measurements.

**Peak RSS MiB** is the highest sampled resident memory of the measured
process during the retained intervals. RSS means resident set size: memory
resident in physical RAM. One MiB is 1,048,576 bytes. This includes the runtime
and benchmark buffers, not just SDK or Rust allocations. It is not an exact
instantaneous peak, a memory-leak measurement, or an allocation-byte count.

## 3. Read test: one read in flight

The customer app starts one read, waits for the full SDK response, and then
starts the next. **Concurrency is one**: at most one read is outstanding.
Four Tokio workers do not turn this into four simultaneous reads.

These are all six pairs from the allocator-block experiment. Rust used mimalloc
in pairs 1-3 and the system allocator in pairs 4-6. Each Rust row has its own
legacy-JS control immediately above it.

| Pair | Implementation  | Reads/s | CPU time per read (microseconds) | CPU utilization | P50 ms | P95 ms | P99 ms | Peak RSS MiB |
| ---- | --------------- | ------: | -------------------------------: | --------------: | -----: | -----: | -----: | -----------: |
| 1    | Legacy JS       |   344.6 |                            257.4 |           2.22% |  2.821 |  3.498 |  5.026 |        111.3 |
| 1    | Rust + mimalloc |   452.9 |                            296.2 |           3.35% |  2.167 |  2.638 |  3.263 |        129.8 |
| 2    | Legacy JS       |   338.5 |                            227.5 |           1.93% |  2.865 |  3.669 |  5.546 |        112.8 |
| 2    | Rust + mimalloc |   409.2 |                            294.9 |           3.02% |  2.395 |  2.832 |  3.369 |        119.6 |
| 3    | Legacy JS       |   377.8 |                            238.1 |           2.25% |  2.602 |  3.098 |  3.571 |        111.9 |
| 3    | Rust + mimalloc |   403.2 |                            301.9 |           3.04% |  2.516 |  3.092 |  4.690 |        118.7 |
| 4    | Legacy JS       |   339.6 |                            247.9 |           2.10% |  2.815 |  3.732 |  5.666 |        111.7 |
| 4    | Rust + system   |   404.9 |                            325.4 |           3.29% |  2.516 |  3.056 |  4.020 |        104.2 |
| 5    | Legacy JS       |   353.6 |                            234.4 |           2.07% |  2.749 |  3.404 |  4.738 |        111.3 |
| 5    | Rust + system   |   385.0 |                            333.1 |           3.21% |  2.578 |  3.099 |  4.501 |        104.6 |
| 6    | Legacy JS       |   350.7 |                            252.0 |           2.21% |  2.756 |  3.571 |  4.918 |        110.7 |
| 6    | Rust + system   |   415.8 |                            324.0 |           3.37% |  2.356 |  2.925 |  4.030 |        102.6 |

Rust + mimalloc completed more reads per second in all three pairs, but used
more CPU per read and more sampled peak memory than its matched legacy-JS
control. P99 improved in pairs 1 and 2, but worsened in pair 3. This is not a
consistent single-read P99 win.

## 4. Load test: 32 reads in flight

The customer app starts 32 reads and replaces each completed read with another.
**Concurrency is 32**, using one shared SDK client. This is not 32 JavaScript
threads or 32 Tokio workers. When the measurement period ends, the harness stops
new submissions and lets outstanding reads finish before reporting.

These are all four pairs from the concurrent allocator experiment. Rust used
the system allocator in pairs 1 and 4, and mimalloc in pairs 2 and 3.

| Pair | Implementation  | Reads/s | CPU time per read (microseconds) | CPU utilization | P50 ms | P95 ms | P99 ms | Peak RSS MiB |
| ---- | --------------- | ------: | -------------------------------: | --------------: | -----: | -----: | -----: | -----------: |
| 1    | Legacy JS       |   6,103 |                            168.3 |           25.7% |  5.094 |  7.241 |  8.201 |        148.9 |
| 1    | Rust + system   |   8,399 |                            320.8 |           67.4% |  3.660 |  5.339 |  7.640 |        158.0 |
| 2    | Legacy JS       |   6,103 |                            168.2 |           25.7% |  5.086 |  7.221 |  8.182 |        149.8 |
| 2    | Rust + mimalloc |   8,972 |                            266.0 |           59.7% |  3.485 |  4.674 |  6.220 |        167.5 |
| 3    | Legacy JS       |   6,085 |                            168.5 |           25.6% |  5.071 |  7.161 |  8.558 |        148.9 |
| 3    | Rust + mimalloc |   8,477 |                            267.8 |           56.8% |  3.713 |  4.879 |  6.276 |        167.1 |
| 4    | Legacy JS       |   6,147 |                            166.8 |           25.6% |  5.009 |  7.104 |  8.529 |        147.9 |
| 4    | Rust + system   |   8,425 |                            321.2 |           67.6% |  3.688 |  5.123 |  6.808 |        159.4 |

At this load, Rust + mimalloc delivered about 39-47% more reads per second
and 24-27% lower P99 than its matched legacy-JS controls. It still required
about 58-59% more CPU per read and approximately 18 MiB more sampled peak RSS.
These are matched-concurrency results, not results at equal reads/s or equal
CPU utilization.

## 5. Why Rust uses more CPU than legacy JavaScript

There are two measured reasons for the higher total CPU utilization:
**Rust completes more reads each second, and each read consumes more CPU.**
The relationship is:

```text
CPU utilization (%) =
    reads/second * CPU microseconds/read / 1,000,000 / 4 * 100
```

For load-test pair 2, the displayed rounded values give:

```text
Legacy JS:       6,103 * 168.2 / 1,000,000 / 4 * 100 = about 25.7%
Rust + mimalloc: 8,972 * 266.0 / 1,000,000 / 4 * 100 = about 59.7%
```

The higher throughput therefore does not explain away the CPU-efficiency gap:
266.0 microseconds of CPU per read is still more than 168.2.
CPU time also differs from elapsed response time. A read can take several
milliseconds to return while consuming only a fraction of a millisecond of
CPU; waiting without executing does not consume CPU time.

**These unprofiled runs do not establish which functions cause the extra
CPU work per read.** They do not isolate allocation, copying, runtime
scheduling, binding overhead, or the driver itself. Source inspection confirms
the Rust-backed path includes wrapper/binding and driver work, but does not
quantify their costs. Attributing the gap to one component requires profiling
this workload; it cannot be inferred from these tables or another SDK's report.

## 6. What mimalloc improved over the system allocator

**Mimalloc lowered CPU utilization compared with Rust + the system allocator
in both concurrent comparisons. It did not lower it below legacy JS.**

At the same 32-read concurrency and four Tokio workers:

- Pair 1 system to pair 2 mimalloc: CPU utilization fell from **67.36% to
  59.67%**, a decrease of **7.69 percentage points**. CPU time per read fell
  **17.1%**, while throughput increased **6.8%**.
- Pair 4 system to pair 3 mimalloc: CPU utilization fell from **67.65% to
  56.76%**, a decrease of **10.89 percentage points**. CPU time per read fell
  **16.6%**, while throughput increased **0.6%**.

P99 fell by 18.6% and 7.8%, respectively. Sampled peak RSS increased by 9.6 MiB
and 7.7 MiB. The nearby legacy-JS controls were relatively stable, and the
CPU-saving direction was consistent in both comparisons.

The single-read experiment also showed lower CPU time per read with mimalloc,
by 6.8-11.5% in its predeclared ordinal comparisons: system pairs 4, 5, and 6
against mimalloc pairs 1, 2, and 3, respectively. Sampled peak RSS increased
by 15.0-25.6 MiB. **The measured trade-off is less CPU work per read but more
resident memory, not a memory reduction.** However, **lower CPU time
per read does not guarantee lower total CPU utilization when throughput
changes**. For example, single-read pair 1 with mimalloc used about 3.35% of
the VM, versus 3.29% for system-allocator pair 4, while completing more reads.
Do not extend the concurrent-utilization result into an unconditional claim
that mimalloc always lowers CPU utilization.

## 7. What these results establish

**Mimalloc is promising for concurrent workloads: at the tested concurrency
of 32, it reduced CPU work per read and CPU utilization, and improved P99
relative to the system allocator, at the cost of higher RSS.** Rust + mimalloc
remained faster but less CPU-efficient than legacy JS.

For a customer app handling overlapping requests, give the concurrent-load
result more weight than the single-read result, provided that the tested
concurrency represents the app's actual usage. The single-read test remains
the baseline for requests that do not overlap; neither test represents every
production workload.

**Sustained, production-representative testing is still needed before
recommending mimalloc as the default.** That testing should cover normal and
peak demand, representative data and operations, latency, CPU, errors, and
whether memory stabilizes over time. These experiments did not change
production defaults or tune Tokio worker counts.

Both completed experiments passed correctness, saved-artifact integrity,
credential cleanup, and service-request coverage checks, with no observed
read errors or throttling. The first attempted concurrent matrix failed a
harness assertion and is excluded. Its log did not preserve the exact
assertion cause; an independently reproduced histogram-capacity defect was
fixed before the successful fresh run. The larger buffer does not preallocate
its full capacity or reduce the precision of recorded durations.

Evidence identifiers:

- Single-read matrix: `495e0302-dbf6-4c51-9908-b344a85bfadc`.
- Concurrent matrix: `f1c44849-adbd-4531-86ab-8f92a2b37b30`.
- JS base revision: `36d77f0ac4ee9cac5bfa923e4dd8ea8744f0f15b`, with the
  recorded allocator and workload overlays.
- Rust driver revision: `5ba864be8f128a6faf3f736ae0043f60d5911235`.

The persisted matrix evidence includes `analysis-summary.json`,
`verification-verdict.json`, and `service-verification.json`; the verdict
records the final qualification after the service audit. Raw interval
artifacts are retained separately. The workload implementation is in
`sdk\cosmosdb\cosmos\test\workloads`: `workload.mjs` defines timing and the
read loop, `launch.mjs` records concurrency and worker settings, and
`stats.mjs` retains and combines histograms.

There were three single-read observations and two concurrent observations
per allocator. Single-read allocator blocks ran at different times; every
pair ran legacy JS first. The results are not a statistical guarantee,
maximum-capacity test, equal-throughput comparison, or sustained-memory study.
They do not predict other item sizes, operations, transports, or concurrency
levels. Use the matched rows within each experiment, rather than treating
the two experiments as a controlled measurement of concurrency alone.
