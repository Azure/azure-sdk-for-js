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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Workload Model Resource */
export interface WorkloadResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadProperties;
}

export function workloadResourceSerializer(item: WorkloadResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workloadPropertiesSerializer(item["properties"]),
  };
}

export function workloadResourceDeserializer(item: any): WorkloadResource {
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
      : workloadPropertiesDeserializer(item["properties"]),
  };
}

/** Workload Resource properties */
export interface WorkloadProperties {
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
  /** List of resource group ids. */
  resourceGroupCollection?: string[];
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
}

export function workloadPropertiesSerializer(item: WorkloadProperties): any {
  return {
    resourceGroupCollection: !item["resourceGroupCollection"]
      ? item["resourceGroupCollection"]
      : item["resourceGroupCollection"].map((p: any) => {
          return p;
        }),
  };
}

export function workloadPropertiesDeserializer(item: any): WorkloadProperties {
  return {
    provisioningState: item["provisioningState"],
    resourceGroupCollection: !item["resourceGroupCollection"]
      ? item["resourceGroupCollection"]
      : item["resourceGroupCollection"].map((p: any) => {
          return p;
        }),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
  };
}

/** The provisioning status of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Provisioning State Type Accepted */
  Accepted = "Accepted",
  /** Provisioning State Type Creating */
  Creating = "Creating",
  /** Provisioning State Type Deleting */
  Deleting = "Deleting",
  /** Provisioning State Type NotSpecified */
  NotSpecified = "NotSpecified",
  /** Provisioning State Type Running */
  Running = "Running",
  /** Provisioning State Type Updating */
  Updating = "Updating",
}

/**
 * The provisioning status of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Provisioning State Type Accepted \
 * **Creating**: Provisioning State Type Creating \
 * **Deleting**: Provisioning State Type Deleting \
 * **NotSpecified**: Provisioning State Type NotSpecified \
 * **Running**: Provisioning State Type Running \
 * **Updating**: Provisioning State Type Updating
 */
export type ProvisioningState = string;

/** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
export interface ManagedOnBehalfOfConfiguration {
  /** Managed-On-Behalf-Of broker resources */
  readonly moboBrokerResources?: MoboBrokerResource[];
}

export function managedOnBehalfOfConfigurationDeserializer(
  item: any,
): ManagedOnBehalfOfConfiguration {
  return {
    moboBrokerResources: !item["moboBrokerResources"]
      ? item["moboBrokerResources"]
      : moboBrokerResourceArrayDeserializer(item["moboBrokerResources"]),
  };
}

export function moboBrokerResourceArrayDeserializer(result: Array<MoboBrokerResource>): any[] {
  return result.map((item) => {
    return moboBrokerResourceDeserializer(item);
  });
}

/** Managed-On-Behalf-Of broker resource. This resource is created by the Resource Provider to manage some resources on behalf of the user. */
export interface MoboBrokerResource {
  /** Resource identifier of a Managed-On-Behalf-Of broker resource */
  id?: string;
}

