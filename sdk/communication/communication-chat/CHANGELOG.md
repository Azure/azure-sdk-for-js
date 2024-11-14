# Release History

## 1.5.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.5.4 (2024-10-24)

### Bugs Fixed

- Updated the @azure/communication-chat version in UserAgentPrefix.

## 1.5.3 (2024-10-23)

### Other Changes

- Supported getting real-time notification configuration from Chat Gateway.
- Updated to @azure/communication-signaling@1.0.0-beta.29 with TrouterConfigClient support.

## 1.5.2 (2024-08-06)

### Other Changes

- Updated to @azure/communication-signaling@1.0.0-beta.28 with React Native support.
- Updated @azure/core-client and @azure/core-rest-pipeline version.

## 1.5.1 (2024-06-12)

### Bugs Fixed

- Updated @azure/core-client and @azure/core-rest-pipeline version.

## 1.5.0 (2024-04-15)

### Features Added

- Updated `ChatAttachmentType`to include type `file` to support ACS users to recieve files shared by Teams user.
- Updated to @azure/communication-signaling@1.0.0-beta.26 with file sharing support
- Updated `@azure/communication-common` with support for `MicrosoftTeamsAppIdentifierModel`

## 1.4.0 (2023-12-04)

### Features Added

- Added `ChatAttachment` object that contains properties for inline images incoming from Teams Chat Threads.
- Updated to @azure/communication-signaling@1.0.0-beta.22 with inline image support

## 1.3.2 (2023-08-24)

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.20. Added EUDB real-time notification support. `https://*.trouter.teams.microsoft.com` and `https://teams.microsoft.com` needs to be allowed for real-time notifications.

## 1.3.1 (2023-02-28)

### Features Added

- Updated to `@azure/communication-common` 2.2.0.
- Updated to @azure/communication-signaling@1.0.0-beta.16. Added GCCM real-time notification support.

## 1.3.0 (2022-10-13)

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.15. Improves real-time notification of messages when the network is offline, interrupted or unstable. For message(s) sent during this time, the customer will receive the notification that the message has been delivered if the network is functioning normally within 15 minutes.

- Updated to `@azure/core-tracing` 1.0.

## 1.2.1 (2022-07-12)

### Features Added

- Updated to @azure/communication-signaling@1.0.0-beta.14.

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
