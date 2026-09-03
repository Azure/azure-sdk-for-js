# Release History

## 5.12.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.12.0 (2025-05-14)

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

### Bugs Fixed

- For `AcsChatMessageEditedEventData`, `AcsChatMessageEditedInThreadEventData`, and `AcsChatThreadPropertiesUpdatedPerUserEventData`
  - Made `editTime` and `metadata` optional
- For `AcsChatMessageEventBase`
  - Made `composeTime`, `senderCommunicationIdentifier`, `senderDisplayName`, and `version` optional
- For `AcsChatMessageEventInThreadBase`
  - Made `composeTime`, `senderDisplayName`, and `version` optional
- For `AcsChatMessageReceivedInThreadEventData` and `AcsChatThreadCreatedWithUserEventData`
  - Made `metadata` optional
- For `AcsChatParticipantAddedToThreadEventData` and `AcsChatParticipantRemovedFromThreadEventData`
  - Made `time` and `version` optional
- For `AcsChatThreadParticipant`
  - Made `displayName` and `metadata` optional
- For `AcsChatThreadDeletedEventData` and `AcsChatThreadWithUserDeletedEventData`
  - Made `deleteTime` optional
- For `AcsSmsDeliveryReportReceivedEventData`
  - Made `receivedTimestamp` and `tag` optional
- For `AcsSmsReceivedEventData`
  - Made `message` required

## 5.11.0 (2025-02-21)

### Features Added

- properties added to `AcsMessageMediaContent`
  - `animated`
- properties added to `AcsMessageReceivedEventData`
  - `messageId`
  - `messageType`
  - `reaction`

## 5.10.0 (2025-01-21)

### Features Added

- Added `internetMessageId` property to `AcsEmailDeliveryReportReceivedEventData`.
- Added `recipientMailServerHostName` property to `AcsEmailDeliveryReportStatusDetails`.
- For `AcsSmsReceivedEventData`:
  - Added `segmentCount` property

### Bugs Fixed

- For `AcsSmsReceivedEventData`:
  - Made `message` & `receivedTimestamp` properties optional.

## 5.9.0 (2024-12-02)

### Features Added

- Added new System Events:

  - `Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted`

### Other Changes

- A new property `policyRunSummary` has been added to `StorageLifecyclePolicyCompletedEventData` interface.
- New properties `StorageLifecycleCompletionStatus` and `KnownStorageLifecycleCompletionStatus` have been added.

## 5.8.0 (2024-10-14)

### Other Changes

- A new property `onBehalfOfCallee` is added to the `AcsIncomingCallEventData` interface.

### Bugs Fixed

- The property `serializedName` has been removed from `MediaJobOutputProgressEventData` & `MediaJobScheduledEventData` models.

## 5.7.0 (2024-09-23)

### Other Changes

- A new property `tierToColdSummary` is added to the `StorageLifecyclePolicyCompletedEventData` interface.

## 5.6.0 (2024-08-21)

### Other Changes

- A new property `accessTier` is added to the `StorageBlobCreatedEventData` interface.
- Two new properties `accessTier` & `previousTier` are added to the `StorageBlobTierChangedEventData` interface.

### Bugs Fixed

- The properties `api`, `blobType`, `clientRequestId`, `contentLength`, `contentOffset`, `contentType`, `eTag`, `identity`, `requestId`, `sequencer`, `storageDiagnostics` & `url` in `StorageBlobCreatedEventData` have been made optional.
- The properties `api`, `blobType`, `clientRequestId`, `contentLength`, `contentType`,`identity`, `requestId`, `sequencer`, `storageDiagnostics` & `url` in `StorageBlobTierChangedEventData` have been made optional.

## 5.5.1 (2024-07-16)

### Bugs Fixed

- Fixed deserialization bugs in `AcsEmailEngagementTrackingReportReceivedEventData` and `AcsEmailDeliveryReportReceivedEventData` system events that caused the `DeliveryAttemptTimestamp` and `UserActionTimeStamp` properties to be null.

## 5.5.0 (2024-06-11)

### Features Added

- Added new System Events:

  - `Microsoft.Communication.ChatThreadCreated`
  - `Microsoft.Communication.ChatThreadDeleted`
  - `Microsoft.Communication.ChatThreadPropertiesUpdated`

## 5.4.0 (2024-04-11)

### Features Added

- Added new System Events:

  - `Microsoft.Communication.AdvancedMessageDeliveryStatusUpdated`
  - `Microsoft.Communication.AdvancedMessageReceived`
  - `Microsoft.Communication.RouterWorkerUpdated`

