# Breaking Change Analysis Guidelines

Detailed workflow instructions for the [breaking-change analysis agent](../agents/mgmt-breaking-change-analysis.agent.md).

---

## Phase 1: Gather Context

- Use `gh api` or GitHub MCP tools to read PR metadata (title, body, branch ref, head SHA)
- Extract **package name** from PR title: `[AutoPR @azure-arm-xxx]` -> `@azure/arm-xxx`
- Extract **SDK path** from PR files: find the `CHANGELOG.md` path, strip the filename
- Extract from PR body (the `Configurations:` line):
  - **TypeSpec config path**: the quoted path (e.g., `specification/communication/Communication.Management/tspconfig.yaml`)
  - **New API version**: `API Version: xxx` (may be absent for multi-service packages -- see below)
  - **Release type**: `SDK Release Type: stable|beta`
- Extract **spec repo commit SHA** from the **latest commit message** on the SDK PR branch. Look for `CommitSHA: 'XXXXXXX' in SpecRepo:` in the commit message. This is the exact spec repo commit the SDK was generated from (may not be on main branch).
- Extract **old/new package versions** from main branch and PR branch CHANGELOG headers
- **PR branch ref**: from `head.ref`. If 404 when fetching files, use `head.sha` instead

### API Version Discovery

Some SDK packages cover a single service with one API version (e.g., `@azure/arm-sql`). Others are **multi-service packages** that bundle several sub-services, each with its own API version (e.g., `@azure/arm-compute` bundles Compute, ComputeDisk, ComputeGallery, ComputeSku, and CloudService). The PR body `API Version:` field may be absent or show only one version for multi-service packages.

Always build a **per-service version map** `{service_name: api_version}` for both old and new SDKs, then compare per-service to determine which services had API version changes.

#### Old SDK API versions (AutoRest)

1. Find `_meta.json` on the main branch: `git show main:SDK_PATH/_meta.json`
2. Extract the specs repo `commit` SHA and `readme` path
3. Fetch the readme at that commit and find the active tag (e.g., `tag: package-2025-04-01`)
4. Read that tag's `input-file:` list -- each entry is a swagger `.json` file with the API version in its path
5. Group files by service sub-path and extract API version from the file path:
   ```
   Microsoft.Compute/ComputeRP/stable/2025-04-01/ComputeRP.json  -> ComputeRP: 2025-04-01
   Microsoft.Compute/DiskRP/stable/2025-01-02/DiskRP.json         -> DiskRP: 2025-01-02
   Microsoft.Compute/GalleryRP/stable/2024-03-03/GalleryRP.json   -> GalleryRP: 2024-03-03
   Microsoft.Compute/Skus/stable/2021-07-01/skus.json             -> Skus: 2021-07-01
   Microsoft.Compute/CloudserviceRP/stable/2024-11-04/...          -> CloudserviceRP: 2024-11-04
   ```
6. If only 1 group -> single-service package. If multiple -> multi-service package.

#### New SDK API versions (TypeSpec)

1. Get the TypeSpec project directory from the PR body `Configurations:` path (strip the filename to get the project dir). Fallback: read `tsp-location.yaml` from the PR branch if present.
2. Read the root-level `client.tsp` in the TypeSpec project directory at the spec commit
3. Find the `@client` decorator's `service: [...]` list to identify all services (e.g., `service: [Compute, ComputeDisk, ComputeGallery, ComputeSku]`)
4. For each service in the list, follow imports from `client.tsp` to find the service's defining file (may be `{Service}/main.tsp` or `{Service}/client.tsp`) and read the `enum Versions` block in the service namespace
5. The **last** (highest) entry in `enum Versions` is the current API version for that service. This is a heuristic -- if ambiguous, verify against the generated openapi files under `stable/` or `preview/`.
   ```
   enum Versions {
     v2024_11_01: "2024-11-01",
     v2025_04_01: "2025-04-01",   // <- this is the current version
   }
   ```
6. Services present in old swagger but **absent** from the TypeSpec `@client` service list are **removed** from TypeSpec scope (e.g., CloudService)

#### Service Name Normalization

Old swagger paths and new TypeSpec namespaces may use different names for the same service (e.g., `ComputeRP` in swagger vs `Compute` in TypeSpec, `DiskRP` vs `ComputeDisk`, `GalleryRP` vs `ComputeGallery`). Build a mapping by matching:
- Service area (the resource provider sub-path, e.g., both `ComputeRP` and `Compute` are the core compute service)
- API version similarity
- Operation groups covered

If the mapping is ambiguous, flag it for manual review. The normalized map should produce a joined table like:

