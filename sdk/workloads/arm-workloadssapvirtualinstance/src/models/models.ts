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

/** Define the Virtual Instance for SAP solutions resource. */
export interface SAPVirtualInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPVirtualInstanceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SAPVirtualInstanceIdentity;
}

export function sapVirtualInstanceSerializer(item: SAPVirtualInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sapVirtualInstancePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : sapVirtualInstanceIdentitySerializer(item["identity"]),
  };
}

export function sapVirtualInstanceDeserializer(item: any): SAPVirtualInstance {
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
      : sapVirtualInstancePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : sapVirtualInstanceIdentityDeserializer(item["identity"]),
  };
}

/** Defines the Virtual Instance for SAP solutions resource properties. */
export interface SAPVirtualInstanceProperties {
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** Specifies the network access configuration for the resources that will be deployed in the Managed Resource Group. The options to choose from are Public and Private. If 'Private' is chosen, the Storage Account service tag should be enabled on the subnets in which the SAP VMs exist. This is required for establishing connectivity between VM extensions and the managed resource group storage account. This setting is currently applicable only to Storage Account. Learn more here https://go.microsoft.com/fwlink/?linkid=2247228 */
  managedResourcesNetworkAccessType?: ManagedResourcesNetworkAccessType;
  /** Defines if the SAP system is being created using Azure Center for SAP solutions (ACSS) or if an existing SAP system is being registered with ACSS */
  configuration: SAPConfigurationUnion;
  /** Managed resource group configuration */
  managedResourceGroupConfiguration?: ManagedRGConfiguration;
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the Virtual Instance for SAP state. */
  readonly state?: SAPVirtualInstanceState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Indicates any errors on the Virtual Instance for SAP solutions resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sapVirtualInstancePropertiesSerializer(item: SAPVirtualInstanceProperties): any {
  return {
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
    configuration: sapConfigurationUnionSerializer(item["configuration"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedRGConfigurationSerializer(item["managedResourceGroupConfiguration"]),
  };
}

export function sapVirtualInstancePropertiesDeserializer(item: any): SAPVirtualInstanceProperties {
  return {
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
    configuration: sapConfigurationUnionDeserializer(item["configuration"]),
    managedResourceGroupConfiguration: !item["managedResourceGroupConfiguration"]
      ? item["managedResourceGroupConfiguration"]
      : managedRGConfigurationDeserializer(item["managedResourceGroupConfiguration"]),
    status: item["status"],
    health: item["health"],
    state: item["state"],
    provisioningState: item["provisioningState"],
    errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
  };
}

/** Defines the environment type - Production/Non Production. */
export enum KnownSAPEnvironmentType {
  /** Non Production SAP system. */
  NonProd = "NonProd",
  /** Production SAP system. */
  Prod = "Prod",
}

/**
 * Defines the environment type - Production/Non Production. \
 * {@link KnownSAPEnvironmentType} can be used interchangeably with SAPEnvironmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonProd**: Non Production SAP system. \
 * **Prod**: Production SAP system.
 */
export type SAPEnvironmentType = string;

/** Defines the SAP Product type. */
export enum KnownSAPProductType {
  /** SAP Product ECC. */
  ECC = "ECC",
  /** SAP Product S4HANA. */
  S4Hana = "S4HANA",
  /** SAP Products other than the ones listed. */
  Other = "Other",
}

/**
 * Defines the SAP Product type. \
 * {@link KnownSAPProductType} can be used interchangeably with SAPProductType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ECC**: SAP Product ECC. \
 * **S4HANA**: SAP Product S4HANA. \
 * **Other**: SAP Products other than the ones listed.
 */
export type SAPProductType = string;

/** Defines the network access type for managed resources. */
export enum KnownManagedResourcesNetworkAccessType {
  /** Managed resources will be deployed with public network access enabled. */
  Public = "Public",
  /** Managed resources will be deployed with public network access disabled. */
  Private = "Private",
}

/**
 * Defines the network access type for managed resources. \
 * {@link KnownManagedResourcesNetworkAccessType} can be used interchangeably with ManagedResourcesNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Managed resources will be deployed with public network access enabled. \
 * **Private**: Managed resources will be deployed with public network access disabled.
 */
export type ManagedResourcesNetworkAccessType = string;

/** The SAP Configuration. */
export interface SAPConfiguration {
  /** The configuration type. Eg: Deployment/Discovery */
  /** The discriminator possible values: Discovery, Deployment, DeploymentWithOSConfig */
  configurationType: SAPConfigurationType;
}

export function sapConfigurationSerializer(item: SAPConfiguration): any {
  return { configurationType: item["configurationType"] };
}

export function sapConfigurationDeserializer(item: any): SAPConfiguration {
  return {
    configurationType: item["configurationType"],
  };
}

/** Alias for SAPConfigurationUnion */
export type SAPConfigurationUnion =
  | DiscoveryConfiguration
  | DeploymentConfiguration
  | DeploymentWithOSConfiguration
  | SAPConfiguration;

export function sapConfigurationUnionSerializer(item: SAPConfigurationUnion): any {
  switch (item.configurationType) {
    case "Discovery":
      return discoveryConfigurationSerializer(item as DiscoveryConfiguration);

    case "Deployment":
      return deploymentConfigurationSerializer(item as DeploymentConfiguration);

    case "DeploymentWithOSConfig":
      return deploymentWithOSConfigurationSerializer(item as DeploymentWithOSConfiguration);

    default:
      return sapConfigurationSerializer(item);
  }
}

export function sapConfigurationUnionDeserializer(item: any): SAPConfigurationUnion {
  switch (item.configurationType) {
    case "Discovery":
      return discoveryConfigurationDeserializer(item as DiscoveryConfiguration);

    case "Deployment":
      return deploymentConfigurationDeserializer(item as DeploymentConfiguration);

    case "DeploymentWithOSConfig":
      return deploymentWithOSConfigurationDeserializer(item as DeploymentWithOSConfiguration);

    default:
      return sapConfigurationDeserializer(item);
  }
}

/** The configuration Type. */
export enum KnownSAPConfigurationType {
  /** SAP system will be deployed by service. No OS configurations will be done. */
  Deployment = "Deployment",
  /** Existing SAP system will be registered. */
  Discovery = "Discovery",
  /** SAP system will be deployed by service. OS configurations will be done. */
  DeploymentWithOSConfig = "DeploymentWithOSConfig",
}

/**
 * The configuration Type. \
 * {@link KnownSAPConfigurationType} can be used interchangeably with SAPConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deployment**: SAP system will be deployed by service. No OS configurations will be done. \
 * **Discovery**: Existing SAP system will be registered. \
 * **DeploymentWithOSConfig**: SAP system will be deployed by service. OS configurations will be done.
 */
export type SAPConfigurationType = string;

/** Discovery Details. */
export interface DiscoveryConfiguration extends SAPConfiguration {
  /** The virtual machine ID of the Central Server. */
  centralServerVmId?: string;
  /** The custom storage account name for the storage account created by the service in the managed resource group created as part of VIS deployment.<br><br>Refer to the storage account naming rules [here](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftstorage).<br><br>If not provided, the service will create the storage account with a random name. */
  managedRgStorageAccountName?: string;
  /** The geo-location where the SAP system exists. */
  readonly appLocation?: string;
  /** The configuration Type. */
  configurationType: "Discovery";
}

export function discoveryConfigurationSerializer(item: DiscoveryConfiguration): any {
  return {
    configurationType: item["configurationType"],
    centralServerVmId: item["centralServerVmId"],
    managedRgStorageAccountName: item["managedRgStorageAccountName"],
  };
}

export function discoveryConfigurationDeserializer(item: any): DiscoveryConfiguration {
  return {
    configurationType: item["configurationType"],
    centralServerVmId: item["centralServerVmId"],
    managedRgStorageAccountName: item["managedRgStorageAccountName"],
    appLocation: item["appLocation"],
  };
}

/** Deployment Configuration. */
export interface DeploymentConfiguration extends SAPConfiguration {
  /** The geo-location where the SAP system is to be created. */
  appLocation?: string;
  /** The infrastructure configuration. */
  infrastructureConfiguration?: InfrastructureConfigurationUnion;
  /** The software configuration. */
  softwareConfiguration?: SoftwareConfigurationUnion;
  /** The deployment configuration Type. */
  configurationType: "Deployment";
}

export function deploymentConfigurationSerializer(item: DeploymentConfiguration): any {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item["infrastructureConfiguration"]
      ? item["infrastructureConfiguration"]
      : infrastructureConfigurationUnionSerializer(item["infrastructureConfiguration"]),
    softwareConfiguration: !item["softwareConfiguration"]
      ? item["softwareConfiguration"]
      : softwareConfigurationUnionSerializer(item["softwareConfiguration"]),
  };
}

export function deploymentConfigurationDeserializer(item: any): DeploymentConfiguration {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item["infrastructureConfiguration"]
      ? item["infrastructureConfiguration"]
      : infrastructureConfigurationUnionDeserializer(item["infrastructureConfiguration"]),
    softwareConfiguration: !item["softwareConfiguration"]
      ? item["softwareConfiguration"]
      : softwareConfigurationUnionDeserializer(item["softwareConfiguration"]),
  };
}

/** Deploy SAP Infrastructure Details. */
export interface InfrastructureConfiguration {
  /** The application resource group where SAP system resources will be deployed. */
  appResourceGroup: string;
  /** The SAP deployment type. Eg: SingleServer/ThreeTier. */
  /** The discriminator possible values: SingleServer, ThreeTier */
  deploymentType: SAPDeploymentType;
}

export function infrastructureConfigurationSerializer(item: InfrastructureConfiguration): any {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
  };
}

export function infrastructureConfigurationDeserializer(item: any): InfrastructureConfiguration {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
  };
}

/** Alias for InfrastructureConfigurationUnion */
export type InfrastructureConfigurationUnion =
  | SingleServerConfiguration
  | ThreeTierConfiguration
  | InfrastructureConfiguration;

export function infrastructureConfigurationUnionSerializer(
  item: InfrastructureConfigurationUnion,
): any {
  switch (item.deploymentType) {
    case "SingleServer":
      return singleServerConfigurationSerializer(item as SingleServerConfiguration);

    case "ThreeTier":
      return threeTierConfigurationSerializer(item as ThreeTierConfiguration);

    default:
      return infrastructureConfigurationSerializer(item);
  }
}

export function infrastructureConfigurationUnionDeserializer(
  item: any,
): InfrastructureConfigurationUnion {
  switch (item.deploymentType) {
    case "SingleServer":
      return singleServerConfigurationDeserializer(item as SingleServerConfiguration);

    case "ThreeTier":
      return threeTierConfigurationDeserializer(item as ThreeTierConfiguration);

    default:
      return infrastructureConfigurationDeserializer(item);
  }
}

/** The type of SAP deployment, single server or Three tier. */
export enum KnownSAPDeploymentType {
  /** SAP Single server deployment type. */
  SingleServer = "SingleServer",
  /** SAP Distributed deployment type. */
  ThreeTier = "ThreeTier",
}

/**
 * The type of SAP deployment, single server or Three tier. \
 * {@link KnownSAPDeploymentType} can be used interchangeably with SAPDeploymentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleServer**: SAP Single server deployment type. \
 * **ThreeTier**: SAP Distributed deployment type.
 */
export type SAPDeploymentType = string;

/** Gets or sets the single server configuration. For prerequisites for creating the infrastructure, please see [here](https://go.microsoft.com/fwlink/?linkid=2212611&amp;clcid=0x409) */
export interface SingleServerConfiguration extends InfrastructureConfiguration {
  /** Network configuration for the server */
  networkConfiguration?: NetworkConfiguration;
  /** The database type. */
  databaseType?: SAPDatabaseType;
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** Gets or sets the disk configuration. */
  dbDiskConfiguration?: DiskConfiguration;
  /** The set of custom names to be used for underlying azure resources that are part of the SAP system. */
  customResourceNames?: SingleServerCustomResourceNamesUnion;
  /** The type of SAP deployment, single server in this case. */
  deploymentType: "SingleServer";
}

export function singleServerConfigurationSerializer(item: SingleServerConfiguration): any {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationSerializer(item["networkConfiguration"]),
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item["virtualMachineConfiguration"],
    ),
    dbDiskConfiguration: !item["dbDiskConfiguration"]
      ? item["dbDiskConfiguration"]
      : diskConfigurationSerializer(item["dbDiskConfiguration"]),
    customResourceNames: !item["customResourceNames"]
      ? item["customResourceNames"]
      : singleServerCustomResourceNamesUnionSerializer(item["customResourceNames"]),
  };
}

