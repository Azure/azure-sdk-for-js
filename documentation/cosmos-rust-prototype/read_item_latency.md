# Compare JS SDK item-read latency

[Implementation guide](read_item.md) | [Language foundations](foundations.md)

[November 10 read and load-test results](read_item_allocator_results.md)

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

### Four-pair alternating comparison

The user approved four pairs at 120 seconds per backend, profiling disabled,
one-second snapshots and the existing 11-second whole-interval warm-up exclusion.
This is eight sequences (16 minutes of configured sequence budgets), plus 2,000
qualification reads over 1,000 orders and up to 120 seconds shutdown/reporting
per sequence. Capacity remained unchanged. This matrix completed on
November 9, 2026 UTC using deployed revision
`129ffbb7cea574e104307bf8ae92c3c84894a226`; detailed results are recorded below.
This completed authorization does not authorize additional repetitions.

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
P50 (median), P95, P99 and P99.9 from the retained histograms, plus measured-read RU total,
RU/read and RU/second from the same retained intervals' `ru_sum`. These RUs
come from successful read responses, not an account-wide total including all
metadata, failed attempts or reporting operations. Result-container throughput
and reporting costs are not comparative metrics.

Show all four repetitions and their order positions; report their variability.
Keep pooled calculations in saved analysis rather than the primary comparison
table. For those summaries, merge retained histograms rather than averaging
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

#### Four alternating pairs: November 9, 2026 UTC

Run `e0f56c49-9320-4b7f-ac37-562f966a0127` executed from
02:26:03.226 UTC to 02:42:29.923 UTC on November 9 (20:26 to 20:42 on November 8
in US Central time). The actual phase order matched the predeclared sequence:
JavaScript/Rust, Rust/JavaScript, JavaScript/Rust, Rust/JavaScript.
Each sequence had a 120-second budget, fresh process/client, one in-flight
public read and profiling disabled.

The deployed harness revision was
`129ffbb7cea574e104307bf8ae92c3c84894a226`. Source comparison confirmed no SDK,
native-binding or dependency changes from `d331333`. Runtime provenance
confirmed that the compiled SDK tree and reused Linux release native addon
were byte-identical to the preceding comparison. The addon SHA-256 remained
`0e1955822e05050a68842a99ea358e6c704d83d620f78d55124a44497edd43c8`;
the build manifest records native artifact reuse from `d331333`.

All 365,493 measured reads succeeded: 165,409 JavaScript and 200,084 Rust,
including warm-up. Every Rust read had Gateway V2 evidence. The run retained
960 raw intervals and produced 16 result records. All intervals were marked
`profiling_mode: "none"` and lacked per-read profiles. Raw artifact hashes,
histograms, counts, completion records and actual phase order reconciled.
Service request Count covered the required workload requests and result creates
with no observed 429. Capacity was unchanged; no workload remained active and
ephemeral credentials were removed.

The following comparisons exclude whole intervals starting before 11 seconds.
Each sequence retained 109 intervals and discarded 11, without altering raw
samples. Percentiles use nearest-rank histogram calculation, independently
checked against sorted expanded samples.

| Pair | Order position | Backend | Retained reads | Reads/s | P95 ms | P99 ms | P99.9 ms |
|---|---|---|---:|---:|---:|---:|---:|
| 1 | First | JavaScript | 37,744 | 346.41 | 3.622 | 6.575 | 11.231 |
| 1 | Second | Rust | 46,913 | 430.34 | 2.659 | 3.128 | 5.605 |
| 2 | First | Rust | 42,968 | 394.19 | 3.087 | 5.728 | 9.411 |
| 2 | Second | JavaScript | 38,443 | 352.66 | 3.377 | 4.389 | 8.719 |
| 3 | First | JavaScript | 39,543 | 362.73 | 3.249 | 3.738 | 7.525 |
| 3 | Second | Rust | 48,088 | 441.12 | 2.674 | 3.534 | 7.740 |
| 4 | First | Rust | 44,804 | 411.01 | 2.751 | 3.706 | 7.244 |
| 4 | Second | JavaScript | 36,422 | 334.13 | 3.828 | 6.893 | 10.912 |

Pooled results merge the retained histograms and divide summed reads/RUs by
summed actual retained durations; they are not averages of percentiles or rates:

| Metric | JavaScript | Rust |
|---|---:|---:|
| Successful retained reads | 152,152 | 182,773 |
| Actual retained seconds | 435.985254 | 436.040175 |
| Reads/s | 348.98 | 419.17 |
| P50 | 2.787 ms | 2.335 ms |
| P95 | 3.467 ms | 2.775 ms |
| P99 | 5.564 ms | 4.030 ms |
| P99.9 | 10.074 ms | 7.842 ms |
| Measured-read RU total | 152,152 | 182,773 |
| RU/read | 1.00 | 1.00 |
| RU/s | 348.98 | 419.17 |

