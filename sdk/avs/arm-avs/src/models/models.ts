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

/** The response of a Addon list operation. */
export interface _AddonList {
  /** The Addon items on this page */
  value: Addon[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _addonListDeserializer(item: any): _AddonList {
  return {
    value: addonArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function addonArraySerializer(result: Array<Addon>): any[] {
  return result.map((item) => {
    return addonSerializer(item);
  });
}

export function addonArrayDeserializer(result: Array<Addon>): any[] {
  return result.map((item) => {
    return addonDeserializer(item);
  });
}

/** An addon resource */
export interface Addon extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AddonPropertiesUnion;
}

export function addonSerializer(item: Addon): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : addonPropertiesUnionSerializer(item["properties"]),
  };
}

export function addonDeserializer(item: any): Addon {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : addonPropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of an addon */
export interface AddonProperties {
  /** Addon type */
  /** The discriminator possible values: SRM, VR, HCX, Arc */
  addonType: AddonType;
  /** The state of the addon provisioning */
  readonly provisioningState?: AddonProvisioningState;
}

export function addonPropertiesSerializer(item: AddonProperties): any {
  return { addonType: item["addonType"] };
}

export function addonPropertiesDeserializer(item: any): AddonProperties {
  return {
    addonType: item["addonType"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for AddonPropertiesUnion */
export type AddonPropertiesUnion =
  | AddonSrmProperties
  | AddonVrProperties
  | AddonHcxProperties
  | AddonArcProperties
  | AddonProperties;

export function addonPropertiesUnionSerializer(item: AddonPropertiesUnion): any {
  switch (item.addonType) {
    case "SRM":
      return addonSrmPropertiesSerializer(item as AddonSrmProperties);

    case "VR":
      return addonVrPropertiesSerializer(item as AddonVrProperties);

    case "HCX":
      return addonHcxPropertiesSerializer(item as AddonHcxProperties);

    case "Arc":
      return addonArcPropertiesSerializer(item as AddonArcProperties);

    default:
      return addonPropertiesSerializer(item);
  }
}

export function addonPropertiesUnionDeserializer(item: any): AddonPropertiesUnion {
  switch (item.addonType) {
    case "SRM":
      return addonSrmPropertiesDeserializer(item as AddonSrmProperties);

    case "VR":
      return addonVrPropertiesDeserializer(item as AddonVrProperties);

    case "HCX":
      return addonHcxPropertiesDeserializer(item as AddonHcxProperties);

    case "Arc":
      return addonArcPropertiesDeserializer(item as AddonArcProperties);

    default:
      return addonPropertiesDeserializer(item);
  }
}

/** Addon type */
export enum KnownAddonType {
  /** SRM */
  SRM = "SRM",
  /** VR */
  VR = "VR",
  /** HCX */
  HCX = "HCX",
  /** Arc */
  Arc = "Arc",
}

/**
 * Addon type \
 * {@link KnownAddonType} can be used interchangeably with AddonType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SRM** \
 * **VR** \
 * **HCX** \
 * **Arc**
 */
export type AddonType = string;

/** Addon provisioning state */
export enum KnownAddonProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is cancelled */
  Cancelled = "Cancelled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Addon provisioning state \
 * {@link KnownAddonProvisioningState} can be used interchangeably with AddonProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Cancelled**: is cancelled \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type AddonProvisioningState = string;

/** The properties of a Site Recovery Manager (SRM) addon */
export interface AddonSrmProperties extends AddonProperties {
  /** The Site Recovery Manager (SRM) license */
  licenseKey?: string;
  /** The type of private cloud addon */
  addonType: "SRM";
}

export function addonSrmPropertiesSerializer(item: AddonSrmProperties): any {
  return { addonType: item["addonType"], licenseKey: item["licenseKey"] };
}

export function addonSrmPropertiesDeserializer(item: any): AddonSrmProperties {
  return {
    addonType: item["addonType"],
    provisioningState: item["provisioningState"],
    licenseKey: item["licenseKey"],
  };
}

/** The properties of a vSphere Replication (VR) addon */
export interface AddonVrProperties extends AddonProperties {
  /** The vSphere Replication Server (VRS) count */
  vrsCount: number;
  /** The type of private cloud addon */
  addonType: "VR";
}

export function addonVrPropertiesSerializer(item: AddonVrProperties): any {
  return { addonType: item["addonType"], vrsCount: item["vrsCount"] };
}

export function addonVrPropertiesDeserializer(item: any): AddonVrProperties {
  return {
    addonType: item["addonType"],
    provisioningState: item["provisioningState"],
    vrsCount: item["vrsCount"],
  };
}

/** The properties of an HCX addon */
export interface AddonHcxProperties extends AddonProperties {
  /** The HCX offer, example VMware MaaS Cloud Provider (Enterprise) */
  offer: string;
  /** The type of private cloud addon */
  addonType: "HCX";
  /** HCX management network. */
  managementNetwork?: string;
  /** HCX uplink network */
  uplinkNetwork?: string;
}

export function addonHcxPropertiesSerializer(item: AddonHcxProperties): any {
  return {
    addonType: item["addonType"],
    offer: item["offer"],
    managementNetwork: item["managementNetwork"],
    uplinkNetwork: item["uplinkNetwork"],
  };
}

export function addonHcxPropertiesDeserializer(item: any): AddonHcxProperties {
  return {
    addonType: item["addonType"],
    provisioningState: item["provisioningState"],
    offer: item["offer"],
    managementNetwork: item["managementNetwork"],
    uplinkNetwork: item["uplinkNetwork"],
  };
}

/** The properties of an Arc addon */
export interface AddonArcProperties extends AddonProperties {
  /** The VMware vCenter resource ID */
  vCenter?: string;
  /** The type of private cloud addon */
  addonType: "Arc";
}

export function addonArcPropertiesSerializer(item: AddonArcProperties): any {
  return { addonType: item["addonType"], vCenter: item["vCenter"] };
}

export function addonArcPropertiesDeserializer(item: any): AddonArcProperties {
  return {
    addonType: item["addonType"],
    provisioningState: item["provisioningState"],
    vCenter: item["vCenter"],
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

/** The response of a ExpressRouteAuthorization list operation. */
export interface _ExpressRouteAuthorizationList {
  /** The ExpressRouteAuthorization items on this page */
  value: ExpressRouteAuthorization[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteAuthorizationListDeserializer(
  item: any,
): _ExpressRouteAuthorizationList {
  return {
    value: expressRouteAuthorizationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function expressRouteAuthorizationArraySerializer(
  result: Array<ExpressRouteAuthorization>,
): any[] {
  return result.map((item) => {
    return expressRouteAuthorizationSerializer(item);
  });
}

export function expressRouteAuthorizationArrayDeserializer(
  result: Array<ExpressRouteAuthorization>,
): any[] {
  return result.map((item) => {
    return expressRouteAuthorizationDeserializer(item);
  });
}

/** ExpressRoute Circuit Authorization */
export interface ExpressRouteAuthorization extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ExpressRouteAuthorizationProperties;
}

export function expressRouteAuthorizationSerializer(item: ExpressRouteAuthorization): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : expressRouteAuthorizationPropertiesSerializer(item["properties"]),
  };
}

export function expressRouteAuthorizationDeserializer(item: any): ExpressRouteAuthorization {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : expressRouteAuthorizationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an ExpressRoute Circuit Authorization resource */
export interface ExpressRouteAuthorizationProperties {
  /** The state of the ExpressRoute Circuit Authorization provisioning */
  readonly provisioningState?: ExpressRouteAuthorizationProvisioningState;
  /** The ID of the ExpressRoute Circuit Authorization */
  readonly expressRouteAuthorizationId?: string;
  /** The key of the ExpressRoute Circuit Authorization */
  readonly expressRouteAuthorizationKey?: string;
  /** The ID of the ExpressRoute Circuit */
  expressRouteId?: string;
}

export function expressRouteAuthorizationPropertiesSerializer(
  item: ExpressRouteAuthorizationProperties,
): any {
  return { expressRouteId: item["expressRouteId"] };
}

export function expressRouteAuthorizationPropertiesDeserializer(
  item: any,
): ExpressRouteAuthorizationProperties {
  return {
    provisioningState: item["provisioningState"],
    expressRouteAuthorizationId: item["expressRouteAuthorizationId"],
    expressRouteAuthorizationKey: item["expressRouteAuthorizationKey"],
    expressRouteId: item["expressRouteId"],
  };
}

/** Express Route Circuit Authorization provisioning state */
export enum KnownExpressRouteAuthorizationProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is updating */
  Updating = "Updating",
}

/**
 * Express Route Circuit Authorization provisioning state \
 * {@link KnownExpressRouteAuthorizationProvisioningState} can be used interchangeably with ExpressRouteAuthorizationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Updating**: is updating
 */
export type ExpressRouteAuthorizationProvisioningState = string;

/** The response of a CloudLink list operation. */
export interface _CloudLinkList {
  /** The CloudLink items on this page */
  value: CloudLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudLinkListDeserializer(item: any): _CloudLinkList {
  return {
    value: cloudLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudLinkArraySerializer(result: Array<CloudLink>): any[] {
  return result.map((item) => {
    return cloudLinkSerializer(item);
  });
}

export function cloudLinkArrayDeserializer(result: Array<CloudLink>): any[] {
  return result.map((item) => {
    return cloudLinkDeserializer(item);
  });
}

/** A cloud link resource */
export interface CloudLink extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudLinkProperties;
}

export function cloudLinkSerializer(item: CloudLink): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : cloudLinkPropertiesSerializer(item["properties"]),
  };
}

export function cloudLinkDeserializer(item: any): CloudLink {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cloudLinkPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a cloud link. */
export interface CloudLinkProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: CloudLinkProvisioningState;
  /** The state of the cloud link. */
  readonly status?: CloudLinkStatus;
  /** Identifier of the other private cloud participating in the link. */
  linkedCloud?: string;
}

export function cloudLinkPropertiesSerializer(item: CloudLinkProperties): any {
  return { linkedCloud: item["linkedCloud"] };
}

export function cloudLinkPropertiesDeserializer(item: any): CloudLinkProperties {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    linkedCloud: item["linkedCloud"],
  };
}

/** cloud link provisioning state */
export enum KnownCloudLinkProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * cloud link provisioning state \
 * {@link KnownCloudLinkProvisioningState} can be used interchangeably with CloudLinkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type CloudLinkProvisioningState = string;

/** Cloud Link status */
export enum KnownCloudLinkStatus {
  /** is active */
  Active = "Active",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is failed */
  Failed = "Failed",
  /** is disconnected */
  Disconnected = "Disconnected",
}

/**
 * Cloud Link status \
 * {@link KnownCloudLinkStatus} can be used interchangeably with CloudLinkStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: is active \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Failed**: is failed \
 * **Disconnected**: is disconnected
 */
export type CloudLinkStatus = string;

/** The response of a Cluster list operation. */
export interface _ClusterList {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListDeserializer(item: any): _ClusterList {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** A cluster resource */
export interface Cluster extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ClusterProperties;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku: Sku;
}

export function clusterSerializer(item: Cluster): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
  };
}

export function clusterDeserializer(item: any): Cluster {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
  };
}

/** The properties of a cluster */
export interface ClusterProperties {
  /** The cluster size */
  clusterSize?: number;
  /** The state of the cluster provisioning */
  readonly provisioningState?: ClusterProvisioningState;
  /** The identity */
  readonly clusterId?: number;
  /** The hosts */
  hosts?: string[];
  /** Name of the vsan datastore associated with the cluster */
  vsanDatastoreName?: string;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    clusterSize: item["clusterSize"],
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
    vsanDatastoreName: item["vsanDatastoreName"],
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    clusterSize: item["clusterSize"],
    provisioningState: item["provisioningState"],
    clusterId: item["clusterId"],
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
    vsanDatastoreName: item["vsanDatastoreName"],
  };
}

/** Cluster provisioning state */
export enum KnownClusterProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is cancelled */
  Cancelled = "Cancelled",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Cluster provisioning state \
 * {@link KnownClusterProvisioningState} can be used interchangeably with ClusterProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Cancelled**: is cancelled \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type ClusterProvisioningState = string;

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export type SkuTier = "Free" | "Basic" | "Standard" | "Premium";

/** An update of a cluster resource */
export interface ClusterUpdate {
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
  /** The properties of a cluster resource that may be updated */
  properties?: ClusterUpdateProperties;
}

export function clusterUpdateSerializer(item: ClusterUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : clusterUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The properties of a cluster that may be updated */
export interface ClusterUpdateProperties {
  /** The cluster size */
  clusterSize?: number;
  /** The hosts */
  hosts?: string[];
}

export function clusterUpdatePropertiesSerializer(item: ClusterUpdateProperties): any {
  return {
    clusterSize: item["clusterSize"],
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
  };
}

/** List of all zones and associated hosts for a cluster */
export interface ClusterZoneList {
  /** Zone and associated hosts info */
  zones?: ClusterZone[];
}

export function clusterZoneListDeserializer(item: any): ClusterZoneList {
  return {
    zones: !item["zones"] ? item["zones"] : clusterZoneArrayDeserializer(item["zones"]),
  };
}

export function clusterZoneArrayDeserializer(result: Array<ClusterZone>): any[] {
  return result.map((item) => {
    return clusterZoneDeserializer(item);
  });
}

/** Zone and associated hosts info */
export interface ClusterZone {
  /** List of hosts belonging to the availability zone in a cluster */
  readonly hosts?: string[];
  /** Availability zone identifier */
  readonly zone?: string;
}

export function clusterZoneDeserializer(item: any): ClusterZone {
  return {
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
    zone: item["zone"],
  };
}

/** The response of a Datastore list operation. */
export interface _DatastoreList {
  /** The Datastore items on this page */
  value: Datastore[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datastoreListDeserializer(item: any): _DatastoreList {
  return {
    value: datastoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datastoreArraySerializer(result: Array<Datastore>): any[] {
  return result.map((item) => {
    return datastoreSerializer(item);
  });
}

export function datastoreArrayDeserializer(result: Array<Datastore>): any[] {
  return result.map((item) => {
    return datastoreDeserializer(item);
  });
}

/** A datastore resource */
export interface Datastore extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DatastoreProperties;
}

export function datastoreSerializer(item: Datastore): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : datastorePropertiesSerializer(item["properties"]),
  };
}

export function datastoreDeserializer(item: any): Datastore {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : datastorePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a datastore */
export interface DatastoreProperties {
  /** The state of the datastore provisioning */
  readonly provisioningState?: DatastoreProvisioningState;
  /** An Azure NetApp Files volume */
  netAppVolume?: NetAppVolume;
  /** An iSCSI volume */
  diskPoolVolume?: DiskPoolVolume;
  /** An Elastic SAN volume */
  elasticSanVolume?: ElasticSanVolume;
  /** A Pure Storage volume */
  pureStorageVolume?: PureStorageVolume;
  /** The operational status of the datastore */
  readonly status?: DatastoreStatus;
}

export function datastorePropertiesSerializer(item: DatastoreProperties): any {
  return {
    netAppVolume: !item["netAppVolume"]
      ? item["netAppVolume"]
      : netAppVolumeSerializer(item["netAppVolume"]),
    diskPoolVolume: !item["diskPoolVolume"]
      ? item["diskPoolVolume"]
      : diskPoolVolumeSerializer(item["diskPoolVolume"]),
    elasticSanVolume: !item["elasticSanVolume"]
      ? item["elasticSanVolume"]
      : elasticSanVolumeSerializer(item["elasticSanVolume"]),
    pureStorageVolume: !item["pureStorageVolume"]
      ? item["pureStorageVolume"]
      : pureStorageVolumeSerializer(item["pureStorageVolume"]),
  };
}

export function datastorePropertiesDeserializer(item: any): DatastoreProperties {
  return {
    provisioningState: item["provisioningState"],
    netAppVolume: !item["netAppVolume"]
      ? item["netAppVolume"]
      : netAppVolumeDeserializer(item["netAppVolume"]),
    diskPoolVolume: !item["diskPoolVolume"]
      ? item["diskPoolVolume"]
      : diskPoolVolumeDeserializer(item["diskPoolVolume"]),
    elasticSanVolume: !item["elasticSanVolume"]
      ? item["elasticSanVolume"]
      : elasticSanVolumeDeserializer(item["elasticSanVolume"]),
    pureStorageVolume: !item["pureStorageVolume"]
      ? item["pureStorageVolume"]
      : pureStorageVolumeDeserializer(item["pureStorageVolume"]),
    status: item["status"],
  };
}

/** datastore provisioning state */
export enum KnownDatastoreProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is cancelled */
  Cancelled = "Cancelled",
  /** is pending */
  Pending = "Pending",
  /** is creating */
  Creating = "Creating",
  /** is updating */
  Updating = "Updating",
  /** is deleting */
  Deleting = "Deleting",
}

/**
 * datastore provisioning state \
 * {@link KnownDatastoreProvisioningState} can be used interchangeably with DatastoreProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Cancelled**: is cancelled \
 * **Pending**: is pending \
 * **Creating**: is creating \
 * **Updating**: is updating \
 * **Deleting**: is deleting
 */
export type DatastoreProvisioningState = string;

/** An Azure NetApp Files volume from Microsoft.NetApp provider */
export interface NetAppVolume {
  /** Azure resource ID of the NetApp volume */
  id: string;
}

export function netAppVolumeSerializer(item: NetAppVolume): any {
  return { id: item["id"] };
}

export function netAppVolumeDeserializer(item: any): NetAppVolume {
  return {
    id: item["id"],
  };
}

/** An iSCSI volume from Microsoft.StoragePool provider */
export interface DiskPoolVolume {
  /** Azure resource ID of the iSCSI target */
  targetId: string;
  /** Name of the LUN to be used for datastore */
  lunName: string;
  /**
   * Mode that describes whether the LUN has to be mounted as a datastore or
   * attached as a LUN
   */
  mountOption?: MountOptionEnum;
  /** Device path */
  readonly path?: string;
}

export function diskPoolVolumeSerializer(item: DiskPoolVolume): any {
  return { targetId: item["targetId"], lunName: item["lunName"], mountOption: item["mountOption"] };
}

export function diskPoolVolumeDeserializer(item: any): DiskPoolVolume {
  return {
    targetId: item["targetId"],
    lunName: item["lunName"],
    mountOption: item["mountOption"],
    path: item["path"],
  };
}

/** mount option */
export enum KnownMountOptionEnum {
  /** is mount */
  Mount = "MOUNT",
  /** is attach */
  Attach = "ATTACH",
}

/**
 * mount option \
 * {@link KnownMountOptionEnum} can be used interchangeably with MountOptionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MOUNT**: is mount \
 * **ATTACH**: is attach
 */
export type MountOptionEnum = string;

/** An Elastic SAN volume from Microsoft.ElasticSan provider */
export interface ElasticSanVolume {
  /** Azure resource ID of the Elastic SAN Volume */
  targetId: string;
}

export function elasticSanVolumeSerializer(item: ElasticSanVolume): any {
  return { targetId: item["targetId"] };
}

export function elasticSanVolumeDeserializer(item: any): ElasticSanVolume {
  return {
    targetId: item["targetId"],
  };
}

/** A Pure Storage volume from PureStorage.Block provider */
export interface PureStorageVolume {
  /** Azure resource ID of the Pure Storage Pool */
  storagePoolId: string;
  /** Volume size to be used to create a Virtual Volumes (vVols) datastore */
  sizeGb: number;
}

export function pureStorageVolumeSerializer(item: PureStorageVolume): any {
  return { storagePoolId: item["storagePoolId"], sizeGb: item["sizeGb"] };
}

export function pureStorageVolumeDeserializer(item: any): PureStorageVolume {
  return {
    storagePoolId: item["storagePoolId"],
    sizeGb: item["sizeGb"],
  };
}

/** datastore status */
export enum KnownDatastoreStatus {
  /** is unknown */
  Unknown = "Unknown",
  /** is accessible */
  Accessible = "Accessible",
  /** is inaccessible */
  Inaccessible = "Inaccessible",
  /** is attached */
  Attached = "Attached",
  /** is detached */
  Detached = "Detached",
  /** is lost communication */
  LostCommunication = "LostCommunication",
  /** is dead or error */
  DeadOrError = "DeadOrError",
}

/**
 * datastore status \
 * {@link KnownDatastoreStatus} can be used interchangeably with DatastoreStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: is unknown \
 * **Accessible**: is accessible \
 * **Inaccessible**: is inaccessible \
 * **Attached**: is attached \
 * **Detached**: is detached \
 * **LostCommunication**: is lost communication \
 * **DeadOrError**: is dead or error
 */
export type DatastoreStatus = string;

/** The response of a GlobalReachConnection list operation. */
export interface _GlobalReachConnectionList {
  /** The GlobalReachConnection items on this page */
  value: GlobalReachConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _globalReachConnectionListDeserializer(item: any): _GlobalReachConnectionList {
  return {
    value: globalReachConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function globalReachConnectionArraySerializer(result: Array<GlobalReachConnection>): any[] {
  return result.map((item) => {
    return globalReachConnectionSerializer(item);
  });
}

export function globalReachConnectionArrayDeserializer(
  result: Array<GlobalReachConnection>,
): any[] {
  return result.map((item) => {
    return globalReachConnectionDeserializer(item);
  });
}

/** A global reach connection resource */
export interface GlobalReachConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GlobalReachConnectionProperties;
}

export function globalReachConnectionSerializer(item: GlobalReachConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : globalReachConnectionPropertiesSerializer(item["properties"]),
  };
}

export function globalReachConnectionDeserializer(item: any): GlobalReachConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : globalReachConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a global reach connection */
export interface GlobalReachConnectionProperties {
  /** The state of the  ExpressRoute Circuit Authorization provisioning */
  readonly provisioningState?: GlobalReachConnectionProvisioningState;
  /**
   * The network used for global reach carved out from the original network block
   * provided for the private cloud
   */
  readonly addressPrefix?: string;
  /**
   * Authorization key from the peer express route used for the global reach
   * connection
   */
  authorizationKey?: string;
  /** The connection status of the global reach connection */
  readonly circuitConnectionStatus?: GlobalReachConnectionStatus;
  /**
   * Identifier of the ExpressRoute Circuit to peer with in the global reach
   * connection
   */
  peerExpressRouteCircuit?: string;
  /**
   * The ID of the Private Cloud's ExpressRoute Circuit that is participating in the
   * global reach connection
   */
  expressRouteId?: string;
}

export function globalReachConnectionPropertiesSerializer(
  item: GlobalReachConnectionProperties,
): any {
  return {
    authorizationKey: item["authorizationKey"],
    peerExpressRouteCircuit: item["peerExpressRouteCircuit"],
    expressRouteId: item["expressRouteId"],
  };
}

export function globalReachConnectionPropertiesDeserializer(
  item: any,
): GlobalReachConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    addressPrefix: item["addressPrefix"],
    authorizationKey: item["authorizationKey"],
    circuitConnectionStatus: item["circuitConnectionStatus"],
    peerExpressRouteCircuit: item["peerExpressRouteCircuit"],
    expressRouteId: item["expressRouteId"],
  };
}

/** Global Reach Connection provisioning state */
export enum KnownGlobalReachConnectionProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is updating */
  Updating = "Updating",
}

/**
 * Global Reach Connection provisioning state \
 * {@link KnownGlobalReachConnectionProvisioningState} can be used interchangeably with GlobalReachConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Updating**: is updating
 */
export type GlobalReachConnectionProvisioningState = string;

/** Global Reach Connection status */
export enum KnownGlobalReachConnectionStatus {
  /** is connected */
  Connected = "Connected",
  /** is connecting */
  Connecting = "Connecting",
  /** is disconnected */
  Disconnected = "Disconnected",
}

/**
 * Global Reach Connection status \
 * {@link KnownGlobalReachConnectionStatus} can be used interchangeably with GlobalReachConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: is connected \
 * **Connecting**: is connecting \
 * **Disconnected**: is disconnected
 */
export type GlobalReachConnectionStatus = string;

/** The response of a HcxEnterpriseSite list operation. */
export interface _HcxEnterpriseSiteList {
  /** The HcxEnterpriseSite items on this page */
  value: HcxEnterpriseSite[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hcxEnterpriseSiteListDeserializer(item: any): _HcxEnterpriseSiteList {
  return {
    value: hcxEnterpriseSiteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hcxEnterpriseSiteArraySerializer(result: Array<HcxEnterpriseSite>): any[] {
  return result.map((item) => {
    return hcxEnterpriseSiteSerializer(item);
  });
}

export function hcxEnterpriseSiteArrayDeserializer(result: Array<HcxEnterpriseSite>): any[] {
  return result.map((item) => {
    return hcxEnterpriseSiteDeserializer(item);
  });
}

/** An HCX Enterprise Site resource */
export interface HcxEnterpriseSite extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HcxEnterpriseSiteProperties;
}

export function hcxEnterpriseSiteSerializer(item: HcxEnterpriseSite): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : hcxEnterpriseSitePropertiesSerializer(item["properties"]),
  };
}

export function hcxEnterpriseSiteDeserializer(item: any): HcxEnterpriseSite {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hcxEnterpriseSitePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an HCX Enterprise Site */
export interface HcxEnterpriseSiteProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: HcxEnterpriseSiteProvisioningState;
  /** The activation key */
  readonly activationKey?: string;
  /** The status of the HCX Enterprise Site */
  readonly status?: HcxEnterpriseSiteStatus;
}

export function hcxEnterpriseSitePropertiesSerializer(item: HcxEnterpriseSiteProperties): any {
  return item;
}

export function hcxEnterpriseSitePropertiesDeserializer(item: any): HcxEnterpriseSiteProperties {
  return {
    provisioningState: item["provisioningState"],
    activationKey: item["activationKey"],
    status: item["status"],
  };
}

/** HCX Enterprise Site provisioning state */
export enum KnownHcxEnterpriseSiteProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * HCX Enterprise Site provisioning state \
 * {@link KnownHcxEnterpriseSiteProvisioningState} can be used interchangeably with HcxEnterpriseSiteProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type HcxEnterpriseSiteProvisioningState = string;

/** HCX Enterprise Site status */
export enum KnownHcxEnterpriseSiteStatus {
  /** is available */
  Available = "Available",
  /** is consumed */
  Consumed = "Consumed",
  /** is deactivated */
  Deactivated = "Deactivated",
  /** is deleted */
  Deleted = "Deleted",
}

/**
 * HCX Enterprise Site status \
 * {@link KnownHcxEnterpriseSiteStatus} can be used interchangeably with HcxEnterpriseSiteStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: is available \
 * **Consumed**: is consumed \
 * **Deactivated**: is deactivated \
 * **Deleted**: is deleted
 */
export type HcxEnterpriseSiteStatus = string;

/** The response of a Host list operation. */
export interface _HostListResult {
  /** The Host items on this page */
  value: Host[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hostListResultDeserializer(item: any): _HostListResult {
  return {
    value: hostArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hostArrayDeserializer(result: Array<Host>): any[] {
  return result.map((item) => {
    return hostDeserializer(item);
  });
}

/** A host resource */
export interface Host extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HostPropertiesUnion;
  /** The availability zones. */
  zones?: string[];
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
}

export function hostDeserializer(item: any): Host {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hostPropertiesUnionDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The properties of a host. */
export interface HostProperties {
  /** The kind of host */
  /** The discriminator possible values: General, Specialized */
  kind: HostKind;
  /** The state of the host provisioning. */
  readonly provisioningState?: HostProvisioningState;
  /** Display name of the host in VMware vCenter. */
  displayName?: string;
  /** vCenter managed object reference ID of the host. */
  readonly moRefId?: string;
  /** Fully qualified domain name of the host. */
  readonly fqdn?: string;
  /** If provided, the host is in maintenance. The value is the reason for maintenance. */
  maintenance?: HostMaintenance;
  readonly faultDomain?: string;
}

export function hostPropertiesDeserializer(item: any): HostProperties {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    moRefId: item["moRefId"],
    fqdn: item["fqdn"],
    maintenance: item["maintenance"],
    faultDomain: item["faultDomain"],
  };
}

/** Alias for HostPropertiesUnion */
export type HostPropertiesUnion =
  | GeneralHostProperties
  | SpecializedHostProperties
  | HostProperties;

export function hostPropertiesUnionDeserializer(item: any): HostPropertiesUnion {
  switch (item.kind) {
    case "General":
      return generalHostPropertiesDeserializer(item as GeneralHostProperties);

    case "Specialized":
      return specializedHostPropertiesDeserializer(item as SpecializedHostProperties);

    default:
      return hostPropertiesDeserializer(item);
  }
}

/** The kind of host. */
export enum KnownHostKind {
  /** General */
  General = "General",
  /** Specialized */
  Specialized = "Specialized",
}

/**
 * The kind of host. \
 * {@link KnownHostKind} can be used interchangeably with HostKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **General** \
 * **Specialized**
 */
export type HostKind = string;

/** provisioning state of the host */
export enum KnownHostProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * provisioning state of the host \
 * {@link KnownHostProvisioningState} can be used interchangeably with HostProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type HostProvisioningState = string;

/** The reason for host maintenance. */
export enum KnownHostMaintenance {
  /** The host is a replacement host. */
  Replacement = "Replacement",
  /** The host is for an upgrade, such as an upgrade to ESXi, NSX-T, or other component. */
  Upgrade = "Upgrade",
}

/**
 * The reason for host maintenance. \
 * {@link KnownHostMaintenance} can be used interchangeably with HostMaintenance,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Replacement**: The host is a replacement host. \
 * **Upgrade**: The host is for an upgrade, such as an upgrade to ESXi, NSX-T, or other component.
 */
export type HostMaintenance = string;

/** The properties of a general host. */
export interface GeneralHostProperties extends HostProperties {
  /** The kind of host. */
  kind: "General";
}

export function generalHostPropertiesDeserializer(item: any): GeneralHostProperties {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    moRefId: item["moRefId"],
    fqdn: item["fqdn"],
    maintenance: item["maintenance"],
    faultDomain: item["faultDomain"],
  };
}

/** The properties of a specialized host. */
export interface SpecializedHostProperties extends HostProperties {
  /** The kind of host is specialized. */
  kind: "Specialized";
}

export function specializedHostPropertiesDeserializer(item: any): SpecializedHostProperties {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    moRefId: item["moRefId"],
    fqdn: item["fqdn"],
    maintenance: item["maintenance"],
    faultDomain: item["faultDomain"],
  };
}

/** The response of a IscsiPath list operation. */
export interface _IscsiPathListResult {
  /** The IscsiPath items on this page */
  value: IscsiPath[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iscsiPathListResultDeserializer(item: any): _IscsiPathListResult {
  return {
    value: iscsiPathArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iscsiPathArraySerializer(result: Array<IscsiPath>): any[] {
  return result.map((item) => {
    return iscsiPathSerializer(item);
  });
}

export function iscsiPathArrayDeserializer(result: Array<IscsiPath>): any[] {
  return result.map((item) => {
    return iscsiPathDeserializer(item);
  });
}

/** An iSCSI path resource */
export interface IscsiPath extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: IscsiPathProperties;
}

export function iscsiPathSerializer(item: IscsiPath): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : iscsiPathPropertiesSerializer(item["properties"]),
  };
}

export function iscsiPathDeserializer(item: any): IscsiPath {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : iscsiPathPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an iSCSI path resource */
export interface IscsiPathProperties {
  /** The state of the iSCSI path provisioning */
  readonly provisioningState?: IscsiPathProvisioningState;
  /** CIDR Block for iSCSI path. */
  networkBlock: string;
}

export function iscsiPathPropertiesSerializer(item: IscsiPathProperties): any {
  return { networkBlock: item["networkBlock"] };
}

export function iscsiPathPropertiesDeserializer(item: any): IscsiPathProperties {
  return {
    provisioningState: item["provisioningState"],
    networkBlock: item["networkBlock"],
  };
}

/** private cloud provisioning state */
export enum KnownIscsiPathProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is pending */
  Pending = "Pending",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * private cloud provisioning state \
 * {@link KnownIscsiPathProvisioningState} can be used interchangeably with IscsiPathProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Pending**: is pending \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type IscsiPathProvisioningState = string;

/** The response of a License list operation. */
export interface _LicenseListResult {
  /** The License items on this page */
  value: License[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _licenseListResultDeserializer(item: any): _LicenseListResult {
  return {
    value: licenseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function licenseArraySerializer(result: Array<License>): any[] {
  return result.map((item) => {
    return licenseSerializer(item);
  });
}

export function licenseArrayDeserializer(result: Array<License>): any[] {
  return result.map((item) => {
    return licenseDeserializer(item);
  });
}

/** A license resource */
export interface License extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LicensePropertiesUnion;
}

export function licenseSerializer(item: License): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : licensePropertiesUnionSerializer(item["properties"]),
  };
}

export function licenseDeserializer(item: any): License {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : licensePropertiesUnionDeserializer(item["properties"]),
  };
}

/** The properties of a license */
export interface LicenseProperties {
  /** License kind */
  /** The discriminator possible values: VmwareFirewall */
  kind: LicenseKind;
  /** The state of the license provisioning */
  readonly provisioningState?: LicenseProvisioningState;
}

export function licensePropertiesSerializer(item: LicenseProperties): any {
  return { kind: item["kind"] };
}

export function licensePropertiesDeserializer(item: any): LicenseProperties {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for LicensePropertiesUnion */
export type LicensePropertiesUnion = VmwareFirewallLicenseProperties | LicenseProperties;

export function licensePropertiesUnionSerializer(item: LicensePropertiesUnion): any {
  switch (item.kind) {
    case "VmwareFirewall":
      return vmwareFirewallLicensePropertiesSerializer(item as VmwareFirewallLicenseProperties);

    default:
      return licensePropertiesSerializer(item);
  }
}

export function licensePropertiesUnionDeserializer(item: any): LicensePropertiesUnion {
  switch (item.kind) {
    case "VmwareFirewall":
      return vmwareFirewallLicensePropertiesDeserializer(item as VmwareFirewallLicenseProperties);

    default:
      return licensePropertiesDeserializer(item);
  }
}

/** The kind of license. */
export enum KnownLicenseKind {
  /** VmwareFirewall */
  VmwareFirewall = "VmwareFirewall",
}

/**
 * The kind of license. \
 * {@link KnownLicenseKind} can be used interchangeably with LicenseKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VmwareFirewall**
 */
export type LicenseKind = string;

/** provisioning state of the license */
export enum KnownLicenseProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * provisioning state of the license \
 * {@link KnownLicenseProvisioningState} can be used interchangeably with LicenseProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type LicenseProvisioningState = string;

/** The properties of a VMware Firewall license */
export interface VmwareFirewallLicenseProperties extends LicenseProperties {
  /** License kind */
  kind: "VmwareFirewall";
  /** License key */
  licenseKey?: string;
  /** Number of cores included in the license, measured per hour */
  cores: number;
  /** UTC datetime when the license expires */
  endDate: Date;
  /** The Broadcom site ID associated with the license. */
  broadcomSiteId?: string;
  /** The Broadcom contract number associated with the license. */
  broadcomContractNumber?: string;
  /** Additional labels passed through for license reporting. */
  labels?: Label[];
}

export function vmwareFirewallLicensePropertiesSerializer(
  item: VmwareFirewallLicenseProperties,
): any {
  return {
    kind: item["kind"],
    licenseKey: item["licenseKey"],
    cores: item["cores"],
    endDate: item["endDate"].toISOString(),
    broadcomSiteId: item["broadcomSiteId"],
    broadcomContractNumber: item["broadcomContractNumber"],
    labels: !item["labels"] ? item["labels"] : labelArraySerializer(item["labels"]),
  };
}

export function vmwareFirewallLicensePropertiesDeserializer(
  item: any,
): VmwareFirewallLicenseProperties {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
    licenseKey: item["licenseKey"],
    cores: item["cores"],
    endDate: new Date(item["endDate"]),
    broadcomSiteId: item["broadcomSiteId"],
    broadcomContractNumber: item["broadcomContractNumber"],
    labels: !item["labels"] ? item["labels"] : labelArrayDeserializer(item["labels"]),
  };
}

export function labelArraySerializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelSerializer(item);
  });
}

export function labelArrayDeserializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelDeserializer(item);
  });
}

/** A key-value pair representing a label. */
export interface Label {
  /** The key of the label. */
  key: string;
  /** The value of the label. */
  value: string;
}

export function labelSerializer(item: Label): any {
  return { key: item["key"], value: item["value"] };
}

export function labelDeserializer(item: any): Label {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The name of the license. */
export enum KnownLicenseName {
  /** VMware Firewall license */
  VmwareFirewall = "VmwareFirewall",
}

/**
 * The name of the license. \
 * {@link KnownLicenseName} can be used interchangeably with LicenseName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VmwareFirewall**: VMware Firewall license
 */
export type LicenseName = string;

/** Subscription trial availability */
export interface Trial {
  /** Trial status */
  readonly status?: TrialStatus;
  /** Number of trial hosts available */
  readonly availableHosts?: number;
}

export function trialDeserializer(item: any): Trial {
  return {
    status: item["status"],
    availableHosts: item["availableHosts"],
  };
}

/** trial status */
export enum KnownTrialStatus {
  /** is available */
  TrialAvailable = "TrialAvailable",
  /** is used */
  TrialUsed = "TrialUsed",
  /** is disabled */
  TrialDisabled = "TrialDisabled",
}

/**
 * trial status \
 * {@link KnownTrialStatus} can be used interchangeably with TrialStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrialAvailable**: is available \
 * **TrialUsed**: is used \
 * **TrialDisabled**: is disabled
 */
export type TrialStatus = string;

/** Subscription quotas */
export interface Quota {
  /** Remaining hosts quota by sku type */
  readonly hostsRemaining?: Record<string, number>;
  /** Host quota is active for current subscription */
  readonly quotaEnabled?: QuotaEnabled;
}

export function quotaDeserializer(item: any): Quota {
  return {
    hostsRemaining: !item["hostsRemaining"]
      ? item["hostsRemaining"]
      : Object.fromEntries(
          Object.entries(item["hostsRemaining"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    quotaEnabled: item["quotaEnabled"],
  };
}

/** quota enabled */
export enum KnownQuotaEnabled {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * quota enabled \
 * {@link KnownQuotaEnabled} can be used interchangeably with QuotaEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type QuotaEnabled = string;

/** The response of a Maintenance list operation. */
export interface _MaintenanceListResult {
  /** The Maintenance items on this page */
  value: Maintenance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maintenanceListResultDeserializer(item: any): _MaintenanceListResult {
  return {
    value: maintenanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceArrayDeserializer(result: Array<Maintenance>): any[] {
  return result.map((item) => {
    return maintenanceDeserializer(item);
  });
}

/** A cluster resource */
export interface Maintenance extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MaintenanceProperties;
}

export function maintenanceDeserializer(item: any): Maintenance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : maintenancePropertiesDeserializer(item["properties"]),
  };
}

/** properties of a maintenance */
export interface MaintenanceProperties {
  /** type of maintenance */
  readonly component?: MaintenanceType;
  /** Display name for maintenance */
  readonly displayName?: string;
  /** Cluster ID for on which maintenance will be applied. Empty if maintenance is at private cloud level */
  readonly clusterId?: number;
  /** Link to maintenance info */
  readonly infoLink?: string;
  /** Impact on the resource during maintenance period */
  readonly impact?: string;
  /** If maintenance is scheduled by Microsoft */
  readonly scheduledByMicrosoft?: boolean;
  /** The state of the maintenance */
  readonly state?: MaintenanceState;
  /** Scheduled maintenance start time */
  readonly scheduledStartTime?: Date;
  /** Estimated time maintenance will take in minutes */
  readonly estimatedDurationInMinutes?: number;
  /** The provisioning state */
  readonly provisioningState?: MaintenanceProvisioningState;
  /** Operations on  maintenance */
  readonly operations?: MaintenanceManagementOperationUnion[];
  /** Indicates whether the maintenance is ready to proceed */
  readonly maintenanceReadiness?: MaintenanceReadiness;
}

export function maintenancePropertiesDeserializer(item: any): MaintenanceProperties {
  return {
    component: item["component"],
    displayName: item["displayName"],
    clusterId: item["clusterId"],
    infoLink: item["infoLink"],
    impact: item["impact"],
    scheduledByMicrosoft: item["scheduledByMicrosoft"],
    state: !item["state"] ? item["state"] : maintenanceStateDeserializer(item["state"]),
    scheduledStartTime: !item["scheduledStartTime"]
      ? item["scheduledStartTime"]
      : new Date(item["scheduledStartTime"]),
    estimatedDurationInMinutes: item["estimatedDurationInMinutes"],
    provisioningState: item["provisioningState"],
    operations: !item["operations"]
      ? item["operations"]
      : maintenanceManagementOperationUnionArrayDeserializer(item["operations"]),
    maintenanceReadiness: !item["maintenanceReadiness"]
      ? item["maintenanceReadiness"]
      : maintenanceReadinessDeserializer(item["maintenanceReadiness"]),
  };
}

/** type of the maintenance */
export enum KnownMaintenanceType {
  /** maintenance for vCenter Server Appliance */
  Vcsa = "VCSA",
  /** maintenance for ESXi */
  Esxi = "ESXI",
  /** maintenance for NSX-T */
  Nsxt = "NSXT",
}

/**
 * type of the maintenance \
 * {@link KnownMaintenanceType} can be used interchangeably with MaintenanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VCSA**: maintenance for vCenter Server Appliance \
 * **ESXI**: maintenance for ESXi \
 * **NSXT**: maintenance for NSX-T
 */
export type MaintenanceType = string;

/** state of the maintenance */
export interface MaintenanceState {
  /** Customer presentable maintenance state */
  name?: MaintenanceStateName;
  /** Failure/Success info */
  message?: string;
  /** Time when current state started */
  startedAt?: Date;
  /** Time when current state ended */
  endedAt?: Date;
}

export function maintenanceStateDeserializer(item: any): MaintenanceState {
  return {
    name: item["name"],
    message: item["message"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    endedAt: !item["endedAt"] ? item["endedAt"] : new Date(item["endedAt"]),
  };
}

/** Customer presentable maintenance state */
export enum KnownMaintenanceStateName {
  /** Maintenance Not Scheduled */
  NotScheduled = "NotScheduled",
  /** Maintenance Scheduled */
  Scheduled = "Scheduled",
  /** Maintenance In Progress */
  InProgress = "InProgress",
  /** Maintenance Succeeded */
  Success = "Success",
  /** Maintenance Failed */
  Failed = "Failed",
  /** Maintenance Cancelled */
  Canceled = "Canceled",
}

/**
 * Customer presentable maintenance state \
 * {@link KnownMaintenanceStateName} can be used interchangeably with MaintenanceStateName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotScheduled**: Maintenance Not Scheduled \
 * **Scheduled**: Maintenance Scheduled \
 * **InProgress**: Maintenance In Progress \
 * **Success**: Maintenance Succeeded \
 * **Failed**: Maintenance Failed \
 * **Canceled**: Maintenance Cancelled
 */
export type MaintenanceStateName = string;

/** provisioning state of the maintenance */
export enum KnownMaintenanceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is updating */
  Updating = "Updating",
}

/**
 * provisioning state of the maintenance \
 * {@link KnownMaintenanceProvisioningState} can be used interchangeably with MaintenanceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Updating**: is updating
 */
export type MaintenanceProvisioningState = string;

export function maintenanceManagementOperationUnionArrayDeserializer(
  result: Array<MaintenanceManagementOperationUnion>,
): any[] {
  return result.map((item) => {
    return maintenanceManagementOperationUnionDeserializer(item);
  });
}

/** Defines operations that can be performed on maintenance */
export interface MaintenanceManagementOperation {
  /** The kind of operation */
  /** The discriminator possible values: Schedule, Reschedule, MaintenanceReadinessRefresh */
  readonly kind: MaintenanceManagementOperationKind;
}

export function maintenanceManagementOperationDeserializer(
  item: any,
): MaintenanceManagementOperation {
  return {
    kind: item["kind"],
  };
}

/** Alias for MaintenanceManagementOperationUnion */
export type MaintenanceManagementOperationUnion =
  | ScheduleOperation
  | RescheduleOperation
  | MaintenanceReadinessRefreshOperation
  | MaintenanceManagementOperation;

export function maintenanceManagementOperationUnionDeserializer(
  item: any,
): MaintenanceManagementOperationUnion {
  switch (item.kind) {
    case "Schedule":
      return scheduleOperationDeserializer(item as ScheduleOperation);

    case "Reschedule":
      return rescheduleOperationDeserializer(item as RescheduleOperation);

    case "MaintenanceReadinessRefresh":
      return maintenanceReadinessRefreshOperationDeserializer(
        item as MaintenanceReadinessRefreshOperation,
      );

    default:
      return maintenanceManagementOperationDeserializer(item);
  }
}

/** Defines the type of operation */
export enum KnownMaintenanceManagementOperationKind {
  /** Represents a scheduling operation */
  Schedule = "Schedule",
  /** Represents a rescheduling operation */
  Reschedule = "Reschedule",
  /** Represents a maintenance readiness refresh operation */
  MaintenanceReadinessRefresh = "MaintenanceReadinessRefresh",
}

/**
 * Defines the type of operation \
 * {@link KnownMaintenanceManagementOperationKind} can be used interchangeably with MaintenanceManagementOperationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Schedule**: Represents a scheduling operation \
 * **Reschedule**: Represents a rescheduling operation \
 * **MaintenanceReadinessRefresh**: Represents a maintenance readiness refresh operation
 */
export type MaintenanceManagementOperationKind = string;

/** Scheduling window constraint */
export interface ScheduleOperation extends MaintenanceManagementOperation {
  /** The kind of operation */
  kind: "Schedule";
  /** If scheduling is disabled */
  readonly isDisabled?: boolean;
  /** Reason for schedule disabled */
  readonly disabledReason?: string;
  /** Constraints for scheduling maintenance */
  readonly constraints?: ScheduleOperationConstraintUnion[];
}

export function scheduleOperationDeserializer(item: any): ScheduleOperation {
  return {
    kind: item["kind"],
    isDisabled: item["isDisabled"],
    disabledReason: item["disabledReason"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : scheduleOperationConstraintUnionArrayDeserializer(item["constraints"]),
  };
}

export function scheduleOperationConstraintUnionArrayDeserializer(
  result: Array<ScheduleOperationConstraintUnion>,
): any[] {
  return result.map((item) => {
    return scheduleOperationConstraintUnionDeserializer(item);
  });
}

/** Defines constraints for schedule operation on maintenance */
export interface ScheduleOperationConstraint {
  /** The kind of operation */
  /** The discriminator possible values: SchedulingWindow, AvailableWindowForMaintenance, Blocked */
  readonly kind: ScheduleOperationConstraintKind;
}

export function scheduleOperationConstraintDeserializer(item: any): ScheduleOperationConstraint {
  return {
    kind: item["kind"],
  };
}

/** Alias for ScheduleOperationConstraintUnion */
export type ScheduleOperationConstraintUnion =
  | SchedulingWindow
  | AvailableWindowForMaintenanceWhileScheduleOperation
  | BlockedWhileScheduleOperation
  | ScheduleOperationConstraint;

export function scheduleOperationConstraintUnionDeserializer(
  item: any,
): ScheduleOperationConstraintUnion {
  switch (item.kind) {
    case "SchedulingWindow":
      return schedulingWindowDeserializer(item as SchedulingWindow);

    case "AvailableWindowForMaintenance":
      return availableWindowForMaintenanceWhileScheduleOperationDeserializer(
        item as AvailableWindowForMaintenanceWhileScheduleOperation,
      );

    case "Blocked":
      return blockedWhileScheduleOperationDeserializer(item as BlockedWhileScheduleOperation);

    default:
      return scheduleOperationConstraintDeserializer(item);
  }
}

/** Constraints for scheduling of maintenance */
export enum KnownScheduleOperationConstraintKind {
  /** Time window in which Customer has option to schedule maintenance */
  SchedulingWindow = "SchedulingWindow",
  /** Time window in which maintenance can be scheduled */
  AvailableWindowForMaintenanceWhileScheduleOperation = "AvailableWindowForMaintenance",
  /** Blocked time range constraint */
  BlockedWhileScheduleOperation = "Blocked",
}

/**
 * Constraints for scheduling of maintenance \
 * {@link KnownScheduleOperationConstraintKind} can be used interchangeably with ScheduleOperationConstraintKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SchedulingWindow**: Time window in which Customer has option to schedule maintenance \
 * **AvailableWindowForMaintenance**: Time window in which maintenance can be scheduled \
 * **Blocked**: Blocked time range constraint
 */
export type ScheduleOperationConstraintKind = string;

/** Time window in which Customer has option to schedule maintenance */
export interface SchedulingWindow extends ScheduleOperationConstraint {
  /** The kind of constraint */
  kind: "SchedulingWindow";
  /** Start date time */
  readonly startsAt: Date;
  /** End date Time */
  readonly endsAt: Date;
}

export function schedulingWindowDeserializer(item: any): SchedulingWindow {
  return {
    kind: item["kind"],
    startsAt: new Date(item["startsAt"]),
    endsAt: new Date(item["endsAt"]),
  };
}

/** Time window in which Customer can to schedule maintenance */
export interface AvailableWindowForMaintenanceWhileScheduleOperation extends ScheduleOperationConstraint {
  /** The kind of constraint */
  kind: "AvailableWindowForMaintenance";
  /** Start date time */
  readonly startsAt: Date;
  /** End date Time */
  readonly endsAt: Date;
}

export function availableWindowForMaintenanceWhileScheduleOperationDeserializer(
  item: any,
): AvailableWindowForMaintenanceWhileScheduleOperation {
  return {
    kind: item["kind"],
    startsAt: new Date(item["startsAt"]),
    endsAt: new Date(item["endsAt"]),
  };
}

/** Time ranges blocked for scheduling maintenance */
export interface BlockedWhileScheduleOperation extends ScheduleOperationConstraint {
  /** The kind of constraint */
  kind: "Blocked";
  /** Category of blocked date */
  readonly category: BlockedDatesConstraintCategory;
  /** Date ranges blocked for schedule */
  readonly timeRanges?: BlockedDatesConstraintTimeRange[];
}

export function blockedWhileScheduleOperationDeserializer(
  item: any,
): BlockedWhileScheduleOperation {
  return {
    kind: item["kind"],
    category: item["category"],
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : blockedDatesConstraintTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

/** Reason for blocking operation on maintenance */
export enum KnownBlockedDatesConstraintCategory {
  /** Hi-Priority Event */
  HiPriorityEvent = "HiPriorityEvent",
  /** Quota Exhausted */
  QuotaExhausted = "QuotaExhausted",
  /** Holidays */
  Holiday = "Holiday",
}

/**
 * Reason for blocking operation on maintenance \
 * {@link KnownBlockedDatesConstraintCategory} can be used interchangeably with BlockedDatesConstraintCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HiPriorityEvent**: Hi-Priority Event \
 * **QuotaExhausted**: Quota Exhausted \
 * **Holiday**: Holidays
 */
export type BlockedDatesConstraintCategory = string;

export function blockedDatesConstraintTimeRangeArrayDeserializer(
  result: Array<BlockedDatesConstraintTimeRange>,
): any[] {
  return result.map((item) => {
    return blockedDatesConstraintTimeRangeDeserializer(item);
  });
}

/** Blocked Time range Constraints for maintenance */
export interface BlockedDatesConstraintTimeRange {
  /** Start date time */
  readonly startsAt: Date;
  /** End date Time */
  readonly endsAt: Date;
  /** Reason category for blocking maintenance reschedule */
  readonly reason?: string;
}

export function blockedDatesConstraintTimeRangeDeserializer(
  item: any,
): BlockedDatesConstraintTimeRange {
  return {
    startsAt: new Date(item["startsAt"]),
    endsAt: new Date(item["endsAt"]),
    reason: item["reason"],
  };
}

/** Constraints for rescheduling maintenance */
export interface RescheduleOperation extends MaintenanceManagementOperation {
  /** The kind of operation */
  kind: "Reschedule";
  /** If rescheduling is disabled */
  readonly isDisabled?: boolean;
  /** Reason for reschedule disabled */
  readonly disabledReason?: string;
  /** Constraints for rescheduling maintenance */
  readonly constraints?: RescheduleOperationConstraintUnion[];
}

export function rescheduleOperationDeserializer(item: any): RescheduleOperation {
  return {
    kind: item["kind"],
    isDisabled: item["isDisabled"],
    disabledReason: item["disabledReason"],
    constraints: !item["constraints"]
      ? item["constraints"]
      : rescheduleOperationConstraintUnionArrayDeserializer(item["constraints"]),
  };
}

export function rescheduleOperationConstraintUnionArrayDeserializer(
  result: Array<RescheduleOperationConstraintUnion>,
): any[] {
  return result.map((item) => {
    return rescheduleOperationConstraintUnionDeserializer(item);
  });
}

/** Defines constraints for reschedule operation on maintenance */
export interface RescheduleOperationConstraint {
  /** The kind of operation */
  /** The discriminator possible values: AvailableWindowForMaintenance, Blocked */
  readonly kind: RescheduleOperationConstraintKind;
}

export function rescheduleOperationConstraintDeserializer(
  item: any,
): RescheduleOperationConstraint {
  return {
    kind: item["kind"],
  };
}

/** Alias for RescheduleOperationConstraintUnion */
export type RescheduleOperationConstraintUnion =
  | AvailableWindowForMaintenanceWhileRescheduleOperation
  | BlockedWhileRescheduleOperation
  | RescheduleOperationConstraint;

export function rescheduleOperationConstraintUnionDeserializer(
  item: any,
): RescheduleOperationConstraintUnion {
  switch (item.kind) {
    case "AvailableWindowForMaintenance":
      return availableWindowForMaintenanceWhileRescheduleOperationDeserializer(
        item as AvailableWindowForMaintenanceWhileRescheduleOperation,
      );

    case "Blocked":
      return blockedWhileRescheduleOperationDeserializer(item as BlockedWhileRescheduleOperation);

    default:
      return rescheduleOperationConstraintDeserializer(item);
  }
}

/** Constraints for rescheduling of maintenance */
export enum KnownRescheduleOperationConstraintKind {
  /** Time window in which maintenance can be rescheduled */
  AvailableWindowForMaintenanceWhileRescheduleOperation = "AvailableWindowForMaintenance",
  /** Blocked time range constraint */
  BlockedWhileRescheduleOperation = "Blocked",
}

/**
 * Constraints for rescheduling of maintenance \
 * {@link KnownRescheduleOperationConstraintKind} can be used interchangeably with RescheduleOperationConstraintKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AvailableWindowForMaintenance**: Time window in which maintenance can be rescheduled \
 * **Blocked**: Blocked time range constraint
 */
export type RescheduleOperationConstraintKind = string;

/** Time window in which Customer can reschedule maintenance */
export interface AvailableWindowForMaintenanceWhileRescheduleOperation extends RescheduleOperationConstraint {
  /** The kind of constraint */
  kind: "AvailableWindowForMaintenance";
  /** Start date time */
  readonly startsAt: Date;
  /** End date Time */
  readonly endsAt: Date;
}

export function availableWindowForMaintenanceWhileRescheduleOperationDeserializer(
  item: any,
): AvailableWindowForMaintenanceWhileRescheduleOperation {
  return {
    kind: item["kind"],
    startsAt: new Date(item["startsAt"]),
    endsAt: new Date(item["endsAt"]),
  };
}

/** Time ranges blocked for rescheduling maintenance */
export interface BlockedWhileRescheduleOperation extends RescheduleOperationConstraint {
  /** The kind of constraint */
  kind: "Blocked";
  /** Category of blocked date */
  readonly category: BlockedDatesConstraintCategory;
  /** Date ranges blocked for schedule */
  readonly timeRanges?: BlockedDatesConstraintTimeRange[];
}

export function blockedWhileRescheduleOperationDeserializer(
  item: any,
): BlockedWhileRescheduleOperation {
  return {
    kind: item["kind"],
    category: item["category"],
    timeRanges: !item["timeRanges"]
      ? item["timeRanges"]
      : blockedDatesConstraintTimeRangeArrayDeserializer(item["timeRanges"]),
  };
}

/** Refresh MaintenanceReadiness status */
export interface MaintenanceReadinessRefreshOperation extends MaintenanceManagementOperation {
  /** The kind of operation */
  kind: "MaintenanceReadinessRefresh";
  /** If maintenanceReadiness refresh is disabled */
  readonly isDisabled?: boolean;
  /** Reason disabling refresh for maintenanceReadiness */
  readonly disabledReason?: string;
  /** Status of the operation */
  readonly status?: MaintenanceReadinessRefreshOperationStatus;
  /** Indicates if the operation was refreshed by Microsoft */
  readonly refreshedByMicrosoft?: boolean;
  /** Additional message about the operation */
  readonly message?: string;
}

export function maintenanceReadinessRefreshOperationDeserializer(
  item: any,
): MaintenanceReadinessRefreshOperation {
  return {
    kind: item["kind"],
    isDisabled: item["isDisabled"],
    disabledReason: item["disabledReason"],
    status: item["status"],
    refreshedByMicrosoft: item["refreshedByMicrosoft"],
    message: item["message"],
  };
}

/** The status of an MaintenanceReadinessRefresh operation */
export enum KnownMaintenanceReadinessRefreshOperationStatus {
  /** Operation is in progress */
  InProgress = "InProgress",
  /** Operation has not started */
  NotStarted = "NotStarted",
  /** Operation has failed */
  Failed = "Failed",
  /** Operation is not applicable */
  NotApplicable = "NotApplicable",
}

/**
 * The status of an MaintenanceReadinessRefresh operation \
 * {@link KnownMaintenanceReadinessRefreshOperationStatus} can be used interchangeably with MaintenanceReadinessRefreshOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: Operation is in progress \
 * **NotStarted**: Operation has not started \
 * **Failed**: Operation has failed \
 * **NotApplicable**: Operation is not applicable
 */
export type MaintenanceReadinessRefreshOperationStatus = string;

/** Maintenance readiness details */
export interface MaintenanceReadiness {
  /** The type of maintenance readiness check */
  readonly type: MaintenanceCheckType;
  /** The current readiness status of maintenance */
  readonly status: MaintenanceReadinessStatus;
  /** A summary message of the readiness check result */
  readonly message?: string;
  /** A list of failed checks, if any */
  readonly failedChecks?: MaintenanceFailedCheck[];
  /** The timestamp of the last readiness update */
  readonly lastUpdated?: Date;
}

export function maintenanceReadinessDeserializer(item: any): MaintenanceReadiness {
  return {
    type: item["type"],
    status: item["status"],
    message: item["message"],
    failedChecks: !item["failedChecks"]
      ? item["failedChecks"]
      : maintenanceFailedCheckArrayDeserializer(item["failedChecks"]),
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
  };
}

/** Defines the type of maintenance readiness check */
export enum KnownMaintenanceCheckType {
  /** Pre-check maintenance readiness */
  Precheck = "Precheck",
  /** Pre-flight maintenance readiness */
  Preflight = "Preflight",
}

/**
 * Defines the type of maintenance readiness check \
 * {@link KnownMaintenanceCheckType} can be used interchangeably with MaintenanceCheckType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Precheck**: Pre-check maintenance readiness \
 * **Preflight**: Pre-flight maintenance readiness
 */
export type MaintenanceCheckType = string;

/** Defines the readiness status of maintenance */
export enum KnownMaintenanceReadinessStatus {
  /** The system is ready for maintenance */
  Ready = "Ready",
  /** The system is not ready for maintenance */
  NotReady = "NotReady",
  /** Data is not available to determine readiness */
  DataNotAvailable = "DataNotAvailable",
  /** Readiness check is not applicable */
  NotApplicable = "NotApplicable",
}

/**
 * Defines the readiness status of maintenance \
 * {@link KnownMaintenanceReadinessStatus} can be used interchangeably with MaintenanceReadinessStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: The system is ready for maintenance \
 * **NotReady**: The system is not ready for maintenance \
 * **DataNotAvailable**: Data is not available to determine readiness \
 * **NotApplicable**: Readiness check is not applicable
 */
export type MaintenanceReadinessStatus = string;

export function maintenanceFailedCheckArrayDeserializer(
  result: Array<MaintenanceFailedCheck>,
): any[] {
  return result.map((item) => {
    return maintenanceFailedCheckDeserializer(item);
  });
}

/** Details about a failed maintenance check */
export interface MaintenanceFailedCheck {
  /** The name of the failed check */
  readonly name?: string;
  /** A list of resources impacted by the failed check */
  readonly impactedResources?: ImpactedMaintenanceResource[];
}

export function maintenanceFailedCheckDeserializer(item: any): MaintenanceFailedCheck {
  return {
    name: item["name"],
    impactedResources: !item["impactedResources"]
      ? item["impactedResources"]
      : impactedMaintenanceResourceArrayDeserializer(item["impactedResources"]),
  };
}

export function impactedMaintenanceResourceArrayDeserializer(
  result: Array<ImpactedMaintenanceResource>,
): any[] {
  return result.map((item) => {
    return impactedMaintenanceResourceDeserializer(item);
  });
}

/** Details about a resource impacted by a failed check */
export interface ImpactedMaintenanceResource {
  /** The ID of the impacted resource */
  readonly id?: string;
  /** A list of errors associated with the impacted resource */
  readonly errors?: ImpactedMaintenanceResourceError[];
}

export function impactedMaintenanceResourceDeserializer(item: any): ImpactedMaintenanceResource {
  return {
    id: item["id"],
    errors: !item["errors"]
      ? item["errors"]
      : impactedMaintenanceResourceErrorArrayDeserializer(item["errors"]),
  };
}

export function impactedMaintenanceResourceErrorArrayDeserializer(
  result: Array<ImpactedMaintenanceResourceError>,
): any[] {
  return result.map((item) => {
    return impactedMaintenanceResourceErrorDeserializer(item);
  });
}

/** Details about an error affecting a resource */
export interface ImpactedMaintenanceResourceError {
  /** The error code */
  readonly errorCode?: string;
  /** The name of the error */
  readonly name?: string;
  /** Additional details about the error */
  readonly details?: string;
  /** Steps to resolve the error */
  readonly resolutionSteps?: string[];
  /** Indicates whether action is required by the customer */
  readonly actionRequired?: boolean;
}

export function impactedMaintenanceResourceErrorDeserializer(
  item: any,
): ImpactedMaintenanceResourceError {
  return {
    errorCode: item["errorCode"],
    name: item["name"],
    details: item["details"],
    resolutionSteps: !item["resolutionSteps"]
      ? item["resolutionSteps"]
      : item["resolutionSteps"].map((p: any) => {
          return p;
        }),
    actionRequired: item["actionRequired"],
  };
}

/** reschedule a maintenance */
export interface MaintenanceReschedule {
  /** reschedule time */
  rescheduleTime?: Date;
  /** rescheduling reason */
  message?: string;
}

export function maintenanceRescheduleSerializer(item: MaintenanceReschedule): any {
  return {
    rescheduleTime: !item["rescheduleTime"]
      ? item["rescheduleTime"]
      : item["rescheduleTime"].toISOString(),
    message: item["message"],
  };
}

/** schedule a maintenance */
export interface MaintenanceSchedule {
  /** schedule time */
  scheduleTime?: Date;
  /** scheduling message */
  message?: string;
}

export function maintenanceScheduleSerializer(item: MaintenanceSchedule): any {
  return {
    scheduleTime: !item["scheduleTime"] ? item["scheduleTime"] : item["scheduleTime"].toISOString(),
    message: item["message"],
  };
}

/** The response of a PlacementPolicy list operation. */
export interface _PlacementPoliciesList {
  /** The PlacementPolicy items on this page */
  value: PlacementPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _placementPoliciesListDeserializer(item: any): _PlacementPoliciesList {
  return {
    value: placementPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function placementPolicyArraySerializer(result: Array<PlacementPolicy>): any[] {
  return result.map((item) => {
    return placementPolicySerializer(item);
  });
}

export function placementPolicyArrayDeserializer(result: Array<PlacementPolicy>): any[] {
  return result.map((item) => {
    return placementPolicyDeserializer(item);
  });
}

/** A vSphere Distributed Resource Scheduler (DRS) placement policy */
export interface PlacementPolicy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PlacementPolicyPropertiesUnion;
}

export function placementPolicySerializer(item: PlacementPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : placementPolicyPropertiesUnionSerializer(item["properties"]),
  };
}

export function placementPolicyDeserializer(item: any): PlacementPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : placementPolicyPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Abstract placement policy properties */
export interface PlacementPolicyProperties {
  /** Placement Policy type */
  /** The discriminator possible values: VmVm, VmHost */
  type: PlacementPolicyType;
  /** Whether the placement policy is enabled or disabled */
  state?: PlacementPolicyState;
  /** Display name of the placement policy */
  displayName?: string;
  /** The provisioning state */
  readonly provisioningState?: PlacementPolicyProvisioningState;
}

export function placementPolicyPropertiesSerializer(item: PlacementPolicyProperties): any {
  return { type: item["type"], state: item["state"], displayName: item["displayName"] };
}

export function placementPolicyPropertiesDeserializer(item: any): PlacementPolicyProperties {
  return {
    type: item["type"],
    state: item["state"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for PlacementPolicyPropertiesUnion */
export type PlacementPolicyPropertiesUnion =
  | VmPlacementPolicyProperties
  | VmHostPlacementPolicyProperties
  | PlacementPolicyProperties;

export function placementPolicyPropertiesUnionSerializer(
  item: PlacementPolicyPropertiesUnion,
): any {
  switch (item.type) {
    case "VmVm":
      return vmPlacementPolicyPropertiesSerializer(item as VmPlacementPolicyProperties);

    case "VmHost":
      return vmHostPlacementPolicyPropertiesSerializer(item as VmHostPlacementPolicyProperties);

    default:
      return placementPolicyPropertiesSerializer(item);
  }
}

export function placementPolicyPropertiesUnionDeserializer(
  item: any,
): PlacementPolicyPropertiesUnion {
  switch (item.type) {
    case "VmVm":
      return vmPlacementPolicyPropertiesDeserializer(item as VmPlacementPolicyProperties);

    case "VmHost":
      return vmHostPlacementPolicyPropertiesDeserializer(item as VmHostPlacementPolicyProperties);

    default:
      return placementPolicyPropertiesDeserializer(item);
  }
}

/** Placement Policy type */
export enum KnownPlacementPolicyType {
  /** VmVm */
  VmVm = "VmVm",
  /** VmHost */
  VmHost = "VmHost",
}

/**
 * Placement Policy type \
 * {@link KnownPlacementPolicyType} can be used interchangeably with PlacementPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VmVm** \
 * **VmHost**
 */
export type PlacementPolicyType = string;

/** Placement Policy state */
export enum KnownPlacementPolicyState {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * Placement Policy state \
 * {@link KnownPlacementPolicyState} can be used interchangeably with PlacementPolicyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type PlacementPolicyState = string;

/** Placement Policy provisioning state */
export enum KnownPlacementPolicyProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Placement Policy provisioning state \
 * {@link KnownPlacementPolicyProvisioningState} can be used interchangeably with PlacementPolicyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type PlacementPolicyProvisioningState = string;

/** VM-VM placement policy properties */
export interface VmPlacementPolicyProperties extends PlacementPolicyProperties {
  /** Virtual machine members list */
  vmMembers: string[];
  /** placement policy affinity type */
  affinityType: AffinityType;
  /** placement policy type */
  type: "VmVm";
}

export function vmPlacementPolicyPropertiesSerializer(item: VmPlacementPolicyProperties): any {
  return {
    type: item["type"],
    state: item["state"],
    displayName: item["displayName"],
    vmMembers: item["vmMembers"].map((p: any) => {
      return p;
    }),
    affinityType: item["affinityType"],
  };
}

export function vmPlacementPolicyPropertiesDeserializer(item: any): VmPlacementPolicyProperties {
  return {
    type: item["type"],
    state: item["state"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    vmMembers: item["vmMembers"].map((p: any) => {
      return p;
    }),
    affinityType: item["affinityType"],
  };
}

/** Affinity type */
export enum KnownAffinityType {
  /** is affinity */
  Affinity = "Affinity",
  /** is anti-affinity */
  AntiAffinity = "AntiAffinity",
}

/**
 * Affinity type \
 * {@link KnownAffinityType} can be used interchangeably with AffinityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Affinity**: is affinity \
 * **AntiAffinity**: is anti-affinity
 */
export type AffinityType = string;

/** VM-Host placement policy properties */
export interface VmHostPlacementPolicyProperties extends PlacementPolicyProperties {
  /** Virtual machine members list */
  vmMembers: string[];
  /** Host members list */
  hostMembers: string[];
  /** placement policy affinity type */
  affinityType: AffinityType;
  /** vm-host placement policy affinity strength (should/must) */
  affinityStrength?: AffinityStrength;
  /** placement policy azure hybrid benefit opt-in type */
  azureHybridBenefitType?: AzureHybridBenefitType;
  /** placement policy type */
  type: "VmHost";
}

export function vmHostPlacementPolicyPropertiesSerializer(
  item: VmHostPlacementPolicyProperties,
): any {
  return {
    type: item["type"],
    state: item["state"],
    displayName: item["displayName"],
    vmMembers: item["vmMembers"].map((p: any) => {
      return p;
    }),
    hostMembers: item["hostMembers"].map((p: any) => {
      return p;
    }),
    affinityType: item["affinityType"],
    affinityStrength: item["affinityStrength"],
    azureHybridBenefitType: item["azureHybridBenefitType"],
  };
}

export function vmHostPlacementPolicyPropertiesDeserializer(
  item: any,
): VmHostPlacementPolicyProperties {
  return {
    type: item["type"],
    state: item["state"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    vmMembers: item["vmMembers"].map((p: any) => {
      return p;
    }),
    hostMembers: item["hostMembers"].map((p: any) => {
      return p;
    }),
    affinityType: item["affinityType"],
    affinityStrength: item["affinityStrength"],
    azureHybridBenefitType: item["azureHybridBenefitType"],
  };
}

/** Affinity Strength */
export enum KnownAffinityStrength {
  /** is should */
  Should = "Should",
  /** is must */
  Must = "Must",
}

/**
 * Affinity Strength \
 * {@link KnownAffinityStrength} can be used interchangeably with AffinityStrength,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Should**: is should \
 * **Must**: is must
 */
export type AffinityStrength = string;

/** Azure Hybrid Benefit type */
export enum KnownAzureHybridBenefitType {
  /** is SqlHost */
  SqlHost = "SqlHost",
  /** is None */
  None = "None",
}

/**
 * Azure Hybrid Benefit type \
 * {@link KnownAzureHybridBenefitType} can be used interchangeably with AzureHybridBenefitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlHost**: is SqlHost \
 * **None**: is None
 */
export type AzureHybridBenefitType = string;

/** An update of a DRS placement policy resource */
export interface PlacementPolicyUpdate {
  /** The properties of a placement policy resource that may be updated */
  properties?: PlacementPolicyUpdateProperties;
}

export function placementPolicyUpdateSerializer(item: PlacementPolicyUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : placementPolicyUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The properties of a placement policy resource that may be updated */
export interface PlacementPolicyUpdateProperties {
  /** Whether the placement policy is enabled or disabled */
  state?: PlacementPolicyState;
  /** Virtual machine members list */
  vmMembers?: string[];
  /** Host members list */
  hostMembers?: string[];
  /** vm-host placement policy affinity strength (should/must) */
  affinityStrength?: AffinityStrength;
  /** placement policy azure hybrid benefit opt-in type */
  azureHybridBenefitType?: AzureHybridBenefitType;
}

export function placementPolicyUpdatePropertiesSerializer(
  item: PlacementPolicyUpdateProperties,
): any {
  return {
    state: item["state"],
    vmMembers: !item["vmMembers"]
      ? item["vmMembers"]
      : item["vmMembers"].map((p: any) => {
          return p;
        }),
    hostMembers: !item["hostMembers"]
      ? item["hostMembers"]
      : item["hostMembers"].map((p: any) => {
          return p;
        }),
    affinityStrength: item["affinityStrength"],
    azureHybridBenefitType: item["azureHybridBenefitType"],
  };
}

/** The response of a PrivateCloud list operation. */
export interface _PrivateCloudList {
  /** The PrivateCloud items on this page */
  value: PrivateCloud[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateCloudListDeserializer(item: any): _PrivateCloudList {
  return {
    value: privateCloudArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateCloudArraySerializer(result: Array<PrivateCloud>): any[] {
  return result.map((item) => {
    return privateCloudSerializer(item);
  });
}

export function privateCloudArrayDeserializer(result: Array<PrivateCloud>): any[] {
  return result.map((item) => {
    return privateCloudDeserializer(item);
  });
}

/** A private cloud resource */
export interface PrivateCloud extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateCloudProperties;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku: Sku;
  /** The managed service identities assigned to this resource. */
  identity?: PrivateCloudIdentity;
  /** The availability zones. */
  zones?: string[];
}

export function privateCloudSerializer(item: PrivateCloud): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : privateCloudPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : privateCloudIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function privateCloudDeserializer(item: any): PrivateCloud {
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
      : privateCloudPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : privateCloudIdentityDeserializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of a private cloud resource */
export interface PrivateCloudProperties {
  /** The default cluster used for management */
  managementCluster: ManagementCluster;
  /** Connectivity to internet is enabled or disabled */
  internet?: InternetEnum;
  /** vCenter Single Sign On Identity Sources */
  identitySources?: IdentitySource[];
  /** Properties describing how the cloud is distributed across availability zones */
  availability?: AvailabilityProperties;
  /** Customer managed key encryption, can be enabled or disabled */
  encryption?: Encryption;
  /**
   * Array of additional networks noncontiguous with networkBlock. Networks must be
   * unique and non-overlapping across VNet in your subscription, on-premise, and
   * this privateCloud networkBlock attribute. Make sure the CIDR format conforms to
   * (A.B.C.D/X).
   */
  extendedNetworkBlocks?: string[];
  /** The provisioning state */
  readonly provisioningState?: PrivateCloudProvisioningState;
  /** An ExpressRoute Circuit */
  circuit?: Circuit;
  /** The endpoints */
  readonly endpoints?: Endpoints;
  /**
   * The block of addresses should be unique across VNet in your subscription as
   * well as on-premise. Make sure the CIDR format is conformed to (A.B.C.D/X) where
   * A,B,C,D are between 0 and 255, and X is between 0 and 22
   */
  networkBlock: string;
  /** Network used to access vCenter Server and NSX-T Manager */
  readonly managementNetwork?: string;
  /** Used for virtual machine cold migration, cloning, and snapshot migration */
  readonly provisioningNetwork?: string;
  /** Used for live migration of virtual machines */
  readonly vmotionNetwork?: string;
  /** Optionally, set the vCenter admin password when the private cloud is created */
  vcenterPassword?: string;
  /** Optionally, set the NSX-T Manager password when the private cloud is created */
  nsxtPassword?: string;
  /** Thumbprint of the vCenter Server SSL certificate */
  readonly vcenterCertificateThumbprint?: string;
  /** Thumbprint of the NSX-T Manager SSL certificate */
  readonly nsxtCertificateThumbprint?: string;
  /** Array of cloud link IDs from other clouds that connect to this one */
  readonly externalCloudLinks?: string[];
  /**
   * A secondary expressRoute circuit from a separate AZ. Only present in a
   * stretched private cloud
   */
  secondaryCircuit?: Circuit;
  /**
   * Flag to indicate whether the private cloud has the quota for provisioned NSX
   * Public IP count raised from 64 to 1024
   */
  readonly nsxPublicIpQuotaRaised?: NsxPublicIpQuotaRaisedEnum;
  /** Azure resource ID of the virtual network */
  virtualNetworkId?: string;
  /** The type of DNS zone to use. */
  dnsZoneType?: DnsZoneType;
  /** The private cloud license */
  vcfLicense?: VcfLicenseUnion;
}

export function privateCloudPropertiesSerializer(item: PrivateCloudProperties): any {
  return {
    managementCluster: managementClusterSerializer(item["managementCluster"]),
    internet: item["internet"],
    identitySources: !item["identitySources"]
      ? item["identitySources"]
      : identitySourceArraySerializer(item["identitySources"]),
    availability: !item["availability"]
      ? item["availability"]
      : availabilityPropertiesSerializer(item["availability"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    extendedNetworkBlocks: !item["extendedNetworkBlocks"]
      ? item["extendedNetworkBlocks"]
      : item["extendedNetworkBlocks"].map((p: any) => {
          return p;
        }),
    circuit: !item["circuit"] ? item["circuit"] : circuitSerializer(item["circuit"]),
    networkBlock: item["networkBlock"],
    vcenterPassword: item["vcenterPassword"],
    nsxtPassword: item["nsxtPassword"],
    secondaryCircuit: !item["secondaryCircuit"]
      ? item["secondaryCircuit"]
      : circuitSerializer(item["secondaryCircuit"]),
    virtualNetworkId: item["virtualNetworkId"],
    dnsZoneType: item["dnsZoneType"],
    vcfLicense: !item["vcfLicense"]
      ? item["vcfLicense"]
      : vcfLicenseUnionSerializer(item["vcfLicense"]),
  };
}

export function privateCloudPropertiesDeserializer(item: any): PrivateCloudProperties {
  return {
    managementCluster: managementClusterDeserializer(item["managementCluster"]),
    internet: item["internet"],
    identitySources: !item["identitySources"]
      ? item["identitySources"]
      : identitySourceArrayDeserializer(item["identitySources"]),
    availability: !item["availability"]
      ? item["availability"]
      : availabilityPropertiesDeserializer(item["availability"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    extendedNetworkBlocks: !item["extendedNetworkBlocks"]
      ? item["extendedNetworkBlocks"]
      : item["extendedNetworkBlocks"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    circuit: !item["circuit"] ? item["circuit"] : circuitDeserializer(item["circuit"]),
    endpoints: !item["endpoints"] ? item["endpoints"] : endpointsDeserializer(item["endpoints"]),
    networkBlock: item["networkBlock"],
    managementNetwork: item["managementNetwork"],
    provisioningNetwork: item["provisioningNetwork"],
    vmotionNetwork: item["vmotionNetwork"],
    vcenterPassword: item["vcenterPassword"],
    nsxtPassword: item["nsxtPassword"],
    vcenterCertificateThumbprint: item["vcenterCertificateThumbprint"],
    nsxtCertificateThumbprint: item["nsxtCertificateThumbprint"],
    externalCloudLinks: !item["externalCloudLinks"]
      ? item["externalCloudLinks"]
      : item["externalCloudLinks"].map((p: any) => {
          return p;
        }),
    secondaryCircuit: !item["secondaryCircuit"]
      ? item["secondaryCircuit"]
      : circuitDeserializer(item["secondaryCircuit"]),
    nsxPublicIpQuotaRaised: item["nsxPublicIpQuotaRaised"],
    virtualNetworkId: item["virtualNetworkId"],
    dnsZoneType: item["dnsZoneType"],
    vcfLicense: !item["vcfLicense"]
      ? item["vcfLicense"]
      : vcfLicenseUnionDeserializer(item["vcfLicense"]),
  };
}

/** The properties of a management cluster */
export interface ManagementCluster {
  /** The cluster size */
  clusterSize?: number;
  /** The state of the cluster provisioning */
  readonly provisioningState?: ClusterProvisioningState;
  /** The identity */
  readonly clusterId?: number;
  /** The hosts */
  hosts?: string[];
  /** Name of the vsan datastore associated with the cluster */
  vsanDatastoreName?: string;
}

export function managementClusterSerializer(item: ManagementCluster): any {
  return {
    clusterSize: item["clusterSize"],
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
    vsanDatastoreName: item["vsanDatastoreName"],
  };
}

export function managementClusterDeserializer(item: any): ManagementCluster {
  return {
    clusterSize: item["clusterSize"],
    provisioningState: item["provisioningState"],
    clusterId: item["clusterId"],
    hosts: !item["hosts"]
      ? item["hosts"]
      : item["hosts"].map((p: any) => {
          return p;
        }),
    vsanDatastoreName: item["vsanDatastoreName"],
  };
}

/** Whether internet is enabled or disabled */
export enum KnownInternetEnum {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * Whether internet is enabled or disabled \
 * {@link KnownInternetEnum} can be used interchangeably with InternetEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type InternetEnum = string;

export function identitySourceArraySerializer(result: Array<IdentitySource>): any[] {
  return result.map((item) => {
    return identitySourceSerializer(item);
  });
}

export function identitySourceArrayDeserializer(result: Array<IdentitySource>): any[] {
  return result.map((item) => {
    return identitySourceDeserializer(item);
  });
}

/** vCenter Single Sign On Identity Source */
export interface IdentitySource {
  /** The name of the identity source */
  name?: string;
  /** The domain's NetBIOS name */
  alias?: string;
  /** The domain's DNS name */
  domain?: string;
  /** The base distinguished name for users */
  baseUserDN?: string;
  /** The base distinguished name for groups */
  baseGroupDN?: string;
  /** Primary server URL */
  primaryServer?: string;
  /** Secondary server URL */
  secondaryServer?: string;
  /** Protect LDAP communication using SSL certificate (LDAPS) */
  ssl?: SslEnum;
  /**
   * The ID of an Active Directory user with a minimum of read-only access to Base
   * DN for users and group
   */
  username?: string;
  /**
   * The password of the Active Directory user with a minimum of read-only access to
   * Base DN for users and groups.
   */
  password?: string;
}

export function identitySourceSerializer(item: IdentitySource): any {
  return {
    name: item["name"],
    alias: item["alias"],
    domain: item["domain"],
    baseUserDN: item["baseUserDN"],
    baseGroupDN: item["baseGroupDN"],
    primaryServer: item["primaryServer"],
    secondaryServer: item["secondaryServer"],
    ssl: item["ssl"],
    username: item["username"],
    password: item["password"],
  };
}

export function identitySourceDeserializer(item: any): IdentitySource {
  return {
    name: item["name"],
    alias: item["alias"],
    domain: item["domain"],
    baseUserDN: item["baseUserDN"],
    baseGroupDN: item["baseGroupDN"],
    primaryServer: item["primaryServer"],
    secondaryServer: item["secondaryServer"],
    ssl: item["ssl"],
    username: item["username"],
    password: item["password"],
  };
}

/** Whether SSL is enabled or disabled */
export enum KnownSslEnum {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * Whether SSL is enabled or disabled \
 * {@link KnownSslEnum} can be used interchangeably with SslEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type SslEnum = string;

/** The properties describing private cloud availability zone distribution */
export interface AvailabilityProperties {
  /** The availability strategy for the private cloud */
  strategy?: AvailabilityStrategy;
  /** The primary availability zone for the private cloud */
  zone?: number;
  /** The secondary availability zone for the private cloud */
  secondaryZone?: number;
}

export function availabilityPropertiesSerializer(item: AvailabilityProperties): any {
  return { strategy: item["strategy"], zone: item["zone"], secondaryZone: item["secondaryZone"] };
}

export function availabilityPropertiesDeserializer(item: any): AvailabilityProperties {
  return {
    strategy: item["strategy"],
    zone: item["zone"],
    secondaryZone: item["secondaryZone"],
  };
}

/** Whether the private clouds is available in a single zone or two zones */
export enum KnownAvailabilityStrategy {
  /** in single zone */
  SingleZone = "SingleZone",
  /** in two zones */
  DualZone = "DualZone",
}

/**
 * Whether the private clouds is available in a single zone or two zones \
 * {@link KnownAvailabilityStrategy} can be used interchangeably with AvailabilityStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleZone**: in single zone \
 * **DualZone**: in two zones
 */
export type AvailabilityStrategy = string;

/** The properties of customer managed encryption key */
export interface Encryption {
  /** Status of customer managed encryption key */
  status?: EncryptionState;
  /** The key vault where the encryption key is stored */
  keyVaultProperties?: EncryptionKeyVaultProperties;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    status: item["status"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    status: item["status"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
  };
}

/** Whether encryption is enabled or disabled */
export enum KnownEncryptionState {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * Whether encryption is enabled or disabled \
 * {@link KnownEncryptionState} can be used interchangeably with EncryptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type EncryptionState = string;

/** An Encryption Key */
export interface EncryptionKeyVaultProperties {
  /** The name of the key. */
  keyName?: string;
  /** The version of the key. */
  keyVersion?: string;
  /** The auto-detected version of the key if versionType is auto-detected. */
  readonly autoDetectedKeyVersion?: string;
  /** The URL of the vault. */
  keyVaultUrl?: string;
  /** The state of key provided */
  readonly keyState?: EncryptionKeyStatus;
  /** Property of the key if user provided or auto detected */
  readonly versionType?: EncryptionVersionType;
}

export function encryptionKeyVaultPropertiesSerializer(item: EncryptionKeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUrl: item["keyVaultUrl"],
  };
}

export function encryptionKeyVaultPropertiesDeserializer(item: any): EncryptionKeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    autoDetectedKeyVersion: item["autoDetectedKeyVersion"],
    keyVaultUrl: item["keyVaultUrl"],
    keyState: item["keyState"],
    versionType: item["versionType"],
  };
}

/** Whether the the encryption key is connected or access denied */
export enum KnownEncryptionKeyStatus {
  /** is connected */
  Connected = "Connected",
  /** is access denied */
  AccessDenied = "AccessDenied",
}

/**
 * Whether the the encryption key is connected or access denied \
 * {@link KnownEncryptionKeyStatus} can be used interchangeably with EncryptionKeyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: is connected \
 * **AccessDenied**: is access denied
 */
export type EncryptionKeyStatus = string;

/** Whether the encryption version is fixed or auto-detected */
export enum KnownEncryptionVersionType {
  /** is fixed */
  Fixed = "Fixed",
  /** is auto-detected */
  AutoDetected = "AutoDetected",
}

/**
 * Whether the encryption version is fixed or auto-detected \
 * {@link KnownEncryptionVersionType} can be used interchangeably with EncryptionVersionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fixed**: is fixed \
 * **AutoDetected**: is auto-detected
 */
export type EncryptionVersionType = string;

/** private cloud provisioning state */
export enum KnownPrivateCloudProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is cancelled */
  Cancelled = "Cancelled",
  /** is pending */
  Pending = "Pending",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * private cloud provisioning state \
 * {@link KnownPrivateCloudProvisioningState} can be used interchangeably with PrivateCloudProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Cancelled**: is cancelled \
 * **Pending**: is pending \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type PrivateCloudProvisioningState = string;

/** An ExpressRoute Circuit */
export interface Circuit {
  /** CIDR of primary subnet */
  readonly primarySubnet?: string;
  /** CIDR of secondary subnet */
  readonly secondarySubnet?: string;
  /** Identifier of the ExpressRoute Circuit (Microsoft Colo only) */
  readonly expressRouteID?: string;
  /** ExpressRoute Circuit private peering identifier */
  readonly expressRoutePrivatePeeringID?: string;
}

export function circuitSerializer(item: Circuit): any {
  return item;
}

export function circuitDeserializer(item: any): Circuit {
  return {
    primarySubnet: item["primarySubnet"],
    secondarySubnet: item["secondarySubnet"],
    expressRouteID: item["expressRouteID"],
    expressRoutePrivatePeeringID: item["expressRoutePrivatePeeringID"],
  };
}

/** Endpoint addresses */
export interface Endpoints {
  /** Endpoint FQDN for the NSX-T Data Center manager */
  readonly nsxtManager?: string;
  /** Endpoint FQDN for Virtual Center Server Appliance */
  readonly vcsa?: string;
  /** Endpoint FQDN for the HCX Cloud Manager */
  readonly hcxCloudManager?: string;
  /** Endpoint IP for the NSX-T Data Center manager */
  readonly nsxtManagerIp?: string;
  /** Endpoint IP for Virtual Center Server Appliance */
  readonly vcenterIp?: string;
  /** Endpoint IP for the HCX Cloud Manager */
  readonly hcxCloudManagerIp?: string;
}

export function endpointsDeserializer(item: any): Endpoints {
  return {
    nsxtManager: item["nsxtManager"],
    vcsa: item["vcsa"],
    hcxCloudManager: item["hcxCloudManager"],
    nsxtManagerIp: item["nsxtManagerIp"],
    vcenterIp: item["vcenterIp"],
    hcxCloudManagerIp: item["hcxCloudManagerIp"],
  };
}

/** NSX public IP quota raised */
export enum KnownNsxPublicIpQuotaRaisedEnum {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * NSX public IP quota raised \
 * {@link KnownNsxPublicIpQuotaRaisedEnum} can be used interchangeably with NsxPublicIpQuotaRaisedEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type NsxPublicIpQuotaRaisedEnum = string;

/** The type of DNS zone. */
export enum KnownDnsZoneType {
  /** Primary DNS zone. */
  Public = "Public",
  /** Private DNS zone. */
  Private = "Private",
}

/**
 * The type of DNS zone. \
 * {@link KnownDnsZoneType} can be used interchangeably with DnsZoneType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Primary DNS zone. \
 * **Private**: Private DNS zone.
 */
export type DnsZoneType = string;

/** A VMware Cloud Foundation license */
export interface VcfLicense {
  /** License kind */
  /** The discriminator possible values: vcf5 */
  kind: VcfLicenseKind;
  /** The state of the license provisioning */
  readonly provisioningState?: LicenseProvisioningState;
}

export function vcfLicenseSerializer(item: VcfLicense): any {
  return { kind: item["kind"] };
}

export function vcfLicenseDeserializer(item: any): VcfLicense {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for VcfLicenseUnion */
export type VcfLicenseUnion = Vcf5License | VcfLicense;

export function vcfLicenseUnionSerializer(item: VcfLicenseUnion): any {
  switch (item.kind) {
    case "vcf5":
      return vcf5LicenseSerializer(item as Vcf5License);

    default:
      return vcfLicenseSerializer(item);
  }
}

export function vcfLicenseUnionDeserializer(item: any): VcfLicenseUnion {
  switch (item.kind) {
    case "vcf5":
      return vcf5LicenseDeserializer(item as Vcf5License);

    default:
      return vcfLicenseDeserializer(item);
  }
}

/** The kind of license. */
export enum KnownVcfLicenseKind {
  /** A VMware Cloud Foundation (VCF) 5.0 license */
  Vcf5 = "vcf5",
}

/**
 * The kind of license. \
 * {@link KnownVcfLicenseKind} can be used interchangeably with VcfLicenseKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **vcf5**: A VMware Cloud Foundation (VCF) 5.0 license
 */
export type VcfLicenseKind = string;

/** A VMware Cloud Foundation (VCF) 5.0 license */
export interface Vcf5License extends VcfLicense {
  /** License kind */
  kind: "vcf5";
  /** License key */
  licenseKey?: string;
  /** Number of cores included in the license */
  cores: number;
  /** UTC datetime when the license expires */
  endDate: Date;
  /** The Broadcom site ID associated with the license. */
  broadcomSiteId?: string;
  /** The Broadcom contract number associated with the license. */
  broadcomContractNumber?: string;
  /** Additional labels passed through for license reporting. */
  labels?: Label[];
}

export function vcf5LicenseSerializer(item: Vcf5License): any {
  return {
    kind: item["kind"],
    licenseKey: item["licenseKey"],
    cores: item["cores"],
    endDate: item["endDate"].toISOString(),
    broadcomSiteId: item["broadcomSiteId"],
    broadcomContractNumber: item["broadcomContractNumber"],
    labels: !item["labels"] ? item["labels"] : labelArraySerializer(item["labels"]),
  };
}

export function vcf5LicenseDeserializer(item: any): Vcf5License {
  return {
    kind: item["kind"],
    provisioningState: item["provisioningState"],
    licenseKey: item["licenseKey"],
    cores: item["cores"],
    endDate: new Date(item["endDate"]),
    broadcomSiteId: item["broadcomSiteId"],
    broadcomContractNumber: item["broadcomContractNumber"],
    labels: !item["labels"] ? item["labels"] : labelArrayDeserializer(item["labels"]),
  };
}

/** Managed service identity (either system assigned, or none) */
export interface PrivateCloudIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ResourceIdentityType;
}

export function privateCloudIdentitySerializer(item: PrivateCloudIdentity): any {
  return { type: item["type"] };
}

export function privateCloudIdentityDeserializer(item: any): PrivateCloudIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownResourceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type ResourceIdentityType = string;

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

/** An update to a private cloud resource */
export interface PrivateCloudUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
  /** The managed service identities assigned to this resource. */
  identity?: PrivateCloudIdentity;
  /** The updatable properties of a private cloud resource */
  properties?: PrivateCloudUpdateProperties;
}

export function privateCloudUpdateSerializer(item: PrivateCloudUpdate): any {
  return {
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : privateCloudIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateCloudUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The properties of a private cloud resource that may be updated */
export interface PrivateCloudUpdateProperties {
  /** The default cluster used for management */
  managementCluster?: ManagementCluster;
  /** Connectivity to internet is enabled or disabled */
  internet?: InternetEnum;
  /** vCenter Single Sign On Identity Sources */
  identitySources?: IdentitySource[];
  /** Properties describing how the cloud is distributed across availability zones */
  availability?: AvailabilityProperties;
  /** Customer managed key encryption, can be enabled or disabled */
  encryption?: Encryption;
  /**
   * Array of additional networks noncontiguous with networkBlock. Networks must be
   * unique and non-overlapping across VNet in your subscription, on-premise, and
   * this privateCloud networkBlock attribute. Make sure the CIDR format conforms to
   * (A.B.C.D/X).
   */
  extendedNetworkBlocks?: string[];
  /** The type of DNS zone to use. */
  dnsZoneType?: DnsZoneType;
}

export function privateCloudUpdatePropertiesSerializer(item: PrivateCloudUpdateProperties): any {
  return {
    managementCluster: !item["managementCluster"]
      ? item["managementCluster"]
      : managementClusterSerializer(item["managementCluster"]),
    internet: item["internet"],
    identitySources: !item["identitySources"]
      ? item["identitySources"]
      : identitySourceArraySerializer(item["identitySources"]),
    availability: !item["availability"]
      ? item["availability"]
      : availabilityPropertiesSerializer(item["availability"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    extendedNetworkBlocks: !item["extendedNetworkBlocks"]
      ? item["extendedNetworkBlocks"]
      : item["extendedNetworkBlocks"].map((p: any) => {
          return p;
        }),
    dnsZoneType: item["dnsZoneType"],
  };
}

/** Administrative credentials for accessing vCenter and NSX-T */
export interface AdminCredentials {
  /** NSX-T Manager username */
  readonly nsxtUsername?: string;
  /** NSX-T Manager password */
  readonly nsxtPassword?: string;
  /** vCenter admin username */
  readonly vcenterUsername?: string;
  /** vCenter admin password */
  readonly vcenterPassword?: string;
}

export function adminCredentialsDeserializer(item: any): AdminCredentials {
  return {
    nsxtUsername: item["nsxtUsername"],
    nsxtPassword: item["nsxtPassword"],
    vcenterUsername: item["vcenterUsername"],
    vcenterPassword: item["vcenterPassword"],
  };
}

/** The response of a ProvisionedNetwork list operation. */
export interface _ProvisionedNetworkListResult {
  /** The ProvisionedNetwork items on this page */
  value: ProvisionedNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _provisionedNetworkListResultDeserializer(
  item: any,
): _ProvisionedNetworkListResult {
  return {
    value: provisionedNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function provisionedNetworkArrayDeserializer(result: Array<ProvisionedNetwork>): any[] {
  return result.map((item) => {
    return provisionedNetworkDeserializer(item);
  });
}

/** A provisioned network resource */
export interface ProvisionedNetwork extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProvisionedNetworkProperties;
}

export function provisionedNetworkDeserializer(item: any): ProvisionedNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : provisionedNetworkPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a provisioned network. */
export interface ProvisionedNetworkProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisionedNetworkProvisioningState;
  /** The address prefixes of the provisioned network in CIDR notation. */
  readonly addressPrefix?: string;
  /** The type of network provisioned. */
  readonly networkType?: ProvisionedNetworkTypes;
}

export function provisionedNetworkPropertiesDeserializer(item: any): ProvisionedNetworkProperties {
  return {
    provisioningState: item["provisioningState"],
    addressPrefix: item["addressPrefix"],
    networkType: item["networkType"],
  };
}

/** provisioned network provisioning state */
export enum KnownProvisionedNetworkProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * provisioned network provisioning state \
 * {@link KnownProvisionedNetworkProvisioningState} can be used interchangeably with ProvisionedNetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ProvisionedNetworkProvisioningState = string;

/** The type of network provisioned. */
export enum KnownProvisionedNetworkTypes {
  /** network for ESX management */
  EsxManagement = "esxManagement",
  /** network for ESX replication */
  EsxReplication = "esxReplication",
  /** network for HCX management */
  HcxManagement = "hcxManagement",
  /** network for HCX uplink */
  HcxUplink = "hcxUplink",
  /** network for vCenter management */
  VcenterManagement = "vcenterManagement",
  /** network for vmotion */
  Vmotion = "vmotion",
  /** network for vsan */
  Vsan = "vsan",
}

/**
 * The type of network provisioned. \
 * {@link KnownProvisionedNetworkTypes} can be used interchangeably with ProvisionedNetworkTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **esxManagement**: network for ESX management \
 * **esxReplication**: network for ESX replication \
 * **hcxManagement**: network for HCX management \
 * **hcxUplink**: network for HCX uplink \
 * **vcenterManagement**: network for vCenter management \
 * **vmotion**: network for vmotion \
 * **vsan**: network for vsan
 */
export type ProvisionedNetworkTypes = string;

/** The response of a PureStoragePolicy list operation. */
export interface _PureStoragePolicyListResult {
  /** The PureStoragePolicy items on this page */
  value: PureStoragePolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pureStoragePolicyListResultDeserializer(item: any): _PureStoragePolicyListResult {
  return {
    value: pureStoragePolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pureStoragePolicyArraySerializer(result: Array<PureStoragePolicy>): any[] {
  return result.map((item) => {
    return pureStoragePolicySerializer(item);
  });
}

export function pureStoragePolicyArrayDeserializer(result: Array<PureStoragePolicy>): any[] {
  return result.map((item) => {
    return pureStoragePolicyDeserializer(item);
  });
}

/** An instance describing a Pure Storage Policy Based Management policy */
export interface PureStoragePolicy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PureStoragePolicyProperties;
}

export function pureStoragePolicySerializer(item: PureStoragePolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : pureStoragePolicyPropertiesSerializer(item["properties"]),
  };
}

export function pureStoragePolicyDeserializer(item: any): PureStoragePolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pureStoragePolicyPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Pure Storage Policy Based Management policy */
export interface PureStoragePolicyProperties {
  /** Definition of a Pure Storage Policy Based Management policy */
  storagePolicyDefinition: string;
  /** Azure resource ID of the Pure Storage Pool associated with the storage policy */
  storagePoolId: string;
  /** The state of the Pure Storage Policy Based Management policy provisioning */
  readonly provisioningState?: PureStoragePolicyProvisioningState;
}

export function pureStoragePolicyPropertiesSerializer(item: PureStoragePolicyProperties): any {
  return {
    storagePolicyDefinition: item["storagePolicyDefinition"],
    storagePoolId: item["storagePoolId"],
  };
}

export function pureStoragePolicyPropertiesDeserializer(item: any): PureStoragePolicyProperties {
  return {
    storagePolicyDefinition: item["storagePolicyDefinition"],
    storagePoolId: item["storagePoolId"],
    provisioningState: item["provisioningState"],
  };
}

/** Pure Storage Policy Based Management policy provisioning state */
export enum KnownPureStoragePolicyProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Pure Storage Policy Based Management policy provisioning state \
 * {@link KnownPureStoragePolicyProvisioningState} can be used interchangeably with PureStoragePolicyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type PureStoragePolicyProvisioningState = string;

/** The response of a ScriptCmdlet list operation. */
export interface _ScriptCmdletsList {
  /** The ScriptCmdlet items on this page */
  value: ScriptCmdlet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scriptCmdletsListDeserializer(item: any): _ScriptCmdletsList {
  return {
    value: scriptCmdletArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scriptCmdletArrayDeserializer(result: Array<ScriptCmdlet>): any[] {
  return result.map((item) => {
    return scriptCmdletDeserializer(item);
  });
}

/** A cmdlet available for script execution */
export interface ScriptCmdlet extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ScriptCmdletProperties;
}

export function scriptCmdletDeserializer(item: any): ScriptCmdlet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scriptCmdletPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a pre-canned script */
export interface ScriptCmdletProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ScriptCmdletProvisioningState;
  /** Description of the scripts functionality */
  readonly description?: string;
  /** Recommended time limit for execution */
  readonly timeout?: string;
  /** Specifies whether a script cmdlet is intended to be invoked only through automation or visible to customers */
  readonly audience?: ScriptCmdletAudience;
  /** Parameters the script will accept */
  readonly parameters?: ScriptParameter[];
}

export function scriptCmdletPropertiesDeserializer(item: any): ScriptCmdletProperties {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    timeout: item["timeout"],
    audience: item["audience"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scriptParameterArrayDeserializer(item["parameters"]),
  };
}

/** A script cmdlet provisioning state */
export enum KnownScriptCmdletProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * A script cmdlet provisioning state \
 * {@link KnownScriptCmdletProvisioningState} can be used interchangeably with ScriptCmdletProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ScriptCmdletProvisioningState = string;

/** Specifies whether a script cmdlet is intended to be invoked only through automation or visible to customers */
export enum KnownScriptCmdletAudience {
  /** is automation */
  Automation = "Automation",
  /** is any */
  Any = "Any",
}

/**
 * Specifies whether a script cmdlet is intended to be invoked only through automation or visible to customers \
 * {@link KnownScriptCmdletAudience} can be used interchangeably with ScriptCmdletAudience,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automation**: is automation \
 * **Any**: is any
 */
export type ScriptCmdletAudience = string;

export function scriptParameterArrayDeserializer(result: Array<ScriptParameter>): any[] {
  return result.map((item) => {
    return scriptParameterDeserializer(item);
  });
}

/** An parameter that the script will accept */
export interface ScriptParameter {
  /**
   * The type of parameter the script is expecting. psCredential is a
   * PSCredentialObject
   */
  readonly type?: ScriptParameterTypes;
  /** The parameter name that the script will expect a parameter value for */
  name?: string;
  /** User friendly description of the parameter */
  readonly description?: string;
  /**
   * Should this parameter be visible to arm and passed in the parameters argument
   * when executing
   */
  readonly visibility?: VisibilityParameterEnum;
  /** Is this parameter required or optional */
  readonly optional?: OptionalParamEnum;
}

export function scriptParameterDeserializer(item: any): ScriptParameter {
  return {
    type: item["type"],
    name: item["name"],
    description: item["description"],
    visibility: item["visibility"],
    optional: item["optional"],
  };
}

/** Script Parameter types */
export enum KnownScriptParameterTypes {
  /** is string */
  String = "String",
  /** is secure string */
  SecureString = "SecureString",
  /** is credential */
  Credential = "Credential",
  /** is int */
  Int = "Int",
  /** is bool */
  Bool = "Bool",
  /** is float */
  Float = "Float",
}

/**
 * Script Parameter types \
 * {@link KnownScriptParameterTypes} can be used interchangeably with ScriptParameterTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: is string \
 * **SecureString**: is secure string \
 * **Credential**: is credential \
 * **Int**: is int \
 * **Bool**: is bool \
 * **Float**: is float
 */
export type ScriptParameterTypes = string;

/** Visibility Parameter */
export enum KnownVisibilityParameterEnum {
  /** is visible */
  Visible = "Visible",
  /** is hidden */
  Hidden = "Hidden",
}

/**
 * Visibility Parameter \
 * {@link KnownVisibilityParameterEnum} can be used interchangeably with VisibilityParameterEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Visible**: is visible \
 * **Hidden**: is hidden
 */
export type VisibilityParameterEnum = string;

/** Optional Param */
export enum KnownOptionalParamEnum {
  /** is optional */
  Optional = "Optional",
  /** is required */
  Required = "Required",
}

/**
 * Optional Param \
 * {@link KnownOptionalParamEnum} can be used interchangeably with OptionalParamEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Optional**: is optional \
 * **Required**: is required
 */
export type OptionalParamEnum = string;

/** The response of a ScriptExecution list operation. */
export interface _ScriptExecutionsList {
  /** The ScriptExecution items on this page */
  value: ScriptExecution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scriptExecutionsListDeserializer(item: any): _ScriptExecutionsList {
  return {
    value: scriptExecutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scriptExecutionArraySerializer(result: Array<ScriptExecution>): any[] {
  return result.map((item) => {
    return scriptExecutionSerializer(item);
  });
}

export function scriptExecutionArrayDeserializer(result: Array<ScriptExecution>): any[] {
  return result.map((item) => {
    return scriptExecutionDeserializer(item);
  });
}

/** An instance of a script executed by a user - custom or AVS */
export interface ScriptExecution extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ScriptExecutionProperties;
}

export function scriptExecutionSerializer(item: ScriptExecution): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scriptExecutionPropertiesSerializer(item["properties"]),
  };
}

export function scriptExecutionDeserializer(item: any): ScriptExecution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scriptExecutionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a user-invoked script */
export interface ScriptExecutionProperties {
  /** A reference to the script cmdlet resource if user is running a AVS script */
  scriptCmdletId?: string;
  /** Parameters the script will accept */
  parameters?: ScriptExecutionParameterUnion[];
  /**
   * Parameters that will be hidden/not visible to ARM, such as passwords and
   * credentials
   */
  hiddenParameters?: ScriptExecutionParameterUnion[];
  /**
   * Error message if the script was able to run, but if the script itself had
   * errors or powershell threw an exception
   */
  failureReason?: string;
  /** Time limit for execution */
  timeout: string;
  /** Time to live for the resource. If not provided, will be available for 60 days */
  retention?: string;
  /** Time the script execution was submitted */
  readonly submittedAt?: Date;
  /** Time the script execution was started */
  readonly startedAt?: Date;
  /** Time the script execution was finished */
  readonly finishedAt?: Date;
  /** The state of the script execution resource */
  readonly provisioningState?: ScriptExecutionProvisioningState;
  /** Standard output stream from the powershell execution */
  output?: string[];
  /** User-defined dictionary. */
  namedOutputs?: Record<string, Record<string, any>>;
  /** Standard information out stream from the powershell execution */
  readonly information?: string[];
  /** Standard warning out stream from the powershell execution */
  readonly warnings?: string[];
  /** Standard error output stream from the powershell execution */
  readonly errors?: string[];
}

export function scriptExecutionPropertiesSerializer(item: ScriptExecutionProperties): any {
  return {
    scriptCmdletId: item["scriptCmdletId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scriptExecutionParameterUnionArraySerializer(item["parameters"]),
    hiddenParameters: !item["hiddenParameters"]
      ? item["hiddenParameters"]
      : scriptExecutionParameterUnionArraySerializer(item["hiddenParameters"]),
    failureReason: item["failureReason"],
    timeout: item["timeout"],
    retention: item["retention"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
    namedOutputs: !item["namedOutputs"]
      ? item["namedOutputs"]
      : _scriptExecutionPropertiesNamedOutputRecordSerializer(item["namedOutputs"]),
  };
}

export function scriptExecutionPropertiesDeserializer(item: any): ScriptExecutionProperties {
  return {
    scriptCmdletId: item["scriptCmdletId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scriptExecutionParameterUnionArrayDeserializer(item["parameters"]),
    hiddenParameters: !item["hiddenParameters"]
      ? item["hiddenParameters"]
      : scriptExecutionParameterUnionArrayDeserializer(item["hiddenParameters"]),
    failureReason: item["failureReason"],
    timeout: item["timeout"],
    retention: item["retention"],
    submittedAt: !item["submittedAt"] ? item["submittedAt"] : new Date(item["submittedAt"]),
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    finishedAt: !item["finishedAt"] ? item["finishedAt"] : new Date(item["finishedAt"]),
    provisioningState: item["provisioningState"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
    namedOutputs: !item["namedOutputs"]
      ? item["namedOutputs"]
      : _scriptExecutionPropertiesNamedOutputRecordDeserializer(item["namedOutputs"]),
    information: !item["information"]
      ? item["information"]
      : item["information"].map((p: any) => {
          return p;
        }),
    warnings: !item["warnings"]
      ? item["warnings"]
      : item["warnings"].map((p: any) => {
          return p;
        }),
    errors: !item["errors"]
      ? item["errors"]
      : item["errors"].map((p: any) => {
          return p;
        }),
  };
}

export function scriptExecutionParameterUnionArraySerializer(
  result: Array<ScriptExecutionParameterUnion>,
): any[] {
  return result.map((item) => {
    return scriptExecutionParameterUnionSerializer(item);
  });
}

export function scriptExecutionParameterUnionArrayDeserializer(
  result: Array<ScriptExecutionParameterUnion>,
): any[] {
  return result.map((item) => {
    return scriptExecutionParameterUnionDeserializer(item);
  });
}

/** The arguments passed in to the execution */
export interface ScriptExecutionParameter {
  /** script execution parameter type */
  /** The discriminator possible values: SecureValue, Value, Credential */
  type: ScriptExecutionParameterType;
  /** The parameter name */
  name: string;
}

export function scriptExecutionParameterSerializer(item: ScriptExecutionParameter): any {
  return { type: item["type"], name: item["name"] };
}

export function scriptExecutionParameterDeserializer(item: any): ScriptExecutionParameter {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for ScriptExecutionParameterUnion */
export type ScriptExecutionParameterUnion =
  | ScriptSecureStringExecutionParameter
  | ScriptStringExecutionParameter
  | PSCredentialExecutionParameter
  | ScriptExecutionParameter;

export function scriptExecutionParameterUnionSerializer(item: ScriptExecutionParameterUnion): any {
  switch (item.type) {
    case "SecureValue":
      return scriptSecureStringExecutionParameterSerializer(
        item as ScriptSecureStringExecutionParameter,
      );

    case "Value":
      return scriptStringExecutionParameterSerializer(item as ScriptStringExecutionParameter);

    case "Credential":
      return psCredentialExecutionParameterSerializer(item as PSCredentialExecutionParameter);

    default:
      return scriptExecutionParameterSerializer(item);
  }
}

export function scriptExecutionParameterUnionDeserializer(
  item: any,
): ScriptExecutionParameterUnion {
  switch (item.type) {
    case "SecureValue":
      return scriptSecureStringExecutionParameterDeserializer(
        item as ScriptSecureStringExecutionParameter,
      );

    case "Value":
      return scriptStringExecutionParameterDeserializer(item as ScriptStringExecutionParameter);

    case "Credential":
      return psCredentialExecutionParameterDeserializer(item as PSCredentialExecutionParameter);

    default:
      return scriptExecutionParameterDeserializer(item);
  }
}

/** script execution parameter type */
export enum KnownScriptExecutionParameterType {
  /** Value */
  Value = "Value",
  /** SecureValue */
  SecureValue = "SecureValue",
  /** Credential */
  Credential = "Credential",
}

/**
 * script execution parameter type \
 * {@link KnownScriptExecutionParameterType} can be used interchangeably with ScriptExecutionParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Value** \
 * **SecureValue** \
 * **Credential**
 */
export type ScriptExecutionParameterType = string;

/** a plain text value execution parameter */
export interface ScriptSecureStringExecutionParameter extends ScriptExecutionParameter {
  /** A secure value for the passed parameter, not to be stored in logs */
  secureValue?: string;
  /** The type of execution parameter */
  type: "SecureValue";
}

export function scriptSecureStringExecutionParameterSerializer(
  item: ScriptSecureStringExecutionParameter,
): any {
  return { type: item["type"], name: item["name"], secureValue: item["secureValue"] };
}

export function scriptSecureStringExecutionParameterDeserializer(
  item: any,
): ScriptSecureStringExecutionParameter {
  return {
    type: item["type"],
    name: item["name"],
    secureValue: item["secureValue"],
  };
}

/** a plain text value execution parameter */
export interface ScriptStringExecutionParameter extends ScriptExecutionParameter {
  /** The value for the passed parameter */
  value?: string;
  /** The type of execution parameter */
  type: "Value";
}

export function scriptStringExecutionParameterSerializer(
  item: ScriptStringExecutionParameter,
): any {
  return { type: item["type"], name: item["name"], value: item["value"] };
}

export function scriptStringExecutionParameterDeserializer(
  item: any,
): ScriptStringExecutionParameter {
  return {
    type: item["type"],
    name: item["name"],
    value: item["value"],
  };
}

/** a powershell credential object */
export interface PSCredentialExecutionParameter extends ScriptExecutionParameter {
  /** username for login */
  username?: string;
  /** password for login */
  password?: string;
  /** The type of execution parameter */
  type: "Credential";
}

export function psCredentialExecutionParameterSerializer(
  item: PSCredentialExecutionParameter,
): any {
  return {
    type: item["type"],
    name: item["name"],
    username: item["username"],
    password: item["password"],
  };
}

export function psCredentialExecutionParameterDeserializer(
  item: any,
): PSCredentialExecutionParameter {
  return {
    type: item["type"],
    name: item["name"],
    username: item["username"],
    password: item["password"],
  };
}

/** Script Execution provisioning state */
export enum KnownScriptExecutionProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is pending */
  Pending = "Pending",
  /** is running */
  Running = "Running",
  /** is cancelling */
  Cancelling = "Cancelling",
  /** is cancelled */
  Cancelled = "Cancelled",
  /** is deleting */
  Deleting = "Deleting",
}

/**
 * Script Execution provisioning state \
 * {@link KnownScriptExecutionProvisioningState} can be used interchangeably with ScriptExecutionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Pending**: is pending \
 * **Running**: is running \
 * **Cancelling**: is cancelling \
 * **Cancelled**: is cancelled \
 * **Deleting**: is deleting
 */
export type ScriptExecutionProvisioningState = string;

export function _scriptExecutionPropertiesNamedOutputRecordSerializer(
  item: Record<string, _ScriptExecutionPropertiesNamedOutput>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : _scriptExecutionPropertiesNamedOutputSerializer(item[key]);
  });
  return result;
}

export function _scriptExecutionPropertiesNamedOutputRecordDeserializer(
  item: Record<string, any>,
): Record<string, _ScriptExecutionPropertiesNamedOutput> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : _scriptExecutionPropertiesNamedOutputDeserializer(item[key]);
  });
  return result;
}

/** model interface _ScriptExecutionPropertiesNamedOutput */
export interface _ScriptExecutionPropertiesNamedOutput {}

export function _scriptExecutionPropertiesNamedOutputSerializer(
  item: _ScriptExecutionPropertiesNamedOutput,
): any {
  return item;
}

export function _scriptExecutionPropertiesNamedOutputDeserializer(
  item: any,
): _ScriptExecutionPropertiesNamedOutput {
  return item;
}

/** The response of a ScriptPackage list operation. */
export interface _ScriptPackagesList {
  /** The ScriptPackage items on this page */
  value: ScriptPackage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scriptPackagesListDeserializer(item: any): _ScriptPackagesList {
  return {
    value: scriptPackageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scriptPackageArrayDeserializer(result: Array<ScriptPackage>): any[] {
  return result.map((item) => {
    return scriptPackageDeserializer(item);
  });
}

/** Script Package resources available for execution */
export interface ScriptPackage extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ScriptPackageProperties;
}

export function scriptPackageDeserializer(item: any): ScriptPackage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scriptPackagePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Script Package subresource */
export interface ScriptPackageProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ScriptPackageProvisioningState;
  /** User friendly description of the package */
  readonly description?: string;
  /** Module version */
  readonly version?: string;
  /** Company that created and supports the package */
  readonly company?: string;
  /** Link to support by the package vendor */
  readonly uri?: string;
}

export function scriptPackagePropertiesDeserializer(item: any): ScriptPackageProperties {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    version: item["version"],
    company: item["company"],
    uri: item["uri"],
  };
}

/** Script Package provisioning state */
export enum KnownScriptPackageProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * Script Package provisioning state \
 * {@link KnownScriptPackageProvisioningState} can be used interchangeably with ScriptPackageProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ScriptPackageProvisioningState = string;

/** Paged collection of ResourceSku items */
export interface _PagedResourceSku {
  /** The ResourceSku items on this page */
  value: ResourceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedResourceSkuDeserializer(item: any): _PagedResourceSku {
  return {
    value: resourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuArrayDeserializer(result: Array<ResourceSku>): any[] {
  return result.map((item) => {
    return resourceSkuDeserializer(item);
  });
}

/** A SKU for a resource. */
export interface ResourceSku {
  /** The type of resource the SKU applies to. */
  resourceType: ResourceSkuResourceType;
  /** The name of the SKU. */
  name: string;
  /** The tier of virtual machines in a scale set */
  tier?: string;
  /** The size of the SKU. */
  size?: string;
  /** The family of the SKU. */
  family?: string;
  /** The set of locations that the SKU is available. */
  locations: string[];
  /** A list of locations and availability zones in those locations where the SKU is available */
  locationInfo: ResourceSkuLocationInfo[];
  /** Name value pairs to describe the capability. */
  capabilities?: ResourceSkuCapabilities[];
  /** The restrictions of the SKU. */
  restrictions: ResourceSkuRestrictions[];
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    locationInfo: resourceSkuLocationInfoArrayDeserializer(item["locationInfo"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    restrictions: resourceSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

/** Describes the type of resource the SKU applies to. */
export enum KnownResourceSkuResourceType {
  /** The SKU is for a private cloud. */
  PrivateClouds = "privateClouds",
  /** The SKU is for a private cloud cluster. */
  PrivateCloudsClusters = "privateClouds/clusters",
}

/**
 * Describes the type of resource the SKU applies to. \
 * {@link KnownResourceSkuResourceType} can be used interchangeably with ResourceSkuResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **privateClouds**: The SKU is for a private cloud. \
 * **privateClouds\/clusters**: The SKU is for a private cloud cluster.
 */
export type ResourceSkuResourceType = string;

export function resourceSkuLocationInfoArrayDeserializer(
  result: Array<ResourceSkuLocationInfo>,
): any[] {
  return result.map((item) => {
    return resourceSkuLocationInfoDeserializer(item);
  });
}

/** Describes an available Compute SKU Location Information. */
export interface ResourceSkuLocationInfo {
  /** Location of the SKU */
  location: string;
  /** List of availability zones where the SKU is supported. */
  zones: string[];
  /** Gets details of capabilities available to a SKU in specific zones. */
  zoneDetails: ResourceSkuZoneDetails[];
}

export function resourceSkuLocationInfoDeserializer(item: any): ResourceSkuLocationInfo {
  return {
    location: item["location"],
    zones: item["zones"].map((p: any) => {
      return p;
    }),
    zoneDetails: resourceSkuZoneDetailsArrayDeserializer(item["zoneDetails"]),
  };
}

export function resourceSkuZoneDetailsArrayDeserializer(
  result: Array<ResourceSkuZoneDetails>,
): any[] {
  return result.map((item) => {
    return resourceSkuZoneDetailsDeserializer(item);
  });
}

/** Describes The zonal capabilities of a SKU. */
export interface ResourceSkuZoneDetails {
  /** Gets the set of zones that the SKU is available in with the specified capabilities. */
  name: string[];
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  capabilities: ResourceSkuCapabilities[];
}

export function resourceSkuZoneDetailsDeserializer(item: any): ResourceSkuZoneDetails {
  return {
    name: item["name"].map((p: any) => {
      return p;
    }),
    capabilities: resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
  };
}

export function resourceSkuCapabilitiesArrayDeserializer(
  result: Array<ResourceSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceSkuCapabilitiesDeserializer(item);
  });
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilities {
  /** The name of the SKU capability. */
  name: string;
  /** The value of the SKU capability. */
  value: string;
}

export function resourceSkuCapabilitiesDeserializer(item: any): ResourceSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function resourceSkuRestrictionsArrayDeserializer(
  result: Array<ResourceSkuRestrictions>,
): any[] {
  return result.map((item) => {
    return resourceSkuRestrictionsDeserializer(item);
  });
}

/** The restrictions of the SKU. */
export interface ResourceSkuRestrictions {
  /** the type of restrictions. */
  type?: ResourceSkuRestrictionsType;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  values: string[];
  /** The information about the restriction where the SKU cannot be used. */
  restrictionInfo: ResourceSkuRestrictionInfo;
  /** the reason for restriction. */
  reasonCode?: ResourceSkuRestrictionsReasonCode;
}

export function resourceSkuRestrictionsDeserializer(item: any): ResourceSkuRestrictions {
  return {
    type: item["type"],
    values: item["values"].map((p: any) => {
      return p;
    }),
    restrictionInfo: resourceSkuRestrictionInfoDeserializer(item["restrictionInfo"]),
    reasonCode: item["reasonCode"],
  };
}

/** Describes the kind of SKU restrictions that can exist */
export enum KnownResourceSkuRestrictionsType {
  /** SKU restricted by location. */
  Location = "Location",
  /** SKU restricted by availability zone. */
  Zone = "Zone",
}

/**
 * Describes the kind of SKU restrictions that can exist \
 * {@link KnownResourceSkuRestrictionsType} can be used interchangeably with ResourceSkuRestrictionsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Location**: SKU restricted by location. \
 * **Zone**: SKU restricted by availability zone.
 */
export type ResourceSkuRestrictionsType = string;

/** Describes an available Compute SKU Restriction Information. */
export interface ResourceSkuRestrictionInfo {
  /** Locations where the SKU is restricted */
  locations?: string[];
  /** List of availability zones where the SKU is restricted. */
  zones?: string[];
}

export function resourceSkuRestrictionInfoDeserializer(item: any): ResourceSkuRestrictionInfo {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Describes the reason for SKU restriction. */
export enum KnownResourceSkuRestrictionsReasonCode {
  /** The restriction is due to exceeding a quota limitation. */
  QuotaId = "QuotaId",
  /** The restriction is not available for this subscription. */
  NotAvailableForSubscription = "NotAvailableForSubscription",
}

/**
 * Describes the reason for SKU restriction. \
 * {@link KnownResourceSkuRestrictionsReasonCode} can be used interchangeably with ResourceSkuRestrictionsReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuotaId**: The restriction is due to exceeding a quota limitation. \
 * **NotAvailableForSubscription**: The restriction is not available for this subscription.
 */
export type ResourceSkuRestrictionsReasonCode = string;

/** The response of a VirtualMachine list operation. */
export interface _VirtualMachinesList {
  /** The VirtualMachine items on this page */
  value: VirtualMachine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualMachinesListDeserializer(item: any): _VirtualMachinesList {
  return {
    value: virtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineArrayDeserializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineDeserializer(item);
  });
}

/** Virtual Machine */
export interface VirtualMachine extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualMachineProperties;
}

export function virtualMachineDeserializer(item: any): VirtualMachine {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePropertiesDeserializer(item["properties"]),
  };
}

/** Virtual Machine Properties */
export interface VirtualMachineProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: VirtualMachineProvisioningState;
  /** Display name of the VM. */
  readonly displayName?: string;
  /** vCenter managed object reference ID of the virtual machine */
  readonly moRefId?: string;
  /** Path to virtual machine's folder starting from datacenter virtual machine folder */
  readonly folderPath?: string;
  /** Whether VM DRS-driven movement is restricted (enabled) or not (disabled) */
  readonly restrictMovement?: VirtualMachineRestrictMovementState;
}

export function virtualMachinePropertiesDeserializer(item: any): VirtualMachineProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    moRefId: item["moRefId"],
    folderPath: item["folderPath"],
    restrictMovement: item["restrictMovement"],
  };
}

/** Virtual Machine provisioning state */
export enum KnownVirtualMachineProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * Virtual Machine provisioning state \
 * {@link KnownVirtualMachineProvisioningState} can be used interchangeably with VirtualMachineProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type VirtualMachineProvisioningState = string;

/** Virtual Machine Restrict Movement state */
export enum KnownVirtualMachineRestrictMovementState {
  /** is enabled */
  Enabled = "Enabled",
  /** is disabled */
  Disabled = "Disabled",
}

/**
 * Virtual Machine Restrict Movement state \
 * {@link KnownVirtualMachineRestrictMovementState} can be used interchangeably with VirtualMachineRestrictMovementState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: is enabled \
 * **Disabled**: is disabled
 */
export type VirtualMachineRestrictMovementState = string;

/** Set VM DRS-driven movement to restricted (enabled) or not (disabled) */
export interface VirtualMachineRestrictMovement {
  /** Whether VM DRS-driven movement is restricted (enabled) or not (disabled) */
  restrictMovement?: VirtualMachineRestrictMovementState;
}

export function virtualMachineRestrictMovementSerializer(
  item: VirtualMachineRestrictMovement,
): any {
  return { restrictMovement: item["restrictMovement"] };
}

/** Workload Network */
export interface WorkloadNetwork extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkProperties;
}

export function workloadNetworkDeserializer(item: any): WorkloadNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a workload network */
export interface WorkloadNetworkProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: WorkloadNetworkProvisioningState;
}

export function workloadNetworkPropertiesDeserializer(item: any): WorkloadNetworkProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** base Workload Network provisioning state */
export enum KnownWorkloadNetworkProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * base Workload Network provisioning state \
 * {@link KnownWorkloadNetworkProvisioningState} can be used interchangeably with WorkloadNetworkProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkProvisioningState = string;

/** The response of a WorkloadNetwork list operation. */
export interface _WorkloadNetworkList {
  /** The WorkloadNetwork items on this page */
  value: WorkloadNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkListDeserializer(item: any): _WorkloadNetworkList {
  return {
    value: workloadNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkArrayDeserializer(result: Array<WorkloadNetwork>): any[] {
  return result.map((item) => {
    return workloadNetworkDeserializer(item);
  });
}

/** The response of a WorkloadNetworkDhcp list operation. */
export interface _WorkloadNetworkDhcpList {
  /** The WorkloadNetworkDhcp items on this page */
  value: WorkloadNetworkDhcp[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkDhcpListDeserializer(item: any): _WorkloadNetworkDhcpList {
  return {
    value: workloadNetworkDhcpArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkDhcpArraySerializer(result: Array<WorkloadNetworkDhcp>): any[] {
  return result.map((item) => {
    return workloadNetworkDhcpSerializer(item);
  });
}

export function workloadNetworkDhcpArrayDeserializer(result: Array<WorkloadNetworkDhcp>): any[] {
  return result.map((item) => {
    return workloadNetworkDhcpDeserializer(item);
  });
}

/** NSX DHCP */
export interface WorkloadNetworkDhcp extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkDhcpEntityUnion;
}

export function workloadNetworkDhcpSerializer(item: WorkloadNetworkDhcp): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDhcpEntityUnionSerializer(item["properties"]),
  };
}

export function workloadNetworkDhcpDeserializer(item: any): WorkloadNetworkDhcp {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDhcpEntityUnionDeserializer(item["properties"]),
  };
}

/**
 * Base class for WorkloadNetworkDhcpServer and WorkloadNetworkDhcpRelay to
 * inherit from
 */
export interface WorkloadNetworkDhcpEntity {
  /** Type of DHCP: SERVER or RELAY. */
  /** The discriminator possible values: SERVER, RELAY */
  dhcpType: DhcpTypeEnum;
  /** Display name of the DHCP entity. */
  displayName?: string;
  /** NSX Segments consuming DHCP. */
  readonly segments?: string[];
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkDhcpProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkDhcpEntitySerializer(item: WorkloadNetworkDhcpEntity): any {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    revision: item["revision"],
  };
}

export function workloadNetworkDhcpEntityDeserializer(item: any): WorkloadNetworkDhcpEntity {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    segments: !item["segments"]
      ? item["segments"]
      : item["segments"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** Alias for WorkloadNetworkDhcpEntityUnion */
export type WorkloadNetworkDhcpEntityUnion =
  | WorkloadNetworkDhcpServer
  | WorkloadNetworkDhcpRelay
  | WorkloadNetworkDhcpEntity;

export function workloadNetworkDhcpEntityUnionSerializer(
  item: WorkloadNetworkDhcpEntityUnion,
): any {
  switch (item.dhcpType) {
    case "SERVER":
      return workloadNetworkDhcpServerSerializer(item as WorkloadNetworkDhcpServer);

    case "RELAY":
      return workloadNetworkDhcpRelaySerializer(item as WorkloadNetworkDhcpRelay);

    default:
      return workloadNetworkDhcpEntitySerializer(item);
  }
}

export function workloadNetworkDhcpEntityUnionDeserializer(
  item: any,
): WorkloadNetworkDhcpEntityUnion {
  switch (item.dhcpType) {
    case "SERVER":
      return workloadNetworkDhcpServerDeserializer(item as WorkloadNetworkDhcpServer);

    case "RELAY":
      return workloadNetworkDhcpRelayDeserializer(item as WorkloadNetworkDhcpRelay);

    default:
      return workloadNetworkDhcpEntityDeserializer(item);
  }
}

/** Type of DHCP: SERVER or RELAY. */
export enum KnownDhcpTypeEnum {
  /** SERVER */
  Server = "SERVER",
  /** RELAY */
  Relay = "RELAY",
}

/**
 * Type of DHCP: SERVER or RELAY. \
 * {@link KnownDhcpTypeEnum} can be used interchangeably with DhcpTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SERVER** \
 * **RELAY**
 */
export type DhcpTypeEnum = string;

/** Workload Network DHCP provisioning state */
export enum KnownWorkloadNetworkDhcpProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network DHCP provisioning state \
 * {@link KnownWorkloadNetworkDhcpProvisioningState} can be used interchangeably with WorkloadNetworkDhcpProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkDhcpProvisioningState = string;

/** NSX DHCP Server */
export interface WorkloadNetworkDhcpServer extends WorkloadNetworkDhcpEntity {
  /** DHCP Server Address. */
  serverAddress?: string;
  /** DHCP Server Lease Time. */
  leaseTime?: number;
  /** Type of DHCP: SERVER or RELAY. */
  dhcpType: "SERVER";
}

export function workloadNetworkDhcpServerSerializer(item: WorkloadNetworkDhcpServer): any {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    revision: item["revision"],
    serverAddress: item["serverAddress"],
    leaseTime: item["leaseTime"],
  };
}

export function workloadNetworkDhcpServerDeserializer(item: any): WorkloadNetworkDhcpServer {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    segments: !item["segments"]
      ? item["segments"]
      : item["segments"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    revision: item["revision"],
    serverAddress: item["serverAddress"],
    leaseTime: item["leaseTime"],
  };
}

/** NSX DHCP Relay */
export interface WorkloadNetworkDhcpRelay extends WorkloadNetworkDhcpEntity {
  /** DHCP Relay Addresses. Max 3. */
  serverAddresses?: string[];
  /** Type of DHCP: SERVER or RELAY. */
  dhcpType: "RELAY";
}

export function workloadNetworkDhcpRelaySerializer(item: WorkloadNetworkDhcpRelay): any {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    revision: item["revision"],
    serverAddresses: !item["serverAddresses"]
      ? item["serverAddresses"]
      : item["serverAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function workloadNetworkDhcpRelayDeserializer(item: any): WorkloadNetworkDhcpRelay {
  return {
    dhcpType: item["dhcpType"],
    displayName: item["displayName"],
    segments: !item["segments"]
      ? item["segments"]
      : item["segments"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    revision: item["revision"],
    serverAddresses: !item["serverAddresses"]
      ? item["serverAddresses"]
      : item["serverAddresses"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a WorkloadNetworkDnsService list operation. */
export interface _WorkloadNetworkDnsServicesList {
  /** The WorkloadNetworkDnsService items on this page */
  value: WorkloadNetworkDnsService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkDnsServicesListDeserializer(
  item: any,
): _WorkloadNetworkDnsServicesList {
  return {
    value: workloadNetworkDnsServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkDnsServiceArraySerializer(
  result: Array<WorkloadNetworkDnsService>,
): any[] {
  return result.map((item) => {
    return workloadNetworkDnsServiceSerializer(item);
  });
}

export function workloadNetworkDnsServiceArrayDeserializer(
  result: Array<WorkloadNetworkDnsService>,
): any[] {
  return result.map((item) => {
    return workloadNetworkDnsServiceDeserializer(item);
  });
}

/** NSX DNS Service */
export interface WorkloadNetworkDnsService extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkDnsServiceProperties;
}

export function workloadNetworkDnsServiceSerializer(item: WorkloadNetworkDnsService): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDnsServicePropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkDnsServiceDeserializer(item: any): WorkloadNetworkDnsService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDnsServicePropertiesDeserializer(item["properties"]),
  };
}

/** NSX DNS Service Properties */
export interface WorkloadNetworkDnsServiceProperties {
  /** Display name of the DNS Service. */
  displayName?: string;
  /** DNS service IP of the DNS Service. */
  dnsServiceIp?: string;
  /** Default DNS zone of the DNS Service. */
  defaultDnsZone?: string;
  /** FQDN zones of the DNS Service. */
  fqdnZones?: string[];
  /** DNS Service log level. */
  logLevel?: DnsServiceLogLevelEnum;
  /** DNS Service status. */
  readonly status?: DnsServiceStatusEnum;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkDnsServiceProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkDnsServicePropertiesSerializer(
  item: WorkloadNetworkDnsServiceProperties,
): any {
  return {
    displayName: item["displayName"],
    dnsServiceIp: item["dnsServiceIp"],
    defaultDnsZone: item["defaultDnsZone"],
    fqdnZones: !item["fqdnZones"]
      ? item["fqdnZones"]
      : item["fqdnZones"].map((p: any) => {
          return p;
        }),
    logLevel: item["logLevel"],
    revision: item["revision"],
  };
}

export function workloadNetworkDnsServicePropertiesDeserializer(
  item: any,
): WorkloadNetworkDnsServiceProperties {
  return {
    displayName: item["displayName"],
    dnsServiceIp: item["dnsServiceIp"],
    defaultDnsZone: item["defaultDnsZone"],
    fqdnZones: !item["fqdnZones"]
      ? item["fqdnZones"]
      : item["fqdnZones"].map((p: any) => {
          return p;
        }),
    logLevel: item["logLevel"],
    status: item["status"],
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** DNS service log level */
export enum KnownDnsServiceLogLevelEnum {
  /** is debug */
  Debug = "DEBUG",
  /** is info */
  Info = "INFO",
  /** is warning */
  Warning = "WARNING",
  /** is error */
  Error = "ERROR",
  /** is fatal */
  Fatal = "FATAL",
}

/**
 * DNS service log level \
 * {@link KnownDnsServiceLogLevelEnum} can be used interchangeably with DnsServiceLogLevelEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DEBUG**: is debug \
 * **INFO**: is info \
 * **WARNING**: is warning \
 * **ERROR**: is error \
 * **FATAL**: is fatal
 */
export type DnsServiceLogLevelEnum = string;

/** DNS service status */
export enum KnownDnsServiceStatusEnum {
  /** is success */
  Success = "SUCCESS",
  /** is failure */
  Failure = "FAILURE",
}

/**
 * DNS service status \
 * {@link KnownDnsServiceStatusEnum} can be used interchangeably with DnsServiceStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUCCESS**: is success \
 * **FAILURE**: is failure
 */
export type DnsServiceStatusEnum = string;

/** Workload Network DNS Service provisioning state */
export enum KnownWorkloadNetworkDnsServiceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network DNS Service provisioning state \
 * {@link KnownWorkloadNetworkDnsServiceProvisioningState} can be used interchangeably with WorkloadNetworkDnsServiceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkDnsServiceProvisioningState = string;

/** The response of a WorkloadNetworkDnsZone list operation. */
export interface _WorkloadNetworkDnsZonesList {
  /** The WorkloadNetworkDnsZone items on this page */
  value: WorkloadNetworkDnsZone[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkDnsZonesListDeserializer(item: any): _WorkloadNetworkDnsZonesList {
  return {
    value: workloadNetworkDnsZoneArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkDnsZoneArraySerializer(
  result: Array<WorkloadNetworkDnsZone>,
): any[] {
  return result.map((item) => {
    return workloadNetworkDnsZoneSerializer(item);
  });
}

export function workloadNetworkDnsZoneArrayDeserializer(
  result: Array<WorkloadNetworkDnsZone>,
): any[] {
  return result.map((item) => {
    return workloadNetworkDnsZoneDeserializer(item);
  });
}

/** NSX DNS Zone */
export interface WorkloadNetworkDnsZone extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkDnsZoneProperties;
}

export function workloadNetworkDnsZoneSerializer(item: WorkloadNetworkDnsZone): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDnsZonePropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkDnsZoneDeserializer(item: any): WorkloadNetworkDnsZone {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkDnsZonePropertiesDeserializer(item["properties"]),
  };
}

/** NSX DNS Zone Properties */
export interface WorkloadNetworkDnsZoneProperties {
  /** Display name of the DNS Zone. */
  displayName?: string;
  /** Domain names of the DNS Zone. */
  domain?: string[];
  /** DNS Server IP array of the DNS Zone. */
  dnsServerIps?: string[];
  /** Source IP of the DNS Zone. */
  sourceIp?: string;
  /** Number of DNS Services using the DNS zone. */
  dnsServices?: number;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkDnsZoneProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkDnsZonePropertiesSerializer(
  item: WorkloadNetworkDnsZoneProperties,
): any {
  return {
    displayName: item["displayName"],
    domain: !item["domain"]
      ? item["domain"]
      : item["domain"].map((p: any) => {
          return p;
        }),
    dnsServerIps: !item["dnsServerIps"]
      ? item["dnsServerIps"]
      : item["dnsServerIps"].map((p: any) => {
          return p;
        }),
    sourceIp: item["sourceIp"],
    dnsServices: item["dnsServices"],
    revision: item["revision"],
  };
}

export function workloadNetworkDnsZonePropertiesDeserializer(
  item: any,
): WorkloadNetworkDnsZoneProperties {
  return {
    displayName: item["displayName"],
    domain: !item["domain"]
      ? item["domain"]
      : item["domain"].map((p: any) => {
          return p;
        }),
    dnsServerIps: !item["dnsServerIps"]
      ? item["dnsServerIps"]
      : item["dnsServerIps"].map((p: any) => {
          return p;
        }),
    sourceIp: item["sourceIp"],
    dnsServices: item["dnsServices"],
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** Workload Network DNS Zone provisioning state */
export enum KnownWorkloadNetworkDnsZoneProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network DNS Zone provisioning state \
 * {@link KnownWorkloadNetworkDnsZoneProvisioningState} can be used interchangeably with WorkloadNetworkDnsZoneProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkDnsZoneProvisioningState = string;

/** The response of a WorkloadNetworkGateway list operation. */
export interface _WorkloadNetworkGatewayList {
  /** The WorkloadNetworkGateway items on this page */
  value: WorkloadNetworkGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkGatewayListDeserializer(item: any): _WorkloadNetworkGatewayList {
  return {
    value: workloadNetworkGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkGatewayArrayDeserializer(
  result: Array<WorkloadNetworkGateway>,
): any[] {
  return result.map((item) => {
    return workloadNetworkGatewayDeserializer(item);
  });
}

/** NSX Gateway. */
export interface WorkloadNetworkGateway extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkGatewayProperties;
}

export function workloadNetworkGatewayDeserializer(item: any): WorkloadNetworkGateway {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkGatewayPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a NSX Gateway. */
export interface WorkloadNetworkGatewayProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: WorkloadNetworkProvisioningState;
  /** Display name of the DHCP entity. */
  displayName?: string;
  /** NSX Gateway Path. */
  readonly path?: string;
}

export function workloadNetworkGatewayPropertiesDeserializer(
  item: any,
): WorkloadNetworkGatewayProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    path: item["path"],
  };
}

/** The response of a WorkloadNetworkPortMirroring list operation. */
export interface _WorkloadNetworkPortMirroringList {
  /** The WorkloadNetworkPortMirroring items on this page */
  value: WorkloadNetworkPortMirroring[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkPortMirroringListDeserializer(
  item: any,
): _WorkloadNetworkPortMirroringList {
  return {
    value: workloadNetworkPortMirroringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkPortMirroringArraySerializer(
  result: Array<WorkloadNetworkPortMirroring>,
): any[] {
  return result.map((item) => {
    return workloadNetworkPortMirroringSerializer(item);
  });
}

export function workloadNetworkPortMirroringArrayDeserializer(
  result: Array<WorkloadNetworkPortMirroring>,
): any[] {
  return result.map((item) => {
    return workloadNetworkPortMirroringDeserializer(item);
  });
}

/** NSX Port Mirroring */
export interface WorkloadNetworkPortMirroring extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkPortMirroringProperties;
}

export function workloadNetworkPortMirroringSerializer(item: WorkloadNetworkPortMirroring): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkPortMirroringPropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkPortMirroringDeserializer(item: any): WorkloadNetworkPortMirroring {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkPortMirroringPropertiesDeserializer(item["properties"]),
  };
}

/** NSX Port Mirroring Properties */
export interface WorkloadNetworkPortMirroringProperties {
  /** Display name of the port mirroring profile. */
  displayName?: string;
  /** Direction of port mirroring profile. */
  direction?: PortMirroringDirectionEnum;
  /** Source VM Group. */
  source?: string;
  /** Destination VM Group. */
  destination?: string;
  /** Port Mirroring Status. */
  readonly status?: PortMirroringStatusEnum;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkPortMirroringProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkPortMirroringPropertiesSerializer(
  item: WorkloadNetworkPortMirroringProperties,
): any {
  return {
    displayName: item["displayName"],
    direction: item["direction"],
    source: item["source"],
    destination: item["destination"],
    revision: item["revision"],
  };
}

export function workloadNetworkPortMirroringPropertiesDeserializer(
  item: any,
): WorkloadNetworkPortMirroringProperties {
  return {
    displayName: item["displayName"],
    direction: item["direction"],
    source: item["source"],
    destination: item["destination"],
    status: item["status"],
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** Port Mirroring Direction */
export enum KnownPortMirroringDirectionEnum {
  /** is ingress */
  Ingress = "INGRESS",
  /** is egress */
  Egress = "EGRESS",
  /** is bidirectional */
  Bidirectional = "BIDIRECTIONAL",
}

/**
 * Port Mirroring Direction \
 * {@link KnownPortMirroringDirectionEnum} can be used interchangeably with PortMirroringDirectionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **INGRESS**: is ingress \
 * **EGRESS**: is egress \
 * **BIDIRECTIONAL**: is bidirectional
 */
export type PortMirroringDirectionEnum = string;

/** Port Mirroring status */
export enum KnownPortMirroringStatusEnum {
  /** is success */
  Success = "SUCCESS",
  /** is failure */
  Failure = "FAILURE",
}

/**
 * Port Mirroring status \
 * {@link KnownPortMirroringStatusEnum} can be used interchangeably with PortMirroringStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUCCESS**: is success \
 * **FAILURE**: is failure
 */
export type PortMirroringStatusEnum = string;

/** Workload Network Port Mirroring provisioning state */
export enum KnownWorkloadNetworkPortMirroringProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network Port Mirroring provisioning state \
 * {@link KnownWorkloadNetworkPortMirroringProvisioningState} can be used interchangeably with WorkloadNetworkPortMirroringProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkPortMirroringProvisioningState = string;

/** The response of a WorkloadNetworkPublicIP list operation. */
export interface _WorkloadNetworkPublicIPsList {
  /** The WorkloadNetworkPublicIP items on this page */
  value: WorkloadNetworkPublicIP[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkPublicIPsListDeserializer(
  item: any,
): _WorkloadNetworkPublicIPsList {
  return {
    value: workloadNetworkPublicIPArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkPublicIPArraySerializer(
  result: Array<WorkloadNetworkPublicIP>,
): any[] {
  return result.map((item) => {
    return workloadNetworkPublicIPSerializer(item);
  });
}

export function workloadNetworkPublicIPArrayDeserializer(
  result: Array<WorkloadNetworkPublicIP>,
): any[] {
  return result.map((item) => {
    return workloadNetworkPublicIPDeserializer(item);
  });
}

/** NSX Public IP Block */
export interface WorkloadNetworkPublicIP extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkPublicIPProperties;
}

export function workloadNetworkPublicIPSerializer(item: WorkloadNetworkPublicIP): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkPublicIPPropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkPublicIPDeserializer(item: any): WorkloadNetworkPublicIP {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkPublicIPPropertiesDeserializer(item["properties"]),
  };
}

/** NSX Public IP Block Properties */
export interface WorkloadNetworkPublicIPProperties {
  /** Display name of the Public IP Block. */
  displayName?: string;
  /** Number of Public IPs requested. */
  numberOfPublicIPs?: number;
  /** CIDR Block of the Public IP Block. */
  readonly publicIPBlock?: string;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkPublicIPProvisioningState;
}

export function workloadNetworkPublicIPPropertiesSerializer(
  item: WorkloadNetworkPublicIPProperties,
): any {
  return { displayName: item["displayName"], numberOfPublicIPs: item["numberOfPublicIPs"] };
}

export function workloadNetworkPublicIPPropertiesDeserializer(
  item: any,
): WorkloadNetworkPublicIPProperties {
  return {
    displayName: item["displayName"],
    numberOfPublicIPs: item["numberOfPublicIPs"],
    publicIPBlock: item["publicIPBlock"],
    provisioningState: item["provisioningState"],
  };
}

/** Workload Network Public IP provisioning state */
export enum KnownWorkloadNetworkPublicIPProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network Public IP provisioning state \
 * {@link KnownWorkloadNetworkPublicIPProvisioningState} can be used interchangeably with WorkloadNetworkPublicIPProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkPublicIPProvisioningState = string;

/** The response of a WorkloadNetworkSegment list operation. */
export interface _WorkloadNetworkSegmentsList {
  /** The WorkloadNetworkSegment items on this page */
  value: WorkloadNetworkSegment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkSegmentsListDeserializer(item: any): _WorkloadNetworkSegmentsList {
  return {
    value: workloadNetworkSegmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkSegmentArraySerializer(
  result: Array<WorkloadNetworkSegment>,
): any[] {
  return result.map((item) => {
    return workloadNetworkSegmentSerializer(item);
  });
}

export function workloadNetworkSegmentArrayDeserializer(
  result: Array<WorkloadNetworkSegment>,
): any[] {
  return result.map((item) => {
    return workloadNetworkSegmentDeserializer(item);
  });
}

/** NSX Segment */
export interface WorkloadNetworkSegment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkSegmentProperties;
}

export function workloadNetworkSegmentSerializer(item: WorkloadNetworkSegment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkSegmentPropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkSegmentDeserializer(item: any): WorkloadNetworkSegment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkSegmentPropertiesDeserializer(item["properties"]),
  };
}

/** NSX Segment Properties */
export interface WorkloadNetworkSegmentProperties {
  /** Display name of the segment. */
  displayName?: string;
  /** Gateway which to connect segment to. */
  connectedGateway?: string;
  /** Subnet which to connect segment to. */
  subnet?: WorkloadNetworkSegmentSubnet;
  /** Port Vif which segment is associated with. */
  readonly portVif?: WorkloadNetworkSegmentPortVif[];
  /** Segment status. */
  readonly status?: SegmentStatusEnum;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkSegmentProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkSegmentPropertiesSerializer(
  item: WorkloadNetworkSegmentProperties,
): any {
  return {
    displayName: item["displayName"],
    connectedGateway: item["connectedGateway"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : workloadNetworkSegmentSubnetSerializer(item["subnet"]),
    revision: item["revision"],
  };
}

export function workloadNetworkSegmentPropertiesDeserializer(
  item: any,
): WorkloadNetworkSegmentProperties {
  return {
    displayName: item["displayName"],
    connectedGateway: item["connectedGateway"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : workloadNetworkSegmentSubnetDeserializer(item["subnet"]),
    portVif: !item["portVif"]
      ? item["portVif"]
      : workloadNetworkSegmentPortVifArrayDeserializer(item["portVif"]),
    status: item["status"],
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** Subnet configuration for segment */
export interface WorkloadNetworkSegmentSubnet {
  /** DHCP Range assigned for subnet. */
  dhcpRanges?: string[];
  /** Gateway address. */
  gatewayAddress?: string;
}

export function workloadNetworkSegmentSubnetSerializer(item: WorkloadNetworkSegmentSubnet): any {
  return {
    dhcpRanges: !item["dhcpRanges"]
      ? item["dhcpRanges"]
      : item["dhcpRanges"].map((p: any) => {
          return p;
        }),
    gatewayAddress: item["gatewayAddress"],
  };
}

export function workloadNetworkSegmentSubnetDeserializer(item: any): WorkloadNetworkSegmentSubnet {
  return {
    dhcpRanges: !item["dhcpRanges"]
      ? item["dhcpRanges"]
      : item["dhcpRanges"].map((p: any) => {
          return p;
        }),
    gatewayAddress: item["gatewayAddress"],
  };
}

export function workloadNetworkSegmentPortVifArrayDeserializer(
  result: Array<WorkloadNetworkSegmentPortVif>,
): any[] {
  return result.map((item) => {
    return workloadNetworkSegmentPortVifDeserializer(item);
  });
}

/** Ports and any VIF attached to segment. */
export interface WorkloadNetworkSegmentPortVif {
  /** Name of port or VIF attached to segment. */
  portName?: string;
}

export function workloadNetworkSegmentPortVifDeserializer(
  item: any,
): WorkloadNetworkSegmentPortVif {
  return {
    portName: item["portName"],
  };
}

/** Segment status */
export enum KnownSegmentStatusEnum {
  /** is success */
  Success = "SUCCESS",
  /** is failure */
  Failure = "FAILURE",
}

/**
 * Segment status \
 * {@link KnownSegmentStatusEnum} can be used interchangeably with SegmentStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUCCESS**: is success \
 * **FAILURE**: is failure
 */
export type SegmentStatusEnum = string;

/** Workload Network Segment provisioning state */
export enum KnownWorkloadNetworkSegmentProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network Segment provisioning state \
 * {@link KnownWorkloadNetworkSegmentProvisioningState} can be used interchangeably with WorkloadNetworkSegmentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkSegmentProvisioningState = string;

/** The response of a WorkloadNetworkVirtualMachine list operation. */
export interface _WorkloadNetworkVirtualMachinesList {
  /** The WorkloadNetworkVirtualMachine items on this page */
  value: WorkloadNetworkVirtualMachine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkVirtualMachinesListDeserializer(
  item: any,
): _WorkloadNetworkVirtualMachinesList {
  return {
    value: workloadNetworkVirtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkVirtualMachineArrayDeserializer(
  result: Array<WorkloadNetworkVirtualMachine>,
): any[] {
  return result.map((item) => {
    return workloadNetworkVirtualMachineDeserializer(item);
  });
}

/** NSX Virtual Machine */
export interface WorkloadNetworkVirtualMachine extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkVirtualMachineProperties;
}

export function workloadNetworkVirtualMachineDeserializer(
  item: any,
): WorkloadNetworkVirtualMachine {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkVirtualMachinePropertiesDeserializer(item["properties"]),
  };
}

/** NSX Virtual Machine Properties */
export interface WorkloadNetworkVirtualMachineProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: WorkloadNetworkProvisioningState;
  /** Display name of the VM. */
  displayName?: string;
  /** Virtual machine type. */
  readonly vmType?: VMTypeEnum;
}

export function workloadNetworkVirtualMachinePropertiesDeserializer(
  item: any,
): WorkloadNetworkVirtualMachineProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    vmType: item["vmType"],
  };
}

/** VM type */
export enum KnownVMTypeEnum {
  /** is regular */
  Regular = "REGULAR",
  /** is edge */
  Edge = "EDGE",
  /** is service */
  Service = "SERVICE",
}

/**
 * VM type \
 * {@link KnownVMTypeEnum} can be used interchangeably with VMTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **REGULAR**: is regular \
 * **EDGE**: is edge \
 * **SERVICE**: is service
 */
export type VMTypeEnum = string;

/** The response of a WorkloadNetworkVMGroup list operation. */
export interface _WorkloadNetworkVMGroupsList {
  /** The WorkloadNetworkVMGroup items on this page */
  value: WorkloadNetworkVMGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadNetworkVMGroupsListDeserializer(item: any): _WorkloadNetworkVMGroupsList {
  return {
    value: workloadNetworkVMGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadNetworkVMGroupArraySerializer(
  result: Array<WorkloadNetworkVMGroup>,
): any[] {
  return result.map((item) => {
    return workloadNetworkVMGroupSerializer(item);
  });
}

export function workloadNetworkVMGroupArrayDeserializer(
  result: Array<WorkloadNetworkVMGroup>,
): any[] {
  return result.map((item) => {
    return workloadNetworkVMGroupDeserializer(item);
  });
}

/** NSX VM Group */
export interface WorkloadNetworkVMGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadNetworkVMGroupProperties;
}

export function workloadNetworkVMGroupSerializer(item: WorkloadNetworkVMGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkVMGroupPropertiesSerializer(item["properties"]),
  };
}

export function workloadNetworkVMGroupDeserializer(item: any): WorkloadNetworkVMGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workloadNetworkVMGroupPropertiesDeserializer(item["properties"]),
  };
}

/** NSX VM Group Properties */
export interface WorkloadNetworkVMGroupProperties {
  /** Display name of the VM group. */
  displayName?: string;
  /** Virtual machine members of this group. */
  members?: string[];
  /** VM Group status. */
  readonly status?: VMGroupStatusEnum;
  /** The provisioning state */
  readonly provisioningState?: WorkloadNetworkVMGroupProvisioningState;
  /** NSX revision number. */
  revision?: number;
}

export function workloadNetworkVMGroupPropertiesSerializer(
  item: WorkloadNetworkVMGroupProperties,
): any {
  return {
    displayName: item["displayName"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
    revision: item["revision"],
  };
}

export function workloadNetworkVMGroupPropertiesDeserializer(
  item: any,
): WorkloadNetworkVMGroupProperties {
  return {
    displayName: item["displayName"],
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
    status: item["status"],
    provisioningState: item["provisioningState"],
    revision: item["revision"],
  };
}

/** VM group status */
export enum KnownVMGroupStatusEnum {
  /** is success */
  Success = "SUCCESS",
  /** is failure */
  Failure = "FAILURE",
}

/**
 * VM group status \
 * {@link KnownVMGroupStatusEnum} can be used interchangeably with VMGroupStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUCCESS**: is success \
 * **FAILURE**: is failure
 */
export type VMGroupStatusEnum = string;

/** Workload Network VM Group provisioning state */
export enum KnownWorkloadNetworkVMGroupProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** is building */
  Building = "Building",
  /** is deleting */
  Deleting = "Deleting",
  /** is updating */
  Updating = "Updating",
}

/**
 * Workload Network VM Group provisioning state \
 * {@link KnownWorkloadNetworkVMGroupProvisioningState} can be used interchangeably with WorkloadNetworkVMGroupProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Building**: is building \
 * **Deleting**: is deleting \
 * **Updating**: is updating
 */
export type WorkloadNetworkVMGroupProvisioningState = string;

/** status filter for the maintenance */
export enum KnownMaintenanceStatusFilter {
  /** is active */
  Active = "Active",
  /** is inactive */
  Inactive = "Inactive",
}

/**
 * status filter for the maintenance \
 * {@link KnownMaintenanceStatusFilter} can be used interchangeably with MaintenanceStatusFilter,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: is active \
 * **Inactive**: is inactive
 */
export type MaintenanceStatusFilter = string;

/** Script Output Stream type */
export enum KnownScriptOutputStreamType {
  /** is information */
  Information = "Information",
  /** is warning */
  Warning = "Warning",
  /** is output */
  Output = "Output",
  /** is error */
  Error = "Error",
}

/**
 * Script Output Stream type \
 * {@link KnownScriptOutputStreamType} can be used interchangeably with ScriptOutputStreamType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Information**: is information \
 * **Warning**: is warning \
 * **Output**: is output \
 * **Error**: is error
 */
export type ScriptOutputStreamType = string;

/** Azure VMware Solution API versions. */
export enum KnownVersions {
  /** Azure VMware Solution API version 2023-09-01. */
  V20230901 = "2023-09-01",
  /** Azure VMware Solution API version 2024-09-01. */
  V20240901 = "2024-09-01",
  /** Azure VMware Solution API version 2025-09-01. */
  V20250901 = "2025-09-01",
}
