# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Added support for service API version `2026-08-01-preview`, including listing rooms, users, and a user's rooms, and creating, retrieving, updating, listing, and soft deleting room topics. [API specification](https://github.com/Azure/azure-rest-api-specs/pull/46545)

### Breaking Changes

- Renamed `ChatConversation.parentRoom` to `roomId` in the SDK; the service JSON property remains `parentRoom`. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Renamed PUT request models from `ChatRoleInput`, `ChatRoomInput`, `ChatRoomMemberInput`, `ChatTopicInput`, and `HumanChatUserInput` to their corresponding `CreateOrReplace` names. Renamed `ChatMessageInput` to `ChatMessageUpdate` to match `ChatTopicUpdate` and Python lifecycle naming. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Changed `createOrReplaceUser` to accept `HumanChatUserCreateOrReplace`, requiring `kind: "Human"`, `nickname`, and `roleName`. Removed the generic `ChatUserInput` and `ChatUserInputUnion` request types; response models continue to support unknown user kinds. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Changed `ChatUserKind` to an extensible string type to match the response contract. Human creation inputs still require the literal `"Human"`. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)

- Changed the default Chat service API version from `2026-02-01-preview` to `2026-08-01-preview`. Set `apiVersion` in the client options to explicitly select the previous version. [API specification](https://github.com/Azure/azure-rest-api-specs/pull/46545)

### Bugs Fixed

- Preserved request headers and cancellation when following message pagination links or resuming message pages. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Made `ChatMessageUpdate.createdBy` and `content` optional so that `updateMessage` supports partial PATCH requests. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Preserved the optional `state` property in `ChatTopicCreateOrReplace` so topic PUT requests support replacement without requiring state during creation. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)

### Other Changes

- Named request body parameters `role`, `room`, `member`, `user`, `topic`, and `message` consistently across the client and operation functions. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Documented message-ID pagination cursors and resuming message pages with the returned continuation token. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)
- Moved lifecycle request model and serializer customizations into TypeSpec, sharing the request-model helper with Python. [#40348](https://github.com/Azure/azure-sdk-for-js/pull/40348)

- Removed the dependency on `@azure/web-pubsub` by implementing client access token generation directly. [#39855](https://github.com/Azure/azure-sdk-for-js/pull/39855)

## 1.0.0-beta.1 (2026-09-03)

### Features Added

- Initial public preview of the Azure Web PubSub Chat service client. [#39180](https://github.com/Azure/azure-sdk-for-js/pull/39180)