## 5.3.0 (2024-03-13)

### Features Added

- Added new System Events:

  - `Microsoft.ApiCenter.ApiDefinitionAdded`
  - `Microsoft.ApiCenter.ApiDefinitionUpdated`

## 5.2.0 (2024-02-08)

### Features Added

- Added new System Events:

  - `Microsoft.Storage.StorageTaskAssignmentQueued`
  - `Microsoft.Storage.StorageTaskAssignmentCompleted`
  - `Microsoft.AVS.ScriptExecutionStarted`
  - `Microsoft.AVS.ScriptExecutionFinished`
  - `Microsoft.AVS.ScriptExecutionCancelled`
  - `Microsoft.AVS.ScriptExecutionFailed`
  - `Microsoft.AVS.PrivateCloudUpdating`
  - `Microsoft.AVS.PrivateCloudUpdated`
  - `Microsoft.AVS.PrivateCloudFailed`
  - `Microsoft.AVS.ClusterCreated`
  - `Microsoft.AVS.ClusterDeleted`
  - `Microsoft.AVS.ClusterUpdating`
  - `Microsoft.AVS.ClusterUpdated`
  - `Microsoft.AVS.ClusterFailed`

## 5.1.1 (2024-01-22)

### Features Added

- Removed the System Events:

  - `Microsoft.Storage.StorageTaskAssignmentQueued`
  - `Microsoft.Storage.StorageTaskAssignmentCompleted`

These system events will be added in the future.

## 5.1.0 (2024-01-16)

### Features Added

- Added new System Events:

  - `Microsoft.Storage.StorageTaskAssignmentQueued`
  - `Microsoft.Storage.StorageTaskAssignmentCompleted`

## 5.0.0 (2023-11-07)

### Features Added

- Added new System Events:

  - `Microsoft.ResourceNotifications.Resources.CreatedOrUpdated`
  - `Microsoft.ResourceNotifications.Resources.Deleted`

### Breaking Changes

