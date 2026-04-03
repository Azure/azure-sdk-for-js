---
name: sdk-breaking-change-analysis
description: Analyze breaking changes in CHANGELOG.md for ARM SDK PRs migrating from Swagger/AutoRest to TypeSpec/emitter. Categorize as Type 1 (API version upgrade) or Type 2 (TypeSpec migration). Post structured PR comments with root cause analysis. Triggers on "analyze the breaking changes in this PR", "what are the breaking changes for arm-xxx", "post breaking change analysis".
---

# SDK Breaking Change Analysis

Analyze breaking changes in Azure SDK for JS PRs that migrate **ARM management SDK** packages from Swagger/AutoRest to TypeSpec/emitter. Not for data-plane, RLC, or hand-written SDKs.

Categorize each as:

- **Type 1: API Version Upgrade** -- caused by REST API evolving between versions
- **Type 2: TypeSpec / Emitter Migration** -- caused by code generation differences

Throughout this document, **"Pattern N"** (e.g., Pattern 3, Pattern 14) refers to entries in [references/patterns.md](references/patterns.md). Always consult that file for symptom details, root cause explanations, and verification steps.

## Workflow

### 1. Gather context

- Use `gh api` or GitHub MCP tools to read PR metadata (title, body, branch ref, head SHA)
- Extract **package name** from PR title: `[AutoPR @azure-arm-xxx]` -> `@azure/arm-xxx`
- Extract **SDK path** from PR files: find the `CHANGELOG.md` path, strip the filename (e.g., `sdk/communication/arm-communication/CHANGELOG.md` -> `sdk/communication/arm-communication`)
- Extract from PR body (the `Configurations:` line):
  - **TypeSpec config path**: the quoted path (e.g., `specification/communication/Communication.Management/tspconfig.yaml`). The TypeSpec project directory is the parent folder.
  - **New API version**: `API Version: xxx`
  - **Release type**: `SDK Release Type: stable|beta`
- Extract **old API version** from the main branch client file: find `xxxClient.ts` in `SDK_PATH/src/`, look for `this.apiVersion = options.apiVersion || "xxxx-xx-xx"` -- the `xxxx-xx-xx` is the old API version
- Extract **old package version** from main branch CHANGELOG header (e.g., `## 4.2.0 (date)`)
- Extract **new package version** from PR branch CHANGELOG header (e.g., `## 5.0.0 (date)`)
- **PR branch ref**: from `head.ref`. If the branch ref returns 404 when fetching files, use `head.sha` (commit SHA) instead

### 2. Read breaking changes from CHANGELOG

- Fetch CHANGELOG.md from **PR branch**: use GitHub API with `?ref=BRANCH_NAME` or `refs/pull/PR_NUMBER/head`
- Fetch CHANGELOG.md from **main branch** for baseline (old version): use `?ref=main`
- The SDK path from Step 1 gives the CHANGELOG location (e.g., `sdk/frontdoor/arm-frontdoor/CHANGELOG.md`)
- Extract the `### Breaking Changes` section -- if the user provides line numbers, use those; otherwise scan for the first `### Breaking Changes` under the new version header
- Count total breaking change entries (each `  - ` line is one entry)
- Also check the `### Features Added` section if the user asks for feature analysis

### 3. Investigate each breaking change

- Compare **OLD vs NEW** `review/*-node.api.md` files for actual signatures and type definitions -- these are the source of truth for the public API surface
- Use `?ref=main` for the old API surface, `?ref=PR_BRANCH` for the new API surface (or local git: `git show origin/main:SDK_PATH/review/...`)
- For `Operation has a new signature`: compare the **full old and new signatures** (parameters AND return type). The root cause may be:
  - **Return type change**: void return, string unwrap, model type change
  - **Parameter type change**: a request model has an inner type change (e.g., discriminator property changed)
  - **Inner model change**: a model referenced in parameters or return type has a property type change that propagates to the operation signature
  - **NOTE**: Request/response type **naming changes alone** (e.g., `XxxResponse` -> `Model`) are NOT the root cause. The real root cause is always a structural change in the types themselves. Dig deeper to find it.
