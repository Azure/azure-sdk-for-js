// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Describes the result of the request to list Service Fabric resource provider operations. */
export interface _OperationListResult {
  /** The OperationResult items on this page */
  value: OperationResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResultArrayDeserializer(result: Array<OperationResult>): any[] {
  return result.map((item) => {
    return operationResultDeserializer(item);
  });
}

/** Available operation list result */
export interface OperationResult {
  /** The name of the operation. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that represents the operation. */
  display?: AvailableOperationDisplay;
  /** Origin result */
  origin?: string;
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : availableOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    nextLink: item["nextLink"],
  };
}

/** Operation supported by the Service Fabric resource provider */
export interface AvailableOperationDisplay {
  /** The name of the provider. */
  provider?: string;
  /** The resource on which the operation is performed */
  resource?: string;
  /** The operation that can be performed. */
  operation?: string;
  /** Operation description */
  description?: string;
}

export function availableOperationDisplayDeserializer(item: any): AvailableOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

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

/** The application resource. */
export interface ApplicationResource extends ProxyResource {
  /** The application resource properties. */
  properties?: ApplicationResourceProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Describes the managed identities for an Azure resource. */
  identity?: ManagedIdentity;
  /** The geo-location where the resource lives */
  location?: string;
}

export function applicationResourceSerializer(item: ApplicationResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : applicationResourcePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    location: item["location"],
  };
}

export function applicationResourceDeserializer(item: any): ApplicationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : applicationResourcePropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    location: item["location"],
  };
}

/** The application resource properties. */
export interface ApplicationResourceProperties {
  /** List of user assigned identities for the application, each mapped to a friendly name. */
  managedIdentities?: ApplicationUserAssignedIdentity[];
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /**
   * The version of the application type as defined in the application manifest.
   * This name must be the full Arm Resource ID for the referenced application type version.
   */
  version?: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  parameters?: Record<string, string>;
  /** Describes the policy for a monitored application upgrade. */
  upgradePolicy?: ApplicationUpgradePolicy;
}

export function applicationResourcePropertiesSerializer(item: ApplicationResourceProperties): any {
  return {
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArraySerializer(item["managedIdentities"]),
    version: item["version"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicySerializer(item["upgradePolicy"]),
  };
}

export function applicationResourcePropertiesDeserializer(
  item: any,
): ApplicationResourceProperties {
  return {
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArrayDeserializer(item["managedIdentities"]),
    provisioningState: item["provisioningState"],
    version: item["version"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicyDeserializer(item["upgradePolicy"]),
  };
}

export function applicationUserAssignedIdentityArraySerializer(
  result: Array<ApplicationUserAssignedIdentity>,
): any[] {
  return result.map((item) => {
    return applicationUserAssignedIdentitySerializer(item);
  });
}

export function applicationUserAssignedIdentityArrayDeserializer(
  result: Array<ApplicationUserAssignedIdentity>,
): any[] {
  return result.map((item) => {
    return applicationUserAssignedIdentityDeserializer(item);
  });
}

/** User assigned identity for the application. */
export interface ApplicationUserAssignedIdentity {
  /** The friendly name of user assigned identity. */
  name: string;
  /** The principal id of user assigned identity. */
  principalId: string;
}

export function applicationUserAssignedIdentitySerializer(
  item: ApplicationUserAssignedIdentity,
): any {
  return { name: item["name"], principalId: item["principalId"] };
}

export function applicationUserAssignedIdentityDeserializer(
  item: any,
): ApplicationUserAssignedIdentity {
  return {
    name: item["name"],
    principalId: item["principalId"],
  };
}

/** Describes the policy for a monitored application upgrade. */
export interface ApplicationUpgradePolicy {
  /** Defines a health policy used to evaluate the health of an application or one of its children entities. */
  applicationHealthPolicy?: ApplicationHealthPolicy;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The policy used for monitoring the application upgrade */
  rollingUpgradeMonitoringPolicy?: RollingUpgradeMonitoringPolicy;
  /** Duration in seconds, to wait before a stateless instance is closed, to allow the active requests to drain gracefully. This would be effective when the instance is closing during the application/cluster upgrade, only for those instances which have a non-zero delay duration configured in the service description. */
  instanceCloseDelayDuration?: number;
  /** The mode used to monitor health during a rolling upgrade. The values are Monitored, and UnmonitoredAuto. */
  upgradeMode?: RollingUpgradeMode;
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). Unit is in seconds. */
  upgradeReplicaSetCheckTimeout?: number;
  /** Determines whether the application should be recreated on update. If value=true, the rest of the upgrade policy parameters are not allowed. */
  recreateApplication?: boolean;
}

export function applicationUpgradePolicySerializer(item: ApplicationUpgradePolicy): any {
  return {
    applicationHealthPolicy: !item["applicationHealthPolicy"]
      ? item["applicationHealthPolicy"]
      : applicationHealthPolicySerializer(item["applicationHealthPolicy"]),
    forceRestart: item["forceRestart"],
    rollingUpgradeMonitoringPolicy: !item["rollingUpgradeMonitoringPolicy"]
      ? item["rollingUpgradeMonitoringPolicy"]
      : rollingUpgradeMonitoringPolicySerializer(item["rollingUpgradeMonitoringPolicy"]),
    instanceCloseDelayDuration: item["instanceCloseDelayDuration"],
    upgradeMode: item["upgradeMode"],
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    recreateApplication: item["recreateApplication"],
  };
}

export function applicationUpgradePolicyDeserializer(item: any): ApplicationUpgradePolicy {
  return {
    applicationHealthPolicy: !item["applicationHealthPolicy"]
      ? item["applicationHealthPolicy"]
      : applicationHealthPolicyDeserializer(item["applicationHealthPolicy"]),
    forceRestart: item["forceRestart"],
    rollingUpgradeMonitoringPolicy: !item["rollingUpgradeMonitoringPolicy"]
      ? item["rollingUpgradeMonitoringPolicy"]
      : rollingUpgradeMonitoringPolicyDeserializer(item["rollingUpgradeMonitoringPolicy"]),
    instanceCloseDelayDuration: item["instanceCloseDelayDuration"],
    upgradeMode: item["upgradeMode"],
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    recreateApplication: item["recreateApplication"],
  };
}

/** Defines a health policy used to evaluate the health of an application or one of its children entities. */
export interface ApplicationHealthPolicy {
  /** Indicates whether warnings are treated with the same severity as errors. */
  considerWarningAsError: boolean;
  /**
   * The maximum allowed percentage of unhealthy deployed applications. Allowed values are Byte values from zero to 100.
   * The percentage represents the maximum tolerated percentage of deployed applications that can be unhealthy before the application is considered in error.
   * This is calculated by dividing the number of unhealthy deployed applications over the number of nodes where the application is currently deployed on in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   */
  maxPercentUnhealthyDeployedApplications: number;
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: ServiceTypeHealthPolicy;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicyMap?: Record<string, ServiceTypeHealthPolicy>;
}

export function applicationHealthPolicySerializer(item: ApplicationHealthPolicy): any {
  return {
    considerWarningAsError: item["considerWarningAsError"],
    maxPercentUnhealthyDeployedApplications: item["maxPercentUnhealthyDeployedApplications"],
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : serviceTypeHealthPolicySerializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicyMap: !item["serviceTypeHealthPolicyMap"]
      ? item["serviceTypeHealthPolicyMap"]
      : serviceTypeHealthPolicyRecordSerializer(item["serviceTypeHealthPolicyMap"]),
  };
}

export function applicationHealthPolicyDeserializer(item: any): ApplicationHealthPolicy {
  return {
    considerWarningAsError: item["considerWarningAsError"],
    maxPercentUnhealthyDeployedApplications: item["maxPercentUnhealthyDeployedApplications"],
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : serviceTypeHealthPolicyDeserializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicyMap: !item["serviceTypeHealthPolicyMap"]
      ? item["serviceTypeHealthPolicyMap"]
      : serviceTypeHealthPolicyRecordDeserializer(item["serviceTypeHealthPolicyMap"]),
  };
}

/** Represents the health policy used to evaluate the health of services belonging to a service type. */
export interface ServiceTypeHealthPolicy {
  /**
   * The maximum allowed percentage of unhealthy services.
   *
   * The percentage represents the maximum tolerated percentage of services that can be unhealthy before the application is considered in error.
   * If the percentage is respected but there is at least one unhealthy service, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy services of the specific service type over the total number of services of the specific service type.
   * The computation rounds up to tolerate one failure on small numbers of services.
   */
  maxPercentUnhealthyServices: number;
  /**
   * The maximum allowed percentage of unhealthy partitions per service.
   *
   * The percentage represents the maximum tolerated percentage of partitions that can be unhealthy before the service is considered in error.
   * If the percentage is respected but there is at least one unhealthy partition, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy partitions over the total number of partitions in the service.
   * The computation rounds up to tolerate one failure on small numbers of partitions.
   */
  maxPercentUnhealthyPartitionsPerService: number;
  /**
   * The maximum allowed percentage of unhealthy replicas per partition.
   *
   * The percentage represents the maximum tolerated percentage of replicas that can be unhealthy before the partition is considered in error.
   * If the percentage is respected but there is at least one unhealthy replica, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy replicas over the total number of replicas in the partition.
   * The computation rounds up to tolerate one failure on small numbers of replicas.
   */
  maxPercentUnhealthyReplicasPerPartition: number;
}

export function serviceTypeHealthPolicySerializer(item: ServiceTypeHealthPolicy): any {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
    maxPercentUnhealthyPartitionsPerService: item["maxPercentUnhealthyPartitionsPerService"],
    maxPercentUnhealthyReplicasPerPartition: item["maxPercentUnhealthyReplicasPerPartition"],
  };
}

export function serviceTypeHealthPolicyDeserializer(item: any): ServiceTypeHealthPolicy {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
    maxPercentUnhealthyPartitionsPerService: item["maxPercentUnhealthyPartitionsPerService"],
    maxPercentUnhealthyReplicasPerPartition: item["maxPercentUnhealthyReplicasPerPartition"],
  };
}

export function serviceTypeHealthPolicyRecordSerializer(
  item: Record<string, ServiceTypeHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeHealthPolicySerializer(item[key]);
  });
  return result;
}

