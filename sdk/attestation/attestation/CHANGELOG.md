# Release History

## 1.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0 (2021-08-10)

### Features Added

Added hand authored implementation for policy management certificate APIs: `getPolicyManagementCertificates`, `addPolicyManagementCertificate` and `removePolicyManagementCertificate`.

Simplified the calling pattern for the Attest family of APIs.
Simplified some model types to be reflected as either parameters or interfaces.
The attestation family of APIs no longer requires authentication credentials.
The attestation family of APIs now accepts Blob objects in addition to Uint8Array
and Buffer objects as inputs.

### Breaking Changes

* Reversed the order of `credentials` and `endpoint` in `AttestationAdministrationClient` to be
  consistent with other SDKs.
* Removed `credentials` top level parameter for `AttestationClient` constructor, moved
  to the `AttestationClientOptions` object.
* Renamed the `validateToken` API in the `AttestationToken` class to `getTokenProblems` returning
  an array of strings.
* Attestation Policy APIs (`setPolicy`, `resetPolicy`) have had their `privateKey` and `certificate` parameters moved to options.
* Renamed `instanceUrl` to `endpoint` to be consistent with other APIs.
* Removed `policyCertificates` from `AttestationAdministrationClient`.
* Removed `StoredAttestationPolicy` and replaced it with `AttestationPolicyToken`.
* Removed `AttestationData` type. Instead of specifying an `AttestationData` for `initTimeData` and `runTimeData` to the Attest APIs, the attest APIs take an `initTimeJson`, `initTimeData`, `runTimeData` and `runTimeJson` object and determine
the `DataType` to send to the server based on that.
* Removed the `AttestationSigningKey` model type replaced with two parameters
  `privateKey` and `certificate` to the APIs which used to accept an `AttestationSigningKey`
* Renamed `AttestationResponse.value` to `AttestationResponse.body` to align with
 API guidelines.

## 1.0.0-beta.4 (2021-06-15)

### Features Added

* The package now contains type definitions compatible with TypeScript versions earlier than v3.6.

### Key Bugs Fixed

* Fixes the location of types definition in package.json

## 1.0.0-beta.3 (2021-06-08)

### Features Added

### Breaking Changes

* Essentially completely rewritten. All existing functionality has been replaced.
  * Removed `policy` property on `AttestationClient` object, because it has been replaced.
  * Removed `policy.reset` and `policy.set`, replaced with the `resetPolicy` and `setPolicy` methods on the `AttestationAdministrationClient`.
  * Removed `policy.get`, replaced with the `getPolicy` method of the new  `AttestationAdministrationClient` client object.
  * Removed `attestation.attestSgxEnclave`, `attestation.attestOpenEnclave`, `attestation.attestTpm`, and `attestation` property from attestationClient, replaced with `attestSgxEnclave`, `attestOpenEnclave` and `attestTpm`.
  * Removed `metadataConfiguration` and `signingCertificates` properties from attestationClient.
  * Removed `metadataConfiguration.get()` method, replaced with `client.getOpenIdMetadata()`.
  * Removed `signingCertificates.get()` method, replaced with `client.getAttestationSigners()`. The return value for `getAttestationSigners()` is an array of `AttestationSigner` objects,
  each of which has two properties: `key_id` and `certificates`. `key_id`
  reflects the `kid` JSON Web Key attribute, and `certificates` is the **decoded** `x5c` attribute
  in the JSON Web Key.

## 1.0.0-beta.2 (2021-01-19)

Regenerated Attestation SDK. The properties alg, kid and use in JsonWebKey object have been marked as optional.

## 1.0.0-beta.1 (2021-01-15)

Initial early preview release for MAA Data Plane SDK Demonstrates use of the machine generated MAA APIs.

* Initial Release