- In `ResourceNotificationsResourceUpdatedDetails` interface, the data type of property `tags` has been changed from `string` to object. Please refer [PR #27679](https://github.com/Azure/azure-sdk-for-js/pull/27679/) for further details.

## 4.15.0 (2023-10-12)

### Features Added

- Added new System Events:

  - `Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged`
  - `Microsoft.ResourceNotifications.HealthResources.ResourceAnnotated`
  - `Microsoft.Communication.RouterWorkerDeregistered`
  - `Microsoft.Communication.RouterWorkerRegistered`
  - `Microsoft.Communication.RouterJobCancelled`
  - `Microsoft.Communication.RouterJobClassificationFailed`
  - `Microsoft.Communication.RouterJobClassified`
  - `Microsoft.Communication.RouterJobClosed`
  - `Microsoft.Communication.RouterJobCompleted`
  - `Microsoft.Communication.RouterJobDeleted`
  - `Microsoft.Communication.RouterJobExceptionTriggered`
  - `Microsoft.Communication.RouterJobQueued`
  - `Microsoft.Communication.RouterJobReceived`
  - `Microsoft.Communication.RouterJobSchedulingFailed`
  - `Microsoft.Communication.RouterJobUnassigned`
  - `Microsoft.Communication.RouterJobWaitingForActivation`
  - `Microsoft.Communication.RouterJobWorkerSelectorsExpire`
  - `Microsoft.Communication.RouterWorkerDeleted`
  - `Microsoft.Communication.RouterWorkerOfferAccepted`
  - `Microsoft.Communication.RouterWorkerOfferDeclined`
  - `Microsoft.Communication.RouterWorkerOfferExpired`
  - `Microsoft.Communication.RouterWorkerOfferIssued`
  - `Microsoft.Communication.RouterWorkerOfferRevoked`

## 4.14.0 (2023-09-14)

### Features Added

- Added new System Events:

  - `Microsoft.EventGrid.MQTTClientCreatedOrUpdated`
  - `Microsoft.EventGrid.MQTTClientDeleted`
  - `Microsoft.EventGrid.MQTTClientSessionConnected`
  - `Microsoft.EventGrid.MQTTClientSessionDisconnected`

## 4.13.0 (2023-06-08)

### Features Added

- Added new System Events:

  - `Microsoft.ContainerService.ClusterSupportEnded`
  - `Microsoft.ContainerService.ClusterSupportEnding`
  - `Microsoft.ContainerService.NodePoolRollingFailed`
  - `Microsoft.ContainerService.NodePoolRollingStarted`
  - `Microsoft.ContainerService.NodePoolRollingSucceeded`

## 4.12.0 (2023-05-17)

- No new changes for this release. This is to update the minor version of the release to indicate the new system events that were added in the `4.11.1` version.

## 4.11.1 (2023-05-15)

### Features Added

- Added new System Events:

  - `Microsoft.ApiManagement.GatewayAPIAdded`
  - `Microsoft.ApiManagement.GatewayAPIRemoved`
  - `Microsoft.ApiManagement.GatewayCertificateAuthorityCreated`
  - `Microsoft.ApiManagement.GatewayCertificateAuthorityDeleted`
  - `Microsoft.ApiManagement.GatewayCertificateAuthorityUpdated`
  - `Microsoft.ApiManagement.GatewayCreated`
  - `Microsoft.ApiManagement.GatewayDeleted`
  - `Microsoft.ApiManagement.GatewayHostnameConfigurationCreated`
  - `Microsoft.ApiManagement.GatewayHostnameConfigurationDeleted`
  - `Microsoft.ApiManagement.GatewayHostnameConfigurationUpdated`
  - `Microsoft.ApiManagement.GatewayUpdated`
  - `Microsoft.Communication.EmailDeliveryReportReceived`
  - `Microsoft.Communication.EmailEngagementTrackingReportReceived`
  - `Microsoft.Communication.IncomingCall`
  - `Microsoft.DataBox.CopyCompleted`
  - `Microsoft.DataBox.CopyStarted`
  - `Microsoft.DataBox.OrderCompleted`
  - `Microsoft.HealthcareApis.DicomImageUpdated`
  - `Microsoft.Storage.StorageTaskCompleted`
  - `Microsoft.Storage.StorageTaskQueued`

## 4.11.0 (2022-11-08)

### Features Added

- Added new System Events:

  - `Microsoft.HealthcareApis.DicomImageCreated`
  - `Microsoft.HealthcareApis.DicomImageDeleted`

## 4.10.0 (2022-07-11)

### Bugs Fixed

- Fixed an issue where `generateSharedAccessSignature` would generate an invalid signature if the experation time was between 12:00pm and 1:00pm. Thank you to @donut87 for discovering the issue and providing the fix.

### Other Changes

- The channel name feature added in 4.10.0-beta.1 is now stable. There were no changes in this feature between 4.10.0-beta.1 and 4.10.0

## 4.10.0-beta.1 (2022-04-14)

### Features Added

- Add support for specifiying a channel to send to in a specific Partner Topic via the `channelName` property of `SendOptions`.

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

## 4.9.0 (2022-04-07)

### Features Added

- Added new System Events:

  - `Microsoft.HealthcareApis.FhirResourceCreated`
  - `Microsoft.HealthcareApis.FhirUpdatedCreated`
  - `Microsoft.HealthcareApis.FhirDeletedCreated`

## 4.8.0 (2022-03-08)

### Features Added

- Added new value `IdentityUnsupported` to `MediaJobErrorCode` and `Account` to `MediaJobErrorCategory` for `Microsoft.Media` events.

## 4.7.0 (2022-02-08)

### Key Bug Fixes

- The TypeScript typings for two events have had small changes to accurately reflect the data sent by Azure.
  - `Microsoft.EventHub.CaptureFileCreated`'s `fileurl` property is now correctly cased as `fileUrl`
  - `Microsoft.Storage.DirectoryDeleted`'s `recursive` property has been changed from `boolean` to `string`. The service sets this property to the string `"true"` or `"false"`.

## 4.6.0 (2022-01-11)

### Features Added

- Added a new property to `AcsRecordingChunkInfo` (for the `Microsoft.Communication.RecordingFileStatusUpdated` system event):

  - `deleteLocation`

- Added new properties to `ContainerRegistryArtifactEventData` and `ContainerRegistryEventData` (for the `Microsoft.ContainerRegistry.{ChartDeleted|ChartPushed|ImagePushed|ImageDeleted}` system events):

  - `connectedRegistry`
  - `location`

- Added new properties to `AcsRecordingFileStatusUpdatedEventData` (for the `Microsoft.Communication.RecordingFileStatusUpdated` system event):

  - `recordingChannelType`
  - `recordingContentType`
  - `recordingFormatType`

### Key Bug Fixes

- The TypeScript typings for events from Azure Resource Manager were incorrect. The following properties had their types changed:

  - `authorization`
  - `claims`
  - `httpRequest`

Previously, these properties were typed as `string` but the underlying events from the service actually contained objects. Customers using `isSystemEvent` with TypeScript will
now see compliation issues if they try to treat these properties as strings (previously, the code would fail at runtime).

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
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_design.html).
