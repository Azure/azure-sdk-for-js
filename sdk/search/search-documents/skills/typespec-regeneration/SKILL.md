---
name: typespec-regeneration
description: >
  Regenerate the @azure/search-documents SDK from TypeSpec specs. Use when
  updating the spec commit SHA, regenerating code, fixing post-regeneration
  compilation errors, understanding the customization merge flow, or writing
  tests with the test recorder.
metadata:
  author: azure-sdk
  version: "1.0"
  package: "@azure/search-documents"
compatibility: >
  Requires Node.js 20+, pnpm, TypeSpec CLI (tsp-client). Must be run inside
  the azure-sdk-for-js monorepo with dependencies installed.
---

# @azure/search-documents — TypeSpec Regeneration Skill

## When To Use This Skill

- Updating `tsp-location.yaml` to a new TypeSpec spec commit
- Running `npm run generate:client` to regenerate generated code
- Fixing compilation errors after regeneration
- Understanding or modifying the type conversion layer (`serviceUtils.ts`)
- Writing or updating tests using `@azure-tools/test-recorder`
- Adding new API operations or types from a new spec version
- Resolving merge conflicts after the customization apply step

## Architecture Overview

This package has a **two-directory architecture** with a customization merge:

```
tsp-location.yaml                      ← Points to TypeSpec spec (repo, commit, directory)
        │
  npm run generate:client               ← Runs 3 steps in sequence
        │
        ├─ tsp-client update ──→ generated/    (auto-generated, NEVER hand-edit)
        ├─ npm run format
        └─ dev-tool customization apply-v2 --skip index.ts
                                    │
                                    ▼
                                  src/             (generated + hand-authored)
                                    │
         ┌──────────────────────────┤
         │                          │
  Generated code             Hand-authored code
  (merged from generated/)   (preserved across regeneration)
  ├── models/                ├── searchClient.ts          ← Convenience wrapper
  ├── search/                ├── searchIndexClient.ts     ← Convenience wrapper
  ├── searchIndex/           ├── searchIndexerClient.ts   ← Convenience wrapper
  ├── searchIndexer/         ├── knowledgeRetrievalClient.ts
  ├── knowledgeBaseRetrieval/├── serviceUtils.ts          ← Type conversions (200+)
  └── static-helpers/        ├── serviceModels.ts         ← User-facing types
                             ├── indexModels.ts           ← Search/suggest types
                             ├── serialization.ts         ← NaN/Date/GeoPoint
                             ├── index.ts                 ← Barrel export (--skip'd)
                             └── ... (20+ more files)
```

**Key rules:**

1. **Never hand-edit `generated/`** — overwritten on every regeneration
2. **`src/index.ts` is `--skip`'d** — new exports must be manually added
3. **Always commit before regenerating** — the 3-way merge needs committed state
4. **Use `@azure-rest/core-client`** — NOT `@azure/core-client` (TypeSpec uses REST variant)
5. **Build with turbo** — `pnpm turbo build --filter=@azure/search-documents... --token 1`
6. **Treat generated-mirrored code as unstable** - many files in `src/` are copied from `generated/` during customization with minimal merging.

- Do not make direct edits to mirrored generated code unless absolutely necessary; those edits can be overwritten on the next regeneration.
- Prefer extension points first:
  - Add helper logic in `serviceUtils.ts`, then call it from the convenience client.
  - Add custom public models in `serviceModels.ts`, and map to/from generated models in `serviceUtils.ts`.
- Use customization changes only as a last resort when helper/model mapping cannot solve the problem.

## Regeneration Procedure

### Step 1: Update spec pointer

Edit `tsp-location.yaml`:

```yaml
directory: specification/search/data-plane/Search/
commit: <NEW_COMMIT_SHA>
repo: Azure/azure-rest-api-specs
```

### Step 2: Regenerate

```bash
npm run generate:client
```

This runs:

1. `tsp-client update -d --emitter-options="ignore-nullable-on-optional=true"` — generates into `generated/`
2. `npm run format` — formats generated code with Prettier
3. `npx dev-tool customization apply-v2 --skip index.ts` — 3-way merges `generated/` into `src/`

### Step 3: Check for merge conflicts

```bash
grep -r "<<<<<<" src/ --include="*.ts"
```

Resolve any conflicts. See [references/customization.md](references/customization.md) for the merge algorithm.

### Step 4: Build

```bash
pnpm turbo build --filter=@azure/search-documents... --token 1
```

Fix compilation errors. See [references/troubleshooting.md](references/troubleshooting.md) for common fixes.

### Step 5: Test

```bash
npm run test:node
```

Re-record if needed: `TEST_MODE=record npm run test:node`. See [references/testing.md](references/testing.md).