export function singleServerConfigurationDeserializer(item: any): SingleServerConfiguration {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationDeserializer(item["networkConfiguration"]),
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationDeserializer(
      item["virtualMachineConfiguration"],
    ),
    dbDiskConfiguration: !item["dbDiskConfiguration"]
      ? item["dbDiskConfiguration"]
      : diskConfigurationDeserializer(item["dbDiskConfiguration"]),
    customResourceNames: !item["customResourceNames"]
      ? item["customResourceNames"]
      : singleServerCustomResourceNamesUnionDeserializer(item["customResourceNames"]),
  };
}

/** Defines the network configuration type for SAP system infrastructure that is being deployed */
export interface NetworkConfiguration {
  /** Specifies whether a secondary IP address should be added to the network interface on all VMs of the SAP system being deployed */
  isSecondaryIpEnabled?: boolean;
}

export function networkConfigurationSerializer(item: NetworkConfiguration): any {
  return { isSecondaryIpEnabled: item["isSecondaryIpEnabled"] };
}

export function networkConfigurationDeserializer(item: any): NetworkConfiguration {
  return {
    isSecondaryIpEnabled: item["isSecondaryIpEnabled"],
  };
}

/** Defines the supported SAP Database types. */
export enum KnownSAPDatabaseType {
  /** HANA Database type of SAP system. */
  Hana = "HANA",
  /** DB2 database type of the SAP system. */
  DB2 = "DB2",
}

/**
 * Defines the supported SAP Database types. \
 * {@link KnownSAPDatabaseType} can be used interchangeably with SAPDatabaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HANA**: HANA Database type of SAP system. \
 * **DB2**: DB2 database type of the SAP system.
 */
export type SAPDatabaseType = string;

/** Defines the virtual machine configuration. */
export interface VirtualMachineConfiguration {
  /** The virtual machine size. */
  vmSize: string;
  /** The image reference. */
  imageReference: ImageReference;
  /** The OS profile. */
  osProfile: OSProfile;
}

export function virtualMachineConfigurationSerializer(item: VirtualMachineConfiguration): any {
  return {
    vmSize: item["vmSize"],
    imageReference: imageReferenceSerializer(item["imageReference"]),
    osProfile: osProfileSerializer(item["osProfile"]),
  };
}

export function virtualMachineConfigurationDeserializer(item: any): VirtualMachineConfiguration {
  return {
    vmSize: item["vmSize"],
    imageReference: imageReferenceDeserializer(item["imageReference"]),
    osProfile: osProfileDeserializer(item["osProfile"]),
  };
}

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export interface ImageReference {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. */
  version?: string;
  /** Specifies the ARM resource ID of the Azure Compute Gallery image version used for creating ACSS VMs. You will need to provide this input when you choose to deploy virtual machines in ACSS with OS image from the Azure Compute gallery. */
  id?: string;
}

export function imageReferenceSerializer(item: ImageReference): any {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    id: item["id"],
  };
}

export function imageReferenceDeserializer(item: any): ImageReference {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    id: item["id"],
  };
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  osConfiguration?: OSConfigurationUnion;
}

export function osProfileSerializer(item: OSProfile): any {
  return {
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    osConfiguration: !item["osConfiguration"]
      ? item["osConfiguration"]
      : osConfigurationUnionSerializer(item["osConfiguration"]),
  };
}

export function osProfileDeserializer(item: any): OSProfile {
  return {
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    osConfiguration: !item["osConfiguration"]
      ? item["osConfiguration"]
      : osConfigurationUnionDeserializer(item["osConfiguration"]),
  };
}

/** Defines the OS configuration. */
export interface OSConfiguration {
  /** The OS Type */
  /** The discriminator possible values: Windows, Linux */
  osType: OSType;
}

export function osConfigurationSerializer(item: OSConfiguration): any {
  return { osType: item["osType"] };
}

export function osConfigurationDeserializer(item: any): OSConfiguration {
  return {
    osType: item["osType"],
  };
}

/** Alias for OSConfigurationUnion */
export type OSConfigurationUnion = WindowsConfiguration | LinuxConfiguration | OSConfiguration;

export function osConfigurationUnionSerializer(item: OSConfigurationUnion): any {
  switch (item.osType) {
    case "Windows":
      return windowsConfigurationSerializer(item as WindowsConfiguration);

    case "Linux":
      return linuxConfigurationSerializer(item as LinuxConfiguration);

    default:
      return osConfigurationSerializer(item);
  }
}

export function osConfigurationUnionDeserializer(item: any): OSConfigurationUnion {
  switch (item.osType) {
    case "Windows":
      return windowsConfigurationDeserializer(item as WindowsConfiguration);

    case "Linux":
      return linuxConfigurationDeserializer(item as LinuxConfiguration);

    default:
      return osConfigurationDeserializer(item);
  }
}

/** The OS Type */
export enum KnownOSType {
  /** Linux OS Type. */
  Linux = "Linux",
  /** Windows OS Type. */
  Windows = "Windows",
}

/**
 * The OS Type \
 * {@link KnownOSType} can be used interchangeably with OSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux OS Type. \
 * **Windows**: Windows OS Type.
 */
export type OSType = string;

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration extends OSConfiguration {
  /** The OS Type */
  osType: "Windows";
}

export function windowsConfigurationSerializer(item: WindowsConfiguration): any {
  return { osType: item["osType"] };
}

export function windowsConfigurationDeserializer(item: any): WindowsConfiguration {
  return {
    osType: item["osType"],
  };
}

/** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://learn.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfiguration extends OSConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. (This property is deprecated, please use 'sshKeyPair' instead) */
  ssh?: SshConfiguration;
  /** The SSH Key-pair used to authenticate with the VM's. */
  sshKeyPair?: SshKeyPair;
  /** The OS Type */
  osType: "Linux";
}

export function linuxConfigurationSerializer(item: LinuxConfiguration): any {
  return {
    osType: item["osType"],
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
    sshKeyPair: !item["sshKeyPair"] ? item["sshKeyPair"] : sshKeyPairSerializer(item["sshKeyPair"]),
  };
}

export function linuxConfigurationDeserializer(item: any): LinuxConfiguration {
  return {
    osType: item["osType"],
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
    sshKeyPair: !item["sshKeyPair"]
      ? item["sshKeyPair"]
      : sshKeyPairDeserializer(item["sshKeyPair"]),
  };
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

export function sshConfigurationSerializer(item: SshConfiguration): any {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArraySerializer(item["publicKeys"]),
  };
}

export function sshConfigurationDeserializer(item: any): SshConfiguration {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArrayDeserializer(item["publicKeys"]),
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

export function sshPublicKeyArrayDeserializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeyDeserializer(item);
  });
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://learn.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { keyData: item["keyData"] };
}

export function sshPublicKeyDeserializer(item: any): SshPublicKey {
  return {
    keyData: item["keyData"],
  };
}

/** The SSH Key-pair used to authenticate with the VM. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://learn.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
export interface SshKeyPair {
  /** SSH public key */
  publicKey?: string;
  /** SSH private key. */
  privateKey?: string;
}

export function sshKeyPairSerializer(item: SshKeyPair): any {
  return { publicKey: item["publicKey"], privateKey: item["privateKey"] };
}

export function sshKeyPairDeserializer(item: any): SshKeyPair {
  return {
    publicKey: item["publicKey"],
    privateKey: item["privateKey"],
  };
}

/** The Disk Configuration Details. */
export interface DiskConfiguration {
  /** The disk configuration for the db volume. For HANA, Required volumes are: ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os'], Optional volume : ['backup']. */
  diskVolumeConfigurations?: Record<string, DiskVolumeConfiguration>;
}

export function diskConfigurationSerializer(item: DiskConfiguration): any {
  return {
    diskVolumeConfigurations: !item["diskVolumeConfigurations"]
      ? item["diskVolumeConfigurations"]
      : diskVolumeConfigurationRecordSerializer(item["diskVolumeConfigurations"]),
  };
}

export function diskConfigurationDeserializer(item: any): DiskConfiguration {
  return {
    diskVolumeConfigurations: !item["diskVolumeConfigurations"]
      ? item["diskVolumeConfigurations"]
      : diskVolumeConfigurationRecordDeserializer(item["diskVolumeConfigurations"]),
  };
}

export function diskVolumeConfigurationRecordSerializer(
  item: Record<string, DiskVolumeConfiguration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : diskVolumeConfigurationSerializer(item[key]);
  });
  return result;
}

export function diskVolumeConfigurationRecordDeserializer(
  item: Record<string, any>,
): Record<string, DiskVolumeConfiguration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : diskVolumeConfigurationDeserializer(item[key]);
  });
  return result;
}

/** The disk configuration required for the selected volume. */
export interface DiskVolumeConfiguration {
  /** The total number of disks required for the concerned volume. */
  count?: number;
  /** The disk size in GB. */
  sizeGB?: number;
  /** The disk SKU details. */
  sku?: DiskSku;
}

export function diskVolumeConfigurationSerializer(item: DiskVolumeConfiguration): any {
  return {
    count: item["count"],
    sizeGB: item["sizeGB"],
    sku: !item["sku"] ? item["sku"] : diskSkuSerializer(item["sku"]),
  };
}

export function diskVolumeConfigurationDeserializer(item: any): DiskVolumeConfiguration {
  return {
    count: item["count"],
    sizeGB: item["sizeGB"],
    sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
  };
}

/** The type of disk sku. For example, Standard_LRS, Standard_ZRS, Premium_LRS, Premium_ZRS. */
export interface DiskSku {
  /** Defines the disk sku name. */
  name?: DiskSkuName;
}

export function diskSkuSerializer(item: DiskSku): any {
  return { name: item["name"] };
}

export function diskSkuDeserializer(item: any): DiskSku {
  return {
    name: item["name"],
  };
}

/** Defines the disk sku name. */
export enum KnownDiskSkuName {
  /** Standard LRS Disk SKU. */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS Disk SKU. */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS Disk SKU. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS Disk SKU. */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS Disk SKU. */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS Disk SKU. */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS Disk SKU. */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Defines the disk sku name. \
 * {@link KnownDiskSkuName} can be used interchangeably with DiskSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard LRS Disk SKU. \
 * **Premium_LRS**: Premium_LRS Disk SKU. \
 * **StandardSSD_LRS**: StandardSSD_LRS Disk SKU. \
 * **UltraSSD_LRS**: UltraSSD_LRS Disk SKU. \
 * **Premium_ZRS**: Premium_ZRS Disk SKU. \
 * **StandardSSD_ZRS**: StandardSSD_ZRS Disk SKU. \
 * **PremiumV2_LRS**: PremiumV2_LRS Disk SKU.
 */
export type DiskSkuName = string;

/** The resource-names input to specify custom names for underlying azure resources that are part of a single server SAP system. */
export interface SingleServerCustomResourceNames {
  /** The naming pattern type. */
  /** The discriminator possible values: FullResourceName */
  namingPatternType: NamingPatternType;
}

export function singleServerCustomResourceNamesSerializer(
  item: SingleServerCustomResourceNames,
): any {
  return { namingPatternType: item["namingPatternType"] };
}

export function singleServerCustomResourceNamesDeserializer(
  item: any,
): SingleServerCustomResourceNames {
  return {
    namingPatternType: item["namingPatternType"],
  };
}

/** Alias for SingleServerCustomResourceNamesUnion */
export type SingleServerCustomResourceNamesUnion =
  | SingleServerFullResourceNames
  | SingleServerCustomResourceNames;

export function singleServerCustomResourceNamesUnionSerializer(
  item: SingleServerCustomResourceNamesUnion,
): any {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return singleServerFullResourceNamesSerializer(item as SingleServerFullResourceNames);

    default:
      return singleServerCustomResourceNamesSerializer(item);
  }
}

export function singleServerCustomResourceNamesUnionDeserializer(
  item: any,
): SingleServerCustomResourceNamesUnion {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return singleServerFullResourceNamesDeserializer(item as SingleServerFullResourceNames);

    default:
      return singleServerCustomResourceNamesDeserializer(item);
  }
}

/** The pattern type to be used for resource naming. */
export enum KnownNamingPatternType {
  /** Full resource names that will be created by service. */
  FullResourceName = "FullResourceName",
}

/**
 * The pattern type to be used for resource naming. \
 * {@link KnownNamingPatternType} can be used interchangeably with NamingPatternType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FullResourceName**: Full resource names that will be created by service.
 */
export type NamingPatternType = string;

/** The resource name object where the specified values will be full resource names of the corresponding resources in a single server SAP system. */
export interface SingleServerFullResourceNames extends SingleServerCustomResourceNames {
  /** The resource names object for virtual machine and related resources. */
  virtualMachine?: VirtualMachineResourceNames;
  /** The pattern type to be used for resource naming. */
  namingPatternType: "FullResourceName";
}

