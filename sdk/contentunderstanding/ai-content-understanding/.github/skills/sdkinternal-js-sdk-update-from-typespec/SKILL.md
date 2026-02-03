---
name: sdkinternal-js-sdk-update-from-typespec
description: "Update the @azure/ai-content-understanding SDK from a new TypeSpec commit. Use when the TypeSpec spec has been updated and the SDK needs regeneration."
---

# Update SDK from TypeSpec Commit

This skill guides updating the `@azure/ai-content-understanding` SDK when a new TypeSpec commit is available.

## Prerequisites

- Node.js LTS installed
- pnpm installed

## Workflow Steps

### Step 1: Update TypeSpec Commit Reference

Update the `commit` field in `tsp-location.yaml`:

```yaml
# File: sdk/contentunderstanding/ai-content-understanding/tsp-location.yaml
directory: specification/ai/ContentUnderstanding
commit: <NEW_COMMIT_SHA> # Update this
repo: Azure/azure-rest-api-specs
```

### Step 2: Regenerate SDK

Run from the package directory:

```bash
cd sdk/contentunderstanding/ai-content-understanding
npx tsp-client update
```

This updates the `generated/` folder with new generated code from the TypeSpec specification.

### Step 3: Apply Customizations

Before committing the generated changes:

```bash
npx dev-tool customization apply-v2
```

