# Test Generation Report: azure-storage-blob (v4 — improved batching & isolation)

**Package:** `azure-storage-blob` (azure-sdk-for-python)
**Date:** 2026-03-18
**Model:** gpt-5.4 (generate, fix, isolation), gpt-4.1 (merge, resolve)
**Run type:** single-pass concurrent (`loop.concurrency=3`, `llm.concurrency=3`)
**Status:** completed with isolation issues

## Summary

| Metric | Value |
|--------|-------|
| Initial branch coverage | 67.5% |
| Final branch coverage | 67.5% (measurement failed — import errors from isolation) |
| Generated files | 10 |
| Total test functions | 33 |
| Wall clock runtime | 123.7 min (2.1 hrs) |
| LLM serial time | 232.8 min |
| LLM calls | 197 |
| Input tokens | 3,291,353 |
| Output tokens | 802,568 |
| Batches processed | 50 |
| Session timeouts | 4 (recovered) |

## Configuration

```
gapBatchSize: 12 (was 5 in previous runs)
maxBatchesPerFile: 15 (new cap)
maxGapFiles: 10
fixMaxIterations: 3
sourceExclusions: ["_generated", "aio/"]
postTestCommand: ".venv/bin/python -m coverage json -o coverage.json"
```

## Comparison with Previous Runs

| Metric | Run 1 (Mar 17) | Run 2 (bad files) | **Run 4 (this)** |
|--------|----------------|-------------------|-------------------|
| Wall clock | ~99 min | 300+ min (killed) | **124 min** |
| LLM calls | ~200 (est) | 831+ | **197** |
| Input tokens | unknown | 14M+ | **3.3M** |
| Output tokens | unknown | 2.9M+ | **803K** |
| Batch size | 5 | 5 | **12** |
| Files targeted | public API | _generated/ code | **_shared/ + public** |
| Isolation result | 5 files gutted | n/a (killed) | **all preserved** |

### Why Run 2 was 3x slower
Run 2 had no `sourceExclusions`, so the gap ranker selected auto-generated SDK files
(`_generated/operations/_blob_operations.py` with 375 gaps, `_generated/_utils/serialization.py`
with 380 gaps). These massive boilerplate files created 60+ batches each, leading to 831+ LLM calls
and 14M+ input tokens. Adding `sourceExclusions: ["_generated", "aio/"]` fixed this.

## Phase Breakdown

| Phase | Calls | Time (serial) | Input Tokens | Output Tokens |
|-------|-------|---------------|-------------|---------------|
| fix | 89 | 125.5 min (54%) | 87,959 | 467,726 |
| generate | 50 | 54.2 min (23%) | 3,156,369 | 186,429 |
| merge | 36 | 34.1 min (15%) | 20,062 | 73,502 |
| isolation | 12 | 17.4 min (7%) | 18,683 | 72,302 |
| resolve | 10 | 2.0 min (1%) | 8,280 | 2,609 |

**Fix loop remains the dominant cost** — 54% of LLM time with only 18.3% success rate.

## Generated Files

| File | Lines | Tests | Quality | Source |
|------|------:|------:|---------|--------|
| test_encryption_gaps.py | 83 | 4 | ✅ Good | _encryption.py |
| test_avro_io_async_gaps.py | 63 | 2 | ✅ Good | avro/avro_io_async.py |
| test_avro_io_gaps.py | 72 | 3 | ⚠️ Import error after isolation | avro/avro_io.py |
| test_schema_gaps.py | 60 | 3 | ⚠️ Import error after isolation | avro/schema.py |
| test_uploads_gaps.py | 47 | 4 | ✅ Good | _shared/uploads.py |
| test_uploads_async_gaps.py | 58 | 3 | ✅ Good | _shared/uploads_async.py |
| test_policies_gaps.py | 41 | 5 | ✅ Good | _shared/policies.py |
| test_blob_client_helpers_gaps.py | 31 | 3 | ✅ Good | _blob_client_helpers.py |
| test_blob_client_gaps.py | 33 | 3 | ✅ Good | _blob_client.py |
| test_container_client_helpers_gaps.py | 29 | 3 | ✅ Good | _container_client_helpers.py |

