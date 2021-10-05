# Release History

## 4.5.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.5.0 (2021-10-05)

### Features Added

- Added new properties for the `Microsoft.Media.LiveEventIngestHeartbeat` System Event:

  - `ingestDriftValue`
  - `lastFragmentArrivalTime`
  - `transcriptionLanguage`
  - `transcriptionState`

- Added new System Events:
  - API Management:
    - `Microsoft.ApiManagement.APICreated`
    - `Microsoft.ApiManagement.APIDeleted`
    - `Microsoft.ApiManagement.APIReleaseCreated`
    - `Microsoft.ApiManagement.APIReleaseDeleted`
    - `Microsoft.ApiManagement.APIReleaseUpdated`
    - `Microsoft.ApiManagement.APIUpdated`
    - `Microsoft.ApiManagement.ProductCreated`
    - `Microsoft.ApiManagement.ProductDeleted`
    - `Microsoft.ApiManagement.ProductUpdated`
    - `Microsoft.ApiManagement.SubscriptionCreated`
    - `Microsoft.ApiManagement.SubscriptionDeleted`
    - `Microsoft.ApiManagement.SubscriptionUpdated`
    - `Microsoft.ApiManagement.UserCreated`
    - `Microsoft.ApiManagement.UserDeleted`
    - `Microsoft.ApiManagement.UserUpdated`
  - Container Service:
    - `Microsoft.ContainerService.NewKubernetesVersionAvailable`
  - Communication:
    - `Microsoft.Communication.UserDisconnected`
  - Media Streaming:
    - `Microsoft.Media.LiveEventChannelArchiveHeartbeat`

## 4.4.0 (2021-07-19)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our
  [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- `EventGridPublisherClient` now supports Azure Active Directory (AAD) for authentication. When constructing an `EventGridPublisherClient` you may now pass an instance
  of a `TokenCredential` as the credential. See the readme for [`@azure/identity`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity) to learn
  more about using Azure Active Directory for authentication.

- Added a "metadata" property for the following system events:

  - `Microsoft.Communication.AcsChatMessageReceived`
  - `Microsoft.Communication.AcsChatMessageEdited`
  - `Microsoft.Communication.AcsChatMessageReceivedInThread`
  - `Microsoft.Communication.AcsChatMessageEditedInThread`

## 4.3.0 (2021-06-08)

### New Features

- Added new System Event: `Microsoft.Storage.BlobInventoryPolicyCompleted`

### Key Bug Fixes

- The `Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListeners` event was incorrectly listed with the name of `Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener`.
  This has been corrected. When using TypeScript, you will need to replace any calls to `isSystemEvent("Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener")` with
  `isSystemEvent("Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListeners")`.

## 4.2.0 (2021-05-11)

### New Features

- Added new System Events: "Microsoft.PolicyInsights.PolicyStateCreated", "Microsoft.PolicyInsights.PolicyStateChanged", "Microsoft.PolicyInsights.PolicyStateDeleted",
  "Microsoft.Storage.AsyncOperationInitiated", "Microsoft.Storage.BlobTierChanged".

## 4.1.0 (2021-03-23)

- The system event names `Microsoft.Communication.ChatParticipantAddedToThread` and `Microsoft.Communication.ChatParticipantRemovedFromThread` have been removed, and
  `Microsoft.Communication.ChatThreadParticipantAdded` and `Microsoft.Communication.ChatThreadParticipantRemoved` have been added. The old names did not match the
  the type names that Azure Communication Services was using for these events. TypeScript users will now see compliation errors if they are calling `isSystemEvent` with
  either `Microsoft.Communication.ChatParticipantAddedToThread` or `Microsoft.Communication.ChatParticipantRemovedFromThread` as the event name. To fix these issues,
  replace all uses of `Microsoft.Communication.ChatParticipantAddedToThread` with `Microsoft.Communication.ChatThreadParticipantAdded` and
  `Microsoft.Communication.ChatParticipantRemovedFromThread` with `Microsoft.Communication.ChatThreadParticipantRemoved`.

- Add `Microsoft.Communications.RecordingFileStatusUpdated` system event.

## 4.0.0 (2021-03-17)

- Update version to 4.0.0 to align with other EventGrid SDKs

### Breaking Changes

- `EventGridConsumer` no longer applies any conversions to the `data` property of system events. The interfaces that describe the data payload of each
  system event has been updated to reflect this. The most visible impact of this change is that some properties of events are no longer converted into JavaScript
  `Date` objects, and instead are kepts as strings which contain ISO 8601 timestamps.
- Related to the above, `EventGridConsumer` no longer accepts a set of custom converters that can be used to further transform the `data` property of a specific
  event type when deserializing events.
- The interfaces which describe the shape of the `data` member of system events have been updated so that properties always included in the event are not typed as optional.

## 3.0.0-beta.3 (2020-10-06)

- Added distributed tracing support. `EventGridProducerClient` will now create spans when sending events to Event Grid.
- Added support for system events sent by Azure Key Vault.

### Breaking Changes

- The type definitions for SMS events sent by Azure Communication Services have been renamed, to use the prefix "AcsSms" instead of "Acssms". If you are
  using TypeScript and explicitly referencing these interfaces, you will need to update your code to use the new names. The payload of the events is unchanged.
- `EventGridSharedAccessCredential` has been removed, in favor of `AzureSASCredential`. Code which is using `EventGridSharedAccessCredential` should
  now use `AzureSASCredential` instead.
- When constructing the client, you must now include the schema type your topic is configured to expect (one of "EventGrid", "CloudEvent" or "Custom").
- The `sendEvents` methods have been collapsed into a single method on the client called `send` which uses the input schema that was configured on the client.

## 3.0.0-beta.2 (2020-09-24)

- Added support for system events sent by the Azure Communication Services.

## 3.0.0-beta.1 (2020-09-08)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
