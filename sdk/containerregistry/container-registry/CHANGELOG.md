# Release History

## 1.1.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0 (2023-05-09)

### Features Added

- Added `ContainerRegistryContentClient` for uploading and downloading OCI blobs and manifests.

### Breaking Changes

Since `1.1.0-beta.3`:

- The manifest property on GetManifestResult is now `Record<string, unknown>` instead of OciImageManifest. This property is now populated regardless of the media type of the manifest, instead of only being populated when the manifest was an OCI image manifest.
- Added an `isOciImageManifest` type guard to check if a manifest is an OCI image manifest, providing strong typing.
- Renamed properties on `OciImageManifest`, `OciDescriptor`, and `OciAnnotations` to match the specification exactly:
  - Renamed `OciAnnotations.createdOn` to `created`.
  - Renamed `OciDescriptor.sizeInBytes` to `size`.
  - Renamed `OciImageManifest.configuration` to `config`.
- Removed `GetOciImageManifestResult` and the corresponding type guard, `isGetOciImageManifestResult`.

## 1.1.0-beta.3 (2023-04-11)

### Features Added

- Added support for uploading and downloading manifests of a custom media type.
  - Pass the media type of the manifest you are downloading using the `mediaType` property of `setManifest` options bag.
  - On download, OCI image manifests will be deserialized. The deserialized manifest will be available at the `manifest` property of the result from `getManifest`.
    - Manifests of other media types will not be deserialized, but manifests of all types will still be accessible using the `content` property of the result.
    - The `isGetOciImageManifestResult` type guard can be used to check if the downloaded manifest is an OCI image manifest, and therefore whether the
      `manifest` property is available on the result.

### Breaking Changes

- Renamed `ContainerRegistryBlobClient` to `ContainerRegistryContentClient`.
- Renamed `downloadManifest` and `uploadManfifest` methods on `ContainerRegistryContentClient` to `getManifest` and `setManifest` respectively.
  - Renamed `DownloadManifestOptions` and `UploadManifestOptions` types to `GetManifestOptions` and `SetManifestOptions` respectively.
- Renamed `OciManifest` to `OciImageManifest`.
  - Renamed `OciImageManifest.config` to `OciImageManifest.configuration`
  - The `configuration` and `layers` parameters on `OciImageManifest` are now required.
- Renamed `OciBlobDescriptor` type to `OciDescriptor`.
  - Renamed property `OciBlobDescriptor.size` to `OciBlobDescriptor.sizeInBytes`.

### Bugs Fixed

- Fixed a bug where an unused stream was not cleaned up when calling `deleteBlob`.

### Other Changes

- `downloadBlob` will now retry from the current stream position when an error occurs.
- Deprecated `KnownContainerRegistryAudience.AzureGermany`. Azure Germany is deprecated in favor of standard nonsovereign regions in Germany.

## 1.1.0-beta.2 (2023-02-08)

### Features Added

- `ContainerRegistryBlobClient.uploadBlob` now uploads a blob using multiple requests if the size of the blob is greater than 4MB.

### Breaking Changes

- Removed resettable stream overload for `ContainerRegistryBlobClient.uploadBlob`.

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

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
- Added support for anonymous access. See [the service documentation](https://learn.microsoft.com/azure/container-registry/container-registry-faq#how-do-i-enable-anonymous-pull-access) for more information.

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
