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

**Checkpoint: November 8, 2026 (UTC).** The new two-record reporting check passed
with complete raw evidence and no observed service 429s. The earlier warm-up
calibration's reporting-throttling failure remains historical evidence; its
exploratory 11-second exclusion candidate is unchanged. The final performance
comparison has not started and still requires its own configuration and budget.

**Two-record reporting deployed:** revision
`80224e3b0232d129664f1546edd1cc9f83efad54` now saves detailed intervals
in a local artifact and creates only one aggregate measurement plus one
completion per sequence. The deployed `140f150a` calibration used one Cosmos
measurement per interval: 120 measurements plus one completion per sequence,
or 484 documents across four sequences. That historical run did not use the
two-document format. A separately approved reporting check uses 120 seconds
per implementation, one repetition, one-second snapshots, 2,000 qualification
reads and a 120-second shutdown/reporting allowance per sequence. No throughput
change or final performance comparison accompanies this verification.

| Part | Recorded state | Remaining work |
|---|---|---|
| VM | `js-sdk-rust-read-perf-vm`, East US, Ubuntu x64; accelerated networking verified | Select this VM explicitly |
| JS source | Clean VM checkout of `80224e3b0232d129664f1546edd1cc9f83efad54`; SDK and Linux release binding rebuilt for aggregate reporting | Preserve matching evidence |
| Rust dependency | Built with driver `5ba864be8f128a6faf3f736ae0043f60d5911235` and Rust 1.95.0 | Retain matching build evidence |
| Earlier native build | Preserved separately; not used for this preflight | Do not mix artifacts between checkouts |
| Workload qualification | New build: all 1,000 orders qualified; 93,137 measured reads passed, with Gateway V2 evidence for all 49,503 Rust reads | Repeat qualification for each new matrix |
| Dedicated data and results destinations | Provisioned; 1,000 orders seeded; manual dedicated throughput is now 10,000 RU/s for both workload and results | Preserve isolation; retain historical result records |
| Capacity preflight | New aggregate run at 10,000/10,000 RU/s: four result creates and no observed service 429s on either container; reporting gate passed | Keep capacity unchanged; do not treat this as a future no-throttling guarantee |
| Measurement protocol | Reporting follows reads; all raw samples retained. Conservative common exclusion candidate: 11 seconds | Treat this as exploratory, not proof of stationarity or a final performance result |
| Full performance execution | Not started | Approve the complete configuration and run budget |

**Changes deployed after that preflight:** the workload now rejects Rust-marked
JavaScript responses, persists bounded attempt evidence, records UTC/host/capacity
snapshots, verifies the effective configuration's SHA-256, and handles
SIGINT/SIGTERM with bounded cleanup and an aborted manifest. The Linux build and
offline checks passed. The calibration below exercised the new build against
the service. The earlier preflight remains separate historical evidence.

The deployed wrapper/binding optimizations also postdate this preflight. They
reuse adapter state, eliminate placeholder read diagnostics, skip formatting
for the no-op diagnostic writer, and prepare successful native response data
on Tokio before JavaScript completion. The shared diagnostic optimizations
change the JavaScript baseline too. Both SDK targets and the Linux release addon
were rebuilt, with new provenance retained. Both paths passed live
qualification from the same revision during calibration. The body copy remains inside the
public-read timer; no warm-up exclusion or timing boundary was added.

The earlier calibration used this clean checkout:

```text
/home/azureuser/js-sdk-rust-read-perf/checkouts/140f150a14e504fa52e13b075c9d18a3dff98f05
```

The release build completed at **00:42:06 UTC on November 8, 2026** using Node
22.23.3, pnpm 11.24.0, and Rust/Cargo 1.95.0. All 17 SDK build tasks succeeded;
13 binding checks and 34 workload checks passed. CommonJS/ESM imports, the native
async probe, workload configuration typing, scoped formatting/lint, and
binary/provenance checks also passed. The addon SHA-256 is unchanged from the
previous optimized build:

```text
734be3f570f43de8e5a17f8fecf6840db704ea695d2877584bda0dbe8a833f17
```

