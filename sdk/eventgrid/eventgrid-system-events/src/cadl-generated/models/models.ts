// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionAdded event. */
export interface ApiCenterApiDefinitionAddedEventData {
  /** API definition title. */
  title?: string;
  /** API definition description. */
  description?: string;
  /** API definition specification. */
  specification: ApiCenterApiSpecification;
}

/** API specification details. */
export interface ApiCenterApiSpecification {
  /** Specification name. */
  name?: string;
  /** Specification version. */
  version?: string;
}

/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionUpdated event. */
export interface ApiCenterApiDefinitionUpdatedEventData {
  /** API definition title. */
  title?: string;
  /** API definition description. */
  description?: string;
  /** API definition specification. */
  specification: ApiCenterApiSpecification;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserCreated event. */
export interface ApiManagementUserCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserUpdated event. */
export interface ApiManagementUserUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserDeleted event. */
export interface ApiManagementUserDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionCreated event. */
export interface ApiManagementSubscriptionCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionUpdated event. */
export interface ApiManagementSubscriptionUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionDeleted event. */
export interface ApiManagementSubscriptionDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductCreated event. */
export interface ApiManagementProductCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductUpdated event. */
export interface ApiManagementProductUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductDeleted event. */
export interface ApiManagementProductDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APICreated event. */
export interface ApiManagementApiCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIUpdated event. */
export interface ApiManagementApiUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIDeleted event. */
export interface ApiManagementApiDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseCreated event. */
export interface ApiManagementApiReleaseCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseUpdated event. */
export interface ApiManagementApiReleaseUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseDeleted event. */
export interface ApiManagementApiReleaseDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCreated event. */
export interface ApiManagementGatewayCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayUpdated event. */
export interface ApiManagementGatewayUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayDeleted event. */
export interface ApiManagementGatewayDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationCreated event. */
export interface ApiManagementGatewayHostnameConfigurationCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationUpdated event. */
export interface ApiManagementGatewayHostnameConfigurationUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationDeleted event. */
export interface ApiManagementGatewayHostnameConfigurationDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityCreated event. */
export interface ApiManagementGatewayCertificateAuthorityCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityUpdated event. */
export interface ApiManagementGatewayCertificateAuthorityUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityDeleted event. */
export interface ApiManagementGatewayCertificateAuthorityDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayAPIAdded event. */
export interface ApiManagementGatewayApiAddedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/apis/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayAPIRemoved event. */
export interface ApiManagementGatewayApiRemovedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/apis/<ResourceName>` */
  resourceUri?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.KeyValueModified event. */
export interface AppConfigurationKeyValueModifiedEventData {
  /** The key used to identify the key-value that was modified. */
  key?: string;
  /** The label, if any, used to identify the key-value that was modified. */
  label?: string;
  /** The etag representing the new state of the key-value. */
  etag?: string;
  /** The sync token representing the server state after the event. */
  syncToken?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.KeyValueDeleted event. */
export interface AppConfigurationKeyValueDeletedEventData {
  /** The key used to identify the key-value that was deleted. */
  key?: string;
  /** The label, if any, used to identify the key-value that was deleted. */
  label?: string;
  /** The etag representing the key-value that was deleted. */
  etag?: string;
  /** The sync token representing the server state after the event. */
  syncToken?: string;
}

/** Schema of common properties of snapshot events */
export interface AppConfigurationSnapshotEventData {
  /** The name of the snapshot. */
  name?: string;
  /** The etag representing the new state of the snapshot. */
  etag?: string;
  /** The sync token representing the server state after the event. */
  syncToken?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.SnapshotCreated event. */
export interface AppConfigurationSnapshotCreatedEventData
  extends AppConfigurationSnapshotEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.SnapshotModified event. */
export interface AppConfigurationSnapshotModifiedEventData
  extends AppConfigurationSnapshotEventData {}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/privateClouds events. */
export interface AvsPrivateCloudEventData {
  /** Id of the operation that caused this event. */
  operationId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudUpdating event. */
export interface AvsPrivateCloudUpdatingEventData extends AvsPrivateCloudEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudUpdated event. */
export interface AvsPrivateCloudUpdatedEventData extends AvsPrivateCloudEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudFailed event. */
export interface AvsPrivateCloudFailedEventData extends AvsPrivateCloudEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/clusters events. */
export interface AvsClusterEventData {
  /** Id of the operation that caused this event. */
  operationId?: string;
  /** Hosts added to the cluster in this event, if any. */
  addedHostNames?: string[];
  /** Hosts removed from the cluster in this event, if any. */
  removedHostNames?: string[];
  /** Hosts in Maintenance mode in the cluster, if any. */
  inMaintenanceHostNames?: string[];
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterCreated event. */
export interface AvsClusterCreatedEventData extends AvsClusterEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterDeleted event. */
export interface AvsClusterDeletedEventData extends AvsClusterEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterUpdating event. */
export interface AvsClusterUpdatingEventData extends AvsClusterEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterUpdated event. */
export interface AvsClusterUpdatedEventData extends AvsClusterEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterFailed event. */
export interface AvsClusterFailedEventData extends AvsClusterEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/scriptExecutions events. */
export interface AvsScriptExecutionEventData {
  /** Id of the operation that caused this event. */
  operationId?: string;
  /** Cmdlet referenced in the execution that caused this event. */
  cmdletId?: string;
  /** Stdout outputs from the execution, if any. */
  output?: string[];
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionStarted event. */
export interface AvsScriptExecutionStartedEventData extends AvsScriptExecutionEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionFinished event. */
export interface AvsScriptExecutionFinishedEventData extends AvsScriptExecutionEventData {
  /** Named outputs of completed execution, if any. */
  namedOutputs: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionCancelled event. */
export interface AvsScriptExecutionCancelledEventData extends AvsScriptExecutionEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionFailed event. */
export interface AvsScriptExecutionFailedEventData extends AvsScriptExecutionEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Communication.IncomingCall event */
export interface AcsIncomingCallEventData {
  /** The communication identifier of the target user. */
  toCommunicationIdentifier: CommunicationIdentifierModel;
  /** The communication identifier of the user who initiated the call. */
  fromCommunicationIdentifier: CommunicationIdentifierModel;
  /** The Id of the server call */
  serverCallId?: string;
  /** Display name of caller. */
  callerDisplayName?: string;
  /** Custom Context of Incoming Call */
  customContext: AcsIncomingCallCustomContext;
  /** Signed incoming call context. */
  incomingCallContext?: string;
  /** CorrelationId (CallId). */
  correlationId?: string;
}

/** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
export interface CommunicationIdentifierModel {
  /** The identifier kind. Only required in responses. */
  kind: CommunicationIdentifierModelKind;
  /** Raw Id of the identifier. Optional in requests, required in responses. */
  rawId?: string;
  /** The communication user. */
  communicationUser: CommunicationUserIdentifierModel;
  /** The phone number. */
  phoneNumber: PhoneNumberIdentifierModel;
  /** The Microsoft Teams user. */
  microsoftTeamsUser: MicrosoftTeamsUserIdentifierModel;
  /** The Microsoft Teams application. */
  microsoftTeamsApp: MicrosoftTeamsAppIdentifierModel;
}

/** Communication model identifier kind */
export type CommunicationIdentifierModelKind =
  | "unknown"
  | "communicationUser"
  | "phoneNumber"
  | "microsoftTeamsUser";

/** A user that got created with an Azure Communication Services resource. */
export interface CommunicationUserIdentifierModel {
  /** The Id of the communication user. */
  id: string;
}

/** A phone number. */
export interface PhoneNumberIdentifierModel {
  /** The phone number in E.164 format. */
  value: string;
}

/** A Microsoft Teams user. */
export interface MicrosoftTeamsUserIdentifierModel {
  /** The Id of the Microsoft Teams user. If not anonymous, this is the AAD object Id of the user. */
  userId: string;
  /** True if the Microsoft Teams user is anonymous. By default false if missing. */
  isAnonymous?: boolean;
  /** The cloud that the Microsoft Teams user belongs to. By default 'public' if missing. */
  cloud: CommunicationCloudEnvironmentModel;
}

/** Communication cloud environment model. */
export type CommunicationCloudEnvironmentModel = "public" | "dod" | "gcch";

/** A Microsoft Teams application. */
export interface MicrosoftTeamsAppIdentifierModel {
  /** The Id of the Microsoft Teams application */
  appId: string;
  /** The cloud that the Microsoft Teams application belongs to. By default 'public' if missing. */
  cloud: CommunicationCloudEnvironmentModel;
}

/** Custom Context of Incoming Call */
export interface AcsIncomingCallCustomContext {
  /** Sip Headers for incoming call */
  sipHeaders: Record<string, string>;
  /** Voip Headers for incoming call */
  voipHeaders: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Communication.UserDisconnected event. */
export interface AcsUserDisconnectedEventData {
  /** The communication identifier of the user who was disconnected */
  userCommunicationIdentifier: CommunicationIdentifierModel;
}

/** Schema of common properties of all chat events */
export interface AcsChatEventBase {
  /** The communication identifier of the target user */
  recipientCommunicationIdentifier: CommunicationIdentifierModel;
  /** The transaction id will be used as co-relation vector */
  transactionId?: string;
  /** The chat thread id */
  threadId?: string;
}

/** Schema of common properties of all thread-level chat events */
export interface AcsChatEventInThreadBase {
  /** The transaction id will be used as co-relation vector */
  transactionId?: string;
  /** The chat thread id */
  threadId?: string;
}

/** Schema of common properties of all chat message events */
export interface AcsChatMessageEventBase extends AcsChatEventBase {
  /** The chat message id */
  messageId?: string;
  /** The communication identifier of the sender */
  senderCommunicationIdentifier: CommunicationIdentifierModel;
  /** The display name of the sender */
  senderDisplayName?: string;
  /** The original compose time of the message */
  composeTime: Date;
  /** The type of the message */
  type?: string;
  /** The version of the message */
  version?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageReceived event. */
export interface AcsChatMessageReceivedEventData extends AcsChatMessageEventBase {
  /** The body of the chat message */
  messageBody?: string;
  /** The chat message metadata */
  metadata: Record<string, string>;
}

/** Schema of common properties of all thread-level chat message events */
export interface AcsChatMessageEventInThreadBase extends AcsChatEventInThreadBase {
  /** The chat message id */
  messageId?: string;
  /** The communication identifier of the sender */
  senderCommunicationIdentifier: CommunicationIdentifierModel;
  /** The display name of the sender */
  senderDisplayName?: string;
  /** The original compose time of the message */
  composeTime: Date;
  /** The type of the message */
  type?: string;
  /** The version of the message */
  version?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageReceivedInThread event. */
export interface AcsChatMessageReceivedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody?: string;
  /** The chat message metadata */
  metadata: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageEdited event. */
export interface AcsChatMessageEditedEventData extends AcsChatMessageEventBase {
  /** The body of the chat message */
  messageBody?: string;
  /** The chat message metadata */
  metadata: Record<string, string>;
  /** The time at which the message was edited */
  editTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageEditedInThread event. */
export interface AcsChatMessageEditedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody?: string;
  /** The chat message metadata */
  metadata: Record<string, string>;
  /** The time at which the message was edited */
  editTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageDeleted event. */
export interface AcsChatMessageDeletedEventData extends AcsChatMessageEventBase {
  /** The time at which the message was deleted */
  deleteTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageDeletedInThread event. */
export interface AcsChatMessageDeletedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The time at which the message was deleted */
  deleteTime: Date;
}

/** Schema of common properties of all chat thread events */
export interface AcsChatThreadEventBase extends AcsChatEventBase {
  /** The original creation time of the thread */
  createTime: Date;
  /** The version of the thread */
  version?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadCreatedWithUser event. */
export interface AcsChatThreadCreatedWithUserEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who created the thread */
  createdByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  metadata: Record<string, string>;
  /** The list of properties of participants who are part of the thread */
  participants: AcsChatThreadParticipant[];
}

/** Schema of the chat thread participant */
export interface AcsChatThreadParticipant {
  /** The name of the user */
  displayName?: string;
  /** The communication identifier of the user */
  participantCommunicationIdentifier: CommunicationIdentifierModel;
  /** The metadata of the user */
  metadata: Record<string, string>;
}

/** Schema of common properties of all chat thread events */
export interface AcsChatThreadEventInThreadBase extends AcsChatEventInThreadBase {
  /** The original creation time of the thread */
  createTime: Date;
  /** The version of the thread */
  version?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadCreated event. */
export interface AcsChatThreadCreatedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who created the thread */
  createdByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  metadata: Record<string, string>;
  /** The list of properties of participants who are part of the thread */
  participants: AcsChatThreadParticipant[];
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadWithUserDeleted event. */
export interface AcsChatThreadWithUserDeletedEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who deleted the thread */
  deletedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The deletion time of the thread */
  deleteTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadDeleted event. */
export interface AcsChatThreadDeletedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who deleted the thread */
  deletedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The deletion time of the thread */
  deleteTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser event. */
export interface AcsChatThreadPropertiesUpdatedPerUserEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who updated the thread properties */
  editedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The time at which the properties of the thread were updated */
  editTime: Date;
  /** The thread metadata */
  metadata: Record<string, string>;
  /** The updated thread properties */
  properties: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadPropertiesUpdated event. */
export interface AcsChatThreadPropertiesUpdatedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who updated the thread properties */
  editedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The time at which the properties of the thread were updated */
  editTime: Date;
  /** The updated thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  metadata: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatParticipantAddedToThreadWithUser event. */
export interface AcsChatParticipantAddedToThreadWithUserEventData extends AcsChatThreadEventBase {
  /** The time at which the user was added to the thread */
  time: Date;
  /** The communication identifier of the user who added the user */
  addedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was added */
  participantAdded: AcsChatThreadParticipant;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatParticipantRemovedFromThreadWithUser event. */
export interface AcsChatParticipantRemovedFromThreadWithUserEventData
  extends AcsChatThreadEventBase {
  /** The time at which the user was removed to the thread */
  time: Date;
  /** The communication identifier of the user who removed the user */
  removedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was removed */
  participantRemoved: AcsChatThreadParticipant;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadParticipantAdded event. */
export interface AcsChatParticipantAddedToThreadEventData extends AcsChatEventInThreadBase {
  /** The time at which the user was added to the thread */
  time: Date;
  /** The communication identifier of the user who added the user */
  addedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was added */
  participantAdded: AcsChatThreadParticipant;
  /** The version of the thread */
  version?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadParticipantRemoved event. */
export interface AcsChatParticipantRemovedFromThreadEventData extends AcsChatEventInThreadBase {
  /** The time at which the user was removed to the thread */
  time: Date;
  /** The communication identifier of the user who removed the user */
  removedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was removed */
  participantRemoved: AcsChatThreadParticipant;
  /** The version of the thread */
  version?: number;
}

/** Schema of common properties of all SMS events */
export interface AcsSmsEventBase {
  /** The identity of the SMS message */
  messageId?: string;
  /** The identity of SMS message sender */
  from?: string;
  /** The identity of SMS message receiver */
  to?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.SMSDeliveryReportReceived event. */
export interface AcsSmsDeliveryReportReceivedEventData extends AcsSmsEventBase {
  /** Status of Delivery */
  deliveryStatus?: string;
  /** Details about Delivery Status */
  deliveryStatusDetails?: string;
  /** List of details of delivery attempts made */
  deliveryAttempts: AcsSmsDeliveryAttempt[];
  /** The time at which the SMS delivery report was received */
  receivedTimestamp: Date;
  /** Customer Content */
  tag?: string;
}

/** Schema for details of a delivery attempt */
export interface AcsSmsDeliveryAttempt {
  /** TimeStamp when delivery was attempted */
  timestamp: Date;
  /** Number of segments that were successfully delivered */
  segmentsSucceeded?: number;
  /** Number of segments whose delivery failed */
  segmentsFailed?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.SMSReceived event. */
export interface AcsSmsReceivedEventData extends AcsSmsEventBase {
  /** The SMS content */
  message?: string;
  /** The time at which the SMS was received */
  receivedTimestamp: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RecordingFileStatusUpdated event. */
export interface AcsRecordingFileStatusUpdatedEventData {
  /** The details of recording storage information */
  recordingStorageInfo: AcsRecordingStorageInfo;
  /** The time at which the recording started */
  recordingStartTime: Date;
  /** The recording duration in milliseconds */
  recordingDurationMs?: number;
  /** The recording content type- AudioVideo, or Audio */
  recordingContentType: RecordingContentType;
  /** The recording  channel type - Mixed, Unmixed */
  recordingChannelType: RecordingChannelType;
  /** The recording format type - Mp4, Mp3, Wav */
  recordingFormatType: RecordingFormatType;
  /** The reason for ending recording session */
  sessionEndReason?: string;
}

/** Schema for all properties of Recording Storage Information. */
export interface AcsRecordingStorageInfo {
  /** List of details of recording chunks information */
  recordingChunks: AcsRecordingChunkInfo[];
}

/** Schema for all properties of  Recording Chunk Information. */
export interface AcsRecordingChunkInfo {
  /** The documentId of the recording chunk */
  documentId?: string;
  /** The index of the recording chunk */
  index?: number;
  /** The reason for ending the recording chunk */
  endReason?: string;
  /** The location of the metadata for this chunk */
  metadataLocation?: string;
  /** The location of the content for this chunk */
  contentLocation?: string;
  /** The location to delete all chunk storage */
  deleteLocation?: string;
}

/** Recording content type */
export type RecordingContentType = "AudioVideo" | "Audio";
/** Recording channel type */
export type RecordingChannelType = "Mixed" | "Unmixed";
/** Recording format type */
export type RecordingFormatType = "Wav" | "Mp3" | "Mp4";

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.EmailDeliveryReportReceived event. */
export interface AcsEmailDeliveryReportReceivedEventData {
  /** The Sender Email Address */
  sender?: string;
  /** The recipient Email Address */
  recipient?: string;
  /** The Id of the email been sent */
  messageId?: string;
  /** The status of the email. Any value other than Delivered is considered failed. */
  status: AcsEmailDeliveryReportStatus;
  /** Detailed information about the status if any */
  deliveryStatusDetails: AcsEmailDeliveryReportStatusDetails;
  /** The time at which the email delivery report received timestamp */
  deliveryAttemptTimestamp: Date;
}

/** The status of the email. Any value other than Delivered is considered failed. */
export type AcsEmailDeliveryReportStatus =
  | "Bounced"
  | "Delivered"
  | "Failed"
  | "FilteredSpam"
  | "Quarantined"
  | "Suppressed";

/** Detailed information about the status if any */
export interface AcsEmailDeliveryReportStatusDetails {
  /** Detailed status message */
  statusMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.EmailEngagementTrackingReportReceived event. */
export interface AcsEmailEngagementTrackingReportReceivedEventData {
  /** The Sender Email Address */
  sender?: string;
  /** The Recipient Email Address */
  recipient?: string;
  /** The Id of the email that has been sent */
  messageId?: string;
  /** The time at which the user interacted with the email */
  userActionTimestamp: Date;
  /** The context of the type of engagement user had with email */
  engagementContext?: string;
  /** The user agent interacting with the email */
  userAgent?: string;
  /** The type of engagement user have with email */
  engagement: AcsUserEngagement;
}

/** The type of engagement user have with email. */
export type AcsUserEngagement = "view" | "click";

/** Schema of common properties of all Router events */
export interface AcsRouterEventData {
  /** Router Event Job ID */
  jobId?: string;
  /** Router Event Channel Reference */
  channelReference?: string;
  /** Router Event Channel ID */
  channelId?: string;
}

/** Schema of common properties of all Router Job events */
export interface AcsRouterJobEventData extends AcsRouterEventData {
  /** Router Job events Queue Id */
  queueId?: string;
  /** Router Job events Labels */
  labels: Record<string, string>;
  /** Router Jobs events Tags */
  tags: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobCancelled event */
export interface AcsRouterJobCancelledEventData extends AcsRouterJobEventData {
  /** Router Job Note */
  note?: string;
  /** Router Job Disposition Code */
  dispositionCode?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClassificationFailed event */
export interface AcsRouterJobClassificationFailedEventData extends AcsRouterJobEventData {
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Classification Failed Errors */
  errors: AcsRouterCommunicationError[];
}

/** Router Communication Error */
export interface AcsRouterCommunicationError {
  /** Router Communication Error Code */
  code?: string;
  /** Router Communication Error Message */
  message?: string;
  /** Router Communication Error Target */
  target?: string;
  /** Router Communication Inner Error */
  innererror: AcsRouterCommunicationError;
  /** List of Router Communication Errors */
  details: AcsRouterCommunicationError[];
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClassified event */
export interface AcsRouterJobClassifiedEventData extends AcsRouterJobEventData {
  /** Router Job Queue Info */
  queueDetails: AcsRouterQueueDetails;
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Priority */
  priority?: number;
  /** Router Job Attached Worker Selector */
  attachedWorkerSelectors: AcsRouterWorkerSelector[];
}

/** Router Queue Details */
export interface AcsRouterQueueDetails {
  /** Router Queue Id */
  id?: string;
  /** Router Queue Name */
  name?: string;
  /** Router Queue Labels */
  labels: Record<string, string>;
}

/** Router Job Worker Selector */
export interface AcsRouterWorkerSelector {
  /** Router Job Worker Selector Key */
  key?: string;
  /** Router Job Worker Selector Label Operator */
  labelOperator: AcsRouterLabelOperator;
  /** Router Job Worker Selector Value */
  labelValue: any;
  /** Router Job Worker Selector Time to Live in Seconds */
  ttlSeconds: number;
  /** Router Job Worker Selector State */
  state: AcsRouterWorkerSelectorState;
  /** Router Job Worker Selector Expiration Time */
  expirationTime: Date;
}

/** Router Job Worker Selector Label Operator */
export type AcsRouterLabelOperator =
  | "Equal"
  | "NotEqual"
  | "Greater"
  | "Less"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual";
/** Router Worker Selector State */
export type AcsRouterWorkerSelectorState = "active" | "expired";

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClosed event */
export interface AcsRouterJobClosedEventData extends AcsRouterJobEventData {
  /** Router Job Closed Assignment Id */
  assignmentId?: string;
  /** Router Job Closed Worker Id */
  workerId?: string;
  /** Router Job Closed Disposition Code */
  dispositionCode?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobCompleted event */
export interface AcsRouterJobCompletedEventData extends AcsRouterJobEventData {
  /** Router Job Completed Assignment Id */
  assignmentId?: string;
  /** Router Job Completed Worker Id */
  workerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobDeleted event */
export interface AcsRouterJobDeletedEventData extends AcsRouterJobEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobExceptionTriggered event */
export interface AcsRouterJobExceptionTriggeredEventData extends AcsRouterJobEventData {
  /** Router Job Exception Triggered Rule Key */
  ruleKey?: string;
  /** Router Job Exception Triggered Rule Id */
  exceptionRuleId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobQueued event */
export interface AcsRouterJobQueuedEventData extends AcsRouterJobEventData {
  /** Router Job Priority */
  priority?: number;
  /** Router Job Queued Attached Worker Selector */
  attachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Queued Requested Worker Selector */
  requestedWorkerSelectors: AcsRouterWorkerSelector[];
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobReceived event */
export interface AcsRouterJobReceivedEventData extends AcsRouterJobEventData {
  /** Router Job Received Job Status */
  jobStatus: AcsRouterJobStatus;
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Priority */
  priority?: number;
  /** Router Job Received Requested Worker Selectors */
  requestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Received Scheduled Time in UTC */
  scheduledOn: Date;
  /** Unavailable For Matching for Router Job Received */
  unavailableForMatching: boolean;
}

/** Acs Router Job Status */
export type AcsRouterJobStatus =
  | "PendingClassification"
  | "Queued"
  | "Assigned"
  | "Completed"
  | "Closed"
  | "Cancelled"
  | "ClassificationFailed"
  | "Created"
  | "PendingSchedule"
  | "Scheduled"
  | "ScheduleFailed"
  | "WaitingForActivation";

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobSchedulingFailed event */
export interface AcsRouterJobSchedulingFailedEventData extends AcsRouterJobEventData {
  /** Router Job Priority */
  priority?: number;
  /** Router Job Scheduling Failed Attached Worker Selector Expired */
  expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Scheduling Failed Requested Worker Selector Expired */
  expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Scheduling Failed Scheduled Time in UTC */
  scheduledOn: Date;
  /** Router Job Scheduling Failed Reason */
  failureReason?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobUnassigned event */
export interface AcsRouterJobUnassignedEventData extends AcsRouterJobEventData {
  /** Router Job Unassigned Assignment Id */
  assignmentId?: string;
  /** Router Job Unassigned Worker Id */
  workerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobWaitingForActivation event */
export interface AcsRouterJobWaitingForActivationEventData extends AcsRouterJobEventData {
  /** Router Job Waiting For Activation Priority */
  priority?: number;
  /** Router Job Waiting For Activation Worker Selector Expired */
  expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Waiting For Activation Requested Worker Selector Expired */
  expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Waiting For Activation Scheduled Time in UTC */
  scheduledOn: Date;
  /** Router Job Waiting For Activation Unavailable For Matching */
  unavailableForMatching: boolean;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobWorkerSelectorsExpired event */
export interface AcsRouterJobWorkerSelectorsExpiredEventData extends AcsRouterJobEventData {
  /** Router Job Worker Selectors Expired Requested Worker Selectors */
  expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Worker Selectors Expired Attached Worker Selectors */
  expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
}

/** Schema of common properties of all Router Worker events */
export interface AcsRouterWorkerEventData extends AcsRouterEventData {
  /** Router Worker events Worker Id */
  workerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerDeleted event */
export interface AcsRouterWorkerDeletedEventData extends AcsRouterWorkerEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerDeregistered event */
export interface AcsRouterWorkerDeregisteredEventData {
  /** Router Worker Deregistered Worker Id */
  workerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferAccepted event */
export interface AcsRouterWorkerOfferAcceptedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Accepted Queue Id */
  queueId?: string;
  /** Router Worker Offer Accepted Offer Id */
  offerId?: string;
  /** Router Worker Offer Accepted Assignment Id */
  assignmentId?: string;
  /** Router Worker Offer Accepted Job Priority */
  jobPriority?: number;
  /** Router Worker Offer Accepted Worker Labels */
  workerLabels: Record<string, string>;
  /** Router Worker Offer Accepted Worker Tags */
  workerTags: Record<string, string>;
  /** Router Worker Offer Accepted Job Labels */
  jobLabels: Record<string, string>;
  /** Router Worker Offer Accepted Job Tags */
  jobTags: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferDeclined event */
export interface AcsRouterWorkerOfferDeclinedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Declined Queue Id */
  queueId?: string;
  /** Router Worker Offer Declined Offer Id */
  offerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferExpired event */
export interface AcsRouterWorkerOfferExpiredEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Expired Queue Id */
  queueId?: string;
  /** Router Worker Offer Expired Offer Id */
  offerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferIssued event */
export interface AcsRouterWorkerOfferIssuedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Issued Queue Id */
  queueId?: string;
  /** Router Worker Offer Issued Offer Id */
  offerId?: string;
  /** Router Worker Offer Issued Job Priority */
  jobPriority?: number;
  /** Router Worker Offer Issued Worker Labels */
  workerLabels: Record<string, string>;
  /** Router Worker Offer Issued Time in UTC */
  offeredOn: Date;
  /** Router Worker Offer Issued Expiration Time in UTC */
  expiresOn: Date;
  /** Router Worker Offer Issued Worker Tags */
  workerTags: Record<string, string>;
  /** Router Worker Offer Issued Job Labels */
  jobLabels: Record<string, string>;
  /** Router Worker Offer Issued Job Tags */
  jobTags: Record<string, string>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferRevoked event */
export interface AcsRouterWorkerOfferRevokedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Revoked Queue Id */
  queueId?: string;
  /** Router Worker Offer Revoked Offer Id */
  offerId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerRegistered event */
export interface AcsRouterWorkerRegisteredEventData {
  /** Router Worker Registered Worker Id */
  workerId?: string;
  /** Router Worker Registered Queue Info */
  queueAssignments: AcsRouterQueueDetails[];
  /** Router Worker Registered Channel Configuration */
  channelConfigurations: AcsRouterChannelConfiguration[];
  /** Router Worker Register Total Capacity */
  totalCapacity?: number;
  /** Router Worker Registered Labels */
  labels: Record<string, string>;
  /** Router Worker Registered Tags */
  tags: Record<string, string>;
}

/** Router Channel Configuration */
export interface AcsRouterChannelConfiguration {
  /** Channel ID for Router Job */
  channelId?: string;
  /** Capacity Cost Per Job for Router Job */
  capacityCostPerJob?: number;
  /** Max Number of Jobs for Router Job */
  maxNumberOfJobs?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerUpdated event. */
export interface AcsRouterWorkerUpdatedEventData {
  /** Router Worker Updated Worker Id */
  workerId?: string;
  /** Router Worker Updated Queue Info */
  queueAssignments: AcsRouterQueueDetails[];
  /** Router Worker Updated Channel Configuration */
  channelConfigurations: AcsRouterChannelConfiguration[];
  /** Router Worker Updated Total Capacity */
  totalCapacity?: number;
  /** Router Worker Updated Labels */
  labels: Record<string, string>;
  /** Router Worker Updated Tags */
  tags: Record<string, string>;
  /** Router Worker Properties Updated */
  updatedWorkerProperties: AcsRouterUpdatedWorkerProperty[];
}

/** Worker properties that can be updated */
export type AcsRouterUpdatedWorkerProperty =
  | "AvailableForOffers"
  | "TotalCapacity"
  | "QueueAssignments"
  | "Labels"
  | "Tags"
  | "ChannelConfigurations";

/** Schema of common properties of all chat thread events */
export interface AcsMessageEventData {
  /** The message sender */
  from?: string;
  /** The message recipient */
  to?: string;
  /** The time message was received */
  receivedTimeStamp: Date;
  /** The channel event error */
  error: AcsMessageChannelEventError;
}

/** Message Channel Event Error */
export interface AcsMessageChannelEventError {
  /** The channel error code */
  channelCode?: string;
  /** The channel error message */
  channelMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.AdvancedMessageDeliveryStatusUpdated event. */
export interface AcsMessageDeliveryStatusUpdatedEventData extends AcsMessageEventData {
  /** The message id */
  messageId?: string;
  /** The updated message status */
  status: AcsMessageDeliveryStatus;
  /** The updated message channel type */
  channelKind: AcsMessageChannelKind;
}

/** Message delivery status */
export type AcsMessageDeliveryStatus =
  | "read"
  | "delivered"
  | "failed"
  | "sent"
  | "warning"
  | "unknown";
/** Message channel kind */
export type AcsMessageChannelKind = "whatsapp";

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.AdvancedMessageReceived event. */
export interface AcsMessageReceivedEventData extends AcsMessageEventData {
  /** The message content */
  content?: string;
  /** The message channel type */
  channelKind: AcsMessageChannelKind;
  /** The received message media content */
  mediaContent: AcsMessageMediaContent;
  /** The received message context */
  context: AcsMessageContext;
  /** The received message button content */
  button: AcsMessageButtonContent;
  /** The received message interactive content */
  interactiveContent: AcsMessageInteractiveContent;
}

/** Message Media Content */
export interface AcsMessageMediaContent {
  /** The MIME type of the file this media represents */
  mimeType?: string;
  /** The media identifier */
  mediaId?: string;
  /** The filename of the underlying media file as specified when uploaded */
  fileName?: string;
  /** The caption for the media object, if supported and provided */
  caption?: string;
}

/** Message Context */
export interface AcsMessageContext {
  /** The WhatsApp ID for the customer who replied to an inbound message. */
  from?: string;
  /** The message ID for the sent message for an inbound reply */
  messageId?: string;
}

/** Message Button Content */
export interface AcsMessageButtonContent {
  /** The Text of the button */
  text?: string;
  /** The Payload of the button which was clicked by the user, setup by the business */
  payload?: string;
}

/** Message Interactive Content */
export interface AcsMessageInteractiveContent {
  /** The Message interactive reply type */
  replyKind: AcsInteractiveReplyKind;
  /** The Message Sent when a customer clicks a button */
  buttonReply: AcsMessageInteractiveButtonReplyContent;
  /** The Message Sent when a customer selects an item from a list */
  listReply: AcsMessageInteractiveListReplyContent;
}

/** Interactive reply kind */
export type AcsInteractiveReplyKind = "buttonReply" | "listReply" | "unknown";

/** Message Interactive button reply content for a user to business message */
export interface AcsMessageInteractiveButtonReplyContent {
  /** The ID of the button */
  buttonId?: string;
  /** The title of the button */
  title?: string;
}

/** Message Interactive list reply content for a user to business message */
export interface AcsMessageInteractiveListReplyContent {
  /** The ID of the selected list item */
  listItemId?: string;
  /** The title of the selected list item */
  title?: string;
  /** The description of the selected row */
  description?: string;
}

/** The content of the event request message. */
export interface ContainerRegistryEventData {
  /** The event ID. */
  id?: string;
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The action that encompasses the provided event. */
  action?: string;
  /** The location of the event. */
  location?: string;
  /** The target of the event. */
  target: ContainerRegistryEventTarget;
  /** The request that generated the event. */
  request: ContainerRegistryEventRequest;
  /** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
  actor: ContainerRegistryEventActor;
  /** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
  source: ContainerRegistryEventSource;
  /** The connected registry information if the event is generated by a connected registry. */
  connectedRegistry: ContainerRegistryEventConnectedRegistry;
}

/** The target of the event. */
export interface ContainerRegistryEventTarget {
  /** The MIME type of the referenced object. */
  mediaType?: string;
  /** The number of bytes of the content. Same as Length field. */
  size?: number;
  /** The digest of the content, as defined by the Registry V2 HTTP API Specification. */
  digest?: string;
  /** The number of bytes of the content. Same as Size field. */
  length?: number;
  /** The repository name. */
  repository?: string;
  /** The direct URL to the content. */
  url?: string;
  /** The tag name. */
  tag?: string;
}

/** The request that generated the event. */
export interface ContainerRegistryEventRequest {
  /** The ID of the request that initiated the event. */
  id?: string;
  /** The IP or hostname and possibly port of the client connection that initiated the event. This is the RemoteAddr from the standard http request. */
  addr?: string;
  /** The externally accessible hostname of the registry instance, as specified by the http host header on incoming requests. */
  host?: string;
  /** The request method that generated the event. */
  method?: string;
  /** The user agent header of the request. */
  useragent?: string;
}

/** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
export interface ContainerRegistryEventActor {
  /** The subject or username associated with the request context that generated the event. */
  name?: string;
}

/** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
export interface ContainerRegistryEventSource {
  /** The IP or hostname and the port of the registry node that generated the event. Generally, this will be resolved by os.Hostname() along with the running port. */
  addr?: string;
  /** The running instance of an application. Changes after each restart. */
  instanceID?: string;
}

/** The connected registry information if the event is generated by a connected registry. */
export interface ContainerRegistryEventConnectedRegistry {
  /** The name of the connected registry that generated this event. */
  name?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ImagePushed event. */
export interface ContainerRegistryImagePushedEventData extends ContainerRegistryEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ImageDeleted event. */
export interface ContainerRegistryImageDeletedEventData extends ContainerRegistryEventData {}

/** The content of the event request message. */
export interface ContainerRegistryArtifactEventData {
  /** The event ID. */
  id?: string;
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The action that encompasses the provided event. */
  action?: string;
  /** The location of the event. */
  location?: string;
  /** The target of the event. */
  target: ContainerRegistryArtifactEventTarget;
  /** The connected registry information if the event is generated by a connected registry. */
  connectedRegistry: ContainerRegistryEventConnectedRegistry;
}

/** The target of the event. */
export interface ContainerRegistryArtifactEventTarget {
  /** The MIME type of the artifact. */
  mediaType?: string;
  /** The size in bytes of the artifact. */
  size?: number;
  /** The digest of the artifact. */
  digest?: string;
  /** The repository name of the artifact. */
  repository?: string;
  /** The tag of the artifact. */
  tag?: string;
  /** The name of the artifact. */
  name?: string;
  /** The version of the artifact. */
  version?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ChartPushed event. */
export interface ContainerRegistryChartPushedEventData extends ContainerRegistryArtifactEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ChartDeleted event. */
export interface ContainerRegistryChartDeletedEventData
  extends ContainerRegistryArtifactEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NewKubernetesVersionAvailable event */
export interface ContainerServiceNewKubernetesVersionAvailableEventData {
  /** The highest PATCH Kubernetes version for the highest MINOR version supported by ManagedCluster resource */
  latestSupportedKubernetesVersion?: string;
  /** The highest PATCH Kubernetes version for the MINOR version considered stable for the ManagedCluster resource */
  latestStableKubernetesVersion?: string;
  /** The highest PATCH Kubernetes version for the lowest applicable MINOR version available for the ManagedCluster resource */
  lowestMinorKubernetesVersion?: string;
  /** The highest PATCH Kubernetes version considered preview for the ManagedCluster resource. There might not be any version in preview at the time of publishing the event */
  latestPreviewKubernetesVersion?: string;
}

/** Schema of common properties of cluster support events */
export interface ContainerServiceClusterSupportEventData {
  /** The Kubernetes version of the ManagedCluster resource */
  kubernetesVersion?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.ClusterSupportEnded event */
export interface ContainerServiceClusterSupportEndedEventData
  extends ContainerServiceClusterSupportEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.ClusterSupportEnding event */
export interface ContainerServiceClusterSupportEndingEventData
  extends ContainerServiceClusterSupportEventData {}

/** Schema of common properties of node pool rolling events */
export interface ContainerServiceNodePoolRollingEventData {
  /** The name of the node pool in the ManagedCluster resource */
  nodePoolName?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingStarted event */
export interface ContainerServiceNodePoolRollingStartedEventData
  extends ContainerServiceNodePoolRollingEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingSucceeded event */
export interface ContainerServiceNodePoolRollingSucceededEventData
  extends ContainerServiceNodePoolRollingEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingFailed event */
export interface ContainerServiceNodePoolRollingFailedEventData
  extends ContainerServiceNodePoolRollingEventData {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.CopyStarted event. */
export interface DataBoxCopyStartedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber?: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

/** Schema of DataBox Stage Name enumeration. */
export type DataBoxStageName = "CopyStarted" | "CopyCompleted" | "OrderCompleted";

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.CopyCompleted event. */
export interface DataBoxCopyCompletedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber?: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.OrderCompleted event. */
export interface DataBoxOrderCompletedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber?: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.EventHub.CaptureFileCreated event. */
export interface EventHubCaptureFileCreatedEventData {
  /** The path to the capture file. */
  fileUrl?: string;
  /** The file type of the capture file. */
  fileType?: string;
  /** The shard ID. */
  partitionId?: string;
  /** The file size. */
  sizeInBytes?: number;
  /** The number of events in the file. */
  eventCount?: number;
  /** The smallest sequence number from the queue. */
  firstSequenceNumber?: number;
  /** The last sequence number from the queue. */
  lastSequenceNumber?: number;
  /** The first time from the queue. */
  firstEnqueueTime: Date;
  /** The last time from the queue. */
  lastEnqueueTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Geofence event (GeofenceEntered, GeofenceExited, GeofenceResult). */
export interface MapsGeofenceEvent {
  /** Lists of the geometry ID of the geofence which is expired relative to the user time in the request. */
  expiredGeofenceGeometryId?: string[];
  /** Lists the fence geometries that either fully contain the coordinate position or have an overlap with the searchBuffer around the fence. */
  geometries: MapsGeofenceGeometry[];
  /** Lists of the geometry ID of the geofence which is in invalid period relative to the user time in the request. */
  invalidPeriodGeofenceGeometryId?: string[];
  /** True if at least one event is published to the Azure Maps event subscriber, false if no event is published to the Azure Maps event subscriber. */
  isEventPublished?: boolean;
}

/** The geofence geometry. */
export interface MapsGeofenceGeometry {
  /** ID of the device. */
  deviceId?: string;
  /** Distance from the coordinate to the closest border of the geofence. Positive means the coordinate is outside of the geofence. If the coordinate is outside of the geofence, but more than the value of searchBuffer away from the closest geofence border, then the value is 999. Negative means the coordinate is inside of the geofence. If the coordinate is inside the polygon, but more than the value of searchBuffer away from the closest geofencing border,then the value is -999. A value of 999 means that there is great confidence the coordinate is well outside the geofence. A value of -999 means that there is great confidence the coordinate is well within the geofence. */
  distance?: number;
  /** The unique ID for the geofence geometry. */
  geometryId?: string;
  /** Latitude of the nearest point of the geometry. */
  nearestLat?: number;
  /** Longitude of the nearest point of the geometry. */
  nearestLon?: number;
  /** The unique id returned from user upload service when uploading a geofence. Will not be included in geofencing post API. */
  udId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceEntered event. */
export interface MapsGeofenceEnteredEventData extends MapsGeofenceEvent {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceExited event. */
export interface MapsGeofenceExitedEventData extends MapsGeofenceEvent {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceResult event. */
export interface MapsGeofenceResultEventData extends MapsGeofenceEvent {}

/** Schema of the Data property of an EventGridEvent for a device life cycle event (DeviceCreated, DeviceDeleted). */
export interface DeviceLifeCycleEvent {
  /** The unique identifier of the device. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  deviceId?: string;
  /** Name of the IoT Hub where the device was created or deleted. */
  hubName?: string;
  /** Information about the device twin, which is the cloud representation of application device metadata. */
  twin: DeviceTwinInfo;
}

/** Information about the device twin, which is the cloud representation of application device metadata. */
export interface DeviceTwinInfo {
  /** Authentication type used for this device: either SAS, SelfSigned, or CertificateAuthority. */
  authenticationType?: string;
  /** Count of cloud to device messages sent to this device. */
  cloudToDeviceMessageCount?: number;
  /** Whether the device is connected or disconnected. */
  connectionState?: string;
  /** The unique identifier of the device twin. */
  deviceId?: string;
  /** A piece of information that describes the content of the device twin. Each etag is guaranteed to be unique per device twin. */
  etag?: string;
  /** The ISO8601 timestamp of the last activity. */
  lastActivityTime?: string;
  /** Properties JSON element. */
  properties: DeviceTwinInfoProperties;
  /** Whether the device twin is enabled or disabled. */
  status?: string;
  /** The ISO8601 timestamp of the last device twin status update. */
  statusUpdateTime?: string;
  /** An integer that is incremented by one each time the device twin is updated. */
  version?: number;
  /** The thumbprint is a unique value for the x509 certificate, commonly used to find a particular certificate in a certificate store. The thumbprint is dynamically generated using the SHA1 algorithm, and does not physically exist in the certificate. */
  x509Thumbprint: DeviceTwinInfoX509Thumbprint;
}

/** Properties JSON element. */
export interface DeviceTwinInfoProperties {
  /** A portion of the properties that can be written only by the application back-end, and read by the device. */
  desired: DeviceTwin;
  /** A portion of the properties that can be written only by the device, and read by the application back-end. */
  reported: DeviceTwin;
}

/** A portion of the properties that can be written only by the application back-end, and read by the device. */
export interface DeviceTwin {
  /** Metadata information for the properties JSON document. */
  metadata: DeviceTwinMetadata;
  /** Version of device twin properties. */
  version?: number;
}

/** Metadata information for the properties JSON document. */
export interface DeviceTwinMetadata {
  /** The ISO8601 timestamp of the last time the properties were updated. */
  lastUpdated?: string;
}

/** The thumbprint is a unique value for the x509 certificate, commonly used to find a particular certificate in a certificate store. The thumbprint is dynamically generated using the SHA1 algorithm, and does not physically exist in the certificate. */
export interface DeviceTwinInfoX509Thumbprint {
  /** Primary thumbprint for the x509 certificate. */
  primaryThumbprint?: string;
  /** Secondary thumbprint for the x509 certificate. */
  secondaryThumbprint?: string;
}

/** Schema of the Data property of an EventGridEvent for a device connection state event (DeviceConnected, DeviceDisconnected). */
export interface DeviceConnectionStateEvent {
  /** The unique identifier of the device. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  deviceId?: string;
  /** The unique identifier of the module. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  moduleId?: string;
  /** Name of the IoT Hub where the device was created or deleted. */
  hubName?: string;
  /** Information about the device connection state event. */
  deviceConnectionStateEventInfo: DeviceConnectionStateEventInfo;
}

/** Information about the device connection state event. */
export interface DeviceConnectionStateEventInfo {
  /** Sequence number is string representation of a hexadecimal number. string compare can be used to identify the larger number because both in ASCII and HEX numbers come after alphabets. If you are converting the string to hex, then the number is a 256 bit number. */
  sequenceNumber?: string;
}

/** Schema of the Data property of an EventGridEvent for a device telemetry event (DeviceTelemetry). */
export interface DeviceTelemetryEvent {
  /** The content of the message from the device. */
  body: Record<string, any>;
  /** Application properties are user-defined strings that can be added to the message. These fields are optional. */
  properties: Record<string, string>;
  /** System properties help identify contents and source of the messages. */
  systemProperties: Record<string, string>;
}

/** Event data for Microsoft.Devices.DeviceCreated event. */
export interface IotHubDeviceCreatedEventData extends DeviceLifeCycleEvent {}

/** Event data for Microsoft.Devices.DeviceDeleted event. */
export interface IotHubDeviceDeletedEventData extends DeviceLifeCycleEvent {}

/** Event data for Microsoft.Devices.DeviceConnected event. */
export interface IotHubDeviceConnectedEventData extends DeviceConnectionStateEvent {}

/** Event data for Microsoft.Devices.DeviceDisconnected event. */
export interface IotHubDeviceDisconnectedEventData extends DeviceConnectionStateEvent {}

/** Event data for Microsoft.Devices.DeviceTelemetry event. */
export interface IotHubDeviceTelemetryEventData extends DeviceTelemetryEvent {}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceCreated event. */
export interface HealthcareFhirResourceCreatedEventData {
  /** Type of HL7 FHIR resource. */
  resourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  resourceFhirAccount?: string;
  /** Id of HL7 FHIR resource. */
  resourceFhirId?: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  resourceVersionId?: number;
}

/** Schema of FHIR resource type enumeration. */
export type HealthcareFhirResourceType =
  | "Account"
  | "ActivityDefinition"
  | "AdverseEvent"
  | "AllergyIntolerance"
  | "Appointment"
  | "AppointmentResponse"
  | "AuditEvent"
  | "Basic"
  | "Binary"
  | "BiologicallyDerivedProduct"
  | "BodySite"
  | "BodyStructure"
  | "Bundle"
  | "CapabilityStatement"
  | "CarePlan"
  | "CareTeam"
  | "CatalogEntry"
  | "ChargeItem"
  | "ChargeItemDefinition"
  | "Claim"
  | "ClaimResponse"
  | "ClinicalImpression"
  | "CodeSystem"
  | "Communication"
  | "CommunicationRequest"
  | "CompartmentDefinition"
  | "Composition"
  | "ConceptMap"
  | "Condition"
  | "Consent"
  | "Contract"
  | "Coverage"
  | "CoverageEligibilityRequest"
  | "CoverageEligibilityResponse"
  | "DataElement"
  | "DetectedIssue"
  | "Device"
  | "DeviceComponent"
  | "DeviceDefinition"
  | "DeviceMetric"
  | "DeviceRequest"
  | "DeviceUseStatement"
  | "DiagnosticReport"
  | "DocumentManifest"
  | "DocumentReference"
  | "DomainResource"
  | "EffectEvidenceSynthesis"
  | "EligibilityRequest"
  | "EligibilityResponse"
  | "Encounter"
  | "Endpoint"
  | "EnrollmentRequest"
  | "EnrollmentResponse"
  | "EpisodeOfCare"
  | "EventDefinition"
  | "Evidence"
  | "EvidenceVariable"
  | "ExampleScenario"
  | "ExpansionProfile"
  | "ExplanationOfBenefit"
  | "FamilyMemberHistory"
  | "Flag"
  | "Goal"
  | "GraphDefinition"
  | "Group"
  | "GuidanceResponse"
  | "HealthcareService"
  | "ImagingManifest"
  | "ImagingStudy"
  | "Immunization"
  | "ImmunizationEvaluation"
  | "ImmunizationRecommendation"
  | "ImplementationGuide"
  | "InsurancePlan"
  | "Invoice"
  | "Library"
  | "Linkage"
  | "List"
  | "Location"
  | "Measure"
  | "MeasureReport"
  | "Media"
  | "Medication"
  | "MedicationAdministration"
  | "MedicationDispense"
  | "MedicationKnowledge"
  | "MedicationRequest"
  | "MedicationStatement"
  | "MedicinalProduct"
  | "MedicinalProductAuthorization"
  | "MedicinalProductContraindication"
  | "MedicinalProductIndication"
  | "MedicinalProductIngredient"
  | "MedicinalProductInteraction"
  | "MedicinalProductManufactured"
  | "MedicinalProductPackaged"
  | "MedicinalProductPharmaceutical"
  | "MedicinalProductUndesirableEffect"
  | "MessageDefinition"
  | "MessageHeader"
  | "MolecularSequence"
  | "NamingSystem"
  | "NutritionOrder"
  | "Observation"
  | "ObservationDefinition"
  | "OperationDefinition"
  | "OperationOutcome"
  | "Organization"
  | "OrganizationAffiliation"
  | "Parameters"
  | "Patient"
  | "PaymentNotice"
  | "PaymentReconciliation"
  | "Person"
  | "PlanDefinition"
  | "Practitioner"
  | "PractitionerRole"
  | "Procedure"
  | "ProcedureRequest"
  | "ProcessRequest"
  | "ProcessResponse"
  | "Provenance"
  | "Questionnaire"
  | "QuestionnaireResponse"
  | "ReferralRequest"
  | "RelatedPerson"
  | "RequestGroup"
  | "ResearchDefinition"
  | "ResearchElementDefinition"
  | "ResearchStudy"
  | "ResearchSubject"
  | "Resource"
  | "RiskAssessment"
  | "RiskEvidenceSynthesis"
  | "Schedule"
  | "SearchParameter"
  | "Sequence"
  | "ServiceDefinition"
  | "ServiceRequest"
  | "Slot"
  | "Specimen"
  | "SpecimenDefinition"
  | "StructureDefinition"
  | "StructureMap"
  | "Subscription"
  | "Substance"
  | "SubstanceNucleicAcid"
  | "SubstancePolymer"
  | "SubstanceProtein"
  | "SubstanceReferenceInformation"
  | "SubstanceSourceMaterial"
  | "SubstanceSpecification"
  | "SupplyDelivery"
  | "SupplyRequest"
  | "Task"
  | "TerminologyCapabilities"
  | "TestReport"
  | "TestScript"
  | "ValueSet"
  | "VerificationResult"
  | "VisionPrescription";

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceUpdated event. */
export interface HealthcareFhirResourceUpdatedEventData {
  /** Type of HL7 FHIR resource. */
  resourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  resourceFhirAccount?: string;
  /** Id of HL7 FHIR resource. */
  resourceFhirId?: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  resourceVersionId?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceDeleted event. */
export interface HealthcareFhirResourceDeletedEventData {
  /** Type of HL7 FHIR resource. */
  resourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  resourceFhirAccount?: string;
  /** Id of HL7 FHIR resource. */
  resourceFhirId?: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  resourceVersionId?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageCreated event. */
export interface HealthcareDicomImageCreatedEventData {
  /** Data partition name */
  partitionName?: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid?: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid?: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid?: string;
  /** Domain name of the DICOM account for this image. */
  serviceHostName?: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation and deletion within the service. */
  sequenceNumber?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageDeleted event. */
export interface HealthcareDicomImageDeletedEventData {
  /** Data partition name */
  partitionName?: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid?: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid?: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid?: string;
  /** Host name of the DICOM account for this image. */
  serviceHostName?: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation and deletion within the service. */
  sequenceNumber?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageUpdated event. */
export interface HealthcareDicomImageUpdatedEventData {
  /** Data partition name */
  partitionName?: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid?: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid?: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid?: string;
  /** Domain name of the DICOM account for this image. */
  serviceHostName?: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation, updation and deletion within the service. */
  sequenceNumber?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNewVersionCreated event. */
export interface KeyVaultCertificateNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNearExpiry event. */
export interface KeyVaultCertificateNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateExpired event. */
export interface KeyVaultCertificateExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNewVersionCreated event. */
export interface KeyVaultKeyNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNearExpiry event. */
export interface KeyVaultKeyNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyExpired event. */
export interface KeyVaultKeyExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNewVersionCreated event. */
export interface KeyVaultSecretNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNearExpiry event. */
export interface KeyVaultSecretNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretExpired event. */
export interface KeyVaultSecretExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.VaultAccessPolicyChanged event. */
export interface KeyVaultAccessPolicyChangedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nBF?: number;
  /** The expiration date of the object that triggered this event */
  eXP?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.ModelRegistered event. */
export interface MachineLearningServicesModelRegisteredEventData {
  /** The name of the model that was registered. */
  modelName?: string;
  /** The version of the model that was registered. */
  modelVersion?: string;
  /** The tags of the model that was registered. */
  modelTags: Record<string, any>;
  /** The properties of the model that was registered. */
  modelProperties: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.ModelDeployed event. */
export interface MachineLearningServicesModelDeployedEventData {
  /** The name of the deployed service. */
  serviceName?: string;
  /** The compute type (e.g. ACI, AKS) of the deployed service. */
  serviceComputeType?: string;
  /** A common separated list of model IDs. The IDs of the models deployed in the service. */
  modelIds?: string;
  /** The tags of the deployed service. */
  serviceTags: Record<string, any>;
  /** The properties of the deployed service. */
  serviceProperties: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.RunCompleted event. */
export interface MachineLearningServicesRunCompletedEventData {
  /** The ID of the experiment that the run belongs to. */
  experimentId?: string;
  /** The name of the experiment that the run belongs to. */
  experimentName?: string;
  /** The ID of the Run that was completed. */
  runId?: string;
  /** The Run Type of the completed Run. */
  runType?: string;
  /** The tags of the completed Run. */
  runTags: Record<string, any>;
  /** The properties of the completed Run. */
  runProperties: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.DatasetDriftDetected event. */
export interface MachineLearningServicesDatasetDriftDetectedEventData {
  /** The ID of the data drift monitor that triggered the event. */
  dataDriftId?: string;
  /** The name of the data drift monitor that triggered the event. */
  dataDriftName?: string;
  /** The ID of the Run that detected data drift. */
  runId?: string;
  /** The ID of the base Dataset used to detect drift. */
  baseDatasetId?: string;
  /** The ID of the target Dataset used to detect drift. */
  targetDatasetId?: string;
  /** The coefficient result that triggered the event. */
  driftCoefficient?: number;
  /** The start time of the target dataset time series that resulted in drift detection. */
  startTime: Date;
  /** The end time of the target dataset time series that resulted in drift detection. */
  endTime: Date;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.RunStatusChanged event. */
export interface MachineLearningServicesRunStatusChangedEventData {
  /** The ID of the experiment that the Machine Learning Run belongs to. */
  experimentId?: string;
  /** The name of the experiment that the Machine Learning Run belongs to. */
  experimentName?: string;
  /** The ID of the Machine Learning Run. */
  runId?: string;
  /** The Run Type of the Machine Learning Run. */
  runType?: string;
  /** The tags of the Machine Learning Run. */
  runTags: Record<string, any>;
  /** The properties of the Machine Learning Run. */
  runProperties: Record<string, any>;
  /** The status of the Machine Learning Run. */
  runStatus?: string;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 *   Microsoft.Media.JobStateChange event.
 */
export interface MediaJobStateChangeEventData {
  /** The previous state of the Job. */
  previousState: MediaJobState;
  /** The new state of the Job. */
  state: MediaJobState;
  /** Gets the Job correlation data. */
  correlationData: Record<string, string>;
}

/** State of a Media Job. */
export type MediaJobState =
  | "Canceled"
  | "Canceling"
  | "Error"
  | "Finished"
  | "Processing"
  | "Queued"
  | "Scheduled";

/** Details of JobOutput errors. */
export interface MediaJobError {
  /** Error code describing the error. */
  code: MediaJobErrorCode;
  /** A human-readable language-dependent representation of the error. */
  message?: string;
  /** Helps with categorization of errors. */
  category: MediaJobErrorCategory;
  /** Indicates that it may be possible to retry the Job. If retry is unsuccessful, please contact Azure support via Azure Portal. */
  retry: MediaJobRetry;
  /** An array of details about specific errors that led to this reported error. */
  details: MediaJobErrorDetail[];
}

/** Media Job Error Codes. */
export type MediaJobErrorCode =
  | "ServiceError"
  | "ServiceTransientError"
  | "DownloadNotAccessible"
  | "DownloadTransientError"
  | "UploadNotAccessible"
  | "UploadTransientError"
  | "ConfigurationUnsupported"
  | "ContentMalformed"
  | "ContentUnsupported"
  | "IdentityUnsupported";
/** Error categories for Media Job Errors. */
export type MediaJobErrorCategory =
  | "Service"
  | "Download"
  | "Upload"
  | "Configuration"
  | "Content"
  | "Account";
/** Media Job Retry Options. */
export type MediaJobRetry = "DoNotRetry" | "MayRetry";

/** Details of JobOutput errors. */
export interface MediaJobErrorDetail {
  /** Code describing the error detail. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
}

/** The event data for a Job output. */
export interface MediaJobOutput {
  /** the discriminator possible values: #Microsoft.Media.JobOutputAsset */
  "@odata.type": string;
  /** Gets the Job output error. */
  error: MediaJobError;
  /** Gets the Job output label. */
  label?: string;
  /** Gets the Job output progress. */
  progress: number;
  /** Gets the Job output state. */
  state: MediaJobState;
}

/** The event data for a Job output asset. */
export interface MediaJobOutputAsset extends MediaJobOutput {
  /** Gets the Job output asset name. */
  assetName?: string;
  /** The discriminator for derived types. */
  "@odata.type": "#Microsoft.Media.JobOutputAsset";
}

/**
 * Job Output Progress Event Data. Schema of the Data property of an
 *   EventGridEvent for a Microsoft.Media.JobOutputProgress event.
 */
export interface MediaJobOutputProgressEventData {
  /** Gets the Job output label. */
  label?: string;
  /** Gets the Job output progress. */
  progress?: number;
  /** Gets the Job correlation data. */
  jobCorrelationData: Record<string, string>;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 *   Microsoft.Media.JobOutputStateChange event.
 */
export interface MediaJobOutputStateChangeEventData {
  /** The previous state of the Job. */
  previousState: MediaJobState;
  /** Gets the output. */
  output: MediaJobOutputUnion;
  /** Gets the Job correlation data. */
  jobCorrelationData: Record<string, string>;
}

/**
 * Job scheduled event data. Schema of the data property of an EventGridEvent for
 * a Microsoft.Media.JobScheduled event.
 */
export interface MediaJobScheduledEventData extends MediaJobStateChangeEventData {}

/**
 * Job processing event data. Schema of the data property of an EventGridEvent for
 * a Microsoft.Media.JobProcessing event.
 */
export interface MediaJobProcessingEventData extends MediaJobStateChangeEventData {}

/**
 * Job canceling event data. Schema of the data property of an EventGridEvent for
 * a Microsoft.Media.JobCanceling event.
 */
export interface MediaJobCancelingEventData extends MediaJobStateChangeEventData {}

/**
 * Job finished event data. Schema of the data property of an EventGridEvent for a
 * Microsoft.Media.JobFinished event.
 */
export interface MediaJobFinishedEventData extends MediaJobStateChangeEventData {
  /** Gets the Job outputs. */
  outputs: MediaJobOutputUnion[];
}

/**
 * Job canceled event data. Schema of the data property of an EventGridEvent for a
 * Microsoft.Media.JobCanceled event.
 */
export interface MediaJobCanceledEventData extends MediaJobStateChangeEventData {
  /** Gets the Job outputs. */
  outputs: MediaJobOutputUnion[];
}

/**
 * Job error state event data. Schema of the data property of an EventGridEvent
 * for a Microsoft.Media.JobErrored event.
 */
export interface MediaJobErroredEventData extends MediaJobStateChangeEventData {
  /** Gets the Job outputs. */
  outputs: MediaJobOutputUnion[];
}

/**
 * Job output canceled event data. Schema of the data property of an
 * EventGridEvent for a Microsoft.Media.JobOutputCanceled event.
 */
export interface MediaJobOutputCanceledEventData extends MediaJobOutputStateChangeEventData {}

/**
 * Job output canceling event data. Schema of the data property of an
 * EventGridEvent for a Microsoft.Media.JobOutputCanceling event.
 */
export interface MediaJobOutputCancelingEventData extends MediaJobOutputStateChangeEventData {}

/**
 * Job output error event data. Schema of the data property of an EventGridEvent
 * for a Microsoft.Media.JobOutputErrored event.
 */
export interface MediaJobOutputErroredEventData extends MediaJobOutputStateChangeEventData {}

/**
 * Job output finished event data. Schema of the data property of an
 * EventGridEvent for a Microsoft.Media.JobOutputFinished event.
 */
export interface MediaJobOutputFinishedEventData extends MediaJobOutputStateChangeEventData {}

/**
 * Job output processing event data. Schema of the data property of an
 * EventGridEvent for a Microsoft.Media.JobOutputProcessing event.
 */
export interface MediaJobOutputProcessingEventData extends MediaJobOutputStateChangeEventData {}

/**
 * Job output scheduled event data. Schema of the data property of an
 * EventGridEvent for a Microsoft.Media.JobOutputScheduled event.
 */
export interface MediaJobOutputScheduledEventData extends MediaJobOutputStateChangeEventData {}

/** Encoder connect event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventEncoderConnected event. */
export interface MediaLiveEventEncoderConnectedEventData {
  /** Gets the ingest URL provided by the live event. */
  ingestUrl?: string;
  /** Gets the stream Id. */
  streamId?: string;
  /** Gets the remote IP. */
  encoderIp?: string;
  /** Gets the remote port. */
  encoderPort?: string;
}

/** Encoder connection rejected event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventConnectionRejected event. */
export interface MediaLiveEventConnectionRejectedEventData {
  /** Gets the ingest URL provided by the live event. */
  ingestUrl?: string;
  /** Gets the stream Id. */
  streamId?: string;
  /** Gets the remote IP. */
  encoderIp?: string;
  /** Gets the remote port. */
  encoderPort?: string;
  /** Gets the result code. */
  resultCode?: string;
}

/** Encoder disconnected event data. Schema of the Data property of an EventGridEvent for a Microsoft.Media.LiveEventEncoderDisconnected event. */
export interface MediaLiveEventEncoderDisconnectedEventData {
  /** Gets the ingest URL provided by the live event. */
  ingestUrl?: string;
  /** Gets the stream Id. */
  streamId?: string;
  /** Gets the remote IP. */
  encoderIp?: string;
  /** Gets the remote port. */
  encoderPort?: string;
  /** Gets the result code. */
  resultCode?: string;
}

/** Encoder connect event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventIncomingStreamReceived event. */
export interface MediaLiveEventIncomingStreamReceivedEventData {
  /** Gets the ingest URL provided by the live event. */
  ingestUrl?: string;
  /** Gets the type of the track (Audio / Video). */
  trackType?: string;
  /** Gets the track name. */
  trackName?: string;
  /** Gets the bitrate of the track. */
  bitrate?: number;
  /** Gets the remote IP. */
  encoderIp?: string;
  /** Gets the remote port. */
  encoderPort?: string;
  /** Gets the first timestamp of the data chunk received. */
  timestamp?: string;
  /** Gets the duration of the first data chunk. */
  duration?: string;
  /** Gets the timescale in which timestamp is represented. */
  timescale?: string;
}

/** Incoming streams out of sync event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventIncomingStreamsOutOfSync event. */
export interface MediaLiveEventIncomingStreamsOutOfSyncEventData {
  /** Gets the minimum last timestamp received. */
  minLastTimestamp?: string;
  /** Gets the type of stream with minimum last timestamp. */
  typeOfStreamWithMinLastTimestamp?: string;
  /** Gets the maximum timestamp among all the tracks (audio or video). */
  maxLastTimestamp?: string;
  /** Gets the type of stream with maximum last timestamp. */
  typeOfStreamWithMaxLastTimestamp?: string;
  /** Gets the timescale in which \"MinLastTimestamp\" is represented. */
  timescaleOfMinLastTimestamp?: string;
  /** Gets the timescale in which \"MaxLastTimestamp\" is represented. */
  timescaleOfMaxLastTimestamp?: string;
}

/** Incoming video stream out of sync event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventIncomingVideoStreamsOutOfSync event. */
export interface MediaLiveEventIncomingVideoStreamsOutOfSyncEventData {
  /** Gets the first timestamp received for one of the quality levels. */
  firstTimestamp?: string;
  /** Gets the duration of the data chunk with first timestamp. */
  firstDuration?: string;
  /** Gets the timestamp received for some other quality levels. */
  secondTimestamp?: string;
  /** Gets the duration of the data chunk with second timestamp. */
  secondDuration?: string;
  /** Gets the timescale in which both the timestamps and durations are represented. */
  timescale?: string;
}

/** Ingest fragment dropped event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventIncomingDataChunkDropped event. */
export interface MediaLiveEventIncomingDataChunkDroppedEventData {
  /** Gets the timestamp of the data chunk dropped. */
  timestamp?: string;
  /** Gets the type of the track (Audio / Video). */
  trackType?: string;
  /** Gets the bitrate of the track. */
  bitrate?: number;
  /** Gets the timescale of the Timestamp. */
  timescale?: string;
  /** Gets the result code for fragment drop operation. */
  resultCode?: string;
  /** Gets the name of the track for which fragment is dropped. */
  trackName?: string;
}

/** Ingest heartbeat event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventIngestHeartbeat event. */
export interface MediaLiveEventIngestHeartbeatEventData {
  /** Gets the type of the track (Audio / Video). */
  trackType?: string;
  /** Gets the track name. */
  trackName?: string;
  /** Gets the Live Transcription language. */
  transcriptionLanguage?: string;
  /** Gets the Live Transcription state. */
  transcriptionState?: string;
  /** Gets the bitrate of the track. */
  bitrate?: number;
  /** Gets the incoming bitrate. */
  incomingBitrate?: number;
  /** Gets the track ingest drift value. */
  ingestDriftValue?: string;
  /** Gets the arrival UTC time of the last fragment. */
  lastFragmentArrivalTime?: string;
  /** Gets the last timestamp. */
  lastTimestamp?: string;
  /** Gets the timescale of the last timestamp. */
  timescale?: string;
  /** Gets the fragment Overlap count. */
  overlapCount?: number;
  /** Gets the fragment Discontinuity count. */
  discontinuityCount?: number;
  /** Gets Non increasing count. */
  nonincreasingCount?: number;
  /** Gets a value indicating whether unexpected bitrate is present or not. */
  unexpectedBitrate?: boolean;
  /** Gets the state of the live event. */
  state?: string;
  /** Gets a value indicating whether preview is healthy or not. */
  healthy?: boolean;
}

/** Ingest track discontinuity detected event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventTrackDiscontinuityDetected event. */
export interface MediaLiveEventTrackDiscontinuityDetectedEventData {
  /** Gets the type of the track (Audio / Video). */
  trackType?: string;
  /** Gets the track name. */
  trackName?: string;
  /** Gets the bitrate. */
  bitrate?: number;
  /** Gets the timestamp of the previous fragment. */
  previousTimestamp?: string;
  /** Gets the timestamp of the current fragment. */
  newTimestamp?: string;
  /** Gets the timescale in which both timestamps and discontinuity gap are represented. */
  timescale?: string;
  /** Gets the discontinuity gap between PreviousTimestamp and NewTimestamp. */
  discontinuityGap?: string;
}

/** Channel Archive heartbeat event data. Schema of the data property of an EventGridEvent for a Microsoft.Media.LiveEventChannelArchiveHeartbeat event. */
export interface MediaLiveEventChannelArchiveHeartbeatEventData {
  /** Gets the channel latency in ms. */
  channelLatencyMs: string;
  /** Gets the latency result code. */
  latencyResultCode: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateCreated event. */
export interface PolicyInsightsPolicyStateCreatedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId?: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId?: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId?: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateChanged event. */
export interface PolicyInsightsPolicyStateChangedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId?: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId?: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId?: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateDeleted event. */
export interface PolicyInsightsPolicyStateDeletedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId?: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId?: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId?: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.PatchingCompleted event. */
export interface RedisPatchingCompletedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ScalingCompleted event. */
export interface RedisScalingCompletedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ExportRDBCompleted event. */
export interface RedisExportRDBCompletedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ImportRDBCompleted event. */
export interface RedisImportRDBCompletedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteSuccess event. This is raised when a resource create or update operation succeeds. */
export interface ResourceWriteSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** The details of the authorization for the resource. */
export interface ResourceAuthorization {
  /** The scope of the authorization. */
  scope?: string;
  /** The action being requested. */
  action?: string;
  /** The evidence for the authorization. */
  evidence: Record<string, string>;
}

/** The details of the HTTP request. */
export interface ResourceHttpRequest {
  /** The client request ID. */
  clientRequestId?: string;
  /** The client IP address. */
  clientIpAddress?: string;
  /** The request method. */
  method?: string;
  /** The url used in the request. */
  url?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteFailure event. This is raised when a resource create or update operation fails. */
export interface ResourceWriteFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteCancel event. This is raised when a resource create or update operation is canceled. */
export interface ResourceWriteCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteSuccess event. This is raised when a resource delete operation succeeds. */
export interface ResourceDeleteSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteFailure event. This is raised when a resource delete operation fails. */
export interface ResourceDeleteFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteCancel event. This is raised when a resource delete operation is canceled. */
export interface ResourceDeleteCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionSuccess event. This is raised when a resource action operation succeeds. */
export interface ResourceActionSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionFailure event. This is raised when a resource action operation fails. */
export interface ResourceActionFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionCancel event. This is raised when a resource action operation is canceled. */
export interface ResourceActionCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUri?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners event. */
export interface ServiceBusActiveMessagesAvailableWithNoListenersEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName?: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri?: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType?: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName?: string;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName?: string;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListeners event. */
export interface ServiceBusDeadletterMessagesAvailableWithNoListenersEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName?: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri?: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType?: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName?: string;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName?: string;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.ActiveMessagesAvailablePeriodicNotifications event. */
export interface ServiceBusActiveMessagesAvailablePeriodicNotificationsEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName?: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri?: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType?: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName?: string;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName?: string;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.DeadletterMessagesAvailablePeriodicNotifications event. */
export interface ServiceBusDeadletterMessagesAvailablePeriodicNotificationsEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName?: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri?: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType?: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName?: string;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName?: string;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.SignalRService.ClientConnectionConnected event. */
export interface SignalRServiceClientConnectionConnectedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The hub of connected client connection. */
  hubName?: string;
  /** The connection Id of connected client connection. */
  connectionId?: string;
  /** The user Id of connected client connection. */
  userId?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.SignalRService.ClientConnectionDisconnected event. */
export interface SignalRServiceClientConnectionDisconnectedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The hub of connected client connection. */
  hubName?: string;
  /** The connection Id of connected client connection. */
  connectionId?: string;
  /** The user Id of connected client connection. */
  userId?: string;
  /** The message of error that cause the client connection disconnected. */
  errorMessage?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobCreated event. */
export interface StorageBlobCreatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The etag of the blob at the time this event was triggered. */
  eTag?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The offset of the blob in bytes. */
  contentOffset?: number;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobDeleted event. */
export interface StorageBlobDeletedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryCreated event. */
export interface StorageDirectoryCreatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The etag of the directory at the time this event was triggered. */
  eTag?: string;
  /** The path to the directory. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryDeleted event. */
export interface StorageDirectoryDeletedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the deleted directory. */
  url?: string;
  /** Is this event for a recursive delete operation. */
  recursive?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobRenamed event. */
export interface StorageBlobRenamedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the blob that was renamed. */
  sourceUrl?: string;
  /** The new path to the blob after the rename operation. */
  destinationUrl?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryRenamed event. */
export interface StorageDirectoryRenamedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the directory that was renamed. */
  sourceUrl?: string;
  /** The new path to the directory after the rename operation. */
  destinationUrl?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.LifecyclePolicyCompleted event. */
export interface StorageLifecyclePolicyCompletedEventData {
  /** The time the policy task was scheduled. */
  scheduleTime?: string;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  deleteSummary: StorageLifecyclePolicyActionSummaryDetail;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  tierToCoolSummary: StorageLifecyclePolicyActionSummaryDetail;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  tierToArchiveSummary: StorageLifecyclePolicyActionSummaryDetail;
}

/** Execution statistics of a specific policy action in a Blob Management cycle. */
export interface StorageLifecyclePolicyActionSummaryDetail {
  /** Total number of objects to be acted on by this action. */
  totalObjectsCount?: number;
  /** Number of success operations of this action. */
  successCount?: number;
  /** Error messages of this action if any. */
  errorList?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobTierChanged event. */
export interface StorageBlobTierChangedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.AsyncOperationInitiated event. */
export interface StorageAsyncOperationInitiatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.BlobInventoryPolicyCompleted event. */
export interface StorageBlobInventoryPolicyCompletedEventData {
  /** The time at which inventory policy was scheduled. */
  scheduleDateTime: Date;
  /** The account name for which inventory policy is registered. */
  accountName?: string;
  /** The rule name for inventory policy. */
  ruleName?: string;
  /** The status of inventory run, it can be Succeeded/PartiallySucceeded/Failed. */
  policyRunStatus?: string;
  /** The status message for inventory run. */
  policyRunStatusMessage?: string;
  /** The policy run id for inventory run. */
  policyRunId?: string;
  /** The blob URL for manifest file for inventory run. */
  manifestBlobUrl?: string;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskCompleted event. */
export interface StorageTaskCompletedEventData {
  /** The status for a storage task. */
  status: StorageTaskCompletedStatus;
  /** The time at which a storage task was completed. */
  completedDateTime: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
  /** The task name for a storage task. */
  taskName?: string;
  /** The summary report blob url for a storage task */
  summaryReportBlobUrl: string;
}

/** The status for a storage task. */
export type StorageTaskCompletedStatus = "Succeeded" | "Failed";

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskQueued event. */
export interface StorageTaskQueuedEventData {
  /** The time at which a storage task was queued. */
  queuedDateTime: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskAssignmentQueued event. */
export interface StorageTaskAssignmentQueuedEventData {
  /** The time at which a storage task was queued. */
  queuedOn: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskAssignmentCompleted event. */
export interface StorageTaskAssignmentCompletedEventData {
  /** The status for a storage task. */
  status: StorageTaskAssignmentCompletedStatus;
  /** The time at which a storage task was completed. */
  completedOn: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
  /** The task name for a storage task. */
  taskName?: string;
  /** The summary report blob url for a storage task */
  summaryReportBlobUri: string;
}

/** The status for a storage task. */
export type StorageTaskAssignmentCompletedStatus = "Succeeded" | "Failed";

/** Detail of action on the app. */
export interface AppEventTypeDetail {
  /** Type of action of the operation. */
  action: AppAction;
}

/** Type of action of the operation */
export type AppAction =
  | "Restarted"
  | "Stopped"
  | "ChangedAppSettings"
  | "Started"
  | "Completed"
  | "Failed";

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.AppUpdated event. */
export interface WebAppUpdatedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationStarted event. */
export interface WebBackupOperationStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationCompleted event. */
export interface WebBackupOperationCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationFailed event. */
export interface WebBackupOperationFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationStarted event. */
export interface WebRestoreOperationStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationCompleted event. */
export interface WebRestoreOperationCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationFailed event. */
export interface WebRestoreOperationFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapStarted event. */
export interface WebSlotSwapStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapCompleted event. */
export interface WebSlotSwapCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapFailed event. */
export interface WebSlotSwapFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapWithPreviewStarted event. */
export interface WebSlotSwapWithPreviewStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapWithPreviewCancelled event. */
export interface WebSlotSwapWithPreviewCancelledEventData {
  /** Detail of action on the app. */
  appEventTypeDetail: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.AppServicePlanUpdated event. */
export interface WebAppServicePlanUpdatedEventData {
  /** Detail of action on the app service plan. */
  appServicePlanEventTypeDetail: AppServicePlanEventTypeDetail;
  /** sku of app service plan. */
  sku: WebAppServicePlanUpdatedEventDataSku;
  /** name of the app service plan that had this event. */
  name?: string;
  /** The client request id generated by the app service for the app service plan API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the app service plan API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the app service plan API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

/** Detail of action on the app service plan. */
export interface AppServicePlanEventTypeDetail {
  /** Kind of environment where app service plan is. */
  stampKind: StampKind;
  /** Type of action on the app service plan. */
  action: AppServicePlanAction;
  /** Asynchronous operation status of the operation on the app service plan. */
  status: AsyncStatus;
}

/** Kind of environment where app service plan is. */
export type StampKind = "Public" | "AseV1" | "AseV2";
/** Type of action on the app service plan. */
export type AppServicePlanAction = "Updated";
/** Asynchronous operation status of the operation on the app service plan. */
export type AsyncStatus = "Started" | "Completed" | "Failed";

/** sku of app service plan. */
export interface WebAppServicePlanUpdatedEventDataSku {
  /** name of app service plan sku. */
  name?: string;
  /** tier of app service plan sku. */
  tier?: string;
  /** size of app service plan sku. */
  size?: string;
  /** family of app service plan sku. */
  family?: string;
  /** capacity of app service plan sku. */
  capacity?: string;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.EventGrid.SubscriptionValidationEvent event. */
export interface SubscriptionValidationEventData {
  /**
   * The validation code sent by Azure Event Grid to validate an event subscription.
   * To complete the validation handshake, the subscriber must either respond with this validation code as part of the validation response,
   * or perform a GET request on the validationUrl (available starting version 2018-05-01-preview).
   */
  validationCode?: string;
  /**
   * The validation URL sent by Azure Event Grid (available starting version 2018-05-01-preview).
   * To complete the validation handshake, the subscriber must either respond with the validationCode as part of the validation response,
   * or perform a GET request on the validationUrl (available starting version 2018-05-01-preview).
   */
  validationUrl?: string;
}

/**
 * To complete an event subscription validation handshake, a subscriber can use
 * either the validationCode or the validationUrl received in a
 * SubscriptionValidationEvent. When the validationCode is used, the
 * SubscriptionValidationResponse can be used to build the response.
 */
export interface SubscriptionValidationResponse {
  /** The validation response sent by the subscriber to Azure Event Grid to complete the validation of an event subscription. */
  validationResponse?: string;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.EventGrid.SubscriptionDeletedEvent event.
 */
export interface SubscriptionDeletedEventData {
  /** The Azure resource ID of the deleted event subscription. */
  eventSubscriptionId?: string;
}

/** Schema of the Data property of an EventGridEvent for MQTT Client state changes. */
export interface EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client that the client presents to the service
   * for authentication. This case-sensitive string can be up to 128 characters
   * long, and supports UTF-8 characters.
   */
  clientAuthenticationName?: string;
  /** Name of the client resource in the Event Grid namespace. */
  clientName?: string;
  /** Name of the Event Grid namespace where the MQTT client was created or updated. */
  namespaceName?: string;
}

/** Event data for Microsoft.EventGrid.MQTTClientCreatedOrUpdated event. */
export interface EventGridMqttClientCreatedOrUpdatedEventData extends EventGridMqttClientEventData {
  /** Configured state of the client. The value could be Enabled or Disabled */
  state: EventGridMqttClientState;
  /** Time the client resource is created based on the provider's UTC time. */
  createdOn: Date;
  /**
   * Time the client resource is last updated based on the provider's UTC time. If
   * the client resource was never updated, this value is identical to the value of
   * the 'createdOn' property.
   */
  updatedOn: Date;
  /** The key-value attributes that are assigned to the client resource. */
  attributes: Record<string, string>;
}

/** EventGrid MQTT Client State */
export type EventGridMqttClientState = "Enabled" | "Disabled";

/** Event data for Microsoft.EventGrid.MQTTClientDeleted event. */
export interface EventGridMqttClientDeletedEventData extends EventGridMqttClientEventData {}

/** Event data for Microsoft.EventGrid.MQTTClientSessionConnected event. */
export interface EventGridMqttClientSessionConnectedEventData extends EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client's session. This case-sensitive string can
   * be up to 128 characters long, and supports UTF-8 characters.
   */
  clientSessionName?: string;
  /**
   * A number that helps indicate order of MQTT client session connected or
   * disconnected events. Latest event will have a sequence number that is higher
   * than the previous event.
   */
  sequenceNumber?: number;
}

/** Event data for Microsoft.EventGrid.MQTTClientSessionDisconnected event. */
export interface EventGridMqttClientSessionDisconnectedEventData
  extends EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client's session. This case-sensitive string can
   * be up to 128 characters long, and supports UTF-8 characters.
   */
  clientSessionName?: string;
  /**
   * A number that helps indicate order of MQTT client session connected or
   * disconnected events. Latest event will have a sequence number that is higher
   * than the previous event.
   */
  sequenceNumber?: number;
  /**
   * Reason for the disconnection of the MQTT client's session. The value could be
   * one of the values in the disconnection reasons table.
   */
  disconnectionReason: EventGridMqttClientDisconnectionReason;
}

/** EventGrid MQTT Client Disconnection Reason */
export type EventGridMqttClientDisconnectionReason =
  | "ClientAuthenticationError"
  | "ClientAuthorizationError"
  | "ClientError"
  | "ClientInitiatedDisconnect"
  | "ConnectionLost"
  | "IpForbidden"
  | "QuotaExceeded"
  | "ServerError"
  | "ServerInitiatedDisconnect"
  | "SessionOverflow"
  | "SessionTakenOver";

/** Describes the schema of the common properties across all ARN system topic events */
export interface ResourceNotificationsResourceUpdatedEventData {
  /** resourceInfo details for update event */
  resourceDetails: ResourceNotificationsResourceUpdatedDetails;
  /** details about operational info */
  operationalDetails: ResourceNotificationsOperationalDetails;
  /** api version of the resource properties bag */
  apiVersion?: string;
}

/**
 * Describes the schema of the properties under resource info which are common
 * across all ARN system topic events
 */
export interface ResourceNotificationsResourceUpdatedDetails {
  /** id of the resource for which the event is being emitted */
  id?: string;
  /** name of the resource for which the event is being emitted */
  name?: string;
  /** the type of the resource for which the event is being emitted */
  type?: string;
  /** the location of the resource for which the event is being emitted */
  location?: string;
  /** the tags on the resource for which the event is being emitted */
  tags: Record<string, string>;
  /** properties in the payload of the resource for which the event is being emitted */
  properties: Record<string, any>;
}

/** details of operational info */
export interface ResourceNotificationsOperationalDetails {
  /** Date and Time when resource was updated */
  resourceEventTime: Date;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged
 * event.
 */
export interface ResourceNotificationsHealthResourcesAvailabilityStatusChangedEventData
  extends ResourceNotificationsResourceUpdatedEventData {}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.ResourceAnnotated event.
 */
export interface ResourceNotificationsHealthResourcesAnnotatedEventData
  extends ResourceNotificationsResourceUpdatedEventData {}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.Resources.CreatedOrUpdated event.
 */
export interface ResourceNotificationsResourceManagementCreatedOrUpdatedEventData
  extends ResourceNotificationsResourceUpdatedEventData {}

/**
 * Describes the schema of the common properties across all ARN system topic
 * delete events
 */
export interface ResourceNotificationsResourceDeletedEventData {
  /** resourceInfo details for delete event */
  resourceDetails: ResourceNotificationsResourceDeletedDetails;
  /** details about operational info */
  operationalDetails: ResourceNotificationsOperationalDetails;
}

/**
 * Describes the schema of the properties under resource info which are common
 * across all ARN system topic delete events
 */
export interface ResourceNotificationsResourceDeletedDetails {
  /** id of the resource for which the event is being emitted */
  id?: string;
  /** name of the resource for which the event is being emitted */
  name?: string;
  /** the type of the resource for which the event is being emitted */
  type?: string;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.Resources.Deleted event.
 */
export interface ResourceNotificationsResourceManagementDeletedEventData
  extends ResourceNotificationsResourceDeletedEventData {}

/** Type of ServiceApiVersions */
export type ServiceApiVersions = "2018-01-01" | "2024-01-01";
/** Alias for MediaJobOutputUnion */
export type MediaJobOutputUnion = MediaJobOutputAsset | MediaJobOutput;
