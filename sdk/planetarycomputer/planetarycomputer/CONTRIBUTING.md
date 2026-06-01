# Contributing to @azure/planetarycomputer

This guide covers how to build, test, and validate the Azure Planetary Computer Pro client library
before submitting changes.

For general Azure SDK for JS contribution guidance, see the
[top-level CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).

## Prerequisites

- Node.js LTS (>= 20.x)
- pnpm (>= 10.x) — enforced by the repo's `preinstall` script

## Regenerating the SDK from TypeSpec

1. Update the `commit` field in `tsp-location.yaml` to the desired spec commit SHA.
2. Run code generation from the package root:

   ```bash
   npx tsp-client update
   ```

3. Format, lint, and build:

   ```bash
   pnpm format
   pnpm lint:fix
   pnpm turbo build --filter=@azure/planetarycomputer... --token 1
   ```

4. Inspect API review changes:

   ```bash
   git diff review/
   ```

5. Run tests in playback mode to verify nothing broke:

   ```bash
   TEST_MODE=playback pnpm test:node
   ```

> **Important:** Always use `pnpm turbo build --filter=@azure/planetarycomputer... --token 1` from
> the repo root. The trailing `...` builds the package AND all its workspace dependencies.

## Known Manual Fix on Generated Code

### WMTS XML Deserialization (base64 decoding)

**File:** `src/api/data/operations.ts`

The emitter generates code that treats WMTS capabilities XML responses as base64-encoded bytes.
The WMTS endpoints return **plain XML text**, but the TypeSpec model uses `@body body: bytes`,
causing the emitter to generate `stringToUint8Array(result.body, "base64")`. This works in Node.js
(where `Buffer.from` is lenient) but fails in browsers (`atob` rejects non-base64 input).

**Fix:** In all 6 WMTS deserializer functions, replace:

```javascript
stringToUint8Array(result.body, "base64")
```

with:

```javascript
new TextEncoder().encode(result.body)
```

Remove the unused `stringToUint8Array` import from `@azure/core-util` if no other usages remain.

**Affected functions:**
- `_getSearchWmtsCapabilitiesDeserialize`
- `_getSearchWmtsCapabilitiesByTmsDeserialize`
- `_getCollectionWmtsCapabilitiesDeserialize`
- `_getCollectionWmtsCapabilitiesByTmsDeserialize`
- `_getItemWmtsCapabilitiesDeserialize`
- `_getItemWmtsCapabilitiesByTmsDeserialize`

## Local Validation

Run formatting and linting from the **package root** (`sdk/planetarycomputer/planetarycomputer`):

```bash
pnpm format           # auto-fix formatting
pnpm lint:fix         # auto-fix lint issues
```

Run the build from the **repo root** (to include workspace dependencies):

```bash
pnpm turbo build --filter=@azure/planetarycomputer... --token 1
```

Run tests from the **package root**:

```bash
TEST_MODE=playback pnpm test:node     # all node tests in playback mode
TEST_MODE=record pnpm test:node -- test/public/01_ingestion.spec.ts  # record a specific file
```

## Testing

See the [Testing Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/TESTING.md) for detailed instructions on recording, playback, and test
structure.

## Quick-Reference Checklist

After running `npx tsp-client update`:

- [ ] Apply WMTS fix (replace `stringToUint8Array` with `TextEncoder` in `src/api/data/operations.ts`)
- [ ] Run `pnpm format` and `pnpm lint:fix`
- [ ] Build succeeds: `pnpm turbo build --filter=@azure/planetarycomputer... --token 1`
- [ ] Inspect `git diff review/` for unexpected API changes
- [ ] Tests pass in playback mode: `TEST_MODE=playback pnpm test:node`
- [ ] Re-record if HTTP shapes changed: `TEST_MODE=record pnpm test:node -- test/public/<file>.spec.ts`
- [ ] Push recordings: `npx dev-tool test-proxy push`
- [ ] Commit updated `assets.json`
- [ ] Update `CHANGELOG.md` if preparing a release
