// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AppConfigurationKeyValueDeletedEventData,
  AppConfigurationKeyValueModifiedEventData,
  ContainerRegistryImagePushedEventData,
  ContainerRegistryImageDeletedEventData,
  ContainerRegistryChartDeletedEventData,
  ContainerRegistryChartPushedEventData,
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
  MediaJobErroredEventData,
  MediaJobOutputCanceledEventData,
  MediaJobOutputCancelingEventData,
  MediaJobOutputErroredEventData,
  MediaJobOutputFinishedEventData,
  MediaJobOutputProcessingEventData,
  MediaJobOutputScheduledEventData,
  MediaJobOutputProgressEventData,
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
  StorageLifecyclePolicyCompletedEventData
} from "./generated/models";

import { CloudEvent, EventGridEvent } from "./models";

/**
 * The Event Types for all System Events. These may be used with `isSystemEvent` to determine if an
 * event is a system event of a given type.
 */
export type KnownSystemEventTypes =
  | "Microsoft.AppConfiguration.KeyValueDeleted"
  | "Microsoft.AppConfiguration.KeyValueModified"
  | "Microsoft.ContainerRegistry.ImagePushed"
  | "Microsoft.ContainerRegistry.ImageDeleted"
  | "Microsoft.ContainerRegistry.ChartDeleted"
  | "Microsoft.ContainerRegistry.ChartPushed"
  | "Microsoft.Devices.DeviceCreated"
  | "Microsoft.Devices.DeviceDeleted"
  | "Microsoft.Devices.DeviceConnected"
  | "Microsoft.Devices.DeviceDisconnected"
  | "Microsoft.Devices.DeviceTelemetry"
  | "Microsoft.EventGrid.SubscriptionValidationEvent"
  | "Microsoft.EventGrid.SubscriptionDeletedEvent"
  | "Microsoft.EventHub.CaptureFileCreated"
  | "Microsoft.MachineLearningServices.DatasetDriftDetected"
  | "Microsoft.MachineLearningServices.ModelDeployed"
  | "Microsoft.MachineLearningServices.ModelRegistered"
  | "Microsoft.MachineLearningServices.RunCompleted"
  | "Microsoft.MachineLearningServices.RunStatusChanged"
  | "Microsoft.Maps.GeofenceEntered"
  | "Microsoft.Maps.GeofenceExited"
  | "Microsoft.Maps.GeofenceResult"
  | "Microsoft.Media.JobStateChange"
  | "Microsoft.Media.JobOutputStateChange"
  | "Microsoft.Media.JobScheduled"
  | "Microsoft.Media.JobProcessing"
  | "Microsoft.Media.JobCanceling"
  | "Microsoft.Media.JobFinished"
  | "Microsoft.Media.JobCanceled"
  | "Microsoft.Media.JobErrored"
  | "Microsoft.Media.JobOutputCanceled"
  | "Microsoft.Media.JobOutputCanceling"
  | "Microsoft.Media.JobOutputErrored"
  | "Microsoft.Media.JobOutputFinished"
  | "Microsoft.Media.JobOutputProcessing"
  | "Microsoft.Media.JobOutputScheduled"
  | "Microsoft.Media.JobOutputProgress"
  | "Microsoft.Media.LiveEventEncoderConnected"
  | "Microsoft.Media.LiveEventConnectionRejected"
  | "Microsoft.Media.LiveEventEncoderDisconnected"
  | "Microsoft.Media.LiveEventIncomingStreamReceived"
  | "Microsoft.Media.LiveEventIncomingStreamsOutOfSync"
  | "Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync"
  | "Microsoft.Media.LiveEventIncomingDataChunkDropped"
  | "Microsoft.Media.LiveEventIngestHeartbeat"
  | "Microsoft.Media.LiveEventTrackDiscontinuityDetected"
  | "Microsoft.Resources.ResourceWriteSuccess"
  | "Microsoft.Resources.ResourceWriteFailure"
  | "Microsoft.Resources.ResourceWriteCancel"
  | "Microsoft.Resources.ResourceDeleteSuccess"
  | "Microsoft.Resources.ResourceDeleteFailure"
  | "Microsoft.Resources.ResourceDeleteCancel"
  | "Microsoft.Resources.ResourceActionSuccess"
  | "Microsoft.Resources.ResourceActionFailure"
  | "Microsoft.Resources.ResourceActionCancel"
  | "Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners"
  | "Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener"
  | "Microsoft.Storage.BlobCreated"
  | "Microsoft.Storage.BlobDeleted"
  | "Microsoft.Storage.BlobRenamed"
  | "Microsoft.Storage.DirectoryCreated"
  | "Microsoft.Storage.DirectoryDeleted"
  | "Microsoft.Storage.DirectoryRenamed"
  | "Microsoft.Storage.LifecyclePolicyCompleted"
  | "Microsoft.Web.AppUpdated"
  | "Microsoft.Web.BackupOperationStarted"
  | "Microsoft.Web.BackupOperationCompleted"
  | "Microsoft.Web.BackupOperationFailed"
  | "Microsoft.Web.RestoreOperationStarted"
  | "Microsoft.Web.RestoreOperationCompleted"
  | "Microsoft.Web.RestoreOperationFailed"
  | "Microsoft.Web.SlotSwapStarted"
  | "Microsoft.Web.SlotSwapCompleted"
  | "Microsoft.Web.SlotSwapFailed"
  | "Microsoft.Web.SlotSwapWithPreviewStarted"
  | "Microsoft.Web.SlotSwapWithPreviewCancelled"
  | "Microsoft.Web.AppServicePlanUpdated";

