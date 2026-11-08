# Compare JS SDK item-read latency

[Implementation guide](read_item.md) | [Language foundations](foundations.md)

This is the follow-along guide for comparing the existing JavaScript read path
with the Rust-backed read path. It follows the structure of the Python
`docs/V5/profiling/05-phase-a-operation-latency.md` guide, but measures **only
public `Item.read()`**.

There are **12 bites**. Their numbering is separate from the implementation
guide. We will agree on preparation, capacity, and execution budgets before
performing the corresponding service operations. A saved command or example
configuration is not permission to run it.

## Where we are now

**Checkpoint: November 8, 2026 (UTC).** The pushed optimizations are deployed
and rebuilt on the VM. Workload capacity is now 10,000 RU/s. The earlier bounded
preflight qualifies the older build only; no live run of the optimized build or
full performance comparison has started.

| Part | Recorded state | Remaining work |
|---|---|---|
| VM | `js-sdk-rust-read-perf-vm`, East US, Ubuntu x64; accelerated networking verified | Select this VM explicitly |
| JS source | Clean VM checkout of `b02be558c113d856cc77c8ea7e32c48868465a76`; SDK and Linux release binding built | Qualify both implementations from this build |
| Rust dependency | Built with driver `5ba864be8f128a6faf3f736ae0043f60d5911235` and Rust 1.95.0 | Retain matching build evidence |
| Earlier native build | Preserved separately; not used for this preflight | Do not mix artifacts between checkouts |
| Workload qualification | Earlier build: all 1,000 orders passed JS/Rust body and ETag checks; Rust data requests used Gateway V2 | Repeat qualification for the selected build |
| Dedicated data and results destinations | Provisioned; 1,000 orders seeded; manual dedicated throughput is 10,000 RU/s for workload and 400 RU/s for results | Preserve isolation; retain preflight result records |
| Capacity preflight | Earlier build at 1,000 RU/s: one 15-second sequence per implementation, 5-second reporting; no workload errors or observed SDK/service 429 | Repeat an approved bounded check; more capacity does not guarantee no throttling |
| Measurement protocol | Deployed build reports during reads; local changes defer reporting until each sequence ends. All samples still include warm-up | Push/deploy the workload changes and calibrate warm-up before steady-state interpretation |
| Full performance execution | Not started | Approve the complete configuration and run budget |

**Changes deployed after that preflight:** the workload now rejects Rust-marked
JavaScript responses, persists bounded attempt evidence, records UTC/host/capacity
snapshots, verifies the effective configuration's SHA-256, and handles
SIGINT/SIGTERM with bounded cleanup and an aborted manifest. The Linux build and
offline checks passed; these changes have not been exercised against the service.
The recorded preflight qualifies the older checkout, not these new safeguards.
Repeat a separately approved short preflight before the full comparison.

The deployed wrapper/binding optimizations also postdate this preflight. They
reuse adapter state, eliminate placeholder read diagnostics, skip formatting
for the no-op diagnostic writer, and prepare successful native response data
on Tokio before JavaScript completion. The shared diagnostic optimizations
change the JavaScript baseline too. Both SDK targets and the Linux release addon
were rebuilt, with new provenance retained. Both paths still need live
qualification from the same revision. The body copy remains inside the
public-read timer; no warm-up exclusion or timing boundary was added.

The clean checkout is:

```text
/home/azureuser/js-sdk-rust-read-perf/checkouts/b02be558c113d856cc77c8ea7e32c48868465a76
```

The release build completed at **23:50:15 UTC on November 7, 2026** using Node
22.23.3, pnpm 11.24.0, and Rust/Cargo 1.95.0. All 17 SDK build tasks succeeded;
13 binding checks, 25 workload checks, and 73 wrapper/diagnostics/selection/loader
tests passed. CommonJS/ESM imports, the native async probe, workload configuration
typing, and binary/provenance checks also passed. Addon SHA-256:

```text
734be3f570f43de8e5a17f8fecf6840db704ea695d2877584bda0dbe8a833f17
```

The previous `1ea9953656d8a33cd74d3b4aed7af138a4da34eb` checkout, addon, and
manifest were preserved and checked for changes.

