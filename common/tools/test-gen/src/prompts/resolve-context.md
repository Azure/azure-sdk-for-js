You are preparing to write tests for a source file. Before generating tests, you need to
identify which OTHER source files contain information necessary to construct correct test inputs.

## Source File: `{{sourceFile}}`

<source_under_test>
{{sourceSection}}
</source_under_test>

Lines marked with ⚠️ UNCOVERED are the branches that need test coverage.

## All Source Files in Project

<source_file_list>
{{fileInventorySection}}
</source_file_list>

## Task

Identify which files from the list above I should include as context when generating tests
for the ⚠️ UNCOVERED branches. Consider:

1. **Imported modules** — files this source directly imports from (types, helpers, constants)
2. **Type definitions** — files containing classes/types used as parameters or return values in uncovered branches
3. **Factory functions / constructors** — files that show how to create instances needed as test inputs
4. **Callers** — files that call the functions containing uncovered branches (shows realistic usage patterns)

Do NOT include:
- Test files (those are provided separately)
- Unrelated source files that share no dependency with the uncovered code
- The source file itself

Return at most {{maxFiles}} files. Fewer is better — only include files that are genuinely necessary.

Respond with EXACTLY ONE valid JSON object matching this schema.
- The first character of your response must be `{`.
- The last character of your response must be `}`.
- Do NOT use markdown fences.
- Do NOT add any explanation, commentary, headings, or prose before or after the JSON.
- Every string value must be properly JSON-escaped.
- Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.

Schema:
<response_schema>
{{jsonSchema}}
</response_schema>
