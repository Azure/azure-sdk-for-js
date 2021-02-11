// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Mapper, createSerializer } from "@azure/core-client";
import { CustomEventDataDeserializer } from "./models";
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
  ACSChatMessageEventBase,
  ACSChatEventBase,
  ACSChatThreadMember,
  AcsSmsEventBase,
  AcsSmsDeliveryAttempt,
  AppConfigurationKeyValueDeletedEventData,
  AppConfigurationKeyValueModifiedEventData,
  AppEventTypeDetail,
  AppServicePlanEventTypeDetail,
  ContainerRegistryArtifactEventData,
  ContainerRegistryArtifactEventTarget,
  ContainerRegistryChartDeletedEventData,
  ContainerRegistryChartPushedEventData,
  ContainerRegistryEventActor,
  ContainerRegistryEventData,
  ContainerRegistryEventRequest,
  ContainerRegistryEventSource,
  ContainerRegistryEventTarget,
  ContainerRegistryImageDeletedEventData,
  ContainerRegistryImagePushedEventData,
  DeviceConnectionStateEventInfo,
  DeviceConnectionStateEventProperties,
  DeviceLifeCycleEventProperties,
  DeviceTelemetryEventProperties,
  DeviceTwinInfo,
  DeviceTwinInfoProperties,
  DeviceTwinInfoX509Thumbprint,
  DeviceTwinMetadata,
  DeviceTwinProperties,
  EventHubCaptureFileCreatedEventData,
  IotHubDeviceConnectedEventData,
  IotHubDeviceCreatedEventData,
  IotHubDeviceDeletedEventData,
  IotHubDeviceDisconnectedEventData,
  IotHubDeviceTelemetryEventData,
  KeyVaultCertificateExpiredEventData,
  KeyVaultCertificateNearExpiryEventData,
  KeyVaultCertificateNewVersionCreatedEventData,
  KeyVaultKeyExpiredEventData,
  KeyVaultKeyNearExpiryEventData,
  KeyVaultKeyNewVersionCreatedEventData,
  KeyVaultSecretExpiredEventData,
  KeyVaultSecretNearExpiryEventData,
  KeyVaultSecretNewVersionCreatedEventData,
  KeyVaultAccessPolicyChangedEventData,
  MachineLearningServicesDatasetDriftDetectedEventData,
  MachineLearningServicesModelDeployedEventData,
  MachineLearningServicesModelRegisteredEventData,
  MachineLearningServicesRunCompletedEventData,
  MachineLearningServicesRunStatusChangedEventData,
  MapsGeofenceEnteredEventData,
  MapsGeofenceEventProperties,
  MapsGeofenceExitedEventData,
  MapsGeofenceGeometry,
  MapsGeofenceResultEventData,
  MediaJobCanceledEventData,
  MediaJobCancelingEventData,
  MediaJobError,
  MediaJobErrorDetail,
  MediaJobErroredEventData,
  MediaJobFinishedEventData,
  MediaJobOutput,
  MediaJobOutputAsset,
  MediaJobOutputCanceledEventData,
  MediaJobOutputCancelingEventData,
  MediaJobOutputErroredEventData,
  MediaJobOutputFinishedEventData,
  MediaJobOutputProcessingEventData,
  MediaJobOutputProgressEventData,
  MediaJobOutputScheduledEventData,
  MediaJobOutputStateChangeEventData,
  MediaJobProcessingEventData,
  MediaJobScheduledEventData,
  MediaJobStateChangeEventData,
  MediaLiveEventConnectionRejectedEventData,
  MediaLiveEventEncoderConnectedEventData,
  MediaLiveEventEncoderDisconnectedEventData,
  MediaLiveEventIncomingDataChunkDroppedEventData,
  MediaLiveEventIncomingStreamReceivedEventData,
  MediaLiveEventIncomingStreamsOutOfSyncEventData,
  MediaLiveEventIncomingVideoStreamsOutOfSyncEventData,
  MediaLiveEventIngestHeartbeatEventData,
  MediaLiveEventTrackDiscontinuityDetectedEventData,
  RedisExportRDBCompletedEventData,
  RedisImportRDBCompletedEventData,
  RedisPatchingCompletedEventData,
  RedisScalingCompletedEventData,
  ResourceActionCancelEventData,
  ResourceActionFailureEventData,
  ResourceActionSuccessEventData,
  ResourceDeleteCancelEventData,
  ResourceDeleteFailureEventData,
  ResourceDeleteSuccessEventData,
  ResourceWriteCancelEventData,
  ResourceWriteFailureEventData,
  ResourceWriteSuccessEventData,
  ServiceBusActiveMessagesAvailableWithNoListenersEventData,
  ServiceBusDeadletterMessagesAvailableWithNoListenersEventData,
  SignalRServiceClientConnectionConnectedEventData,
  SignalRServiceClientConnectionDisconnectedEventData,
  StorageBlobCreatedEventData,
  StorageBlobDeletedEventData,
  StorageBlobRenamedEventData,
  StorageDirectoryCreatedEventData,
  StorageDirectoryDeletedEventData,
  StorageDirectoryRenamedEventData,
  StorageLifecyclePolicyActionSummaryDetail,
  StorageLifecyclePolicyCompletedEventData,
  SubscriptionDeletedEventData,
  SubscriptionValidationEventData,
  SubscriptionValidationResponse,
  WebAppServicePlanUpdatedEventData,
  WebAppServicePlanUpdatedEventDataSku,
  WebAppUpdatedEventData,
  WebBackupOperationCompletedEventData,
  WebBackupOperationFailedEventData,
  WebBackupOperationStartedEventData,
  WebRestoreOperationCompletedEventData,
  WebRestoreOperationFailedEventData,
  WebRestoreOperationStartedEventData,
  WebSlotSwapCompletedEventData,
  WebSlotSwapFailedEventData,
  WebSlotSwapStartedEventData,
  WebSlotSwapWithPreviewCancelledEventData,
  WebSlotSwapWithPreviewStartedEventData
} from "./generated/models/mappers";

