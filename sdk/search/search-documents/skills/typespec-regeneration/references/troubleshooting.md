# Troubleshooting Reference

## Compilation Errors

### Cannot Find Module
```
Cannot find module './generated/data/models/index.js'
```
**Fix**: Update import to `./models/azure/search/documents/index.js`

### Property Does Not Exist
```
Property 'analyzer' does not exist. Did you mean 'analyzerName'?
```
**Fix**: Update serviceUtils.ts conversion functions. See type-mapping.md.

### Readonly Array Not Assignable
```
Type 'readonly string[]' is not assignable to type 'string[]'
```
**Fix**: Cast: `select: userSelect as string[] | undefined`

### Missing Export (ae-forgotten-export)
```
ae-forgotten-export: The symbol "FooType" needs to be exported
```
**Fix**: Add to `src/index.ts` (it's --skip'd, so new types need manual export)

### Null vs Undefined
```
Type 'string | null' is not assignable to type 'string | undefined'
```
**Fix**: `value: generated.value ?? undefined`

### OperationOptions Import
```
Module "@azure/core-client" has no exported member 'OperationOptions'
```
**Fix**: Import from `@azure-rest/core-client` instead

## Test Failures

### Document Fields Undefined
**Symptom**: `result.document.hotelName` is `undefined`
**Fix**: Verify `generatedSearchResultToPublicSearchResult()` unwraps `additionalProperties`

### HTTP 400 in Record Mode
**Fix**: Check generated `operations.ts` for request body format changes

### Stale Recordings
**Fix**: `TEST_MODE=record npm run test:node`

### Paging Broken
**Fix**: Check continuation token encoding in `searchClient.ts`

## Build & Lint

```bash
# Full build with deps
pnpm turbo build --filter=@azure/search-documents... --token 1

# Type-check only
npx tsc --noEmit

# If new generated dirs appear, add to eslint.config.mjs overrides
```

## Debugging

```bash
# Compare generated vs src
diff -rq generated/ src/ --exclude="*.js" | grep "^Files"

# Inspect merge (dry run)
npx dev-tool customization apply --no-cleanup

# Find broken imports
grep -r "from.*generated" src/ --include="*.ts"
```
