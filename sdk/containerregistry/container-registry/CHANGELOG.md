# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Added new properties to allow easier interaction with other docker tools:
  - `loginServer` in `ContainerRegistryClient`.
  - `fullyQualifiedName` in `ContainerRepository`

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
