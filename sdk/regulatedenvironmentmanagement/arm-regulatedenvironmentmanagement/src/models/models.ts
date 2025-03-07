// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The Landing zone registration resource type. */
export interface LandingZoneRegistrationResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LandingZoneRegistrationResourceProperties;
}

export function landingZoneRegistrationResourceSerializer(
  item: LandingZoneRegistrationResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : landingZoneRegistrationResourcePropertiesSerializer(item["properties"]),
  };
}

export function landingZoneRegistrationResourceDeserializer(
  item: any,
): LandingZoneRegistrationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : landingZoneRegistrationResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of landing zone registration resource type. */
export interface LandingZoneRegistrationResourceProperties {
  /** The state that reflects the current stage in the creation, updating, or deletion process of the landing zone registration resource type. */
  readonly provisioningState?: ProvisioningState;
  /** The resource id of the top level management group */
  existingTopLevelMgId: string;
  /** The resource id of the associated landing zone configuration. */
  existingLandingZoneConfigurationId: string;
  /** The managed identity to be assigned to this landing zone registration. */
  managedIdentity?: ManagedIdentityProperties;
}

export function landingZoneRegistrationResourcePropertiesSerializer(
  item: LandingZoneRegistrationResourceProperties,
): any {
  return {
    existingTopLevelMgId: item["existingTopLevelMgId"],
    existingLandingZoneConfigurationId: item["existingLandingZoneConfigurationId"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentityPropertiesSerializer(item["managedIdentity"]),
  };
}

export function landingZoneRegistrationResourcePropertiesDeserializer(
  item: any,
): LandingZoneRegistrationResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    existingTopLevelMgId: item["existingTopLevelMgId"],
    existingLandingZoneConfigurationId: item["existingLandingZoneConfigurationId"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentityPropertiesDeserializer(item["managedIdentity"]),
  };
}

/** The custom provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The state of the resource when creating */
  Creating = "Creating",
  /** The state of the resource when updating */
  Updating = "Updating",
  /** The state of the resource when deleting */
  Deleting = "Deleting",
}

/**
 * The custom provisioning state. \
 * {@link KnownprovisioningState} can be used interchangeably with provisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The state of the resource when creating \
 * **Updating**: The state of the resource when updating \
 * **Deleting**: The state of the resource when deleting
 */
export type ProvisioningState = string;

/** The properties of managed identity, specifically including type and resource ID. */
export interface ManagedIdentityProperties {
  /** The type of managed identity. */
  type: ManagedIdentityResourceType;
  /** The resource id of the managed identity. */
  userAssignedIdentityResourceId?: string;
}