export function serviceTypeHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ServiceTypeHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** The policy used for monitoring the application upgrade */
export interface RollingUpgradeMonitoringPolicy {
  /** The compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. Invalid indicates the failure action is invalid. Rollback specifies that the upgrade will start rolling back automatically. Manual indicates that the upgrade will switch to UnmonitoredManual upgrade mode. */
  failureAction: FailureAction;
  /** The amount of time to wait after completing an upgrade domain before applying health policies. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckWaitDuration: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckStableDuration: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before FailureAction is executed. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckRetryTimeout: string;
  /** The amount of time the overall upgrade has to complete before FailureAction is executed. Cannot be larger than 12 hours. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  upgradeTimeout: string;
  /** The amount of time each upgrade domain has to complete before FailureAction is executed. Cannot be larger than 12 hours. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  upgradeDomainTimeout: string;
}

export function rollingUpgradeMonitoringPolicySerializer(
  item: RollingUpgradeMonitoringPolicy,
): any {
  return {
    failureAction: item["failureAction"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

export function rollingUpgradeMonitoringPolicyDeserializer(
  item: any,
): RollingUpgradeMonitoringPolicy {
  return {
    failureAction: item["failureAction"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

/** The compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. Invalid indicates the failure action is invalid. Rollback specifies that the upgrade will start rolling back automatically. Manual indicates that the upgrade will switch to UnmonitoredManual upgrade mode. */
export enum KnownFailureAction {
  /** Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. */
  Rollback = "Rollback",
  /** Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically. */
  Manual = "Manual",
}

/**
 * The compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. Invalid indicates the failure action is invalid. Rollback specifies that the upgrade will start rolling back automatically. Manual indicates that the upgrade will switch to UnmonitoredManual upgrade mode. \
 * {@link KnownFailureAction} can be used interchangeably with FailureAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rollback**: Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. \
 * **Manual**: Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically.
 */
export type FailureAction = string;

/** The mode used to monitor health during a rolling upgrade. The values are Monitored, and UnmonitoredAuto. */
export enum KnownRollingUpgradeMode {
  /** The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding. */
  Monitored = "Monitored",
  /** The upgrade will proceed automatically without performing any health monitoring. */
  UnmonitoredAuto = "UnmonitoredAuto",
}

/**
 * The mode used to monitor health during a rolling upgrade. The values are Monitored, and UnmonitoredAuto. \
 * {@link KnownRollingUpgradeMode} can be used interchangeably with RollingUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monitored**: The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding. \
 * **UnmonitoredAuto**: The upgrade will proceed automatically without performing any health monitoring.
 */
export type RollingUpgradeMode = string;

/** Describes the managed identities for an Azure resource. */
export interface ManagedIdentity {
  /** The principal id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity for the resource. */
  type?: ManagedIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedIdentitySerializer(item: ManagedIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedIdentityDeserializer(item: any): ManagedIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of managed identity for the resource. */
export type ManagedIdentityType =
  | "None"
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned";

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

/** User assigned identity. */
export interface UserAssignedIdentity {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
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

/** Application update request. */
export interface ApplicationUpdateParameters {
  /** Application update parameters */
  tags?: Record<string, string>;
}

export function applicationUpdateParametersSerializer(item: ApplicationUpdateParameters): any {
  return { tags: item["tags"] };
}

/** The list of application resources. */
export interface _ApplicationResourceList {
  /** The ApplicationResource items on this page */
  value: ApplicationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationResourceListDeserializer(item: any): _ApplicationResourceList {
  return {
    value: applicationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationResourceArraySerializer(result: Array<ApplicationResource>): any[] {
  return result.map((item) => {
    return applicationResourceSerializer(item);
  });
}

export function applicationResourceArrayDeserializer(result: Array<ApplicationResource>): any[] {
  return result.map((item) => {
    return applicationResourceDeserializer(item);
  });
}

/** Parameters for Resume Upgrade action. The upgrade domain name must be specified. */
export interface RuntimeResumeApplicationUpgradeParameters {
  /** The upgrade domain name. Expected to be the next upgrade domain if the application is upgrading. */
  upgradeDomainName?: string;
}

export function runtimeResumeApplicationUpgradeParametersSerializer(
  item: RuntimeResumeApplicationUpgradeParameters,
): any {
  return { upgradeDomainName: item["upgradeDomainName"] };
}

/** Parameters for the Update Upgrade action. */
export interface RuntimeUpdateApplicationUpgradeParameters {
  /** The name of the application, including the 'fabric:' URI scheme. */
  name: string;
  /** The kind of the upgrade. */
  upgradeKind: RuntimeUpgradeKind;
  /** Defines a health policy used to evaluate the health of an application or one of its children entities. */
  applicationHealthPolicy?: RuntimeApplicationHealthPolicy;
  /** Describes the parameters for updating a rolling upgrade of application or cluster and a monitoring policy. */
  updateDescription?: RuntimeRollingUpgradeUpdateMonitoringPolicy;
}

export function runtimeUpdateApplicationUpgradeParametersSerializer(
  item: RuntimeUpdateApplicationUpgradeParameters,
): any {
  return {
    name: item["name"],
    upgradeKind: item["upgradeKind"],
    applicationHealthPolicy: !item["applicationHealthPolicy"]
      ? item["applicationHealthPolicy"]
      : runtimeApplicationHealthPolicySerializer(item["applicationHealthPolicy"]),
    updateDescription: !item["updateDescription"]
      ? item["updateDescription"]
      : runtimeRollingUpgradeUpdateMonitoringPolicySerializer(item["updateDescription"]),
  };
}

/** Cluster level definition for the kind of upgrade. */
export enum KnownRuntimeUpgradeKind {
  /** The upgrade progresses one upgrade domain at a time. */
  Rolling = "Rolling",
}

/**
 * Cluster level definition for the kind of upgrade. \
 * {@link KnownRuntimeUpgradeKind} can be used interchangeably with RuntimeUpgradeKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rolling**: The upgrade progresses one upgrade domain at a time.
 */
export type RuntimeUpgradeKind = string;

/** Cluster level definition for a health policy used to evaluate the health of an application or one of its children entities. */
export interface RuntimeApplicationHealthPolicy {
  /** Indicates whether warnings are treated with the same severity as errors. */
  considerWarningAsError: boolean;
  /**
   * The maximum allowed percentage of unhealthy deployed applications. Allowed values are Byte values from zero to 100.
   * The percentage represents the maximum tolerated percentage of deployed applications that can be unhealthy before the application is considered in error.
   * This is calculated by dividing the number of unhealthy deployed applications over the number of nodes where the application is currently deployed on in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   */
  maxPercentUnhealthyDeployedApplications: number;
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: RuntimeServiceTypeHealthPolicy;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicyMap?: Record<string, RuntimeServiceTypeHealthPolicy>;
}

export function runtimeApplicationHealthPolicySerializer(
  item: RuntimeApplicationHealthPolicy,
): any {
  return {
    considerWarningAsError: item["considerWarningAsError"],
    maxPercentUnhealthyDeployedApplications: item["maxPercentUnhealthyDeployedApplications"],
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : runtimeServiceTypeHealthPolicySerializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicyMap: !item["serviceTypeHealthPolicyMap"]
      ? item["serviceTypeHealthPolicyMap"]
      : runtimeServiceTypeHealthPolicyRecordSerializer(item["serviceTypeHealthPolicyMap"]),
  };
}

/** Cluster level definition that represents the health policy used to evaluate the health of services belonging to a service type. */
export interface RuntimeServiceTypeHealthPolicy {
  /**
   * The maximum allowed percentage of unhealthy services.
   *
   * The percentage represents the maximum tolerated percentage of services that can be unhealthy before the application is considered in error.
   * If the percentage is respected but there is at least one unhealthy service, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy services of the specific service type over the total number of services of the specific service type.
   * The computation rounds up to tolerate one failure on small numbers of services.
   */
  maxPercentUnhealthyServices: number;
  /**
   * The maximum allowed percentage of unhealthy partitions per service.
   *
   * The percentage represents the maximum tolerated percentage of partitions that can be unhealthy before the service is considered in error.
   * If the percentage is respected but there is at least one unhealthy partition, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy partitions over the total number of partitions in the service.
   * The computation rounds up to tolerate one failure on small numbers of partitions.
   */
  maxPercentUnhealthyPartitionsPerService: number;
  /**
   * The maximum allowed percentage of unhealthy replicas per partition.
   *
   * The percentage represents the maximum tolerated percentage of replicas that can be unhealthy before the partition is considered in error.
   * If the percentage is respected but there is at least one unhealthy replica, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy replicas over the total number of replicas in the partition.
   * The computation rounds up to tolerate one failure on small numbers of replicas.
   */
  maxPercentUnhealthyReplicasPerPartition: number;
}

export function runtimeServiceTypeHealthPolicySerializer(
  item: RuntimeServiceTypeHealthPolicy,
): any {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
    maxPercentUnhealthyPartitionsPerService: item["maxPercentUnhealthyPartitionsPerService"],
    maxPercentUnhealthyReplicasPerPartition: item["maxPercentUnhealthyReplicasPerPartition"],
  };
}

export function runtimeServiceTypeHealthPolicyRecordSerializer(
  item: Record<string, RuntimeServiceTypeHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : runtimeServiceTypeHealthPolicySerializer(item[key]);
  });
  return result;
}

/** Describes the parameters for updating a rolling upgrade of application or cluster. */
export interface RuntimeRollingUpgradeUpdateMonitoringPolicy {
  /** The mode used to monitor health during a rolling upgrade. */
  rollingUpgradeMode: RuntimeRollingUpgradeMode;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  replicaSetCheckTimeoutInMilliseconds?: number;
  /** The compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. Invalid indicates the failure action is invalid. Rollback specifies that the upgrade will start rolling back automatically. Manual indicates that the upgrade will switch to UnmonitoredManual upgrade mode */
  failureAction?: RuntimeFailureAction;
  /** The amount of time to wait after completing an upgrade domain before applying health policies. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckWaitDurationInMilliseconds?: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckStableDurationInMilliseconds?: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckRetryTimeoutInMilliseconds?: string;
  /** The amount of time the overall upgrade has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  upgradeTimeoutInMilliseconds?: string;
  /** The amount of time each upgrade domain has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  upgradeDomainTimeoutInMilliseconds?: string;
  /** Duration in seconds, to wait before a stateless instance is closed, to allow the active requests to drain gracefully. This would be effective when the instance is closing during the application/cluster upgrade, only for those instances which have a non-zero delay duration configured in the service description. */
  instanceCloseDelayDurationInSeconds?: number;
}

export function runtimeRollingUpgradeUpdateMonitoringPolicySerializer(
  item: RuntimeRollingUpgradeUpdateMonitoringPolicy,
): any {
  return {
    rollingUpgradeMode: item["rollingUpgradeMode"],
    forceRestart: item["forceRestart"],
    replicaSetCheckTimeoutInMilliseconds: item["replicaSetCheckTimeoutInMilliseconds"],
    failureAction: item["failureAction"],
    healthCheckWaitDurationInMilliseconds: item["healthCheckWaitDurationInMilliseconds"],
    healthCheckStableDurationInMilliseconds: item["healthCheckStableDurationInMilliseconds"],
    healthCheckRetryTimeoutInMilliseconds: item["healthCheckRetryTimeoutInMilliseconds"],
    upgradeTimeoutInMilliseconds: item["upgradeTimeoutInMilliseconds"],
    upgradeDomainTimeoutInMilliseconds: item["upgradeDomainTimeoutInMilliseconds"],
    instanceCloseDelayDurationInSeconds: item["instanceCloseDelayDurationInSeconds"],
  };
}

/** Cluster level definition for the mode used to monitor health during a rolling upgrade. */
export enum KnownRuntimeRollingUpgradeMode {
  /** The upgrade will proceed automatically without performing any health monitoring. */
  UnmonitoredAuto = "UnmonitoredAuto",
  /** The upgrade will stop after completing each upgrade domain, giving the opportunity to manually monitor health before proceeding. */
  UnmonitoredManual = "UnmonitoredManual",
  /** The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding. */
  Monitored = "Monitored",
}

/**
 * Cluster level definition for the mode used to monitor health during a rolling upgrade. \
 * {@link KnownRuntimeRollingUpgradeMode} can be used interchangeably with RuntimeRollingUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UnmonitoredAuto**: The upgrade will proceed automatically without performing any health monitoring. \
 * **UnmonitoredManual**: The upgrade will stop after completing each upgrade domain, giving the opportunity to manually monitor health before proceeding. \
 * **Monitored**: The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding.
 */
export type RuntimeRollingUpgradeMode = string;

/** Cluster level definition for the compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. */
export enum KnownRuntimeFailureAction {
  /** Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. */
  Rollback = "Rollback",
  /** Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically. */
  Manual = "Manual",
}

/**
 * Cluster level definition for the compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations. \
 * {@link KnownRuntimeFailureAction} can be used interchangeably with RuntimeFailureAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rollback**: Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. \
 * **Manual**: Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically.
 */
export type RuntimeFailureAction = string;

/** The application type name resource */
export interface ApplicationTypeResource extends ProxyResource {
  /** The application type name properties */
  properties?: ApplicationTypeResourceProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
}

export function applicationTypeResourceSerializer(item: ApplicationTypeResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : applicationTypeResourcePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

export function applicationTypeResourceDeserializer(item: any): ApplicationTypeResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : applicationTypeResourcePropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** The application type name properties */
export interface ApplicationTypeResourceProperties {
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

export function applicationTypeResourcePropertiesSerializer(
  item: ApplicationTypeResourceProperties,
): any {
  return item;
}

export function applicationTypeResourcePropertiesDeserializer(
  item: any,
): ApplicationTypeResourceProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Application type update request */
export interface ApplicationTypeUpdateParameters {
  /** Application type update parameters */
  tags?: Record<string, string>;
}

export function applicationTypeUpdateParametersSerializer(
  item: ApplicationTypeUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** The list of application type names. */
export interface _ApplicationTypeResourceList {
  /** The ApplicationTypeResource items on this page */
  value: ApplicationTypeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationTypeResourceListDeserializer(item: any): _ApplicationTypeResourceList {
  return {
    value: applicationTypeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationTypeResourceArraySerializer(
  result: Array<ApplicationTypeResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeResourceSerializer(item);
  });
}

export function applicationTypeResourceArrayDeserializer(
  result: Array<ApplicationTypeResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeResourceDeserializer(item);
  });
}

/** An application type version resource for the specified application type name resource. */
export interface ApplicationTypeVersionResource extends ProxyResource {
  /** The properties of the application type version resource. */
  properties?: ApplicationTypeVersionResourceProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
}

export function applicationTypeVersionResourceSerializer(
  item: ApplicationTypeVersionResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : applicationTypeVersionResourcePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

export function applicationTypeVersionResourceDeserializer(
  item: any,
): ApplicationTypeVersionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : applicationTypeVersionResourcePropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** The properties of the application type version resource. */
export interface ApplicationTypeVersionResourceProperties {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The URL to the application package */
  appPackageUrl: string;
}

export function applicationTypeVersionResourcePropertiesSerializer(
  item: ApplicationTypeVersionResourceProperties,
): any {
  return { appPackageUrl: item["appPackageUrl"] };
}

export function applicationTypeVersionResourcePropertiesDeserializer(
  item: any,
): ApplicationTypeVersionResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    appPackageUrl: item["appPackageUrl"],
  };
}

/** Application type version update request */
export interface ApplicationTypeVersionUpdateParameters {
  /** Application type version update parameters */
  tags?: Record<string, string>;
}

export function applicationTypeVersionUpdateParametersSerializer(
  item: ApplicationTypeVersionUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** The list of application type version resources for the specified application type name resource. */
export interface _ApplicationTypeVersionResourceList {
  /** The ApplicationTypeVersionResource items on this page */
  value: ApplicationTypeVersionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationTypeVersionResourceListDeserializer(
  item: any,
): _ApplicationTypeVersionResourceList {
  return {
    value: applicationTypeVersionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationTypeVersionResourceArraySerializer(
  result: Array<ApplicationTypeVersionResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeVersionResourceSerializer(item);
  });
}

export function applicationTypeVersionResourceArrayDeserializer(
  result: Array<ApplicationTypeVersionResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeVersionResourceDeserializer(item);
  });
}

/** The service resource. */
export interface ServiceResource extends ProxyResource {
  /** The service resource properties. */
  properties?: ServiceResourcePropertiesUnion;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
}

export function serviceResourceSerializer(item: ServiceResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourcePropertiesUnionSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

export function serviceResourceDeserializer(item: any): ServiceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourcePropertiesUnionDeserializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** The service resource properties. */
export interface ServiceResourceProperties extends ServiceResourcePropertiesBase {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The kind of service (Stateless or Stateful). */
  /** The discriminator possible values: Stateful, Stateless */
  serviceKind: ServiceKind;
  /** The name of the service type */
  serviceTypeName: string;
  /** Describes how the service is partitioned. */
  partitionDescription: PartitionUnion;
  /** The activation Mode of the service package */
  servicePackageActivationMode?: ServicePackageActivationMode;
  /**
   * Dns name used for the service. If this is specified, then the DNS name can be used to return the IP addresses of service endpoints for application layer protocols (e.g., HTTP).
   * When updating serviceDnsName, old name may be temporarily resolvable. However, rely on new name.
   * When removing serviceDnsName, removed name may temporarily be resolvable. Do not rely on the name being unresolvable.
   */
  serviceDnsName?: string;
}

export function serviceResourcePropertiesSerializer(item: ServiceResourceProperties): any {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArraySerializer(item["scalingPolicies"]),
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
  };
}

export function serviceResourcePropertiesDeserializer(item: any): ServiceResourceProperties {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArrayDeserializer(item["scalingPolicies"]),
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
  };
}

/** Alias for ServiceResourcePropertiesUnion */
export type ServiceResourcePropertiesUnion =
  | StatefulServiceProperties
  | StatelessServiceProperties
  | ServiceResourceProperties;

export function serviceResourcePropertiesUnionSerializer(
  item: ServiceResourcePropertiesUnion,
): any {
  switch (item.serviceKind) {
    case "Stateful":
      return statefulServicePropertiesSerializer(item as StatefulServiceProperties);

    case "Stateless":
      return statelessServicePropertiesSerializer(item as StatelessServiceProperties);

    default:
      return serviceResourcePropertiesSerializer(item);
  }
}

export function serviceResourcePropertiesUnionDeserializer(
  item: any,
): ServiceResourcePropertiesUnion {
  switch (item.serviceKind) {
    case "Stateful":
      return statefulServicePropertiesDeserializer(item as StatefulServiceProperties);

    case "Stateless":
      return statelessServicePropertiesDeserializer(item as StatelessServiceProperties);

    default:
      return serviceResourcePropertiesDeserializer(item);
  }
}

/** The kind of service (Stateless or Stateful). */
export enum KnownServiceKind {
  /** Does not use Service Fabric to make its state highly available or reliable. The value is 0. */
  Stateless = "Stateless",
  /** Uses Service Fabric to make its state or part of its state highly available and reliable. The value is 1. */
  Stateful = "Stateful",
}

/**
 * The kind of service (Stateless or Stateful). \
 * {@link KnownServiceKind} can be used interchangeably with ServiceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stateless**: Does not use Service Fabric to make its state highly available or reliable. The value is 0. \
 * **Stateful**: Uses Service Fabric to make its state or part of its state highly available and reliable. The value is 1.
 */
export type ServiceKind = string;

/** Describes how the service is partitioned. */
export interface Partition {
  partitionScheme: PartitionScheme;
}

export function partitionSerializer(item: Partition): any {
  return { partitionScheme: item["partitionScheme"] };
}

export function partitionDeserializer(item: any): Partition {
  return {
    partitionScheme: item["partitionScheme"],
  };
}

/** Alias for PartitionUnion */
export type PartitionUnion =
  | UniformInt64RangePartitionScheme
  | SingletonPartitionScheme
  | NamedPartitionScheme
  | Partition;

export function partitionUnionSerializer(item: PartitionUnion): any {
  switch (item.partitionScheme) {
    case "UniformInt64Range":
      return uniformInt64RangePartitionSchemeSerializer(item as UniformInt64RangePartitionScheme);

    case "Singleton":
      return singletonPartitionSchemeSerializer(item as SingletonPartitionScheme);

    case "Named":
      return namedPartitionSchemeSerializer(item as NamedPartitionScheme);

    default:
      return partitionSerializer(item);
  }
}

export function partitionUnionDeserializer(item: any): PartitionUnion {
  switch (item.partitionScheme) {
    case "UniformInt64Range":
      return uniformInt64RangePartitionSchemeDeserializer(item as UniformInt64RangePartitionScheme);

    case "Singleton":
      return singletonPartitionSchemeDeserializer(item as SingletonPartitionScheme);

    case "Named":
      return namedPartitionSchemeDeserializer(item as NamedPartitionScheme);

    default:
      return partitionDeserializer(item);
  }
}

/** Enumerates the ways that a service can be partitioned. */
export enum KnownPartitionScheme {
  /** Indicates that the partition is based on string names, and is a SingletonPartitionScheme object, The value is 0. */
  Singleton = "Singleton",
  /** Indicates that the partition is based on Int64 key ranges, and is a UniformInt64RangePartitionScheme object. The value is 1. */
  UniformInt64Range = "UniformInt64Range",
  /** Indicates that the partition is based on string names, and is a NamedPartitionScheme object. The value is 2. */
  Named = "Named",
}

/**
 * Enumerates the ways that a service can be partitioned. \
 * {@link KnownPartitionScheme} can be used interchangeably with PartitionScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Singleton**: Indicates that the partition is based on string names, and is a SingletonPartitionScheme object, The value is 0. \
 * **UniformInt64Range**: Indicates that the partition is based on Int64 key ranges, and is a UniformInt64RangePartitionScheme object. The value is 1. \
 * **Named**: Indicates that the partition is based on string names, and is a NamedPartitionScheme object. The value is 2.
 */
export type PartitionScheme = string;

/** Describes a partitioning scheme where an integer range is allocated evenly across a number of partitions. */
export interface UniformInt64RangePartitionScheme extends Partition {
  /** The number of partitions. */
  count: number;
  /**
   * The lower bound of the partition key range that
   * should be split between the partition ‘Count’
   */
  lowKey: number;
  /**
   * The upper bound of the partition key range that
   * should be split between the partition ‘Count’
   */
  highKey: number;
  /** Specifies how the service is partitioned. */
  partitionScheme: "UniformInt64Range";
}

export function uniformInt64RangePartitionSchemeSerializer(
  item: UniformInt64RangePartitionScheme,
): any {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    lowKey: item["lowKey"],
    highKey: item["highKey"],
  };
}

export function uniformInt64RangePartitionSchemeDeserializer(
  item: any,
): UniformInt64RangePartitionScheme {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    lowKey: item["lowKey"],
    highKey: item["highKey"],
  };
}

/** Describes the partition scheme of a singleton-partitioned, or non-partitioned service. */
export interface SingletonPartitionScheme extends Partition {
  /** Specifies how the service is partitioned. */
  partitionScheme: "Singleton";
}

export function singletonPartitionSchemeSerializer(item: SingletonPartitionScheme): any {
  return { partitionScheme: item["partitionScheme"] };
}

export function singletonPartitionSchemeDeserializer(item: any): SingletonPartitionScheme {
  return {
    partitionScheme: item["partitionScheme"],
  };
}

/** Describes the named partition scheme of the service. */
export interface NamedPartitionScheme extends Partition {
  /** Array for the names of the partitions. */
  names: string[];
  /** Specifies how the service is partitioned. */
  partitionScheme: "Named";
}

export function namedPartitionSchemeSerializer(item: NamedPartitionScheme): any {
  return {
    partitionScheme: item["partitionScheme"],
    names: item["names"].map((p: any) => {
      return p;
    }),
  };
}

export function namedPartitionSchemeDeserializer(item: any): NamedPartitionScheme {
  return {
    partitionScheme: item["partitionScheme"],
    names: item["names"].map((p: any) => {
      return p;
    }),
  };
}

/** The activation Mode of the service package */
export enum KnownServicePackageActivationMode {
  /** Indicates the application package activation mode will use shared process. */
  SharedProcess = "SharedProcess",
  /** Indicates the application package activation mode will use exclusive process. */
  ExclusiveProcess = "ExclusiveProcess",
}

/**
 * The activation Mode of the service package \
 * {@link KnownServicePackageActivationMode} can be used interchangeably with ServicePackageActivationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SharedProcess**: Indicates the application package activation mode will use shared process. \
 * **ExclusiveProcess**: Indicates the application package activation mode will use exclusive process.
 */
export type ServicePackageActivationMode = string;

/** The properties of a stateful service resource. */
export interface StatefulServiceProperties extends ServiceResourceProperties {
  /** A flag indicating whether this is a persistent service which stores states on the local disk. If it is then the value of this property is true, if not it is false. */
  hasPersistedState?: boolean;
  /** The target replica set size as a number. */
  targetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  minReplicaSetSize?: number;
  /** The duration between when a replica goes down and when a new replica is created, represented in ISO 8601 format "hh:mm:ss". */
  replicaRestartWaitDuration?: string;
  /** The maximum duration for which a partition is allowed to be in a state of quorum loss, represented in ISO 8601 format "hh:mm:ss". */
  quorumLossWaitDuration?: string;
  /** The definition on how long StandBy replicas should be maintained before being removed, represented in ISO 8601 format "hh:mm:ss". */
  standByReplicaKeepDuration?: string;
  /** The duration for which replicas can stay InBuild before reporting that build is stuck, represented in ISO 8601 format "hh:mm:ss". */
  servicePlacementTimeLimit?: string;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateful";
}

export function statefulServicePropertiesSerializer(item: StatefulServiceProperties): any {
  return {
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArraySerializer(item["scalingPolicies"]),
    hasPersistedState: item["hasPersistedState"],
    targetReplicaSetSize: item["targetReplicaSetSize"],
    minReplicaSetSize: item["minReplicaSetSize"],
    replicaRestartWaitDuration: item["replicaRestartWaitDuration"],
    quorumLossWaitDuration: item["quorumLossWaitDuration"],
    standByReplicaKeepDuration: item["standByReplicaKeepDuration"],
    servicePlacementTimeLimit: item["servicePlacementTimeLimit"],
  };
}

export function statefulServicePropertiesDeserializer(item: any): StatefulServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArrayDeserializer(item["scalingPolicies"]),
    hasPersistedState: item["hasPersistedState"],
    targetReplicaSetSize: item["targetReplicaSetSize"],
    minReplicaSetSize: item["minReplicaSetSize"],
    replicaRestartWaitDuration: item["replicaRestartWaitDuration"],
    quorumLossWaitDuration: item["quorumLossWaitDuration"],
    standByReplicaKeepDuration: item["standByReplicaKeepDuration"],
    servicePlacementTimeLimit: item["servicePlacementTimeLimit"],
  };
}

/** The properties of a stateless service resource. */
export interface StatelessServiceProperties extends ServiceResourceProperties {
  /** The instance count. */
  instanceCount: number;
  /** MinInstanceCount is the minimum number of instances that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node. The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ). Note, if InstanceCount is set to -1, during MinInstanceCount computation -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service. */
  minInstanceCount?: number;
  /** MinInstancePercentage is the minimum percentage of InstanceCount that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node. The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ). Note, if InstanceCount is set to -1, during MinInstancePercentage computation, -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service. */
  minInstancePercentage?: number;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateless";
}

export function statelessServicePropertiesSerializer(item: StatelessServiceProperties): any {
  return {
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArraySerializer(item["scalingPolicies"]),
    instanceCount: item["instanceCount"],
    minInstanceCount: item["minInstanceCount"],
    minInstancePercentage: item["minInstancePercentage"],
  };
}

export function statelessServicePropertiesDeserializer(item: any): StatelessServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: partitionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArrayDeserializer(item["scalingPolicies"]),
    instanceCount: item["instanceCount"],
    minInstanceCount: item["minInstanceCount"],
    minInstancePercentage: item["minInstancePercentage"],
  };
}

/** The common service resource properties. */
export interface ServiceResourcePropertiesBase {
  /** The placement constraints as a string. Placement constraints are boolean expressions on node properties and allow for restricting a service to particular nodes based on the service requirements. For example, to place a service on nodes where NodeType is blue specify the following: "NodeColor == blue)". */
  placementConstraints?: string;
  /** A list that describes the correlation of the service with other services. */
  correlationScheme?: ServiceCorrelation[];
  /** The service load metrics is given as an array of ServiceLoadMetric objects. */
  serviceLoadMetrics?: ServiceLoadMetric[];
  /** A list that describes the correlation of the service with other services. */
  servicePlacementPolicies?: ServicePlacementPolicyUnion[];
  /** Specifies the move cost for the service. */
  defaultMoveCost?: MoveCost;
  /** Scaling policies for this service. */
  scalingPolicies?: ScalingPolicy[];
}

export function serviceResourcePropertiesBaseSerializer(item: ServiceResourcePropertiesBase): any {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArraySerializer(item["scalingPolicies"]),
  };
}

export function serviceResourcePropertiesBaseDeserializer(
  item: any,
): ServiceResourcePropertiesBase {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyUnionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    scalingPolicies: !item["scalingPolicies"]
      ? item["scalingPolicies"]
      : scalingPolicyArrayDeserializer(item["scalingPolicies"]),
  };
}

export function serviceCorrelationArraySerializer(result: Array<ServiceCorrelation>): any[] {
  return result.map((item) => {
    return serviceCorrelationSerializer(item);
  });
}

export function serviceCorrelationArrayDeserializer(result: Array<ServiceCorrelation>): any[] {
  return result.map((item) => {
    return serviceCorrelationDeserializer(item);
  });
}

/** Creates a particular correlation between services. */
export interface ServiceCorrelation {
  /** The ServiceCorrelationScheme which describes the relationship between this service and the service specified via ServiceName. */
  scheme: ServiceCorrelationScheme;
  /** The Arm Resource ID of the service that the correlation relationship is established with. */
  serviceName: string;
}

export function serviceCorrelationSerializer(item: ServiceCorrelation): any {
  return { scheme: item["scheme"], serviceName: item["serviceName"] };
}

export function serviceCorrelationDeserializer(item: any): ServiceCorrelation {
  return {
    scheme: item["scheme"],
    serviceName: item["serviceName"],
  };
}

/** The service correlation scheme. */
export enum KnownServiceCorrelationScheme {
  /** Aligned affinity ensures that the primaries of the partitions of the affinitized services are collocated on the same nodes. This is the default and is the same as selecting the Affinity scheme. The value is 0. */
  AlignedAffinity = "AlignedAffinity",
  /** Non-Aligned affinity guarantees that all replicas of each service will be placed on the same nodes. Unlike Aligned Affinity, this does not guarantee that replicas of particular role will be collocated. The value is 1. */
  NonAlignedAffinity = "NonAlignedAffinity",
}

/**
 * The service correlation scheme. \
 * {@link KnownServiceCorrelationScheme} can be used interchangeably with ServiceCorrelationScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlignedAffinity**: Aligned affinity ensures that the primaries of the partitions of the affinitized services are collocated on the same nodes. This is the default and is the same as selecting the Affinity scheme. The value is 0. \
 * **NonAlignedAffinity**: Non-Aligned affinity guarantees that all replicas of each service will be placed on the same nodes. Unlike Aligned Affinity, this does not guarantee that replicas of particular role will be collocated. The value is 1.
 */
export type ServiceCorrelationScheme = string;

export function serviceLoadMetricArraySerializer(result: Array<ServiceLoadMetric>): any[] {
  return result.map((item) => {
    return serviceLoadMetricSerializer(item);
  });
}

export function serviceLoadMetricArrayDeserializer(result: Array<ServiceLoadMetric>): any[] {
  return result.map((item) => {
    return serviceLoadMetricDeserializer(item);
  });
}

/** Specifies a metric to load balance a service during runtime. */
export interface ServiceLoadMetric {
  /** The name of the metric. If the service chooses to report load during runtime, the load metric name should match the name that is specified in Name exactly. Note that metric names are case sensitive. */
  name: string;
  /** The service load metric relative weight, compared to other metrics configured for this service, as a number. */
  weight?: ServiceLoadMetricWeight;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Primary replica. */
  primaryDefaultLoad?: number;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Secondary replica. */
  secondaryDefaultLoad?: number;
  /** Used only for Stateless services. The default amount of load, as a number, that this service creates for this metric. */
  defaultLoad?: number;
}