The previous `b02be558c113d856cc77c8ea7e32c48868465a76` checkout, addon, and
manifest were preserved and checked for changes. The older `1ea9953` preflight
checkout and evidence also remain separate.

**Deferred reporting is deployed:** reporting now buffers bounded interval
snapshots during reads and persists them only after the sequence stops. All
acknowledgements and completion persistence finish before the next sequence.
This revision changes only the workload and guide, not the SDK, binding, or
driver. Calibration has now identified an exploratory warm-up exclusion
candidate; the workload still captures all samples without automatic exclusion.
Capacity was rechecked after deployment at **00:43:03 UTC on November 8, 2026**:
manual 10,000 RU/s for workload and 400 RU/s for results, with no replacement
pending. Deployment did not modify either offer.

The earlier checkout at `/home/azureuser/js-sdk-rust-read-perf/azure-sdk-for-js`
was preserved, not overwritten. Its native build used the earlier JS source
plus a recorded build overlay. The older Windows live-read results do not
qualify the new Linux build or the new dataset.

### Warm-up calibration and reporting blocker

The approved calibration ran from **01:05:36 to 01:16:38 UTC on November 8,
2026** (19:05:36 to 19:16:38 on November 7 at UTC-06:00).
Run ID: `e06954dd-7b38-49cb-8636-06d78dc1385f`.
It used 120 seconds per implementation, two repetitions, one-second in-memory
snapshots, and a 120-second shutdown/reporting allowance. It was not the final
comparison.

| Sequence | Successful measured reads | First read (ms) | Post-read reporting (seconds) |
|---|---:|---:|---:|
| JavaScript, repetition 1 | 39,167 | 228.674 | 39.402 |
| Rust, repetition 1 | 44,428 | 253.222 | 41.437 |
| JavaScript, repetition 2 | 41,694 | 226.817 | 39.295 |
| Rust, repetition 2 | 45,508 | 339.102 | 41.453 |

All four sequences completed without measured-read errors or SDK-observed
read 429s. All 484 result records were persisted and the raw mirrors reconciled
with the saved integrity report. Credential cleanup was confirmed.

The analysis policy was saved before execution: aggregate contiguous
approximately ten-second windows, compare P50/mean/completion rate against the
last three windows using a 10% tolerance, and require at least 60 seconds of
continuous stable suffix. Retain all late disturbances and all raw data.
Exclude at least the first window conservatively for both implementations.
Both JavaScript first windows failed this screen; subsequent windows passed.
Rust windows passed, but its first calls still had initialization cost.

The common conservative cutoff rounded up to **11 seconds**, leaving about
109 seconds in each sequence. This is not a claim that initialization takes
exactly 11 seconds, and the screen does not establish steady-state tail latency.
Future interpretation must use whole captured intervals starting after the
cutoff and must not silently relabel the existing all-samples report.

Service `TotalRequests` **Count** for **01:00-01:22 UTC** covered 172,806 workload
status-200 requests (at least the expected 172,797 including qualification),
three status-304 requests, and no observed workload 429. Results showed 484
status-201 requests, five status-200 requests, and **750 status-429 requests**.
The read data passed, but the overall no-throttling gate failed. Reporting took
approximately 39-41 seconds after each read sequence, outside its measured
interval denominator.

**Do not start the final comparison yet.** The results-capacity increase below
was separately approved after this finding. The bounded aggregate-format
check below subsequently passed at the new capacity; the calibration's failed
no-throttling verdict remains historical evidence and is not changed to a pass.

VM evidence, including all raw intervals, analysis policy, and detailed
`warmup-analysis.json`, `warmup-intervals.csv`, and `warmup-windows.csv`:

```text
/home/azureuser/js-sdk-rust-read-perf/calibration/warmup-20261108T010115Z-t6IoFizC
```

The session's `files/js-perf-vm/warmup-140f150` directory holds the execution
summary, service Count responses, analysis summary, and final
`calibration-verdict.json`. The final verdict incorporates the reporting
throttling gate; a stability candidate alone is not a readiness verdict.

### Results capacity increase after calibration

