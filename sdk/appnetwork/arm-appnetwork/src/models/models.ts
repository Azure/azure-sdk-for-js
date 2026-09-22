// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Localized display information for an operation. */
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

/** AppLink resource */
export interface AppLink extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AppLinkProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function appLinkSerializer(item: AppLink): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : appLinkPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function appLinkDeserializer(item: any): AppLink {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : appLinkPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** AppLink properties */
export interface AppLinkProperties {
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function appLinkPropertiesSerializer(item: AppLinkProperties): any {
  return item;
}

export function appLinkPropertiesDeserializer(item: any): AppLinkProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the resource */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is getting provisioned. */
  Provisioning = "Provisioning",
  /** Resource is Updating. */
  Updating = "Updating",
  /** Resource is Deleting. */
  Deleting = "Deleting",
  /** Resource has been Accepted. */
  Accepted = "Accepted",
}

/**
 * Provisioning state of the resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Resource is getting provisioned. \
 * **Updating**: Resource is Updating. \
 * **Deleting**: Resource is Deleting. \
 * **Accepted**: Resource has been Accepted.
 */
export type ProvisioningState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The type used for update operations of the AppLink. */
export interface AppLinkUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function appLinkUpdateSerializer(item: AppLinkUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a AppLink list operation. */
export interface _AppLinkListResult {
  /** The AppLink items on this page */
  value: AppLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appLinkListResultDeserializer(item: any): _AppLinkListResult {
  return {
    value: appLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appLinkArraySerializer(result: Array<AppLink>): any[] {
  return result.map((item) => {
    return appLinkSerializer(item);
  });
}

export function appLinkArrayDeserializer(result: Array<AppLink>): any[] {
  return result.map((item) => {
    return appLinkDeserializer(item);
  });
}

/** AppLink Member resource */
export interface AppLinkMember extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AppLinkMemberProperties;
}

export function appLinkMemberSerializer(item: AppLinkMember): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : appLinkMemberPropertiesSerializer(item["properties"]),
  };
}

export function appLinkMemberDeserializer(item: any): AppLinkMember {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : appLinkMemberPropertiesDeserializer(item["properties"]),
  };
}

/** AppLink Member properties */
export interface AppLinkMemberProperties {
  /** Cluster type */
  clusterType?: ClusterType;
  /** AppLink Member Metadata */
  metadata: Metadata;
  /** Upgrade profile. */
  upgradeProfile?: UpgradeProfile;
  /** Observability profile */
  observabilityProfile?: ObservabilityProfile;
  /** Connectivity profile. */
  connectivityProfile?: ConnectivityProfile;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function appLinkMemberPropertiesSerializer(item: AppLinkMemberProperties): any {
  return {
    clusterType: item["clusterType"],
    metadata: metadataSerializer(item["metadata"]),
    upgradeProfile: !item["upgradeProfile"]
      ? item["upgradeProfile"]
      : upgradeProfileSerializer(item["upgradeProfile"]),
    observabilityProfile: !item["observabilityProfile"]
      ? item["observabilityProfile"]
      : observabilityProfileSerializer(item["observabilityProfile"]),
    connectivityProfile: !item["connectivityProfile"]
      ? item["connectivityProfile"]
      : connectivityProfileSerializer(item["connectivityProfile"]),
  };
}

export function appLinkMemberPropertiesDeserializer(item: any): AppLinkMemberProperties {
  return {
    clusterType: item["clusterType"],
    metadata: metadataDeserializer(item["metadata"]),
    upgradeProfile: !item["upgradeProfile"]
      ? item["upgradeProfile"]
      : upgradeProfileDeserializer(item["upgradeProfile"]),
    observabilityProfile: !item["observabilityProfile"]
      ? item["observabilityProfile"]
      : observabilityProfileDeserializer(item["observabilityProfile"]),
    connectivityProfile: !item["connectivityProfile"]
      ? item["connectivityProfile"]
      : connectivityProfileDeserializer(item["connectivityProfile"]),
    provisioningState: item["provisioningState"],
  };
}

/** AppLinkMember cluster type */
export enum KnownClusterType {
  /** Azure Kubernetes Service */
  AKS = "AKS",
}

/**
 * AppLinkMember cluster type \
 * {@link KnownClusterType} can be used interchangeably with ClusterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKS**: Azure Kubernetes Service
 */
export type ClusterType = string;

/** AppLinkMember metadata */
export interface Metadata {
  /** Resource ID */
  resourceId: string;
}

export function metadataSerializer(item: Metadata): any {
  return { resourceId: item["resourceId"] };
}

export function metadataDeserializer(item: any): Metadata {
  return {
    resourceId: item["resourceId"],
  };
}

/** AppLinkMember upgrade profile. */
export interface UpgradeProfile {
  /** Upgrade mode. */
  mode: UpgradeMode;
  /** Fully managed upgrade profile. */
  fullyManagedUpgradeProfile?: FullyManagedUpgradeProfile;
  /** Self managed upgrade profile. */
  selfManagedUpgradeProfile?: SelfManagedUpgradeProfile;
}

export function upgradeProfileSerializer(item: UpgradeProfile): any {
  return {
    mode: item["mode"],
    fullyManagedUpgradeProfile: !item["fullyManagedUpgradeProfile"]
      ? item["fullyManagedUpgradeProfile"]
      : fullyManagedUpgradeProfileSerializer(item["fullyManagedUpgradeProfile"]),
    selfManagedUpgradeProfile: !item["selfManagedUpgradeProfile"]
      ? item["selfManagedUpgradeProfile"]
      : selfManagedUpgradeProfileSerializer(item["selfManagedUpgradeProfile"]),
  };
}

export function upgradeProfileDeserializer(item: any): UpgradeProfile {
  return {
    mode: item["mode"],
    fullyManagedUpgradeProfile: !item["fullyManagedUpgradeProfile"]
      ? item["fullyManagedUpgradeProfile"]
      : fullyManagedUpgradeProfileDeserializer(item["fullyManagedUpgradeProfile"]),
    selfManagedUpgradeProfile: !item["selfManagedUpgradeProfile"]
      ? item["selfManagedUpgradeProfile"]
      : selfManagedUpgradeProfileDeserializer(item["selfManagedUpgradeProfile"]),
  };
}

/** AppLinkMember upgrade mode */
export enum KnownUpgradeMode {
  /** Fully managed upgrade mode */
  FullyManaged = "FullyManaged",
  /** Self managed upgrade mode */
  SelfManaged = "SelfManaged",
}

/**
 * AppLinkMember upgrade mode \
 * {@link KnownUpgradeMode} can be used interchangeably with UpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FullyManaged**: Fully managed upgrade mode \
 * **SelfManaged**: Self managed upgrade mode
 */
export type UpgradeMode = string;

/** AppLinkMember fully managed upgrade profile */
export interface FullyManagedUpgradeProfile {
  /** Release channel */
  releaseChannel: UpgradeReleaseChannel;
}

export function fullyManagedUpgradeProfileSerializer(item: FullyManagedUpgradeProfile): any {
  return { releaseChannel: item["releaseChannel"] };
}

export function fullyManagedUpgradeProfileDeserializer(item: any): FullyManagedUpgradeProfile {
  return {
    releaseChannel: item["releaseChannel"],
  };
}

/** AppLinkMember upgrade release channel */
export enum KnownUpgradeReleaseChannel {
  /** Rapid release channel */
  Rapid = "Rapid",
  /** Stable release channel */
  Stable = "Stable",
}

/**
 * AppLinkMember upgrade release channel \
 * {@link KnownUpgradeReleaseChannel} can be used interchangeably with UpgradeReleaseChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rapid**: Rapid release channel \
 * **Stable**: Stable release channel
 */
export type UpgradeReleaseChannel = string;

/** AppLinkMember self managed upgrade profile */
export interface SelfManagedUpgradeProfile {
  /** Istio version */
  version: string;
}

export function selfManagedUpgradeProfileSerializer(item: SelfManagedUpgradeProfile): any {
  return { version: item["version"] };
}

export function selfManagedUpgradeProfileDeserializer(item: any): SelfManagedUpgradeProfile {
  return {
    version: item["version"],
  };
}

/** AppLinkMember observability profile */
export interface ObservabilityProfile {
  /** Metrics configuration */
  metrics?: MetricsProfile;
}

export function observabilityProfileSerializer(item: ObservabilityProfile): any {
  return {
    metrics: !item["metrics"] ? item["metrics"] : metricsProfileSerializer(item["metrics"]),
  };
}

export function observabilityProfileDeserializer(item: any): ObservabilityProfile {
  return {
    metrics: !item["metrics"] ? item["metrics"] : metricsProfileDeserializer(item["metrics"]),
  };
}

/** AppLinkMember metrics profile */
export interface MetricsProfile {
  /** Metrics endpoint URL */
  readonly metricsEndpoint?: string;
}

export function metricsProfileSerializer(item: MetricsProfile): any {
  return item;
}

export function metricsProfileDeserializer(item: any): MetricsProfile {
  return {
    metricsEndpoint: item["metricsEndpoint"],
  };
}

/** AppLinkMember connectivity profile. */
export interface ConnectivityProfile {
  /** East-West gateway profile. */
  eastWestGateway?: EastWestGatewayProfile;
  /** Private connect profile. */
  privateConnect?: PrivateConnectProfile;
}

export function connectivityProfileSerializer(item: ConnectivityProfile): any {
  return {
    eastWestGateway: !item["eastWestGateway"]
      ? item["eastWestGateway"]
      : eastWestGatewayProfileSerializer(item["eastWestGateway"]),
    privateConnect: !item["privateConnect"]
      ? item["privateConnect"]
      : privateConnectProfileSerializer(item["privateConnect"]),
  };
}

export function connectivityProfileDeserializer(item: any): ConnectivityProfile {
  return {
    eastWestGateway: !item["eastWestGateway"]
      ? item["eastWestGateway"]
      : eastWestGatewayProfileDeserializer(item["eastWestGateway"]),
    privateConnect: !item["privateConnect"]
      ? item["privateConnect"]
      : privateConnectProfileDeserializer(item["privateConnect"]),
  };
}

/** AppLinkMember east-west gateway profile. */
export interface EastWestGatewayProfile {
  /** East-West gateway visibility. */
  visibility: EastWestGatewayVisibility;
}

export function eastWestGatewayProfileSerializer(item: EastWestGatewayProfile): any {
  return { visibility: item["visibility"] };
}

export function eastWestGatewayProfileDeserializer(item: any): EastWestGatewayProfile {
  return {
    visibility: item["visibility"],
  };
}

/** East-West gateway visibility. */
export enum KnownEastWestGatewayVisibility {
  /** Use an internal load balancer for the east-west gateway. */
  Internal = "Internal",
  /** Use an external load balancer for the east-west gateway. */
  External = "External",
}

/**
 * East-West gateway visibility. \
 * {@link KnownEastWestGatewayVisibility} can be used interchangeably with EastWestGatewayVisibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Use an internal load balancer for the east-west gateway. \
 * **External**: Use an external load balancer for the east-west gateway.
 */
export type EastWestGatewayVisibility = string;

/** AppLinkMember private connect profile. */
export interface PrivateConnectProfile {
  /** Delegated Subnet to AppLink. */
  subnetResourceId: string;
}

export function privateConnectProfileSerializer(item: PrivateConnectProfile): any {
  return { subnetResourceId: item["subnetResourceId"] };
}

export function privateConnectProfileDeserializer(item: any): PrivateConnectProfile {
  return {
    subnetResourceId: item["subnetResourceId"],
  };
}

/** The type used for update operations of the AppLinkMember. */
export interface AppLinkMemberUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AppLinkMemberUpdateProperties;
}

export function appLinkMemberUpdateSerializer(item: AppLinkMemberUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : appLinkMemberUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AppLinkMember. */
export interface AppLinkMemberUpdateProperties {
  /** Upgrade profile. */
  upgradeProfile?: UpgradeProfile;
  /** Observability profile */
  observabilityProfile?: ObservabilityProfile;
  /** Connectivity profile. */
  connectivityProfile?: ConnectivityProfile;
}

export function appLinkMemberUpdatePropertiesSerializer(item: AppLinkMemberUpdateProperties): any {
  return {
    upgradeProfile: !item["upgradeProfile"]
      ? item["upgradeProfile"]
      : upgradeProfileSerializer(item["upgradeProfile"]),
    observabilityProfile: !item["observabilityProfile"]
      ? item["observabilityProfile"]
      : observabilityProfileSerializer(item["observabilityProfile"]),
    connectivityProfile: !item["connectivityProfile"]
      ? item["connectivityProfile"]
      : connectivityProfileSerializer(item["connectivityProfile"]),
  };
}

/** The response of a AppLinkMember list operation. */
export interface _AppLinkMemberListResult {
  /** The AppLinkMember items on this page */
  value: AppLinkMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appLinkMemberListResultDeserializer(item: any): _AppLinkMemberListResult {
  return {
    value: appLinkMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appLinkMemberArraySerializer(result: Array<AppLinkMember>): any[] {
  return result.map((item) => {
    return appLinkMemberSerializer(item);
  });
}

export function appLinkMemberArrayDeserializer(result: Array<AppLinkMember>): any[] {
  return result.map((item) => {
    return appLinkMemberDeserializer(item);
  });
}

/** The response of a UpgradeHistory list operation. */
export interface _UpgradeHistoryListResult {
  /** The UpgradeHistory items on this page */
  value: UpgradeHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _upgradeHistoryListResultDeserializer(item: any): _UpgradeHistoryListResult {
  return {
    value: upgradeHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function upgradeHistoryArrayDeserializer(result: Array<UpgradeHistory>): any[] {
  return result.map((item) => {
    return upgradeHistoryDeserializer(item);
  });
}

/** AppLinkMember upgrade history */
export interface UpgradeHistory extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UpgradeHistoryProperties;
}

export function upgradeHistoryDeserializer(item: any): UpgradeHistory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : upgradeHistoryPropertiesDeserializer(item["properties"]),
  };
}

/** AppLinkMember upgrade history properties */
export interface UpgradeHistoryProperties {
  /** Start timestamp */
  startTimestamp: Date;
  /** End timestamp */
  endTimestamp?: Date;
  /** Upgrade initiator */
  initiatedBy: string;
  /** Version upgraded from */
  fromVersion: string;
  /** Version upgraded to */
  toVersion: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function upgradeHistoryPropertiesDeserializer(item: any): UpgradeHistoryProperties {
  return {
    startTimestamp: new Date(item["startTimestamp"]),
    endTimestamp: !item["endTimestamp"] ? item["endTimestamp"] : new Date(item["endTimestamp"]),
    initiatedBy: item["initiatedBy"],
    fromVersion: item["fromVersion"],
    toVersion: item["toVersion"],
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

/** The response of a AvailableVersion list operation. */
export interface _AvailableVersionListResult {
  /** The AvailableVersion items on this page */
  value: AvailableVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _availableVersionListResultDeserializer(item: any): _AvailableVersionListResult {
  return {
    value: availableVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availableVersionArrayDeserializer(result: Array<AvailableVersion>): any[] {
  return result.map((item) => {
    return availableVersionDeserializer(item);
  });
}

/** AppLink available version resource */
export interface AvailableVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AvailableVersionProperties;
}

export function availableVersionDeserializer(item: any): AvailableVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : availableVersionPropertiesDeserializer(item["properties"]),
  };
}

/** AppLink available version properties */
export interface AvailableVersionProperties {
  /** Kubernetes version */
  kubernetesVersion: string;
  /** Fully managed versions */
  fullyManagedVersions: FullyManagedVersions;
  /** Self managed versions */
  selfManagedVersions: SelfManagedVersions;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function availableVersionPropertiesDeserializer(item: any): AvailableVersionProperties {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    fullyManagedVersions: fullyManagedVersionsDeserializer(item["fullyManagedVersions"]),
    selfManagedVersions: selfManagedVersionsDeserializer(item["selfManagedVersions"]),
    provisioningState: item["provisioningState"],
  };
}

/** Fully managed versions */
export interface FullyManagedVersions {
  /** Release channels */
  releaseChannels: ReleaseChannelInfo[];
}

export function fullyManagedVersionsDeserializer(item: any): FullyManagedVersions {
  return {
    releaseChannels: releaseChannelInfoArrayDeserializer(item["releaseChannels"]),
  };
}

export function releaseChannelInfoArrayDeserializer(result: Array<ReleaseChannelInfo>): any[] {
  return result.map((item) => {
    return releaseChannelInfoDeserializer(item);
  });
}

/** Release channel information */
export interface ReleaseChannelInfo {
  /** Release channel */
  releaseChannel: string;
  /** Istio version behind release channel */
  version: string;
}

export function releaseChannelInfoDeserializer(item: any): ReleaseChannelInfo {
  return {
    releaseChannel: item["releaseChannel"],
    version: item["version"],
  };
}

/** Self managed versions */
export interface SelfManagedVersions {
  /** Istio versions */
  versions: VersionInfo[];
}

export function selfManagedVersionsDeserializer(item: any): SelfManagedVersions {
  return {
    versions: versionInfoArrayDeserializer(item["versions"]),
  };
}

export function versionInfoArrayDeserializer(result: Array<VersionInfo>): any[] {
  return result.map((item) => {
    return versionInfoDeserializer(item);
  });
}

/** Version information */
export interface VersionInfo {
  /** Istio version */
  version: string;
  /** Available upgrades */
  upgrades: string[];
}

export function versionInfoDeserializer(item: any): VersionInfo {
  return {
    version: item["version"],
    upgrades: item["upgrades"].map((p: any) => {
      return p;
    }),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2025-08-01-preview version */
  V20250801Preview = "2025-08-01-preview",
}
