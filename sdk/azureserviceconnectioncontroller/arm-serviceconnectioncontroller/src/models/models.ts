// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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

/** An Azure Service Connection Controller owned by its Probing Gateway. Direct customer PUT and DELETE requests are denied; deleting its gateway deletes the controller and its managed resources. Only tags can be updated directly. */
export interface AzureServiceConnectionController extends TrackedResource {
  /** The properties of the Azure Service Connection Controller. */
  properties?: AzureServiceConnectionControllerProperties;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
}

export function azureServiceConnectionControllerSerializer(
  item: AzureServiceConnectionController,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : azureServiceConnectionControllerPropertiesSerializer(item["properties"]),
    managedBy: item["managedBy"],
  };
}

export function azureServiceConnectionControllerDeserializer(
  item: any,
): AzureServiceConnectionController {
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
      : azureServiceConnectionControllerPropertiesDeserializer(item["properties"]),
    managedBy: item["managedBy"],
  };
}

/** Class representing the Azure Service Connection Controller properties. */
export interface AzureServiceConnectionControllerProperties {
  /** The reference to the subnet where the Azure Service Connection Controller is deployed. */
  subnetId?: string;
  /** The IP configuration parameters for the Azure Service Connection Controller. */
  ipConfigurations?: IpConfiguration[];
  /** Properties of the related Azure components providing the underlying infrastructure. */
  providerConnections?: ProviderConnectionProperties[];
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** Provisioning state of the resource. */
  readonly provisioningState?: AzureServiceConnectionControllerProvisioningState;
  /** The resource ID of the effective UDR (User Defined Route) selected by the service and applied to the Azure Service Connection Controller. */
  readonly udr?: string;
}

export function azureServiceConnectionControllerPropertiesSerializer(
  item: AzureServiceConnectionControllerProperties,
): any {
  return {
    subnetId: item["subnetId"],
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArraySerializer(item["ipConfigurations"]),
    providerConnections: !item["providerConnections"]
      ? item["providerConnections"]
      : providerConnectionPropertiesArraySerializer(item["providerConnections"]),
  };
}

export function azureServiceConnectionControllerPropertiesDeserializer(
  item: any,
): AzureServiceConnectionControllerProperties {
  return {
    subnetId: item["subnetId"],
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArrayDeserializer(item["ipConfigurations"]),
    providerConnections: !item["providerConnections"]
      ? item["providerConnections"]
      : providerConnectionPropertiesArrayDeserializer(item["providerConnections"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    provisioningState: item["provisioningState"],
    udr: item["udr"],
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

/** Class representing the IP configuration properties. */
export interface IpConfiguration {
  /** The IP V4 address. */
  privateIpV4Address?: string;
  /** Private IP Allocation Method */
  ipAllocationMethod?: IPAllocationMethod;
}

export function ipConfigurationSerializer(item: IpConfiguration): any {
  return {
    privateIpV4Address: item["privateIpV4Address"],
    ipAllocationMethod: item["ipAllocationMethod"],
  };
}

export function ipConfigurationDeserializer(item: any): IpConfiguration {
  return {
    privateIpV4Address: item["privateIpV4Address"],
    ipAllocationMethod: item["ipAllocationMethod"],
  };
}

/** The allowed Private IP allocation methods */
export enum KnownIPAllocationMethod {
  /** Static Private IP address allocation */
  Static = "Static",
}

/**
 * The allowed Private IP allocation methods \
 * {@link KnownIPAllocationMethod} can be used interchangeably with IPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: Static Private IP address allocation
 */
export type IPAllocationMethod = string;

export function providerConnectionPropertiesArraySerializer(
  result: Array<ProviderConnectionProperties>,
): any[] {
  return result.map((item) => {
    return providerConnectionPropertiesSerializer(item);
  });
}

export function providerConnectionPropertiesArrayDeserializer(
  result: Array<ProviderConnectionProperties>,
): any[] {
  return result.map((item) => {
    return providerConnectionPropertiesDeserializer(item);
  });
}

/** Properties describing a provider connection for a Private Outbound resource. */
export interface ProviderConnectionProperties {
  /** The name of the provider connection. */
  name?: string;
  /** The resource ID of the virtual network associated with the provider connection. */
  subnetId?: string;
  /** The persisted IP configuration parameters for the provider connection, returned when the resource is read. */
  ipConfiguration?: IpConfiguration;
  /** The fully qualified Azure Resource Manager resource ID of the resource group in which the private endpoint for the provider connection is created. The resource group must be in the same subscription as the Azure Service Connection Controller. The resource ID is case insensitive and cannot be changed after creation. */
  privateEndpointResourceGroup?: string;
  /** The resource ID of the source private endpoint associated with the provider connection. */
  readonly sourceResourceId?: string;
}

export function providerConnectionPropertiesSerializer(item: ProviderConnectionProperties): any {
  return {
    name: item["name"],
    subnetId: item["subnetId"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : ipConfigurationSerializer(item["ipConfiguration"]),
    privateEndpointResourceGroup: item["privateEndpointResourceGroup"],
  };
}

export function providerConnectionPropertiesDeserializer(item: any): ProviderConnectionProperties {
  return {
    name: item["name"],
    subnetId: item["subnetId"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : ipConfigurationDeserializer(item["ipConfiguration"]),
    privateEndpointResourceGroup: item["privateEndpointResourceGroup"],
    sourceResourceId: item["sourceResourceId"],
  };
}

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

/** The provisioning state of the Azure Service Connection Controller resource. */
export enum KnownAzureServiceConnectionControllerProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the Azure Service Connection Controller resource. \
 * {@link KnownAzureServiceConnectionControllerProvisioningState} can be used interchangeably with AzureServiceConnectionControllerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type AzureServiceConnectionControllerProvisioningState = string;

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

/** The type used for updating tags in AzureServiceConnectionController resources. */
export interface AzureServiceConnectionControllerTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function azureServiceConnectionControllerTagsUpdateSerializer(
  item: AzureServiceConnectionControllerTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** The response of a AzureServiceConnectionController list operation. */
export interface _AzureServiceConnectionControllerListResult {
  /** The AzureServiceConnectionController items on this page */
  value: AzureServiceConnectionController[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureServiceConnectionControllerListResultDeserializer(
  item: any,
): _AzureServiceConnectionControllerListResult {
  return {
    value: azureServiceConnectionControllerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureServiceConnectionControllerArraySerializer(
  result: Array<AzureServiceConnectionController>,
): any[] {
  return result.map((item) => {
    return azureServiceConnectionControllerSerializer(item);
  });
}

export function azureServiceConnectionControllerArrayDeserializer(
  result: Array<AzureServiceConnectionController>,
): any[] {
  return result.map((item) => {
    return azureServiceConnectionControllerDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-02-09-preview version */
  V20260209Preview = "2026-02-09-preview",
}