This syncs generated code from `generated/` to `src/` while preserving customizations.
See [RLC Customization Guide](https://aka.ms/azsdk/js/customization) for details.

### Step 4: Verify Customizations Applied Correctly

Compare `generated/` vs `src/` to ensure all expected customizations are present.

Key files to check:

- `src/static-helpers/serialization/serialize-record.ts`
- `src/static-helpers/urlTemplate.ts`
- `src/models/models.ts`
- `src/api/operations.ts`
- `src/contentUnderstandingClient.ts`

### Step 5: Check Fix Status

Verify each fix listed in the "Current Known Fixes" section below is still applied in `src/`.

| Fix # | Description                                                    | Check Location                                             | Verification                                                            |
| ----- | -------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1     | `serializeRecord` return types + no param reassign             | `src/static-helpers/serialization/serialize-record.ts`     | Has `): Record<string, any>` return type and uses `propertiesToExclude` |
| 2     | `keyFrameTimesMs` casing fallback                              | `src/models/models.ts` in `audioVisualContentDeserializer` | Has `item["keyFrameTimesMs"] ?? item["KeyFrameTimesMs"]`                |
| 3     | `stringEncoding` always 'utf16' via ContentUnderstandingClient | `src/contentUnderstandingClient.ts`                        | `analyze` and `analyzeBinary` pass `stringEncoding: "utf16"` internally |
| 4     | `path` variable renamed to `urlPath`                           | `src/api/operations.ts` in `_getResultFileSend`            | Uses `const urlPath = expandUrlTemplate(...)`                           |
| 5     | Null guard in `contentFieldDefinitionRecordDeserializer`       | `src/models/models.ts`                                     | Has `if (!item) { return item; }`                                       |
| 6     | `value` property on ContentField types                         | `src/models/models.ts`                                     | All field types have `value` property                                   |
| 7     | ContentUnderstandingClient API customizations                  | `src/contentUnderstandingClient.ts`                        | Custom option types and `analyze` requires `inputs` as second param     |
| 8     | `result` variable renamed to `varResults` in urlTemplate       | `src/static-helpers/urlTemplate.ts`                        | Uses `const varResults = []` instead of `const result = []`             |
| 9     | Regex character class fix in urlTemplate                       | `src/static-helpers/urlTemplate.ts`                        | Uses `/[.~-]/` instead of `/[\-.~]/`                                    |
| 10    | Hide `getOperationStatus` method (@internal not respected)     | `src/contentUnderstandingClient.ts`                        | Method removed - marked @internal in TypeSpec but emitter ignores it    |

**If a fix is now included in the generated code upstream, remove it from this skill document.**

### Step 6: Build Package

```bash
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
```

### Step 7: Run Tests

Run tests in playback mode:

```bash
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=playback pnpm test:node
```

If tests fail:

1. Check if API changes require recording updates (run with `TEST_MODE=record`)
2. Check if model changes broke test assertions
3. Update tests as needed

See [Testing Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md) for details.

### Step 8: Update This Skill Document

**Important**: Update this SKILL.md file directly with any changes:

- Add any new fixes discovered during this update
- Remove fixes that are now included in upstream generated code
- Update fix descriptions if implementation details changed

### Step 9: Lint and Format

```bash
pnpm lint:fix
pnpm format
```

Never disable `eslint-plugin-azure-sdk` rules to resolve linting issues.

---

## Current Known Fixes

These fixes address issues in the generated code that are not yet resolved upstream in the TypeSpec emitter. Each fix must be verified after regeneration.

### Fix 1: serializeRecord Linting Issues

**File**: `src/static-helpers/serialization/serialize-record.ts`

**Problem**: The generated code has two ESLint violations:

1. Missing explicit return type annotation (violates `@typescript-eslint/explicit-module-boundary-types`)
2. Reassigns the `excludes` parameter (violates `no-param-reassign`)

**Why this matters**: The Azure SDK ESLint rules require explicit return types for exported functions and prohibit parameter reassignment for code clarity and maintainability.

**Fix**: Add return type annotation and use a new local variable instead of reassigning the parameter:

```typescript
export function serializeRecord(
  item: Record<string, any>,
  excludes?: string[],
  serializer?: (item: any) => any,
): Record<string, any> {
  const propertiesToExclude = excludes ?? [];
  const res: any = {};
  for (const key of Object.keys(item)) {
    if (propertiesToExclude.includes(key) || item[key] === undefined) {
      continue;
    }
    if (serializer) {
      res[key] = serializer(item[key]);
    } else {
      res[key] = item[key] as any;
    }
  }
  return res;
}
```

---

### Fix 2: keyFrameTimesMs Property Casing Inconsistency

**File**: `src/models/models.ts` in `audioVisualContentDeserializer`

**Problem**: The Content Understanding service has a known issue where it returns `KeyFrameTimesMs` (PascalCase) instead of the expected `keyFrameTimesMs` (camelCase) for the `AudioVisualContent` type.

**Why this matters**: Without this fix, the SDK would fail to deserialize the `keyFrameTimesMs` property when the service returns PascalCase, causing data loss for users processing video content.

**Fix**: Update the deserializer to accept both casing variants using nullish coalescing:

```typescript
keyFrameTimesMs: (() => {
  const val = item["keyFrameTimesMs"] ?? item["KeyFrameTimesMs"];
  return !val ? val : val.map((p: any) => p);
})(),
```

---

### Fix 3: Always Use 'utf16' for stringEncoding

**File**: `src/contentUnderstandingClient.ts`

**Problem**: JavaScript strings use UTF-16 code units internally for `.length` and string indexing. The SDK should always use 'utf16' encoding to ensure span offsets align correctly with JavaScript string operations.

**Why this matters**:

- JavaScript's `String.length` returns the number of UTF-16 code units, not Unicode code points
- The .NET SDK defaults to 'utf16' for the same reason (.NET strings are UTF-16)
- Without this, span offsets and lengths returned by the service may not align correctly with JavaScript string operations
- Users should not need to specify this parameter

**Fix**: The `ContentUnderstandingClient` wrapper methods always pass `stringEncoding: "utf16"` internally within the `getInitialResponse` function, regardless of user input:

```typescript
// In analyze method:
const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
  const res = await _analyzeSend(this._client, analyzerId, {
    ...options,
    inputs,
    stringEncoding: "utf16",
  });
  // ... operationId extraction
  return res;
};

// In analyzeBinary method:
const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
  const res = await _analyzeBinarySend(this._client, analyzerId, contentType, binaryInput, {
    ...options,
    stringEncoding: "utf16",
  });
  // ... operationId extraction
  return res;
};
```

The `stringEncoding` property is also excluded from the public option types (see Fix 7).

---

### Fix 4: Duplicate Variable Name in \_getResultFileSend

**File**: `src/api/operations.ts` in `_getResultFileSend`

**Problem**: The function has a parameter named `path` and the generated code declares a local constant also named `path`, causing a variable shadowing conflict.

**Why this matters**: This causes a TypeScript/JavaScript error because you cannot redeclare a variable with the same name in the same scope. The code will not compile.

**Fix**: Rename the local constant to `urlPath` to avoid the naming conflict:

```typescript
export function _getResultFileSend(
  context: Client,
  operationId: string,
  path: string, // Function parameter
  options: GetResultFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const urlPath = expandUrlTemplate(
    // Renamed from 'path' to 'urlPath'
    "/analyzerResults/{operationId}/files/{+path}{?api%2Dversion}",
    {
      operationId: operationId,
      path: path,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(urlPath).get({
    // Use urlPath here
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}
```

---

### Fix 5: Missing Null Guard in contentFieldDefinitionRecordDeserializer

**File**: `src/models/models.ts` in `contentFieldDefinitionRecordDeserializer`

**Problem**: The function calls `Object.keys(item)` without first checking if `item` is null or undefined, which would throw a runtime error.

**Why this matters**: The `definitions` property in `ContentFieldSchema` is optional. When the service returns a response without `definitions`, the deserializer receives `undefined` and crashes.

**Fix**: Add a null/undefined check at the beginning of the function:

```typescript
export function contentFieldDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContentFieldDefinition> {
  if (!item) {
    return item;
  }
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : contentFieldDefinitionDeserializer(item[key]);
  });
  return result;
}
```

---

### Fix 6: Add value Property to ContentField Types

**File**: `src/models/models.ts`

**Problem**: The generated ContentField subtypes (StringField, NumberField, etc.) only expose typed properties like `valueString`, `valueNumber`, etc. This differs from the .NET SDK which exposes a convenient `value` property.

**Why this matters**:

- Improves developer experience by providing a consistent, simpler way to access field values
- Aligns with the .NET SDK design for cross-language consistency
- Reduces boilerplate in user code (no need to check field type before accessing value)
- Simplifies samples and documentation

**Fix**: Add a `value` property to each ContentField subtype interface and populate it in the deserializer:

**StringField**:

```typescript
export interface StringField extends ContentField {
  fieldType: "string";
  valueString?: string;
  value?: string; // Added
}

export function stringFieldDeserializer(item: any): StringField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    valueString: item["valueString"],
    value: item["valueString"], // Added
  };
}
```

**Apply the same pattern for all subtypes**:
| Type | value Property Type | Maps From |
|------|---------------------|-----------|
| `StringField` | `string` | `valueString` |
| `NumberField` | `number` | `valueNumber` |
| `IntegerField` | `number` | `valueInteger` |
| `DateField` | `string` | `valueDate` |
| `TimeField` | `string` | `valueTime` |
| `BooleanField` | `boolean` | `valueBoolean` |
| `ArrayField` | `ContentFieldUnion[]` | `valueArray` |
| `ObjectField` | `Record<string, ContentFieldUnion>` | `valueObject` |
| `JsonField` | `any` | `valueJson` |

---

### Fix 7: ContentUnderstandingClient API Customizations

**File**: `src/contentUnderstandingClient.ts`

**Problem**: The generated client API for `analyze` and `analyzeBinary` needs to be customized for better developer experience:

1. `inputs` should be a required parameter for `analyze`, not optional in the options bag
2. `stringEncoding` should be hidden from users (always 'utf16')
3. The `operationId` should be exposed on the poller for result retrieval

**Why this matters**:

- `inputs` is semantically required - an analyze call without inputs doesn't make sense
- `stringEncoding` must always be 'utf16' for JavaScript (see Fix 3)
- Users need `operationId` to call `getResult`, `getResultFile`, and `deleteResult`

**Fix**: Add custom option types and modify method signatures:

```typescript
// Custom option types that hide internal parameters
export type ContentUnderstandingAnalyzeOptionalParams = Omit<
  AnalyzeOptionalParams,
  "inputs" | "stringEncoding"
>;

export type ContentUnderstandingAnalyzeBinaryOptionalParams = Omit<
  AnalyzeBinaryOptionalParams,
  "stringEncoding"
>;

// Custom poller type with operationId
export interface AnalyzeResultPoller extends PollerLike<
  OperationState<AnalyzeResult>,
  AnalyzeResult
> {
  operationId?: string;
}

// analyze method - inputs is now a required second parameter
analyze(
  analyzerId: string,
  inputs: AnalyzeInput[],
  options: ContentUnderstandingAnalyzeOptionalParams = { requestOptions: {} },
): AnalyzeResultPoller

// analyzeBinary method - uses custom options type
analyzeBinary(
  analyzerId: string,
  binaryInput: Uint8Array,
  contentType: string = "application/octet-stream",
  options: ContentUnderstandingAnalyzeBinaryOptionalParams = { requestOptions: {} },
): AnalyzeResultPoller
```

Both methods internally always pass `stringEncoding: "utf16"` and expose `operationId` on the returned poller.

---

### Fix 8: Variable Shadowing in urlTemplate.ts

**File**: `src/static-helpers/urlTemplate.ts`

**Problem**: The generated code uses a variable named `result` inside a callback that shadows the outer `result` variable, causing a linting error.

**Why this matters**: Variable shadowing can cause confusion and bugs. The ESLint rule `no-shadow` is enabled to prevent this.

**Fix**: Rename the inner `result` variable to `varResults` to avoid shadowing:

```typescript
const result = template.replace(/\{([^{}]+)\}|([^{}]+)/g, (_, expr, text) => {
  // ...
  const varList = expr.split(/,/g);
  const varResults = []; // Renamed from 'result' to avoid shadowing
  for (const varSpec of varList) {
    // ...
    if (varValue) {
      varResults.push(varValue);
    }
  }
  return varResults.join("");
});
```

---

### Fix 9: Regex Character Class Escaping in urlTemplate.ts

**File**: `src/static-helpers/urlTemplate.ts` in `normalizeUnreserved`

**Problem**: The generated regex `/[\-.~]/` has an unnecessarily escaped hyphen at the start of the character class, which triggers an ESLint warning.

**Why this matters**: While the regex works correctly, the unnecessary escape can be confusing. The hyphen only needs escaping when it's in the middle of a character class.

**Fix**: Move the hyphen to the end of the character class where it doesn't need escaping:

```typescript
function normalizeUnreserved(uri: string): string {
  return uri.replace(/%([0-9A-Fa-f]{2})/g, (match, hex) => {
    const char = String.fromCharCode(parseInt(hex, 16));
    // Decode only if it's unreserved
    if (/[.~-]/.test(char)) { // Hyphen moved to end
      return char;
    }
    return match;
  });
}
```

---

### Fix 10: Hide getOperationStatus Method (TypeSpec @internal Not Respected)

**File**: `src/contentUnderstandingClient.ts`

**Problem**: The `getOperationStatus` operation is marked with `@internal` in TypeSpec, but the JavaScript emitter does not respect this decorator and still generates the method in the client.

**Why this matters**:

- The method should not be exposed in the public API per the TypeSpec definition
- The poller returned by `createAnalyzer` and `copyAnalyzer` already handles operation status internally
- Reduces API surface area and user confusion

**Fix**: Remove the `getOperationStatus` method from the `ContentUnderstandingClient` class. Also remove the related imports (`getOperationStatus`, `GetOperationStatusOptionalParams`, `ContentAnalyzerOperationStatus`).

**Note**: This is a workaround for the TypeSpec JS emitter not respecting the `@internal` decorator. When the emitter is fixed upstream, this customization may no longer be needed.

---

## Troubleshooting

### Build Fails After Regeneration

1. Check for TypeScript errors in the build output
2. Verify all customizations from this document were applied
3. Check if new APIs introduced breaking changes
4. Ensure dependencies are built: use `--filter=...` suffix for dependency building

### Tests Fail

1. Run with `TEST_MODE=record` if API behavior changed
2. Check if response models changed structure
3. Update test assertions for new/changed fields

### Lint Errors

1. Run `pnpm lint:fix` first
2. Manual fixes may be needed for complex issues
3. Never disable `eslint-plugin-azure-sdk` rules - fix the underlying issue instead

### Customizations Not Applied

1. Ensure `npx dev-tool customization apply-v2` ran successfully
2. Check if file structure changed in generated code
3. May need to manually update customization mappings

---

## Related Files

- `tsp-location.yaml` - TypeSpec commit reference
- `generated/` - Raw generated code (do not edit directly)
- `src/` - Customized source code (apply fixes here)
- `src/contentUnderstandingClient.ts` - Client wrapper with API customizations (Fix 3 & 7)
- `src/static-helpers/urlTemplate.ts` - URL template expansion (Fix 8 & 9)