**Local change after this deployment:** reporting now buffers bounded interval
snapshots during reads and persists them only after the sequence stops. All
acknowledgements and completion persistence finish before the next sequence.
The behavior described below reflects that local change, which is not yet in
the deployed `b02be558c113d856cc77c8ea7e32c48868465a76` checkout. It changes only
the workload, not the SDK, binding, or driver. Push and deploy it before
calibration; no warm-up cutoff has been selected.

The earlier checkout at `/home/azureuser/js-sdk-rust-read-perf/azure-sdk-for-js`
was preserved, not overwritten. Its native build used the earlier JS source
plus a recorded build overlay. The older Windows live-read results do not
qualify the new Linux build or the new dataset.

### Recorded preflight

The approved preflight ran from **06:36:35 to 06:37:22 UTC** on November 7,
2026. Run ID: `afbeb61f-e429-4aa9-8bad-ff9ac7ccb877`.

| Sequence | Successful public reads | Errors | Observed SDK 429 |
|---|---:|---:|---:|
| JavaScript, 15-second budget | 5,030 | 0 | 0 |
| Rust, 15-second budget | 5,598 | 0 | 0 |

These counts exclude the 2,000 qualification reads. All 5,598 measured Rust
reads passed the data-request Gateway V2 checks. Six interval records and two
valid completion records were saved and read back successfully.

Service-side verification used `TotalRequests` with its supported **Count**
aggregation, split by status code and filtered to each dedicated container.
The surrounding **06:31-06:43 UTC** window included delayed service buckets:
12,633 workload status-200 requests and eight results status-201 requests,
with no observed 429 for either destination. Service counts include supporting
requests; they are not substituted for workload operation counts. `Total` is
not a supported aggregation for this metric and was not used for the verdict.

The VM evidence directory is:

```text
/home/azureuser/js-sdk-rust-read-perf/preflight/read-20261107T063520Z-wysvUaNp
```

Its `run` subdirectory contains the effective configuration, qualification
fixture, manifest, acknowledged result mirrors, and integrity-checked report.
The credential handoff used temporary encryption; the private key was removed,
and the account key was supplied only in process memory. No plaintext key was
saved to the VM's configuration or artifacts.

**This is readiness evidence, not a latency-performance conclusion or
authorization to start the proposed 60-second, two-repetition comparison.**

## Foundation: operation, sequence, and repetition

An **operation** is one SDK call that reads an item. A **sequence** repeatedly
performs that operation through one SDK implementation in one Node.js process.
A **repetition** runs one JavaScript sequence and one Rust sequence.

```text
One operation:    await item.read()

One sequence:    read -> wait -> record outcome -> read -> wait -> ...

One repetition:  JavaScript sequence -> Rust sequence
```

The **workload** is the code making the reads. The **launcher** starts its
processes and requests their stop. The **reporter** saves the measurements.
These belong to the experiment, not to the customer's SDK API.

## Guide map