### Quality Assessment

**8 of 10 files have substantive tests** with real assertions and meaningful coverage.

**2 files broken by isolation fixes** — the isolation LLM rewrote import paths that were valid
in the test venv but invalid outside it:
- `test_avro_io_gaps.py`: Changed to `from azure.storage.blob._shared.avro import io as avro_io`
  (module is `avro_io`, not `io`)
- `test_schema_gaps.py`: Changed to `from azure.storage.blob._generated._serialization import ...`
  (path doesn't match installed package structure)

**Major improvement over Run 1**: In the previous experiment, isolation gutted 5 files to
placeholders/smoke-only stubs. This run preserved all test logic, with only the 2 import
errors as regressions.

## Isolation Fix Behavior (improved prompt)

The updated isolation prompt instructs the LLM to:
1. Use `monkeypatch` and scoped `mock.patch()` instead of module-level patches
2. Add autouse cleanup fixtures instead of deleting tests
3. Never replace tests with placeholders or `assert True` stubs
4. A code guard rejects fixes that drop >50% of a file's tests

**Results**: All 10 files retained real tests. The LLM added autouse fixtures, narrowed patches,
and used `asyncio.run` instead of manual loop management. However, it still rewrote some imports
incorrectly, which is now addressed in the latest prompt update (rule: NEVER change imports).

## Errors & Issues

1. **4 session timeouts** (`Timeout after 300000ms waiting for session.idle`) — all recovered
   by moving to the next batch. Likely caused by large context windows on fix calls.
2. **1 JSON parse error** (`Unterminated string in JSON`) — batch skipped, recovered.
3. **2 import errors from isolation** — LLM changed valid imports to invalid paths.
4. **Final coverage measurement failed** — the import errors in generated files prevented
   pytest from collecting, so `coverage.json` wasn't produced for the final measurement.

## Key Bottlenecks

1. **Fix loop efficiency** — 18.3% success rate (89 failures, 20 passes). Each failed fix
   costs ~84s (LLM call + pytest run). This alone accounts for 125 min of serial LLM time.
2. **Session timeouts** — 4 occurrences, each wasting 5 min of wall clock.
3. **Isolation import rewrites** — the LLM doesn't understand which import paths are valid
   in the test environment.

## Changes Applied Before This Run

1. **Batch size 5 → 12**: Fewer LLM calls per file (reduced from 60+ to ~5-9 batches)
2. **Max 15 batches per file**: Caps effort on large files
3. **Source exclusions**: `["_generated", "aio/"]` — skip auto-generated and async-mirror code
4. **Post-test command**: `python -m coverage json` fallback for when pytest-cov doesn't write JSON
5. **Improved isolation prompt**: Prioritized surgical fixes over removal
6. **Isolation rejection guard**: Rejects fixes that drop >50% of tests

## Recommended Next Improvements

### Fix Loop (biggest impact)
1. **Pre-validate generated code** — run a syntax/import check before pytest to catch obvious errors
2. **Smarter error extraction** — feed only the relevant traceback to the fix LLM, not the full output
3. **Reduce fix iterations** — cap at 2 instead of 3; if 2 fixes fail, the test is likely unfixable

### Isolation
1. **Never change imports** — added to prompt (rule 5, rule 8)
2. **Pre-isolation import check** — verify all files import correctly before running isolation
3. **Post-isolation import check** — reject any isolation fix that breaks imports

### Performance
1. **Use gpt-4.1 for fix calls** — fix prompts are simpler than generation; cheaper model may suffice
2. **Parallel isolation** — run isolation batches concurrently instead of sequentially
3. **Session timeout recovery** — auto-recreate session on timeout instead of skipping the batch

## Artifacts

- Run log: `/tmp/storage-blob-v2-run.log`
- Report JSON: `/tmp/storage-blob-v2-report.json`
- Deep log: `azure-storage-blob/.test-gen-copilot-sdk/test-gen-deep.jsonl`
- This report: `reports/python-azure-storage-blob-v4-2026-03-18.md`
