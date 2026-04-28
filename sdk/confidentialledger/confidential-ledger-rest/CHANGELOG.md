# Release History

## 1.1.2-beta.5 (Unreleased)

### Features Added

- Added `getLedgerEntry(client, transactionId, options?)` helper that polls
  `GET /app/transactions/{transactionId}` until the entry is in the `Ready`
  state, mirroring the .NET `ConfidentialLedgerClient.GetLedgerEntry` behavior.
  Up to `MAX_LOADING_RETRIES` (10) additional attempts are made; non-200
  responses are returned immediately.
- Added `waitForLedgerEntryCommit(client, transactionId, options?)` helper that
  polls `GET /app/transactions/{transactionId}/status` with the same retry
  semantics as the .NET `PostLedgerEntryOperation`:
  - HTTP 406 is treated as `Pending` indefinitely and resets the
    consecutive-404 counter.
  - HTTP 404 is tolerated for up to `MAX_NOT_FOUND_RETRIES` (3) consecutive
    responses before being surfaced as a failure.
  - HTTP 200 resets the consecutive-404 counter and returns once `state` is no
    longer `Pending`.
- Both helpers honor an optional `AbortSignalLike` and a configurable
  `pollingIntervalInMs` (default 500ms; tests can set 0 to skip sleeping).

### Other Changes

- Updated the README `Get a Ledger Entry By Transaction Id` sample to use the
  new `getLedgerEntry` helper, removing the manual polling loop.

## 1.1.2-beta.4 (2026-02-18)

### Bugs Fixed

- Fixed redirect handling to preserve the `Authorization` header when Confidential Ledger redirects write operations from a secondary node to the primary node (307 redirect). Previously, the default redirect policy stripped the `Authorization` header, causing 401 Unauthorized errors.

## 1.1.2-beta.3 (2025-05-28)

### Bugs Fixed

- Updated IsUnexpected method signature and corrected api-version to 2024-12-09-preview in confidentialLedger.ts

## 1.1.2-beta.2 (2025-05-01)

### Bugs Fixed

- Added missed models in previous release

## 1.1.2-beta.1 (2025-04-23)

### Features Added

- User defined endpoint
- User defined endpoint runtimeoptions
- User defined endpoint modules
- User defined roles
- User defined functions support on ledger API
- User List endpoint

## 1.0.0 (2022-07-18)

- Pageable collections and consortium endpoints
- Renaming ledgerUri to ledgerEndpoint
- postLedgerEntry changed to createLedgerEntry

## 1.0.0-beta.2 (2021-05-12)

- First release of package, see README.md for details.