export function singleServerFullResourceNamesSerializer(item: SingleServerFullResourceNames): any {
  return {
    namingPatternType: item["namingPatternType"],
    virtualMachine: !item["virtualMachine"]
      ? item["virtualMachine"]
      : virtualMachineResourceNamesSerializer(item["virtualMachine"]),
  };
}

export function singleServerFullResourceNamesDeserializer(
  item: any,
): SingleServerFullResourceNames {
  return {
    namingPatternType: item["namingPatternType"],
    virtualMachine: !item["virtualMachine"]
      ? item["virtualMachine"]
      : virtualMachineResourceNamesDeserializer(item["virtualMachine"]),
  };
}

/** The resource names object for virtual machine and related resources. */
export interface VirtualMachineResourceNames {
  /** The full name for virtual machine. The length of this field can be upto 64 characters. If name is not provided, service uses a default name based on the deployment type. For SingleServer, default name is {SID}vm. In case of HA-AvZone systems, default name will be {SID}{app/ascs/db}z{a/b}vm with an incrementor at the end in case of more than 1 vm per layer. For distributed and HA-AvSet systems, default name will be {SID}{app/ascs/db}vm with an incrementor at the end in case of more than 1 vm per layer. */
  vmName?: string;
  /** The full name for virtual-machine's host (computer name). Currently, ACSS only supports host names which are less than or equal to 13 characters long. If this value is not provided, vmName will be used as host name. */
  hostName?: string;
  /** The list of network interface name objects for the selected virtual machine. Currently, only one network interface is supported per virtual machine. */
  networkInterfaces?: NetworkInterfaceResourceNames[];
  /** The full name for OS disk attached to the VM. If this value is not provided, it will be named by ARM as per its default naming standards (prefixed with vm name). There is only one OS disk attached per Virtual Machine. */
  osDiskName?: string;
  /** The full resource names for virtual machine data disks. This is a dictionary containing list of names of data disks per volume. Currently supported volumes for database layer are ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os', 'backup']. For application and cs layers, only 'default' volume is supported */
  dataDiskNames?: Record<string, string[]>;
}

export function virtualMachineResourceNamesSerializer(item: VirtualMachineResourceNames): any {
  return {
    vmName: item["vmName"],
    hostName: item["hostName"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceResourceNamesArraySerializer(item["networkInterfaces"]),
    osDiskName: item["osDiskName"],
    dataDiskNames: item["dataDiskNames"],
  };
}

export function virtualMachineResourceNamesDeserializer(item: any): VirtualMachineResourceNames {
  return {
    vmName: item["vmName"],
    hostName: item["hostName"],
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceResourceNamesArrayDeserializer(item["networkInterfaces"]),
    osDiskName: item["osDiskName"],
    dataDiskNames: item["dataDiskNames"],
  };
}

export function networkInterfaceResourceNamesArraySerializer(
  result: Array<NetworkInterfaceResourceNames>,
): any[] {
  return result.map((item) => {
    return networkInterfaceResourceNamesSerializer(item);
  });
}

export function networkInterfaceResourceNamesArrayDeserializer(
  result: Array<NetworkInterfaceResourceNames>,
): any[] {
  return result.map((item) => {
    return networkInterfaceResourceNamesDeserializer(item);
  });
}

/** The resource names object for network interface and related resources. */
export interface NetworkInterfaceResourceNames {
  /** The full name for network interface. If name is not provided, service uses a default name based on the deployment type. For SingleServer, default name is {SID}-Nic. In case of HA-AvZone systems, default name will be {SID}-{App/ASCS/DB}-Zone{A/B}-Nic with an incrementor at the end in case of more than 1 instance per layer. For distributed and HA-AvSet systems, default name will be {SID}-{App/ASCS/DB}-Nic with an incrementor at the end in case of more than 1 instance per layer. */
  networkInterfaceName?: string;
}

export function networkInterfaceResourceNamesSerializer(item: NetworkInterfaceResourceNames): any {
  return { networkInterfaceName: item["networkInterfaceName"] };
}

export function networkInterfaceResourceNamesDeserializer(
  item: any,
): NetworkInterfaceResourceNames {
  return {
    networkInterfaceName: item["networkInterfaceName"],
  };
}

/** Gets or sets the three tier SAP configuration. For prerequisites for creating the infrastructure, please see [here](https://go.microsoft.com/fwlink/?linkid=2212611&amp;clcid=0x409) */
export interface ThreeTierConfiguration extends InfrastructureConfiguration {
  /** Network configuration common to all servers */
  networkConfiguration?: NetworkConfiguration;
  /** The central server configuration. */
  centralServer: CentralServerConfiguration;
  /** The application server configuration. */
  applicationServer: ApplicationServerConfiguration;
  /** The database configuration. */
  databaseServer: DatabaseConfiguration;
  /** The high availability configuration. */
  highAvailabilityConfig?: HighAvailabilityConfiguration;
  /** The storage configuration. */
  storageConfiguration?: StorageConfiguration;
  /** The set of custom names to be used for underlying azure resources that are part of the SAP system. */
  customResourceNames?: ThreeTierCustomResourceNamesUnion;
  /** The type of SAP deployment, ThreeTier in this case. */
  deploymentType: "ThreeTier";
}

export function threeTierConfigurationSerializer(item: ThreeTierConfiguration): any {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationSerializer(item["networkConfiguration"]),
    centralServer: centralServerConfigurationSerializer(item["centralServer"]),
    applicationServer: applicationServerConfigurationSerializer(item["applicationServer"]),
    databaseServer: databaseConfigurationSerializer(item["databaseServer"]),
    highAvailabilityConfig: !item["highAvailabilityConfig"]
      ? item["highAvailabilityConfig"]
      : highAvailabilityConfigurationSerializer(item["highAvailabilityConfig"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationSerializer(item["storageConfiguration"]),
    customResourceNames: !item["customResourceNames"]
      ? item["customResourceNames"]
      : threeTierCustomResourceNamesUnionSerializer(item["customResourceNames"]),
  };
}

export function threeTierConfigurationDeserializer(item: any): ThreeTierConfiguration {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationDeserializer(item["networkConfiguration"]),
    centralServer: centralServerConfigurationDeserializer(item["centralServer"]),
    applicationServer: applicationServerConfigurationDeserializer(item["applicationServer"]),
    databaseServer: databaseConfigurationDeserializer(item["databaseServer"]),
    highAvailabilityConfig: !item["highAvailabilityConfig"]
      ? item["highAvailabilityConfig"]
      : highAvailabilityConfigurationDeserializer(item["highAvailabilityConfig"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationDeserializer(item["storageConfiguration"]),
    customResourceNames: !item["customResourceNames"]
      ? item["customResourceNames"]
      : threeTierCustomResourceNamesUnionDeserializer(item["customResourceNames"]),
  };
}

/** Gets or sets the central server configuration. */
export interface CentralServerConfiguration {
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of central server VMs. */
  instanceCount: number;
}

export function centralServerConfigurationSerializer(item: CentralServerConfiguration): any {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
  };
}

export function centralServerConfigurationDeserializer(item: any): CentralServerConfiguration {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationDeserializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
  };
}

/** Gets or sets the application server configuration. */
export interface ApplicationServerConfiguration {
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of app server instances. */
  instanceCount: number;
}

export function applicationServerConfigurationSerializer(
  item: ApplicationServerConfiguration,
): any {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
  };
}

export function applicationServerConfigurationDeserializer(
  item: any,
): ApplicationServerConfiguration {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationDeserializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
  };
}

/** Gets or sets the database configuration. */
export interface DatabaseConfiguration {
  /** The database type. */
  databaseType?: SAPDatabaseType;
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of database VMs. */
  instanceCount: number;
  /** Gets or sets the disk configuration. */
  diskConfiguration?: DiskConfiguration;
}

export function databaseConfigurationSerializer(item: DatabaseConfiguration): any {
  return {
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
    diskConfiguration: !item["diskConfiguration"]
      ? item["diskConfiguration"]
      : diskConfigurationSerializer(item["diskConfiguration"]),
  };
}

export function databaseConfigurationDeserializer(item: any): DatabaseConfiguration {
  return {
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationDeserializer(
      item["virtualMachineConfiguration"],
    ),
    instanceCount: item["instanceCount"],
    diskConfiguration: !item["diskConfiguration"]
      ? item["diskConfiguration"]
      : diskConfigurationDeserializer(item["diskConfiguration"]),
  };
}

/** Gets or sets the high availability configuration. */
export interface HighAvailabilityConfiguration {
  /** The high availability type. */
  highAvailabilityType: SAPHighAvailabilityType;
}

export function highAvailabilityConfigurationSerializer(item: HighAvailabilityConfiguration): any {
  return { highAvailabilityType: item["highAvailabilityType"] };
}

export function highAvailabilityConfigurationDeserializer(
  item: any,
): HighAvailabilityConfiguration {
  return {
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** The high availability type (AvailabilitySet or AvailabilityZone). */
export enum KnownSAPHighAvailabilityType {
  /** HA deployment with availability sets. */
  AvailabilitySet = "AvailabilitySet",
  /** HA deployment with availability zones. */
  AvailabilityZone = "AvailabilityZone",
}

/**
 * The high availability type (AvailabilitySet or AvailabilityZone). \
 * {@link KnownSAPHighAvailabilityType} can be used interchangeably with SAPHighAvailabilityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AvailabilitySet**: HA deployment with availability sets. \
 * **AvailabilityZone**: HA deployment with availability zones.
 */
export type SAPHighAvailabilityType = string;

/** Gets or sets the storage configuration. */
export interface StorageConfiguration {
  /** The properties of the transport directory attached to the VIS. The default for transportFileShareConfiguration is the createAndMount flow if storage configuration is missing. */
  transportFileShareConfiguration?: FileShareConfigurationUnion;
}

export function storageConfigurationSerializer(item: StorageConfiguration): any {
  return {
    transportFileShareConfiguration: !item["transportFileShareConfiguration"]
      ? item["transportFileShareConfiguration"]
      : fileShareConfigurationUnionSerializer(item["transportFileShareConfiguration"]),
  };
}

export function storageConfigurationDeserializer(item: any): StorageConfiguration {
  return {
    transportFileShareConfiguration: !item["transportFileShareConfiguration"]
      ? item["transportFileShareConfiguration"]
      : fileShareConfigurationUnionDeserializer(item["transportFileShareConfiguration"]),
  };
}

/** File Share configuration details, populated with information on storage configuration mounted on the VIS. The createAndMount option is selected in case of missing input. */
export interface FileShareConfiguration {
  /** The type of file share config, eg: Mount/CreateAndMount/Skip. */
  /** The discriminator possible values: Skip, CreateAndMount, Mount */
  configurationType: FileShareConfigurationType;
}

export function fileShareConfigurationSerializer(item: FileShareConfiguration): any {
  return { configurationType: item["configurationType"] };
}

export function fileShareConfigurationDeserializer(item: any): FileShareConfiguration {
  return {
    configurationType: item["configurationType"],
  };
}

/** Alias for FileShareConfigurationUnion */
export type FileShareConfigurationUnion =
  | SkipFileShareConfiguration
  | CreateAndMountFileShareConfiguration
  | MountFileShareConfiguration
  | FileShareConfiguration;

export function fileShareConfigurationUnionSerializer(item: FileShareConfigurationUnion): any {
  switch (item.configurationType) {
    case "Skip":
      return skipFileShareConfigurationSerializer(item as SkipFileShareConfiguration);

    case "CreateAndMount":
      return createAndMountFileShareConfigurationSerializer(
        item as CreateAndMountFileShareConfiguration,
      );

    case "Mount":
      return mountFileShareConfigurationSerializer(item as MountFileShareConfiguration);

    default:
      return fileShareConfigurationSerializer(item);
  }
}

export function fileShareConfigurationUnionDeserializer(item: any): FileShareConfigurationUnion {
  switch (item.configurationType) {
    case "Skip":
      return skipFileShareConfigurationDeserializer(item as SkipFileShareConfiguration);

    case "CreateAndMount":
      return createAndMountFileShareConfigurationDeserializer(
        item as CreateAndMountFileShareConfiguration,
      );

    case "Mount":
      return mountFileShareConfigurationDeserializer(item as MountFileShareConfiguration);

    default:
      return fileShareConfigurationDeserializer(item);
  }
}

/** The type of file share config. */
export enum KnownFileShareConfigurationType {
  /** Skip creating the file share. */
  Skip = "Skip",
  /** Fileshare will be created and mounted by service. */
  CreateAndMount = "CreateAndMount",
  /** Existing fileshare provided will be mounted by service. */
  Mount = "Mount",
}

/**
 * The type of file share config. \
 * {@link KnownFileShareConfigurationType} can be used interchangeably with FileShareConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Skip**: Skip creating the file share. \
 * **CreateAndMount**: Fileshare will be created and mounted by service. \
 * **Mount**: Existing fileshare provided will be mounted by service.
 */
export type FileShareConfigurationType = string;

/** Gets or sets the file share configuration for scenarios where transport directory fileshare is not created or required. */
export interface SkipFileShareConfiguration extends FileShareConfiguration {
  /** The type of file share config, skip in this case i.e. fileshare is not created or required. */
  configurationType: "Skip";
}

export function skipFileShareConfigurationSerializer(item: SkipFileShareConfiguration): any {
  return { configurationType: item["configurationType"] };
}

export function skipFileShareConfigurationDeserializer(item: any): SkipFileShareConfiguration {
  return {
    configurationType: item["configurationType"],
  };
}

/** Gets or sets the file share configuration where the transport directory fileshare is created and mounted as a part of the create infra flow. Please pre-create the resource group you intend to place the transport directory in. The storage account and fileshare will be auto-created by the ACSS and doesn't need to be pre-created. */
export interface CreateAndMountFileShareConfiguration extends FileShareConfiguration {
  /** The name of transport file share resource group. This should be pre created by the customer. The app rg is used in case of missing input. */
  resourceGroup?: string;
  /** The name of file share storage account name . A custom name is used in case of missing input. */
  storageAccountName?: string;
  /** The type of file share config. */
  configurationType: "CreateAndMount";
}

export function createAndMountFileShareConfigurationSerializer(
  item: CreateAndMountFileShareConfiguration,
): any {
  return {
    configurationType: item["configurationType"],
    resourceGroup: item["resourceGroup"],
    storageAccountName: item["storageAccountName"],
  };
}

export function createAndMountFileShareConfigurationDeserializer(
  item: any,
): CreateAndMountFileShareConfiguration {
  return {
    configurationType: item["configurationType"],
    resourceGroup: item["resourceGroup"],
    storageAccountName: item["storageAccountName"],
  };
}

/** Gets or sets the file share configuration where the transport directory fileshare already exists, and user wishes to mount the fileshare as a part of the create infra flow. */
export interface MountFileShareConfiguration extends FileShareConfiguration {
  /** The fileshare resource ID */
  id: string;
  /** The private endpoint resource ID */
  privateEndpointId: string;
  /** The type of file share config, mount in this case. */
  configurationType: "Mount";
}

export function mountFileShareConfigurationSerializer(item: MountFileShareConfiguration): any {
  return {
    configurationType: item["configurationType"],
    id: item["id"],
    privateEndpointId: item["privateEndpointId"],
  };
}

export function mountFileShareConfigurationDeserializer(item: any): MountFileShareConfiguration {
  return {
    configurationType: item["configurationType"],
    id: item["id"],
    privateEndpointId: item["privateEndpointId"],
  };
}

/** The resource-names input to specify custom names for underlying azure resources that are part of a three tier SAP system. */
export interface ThreeTierCustomResourceNames {
  /** The pattern type to be used for resource naming. */
  /** The discriminator possible values: FullResourceName */
  namingPatternType: NamingPatternType;
}

export function threeTierCustomResourceNamesSerializer(item: ThreeTierCustomResourceNames): any {
  return { namingPatternType: item["namingPatternType"] };
}

export function threeTierCustomResourceNamesDeserializer(item: any): ThreeTierCustomResourceNames {
  return {
    namingPatternType: item["namingPatternType"],
  };
}

/** Alias for ThreeTierCustomResourceNamesUnion */
export type ThreeTierCustomResourceNamesUnion =
  | ThreeTierFullResourceNames
  | ThreeTierCustomResourceNames;

export function threeTierCustomResourceNamesUnionSerializer(
  item: ThreeTierCustomResourceNamesUnion,
): any {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return threeTierFullResourceNamesSerializer(item as ThreeTierFullResourceNames);

    default:
      return threeTierCustomResourceNamesSerializer(item);
  }
}

export function threeTierCustomResourceNamesUnionDeserializer(
  item: any,
): ThreeTierCustomResourceNamesUnion {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return threeTierFullResourceNamesDeserializer(item as ThreeTierFullResourceNames);

    default:
      return threeTierCustomResourceNamesDeserializer(item);
  }
}