const serializer = createSerializer({
  ACSChatMessageReceivedEventData: ACSChatMessageReceivedEventData,
  ACSChatMessageEditedEventData: ACSChatMessageEditedEventData,
  ACSChatMessageDeletedEventData: ACSChatMessageDeletedEventData,
  ACSChatThreadCreatedWithUserEventData: ACSChatThreadCreatedWithUserEventData,
  ACSChatThreadWithUserDeletedEventData: ACSChatThreadWithUserDeletedEventData,
  ACSChatThreadPropertiesUpdatedPerUserEventData: ACSChatThreadPropertiesUpdatedPerUserEventData,
  ACSChatMemberAddedToThreadWithUserEventData: ACSChatMemberAddedToThreadWithUserEventData,
  ACSChatMemberRemovedFromThreadWithUserEventData: ACSChatMemberRemovedFromThreadWithUserEventData,
  AcssmsDeliveryReportReceivedEventData: AcsSmsDeliveryReportReceivedEventData,
  AcssmsReceivedEventData: AcsSmsReceivedEventData,
  ACSChatMessageEventBase: ACSChatMessageEventBase,
  ACSChatEventBase: ACSChatEventBase,
  ACSChatThreadMember: ACSChatThreadMember,
  AcssmsEventBase: AcsSmsEventBase,
  AcssmsDeliveryAttempt: AcsSmsDeliveryAttempt,
  AppConfigurationKeyValueDeletedEventData: AppConfigurationKeyValueDeletedEventData,
  AppConfigurationKeyValueModifiedEventData: AppConfigurationKeyValueModifiedEventData,
  AppEventTypeDetail: AppEventTypeDetail,
  AppServicePlanEventTypeDetail: AppServicePlanEventTypeDetail,
  ContainerRegistryArtifactEventData: ContainerRegistryArtifactEventData,
  ContainerRegistryArtifactEventTarget: ContainerRegistryArtifactEventTarget,
  ContainerRegistryChartDeletedEventData: ContainerRegistryChartDeletedEventData,
  ContainerRegistryChartPushedEventData: ContainerRegistryChartPushedEventData,
  ContainerRegistryEventActor: ContainerRegistryEventActor,
  ContainerRegistryEventData: ContainerRegistryEventData,
  ContainerRegistryEventRequest: ContainerRegistryEventRequest,
  ContainerRegistryEventSource: ContainerRegistryEventSource,
  ContainerRegistryEventTarget: ContainerRegistryEventTarget,
  ContainerRegistryImageDeletedEventData: ContainerRegistryImageDeletedEventData,
  ContainerRegistryImagePushedEventData: ContainerRegistryImagePushedEventData,
  DeviceConnectionStateEventInfo: DeviceConnectionStateEventInfo,
  DeviceConnectionStateEventProperties: DeviceConnectionStateEventProperties,
  DeviceLifeCycleEventProperties: DeviceLifeCycleEventProperties,
  DeviceTelemetryEventProperties: DeviceTelemetryEventProperties,
  DeviceTwinInfo: DeviceTwinInfo,
  DeviceTwinInfoProperties: DeviceTwinInfoProperties,
  DeviceTwinInfoX509Thumbprint: DeviceTwinInfoX509Thumbprint,
  DeviceTwinMetadata: DeviceTwinMetadata,
  DeviceTwinProperties: DeviceTwinProperties,
  EventHubCaptureFileCreatedEventData: EventHubCaptureFileCreatedEventData,
  IotHubDeviceConnectedEventData: IotHubDeviceConnectedEventData,
  IotHubDeviceCreatedEventData: IotHubDeviceCreatedEventData,
  IotHubDeviceDeletedEventData: IotHubDeviceDeletedEventData,
  IotHubDeviceDisconnectedEventData: IotHubDeviceDisconnectedEventData,
  IotHubDeviceTelemetryEventData: IotHubDeviceTelemetryEventData,
  KeyVaultCertificateExpiredEventData: KeyVaultCertificateExpiredEventData,
  KeyVaultCertificateNearExpiryEventData: KeyVaultCertificateNearExpiryEventData,
  KeyVaultCertificateNewVersionCreatedEventData: KeyVaultCertificateNewVersionCreatedEventData,
  KeyVaultKeyExpiredEventData: KeyVaultKeyExpiredEventData,
  KeyVaultKeyNearExpiryEventData: KeyVaultKeyNearExpiryEventData,
  KeyVaultKeyNewVersionCreatedEventData: KeyVaultKeyNewVersionCreatedEventData,
  KeyVaultSecretExpiredEventData: KeyVaultSecretExpiredEventData,
  KeyVaultSecretNearExpiryEventData: KeyVaultSecretNearExpiryEventData,
  KeyVaultSecretNewVersionCreatedEventData: KeyVaultSecretNewVersionCreatedEventData,
  MachineLearningServicesDatasetDriftDetectedEventData: MachineLearningServicesDatasetDriftDetectedEventData,
  MachineLearningServicesModelDeployedEventData: MachineLearningServicesModelDeployedEventData,
  MachineLearningServicesModelRegisteredEventData: MachineLearningServicesModelRegisteredEventData,
  MachineLearningServicesRunCompletedEventData: MachineLearningServicesRunCompletedEventData,
  MachineLearningServicesRunStatusChangedEventData: MachineLearningServicesRunStatusChangedEventData,
  MapsGeofenceEnteredEventData: MapsGeofenceEnteredEventData,
  MapsGeofenceEventProperties: MapsGeofenceEventProperties,
  MapsGeofenceExitedEventData: MapsGeofenceExitedEventData,
  MapsGeofenceGeometry: MapsGeofenceGeometry,
  MapsGeofenceResultEventData: MapsGeofenceResultEventData,
  MediaJobCanceledEventData: MediaJobCanceledEventData,
  MediaJobCancelingEventData: MediaJobCancelingEventData,
  MediaJobError: MediaJobError,
  MediaJobErrorDetail: MediaJobErrorDetail,
  MediaJobErroredEventData: MediaJobErroredEventData,
  MediaJobFinishedEventData: MediaJobFinishedEventData,
  MediaJobOutput: MediaJobOutput,
  MediaJobOutputAsset: MediaJobOutputAsset,
  MediaJobOutputCanceledEventData: MediaJobOutputCanceledEventData,
  MediaJobOutputCancelingEventData: MediaJobOutputCancelingEventData,
  MediaJobOutputErroredEventData: MediaJobOutputErroredEventData,
  MediaJobOutputFinishedEventData: MediaJobOutputFinishedEventData,
  MediaJobOutputProcessingEventData: MediaJobOutputProcessingEventData,
  MediaJobOutputProgressEventData: MediaJobOutputProgressEventData,
  MediaJobOutputScheduledEventData: MediaJobOutputScheduledEventData,
  MediaJobOutputStateChangeEventData: MediaJobOutputStateChangeEventData,
  MediaJobProcessingEventData: MediaJobProcessingEventData,
  MediaJobScheduledEventData: MediaJobScheduledEventData,
  MediaJobStateChangeEventData: MediaJobStateChangeEventData,
  MediaLiveEventConnectionRejectedEventData: MediaLiveEventConnectionRejectedEventData,
  MediaLiveEventEncoderConnectedEventData: MediaLiveEventEncoderConnectedEventData,
  MediaLiveEventEncoderDisconnectedEventData: MediaLiveEventEncoderDisconnectedEventData,
  MediaLiveEventIncomingDataChunkDroppedEventData: MediaLiveEventIncomingDataChunkDroppedEventData,
  MediaLiveEventIncomingStreamReceivedEventData: MediaLiveEventIncomingStreamReceivedEventData,
  MediaLiveEventIncomingStreamsOutOfSyncEventData: MediaLiveEventIncomingStreamsOutOfSyncEventData,
  MediaLiveEventIncomingVideoStreamsOutOfSyncEventData: MediaLiveEventIncomingVideoStreamsOutOfSyncEventData,
  MediaLiveEventIngestHeartbeatEventData: MediaLiveEventIngestHeartbeatEventData,
  MediaLiveEventTrackDiscontinuityDetectedEventData: MediaLiveEventTrackDiscontinuityDetectedEventData,
  RedisExportRDBCompletedEventData: RedisExportRDBCompletedEventData,
  RedisImportRDBCompletedEventData: RedisImportRDBCompletedEventData,
  RedisPatchingCompletedEventData: RedisPatchingCompletedEventData,
  RedisScalingCompletedEventData: RedisScalingCompletedEventData,
  ResourceActionCancelEventData: ResourceActionCancelEventData,
  ResourceActionFailureEventData: ResourceActionFailureEventData,
  ResourceActionSuccessEventData: ResourceActionSuccessEventData,
  ResourceDeleteCancelEventData: ResourceDeleteCancelEventData,
  ResourceDeleteFailureEventData: ResourceDeleteFailureEventData,
  ResourceDeleteSuccessEventData: ResourceDeleteSuccessEventData,
  ResourceWriteCancelEventData: ResourceWriteCancelEventData,
  ResourceWriteFailureEventData: ResourceWriteFailureEventData,
  ResourceWriteSuccessEventData: ResourceWriteSuccessEventData,
  ServiceBusActiveMessagesAvailableWithNoListenersEventData: ServiceBusActiveMessagesAvailableWithNoListenersEventData,
  ServiceBusDeadletterMessagesAvailableWithNoListenersEventData: ServiceBusDeadletterMessagesAvailableWithNoListenersEventData,
  SignalRServiceClientConnectionConnectedEventData: SignalRServiceClientConnectionConnectedEventData,
  SignalRServiceClientConnectionDisconnectedEventData: SignalRServiceClientConnectionDisconnectedEventData,
  StorageBlobCreatedEventData: StorageBlobCreatedEventData,
  StorageBlobDeletedEventData: StorageBlobDeletedEventData,
  StorageBlobRenamedEventData: StorageBlobRenamedEventData,
  StorageDirectoryCreatedEventData: StorageDirectoryCreatedEventData,
  StorageDirectoryDeletedEventData: StorageDirectoryDeletedEventData,
  StorageDirectoryRenamedEventData: StorageDirectoryRenamedEventData,
  StorageLifecyclePolicyActionSummaryDetail: StorageLifecyclePolicyActionSummaryDetail,
  StorageLifecyclePolicyCompletedEventData: StorageLifecyclePolicyCompletedEventData,
  SubscriptionDeletedEventData: SubscriptionDeletedEventData,
  SubscriptionValidationEventData: SubscriptionValidationEventData,
  SubscriptionValidationResponse: SubscriptionValidationResponse,
  WebAppServicePlanUpdatedEventData: WebAppServicePlanUpdatedEventData,
  WebAppServicePlanUpdatedEventDataSku: WebAppServicePlanUpdatedEventDataSku,
  WebAppUpdatedEventData: WebAppUpdatedEventData,
  WebBackupOperationCompletedEventData: WebBackupOperationCompletedEventData,
  WebBackupOperationFailedEventData: WebBackupOperationFailedEventData,
  WebBackupOperationStartedEventData: WebBackupOperationStartedEventData,
  WebRestoreOperationCompletedEventData: WebRestoreOperationCompletedEventData,
  WebRestoreOperationFailedEventData: WebRestoreOperationFailedEventData,
  WebRestoreOperationStartedEventData: WebRestoreOperationStartedEventData,
  WebSlotSwapCompletedEventData: WebSlotSwapCompletedEventData,
  WebSlotSwapFailedEventData: WebSlotSwapFailedEventData,
  WebSlotSwapStartedEventData: WebSlotSwapStartedEventData,
  WebSlotSwapWithPreviewCancelledEventData: WebSlotSwapWithPreviewCancelledEventData,
  WebSlotSwapWithPreviewStartedEventData: WebSlotSwapWithPreviewStartedEventData
});

