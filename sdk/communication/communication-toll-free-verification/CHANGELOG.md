# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added
- Added optional `dba` (Doing Business As) field to `CampaignBrief`.

### Breaking Changes

### Bugs Fixed

- Fixed the authentication policy being applied before the retry policy, which caused retried requests to reuse the original credentials. With a key credential, retries carried a stale `x-ms-date` header and signature and could be rejected by the service. Retried requests are now re-authenticated on every attempt. [#40786](https://github.com/Azure/azure-sdk-for-js/issues/40786)

### Other Changes

## 1.0.0-beta.2 (2026-03-09)

### Features Added
- APIs for querying and managing Toll Free Verification Campaign Briefs
