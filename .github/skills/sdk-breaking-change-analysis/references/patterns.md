# Breaking Change Pattern Catalog

## Table of Contents

- [Type 2 Patterns (Emitter/Migration)](#type-2-patterns-emittermigration)
  - [Pattern 1: Operation Signature Changes](#pattern-1-operation-signature-changes)
  - [Pattern 2: List/Collection Interfaces Removed](#pattern-2-listcollection-interfaces-removed)
  - [Pattern 3: Discriminator Type Changes](#pattern-3-discriminator-type-changes)
  - [Pattern 4: Union Type Alias Changes](#pattern-4-union-type-alias-changes)
  - [Pattern 5: Base Resource Interfaces Removed](#pattern-5-base-resource-interfaces-removed)
  - [Pattern 6: SystemData Properties Removed](#pattern-6-systemdata-properties-removed)
  - [Pattern 7: Properties Flattened/Un-flattened](#pattern-7-properties-flattenedun-flattened)
  - [Pattern 8: AutoRest Naming Artifacts Removed](#pattern-8-autorest-naming-artifacts-removed)
  - [Pattern 9: Query Parameter Interfaces Removed](#pattern-9-query-parameter-interfaces-removed)
  - [Pattern 10: Type Renames from TypeSpec Naming](#pattern-10-type-renames-from-typespec-naming)
  - [Pattern 11: Resource.location Removed](#pattern-11-resourcelocation-removed)
  - [Pattern 12: Resource Hierarchy Changed](#pattern-12-resource-hierarchy-changed)
- [Type 1 Patterns (API Version Upgrade)](#type-1-patterns-api-version-upgrade)

---

## Type 2 Patterns (Emitter/Migration)

### Pattern 1: Operation Signature Changes

**Symptom:** `Operation Xxx.beginYyy has a new signature`

**Root cause:** Inner model/discriminator type changes propagating to operation signatures.

`Promise<XxxResponse>` -> `Promise<Model>` is NOT the real breaking -- the type alias removal alone is not breaking since `XxxResponse` was just an alias for `Model`. The REAL breaking is a model referenced in the signature has an inner type change (typically a discriminator property changing from literal union to `string` -- see Pattern 3).

**Workflow for tracing root causes:**
1. Find the discriminator/property change in the return or parameter model.
2. Check if the same change also causes a union alias change (Pattern 4).
3. Present all three as a single causal chain in a unified root cause table.
4. One discriminator change can affect multiple union aliases and multiple operations.
5. If you cannot determine the root cause, list it separately for manual verification.

**Sub-patterns:**
- **Void return**: LRO delete/abort operations that returned header types now return `void`
- **Sync -> LRO**: Operations defined with `ArmResourceCreateOrUpdateAsync` in TypeSpec may change from sync to LRO
- **Deprecated begin* methods**: Still use `SimplePollerLike`; only new primary methods use `PollerLike`
- **Resource property changes**: Models extending only `Resource` may change due to `eTag/location/tags` removal (Pattern 11)

### Pattern 2: List/Collection Interfaces Removed

**Symptom:** `Removed Interface XxxList` or `Removed Interface XxxCollection`

List wrapper types internalized as `_XxxList` (underscore prefix, not exported). Operations return `PagedAsyncIterableIterator<T>` directly. Old interfaces had `value: T[]`, `nextLink?: string`.

### Pattern 3: Discriminator Type Changes (Extensible Enums)

**Symptom:** `Type of parameter xxx of interface Yyy is changed from "A" | "B" | "C" to string` (or to a named type like `XxxType`)

Inline string literal unions replaced by `string` or named type aliases. TypeSpec emitter generates `KnownXxx` enums + `type Xxx = string` for extensibility. Runtime behavior unchanged; TypeScript narrowing may be affected.

Some changes go to named types (e.g., `BackupEngineType`, `ProtectableContainerType`) rather than raw `string` -- still Type 2.

### Pattern 4: Union Type Alias Changes

**Symptom:** `Type alias "XxxUnion" has been changed`

The real breaking is the inner discriminator type change in the base type (Pattern 3), not the ordering. Always trace to the root cause.

- One discriminator change can propagate to multiple union aliases (e.g., `RecoveryPoint.objectType` affects 4 unions)
- Non-discriminator type aliases may change from literal union to `string` (extensible enum)
- Union aliases with **new members added** (not just ordering) should be checked for API version changes (Type 1)

### Pattern 5: Base Resource Interfaces Removed

**Symptom:** `Removed Interface TrackedResource`, `Removed Interface AzureProxyResource`

TypeSpec uses standard ARM types from `@azure-tools/typespec-azure-resource-manager`. Old AutoRest SDK created custom base interfaces.

### Pattern 6: SystemData Properties Removed

**Symptom:** `Interface Xxx no longer has parameter createdAt/createdBy/createdByType/lastModifiedAt/lastModifiedBy/lastModifiedByType`

Old SDK duplicated SystemData fields at both `resource.createdAt` AND `resource.systemData.createdAt`. New SDK only has `resource.systemData.createdAt`.

### Pattern 7: Properties Flattened/Un-flattened

**Symptom:** `Interface Xxx no longer has parameter properties` or individual properties moved

Check `back-compatible.tsp` for `@@Legacy.flattenProperty` decorators. JS emitter may not honor `@@Legacy.flattenProperty` in all cases.

### Pattern 8: AutoRest Naming Artifacts Removed

**Symptom:** `Removed Interface XxxAutoGenerated` or `Removed Interface XxxModelOptionalParams`

AutoRest added `AutoGenerated` suffix for naming collisions or `Model` into optional params names. TypeSpec emitter uses clean naming.

### Pattern 9: Query Parameter Interfaces Removed

**Symptom:** `Removed Interface XxxQueryParameter`

Old SDK had standalone query parameter model types. New SDK folds query parameters into each operation's `OptionalParams` interface.

### Pattern 10: Type Renames from TypeSpec Naming

**Symptom:** `Removed Interface Xxx` where the model still exists under a different name

Check TypeSpec `client.tsp` for `@clientName` decorators. Verify by searching for the model in `.tsp` files.

### Pattern 11: Resource.location Removed

**Symptom:** `Interface Resource no longer has parameter location` (also `eTag`, `tags`)

Standard ARM `Resource` base type does not include `location` or `tags`. Only `TrackedResource` (which extends `Resource`) has them. `eTag` is also not on base `Resource`.

### Pattern 12: Resource Hierarchy Changed

**Symptom:** `Parameter location of interface Xxx is now required`

Old Swagger may model a resource as extending `SubResource` with optional `location`. TypeSpec migration may remodel it as `TrackedResource` where `location` is required. This is Type 2 (migration), NOT Type 1 -- the REST API behavior doesn't change, only the SDK model hierarchy.

---

## Type 1 Patterns (API Version Upgrade)

### Pattern A: Properties/Endpoints Removed

**Symptom:** `Interface Xxx no longer has parameter yyy` (where `yyy` is NOT a SystemData field)

Verify: Check TypeSpec for `@removed(Versions.vXxx)` decorators. If the property is absent from the new API spec, it's a genuine API change.

### Pattern B: Enum Renames

**Symptom:** `Removed Type Alias Xxx` + `Removed Enum KnownXxx` where old names were generic

Verify: Check if new, more descriptive names exist (e.g., `Name` -> `AccountSkuName`).

### Pattern C: Type Tightening

**Symptom:** `Type of parameter xxx is changed from Record<string, unknown> to TypedModel`

Verify: Check if the new TypeSpec defines a typed model where the old Swagger used `object`.

### Pattern D: Model Restructuring

**Symptom:** Multiple properties added/removed on the same interface

Verify: Compare old Swagger model with new TypeSpec model definitions. Look for `@added`/`@removed` version decorators.
