# Release History

## 4.10.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.10.0 (2025-06-10)

### Features Added

- Added support for service API version `7.6` which is now the default. [#32947](https://github.com/Azure/azure-sdk-for-js/pull/32947)
- Added support for `KeyClient.getKeyAttestation` which can be used to retrieve the key along with its attestation blob from a managed HSM. [#32947](https://github.com/Azure/azure-sdk-for-js/pull/32947)

### Other Changes

- Generate code from TypeSpec. This is an internal change that should not affect customers. [#31845](https://github.com/Azure/azure-sdk-for-js/pull/31845)

## 4.10.0-beta.1 (2025-03-11)

### Features Added

- Added support for service API version `7.6-preview.2`. [#32947](https://github.com/Azure/azure-sdk-for-js/pull/32947)
- Added support for `KeyClient.getKeyAttestation` which can be used to retrieve the key along with its attestation blob from a managed HSM. [#32947](https://github.com/Azure/azure-sdk-for-js/pull/32947)

### Other Changes

- Generate code from TypeSpec. This is an internal change that should not affect customers. [#31845](https://github.com/Azure/azure-sdk-for-js/pull/31845)

## 4.9.0 (2024-10-16)

### Features Added

- Add support for Continuous Access Evaluation (CAE). [#31140](https://github.com/Azure/azure-sdk-for-js/pull/31140)

### Other Changes

- Native ESM support has been added, and this package will now emit both CommonJS and ESM. [#31332](https://github.com/Azure/azure-sdk-for-js/pull/31332)

## 4.8.0 (2024-02-14)

### Features Added

Since 4.7.2:

- Added `hsmPlatform` property to `KeyProperties`.

### Other Changes

- The default service version is now `7.5`.

## 4.8.0-beta.1 (2023-11-08)

### Features Added

- Added `hsmPlatform` property to `KeyProperties`.

### Other Changes

- The default service version is now `7.5-preview.1`.

## 4.7.2 (2023-08-10)

### Bugs Fixed

- Fixed a bug where `listPropertiesOfKeysVersions` failed to retrieve the second page of results. Issue [#26547](https://github.com/Azure/azure-sdk-for-js/issues/26547); PR [#26584](https://github.com/Azure/azure-sdk-for-js/pull/26584).
- Bumped `@azure/core-rest-pipeline` dependency to version including the `isRestError` helper, which was used in PR [#26016](https://github.com/Azure/azure-sdk-for-js/issues/26016).

## 4.7.1 (2023-06-06)

### Bugs Fixed

- Fixed an issue where cryptographic operations would fail if the client did not have the get permission on the key, even if it had permission for the underlying operation. Issue [#26001](https://github.com/Azure/azure-sdk-for-js/issues/26001); PR [#26016](https://github.com/Azure/azure-sdk-for-js/issues/26016)

## 4.7.0 (2023-03-09)

### Breaking Changes

- Removed support for OKP key types as introduced in 4.7.0-beta.1. These changes are only breaking for customers consuming the 4.7.0-beta.1 API, and do not affect those consuming a stable release such as 4.6.0.
  - Removed `OKP` and `OKP-HSM` from `KnownKeyTypes`.
  - Removed `EdDSA` from `KnownSignatureAlgorithms`.
  - Removed `Ed25519` from `KnownKeyCurveNames`.

### Other Changes

- `KeyClient` and `CryptographyClient` now support service version 7.4 by default.

## 4.7.0-beta.1 (2022-11-10)

- Added support for [Octet Key Pair (OKP)](https://datatracker.ietf.org/doc/html/rfc8037) key types as well as `sign`, `verify`, `signData`, and `verifyData` cryptography operations when using OKP keys.
  - Added support for the Ed25519 curve for the creation of OKP keys.

## 4.6.0 (2022-09-20)

### Breaking Changes

- Verify the challenge resource matches the vault domain.
  This should affect few customers who can set `disableChallengeResourceVerification` in the options bag to `true` to disable.
  See https://aka.ms/azsdk/blog/vault-uri for more information.

## 4.5.0 (2022-08-09)

### Breaking Changes

- Migrated to the Core v2 HTTP pipeline. As a result of this migration:
  - The response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag, for example:
    ```ts
    let rawResponse: FullOperationResponse | undefined;
    await client.operationName(/* ...parameters... */, {
      onResponse: (response) => (rawResponse = response),
    });
    ```
  - The re-export of the `PipelineOptions` type from `@azure/core-http` has been removed. If you previously relied on this export, consider either using the more specific `CertificateClientOptions` type or importing `PipelineOptions` from `@azure/core-http` directly.

### Other Changes

- Documentation fixes.

## 4.5.0-beta.1 (2022-07-07)

### Breaking Changes

- As a result of the migration to Core v2:
  - The response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag, for example:
    ```ts
    let rawResponse: FullOperationResponse | undefined;
    await client.operationName(/* ...parameters... */, {
      onResponse: (response) => (rawResponse = response),
    });
    ```
  - The re-export of the `PipelineOptions` type from `@azure/core-http` has been removed. If you previously relied on this export, consider either using the more specific `CertificateClientOptions` type or importing `PipelineOptions` from `@azure/core-http` directly.

### Other Changes

- Migrated the generated client to `@azure/core-rest-pipeline` ("Core v2"). See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.

## 4.4.0 (2022-03-24)

### Features Added

- Added support for `KeyClient.getRandomBytes` which, when connected to a managed HSM, can be used to generate a byte array of a given length with random values.
- Added support for Secure key Release from a Managed HSM.
  - Added `KeyClient.releaseKey` to release a key from a Managed HSM.
  - Added `exportable` and `releasePolicy` to `KeyVaultKey.properties`, `createKeyOptions`, and `importKeyOptions` in order to specify whether the key is exportable and to associate a release policy to a given key.
- Added support for automated key rotation in Azure Key Vault and Managed HSM.
  - Added `KeyClient.rotateKey` to rotate a key on-demand.
  - Added `KeyClient.updateKeyRotationPolicy` to update a key's automated rotation policy.
- Added support for `KeyClient.getCryptographyClient(keyName, options)` which provides a simple way to create a `CryptographyClient` for a given key (identified by its name).
  - An optional `keyVersion` property may be used in the `options` parameter to create a cryptography client targeting a specific key version. The latest version is used by default.

### Other Changes

- This release updates `KeyClient` and `CryptographyClient` to support service version 7.3 by default.

## 4.4.0-beta.4 (2022-02-08)

### Features Added

- Added `KeyReleasePolicy#immutable` flag to support immutable release policies. Once a release policy is marked as immutable, it can no longer be modified.

## 4.4.0-beta.3 (2021-11-09)

### Features Added

- Support multi-tenant authentication against Key Vault and Managed HSM when using @azure/identity 2.0.0 or newer.

### Breaking Changes

- `KeyClient.getRandomBytes` will now return the generated bytes directly instead of wrapping them in a `RandomBytes` model.
  - Since it's no longer used, `RandomBytes` has been removed from the public API.
- `KeyReleasePolicy.data` has been renamed to `KeyReleasePolicy.encodedPolicy`.
- `KeyClient.releaseKey`'s `target` parameter has been renamed to `targetAttestationToken`.

## 4.4.0-beta.2 (2021-10-05)

### Features Added

- Added support for `KeyClient.getCryptographyClient(keyName, options)` which provides a simple way to create a `CryptographyClient` for a given key (identified by its name).
  - An optional `keyVersion` property may be used in the `options` parameter to create a cryptography client targeting a specific key version. The latest version is used by default.
- Added support for automated key rotation in Azure Key Vault.
  - Added `KeyClient.rotateKey` to rotate a key on-demand.
  - Added `KeyClient.updateKeyRotationPolicy` to update a key's automated rotation policy.

## 4.4.0-beta.1 (2021-08-10)

### Features Added

- Added support for Secure key Release from a Managed HSM.
  - Added `KeyClient.releaseKey` to release a key from a Managed HSM.
  - Added `exportable` and `releasePolicy` to `KeyVaultKey.properties`, `createKeyOptions`, and `importKeyOptions` in order to specify whether the key is exportable and the associated release policy.
- Added an overload to `KeyClient.updateKeyProperties` that allows the version to be omitted, updating the latest key version.
- Added support for `KeyClient.getRandomBytes` which, when connected to a managed HSM, can be used to generate a byte array of a given length with random values.
- Updated the service version to 7.3-preview.

## 4.3.0 (2021-07-29)

### New Features

- Support for Node.js 8 and IE 11 has been dropped. Please see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 to produce smaller bundles and use more native platform features.
- Updated our internal core package dependencies to their latest versions to add support for Opentelemetry 1.0.0, which is compatible with the latest versions of our other client libraries.

## 4.3.0-beta.1 (2021-07-07)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Added support for `KeyClient.getRandomBytes` which, when connected to a managed HSM, can be used to generate a byte array of a given length with random values.
- Updated the service version to 7.3-preview.

## 4.2.2 (2021-07-07)

### Key Bugs Fixed

- Fixed an issue where `CryptographyClient.signData` and `CryptographyClient.verifyData` convenience methods would fail to find a valid hashing algorithm when using Elliptic Curve keys.

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

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).
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
