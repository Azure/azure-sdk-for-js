// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ACSChatMessageReceivedEventData,
  ACSChatMessageEditedEventData,
  ACSChatMessageDeletedEventData,
  ACSChatThreadCreatedWithUserEventData,
  ACSChatThreadWithUserDeletedEventData,
  ACSChatThreadPropertiesUpdatedPerUserEventData,
  ACSChatMemberAddedToThreadWithUserEventData,
  ACSChatMemberRemovedFromThreadWithUserEventData,
  AcsSmsDeliveryReportReceivedEventData,
  AcsSmsReceivedEventData,
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
  KeyVaultCertificateNewVersionCreatedEventData,
  KeyVaultCertificateNearExpiryEventData,
  KeyVaultCertificateExpiredEventData,
  KeyVaultKeyNewVersionCreatedEventData,
  KeyVaultKeyNearExpiryEventData,
  KeyVaultKeyExpiredEventData,
  KeyVaultSecretNewVersionCreatedEventData,
  KeyVaultSecretNearExpiryEventData,
  KeyVaultSecretExpiredEventData,
  KeyVaultAccessPolicyChangedEventData,
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
  | "Microsoft.Communication.ChatMessageReceived"
  | "Microsoft.Communication.ChatMessageEdited"
  | "Microsoft.Communication.ChatMessageDeleted"
  | "Microsoft.Communication.ChatThreadCreatedWithUser"
  | "Microsoft.Communication.ChatThreadWithUserDeleted"
  | "Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser"
  | "Microsoft.Communication.ChatMemberAddedToThreadWithUser"
  | "Microsoft.Communication.ChatMemberRemovedFromThreadWithUser"
  | "Microsoft.Communication.SMSDeliveryReportReceived"
  | "Microsoft.Communication.SMSReceived"
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
  | "Microsoft.KeyVault.CertificateNewVersionCreated"
  | "Microsoft.KeyVault.CertificateNearExpiry"
  | "Microsoft.KeyVault.CertificateExpired"
  | "Microsoft.KeyVault.KeyNewVersionCreated"
  | "Microsoft.KeyVault.KeyNearExpiry"
  | "Microsoft.KeyVault.KeyExpired"
  | "Microsoft.KeyVault.SecretNewVersionCreated"
  | "Microsoft.KeyVault.SecretNearExpiry"
  | "Microsoft.KeyVault.SecretExpired"
  | "Microsoft.KeyVault.VaultAccessPolicyChanged"
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
  /** An interface for the event data of a "Microsoft.Communication.ChatMessageReceived" event. */
  "Microsoft.Communication.ChatMessageReceived": ACSChatMessageReceivedEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatMessageEdited" event. */
  "Microsoft.Communication.ChatMessageEdited": ACSChatMessageEditedEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatMessageDeleted" event. */
  "Microsoft.Communication.ChatMessageDeleted": ACSChatMessageDeletedEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatThreadCreatedWithUser" event. */
  "Microsoft.Communication.ChatThreadCreatedWithUser": ACSChatThreadCreatedWithUserEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatThreadWithUserDeleted" event. */
  "Microsoft.Communication.ChatThreadWithUserDeleted": ACSChatThreadWithUserDeletedEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser" event. */
  "Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser": ACSChatThreadPropertiesUpdatedPerUserEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatMemberAddedToThreadWithUser" event. */
  "Microsoft.Communication.ChatMemberAddedToThreadWithUser": ACSChatMemberAddedToThreadWithUserEventData;
  /** An interface for the event data of a "Microsoft.Communication.ChatMemberRemovedFromThreadWithUser" event. */
  "Microsoft.Communication.ChatMemberRemovedFromThreadWithUser": ACSChatMemberRemovedFromThreadWithUserEventData;
  /** An interface for the event data of a "Microsoft.Communication.SMSDeliveryReportReceived" event. */
  "Microsoft.Communication.SMSDeliveryReportReceived": AcsSmsDeliveryReportReceivedEventData;
  /** An interface for the event data of a "Microsoft.Communication.SMSReceived" event. */
  "Microsoft.Communication.SMSReceived": AcsSmsReceivedEventData;
  /** An interface for the event data of a "Microsoft.AppConfiguration.KeyValueDeleted" event. */
  "Microsoft.AppConfiguration.KeyValueDeleted": AppConfigurationKeyValueDeletedEventData;
  /** An interface for the event data of a "Microsoft.AppConfiguration.KeyValueModified" event. */
  "Microsoft.AppConfiguration.KeyValueModified": AppConfigurationKeyValueModifiedEventData;
  /** An interface for the event data of a "Microsoft.ContainerRegistry.ImagePushed" event. */
  "Microsoft.ContainerRegistry.ImagePushed": ContainerRegistryImagePushedEventData;
  /** An interface for the event data of a "Microsoft.ContainerRegistry.ImageDeleted" event. */
  "Microsoft.ContainerRegistry.ImageDeleted": ContainerRegistryImageDeletedEventData;
  /** An interface for the event data of a "Microsoft.ContainerRegistry.ChartDeleted" event. */
  "Microsoft.ContainerRegistry.ChartDeleted": ContainerRegistryChartDeletedEventData;
  /** An interface for the event data of a "Microsoft.ContainerRegistry.ChartPushed" event. */
  "Microsoft.ContainerRegistry.ChartPushed": ContainerRegistryChartPushedEventData;
  /** An interface for the event data of a "Microsoft.Devices.DeviceCreated" event. */
  "Microsoft.Devices.DeviceCreated": IotHubDeviceCreatedEventData;
  /** An interface for the event data of a "Microsoft.Devices.DeviceDeleted" event. */
  "Microsoft.Devices.DeviceDeleted": IotHubDeviceDeletedEventData;
  /** An interface for the event data of a "Microsoft.Devices.DeviceConnected" event. */
  "Microsoft.Devices.DeviceConnected": IotHubDeviceConnectedEventData;
  /** An interface for the event data of a "Microsoft.Devices.DeviceDisconnected" event. */
  "Microsoft.Devices.DeviceDisconnected": IotHubDeviceDisconnectedEventData;
  /** An interface for the event data of a "Microsoft.Devices.DeviceTelemetry" event. */
  "Microsoft.Devices.DeviceTelemetry": IotHubDeviceTelemetryEventData;
  /** An interface for the event data of a "Microsoft.EventGrid.SubscriptionValidationEvent" event. */
  "Microsoft.EventGrid.SubscriptionValidationEvent": SubscriptionValidationEventData;
  /** An interface for the event data of a "Microsoft.EventGrid.SubscriptionDeletedEvent" event. */
  "Microsoft.EventGrid.SubscriptionDeletedEvent": SubscriptionDeletedEventData;
  /** An interface for the event data of a "Microsoft.EventHub.CaptureFileCreated" event. */
  "Microsoft.EventHub.CaptureFileCreated": EventHubCaptureFileCreatedEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.CertificateNewVersionCreated" event. */
  "Microsoft.KeyVault.CertificateNewVersionCreated": KeyVaultCertificateNewVersionCreatedEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.CertificateNearExpiry" event. */
  "Microsoft.KeyVault.CertificateNearExpiry": KeyVaultCertificateNearExpiryEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.CertificateExpired" event. */
  "Microsoft.KeyVault.CertificateExpired": KeyVaultCertificateExpiredEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.KeyNewVersionCreated" event. */
  "Microsoft.KeyVault.KeyNewVersionCreated": KeyVaultKeyNewVersionCreatedEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.KeyNearExpiry" event. */
  "Microsoft.KeyVault.KeyNearExpiry": KeyVaultKeyNearExpiryEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.KeyExpired" event. */
  "Microsoft.KeyVault.KeyExpired": KeyVaultKeyExpiredEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.SecretNewVersionCreated" event. */
  "Microsoft.KeyVault.SecretNewVersionCreated": KeyVaultSecretNewVersionCreatedEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.SecretNearExpiry" event. */
  "Microsoft.KeyVault.SecretNearExpiry": KeyVaultSecretNearExpiryEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.SecretExpired" event. */
  "Microsoft.KeyVault.SecretExpired": KeyVaultSecretExpiredEventData;
  /** An interface for the event data of a "Microsoft.KeyVault.VaultAccessPolicyChanged" event. */
  "Microsoft.KeyVault.VaultAccessPolicyChanged": KeyVaultAccessPolicyChangedEventData;
  /** An interface for the event data of a "Microsoft.MachineLearningServices.DatasetDriftDetected" event. */
  "Microsoft.MachineLearningServices.DatasetDriftDetected": MachineLearningServicesDatasetDriftDetectedEventData;
  /** An interface for the event data of a "Microsoft.MachineLearningServices.ModelDeployed" event. */
  "Microsoft.MachineLearningServices.ModelDeployed": MachineLearningServicesModelDeployedEventData;
  /** An interface for the event data of a "Microsoft.MachineLearningServices.ModelRegistered" event. */
  "Microsoft.MachineLearningServices.ModelRegistered": MachineLearningServicesModelRegisteredEventData;
  /** An interface for the event data of a "Microsoft.MachineLearningServices.RunCompleted" event. */
  "Microsoft.MachineLearningServices.RunCompleted": MachineLearningServicesRunCompletedEventData;
  /** An interface for the event data of a "Microsoft.MachineLearningServices.RunStatusChanged" event. */
  "Microsoft.MachineLearningServices.RunStatusChanged": MachineLearningServicesRunStatusChangedEventData;
  /** An interface for the event data of a "Microsoft.Maps.GeofenceEntered" event. */
  "Microsoft.Maps.GeofenceEntered": MapsGeofenceEnteredEventData;
  /** An interface for the event data of a "Microsoft.Maps.GeofenceExited" event. */
  "Microsoft.Maps.GeofenceExited": MapsGeofenceExitedEventData;
  /** An interface for the event data of a "Microsoft.Maps.GeofenceResult" event. */
  "Microsoft.Maps.GeofenceResult": MapsGeofenceResultEventData;
  /** An interface for the event data of a "Microsoft.Media.JobStateChange" event. */
  "Microsoft.Media.JobStateChange": MediaJobStateChangeEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputStateChange" event. */
  "Microsoft.Media.JobOutputStateChange": MediaJobOutputStateChangeEventData;
  /** An interface for the event data of a "Microsoft.Media.JobScheduled" event. */
  "Microsoft.Media.JobScheduled": MediaJobScheduledEventData;
  /** An interface for the event data of a "Microsoft.Media.JobProcessing" event. */
  "Microsoft.Media.JobProcessing": MediaJobProcessingEventData;
  /** An interface for the event data of a "Microsoft.Media.JobCanceling" event. */
  "Microsoft.Media.JobCanceling": MediaJobCancelingEventData;
  /** An interface for the event data of a "Microsoft.Media.JobFinished" event. */
  "Microsoft.Media.JobFinished": MediaJobFinishedEventData;
  /** An interface for the event data of a "Microsoft.Media.JobCanceled" event. */
  "Microsoft.Media.JobCanceled": MediaJobCanceledEventData;
  /** An interface for the event data of a "Microsoft.Media.JobErrored" event. */
  "Microsoft.Media.JobErrored": MediaJobErroredEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputCanceled" event. */
  "Microsoft.Media.JobOutputCanceled": MediaJobOutputCanceledEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputCanceling" event. */
  "Microsoft.Media.JobOutputCanceling": MediaJobOutputCancelingEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputErrored" event. */
  "Microsoft.Media.JobOutputErrored": MediaJobOutputErroredEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputFinished" event. */
  "Microsoft.Media.JobOutputFinished": MediaJobOutputFinishedEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputProcessing" event. */
  "Microsoft.Media.JobOutputProcessing": MediaJobOutputProcessingEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputScheduled" event. */
  "Microsoft.Media.JobOutputScheduled": MediaJobOutputScheduledEventData;
  /** An interface for the event data of a "Microsoft.Media.JobOutputProgress" event. */
  "Microsoft.Media.JobOutputProgress": MediaJobOutputProgressEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventEncoderConnected" event. */
  "Microsoft.Media.LiveEventEncoderConnected": MediaLiveEventEncoderConnectedEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventConnectionRejected" event. */
  "Microsoft.Media.LiveEventConnectionRejected": MediaLiveEventConnectionRejectedEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventEncoderDisconnected" event. */
  "Microsoft.Media.LiveEventEncoderDisconnected": MediaLiveEventEncoderDisconnectedEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventIncomingStreamReceived" event. */
  "Microsoft.Media.LiveEventIncomingStreamReceived": MediaLiveEventIncomingStreamReceivedEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventIncomingStreamsOutOfSync" event. */
  "Microsoft.Media.LiveEventIncomingStreamsOutOfSync": MediaLiveEventIncomingStreamsOutOfSyncEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync" event. */
  "Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync": MediaLiveEventIncomingVideoStreamsOutOfSyncEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventIncomingDataChunkDropped" event. */
  "Microsoft.Media.LiveEventIncomingDataChunkDropped": MediaLiveEventIncomingDataChunkDroppedEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventIngestHeartbeat" event. */
  "Microsoft.Media.LiveEventIngestHeartbeat": MediaLiveEventIngestHeartbeatEventData;
  /** An interface for the event data of a "Microsoft.Media.LiveEventTrackDiscontinuityDetected" event. */
  "Microsoft.Media.LiveEventTrackDiscontinuityDetected": MediaLiveEventTrackDiscontinuityDetectedEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceWriteSuccess" event. */
  "Microsoft.Resources.ResourceWriteSuccess": ResourceWriteSuccessEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceWriteFailure" event. */
  "Microsoft.Resources.ResourceWriteFailure": ResourceWriteFailureEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceWriteCancel" event. */
  "Microsoft.Resources.ResourceWriteCancel": ResourceWriteCancelEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceDeleteSuccess" event. */
  "Microsoft.Resources.ResourceDeleteSuccess": ResourceDeleteSuccessEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceDeleteFailure" event. */
  "Microsoft.Resources.ResourceDeleteFailure": ResourceDeleteFailureEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceDeleteCancel" event. */
  "Microsoft.Resources.ResourceDeleteCancel": ResourceDeleteCancelEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceActionSuccess" event. */
  "Microsoft.Resources.ResourceActionSuccess": ResourceActionSuccessEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceActionFailure" event. */
  "Microsoft.Resources.ResourceActionFailure": ResourceActionFailureEventData;
  /** An interface for the event data of a "Microsoft.Resources.ResourceActionCancel" event. */
  "Microsoft.Resources.ResourceActionCancel": ResourceActionCancelEventData;
  /** An interface for the event data of a "Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners" event. */
  "Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners": ServiceBusActiveMessagesAvailableWithNoListenersEventData;
  /** An interface for the event data of a "Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener" event. */
  "Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener": ServiceBusDeadletterMessagesAvailableWithNoListenersEventData;
  /** An interface for the event data of a "Microsoft.Storage.BlobCreated" event. */
  "Microsoft.Storage.BlobCreated": StorageBlobCreatedEventData;
  /** An interface for the event data of a "Microsoft.Storage.BlobDeleted" event. */
  "Microsoft.Storage.BlobDeleted": StorageBlobDeletedEventData;
  /** An interface for the event data of a "Microsoft.Storage.BlobRenamed" event. */
  "Microsoft.Storage.BlobRenamed": StorageBlobRenamedEventData;
  /** An interface for the event data of a "Microsoft.Storage.DirectoryCreated" event. */
  "Microsoft.Storage.DirectoryCreated": StorageDirectoryCreatedEventData;
  /** An interface for the event data of a "Microsoft.Storage.DirectoryDeleted" event. */
  "Microsoft.Storage.DirectoryDeleted": StorageDirectoryDeletedEventData;
  /** An interface for the event data of a "Microsoft.Storage.DirectoryRenamed" event. */
  "Microsoft.Storage.DirectoryRenamed": StorageDirectoryRenamedEventData;
  /** An interface for the event data of a "Microsoft.Storage.LifecyclePolicyCompleted" event. */
  "Microsoft.Storage.LifecyclePolicyCompleted": StorageLifecyclePolicyCompletedEventData;
  /** An interface for the event data of a "Microsoft.Web.AppUpdated" event. */
  "Microsoft.Web.AppUpdated": WebAppUpdatedEventData;
  /** An interface for the event data of a "Microsoft.Web.BackupOperationStarted" event. */
  "Microsoft.Web.BackupOperationStarted": WebBackupOperationStartedEventData;
  /** An interface for the event data of a "Microsoft.Web.BackupOperationCompleted" event. */
  "Microsoft.Web.BackupOperationCompleted": WebBackupOperationCompletedEventData;
  /** An interface for the event data of a "Microsoft.Web.BackupOperationFailed" event. */
  "Microsoft.Web.BackupOperationFailed": WebBackupOperationFailedEventData;
  /** An interface for the event data of a "Microsoft.Web.RestoreOperationStarted" event. */
  "Microsoft.Web.RestoreOperationStarted": WebRestoreOperationStartedEventData;
  /** An interface for the event data of a "Microsoft.Web.RestoreOperationCompleted" event. */
  "Microsoft.Web.RestoreOperationCompleted": WebRestoreOperationCompletedEventData;
  /** An interface for the event data of a "Microsoft.Web.RestoreOperationFailed" event. */
  "Microsoft.Web.RestoreOperationFailed": WebRestoreOperationFailedEventData;
  /** An interface for the event data of a "Microsoft.Web.SlotSwapStarted" event. */
  "Microsoft.Web.SlotSwapStarted": WebSlotSwapStartedEventData;
  /** An interface for the event data of a "Microsoft.Web.SlotSwapCompleted" event. */
  "Microsoft.Web.SlotSwapCompleted": WebSlotSwapCompletedEventData;
  /** An interface for the event data of a "Microsoft.Web.SlotSwapFailed" event. */
  "Microsoft.Web.SlotSwapFailed": WebSlotSwapFailedEventData;
  /** An interface for the event data of a "Microsoft.Web.SlotSwapWithPreviewStarted" event. */
  "Microsoft.Web.SlotSwapWithPreviewStarted": WebSlotSwapWithPreviewStartedEventData;
  /** An interface for the event data of a "Microsoft.Web.SlotSwapWithPreviewCancelled" event. */
  "Microsoft.Web.SlotSwapWithPreviewCancelled": WebSlotSwapWithPreviewCancelledEventData;
  /** An interface for the event data of a "Microsoft.Web.AppServicePlanUpdated" event. */
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