Rust's normalized read-rate gains were 24.23%, 11.78%, 21.61% and 23.01% for
pairs 1 through 4, respectively; the pooled gain was 20.11%. It completed more
reads and had lower P95 in every pair. Higher total Rust read RUs reflect more
completed reads, not a higher per-read charge. Read RUs cover successful response
charges in the retained intervals, not all account activity or reporting costs.

Tail improvement was not uniform. Rust P99 was 30.51% higher in pair 2
(5.728 versus 4.389 ms); P99.9 was higher in pairs 2 and 3. Across repetitions,
JavaScript P99 ranged from 3.738 to 6.893 ms and Rust P99 from 3.128 to
5.728 ms. Thus the original observation that Rust can have higher P99 despite
better completion rate is reproduced within this alternating batch.

Grouping the two first-position versus two second-position sequences gave
Rust P99 4.812 versus 3.262 ms and JavaScript P99 5.192 versus 5.849 ms.
This describes the observed order/time association, not proof of an order
effect or its cause. Four pairs support a throughput advantage in this bounded
single-in-flight workload, not universal tail superiority or maximum SDK
capacity. The source of tail variation remains unresolved.

Evidence is preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/alternating-20261109T022512Z-WqIUNIIJ`,
including `alternating-analysis.json`, `analysis-policy.json`,
`execution-summary.json`, `verification-verdict.json`, raw service metrics
and all raw intervals under `run`. The full analysis records each artifact's
SHA-256, actual retained duration, all-sample totals, per-pair gains and
order-position summaries. Local evidence is under the session's
`files/js-perf-vm/alternating-129ffbb` directory.

#### Five-pair follow-up: November 9, 2026 UTC

The user separately approved five pairs with the preceding settings unchanged.
Run `67dd20e3-dc78-49f8-bf11-2a20f833fc17` executed from 03:10:44.555 UTC to
03:31:13.305 UTC on November 9 (21:10 to 21:31 on November 8 in US Central
time). Configuration comparison confirmed that only `repetitions` changed,
from four to five. The existing `129ffbb` checkout and byte-identical SDK/native
artifacts were reused; no rebuild or source change was needed.

The budget was ten 120-second sequences, profiling disabled, one-second
snapshots, 2,000 qualification reads over 1,000 orders and up to 120 seconds
shutdown/reporting per sequence. The actual order was JavaScript/Rust,
Rust/JavaScript, JavaScript/Rust, Rust/JavaScript, JavaScript/Rust. Five pairs
give JavaScript three first positions and Rust two; this imbalance must remain
explicit. The analysis policy was saved before execution and did not assume
that Rust would have lower P99.9.

All 448,928 measured reads succeeded. Every Rust read had Gateway V2 evidence;
all 1,200 raw intervals were unprofiled and retained. The 20 result records,
raw hashes, counts, histograms and phase order reconciled. Service request Count
covered the required reads and result creates, with no observed service 429.
Capacity was unchanged. No workload remained active, and ephemeral credentials
were removed.

Each sequence retained 109 whole intervals starting at or after 11 seconds.
Raw warm-up samples remain intact. Median and tail percentiles were independently
checked against sorted expanded histogram samples. Per-pair results, without
pooled rows:

| Pair | Backend | Retained reads | Reads/s | P50 ms | P95 ms | P99 ms | P99.9 ms |
|---|---|---:|---:|---:|---:|---:|---:|
| 1 | JavaScript | 41,142 | 377.61 | 2.576 | 3.271 | 5.126 | 9.089 |
| 1 | Rust | 43,106 | 395.54 | 2.475 | 3.155 | 5.767 | 8.267 |
| 2 | JavaScript | 37,179 | 341.10 | 2.778 | 3.699 | 6.527 | 11.665 |
| 2 | Rust | 46,180 | 423.61 | 2.337 | 2.676 | 3.852 | 6.995 |
| 3 | JavaScript | 34,443 | 316.01 | 3.086 | 4.006 | 7.195 | 12.456 |
| 3 | Rust | 44,620 | 409.31 | 2.439 | 2.790 | 4.253 | 7.868 |
| 4 | JavaScript | 40,064 | 367.53 | 2.671 | 3.067 | 3.608 | 7.085 |
| 4 | Rust | 42,426 | 389.17 | 2.492 | 3.110 | 5.611 | 8.455 |
| 5 | JavaScript | 38,536 | 353.53 | 2.813 | 3.185 | 3.691 | 6.963 |
| 5 | Rust | 43,474 | 398.77 | 2.423 | 2.961 | 4.029 | 7.293 |

Both backends consumed 1 RU per successful read. Thus each row's measured-read
RU total equals its retained read count, and RU/second equals reads/second;
these values exclude warm-up, qualification and result reporting charges.

Rust had more successful reads, higher normalized completion rate and lower
median latency in all five pairs. Read-rate gains for pairs 1 through 5 were
4.75%, 24.19%, 29.53%, 5.89% and 12.80%. However, Rust P99.9 was higher in
pair 4 (8.455 versus 7.085 ms, +19.34%) and pair 5
(7.293 versus 6.963 ms, +4.74%). P99 was higher in pairs 1, 4 and 5,
and P95 was slightly higher in pair 4.

This follow-up does not support a claim that Rust P99.9 is always lower.
The throughput and median improvements repeated in this bounded workload;
tail superiority did not. All unfavorable outcomes are retained, and no
additional runs were performed to obtain a preferred outcome. The cause of
the varying tails remains unresolved.

Evidence is preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/alternating5-20261109T031000Z-h6H59nuf`,
including `five-pair-analysis.json`, `analysis-policy.json`,
`execution-summary.json`, `verification-verdict.json`, service metric responses
and raw intervals under `run`. The full analysis preserves artifact hashes,
actual retained durations and paired differences. Local evidence is under
the session's `files/js-perf-vm/alternating5-129ffbb` directory. This five-pair
authorization is complete; it does not authorize another matrix.

