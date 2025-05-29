"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownServiceApiVersions = exports.KnownEventGridMqttClientDisconnectionReason = exports.KnownEventGridMqttClientState = exports.KnownAsyncStatus = exports.KnownAppServicePlanAction = exports.KnownStampKind = exports.KnownAppAction = exports.KnownStorageTaskAssignmentCompletedStatus = exports.KnownStorageTaskCompletedStatus = exports.KnownStorageLifecycleCompletionStatus = exports.KnownStorageBlobAccessTier = exports.KnownHealthcareFhirResourceType = exports.KnownDataBoxStageName = exports.KnownAcsInteractiveReplyKind = exports.KnownAcsMessageChannelKind = exports.KnownAcsMessageDeliveryStatus = exports.KnownAcsRouterUpdatedWorkerProperty = exports.KnownAcsRouterJobStatus = exports.KnownAcsRouterWorkerSelectorState = exports.KnownAcsRouterLabelOperator = exports.KnownAcsUserEngagement = exports.KnownAcsEmailDeliveryReportStatus = exports.KnownRecordingFormatType = exports.KnownRecordingChannelType = exports.KnownRecordingContentType = exports.KnownCommunicationCloudEnvironmentModel = exports.KnownCommunicationIdentifierModelKind = void 0;
exports.apiCenterApiDefinitionAddedEventDataDeserializer = apiCenterApiDefinitionAddedEventDataDeserializer;
exports.apiCenterApiSpecificationDeserializer = apiCenterApiSpecificationDeserializer;
exports.apiCenterApiDefinitionUpdatedEventDataDeserializer = apiCenterApiDefinitionUpdatedEventDataDeserializer;
exports.apiManagementUserCreatedEventDataDeserializer = apiManagementUserCreatedEventDataDeserializer;
exports.apiManagementUserUpdatedEventDataDeserializer = apiManagementUserUpdatedEventDataDeserializer;
exports.apiManagementUserDeletedEventDataDeserializer = apiManagementUserDeletedEventDataDeserializer;
exports.apiManagementSubscriptionCreatedEventDataDeserializer = apiManagementSubscriptionCreatedEventDataDeserializer;
exports.apiManagementSubscriptionUpdatedEventDataDeserializer = apiManagementSubscriptionUpdatedEventDataDeserializer;
exports.apiManagementSubscriptionDeletedEventDataDeserializer = apiManagementSubscriptionDeletedEventDataDeserializer;
exports.apiManagementProductCreatedEventDataDeserializer = apiManagementProductCreatedEventDataDeserializer;
exports.apiManagementProductUpdatedEventDataDeserializer = apiManagementProductUpdatedEventDataDeserializer;
exports.apiManagementProductDeletedEventDataDeserializer = apiManagementProductDeletedEventDataDeserializer;
exports.apiManagementApiCreatedEventDataDeserializer = apiManagementApiCreatedEventDataDeserializer;
exports.apiManagementApiUpdatedEventDataDeserializer = apiManagementApiUpdatedEventDataDeserializer;
exports.apiManagementApiDeletedEventDataDeserializer = apiManagementApiDeletedEventDataDeserializer;
exports.apiManagementApiReleaseCreatedEventDataDeserializer = apiManagementApiReleaseCreatedEventDataDeserializer;
exports.apiManagementApiReleaseUpdatedEventDataDeserializer = apiManagementApiReleaseUpdatedEventDataDeserializer;
exports.apiManagementApiReleaseDeletedEventDataDeserializer = apiManagementApiReleaseDeletedEventDataDeserializer;
exports.apiManagementGatewayCreatedEventDataDeserializer = apiManagementGatewayCreatedEventDataDeserializer;
exports.apiManagementGatewayUpdatedEventDataDeserializer = apiManagementGatewayUpdatedEventDataDeserializer;
exports.apiManagementGatewayDeletedEventDataDeserializer = apiManagementGatewayDeletedEventDataDeserializer;
exports.apiManagementGatewayHostnameConfigurationCreatedEventDataDeserializer = apiManagementGatewayHostnameConfigurationCreatedEventDataDeserializer;
exports.apiManagementGatewayHostnameConfigurationUpdatedEventDataDeserializer = apiManagementGatewayHostnameConfigurationUpdatedEventDataDeserializer;
exports.apiManagementGatewayHostnameConfigurationDeletedEventDataDeserializer = apiManagementGatewayHostnameConfigurationDeletedEventDataDeserializer;
exports.apiManagementGatewayCertificateAuthorityCreatedEventDataDeserializer = apiManagementGatewayCertificateAuthorityCreatedEventDataDeserializer;
exports.apiManagementGatewayCertificateAuthorityUpdatedEventDataDeserializer = apiManagementGatewayCertificateAuthorityUpdatedEventDataDeserializer;
exports.apiManagementGatewayCertificateAuthorityDeletedEventDataDeserializer = apiManagementGatewayCertificateAuthorityDeletedEventDataDeserializer;
exports.apiManagementGatewayApiAddedEventDataDeserializer = apiManagementGatewayApiAddedEventDataDeserializer;
exports.apiManagementGatewayApiRemovedEventDataDeserializer = apiManagementGatewayApiRemovedEventDataDeserializer;
exports.appConfigurationKeyValueModifiedEventDataDeserializer = appConfigurationKeyValueModifiedEventDataDeserializer;
exports.appConfigurationKeyValueDeletedEventDataDeserializer = appConfigurationKeyValueDeletedEventDataDeserializer;
exports.appConfigurationSnapshotEventDataDeserializer = appConfigurationSnapshotEventDataDeserializer;
exports.appConfigurationSnapshotCreatedEventDataDeserializer = appConfigurationSnapshotCreatedEventDataDeserializer;
exports.appConfigurationSnapshotModifiedEventDataDeserializer = appConfigurationSnapshotModifiedEventDataDeserializer;
exports.avsPrivateCloudEventDataDeserializer = avsPrivateCloudEventDataDeserializer;
exports.avsPrivateCloudUpdatingEventDataDeserializer = avsPrivateCloudUpdatingEventDataDeserializer;
exports.avsPrivateCloudUpdatedEventDataDeserializer = avsPrivateCloudUpdatedEventDataDeserializer;
exports.avsPrivateCloudFailedEventDataDeserializer = avsPrivateCloudFailedEventDataDeserializer;
exports.avsClusterEventDataDeserializer = avsClusterEventDataDeserializer;
exports.avsClusterCreatedEventDataDeserializer = avsClusterCreatedEventDataDeserializer;
exports.avsClusterDeletedEventDataDeserializer = avsClusterDeletedEventDataDeserializer;
exports.avsClusterUpdatingEventDataDeserializer = avsClusterUpdatingEventDataDeserializer;
exports.avsClusterUpdatedEventDataDeserializer = avsClusterUpdatedEventDataDeserializer;
exports.avsClusterFailedEventDataDeserializer = avsClusterFailedEventDataDeserializer;
exports.avsScriptExecutionEventDataDeserializer = avsScriptExecutionEventDataDeserializer;
exports.avsScriptExecutionStartedEventDataDeserializer = avsScriptExecutionStartedEventDataDeserializer;
exports.avsScriptExecutionFinishedEventDataDeserializer = avsScriptExecutionFinishedEventDataDeserializer;
exports.avsScriptExecutionCancelledEventDataDeserializer = avsScriptExecutionCancelledEventDataDeserializer;
exports.avsScriptExecutionFailedEventDataDeserializer = avsScriptExecutionFailedEventDataDeserializer;
exports.acsIncomingCallEventDataDeserializer = acsIncomingCallEventDataDeserializer;
exports.communicationIdentifierModelDeserializer = communicationIdentifierModelDeserializer;
exports.communicationUserIdentifierModelDeserializer = communicationUserIdentifierModelDeserializer;
exports.phoneNumberIdentifierModelDeserializer = phoneNumberIdentifierModelDeserializer;
exports.microsoftTeamsUserIdentifierModelDeserializer = microsoftTeamsUserIdentifierModelDeserializer;
exports.microsoftTeamsAppIdentifierModelDeserializer = microsoftTeamsAppIdentifierModelDeserializer;
exports.acsIncomingCallCustomContextDeserializer = acsIncomingCallCustomContextDeserializer;
exports.acsUserDisconnectedEventDataDeserializer = acsUserDisconnectedEventDataDeserializer;
exports.acsChatEventBaseDeserializer = acsChatEventBaseDeserializer;
exports.acsChatEventInThreadBaseDeserializer = acsChatEventInThreadBaseDeserializer;
exports.acsChatMessageEventBaseDeserializer = acsChatMessageEventBaseDeserializer;
exports.acsChatMessageReceivedEventDataDeserializer = acsChatMessageReceivedEventDataDeserializer;
exports.acsChatMessageEventInThreadBaseDeserializer = acsChatMessageEventInThreadBaseDeserializer;
exports.acsChatMessageReceivedInThreadEventDataDeserializer = acsChatMessageReceivedInThreadEventDataDeserializer;
exports.acsChatMessageEditedEventDataDeserializer = acsChatMessageEditedEventDataDeserializer;
exports.acsChatMessageEditedInThreadEventDataDeserializer = acsChatMessageEditedInThreadEventDataDeserializer;
exports.acsChatMessageDeletedEventDataDeserializer = acsChatMessageDeletedEventDataDeserializer;
exports.acsChatMessageDeletedInThreadEventDataDeserializer = acsChatMessageDeletedInThreadEventDataDeserializer;
exports.acsChatThreadEventBaseDeserializer = acsChatThreadEventBaseDeserializer;
exports.acsChatThreadCreatedWithUserEventDataDeserializer = acsChatThreadCreatedWithUserEventDataDeserializer;
exports.acsChatThreadParticipantArrayDeserializer = acsChatThreadParticipantArrayDeserializer;
exports.acsChatThreadParticipantDeserializer = acsChatThreadParticipantDeserializer;
exports.acsChatThreadEventInThreadBaseDeserializer = acsChatThreadEventInThreadBaseDeserializer;
exports.acsChatThreadCreatedEventDataDeserializer = acsChatThreadCreatedEventDataDeserializer;
exports.acsChatThreadWithUserDeletedEventDataDeserializer = acsChatThreadWithUserDeletedEventDataDeserializer;
exports.acsChatThreadDeletedEventDataDeserializer = acsChatThreadDeletedEventDataDeserializer;
exports.acsChatThreadPropertiesUpdatedPerUserEventDataDeserializer = acsChatThreadPropertiesUpdatedPerUserEventDataDeserializer;
exports.acsChatThreadPropertiesUpdatedEventDataDeserializer = acsChatThreadPropertiesUpdatedEventDataDeserializer;
exports.acsChatParticipantAddedToThreadWithUserEventDataDeserializer = acsChatParticipantAddedToThreadWithUserEventDataDeserializer;
exports.acsChatParticipantRemovedFromThreadWithUserEventDataDeserializer = acsChatParticipantRemovedFromThreadWithUserEventDataDeserializer;
exports.acsChatParticipantAddedToThreadEventDataDeserializer = acsChatParticipantAddedToThreadEventDataDeserializer;
exports.acsChatParticipantRemovedFromThreadEventDataDeserializer = acsChatParticipantRemovedFromThreadEventDataDeserializer;
exports.acsSmsEventBaseDeserializer = acsSmsEventBaseDeserializer;
exports.acsSmsDeliveryReportReceivedEventDataDeserializer = acsSmsDeliveryReportReceivedEventDataDeserializer;
exports.acsSmsDeliveryAttemptArrayDeserializer = acsSmsDeliveryAttemptArrayDeserializer;
exports.acsSmsDeliveryAttemptDeserializer = acsSmsDeliveryAttemptDeserializer;
exports.acsSmsReceivedEventDataDeserializer = acsSmsReceivedEventDataDeserializer;
exports.acsRecordingFileStatusUpdatedEventDataDeserializer = acsRecordingFileStatusUpdatedEventDataDeserializer;
exports.acsRecordingStorageInfoDeserializer = acsRecordingStorageInfoDeserializer;
exports.acsRecordingChunkInfoArrayDeserializer = acsRecordingChunkInfoArrayDeserializer;
exports.acsRecordingChunkInfoDeserializer = acsRecordingChunkInfoDeserializer;
exports.acsEmailDeliveryReportReceivedEventDataDeserializer = acsEmailDeliveryReportReceivedEventDataDeserializer;
exports.acsEmailDeliveryReportStatusDetailsDeserializer = acsEmailDeliveryReportStatusDetailsDeserializer;
exports.acsEmailEngagementTrackingReportReceivedEventDataDeserializer = acsEmailEngagementTrackingReportReceivedEventDataDeserializer;
exports.acsRouterEventDataDeserializer = acsRouterEventDataDeserializer;
exports.acsRouterJobEventDataDeserializer = acsRouterJobEventDataDeserializer;
exports.acsRouterJobCancelledEventDataDeserializer = acsRouterJobCancelledEventDataDeserializer;
exports.acsRouterJobClassificationFailedEventDataDeserializer = acsRouterJobClassificationFailedEventDataDeserializer;
exports.acsRouterCommunicationErrorArrayDeserializer = acsRouterCommunicationErrorArrayDeserializer;
exports.acsRouterCommunicationErrorDeserializer = acsRouterCommunicationErrorDeserializer;
exports.acsRouterJobClassifiedEventDataDeserializer = acsRouterJobClassifiedEventDataDeserializer;
exports.acsRouterQueueDetailsDeserializer = acsRouterQueueDetailsDeserializer;
exports.acsRouterWorkerSelectorArrayDeserializer = acsRouterWorkerSelectorArrayDeserializer;
exports.acsRouterWorkerSelectorDeserializer = acsRouterWorkerSelectorDeserializer;
exports.acsRouterJobClosedEventDataDeserializer = acsRouterJobClosedEventDataDeserializer;
exports.acsRouterJobCompletedEventDataDeserializer = acsRouterJobCompletedEventDataDeserializer;
exports.acsRouterJobDeletedEventDataDeserializer = acsRouterJobDeletedEventDataDeserializer;
exports.acsRouterJobExceptionTriggeredEventDataDeserializer = acsRouterJobExceptionTriggeredEventDataDeserializer;
exports.acsRouterJobQueuedEventDataDeserializer = acsRouterJobQueuedEventDataDeserializer;
exports.acsRouterJobReceivedEventDataDeserializer = acsRouterJobReceivedEventDataDeserializer;
exports.acsRouterJobSchedulingFailedEventDataDeserializer = acsRouterJobSchedulingFailedEventDataDeserializer;
exports.acsRouterJobUnassignedEventDataDeserializer = acsRouterJobUnassignedEventDataDeserializer;
exports.acsRouterJobWaitingForActivationEventDataDeserializer = acsRouterJobWaitingForActivationEventDataDeserializer;
exports.acsRouterJobWorkerSelectorsExpiredEventDataDeserializer = acsRouterJobWorkerSelectorsExpiredEventDataDeserializer;
exports.acsRouterWorkerEventDataDeserializer = acsRouterWorkerEventDataDeserializer;
exports.acsRouterWorkerDeletedEventDataDeserializer = acsRouterWorkerDeletedEventDataDeserializer;
exports.acsRouterWorkerDeregisteredEventDataDeserializer = acsRouterWorkerDeregisteredEventDataDeserializer;
exports.acsRouterWorkerOfferAcceptedEventDataDeserializer = acsRouterWorkerOfferAcceptedEventDataDeserializer;
exports.acsRouterWorkerOfferDeclinedEventDataDeserializer = acsRouterWorkerOfferDeclinedEventDataDeserializer;
exports.acsRouterWorkerOfferExpiredEventDataDeserializer = acsRouterWorkerOfferExpiredEventDataDeserializer;
exports.acsRouterWorkerOfferIssuedEventDataDeserializer = acsRouterWorkerOfferIssuedEventDataDeserializer;
exports.acsRouterWorkerOfferRevokedEventDataDeserializer = acsRouterWorkerOfferRevokedEventDataDeserializer;
exports.acsRouterWorkerRegisteredEventDataDeserializer = acsRouterWorkerRegisteredEventDataDeserializer;
exports.acsRouterQueueDetailsArrayDeserializer = acsRouterQueueDetailsArrayDeserializer;
exports.acsRouterChannelConfigurationArrayDeserializer = acsRouterChannelConfigurationArrayDeserializer;
exports.acsRouterChannelConfigurationDeserializer = acsRouterChannelConfigurationDeserializer;
exports.acsRouterWorkerUpdatedEventDataDeserializer = acsRouterWorkerUpdatedEventDataDeserializer;
exports.acsMessageEventDataDeserializer = acsMessageEventDataDeserializer;
exports.acsMessageChannelEventErrorDeserializer = acsMessageChannelEventErrorDeserializer;
exports.acsMessageDeliveryStatusUpdatedEventDataDeserializer = acsMessageDeliveryStatusUpdatedEventDataDeserializer;
exports.acsMessageReceivedEventDataDeserializer = acsMessageReceivedEventDataDeserializer;
exports.acsMessageMediaContentDeserializer = acsMessageMediaContentDeserializer;
exports.acsMessageReactionContentDeserializer = acsMessageReactionContentDeserializer;
exports.acsMessageContextDeserializer = acsMessageContextDeserializer;
exports.acsMessageButtonContentDeserializer = acsMessageButtonContentDeserializer;
exports.acsMessageInteractiveContentDeserializer = acsMessageInteractiveContentDeserializer;
exports.acsMessageInteractiveButtonReplyContentDeserializer = acsMessageInteractiveButtonReplyContentDeserializer;
exports.acsMessageInteractiveListReplyContentDeserializer = acsMessageInteractiveListReplyContentDeserializer;
exports.containerRegistryEventDataDeserializer = containerRegistryEventDataDeserializer;
exports.containerRegistryEventTargetDeserializer = containerRegistryEventTargetDeserializer;
exports.containerRegistryEventRequestDeserializer = containerRegistryEventRequestDeserializer;
exports.containerRegistryEventActorDeserializer = containerRegistryEventActorDeserializer;
exports.containerRegistryEventSourceDeserializer = containerRegistryEventSourceDeserializer;
exports.containerRegistryEventConnectedRegistryDeserializer = containerRegistryEventConnectedRegistryDeserializer;
exports.containerRegistryImagePushedEventDataDeserializer = containerRegistryImagePushedEventDataDeserializer;
exports.containerRegistryImageDeletedEventDataDeserializer = containerRegistryImageDeletedEventDataDeserializer;
exports.containerRegistryArtifactEventDataDeserializer = containerRegistryArtifactEventDataDeserializer;
exports.containerRegistryArtifactEventTargetDeserializer = containerRegistryArtifactEventTargetDeserializer;
exports.containerRegistryChartPushedEventDataDeserializer = containerRegistryChartPushedEventDataDeserializer;
exports.containerRegistryChartDeletedEventDataDeserializer = containerRegistryChartDeletedEventDataDeserializer;
exports.containerServiceNewKubernetesVersionAvailableEventDataDeserializer = containerServiceNewKubernetesVersionAvailableEventDataDeserializer;
exports.containerServiceClusterSupportEventDataDeserializer = containerServiceClusterSupportEventDataDeserializer;
exports.containerServiceClusterSupportEndedEventDataDeserializer = containerServiceClusterSupportEndedEventDataDeserializer;
exports.containerServiceClusterSupportEndingEventDataDeserializer = containerServiceClusterSupportEndingEventDataDeserializer;
exports.containerServiceNodePoolRollingEventDataDeserializer = containerServiceNodePoolRollingEventDataDeserializer;
exports.containerServiceNodePoolRollingStartedEventDataDeserializer = containerServiceNodePoolRollingStartedEventDataDeserializer;
exports.containerServiceNodePoolRollingSucceededEventDataDeserializer = containerServiceNodePoolRollingSucceededEventDataDeserializer;
exports.containerServiceNodePoolRollingFailedEventDataDeserializer = containerServiceNodePoolRollingFailedEventDataDeserializer;
exports.dataBoxCopyStartedEventDataDeserializer = dataBoxCopyStartedEventDataDeserializer;
exports.dataBoxCopyCompletedEventDataDeserializer = dataBoxCopyCompletedEventDataDeserializer;
exports.dataBoxOrderCompletedEventDataDeserializer = dataBoxOrderCompletedEventDataDeserializer;
exports.eventHubCaptureFileCreatedEventDataDeserializer = eventHubCaptureFileCreatedEventDataDeserializer;
exports.mapsGeofenceEventDeserializer = mapsGeofenceEventDeserializer;
exports.mapsGeofenceGeometryArrayDeserializer = mapsGeofenceGeometryArrayDeserializer;
exports.mapsGeofenceGeometryDeserializer = mapsGeofenceGeometryDeserializer;
exports.mapsGeofenceEnteredEventDataDeserializer = mapsGeofenceEnteredEventDataDeserializer;
exports.mapsGeofenceExitedEventDataDeserializer = mapsGeofenceExitedEventDataDeserializer;
exports.mapsGeofenceResultEventDataDeserializer = mapsGeofenceResultEventDataDeserializer;
exports.deviceLifeCycleEventDeserializer = deviceLifeCycleEventDeserializer;
exports.deviceTwinInfoDeserializer = deviceTwinInfoDeserializer;
exports.deviceTwinInfoPropertiesDeserializer = deviceTwinInfoPropertiesDeserializer;
exports.deviceTwinDeserializer = deviceTwinDeserializer;
exports.deviceTwinMetadataDeserializer = deviceTwinMetadataDeserializer;
exports.deviceTwinInfoX509ThumbprintDeserializer = deviceTwinInfoX509ThumbprintDeserializer;
exports.deviceConnectionStateEventDeserializer = deviceConnectionStateEventDeserializer;
exports.deviceConnectionStateEventInfoDeserializer = deviceConnectionStateEventInfoDeserializer;
exports.deviceTelemetryEventDeserializer = deviceTelemetryEventDeserializer;
exports.iotHubDeviceCreatedEventDataDeserializer = iotHubDeviceCreatedEventDataDeserializer;
exports.iotHubDeviceDeletedEventDataDeserializer = iotHubDeviceDeletedEventDataDeserializer;
exports.iotHubDeviceConnectedEventDataDeserializer = iotHubDeviceConnectedEventDataDeserializer;
exports.iotHubDeviceDisconnectedEventDataDeserializer = iotHubDeviceDisconnectedEventDataDeserializer;
exports.iotHubDeviceTelemetryEventDataDeserializer = iotHubDeviceTelemetryEventDataDeserializer;
exports.healthcareFhirResourceCreatedEventDataDeserializer = healthcareFhirResourceCreatedEventDataDeserializer;
exports.healthcareFhirResourceUpdatedEventDataDeserializer = healthcareFhirResourceUpdatedEventDataDeserializer;
exports.healthcareFhirResourceDeletedEventDataDeserializer = healthcareFhirResourceDeletedEventDataDeserializer;
exports.healthcareDicomImageCreatedEventDataDeserializer = healthcareDicomImageCreatedEventDataDeserializer;
exports.healthcareDicomImageDeletedEventDataDeserializer = healthcareDicomImageDeletedEventDataDeserializer;
exports.healthcareDicomImageUpdatedEventDataDeserializer = healthcareDicomImageUpdatedEventDataDeserializer;
exports.keyVaultCertificateNewVersionCreatedEventDataDeserializer = keyVaultCertificateNewVersionCreatedEventDataDeserializer;
exports.keyVaultCertificateNearExpiryEventDataDeserializer = keyVaultCertificateNearExpiryEventDataDeserializer;
exports.keyVaultCertificateExpiredEventDataDeserializer = keyVaultCertificateExpiredEventDataDeserializer;
exports.keyVaultKeyNewVersionCreatedEventDataDeserializer = keyVaultKeyNewVersionCreatedEventDataDeserializer;
exports.keyVaultKeyNearExpiryEventDataDeserializer = keyVaultKeyNearExpiryEventDataDeserializer;
exports.keyVaultKeyExpiredEventDataDeserializer = keyVaultKeyExpiredEventDataDeserializer;
exports.keyVaultSecretNewVersionCreatedEventDataDeserializer = keyVaultSecretNewVersionCreatedEventDataDeserializer;
exports.keyVaultSecretNearExpiryEventDataDeserializer = keyVaultSecretNearExpiryEventDataDeserializer;
exports.keyVaultSecretExpiredEventDataDeserializer = keyVaultSecretExpiredEventDataDeserializer;
exports.keyVaultAccessPolicyChangedEventDataDeserializer = keyVaultAccessPolicyChangedEventDataDeserializer;
exports.machineLearningServicesModelRegisteredEventDataDeserializer = machineLearningServicesModelRegisteredEventDataDeserializer;
exports.machineLearningServicesModelDeployedEventDataDeserializer = machineLearningServicesModelDeployedEventDataDeserializer;
exports.machineLearningServicesRunCompletedEventDataDeserializer = machineLearningServicesRunCompletedEventDataDeserializer;
exports.machineLearningServicesDatasetDriftDetectedEventDataDeserializer = machineLearningServicesDatasetDriftDetectedEventDataDeserializer;
exports.machineLearningServicesRunStatusChangedEventDataDeserializer = machineLearningServicesRunStatusChangedEventDataDeserializer;
exports.policyInsightsPolicyStateCreatedEventDataDeserializer = policyInsightsPolicyStateCreatedEventDataDeserializer;
exports.policyInsightsPolicyStateChangedEventDataDeserializer = policyInsightsPolicyStateChangedEventDataDeserializer;
exports.policyInsightsPolicyStateDeletedEventDataDeserializer = policyInsightsPolicyStateDeletedEventDataDeserializer;
exports.redisPatchingCompletedEventDataDeserializer = redisPatchingCompletedEventDataDeserializer;
exports.redisScalingCompletedEventDataDeserializer = redisScalingCompletedEventDataDeserializer;
exports.redisExportRDBCompletedEventDataDeserializer = redisExportRDBCompletedEventDataDeserializer;
exports.redisImportRDBCompletedEventDataDeserializer = redisImportRDBCompletedEventDataDeserializer;
exports.resourceWriteSuccessEventDataDeserializer = resourceWriteSuccessEventDataDeserializer;
exports.resourceAuthorizationDeserializer = resourceAuthorizationDeserializer;
exports.resourceHttpRequestDeserializer = resourceHttpRequestDeserializer;
exports.resourceWriteFailureEventDataDeserializer = resourceWriteFailureEventDataDeserializer;
exports.resourceWriteCancelEventDataDeserializer = resourceWriteCancelEventDataDeserializer;
exports.resourceDeleteSuccessEventDataDeserializer = resourceDeleteSuccessEventDataDeserializer;
exports.resourceDeleteFailureEventDataDeserializer = resourceDeleteFailureEventDataDeserializer;
exports.resourceDeleteCancelEventDataDeserializer = resourceDeleteCancelEventDataDeserializer;
exports.resourceActionSuccessEventDataDeserializer = resourceActionSuccessEventDataDeserializer;
exports.resourceActionFailureEventDataDeserializer = resourceActionFailureEventDataDeserializer;
exports.resourceActionCancelEventDataDeserializer = resourceActionCancelEventDataDeserializer;
exports.serviceBusActiveMessagesAvailableWithNoListenersEventDataDeserializer = serviceBusActiveMessagesAvailableWithNoListenersEventDataDeserializer;
exports.serviceBusDeadletterMessagesAvailableWithNoListenersEventDataDeserializer = serviceBusDeadletterMessagesAvailableWithNoListenersEventDataDeserializer;
exports.serviceBusActiveMessagesAvailablePeriodicNotificationsEventDataDeserializer = serviceBusActiveMessagesAvailablePeriodicNotificationsEventDataDeserializer;
exports.serviceBusDeadletterMessagesAvailablePeriodicNotificationsEventDataDeserializer = serviceBusDeadletterMessagesAvailablePeriodicNotificationsEventDataDeserializer;
exports.signalRServiceClientConnectionConnectedEventDataDeserializer = signalRServiceClientConnectionConnectedEventDataDeserializer;
exports.signalRServiceClientConnectionDisconnectedEventDataDeserializer = signalRServiceClientConnectionDisconnectedEventDataDeserializer;
exports.storageBlobCreatedEventDataDeserializer = storageBlobCreatedEventDataDeserializer;
exports.storageBlobDeletedEventDataDeserializer = storageBlobDeletedEventDataDeserializer;
exports.storageDirectoryCreatedEventDataDeserializer = storageDirectoryCreatedEventDataDeserializer;
exports.storageDirectoryDeletedEventDataDeserializer = storageDirectoryDeletedEventDataDeserializer;
exports.storageBlobRenamedEventDataDeserializer = storageBlobRenamedEventDataDeserializer;
exports.storageDirectoryRenamedEventDataDeserializer = storageDirectoryRenamedEventDataDeserializer;
exports.storageLifecyclePolicyCompletedEventDataDeserializer = storageLifecyclePolicyCompletedEventDataDeserializer;
exports.storageLifecyclePolicyRunSummaryDeserializer = storageLifecyclePolicyRunSummaryDeserializer;
exports.storageLifecyclePolicyActionSummaryDetailDeserializer = storageLifecyclePolicyActionSummaryDetailDeserializer;
exports.storageBlobTierChangedEventDataDeserializer = storageBlobTierChangedEventDataDeserializer;
exports.storageAsyncOperationInitiatedEventDataDeserializer = storageAsyncOperationInitiatedEventDataDeserializer;
exports.storageBlobInventoryPolicyCompletedEventDataDeserializer = storageBlobInventoryPolicyCompletedEventDataDeserializer;
exports.storageTaskCompletedEventDataDeserializer = storageTaskCompletedEventDataDeserializer;
exports.storageTaskQueuedEventDataDeserializer = storageTaskQueuedEventDataDeserializer;
exports.storageTaskAssignmentQueuedEventDataDeserializer = storageTaskAssignmentQueuedEventDataDeserializer;
exports.storageTaskAssignmentCompletedEventDataDeserializer = storageTaskAssignmentCompletedEventDataDeserializer;
exports.appEventTypeDetailDeserializer = appEventTypeDetailDeserializer;
exports.webAppUpdatedEventDataDeserializer = webAppUpdatedEventDataDeserializer;
exports.webBackupOperationStartedEventDataDeserializer = webBackupOperationStartedEventDataDeserializer;
exports.webBackupOperationCompletedEventDataDeserializer = webBackupOperationCompletedEventDataDeserializer;
exports.webBackupOperationFailedEventDataDeserializer = webBackupOperationFailedEventDataDeserializer;
exports.webRestoreOperationStartedEventDataDeserializer = webRestoreOperationStartedEventDataDeserializer;
exports.webRestoreOperationCompletedEventDataDeserializer = webRestoreOperationCompletedEventDataDeserializer;
exports.webRestoreOperationFailedEventDataDeserializer = webRestoreOperationFailedEventDataDeserializer;
exports.webSlotSwapStartedEventDataDeserializer = webSlotSwapStartedEventDataDeserializer;
exports.webSlotSwapCompletedEventDataDeserializer = webSlotSwapCompletedEventDataDeserializer;
exports.webSlotSwapFailedEventDataDeserializer = webSlotSwapFailedEventDataDeserializer;
exports.webSlotSwapWithPreviewStartedEventDataDeserializer = webSlotSwapWithPreviewStartedEventDataDeserializer;
exports.webSlotSwapWithPreviewCancelledEventDataDeserializer = webSlotSwapWithPreviewCancelledEventDataDeserializer;
exports.webAppServicePlanUpdatedEventDataDeserializer = webAppServicePlanUpdatedEventDataDeserializer;
exports.appServicePlanEventTypeDetailDeserializer = appServicePlanEventTypeDetailDeserializer;
exports.webAppServicePlanUpdatedEventDataSkuDeserializer = webAppServicePlanUpdatedEventDataSkuDeserializer;
exports.subscriptionValidationEventDataDeserializer = subscriptionValidationEventDataDeserializer;
exports.subscriptionValidationResponseDeserializer = subscriptionValidationResponseDeserializer;
exports.subscriptionDeletedEventDataDeserializer = subscriptionDeletedEventDataDeserializer;
exports.eventGridMqttClientEventDataDeserializer = eventGridMqttClientEventDataDeserializer;
exports.eventGridMqttClientCreatedOrUpdatedEventDataDeserializer = eventGridMqttClientCreatedOrUpdatedEventDataDeserializer;
exports.eventGridMqttClientDeletedEventDataDeserializer = eventGridMqttClientDeletedEventDataDeserializer;
exports.eventGridMqttClientSessionConnectedEventDataDeserializer = eventGridMqttClientSessionConnectedEventDataDeserializer;
exports.eventGridMqttClientSessionDisconnectedEventDataDeserializer = eventGridMqttClientSessionDisconnectedEventDataDeserializer;
exports.resourceNotificationsResourceUpdatedEventDataDeserializer = resourceNotificationsResourceUpdatedEventDataDeserializer;
exports.resourceNotificationsResourceUpdatedDetailsDeserializer = resourceNotificationsResourceUpdatedDetailsDeserializer;
exports.resourceNotificationsOperationalDetailsDeserializer = resourceNotificationsOperationalDetailsDeserializer;
exports.resourceNotificationsHealthResourcesAvailabilityStatusChangedEventDataDeserializer = resourceNotificationsHealthResourcesAvailabilityStatusChangedEventDataDeserializer;
exports.resourceNotificationsHealthResourcesAnnotatedEventDataDeserializer = resourceNotificationsHealthResourcesAnnotatedEventDataDeserializer;
exports.resourceNotificationsResourceDeletedDetailsDeserializer = resourceNotificationsResourceDeletedDetailsDeserializer;
exports.resourceNotificationsResourceDeletedEventDataDeserializer = resourceNotificationsResourceDeletedEventDataDeserializer;
exports.resourceNotificationsResourceManagementCreatedOrUpdatedEventDataDeserializer = resourceNotificationsResourceManagementCreatedOrUpdatedEventDataDeserializer;
exports.resourceNotificationsResourceManagementDeletedEventDataDeserializer = resourceNotificationsResourceManagementDeletedEventDataDeserializer;
exports.resourceNotificationsContainerServiceEventResourcesScheduledEventDataDeserializer = resourceNotificationsContainerServiceEventResourcesScheduledEventDataDeserializer;
function apiCenterApiDefinitionAddedEventDataDeserializer(item) {
    return {
        title: item["title"],
        description: item["description"],
        specification: !item["specification"]
            ? item["specification"]
            : apiCenterApiSpecificationDeserializer(item["specification"]),
    };
}
function apiCenterApiSpecificationDeserializer(item) {
    return {
        name: item["name"],
        version: item["version"],
    };
}
function apiCenterApiDefinitionUpdatedEventDataDeserializer(item) {
    return {
        title: item["title"],
        description: item["description"],
        specification: !item["specification"]
            ? item["specification"]
            : apiCenterApiSpecificationDeserializer(item["specification"]),
    };
}
function apiManagementUserCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementUserUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementUserDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementSubscriptionCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementSubscriptionUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementSubscriptionDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementProductCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementProductUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementProductDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiReleaseCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiReleaseUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementApiReleaseDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayHostnameConfigurationCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayHostnameConfigurationUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayHostnameConfigurationDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayCertificateAuthorityCreatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayCertificateAuthorityUpdatedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayCertificateAuthorityDeletedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayApiAddedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function apiManagementGatewayApiRemovedEventDataDeserializer(item) {
    return {
        resourceUri: item["resourceUri"],
    };
}
function appConfigurationKeyValueModifiedEventDataDeserializer(item) {
    return {
        key: item["key"],
        label: item["label"],
        etag: item["etag"],
        syncToken: item["syncToken"],
    };
}
function appConfigurationKeyValueDeletedEventDataDeserializer(item) {
    return {
        key: item["key"],
        label: item["label"],
        etag: item["etag"],
        syncToken: item["syncToken"],
    };
}
function appConfigurationSnapshotEventDataDeserializer(item) {
    return {
        name: item["name"],
        etag: item["etag"],
        syncToken: item["syncToken"],
    };
}
function appConfigurationSnapshotCreatedEventDataDeserializer(item) {
    return {
        name: item["name"],
        etag: item["etag"],
        syncToken: item["syncToken"],
    };
}
function appConfigurationSnapshotModifiedEventDataDeserializer(item) {
    return {
        name: item["name"],
        etag: item["etag"],
        syncToken: item["syncToken"],
    };
}
function avsPrivateCloudEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
    };
}
function avsPrivateCloudUpdatingEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
    };
}
function avsPrivateCloudUpdatedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
    };
}
function avsPrivateCloudFailedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        failureMessage: item["failureMessage"],
    };
}
function avsClusterEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
    };
}
function avsClusterCreatedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
    };
}
function avsClusterDeletedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
    };
}
function avsClusterUpdatingEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
    };
}
function avsClusterUpdatedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
    };
}
function avsClusterFailedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        addedHostNames: !item["addedHostNames"]
            ? item["addedHostNames"]
            : item["addedHostNames"].map((p) => {
                return p;
            }),
        removedHostNames: !item["removedHostNames"]
            ? item["removedHostNames"]
            : item["removedHostNames"].map((p) => {
                return p;
            }),
        inMaintenanceHostNames: !item["inMaintenanceHostNames"]
            ? item["inMaintenanceHostNames"]
            : item["inMaintenanceHostNames"].map((p) => {
                return p;
            }),
        failureMessage: item["failureMessage"],
    };
}
function avsScriptExecutionEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        cmdletId: item["cmdletId"],
        output: !item["output"]
            ? item["output"]
            : item["output"].map((p) => {
                return p;
            }),
    };
}
function avsScriptExecutionStartedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        cmdletId: item["cmdletId"],
        output: !item["output"]
            ? item["output"]
            : item["output"].map((p) => {
                return p;
            }),
    };
}
function avsScriptExecutionFinishedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        cmdletId: item["cmdletId"],
        output: !item["output"]
            ? item["output"]
            : item["output"].map((p) => {
                return p;
            }),
        namedOutputs: item["namedOutputs"],
    };
}
function avsScriptExecutionCancelledEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        cmdletId: item["cmdletId"],
        output: !item["output"]
            ? item["output"]
            : item["output"].map((p) => {
                return p;
            }),
    };
}
function avsScriptExecutionFailedEventDataDeserializer(item) {
    return {
        operationId: item["operationId"],
        cmdletId: item["cmdletId"],
        output: !item["output"]
            ? item["output"]
            : item["output"].map((p) => {
                return p;
            }),
        failureMessage: item["failureMessage"],
    };
}
function acsIncomingCallEventDataDeserializer(item) {
    return {
        toCommunicationIdentifier: communicationIdentifierModelDeserializer(item["to"]),
        fromCommunicationIdentifier: communicationIdentifierModelDeserializer(item["from"]),
        serverCallId: item["serverCallId"],
        callerDisplayName: item["callerDisplayName"],
        customContext: acsIncomingCallCustomContextDeserializer(item["customContext"]),
        incomingCallContext: item["incomingCallContext"],
        onBehalfOfCallee: !item["onBehalfOfCallee"]
            ? item["onBehalfOfCallee"]
            : communicationIdentifierModelDeserializer(item["onBehalfOfCallee"]),
        correlationId: item["correlationId"],
    };
}
function communicationIdentifierModelDeserializer(item) {
    return {
        kind: item["kind"],
        rawId: item["rawId"],
        communicationUser: communicationUserIdentifierModelDeserializer(item["communicationUser"]),
        phoneNumber: phoneNumberIdentifierModelDeserializer(item["phoneNumber"]),
        microsoftTeamsUser: microsoftTeamsUserIdentifierModelDeserializer(item["microsoftTeamsUser"]),
        microsoftTeamsApp: microsoftTeamsAppIdentifierModelDeserializer(item["microsoftTeamsApp"]),
    };
}
/** Communication model identifier kind */
var KnownCommunicationIdentifierModelKind;
(function (KnownCommunicationIdentifierModelKind) {
    /** Unknown */
    KnownCommunicationIdentifierModelKind["unknown"] = "unknown";
    /** Communication User */
    KnownCommunicationIdentifierModelKind["communicationUser"] = "communicationUser";
    /** Phone Number */
    KnownCommunicationIdentifierModelKind["phoneNumber"] = "phoneNumber";
    /** Microsoft Teams User */
    KnownCommunicationIdentifierModelKind["microsoftTeamsUser"] = "microsoftTeamsUser";
})(KnownCommunicationIdentifierModelKind || (exports.KnownCommunicationIdentifierModelKind = KnownCommunicationIdentifierModelKind = {}));
function communicationUserIdentifierModelDeserializer(item) {
    return {
        id: item["id"],
    };
}
function phoneNumberIdentifierModelDeserializer(item) {
    return {
        value: item["value"],
    };
}
function microsoftTeamsUserIdentifierModelDeserializer(item) {
    return {
        userId: item["userId"],
        isAnonymous: item["isAnonymous"],
        cloud: item["cloud"],
    };
}
/** Communication cloud environment model. */
var KnownCommunicationCloudEnvironmentModel;
(function (KnownCommunicationCloudEnvironmentModel) {
    /** Public */
    KnownCommunicationCloudEnvironmentModel["public"] = "public";
    /** Dod */
    KnownCommunicationCloudEnvironmentModel["dod"] = "dod";
    /** Gcch */
    KnownCommunicationCloudEnvironmentModel["gcch"] = "gcch";
})(KnownCommunicationCloudEnvironmentModel || (exports.KnownCommunicationCloudEnvironmentModel = KnownCommunicationCloudEnvironmentModel = {}));
function microsoftTeamsAppIdentifierModelDeserializer(item) {
    return {
        appId: item["appId"],
        cloud: item["cloud"],
    };
}
function acsIncomingCallCustomContextDeserializer(item) {
    return {
        sipHeaders: item["sipHeaders"],
        voipHeaders: item["voipHeaders"],
    };
}
function acsUserDisconnectedEventDataDeserializer(item) {
    return {
        userCommunicationIdentifier: communicationIdentifierModelDeserializer(item["userCommunicationIdentifier"]),
    };
}
function acsChatEventBaseDeserializer(item) {
    return {
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
    };
}
function acsChatEventInThreadBaseDeserializer(item) {
    return {
        transactionId: item["transactionId"],
        threadId: item["threadId"],
    };
}
function acsChatMessageEventBaseDeserializer(item) {
    return {
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
    };
}
function acsChatMessageReceivedEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageBody: item["messageBody"],
        metadata: item["metadata"],
    };
}
function acsChatMessageEventInThreadBaseDeserializer(item) {
    return {
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
    };
}
function acsChatMessageReceivedInThreadEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageBody: item["messageBody"],
        metadata: item["metadata"],
    };
}
function acsChatMessageEditedEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageBody: item["messageBody"],
        metadata: item["metadata"],
        editTime: new Date(item["editTime"]),
    };
}
function acsChatMessageEditedInThreadEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        messageBody: item["messageBody"],
        metadata: item["metadata"],
        editTime: new Date(item["editTime"]),
    };
}
function acsChatMessageDeletedEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        deleteTime: new Date(item["deleteTime"]),
    };
}
function acsChatMessageDeletedInThreadEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        senderCommunicationIdentifier: communicationIdentifierModelDeserializer(item["senderCommunicationIdentifier"]),
        senderDisplayName: item["senderDisplayName"],
        composeTime: new Date(item["composeTime"]),
        type: item["type"],
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        deleteTime: new Date(item["deleteTime"]),
    };
}
function acsChatThreadEventBaseDeserializer(item) {
    return {
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        createTime: new Date(item["createTime"]),
        version: item["version"],
    };
}
function acsChatThreadCreatedWithUserEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        createdByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["createdByCommunicationIdentifier"]),
        properties: item["properties"],
        metadata: item["metadata"],
        participants: acsChatThreadParticipantArrayDeserializer(item["participants"]),
    };
}
function acsChatThreadParticipantArrayDeserializer(result) {
    return result.map((item) => {
        return acsChatThreadParticipantDeserializer(item);
    });
}
function acsChatThreadParticipantDeserializer(item) {
    return {
        displayName: item["displayName"],
        participantCommunicationIdentifier: communicationIdentifierModelDeserializer(item["participantCommunicationIdentifier"]),
        metadata: item["metadata"],
    };
}
function acsChatThreadEventInThreadBaseDeserializer(item) {
    return {
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        createTime: new Date(item["createTime"]),
        version: item["version"],
    };
}
function acsChatThreadCreatedEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        createdByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["createdByCommunicationIdentifier"]),
        properties: item["properties"],
        metadata: item["metadata"],
        participants: acsChatThreadParticipantArrayDeserializer(item["participants"]),
    };
}
function acsChatThreadWithUserDeletedEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        deletedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["deletedByCommunicationIdentifier"]),
        deleteTime: new Date(item["deleteTime"]),
    };
}
function acsChatThreadDeletedEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        deletedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["deletedByCommunicationIdentifier"]),
        deleteTime: new Date(item["deleteTime"]),
    };
}
function acsChatThreadPropertiesUpdatedPerUserEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        editedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["editedByCommunicationIdentifier"]),
        editTime: new Date(item["editTime"]),
        metadata: item["metadata"],
        properties: item["properties"],
    };
}
function acsChatThreadPropertiesUpdatedEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        editedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["editedByCommunicationIdentifier"]),
        editTime: new Date(item["editTime"]),
        properties: item["properties"],
        metadata: item["metadata"],
    };
}
function acsChatParticipantAddedToThreadWithUserEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        time: new Date(item["time"]),
        addedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["addedByCommunicationIdentifier"]),
        participantAdded: acsChatThreadParticipantDeserializer(item["participantAdded"]),
    };
}
function acsChatParticipantRemovedFromThreadWithUserEventDataDeserializer(item) {
    return {
        createTime: new Date(item["createTime"]),
        version: item["version"],
        recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(item["recipientCommunicationIdentifier"]),
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        time: new Date(item["time"]),
        removedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["removedByCommunicationIdentifier"]),
        participantRemoved: acsChatThreadParticipantDeserializer(item["participantRemoved"]),
    };
}
function acsChatParticipantAddedToThreadEventDataDeserializer(item) {
    return {
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        time: new Date(item["time"]),
        addedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["addedByCommunicationIdentifier"]),
        participantAdded: acsChatThreadParticipantDeserializer(item["participantAdded"]),
        version: item["version"],
    };
}
function acsChatParticipantRemovedFromThreadEventDataDeserializer(item) {
    return {
        transactionId: item["transactionId"],
        threadId: item["threadId"],
        time: new Date(item["time"]),
        removedByCommunicationIdentifier: communicationIdentifierModelDeserializer(item["removedByCommunicationIdentifier"]),
        participantRemoved: acsChatThreadParticipantDeserializer(item["participantRemoved"]),
        version: item["version"],
    };
}
function acsSmsEventBaseDeserializer(item) {
    return {
        messageId: item["messageId"],
        from: item["from"],
        to: item["to"],
    };
}
function acsSmsDeliveryReportReceivedEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        from: item["from"],
        to: item["to"],
        deliveryStatus: item["deliveryStatus"],
        deliveryStatusDetails: item["deliveryStatusDetails"],
        deliveryAttempts: acsSmsDeliveryAttemptArrayDeserializer(item["deliveryAttempts"]),
        receivedTimestamp: new Date(item["receivedTimestamp"]),
        tag: item["tag"],
    };
}
function acsSmsDeliveryAttemptArrayDeserializer(result) {
    return result.map((item) => {
        return acsSmsDeliveryAttemptDeserializer(item);
    });
}
function acsSmsDeliveryAttemptDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        segmentsSucceeded: item["segmentsSucceeded"],
        segmentsFailed: item["segmentsFailed"],
    };
}
function acsSmsReceivedEventDataDeserializer(item) {
    return {
        messageId: item["messageId"],
        from: item["from"],
        to: item["to"],
        message: item["message"],
        receivedTimestamp: new Date(item["receivedTimestamp"]),
        segmentCount: item["segmentCount"],
    };
}
function acsRecordingFileStatusUpdatedEventDataDeserializer(item) {
    return {
        recordingStorageInfo: acsRecordingStorageInfoDeserializer(item["recordingStorageInfo"]),
        recordingStartTime: new Date(item["recordingStartTime"]),
        recordingDurationMs: item["recordingDurationMs"],
        recordingContentType: item["recordingContentType"],
        recordingChannelType: item["recordingChannelType"],
        recordingFormatType: item["recordingFormatType"],
        sessionEndReason: item["sessionEndReason"],
    };
}
function acsRecordingStorageInfoDeserializer(item) {
    return {
        recordingChunks: acsRecordingChunkInfoArrayDeserializer(item["recordingChunks"]),
    };
}
function acsRecordingChunkInfoArrayDeserializer(result) {
    return result.map((item) => {
        return acsRecordingChunkInfoDeserializer(item);
    });
}
function acsRecordingChunkInfoDeserializer(item) {
    return {
        documentId: item["documentId"],
        index: item["index"],
        endReason: item["endReason"],
        metadataLocation: item["metadataLocation"],
        contentLocation: item["contentLocation"],
        deleteLocation: item["deleteLocation"],
    };
}
/** Recording content type */
var KnownRecordingContentType;
(function (KnownRecordingContentType) {
    /** AudioVideo content type */
    KnownRecordingContentType["AudioVideo"] = "AudioVideo";
    /** Audio content type */
    KnownRecordingContentType["Audio"] = "Audio";
})(KnownRecordingContentType || (exports.KnownRecordingContentType = KnownRecordingContentType = {}));
/** Recording channel type */
var KnownRecordingChannelType;
(function (KnownRecordingChannelType) {
    /** Mixed channel type */
    KnownRecordingChannelType["Mixed"] = "Mixed";
    /** Unmixed channel type */
    KnownRecordingChannelType["Unmixed"] = "Unmixed";
})(KnownRecordingChannelType || (exports.KnownRecordingChannelType = KnownRecordingChannelType = {}));
/** Recording format type */
var KnownRecordingFormatType;
(function (KnownRecordingFormatType) {
    /** WAV format */
    KnownRecordingFormatType["Wav"] = "Wav";
    /** MP3 format */
    KnownRecordingFormatType["Mp3"] = "Mp3";
    /** MP4 format */
    KnownRecordingFormatType["Mp4"] = "Mp4";
})(KnownRecordingFormatType || (exports.KnownRecordingFormatType = KnownRecordingFormatType = {}));
function acsEmailDeliveryReportReceivedEventDataDeserializer(item) {
    return {
        sender: item["sender"],
        recipient: item["recipient"],
        internetMessageId: item["internetMessageId"],
        messageId: item["messageId"],
        status: item["status"],
        deliveryStatusDetails: acsEmailDeliveryReportStatusDetailsDeserializer(item["deliveryStatusDetails"]),
        deliveryAttemptTimestamp: new Date(item["deliveryAttemptTimestamp"]),
    };
}
/** The status of the email. Any value other than Delivered is considered failed. */
var KnownAcsEmailDeliveryReportStatus;
(function (KnownAcsEmailDeliveryReportStatus) {
    /** Hard bounce detected while sending the email */
    KnownAcsEmailDeliveryReportStatus["Bounced"] = "Bounced";
    /** The email was delivered */
    KnownAcsEmailDeliveryReportStatus["Delivered"] = "Delivered";
    /** The email failed to be delivered */
    KnownAcsEmailDeliveryReportStatus["Failed"] = "Failed";
    /** The message was identified as spam and was rejected or blocked (not quarantined). */
    KnownAcsEmailDeliveryReportStatus["FilteredSpam"] = "FilteredSpam";
    /** The message was quarantined (as spam, bulk mail, or phishing). For more information, see Quarantined email messages in EOP (EXCHANGE ONLINE PROTECTION). */
    KnownAcsEmailDeliveryReportStatus["Quarantined"] = "Quarantined";
    /** The email was suppressed */
    KnownAcsEmailDeliveryReportStatus["Suppressed"] = "Suppressed";
})(KnownAcsEmailDeliveryReportStatus || (exports.KnownAcsEmailDeliveryReportStatus = KnownAcsEmailDeliveryReportStatus = {}));
function acsEmailDeliveryReportStatusDetailsDeserializer(item) {
    return {
        statusMessage: item["statusMessage"],
        recipientMailServerHostName: item["recipientMailServerHostName"],
    };
}
function acsEmailEngagementTrackingReportReceivedEventDataDeserializer(item) {
    return {
        sender: item["sender"],
        recipient: item["recipient"],
        messageId: item["messageId"],
        userActionTimestamp: new Date(item["userActionTimestamp"]),
        engagementContext: item["engagementContext"],
        userAgent: item["userAgent"],
        engagement: item["engagementType"],
    };
}
/** The type of engagement user have with email. */
var KnownAcsUserEngagement;
(function (KnownAcsUserEngagement) {
    /** View */
    KnownAcsUserEngagement["view"] = "view";
    /** Click */
    KnownAcsUserEngagement["click"] = "click";
})(KnownAcsUserEngagement || (exports.KnownAcsUserEngagement = KnownAcsUserEngagement = {}));
function acsRouterEventDataDeserializer(item) {
    return {
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
    };
}
function acsRouterJobEventDataDeserializer(item) {
    return {
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
    };
}
function acsRouterJobCancelledEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        note: item["note"],
        dispositionCode: item["dispositionCode"],
    };
}
function acsRouterJobClassificationFailedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        classificationPolicyId: item["classificationPolicyId"],
        errors: acsRouterCommunicationErrorArrayDeserializer(item["errors"]),
    };
}
function acsRouterCommunicationErrorArrayDeserializer(result) {
    return result.map((item) => {
        return acsRouterCommunicationErrorDeserializer(item);
    });
}
function acsRouterCommunicationErrorDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        target: item["target"],
        innererror: acsRouterCommunicationErrorDeserializer(item["innererror"]),
        details: acsRouterCommunicationErrorArrayDeserializer(item["details"]),
    };
}
function acsRouterJobClassifiedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueDetails: acsRouterQueueDetailsDeserializer(item["queueDetails"]),
        classificationPolicyId: item["classificationPolicyId"],
        priority: item["priority"],
        attachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["attachedWorkerSelectors"]),
    };
}
function acsRouterQueueDetailsDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        labels: item["labels"],
    };
}
function acsRouterWorkerSelectorArrayDeserializer(result) {
    return result.map((item) => {
        return acsRouterWorkerSelectorDeserializer(item);
    });
}
function acsRouterWorkerSelectorDeserializer(item) {
    return {
        key: item["key"],
        labelOperator: item["labelOperator"],
        labelValue: item["value"],
        ttlSeconds: item["ttlSeconds"],
        state: item["state"],
        expirationTime: new Date(item["expirationTime"]),
    };
}
/** Router Job Worker Selector Label Operator */
var KnownAcsRouterLabelOperator;
(function (KnownAcsRouterLabelOperator) {
    /** Router Label Operator Equal */
    KnownAcsRouterLabelOperator["Equal"] = "Equal";
    /** Router Label Operator Not Equal */
    KnownAcsRouterLabelOperator["NotEqual"] = "NotEqual";
    /** Router Label Operator Greater */
    KnownAcsRouterLabelOperator["Greater"] = "Greater";
    /** Router Label Operator Less */
    KnownAcsRouterLabelOperator["Less"] = "Less";
    /** Router Label Operator Greater than or equal */
    KnownAcsRouterLabelOperator["GreaterThanOrEqual"] = "GreaterThanOrEqual";
    /** Router Label Operator Less than or equal */
    KnownAcsRouterLabelOperator["LessThanOrEqual"] = "LessThanOrEqual";
})(KnownAcsRouterLabelOperator || (exports.KnownAcsRouterLabelOperator = KnownAcsRouterLabelOperator = {}));
/** Router Worker Selector State */
var KnownAcsRouterWorkerSelectorState;
(function (KnownAcsRouterWorkerSelectorState) {
    /** Router Worker Selector State Active */
    KnownAcsRouterWorkerSelectorState["Active"] = "active";
    /** Router Worker Selector State Expired */
    KnownAcsRouterWorkerSelectorState["Expired"] = "expired";
})(KnownAcsRouterWorkerSelectorState || (exports.KnownAcsRouterWorkerSelectorState = KnownAcsRouterWorkerSelectorState = {}));
function acsRouterJobClosedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        assignmentId: item["assignmentId"],
        workerId: item["workerId"],
        dispositionCode: item["dispositionCode"],
    };
}
function acsRouterJobCompletedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        assignmentId: item["assignmentId"],
        workerId: item["workerId"],
    };
}
function acsRouterJobDeletedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
    };
}
function acsRouterJobExceptionTriggeredEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        ruleKey: item["ruleKey"],
        exceptionRuleId: item["exceptionRuleId"],
    };
}
function acsRouterJobQueuedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        priority: item["priority"],
        attachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["attachedWorkerSelectors"]),
        requestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["requestedWorkerSelectors"]),
    };
}
function acsRouterJobReceivedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        jobStatus: item["jobStatus"],
        classificationPolicyId: item["classificationPolicyId"],
        priority: item["priority"],
        requestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["requestedWorkerSelectors"]),
        scheduledOn: new Date(item["scheduledOn"]),
        unavailableForMatching: item["unavailableForMatching"],
    };
}
/** Acs Router Job Status */
var KnownAcsRouterJobStatus;
(function (KnownAcsRouterJobStatus) {
    /** Router Job Status Pending Classification */
    KnownAcsRouterJobStatus["PendingClassification"] = "PendingClassification";
    /** Router Job Status Queued */
    KnownAcsRouterJobStatus["Queued"] = "Queued";
    /** Router Job Status Assigned */
    KnownAcsRouterJobStatus["Assigned"] = "Assigned";
    /** Router Job Status Completed */
    KnownAcsRouterJobStatus["Completed"] = "Completed";
    /** Router Job Status Closed */
    KnownAcsRouterJobStatus["Closed"] = "Closed";
    /** Router Job Status Cancelled */
    KnownAcsRouterJobStatus["Cancelled"] = "Cancelled";
    /** Router Job Status Classification Failed */
    KnownAcsRouterJobStatus["ClassificationFailed"] = "ClassificationFailed";
    /** Router Job Status Created */
    KnownAcsRouterJobStatus["Created"] = "Created";
    /** Router Job Status Pending Schedule */
    KnownAcsRouterJobStatus["PendingSchedule"] = "PendingSchedule";
    /** Router Job Status Scheduled */
    KnownAcsRouterJobStatus["Scheduled"] = "Scheduled";
    /** Router Job Status Schedule Failed */
    KnownAcsRouterJobStatus["ScheduleFailed"] = "ScheduleFailed";
    /** Router Job Status Waiting For Activation */
    KnownAcsRouterJobStatus["WaitingForActivation"] = "WaitingForActivation";
})(KnownAcsRouterJobStatus || (exports.KnownAcsRouterJobStatus = KnownAcsRouterJobStatus = {}));
function acsRouterJobSchedulingFailedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        priority: item["priority"],
        expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredAttachedWorkerSelectors"]),
        expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredRequestedWorkerSelectors"]),
        scheduledOn: new Date(item["scheduledOn"]),
        failureReason: item["failureReason"],
    };
}
function acsRouterJobUnassignedEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        assignmentId: item["assignmentId"],
        workerId: item["workerId"],
    };
}
function acsRouterJobWaitingForActivationEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        priority: item["priority"],
        expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredAttachedWorkerSelectors"]),
        expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredRequestedWorkerSelectors"]),
        scheduledOn: new Date(item["scheduledOn"]),
        unavailableForMatching: item["unavailableForMatching"],
    };
}
function acsRouterJobWorkerSelectorsExpiredEventDataDeserializer(item) {
    return {
        queueId: item["queueId"],
        labels: item["labels"],
        tags: item["tags"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredRequestedWorkerSelectors"]),
        expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(item["expiredAttachedWorkerSelectors"]),
    };
}
function acsRouterWorkerEventDataDeserializer(item) {
    return {
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        workerId: item["workerId"],
    };
}
function acsRouterWorkerDeletedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
    };
}
function acsRouterWorkerDeregisteredEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
    };
}
function acsRouterWorkerOfferAcceptedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        offerId: item["offerId"],
        assignmentId: item["assignmentId"],
        jobPriority: item["jobPriority"],
        workerLabels: item["workerLabels"],
        workerTags: item["workerTags"],
        jobLabels: item["jobLabels"],
        jobTags: item["jobTags"],
    };
}
function acsRouterWorkerOfferDeclinedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        offerId: item["offerId"],
    };
}
function acsRouterWorkerOfferExpiredEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        offerId: item["offerId"],
    };
}
function acsRouterWorkerOfferIssuedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        offerId: item["offerId"],
        jobPriority: item["jobPriority"],
        workerLabels: item["workerLabels"],
        offeredOn: new Date(item["offeredOn"]),
        expiresOn: new Date(item["expiresOn"]),
        workerTags: item["workerTags"],
        jobLabels: item["jobLabels"],
        jobTags: item["jobTags"],
    };
}
function acsRouterWorkerOfferRevokedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        jobId: item["jobId"],
        channelReference: item["channelReference"],
        channelId: item["channelId"],
        queueId: item["queueId"],
        offerId: item["offerId"],
    };
}
function acsRouterWorkerRegisteredEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        queueAssignments: acsRouterQueueDetailsArrayDeserializer(item["queueAssignments"]),
        channelConfigurations: acsRouterChannelConfigurationArrayDeserializer(item["channelConfigurations"]),
        totalCapacity: item["totalCapacity"],
        labels: item["labels"],
        tags: item["tags"],
    };
}
function acsRouterQueueDetailsArrayDeserializer(result) {
    return result.map((item) => {
        return acsRouterQueueDetailsDeserializer(item);
    });
}
function acsRouterChannelConfigurationArrayDeserializer(result) {
    return result.map((item) => {
        return acsRouterChannelConfigurationDeserializer(item);
    });
}
function acsRouterChannelConfigurationDeserializer(item) {
    return {
        channelId: item["channelId"],
        capacityCostPerJob: item["capacityCostPerJob"],
        maxNumberOfJobs: item["maxNumberOfJobs"],
    };
}
function acsRouterWorkerUpdatedEventDataDeserializer(item) {
    return {
        workerId: item["workerId"],
        queueAssignments: acsRouterQueueDetailsArrayDeserializer(item["queueAssignments"]),
        channelConfigurations: acsRouterChannelConfigurationArrayDeserializer(item["channelConfigurations"]),
        totalCapacity: item["totalCapacity"],
        labels: item["labels"],
        tags: item["tags"],
        updatedWorkerProperties: item["updatedWorkerProperties"].map((p) => {
            return p;
        }),
    };
}
/** Worker properties that can be updated */
var KnownAcsRouterUpdatedWorkerProperty;
(function (KnownAcsRouterUpdatedWorkerProperty) {
    /** AvailableForOffers */
    KnownAcsRouterUpdatedWorkerProperty["AvailableForOffers"] = "AvailableForOffers";
    /** TotalCapacity */
    KnownAcsRouterUpdatedWorkerProperty["TotalCapacity"] = "TotalCapacity";
    /** QueueAssignments */
    KnownAcsRouterUpdatedWorkerProperty["QueueAssignments"] = "QueueAssignments";
    /** Labels */
    KnownAcsRouterUpdatedWorkerProperty["Labels"] = "Labels";
    /** Tags */
    KnownAcsRouterUpdatedWorkerProperty["Tags"] = "Tags";
    /** ChannelConfigurations */
    KnownAcsRouterUpdatedWorkerProperty["ChannelConfigurations"] = "ChannelConfigurations";
})(KnownAcsRouterUpdatedWorkerProperty || (exports.KnownAcsRouterUpdatedWorkerProperty = KnownAcsRouterUpdatedWorkerProperty = {}));
function acsMessageEventDataDeserializer(item) {
    return {
        from: item["from"],
        to: item["to"],
        receivedTimeStamp: new Date(item["receivedTimeStamp"]),
        error: !item["error"]
            ? item["error"]
            : acsMessageChannelEventErrorDeserializer(item["error"]),
    };
}
function acsMessageChannelEventErrorDeserializer(item) {
    return {
        channelCode: item["channelCode"],
        channelMessage: item["channelMessage"],
    };
}
function acsMessageDeliveryStatusUpdatedEventDataDeserializer(item) {
    return {
        from: item["from"],
        to: item["to"],
        receivedTimeStamp: new Date(item["receivedTimeStamp"]),
        error: !item["error"]
            ? item["error"]
            : acsMessageChannelEventErrorDeserializer(item["error"]),
        messageId: item["messageId"],
        status: item["status"],
        channelKind: item["channelType"],
    };
}
/** Message delivery status */
var KnownAcsMessageDeliveryStatus;
(function (KnownAcsMessageDeliveryStatus) {
    /** Read */
    KnownAcsMessageDeliveryStatus["read"] = "read";
    /** Delivered */
    KnownAcsMessageDeliveryStatus["delivered"] = "delivered";
    /** Failed */
    KnownAcsMessageDeliveryStatus["failed"] = "failed";
    /** Sent */
    KnownAcsMessageDeliveryStatus["sent"] = "sent";
    /** Warning */
    KnownAcsMessageDeliveryStatus["warning"] = "warning";
    /** Unknown */
    KnownAcsMessageDeliveryStatus["unknown"] = "unknown";
})(KnownAcsMessageDeliveryStatus || (exports.KnownAcsMessageDeliveryStatus = KnownAcsMessageDeliveryStatus = {}));
/** Message channel kind */
var KnownAcsMessageChannelKind;
(function (KnownAcsMessageChannelKind) {
    /** Updated message channel type is WhatsApp */
    KnownAcsMessageChannelKind["whatsapp"] = "whatsapp";
})(KnownAcsMessageChannelKind || (exports.KnownAcsMessageChannelKind = KnownAcsMessageChannelKind = {}));
function acsMessageReceivedEventDataDeserializer(item) {
    return {
        from: item["from"],
        to: item["to"],
        receivedTimeStamp: new Date(item["receivedTimeStamp"]),
        error: !item["error"]
            ? item["error"]
            : acsMessageChannelEventErrorDeserializer(item["error"]),
        content: item["content"],
        messageId: item["messageId"],
        channelKind: item["channelType"],
        messageType: item["messageType"],
        mediaContent: !item["media"]
            ? item["media"]
            : acsMessageMediaContentDeserializer(item["media"]),
        reaction: !item["reaction"]
            ? item["reaction"]
            : acsMessageReactionContentDeserializer(item["reaction"]),
        context: !item["context"]
            ? item["context"]
            : acsMessageContextDeserializer(item["context"]),
        button: !item["button"]
            ? item["button"]
            : acsMessageButtonContentDeserializer(item["button"]),
        interactiveContent: !item["interactive"]
            ? item["interactive"]
            : acsMessageInteractiveContentDeserializer(item["interactive"]),
    };
}
function acsMessageMediaContentDeserializer(item) {
    return {
        mimeType: item["mimeType"],
        mediaId: item["id"],
        fileName: item["fileName"],
        caption: item["caption"],
        animated: item["animated"],
    };
}
function acsMessageReactionContentDeserializer(item) {
    return {
        messageId: item["messageId"],
        emoji: item["emoji"],
    };
}
function acsMessageContextDeserializer(item) {
    return {
        from: item["from"],
        messageId: item["id"],
    };
}
function acsMessageButtonContentDeserializer(item) {
    return {
        text: item["text"],
        payload: item["payload"],
    };
}
function acsMessageInteractiveContentDeserializer(item) {
    return {
        replyKind: item["type"],
        buttonReply: !item["buttonReply"]
            ? item["buttonReply"]
            : acsMessageInteractiveButtonReplyContentDeserializer(item["buttonReply"]),
        listReply: !item["listReply"]
            ? item["listReply"]
            : acsMessageInteractiveListReplyContentDeserializer(item["listReply"]),
    };
}
/** Interactive reply kind */
var KnownAcsInteractiveReplyKind;
(function (KnownAcsInteractiveReplyKind) {
    /** Messaged interactive reply type is ButtonReply */
    KnownAcsInteractiveReplyKind["buttonReply"] = "buttonReply";
    /** Messaged interactive reply type is ListReply */
    KnownAcsInteractiveReplyKind["listReply"] = "listReply";
    /** Messaged interactive reply type is Unknown */
    KnownAcsInteractiveReplyKind["unknown"] = "unknown";
})(KnownAcsInteractiveReplyKind || (exports.KnownAcsInteractiveReplyKind = KnownAcsInteractiveReplyKind = {}));
function acsMessageInteractiveButtonReplyContentDeserializer(item) {
    return {
        buttonId: item["id"],
        title: item["title"],
    };
}
function acsMessageInteractiveListReplyContentDeserializer(item) {
    return {
        listItemId: item["id"],
        title: item["title"],
        description: item["description"],
    };
}
function containerRegistryEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryEventTargetDeserializer(item["target"]),
        request: !item["request"]
            ? item["request"]
            : containerRegistryEventRequestDeserializer(item["request"]),
        actor: !item["actor"]
            ? item["actor"]
            : containerRegistryEventActorDeserializer(item["actor"]),
        source: !item["source"]
            ? item["source"]
            : containerRegistryEventSourceDeserializer(item["source"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerRegistryEventTargetDeserializer(item) {
    return {
        mediaType: item["mediaType"],
        size: item["size"],
        digest: item["digest"],
        length: item["length"],
        repository: item["repository"],
        url: item["url"],
        tag: item["tag"],
    };
}
function containerRegistryEventRequestDeserializer(item) {
    return {
        id: item["id"],
        addr: item["addr"],
        host: item["host"],
        method: item["method"],
        useragent: item["useragent"],
    };
}
function containerRegistryEventActorDeserializer(item) {
    return {
        name: item["name"],
    };
}
function containerRegistryEventSourceDeserializer(item) {
    return {
        addr: item["addr"],
        instanceID: item["instanceID"],
    };
}
function containerRegistryEventConnectedRegistryDeserializer(item) {
    return {
        name: item["name"],
    };
}
function containerRegistryImagePushedEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryEventTargetDeserializer(item["target"]),
        request: !item["request"]
            ? item["request"]
            : containerRegistryEventRequestDeserializer(item["request"]),
        actor: !item["actor"]
            ? item["actor"]
            : containerRegistryEventActorDeserializer(item["actor"]),
        source: !item["source"]
            ? item["source"]
            : containerRegistryEventSourceDeserializer(item["source"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerRegistryImageDeletedEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryEventTargetDeserializer(item["target"]),
        request: !item["request"]
            ? item["request"]
            : containerRegistryEventRequestDeserializer(item["request"]),
        actor: !item["actor"]
            ? item["actor"]
            : containerRegistryEventActorDeserializer(item["actor"]),
        source: !item["source"]
            ? item["source"]
            : containerRegistryEventSourceDeserializer(item["source"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerRegistryArtifactEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerRegistryArtifactEventTargetDeserializer(item) {
    return {
        mediaType: item["mediaType"],
        size: item["size"],
        digest: item["digest"],
        repository: item["repository"],
        tag: item["tag"],
        name: item["name"],
        version: item["version"],
    };
}
function containerRegistryChartPushedEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerRegistryChartDeletedEventDataDeserializer(item) {
    return {
        id: item["id"],
        timestamp: new Date(item["timestamp"]),
        action: item["action"],
        location: item["location"],
        target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
        connectedRegistry: !item["connectedRegistry"]
            ? item["connectedRegistry"]
            : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
    };
}
function containerServiceNewKubernetesVersionAvailableEventDataDeserializer(item) {
    return {
        latestSupportedKubernetesVersion: item["latestSupportedKubernetesVersion"],
        latestStableKubernetesVersion: item["latestStableKubernetesVersion"],
        lowestMinorKubernetesVersion: item["lowestMinorKubernetesVersion"],
        latestPreviewKubernetesVersion: item["latestPreviewKubernetesVersion"],
    };
}
function containerServiceClusterSupportEventDataDeserializer(item) {
    return {
        kubernetesVersion: item["kubernetesVersion"],
    };
}
function containerServiceClusterSupportEndedEventDataDeserializer(item) {
    return {
        kubernetesVersion: item["kubernetesVersion"],
    };
}
function containerServiceClusterSupportEndingEventDataDeserializer(item) {
    return {
        kubernetesVersion: item["kubernetesVersion"],
    };
}
function containerServiceNodePoolRollingEventDataDeserializer(item) {
    return {
        nodePoolName: item["nodePoolName"],
    };
}
function containerServiceNodePoolRollingStartedEventDataDeserializer(item) {
    return {
        nodePoolName: item["nodePoolName"],
    };
}
function containerServiceNodePoolRollingSucceededEventDataDeserializer(item) {
    return {
        nodePoolName: item["nodePoolName"],
    };
}
function containerServiceNodePoolRollingFailedEventDataDeserializer(item) {
    return {
        nodePoolName: item["nodePoolName"],
    };
}
function dataBoxCopyStartedEventDataDeserializer(item) {
    return {
        serialNumber: item["serialNumber"],
        stageName: item["stageName"],
        stageTime: new Date(item["stageTime"]),
    };
}
/** Schema of DataBox Stage Name enumeration. */
var KnownDataBoxStageName;
(function (KnownDataBoxStageName) {
    /** Copy has started */
    KnownDataBoxStageName["CopyStarted"] = "CopyStarted";
    /** Copy has completed */
    KnownDataBoxStageName["CopyCompleted"] = "CopyCompleted";
    /** Order has been completed */
    KnownDataBoxStageName["OrderCompleted"] = "OrderCompleted";
})(KnownDataBoxStageName || (exports.KnownDataBoxStageName = KnownDataBoxStageName = {}));
function dataBoxCopyCompletedEventDataDeserializer(item) {
    return {
        serialNumber: item["serialNumber"],
        stageName: item["stageName"],
        stageTime: new Date(item["stageTime"]),
    };
}
function dataBoxOrderCompletedEventDataDeserializer(item) {
    return {
        serialNumber: item["serialNumber"],
        stageName: item["stageName"],
        stageTime: new Date(item["stageTime"]),
    };
}
function eventHubCaptureFileCreatedEventDataDeserializer(item) {
    return {
        fileUrl: item["fileUrl"],
        fileType: item["fileType"],
        partitionId: item["partitionId"],
        sizeInBytes: item["sizeInBytes"],
        eventCount: item["eventCount"],
        firstSequenceNumber: item["firstSequenceNumber"],
        lastSequenceNumber: item["lastSequenceNumber"],
        firstEnqueueTime: new Date(item["firstEnqueueTime"]),
        lastEnqueueTime: new Date(item["lastEnqueueTime"]),
    };
}
function mapsGeofenceEventDeserializer(item) {
    return {
        expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p) => {
            return p;
        }),
        geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
        invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p) => {
            return p;
        }),
        isEventPublished: item["isEventPublished"],
    };
}
function mapsGeofenceGeometryArrayDeserializer(result) {
    return result.map((item) => {
        return mapsGeofenceGeometryDeserializer(item);
    });
}
function mapsGeofenceGeometryDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        distance: item["distance"],
        geometryId: item["geometryId"],
        nearestLat: item["nearestLat"],
        nearestLon: item["nearestLon"],
        udId: item["udId"],
    };
}
function mapsGeofenceEnteredEventDataDeserializer(item) {
    return {
        expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p) => {
            return p;
        }),
        geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
        invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p) => {
            return p;
        }),
        isEventPublished: item["isEventPublished"],
    };
}
function mapsGeofenceExitedEventDataDeserializer(item) {
    return {
        expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p) => {
            return p;
        }),
        geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
        invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p) => {
            return p;
        }),
        isEventPublished: item["isEventPublished"],
    };
}
function mapsGeofenceResultEventDataDeserializer(item) {
    return {
        expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p) => {
            return p;
        }),
        geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
        invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p) => {
            return p;
        }),
        isEventPublished: item["isEventPublished"],
    };
}
function deviceLifeCycleEventDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        hubName: item["hubName"],
        twin: deviceTwinInfoDeserializer(item["twin"]),
    };
}
function deviceTwinInfoDeserializer(item) {
    return {
        authenticationType: item["authenticationType"],
        cloudToDeviceMessageCount: item["cloudToDeviceMessageCount"],
        connectionState: item["connectionState"],
        deviceId: item["deviceId"],
        etag: item["etag"],
        lastActivityTime: item["lastActivityTime"],
        properties: deviceTwinInfoPropertiesDeserializer(item["properties"]),
        status: item["status"],
        statusUpdateTime: item["statusUpdateTime"],
        version: item["version"],
        x509Thumbprint: deviceTwinInfoX509ThumbprintDeserializer(item["x509Thumbprint"]),
    };
}
function deviceTwinInfoPropertiesDeserializer(item) {
    return {
        desired: deviceTwinDeserializer(item["desired"]),
        reported: deviceTwinDeserializer(item["reported"]),
    };
}
function deviceTwinDeserializer(item) {
    return {
        metadata: deviceTwinMetadataDeserializer(item["metadata"]),
        version: item["version"],
    };
}
function deviceTwinMetadataDeserializer(item) {
    return {
        lastUpdated: item["lastUpdated"],
    };
}
function deviceTwinInfoX509ThumbprintDeserializer(item) {
    return {
        primaryThumbprint: item["primaryThumbprint"],
        secondaryThumbprint: item["secondaryThumbprint"],
    };
}
function deviceConnectionStateEventDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        moduleId: item["moduleId"],
        hubName: item["hubName"],
        deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(item["deviceConnectionStateEventInfo"]),
    };
}
function deviceConnectionStateEventInfoDeserializer(item) {
    return {
        sequenceNumber: item["sequenceNumber"],
    };
}
function deviceTelemetryEventDeserializer(item) {
    return {
        body: item["body"],
        properties: item["properties"],
        systemProperties: item["systemProperties"],
    };
}
function iotHubDeviceCreatedEventDataDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        hubName: item["hubName"],
        twin: deviceTwinInfoDeserializer(item["twin"]),
    };
}
function iotHubDeviceDeletedEventDataDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        hubName: item["hubName"],
        twin: deviceTwinInfoDeserializer(item["twin"]),
    };
}
function iotHubDeviceConnectedEventDataDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        moduleId: item["moduleId"],
        hubName: item["hubName"],
        deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(item["deviceConnectionStateEventInfo"]),
    };
}
function iotHubDeviceDisconnectedEventDataDeserializer(item) {
    return {
        deviceId: item["deviceId"],
        moduleId: item["moduleId"],
        hubName: item["hubName"],
        deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(item["deviceConnectionStateEventInfo"]),
    };
}
function iotHubDeviceTelemetryEventDataDeserializer(item) {
    return {
        body: item["body"],
        properties: item["properties"],
        systemProperties: item["systemProperties"],
    };
}
function healthcareFhirResourceCreatedEventDataDeserializer(item) {
    return {
        resourceType: item["resourceType"],
        resourceFhirAccount: item["resourceFhirAccount"],
        resourceFhirId: item["resourceFhirId"],
        resourceVersionId: item["resourceVersionId"],
    };
}
/** Schema of FHIR resource type enumeration. */
var KnownHealthcareFhirResourceType;
(function (KnownHealthcareFhirResourceType) {
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Account"] = "Account";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ActivityDefinition"] = "ActivityDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["AdverseEvent"] = "AdverseEvent";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["AllergyIntolerance"] = "AllergyIntolerance";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Appointment"] = "Appointment";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["AppointmentResponse"] = "AppointmentResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["AuditEvent"] = "AuditEvent";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Basic"] = "Basic";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Binary"] = "Binary";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["BiologicallyDerivedProduct"] = "BiologicallyDerivedProduct";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["BodySite"] = "BodySite";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["BodyStructure"] = "BodyStructure";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Bundle"] = "Bundle";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CapabilityStatement"] = "CapabilityStatement";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CarePlan"] = "CarePlan";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CareTeam"] = "CareTeam";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["CatalogEntry"] = "CatalogEntry";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ChargeItem"] = "ChargeItem";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ChargeItemDefinition"] = "ChargeItemDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Claim"] = "Claim";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ClaimResponse"] = "ClaimResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ClinicalImpression"] = "ClinicalImpression";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CodeSystem"] = "CodeSystem";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Communication"] = "Communication";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CommunicationRequest"] = "CommunicationRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["CompartmentDefinition"] = "CompartmentDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Composition"] = "Composition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ConceptMap"] = "ConceptMap";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Condition"] = "Condition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Consent"] = "Consent";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Contract"] = "Contract";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Coverage"] = "Coverage";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["CoverageEligibilityRequest"] = "CoverageEligibilityRequest";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["CoverageEligibilityResponse"] = "CoverageEligibilityResponse";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["DataElement"] = "DataElement";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DetectedIssue"] = "DetectedIssue";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Device"] = "Device";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["DeviceComponent"] = "DeviceComponent";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["DeviceDefinition"] = "DeviceDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DeviceMetric"] = "DeviceMetric";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DeviceRequest"] = "DeviceRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DeviceUseStatement"] = "DeviceUseStatement";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DiagnosticReport"] = "DiagnosticReport";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DocumentManifest"] = "DocumentManifest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DocumentReference"] = "DocumentReference";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["DomainResource"] = "DomainResource";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["EffectEvidenceSynthesis"] = "EffectEvidenceSynthesis";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["EligibilityRequest"] = "EligibilityRequest";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["EligibilityResponse"] = "EligibilityResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Encounter"] = "Encounter";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Endpoint"] = "Endpoint";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["EnrollmentRequest"] = "EnrollmentRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["EnrollmentResponse"] = "EnrollmentResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["EpisodeOfCare"] = "EpisodeOfCare";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["EventDefinition"] = "EventDefinition";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["Evidence"] = "Evidence";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["EvidenceVariable"] = "EvidenceVariable";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ExampleScenario"] = "ExampleScenario";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ExpansionProfile"] = "ExpansionProfile";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ExplanationOfBenefit"] = "ExplanationOfBenefit";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["FamilyMemberHistory"] = "FamilyMemberHistory";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Flag"] = "Flag";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Goal"] = "Goal";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["GraphDefinition"] = "GraphDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Group"] = "Group";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["GuidanceResponse"] = "GuidanceResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["HealthcareService"] = "HealthcareService";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ImagingManifest"] = "ImagingManifest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ImagingStudy"] = "ImagingStudy";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Immunization"] = "Immunization";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ImmunizationEvaluation"] = "ImmunizationEvaluation";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ImmunizationRecommendation"] = "ImmunizationRecommendation";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ImplementationGuide"] = "ImplementationGuide";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["InsurancePlan"] = "InsurancePlan";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["Invoice"] = "Invoice";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Library"] = "Library";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Linkage"] = "Linkage";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["List"] = "List";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Location"] = "Location";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Measure"] = "Measure";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MeasureReport"] = "MeasureReport";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Media"] = "Media";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Medication"] = "Medication";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MedicationAdministration"] = "MedicationAdministration";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MedicationDispense"] = "MedicationDispense";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicationKnowledge"] = "MedicationKnowledge";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MedicationRequest"] = "MedicationRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MedicationStatement"] = "MedicationStatement";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProduct"] = "MedicinalProduct";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductAuthorization"] = "MedicinalProductAuthorization";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductContraindication"] = "MedicinalProductContraindication";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductIndication"] = "MedicinalProductIndication";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductIngredient"] = "MedicinalProductIngredient";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductInteraction"] = "MedicinalProductInteraction";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductManufactured"] = "MedicinalProductManufactured";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductPackaged"] = "MedicinalProductPackaged";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductPharmaceutical"] = "MedicinalProductPharmaceutical";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MedicinalProductUndesirableEffect"] = "MedicinalProductUndesirableEffect";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MessageDefinition"] = "MessageDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["MessageHeader"] = "MessageHeader";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["MolecularSequence"] = "MolecularSequence";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["NamingSystem"] = "NamingSystem";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["NutritionOrder"] = "NutritionOrder";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Observation"] = "Observation";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ObservationDefinition"] = "ObservationDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["OperationDefinition"] = "OperationDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["OperationOutcome"] = "OperationOutcome";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Organization"] = "Organization";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["OrganizationAffiliation"] = "OrganizationAffiliation";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Parameters"] = "Parameters";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Patient"] = "Patient";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["PaymentNotice"] = "PaymentNotice";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["PaymentReconciliation"] = "PaymentReconciliation";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Person"] = "Person";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["PlanDefinition"] = "PlanDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Practitioner"] = "Practitioner";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["PractitionerRole"] = "PractitionerRole";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Procedure"] = "Procedure";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ProcedureRequest"] = "ProcedureRequest";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ProcessRequest"] = "ProcessRequest";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ProcessResponse"] = "ProcessResponse";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Provenance"] = "Provenance";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Questionnaire"] = "Questionnaire";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["QuestionnaireResponse"] = "QuestionnaireResponse";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ReferralRequest"] = "ReferralRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["RelatedPerson"] = "RelatedPerson";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["RequestGroup"] = "RequestGroup";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ResearchDefinition"] = "ResearchDefinition";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ResearchElementDefinition"] = "ResearchElementDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ResearchStudy"] = "ResearchStudy";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ResearchSubject"] = "ResearchSubject";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Resource"] = "Resource";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["RiskAssessment"] = "RiskAssessment";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["RiskEvidenceSynthesis"] = "RiskEvidenceSynthesis";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Schedule"] = "Schedule";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["SearchParameter"] = "SearchParameter";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["Sequence"] = "Sequence";
    /** The FHIR resource type defined in STU3. */
    KnownHealthcareFhirResourceType["ServiceDefinition"] = "ServiceDefinition";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["ServiceRequest"] = "ServiceRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Slot"] = "Slot";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Specimen"] = "Specimen";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SpecimenDefinition"] = "SpecimenDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["StructureDefinition"] = "StructureDefinition";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["StructureMap"] = "StructureMap";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Subscription"] = "Subscription";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Substance"] = "Substance";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstanceNucleicAcid"] = "SubstanceNucleicAcid";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstancePolymer"] = "SubstancePolymer";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstanceProtein"] = "SubstanceProtein";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstanceReferenceInformation"] = "SubstanceReferenceInformation";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstanceSourceMaterial"] = "SubstanceSourceMaterial";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["SubstanceSpecification"] = "SubstanceSpecification";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["SupplyDelivery"] = "SupplyDelivery";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["SupplyRequest"] = "SupplyRequest";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["Task"] = "Task";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["TerminologyCapabilities"] = "TerminologyCapabilities";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["TestReport"] = "TestReport";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["TestScript"] = "TestScript";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["ValueSet"] = "ValueSet";
    /** The FHIR resource type defined in R4. */
    KnownHealthcareFhirResourceType["VerificationResult"] = "VerificationResult";
    /** The FHIR resource type defined in STU3 and R4. */
    KnownHealthcareFhirResourceType["VisionPrescription"] = "VisionPrescription";
})(KnownHealthcareFhirResourceType || (exports.KnownHealthcareFhirResourceType = KnownHealthcareFhirResourceType = {}));
function healthcareFhirResourceUpdatedEventDataDeserializer(item) {
    return {
        resourceType: item["resourceType"],
        resourceFhirAccount: item["resourceFhirAccount"],
        resourceFhirId: item["resourceFhirId"],
        resourceVersionId: item["resourceVersionId"],
    };
}
function healthcareFhirResourceDeletedEventDataDeserializer(item) {
    return {
        resourceType: item["resourceType"],
        resourceFhirAccount: item["resourceFhirAccount"],
        resourceFhirId: item["resourceFhirId"],
        resourceVersionId: item["resourceVersionId"],
    };
}
function healthcareDicomImageCreatedEventDataDeserializer(item) {
    return {
        partitionName: item["partitionName"],
        imageStudyInstanceUid: item["imageStudyInstanceUid"],
        imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
        imageSopInstanceUid: item["imageSopInstanceUid"],
        serviceHostName: item["serviceHostName"],
        sequenceNumber: item["sequenceNumber"],
    };
}
function healthcareDicomImageDeletedEventDataDeserializer(item) {
    return {
        partitionName: item["partitionName"],
        imageStudyInstanceUid: item["imageStudyInstanceUid"],
        imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
        imageSopInstanceUid: item["imageSopInstanceUid"],
        serviceHostName: item["serviceHostName"],
        sequenceNumber: item["sequenceNumber"],
    };
}
function healthcareDicomImageUpdatedEventDataDeserializer(item) {
    return {
        partitionName: item["partitionName"],
        imageStudyInstanceUid: item["imageStudyInstanceUid"],
        imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
        imageSopInstanceUid: item["imageSopInstanceUid"],
        serviceHostName: item["serviceHostName"],
        sequenceNumber: item["sequenceNumber"],
    };
}
function keyVaultCertificateNewVersionCreatedEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultCertificateNearExpiryEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultCertificateExpiredEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultKeyNewVersionCreatedEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultKeyNearExpiryEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultKeyExpiredEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultSecretNewVersionCreatedEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultSecretNearExpiryEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultSecretExpiredEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function keyVaultAccessPolicyChangedEventDataDeserializer(item) {
    return {
        id: item["Id"],
        vaultName: item["VaultName"],
        objectType: item["ObjectType"],
        objectName: item["ObjectName"],
        version: item["Version"],
        nbf: item["NBF"],
        exp: item["EXP"],
    };
}
function machineLearningServicesModelRegisteredEventDataDeserializer(item) {
    return {
        modelName: item["modelName"],
        modelVersion: item["modelVersion"],
        modelTags: item["modelTags"],
        modelProperties: item["modelProperties"],
    };
}
function machineLearningServicesModelDeployedEventDataDeserializer(item) {
    return {
        serviceName: item["serviceName"],
        serviceComputeType: item["serviceComputeType"],
        modelIds: item["modelIds"],
        serviceTags: item["serviceTags"],
        serviceProperties: item["serviceProperties"],
    };
}
function machineLearningServicesRunCompletedEventDataDeserializer(item) {
    return {
        experimentId: item["experimentId"],
        experimentName: item["experimentName"],
        runId: item["runId"],
        runType: item["runType"],
        runTags: item["runTags"],
        runProperties: item["runProperties"],
    };
}
function machineLearningServicesDatasetDriftDetectedEventDataDeserializer(item) {
    return {
        dataDriftId: item["dataDriftId"],
        dataDriftName: item["dataDriftName"],
        runId: item["runId"],
        baseDatasetId: item["baseDatasetId"],
        targetDatasetId: item["targetDatasetId"],
        driftCoefficient: item["driftCoefficient"],
        startTime: new Date(item["startTime"]),
        endTime: new Date(item["endTime"]),
    };
}
function machineLearningServicesRunStatusChangedEventDataDeserializer(item) {
    return {
        experimentId: item["experimentId"],
        experimentName: item["experimentName"],
        runId: item["runId"],
        runType: item["runType"],
        runTags: item["runTags"],
        runProperties: item["runProperties"],
        runStatus: item["runStatus"],
    };
}
function policyInsightsPolicyStateCreatedEventDataDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        policyAssignmentId: item["policyAssignmentId"],
        policyDefinitionId: item["policyDefinitionId"],
        policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
        complianceState: item["complianceState"],
        subscriptionId: item["subscriptionId"],
        complianceReasonCode: item["complianceReasonCode"],
    };
}
function policyInsightsPolicyStateChangedEventDataDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        policyAssignmentId: item["policyAssignmentId"],
        policyDefinitionId: item["policyDefinitionId"],
        policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
        complianceState: item["complianceState"],
        subscriptionId: item["subscriptionId"],
        complianceReasonCode: item["complianceReasonCode"],
    };
}
function policyInsightsPolicyStateDeletedEventDataDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        policyAssignmentId: item["policyAssignmentId"],
        policyDefinitionId: item["policyDefinitionId"],
        policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
        complianceState: item["complianceState"],
        subscriptionId: item["subscriptionId"],
        complianceReasonCode: item["complianceReasonCode"],
    };
}
function redisPatchingCompletedEventDataDeserializer(item) {
    return {
        timestamp: !item["timestamp"]
            ? item["timestamp"]
            : new Date(item["timestamp"]),
        name: item["name"],
        status: item["status"],
    };
}
function redisScalingCompletedEventDataDeserializer(item) {
    return {
        timestamp: !item["timestamp"]
            ? item["timestamp"]
            : new Date(item["timestamp"]),
        name: item["name"],
        status: item["status"],
    };
}
function redisExportRDBCompletedEventDataDeserializer(item) {
    return {
        timestamp: !item["timestamp"]
            ? item["timestamp"]
            : new Date(item["timestamp"]),
        name: item["name"],
        status: item["status"],
    };
}
function redisImportRDBCompletedEventDataDeserializer(item) {
    return {
        timestamp: !item["timestamp"]
            ? item["timestamp"]
            : new Date(item["timestamp"]),
        name: item["name"],
        status: item["status"],
    };
}
function resourceWriteSuccessEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceAuthorizationDeserializer(item) {
    return {
        scope: item["scope"],
        action: item["action"],
        evidence: item["evidence"],
    };
}
function resourceHttpRequestDeserializer(item) {
    return {
        clientRequestId: item["clientRequestId"],
        clientIpAddress: item["clientIpAddress"],
        method: item["method"],
        url: item["url"],
    };
}
function resourceWriteFailureEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceWriteCancelEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceDeleteSuccessEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceDeleteFailureEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceDeleteCancelEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceActionSuccessEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceActionFailureEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function resourceActionCancelEventDataDeserializer(item) {
    return {
        tenantId: item["tenantId"],
        subscriptionId: item["subscriptionId"],
        resourceGroup: item["resourceGroup"],
        resourceProvider: item["resourceProvider"],
        resourceUri: item["resourceUri"],
        operationName: item["operationName"],
        status: item["status"],
        authorization: resourceAuthorizationDeserializer(item["authorization"]),
        claims: item["claims"],
        correlationId: item["correlationId"],
        httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
    };
}
function serviceBusActiveMessagesAvailableWithNoListenersEventDataDeserializer(item) {
    return {
        namespaceName: item["namespaceName"],
        requestUri: item["requestUri"],
        entityType: item["entityType"],
        queueName: item["queueName"],
        topicName: item["topicName"],
        subscriptionName: item["subscriptionName"],
    };
}
function serviceBusDeadletterMessagesAvailableWithNoListenersEventDataDeserializer(item) {
    return {
        namespaceName: item["namespaceName"],
        requestUri: item["requestUri"],
        entityType: item["entityType"],
        queueName: item["queueName"],
        topicName: item["topicName"],
        subscriptionName: item["subscriptionName"],
    };
}
function serviceBusActiveMessagesAvailablePeriodicNotificationsEventDataDeserializer(item) {
    return {
        namespaceName: item["namespaceName"],
        requestUri: item["requestUri"],
        entityType: item["entityType"],
        queueName: item["queueName"],
        topicName: item["topicName"],
        subscriptionName: item["subscriptionName"],
    };
}
function serviceBusDeadletterMessagesAvailablePeriodicNotificationsEventDataDeserializer(item) {
    return {
        namespaceName: item["namespaceName"],
        requestUri: item["requestUri"],
        entityType: item["entityType"],
        queueName: item["queueName"],
        topicName: item["topicName"],
        subscriptionName: item["subscriptionName"],
    };
}
function signalRServiceClientConnectionConnectedEventDataDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        hubName: item["hubName"],
        connectionId: item["connectionId"],
        userId: item["userId"],
    };
}
function signalRServiceClientConnectionDisconnectedEventDataDeserializer(item) {
    return {
        timestamp: new Date(item["timestamp"]),
        hubName: item["hubName"],
        connectionId: item["connectionId"],
        userId: item["userId"],
        errorMessage: item["errorMessage"],
    };
}
function storageBlobCreatedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        eTag: item["eTag"],
        contentType: item["contentType"],
        contentLength: item["contentLength"],
        contentOffset: item["contentOffset"],
        blobType: item["blobType"],
        accessTier: item["accessTier"],
        url: item["url"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
/** The access tier of the blob. */
var KnownStorageBlobAccessTier;
(function (KnownStorageBlobAccessTier) {
    /** The blob is in access tier Hot */
    KnownStorageBlobAccessTier["Hot"] = "Hot";
    /** The blob is in access tier Cool */
    KnownStorageBlobAccessTier["Cool"] = "Cool";
    /** The blob is in access tier Cold */
    KnownStorageBlobAccessTier["Cold"] = "Cold";
    /** The blob is in access tier Archive */
    KnownStorageBlobAccessTier["Archive"] = "Archive";
    /** The blob is in access tier Default(Inferred) */
    KnownStorageBlobAccessTier["Default"] = "Default";
})(KnownStorageBlobAccessTier || (exports.KnownStorageBlobAccessTier = KnownStorageBlobAccessTier = {}));
function storageBlobDeletedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        contentType: item["contentType"],
        blobType: item["blobType"],
        url: item["url"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageDirectoryCreatedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        eTag: item["eTag"],
        url: item["url"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageDirectoryDeletedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        url: item["url"],
        recursive: item["recursive"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageBlobRenamedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        sourceUrl: item["sourceUrl"],
        destinationUrl: item["destinationUrl"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageDirectoryRenamedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        sourceUrl: item["sourceUrl"],
        destinationUrl: item["destinationUrl"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageLifecyclePolicyCompletedEventDataDeserializer(item) {
    return {
        scheduleTime: item["scheduleTime"],
        policyRunSummary: storageLifecyclePolicyRunSummaryDeserializer(item["policyRunSummary"]),
        deleteSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(item["deleteSummary"]),
        tierToCoolSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(item["tierToCoolSummary"]),
        tierToArchiveSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(item["tierToArchiveSummary"]),
        tierToColdSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(item["tierToColdSummary"]),
    };
}
function storageLifecyclePolicyRunSummaryDeserializer(item) {
    return {
        completionStatus: item["completionStatus"],
    };
}
/** The status for a LCM policy. */
var KnownStorageLifecycleCompletionStatus;
(function (KnownStorageLifecycleCompletionStatus) {
    /** Completed */
    KnownStorageLifecycleCompletionStatus["Completed"] = "Completed";
    /** CompletedWithError */
    KnownStorageLifecycleCompletionStatus["CompletedWithError"] = "CompletedWithError";
    /** Incomplete */
    KnownStorageLifecycleCompletionStatus["Incomplete"] = "Incomplete";
})(KnownStorageLifecycleCompletionStatus || (exports.KnownStorageLifecycleCompletionStatus = KnownStorageLifecycleCompletionStatus = {}));
function storageLifecyclePolicyActionSummaryDetailDeserializer(item) {
    return {
        totalObjectsCount: item["totalObjectsCount"],
        successCount: item["successCount"],
        errorList: item["errorList"],
    };
}
function storageBlobTierChangedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        contentType: item["contentType"],
        contentLength: item["contentLength"],
        blobType: item["blobType"],
        accessTier: item["accessTier"],
        previousTier: item["previousTier"],
        url: item["url"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageAsyncOperationInitiatedEventDataDeserializer(item) {
    return {
        api: item["api"],
        clientRequestId: item["clientRequestId"],
        requestId: item["requestId"],
        contentType: item["contentType"],
        contentLength: item["contentLength"],
        blobType: item["blobType"],
        url: item["url"],
        sequencer: item["sequencer"],
        identity: item["identity"],
        storageDiagnostics: item["storageDiagnostics"],
    };
}
function storageBlobInventoryPolicyCompletedEventDataDeserializer(item) {
    return {
        scheduleDateTime: new Date(item["scheduleDateTime"]),
        accountName: item["accountName"],
        ruleName: item["ruleName"],
        policyRunStatus: item["policyRunStatus"],
        policyRunStatusMessage: item["policyRunStatusMessage"],
        policyRunId: item["policyRunId"],
        manifestBlobUrl: item["manifestBlobUrl"],
    };
}
function storageTaskCompletedEventDataDeserializer(item) {
    return {
        status: item["status"],
        completedDateTime: new Date(item["completedDateTime"]),
        taskExecutionId: item["taskExecutionId"],
        taskName: item["taskName"],
        summaryReportBlobUrl: item["summaryReportBlobUrl"],
    };
}
/** The status for a storage task. */
var KnownStorageTaskCompletedStatus;
(function (KnownStorageTaskCompletedStatus) {
    /** Succeeded */
    KnownStorageTaskCompletedStatus["Succeeded"] = "Succeeded";
    /** Failed */
    KnownStorageTaskCompletedStatus["Failed"] = "Failed";
})(KnownStorageTaskCompletedStatus || (exports.KnownStorageTaskCompletedStatus = KnownStorageTaskCompletedStatus = {}));
function storageTaskQueuedEventDataDeserializer(item) {
    return {
        queuedDateTime: new Date(item["queuedDateTime"]),
        taskExecutionId: item["taskExecutionId"],
    };
}
function storageTaskAssignmentQueuedEventDataDeserializer(item) {
    return {
        queuedOn: new Date(item["queuedDateTime"]),
        taskExecutionId: item["taskExecutionId"],
    };
}
function storageTaskAssignmentCompletedEventDataDeserializer(item) {
    return {
        status: item["status"],
        completedOn: new Date(item["completedDateTime"]),
        taskExecutionId: item["taskExecutionId"],
        taskName: item["taskName"],
        summaryReportBlobUri: item["summaryReportBlobUrl"],
    };
}
/** The status for a storage task. */
var KnownStorageTaskAssignmentCompletedStatus;
(function (KnownStorageTaskAssignmentCompletedStatus) {
    /** Succeeded */
    KnownStorageTaskAssignmentCompletedStatus["Succeeded"] = "Succeeded";
    /** Failed */
    KnownStorageTaskAssignmentCompletedStatus["Failed"] = "Failed";
})(KnownStorageTaskAssignmentCompletedStatus || (exports.KnownStorageTaskAssignmentCompletedStatus = KnownStorageTaskAssignmentCompletedStatus = {}));
function appEventTypeDetailDeserializer(item) {
    return {
        action: item["action"],
    };
}
/** Type of action of the operation */
var KnownAppAction;
(function (KnownAppAction) {
    /** Web app was restarted. */
    KnownAppAction["Restarted"] = "Restarted";
    /** Web app was stopped. */
    KnownAppAction["Stopped"] = "Stopped";
    /** There was an operation to change app setting on the web app. */
    KnownAppAction["ChangedAppSettings"] = "ChangedAppSettings";
    /** The job has started. */
    KnownAppAction["Started"] = "Started";
    /** The job has completed. */
    KnownAppAction["Completed"] = "Completed";
    /** The job has failed to complete. */
    KnownAppAction["Failed"] = "Failed";
})(KnownAppAction || (exports.KnownAppAction = KnownAppAction = {}));
function webAppUpdatedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webBackupOperationStartedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webBackupOperationCompletedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webBackupOperationFailedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webRestoreOperationStartedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webRestoreOperationCompletedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webRestoreOperationFailedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webSlotSwapStartedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webSlotSwapCompletedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webSlotSwapFailedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webSlotSwapWithPreviewStartedEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webSlotSwapWithPreviewCancelledEventDataDeserializer(item) {
    return {
        appEventTypeDetail: appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function webAppServicePlanUpdatedEventDataDeserializer(item) {
    return {
        appServicePlanEventTypeDetail: appServicePlanEventTypeDetailDeserializer(item["appServicePlanEventTypeDetail"]),
        sku: webAppServicePlanUpdatedEventDataSkuDeserializer(item["sku"]),
        name: item["name"],
        clientRequestId: item["clientRequestId"],
        correlationRequestId: item["correlationRequestId"],
        requestId: item["requestId"],
        address: item["address"],
        verb: item["verb"],
    };
}
function appServicePlanEventTypeDetailDeserializer(item) {
    return {
        stampKind: item["stampKind"],
        action: item["action"],
        status: item["status"],
    };
}
/** Kind of environment where app service plan is. */
var KnownStampKind;
(function (KnownStampKind) {
    /** App Service Plan is running on a public stamp. */
    KnownStampKind["Public"] = "Public";
    /** App Service Plan is running on an App Service Environment V1. */
    KnownStampKind["AseV1"] = "AseV1";
    /** App Service Plan is running on an App Service Environment V2. */
    KnownStampKind["AseV2"] = "AseV2";
})(KnownStampKind || (exports.KnownStampKind = KnownStampKind = {}));
/** Type of action on the app service plan. */
var KnownAppServicePlanAction;
(function (KnownAppServicePlanAction) {
    /** App Service plan is being updated. */
    KnownAppServicePlanAction["Updated"] = "Updated";
})(KnownAppServicePlanAction || (exports.KnownAppServicePlanAction = KnownAppServicePlanAction = {}));
/** Asynchronous operation status of the operation on the app service plan. */
var KnownAsyncStatus;
(function (KnownAsyncStatus) {
    /** Async operation has started. */
    KnownAsyncStatus["Started"] = "Started";
    /** Async operation has completed. */
    KnownAsyncStatus["Completed"] = "Completed";
    /** Async operation failed to complete. */
    KnownAsyncStatus["Failed"] = "Failed";
})(KnownAsyncStatus || (exports.KnownAsyncStatus = KnownAsyncStatus = {}));
function webAppServicePlanUpdatedEventDataSkuDeserializer(item) {
    return {
        name: item["name"],
        tier: item["Tier"],
        size: item["Size"],
        family: item["Family"],
        capacity: item["Capacity"],
    };
}
function subscriptionValidationEventDataDeserializer(item) {
    return {
        validationCode: item["validationCode"],
        validationUrl: item["validationUrl"],
    };
}
function subscriptionValidationResponseDeserializer(item) {
    return {
        validationResponse: item["validationResponse"],
    };
}
function subscriptionDeletedEventDataDeserializer(item) {
    return {
        eventSubscriptionId: item["eventSubscriptionId"],
    };
}
function eventGridMqttClientEventDataDeserializer(item) {
    return {
        clientAuthenticationName: item["clientAuthenticationName"],
        clientName: item["clientName"],
        namespaceName: item["namespaceName"],
    };
}
function eventGridMqttClientCreatedOrUpdatedEventDataDeserializer(item) {
    return {
        clientAuthenticationName: item["clientAuthenticationName"],
        clientName: item["clientName"],
        namespaceName: item["namespaceName"],
        state: item["state"],
        createdOn: new Date(item["createdOn"]),
        updatedOn: new Date(item["updatedOn"]),
        attributes: item["attributes"],
    };
}
/** EventGrid MQTT Client State */
var KnownEventGridMqttClientState;
(function (KnownEventGridMqttClientState) {
    /** Enabled */
    KnownEventGridMqttClientState["Enabled"] = "Enabled";
    /** Disabled */
    KnownEventGridMqttClientState["Disabled"] = "Disabled";
})(KnownEventGridMqttClientState || (exports.KnownEventGridMqttClientState = KnownEventGridMqttClientState = {}));
function eventGridMqttClientDeletedEventDataDeserializer(item) {
    return {
        clientAuthenticationName: item["clientAuthenticationName"],
        clientName: item["clientName"],
        namespaceName: item["namespaceName"],
    };
}
function eventGridMqttClientSessionConnectedEventDataDeserializer(item) {
    return {
        clientAuthenticationName: item["clientAuthenticationName"],
        clientName: item["clientName"],
        namespaceName: item["namespaceName"],
        clientSessionName: item["clientSessionName"],
        sequenceNumber: item["sequenceNumber"],
    };
}
function eventGridMqttClientSessionDisconnectedEventDataDeserializer(item) {
    return {
        clientAuthenticationName: item["clientAuthenticationName"],
        clientName: item["clientName"],
        namespaceName: item["namespaceName"],
        clientSessionName: item["clientSessionName"],
        sequenceNumber: item["sequenceNumber"],
        disconnectionReason: item["disconnectionReason"],
    };
}
/** EventGrid MQTT Client Disconnection Reason */
var KnownEventGridMqttClientDisconnectionReason;
(function (KnownEventGridMqttClientDisconnectionReason) {
    /** The client got disconnected for any authentication reasons (for example, certificate expired, client got disabled, or client configuration changed). */
    KnownEventGridMqttClientDisconnectionReason["ClientAuthenticationError"] = "ClientAuthenticationError";
    /** The client got disconnected for any authorization reasons (for example, because of a change in the configuration of topic spaces, permission bindings, or client groups). */
    KnownEventGridMqttClientDisconnectionReason["ClientAuthorizationError"] = "ClientAuthorizationError";
    /** The client sent a bad request or used one of the unsupported features that resulted in a connection termination by the service. */
    KnownEventGridMqttClientDisconnectionReason["ClientError"] = "ClientError";
    /** The client initiated a graceful disconnect through a DISCONNECT packet for MQTT or a close frame for MQTT over WebSocket. */
    KnownEventGridMqttClientDisconnectionReason["ClientInitiatedDisconnect"] = "ClientInitiatedDisconnect";
    /** The client-server connection is lost. (EXCHANGE ONLINE PROTECTION). */
    KnownEventGridMqttClientDisconnectionReason["ConnectionLost"] = "ConnectionLost";
    /** The client's IP address is blocked by IP filter or Private links configuration. */
    KnownEventGridMqttClientDisconnectionReason["IpForbidden"] = "IpForbidden";
    /** The client exceeded one or more of the throttling limits that resulted in a connection termination by the service. */
    KnownEventGridMqttClientDisconnectionReason["QuotaExceeded"] = "QuotaExceeded";
    /** The connection got terminated due to an unexpected server error. */
    KnownEventGridMqttClientDisconnectionReason["ServerError"] = "ServerError";
    /** The server initiates a graceful disconnect for any operational reason. */
    KnownEventGridMqttClientDisconnectionReason["ServerInitiatedDisconnect"] = "ServerInitiatedDisconnect";
    /** The client's queue for unacknowledged QoS1 messages reached its limit, which resulted in a connection termination by the server. */
    KnownEventGridMqttClientDisconnectionReason["SessionOverflow"] = "SessionOverflow";
    /** The client reconnected with the same authentication name, which resulted in the termination of the previous connection. */
    KnownEventGridMqttClientDisconnectionReason["SessionTakenOver"] = "SessionTakenOver";
})(KnownEventGridMqttClientDisconnectionReason || (exports.KnownEventGridMqttClientDisconnectionReason = KnownEventGridMqttClientDisconnectionReason = {}));
function resourceNotificationsResourceUpdatedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
        apiVersion: item["apiVersion"],
    };
}
function resourceNotificationsResourceUpdatedDetailsDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        location: item["location"],
        tags: item["tags"],
        properties: item["properties"],
    };
}
function resourceNotificationsOperationalDetailsDeserializer(item) {
    return {
        resourceEventTime: new Date(item["resourceEventTime"]),
    };
}
function resourceNotificationsHealthResourcesAvailabilityStatusChangedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
        apiVersion: item["apiVersion"],
    };
}
function resourceNotificationsHealthResourcesAnnotatedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
        apiVersion: item["apiVersion"],
    };
}
function resourceNotificationsResourceDeletedDetailsDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
    };
}
function resourceNotificationsResourceDeletedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceDeletedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
    };
}
function resourceNotificationsResourceManagementCreatedOrUpdatedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
        apiVersion: item["apiVersion"],
    };
}
function resourceNotificationsResourceManagementDeletedEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceDeletedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
    };
}
function resourceNotificationsContainerServiceEventResourcesScheduledEventDataDeserializer(item) {
    return {
        resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
        operationalDetails: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
        apiVersion: item["apiVersion"],
    };
}
/** Known values of {@link ServiceApiVersions} that the service accepts. */
var KnownServiceApiVersions;
(function (KnownServiceApiVersions) {
    KnownServiceApiVersions["v2018_01_01"] = "2018-01-01";
    KnownServiceApiVersions["v2024_01_01"] = "2024-01-01";
})(KnownServiceApiVersions || (exports.KnownServiceApiVersions = KnownServiceApiVersions = {}));
//# sourceMappingURL=models.js.map