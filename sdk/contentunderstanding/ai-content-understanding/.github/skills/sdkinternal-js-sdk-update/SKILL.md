---
name: sdkinternal-js-sdk-update
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
- `src/api/contentUnderstandingContext.ts`
- `src/contentUnderstandingClient.ts`

### Step 5: Check Fix Status

Verify each fix listed in the "Current Known Fixes" section below is still applied in `src/`.

**Category Legend:**

- **EMITTER-FIX**: Issues with the TypeSpec JS emitter that need workarounds
- **SERVICE-FIX**: Issues with the service returning incorrect/inconsistent data
- **SDK-IMPROVEMENT**: Enhancements to the SDK API for better developer experience

| Fix # | Category        | Description                                                                            | Check Location                                                                | Verification                                                                                |
| ----- | --------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1     | EMITTER-FIX     | `serializeRecord` return types + no param reassign                                     | `src/static-helpers/serialization/serialize-record.ts`                        | Has `): Record<string, any>` return type and uses `propertiesToExclude`                     |
| 2     | SERVICE-FIX     | `keyFrameTimesMs` casing fallback                                                      | `src/models/models.ts` in `audioVisualContentDeserializer`                    | Has `item["keyFrameTimesMs"] ?? item["KeyFrameTimesMs"]`                                    |
| 3     | SDK-IMPROVEMENT | `stringEncoding` always 'utf16' via ContentUnderstandingClient                         | `src/contentUnderstandingClient.ts`                                           | `analyze` and `analyzeBinary` pass `stringEncoding: "utf16"` internally                     |
| 4     | EMITTER-FIX     | `path` variable renamed to `urlPath`                                                   | `src/api/operations.ts` in `_getResultFileSend`                               | Uses `const urlPath = expandUrlTemplate(...)`                                               |
| 5     | SERVICE-FIX     | Null guard in `contentFieldDefinitionRecordDeserializer` for missing required `fields` | `src/models/models.ts`                                                        | Has `if (!item) { return item; }`                                                           |
| 6     | SDK-IMPROVEMENT | `value` property replaces `value*` on ContentField types                               | `src/models/models.ts`                                                        | All field types have only `value` (no `valueString`, `valueArray`, etc.)                    |
| 7     | SDK-IMPROVEMENT | ContentUnderstandingClient API customizations                                          | `src/contentUnderstandingClient.ts`, `src/api/options.ts`                     | Explicit `AnalyzeOptionalParams`/`AnalyzeBinaryOptionalParams` interfaces                   |
| 8     | EMITTER-FIX     | `result` variable renamed to `varResults` in urlTemplate                               | `src/static-helpers/urlTemplate.ts`                                           | Uses `const varResults = []` instead of `const result = []`                                 |
| 9     | EMITTER-FIX     | Regex character class fix in urlTemplate                                               | `src/static-helpers/urlTemplate.ts`                                           | Uses `/[.~-]/` instead of `/[\-.~]/`                                                        |
| 10    | EMITTER-FIX     | Hide `getResult` and `getOperationStatus` methods (Access.internal not respected)      | `src/contentUnderstandingClient.ts`                                           | Methods commented out - marked @@access(Access.internal) in TypeSpec but emitter ignores it |
| 11    | EMITTER-FIX     | Rename `endpointParam` to `endpoint`                                                   | `src/contentUnderstandingClient.ts`, `src/api/contentUnderstandingContext.ts` | Constructor and factory function use `endpoint` instead of `endpointParam`                  |

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

### Fix 1 [EMITTER-FIX]: serializeRecord Linting Issues

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

### Fix 2 [SERVICE-FIX]: keyFrameTimesMs Property Casing Inconsistency

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

### Fix 3 [SDK-IMPROVEMENT]: Always Use 'utf16' for stringEncoding

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
  const res = await _analyzeSend(this._client, analyzerId, inputs, {
    ...options,
    stringEncoding: "utf16",
  });
  // ... operationId extraction
  return res;
};

