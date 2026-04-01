// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the quota usage for a particular SKU. */
export interface QuotaUsageResult {
  /** The resource ID of the quota usage SKU endpoint for Microsoft.Search provider. */
  id?: string;
  /** The unit of measurement for the search SKU. */
  unit?: string;
  /** The currently used up value for the particular search SKU. */
  currentValue?: number;
  /** The quota limit for the particular search SKU. */
  limit?: number;
  /** The SKU name information of the current search service. */
  readonly name?: QuotaUsageResultName;
}

export function quotaUsageResultDeserializer(item: any): QuotaUsageResult {
  return {
    id: item["id"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : quotaUsageResultNameDeserializer(item["name"]),
  };
}

/** The SKU name information, including its identifier and localized display name. */
export interface QuotaUsageResultName {
  /** The SKU name supported by Azure AI Search. */
  value?: string;
  /** The localized string value for the SKU name. */
  localizedValue?: string;
}

export function quotaUsageResultNameDeserializer(item: any): QuotaUsageResultName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Contains information about an API error. */
export interface CloudError {
  /** Describes a particular API error with an error code and a message. */
  error?: CloudErrorBody;
  /** A brief description of the error that hints at what went wrong (for details/debugging information refer to the 'error.message' property). */
  message?: string;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
    message: item["message"],
  };
}