export function managedIdentityPropertiesSerializer(item: ManagedIdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function managedIdentityPropertiesDeserializer(item: any): ManagedIdentityProperties {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** The managed identity resource. */
export enum KnownManagedIdentityResourceType {
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
}

/**
 * The managed identity resource. \
 * {@link KnownManagedIdentityResourceType} can be used interchangeably with ManagedIdentityResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity.
 */
export type ManagedIdentityResourceType = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** The response of a LandingZoneRegistrationResource list operation. */
export interface _LandingZoneRegistrationResourceListResult {
  /** The LandingZoneRegistrationResource items on this page */
  value: LandingZoneRegistrationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _landingZoneRegistrationResourceListResultDeserializer(
  item: any,
): _LandingZoneRegistrationResourceListResult {
  return {
    value: landingZoneRegistrationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function landingZoneRegistrationResourceArraySerializer(
  result: Array<LandingZoneRegistrationResource>,
): any[] {
  return result.map((item) => {
    return landingZoneRegistrationResourceSerializer(item);
  });
}

export function landingZoneRegistrationResourceArrayDeserializer(
  result: Array<LandingZoneRegistrationResource>,
): any[] {
  return result.map((item) => {
    return landingZoneRegistrationResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface LandingZoneConfigurationResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LandingZoneConfigurationResourceProperties;
}

export function landingZoneConfigurationResourceSerializer(
  item: LandingZoneConfigurationResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : landingZoneConfigurationResourcePropertiesSerializer(item["properties"]),
  };
}

export function landingZoneConfigurationResourceDeserializer(
  item: any,
): LandingZoneConfigurationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : landingZoneConfigurationResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of landing zone configuration resource type. */
export interface LandingZoneConfigurationResourceProperties {
  /** The state that reflects the current stage in the creation, updating, or deletion process of the landing zone configuration. */
  readonly provisioningState?: ProvisioningState;
  /** The status that indicates the current phase of the configuration process for a deployment. */
  readonly authoringStatus?: AuthoringStatus;
  /** Parameter used to deploy a DDoS protection plan: Select 'Yes' to enable deployment, 'No' to skip it, or 'Existing' to reuse an existing DDoS protection plan. */
  ddosProtectionCreationOption: ResourceCreationOptions;
  /** The resource ID of the DDoS protection plan when reusing an existing one. */
  existingDdosProtectionId?: string;
  /** Parameter used to deploy a log analytics workspace: Select 'Yes' to enable deployment, 'No' to skip it, or 'Existing' to reuse an existing log analytics workspace. */
  logAnalyticsWorkspaceCreationOption: ResourceCreationOptions;
  /** The resource ID of the log analytics workspace when reusing an existing one. */
  existingLogAnalyticsWorkspaceId?: string;
  /** Tags are key-value pairs that can be assigned to a resource to organize and manage it more effectively. Example: {'name': 'a tag name', 'value': 'a tag value'} */
  tags?: Tags[];
  /** Parameter used for deploying a Firewall: Select 'No' to skip deployment, 'Standard' to deploy the Standard SKU, or 'Premium' to deploy the Premium SKU. */
  firewallCreationOption: FirewallCreationOptions;
  /** The Firewall subnet address used for deploying a firewall. Specify the Firewall subnet using IPv4 CIDR notation. */
  firewallSubnetCidrBlock?: string;
  /** The gateway subnet address used for deploying a virtual network. Specify the subnet using IPv4 CIDR notation. */
  gatewaySubnetCidrBlock: string;
  /** Parameter to define the retention period for logs, in days. The minimum duration is 30 days and the maximum is 730 days. */
  logRetentionInDays: number;
  /** The Virtual Network address. Specify the address using IPv4 CIDR notation. */
  hubNetworkCidrBlock: string;
  /** Parameter used to deploy a Bastion: Select 'Yes' to enable deployment, 'No' to skip it, or 'Existing' to reuse an existing Bastion. */
  azureBastionCreationOption: ResourceCreationOptions;
  /** The resource ID of the Bastion when reusing an existing one. */
  existingAzureBastionId?: string;
  /** The Bastion subnet address. Specify the address using IPv4 CIDR notation. */
  azureBastionSubnetCidrBlock?: string;
  /** The child management groups of 'Landing Zones' management group and their assigned policies. */
  landingZonesMgChildren?: LandingZoneManagementGroupProperties[];
  /** The assigned policies of the parent management group. */
  topLevelMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Landing Zones' management group. */
  landingZonesMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Platform' management group. */
  platformMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Management' management group under 'Platform' management group. */
  platformManagementMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Connectivity' management group under 'Platform' management group. */
  platformConnectivityMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Identity' management group under 'Platform' management group. */
  platformIdentityMgMetadata?: ManagementGroupProperties;
  /** The assigned policies of the 'Decommissioned' management group and indicator to create it or not. */
  decommissionedMgMetadata?: DecommissionedManagementGroupProperties;
  /** The assigned policies of the 'Sandbox' management group and indicator to create it or not. */
  sandboxMgMetadata?: SandboxManagementGroupProperties;
  /** The managed identity to be assigned to this landing zone configuration. */
  managedIdentity: ManagedIdentityProperties;
  /** The names of the 'Platform' child management groups and their assigned policies, excluding the default ones: 'Connectivity', 'Identity', and 'Management' */
  platformMgChildren?: PlatformManagementGroupProperties[];
  /** The default naming convention applied to all resources for this landing zone configuration. Example - {DeploymentPrefix}-Contoso-{ResourceTypeAbbreviation}{DeploymentSuffix}-{Environment}-testing */
  namingConventionFormula?: string;
  /** The custom naming convention applied to specific resource types for this landing zone configuration, which overrides the default naming convention for those resource types. Example - 'customNamingConvention': [{'resourceType': 'azureFirewalls', 'formula': '{DeploymentPrefix}-afwl-{DeploymentSuffix}'}] */
  customNamingConvention?: CustomNamingConvention[];
}

export function landingZoneConfigurationResourcePropertiesSerializer(
  item: LandingZoneConfigurationResourceProperties,
): any {
  return {
    ddosProtectionCreationOption: item["ddosProtectionCreationOption"],
    existingDdosProtectionId: item["existingDdosProtectionId"],
    logAnalyticsWorkspaceCreationOption: item["logAnalyticsWorkspaceCreationOption"],
    existingLogAnalyticsWorkspaceId: item["existingLogAnalyticsWorkspaceId"],
    tags: !item["tags"] ? item["tags"] : tagsArraySerializer(item["tags"]),
    firewallCreationOption: item["firewallCreationOption"],
    firewallSubnetCidrBlock: item["firewallSubnetCidrBlock"],
    gatewaySubnetCidrBlock: item["gatewaySubnetCidrBlock"],
    logRetentionInDays: item["logRetentionInDays"],
    hubNetworkCidrBlock: item["hubNetworkCidrBlock"],
    azureBastionCreationOption: item["azureBastionCreationOption"],
    existingAzureBastionId: item["existingAzureBastionId"],
    azureBastionSubnetCidrBlock: item["azureBastionSubnetCidrBlock"],
    landingZonesMgChildren: !item["landingZonesMgChildren"]
      ? item["landingZonesMgChildren"]
      : landingZoneManagementGroupPropertiesArraySerializer(item["landingZonesMgChildren"]),
    topLevelMgMetadata: !item["topLevelMgMetadata"]
      ? item["topLevelMgMetadata"]
      : managementGroupPropertiesSerializer(item["topLevelMgMetadata"]),
    landingZonesMgMetadata: !item["landingZonesMgMetadata"]
      ? item["landingZonesMgMetadata"]
      : managementGroupPropertiesSerializer(item["landingZonesMgMetadata"]),
    platformMgMetadata: !item["platformMgMetadata"]
      ? item["platformMgMetadata"]
      : managementGroupPropertiesSerializer(item["platformMgMetadata"]),
    platformManagementMgMetadata: !item["platformManagementMgMetadata"]
      ? item["platformManagementMgMetadata"]
      : managementGroupPropertiesSerializer(item["platformManagementMgMetadata"]),
    platformConnectivityMgMetadata: !item["platformConnectivityMgMetadata"]
      ? item["platformConnectivityMgMetadata"]
      : managementGroupPropertiesSerializer(item["platformConnectivityMgMetadata"]),
    platformIdentityMgMetadata: !item["platformIdentityMgMetadata"]
      ? item["platformIdentityMgMetadata"]
      : managementGroupPropertiesSerializer(item["platformIdentityMgMetadata"]),
    decommissionedMgMetadata: !item["decommissionedMgMetadata"]
      ? item["decommissionedMgMetadata"]
      : decommissionedManagementGroupPropertiesSerializer(item["decommissionedMgMetadata"]),
    sandboxMgMetadata: !item["sandboxMgMetadata"]
      ? item["sandboxMgMetadata"]
      : sandboxManagementGroupPropertiesSerializer(item["sandboxMgMetadata"]),
    managedIdentity: managedIdentityPropertiesSerializer(item["managedIdentity"]),
    platformMgChildren: !item["platformMgChildren"]
      ? item["platformMgChildren"]
      : platformManagementGroupPropertiesArraySerializer(item["platformMgChildren"]),
    namingConventionFormula: item["namingConventionFormula"],
    customNamingConvention: !item["customNamingConvention"]
      ? item["customNamingConvention"]
      : customNamingConventionArraySerializer(item["customNamingConvention"]),
  };
}

export function landingZoneConfigurationResourcePropertiesDeserializer(
  item: any,
): LandingZoneConfigurationResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    authoringStatus: item["authoringStatus"],
    ddosProtectionCreationOption: item["ddosProtectionCreationOption"],
    existingDdosProtectionId: item["existingDdosProtectionId"],
    logAnalyticsWorkspaceCreationOption: item["logAnalyticsWorkspaceCreationOption"],
    existingLogAnalyticsWorkspaceId: item["existingLogAnalyticsWorkspaceId"],
    tags: !item["tags"] ? item["tags"] : tagsArrayDeserializer(item["tags"]),
    firewallCreationOption: item["firewallCreationOption"],
    firewallSubnetCidrBlock: item["firewallSubnetCidrBlock"],
    gatewaySubnetCidrBlock: item["gatewaySubnetCidrBlock"],
    logRetentionInDays: item["logRetentionInDays"],
    hubNetworkCidrBlock: item["hubNetworkCidrBlock"],
    azureBastionCreationOption: item["azureBastionCreationOption"],
    existingAzureBastionId: item["existingAzureBastionId"],
    azureBastionSubnetCidrBlock: item["azureBastionSubnetCidrBlock"],
    landingZonesMgChildren: !item["landingZonesMgChildren"]
      ? item["landingZonesMgChildren"]
      : landingZoneManagementGroupPropertiesArrayDeserializer(item["landingZonesMgChildren"]),
    topLevelMgMetadata: !item["topLevelMgMetadata"]
      ? item["topLevelMgMetadata"]
      : managementGroupPropertiesDeserializer(item["topLevelMgMetadata"]),
    landingZonesMgMetadata: !item["landingZonesMgMetadata"]
      ? item["landingZonesMgMetadata"]
      : managementGroupPropertiesDeserializer(item["landingZonesMgMetadata"]),
    platformMgMetadata: !item["platformMgMetadata"]
      ? item["platformMgMetadata"]
      : managementGroupPropertiesDeserializer(item["platformMgMetadata"]),
    platformManagementMgMetadata: !item["platformManagementMgMetadata"]
      ? item["platformManagementMgMetadata"]
      : managementGroupPropertiesDeserializer(item["platformManagementMgMetadata"]),
    platformConnectivityMgMetadata: !item["platformConnectivityMgMetadata"]
      ? item["platformConnectivityMgMetadata"]
      : managementGroupPropertiesDeserializer(item["platformConnectivityMgMetadata"]),
    platformIdentityMgMetadata: !item["platformIdentityMgMetadata"]
      ? item["platformIdentityMgMetadata"]
      : managementGroupPropertiesDeserializer(item["platformIdentityMgMetadata"]),
    decommissionedMgMetadata: !item["decommissionedMgMetadata"]
      ? item["decommissionedMgMetadata"]
      : decommissionedManagementGroupPropertiesDeserializer(item["decommissionedMgMetadata"]),
    sandboxMgMetadata: !item["sandboxMgMetadata"]
      ? item["sandboxMgMetadata"]
      : sandboxManagementGroupPropertiesDeserializer(item["sandboxMgMetadata"]),
    managedIdentity: managedIdentityPropertiesDeserializer(item["managedIdentity"]),
    platformMgChildren: !item["platformMgChildren"]
      ? item["platformMgChildren"]
      : platformManagementGroupPropertiesArrayDeserializer(item["platformMgChildren"]),
    namingConventionFormula: item["namingConventionFormula"],
    customNamingConvention: !item["customNamingConvention"]
      ? item["customNamingConvention"]
      : customNamingConventionArrayDeserializer(item["customNamingConvention"]),
  };
}

/** The authoring status for a landing zone configuration. */
export enum KnownAuthoringStatus {
  /** 'Authoring' is the default status when a create configuration request is made. In this state, the Landing zone configuration can be modified. */
  Authoring = "Authoring",
  /** 'ReadyForUse' status is set when the configuration updates are finished, and the configuration is ready for code generation or deployment. */
  ReadyForUse = "ReadyForUse",
  /** 'Disabled' status is set when the landing zone configuration is no longer in use. */
  Disabled = "Disabled",
}

/**
 * The authoring status for a landing zone configuration. \
 * {@link KnownAuthoringStatus} can be used interchangeably with AuthoringStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Authoring**: 'Authoring' is the default status when a create configuration request is made. In this state, the Landing zone configuration can be modified. \
 * **ReadyForUse**: 'ReadyForUse' status is set when the configuration updates are finished, and the configuration is ready for code generation or deployment. \
 * **Disabled**: 'Disabled' status is set when the landing zone configuration is no longer in use.
 */
export type AuthoringStatus = string;

/** Options for resource creation. */
export enum KnownResourceCreationOptions {
  /** Value to create a new resource. */
  Yes = "Yes",
  /** Value to not create a new resource. */
  No = "No",
  /** Value to use an existing resource. */
  UseExisting = "UseExisting",
}

/**
 * Options for resource creation. \
 * {@link KnownResourceCreationOptions} can be used interchangeably with ResourceCreationOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes**: Value to create a new resource. \
 * **No**: Value to not create a new resource. \
 * **UseExisting**: Value to use an existing resource.
 */
export type ResourceCreationOptions = string;

export function tagsArraySerializer(result: Array<Tags>): any[] {
  return result.map((item) => {
    return tagsSerializer(item);
  });
}

export function tagsArrayDeserializer(result: Array<Tags>): any[] {
  return result.map((item) => {
    return tagsDeserializer(item);
  });
}

/** Key-value pairs that can be assigned to this resource. */
export interface Tags {
  /** A tag name. */
  name: string;
  /** A tag value. */
  value?: string;
}

export function tagsSerializer(item: Tags): any {
  return { name: item["name"], value: item["value"] };
}

export function tagsDeserializer(item: any): Tags {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Parameter used for deploying or not a Firewall resource. */
export enum KnownFirewallCreationOptions {
  /** Select 'None' value to skip Firewall deployment. */
  None = "None",
  /** Select 'Standard' value to deploy the Firewall Standard SKU. */
  Standard = "Standard",
  /** Select 'Premium' value to deploy the Firewall Premium SKU. */
  Premium = "Premium",
}

/**
 * Parameter used for deploying or not a Firewall resource. \
 * {@link KnownFirewallCreationOptions} can be used interchangeably with FirewallCreationOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Select 'None' value to skip Firewall deployment. \
 * **Standard**: Select 'Standard' value to deploy the Firewall Standard SKU. \
 * **Premium**: Select 'Premium' value to deploy the Firewall Premium SKU.
 */
export type FirewallCreationOptions = string;

export function landingZoneManagementGroupPropertiesArraySerializer(
  result: Array<LandingZoneManagementGroupProperties>,
): any[] {
  return result.map((item) => {
    return landingZoneManagementGroupPropertiesSerializer(item);
  });
}

export function landingZoneManagementGroupPropertiesArrayDeserializer(
  result: Array<LandingZoneManagementGroupProperties>,
): any[] {
  return result.map((item) => {
    return landingZoneManagementGroupPropertiesDeserializer(item);
  });
}

/** The 'Landing Zones' management group properties.. */
export interface LandingZoneManagementGroupProperties {
  /** Array of policy initiatives applied to the management group. */
  policyInitiativesAssignmentProperties: PolicyInitiativeAssignmentProperties[];
  /** Management group name. */
  name: string;
}

export function landingZoneManagementGroupPropertiesSerializer(
  item: LandingZoneManagementGroupProperties,
): any {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArraySerializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    name: item["name"],
  };
}

export function landingZoneManagementGroupPropertiesDeserializer(
  item: any,
): LandingZoneManagementGroupProperties {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArrayDeserializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    name: item["name"],
  };
}

export function policyInitiativeAssignmentPropertiesArraySerializer(
  result: Array<PolicyInitiativeAssignmentProperties>,
): any[] {
  return result.map((item) => {
    return policyInitiativeAssignmentPropertiesSerializer(item);
  });
}

export function policyInitiativeAssignmentPropertiesArrayDeserializer(
  result: Array<PolicyInitiativeAssignmentProperties>,
): any[] {
  return result.map((item) => {
    return policyInitiativeAssignmentPropertiesDeserializer(item);
  });
}

/** The properties of assigned policy initiatives. */
export interface PolicyInitiativeAssignmentProperties {
  /** The fully qualified id of the policy initiative. */
  policyInitiativeId: string;
  /** The parameters of the assigned policy initiative. */
  assignmentParameters: Record<string, any>;
}

export function policyInitiativeAssignmentPropertiesSerializer(
  item: PolicyInitiativeAssignmentProperties,
): any {
  return {
    policyInitiativeId: item["policyInitiativeId"],
    assignmentParameters: item["assignmentParameters"],
  };
}

export function policyInitiativeAssignmentPropertiesDeserializer(
  item: any,
): PolicyInitiativeAssignmentProperties {
  return {
    policyInitiativeId: item["policyInitiativeId"],
    assignmentParameters: item["assignmentParameters"],
  };
}

/** The properties of policy initiatives applied to the management group. */
export interface ManagementGroupProperties {
  /** Array of policy initiatives applied to the management group. */
  policyInitiativesAssignmentProperties: PolicyInitiativeAssignmentProperties[];
}

export function managementGroupPropertiesSerializer(item: ManagementGroupProperties): any {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArraySerializer(
      item["policyInitiativesAssignmentProperties"],
    ),
  };
}

export function managementGroupPropertiesDeserializer(item: any): ManagementGroupProperties {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArrayDeserializer(
      item["policyInitiativesAssignmentProperties"],
    ),
  };
}

/** The 'Decommissioned' management group properties. */
export interface DecommissionedManagementGroupProperties {
  /** Array of policy initiatives applied to the management group. */
  policyInitiativesAssignmentProperties: PolicyInitiativeAssignmentProperties[];
  /** This parameter determines whether the 'Decommissioned' management group will be created. If set to true, the group will be created; if set to false, it will not be created. The default value is false. */
  create: boolean;
}

export function decommissionedManagementGroupPropertiesSerializer(
  item: DecommissionedManagementGroupProperties,
): any {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArraySerializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    create: item["create"],
  };
}