/** The resource name object where the specified values will be full resource names of the corresponding resources in a three tier SAP system. */
export interface ThreeTierFullResourceNames extends ThreeTierCustomResourceNames {
  /** The full resource names object for central server layer resources. */
  centralServer?: CentralServerFullResourceNames;
  /** The full resource names object for application layer resources. The number of entries in this list should be equal to the number VMs to be created for application layer. */
  applicationServer?: ApplicationServerFullResourceNames;
  /** The full resource names object for database layer resources. The number of entries in this list should be equal to the number VMs to be created for database layer. */
  databaseServer?: DatabaseServerFullResourceNames;
  /** The resource names object for shared storage. */
  sharedStorage?: SharedStorageResourceNames;
  /** The pattern type to be used for resource naming, FullResourceName in this case. */
  namingPatternType: "FullResourceName";
}

export function threeTierFullResourceNamesSerializer(item: ThreeTierFullResourceNames): any {
  return {
    namingPatternType: item["namingPatternType"],
    centralServer: !item["centralServer"]
      ? item["centralServer"]
      : centralServerFullResourceNamesSerializer(item["centralServer"]),
    applicationServer: !item["applicationServer"]
      ? item["applicationServer"]
      : applicationServerFullResourceNamesSerializer(item["applicationServer"]),
    databaseServer: !item["databaseServer"]
      ? item["databaseServer"]
      : databaseServerFullResourceNamesSerializer(item["databaseServer"]),
    sharedStorage: !item["sharedStorage"]
      ? item["sharedStorage"]
      : sharedStorageResourceNamesSerializer(item["sharedStorage"]),
  };
}

export function threeTierFullResourceNamesDeserializer(item: any): ThreeTierFullResourceNames {
  return {
    namingPatternType: item["namingPatternType"],
    centralServer: !item["centralServer"]
      ? item["centralServer"]
      : centralServerFullResourceNamesDeserializer(item["centralServer"]),
    applicationServer: !item["applicationServer"]
      ? item["applicationServer"]
      : applicationServerFullResourceNamesDeserializer(item["applicationServer"]),
    databaseServer: !item["databaseServer"]
      ? item["databaseServer"]
      : databaseServerFullResourceNamesDeserializer(item["databaseServer"]),
    sharedStorage: !item["sharedStorage"]
      ? item["sharedStorage"]
      : sharedStorageResourceNamesDeserializer(item["sharedStorage"]),
  };
}

/** The full resource names object for central server layer resources. */
export interface CentralServerFullResourceNames {
  /** The list of names for all ASCS virtual machines to be deployed. The number of entries in this list should be equal to the number VMs to be created for ASCS layer. At maximum, there can be two virtual machines at this layer: ASCS and ERS. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-ASCS-AvSet. */
  availabilitySetName?: string;
  /** The resource names object for load balancer and related resources. */
  loadBalancer?: LoadBalancerResourceNames;
}

export function centralServerFullResourceNamesSerializer(
  item: CentralServerFullResourceNames,
): any {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerResourceNamesSerializer(item["loadBalancer"]),
  };
}

export function centralServerFullResourceNamesDeserializer(
  item: any,
): CentralServerFullResourceNames {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerResourceNamesDeserializer(item["loadBalancer"]),
  };
}

export function virtualMachineResourceNamesArraySerializer(
  result: Array<VirtualMachineResourceNames>,
): any[] {
  return result.map((item) => {
    return virtualMachineResourceNamesSerializer(item);
  });
}

export function virtualMachineResourceNamesArrayDeserializer(
  result: Array<VirtualMachineResourceNames>,
): any[] {
  return result.map((item) => {
    return virtualMachineResourceNamesDeserializer(item);
  });
}

/** The resource names object for load balancer and related resources. */
export interface LoadBalancerResourceNames {
  /** The full resource name for load balancer. If this value is not provided, load balancer will be name as {ASCS/DB}-loadBalancer. */
  loadBalancerName?: string;
  /** The list of frontend IP configuration names. If provided as input, size of this list should be 2 for cs layer and should be 1 for database layer. */
  frontendIpConfigurationNames?: string[];
  /** The list of backend pool names. Currently, ACSS deploys only one backend pool and hence, size of this list should be 1 */
  backendPoolNames?: string[];
  /** The list of health probe names. If provided as input, size of this list should be 2 for cs layer and should be 1 for database layer. */
  healthProbeNames?: string[];
}

export function loadBalancerResourceNamesSerializer(item: LoadBalancerResourceNames): any {
  return {
    loadBalancerName: item["loadBalancerName"],
    frontendIpConfigurationNames: !item["frontendIpConfigurationNames"]
      ? item["frontendIpConfigurationNames"]
      : item["frontendIpConfigurationNames"].map((p: any) => {
          return p;
        }),
    backendPoolNames: !item["backendPoolNames"]
      ? item["backendPoolNames"]
      : item["backendPoolNames"].map((p: any) => {
          return p;
        }),
    healthProbeNames: !item["healthProbeNames"]
      ? item["healthProbeNames"]
      : item["healthProbeNames"].map((p: any) => {
          return p;
        }),
  };
}

export function loadBalancerResourceNamesDeserializer(item: any): LoadBalancerResourceNames {
  return {
    loadBalancerName: item["loadBalancerName"],
    frontendIpConfigurationNames: !item["frontendIpConfigurationNames"]
      ? item["frontendIpConfigurationNames"]
      : item["frontendIpConfigurationNames"].map((p: any) => {
          return p;
        }),
    backendPoolNames: !item["backendPoolNames"]
      ? item["backendPoolNames"]
      : item["backendPoolNames"].map((p: any) => {
          return p;
        }),
    healthProbeNames: !item["healthProbeNames"]
      ? item["healthProbeNames"]
      : item["healthProbeNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The full resource names object for application layer resources. The number of entries in this list should be equal to the number VMs to be created for application layer. */
export interface ApplicationServerFullResourceNames {
  /** The list of virtual machine naming details. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-App-AvSet. */
  availabilitySetName?: string;
}

export function applicationServerFullResourceNamesSerializer(
  item: ApplicationServerFullResourceNames,
): any {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
  };
}

export function applicationServerFullResourceNamesDeserializer(
  item: any,
): ApplicationServerFullResourceNames {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
  };
}

/** The full resource names object for database layer resources. The number of entries in this list should be equal to the number VMs to be created for database layer. */
export interface DatabaseServerFullResourceNames {
  /** The list of virtual machine naming details. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-DB-AvSet. */
  availabilitySetName?: string;
  /** The resource names object for load balancer and related resources. */
  loadBalancer?: LoadBalancerResourceNames;
}

export function databaseServerFullResourceNamesSerializer(
  item: DatabaseServerFullResourceNames,
): any {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArraySerializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerResourceNamesSerializer(item["loadBalancer"]),
  };
}

export function databaseServerFullResourceNamesDeserializer(
  item: any,
): DatabaseServerFullResourceNames {
  return {
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : virtualMachineResourceNamesArrayDeserializer(item["virtualMachines"]),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerResourceNamesDeserializer(item["loadBalancer"]),
  };
}

/** The resource names object for shared storage. */
export interface SharedStorageResourceNames {
  /** The full name of the shared storage account. If it is not provided, it will be defaulted to {SID}nfs{guid of 15 chars}. */
  sharedStorageAccountName?: string;
  /** The full name of private end point for the shared storage account. If it is not provided, it will be defaulted to {storageAccountName}_pe */
  sharedStorageAccountPrivateEndPointName?: string;
}

export function sharedStorageResourceNamesSerializer(item: SharedStorageResourceNames): any {
  return {
    sharedStorageAccountName: item["sharedStorageAccountName"],
    sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
  };
}

export function sharedStorageResourceNamesDeserializer(item: any): SharedStorageResourceNames {
  return {
    sharedStorageAccountName: item["sharedStorageAccountName"],
    sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
  };
}

/** The SAP Software configuration Input. */
export interface SoftwareConfiguration {
  /** The SAP software installation type. */
  /** The discriminator possible values: ServiceInitiated, SAPInstallWithoutOSConfig, External */
  softwareInstallationType: SAPSoftwareInstallationType;
}

export function softwareConfigurationSerializer(item: SoftwareConfiguration): any {
  return { softwareInstallationType: item["softwareInstallationType"] };
}

export function softwareConfigurationDeserializer(item: any): SoftwareConfiguration {
  return {
    softwareInstallationType: item["softwareInstallationType"],
  };
}

/** Alias for SoftwareConfigurationUnion */
export type SoftwareConfigurationUnion =
  | ServiceInitiatedSoftwareConfiguration
  | SAPInstallWithoutOSConfigSoftwareConfiguration
  | ExternalInstallationSoftwareConfiguration
  | SoftwareConfiguration;

