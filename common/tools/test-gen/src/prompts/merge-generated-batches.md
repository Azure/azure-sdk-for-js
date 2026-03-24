You are merging {{generatedCount}} generated {{testFramework}} test batch(es) into a single complete test file.

<existing_section>
{{existingSection}}
</existing_section>
## Generated Tests to Merge

<generated_section>
{{generatedSection}}
</generated_section>

## Instructions

1. Merge all generated tests into one complete file.
2. Do NOT duplicate any existing describe/it/test blocks.
3. **NEVER delete, skip, or modify existing tests.** Every existing test block from the existing file must appear in the output UNCHANGED.
4. Preserve existing imports, helpers, setup/teardown hooks, and structure verbatim when an existing file is present.
5. Deduplicate imports and helpers across the generated batches.
6. Add any new imports needed by the merged tests.
7. Return the complete merged file.

Respond with EXACTLY ONE valid JSON object matching this schema.
- The first character of your response must be `{`.
- The last character of your response must be `}`.
- Do NOT use markdown fences.
- Do NOT add any explanation, commentary, headings, or prose before or after the JSON.
- Every string value must be properly JSON-escaped.
- The merged file content must be a JSON string value with escaped newlines, quotes, and backslashes, as if produced by `JSON.stringify(...)`.
- Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.

Schema:
<response_schema>
{{jsonSchema}}
</response_schema>