- For `Removed Interface/Type/Enum`: check if the type exists in the TypeSpec `.tsp` files and whether it's referenced by any operation in the new api.md
- For `Parameter is now required`: check the TypeSpec model definition to understand why (e.g., `ResourceWithRequiredLocation` vs `TrackedResource`)
- For `Type of parameter changed`: check the TypeSpec union/enum definition to understand the new type

### 4. Trace root causes

- **Group signature changes** by their actual return type pattern: void return, string unwrap, discriminator-caused, or other
- For **discriminator changes** (Pattern 3): find the discriminator property in the base type, then find all union aliases (Pattern 4) and all operations (Pattern 1) affected by it -- present as a causal chain:
  ```
  Discriminator change (e.g., Job.jobType -> string)
    -> Union alias change (JobUnion)
    -> Operation signature changes (JobDetails.get, ...)
  ```
- For **removed types** (Pattern 14): search the old api.md for references to the type (excluding its definition). If no operation or reachable model references it, it was orphaned
- Build causal chains **before** assigning pattern categories -- one root cause can explain multiple CHANGELOG entries
- Use a **Unified Root Cause Table** with columns: Root Cause | Union Alias | Operation Signatures
- If you cannot determine the root cause for a signature change, list it separately for manual verification

### 5. Categorize using known patterns

- Assign pattern numbers from [references/patterns.md](references/patterns.md) to each breaking change or group
- For Type 2 with many items (typically > 15 or many distinct groups): group related entries into summary rows by root cause pattern
- For Type 2 with few items (roughly <= 10, or slightly above with few distinct groups): list each entry individually with its pattern
- Verify all counts sum to the total

### 6. Verify root causes

Do NOT skip this step. Pattern-matching alone is error-prone. Verify each root cause against actual code:

- For **signature changes**: compare the **full old and new signatures** (both parameters and return type) in the actual `review/*.api.md`. Naming changes alone (e.g., `XxxResponse` -> `Model`) are never the root cause -- find the structural change underneath (return type changed to void/string, parameter model has inner type change, discriminator changed, etc.)
- For **removed types**: confirm the type existed in the old api.md (`export interface Xxx`) and does NOT exist in the new api.md
- For **discriminator changes**: confirm the old type had inline literal unions and the new type uses a named union/string type
- For **Type 1 vs Type 2**: if API versions differ, check whether each breaking change also exists when comparing two Swagger-generated SDKs at the same API version. If the breaking would exist regardless of the migration, it's Type 1.
- For **tree-shaking (P14)**: confirm the type is not referenced by any operation or reachable model in the old api.md
- **Spot-check at least 2-3 items** from each pattern group against the actual api.md files, especially for groups with many items

### 7. Post comment on PR

