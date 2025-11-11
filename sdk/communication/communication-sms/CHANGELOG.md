# Release History

## 1.2.0 (Unreleased)

### Features Added

- Added delivery report functionality to `SmsClient`:
  - New `SmsClient.getDeliveryReport` method for retrieving message delivery status
  - Provides detailed information including delivery status, delivery attempts, and timestamps
  - Supports tracking partner-generated message IDs via `messagingConnectPartnerMessageId` property
- Improved MessagingConnect partner integration with standard Azure SDK patterns (changed from 1.2.0-beta.4):
  - Use `Record<string, unknown>` for partner-specific parameters instead of the previous structured approach
  - Updated structure: `messagingConnect: { partnerId: "PartnerName", partnerParams: { "apiKey": "your-api-key" } }`
  - Follows Azure SDK design guidelines for flexible parameter collections
  - Migration from beta: Change `messagingConnect: { apiKey: "your-api-key", partner: "PartnerName" }` to `messagingConnect: { partnerId: "PartnerName", partnerParams: { "apiKey": "your-api-key" } }`
- Updated opt-out management to follow Azure SDK subclient guidelines:
  - Renamed `OptOuts` type to `OptOutsClient`
  - Changed from property access (`client.optOuts`) to method access (`client.getOptOutsClient()`)
  - Migration: Change `client.optOuts.check()` to `client.getOptOutsClient().check()` (same for `add()` and `remove()`)

### Other Changes

- **Redesigned Opt-Out Management API response types for improved consistency and developer experience**:
  - `OptOutAddResult` and `OptOutRemoveResult` have been unified into a single `OptOutOperationResult` type since they were functionally identical
  - `OptOutCheckResult` remains unchanged as it includes the unique `isOptedOut` property for check operations
  - Updated method signatures:
    - `OptOutsClient.check()` continues to return `Promise<OptOutCheckResult[]>`
    - `OptOutsClient.add()` and `OptOutsClient.remove()` now return `Promise<OptOutOperationResult[]>`
  - **Migration guide**:
    - Replace `OptOutAddResult` and `OptOutRemoveResult` with `OptOutOperationResult` for Add and Remove operations
    - No changes needed for `OptOutCheckResult` used in Check operations
  - This change eliminates duplicate types and provides consistent naming across all opt-out operations

## 1.2.0-beta.4 (2025-06-16)

### Features Added

- Introduced Messaging Connect support:
  - Added a new MessagingConnect field to the SmsSendOptions model.
  - The MessagingConnect structure includes:
    - apiKey: used for authenticating Messaging Connect requests.
    - partner: identifies the Messaging Connect partner.
  - Supports:
    - Incoming and outgoing flows for long codes.
    - Outgoing flow for Dynamic Alpha Sender IDs (DASID).

## 1.2.0-beta.3 (2024-12-19)

### Bugs Fixed

- Fixed Opt Out Remove action

## 1.2.0-beta.2 (2024-12-10)

### Features Added

- Added support for Opt Out Management Api to:
  - Opt-out the recipient.
  - Opt-in the recipient.
  - Check if the recipient is opted-out or not.

## 1.2.0-beta.1 (2024-05-02)

### Features Added

- Added DeliveryReportTimeoutInSeconds to smsSendOptions.

## 1.1.0 (2023-11-30)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features.

### Other Changes

- Updated to `@azure/core-tracing` 1.0.
- Updated to `@azure/communication-common` 2.2.0.

## 1.0.0 (2021-03-29)

- Stable release of `@azure/communication-sms`.

## 1.0.0-beta.4 (2021-03-09)

### Added

- `SmsClient` added a constructor that supports `TokenCredential`.
- Added support for 1:N SMS messaging.
- Added support for tagging SMS messages.
- `send` method in `SmsClient` is idempotent under retry policy.

### Breaking Changes

- `SendRequest` renamed to `SmsSendRequest`.
- `SendOptions` renamed to `SmsSendOptions` and now has an additional field `tag` to add a custom tag to delivery reports (when enabled).
- `send` no longer returns `RestResponse`, now returns an array of `SmsSendResults`. This contains fields to validate success/failure of each sent message.

## 1.0.0-beta.3 (2020-11-16)

Updated `@azure/communication-sms` version.

## 1.0.0-beta.2 (2020-10-06)

Updated `@azure/communication-sms` version.

## 1.0.0-beta.1 (2020-09-22)

The first preview of the Azure Communication Sms Client has the following features:

- send an SMS message from an acquired phone number.
- optionally enable delivery reports.
