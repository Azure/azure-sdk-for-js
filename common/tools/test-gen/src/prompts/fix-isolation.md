Some generated test files pass when run individually but cause OTHER tests to fail
when run as part of the full test suite. This is a test isolation problem — one or more
of the generated files are leaking global state that corrupts the test environment.

Your job is to SURGICALLY FIX the isolation issue while PRESERVING test coverage.
Deleting or commenting out tests is a last resort — you must try harder alternatives first.

**CRITICAL CONSTRAINTS:**
- Do NOT change import statements. The original imports were verified to work.
- Do NOT restructure the file layout or move code between modules.
- Focus ONLY on fixing the state-leaking mechanism (mocking, patching, global mutation).
- Every returned file must be importable and runnable with `pytest` — verify imports are valid.

You are working in BATCHES to keep the prompt focused. Analyze only the files shown in this batch.
If the culprit is not in this batch, return no files and no fixes.

## Generated File Inventory ({{fileCount}} files total)

<generated_file_inventory>
{{inventory}}
</generated_file_inventory>

## Current Batch ({{batchLabel}}, {{batchSize}} files)

<current_batch_files>
{{filesSection}}
</current_batch_files>

## Full Suite Errors

These failures appear when the generated test files above are included in the suite:

<full_suite_errors>
{{errorsSection}}
</full_suite_errors>

## Diagnosis Instructions

1. **Read the error tracebacks** to identify which generated test(s) are causing the pollution.
   Common causes: module reloading, monkey-patching without cleanup, global state mutation,
   singleton modification, class-level attributes mutated at module scope.
2. **Cross-reference** the errors with the CURRENT BATCH only. If no file in this batch looks responsible,
   return no files and no fixes.
3. **Fix ONLY the files in this batch that cause isolation problems.** Most files are likely fine.

## Fix Strategy (in order of preference)

Apply fixes in this priority order — ALWAYS try higher-priority fixes before lower ones:

1. **Scope mocks properly** — Replace module-level or global mocking with function-scoped
   mocking that auto-cleans up (context managers, test fixtures, setup/teardown hooks).
2. **Add cleanup** — Add teardown logic, cleanup hooks, or `try/finally` blocks to
   restore any mutated state after each test.
3. **Use test-framework patching** — If a test modifies module-level or global attributes,
   use the test framework's built-in patching utilities that automatically restore values.
4. **Use function-scoped setup** — Replace class-level or module-level setup with
   per-test setup to prevent cross-test pollution.
5. **Narrow the patch target** — If a test patches too broadly, narrow to the
   specific object/method rather than the entire module or class.
6. **LAST RESORT ONLY: Remove a single test** — If and only if a specific test function
   is fundamentally untestable without global mutation, remove JUST that one test function
   (not the whole file). Add a one-line comment explaining why.

## Rules

1. Return ONLY files you changed from the CURRENT BATCH — do NOT include files that are fine as-is.
2. Each returned file must contain the COMPLETE corrected content.
3. **NEVER delete an entire file's tests.** Fix individual problematic tests instead.
4. **NEVER replace tests with placeholder comments or pass-only stubs.** Every test must
   retain meaningful assertions.
5. **NEVER change import statements.** The original imports were verified working. If you
   change an import path, the file will fail to load and break the entire suite.
6. You may remove at most 1-2 individual test functions per file if absolutely necessary.
   The remaining tests MUST be preserved with real logic.
7. Do NOT modify any tests that are working correctly.
8. Do NOT use module reloading on the module under test — this often breaks other tests
   that hold references to the old module. Instead, use the test framework's patching
   utilities with proper scoping.
9. If this batch does not contain the culprit, return:
   {"files":[],"fixes":[]}

Respond with EXACTLY ONE valid JSON object matching this schema.
- The first character of your response must be `{`.
- The last character of your response must be `}`.
- Do NOT use markdown fences.
- Do NOT add any explanation, commentary, headings, or prose before or after the JSON.
- Every string value must be properly JSON-escaped.
- Any returned file content must be a JSON string value with escaped newlines, quotes, and backslashes, as if produced by `JSON.stringify(...)`.
- Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.

Schema:
<response_schema>
{{jsonSchema}}
</response_schema>
