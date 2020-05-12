# Release History

## 4.0.1 (2020-05-13)

- Fixed [bug 8378](https://github.com/Azure/azure-sdk-for-js/issues/8378), which caused the challenge based authentication to re-authenticate on every new request.

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