// In analyzeBinary method:
const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
  const res = await _analyzeBinarySend(this._client, analyzerId, binaryInput, contentType, {
    ...options,
    stringEncoding: "utf16",
  });
  // ... operationId extraction
  return res;
};
```

The `stringEncoding` property is also excluded from the public option types (see Fix 7).

---

### Fix 4 [EMITTER-FIX]: Duplicate Variable Name in \_getResultFileSend

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

### Fix 5 [SERVICE-FIX]: Missing Null Guard in contentFieldDefinitionRecordDeserializer

**File**: `src/models/models.ts` in `contentFieldDefinitionRecordDeserializer`

**Problem**: The service returns `"fieldSchema": {}` (empty object) for some prebuilt analyzers (e.g., `prebuilt-audio`), omitting the required `fields` property. This causes `contentFieldSchemaDeserializer` to call `contentFieldDefinitionRecordDeserializer(undefined)`, which throws a `TypeError` at `Object.keys(undefined)`.

**Note**: The TypeSpec defines `fields: Record<ContentFieldDefinition>` as required on `FieldSchema` (not optional), so this is a service contract violation. The `definitions` property (optional) is already safely guarded at the call site with `!item["definitions"] ? item["definitions"] : contentFieldDefinitionRecordDeserializer(item["definitions"])`, so it does not need this fix.

**Why this matters**: Without this guard, listing or getting analyzers like `prebuilt-audio` crashes at runtime.

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

### Fix 6 [SDK-IMPROVEMENT]: Replace `value*` Properties with `value` on ContentField Types

**File**: `src/models/models.ts`

**Problem**: The generated ContentField subtypes (StringField, NumberField, etc.) expose typed properties like `valueString`, `valueNumber`, `valueArray`, `valueObject`, etc. This differs from the .NET SDK which exposes a single convenient `value` property. Having both `value*` and `value` is redundant and confusing.

**Why this matters**:

- Improves developer experience by providing a single, consistent way to access field values
- Aligns with the .NET SDK design for cross-language consistency
- Reduces boilerplate in user code (no need to check field type before accessing value)
- Simplifies samples and documentation
- Removes redundant `valueString`, `valueNumber`, `valueDate`, `valueTime`, `valueInteger`, `valueBoolean`, `valueArray`, `valueObject`, `valueJson` properties

**Fix**: Replace the generated `value*` properties with a single `value` property on each ContentField subtype interface. The deserializers map from the wire format (`valueString`, `valueNumber`, etc.) to the unified `value` property.

**StringField** example:

```typescript
export interface StringField extends ContentField {
  fieldType: "string";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueString` with `value` for a simpler, consistent API.
  value?: string;
}

export function stringFieldDeserializer(item: any): StringField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire `valueString`
    value: item["valueString"],
  };
}
```

**Apply the same pattern for all subtypes** (remove `value*`, keep only `value`):
| Type | `value` Property Type | Wire Property Mapped From |
|------|---------------------|-----------|
| `StringField` | `string` | `valueString` |
| `NumberField` | `number` | `valueNumber` |
| `IntegerField` | `number` | `valueInteger` |
| `DateField` | `Date` | `valueDate` |
| `TimeField` | `string` | `valueTime` |
| `BooleanField` | `boolean` | `valueBoolean` |
| `ArrayField` | `ContentFieldUnion[]` | `valueArray` |
| `ObjectField` | `Record<string, ContentFieldUnion>` | `valueObject` |
| `JsonField` | `any` | `valueJson` |

**ObjectField** example (complex type with deserialization):

```typescript
export interface ObjectField extends ContentField {
  fieldType: "object";
  // CUSTOMIZATION: SDK-IMPROVEMENT: Replaced `valueObject` with `value` for a simpler, consistent API.
  value?: Record<string, ContentFieldUnion>;
}

export function objectFieldDeserializer(item: any): ObjectField {
  return {
    type: item["type"],
    spans: !item["spans"] ? item["spans"] : contentSpanArrayDeserializer(item["spans"]),
    confidence: item["confidence"],
    source: item["source"],
    fieldType: item["type"],
    // CUSTOMIZATION: SDK-IMPROVEMENT: Map `value` from wire `valueObject`
    value: !item["valueObject"]
      ? item["valueObject"]
      : contentFieldUnionRecordDeserializer(item["valueObject"]),
  };
}
```

**Usage in samples/tests**: All code should use `.value` directly:

```typescript
// Scalar fields
const customerName = field.value; // string | undefined

// Object fields
const objField = totalAmountField as ObjectField;
const amountField = objField.value?.["Amount"];

// Array fields
const arrField = lineItemsField as ArrayField;
for (const item of arrField.value ?? []) { ... }
```

---

### Fix 7 [SDK-IMPROVEMENT]: ContentUnderstandingClient API Customizations

**Files**: `src/contentUnderstandingClient.ts`, `src/api/options.ts`

**Problem**: The generated client API for `analyze` and `analyzeBinary` needs to be customized for better developer experience:

1. `stringEncoding` should be hidden from users (always 'utf16')
2. `contentType` should have a default value of `"application/octet-stream"` (EMITTER-FIX: TypeSpec defines this default but the emitter doesn't generate it)
3. The `operationId` should be exposed on the poller for result retrieval

**Why this matters**:

- `stringEncoding` must always be 'utf16' for JavaScript (see Fix 3)
- `contentType` default is defined in TypeSpec but the emitter doesn't carry it through; adding it makes the common case (binary upload) simple while still allowing overrides
- Users need `operationId` to call `getResult`, `getResultFile`, and `deleteResult`

**Fix**: Add custom option types as explicit interfaces (not `Omit<>` aliases) to keep standard type names (`AnalyzeOptionalParams`, `AnalyzeBinaryOptionalParams`) and avoid API Extractor warnings about unexported symbols. Modify method signatures accordingly:

```typescript
// Custom option types defined as explicit interfaces to keep standard type names
// and avoid API Extractor warnings about unexported symbols
/** Optional parameters for the analyze operation. */
export interface AnalyzeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Override default mapping of model names to deployments. */
  modelDeployments?: Record<string, string>;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}

/** Optional parameters for the analyzeBinary operation. */
export interface AnalyzeBinaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Range of the input to analyze (ex. `1-3,5,9-`). Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  range?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}

// Custom poller type with operationId
export interface AnalyzeResultPoller extends PollerLike<
  OperationState<AnalyzeResult>,
  AnalyzeResult
> {
  operationId?: string;
}

// analyzeBinary method - contentType as positional param with default, custom options type
analyzeBinary(
  analyzerId: string,
  binaryInput: Uint8Array,
  contentType: string = "application/octet-stream",
  options: AnalyzeBinaryOptionalParams = { requestOptions: {} },
): AnalyzeResultPoller
```

Note: `inputs` as a required parameter for `analyze` and `contentType` as a positional parameter for `analyzeBinary` are now the generated TypeSpec behavior and do not require customization.

Both methods internally always pass `stringEncoding: "utf16"` and expose `operationId` on the returned poller.

**Important**: The custom option types must be defined as explicit interfaces, not as `Omit<>` type aliases. This approach:

1. Keeps standard type names (`AnalyzeOptionalParams`, `AnalyzeBinaryOptionalParams`) aligned with other option types
2. Avoids API Extractor warnings like "The symbol 'AnalyzeOptionalParams_2' needs to be exported" that occur when using `Omit<GeneratedType, "prop">`

**After regeneration**: Check if new properties were added to the generated `AnalyzeOptionalParams` or `AnalyzeBinaryOptionalParams` in `generated/api/options.ts`. If so, add them to the custom interfaces in `src/contentUnderstandingClient.ts` (excluding `stringEncoding` which is intentionally hidden).

---

### Fix 8 [EMITTER-FIX]: Variable Shadowing in urlTemplate.ts

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

### Fix 9 [EMITTER-FIX]: Regex Character Class Escaping in urlTemplate.ts

**File**: `src/static-helpers/urlTemplate.ts` in `normalizeUnreserved`

**Problem**: The generated regex `/[\-.~]/` has an unnecessarily escaped hyphen at the start of the character class, which triggers an ESLint warning.

**Why this matters**: While the regex works correctly, the unnecessary escape can be confusing. The hyphen only needs escaping when it's in the middle of a character class.

**Fix**: Move the hyphen to the end of the character class where it doesn't need escaping:

```typescript
function normalizeUnreserved(uri: string): string {
  return uri.replace(/%([0-9A-Fa-f]{2})/g, (match, hex) => {
    const char = String.fromCharCode(parseInt(hex, 16));
    // Decode only if it's unreserved
    if (/[.~-]/.test(char)) {
      // Hyphen moved to end
      return char;
    }
    return match;
  });
}
```

---

### Fix 10 [EMITTER-FIX]: Hide getResult and getOperationStatus Methods (Access.internal Not Respected)

**File**: `src/contentUnderstandingClient.ts`

**Problem**: The `getResult` and `getOperationStatus` operations are marked with `@@access(Access.internal)` in the TypeSpec client.tsp file, but the JavaScript emitter does not respect this decorator and still generates the methods in the client.

**TypeSpec definition** (from client.tsp):

```typespec
// Mark polling operations as internal - client generators automatically handle
// the polling pattern for long-running operations.
@@access(ContentUnderstandingClient.getResult, Access.internal);
@@access(ContentUnderstandingClient.getOperationStatus, Access.internal);
```

**Why this matters**:

- These methods should not be exposed in the public API per the TypeSpec definition
- The poller returned by `analyze`, `analyzeBinary`, `createAnalyzer`, and `copyAnalyzer` already handles operation status and result retrieval internally
- Reduces API surface area and user confusion

**Fix**: Comment out the `getResult` and `getOperationStatus` methods from the `ContentUnderstandingClient` class. Also comment out the related imports (`getResult`, `getOperationStatus`, `GetResultOptionalParams`, `GetOperationStatusOptionalParams`, `ContentAnalyzerAnalyzeOperationStatus`, `ContentAnalyzerOperationStatus`).

```typescript
// In imports section:
import {} from // ...other imports...
// CUSTOMIZATION: EMITTER-FIX: getResult and getOperationStatus are marked as @@access(Access.internal)
// in TypeSpec but the JS emitter does not respect this. Keeping imports commented for reference.
// getResult,
// getOperationStatus,
// ...other imports...
"./api/operations.js";

// In the class:
// CUSTOMIZATION: EMITTER-FIX: Commented out `getResult` method - it is marked as
// @@access(Access.internal) in TypeSpec, but the JS emitter does not respect this decorator.
// The poller handles result retrieval internally.
// /** Get the result of an analysis operation. */
// getResult(
//   operationId: string,
//   options: GetResultOptionalParams = { requestOptions: {} },
// ): Promise<ContentAnalyzerAnalyzeOperationStatus> {
//   return getResult(this._client, operationId, options);
// }

// CUSTOMIZATION: EMITTER-FIX: Commented out `getOperationStatus` method - it is marked as
// @@access(Access.internal) in TypeSpec, but the JS emitter does not respect this decorator.
// The poller handles operation status internally.
// /** Get the status of an analyzer creation operation. */
// getOperationStatus(
//   analyzerId: string,
//   operationId: string,
//   options: GetOperationStatusOptionalParams = { requestOptions: {} },
// ): Promise<ContentAnalyzerOperationStatus> {
//   return getOperationStatus(this._client, analyzerId, operationId, options);
// }
```

**Note**: This is a workaround for the TypeSpec JS emitter not respecting the `@@access(Access.internal)` decorator. When the emitter is fixed upstream, this customization may no longer be needed.

---

### Fix 11 [EMITTER-FIX]: Rename endpointParam to endpoint

**Files**: `src/contentUnderstandingClient.ts`, `src/api/contentUnderstandingContext.ts`

**Problem**: The TypeSpec JS emitter generates the constructor/factory parameter name as `endpointParam` instead of the more natural `endpoint`.

**Why this matters**: The Azure SDK guidelines use `endpoint` as the standard parameter name for service endpoint URLs. Using `endpointParam` is inconsistent with other Azure SDK clients and less intuitive for developers.

**Fix**: Rename the parameter from `endpointParam` to `endpoint` in both the `ContentUnderstandingClient` constructor and the `createContentUnderstanding` factory function:

```typescript
// In contentUnderstandingClient.ts:
constructor(
  endpoint: string, // Renamed from 'endpointParam'
  credential: KeyCredential | TokenCredential,
  options: ContentUnderstandingClientOptionalParams = {},
) {
  // ...
  this._client = createContentUnderstanding(endpoint, credential, {
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  // ...
}

// In contentUnderstandingContext.ts:
export function createContentUnderstanding(
  endpoint: string, // Renamed from 'endpointParam'
  credential: KeyCredential | TokenCredential,
  options: ContentUnderstandingClientOptionalParams = {},
): ContentUnderstandingContext {
  const endpointUrl = options.endpoint ?? `${endpoint}/contentunderstanding`;
  // ...
}
```

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
- `src/contentUnderstandingClient.ts` - Client wrapper with API customizations (Fix 3, 7 & 11)
- `src/api/contentUnderstandingContext.ts` - Client context factory (Fix 11)
- `src/static-helpers/urlTemplate.ts` - URL template expansion (Fix 8 & 9)
