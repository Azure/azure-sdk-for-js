// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list Resource Provider operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of Resource Provider operations supported by the Resource Provider resource provider. */
  value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: ex Microsoft.Databricks */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
  /** Description for the resource operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Contains details when the response code indicates an error. */
export interface ErrorResponse {
  /** The error details. */
  error: ErrorInfo;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: errorInfoDeserializer(item["error"]),
  };
}

/** The code and message for an error. */
export interface ErrorInfo {
  /** A machine readable error code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** error details. */
  details?: ErrorDetail[];
  /** Inner error details if they exist. */
  innererror?: string;
}

export function errorInfoDeserializer(item: any): ErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    innererror: item["innererror"],
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** Error details. */
export interface ErrorDetail {
  /** The error's code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** Indicates which property in the request is responsible for the error. */
  target?: string;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Information about workspace. */
export interface Workspace extends TrackedResource {
  /** The SKU of the resource. */
  sku?: Sku;
  /** The workspace compute mode. Required on create, cannot be changed. Possible values include: 'Serverless', 'Hybrid' */
  computeMode: ComputeMode;
  /** The managed resource group Id. Required in Hybrid ComputeMode workspace. Not allowed in Serverless ComputeMode workspace. */
  managedResourceGroupId?: string;
  /** The workspace's custom parameters. */
  parameters?: WorkspaceCustomParameters;
  /** The workspace provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The blob URI where the UI definition file is located. */
  uiDefinitionUri?: string;
  /** The workspace provider authorizations. */
  authorizations?: WorkspaceProviderAuthorization[];
  /** Indicates the Object ID, PUID and Application ID of entity that created the workspace. */
  createdBy?: CreatedBy;
  /** Indicates the Object ID, PUID and Application ID of entity that last updated the workspace. */
  updatedBy?: CreatedBy;
  /** Specifies the date and time when the workspace is created. */
  readonly createdDateTime?: Date;
  /** The unique identifier of the databricks workspace in databricks control plane. */
  readonly workspaceId?: string;
  /** The workspace URL which is of the format 'adb-{workspaceId}.{random}.azuredatabricks.net' */
  readonly workspaceUrl?: string;
  /** The details of Managed Identity of Storage Account. Only returned in Hybrid ComputeMode workspace. */
  storageAccountIdentity?: ManagedIdentityConfiguration;
  /** The details of Managed Identity of Disk Encryption Set used for Managed Disk Encryption. Only returned in Hybrid ComputeMode workspace. */
  managedDiskIdentity?: ManagedIdentityConfiguration;
  /** The resource Id of the managed disk encryption set. Not allowed in Serverless ComputeMode workspace. */
  readonly diskEncryptionSetId?: string;
  /** Encryption properties for databricks workspace. Supported in both Serverless and Hybrid ComputeMode workspace. */
  encryption?: WorkspacePropertiesEncryption;
  /** Contains settings related to the Enhanced Security and Compliance Add-On. Supported in both Serverless and Hybrid ComputeMode workspace. */
  enhancedSecurityCompliance?: EnhancedSecurityComplianceDefinition;
  /** Private endpoint connections created on the workspace. Supported in both Serverless and Hybrid ComputeMode workspace. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The network access type for accessing workspace. Set value to disabled to access workspace only via private link. Used to configure front-end only private link for Serverless ComputeMode workspace. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets a value indicating whether data plane (clusters) to control plane communication happen over private endpoint. Supported values are 'AllRules' and 'NoAzureDatabricksRules'. 'NoAzureServiceRules' value is for internal use only. Not allowed in Serverless ComputeMode workspace. */
  requiredNsgRules?: RequiredNsgRules;
  /** Properties for Default Catalog configuration during workspace creation. Not allowed in Serverless ComputeMode workspace. */
  defaultCatalog?: DefaultCatalogProperties;
  /** Indicates whether unity catalog enabled for the workspace or not. Set as true in Serverless ComputeMode workspace. */
  readonly isUcEnabled?: boolean;
  /** Access Connector Resource that is going to be associated with Databricks Workspace. Not allowed in Serverless ComputeMode workspace. */
  accessConnector?: WorkspacePropertiesAccessConnector;
  /** Gets or Sets Default Storage Firewall configuration information. Not allowed in Serverless ComputeMode workspace. */
  defaultStorageFirewall?: DefaultStorageFirewall;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _workspacePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
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
    ..._workspacePropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The workspace properties. */
export interface WorkspaceProperties {
  /** The workspace compute mode. Required on create, cannot be changed. Possible values include: 'Serverless', 'Hybrid' */
  computeMode: ComputeMode;
  /** The managed resource group Id. Required in Hybrid ComputeMode workspace. Not allowed in Serverless ComputeMode workspace. */
  managedResourceGroupId?: string;
  /** The workspace's custom parameters. */
  parameters?: WorkspaceCustomParameters;
  /** The workspace provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The blob URI where the UI definition file is located. */
  uiDefinitionUri?: string;
  /** The workspace provider authorizations. */
  authorizations?: WorkspaceProviderAuthorization[];
  /** Indicates the Object ID, PUID and Application ID of entity that created the workspace. */
  createdBy?: CreatedBy;
  /** Indicates the Object ID, PUID and Application ID of entity that last updated the workspace. */
  updatedBy?: CreatedBy;
  /** Specifies the date and time when the workspace is created. */
  readonly createdDateTime?: Date;
  /** The unique identifier of the databricks workspace in databricks control plane. */
  readonly workspaceId?: string;
  /** The workspace URL which is of the format 'adb-{workspaceId}.{random}.azuredatabricks.net' */
  readonly workspaceUrl?: string;
  /** The details of Managed Identity of Storage Account. Only returned in Hybrid ComputeMode workspace. */
  storageAccountIdentity?: ManagedIdentityConfiguration;
  /** The details of Managed Identity of Disk Encryption Set used for Managed Disk Encryption. Only returned in Hybrid ComputeMode workspace. */
  managedDiskIdentity?: ManagedIdentityConfiguration;
  /** The resource Id of the managed disk encryption set. Not allowed in Serverless ComputeMode workspace. */
  readonly diskEncryptionSetId?: string;
  /** Encryption properties for databricks workspace. Supported in both Serverless and Hybrid ComputeMode workspace. */
  encryption?: WorkspacePropertiesEncryption;
  /** Contains settings related to the Enhanced Security and Compliance Add-On. Supported in both Serverless and Hybrid ComputeMode workspace. */
  enhancedSecurityCompliance?: EnhancedSecurityComplianceDefinition;
  /** Private endpoint connections created on the workspace. Supported in both Serverless and Hybrid ComputeMode workspace. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The network access type for accessing workspace. Set value to disabled to access workspace only via private link. Used to configure front-end only private link for Serverless ComputeMode workspace. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets a value indicating whether data plane (clusters) to control plane communication happen over private endpoint. Supported values are 'AllRules' and 'NoAzureDatabricksRules'. 'NoAzureServiceRules' value is for internal use only. Not allowed in Serverless ComputeMode workspace. */
  requiredNsgRules?: RequiredNsgRules;
  /** Properties for Default Catalog configuration during workspace creation. Not allowed in Serverless ComputeMode workspace. */
  defaultCatalog?: DefaultCatalogProperties;
  /** Indicates whether unity catalog enabled for the workspace or not. Set as true in Serverless ComputeMode workspace. */
  readonly isUcEnabled?: boolean;
  /** Access Connector Resource that is going to be associated with Databricks Workspace. Not allowed in Serverless ComputeMode workspace. */
  accessConnector?: WorkspacePropertiesAccessConnector;
  /** Gets or Sets Default Storage Firewall configuration information. Not allowed in Serverless ComputeMode workspace. */
  defaultStorageFirewall?: DefaultStorageFirewall;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    computeMode: item["computeMode"],
    managedResourceGroupId: item["managedResourceGroupId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workspaceCustomParametersSerializer(item["parameters"]),
    uiDefinitionUri: item["uiDefinitionUri"],
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : workspaceProviderAuthorizationArraySerializer(item["authorizations"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : createdBySerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : createdBySerializer(item["updatedBy"]),
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : managedIdentityConfigurationSerializer(item["storageAccountIdentity"]),
    managedDiskIdentity: !item["managedDiskIdentity"]
      ? item["managedDiskIdentity"]
      : managedIdentityConfigurationSerializer(item["managedDiskIdentity"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspacePropertiesEncryptionSerializer(item["encryption"]),
    enhancedSecurityCompliance: !item["enhancedSecurityCompliance"]
      ? item["enhancedSecurityCompliance"]
      : enhancedSecurityComplianceDefinitionSerializer(item["enhancedSecurityCompliance"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    requiredNsgRules: item["requiredNsgRules"],
    defaultCatalog: !item["defaultCatalog"]
      ? item["defaultCatalog"]
      : defaultCatalogPropertiesSerializer(item["defaultCatalog"]),
    accessConnector: !item["accessConnector"]
      ? item["accessConnector"]
      : workspacePropertiesAccessConnectorSerializer(item["accessConnector"]),
    defaultStorageFirewall: item["defaultStorageFirewall"],
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    computeMode: item["computeMode"],
    managedResourceGroupId: item["managedResourceGroupId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workspaceCustomParametersDeserializer(item["parameters"]),
    provisioningState: item["provisioningState"],
    uiDefinitionUri: item["uiDefinitionUri"],
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : workspaceProviderAuthorizationArrayDeserializer(item["authorizations"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : createdByDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : createdByDeserializer(item["updatedBy"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    workspaceId: item["workspaceId"],
    workspaceUrl: item["workspaceUrl"],
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : managedIdentityConfigurationDeserializer(item["storageAccountIdentity"]),
    managedDiskIdentity: !item["managedDiskIdentity"]
      ? item["managedDiskIdentity"]
      : managedIdentityConfigurationDeserializer(item["managedDiskIdentity"]),
    diskEncryptionSetId: item["diskEncryptionSetId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspacePropertiesEncryptionDeserializer(item["encryption"]),
    enhancedSecurityCompliance: !item["enhancedSecurityCompliance"]
      ? item["enhancedSecurityCompliance"]
      : enhancedSecurityComplianceDefinitionDeserializer(item["enhancedSecurityCompliance"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    requiredNsgRules: item["requiredNsgRules"],
    defaultCatalog: !item["defaultCatalog"]
      ? item["defaultCatalog"]
      : defaultCatalogPropertiesDeserializer(item["defaultCatalog"]),
    isUcEnabled: item["isUcEnabled"],
    accessConnector: !item["accessConnector"]
      ? item["accessConnector"]
      : workspacePropertiesAccessConnectorDeserializer(item["accessConnector"]),
    defaultStorageFirewall: item["defaultStorageFirewall"],
  };
}

/** The workspace compute mode. Required on create, cannot be changed. Possible values include: 'Serverless', 'Hybrid' */
export enum KnownComputeMode {
  /** Serverless */
  Serverless = "Serverless",
  /** Hybrid */
  Hybrid = "Hybrid",
}

/**
 * The workspace compute mode. Required on create, cannot be changed. Possible values include: 'Serverless', 'Hybrid' \
 * {@link KnownComputeMode} can be used interchangeably with ComputeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Serverless**: Serverless \
 * **Hybrid**: Hybrid
 */
export type ComputeMode = string;

/** Custom Parameters used for Workspace Creation. Not allowed in Serverless ComputeMode workspace. */
export interface WorkspaceCustomParameters {
  /** The ID of a Azure Machine Learning workspace to link with Databricks workspace. Not allowed in Serverless ComputeMode workspace. */
  amlWorkspaceId?: WorkspaceCustomStringParameter;
  /** The ID of a Virtual Network where this Databricks Cluster should be created. Not allowed in Serverless ComputeMode workspace. */
  customVirtualNetworkId?: WorkspaceCustomStringParameter;
  /** The name of a Public Subnet within the Virtual Network. Not allowed in Serverless ComputeMode workspace. */
  customPublicSubnetName?: WorkspaceCustomStringParameter;
  /** The name of the Private Subnet within the Virtual Network. Not allowed in Serverless ComputeMode workspace. */
  customPrivateSubnetName?: WorkspaceCustomStringParameter;
  /** Boolean indicating whether the public IP should be disabled. Default value is true. Not allowed in Serverless ComputeMode workspace. */
  enableNoPublicIp?: WorkspaceNoPublicIPBooleanParameter;
  /** Name of the outbound Load Balancer Backend Pool for Secure Cluster Connectivity (No Public IP). Not allowed in Serverless ComputeMode workspace. */
  loadBalancerBackendPoolName?: WorkspaceCustomStringParameter;
  /** Resource URI of Outbound Load balancer for Secure Cluster Connectivity (No Public IP) workspace. Not allowed in Serverless ComputeMode workspace. */
  loadBalancerId?: WorkspaceCustomStringParameter;
  /** Name of the NAT gateway for Secure Cluster Connectivity (No Public IP) workspace subnets. Not allowed in Serverless ComputeMode workspace. */
  natGatewayName?: WorkspaceCustomStringParameter;
  /** Name of the Public IP for No Public IP workspace with managed vNet. Not allowed in Serverless ComputeMode workspace. */
  publicIpName?: WorkspaceCustomStringParameter;
  /** Prepare the workspace for encryption. Enables the Managed Identity for managed storage account. Not allowed in Serverless ComputeMode workspace. */
  prepareEncryption?: WorkspaceCustomBooleanParameter;
  /** Contains the encryption details for Customer-Managed Key (CMK) enabled workspace.Not allowed in Serverless ComputeMode workspace. */
  encryption?: WorkspaceEncryptionParameter;
  /** A boolean indicating whether or not the DBFS root file system will be enabled with secondary layer of encryption with platform managed keys for data at rest. Not allowed in Serverless ComputeMode workspace. */
  requireInfrastructureEncryption?: WorkspaceCustomBooleanParameter;
  /** Default DBFS storage account name. Not allowed in Serverless ComputeMode workspace. */
  storageAccountName?: WorkspaceCustomStringParameter;
  /** Storage account SKU name, ex: Standard_GRS, Standard_LRS. Refer https://aka.ms/storageskus for valid inputs. Not allowed in Serverless ComputeMode workspace. */
  storageAccountSkuName?: WorkspaceCustomStringParameter;
  /** Address prefix for Managed virtual network. Default value for this input is 10.139. Not allowed in Serverless ComputeMode workspace. */
  vnetAddressPrefix?: WorkspaceCustomStringParameter;
  /** Tags applied to resources under Managed resource group. These can be updated by updating tags at workspace level. Not allowed in Serverless ComputeMode workspace. */
  readonly resourceTags?: WorkspaceCustomObjectParameter;
}

export function workspaceCustomParametersSerializer(item: WorkspaceCustomParameters): any {
  return {
    amlWorkspaceId: !item["amlWorkspaceId"]
      ? item["amlWorkspaceId"]
      : workspaceCustomStringParameterSerializer(item["amlWorkspaceId"]),
    customVirtualNetworkId: !item["customVirtualNetworkId"]
      ? item["customVirtualNetworkId"]
      : workspaceCustomStringParameterSerializer(item["customVirtualNetworkId"]),
    customPublicSubnetName: !item["customPublicSubnetName"]
      ? item["customPublicSubnetName"]
      : workspaceCustomStringParameterSerializer(item["customPublicSubnetName"]),
    customPrivateSubnetName: !item["customPrivateSubnetName"]
      ? item["customPrivateSubnetName"]
      : workspaceCustomStringParameterSerializer(item["customPrivateSubnetName"]),
    enableNoPublicIp: !item["enableNoPublicIp"]
      ? item["enableNoPublicIp"]
      : workspaceNoPublicIPBooleanParameterSerializer(item["enableNoPublicIp"]),
    loadBalancerBackendPoolName: !item["loadBalancerBackendPoolName"]
      ? item["loadBalancerBackendPoolName"]
      : workspaceCustomStringParameterSerializer(item["loadBalancerBackendPoolName"]),
    loadBalancerId: !item["loadBalancerId"]
      ? item["loadBalancerId"]
      : workspaceCustomStringParameterSerializer(item["loadBalancerId"]),
    natGatewayName: !item["natGatewayName"]
      ? item["natGatewayName"]
      : workspaceCustomStringParameterSerializer(item["natGatewayName"]),
    publicIpName: !item["publicIpName"]
      ? item["publicIpName"]
      : workspaceCustomStringParameterSerializer(item["publicIpName"]),
    prepareEncryption: !item["prepareEncryption"]
      ? item["prepareEncryption"]
      : workspaceCustomBooleanParameterSerializer(item["prepareEncryption"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspaceEncryptionParameterSerializer(item["encryption"]),
    requireInfrastructureEncryption: !item["requireInfrastructureEncryption"]
      ? item["requireInfrastructureEncryption"]
      : workspaceCustomBooleanParameterSerializer(item["requireInfrastructureEncryption"]),
    storageAccountName: !item["storageAccountName"]
      ? item["storageAccountName"]
      : workspaceCustomStringParameterSerializer(item["storageAccountName"]),
    storageAccountSkuName: !item["storageAccountSkuName"]
      ? item["storageAccountSkuName"]
      : workspaceCustomStringParameterSerializer(item["storageAccountSkuName"]),
    vnetAddressPrefix: !item["vnetAddressPrefix"]
      ? item["vnetAddressPrefix"]
      : workspaceCustomStringParameterSerializer(item["vnetAddressPrefix"]),
  };
}

export function workspaceCustomParametersDeserializer(item: any): WorkspaceCustomParameters {
  return {
    amlWorkspaceId: !item["amlWorkspaceId"]
      ? item["amlWorkspaceId"]
      : workspaceCustomStringParameterDeserializer(item["amlWorkspaceId"]),
    customVirtualNetworkId: !item["customVirtualNetworkId"]
      ? item["customVirtualNetworkId"]
      : workspaceCustomStringParameterDeserializer(item["customVirtualNetworkId"]),
    customPublicSubnetName: !item["customPublicSubnetName"]
      ? item["customPublicSubnetName"]
      : workspaceCustomStringParameterDeserializer(item["customPublicSubnetName"]),
    customPrivateSubnetName: !item["customPrivateSubnetName"]
      ? item["customPrivateSubnetName"]
      : workspaceCustomStringParameterDeserializer(item["customPrivateSubnetName"]),
    enableNoPublicIp: !item["enableNoPublicIp"]
      ? item["enableNoPublicIp"]
      : workspaceNoPublicIPBooleanParameterDeserializer(item["enableNoPublicIp"]),
    loadBalancerBackendPoolName: !item["loadBalancerBackendPoolName"]
      ? item["loadBalancerBackendPoolName"]
      : workspaceCustomStringParameterDeserializer(item["loadBalancerBackendPoolName"]),
    loadBalancerId: !item["loadBalancerId"]
      ? item["loadBalancerId"]
      : workspaceCustomStringParameterDeserializer(item["loadBalancerId"]),
    natGatewayName: !item["natGatewayName"]
      ? item["natGatewayName"]
      : workspaceCustomStringParameterDeserializer(item["natGatewayName"]),
    publicIpName: !item["publicIpName"]
      ? item["publicIpName"]
      : workspaceCustomStringParameterDeserializer(item["publicIpName"]),
    prepareEncryption: !item["prepareEncryption"]
      ? item["prepareEncryption"]
      : workspaceCustomBooleanParameterDeserializer(item["prepareEncryption"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspaceEncryptionParameterDeserializer(item["encryption"]),
    requireInfrastructureEncryption: !item["requireInfrastructureEncryption"]
      ? item["requireInfrastructureEncryption"]
      : workspaceCustomBooleanParameterDeserializer(item["requireInfrastructureEncryption"]),
    storageAccountName: !item["storageAccountName"]
      ? item["storageAccountName"]
      : workspaceCustomStringParameterDeserializer(item["storageAccountName"]),
    storageAccountSkuName: !item["storageAccountSkuName"]
      ? item["storageAccountSkuName"]
      : workspaceCustomStringParameterDeserializer(item["storageAccountSkuName"]),
    vnetAddressPrefix: !item["vnetAddressPrefix"]
      ? item["vnetAddressPrefix"]
      : workspaceCustomStringParameterDeserializer(item["vnetAddressPrefix"]),
    resourceTags: !item["resourceTags"]
      ? item["resourceTags"]
      : workspaceCustomObjectParameterDeserializer(item["resourceTags"]),
  };
}

/** The Value. */
export interface WorkspaceCustomStringParameter {
  /** The type of variable that this is */
  type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: string;
}

export function workspaceCustomStringParameterSerializer(
  item: WorkspaceCustomStringParameter,
): any {
  return { type: item["type"], value: item["value"] };
}

export function workspaceCustomStringParameterDeserializer(
  item: any,
): WorkspaceCustomStringParameter {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The workspace's custom parameters. */
export enum KnownCustomParameterType {
  /** Bool */
  Bool = "Bool",
  /** Object */
  Object = "Object",
  /** String */
  String = "String",
}

/**
 * The workspace's custom parameters. \
 * {@link KnownCustomParameterType} can be used interchangeably with CustomParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bool**: Bool \
 * **Object**: Object \
 * **String**: String
 */
export type CustomParameterType = string;

/** The value which should be used for this field. */
export interface WorkspaceNoPublicIPBooleanParameter {
  /** The type of variable that this is */
  type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: boolean;
}

export function workspaceNoPublicIPBooleanParameterSerializer(
  item: WorkspaceNoPublicIPBooleanParameter,
): any {
  return { type: item["type"], value: item["value"] };
}

export function workspaceNoPublicIPBooleanParameterDeserializer(
  item: any,
): WorkspaceNoPublicIPBooleanParameter {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The value which should be used for this field. */
export interface WorkspaceCustomBooleanParameter {
  /** The type of variable that this is */
  type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: boolean;
}

export function workspaceCustomBooleanParameterSerializer(
  item: WorkspaceCustomBooleanParameter,
): any {
  return { type: item["type"], value: item["value"] };
}

export function workspaceCustomBooleanParameterDeserializer(
  item: any,
): WorkspaceCustomBooleanParameter {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The object that contains details of encryption used on the workspace. */
export interface WorkspaceEncryptionParameter {
  /** The type of variable that this is */
  type?: CustomParameterType;
  /** The value which should be used for this field. */
  value?: Encryption;
}

export function workspaceEncryptionParameterSerializer(item: WorkspaceEncryptionParameter): any {
  return {
    type: item["type"],
    value: !item["value"] ? item["value"] : encryptionSerializer(item["value"]),
  };
}

export function workspaceEncryptionParameterDeserializer(item: any): WorkspaceEncryptionParameter {
  return {
    type: item["type"],
    value: !item["value"] ? item["value"] : encryptionDeserializer(item["value"]),
  };
}

/** The object that contains details of encryption used on the workspace. */
export interface Encryption {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Default, Microsoft.Keyvault */
  keySource?: KeySource;
  /** The name of KeyVault key. */
  keyName?: string;
  /** The version of KeyVault key. */
  keyVersion?: string;
  /** The Uri of KeyVault. */
  keyVaultUri?: string;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    keySource: item["keySource"],
    KeyName: item["keyName"],
    keyversion: item["keyVersion"],
    keyvaulturi: item["keyVaultUri"],
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    keySource: item["keySource"],
    keyName: item["KeyName"],
    keyVersion: item["keyversion"],
    keyVaultUri: item["keyvaulturi"],
  };
}

/** The encryption keySource (provider). Possible values (case-insensitive):  Default, Microsoft.Keyvault */
export enum KnownKeySource {
  /** Default */
  Default = "Default",
  /** Microsoft.Keyvault */
  MicrosoftKeyvault = "Microsoft.Keyvault",
}

/**
 * The encryption keySource (provider). Possible values (case-insensitive):  Default, Microsoft.Keyvault \
 * {@link KnownKeySource} can be used interchangeably with KeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **Microsoft.Keyvault**: Microsoft.Keyvault
 */
export type KeySource = string;

/** The value which should be used for this field. */
export interface WorkspaceCustomObjectParameter {
  /** The type of variable that this is */
  type?: CustomParameterType;
  /** The value which should be used for this field. */
  value: any;
}

export function workspaceCustomObjectParameterDeserializer(
  item: any,
): WorkspaceCustomObjectParameter {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Provisioning status of the workspace. */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Ready */
  Ready = "Ready",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
}

/**
 * Provisioning status of the workspace. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **Running**: Running \
 * **Ready**: Ready \
 * **Creating**: Creating \
 * **Created**: Created \
 * **Deleting**: Deleting \
 * **Deleted**: Deleted \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Updating**: Updating
 */
export type ProvisioningState = string;

export function workspaceProviderAuthorizationArraySerializer(
  result: Array<WorkspaceProviderAuthorization>,
): any[] {
  return result.map((item) => {
    return workspaceProviderAuthorizationSerializer(item);
  });
}

export function workspaceProviderAuthorizationArrayDeserializer(
  result: Array<WorkspaceProviderAuthorization>,
): any[] {
  return result.map((item) => {
    return workspaceProviderAuthorizationDeserializer(item);
  });
}

/** The workspace provider authorization. */
export interface WorkspaceProviderAuthorization {
  /** The provider's principal identifier. This is the identity that the provider will use to call ARM to manage the workspace resources. */
  principalId: string;
  /** The provider's role definition identifier. This role will define all the permissions that the provider must have on the workspace's container resource group. This role definition cannot have permission to delete the resource group. */
  roleDefinitionId: string;
}

export function workspaceProviderAuthorizationSerializer(
  item: WorkspaceProviderAuthorization,
): any {
  return { principalId: item["principalId"], roleDefinitionId: item["roleDefinitionId"] };
}

export function workspaceProviderAuthorizationDeserializer(
  item: any,
): WorkspaceProviderAuthorization {
  return {
    principalId: item["principalId"],
    roleDefinitionId: item["roleDefinitionId"],
  };
}

/** Provides details of the entity that created/updated the workspace. */
export interface CreatedBy {
  /** The Object ID that created the workspace. */
  readonly oid?: string;
  /** The Personal Object ID corresponding to the object ID above */
  readonly puid?: string;
  /** The application ID of the application that initiated the creation of the workspace. For example, Azure Portal. */
  readonly applicationId?: string;
}

export function createdBySerializer(_item: CreatedBy): any {
  return {};
}

export function createdByDeserializer(item: any): CreatedBy {
  return {
    oid: item["oid"],
    puid: item["puid"],
    applicationId: item["applicationId"],
  };
}

/** The Managed Identity details for storage account. */
export interface ManagedIdentityConfiguration {
  /** The objectId of the Managed Identity that is linked to the Managed Storage account. */
  readonly principalId?: string;
  /** The tenant Id where the Managed Identity is created. */
  readonly tenantId?: string;
  /** The type of Identity created. It can be either SystemAssigned or UserAssigned. */
  readonly type?: string;
}

export function managedIdentityConfigurationSerializer(_item: ManagedIdentityConfiguration): any {
  return {};
}

export function managedIdentityConfigurationDeserializer(item: any): ManagedIdentityConfiguration {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Encryption properties for databricks workspace. Supported in both Serverless and Hybrid ComputeMode workspace. */
export interface WorkspacePropertiesEncryption {
  /** Encryption entities definition for the workspace. */
  entities: EncryptionEntitiesDefinition;
}

export function workspacePropertiesEncryptionSerializer(item: WorkspacePropertiesEncryption): any {
  return { entities: encryptionEntitiesDefinitionSerializer(item["entities"]) };
}

export function workspacePropertiesEncryptionDeserializer(
  item: any,
): WorkspacePropertiesEncryption {
  return {
    entities: encryptionEntitiesDefinitionDeserializer(item["entities"]),
  };
}

/** Encryption entities for databricks workspace resource. */
export interface EncryptionEntitiesDefinition {
  /** Encryption properties for the databricks managed services. Supported in both Serverless and Hybrid ComputeMode. */
  managedServices?: EncryptionV2;
  /** Encryption properties for the databricks managed disks. Not allowed in Serverless ComputeMode workspace. */
  managedDisk?: ManagedDiskEncryption;
}

export function encryptionEntitiesDefinitionSerializer(item: EncryptionEntitiesDefinition): any {
  return {
    managedServices: !item["managedServices"]
      ? item["managedServices"]
      : encryptionV2Serializer(item["managedServices"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskEncryptionSerializer(item["managedDisk"]),
  };
}

export function encryptionEntitiesDefinitionDeserializer(item: any): EncryptionEntitiesDefinition {
  return {
    managedServices: !item["managedServices"]
      ? item["managedServices"]
      : encryptionV2Deserializer(item["managedServices"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskEncryptionDeserializer(item["managedDisk"]),
  };
}

/** The object that contains details of encryption used on the workspace. */
export interface EncryptionV2 {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Keyvault */
  keySource: EncryptionKeySource;
  /** Key Vault input properties for encryption. */
  keyVaultProperties?: EncryptionV2KeyVaultProperties;
}

export function encryptionV2Serializer(item: EncryptionV2): any {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionV2KeyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function encryptionV2Deserializer(item: any): EncryptionV2 {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionV2KeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
  };
}

/** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Keyvault */
export enum KnownEncryptionKeySource {
  /** Microsoft.Keyvault */
  MicrosoftKeyvault = "Microsoft.Keyvault",
}

/**
 * The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Keyvault \
 * {@link KnownEncryptionKeySource} can be used interchangeably with EncryptionKeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Keyvault**: Microsoft.Keyvault
 */
export type EncryptionKeySource = string;

/** Key Vault input properties for encryption. */
export interface EncryptionV2KeyVaultProperties {
  /** The Uri of KeyVault. */
  keyVaultUri: string;
  /** The name of KeyVault key. */
  keyName: string;
  /** The version of KeyVault key. */
  keyVersion: string;
}

export function encryptionV2KeyVaultPropertiesSerializer(
  item: EncryptionV2KeyVaultProperties,
): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

export function encryptionV2KeyVaultPropertiesDeserializer(
  item: any,
): EncryptionV2KeyVaultProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** The object that contains details of encryption used on the workspace. */
export interface ManagedDiskEncryption {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Keyvault. Not allowed in Serverless ComputeMode workspace. */
  keySource: EncryptionKeySource;
  /** Key Vault input properties for encryption. */
  keyVaultProperties: ManagedDiskEncryptionKeyVaultProperties;
  /** Indicate whether the latest key version should be automatically used for Managed Disk Encryption. */
  rotationToLatestKeyVersionEnabled?: boolean;
}

export function managedDiskEncryptionSerializer(item: ManagedDiskEncryption): any {
  return {
    keySource: item["keySource"],
    keyVaultProperties: managedDiskEncryptionKeyVaultPropertiesSerializer(
      item["keyVaultProperties"],
    ),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
  };
}

export function managedDiskEncryptionDeserializer(item: any): ManagedDiskEncryption {
  return {
    keySource: item["keySource"],
    keyVaultProperties: managedDiskEncryptionKeyVaultPropertiesDeserializer(
      item["keyVaultProperties"],
    ),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
  };
}

/** Key Vault input properties for encryption. */
export interface ManagedDiskEncryptionKeyVaultProperties {
  /** The URI of KeyVault. */
  keyVaultUri: string;
  /** The name of KeyVault key. */
  keyName: string;
  /** The version of KeyVault key. */
  keyVersion: string;
}

export function managedDiskEncryptionKeyVaultPropertiesSerializer(
  item: ManagedDiskEncryptionKeyVaultProperties,
): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

export function managedDiskEncryptionKeyVaultPropertiesDeserializer(
  item: any,
): ManagedDiskEncryptionKeyVaultProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** Status of settings related to the Enhanced Security and Compliance Add-On. */
export interface EnhancedSecurityComplianceDefinition {
  /** Status of automated cluster updates feature. */
  automaticClusterUpdate?: AutomaticClusterUpdateDefinition;
  /** Status of Compliance Security Profile feature. */
  complianceSecurityProfile?: ComplianceSecurityProfileDefinition;
  /** Status of Enhanced Security Monitoring feature. */
  enhancedSecurityMonitoring?: EnhancedSecurityMonitoringDefinition;
}

export function enhancedSecurityComplianceDefinitionSerializer(
  item: EnhancedSecurityComplianceDefinition,
): any {
  return {
    automaticClusterUpdate: !item["automaticClusterUpdate"]
      ? item["automaticClusterUpdate"]
      : automaticClusterUpdateDefinitionSerializer(item["automaticClusterUpdate"]),
    complianceSecurityProfile: !item["complianceSecurityProfile"]
      ? item["complianceSecurityProfile"]
      : complianceSecurityProfileDefinitionSerializer(item["complianceSecurityProfile"]),
    enhancedSecurityMonitoring: !item["enhancedSecurityMonitoring"]
      ? item["enhancedSecurityMonitoring"]
      : enhancedSecurityMonitoringDefinitionSerializer(item["enhancedSecurityMonitoring"]),
  };
}

export function enhancedSecurityComplianceDefinitionDeserializer(
  item: any,
): EnhancedSecurityComplianceDefinition {
  return {
    automaticClusterUpdate: !item["automaticClusterUpdate"]
      ? item["automaticClusterUpdate"]
      : automaticClusterUpdateDefinitionDeserializer(item["automaticClusterUpdate"]),
    complianceSecurityProfile: !item["complianceSecurityProfile"]
      ? item["complianceSecurityProfile"]
      : complianceSecurityProfileDefinitionDeserializer(item["complianceSecurityProfile"]),
    enhancedSecurityMonitoring: !item["enhancedSecurityMonitoring"]
      ? item["enhancedSecurityMonitoring"]
      : enhancedSecurityMonitoringDefinitionDeserializer(item["enhancedSecurityMonitoring"]),
  };
}

/** Status of automated cluster updates feature. */
export interface AutomaticClusterUpdateDefinition {
  value?: AutomaticClusterUpdateValue;
}

export function automaticClusterUpdateDefinitionSerializer(
  item: AutomaticClusterUpdateDefinition,
): any {
  return { value: item["value"] };
}

export function automaticClusterUpdateDefinitionDeserializer(
  item: any,
): AutomaticClusterUpdateDefinition {
  return {
    value: item["value"],
  };
}

/** Known values of {@link AutomaticClusterUpdateValue} that the service accepts. */
export enum KnownAutomaticClusterUpdateValue {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of AutomaticClusterUpdateValue */
export type AutomaticClusterUpdateValue = string;

/** Status of Compliance Security Profile feature. */
export interface ComplianceSecurityProfileDefinition {
  /** Compliance standards associated with the workspace. */
  complianceStandards?: string[];
  value?: ComplianceSecurityProfileValue;
}

export function complianceSecurityProfileDefinitionSerializer(
  item: ComplianceSecurityProfileDefinition,
): any {
  return {
    complianceStandards: !item["complianceStandards"]
      ? item["complianceStandards"]
      : item["complianceStandards"].map((p: any) => {
          return p;
        }),
    value: item["value"],
  };
}

export function complianceSecurityProfileDefinitionDeserializer(
  item: any,
): ComplianceSecurityProfileDefinition {
  return {
    complianceStandards: !item["complianceStandards"]
      ? item["complianceStandards"]
      : item["complianceStandards"].map((p: any) => {
          return p;
        }),
    value: item["value"],
  };
}

/** Known values of {@link ComplianceSecurityProfileValue} that the service accepts. */
export enum KnownComplianceSecurityProfileValue {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of ComplianceSecurityProfileValue */
export type ComplianceSecurityProfileValue = string;

/** Status of Enhanced Security Monitoring feature. */
export interface EnhancedSecurityMonitoringDefinition {
  value?: EnhancedSecurityMonitoringValue;
}

export function enhancedSecurityMonitoringDefinitionSerializer(
  item: EnhancedSecurityMonitoringDefinition,
): any {
  return { value: item["value"] };
}

export function enhancedSecurityMonitoringDefinitionDeserializer(
  item: any,
): EnhancedSecurityMonitoringDefinition {
  return {
    value: item["value"],
  };
}

/** Known values of {@link EnhancedSecurityMonitoringValue} that the service accepts. */
export enum KnownEnhancedSecurityMonitoringValue {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of EnhancedSecurityMonitoringValue */
export type EnhancedSecurityMonitoringValue = string;

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

/** The private endpoint connection of a workspace. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint connection properties. */
  properties: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return { properties: privateEndpointConnectionPropertiesSerializer(item["properties"]) };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint */
  privateEndpoint?: PrivateEndpoint;
  /** GroupIds from the private link service resource. */
  groupIds?: string[];
  /** Private endpoint connection state */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** Provisioning state of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint property of a private endpoint connection. */
export interface PrivateEndpoint {
  /** The resource identifier. */
  readonly id?: string;
}

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The current state of a private endpoint connection. */
export interface PrivateLinkServiceConnectionState {
  /** The status of a private endpoint connection */
  status: PrivateLinkServiceConnectionStatus;
  /** The description for the current state of a private endpoint connection */
  description?: string;
  /** Actions required for a private endpoint connection */
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

/** The status of a private endpoint connection */
export enum KnownPrivateLinkServiceConnectionStatus {
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
 * The status of a private endpoint connection \
 * {@link KnownPrivateLinkServiceConnectionStatus} can be used interchangeably with PrivateLinkServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PrivateLinkServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Failed**: Failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** The network access type for accessing workspace. Set value to disabled to access workspace only via private link. Used to configure front-end only private link for Serverless ComputeMode workspace. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The network access type for accessing workspace. Set value to disabled to access workspace only via private link. Used to configure front-end only private link for Serverless ComputeMode workspace. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Gets or sets a value indicating whether data plane (clusters) to control plane communication happen over private endpoint. Supported values are 'AllRules' and 'NoAzureDatabricksRules'. 'NoAzureServiceRules' value is for internal use only. Not allowed in Serverless ComputeMode workspace. */
export enum KnownRequiredNsgRules {
  /** AllRules */
  AllRules = "AllRules",
  /** NoAzureDatabricksRules */
  NoAzureDatabricksRules = "NoAzureDatabricksRules",
  /** NoAzureServiceRules */
  NoAzureServiceRules = "NoAzureServiceRules",
}

/**
 * Gets or sets a value indicating whether data plane (clusters) to control plane communication happen over private endpoint. Supported values are 'AllRules' and 'NoAzureDatabricksRules'. 'NoAzureServiceRules' value is for internal use only. Not allowed in Serverless ComputeMode workspace. \
 * {@link KnownRequiredNsgRules} can be used interchangeably with RequiredNsgRules,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllRules**: AllRules \
 * **NoAzureDatabricksRules**: NoAzureDatabricksRules \
 * **NoAzureServiceRules**: NoAzureServiceRules
 */
export type RequiredNsgRules = string;

/** These properties lets user specify default catalog properties during workspace creation. Not allowed in Serverless ComputeMode workspace. */
export interface DefaultCatalogProperties {
  /** Defines the initial type of the default catalog. Possible values (case-insensitive):  HiveMetastore, UnityCatalog */
  initialType?: InitialType;
  /** Specifies the initial Name of default catalog. If not specified, the name of the workspace will be used. */
  initialName?: string;
}

export function defaultCatalogPropertiesSerializer(item: DefaultCatalogProperties): any {
  return { initialType: item["initialType"], initialName: item["initialName"] };
}

export function defaultCatalogPropertiesDeserializer(item: any): DefaultCatalogProperties {
  return {
    initialType: item["initialType"],
    initialName: item["initialName"],
  };
}

/** Defines the initial type of the default catalog. Possible values (case-insensitive):  HiveMetastore, UnityCatalog */
export enum KnownInitialType {
  /** HiveMetastore */
  HiveMetastore = "HiveMetastore",
  /** UnityCatalog */
  UnityCatalog = "UnityCatalog",
}

/**
 * Defines the initial type of the default catalog. Possible values (case-insensitive):  HiveMetastore, UnityCatalog \
 * {@link KnownInitialType} can be used interchangeably with InitialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HiveMetastore**: HiveMetastore \
 * **UnityCatalog**: UnityCatalog
 */
export type InitialType = string;

/** Access Connector Resource that is going to be associated with Databricks Workspace. Not allowed in Serverless ComputeMode workspace. */
export interface WorkspacePropertiesAccessConnector {
  /** The resource ID of Azure Databricks Access Connector Resource. */
  id: string;
  /** The identity type of the Access Connector Resource. */
  identityType: IdentityType;
  /** The resource ID of the User Assigned Identity associated with the Access Connector Resource. This is required for type 'UserAssigned' and not valid for type 'SystemAssigned'. */
  userAssignedIdentityId?: string;
}

export function workspacePropertiesAccessConnectorSerializer(
  item: WorkspacePropertiesAccessConnector,
): any {
  return {
    id: item["id"],
    identityType: item["identityType"],
    userAssignedIdentityId: item["userAssignedIdentityId"],
  };
}

export function workspacePropertiesAccessConnectorDeserializer(
  item: any,
): WorkspacePropertiesAccessConnector {
  return {
    id: item["id"],
    identityType: item["identityType"],
    userAssignedIdentityId: item["userAssignedIdentityId"],
  };
}

/** The identity type of the Access Connector Resource. */
export enum KnownIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The identity type of the Access Connector Resource. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type IdentityType = string;

/** Gets or Sets Default Storage Firewall configuration information. Not allowed in Serverless ComputeMode workspace. */
export enum KnownDefaultStorageFirewall {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Gets or Sets Default Storage Firewall configuration information. Not allowed in Serverless ComputeMode workspace. \
 * {@link KnownDefaultStorageFirewall} can be used interchangeably with DefaultStorageFirewall,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type DefaultStorageFirewall = string;

/** SKU for the resource. */
export interface Sku {
  /** The SKU name. */
  name: string;
  /** The SKU tier. */
  tier?: string;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** An update to a workspace. */
export interface WorkspaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Workspace list operation. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** List of private link connections. */
export interface _PrivateEndpointConnectionsList {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionsListDeserializer(
  item: any,
): _PrivateEndpointConnectionsList {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Information about Azure Databricks Access Connector. */
export interface AccessConnector extends TrackedResource {
  /** Azure Databricks Access Connector properties */
  properties?: AccessConnectorProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function accessConnectorSerializer(item: AccessConnector): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : accessConnectorPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function accessConnectorDeserializer(item: any): AccessConnector {
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
      : accessConnectorPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** model interface AccessConnectorProperties */
export interface AccessConnectorProperties {
  /** Provisioning status of the Access Connector. */
  readonly provisioningState?: ProvisioningState;
  /** List of workspaces referring this Access Connector. */
  readonly referedBy?: string[];
}

export function accessConnectorPropertiesSerializer(_item: AccessConnectorProperties): any {
  return {};
}

export function accessConnectorPropertiesDeserializer(item: any): AccessConnectorProperties {
  return {
    provisioningState: item["provisioningState"],
    referedBy: !item["referedBy"]
      ? item["referedBy"]
      : item["referedBy"].map((p: any) => {
          return p;
        }),
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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** An update to an Azure Databricks Access Connector. */
export interface AccessConnectorUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
}

export function accessConnectorUpdateSerializer(item: AccessConnectorUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a AccessConnector list operation. */
export interface _AccessConnectorListResult {
  /** The AccessConnector items on this page */
  value: AccessConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessConnectorListResultDeserializer(item: any): _AccessConnectorListResult {
  return {
    value: accessConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accessConnectorArraySerializer(result: Array<AccessConnector>): any[] {
  return result.map((item) => {
    return accessConnectorSerializer(item);
  });
}

export function accessConnectorArrayDeserializer(result: Array<AccessConnector>): any[] {
  return result.map((item) => {
    return accessConnectorDeserializer(item);
  });
}

/** Egress endpoints which Workspace connects to for common purposes. */
export interface OutboundEnvironmentEndpoint {
  /** The category of endpoints accessed by the Workspace, e.g. azure-storage, azure-mysql, etc. */
  category?: string;
  /** The endpoints that Workspace connect to */
  endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name or IP address the Workspace is reaching at. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports used when connecting to domainName. */
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

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Connect information from the Workspace to a single endpoint. */
export interface EndpointDetail {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The time in milliseconds it takes for the connection to be created from the Workspace to this IpAddress at this Port. */
  latency?: number;
  /** Whether it is possible to create a connection from the Workspace to this IpAddress at this Port. */
  isAccessible?: boolean;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    ipAddress: item["ipAddress"],
    port: item["port"],
    latency: item["latency"],
    isAccessible: item["isAccessible"],
  };
}

/** The group information for creating a private endpoint on a workspace */
export interface GroupIdInformation extends ProxyResource {
  /** The group id properties. */
  properties: GroupIdInformationProperties;
}

export function groupIdInformationDeserializer(item: any): GroupIdInformation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: groupIdInformationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties for a group information object */
export interface GroupIdInformationProperties {
  /** The group id */
  groupId?: string;
  /** The required members for a specific group id */
  requiredMembers?: string[];
  /** The required DNS zones for a specific group id */
  requiredZoneNames?: string[];
}

export function groupIdInformationPropertiesDeserializer(item: any): GroupIdInformationProperties {
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

/** The available private link resources for a workspace */
export interface _PrivateLinkResourcesList {
  /** The GroupIdInformation items on this page */
  value: GroupIdInformation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourcesListDeserializer(item: any): _PrivateLinkResourcesList {
  return {
    value: groupIdInformationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupIdInformationArrayDeserializer(result: Array<GroupIdInformation>): any[] {
  return result.map((item) => {
    return groupIdInformationDeserializer(item);
  });
}

/** Peerings in a VirtualNetwork resource */
export interface VirtualNetworkPeering extends ProxyResource {
  /** Whether the VMs in the local virtual network space would be able to access the VMs in remote virtual network space. */
  allowVirtualNetworkAccess?: boolean;
  /** Whether the forwarded traffic from the VMs in the local virtual network will be allowed/disallowed in remote virtual network. */
  allowForwardedTraffic?: boolean;
  /** If gateway links can be used in remote virtual networking to link to this virtual network. */
  allowGatewayTransit?: boolean;
  /** If remote gateways can be used on this virtual network. If the flag is set to true, and allowGatewayTransit on remote peering is also true, virtual network will use gateways of remote virtual network for transit. Only one peering can have this flag set to true. This flag cannot be set if virtual network already has a gateway. */
  useRemoteGateways?: boolean;
  /** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  databricksVirtualNetwork?: VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork;
  /** The reference to the databricks virtual network address space. */
  databricksAddressSpace?: AddressSpace;
  /** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  remoteVirtualNetwork: VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork;
  /** The reference to the remote virtual network address space. */
  remoteAddressSpace?: AddressSpace;
  /** The status of the virtual network peering. */
  readonly peeringState?: PeeringState;
  /** The provisioning state of the virtual network peering resource. */
  readonly provisioningState?: PeeringProvisioningState;
}

export function virtualNetworkPeeringSerializer(item: VirtualNetworkPeering): any {
  return { properties: _virtualNetworkPeeringPropertiesSerializer(item) };
}

export function virtualNetworkPeeringDeserializer(item: any): VirtualNetworkPeering {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._virtualNetworkPeeringPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the virtual network peering. */
export interface VirtualNetworkPeeringPropertiesFormat {
  /** Whether the VMs in the local virtual network space would be able to access the VMs in remote virtual network space. */
  allowVirtualNetworkAccess?: boolean;
  /** Whether the forwarded traffic from the VMs in the local virtual network will be allowed/disallowed in remote virtual network. */
  allowForwardedTraffic?: boolean;
  /** If gateway links can be used in remote virtual networking to link to this virtual network. */
  allowGatewayTransit?: boolean;
  /** If remote gateways can be used on this virtual network. If the flag is set to true, and allowGatewayTransit on remote peering is also true, virtual network will use gateways of remote virtual network for transit. Only one peering can have this flag set to true. This flag cannot be set if virtual network already has a gateway. */
  useRemoteGateways?: boolean;
  /** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  databricksVirtualNetwork?: VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork;
  /** The reference to the databricks virtual network address space. */
  databricksAddressSpace?: AddressSpace;
  /** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
  remoteVirtualNetwork: VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork;
  /** The reference to the remote virtual network address space. */
  remoteAddressSpace?: AddressSpace;
  /** The status of the virtual network peering. */
  readonly peeringState?: PeeringState;
  /** The provisioning state of the virtual network peering resource. */
  readonly provisioningState?: PeeringProvisioningState;
}

export function virtualNetworkPeeringPropertiesFormatSerializer(
  item: VirtualNetworkPeeringPropertiesFormat,
): any {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    databricksVirtualNetwork: !item["databricksVirtualNetwork"]
      ? item["databricksVirtualNetwork"]
      : virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkSerializer(
          item["databricksVirtualNetwork"],
        ),
    databricksAddressSpace: !item["databricksAddressSpace"]
      ? item["databricksAddressSpace"]
      : addressSpaceSerializer(item["databricksAddressSpace"]),
    remoteVirtualNetwork: virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkSerializer(
      item["remoteVirtualNetwork"],
    ),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceSerializer(item["remoteAddressSpace"]),
  };
}

export function virtualNetworkPeeringPropertiesFormatDeserializer(
  item: any,
): VirtualNetworkPeeringPropertiesFormat {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    databricksVirtualNetwork: !item["databricksVirtualNetwork"]
      ? item["databricksVirtualNetwork"]
      : virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkDeserializer(
          item["databricksVirtualNetwork"],
        ),
    databricksAddressSpace: !item["databricksAddressSpace"]
      ? item["databricksAddressSpace"]
      : addressSpaceDeserializer(item["databricksAddressSpace"]),
    remoteVirtualNetwork: virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkDeserializer(
      item["remoteVirtualNetwork"],
    ),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceDeserializer(item["remoteAddressSpace"]),
    peeringState: item["peeringState"],
    provisioningState: item["provisioningState"],
  };
}

/** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
export interface VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork {
  /** The Id of the databricks virtual network. */
  id?: string;
}

export function virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkSerializer(
  item: VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork,
): any {
  return { id: item["id"] };
}

export function virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkDeserializer(
  item: any,
): VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork {
  return {
    id: item["id"],
  };
}

/** AddressSpace contains an array of IP address ranges that can be used by subnets of the virtual network. */
export interface AddressSpace {
  /** A list of address blocks reserved for this virtual network in CIDR notation. */
  addressPrefixes?: string[];
}

export function addressSpaceSerializer(item: AddressSpace): any {
  return {
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function addressSpaceDeserializer(item: any): AddressSpace {
  return {
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

/** The remote virtual network should be in the same region. See here to learn more (https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/vnet-peering). */
export interface VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork {
  /** The Id of the remote virtual network. */
  id?: string;
}

export function virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkSerializer(
  item: VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork,
): any {
  return { id: item["id"] };
}

export function virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkDeserializer(
  item: any,
): VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork {
  return {
    id: item["id"],
  };
}

/** The status of the virtual network peering. */
export enum KnownPeeringState {
  /** Initiated */
  Initiated = "Initiated",
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The status of the virtual network peering. \
 * {@link KnownPeeringState} can be used interchangeably with PeeringState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initiated**: Initiated \
 * **Connected**: Connected \
 * **Disconnected**: Disconnected
 */
export type PeeringState = string;

/** The current provisioning state. */
export enum KnownPeeringProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPeeringProvisioningState} can be used interchangeably with PeeringProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Failed**: Failed
 */
export type PeeringProvisioningState = string;

/** Gets all virtual network peerings under a workspace. */
export interface _VirtualNetworkPeeringList {
  /** The VirtualNetworkPeering items on this page */
  value: VirtualNetworkPeering[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkPeeringListDeserializer(item: any): _VirtualNetworkPeeringList {
  return {
    value: virtualNetworkPeeringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkPeeringArraySerializer(result: Array<VirtualNetworkPeering>): any[] {
  return result.map((item) => {
    return virtualNetworkPeeringSerializer(item);
  });
}

export function virtualNetworkPeeringArrayDeserializer(
  result: Array<VirtualNetworkPeering>,
): any[] {
  return result.map((item) => {
    return virtualNetworkPeeringDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-01-01 API version. */
  V20260101 = "2026-01-01",
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

export function _workspacePropertiesSerializer(item: Workspace): any {
  return {
    computeMode: item["computeMode"],
    managedResourceGroupId: item["managedResourceGroupId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workspaceCustomParametersSerializer(item["parameters"]),
    uiDefinitionUri: item["uiDefinitionUri"],
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : workspaceProviderAuthorizationArraySerializer(item["authorizations"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : createdBySerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : createdBySerializer(item["updatedBy"]),
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : managedIdentityConfigurationSerializer(item["storageAccountIdentity"]),
    managedDiskIdentity: !item["managedDiskIdentity"]
      ? item["managedDiskIdentity"]
      : managedIdentityConfigurationSerializer(item["managedDiskIdentity"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspacePropertiesEncryptionSerializer(item["encryption"]),
    enhancedSecurityCompliance: !item["enhancedSecurityCompliance"]
      ? item["enhancedSecurityCompliance"]
      : enhancedSecurityComplianceDefinitionSerializer(item["enhancedSecurityCompliance"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    requiredNsgRules: item["requiredNsgRules"],
    defaultCatalog: !item["defaultCatalog"]
      ? item["defaultCatalog"]
      : defaultCatalogPropertiesSerializer(item["defaultCatalog"]),
    accessConnector: !item["accessConnector"]
      ? item["accessConnector"]
      : workspacePropertiesAccessConnectorSerializer(item["accessConnector"]),
    defaultStorageFirewall: item["defaultStorageFirewall"],
  };
}

export function _workspacePropertiesDeserializer(item: any) {
  return {
    computeMode: item["computeMode"],
    managedResourceGroupId: item["managedResourceGroupId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workspaceCustomParametersDeserializer(item["parameters"]),
    provisioningState: item["provisioningState"],
    uiDefinitionUri: item["uiDefinitionUri"],
    authorizations: !item["authorizations"]
      ? item["authorizations"]
      : workspaceProviderAuthorizationArrayDeserializer(item["authorizations"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : createdByDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : createdByDeserializer(item["updatedBy"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    workspaceId: item["workspaceId"],
    workspaceUrl: item["workspaceUrl"],
    storageAccountIdentity: !item["storageAccountIdentity"]
      ? item["storageAccountIdentity"]
      : managedIdentityConfigurationDeserializer(item["storageAccountIdentity"]),
    managedDiskIdentity: !item["managedDiskIdentity"]
      ? item["managedDiskIdentity"]
      : managedIdentityConfigurationDeserializer(item["managedDiskIdentity"]),
    diskEncryptionSetId: item["diskEncryptionSetId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspacePropertiesEncryptionDeserializer(item["encryption"]),
    enhancedSecurityCompliance: !item["enhancedSecurityCompliance"]
      ? item["enhancedSecurityCompliance"]
      : enhancedSecurityComplianceDefinitionDeserializer(item["enhancedSecurityCompliance"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    requiredNsgRules: item["requiredNsgRules"],
    defaultCatalog: !item["defaultCatalog"]
      ? item["defaultCatalog"]
      : defaultCatalogPropertiesDeserializer(item["defaultCatalog"]),
    isUcEnabled: item["isUcEnabled"],
    accessConnector: !item["accessConnector"]
      ? item["accessConnector"]
      : workspacePropertiesAccessConnectorDeserializer(item["accessConnector"]),
    defaultStorageFirewall: item["defaultStorageFirewall"],
  };
}

export function _virtualNetworkPeeringPropertiesSerializer(item: VirtualNetworkPeering): any {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    databricksVirtualNetwork: !item["databricksVirtualNetwork"]
      ? item["databricksVirtualNetwork"]
      : virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkSerializer(
          item["databricksVirtualNetwork"],
        ),
    databricksAddressSpace: !item["databricksAddressSpace"]
      ? item["databricksAddressSpace"]
      : addressSpaceSerializer(item["databricksAddressSpace"]),
    remoteVirtualNetwork: virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkSerializer(
      item["remoteVirtualNetwork"],
    ),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceSerializer(item["remoteAddressSpace"]),
  };
}

export function _virtualNetworkPeeringPropertiesDeserializer(item: any) {
  return {
    allowVirtualNetworkAccess: item["allowVirtualNetworkAccess"],
    allowForwardedTraffic: item["allowForwardedTraffic"],
    allowGatewayTransit: item["allowGatewayTransit"],
    useRemoteGateways: item["useRemoteGateways"],
    databricksVirtualNetwork: !item["databricksVirtualNetwork"]
      ? item["databricksVirtualNetwork"]
      : virtualNetworkPeeringPropertiesFormatDatabricksVirtualNetworkDeserializer(
          item["databricksVirtualNetwork"],
        ),
    databricksAddressSpace: !item["databricksAddressSpace"]
      ? item["databricksAddressSpace"]
      : addressSpaceDeserializer(item["databricksAddressSpace"]),
    remoteVirtualNetwork: virtualNetworkPeeringPropertiesFormatRemoteVirtualNetworkDeserializer(
      item["remoteVirtualNetwork"],
    ),
    remoteAddressSpace: !item["remoteAddressSpace"]
      ? item["remoteAddressSpace"]
      : addressSpaceDeserializer(item["remoteAddressSpace"]),
    peeringState: item["peeringState"],
    provisioningState: item["provisioningState"],
  };
}
