// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(
  item: any,
): _OperationListResult {
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
    display: !item["display"]
      ? item["display"]
      : operationDisplayDeserializer(item["display"]),
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
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
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
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(
  result: Array<ErrorAdditionalInfo>,
): any[] {
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

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(
  item: any,
): _ErrorAdditionalInfoInfo {
  return item;
}

/** The Fleet resource. */
export interface Fleet extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** Managed identity. */
  identity?: ManagedServiceIdentity;
}

export function fleetSerializer(item: Fleet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : fleetPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function fleetDeserializer(item: any): Fleet {
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
      : fleetPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Fleet properties. */
export interface FleetProperties {
  /** The status of the last operation. */
  readonly provisioningState?: FleetProvisioningState;
  /** The FleetHubProfile configures the Fleet's hub. */
  hubProfile?: FleetHubProfile;
  /** Status information for the fleet. */
  readonly status?: FleetStatus;
}

export function fleetPropertiesSerializer(item: FleetProperties): any {
  return {
    hubProfile: !item["hubProfile"]
      ? item["hubProfile"]
      : fleetHubProfileSerializer(item["hubProfile"]),
  };
}

export function fleetPropertiesDeserializer(item: any): FleetProperties {
  return {
    provisioningState: item["provisioningState"],
    hubProfile: !item["hubProfile"]
      ? item["hubProfile"]
      : fleetHubProfileDeserializer(item["hubProfile"]),
    status: !item["status"]
      ? item["status"]
      : fleetStatusDeserializer(item["status"]),
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownFleetProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a fleet being created. */
  Creating = "Creating",
  /** The provisioning state of a fleet being updated. */
  Updating = "Updating",
  /** The provisioning state of a fleet being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownFleetProvisioningState} can be used interchangeably with FleetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The provisioning state of a fleet being created. \
 * **Updating**: The provisioning state of a fleet being updated. \
 * **Deleting**: The provisioning state of a fleet being deleted.
 */
export type FleetProvisioningState = string;

/** The FleetHubProfile configures the fleet hub. */
export interface FleetHubProfile {
  /** DNS prefix used to create the FQDN for the Fleet hub. */
  dnsPrefix?: string;
  /** The access profile for the Fleet hub API server. */
  apiServerAccessProfile?: APIServerAccessProfile;
  /** The agent profile for the Fleet hub. */
  agentProfile?: AgentProfile;
  /** The FQDN of the Fleet hub. */
  readonly fqdn?: string;
  /** The Kubernetes version of the Fleet hub. */
  readonly kubernetesVersion?: string;
  /** The Azure Portal FQDN of the Fleet hub. */
  readonly portalFqdn?: string;
}

export function fleetHubProfileSerializer(item: FleetHubProfile): any {
  return {
    dnsPrefix: item["dnsPrefix"],
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : apiServerAccessProfileSerializer(item["apiServerAccessProfile"]),
    agentProfile: !item["agentProfile"]
      ? item["agentProfile"]
      : agentProfileSerializer(item["agentProfile"]),
  };
}

export function fleetHubProfileDeserializer(item: any): FleetHubProfile {
  return {
    dnsPrefix: item["dnsPrefix"],
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : apiServerAccessProfileDeserializer(item["apiServerAccessProfile"]),
    agentProfile: !item["agentProfile"]
      ? item["agentProfile"]
      : agentProfileDeserializer(item["agentProfile"]),
    fqdn: item["fqdn"],
    kubernetesVersion: item["kubernetesVersion"],
    portalFqdn: item["portalFqdn"],
  };
}

/** Access profile for the Fleet hub API server. */
export interface APIServerAccessProfile {
  /** Whether to create the Fleet hub as a private cluster or not. */
  enablePrivateCluster?: boolean;
  /** Whether to enable apiserver vnet integration for the Fleet hub or not. */
  enableVnetIntegration?: boolean;
  /** The subnet to be used when apiserver vnet integration is enabled. It is required when creating a new Fleet with BYO vnet. */
  subnetId?: string;
}

export function apiServerAccessProfileSerializer(
  item: APIServerAccessProfile,
): any {
  return {
    enablePrivateCluster: item["enablePrivateCluster"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

export function apiServerAccessProfileDeserializer(
  item: any,
): APIServerAccessProfile {
  return {
    enablePrivateCluster: item["enablePrivateCluster"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

/** Agent profile for the Fleet hub. */
export interface AgentProfile {
  /** The ID of the subnet which the Fleet hub node will join on startup. If this is not specified, a vnet and subnet will be generated and used. */
  subnetId?: string;
  /** The virtual machine size of the Fleet hub. */
  vmSize?: string;
}

export function agentProfileSerializer(item: AgentProfile): any {
  return { subnetId: item["subnetId"], vmSize: item["vmSize"] };
}

export function agentProfileDeserializer(item: any): AgentProfile {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
  };
}

/** Status information for the fleet. */
export interface FleetStatus {
  /** The last operation ID for the fleet. */
  readonly lastOperationId?: string;
  /** The last operation error for the fleet. */
  readonly lastOperationError?: ErrorDetail;
}

export function fleetStatusDeserializer(item: any): FleetStatus {
  return {
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
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
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(
  item: any,
): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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
  SystemAndUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned, UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(
  item: UserAssignedIdentity,
): any {
  return item;
}

export function userAssignedIdentityDeserializer(
  item: any,
): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
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
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
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

/** Properties of a Fleet that can be patched. */
export interface FleetPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed identity. */
  identity?: ManagedServiceIdentity;
}

export function fleetPatchSerializer(item: FleetPatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a Fleet list operation. */
export interface _FleetListResult {
  /** The Fleet items on this page */
  value: Fleet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetListResultDeserializer(item: any): _FleetListResult {
  return {
    value: fleetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetArraySerializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetSerializer(item);
  });
}

export function fleetArrayDeserializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetDeserializer(item);
  });
}

/** The Credential results response. */
export interface FleetCredentialResults {
  /** Array of base64-encoded Kubernetes configuration files. */
  readonly kubeconfigs?: FleetCredentialResult[];
}

export function fleetCredentialResultsDeserializer(
  item: any,
): FleetCredentialResults {
  return {
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : fleetCredentialResultArrayDeserializer(item["kubeconfigs"]),
  };
}

export function fleetCredentialResultArrayDeserializer(
  result: Array<FleetCredentialResult>,
): any[] {
  return result.map((item) => {
    return fleetCredentialResultDeserializer(item);
  });
}

/** One credential result item. */
export interface FleetCredentialResult {
  /** The name of the credential. */
  readonly name?: string;
  /** Base64-encoded Kubernetes configuration file. */
  readonly value?: Uint8Array;
}

export function fleetCredentialResultDeserializer(
  item: any,
): FleetCredentialResult {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** A member of the Fleet. It contains a reference to an existing Kubernetes cluster on Azure. */
export interface FleetMember extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetMemberProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function fleetMemberSerializer(item: FleetMember): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberPropertiesSerializer(item["properties"]),
  };
}

export function fleetMemberDeserializer(item: any): FleetMember {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** A member of the Fleet. It contains a reference to an existing Kubernetes cluster on Azure. */
export interface FleetMemberProperties {
  /** The ARM resource id of the cluster that joins the Fleet. Must be a valid Azure resource id. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{clusterName}'. */
  clusterResourceId: string;
  /** The group this member belongs to for multi-cluster update management. */
  group?: string;
  /** The status of the last operation. */
  readonly provisioningState?: FleetMemberProvisioningState;
  /** Status information of the last operation for fleet member. */
  readonly status?: FleetMemberStatus;
}

export function fleetMemberPropertiesSerializer(
  item: FleetMemberProperties,
): any {
  return { clusterResourceId: item["clusterResourceId"], group: item["group"] };
}

export function fleetMemberPropertiesDeserializer(
  item: any,
): FleetMemberProperties {
  return {
    clusterResourceId: item["clusterResourceId"],
    group: item["group"],
    provisioningState: item["provisioningState"],
    status: !item["status"]
      ? item["status"]
      : fleetMemberStatusDeserializer(item["status"]),
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownFleetMemberProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a member joining a fleet. */
  Joining = "Joining",
  /** The provisioning state of a member leaving a fleet. */
  Leaving = "Leaving",
  /** The provisioning state of a member being updated. */
  Updating = "Updating",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownFleetMemberProvisioningState} can be used interchangeably with FleetMemberProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Joining**: The provisioning state of a member joining a fleet. \
 * **Leaving**: The provisioning state of a member leaving a fleet. \
 * **Updating**: The provisioning state of a member being updated.
 */
export type FleetMemberProvisioningState = string;

/** Status information for the fleet member */
export interface FleetMemberStatus {
  /** The last operation ID for the fleet member */
  readonly lastOperationId?: string;
  /** The last operation error of the fleet member */
  readonly lastOperationError?: ErrorDetail;
}

export function fleetMemberStatusDeserializer(item: any): FleetMemberStatus {
  return {
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
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

/** The type used for update operations of the FleetMember. */
export interface FleetMemberUpdate {
  /** The resource-specific properties for this resource. */
  properties?: FleetMemberUpdateProperties;
}

export function fleetMemberUpdateSerializer(item: FleetMemberUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FleetMember. */
export interface FleetMemberUpdateProperties {
  /** The group this member belongs to for multi-cluster update management. */
  group?: string;
}

export function fleetMemberUpdatePropertiesSerializer(
  item: FleetMemberUpdateProperties,
): any {
  return { group: item["group"] };
}

/** The response of a FleetMember list operation. */
export interface _FleetMemberListResult {
  /** The FleetMember items on this page */
  value: FleetMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetMemberListResultDeserializer(
  item: any,
): _FleetMemberListResult {
  return {
    value: fleetMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetMemberArraySerializer(result: Array<FleetMember>): any[] {
  return result.map((item) => {
    return fleetMemberSerializer(item);
  });
}

export function fleetMemberArrayDeserializer(
  result: Array<FleetMember>,
): any[] {
  return result.map((item) => {
    return fleetMemberDeserializer(item);
  });
}

/** A multi-stage process to perform update operations across members of a Fleet. */
export interface UpdateRun extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UpdateRunProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function updateRunSerializer(item: UpdateRun): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateRunPropertiesSerializer(item["properties"]),
  };
}

export function updateRunDeserializer(item: any): UpdateRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : updateRunPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the UpdateRun. */
export interface UpdateRunProperties {
  /** The provisioning state of the UpdateRun resource. */
  readonly provisioningState?: UpdateRunProvisioningState;
  /**
   * The resource id of the FleetUpdateStrategy resource to reference.
   *
   * When creating a new run, there are three ways to define a strategy for the run:
   * 1. Define a new strategy in place: Set the "strategy" field.
   * 2. Use an existing strategy: Set the "updateStrategyId" field. (since 2023-08-15-preview)
   * 3. Use the default strategy to update all the members one by one: Leave both "updateStrategyId" and "strategy" unset. (since 2023-08-15-preview)
   *
   * Setting both "updateStrategyId" and "strategy" is invalid.
   *
   * UpdateRuns created by "updateStrategyId" snapshot the referenced UpdateStrategy at the time of creation and store it in the "strategy" field.
   * Subsequent changes to the referenced FleetUpdateStrategy resource do not propagate.
   * UpdateRunStrategy changes can be made directly on the "strategy" field before launching the UpdateRun.
   */
  updateStrategyId?: string;
  /**
   * The strategy defines the order in which the clusters will be updated.
   * If not set, all members will be updated sequentially. The UpdateRun status will show a single UpdateStage and a single UpdateGroup targeting all members.
   * The strategy of the UpdateRun can be modified until the run is started.
   */
  strategy?: UpdateRunStrategy;
  /** The update to be applied to all clusters in the UpdateRun. The managedClusterUpdate can be modified until the run is started. */
  managedClusterUpdate: ManagedClusterUpdate;
  /** The status of the UpdateRun. */
  readonly status?: UpdateRunStatus;
  /** AutoUpgradeProfileId is the id of an auto upgrade profile resource. */
  readonly autoUpgradeProfileId?: string;
}

export function updateRunPropertiesSerializer(item: UpdateRunProperties): any {
  return {
    updateStrategyId: item["updateStrategyId"],
    strategy: !item["strategy"]
      ? item["strategy"]
      : updateRunStrategySerializer(item["strategy"]),
    managedClusterUpdate: managedClusterUpdateSerializer(
      item["managedClusterUpdate"],
    ),
  };
}

export function updateRunPropertiesDeserializer(
  item: any,
): UpdateRunProperties {
  return {
    provisioningState: item["provisioningState"],
    updateStrategyId: item["updateStrategyId"],
    strategy: !item["strategy"]
      ? item["strategy"]
      : updateRunStrategyDeserializer(item["strategy"]),
    managedClusterUpdate: managedClusterUpdateDeserializer(
      item["managedClusterUpdate"],
    ),
    status: !item["status"]
      ? item["status"]
      : updateRunStatusDeserializer(item["status"]),
    autoUpgradeProfileId: item["autoUpgradeProfileId"],
  };
}

/** The provisioning state of the UpdateRun resource. */
export enum KnownUpdateRunProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the UpdateRun resource. \
 * {@link KnownUpdateRunProvisioningState} can be used interchangeably with UpdateRunProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type UpdateRunProvisioningState = string;

/**
 * Defines the update sequence of the clusters via stages and groups.
 *
 * Stages within a run are executed sequentially one after another.
 * Groups within a stage are executed in parallel.
 * Member clusters within a group are updated sequentially one after another.
 *
 * A valid strategy contains no duplicate groups within or across stages.
 */
export interface UpdateRunStrategy {
  /** The list of stages that compose this update run. Min size: 1. */
  stages: UpdateStage[];
}

export function updateRunStrategySerializer(item: UpdateRunStrategy): any {
  return { stages: updateStageArraySerializer(item["stages"]) };
}

export function updateRunStrategyDeserializer(item: any): UpdateRunStrategy {
  return {
    stages: updateStageArrayDeserializer(item["stages"]),
  };
}

export function updateStageArraySerializer(result: Array<UpdateStage>): any[] {
  return result.map((item) => {
    return updateStageSerializer(item);
  });
}

export function updateStageArrayDeserializer(
  result: Array<UpdateStage>,
): any[] {
  return result.map((item) => {
    return updateStageDeserializer(item);
  });
}

/** Defines a stage which contains the groups to update and the steps to take (e.g., wait for a time period) before starting the next stage. */
export interface UpdateStage {
  /** The name of the stage. Must be unique within the UpdateRun. */
  name: string;
  /** Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1. */
  groups?: UpdateGroup[];
  /** The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified. */
  afterStageWaitInSeconds?: number;
}

export function updateStageSerializer(item: UpdateStage): any {
  return {
    name: item["name"],
    groups: !item["groups"]
      ? item["groups"]
      : updateGroupArraySerializer(item["groups"]),
    afterStageWaitInSeconds: item["afterStageWaitInSeconds"],
  };
}

export function updateStageDeserializer(item: any): UpdateStage {
  return {
    name: item["name"],
    groups: !item["groups"]
      ? item["groups"]
      : updateGroupArrayDeserializer(item["groups"]),
    afterStageWaitInSeconds: item["afterStageWaitInSeconds"],
  };
}

export function updateGroupArraySerializer(result: Array<UpdateGroup>): any[] {
  return result.map((item) => {
    return updateGroupSerializer(item);
  });
}

export function updateGroupArrayDeserializer(
  result: Array<UpdateGroup>,
): any[] {
  return result.map((item) => {
    return updateGroupDeserializer(item);
  });
}

/** A group to be updated. */
export interface UpdateGroup {
  /**
   * Name of the group.
   * It must match a group name of an existing fleet member.
   */
  name: string;
}

export function updateGroupSerializer(item: UpdateGroup): any {
  return { name: item["name"] };
}

export function updateGroupDeserializer(item: any): UpdateGroup {
  return {
    name: item["name"],
  };
}

/** The update to be applied to the ManagedClusters. */
export interface ManagedClusterUpdate {
  /** The upgrade to apply to the ManagedClusters. */
  upgrade: ManagedClusterUpgradeSpec;
  /** The node image upgrade to be applied to the target nodes in update run. */
  nodeImageSelection?: NodeImageSelection;
}

export function managedClusterUpdateSerializer(
  item: ManagedClusterUpdate,
): any {
  return {
    upgrade: managedClusterUpgradeSpecSerializer(item["upgrade"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionSerializer(item["nodeImageSelection"]),
  };
}

export function managedClusterUpdateDeserializer(
  item: any,
): ManagedClusterUpdate {
  return {
    upgrade: managedClusterUpgradeSpecDeserializer(item["upgrade"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionDeserializer(item["nodeImageSelection"]),
  };
}

/** The upgrade to apply to a ManagedCluster. */
export interface ManagedClusterUpgradeSpec {
  /** ManagedClusterUpgradeType is the type of upgrade to be applied. */
  type: ManagedClusterUpgradeType;
  /** The Kubernetes version to upgrade the member clusters to. */
  kubernetesVersion?: string;
}

export function managedClusterUpgradeSpecSerializer(
  item: ManagedClusterUpgradeSpec,
): any {
  return { type: item["type"], kubernetesVersion: item["kubernetesVersion"] };
}

export function managedClusterUpgradeSpecDeserializer(
  item: any,
): ManagedClusterUpgradeSpec {
  return {
    type: item["type"],
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** The type of upgrade to perform when targeting ManagedClusters. */
export enum KnownManagedClusterUpgradeType {
  /** Full upgrades the control plane and all agent pools of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. */
  Full = "Full",
  /** NodeImageOnly upgrades only the node images of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to NOT be set. */
  NodeImageOnly = "NodeImageOnly",
  /** ControlPlaneOnly upgrades only targets the KubernetesVersion of the ManagedClusters and will not be applied to the AgentPool. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. */
  ControlPlaneOnly = "ControlPlaneOnly",
}

/**
 * The type of upgrade to perform when targeting ManagedClusters. \
 * {@link KnownManagedClusterUpgradeType} can be used interchangeably with ManagedClusterUpgradeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full**: Full upgrades the control plane and all agent pools of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. \
 * **NodeImageOnly**: NodeImageOnly upgrades only the node images of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to NOT be set. \
 * **ControlPlaneOnly**: ControlPlaneOnly upgrades only targets the KubernetesVersion of the ManagedClusters and will not be applied to the AgentPool. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set.
 */
export type ManagedClusterUpgradeType = string;

/** The node image upgrade to be applied to the target nodes in update run. */
export interface NodeImageSelection {
  /** The node image upgrade type. */
  type: NodeImageSelectionType;
  /** Custom node image versions to upgrade the nodes to. This field is required if node image selection type is Custom. Otherwise, it must be empty. For each node image family (e.g., 'AKSUbuntu-1804gen2containerd'), this field can contain at most one version (e.g., only one of 'AKSUbuntu-1804gen2containerd-2023.01.12' or 'AKSUbuntu-1804gen2containerd-2023.02.12', not both). If the nodes belong to a family without a matching image version in this field, they are not upgraded. */
  customNodeImageVersions?: NodeImageVersion[];
}

export function nodeImageSelectionSerializer(item: NodeImageSelection): any {
  return {
    type: item["type"],
    customNodeImageVersions: !item["customNodeImageVersions"]
      ? item["customNodeImageVersions"]
      : nodeImageVersionArraySerializer(item["customNodeImageVersions"]),
  };
}

export function nodeImageSelectionDeserializer(item: any): NodeImageSelection {
  return {
    type: item["type"],
    customNodeImageVersions: !item["customNodeImageVersions"]
      ? item["customNodeImageVersions"]
      : nodeImageVersionArrayDeserializer(item["customNodeImageVersions"]),
  };
}

/** The node image upgrade type. */
export enum KnownNodeImageSelectionType {
  /** Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. */
  Latest = "Latest",
  /** The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. */
  Consistent = "Consistent",
  /** Upgrade the nodes to the custom image versions. When set, update run will use node image versions provided in customNodeImageVersions to upgrade the nodes. If set, customNodeImageVersions must not be empty. */
  Custom = "Custom",
}

/**
 * The node image upgrade type. \
 * {@link KnownNodeImageSelectionType} can be used interchangeably with NodeImageSelectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. \
 * **Consistent**: The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. \
 * **Custom**: Upgrade the nodes to the custom image versions. When set, update run will use node image versions provided in customNodeImageVersions to upgrade the nodes. If set, customNodeImageVersions must not be empty.
 */
export type NodeImageSelectionType = string;

export function nodeImageVersionArraySerializer(
  result: Array<NodeImageVersion>,
): any[] {
  return result.map((item) => {
    return nodeImageVersionSerializer(item);
  });
}

export function nodeImageVersionArrayDeserializer(
  result: Array<NodeImageVersion>,
): any[] {
  return result.map((item) => {
    return nodeImageVersionDeserializer(item);
  });
}

/** The node upgrade image version. */
export interface NodeImageVersion {
  /** The image version to upgrade the nodes to (e.g., 'AKSUbuntu-1804gen2containerd-2022.12.13'). */
  readonly version?: string;
}

export function nodeImageVersionSerializer(item: NodeImageVersion): any {
  return item;
}

export function nodeImageVersionDeserializer(item: any): NodeImageVersion {
  return {
    version: item["version"],
  };
}

/** The status of a UpdateRun. */
export interface UpdateRunStatus {
  /** The status of the UpdateRun. */
  readonly status?: UpdateStatus;
  /** The stages composing an update run. Stages are run sequentially withing an UpdateRun. */
  readonly stages?: UpdateStageStatus[];
  /** The node image upgrade specs for the update run. It is only set in update run when `NodeImageSelection.type` is `Consistent`. */
  readonly nodeImageSelection?: NodeImageSelectionStatus;
}

export function updateRunStatusDeserializer(item: any): UpdateRunStatus {
  return {
    status: !item["status"]
      ? item["status"]
      : updateStatusDeserializer(item["status"]),
    stages: !item["stages"]
      ? item["stages"]
      : updateStageStatusArrayDeserializer(item["stages"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionStatusDeserializer(item["nodeImageSelection"]),
  };
}

/** The status for an operation or group of operations. */
export interface UpdateStatus {
  /** The time the operation or group was started. */
  readonly startTime?: Date;
  /** The time the operation or group was completed. */
  readonly completedTime?: Date;
  /** The State of the operation or group. */
  readonly state?: UpdateState;
  /** The error details when a failure is encountered. */
  readonly error?: ErrorDetail;
}

export function updateStatusDeserializer(item: any): UpdateStatus {
  return {
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
    completedTime: !item["completedTime"]
      ? item["completedTime"]
      : new Date(item["completedTime"]),
    state: item["state"],
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
  };
}

/** The state of the UpdateRun, UpdateStage, UpdateGroup, or MemberUpdate. */
export enum KnownUpdateState {
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has not been started. */
  NotStarted = "NotStarted",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that is running. */
  Running = "Running",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that is being stopped. */
  Stopping = "Stopping",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has stopped. */
  Stopped = "Stopped",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has been skipped. */
  Skipped = "Skipped",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has failed. */
  Failed = "Failed",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has completed. */
  Completed = "Completed",
}

/**
 * The state of the UpdateRun, UpdateStage, UpdateGroup, or MemberUpdate. \
 * {@link KnownUpdateState} can be used interchangeably with UpdateState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has not been started. \
 * **Running**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that is running. \
 * **Stopping**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that is being stopped. \
 * **Stopped**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has stopped. \
 * **Skipped**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has been skipped. \
 * **Failed**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has failed. \
 * **Completed**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has completed.
 */
export type UpdateState = string;

export function updateStageStatusArrayDeserializer(
  result: Array<UpdateStageStatus>,
): any[] {
  return result.map((item) => {
    return updateStageStatusDeserializer(item);
  });
}

/** The status of a UpdateStage. */
export interface UpdateStageStatus {
  /** The status of the UpdateStage. */
  readonly status?: UpdateStatus;
  /** The name of the UpdateStage. */
  readonly name?: string;
  /** The list of groups to be updated as part of this UpdateStage. */
  readonly groups?: UpdateGroupStatus[];
  /** The status of the wait period configured on the UpdateStage. */
  readonly afterStageWaitStatus?: WaitStatus;
}

export function updateStageStatusDeserializer(item: any): UpdateStageStatus {
  return {
    status: !item["status"]
      ? item["status"]
      : updateStatusDeserializer(item["status"]),
    name: item["name"],
    groups: !item["groups"]
      ? item["groups"]
      : updateGroupStatusArrayDeserializer(item["groups"]),
    afterStageWaitStatus: !item["afterStageWaitStatus"]
      ? item["afterStageWaitStatus"]
      : waitStatusDeserializer(item["afterStageWaitStatus"]),
  };
}

export function updateGroupStatusArrayDeserializer(
  result: Array<UpdateGroupStatus>,
): any[] {
  return result.map((item) => {
    return updateGroupStatusDeserializer(item);
  });
}

/** The status of a UpdateGroup. */
export interface UpdateGroupStatus {
  /** The status of the UpdateGroup. */
  readonly status?: UpdateStatus;
  /** The name of the UpdateGroup. */
  readonly name?: string;
  /** The list of member this UpdateGroup updates. */
  readonly members?: MemberUpdateStatus[];
}

export function updateGroupStatusDeserializer(item: any): UpdateGroupStatus {
  return {
    status: !item["status"]
      ? item["status"]
      : updateStatusDeserializer(item["status"]),
    name: item["name"],
    members: !item["members"]
      ? item["members"]
      : memberUpdateStatusArrayDeserializer(item["members"]),
  };
}

export function memberUpdateStatusArrayDeserializer(
  result: Array<MemberUpdateStatus>,
): any[] {
  return result.map((item) => {
    return memberUpdateStatusDeserializer(item);
  });
}

/** The status of a member update operation. */
export interface MemberUpdateStatus {
  /** The status of the MemberUpdate operation. */
  readonly status?: UpdateStatus;
  /** The name of the FleetMember. */
  readonly name?: string;
  /** The Azure resource id of the target Kubernetes cluster. */
  readonly clusterResourceId?: string;
  /** The operation resource id of the latest attempt to perform the operation. */
  readonly operationId?: string;
  /** The status message after processing the member update operation. */
  readonly message?: string;
}

export function memberUpdateStatusDeserializer(item: any): MemberUpdateStatus {
  return {
    status: !item["status"]
      ? item["status"]
      : updateStatusDeserializer(item["status"]),
    name: item["name"],
    clusterResourceId: item["clusterResourceId"],
    operationId: item["operationId"],
    message: item["message"],
  };
}

/** The status of the wait duration. */
export interface WaitStatus {
  /** The status of the wait duration. */
  readonly status?: UpdateStatus;
  /** The wait duration configured in seconds. */
  readonly waitDurationInSeconds?: number;
}

export function waitStatusDeserializer(item: any): WaitStatus {
  return {
    status: !item["status"]
      ? item["status"]
      : updateStatusDeserializer(item["status"]),
    waitDurationInSeconds: item["waitDurationInSeconds"],
  };
}

/** The node image upgrade specs for the update run. */
export interface NodeImageSelectionStatus {
  /** The image versions to upgrade the nodes to. */
  readonly selectedNodeImageVersions?: NodeImageVersion[];
}

export function nodeImageSelectionStatusDeserializer(
  item: any,
): NodeImageSelectionStatus {
  return {
    selectedNodeImageVersions: !item["selectedNodeImageVersions"]
      ? item["selectedNodeImageVersions"]
      : nodeImageVersionArrayDeserializer(item["selectedNodeImageVersions"]),
  };
}

/** The response of a UpdateRun list operation. */
export interface _UpdateRunListResult {
  /** The UpdateRun items on this page */
  value: UpdateRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateRunListResultDeserializer(
  item: any,
): _UpdateRunListResult {
  return {
    value: updateRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateRunArraySerializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunSerializer(item);
  });
}

export function updateRunArrayDeserializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunDeserializer(item);
  });
}

/** The properties of a skip operation containing multiple skip requests. */
export interface SkipProperties {
  /** The targets to skip. */
  targets: SkipTarget[];
}

export function skipPropertiesSerializer(item: SkipProperties): any {
  return { targets: skipTargetArraySerializer(item["targets"]) };
}

export function skipTargetArraySerializer(result: Array<SkipTarget>): any[] {
  return result.map((item) => {
    return skipTargetSerializer(item);
  });
}

/** The definition of a single skip request. */
export interface SkipTarget {
  /** The skip target type. */
  type: TargetType;
  /**
   * The skip target's name.
   * To skip a member/group/stage, use the member/group/stage's name;
   * Tp skip an after stage wait, use the parent stage's name.
   */
  name: string;
}

export function skipTargetSerializer(item: SkipTarget): any {
  return { type: item["type"], name: item["name"] };
}

/** The target type of a skip request. */
export enum KnownTargetType {
  /** Skip the update of a member. */
  Member = "Member",
  /** Skip the update of a group. */
  Group = "Group",
  /** Skip the update of an entire stage including the after stage wait. */
  Stage = "Stage",
  /** Skip the update of the after stage wait of a certain stage. */
  AfterStageWait = "AfterStageWait",
}

/**
 * The target type of a skip request. \
 * {@link KnownTargetType} can be used interchangeably with TargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Member**: Skip the update of a member. \
 * **Group**: Skip the update of a group. \
 * **Stage**: Skip the update of an entire stage including the after stage wait. \
 * **AfterStageWait**: Skip the update of the after stage wait of a certain stage.
 */
export type TargetType = string;

/** Defines a multi-stage process to perform update operations across members of a Fleet. */
export interface FleetUpdateStrategy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetUpdateStrategyProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function fleetUpdateStrategySerializer(item: FleetUpdateStrategy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetUpdateStrategyPropertiesSerializer(item["properties"]),
  };
}

export function fleetUpdateStrategyDeserializer(
  item: any,
): FleetUpdateStrategy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fleetUpdateStrategyPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the UpdateStrategy. */
export interface FleetUpdateStrategyProperties {
  /** The provisioning state of the UpdateStrategy resource. */
  readonly provisioningState?: FleetUpdateStrategyProvisioningState;
  /** Defines the update sequence of the clusters. */
  strategy: UpdateRunStrategy;
}

export function fleetUpdateStrategyPropertiesSerializer(
  item: FleetUpdateStrategyProperties,
): any {
  return { strategy: updateRunStrategySerializer(item["strategy"]) };
}

export function fleetUpdateStrategyPropertiesDeserializer(
  item: any,
): FleetUpdateStrategyProperties {
  return {
    provisioningState: item["provisioningState"],
    strategy: updateRunStrategyDeserializer(item["strategy"]),
  };
}

/** The provisioning state of the UpdateStrategy resource. */
export enum KnownFleetUpdateStrategyProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the UpdateStrategy resource. \
 * {@link KnownFleetUpdateStrategyProvisioningState} can be used interchangeably with FleetUpdateStrategyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type FleetUpdateStrategyProvisioningState = string;

/** The response of a FleetUpdateStrategy list operation. */
export interface _FleetUpdateStrategyListResult {
  /** The FleetUpdateStrategy items on this page */
  value: FleetUpdateStrategy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetUpdateStrategyListResultDeserializer(
  item: any,
): _FleetUpdateStrategyListResult {
  return {
    value: fleetUpdateStrategyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetUpdateStrategyArraySerializer(
  result: Array<FleetUpdateStrategy>,
): any[] {
  return result.map((item) => {
    return fleetUpdateStrategySerializer(item);
  });
}

export function fleetUpdateStrategyArrayDeserializer(
  result: Array<FleetUpdateStrategy>,
): any[] {
  return result.map((item) => {
    return fleetUpdateStrategyDeserializer(item);
  });
}

/** The AutoUpgradeProfile resource. */
export interface AutoUpgradeProfile extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutoUpgradeProfileProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function autoUpgradeProfileSerializer(item: AutoUpgradeProfile): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : autoUpgradeProfilePropertiesSerializer(item["properties"]),
  };
}

export function autoUpgradeProfileDeserializer(item: any): AutoUpgradeProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autoUpgradeProfilePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the AutoUpgradeProfile. */
export interface AutoUpgradeProfileProperties {
  /** The provisioning state of the AutoUpgradeProfile resource. */
  readonly provisioningState?: AutoUpgradeProfileProvisioningState;
  /** The resource id of the UpdateStrategy resource to reference. If not specified, the auto upgrade will run on all clusters which are members of the fleet. */
  updateStrategyId?: string;
  /** Configures how auto-upgrade will be run. */
  channel: UpgradeChannel;
  /** The node image upgrade to be applied to the target clusters in auto upgrade. */
  nodeImageSelection?: AutoUpgradeNodeImageSelection;
  /**
   * If set to False: the auto upgrade has effect - target managed clusters will be upgraded on schedule.
   * If set to True: the auto upgrade has no effect - no upgrade will be run on the target managed clusters.
   * This is a boolean and not an enum because enabled/disabled are all available states of the auto upgrade profile.
   * By default, this is set to False.
   */
  disabled?: boolean;
  /** The status of the auto upgrade profile. */
  autoUpgradeProfileStatus?: AutoUpgradeProfileStatus;
}

export function autoUpgradeProfilePropertiesSerializer(
  item: AutoUpgradeProfileProperties,
): any {
  return {
    updateStrategyId: item["updateStrategyId"],
    channel: item["channel"],
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : autoUpgradeNodeImageSelectionSerializer(item["nodeImageSelection"]),
    disabled: item["disabled"],
    autoUpgradeProfileStatus: !item["autoUpgradeProfileStatus"]
      ? item["autoUpgradeProfileStatus"]
      : autoUpgradeProfileStatusSerializer(item["autoUpgradeProfileStatus"]),
  };
}

export function autoUpgradeProfilePropertiesDeserializer(
  item: any,
): AutoUpgradeProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    updateStrategyId: item["updateStrategyId"],
    channel: item["channel"],
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : autoUpgradeNodeImageSelectionDeserializer(item["nodeImageSelection"]),
    disabled: item["disabled"],
    autoUpgradeProfileStatus: !item["autoUpgradeProfileStatus"]
      ? item["autoUpgradeProfileStatus"]
      : autoUpgradeProfileStatusDeserializer(item["autoUpgradeProfileStatus"]),
  };
}

/** The provisioning state of the AutoUpgradeProfile resource. */
export enum KnownAutoUpgradeProfileProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the AutoUpgradeProfile resource. \
 * {@link KnownAutoUpgradeProfileProvisioningState} can be used interchangeably with AutoUpgradeProfileProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type AutoUpgradeProfileProvisioningState = string;

/** Configuration of how auto upgrade will be run. */
export enum KnownUpgradeChannel {
  /**
   *  Upgrades the clusters kubernetes version to the latest supported patch release on minor version N-1, where N is the latest supported minor version.
   *  For example, if a cluster runs version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, the cluster upgrades to 1.18.6.
   */
  Stable = "Stable",
  /** Upgrades the clusters kubernetes version to the latest supported patch release on the latest supported minor version. */
  Rapid = "Rapid",
  /** Upgrade node image version of the clusters. */
  NodeImage = "NodeImage",
}

/**
 * Configuration of how auto upgrade will be run. \
 * {@link KnownUpgradeChannel} can be used interchangeably with UpgradeChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stable**:  Upgrades the clusters kubernetes version to the latest supported patch release on minor version N-1, where N is the latest supported minor version.
 *  For example, if a cluster runs version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, the cluster upgrades to 1.18.6. \
 * **Rapid**: Upgrades the clusters kubernetes version to the latest supported patch release on the latest supported minor version. \
 * **NodeImage**: Upgrade node image version of the clusters.
 */
export type UpgradeChannel = string;

/** The node image upgrade to be applied to the target clusters in auto upgrade. */
export interface AutoUpgradeNodeImageSelection {
  /** The node image upgrade type. */
  type: AutoUpgradeNodeImageSelectionType;
}

export function autoUpgradeNodeImageSelectionSerializer(
  item: AutoUpgradeNodeImageSelection,
): any {
  return { type: item["type"] };
}

export function autoUpgradeNodeImageSelectionDeserializer(
  item: any,
): AutoUpgradeNodeImageSelection {
  return {
    type: item["type"],
  };
}

/** The node image upgrade type. */
export enum KnownAutoUpgradeNodeImageSelectionType {
  /** Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. */
  Latest = "Latest",
  /** The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. */
  Consistent = "Consistent",
}

/**
 * The node image upgrade type. \
 * {@link KnownAutoUpgradeNodeImageSelectionType} can be used interchangeably with AutoUpgradeNodeImageSelectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. \
 * **Consistent**: The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'.
 */
export type AutoUpgradeNodeImageSelectionType = string;

/** AutoUpgradeProfileStatus is the status of an auto upgrade profile. */
export interface AutoUpgradeProfileStatus {
  /** The UTC time of the last attempt to automatically create and start an UpdateRun as triggered by the release of new versions. */
  readonly lastTriggeredAt?: Date;
  /** The status of the last AutoUpgrade trigger. */
  readonly lastTriggerStatus?: AutoUpgradeLastTriggerStatus;
  /** The error details of the last trigger. */
  readonly lastTriggerError?: ErrorDetail;
  /** The target Kubernetes version or node image versions of the last trigger. */
  readonly lastTriggerUpgradeVersions?: string[];
}

export function autoUpgradeProfileStatusSerializer(
  item: AutoUpgradeProfileStatus,
): any {
  return item;
}

export function autoUpgradeProfileStatusDeserializer(
  item: any,
): AutoUpgradeProfileStatus {
  return {
    lastTriggeredAt: !item["lastTriggeredAt"]
      ? item["lastTriggeredAt"]
      : new Date(item["lastTriggeredAt"]),
    lastTriggerStatus: item["lastTriggerStatus"],
    lastTriggerError: !item["lastTriggerError"]
      ? item["lastTriggerError"]
      : errorDetailDeserializer(item["lastTriggerError"]),
    lastTriggerUpgradeVersions: !item["lastTriggerUpgradeVersions"]
      ? item["lastTriggerUpgradeVersions"]
      : item["lastTriggerUpgradeVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** AutoUpgradeLastTriggerStatus is the status of the last AutoUpgrade trigger (attempt to automatically create and start UpdateRun when there are new released versions) of an auto upgrade profile. */
export enum KnownAutoUpgradeLastTriggerStatus {
  /** The last AutoUpgrade trigger was succeeded. */
  Succeeded = "Succeeded",
  /** The last AutoUpgrade trigger failed. */
  Failed = "Failed",
}

/**
 * AutoUpgradeLastTriggerStatus is the status of the last AutoUpgrade trigger (attempt to automatically create and start UpdateRun when there are new released versions) of an auto upgrade profile. \
 * {@link KnownAutoUpgradeLastTriggerStatus} can be used interchangeably with AutoUpgradeLastTriggerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The last AutoUpgrade trigger was succeeded. \
 * **Failed**: The last AutoUpgrade trigger failed.
 */
export type AutoUpgradeLastTriggerStatus = string;

/** The response of a AutoUpgradeProfile list operation. */
export interface _AutoUpgradeProfileListResult {
  /** The AutoUpgradeProfile items on this page */
  value: AutoUpgradeProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autoUpgradeProfileListResultDeserializer(
  item: any,
): _AutoUpgradeProfileListResult {
  return {
    value: autoUpgradeProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoUpgradeProfileArraySerializer(
  result: Array<AutoUpgradeProfile>,
): any[] {
  return result.map((item) => {
    return autoUpgradeProfileSerializer(item);
  });
}

export function autoUpgradeProfileArrayDeserializer(
  result: Array<AutoUpgradeProfile>,
): any[] {
  return result.map((item) => {
    return autoUpgradeProfileDeserializer(item);
  });
}

/** GenerateResponse is the response of a generate request. */
export interface GenerateResponse {
  /** The ARM resource id of the generated UpdateRun. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}'. */
  readonly id: string;
}

export function generateResponseDeserializer(item: any): GenerateResponse {
  return {
    id: item["id"],
  };
}

/** Azure Kubernetes Fleet Manager api versions. */
export enum KnownVersions {
  /** Azure Kubernetes Fleet Manager api version 2023-10-15. */
  V20231015 = "2023-10-15",
  /** Azure Kubernetes Fleet Manager api version 2024-04-01. */
  V20240401 = "2024-04-01",
  /** Azure Kubernetes Fleet Manager api version 2025-03-01. */
  V20250301 = "2025-03-01",
}