export function decommissionedManagementGroupPropertiesDeserializer(
  item: any,
): DecommissionedManagementGroupProperties {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArrayDeserializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    create: item["create"],
  };
}

/** The 'Sandbox' management group properties. */
export interface SandboxManagementGroupProperties {
  /** Array of policy initiatives applied to the management group. */
  policyInitiativesAssignmentProperties: PolicyInitiativeAssignmentProperties[];
  /** This parameter determines whether the 'Sandbox' management group will be created. If set to true, the group will be created; if set to false, it will not be created. The default value is false. */
  create: boolean;
}

export function sandboxManagementGroupPropertiesSerializer(
  item: SandboxManagementGroupProperties,
): any {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArraySerializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    create: item["create"],
  };
}

export function sandboxManagementGroupPropertiesDeserializer(
  item: any,
): SandboxManagementGroupProperties {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArrayDeserializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    create: item["create"],
  };
}

export function platformManagementGroupPropertiesArraySerializer(
  result: Array<PlatformManagementGroupProperties>,
): any[] {
  return result.map((item) => {
    return platformManagementGroupPropertiesSerializer(item);
  });
}

export function platformManagementGroupPropertiesArrayDeserializer(
  result: Array<PlatformManagementGroupProperties>,
): any[] {
  return result.map((item) => {
    return platformManagementGroupPropertiesDeserializer(item);
  });
}