export function serviceLoadMetricSerializer(item: ServiceLoadMetric): any {
  return {
    name: item["name"],
    weight: item["weight"],
    primaryDefaultLoad: item["primaryDefaultLoad"],
    secondaryDefaultLoad: item["secondaryDefaultLoad"],
    defaultLoad: item["defaultLoad"],
  };
}

export function serviceLoadMetricDeserializer(item: any): ServiceLoadMetric {
  return {
    name: item["name"],
    weight: item["weight"],
    primaryDefaultLoad: item["primaryDefaultLoad"],
    secondaryDefaultLoad: item["secondaryDefaultLoad"],
    defaultLoad: item["defaultLoad"],
  };
}

/** Determines the metric weight relative to the other metrics that are configured for this service. During runtime, if two metrics end up in conflict, the Cluster Resource Manager prefers the metric with the higher weight. */
export enum KnownServiceLoadMetricWeight {
  /** Disables resource balancing for this metric. This value is zero. */
  Zero = "Zero",
  /** Specifies the metric weight of the service load as Low. The value is 1. */
  Low = "Low",
  /** Specifies the metric weight of the service load as Medium. The value is 2. */
  Medium = "Medium",
  /** Specifies the metric weight of the service load as High. The value is 3. */
  High = "High",
}

/**
 * Determines the metric weight relative to the other metrics that are configured for this service. During runtime, if two metrics end up in conflict, the Cluster Resource Manager prefers the metric with the higher weight. \
 * {@link KnownServiceLoadMetricWeight} can be used interchangeably with ServiceLoadMetricWeight,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zero**: Disables resource balancing for this metric. This value is zero. \
 * **Low**: Specifies the metric weight of the service load as Low. The value is 1. \
 * **Medium**: Specifies the metric weight of the service load as Medium. The value is 2. \
 * **High**: Specifies the metric weight of the service load as High. The value is 3.
 */
export type ServiceLoadMetricWeight = string;

export function servicePlacementPolicyUnionArraySerializer(
  result: Array<ServicePlacementPolicyUnion>,
): any[] {
  return result.map((item) => {
    return servicePlacementPolicyUnionSerializer(item);
  });
}

export function servicePlacementPolicyUnionArrayDeserializer(
  result: Array<ServicePlacementPolicyUnion>,
): any[] {
  return result.map((item) => {
    return servicePlacementPolicyUnionDeserializer(item);
  });
}

/** Describes the policy to be used for placement of a Service Fabric service. */
export interface ServicePlacementPolicy {
  type: ServicePlacementPolicyType;
}

export function servicePlacementPolicySerializer(item: ServicePlacementPolicy): any {
  return { type: item["type"] };
}

export function servicePlacementPolicyDeserializer(item: any): ServicePlacementPolicy {
  return {
    type: item["type"],
  };
}

/** Alias for ServicePlacementPolicyUnion */
export type ServicePlacementPolicyUnion =
  | ServicePlacementInvalidDomainPolicy
  | ServicePlacementRequiredDomainPolicy
  | ServicePlacementPreferPrimaryDomainPolicy
  | ServicePlacementRequireDomainDistributionPolicy
  | ServicePlacementNonPartiallyPlaceServicePolicy
  | ServicePlacementPolicy;

export function servicePlacementPolicyUnionSerializer(item: ServicePlacementPolicyUnion): any {
  switch (item.type) {
    case "InvalidDomain":
      return servicePlacementInvalidDomainPolicySerializer(
        item as ServicePlacementInvalidDomainPolicy,
      );

    case "RequiredDomain":
      return servicePlacementRequiredDomainPolicySerializer(
        item as ServicePlacementRequiredDomainPolicy,
      );

    case "PreferredPrimaryDomain":
      return servicePlacementPreferPrimaryDomainPolicySerializer(
        item as ServicePlacementPreferPrimaryDomainPolicy,
      );

    case "RequiredDomainDistribution":
      return servicePlacementRequireDomainDistributionPolicySerializer(
        item as ServicePlacementRequireDomainDistributionPolicy,
      );

    case "NonPartiallyPlaceService":
      return servicePlacementNonPartiallyPlaceServicePolicySerializer(
        item as ServicePlacementNonPartiallyPlaceServicePolicy,
      );

    default:
      return servicePlacementPolicySerializer(item);
  }
}

export function servicePlacementPolicyUnionDeserializer(item: any): ServicePlacementPolicyUnion {
  switch (item.type) {
    case "InvalidDomain":
      return servicePlacementInvalidDomainPolicyDeserializer(
        item as ServicePlacementInvalidDomainPolicy,
      );

    case "RequiredDomain":
      return servicePlacementRequiredDomainPolicyDeserializer(
        item as ServicePlacementRequiredDomainPolicy,
      );

    case "PreferredPrimaryDomain":
      return servicePlacementPreferPrimaryDomainPolicyDeserializer(
        item as ServicePlacementPreferPrimaryDomainPolicy,
      );

    case "RequiredDomainDistribution":
      return servicePlacementRequireDomainDistributionPolicyDeserializer(
        item as ServicePlacementRequireDomainDistributionPolicy,
      );

    case "NonPartiallyPlaceService":
      return servicePlacementNonPartiallyPlaceServicePolicyDeserializer(
        item as ServicePlacementNonPartiallyPlaceServicePolicy,
      );

    default:
      return servicePlacementPolicyDeserializer(item);
  }
}

/** The type of placement policy for a service fabric service. Following are the possible values. */
export enum KnownServicePlacementPolicyType {
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementInvalidDomainPolicyDescription, which indicates that a particular fault or upgrade domain cannot be used for placement of this service. The value is 0. */
  InvalidDomain = "InvalidDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription indicating that the replicas of the service must be placed in a specific domain. The value is 1. */
  RequiredDomain = "RequiredDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementPreferPrimaryDomainPolicyDescription, which indicates that if possible the Primary replica for the partitions of the service should be located in a particular domain as an optimization. The value is 2. */
  PreferredPrimaryDomain = "PreferredPrimaryDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription, indicating that the system will disallow placement of any two replicas from the same partition in the same domain at any time. The value is 3. */
  RequiredDomainDistribution = "RequiredDomainDistribution",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementNonPartiallyPlaceServicePolicyDescription, which indicates that if possible all replicas of a particular partition of the service should be placed atomically. The value is 4. */
  NonPartiallyPlaceService = "NonPartiallyPlaceService",
}

/**
 * The type of placement policy for a service fabric service. Following are the possible values. \
 * {@link KnownServicePlacementPolicyType} can be used interchangeably with ServicePlacementPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InvalidDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementInvalidDomainPolicyDescription, which indicates that a particular fault or upgrade domain cannot be used for placement of this service. The value is 0. \
 * **RequiredDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription indicating that the replicas of the service must be placed in a specific domain. The value is 1. \
 * **PreferredPrimaryDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementPreferPrimaryDomainPolicyDescription, which indicates that if possible the Primary replica for the partitions of the service should be located in a particular domain as an optimization. The value is 2. \
 * **RequiredDomainDistribution**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription, indicating that the system will disallow placement of any two replicas from the same partition in the same domain at any time. The value is 3. \
 * **NonPartiallyPlaceService**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementNonPartiallyPlaceServicePolicyDescription, which indicates that if possible all replicas of a particular partition of the service should be placed atomically. The value is 4.
 */
export type ServicePlacementPolicyType = string;

/** Describes the policy to be used for placement of a Service Fabric service where a particular fault or upgrade domain should not be used for placement of the instances or replicas of that service. */
export interface ServicePlacementInvalidDomainPolicy extends ServicePlacementPolicy {
  /** The name of the domain that should not be used for placement. */
  domainName: string;
  /** The type of placement policy for a service fabric service. Following are the possible values. */
  type: "InvalidDomain";
}

export function servicePlacementInvalidDomainPolicySerializer(
  item: ServicePlacementInvalidDomainPolicy,
): any {
  return { type: item["type"], domainName: item["domainName"] };
}

export function servicePlacementInvalidDomainPolicyDeserializer(
  item: any,
): ServicePlacementInvalidDomainPolicy {
  return {
    type: item["type"],
    domainName: item["domainName"],
  };
}

/** Describes the policy to be used for placement of a Service Fabric service where the instances or replicas of that service must be placed in a particular domain. */
export interface ServicePlacementRequiredDomainPolicy extends ServicePlacementPolicy {
  /** The name of the domain that should used for placement as per this policy. */
  domainName: string;
  /** The type of placement policy for a service fabric service. Following are the possible values. */
  type: "RequiredDomain";
}

export function servicePlacementRequiredDomainPolicySerializer(
  item: ServicePlacementRequiredDomainPolicy,
): any {
  return { type: item["type"], domainName: item["domainName"] };
}

export function servicePlacementRequiredDomainPolicyDeserializer(
  item: any,
): ServicePlacementRequiredDomainPolicy {
  return {
    type: item["type"],
    domainName: item["domainName"],
  };
}

/**
 * Describes the policy to be used for placement of a Service Fabric service where the service's
 * Primary replicas should optimally be placed in a particular domain.
 *
 * This placement policy is usually used with fault domains in scenarios where the Service Fabric
 * cluster is geographically distributed in order to indicate that a service's primary replica should
 * be located in a particular fault domain, which in geo-distributed scenarios usually aligns with regional
 * or datacenter boundaries. Note that since this is an optimization it is possible that the Primary replica
 * may not end up located in this domain due to failures, capacity limits, or other constraints.
 */
export interface ServicePlacementPreferPrimaryDomainPolicy extends ServicePlacementPolicy {
  /** The name of the domain that should used for placement as per this policy. */
  domainName: string;
  /** The type of placement policy for a service fabric service. Following are the possible values. */
  type: "PreferredPrimaryDomain";
}

export function servicePlacementPreferPrimaryDomainPolicySerializer(
  item: ServicePlacementPreferPrimaryDomainPolicy,
): any {
  return { type: item["type"], domainName: item["domainName"] };
}

export function servicePlacementPreferPrimaryDomainPolicyDeserializer(
  item: any,
): ServicePlacementPreferPrimaryDomainPolicy {
  return {
    type: item["type"],
    domainName: item["domainName"],
  };
}

/**
 * Describes the policy to be used for placement of a Service Fabric service where two replicas
 * from the same partition should never be placed in the same fault or upgrade domain.
 *
 * While this is not common it can expose the service to an increased risk of concurrent failures
 * due to unplanned outages or other cases of subsequent/concurrent failures. As an example, consider
 * a case where replicas are deployed across different data center, with one replica per location.
 * In the event that one of the datacenters goes offline, normally the replica that was placed in that
 * datacenter will be packed into one of the remaining datacenters. If this is not desirable then this
 * policy should be set.
 */
export interface ServicePlacementRequireDomainDistributionPolicy extends ServicePlacementPolicy {
  /** The name of the domain that should used for placement as per this policy. */
  domainName: string;
  /** The type of placement policy for a service fabric service. Following are the possible values. */
  type: "RequiredDomainDistribution";
}

export function servicePlacementRequireDomainDistributionPolicySerializer(
  item: ServicePlacementRequireDomainDistributionPolicy,
): any {
  return { type: item["type"], domainName: item["domainName"] };
}

export function servicePlacementRequireDomainDistributionPolicyDeserializer(
  item: any,
): ServicePlacementRequireDomainDistributionPolicy {
  return {
    type: item["type"],
    domainName: item["domainName"],
  };
}

/** The type of placement policy for a service fabric service. Following are the possible values. */
export interface ServicePlacementNonPartiallyPlaceServicePolicy extends ServicePlacementPolicy {
  type: "NonPartiallyPlaceService";
}

export function servicePlacementNonPartiallyPlaceServicePolicySerializer(
  item: ServicePlacementNonPartiallyPlaceServicePolicy,
): any {
  return { type: item["type"] };
}

export function servicePlacementNonPartiallyPlaceServicePolicyDeserializer(
  item: any,
): ServicePlacementNonPartiallyPlaceServicePolicy {
  return {
    type: item["type"],
  };
}

/** Specifies the move cost for the service. */
export enum KnownMoveCost {
  /** Zero move cost. This value is zero. */
  Zero = "Zero",
  /** Specifies the move cost of the service as Low. The value is 1. */
  Low = "Low",
  /** Specifies the move cost of the service as Medium. The value is 2. */
  Medium = "Medium",
  /** Specifies the move cost of the service as High. The value is 3. */
  High = "High",
}

/**
 * Specifies the move cost for the service. \
 * {@link KnownMoveCost} can be used interchangeably with MoveCost,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zero**: Zero move cost. This value is zero. \
 * **Low**: Specifies the move cost of the service as Low. The value is 1. \
 * **Medium**: Specifies the move cost of the service as Medium. The value is 2. \
 * **High**: Specifies the move cost of the service as High. The value is 3.
 */
export type MoveCost = string;

export function scalingPolicyArraySerializer(result: Array<ScalingPolicy>): any[] {
  return result.map((item) => {
    return scalingPolicySerializer(item);
  });
}

export function scalingPolicyArrayDeserializer(result: Array<ScalingPolicy>): any[] {
  return result.map((item) => {
    return scalingPolicyDeserializer(item);
  });
}

/** Specifies a metric to load balance a service during runtime. */
export interface ScalingPolicy {
  /** Specifies the mechanism associated with this scaling policy */
  scalingMechanism: ScalingMechanismUnion;
  /** Specifies the trigger associated with this scaling policy. */
  scalingTrigger: ScalingTriggerUnion;
}

export function scalingPolicySerializer(item: ScalingPolicy): any {
  return {
    scalingMechanism: scalingMechanismUnionSerializer(item["scalingMechanism"]),
    scalingTrigger: scalingTriggerUnionSerializer(item["scalingTrigger"]),
  };
}

export function scalingPolicyDeserializer(item: any): ScalingPolicy {
  return {
    scalingMechanism: scalingMechanismUnionDeserializer(item["scalingMechanism"]),
    scalingTrigger: scalingTriggerUnionDeserializer(item["scalingTrigger"]),
  };
}

/** Describes the mechanism for performing a scaling operation. */
export interface ScalingMechanism {
  kind: ServiceScalingMechanismKind;
}

export function scalingMechanismSerializer(item: ScalingMechanism): any {
  return { kind: item["kind"] };
}

export function scalingMechanismDeserializer(item: any): ScalingMechanism {
  return {
    kind: item["kind"],
  };
}

/** Alias for ScalingMechanismUnion */
export type ScalingMechanismUnion =
  | AddRemoveIncrementalNamedPartitionScalingMechanism
  | PartitionInstanceCountScaleMechanism
  | ScalingMechanism;

export function scalingMechanismUnionSerializer(item: ScalingMechanismUnion): any {
  switch (item.kind) {
    case "AddRemoveIncrementalNamedPartition":
      return addRemoveIncrementalNamedPartitionScalingMechanismSerializer(
        item as AddRemoveIncrementalNamedPartitionScalingMechanism,
      );

    case "ScalePartitionInstanceCount":
      return partitionInstanceCountScaleMechanismSerializer(
        item as PartitionInstanceCountScaleMechanism,
      );

    default:
      return scalingMechanismSerializer(item);
  }
}

export function scalingMechanismUnionDeserializer(item: any): ScalingMechanismUnion {
  switch (item.kind) {
    case "AddRemoveIncrementalNamedPartition":
      return addRemoveIncrementalNamedPartitionScalingMechanismDeserializer(
        item as AddRemoveIncrementalNamedPartitionScalingMechanism,
      );

    case "ScalePartitionInstanceCount":
      return partitionInstanceCountScaleMechanismDeserializer(
        item as PartitionInstanceCountScaleMechanism,
      );

    default:
      return scalingMechanismDeserializer(item);
  }
}

/** Enumerates the ways that a service can be partitioned. */
export enum KnownServiceScalingMechanismKind {
  /** Represents a scaling mechanism for adding or removing instances of stateless service partition. The value is 0. */
  ScalePartitionInstanceCount = "ScalePartitionInstanceCount",
  /** Represents a scaling mechanism for adding or removing named partitions of a stateless service. The value is 1. */
  AddRemoveIncrementalNamedPartition = "AddRemoveIncrementalNamedPartition",
}

/**
 * Enumerates the ways that a service can be partitioned. \
 * {@link KnownServiceScalingMechanismKind} can be used interchangeably with ServiceScalingMechanismKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ScalePartitionInstanceCount**: Represents a scaling mechanism for adding or removing instances of stateless service partition. The value is 0. \
 * **AddRemoveIncrementalNamedPartition**: Represents a scaling mechanism for adding or removing named partitions of a stateless service. The value is 1.
 */
export type ServiceScalingMechanismKind = string;

/** Represents a scaling mechanism for adding or removing named partitions of a stateless service. Partition names are in the format '0','1'...'N-1'. */
export interface AddRemoveIncrementalNamedPartitionScalingMechanism extends ScalingMechanism {
  /** Minimum number of named partitions of the service. */
  minPartitionCount: number;
  /** Maximum number of named partitions of the service. */
  maxPartitionCount: number;
  /** The number of instances to add or remove during a scaling operation. */
  scaleIncrement: number;
  /** Specifies the mechanism associated with this scaling policy. */
  kind: "AddRemoveIncrementalNamedPartition";
}

export function addRemoveIncrementalNamedPartitionScalingMechanismSerializer(
  item: AddRemoveIncrementalNamedPartitionScalingMechanism,
): any {
  return {
    kind: item["kind"],
    minPartitionCount: item["minPartitionCount"],
    maxPartitionCount: item["maxPartitionCount"],
    scaleIncrement: item["scaleIncrement"],
  };
}

export function addRemoveIncrementalNamedPartitionScalingMechanismDeserializer(
  item: any,
): AddRemoveIncrementalNamedPartitionScalingMechanism {
  return {
    kind: item["kind"],
    minPartitionCount: item["minPartitionCount"],
    maxPartitionCount: item["maxPartitionCount"],
    scaleIncrement: item["scaleIncrement"],
  };
}

/** Represents a scaling mechanism for adding or removing instances of stateless service partition. */
export interface PartitionInstanceCountScaleMechanism extends ScalingMechanism {
  /** Minimum number of instances of the partition. */
  minInstanceCount: number;
  /** Maximum number of instances of the partition. */
  maxInstanceCount: number;
  /** The number of instances to add or remove during a scaling operation. */
  scaleIncrement: number;
  /** Specifies the mechanism associated with this scaling policy. */
  kind: "ScalePartitionInstanceCount";
}

export function partitionInstanceCountScaleMechanismSerializer(
  item: PartitionInstanceCountScaleMechanism,
): any {
  return {
    kind: item["kind"],
    minInstanceCount: item["minInstanceCount"],
    maxInstanceCount: item["maxInstanceCount"],
    scaleIncrement: item["scaleIncrement"],
  };
}

export function partitionInstanceCountScaleMechanismDeserializer(
  item: any,
): PartitionInstanceCountScaleMechanism {
  return {
    kind: item["kind"],
    minInstanceCount: item["minInstanceCount"],
    maxInstanceCount: item["maxInstanceCount"],
    scaleIncrement: item["scaleIncrement"],
  };
}

/** Describes the trigger for performing a scaling operation. */
export interface ScalingTrigger {
  kind: ServiceScalingTriggerKind;
}

export function scalingTriggerSerializer(item: ScalingTrigger): any {
  return { kind: item["kind"] };
}

export function scalingTriggerDeserializer(item: any): ScalingTrigger {
  return {
    kind: item["kind"],
  };
}

/** Alias for ScalingTriggerUnion */
export type ScalingTriggerUnion =
  | AveragePartitionLoadScalingTrigger
  | AverageServiceLoadScalingTrigger
  | ScalingTrigger;

export function scalingTriggerUnionSerializer(item: ScalingTriggerUnion): any {
  switch (item.kind) {
    case "AveragePartitionLoadTrigger":
      return averagePartitionLoadScalingTriggerSerializer(
        item as AveragePartitionLoadScalingTrigger,
      );

    case "AverageServiceLoadTrigger":
      return averageServiceLoadScalingTriggerSerializer(item as AverageServiceLoadScalingTrigger);

    default:
      return scalingTriggerSerializer(item);
  }
}

export function scalingTriggerUnionDeserializer(item: any): ScalingTriggerUnion {
  switch (item.kind) {
    case "AveragePartitionLoadTrigger":
      return averagePartitionLoadScalingTriggerDeserializer(
        item as AveragePartitionLoadScalingTrigger,
      );

    case "AverageServiceLoadTrigger":
      return averageServiceLoadScalingTriggerDeserializer(item as AverageServiceLoadScalingTrigger);

    default:
      return scalingTriggerDeserializer(item);
  }
}

/** Enumerates the ways that a service can be partitioned. */
export enum KnownServiceScalingTriggerKind {
  /** Represents a scaling trigger related to an average load of a metric/resource of a partition. The value is 0. */
  AveragePartitionLoadTrigger = "AveragePartitionLoadTrigger",
  /** Represents a scaling policy related to an average load of a metric/resource of a service. The value is 1. */
  AverageServiceLoadTrigger = "AverageServiceLoadTrigger",
}

/**
 * Enumerates the ways that a service can be partitioned. \
 * {@link KnownServiceScalingTriggerKind} can be used interchangeably with ServiceScalingTriggerKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AveragePartitionLoadTrigger**: Represents a scaling trigger related to an average load of a metric\/resource of a partition. The value is 0. \
 * **AverageServiceLoadTrigger**: Represents a scaling policy related to an average load of a metric\/resource of a service. The value is 1.
 */