Only the dedicated JS results container was raised from 400 to **10,000 RU/s**.
At **06:41:05 UTC on November 8, 2026**, both JS containers were verified at
manual 10,000 RU/s with no replacement pending. Python workload remained at
10,000 RU/s; Python results and the earlier JS correctness fixture remained
at 400 RU/s. No new read or reporting workload was executed.

A separate configuration was prepared at **06:41:41 UTC**:

```text
/home/azureuser/js-sdk-rust-read-perf/build-evidence/140f150a14e504fa52e13b075c9d18a3dff98f05-release/read-latency.results-10000.proposed.json
```

Its expected capacity is 10,000/10,000 RU/s and its SHA-256 is
`e8482f7001be2e76a6d88197b029beee4bc71a1414d5b6b692d3d23e488aa7f2`.
It retains the existing proposed 60-second/two-repetition budget with
15-second snapshots and does not apply the warm-up candidate automatically.
It is a proposal, not authorization or evidence of execution. The original
10,000/400 configuration and the actual calibration configuration were
preserved and their hashes rechecked. The SDK and native artifact are unchanged.

Higher capacity is not proof that reporting will avoid 429s. Verify the
results-side service metrics and drain deadline before the final comparison.

### Two-record deployment and live verification

The clean pushed revision `80224e3b0232d129664f1546edd1cc9f83efad54` was
deployed to a separate checkout. Its release build completed at **07:31:54 UTC
on November 8, 2026**. All 17 SDK build tasks, 13 binding tests and 44 workload
tests passed, as did scoped typing, formatting, lint and runtime provenance
checks. The driver pin and addon SHA-256 remained unchanged. The preceding
`140f150a` checkout, build manifest and addon were preserved and checked.

```text
/home/azureuser/js-sdk-rust-read-perf/checkouts/80224e3b0232d129664f1546edd1cc9f83efad54
```

Both dedicated JS containers were checked at manual 10,000 RU/s before
preparing the bounded reporting verification. Its config and predeclared
verification policy are isolated from the earlier calibration:

```text
/home/azureuser/js-sdk-rust-read-perf/calibration/reporting-20261108T073758Z-fPZndhSX
```

The approved run, `f9550f2d-05bc-45c3-a0a2-a3dc584b78fd`, executed from
**07:46:56 to 07:51:17 UTC on November 8, 2026**. It exited successfully, with
a complete manifest, 1,000 orders qualified through both backends, and exactly
four acknowledged Cosmos result records reconciled against the saved cloud
readback report and raw artifacts.

| Sequence | Successful measured reads | Raw intervals | Cosmos documents | Reporting seconds | Measurement write RU | Completion write RU |
|---|---:|---:|---:|---:|---:|---:|
| JavaScript | 43,634 | 120 | 2 | 1.170 | 759.10 | 36.19 |
| Rust | 49,503 | 120 | 2 | 1.036 | 1,012.76 | 38.29 |

Both sequences had zero measured errors and SDK-observed 429s. Every Rust read
retained Gateway V2 evidence. The two raw artifacts contain all 240 intervals;
their sizes are 741,108 and 789,919 bytes, with SHA-256 verified before upload
and on readback. Successful-create receipts total **1,846.34 RU** across the
four writes. Aggregate documents were 20,990 and 26,934 serialized UTF-8 bytes;
completion documents were 3,117 and 3,202 bytes. Two documents are not necessarily
cheap writes, so this evidence does not authorize reducing throughput.

Service `TotalRequests` **Count**, captured at **07:53:45 UTC** using the
surrounding **07:41-07:57 UTC query range**, covered 95,144 workload status-200
requests (at least the required 95,137 including qualification), two status-304
requests, four results status-201 requests and five results status-200 requests.
No service 429 was observed for either destination. The range's later endpoint
is a query bound, not a claim about observations after capture.

The raw-artifact, completion, request-coverage and no-observed-throttling gates
passed for this bounded run. Both capacities remained at 10,000 RU/s;
credentials were cleaned up. `execution-summary.json`, `verification-verdict.json`,
`service-verification.json`, raw metric responses and the `run` directory retain
the evidence together.