export function softwareConfigurationUnionSerializer(item: SoftwareConfigurationUnion): any {
  switch (item.softwareInstallationType) {
    case "ServiceInitiated":
      return serviceInitiatedSoftwareConfigurationSerializer(
        item as ServiceInitiatedSoftwareConfiguration,
      );

    case "SAPInstallWithoutOSConfig":
      return sapInstallWithoutOSConfigSoftwareConfigurationSerializer(
        item as SAPInstallWithoutOSConfigSoftwareConfiguration,
      );

    case "External":
      return externalInstallationSoftwareConfigurationSerializer(
        item as ExternalInstallationSoftwareConfiguration,
      );

    default:
      return softwareConfigurationSerializer(item);
  }
}

export function softwareConfigurationUnionDeserializer(item: any): SoftwareConfigurationUnion {
  switch (item.softwareInstallationType) {
    case "ServiceInitiated":
      return serviceInitiatedSoftwareConfigurationDeserializer(
        item as ServiceInitiatedSoftwareConfiguration,
      );

    case "SAPInstallWithoutOSConfig":
      return sapInstallWithoutOSConfigSoftwareConfigurationDeserializer(
        item as SAPInstallWithoutOSConfigSoftwareConfiguration,
      );

    case "External":
      return externalInstallationSoftwareConfigurationDeserializer(
        item as ExternalInstallationSoftwareConfiguration,
      );

    default:
      return softwareConfigurationDeserializer(item);
  }
}

/** The SAP software installation Type. */
export enum KnownSAPSoftwareInstallationType {
  /** SAP Install managed by service. */
  ServiceInitiated = "ServiceInitiated",
  /** SAP Install without OS Config. */
  SAPInstallWithoutOSConfig = "SAPInstallWithoutOSConfig",
  /** External software installation type. */
  External = "External",
}

/**
 * The SAP software installation Type. \
 * {@link KnownSAPSoftwareInstallationType} can be used interchangeably with SAPSoftwareInstallationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceInitiated**: SAP Install managed by service. \
 * **SAPInstallWithoutOSConfig**: SAP Install without OS Config. \
 * **External**: External software installation type.
 */
export type SAPSoftwareInstallationType = string;

/** The SAP Software configuration Input when the software is to be installed by service. */
export interface ServiceInitiatedSoftwareConfiguration extends SoftwareConfiguration {
  /** The URL to the SAP Build of Materials(BOM) file. */
  bomUrl: string;
  /** The software version to install. */
  softwareVersion: string;
  /** The SAP bits storage account id. */
  sapBitsStorageAccountId: string;
  /** The FQDN to set for the SAP system during install. */
  sapFqdn: string;
  /** The SSH private key. */
  sshPrivateKey: string;
  /** Gets or sets the HA software configuration. */
  highAvailabilitySoftwareConfiguration?: HighAvailabilitySoftwareConfiguration;
  /** The SAP software installation Type, service initiated in this case. */
  softwareInstallationType: "ServiceInitiated";
}

export function serviceInitiatedSoftwareConfigurationSerializer(
  item: ServiceInitiatedSoftwareConfiguration,
): any {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    softwareVersion: item["softwareVersion"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    sapFqdn: item["sapFqdn"],
    sshPrivateKey: item["sshPrivateKey"],
    highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
      ? item["highAvailabilitySoftwareConfiguration"]
      : highAvailabilitySoftwareConfigurationSerializer(
          item["highAvailabilitySoftwareConfiguration"],
        ),
  };
}

export function serviceInitiatedSoftwareConfigurationDeserializer(
  item: any,
): ServiceInitiatedSoftwareConfiguration {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    softwareVersion: item["softwareVersion"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    sapFqdn: item["sapFqdn"],
    sshPrivateKey: item["sshPrivateKey"],
    highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
      ? item["highAvailabilitySoftwareConfiguration"]
      : highAvailabilitySoftwareConfigurationDeserializer(
          item["highAvailabilitySoftwareConfiguration"],
        ),
  };
}

/** Gets or sets the HA software configuration. */
export interface HighAvailabilitySoftwareConfiguration {
  /** The fencing client id. */
  fencingClientId: string;
  /** The fencing client id secret/password. The secret should never expire. This will be used pacemaker to start/stop the cluster VMs. */
  fencingClientPassword: string;
}

export function highAvailabilitySoftwareConfigurationSerializer(
  item: HighAvailabilitySoftwareConfiguration,
): any {
  return {
    fencingClientId: item["fencingClientId"],
    fencingClientPassword: item["fencingClientPassword"],
  };
}

export function highAvailabilitySoftwareConfigurationDeserializer(
  item: any,
): HighAvailabilitySoftwareConfiguration {
  return {
    fencingClientId: item["fencingClientId"],
    fencingClientPassword: item["fencingClientPassword"],
  };
}

/** The SAP Software configuration Input when the software is to be installed by service without OS Configurations */
export interface SAPInstallWithoutOSConfigSoftwareConfiguration extends SoftwareConfiguration {
  /** The URL to the SAP Build of Materials(BOM) file. */
  bomUrl: string;
  /** The SAP bits storage account id. */
  sapBitsStorageAccountId: string;
  /** The software version to install. */
  softwareVersion: string;
  /** Gets or sets the HA software configuration. */
  highAvailabilitySoftwareConfiguration?: HighAvailabilitySoftwareConfiguration;
  /** The SAP software installation Type. */
  softwareInstallationType: "SAPInstallWithoutOSConfig";
}

export function sapInstallWithoutOSConfigSoftwareConfigurationSerializer(
  item: SAPInstallWithoutOSConfigSoftwareConfiguration,
): any {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    softwareVersion: item["softwareVersion"],
    highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
      ? item["highAvailabilitySoftwareConfiguration"]
      : highAvailabilitySoftwareConfigurationSerializer(
          item["highAvailabilitySoftwareConfiguration"],
        ),
  };
}

export function sapInstallWithoutOSConfigSoftwareConfigurationDeserializer(
  item: any,
): SAPInstallWithoutOSConfigSoftwareConfiguration {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    softwareVersion: item["softwareVersion"],
    highAvailabilitySoftwareConfiguration: !item["highAvailabilitySoftwareConfiguration"]
      ? item["highAvailabilitySoftwareConfiguration"]
      : highAvailabilitySoftwareConfigurationDeserializer(
          item["highAvailabilitySoftwareConfiguration"],
        ),
  };
}

/** The SAP Software configuration Input when the software is installed externally outside the service. */
export interface ExternalInstallationSoftwareConfiguration extends SoftwareConfiguration {
  /** The resource ID of the virtual machine containing the central server instance. */
  centralServerVmId?: string;
  /** The SAP software installation Type. */
  softwareInstallationType: "External";
}

export function externalInstallationSoftwareConfigurationSerializer(
  item: ExternalInstallationSoftwareConfiguration,
): any {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    centralServerVmId: item["centralServerVmId"],
  };
}

export function externalInstallationSoftwareConfigurationDeserializer(
  item: any,
): ExternalInstallationSoftwareConfiguration {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    centralServerVmId: item["centralServerVmId"],
  };
}

/** Deployment along with OS Configuration. */
export interface DeploymentWithOSConfiguration extends SAPConfiguration {
  /** The geo-location where the SAP system is to be created. */
  appLocation?: string;
  /** The infrastructure configuration. */
  infrastructureConfiguration?: InfrastructureConfigurationUnion;
  /** The software configuration. */
  softwareConfiguration?: SoftwareConfigurationUnion;
  /** The OS and SAP configuration. */
  osSapConfiguration?: OsSapConfiguration;
  /** The configuration Type. */
  configurationType: "DeploymentWithOSConfig";
}

export function deploymentWithOSConfigurationSerializer(item: DeploymentWithOSConfiguration): any {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item["infrastructureConfiguration"]
      ? item["infrastructureConfiguration"]
      : infrastructureConfigurationUnionSerializer(item["infrastructureConfiguration"]),
    softwareConfiguration: !item["softwareConfiguration"]
      ? item["softwareConfiguration"]
      : softwareConfigurationUnionSerializer(item["softwareConfiguration"]),
    osSapConfiguration: !item["osSapConfiguration"]
      ? item["osSapConfiguration"]
      : osSapConfigurationSerializer(item["osSapConfiguration"]),
  };
}

export function deploymentWithOSConfigurationDeserializer(
  item: any,
): DeploymentWithOSConfiguration {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item["infrastructureConfiguration"]
      ? item["infrastructureConfiguration"]
      : infrastructureConfigurationUnionDeserializer(item["infrastructureConfiguration"]),
    softwareConfiguration: !item["softwareConfiguration"]
      ? item["softwareConfiguration"]
      : softwareConfigurationUnionDeserializer(item["softwareConfiguration"]),
    osSapConfiguration: !item["osSapConfiguration"]
      ? item["osSapConfiguration"]
      : osSapConfigurationDeserializer(item["osSapConfiguration"]),
  };
}

/** Defines the OS and SAP Configurations for Deployment */
export interface OsSapConfiguration {
  /** The url and storage account ID where deployer VM packages are uploaded */
  deployerVmPackages?: DeployerVmPackages;
  /** The FQDN to set for the SAP system */
  sapFqdn?: string;
}

export function osSapConfigurationSerializer(item: OsSapConfiguration): any {
  return {
    deployerVmPackages: !item["deployerVmPackages"]
      ? item["deployerVmPackages"]
      : deployerVmPackagesSerializer(item["deployerVmPackages"]),
    sapFqdn: item["sapFqdn"],
  };
}

export function osSapConfigurationDeserializer(item: any): OsSapConfiguration {
  return {
    deployerVmPackages: !item["deployerVmPackages"]
      ? item["deployerVmPackages"]
      : deployerVmPackagesDeserializer(item["deployerVmPackages"]),
    sapFqdn: item["sapFqdn"],
  };
}

/** Defines the url and storage account ID where deployer VM packages are uploaded */
export interface DeployerVmPackages {
  /** The URL to the deployer VM packages file. */
  url?: string;
  /** The deployer VM packages storage account id */
  storageAccountId?: string;
}

export function deployerVmPackagesSerializer(item: DeployerVmPackages): any {
  return { url: item["url"], storageAccountId: item["storageAccountId"] };
}

export function deployerVmPackagesDeserializer(item: any): DeployerVmPackages {
  return {
    url: item["url"],
    storageAccountId: item["storageAccountId"],
  };
}

/** Managed resource group configuration */
export interface ManagedRGConfiguration {
  /** Managed resource group name */
  name?: string;
}

export function managedRGConfigurationSerializer(item: ManagedRGConfiguration): any {
  return { name: item["name"] };
}

export function managedRGConfigurationDeserializer(item: any): ManagedRGConfiguration {
  return {
    name: item["name"],
  };
}

/** Defines the SAP Instance status. */
export enum KnownSAPVirtualInstanceStatus {
  /** SAP system is getting started. */
  Starting = "Starting",
  /** SAP system is running. */
  Running = "Running",
  /** SAP system is being stopped. */
  Stopping = "Stopping",
  /** SAP system is offline. */
  Offline = "Offline",
  /** SAP system is partially running. */
  PartiallyRunning = "PartiallyRunning",
  /** SAP system status is unavailable. */
  Unavailable = "Unavailable",
  /** Soft shutdown of SAP system is initiated. */
  SoftShutdown = "SoftShutdown",
}

/**
 * Defines the SAP Instance status. \
 * {@link KnownSAPVirtualInstanceStatus} can be used interchangeably with SAPVirtualInstanceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: SAP system is getting started. \
 * **Running**: SAP system is running. \
 * **Stopping**: SAP system is being stopped. \
 * **Offline**: SAP system is offline. \
 * **PartiallyRunning**: SAP system is partially running. \
 * **Unavailable**: SAP system status is unavailable. \
 * **SoftShutdown**: Soft shutdown of SAP system is initiated.
 */
export type SAPVirtualInstanceStatus = string;

/** Defines the health of SAP Instances. */
export enum KnownSAPHealthState {
  /** SAP System health is unknown. */
  Unknown = "Unknown",
  /** SAP System health is healthy. */
  Healthy = "Healthy",
  /** SAP System is unhealthy. */
  Unhealthy = "Unhealthy",
  /** SAP System health is degraded. */
  Degraded = "Degraded",
}

/**
 * Defines the health of SAP Instances. \
 * {@link KnownSAPHealthState} can be used interchangeably with SAPHealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: SAP System health is unknown. \
 * **Healthy**: SAP System health is healthy. \
 * **Unhealthy**: SAP System is unhealthy. \
 * **Degraded**: SAP System health is degraded.
 */
export type SAPHealthState = string;

