# API Extractor and provisioning schema comparison

## Scope

This report compares the provisioning schema with all API Extractor outputs for
the package:

- Schema: [schema.json](schema.json)
- Complete Node.js API: [provisioning-keyvault-node.api.md](../review/provisioning-keyvault-node.api.md)
- Node.js model-only API: [provisioning-keyvault-types-node.api.md](../review/provisioning-keyvault-types-node.api.md)
- Browser differences: [provisioning-keyvault-browser.api.diff.md](../review/provisioning-keyvault-browser.api.diff.md)
  and [provisioning-keyvault-types-browser.api.diff.md](../review/provisioning-keyvault-types-browser.api.diff.md)

The comparison treats the schema as the wire/provisioning description and the
API report as the TypeScript developer surface. Consequently, generated input,
view, expression, and resource convenience APIs are listed as representational
differences rather than schema coverage failures.

## Summary

| Area | Schema | API Extractor result | Finding |
| --- | ---: | ---: | --- |
| Model definitions | 63 | 63 corresponding base declarations | Complete |
| Resource types | 12 | 12 corresponding resource classes | Complete |
| Model properties | All | All, after the five `exp`/`nbf` client-name mappings below | Complete |
| Requiredness | Per schema | Base interfaces preserve it through required/optional members | Equivalent |
| Read-only metadata | 125 properties across definitions and resources | Reflected by input omission, read-only views, and missing resource setters | Equivalent |
| API declarations | Not applicable | 295 in the complete Node.js report | API has generated convenience declarations |

No missing model, missing resource, missing property, requiredness conflict, or
mutability conflict was found. The differences are TypeScript projections,
client-facing names, type conversions, schema-only metadata, and runtime report
formatting.

## 1. Declaration expansion in the TypeScript API

The schema has 63 object definitions. Each becomes four public API declarations:

1. The base model interface, such as `VaultProperties`.
2. An `Input` interface for values accepted during provisioning.
3. A `View` interface or alias for values exposed from a resource.
4. A runtime `Shape` constant used by provisioning-core.

This accounts for 252 declarations: 63 base models plus 189 generated helpers.
Of the 63 views, 28 are aliases of their input types because they contain no
read-only properties; the other 35 are interfaces that distinguish writable and
read-only members.

The complete API adds the following declarations that have no direct top-level
schema entries:

- 12 resource classes.
- 8 resource `Props` interfaces for writable resources.
- 23 semantic aliases used to name enum-like string values.

The resulting total is 295 declarations. The `./types` entry point intentionally
omits the 12 resource classes and 8 resource `Props` interfaces, leaving the
model-related surface only.

## 2. Client-facing property names

The only model property-name differences are wire-name to client-name mappings.
Requiredness and mutability are unchanged.

| Model | Schema property | TypeScript property |
| --- | --- | --- |
| `KeyAttributesReadonly` | `exp` | `Expires` |
| `KeyAttributesReadonly` | `nbf` | `NotBefore` |
| `KeyVaultKeyAttributes` | `exp` | `Expires` |
| `KeyVaultKeyAttributes` | `nbf` | `NotBefore` |
| `KeyVaultManagedHsmKeyAttributes` | `exp` | `Expires` |
| `KeyVaultManagedHsmKeyAttributes` | `nbf` | `NotBefore` |
| `ManagedHsmKeyAttributesReadonly` | `exp` | `Expires` |
| `ManagedHsmKeyAttributesReadonly` | `nbf` | `NotBefore` |
| `SecretAttributes` | `exp` | `Expires` |
| `SecretAttributes` | `nbf` | `NotBefore` |

## 3. Type representation differences

### Dates and times

The API uses JavaScript `Date` values where the schema carries a wire-oriented
string or integer representation.

| Schema locations | Schema representation | TypeScript representation |
| --- | --- | --- |
| `DeletedManagedHsmProperties.deletionDate`, `DeletedManagedHsmProperties.scheduledPurgeDate` | `string` | `Date` |
| `DeletedVaultProperties.deletionDate`, `DeletedVaultProperties.scheduledPurgeDate` | `string` | `Date` |
| `ManagedHsmProperties.scheduledPurgeDate` | `string` | `Date` |
| `SecretAttributes.created`, `exp`, `nbf`, `updated` | `int` with `unixTimestamp` encoding | `Date` |

### Encoded bytes

The following schema properties are strings with `base64url` encoding and
`bytes` as their source kind. The API exposes each as `Uint8Array`:

