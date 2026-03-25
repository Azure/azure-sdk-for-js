# Test Generation Report: azure-storage-blob (concurrent rerun)

**Package:** `azure-storage-blob` (azure-sdk-for-python)
**Date:** 2026-03-17
**Model:** gpt-5.4
**Run type:** single-pass concurrent rerun (`loop.concurrency=3`, `llm.concurrency=3`)
**Status:** partial archival — run was stopped during repeated isolation cleanup

## Summary

- Initial branch coverage: **73.2%**
- Generated gap files: **10**
- Approx wall-clock runtime before stop: **~98.7 min**
- Context resolution failures: **0**
- Malformed JSON failures: **0**
- Session-idle timeouts: **2**
- Final machine-readable run report: **not produced** (the run never exited cleanly)

## Generated Files

| File | Lines | Quality |
|------|------:|---------|
| `test_blob_client_gaps.py` | 16 | Degraded / placeholder |
| `test_blob_client_helpers_gaps.py` | 4 | Degraded / placeholder |
| `test_blob_service_client_gaps.py` | 39 | Substantive output |
| `test_container_client_gaps.py` | 41 | Substantive output |
| `test_container_client_helpers_gaps.py` | 14 | Degraded / placeholder |
| `test_download_gaps.py` | 38 | Substantive output |
| `test_encryption_gaps.py` | 8 | Degraded / placeholder |
| `test_models_gaps.py` | 15 | Degraded / placeholder |
| `test_shared_access_signature_gaps.py` | 68 | Substantive output |
| `test_upload_helpers_gaps.py` | 16 | Substantive output |

## Quality Assessment

### Stronger outputs

- `test_blob_service_client_gaps.py`
- `test_container_client_gaps.py`
- `test_download_gaps.py`
- `test_shared_access_signature_gaps.py`

These stayed mostly behavior-focused and retained meaningful assertions after fix loops.

### Weak or degraded outputs

- `test_blob_client_gaps.py`
- `test_blob_client_helpers_gaps.py`
- `test_container_client_helpers_gaps.py`
- `test_encryption_gaps.py`
- `test_models_gaps.py`
- `test_upload_helpers_gaps.py`

These were either reduced to comments/smoke tests or materially weakened by the isolation pass because the generated tests depended on mutable shared module/class state.

## Main Bottlenecks Observed

1. **Fix-loop churn dominated runtime.** Several files spent many minutes in repeated `Tests failed — asking LLM to fix` cycles.
2. **Isolation repair became the terminal bottleneck.** After all 10 files were generated, the full-suite phase repeatedly rewrote or removed tests to eliminate leaked global state.
3. **Module-global patching hurt accuracy.** The model often chose direct mutation of class/module internals for hard-to-reach branches. Those tests passed alone but polluted the broader suite.
4. **High-value files were mixed with brittle internals.** Public-API-oriented files produced durable tests more often than helper/model/encryption internals.
5. **Long-running sessions still timed out occasionally.** Two `Timeout after 300000ms waiting for session.idle` events were observed.

## Changes That Helped This Run

- hardened JSON-only response instructions
- added tolerant JSON parsing
- fixed selection attachments to include `text`
- prevented persistent sessions from being seeded on a cheaper model
- passed existing-suite examples directly on each generation batch
- serialized resolve-phase calls, eliminating prior `Client not connected` failures

## Recommended Next Improvements

### Accuracy

1. Add a **suite-style classifier** per source file: decide whether the target should use public API tests, recorded integration tests, or pure helper unit tests, and hard-gate generation accordingly.
2. For Python helper/internal files, require **scoped patching only** (`patch.object`, `pytest.monkeypatch`, context managers) and explicitly ban direct assignment to module/class globals.
3. Add a **pre-write static linter** for generated code that rejects dangerous patterns before tests run:
   - direct reassignment of imported module members
   - `sys.modules` / `importlib.reload` state tricks
   - monkeypatch-like behavior without fixture/context restoration
4. Feed the model **existing test class skeletons** when the suite is class-based, not just snippets.
5. Split “generate” into two modes:
   - safe public-API tests for service/client files
   - constrained internals tests with a stricter allowlist for helper/model files

### Performance

1. Add a **cheap AST/text safety filter** before running pytest to catch obvious bad generations without spending fix iterations.
2. Reduce `fixMaxIterations` for files that repeatedly fail on the same class of errors; fail fast and move on.
3. Add **per-file abandonment thresholds** once a file enters repeated isolation rewrites.
4. Persist more **structured seed context** (fixtures, class patterns, patching rules) so the model asks for less and drifts less.
5. Capture and surface **exact per-call token/runtime telemetry** even on interrupted runs, so bottlenecks are measurable without a clean final report.

## Artifacts

- Raw log: `{report_log.name}`
- Summary JSON: `{report_json.name}`
- This report: `{report_md.name}`