/** Defines the Virtual Instance for SAP state. */
export enum KnownSAPVirtualInstanceState {
  /** Infrastructure is not yet deployed. */
  InfrastructureDeploymentPending = "InfrastructureDeploymentPending",
  /** Infrastructure deployment is in progress. */
  InfrastructureDeploymentInProgress = "InfrastructureDeploymentInProgress",
  /** Infrastructure deployment has failed. */
  InfrastructureDeploymentFailed = "InfrastructureDeploymentFailed",
  /** Infrastructure deployment is successful. Software installation is pending. */
  SoftwareInstallationPending = "SoftwareInstallationPending",
  /** Software installation is in progress. */
  SoftwareInstallationInProgress = "SoftwareInstallationInProgress",
  /** Software installation failed. */
  SoftwareInstallationFailed = "SoftwareInstallationFailed",
  /** Software detection is in progress. */
  SoftwareDetectionInProgress = "SoftwareDetectionInProgress",
  /** Software detection failed. */
  SoftwareDetectionFailed = "SoftwareDetectionFailed",
  /** Registration has not started. */
  DiscoveryPending = "DiscoveryPending",
  /** Registration is in progress. */
  DiscoveryInProgress = "DiscoveryInProgress",
  /** Registration has failed. */
  DiscoveryFailed = "DiscoveryFailed",
  /** Registration is complete. */
  RegistrationComplete = "RegistrationComplete",
  /** ACSS installation cannot proceed. */
  AcssInstallationBlocked = "ACSSInstallationBlocked",
}

/**
 * Defines the Virtual Instance for SAP state. \
 * {@link KnownSAPVirtualInstanceState} can be used interchangeably with SAPVirtualInstanceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InfrastructureDeploymentPending**: Infrastructure is not yet deployed. \
 * **InfrastructureDeploymentInProgress**: Infrastructure deployment is in progress. \
 * **InfrastructureDeploymentFailed**: Infrastructure deployment has failed. \
 * **SoftwareInstallationPending**: Infrastructure deployment is successful. Software installation is pending. \
 * **SoftwareInstallationInProgress**: Software installation is in progress. \
 * **SoftwareInstallationFailed**: Software installation failed. \
 * **SoftwareDetectionInProgress**: Software detection is in progress. \
 * **SoftwareDetectionFailed**: Software detection failed. \
 * **DiscoveryPending**: Registration has not started. \
 * **DiscoveryInProgress**: Registration is in progress. \
 * **DiscoveryFailed**: Registration has failed. \
 * **RegistrationComplete**: Registration is complete. \
 * **ACSSInstallationBlocked**: ACSS installation cannot proceed.
 */
export type SAPVirtualInstanceState = string;

/** Defines the provisioning states. */
export enum KnownSapVirtualInstanceProvisioningState {
  /** ACSS succeeded provisioning state. */
  Succeeded = "Succeeded",
  /** ACSS updating provisioning state. */
  Updating = "Updating",
  /** ACSS Creating provisioning state. */
  Creating = "Creating",
  /** ACSS Failed provisioning state. */
  Failed = "Failed",
  /** ACSS Deleting provisioning state. */
  Deleting = "Deleting",
  /** ACSS Canceled provisioning state. */
  Canceled = "Canceled",
}

/**
 * Defines the provisioning states. \
 * {@link KnownSapVirtualInstanceProvisioningState} can be used interchangeably with SapVirtualInstanceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: ACSS succeeded provisioning state. \
 * **Updating**: ACSS updating provisioning state. \
 * **Creating**: ACSS Creating provisioning state. \
 * **Failed**: ACSS Failed provisioning state. \
 * **Deleting**: ACSS Deleting provisioning state. \
 * **Canceled**: ACSS Canceled provisioning state.
 */
export type SapVirtualInstanceProvisioningState = string;

/** An error response from the Virtual Instance for SAP Workload service. */
export interface SAPVirtualInstanceError {
  /** The Virtual Instance for SAP error body. */
  properties?: ErrorDefinition;
}

export function sapVirtualInstanceErrorDeserializer(item: any): SAPVirtualInstanceError {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : errorDefinitionDeserializer(item["properties"]),
  };
}

/** Error definition. */
export interface ErrorDefinition {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
  /** Internal error details. */
  readonly details?: ErrorDefinition[];
}

export function errorDefinitionDeserializer(item: any): ErrorDefinition {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : errorDefinitionArrayDeserializer(item["details"]),
  };
}

export function errorDefinitionArrayDeserializer(result: Array<ErrorDefinition>): any[] {
  return result.map((item) => {
    return errorDefinitionDeserializer(item);
  });
}

/** Managed service identity (user assigned identities) */
export interface SAPVirtualInstanceIdentity {
  /** The type of managed identity assigned to this resource. */
  type: SAPVirtualInstanceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function sapVirtualInstanceIdentitySerializer(item: SAPVirtualInstanceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function sapVirtualInstanceIdentityDeserializer(item: any): SAPVirtualInstanceIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** Type of managed service identity (where only None and UserAssigned types are allowed). */
export enum KnownSAPVirtualInstanceIdentityType {
  /** No managed identity. */
  None = "None",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
}

/**
 * Type of managed service identity (where only None and UserAssigned types are allowed). \
 * {@link KnownSAPVirtualInstanceIdentityType} can be used interchangeably with SAPVirtualInstanceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **UserAssigned**: User assigned managed identity.
 */
export type SAPVirtualInstanceIdentityType = string;

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

/** Defines the request body for updating Virtual Instance for SAP. */
export interface UpdateSAPVirtualInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
  /** Managed service identity (user assigned identities) */
  identity?: SAPVirtualInstanceIdentity;
  /** The update properties. */
  properties?: UpdateSAPVirtualInstanceProperties;
}

export function updateSAPVirtualInstanceRequestSerializer(
  item: UpdateSAPVirtualInstanceRequest,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : sapVirtualInstanceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : updateSAPVirtualInstancePropertiesSerializer(item["properties"]),
  };
}

/** Defines the update request body properties for updating Virtual Instance for SAP. */
export interface UpdateSAPVirtualInstanceProperties {
  /** Specifies the network access configuration for the resources that will be deployed in the Managed Resource Group. The options to choose from are Public and Private. If 'Private' is chosen, the Storage Account service tag should be enabled on the subnets in which the SAP VMs exist. This is required for establishing connectivity between VM extensions and the managed resource group storage account. This setting is currently applicable only to Storage Account. Learn more here https://go.microsoft.com/fwlink/?linkid=2247228 */
  managedResourcesNetworkAccessType?: ManagedResourcesNetworkAccessType;
}

export function updateSAPVirtualInstancePropertiesSerializer(
  item: UpdateSAPVirtualInstanceProperties,
): any {
  return {
    managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
  };
}

