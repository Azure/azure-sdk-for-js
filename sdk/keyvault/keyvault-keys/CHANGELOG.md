# Release History

## 4.0.0-preview.9 (2019-10-31)
- `deleteKey` and `recoverDeletedKey` are now out of the public API.
  Use `beginDeleteKey` and `beginRecoverDeletedKey` instead.
  They both return a Poller (from our package `@azure/core-lro`) that manages the long running operation.
- Renamed `Key` to `KeyVaultKey`.

## 4.0.0-preview.8 (2019-10-09)

- Updated to use the latest version of `@azure/core-tracing`, `@azure/identity`, `@azure/core-http` and `@azure/core-arm` packages

## 4.0.0-preview.7 (2019-10-08)

- API Changes:
  - Nested classes are now flattened into a "properties" property.
  - The algorithm used and the original keyID are now available as part of the returned values from the CryptographyClient's encrypt, decrypt, wrapKey, sign, signData, verify and verifyData methods.

## 4.0.0-preview.5 (2019-09-11)

- Improved the tests, the README and upgraded dependencies.
- Added the browser folder to the released bundle.

## 4.0.0-preview.3 (2019-08-06)

- Added a new CryptographyClient to handle cryptography tasks.
- Added browser support.
- Added support for challenge-based authentication.
- Added preview capabilities for @Azure/core-tracing.

## 4.0.0-preview.2 (2019-07-03)

- Fix broken links for API references and samples.
- Update custom user agent string to include the right package name and version.

## 4.0.0-preview.1 (2019-06-28)

For release notes and more information please visit
https://aka.ms/azure-sdk-preview1-js
