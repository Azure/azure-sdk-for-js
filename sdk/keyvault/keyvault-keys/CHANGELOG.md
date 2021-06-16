# Release History

## 4.2.1 (2021-06-15)

### Bug Fixes

- Fixed an issue where bundling could fail when importing this library due to an incorrectly set import.

## 4.2.0 (2021-06-15)

### New Features

- Added support for local cryptography operations. If supported by the key type and algorithm, the `CryptographyClient` will attempt to perform a cryptography operation locally.
- Added support for symmetric keys in Managed HSMs including support for AES encryption algorithms to encrypt, decrypt, wrap, and unwrap using symmetric keys.
- Added support for the 7.2 version of the Key Vault service API.

### Bug Fixes

- Fixed a bug with `beginDeleteKey` and `beginRecoverDeletedKey` in which unknown service errors wouldn't bubble up properly to the end users.
- Fixed bug with the list operations which were returning misplaced properties. Fixes customer issue: [15353](https://github.com/Azure/azure-sdk-for-js/issues/15353).
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.

### Changes since 4.2.0-beta.5:

- Removed the now obsolete `KeyOperationsOptions` and replaced it with `CryptographyOptions`.
  - Introduced in 4.2.0-beta.1 to support additional encryption parameters for AES encryption, we have since moved these parameters outside of the options bag so a separate `KeyOperationsOptions` is now redundant.
- Fixed a bug with `beginDeleteKey` and `beginRecoverDeletedKey` in which unknown service errors wouldn't bubble up properly to the end users.
- Fixed bug with the list operations which were returning misplaced properties. Fixes customer issue: [15353](https://github.com/Azure/azure-sdk-for-js/issues/15353).
- Exported a method to parse Key Vault Key Ids: `parseKeyVaultKeyIdentifier`.

## 4.2.0-beta.5 (2021-04-06)

- Added local cryptography support for encryption / decryption for `A128CBCPAD`, `A192CBCPAD`, and `A256CBCPAD`.
- For AES-CBC encryption we will now generate an IV if the user did not pass it in, making `iv` optional for those parameters.
- Improved tracing across the various KeyVault libraries. By switching to a consistent naming convention, ensuring spans are always closed appropriately, and setting the correct status when an operation errors developers can expect an improved experience when enabling distributed tracing.
  - We now ensure tracing spans are properly closed with an appropriate status when an operation throws an exception.
  - If a traced operation throws an exception we will now properly record the exception message in the tracing span.
  - Finally, naming conventions have been standardized across the KeyVault libraries taking the format of `Azure.KeyVault.<PACKAGE NAME>.<CLIENT NAME>`.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.
- [Breaking] Removed the now unused `LocalCryptographyAlgorithmName` type (Added in 4.2.0-beta.1 to support `LocalCryptographyClient` and unused since 4.2.0-beta.4)
- Updated `CryptographyClient` to ensure that any local cryptography error is properly handled. We will now try to perform the operation locally where we can but fallback to KeyVault if the local operation fails.

## 4.2.0-beta.4 (2021-03-09)

- Updated the Latest service version to 7.2.
- Added `curve` to `createKeyOptions` to be used when creating an `EC` key.
- Deprecated the current `encrypt` and `decrypt` methods in favor of the more flexible overloads that take an `{Encrypt|Decrypt}Parameters` and allow passing in algorithm specific parameters. This enables support for the various AES algorithms used in Managed HSM. The deprecated methods continue to function and there's no timeline for their removal.
- Added `additionalAuthenticatedData`, `iv`, and `authenticationTag` to `EncryptResult` in order to support AES encryption and decryption.
- Refactored the various cryptography providers and updated the error messages to be clearer and more descriptive.

## 4.2.0-beta.3 (2021-02-09)

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md).
- Updated the Key Vault Keys Long Running Operation Pollers to follow a more compact and meaningful approach moving forward.
- Bug fix: The logging of HTTP requests wasn't properly working - now it has been fixed and tests have been written that verify the fix.
- Added a constructor overload to `CryptographyClient` that takes a `JsonWebKey` and allows for local-only subset of operations.
- Added `KeyId` to the public API of CryptographyClient.
- [Breaking] Removed `parseKeyVaultKeysId` from the public API and made `KeyOptionsOptions.additionalAuthenticatedData` a readonly property.
- Added a `createOctKey` convenience method to create a key of type `oct` or `oct-HSM` as appropriate.

## 4.2.0-beta.2 (2020-10-06)

- Added the `oct-HSM` type to `KeyType`.
- Added encryption, decryption, wrapping and unwrapping service support for the algorithms "A128GCM", "A192GCM", "A256GCM", "A128KW", "A192KW", "A256KW", "A128CBC", "A192CBC", "A256CBC", "A128CBCPAD", "A192CBCPAD", "A256CBCPAD".
- The encryption, decryption, wrapping and unwrapping operations now support the following optional parameters:
  - `additionalAuthenticatedData`, Additional data to authenticate but not encrypt/decrypt when using authenticated cryptography algorithms.
  - `iv`, the initialization vector for symmetric algorithms.
  - `tag`, the tag to authenticate when performing decryption with an authenticated algorithm.

## 4.2.0-beta.1 (2020-09-11)

- Added `parseKeyVaultKeysIdentifier` and `ParsedKeyVaultKeysIdentifier` to help with parsing the unique identifiers of Key Vault Keys.
- Added the basic structure of a new client to perform local cryptography operations, which is now called `LocalCryptographyClient`.
  - The existing `CryptographyClient`, when initialized, will create one instance of a local cryptography client, which can be retrieved by calling to a new method that is part of the `CryptographyClient` class: `getLocalCryptographyClient()`.
  - The `LocalCryptographyClient` currently has limited support of the cryptography operations available on the `CryptographyClient`. More operations will be added over time.

## 4.1.0 (2020-08-12)

4.1.0 had changes both relative to the last GA release, `4.0.4`, and the last preview release, `4.1.0-preview.1`.

- Added the optional serviceVersion property to the KeyClient and CryptographyClient optional parameters to control the version of the Key Vault service being used by the clients.
  - It defaults to the latest supported API version, which currently is 7.1.
  - Other supported service version at the moment is 7.0.
- Added import to the list of possible values for KeyOperation.
- Added recoverableDays as an optional property to KeyProperties which denotes the number of days in which the key can be recovered after deletion. This is only applicable for Azure Key Vaults with the soft-delete setting enabled.
- Fixed bug 10352, which caused cryptography operations on RSA-HSM keys to fail.
- Renamed the apiVersion property to the KeyClient constructor as serviceVersion.
- Moved from service version 7.1-preview to 7.1.

## 4.0.4 (2020-06-01)

- Fixed [bug 9005](https://github.com/Azure/azure-sdk-for-js/issues/9005), which caused parallel requests to throw if one of them needed to authenticate.

## 4.0.3 (2020-05-13)

- Fixed [bug 8378](https://github.com/Azure/azure-sdk-for-js/issues/8378), which caused the challenge based authentication to re-authenticate on every new request.

## 4.1.0-preview.1 (2020-03-10)

- Added the optional `apiVersion` property to the `KeyClient` and `CryptographyClient` optional parameters.
  It defaults to the latest supported API version, which currently is `7.1-preview`.
- Added `import` to the list of possible values for `KeyOperation`.
- Added `recoverableDays` as an optional property to `KeyProperties`.

## 4.0.2 (2019-12-03)

- Updated dependencies to their latest available versions.
- Fixed the support of dotenv while testing.
- Improved the available documentation, and added a README in the test folder.
- KeyClient's vaultUrl property is now public, but readonly.
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`.

## 4.0.0 (2019-10-31)

- This release marks the general availability of the `@azure/keyvault-keys` package.
- All of the public API methods now have their custom option types.
- All of the option types can now receive a `requestOptions` parameter to customize the options sent to the HTTP client.
- Made the `getKey` method and the `key` property on the `CryptographyClient` private.
- Removed publicly accessible properties that referenced the `pipeline` and the `credential` used during the creation of both the `KeyClient` and the `CryptographyClient`.

## 4.0.0-preview.9 (2019-10-22)

- `deleteKey` and `recoverDeletedKey` are now out of the public API.
  Use `beginDeleteKey` and `beginRecoverDeletedKey` instead.
  They both return a Poller (from our package `@azure/core-lro`) that manages the long running operation.
- Renamed `Key` to `KeyVaultKey`.
- Renamed `Key.KeyMaterial` to `KeyVaultKey.Key`.
- All dates should end in "On", except for `notBefore` and `scheduledPurgedDate`.
- All options should match the method's name.
- All methods that return keyProperties (like the ones that iterate) should contain "propertiesOf" in their names.
- Flattened all the options bag to extend the `RequestOptionsBase` interface.

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
https://aka.ms/azsdk/releases/july2019preview