1. [What are we comparing?](#bite-1-of-12-what-are-we-comparing)
2. [Where will data and results live?](#bite-2-of-12-where-will-data-and-results-live)
3. [What must be built on the VM?](#bite-3-of-12-what-must-be-built-on-the-vm)
4. [How is the workload organized?](#bite-4-of-12-how-is-the-workload-organized)
5. [How many reads run at once?](#bite-5-of-12-how-many-reads-run-at-once)
6. [How long will each sequence run?](#bite-6-of-12-how-long-will-each-sequence-run)
7. [What does the latency timer include?](#bite-7-of-12-what-does-the-latency-timer-include)
8. [What measurements do we save?](#bite-8-of-12-what-measurements-do-we-save)
9. [Could service capacity hide the difference?](#bite-9-of-12-could-service-capacity-hide-the-difference)
10. [What must pass before measurement?](#bite-10-of-12-what-must-pass-before-measurement)
11. [How do we launch an approved comparison?](#bite-11-of-12-how-do-we-launch-an-approved-comparison)
12. [How do we interpret the results?](#bite-12-of-12-how-do-we-interpret-the-results)

## Bite 1 of 12: What are we comparing?

Alpha Bank's **customer app** needs to retrieve an order. The **SDK** performs
that read against the Cosmos DB **service backend** and returns an
`ItemResponse`.

Use this order throughout the drill:

```json
{
  "id": "order-204",
  "customerId": "customer-204",
  "countryCode": "US",
  "quantity": 2,
  "status": "Pending"
}
```

With an existing client and the intended container, the customer's call is:

```javascript
const item = container.item("order-204", "customer-204");
const response = await item.read();
```

The comparison asks:

> How long does this public SDK call take through JavaScript versus Rust,
> using equivalent prepared items and the same workload configuration?

Both implementations must return status 200 and the expected order. We do not
replace the public call with `NativeReadClient.readItem()`: that would omit the
wrapper and response conversion the customer app uses.

The result field `config_backend` identifies the selected **SDK
implementation**, `javascript` or `rust`. It does not identify a different
service backend.

**This is a read comparison, not a CRUD benchmark or a measurement of the
binding alone.**

## Bite 2 of 12: Where will data and results live?

Reading orders and saving measurements are different responsibilities. Give
them separate databases and containers in `rust-migration-eastus`:

| Purpose | Database | Container | Partition-key path |
|---|---|---|---|
| Prepared orders | `js_rust_read_latency_workload_db` | `js_rust_read_latency_workload_container` | `/customerId` |
| Measurements, errors, completion | `js_rust_read_latency_results_db` | `js_rust_read_latency_results_container` | `/partition_key` |

These destinations are provisioned. They do not reuse the Python profiling resources
or the earlier `js_rust_read_item_db` / `js_rust_read_item_container` fixture.

**Seeding** means storing the starting items before measurement. Prepare 1,000
orders, from `order-0` through `order-999`, with matching customer identifiers.
Every order has the five application fields shown in Bite 1.

For `order-204`, the partition-key value is **`customer-204`**, not `order-204`.
The Python example used `/id`; our JS container uses `/customerId`.

The workload's `seedItem(index)` only constructs the expected body in memory.
It does not create resources or store items. Provisioning and seeding need a
separately approved preparation step. No seeding command has been added to the
launcher.

Unlike the Python write comparisons, this workload does not change order
contents or introduce extra orders. It therefore has no write-restoration
loop. Keep the dataset exclusive to this experiment; another writer can still
invalidate it.

**Separate destinations prevent results from becoming workload data. They do
not eliminate shared VM or account effects.**

## Bite 3 of 12: What must be built on the VM?

The source checkout is not the installed SDK. We need both:

| Build output | Why it is needed |
|---|---|
| `sdk/cosmosdb/cosmos/dist/commonjs` | The JavaScript SDK loaded by this workload |
| `sdk/cosmosdb/cosmos/rust-prototype/cosmos_js_rust_prototype.node` | The Linux x64 native extension loaded by the Rust-selected client |

Cargo fetches the driver revision pinned in `Cargo.toml` and resolves the graph
recorded in `Cargo.lock`. Checking out newer Rust source on the developer's
machine does not silently change that dependency.

The NAPI-RS binding and driver compile together into the native extension.
Do not copy the Windows addon to Ubuntu. Use the optimized **release profile**,
which selects the compiler's release-build settings.

The build commands below run in **Bash on the Linux VM**, not in local
PowerShell. They prepare code; they do not launch the service workload:

```bash
REPO="$HOME/js-sdk-rust-read-perf/checkouts/b02be558c113d856cc77c8ea7e32c48868465a76"
cd "$REPO"
pnpm install --frozen-lockfile
pnpm turbo build --filter=@azure/cosmos... --token 1

cd sdk/cosmosdb/cosmos
npm run build:rust-prototype -- --release
npm run test:rust-prototype
npm run test:read-workload
```

Dependency installation can require the repository's normal package-feed
authentication. Follow the [SDK workflow](../../.github/skills/sdk-workflow/SKILL.md);
do not bypass TLS or commit credentials.

### What identifies the binary we actually built?

**Build provenance** is the record connecting an artifact to its source and
build settings. Before launching, retain the actual JS revision, any source
overlay, Rust revision, compiler version, release profile, addon SHA-256, and
Cargo lockfile SHA-256.

The configuration's `nativeBuildManifest` must identify that record. The
launcher checks the addon and lockfile hashes against it and fingerprints the
loaded CommonJS tree and workload files.

**`build.cjs` builds and copies the addon; it does not generate this manifest.**
The committed checkout's matching manifest is:

```text
/home/azureuser/js-sdk-rust-read-perf/build-evidence/b02be558c113d856cc77c8ea7e32c48868465a76-release/build-manifest.json
```

The committed example configuration still points at the earlier build's
manifest and expects 1,000 RU/s. The new build-evidence directory contains
`read-latency.proposed.json`, using the matching manifest above and expected
capacity of 10,000/400 RU/s, plus its exact-byte SHA-256. It retains the proposed
60-second/two-repetition budget with 15-second snapshots; it has not been run
and is not yet a warm-up calibration protocol. Do not treat an older path as
valid merely because the file exists.

**Ready means the intended checkout has both outputs and matching build
evidence, not simply that a previous native build succeeded.**

## Bite 4 of 12: How is the workload organized?

The new folder is `sdk/cosmosdb/cosmos/test/workloads`. It follows the JS
repository's singular `test` convention, analogous to Python's `tests/workloads`.

| File | Responsibility |
|---|---|
| `launch.mjs` | Validate settings, qualify the dataset, start separate processes, enforce stop deadlines, and request the final report |
| `workload.mjs` | Perform qualification or repeated public reads, depending on the launch mode |
| `stats.mjs` | Accumulate latency frequencies, errors, request charges, and the first operation; bound buffered intervals |
| `reporter.mjs` | Save interval, error, and completion records after reads stop |
| `report.mjs` | Read saved records back, check integrity, and merge interval distributions |
| `common.mjs` | Define targets and expected orders; check configuration, responses, and provenance |
| `read-latency.example.json` | Show the proposed, secret-free configuration |
| `workload.spec.mjs` | Exercise workload behavior without service calls |

The process arrangement is:

```text
Launcher process
    -> separate qualification process: check JavaScript and Rust reads
    -> JavaScript measurement process: one reused workload client
    -> Rust measurement process: one reused workload client
    -> repeat as configured

Measurement process
    -> read -> interval snapshot in memory -> next read
    -> stop reading -> final snapshot
    -> send snapshots one at a time; await each persistence acknowledgement
    -> send completion

Launcher reporter
    -> after reads: its own JavaScript SDK client -> results container
    -> persist completion before the launcher advances to the next sequence
```

**An interval snapshot** is the accumulated data for one reporting period.
It is not a copy of every order read.

Python's reporter uses a background thread. Here the reporter runs in the
launcher process, outside the measured process. It always uses the JavaScript
SDK path; selecting Rust for measured reads does not change reporting.
These are separate clients on the same VM. Deferring writes also removes their
serialization, IPC, and acknowledgement processing from the read phase.
Statistics collection, interval capture, and buffer allocation still cost CPU
and memory; this is not an overhead-free measurement.

## Bite 5 of 12: How many reads run at once?

For this first comparison, each measured process has:

| Setting | Selected behavior |
|---|---|
| Workload clients | One |
| Outstanding workload reads | One |
| API | Asynchronous public `Item.read()` |
| Scheduling | Send one read, await its completion, then prepare the next |
| Item selection | `order-0` through `order-999`, then repeat that order |

Using `await` does not require overlapping calls. This workload deliberately
does not launch a new read while the preceding read is unfinished.

Both implementations start at the same item index. A faster sequence may
complete more reads and cycle through the range more times; equal durations
do not imply equal operation counts.

The client is reused throughout a sequence, rather than recreated per read.
Different sequences get fresh processes and fresh clients.

**One outstanding read limits concurrency, not the number of reads that can
finish per second.**

## Bite 6 of 12: How long will each sequence run?

The example configuration proposes:

| Setting | Proposed value | Meaning |
|---|---:|---|
| `durationSeconds` | 60 | Budget before the launcher requests a measured process to stop |
| `reportIntervalSeconds` | 15 | Target interval between in-memory snapshots, not writes |
| `repetitions` | 2 | Number of JavaScript-then-Rust pairs |
| `qualificationTimeoutSeconds` | 120 | Budget for checking the prepared dataset before measurement |
| `shutdownGraceSeconds` | 30 | Additional deadline covering shutdown and the deferred reporting drain; also the deadline for results-target checks and the final results query |

The read-only matrix becomes:

```text
Repetition 1: JavaScript, 60 seconds -> Rust, 60 seconds
Repetition 2: JavaScript, 60 seconds -> Rust, 60 seconds

1 operation type x 2 implementations x 2 repetitions
    = 4 sequences
    = 240 seconds of configured sequence budgets
```

The launcher timer includes process startup. Therefore, a 60-second budget is
not necessarily 60 full seconds of completed reads. Qualification, reporting,
and shutdown add time.

A stop request prevents further reads once the current call finishes.
Outstanding reporting must also finish. Exceeding the shutdown deadline causes
forced termination and invalidates the sequence; it is not treated as a normal
completion.

On SIGINT or SIGTERM, the launcher stops starting new work, asks the current
child to stop, and allows at most `shutdownGraceSeconds` from interruption for
shutdown/reporting. It then forcibly terminates a stuck child if necessary.
The manifest records `aborted`, the signal, and UTC phase boundaries; CLI exit
codes are 130 for SIGINT and 143 for SIGTERM. Already acknowledged records remain
in the results container. They do not turn an aborted matrix into a valid run:
require a complete manifest and the final integrity-checked report.

**These values are proposals, not an approved execution budget.** Two repetitions
are an initial comparison, not a guarantee of statistical reliability.

## Bite 7 of 12: What does the latency timer include?

Follow one operation:

```text
Select order-204 and construct its Item reference
    -> start monotonic timer
    -> call and await item.read()
    -> stop timer when the call returns or rejects
    -> verify response and record outcome
```

A **monotonic timer** measures elapsed time without using changes to the
wall-clock date as part of the duration.

The timer includes SDK work inside the call: request preparation, any lazy
initialization, service interaction, retries, deserialization, and response
conversion. It excludes item selection, the workload's response assertions,
statistics updates, and reporting.

A fulfilled promise is not sufficient for success. Public `Item.read()` can
return a 404 response without rejecting. The workload requires status 200,
the expected body, and the qualified ETag.

### What about the first read?

The current implementation retains all measurements and applies **no warm-up
exclusion**. Its merged report is an all-samples report, not a steady-state
result. We now intend to separate warm-up from steady-state interpretation,
but have not identified or selected a cutoff.

Characterize both implementations in a separately approved calibration run
with finer interval data. Retain the first read and all raw intervals. Inspect
latency and completion-rate stability over multiple windows and repetitions;
do not equate the first completed read with the end of warm-up. Select and
record the exclusion rule before the independent comparison, rather than
choosing a favorable cutoff from its results. If stability is not established,
do not label any suffix steady-state. Interval histograms cannot split an
interval at an arbitrary cutoff; exclusion must respect captured boundaries.

The workload separately records:

| Field | Boundary |
|---|---|
| `first_operation.duration_ms` | Duration of the first attempted public read |
| `client_setup_ms` | SDK import and client construction |
| `first_completion_process_seconds` | Process elapsed time when the first attempted read finished |

Rust driver initialization is lazy in this prototype, so its work can appear
inside the first public read. The fields above are not interchangeable.

Qualification uses a separate process, but can still warm service or operating
system caches. Fresh measured processes do not mean a cold service.
Later intervals are not automatically proven steady-state measurements.

## Bite 8 of 12: What measurements do we save?

The workload checks the snapshot deadline after completed reads and retains
each interval in memory. It sends no measurement IPC and triggers no result
writes during the read loop. After reads stop, it captures the remaining
partial interval, then sends one snapshot at a time to the launcher and waits
for its persistence acknowledgement before sending the next. Completion is
sent only after every interval is acknowledged; the launcher waits for
completion persistence before starting another sequence.

Snapshot timing is approximate, not an independent exact 15-second clock.
A slow read can extend an interval; the last interval can be shorter. There
need not be exactly four records for a 60-second sequence.

The recorded interval durations, CPU samples, and end timestamps stop before
the reporting drain. Reporting time is not included in the operation histogram
or the sequence's measured interval denominator. Result records and reports
identify this protocol as `reporting_mode: "after_reads"`; do not silently pool
them with historical during-read reporting runs.

Three record types describe one measured process:

| Record type | Meaning |
|---|---|
| `measurement` | Counts, successful-call latency distribution, RU sum, observed throttling, and process samples for one interval |
| `error` | Bounded structured details of an operation/validation failure, including its interval ID |
| `completion` | Interval count, successful-call count, error count, and whether the sequence is usable |

For example, this is a **shortened illustrative measurement**, not a recorded
performance result:

```json
{
  "record_type": "measurement",
  "operation": "ReadItem",
  "config_backend": "rust",
  "interval_number": 1,
  "interval_duration_seconds": 15,
  "count": 100,
  "errors": 0,
  "mean_ms": 4.2
}
```

The next interval's count starts again at zero. Completion combines interval
counts, but its existence alone does not establish a valid result.

Each record identifies the run, workload sequence, process, and selected build.
Measurements and error records also identify their interval. Raw SDK exception
messages, stacks, credentials, and order bodies are not copied into error
records.

Each interval also records `measurement_started_at_utc`,
`interval_started_at_utc`, and `interval_ended_at_utc`. Interval timestamps use
one wall-clock origin plus monotonic offsets, so wall-clock corrections do not
change measured durations. Completion and launcher phase records have their
own UTC timestamps.

The manifest and result identity retain the effective configuration's
`configuration_sha256` and a selected `environment` snapshot: hostname,
OS/kernel/architecture, CPU inventory, memory, Node/SDK versions, and observed
container capacity. Environment variables and credentials are not copied.
The launcher checks the configuration before and after each child, and the
child hashes the exact bytes it parses before accessing the service. Editing
the effective configuration invalidates the run.

### What do attempt counters mean?

`attempt_evidence` groups counts by pipeline, transport, status, and substatus.
The two populations are deliberately distinct:

| Population | What is counted |
|---|---|
| `rust_retained_requests` | Retained native metadata and data requests, including successes and failures |
| `javascript_failed_attempts` | JavaScript retry-diagnostic failures only; pipeline/transport are recorded as `unknown` |

Both have `coverage: "partial"`. Empty JavaScript groups do not mean zero
requests, and these populations must not be compared as total wire-call counts.
Non-429 failures preceding a successful read, such as a retained 503 followed
by 200, remain visible. At most 128 distinct groups are retained; overflow fails
explicitly. Interval groups are reconciled with completion evidence on readback.

### How are percentiles combined?

A **latency histogram** counts how often duration values occur. This prototype
stores integer-microsecond frequencies rather than Python's encoded HDR format.
Durations are quantized to microseconds with a one-microsecond minimum.

To combine intervals, add their bucket counts and calculate percentiles from
the combined distribution. Do not average the individual interval P99 values.

Each interval permits at most 16,384 distinct durations. Exceeding that limit
fails the sequence rather than silently dropping observations or clipping
long calls. Deferred storage permits at most 256 snapshots and 262,144 total
histogram entries across the sequence, counting repeated durations again in
each interval. Attempt evidence remains bounded per interval.

The configured snapshot budget is
`ceil(durationSeconds / reportIntervalSeconds) + 1`, including room for a final
partial interval. Configurations exceeding
256 snapshots are rejected before execution. Runtime overflow fails the run
explicitly; it does not discard data or fall back to reporting during reads.
Only one transferred snapshot awaits acknowledgement at a time.

A hard process crash can lose buffered samples that have not yet been sent.
Missing completion, a failed acknowledgement, disconnect, or reporting timeout
invalidates the sequence. Acknowledged records remain available for diagnosis,
but do not make a failed or aborted run valid.

Deferred writes can create a reporting burst against the 400-RU/s results
container. Finer snapshots also require more records and drain time. Validate
results-side throttling and the bounded shutdown budget in the approved
calibration; do not increase that capacity or the run budget implicitly.

CPU and memory samples describe the measured process. They do not include the
reporter process or prove which SDK component caused a change. Retained
histograms contribute to measured RSS and allocation/GC costs.

## Bite 9 of 12: Could service capacity hide the difference?

Yes. The service backend can limit the request rate before the SDK reaches its
own limit.

A **request unit (RU)** describes service work charged for a request.
Provisioned **RU/s** is capacity per second, not a fixed number of reads.
For illustration only:

```text
500 successful reads/second x 1 RU/read = 500 RU/second
```

That demand would exceed a hypothetical 400 RU/s allocation, even with one
read in progress at a time. These are not measurements or the selected
capacity for the new containers.

The original approved preparation used 400 RU/s on each dedicated container,
matching the Python setup at that time. The workload was then increased to
1,000 RU/s for the recorded preflight. After separate approval, only the JS
workload container was increased to **10,000 RU/s**; results remain at
**400 RU/s**. Both manual offers were verified with no replacement pending at
**00:00:56 UTC on November 8, 2026**.

The Python workload was already at 10,000 RU/s when inspected for this change;
it was not modified. Python results and the earlier JS correctness fixture
remained at 400 RU/s. The historical preflight does not qualify the optimized
build or the new capacity, and higher throughput cannot guarantee zero 429s.

The configuration now requires:

```json
"capacityRuPerSecond": {
  "workload": 10000,
  "results": 400
}
```

Before qualification and after the matrix, the launcher reads both existing
container offers. It rejects missing/shared capacity, autoscale, RU-per-minute
mode, or a mismatch with the approved values. These are read-only checks, not
throughput updates, and add supporting metadata requests. Two snapshots cannot
prove that capacity remained unchanged between them.

Examine request charges, service-side 429 evidence, and available SDK
diagnostics in a separately approved bounded capacity check. Include
qualification and reporter demand in preparation. Successful-response RU sums
alone are not complete accounting of metadata calls and failed attempts.

The workload rejects observed 429 attempts, including retained Rust attempts
that precede an eventual 200. Native diagnostics remain partial, and results
writes can also retry internally. Absence of an observed 429 is not proof that
neither destination experienced throttling.

**Capacity checks require their own budget. No throughput change or
calibration run is performed by saving this guide.**

## Bite 10 of 12: What must pass before measurement?

The launcher first checks the results container and then starts a separate
qualification process. That process:

1. Checks the workload container's partition-key path.
2. Reads each of the 1,000 expected orders through JavaScript and Rust.
3. Checks application fields, status, charge, and matching ETags.
4. Requires actual Rust data-request Gateway V2 evidence and no observed 429.
5. Saves the qualified ETags in `verified-orders.json`.

This entails 2,000 public qualification reads, plus supporting requests and
possible retries. It is preparation outside the four measured sequence budgets,
not a free consequence of selecting a 60-second duration.

Qualification checks the selected orders, not a complete container inventory.
It runs once before the matrix. Each measured read then rechecks its body and
ETag; the launcher does not reseed or restore data between sequences.

For Rust, HTTP/2 support or successful initialization alone is insufficient.
The diagnostics must retain a successful `data_plane` / `gateway_v2` attempt.
Missing or compacted attempt evidence and Gateway V1 data-request fallback
invalidate the comparison.

The JavaScript baseline must have its expected JavaScript retry diagnostics
and no `experimentalRustRead` marker. Ordinary JavaScript diagnostic fields
alone are insufficient because Rust-backed responses contain them too.

During measurement, a failed read, unexpected response, changed order,
observed throttling, or failed reporting stops the matrix. Remaining sequences
are not started to make a partial comparison appear complete.

**A successful qualification establishes read readiness for these items. It
does not replace capacity approval or prove future reads will remain valid.**

## Bite 11 of 12: How do we launch an approved comparison?

Before using the launch command, check these gates:

| Gate | Required state |
|---|---|
| Source and artifacts | Intended VM checkout, built CommonJS SDK, release addon, matching build manifest |
| Workload destination | Dedicated database/container exist with `/customerId`; all 1,000 expected orders are prepared |
| Results destination | Separate database/container exist with `/partition_key` |
| Capacity | Workload and reporter capacity have been checked with an approved budget |
| Credentials | Authorized key supplied in process memory through `ACCOUNT_KEY`, not in configuration or artifacts |
| Configuration | Explicit destinations, durations, repetitions, shutdown budgets, and actual native-build manifest path |
| Measurement policy | One reused client, one read at a time, retain initial reads |
| VM activity | No competing experiment; unprofiled run without inherited `NODE_OPTIONS`, `RUST_LOG`, or `RUST_BACKTRACE` |
| Authorization | Preparation and the actual service execution budget approved |

The current launcher fixes the dedicated destination names and 1,000-item
profile. It rejects missing or unexpected configuration fields rather than
falling back to the Python targets or the old JS fixture.

Review a copy of `test/workloads/read-latency.example.json`. In particular,
replace its historical `nativeBuildManifest` path with the record for the
artifact being selected. Do not add a credential field.

After approval, run from `sdk/cosmosdb/cosmos` on the VM:

```bash
npm run run:read-workload -- /absolute/path/read-latency.json /absolute/path/new-run-directory --execute
```

Replace both placeholder paths with the reviewed configuration and a **new**
output directory. Its parent directory must exist. The launcher refuses an
existing run directory; it does not overwrite previous results.

`--execute` starts qualification reads, measured reads, and writes to the
results container. It does not provision databases, containers, or throughput,
and it does not seed orders.

**This command is a reference for an approved execution, not authorization
to start one now.**

## Bite 12 of 12: How do we interpret the results?

Keep the run directory and the Cosmos records together:

| Artifact | Purpose |
|---|---|
| `config.json` | Effective secret-free settings |
| `manifest.json` | Run ID, expected sequences, fingerprints, and overall state |
| `verified-orders.json` | Qualified target and ETags |
| `qualification.log` | Qualification-process output |
| Per-sequence `.log` files | Workload-process output |
| Per-sequence `.jsonl` files | Local mirrors of acknowledged result records |
| `latency-report.json` | Report after reading back and validating saved Cosmos records |

The integrity check requires one valid completion per expected process,
contiguous intervals, matching histogram/count totals, no recorded errors or
observed 429, and transport evidence covering successful Rust reads.
Missing completion, failed reporting, zero successful reads, or mismatched
provenance invalidates the report.

An interrupted run can leave partial records. Preserve them for diagnosis;
do not manually add a completion record or delete unrelated results to make
the run look successful. Configuration and output data contain no account key.

Only after integrity passes should we compare each repetition's operation
count, mean, P50, P99, first read, RU sum, and actual interval durations.
**P99** is the duration at or below which approximately 99% of the recorded
successful calls fall, at the histogram's resolution.

Keep these limits explicit:

- The report merges intervals within each sequence, not repetitions into a
  single result that hides variation.
- JavaScript always runs first; repetition does not remove order effects.
- Completions per second include workload overhead and are not an isolated
  SDK throughput ceiling.
- A short run does not establish reliable extreme-tail or steady-state claims.
- Implementations can differ in transport and initialization as well as
  language; the difference is not a measurement of NAPI-RS overhead alone.
- Do not subtract independent percentiles to attribute time to the client,
  network, or service backend.

**The first outcome is a bounded, reproducible public-read comparison.
It is not a general claim that one SDK implementation is faster.**

## Implementation reference

The executable source for this guide is
[`test/workloads`](../../sdk/cosmosdb/cosmos/test/workloads). The
[example configuration](../../sdk/cosmosdb/cosmos/test/workloads/read-latency.example.json)
is a proposal; the
[offline checks](../../sdk/cosmosdb/cosmos/test/workloads/workload.spec.mjs)
do not access Cosmos DB.

Native build mechanics and the earlier live-read milestones remain in the
[implementation guide](read_item.md#building-the-linux-binding-on-the-vm).
This document is the canonical walkthrough for preparing, running, and
interpreting the read-only latency comparison.
