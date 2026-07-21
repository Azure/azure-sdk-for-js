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

/** The resource model definition for an Azure Organization */
export interface OrganizationResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OrganizationProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function organizationResourceSerializer(item: OrganizationResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function organizationResourceDeserializer(item: any): OrganizationResource {
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
      : organizationPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to Organization */
export interface OrganizationProperties {
  /** Marketplace details of the resource. */
  marketplace: MarketplaceDetails;
  /** Details of the user. */
  user: UserDetails;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** MongoDB properties */
  partnerProperties?: PartnerProperties;
}

export function organizationPropertiesSerializer(item: OrganizationProperties): any {
  return {
    marketplace: marketplaceDetailsSerializer(item["marketplace"]),
    user: userDetailsSerializer(item["user"]),
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : partnerPropertiesSerializer(item["partnerProperties"]),
  };
}

export function organizationPropertiesDeserializer(item: any): OrganizationProperties {
  return {
    marketplace: marketplaceDetailsDeserializer(item["marketplace"]),
    user: userDetailsDeserializer(item["user"]),
    provisioningState: item["provisioningState"],
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : partnerPropertiesDeserializer(item["partnerProperties"]),
  };
}

/** Marketplace details for an organization */
export interface MarketplaceDetails {
  /** Azure subscription id for the the marketplace offer is purchased from */
  subscriptionId: string;
  /** Marketplace subscription status */
  readonly subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionId: item["subscriptionId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
    offerDetails: offerDetailsDeserializer(item["offerDetails"]),
  };
}

/** Marketplace subscription status of a resource. */
export enum KnownMarketplaceSubscriptionStatus {
  /** Purchased but not yet activated */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace subscription is activated */
  Subscribed = "Subscribed",
  /** This state indicates that a customer's payment for the Marketplace service was not received */
  Suspended = "Suspended",
  /** Customer has cancelled the subscription */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status of a resource. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Purchased but not yet activated \
 * **Subscribed**: Marketplace subscription is activated \
 * **Suspended**: This state indicates that a customer's payment for the Marketplace service was not received \
 * **Unsubscribed**: Customer has cancelled the subscription
 */
export type MarketplaceSubscriptionStatus = string;

/** Offer details for the marketplace that is selected by the user */
export interface OfferDetails {
  /** Publisher Id for the marketplace offer */
  publisherId: string;
  /** Offer Id for the marketplace offer */
  offerId: string;
  /** Plan Id for the marketplace offer */
  planId: string;
  /** Plan Name for the marketplace offer */
  planName?: string;
  /** Plan Display Name for the marketplace offer */
  termUnit?: string;
  /** Plan Display Name for the marketplace offer */
  termId?: string;
}

export function offerDetailsSerializer(item: OfferDetails): any {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

export function offerDetailsDeserializer(item: any): OfferDetails {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

/** User details for an organization */
export interface UserDetails {
  /** First name of the user */
  firstName: string;
  /** Last name of the user */
  lastName: string;
  /** Email address of the user */
  emailAddress: string;
  /** User's principal name */
  upn?: string;
  /** User's phone number */
  phoneNumber?: string;
  /** Company Name */
  companyName?: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyName: item["companyName"],
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyName: item["companyName"],
  };
}

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

/** MongoDB specific Properties */
export interface PartnerProperties {
  /** Organization Id in MongoDB system */
  organizationId?: string;
  /** Redirect URL for the MongoDB */
  redirectUrl?: string;
  /** Organization name in MongoDB system */
  organizationName: string;
}

export function partnerPropertiesSerializer(item: PartnerProperties): any {
  return {
    organizationId: item["organizationId"],
    redirectUrl: item["redirectUrl"],
    organizationName: item["organizationName"],
  };
}

export function partnerPropertiesDeserializer(item: any): PartnerProperties {
  return {
    organizationId: item["organizationId"],
    redirectUrl: item["redirectUrl"],
    organizationName: item["organizationName"],
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

/** The type used for update operations of the OrganizationResource. */
export interface OrganizationResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: OrganizationResourceUpdateProperties;
}

export function organizationResourceUpdateSerializer(item: OrganizationResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the OrganizationResource. */
export interface OrganizationResourceUpdateProperties {
  /** Details of the user. */
  user?: UserDetails;
  /** MongoDB properties */
  partnerProperties?: PartnerProperties;
}

export function organizationResourceUpdatePropertiesSerializer(
  item: OrganizationResourceUpdateProperties,
): any {
  return {
    user: !item["user"] ? item["user"] : userDetailsSerializer(item["user"]),
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : partnerPropertiesSerializer(item["partnerProperties"]),
  };
}

/** The response of a OrganizationResource list operation. */
export interface _OrganizationResourceListResult {
  /** The OrganizationResource items on this page */
  value: OrganizationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _organizationResourceListResultDeserializer(
  item: any,
): _OrganizationResourceListResult {
  return {
    value: organizationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function organizationResourceArraySerializer(result: Array<OrganizationResource>): any[] {
  return result.map((item) => {
    return organizationResourceSerializer(item);
  });
}

export function organizationResourceArrayDeserializer(result: Array<OrganizationResource>): any[] {
  return result.map((item) => {
    return organizationResourceDeserializer(item);
  });
}

/** The MongoDB Atlas Project resource type. A project is a logical grouping of clusters within an organization. */
export interface Project extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProjectProperties;
}

export function projectSerializer(item: Project): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
  };
}

export function projectDeserializer(item: any): Project {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesDeserializer(item["properties"]),
  };
}

/** Properties specific to a MongoDB Atlas Project. */
export interface ProjectProperties {
  /** Atlas project id. */
  readonly projectId?: string;
  /** Atlas project name. */
  readonly projectName?: string;
  /** Atlas organization id. */
  readonly organizationId?: string;
  /** Number of clusters in the project. */
  readonly clusterCount?: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function projectPropertiesSerializer(_item: ProjectProperties): any {
  return {};
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    projectId: item["projectId"],
    projectName: item["projectName"],
    organizationId: item["organizationId"],
    clusterCount: item["clusterCount"],
    provisioningState: item["provisioningState"],
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

/** The response of a Project list operation. */
export interface _ProjectListResult {
  /** The Project items on this page */
  value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectListResultDeserializer(item: any): _ProjectListResult {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Response for tier limit check. */
export interface TierLimitReachedResponse {
  /** List of project limit statuses. */
  readonly limits: ProjectLimitStatus[];
}

export function tierLimitReachedResponseDeserializer(item: any): TierLimitReachedResponse {
  return {
    limits: projectLimitStatusArrayDeserializer(item["limits"]),
  };
}

export function projectLimitStatusArrayDeserializer(result: Array<ProjectLimitStatus>): any[] {
  return result.map((item) => {
    return projectLimitStatusDeserializer(item);
  });
}

/** Usage and limit status for a resource quota in a MongoDB Atlas project. */
export interface ProjectLimitStatus {
  /** Type of the limit. */
  type: ClusterTier;
  /** Maximum allowed value. */
  maximum: number;
  /** Current value. */
  current: number;
  /** Whether the limit has been reached. */
  isReached: boolean;
}

export function projectLimitStatusDeserializer(item: any): ProjectLimitStatus {
  return {
    type: item["type"],
    maximum: item["maximum"],
    current: item["current"],
    isReached: item["isReached"],
  };
}

/** Cluster tier options for MongoDB Atlas. */
export enum KnownClusterTier {
  /** Free tier cluster. */
  Free = "FREE",
  /** Flex tier cluster. */
  Flex = "FLEX",
  /** M10 tier cluster. */
  M10 = "M10",
  /** M30 tier cluster. */
  M30 = "M30",
}

/**
 * Cluster tier options for MongoDB Atlas. \
 * {@link KnownClusterTier} can be used interchangeably with ClusterTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FREE**: Free tier cluster. \
 * **FLEX**: Flex tier cluster. \
 * **M10**: M10 tier cluster. \
 * **M30**: M30 tier cluster.
 */
export type ClusterTier = string;

/** Response for regions by cluster tier. */
export interface RegionsByTierResponse {
  /** Atlas organization id. */
  readonly organizationId: string;
  /** Atlas project id. */
  readonly projectId: string;
  /** List of cluster tiers and their supported regions. */
  readonly regionsByTier: TierRegions[];
}

export function regionsByTierResponseDeserializer(item: any): RegionsByTierResponse {
  return {
    organizationId: item["organizationId"],
    projectId: item["projectId"],
    regionsByTier: tierRegionsArrayDeserializer(item["regionsByTier"]),
  };
}

export function tierRegionsArrayDeserializer(result: Array<TierRegions>): any[] {
  return result.map((item) => {
    return tierRegionsDeserializer(item);
  });
}

/** Cluster tier and its supported regions. */
export interface TierRegions {
  /** Cluster tier name. */
  tier: ClusterTier;
  /** Supported region names. */
  regions: string[];
}

export function tierRegionsDeserializer(item: any): TierRegions {
  return {
    tier: item["tier"],
    regions: item["regions"].map((p: any) => {
      return p;
    }),
  };
}

/** The MongoDB Atlas Cluster resource type. A cluster is a managed database deployment within a project. */
export interface Cluster extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ClusterProperties;
}

export function clusterSerializer(item: Cluster): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesSerializer(item["properties"]),
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
  };
}

/** Properties specific to a MongoDB Atlas Cluster. */
export interface ClusterProperties {
  /** Name of the MongoDB Atlas Cluster. */
  readonly clusterName?: string;
  /** Cluster tier (FREE, FLEX, M10, M30). */
  clusterTier: ClusterTier;
  /** Azure region where the cluster is deployed. */
  regionName: string;
  /** MongoDB version running on the cluster. */
  readonly mongoDbVersion?: string;
  /** Whether backups are active for the cluster; null if undetermined. */
  readonly backups?: boolean;
  /** Current state of the cluster. */
  readonly state?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return { clusterTier: item["clusterTier"], regionName: item["regionName"] };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    clusterName: item["clusterName"],
    clusterTier: item["clusterTier"],
    regionName: item["regionName"],
    mongoDbVersion: item["mongoDbVersion"],
    backups: item["backups"],
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
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

/** Supported versions for the MongoDB.Atlas resource model */
export enum KnownVersions {
  /** 2024-11-18 preview version */
  V20241118Preview = "2024-11-18-preview",
  /** 2025-06-01 version */
  V20250601 = "2025-06-01",
  /** 2026-03-01 preview version */
  V20260301Preview = "2026-03-01-preview",
}