/**
 * A mapping of event type names to event data type interfaces.
 *
 * @ignore
 */
export interface SystemEventNameToEventData {
  "Microsoft.AppConfiguration.KeyValueDeleted": AppConfigurationKeyValueDeletedEventData;
  "Microsoft.AppConfiguration.KeyValueModified": AppConfigurationKeyValueModifiedEventData;
  "Microsoft.ContainerRegistry.ImagePushed": ContainerRegistryImagePushedEventData;
  "Microsoft.ContainerRegistry.ImageDeleted": ContainerRegistryImageDeletedEventData;
  "Microsoft.ContainerRegistry.ChartDeleted": ContainerRegistryChartDeletedEventData;
  "Microsoft.ContainerRegistry.ChartPushed": ContainerRegistryChartPushedEventData;
  "Microsoft.Devices.DeviceCreated": IotHubDeviceCreatedEventData;
  "Microsoft.Devices.DeviceDeleted": IotHubDeviceDeletedEventData;
  "Microsoft.Devices.DeviceConnected": IotHubDeviceConnectedEventData;
  "Microsoft.Devices.DeviceDisconnected": IotHubDeviceDisconnectedEventData;
  "Microsoft.Devices.DeviceTelemetry": IotHubDeviceTelemetryEventData;
  "Microsoft.EventGrid.SubscriptionValidationEvent": SubscriptionValidationEventData;
  "Microsoft.EventGrid.SubscriptionDeletedEvent": SubscriptionDeletedEventData;
  "Microsoft.EventHub.CaptureFileCreated": EventHubCaptureFileCreatedEventData;
  "Microsoft.MachineLearningServices.DatasetDriftDetected": MachineLearningServicesDatasetDriftDetectedEventData;
  "Microsoft.MachineLearningServices.ModelDeployed": MachineLearningServicesModelDeployedEventData;
  "Microsoft.MachineLearningServices.ModelRegistered": MachineLearningServicesModelRegisteredEventData;
  "Microsoft.MachineLearningServices.RunCompleted": MachineLearningServicesRunCompletedEventData;
  "Microsoft.MachineLearningServices.RunStatusChanged": MachineLearningServicesRunStatusChangedEventData;
  "Microsoft.Maps.GeofenceEntered": MapsGeofenceEnteredEventData;
  "Microsoft.Maps.GeofenceExited": MapsGeofenceExitedEventData;
  "Microsoft.Maps.GeofenceResult": MapsGeofenceResultEventData;
  "Microsoft.Media.JobStateChange": MediaJobStateChangeEventData;
  "Microsoft.Media.JobOutputStateChange": MediaJobOutputStateChangeEventData;
  "Microsoft.Media.JobScheduled": MediaJobScheduledEventData;
  "Microsoft.Media.JobProcessing": MediaJobProcessingEventData;
  "Microsoft.Media.JobCanceling": MediaJobCancelingEventData;
  "Microsoft.Media.JobFinished": MediaJobFinishedEventData;
  "Microsoft.Media.JobCanceled": MediaJobCanceledEventData;
  "Microsoft.Media.JobErrored": MediaJobErroredEventData;
  "Microsoft.Media.JobOutputCanceled": MediaJobOutputCanceledEventData;
  "Microsoft.Media.JobOutputCanceling": MediaJobOutputCancelingEventData;
  "Microsoft.Media.JobOutputErrored": MediaJobOutputErroredEventData;
  "Microsoft.Media.JobOutputFinished": MediaJobOutputFinishedEventData;
  "Microsoft.Media.JobOutputProcessing": MediaJobOutputProcessingEventData;
  "Microsoft.Media.JobOutputScheduled": MediaJobOutputScheduledEventData;
  "Microsoft.Media.JobOutputProgress": MediaJobOutputProgressEventData;
  "Microsoft.Media.LiveEventEncoderConnected": MediaLiveEventEncoderConnectedEventData;
  "Microsoft.Media.LiveEventConnectionRejected": MediaLiveEventConnectionRejectedEventData;
  "Microsoft.Media.LiveEventEncoderDisconnected": MediaLiveEventEncoderDisconnectedEventData;
  "Microsoft.Media.LiveEventIncomingStreamReceived": MediaLiveEventIncomingStreamReceivedEventData;
  "Microsoft.Media.LiveEventIncomingStreamsOutOfSync": MediaLiveEventIncomingStreamsOutOfSyncEventData;
  "Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync": MediaLiveEventIncomingVideoStreamsOutOfSyncEventData;
  "Microsoft.Media.LiveEventIncomingDataChunkDropped": MediaLiveEventIncomingDataChunkDroppedEventData;
  "Microsoft.Media.LiveEventIngestHeartbeat": MediaLiveEventIngestHeartbeatEventData;
  "Microsoft.Media.LiveEventTrackDiscontinuityDetected": MediaLiveEventTrackDiscontinuityDetectedEventData;
  "Microsoft.Resources.ResourceWriteSuccess": ResourceWriteSuccessEventData;
  "Microsoft.Resources.ResourceWriteFailure": ResourceWriteFailureEventData;
  "Microsoft.Resources.ResourceWriteCancel": ResourceWriteCancelEventData;
  "Microsoft.Resources.ResourceDeleteSuccess": ResourceDeleteSuccessEventData;
  "Microsoft.Resources.ResourceDeleteFailure": ResourceDeleteFailureEventData;
  "Microsoft.Resources.ResourceDeleteCancel": ResourceDeleteCancelEventData;
  "Microsoft.Resources.ResourceActionSuccess": ResourceActionSuccessEventData;
  "Microsoft.Resources.ResourceActionFailure": ResourceActionFailureEventData;
  "Microsoft.Resources.ResourceActionCancel": ResourceActionCancelEventData;
  "Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners": ServiceBusActiveMessagesAvailableWithNoListenersEventData;
  "Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener": ServiceBusDeadletterMessagesAvailableWithNoListenersEventData;
  "Microsoft.Storage.BlobCreated": StorageBlobCreatedEventData;
  "Microsoft.Storage.BlobDeleted": StorageBlobDeletedEventData;
  "Microsoft.Storage.BlobRenamed": StorageBlobRenamedEventData;
  "Microsoft.Storage.DirectoryCreated": StorageDirectoryCreatedEventData;
  "Microsoft.Storage.DirectoryDeleted": StorageDirectoryDeletedEventData;
  "Microsoft.Storage.DirectoryRenamed": StorageDirectoryRenamedEventData;
  "Microsoft.Storage.LifecyclePolicyCompleted": StorageLifecyclePolicyCompletedEventData;
  "Microsoft.Web.AppUpdated": WebAppUpdatedEventData;
  "Microsoft.Web.BackupOperationStarted": WebBackupOperationStartedEventData;
  "Microsoft.Web.BackupOperationCompleted": WebBackupOperationCompletedEventData;
  "Microsoft.Web.BackupOperationFailed": WebBackupOperationFailedEventData;
  "Microsoft.Web.RestoreOperationStarted": WebRestoreOperationStartedEventData;
  "Microsoft.Web.RestoreOperationCompleted": WebRestoreOperationCompletedEventData;
  "Microsoft.Web.RestoreOperationFailed": WebRestoreOperationFailedEventData;
  "Microsoft.Web.SlotSwapStarted": WebSlotSwapStartedEventData;
  "Microsoft.Web.SlotSwapCompleted": WebSlotSwapCompletedEventData;
  "Microsoft.Web.SlotSwapFailed": WebSlotSwapFailedEventData;
  "Microsoft.Web.SlotSwapWithPreviewStarted": WebSlotSwapWithPreviewStartedEventData;
  "Microsoft.Web.SlotSwapWithPreviewCancelled": WebSlotSwapWithPreviewCancelledEventData;
  "Microsoft.Web.AppServicePlanUpdated": WebAppServicePlanUpdatedEventData;
}