| Service | Old Name (swagger) | New Name (TypeSpec) | Old Version | New Version |
|---|---|---|---|---|
| Compute | ComputeRP | Compute | 2025-04-01 | 2025-04-01 |
| Disk | DiskRP | ComputeDisk | 2025-01-02 | 2025-01-02 |
| Gallery | GalleryRP | ComputeGallery | 2024-03-03 | 2025-03-03 |
| Sku | Skus | ComputeSku | 2021-07-01 | 2021-07-01 |
| CloudService | CloudserviceRP | *(removed)* | 2024-11-04 | -- |

#### Per-Service Classification

- **Same version, same scope**: For a service where old and new API versions are identical, Layer A == Layer B for that service. Breaking changes in that service's types are Type 2 only.
- **Version upgraded**: For a service with a version change (e.g., Gallery 2024-03-03 -> 2025-03-03), breaking changes in that service's types may be Type 1 (API version upgrade). Must check Layer A vs Layer B.
- **Service removed from scope**: Types that existed only because of a removed service (e.g., CloudService) are Type 2a (TypeSpec scope exclusion). These are NOT Type 1 -- the old API still exists in swagger, it's just not included in the TypeSpec project.
- **Service added**: New services in TypeSpec that weren't in old swagger add new types/operations but don't cause breaking changes.

### Four-Layer Swagger Comparison Model

For TypeSpec migration PRs, breaking changes come from three distinct sources. Compare four spec layers (three pairwise comparisons):

```
Layer A (old original swagger)         -- from old SDK's _meta.json commit
Layer B (new original swagger)         -- from specs repo BEFORE TypeSpec conversion
Layer C (TypeSpec-generated swagger)   -- from specs repo AFTER TypeSpec conversion
Layer D (SDK api-view)                 -- from review/*.api.md files in old/new SDK
```

#### How to Find Each Layer

**Layer A (old original swagger)**:
1. Find `_meta.json` at the old SDK version tag: `git show @azure/arm-xxx_VERSION:SDK_PATH/_meta.json`
2. Extract the specs repo `commit` SHA and `readme` path
3. Fetch swagger files from `Azure/azure-rest-api-specs` at that commit SHA
4. Read the readme tag (e.g., `### Tag: package-xxx`) to find all `input-file:` entries -- these are the Layer A swagger files
5. Map each operation group to its API version from the file path (e.g., `Microsoft.Sql/preview/2022-08-01-preview/Databases.json`)

**Layer B (new original swagger -- before TypeSpec conversion)**:
1. First, check if the spec commit (from Layer C) is on the main branch:
   ```
   gh api repos/Azure/azure-rest-api-specs/compare/SPEC_COMMIT...main --jq '.status'
   ```
   - If `"identical"` or `"ahead"` -> the commit is merged to main
   - If `"behind"` or `"diverged"` -> the commit is NOT on main (from an unmerged spec PR)
2. **If merged to main**: The TypeSpec conversion PR is already merged. Find the base commit automatically:
   - Get the TypeSpec project directory from the SDK's `tsp-location.yaml` (`directory` field)
   - Use git log on the specs repo to find when `.tsp` files first appeared in that directory. Note: GitHub commits API returns newest-first, so paginate to find the **oldest** commit. **Important**: `--paginate` with `--jq` applies the jq filter per page, so `.[-1]` gives the last item of each page, not the global last. Instead, collect all SHAs and take the last:
     ```
     gh api "repos/Azure/azure-rest-api-specs/commits?path=TYPESPEC_DIR/main.tsp&sha=main&per_page=100" --paginate --jq '.[].sha' | Select-Object -Last 1
     ```
   - This returns the first commit that added `.tsp` files. Get its parent as the base commit:
     ```
     gh api repos/Azure/azure-rest-api-specs/commits/FIRST_TSP_COMMIT --jq '.parents[0].sha'
     ```
3. **If NOT on main**: Ask the user for the TypeSpec conversion PR number or base commit SHA directly.
   - If a PR number is given, extract the base commit: `gh api repos/Azure/azure-rest-api-specs/pulls/PR_NUMBER --jq '.base.sha'`
4. The base commit is the last state of the original swagger before TypeSpec files were checked in
5. Fetch swagger files at that base commit -- individual `.json` files per operation group at the new API version

**Layer C (TypeSpec-generated swagger)**:
1. The SDK is generated from a **specific spec repo commit**, not necessarily the main branch. Find this commit SHA from the **latest commit message** on the SDK PR branch. The auto-generated commit message follows this format:
   ```
   Configurations: '...tspconfig.yaml', API Version: ..., SDK Release Type: ..., and CommitSHA: 'XXXXXXX' in SpecRepo: 'https://github.com/Azure/azure-rest-api-specs'
   ```
