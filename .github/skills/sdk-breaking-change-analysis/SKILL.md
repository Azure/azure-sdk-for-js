---
name: sdk-breaking-change-analysis
description: Analyze breaking changes in CHANGELOG.md for Azure SDK PRs that migrate packages from Swagger/AutoRest to TypeSpec/emitter. Categorize each breaking change as Type 1 (API version upgrade) or Type 2 (TypeSpec/emitter migration). Post structured PR comments with root cause analysis. Use when the user asks to analyze breaking changes for a migration PR, estimate migration impact, categorize CHANGELOG entries, or post a breaking change comment on a PR. Triggers on questions like "analyze the breaking changes in this PR", "what are the breaking changes for arm-xxx", "categorize the CHANGELOG breaking changes", "post breaking change analysis".
---

# SDK Breaking Change Analysis

Analyze breaking changes in Azure SDK for JS PRs that migrate packages from Swagger/AutoRest to TypeSpec/emitter. Categorize each as:

- **Type 1: API Version Upgrade** -- caused by REST API evolving between versions
- **Type 2: TypeSpec / Emitter Migration** -- caused by code generation differences

## Workflow

1. **Gather context**: Old/new SDK version, old/new API version, TypeSpec project path, CHANGELOG diff lines
2. **Read both CHANGELOGs**: PR branch (new breakings) + main branch (baseline)
3. **Investigate each breaking change**: Compare old SDK models (`src/models/index.ts`, `src/operationsInterfaces/`), new SDK models (PR branch `src/models/models.ts`, `src/classic/*/index.ts`), and TypeSpec definitions (`.tsp` files)
4. **Categorize using known patterns**: See [references/patterns.md](references/patterns.md) for the full pattern catalog
5. **Trace root causes**: Connect related breakings (discriminator change -> union alias change -> operation signature change) into a unified root cause table
6. **Post comment on PR**: Use the comment template below

## Quick Classification Rules

- `Removed Interface XxxList/XxxCollection` -> Always Type 2 (emitter pagination pattern)
- `Interface Xxx no longer has parameter createdAt/createdBy/...` -> Always Type 2 (SystemData deduplication)
- Discriminator `"A" | "B" | "C"` -> `string` -> Always Type 2 (extensible enum pattern)
- `Type alias "XxxUnion" has been changed` -> Investigate root cause: the real breaking is the base type's discriminator change (Type 2)
- `Removed Interface XxxQueryObject` -> Always Type 2 (query params folded into OptionalParams)
- `Operation Xxx has a new signature` -> Trace to root cause: find inner model/discriminator change
- Check TypeSpec for `@removed(Versions.vXxx)` or `@added(Versions.vXxx)` decorators -> Type 1
- `Parameter location of interface Xxx is now required` -> Usually Type 2 (TrackedResource hierarchy)

## Tracing Root Causes

When multiple CHANGELOG entries share the same root cause, present them together:

```
Discriminator change (e.g., Job.jobType -> string)
  -> Union alias change (JobUnion)
  -> Operation signature changes (JobDetails.get, ...)
```

Use a **Unified Root Cause Table** with columns: Root Cause | Union Alias | Operation Signatures.

If you cannot determine the root cause for a signature change, list it separately so the user can manually verify.

## Comment Template

**IMPORTANT: The "Accepted" column is for the user to fill in manually.** Do NOT pre-fill it with check marks or cross marks. Render the column header as `Accepted :white_check_mark: / :x:` and leave all cells **empty** so the user can copy-paste the icons as they review each row.

```markdown
## Breaking Change Analysis: PACKAGE_NAME VERSION

| | Old SDK (main) | New SDK (PR) |
|---|---|---|
| **Generator** | Swagger / AutoRest | TypeSpec / emitter |
| **API Version** | OLD_VERSION | NEW_VERSION |
| **Package Version** | OLD_PKG_VER | NEW_PKG_VER |

---

### Type 1: API Version Upgrade (OLD -> NEW) -- N items

| # | Breaking Change | Detail | Accepted :white_check_mark: / :x: |
|---|---|---|---|

---

### Type 2: TypeSpec / Emitter Migration -- M items

| # | Breaking Change | Count | Detail | Accepted :white_check_mark: / :x: |
|---|---|---|---|---|

#### Unified Root Cause Table (if applicable)

| Root Cause (Discriminator Change) | Union Alias | Operation Signatures |
|---|---|---|

---

**Total: N (Type 1) + M (Type 2) = T breaking changes**
```

## Posting PR Comments

**CRITICAL: Never read-modify-write comment bodies.** Round-trip through `gh api --jq .body` + PowerShell collapses all newlines.

Always write the full body from scratch to a UTF-8 temp file:

```powershell
$body = @'
... full comment body ...
'@

$tmpFile = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText($tmpFile, $body, [System.Text.UTF8Encoding]::new($false))

# New comment:
gh api repos/Azure/azure-sdk-for-js/issues/PR_NUMBER/comments -F "body=@$tmpFile" --jq '.id'

# Update existing:
gh api repos/Azure/azure-sdk-for-js/issues/comments/COMMENT_ID -X PATCH -F "body=@$tmpFile" --jq '.id'
```

Key rules:
- Use `@'...'@` (here-string) for body with real newlines
- Use `UTF8Encoding($false)` (no BOM)
- Use `-F "body=@filepath"` to read from file
- Avoid non-ASCII chars (`--` not em-dash, `->` not arrow)
- **Never reconstruct from memory** -- always re-derive from source data

## Tips

1. **Start with pattern matching** -- most breaking changes fit known patterns in [references/patterns.md](references/patterns.md).
2. **Check `back-compatible.tsp`** for `@@Legacy.flattenProperty` and compatibility decorators.
3. **Check `client.tsp`** for `@clientName` decorators that may rename types.
4. **Compare old CHANGELOG** -- if a change appears in BOTH old and new CHANGELOGs, it's likely Type 1.
5. **Signature changes need root cause tracing** -- `XxxResponse -> Model` is not the real breaking. Find the inner model/discriminator change. Cross-reference with other CHANGELOG entries.
6. **Union alias changes need root cause tracing** -- ordering changes alone are not breaking; the real cause is the base type's discriminator property change.
7. **Check TypeSpec version decorators** (`@removed`, `@added`) to distinguish Type 1 from Type 2.