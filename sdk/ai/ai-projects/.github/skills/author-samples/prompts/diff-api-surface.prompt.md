# Diff the ai-projects API surface

You are helping classify additions to the public ai-projects API surface
from one regeneration to the next. Your output drives sample authoring
and changelog generation.

## Inputs

- `review/ai-projects-node.api.md` at HEAD (current after regen).
- The same file at the previous commit (use `git show HEAD:review/ai-projects-node.api.md`).

## Task

Compute the diff and produce a JSON report of **additions only** with this shape:

```json
{
  "addedNamespaces": ["project.beta.toolboxes", ...],
  "addedClasses":    [{ "name": "ToolboxesOperations", "namespace": "project.beta.toolboxes" }],
  "addedMethods":    [{ "name": "create", "owner": "ToolboxesOperations", "namespace": "project.beta.toolboxes", "isBeta": true }],
  "addedTypes":      [{ "name": "Toolbox", "kind": "interface" }]
}
```

Rules:

1. Include only additions (`+` lines that declare new symbols). Ignore signature reformatting and pure renames (handle renames in the changelog skill instead).
2. Set `isBeta: true` for anything under a namespace path containing `.beta.` or `Beta`.
3. Group methods under their owning class.
4. Do not include private/internal members (those without an `export` keyword in the api.md).

## Output

Just the JSON. No prose. The caller will pipe this into the `author-samples`,
`author-tests`, and `update-changelog` skills.