2. Extract the `CommitSHA` value -- this is the exact spec repo commit the SDK was generated from
3. Fetch the generated `openapi.json` at that commit: e.g., `Microsoft.Sql/SQL/preview/2025-02-01-preview/openapi.json`
4. Use: `gh api repos/Azure/azure-rest-api-specs/commits/COMMIT_SHA --jq '.sha'` to verify the commit exists
5. **Note**: The spec PR may still be open/unmerged when the SDK is generated. Always use the commit SHA from the SDK PR commit message, not the specs repo main branch.

**Layer D (SDK api-view)**:
1. Old: `git show @azure/arm-xxx_VERSION:SDK_PATH/review/arm-xxx-node.api.md`
2. New: fetch from PR branch (`refs/pull/PR_NUMBER/head`)
3. **Important**: The new SDK may generate multiple api.md files (per-operation-group `*-api-*-node.api.md` and `*-models-node.api.md`), but the main `arm-xxx-node.api.md` already includes all content from the child files. Always use only the main `*-node.api.md` file for comparison.

#### Classification Rules

After gathering all four layers, each breaking change is classified by which layer comparison reveals the cause:
- **Layer A != Layer B** -> **Type 1: API Version Upgrade** (the REST API itself changed between versions)
- **Layer B != Layer C** -> **Type 2a: TypeSpec Conversion** (TypeSpec models the same API differently than the original swagger)
- **Layer B == Layer C but Layer D differs** -> **Type 2b: Emitter Artifact** (same swagger, but TypeSpec emitter generates different TS code than AutoRest)

**Multi-service classification**: For multi-service packages, classification is **per-service**. To classify a breaking change:
1. Determine which service owns the affected type or operation (from the swagger file or TypeSpec namespace it belongs to)
2. Check that service's version status (same, upgraded, or removed) from the per-service version map
3. If the service version is the same -> the breaking is Type 2 only
4. If the service version upgraded -> compare Layer A vs Layer B for that service to check for Type 1
5. If the service was removed from TypeSpec scope -> the breaking is Type 2a (scope exclusion)

---

## Phase 2: Read Breaking Changes from CHANGELOG

- Fetch CHANGELOG.md from **PR branch** and **main branch**
- Extract the `### Breaking Changes` section under the new version header
- Count total breaking change entries (each `  - ` line is one entry)

---

## Phase 3: Investigate Root Causes

For each breaking change, the agent must understand **what changed in the SDK** and then trace **why it changed** through the swagger/TypeSpec layers.

### Investigation Order

Investigate breaking changes in this order -- model-level entries first, signature entries last:

1. **Removed operations / operation groups** -- straightforward, usually entire API groups deprecated
2. **Model-level changes** -- `Interface X no longer has parameter Y`, `Type of parameter Y is changed`, `Parameter Y is now optional`, `Removed Interface X`, `Removed Type Alias X`, `Type alias X has been changed`
3. **Operation signature changes** (`Operation X has a new signature`) -- investigate LAST, after all model-level entries are classified

This order ensures that `broken_models` (see Step 2) is fully populated before analyzing signature changes, making cascade detection reliable.

**Sub-ordering within model-level changes**: Cascade detection applies to model-level entries too, not just "new signature" entries. A model-level entry can cascade from another model-level entry (e.g., a union alias change cascading from a discriminator base type change). To handle this:
- Investigate **leaf types first** -- types whose breaking change does not depend on another broken type (e.g., discriminator base type changes, direct property removals)
- Then investigate **dependent types** -- types that reference broken types in their definition (e.g., `Type alias "BackupPolicyUnion" has been changed` when `BackupPolicy.type` already has a discriminator change)
- After classifying each model-level entry, add it to `broken_models` immediately so subsequent entries can detect cascades from it

### Step 1: Understand the Actual SDK Change (all entry types)

Compare the **old and new** main `review/arm-xxx-node.api.md` file to see exactly what changed in the public API surface. Ignore the per-operation-group child files (`*-api-*-node.api.md`, `*-models-node.api.md`).

Key principles:
- **"Has a new signature" entries are the most complex.** A single signature change can have **multiple independent breaking causes** -- some from Type 1, some from Type 2. Identify every structural difference and trace each one separately.
- **Naming changes alone are NOT breaking causes.** If a type was renamed (e.g., `XxxResponse` -> `XxxModel`) but the structure is identical, that is not what caused "a new signature". Look deeper.
- **Response wrapper removal is NOT a breaking cause if the inner model is structurally identical.** For example, if `DatabaseAdvisorsGetResponse` is just a type alias for `Advisor` and the `Advisor` model has the same properties in both old and new SDKs, then removing the response wrapper is cosmetic -- not a real structural breaking change. Always compare the actual model structures, not just the type names.
- **Options interface renaming is NOT a breaking cause for "new signature".** If `XxxOptionalParams` was renamed to `XxxOptions` but the properties are identical, this does not cause a structural signature change. Only report options changes when properties are actually added, removed, or changed (e.g., `resumeFrom` removed from LRO options).
- **Breaking changes cascade through nested type references.** A model change causes breaking entries for the model itself AND for every operation/model that references it, even indirectly. Every "new signature" entry **MUST** go through the full investigation checklist in Step 2 (direct parameter changes, options changes, cascade detection) before being attributed to emitter or cosmetic differences.
- **Discriminator chains are a known cascade pattern.** A discriminator type change ripples through union aliases to all operations using them.

