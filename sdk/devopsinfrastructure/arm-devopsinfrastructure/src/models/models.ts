// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The response of a ImageVersion list operation. */
export interface _ImageVersionListResult {
  /** The ImageVersion items on this page */
  value: ImageVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageVersionListResultDeserializer(item: any): _ImageVersionListResult {
  return {
    value: imageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageVersionArrayDeserializer(result: Array<ImageVersion>): any[] {
  return result.map((item) => {
    return imageVersionDeserializer(item);
  });
}

/** An image version object */
export interface ImageVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ImageVersionProperties;
}

export function imageVersionDeserializer(item: any): ImageVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imageVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Details of the ImageVersionProperties. */
export interface ImageVersionProperties {
  /** Version of the image. */
  version: string;
}

export function imageVersionPropertiesDeserializer(item: any): ImageVersionProperties {
  return {
    version: item["version"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** Paged collection of Quota items */
export interface _PagedQuota {
  /** The Quota items on this page */
  value: Quota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedQuotaDeserializer(item: any): _PagedQuota {
  return {
    value: quotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaArrayDeserializer(result: Array<Quota>): any[] {
  return result.map((item) => {
    return quotaDeserializer(item);
  });
}

/** Describes Resource Quota */
export interface Quota {
  /** The name of the quota. */
  readonly name?: QuotaName;
  /** Fully qualified ARM resource id */
  id: string;
  /** The unit of usage measurement. */
  unit: string;
  /** The current usage of the resource. */
  currentValue: number;
  /** The maximum permitted usage of the resource. */
  limit: number;
}

export function quotaDeserializer(item: any): Quota {
  return {
    name: !item["name"] ? item["name"] : quotaNameDeserializer(item["name"]),
    id: item["id"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
  };
}

/** The Quota Names */
export interface QuotaName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

export function quotaNameDeserializer(item: any): QuotaName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The response of a ResourceSku list operation. */
export interface _ResourceSkuListResult {
  /** The ResourceSku items on this page */
  value: ResourceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceSkuListResultDeserializer(item: any): _ResourceSkuListResult {
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

/** A ResourceSku */
export interface ResourceSku extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ResourceSkuProperties;
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : resourceSkuPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a ResourceSku */
export interface ResourceSkuProperties {
  /** The type of resource the SKU applies to. */
  resourceType: string;
  /** The tier of virtual machines in a scale set */
  tier: string;
  /** The size of the SKU. */
  size: string;
  /** The family of the SKU. */
  family: string;
  /** The set of locations that the SKU is available. */
  locations: string[];
  /** A list of locations and availability zones in those locations where the SKU is available */
  locationInfo: ResourceSkuLocationInfo[];
  /** Name value pairs to describe the capability. */
  capabilities: ResourceSkuCapabilities[];
  /** The restrictions of the SKU. */
  restrictions: ResourceSkuRestrictions[];
}

export function resourceSkuPropertiesDeserializer(item: any): ResourceSkuProperties {
  return {
    resourceType: item["resourceType"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    locationInfo: resourceSkuLocationInfoArrayDeserializer(item["locationInfo"]),
    capabilities: resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    restrictions: resourceSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

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

/** The response of a ResourceDetailsObject list operation. */
export interface _ResourceDetailsObjectListResult {
  /** The ResourceDetailsObject items on this page */
  value: ResourceDetailsObject[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceDetailsObjectListResultDeserializer(
  item: any,
): _ResourceDetailsObjectListResult {
  return {
    value: resourceDetailsObjectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceDetailsObjectArrayDeserializer(
  result: Array<ResourceDetailsObject>,
): any[] {
  return result.map((item) => {
    return resourceDetailsObjectDeserializer(item);
  });
}

/** A ResourceDetailsObject */
export interface ResourceDetailsObject extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ResourceDetailsObjectProperties;
}

export function resourceDetailsObjectDeserializer(item: any): ResourceDetailsObject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : resourceDetailsObjectPropertiesDeserializer(item["properties"]),
  };
}

/** Details of the ResourceDetailsObject. */
export interface ResourceDetailsObjectProperties {
  /** The status of the resource. */
  status: ResourceStatus;
  /** The image name of the resource. */
  image: string;
  /** The version of the image running on the resource. */
  imageVersion: string;
}

export function resourceDetailsObjectPropertiesDeserializer(
  item: any,
): ResourceDetailsObjectProperties {
  return {
    status: item["status"],
    image: item["image"],
    imageVersion: item["imageVersion"],
  };
}

/** The status of the machine resource. */
export enum KnownResourceStatus {
  /** Represents a machine resource that is ready. */
  Ready = "Ready",
  /** Represents a machine resource that is not ready. */
  NotReady = "NotReady",
  /** Represents a machine resource that is allocated. */
  Allocated = "Allocated",
  /** Represents a machine resource that is pending return. */
  PendingReturn = "PendingReturn",
  /** Represents a machine resource that is returned. */
  Returned = "Returned",
  /** Represents a machine resource that is leased. */
  Leased = "Leased",
  /** Represents a machine resource that is provisioning. */
  Provisioning = "Provisioning",
  /** Represents a machine resource that is updating. */
  Updating = "Updating",
  /** Represents a machine resource that is starting. */
  Starting = "Starting",
  /** Represents a machine resource that is pending reimage. */
  PendingReimage = "PendingReimage",
  /** Represents a machine resource that is reimaging. */
  Reimaging = "Reimaging",
}

/**
 * The status of the machine resource. \
 * {@link KnownResourceStatus} can be used interchangeably with ResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Represents a machine resource that is ready. \
 * **NotReady**: Represents a machine resource that is not ready. \
 * **Allocated**: Represents a machine resource that is allocated. \
 * **PendingReturn**: Represents a machine resource that is pending return. \
 * **Returned**: Represents a machine resource that is returned. \
 * **Leased**: Represents a machine resource that is leased. \
 * **Provisioning**: Represents a machine resource that is provisioning. \
 * **Updating**: Represents a machine resource that is updating. \
 * **Starting**: Represents a machine resource that is starting. \
 * **PendingReimage**: Represents a machine resource that is pending reimage. \
 * **Reimaging**: Represents a machine resource that is reimaging.
 */
export type ResourceStatus = string;

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface Pool extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PoolProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function poolSerializer(item: Pool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function poolDeserializer(item: any): Pool {
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
      : poolPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Pool properties */
export interface PoolProperties {
  /** The status of the current operation. */
  provisioningState?: ProvisioningState;
  /** Defines how many resources can there be created at any given time. */
  maximumConcurrency: number;
  /** Defines the organization in which the pool will be used. */
  organizationProfile: OrganizationProfileUnion;
  /** Defines how the machine will be handled once it executed a job. */
  agentProfile: AgentProfileUnion;
  /** Defines the type of fabric the agent will run on. */
  fabricProfile: FabricProfileUnion;
  /** The resource id of the DevCenter Project the pool belongs to. */
  devCenterProjectResourceId: string;
}

export function poolPropertiesSerializer(item: PoolProperties): any {
  return {
    provisioningState: item["provisioningState"],
    maximumConcurrency: item["maximumConcurrency"],
    organizationProfile: organizationProfileUnionSerializer(item["organizationProfile"]),
    agentProfile: agentProfileUnionSerializer(item["agentProfile"]),
    fabricProfile: fabricProfileUnionSerializer(item["fabricProfile"]),
    devCenterProjectResourceId: item["devCenterProjectResourceId"],
  };
}

export function poolPropertiesDeserializer(item: any): PoolProperties {
  return {
    provisioningState: item["provisioningState"],
    maximumConcurrency: item["maximumConcurrency"],
    organizationProfile: organizationProfileUnionDeserializer(item["organizationProfile"]),
    agentProfile: agentProfileUnionDeserializer(item["agentProfile"]),
    fabricProfile: fabricProfileUnionDeserializer(item["fabricProfile"]),
    devCenterProjectResourceId: item["devCenterProjectResourceId"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Represents a succeeded operation. */
  Succeeded = "Succeeded",
  /** Represents a failed operation. */
  Failed = "Failed",
  /** Represents a canceled operation. */
  Canceled = "Canceled",
  /** Represents a pending operation. */
  Provisioning = "Provisioning",
  /** Represents a pending operation. */
  Updating = "Updating",
  /** Represents an operation under deletion. */
  Deleting = "Deleting",
  /** Represents an accepted operation. */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Represents a succeeded operation. \
 * **Failed**: Represents a failed operation. \
 * **Canceled**: Represents a canceled operation. \
 * **Provisioning**: Represents a pending operation. \
 * **Updating**: Represents a pending operation. \
 * **Deleting**: Represents an operation under deletion. \
 * **Accepted**: Represents an accepted operation.
 */
export type ProvisioningState = string;

/** Defines the organization in which the pool will be used. */
export interface OrganizationProfile {
  /** Discriminator property for OrganizationProfile. */
  /** The discriminator possible values: GitHub, AzureDevOps */
  kind: string;
}

export function organizationProfileSerializer(item: OrganizationProfile): any {
  return { kind: item["kind"] };
}

export function organizationProfileDeserializer(item: any): OrganizationProfile {
  return {
    kind: item["kind"],
  };
}

/** Alias for OrganizationProfileUnion */
export type OrganizationProfileUnion =
  | GitHubOrganizationProfile
  | AzureDevOpsOrganizationProfile
  | OrganizationProfile;

export function organizationProfileUnionSerializer(item: OrganizationProfileUnion): any {
  switch (item.kind) {
    case "GitHub":
      return gitHubOrganizationProfileSerializer(item as GitHubOrganizationProfile);

    case "AzureDevOps":
      return azureDevOpsOrganizationProfileSerializer(item as AzureDevOpsOrganizationProfile);

    default:
      return organizationProfileSerializer(item);
  }
}

export function organizationProfileUnionDeserializer(item: any): OrganizationProfileUnion {
  switch (item.kind) {
    case "GitHub":
      return gitHubOrganizationProfileDeserializer(item as GitHubOrganizationProfile);

    case "AzureDevOps":
      return azureDevOpsOrganizationProfileDeserializer(item as AzureDevOpsOrganizationProfile);

    default:
      return organizationProfileDeserializer(item);
  }
}

/** GitHub organization profile */
export interface GitHubOrganizationProfile extends OrganizationProfile {
  /** GitHub organization profile */
  kind: "GitHub";
  /** The list of GitHub organizations/repositories the pool should be present in. */
  organizations: GitHubOrganization[];
}

export function gitHubOrganizationProfileSerializer(item: GitHubOrganizationProfile): any {
  return {
    kind: item["kind"],
    organizations: gitHubOrganizationArraySerializer(item["organizations"]),
  };
}

export function gitHubOrganizationProfileDeserializer(item: any): GitHubOrganizationProfile {
  return {
    kind: item["kind"],
    organizations: gitHubOrganizationArrayDeserializer(item["organizations"]),
  };
}

export function gitHubOrganizationArraySerializer(result: Array<GitHubOrganization>): any[] {
  return result.map((item) => {
    return gitHubOrganizationSerializer(item);
  });
}

export function gitHubOrganizationArrayDeserializer(result: Array<GitHubOrganization>): any[] {
  return result.map((item) => {
    return gitHubOrganizationDeserializer(item);
  });
}

/** Defines a GitHub organization */
export interface GitHubOrganization {
  /** The GitHub organization URL in which the pool should be created. */
  url: string;
  /** Optional list of repositories in which the pool should be created. */
  repositories?: string[];
}

export function gitHubOrganizationSerializer(item: GitHubOrganization): any {
  return {
    url: item["url"],
    repositories: !item["repositories"]
      ? item["repositories"]
      : item["repositories"].map((p: any) => {
          return p;
        }),
  };
}

export function gitHubOrganizationDeserializer(item: any): GitHubOrganization {
  return {
    url: item["url"],
    repositories: !item["repositories"]
      ? item["repositories"]
      : item["repositories"].map((p: any) => {
          return p;
        }),
  };
}

/** Azure DevOps organization profile */
export interface AzureDevOpsOrganizationProfile extends OrganizationProfile {
  /** Azure DevOps organization profile */
  kind: "AzureDevOps";
  /** The list of Azure DevOps organizations the pool should be present in. */
  organizations: Organization[];
  /** The type of permission which determines which accounts are admins on the Azure DevOps pool. */
  permissionProfile?: AzureDevOpsPermissionProfile;
}

export function azureDevOpsOrganizationProfileSerializer(
  item: AzureDevOpsOrganizationProfile,
): any {
  return {
    kind: item["kind"],
    organizations: organizationArraySerializer(item["organizations"]),
    permissionProfile: !item["permissionProfile"]
      ? item["permissionProfile"]
      : azureDevOpsPermissionProfileSerializer(item["permissionProfile"]),
  };
}

export function azureDevOpsOrganizationProfileDeserializer(
  item: any,
): AzureDevOpsOrganizationProfile {
  return {
    kind: item["kind"],
    organizations: organizationArrayDeserializer(item["organizations"]),
    permissionProfile: !item["permissionProfile"]
      ? item["permissionProfile"]
      : azureDevOpsPermissionProfileDeserializer(item["permissionProfile"]),
  };
}

export function organizationArraySerializer(result: Array<Organization>): any[] {
  return result.map((item) => {
    return organizationSerializer(item);
  });
}

export function organizationArrayDeserializer(result: Array<Organization>): any[] {
  return result.map((item) => {
    return organizationDeserializer(item);
  });
}

/** Defines an Azure DevOps organization. */
export interface Organization {
  /** The Azure DevOps organization URL in which the pool should be created. */
  url: string;
  /** Optional list of projects in which the pool should be created. */
  projects?: string[];
  /** How many machines can be created at maximum in this organization out of the maximumConcurrency of the pool. */
  parallelism?: number;
}

export function organizationSerializer(item: Organization): any {
  return {
    url: item["url"],
    projects: !item["projects"]
      ? item["projects"]
      : item["projects"].map((p: any) => {
          return p;
        }),
    parallelism: item["parallelism"],
  };
}

export function organizationDeserializer(item: any): Organization {
  return {
    url: item["url"],
    projects: !item["projects"]
      ? item["projects"]
      : item["projects"].map((p: any) => {
          return p;
        }),
    parallelism: item["parallelism"],
  };
}

/** Defines the type of Azure DevOps pool permission. */
export interface AzureDevOpsPermissionProfile {
  /** Determines who has admin permissions to the Azure DevOps pool. */
  kind: AzureDevOpsPermissionType;
  /** User email addresses */
  users?: string[];
  /** Group email addresses */
  groups?: string[];
}

export function azureDevOpsPermissionProfileSerializer(item: AzureDevOpsPermissionProfile): any {
  return {
    kind: item["kind"],
    users: !item["users"]
      ? item["users"]
      : item["users"].map((p: any) => {
          return p;
        }),
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
  };
}

export function azureDevOpsPermissionProfileDeserializer(item: any): AzureDevOpsPermissionProfile {
  return {
    kind: item["kind"],
    users: !item["users"]
      ? item["users"]
      : item["users"].map((p: any) => {
          return p;
        }),
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
  };
}

/** Determines who has admin permissions to the Azure DevOps pool. */
export enum KnownAzureDevOpsPermissionType {
  /** Pool will inherit permissions from the project or organization. */
  Inherit = "Inherit",
  /** Only the pool creator will be an admin of the pool. */
  CreatorOnly = "CreatorOnly",
  /** Only the specified accounts will be admins of the pool. */
  SpecificAccounts = "SpecificAccounts",
}

/**
 * Determines who has admin permissions to the Azure DevOps pool. \
 * {@link KnownAzureDevOpsPermissionType} can be used interchangeably with AzureDevOpsPermissionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inherit**: Pool will inherit permissions from the project or organization. \
 * **CreatorOnly**: Only the pool creator will be an admin of the pool. \
 * **SpecificAccounts**: Only the specified accounts will be admins of the pool.
 */
export type AzureDevOpsPermissionType = string;

/** The agent profile of the machines in the pool. */
export interface AgentProfile {
  /** Discriminator property for AgentProfile. */
  /** The discriminator possible values: Stateless, Stateful */
  kind: string;
  /** Defines pool buffer/stand-by agents. */
  resourcePredictions?: ResourcePredictions;
  /** Defines how the pool buffer/stand-by agents is provided. */
  resourcePredictionsProfile?: ResourcePredictionsProfileUnion;
}

export function agentProfileSerializer(item: AgentProfile): any {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsSerializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionSerializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
  };
}

export function agentProfileDeserializer(item: any): AgentProfile {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsDeserializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionDeserializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
  };
}

/** Alias for AgentProfileUnion */
export type AgentProfileUnion = StatelessAgentProfile | Stateful | AgentProfile;

export function agentProfileUnionSerializer(item: AgentProfileUnion): any {
  switch (item.kind) {
    case "Stateless":
      return statelessAgentProfileSerializer(item as StatelessAgentProfile);

    case "Stateful":
      return statefulSerializer(item as Stateful);

    default:
      return agentProfileSerializer(item);
  }
}

export function agentProfileUnionDeserializer(item: any): AgentProfileUnion {
  switch (item.kind) {
    case "Stateless":
      return statelessAgentProfileDeserializer(item as StatelessAgentProfile);

    case "Stateful":
      return statefulDeserializer(item as Stateful);

    default:
      return agentProfileDeserializer(item);
  }
}

/** Defines pool buffer. */
export interface ResourcePredictions {}

export function resourcePredictionsSerializer(item: ResourcePredictions): any {
  return item;
}

export function resourcePredictionsDeserializer(item: any): ResourcePredictions {
  return item;
}

/** Determines how the stand-by scheme should be provided. */
export interface ResourcePredictionsProfile {
  /** Determines how the stand-by scheme should be provided. */
  /** The discriminator possible values: Manual, Automatic */
  kind: ResourcePredictionsProfileType;
}

export function resourcePredictionsProfileSerializer(item: ResourcePredictionsProfile): any {
  return { kind: item["kind"] };
}

export function resourcePredictionsProfileDeserializer(item: any): ResourcePredictionsProfile {
  return {
    kind: item["kind"],
  };
}

/** Alias for ResourcePredictionsProfileUnion */
export type ResourcePredictionsProfileUnion =
  | ManualResourcePredictionsProfile
  | AutomaticResourcePredictionsProfile
  | ResourcePredictionsProfile;

export function resourcePredictionsProfileUnionSerializer(
  item: ResourcePredictionsProfileUnion,
): any {
  switch (item.kind) {
    case "Manual":
      return manualResourcePredictionsProfileSerializer(item as ManualResourcePredictionsProfile);

    case "Automatic":
      return automaticResourcePredictionsProfileSerializer(
        item as AutomaticResourcePredictionsProfile,
      );

    default:
      return resourcePredictionsProfileSerializer(item);
  }
}

export function resourcePredictionsProfileUnionDeserializer(
  item: any,
): ResourcePredictionsProfileUnion {
  switch (item.kind) {
    case "Manual":
      return manualResourcePredictionsProfileDeserializer(item as ManualResourcePredictionsProfile);

    case "Automatic":
      return automaticResourcePredictionsProfileDeserializer(
        item as AutomaticResourcePredictionsProfile,
      );

    default:
      return resourcePredictionsProfileDeserializer(item);
  }
}

/** Determines how the stand-by scheme should be provided. */
export enum KnownResourcePredictionsProfileType {
  /** Customer provides the stand-by agent scheme. */
  Manual = "Manual",
  /** The stand-by agent scheme is determined based on historical demand. */
  Automatic = "Automatic",
}

/**
 * Determines how the stand-by scheme should be provided. \
 * {@link KnownResourcePredictionsProfileType} can be used interchangeably with ResourcePredictionsProfileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Customer provides the stand-by agent scheme. \
 * **Automatic**: The stand-by agent scheme is determined based on historical demand.
 */
export type ResourcePredictionsProfileType = string;

/** Customer provides the stand-by agent scheme. */
export interface ManualResourcePredictionsProfile extends ResourcePredictionsProfile {
  /** Customer provides the stand-by agent scheme. */
  kind: "Manual";
}

export function manualResourcePredictionsProfileSerializer(
  item: ManualResourcePredictionsProfile,
): any {
  return { kind: item["kind"] };
}

export function manualResourcePredictionsProfileDeserializer(
  item: any,
): ManualResourcePredictionsProfile {
  return {
    kind: item["kind"],
  };
}

/** The stand-by agent scheme is determined based on historical demand. */
export interface AutomaticResourcePredictionsProfile extends ResourcePredictionsProfile {
  /** The stand-by agent scheme is determined based on historical demand. */
  kind: "Automatic";
  /** Determines the balance between cost and performance. */
  predictionPreference?: PredictionPreference;
}

export function automaticResourcePredictionsProfileSerializer(
  item: AutomaticResourcePredictionsProfile,
): any {
  return {
    kind: item["kind"],
    predictionPreference: item["predictionPreference"],
  };
}

export function automaticResourcePredictionsProfileDeserializer(
  item: any,
): AutomaticResourcePredictionsProfile {
  return {
    kind: item["kind"],
    predictionPreference: item["predictionPreference"],
  };
}

/** Determines the balance between cost and performance. */
export enum KnownPredictionPreference {
  /** Balance between cost and performance. */
  Balanced = "Balanced",
  /** Optimizes for cost over performance. */
  MostCostEffective = "MostCostEffective",
  /** Halfway through cost and balanced. */
  MoreCostEffective = "MoreCostEffective",
  /** Halfway through balanced and performance. */
  MorePerformance = "MorePerformance",
  /** Optimizes for performance over cost. */
  BestPerformance = "BestPerformance",
}

/**
 * Determines the balance between cost and performance. \
 * {@link KnownPredictionPreference} can be used interchangeably with PredictionPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Balanced**: Balance between cost and performance. \
 * **MostCostEffective**: Optimizes for cost over performance. \
 * **MoreCostEffective**: Halfway through cost and balanced. \
 * **MorePerformance**: Halfway through balanced and performance. \
 * **BestPerformance**: Optimizes for performance over cost.
 */
export type PredictionPreference = string;

/** Stateless profile meaning that the machines will be cleaned up after running a job. */
export interface StatelessAgentProfile extends AgentProfile {
  /** Stateless profile meaning that the machines will be cleaned up after running a job. */
  kind: "Stateless";
}

export function statelessAgentProfileSerializer(item: StatelessAgentProfile): any {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsSerializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionSerializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
  };
}

export function statelessAgentProfileDeserializer(item: any): StatelessAgentProfile {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsDeserializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionDeserializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
  };
}

/** Stateful profile meaning that the machines will be returned to the pool after running a job. */
export interface Stateful extends AgentProfile {
  /** Stateful profile meaning that the machines will be returned to the pool after running a job. */
  kind: "Stateful";
  /** How long should stateful machines be kept around. The maximum is one week. */
  maxAgentLifetime?: string;
  /** How long should the machine be kept around after it ran a workload when there are no stand-by agents. The maximum is one week. */
  gracePeriodTimeSpan?: string;
}

export function statefulSerializer(item: Stateful): any {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsSerializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionSerializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
    maxAgentLifetime: item["maxAgentLifetime"],
    gracePeriodTimeSpan: item["gracePeriodTimeSpan"],
  };
}

export function statefulDeserializer(item: any): Stateful {
  return {
    resourcePredictions: !item["resourcePredictions"]
      ? item["resourcePredictions"]
      : resourcePredictionsDeserializer(item["resourcePredictions"]),
    resourcePredictionsProfile: !item["resourcePredictionsProfile"]
      ? item["resourcePredictionsProfile"]
      : resourcePredictionsProfileUnionDeserializer(item["resourcePredictionsProfile"]),
    kind: item["kind"],
    maxAgentLifetime: item["maxAgentLifetime"],
    gracePeriodTimeSpan: item["gracePeriodTimeSpan"],
  };
}

/** Defines the type of fabric the agent will run on. */
export interface FabricProfile {
  /** Discriminator property for FabricProfile. */
  /** The discriminator possible values: Vmss */
  kind: string;
}

export function fabricProfileSerializer(item: FabricProfile): any {
  return { kind: item["kind"] };
}

export function fabricProfileDeserializer(item: any): FabricProfile {
  return {
    kind: item["kind"],
  };
}

/** Alias for FabricProfileUnion */
export type FabricProfileUnion = VmssFabricProfile | FabricProfile;

export function fabricProfileUnionSerializer(item: FabricProfileUnion): any {
  switch (item.kind) {
    case "Vmss":
      return vmssFabricProfileSerializer(item as VmssFabricProfile);

    default:
      return fabricProfileSerializer(item);
  }
}

export function fabricProfileUnionDeserializer(item: any): FabricProfileUnion {
  switch (item.kind) {
    case "Vmss":
      return vmssFabricProfileDeserializer(item as VmssFabricProfile);

    default:
      return fabricProfileDeserializer(item);
  }
}

/** The agents will run on Virtual Machine Scale Sets. */
export interface VmssFabricProfile extends FabricProfile {
  /** Virtual Machine Scale Sets */
  kind: "Vmss";
  /** The Azure SKU of the machines in the pool. */
  sku: DevOpsAzureSku;
  /** The VM images of the machines in the pool. */
  images: PoolImage[];
  /** The OS profile of the machines in the pool. */
  osProfile?: OsProfile;
  /** The storage profile of the machines in the pool. */
  storageProfile?: StorageProfile;
  /** The network profile of the machines in the pool. */
  networkProfile?: NetworkProfile;
}

export function vmssFabricProfileSerializer(item: VmssFabricProfile): any {
  return {
    kind: item["kind"],
    sku: devOpsAzureSkuSerializer(item["sku"]),
    images: poolImageArraySerializer(item["images"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
  };
}

export function vmssFabricProfileDeserializer(item: any): VmssFabricProfile {
  return {
    kind: item["kind"],
    sku: devOpsAzureSkuDeserializer(item["sku"]),
    images: poolImageArrayDeserializer(item["images"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
  };
}

/** The Azure SKU of the machines in the pool. */
export interface DevOpsAzureSku {
  /** The Azure SKU name of the machines in the pool. */
  name: string;
}

export function devOpsAzureSkuSerializer(item: DevOpsAzureSku): any {
  return { name: item["name"] };
}

export function devOpsAzureSkuDeserializer(item: any): DevOpsAzureSku {
  return {
    name: item["name"],
  };
}

export function poolImageArraySerializer(result: Array<PoolImage>): any[] {
  return result.map((item) => {
    return poolImageSerializer(item);
  });
}

export function poolImageArrayDeserializer(result: Array<PoolImage>): any[] {
  return result.map((item) => {
    return poolImageDeserializer(item);
  });
}

/** The VM image of the machines in the pool. */
export interface PoolImage {
  /** The resource id of the image. */
  resourceId?: string;
  /** The image to use from a well-known set of images made available to customers. */
  wellKnownImageName?: string;
  /** List of aliases to reference the image by. */
  aliases?: string[];
  /** The percentage of the buffer to be allocated to this image. */
  buffer?: string;
}

export function poolImageSerializer(item: PoolImage): any {
  return {
    resourceId: item["resourceId"],
    wellKnownImageName: item["wellKnownImageName"],
    aliases: !item["aliases"]
      ? item["aliases"]
      : item["aliases"].map((p: any) => {
          return p;
        }),
    buffer: item["buffer"],
  };
}

export function poolImageDeserializer(item: any): PoolImage {
  return {
    resourceId: item["resourceId"],
    wellKnownImageName: item["wellKnownImageName"],
    aliases: !item["aliases"]
      ? item["aliases"]
      : item["aliases"].map((p: any) => {
          return p;
        }),
    buffer: item["buffer"],
  };
}

/** The OS profile of the machines in the pool. */
export interface OsProfile {
  /** The secret management settings of the machines in the pool. */
  secretsManagementSettings?: SecretsManagementSettings;
  /** Determines how the service should be run. By default, this will be set to Service. */
  logonType?: LogonType;
}

export function osProfileSerializer(item: OsProfile): any {
  return {
    secretsManagementSettings: !item["secretsManagementSettings"]
      ? item["secretsManagementSettings"]
      : secretsManagementSettingsSerializer(item["secretsManagementSettings"]),
    logonType: item["logonType"],
  };
}

export function osProfileDeserializer(item: any): OsProfile {
  return {
    secretsManagementSettings: !item["secretsManagementSettings"]
      ? item["secretsManagementSettings"]
      : secretsManagementSettingsDeserializer(item["secretsManagementSettings"]),
    logonType: item["logonType"],
  };
}

/** The secret management settings of the machines in the pool. */
export interface SecretsManagementSettings {
  /** Where to store certificates on the machine. */
  certificateStoreLocation?: string;
  /** The list of certificates to install on all machines in the pool. */
  observedCertificates: string[];
  /** Defines if the key of the certificates should be exportable. */
  keyExportable: boolean;
}

export function secretsManagementSettingsSerializer(item: SecretsManagementSettings): any {
  return {
    certificateStoreLocation: item["certificateStoreLocation"],
    observedCertificates: item["observedCertificates"].map((p: any) => {
      return p;
    }),
    keyExportable: item["keyExportable"],
  };
}

export function secretsManagementSettingsDeserializer(item: any): SecretsManagementSettings {
  return {
    certificateStoreLocation: item["certificateStoreLocation"],
    observedCertificates: item["observedCertificates"].map((p: any) => {
      return p;
    }),
    keyExportable: item["keyExportable"],
  };
}

/** Determines how the service should be run. */
export enum KnownLogonType {
  /** Run as a service. */
  Service = "Service",
  /** Run in interactive mode. */
  Interactive = "Interactive",
}

/**
 * Determines how the service should be run. \
 * {@link KnownLogonType} can be used interchangeably with LogonType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Service**: Run as a service. \
 * **Interactive**: Run in interactive mode.
 */
export type LogonType = string;

/** The storage profile of the VMSS. */
export interface StorageProfile {
  /** The Azure SKU name of the machines in the pool. */
  osDiskStorageAccountType?: OsDiskStorageAccountType;
  /** A list of empty data disks to attach. */
  dataDisks?: DataDisk[];
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    osDiskStorageAccountType: item["osDiskStorageAccountType"],
    dataDisks: !item["dataDisks"] ? item["dataDisks"] : dataDiskArraySerializer(item["dataDisks"]),
  };
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    osDiskStorageAccountType: item["osDiskStorageAccountType"],
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : dataDiskArrayDeserializer(item["dataDisks"]),
  };
}

/** The storage account type of the OS disk. */
export enum KnownOsDiskStorageAccountType {
  /** Standard OS disk type. */
  Standard = "Standard",
  /** Premium OS disk type. */
  Premium = "Premium",
  /** Standard SSD OS disk type. */
  StandardSSD = "StandardSSD",
}

/**
 * The storage account type of the OS disk. \
 * {@link KnownOsDiskStorageAccountType} can be used interchangeably with OsDiskStorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard OS disk type. \
 * **Premium**: Premium OS disk type. \
 * **StandardSSD**: Standard SSD OS disk type.
 */
export type OsDiskStorageAccountType = string;

export function dataDiskArraySerializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskSerializer(item);
  });
}

export function dataDiskArrayDeserializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskDeserializer(item);
  });
}

/** The data disk of the VMSS. */
export interface DataDisk {
  /** The type of caching to be enabled for the data disks. The default value for caching is readwrite. For information about the caching options see: https://blogs.msdn.microsoft.com/windowsazurestorage/2012/06/27/exploring-windows-azure-drives-disks-and-images/. */
  caching?: CachingType;
  /** The initial disk size in gigabytes. */
  diskSizeGiB?: number;
  /** The storage Account type to be used for the data disk. If omitted, the default is "standard_lrs". */
  storageAccountType?: StorageAccountType;
  /** The drive letter for the empty data disk. If not specified, it will be the first available letter. */
  driveLetter?: string;
}

export function dataDiskSerializer(item: DataDisk): any {
  return {
    caching: item["caching"],
    diskSizeGiB: item["diskSizeGiB"],
    storageAccountType: item["storageAccountType"],
    driveLetter: item["driveLetter"],
  };
}

export function dataDiskDeserializer(item: any): DataDisk {
  return {
    caching: item["caching"],
    diskSizeGiB: item["diskSizeGiB"],
    storageAccountType: item["storageAccountType"],
    driveLetter: item["driveLetter"],
  };
}

/** The type of caching in a data disk. */
export enum KnownCachingType {
  /** Don't use host caching. */
  None = "None",
  /** For workloads that only do read operations. */
  ReadOnly = "ReadOnly",
  /** For workloads that do a balance of read and write operations. */
  ReadWrite = "ReadWrite",
}

/**
 * The type of caching in a data disk. \
 * {@link KnownCachingType} can be used interchangeably with CachingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Don't use host caching. \
 * **ReadOnly**: For workloads that only do read operations. \
 * **ReadWrite**: For workloads that do a balance of read and write operations.
 */
export type CachingType = string;

/** StorageAccountType enums */
export enum KnownStorageAccountType {
  /** The data disk should use standard locally redundant storage. */
  StandardLRS = "Standard_LRS",
  /** The data disk should use premium locally redundant storage. */
  PremiumLRS = "Premium_LRS",
  /** The data disk should use standard SSD locally redundant storage. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** The data disk should use premium SSD zonal redundant storage. */
  PremiumZRS = "Premium_ZRS",
  /** The data disk should use standard SSD zonal redundant storage. */
  StandardSSDZRS = "StandardSSD_ZRS",
}

/**
 * StorageAccountType enums \
 * {@link KnownStorageAccountType} can be used interchangeably with StorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: The data disk should use standard locally redundant storage. \
 * **Premium_LRS**: The data disk should use premium locally redundant storage. \
 * **StandardSSD_LRS**: The data disk should use standard SSD locally redundant storage. \
 * **Premium_ZRS**: The data disk should use premium SSD zonal redundant storage. \
 * **StandardSSD_ZRS**: The data disk should use standard SSD zonal redundant storage.
 */
export type StorageAccountType = string;

/** The network profile of the machines in the pool. */
export interface NetworkProfile {
  /** The subnet id on which to put all machines created in the pool. */
  subnetId: string;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return { subnetId: item["subnetId"] };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    subnetId: item["subnetId"],
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

/** The type used for update operations of the Pool. */
export interface PoolUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: PoolUpdateProperties;
}

export function poolUpdateSerializer(item: PoolUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : poolUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Pool. */
export interface PoolUpdateProperties {
  /** The status of the current operation. */
  provisioningState?: ProvisioningState;
  /** Defines how many resources can there be created at any given time. */
  maximumConcurrency?: number;
  /** Defines the organization in which the pool will be used. */
  organizationProfile?: OrganizationProfileUnion;
  /** Defines how the machine will be handled once it executed a job. */
  agentProfile?: AgentProfileUnion;
  /** Defines the type of fabric the agent will run on. */
  fabricProfile?: FabricProfileUnion;
  /** The resource id of the DevCenter Project the pool belongs to. */
  devCenterProjectResourceId?: string;
}

export function poolUpdatePropertiesSerializer(item: PoolUpdateProperties): any {
  return {
    provisioningState: item["provisioningState"],
    maximumConcurrency: item["maximumConcurrency"],
    organizationProfile: !item["organizationProfile"]
      ? item["organizationProfile"]
      : organizationProfileUnionSerializer(item["organizationProfile"]),
    agentProfile: !item["agentProfile"]
      ? item["agentProfile"]
      : agentProfileUnionSerializer(item["agentProfile"]),
    fabricProfile: !item["fabricProfile"]
      ? item["fabricProfile"]
      : fabricProfileUnionSerializer(item["fabricProfile"]),
    devCenterProjectResourceId: item["devCenterProjectResourceId"],
  };
}

/** The response of a Pool list operation. */
export interface _PoolListResult {
  /** The Pool items on this page */
  value: Pool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _poolListResultDeserializer(item: any): _PoolListResult {
  return {
    value: poolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function poolArraySerializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolSerializer(item);
  });
}

export function poolArrayDeserializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolDeserializer(item);
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
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
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

/** Api versions */
export enum KnownVersions {
  /** 2024-10-19 version */
  "V2024-10-19" = "2024-10-19",
}