/** The response of a SAPVirtualInstance list operation. */
export interface _SAPVirtualInstanceListResult {
  /** The SAPVirtualInstance items on this page */
  value: SAPVirtualInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sapVirtualInstanceListResultDeserializer(
  item: any,
): _SAPVirtualInstanceListResult {
  return {
    value: sapVirtualInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sapVirtualInstanceArraySerializer(result: Array<SAPVirtualInstance>): any[] {
  return result.map((item) => {
    return sapVirtualInstanceSerializer(item);
  });
}

export function sapVirtualInstanceArrayDeserializer(result: Array<SAPVirtualInstance>): any[] {
  return result.map((item) => {
    return sapVirtualInstanceDeserializer(item);
  });
}

/** Start SAP instance(s) request body. */
export interface StartRequest {
  /** The boolean value indicates whether to start the virtual machines before starting the SAP instances. */
  startVm?: boolean;
}

export function startRequestSerializer(item: StartRequest): any {
  return { startVm: item["startVm"] };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** Stop SAP instance(s) request body. */
export interface StopRequest {
  /** This parameter defines how long (in seconds) the soft shutdown waits until the RFC/HTTP clients no longer consider the server for calls with load balancing. Value 0 means that the kernel does not wait, but goes directly into the next shutdown state, i.e. hard stop. */
  softStopTimeoutSeconds?: number;
  /** The boolean value indicates whether to Stop and deallocate the virtual machines along with the SAP instances. */
  deallocateVm?: boolean;
}

export function stopRequestSerializer(item: StopRequest): any {
  return {
    softStopTimeoutSeconds: item["softStopTimeoutSeconds"],
    deallocateVm: item["deallocateVm"],
  };
}

/** The SAP Sizing Recommendation request. */
export interface SAPSizingRecommendationRequest {
  /** The geo-location where the resource is to be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The SAP Application Performance Standard measurement. */
  saps: number;
  /** The database memory configuration. */
  dbMemory: number;
  /** The database type. */
  databaseType: SAPDatabaseType;
  /** The DB scale method. */
  dbScaleMethod?: SAPDatabaseScaleMethod;
  /** The high availability type. */
  highAvailabilityType?: SAPHighAvailabilityType;
}

export function sapSizingRecommendationRequestSerializer(
  item: SAPSizingRecommendationRequest,
): any {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    deploymentType: item["deploymentType"],
    saps: item["saps"],
    dbMemory: item["dbMemory"],
    databaseType: item["databaseType"],
    dbScaleMethod: item["dbScaleMethod"],
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** The database scale method. */
export enum KnownSAPDatabaseScaleMethod {
  /** ScaleUp Hana Database deployment type */
  ScaleUp = "ScaleUp",
}

/**
 * The database scale method. \
 * {@link KnownSAPDatabaseScaleMethod} can be used interchangeably with SAPDatabaseScaleMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ScaleUp**: ScaleUp Hana Database deployment type
 */
export type SAPDatabaseScaleMethod = string;

/** The SAP sizing recommendation result. */
export interface SAPSizingRecommendationResult {
  /** The deployment type. Eg: SingleServer/ThreeTier */
  /** The discriminator possible values: SingleServer, ThreeTier */
  deploymentType: SAPDeploymentType;
}

export function sapSizingRecommendationResultDeserializer(
  item: any,
): SAPSizingRecommendationResult {
  return {
    deploymentType: item["deploymentType"],
  };
}

/** Alias for SAPSizingRecommendationResultUnion */
export type SAPSizingRecommendationResultUnion =
  | SingleServerRecommendationResult
  | ThreeTierRecommendationResult
  | SAPSizingRecommendationResult;

export function sapSizingRecommendationResultUnionDeserializer(
  item: any,
): SAPSizingRecommendationResultUnion {
  switch (item.deploymentType) {
    case "SingleServer":
      return singleServerRecommendationResultDeserializer(item as SingleServerRecommendationResult);

    case "ThreeTier":
      return threeTierRecommendationResultDeserializer(item as ThreeTierRecommendationResult);

    default:
      return sapSizingRecommendationResultDeserializer(item);
  }
}

/** The recommended configuration for a single server SAP system. */
export interface SingleServerRecommendationResult extends SAPSizingRecommendationResult {
  /** The recommended VM SKU for single server. */
  vmSku?: string;
  /** The single server SAP deployment type. */
  deploymentType: "SingleServer";
}

export function singleServerRecommendationResultDeserializer(
  item: any,
): SingleServerRecommendationResult {
  return {
    deploymentType: item["deploymentType"],
    vmSku: item["vmSku"],
  };
}

/** The recommended configuration for a three tier SAP system. */
export interface ThreeTierRecommendationResult extends SAPSizingRecommendationResult {
  /** The database VM SKU. */
  dbVmSku?: string;
  /** The database server instance count. */
  databaseInstanceCount?: number;
  /** The central server VM SKU. */
  centralServerVmSku?: string;
  /** The central server instance count. */
  centralServerInstanceCount?: number;
  /** The application server VM SKU. */
  applicationServerVmSku?: string;
  /** The application server instance count. */
  applicationServerInstanceCount?: number;
  /** The three tier SAP deployment type. */
  deploymentType: "ThreeTier";
}

export function threeTierRecommendationResultDeserializer(
  item: any,
): ThreeTierRecommendationResult {
  return {
    deploymentType: item["deploymentType"],
    dbVmSku: item["dbVmSku"],
    databaseInstanceCount: item["databaseInstanceCount"],
    centralServerVmSku: item["centralServerVmSku"],
    centralServerInstanceCount: item["centralServerInstanceCount"],
    applicationServerVmSku: item["applicationServerVmSku"],
    applicationServerInstanceCount: item["applicationServerInstanceCount"],
  };
}

/** The SAP request to get list of supported SKUs. */
export interface SAPSupportedSkusRequest {
  /** The geo-location where the resource is to be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
  /** The high availability type. */
  highAvailabilityType?: SAPHighAvailabilityType;
}

export function sapSupportedSkusRequestSerializer(item: SAPSupportedSkusRequest): any {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    deploymentType: item["deploymentType"],
    databaseType: item["databaseType"],
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** The list of supported SKUs for different resources which are part of SAP deployment. */
export interface SAPSupportedResourceSkusResult {
  /** Gets the list of SAP supported SKUs. */
  supportedSkus?: SAPSupportedSku[];
}

export function sapSupportedResourceSkusResultDeserializer(
  item: any,
): SAPSupportedResourceSkusResult {
  return {
    supportedSkus: !item["supportedSkus"]
      ? item["supportedSkus"]
      : sapSupportedSkuArrayDeserializer(item["supportedSkus"]),
  };
}

export function sapSupportedSkuArrayDeserializer(result: Array<SAPSupportedSku>): any[] {
  return result.map((item) => {
    return sapSupportedSkuDeserializer(item);
  });
}

/** The SAP supported SKU. */
export interface SAPSupportedSku {
  /** The VM Sku. */
  vmSku?: string;
  /** True if the Sku is certified for App server in the SAP system. */
  isAppServerCertified?: boolean;
  /** True if the Sku is certified for Database server in the SAP system. */
  isDatabaseCertified?: boolean;
}

export function sapSupportedSkuDeserializer(item: any): SAPSupportedSku {
  return {
    vmSku: item["vmSku"],
    isAppServerCertified: item["isAppServerCertified"],
    isDatabaseCertified: item["isDatabaseCertified"],
  };
}

/** The SAP request to get list of disk configurations. */
export interface SAPDiskConfigurationsRequest {
  /** The geo-location where the SAP resources will be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The VM SKU for database instance. */
  dbVmSku: string;
}

export function sapDiskConfigurationsRequestSerializer(item: SAPDiskConfigurationsRequest): any {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    databaseType: item["databaseType"],
    deploymentType: item["deploymentType"],
    dbVmSku: item["dbVmSku"],
  };
}

/** The list of disk configuration for vmSku which are part of SAP deployment. */
export interface SAPDiskConfigurationsResult {
  /** The disk configuration for the db volume. For HANA, Required volumes are: ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os'], Optional volume : ['backup']. */
  volumeConfigurations?: Record<string, SAPDiskConfiguration>;
}

export function sapDiskConfigurationsResultDeserializer(item: any): SAPDiskConfigurationsResult {
  return {
    volumeConfigurations: !item["volumeConfigurations"]
      ? item["volumeConfigurations"]
      : sapDiskConfigurationRecordDeserializer(item["volumeConfigurations"]),
  };
}

export function sapDiskConfigurationRecordDeserializer(
  item: Record<string, any>,
): Record<string, SAPDiskConfiguration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : sapDiskConfigurationDeserializer(item[key]);
  });
  return result;
}

/** The SAP Disk Configuration contains 'recommended disk' details and list of supported disks detail for a volume type. */
export interface SAPDiskConfiguration {
  /** The recommended disk details for a given VM Sku. */
  recommendedConfiguration?: DiskVolumeConfiguration;
  /** The list of supported disks for a given VM Sku. */
  supportedConfigurations?: DiskDetails[];
}

export function sapDiskConfigurationDeserializer(item: any): SAPDiskConfiguration {
  return {
    recommendedConfiguration: !item["recommendedConfiguration"]
      ? item["recommendedConfiguration"]
      : diskVolumeConfigurationDeserializer(item["recommendedConfiguration"]),
    supportedConfigurations: !item["supportedConfigurations"]
      ? item["supportedConfigurations"]
      : diskDetailsArrayDeserializer(item["supportedConfigurations"]),
  };
}

export function diskDetailsArrayDeserializer(result: Array<DiskDetails>): any[] {
  return result.map((item) => {
    return diskDetailsDeserializer(item);
  });
}

/** The supported disk size details for a disk type. */
export interface DiskDetails {
  /** The type of disk sku. For example, Standard_LRS, Standard_ZRS, Premium_LRS, Premium_ZRS. */
  sku?: DiskSku;
  /** The disk size in GB. */
  sizeGB?: number;
  /** The minimum supported disk count. */
  minimumSupportedDiskCount?: number;
  /** The maximum supported disk count. */
  maximumSupportedDiskCount?: number;
  /** The disk Iops. */
  iopsReadWrite?: number;
  /** The disk provisioned throughput in MBps. */
  mbpsReadWrite?: number;
  /** The disk tier, e.g. P10, E10. */
  diskTier?: string;
}

export function diskDetailsDeserializer(item: any): DiskDetails {
  return {
    sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
    sizeGB: item["sizeGB"],
    minimumSupportedDiskCount: item["minimumSupportedDiskCount"],
    maximumSupportedDiskCount: item["maximumSupportedDiskCount"],
    iopsReadWrite: item["iopsReadWrite"],
    mbpsReadWrite: item["mbpsReadWrite"],
    diskTier: item["diskTier"],
  };
}

/** The SAP request to get list of availability zones. */
export interface SAPAvailabilityZoneDetailsRequest {
  /** The geo-location where the SAP resources will be created. */
  appLocation: string;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
}

export function sapAvailabilityZoneDetailsRequestSerializer(
  item: SAPAvailabilityZoneDetailsRequest,
): any {
  return {
    appLocation: item["appLocation"],
    sapProduct: item["sapProduct"],
    databaseType: item["databaseType"],
  };
}

/** The list of supported availability zone pairs which are part of SAP HA deployment. */
export interface SAPAvailabilityZoneDetailsResult {
  /** Gets the list of availability zone pairs. */
  availabilityZonePairs?: SAPAvailabilityZonePair[];
}

export function sapAvailabilityZoneDetailsResultDeserializer(
  item: any,
): SAPAvailabilityZoneDetailsResult {
  return {
    availabilityZonePairs: !item["availabilityZonePairs"]
      ? item["availabilityZonePairs"]
      : sapAvailabilityZonePairArrayDeserializer(item["availabilityZonePairs"]),
  };
}

export function sapAvailabilityZonePairArrayDeserializer(
  result: Array<SAPAvailabilityZonePair>,
): any[] {
  return result.map((item) => {
    return sapAvailabilityZonePairDeserializer(item);
  });
}

/** The SAP Availability Zone Pair. */
export interface SAPAvailabilityZonePair {
  /** The zone A. */
  zoneA?: number;
  /** The zone B. */
  zoneB?: number;
}

export function sapAvailabilityZonePairDeserializer(item: any): SAPAvailabilityZonePair {
  return {
    zoneA: item["zoneA"],
    zoneB: item["zoneB"],
  };
}

/** Define the SAP Central Services Instance resource. */
export interface SAPCentralServerInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPCentralServerProperties;
}

export function sapCentralServerInstanceSerializer(item: SAPCentralServerInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sapCentralServerPropertiesSerializer(item["properties"]),
  };
}

