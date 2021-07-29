# Release History

## 4.3.0 (2021-07-29)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.

## 4.2.0 (2021-06-15)

### Bug Fixes

- Fixed an issue with `beginDeleteCertificate` and `beginRecoverDeletedCertificate` in which unknown service errors wouldn't bubble up properly to the end users.
- Fixed an issue where importing a certificate incorrectly required a Subject or Subject Alternative Name.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.
- Marked `ErrorModel` as deprecated. It was erroneously exported publicly in 4.1 and should not be used. Please change the type to use `CertificateOperationError` instead.

### Changes since 4.2.0-beta.3

- Marked `ErrorModel` as deprecated. It was erroneously exported publicly in 4.1 and should not be used. Please change the type to use `CertificateOperationError` instead.
- Fixed a bug with `beginDeleteCertificate` and `beginRecoverDeletedCertificate` in which unknown service errors wouldn't bubble up properly to the end users.
- Renamed the `KeyVaultCertificateId` to `KeyVaultCertificateIdentifier`, and exported a method to parse Key Vault Certificate Ids: `parseKeyVaultCertificateIdentifier`.

## 4.2.0-beta.3 (2021-04-06)

- Updated the Latest service version to 7.2.
- Added a sample demonstrating how to import PFX / PEM certificates.
- Fixed an issue where importing a certificate incorrectly required a Subject or Subject Alternative Name.
- Improved tracing across the various KeyVault libraries. By switching to a consistent naming convention, ensuring spans are always closed appropriately, and setting the correct status when an operation errors developers can expect an improved experience when enabling distributed tracing.
  - We now ensure tracing spans are properly closed with an appropriate status when an operation throws an exception.
  - If a traced operation throws an exception we will now properly record the exception message in the tracing span.
  - Finally, naming conventions have been standardized across the KeyVault libraries taking the format of `Azure.KeyVault.<PACKAGE NAME>.<CLIENT NAME>`.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.

## 4.2.0-beta.2 (2021-02-09)

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).
- Updated the Key Vault Certificates Long Running Operation Pollers to follow a more compact and meaningful approach moving forward.
- Bug fix: The logging of HTTP requests wasn't properly working - now it has been fixed and tests have been written that verify the fix.
- [Breaking] Removed `parseKeyVaultCertificatesIdentifier` from the public API.

## 4.2.0-beta.1 (2020-09-11)

- Added `parseKeyVaultCertificatesIdentifier` and `ParsedKeyVaultCertificatesIdentifier` to help with parsing the unique identifiers of Key Vault Certificates.

## 4.1.0 (2020-08-12)

4.1.0 had changes both relative to the last GA release, `4.0.4`, and the last preview release, `4.1.0-preview.1`.

### Changes since 4.0.2

- Added the optional `serviceVersion` property to the `CertificateClient` optional parameters to control the version of the Key Vault service being used by the client.
  - It defaults to the latest supported API version, which currently is `7.1`.
  - Other supported service version at the moment is `7.0`.
- Added `recoverableDays` as an optional property to `CertificateProperties` which denotes the number of days in which the certificate can be recovered after deletion. This is only applicable for Azure Key Vaults with the soft-delete setting enabled.
- Now using `Poller` and `PollerLike` from the latest `@azure/core-lro` instead of `KVPoller` and `KVPollerLike`.
  - `KVPollerLike` is now an alias of `PollerLike`.
  - `KVPollerLike` is considered deprecated. Use `PollerLike`.
- If the policy in the options has contentType `application/x-pem-file` when using the `importCertificate`
  method, we now encode the bytes of the certificate as an ASCII string instead of base64 which is the default
  treatment. This is to fix [bug 7407](https://github.com/Azure/azure-sdk-for-js/issues/7407)

### Changes since 4.1.0-preview.1

- Renamed the `apiVersion` property to the `CertificateClient` constructor as `serviceVersion`.
- Moved from service version `7.1-preview` to `7.1`.

## 4.0.2 (2020-06-01)

- Fixed [bug 9005](https://github.com/Azure/azure-sdk-for-js/issues/9005), which caused parallel requests to throw if one of them needed to authenticate.
- Fixed [bug 9020](https://github.com/Azure/azure-sdk-for-js/issues/9020), which caused updateCertificateProperties to not properly send the certificate attributes to the service.

## 4.0.1 (2020-05-13)

- Fixed [bug 8378](https://github.com/Azure/azure-sdk-for-js/issues/8378), which caused the challenge based authentication to re-authenticate on every new request.

## 4.1.0-preview.1 (2020-03-10)

- Added the optional `apiVersion` property to the `CertificateClient` optional parameters.
  It defaults to the latest supported API version, which currently is `7.1-preview`.
- Added `recoverableDays` as an optional property to `KeyProperties`.
- Fixed a bug on `importCertificate`. The bytes of a PEM formatted certificate were being encoded again on base64.
  Now, if the user provides a policy with contentType `application/x-pem-file`, the bytes will be assumed to be formatted using ASCII,
  and thus will be sent as is.

## 4.0.0 (2020-01-07)

This release marks the general availability of the `@azure/keyvault-certificates` package.

## 4.0.0-preview.12 (2019-12-26)

- Updated the long-running operation poller so that it's easier to get information for intermediate states
- beginRecoverDeletedCertificate now returns a certificate with a policy
- Flattened properties of CertificateIssuer to make them easier to get to
- Version parameter in updateCertificateProperties is now optional
- Made a new type, CertificateKeyType, to represent the JsonWebKeyType
- Some additional properties are now readonly to better match the underlying service
- Renamed property -> properties in CertificateIssuer

## 4.0.0-preview.11 (2019-12-03)

- To better align keyvault-certificate APIs across languages, we've made a number of improvements and updates. For the full list, please see https://github.com/Azure/azure-sdk-for-js/issues/6291
- Long-running operations are now done through 'pollers' which will poll the long-running operation to see when it has completed
- Cancellation of a certificate request now happens on the poller rather than via the client
- Removed an unused core-arm dependency
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

## 4.0.0-preview.9 (2019-11-04)

- Updated dependencies to use the latest version of the `@azure/core-*` libraries.
- Renamed `Certificate` to `KeyVaultCertificate`.
- Ensured that all the optional parameters have this format `{PascalCaseMethodName}Options`.
- Date properties now end in `On`.
- Anything `.*CertificateContacts.*` was changed to be `.*Contacts.*` except for the main class `CertificateContacts`.
- Anything `.*CertificateIssuers.*` was changed to be `.*Issuers.*` except for the main class `CertificateIssuers`.
- `restoreCertificate` is now `restoreCertificateBackup`.
- `AdministratorDetails` is now `AdministratorContact`.
- `getCertificateWithPolicy` was renamed `getCertificate` and `getCertificate` was renamed `getCertificateVersion`.

## 4.0.0-preview.8 (2019-10-09)

- Updated to use the latest version of `@azure/core-tracing`, `@azure/core-http` and `@azure/core-arm` packages

## 4.0.0-preview.7 (2019-10-08)

- API Changes:
  - Nested classes are now flattened into a "properties" property.
  - createCertificate now receives any of the flattened properties as the third parameter.
  - The Certificate type now can have an optional policy property, which replaces the CertificateWithPolicy type.

## 4.0.0-preview.6 (2019-09-17)

- Fixed the path of the main TypeScript types. Issue: https://github.com/Azure/azure-sdk-for-js/issues/5166

## 4.0.0-preview.5 (2019-09-11)

- Released keyvault-certificates.