export type ServiceScalingTriggerKind = string;

/** Represents a scaling trigger related to an average load of a metric/resource of a partition. */
export interface AveragePartitionLoadScalingTrigger extends ScalingTrigger {
  /** The name of the metric for which usage should be tracked. */
  metricName: string;
  /** The lower limit of the load below which a scale in operation should be performed. */
  lowerLoadThreshold: number;
  /** The upper limit of the load beyond which a scale out operation should be performed. */
  upperLoadThreshold: number;
  /** The period in seconds on which a decision is made whether to scale or not. This property should come in ISO 8601 format "hh:mm:ss". */
  scaleInterval: string;
  /** Specifies the trigger associated with this scaling policy. */
  kind: "AveragePartitionLoadTrigger";
}

export function averagePartitionLoadScalingTriggerSerializer(
  item: AveragePartitionLoadScalingTrigger,
): any {
  return {
    kind: item["kind"],
    metricName: item["metricName"],
    lowerLoadThreshold: item["lowerLoadThreshold"],
    upperLoadThreshold: item["upperLoadThreshold"],
    scaleInterval: item["scaleInterval"],
  };
}

export function averagePartitionLoadScalingTriggerDeserializer(
  item: any,
): AveragePartitionLoadScalingTrigger {
  return {
    kind: item["kind"],
    metricName: item["metricName"],
    lowerLoadThreshold: item["lowerLoadThreshold"],
    upperLoadThreshold: item["upperLoadThreshold"],
    scaleInterval: item["scaleInterval"],
  };
}

/** Represents a scaling policy related to an average load of a metric/resource of a service. */
export interface AverageServiceLoadScalingTrigger extends ScalingTrigger {
  /** The name of the metric for which usage should be tracked. */
  metricName: string;
  /** The lower limit of the load below which a scale in operation should be performed. */
  lowerLoadThreshold: number;
  /** The upper limit of the load beyond which a scale out operation should be performed. */
  upperLoadThreshold: number;
  /** The period in seconds on which a decision is made whether to scale or not. This property should come in ISO 8601 format "hh:mm:ss". */
  scaleInterval: string;
  /** Flag determines whether only the load of primary replica should be considered for scaling. If set to true, then trigger will only consider the load of primary replicas of stateful service. If set to false, trigger will consider load of all replicas. This parameter cannot be set to true for stateless service. */
  useOnlyPrimaryLoad: boolean;
  /** Specifies the trigger associated with this scaling policy. */
  kind: "AverageServiceLoadTrigger";
}

export function averageServiceLoadScalingTriggerSerializer(
  item: AverageServiceLoadScalingTrigger,
): any {
  return {
    kind: item["kind"],
    metricName: item["metricName"],
    lowerLoadThreshold: item["lowerLoadThreshold"],
    upperLoadThreshold: item["upperLoadThreshold"],
    scaleInterval: item["scaleInterval"],
    useOnlyPrimaryLoad: item["useOnlyPrimaryLoad"],
  };
}

export function averageServiceLoadScalingTriggerDeserializer(
  item: any,
): AverageServiceLoadScalingTrigger {
  return {
    kind: item["kind"],
    metricName: item["metricName"],
    lowerLoadThreshold: item["lowerLoadThreshold"],
    upperLoadThreshold: item["upperLoadThreshold"],
    scaleInterval: item["scaleInterval"],
    useOnlyPrimaryLoad: item["useOnlyPrimaryLoad"],
  };
}

/** Service update request */
export interface ServiceUpdateParameters {
  /** Service update parameters */
  tags?: Record<string, string>;
}

export function serviceUpdateParametersSerializer(item: ServiceUpdateParameters): any {
  return { tags: item["tags"] };
}

