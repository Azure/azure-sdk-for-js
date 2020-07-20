// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export { CustomEventDataDecoder, EventGridEvent, CloudEvent } from "./models";

export {
  EventGridClient,
  EventGridClientOptions,
  SendEventsOptions,
  SendCloudEventsOptions,
  SendCustomSchemaEventsOptions
} from "./eventGridClient";

export {
  SignatureCredential,
  EventGridSharedAccessSignatureCredential
} from "./sharedAccessSignitureCredential";

export { EventGridConsumer, EventGridConsumerOptions } from "./consumer";

export {
  EventHubCaptureFileCreatedEventData,
  ContainerRegistryArtifactEventTarget,
  ContainerRegistryEventData,
  ContainerRegistryImagePushedEventData,
  ContainerRegistryImageDeletedEventData,
  ContainerRegistryChartDeletedEventData,
  ContainerRegistryChartPushedEventData,
  ContainerRegistryArtifactEventData,
  ContainerRegistryEventActor,
  ContainerRegistryEventRequest,
  ContainerRegistryEventSource,
  ContainerRegistryEventTarget
} from "./generated/models";

export {
  isEventHubCaptureFileCreatedEvent,
  isContainerRegistryChartDeletedEvent,
  isContainerRegistryChartPushedEvent,
  isContainerRegistryImageDeletedEvent,
  isContainerRegistryImagePushedEvent
} from "./predicates";

// TODO(matell): Export these from top level when we export the predicates.

/*
export {
    AppConfigurationKeyValueDeletedEventData,
    AppConfigurationKeyValueModifiedEventData
    AppEventTypeDetail,
    AppServicePlanEventTypeDetail,
    ContainerRegistryArtifactEventTarget,
    ContainerRegistryEventData,
    ContainerRegistryImagePushedEventData,
    ContainerRegistryImageDeletedEventData,
    ContainerRegistryChartDeletedEventData,
    ContainerRegistryChartPushedEventData,
    DeviceConnectionStateEventInfo,
    DeviceTwinInfo,
    DeviceTwinInfoProperties,
    DeviceTwinInfoX509Thumbprint,
    IotHubDeviceCreatedEventData,
    IotHubDeviceDeletedEventData,
    IotHubDeviceConnectedEventData,
    IotHubDeviceDisconnectedEventData,
    IotHubDeviceTelemetryEventData,
    SubscriptionValidationEventData,
    SubscriptionDeletedEventData,
    EventHubCaptureFileCreatedEventData,
    MachineLearningServicesDatasetDriftDetectedEventData,
    MachineLearningServicesModelDeployedEventData,
    MachineLearningServicesModelRegisteredEventData,
    MachineLearningServicesRunCompletedEventData,
    MachineLearningServicesRunStatusChangedEventData,
    MapsGeofenceEventProperties,
    MapsGeofenceEnteredEventData,
    MapsGeofenceExitedEventData,
    MapsGeofenceResultEventData,
    MediaJobStateChangeEventData,
    MediaJobOutputStateChangeEventData,
    MediaJobScheduledEventData,
    MediaJobProcessingEventData,
    MediaJobCancelingEventData,
    MediaJobFinishedEventData,
    MediaJobCanceledEventData,
    MediaJobError,
    MediaJobErrorCategory,
    MediaJobErrorDetail,
    MediaJobErrorCode,
    MediaJobRetry,
    MediaJobErroredEventData,
    MediaJobOutputCanceledEventData,
    MediaJobOutputCancelingEventData,
    MediaJobOutputErroredEventData,
    MediaJobOutputFinishedEventData,
    MediaJobOutputProcessingEventData,
    MediaJobOutputScheduledEventData,
    MediaJobOutputProgressEventData,
    MediaJobOutputUnion,
    MediaJobState,
    MediaLiveEventEncoderConnectedEventData,
    MediaLiveEventConnectionRejectedEventData,
    MediaLiveEventEncoderDisconnectedEventData,
    MediaLiveEventIncomingStreamReceivedEventData,
    MediaLiveEventIncomingStreamsOutOfSyncEventData,
    MediaLiveEventIncomingVideoStreamsOutOfSyncEventData,
    MediaLiveEventIncomingDataChunkDroppedEventData,
    MediaLiveEventIngestHeartbeatEventData,
    MediaLiveEventTrackDiscontinuityDetectedEventData,
    ResourceWriteSuccessEventData,
    ResourceWriteFailureEventData,
    ResourceWriteCancelEventData,
    ResourceDeleteSuccessEventData,
    ResourceDeleteFailureEventData,
    ResourceDeleteCancelEventData,
    ResourceActionSuccessEventData,
    ResourceActionFailureEventData,
    ResourceActionCancelEventData,
    ServiceBusActiveMessagesAvailableWithNoListenersEventData,
    ServiceBusDeadletterMessagesAvailableWithNoListenersEventData,
    StorageBlobCreatedEventData,
    StorageBlobDeletedEventData,
    StorageBlobRenamedEventData,
    StorageDirectoryCreatedEventData,
    StorageDirectoryDeletedEventData,
    StorageDirectoryRenamedEventData,
    WebAppUpdatedEventData,
    WebBackupOperationStartedEventData,
    WebBackupOperationCompletedEventData,
    WebBackupOperationFailedEventData,
    WebRestoreOperationStartedEventData,
    WebRestoreOperationCompletedEventData,
    WebRestoreOperationFailedEventData,
    WebSlotSwapStartedEventData,
    WebSlotSwapCompletedEventData,
    WebSlotSwapFailedEventData,
    WebSlotSwapWithPreviewStartedEventData,
    WebSlotSwapWithPreviewCancelledEventData,
    WebAppServicePlanUpdatedEventData,
    WebAppServicePlanUpdatedEventDataSku,
    AppAction,
    StampKind,
    AsyncStatus,
    ContainerRegistryArtifactEventData,
    ContainerRegistryEventActor,
    ContainerRegistryEventRequest,
    ContainerRegistryEventSource,
    ContainerRegistryEventTarget,
    DeviceConnectionStateEventProperties,
    DeviceLifeCycleEventProperties,
    DeviceTelemetryEventProperties,
    MapsGeofenceGeometry,
    MediaJobOutput,
    MediaJobOutputAsset,
    DeviceTwinProperties,
    DeviceTwinMetadata
} from "./generated/modles"
*/
