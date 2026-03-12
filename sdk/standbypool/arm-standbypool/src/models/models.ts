// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** A StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolResourceProperties;
}

export function standbyVirtualMachinePoolResourceSerializer(
  item: StandbyVirtualMachinePoolResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : standbyVirtualMachinePoolResourcePropertiesSerializer(item["properties"]),
  };
}

export function standbyVirtualMachinePoolResourceDeserializer(
  item: any,
): StandbyVirtualMachinePoolResource {
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
      : standbyVirtualMachinePoolResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Details of the StandbyVirtualMachinePool. */
export interface StandbyVirtualMachinePoolResourceProperties {
  /** Specifies the elasticity profile of the standby virtual machine pools. */
  elasticityProfile?: StandbyVirtualMachinePoolElasticityProfile;
  /** Specifies the desired state of virtual machines in the pool. */
  virtualMachineState: VirtualMachineState;
  /** Specifies the fully qualified resource ID of a virtual machine scale set the pool is attached to. */
  attachedVirtualMachineScaleSetId?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function standbyVirtualMachinePoolResourcePropertiesSerializer(
  item: StandbyVirtualMachinePoolResourceProperties,
): any {
  return {
    elasticityProfile: !item["elasticityProfile"]
      ? item["elasticityProfile"]
      : standbyVirtualMachinePoolElasticityProfileSerializer(item["elasticityProfile"]),
    virtualMachineState: item["virtualMachineState"],
    attachedVirtualMachineScaleSetId: item["attachedVirtualMachineScaleSetId"],
  };
}

export function standbyVirtualMachinePoolResourcePropertiesDeserializer(
  item: any,
): StandbyVirtualMachinePoolResourceProperties {
  return {
    elasticityProfile: !item["elasticityProfile"]
      ? item["elasticityProfile"]
      : standbyVirtualMachinePoolElasticityProfileDeserializer(item["elasticityProfile"]),
    virtualMachineState: item["virtualMachineState"],
    attachedVirtualMachineScaleSetId: item["attachedVirtualMachineScaleSetId"],
    provisioningState: item["provisioningState"],
  };
}

/** Details of the elasticity profile. */
export interface StandbyVirtualMachinePoolElasticityProfile {
  /** Specifies the maximum number of virtual machines in the standby virtual machine pool. */
  maxReadyCapacity: number;
  /** Specifies the desired minimum number of virtual machines in the standby virtual machine pool. MinReadyCapacity cannot exceed MaxReadyCapacity. */
  minReadyCapacity?: number;
}

export function standbyVirtualMachinePoolElasticityProfileSerializer(
  item: StandbyVirtualMachinePoolElasticityProfile,
): any {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    minReadyCapacity: item["minReadyCapacity"],
  };
}

export function standbyVirtualMachinePoolElasticityProfileDeserializer(
  item: any,
): StandbyVirtualMachinePoolElasticityProfile {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    minReadyCapacity: item["minReadyCapacity"],
  };
}

/** State of standby virtual machines */
export enum KnownVirtualMachineState {
  /** The virtual machine is up and running. */
  Running = "Running",
  /** The virtual machine has released the lease on the underlying hardware and is powered off. */
  Deallocated = "Deallocated",
  /** The virtual machine has released the lease on the underlying hardware and is powered off. Memory contents of the VM are stored in the OS disk.  When started again, applications and processes that were previously running in your VM resume from the state prior to hibernation. */
  Hibernated = "Hibernated",
}

/**
 * State of standby virtual machines \
 * {@link KnownVirtualMachineState} can be used interchangeably with VirtualMachineState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The virtual machine is up and running. \
 * **Deallocated**: The virtual machine has released the lease on the underlying hardware and is powered off. \
 * **Hibernated**: The virtual machine has released the lease on the underlying hardware and is powered off. Memory contents of the VM are stored in the OS disk.  When started again, applications and processes that were previously running in your VM resume from the state prior to hibernation.
 */
export type VirtualMachineState = string;

/** Provisioning state */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: Resource is being deleted.
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