/** The 'Platform' management group properties. */
export interface PlatformManagementGroupProperties {
  /** Array of policy initiatives applied to the management group. */
  policyInitiativesAssignmentProperties: PolicyInitiativeAssignmentProperties[];
  /** Management group name. */
  name: string;
}

export function platformManagementGroupPropertiesSerializer(
  item: PlatformManagementGroupProperties,
): any {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArraySerializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    name: item["name"],
  };
}

export function platformManagementGroupPropertiesDeserializer(
  item: any,
): PlatformManagementGroupProperties {
  return {
    policyInitiativesAssignmentProperties: policyInitiativeAssignmentPropertiesArrayDeserializer(
      item["policyInitiativesAssignmentProperties"],
    ),
    name: item["name"],
  };
}

export function customNamingConventionArraySerializer(
  result: Array<CustomNamingConvention>,
): any[] {
  return result.map((item) => {
    return customNamingConventionSerializer(item);
  });
}

export function customNamingConventionArrayDeserializer(
  result: Array<CustomNamingConvention>,
): any[] {
  return result.map((item) => {
    return customNamingConventionDeserializer(item);
  });
}

/** The details for the custom naming convention override for a specific resource type. */
export interface CustomNamingConvention {
  /** The type of the resource. */
  resourceType: ResourceType;
  /** The custom naming formula for the resource type. */
  formula: string;
}

