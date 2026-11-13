# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

The first preview of the Azure Communication Recipient Verification client library has the following features:

- Verifying code for a phone number
- Request a verification code to a phone number(US)
- Removing a verified/pending phone number
- Returning the constant values for a resource in relation to recipient verification

### Breaking Changes

### Bugs Fixed

- Fixed the authentication policy being applied before the retry policy, which caused retried requests to reuse the original credentials. With a key credential, retries carried a stale `x-ms-date` header and signature and could be rejected by the service. Retried requests are now re-authenticated on every attempt. [#40786](https://github.com/Azure/azure-sdk-for-js/issues/40786)

### Other Changes
