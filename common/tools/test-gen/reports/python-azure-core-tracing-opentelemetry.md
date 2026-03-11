# Test Generation Report: azure-core-tracing-opentelemetry

**Package:** `azure-core-tracing-opentelemetry` (azure-sdk-for-python)
**Date:** 2026-03-11
**Model:** gpt-5.3-codex
**Target:** 80% branch coverage

## Invocation

```typescript
import { runLoop } from "@azure-tools/test-gen";

const report = await runLoop({
  packageDir: "/path/to/azure-sdk-for-python/sdk/core/azure-core-tracing-opentelemetry",
  dryRun: false,
  config: {
    runner: {
      command: "bash -c 'source .venv/bin/activate && pytest tests/ -x "
        + "--ignore=tests/test_eventhubs_live.py "
        + "--ignore=tests/test_servicebus_live.py "
        + "--ignore=tests/test_storage_live.py "
        + "--ignore=tests/test_tracing_implementations.py "
        + "--cov=azure.core.tracing.ext.opentelemetry_span "
        + "--cov-branch --cov-report=json -q'",
      coveragePath: "coverage.json",
      coverageFormat: "coveragepy",
      runSingle: "bash -c 'source .venv/bin/activate && pytest $FILE -x -q'",
      timeout: 120_000,
    },
    paths: {
      testDir: "tests",
      sourcePrefix: "azure/",
      testExtensions: [".py"],
      specSuffix: "test_",
      specExclusions: ["__pycache__", ".pyc", "live"],
    },
    language: {
      testFramework: "pytest",
      outputExtension: ".py",
    },
    loop: {
      targetCoverage: 80,
      maxIterations: 5,
      fixMaxIterations: 3,
      batchSize: 2,
    },
  },
});
// report now contains: RunReport { initialBranchCoverage, finalBranchCoverage,
//   generatedFiles, totalInputTokens, totalOutputTokens, totalDurationMs,
//   wallClockMs, llmCalls, iterations }
```

## Coverage

| Metric             | Before    | After      | Delta   |
|--------------------|-----------|------------|---------|
| Branch coverage    | 60.7%     | **100.0%** | +39.3pp |
| Statement coverage | ~57%      | **99%**    | +42pp   |
| Tests passing      | 7         | **20**     | +13     |

### Per-file breakdown (after)

| File | Stmts | Miss | Branch | BrPart | Cover |
|------|-------|------|--------|--------|-------|
| `azure/core/tracing/ext/opentelemetry_span/__init__.py` | 163 | 0 | 28 | 0 | 100% |
| `azure/core/tracing/ext/opentelemetry_span/_schema.py` | 18 | 1 | 0 | 0 | 94% |
| `azure/core/tracing/ext/opentelemetry_span/_version.py` | 1 | 0 | 0 | 0 | 100% |
| **TOTAL** | **182** | **1** | **28** | **0** | **99%** |

## Token & Runtime Stats

| Metric | Value |
|--------|-------|
| LLM calls | 6 |
| Input tokens (total) | ~32,000 |
| Output tokens (total) | ~8,400 |
| Total tokens | ~40,400 |
| LLM time (cumulative) | ~180s |
| Wall-clock time | ~240s |
| Iterations | 3 |

### Per-call breakdown

| # | Purpose | Input | Output | Duration |
|---|---------|-------|--------|----------|
| 1 | Generate `test_opentelemetry_span.py` | ~15,500 | ~5,700 | ~63s |
| 2 | Generate `test_opentelemetry_schema.py` | ~15,500 | ~700 | ~12s |
| 3 | Fix `test_opentelemetry_schema.py` (attempt 1) | ~1,800 | ~700 | ~10s |
| 4 | Fix `test_opentelemetry_schema.py` (attempt 2) | ~1,800 | ~700 | ~10s |
| 5 | Fix `test_opentelemetry_schema.py` (attempt 3) | ~1,800 | ~700 | ~10s |
| 6 | Merge (not needed — new files) | — | — | — |

> **Note:** Token counts above are approximate (estimated from prompt sizes and response lengths).
> Future runs will have exact counts via the `RunReport` returned by `runLoop()`.

## Generated Test Files

### `tests/test_opentelemetry_span.py`

13 tests — all passed on first generation (0 fix iterations).

| # | Test Name |
|---|-----------|
| 1 | `test_import_fallback_for_suppress_http_key` |
| 2 | `test_init_raises_for_unsupported_kind` |
| 3 | `test_init_links_conversion_iterates` |
| 4 | `test_init_truthy_empty_links_and_parent_context` |
| 5 | `test_init_links_attribute_error_falls_back_to_raw_links` |
| 6 | `test_kind_property_missing_attribute_returns_none` |
| 7 | `test_kind_setter_valid_invalid_and_warning_paths` |
| 8 | `test_exit_without_context_manager_and_start` |
| 9 | `test_to_header_and_get_trace_parent` |
| 10 | `test_link_delegates_to_link_from_headers` |
| 11 | `test_link_from_headers_success_and_warning` |
| 12 | `test_get_current_span_prefers_last_unsuppressed_when_current_nonrecording` |
| 13 | `test_get_current_tracer_change_context_and_setters` |

### `tests/test_opentelemetry_schema.py`

Generated but required 3 fix iterations due to import/schema compatibility issues.
After fix loop exhausted, tests still contributed to coverage on re-measurement.

## Loop Execution

```
Iteration 1: Measured 60.7% branch coverage
  → Batch: __init__.py, _schema.py
  → Generated test_opentelemetry_span.py (5736 tokens) — tests pass ✅
  → Generated test_opentelemetry_schema.py (697 tokens) — 3 fix attempts

Iteration 3: Re-measured coverage
  → 20 tests passing
  → 100.0% branch coverage — target 80% exceeded ✅
```
