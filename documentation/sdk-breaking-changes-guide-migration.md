# Azure JavaScript SDK Breaking Changes Review and Resolution Guide for TypeSpec Migration

The Azure JavaScript SDK generally prohibits breaking changes unless they result from service behavior modifications. This guide helps you identify, review, and resolve breaking changes that may occur in new SDK versions due to migration of service specifications from Swagger to TypeSpec.

Breaking changes can be resolved by:

1. Client Customizations

Client customizations should be implemented in a file named `client.tsp` located in the service's specification directory alongside the main entry point `main.tsp`.

```tsp
import "./main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Azure.ClientGenerator.Core;

// Add your customizations here
```

2. TypeSpec Configuration Changes

TypeSpec configuration changes should be made in the `tspconfig.yaml` file located in the service's specification directory. This file is used to configure the TypeSpec compiler and client generator options. For example:

```yaml
options:
  "@azure-tools/typespec-ts":
```

## Breaking Changes That Can Be Resolved with Client Customizations or Configurations

### 1. Client Naming Changes

**Changelog Pattern**:

```md
- Deleted Class AdvisorManagementClient
```

**Spec Pattern**:

The client name is derived from the service `namespace`, not from the `@service` title.

```tsp
@service(#{ title: "AdvisorManagementClient" })
namespace Microsoft.Advisor;
```

**Breaking**: The generated client class is named after the namespace (e.g. `AdvisorClient`),
so the previously released client (`AdvisorManagementClient`) is deleted, breaking any code that
imported or constructed it.

**Reason**: Naming convention difference. TypeSpec derives the client class name from the
`namespace` name rather than the `@service` title that the Swagger emitter used.

**Resolution**:

Use the client name from the removal entry (the name after `Deleted Class`) as the target name to
restore:

```tsp
@@clientName(Microsoft.Advisor, "AdvisorManagementClient", "javascript");
```

### 2. Renamed Model or Enum

**Changelog Pattern**:

Paired removal/addition (or a removed type alias / enum) for a model or enum:

```md
- Removed Type Alias IpFamily
- Removed Enum KnownIpFamily
- Added Type Alias IPFamily
- Added Enum KnownIPFamily
```

**Spec Pattern**:

Find the type using the added name; casing or namespace differences cause the rename.

```tsp
union IPFamily {
  string,
  IPv4: "IPv4",
  IPv6: "IPv6",
}
```

**Breaking**: A model/enum/type-alias is renamed (e.g. `IpFamily` → `IPFamily`), so code
referencing the old exported name breaks.

**Reason**: Naming convention difference. The TypeSpec emitter preserves the original spec casing
(`IPFamily`), while the Swagger emitter produced the de-cased `IpFamily`. This also applies to
models and enums renamed by namespace changes.

**Resolution**:

```tsp
@@clientName(Microsoft.ContainerService.IPFamily, "IpFamily", "javascript");
```

### 3. Naming Changes with Numbers

**Changelog Pattern**:

Enum values whose names are numbers get an emitter-generated prefix instead of the word-based
name:

```md
- Enum KnownAlertSeverity no longer has value Zero
- Enum KnownAlertSeverity no longer has value One
- Enum KnownAlertSeverity added value AlertSeverity0
- Enum KnownAlertSeverity added value AlertSeverity1
```

**Spec Pattern**:

```tsp
union AlertSeverity {
  int32,
  `0`: 0,
  `1`: 1,
}
```

**Breaking**: Numeric enum member names (`0`, `1`) are not valid identifiers, so the emitter
prefixes them with the enum type name (`AlertSeverity0`, `AlertSeverity1`), replacing the
word-based names (`Zero`, `One`) the Swagger emitter produced.

**Reason**: Emitter change. The Swagger emitter converted numeric names to words; the TypeSpec
emitter preserves the numeric source name and prefixes it to make a valid identifier.

**Resolution**:

```tsp
@@clientName(AlertSeverity.`0`, "Zero", "javascript");
@@clientName(AlertSeverity.`1`, "One", "javascript");
```

### 4. Operation Naming Changes

**Changelog Pattern**:

