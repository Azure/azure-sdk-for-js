# Release History

## 1.0.3 (Unreleased)

### Bugs Fixed

- Add types that are missing from public API surface.

## 1.0.1 (2025-06-27)

### Bugs Fixed

- Correct property name `resourceUri` in `ResourceAction*EventData`.

## 1.0.0 (2025-06-26)

### Other Changes

The EventGrid System Events client library is now in GA with this release.

## 1.0.0-beta.7 (2025-05-14)

### Features Added

- Added new System Events:

  - `Microsoft.ApiManagement.CircuitBreaker.Closed`
  - `Microsoft.ApiManagement.CircuitBreaker.Opened`
  - `Microsoft.ApiManagement.GatewayTokenExpired`
  - `Microsoft.ApiManagement.GatewayTokenNearExpiry`
  - `Microsoft.Communication.CallEnded": AcsCallEndedEventData`
  - `Microsoft.Communication.CallParticipantAdded`
  - `Microsoft.Communication.CallParticipantRemoved`
  - `Microsoft.Communication.CallStarted`
  - `Microsoft.Communication.ChatAzureBotCommandReceivedInThread`
  - `Microsoft.Communication.ChatTypingIndicatorReceivedInThread`
  - `Microsoft.Edge.SolutionVersionPublished`

## 1.0.0-beta.6 (2025-02-20)

### Features Added

- Added `animated` property to `AcsMessageMediaContent`

- Added the following properties to `AcsMessageReceivedEventData`
  - `messageId`
  - `messageType`
  - `reaction`

### Other Changes

- Rename this package to `@azure/eventgrid-systemevents`

## 1.0.0-beta.5 (2025-01-21)

### Other Changes

- Added `internetMessageId` property to `AcsEmailDeliveryReportReceivedEventData`.
- Added `recipientMailServerHostName` property to `AcsEmailDeliveryReportStatusDetails`.
- For `AcsSmsReceivedEventData`:
  - Added `segmentCount` property
- Regenerated SDK with latest commit.

## 1.0.0-beta.4 (2024-09-23)

### Other Changes

- A new property `tierToColdSummary` is added to the `StorageLifecyclePolicyCompletedEventData` interface.

## 1.0.0-beta.3 (2024-08-20)

### Other Changes

- A new field `accessTier` is added to the `StorageBlobCreatedEventData` object.
- Two new fields `accessTier` & `previousTier` are added to the StorageBlobTierChangedEventData object.

## 1.0.0-beta.2 (2024-07-16)

### Other Changes

- Regenerated SDK with latest commit. Refer [#30399](https://github.com/Azure/azure-sdk-for-js/pull/30399) for further details.

## 1.0.0-beta.1 (2024-06-11)

### Features Added

- Released System Events related to Eventgrid service.
