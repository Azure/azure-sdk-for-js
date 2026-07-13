# Release History

## 2.0.0-beta.1 (2026-07-13)

### Features Added

- Regenerated SDK from TypeSpec specification targeting stable API version 2026-02-23
- Added Tags API support (ListTags)
- Added UserDefinedRole and UserDefinedRoles types for role management
- Added Stable-suffixed operation variants for user-defined endpoints and functions

### Breaking Changes

- Renamed JSRuntimeOptions to JsRuntimeOptions
- Changed some enum types to extensible string types (e.g., ApplicationClaimKindOutput, ConfidentialLedgerQueryStateOutput)
- Client constructor now uses a 2-parameter signature (endpoint, options) with credential passed through options
- Removed CreateLedgerEntryMediaTypesParam (content type now inferred)
## 1.1.2-beta.6 (2026-06-05)

### Bugs Fixed

- Fixed incorrect `Content-Type` header for user management PATCH operations. The SDK now automatically sets `Content-Type: application/merge-patch+json` for PATCH requests to `/app/users/{userId}` and `/app/ledgerUsers/{userId}`, which the service requires for API versions after `2022-04-20-preview`. Previously, omitting the `contentType` parameter caused the SDK to default to `application/json`, resulting in an `UnsupportedContentType` error from the service.

### Features Added

- Added redirect URL caching for write operations. When the Confidential Ledger load balancer issues a 307/308 redirect, the target (primary node) URL is cached so subsequent write requests skip the load balancer, reducing latency. Read requests (GET/HEAD) continue to always go through the load balancer. The cache is automatically invalidated on server errors (5xx) or transport failures.
- Added support for HTTP 308 (Permanent Redirect) status code in the redirect policy.

### Other Changes

- Hardened redirect handling in the Confidential Ledger client. Credentials and request bodies are now only forwarded on HTTPS redirects whose target hostname matches the configured ledger endpoint or one of its subdomains, with the same port. Redirects to any other target are refused.

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
