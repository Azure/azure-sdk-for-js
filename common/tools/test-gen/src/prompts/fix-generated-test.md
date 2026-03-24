A generated test file has failures. Fix the failing tests.

## Test File

**`{{relPath}}`**

<test_file_attachment>
{{testFileSection}}
</test_file_attachment>
<source_section>
{{sourceSection}}
</source_section>
<existing_suite_section>
{{existingSuiteSection}}
</existing_suite_section>
<context_section>
{{contextSection}}
</context_section>
<escalation_section>
{{escalationSection}}
</escalation_section>
## Test Output (errors)

<test_output_errors>
{{errorSection}}
</test_output_errors>

## Diagnosis Instructions

Before writing any fix, perform these analysis steps on the attached files:

1. **Scan the source file** attached above. Identify every public symbol (classes, functions, constants, type aliases) and their exact signatures. These are the ONLY names you may import. Do NOT guess at import paths — use only what you see in the source. Pay extreme attention to exact spelling: do not combine partial names (e.g. do NOT invent `CategoricalDriftMetricThreshold` if the actual class is `CategoricalDataDriftMetricThreshold`), do not add/remove leading underscores, do not confuse similar suffixes like `Metrics` vs `MetricThreshold`.
2. **Scan the existing suite example** if attached. Identify all fixtures, helpers, decorators, setup patterns, and assertion style it uses. Your fix must re-use these same patterns.
3. **Read the error output carefully.** Classify each failure:
   - ImportError / ModuleNotFoundError → wrong module path or non-existent symbol. Cross-reference with the public symbols you found in step 1.
   - AttributeError → wrong attribute/method name. Cross-reference with step 1.
   - AssertionError → wrong expected value. Re-read the source logic and correct the assertion.
   - TypeError → wrong argument count or type. Check the function signature from step 1.
   - FixtureError / missing fixture → the fixture is not available. Cross-reference with step 2. Do NOT invent fixtures.
   - Other → examine the traceback and fix accordingly.
4. **Apply the minimal fix.** Change ONLY what's needed to make the test pass while still testing the intended branch.
5. **Re-anchor to the existing suite shape.** Copy its class/function structure, decorators, fixtures, helpers, imports, and naming patterns instead of inventing new ones.

## Rules

1. Fix ONLY the failing tests. Do NOT modify passing tests.
2. NEVER delete or skip a test — every test in the input must appear in the output.
3. Preserve all imports, helpers, and structure not related to the failure.
4. If a test's assertion was wrong, fix the expected value — do NOT weaken the assertion.
5. If an import is wrong, fix it using the actual symbols visible in the source file.
6. Return the COMPLETE corrected file — not a diff, not a partial snippet.
7. Do NOT invent fixtures, decorators, helper functions, imports, or private symbols that are not visible in the attached source file or attached existing-suite example.
8. Do NOT replace behavior tests with module-import smoke tests, reflection tests, or generic "symbol exists" tests.

Respond with EXACTLY ONE valid JSON object matching this schema.
- The first character of your response must be `{`.
- The last character of your response must be `}`.
- Do NOT use markdown fences.
- Do NOT add any explanation, commentary, headings, or prose before or after the JSON.
- Every string value must be properly JSON-escaped.
- In particular, the corrected file content must be a JSON string value with escaped newlines, quotes, and backslashes, as if produced by `JSON.stringify(...)`.
- Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.

Schema:
<response_schema>
{{jsonSchema}}
</response_schema>