- Use the comment template below
- See [Posting PR Comments](#posting-pr-comments) for technical details

## Comment Template

**IMPORTANT: The "Accepted" column is for the user to fill in manually.** Do NOT pre-fill it with check marks or cross marks. Render the column header as `Accepted :white_check_mark: / :x:` and leave all cells **empty** so the user can copy-paste the icons as they review each row.

### Type 1 Format

For **Type 1** breaking changes, use a simple flat table with `#`, `Breaking Change`, `Detail` columns. Each row is one CHANGELOG entry. No grouping, no `Accepted` column.

### Type 2 Format (conditional on count)

**If Type 2 count <= 10** (or slightly above with few distinct groups): Use a **flat table** with one row per CHANGELOG entry. Columns: `#`, `Breaking Change`, `Pattern`, `Detail`, `Accepted`. The `Breaking Change` cell should contain the CHANGELOG text verbatim (e.g., `` `Removed Interface XxxList` ``). No grouping, no collapsible details.

**If Type 2 count is large (typically > 15 or many distinct pattern groups)**: Use the **3-layer structure**:

1. **Summary table** -- one row per root-cause group (NOT one row per CHANGELOG entry). Columns: `#`, `Breaking Change`, `Count`, `Detail`, `Accepted`.
2. **Unified Root Cause Table** -- only when discriminator chains exist (discriminator change -> union alias change -> operation signature change).
3. **Detailed Breakdown** -- collapsible `<details>` section per summary row, listing every individual CHANGELOG entry.

### Grouping Rules (for 3-layer structure only)

- Group related CHANGELOG entries by their **root cause pattern**, not by their CHANGELOG text.
- Each summary row should have a `Count` reflecting how many individual CHANGELOG entries it covers.
- The `Detail` cell should include: a concise root cause explanation, the Pattern number (e.g., "Pattern 3"), and old->new type info where relevant.
- All counts across rows must sum to the total breaking changes.

### Detail Breakdown Rules (for 3-layer structure only)

Each `<details>` section should:
- Use format: `<summary>Row N: Description (X items, Pattern Y)</summary>`
- List every individual CHANGELOG entry as a bullet
- Include old->new type transitions where known (e.g., `XxxResponse` -> `void`)
- For operation signature changes, explain the root cause (void return, string unwrap, discriminator change, etc.)

### Comment Header (always included)

```markdown
## Breaking Change Analysis: PACKAGE_NAME VERSION

| | Old SDK (main) | New SDK (PR) |
|---|---|---|
| **Generator** | Swagger / AutoRest | TypeSpec / emitter |
| **API Version** | OLD_VERSION | NEW_VERSION |
| **Package Version** | OLD_PKG_VER | NEW_PKG_VER |

---

### Type 1: API Version Upgrade (OLD -> NEW) -- N items

| # | Breaking Change | Detail |
|---|---|---|
| 1 | `Removed operation Xxx.yyy` | Description of why removed in new API version. |

---

**Total: N (Type 1) + M (Type 2) = T breaking changes**
```

### Type 2 Template: Flat (for <= 10 items)

One row per CHANGELOG entry. `Breaking Change` cell contains the CHANGELOG text verbatim.

```markdown
### Type 2: TypeSpec / Emitter Migration -- M items

| # | Breaking Change | Pattern | Detail | Accepted :white_check_mark: / :x: |
|---|---|---|---|---|
| 1 | `Removed Interface XxxList` | List wrappers (P2) | List wrapper internalized. Operations return `PagedAsyncIterableIterator<T>` directly. | |
| 2 | `Removed Interface YyyCollection` | List wrappers (P2) | Same as above. | |
```

### Type 2 Template: 3-layer (for > 10 items)

Grouped summary table + unified root cause table + collapsible detail breakdown.

```markdown
### Type 2: TypeSpec / Emitter Migration -- M items

| # | Breaking Change | Count | Detail | Accepted :white_check_mark: / :x: |
|---|---|---|---|---|
| 1 | Discriminator type changes (extensible enums) | X | Inline literal unions replaced by named union types. See Root Cause Table. (Pattern 3) | |
| 2 | Union type alias changes | X | Caused by discriminator changes in #1. (Pattern 4) | |
| 3 | Operation signature changes (void return) | X | LRO operations now return void instead of header-only wrapper types. (Pattern 1) | |

#### Unified Root Cause Table (if applicable)

| Root Cause (Discriminator Change) | Union Alias | Operation Signatures |
|---|---|---|

---

#### Detailed Breakdown

<details>
<summary>Row 1: Discriminator Type Changes (X items, Pattern 3)</summary>

- `Interface.property`: `"A" | "B"` -> `NamedType`
- ...
</details>

<details>
<summary>Row 3: Operation Signature Changes -- Void Return (X items, Pattern 1)</summary>

Old SDK returned header-only wrapper response types. New SDK returns void.

- Operation.beginXxxAndWait (`XxxResponse` -> `void`)
- ...
</details>
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