// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Resource information with extended details. */
export interface CloudHsmCluster extends TrackedResource {
  /** Properties of the Cloud HSM Cluster */
  properties?: CloudHsmClusterProperties;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** SKU details */
  sku?: CloudHsmClusterSku;
}

export function cloudHsmClusterSerializer(item: CloudHsmCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudHsmClusterPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : cloudHsmClusterSkuSerializer(item["sku"]),
  };
}

export function cloudHsmClusterDeserializer(item: any): CloudHsmCluster {
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
      : cloudHsmClusterPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"]
      ? item["sku"]
      : cloudHsmClusterSkuDeserializer(item["sku"]),
  };
}

/** Properties of a Cloud HSM Cluster. */
export interface CloudHsmClusterProperties {
  /** State of security domain activation */
  readonly activationState?: ActivationState;
  /** The Cloud HSM Cluster's auto-generated Domain Name Label Scope */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /** An array of Cloud HSM Cluster's HSMs */
  readonly hsms?: CloudHsmProperties[];
  /** List of private endpoint connection resources */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The Cloud HSM Cluster's provisioningState */
  readonly provisioningState?: ProvisioningState;
  /** The Cloud HSM Cluster public network access */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Cloud HSM Cluster status message */
  readonly statusMessage?: string;
}

export function cloudHsmClusterPropertiesSerializer(
  item: CloudHsmClusterProperties,
): any {
  return {
    autoGeneratedDomainNameLabelScope:
      item["autoGeneratedDomainNameLabelScope"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function cloudHsmClusterPropertiesDeserializer(
  item: any,
): CloudHsmClusterProperties {
  return {
    activationState: item["activationState"],
    autoGeneratedDomainNameLabelScope:
      item["autoGeneratedDomainNameLabelScope"],
    hsms: !item["hsms"]
      ? item["hsms"]
      : cloudHsmPropertiesArrayDeserializer(item["hsms"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    statusMessage: item["statusMessage"],
  };
}

/** State of security domain activation */
export enum KnownActivationState {
  NotDefined = "NotDefined",
  NotActivated = "NotActivated",
  Active = "Active",
  Failed = "Failed",
  Unknown = "Unknown",
}

/**
 * State of security domain activation \
 * {@link KnownActivationState} can be used interchangeably with ActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDefined** \
 * **NotActivated** \
 * **Active** \
 * **Failed** \
 * **Unknown**
 */
export type ActivationState = string;

/** The Cloud HSM Cluster's auto-generated Domain Name Label Scope */
export enum KnownAutoGeneratedDomainNameLabelScope {
  TenantReuse = "TenantReuse",
  SubscriptionReuse = "SubscriptionReuse",
  ResourceGroupReuse = "ResourceGroupReuse",
  NoReuse = "NoReuse",
}

/**
 * The Cloud HSM Cluster's auto-generated Domain Name Label Scope \
 * {@link KnownAutoGeneratedDomainNameLabelScope} can be used interchangeably with AutoGeneratedDomainNameLabelScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse** \
 * **SubscriptionReuse** \
 * **ResourceGroupReuse** \
 * **NoReuse**
 */
export type AutoGeneratedDomainNameLabelScope = string;

export function cloudHsmPropertiesArrayDeserializer(
  result: Array<CloudHsmProperties>,
): any[] {
  return result.map((item) => {
    return cloudHsmPropertiesDeserializer(item);
  });
}

/** The Cloud HSM Properties */
export interface CloudHsmProperties {
  /** FQDN of the Cloud HSM */
  fqdn?: string;
  /** The Cloud HSM State. Values are: Deploying, ConfiguringSlb, Starting, Starting, Failed, Failed, Deleting, DeletingSlbEntry, InitialProvisioning, Updating */
  state?: string;
  /** The Cloud HSM State message */
  stateMessage?: string;
}

export function cloudHsmPropertiesDeserializer(item: any): CloudHsmProperties {
  return {
    fqdn: item["fqdn"],
    state: item["state"],
    stateMessage: item["stateMessage"],
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

/** The private endpoint connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
  /** Modified whenever there is a change in the state of private endpoint connection. */
  etag?: string;
}

export function privateEndpointConnectionSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function privateEndpointConnectionDeserializer(
  item: any,
): PrivateEndpointConnection {
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
    etag: item["etag"],
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState:
      privateLinkServiceConnectionStateSerializer(
        item["privateLinkServiceConnectionState"],
      ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState:
      privateLinkServiceConnectionStateDeserializer(
        item["privateLinkServiceConnectionState"],
      ),
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  Succeeded = "Succeeded",
  Creating = "Creating",
  Deleting = "Deleting",
  Failed = "Failed",
  Updating = "Updating",
  InternalError = "InternalError",
  Canceled = "Canceled",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed** \
 * **Updating** \
 * **InternalError** \
 * **Canceled**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** The Cloud HSM Cluster's provisioningState */
export enum KnownProvisioningState {
  Provisioning = "Provisioning",
  Succeeded = "Succeeded",
  Updating = "Updating",
  Failed = "Failed",
  Deleting = "Deleting",
  Canceled = "Canceled",
}

/**
 * The Cloud HSM Cluster's provisioningState \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning** \
 * **Succeeded** \
 * **Updating** \
 * **Failed** \
 * **Deleting** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The Cloud HSM Cluster public network access */
export enum KnownPublicNetworkAccess {
  Disabled = "Disabled",
}

/**
 * The Cloud HSM Cluster public network access \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**
 */
export type PublicNetworkAccess = string;

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

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(
  item: any,
): ManagedServiceIdentity {
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

export function userAssignedIdentitySerializer(
  item: UserAssignedIdentity,
): any {
  return item;
}

export function userAssignedIdentityDeserializer(
  item: any,
): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Cloud Hsm Cluster SKU information */
export interface CloudHsmClusterSku {
  /** Sku family of the Cloud HSM Cluster */
  family: CloudHsmClusterSkuFamily;
  /** Sku name of the Cloud HSM Cluster */
  name: CloudHsmClusterSkuName;
  /** Sku capacity */
  capacity?: number;
}

export function cloudHsmClusterSkuSerializer(item: CloudHsmClusterSku): any {
  return {
    family: item["family"],
    name: item["name"],
    capacity: item["capacity"],
  };
}

export function cloudHsmClusterSkuDeserializer(item: any): CloudHsmClusterSku {
  return {
    family: item["family"],
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** Sku family of the Cloud HSM Cluster */
export enum KnownCloudHsmClusterSkuFamily {
  B = "B",
}

/**
 * Sku family of the Cloud HSM Cluster \
 * {@link KnownCloudHsmClusterSkuFamily} can be used interchangeably with CloudHsmClusterSkuFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **B**
 */
export type CloudHsmClusterSkuFamily = string;
/** Sku name of the Cloud HSM Cluster */
export type CloudHsmClusterSkuName = "Standard_B1" | "Standard B10";

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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** Patchable properties of the Cloud HSM Cluster */
export interface CloudHsmClusterPatchParameters {
  /** The Cloud HSM Cluster's tags */
  tags?: Record<string, string>;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
}

export function cloudHsmClusterPatchParametersSerializer(
  item: CloudHsmClusterPatchParameters,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a CloudHsmCluster list operation. */
export interface _CloudHsmClusterListResult {
  /** The CloudHsmCluster items on this page */
  value: CloudHsmCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudHsmClusterListResultDeserializer(
  item: any,
): _CloudHsmClusterListResult {
  return {
    value: cloudHsmClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudHsmClusterArraySerializer(
  result: Array<CloudHsmCluster>,
): any[] {
  return result.map((item) => {
    return cloudHsmClusterSerializer(item);
  });
}

export function cloudHsmClusterArrayDeserializer(
  result: Array<CloudHsmCluster>,
): any[] {
  return result.map((item) => {
    return cloudHsmClusterDeserializer(item);
  });
}

/** Backup properties */
export interface BackupRequestProperties
  extends BackupRestoreRequestBaseProperties {}

export function backupRequestPropertiesSerializer(
  item: BackupRequestProperties,
): any {
  return {
    azureStorageBlobContainerUri: item["azureStorageBlobContainerUri"],
    token: item["token"],
  };
}

/** Backup and Restore Common properties */
export interface BackupRestoreRequestBaseProperties {
  /** The Azure blob storage container Uri which contains the backup */
  azureStorageBlobContainerUri: string;
  /** The SAS token pointing to an Azure blob storage container. This property is reserved for Azure Backup Service. */
  token?: string;
}

export function backupRestoreRequestBasePropertiesSerializer(
  item: BackupRestoreRequestBaseProperties,
): any {
  return {
    azureStorageBlobContainerUri: item["azureStorageBlobContainerUri"],
    token: item["token"],
  };
}

/** Backup operation Result */
export interface BackupResult {
  /** Properties of the Cloud HSM Cluster */
  properties?: BackupResultProperties;
}

export function backupResultDeserializer(item: any): BackupResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupResultPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the Cloud HSM Cluster */
export interface BackupResultProperties
  extends BackupRestoreBaseResultProperties {
  /** The Azure blob storage container Uri which contains the backup */
  azureStorageBlobContainerUri?: string;
  /** The ID of the backup. */
  backupId?: string;
}

export function backupResultPropertiesDeserializer(
  item: any,
): BackupResultProperties {
  return {
    status: item["status"],
    statusDetails: item["statusDetails"],
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    jobId: item["jobId"],
    azureStorageBlobContainerUri: item["azureStorageBlobContainerUri"],
    backupId: item["backupId"],
  };
}

/** Backup and Restore operation common properties */
export interface BackupRestoreBaseResultProperties {
  /** Status of the backup/restore operation */
  readonly status?: BackupRestoreOperationStatus;
  /** The status details of backup/restore operation */
  statusDetails?: string;
  /** Error encountered, if any, during the backup/restore operation. */
  error?: ErrorDetail;
  /** The start time of the backup/restore operation in UTC */
  readonly startTime?: Date;
  /** The end time of the backup/restore operation in UTC */
  readonly endTime?: Date | null;
  /** Identifier for the backup/restore operation. */
  jobId?: string;
}

export function backupRestoreBaseResultPropertiesDeserializer(
  item: any,
): BackupRestoreBaseResultProperties {
  return {
    status: item["status"],
    statusDetails: item["statusDetails"],
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
    startTime: !item["startTime"]
      ? item["startTime"]
      : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    jobId: item["jobId"],
  };
}

/** Status of the backup/restore operation */
export enum KnownBackupRestoreOperationStatus {
  InProgress = "InProgress",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Cancelled = "Cancelled",
}

/**
 * Status of the backup/restore operation \
 * {@link KnownBackupRestoreOperationStatus} can be used interchangeably with BackupRestoreOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Succeeded** \
 * **Failed** \
 * **Cancelled**
 */
export type BackupRestoreOperationStatus = string;

/** Cloud Hsm Cluster restore information */
export interface RestoreRequestProperties
  extends BackupRestoreRequestBaseProperties {
  /** An autogenerated unique string ID for labeling the backup. It contains both a UUID and a date timestamp. */
  backupId: string;
}

export function restoreRequestPropertiesSerializer(
  item: RestoreRequestProperties,
): any {
  return {
    azureStorageBlobContainerUri: item["azureStorageBlobContainerUri"],
    token: item["token"],
    backupId: item["backupId"],
  };
}

/** Restore operation properties */
export interface RestoreResult {
  /** Backup and Restore operation common properties */
  properties?: BackupRestoreBaseResultProperties;
}

export function restoreResultDeserializer(item: any): RestoreResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupRestoreBaseResultPropertiesDeserializer(item["properties"]),
  };
}

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

/** A list of private link resources. */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
  /** URL to get the next set of operation list results (if there are any). */
  readonly nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(
  result: Array<PrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(
  item: any,
): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
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

/** Resource information with extended details. */
export interface DedicatedHsm extends TrackedResource {
  /** SKU details */
  sku: Sku;
  /** The availability zones. */
  zones?: string[];
  /** Properties of the dedicated HSM */
  properties: DedicatedHsmProperties;
}

export function dedicatedHsmSerializer(item: DedicatedHsm): any {
  return {
    tags: item["tags"],
    location: item["location"],
    sku: skuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: dedicatedHsmPropertiesSerializer(item["properties"]),
  };
}

export function dedicatedHsmDeserializer(item: any): DedicatedHsm {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    sku: skuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: dedicatedHsmPropertiesDeserializer(item["properties"]),
  };
}

/** SKU of the dedicated HSM */
export interface Sku {
  /** SKU of the dedicated HSM */
  name?: SkuName;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** SKU of the dedicated HSM */
export enum KnownSkuName {
  /** The dedicated HSM is a Safenet Luna Network HSM A790 device. */
  SafeNetLunaNetworkHSMA790 = "SafeNet Luna Network HSM A790",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 60 calls per second. */
  PayShield10KLMK1CPS60 = "payShield10K_LMK1_CPS60",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 250 calls per second. */
  PayShield10KLMK1CPS250 = "payShield10K_LMK1_CPS250",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 2500 calls per second. */
  PayShield10KLMK1CPS2500 = "payShield10K_LMK1_CPS2500",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 60 calls per second. */
  PayShield10KLMK2CPS60 = "payShield10K_LMK2_CPS60",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 250 calls per second. */
  PayShield10KLMK2CPS250 = "payShield10K_LMK2_CPS250",
  /** The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 2500 calls per second. */
  PayShield10KLMK2CPS2500 = "payShield10K_LMK2_CPS2500",
}

/**
 * SKU of the dedicated HSM \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SafeNet Luna Network HSM A790**: The dedicated HSM is a Safenet Luna Network HSM A790 device. \
 * **payShield10K_LMK1_CPS60**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 60 calls per second. \
 * **payShield10K_LMK1_CPS250**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 250 calls per second. \
 * **payShield10K_LMK1_CPS2500**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 1 local master key which supports up to 2500 calls per second. \
 * **payShield10K_LMK2_CPS60**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 60 calls per second. \
 * **payShield10K_LMK2_CPS250**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 250 calls per second. \
 * **payShield10K_LMK2_CPS2500**: The dedicated HSM is a payShield 10K, model PS10-D, 10Gb Ethernet Hardware Platform device with 2 local master keys which supports up to 2500 calls per second.
 */
export type SkuName = string;

/** Properties of the dedicated hsm */
export interface DedicatedHsmProperties {
  /** Specifies the network interfaces of the dedicated hsm. */
  networkProfile?: NetworkProfile;
  /** Specifies the management network interfaces of the dedicated hsm. */
  managementNetworkProfile?: NetworkProfile;
  /** This field will be used when RP does not support Availability zones. */
  stampId?: string;
  /** Resource Status Message. */
  readonly statusMessage?: string;
  /** Provisioning state. */
  readonly provisioningState?: JsonWebKeyType;
}

export function dedicatedHsmPropertiesSerializer(
  item: DedicatedHsmProperties,
): any {
  return {
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    managementNetworkProfile: !item["managementNetworkProfile"]
      ? item["managementNetworkProfile"]
      : networkProfileSerializer(item["managementNetworkProfile"]),
    stampId: item["stampId"],
  };
}

export function dedicatedHsmPropertiesDeserializer(
  item: any,
): DedicatedHsmProperties {
  return {
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    managementNetworkProfile: !item["managementNetworkProfile"]
      ? item["managementNetworkProfile"]
      : networkProfileDeserializer(item["managementNetworkProfile"]),
    stampId: item["stampId"],
    statusMessage: item["statusMessage"],
    provisioningState: item["provisioningState"],
  };
}

/** The network profile definition. */
export interface NetworkProfile {
  /** Specifies the identifier of the subnet. */
  subnet?: ApiEntityReference;
  /** Specifies the list of resource Ids for the network interfaces associated with the dedicated HSM. */
  networkInterfaces?: NetworkInterface[];
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    subnet: !item["subnet"]
      ? item["subnet"]
      : apiEntityReferenceSerializer(item["subnet"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArraySerializer(item["networkInterfaces"]),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    subnet: !item["subnet"]
      ? item["subnet"]
      : apiEntityReferenceDeserializer(item["subnet"]),
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
  };
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The Azure resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  resourceId?: string;
}

export function apiEntityReferenceSerializer(item: ApiEntityReference): any {
  return { resourceId: item["resourceId"] };
}

export function apiEntityReferenceDeserializer(item: any): ApiEntityReference {
  return {
    resourceId: item["resourceId"],
  };
}

export function networkInterfaceArraySerializer(
  result: Array<NetworkInterface>,
): any[] {
  return result.map((item) => {
    return networkInterfaceSerializer(item);
  });
}

export function networkInterfaceArrayDeserializer(
  result: Array<NetworkInterface>,
): any[] {
  return result.map((item) => {
    return networkInterfaceDeserializer(item);
  });
}

/** The network interface definition. */
export interface NetworkInterface {
  /** The Azure resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  readonly resourceId?: string;
  /** Private Ip address of the interface */
  privateIpAddress?: string;
}

export function networkInterfaceSerializer(item: NetworkInterface): any {
  return { privateIpAddress: item["privateIpAddress"] };
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
  return {
    resourceId: item["resourceId"],
    privateIpAddress: item["privateIpAddress"],
  };
}

/** Provisioning state. */
export enum KnownJsonWebKeyType {
  /** The dedicated HSM has been fully provisioned. */
  Succeeded = "Succeeded",
  /** The dedicated HSM is currently being provisioned. */
  Provisioning = "Provisioning",
  /** A device is currently being allocated for the dedicated HSM resource. */
  Allocating = "Allocating",
  /** The dedicated HSM is being connected to the virtual network. */
  Connecting = "Connecting",
  /** Provisioning of the dedicated HSM has failed. */
  Failed = "Failed",
  /** Validating the subscription has sufficient quota to allocate a dedicated HSM device. */
  CheckingQuota = "CheckingQuota",
  /** The dedicated HSM is currently being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state. \
 * {@link KnownJsonWebKeyType} can be used interchangeably with JsonWebKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The dedicated HSM has been fully provisioned. \
 * **Provisioning**: The dedicated HSM is currently being provisioned. \
 * **Allocating**: A device is currently being allocated for the dedicated HSM resource. \
 * **Connecting**: The dedicated HSM is being connected to the virtual network. \
 * **Failed**: Provisioning of the dedicated HSM has failed. \
 * **CheckingQuota**: Validating the subscription has sufficient quota to allocate a dedicated HSM device. \
 * **Deleting**: The dedicated HSM is currently being deleted.
 */
export type JsonWebKeyType = string;

/** The error exception. */
export interface DedicatedHsmError {
  /** The error detail of the operation if any. */
  readonly error?: ErrorModel;
}

export function dedicatedHsmErrorDeserializer(item: any): DedicatedHsmError {
  return {
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** The key vault server error. */
export interface ErrorModel {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** Contains more specific error that narrows down the cause. May be null. */
  readonly innerError?: ErrorModel;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    innerError: !item["innererror"]
      ? item["innererror"]
      : errorDeserializer(item["innererror"]),
  };
}

/** Patchable properties of the dedicated HSM */
export interface DedicatedHsmPatchParameters {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function dedicatedHsmPatchParametersSerializer(
  item: DedicatedHsmPatchParameters,
): any {
  return { tags: item["tags"] };
}

/** The response of a DedicatedHsm list operation. */
export interface _DedicatedHsmListResult {
  /** The DedicatedHsm items on this page */
  value: DedicatedHsm[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dedicatedHsmListResultDeserializer(
  item: any,
): _DedicatedHsmListResult {
  return {
    value: dedicatedHsmArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dedicatedHsmArraySerializer(
  result: Array<DedicatedHsm>,
): any[] {
  return result.map((item) => {
    return dedicatedHsmSerializer(item);
  });
}

export function dedicatedHsmArrayDeserializer(
  result: Array<DedicatedHsm>,
): any[] {
  return result.map((item) => {
    return dedicatedHsmDeserializer(item);
  });
}

/** Collection of OutboundEnvironmentEndpoint */
export interface _OutboundEnvironmentEndpointCollection {
  /** The OutboundEnvironmentEndpoint items on this page */
  value: OutboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _OutboundEnvironmentEndpointCollection {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** Egress endpoints which dedicated hsm service connects to for common purpose. */
export interface OutboundEnvironmentEndpoint {
  /** The category of endpoints accessed by the dedicated hsm service, e.g. azure-resource-management, apiserver, etc. */
  category?: string;
  /** The endpoints that dedicated hsm service connects to */
  endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(
  item: any,
): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(
  result: Array<EndpointDependency>,
): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that dedicated hsm services are reaching at. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports and Protocols used when connecting to domainName. */
  endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(
  result: Array<EndpointDetail>,
): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Connect information from the dedicated hsm service to a single endpoint. */
export interface EndpointDetail {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The protocol used for connection */
  protocol?: string;
  /** Description of the detail */
  description?: string;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    ipAddress: item["ipAddress"],
    port: item["port"],
    protocol: item["protocol"],
    description: item["description"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-31 API version. */
  V20250331 = "2025-03-31",
}