/** The type used for update operations of the StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolResourceUpdateProperties;
}

export function standbyVirtualMachinePoolResourceUpdateSerializer(
  item: StandbyVirtualMachinePoolResourceUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : standbyVirtualMachinePoolResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResourceUpdateProperties {
  /** Specifies the elasticity profile of the standby virtual machine pools. */
  elasticityProfile?: StandbyVirtualMachinePoolElasticityProfile;
  /** Specifies the desired state of virtual machines in the pool. */
  virtualMachineState?: VirtualMachineState;
  /** Specifies the fully qualified resource ID of a virtual machine scale set the pool is attached to. */
  attachedVirtualMachineScaleSetId?: string;
}

export function standbyVirtualMachinePoolResourceUpdatePropertiesSerializer(
  item: StandbyVirtualMachinePoolResourceUpdateProperties,
): any {
  return {
    elasticityProfile: !item["elasticityProfile"]
      ? item["elasticityProfile"]
      : standbyVirtualMachinePoolElasticityProfileSerializer(item["elasticityProfile"]),
    virtualMachineState: item["virtualMachineState"],
    attachedVirtualMachineScaleSetId: item["attachedVirtualMachineScaleSetId"],
  };
}

/** The response of a StandbyVirtualMachinePoolResource list operation. */
export interface _StandbyVirtualMachinePoolResourceListResult {
  /** The StandbyVirtualMachinePoolResource items on this page */
  value: StandbyVirtualMachinePoolResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _standbyVirtualMachinePoolResourceListResultDeserializer(
  item: any,
): _StandbyVirtualMachinePoolResourceListResult {
  return {
    value: standbyVirtualMachinePoolResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standbyVirtualMachinePoolResourceArraySerializer(
  result: Array<StandbyVirtualMachinePoolResource>,
): any[] {
  return result.map((item) => {
    return standbyVirtualMachinePoolResourceSerializer(item);
  });
}

export function standbyVirtualMachinePoolResourceArrayDeserializer(
  result: Array<StandbyVirtualMachinePoolResource>,
): any[] {
  return result.map((item) => {
    return standbyVirtualMachinePoolResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface StandbyVirtualMachineResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachineResourceProperties;
}

export function standbyVirtualMachineResourceDeserializer(
  item: any,
): StandbyVirtualMachineResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : standbyVirtualMachineResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Details of the StandbyVirtualMachine. */
export interface StandbyVirtualMachineResourceProperties {
  /** Resource id of the virtual machine. */
  virtualMachineResourceId: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function standbyVirtualMachineResourcePropertiesDeserializer(
  item: any,
): StandbyVirtualMachineResourceProperties {
  return {
    virtualMachineResourceId: item["virtualMachineResourceId"],
    provisioningState: item["provisioningState"],
  };
}

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

/** The response of a StandbyVirtualMachineResource list operation. */
export interface _StandbyVirtualMachineResourceListResult {
  /** The StandbyVirtualMachineResource items on this page */
  value: StandbyVirtualMachineResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _standbyVirtualMachineResourceListResultDeserializer(
  item: any,
): _StandbyVirtualMachineResourceListResult {
  return {
    value: standbyVirtualMachineResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standbyVirtualMachineResourceArrayDeserializer(
  result: Array<StandbyVirtualMachineResource>,
): any[] {
  return result.map((item) => {
    return standbyVirtualMachineResourceDeserializer(item);
  });
}

/** Contains information about a standby virtual machine pool as last known by the StandbyPool resource provider. */
export interface StandbyVirtualMachinePoolRuntimeViewResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolRuntimeViewResourceProperties;
}

export function standbyVirtualMachinePoolRuntimeViewResourceDeserializer(
  item: any,
): StandbyVirtualMachinePoolRuntimeViewResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : standbyVirtualMachinePoolRuntimeViewResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Contains information about a standby pool as last known by the StandbyPool resource provider. */
export interface StandbyVirtualMachinePoolRuntimeViewResourceProperties {
  /** A list containing the counts of virtual machines in each possible power state for each zone if enabled, as known by the StandbyPool resource provider. If zones are not enabled on the attached VMSS, the list will contain a single entry without zone values. Note: any resources in the Running state may still be installing extensions / not fully provisioned. */
  readonly instanceCountSummary: VirtualMachineInstanceCountSummary[];
  /** Display status of the standby pool */
  readonly status?: PoolStatus;
  /** Displays the provisioning state of the standby pool */
  readonly provisioningState?: ProvisioningState;
  /** Displays prediction information of the standby pool */
  readonly prediction?: StandbyVirtualMachinePoolPrediction;
}

export function standbyVirtualMachinePoolRuntimeViewResourcePropertiesDeserializer(
  item: any,
): StandbyVirtualMachinePoolRuntimeViewResourceProperties {
  return {
    instanceCountSummary: virtualMachineInstanceCountSummaryArrayDeserializer(
      item["instanceCountSummary"],
    ),
    status: !item["status"] ? item["status"] : poolStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
    prediction: !item["prediction"]
      ? item["prediction"]
      : standbyVirtualMachinePoolPredictionDeserializer(item["prediction"]),
  };
}

export function virtualMachineInstanceCountSummaryArrayDeserializer(
  result: Array<VirtualMachineInstanceCountSummary>,
): any[] {
  return result.map((item) => {
    return virtualMachineInstanceCountSummaryDeserializer(item);
  });
}

/** Contains the counts of VMs in each power state in a given zone, fault domain, as known by the StandbyPool resource provider. Note: any resources in the Running state may still be installing extensions / not fully provisioned. */
export interface VirtualMachineInstanceCountSummary {
  /** The zone that the provided counts are in. It will not have a value if zones are not enabled on the attached VMSS. */
  zone?: number;
  /** The count of pooled virtual machines in each state for the given zone. */
  instanceCountsByState: PoolVirtualMachineStateCount[];
}

export function virtualMachineInstanceCountSummaryDeserializer(
  item: any,
): VirtualMachineInstanceCountSummary {
  return {
    zone: item["zone"],
    instanceCountsByState: poolVirtualMachineStateCountArrayDeserializer(
      item["instanceCountsByState"],
    ),
  };
}

export function poolVirtualMachineStateCountArrayDeserializer(
  result: Array<PoolVirtualMachineStateCount>,
): any[] {
  return result.map((item) => {
    return poolVirtualMachineStateCountDeserializer(item);
  });
}

/** Displays the counts of pooled virtual machines in each state, as known by the StandbyPool resource provider. */
export interface PoolVirtualMachineStateCount {
  /** The state that the pooled virtual machines count is for. */
  state: PoolVirtualMachineState;
  /** The count of pooled virtual machines in the given state. */
  count: number;
}

export function poolVirtualMachineStateCountDeserializer(item: any): PoolVirtualMachineStateCount {
  return {
    state: item["state"],
    count: item["count"],
  };
}

/** The state of the pooled virtual machines. */
export enum KnownPoolVirtualMachineState {
  /** The virtual machine is up and running. */
  Running = "Running",
  /** The virtual machine is creating. */
  Creating = "Creating",
  /** The virtual machine is starting. */
  Starting = "Starting",
  /** The virtual machine is deleting. */
  Deleting = "Deleting",
  /** The virtual machine has released the lease on the underlying hardware and is powered off. */
  Deallocated = "Deallocated",
  /** The virtual machine is releasing the lease on the underlying hardware and is powered off. */
  Deallocating = "Deallocating",
  /** The virtual machine has released the lease on the underlying hardware and is powered off. Memory contents of the VM are stored in the OS disk. When started again, applications and processes that were previously running in your VM resume from the state prior to hibernation. */
  Hibernated = "Hibernated",
  /** The virtual machine is hibernating. */
  Hibernating = "Hibernating",
}

/**
 * The state of the pooled virtual machines. \
 * {@link KnownPoolVirtualMachineState} can be used interchangeably with PoolVirtualMachineState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The virtual machine is up and running. \
 * **Creating**: The virtual machine is creating. \
 * **Starting**: The virtual machine is starting. \
 * **Deleting**: The virtual machine is deleting. \
 * **Deallocated**: The virtual machine has released the lease on the underlying hardware and is powered off. \
 * **Deallocating**: The virtual machine is releasing the lease on the underlying hardware and is powered off. \
 * **Hibernated**: The virtual machine has released the lease on the underlying hardware and is powered off. Memory contents of the VM are stored in the OS disk. When started again, applications and processes that were previously running in your VM resume from the state prior to hibernation. \
 * **Hibernating**: The virtual machine is hibernating.
 */
export type PoolVirtualMachineState = string;

/** Displays StandbyPool status. */
export interface PoolStatus {
  /** Displays the healthy state of the StandbyPool. */
  readonly code: HealthStateCode;
  /** Displays the StandbyPool health state details. */
  readonly message?: string;
}

export function poolStatusDeserializer(item: any): PoolStatus {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** StandbyPool health state. */
export enum KnownHealthStateCode {
  /** StandbyPool is in healthy state. */
  Healthy = "HealthState/healthy",
  /** StandbyPool is in degraded state. */
  Degraded = "HealthState/degraded",
}

/**
 * StandbyPool health state. \
 * {@link KnownHealthStateCode} can be used interchangeably with HealthStateCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HealthState\/healthy**: StandbyPool is in healthy state. \
 * **HealthState\/degraded**: StandbyPool is in degraded state.
 */
export type HealthStateCode = string;

/** Displays prediction information of the standby pool. */
export interface StandbyVirtualMachinePoolPrediction {
  /** Displays the forecast information of the standby pool. */
  readonly forecastValues: StandbyVirtualMachinePoolForecastValues;
  /** Displays the UTC timestamp of when the prediction was retrieved for the standby pool. */
  readonly forecastStartTime: Date;
  /** Displays additional information for the prediction of the standby pool. */
  readonly forecastInfo: string;
}

export function standbyVirtualMachinePoolPredictionDeserializer(
  item: any,
): StandbyVirtualMachinePoolPrediction {
  return {
    forecastValues: standbyVirtualMachinePoolForecastValuesDeserializer(item["forecastValues"]),
    forecastStartTime: new Date(item["forecastStartTime"]),
    forecastInfo: item["forecastInfo"],
  };
}

/** Displays the forecast information of the standby pool. */
export interface StandbyVirtualMachinePoolForecastValues {
  /** Displays the predicted count of instances to be requested from the standby pool. */
  readonly instancesRequestedCount: number[];
}

export function standbyVirtualMachinePoolForecastValuesDeserializer(
  item: any,
): StandbyVirtualMachinePoolForecastValues {
  return {
    instancesRequestedCount: item["instancesRequestedCount"].map((p: any) => {
      return p;
    }),
  };
}

/** The response of a StandbyVirtualMachinePoolRuntimeViewResource list operation. */
export interface _StandbyVirtualMachinePoolRuntimeViewResourceListResult {
  /** The StandbyVirtualMachinePoolRuntimeViewResource items on this page */
  value: StandbyVirtualMachinePoolRuntimeViewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _standbyVirtualMachinePoolRuntimeViewResourceListResultDeserializer(
  item: any,
): _StandbyVirtualMachinePoolRuntimeViewResourceListResult {
  return {
    value: standbyVirtualMachinePoolRuntimeViewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standbyVirtualMachinePoolRuntimeViewResourceArrayDeserializer(
  result: Array<StandbyVirtualMachinePoolRuntimeViewResource>,
): any[] {
  return result.map((item) => {
    return standbyVirtualMachinePoolRuntimeViewResourceDeserializer(item);
  });
}

/** A StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolResourceProperties;
}

export function standbyContainerGroupPoolResourceSerializer(
  item: StandbyContainerGroupPoolResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : standbyContainerGroupPoolResourcePropertiesSerializer(item["properties"]),
  };
}

export function standbyContainerGroupPoolResourceDeserializer(
  item: any,
): StandbyContainerGroupPoolResource {
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
      : standbyContainerGroupPoolResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Details of the StandbyContainerGroupPool. */
export interface StandbyContainerGroupPoolResourceProperties {
  /** Specifies elasticity profile of standby container group pools. */
  elasticityProfile: StandbyContainerGroupPoolElasticityProfile;
  /** Specifies container group properties of standby container group pools. */
  containerGroupProperties: ContainerGroupProperties;
  /** Specifies zones of standby container group pools. */
  zones?: string[];
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function standbyContainerGroupPoolResourcePropertiesSerializer(
  item: StandbyContainerGroupPoolResourceProperties,
): any {
  return {
    elasticityProfile: standbyContainerGroupPoolElasticityProfileSerializer(
      item["elasticityProfile"],
    ),
    containerGroupProperties: containerGroupPropertiesSerializer(item["containerGroupProperties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function standbyContainerGroupPoolResourcePropertiesDeserializer(
  item: any,
): StandbyContainerGroupPoolResourceProperties {
  return {
    elasticityProfile: standbyContainerGroupPoolElasticityProfileDeserializer(
      item["elasticityProfile"],
    ),
    containerGroupProperties: containerGroupPropertiesDeserializer(
      item["containerGroupProperties"],
    ),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Specifies the elasticity profile of the standby container group pools. */
export interface StandbyContainerGroupPoolElasticityProfile {
  /** Specifies maximum number of standby container groups in the standby pool. */
  maxReadyCapacity: number;
  /** Specifies refill policy of the pool. */
  refillPolicy?: RefillPolicy;
}

export function standbyContainerGroupPoolElasticityProfileSerializer(
  item: StandbyContainerGroupPoolElasticityProfile,
): any {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    refillPolicy: item["refillPolicy"],
  };
}

export function standbyContainerGroupPoolElasticityProfileDeserializer(
  item: any,
): StandbyContainerGroupPoolElasticityProfile {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    refillPolicy: item["refillPolicy"],
  };
}

/** Refill policy of standby pool */
export enum KnownRefillPolicy {
  /** A refill policy that standby pool is automatically refilled to maintain maxReadyCapacity. */
  Always = "always",
}

/**
 * Refill policy of standby pool \
 * {@link KnownRefillPolicy} can be used interchangeably with RefillPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **always**: A refill policy that standby pool is automatically refilled to maintain maxReadyCapacity.
 */
export type RefillPolicy = string;

/** Details of the ContainerGroupProperties. */
export interface ContainerGroupProperties {
  /** Specifies container group profile of standby container groups. */
  containerGroupProfile: ContainerGroupProfile;
  /** Specifies subnet Ids for container group. */
  subnetIds?: Subnet[];
}

export function containerGroupPropertiesSerializer(item: ContainerGroupProperties): any {
  return {
    containerGroupProfile: containerGroupProfileSerializer(item["containerGroupProfile"]),
    subnetIds: !item["subnetIds"] ? item["subnetIds"] : subnetArraySerializer(item["subnetIds"]),
  };
}

export function containerGroupPropertiesDeserializer(item: any): ContainerGroupProperties {
  return {
    containerGroupProfile: containerGroupProfileDeserializer(item["containerGroupProfile"]),
    subnetIds: !item["subnetIds"] ? item["subnetIds"] : subnetArrayDeserializer(item["subnetIds"]),
  };
}

/** Details of the ContainerGroupProfile. */
export interface ContainerGroupProfile {
  /** Specifies container group profile id of standby container groups. */
  id: string;
  /** Specifies revision of container group profile. */
  revision?: number;
}

export function containerGroupProfileSerializer(item: ContainerGroupProfile): any {
  return { id: item["id"], revision: item["revision"] };
}

export function containerGroupProfileDeserializer(item: any): ContainerGroupProfile {
  return {
    id: item["id"],
    revision: item["revision"],
  };
}

export function subnetArraySerializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetSerializer(item);
  });
}

export function subnetArrayDeserializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetDeserializer(item);
  });
}

/** Subnet of container group */
export interface Subnet {
  /** Specifies ARM resource id of the subnet. */
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

/** The type used for update operations of the StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolResourceUpdateProperties;
}

export function standbyContainerGroupPoolResourceUpdateSerializer(
  item: StandbyContainerGroupPoolResourceUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : standbyContainerGroupPoolResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResourceUpdateProperties {
  /** Specifies elasticity profile of standby container group pools. */
  elasticityProfile?: StandbyContainerGroupPoolElasticityProfile;
  /** Specifies container group properties of standby container group pools. */
  containerGroupProperties?: ContainerGroupProperties;
  /** Specifies zones of standby container group pools. */
  zones?: string[];
}

export function standbyContainerGroupPoolResourceUpdatePropertiesSerializer(
  item: StandbyContainerGroupPoolResourceUpdateProperties,
): any {
  return {
    elasticityProfile: !item["elasticityProfile"]
      ? item["elasticityProfile"]
      : standbyContainerGroupPoolElasticityProfileSerializer(item["elasticityProfile"]),
    containerGroupProperties: !item["containerGroupProperties"]
      ? item["containerGroupProperties"]
      : containerGroupPropertiesSerializer(item["containerGroupProperties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a StandbyContainerGroupPoolResource list operation. */
export interface _StandbyContainerGroupPoolResourceListResult {
  /** The StandbyContainerGroupPoolResource items on this page */
  value: StandbyContainerGroupPoolResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _standbyContainerGroupPoolResourceListResultDeserializer(
  item: any,
): _StandbyContainerGroupPoolResourceListResult {
  return {
    value: standbyContainerGroupPoolResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standbyContainerGroupPoolResourceArraySerializer(
  result: Array<StandbyContainerGroupPoolResource>,
): any[] {
  return result.map((item) => {
    return standbyContainerGroupPoolResourceSerializer(item);
  });
}

export function standbyContainerGroupPoolResourceArrayDeserializer(
  result: Array<StandbyContainerGroupPoolResource>,
): any[] {
  return result.map((item) => {
    return standbyContainerGroupPoolResourceDeserializer(item);
  });
}

/** Contains information about a standby container group pool as last known by the StandbyPool resource provider. */
export interface StandbyContainerGroupPoolRuntimeViewResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolRuntimeViewResourceProperties;
}

export function standbyContainerGroupPoolRuntimeViewResourceDeserializer(
  item: any,
): StandbyContainerGroupPoolRuntimeViewResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : standbyContainerGroupPoolRuntimeViewResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Contains information about a standby pool as last known by the StandbyPool resource provider. */
export interface StandbyContainerGroupPoolRuntimeViewResourceProperties {
  /** A list containing the counts of container groups in each possible state, as known by the StandbyPool resource provider. */
  readonly instanceCountSummary: ContainerGroupInstanceCountSummary[];
  /** Display status of the standby pool */
  readonly status?: PoolStatus;
  /** Displays the provisioning state of the standby pool */
  readonly provisioningState?: ProvisioningState;
  /** Displays prediction information of the standby pool */
  readonly prediction?: StandbyContainerGroupPoolPrediction;
}

export function standbyContainerGroupPoolRuntimeViewResourcePropertiesDeserializer(
  item: any,
): StandbyContainerGroupPoolRuntimeViewResourceProperties {
  return {
    instanceCountSummary: containerGroupInstanceCountSummaryArrayDeserializer(
      item["instanceCountSummary"],
    ),
    status: !item["status"] ? item["status"] : poolStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
    prediction: !item["prediction"]
      ? item["prediction"]
      : standbyContainerGroupPoolPredictionDeserializer(item["prediction"]),
  };
}

export function containerGroupInstanceCountSummaryArrayDeserializer(
  result: Array<ContainerGroupInstanceCountSummary>,
): any[] {
  return result.map((item) => {
    return containerGroupInstanceCountSummaryDeserializer(item);
  });
}

/** Displays the counts of container groups in each state, as known by the StandbyPool resource provider. */
export interface ContainerGroupInstanceCountSummary {
  /** The zone that the provided counts are in. It will not have a value if zones are not enabled. */
  zone?: number;
  /** The count of pooled container groups in each state for the given zone. */
  instanceCountsByState: PoolContainerGroupStateCount[];
}

export function containerGroupInstanceCountSummaryDeserializer(
  item: any,
): ContainerGroupInstanceCountSummary {
  return {
    zone: item["zone"],
    instanceCountsByState: poolContainerGroupStateCountArrayDeserializer(
      item["instanceCountsByState"],
    ),
  };
}

export function poolContainerGroupStateCountArrayDeserializer(
  result: Array<PoolContainerGroupStateCount>,
): any[] {
  return result.map((item) => {
    return poolContainerGroupStateCountDeserializer(item);
  });
}

/** Displays the counts of pooled container groups in each state, as known by the StandbyPool resource provider. */
export interface PoolContainerGroupStateCount {
  /** The state that the pooled container groups count is for. */
  state: PoolContainerGroupState;
  /** The count of pooled container groups in the given state. */
  count: number;
}

export function poolContainerGroupStateCountDeserializer(item: any): PoolContainerGroupStateCount {
  return {
    state: item["state"],
    count: item["count"],
  };
}

/** The state of the pooled container groups. */
export enum KnownPoolContainerGroupState {
  /** The container group is up and running. */
  Running = "Running",
  /** The container group is creating. */
  Creating = "Creating",
  /** The container group is deleting. */
  Deleting = "Deleting",
}

/**
 * The state of the pooled container groups. \
 * {@link KnownPoolContainerGroupState} can be used interchangeably with PoolContainerGroupState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The container group is up and running. \
 * **Creating**: The container group is creating. \
 * **Deleting**: The container group is deleting.
 */
export type PoolContainerGroupState = string;

/** Displays prediction information of the standby pool. */
export interface StandbyContainerGroupPoolPrediction {
  /** Displays the forecast information of the standby pool. */
  readonly forecastValues: StandbyContainerGroupPoolForecastValues;
  /** Displays the UTC timestamp of when the prediction was retrieved for the standby pool. */
  readonly forecastStartTime: Date;
  /** Displays additional information for the prediction of the standby pool. */
  readonly forecastInfo: string;
}

export function standbyContainerGroupPoolPredictionDeserializer(
  item: any,
): StandbyContainerGroupPoolPrediction {
  return {
    forecastValues: standbyContainerGroupPoolForecastValuesDeserializer(item["forecastValues"]),
    forecastStartTime: new Date(item["forecastStartTime"]),
    forecastInfo: item["forecastInfo"],
  };
}

/** Displays the forecast information of the standby pool. */
export interface StandbyContainerGroupPoolForecastValues {
  /** Displays the predicted count of instances to be requested from the standby pool. */
  readonly instancesRequestedCount: number[];
}

export function standbyContainerGroupPoolForecastValuesDeserializer(
  item: any,
): StandbyContainerGroupPoolForecastValues {
  return {
    instancesRequestedCount: item["instancesRequestedCount"].map((p: any) => {
      return p;
    }),
  };
}

/** The response of a StandbyContainerGroupPoolRuntimeViewResource list operation. */
export interface _StandbyContainerGroupPoolRuntimeViewResourceListResult {
  /** The StandbyContainerGroupPoolRuntimeViewResource items on this page */
  value: StandbyContainerGroupPoolRuntimeViewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _standbyContainerGroupPoolRuntimeViewResourceListResultDeserializer(
  item: any,
): _StandbyContainerGroupPoolRuntimeViewResourceListResult {
  return {
    value: standbyContainerGroupPoolRuntimeViewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standbyContainerGroupPoolRuntimeViewResourceArrayDeserializer(
  result: Array<StandbyContainerGroupPoolRuntimeViewResource>,
): any[] {
  return result.map((item) => {
    return standbyContainerGroupPoolRuntimeViewResourceDeserializer(item);
  });
}

/** Supported API Versions for Microsoft.StandbyPool */
export enum KnownVersions {
  /** API Version 2024-03-01. */
  _20240301 = "2024-03-01",
  /** API Version 2025-03-01. */
  _20250301 = "2025-03-01",
}