- `KeyReleasePolicyReadonly.data`
- `KeyVaultKeyReleasePolicy.data`
- `KeyVaultManagedHsmKeyReleasePolicy.data`
- `ManagedHsmKeyReleasePolicyReadonly.data`

### JavaScript and TypeScript projections

Other systematic conversions are:

- Schema `int` becomes TypeScript `number`.
- Schema records become `Record<string, T>`; in particular,
  `ManagedServiceIdentity.userAssignedIdentities` becomes
  `Record<string, UserAssignedIdentity | null>`.
- Schema object references become the referenced interface.
- Schema arrays become TypeScript arrays; enum-like element strings use the
  semantic aliases listed below.
- Input members are wrapped in `ExpressionOrValue<T>`, `InputArray`, or
  `InputRecord` so literal values and provisioning expressions are both accepted.
- Read-only view members are wrapped in `Expression<T>` and marked `readonly`.

## 4. Enum representation

The schema makes a distinction between closed enums (`type: "enum"`) and
extensible strings that also provide known values (`type: "string"` with
`enumValues`). The API preserves that distinction.

### Closed enums preserved as unions

| TypeScript alias | Schema values | Used by |
| --- | --- | --- |
| `CreateMode` | `"recover" | "default"` | `ManagedHsmProperties.createMode`, `VaultProperties.createMode` |
| `KeyRotationPolicyActionType` | `"rotate" | "notify"` | The four key-rotation action models |
| `SkuName` | `"standard" | "premium"` | `Sku.name` |

### Extensible known-value sets widened to `string`

The known values remain in the schema but are not enforced by the TypeScript
type system. This permits service values added in the future.

| TypeScript alias | Known schema values |
| --- | --- |
| `ActionsRequired` | `None` |
| `ActivationStatus` | `Active`, `NotActivated`, `Unknown`, `Failed` |
| `CertificatePermissions` | `all`, `get`, `list`, `delete`, `create`, `import`, `update`, `managecontacts`, `getissuers`, `listissuers`, `setissuers`, `deleteissuers`, `manageissuers`, `recover`, `purge`, `backup`, `restore` |
| `DeletionRecoveryLevel` | `Purgeable`, `Recoverable+Purgeable`, `Recoverable`, `Recoverable+ProtectedSubscription` |
| `JsonWebKeyCurveName` | `P-256`, `P-384`, `P-521`, `P-256K` |
| `JsonWebKeyOperation` | `encrypt`, `decrypt`, `sign`, `verify`, `wrapKey`, `unwrapKey`, `import`, `release` |
| `JsonWebKeyType` | `EC`, `EC-HSM`, `RSA`, `RSA-HSM`, `oct-HSM` |
| `KeyPermissions` | `all`, `encrypt`, `decrypt`, `wrapKey`, `unwrapKey`, `sign`, `verify`, `get`, `list`, `create`, `update`, `import`, `delete`, `backup`, `restore`, `recover`, `purge`, `release`, `rotate`, `getrotationpolicy`, `setrotationpolicy` |
| `ManagedHsmSkuFamily` | `B`, `C` |
| `ManagedHsmSkuNameV2` | `Standard_B1`, `Custom_B32`, `Custom_B6`, `Custom_C42`, `Custom_C10` |
| `ManagedServiceIdentityType` | `None`, `SystemAssigned`, `UserAssigned`, `SystemAssigned,UserAssigned` |
| `NetworkRuleAction` | `Allow`, `Deny` |
| `NetworkRuleBypassOptions` | `AzureServices`, `None` |
| `PrivateEndpointServiceConnectionStatus` | `Pending`, `Approved`, `Rejected`, `Disconnected` |
| `PublicNetworkAccess` | `Enabled`, `Disabled` |
| `SecretPermissions` | `all`, `get`, `list`, `set`, `delete`, `backup`, `restore`, `recover`, `purge` |
| `SkuFamily` | `A` |
| `StoragePermissions` | `all`, `get`, `list`, `delete`, `set`, `update`, `regeneratekey`, `recover`, `purge`, `backup`, `restore`, `setsas`, `listsas`, `getsas`, `deletesas` |
| `TokenBindingMode` | `Enforced`, `NotEnforced` |
| `TokenBindingStrength` | `NoValidation`, `Unattested`, `AttestedTrustedLaunch`, `AttestedConfidential` |

## 5. Schema-only default metadata

The schema marks 17 properties with `hasDefault: true`. API Extractor cannot
show that metadata in a type declaration because all of these properties remain
optional. The affected properties are:

