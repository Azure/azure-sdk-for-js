# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Added support for service API version `2026-08-01-preview`, including listing rooms, users, and a user's rooms, and creating, retrieving, updating, listing, and soft deleting room topics. [API specification](https://github.com/Azure/azure-rest-api-specs/pull/46545)

### Breaking Changes

- Changed `createOrReplaceUser` to accept `HumanChatUserInput`, requiring `kind: "Human"`, `nickname`, and `roleName`. Removed the generic `ChatUserInput` and `ChatUserInputUnion` request types; response models continue to support unknown user kinds.
- Changed `ChatUserKind` to an extensible string type to match the response contract. Human creation inputs still require the literal `"Human"`.

- Changed the default Chat service API version from `2026-02-01-preview` to `2026-08-01-preview`. Set `apiVersion` in the client options to explicitly select the previous version. [API specification](https://github.com/Azure/azure-rest-api-specs/pull/46545)

### Bugs Fixed

- Made `ChatMessageInput.createdBy` and `content` optional so that `updateMessage` supports partial PATCH requests.
- Preserved the optional `state` property in `ChatTopicInput` so topic PUT requests support replacement without requiring state during creation.

### Other Changes

- Moved lifecycle request model and serializer customizations into TypeSpec, sharing the request-model helper with Python.

- Removed the dependency on `@azure/web-pubsub` by implementing client access token generation directly. [#39855](https://github.com/Azure/azure-sdk-for-js/pull/39855)

## 1.0.0-beta.1 (2026-09-03)

### Features Added

- Initial public preview of the Azure Web PubSub Chat service client. [#39180](https://github.com/Azure/azure-sdk-for-js/pull/39180)
