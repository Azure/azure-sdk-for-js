# Release History

## 1.0.0-beta.4 (2021-02-09)

### Breaking Changes

- Replaced `CommunicationUser` with `CommunicationUserIdentifier`.
- Replaced `CommunicationUserCredential` with `CommunicationTokenCredential`.
- Removed `priority` field (ChatMessage.Priority).

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