### Step 2: Investigate "New Signature" Entries

"New signature" entries can have multiple independent causes. Investigate them LAST (after all model-level entries are classified) and check the following causes **in order**:

#### Cause 1: Direct parameter changes

Compare old and new operation signatures in api.md. Look for:
- **Parameters added or removed** from the method signature (e.g., `parameters: OutboundFirewallRule` removed)
- **Parameter type changed** (e.g., a parameter's type was replaced with a different model)
- **Parameter reordered** (positional arguments moved)

These are direct breaking causes, not cascades. Classify based on which swagger layer introduced the change.

#### Cause 2: Options property changes

Compare the options interface (`XxxOptionalParams` / `XxxOptions`) properties between old and new api.md:
- **Properties added or removed** (e.g., `resumeFrom?: string` removed from LRO options, `skipToken` removed)
- **Property type changed**
- **Property optionality changed** (required -> optional or vice versa)

Note: Options interface **renaming** (`XxxOptionalParams` -> `XxxOptions`) alone is NOT a breaking cause.

#### Cause 3: Cascade from broken models

Use the cascade detection algorithm to check if any type in the operation's dependency chain has a model-level breaking change.

##### A. Build the broken models set

From the CHANGELOG entries already investigated (model-level entries should be done by now), extract all type names with breaking changes:

| CHANGELOG pattern | Example |
|---|---|
| `Interface X no longer has parameter Y` | `Interface RecommendedAction no longer has parameter details` |
| `Type of parameter Y of interface X is changed from ...` | `Type of parameter details of interface RecommendedAction is changed from ...` |
| `Parameter Y of interface X is now optional` | `Parameter state of interface GeoBackupPolicy is now optional` |
| `Removed Interface X` | `Removed Interface ServerCommunicationLink` |
| `Removed Type Alias X` | `Removed Type Alias ManagedInstancePropertiesProvisioningState` |
| `Type alias "X" has been changed` | `Type alias "BackupPolicyUnion" has been changed` |

Collect into: `broken_models = {RecommendedAction, GeoBackupPolicy, ServerCommunicationLink, ...}`

##### B. Build a type reference graph from old api.md

Parse the **old** api.md to understand which types reference which other types. A regex-based scan is sufficient:

1. **Interface properties**: For each `export interface X { ... }`, find property types:
   - `propertyName?: TypeName` -> X references TypeName
   - `propertyName?: TypeName[]` -> X references TypeName
   - `propertyName?: Record<string, TypeName>` -> X references TypeName
2. **Type aliases**: `export type XxxResponse = ModelName;` -> XxxResponse resolves to ModelName
3. **Operation signatures**: For each operation `methodName(..., options?: XxxOptionalParams): Promise<XxxResponse>`:
   - Resolve XxxResponse to its underlying model (from step 2)
   - Record that the operation depends on: all parameter types, the resolved return type, and the options type

Build a map: `type_deps[TypeName] = Set of types that TypeName references in its properties`

##### C. For each unclassified entry, walk the dependency graph

Cascade detection applies to **all** CHANGELOG entries -- model-level changes and "new signature" entries alike. For each entry not yet classified as a cascade:

1. Identify the affected type(s):
   - For "new signature": the operation's return type, parameter types, and options type
   - For "Type alias X has been changed": the constituent types in the alias (e.g., union members)
   - For "Interface X no longer has parameter Y": check if X references a broken type that caused the property removal
2. For each referenced type, check:
   - Is it in `broken_models`? If yes -> **cascade found**
   - If not, recursively check its properties' types (up to depth 3)
3. If a broken model is found in the chain -> classify as **cascading from that model's CHANGELOG entry**

**Important**: Always resolve type aliases before checking. `XxxGetResponse = Advisor` means you check `Advisor`, not `XxxGetResponse`.

##### D. Example: PR #38034 cascade chain

```
CHANGELOG entry row 22: "Type of parameter details of interface RecommendedAction is changed..."
  broken_models includes: RecommendedAction

For "Operation DatabaseAdvisors.get has a new signature":
  1. Return type: DatabaseAdvisorsGetResponse = Advisor (resolve alias)
  2. Check Advisor -> not in broken_models
  3. Check Advisor's properties:
     - recommendedActions?: RecommendedAction[]
     - RecommendedAction IS in broken_models -> CASCADE FOUND
  4. Classify as: "Cascading from row 22: return type Advisor contains
     recommendedActions: RecommendedAction[], and RecommendedAction.details
     type changed."
```

This cascade also applies to all other operations returning or accepting `Advisor`:
`DatabaseAdvisors.listByDatabase`, `DatabaseAdvisors.update`, `ServerAdvisors.get`, `ServerAdvisors.listByServer`, `ServerAdvisors.update`.

##### E. Example: PR #38137 model-to-model cascade (discriminator -> union alias)

```
CHANGELOG entry row 36: "Type of parameter type of interface BackupPolicy is changed
  from 'Periodic' | 'Continuous' to BackupPolicyType"
  broken_models includes: BackupPolicy

For "Type alias 'BackupPolicyUnion' has been changed":
  1. Old: BackupPolicy | PeriodicModeBackupPolicy | ContinuousModeBackupPolicy
  2. BackupPolicyUnion includes BackupPolicy as a constituent type
  3. BackupPolicy IS in broken_models -> CASCADE FOUND
  4. Classify as: "Cascading from row 36: BackupPolicyUnion includes BackupPolicy
     as its base discriminator type, and BackupPolicy.type changed from inline
     union to BackupPolicyType."
  5. Add BackupPolicyUnion to broken_models

For "Operation DatabaseAccounts.get has a new signature":
  1. Return type contains backupPolicy?: BackupPolicyUnion
  2. BackupPolicyUnion IS in broken_models -> CASCADE FOUND
  3. Classify as: "Cascading from row 36 (via BackupPolicyUnion)"
```

#### Phrases That Are Never Root Causes

The following describe **presentation differences**, not root causes. If you find yourself writing one of these as a root cause, **stop and dig deeper** -- there is always a real structural cause underneath:

- "function to arrow property" / "method syntax change"
- "response wrapper removal" / "response type alias removed"
- "options interface renamed"

### Step 3: Trace Through Swagger/TypeSpec Layers

Once you understand WHAT changed, trace WHY by checking the spec layers to classify each cause:

- **Layer A vs Layer B**: Does the entity differ in the old vs new original swagger? If yes -> **Type 1**.
- **Layer B vs Layer C**: Does the original swagger differ from the TypeSpec-generated swagger? If yes -> **Type 2a**.
- **Layer C vs Layer D**: Is the swagger the same but the SDK api.md differs? If yes -> **Type 2b**.

Things to watch for:
- Types generated by AutoRest that never existed in any swagger (e.g., collection wrappers, internal helpers) -> **Type 2b**
- Discriminator/union changes may need tracing through `.tsp` files
- A single "new signature" entry may have causes at different layers -- trace each structural difference independently

### Step 4: Verify

Do NOT skip verification. Each root cause must be supported by actual evidence from the layer diffs. Confirm Type 1 claims against swagger diffs, Type 2 claims against TypeSpec/emitter output.

**Cascade verification (mandatory for "new signature" entries):**
- For every "new signature" entry classified as Type 2, confirm that NO model in its type dependency chain (from Step 2) has a Type 1 breaking change. If it does, reclassify the entry as **Type 1 cascading**.
- Do NOT attribute a "new signature" to emitter/cosmetic differences (options rename, response wrapper removal) if the operation's parameter or return types contain a model with a CHANGELOG breaking change. The cascade is the real root cause.

**For "new signature" entries classified as Type 2:** Always verify by comparing the full old and new signatures side by side in the api.md. Check:
1. Are the parameter types structurally identical (not just renamed)?
2. Is the return type structurally identical (resolve type aliases -- e.g., `XxxResponse = Model` means compare `Model` structures)?
3. Are the options properties identical (check for added/removed properties like `resumeFrom`)?

If the only differences are cosmetic (type alias removal, method-to-property syntax, interface rename), the entry should either be a cascade from a model-level entry (classify as the same Type as the upstream model -- Type 1 cascading if the model is Type 1, Type 2 cascading if the model is Type 2) or a non-structural change (note as cosmetic).

### Sub-Agent Delegation

For PRs with many breaking changes, delegate investigation to sub-agents in parallel batches:

- <= 10 breaking changes: single sub-agent
- 11--20: split into 2 batches
- \> 20: split into batches of 5--8

Each sub-agent receives: the list of CHANGELOG entries to investigate, paths to all four layers (A/B/C/D), and the old/new api.md content. Each sub-agent returns:

```
- Entry: "<CHANGELOG text>"
  Classification: Type 1 / Type 2a / Type 2b (may have multiple)
  Root Cause: "<description in plain language>"
  Evidence: "<what was compared and what differed>"
```

After sub-agents return, review for consistency and link cascading entries.

---

## Phase 4: Pattern Matching

After root cause classification is complete, match Type 2 entries against architect-approved patterns. Type 1 entries (API version upgrades) are not covered by the patterns file.

- For each Type 2 root cause, compare against the patterns in [mgmt-breaking-change-patterns.md](mgmt-breaking-change-patterns.md)
- Track pattern matches **internally only** -- pattern numbers are implementation details, never surface them in the report
- For each Type 2 entry, determine one of:
  - **Matches an approved pattern** -> pre-fill Accepted with `:white_check_mark:` (describe the pattern in plain language in the root cause, e.g., "Options interface renamed from XxxOptionalParams to XxxOptions")
  - **No match in approved patterns** -> leave Accepted empty for user review
- For Accepted column rules, see the Type 2 section in the Report Template below

Do NOT consult patterns before completing independent investigation in Phase 3.

---

## Phase 5: Self-Review Checklist (Mandatory)

Before building the report, the agent MUST execute this self-review checklist. **If any check fails, go back and fix the classification before proceeding.**

### Check 1: No Cosmetic Descriptions as Root Causes

For every entry, verify the root cause is a **structural cause**, not a cosmetic observation:

- [ ] Does any entry use one of these as its root cause? If yes, it is **INVALID** -- these are never root causes:
  - "function to arrow property" / "method syntax change"
  - "response wrapper removal" / "response type alias removed"
  - "options interface renamed"
- [ ] Does every root cause explain **what structurally changed** (e.g., which model property was removed/changed, which discriminator type changed, which parameter was added/removed)?

### Check 2: Cascade Completeness

For every "new signature" entry marked as "no structural cause found":

- [ ] Did I resolve all response type aliases to their underlying models?
- [ ] Did I walk nested type references (up to depth 3) checking against `broken_models`?
- [ ] Did I explicitly record what cascade chain was checked and found clean?

---

## Phase 6: Verify Counts and Build Report

Before building the report, verify:
- All CHANGELOG entries are accounted for (Type 1 count + Type 2 count = total)
- One root cause can explain multiple entries -- use `Same as row N` references for repeated causes

The analysis report should be shown as a **brief summary** by default (totals, key root cause groups, items needing review), then ask the user how they want the full report (save as markdown, post as PR comment, or skip). If the user already specified an output action upfront, do that directly without showing a summary first.

### Posting PR Comments

**CRITICAL: Never read-modify-write comment bodies.** Always write from scratch to a UTF-8 temp file:

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
- Avoid non-ASCII chars (`--` instead of an em-dash, `->` instead of the Unicode arrow `→`)
- **Never use `#N` to reference other rows** (GitHub renders `#N` as issue/PR links). Use `row N` instead (e.g., `Same as row 1`, `Cascading from row 3`)

---

## Report Template

### Report Header (always included)

Every report MUST begin with this AI disclaimer before anything else:

```markdown
> [!NOTE]
> This analysis was generated by AI. Please review the classifications and root causes for accuracy.
```

**Single-service package:**

```markdown
## Breaking Change Analysis: PACKAGE_NAME VERSION

| | Old SDK (main) | New SDK (PR) |
|---|---|---|
| **Generator** | Swagger / AutoRest | TypeSpec / emitter |
| **API Version** | OLD_VERSION | NEW_VERSION |
| **Package Version** | OLD_PKG_VER | NEW_PKG_VER |

**Spec References:**
- Original Swagger (Layer A): [Databases.json @ `LAYER_A_COMMIT`](https://github.com/Azure/azure-rest-api-specs/blob/LAYER_A_COMMIT/PATH_TO_FILE) *(if single API version)*
- TypeSpec config: [tspconfig.yaml @ `SPEC_COMMIT`](https://github.com/Azure/azure-rest-api-specs/blob/SPEC_COMMIT/PATH_TO_TSPCONFIG)
- Generated Swagger (Layer C): [openapi.json @ `SPEC_COMMIT`](https://github.com/Azure/azure-rest-api-specs/blob/SPEC_COMMIT/PATH_TO_OPENAPI)
```

**Multi-service package:** Replace the single API Version row with a per-service version table:

```markdown
## Breaking Change Analysis: PACKAGE_NAME VERSION

| | Old SDK (main) | New SDK (PR) |
|---|---|---|
| **Generator** | Swagger / AutoRest | TypeSpec / emitter |
| **Package Version** | OLD_PKG_VER | NEW_PKG_VER |

**API Versions by Service:**

| Service | Old API Version | New API Version | Status |
|---|---|---|---|
| Compute | 2025-04-01 | 2025-04-01 | Same |
| Disk | 2025-01-02 | 2025-01-02 | Same |
| Gallery | 2024-03-03 | 2025-03-03 | Upgraded |
| Sku | 2021-07-01 | 2021-07-01 | Same |
| CloudService | 2024-11-04 | *(removed)* | Removed from TypeSpec scope |

**Spec References:**
- Original Swagger (Layer A): ...
- TypeSpec config: [tspconfig.yaml @ `SPEC_COMMIT`](...)
- Generated Swagger (Layer C): ...
```

If Layer A has multiple API versions, replace the single-line Layer A link with a collapsible list:

```markdown
<details><summary>Original Swagger (Layer A) -- N files across M API versions @ <code>LAYER_A_COMMIT</code></summary>

**2022-08-01-preview:**
- [Databases.json](https://github.com/Azure/azure-rest-api-specs/blob/LAYER_A_COMMIT/specification/.../2022-08-01-preview/Databases.json)
- [Servers.json](https://github.com/Azure/azure-rest-api-specs/blob/LAYER_A_COMMIT/specification/.../2022-08-01-preview/Servers.json)

**2014-04-01:**
- [Metrics.json](https://github.com/Azure/azure-rest-api-specs/blob/LAYER_A_COMMIT/specification/.../2014-04-01/Metrics.json)

</details>
```

### Type 1: API Version Upgrade

Omit this entire section if all services have identical old and new API versions (pure TypeSpec migration, no API version change).

For multi-service packages, only include breakings from services that had a version upgrade. Note the service name in the root cause.

One row per CHANGELOG entry. No `Accepted` column (these are expected changes from the API version jump).

```markdown
### Type 1: API Version Upgrade (OLD_VERSION -> NEW_VERSION) -- N items

| # | Breaking Change | Root Cause |
|---|---|---|
| 1 | `Removed operation Databases.listMetrics` | Metrics APIs (2014-04-01) deprecated; not in 2025-02-01-preview. |
| 2 | `Removed operation Databases.listMetricDefinitions` | Same as row 1. |
| 3 | `Interface DistributedAvailabilityGroup no longer has parameter sourceEndpoint` | Schema restructured in 2025-02-01-preview: flat properties replaced with nested `databases` array. |
| 4 | `Interface DistributedAvailabilityGroup no longer has parameter linkState` | Same as row 3. |
| 5 | `Operation DistributedAvailabilityGroups.get has a new signature` | Cascading from row 3: return type `DistributedAvailabilityGroup` lost properties, changing the operation signature. |
```

Root Cause column rules:
- **First occurrence** of a unique cause: write a descriptive explanation (what changed and why)
- **Repeated cause**: write `Same as row N.` referencing the first occurrence
- **Cascading entries**: write `Cascading from row N: <brief explanation>` linking to the upstream entry
- **Multi-cause "new signature" entries**: list all causes numbered, e.g., "(1) ... (2) ...". Each cause may be independent or cascading.
- If a "new signature" entry has causes spanning both Type 1 and Type 2, place it in the table of the primary cause and note the secondary cause (e.g., "Also has Type 2b cause: emitter unwraps return type.")
- Keep root causes in **plain language** -- no internal pattern codes or numbers.

### Type 2: TypeSpec / Emitter Migration

Type 2 uses two sections: a **summary table** (one row per unique root cause, grouping items with the same cause) and a **detailed list** (one entry per CHANGELOG item with full root cause explanation).

**Accepted column rules:**
- Pre-fill with `:white_check_mark:` **only** when the root cause **exactly matches** an approved pattern in [mgmt-breaking-change-patterns.md](mgmt-breaking-change-patterns.md). The match must be specific -- the pattern must explicitly cover the type of breaking being reported.
- If the root cause is NOT explicitly listed in the patterns file, leave **empty** for the user to review. Do NOT infer approval from similar or related patterns (e.g., the pattern for client *options property* changes does not cover deletion of the entire client class).
- **No pattern numbers in the report.** Pattern numbers are internal tracking details. Always use plain-language descriptions (e.g., "Options interface renamed from XxxOptionalParams to XxxOptions", not "Pattern 5").

#### Summary Table

Groups items by root cause. For items sharing the same root cause, show only one representative row with a count.

```markdown
### Type 2: TypeSpec / Emitter Migration -- M items

| Root Cause | Sub-Type | Count | Accepted |
|---|---|---|---|
| Options interface renamed from `XxxOptionalParams` to `XxxOptions` | Emitter | 12 | :white_check_mark: |
| Response wrapper types removed; Modular returns raw model directly | Emitter | 8 | :white_check_mark: |
| Collection wrapper types inlined by TypeSpec pagination | Conversion | 3 | :white_check_mark: |
| Discriminator inline union changed to named string type | Emitter | 2 | :white_check_mark: |
| Required in swagger but TypeSpec models as optional | Conversion | 1 | |
```

#### Detailed List

One entry per CHANGELOG item. **Every individual entry must be listed** -- do not group entries into summary counts like "Model aliases (~69 entries)" without listing them. Use collapsible `<details>` sections to manage length when a single root cause group has more than 10 entries, but still list each entry inside the collapsed section.

```markdown
#### Details

1. `Removed Interface SecurityEventCollection` -- Conversion :white_check_mark:
   > Collection wrapper type inlined by TypeSpec pagination. Modular returns `PagedAsyncIterableIterator<T>` directly.

2. `Removed Interface DatabaseAdvisorsGetOptionalParams` -- Emitter :white_check_mark:
   > Options interface renamed from `XxxOptionalParams` to `XxxOptions` by TypeSpec emitter.

3. `Removed Interface DatabaseAdvisorsGetResponse` -- Emitter :white_check_mark:
   > Response wrapper removed. HLC generated `XxxResponse` types with headers; Modular returns the raw model directly.

4. `Type of parameter type of interface AzureResourcePropertiesBase is changed from "KeyVault" | "AppConfig" to AzureResourceType` -- Emitter :white_check_mark:
   > HLC generated inline literal union for discriminator; Modular generates named string type.

5. `Parameter state of interface GeoBackupPolicy is now optional` -- Conversion
   > Required in both old and new swagger, but TypeSpec models it as optional.

6. `Operation DistributedAvailabilityGroups.get has a new signature` -- Conversion
   > Cascading from row 5: return type contains `GeoBackupPolicy` (via `DistributedAvailabilityGroup.geoBackupPolicy`), and `GeoBackupPolicy.state` optionality changed.
```

Format rules for the detailed list:
- Summary line: `` `CHANGELOG text` -- Sub-Type [:white_check_mark:]``
- Root cause in blockquote: `> explanation`
- **Repeated cause**: `> Same as row N.`
- **Cascading**: `> Cascading from row N: brief explanation.`
- **Multi-cause**: `> (1) first cause. (2) second cause.`
- Keep root causes in **plain language** -- no internal pattern codes (e.g., never write "Pattern 7" or "approved pattern 5" in the report)

Sub-Type values:
- **Conversion** (Type 2a): Original swagger differs from TypeSpec-generated swagger at the same API version
- **Emitter** (Type 2b): Swagger is identical, but TypeSpec emitter generates different TypeScript code than AutoRest

### Footer

```markdown
**Total: N (Type 1: API Version Upgrade) + M (Type 2: TypeSpec/Emitter Migration) = T breaking changes**

Type 2 breakdown: X items from TypeSpec conversion, Y items from emitter differences.
```

If all services have identical API versions and no services were added/removed (no Type 1), simplify to:

```markdown
**Total: M (Type 2: TypeSpec/Emitter Migration) breaking changes**

Type 2 breakdown: X items from TypeSpec conversion, Y items from emitter differences.
```

### Open Questions Section (optional, before Footer or after detailed list)

Include this section when the analysis has:
- **Unresolved root causes**: breakings that could not be traced to a clear root cause after investigating all layers
- **Novel findings**: unexpected discoveries (e.g., services added/removed between versions, swagger operations that don't match the readme tag, API version mismatches)
- **Assumptions made**: any inference the agent made to proceed (e.g., mapping swagger file to TypeSpec service by name)

Format as a numbered list with context on what was investigated and what remains unknown. This helps reviewers focus their attention on items that need human judgment.

**Formatting**: Use a blockquote with a **Note** or **Warning** prefix in the relevant group's root cause section for localized uncertainties. Use this dedicated "Open Questions" section (placed before the Footer) for cross-cutting uncertainties that span multiple entries or groups.

### Methodology Section (optional, at end of report)

Include a brief explanation of the four-layer comparison methodology and the spec layer commits used, so readers understand how the classification was derived.

---

## Tips

1. **Start with api.md diffs** -- understand what actually changed in the SDK first, then trace into swagger/TypeSpec layers for classification.
2. **Check `back-compatible.tsp`** for `@@Legacy.flattenProperty` and compatibility decorators.
3. **Check `client.tsp`** for `@clientName` decorators that may rename types.
4. **Compare old CHANGELOG** -- if a change appears in BOTH old and new CHANGELOGs, it's likely Type 1.
5. **Signature changes need root cause tracing** -- `XxxResponse -> Model` is not the real breaking. Find the inner model/discriminator change.
6. **Check TypeSpec version decorators** (`@removed`, `@added`) to distinguish Type 1 from Type 2.