export function sapCentralServerInstanceDeserializer(item: any): SAPCentralServerInstance {
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
      : sapCentralServerPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the SAP Central Services Instance properties. */
export interface SAPCentralServerProperties {
  /** The central services instance number. */
  readonly instanceNo?: string;
  /** The central services instance subnet. */
  readonly subnet?: string;
  /** Defines the SAP message server properties. */
  messageServerProperties?: MessageServerProperties;
  /** Defines the SAP Enqueue Server properties. */
  enqueueServerProperties?: EnqueueServerProperties;
  /** Defines the SAP Gateway Server properties. */
  gatewayServerProperties?: GatewayServerProperties;
  /** Defines the SAP Enqueue Replication Server (ERS) properties. */
  enqueueReplicationServerProperties?: EnqueueReplicationServerProperties;
  /** The central services instance Kernel Version. */
  readonly kernelVersion?: string;
  /** The central services instance Kernel Patch level. */
  readonly kernelPatch?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to ASCS Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines corresponding to the Central Services instance. */
  readonly vmDetails?: CentralServerVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the errors related to SAP Central Services Instance resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sapCentralServerPropertiesSerializer(item: SAPCentralServerProperties): any {
  return {
    messageServerProperties: !item["messageServerProperties"]
      ? item["messageServerProperties"]
      : messageServerPropertiesSerializer(item["messageServerProperties"]),
    enqueueServerProperties: !item["enqueueServerProperties"]
      ? item["enqueueServerProperties"]
      : enqueueServerPropertiesSerializer(item["enqueueServerProperties"]),
    gatewayServerProperties: !item["gatewayServerProperties"]
      ? item["gatewayServerProperties"]
      : gatewayServerPropertiesSerializer(item["gatewayServerProperties"]),
    enqueueReplicationServerProperties: !item["enqueueReplicationServerProperties"]
      ? item["enqueueReplicationServerProperties"]
      : enqueueReplicationServerPropertiesSerializer(item["enqueueReplicationServerProperties"]),
  };
}

export function sapCentralServerPropertiesDeserializer(item: any): SAPCentralServerProperties {
  return {
    instanceNo: item["instanceNo"],
    subnet: item["subnet"],
    messageServerProperties: !item["messageServerProperties"]
      ? item["messageServerProperties"]
      : messageServerPropertiesDeserializer(item["messageServerProperties"]),
    enqueueServerProperties: !item["enqueueServerProperties"]
      ? item["enqueueServerProperties"]
      : enqueueServerPropertiesDeserializer(item["enqueueServerProperties"]),
    gatewayServerProperties: !item["gatewayServerProperties"]
      ? item["gatewayServerProperties"]
      : gatewayServerPropertiesDeserializer(item["gatewayServerProperties"]),
    enqueueReplicationServerProperties: !item["enqueueReplicationServerProperties"]
      ? item["enqueueReplicationServerProperties"]
      : enqueueReplicationServerPropertiesDeserializer(item["enqueueReplicationServerProperties"]),
    kernelVersion: item["kernelVersion"],
    kernelPatch: item["kernelPatch"],
    loadBalancerDetails: !item["loadBalancerDetails"]
      ? item["loadBalancerDetails"]
      : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
    vmDetails: !item["vmDetails"]
      ? item["vmDetails"]
      : centralServerVmDetailsArrayDeserializer(item["vmDetails"]),
    status: item["status"],
    health: item["health"],
    provisioningState: item["provisioningState"],
    errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
  };
}

/** Defines the SAP message server properties. */
export interface MessageServerProperties {
  /** message server port. */
  readonly msPort?: number;
  /** message server internal MS port. */
  readonly internalMsPort?: number;
  /** message server HTTP Port. */
  readonly httpPort?: number;
  /** message server HTTPS Port. */
  readonly httpsPort?: number;
  /** message server SAP Hostname. */
  readonly hostname?: string;
  /** message server IP Address. */
  readonly ipAddress?: string;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function messageServerPropertiesSerializer(item: MessageServerProperties): any {
  return item;
}

export function messageServerPropertiesDeserializer(item: any): MessageServerProperties {
  return {
    msPort: item["msPort"],
    internalMsPort: item["internalMsPort"],
    httpPort: item["httpPort"],
    httpsPort: item["httpsPort"],
    hostname: item["hostname"],
    ipAddress: item["ipAddress"],
    health: item["health"],
  };
}

/** Defines the SAP Enqueue Server properties. */
export interface EnqueueServerProperties {
  /** Enqueue Server SAP Hostname. */
  readonly hostname?: string;
  /** Enqueue Server SAP IP Address. */
  readonly ipAddress?: string;
  /** Enqueue Server Port. */
  readonly port?: number;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function enqueueServerPropertiesSerializer(item: EnqueueServerProperties): any {
  return item;
}

export function enqueueServerPropertiesDeserializer(item: any): EnqueueServerProperties {
  return {
    hostname: item["hostname"],
    ipAddress: item["ipAddress"],
    port: item["port"],
    health: item["health"],
  };
}

/** Defines the SAP Gateway Server properties. */
export interface GatewayServerProperties {
  /** Gateway Port. */
  readonly port?: number;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function gatewayServerPropertiesSerializer(item: GatewayServerProperties): any {
  return item;
}

export function gatewayServerPropertiesDeserializer(item: any): GatewayServerProperties {
  return {
    port: item["port"],
    health: item["health"],
  };
}

/** Defines the SAP Enqueue Replication Server (ERS) properties. */
export interface EnqueueReplicationServerProperties {
  /** Defines the type of Enqueue Replication Server. */
  readonly ersVersion?: EnqueueReplicationServerType;
  /** ERS Instance Number. */
  readonly instanceNo?: string;
  /** ERS SAP Hostname. */
  readonly hostname?: string;
  /** ERS SAP Kernel Version. */
  readonly kernelVersion?: string;
  /** ERS SAP Kernel Patch level. */
  readonly kernelPatch?: string;
  /** ERS SAP IP Address. */
  readonly ipAddress?: string;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function enqueueReplicationServerPropertiesSerializer(
  item: EnqueueReplicationServerProperties,
): any {
  return item;
}

export function enqueueReplicationServerPropertiesDeserializer(
  item: any,
): EnqueueReplicationServerProperties {
  return {
    ersVersion: item["ersVersion"],
    instanceNo: item["instanceNo"],
    hostname: item["hostname"],
    kernelVersion: item["kernelVersion"],
    kernelPatch: item["kernelPatch"],
    ipAddress: item["ipAddress"],
    health: item["health"],
  };
}

/** Defines the type of Enqueue Replication Server. */
export enum KnownEnqueueReplicationServerType {
  /** Enqueue Replication server type 1. */
  EnqueueReplicator1 = "EnqueueReplicator1",
  /** Enqueue Replication server type 2. */
  EnqueueReplicator2 = "EnqueueReplicator2",
}

/**
 * Defines the type of Enqueue Replication Server. \
 * {@link KnownEnqueueReplicationServerType} can be used interchangeably with EnqueueReplicationServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnqueueReplicator1**: Enqueue Replication server type 1. \
 * **EnqueueReplicator2**: Enqueue Replication server type 2.
 */
export type EnqueueReplicationServerType = string;

/** The Load Balancer details such as Load Balancer ID. */
export interface LoadBalancerDetails {
  /** Fully qualified resource ID for the load balancer. */
  readonly id?: string;
}

export function loadBalancerDetailsDeserializer(item: any): LoadBalancerDetails {
  return {
    id: item["id"],
  };
}

export function centralServerVmDetailsArrayDeserializer(
  result: Array<CentralServerVmDetails>,
): any[] {
  return result.map((item) => {
    return centralServerVmDetailsDeserializer(item);
  });
}

/** The SAP Central Services Instance VM details. */
export interface CentralServerVmDetails {
  /** Defines the type of central server VM. */
  readonly type?: CentralServerVirtualMachineType;
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Storage details of all the Storage Accounts attached to the ASCS Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

export function centralServerVmDetailsDeserializer(item: any): CentralServerVmDetails {
  return {
    type: item["type"],
    virtualMachineId: item["virtualMachineId"],
    storageDetails: !item["storageDetails"]
      ? item["storageDetails"]
      : storageInformationArrayDeserializer(item["storageDetails"]),
  };
}

/** Defines the type of central server VM. */
export enum KnownCentralServerVirtualMachineType {
  /** Primary central server vm. */
  Primary = "Primary",
  /** Secondary central server vm. */
  Secondary = "Secondary",
  /** Central server vm type unknown. */
  Unknown = "Unknown",
  /** ASCS Central server vm type. */
  Ascs = "ASCS",
  /** ERSInactive Central server vm type. */
  ERSInactive = "ERSInactive",
  /** ERS Central server vm type. */
  ERS = "ERS",
  /** Standby Central server vm type. */
  Standby = "Standby",
}

/**
 * Defines the type of central server VM. \
 * {@link KnownCentralServerVirtualMachineType} can be used interchangeably with CentralServerVirtualMachineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary central server vm. \
 * **Secondary**: Secondary central server vm. \
 * **Unknown**: Central server vm type unknown. \
 * **ASCS**: ASCS Central server vm type. \
 * **ERSInactive**: ERSInactive Central server vm type. \
 * **ERS**: ERS Central server vm type. \
 * **Standby**: Standby Central server vm type.
 */
export type CentralServerVirtualMachineType = string;

export function storageInformationArrayDeserializer(result: Array<StorageInformation>): any[] {
  return result.map((item) => {
    return storageInformationDeserializer(item);
  });
}

/** Storage details of all the Storage accounts attached to the VM. For e.g. NFS on AFS Shared Storage. */
export interface StorageInformation {
  /** Fully qualified resource ID for the storage account. */
  readonly id?: string;
}

export function storageInformationDeserializer(item: any): StorageInformation {
  return {
    id: item["id"],
  };
}

/** Defines the request body for updating SAP Central Instance. */
export interface UpdateSAPCentralInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPCentralInstanceRequestSerializer(
  item: UpdateSAPCentralInstanceRequest,
): any {
  return { tags: item["tags"] };
}

/** The response of a SAPCentralServerInstance list operation. */
export interface _SAPCentralServerInstanceListResult {
  /** The SAPCentralServerInstance items on this page */
  value: SAPCentralServerInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sapCentralServerInstanceListResultDeserializer(
  item: any,
): _SAPCentralServerInstanceListResult {
  return {
    value: sapCentralServerInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sapCentralServerInstanceArraySerializer(
  result: Array<SAPCentralServerInstance>,
): any[] {
  return result.map((item) => {
    return sapCentralServerInstanceSerializer(item);
  });
}

export function sapCentralServerInstanceArrayDeserializer(
  result: Array<SAPCentralServerInstance>,
): any[] {
  return result.map((item) => {
    return sapCentralServerInstanceDeserializer(item);
  });
}

/** Define the Database resource. */
export interface SAPDatabaseInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPDatabaseProperties;
}

export function sapDatabaseInstanceSerializer(item: SAPDatabaseInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sapDatabasePropertiesSerializer(item["properties"]),
  };
}

export function sapDatabaseInstanceDeserializer(item: any): SAPDatabaseInstance {
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
      : sapDatabasePropertiesDeserializer(item["properties"]),
  };
}

/** Defines the Database properties. */
export interface SAPDatabaseProperties {
  /** Database subnet. */
  readonly subnet?: string;
  /** Database SID name. */
  readonly databaseSid?: string;
  /** Database type, that is if the DB is HANA, DB2, Oracle, SAP ASE, Max DB or MS SQL Server. */
  readonly databaseType?: string;
  /** Database IP Address. */
  readonly ipAddress?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to Database Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines corresponding to the Database resource. */
  readonly vmDetails?: DatabaseVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the errors related to Database resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sapDatabasePropertiesSerializer(item: SAPDatabaseProperties): any {
  return item;
}

export function sapDatabasePropertiesDeserializer(item: any): SAPDatabaseProperties {
  return {
    subnet: item["subnet"],
    databaseSid: item["databaseSid"],
    databaseType: item["databaseType"],
    ipAddress: item["ipAddress"],
    loadBalancerDetails: !item["loadBalancerDetails"]
      ? item["loadBalancerDetails"]
      : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
    vmDetails: !item["vmDetails"]
      ? item["vmDetails"]
      : databaseVmDetailsArrayDeserializer(item["vmDetails"]),
    status: item["status"],
    provisioningState: item["provisioningState"],
    errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
  };
}

export function databaseVmDetailsArrayDeserializer(result: Array<DatabaseVmDetails>): any[] {
  return result.map((item) => {
    return databaseVmDetailsDeserializer(item);
  });
}

/** Database VM details. */
export interface DatabaseVmDetails {
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Storage details of all the Storage Accounts attached to the Database Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

export function databaseVmDetailsDeserializer(item: any): DatabaseVmDetails {
  return {
    virtualMachineId: item["virtualMachineId"],
    status: item["status"],
    storageDetails: !item["storageDetails"]
      ? item["storageDetails"]
      : storageInformationArrayDeserializer(item["storageDetails"]),
  };
}

/** Defines the request body for updating SAP Database Instance. */
export interface UpdateSAPDatabaseInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPDatabaseInstanceRequestSerializer(
  item: UpdateSAPDatabaseInstanceRequest,
): any {
  return { tags: item["tags"] };
}

/** The response of a SAPDatabaseInstance list operation. */
export interface _SAPDatabaseInstanceListResult {
  /** The SAPDatabaseInstance items on this page */
  value: SAPDatabaseInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sapDatabaseInstanceListResultDeserializer(
  item: any,
): _SAPDatabaseInstanceListResult {
  return {
    value: sapDatabaseInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sapDatabaseInstanceArraySerializer(result: Array<SAPDatabaseInstance>): any[] {
  return result.map((item) => {
    return sapDatabaseInstanceSerializer(item);
  });
}

export function sapDatabaseInstanceArrayDeserializer(result: Array<SAPDatabaseInstance>): any[] {
  return result.map((item) => {
    return sapDatabaseInstanceDeserializer(item);
  });
}

/** Define the SAP Application Server Instance resource. */
export interface SAPApplicationServerInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPApplicationServerProperties;
}

export function sapApplicationServerInstanceSerializer(item: SAPApplicationServerInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sapApplicationServerPropertiesSerializer(item["properties"]),
  };
}

export function sapApplicationServerInstanceDeserializer(item: any): SAPApplicationServerInstance {
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
      : sapApplicationServerPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the SAP Application Server instance properties. */
export interface SAPApplicationServerProperties {
  /** Application server Instance Number. */
  readonly instanceNo?: string;
  /** Application server Subnet. */
  readonly subnet?: string;
  /** Application server instance SAP hostname. */
  readonly hostname?: string;
  /** Application server instance SAP Kernel Version. */
  readonly kernelVersion?: string;
  /** Application server instance SAP Kernel Patch level. */
  readonly kernelPatch?: string;
  /** Application server instance SAP IP Address. */
  readonly ipAddress?: string;
  /** Application server instance gateway Port. */
  readonly gatewayPort?: number;
  /** Application server instance ICM HTTP Port. */
  readonly icmHttpPort?: number;
  /** Application server instance ICM HTTPS Port. */
  readonly icmHttpsPort?: number;
  /** Application server instance dispatcher status. */
  readonly dispatcherStatus?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to Application Server Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines. */
  readonly vmDetails?: ApplicationServerVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the Application Instance errors. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sapApplicationServerPropertiesSerializer(
  item: SAPApplicationServerProperties,
): any {
  return item;
}

export function sapApplicationServerPropertiesDeserializer(
  item: any,
): SAPApplicationServerProperties {
  return {
    instanceNo: item["instanceNo"],
    subnet: item["subnet"],
    hostname: item["hostname"],
    kernelVersion: item["kernelVersion"],
    kernelPatch: item["kernelPatch"],
    ipAddress: item["ipAddress"],
    gatewayPort: item["gatewayPort"],
    icmHttpPort: item["icmHttpPort"],
    icmHttpsPort: item["icmHttpsPort"],
    dispatcherStatus: item["dispatcherStatus"],
    loadBalancerDetails: !item["loadBalancerDetails"]
      ? item["loadBalancerDetails"]
      : loadBalancerDetailsDeserializer(item["loadBalancerDetails"]),
    vmDetails: !item["vmDetails"]
      ? item["vmDetails"]
      : applicationServerVmDetailsArrayDeserializer(item["vmDetails"]),
    status: item["status"],
    health: item["health"],
    provisioningState: item["provisioningState"],
    errors: !item["errors"] ? item["errors"] : sapVirtualInstanceErrorDeserializer(item["errors"]),
  };
}

export function applicationServerVmDetailsArrayDeserializer(
  result: Array<ApplicationServerVmDetails>,
): any[] {
  return result.map((item) => {
    return applicationServerVmDetailsDeserializer(item);
  });
}

/** The Application Server VM Details. */
export interface ApplicationServerVmDetails {
  /** Defines the type of application server VM. */
  readonly type?: ApplicationServerVirtualMachineType;
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Storage details of all the Storage Accounts attached to the App Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

export function applicationServerVmDetailsDeserializer(item: any): ApplicationServerVmDetails {
  return {
    type: item["type"],
    virtualMachineId: item["virtualMachineId"],
    storageDetails: !item["storageDetails"]
      ? item["storageDetails"]
      : storageInformationArrayDeserializer(item["storageDetails"]),
  };
}

/** Defines the type of application server VM. */
export enum KnownApplicationServerVirtualMachineType {
  /** Active Application server vm type. */
  Active = "Active",
  /** Standby Application server vm type. */
  Standby = "Standby",
  /** Unknown Application server vm type. */
  Unknown = "Unknown",
}

/**
 * Defines the type of application server VM. \
 * {@link KnownApplicationServerVirtualMachineType} can be used interchangeably with ApplicationServerVirtualMachineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active Application server vm type. \
 * **Standby**: Standby Application server vm type. \
 * **Unknown**: Unknown Application server vm type.
 */
export type ApplicationServerVirtualMachineType = string;

/** Defines the request body for updating SAP Application Instance. */
export interface UpdateSAPApplicationInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPApplicationInstanceRequestSerializer(
  item: UpdateSAPApplicationInstanceRequest,
): any {
  return { tags: item["tags"] };
}

/** The response of a SAPApplicationServerInstance list operation. */
export interface _SAPApplicationServerInstanceListResult {
  /** The SAPApplicationServerInstance items on this page */
  value: SAPApplicationServerInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sapApplicationServerInstanceListResultDeserializer(
  item: any,
): _SAPApplicationServerInstanceListResult {
  return {
    value: sapApplicationServerInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sapApplicationServerInstanceArraySerializer(
  result: Array<SAPApplicationServerInstance>,
): any[] {
  return result.map((item) => {
    return sapApplicationServerInstanceSerializer(item);
  });
}

export function sapApplicationServerInstanceArrayDeserializer(
  result: Array<SAPApplicationServerInstance>,
): any[] {
  return result.map((item) => {
    return sapApplicationServerInstanceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-09-01 API version. */
  V20240901 = "2024-09-01",
}