/** The list of service resources. */
export interface _ServiceResourceList {
  /** The ServiceResource items on this page */
  value: ServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceResourceListDeserializer(item: any): _ServiceResourceList {
  return {
    value: serviceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceResourceArraySerializer(result: Array<ServiceResource>): any[] {
  return result.map((item) => {
    return serviceResourceSerializer(item);
  });
}

export function serviceResourceArrayDeserializer(result: Array<ServiceResource>): any[] {
  return result.map((item) => {
    return serviceResourceDeserializer(item);
  });
}

/** The result of the Service Fabric runtime versions */
export interface ManagedClusterCodeVersionResult {
  /** The identification of the result */
  id?: string;
  /** The name of the result */
  name?: string;
  /** The result resource type */
  type?: string;
  /** The detail of the Service Fabric runtime version result */
  properties?: ManagedClusterVersionDetails;
}

export function managedClusterCodeVersionResultDeserializer(
  item: any,
): ManagedClusterCodeVersionResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : managedClusterVersionDetailsDeserializer(item["properties"]),
  };
}

/** The detail of the Service Fabric runtime version result */
export interface ManagedClusterVersionDetails {
  /** The Service Fabric runtime version of the cluster. */
  clusterCodeVersion?: string;
  /** The date of expiry of support of the version. */
  supportExpiryUtc?: Date;
  /** Cluster operating system, the default will be Windows */
  osType?: OsType;
}

export function managedClusterVersionDetailsDeserializer(item: any): ManagedClusterVersionDetails {
  return {
    clusterCodeVersion: item["clusterCodeVersion"],
    supportExpiryUtc: !item["supportExpiryUtc"]
      ? item["supportExpiryUtc"]
      : new Date(item["supportExpiryUtc"]),
    osType: item["osType"],
  };
}

/** Cluster operating system, the default will be Windows */
export enum KnownOsType {
  /** Indicates os is Windows. */
  Windows = "Windows",
}

/**
 * Cluster operating system, the default will be Windows \
 * {@link KnownOsType} can be used interchangeably with OsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Indicates os is Windows.
 */
export type OsType = string;

/** Describes a VM Sizes. */
export interface ManagedVMSize {
  /** VM Size properties. */
  readonly properties?: VMSize;
  /** VM Size id. */
  readonly id?: string;
  /** VM Size name. */
  readonly name?: string;
  /** VM Size type. */
  readonly type?: string;
}

export function managedVMSizeDeserializer(item: any): ManagedVMSize {
  return {
    properties: !item["properties"] ? item["properties"] : vmSizeDeserializer(item["properties"]),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** VM Sizes properties. */
export interface VMSize {
  /** VM Size name. */
  readonly size?: string;
}

export function vmSizeDeserializer(item: any): VMSize {
  return {
    size: item["size"],
  };
}

/** Describes the result of the request to list Managed VM Sizes for Service Fabric Managed Clusters. */
export interface _ManagedVMSizesResult {
  /** The ManagedVMSize items on this page */
  value: ManagedVMSize[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedVMSizesResultDeserializer(item: any): _ManagedVMSizesResult {
  return {
    value: managedVMSizeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedVMSizeArrayDeserializer(result: Array<ManagedVMSize>): any[] {
  return result.map((item) => {
    return managedVMSizeDeserializer(item);
  });
}

/** The managed cluster resource */
export interface ManagedCluster extends TrackedResource {
  /** The managed cluster resource properties */
  properties?: ManagedClusterProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.", */
  readonly etag?: string;
  /** The sku of the managed cluster */
  sku: Sku;
}

export function managedClusterSerializer(item: ManagedCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : managedClusterPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
  };
}

export function managedClusterDeserializer(item: any): ManagedCluster {
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
      : managedClusterPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    sku: skuDeserializer(item["sku"]),
  };
}

/** Describes the managed cluster resource properties. */
export interface ManagedClusterProperties {
  /** The cluster dns name. */
  dnsName: string;
  /** The fully qualified domain name associated with the public load balancer of the cluster. */
  readonly fqdn?: string;
  /** The IPv4 address associated with the public load balancer of the cluster. */
  readonly ipv4Address?: string;
  /** A service generated unique identifier for the cluster resource. */
  readonly clusterId?: string;
  /** The current state of the cluster. */
  readonly clusterState?: ClusterState;
  /** List of thumbprints of the cluster certificates. */
  readonly clusterCertificateThumbprints?: string[];
  /** The port used for client connections to the cluster. */
  clientConnectionPort?: number;
  /** The port used for HTTP connections to the cluster. */
  httpGatewayConnectionPort?: number;
  /** VM admin user name. */
  adminUserName: string;
  /** VM admin user password. */
  adminPassword?: string;
  /** Load balancing rules that are applied to the public load balancer of the cluster. */
  loadBalancingRules?: LoadBalancingRule[];
  /** Setting this to true enables RDP access to the VM. The default NSG rule opens RDP port to Internet which can be overridden with custom Network Security Rules. The default value for this setting is false. */
  allowRdpAccess?: boolean;
  /** Custom Network Security Rules that are applied to the Virtual Network of the cluster. */
  networkSecurityRules?: NetworkSecurityRule[];
  /** Client certificates that are allowed to manage the cluster. */
  clients?: ClientCertificate[];
  /** The AAD authentication settings of the cluster. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The list of custom fabric settings to configure the cluster. */
  fabricSettings?: SettingsSectionDescription[];
  /** The provisioning state of the managed cluster resource. */
  readonly provisioningState?: ManagedResourceProvisioningState;
  /** The Service Fabric runtime version of the cluster. This property is required when **clusterUpgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](./ClusterVersion.md). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  clusterUpgradeMode?: ClusterUpgradeMode;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **clusterUpgradeMode** is set to 'Automatic'. */
  clusterUpgradeCadence?: ClusterUpgradeCadence;
  /** List of add-on features to enable on the cluster. */
  addonFeatures?: ManagedClusterAddOnFeature[];
  /** Enables automatic OS upgrade for node types created using OS images with version 'latest'. The default value for this setting is false. */
  enableAutoOSUpgrade?: boolean;
  /** Indicates if the cluster has zone resiliency. */
  zonalResiliency?: boolean;
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicy;
  /** Setting this to true creates IPv6 address space for the default VNet used by the cluster. This setting cannot be changed once the cluster is created. The default value for this setting is false. */
  enableIpv6?: boolean;
  /** If specified, the node types for the cluster are created in this subnet instead of the default VNet. The **networkSecurityRules** specified for the cluster are also applied to this subnet. This setting cannot be changed once the cluster is created. */
  subnetId?: string;
  /** The list of IP tags associated with the default public IP address of the cluster. */
  ipTags?: IpTag[];
  /** IPv6 address for the cluster if IPv6 is enabled. */
  readonly ipv6Address?: string;
  /** Setting this to true will link the IPv4 address as the ServicePublicIP of the IPv6 address. It can only be set to True if IPv6 is enabled on the cluster. */
  enableServicePublicIP?: boolean;
  /** Auxiliary subnets for the cluster. */
  auxiliarySubnets?: Subnet[];
  /** Service endpoints for subnets in the cluster. */
  serviceEndpoints?: ServiceEndpoint[];
  /** Indicates the update mode for Cross Az clusters. */
  zonalUpdateMode?: ZonalUpdateMode;
  /** For new clusters, this parameter indicates that it uses Bring your own VNet, but the subnet is specified at node type level; and for such clusters, the subnetId property is required for node types. */
  useCustomVnet?: boolean;
  /** Specify the resource id of a public IPv4 prefix that the load balancer will allocate a public IPv4 address from. This setting cannot be changed once the cluster is created. */
  publicIPPrefixId?: string;
  /** Specify the resource id of a public IPv6 prefix that the load balancer will allocate a public IPv6 address from. This setting cannot be changed once the cluster is created. */
  publicIPv6PrefixId?: string;
  /** Specify the resource id of a DDoS network protection plan that will be associated with the virtual network of the cluster. */
  ddosProtectionPlanId?: string;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicy;
  /** The port used for token-auth based HTTPS connections to the cluster. Cannot be set to the same port as HttpGatewayEndpoint. */
  httpGatewayTokenAuthConnectionPort?: number;
  /** If true, token-based authentication is not allowed on the HttpGatewayEndpoint. This is required to support TLS versions 1.3 and above. If token-based authentication is used, HttpGatewayTokenAuthConnectionPort must be defined. */
  enableHttpGatewayExclusiveAuthMode?: boolean;
  /** This property is the entry point to using a public CA cert for your cluster cert. It specifies the level of reuse allowed for the custom FQDN created, matching the subject of the public CA cert. */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /** The number of outbound ports allocated for SNAT for each node in the backend pool of the default load balancer. The default value is 0 which provides dynamic port allocation based on pool size. */
  allocatedOutboundPorts?: number;
  /** The VM image the node types are configured with. This property controls the Service Fabric component packages to be used for the cluster. Allowed values are: 'Windows'. The default value is 'Windows'. */
  vmImage?: string;
  /** Enable the creation of node types with only outbound traffic enabled. If set, a separate load balancer backend pool will be created for node types with inbound traffic enabled. Can only be set at the time of cluster creation. */
  enableOutboundOnlyNodeTypes?: boolean;
}

export function managedClusterPropertiesSerializer(item: ManagedClusterProperties): any {
  return {
    dnsName: item["dnsName"],
    clientConnectionPort: item["clientConnectionPort"],
    httpGatewayConnectionPort: item["httpGatewayConnectionPort"],
    adminUserName: item["adminUserName"],
    adminPassword: item["adminPassword"],
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArraySerializer(item["loadBalancingRules"]),
    allowRdpAccess: item["allowRdpAccess"],
    networkSecurityRules: !item["networkSecurityRules"]
      ? item["networkSecurityRules"]
      : networkSecurityRuleArraySerializer(item["networkSecurityRules"]),
    clients: !item["clients"] ? item["clients"] : clientCertificateArraySerializer(item["clients"]),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectorySerializer(item["azureActiveDirectory"]),
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArraySerializer(item["fabricSettings"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    clusterUpgradeMode: item["clusterUpgradeMode"],
    clusterUpgradeCadence: item["clusterUpgradeCadence"],
    addonFeatures: !item["addonFeatures"]
      ? item["addonFeatures"]
      : item["addonFeatures"].map((p: any) => {
          return p;
        }),
    enableAutoOSUpgrade: item["enableAutoOSUpgrade"],
    zonalResiliency: item["zonalResiliency"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicySerializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    enableIpv6: item["enableIpv6"],
    subnetId: item["subnetId"],
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArraySerializer(item["ipTags"]),
    enableServicePublicIP: item["enableServicePublicIP"],
    auxiliarySubnets: !item["auxiliarySubnets"]
      ? item["auxiliarySubnets"]
      : subnetArraySerializer(item["auxiliarySubnets"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointArraySerializer(item["serviceEndpoints"]),
    zonalUpdateMode: item["zonalUpdateMode"],
    useCustomVnet: item["useCustomVnet"],
    publicIPPrefixId: item["publicIPPrefixId"],
    publicIPv6PrefixId: item["publicIPv6PrefixId"],
    ddosProtectionPlanId: item["ddosProtectionPlanId"],
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicySerializer(item["upgradeDescription"]),
    httpGatewayTokenAuthConnectionPort: item["httpGatewayTokenAuthConnectionPort"],
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    VMImage: item["vmImage"],
    enableOutboundOnlyNodeTypes: item["enableOutboundOnlyNodeTypes"],
  };
}

export function managedClusterPropertiesDeserializer(item: any): ManagedClusterProperties {
  return {
    dnsName: item["dnsName"],
    fqdn: item["fqdn"],
    ipv4Address: item["ipv4Address"],
    clusterId: item["clusterId"],
    clusterState: item["clusterState"],
    clusterCertificateThumbprints: !item["clusterCertificateThumbprints"]
      ? item["clusterCertificateThumbprints"]
      : item["clusterCertificateThumbprints"].map((p: any) => {
          return p;
        }),
    clientConnectionPort: item["clientConnectionPort"],
    httpGatewayConnectionPort: item["httpGatewayConnectionPort"],
    adminUserName: item["adminUserName"],
    adminPassword: item["adminPassword"],
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancingRuleArrayDeserializer(item["loadBalancingRules"]),
    allowRdpAccess: item["allowRdpAccess"],
    networkSecurityRules: !item["networkSecurityRules"]
      ? item["networkSecurityRules"]
      : networkSecurityRuleArrayDeserializer(item["networkSecurityRules"]),
    clients: !item["clients"]
      ? item["clients"]
      : clientCertificateArrayDeserializer(item["clients"]),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectoryDeserializer(item["azureActiveDirectory"]),
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArrayDeserializer(item["fabricSettings"]),
    provisioningState: item["provisioningState"],
    clusterCodeVersion: item["clusterCodeVersion"],
    clusterUpgradeMode: item["clusterUpgradeMode"],
    clusterUpgradeCadence: item["clusterUpgradeCadence"],
    addonFeatures: !item["addonFeatures"]
      ? item["addonFeatures"]
      : item["addonFeatures"].map((p: any) => {
          return p;
        }),
    enableAutoOSUpgrade: item["enableAutoOSUpgrade"],
    zonalResiliency: item["zonalResiliency"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicyDeserializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    enableIpv6: item["enableIpv6"],
    subnetId: item["subnetId"],
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArrayDeserializer(item["ipTags"]),
    ipv6Address: item["ipv6Address"],
    enableServicePublicIP: item["enableServicePublicIP"],
    auxiliarySubnets: !item["auxiliarySubnets"]
      ? item["auxiliarySubnets"]
      : subnetArrayDeserializer(item["auxiliarySubnets"]),
    serviceEndpoints: !item["serviceEndpoints"]
      ? item["serviceEndpoints"]
      : serviceEndpointArrayDeserializer(item["serviceEndpoints"]),
    zonalUpdateMode: item["zonalUpdateMode"],
    useCustomVnet: item["useCustomVnet"],
    publicIPPrefixId: item["publicIPPrefixId"],
    publicIPv6PrefixId: item["publicIPv6PrefixId"],
    ddosProtectionPlanId: item["ddosProtectionPlanId"],
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicyDeserializer(item["upgradeDescription"]),
    httpGatewayTokenAuthConnectionPort: item["httpGatewayTokenAuthConnectionPort"],
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    vmImage: item["VMImage"],
    enableOutboundOnlyNodeTypes: item["enableOutboundOnlyNodeTypes"],
  };
}

/** The current state of the cluster. */
export enum KnownClusterState {
  /** Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it. */
  WaitingForNodes = "WaitingForNodes",
  /** Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up. */
  Deploying = "Deploying",
  /** Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time. */
  BaselineUpgrade = "BaselineUpgrade",
  /** Indicates that the cluster is being upgraded with the user provided configuration. */
  Upgrading = "Upgrading",
  /** Indicates that the last upgrade for the cluster has failed. */
  UpgradeFailed = "UpgradeFailed",
  /** Indicates that the cluster is in a stable state. */
  Ready = "Ready",
}

/**
 * The current state of the cluster. \
 * {@link KnownClusterState} can be used interchangeably with ClusterState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaitingForNodes**: Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it. \
 * **Deploying**: Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up. \
 * **BaselineUpgrade**: Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time. \
 * **Upgrading**: Indicates that the cluster is being upgraded with the user provided configuration. \
 * **UpgradeFailed**: Indicates that the last upgrade for the cluster has failed. \
 * **Ready**: Indicates that the cluster is in a stable state.
 */
export type ClusterState = string;

export function loadBalancingRuleArraySerializer(result: Array<LoadBalancingRule>): any[] {
  return result.map((item) => {
    return loadBalancingRuleSerializer(item);
  });
}

export function loadBalancingRuleArrayDeserializer(result: Array<LoadBalancingRule>): any[] {
  return result.map((item) => {
    return loadBalancingRuleDeserializer(item);
  });
}

/** Describes a load balancing rule. */
export interface LoadBalancingRule {
  /** The port for the external endpoint. Port numbers for each rule must be unique within the Load Balancer. Acceptable values are between 1 and 65534. */
  frontendPort: number;
  /** The port used for internal connections on the endpoint. Acceptable values are between 1 and 65535. */
  backendPort: number;
  /** The reference to the transport protocol used by the load balancing rule. */
  protocol: Protocol;
  /** The prob port used by the load balancing rule. Acceptable values are between 1 and 65535. */
  probePort?: number;
  /** the reference to the load balancer probe used by the load balancing rule. */
  probeProtocol: ProbeProtocol;
  /** The probe request path. Only supported for HTTP/HTTPS probes. */
  probeRequestPath?: string;
  /** The load distribution policy for this rule. */
  loadDistribution?: string;
}

export function loadBalancingRuleSerializer(item: LoadBalancingRule): any {
  return {
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    protocol: item["protocol"],
    probePort: item["probePort"],
    probeProtocol: item["probeProtocol"],
    probeRequestPath: item["probeRequestPath"],
    loadDistribution: item["loadDistribution"],
  };
}

export function loadBalancingRuleDeserializer(item: any): LoadBalancingRule {
  return {
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    protocol: item["protocol"],
    probePort: item["probePort"],
    probeProtocol: item["probeProtocol"],
    probeRequestPath: item["probeRequestPath"],
    loadDistribution: item["loadDistribution"],
  };
}

/** The reference to the transport protocol used by the load balancing rule. */
export enum KnownProtocol {
  /** Transport protocol is TCP. */
  Tcp = "tcp",
  /** Transport protocol is UDP. */
  Udp = "udp",
}

/**
 * The reference to the transport protocol used by the load balancing rule. \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tcp**: Transport protocol is TCP. \
 * **udp**: Transport protocol is UDP.
 */
export type Protocol = string;

/** The reference to the load balancer probe used by the load balancing rule. */
export enum KnownProbeProtocol {
  /** Probe protocol is TCP. */
  Tcp = "tcp",
  /** Probe protocol is HTTP. */
  Http = "http",
  /** Probe protocol is HTTPS. */
  Https = "https",
}

/**
 * The reference to the load balancer probe used by the load balancing rule. \
 * {@link KnownProbeProtocol} can be used interchangeably with ProbeProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tcp**: Probe protocol is TCP. \
 * **http**: Probe protocol is HTTP. \
 * **https**: Probe protocol is HTTPS.
 */
export type ProbeProtocol = string;

export function networkSecurityRuleArraySerializer(result: Array<NetworkSecurityRule>): any[] {
  return result.map((item) => {
    return networkSecurityRuleSerializer(item);
  });
}

export function networkSecurityRuleArrayDeserializer(result: Array<NetworkSecurityRule>): any[] {
  return result.map((item) => {
    return networkSecurityRuleDeserializer(item);
  });
}

/** Describes a network security rule. */
export interface NetworkSecurityRule {
  /** Network security rule name. */
  name: string;
  /** Network security rule description. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: NsgProtocol;
  /** The CIDR or source IP ranges. */
  sourceAddressPrefixes?: string[];
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: string[];
  /** The source port ranges. */
  sourcePortRanges?: string[];
  /** The destination port ranges. */
  destinationPortRanges?: string[];
  /** The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. */
  sourceAddressPrefix?: string;
  /** The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. */
  destinationAddressPrefix?: string;
  /** The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  sourcePortRange?: string;
  /** he destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  destinationPortRange?: string;
  /** The network traffic is allowed or denied. */
  access: Access;
  /** The priority of the rule. The value can be in the range 1000 to 3000. Values outside this range are reserved for Service Fabric ManagerCluster Resource Provider. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority: number;
  /** Network security rule direction. */
  direction: Direction;
}

export function networkSecurityRuleSerializer(item: NetworkSecurityRule): any {
  return {
    name: item["name"],
    description: item["description"],
    protocol: item["protocol"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    sourceAddressPrefix: item["sourceAddressPrefix"],
    destinationAddressPrefix: item["destinationAddressPrefix"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
  };
}

export function networkSecurityRuleDeserializer(item: any): NetworkSecurityRule {
  return {
    name: item["name"],
    description: item["description"],
    protocol: item["protocol"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    sourceAddressPrefix: item["sourceAddressPrefix"],
    destinationAddressPrefix: item["destinationAddressPrefix"],
    sourcePortRange: item["sourcePortRange"],
    destinationPortRange: item["destinationPortRange"],
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
  };
}

/** Network protocol this rule applies to. */
export enum KnownNsgProtocol {
  /** Protocol applies to HTTP. */
  Http = "http",
  /** Protocol applies to HTTPS. */
  Https = "https",
  /** Protocol applies to TCP. */
  Tcp = "tcp",
  /** Protocol applies to UDP. */
  Udp = "udp",
  /** Protocol applies to ICMP. */
  Icmp = "icmp",
  /** Protocol applies to AH. */
  Ah = "ah",
  /** Protocol applies to ESP. */
  Esp = "esp",
}

/**
 * Network protocol this rule applies to. \
 * {@link KnownNsgProtocol} can be used interchangeably with NsgProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http**: Protocol applies to HTTP. \
 * **https**: Protocol applies to HTTPS. \
 * **tcp**: Protocol applies to TCP. \
 * **udp**: Protocol applies to UDP. \
 * **icmp**: Protocol applies to ICMP. \
 * **ah**: Protocol applies to AH. \
 * **esp**: Protocol applies to ESP.
 */
export type NsgProtocol = string;

/** The network traffic is allowed or denied. */
export enum KnownAccess {
  /** The network traffic is allowed. */
  Allow = "allow",
  /** The network traffic is denied. */
  Deny = "deny",
}

/**
 * The network traffic is allowed or denied. \
 * {@link KnownAccess} can be used interchangeably with Access,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **allow**: The network traffic is allowed. \
 * **deny**: The network traffic is denied.
 */
export type Access = string;

/** Network security rule direction. */
export enum KnownDirection {
  /** Inbound direction. */
  Inbound = "inbound",
  /** Outbound direction. */
  Outbound = "outbound",
}

/**
 * Network security rule direction. \
 * {@link KnownDirection} can be used interchangeably with Direction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inbound**: Inbound direction. \
 * **outbound**: Outbound direction.
 */
export type Direction = string;

export function clientCertificateArraySerializer(result: Array<ClientCertificate>): any[] {
  return result.map((item) => {
    return clientCertificateSerializer(item);
  });
}

export function clientCertificateArrayDeserializer(result: Array<ClientCertificate>): any[] {
  return result.map((item) => {
    return clientCertificateDeserializer(item);
  });
}

/** Client certificate definition. */
export interface ClientCertificate {
  /** Indicates if the client certificate has admin access to the cluster. Non admin clients can perform only read only operations on the cluster. */
  isAdmin: boolean;
  /** Certificate thumbprint. */
  thumbprint?: string;
  /** Certificate common name. */
  commonName?: string;
  /** Issuer thumbprint for the certificate. Only used together with CommonName. */
  issuerThumbprint?: string;
}

export function clientCertificateSerializer(item: ClientCertificate): any {
  return {
    isAdmin: item["isAdmin"],
    thumbprint: item["thumbprint"],
    commonName: item["commonName"],
    issuerThumbprint: item["issuerThumbprint"],
  };
}

export function clientCertificateDeserializer(item: any): ClientCertificate {
  return {
    isAdmin: item["isAdmin"],
    thumbprint: item["thumbprint"],
    commonName: item["commonName"],
    issuerThumbprint: item["issuerThumbprint"],
  };
}

/** The settings to enable AAD authentication on the cluster. */
export interface AzureActiveDirectory {
  /** Azure active directory tenant id. */
  tenantId?: string;
  /** Azure active directory cluster application id. */
  clusterApplication?: string;
  /** Azure active directory client application id. */
  clientApplication?: string;
}

export function azureActiveDirectorySerializer(item: AzureActiveDirectory): any {
  return {
    tenantId: item["tenantId"],
    clusterApplication: item["clusterApplication"],
    clientApplication: item["clientApplication"],
  };
}

export function azureActiveDirectoryDeserializer(item: any): AzureActiveDirectory {
  return {
    tenantId: item["tenantId"],
    clusterApplication: item["clusterApplication"],
    clientApplication: item["clientApplication"],
  };
}

export function settingsSectionDescriptionArraySerializer(
  result: Array<SettingsSectionDescription>,
): any[] {
  return result.map((item) => {
    return settingsSectionDescriptionSerializer(item);
  });
}

export function settingsSectionDescriptionArrayDeserializer(
  result: Array<SettingsSectionDescription>,
): any[] {
  return result.map((item) => {
    return settingsSectionDescriptionDeserializer(item);
  });
}

/** Describes a section in the fabric settings of the cluster. */
export interface SettingsSectionDescription {
  /** The section name of the fabric settings. */
  name: string;
  /** The collection of parameters in the section. */
  parameters: SettingsParameterDescription[];
}

export function settingsSectionDescriptionSerializer(item: SettingsSectionDescription): any {
  return {
    name: item["name"],
    parameters: settingsParameterDescriptionArraySerializer(item["parameters"]),
  };
}

export function settingsSectionDescriptionDeserializer(item: any): SettingsSectionDescription {
  return {
    name: item["name"],
    parameters: settingsParameterDescriptionArrayDeserializer(item["parameters"]),
  };
}

export function settingsParameterDescriptionArraySerializer(
  result: Array<SettingsParameterDescription>,
): any[] {
  return result.map((item) => {
    return settingsParameterDescriptionSerializer(item);
  });
}

export function settingsParameterDescriptionArrayDeserializer(
  result: Array<SettingsParameterDescription>,
): any[] {
  return result.map((item) => {
    return settingsParameterDescriptionDeserializer(item);
  });
}

/** Describes a parameter in fabric settings of the cluster. */
export interface SettingsParameterDescription {
  /** The parameter name of fabric setting. */
  name: string;
  /** The parameter value of fabric setting. */
  value: string;
}

export function settingsParameterDescriptionSerializer(item: SettingsParameterDescription): any {
  return { name: item["name"], value: item["value"] };
}

export function settingsParameterDescriptionDeserializer(item: any): SettingsParameterDescription {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The provisioning state of the managed resource. */
export enum KnownManagedResourceProvisioningState {
  /** The resource does not have a provisioning state. */
  None = "None",
  /** The resource is being created. */
  Creating = "Creating",
  /** The resource is created. */
  Created = "Created",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource provisioning has succeeded. */
  Succeeded = "Succeeded",
  /** The resource provisioning has failed. */
  Failed = "Failed",
  /** The resource provisioning has been canceled. */
  Canceled = "Canceled",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The resource has been deleted. */
  Deleted = "Deleted",
  /** The resource provisioning state is a state other than the previously specified states. */
  Other = "Other",
}

/**
 * The provisioning state of the managed resource. \
 * {@link KnownManagedResourceProvisioningState} can be used interchangeably with ManagedResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The resource does not have a provisioning state. \
 * **Creating**: The resource is being created. \
 * **Created**: The resource is created. \
 * **Updating**: The resource is being updated. \
 * **Succeeded**: The resource provisioning has succeeded. \
 * **Failed**: The resource provisioning has failed. \
 * **Canceled**: The resource provisioning has been canceled. \
 * **Deleting**: The resource is being deleted. \
 * **Deleted**: The resource has been deleted. \
 * **Other**: The resource provisioning state is a state other than the previously specified states.
 */
export type ManagedResourceProvisioningState = string;

/** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
export enum KnownClusterUpgradeMode {
  /** The cluster will be automatically upgraded to the latest Service Fabric runtime version, **clusterUpgradeCadence** will determine when the upgrade starts after the new version becomes available. */
  Automatic = "Automatic",
  /** The cluster will not be automatically upgraded to the latest Service Fabric runtime version. The cluster is upgraded by setting the **clusterCodeVersion** property in the cluster resource. */
  Manual = "Manual",
}

/**
 * The upgrade mode of the cluster when new Service Fabric runtime version is available. \
 * {@link KnownClusterUpgradeMode} can be used interchangeably with ClusterUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: The cluster will be automatically upgraded to the latest Service Fabric runtime version, **clusterUpgradeCadence** will determine when the upgrade starts after the new version becomes available. \
 * **Manual**: The cluster will not be automatically upgraded to the latest Service Fabric runtime version. The cluster is upgraded by setting the **clusterCodeVersion** property in the cluster resource.
 */
export type ClusterUpgradeMode = string;

/** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. */
export enum KnownClusterUpgradeCadence {
  /** Cluster upgrade starts immediately after a new version is rolled out. Recommended for Test/Dev clusters. */
  Wave0 = "Wave0",
  /** Cluster upgrade starts 7 days after a new version is rolled out. Recommended for Pre-prod clusters. */
  Wave1 = "Wave1",
  /** Cluster upgrade starts 14 days after a new version is rolled out. Recommended for Production clusters. */
  Wave2 = "Wave2",
}

/**
 * Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. \
 * {@link KnownClusterUpgradeCadence} can be used interchangeably with ClusterUpgradeCadence,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Wave0**: Cluster upgrade starts immediately after a new version is rolled out. Recommended for Test\/Dev clusters. \
 * **Wave1**: Cluster upgrade starts 7 days after a new version is rolled out. Recommended for Pre-prod clusters. \
 * **Wave2**: Cluster upgrade starts 14 days after a new version is rolled out. Recommended for Production clusters.
 */
export type ClusterUpgradeCadence = string;

/** Available cluster add-on features */
export enum KnownManagedClusterAddOnFeature {
  /** Dns service */
  DnsService = "DnsService",
  /** Backup and restore service */
  BackupRestoreService = "BackupRestoreService",
  /** Resource monitor service */
  ResourceMonitorService = "ResourceMonitorService",
}

/**
 * Available cluster add-on features \
 * {@link KnownManagedClusterAddOnFeature} can be used interchangeably with ManagedClusterAddOnFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DnsService**: Dns service \
 * **BackupRestoreService**: Backup and restore service \
 * **ResourceMonitorService**: Resource monitor service
 */
export type ManagedClusterAddOnFeature = string;

/** The policy used to clean up unused versions. When the policy is not specified explicitly, the default unused application versions to keep will be 3. */
export interface ApplicationTypeVersionsCleanupPolicy {
  /** Number of unused versions per application type to keep. */
  maxUnusedVersionsToKeep: number;
}

export function applicationTypeVersionsCleanupPolicySerializer(
  item: ApplicationTypeVersionsCleanupPolicy,
): any {
  return { maxUnusedVersionsToKeep: item["maxUnusedVersionsToKeep"] };
}

export function applicationTypeVersionsCleanupPolicyDeserializer(
  item: any,
): ApplicationTypeVersionsCleanupPolicy {
  return {
    maxUnusedVersionsToKeep: item["maxUnusedVersionsToKeep"],
  };
}

export function ipTagArraySerializer(result: Array<IpTag>): any[] {
  return result.map((item) => {
    return ipTagSerializer(item);
  });
}

export function ipTagArrayDeserializer(result: Array<IpTag>): any[] {
  return result.map((item) => {
    return ipTagDeserializer(item);
  });
}

/** The IP tag associated with the public IP address. */
export interface IpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag: string;
}

export function ipTagSerializer(item: IpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function ipTagDeserializer(item: any): IpTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
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

/** Describes a Subnet. */
export interface Subnet {
  /** Subnet name. */
  name: string;
  /** Indicates wether to enable Ipv6 or not. If not provided, it will take the same configuration as the cluster. */
  enableIpv6?: boolean;
  /** Enable or Disable apply network policies on private end point in the subnet. */
  privateEndpointNetworkPolicies?: PrivateEndpointNetworkPolicies;
  /** Enable or Disable apply network policies on private link service in the subnet. */
  privateLinkServiceNetworkPolicies?: PrivateLinkServiceNetworkPolicies;
  /** Full resource id for the network security group. */
  networkSecurityGroupId?: string;
}

export function subnetSerializer(item: Subnet): any {
  return {
    name: item["name"],
    enableIpv6: item["enableIpv6"],
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    networkSecurityGroupId: item["networkSecurityGroupId"],
  };
}

export function subnetDeserializer(item: any): Subnet {
  return {
    name: item["name"],
    enableIpv6: item["enableIpv6"],
    privateEndpointNetworkPolicies: item["privateEndpointNetworkPolicies"],
    privateLinkServiceNetworkPolicies: item["privateLinkServiceNetworkPolicies"],
    networkSecurityGroupId: item["networkSecurityGroupId"],
  };
}

/** Enable or Disable apply network policies on private end point in the subnet. */
export enum KnownPrivateEndpointNetworkPolicies {
  /** Enable apply network policies on private end point in the subnet. */
  Enabled = "enabled",
  /** Disable apply network policies on private end point in the subnet. */
  Disabled = "disabled",
}

/**
 * Enable or Disable apply network policies on private end point in the subnet. \
 * {@link KnownPrivateEndpointNetworkPolicies} can be used interchangeably with PrivateEndpointNetworkPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: Enable apply network policies on private end point in the subnet. \
 * **disabled**: Disable apply network policies on private end point in the subnet.
 */
export type PrivateEndpointNetworkPolicies = string;

/** Enable or Disable apply network policies on private link service in the subnet. */
export enum KnownPrivateLinkServiceNetworkPolicies {
  /** Enable apply network policies on private link service in the subnet. */
  Enabled = "enabled",
  /** Disable apply network policies on private link service in the subnet. */
  Disabled = "disabled",
}

/**
 * Enable or Disable apply network policies on private link service in the subnet. \
 * {@link KnownPrivateLinkServiceNetworkPolicies} can be used interchangeably with PrivateLinkServiceNetworkPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: Enable apply network policies on private link service in the subnet. \
 * **disabled**: Disable apply network policies on private link service in the subnet.
 */
export type PrivateLinkServiceNetworkPolicies = string;

export function serviceEndpointArraySerializer(result: Array<ServiceEndpoint>): any[] {
  return result.map((item) => {
    return serviceEndpointSerializer(item);
  });
}

export function serviceEndpointArrayDeserializer(result: Array<ServiceEndpoint>): any[] {
  return result.map((item) => {
    return serviceEndpointDeserializer(item);
  });
}

/** The service endpoint properties. */
export interface ServiceEndpoint {
  /** The type of the endpoint service. */
  service: string;
  /** A list of locations. */
  locations?: string[];
  /** Specifies the resource id of the service endpoint to be used in the cluster. */
  networkIdentifier?: string;
}

export function serviceEndpointSerializer(item: ServiceEndpoint): any {
  return {
    service: item["service"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    networkIdentifier: item["networkIdentifier"],
  };
}

export function serviceEndpointDeserializer(item: any): ServiceEndpoint {
  return {
    service: item["service"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    networkIdentifier: item["networkIdentifier"],
  };
}

/** Indicates the update mode for Cross Az clusters. */
export enum KnownZonalUpdateMode {
  /** The cluster will use 5 upgrade domains for Cross Az Node types. */
  Standard = "Standard",
  /** The cluster will use a maximum of 3 upgrade domains per zone instead of 5 for Cross Az Node types for faster deployments. */
  Fast = "Fast",
}

/**
 * Indicates the update mode for Cross Az clusters. \
 * {@link KnownZonalUpdateMode} can be used interchangeably with ZonalUpdateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: The cluster will use 5 upgrade domains for Cross Az Node types. \
 * **Fast**: The cluster will use a maximum of 3 upgrade domains per zone instead of 5 for Cross Az Node types for faster deployments.
 */
export type ZonalUpdateMode = string;

/** Describes the policy used when upgrading the cluster. */
export interface ClusterUpgradePolicy {
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The cluster health policy defines a health policy used to evaluate the health of the cluster during a cluster upgrade. */
  healthPolicy?: ClusterHealthPolicy;
  /** The cluster delta health policy defines a health policy used to evaluate the health of the cluster during a cluster upgrade. */
  deltaHealthPolicy?: ClusterUpgradeDeltaHealthPolicy;
  /** The cluster monitoring policy describes the parameters for monitoring an upgrade in Monitored mode. */
  monitoringPolicy?: ClusterMonitoringPolicy;
  /**
   * The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues.
   * When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues.
   * The timeout is reset at the start of each upgrade domain. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format.
   * This value must be between 00:00:00 and 49710.06:28:15 (unsigned 32 bit integer for seconds)
   */
  upgradeReplicaSetCheckTimeout?: string;
}

export function clusterUpgradePolicySerializer(item: ClusterUpgradePolicy): any {
  return {
    forceRestart: item["forceRestart"],
    healthPolicy: !item["healthPolicy"]
      ? item["healthPolicy"]
      : clusterHealthPolicySerializer(item["healthPolicy"]),
    deltaHealthPolicy: !item["deltaHealthPolicy"]
      ? item["deltaHealthPolicy"]
      : clusterUpgradeDeltaHealthPolicySerializer(item["deltaHealthPolicy"]),
    monitoringPolicy: !item["monitoringPolicy"]
      ? item["monitoringPolicy"]
      : clusterMonitoringPolicySerializer(item["monitoringPolicy"]),
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
  };
}

export function clusterUpgradePolicyDeserializer(item: any): ClusterUpgradePolicy {
  return {
    forceRestart: item["forceRestart"],
    healthPolicy: !item["healthPolicy"]
      ? item["healthPolicy"]
      : clusterHealthPolicyDeserializer(item["healthPolicy"]),
    deltaHealthPolicy: !item["deltaHealthPolicy"]
      ? item["deltaHealthPolicy"]
      : clusterUpgradeDeltaHealthPolicyDeserializer(item["deltaHealthPolicy"]),
    monitoringPolicy: !item["monitoringPolicy"]
      ? item["monitoringPolicy"]
      : clusterMonitoringPolicyDeserializer(item["monitoringPolicy"]),
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
  };
}

/** Defines a health policy used to evaluate the health of the cluster or of a cluster node. */
export interface ClusterHealthPolicy {
  /**
   * The maximum allowed percentage of unhealthy nodes before reporting an error. For example, to allow 10% of nodes to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of nodes that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy node, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy nodes over the total number of nodes in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   *
   * In large clusters, some nodes will always be down or out for repairs, so this percentage should be configured to tolerate that.
   */
  maxPercentUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of unhealthy applications before reporting an error. For example, to allow 10% of applications to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of applications that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy application, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy applications over the total number of application instances in the cluster, excluding applications of application types that are included in the ApplicationTypeHealthPolicyMap.
   * The computation rounds up to tolerate one failure on small numbers of applications. Default percentage is zero.
   */
  maxPercentUnhealthyApplications: number;
}

export function clusterHealthPolicySerializer(item: ClusterHealthPolicy): any {
  return {
    maxPercentUnhealthyNodes: item["maxPercentUnhealthyNodes"],
    maxPercentUnhealthyApplications: item["maxPercentUnhealthyApplications"],
  };
}

export function clusterHealthPolicyDeserializer(item: any): ClusterHealthPolicy {
  return {
    maxPercentUnhealthyNodes: item["maxPercentUnhealthyNodes"],
    maxPercentUnhealthyApplications: item["maxPercentUnhealthyApplications"],
  };
}

/** Describes the delta health policies for the cluster upgrade. */
export interface ClusterUpgradeDeltaHealthPolicy {
  /**
   * The maximum allowed percentage of nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the nodes at the beginning of upgrade and the state of the nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits.
   */
  maxPercentDeltaUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of upgrade domain nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the upgrade domain nodes at the beginning of upgrade and the state of the upgrade domain nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion for all completed upgrade domains to make sure the state of the upgrade domains is within tolerated limits.
   */
  maxPercentUpgradeDomainDeltaUnhealthyNodes?: number;
  /**
   * The maximum allowed percentage of applications health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the applications at the beginning of upgrade and the state of the applications at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits. System services are not included in this.
   * NOTE: This value will overwrite the value specified in properties.UpgradeDescription.HealthPolicy.MaxPercentUnhealthyApplications
   */
  maxPercentDeltaUnhealthyApplications?: number;
}

export function clusterUpgradeDeltaHealthPolicySerializer(
  item: ClusterUpgradeDeltaHealthPolicy,
): any {
  return {
    maxPercentDeltaUnhealthyNodes: item["maxPercentDeltaUnhealthyNodes"],
    maxPercentUpgradeDomainDeltaUnhealthyNodes: item["maxPercentUpgradeDomainDeltaUnhealthyNodes"],
    maxPercentDeltaUnhealthyApplications: item["maxPercentDeltaUnhealthyApplications"],
  };
}

export function clusterUpgradeDeltaHealthPolicyDeserializer(
  item: any,
): ClusterUpgradeDeltaHealthPolicy {
  return {
    maxPercentDeltaUnhealthyNodes: item["maxPercentDeltaUnhealthyNodes"],
    maxPercentUpgradeDomainDeltaUnhealthyNodes: item["maxPercentUpgradeDomainDeltaUnhealthyNodes"],
    maxPercentDeltaUnhealthyApplications: item["maxPercentDeltaUnhealthyApplications"],
  };
}

/** Describes the monitoring policies for the cluster upgrade. */
export interface ClusterMonitoringPolicy {
  /** The length of time to wait after completing an upgrade domain before performing health checks. The duration can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckWaitDuration: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. The duration can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckStableDuration: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckRetryTimeout: string;
  /** The amount of time the overall upgrade has to complete before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  upgradeTimeout: string;
  /** The amount of time each upgrade domain has to complete before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  upgradeDomainTimeout: string;
}

export function clusterMonitoringPolicySerializer(item: ClusterMonitoringPolicy): any {
  return {
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

export function clusterMonitoringPolicyDeserializer(item: any): ClusterMonitoringPolicy {
  return {
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

/**
 * This enum is the entrypoint to using a certificate from a public CA for your cluster. This property was introduced to solve the
 * domain squatting problem with new domains. A domain name will be generated in the following format: {clustername}.{hash}.{regionname}.sfmcdomain.
 * The hash portion comes from Azure DNS' Deterministic Name Library. The library creates a hash using the cluster's Tenant, Subscription, Resource Group
 * and Resource Name using the AutoGeneratedDomainNameLabelScope/reuse policy chosen.
 */
export enum KnownAutoGeneratedDomainNameLabelScope {
  /** TenantReuse allows for the same hash to be created if the resource is created in the same Tenant with the same resource name. */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse allows for the same hash to be created if the resource is created in the same Subscription with the same resource name. */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse allows for the same hash to be created if the resource is created in the same Resource Group with the same resource name. */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** NoReuse will create a new hash regardless of the Subscription, Resource Group, Tenant and Resource name. */
  NoReuse = "NoReuse",
}

/**
 * This enum is the entrypoint to using a certificate from a public CA for your cluster. This property was introduced to solve the
 * domain squatting problem with new domains. A domain name will be generated in the following format: {clustername}.{hash}.{regionname}.sfmcdomain.
 * The hash portion comes from Azure DNS' Deterministic Name Library. The library creates a hash using the cluster's Tenant, Subscription, Resource Group
 * and Resource Name using the AutoGeneratedDomainNameLabelScope/reuse policy chosen. \
 * {@link KnownAutoGeneratedDomainNameLabelScope} can be used interchangeably with AutoGeneratedDomainNameLabelScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse**: TenantReuse allows for the same hash to be created if the resource is created in the same Tenant with the same resource name. \
 * **SubscriptionReuse**: SubscriptionReuse allows for the same hash to be created if the resource is created in the same Subscription with the same resource name. \
 * **ResourceGroupReuse**: ResourceGroupReuse allows for the same hash to be created if the resource is created in the same Resource Group with the same resource name. \
 * **NoReuse**: NoReuse will create a new hash regardless of the Subscription, Resource Group, Tenant and Resource name.
 */
export type AutoGeneratedDomainNameLabelScope = string;

/** Service Fabric managed cluster Sku definition */
export interface Sku {
  /** Sku Name. */
  name: SkuName;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** Sku Name. */
export enum KnownSkuName {
  /** Basic requires a minimum of 3 nodes and allows only 1 node type. */
  Basic = "Basic",
  /** Requires a minimum of 5 nodes and allows 1 or more node type. */
  Standard = "Standard",
}

/**
 * Sku Name. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic requires a minimum of 3 nodes and allows only 1 node type. \
 * **Standard**: Requires a minimum of 5 nodes and allows 1 or more node type.
 */
export type SkuName = string;

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

/** Managed cluster update request */
export interface ManagedClusterUpdateParameters {
  /** Managed cluster update parameters */
  tags?: Record<string, string>;
}

export function managedClusterUpdateParametersSerializer(
  item: ManagedClusterUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** The response of a ManagedCluster list operation. */
export interface _ManagedClusterListResult {
  /** The ManagedCluster items on this page */
  value: ManagedCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedClusterListResultDeserializer(item: any): _ManagedClusterListResult {
  return {
    value: managedClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedClusterArraySerializer(result: Array<ManagedCluster>): any[] {
  return result.map((item) => {
    return managedClusterSerializer(item);
  });
}

export function managedClusterArrayDeserializer(result: Array<ManagedCluster>): any[] {
  return result.map((item) => {
    return managedClusterDeserializer(item);
  });
}

/** Parameters for Fault Simulation id. */
export interface FaultSimulationIdContent {
  /** unique identifier for the fault simulation. */
  simulationId: string;
}

export function faultSimulationIdContentSerializer(item: FaultSimulationIdContent): any {
  return { simulationId: item["simulationId"] };
}

/** Fault simulation object with status. */
export interface FaultSimulation {
  /** unique identifier for the fault simulation. */
  simulationId?: string;
  /** Fault simulation status */
  status?: FaultSimulationStatus;
  /** The start time of the fault simulation. */
  startTime?: Date;
  /** The end time of the fault simulation. */
  endTime?: Date;
  /** Fault simulation details */
  details?: FaultSimulationDetails;
}

export function faultSimulationDeserializer(item: any): FaultSimulation {
  return {
    simulationId: item["simulationId"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    details: !item["details"]
      ? item["details"]
      : faultSimulationDetailsDeserializer(item["details"]),
  };
}

/** Fault simulation status. */
export enum KnownFaultSimulationStatus {
  /** Indicates the fault simulation is starting. The simulation will have this status while the start operation is in progress. */
  Starting = "Starting",
  /** Indicates the fault simulation is active. The simulation will have this status after the start operation has completed successfully. */
  Active = "Active",
  /** Indicates the fault simulation is stopping. The simulation will have this status while the stop operation is in progress. */
  Stopping = "Stopping",
  /** Indicates the fault simulation is done. The simulation will have this status after the stop operation has completed successfully. */
  Done = "Done",
  /** Indicates the fault simulation has failed on start. The simulation will have this status after the start operation fails. */
  StartFailed = "StartFailed",
  /** Indicates the fault simulation has failed on stop. The simulation will have this status after the stop operation fails. */
  StopFailed = "StopFailed",
}

/**
 * Fault simulation status. \
 * {@link KnownFaultSimulationStatus} can be used interchangeably with FaultSimulationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: Indicates the fault simulation is starting. The simulation will have this status while the start operation is in progress. \
 * **Active**: Indicates the fault simulation is active. The simulation will have this status after the start operation has completed successfully. \
 * **Stopping**: Indicates the fault simulation is stopping. The simulation will have this status while the stop operation is in progress. \
 * **Done**: Indicates the fault simulation is done. The simulation will have this status after the stop operation has completed successfully. \
 * **StartFailed**: Indicates the fault simulation has failed on start. The simulation will have this status after the start operation fails. \
 * **StopFailed**: Indicates the fault simulation has failed on stop. The simulation will have this status after the stop operation fails.
 */
export type FaultSimulationStatus = string;

/** Details for Fault Simulation. */
export interface FaultSimulationDetails {
  /** unique identifier for the cluster resource. */
  clusterId?: string;
  /** unique identifier for the operation associated with the fault simulation. */
  operationId?: string;
  /** List of node type simulations associated with the cluster fault simulation. */
  nodeTypeFaultSimulation?: NodeTypeFaultSimulation[];
  /** Fault simulation parameters. */
  parameters?: FaultSimulationContentUnion;
}

export function faultSimulationDetailsDeserializer(item: any): FaultSimulationDetails {
  return {
    clusterId: item["clusterId"],
    operationId: item["operationId"],
    nodeTypeFaultSimulation: !item["nodeTypeFaultSimulation"]
      ? item["nodeTypeFaultSimulation"]
      : nodeTypeFaultSimulationArrayDeserializer(item["nodeTypeFaultSimulation"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : faultSimulationContentUnionDeserializer(item["parameters"]),
  };
}

export function nodeTypeFaultSimulationArrayDeserializer(
  result: Array<NodeTypeFaultSimulation>,
): any[] {
  return result.map((item) => {
    return nodeTypeFaultSimulationDeserializer(item);
  });
}

/** Node type fault simulation object with status. */
export interface NodeTypeFaultSimulation {
  /** Node type name. */
  nodeTypeName?: string;
  /** Fault simulation status */
  status?: FaultSimulationStatus;
  /** Current or latest asynchronous operation identifier on the node type. */
  operationId?: string;
  /** Current or latest asynchronous operation status on the node type */
  operationStatus?: SfmcOperationStatus;
}

export function nodeTypeFaultSimulationDeserializer(item: any): NodeTypeFaultSimulation {
  return {
    nodeTypeName: item["nodeTypeName"],
    status: item["status"],
    operationId: item["operationId"],
    operationStatus: item["operationStatus"],
  };
}

/** Sfmc operation status. */
export enum KnownSfmcOperationStatus {
  /** Operation created. */
  Created = "Created",
  /** Operation started. */
  Started = "Started",
  /** Operation succeeded. */
  Succeeded = "Succeeded",
  /** Operation failed. */
  Failed = "Failed",
  /** Operation aborted. */
  Aborted = "Aborted",
  /** Operation canceled. */
  Canceled = "Canceled",
}

/**
 * Sfmc operation status. \
 * {@link KnownSfmcOperationStatus} can be used interchangeably with SfmcOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Operation created. \
 * **Started**: Operation started. \
 * **Succeeded**: Operation succeeded. \
 * **Failed**: Operation failed. \
 * **Aborted**: Operation aborted. \
 * **Canceled**: Operation canceled.
 */
export type SfmcOperationStatus = string;

/** Parameters for Fault Simulation action. */
export interface FaultSimulationContent {
  /** The kind of fault to be simulated. */
  /** The discriminator possible values: Zone */
  faultKind: FaultKind;
  /** Force the action to go through without any check on the cluster. */
  force?: boolean;
  /** Constraints for Fault Simulation action. */
  constraints?: FaultSimulationConstraints;
}

export function faultSimulationContentSerializer(item: FaultSimulationContent): any {
  return {
    faultKind: item["faultKind"],
    force: item["force"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : faultSimulationConstraintsSerializer(item["constraints"]),
  };
}

export function faultSimulationContentDeserializer(item: any): FaultSimulationContent {
  return {
    faultKind: item["faultKind"],
    force: item["force"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : faultSimulationConstraintsDeserializer(item["constraints"]),
  };
}

/** Alias for FaultSimulationContentUnion */
export type FaultSimulationContentUnion = ZoneFaultSimulationContent | FaultSimulationContent;

export function faultSimulationContentUnionSerializer(item: FaultSimulationContentUnion): any {
  switch (item.faultKind) {
    case "Zone":
      return zoneFaultSimulationContentSerializer(item as ZoneFaultSimulationContent);

    default:
      return faultSimulationContentSerializer(item);
  }
}

export function faultSimulationContentUnionDeserializer(item: any): FaultSimulationContentUnion {
  switch (item.faultKind) {
    case "Zone":
      return zoneFaultSimulationContentDeserializer(item as ZoneFaultSimulationContent);

    default:
      return faultSimulationContentDeserializer(item);
  }
}

/** The kind of fault simulation. */
export enum KnownFaultKind {
  /** Simulates an availability zone down. */
  Zone = "Zone",
}

/**
 * The kind of fault simulation. \
 * {@link KnownFaultKind} can be used interchangeably with FaultKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zone**: Simulates an availability zone down.
 */
export type FaultKind = string;

/** Constraints for Fault Simulation action. */
export interface FaultSimulationConstraints {
  /** The absolute expiration timestamp (UTC) after which this fault simulation should be stopped if it's still active. */
  expirationTime?: Date;
}

export function faultSimulationConstraintsSerializer(item: FaultSimulationConstraints): any {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : item["expirationTime"].toISOString(),
  };
}

export function faultSimulationConstraintsDeserializer(item: any): FaultSimulationConstraints {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

/** Parameters for Zone Fault Simulation action. */
export interface ZoneFaultSimulationContent extends FaultSimulationContent {
  /** Indicates the zones of the fault simulation. */
  zones?: string[];
  /** The kind of fault simulation. */
  faultKind: "Zone";
}

export function zoneFaultSimulationContentSerializer(item: ZoneFaultSimulationContent): any {
  return {
    faultKind: item["faultKind"],
    force: item["force"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : faultSimulationConstraintsSerializer(item["constraints"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function zoneFaultSimulationContentDeserializer(item: any): ZoneFaultSimulationContent {
  return {
    faultKind: item["faultKind"],
    force: item["force"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : faultSimulationConstraintsDeserializer(item["constraints"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Fault simulation list results */
export interface _FaultSimulationListResult {
  /** The FaultSimulation items on this page */
  value: FaultSimulation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _faultSimulationListResultDeserializer(item: any): _FaultSimulationListResult {
  return {
    value: faultSimulationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function faultSimulationArrayDeserializer(result: Array<FaultSimulation>): any[] {
  return result.map((item) => {
    return faultSimulationDeserializer(item);
  });
}

/** Fault Simulation Request for Start action. */
export interface FaultSimulationContentWrapper {
  /** Parameters for Fault Simulation start action. */
  parameters: FaultSimulationContentUnion;
}

export function faultSimulationContentWrapperSerializer(item: FaultSimulationContentWrapper): any {
  return {
    parameters: faultSimulationContentUnionSerializer(item["parameters"]),
  };
}

/** Describes the result of the request to list Managed VM Sizes for Service Fabric Managed Clusters. */
export interface ManagedAzResiliencyStatus {
  /** List of Managed VM Sizes for Service Fabric Managed Clusters. */
  baseResourceStatus?: ResourceAzStatus[];
  /** URL to get the next set of Managed VM Sizes if there are any. */
  readonly isClusterZoneResilient?: boolean;
}

export function managedAzResiliencyStatusDeserializer(item: any): ManagedAzResiliencyStatus {
  return {
    baseResourceStatus: !item["baseResourceStatus"]
      ? item["baseResourceStatus"]
      : resourceAzStatusArrayDeserializer(item["baseResourceStatus"]),
    isClusterZoneResilient: item["isClusterZoneResilient"],
  };
}

export function resourceAzStatusArrayDeserializer(result: Array<ResourceAzStatus>): any[] {
  return result.map((item) => {
    return resourceAzStatusDeserializer(item);
  });
}

/** Describes Az Resiliency status of Base resources */
export interface ResourceAzStatus {
  /** VM Size properties. */
  readonly resourceName?: string;
  /** VM Size id. */
  readonly resourceType?: string;
  /** VM Size name. */
  readonly isZoneResilient?: boolean;
  /** Zone resiliency status details for the resource. */
  readonly details?: string;
}

export function resourceAzStatusDeserializer(item: any): ResourceAzStatus {
  return {
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    isZoneResilient: item["isZoneResilient"],
    details: item["details"],
  };
}

/** Describes the maintenance window status of the Service Fabric Managed Cluster. */
export interface ManagedMaintenanceWindowStatus {
  /** If maintenance window is enabled on this cluster. */
  readonly isWindowEnabled?: boolean;
  /** Indicates if the region is ready to configure maintenance windows. */
  readonly isRegionReady?: boolean;
  /** If maintenance window is active. */
  readonly isWindowActive?: boolean;
  /** If updates can be applied. */
  readonly canApplyUpdates?: boolean;
  /** Last window update time in UTC. */
  readonly lastWindowStatusUpdateAtUTC?: Date;
  /** Last window start time in UTC. */
  readonly lastWindowStartTimeUTC?: Date;
  /** Last window end time in UTC. */
  readonly lastWindowEndTimeUTC?: Date;
}

export function managedMaintenanceWindowStatusDeserializer(
  item: any,
): ManagedMaintenanceWindowStatus {
  return {
    isWindowEnabled: item["isWindowEnabled"],
    isRegionReady: item["isRegionReady"],
    isWindowActive: item["isWindowActive"],
    canApplyUpdates: item["canApplyUpdates"],
    lastWindowStatusUpdateAtUTC: !item["lastWindowStatusUpdateAtUTC"]
      ? item["lastWindowStatusUpdateAtUTC"]
      : new Date(item["lastWindowStatusUpdateAtUTC"]),
    lastWindowStartTimeUTC: !item["lastWindowStartTimeUTC"]
      ? item["lastWindowStartTimeUTC"]
      : new Date(item["lastWindowStartTimeUTC"]),
    lastWindowEndTimeUTC: !item["lastWindowEndTimeUTC"]
      ? item["lastWindowEndTimeUTC"]
      : new Date(item["lastWindowEndTimeUTC"]),
  };
}

/** Describes a node type in the cluster, each node type represents sub set of nodes in the cluster. */
export interface NodeType extends ProxyResource {
  /** The node type properties */
  properties?: NodeTypeProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The node type sku. */
  sku?: NodeTypeSku;
}

export function nodeTypeSerializer(item: NodeType): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : nodeTypePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : nodeTypeSkuSerializer(item["sku"]),
  };
}

export function nodeTypeDeserializer(item: any): NodeType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nodeTypePropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : nodeTypeSkuDeserializer(item["sku"]),
  };
}

/** Describes a node type in the cluster, each node type represents sub set of nodes in the cluster. */
export interface NodeTypeProperties {
  /** Indicates the Service Fabric system services for the cluster will run on this node type. This setting cannot be changed once the node type is created. */
  isPrimary: boolean;
  /** The number of nodes in the node type. **Values:** -1 - Use when auto scale rules are configured or sku.capacity is defined 0 - Not supported >0 - Use for manual scale. */
  vmInstanceCount: number;
  /** Disk size for the managed disk attached to the vms on the node type in GBs. */
  dataDiskSizeGB?: number;
  /** Managed data disk type. Specifies the storage account type for the managed disk */
  dataDiskType?: DiskType;
  /** Managed data disk letter. It can not use the reserved letter C or D and it can not change after created. */
  dataDiskLetter?: string;
  /** The placement tags applied to nodes in the node type, which can be used to indicate where certain services (workload) should run. */
  placementProperties?: Record<string, string>;
  /** The capacity tags applied to the nodes in the node type, the cluster resource manager uses these tags to understand how much resource a node has. */
  capacities?: Record<string, string>;
  /** The range of ports from which cluster assigned port to Service Fabric applications. */
  applicationPorts?: EndpointRangeDescription;
  /** The range of ephemeral ports that nodes in this node type should be configured with. */
  ephemeralPorts?: EndpointRangeDescription;
  /** The size of virtual machines in the pool. All virtual machines in a pool are the same size. For example, Standard_D3. */
  vmSize?: string;
  /** The publisher of the Azure Virtual Machines Marketplace image. For example, Canonical or MicrosoftWindowsServer. */
  vmImagePublisher?: string;
  /** The offer type of the Azure Virtual Machines Marketplace image. For example, UbuntuServer or WindowsServer. */
  vmImageOffer?: string;
  /** The SKU of the Azure Virtual Machines Marketplace image. For example, 14.04.0-LTS or 2012-R2-Datacenter. */
  vmImageSku?: string;
  /** The version of the Azure Virtual Machines Marketplace image. A value of 'latest' can be specified to select the latest version of an image. If omitted, the default is 'latest'. */
  vmImageVersion?: string;
  /** The secrets to install in the virtual machines. */
  vmSecrets?: VaultSecretGroup[];
  /** Set of extensions that should be installed onto the virtual machines. */
  vmExtensions?: VmssExtension[];
  /** Identities to assign to the virtual machine scale set under the node type. */
  vmManagedIdentity?: VmManagedIdentity;
  /** Indicates if the node type can only host Stateless workloads. */
  isStateless?: boolean;
  /** Indicates if scale set associated with the node type can be composed of multiple placement groups. */
  multiplePlacementGroups?: boolean;
  /** Indicates the node type uses its own frontend configurations instead of the default one for the cluster. This setting can only be specified for non-primary node types and can not be added or removed after the node type is created. */
  frontendConfigurations?: FrontendConfiguration[];
  /** The Network Security Rules for this node type. This setting can only be specified for node types that are configured with frontend configurations. */
  networkSecurityRules?: NetworkSecurityRule[];
  /** Additional managed data disks. */
  additionalDataDisks?: VmssDataDisk[];
  /** Enable or disable the Host Encryption for the virtual machines on the node type. This will enable the encryption for all the disks including Resource/Temp disk at host itself. Default: The Encryption at host will be disabled unless this property is set to true for the resource. */
  enableEncryptionAtHost?: boolean;
  /** The provisioning state of the node type resource. */
  readonly provisioningState?: ManagedResourceProvisioningState;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the use public load balancer. If not specified and the node type doesn't have its own frontend configuration, it will be attached to the default load balancer. If the node type uses its own Load balancer and useDefaultPublicLoadBalancer is true, then the frontend has to be an Internal Load Balancer. If the node type uses its own Load balancer and useDefaultPublicLoadBalancer is false or not set, then the custom load balancer must include a public load balancer to provide outbound connectivity. */
  useDefaultPublicLoadBalancer?: boolean;
  /** Specifies whether to use the temporary disk for the service fabric data root, in which case no managed data disk will be attached and the temporary disk will be used. It is only allowed for stateless node types. */
  useTempDataDisk?: boolean;
  /** Specifies whether the node type should be overprovisioned. It is only allowed for stateless node types. */
  enableOverProvisioning?: boolean;
  /** Specifies the availability zones where the node type would span across. If the cluster is not spanning across availability zones, initiates az migration for the cluster. */
  zones?: string[];
  /** Indicates whether the node type will be Spot Virtual Machines. Azure will allocate the VMs if there is capacity available and the VMs can be evicted at any time. */
  isSpotVM?: boolean;
  /** Specifies the full host group resource Id. This property is used for deploying on azure dedicated hosts. */
  hostGroupId?: string;
  /** Indicates whether to use ephemeral os disk. The sku selected on the vmSize property needs to support this feature. */
  useEphemeralOSDisk?: boolean;
  /** Indicates the time duration after which the platform will not try to restore the VMSS SPOT instances specified as ISO 8601. */
  spotRestoreTimeout?: string;
  /** Specifies the eviction policy for virtual machines in a SPOT node type. Default is Delete. */
  evictionPolicy?: EvictionPolicyType;
  /** Indicates the resource id of the vm image. This parameter is used for custom vm image. */
  vmImageResourceId?: string;
  /** Indicates the resource id of the subnet for the node type. */
  subnetId?: string;
  /** Specifies the actions to be performed on the vms before bootstrapping the service fabric runtime. */
  vmSetupActions?: VmSetupAction[];
  /** Specifies the security type of the nodeType. Supported values include Standard, TrustedLaunch and ConfidentialVM. */
  securityType?: SecurityType;
  /** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob and VMGuestStateOnly for encryption of just the VMGuestState blob. Note: It can be set for only Confidential VMs. */
  securityEncryptionType?: SecurityEncryptionType;
  /** Specifies whether secure boot should be enabled on the nodeType. Can only be used with TrustedLaunch and ConfidentialVM SecurityType. */
  secureBootEnabled?: boolean;
  /** Specifies whether each node is allocated its own public IPv4 address. This is only supported on secondary node types with custom Load Balancers. */
  enableNodePublicIP?: boolean;
  /** Specifies whether each node is allocated its own public IPv6 address. This is only supported on secondary node types with custom Load Balancers. */
  enableNodePublicIPv6?: boolean;
  /** Indicates the resource id of the vm shared galleries image. This parameter is used for custom vm image. */
  vmSharedGalleryImageId?: string;
  /** Specifies the resource id of a NAT Gateway to attach to the subnet of this node type. Node type must use custom load balancer. */
  natGatewayId?: string;
  /** Specifies the NAT configuration on default public Load Balancer for the node type. This is only supported for node types use the default public Load Balancer. */
  natConfigurations?: NodeTypeNatConfig[];
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use. In the Azure portal, find the marketplace image that you want to use and then click Want to deploy programmatically, Get Started ->. Enter any required information and then click Save. */
  vmImagePlan?: VmImagePlan;
  /** Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. */
  serviceArtifactReferenceId?: string;
  /** Specifies the resource id of the DSCP configuration to apply to the node type network interface. */
  dscpConfigurationId?: string;
  /** Specifies the settings for any additional secondary network interfaces to attach to the node type. */
  additionalNetworkInterfaceConfigurations?: AdditionalNetworkInterfaceConfiguration[];
  /** Specifies the computer name prefix. Limited to 9 characters. If specified, allows for a longer name to be specified for the node type name. */
  computerNamePrefix?: string;
  /** Specifies the gallery applications that should be made available to the underlying VMSS. */
  vmApplications?: VmApplication[];
  /** Setting this to true allows stateless node types to scale out without equal distribution across zones. */
  zoneBalance?: boolean;
  /** Specifies the node type should be configured for only outbound traffic and not inbound traffic. */
  isOutboundOnly?: boolean;
}

export function nodeTypePropertiesSerializer(item: NodeTypeProperties): any {
  return {
    isPrimary: item["isPrimary"],
    vmInstanceCount: item["vmInstanceCount"],
    dataDiskSizeGB: item["dataDiskSizeGB"],
    dataDiskType: item["dataDiskType"],
    dataDiskLetter: item["dataDiskLetter"],
    placementProperties: item["placementProperties"],
    capacities: item["capacities"],
    applicationPorts: !item["applicationPorts"]
      ? item["applicationPorts"]
      : endpointRangeDescriptionSerializer(item["applicationPorts"]),
    ephemeralPorts: !item["ephemeralPorts"]
      ? item["ephemeralPorts"]
      : endpointRangeDescriptionSerializer(item["ephemeralPorts"]),
    vmSize: item["vmSize"],
    vmImagePublisher: item["vmImagePublisher"],
    vmImageOffer: item["vmImageOffer"],
    vmImageSku: item["vmImageSku"],
    vmImageVersion: item["vmImageVersion"],
    vmSecrets: !item["vmSecrets"]
      ? item["vmSecrets"]
      : vaultSecretGroupArraySerializer(item["vmSecrets"]),
    vmExtensions: !item["vmExtensions"]
      ? item["vmExtensions"]
      : vmssExtensionArraySerializer(item["vmExtensions"]),
    vmManagedIdentity: !item["vmManagedIdentity"]
      ? item["vmManagedIdentity"]
      : vmManagedIdentitySerializer(item["vmManagedIdentity"]),
    isStateless: item["isStateless"],
    multiplePlacementGroups: item["multiplePlacementGroups"],
    frontendConfigurations: !item["frontendConfigurations"]
      ? item["frontendConfigurations"]
      : frontendConfigurationArraySerializer(item["frontendConfigurations"]),
    networkSecurityRules: !item["networkSecurityRules"]
      ? item["networkSecurityRules"]
      : networkSecurityRuleArraySerializer(item["networkSecurityRules"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : vmssDataDiskArraySerializer(item["additionalDataDisks"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    useDefaultPublicLoadBalancer: item["useDefaultPublicLoadBalancer"],
    useTempDataDisk: item["useTempDataDisk"],
    enableOverProvisioning: item["enableOverProvisioning"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    isSpotVM: item["isSpotVM"],
    hostGroupId: item["hostGroupId"],
    useEphemeralOSDisk: item["useEphemeralOSDisk"],
    spotRestoreTimeout: item["spotRestoreTimeout"],
    evictionPolicy: item["evictionPolicy"],
    vmImageResourceId: item["vmImageResourceId"],
    subnetId: item["subnetId"],
    vmSetupActions: !item["vmSetupActions"]
      ? item["vmSetupActions"]
      : item["vmSetupActions"].map((p: any) => {
          return p;
        }),
    securityType: item["securityType"],
    securityEncryptionType: item["securityEncryptionType"],
    secureBootEnabled: item["secureBootEnabled"],
    enableNodePublicIP: item["enableNodePublicIP"],
    enableNodePublicIPv6: item["enableNodePublicIPv6"],
    vmSharedGalleryImageId: item["vmSharedGalleryImageId"],
    natGatewayId: item["natGatewayId"],
    natConfigurations: !item["natConfigurations"]
      ? item["natConfigurations"]
      : nodeTypeNatConfigArraySerializer(item["natConfigurations"]),
    vmImagePlan: !item["vmImagePlan"]
      ? item["vmImagePlan"]
      : vmImagePlanSerializer(item["vmImagePlan"]),
    serviceArtifactReferenceId: item["serviceArtifactReferenceId"],
    dscpConfigurationId: item["dscpConfigurationId"],
    additionalNetworkInterfaceConfigurations: !item["additionalNetworkInterfaceConfigurations"]
      ? item["additionalNetworkInterfaceConfigurations"]
      : additionalNetworkInterfaceConfigurationArraySerializer(
          item["additionalNetworkInterfaceConfigurations"],
        ),
    computerNamePrefix: item["computerNamePrefix"],
    vmApplications: !item["vmApplications"]
      ? item["vmApplications"]
      : vmApplicationArraySerializer(item["vmApplications"]),
    zoneBalance: item["zoneBalance"],
    isOutboundOnly: item["isOutboundOnly"],
  };
}

export function nodeTypePropertiesDeserializer(item: any): NodeTypeProperties {
  return {
    isPrimary: item["isPrimary"],
    vmInstanceCount: item["vmInstanceCount"],
    dataDiskSizeGB: item["dataDiskSizeGB"],
    dataDiskType: item["dataDiskType"],
    dataDiskLetter: item["dataDiskLetter"],
    placementProperties: item["placementProperties"],
    capacities: item["capacities"],
    applicationPorts: !item["applicationPorts"]
      ? item["applicationPorts"]
      : endpointRangeDescriptionDeserializer(item["applicationPorts"]),
    ephemeralPorts: !item["ephemeralPorts"]
      ? item["ephemeralPorts"]
      : endpointRangeDescriptionDeserializer(item["ephemeralPorts"]),
    vmSize: item["vmSize"],
    vmImagePublisher: item["vmImagePublisher"],
    vmImageOffer: item["vmImageOffer"],
    vmImageSku: item["vmImageSku"],
    vmImageVersion: item["vmImageVersion"],
    vmSecrets: !item["vmSecrets"]
      ? item["vmSecrets"]
      : vaultSecretGroupArrayDeserializer(item["vmSecrets"]),
    vmExtensions: !item["vmExtensions"]
      ? item["vmExtensions"]
      : vmssExtensionArrayDeserializer(item["vmExtensions"]),
    vmManagedIdentity: !item["vmManagedIdentity"]
      ? item["vmManagedIdentity"]
      : vmManagedIdentityDeserializer(item["vmManagedIdentity"]),
    isStateless: item["isStateless"],
    multiplePlacementGroups: item["multiplePlacementGroups"],
    frontendConfigurations: !item["frontendConfigurations"]
      ? item["frontendConfigurations"]
      : frontendConfigurationArrayDeserializer(item["frontendConfigurations"]),
    networkSecurityRules: !item["networkSecurityRules"]
      ? item["networkSecurityRules"]
      : networkSecurityRuleArrayDeserializer(item["networkSecurityRules"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : vmssDataDiskArrayDeserializer(item["additionalDataDisks"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    provisioningState: item["provisioningState"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    useDefaultPublicLoadBalancer: item["useDefaultPublicLoadBalancer"],
    useTempDataDisk: item["useTempDataDisk"],
    enableOverProvisioning: item["enableOverProvisioning"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    isSpotVM: item["isSpotVM"],
    hostGroupId: item["hostGroupId"],
    useEphemeralOSDisk: item["useEphemeralOSDisk"],
    spotRestoreTimeout: item["spotRestoreTimeout"],
    evictionPolicy: item["evictionPolicy"],
    vmImageResourceId: item["vmImageResourceId"],
    subnetId: item["subnetId"],
    vmSetupActions: !item["vmSetupActions"]
      ? item["vmSetupActions"]
      : item["vmSetupActions"].map((p: any) => {
          return p;
        }),
    securityType: item["securityType"],
    securityEncryptionType: item["securityEncryptionType"],
    secureBootEnabled: item["secureBootEnabled"],
    enableNodePublicIP: item["enableNodePublicIP"],
    enableNodePublicIPv6: item["enableNodePublicIPv6"],
    vmSharedGalleryImageId: item["vmSharedGalleryImageId"],
    natGatewayId: item["natGatewayId"],
    natConfigurations: !item["natConfigurations"]
      ? item["natConfigurations"]
      : nodeTypeNatConfigArrayDeserializer(item["natConfigurations"]),
    vmImagePlan: !item["vmImagePlan"]
      ? item["vmImagePlan"]
      : vmImagePlanDeserializer(item["vmImagePlan"]),
    serviceArtifactReferenceId: item["serviceArtifactReferenceId"],
    dscpConfigurationId: item["dscpConfigurationId"],
    additionalNetworkInterfaceConfigurations: !item["additionalNetworkInterfaceConfigurations"]
      ? item["additionalNetworkInterfaceConfigurations"]
      : additionalNetworkInterfaceConfigurationArrayDeserializer(
          item["additionalNetworkInterfaceConfigurations"],
        ),
    computerNamePrefix: item["computerNamePrefix"],
    vmApplications: !item["vmApplications"]
      ? item["vmApplications"]
      : vmApplicationArrayDeserializer(item["vmApplications"]),
    zoneBalance: item["zoneBalance"],
    isOutboundOnly: item["isOutboundOnly"],
  };
}

/** Managed data disk type. IOPS and throughput are given by the disk size, to see more information go to https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types. */
export enum KnownDiskType {
  /** Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. */
  StandardLRS = "Standard_LRS",
  /** Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev/test. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** Premium SSD locally redundant storage. Best for production and performance sensitive workloads. */
  PremiumLRS = "Premium_LRS",
  /** Premium SSD V2 locally redundant storage. Best for production and performance sensitive workloads that consistently require low latency and high IOPS and throughput. */
  PremiumV2LRS = "PremiumV2_LRS",
  /** Standard SSD zone redundant storage. Best for web servers, lightly used enterprise applications and dev/test that need storage resiliency against zone failures. */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** Premium SSD zone redundant storage. Best for production workloads that need storage resiliency against zone failures. */
  PremiumZRS = "Premium_ZRS",
}

/**
 * Managed data disk type. IOPS and throughput are given by the disk size, to see more information go to https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types. \
 * {@link KnownDiskType} can be used interchangeably with DiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. \
 * **StandardSSD_LRS**: Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev\/test. \
 * **Premium_LRS**: Premium SSD locally redundant storage. Best for production and performance sensitive workloads. \
 * **PremiumV2_LRS**: Premium SSD V2 locally redundant storage. Best for production and performance sensitive workloads that consistently require low latency and high IOPS and throughput. \
 * **StandardSSD_ZRS**: Standard SSD zone redundant storage. Best for web servers, lightly used enterprise applications and dev\/test that need storage resiliency against zone failures. \
 * **Premium_ZRS**: Premium SSD zone redundant storage. Best for production workloads that need storage resiliency against zone failures.
 */
export type DiskType = string;

/** Port range details */
export interface EndpointRangeDescription {
  /** Starting port of a range of ports */
  startPort: number;
  /** End port of a range of ports */
  endPort: number;
}

export function endpointRangeDescriptionSerializer(item: EndpointRangeDescription): any {
  return { startPort: item["startPort"], endPort: item["endPort"] };
}

export function endpointRangeDescriptionDeserializer(item: any): EndpointRangeDescription {
  return {
    startPort: item["startPort"],
    endPort: item["endPort"],
  };
}

export function vaultSecretGroupArraySerializer(result: Array<VaultSecretGroup>): any[] {
  return result.map((item) => {
    return vaultSecretGroupSerializer(item);
  });
}

export function vaultSecretGroupArrayDeserializer(result: Array<VaultSecretGroup>): any[] {
  return result.map((item) => {
    return vaultSecretGroupDeserializer(item);
  });
}

/** Specifies set of certificates that should be installed onto the virtual machines. */
export interface VaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates: VaultCertificate[];
}

export function vaultSecretGroupSerializer(item: VaultSecretGroup): any {
  return {
    sourceVault: subResourceSerializer(item["sourceVault"]),
    vaultCertificates: vaultCertificateArraySerializer(item["vaultCertificates"]),
  };
}

export function vaultSecretGroupDeserializer(item: any): VaultSecretGroup {
  return {
    sourceVault: subResourceDeserializer(item["sourceVault"]),
    vaultCertificates: vaultCertificateArrayDeserializer(item["vaultCertificates"]),
  };
}

/** Azure resource identifier. */
export interface SubResource {
  /** Azure resource identifier. */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

export function vaultCertificateArraySerializer(result: Array<VaultCertificate>): any[] {
  return result.map((item) => {
    return vaultCertificateSerializer(item);
  });
}

export function vaultCertificateArrayDeserializer(result: Array<VaultCertificate>): any[] {
  return result.map((item) => {
    return vaultCertificateDeserializer(item);
  });
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). */
  certificateUrl: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name {UppercaseThumbprint}.crt for the X509 certificate file and {UppercaseThumbprint}.prv for private key. Both of these files are .pem formatted. */
  certificateStore: string;
}

export function vaultCertificateSerializer(item: VaultCertificate): any {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
  };
}

export function vaultCertificateDeserializer(item: any): VaultCertificate {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
  };
}

export function vmssExtensionArraySerializer(result: Array<VmssExtension>): any[] {
  return result.map((item) => {
    return vmssExtensionSerializer(item);
  });
}

export function vmssExtensionArrayDeserializer(result: Array<VmssExtension>): any[] {
  return result.map((item) => {
    return vmssExtensionDeserializer(item);
  });
}

/** Specifies set of extensions that should be installed onto the virtual machines. */
export interface VmssExtension {
  /** The name of the extension. */
  name: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties: VmssExtensionProperties;
}

export function vmssExtensionSerializer(item: VmssExtension): any {
  return {
    name: item["name"],
    properties: vmssExtensionPropertiesSerializer(item["properties"]),
  };
}

export function vmssExtensionDeserializer(item: any): VmssExtension {
  return {
    name: item["name"],
    properties: vmssExtensionPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a Virtual Machine Scale Set Extension. */
export interface VmssExtensionProperties {
  /** The name of the extension handler publisher. */
  publisher: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /** If a value is provided and is different from the previous value, the extension handler will be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Indicates the setup order for the extension. */
  setupOrder?: VmssExtensionSetupOrder[];
}

export function vmssExtensionPropertiesSerializer(item: VmssExtensionProperties): any {
  return {
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    forceUpdateTag: item["forceUpdateTag"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    setupOrder: !item["setupOrder"]
      ? item["setupOrder"]
      : item["setupOrder"].map((p: any) => {
          return p;
        }),
  };
}

export function vmssExtensionPropertiesDeserializer(item: any): VmssExtensionProperties {
  return {
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    forceUpdateTag: item["forceUpdateTag"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    setupOrder: !item["setupOrder"]
      ? item["setupOrder"]
      : item["setupOrder"].map((p: any) => {
          return p;
        }),
  };
}

/** Vm extension setup order. */
export enum KnownVmssExtensionSetupOrder {
  /** Indicates that the vm extension should run before the service fabric runtime starts. */
  BeforeSFRuntime = "BeforeSFRuntime",
}

/**
 * Vm extension setup order. \
 * {@link KnownVmssExtensionSetupOrder} can be used interchangeably with VmssExtensionSetupOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BeforeSFRuntime**: Indicates that the vm extension should run before the service fabric runtime starts.
 */
export type VmssExtensionSetupOrder = string;

/** Identities for the virtual machine scale set under the node type. */
export interface VmManagedIdentity {
  /** The list of user identities associated with the virtual machine scale set under the node type. Each entry will be an ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: string[];
}

export function vmManagedIdentitySerializer(item: VmManagedIdentity): any {
  return {
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : item["userAssignedIdentities"].map((p: any) => {
          return p;
        }),
  };
}

export function vmManagedIdentityDeserializer(item: any): VmManagedIdentity {
  return {
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : item["userAssignedIdentities"].map((p: any) => {
          return p;
        }),
  };
}

export function frontendConfigurationArraySerializer(result: Array<FrontendConfiguration>): any[] {
  return result.map((item) => {
    return frontendConfigurationSerializer(item);
  });
}

export function frontendConfigurationArrayDeserializer(
  result: Array<FrontendConfiguration>,
): any[] {
  return result.map((item) => {
    return frontendConfigurationDeserializer(item);
  });
}

/** Describes the frontend configurations for the node type. */
export interface FrontendConfiguration {
  /** The IP address type of this frontend configuration. If omitted the default value is IPv4. */
  ipAddressType?: IPAddressType;
  /** The resource Id of the Load Balancer backend address pool that the VM instances of the node type are associated with. The format of the resource Id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}'. */
  loadBalancerBackendAddressPoolId?: string;
  /** The resource Id of the Load Balancer inbound NAT pool that the VM instances of the node type are associated with. The format of the resource Id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatPools/{inboundNatPoolName}'. */
  loadBalancerInboundNatPoolId?: string;
  /** The resource Id of application gateway backend address pool. The format of the resource Id is '/subscriptions/<subscriptionId>/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/backendAddressPools/{backendAddressPoolName}'. */
  applicationGatewayBackendAddressPoolId?: string;
}

export function frontendConfigurationSerializer(item: FrontendConfiguration): any {
  return {
    ipAddressType: item["ipAddressType"],
    loadBalancerBackendAddressPoolId: item["loadBalancerBackendAddressPoolId"],
    loadBalancerInboundNatPoolId: item["loadBalancerInboundNatPoolId"],
    applicationGatewayBackendAddressPoolId: item["applicationGatewayBackendAddressPoolId"],
  };
}

export function frontendConfigurationDeserializer(item: any): FrontendConfiguration {
  return {
    ipAddressType: item["ipAddressType"],
    loadBalancerBackendAddressPoolId: item["loadBalancerBackendAddressPoolId"],
    loadBalancerInboundNatPoolId: item["loadBalancerInboundNatPoolId"],
    applicationGatewayBackendAddressPoolId: item["applicationGatewayBackendAddressPoolId"],
  };
}

/** The IP address type. */
export enum KnownIPAddressType {
  /** IPv4 address type. */
  IPv4 = "IPv4",
  /** IPv6 address type. */
  IPv6 = "IPv6",
}

/**
 * The IP address type. \
 * {@link KnownIPAddressType} can be used interchangeably with IPAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 address type. \
 * **IPv6**: IPv6 address type.
 */
export type IPAddressType = string;

export function vmssDataDiskArraySerializer(result: Array<VmssDataDisk>): any[] {
  return result.map((item) => {
    return vmssDataDiskSerializer(item);
  });
}

export function vmssDataDiskArrayDeserializer(result: Array<VmssDataDisk>): any[] {
  return result.map((item) => {
    return vmssDataDiskDeserializer(item);
  });
}

/** Managed data disk description. */
export interface VmssDataDisk {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. Lun 0 is reserved for the service fabric data disk. */
  lun: number;
  /** Disk size for each vm in the node type in GBs. */
  diskSizeGB: number;
  /** Managed data disk type. Specifies the storage account type for the managed disk */
  diskType: DiskType;
  /** Managed data disk letter. It can not use the reserved letter C or D and it can not change after created. */
  diskLetter: string;
}

export function vmssDataDiskSerializer(item: VmssDataDisk): any {
  return {
    lun: item["lun"],
    diskSizeGB: item["diskSizeGB"],
    diskType: item["diskType"],
    diskLetter: item["diskLetter"],
  };
}

export function vmssDataDiskDeserializer(item: any): VmssDataDisk {
  return {
    lun: item["lun"],
    diskSizeGB: item["diskSizeGB"],
    diskType: item["diskType"],
    diskLetter: item["diskLetter"],
  };
}

/** Specifies the eviction policy for virtual machines in a SPOT node type. */
export enum KnownEvictionPolicyType {
  /** Eviction policy will be Delete for SPOT vms. */
  Delete = "Delete",
  /** Eviction policy will be Deallocate for SPOT vms. */
  Deallocate = "Deallocate",
}

/**
 * Specifies the eviction policy for virtual machines in a SPOT node type. \
 * {@link KnownEvictionPolicyType} can be used interchangeably with EvictionPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Eviction policy will be Delete for SPOT vms. \
 * **Deallocate**: Eviction policy will be Deallocate for SPOT vms.
 */
export type EvictionPolicyType = string;

/** action to be performed on the vms before bootstrapping the service fabric runtime. */
export enum KnownVmSetupAction {
  /** Enable windows containers feature. */
  EnableContainers = "EnableContainers",
  /** Enables windows HyperV feature. */
  EnableHyperV = "EnableHyperV",
}

/**
 * action to be performed on the vms before bootstrapping the service fabric runtime. \
 * {@link KnownVmSetupAction} can be used interchangeably with VmSetupAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnableContainers**: Enable windows containers feature. \
 * **EnableHyperV**: Enables windows HyperV feature.
 */
export type VmSetupAction = string;

/** Specifies the security type of the nodeType. Only Standard and TrustedLaunch are currently supported */
export enum KnownSecurityType {
  /** Trusted Launch is a security type that secures generation 2 virtual machines. */
  TrustedLaunch = "TrustedLaunch",
  /** Standard is the default security type for all machines. */
  Standard = "Standard",
  /** ConfidentialVM provides hardware-based encryption, trusted execution environment (TEE) and isolation of the VM memory & CPU from host. */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the security type of the nodeType. Only Standard and TrustedLaunch are currently supported \
 * {@link KnownSecurityType} can be used interchangeably with SecurityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: Trusted Launch is a security type that secures generation 2 virtual machines. \
 * **Standard**: Standard is the default security type for all machines. \
 * **ConfidentialVM**: ConfidentialVM provides hardware-based encryption, trusted execution environment (TEE) and isolation of the VM memory & CPU from host.
 */
export type SecurityType = string;

/** Specifies the securityEncryptionType type of the nodeType. Only DiskWithVMGuestState and VMGuestStateOnly are currently supported */
export enum KnownSecurityEncryptionType {
  /** For encryption of the managed disk along with VMGuestState blob. */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /** For encryption of just the VMGuestState blob. */
  VMGuestStateOnly = "VMGuestStateOnly",
}

/**
 * Specifies the securityEncryptionType type of the nodeType. Only DiskWithVMGuestState and VMGuestStateOnly are currently supported \
 * {@link KnownSecurityEncryptionType} can be used interchangeably with SecurityEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DiskWithVMGuestState**: For encryption of the managed disk along with VMGuestState blob. \
 * **VMGuestStateOnly**: For encryption of just the VMGuestState blob.
 */
export type SecurityEncryptionType = string;

export function nodeTypeNatConfigArraySerializer(result: Array<NodeTypeNatConfig>): any[] {
  return result.map((item) => {
    return nodeTypeNatConfigSerializer(item);
  });
}

export function nodeTypeNatConfigArrayDeserializer(result: Array<NodeTypeNatConfig>): any[] {
  return result.map((item) => {
    return nodeTypeNatConfigDeserializer(item);
  });
}

/** Provides information about NAT configuration on the default public Load Balancer for the node type. */
export interface NodeTypeNatConfig {
  /** The internal port for the NAT configuration. */
  backendPort?: number;
  /** The port range start for the external endpoint. */
  frontendPortRangeStart?: number;
  /** The port range end for the external endpoint. */
  frontendPortRangeEnd?: number;
}

export function nodeTypeNatConfigSerializer(item: NodeTypeNatConfig): any {
  return {
    backendPort: item["backendPort"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
  };
}

export function nodeTypeNatConfigDeserializer(item: any): NodeTypeNatConfig {
  return {
    backendPort: item["backendPort"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
  };
}

/** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use. In the Azure portal, find the marketplace image that you want to use and then click Want to deploy programmatically, Get Started. Enter any required information and then click Save. */
export interface VmImagePlan {
  /** The plan ID. */
  name?: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product?: string;
  /** The promotion code. */
  promotionCode?: string;
  /** The publisher ID. */
  publisher?: string;
}

export function vmImagePlanSerializer(item: VmImagePlan): any {
  return {
    name: item["name"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    publisher: item["publisher"],
  };
}

export function vmImagePlanDeserializer(item: any): VmImagePlan {
  return {
    name: item["name"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    publisher: item["publisher"],
  };
}

export function additionalNetworkInterfaceConfigurationArraySerializer(
  result: Array<AdditionalNetworkInterfaceConfiguration>,
): any[] {
  return result.map((item) => {
    return additionalNetworkInterfaceConfigurationSerializer(item);
  });
}

export function additionalNetworkInterfaceConfigurationArrayDeserializer(
  result: Array<AdditionalNetworkInterfaceConfiguration>,
): any[] {
  return result.map((item) => {
    return additionalNetworkInterfaceConfigurationDeserializer(item);
  });
}

/** Specifies the settings for a network interface to attach to the node type. */
export interface AdditionalNetworkInterfaceConfiguration {
  /** Name of the network interface. */
  name: string;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies the DSCP configuration to apply to the network interface. */
  dscpConfiguration?: SubResource;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: IpConfiguration[];
}

export function additionalNetworkInterfaceConfigurationSerializer(
  item: AdditionalNetworkInterfaceConfiguration,
): any {
  return {
    name: item["name"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceSerializer(item["dscpConfiguration"]),
    ipConfigurations: ipConfigurationArraySerializer(item["ipConfigurations"]),
  };
}

export function additionalNetworkInterfaceConfigurationDeserializer(
  item: any,
): AdditionalNetworkInterfaceConfiguration {
  return {
    name: item["name"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceDeserializer(item["dscpConfiguration"]),
    ipConfigurations: ipConfigurationArrayDeserializer(item["ipConfigurations"]),
  };
}

export function ipConfigurationArraySerializer(result: Array<IpConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationSerializer(item);
  });
}

export function ipConfigurationArrayDeserializer(result: Array<IpConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationDeserializer(item);
  });
}

/** Specifies an IP configuration of the network interface. */
export interface IpConfiguration {
  /** Name of the network interface. */
  name: string;
  /** Specifies an array of references to backend address pools of application gateways. A node type can reference backend address pools of multiple application gateways. Multiple node types cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to backend address pools of load balancers. A node type can reference backend address pools of one public and one internal load balancer. Multiple node types cannot use the same basic sku load balancer. */
  loadBalancerBackendAddressPools?: SubResource[];
  /** Specifies an array of references to inbound Nat pools of the load balancers. A node type can reference inbound nat pools of one public and one internal load balancer. Multiple node types cannot use the same basic sku load balancer. */
  loadBalancerInboundNatPools?: SubResource[];
  /** Specifies the subnet of the network interface. */
  subnet?: SubResource;
  /** Specifies whether the IP configuration's private IP is IPv4 or IPv6. Default is IPv4. */
  privateIPAddressVersion?: PrivateIPAddressVersion;
  /** The public IP address configuration of the network interface. */
  publicIPAddressConfiguration?: IPConfigurationPublicIPAddressConfiguration;
}

export function ipConfigurationSerializer(item: IpConfiguration): any {
  return {
    name: item["name"],
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArraySerializer(item["applicationGatewayBackendAddressPools"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArraySerializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatPools: !item["loadBalancerInboundNatPools"]
      ? item["loadBalancerInboundNatPools"]
      : subResourceArraySerializer(item["loadBalancerInboundNatPools"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : ipConfigurationPublicIPAddressConfigurationSerializer(item["publicIPAddressConfiguration"]),
  };
}

export function ipConfigurationDeserializer(item: any): IpConfiguration {
  return {
    name: item["name"],
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArrayDeserializer(item["applicationGatewayBackendAddressPools"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArrayDeserializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatPools: !item["loadBalancerInboundNatPools"]
      ? item["loadBalancerInboundNatPools"]
      : subResourceArrayDeserializer(item["loadBalancerInboundNatPools"]),
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : ipConfigurationPublicIPAddressConfigurationDeserializer(
          item["publicIPAddressConfiguration"],
        ),
  };
}

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

export function subResourceArrayDeserializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceDeserializer(item);
  });
}

/** Specifies whether the IP configuration's private IP is IPv4 or IPv6. Default is IPv4. */
export enum KnownPrivateIPAddressVersion {
  /** The IP configuration's private IP is IPv4. */
  IPv4 = "IPv4",
  /** The IP configuration's private IP is IPv6. */
  IPv6 = "IPv6",
}

/**
 * Specifies whether the IP configuration's private IP is IPv4 or IPv6. Default is IPv4. \
 * {@link KnownPrivateIPAddressVersion} can be used interchangeably with PrivateIPAddressVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: The IP configuration's private IP is IPv4. \
 * **IPv6**: The IP configuration's private IP is IPv6.
 */
export type PrivateIPAddressVersion = string;

/** The public IP address configuration of the network interface. */
export interface IPConfigurationPublicIPAddressConfiguration {
  /** Name of the network interface. */
  name: string;
  /** Specifies the list of IP tags associated with the public IP address. */
  ipTags?: IpTag[];
  /** Specifies whether the IP configuration's public IP is IPv4 or IPv6. Default is IPv4. */
  publicIPAddressVersion?: PublicIPAddressVersion;
}

export function ipConfigurationPublicIPAddressConfigurationSerializer(
  item: IPConfigurationPublicIPAddressConfiguration,
): any {
  return {
    name: item["name"],
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArraySerializer(item["ipTags"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
  };
}

export function ipConfigurationPublicIPAddressConfigurationDeserializer(
  item: any,
): IPConfigurationPublicIPAddressConfiguration {
  return {
    name: item["name"],
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArrayDeserializer(item["ipTags"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
  };
}

/** Specifies whether the IP configuration's public IP is IPv4 or IPv6. Default is IPv4. */
export enum KnownPublicIPAddressVersion {
  /** The IP configuration's public IP is IPv4. */
  IPv4 = "IPv4",
  /** The IP configuration's public IP is IPv6. */
  IPv6 = "IPv6",
}

/**
 * Specifies whether the IP configuration's public IP is IPv4 or IPv6. Default is IPv4. \
 * {@link KnownPublicIPAddressVersion} can be used interchangeably with PublicIPAddressVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: The IP configuration's public IP is IPv4. \
 * **IPv6**: The IP configuration's public IP is IPv6.
 */
export type PublicIPAddressVersion = string;

export function vmApplicationArraySerializer(result: Array<VmApplication>): any[] {
  return result.map((item) => {
    return vmApplicationSerializer(item);
  });
}

export function vmApplicationArrayDeserializer(result: Array<VmApplication>): any[] {
  return result.map((item) => {
    return vmApplicationDeserializer(item);
  });
}

/** Specifies the gallery application that should be made available to the underlying VMSS. */
export interface VmApplication {
  /** Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided. */
  configurationReference?: string;
  /** If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the underlying VMSS. */
  enableAutomaticUpgrade?: boolean;
  /** Optional, Specifies the order in which the packages have to be installed. */
  order?: number;
  /** Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version}. */
  packageReferenceId: string;
  /** Optional, Specifies a passthrough value for more generic context. Accepts a JSON-formatted string e.g. '{"Tag1":"Value1","Tag2":"Value2"}'. */
  vmGalleryTags?: string;
  /** Optional, If true, any failure for any operation in the VmApplication will fail the deployment. */
  treatFailureAsDeploymentFailure?: boolean;
}

export function vmApplicationSerializer(item: VmApplication): any {
  return {
    configurationReference: item["configurationReference"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    order: item["order"],
    packageReferenceId: item["packageReferenceId"],
    vmGalleryTags: item["vmGalleryTags"],
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
  };
}

export function vmApplicationDeserializer(item: any): VmApplication {
  return {
    configurationReference: item["configurationReference"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    order: item["order"],
    packageReferenceId: item["packageReferenceId"],
    vmGalleryTags: item["vmGalleryTags"],
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
  };
}

/** Describes a node type sku. */
export interface NodeTypeSku {
  /** The sku name. Name is internally generated and is used in auto-scale scenarios. Property does not allow to be changed to other values than generated. To avoid deployment errors please omit the property. */
  name?: string;
  /** Specifies the tier of the node type. Possible Values: **Standard** */
  tier?: string;
  /** The number of nodes in the node type. If present in request it will override properties.vmInstanceCount. */
  capacity: number;
}

export function nodeTypeSkuSerializer(item: NodeTypeSku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function nodeTypeSkuDeserializer(item: any): NodeTypeSku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** Node type update request */
export interface NodeTypeUpdateParameters {
  /** Node type update parameters */
  tags?: Record<string, string>;
  /** The node type sku. */
  sku?: NodeTypeSku;
}

export function nodeTypeUpdateParametersSerializer(item: NodeTypeUpdateParameters): any {
  return {
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : nodeTypeSkuSerializer(item["sku"]),
  };
}

/** The response of a NodeType list operation. */
export interface _NodeTypeListResult {
  /** The NodeType items on this page */
  value: NodeType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodeTypeListResultDeserializer(item: any): _NodeTypeListResult {
  return {
    value: nodeTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodeTypeArraySerializer(result: Array<NodeType>): any[] {
  return result.map((item) => {
    return nodeTypeSerializer(item);
  });
}

export function nodeTypeArrayDeserializer(result: Array<NodeType>): any[] {
  return result.map((item) => {
    return nodeTypeDeserializer(item);
  });
}

/** Parameters for Node type action. If nodes are not specified on the parameters, the operation will be performed in all nodes of the node type one upgrade domain at a time. */
export interface NodeTypeActionParameters {
  /** List of node names from the node type. */
  nodes?: string[];
  /** Force the action to go through. */
  force?: boolean;
  /** Specifies the way the operation will be performed. */
  updateType?: UpdateType;
}

export function nodeTypeActionParametersSerializer(item: NodeTypeActionParameters): any {
  return {
    nodes: !item["nodes"]
      ? item["nodes"]
      : item["nodes"].map((p: any) => {
          return p;
        }),
    force: item["force"],
    updateType: item["updateType"],
  };
}

/** Specifies the way the operation will be performed. */
export enum KnownUpdateType {
  /** The operation will proceed in all specified nodes at the same time. */
  Default = "Default",
  /** The operation will proceed one upgrade domain at a time, checking the health in between each to continue. */
  ByUpgradeDomain = "ByUpgradeDomain",
}

/**
 * Specifies the way the operation will be performed. \
 * {@link KnownUpdateType} can be used interchangeably with UpdateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: The operation will proceed in all specified nodes at the same time. \
 * **ByUpgradeDomain**: The operation will proceed one upgrade domain at a time, checking the health in between each to continue.
 */
export type UpdateType = string;

/** Node type available sku list results */
export interface _NodeTypeListSkuResult {
  /** The NodeTypeAvailableSku items on this page */
  value: NodeTypeAvailableSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodeTypeListSkuResultDeserializer(item: any): _NodeTypeListSkuResult {
  return {
    value: nodeTypeAvailableSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodeTypeAvailableSkuArrayDeserializer(result: Array<NodeTypeAvailableSku>): any[] {
  return result.map((item) => {
    return nodeTypeAvailableSkuDeserializer(item);
  });
}

/** Defines the type of sku available for a node type */
export interface NodeTypeAvailableSku {
  /** The type of resource the sku applies to. Value: Microsoft.ServiceFabric/managedClusters/nodeTypes. */
  readonly resourceType?: string;
  /** The supported SKU for a for node type. */
  readonly sku?: NodeTypeSupportedSku;
  /** Provides information about how the node count can be scaled. */
  readonly capacity?: NodeTypeSkuCapacity;
}

export function nodeTypeAvailableSkuDeserializer(item: any): NodeTypeAvailableSku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : nodeTypeSupportedSkuDeserializer(item["sku"]),
    capacity: !item["capacity"]
      ? item["capacity"]
      : nodeTypeSkuCapacityDeserializer(item["capacity"]),
  };
}

/** Describes a node type supported sku. */
export interface NodeTypeSupportedSku {
  /** The sku name. */
  readonly name?: string;
  /** Specifies the tier of the node type. Possible Values: **Standard** */
  readonly tier?: string;
}

export function nodeTypeSupportedSkuDeserializer(item: any): NodeTypeSupportedSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Provides information about how node type can be scaled. */
export interface NodeTypeSkuCapacity {
  /** Lowest permitted node count in a node type. */
  readonly minimum?: number;
  /** Highest permitted node count in a node type. */
  readonly maximum?: number;
  /** Default node count in a node type. */
  readonly default?: number;
  /** Node type capacity scale type. */
  readonly scaleType?: NodeTypeSkuScaleType;
}

export function nodeTypeSkuCapacityDeserializer(item: any): NodeTypeSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** Node type capacity scale type. */
export enum KnownNodeTypeSkuScaleType {
  /** Node count is not adjustable in any way (e.g. it is fixed). */
  None = "None",
  /** The user must manually scale out/in. */
  Manual = "Manual",
  /** Automatic scale is allowed. */
  Automatic = "Automatic",
}

/**
 * Node type capacity scale type. \
 * {@link KnownNodeTypeSkuScaleType} can be used interchangeably with NodeTypeSkuScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Node count is not adjustable in any way (e.g. it is fixed). \
 * **Manual**: The user must manually scale out\/in. \
 * **Automatic**: Automatic scale is allowed.
 */
export type NodeTypeSkuScaleType = string;

/** Long running operation result. */
export interface LongRunningOperationResult {
  /** The name of the operation. */
  name?: string;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The completion percentage of the operation. */
  percentComplete?: number;
  /** The status of the operation. */
  status?: string;
  /** The operation error. */
  error?: ErrorModelError;
}

export function longRunningOperationResultDeserializer(item: any): LongRunningOperationResult {
  return {
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorModelErrorDeserializer(item["error"]),
  };
}

/** The error details. */
export interface ErrorModelError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function errorModelErrorDeserializer(item: any): ErrorModelError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The operating system of the cluster. The default means all. */
export enum KnownManagedClusterVersionEnvironment {
  /** Indicates os is Windows. */
  Windows = "Windows",
}

/**
 * The operating system of the cluster. The default means all. \
 * {@link KnownManagedClusterVersionEnvironment} can be used interchangeably with ManagedClusterVersionEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Indicates os is Windows.
 */
export type ManagedClusterVersionEnvironment = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01-preview API version. */
  V20241101Preview = "2024-11-01-preview",
  /** 2025-03-01-preview */
  V20250301Preview = "2025-03-01-preview",
  /** 2025-06-01-preview */
  V20250601Preview = "2025-06-01-preview",
}

export function managedClusterCodeVersionResultArrayDeserializer(
  result: Array<ManagedClusterCodeVersionResult>,
): any[] {
  return result.map((item) => {
    return managedClusterCodeVersionResultDeserializer(item);
  });
}
