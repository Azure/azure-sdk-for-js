# Contributing to @azure/planetarycomputer

This guide covers the manual steps required after regenerating the SDK from TypeSpec, how to validate changes locally before pushing to CI, and key TypeSpec authoring patterns that affect the generated JavaScript SDK.

For general Azure SDK for JS contribution guidance, see the [top-level CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Regenerating the SDK from TypeSpec](#regenerating-the-sdk-from-typespec)
- [Known Manual Fixes on Generated Code](#known-manual-fixes-on-generated-code)
- [TypeSpec Authoring Patterns and Their SDK Impact](#typespec-authoring-patterns-and-their-sdk-impact)
- [Version Compatibility Matrix](#version-compatibility-matrix)
- [Local Validation](#local-validation)
- [Testing](#testing)
- [Quick-Reference Checklist](#quick-reference-checklist)

---

## Prerequisites

- Node.js LTS (>= 20.x)
- pnpm (>= 10.x) — enforced by the repo's `preinstall` script
- Access to the [azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs) repository (or your fork)

---

## Regenerating the SDK from TypeSpec

### 1. Update `tsp-location.yaml`

Edit `tsp-location.yaml` to point to the desired spec commit and directory:

```yaml
directory: specification/orbital/Microsoft.PlanetaryComputer
commit: <new-commit-sha>
repo: Azure/azure-rest-api-specs
additionalDirectories:
```

> **Important:** The `commit` must be a full SHA from the spec repo, and the spec at that commit must compile cleanly. If you are working from a fork, set `repo: <owner>/azure-rest-api-specs`.

### 2. Run code generation

From the package root (`sdk/planetarycomputer/planetarycomputer`):

```bash
npx tsp-client update
```

`tsp-client` will:
1. Sparse-checkout the spec repo at the specified commit
2. Resolve the emitter version from the SDK repo's emitter configuration
3. Install dependencies and compile the TypeSpec with `@azure-tools/typespec-ts`
4. Write generated files into `src/`

> **Troubleshooting:** If `tsp-client update` fails with `No main.tsp or client.tsp found`, ensure the `directory` field in `tsp-location.yaml` points to the folder containing `main.tsp`, not a parent directory.

> **Troubleshooting:** If compilation fails with `Namespace Azure.Core doesn't have member Versions`, there is a version mismatch between the spec's `@useDependency(Azure.Core.Versions.v1_0_Preview_2)` and the installed `@azure-tools/typespec-azure-core`. The `Azure.Core.Versions` enum was removed in `typespec-azure-core@0.64.0`. See the [Version Compatibility Matrix](#version-compatibility-matrix) section.

### 3. Apply manual modifications

Apply the fixes documented in the [Known Manual Fixes](#known-manual-fixes-on-generated-code) section below. These must be re-applied after **every** regeneration.

### 4. Format, lint, and build

```bash
pnpm run format
pnpm run lint:fix
pnpm run build
```

> **Important:** Always use `pnpm turbo build --filter=@azure/planetarycomputer... --token 1` from the repo root if dependencies have not been built yet. The trailing `...` builds the package AND all its workspace dependencies.

### 5. Review API changes

After building, API review files are regenerated in `review/`. Inspect the diff:

```bash
git diff review/
```

These `.api.md` files are the authoritative record of the public API surface. API reviewers use them to approve changes.

> **Important:** If the `review/` files have formatting-only diffs (e.g., `import` → `import type`), run `pnpm run format` again **after** building. The build may regenerate review files that don't match the repo's Prettier config, and CI's "Check api extractor output changes" step will fail if the committed files differ from what a clean `build` + `format` produces.

### 6. Run tests

```bash
pnpm test
```

See the [Testing](#testing) section for details on playback, recording, and live modes.

---

## Known Manual Fixes on Generated Code

The following manual changes must be applied to generated code after each regeneration. These are caused by emitter bugs or TypeSpec modeling limitations.

### Fix 1: FormData Circular Type Reference

**File:** `src/models.ts`

**Problem:** The emitter generates a `FormData` type alias that references itself, creating a circular reference that fails TypeScript compilation with `error TS2456: Type alias 'FormData' circularly references itself`.

**Generated (broken):**
```typescript
export type FormData =
  | FormData
  | Array<FormDataDataPartDescriptor | FormDataFilePartDescriptor>;
```

**Fix:** Qualify the self-reference with `globalThis.` to reference the built-in browser/Node.js `FormData`:

```typescript
export type FormData =
  | globalThis.FormData
  | Array<FormDataDataPartDescriptor | FormDataFilePartDescriptor>;
```

**Root Cause:** The emitter creates a type alias with the same name as the global `FormData` Web API type. When the union includes `FormData`, TypeScript resolves it as a self-reference rather than the global type. This is an emitter bug — it should emit `globalThis.FormData` when referencing built-in types that shadow the generated alias name.

### Fix 2: WMTS XML Deserialization (Base64 Decoding)

**File:** `src/api/data/operations.ts`

**Problem:** The emitter generates code that incorrectly treats WMTS capabilities XML responses as base64-encoded bytes. The WMTS endpoints return **plain XML text** with `contentType: "application/xml"`, but the TypeSpec model uses `@body body: bytes`, which causes the emitter to generate `stringToUint8Array(result.body, "base64")`.

**Fix:** Replace the generated base64 decoding with direct UTF-8 encoding in **both** WMTS deserializer functions:

#### `_getMosaicsWmtsCapabilitiesDeserialize` and `_getWmtsCapabilitiesDeserialize`

Find all instances of:
```typescript
return typeof result.body === "string"
  ? stringToUint8Array(result.body, "base64")
  : result.body;
```

Replace each with:
```typescript
// WMTS capabilities returns XML text, not base64-encoded bytes.
// Convert the XML string directly to UTF-8 bytes.
return typeof result.body === "string" ? new TextEncoder().encode(result.body) : result.body;
```

After applying this fix, the `stringToUint8Array` import from `@azure/core-util` may become unused. If so, remove it:

```typescript
// Remove this line if no longer used:
import { stringToUint8Array } from "@azure/core-util";
```

**TypeSpec Root Cause:** The WMTS response model is defined as:

```typespec
model WmtsCapabilitiesXmlResponse {
  @header contentType: "application/xml";
  @body body: bytes;
}
```

The `bytes` type causes the JS emitter to generate base64 decoding logic. A proper fix would change the TypeSpec to use `string` instead of `bytes`, or use a custom scalar type that the emitter can handle correctly.

### Fix 3: Useless Escape Character in `urlTemplate.ts`

**File:** `src/static-helpers/urlTemplate.ts`

**Problem:** The emitter generates a regex with an unnecessary escape `\-` inside a character class. ESLint flags this as `no-useless-escape` and `pnpm lint --fix` **cannot auto-fix it** — it must be corrected manually.

**Generated (lint error):**
```typescript
if (/[\-.~]/.test(char)) {
```

**Fix:** Remove the backslash before the hyphen. Inside a character class, a hyphen at the **start** position is treated as a literal and does not need escaping:

```typescript
if (/[-.~]/.test(char)) {
```

**Root Cause:** The emitter's static helper for URL template expansion includes a regex that normalizes percent-encoded unreserved characters. The `\-` escape is valid but redundant — ESLint's `no-useless-escape` rule correctly identifies it. Since `static-helpers/` files are fully generated, this must be re-applied after every regeneration.

---

## TypeSpec Authoring Patterns and Their SDK Impact

Understanding how TypeSpec decorators map to generated SDK code prevents common issues and allows deliberate API design choices. The JavaScript SDK is generated by `@azure-tools/typespec-ts`, which uses TCGC (TypeSpec Client Generator Core) to resolve method signatures.

### `@body` vs `@bodyRoot` vs spread (`...Model`)

These three patterns produce **different** method signatures in the generated SDK:

#### `@body body: Foo` — Explicit opaque body

```typespec
@post op create(@body body: SearchPostRequest): Response;
```

**Generated SDK:**
```typescript
function search(context: Client, body: StacSearchParameters, options?: SearchOptionalParams): Promise<Response>
```

- The entire model becomes a **single required parameter** named `body`
- The parameter name comes from the TypeSpec property name (`body`)
- Metadata decorators (`@header`, `@query`) *inside* the model are **ignored** (warnings emitted)
- The `options` bag only contains non-body parameters (e.g., query params declared outside the model)

> **Caveat:** The parameter is named whatever you name the TypeSpec property. `@body body: Foo` produces a parameter called `body`, which can feel unnatural at the call site. Rename the property to a more descriptive name (e.g., `@body searchRequest: Foo`) to improve ergonomics.

#### `@bodyRoot body: Foo` — Body with metadata extraction

```typespec
@post op create(@bodyRoot body: SearchPostRequest): Response;
```

**Generated SDK:** Identical to `@body` for the TCGC-based emitter — still produces a single `body` parameter. The only difference is that `@header`/`@query` decorators inside the model are honored rather than warned about. For models without metadata decorators (like `SearchPostRequest`), `@body` and `@bodyRoot` produce **identical output**.

#### `...Model` (spread) — Properties become individual parameters or options

```typespec
@post
create is Azure.Core.Foundations.Operation<
  { ...SearchPostRequest; },
  ItemCollection | NoContentResponse
>;
```

**Generated SDK:**
```typescript
function create(context: Client, options?: CreateOptionalParams): Promise<ItemCollection>

interface CreateOptionalParams extends OperationOptions {
  collections?: string[];
  ids?: string[];
  bbox?: number[];
  intersects?: GeoJson;
  datetime?: string;
  limit?: number;
  // ... all properties from SearchPostRequest
}
```

- **Required** model properties become positional method parameters
- **Optional** model properties are flattened into the `options` bag
- If **all** properties are optional (like `SearchPostRequest`), the method has only the `options` parameter — no separate body argument
- The body is assembled inline from `options.*` properties in the generated `_createSend` function
- The `StacSearchParameters` model type is **not** exposed as a standalone concept

> **When to use spread:** Use `...Model` when the model has all-optional properties (like search filters) and you want callers to pass them as named options rather than constructing a model object.

> **When to use `@body`:** Use `@body property: Model` when the model has required properties or when you want to preserve the model as a typed object in the SDK.

### `@body body: bytes` — Binary response bodies

```typespec
model XmlResponse {
  @header contentType: "application/xml";
  @body body: bytes;
}
```

The `bytes` type causes the JS emitter to generate `stringToUint8Array(result.body, "base64")`. This is correct for actual binary data (images, protobuf) but **wrong** for text-based formats like XML. If the response body is text, either:

1. Use `string` instead of `bytes` in the TypeSpec, or
2. Apply the manual deserialization fix documented in [Fix 2](#fix-2-wmts-xml-deserialization-base64-decoding)

### Type aliases that shadow globals

If a TypeSpec model or alias produces a TypeScript type with the same name as a global type (e.g., `FormData`, `Blob`, `File`, `URL`, `Request`, `Response`), the emitter may generate a self-referencing type. Check for `error TS2456` after regeneration and prefix the self-reference with `globalThis.`. See [Fix 1](#fix-1-formdata-circular-type-reference).

---

## Version Compatibility Matrix

The TypeSpec spec, the emitter, and the compiler must all be version-compatible. A mismatch causes compilation errors.

| Component | Location | How it's determined |
|---|---|---|
| TypeSpec compiler | `TempTypeSpecFiles/package.json` | Resolved from the emitter's peer dependencies |
| `@azure-tools/typespec-ts` (JS emitter) | SDK repo emitter configuration | Set at the SDK repo level |
| `@azure-tools/typespec-azure-core` | `TempTypeSpecFiles/package.json` | Resolved from the emitter's peer dependencies |
| Spec's `@useDependency` references | `models.common.versions.tsp` | Authored in the spec |

**Known breaking change:** `Azure.Core.Versions` (the enum used with `@useDependency`) was **removed** in `@azure-tools/typespec-azure-core@0.64.0`. Specs authored for `0.59.0` or earlier that reference `Azure.Core.Versions.v1_0_Preview_2` will fail to compile with `0.64.0+`.

| Spec azure-core version | Compatible emitter versions | Compiler |
|---|---|---|
| `0.59.0` | `@azure-tools/typespec-ts@0.43.x` | `@typespec/compiler@1.3.0` |
| `0.60.0` | `@azure-tools/typespec-ts@0.44.x` | `@typespec/compiler@1.4.0` |
| `0.64.0` | `@azure-tools/typespec-ts@0.49.x` | `@typespec/compiler@1.8.0` |

If you encounter version-mismatch errors during `tsp-client update`, either:
1. Update the spec to use the newer azure-core version (coordinate with the spec team), or
2. Pin the emitter version to match the spec's azure-core range

---

## Local Validation

Run the following checks **from the package root** (`sdk/planetarycomputer/planetarycomputer`) before pushing. These mirror what CI runs.

### Formatting (Prettier)

```bash
pnpm run format          # auto-fix
pnpm run check-format    # check only (CI uses this)
```

### Linting (ESLint)

```bash
pnpm run lint            # check
pnpm run lint:fix        # auto-fix
```

### Build

From the repo root:

```bash
pnpm turbo build --filter=@azure/planetarycomputer... --token 1
```

Or from the package root (only if dependencies are already built):

```bash
pnpm run build
```

The `build` script runs `clean`, `build-package` (via tshy), and `extract-api` (via API Extractor). A successful build:
- Produces `dist/` with CommonJS and ESM outputs
- Regenerates `review/*.api.md` files
- Exits with code 0

### API Review

After building, check the API review diff:

```bash
git diff review/
```

Key files:
- `review/planetarycomputer-node.api.md` — merged public API
- `review/planetarycomputer-api-stac-node.api.md` — STAC operations API
- `review/planetarycomputer-models-node.api.md` — model types

---

## Testing

This package uses the [Azure SDK test recorder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder) with recorded HTTP sessions stored in the [azure-sdk-assets](https://github.com/Azure/azure-sdk-assets) repo.

### Environment setup

Copy `sample.env` to `.env` and fill in your values:

```bash
cp sample.env .env
```

Required variables:

| Variable | Description |
|---|---|
| `PLANETARYCOMPUTER_ENDPOINT` | GeoCatalog endpoint URI |
| `PLANETARYCOMPUTER_COLLECTION_ID` | STAC collection ID for tests |
| `PLANETARYCOMPUTER_ITEM_ID` | STAC item ID for tests |

Optional (for ingestion tests): `PLANETARYCOMPUTER_INGESTION_CONTAINER_URI`, `PLANETARYCOMPUTER_INGESTION_CATALOG_URL`, `PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID`, `PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI`, `PLANETARYCOMPUTER_INGESTION_SAS_TOKEN`

### Running tests

```bash
# Playback mode (default — no live resources needed)
pnpm test

# Record mode (runs against live resources, captures HTTP traffic)
$env:TEST_MODE="record"   # PowerShell
export TEST_MODE=record    # Bash
pnpm test

# Live mode (no recording, direct live calls)
$env:TEST_MODE="live"
pnpm test
```

### Running a specific test by name

Use the `-t` flag to filter by test name. The syntax for passing flags through `pnpm` differs by shell:

```bash
# Bash / Zsh — single --
pnpm test -- -t "gets a collection"

# PowerShell — double -- (pnpm swallows the first --)
pnpm test -- -- -t "gets a collection"
```

If your test filter seems to be ignored and all tests run, you are likely missing the extra `--` that PowerShell requires.

### Test file structure

| File | Description |
|---|---|
| `00_collections.spec.ts` | STAC collection CRUD, thumbnail assets, metadata |
| `01_ingestion.spec.ts` | Ingestion source and run operations |
| `02_stacSpecification.spec.ts` | STAC API spec compliance (conformance, queryables) |
| `03_sharedAccessSignature.spec.ts` | SAS token operations |
| `04_stacItemTiler.spec.ts` | Tile rendering for individual STAC items |
| `05_mosaicsTiler.spec.ts` | Mosaic tile rendering and static images |
| `06_mapLegends.spec.ts` | Map legend generation |
| `07_collectionLifecycle.spec.ts` | Full collection create/replace/delete lifecycle |

### Managing recordings

```bash
# Restore recordings (first time / after assets.json changes)
npx dev-tool test-proxy restore

# Push new recordings after re-recording
npx dev-tool test-proxy push
```

> **Important:** Commit the updated `assets.json` alongside your code changes so CI can find the correct recordings.

### Key testing tips

- **Test ordering matters.** Tests within each file are numbered and run in order. Do not reorder or skip tests.
- **`snippets.spec.ts` is NOT a real test file.** It contains source code for documentation snippets. Do not modify it as part of test updates.
- After changing the TypeSpec in ways that rename or remove operations, update the test file API calls but **do not rename test methods** — the method names determine recording file paths.

---

## Quick-Reference Checklist

After running `npx tsp-client update`:

- [ ] **Fix 1:** In `src/models.ts`, change `| FormData` to `| globalThis.FormData` in the `FormData` type alias (line ~907)
- [ ] **Fix 2:** In `src/api/data/operations.ts`, replace `stringToUint8Array(result.body, "base64")` with `new TextEncoder().encode(result.body)` in both WMTS deserializers
- [ ] **Fix 2b:** Remove unused `stringToUint8Array` import if present
- [ ] **Fix 3:** In `src/static-helpers/urlTemplate.ts`, change `[\-.~]` to `[-.~]` (remove useless escape before hyphen)
- [ ] Run `pnpm run format` — auto-fix formatting
- [ ] Run `pnpm run lint:fix` — auto-fix most lint issues (but not `no-useless-escape` — that requires Fix 3 above)
- [ ] Run `pnpm turbo build --filter=@azure/planetarycomputer... --token 1` — must exit 0
- [ ] Inspect `git diff review/` for unexpected API changes
- [ ] Run `pnpm test` in playback mode — all tests should pass
- [ ] Re-record tests if HTTP request/response shapes changed (`TEST_MODE=record pnpm test`)
- [ ] Push recordings (`npx dev-tool test-proxy push`) and commit updated `assets.json`
- [ ] Update `CHANGELOG.md` if preparing a release
