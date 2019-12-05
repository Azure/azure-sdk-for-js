# Release History

## 4.0.2 (2019-12-03)

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
https://aka.ms/azure-sdk-preview1-js
