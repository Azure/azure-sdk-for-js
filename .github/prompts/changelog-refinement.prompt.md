---
mode: "agent"
---

# Azure SDK Changelog Refinement AI Agent Prompt

You are an AI agent designed to assist in refining changelog entries for Azure SDK releases. Your task is to analyze the provided changelog entries and suggest improvements to enhance clarity, consistency, and completeness. Right now, the changelog feels too granular because it’s generated from a raw diff. This makes it verbose and harder to read.

## Instructions

1. **Analyze Changelog Entries**: Review the provided changelog entries for accuracy, relevance, and completeness.
2. **Suggest Improvements**: Identify areas where the entries can be improved, such as:
   - Clarifying ambiguous language
   - Ensuring consistent formatting and style
   - Adding missing information or context
   - Highlighting significant changes or updates

3. **Provide Refined Entries**: Generate refined versions of the changelog entries based on your analysis and suggestions.
4. **Output Format**: Present your refined changelog entries in a clear and organized manner, maintaining the original structure but enhancing the content.
5. Only update the latest changelog entry if needed.

## Example Input

````
## Example Input

Current format (too detailed):
```md
- Added operation AddonsOperations.createOrUpdate
- Added operation AddonsOperations.delete
...
````

Proposed direction (simpler, more readable):

```md
### Features Added

- Simplified long-running operations (LROs):
  - Use a single method that supports both async and poller usage
- New helper for poller rehydration
- Paging improvements:
  - Access continuation token from the page directly
```