function makeDeserializerFromMapper(
  mapper: Mapper,
  initialDeserializers?: CustomEventDataDeserializer[]
): CustomEventDataDeserializer {
  return async function(o: any): Promise<any> {
    if (initialDeserializers) {
      for (const deserializer of initialDeserializers) {
        o = await deserializer(o);
      }
    }

    return serializer.deserialize(mapper, o, "");
  };
}

// Some system events are published in a format that does not match the schema they publish. In these cases, the "event data"
// field is actually a string with the event data encoded as JSON. For the few system events we know of that are incorrect we
// use this deserializer to convert from the string to an object. This function is written such that it is a no-op when a non
// string value is provided (i.e. when the system events are corrected to publish the data as an actual object, we will not break).
async function jsonParseDeserializer(o: any): Promise<any> {
  if (typeof o === "string") {
    return JSON.parse(o);
  }

  return o;
}

export const systemDeserializers: Record<string, CustomEventDataDeserializer> = {
  "Microsoft.AppConfiguration.KeyValueDeleted": makeDeserializerFromMapper(
    AppConfigurationKeyValueDeletedEventData
  ),
  "Microsoft.AppConfiguration.KeyValueModified": makeDeserializerFromMapper(
    AppConfigurationKeyValueModifiedEventData
  ),
  "Microsoft.Communication.ChatMessageReceived": makeDeserializerFromMapper(
    ACSChatMessageReceivedEventData
  ),
  "Microsoft.Communication.ChatMessageEdited": makeDeserializerFromMapper(
    ACSChatMessageEditedEventData
  ),
  "Microsoft.Communication.ChatMessageDeleted": makeDeserializerFromMapper(
    ACSChatMessageDeletedEventData
  ),
  "Microsoft.Communication.ChatThreadCreatedWithUser": makeDeserializerFromMapper(
    ACSChatThreadCreatedWithUserEventData
  ),
  "Microsoft.Communication.ChatThreadWithUserDeleted": makeDeserializerFromMapper(
    ACSChatThreadWithUserDeletedEventData
  ),
  "Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser": makeDeserializerFromMapper(
    ACSChatThreadPropertiesUpdatedPerUserEventData
  ),
  "Microsoft.Communication.ChatMemberAddedToThreadWithUser": makeDeserializerFromMapper(
    ACSChatMemberAddedToThreadWithUserEventData
  ),
  "Microsoft.Communication.ChatMemberRemovedFromThreadWithUser": makeDeserializerFromMapper(
    ACSChatMemberRemovedFromThreadWithUserEventData
  ),
  "Microsoft.Communication.SMSDeliveryReportReceived": makeDeserializerFromMapper(
    AcsSmsDeliveryReportReceivedEventData
  ),
  "Microsoft.Communication.SMSReceived": makeDeserializerFromMapper(AcsSmsReceivedEventData),
  "Microsoft.ContainerRegistry.ChartDeleted": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ChartPushed": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ImageDeleted": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ImagePushed": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.Devices.DeviceCreated": makeDeserializerFromMapper(IotHubDeviceCreatedEventData),
  "Microsoft.Devices.DeviceDeleted": makeDeserializerFromMapper(IotHubDeviceDeletedEventData),
  "Microsoft.Devices.DeviceConnected": makeDeserializerFromMapper(IotHubDeviceConnectedEventData),
  "Microsoft.Devices.DeviceDisconnected": makeDeserializerFromMapper(
    IotHubDeviceDisconnectedEventData
  ),
  "Microsoft.Devices.DeviceTelemetry": makeDeserializerFromMapper(IotHubDeviceTelemetryEventData),
  "Microsoft.EventGrid.SubscriptionValidationEvent": makeDeserializerFromMapper(
    SubscriptionValidationEventData
  ),
  "Microsoft.EventGrid.SubscriptionDeletedEvent": makeDeserializerFromMapper(
    SubscriptionDeletedEventData
  ),
  "Microsoft.EventHub.CaptureFileCreated": makeDeserializerFromMapper(
    EventHubCaptureFileCreatedEventData
  ),
  "Microsoft.KeyVault.CertificateNewVersionCreated": makeDeserializerFromMapper(
    KeyVaultCertificateNewVersionCreatedEventData
  ),
  "Microsoft.KeyVault.CertificateNearExpiry": makeDeserializerFromMapper(
    KeyVaultCertificateNearExpiryEventData
  ),
  "Microsoft.KeyVault.CertificateExpired": makeDeserializerFromMapper(
    KeyVaultCertificateExpiredEventData
  ),
  "Microsoft.KeyVault.KeyNewVersionCreated": makeDeserializerFromMapper(
    KeyVaultKeyNewVersionCreatedEventData
  ),
  "Microsoft.KeyVault.KeyNearExpiry": makeDeserializerFromMapper(KeyVaultKeyNearExpiryEventData),
  "Microsoft.KeyVault.KeyExpired": makeDeserializerFromMapper(KeyVaultKeyExpiredEventData),
  "Microsoft.KeyVault.SecretNewVersionCreated": makeDeserializerFromMapper(
    KeyVaultSecretNewVersionCreatedEventData
  ),
  "Microsoft.KeyVault.SecretNearExpiry": makeDeserializerFromMapper(
    KeyVaultSecretNearExpiryEventData
  ),
  "Microsoft.KeyVault.SecretExpired": makeDeserializerFromMapper(KeyVaultSecretExpiredEventData),
  "Microsoft.KeyVault.VaultAccessPolicyChanged": makeDeserializerFromMapper(
    KeyVaultAccessPolicyChangedEventData
  ),
  "Microsoft.MachineLearningServices.DatasetDriftDetected": makeDeserializerFromMapper(
    MachineLearningServicesDatasetDriftDetectedEventData
  ),
  "Microsoft.MachineLearningServices.ModelDeployed": makeDeserializerFromMapper(
    MachineLearningServicesModelDeployedEventData
  ),
  "Microsoft.MachineLearningServices.ModelRegistered": makeDeserializerFromMapper(
    MachineLearningServicesModelRegisteredEventData
  ),
  "Microsoft.MachineLearningServices.RunCompleted": makeDeserializerFromMapper(
    MachineLearningServicesRunCompletedEventData
  ),
  "Microsoft.MachineLearningServices.RunStatusChanged": makeDeserializerFromMapper(
    MachineLearningServicesRunStatusChangedEventData
  ),
  "Microsoft.Maps.GeofenceEntered": makeDeserializerFromMapper(MapsGeofenceEnteredEventData),
  "Microsoft.Maps.GeofenceExited": makeDeserializerFromMapper(MapsGeofenceExitedEventData),
  "Microsoft.Maps.GeofenceResult": makeDeserializerFromMapper(MapsGeofenceResultEventData),
  "Microsoft.Media.JobStateChange": makeDeserializerFromMapper(MediaJobStateChangeEventData),
  "Microsoft.Media.JobOutputStateChange": makeDeserializerFromMapper(
    MediaJobOutputStateChangeEventData
  ),
  "Microsoft.Media.JobScheduled": makeDeserializerFromMapper(MediaJobScheduledEventData),
  "Microsoft.Media.JobProcessing": makeDeserializerFromMapper(MediaJobProcessingEventData),
  "Microsoft.Media.JobCanceling": makeDeserializerFromMapper(MediaJobCancelingEventData),
  "Microsoft.Media.JobFinished": makeDeserializerFromMapper(MediaJobFinishedEventData),
  "Microsoft.Media.JobCanceled": makeDeserializerFromMapper(MediaJobCanceledEventData),
  "Microsoft.Media.JobErrored": makeDeserializerFromMapper(MediaJobErroredEventData),
  "Microsoft.Media.JobOutputCanceled": makeDeserializerFromMapper(MediaJobOutputCanceledEventData),
  "Microsoft.Media.JobOutputCanceling": makeDeserializerFromMapper(
    MediaJobOutputCancelingEventData
  ),
  "Microsoft.Media.JobOutputErrored": makeDeserializerFromMapper(MediaJobOutputErroredEventData),
  "Microsoft.Media.JobOutputFinished": makeDeserializerFromMapper(MediaJobOutputFinishedEventData),
  "Microsoft.Media.JobOutputProcessing": makeDeserializerFromMapper(
    MediaJobOutputProcessingEventData
  ),
  "Microsoft.Media.JobOutputScheduled": makeDeserializerFromMapper(
    MediaJobOutputScheduledEventData
  ),
  "Microsoft.Media.JobOutputProgress": makeDeserializerFromMapper(MediaJobOutputProgressEventData),
  "Microsoft.Media.LiveEventEncoderConnected": makeDeserializerFromMapper(
    MediaLiveEventEncoderConnectedEventData
  ),
  "Microsoft.Media.LiveEventConnectionRejected": makeDeserializerFromMapper(
    MediaLiveEventConnectionRejectedEventData
  ),
  "Microsoft.Media.LiveEventEncoderDisconnected": makeDeserializerFromMapper(
    MediaLiveEventEncoderDisconnectedEventData
  ),
  "Microsoft.Media.LiveEventIncomingStreamReceived": makeDeserializerFromMapper(
    MediaLiveEventIncomingStreamReceivedEventData
  ),
  "Microsoft.Media.LiveEventIncomingStreamsOutOfSync": makeDeserializerFromMapper(
    MediaLiveEventIncomingStreamsOutOfSyncEventData
  ),
  "Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync": makeDeserializerFromMapper(
    MediaLiveEventIncomingVideoStreamsOutOfSyncEventData
  ),
  "Microsoft.Media.LiveEventIncomingDataChunkDropped": makeDeserializerFromMapper(
    MediaLiveEventIncomingDataChunkDroppedEventData
  ),
  "Microsoft.Media.LiveEventIngestHeartbeat": makeDeserializerFromMapper(
    MediaLiveEventIngestHeartbeatEventData
  ),
  "Microsoft.Media.LiveEventTrackDiscontinuityDetected": makeDeserializerFromMapper(
    MediaLiveEventTrackDiscontinuityDetectedEventData
  ),
  "Microsoft.Resources.ResourceWriteSuccess": makeDeserializerFromMapper(
    ResourceWriteSuccessEventData
  ),
  "Microsoft.Resources.ResourceWriteFailure": makeDeserializerFromMapper(
    ResourceWriteFailureEventData
  ),
  "Microsoft.Resources.ResourceWriteCancel": makeDeserializerFromMapper(
    ResourceWriteCancelEventData
  ),
  "Microsoft.Resources.ResourceDeleteSuccess": makeDeserializerFromMapper(
    ResourceDeleteSuccessEventData
  ),
  "Microsoft.Resources.ResourceDeleteFailure": makeDeserializerFromMapper(
    ResourceDeleteFailureEventData
  ),
  "Microsoft.Resources.ResourceDeleteCancel": makeDeserializerFromMapper(
    ResourceDeleteCancelEventData
  ),
  "Microsoft.Resources.ResourceActionSuccess": makeDeserializerFromMapper(
    ResourceActionSuccessEventData
  ),
  "Microsoft.Resources.ResourceActionFailure": makeDeserializerFromMapper(
    ResourceActionFailureEventData
  ),
  "Microsoft.Resources.ResourceActionCancel": makeDeserializerFromMapper(
    ResourceActionCancelEventData
  ),
  "Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners": makeDeserializerFromMapper(
    ServiceBusActiveMessagesAvailableWithNoListenersEventData
  ),
  "Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListener": makeDeserializerFromMapper(
    ServiceBusDeadletterMessagesAvailableWithNoListenersEventData
  ),
  "Microsoft.Storage.BlobCreated": makeDeserializerFromMapper(StorageBlobCreatedEventData),
  "Microsoft.Storage.BlobDeleted": makeDeserializerFromMapper(StorageBlobDeletedEventData),
  "Microsoft.Storage.BlobRenamed": makeDeserializerFromMapper(StorageBlobRenamedEventData),
  "Microsoft.Storage.DirectoryCreated": makeDeserializerFromMapper(
    StorageDirectoryCreatedEventData
  ),
  "Microsoft.Storage.DirectoryDeleted": makeDeserializerFromMapper(
    StorageDirectoryDeletedEventData
  ),
  "Microsoft.Storage.DirectoryRenamed": makeDeserializerFromMapper(
    StorageDirectoryRenamedEventData
  ),
  "Microsoft.Storage.LifecyclePolicyCompleted": makeDeserializerFromMapper(
    StorageLifecyclePolicyCompletedEventData
  ),
  "Microsoft.Web.AppUpdated": makeDeserializerFromMapper(WebAppUpdatedEventData),
  "Microsoft.Web.BackupOperationStarted": makeDeserializerFromMapper(
    WebBackupOperationStartedEventData
  ),
  "Microsoft.Web.BackupOperationCompleted": makeDeserializerFromMapper(
    WebBackupOperationCompletedEventData
  ),
  "Microsoft.Web.BackupOperationFailed": makeDeserializerFromMapper(
    WebBackupOperationFailedEventData
  ),
  "Microsoft.Web.RestoreOperationStarted": makeDeserializerFromMapper(
    WebRestoreOperationStartedEventData
  ),
  "Microsoft.Web.RestoreOperationCompleted": makeDeserializerFromMapper(
    WebRestoreOperationCompletedEventData
  ),
  "Microsoft.Web.RestoreOperationFailed": makeDeserializerFromMapper(
    WebRestoreOperationFailedEventData
  ),
  "Microsoft.Web.SlotSwapStarted": makeDeserializerFromMapper(WebSlotSwapStartedEventData),
  "Microsoft.Web.SlotSwapCompleted": makeDeserializerFromMapper(WebSlotSwapCompletedEventData),
  "Microsoft.Web.SlotSwapFailed": makeDeserializerFromMapper(WebSlotSwapFailedEventData),
  "Microsoft.Web.SlotSwapWithPreviewStarted": makeDeserializerFromMapper(
    WebSlotSwapWithPreviewStartedEventData
  ),
  "Microsoft.Web.SlotSwapWithPreviewCancelled": makeDeserializerFromMapper(
    WebSlotSwapWithPreviewCancelledEventData
  ),
  "Microsoft.Web.AppServicePlanUpdated": makeDeserializerFromMapper(
    WebAppServicePlanUpdatedEventData
  )
};