#### CPU/allocation attribution preparation: November 9, 2026

Read-only analysis of the preceding four-pair artifacts used the same
whole-interval warm-up cutoff. Worker CPU per successful read is
`1000 * sum(cpu_user_ms + cpu_system_ms) / sum(successful reads)`.
This includes SDK, native runtime and harness work, but not the separate
reporting process. It is not binding-only CPU attribution.

| Pair | JavaScript CPU us/read | Rust CPU us/read | Rust CPU increase |
|---|---:|---:|---:|
| 1 | 238.22 | 328.66 | 37.97% |
| 2 | 237.89 | 318.34 | 33.82% |
| 3 | 221.76 | 329.43 | 48.55% |
| 4 | 250.68 | 324.31 | 29.37% |

Thus higher completion rate and lower median latency did not imply lower CPU
per completed operation. These observations motivate attribution before an
allocator or ownership change; they do not establish which component is costly.

The existing VM has working `perf` and `bpftrace`. The release addon retains
native symbols and unwind information, but not debug line sections. Session
tooling under `files/js-perf-vm/alternating-129ffbb` prepares two separate,
bounded captures without changing the SDK, addon, driver, or kernel settings:

- `capture-attribution.py --mode cpu` records 99 Hz CPU-clock samples with
  DWARF stack unwinding for an explicit measured-worker PID only. It rejects
  qualification and launcher PIDs, verifies the pinned addon hash and process
  start identity, and excludes the reporting process. Native symbols do not
  guarantee JavaScript/JIT frame or source-line resolution.
- `--mode native-allocations` probes the pinned Rust allocator entry points
  for the Rust worker only. It aggregates allocation calls, requested-byte
  totals, size histograms, deallocations and reallocations. Counts describe
  allocator entry requests, not successful allocations, live memory, V8 heap
  allocations, or cross-thread ownership. Reallocation is reported separately;
  subtracting these totals is not a leak measurement.

The tool requires a fresh output directory, restricts it to the owner, retains
capture metadata and artifact hashes, and accepts at most 120 seconds per
capture. Native allocation instrumentation must run separately from CPU
sampling. Both perturb execution and are diagnostic captures, not replacement
unprofiled benchmark results. Capture windows do not necessarily align with
whole workload intervals: do not divide partial-window allocation totals by
whole-sequence read counts or silently treat the capture as post-warm-up.

Synthetic validation checks profiler availability and allocation argument
positions/counts without contacting Cosmos. Live capture still needs a
separately approved workload budget, exact worker selection, preserved time
boundaries and the existing correctness/service-capacity checks. No new Cosmos
workload or optimization change is authorized by this preparation alone.

#### Partial diagnostic capture: November 10, 2026 UTC

The user subsequently approved two alternating pairs of 120 seconds per backend,
2,000 qualification reads, 90-second CPU captures for both backends in the first
pair, and a separate 30-second native-allocation capture during Rust in the second
pair. Capacity, SDK, addon, driver and allocator remained unchanged.

Run `cfaf157f-4927-4622-85d4-8bf8362a5ed6` started at 00:38:26.313 UTC and was
aborted at 00:43:02.141 UTC on November 10 (18:38 to 18:43 on November 9 in US
Central time). The first JavaScript and Rust sequences completed 41,089 and
47,322 reads. Rust's second sequence stopped at 5,793 reads; the final JavaScript
sequence did not run. The two CPU captures completed, with 761 JavaScript samples
and 1,127 Rust samples. The native-allocation capture failed before attachment.
These are diagnostic observations from an aborted matrix, not a successful
four-sequence comparison or a replacement latency benchmark.