An operation is renamed: the released name is removed (breaking) and the new emitter-generated name
is added (Features Added), confirming a rename rather than a deletion:

```md
# Breaking Changes
- Removed operation ManagementGroups.listDescendants

# Features Added
- Added operation ManagementGroups.getDescendants
```

**Spec Pattern**:

The operation is a list operation (marked with `@list`), but the spec op name starts with `get`:

```tsp
interface ManagementGroups {
  @list
  @get
  @action("descendants")
  getDescendants is Extension.ActionSync<...>;
}
```

**Breaking**: The released SDK exposed the operation as `listDescendants`; the TypeSpec emitter names
it after the spec op (`getDescendants`), so callers of `ManagementGroups.listDescendants` break.

**Reason**: Emitter change. The TypeSpec emitter generates the operation name from the spec op name,
which may differ from the name the Swagger-based SDK exposed.

**Resolution**:

Restore the released operation name (from the removal entry) with `@@clientName`:

```tsp
@@clientName(ManagementGroups.getDescendants, "listDescendants", "javascript");
```


### 5. Removal of Flattened Properties

**Changelog Pattern**:

A model loses several direct properties (which move under a `properties` bag):

```md
- Interface Identity no longer has parameter clientId
- Interface Identity no longer has parameter principalId
- Interface Identity no longer has parameter tenantId
- Interface Identity has a new required parameter properties
```

**Spec Pattern**:

```tsp
model Identity {
  properties?: IdentityProperties;
}

model IdentityProperties {
  clientId?: string;
  principalId?: string;
  tenantId?: string;
}
```

**Breaking**: Convenience properties that used to be flattened onto the model (e.g.
`identity.clientId`) are now nested under `identity.properties.clientId`, so direct property
access breaks.

**Reason**: Emitter/spec-structure change. TypeSpec preserves the real REST API hierarchy instead
of flattening the `properties` bag as the Swagger emitter did.

**Resolution**:

Restore the flattened surface with `Legacy.flattenProperty`:

```tsp
#suppress "@azure-tools/typespec-azure-core/no-legacy-usage" "SDK backward compatibility"
@@Azure.ClientGenerator.Core.Legacy.flattenProperty(Identity.properties, "javascript");
```

### 6. Removal of `begin*` Long-Running Operation Methods

**Changelog Pattern**:

Each long-running operation loses its released `begin<Op>` and `begin<Op>AndWait` methods:

```md
- Removed operation ApiDefinitions.beginExportSpecification
- Removed operation ApiDefinitions.beginExportSpecificationAndWait
- Removed operation ApiDefinitions.beginImportSpecification
- Removed operation ApiDefinitions.beginImportSpecificationAndWait
- Removed operation Services.beginExportMetadataSchema
- Removed operation Services.beginExportMetadataSchemaAndWait
```

**Breaking**: The released SDK exposed each long-running operation through the
`begin<Op>` / `begin<Op>AndWait` method pair (returning `SimplePollerLike<OperationState<T>, T>`
and `Promise<T>`). By default the TypeSpec emitter generates only the new single-method form
(e.g. `exportMetadataSchema`), so callers of the `begin*` methods break.

**Reason**: Emitter change. The TypeSpec (`@azure-tools/typespec-ts`) emitter no longer emits the
`begin*` poller methods by default.

**Resolution**:

Set `compatibility-lro: true` in the `@azure-tools/typespec-ts` options of `tspconfig.yaml`. This
re-emits the deprecated `begin<Op>` / `begin<Op>AndWait` methods (and `beginList<Op>AndWait` for
LRO + paging operations) alongside the new method, restoring the released API surface:

```yaml
options:
  "@azure-tools/typespec-ts":
    compatibility-lro: true
```

---

## Breaking Changes That Can Be Accepted

These generally cannot (or should not) be resolved through client customizations or configurations
and are shipped in a new major version.

### 1. Common Types Upgrade

**Changelog Pattern**:

```md
- Interface Resource no longer has parameter etag
- Interface Resource no longer has parameter location
- Interface Resource no longer has parameter tags
- Type of parameter error of interface ErrorResponse is changed from ErrorDefinition to ErrorDetail
```

