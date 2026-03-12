// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  readonly value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
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

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
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

/** Represents Storage Task. */
export interface StorageTask extends TrackedResource {
  /** The managed service identity of the resource. */
  identity: ManagedServiceIdentity;
  /** Properties of the storage task. */
  properties: StorageTaskProperties;
}

export function storageTaskSerializer(item: StorageTask): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: managedServiceIdentitySerializer(item["identity"]),
    properties: storageTaskPropertiesSerializer(item["properties"]),
  };
}

export function storageTaskDeserializer(item: any): StorageTask {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: managedServiceIdentityDeserializer(item["identity"]),
    properties: storageTaskPropertiesDeserializer(item["properties"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
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

/** Properties of the storage task. */
export interface StorageTaskProperties {
  /** Storage task version. */
  readonly taskVersion?: number;
  /** Storage Task is enabled when set to true and disabled when set to false */
  enabled: boolean;
  /** Text that describes the purpose of the storage task */
  description: string;
  /** The storage task action that is executed */
  action: StorageTaskAction;
  /** Represents the provisioning state of the storage task. */
  readonly provisioningState?: ProvisioningState;
  /** The creation date and time of the storage task in UTC. */
  readonly creationTimeInUtc?: Date;
}

export function storageTaskPropertiesSerializer(item: StorageTaskProperties): any {
  return {
    enabled: item["enabled"],
    description: item["description"],
    action: storageTaskActionSerializer(item["action"]),
  };
}

export function storageTaskPropertiesDeserializer(item: any): StorageTaskProperties {
  return {
    taskVersion: item["taskVersion"],
    enabled: item["enabled"],
    description: item["description"],
    action: storageTaskActionDeserializer(item["action"]),
    provisioningState: item["provisioningState"],
    creationTimeInUtc: !item["creationTimeInUtc"]
      ? item["creationTimeInUtc"]
      : new Date(item["creationTimeInUtc"]),
  };
}

/** The storage task action represents conditional statements and operations to be performed on target objects. */
export interface StorageTaskAction {
  /** The if block of storage task operation */
  if: IfCondition;
  /** The else block of storage task operation */
  else?: ElseCondition;
}

export function storageTaskActionSerializer(item: StorageTaskAction): any {
  return {
    if: ifConditionSerializer(item["if"]),
    else: !item["else"] ? item["else"] : elseConditionSerializer(item["else"]),
  };
}

export function storageTaskActionDeserializer(item: any): StorageTaskAction {
  return {
    if: ifConditionDeserializer(item["if"]),
    else: !item["else"] ? item["else"] : elseConditionDeserializer(item["else"]),
  };
}

/** The if block of storage task operation */
export interface IfCondition {
  /** Condition predicate to evaluate each object. See https://aka.ms/storagetaskconditions for valid properties and operators. */
  condition: string;
  /** List of operations to execute when the condition predicate satisfies. */
  operations: StorageTaskOperation[];
}

export function ifConditionSerializer(item: IfCondition): any {
  return {
    condition: item["condition"],
    operations: storageTaskOperationArraySerializer(item["operations"]),
  };
}

export function ifConditionDeserializer(item: any): IfCondition {
  return {
    condition: item["condition"],
    operations: storageTaskOperationArrayDeserializer(item["operations"]),
  };
}

export function storageTaskOperationArraySerializer(result: Array<StorageTaskOperation>): any[] {
  return result.map((item) => {
    return storageTaskOperationSerializer(item);
  });
}

export function storageTaskOperationArrayDeserializer(result: Array<StorageTaskOperation>): any[] {
  return result.map((item) => {
    return storageTaskOperationDeserializer(item);
  });
}

/** Represents an operation to be performed on the object */
export interface StorageTaskOperation {
  /** The operation to be performed on the object. */
  name: StorageTaskOperationName;
  /** Key-value parameters for the operation. */
  parameters?: Record<string, string>;
  /** Action to be taken when the operation is successful for a object. */
  onSuccess?: OnSuccess;
  /** Action to be taken when the operation fails for a object. */
  onFailure?: OnFailure;
}

export function storageTaskOperationSerializer(item: StorageTaskOperation): any {
  return {
    name: item["name"],
    parameters: item["parameters"],
    onSuccess: item["onSuccess"],
    onFailure: item["onFailure"],
  };
}

export function storageTaskOperationDeserializer(item: any): StorageTaskOperation {
  return {
    name: item["name"],
    parameters: item["parameters"],
    onSuccess: item["onSuccess"],
    onFailure: item["onFailure"],
  };
}

/** The operation to be performed on the object. */
export enum KnownStorageTaskOperationName {
  SetBlobTier = "SetBlobTier",
  SetBlobTags = "SetBlobTags",
  SetBlobImmutabilityPolicy = "SetBlobImmutabilityPolicy",
  SetBlobLegalHold = "SetBlobLegalHold",
  SetBlobExpiry = "SetBlobExpiry",
  DeleteBlob = "DeleteBlob",
  UndeleteBlob = "UndeleteBlob",
}

/**
 * The operation to be performed on the object. \
 * {@link KnownStorageTaskOperationName} can be used interchangeably with StorageTaskOperationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SetBlobTier** \
 * **SetBlobTags** \
 * **SetBlobImmutabilityPolicy** \
 * **SetBlobLegalHold** \
 * **SetBlobExpiry** \
 * **DeleteBlob** \
 * **UndeleteBlob**
 */
export type StorageTaskOperationName = string;

/** Action to be taken when the operation is successful for a object. */
export enum KnownOnSuccess {
  Continue = "continue",
}

/**
 * Action to be taken when the operation is successful for a object. \
 * {@link KnownOnSuccess} can be used interchangeably with OnSuccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **continue**
 */
export type OnSuccess = string;

/** Action to be taken when the operation fails for a object. */
export enum KnownOnFailure {
  Break = "break",
}

/**
 * Action to be taken when the operation fails for a object. \
 * {@link KnownOnFailure} can be used interchangeably with OnFailure,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **break**
 */
export type OnFailure = string;

/** The else block of storage task operation */
export interface ElseCondition {
  /** List of operations to execute in the else block */
  operations: StorageTaskOperation[];
}

export function elseConditionSerializer(item: ElseCondition): any {
  return {
    operations: storageTaskOperationArraySerializer(item["operations"]),
  };
}

export function elseConditionDeserializer(item: any): ElseCondition {
  return {
    operations: storageTaskOperationArrayDeserializer(item["operations"]),
  };
}

/** Represents the provisioning state of the storage task. */
export enum KnownProvisioningState {
  ValidateSubscriptionQuotaBegin = "ValidateSubscriptionQuotaBegin",
  ValidateSubscriptionQuotaEnd = "ValidateSubscriptionQuotaEnd",
  Accepted = "Accepted",
  Creating = "Creating",
  Succeeded = "Succeeded",
  Deleting = "Deleting",
  Canceled = "Canceled",
  Failed = "Failed",
}

/**
 * Represents the provisioning state of the storage task. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ValidateSubscriptionQuotaBegin** \
 * **ValidateSubscriptionQuotaEnd** \
 * **Accepted** \
 * **Creating** \
 * **Succeeded** \
 * **Deleting** \
 * **Canceled** \
 * **Failed**
 */
export type ProvisioningState = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Parameters of the storage task update request */
export interface StorageTaskUpdateParameters {
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
  /** Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater in length than 128 characters and a value no greater in length than 256 characters. */
  tags?: Record<string, string>;
  /** Properties of the storage task. */
  properties?: StorageTaskUpdateProperties;
}

export function storageTaskUpdateParametersSerializer(item: StorageTaskUpdateParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of the storage task. */
export interface StorageTaskUpdateProperties {
  /** Storage task version. */
  readonly taskVersion?: number;
  /** Storage Task is enabled when set to true and disabled when set to false */
  enabled?: boolean;
  /** Text that describes the purpose of the storage task */
  description?: string;
  /** The storage task action that is executed */
  action?: StorageTaskAction;
  /** Represents the provisioning state of the storage task. */
  readonly provisioningState?: ProvisioningState;
  /** The creation date and time of the storage task in UTC. */
  readonly creationTimeInUtc?: Date;
}

export function storageTaskUpdatePropertiesSerializer(item: StorageTaskUpdateProperties): any {
  return {
    enabled: item["enabled"],
    description: item["description"],
    action: !item["action"] ? item["action"] : storageTaskActionSerializer(item["action"]),
  };
}

/** The response from the List Storage Task operation. */
export interface _StorageTasksListResult {
  /** Gets the list of storage tasks and their properties. */
  readonly value: StorageTask[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _storageTasksListResultDeserializer(item: any): _StorageTasksListResult {
  return {
    value: storageTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTaskArraySerializer(result: Array<StorageTask>): any[] {
  return result.map((item) => {
    return storageTaskSerializer(item);
  });
}

export function storageTaskArrayDeserializer(result: Array<StorageTask>): any[] {
  return result.map((item) => {
    return storageTaskDeserializer(item);
  });
}

/** Storage Task Preview Action. */
export interface StorageTaskPreviewAction {
  /** Properties of the storage task preview. */
  properties: StorageTaskPreviewActionProperties;
}

export function storageTaskPreviewActionSerializer(item: StorageTaskPreviewAction): any {
  return {
    properties: storageTaskPreviewActionPropertiesSerializer(item["properties"]),
  };
}

export function storageTaskPreviewActionDeserializer(item: any): StorageTaskPreviewAction {
  return {
    properties: storageTaskPreviewActionPropertiesDeserializer(item["properties"]),
  };
}

/** Storage task preview action properties. */
export interface StorageTaskPreviewActionProperties {
  /** Properties of a sample container to test for a match with the preview action. */
  container: StorageTaskPreviewContainerProperties;
  /** Properties of some sample blobs in the container to test for matches with the preview action. */
  blobs: StorageTaskPreviewBlobProperties[];
  /** Preview action to test */
  action: StorageTaskPreviewActionCondition;
}

export function storageTaskPreviewActionPropertiesSerializer(
  item: StorageTaskPreviewActionProperties,
): any {
  return {
    container: storageTaskPreviewContainerPropertiesSerializer(item["container"]),
    blobs: storageTaskPreviewBlobPropertiesArraySerializer(item["blobs"]),
    action: storageTaskPreviewActionConditionSerializer(item["action"]),
  };
}

export function storageTaskPreviewActionPropertiesDeserializer(
  item: any,
): StorageTaskPreviewActionProperties {
  return {
    container: storageTaskPreviewContainerPropertiesDeserializer(item["container"]),
    blobs: storageTaskPreviewBlobPropertiesArrayDeserializer(item["blobs"]),
    action: storageTaskPreviewActionConditionDeserializer(item["action"]),
  };
}

/** Storage task preview container properties */
export interface StorageTaskPreviewContainerProperties {
  /** Name of test container */
  name?: string;
  /** metadata key value pairs to be tested for a match against the provided condition. */
  metadata?: StorageTaskPreviewKeyValueProperties[];
}

export function storageTaskPreviewContainerPropertiesSerializer(
  item: StorageTaskPreviewContainerProperties,
): any {
  return {
    name: item["name"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : storageTaskPreviewKeyValuePropertiesArraySerializer(item["metadata"]),
  };
}

export function storageTaskPreviewContainerPropertiesDeserializer(
  item: any,
): StorageTaskPreviewContainerProperties {
  return {
    name: item["name"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : storageTaskPreviewKeyValuePropertiesArrayDeserializer(item["metadata"]),
  };
}

export function storageTaskPreviewKeyValuePropertiesArraySerializer(
  result: Array<StorageTaskPreviewKeyValueProperties>,
): any[] {
  return result.map((item) => {
    return storageTaskPreviewKeyValuePropertiesSerializer(item);
  });
}

export function storageTaskPreviewKeyValuePropertiesArrayDeserializer(
  result: Array<StorageTaskPreviewKeyValueProperties>,
): any[] {
  return result.map((item) => {
    return storageTaskPreviewKeyValuePropertiesDeserializer(item);
  });
}

/** Storage task preview object key value pair properties. */
export interface StorageTaskPreviewKeyValueProperties {
  /** Represents the key property of the pair. */
  key?: string;
  /** Represents the value property of the pair. */
  value?: string;
}

export function storageTaskPreviewKeyValuePropertiesSerializer(
  item: StorageTaskPreviewKeyValueProperties,
): any {
  return { key: item["key"], value: item["value"] };
}

export function storageTaskPreviewKeyValuePropertiesDeserializer(
  item: any,
): StorageTaskPreviewKeyValueProperties {
  return {
    key: item["key"],
    value: item["value"],
  };
}

export function storageTaskPreviewBlobPropertiesArraySerializer(
  result: Array<StorageTaskPreviewBlobProperties>,
): any[] {
  return result.map((item) => {
    return storageTaskPreviewBlobPropertiesSerializer(item);
  });
}

export function storageTaskPreviewBlobPropertiesArrayDeserializer(
  result: Array<StorageTaskPreviewBlobProperties>,
): any[] {
  return result.map((item) => {
    return storageTaskPreviewBlobPropertiesDeserializer(item);
  });
}

/** Storage task preview container properties */
export interface StorageTaskPreviewBlobProperties {
  /** Name of test blob */
  name?: string;
  /** properties key value pairs to be tested for a match against the provided condition. */
  properties?: StorageTaskPreviewKeyValueProperties[];
  /** metadata key value pairs to be tested for a match against the provided condition. */
  metadata?: StorageTaskPreviewKeyValueProperties[];
  /** tags key value pairs to be tested for a match against the provided condition. */
  tags?: StorageTaskPreviewKeyValueProperties[];
  /** Represents the condition block name that matched blob properties. */
  readonly matchedBlock?: MatchedBlockName;
}

export function storageTaskPreviewBlobPropertiesSerializer(
  item: StorageTaskPreviewBlobProperties,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskPreviewKeyValuePropertiesArraySerializer(item["properties"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : storageTaskPreviewKeyValuePropertiesArraySerializer(item["metadata"]),
    tags: !item["tags"]
      ? item["tags"]
      : storageTaskPreviewKeyValuePropertiesArraySerializer(item["tags"]),
  };
}

export function storageTaskPreviewBlobPropertiesDeserializer(
  item: any,
): StorageTaskPreviewBlobProperties {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskPreviewKeyValuePropertiesArrayDeserializer(item["properties"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : storageTaskPreviewKeyValuePropertiesArrayDeserializer(item["metadata"]),
    tags: !item["tags"]
      ? item["tags"]
      : storageTaskPreviewKeyValuePropertiesArrayDeserializer(item["tags"]),
    matchedBlock: item["matchedBlock"],
  };
}

/** Represents the condition block name that matched blob properties. */
export enum KnownMatchedBlockName {
  If = "If",
  Else = "Else",
  None = "None",
}

/**
 * Represents the condition block name that matched blob properties. \
 * {@link KnownMatchedBlockName} can be used interchangeably with MatchedBlockName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **If** \
 * **Else** \
 * **None**
 */
export type MatchedBlockName = string;

/** Represents the storage task conditions to be tested for a match with container and blob properties. */
export interface StorageTaskPreviewActionCondition {
  /** The condition to be tested for a match with container and blob properties. */
  if: StorageTaskPreviewActionIfCondition;
  /** Specify whether the else block is present in the condition. */
  elseBlockExists: boolean;
}

export function storageTaskPreviewActionConditionSerializer(
  item: StorageTaskPreviewActionCondition,
): any {
  return {
    if: storageTaskPreviewActionIfConditionSerializer(item["if"]),
    elseBlockExists: item["elseBlockExists"],
  };
}

export function storageTaskPreviewActionConditionDeserializer(
  item: any,
): StorageTaskPreviewActionCondition {
  return {
    if: storageTaskPreviewActionIfConditionDeserializer(item["if"]),
    elseBlockExists: item["elseBlockExists"],
  };
}

/** Represents storage task preview action condition. */
export interface StorageTaskPreviewActionIfCondition {
  /** Storage task condition to bes tested for a match. */
  condition?: string;
}

export function storageTaskPreviewActionIfConditionSerializer(
  item: StorageTaskPreviewActionIfCondition,
): any {
  return { condition: item["condition"] };
}

export function storageTaskPreviewActionIfConditionDeserializer(
  item: any,
): StorageTaskPreviewActionIfCondition {
  return {
    condition: item["condition"],
  };
}

/** Fetch Storage Tasks Run Summary. */
export interface _StorageTaskReportSummary {
  /** Gets storage tasks run result summary. */
  readonly value: StorageTaskReportInstance[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _storageTaskReportSummaryDeserializer(item: any): _StorageTaskReportSummary {
  return {
    value: storageTaskReportInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTaskReportInstanceArrayDeserializer(
  result: Array<StorageTaskReportInstance>,
): any[] {
  return result.map((item) => {
    return storageTaskReportInstanceDeserializer(item);
  });
}

/** Storage Tasks run report instance */
export interface StorageTaskReportInstance extends ProxyResource {
  /** Storage task execution report for a run instance. */
  properties?: StorageTaskReportProperties;
}

export function storageTaskReportInstanceDeserializer(item: any): StorageTaskReportInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskReportPropertiesDeserializer(item["properties"]),
  };
}

/** Storage task execution report for a run instance. */
export interface StorageTaskReportProperties {
  /** Resource ID of the Storage Task Assignment associated with this reported run. */
  readonly taskAssignmentId?: string;
  /** Resource ID of the Storage Account where this reported run executed. */
  readonly storageAccountId?: string;
  /** Start time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly startTime?: string;
  /** End time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly finishTime?: string;
  /** Total number of objects that meet the condition as defined in the storage task assignment execution context. Filter options such as objectsTargetedCount gt 50 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsTargetedCount?: string;
  /** Total number of objects that meet the storage tasks condition and were operated upon. Filter options such as objectsOperatedOnCount ge 100 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsOperatedOnCount?: string;
  /** Total number of objects where task operation failed when was attempted. Filter options such as objectFailedCount eq 0 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectFailedCount?: string;
  /** Total number of objects where task operation succeeded when was attempted.Filter options such as objectsSucceededCount gt 150 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/en-us/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsSucceededCount?: string;
  /** Well known Azure Storage error code that represents the error encountered during execution of the run instance. */
  readonly runStatusError?: string;
  /** Represents the status of the execution. */
  readonly runStatusEnum?: RunStatusEnum;
  /** Full path to the verbose report stored in the reporting container as specified in the assignment execution context for the storage account. */
  readonly summaryReportPath?: string;
  /** Resource ID of the Storage Task applied during this run. */
  readonly taskId?: string;
  /** Storage Task Version */
  readonly taskVersion?: string;
  /** Represents the overall result of the execution for the run instance */
  readonly runResult?: RunResult;
}

export function storageTaskReportPropertiesDeserializer(item: any): StorageTaskReportProperties {
  return {
    taskAssignmentId: item["taskAssignmentId"],
    storageAccountId: item["storageAccountId"],
    startTime: item["startTime"],
    finishTime: item["finishTime"],
    objectsTargetedCount: item["objectsTargetedCount"],
    objectsOperatedOnCount: item["objectsOperatedOnCount"],
    objectFailedCount: item["objectFailedCount"],
    objectsSucceededCount: item["objectsSucceededCount"],
    runStatusError: item["runStatusError"],
    runStatusEnum: item["runStatusEnum"],
    summaryReportPath: item["summaryReportPath"],
    taskId: item["taskId"],
    taskVersion: item["taskVersion"],
    runResult: item["runResult"],
  };
}

/** Represents the status of the execution. */
export enum KnownRunStatusEnum {
  InProgress = "InProgress",
  Finished = "Finished",
}

/**
 * Represents the status of the execution. \
 * {@link KnownRunStatusEnum} can be used interchangeably with RunStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Finished**
 */
export type RunStatusEnum = string;

/** Represents the overall result of the execution for the run instance */
export enum KnownRunResult {
  Succeeded = "Succeeded",
  Failed = "Failed",
}

/**
 * Represents the overall result of the execution for the run instance \
 * {@link KnownRunResult} can be used interchangeably with RunResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed**
 */
export type RunResult = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The response from the List Storage Tasks operation. */
export interface _StorageTaskAssignmentsListResult {
  /** List of Storage Task Assignment Resource IDs associated with this Storage Task. */
  readonly value: StorageTaskAssignment[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _storageTaskAssignmentsListResultDeserializer(
  item: any,
): _StorageTaskAssignmentsListResult {
  return {
    value: storageTaskAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTaskAssignmentArrayDeserializer(
  result: Array<StorageTaskAssignment>,
): any[] {
  return result.map((item) => {
    return storageTaskAssignmentDeserializer(item);
  });
}

/** Storage Task Assignment associated with this Storage Task. */
export interface StorageTaskAssignment {
  /** Resource ID of the Storage Task Assignment. */
  readonly id?: string;
}

export function storageTaskAssignmentDeserializer(item: any): StorageTaskAssignment {
  return {
    id: item["id"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-01-01 API version. */
  V20230101 = "2023-01-01",
}
