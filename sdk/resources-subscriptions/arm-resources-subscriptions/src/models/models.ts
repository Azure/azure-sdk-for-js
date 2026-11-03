// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Name and Type of the Resource */
export interface ResourceName {
  /** Name of the resource */
  name: string;
  /** The type of the resource */
  type: string;
}

export function resourceNameSerializer(item: ResourceName): any {
  return { name: item["name"], type: item["type"] };
}

/** Resource Name valid if not a reserved word, does not contain a reserved word and does not start with a reserved word */
export interface CheckResourceNameResult {
  /** Name of Resource */
  name?: string;
  /** Type of Resource */
  type?: string;
  /** Is the resource name Allowed or Reserved */
  status?: ResourceNameStatus;
}

export function checkResourceNameResultDeserializer(item: any): CheckResourceNameResult {
  return {
    name: item["name"],
    type: item["type"],
    status: item["status"],
  };
}

/** Is the resource name Allowed or Reserved */
export enum KnownResourceNameStatus {
  /** Allowed */
  Allowed = "Allowed",
  /** Reserved */
  Reserved = "Reserved",
}

/**
 * Is the resource name Allowed or Reserved \
 * {@link KnownResourceNameStatus} can be used interchangeably with ResourceNameStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Allowed \
 * **Reserved**: Reserved
 */
export type ResourceNameStatus = string;