This check retains all samples and applies no warm-up exclusion. It verifies
the new persistence format, not a latency-performance conclusion, a revised
warm-up cutoff, or permission to start the final comparison. Reporting fell
from approximately 39-41 seconds in the earlier interval-upload calibration to
approximately 1.0-1.2 seconds here, but both the reporting format and results
capacity changed between those runs; this is not an isolated causal measurement.

### Earlier recorded preflight

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
REPO="$HOME/js-sdk-rust-read-perf/checkouts/140f150a14e504fa52e13b075c9d18a3dff98f05"
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
/home/azureuser/js-sdk-rust-read-perf/build-evidence/140f150a14e504fa52e13b075c9d18a3dff98f05-release/build-manifest.json
```

The committed example configuration still points at an earlier build's
manifest and expects 1,000/400 RU/s. In the build-evidence directory, use the
new `read-latency.results-10000.proposed.json` for the current 10,000/10,000
capacity. The old `read-latency.proposed.json` remains preserved at
10,000/400 and no longer matches the live offers. Both have exact-byte hashes.
The new proposal retains the 60-second/two-repetition budget with 15-second
snapshots; it has not been run and does not itself implement warm-up exclusion.
Do not treat an older path as valid merely because the file exists.

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
| `repetitions` | 2 | Number of pairs, each containing one JavaScript and one Rust sequence |
| `executionOrder` | omitted (`javascript_first`) | Optional `javascript_first` or `alternating`; alternating reverses backend order on even repetitions |
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

### Approved next comparison: four alternating pairs

The user approved four pairs at 120 seconds per backend, profiling disabled,
one-second snapshots and the existing 11-second whole-interval warm-up exclusion.
This is eight sequences (16 minutes of configured sequence budgets), plus 2,000
qualification reads over 1,000 orders and up to 120 seconds shutdown/reporting
per sequence. Capacity remains unchanged. The harness update must be pushed
and deployed with matching provenance before execution; this matrix has not
run yet.

Set these fields in the copied, budget-approved configuration:

```json
{
  "executionOrder": "alternating",
  "profilingMode": "none",
  "repetitions": 4,
  "durationSeconds": 120,
  "reportIntervalSeconds": 1,
  "shutdownGraceSeconds": 120
}
```

The sequence order is JavaScript/Rust, Rust/JavaScript, JavaScript/Rust,
Rust/JavaScript. Each sequence still gets a fresh process and client, retains
its backend/repetition identity and finishes reporting before the next starts.
The hashed effective configuration records the selected order, and the
manifest's `expected` array records the actual planned sequence order. Existing
configurations retain JavaScript-first ordering.

Primary comparison output is successful post-warm-up read count per backend
and repetition, with actual retained duration and reads/second. Also calculate
P95, P99 and P99.9 from the retained histograms, plus measured-read RU total,
RU/read and RU/second from the same retained intervals' `ru_sum`. These RUs
come from successful read responses, not an account-wide total including all
metadata, failed attempts or reporting operations. Result-container throughput
and reporting costs are not comparative metrics.

Show all four repetitions and their order positions; report their variability.
For pooled summaries, merge retained histograms rather than averaging
percentiles, and divide total reads or RUs by total retained duration rather
than averaging rates. Keep pooled results separate from per-repetition
results so they cannot hide instability. These are single-in-flight workload
completion rates, not maximum SDK throughput.

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
result. The calibration above identified an exploratory **11-second** common
exclusion candidate; it is not applied automatically and does not override the
failed reporting-capacity gate.

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
for its local-file persistence acknowledgement before sending the next. Each
append is flushed to disk before acknowledgement. Completion is sent only
after every interval is acknowledged; the launcher then verifies the artifact
and persists one aggregate measurement followed by one completion in Cosmos.
Both writes finish before another sequence starts.

Snapshot timing is approximate, not an independent exact 15-second clock.
A slow read can extend an interval; the last interval can be shorter. There
need not be exactly four raw intervals for a 60-second sequence. A successfully
reported sequence always has two Cosmos records, independent of interval count.

The recorded interval durations, CPU samples, and end timestamps stop before
the reporting drain. Reporting time is not included in the operation histogram
or the sequence's measured interval denominator. Result records and reports
identify this protocol as `reporting_mode: "after_reads"`; do not silently pool
them with historical during-read reporting runs.

The deployed revision identifies its storage format as
`reporting_format: "aggregate_v1"`. It keeps these separate outputs:

| Output | Meaning |
|---|---|
| `<workload_id>.intervals.jsonl` | All detailed intervals, including histogram counts, timing, CPU/RSS, setup fields and bounded error details |
| Cosmos `measurement` | One aggregate across all intervals: exact merged histogram, recomputed latency statistics, RU sum, errors, observed throttling and attempt evidence |
| Cosmos `completion` | Raw interval count, `summary_count: 1`, operation/error totals and sequence validity |
| `<workload_id>.jsonl` | Local mirror of the two acknowledged Cosmos records |

For example, this is a **shortened illustrative raw interval**, not a recorded
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

The next interval's count starts again at zero. The aggregate combines interval
counts, but completion's existence alone does not establish a valid result.
Both Cosmos records carry the raw artifact's filename, SHA-256, byte length
and interval count. Readback requires that artifact, validates its hash and
interval continuity, and recomputes the aggregate for reconciliation. Missing
or altered artifacts fail validation; there is no cloud-only fallback.
Historical interval-format results remain readable under their original
identities and must not be relabeled as aggregates.

Each record identifies the run, workload sequence, process, and selected build.
Raw intervals and structured error details identify their interval. Failures
stay in the raw artifact and aggregate; no extra Cosmos error document is
created. An operation failure or abort makes completion invalid, and reporting
failure may leave fewer than two records. Raw SDK exception messages, stacks,
credentials, and order bodies are not copied into error details.

The launcher manifest's phase `reporting_writes` receipts retain each successful
create response's `request_charge` and serialized `utf8_bytes`. Completion also
stores `measurement_write_ru`; its own charge is known only after creation and
is retained locally, without a third write. These charges are successful-response
evidence, not a complete account of retries, metadata requests or service 429s.

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

### Opt-in stage profiling (deployed; first diagnostic run completed)

For a separately authorized diagnostic run, add `"profilingMode": "stages_v1"`
to a copied workload configuration. Omit it or use `"none"` for an unprofiled
run. The launcher propagates the mode explicitly, overrides inherited profiling
settings, keeps qualification and reporting clients unprofiled, and records
`profiling_mode` in identities and reports. The SDK's internal switch is
`AZURE_COSMOS_EXPERIMENTAL_READ_PROFILING`; the workload controls it from the
hashed configuration.

Each raw interval gains `read_profiles`, correlated by a contiguous per-sequence
operation number. Both backends record public-call latency, operation start
offset, outcome, validation time and statistics-update time. Rust additionally
records adapter-relative milestones for entering/leaving the native call,
UTF-8 decoding, JSON parsing, response construction and adapter completion.
The post-native-to-decoded span includes diagnostics/body checks as well as
UTF-8 decoding; the parsed-to-ready span includes body/charge checks and header
construction. Harness `validation_ms` measures the normal `inspectRead` checks,
not the additional profiling-record validation.
Native timing uses its own monotonic clock:

| Native field | Inclusive boundary |
|---|---|
| `dispatchMs` | Native method entry to first future poll; includes binding lock/setup and dispatch |
| `resolveContainerMs` | First future poll to completed container resolution; includes argument checks |
| `driverOperationMs` | Container resolution to driver-operation completion; includes item/options construction and the driver await |
| `responsePreparationMs` | Driver completion to owned response preparation, including body/header/diagnostics copies |
| `completionMs` | Prepared response to entry into the JavaScript-thread completion mapper |
| `elapsedMs` | Native entry to completion mapper; reconciles with the five stages above |

These are elapsed spans, not CPU samples or isolated network times. N-API value
creation occurs after the completion mapper: the difference between the JS
native-await span and `native.elapsedMs` includes this conversion, promise
delivery and other boundary overhead; it is not a pure scheduler-delay metric.
The adapter's pre-native span includes lazy initialization on the first read.
Successful profiles require all stages. Failed reads retain available wrapper
timings without inventing missing native stages.

Profiles are bounded to 100,000 reads per sequence and remain subject to the
64 MiB raw-artifact cap. Overflow fails explicitly. No per-read logging or IPC
runs during reads; traces travel with the existing post-read intervals and are
not copied into Cosmos aggregates. Raw validation reconciles profile ordinals,
outcomes and quantized durations against each interval histogram. There are
still only two Cosmos documents per successfully reported sequence.

Profiling adds timing and allocation work, so its latency must not be pooled
with unprofiled benchmark results. Neither clock sampling nor per-read trace
allocation is enabled in the normal path. No Rust driver changes are involved.
Retain warm-up samples and apply the same predeclared exclusion to both paths
during analysis. For tail diagnosis, select slow **public reads** and examine
their own correlated stages; do not subtract unrelated stage P99s.
Cross-clock containment checks allow 0.01 ms for clock precision; no negative
residuals are silently clamped or reclassified as measured CPU time.

The profiling build was deployed on November 8, 2026 at 22:19 UTC from
`d331333078ff5f97f790503194eeb706196fe526` into its own clean VM checkout.
The Linux release addon SHA-256 is
`0e1955822e05050a68842a99ea358e6c704d83d620f78d55124a44497edd43c8`;
the Rust driver remains pinned to
`5ba864be8f128a6faf3f736ae0043f60d5911235`.
Build and runtime provenance are saved under
`/home/azureuser/js-sdk-rust-read-perf/build-evidence/d331333078ff5f97f790503194eeb706196fe526-release`.
The previous checkout, native addon and build manifest were preserved and
their hashes rechecked.

Offline SDK, native binding, wrapper, workload, type, format and lint checks
passed. Standalone Rust tests on Linux required the test-only
`--features napi/dyn-symbols` option because the executable has no Node host
to resolve Node-API symbols. The production addon was rebuilt without that
override and its hash matched the original release build. The missing
`rustfmt` component was installed for the existing Rust 1.95.0 toolchain.

No live profiling workload or capacity change was performed in the deployment
step itself. The saved `read-latency.proposed.json` enables `stages_v1`, but a
configuration file is not run authorization. The first separately authorized
diagnostic run is recorded below; additional runs still require explicit budgets.

#### First correlated diagnostic run: November 8, 2026

Run `300fb5b0-dd08-4ecf-9bc9-586532388dd9` executed from
22:38:16.172 UTC to 22:42:38.187 UTC on the profiling build above. The approved
budget was JavaScript 120 seconds followed by Rust 120 seconds, one repetition,
one-second snapshots, 2,000 qualification reads over 1,000 orders, and up to
120 seconds shutdown/reporting per sequence. Both dedicated containers remained
at 10,000 RU/s. Fresh control-plane checks confirmed East US VM/account placement
and accelerated networking enabled.

All 39,553 JavaScript and 48,940 Rust measured reads succeeded. Every Rust read
had Gateway V2 evidence. The run produced four Cosmos records and retained 240
raw intervals, including all per-read profiles. Reporting took 1.478 seconds
for JavaScript and 2.083 seconds for Rust; successful reporting writes totaled
2,173 RU. Raw hashes, profile ordinals, histograms, receipts and readback
reconciled. Service `TotalRequests` Count covered the required workload and
result requests with no observed 429. No workload remained active and ephemeral
credential cleanup was confirmed.

The analysis policy was saved before execution: retain raw warm-up samples,
but interpret only whole intervals starting at or after 11 seconds for both
backends. Each path discarded 11 intervals and retained 109:

| Post-warm-up diagnostic metric | JavaScript | Rust |
|---|---:|---:|
| Retained reads | 36,291 | 44,820 |
| P50 | 2.849 ms | 2.396 ms |
| P99 | 6.487 ms | 3.643 ms |
| P99.9 | 11.259 ms | 6.796 ms |
| Mean | 2.988807 ms | 2.417470 ms |

These are **profiled diagnostic results**, not a replacement for the earlier
unprofiled comparison (JavaScript P99 3.594 ms, Rust 4.587 ms). The ordering
reversed in this pass; no performance fix was made, and instrumentation,
different execution times and fixed backend order prevent treating that
reversal as proof of a stable improvement.

For the same 449 slowest retained Rust reads, the average public latency was
5.110402 ms: 5.014064 ms was inside the inclusive driver-operation span and
0.096337 ms across all other measured public-call stages combined. Driver
operation was the largest span in 448 of those 449 reads; native completion
was largest in one. In that cohort, average dispatch was 0.020351 ms, container
resolution 0.005269 ms, native completion 0.034813 ms, mixed NAPI delivery
residual 0.022401 ms, and JSON parsing 0.003447 ms. These are averages of
correlated operations, not differences between independent percentiles.

The slowest retained Rust read took 25.303479 ms, with 25.165301 ms in the
driver-operation span. No negative boundary residuals occurred. Post-read
validation P99 was 0.021284 ms for JavaScript and 0.020448 ms for Rust; these
spans are outside public-call latency and do not rule out indirect GC effects.

This pass does not support wrapper conversion or NAPI delivery as the dominant
Rust tail cost. It narrows the observed time to the driver-operation boundary,
which still includes client/runtime, transport and service waits; it does not
identify their individual contributions or explain the earlier run conclusively.
The next comparison should be separately approved, repeated and counterbalanced,
with unprofiled confirmation before changing the binding based on these timings.

Evidence is preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/profiling-20261108T223206Z-3SXKWMzf`:
`analysis-policy.json`, `execution-summary.json`, `correlated-analysis.json`,
`verification-verdict.json`, service metric responses and the `run` directory.
Raw interval SHA-256 values are
`664f1f2022c0f268f2b36252b5e285f9a6f30bfe04b74fa4267ba08d70744a55`
(JavaScript, 8,274,908 bytes) and
`2a3074fe7a8f5461d98ea751ee1292fbd94823a6a706f1cc5f2defc3df2b1ee8`
(Rust, 30,212,785 bytes). The Rust driver was not changed.

