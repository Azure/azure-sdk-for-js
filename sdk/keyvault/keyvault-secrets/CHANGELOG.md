# Release History

## 4.3.0 (2021-07-29)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.

## 4.2.0 (2021-06-15)

### New Features

- Added support for the 7.2 version of the Key Vault service API.

### Bug Fixes

- Fixed a bug with `beginDeleteSecret` and `beginRecoverDeletedSecret` in which unknown service errors wouldn't bubble up properly to the end users.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.
- Added a `certificateKeyId?: string` secret property to use instead of the deprecated `keyId?: URL` and removed `"lib": ["dom"]` from `tsconfig.json`

### Changes since 4.2.0-beta.4:

- Fixed a bug with `beginDeleteSecret` and `beginRecoverDeletedSecret` in which unknown service errors wouldn't bubble up properly to the end users.
- Renamed the `KeyVaultSecretId` to `KeyVaultSecretIdentifier`, and exported a method to parse Key Vault Secret Ids: `parseKeyVaultSecretIdentifier`.

## 4.2.0-beta.4 (2021-04-06)

- Improved tracing across the various KeyVault libraries. By switching to a consistent naming convention, ensuring spans are always closed appropriately, and setting the correct status when an operation errors developers can expect an improved experience when enabling distributed tracing.
  - We now ensure tracing spans are properly closed with an appropriate status when an operation throws an exception.
  - If a traced operation throws an exception we will now properly record the exception message in the tracing span.
  - Finally, naming conventions have been standardized across the KeyVault libraries taking the format of `Azure.KeyVault.<PACKAGE NAME>.<CLIENT NAME>`.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.

## 4.2.0-beta.3 (2021-03-09)

- Updated the Latest service version to 7.2.
- Added a `certificateKeyId?: string` secret property to use instead of the deprecated `keyId?: URL` and removed `"lib": ["dom"]` from `tsconfig.json`
- Added `recoveryId`, `scheduledPurgeDate`, and `deletedOn` to a deleted secret's top-level attributes and deprecated these attributes from the deleted secret's `properties` collection.

## 4.2.0-beta.2 (2021-02-09)

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).
- Updated the Key Vault Secrets Long Running Operation Pollers to follow a more compact and meaningful approach moving forward.
- Bug fix: The logging of HTTP requests wasn't properly working - now it has been fixed and tests have been written that verify the fix.

## 4.2.0-beta.1 (2020-09-11)

- Added `parseKeyVaultSecretsIdentifier` and `ParsedKeyVaultSecretsIdentifier` to help with parsing the unique identifiers of Key Vault Secrets.

## 4.1.0 (2020-08-12)

4.1.0 had changes both relative to the last GA release, `4.0.4`, and the last preview release, `4.1.0-preview.1`.

## 4.0.4 (2020-06-01)

- Fixed [bug 9005](https://github.com/Azure/azure-sdk-for-js/issues/9005), which caused parallel requests to throw if one of them needed to authenticate.

## 4.0.3 (2020-05-13)

- Fixed [bug 8378](https://github.com/Azure/azure-sdk-for-js/issues/8378), which caused the challenge based authentication to re-authenticate on every new request.

## 4.1.0-preview.1 (2020-03-10)

- Added the optional `apiVersion` property to the `SecretClient` optional parameters.
  It defaults to the latest supported API version, which currently is `7.1-preview`.
- Added `recoverableDays` as an optional property to `SecretProperties`.

## 4.0.2 (2019-12-04)

- Updated dependencies to their latest available versions.
- Fixed the support of dotenv while testing.
- Improved the available documentation, and added a README in the test folder.
- KeyClient's vaultUrl property is now public, but readonly.
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`.

## 4.0.0 (2019-10-31)

- This release marks the general availability of the `@azure/keyvault-secrets` package.
- All of the public API methods now have their custom option types.
- All of the option types can now receive a `requestOptions` parameter to customize the options sent to the HTTP client.
- Renamed `restoreSecret` to `restoreSecretBackup`.
- Removed publicly accessible properties that referenced the `pipeline` and the `credential` used during the creation of both the `KeyClient` and the `CryptographyClient`.

## 4.0.0-preview.9 (2019-10-22)

- `deleteSecret` and `recoverDeletedSecret` are now out of the public API.
  Use `beginDeleteSecret` and `beginRecoverDeletedSecret` instead.
  They both return a Poller (from our package `@azure/core-lro`) that manages the long running operation.
- Renamed `Secret` to `KeyVaultSecret`.
- Renamed most of the date properties to end in the `On` suffix.
- All options should match the method's name.
- All methods that return keyProperties (like the ones that iterate) should contain "propertiesOf" in their names.
- Flattened all the options bag to extend the `RequestOptionsBase` interface.

## 4.0.0-preview.8 (2019-10-09)

- Updated to use the latest version of `@azure/core-tracing`, `@azure/identity`, `@azure/core-http` and `@azure/core-arm` packages

## 4.0.0-preview.7 (2019-10-08)

- API Change: Nested classes are now flattened into a "properties" property.

## 4.0.0-preview.5 (2019-09-11)

- Improved the tests, the README and upgraded dependencies.
- Added the browser folder to the released bundle.

## 4.0.0-preview.4 (2019-08-09)

- Fixed the missing TypeScript types by adding back the generated `.d.ts` file to the package.json

## 4.0.0-preview.3 (2019-08-06)

- Added browser support.
- Added support for challenge-based authentication.

## 4.0.0-preview.2 (2019-07-03)

- Fix broken links for API references and samples.
- Update custom user agent string to include the right package name and version.

## 4.0.0-preview.1 (2019-06-28)

For release notes and more information please visit
https://aka.ms/azsdk/releases/july2019preview
