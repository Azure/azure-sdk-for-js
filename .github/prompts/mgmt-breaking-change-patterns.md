# Architect-Approved Breaking Changes (HLC to Modular)

Reference file for the [breaking-change analysis agent](../agents/mgmt-breaking-change-analysis.agent.md).

This file lists breaking changes that have been **reviewed and approved by the architect team** for the HLC (Swagger/AutoRest) to Modular (TypeSpec/emitter) migration. Source: [Azure/autorest.typescript#3361](https://github.com/Azure/autorest.typescript/issues/3361).

**How to use this file**: The agent should **first investigate each breaking change independently** to find the real root cause. Only after identifying the root cause, check this file to see if it matches a known approved breaking. If it does, note it in the report so the user knows it was previously approved. **Do NOT use this file to skip investigation or assume root causes.**

---

## Approved Breakings

### 1. Operation `list` Renaming

**Source**: [#3241](https://github.com/Azure/autorest.typescript/issues/3241)

When TypeSpec uses the standard ARM operations template (`interface Operations extends Azure.ResourceManager.Operations {}`), the operation name may change from a custom name (e.g., `Operations_ListAll`) to the standard name (`Operations_List`).

**CHANGELOG symptom**: `Removed operation Operations.listAll` or `Operation Operations.list has a new signature`

### 2. Orphan Enum/Model Removal

**Source**: [#3241](https://github.com/Azure/autorest.typescript/issues/3241)

Modular (TypeSpec emitter) only exports types that are **reachable** from operation signatures. Any type not referenced by any operation is pruned (tree-shaken). HLC (AutoRest) generated all types regardless of usage.

**CHANGELOG symptom**: `Removed Interface Xxx`, `Removed Type Alias Xxx`, `Removed Enum KnownXxx` -- where the type has no usage in any operation.

### 3. Common Type Name Changes

**Source**: [#3218](https://github.com/Azure/autorest.typescript/issues/3218)

When TypeSpec switches from self-defined types to ARM common types, the type name changes (e.g., `ResourceIdentity` -> `ManagedServiceIdentity`).

**CHANGELOG symptom**: `Type of parameter identity of interface Xxx is changed from ResourceIdentity to ManagedServiceIdentity`

### 4. `subscriptionId`/`apiVersion` Not on Client

**Source**: [#3049](https://github.com/Azure/autorest.typescript/issues/3049)

HLC exposed `subscriptionId` and `apiVersion` as client-level properties. Modular stores them in internal ClientContext and does not expose them on the client class.

**CHANGELOG symptom**: `Interface XxxClient no longer has parameter subscriptionId`, `Interface XxxClient no longer has parameter apiVersion`

### 5. Paging Interface Changes

**Source**: [#2696](https://github.com/Azure/autorest.typescript/issues/2696)

- `maxPageSize` removed from `PageSettings`
- `getContinuationToken` helper removed
- Continuation token now returned directly in `byPage()` return value
- List/collection wrapper types (e.g., `XxxListResult`, `XxxCollection`) internalized or removed; operations return `PagedAsyncIterableIterator<T>` directly

**CHANGELOG symptom**: `Removed Interface XxxListResult`, `Removed Interface XxxCollection`, `Removed function getContinuationToken`

### 6. Options Interface Naming

**Source**: [#2352](https://github.com/Azure/autorest.typescript/issues/2352)

Operation options interface renamed from `XxxOptionalParams` to `XxxOptions`.

**CHANGELOG symptom**: `Removed Interface XxxOptionalParams` (replaced by `XxxOptions`)

### 7. Response Wrapper Removal

**Source**: [#2360](https://github.com/Azure/autorest.typescript/issues/2360), [#2384](https://github.com/Azure/autorest.typescript/issues/2384)

HLC generated `XxxResponse` wrapper types that included response headers. Modular returns the raw model directly. Also `XxxNextResponse` types for paging and `XxxHeaders` interfaces are removed.

**CHANGELOG symptom**: `Removed Interface XxxResponse`, `Removed Interface XxxHeaders`, `Removed Interface XxxNextResponse`

### 8. Operation Group Naming

**Source**: [#2351](https://github.com/Azure/autorest.typescript/issues/2351)

Operation group interface has `Operations` suffix added (e.g., `DataProducts` -> `DataProductsOperations`).

**CHANGELOG symptom**: `Removed Interface DataProducts` (replaced by `DataProductsOperations`)

### 9. Core Client/Operation Options Changes

**Source**: [#2396](https://github.com/Azure/autorest.typescript/issues/2396)

**Client level**:
- `ServiceClientOptions` -> `ClientOptions`
- `baseUri` -> `baseUrl`
- `credential` (TokenCredential) removed as separate property
- `credentialScopes` -> `credentials.scopes`
- `requestContentType` removed

**Operation level**:
- `serializerOptions` removed from `OperationOptions`
- `RawResponseCallback` signature changed (removed `flatResponse` parameter)
- `requestOptions.customHeaders` -> `requestOptions.headers`
- `requestOptions.shouldDeserialize` removed

**CHANGELOG symptom**: Various property removal/change entries on client and options interfaces.

### 10. Discriminator Inline Union -> String/Named Type

**Source**: [#3388](https://github.com/Azure/autorest.typescript/issues/3388), [#3496](https://github.com/Azure/autorest.typescript/issues/3496)

HLC generated inline literal unions for discriminator properties (e.g., `type: "KeyVault" | "AppConfig"`). Modular generates `string` or a named type alias (e.g., `type: AzureResourceType` where `AzureResourceType = string`).

Also: when swagger has `type: string` without `x-ms-enum` but AutoRest inferred a fixed union from discriminator subtypes, Modular generates `string` directly.

**CHANGELOG symptom**: `Type of parameter xxx of interface Yyy is changed from "A" | "B" to string` or `to XxxType`