#### Same-build unprofiled control: November 9, 2026 UTC

The user separately approved disabling profiling and repeating the same bounded
pair. Run `60159aad-72a6-4ed1-8d4f-def50267f9d5` executed from
01:18:37.877 UTC to 01:22:58.371 UTC on November 9 (November 8 in US Central
time). It used the same `d331333` checkout and Linux release addon, without a
rebuild. Configuration comparison confirmed that only `profilingMode` changed,
from `stages_v1` to `none`. Both result identities and all raw intervals declared
`none`; no raw interval contained `read_profiles`.

The initial credential handoff expired before execution. Recovery verified no
launcher log, run manifest, execution summary or active workload for that
preparation, removed its expired credential directory, and confirmed the cleanup
timer had already unloaded. A fresh preparation and execution then completed
together. Only one measured pair ran; the expired preparation was not a test run.

The budget remained JavaScript 120 seconds followed by Rust 120 seconds, one
repetition, one-second snapshots, 2,000 qualification reads over 1,000 orders,
and up to 120 seconds shutdown/reporting per sequence. Both dedicated containers
remained at 10,000 RU/s. All 38,747 JavaScript and 49,877 Rust measured reads
succeeded, with Gateway V2 evidence for every Rust read. Four Cosmos records
preserved 240 raw intervals. Successful reporting writes totaled 2,584.76 RU;
reporting took 1.093 seconds for JavaScript and 0.997 seconds for Rust.
Artifact integrity and service request coverage passed with no observed service
429. No workload remained active and ephemeral credentials were removed.