| Group | Properties |
| --- | --- |
| Key attributes | `KeyAttributesReadonly.exportable`, `KeyVaultKeyAttributes.exportable` |
| Key release policies | `KeyReleasePolicyReadonly.contentType`, `KeyVaultKeyReleasePolicy.contentType`, `KeyVaultManagedHsmKeyReleasePolicy.contentType`, `ManagedHsmKeyReleasePolicyReadonly.contentType` |
| Managed HSM | `ManagedHsmProperties.enablePurgeProtection`, `enableSoftDelete`, `publicNetworkAccess`, `softDeleteRetentionInDays` |
| Vault | `VaultProperties.enabledForDeployment`, `enabledForDiskEncryption`, `enabledForTemplateDeployment`, `enableRbacAuthorization`, `enableSoftDelete`, `publicNetworkAccess`, `softDeleteRetentionInDays` |

The schema also retains wire encodings, API-version values, and the
`readOnlyResource` marker. API Extractor reports TypeScript types and therefore
does not expose those metadata values directly. For example, resource classes
publish `apiVersion` as `string`, not as the literal schema value
`"2026-03-01-preview"`.

## 6. Resource projection

Every schema resource has a corresponding class:

| Schema resource type | API class |
| --- | --- |
| `Microsoft.KeyVault/locations/deletedManagedHSMs` | `DeletedManagedHsm` |
| `Microsoft.KeyVault/locations/deletedVaults` | `DeletedVault` |
| `Microsoft.KeyVault/managedHSMs` | `ManagedHsm` |
| `Microsoft.KeyVault/managedHSMs/keys` | `ManagedHSMKey` |
| `Microsoft.KeyVault/managedHSMs/keys/versions` | `KeyVaultManagedHsmKey` |
| `Microsoft.KeyVault/managedHSMs/privateEndpointConnections` | `ManagedHSMPrivateEndpointConnection` |
| `Microsoft.KeyVault/vaults` | `KeyVault` |
| `Microsoft.KeyVault/vaults/accessPolicies` | `AccessPolicy` |
| `Microsoft.KeyVault/vaults/keys` | `VaultKey` |
| `Microsoft.KeyVault/vaults/keys/versions` | `Version` |
| `Microsoft.KeyVault/vaults/privateEndpointConnections` | `VaultPrivateEndpointConnection` |
| `Microsoft.KeyVault/vaults/secrets` | `Secret` |

All schema resource properties appear as class getters. Except for `name`, a
setter exists exactly when the schema property is writable. The `name` property
is schema-read-only but is writable on the eight creatable resource classes so
callers can choose a deployment name; it is optional in each corresponding
`Props` interface because the provisioning layer can generate a name. The four
read-only resources have getter-only names and constructors that require
`ExistingResourceProps`.

`KeyVault.location` is required in the schema but optional in `KeyVaultProps`.
This is a provisioning convenience because the deployment context can supply a
default location; the class setter itself does not accept `undefined`.

The API also adds eight child-resource collection getters that have no property
entry in the schema:

| Parent class | API-only child collections |
| --- | --- |
| `KeyVault` | `accessPolicies`, `secrets`, `vaultKeys`, `vaultPrivateEndpointConnections` |
| `ManagedHsm` | `managedHsmKeys`, `managedHsmPrivateEndpointConnections` |
| `ManagedHSMKey` | `keyVaultManagedHsmKeys` |
| `VaultKey` | `versions` |

Constructors, `buildResourceProps`, `resourceType`, `apiVersion`, and
`namingRules` are likewise API-only resource infrastructure derived from schema
metadata.

## 7. Browser report difference

Both browser diff reports contain one generated naming difference around
`Permissions`:

- The browser declaration is emitted internally as `Permissions_2` and then
  re-exported as `Permissions`.
- `AccessPolicyEntry.permissions` and `PermissionsInput` refer to
  `Permissions_2` inside that report.

The exported browser symbol remains `Permissions`, so this does not change the
public meaning and has no schema counterpart. No other Node.js/browser API
difference is reported.

## Conclusion

The API Extractor output is structurally complete relative to the schema. The
observable differences are expected projections:

- wire names mapped to client names;
- wire primitives converted to JavaScript types;
- closed versus extensible enum handling;
- schema metadata that is not expressible in declarations;
- generated input/view/shape and resource convenience APIs; and
- a browser-only internal alias for `Permissions`.

There is no uncovered schema element or contradictory public API signature in
the compared outputs.