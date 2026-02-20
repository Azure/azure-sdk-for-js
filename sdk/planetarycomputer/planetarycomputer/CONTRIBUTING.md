# Contributing to @azure/planetarycomputer

This document contains instructions for regenerating the SDK from TypeSpec and any manual modifications that must be applied after regeneration.

## Regenerating the SDK

To regenerate the SDK from TypeSpec:

1. Update the `tsp-location.yaml` file with the desired TypeSpec commit hash
2. Run: `npx tsp-client update`
3. Apply the manual modifications documented below
4. Run linting and formatting: `pnpm run format`
5. Extract API: `pnpm run extract-api`
6. Build: `pnpm run build`
7. Run tests: `pnpm run test`

## Manual Modifications After Regeneration

The following manual changes must be applied to the generated code after each regeneration:

### 1. WMTS XML Deserialization Fix

**File:** `src/api/data/operations.ts`

**Problem:** The TypeSpec emitter generates code that incorrectly treats WMTS capabilities XML responses as base64-encoded bytes. The WMTS endpoints return plain XML text with `contentType: "application/xml"`, but the TypeSpec model uses `@body body: bytes`, which causes the emitter to generate base64 decoding logic.

**Fix:** Replace the generated base64 decoding with direct UTF-8 encoding for both WMTS deserializer functions:

#### Function 1: `_getMosaicsWmtsCapabilitiesDeserialize`

Replace:
```typescript
export async function _getMosaicsWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}
```

With:
```typescript
export async function _getMosaicsWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  // WMTS capabilities returns XML text, not base64-encoded bytes.
  // Convert the XML string directly to UTF-8 bytes.
  return typeof result.body === "string" ? new TextEncoder().encode(result.body) : result.body;
}
```

#### Function 2: `_getWmtsCapabilitiesDeserialize`

Apply the same fix to `_getWmtsCapabilitiesDeserialize`:

Replace:
```typescript
export async function _getWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}
```

With:
```typescript
export async function _getWmtsCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  // WMTS capabilities returns XML text, not base64-encoded bytes.
  // Convert the XML string directly to UTF-8 bytes.
  return typeof result.body === "string" ? new TextEncoder().encode(result.body) : result.body;
}
```

### 2. Remove Unused Import (if present)

**File:** `src/api/data/operations.ts`

After applying the WMTS fixes, the `stringToUint8Array` import from `@azure/core-util` may become unused. If so, remove it:

```typescript
// Remove this line if no longer used:
import { stringToUint8Array } from "@azure/core-util";
```

## Root Cause

This issue originates from the TypeSpec definition where the WMTS response model is defined as:

```typespec
model WmtsCapabilitiesXmlResponse {
  @header contentType: "application/xml";
  @body body: bytes;
}
```

The `bytes` type causes the JavaScript emitter to generate base64 decoding logic, but the actual response is plain XML text. A proper fix would require changes to the TypeSpec definition or emitter customization, but until then, the manual fix must be applied.