Independent reanalysis of all three runs used the same whole-interval
start-at-or-after-11-seconds filter. Every backend retained 109 intervals and
excluded 11; raw warm-up samples remain intact:

| Warm-up-excluded P99 | JavaScript | Rust |
|---|---:|---:|
| Original unprofiled run (`80224e3`) | 3.594 ms | 4.587 ms |
| Profiled diagnostic run (`d331333`) | 6.487 ms | 3.643 ms |
| Same-build unprofiled control (`d331333`) | 7.718 ms | 4.452 ms |

The new control retained 35,562 JavaScript reads and 45,487 Rust reads. JavaScript
P50/mean were 2.937/3.052047 ms; Rust P50/mean were 2.294/2.384387 ms.
Rust's median and mean decreased relative to the profiled run, while its P99
increased. Its P99 was close to the original unprofiled result, whereas
JavaScript's tail remained substantially higher with profiling disabled.
Thus profiler overhead alone is not a sufficient explanation for the ranking
reversal. These sequential runs still cannot identify a causal environmental,
runtime or code effect, or quantify profiling overhead in isolation.

The high JavaScript tail was not confined to one interval: ten-second buckets
grouped by interval start had JavaScript P99s from 7.267 to 8.555 ms, versus
3.947 to 5.268 ms for Rust. Further live work requires a separately approved
repeated/counterbalanced design; there is still no established root cause or
justification for a speculative binding change.