The failure was in the capture tooling: it checked shortened allocator labels
instead of the release binary's exact mangled ELF symbols. Compilation with
`bpftrace -d` had not established successful probe resolution. The corrected
tool now verifies exact symbol names and was tested by actual attachment to the
loaded production addon in a disposable Node process, without constructing a
Cosmos client or issuing reads. Ten offline checks and known-count synthetic
allocator checks passed. The original failed run scripts and evidence remain
unchanged. No allocation totals were obtained from that run.

CPU report observations (shares of sampled CPU, not elapsed read latency):

| Category | JavaScript | Rust-backed JavaScript |
|---|---:|---:|
| Native addon self CPU | Not present | 39.22% |
| libc self CPU | 4.99% | 22.45% |
| Kernel self CPU | 10.12% | 21.83% |
| Node executable self CPU | 68.07% | 13.40% |

Rust's `malloc` symbol accounted for 3.19% self and 4.26% inclusive CPU;
`cfree` accounted for 1.15% self CPU. `finish_task_switch.isra.0` accounted for
5.68% self CPU, and `__x64_sys_futex` for 8.07% inclusive CPU. Inclusive stack
percentages overlap and must not be added. Native addon samples include driver,
runtime, transport and binding work, so the table is not binding-only
attribution. JavaScript/JIT and some libc frames are incompletely resolved.
These observations support investigating allocation and scheduling costs but
do not establish their root cause or promise an allocator or handoff gain.

Partial-run Azure Monitor verification covered the required 96,204 successful
qualification/measured reads and six result creates: the window contained
96,212 workload HTTP 200 responses and six result HTTP 201 responses, with no
observed service 429. This validates service coverage only; it does not turn
the aborted matrix into a successful benchmark. Credential cleanup was
confirmed, and no workload or capture process remained active.