export function customNamingConventionSerializer(item: CustomNamingConvention): any {
  return { resourceType: item["resourceType"], formula: item["formula"] };
}

export function customNamingConventionDeserializer(item: any): CustomNamingConvention {
  return {
    resourceType: item["resourceType"],
    formula: item["formula"],
  };
}

/** The input values for resource types for custom naming conventions. */
export enum KnownResourceType {
  /** Value when customer wants to provide a custom naming convention for Azure Firewall. */
  AzureFirewalls = "azureFirewalls",
  /** Value when customer wants to provide a custom naming convention for Log Analytics workspace. */
  Workspaces = "workspaces",
  /** Value when customer wants to provide a custom naming convention for automation account. */
  AutomationAccounts = "automationAccounts",
  /** Value when customer wants to provide a custom naming convention for dashboard. */
  Dashboards = "dashboards",
  /** Value when customer wants to provide a custom naming convention for managed identity. */
  UserAssignedIdentities = "userAssignedIdentities",
  /** Value when customer wants to provide a custom naming convention for Bastion. */
  BastionHosts = "bastionHosts",
  /** Value when customer wants to provide a custom naming convention for DDoS protection plan. */
  DdosProtectionPlans = "ddosProtectionPlans",
  /** Value when customer wants to provide a custom naming convention for Bastion NSG. */
  NetworkSecurityGroups = "networkSecurityGroups",
  /** Value when customer wants to provide a custom naming convention for virtual network. */
  VirtualNetworks = "virtualNetworks",
  /** Value when customer wants to provide a custom naming convention for route table. */
  RouteTables = "routeTables",
}