Evidence is preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/unprofiled-20261109T011759Z-Xtcbjf8z`,
including `unprofiled-comparison.json`, the predeclared analysis policy,
execution summary, combined verification verdict, raw service metrics and
the `run` directory. Raw interval SHA-256 values are
`a3ed66987795f6267a17cec3a2e37eb027ab903312e0b3f71c29cc52bc66821f`
(JavaScript, 739,773 bytes) and
`b29e0cd24536d66780d7047d4414bf240ca3ff4f5765968d994cff43592f5f92`
(Rust, 792,303 bytes). The Rust driver and container capacities were unchanged.

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
The raw interval artifact is capped at 64 MiB. Both Cosmos documents are checked
against a 2,000,000-byte UTF-8 serialization cap before the first create;
overflow fails explicitly without dropping histogram tails or falling back to
per-interval cloud writes.

The configured snapshot budget is
`ceil(durationSeconds / reportIntervalSeconds) + 1`, including room for a final
partial interval. Configurations exceeding
256 snapshots are rejected before execution. Runtime overflow fails the run
explicitly; it does not discard data or fall back to reporting during reads.
Only one transferred snapshot awaits acknowledgement at a time.

A hard process crash can lose buffered samples that have not yet been sent.
Missing completion, a failed acknowledgement, disconnect, or reporting timeout
invalidates the sequence. Acknowledged raw intervals remain available for diagnosis,
but do not make a failed or aborted run valid.

The deployed per-interval deferred writes created a reporting burst against
the results container when it had 400 RU/s. In the new aggregate format, finer
snapshots increase artifact and IPC work, not the number of Cosmos documents.
Results capacity is now 10,000 RU/s and the two-record revision is deployed.
Its separately budgeted service verification is recorded above.
Check results-side throttling and the bounded shutdown budget in a separately
approved run; do not increase capacity or the run budget implicitly.

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
workload container was increased to **10,000 RU/s**; results stayed at
**400 RU/s**. Both manual offers were verified with no replacement pending at
**00:00:56 UTC on November 8, 2026**.

The Python workload was already at 10,000 RU/s when inspected for this change;
it was not modified. Python results and the earlier JS correctness fixture
remained at 400 RU/s. The historical preflight does not qualify the optimized
build or the new capacity, and higher throughput cannot guarantee zero 429s.

After the warm-up calibration exposed results-side throttling, a separately
approved change increased only the JS results container to 10,000 RU/s.
Both JS offers were verified at 10,000 RU/s with no replacement pending at
06:41:05 UTC. The current proposed configuration therefore requires:

```json
"capacityRuPerSecond": {
  "workload": 10000,
  "results": 10000
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
| `manifest.json` | Run ID, expected sequences, fingerprints, state and per-phase reporting RU/size receipts |
| `verified-orders.json` | Qualified target and ETags |
| `qualification.log` | Qualification-process output |
| Per-sequence `.log` files | Workload-process output |
| `<workload_id>.jsonl` | Local mirrors of the two acknowledged Cosmos result records |
| `<workload_id>.intervals.jsonl` | Detailed raw intervals required for aggregate validation and explicit warm-up analysis |
| `latency-report.json` | Report after reconciling saved Cosmos records with their local interval artifacts |

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
- JavaScript runs first by default. Opt-in alternating order balances first
  position for an even number of pairs, but cannot eliminate every time-varying
  condition.
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
