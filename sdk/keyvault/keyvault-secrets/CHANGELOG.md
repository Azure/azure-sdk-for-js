# Release History

## 4.1.0 (2020-08-12)

4.1.0 had changes both relative to the last GA release, `4.0.4`, and the last preview release, `4.1.0-preview.1`.

### Changes since 4.0.4

- Added the optional `serviceVersion` property to the `SecretClient` optional parameters to control the version of the Key Vault service being used by the client.
    - It defaults to the latest supported API version, which currently is `7.1`.
    - Other supported service version at the moment is `7.0`.
- Added `recoverableDays` as an optional property to `SecretProperties` which denotes the number of days in which the secret can be recovered after deletion. This is only applicable for Azure Key Vaults with the soft-delete setting enabled.

### Changes since 4.1.0-preview.1

- Renamed the `apiVersion` property to the `SecretClient` constructor as `serviceVersion`.
- Moved from service version `7.1-preview` to `7.1`.

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