/** An error response for a resource management request. */
export interface CloudError {
  /** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
  error?: ErrorResponse;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

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

/** Location list operation response. */
export interface _LocationListResult {
  /** An array of locations. */
  value?: Location[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _locationListResultDeserializer(item: any): _LocationListResult {
  return {
    value: !item["value"] ? item["value"] : locationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function locationArrayDeserializer(result: Array<Location>): any[] {
  return result.map((item) => {
    return locationDeserializer(item);
  });
}

/** Location information. */
export interface Location {
  /** The fully qualified ID of the location. For example, /subscriptions/8d65815f-a5b6-402f-9298-045155da7d74/locations/westus. */
  readonly id?: string;
  /** The subscription ID. */
  readonly subscriptionId?: string;
  /** The location name. */
  readonly name?: string;
  /** The location type. */
  readonly type?: LocationType;
  /** The display name of the location. */
  readonly displayName?: string;
  /** The display name of the location and its region. */
  readonly regionalDisplayName?: string;
  /** Metadata of the location, such as lat/long, paired region, and others. */
  metadata?: LocationMetadata;
  /** The availability zone mappings for this region. */
  availabilityZoneMappings?: AvailabilityZoneMappings[];
}

export function locationDeserializer(item: any): Location {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    name: item["name"],
    type: item["type"],
    displayName: item["displayName"],
    regionalDisplayName: item["regionalDisplayName"],
    metadata: !item["metadata"] ? item["metadata"] : locationMetadataDeserializer(item["metadata"]),
    availabilityZoneMappings: !item["availabilityZoneMappings"]
      ? item["availabilityZoneMappings"]
      : availabilityZoneMappingsArrayDeserializer(item["availabilityZoneMappings"]),
  };
}

/** The location type. */
export type LocationType = "Region" | "EdgeZone";

/** Location metadata information */
export interface LocationMetadata {
  /** The type of the region. */
  readonly regionType?: RegionType;
  /** The category of the region. */
  readonly regionCategory?: RegionCategory;
  /** The geography of the location. */
  readonly geography?: string;
  /** The geography group of the location. */
  readonly geographyGroup?: string;
  /** The longitude of the location. */
  readonly longitude?: string;
  /** The latitude of the location. */
  readonly latitude?: string;
  /** The physical location of the Azure location. */
  readonly physicalLocation?: string;
  /** The regions paired to this region. */
  pairedRegion?: PairedRegion[];
  /** The home location of an edge zone. */
  readonly homeLocation?: string;
}

export function locationMetadataDeserializer(item: any): LocationMetadata {
  return {
    regionType: item["regionType"],
    regionCategory: item["regionCategory"],
    geography: item["geography"],
    geographyGroup: item["geographyGroup"],
    longitude: item["longitude"],
    latitude: item["latitude"],
    physicalLocation: item["physicalLocation"],
    pairedRegion: !item["pairedRegion"]
      ? item["pairedRegion"]
      : pairedRegionArrayDeserializer(item["pairedRegion"]),
    homeLocation: item["homeLocation"],
  };
}

/** The type of the region. */
export enum KnownRegionType {
  /** Physical */
  Physical = "Physical",
  /** Logical */
  Logical = "Logical",
}

/**
 * The type of the region. \
 * {@link KnownRegionType} can be used interchangeably with RegionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Physical**: Physical \
 * **Logical**: Logical
 */
export type RegionType = string;

/** The category of the region. */
export enum KnownRegionCategory {
  /** Recommended */
  Recommended = "Recommended",
  /** Extended */
  Extended = "Extended",
  /** Other */
  Other = "Other",
}

/**
 * The category of the region. \
 * {@link KnownRegionCategory} can be used interchangeably with RegionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Recommended**: Recommended \
 * **Extended**: Extended \
 * **Other**: Other
 */
export type RegionCategory = string;

export function pairedRegionArrayDeserializer(result: Array<PairedRegion>): any[] {
  return result.map((item) => {
    return pairedRegionDeserializer(item);
  });
}

/** Information regarding paired region. */
export interface PairedRegion {
  /** The name of the paired region. */
  readonly name?: string;
  /** The fully qualified ID of the location. For example, /subscriptions/8d65815f-a5b6-402f-9298-045155da7d74/locations/westus. */
  readonly id?: string;
  /** The subscription ID. */
  readonly subscriptionId?: string;
}

export function pairedRegionDeserializer(item: any): PairedRegion {
  return {
    name: item["name"],
    id: item["id"],
    subscriptionId: item["subscriptionId"],
  };
}

export function availabilityZoneMappingsArrayDeserializer(
  result: Array<AvailabilityZoneMappings>,
): any[] {
  return result.map((item) => {
    return availabilityZoneMappingsDeserializer(item);
  });
}

/** Availability zone mappings for the region */
export interface AvailabilityZoneMappings {
  /** The logical zone id for the availability zone */
  readonly logicalZone?: string;
  /** The fully qualified physical zone id of availability zone to which logical zone id is mapped to */
  readonly physicalZone?: string;
}

export function availabilityZoneMappingsDeserializer(item: any): AvailabilityZoneMappings {
  return {
    logicalZone: item["logicalZone"],
    physicalZone: item["physicalZone"],
  };
}

/** Subscription information. */
export interface Subscription {
  /** The fully qualified ID for the subscription. For example, /subscriptions/8d65815f-a5b6-402f-9298-045155da7d74 */
  readonly id?: string;
  /** The subscription ID. */
  readonly subscriptionId?: string;
  /** The subscription display name. */
  readonly displayName?: string;
  /** The subscription tenant ID. */
  readonly tenantId?: string;
  /** The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted. */
  readonly state?: SubscriptionState;
  /** The subscription policies. */
  subscriptionPolicies?: SubscriptionPolicies;
  /** The authorization source of the request. Valid values are one or more combinations of Legacy, RoleBased, Bypassed, Direct and Management. For example, 'Legacy, RoleBased'. */
  authorizationSource?: string;
  /** An array containing the tenants managing the subscription. */
  managedByTenants?: ManagedByTenant[];
  /** The tags attached to the subscription. */
  tags?: Record<string, string>;
}

export function subscriptionDeserializer(item: any): Subscription {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    displayName: item["displayName"],
    tenantId: item["tenantId"],
    state: item["state"],
    subscriptionPolicies: !item["subscriptionPolicies"]
      ? item["subscriptionPolicies"]
      : subscriptionPoliciesDeserializer(item["subscriptionPolicies"]),
    authorizationSource: item["authorizationSource"],
    managedByTenants: !item["managedByTenants"]
      ? item["managedByTenants"]
      : managedByTenantArrayDeserializer(item["managedByTenants"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted. */
export type SubscriptionState = "Enabled" | "Warned" | "PastDue" | "Disabled" | "Deleted";

/** Subscription policies. */
export interface SubscriptionPolicies {
  /** The subscription location placement ID. The ID indicates which regions are visible for a subscription. For example, a subscription with a location placement Id of Public_2014-09-01 has access to Azure public regions. */
  readonly locationPlacementId?: string;
  /** The subscription quota ID. */
  readonly quotaId?: string;
  /** The subscription spending limit. */
  readonly spendingLimit?: SpendingLimit;
}

export function subscriptionPoliciesDeserializer(item: any): SubscriptionPolicies {
  return {
    locationPlacementId: item["locationPlacementId"],
    quotaId: item["quotaId"],
    spendingLimit: item["spendingLimit"],
  };
}

/** The subscription spending limit. */
export type SpendingLimit = "On" | "Off" | "CurrentPeriodOff";

export function managedByTenantArrayDeserializer(result: Array<ManagedByTenant>): any[] {
  return result.map((item) => {
    return managedByTenantDeserializer(item);
  });
}

/** Information about a tenant managing the subscription. */
export interface ManagedByTenant {
  /** The tenant ID of the managing tenant. This is a GUID. */
  readonly tenantId?: string;
}

export function managedByTenantDeserializer(item: any): ManagedByTenant {
  return {
    tenantId: item["tenantId"],
  };
}

/** Subscription list operation response. */
export interface _SubscriptionListResult {
  /** The Subscription items on this page */
  value: Subscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subscriptionListResultDeserializer(item: any): _SubscriptionListResult {
  return {
    value: subscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionArrayDeserializer(result: Array<Subscription>): any[] {
  return result.map((item) => {
    return subscriptionDeserializer(item);
  });
}

/** Check zone peers request parameters. */
export interface CheckZonePeersRequest {
  /** The Microsoft location. */
  location?: string;
  /** The peer Microsoft Azure subscription ID. */
  subscriptionIds?: string[];
}

export function checkZonePeersRequestSerializer(item: CheckZonePeersRequest): any {
  return {
    location: item["location"],
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Result of the Check zone peers operation. */
export interface CheckZonePeersResult {
  /** The subscription ID. */
  readonly subscriptionId?: string;
  /** the location of the subscription. */
  location?: string;
  /** The Availability Zones shared by the subscriptions. */
  availabilityZonePeers?: AvailabilityZonePeers[];
}

export function checkZonePeersResultDeserializer(item: any): CheckZonePeersResult {
  return {
    subscriptionId: item["subscriptionId"],
    location: item["location"],
    availabilityZonePeers: !item["availabilityZonePeers"]
      ? item["availabilityZonePeers"]
      : availabilityZonePeersArrayDeserializer(item["availabilityZonePeers"]),
  };
}

export function availabilityZonePeersArrayDeserializer(
  result: Array<AvailabilityZonePeers>,
): any[] {
  return result.map((item) => {
    return availabilityZonePeersDeserializer(item);
  });
}

/** List of availability zones shared by the subscriptions. */
export interface AvailabilityZonePeers {
  /** The availabilityZone. */
  readonly availabilityZone?: string;
  /** Details of shared availability zone. */
  peers?: Peers[];
}

export function availabilityZonePeersDeserializer(item: any): AvailabilityZonePeers {
  return {
    availabilityZone: item["availabilityZone"],
    peers: !item["peers"] ? item["peers"] : peersArrayDeserializer(item["peers"]),
  };
}

export function peersArrayDeserializer(result: Array<Peers>): any[] {
  return result.map((item) => {
    return peersDeserializer(item);
  });
}

/** Information about shared availability zone. */
export interface Peers {
  /** The subscription ID. */
  readonly subscriptionId?: string;
  /** The availabilityZone. */
  readonly availabilityZone?: string;
}

export function peersDeserializer(item: any): Peers {
  return {
    subscriptionId: item["subscriptionId"],
    availabilityZone: item["availabilityZone"],
  };
}

/** Tenant Ids information. */
export interface _TenantListResult {
  /** The TenantIdDescription items on this page */
  value: TenantIdDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tenantListResultDeserializer(item: any): _TenantListResult {
  return {
    value: tenantIdDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tenantIdDescriptionArrayDeserializer(result: Array<TenantIdDescription>): any[] {
  return result.map((item) => {
    return tenantIdDescriptionDeserializer(item);
  });
}

/** Tenant Id information. */
export interface TenantIdDescription {
  /** The fully qualified ID of the tenant. For example, /tenants/8d65815f-a5b6-402f-9298-045155da7d74 */
  readonly id?: string;
  /** The tenant ID. For example, 8d65815f-a5b6-402f-9298-045155da7d74 */
  readonly tenantId?: string;
  /** Category of the tenant. */
  readonly tenantCategory?: TenantCategory;
  /** Country/region name of the address for the tenant. */
  readonly country?: string;
  /** Country/region abbreviation for the tenant. */
  readonly countryCode?: string;
  /** The display name of the tenant. */
  readonly displayName?: string;
  /** The list of domains for the tenant. */
  readonly domains?: string[];
  /** The default domain for the tenant. */
  readonly defaultDomain?: string;
  /** The tenant type. Only available for 'Home' tenant category. */
  readonly tenantType?: string;
  /** The tenant's branding logo URL. Only available for 'Home' tenant category. */
  readonly tenantBrandingLogoUrl?: string;
}

export function tenantIdDescriptionDeserializer(item: any): TenantIdDescription {
  return {
    id: item["id"],
    tenantId: item["tenantId"],
    tenantCategory: item["tenantCategory"],
    country: item["country"],
    countryCode: item["countryCode"],
    displayName: item["displayName"],
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
    defaultDomain: item["defaultDomain"],
    tenantType: item["tenantType"],
    tenantBrandingLogoUrl: item["tenantBrandingLogoUrl"],
  };
}

/** Category of the tenant. */
export type TenantCategory = "Home" | "ProjectedBy" | "ManagedBy";

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-12-01 API version. */
  V20221201 = "2022-12-01",
}
