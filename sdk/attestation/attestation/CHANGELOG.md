# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

- Essentially completely rewritten. All existing functionality has been replaced.
  - Removed `policy.get`, replaced with the `getPolicy` method of the new  `AttestationAdministrationClient` client object.
  - Removed `attestation.attestSgxEnclave`, `attestation.attestOpenEnclave`, `attestation.attestTpm`, and `attestation` property from attestationClient, replaced with `attestSgxEnclave`, `attestOpenEnclave` and `attestTpm`.
  - Removed `metadataConfiguration` and `signingCertificates` properties from attestationClient.
  - Removed `metadataConfiguration.get()` method, replaced with `client.getOpenIdMetadata()`.
  - Removed `signingCertificates.get()` method, replaced with `client.getAttestationSigners()`. The return value for `getAttestationSigners()` is an array of `AttestationSigner` objects,
  each of which has two properties: `key_id` and `certificates`. `key_id`
  reflects the `kid` JSON Web Key attribute, and `certificates` is the **decoded** `x5c` attribute
  in the JSON Web Key.

## 1.0.0-beta.2 (2021-01-19)

Regenerated Attestation SDK. The properties alg, kid and use in JsonWebKey object have been marked as optional.

## 1.0.0-beta.1 (2021-01-15)

Initial early preview release for MAA Data Plane SDK Demonstrates use of the machine generated MAA APIs.

- Initial Release