Evidence is preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/attribution-20261110T003747Z-266CvK33`,
including restricted CPU captures, artifact hashes, symbol reports,
`cpu-attribution-analysis.json`, capture failure logs and the aborted execution
summary. Local scripts and the partial service audit are under the session's
`files/js-perf-vm/attribution-129ffbb` directory. Another live allocation attempt
requires a new bounded approval; the failed attempt is not automatically retried.

#### Allocation-only follow-up: November 10, 2026 UTC

The user separately approved one additional JavaScript/Rust pair, 120 seconds
per backend, 2,000 qualification reads and a single 30-second native-allocation
capture during Rust. No CPU sampling, capacity change, SDK/driver change or
allocator switch was included.

Run `fe704b77-1f48-4227-8446-0f109c7995a3` executed from 01:39:24.492 UTC to
01:43:44.666 UTC on November 10 (19:39 to 19:43 on November 9 in US Central
time). JavaScript completed 38,135 reads and Rust completed 46,962 reads, with
zero recorded read errors. All Rust reads had Gateway V2 evidence. The four
result documents and raw interval hashes reconciled. These instrumented
sequences are not replacement unprofiled latency results.

The corrected native capture completed. Its process lifetime was 30.562 seconds,
including profiler startup/teardown around the requested 30-second collection:

| Native allocator entry requests | Count | Requested bytes |
|---|---:|---:|
| Ordinary allocations | 3,527,059 | 878,121,940 |
| Zeroed allocations | 71,621 | 2,197,341 |
| Reallocations (new requested sizes) | 428,437 | 88,490,628 |

This is 3,598,680 new allocation requests plus 428,437 reallocation requests.
Their requested sizes sum to 968,809,909 bytes (968.81 decimal MB, 923.93 MiB).
These are cumulative allocator requests, not retained memory, confirmed
successful allocations, V8 heap allocations, or evidence of a leak. The capture
also recorded 3,585,900 deallocation calls and 921,113,630 deallocation bytes;
window boundaries, reallocations and outstanding allocations make simple
subtraction inappropriate as a leak test.

For ordinary allocations, 2,860,744 requests (81.11%) were smaller than 128
bytes. There were 10,251 requests in each of the 8-16 KiB and 16-32 KiB bins.
Histogram counts reconciled exactly with the corresponding ordinary, zeroed
and reallocation call totals. The coarse size bins do not identify exact
allocation sizes or call sites. In particular, the earlier Python allocation
size must not be presented as a JS measurement. The partial capture window
does not provide an exact corresponding successful-read count, so these totals
are not normalized by the entire sequence's read count.

**Service qualification remains incomplete.** Six bounded Azure Monitor
queries returned 78,900 workload HTTP 200 responses versus 87,097 expected
successful qualification/measured reads, a deficit of 8,197. The two HTTP 304
responses are not counted as successful point-read HTTP 200 responses. All four
result creates were covered. No 429 appeared in the returned metrics, but
incomplete request coverage prevents a fully qualified service-throttling
conclusion. The cause of the coverage gap remains unresolved.

The final verdict is
`diagnostic_capture_complete_service_coverage_incomplete`, with
`benchmarkQualified: false`. Credential cleanup and absence of active
workload/capture processes were independently confirmed. Evidence, restricted
capture artifacts, hashes, histograms and the explicit incomplete-coverage
verdict are preserved under
`/home/azureuser/js-sdk-rust-read-perf/calibration/allocation-20261110T013839Z-HBrvUQu4`.
Local operational artifacts are under the session's
`files/js-perf-vm/allocation-129ffbb` directory.

Together with the CPU capture, the allocation census supports investigating
allocation call sites and scheduling/handoff behavior before an allocator
switch. It does not yet isolate the binding's body copy or diagnostic objects
as the dominant cost, or establish that a specific code change improves CPU
or tail latency. No production optimization was made.

#### Caller attribution and offline bridge experiment

Further analysis recovered leaf instruction samples separately from callchains.
The existing captures have incomplete callchain coverage: 764 of 1,127 Rust
samples and 641 of 761 JavaScript samples print no callchain frames. Leaf
instruction attribution remains available for those samples. Therefore an
allocation absent from decoded stacks is not evidence that it did not occur on
that thread. Rust allocator leaf samples occur on all four sampled Tokio worker
threads and the Node thread; the resolved-stack-only view was biased toward one
worker. The saved `leaf-and-caller-coverage.json` records that limitation.

The decoded callers include driver execution, container/topology resolution,
vector/hash-table growth, HTTP/body buffers and the binding response conversion.
They do not establish which call sites account for most cumulative allocation
bytes. Four Tokio workers contributed 893 of the 1,127 Rust samples despite the
workload having only one public read in flight; this motivates a worker-count
experiment, not a conclusion that four workers are incorrect.

The pinned NAPI implementation gives a concrete bridge hypothesis:
`AsyncBlockBuilder::build_with_map` calls `execute_future_impl`, whose native
Tokio path spawns both the operation future and a second task awaiting its join
handle to propagate panics. `JsDeferred::new` creates a thread-safe completion
function and registers teardown protection for each deferred. These are framework
mechanisms, not two database requests. They must not be bypassed without
preserving panic, error, completion and environment-teardown behavior.
The driver's `CosmosDriverRuntime` is a shared configuration/resource object;
its builder does not itself construct a second Tokio worker pool.

An offline experiment used the unchanged addon's existing `probeAsync` export,
which yields once and returns a string. It did not construct a Cosmos client,
call public `Item.read()`, use account credentials, or issue database requests.
Each fresh process performed 2,000 warm-up calls and 20,000 measured calls.
Worker orders were 4/1/2, 2/4/1 and 1/2/4; matching Tokio thread-name counts
were observed. This is not a generally valid way to distinguish asynchronous
workers from blocking-pool threads, as the subsequent live attempt demonstrated.
Whole-process CPU includes the probe loop and bridge.

| Repetition | 1 worker CPU us/call | 2 workers CPU us/call | 4 workers CPU us/call |
|---|---:|---:|---:|
| 1 | 23.268 | 36.845 | 36.332 |
| 2 | 24.130 | 31.582 | 32.481 |
| 3 | 23.066 | 37.212 | 34.448 |

One worker used less CPU in all three repetitions, with 25.71-35.96% reductions
relative to four workers. These short synthetic observations are not predictions
of Cosmos read latency, CPU savings or scalability. Raw results, including the
two-worker outcomes and wall times, are saved as `offline-bridge-probe.json`
under the preceding CPU-capture run directory.

The workload now supports an opt-in, per-repetition experiment:

```json
"repetitions": 4,
"executionOrder": "alternating",
"profilingMode": "none",
"rustWorkerThreadsByRepetition": [4, 1, 1, 4]
```

Only 1, 2 or 4 workers are accepted, with exactly one value for each repetition.
The launcher sets `TOKIO_WORKER_THREADS` only in the selected measured Rust child
process before addon initialization. JavaScript controls and qualification keep
the default runtime settings. Omission preserves the original sequence plan and
SDK behavior. An inherited `TOKIO_WORKER_THREADS` is rejected rather than
silently introducing an unrecorded runtime change.

Each overridden Rust identity records `config_rust_worker_threads` in its
manifest, raw intervals and both result documents. This is the requested value,
not independent proof of observed thread count. Existing configuration hashes
and result identity checks cover it. The example balances the 4/1 conditions
across Rust's first/second backend position, but still includes four JavaScript
controls: it is eight sequences, not four. It does not authorize a live run.

No SDK/binding/driver default was changed. A subsequent approved public
`Item.read()` comparison must use the same release addon, preserve
correctness/RU/transport checks, resolve service-coverage qualification, and
measure CPU/read separately from latency. A one-worker setting could trade
away throughput under concurrency; single-in-flight results cannot select a
production-wide default.

#### Approved worker-count attempt: aborted, not a benchmark

Run `b4b7a642-ffc8-4657-8585-e7e863012eee`, using commit
`36d77f0ac4ee9cac5bfa923e4dd8ea8744f0f15b`, ran from
2026-11-10 03:59:39 UTC to 04:04:09 UTC. The first JavaScript and four-worker
Rust sequences completed. The external observer stopped the next Rust sequence
after counting two `tokio-rt-worker` threads when one asynchronous worker was
requested. The remaining sequences did not run.

The observer was incorrect to equate thread names with asynchronous worker
count. The pinned Tokio blocking pool uses the same builder thread-name
function. A standalone offline Tokio 1.53.3 reproduction reported one worker
through `RuntimeMetrics::num_workers()` while two threads shared that name:
one asynchronous worker and one explicitly started blocking thread. That
reproduction made no Cosmos requests. It establishes the observer's ambiguity,
not the identity of the extra thread in the terminated database process.
Do not reuse the name-based observer as a worker-count gate.

Partial artifacts passed hash and count checks. The service audit covered
93,372 successful reads including qualification: 93,380 HTTP 200 responses
were observed, alongside all six result creates and no observed 429 responses.
Three HTTP 304 responses were not counted as successful reads. Credential
cleanup and absence of active workloads were verified. The persisted verdict
remains `benchmarkQualified: false`; service coverage cannot qualify an aborted
comparison. No automatic live retry occurred, and no allocator was changed.

#### Opt-in allocator comparison: offline preparation

The native build helper supports two explicitly separate artifacts:

```bash
node rust-prototype/build.cjs --release --allocator=system
node rust-prototype/build.cjs --release --allocator=mimalloc
```

Omitting `--allocator` retains the existing system-allocator build and
`cosmos_js_rust_prototype.node` filename. The experimental build enables only
the `allocator-mimalloc` Cargo feature and writes
`cosmos_js_rust_prototype_mimalloc.node`; it cannot replace or remove the
default addon. The dependency is pinned to Rust wrapper `mimalloc` 0.1.52;
the lockfile selects `libmimalloc-sys` 0.1.49, whose bundled v3 header identifies
mimalloc 3.3.2. Existing lockfile package versions and the Rust driver pin
remain unchanged.

This feature selects the Rust allocator in the native addon. It does not
enable process-wide malloc interposition or change Node/V8's allocator.
No mimalloc tuning, secure/debug allocator mode, or worker-count change is
combined with it. Both variants use four requested Tokio workers during
offline checks, run in separate processes, and retain separate release
artifacts, source-overlay hashes and build manifests. A failed experimental
build removes only its own stale output.

The existing offline binding tests can select an absolute addon path through
`AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH`. This test override is not an
allocator selector for the workload harness: `common.mjs` still fixes the
workload binding path and checks its hash against the selected build manifest.
Do not silently swap the addon between measured sequences. A live comparison
must use independently verified, immutable variant deployments or an explicit
validated harness selector.

Offline probe success and observed allocator calls establish activation and
the tested binding behavior, not a Cosmos performance gain. Public-read CPU,
latency, throughput, memory, correctness and service coverage still require a
separately approved bounded A/B run with allocator selection as the only
experimental variable. No production default is changed by this preparation.

Offline preparation completed using base commit
`36d77f0ac4ee9cac5bfa923e4dd8ea8744f0f15b` plus recorded source overlay
`42568b209d13380f8755400178bcea9f1aaacef96d0830b1fef49a69dfb44556`.
The system and mimalloc release addons have SHA-256 fingerprints
`801d624aeb77584607b5547347da748781c2b9fc6891b4d44b0ee34d7dea828f`
and `40f59f6bb66616e0722338551773ffb5bd7284d33eb51d253ea37d2520f4238f`,
respectively. Both passed the offline binding checks and an additional
2,048-call string-ownership exercise in batches of 32, including error recovery.
These synthetic checks are not a database performance or scalability test.

Exact-PID runtime probes observed calls to the system Rust allocation entry
points and to `mi_malloc_aligned`/`mi_free` in the experimental binary.
The first parser rejected bpftrace's additional cleared-zero map output;
the completed system capture was preserved and reused after validating that
format. Windows/Linux text-newline normalization was also corrected in the
probe-source identity check by comparing bytes. Neither issue triggered
database traffic. Full raw capture and failed-check evidence is retained.

Separate runtime packages now contain identical SDK and workload bytes, the
same lockfile and driver pin, and their respective fingerprinted addons at the
harness's canonical binding path. They do not share or overwrite the default
addon. Build, activation and runtime-preparation evidence is saved under
`/home/azureuser/js-sdk-rust-read-perf/build-evidence/allocator-36d77f0-42568b209d13-release`.
The recorded result remains `performanceImprovementProven: false`, with zero
database requests during this preparation.

#### Allocator A/B: completed bounded comparison

Matrix `3eb569c1-b2bb-4538-b4ae-779b1f58fc12` completed on November 10,
2026, from 05:54:56 to 06:18:33 UTC. Each pair ran legacy JavaScript first,
then Rust, for 120 seconds each. Rust allocator order was
system / mimalloc / mimalloc / system, with four requested Tokio workers,
profiling disabled, and unchanged 10,000 RU/s workload and results capacities.
Each pair also performed 2,000 qualification reads. There were no live retries.
SDK/workload bytes, driver pin, lockfile, and qualified item versions matched
across the matrix; the native allocator variant was the intended variable.

The table excludes whole intervals starting before 11 seconds, without deleting
raw samples. All eight sequences retained 109 of 120 intervals. Percentiles come
from merged histogram counts within each sequence; rows are not pooled.
CPU is whole measured-worker CPU per successful read, excluding the reporter.
RSS is sampled whole-process resident memory, not retained native heap.

| Pair | Backend / Rust allocator | Retained reads | Actual seconds | Reads/s | P50 / P95 / P99 (ms) | CPU (us/read) | Sampled peak RSS (MiB) | RU/read |
|---|---|---:|---:|---:|---|---:|---:|---:|
| 1 | JavaScript control | 35,535 | 108.953 | 326.15 | 2.955 / 4.071 / 6.421 | 251.08 | 111.48 | 1.00 |
| 1 | Rust / system | 44,312 | 108.960 | 406.68 | 2.398 / 2.963 / 4.190 | 326.04 | 102.56 | 1.00 |
| 2 | JavaScript control | 40,100 | 108.955 | 368.04 | 2.709 / 3.181 / 3.493 | 249.94 | 112.28 | 1.00 |
| 2 | Rust / mimalloc | 45,321 | 108.991 | 415.82 | 2.311 / 2.811 / 3.784 | 294.89 | 118.97 | 1.00 |
| 3 | JavaScript control | 36,560 | 108.957 | 335.55 | 2.892 / 3.821 / 5.796 | 250.42 | 112.15 | 1.00 |
| 3 | Rust / mimalloc | 41,905 | 108.977 | 384.53 | 2.485 / 3.228 / 4.902 | 304.19 | 117.77 | 1.00 |
| 4 | JavaScript control | 36,669 | 108.954 | 336.55 | 2.816 / 3.533 / 4.726 | 228.65 | 112.16 | 1.00 |
| 4 | Rust / system | 40,534 | 109.011 | 371.83 | 2.584 / 3.355 / 5.676 | 320.54 | 104.62 | 1.00 |

Adjacent allocator comparisons, always treating system as the baseline:

| System pair vs mimalloc pair | CPU/read reduction | Reads/s change | Sampled peak RSS change |
|---|---:|---:|---:|
| 1 vs 2 | 9.55% | +2.25% | +16.41 MiB |
| 4 vs 3 | 5.10% | +3.41% | +13.15 MiB |

Both observations support a CPU-saving signal with a memory tradeoff in this
single-in-flight workload, not a general allocator recommendation. JavaScript
control throughput changed by +12.84% between pairs 1 and 2, versus -0.30%
between pairs 4 and 3. Accordingly, the small Rust throughput changes cannot
be cleanly attributed to allocator selection. Normalizing Rust CPU/read to
each pair's JavaScript control gives reductions of 9.14% and 13.35%; this is
a sensitivity comparison, not a way to eliminate all time-varying conditions.
Mimalloc Rust still consumed 17.99% and 21.47% more CPU/read than its respective
JavaScript controls. Its pair-2 P99 was also worse than that JavaScript control.
Two Rust observations per allocator do not establish concurrency scalability,
long-duration memory behavior, or a production default choice.

All eight sequences had zero read errors and zero observed 429 responses.
Raw artifacts, completion records, native provenance, unchanged item versions,
credential-directory removal, and absence of active workloads were verified.
One encompassing service-metric window covered 358,573 required successful
reads, including qualification and warm-up: 358,601 HTTP 200 responses and
all 16 result creates were observed, with no observed service 429 responses.
Eight HTTP 304 responses were not counted as successful reads. Service counts
establish coverage, not exact run attribution; RU/read above excludes reporting.

The first offline audit stopped because PowerShell normalized two timestamp
strings (`.130Z` to `.13Z`, and `.660Z` to `.66Z`). Comparison now requires
identical UTC instants for those two timestamp fields and exact equality for
all other summary fields. Failed audit artifacts were preserved; only offline
analysis was repeated, not the database workload.

Full analysis, matrix input, service coverage and the qualification verdict are
retained under
`/home/azureuser/js-sdk-rust-read-perf/build-evidence/allocator-matrix-3eb569c1-b2bb-4538-b4ae-779b1f58fc12`.
The successful verdict qualifies this bounded comparison only. The system
allocator remains the default; neither Node/V8's nor Python's allocator was
changed, and no Rust driver source was modified.

#### Allocator block repetitions: client-observed results

The follow-up matrix `495e0302-dbf6-4c51-9908-b344a85bfadc` completed on
November 10, 2026, from 07:16:00 to 07:52:12 UTC. It ran three mimalloc pairs
followed by three system pairs. Each pair retained the JavaScript-first control,
120 seconds per backend, 2,000 qualification reads, four requested Rust workers,
profiling disabled, and both capacities fixed at 10,000 RU/s. The same
fingerprinted native builds, SDK/workload bytes and item versions were used.
There were no workload retries.

Latency here is the complete public `await item.read()` duration, including
receive-side SDK work before the caller obtains the response: native completion
handoff, body decoding, JSON parsing, diagnostics and `ItemResponse` construction.
Benchmark validation and reporting happen after that timer stops. It is not
time to first network byte or an isolated client-CPU measurement. No separate
server-latency investigation was performed, as requested.

These are individual sequences, not pooled rows. The same whole-interval
warm-up rule (interval starts at or after 11 seconds) applies, with all raw
samples retained. CPU/read covers the measured worker and harness; sampled
peak/final RSS covers the whole worker process, not retained native heap.
Every sequence used 1.00 RU per successful read, excluding reporting.

| Pair | Backend / Rust allocator | Reads/s | P50 / P95 / P99 (ms) | CPU (us/read) | Sampled peak / final RSS (MiB) |
|---|---|---:|---|---:|---|
| 1 | JavaScript control | 344.62 | 2.821 / 3.498 / 5.026 | 257.38 | 111.32 / 89.74 |
| 1 | Rust / mimalloc | 452.95 | 2.167 / 2.638 / 3.263 | 296.17 | 129.76 / 107.27 |
| 2 | JavaScript control | 338.51 | 2.865 / 3.669 / 5.546 | 227.50 | 112.79 / 91.39 |
| 2 | Rust / mimalloc | 409.20 | 2.395 / 2.832 / 3.369 | 294.90 | 119.60 / 118.68 |
| 3 | JavaScript control | 377.82 | 2.602 / 3.098 / 3.571 | 238.14 | 111.88 / 90.29 |
| 3 | Rust / mimalloc | 403.23 | 2.516 / 3.092 / 4.690 | 301.94 | 118.71 / 118.34 |
| 4 | JavaScript control | 339.59 | 2.815 / 3.732 / 5.666 | 247.88 | 111.65 / 89.95 |
| 4 | Rust / system | 404.92 | 2.516 / 3.056 / 4.020 | 325.37 | 104.20 / 104.20 |
| 5 | JavaScript control | 353.60 | 2.749 / 3.404 / 4.738 | 234.39 | 111.34 / 89.98 |
| 5 | Rust / system | 385.00 | 2.578 / 3.099 / 4.501 | 333.06 | 104.59 / 104.59 |
| 6 | JavaScript control | 350.69 | 2.756 / 3.571 / 4.918 | 252.03 | 110.71 / 89.18 |
| 6 | Rust / system | 415.80 | 2.356 / 2.925 / 4.030 | 324.00 | 102.61 / 102.61 |

Ordinal comparisons were declared before execution: system pair 4 versus
mimalloc pair 1, pair 5 versus pair 2, and pair 6 versus pair 3. These are
positions within successive blocks, not simultaneous or time-matched controls.
Positive reduction means improvement; a negative reduction means regression.

| System pair vs mimalloc pair | CPU/read reduction | Client P99 reduction | Reads/s change | Sampled peak RSS change |
|---|---:|---:|---:|---:|
| 4 vs 1 | 8.97% | 18.83% | +11.86% | +25.57 MiB |
| 5 vs 2 | 11.46% | 25.15% | +6.28% | +15.02 MiB |
| 6 vs 3 | 6.81% | -16.38% | -3.02% | +16.11 MiB |

CPU/read is the repeatable positive signal: all three mimalloc observations
were below all three system observations. Sampled peak RSS was consistently
higher. P99 and throughput did not consistently improve: the third mimalloc
observation was worse than its ordinal system comparison on both, despite
lower CPU/read. Mimalloc also used more CPU/read than each corresponding
JavaScript control, and its third P99 was worse than that JavaScript control.
The fixed allocator-block order remains confounded with time of run; these
results do not prove a universal latency improvement, sustained-memory behavior
or concurrency scalability. The system allocator remains the default.

All twelve sequences completed with zero read errors and zero observed 429
responses. Raw/provenance/item-version checks, credential-directory removal,
and absence of active workloads passed. A single encompassing service-request
audit observed 556,450 HTTP 200 responses against 556,408 required successful
reads (including 12,000 qualification reads and warm-up), all 24 result creates,
and no observed service 429 responses. Twelve HTTP 304 responses were not
counted as successful reads. This is coverage evidence, not server-latency data.

Full analysis, exact retained counts/durations, matrix inputs, service coverage
and the qualified bounded-comparison verdict are retained under
`/home/azureuser/js-sdk-rust-read-perf/build-evidence/allocator-block-matrix-495e0302-dbf6-4c51-9908-b344a85bfadc`.
No production default, Python allocator, Node/V8 allocator or Rust driver source
was changed.

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