/**
 * The input values for resource types for custom naming conventions. \
 * {@link KnownResourceType} can be used interchangeably with ResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureFirewalls**: Value when customer wants to provide a custom naming convention for Azure Firewall. \
 * **workspaces**: Value when customer wants to provide a custom naming convention for Log Analytics workspace. \
 * **automationAccounts**: Value when customer wants to provide a custom naming convention for automation account. \
 * **dashboards**: Value when customer wants to provide a custom naming convention for dashboard. \
 * **userAssignedIdentities**: Value when customer wants to provide a custom naming convention for managed identity. \
 * **bastionHosts**: Value when customer wants to provide a custom naming convention for Bastion. \
 * **ddosProtectionPlans**: Value when customer wants to provide a custom naming convention for DDoS protection plan. \
 * **networkSecurityGroups**: Value when customer wants to provide a custom naming convention for Bastion NSG. \
 * **virtualNetworks**: Value when customer wants to provide a custom naming convention for virtual network. \
 * **routeTables**: Value when customer wants to provide a custom naming convention for route table.
 */
export type ResourceType = string;

/** The response of a LandingZoneConfigurationResource list operation. */
export interface _LandingZoneConfigurationResourceListResult {
  /** The LandingZoneConfigurationResource items on this page */
  value: LandingZoneConfigurationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _landingZoneConfigurationResourceListResultDeserializer(
  item: any,
): _LandingZoneConfigurationResourceListResult {
  return {
    value: landingZoneConfigurationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function landingZoneConfigurationResourceArraySerializer(
  result: Array<LandingZoneConfigurationResource>,
): any[] {
  return result.map((item) => {
    return landingZoneConfigurationResourceSerializer(item);
  });
}

export function landingZoneConfigurationResourceArrayDeserializer(
  result: Array<LandingZoneConfigurationResource>,
): any[] {
  return result.map((item) => {
    return landingZoneConfigurationResourceDeserializer(item);
  });
}

/** The request to generate Infrastructure as Code (IaC) for a landing zone. */
export interface GenerateLandingZoneRequest {
  /** The export options available for code generation. */
  infrastructureAsCodeOutputOptions: InfrastructureAsCodeOutputOptions;
  /** Existing 'Management' subscription ID to be linked with this deployment when reusing instead of creating a new subscription. */
  existingManagementSubscriptionId?: string;
  /** Existing 'Identity' subscription ID to be linked with this deployment when reusing instead of creating a new subscription. */
  existingIdentitySubscriptionId?: string;
  /** Existing 'Connectivity' subscription ID to be linked with this deployment when reusing instead of creating a new subscription. */
  existingConnectivitySubscriptionId?: string;
  /** The complete resource ID of the billing scope linked to the EA, MCA, or MPA account where you want to create the subscription. */
  subscriptionBillingScope?: string;
  /** Optional parent for the management group hierarchy, serving as an intermediate root management group parent if specified. If left empty, the default will be to deploy under the tenant root management group. */
  existingTopLevelMgParentId?: string;
  /** The prefix that will be added to all resources created by this deployment. Use between 2 and 5 characters, consisting only of letters, digits, '-', '.', or '_'. No other special characters are supported. */
  deploymentPrefix: string;
  /** The optional suffix that will be appended to all resources created by this deployment, maximum 5 characters. */
  deploymentSuffix?: string;
  /** The display name assigned to the top management group of the landing zone deployment hierarchy. It is recommended to use unique names for each landing zone deployment. */
  topLevelMgDisplayName: string;
  /** The Azure region where the landing zone will be deployed. All Azure regions are supported. */
  deploymentLocation: string;
  /** The name of the organization or agency for which the landing zone is being deployed. This is optional. */
  organization?: string;
  /** The environment where the landing zone is being deployed, such as ppe, prod, test, etc. */
  environment?: string;
}

export function generateLandingZoneRequestSerializer(item: GenerateLandingZoneRequest): any {
  return {
    infrastructureAsCodeOutputOptions: item["infrastructureAsCodeOutputOptions"],
    existingManagementSubscriptionId: item["existingManagementSubscriptionId"],
    existingIdentitySubscriptionId: item["existingIdentitySubscriptionId"],
    existingConnectivitySubscriptionId: item["existingConnectivitySubscriptionId"],
    subscriptionBillingScope: item["subscriptionBillingScope"],
    existingTopLevelMgParentId: item["existingTopLevelMgParentId"],
    deploymentPrefix: item["deploymentPrefix"],
    deploymentSuffix: item["deploymentSuffix"],
    topLevelMgDisplayName: item["topLevelMgDisplayName"],
    deploymentLocation: item["deploymentLocation"],
    organization: item["organization"],
    environment: item["environment"],
  };
}

/** Output options for landing zone code generation. */
export enum KnownInfrastructureAsCodeOutputOptions {
  /** Value when generating Landing zone code in Bicep format. */
  Bicep = "Bicep",
  /** Value when generating Landing zone code in ARM format. */
  ARM = "ARM",
}

/**
 * Output options for landing zone code generation. \
 * {@link KnownInfrastructureAsCodeOutputOptions} can be used interchangeably with InfrastructureAsCodeOutputOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bicep**: Value when generating Landing zone code in Bicep format. \
 * **ARM**: Value when generating Landing zone code in ARM format.
 */
export type InfrastructureAsCodeOutputOptions = string;

/** The response payload for generating infrastructure-as-code for the landing zone. */
export interface GenerateLandingZoneResponse {
  /** The parent management group name of the landing zone deployment. */
  topLevelMgDisplayName: string;
  /** The name of the Landing zone configuration resource. */
  landingZoneConfigurationName: string;
  /** The url to access the generated code. */
  generatedCodeUrl: string;
  /** The storage account name to access the generated code. */
  storageAccountName: string;
  /** The storage account container to access the generated code. */
  containerName: string;
  /** The storage account blob name to access the generated code. */
  blobName: string;
  /** The generated code content in JSON string format. */
  generatedArmTemplate?: string;
}

export function generateLandingZoneResponseDeserializer(item: any): GenerateLandingZoneResponse {
  return {
    topLevelMgDisplayName: item["topLevelMgDisplayName"],
    landingZoneConfigurationName: item["landingZoneConfigurationName"],
    generatedCodeUrl: item["generatedCodeUrl"],
    storageAccountName: item["storageAccountName"],
    containerName: item["containerName"],
    blobName: item["blobName"],
    generatedArmTemplate: item["generatedArmTemplate"],
  };
}

/** The request to update the authoring status of a configuration. */
export interface UpdateAuthoringStatusRequest {
  /** The authoring status value to be updated. Possible values include: 'Authoring', 'ReadyForUse' and 'Disabled'. */
  authoringStatus: AuthoringStatus;
}

export function updateAuthoringStatusRequestSerializer(item: UpdateAuthoringStatusRequest): any {
  return { authoringStatus: item["authoringStatus"] };
}

/** The response for authoring status update request. */
export interface UpdateAuthoringStatusResponse {
  /** The name of the landing zone configuration resource. */
  landingZoneConfigurationName: string;
  /** The authoring status value to be updated. */
  authoringStatus: AuthoringStatus;
}

export function updateAuthoringStatusResponseDeserializer(
  item: any,
): UpdateAuthoringStatusResponse {
  return {
    landingZoneConfigurationName: item["landingZoneConfigurationName"],
    authoringStatus: item["authoringStatus"],
  };
}

/** The request for create duplicate landing zone configuration. */
export interface CreateLandingZoneConfigurationCopyRequest {
  /** The name of the duplicate landing zone configuration resource. */
  name: string;
}

export function createLandingZoneConfigurationCopyRequestSerializer(
  item: CreateLandingZoneConfigurationCopyRequest,
): any {
  return { name: item["name"] };
}

/** The response of the create duplicate landing zone configuration. */
export interface CreateLandingZoneConfigurationCopyResponse {
  /** The ID of the duplicate landing zone configuration resource. */
  copiedLandingZoneConfigurationId: string;
}

export function createLandingZoneConfigurationCopyResponseDeserializer(
  item: any,
): CreateLandingZoneConfigurationCopyResponse {
  return {
    copiedLandingZoneConfigurationId: item["copiedLandingZoneConfigurationId"],
  };
}

/** The Landing zone account resource type. A Landing zone account is the container for configuring, deploying and managing multiple landing zones. */
export interface LandingZoneAccountResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: LandingZoneAccountResourceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function landingZoneAccountResourceSerializer(item: LandingZoneAccountResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : landingZoneAccountResourcePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function landingZoneAccountResourceDeserializer(item: any): LandingZoneAccountResource {
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
      : landingZoneAccountResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of landing zone account resource type. */
export interface LandingZoneAccountResourceProperties {
  /** The state that reflects the current stage in the creation, updating, or deletion process of the landing zone account. */
  readonly provisioningState?: ProvisioningState;
  /** The storage account that will host the generated infrastructure as code (IaC) for a landing zone deployment. */
  storageAccount: string;
}

export function landingZoneAccountResourcePropertiesSerializer(
  item: LandingZoneAccountResourceProperties,
): any {
  return { storageAccount: item["storageAccount"] };
}

export function landingZoneAccountResourcePropertiesDeserializer(
  item: any,
): LandingZoneAccountResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    storageAccount: item["storageAccount"],
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
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
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

/** The response of a LandingZoneAccountResource list operation. */
export interface _LandingZoneAccountResourceListResult {
  /** The LandingZoneAccountResource items on this page */
  value: LandingZoneAccountResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _landingZoneAccountResourceListResultDeserializer(
  item: any,
): _LandingZoneAccountResourceListResult {
  return {
    value: landingZoneAccountResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function landingZoneAccountResourceArraySerializer(
  result: Array<LandingZoneAccountResource>,
): any[] {
  return result.map((item) => {
    return landingZoneAccountResourceSerializer(item);
  });
}

export function landingZoneAccountResourceArrayDeserializer(
  result: Array<LandingZoneAccountResource>,
): any[] {
  return result.map((item) => {
    return landingZoneAccountResourceDeserializer(item);
  });
}

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

/** The Microsoft Sovereign Provider version. */
export enum KnownVersions {
  /** Public preview version. */
  Preview20250227 = "2025-02-27-preview",
}
