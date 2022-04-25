# Release History

## 1.1.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0-beta.1 (2022-04-05)

### Features Added

- Add a new `ContainerRegistryBlobClient` to allow upload and download of OCI blobs and manifests. [PR #20529](https://github.com/Azure/azure-sdk-for-js/pull/20529)

## 1.0.0 (2022-01-11)

This release marks the general availability release of Azure Container Registry client SDK library.

### Breaking Changes

- `TagOrderBy` is renamed to `ArtifactTagOrder`.
- `ManifestOrderBy` is renamed to `ArtifactManifestOrder`.
- `size` property in `ArtifactManifestProperties` is renamed to `sizeInBytes`.

## 1.0.0-beta.6 (2021-11-09)

### Features Added

- Support passing service version via client options [PR #18067](https://github.com/Azure/azure-sdk-for-js/pull/18067).

## 1.0.0-beta.5 (2021-09-08)

### Breaking Changes

- Replace `authenticationScope` with `audience` in `ContainerRegistryClientOptions`. An extensible enum `KnownContainerRegistryAudience` is introduced which has known audience values.

## 1.0.0-beta.4 (2021-08-17)

### Breaking Changes

- `UpdateManifestPropertiesOptions` is no longer optional.

### Bug Fixes

- Fixed issue of thrown `TypeError: _a.spanContext is not a function` [Issue 16842](https://github.com/Azure/azure-sdk-for-js/issues/16842).

## 1.0.0-beta.3 (2021-06-08)

### Breaking Changes

- Split `ContentProperties` into separate `*WriteableProperties` types because they can have different properties.
- Add new type `ArtifactManifestPlatform` for manifest list in `ArtifactManifestProperties`. The property has been renamed to `relatedArtifacts`.
- Flatten `writeableProperties` in `*Properties` types.
- Rename `endpointUrl` to `endpoint` in `ContainerRegistryClient`.
- Change known os and arch types to enum so the known values can be used in string comparisons
- Update `*OrderBy` values from `"timeAsc"/"timeDesc"` to `"lastUpdatedOnAscending"/"lastUpdatedOnDescending"`
- Rename `listTags` to `listTagProperties` and `listManifests` to `listManifestProperties`
- Rename `set*Properties` function names to `update*Properties`

### Features Added

- Add `authenticationScope` properties to `ContainerRegistryClientOptions` to support national clouds.
- Add `continuationToken` to paging response types.

### Bug Fixes

- The expiry time is now retrieved from the ACR refresh token, instead of hard-coded three hours later from `Date.now()`.

## 1.0.0-beta.2 (2021-05-11)

### Features Added

- Added new properties to allow easier interaction with other docker tools:
  - `loginServer` in `ContainerRegistryClient`.
  - `fullyQualifiedName` in `ContainerRepository`
- Added support for anonymous access. See [the service documentation](https://docs.microsoft.com/azure/container-registry/container-registry-faq#how-do-i-enable-anonymous-pull-access) for more information.

### Breaking Changes

The public API surface of this library has been re-designed. Notable changes include

- Removed: `ContainerRepositoryClient`. Operations on repositories are now grouped in `ContainerRepository` type and operations on artifacts are now in `RegistryArtifact` type. Some `*Options` types are also renamed accordingly.
- Renamed: `endpoint` property is renamed to `registryUrl`.
- Renamed: `listRepositories()` is renamed to `listRepositoryNames()` in `ContainerRegistryClient`.
- Renamed: "RegistryArtifact" in property or function names replaced by "Manifest".
- Renamed: `*OrderBy` values is now capitalized as `timeDesc` and `timeAsc`. Previously they are all in lower case.

## 1.0.0-beta.1 (2021-04-06)

- Initial version of Azure Container Registry client SDK library.
- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
