# Release History

## 1.2.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.2.0 (2022-04-05)

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.13.
- Updated to @azure/communication-common@2.0.0.

## 1.1.2 (2022-02-08)

### Breaking Changes

- Prohibit sending the typing notification request within 8 seconds of the previous request.

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.12.
- Added two new events realTimeNotificationConnected and realTimeNotificationDisconnected that allow the developer to know when the connection to the call server is active

## 1.1.1 (2021-10-19)

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.11.
- Added `signalingClientOptions` in `ClientOptions`.

## 1.1.0 (2021-09-15)

### Features Added

- Migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.
- Updated to @azure/communication-signaling@1.0.0-beta.10.

## 1.1.0-beta.1 (2021-08-10)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Added support to add `metadata` for `message`
- Added `senderDisplayName` in `sendTypingNotification` operation.
- Updated to @azure/communication-signaling@1.0.0-beta.5.
- Enabled real-time notification for React Native.

## 1.0.0 (2021-03-29)

### Breaking Changes

- Renamed `url` to `endpoint` in the constructors of `ChatClient` and `ChatThreadClient`.
- Renamed `ChatThread` model to `ChatThreadProperties`. Renamed `GetChatThread` operation to `GetProperties` and move to `ChatThreadClient`.
- Renamed `ChatThreadInfo` model to `ChatThreadItem`.
- Renamed parameter `repeatabilityRequestId` to `idempotencyToken`.
- Uses `ChatError` instead of `CommunicationError` in operation result.
- Move `participants` from `CreateChatThreadRequest` to `CreateChatThreadOptions`
- Updated to @azure/communication-signaling@1.0.0-beta.3.

## 1.0.0-beta.5 (2021-03-09)

### Breaking Changes

- Removed `_response` from returned models.
- Updated to @azure/communication-common@1.0.0-beta.6. Now uses `CommunicationIdentifier` in place of `CommunicationUserIdentifier`.
- Swap the parameter order in `ChatThreadClient` constructor.
- Generates `repeatabilityRequestId` if not populated in `createChatThread` operation.

## 1.0.0-beta.4 (2021-02-09)

### Breaking Changes

- Updated to @azure/communication-common@1.0.0-beta.5. Now uses `CommunicationUserIdentifier` in place of `CommunicationUser`, and `CommunicationTokenCredential` instead of `CommunicationUserCredential`.
- Removed `priority` field from `ChatMessage`.

### Added

- Added support for `CreateChatThreadResult` and `AddChatParticipantsResult` to handle partial errors in batch calls.
- Added idempotency identifier parameter for chat creation calls.
- Added support for `listReadReceipts` and `listParticipants` pagination.
- Added new model for messages an content types : `Text`, `Html`, `ParticipantAdded`, `ParticipantRemoved`, `TopicUpdated`.
- Added new model for errors (`CommunicationError`)
- Added notifications for thread level changes.

## 1.0.0-beta.3 (2020-11-16)

Updated `@azure/communication-chat` version.

## 1.0.0-beta.2 (2020-10-06)

Updated `@azure/communication-chat` version

## 1.0.0-beta.1 (2020-09-22)

The first preview of the Azure Communication Chat Client has the following features:

- create/get/update/delete a chat thread
- list all chat threads the user join
- create/get/update/delete a chat message
- list all chat messages in a chat thread
- add members in a chat thread
- delete a member in a chat thread
- list all members in a chat thread