/**
 * isCloudEventLike returns "true" when the event is a CloudEvent
 *
 * @param o Either an EventGrid our CloudEvent event.
 */
function isCloudEventLike(
  o: EventGridEvent<unknown> | CloudEvent<unknown>
): o is CloudEvent<unknown> {
  return (o as any).source !== undefined;
}

/**
 * iSystemEvent returns "true" when a given event is a system event of a given type. When using
 * TypeScript, this function acts as a custom type guard and allows the TypeScript compiler to
 * identify the underlying data
 *
 * @param eventType The type of system event to check for, e.g., "Microsoft.AppConfiguration.KeyValueDeleted"
 * @param event The event to test.
 */
export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: EventGridEvent<unknown>
): event is EventGridEvent<SystemEventNameToEventData[T]>;

/**
 * iSystemEvent returns "true" when a given event is a system event of a given type. When using
 * TypeScript, this function acts as a custom type guard and allows the TypeScript compiler to
 * identify the underlying data
 *
 * @param eventType The type of system event to check for, e.g., "Microsoft.AppConfiguration.KeyValueDeleted"
 * @param event The event to test.
 */
export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: CloudEvent<unknown>
): event is CloudEvent<SystemEventNameToEventData[T]>;

export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | EventGridEvent<SystemEventNameToEventData[T]>
  | CloudEvent<SystemEventNameToEventData[T]> {
  if (isCloudEventLike(event)) {
    return event.type === eventType;
  } else {
    return event.eventType === eventType;
  }
}
