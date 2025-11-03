// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The list of available operations. */
export interface _OperationListResult {
  /** The list of operations. */
  value: Operation[];
  /** The URL to get the next set of results, if any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** A Service Bus REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  readonly name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Properties of the operation */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Operation display payload */
export interface OperationDisplay {
  /** Resource provider of the operation */
  readonly provider?: string;
  /** Resource of the operation */
  readonly resource?: string;
  /** Localized friendly name for the operation */
  readonly operation?: string;
  /** Localized friendly description for the operation */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The resource management error response. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorResponseError;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseErrorDeserializer(item["error"]),
  };
}

/** The error object. */
export interface ErrorResponseError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorResponseErrorDeserializer(item: any): ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorResponseArrayDeserializer(result: Array<ErrorResponse>): any[] {
  return result.map((item) => {
    return errorResponseDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Description of a namespace authorization rule. */
export interface SBAuthorizationRule extends ProxyResource {
  /** AuthorizationRule properties. */
  properties?: SBAuthorizationRuleProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function sbAuthorizationRuleSerializer(item: SBAuthorizationRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sbAuthorizationRulePropertiesSerializer(item["properties"]),
  };
}

export function sbAuthorizationRuleDeserializer(item: any): SBAuthorizationRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbAuthorizationRulePropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** AuthorizationRule properties. */
export interface SBAuthorizationRuleProperties {
  /** The rights associated with the rule. */
  rights: AccessRights[];
}

export function sbAuthorizationRulePropertiesSerializer(item: SBAuthorizationRuleProperties): any {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

export function sbAuthorizationRulePropertiesDeserializer(
  item: any,
): SBAuthorizationRuleProperties {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

/** Type of AccessRights */
export type AccessRights = "Manage" | "Send" | "Listen";

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a SBAuthorizationRule list operation. */
export interface _SBAuthorizationRuleListResult {
  /** The SBAuthorizationRule items on this page */
  value: SBAuthorizationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbAuthorizationRuleListResultDeserializer(
  item: any,
): _SBAuthorizationRuleListResult {
  return {
    value: sbAuthorizationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbAuthorizationRuleArraySerializer(result: Array<SBAuthorizationRule>): any[] {
  return result.map((item) => {
    return sbAuthorizationRuleSerializer(item);
  });
}

export function sbAuthorizationRuleArrayDeserializer(result: Array<SBAuthorizationRule>): any[] {
  return result.map((item) => {
    return sbAuthorizationRuleDeserializer(item);
  });
}

/** Namespace/ServiceBus Connection String */
export interface AccessKeys {
  /** Primary connection string of the created namespace authorization rule. */
  readonly primaryConnectionString?: string;
  /** Secondary connection string of the created namespace authorization rule. */
  readonly secondaryConnectionString?: string;
  /** Primary connection string of the alias if GEO DR is enabled */
  readonly aliasPrimaryConnectionString?: string;
  /** Secondary  connection string of the alias if GEO DR is enabled */
  readonly aliasSecondaryConnectionString?: string;
  /** A base64-encoded 256-bit primary key for signing and validating the SAS token. */
  readonly primaryKey?: string;
  /** A base64-encoded 256-bit primary key for signing and validating the SAS token. */
  readonly secondaryKey?: string;
  /** A string that describes the authorization rule. */
  readonly keyName?: string;
}

export function accessKeysDeserializer(item: any): AccessKeys {
  return {
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
    aliasPrimaryConnectionString: item["aliasPrimaryConnectionString"],
    aliasSecondaryConnectionString: item["aliasSecondaryConnectionString"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    keyName: item["keyName"],
  };
}

/** Description of a Check Name availability request properties. */
export interface CheckNameAvailability {
  /** The Name to check the namespace name availability and The namespace name can contain only letters, numbers, and hyphens. The namespace must start with a letter, and it must end with a letter or number. */
  name: string;
}

export function checkNameAvailabilitySerializer(item: CheckNameAvailability): any {
  return { name: item["name"] };
}

/** Description of a Check Name availability request properties. */
export interface CheckNameAvailabilityResult {
  /** The detailed info regarding the reason associated with the namespace. */
  readonly message?: string;
  /** Value indicating namespace is availability, true if the namespace is available; otherwise, false. */
  nameAvailable?: boolean;
  /** The reason for unavailability of a namespace. */
  reason?: UnavailableReason;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** Specifies the reason for the unavailability of the service. */
export type UnavailableReason =
  | "None"
  | "InvalidName"
  | "SubscriptionIsDisabled"
  | "NameInUse"
  | "NameInLockdown"
  | "TooManyNamespaceInCurrentSubscription";

/** Single item in List or Get Alias(Disaster Recovery configuration) operation */
export interface ArmDisasterRecovery extends ProxyResource {
  /** Properties required to the Create Or Update Alias(Disaster Recovery configurations) */
  properties?: ArmDisasterRecoveryProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function armDisasterRecoverySerializer(item: ArmDisasterRecovery): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : armDisasterRecoveryPropertiesSerializer(item["properties"]),
  };
}

export function armDisasterRecoveryDeserializer(item: any): ArmDisasterRecovery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : armDisasterRecoveryPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties required to the Create Or Update Alias(Disaster Recovery configurations) */
export interface ArmDisasterRecoveryProperties {
  /** Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed' */
  readonly provisioningState?: ProvisioningStateDR;
  /** Number of entities pending to be replicated. */
  readonly pendingReplicationOperationsCount?: number;
  /** ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing */
  partnerNamespace?: string;
  /** Primary/Secondary eventhub namespace name, which is part of GEO DR pairing */
  alternateName?: string;
  /** role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary' */
  readonly role?: RoleDisasterRecovery;
}

export function armDisasterRecoveryPropertiesSerializer(item: ArmDisasterRecoveryProperties): any {
  return {
    partnerNamespace: item["partnerNamespace"],
    alternateName: item["alternateName"],
  };
}

export function armDisasterRecoveryPropertiesDeserializer(
  item: any,
): ArmDisasterRecoveryProperties {
  return {
    provisioningState: item["provisioningState"],
    pendingReplicationOperationsCount: item["pendingReplicationOperationsCount"],
    partnerNamespace: item["partnerNamespace"],
    alternateName: item["alternateName"],
    role: item["role"],
  };
}

/** Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed' */
export type ProvisioningStateDR = "Accepted" | "Succeeded" | "Failed";
/** role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary' */
export type RoleDisasterRecovery = "Primary" | "PrimaryNotReplicating" | "Secondary";

/** The response of a ArmDisasterRecovery list operation. */
export interface _ArmDisasterRecoveryListResult {
  /** The ArmDisasterRecovery items on this page */
  value: ArmDisasterRecovery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _armDisasterRecoveryListResultDeserializer(
  item: any,
): _ArmDisasterRecoveryListResult {
  return {
    value: armDisasterRecoveryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function armDisasterRecoveryArraySerializer(result: Array<ArmDisasterRecovery>): any[] {
  return result.map((item) => {
    return armDisasterRecoverySerializer(item);
  });
}

export function armDisasterRecoveryArrayDeserializer(result: Array<ArmDisasterRecovery>): any[] {
  return result.map((item) => {
    return armDisasterRecoveryDeserializer(item);
  });
}

/** Safe failover is to indicate the service should wait for pending replication to finish before switching to the secondary. */
export interface FailoverProperties {
  /** Safe failover is to indicate the service should wait for pending replication to finish before switching to the secondary. */
  properties?: FailoverPropertiesProperties;
}

export function failoverPropertiesSerializer(item: FailoverProperties): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : failoverPropertiesPropertiesSerializer(item["properties"]),
  };
}

/** Safe failover is to indicate the service should wait for pending replication to finish before switching to the secondary. */
export interface FailoverPropertiesProperties {
  /** Safe failover is to indicate the service should wait for pending replication to finish before switching to the secondary. */
  isSafeFailover?: boolean;
}

export function failoverPropertiesPropertiesSerializer(item: FailoverPropertiesProperties): any {
  return { IsSafeFailover: item["isSafeFailover"] };
}

/** Parameters supplied to the Regenerate Authorization Rule operation, specifies which key needs to be reset. */
export interface RegenerateAccessKeyParameters {
  /** The access key to regenerate. */
  keyType: KeyType;
  /** Optional, if the key value provided, is reset for KeyType value or autogenerate Key value set for keyType */
  key?: string;
}

export function regenerateAccessKeyParametersSerializer(item: RegenerateAccessKeyParameters): any {
  return { keyType: item["keyType"], key: item["key"] };
}

/** The access key to regenerate. */
export type KeyType = "PrimaryKey" | "SecondaryKey";

/** Description of queue Resource. */
export interface SBQueue extends ProxyResource {
  /** Queue Properties */
  properties?: SBQueueProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function sbQueueSerializer(item: SBQueue): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sbQueuePropertiesSerializer(item["properties"]),
  };
}

export function sbQueueDeserializer(item: any): SBQueue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbQueuePropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** The Queue Properties definition. */
export interface SBQueueProperties {
  /** Message Count Details. */
  readonly countDetails?: MessageCountDetails;
  /** The exact time the message was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** Last time a message was sent, or the last time there was a receive request to this queue. */
  readonly accessedAt?: Date;
  /** The size of the queue, in bytes. */
  readonly sizeInBytes?: number;
  /** The number of messages in the queue. */
  readonly messageCount?: number;
  /** ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute. */
  lockDuration?: string;
  /** The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024. */
  maxSizeInMegabytes?: number;
  /** Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024. */
  maxMessageSizeInKilobytes?: number;
  /** A value indicating if this queue requires duplicate detection. */
  requiresDuplicateDetection?: boolean;
  /** A value that indicates whether the queue supports the concept of sessions. */
  requiresSession?: boolean;
  /** ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself. */
  defaultMessageTimeToLive?: string;
  /** A value that indicates whether this queue has dead letter support when a message expires. */
  deadLetteringOnMessageExpiration?: boolean;
  /** ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes. */
  duplicateDetectionHistoryTimeWindow?: string;
  /** The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10. */
  maxDeliveryCount?: number;
  /** Enumerates the possible values for the status of a messaging entity. */
  status?: EntityStatus;
  /** Value that indicates whether server-side batched operations are enabled. */
  enableBatchedOperations?: boolean;
  /** ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes. */
  autoDeleteOnIdle?: string;
  /** A value that indicates whether the queue is to be partitioned across multiple message brokers. */
  enablePartitioning?: boolean;
  /** A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage. */
  enableExpress?: boolean;
  /** Queue/Topic name to forward the messages */
  forwardTo?: string;
  /** Queue/Topic name to forward the Dead Letter message */
  forwardDeadLetteredMessagesTo?: string;
  /** Gets and Sets Metadata of User. */
  userMetadata?: string;
}

export function sbQueuePropertiesSerializer(item: SBQueueProperties): any {
  return {
    lockDuration: item["lockDuration"],
    maxSizeInMegabytes: item["maxSizeInMegabytes"],
    maxMessageSizeInKilobytes: item["maxMessageSizeInKilobytes"],
    requiresDuplicateDetection: item["requiresDuplicateDetection"],
    requiresSession: item["requiresSession"],
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    deadLetteringOnMessageExpiration: item["deadLetteringOnMessageExpiration"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    maxDeliveryCount: item["maxDeliveryCount"],
    status: item["status"],
    enableBatchedOperations: item["enableBatchedOperations"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    enablePartitioning: item["enablePartitioning"],
    enableExpress: item["enableExpress"],
    forwardTo: item["forwardTo"],
    forwardDeadLetteredMessagesTo: item["forwardDeadLetteredMessagesTo"],
    userMetadata: item["userMetadata"],
  };
}

export function sbQueuePropertiesDeserializer(item: any): SBQueueProperties {
  return {
    countDetails: !item["countDetails"]
      ? item["countDetails"]
      : messageCountDetailsDeserializer(item["countDetails"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    accessedAt: !item["accessedAt"] ? item["accessedAt"] : new Date(item["accessedAt"]),
    sizeInBytes: item["sizeInBytes"],
    messageCount: item["messageCount"],
    lockDuration: item["lockDuration"],
    maxSizeInMegabytes: item["maxSizeInMegabytes"],
    maxMessageSizeInKilobytes: item["maxMessageSizeInKilobytes"],
    requiresDuplicateDetection: item["requiresDuplicateDetection"],
    requiresSession: item["requiresSession"],
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    deadLetteringOnMessageExpiration: item["deadLetteringOnMessageExpiration"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    maxDeliveryCount: item["maxDeliveryCount"],
    status: item["status"],
    enableBatchedOperations: item["enableBatchedOperations"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    enablePartitioning: item["enablePartitioning"],
    enableExpress: item["enableExpress"],
    forwardTo: item["forwardTo"],
    forwardDeadLetteredMessagesTo: item["forwardDeadLetteredMessagesTo"],
    userMetadata: item["userMetadata"],
  };
}

/** Message Count Details. */
export interface MessageCountDetails {
  /** Number of active messages in the queue, topic, or subscription. */
  readonly activeMessageCount?: number;
  /** Number of messages that are dead lettered. */
  readonly deadLetterMessageCount?: number;
  /** Number of scheduled messages. */
  readonly scheduledMessageCount?: number;
  /** Number of messages transferred to another queue, topic, or subscription. */
  readonly transferMessageCount?: number;
  /** Number of messages transferred into dead letters. */
  readonly transferDeadLetterMessageCount?: number;
}

export function messageCountDetailsDeserializer(item: any): MessageCountDetails {
  return {
    activeMessageCount: item["activeMessageCount"],
    deadLetterMessageCount: item["deadLetterMessageCount"],
    scheduledMessageCount: item["scheduledMessageCount"],
    transferMessageCount: item["transferMessageCount"],
    transferDeadLetterMessageCount: item["transferDeadLetterMessageCount"],
  };
}

/** Entity status. */
export type EntityStatus =
  | "Active"
  | "Disabled"
  | "Restoring"
  | "SendDisabled"
  | "ReceiveDisabled"
  | "Creating"
  | "Deleting"
  | "Renaming"
  | "Unknown";

/** The response of a SBQueue list operation. */
export interface _SBQueueListResult {
  /** The SBQueue items on this page */
  value: SBQueue[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbQueueListResultDeserializer(item: any): _SBQueueListResult {
  return {
    value: sbQueueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbQueueArraySerializer(result: Array<SBQueue>): any[] {
  return result.map((item) => {
    return sbQueueSerializer(item);
  });
}

export function sbQueueArrayDeserializer(result: Array<SBQueue>): any[] {
  return result.map((item) => {
    return sbQueueDeserializer(item);
  });
}

/** Description of topic resource. */
export interface SBTopic extends ProxyResource {
  /** Properties of topic resource. */
  properties?: SBTopicProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function sbTopicSerializer(item: SBTopic): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sbTopicPropertiesSerializer(item["properties"]),
  };
}

export function sbTopicDeserializer(item: any): SBTopic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbTopicPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** The Topic Properties definition. */
export interface SBTopicProperties {
  /** Size of the topic, in bytes. */
  readonly sizeInBytes?: number;
  /** Exact time the message was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** Last time the message was sent, or a request was received, for this topic. */
  readonly accessedAt?: Date;
  /** Number of subscriptions. */
  readonly subscriptionCount?: number;
  /** Message count details */
  readonly countDetails?: MessageCountDetails;
  /** ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself. */
  defaultMessageTimeToLive?: string;
  /** Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024. */
  maxSizeInMegabytes?: number;
  /** Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024. */
  maxMessageSizeInKilobytes?: number;
  /** Value indicating if this topic requires duplicate detection. */
  requiresDuplicateDetection?: boolean;
  /** ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes. */
  duplicateDetectionHistoryTimeWindow?: string;
  /** Value that indicates whether server-side batched operations are enabled. */
  enableBatchedOperations?: boolean;
  /** Enumerates the possible values for the status of a messaging entity. */
  status?: EntityStatus;
  /** Value that indicates whether the topic supports ordering. */
  supportOrdering?: boolean;
  /** ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes. */
  autoDeleteOnIdle?: string;
  /** Value that indicates whether the topic to be partitioned across multiple message brokers is enabled. */
  enablePartitioning?: boolean;
  /** Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage. */
  enableExpress?: boolean;
  /** Gets and Sets Metadata of User. */
  userMetadata?: string;
}

export function sbTopicPropertiesSerializer(item: SBTopicProperties): any {
  return {
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    maxSizeInMegabytes: item["maxSizeInMegabytes"],
    maxMessageSizeInKilobytes: item["maxMessageSizeInKilobytes"],
    requiresDuplicateDetection: item["requiresDuplicateDetection"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    enableBatchedOperations: item["enableBatchedOperations"],
    status: item["status"],
    supportOrdering: item["supportOrdering"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    enablePartitioning: item["enablePartitioning"],
    enableExpress: item["enableExpress"],
    userMetadata: item["userMetadata"],
  };
}

export function sbTopicPropertiesDeserializer(item: any): SBTopicProperties {
  return {
    sizeInBytes: item["sizeInBytes"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    accessedAt: !item["accessedAt"] ? item["accessedAt"] : new Date(item["accessedAt"]),
    subscriptionCount: item["subscriptionCount"],
    countDetails: !item["countDetails"]
      ? item["countDetails"]
      : messageCountDetailsDeserializer(item["countDetails"]),
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    maxSizeInMegabytes: item["maxSizeInMegabytes"],
    maxMessageSizeInKilobytes: item["maxMessageSizeInKilobytes"],
    requiresDuplicateDetection: item["requiresDuplicateDetection"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    enableBatchedOperations: item["enableBatchedOperations"],
    status: item["status"],
    supportOrdering: item["supportOrdering"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    enablePartitioning: item["enablePartitioning"],
    enableExpress: item["enableExpress"],
    userMetadata: item["userMetadata"],
  };
}

/** The response of a SBTopic list operation. */
export interface _SBTopicListResult {
  /** The SBTopic items on this page */
  value: SBTopic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbTopicListResultDeserializer(item: any): _SBTopicListResult {
  return {
    value: sbTopicArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbTopicArraySerializer(result: Array<SBTopic>): any[] {
  return result.map((item) => {
    return sbTopicSerializer(item);
  });
}

export function sbTopicArrayDeserializer(result: Array<SBTopic>): any[] {
  return result.map((item) => {
    return sbTopicDeserializer(item);
  });
}

/** Properties of the PrivateEndpointConnection. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Properties of the PrivateEndpointConnection. */
  properties?: PrivateEndpointConnectionProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties of the private endpoint connection resource. */
export interface PrivateEndpointConnectionProperties {
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: EndPointProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** PrivateEndpoint information. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint. */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** ConnectionState information. */
export interface ConnectionState {
  /** Status of the connection. */
  status?: PrivateLinkConnectionStatus;
  /** Description of the connection state. */
  description?: string;
}

export function connectionStateSerializer(item: ConnectionState): any {
  return { status: item["status"], description: item["description"] };
}

export function connectionStateDeserializer(item: any): ConnectionState {
  return {
    status: item["status"],
    description: item["description"],
  };
}

/** Status of the connection. */
export enum KnownPrivateLinkConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Status of the connection. \
 * {@link KnownPrivateLinkConnectionStatus} can be used interchangeably with PrivateLinkConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkConnectionStatus = string;

/** Provisioning state of the Private Endpoint Connection. */
export enum KnownEndPointProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the Private Endpoint Connection. \
 * {@link KnownEndPointProvisioningState} can be used interchangeably with EndPointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Canceled** \
 * **Failed**
 */
export type EndPointProvisioningState = string;

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Network Security Perimeter related configurations of a given namespace */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Properties of the Network Security Perimeter Configuration */
  properties?: NetworkSecurityPerimeterConfigurationProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties of NetworkSecurityPerimeterConfiguration */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Provisioning state of NetworkSecurityPerimeter configuration propagation */
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of Provisioning Issues if any */
  provisioningIssues?: ProvisioningIssue[];
  /** NetworkSecurityPerimeter related information */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /** Information about current network profile */
  readonly profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
  /** True if the ServiceBus namespace is backed by another Azure resource and not visible to end users. */
  readonly isBackingResource?: boolean;
  /** Indicates that the NSP controls related to backing association are only applicable to a specific feature in backing resource's data plane. */
  readonly applicableFeatures?: string[];
  /** Source Resource Association name */
  readonly parentAssociationName?: string;
  /** ARM Id of source resource */
  readonly sourceResourceId?: string;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : networkSecurityPerimeterConfigurationPropertiesResourceAssociationDeserializer(
          item["resourceAssociation"],
        ),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterConfigurationPropertiesProfileDeserializer(item["profile"]),
    isBackingResource: item["isBackingResource"],
    applicableFeatures: !item["applicableFeatures"]
      ? item["applicableFeatures"]
      : item["applicableFeatures"].map((p: any) => {
          return p;
        }),
    parentAssociationName: item["parentAssociationName"],
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Provisioning state of NetworkSecurityPerimeter configuration propagation */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Accepted */
  Accepted = "Accepted",
  /** InvalidResponse */
  InvalidResponse = "InvalidResponse",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** SucceededWithIssues */
  SucceededWithIssues = "SucceededWithIssues",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of NetworkSecurityPerimeter configuration propagation \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Creating** \
 * **Updating** \
 * **Accepted** \
 * **InvalidResponse** \
 * **Succeeded** \
 * **SucceededWithIssues** \
 * **Failed** \
 * **Deleting** \
 * **Deleted** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes Provisioning issue for given NetworkSecurityPerimeterConfiguration */
export interface ProvisioningIssue {
  /** Name of the issue */
  name?: string;
  /** Properties of Provisioning Issue */
  readonly properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Provisioning Issue */
export interface ProvisioningIssueProperties {
  /** Type of Issue */
  issueType?: string;
  /** Description of the issue */
  description?: string;
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    description: item["description"],
  };
}

/** NetworkSecurityPerimeter related information */
export interface NetworkSecurityPerimeter {
  /** Fully qualified identifier of the resource */
  id?: string;
  /** Guid of the resource */
  perimeterGuid?: string;
  /** Location of the resource */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Information about resource association */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  /** Name of the resource association */
  name?: string;
  /** Access Mode of the resource association */
  accessMode?: ResourceAssociationAccessMode;
}

export function networkSecurityPerimeterConfigurationPropertiesResourceAssociationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access Mode of the resource association */
export enum KnownResourceAssociationAccessMode {
  /** NoAssociationMode */
  NoAssociationMode = "NoAssociationMode",
  /** EnforcedMode */
  EnforcedMode = "EnforcedMode",
  /** LearningMode */
  LearningMode = "LearningMode",
  /** AuditMode */
  AuditMode = "AuditMode",
  /** UnspecifiedMode */
  UnspecifiedMode = "UnspecifiedMode",
}

/**
 * Access Mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoAssociationMode** \
 * **EnforcedMode** \
 * **LearningMode** \
 * **AuditMode** \
 * **UnspecifiedMode**
 */
export type ResourceAssociationAccessMode = string;

/** Information about current network profile */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfile {
  /** Name of the resource */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: string;
  /** List of Access Rules */
  accessRules?: NspAccessRule[];
}

export function networkSecurityPerimeterConfigurationPropertiesProfileDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationPropertiesProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : nspAccessRuleArrayDeserializer(item["accessRules"]),
  };
}

export function nspAccessRuleArrayDeserializer(result: Array<NspAccessRule>): any[] {
  return result.map((item) => {
    return nspAccessRuleDeserializer(item);
  });
}

/** Information of Access Rule in Network Profile */
export interface NspAccessRule {
  /** Fully qualified identifier of the resource */
  id?: string;
  /** Name of the resource */
  name?: string;
  /** Type of the resource */
  type?: string;
  /** Properties of Access Rule */
  readonly properties?: NspAccessRuleProperties;
}

export function nspAccessRuleDeserializer(item: any): NspAccessRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : nspAccessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface NspAccessRuleProperties {
  /** Direction of Access Rule */
  direction?: NspAccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: NspAccessRulePropertiesSubscriptionsItem[];
  /** NetworkSecurityPerimeters for inbound rules */
  readonly networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** FQDN for outbound rules */
  readonly fullyQualifiedDomainNames?: string[];
}

export function nspAccessRulePropertiesDeserializer(item: any): NspAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownNspAccessRuleDirection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownNspAccessRuleDirection} can be used interchangeably with NspAccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound** \
 * **Outbound**
 */
export type NspAccessRuleDirection = string;

export function nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<NspAccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return nspAccessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Subscription for inbound rule */
export interface NspAccessRulePropertiesSubscriptionsItem {
  /** Fully qualified identifier of subscription */
  id?: string;
}

export function nspAccessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): NspAccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Single item in List or Get Migration Config operation */
export interface MigrationConfigProperties extends ProxyResource {
  /** Properties required to the Create Migration Configuration */
  properties?: MigrationConfigPropertiesProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function migrationConfigPropertiesSerializer(item: MigrationConfigProperties): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : migrationConfigPropertiesPropertiesSerializer(item["properties"]),
  };
}

export function migrationConfigPropertiesDeserializer(item: any): MigrationConfigProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationConfigPropertiesPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties required to the Create Migration Configuration */
export interface MigrationConfigPropertiesProperties {
  /** Provisioning state of Migration ConfigurationProvisioning state of Migration Configuration */
  readonly provisioningState?: string;
  /** Number of entities pending to be replicated. */
  readonly pendingReplicationOperationsCount?: number;
  /** Existing premium Namespace ARM Id name which has no entities, will be used for migration */
  targetNamespace: string;
  /** Name to access Standard Namespace after migration */
  postMigrationName: string;
  /** State in which Standard to Premium Migration is, possible values : Unknown, Reverting, Completing, Initiating, Syncing, Active */
  readonly migrationState?: string;
}

export function migrationConfigPropertiesPropertiesSerializer(
  item: MigrationConfigPropertiesProperties,
): any {
  return {
    targetNamespace: item["targetNamespace"],
    postMigrationName: item["postMigrationName"],
  };
}

export function migrationConfigPropertiesPropertiesDeserializer(
  item: any,
): MigrationConfigPropertiesProperties {
  return {
    provisioningState: item["provisioningState"],
    pendingReplicationOperationsCount: item["pendingReplicationOperationsCount"],
    targetNamespace: item["targetNamespace"],
    postMigrationName: item["postMigrationName"],
    migrationState: item["migrationState"],
  };
}

/** Known values of {@link MigrationConfigurationName} that the service accepts. */
export enum KnownMigrationConfigurationName {
  /** $default */
  Default = "$default",
}

/** Type of MigrationConfigurationName */
export type MigrationConfigurationName = string;

/** The response of a MigrationConfigProperties list operation. */
export interface _MigrationConfigListResult {
  /** The MigrationConfigProperties items on this page */
  value: MigrationConfigProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationConfigListResultDeserializer(item: any): _MigrationConfigListResult {
  return {
    value: migrationConfigPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationConfigPropertiesArraySerializer(
  result: Array<MigrationConfigProperties>,
): any[] {
  return result.map((item) => {
    return migrationConfigPropertiesSerializer(item);
  });
}

export function migrationConfigPropertiesArrayDeserializer(
  result: Array<MigrationConfigProperties>,
): any[] {
  return result.map((item) => {
    return migrationConfigPropertiesDeserializer(item);
  });
}

/** Description of Rule Resource. */
export interface Rule extends ProxyResource {
  /** Properties of Rule resource */
  properties?: Ruleproperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function ruleSerializer(item: Rule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : rulepropertiesSerializer(item["properties"]),
  };
}

export function ruleDeserializer(item: any): Rule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : rulepropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Description of Rule Resource. */
export interface Ruleproperties {
  /** Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression. */
  action?: Action;
  /** Filter type that is evaluated against a BrokeredMessage. */
  filterType?: FilterType;
  /** Properties of sqlFilter */
  sqlFilter?: SqlFilter;
  /** Properties of correlationFilter */
  correlationFilter?: CorrelationFilter;
}

export function rulepropertiesSerializer(item: Ruleproperties): any {
  return {
    action: !item["action"] ? item["action"] : actionSerializer(item["action"]),
    filterType: item["filterType"],
    sqlFilter: !item["sqlFilter"] ? item["sqlFilter"] : sqlFilterSerializer(item["sqlFilter"]),
    correlationFilter: !item["correlationFilter"]
      ? item["correlationFilter"]
      : correlationFilterSerializer(item["correlationFilter"]),
  };
}

export function rulepropertiesDeserializer(item: any): Ruleproperties {
  return {
    action: !item["action"] ? item["action"] : actionDeserializer(item["action"]),
    filterType: item["filterType"],
    sqlFilter: !item["sqlFilter"] ? item["sqlFilter"] : sqlFilterDeserializer(item["sqlFilter"]),
    correlationFilter: !item["correlationFilter"]
      ? item["correlationFilter"]
      : correlationFilterDeserializer(item["correlationFilter"]),
  };
}

/** Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression. */
export interface Action {
  /** SQL expression. e.g. MyProperty='ABC' */
  sqlExpression?: string;
  /** This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20. */
  compatibilityLevel?: number;
  /** Value that indicates whether the rule action requires preprocessing. */
  requiresPreprocessing?: boolean;
}

export function actionSerializer(item: Action): any {
  return {
    sqlExpression: item["sqlExpression"],
    compatibilityLevel: item["compatibilityLevel"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

export function actionDeserializer(item: any): Action {
  return {
    sqlExpression: item["sqlExpression"],
    compatibilityLevel: item["compatibilityLevel"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

/** Rule filter types */
export type FilterType = "SqlFilter" | "CorrelationFilter";

/** Represents a filter which is a composition of an expression and an action that is executed in the pub/sub pipeline. */
export interface SqlFilter {
  /** The SQL expression. e.g. MyProperty='ABC' */
  sqlExpression?: string;
  /** This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20. */
  compatibilityLevel?: number;
  /** Value that indicates whether the rule action requires preprocessing. */
  requiresPreprocessing?: boolean;
}

export function sqlFilterSerializer(item: SqlFilter): any {
  return {
    sqlExpression: item["sqlExpression"],
    compatibilityLevel: item["compatibilityLevel"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

export function sqlFilterDeserializer(item: any): SqlFilter {
  return {
    sqlExpression: item["sqlExpression"],
    compatibilityLevel: item["compatibilityLevel"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

/** Represents the correlation filter expression. */
export interface CorrelationFilter {
  /** dictionary object for custom filters */
  properties?: Record<string, string>;
  /** Identifier of the correlation. */
  correlationId?: string;
  /** Identifier of the message. */
  messageId?: string;
  /** Address to send to. */
  to?: string;
  /** Address of the queue to reply to. */
  replyTo?: string;
  /** Application specific label. */
  label?: string;
  /** Session identifier. */
  sessionId?: string;
  /** Session identifier to reply to. */
  replyToSessionId?: string;
  /** Content type of the message. */
  contentType?: string;
  /** Value that indicates whether the rule action requires preprocessing. */
  requiresPreprocessing?: boolean;
}

export function correlationFilterSerializer(item: CorrelationFilter): any {
  return {
    properties: item["properties"],
    correlationId: item["correlationId"],
    messageId: item["messageId"],
    to: item["to"],
    replyTo: item["replyTo"],
    label: item["label"],
    sessionId: item["sessionId"],
    replyToSessionId: item["replyToSessionId"],
    contentType: item["contentType"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

export function correlationFilterDeserializer(item: any): CorrelationFilter {
  return {
    properties: item["properties"],
    correlationId: item["correlationId"],
    messageId: item["messageId"],
    to: item["to"],
    replyTo: item["replyTo"],
    label: item["label"],
    sessionId: item["sessionId"],
    replyToSessionId: item["replyToSessionId"],
    contentType: item["contentType"],
    requiresPreprocessing: item["requiresPreprocessing"],
  };
}

/** The response of a Rule list operation. */
export interface _RuleListResult {
  /** The Rule items on this page */
  value: Rule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ruleListResultDeserializer(item: any): _RuleListResult {
  return {
    value: ruleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ruleArraySerializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleSerializer(item);
  });
}

export function ruleArrayDeserializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleDeserializer(item);
  });
}

/** Description of a namespace resource. */
export interface SBNamespace extends TrackedResource {
  /** Properties of the namespace. */
  properties?: SBNamespaceProperties;
  /** Properties of SKU */
  sku?: SBSku;
  /** Properties of BYOK Identity description */
  identity?: Identity;
}

export function sbNamespaceSerializer(item: SBNamespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sbNamespacePropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : sbSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function sbNamespaceDeserializer(item: any): SBNamespace {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbNamespacePropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : sbSkuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties of the namespace. */
export interface SBNamespaceProperties {
  /** The minimum TLS version for the cluster to support, e.g. '1.2' */
  minimumTlsVersion?: TlsVersion;
  /** Provisioning state of the namespace. */
  readonly provisioningState?: string;
  /** Status of the namespace. */
  readonly status?: string;
  /** The time the namespace was created */
  readonly createdAt?: Date;
  /** The time the namespace was updated. */
  readonly updatedAt?: Date;
  /** Endpoint you can use to perform Service Bus operations. */
  readonly serviceBusEndpoint?: string;
  /** Identifier for Azure Insights metrics */
  readonly metricId?: string;
  /** Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones. */
  zoneRedundant?: boolean;
  /** Properties of BYOK Encryption description */
  encryption?: Encryption;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** This property disables SAS authentication for the Service Bus namespace. */
  disableLocalAuth?: boolean;
  /** Alternate name for namespace */
  alternateName?: string;
  /** This determines if traffic is allowed over public network. By default it is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The number of partitions of a Service Bus namespace. This property is only applicable to Premium SKU namespaces. The default value is 1 and possible values are 1, 2 and 4 */
  premiumMessagingPartitions?: number;
  platformCapabilities?: PlatformCapabilities;
  /** Geo Data Replication settings for the namespace */
  geoDataReplication?: GeoDataReplicationProperties;
}

export function sbNamespacePropertiesSerializer(item: SBNamespaceProperties): any {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    publicNetworkAccess: item["publicNetworkAccess"],
    premiumMessagingPartitions: item["premiumMessagingPartitions"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesSerializer(item["geoDataReplication"]),
  };
}

export function sbNamespacePropertiesDeserializer(item: any): SBNamespaceProperties {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    serviceBusEndpoint: item["serviceBusEndpoint"],
    metricId: item["metricId"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    publicNetworkAccess: item["publicNetworkAccess"],
    premiumMessagingPartitions: item["premiumMessagingPartitions"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesDeserializer(item["geoDataReplication"]),
  };
}

/** The minimum TLS version for the cluster to support, e.g. '1.2' */
export enum KnownTlsVersion {
  /** 1.0 */
  _10 = "1.0",
  /** 1.1 */
  _11 = "1.1",
  /** 1.2 */
  _12 = "1.2",
}

/**
 * The minimum TLS version for the cluster to support, e.g. '1.2' \
 * {@link KnownTlsVersion} can be used interchangeably with TlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0** \
 * **1.1** \
 * **1.2**
 */
export type TlsVersion = string;

/** Properties to configure Encryption */
export interface Encryption {
  /** Properties of KeyVault */
  keyVaultProperties?: KeyVaultProperties[];
  /** Enumerates the possible value of keySource for Encryption */
  keySource?: "Microsoft.KeyVault";
  /** Enable Infrastructure Encryption (Double Encryption) */
  requireInfrastructureEncryption?: boolean;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesArraySerializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesArrayDeserializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function keyVaultPropertiesArraySerializer(result: Array<KeyVaultProperties>): any[] {
  return result.map((item) => {
    return keyVaultPropertiesSerializer(item);
  });
}

export function keyVaultPropertiesArrayDeserializer(result: Array<KeyVaultProperties>): any[] {
  return result.map((item) => {
    return keyVaultPropertiesDeserializer(item);
  });
}

/** Properties to configure keyVault Properties */
export interface KeyVaultProperties {
  /** Name of the Key from KeyVault */
  keyName?: string;
  /** Uri of KeyVault */
  keyVaultUri?: string;
  /** Version of KeyVault */
  keyVersion?: string;
  identity?: UserAssignedIdentityProperties;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVaultUri: item["keyVaultUri"],
    keyVersion: item["keyVersion"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityPropertiesSerializer(item["identity"]),
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVaultUri: item["keyVaultUri"],
    keyVersion: item["keyVersion"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityPropertiesDeserializer(item["identity"]),
  };
}

/** model interface UserAssignedIdentityProperties */
export interface UserAssignedIdentityProperties {
  /** ARM ID of user Identity selected for encryption */
  userAssignedIdentity?: string;
}

export function userAssignedIdentityPropertiesSerializer(
  item: UserAssignedIdentityProperties,
): any {
  return { userAssignedIdentity: item["userAssignedIdentity"] };
}

export function userAssignedIdentityPropertiesDeserializer(
  item: any,
): UserAssignedIdentityProperties {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** This determines if traffic is allowed over public network. By default it is enabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

/** model interface PlatformCapabilities */
export interface PlatformCapabilities {
  confidentialCompute?: ConfidentialCompute;
}

export function platformCapabilitiesSerializer(item: PlatformCapabilities): any {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeSerializer(item["confidentialCompute"]),
  };
}

export function platformCapabilitiesDeserializer(item: any): PlatformCapabilities {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeDeserializer(item["confidentialCompute"]),
  };
}

/** model interface ConfidentialCompute */
export interface ConfidentialCompute {
  /** Setting to Enable or Disable Confidential Compute */
  mode?: Mode;
}

export function confidentialComputeSerializer(item: ConfidentialCompute): any {
  return { mode: item["mode"] };
}

export function confidentialComputeDeserializer(item: any): ConfidentialCompute {
  return {
    mode: item["mode"],
  };
}

/** Setting to Enable or Disable Confidential Compute */
export enum KnownMode {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Setting to Enable or Disable Confidential Compute \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type Mode = string;

/** GeoDR Replication properties */
export interface GeoDataReplicationProperties {
  /** The maximum acceptable lag for data replication operations from the primary replica to a quorum of secondary replicas.  When the lag exceeds the configured amount, operations on the primary replica will be failed. The allowed values are 0 and 5 minutes to 1 day. */
  maxReplicationLagDurationInSeconds?: number;
  /** A list of regions where replicas of the namespace are maintained. */
  locations?: NamespaceReplicaLocation[];
}

export function geoDataReplicationPropertiesSerializer(item: GeoDataReplicationProperties): any {
  return {
    maxReplicationLagDurationInSeconds: item["maxReplicationLagDurationInSeconds"],
    locations: !item["locations"]
      ? item["locations"]
      : namespaceReplicaLocationArraySerializer(item["locations"]),
  };
}

export function geoDataReplicationPropertiesDeserializer(item: any): GeoDataReplicationProperties {
  return {
    maxReplicationLagDurationInSeconds: item["maxReplicationLagDurationInSeconds"],
    locations: !item["locations"]
      ? item["locations"]
      : namespaceReplicaLocationArrayDeserializer(item["locations"]),
  };
}

export function namespaceReplicaLocationArraySerializer(
  result: Array<NamespaceReplicaLocation>,
): any[] {
  return result.map((item) => {
    return namespaceReplicaLocationSerializer(item);
  });
}

export function namespaceReplicaLocationArrayDeserializer(
  result: Array<NamespaceReplicaLocation>,
): any[] {
  return result.map((item) => {
    return namespaceReplicaLocationDeserializer(item);
  });
}

/** Namespace replication properties */
export interface NamespaceReplicaLocation {
  /** Azure regions where a replica of the namespace is maintained */
  locationName?: string;
  /** GeoDR Role Types */
  roleType?: GeoDRRoleType;
  /** Optional property that denotes the ARM ID of the Cluster. This is required, if a namespace replica should be placed in a Dedicated Event Hub Cluster */
  clusterArmId?: string;
}

export function namespaceReplicaLocationSerializer(item: NamespaceReplicaLocation): any {
  return {
    locationName: item["locationName"],
    roleType: item["roleType"],
    clusterArmId: item["clusterArmId"],
  };
}

export function namespaceReplicaLocationDeserializer(item: any): NamespaceReplicaLocation {
  return {
    locationName: item["locationName"],
    roleType: item["roleType"],
    clusterArmId: item["clusterArmId"],
  };
}

/** GeoDR Role Types */
export enum KnownGeoDRRoleType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * GeoDR Role Types \
 * {@link KnownGeoDRRoleType} can be used interchangeably with GeoDRRoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary**
 */
export type GeoDRRoleType = string;

/** SKU of the namespace. */
export interface SBSku {
  /** Name of this SKU. */
  name: SkuName;
  /** The billing tier of this particular SKU. */
  tier?: SkuTier;
  /** Messaging units for your service bus premium namespace. Valid capacities are {1, 2, 4, 8, 16} multiples of your properties.premiumMessagingPartitions setting. For example, If properties.premiumMessagingPartitions is 1 then possible capacity values are 1, 2, 4, 8, and 16. If properties.premiumMessagingPartitions is 4 then possible capacity values are 4, 8, 16, 32 and 64 */
  capacity?: number;
}

export function sbSkuSerializer(item: SBSku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function sbSkuDeserializer(item: any): SBSku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** Name of this SKU. */
export type SkuName = "Basic" | "Standard" | "Premium";
/** The billing tier of this particular SKU. */
export type SkuTier = "Basic" | "Standard" | "Premium";

/** Properties to configure User Assigned Identities for Bring your Own Keys */
export interface Identity {
  /** ObjectId from the KeyVault */
  readonly principalId?: string;
  /** TenantId from the KeyVault */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type?: ManagedServiceIdentityType;
  /** Properties for User Assigned Identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type ManagedServiceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** Recognized Dictionary value. */
export interface UserAssignedIdentity {
  /** Principal Id of user assigned identity */
  readonly principalId?: string;
  /** Client Id of user assigned identity */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** Description of a namespace resource. */
export interface SBNamespaceUpdateParameters extends ResourceNamespacePatch {
  /** Properties of SKU */
  sku?: SBSku;
  /** Properties of the namespace. */
  properties?: SBNamespaceUpdateProperties;
  /** Properties of BYOK Identity description */
  identity?: Identity;
}

export function sbNamespaceUpdateParametersSerializer(item: SBNamespaceUpdateParameters): any {
  return {
    location: item["location"],
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : sbSkuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbNamespaceUpdatePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

/** Properties of the namespace. */
export interface SBNamespaceUpdateProperties {
  /** Provisioning state of the namespace. */
  readonly provisioningState?: string;
  /** Status of the namespace. */
  readonly status?: string;
  /** The time the namespace was created */
  readonly createdAt?: Date;
  /** The time the namespace was updated. */
  readonly updatedAt?: Date;
  /** Endpoint you can use to perform Service Bus operations. */
  readonly serviceBusEndpoint?: string;
  /** Identifier for Azure Insights metrics */
  readonly metricId?: string;
  /** Properties of BYOK Encryption description */
  encryption?: Encryption;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** This property disables SAS authentication for the Service Bus namespace. */
  disableLocalAuth?: boolean;
  /** Alternate name for namespace */
  alternateName?: string;
}

export function sbNamespaceUpdatePropertiesSerializer(item: SBNamespaceUpdateProperties): any {
  return {
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
  };
}

/** The Resource definition. */
export interface ResourceNamespacePatch extends Resource {
  /** Resource location */
  location?: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function resourceNamespacePatchSerializer(item: ResourceNamespacePatch): any {
  return { location: item["location"], tags: item["tags"] };
}

/** The response of a SBNamespace list operation. */
export interface _SBNamespaceListResult {
  /** The SBNamespace items on this page */
  value: SBNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbNamespaceListResultDeserializer(item: any): _SBNamespaceListResult {
  return {
    value: sbNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbNamespaceArraySerializer(result: Array<SBNamespace>): any[] {
  return result.map((item) => {
    return sbNamespaceSerializer(item);
  });
}

export function sbNamespaceArrayDeserializer(result: Array<SBNamespace>): any[] {
  return result.map((item) => {
    return sbNamespaceDeserializer(item);
  });
}

/** model interface FailOver */
export interface FailOver {
  properties?: FailOverProperties;
}

export function failOverSerializer(item: FailOver): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : failOverPropertiesSerializer(item["properties"]),
  };
}

export function failOverDeserializer(item: any): FailOver {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : failOverPropertiesDeserializer(item["properties"]),
  };
}

/** model interface FailOverProperties */
export interface FailOverProperties {
  /** Query parameter for the new primary location after failover. */
  primaryLocation?: string;
  /** If Force is false then graceful failover is attempted after ensuring no data loss. If Force flag is set to true, Forced failover is attempted with possible data loss. */
  force?: boolean;
}

export function failOverPropertiesSerializer(item: FailOverProperties): any {
  return { primaryLocation: item["primaryLocation"], force: item["force"] };
}

export function failOverPropertiesDeserializer(item: any): FailOverProperties {
  return {
    primaryLocation: item["primaryLocation"],
    force: item["force"],
  };
}

/** Description of NetworkRuleSet resource. */
export interface NetworkRuleSet extends ProxyResource {
  /** NetworkRuleSet properties */
  properties?: NetworkRuleSetProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : networkRuleSetPropertiesSerializer(item["properties"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkRuleSetPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** NetworkRuleSet properties */
export interface NetworkRuleSetProperties {
  /** Value that indicates whether Trusted Service Access is Enabled or not. */
  trustedServiceAccessEnabled?: boolean;
  /** Default Action for Network Rule Set */
  defaultAction?: DefaultAction;
  /** List VirtualNetwork Rules */
  virtualNetworkRules?: NWRuleSetVirtualNetworkRules[];
  /** List of IpRules */
  ipRules?: NWRuleSetIpRules[];
  /** This determines if traffic is allowed over public network. By default it is enabled. */
  publicNetworkAccess?: PublicNetworkAccessFlag;
}

export function networkRuleSetPropertiesSerializer(item: NetworkRuleSetProperties): any {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArraySerializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : nwRuleSetIpRulesArraySerializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function networkRuleSetPropertiesDeserializer(item: any): NetworkRuleSetProperties {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArrayDeserializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : nwRuleSetIpRulesArrayDeserializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Default Action for Network Rule Set */
export enum KnownDefaultAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Default Action for Network Rule Set \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type DefaultAction = string;

export function nwRuleSetVirtualNetworkRulesArraySerializer(
  result: Array<NWRuleSetVirtualNetworkRules>,
): any[] {
  return result.map((item) => {
    return nwRuleSetVirtualNetworkRulesSerializer(item);
  });
}

export function nwRuleSetVirtualNetworkRulesArrayDeserializer(
  result: Array<NWRuleSetVirtualNetworkRules>,
): any[] {
  return result.map((item) => {
    return nwRuleSetVirtualNetworkRulesDeserializer(item);
  });
}

/** Description of VirtualNetworkRules - NetworkRules resource. */
export interface NWRuleSetVirtualNetworkRules {
  /** Subnet properties */
  subnet?: Subnet;
  /** Value that indicates whether to ignore missing VNet Service Endpoint */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

export function nwRuleSetVirtualNetworkRulesSerializer(item: NWRuleSetVirtualNetworkRules): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function nwRuleSetVirtualNetworkRulesDeserializer(item: any): NWRuleSetVirtualNetworkRules {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

/** Properties supplied for Subnet */
export interface Subnet {
  /** Resource ID of Virtual Network Subnet */
  id: string;
}

export function subnetSerializer(item: Subnet): any {
  return { id: item["id"] };
}

export function subnetDeserializer(item: any): Subnet {
  return {
    id: item["id"],
  };
}

export function nwRuleSetIpRulesArraySerializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesSerializer(item);
  });
}

export function nwRuleSetIpRulesArrayDeserializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesDeserializer(item);
  });
}

/** Description of NetWorkRuleSet - IpRules resource. */
export interface NWRuleSetIpRules {
  /** IP Mask */
  ipMask?: string;
  /** The IP Filter Action */
  action?: NetworkRuleIPAction;
}

export function nwRuleSetIpRulesSerializer(item: NWRuleSetIpRules): any {
  return { ipMask: item["ipMask"], action: item["action"] };
}

export function nwRuleSetIpRulesDeserializer(item: any): NWRuleSetIpRules {
  return {
    ipMask: item["ipMask"],
    action: item["action"],
  };
}

/** The IP Filter Action */
export enum KnownNetworkRuleIPAction {
  /** Allow */
  Allow = "Allow",
}

/**
 * The IP Filter Action \
 * {@link KnownNetworkRuleIPAction} can be used interchangeably with NetworkRuleIPAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**
 */
export type NetworkRuleIPAction = string;

/** This determines if traffic is allowed over public network. By default it is enabled. */
export enum KnownPublicNetworkAccessFlag {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled. \
 * {@link KnownPublicNetworkAccessFlag} can be used interchangeably with PublicNetworkAccessFlag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccessFlag = string;

/** The response of a NetworkRuleSet list operation. */
export interface _NetworkRuleSetListResult {
  /** The NetworkRuleSet items on this page */
  value: NetworkRuleSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkRuleSetListResultDeserializer(item: any): _NetworkRuleSetListResult {
  return {
    value: networkRuleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkRuleSetArraySerializer(result: Array<NetworkRuleSet>): any[] {
  return result.map((item) => {
    return networkRuleSetSerializer(item);
  });
}

export function networkRuleSetArrayDeserializer(result: Array<NetworkRuleSet>): any[] {
  return result.map((item) => {
    return networkRuleSetDeserializer(item);
  });
}

/** The response of a PrivateLinkResource list operation. */
export interface PrivateLinkResourcesListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourcesListResultDeserializer(
  item: any,
): PrivateLinkResourcesListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Information of the private link resource. */
export interface PrivateLinkResource {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourceProperties;
  /** Fully qualified identifier of the resource. */
  id?: string;
  /** Name of the resource */
  name?: string;
  /** Type of the resource */
  type?: string;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Properties of PrivateLinkResource */
export interface PrivateLinkResourceProperties {
  groupId?: string;
  /** Required Members */
  requiredMembers?: string[];
  /** Required Zone Names */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Result of the List NetworkSecurityPerimeterConfiguration operation. */
export interface _NetworkSecurityPerimeterConfigurationList {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationList {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Description of subscription resource. */
export interface SBSubscription extends ProxyResource {
  /** Properties of subscriptions resource. */
  properties?: SBSubscriptionProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function sbSubscriptionSerializer(item: SBSubscription): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sbSubscriptionPropertiesSerializer(item["properties"]),
  };
}

export function sbSubscriptionDeserializer(item: any): SBSubscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbSubscriptionPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Description of Subscription Resource. */
export interface SBSubscriptionProperties {
  /** Number of messages. */
  readonly messageCount?: number;
  /** Exact time the message was created. */
  readonly createdAt?: Date;
  /** Last time there was a receive request to this subscription. */
  readonly accessedAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** Message count details */
  readonly countDetails?: MessageCountDetails;
  /** ISO 8061 lock duration timespan for the subscription. The default value is 1 minute. */
  lockDuration?: string;
  /** Value indicating if a subscription supports the concept of sessions. */
  requiresSession?: boolean;
  /** ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself. */
  defaultMessageTimeToLive?: string;
  /** Value that indicates whether a subscription has dead letter support on filter evaluation exceptions. */
  deadLetteringOnFilterEvaluationExceptions?: boolean;
  /** Value that indicates whether a subscription has dead letter support when a message expires. */
  deadLetteringOnMessageExpiration?: boolean;
  /** ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes. */
  duplicateDetectionHistoryTimeWindow?: string;
  /** Number of maximum deliveries. */
  maxDeliveryCount?: number;
  /** Enumerates the possible values for the status of a messaging entity. */
  status?: EntityStatus;
  /** Value that indicates whether server-side batched operations are enabled. */
  enableBatchedOperations?: boolean;
  /** ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes. */
  autoDeleteOnIdle?: string;
  /** Queue/Topic name to forward the messages */
  forwardTo?: string;
  /** Queue/Topic name to forward the Dead Letter message */
  forwardDeadLetteredMessagesTo?: string;
  /** Value that indicates whether the subscription has an affinity to the client id. */
  isClientAffine?: boolean;
  /** Gets and Sets Metadata of User. */
  userMetadata?: string;
  /** Properties specific to client affine subscriptions. */
  clientAffineProperties?: SBClientAffineProperties;
}

export function sbSubscriptionPropertiesSerializer(item: SBSubscriptionProperties): any {
  return {
    lockDuration: item["lockDuration"],
    requiresSession: item["requiresSession"],
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    deadLetteringOnFilterEvaluationExceptions: item["deadLetteringOnFilterEvaluationExceptions"],
    deadLetteringOnMessageExpiration: item["deadLetteringOnMessageExpiration"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    maxDeliveryCount: item["maxDeliveryCount"],
    status: item["status"],
    enableBatchedOperations: item["enableBatchedOperations"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    forwardTo: item["forwardTo"],
    forwardDeadLetteredMessagesTo: item["forwardDeadLetteredMessagesTo"],
    isClientAffine: item["isClientAffine"],
    userMetadata: item["userMetadata"],
    clientAffineProperties: !item["clientAffineProperties"]
      ? item["clientAffineProperties"]
      : sbClientAffinePropertiesSerializer(item["clientAffineProperties"]),
  };
}

export function sbSubscriptionPropertiesDeserializer(item: any): SBSubscriptionProperties {
  return {
    messageCount: item["messageCount"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    accessedAt: !item["accessedAt"] ? item["accessedAt"] : new Date(item["accessedAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    countDetails: !item["countDetails"]
      ? item["countDetails"]
      : messageCountDetailsDeserializer(item["countDetails"]),
    lockDuration: item["lockDuration"],
    requiresSession: item["requiresSession"],
    defaultMessageTimeToLive: item["defaultMessageTimeToLive"],
    deadLetteringOnFilterEvaluationExceptions: item["deadLetteringOnFilterEvaluationExceptions"],
    deadLetteringOnMessageExpiration: item["deadLetteringOnMessageExpiration"],
    duplicateDetectionHistoryTimeWindow: item["duplicateDetectionHistoryTimeWindow"],
    maxDeliveryCount: item["maxDeliveryCount"],
    status: item["status"],
    enableBatchedOperations: item["enableBatchedOperations"],
    autoDeleteOnIdle: item["autoDeleteOnIdle"],
    forwardTo: item["forwardTo"],
    forwardDeadLetteredMessagesTo: item["forwardDeadLetteredMessagesTo"],
    isClientAffine: item["isClientAffine"],
    userMetadata: item["userMetadata"],
    clientAffineProperties: !item["clientAffineProperties"]
      ? item["clientAffineProperties"]
      : sbClientAffinePropertiesDeserializer(item["clientAffineProperties"]),
  };
}

/** Properties specific to client affine subscriptions. */
export interface SBClientAffineProperties {
  /** Indicates the Client ID of the application that created the client-affine subscription. */
  clientId?: string;
  /** For client-affine subscriptions, this value indicates whether the subscription is durable or not. */
  isDurable?: boolean;
  /** For client-affine subscriptions, this value indicates whether the subscription is shared or not. */
  isShared?: boolean;
}

export function sbClientAffinePropertiesSerializer(item: SBClientAffineProperties): any {
  return {
    clientId: item["clientId"],
    isDurable: item["isDurable"],
    isShared: item["isShared"],
  };
}

export function sbClientAffinePropertiesDeserializer(item: any): SBClientAffineProperties {
  return {
    clientId: item["clientId"],
    isDurable: item["isDurable"],
    isShared: item["isShared"],
  };
}

/** The response of a SBSubscription list operation. */
export interface _SBSubscriptionListResult {
  /** The SBSubscription items on this page */
  value: SBSubscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbSubscriptionListResultDeserializer(item: any): _SBSubscriptionListResult {
  return {
    value: sbSubscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbSubscriptionArraySerializer(result: Array<SBSubscription>): any[] {
  return result.map((item) => {
    return sbSubscriptionSerializer(item);
  });
}

export function sbSubscriptionArrayDeserializer(result: Array<SBSubscription>): any[] {
  return result.map((item) => {
    return sbSubscriptionDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01-preview API version. */
  V20250501Preview = "2025-05-01-preview",
}