export function moboBrokerResourceDeserializer(item: any): MoboBrokerResource {
  return {
    id: item["id"],
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

/** Workload Patch Resource */
export interface WorkloadPatchModel {
  /** Workload Patch properties */
  properties?: WorkloadPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function workloadPatchModelSerializer(item: WorkloadPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Workload patchable Properties */
export interface WorkloadPatchProperties {
  /** List of resource group ids. */
  resourceGroupCollection?: string[];
}

export function workloadPatchPropertiesSerializer(item: WorkloadPatchProperties): any {
  return {
    resourceGroupCollection: !item["resourceGroupCollection"]
      ? item["resourceGroupCollection"]
      : item["resourceGroupCollection"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a WorkloadResource list operation. */
export interface _WorkloadResourceListResult {
  /** The WorkloadResource items on this page */
  value: WorkloadResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadResourceListResultDeserializer(item: any): _WorkloadResourceListResult {
  return {
    value: workloadResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadResourceArraySerializer(result: Array<WorkloadResource>): any[] {
  return result.map((item) => {
    return workloadResourceSerializer(item);
  });
}

export function workloadResourceArrayDeserializer(result: Array<WorkloadResource>): any[] {
  return result.map((item) => {
    return workloadResourceDeserializer(item);
  });
}

/** Virtual Enclave Model Resource */
export interface EnclaveResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualEnclaveProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function enclaveResourceSerializer(item: EnclaveResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualEnclavePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function enclaveResourceDeserializer(item: any): EnclaveResource {
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
      : virtualEnclavePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Virtual Enclave Resource properties */
export interface VirtualEnclaveProperties {
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
  /** Virtual Network. */
  enclaveVirtualNetwork: EnclaveVirtualNetworkModel;
  /** Enclave Address Spaces */
  readonly enclaveAddressSpaces?: EnclaveAddressSpacesModel;
  /** Community Resource Id. */
  communityResourceId: string;
  /** List of resource ids created by Virtual Enclave. */
  readonly resourceCollection?: string[];
  /** Managed resource group name. */
  readonly managedResourceGroupName?: string;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** Deploy Bastion service (True or False). */
  bastionEnabled?: boolean;
  /** Enclave role assignments */
  enclaveRoleAssignments?: RoleAssignmentItem[];
  /** Workload role assignments */
  workloadRoleAssignments?: RoleAssignmentItem[];
  /** Enclave specific policies */
  governedServiceList?: GovernedServiceItem[];
  /** Enclave default settings. */
  enclaveDefaultSettings?: EnclaveDefaultSettingsModel;
  /** Maintenance Mode configuration. */
  maintenanceModeConfiguration?: MaintenanceModeConfigurationModel;
}

export function virtualEnclavePropertiesSerializer(item: VirtualEnclaveProperties): any {
  return {
    enclaveVirtualNetwork: enclaveVirtualNetworkModelSerializer(item["enclaveVirtualNetwork"]),
    communityResourceId: item["communityResourceId"],
    bastionEnabled: item["bastionEnabled"],
    enclaveRoleAssignments: !item["enclaveRoleAssignments"]
      ? item["enclaveRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["enclaveRoleAssignments"]),
    workloadRoleAssignments: !item["workloadRoleAssignments"]
      ? item["workloadRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["workloadRoleAssignments"]),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArraySerializer(item["governedServiceList"]),
    enclaveDefaultSettings: !item["enclaveDefaultSettings"]
      ? item["enclaveDefaultSettings"]
      : enclaveDefaultSettingsModelSerializer(item["enclaveDefaultSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationModelSerializer(item["maintenanceModeConfiguration"]),
  };
}

export function virtualEnclavePropertiesDeserializer(item: any): VirtualEnclaveProperties {
  return {
    provisioningState: item["provisioningState"],
    enclaveVirtualNetwork: enclaveVirtualNetworkModelDeserializer(item["enclaveVirtualNetwork"]),
    enclaveAddressSpaces: !item["enclaveAddressSpaces"]
      ? item["enclaveAddressSpaces"]
      : enclaveAddressSpacesModelDeserializer(item["enclaveAddressSpaces"]),
    communityResourceId: item["communityResourceId"],
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
    managedResourceGroupName: item["managedResourceGroupName"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    bastionEnabled: item["bastionEnabled"],
    enclaveRoleAssignments: !item["enclaveRoleAssignments"]
      ? item["enclaveRoleAssignments"]
      : roleAssignmentItemArrayDeserializer(item["enclaveRoleAssignments"]),
    workloadRoleAssignments: !item["workloadRoleAssignments"]
      ? item["workloadRoleAssignments"]
      : roleAssignmentItemArrayDeserializer(item["workloadRoleAssignments"]),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArrayDeserializer(item["governedServiceList"]),
    enclaveDefaultSettings: !item["enclaveDefaultSettings"]
      ? item["enclaveDefaultSettings"]
      : enclaveDefaultSettingsModelDeserializer(item["enclaveDefaultSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationModelDeserializer(item["maintenanceModeConfiguration"]),
  };
}

/** Enclave Virtual Network Properties */
export interface EnclaveVirtualNetworkModel {
  /** Network Name. */
  networkName?: string;
  /** Network Size. */
  networkSize?: string;
  /** Custom CIDR Range. */
  customCidrRange?: string;
  /** Subnet Configurations. */
  subnetConfigurations?: SubnetConfiguration[];
  /** Allow Subnet Communication. */
  allowSubnetCommunication?: boolean;
}

export function enclaveVirtualNetworkModelSerializer(item: EnclaveVirtualNetworkModel): any {
  return {
    networkName: item["networkName"],
    networkSize: item["networkSize"],
    customCidrRange: item["customCidrRange"],
    subnetConfigurations: !item["subnetConfigurations"]
      ? item["subnetConfigurations"]
      : subnetConfigurationArraySerializer(item["subnetConfigurations"]),
    allowSubnetCommunication: item["allowSubnetCommunication"],
  };
}

export function enclaveVirtualNetworkModelDeserializer(item: any): EnclaveVirtualNetworkModel {
  return {
    networkName: item["networkName"],
    networkSize: item["networkSize"],
    customCidrRange: item["customCidrRange"],
    subnetConfigurations: !item["subnetConfigurations"]
      ? item["subnetConfigurations"]
      : subnetConfigurationArrayDeserializer(item["subnetConfigurations"]),
    allowSubnetCommunication: item["allowSubnetCommunication"],
  };
}

export function subnetConfigurationArraySerializer(result: Array<SubnetConfiguration>): any[] {
  return result.map((item) => {
    return subnetConfigurationSerializer(item);
  });
}

export function subnetConfigurationArrayDeserializer(result: Array<SubnetConfiguration>): any[] {
  return result.map((item) => {
    return subnetConfigurationDeserializer(item);
  });
}

/** Subnet Configuration */
export interface SubnetConfiguration {
  /** Subnet name. */
  subnetName: string;
  /** Subnet Resource ID. */
  readonly subnetResourceId?: string;
  /** Network prefix size. */
  networkPrefixSize: number;
  /** Subnet delegation. */
  subnetDelegation?: string;
  /** Address prefix. */
  readonly addressPrefix?: string;
  /** Network security group ID. */
  readonly networkSecurityGroupResourceId?: string;
}

export function subnetConfigurationSerializer(item: SubnetConfiguration): any {
  return {
    subnetName: item["subnetName"],
    networkPrefixSize: item["networkPrefixSize"],
    subnetDelegation: item["subnetDelegation"],
  };
}

export function subnetConfigurationDeserializer(item: any): SubnetConfiguration {
  return {
    subnetName: item["subnetName"],
    subnetResourceId: item["subnetResourceId"],
    networkPrefixSize: item["networkPrefixSize"],
    subnetDelegation: item["subnetDelegation"],
    addressPrefix: item["addressPrefix"],
    networkSecurityGroupResourceId: item["networkSecurityGroupResourceId"],
  };
}

/** Enclave Address Spaces */
export interface EnclaveAddressSpacesModel {
  /** Enclave Address Space */
  enclaveAddressSpace?: string;
  /** Managed Address Space */
  managedAddressSpace?: string;
}

export function enclaveAddressSpacesModelDeserializer(item: any): EnclaveAddressSpacesModel {
  return {
    enclaveAddressSpace: item["enclaveAddressSpace"],
    managedAddressSpace: item["managedAddressSpace"],
  };
}

export function roleAssignmentItemArraySerializer(result: Array<RoleAssignmentItem>): any[] {
  return result.map((item) => {
    return roleAssignmentItemSerializer(item);
  });
}

export function roleAssignmentItemArrayDeserializer(result: Array<RoleAssignmentItem>): any[] {
  return result.map((item) => {
    return roleAssignmentItemDeserializer(item);
  });
}

/** Role assignment item that indicates which principals should be assigned this role definition */
export interface RoleAssignmentItem {
  /** Role definition identifier */
  roleDefinitionId: string;
  /** List of principal IDs to which to assign this role definition */
  principals?: Principal[];
}

export function roleAssignmentItemSerializer(item: RoleAssignmentItem): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principals: !item["principals"]
      ? item["principals"]
      : principalArraySerializer(item["principals"]),
  };
}

export function roleAssignmentItemDeserializer(item: any): RoleAssignmentItem {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principals: !item["principals"]
      ? item["principals"]
      : principalArrayDeserializer(item["principals"]),
  };
}

export function principalArraySerializer(result: Array<Principal>): any[] {
  return result.map((item) => {
    return principalSerializer(item);
  });
}

export function principalArrayDeserializer(result: Array<Principal>): any[] {
  return result.map((item) => {
    return principalDeserializer(item);
  });
}

/** Principal for maintenance mode or role assignments */
export interface Principal {
  /** The object id associated with the principal */
  id: string;
  /** The type of the object id. We currently allow users, groups, and service principals */
  type: string;
}

export function principalSerializer(item: Principal): any {
  return { id: item["id"], type: item["type"] };
}

export function principalDeserializer(item: any): Principal {
  return {
    id: item["id"],
    type: item["type"],
  };
}

export function governedServiceItemArraySerializer(result: Array<GovernedServiceItem>): any[] {
  return result.map((item) => {
    return governedServiceItemSerializer(item);
  });
}

export function governedServiceItemArrayDeserializer(result: Array<GovernedServiceItem>): any[] {
  return result.map((item) => {
    return governedServiceItemDeserializer(item);
  });
}

/** GovernedServiceItem Properties */
export interface GovernedServiceItem {
  /** Service ID */
  serviceId: ServiceIdentifier;
  /** Service name. */
  readonly serviceName?: string;
  /** Governance option for this service (Allow, Deny, ExceptionOnly, or NotApplicable). */
  option?: string;
  /** Initiative enforcement (Enabled or Disabled). */
  enforcement?: string;
  /** Enforcement mode for policy. AuditOnly, Enforce, or None. */
  policyAction?: string;
  /** Initiatives associated with this service. */
  readonly initiatives?: string[];
}

export function governedServiceItemSerializer(item: GovernedServiceItem): any {
  return {
    serviceId: item["serviceId"],
    option: item["option"],
    enforcement: item["enforcement"],
    policyAction: item["policyAction"],
  };
}

export function governedServiceItemDeserializer(item: any): GovernedServiceItem {
  return {
    serviceId: item["serviceId"],
    serviceName: item["serviceName"],
    option: item["option"],
    enforcement: item["enforcement"],
    policyAction: item["policyAction"],
    initiatives: !item["initiatives"]
      ? item["initiatives"]
      : item["initiatives"].map((p: any) => {
          return p;
        }),
  };
}

/** Identifier for governed services. */
export enum KnownServiceIdentifier {
  /** Service identifier for AKS */
  AKS = "AKS",
  /** Service identifier for App Service */
  AppService = "AppService",
  /** Service identifier for Azure Firewalls */
  AzureFirewalls = "AzureFirewalls",
  /** Service identifier for Container Registry */
  ContainerRegistry = "ContainerRegistry",
  /** Service identifier for CosmosDB */
  CosmosDB = "CosmosDB",
  /** Service identifier for Data Connectors */
  DataConnectors = "DataConnectors",
  /** Service identifier for Insights */
  Insights = "Insights",
  /** Service identifier for Key Vault */
  KeyVault = "KeyVault",
  /** Service identifier for Logic */
  Logic = "Logic",
  /** Service identifier for Microsoft SQL */
  MicrosoftSql = "MicrosoftSQL",
  /** Service identifier for Monitoring */
  Monitoring = "Monitoring",
  /** Service identifier for PostgreSQL */
  PostgreSql = "PostgreSQL",
  /** Service identifier for Private DNS Zones */
  PrivateDNSZones = "PrivateDNSZones",
  /** Service identifier for Service Bus */
  ServiceBus = "ServiceBus",
  /** Service identifier for Storage */
  Storage = "Storage",
}

/**
 * Identifier for governed services. \
 * {@link KnownServiceIdentifier} can be used interchangeably with ServiceIdentifier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKS**: Service identifier for AKS \
 * **AppService**: Service identifier for App Service \
 * **AzureFirewalls**: Service identifier for Azure Firewalls \
 * **ContainerRegistry**: Service identifier for Container Registry \
 * **CosmosDB**: Service identifier for CosmosDB \
 * **DataConnectors**: Service identifier for Data Connectors \
 * **Insights**: Service identifier for Insights \
 * **KeyVault**: Service identifier for Key Vault \
 * **Logic**: Service identifier for Logic \
 * **MicrosoftSQL**: Service identifier for Microsoft SQL \
 * **Monitoring**: Service identifier for Monitoring \
 * **PostgreSQL**: Service identifier for PostgreSQL \
 * **PrivateDNSZones**: Service identifier for Private DNS Zones \
 * **ServiceBus**: Service identifier for Service Bus \
 * **Storage**: Service identifier for Storage
 */
export type ServiceIdentifier = string;

/** Virtual Enclave Default Settings */
export interface EnclaveDefaultSettingsModel {
  /** Key Vault Resource Id. */
  readonly keyVaultResourceId?: string;
  /** Storage Account Resource Id. */
  readonly storageAccountResourceId?: string;
  /** Log Analytics Resource Ids. */
  readonly logAnalyticsResourceIdCollection?: string[];
  /** Diagnostic Destination. */
  diagnosticDestination?: DiagnosticDestination;
}

export function enclaveDefaultSettingsModelSerializer(item: EnclaveDefaultSettingsModel): any {
  return { diagnosticDestination: item["diagnosticDestination"] };
}

export function enclaveDefaultSettingsModelDeserializer(item: any): EnclaveDefaultSettingsModel {
  return {
    keyVaultResourceId: item["keyVaultResourceId"],
    storageAccountResourceId: item["storageAccountResourceId"],
    logAnalyticsResourceIdCollection: !item["logAnalyticsResourceIdCollection"]
      ? item["logAnalyticsResourceIdCollection"]
      : item["logAnalyticsResourceIdCollection"].map((p: any) => {
          return p;
        }),
    diagnosticDestination: item["diagnosticDestination"],
  };
}

/** Specifies the destination of where to store diagnostic logs. */
export enum KnownDiagnosticDestination {
  /** DiagnosticDestination Type CommunityOnly */
  CommunityOnly = "CommunityOnly",
  /** DiagnosticDestination Type EnclaveOnly */
  EnclaveOnly = "EnclaveOnly",
  /** DiagnosticDestination Type Both */
  Both = "Both",
}

/**
 * Specifies the destination of where to store diagnostic logs. \
 * {@link KnownDiagnosticDestination} can be used interchangeably with DiagnosticDestination,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CommunityOnly**: DiagnosticDestination Type CommunityOnly \
 * **EnclaveOnly**: DiagnosticDestination Type EnclaveOnly \
 * **Both**: DiagnosticDestination Type Both
 */
export type DiagnosticDestination = string;

/** Maintenance Mode */
export interface MaintenanceModeConfigurationModel {
  /** Current mode of Maintenance Mode Configuration */
  mode: string;
  /** The user, group or service principal object affected by Maintenance Mode */
  principals?: Principal[];
  /** Justification for entering or exiting Maintenance Mode */
  justification?: string;
}

export function maintenanceModeConfigurationModelSerializer(
  item: MaintenanceModeConfigurationModel,
): any {
  return {
    mode: item["mode"],
    principals: !item["principals"]
      ? item["principals"]
      : principalArraySerializer(item["principals"]),
    justification: item["justification"],
  };
}

export function maintenanceModeConfigurationModelDeserializer(
  item: any,
): MaintenanceModeConfigurationModel {
  return {
    mode: item["mode"],
    principals: !item["principals"]
      ? item["principals"]
      : principalArrayDeserializer(item["principals"]),
    justification: item["justification"],
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

/** Virtual Enclave Patch Model */
export interface VirtualEnclavePatchModel {
  /** Virtual Enclave Patch properties */
  properties?: VirtualEnclavePatchProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function virtualEnclavePatchModelSerializer(item: VirtualEnclavePatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualEnclavePatchPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** Virtual Enclave Patchable Properties */
export interface VirtualEnclavePatchProperties {
  /** Virtual Network. */
  enclaveVirtualNetwork: EnclaveVirtualNetworkModel;
  /** Deploy Bastion service (True or False). */
  bastionEnabled?: boolean;
  /** Enclave role assignments */
  enclaveRoleAssignments?: RoleAssignmentItem[];
  /** Workload role assignments */
  workloadRoleAssignments?: RoleAssignmentItem[];
  /** Enclave specific policies */
  governedServiceList?: GovernedServiceItem[];
  /** Enclave default settings. */
  enclaveDefaultSettings?: EnclaveDefaultSettingsPatchModel;
  /** Maintenance Mode configuration. */
  maintenanceModeConfiguration?: MaintenanceModeConfigurationPatchModel;
}

export function virtualEnclavePatchPropertiesSerializer(item: VirtualEnclavePatchProperties): any {
  return {
    enclaveVirtualNetwork: enclaveVirtualNetworkModelSerializer(item["enclaveVirtualNetwork"]),
    bastionEnabled: item["bastionEnabled"],
    enclaveRoleAssignments: !item["enclaveRoleAssignments"]
      ? item["enclaveRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["enclaveRoleAssignments"]),
    workloadRoleAssignments: !item["workloadRoleAssignments"]
      ? item["workloadRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["workloadRoleAssignments"]),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArraySerializer(item["governedServiceList"]),
    enclaveDefaultSettings: !item["enclaveDefaultSettings"]
      ? item["enclaveDefaultSettings"]
      : enclaveDefaultSettingsPatchModelSerializer(item["enclaveDefaultSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationPatchModelSerializer(item["maintenanceModeConfiguration"]),
  };
}

/** Virtual Enclave Default Settings */
export interface EnclaveDefaultSettingsPatchModel {
  /** Diagnostic Destination. */
  diagnosticDestination?: DiagnosticDestination;
}

export function enclaveDefaultSettingsPatchModelSerializer(
  item: EnclaveDefaultSettingsPatchModel,
): any {
  return { diagnosticDestination: item["diagnosticDestination"] };
}

/** Maintenance Mode Patch Model */
export interface MaintenanceModeConfigurationPatchModel {
  /** Current mode of Maintenance Mode Configuration */
  mode: string;
  /** The user, group or service principal object affected by Maintenance Mode */
  principals?: Principal[];
  /** Justification for entering or exiting Maintenance Mode */
  justification?: string;
}

export function maintenanceModeConfigurationPatchModelSerializer(
  item: MaintenanceModeConfigurationPatchModel,
): any {
  return {
    mode: item["mode"],
    principals: !item["principals"]
      ? item["principals"]
      : principalArraySerializer(item["principals"]),
    justification: item["justification"],
  };
}

/** The response of a EnclaveResource list operation. */
export interface _EnclaveResourceListResult {
  /** The EnclaveResource items on this page */
  value: EnclaveResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enclaveResourceListResultDeserializer(item: any): _EnclaveResourceListResult {
  return {
    value: enclaveResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enclaveResourceArraySerializer(result: Array<EnclaveResource>): any[] {
  return result.map((item) => {
    return enclaveResourceSerializer(item);
  });
}

export function enclaveResourceArrayDeserializer(result: Array<EnclaveResource>): any[] {
  return result.map((item) => {
    return enclaveResourceDeserializer(item);
  });
}

/** Request body for calling post-action */
export interface ApprovalCallbackRequest {
  /** Resource request action indicating action which needed to be performed upon calling approval-callback post action */
  resourceRequestAction: string;
  /** Approval status indicating 'Approved' or 'Rejected' */
  approvalStatus: string;
  /** Payload requested by client upon approval action */
  approvalCallbackPayload?: string;
}

export function approvalCallbackRequestSerializer(item: ApprovalCallbackRequest): any {
  return {
    resourceRequestAction: item["resourceRequestAction"],
    approvalStatus: item["approvalStatus"],
    approvalCallbackPayload: item["approvalCallbackPayload"],
  };
}

/** Response body after handling of approvalCallbackRequest */
export interface ApprovalActionResponse {
  /** Confirmation message indicating the result of the operation. */
  message: string;
}

export function approvalActionResponseDeserializer(item: any): ApprovalActionResponse {
  return {
    message: item["message"],
  };
}

/** Request body for calling post-action */
export interface ApprovalDeletionCallbackRequest {
  /** Resource request action indicating action which needed to be performed upon calling approval-deletion-callback post action */
  resourceRequestAction: string;
}

export function approvalDeletionCallbackRequestSerializer(
  item: ApprovalDeletionCallbackRequest,
): any {
  return { resourceRequestAction: item["resourceRequestAction"] };
}

/** Community Model Resource */
export interface CommunityResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CommunityProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function communityResourceSerializer(item: CommunityResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : communityPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function communityResourceDeserializer(item: any): CommunityResource {
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
      : communityPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Community Resource Properties */
export interface CommunityProperties {
  /** Address Space. */
  addressSpace?: string;
  /** DNS Servers. */
  dnsServers?: string[];
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
  /** List of resource ids created by communities. */
  readonly resourceCollection?: string[];
  /** Managed resource group name. */
  readonly managedResourceGroupName?: string;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** List of services governed by a community. */
  governedServiceList?: GovernedServiceItem[];
  /** Policy override setting for the community. Specifies whether to apply enclave-specific policies or disable policy enforcement. */
  policyOverride?: string;
  /** Community role assignments */
  communityRoleAssignments?: RoleAssignmentItem[];
  /** SKU of the community's Azure Firewall (Basic, Standard, Premium). Standard is the default */
  firewallSku?: FirewallSKU;
  /** Approval requirements for various actions on the community's resources. */
  approvalSettings?: ApprovalSettings;
  /** Maintenance Mode configuration. */
  maintenanceModeConfiguration?: MaintenanceModeConfigurationModel;
}

export function communityPropertiesSerializer(item: CommunityProperties): any {
  return {
    addressSpace: item["addressSpace"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArraySerializer(item["governedServiceList"]),
    policyOverride: item["policyOverride"],
    communityRoleAssignments: !item["communityRoleAssignments"]
      ? item["communityRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["communityRoleAssignments"]),
    firewallSku: item["firewallSku"],
    approvalSettings: !item["approvalSettings"]
      ? item["approvalSettings"]
      : approvalSettingsSerializer(item["approvalSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationModelSerializer(item["maintenanceModeConfiguration"]),
  };
}

export function communityPropertiesDeserializer(item: any): CommunityProperties {
  return {
    addressSpace: item["addressSpace"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
    managedResourceGroupName: item["managedResourceGroupName"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArrayDeserializer(item["governedServiceList"]),
    policyOverride: item["policyOverride"],
    communityRoleAssignments: !item["communityRoleAssignments"]
      ? item["communityRoleAssignments"]
      : roleAssignmentItemArrayDeserializer(item["communityRoleAssignments"]),
    firewallSku: item["firewallSku"],
    approvalSettings: !item["approvalSettings"]
      ? item["approvalSettings"]
      : approvalSettingsDeserializer(item["approvalSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationModelDeserializer(item["maintenanceModeConfiguration"]),
  };
}

/** Azure Firewall SKU */
export enum KnownFirewallSKU {
  /** FirewallSKU Basic */
  Basic = "Basic",
  /** FirwallSKU Standard */
  Standard = "Standard",
  /** FirewallSKU Premium */
  Premium = "Premium",
}

/**
 * Azure Firewall SKU \
 * {@link KnownFirewallSKU} can be used interchangeably with FirewallSKU,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: FirewallSKU Basic \
 * **Standard**: FirwallSKU Standard \
 * **Premium**: FirewallSKU Premium
 */
export type FirewallSKU = string;

/** ApprovalSettings Properties */
export interface ApprovalSettings {
  /** Approval required for endpoint creation (Required or NotRequired). */
  endpointCreation?: ApprovalPolicy;
  /** Approval required for endpoint update (Required or NotRequired). */
  endpointUpdate?: ApprovalPolicy;
  /** Approval required for endpoint deletion (Required or NotRequired). */
  endpointDeletion?: ApprovalPolicy;
  /** Approval required for enclave connection creation (Required or NotRequired). */
  connectionCreation?: ApprovalPolicy;
  /** Approval required for enclave connection update (Required or NotRequired). */
  connectionUpdate?: ApprovalPolicy;
  /** Approval required for enclave connection deletion (Required or NotRequired). */
  connectionDeletion?: ApprovalPolicy;
  /** Approval required for virtual enclave creation (Required or NotRequired). */
  enclaveCreation?: ApprovalPolicy;
  /** Approval required for virtual enclave deletion (Required or NotRequired). */
  enclaveDeletion?: ApprovalPolicy;
  /** Approval required for toggling maintenance mode (Required or NotRequired). */
  maintenanceMode?: ApprovalPolicy;
  /** Approval required for deploying service catalog templates (Required or NotRequired). */
  serviceCatalogDeployment?: ApprovalPolicy;
  /** Notification will be sent on creation of an Approval Request */
  notificationOnApprovalCreation?: ApprovalPolicy;
  /** Notification will be sent on any action taken (Approve/Reject) on an Approval Request */
  notificationOnApprovalAction?: ApprovalPolicy;
  /** Notification will be sent on deletion of an Approval Request */
  notificationOnApprovalDeletion?: ApprovalPolicy;
  /** List of mandatory approvers for the approval request */
  mandatoryApprovers?: MandatoryApprover[];
  /** Minimum number of approvers required for the approval request */
  minimumApproversRequired?: number;
}

export function approvalSettingsSerializer(item: ApprovalSettings): any {
  return {
    endpointCreation: item["endpointCreation"],
    endpointUpdate: item["endpointUpdate"],
    endpointDeletion: item["endpointDeletion"],
    connectionCreation: item["connectionCreation"],
    connectionUpdate: item["connectionUpdate"],
    connectionDeletion: item["connectionDeletion"],
    enclaveCreation: item["enclaveCreation"],
    enclaveDeletion: item["enclaveDeletion"],
    maintenanceMode: item["maintenanceMode"],
    serviceCatalogDeployment: item["serviceCatalogDeployment"],
    notificationOnApprovalCreation: item["notificationOnApprovalCreation"],
    notificationOnApprovalAction: item["notificationOnApprovalAction"],
    notificationOnApprovalDeletion: item["notificationOnApprovalDeletion"],
    mandatoryApprovers: !item["mandatoryApprovers"]
      ? item["mandatoryApprovers"]
      : mandatoryApproverArraySerializer(item["mandatoryApprovers"]),
    minimumApproversRequired: item["minimumApproversRequired"],
  };
}

export function approvalSettingsDeserializer(item: any): ApprovalSettings {
  return {
    endpointCreation: item["endpointCreation"],
    endpointUpdate: item["endpointUpdate"],
    endpointDeletion: item["endpointDeletion"],
    connectionCreation: item["connectionCreation"],
    connectionUpdate: item["connectionUpdate"],
    connectionDeletion: item["connectionDeletion"],
    enclaveCreation: item["enclaveCreation"],
    enclaveDeletion: item["enclaveDeletion"],
    maintenanceMode: item["maintenanceMode"],
    serviceCatalogDeployment: item["serviceCatalogDeployment"],
    notificationOnApprovalCreation: item["notificationOnApprovalCreation"],
    notificationOnApprovalAction: item["notificationOnApprovalAction"],
    notificationOnApprovalDeletion: item["notificationOnApprovalDeletion"],
    mandatoryApprovers: !item["mandatoryApprovers"]
      ? item["mandatoryApprovers"]
      : mandatoryApproverArrayDeserializer(item["mandatoryApprovers"]),
    minimumApproversRequired: item["minimumApproversRequired"],
  };
}

/** Approval Policy. */
export enum KnownApprovalPolicy {
  /** Approval will be required for the specified action. */
  Required = "Required",
  /** Approval will not be required for the specified action. */
  NotRequired = "NotRequired",
}

/**
 * Approval Policy. \
 * {@link KnownApprovalPolicy} can be used interchangeably with ApprovalPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required**: Approval will be required for the specified action. \
 * **NotRequired**: Approval will not be required for the specified action.
 */
export type ApprovalPolicy = string;

export function mandatoryApproverArraySerializer(result: Array<MandatoryApprover>): any[] {
  return result.map((item) => {
    return mandatoryApproverSerializer(item);
  });
}

export function mandatoryApproverArrayDeserializer(result: Array<MandatoryApprover>): any[] {
  return result.map((item) => {
    return mandatoryApproverDeserializer(item);
  });
}

/** Approver Metadata for approvals request. */
export interface MandatoryApprover {
  /** EntraId of the approver */
  approverEntraId: string;
}

export function mandatoryApproverSerializer(item: MandatoryApprover): any {
  return { approverEntraId: item["approverEntraId"] };
}

export function mandatoryApproverDeserializer(item: any): MandatoryApprover {
  return {
    approverEntraId: item["approverEntraId"],
  };
}

/** Community Patch Resource */
export interface CommunityPatchModel {
  /** Community Patch properties */
  properties?: CommunityPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function communityPatchModelSerializer(item: CommunityPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : communityPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Community Resource Properties without default values */
export interface CommunityPatchProperties {
  /** DNS Servers. */
  dnsServers?: string[];
  /** List of services governed by a community. */
  governedServiceList?: GovernedServiceItem[];
  /** Policy override setting for the community. Specifies whether to apply enclave-specific policies or disable policy enforcement. */
  policyOverride?: string;
  /** Community role assignments */
  communityRoleAssignments?: RoleAssignmentItem[];
  /** SKU of the community's Azure Firewall (Basic, Standard, Premium). Standard is the default */
  firewallSku?: FirewallSKU;
  /** Approval requirements for various actions on the community's resources. */
  approvalSettings?: ApprovalSettingsPatchProperties;
  /** Maintenance Mode configuration. */
  maintenanceModeConfiguration?: MaintenanceModeConfigurationPatchModel;
}

export function communityPatchPropertiesSerializer(item: CommunityPatchProperties): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    governedServiceList: !item["governedServiceList"]
      ? item["governedServiceList"]
      : governedServiceItemArraySerializer(item["governedServiceList"]),
    policyOverride: item["policyOverride"],
    communityRoleAssignments: !item["communityRoleAssignments"]
      ? item["communityRoleAssignments"]
      : roleAssignmentItemArraySerializer(item["communityRoleAssignments"]),
    firewallSku: item["firewallSku"],
    approvalSettings: !item["approvalSettings"]
      ? item["approvalSettings"]
      : approvalSettingsPatchPropertiesSerializer(item["approvalSettings"]),
    maintenanceModeConfiguration: !item["maintenanceModeConfiguration"]
      ? item["maintenanceModeConfiguration"]
      : maintenanceModeConfigurationPatchModelSerializer(item["maintenanceModeConfiguration"]),
  };
}

/** ApprovalSettings Properties */
export interface ApprovalSettingsPatchProperties {
  /** List of mandatory approvers for the approval request */
  mandatoryApprovers?: MandatoryApprover[];
}

export function approvalSettingsPatchPropertiesSerializer(
  item: ApprovalSettingsPatchProperties,
): any {
  return {
    mandatoryApprovers: !item["mandatoryApprovers"]
      ? item["mandatoryApprovers"]
      : mandatoryApproverArraySerializer(item["mandatoryApprovers"]),
  };
}

/** The response of a CommunityResource list operation. */
export interface _CommunityResourceListResult {
  /** The CommunityResource items on this page */
  value: CommunityResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _communityResourceListResultDeserializer(item: any): _CommunityResourceListResult {
  return {
    value: communityResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communityResourceArraySerializer(result: Array<CommunityResource>): any[] {
  return result.map((item) => {
    return communityResourceSerializer(item);
  });
}

export function communityResourceArrayDeserializer(result: Array<CommunityResource>): any[] {
  return result.map((item) => {
    return communityResourceDeserializer(item);
  });
}

/** Request to the action call to check address space availability. */
export interface CheckAddressSpaceAvailabilityRequest {
  /** Resource Id of the Community */
  communityResourceId: string;
  /** Information about the enclave virtual network */
  enclaveVirtualNetwork: EnclaveVirtualNetworkModel;
}

export function checkAddressSpaceAvailabilityRequestSerializer(
  item: CheckAddressSpaceAvailabilityRequest,
): any {
  return {
    communityResourceId: item["communityResourceId"],
    enclaveVirtualNetwork: enclaveVirtualNetworkModelSerializer(item["enclaveVirtualNetwork"]),
  };
}

/** Response of availability of the requested address space. */
export interface CheckAddressSpaceAvailabilityResponse {
  /** Boolean representing whether the address space is available. */
  value: boolean;
}

export function checkAddressSpaceAvailabilityResponseDeserializer(
  item: any,
): CheckAddressSpaceAvailabilityResponse {
  return {
    value: item["value"],
  };
}

/** TransitHub Model Resource */
export interface TransitHubResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: TransitHubProperties;
}

export function transitHubResourceSerializer(item: TransitHubResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : transitHubPropertiesSerializer(item["properties"]),
  };
}

export function transitHubResourceDeserializer(item: any): TransitHubResource {
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
      : transitHubPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of an Transit Hub. */
export interface TransitHubProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The state of the transitHub. */
  state?: TransitHubState;
  /** The TransitOption of the transitHub. */
  transitOption?: TransitOption;
  /** List of resource ids modified by transitHubs. */
  readonly resourceCollection?: string[];
}

export function transitHubPropertiesSerializer(item: TransitHubProperties): any {
  return {
    state: item["state"],
    transitOption: !item["transitOption"]
      ? item["transitOption"]
      : transitOptionSerializer(item["transitOption"]),
  };
}

export function transitHubPropertiesDeserializer(item: any): TransitHubProperties {
  return {
    provisioningState: item["provisioningState"],
    state: item["state"],
    transitOption: !item["transitOption"]
      ? item["transitOption"]
      : transitOptionDeserializer(item["transitOption"]),
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the state of the transitHub. */
export enum KnownTransitHubState {
  /** TransitHubState Type PendingApproval */
  PendingApproval = "PendingApproval",
  /** TransitHubState Type Approved */
  Approved = "Approved",
  /** TransitHubState Type PendingUpdate */
  PendingUpdate = "PendingUpdate",
  /** TransitHubState Type Active */
  Active = "Active",
  /** TransitHubState Type Failed */
  Failed = "Failed",
}

/**
 * Specifies the state of the transitHub. \
 * {@link KnownTransitHubState} can be used interchangeably with TransitHubState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingApproval**: TransitHubState Type PendingApproval \
 * **Approved**: TransitHubState Type Approved \
 * **PendingUpdate**: TransitHubState Type PendingUpdate \
 * **Active**: TransitHubState Type Active \
 * **Failed**: TransitHubState Type Failed
 */
export type TransitHubState = string;

/** TransitOption Properties */
export interface TransitOption {
  /** Transit Option Type. */
  type?: TransitOptionType;
  /** Transit Option Params */
  params?: TransitOptionParams;
}

export function transitOptionSerializer(item: TransitOption): any {
  return {
    type: item["type"],
    params: !item["params"] ? item["params"] : transitOptionParamsSerializer(item["params"]),
  };
}

export function transitOptionDeserializer(item: any): TransitOption {
  return {
    type: item["type"],
    params: !item["params"] ? item["params"] : transitOptionParamsDeserializer(item["params"]),
  };
}

/** Specifies the type of the transitOption. */
export enum KnownTransitOptionType {
  /** TransitOptionType ExpressRoute */
  ExpressRoute = "ExpressRoute",
  /** TransitOptionType Gateway */
  Gateway = "Gateway",
  /** TransitOptionType Peering */
  Peering = "Peering",
}

/**
 * Specifies the type of the transitOption. \
 * {@link KnownTransitOptionType} can be used interchangeably with TransitOptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExpressRoute**: TransitOptionType ExpressRoute \
 * **Gateway**: TransitOptionType Gateway \
 * **Peering**: TransitOptionType Peering
 */
export type TransitOptionType = string;

/** TransitOptionParams Properties */
export interface TransitOptionParams {
  /** Transit Option Params scaleUnits. */
  scaleUnits?: number;
  /** Transit Option Params remoteVirtualNetworkId. */
  remoteVirtualNetworkId?: string;
}

export function transitOptionParamsSerializer(item: TransitOptionParams): any {
  return {
    scaleUnits: item["scaleUnits"],
    remoteVirtualNetworkId: item["remoteVirtualNetworkId"],
  };
}

export function transitOptionParamsDeserializer(item: any): TransitOptionParams {
  return {
    scaleUnits: item["scaleUnits"],
    remoteVirtualNetworkId: item["remoteVirtualNetworkId"],
  };
}

/** TH Patch Resource */
export interface TransitHubPatchModel {
  /** The TransitHub resource. */
  properties?: TransitHubPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function transitHubPatchModelSerializer(item: TransitHubPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : transitHubPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Transit Hub patchable Properties */
export interface TransitHubPatchProperties {
  /** The state of the transitHub. */
  state?: TransitHubState;
  /** The TransitOption of the transitHub. */
  transitOption?: TransitOption;
}

export function transitHubPatchPropertiesSerializer(item: TransitHubPatchProperties): any {
  return {
    state: item["state"],
    transitOption: !item["transitOption"]
      ? item["transitOption"]
      : transitOptionSerializer(item["transitOption"]),
  };
}

/** The response of a TransitHubResource list operation. */
export interface _TransitHubResourceListResult {
  /** The TransitHubResource items on this page */
  value: TransitHubResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _transitHubResourceListResultDeserializer(
  item: any,
): _TransitHubResourceListResult {
  return {
    value: transitHubResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function transitHubResourceArraySerializer(result: Array<TransitHubResource>): any[] {
  return result.map((item) => {
    return transitHubResourceSerializer(item);
  });
}

export function transitHubResourceArrayDeserializer(result: Array<TransitHubResource>): any[] {
  return result.map((item) => {
    return transitHubResourceDeserializer(item);
  });
}

/** EnclaveConnection Model Resource */
export interface EnclaveConnectionResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EnclaveConnectionProperties;
}

export function enclaveConnectionResourceSerializer(item: EnclaveConnectionResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : enclaveConnectionPropertiesSerializer(item["properties"]),
  };
}

export function enclaveConnectionResourceDeserializer(item: any): EnclaveConnectionResource {
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
      : enclaveConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Enclave Connection Resource properties */
export interface EnclaveConnectionProperties {
  /** The state of the enclaveConnection. */
  readonly state?: EnclaveConnectionState;
  /** Community Resource Id. */
  communityResourceId: string;
  /** Source Resource Id. */
  sourceResourceId: string;
  /** Source CIDR. */
  sourceCidr?: string;
  /** Destination Endpoint Resource Id. */
  destinationEndpointId: string;
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
  /** List of resource ids modified by enclave Connections. */
  readonly resourceCollection?: string[];
}

export function enclaveConnectionPropertiesSerializer(item: EnclaveConnectionProperties): any {
  return {
    communityResourceId: item["communityResourceId"],
    sourceResourceId: item["sourceResourceId"],
    sourceCidr: item["sourceCidr"],
    destinationEndpointId: item["destinationEndpointId"],
  };
}

export function enclaveConnectionPropertiesDeserializer(item: any): EnclaveConnectionProperties {
  return {
    state: item["state"],
    communityResourceId: item["communityResourceId"],
    sourceResourceId: item["sourceResourceId"],
    sourceCidr: item["sourceCidr"],
    destinationEndpointId: item["destinationEndpointId"],
    provisioningState: item["provisioningState"],
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the state of the enclave connection. */
export enum KnownEnclaveConnectionState {
  /** EnclaveConnectionState Type Pending Approval */
  PendingApproval = "PendingApproval",
  /** EnclaveConnectionState Type Pending Update */
  PendingUpdate = "PendingUpdate",
  /** EnclaveConnectionState Type Approved */
  Approved = "Approved",
  /** EnclaveConnectionState Type Active */
  Active = "Active",
  /** EnclaveConnectionState Type Failed */
  Failed = "Failed",
  /** EnclaveConnectionState Type Connected */
  Connected = "Connected",
  /** EnclaveConnectionState Type Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Specifies the state of the enclave connection. \
 * {@link KnownEnclaveConnectionState} can be used interchangeably with EnclaveConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingApproval**: EnclaveConnectionState Type Pending Approval \
 * **PendingUpdate**: EnclaveConnectionState Type Pending Update \
 * **Approved**: EnclaveConnectionState Type Approved \
 * **Active**: EnclaveConnectionState Type Active \
 * **Failed**: EnclaveConnectionState Type Failed \
 * **Connected**: EnclaveConnectionState Type Connected \
 * **Disconnected**: EnclaveConnectionState Type Disconnected
 */
export type EnclaveConnectionState = string;

/** Enclave Connection Patch Resource */
export interface EnclaveConnectionPatchModel {
  /** Enclave Connection Patch properties */
  properties?: EnclaveConnectionPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function enclaveConnectionPatchModelSerializer(item: EnclaveConnectionPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : enclaveConnectionPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Enclave Connection patchable Properties */
export interface EnclaveConnectionPatchProperties {
  /** Source CIDR. */
  sourceCidr?: string;
}

export function enclaveConnectionPatchPropertiesSerializer(
  item: EnclaveConnectionPatchProperties,
): any {
  return { sourceCidr: item["sourceCidr"] };
}

/** The response of a EnclaveConnectionResource list operation. */
export interface _EnclaveConnectionResourceListResult {
  /** The EnclaveConnectionResource items on this page */
  value: EnclaveConnectionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enclaveConnectionResourceListResultDeserializer(
  item: any,
): _EnclaveConnectionResourceListResult {
  return {
    value: enclaveConnectionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enclaveConnectionResourceArraySerializer(
  result: Array<EnclaveConnectionResource>,
): any[] {
  return result.map((item) => {
    return enclaveConnectionResourceSerializer(item);
  });
}

export function enclaveConnectionResourceArrayDeserializer(
  result: Array<EnclaveConnectionResource>,
): any[] {
  return result.map((item) => {
    return enclaveConnectionResourceDeserializer(item);
  });
}

/** EnclaveEndpoint Model Resource */
export interface EnclaveEndpointResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EnclaveEndpointProperties;
}

export function enclaveEndpointResourceSerializer(item: EnclaveEndpointResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : enclaveEndpointPropertiesSerializer(item["properties"]),
  };
}

export function enclaveEndpointResourceDeserializer(item: any): EnclaveEndpointResource {
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
      : enclaveEndpointPropertiesDeserializer(item["properties"]),
  };
}

/** Enclave Endpoint Resource properties */
export interface EnclaveEndpointProperties {
  /** Enclave Endpoint Rule Collection. */
  ruleCollection: EnclaveEndpointDestinationRule[];
  /** List of resource ids created by community endpoint. */
  readonly resourceCollection?: string[];
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
}

export function enclaveEndpointPropertiesSerializer(item: EnclaveEndpointProperties): any {
  return {
    ruleCollection: enclaveEndpointDestinationRuleArraySerializer(item["ruleCollection"]),
  };
}

export function enclaveEndpointPropertiesDeserializer(item: any): EnclaveEndpointProperties {
  return {
    ruleCollection: enclaveEndpointDestinationRuleArrayDeserializer(item["ruleCollection"]),
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function enclaveEndpointDestinationRuleArraySerializer(
  result: Array<EnclaveEndpointDestinationRule>,
): any[] {
  return result.map((item) => {
    return enclaveEndpointDestinationRuleSerializer(item);
  });
}

export function enclaveEndpointDestinationRuleArrayDeserializer(
  result: Array<EnclaveEndpointDestinationRule>,
): any[] {
  return result.map((item) => {
    return enclaveEndpointDestinationRuleDeserializer(item);
  });
}

/** Enclave Endpoint Rule Properties */
export interface EnclaveEndpointDestinationRule {
  /** Protocols. Options specified by Endpoint Protocol Enum. */
  protocols?: EnclaveEndpointProtocol[];
  /** Endpoint Rule Name. */
  endpointRuleName?: string;
  /** Destination address. Can include multiple CIDR/IP Addresses or fqdn tags or fqdns (for community endpoint) separated by commas. */
  destination?: string;
  /** Port. Can include multiple ports separated by commas or a range indicated by a hyphen. */
  ports?: string;
}

export function enclaveEndpointDestinationRuleSerializer(
  item: EnclaveEndpointDestinationRule,
): any {
  return {
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    endpointRuleName: item["endpointRuleName"],
    destination: item["destination"],
    ports: item["ports"],
  };
}

export function enclaveEndpointDestinationRuleDeserializer(
  item: any,
): EnclaveEndpointDestinationRule {
  return {
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    endpointRuleName: item["endpointRuleName"],
    destination: item["destination"],
    ports: item["ports"],
  };
}

/** Enclave Endpoint Protocol Enum */
export enum KnownEnclaveEndpointProtocol {
  /** EndpointProtocol Type ANY */
  ANY = "ANY",
  /** EndpointProtocol Type TCP */
  TCP = "TCP",
  /** EndpointProtocol Type UDP */
  UDP = "UDP",
  /** EndpointProtocol Type ICMP */
  Icmp = "ICMP",
  /** EndpointProtocol Type ESP */
  ESP = "ESP",
  /** EndpointProtocol Type AH */
  AH = "AH",
}

/**
 * Enclave Endpoint Protocol Enum \
 * {@link KnownEnclaveEndpointProtocol} can be used interchangeably with EnclaveEndpointProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ANY**: EndpointProtocol Type ANY \
 * **TCP**: EndpointProtocol Type TCP \
 * **UDP**: EndpointProtocol Type UDP \
 * **ICMP**: EndpointProtocol Type ICMP \
 * **ESP**: EndpointProtocol Type ESP \
 * **AH**: EndpointProtocol Type AH
 */
export type EnclaveEndpointProtocol = string;

/** Enclave Endpoint Patch Resource */
export interface EnclaveEndpointPatchModel {
  /** Enclave Endpoint Patch properties */
  properties?: EnclaveEndpointPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function enclaveEndpointPatchModelSerializer(item: EnclaveEndpointPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : enclaveEndpointPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Enclave Endpoint patchable Properties */
export interface EnclaveEndpointPatchProperties {
  /** Enclave Endpoint Rule Collection. */
  ruleCollection: EnclaveEndpointDestinationRule[];
}

export function enclaveEndpointPatchPropertiesSerializer(
  item: EnclaveEndpointPatchProperties,
): any {
  return {
    ruleCollection: enclaveEndpointDestinationRuleArraySerializer(item["ruleCollection"]),
  };
}

/** The response of a EnclaveEndpointResource list operation. */
export interface _EnclaveEndpointResourceListResult {
  /** The EnclaveEndpointResource items on this page */
  value: EnclaveEndpointResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enclaveEndpointResourceListResultDeserializer(
  item: any,
): _EnclaveEndpointResourceListResult {
  return {
    value: enclaveEndpointResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enclaveEndpointResourceArraySerializer(
  result: Array<EnclaveEndpointResource>,
): any[] {
  return result.map((item) => {
    return enclaveEndpointResourceSerializer(item);
  });
}

export function enclaveEndpointResourceArrayDeserializer(
  result: Array<EnclaveEndpointResource>,
): any[] {
  return result.map((item) => {
    return enclaveEndpointResourceDeserializer(item);
  });
}

/** CommunityEndpoint Model Resource */
export interface CommunityEndpointResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CommunityEndpointProperties;
}

export function communityEndpointResourceSerializer(item: CommunityEndpointResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : communityEndpointPropertiesSerializer(item["properties"]),
  };
}

export function communityEndpointResourceDeserializer(item: any): CommunityEndpointResource {
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
      : communityEndpointPropertiesDeserializer(item["properties"]),
  };
}

/** Community Endpoint Resource properties */
export interface CommunityEndpointProperties {
  /** Community Endpoint Rule Collection. */
  ruleCollection: CommunityEndpointDestinationRule[];
  /** List of resource ids created by community endpoint. */
  readonly resourceCollection?: string[];
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
}

export function communityEndpointPropertiesSerializer(item: CommunityEndpointProperties): any {
  return {
    ruleCollection: communityEndpointDestinationRuleArraySerializer(item["ruleCollection"]),
  };
}

export function communityEndpointPropertiesDeserializer(item: any): CommunityEndpointProperties {
  return {
    ruleCollection: communityEndpointDestinationRuleArrayDeserializer(item["ruleCollection"]),
    resourceCollection: !item["resourceCollection"]
      ? item["resourceCollection"]
      : item["resourceCollection"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

export function communityEndpointDestinationRuleArraySerializer(
  result: Array<CommunityEndpointDestinationRule>,
): any[] {
  return result.map((item) => {
    return communityEndpointDestinationRuleSerializer(item);
  });
}

export function communityEndpointDestinationRuleArrayDeserializer(
  result: Array<CommunityEndpointDestinationRule>,
): any[] {
  return result.map((item) => {
    return communityEndpointDestinationRuleDeserializer(item);
  });
}

/** Base type for destination rules. */
export interface CommunityEndpointDestinationRule {
  /** Destination Type. */
  destinationType?: DestinationType;
  /** Protocols. Options specified by Endpoint Protocol Enum. */
  protocols?: CommunityEndpointProtocol[];
  /** Transit Hub Resource Id. */
  transitHubResourceId?: string;
  /** Endpoint Rule Name. */
  endpointRuleName?: string;
  /** Destination address. Can include multiple CIDR/IP Addresses or fqdn tags or fqdns (for community endpoint) separated by commas. */
  destination?: string;
  /** Port. Can include multiple ports separated by commas or a range indicated by a hyphen. */
  ports?: string;
}

export function communityEndpointDestinationRuleSerializer(
  item: CommunityEndpointDestinationRule,
): any {
  return {
    destinationType: item["destinationType"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    transitHubResourceId: item["transitHubResourceId"],
    endpointRuleName: item["endpointRuleName"],
    destination: item["destination"],
    ports: item["ports"],
  };
}

export function communityEndpointDestinationRuleDeserializer(
  item: any,
): CommunityEndpointDestinationRule {
  return {
    destinationType: item["destinationType"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    transitHubResourceId: item["transitHubResourceId"],
    endpointRuleName: item["endpointRuleName"],
    destination: item["destination"],
    ports: item["ports"],
  };
}

/** Destination Type Enum */
export enum KnownDestinationType {
  /** DestinationType Type FQDN */
  Fqdn = "FQDN",
  /** DestinationType Type FQDNTag */
  FqdnTag = "FQDNTag",
  /** DestinationType Type IPAddress */
  IPAddress = "IPAddress",
  /** DestinationType Type PrivateNetwork */
  PrivateNetwork = "PrivateNetwork",
}

/**
 * Destination Type Enum \
 * {@link KnownDestinationType} can be used interchangeably with DestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FQDN**: DestinationType Type FQDN \
 * **FQDNTag**: DestinationType Type FQDNTag \
 * **IPAddress**: DestinationType Type IPAddress \
 * **PrivateNetwork**: DestinationType Type PrivateNetwork
 */
export type DestinationType = string;

/** Community Endpoint Protocol Enum */
export enum KnownCommunityEndpointProtocol {
  /** CommunityEndpointProtocol Type ANY */
  ANY = "ANY",
  /** CommunityEndpointProtocol Type TCP */
  TCP = "TCP",
  /** CommunityEndpointProtocol Type UDP */
  UDP = "UDP",
  /** CommunityEndpointProtocol Type ICMP */
  Icmp = "ICMP",
  /** CommunityEndpointProtocol Type ESP */
  ESP = "ESP",
  /** CommunityEndpointProtocol Type AH */
  AH = "AH",
  /** CommunityEndpointProtocol Type HTTPS */
  Https = "HTTPS",
  /** CommunityEndpointProtocol Type HTTP */
  Http = "HTTP",
}

/**
 * Community Endpoint Protocol Enum \
 * {@link KnownCommunityEndpointProtocol} can be used interchangeably with CommunityEndpointProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ANY**: CommunityEndpointProtocol Type ANY \
 * **TCP**: CommunityEndpointProtocol Type TCP \
 * **UDP**: CommunityEndpointProtocol Type UDP \
 * **ICMP**: CommunityEndpointProtocol Type ICMP \
 * **ESP**: CommunityEndpointProtocol Type ESP \
 * **AH**: CommunityEndpointProtocol Type AH \
 * **HTTPS**: CommunityEndpointProtocol Type HTTPS \
 * **HTTP**: CommunityEndpointProtocol Type HTTP
 */
export type CommunityEndpointProtocol = string;

/** Community Endpoint Patch Resource */
export interface CommunityEndpointPatchModel {
  /** Community Endpoint Patch properties */
  properties?: CommunityEndpointPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function communityEndpointPatchModelSerializer(item: CommunityEndpointPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : communityEndpointPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Community Endpoint patchable Properties */
export interface CommunityEndpointPatchProperties {
  /** Community Endpoint Rule Collection. */
  ruleCollection: CommunityEndpointDestinationRule[];
}

export function communityEndpointPatchPropertiesSerializer(
  item: CommunityEndpointPatchProperties,
): any {
  return {
    ruleCollection: communityEndpointDestinationRuleArraySerializer(item["ruleCollection"]),
  };
}

/** The response of a CommunityEndpointResource list operation. */
export interface _CommunityEndpointResourceListResult {
  /** The CommunityEndpointResource items on this page */
  value: CommunityEndpointResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _communityEndpointResourceListResultDeserializer(
  item: any,
): _CommunityEndpointResourceListResult {
  return {
    value: communityEndpointResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communityEndpointResourceArraySerializer(
  result: Array<CommunityEndpointResource>,
): any[] {
  return result.map((item) => {
    return communityEndpointResourceSerializer(item);
  });
}

export function communityEndpointResourceArrayDeserializer(
  result: Array<CommunityEndpointResource>,
): any[] {
  return result.map((item) => {
    return communityEndpointResourceDeserializer(item);
  });
}

/** Approval Model Resource */
export interface ApprovalResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ApprovalProperties;
}

export function approvalResourceSerializer(item: ApprovalResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : approvalPropertiesSerializer(item["properties"]),
  };
}

export function approvalResourceDeserializer(item: any): ApprovalResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : approvalPropertiesDeserializer(item["properties"]),
  };
}

/** Approval Base model. */
export interface ApprovalProperties {
  /** Provisioning State. */
  readonly provisioningState?: ProvisioningState;
  /** Parameter for optimizing query results */
  parentResourceId?: string;
  /** Parameter for optimizing query results */
  grandparentResourceId?: string;
  /** List of approvers for the approval request */
  approvers?: Approver[];
  /** Ticket ID for the approval request */
  ticketId?: string;
  /** Approval request creation time */
  createdAt?: Date;
  /** Approval request state change time, time at which approval request state changed from pending to approved or rejected. */
  stateChangedAt?: Date;
  /** Request metadata for the approval request. */
  requestMetadata: RequestMetadata;
}

export function approvalPropertiesSerializer(item: ApprovalProperties): any {
  return {
    parentResourceId: item["parentResourceId"],
    grandparentResourceId: item["grandparentResourceId"],
    approvers: !item["approvers"] ? item["approvers"] : approverArraySerializer(item["approvers"]),
    ticketId: item["ticketId"],
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    stateChangedAt: !item["stateChangedAt"]
      ? item["stateChangedAt"]
      : item["stateChangedAt"].toISOString(),
    requestMetadata: requestMetadataSerializer(item["requestMetadata"]),
  };
}

export function approvalPropertiesDeserializer(item: any): ApprovalProperties {
  return {
    provisioningState: item["provisioningState"],
    parentResourceId: item["parentResourceId"],
    grandparentResourceId: item["grandparentResourceId"],
    approvers: !item["approvers"]
      ? item["approvers"]
      : approverArrayDeserializer(item["approvers"]),
    ticketId: item["ticketId"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    stateChangedAt: !item["stateChangedAt"]
      ? item["stateChangedAt"]
      : new Date(item["stateChangedAt"]),
    requestMetadata: requestMetadataDeserializer(item["requestMetadata"]),
  };
}

export function approverArraySerializer(result: Array<Approver>): any[] {
  return result.map((item) => {
    return approverSerializer(item);
  });
}

export function approverArrayDeserializer(result: Array<Approver>): any[] {
  return result.map((item) => {
    return approverDeserializer(item);
  });
}

/** Approver Metadata for approvals request. */
export interface Approver {
  /** Entra ObjectID of the approver */
  approverEntraId: string;
  /** Action Performed by approver */
  actionPerformed?: ActionPerformed;
  /** approval request last updated at */
  lastUpdatedAt: Date;
}

export function approverSerializer(item: Approver): any {
  return {
    approverEntraId: item["approverEntraId"],
    actionPerformed: item["actionPerformed"],
    lastUpdatedAt: item["lastUpdatedAt"].toISOString(),
  };
}

export function approverDeserializer(item: any): Approver {
  return {
    approverEntraId: item["approverEntraId"],
    actionPerformed: item["actionPerformed"],
    lastUpdatedAt: new Date(item["lastUpdatedAt"]),
  };
}

/** Specifies the action performed by the approver */
export enum KnownActionPerformed {
  /** Action was Approved */
  Approved = "Approved",
  /** Action was Rejected */
  Rejected = "Rejected",
}

/**
 * Specifies the action performed by the approver \
 * {@link KnownActionPerformed} can be used interchangeably with ActionPerformed,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: Action was Approved \
 * **Rejected**: Action was Rejected
 */
export type ActionPerformed = string;

/** Request Metadata for approvals request. */
export interface RequestMetadata {
  /** Resource Action of the item being approved or declined. */
  resourceAction: string;
  /** Route name for the approval callback */
  approvalCallbackRoute?: string;
  /** Payload to be sent upon any action on approval request */
  approvalCallbackPayload?: string;
  /** Status of the approval. Uses ApprovalStatus enum. */
  approvalStatus?: ApprovalStatus;
}

export function requestMetadataSerializer(item: RequestMetadata): any {
  return {
    resourceAction: item["resourceAction"],
    approvalCallbackRoute: item["approvalCallbackRoute"],
    approvalCallbackPayload: item["approvalCallbackPayload"],
    approvalStatus: item["approvalStatus"],
  };
}

export function requestMetadataDeserializer(item: any): RequestMetadata {
  return {
    resourceAction: item["resourceAction"],
    approvalCallbackRoute: item["approvalCallbackRoute"],
    approvalCallbackPayload: item["approvalCallbackPayload"],
    approvalStatus: item["approvalStatus"],
  };
}

/** Approval Status. It can be Approved, Rejected, Pending, Deleted or Expired. */
export enum KnownApprovalStatus {
  /** ApprovalStatus Type Approved */
  Approved = "Approved",
  /** ApprovalStatus Type Rejected */
  Rejected = "Rejected",
  /** ApprovalStatus Type Pending */
  Pending = "Pending",
  /** ApprovalStatus Type Deleted */
  Deleted = "Deleted",
  /** ApprovalStatus Type Expired */
  Expired = "Expired",
}

/**
 * Approval Status. It can be Approved, Rejected, Pending, Deleted or Expired. \
 * {@link KnownApprovalStatus} can be used interchangeably with ApprovalStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: ApprovalStatus Type Approved \
 * **Rejected**: ApprovalStatus Type Rejected \
 * **Pending**: ApprovalStatus Type Pending \
 * **Deleted**: ApprovalStatus Type Deleted \
 * **Expired**: ApprovalStatus Type Expired
 */
export type ApprovalStatus = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a ApprovalResource list operation. */
export interface _ApprovalResourceListResult {
  /** The ApprovalResource items on this page */
  value: ApprovalResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _approvalResourceListResultDeserializer(item: any): _ApprovalResourceListResult {
  return {
    value: approvalResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function approvalResourceArraySerializer(result: Array<ApprovalResource>): any[] {
  return result.map((item) => {
    return approvalResourceSerializer(item);
  });
}

export function approvalResourceArrayDeserializer(result: Array<ApprovalResource>): any[] {
  return result.map((item) => {
    return approvalResourceDeserializer(item);
  });
}

/** Approvals patch model. */
export interface ApprovalPatchModel {
  /** Approval Patch properties */
  properties?: ApprovalPatchProperties;
}

export function approvalPatchModelSerializer(item: ApprovalPatchModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : approvalPatchPropertiesSerializer(item["properties"]),
  };
}

/** Approvals patch properties. */
export interface ApprovalPatchProperties {
  /** Parameter for optimizing query results */
  parentResourceId?: string;
  /** Parameter for optimizing query results */
  grandparentResourceId?: string;
  /** List of approvers for the approval request */
  approvers?: Approver[];
  /** Ticket ID for the approval request */
  ticketId?: string;
  /** Approval request creation time */
  createdAt?: Date;
  /** Approval request state change time, time at which approval request state changed from pending to approved or rejected. */
  stateChangedAt?: Date;
  /** Request metadata for the approval request. */
  requestMetadata: RequestMetadataUpdatableProperties;
}

export function approvalPatchPropertiesSerializer(item: ApprovalPatchProperties): any {
  return {
    parentResourceId: item["parentResourceId"],
    grandparentResourceId: item["grandparentResourceId"],
    approvers: !item["approvers"] ? item["approvers"] : approverArraySerializer(item["approvers"]),
    ticketId: item["ticketId"],
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    stateChangedAt: !item["stateChangedAt"]
      ? item["stateChangedAt"]
      : item["stateChangedAt"].toISOString(),
    requestMetadata: requestMetadataUpdatablePropertiesSerializer(item["requestMetadata"]),
  };
}

/** Request Metadata patch properties. */
export interface RequestMetadataUpdatableProperties {
  /** Resource Action of the item being approved or declined. */
  resourceAction: string;
  /** Route name for the approval callback */
  approvalCallbackRoute?: string;
  /** Payload to be sent upon any action on approval request */
  approvalCallbackPayload?: string;
  /** Status of the approval. Uses ApprovalStatus enum. */
  approvalStatus?: ApprovalStatus;
}

export function requestMetadataUpdatablePropertiesSerializer(
  item: RequestMetadataUpdatableProperties,
): any {
  return {
    resourceAction: item["resourceAction"],
    approvalCallbackRoute: item["approvalCallbackRoute"],
    approvalCallbackPayload: item["approvalCallbackPayload"],
    approvalStatus: item["approvalStatus"],
  };
}

/** Request body for calling post-action */
export interface ApprovalActionRequest {
  /** Approval status indicating 'Approved' or 'Rejected' */
  approvalStatus: string;
}

export function approvalActionRequestSerializer(item: ApprovalActionRequest): any {
  return { approvalStatus: item["approvalStatus"] };
}

/** Supported API versions for the Microsoft.Mission resource provider. */
export enum KnownVersions {
  /** The 2024-06-01-preview version. */
  V20240601Preview = "2024-06-01-preview",
  /** The 2024-12-01-preview version. */
  V20241201Preview = "2024-12-01-preview",
  /** The 2025-05-01-preview version. */
  V20250501Preview = "2025-05-01-preview",
}