### Step 6: Finalize

```bash
npm run extract-api    # Update API surface reports in review/
npm run format         # Ensure consistent formatting
```

## The Four Clients

| Client                     | Constructor                                           | Wraps Generated                                              |
| -------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `SearchClient<TModel>`     | `(endpoint, indexName, credential, options?)`         | `src/search/searchClient.ts`                                 |
| `SearchIndexClient`        | `(endpoint, credential, options?)`                    | `src/searchIndex/searchIndexClient.ts`                       |
| `SearchIndexerClient`      | `(endpoint, credential, options?)`                    | `src/searchIndexer/searchIndexerClient.ts`                   |
| `KnowledgeRetrievalClient` | `(endpoint, knowledgeBaseName, credential, options?)` | `src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.ts` |

Each follows the same pattern:

```typescript
export class FooClient {
  private readonly client: GeneratedFooClient;

  constructor(endpoint, credential, options?) {
    this.client = new GeneratedFooClient(endpoint, credential, pipelineOptions);
    // Replace default auth with Search-specific auth (API key or bearer token)
    // Add OData metadata policy
  }

  public async someOperation(args, options = {}) {
    return tracingClient.withSpan("FooClient-someOperation", options, async (opts) => {
      const generated = utils.publicToGenerated(args); // Convert user → generated
      const raw = await this.client.operation(generated, opts); // Call generated
      return utils.generatedToPublic(raw); // Convert generated → user
    });
  }
}
```

## Critical Data Flow Patterns

### The additionalProperties Unwrapping

TypeSpec puts user document fields in `additionalProperties`. The convenience layer unwraps:

```
Generated: { score, additionalProperties: { hotelName, rating, ... } }
     ↓ generatedSearchResultToPublicSearchResult()
Public:    { score, document: { hotelName, rating, ... } }
```

Affects: `search()`, `suggest()`, `autocomplete()`, `getDocument()`, `indexDocuments()`

### The Serialization Sandwich

```
User input → serialize(NaN→"NaN", Date→ISO, Geo→GeoJSON) → generated API → deserialize() → User output
```

### SearchClient Option Conversions (in searchClient.ts, not serviceUtils.ts)

| User Option              | Conversion                      | Wire Format                                   |
| ------------------------ | ------------------------------- | --------------------------------------------- |
| `searchFields: string[]` | `join(",")`                     | comma-separated string                        |
| `select: string[]`       | `join(",")` or `"*"`            | comma-separated string                        |
| `orderBy: string[]`      | `join(",")`                     | comma-separated string                        |
| `vectorQueries`          | `convertVectorQuery()`          | `VectorQueryUnion[]`                          |
| `queryAnswers`           | `convertQueryAnswers()`         | `"type\|count-X,threshold-Y,maxcharlength-Z"` |
| `queryCaptions`          | `convertQueryCaptions()`        | `"type\|highlight-true,maxcharlength-Z"`      |
| `queryRewrites`          | `convertQueryRewrites()`        | `"generative\|count-X"`                       |
| continuation token       | `encode(JSON.stringify({...}))` | Base64 string                                 |

## Detailed References

- [references/architecture.md](references/architecture.md) — Complete directory structure and file inventory
- [references/customization.md](references/customization.md) — The 3-way merge algorithm
- [references/testing.md](references/testing.md) — Test recorder setup, writing tests
- [references/type-mapping.md](references/type-mapping.md) — All property/type name changes and conversion functions
- [references/troubleshooting.md](references/troubleshooting.md) — Common errors and fixes

## Self-Improvement

After completing any task using this skill, update the skill itself based on what you learned:

1. **Reflect on friction**: Identify moments where the skill's instructions were incomplete, ambiguous, or led to unnecessary iteration (e.g., fixing errors one at a time that could have been caught in bulk).

2. **Propose and apply updates**: For each friction point, edit the relevant skill file (SKILL.md or references/\*.md) directly. Additions should be:
   - **Actionable** — include commands to run, not just descriptions
   - **Specific** — to this package and its idiosyncrasies, not generic advice
   - **Positioned** — in the file where a future agent would need them, at the point in the workflow where the friction occurred

3. **Bump version**: Update the `version` in SKILL.md metadata when making substantive changes.

4. **Scope**: Only update based on scenarios you actually encountered. Don't speculatively add content for hypothetical situations.

**Examples of good skill updates:**

- Adding a new error pattern to `references/troubleshooting.md` that was encountered and resolved
- Adding a bulk-operation command to avoid iterative fix cycles
- Correcting a procedure step that turned out to be wrong or incomplete
- Adding a new file to the architecture reference when the generated structure changes
- Adding a script to `scripts/` that automates a repetitive manual step