/** Describes a particular API error with an error code and a message. */
export interface CloudErrorBody {
  /** An error code that describes the error condition more precisely than an HTTP status code. Can be used to programmatically handle specific error cases. */
  code?: string;
  /** A message that describes the error in detail and provides debugging information. */
  message?: string;
  /** The target of the particular error (for example, the name of the property in error). */
  target?: string;
  /** Contains nested errors that are related to this error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** Response containing the list of offerings available in Azure AI Search, organized by region. */
export interface OfferingsListResult {
  /** The list of Azure AI Search offerings by region. */
  readonly value?: OfferingsByRegion[];
  /** The URL to get the next set of offerings, if any. */
  readonly nextLink?: string;
}

export function offeringsListResultDeserializer(item: any): OfferingsListResult {
  return {
    value: !item["value"] ? item["value"] : offeringsByRegionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function offeringsByRegionArrayDeserializer(result: Array<OfferingsByRegion>): any[] {
  return result.map((item) => {
    return offeringsByRegionDeserializer(item);
  });
}

/** Describes the Azure AI Search features and SKUs available in a specific Azure region. */
export interface OfferingsByRegion {
  /** The name of the region. */
  regionName?: string;
  /** The list of features offered in this region. */
  features?: FeatureOffering[];
  /** The list of SKUs offered in this region. */
  skus?: SkuOffering[];
}

export function offeringsByRegionDeserializer(item: any): OfferingsByRegion {
  return {
    regionName: item["regionName"],
    features: !item["features"]
      ? item["features"]
      : featureOfferingArrayDeserializer(item["features"]),
    skus: !item["skus"] ? item["skus"] : skuOfferingArrayDeserializer(item["skus"]),
  };
}

export function featureOfferingArrayDeserializer(result: Array<FeatureOffering>): any[] {
  return result.map((item) => {
    return featureOfferingDeserializer(item);
  });
}

/** Describes the availability of a specific feature in a region. */
export interface FeatureOffering {
  /** The name of the feature offered in this region. */
  name?: string;
}

export function featureOfferingDeserializer(item: any): FeatureOffering {
  return {
    name: item["name"],
  };
}

export function skuOfferingArrayDeserializer(result: Array<SkuOffering>): any[] {
  return result.map((item) => {
    return skuOfferingDeserializer(item);
  });
}

/** Describes a SKU offering with its limits in a specific region. */
export interface SkuOffering {
  /** The SKU definition. */
  sku?: Sku;
  /** The limits associated with this SKU offered in this region. */
  limits?: SkuLimits;
}

export function skuOfferingDeserializer(item: any): SkuOffering {
  return {
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    limits: !item["limits"] ? item["limits"] : skuLimitsDeserializer(item["limits"]),
  };
}

/** Defines the SKU of a search service, which determines billing rate and capacity limits. */
export interface Sku {
  /** The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities. */
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

/** The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities. */
export enum KnownSkuName {
  /** Free tier, with no SLA guarantees and a subset of the features offered on billable tiers. */
  Free = "free",
  /** Billable tier for a dedicated service having up to 3 replicas. */
  Basic = "basic",
  /** Billable tier for a dedicated service having up to 12 partitions and 12 replicas. */
  Standard = "standard",
  /** Similar to 'standard', but with more capacity per search unit. */
  Standard2 = "standard2",
  /** The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). */
  Standard3 = "standard3",
  /** Billable tier for a dedicated service that supports 1TB per partition, up to 12 partitions. */
  StorageOptimizedL1 = "storage_optimized_l1",
  /** Billable tier for a dedicated service that supports 2TB per partition, up to 12 partitions. */
  StorageOptimizedL2 = "storage_optimized_l2",
  /** Serverless tier, offering low-touch, consumption-based, and pay-as-you-go experience, with auto-scaling capabilities. */
  Serverless = "serverless",
}

/**
 * The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **free**: Free tier, with no SLA guarantees and a subset of the features offered on billable tiers. \
 * **basic**: Billable tier for a dedicated service having up to 3 replicas. \
 * **standard**: Billable tier for a dedicated service having up to 12 partitions and 12 replicas. \
 * **standard2**: Similar to 'standard', but with more capacity per search unit. \
 * **standard3**: The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). \
 * **storage_optimized_l1**: Billable tier for a dedicated service that supports 1TB per partition, up to 12 partitions. \
 * **storage_optimized_l2**: Billable tier for a dedicated service that supports 2TB per partition, up to 12 partitions. \
 * **serverless**: Serverless tier, offering low-touch, consumption-based, and pay-as-you-go experience, with auto-scaling capabilities.
 */
export type SkuName = string;

/** Describes the limits associated with a SKU offering. */
export interface SkuLimits {
  /** The maximum number of indexes available for this SKU. */
  indexes?: number;
  /** The maximum number of indexers available for this SKU. */
  indexers?: number;
  /** The maximum storage size in Gigabytes available for this SKU per partition. */
  partitionStorageInGigabytes?: number;
  /** The maximum vector storage size in Gigabytes available for this SKU per partition. */
  partitionVectorStorageInGigabytes?: number;
  /** The maximum number of search units available for this SKU. */
  searchUnits?: number;
  /** The maximum number of replicas available for this SKU. */
  replicas?: number;
  /** The maximum number of partitions available for this SKU. */
  partitions?: number;
}

export function skuLimitsDeserializer(item: any): SkuLimits {
  return {
    indexes: item["indexes"],
    indexers: item["indexers"],
    partitionStorageInGigabytes: item["partitionStorageInGigabytes"],
    partitionVectorStorageInGigabytes: item["partitionVectorStorageInGigabytes"],
    searchUnits: item["searchUnits"],
    replicas: item["replicas"],
    partitions: item["partitions"],
  };
}

/** The result of the request to list REST API operations. It contains a list of operations and a URL to get the next set of results. */
export interface _OperationListResult {
  /** The list of operations by Azure AI Search, some supported by the resource provider and others by data plane APIs. */
  readonly value?: Operation[];
  /** The URL to get the next set of operation list results, if any. */
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

/** Describes an existing private endpoint connection to the Azure AI Search service. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Describes the properties of an existing private endpoint connection to the Azure AI Search service. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
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
  };
}

/** Describes the properties of an existing private endpoint connection to the search service. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource from Microsoft.Network provider. */
  privateEndpoint?: PrivateEndpointConnectionPropertiesPrivateEndpoint;
  /** Describes the current state of an existing Azure Private Link service connection to the private endpoint. */
  privateLinkServiceConnectionState?: PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState;
  /** The group ID of the Azure resource for which the private link service is for. */
  groupId?: string;
  /** The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled. */
  provisioningState?: PrivateLinkServiceConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointConnectionPropertiesPrivateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateSerializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointConnectionPropertiesPrivateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource from Microsoft.Network provider. */
export interface PrivateEndpointConnectionPropertiesPrivateEndpoint {
  /** The resource ID of the private endpoint resource from Microsoft.Network provider. */
  id?: string;
}

export function privateEndpointConnectionPropertiesPrivateEndpointSerializer(
  item: PrivateEndpointConnectionPropertiesPrivateEndpoint,
): any {
  return { id: item["id"] };
}

export function privateEndpointConnectionPropertiesPrivateEndpointDeserializer(
  item: any,
): PrivateEndpointConnectionPropertiesPrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** Describes the current state of an existing Azure Private Link service connection to the private endpoint. */
export interface PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState {
  /** Status of the the private link service connection. Valid values are Pending, Approved, Rejected, or Disconnected. */
  status?: PrivateLinkServiceConnectionStatus;
  /** The description for the private link service connection state. */
  description?: string;
  /** A description of any extra actions that may be required. */
  actionsRequired?: string;
}

export function privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateSerializer(
  item: PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Status of the the private link service connection. Valid values are Pending, Approved, Rejected, or Disconnected. */
export type PrivateLinkServiceConnectionStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Disconnected";

/** The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled. */
export enum KnownPrivateLinkServiceConnectionProvisioningState {
  /** The private link service connection is in the process of being created along with other resources for it to be fully functional. */
  Updating = "Updating",
  /** The private link service connection is in the process of being deleted. */
  Deleting = "Deleting",
  /** The private link service connection has failed to be provisioned or deleted. */
  Failed = "Failed",
  /** The private link service connection has finished provisioning and is ready for approval. */
  Succeeded = "Succeeded",
  /** Provisioning request for the private link service connection resource has been accepted but the process of creation has not commenced yet. */
  Incomplete = "Incomplete",
  /** Provisioning request for the private link service connection resource has been canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled. \
 * {@link KnownPrivateLinkServiceConnectionProvisioningState} can be used interchangeably with PrivateLinkServiceConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: The private link service connection is in the process of being created along with other resources for it to be fully functional. \
 * **Deleting**: The private link service connection is in the process of being deleted. \
 * **Failed**: The private link service connection has failed to be provisioned or deleted. \
 * **Succeeded**: The private link service connection has finished provisioning and is ready for approval. \
 * **Incomplete**: Provisioning request for the private link service connection resource has been accepted but the process of creation has not commenced yet. \
 * **Canceled**: Provisioning request for the private link service connection resource has been canceled.
 */
export type PrivateLinkServiceConnectionProvisioningState = string;

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

/** Response containing a list of private endpoint connections. */
export interface _PrivateEndpointConnectionListResult {
  /** The list of private endpoint connections. */
  readonly value?: PrivateEndpointConnection[];
  /** Request URL that can be used to query next page of private endpoint connections. Returned when the total number of requested private endpoint connections exceed maximum page size. */
  readonly nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
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

/** Describes a shared private link resource managed by the Azure AI Search service. */
export interface SharedPrivateLinkResource extends ProxyResource {
  /** Describes the properties of a shared private link resource managed by the Azure AI Search service. */
  properties?: SharedPrivateLinkResourceProperties;
}

export function sharedPrivateLinkResourceSerializer(item: SharedPrivateLinkResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sharedPrivateLinkResourcePropertiesSerializer(item["properties"]),
  };
}

export function sharedPrivateLinkResourceDeserializer(item: any): SharedPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sharedPrivateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of an existing shared private link resource managed by the Azure AI Search service. */
export interface SharedPrivateLinkResourceProperties {
  /** The resource ID of the resource the shared private link resource is for. */
  privateLinkResourceId?: string;
  /** The group ID from the provider of resource the shared private link resource is for. */
  groupId?: string;
  /** The message for requesting approval of the shared private link resource. */
  requestMessage?: string;
  /** Optional. Can be used to specify the Azure Resource Manager location of the resource for which a shared private link is being created. This is only required for those resources whose DNS configuration are regional (such as Azure Kubernetes Service). */
  resourceRegion?: string;
  /** Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected. */
  status?: SharedPrivateLinkResourceStatus;
  /** The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete. */
  provisioningState?: SharedPrivateLinkResourceProvisioningState;
}

export function sharedPrivateLinkResourcePropertiesSerializer(
  item: SharedPrivateLinkResourceProperties,
): any {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    resourceRegion: item["resourceRegion"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

export function sharedPrivateLinkResourcePropertiesDeserializer(
  item: any,
): SharedPrivateLinkResourceProperties {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    resourceRegion: item["resourceRegion"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

/** Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected. */
export enum KnownSharedPrivateLinkResourceStatus {
  /** The shared private link resource has been created and is pending approval. */
  Pending = "Pending",
  /** The shared private link resource is approved and is ready for use. */
  Approved = "Approved",
  /** The shared private link resource has been rejected and cannot be used. */
  Rejected = "Rejected",
  /** The shared private link resource has been removed from the service. */
  Disconnected = "Disconnected",
}

/**
 * Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected. \
 * {@link KnownSharedPrivateLinkResourceStatus} can be used interchangeably with SharedPrivateLinkResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The shared private link resource has been created and is pending approval. \
 * **Approved**: The shared private link resource is approved and is ready for use. \
 * **Rejected**: The shared private link resource has been rejected and cannot be used. \
 * **Disconnected**: The shared private link resource has been removed from the service.
 */
export type SharedPrivateLinkResourceStatus = string;

/** The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete. */
export enum KnownSharedPrivateLinkResourceProvisioningState {
  /** The shared private link resource is in the process of being created along with other resources for it to be fully functional. */
  Updating = "Updating",
  /** The shared private link resource is in the process of being deleted. */
  Deleting = "Deleting",
  /** The shared private link resource has failed to be provisioned or deleted. */
  Failed = "Failed",
  /** The shared private link resource has finished provisioning and is ready for approval. */
  Succeeded = "Succeeded",
  /** Provisioning request for the shared private link resource has been accepted but the process of creation has not commenced yet. */
  Incomplete = "Incomplete",
}

/**
 * The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete. \
 * {@link KnownSharedPrivateLinkResourceProvisioningState} can be used interchangeably with SharedPrivateLinkResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: The shared private link resource is in the process of being created along with other resources for it to be fully functional. \
 * **Deleting**: The shared private link resource is in the process of being deleted. \
 * **Failed**: The shared private link resource has failed to be provisioned or deleted. \
 * **Succeeded**: The shared private link resource has finished provisioning and is ready for approval. \
 * **Incomplete**: Provisioning request for the shared private link resource has been accepted but the process of creation has not commenced yet.
 */
export type SharedPrivateLinkResourceProvisioningState = string;

/** Response containing a list of shared private link resources. */
export interface _SharedPrivateLinkResourceListResult {
  /** The list of shared private link resources. */
  readonly value?: SharedPrivateLinkResource[];
  /** The URL to get the next set of shared private link resources, if there are any. */
  nextLink?: string;
}

export function _sharedPrivateLinkResourceListResultDeserializer(
  item: any,
): _SharedPrivateLinkResourceListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sharedPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedPrivateLinkResourceArraySerializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceSerializer(item);
  });
}

export function sharedPrivateLinkResourceArrayDeserializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceDeserializer(item);
  });
}

/** Network security perimeter (NSP) configuration resource */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Network security configuration properties. */
  properties?: NetworkSecurityPerimeterConfigurationProperties;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Network security configuration properties. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of provisioning issues, if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  resourceAssociation?: ResourceAssociation;
  profile?: NetworkSecurityProfile;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityProfileDeserializer(item["profile"]),
  };
}

/** Provisioning state of a network security perimeter configuration that is being created or updated. */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Accepted */
  Accepted = "Accepted",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of a network security perimeter configuration that is being created or updated. \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Accepted** \
 * **Failed** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes a provisioning issue for a network security perimeter configuration */
export interface ProvisioningIssue {
  /** Name of the issue */
  readonly name?: string;
  readonly properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules */
export interface ProvisioningIssueProperties {
  /** Type of issue */
  readonly issueType?: IssueType;
  /** Severity of the issue. */
  readonly severity?: Severity;
  /** Description of the issue */
  readonly description?: string;
  /** Fully qualified resource IDs of suggested resources that can be associated to the network security perimeter (NSP) to remediate the issue. */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the network security profile (NSP) to remediate the issue. */
  readonly suggestedAccessRules?: AccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : accessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

/** Type of issue */
export enum KnownIssueType {
  /** Unknown issue type */
  Unknown = "Unknown",
  /** An error occurred while applying the network security perimeter (NSP) configuration. */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
  /** A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. */
  MissingPerimeterConfiguration = "MissingPerimeterConfiguration",
  /** An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP. */
  MissingIdentityConfiguration = "MissingIdentityConfiguration",
}

/**
 * Type of issue \
 * {@link KnownIssueType} can be used interchangeably with IssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown issue type \
 * **ConfigurationPropagationFailure**: An error occurred while applying the network security perimeter (NSP) configuration. \
 * **MissingPerimeterConfiguration**: A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. \
 * **MissingIdentityConfiguration**: An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP.
 */
export type IssueType = string;

/** Severity of the issue. */
export enum KnownSeverity {
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * Severity of the issue. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning** \
 * **Error**
 */
export type Severity = string;

export function accessRuleArrayDeserializer(result: Array<AccessRule>): any[] {
  return result.map((item) => {
    return accessRuleDeserializer(item);
  });
}

/** Access rule in a network security perimeter configuration profile */
export interface AccessRule {
  /** Name of the access rule */
  name?: string;
  properties?: AccessRuleProperties;
}

export function accessRuleDeserializer(item: any): AccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : accessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface AccessRuleProperties {
  direction?: AccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: AccessRulePropertiesSubscriptionsItem[];
  /** Network security perimeters for inbound rules */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** Fully qualified domain names (FQDN) for outbound rules */
  fullyQualifiedDomainNames?: string[];
  /** Email addresses for outbound rules */
  emailAddresses?: string[];
  /** Phone numbers for outbound rules */
  phoneNumbers?: string[];
}

export function accessRulePropertiesDeserializer(item: any): AccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : accessRulePropertiesSubscriptionsItemArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownAccessRuleDirection {
  /** Applies to inbound network traffic to the secured resources. */
  Inbound = "Inbound",
  /** Applies to outbound network traffic from the secured resources */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownAccessRuleDirection} can be used interchangeably with AccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Applies to inbound network traffic to the secured resources. \
 * **Outbound**: Applies to outbound network traffic from the secured resources
 */
export type AccessRuleDirection = string;

export function accessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<AccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return accessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Network security perimeter configuration */
export interface AccessRulePropertiesSubscriptionsItem {
  /** The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000') */
  id?: string;
}

export function accessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): AccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Information about a network security perimeter (NSP) */
export interface NetworkSecurityPerimeter {
  /** Fully qualified Azure resource ID of the NSP resource */
  id?: string;
  /** Universal unique ID (UUID) of the network security perimeter */
  perimeterGuid?: string;
  /** Location of the network security perimeter */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Information about resource association */
export interface ResourceAssociation {
  /** Name of the resource association */
  name?: string;
  accessMode?: ResourceAssociationAccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access mode of the resource association */
export enum KnownResourceAssociationAccessMode {
  /** Enforced access mode - traffic to the resource that failed access checks is blocked */
  Enforced = "Enforced",
  /** Learning access mode - traffic to the resource is enabled for analysis but not blocked */
  Learning = "Learning",
  /** Audit access mode - traffic to the resource that fails access checks is logged but not blocked */
  Audit = "Audit",
}

/**
 * Access mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enforced**: Enforced access mode - traffic to the resource that failed access checks is blocked \
 * **Learning**: Learning access mode - traffic to the resource is enabled for analysis but not blocked \
 * **Audit**: Audit access mode - traffic to the resource that fails access checks is logged but not blocked
 */
export type ResourceAssociationAccessMode = string;

/** Network security perimeter configuration profile */
export interface NetworkSecurityProfile {
  /** Name of the profile */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: number;
  /** List of Access Rules */
  accessRules?: AccessRule[];
  /** Current diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** List of log categories that are enabled */
  enabledLogCategories?: string[];
}

export function networkSecurityProfileDeserializer(item: any): NetworkSecurityProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : accessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a NetworkSecurityPerimeterConfiguration list operation. */
export interface _NetworkSecurityPerimeterConfigurationListResult {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationListResult {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Input of check name availability API. */
export interface CheckNameAvailabilityInput {
  /** The search service name to validate. Search service names must only contain lowercase letters, digits or dashes, cannot use dash as the first two or last one characters, cannot contain consecutive dashes, and must be between 2 and 60 characters in length. */
  name: string;
  /** The type of the resource whose name is to be validated. This value must always be 'searchServices'. */
  type: "searchServices";
}

export function checkNameAvailabilityInputSerializer(item: CheckNameAvailabilityInput): any {
  return { name: item["name"], type: item["type"] };
}

/** Output of check name availability API. */
export interface CheckNameAvailabilityOutput {
  /** A value indicating whether the name is available. */
  readonly isNameAvailable?: boolean;
  /** The reason why the name is not available. 'Invalid' indicates the name provided does not match the naming requirements (incorrect length, unsupported characters, etc.). 'AlreadyExists' indicates that the name is already in use and is therefore unavailable. */
  readonly reason?: UnavailableNameReason;
  /** A message that explains why the name is invalid and provides resource naming requirements. Available only if 'Invalid' is returned in the 'reason' property. */
  readonly message?: string;
}

export function checkNameAvailabilityOutputDeserializer(item: any): CheckNameAvailabilityOutput {
  return {
    isNameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason why the name is not available. 'Invalid' indicates the name provided does not match the naming requirements (incorrect length, unsupported characters, etc.). 'AlreadyExists' indicates that the name is already in use and is therefore unavailable. */
export enum KnownUnavailableNameReason {
  /** The search service name doesn't match naming requirements. */
  Invalid = "Invalid",
  /** The search service name is already assigned to a different search service. */
  AlreadyExists = "AlreadyExists",
}

/**
 * The reason why the name is not available. 'Invalid' indicates the name provided does not match the naming requirements (incorrect length, unsupported characters, etc.). 'AlreadyExists' indicates that the name is already in use and is therefore unavailable. \
 * {@link KnownUnavailableNameReason} can be used interchangeably with UnavailableNameReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: The search service name doesn't match naming requirements. \
 * **AlreadyExists**: The search service name is already assigned to a different search service.
 */
export type UnavailableNameReason = string;

/** Describes an Azure AI Search service and its current state. */
export interface SearchService extends TrackedResource {
  /** The SKU of the search service, which determines price tier and capacity limits. This property is required when creating a new search service. */
  sku?: Sku;
  /** The identity of the resource. */
  identity?: Identity;
  /** The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU. */
  replicaCount?: number;
  /** The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3. */
  partitionCount?: number;
  /** The endpoint of the Azure AI Search service. */
  endpoint?: string;
  /** Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'. */
  hostingMode?: HostingMode;
  /** Configure this property to support the search service using either the Default Compute or Azure Confidential Compute. */
  computeType?: ComputeType;
  /** This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned. */
  readonly status?: SearchServiceStatus;
  /** The details of the search service status. */
  readonly statusDetails?: string;
  /** The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up. */
  readonly provisioningState?: ProvisioningState;
  /** Network specific rules that determine how the Azure AI Search service may be reached. */
  networkRuleSet?: NetworkRuleSet;
  /** A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future. */
  dataExfiltrationProtections?: SearchDataExfiltrationProtection[];
  /** Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service. */
  encryptionWithCmk?: EncryptionWithCmk;
  /** When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined. */
  disableLocalAuth?: boolean;
  /** Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true. */
  authOptions?: DataPlaneAuthOptions;
  /** Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  semanticSearch?: SearchSemanticSearch;
  /** Specifies the billing plan for agentic retrieval on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  knowledgeRetrieval?: KnowledgeRetrieval;
  /** The list of private endpoint connections to the Azure AI Search service. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The list of shared private link resources managed by the Azure AI Search service. */
  readonly sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** A system generated property representing the service's etag that can be for optimistic concurrency control during updates. */
  readonly eTag?: string;
  /** Indicates if the search service has an upgrade available. */
  upgradeAvailable?: UpgradeAvailable;
  /** The date and time the search service was last upgraded. This field will be null until the service gets upgraded for the first time. */
  readonly serviceUpgradedAt?: Date;
}

export function searchServiceSerializer(item: SearchService): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "replicaCount",
      "partitionCount",
      "endpoint",
      "hostingMode",
      "computeType",
      "publicNetworkAccess",
      "networkRuleSet",
      "dataExfiltrationProtections",
      "encryptionWithCmk",
      "disableLocalAuth",
      "authOptions",
      "semanticSearch",
      "knowledgeRetrieval",
      "upgradeAvailable",
    ])
      ? undefined
      : _searchServicePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function searchServiceDeserializer(item: any): SearchService {
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
    ...(!item["properties"]
      ? item["properties"]
      : _searchServicePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties of the search service. */
export interface SearchServiceProperties {
  /** The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU. */
  replicaCount?: number;
  /** The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3. */
  partitionCount?: number;
  /** The endpoint of the Azure AI Search service. */
  endpoint?: string;
  /** Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'. */
  hostingMode?: HostingMode;
  /** Configure this property to support the search service using either the Default Compute or Azure Confidential Compute. */
  computeType?: ComputeType;
  /** This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned. */
  readonly status?: SearchServiceStatus;
  /** The details of the search service status. */
  readonly statusDetails?: string;
  /** The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up. */
  readonly provisioningState?: ProvisioningState;
  /** Network specific rules that determine how the Azure AI Search service may be reached. */
  networkRuleSet?: NetworkRuleSet;
  /** A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future. */
  dataExfiltrationProtections?: SearchDataExfiltrationProtection[];
  /** Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service. */
  encryptionWithCmk?: EncryptionWithCmk;
  /** When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined. */
  disableLocalAuth?: boolean;
  /** Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true. */
  authOptions?: DataPlaneAuthOptions;
  /** Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  semanticSearch?: SearchSemanticSearch;
  /** Specifies the billing plan for agentic retrieval on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  knowledgeRetrieval?: KnowledgeRetrieval;
  /** The list of private endpoint connections to the Azure AI Search service. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The list of shared private link resources managed by the Azure AI Search service. */
  readonly sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** A system generated property representing the service's etag that can be for optimistic concurrency control during updates. */
  readonly eTag?: string;
  /** Indicates if the search service has an upgrade available. */
  upgradeAvailable?: UpgradeAvailable;
  /** The date and time the search service was last upgraded. This field will be null until the service gets upgraded for the first time. */
  readonly serviceUpgradedAt?: Date;
}

export function searchServicePropertiesSerializer(item: SearchServiceProperties): any {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkSerializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsSerializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    upgradeAvailable: item["upgradeAvailable"],
  };
}

export function searchServicePropertiesDeserializer(item: any): SearchServiceProperties {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    provisioningState: item["provisioningState"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetDeserializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkDeserializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsDeserializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    eTag: item["eTag"],
    upgradeAvailable: item["upgradeAvailable"],
    serviceUpgradedAt: !item["serviceUpgradedAt"]
      ? item["serviceUpgradedAt"]
      : new Date(item["serviceUpgradedAt"]),
  };
}

/** Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'. */
export type HostingMode = "Default" | "HighDensity";

/** Configure this property to support the search service using either the Default Compute or Azure Confidential Compute. */
export enum KnownComputeType {
  /** Create the service with the Default Compute. */
  Default = "Default",
  /** Create the dedicated service with Azure Confidential Compute. */
  Confidential = "Confidential",
}

/**
 * Configure this property to support the search service using either the Default Compute or Azure Confidential Compute. \
 * {@link KnownComputeType} can be used interchangeably with ComputeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Create the service with the Default Compute. \
 * **Confidential**: Create the dedicated service with Azure Confidential Compute.
 */
export type ComputeType = string;

/** This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method. */
export enum KnownPublicNetworkAccess {
  /** The search service is accessible from traffic originating from the public internet. */
  Enabled = "Enabled",
  /** The search service is not accessible from traffic originating from the public internet. Access is only permitted over approved private endpoint connections. */
  Disabled = "Disabled",
  /** The network security perimeter configuration rules allow or disallow public network access to the resource. Requires an associated network security perimeter. */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The search service is accessible from traffic originating from the public internet. \
 * **Disabled**: The search service is not accessible from traffic originating from the public internet. Access is only permitted over approved private endpoint connections. \
 * **SecuredByPerimeter**: The network security perimeter configuration rules allow or disallow public network access to the resource. Requires an associated network security perimeter.
 */
export type PublicNetworkAccess = string;
/** The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned. */
export type SearchServiceStatus =
  | "running"
  | "provisioning"
  | "deleting"
  | "degraded"
  | "disabled"
  | "error"
  | "stopped";
/** The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up. */
export type ProvisioningState = "succeeded" | "provisioning" | "failed";

/** Network specific rules that determine how the Azure AI Search service may be reached. */
export interface NetworkRuleSet {
  /** A list of IP restriction rules that defines the inbound network(s) with allowing access to the search service endpoint. At the meantime, all other public IP networks are blocked by the firewall. These restriction rules are applied only when the 'publicNetworkAccess' of the search service is 'enabled'; otherwise, traffic over public interface is not allowed even with any public IP rules, and private endpoint connections would be the exclusive access method. */
  ipRules?: IpRule[];
  /** Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section. */
  bypass?: SearchBypass;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
    bypass: item["bypass"],
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
    bypass: item["bypass"],
  };
}

export function ipRuleArraySerializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** The IP restriction rule of the Azure AI Search service. */
export interface IpRule {
  /** Value corresponding to a single IPv4 address (eg., 123.1.2.3) or an IP range in CIDR format (eg., 123.1.2.3/24) to be allowed. */
  value?: string;
}

export function ipRuleSerializer(item: IpRule): any {
  return { value: item["value"] };
}

export function ipRuleDeserializer(item: any): IpRule {
  return {
    value: item["value"],
  };
}

/** Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section. */
export enum KnownSearchBypass {
  /** Indicates that no origin can bypass the rules defined in the 'ipRules' section. This is the default. */
  None = "None",
  /** Indicates that requests originating from the Azure Portal can bypass the rules defined in the 'ipRules' section. */
  AzurePortal = "AzurePortal",
  /** Indicates that requests originating from Azure trusted services can bypass the rules defined in the 'ipRules' section. */
  AzureServices = "AzureServices",
}

/**
 * Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section. \
 * {@link KnownSearchBypass} can be used interchangeably with SearchBypass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Indicates that no origin can bypass the rules defined in the 'ipRules' section. This is the default. \
 * **AzurePortal**: Indicates that requests originating from the Azure Portal can bypass the rules defined in the 'ipRules' section. \
 * **AzureServices**: Indicates that requests originating from Azure trusted services can bypass the rules defined in the 'ipRules' section.
 */
export type SearchBypass = string;

/** A specific data exfiltration scenario that is disabled for the service. */
export enum KnownSearchDataExfiltrationProtection {
  /** Indicates that all data exfiltration scenarios are disabled. */
  BlockAll = "BlockAll",
}

/**
 * A specific data exfiltration scenario that is disabled for the service. \
 * {@link KnownSearchDataExfiltrationProtection} can be used interchangeably with SearchDataExfiltrationProtection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlockAll**: Indicates that all data exfiltration scenarios are disabled.
 */
export type SearchDataExfiltrationProtection = string;

/** Describes a policy that determines how resources within the search service are to be encrypted with customer managed keys. */
export interface EncryptionWithCmk {
  /** Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key. */
  enforcement?: SearchEncryptionWithCmk;
  /** Returns the status of search service compliance with respect to non-CMK-encrypted objects. If a service has more than one unencrypted object, and enforcement is enabled, the service is marked as noncompliant. */
  readonly encryptionComplianceStatus?: SearchEncryptionComplianceStatus;
  /** Describes the customer-managed key configuration for encrypting the search service. */
  serviceLevelEncryptionKey?: SearchResourceEncryptionKey;
}

export function encryptionWithCmkSerializer(item: EncryptionWithCmk): any {
  return {
    enforcement: item["enforcement"],
    serviceLevelEncryptionKey: !item["serviceLevelEncryptionKey"]
      ? item["serviceLevelEncryptionKey"]
      : searchResourceEncryptionKeySerializer(item["serviceLevelEncryptionKey"]),
  };
}

export function encryptionWithCmkDeserializer(item: any): EncryptionWithCmk {
  return {
    enforcement: item["enforcement"],
    encryptionComplianceStatus: item["encryptionComplianceStatus"],
    serviceLevelEncryptionKey: !item["serviceLevelEncryptionKey"]
      ? item["serviceLevelEncryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["serviceLevelEncryptionKey"]),
  };
}

/** Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key. */
export type SearchEncryptionWithCmk = "Disabled" | "Enabled" | "Unspecified";
/** Returns the status of search service compliance with respect to non-CMK-encrypted objects. If a service has more than one unencrypted object, and enforcement is enabled, the service is marked as noncompliant. */
export type SearchEncryptionComplianceStatus = "Compliant" | "NonCompliant";

/** A customer-managed encryption key in Azure Key Vault. Keys that you create and manage can be used to encrypt or decrypt data-at-rest, such as indexes and synonym maps. */
export interface SearchResourceEncryptionKey {
  /** The name of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyName?: string;
  /** The version of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyVersion?: string;
  /** The URI of your Azure Key Vault, also referred to as DNS name, that contains the key to be used to encrypt your data at rest. An example URI might be `https://my-keyvault-name.vault.azure.net`. */
  vaultUri?: string;
  /** An explicit managed identity to use for this encryption key. If not specified and the access credentials property is null, the system-assigned managed identity is used. On update to the resource, if the explicit identity is unspecified, it remains unchanged. If "none" is specified, the value of this property is cleared. */
  identity?: DataIdentityUnion;
  /** Optional Azure Active Directory credentials used for accessing your Azure Key Vault. Not required if using managed identity instead. */
  accessCredentials?: AzureActiveDirectoryApplicationCredentials;
}

export function searchResourceEncryptionKeySerializer(item: SearchResourceEncryptionKey): any {
  return {
    keyVaultKeyName: item["keyName"],
    keyVaultKeyVersion: item["keyVersion"],
    keyVaultUri: item["vaultUri"],
    identity: !item["identity"] ? item["identity"] : dataIdentityUnionSerializer(item["identity"]),
    accessCredentials: !item["accessCredentials"]
      ? item["accessCredentials"]
      : azureActiveDirectoryApplicationCredentialsSerializer(item["accessCredentials"]),
  };
}

export function searchResourceEncryptionKeyDeserializer(item: any): SearchResourceEncryptionKey {
  return {
    keyName: item["keyVaultKeyName"],
    keyVersion: item["keyVaultKeyVersion"],
    vaultUri: item["keyVaultUri"],
    identity: !item["identity"]
      ? item["identity"]
      : dataIdentityUnionDeserializer(item["identity"]),
    accessCredentials: !item["accessCredentials"]
      ? item["accessCredentials"]
      : azureActiveDirectoryApplicationCredentialsDeserializer(item["accessCredentials"]),
  };
}

/** Abstract base type for data identities. */
export interface DataIdentity {
  /** A URI fragment specifying the type of identity. */
  /** The discriminator possible values: #Microsoft.Azure.Search.DataNoneIdentity, #Microsoft.Azure.Search.DataUserAssignedIdentity */
  odataType: string;
}

export function dataIdentitySerializer(item: DataIdentity): any {
  return { "@odata.type": item["odataType"] };
}

export function dataIdentityDeserializer(item: any): DataIdentity {
  return {
    odataType: item["@odata.type"],
  };
}

/** Alias for DataIdentityUnion */
export type DataIdentityUnion = DataNoneIdentity | DataUserAssignedIdentity | DataIdentity;

export function dataIdentityUnionSerializer(item: DataIdentityUnion): any {
  switch (item.odataType) {
    case "#Microsoft.Azure.Search.DataNoneIdentity":
      return dataNoneIdentitySerializer(item as DataNoneIdentity);

    case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
      return dataUserAssignedIdentitySerializer(item as DataUserAssignedIdentity);

    default:
      return dataIdentitySerializer(item);
  }
}

export function dataIdentityUnionDeserializer(item: any): DataIdentityUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.DataNoneIdentity":
      return dataNoneIdentityDeserializer(item as DataNoneIdentity);

    case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
      return dataUserAssignedIdentityDeserializer(item as DataUserAssignedIdentity);

    default:
      return dataIdentityDeserializer(item);
  }
}

/** Clears the identity property. */
export interface DataNoneIdentity extends DataIdentity {
  odataType: "#Microsoft.Azure.Search.DataNoneIdentity";
}

export function dataNoneIdentitySerializer(item: DataNoneIdentity): any {
  return { "@odata.type": item["odataType"] };
}

export function dataNoneIdentityDeserializer(item: any): DataNoneIdentity {
  return {
    odataType: item["@odata.type"],
  };
}

/** Specifies the user assigned identity to use. */
export interface DataUserAssignedIdentity extends DataIdentity {
  odataType: "#Microsoft.Azure.Search.DataUserAssignedIdentity";
  /** The fully qualified Azure resource Id of a user assigned managed identity typically in the form "/subscriptions/12345678-1234-1234-1234-1234567890ab/resourceGroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId" that should have been assigned to the search service. */
  userAssignedIdentity: string;
  /** Optional for Multi-tenant User-Assigned Managed Identity CMK Support: The client id (as a UUID) of the multi-tenant App Registration that has been configured to federate with the userAssignedIdentity. */
  federatedIdentityClientId?: string;
}

export function dataUserAssignedIdentitySerializer(item: DataUserAssignedIdentity): any {
  return {
    "@odata.type": item["odataType"],
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedIdentityClientId: item["federatedIdentityClientId"],
  };
}

export function dataUserAssignedIdentityDeserializer(item: any): DataUserAssignedIdentity {
  return {
    odataType: item["@odata.type"],
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedIdentityClientId: item["federatedIdentityClientId"],
  };
}

/** Describes the Azure Active Directory application credentials required to access an Azure Key Vault. */
export interface AzureActiveDirectoryApplicationCredentials {
  /** The application (client) ID of an App Registration in the tenant. */
  applicationId?: string;
  /** An AAD client secret that was generated for the App Registration used to authenticate with Azure Key Vault. */
  applicationSecret?: string;
}

export function azureActiveDirectoryApplicationCredentialsSerializer(
  item: AzureActiveDirectoryApplicationCredentials,
): any {
  return { applicationId: item["applicationId"], applicationSecret: item["applicationSecret"] };
}

export function azureActiveDirectoryApplicationCredentialsDeserializer(
  item: any,
): AzureActiveDirectoryApplicationCredentials {
  return {
    applicationId: item["applicationId"],
    applicationSecret: item["applicationSecret"],
  };
}

/** Defines the options for how the search service authenticates a data plane request. This cannot be set if 'disableLocalAuth' is set to true. */
export interface DataPlaneAuthOptions {
  /** Indicates that only the API key can be used for authentication. */
  apiKeyOnly?: any;
  /** Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication. */
  aadOrApiKey?: DataPlaneAadOrApiKeyAuthOption;
}

export function dataPlaneAuthOptionsSerializer(item: DataPlaneAuthOptions): any {
  return {
    apiKeyOnly: item["apiKeyOnly"],
    aadOrApiKey: !item["aadOrApiKey"]
      ? item["aadOrApiKey"]
      : dataPlaneAadOrApiKeyAuthOptionSerializer(item["aadOrApiKey"]),
  };
}

export function dataPlaneAuthOptionsDeserializer(item: any): DataPlaneAuthOptions {
  return {
    apiKeyOnly: item["apiKeyOnly"],
    aadOrApiKey: !item["aadOrApiKey"]
      ? item["aadOrApiKey"]
      : dataPlaneAadOrApiKeyAuthOptionDeserializer(item["aadOrApiKey"]),
  };
}

/** Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication. */
export interface DataPlaneAadOrApiKeyAuthOption {
  /** Describes what response the data plane API of a search service would send for requests that failed authentication. */
  aadAuthFailureMode?: AadAuthFailureMode;
}

export function dataPlaneAadOrApiKeyAuthOptionSerializer(
  item: DataPlaneAadOrApiKeyAuthOption,
): any {
  return { aadAuthFailureMode: item["aadAuthFailureMode"] };
}

export function dataPlaneAadOrApiKeyAuthOptionDeserializer(
  item: any,
): DataPlaneAadOrApiKeyAuthOption {
  return {
    aadAuthFailureMode: item["aadAuthFailureMode"],
  };
}

/** Describes what response the data plane API of a search service would send for requests that failed authentication. */
export type AadAuthFailureMode = "http403" | "http401WithBearerChallenge";

/** Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
export enum KnownSearchSemanticSearch {
  /** Indicates that semantic reranker is disabled for the search service. */
  Disabled = "disabled",
  /** Enables semantic reranker on a search service and indicates that it is to be used within the limits of the free plan. The free plan would cap the volume of semantic ranking requests and is offered at no extra charge. This is the default for newly provisioned search services. This is the default. */
  Free = "free",
  /** Enables semantic reranker on a search service as a billable feature after the free quota is exhausted, with higher throughput and volume of semantically reranked queries. */
  Standard = "standard",
}

/**
 * Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. \
 * {@link KnownSearchSemanticSearch} can be used interchangeably with SearchSemanticSearch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **disabled**: Indicates that semantic reranker is disabled for the search service. \
 * **free**: Enables semantic reranker on a search service and indicates that it is to be used within the limits of the free plan. The free plan would cap the volume of semantic ranking requests and is offered at no extra charge. This is the default for newly provisioned search services. This is the default. \
 * **standard**: Enables semantic reranker on a search service as a billable feature after the free quota is exhausted, with higher throughput and volume of semantically reranked queries.
 */
export type SearchSemanticSearch = string;

/** Specifies the billing plan for agentic retrieval on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
export enum KnownKnowledgeRetrieval {
  /** Enables knowledge retrieval on a search service and indicates that it is to be used within the limits of the free plan. The free plan would cap the volume of knowledge retrieval requests and is offered at no extra charge. */
  Free = "free",
  /** Enables knowledge retrieval on a search service as a billable feature after the free quota is exhausted, with higher throughput and volume of knowledge retrieval requests. */
  Standard = "standard",
}

/**
 * Specifies the billing plan for agentic retrieval on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. \
 * {@link KnownKnowledgeRetrieval} can be used interchangeably with KnowledgeRetrieval,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **free**: Enables knowledge retrieval on a search service and indicates that it is to be used within the limits of the free plan. The free plan would cap the volume of knowledge retrieval requests and is offered at no extra charge. \
 * **standard**: Enables knowledge retrieval on a search service as a billable feature after the free quota is exhausted, with higher throughput and volume of knowledge retrieval requests.
 */
export type KnowledgeRetrieval = string;

/** Indicates if the dedicated search service has an upgrade available. */
export enum KnownUpgradeAvailable {
  /** An upgrade is currently not available for the dedicated service. */
  NotAvailable = "notAvailable",
  /** There is an upgrade available for the dedicated service. */
  Available = "available",
}

/**
 * Indicates if the dedicated search service has an upgrade available. \
 * {@link KnownUpgradeAvailable} can be used interchangeably with UpgradeAvailable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **notAvailable**: An upgrade is currently not available for the dedicated service. \
 * **available**: There is an upgrade available for the dedicated service.
 */
export type UpgradeAvailable = string;

/** Details about the search service identity. A null value indicates that the search service has no identity assigned. */
export interface Identity {
  /** The principal ID of the system-assigned identity of the search service. */
  readonly principalId?: string;
  /** The tenant ID of the system-assigned identity of the search service. */
  readonly tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service. */
  type: IdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service. */
export enum KnownIdentityType {
  /** Indicates that any identity associated with the search service needs to be removed. */
  None = "None",
  /** Indicates that system-assigned identity for the search service will be enabled. */
  SystemAssigned = "SystemAssigned",
  /** Indicates that one or more user assigned identities will be assigned to the search service. */
  UserAssigned = "UserAssigned",
  /** Indicates that system-assigned identity for the search service will be enabled along with the assignment of one or more user assigned identities. */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Indicates that any identity associated with the search service needs to be removed. \
 * **SystemAssigned**: Indicates that system-assigned identity for the search service will be enabled. \
 * **UserAssigned**: Indicates that one or more user assigned identities will be assigned to the search service. \
 * **SystemAssigned, UserAssigned**: Indicates that system-assigned identity for the search service will be enabled along with the assignment of one or more user assigned identities.
 */
export type IdentityType = string;

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

/** The parameters used to update an Azure AI Search service. */
export interface SearchServiceUpdate extends Resource {
  /** The SKU of the search service, which determines price tier and capacity limits. This property is required when creating a new search service. */
  sku?: Sku;
  /** The geographic location of the resource. This must be one of the supported and registered Azure geo regions (for example, West US, East US, Southeast Asia, and so forth). This property is required when creating a new resource. */
  location?: string;
  /** Tags to help categorize the resource in the Azure portal. */
  tags?: Record<string, string>;
  /** Details about the search service identity. A null value indicates that the search service has no identity assigned. */
  identity?: Identity;
  /** The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU. */
  replicaCount?: number;
  /** The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3. */
  partitionCount?: number;
  /** The endpoint of the Azure AI Search service. */
  endpoint?: string;
  /** Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'. */
  hostingMode?: HostingMode;
  /** Configure this property to support the search service using either the Default Compute or Azure Confidential Compute. */
  computeType?: ComputeType;
  /** This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned. */
  readonly status?: SearchServiceStatus;
  /** The details of the search service status. */
  readonly statusDetails?: string;
  /** The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up. */
  readonly provisioningState?: ProvisioningState;
  /** Network specific rules that determine how the Azure AI Search service may be reached. */
  networkRuleSet?: NetworkRuleSet;
  /** A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future. */
  dataExfiltrationProtections?: SearchDataExfiltrationProtection[];
  /** Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service. */
  encryptionWithCmk?: EncryptionWithCmk;
  /** When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined. */
  disableLocalAuth?: boolean;
  /** Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true. */
  authOptions?: DataPlaneAuthOptions;
  /** Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  semanticSearch?: SearchSemanticSearch;
  /** Specifies the billing plan for agentic retrieval on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions. */
  knowledgeRetrieval?: KnowledgeRetrieval;
  /** The list of private endpoint connections to the Azure AI Search service. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The list of shared private link resources managed by the Azure AI Search service. */
  readonly sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** A system generated property representing the service's etag that can be for optimistic concurrency control during updates. */
  readonly eTag?: string;
  /** Indicates if the search service has an upgrade available. */
  upgradeAvailable?: UpgradeAvailable;
  /** The date and time the search service was last upgraded. This field will be null until the service gets upgraded for the first time. */
  readonly serviceUpgradedAt?: Date;
}

export function searchServiceUpdateSerializer(item: SearchServiceUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "replicaCount",
      "partitionCount",
      "endpoint",
      "hostingMode",
      "computeType",
      "publicNetworkAccess",
      "networkRuleSet",
      "dataExfiltrationProtections",
      "encryptionWithCmk",
      "disableLocalAuth",
      "authOptions",
      "semanticSearch",
      "knowledgeRetrieval",
      "upgradeAvailable",
    ])
      ? undefined
      : _searchServiceUpdatePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

/** Response containing a list of Azure AI Search services. */
export interface _SearchServiceListResult {
  /** The list of search services. */
  readonly value?: SearchService[];
  /** Request URL that can be used to query next page of search services. Returned when the total number of requested search services exceed maximum page size. */
  readonly nextLink?: string;
}

export function _searchServiceListResultDeserializer(item: any): _SearchServiceListResult {
  return {
    value: !item["value"] ? item["value"] : searchServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function searchServiceArraySerializer(result: Array<SearchService>): any[] {
  return result.map((item) => {
    return searchServiceSerializer(item);
  });
}

export function searchServiceArrayDeserializer(result: Array<SearchService>): any[] {
  return result.map((item) => {
    return searchServiceDeserializer(item);
  });
}

/** Response containing the quota usage information for all the supported SKUs of Azure AI Search. */
export interface _QuotaUsagesListResult {
  /** The quota usages for the SKUs supported by Azure AI Search. */
  readonly value?: QuotaUsageResult[];
  /** Request URL that can be used to query next page of quota usages. Returned when the total number of requested quota usages exceed maximum page size. */
  readonly nextLink?: string;
}

export function _quotaUsagesListResultDeserializer(item: any): _QuotaUsagesListResult {
  return {
    value: !item["value"] ? item["value"] : quotaUsageResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaUsageResultArrayDeserializer(result: Array<QuotaUsageResult>): any[] {
  return result.map((item) => {
    return quotaUsageResultDeserializer(item);
  });
}

/** Response containing the primary and secondary admin API keys for a given Azure AI Search service. */
export interface AdminKeyResult {
  /** The primary admin API key of the search service. */
  readonly primaryKey?: string;
  /** The secondary admin API key of the search service. */
  readonly secondaryKey?: string;
}

export function adminKeyResultDeserializer(item: any): AdminKeyResult {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** Describes an API key for a given Azure AI Search service that conveys read-only permissions on the docs collection of an index. */
export interface QueryKey {
  /** The name of the query API key. Query names are optional, but assigning a name can help you remember how it's used. */
  readonly name?: string;
  /** The value of the query API key. */
  readonly key?: string;
}

export function queryKeyDeserializer(item: any): QueryKey {
  return {
    name: item["name"],
    key: item["key"],
  };
}

/** Response containing the query API keys for a given Azure AI Search service. */
export interface _ListQueryKeysResult {
  /** The query keys for the Azure AI Search service. */
  readonly value?: QueryKey[];
  /** Request URL that can be used to query next page of query keys. Returned when the total number of requested query keys exceed maximum page size. */
  readonly nextLink?: string;
}

export function _listQueryKeysResultDeserializer(item: any): _ListQueryKeysResult {
  return {
    value: !item["value"] ? item["value"] : queryKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function queryKeyArrayDeserializer(result: Array<QueryKey>): any[] {
  return result.map((item) => {
    return queryKeyDeserializer(item);
  });
}

/** Response containing a list of supported Private Link Resources. */
export interface _PrivateLinkResourcesResult {
  /** The list of supported Private Link Resources. */
  readonly value?: PrivateLinkResource[];
  /** The URL to get the next set of private link resources, if there are any. */
  nextLink?: string;
}

export function _privateLinkResourcesResultDeserializer(item: any): _PrivateLinkResourcesResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Describes a supported private link resource for the Azure AI Search service. */
export interface PrivateLinkResource extends Resource {
  /** Describes the properties of a supported private link resource for the Azure AI Search service. */
  readonly properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
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

/** Describes the properties of a supported private link resource for the Azure AI Search service. For a given API version, this represents the 'supported' groupIds when creating a shared private link resource. */
export interface PrivateLinkResourceProperties {
  /** The group ID of the private link resource. */
  readonly groupId?: string;
  /** The list of required members of the private link resource. */
  readonly requiredMembers?: string[];
  /** The list of required DNS zone names of the private link resource. */
  readonly requiredZoneNames?: string[];
  /** The list of resources that are onboarded to private link service, that are supported by Azure AI Search. */
  readonly shareablePrivateLinkResourceTypes?: ShareablePrivateLinkResourceType[];
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
    shareablePrivateLinkResourceTypes: !item["shareablePrivateLinkResourceTypes"]
      ? item["shareablePrivateLinkResourceTypes"]
      : shareablePrivateLinkResourceTypeArrayDeserializer(
          item["shareablePrivateLinkResourceTypes"],
        ),
  };
}

export function shareablePrivateLinkResourceTypeArrayDeserializer(
  result: Array<ShareablePrivateLinkResourceType>,
): any[] {
  return result.map((item) => {
    return shareablePrivateLinkResourceTypeDeserializer(item);
  });
}

/** Describes an resource type that has been onboarded to private link service, supported by Azure AI Search. */
export interface ShareablePrivateLinkResourceType {
  /** The name of the resource type that has been onboarded to private link service, supported by Azure AI Search. */
  readonly name?: string;
  /** Describes the properties of a resource type that has been onboarded to private link service, supported by Azure AI Search. */
  readonly properties?: ShareablePrivateLinkResourceProperties;
}

export function shareablePrivateLinkResourceTypeDeserializer(
  item: any,
): ShareablePrivateLinkResourceType {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : shareablePrivateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a resource type that has been onboarded to private link service, supported by Azure AI Search. */
export interface ShareablePrivateLinkResourceProperties {
  /** The resource provider type for the resource that has been onboarded to private link service, supported by Azure AI Search. */
  readonly type?: string;
  /** The resource provider group id for the resource that has been onboarded to private link service, supported by Azure AI Search. */
  readonly groupId?: string;
  /** The description of the resource type that has been onboarded to private link service, supported by Azure AI Search. */
  readonly description?: string;
}

export function shareablePrivateLinkResourcePropertiesDeserializer(
  item: any,
): ShareablePrivateLinkResourceProperties {
  return {
    type: item["type"],
    groupId: item["groupId"],
    description: item["description"],
  };
}

/** Type of AdminKeyKind */
export type AdminKeyKind = "primary" | "secondary";

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
  /** The 2026-03-01-preview API version. */
  V20260301Preview = "2026-03-01-preview",
}

export function _searchServicePropertiesSerializer(item: SearchService): any {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkSerializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsSerializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    upgradeAvailable: item["upgradeAvailable"],
  };
}

export function _searchServicePropertiesDeserializer(item: any) {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    provisioningState: item["provisioningState"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetDeserializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkDeserializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsDeserializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    eTag: item["eTag"],
    upgradeAvailable: item["upgradeAvailable"],
    serviceUpgradedAt: !item["serviceUpgradedAt"]
      ? item["serviceUpgradedAt"]
      : new Date(item["serviceUpgradedAt"]),
  };
}

export function _searchServiceUpdatePropertiesSerializer(item: SearchServiceUpdate): any {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkSerializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsSerializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    upgradeAvailable: item["upgradeAvailable"],
  };
}

export function _searchServiceUpdatePropertiesDeserializer(item: any) {
  return {
    replicaCount: item["replicaCount"],
    partitionCount: item["partitionCount"],
    endpoint: item["endpoint"],
    hostingMode: item["hostingMode"],
    computeType: item["computeType"],
    publicNetworkAccess: item["publicNetworkAccess"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    provisioningState: item["provisioningState"],
    networkRuleSet: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetDeserializer(item["networkRuleSet"]),
    dataExfiltrationProtections: !item["dataExfiltrationProtections"]
      ? item["dataExfiltrationProtections"]
      : item["dataExfiltrationProtections"].map((p: any) => {
          return p;
        }),
    encryptionWithCmk: !item["encryptionWithCmk"]
      ? item["encryptionWithCmk"]
      : encryptionWithCmkDeserializer(item["encryptionWithCmk"]),
    disableLocalAuth: item["disableLocalAuth"],
    authOptions: !item["authOptions"]
      ? item["authOptions"]
      : dataPlaneAuthOptionsDeserializer(item["authOptions"]),
    semanticSearch: item["semanticSearch"],
    knowledgeRetrieval: item["knowledgeRetrieval"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    eTag: item["eTag"],
    upgradeAvailable: item["upgradeAvailable"],
    serviceUpgradedAt: !item["serviceUpgradedAt"]
      ? item["serviceUpgradedAt"]
      : new Date(item["serviceUpgradedAt"]),
  };
}

/** Parameter group */
export interface SearchManagementRequestOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}