**Breaking**: Common infrastructure types (`Resource`, `Operation`, `OperationDisplay`, error
models, etc.) are replaced by their latest ARM common-types equivalents. Some properties move to a
different base type (e.g. `etag`/`location`/`tags` move from `Resource` to `TrackedResource`), and
some type names change (e.g. `ErrorDefinition` → `ErrorDetail`, `Display` → `OperationDisplay`).

**Reason**: Common types are upgraded to their latest versions during TypeSpec migration.

**Resolution**: Accept these breaking changes.

### 2. Removal of Unreferenced Models

**Changelog Pattern**:

```md
- Removed Interface Resource
- Removed Interface ProxyResource
- Removed Interface ErrorResponse
- Removed Interface ErrorAdditionalInfo
```

**Breaking**: Public interfaces that are not referenced by any operation or model are removed.

**Reason**: Spec-structure change. Unreferenced types are dropped during TypeSpec migration.

**Resolution**: Accept these breaking changes.

### 3. Removal of List-Result (Pageable) Models

**Changelog Pattern**:

```md
- Removed Interface MeshRevisionProfileList
- Removed Interface OutboundEnvironmentEndpointCollection
```

**Breaking**: Response-wrapper models for list/paging operations (whose only properties are `value`
and optionally `nextLink`) are no longer generated. In addition, `maxPageSize` is removed from
`PageSettings`, and the continuation token is now returned directly from the `byPage()` result.

**Reason**: Emitter change. The new JS SDK exposes list operations via
`PagedAsyncIterableIterator` and does not emit the wrapper model.

**Resolution**: Accept these breaking changes.

### 4. Options Interface Renamed (`OptionalParams` → `Options`)

**Changelog Pattern**:

```md
- Removed Interface XxxCreateOptionalParams
```

**Breaking**: An operation's options interface is renamed from `XxxOptionalParams` to `XxxOptions`.

**Reason**: Emitter change.

**Resolution**: Accept these breaking changes.

### 5. Response / Header Wrapper Removal

**Changelog Pattern**:

```md
- Removed Interface XxxResponse
- Removed Interface XxxHeaders
- Removed Interface XxxNextResponse
```

**Breaking**: The old SDK generated `XxxResponse` wrapper types (including response headers) plus
`XxxHeaders` and `XxxNextResponse` types. The new SDK returns the raw model directly.

**Reason**: Emitter change.

**Resolution**: Accept these breaking changes.

### 6. Discriminator Inline Union → `string` / Named Type

**Changelog Pattern**:

```md
- Type of parameter type of interface Activity is changed from "Container" | "Execution" | ... to string
- Type alias "ActivityUnion" has been changed
```

**Breaking**: Two related effects share one root cause. First, the old SDK generated inline literal
unions for discriminator properties (e.g., `type: "KeyVault" | "AppConfig"`); the new SDK
generates `string` or a named type alias (e.g., `type: AzureResourceType` where
`AzureResourceType = string`). This also applies when Swagger had `type: string` without
`x-ms-enum` but AutoRest inferred a fixed union from discriminator subtypes. Second, **cascading**
from that change, every union type alias that includes the affected discriminator base as a
constituent (e.g. `ActivityUnion`) also changes, surfacing as `Type alias "XxxUnion" has been
changed`.

**Reason**: Emitter change.

**Resolution**: Accept these breaking changes.

### 7. Removal of `string`-Backed Type Aliases and Their `Known*` Enums

**Changelog Pattern**:

```md
- Removed Type Alias AmazonRdsForOraclePartitionOption
- Removed Type Alias AvroCompressionCodec
- Removed Enum KnownAmazonRdsForOraclePartitionOption
- Removed Enum KnownAvroCompressionCodec
```

**Breaking**: The old SDK generated a named type alias (e.g. `type XxxOption = string`) for
constrained string properties, plus a companion `KnownXxx` enum listing the known values. The
new SDK inlines these properties as `string` directly, so both the type alias and its paired
`Known*` enum are removed together.

**Reason**: Emitter change. The TypeSpec emitter represents extensible/constrained string values as
plain `string` rather than a named alias + `Known*` enum pair.

**Resolution**: Accept these breaking changes.
