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

/** A Commvault Cloud Account Resource */
export interface CloudAccount extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudAccountProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function cloudAccountSerializer(item: CloudAccount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudAccountPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function cloudAccountDeserializer(item: any): CloudAccount {
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
      : cloudAccountPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to Commvault Cloud Account resource */
export interface CloudAccountProperties {
  /** Marketplace details of the resource. */
  marketplace: MarketplaceDetails;
  /** Details of the user. */
  user: UserDetails;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** SSO URL for the Commvault Cloud Account */
  readonly ssoUrl?: string;
  /** The backup administrator principal provided during CCA create. Required on create (enforced by backend), ignored on update. */
  backupAdminOnCcaCreate?: EntityInfo;
  /** The multi-person authorization (MPA) administrator principal provided during CCA create. Required on create (enforced by backend), ignored on update. */
  multiPersonAuthorizationOnCcaCreate?: EntityInfo;
}

export function cloudAccountPropertiesSerializer(item: CloudAccountProperties): any {
  return {
    marketplace: marketplaceDetailsSerializer(item["marketplace"]),
    user: userDetailsSerializer(item["user"]),
    backupAdminOnCcaCreate: !item["backupAdminOnCcaCreate"]
      ? item["backupAdminOnCcaCreate"]
      : entityInfoSerializer(item["backupAdminOnCcaCreate"]),
    multiPersonAuthorizationOnCcaCreate: !item["multiPersonAuthorizationOnCcaCreate"]
      ? item["multiPersonAuthorizationOnCcaCreate"]
      : entityInfoSerializer(item["multiPersonAuthorizationOnCcaCreate"]),
  };
}

export function cloudAccountPropertiesDeserializer(item: any): CloudAccountProperties {
  return {
    marketplace: marketplaceDetailsDeserializer(item["marketplace"]),
    user: userDetailsDeserializer(item["user"]),
    provisioningState: item["provisioningState"],
    ssoUrl: item["ssoUrl"],
    backupAdminOnCcaCreate: !item["backupAdminOnCcaCreate"]
      ? item["backupAdminOnCcaCreate"]
      : entityInfoDeserializer(item["backupAdminOnCcaCreate"]),
    multiPersonAuthorizationOnCcaCreate: !item["multiPersonAuthorizationOnCcaCreate"]
      ? item["multiPersonAuthorizationOnCcaCreate"]
      : entityInfoDeserializer(item["multiPersonAuthorizationOnCcaCreate"]),
  };
}

/** Marketplace details for an organization */
export interface MarketplaceDetails {
  /** Azure subscription id for the the marketplace offer is purchased from */
  subscriptionId?: string;
  /** Marketplace subscription status */
  readonly subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace SaaS Resource Id */
  saasResourceId?: string;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionId: item["subscriptionId"],
    saasResourceId: item["saasResourceId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
    saasResourceId: item["saasResourceId"],
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
  planId?: string;
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
  firstName?: string;
  /** Last name of the user */
  lastName?: string;
  /** Email address of the user */
  emailAddress?: string;
  /** User's principal name */
  upn?: string;
  /** User's phone number */
  phoneNumber?: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
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

/** Information about an Entra entity (user or group) assigned to a role */
export interface EntityInfo {
  /** The unique identifier (UUID) of the Entra entity */
  id?: string;
  /** The display name of the Entra entity */
  displayName?: string;
  /** The type of entity - user or group */
  entityType?: EntityType;
}

export function entityInfoSerializer(item: EntityInfo): any {
  return { id: item["id"], displayName: item["displayName"], entityType: item["entityType"] };
}

export function entityInfoDeserializer(item: any): EntityInfo {
  return {
    id: item["id"],
    displayName: item["displayName"],
    entityType: item["entityType"],
  };
}

/** The type of the entity */
export enum KnownEntityType {
  /** The entity is an Entra user */
  User = "User",
  /** The entity is an Entra security group */
  Group = "Group",
}

/**
 * The type of the entity \
 * {@link KnownEntityType} can be used interchangeably with EntityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity is an Entra user \
 * **Group**: The entity is an Entra security group
 */
export type EntityType = string;

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

/** The type used for update operations of the CloudAccount. */
export interface CloudAccountUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudAccountUpdateProperties;
}

export function cloudAccountUpdateSerializer(item: CloudAccountUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudAccountUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the CloudAccount. */
export interface CloudAccountUpdateProperties {
  /** Marketplace details of the resource. */
  marketplace?: MarketplaceDetails;
  /** Details of the user. */
  user?: UserDetails;
}

export function cloudAccountUpdatePropertiesSerializer(item: CloudAccountUpdateProperties): any {
  return {
    marketplace: !item["marketplace"]
      ? item["marketplace"]
      : marketplaceDetailsSerializer(item["marketplace"]),
    user: !item["user"] ? item["user"] : userDetailsSerializer(item["user"]),
  };
}

/** The response of a CloudAccount list operation. */
export interface _CloudAccountListResult {
  /** The CloudAccount items on this page */
  value: CloudAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudAccountListResultDeserializer(item: any): _CloudAccountListResult {
  return {
    value: cloudAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudAccountArraySerializer(result: Array<CloudAccount>): any[] {
  return result.map((item) => {
    return cloudAccountSerializer(item);
  });
}

export function cloudAccountArrayDeserializer(result: Array<CloudAccount>): any[] {
  return result.map((item) => {
    return cloudAccountDeserializer(item);
  });
}

/** SaaS-related data properties */
export interface SaaSData {
  /** SaaS resource id */
  saaSResourceId?: string;
}

export function saaSDataSerializer(item: SaaSData): any {
  return { saaSResourceId: item["saaSResourceId"] };
}

/** Response of get latest linked SaaS resource operation */
export interface LatestLinkedSaaSResponse {
  /** SaaS resource id */
  saaSResourceId?: string;
  /** Flag indicating if the SaaS resource is hidden */
  isHiddenSaaS?: boolean;
}

export function latestLinkedSaaSResponseDeserializer(item: any): LatestLinkedSaaSResponse {
  return {
    saaSResourceId: item["saaSResourceId"],
    isHiddenSaaS: item["isHiddenSaaS"],
  };
}

/** SaaS guid for Activate and Validate SaaS Resource */
export interface ActivateSaaSParameterRequest {
  /** SaaS guid for Activate and Validate SaaS Resource */
  saaSGuid: string;
}

export function activateSaaSParameterRequestSerializer(item: ActivateSaaSParameterRequest): any {
  return { saaSGuid: item["saaSGuid"] };
}

/** Marketplace SaaS resource details. */
export interface SaaSResourceDetailsResponse extends ProxyResource {
  /** Id of the Marketplace SaaS Resource */
  saaSResourceId?: string;
}

export function saaSResourceDetailsResponseDeserializer(item: any): SaaSResourceDetailsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    saaSResourceId: item["saaSResourceId"],
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

/** A Commvault Storage Resource */
export interface Storage extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageProperties;
}

export function storageSerializer(item: Storage): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storagePropertiesSerializer(item["properties"]),
  };
}

export function storageDeserializer(item: any): Storage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storagePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Commvault Storage */
export interface StorageProperties {
  /** Location of the Commvault Storage */
  location: string;
  /** The type of Commvault Storage */
  storageType: StorageType;
  /** The vendor of Commvault Storage */
  vendor: Vendor;
  /** The class of Commvault Storage */
  class: StorageClassType;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function storagePropertiesSerializer(item: StorageProperties): any {
  return {
    location: item["location"],
    storageType: item["storageType"],
    vendor: item["vendor"],
    class: item["class"],
  };
}

export function storagePropertiesDeserializer(item: any): StorageProperties {
  return {
    location: item["location"],
    storageType: item["storageType"],
    vendor: item["vendor"],
    class: item["class"],
    provisioningState: item["provisioningState"],
  };
}

/** Storage Type of Commvault Storage */
export enum KnownStorageType {
  /** Air Gap Protect */
  AirGapProtect = "Air_Gap_Protect",
}

/**
 * Storage Type of Commvault Storage \
 * {@link KnownStorageType} can be used interchangeably with StorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Air_Gap_Protect**: Air Gap Protect
 */
export type StorageType = string;

/** Vendor of Commvault Storage */
export enum KnownVendor {
  /** Azure Blob Storage */
  AzureBlobStorage = "Azure_Blob_Storage",
}

/**
 * Vendor of Commvault Storage \
 * {@link KnownVendor} can be used interchangeably with Vendor,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure_Blob_Storage**: Azure Blob Storage
 */
export type Vendor = string;

/** Class of Commvault Storage */
export enum KnownStorageClassType {
  /** Cold storage class */
  Cool = "COLD",
  /** Hot storage class */
  Hot = "HOT",
}

/**
 * Class of Commvault Storage \
 * {@link KnownStorageClassType} can be used interchangeably with StorageClassType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **COLD**: Cold storage class \
 * **HOT**: Hot storage class
 */
export type StorageClassType = string;

/** The response of a Storage list operation. */
export interface _StorageListResult {
  /** The Storage items on this page */
  value: Storage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageListResultDeserializer(item: any): _StorageListResult {
  return {
    value: storageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageArraySerializer(result: Array<Storage>): any[] {
  return result.map((item) => {
    return storageSerializer(item);
  });
}

export function storageArrayDeserializer(result: Array<Storage>): any[] {
  return result.map((item) => {
    return storageDeserializer(item);
  });
}

/** A Commvault Plan Resource */
export interface CommvaultPlan extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PlanProperties;
}

export function commvaultPlanSerializer(item: CommvaultPlan): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : planPropertiesSerializer(item["properties"]),
  };
}

export function commvaultPlanDeserializer(item: any): CommvaultPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : planPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Commvault Plan */
export interface PlanProperties {
  /** Location of the Commvault Plan */
  location: string;
  /** The storage plans associated with the Commvault Plan */
  storagePlans: StoragePlan[];
  /** The Commvault Plan Schedule */
  schedules?: Schedule[];
  /** The Commvault Plan Retention */
  retention?: Retention;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function planPropertiesSerializer(item: PlanProperties): any {
  return {
    location: item["location"],
    storagePlans: storagePlanArraySerializer(item["storagePlans"]),
    schedules: !item["schedules"] ? item["schedules"] : scheduleArraySerializer(item["schedules"]),
    retention: !item["retention"] ? item["retention"] : retentionSerializer(item["retention"]),
  };
}

export function planPropertiesDeserializer(item: any): PlanProperties {
  return {
    location: item["location"],
    storagePlans: storagePlanArrayDeserializer(item["storagePlans"]),
    schedules: !item["schedules"]
      ? item["schedules"]
      : scheduleArrayDeserializer(item["schedules"]),
    retention: !item["retention"] ? item["retention"] : retentionDeserializer(item["retention"]),
    provisioningState: item["provisioningState"],
  };
}

export function storagePlanArraySerializer(result: Array<StoragePlan>): any[] {
  return result.map((item) => {
    return storagePlanSerializer(item);
  });
}

export function storagePlanArrayDeserializer(result: Array<StoragePlan>): any[] {
  return result.map((item) => {
    return storagePlanDeserializer(item);
  });
}

/** The properties of Commvault Storage Plan */
export interface StoragePlan {
  /** The name of the Storage resource */
  name: string;
  /** Id of the Storage Pool */
  storagePoolId?: string;
  /** Copy Name from Commvault */
  copyName?: string;
  /** Precedence of the Storage Plan, 1 is the highest precedence, 2 is the next highest, and so on */
  copyPrecedence?: number;
  /** Indicates the retention period valid only if the type of retention chosen in CUSTOM */
  retentionPeriod?: number;
  /** Indicates the retention timeframe valid only if the type of retention chosen in CUSTOM */
  retentionTime?: RetentionTime;
  /** Backup Rule Type */
  backupRuleType?: BackupRuleType;
  /** Extended Retention Policy */
  extendedRetention?: ExtendedRetentionTime[];
}

export function storagePlanSerializer(item: StoragePlan): any {
  return {
    name: item["name"],
    storagePoolId: item["storagePoolId"],
    copyName: item["copyName"],
    copyPrecedence: item["copyPrecedence"],
    retentionPeriod: item["retentionPeriod"],
    retentionTime: item["retentionTime"],
    backupRuleType: item["backupRuleType"],
    extendedRetention: !item["extendedRetention"]
      ? item["extendedRetention"]
      : extendedRetentionTimeArraySerializer(item["extendedRetention"]),
  };
}

export function storagePlanDeserializer(item: any): StoragePlan {
  return {
    name: item["name"],
    storagePoolId: item["storagePoolId"],
    copyName: item["copyName"],
    copyPrecedence: item["copyPrecedence"],
    retentionPeriod: item["retentionPeriod"],
    retentionTime: item["retentionTime"],
    backupRuleType: item["backupRuleType"],
    extendedRetention: !item["extendedRetention"]
      ? item["extendedRetention"]
      : extendedRetentionTimeArrayDeserializer(item["extendedRetention"]),
  };
}

/** The retention time for Commvault Plan */
export enum KnownRetentionTime {
  /** Monthly retention time */
  Monthly = "monthly",
  /** Yearly retention time */
  Yearly = "yearly",
}

/**
 * The retention time for Commvault Plan \
 * {@link KnownRetentionTime} can be used interchangeably with RetentionTime,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **monthly**: Monthly retention time \
 * **yearly**: Yearly retention time
 */
export type RetentionTime = string;

/** The type of backup rule */
export enum KnownBackupRuleType {
  /** All Jobs */
  AllJobs = "ALL_JOBS",
  /** All Fulls */
  AllFulls = "ALL_FULLS",
  /** Hourly Fulls */
  HourlyFulls = "HOURLY_FULLS",
  /** Daily Fulls */
  DailyFulls = "DAILY_FULLS",
  /** Weekly Fulls */
  WeeklyFulls = "WEEKLY_FULLS",
  /** Monthly Fulls */
  MonthlyFulls = "MONTHLY_FULLS",
  /** Yearly Fulls */
  YearlyFulls = "YEARLY_FULLS",
  /** Quarterly Fulls */
  QuarterlyFulls = "QUARTERLY_FULLS",
  /** Half Yearly Fulls */
  HalfYearlyFulls = "HALF_YEARLY_FULLS",
}

/**
 * The type of backup rule \
 * {@link KnownBackupRuleType} can be used interchangeably with BackupRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ALL_JOBS**: All Jobs \
 * **ALL_FULLS**: All Fulls \
 * **HOURLY_FULLS**: Hourly Fulls \
 * **DAILY_FULLS**: Daily Fulls \
 * **WEEKLY_FULLS**: Weekly Fulls \
 * **MONTHLY_FULLS**: Monthly Fulls \
 * **YEARLY_FULLS**: Yearly Fulls \
 * **QUARTERLY_FULLS**: Quarterly Fulls \
 * **HALF_YEARLY_FULLS**: Half Yearly Fulls
 */
export type BackupRuleType = string;

export function extendedRetentionTimeArraySerializer(result: Array<ExtendedRetentionTime>): any[] {
  return result.map((item) => {
    return extendedRetentionTimeSerializer(item);
  });
}

export function extendedRetentionTimeArrayDeserializer(
  result: Array<ExtendedRetentionTime>,
): any[] {
  return result.map((item) => {
    return extendedRetentionTimeDeserializer(item);
  });
}

/** Extended Retention Time */
export interface ExtendedRetentionTime {
  /** Retention time for Extended Retention */
  retentionTime?: RetentionTime;
  /** Retention period for Extended Retention */
  retentionPeriod?: number;
  /** Backup Rule Type for Extended Retention */
  backupRuleType?: BackupRuleType;
}

export function extendedRetentionTimeSerializer(item: ExtendedRetentionTime): any {
  return {
    retentionTime: item["retentionTime"],
    retentionPeriod: item["retentionPeriod"],
    backupRuleType: item["backupRuleType"],
  };
}

export function extendedRetentionTimeDeserializer(item: any): ExtendedRetentionTime {
  return {
    retentionTime: item["retentionTime"],
    retentionPeriod: item["retentionPeriod"],
    backupRuleType: item["backupRuleType"],
  };
}

export function scheduleArraySerializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleSerializer(item);
  });
}

export function scheduleArrayDeserializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleDeserializer(item);
  });
}

/** A Commvault Plan Schedule Model */
export interface Schedule {
  /** Type of Backup */
  backupType: BackUpType;
  /** Frequency of Retention */
  frequency?: Frequency;
  /** Interval of Retention */
  runsEvery?: number;
  /** Week of the month */
  weekOfMonth?: WeekOfMonth;
  /** Day of the week */
  dayOfWeek?: DayOfWeek;
  /** Month of the year */
  monthOfYear?: MonthOfYear;
  /** Day of the month */
  dayOfMonth?: number;
  /** Weekly Days List */
  weeklyDays?: WeeklyDays[];
  /** Time of Retention */
  time?: string;
  /** Time Zone */
  timeZone?: string;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    backupType: item["backupType"],
    frequency: item["frequency"],
    runsEvery: item["runsEvery"],
    weekOfMonth: item["weekOfMonth"],
    dayOfWeek: item["dayOfWeek"],
    monthOfYear: item["monthOfYear"],
    dayOfMonth: item["dayOfMonth"],
    weeklyDays: !item["weeklyDays"]
      ? item["weeklyDays"]
      : item["weeklyDays"].map((p: any) => {
          return p;
        }),
    time: item["time"],
    timeZone: item["timeZone"],
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    backupType: item["backupType"],
    frequency: item["frequency"],
    runsEvery: item["runsEvery"],
    weekOfMonth: item["weekOfMonth"],
    dayOfWeek: item["dayOfWeek"],
    monthOfYear: item["monthOfYear"],
    dayOfMonth: item["dayOfMonth"],
    weeklyDays: !item["weeklyDays"]
      ? item["weeklyDays"]
      : item["weeklyDays"].map((p: any) => {
          return p;
        }),
    time: item["time"],
    timeZone: item["timeZone"],
  };
}

/** The type of backup */
export enum KnownBackUpType {
  /** Incremental backup */
  Incremental = "INCREMENTAL",
  /** Full backup */
  Full = "FULL",
  /** Both incremental and full backups */
  Both = "BOTH",
}

/**
 * The type of backup \
 * {@link KnownBackUpType} can be used interchangeably with BackUpType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **INCREMENTAL**: Incremental backup \
 * **FULL**: Full backup \
 * **BOTH**: Both incremental and full backups
 */
export type BackUpType = string;

/** The frequency of backups */
export enum KnownFrequency {
  /** Daily backups */
  Daily = "daily",
  /** Weekly backups */
  Weekly = "weekly",
  /** Monthly backups */
  Monthly = "monthly",
  /** Yearly backups */
  Yearly = "yearly",
  /** Minutes backups */
  Minutes = "minutes",
}

/**
 * The frequency of backups \
 * {@link KnownFrequency} can be used interchangeably with Frequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **daily**: Daily backups \
 * **weekly**: Weekly backups \
 * **monthly**: Monthly backups \
 * **yearly**: Yearly backups \
 * **minutes**: Minutes backups
 */
export type Frequency = string;

/** The Week of Month Enum */
export enum KnownWeekOfMonth {
  /** First Week */
  First = "FIRST",
  /** Second Week */
  Second = "SECOND",
  /** Third Week */
  Third = "THIRD",
  /** Fourth Week */
  Fourth = "FOURTH",
  /** LAST Week */
  Last = "LAST",
}

/**
 * The Week of Month Enum \
 * {@link KnownWeekOfMonth} can be used interchangeably with WeekOfMonth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FIRST**: First Week \
 * **SECOND**: Second Week \
 * **THIRD**: Third Week \
 * **FOURTH**: Fourth Week \
 * **LAST**: LAST Week
 */
export type WeekOfMonth = string;

/** The Day of Week Enum */
export enum KnownDayOfWeek {
  /** First Day of the Week */
  Sunday = "SUNDAY",
  /** Second Day of the Week */
  Monday = "MONDAY",
  /** Third Day of the Week */
  Tuesday = "TUESDAY",
  /** Fourth Day of the Week */
  Wednesday = "WEDNESDAY",
  /** Fifth Day of the Week */
  Thursday = "THURSDAY",
  /** Sixth Day of the Week */
  Friday = "FRIDAY",
  /** Seventh Day of the Week */
  Saturday = "SATURDAY",
  /** Any Day of the week */
  Day = "DAY",
  /** Weekday Identifier */
  Weekday = "WEEKDAY",
  /** Weekend Identifier */
  WeekendDays = "WEEKEND_DAYS",
}

/**
 * The Day of Week Enum \
 * {@link KnownDayOfWeek} can be used interchangeably with DayOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUNDAY**: First Day of the Week \
 * **MONDAY**: Second Day of the Week \
 * **TUESDAY**: Third Day of the Week \
 * **WEDNESDAY**: Fourth Day of the Week \
 * **THURSDAY**: Fifth Day of the Week \
 * **FRIDAY**: Sixth Day of the Week \
 * **SATURDAY**: Seventh Day of the Week \
 * **DAY**: Any Day of the week \
 * **WEEKDAY**: Weekday Identifier \
 * **WEEKEND_DAYS**: Weekend Identifier
 */
export type DayOfWeek = string;

/** The Month of Year Enum */
export enum KnownMonthOfYear {
  /** First Month of the Year */
  January = "JANUARY",
  /** Second Month of the Year */
  February = "FEBRUARY",
  /** Third Month of the Year */
  March = "MARCH",
  /** Fourth Month of the Year */
  April = "APRIL",
  /** Fifth Month of the Year */
  May = "MAY",
  /** Sixth Month of the Year */
  June = "JUNE",
  /** Seventh Month of the Year */
  July = "JULY",
  /** Eighth Month of the Year */
  August = "AUGUST",
  /** Ninth Month of the Year */
  September = "SEPTEMBER",
  /** Tenth Month of the Year */
  October = "OCTOBER",
  /** Eleventh Month of the Year */
  November = "NOVEMBER",
  /** Twelfth Month of the Year */
  December = "DECEMBER",
}

/**
 * The Month of Year Enum \
 * {@link KnownMonthOfYear} can be used interchangeably with MonthOfYear,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JANUARY**: First Month of the Year \
 * **FEBRUARY**: Second Month of the Year \
 * **MARCH**: Third Month of the Year \
 * **APRIL**: Fourth Month of the Year \
 * **MAY**: Fifth Month of the Year \
 * **JUNE**: Sixth Month of the Year \
 * **JULY**: Seventh Month of the Year \
 * **AUGUST**: Eighth Month of the Year \
 * **SEPTEMBER**: Ninth Month of the Year \
 * **OCTOBER**: Tenth Month of the Year \
 * **NOVEMBER**: Eleventh Month of the Year \
 * **DECEMBER**: Twelfth Month of the Year
 */
export type MonthOfYear = string;

/** To represent the days of the week in Weekly type */
export enum KnownWeeklyDays {
  /** First Day of the Week */
  Sunday = "SUNDAY",
  /** Second Day of the Week */
  Monday = "MONDAY",
  /** Third Day of the Week */
  Tuesday = "TUESDAY",
  /** Fourth Day of the Week */
  Wednesday = "WEDNESDAY",
  /** Fifth Day of the Week */
  Thursday = "THURSDAY",
  /** Sixth Day of the Week */
  Friday = "FRIDAY",
  /** Seventh Day of the Week */
  Saturday = "SATURDAY",
}

/**
 * To represent the days of the week in Weekly type \
 * {@link KnownWeeklyDays} can be used interchangeably with WeeklyDays,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SUNDAY**: First Day of the Week \
 * **MONDAY**: Second Day of the Week \
 * **TUESDAY**: Third Day of the Week \
 * **WEDNESDAY**: Fourth Day of the Week \
 * **THURSDAY**: Fifth Day of the Week \
 * **FRIDAY**: Sixth Day of the Week \
 * **SATURDAY**: Seventh Day of the Week
 */
export type WeeklyDays = string;

/** A Commvault Plan Retention Model */
export interface Retention {
  /** Number of Snapshots */
  numberOfSnapshots?: number;
}

export function retentionSerializer(item: Retention): any {
  return { numberOfSnapshots: item["numberOfSnapshots"] };
}

export function retentionDeserializer(item: any): Retention {
  return {
    numberOfSnapshots: item["numberOfSnapshots"],
  };
}

/** The response of a CommvaultPlan list operation. */
export interface _CommvaultPlanListResult {
  /** The CommvaultPlan items on this page */
  value: CommvaultPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _commvaultPlanListResultDeserializer(item: any): _CommvaultPlanListResult {
  return {
    value: commvaultPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function commvaultPlanArraySerializer(result: Array<CommvaultPlan>): any[] {
  return result.map((item) => {
    return commvaultPlanSerializer(item);
  });
}

export function commvaultPlanArrayDeserializer(result: Array<CommvaultPlan>): any[] {
  return result.map((item) => {
    return commvaultPlanDeserializer(item);
  });
}

/** A Commvault Plan Resource */
export interface ProtectionGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProtectionGroupProperties;
}

export function protectionGroupSerializer(item: ProtectionGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectionGroupPropertiesSerializer(item["properties"]),
  };
}

export function protectionGroupDeserializer(item: any): ProtectionGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionGroupPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Commvault Protection Group */
export interface ProtectionGroupProperties {
  /** The datasource type of Commvault Protection Group */
  dataSourceType: "AzureVM";
  /** The Commvault Plan to be associated with the Protection Group */
  plan: string;
  /** The resources to be protected under Protection Group */
  resources: ProtectionGroupResources;
  /** The protection group schedule */
  readonly protectionStatus?: ProtectionStatus;
  /** The number of ProtectedItems under the Protection Group */
  readonly numberOfProtectedItems?: number;
  /** The Commvault Protection Group backup time */
  readonly lastBackUpTime?: number;
  /** The backup activity status indicating if backup is enabled or not on the protection group */
  readonly backupActivityStatus?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function protectionGroupPropertiesSerializer(item: ProtectionGroupProperties): any {
  return {
    dataSourceType: item["dataSourceType"],
    plan: item["plan"],
    resources: protectionGroupResourcesSerializer(item["resources"]),
  };
}

export function protectionGroupPropertiesDeserializer(item: any): ProtectionGroupProperties {
  return {
    dataSourceType: item["dataSourceType"],
    plan: item["plan"],
    resources: protectionGroupResourcesDeserializer(item["resources"]),
    protectionStatus: item["protectionStatus"],
    numberOfProtectedItems: item["numberOfProtectedItems"],
    lastBackUpTime: item["lastBackUpTime"],
    backupActivityStatus: item["backupActivityStatus"],
    provisioningState: item["provisioningState"],
  };
}

/** The resources to be protected under Protection Group */
export interface ProtectionGroupResources {
  /** The items to be protected under Protection Group */
  manual?: string[];
  /** Rules to match resources */
  matchRules?: {
    rules: Rule[];
    matchType: MatchType;
  };
}

export function protectionGroupResourcesSerializer(item: ProtectionGroupResources): any {
  return {
    manual: !item["manual"]
      ? item["manual"]
      : item["manual"].map((p: any) => {
          return p;
        }),
    matchRules: !item["matchRules"]
      ? item["matchRules"]
      : _protectionGroupResourcesMatchRulesSerializer(item["matchRules"]),
  };
}

export function protectionGroupResourcesDeserializer(item: any): ProtectionGroupResources {
  return {
    manual: !item["manual"]
      ? item["manual"]
      : item["manual"].map((p: any) => {
          return p;
        }),
    matchRules: !item["matchRules"]
      ? item["matchRules"]
      : _protectionGroupResourcesMatchRulesDeserializer(item["matchRules"]),
  };
}

/** model interface _ProtectionGroupResourcesMatchRules */
export interface _ProtectionGroupResourcesMatchRules {
  /** rules to match */
  rules: Rule[];
  /** match Type all or any */
  matchType: MatchType;
}

export function _protectionGroupResourcesMatchRulesSerializer(
  item: _ProtectionGroupResourcesMatchRules,
): any {
  return { rules: ruleArraySerializer(item["rules"]), matchType: item["matchType"] };
}

export function _protectionGroupResourcesMatchRulesDeserializer(
  item: any,
): _ProtectionGroupResourcesMatchRules {
  return {
    rules: ruleArrayDeserializer(item["rules"]),
    matchType: item["matchType"],
  };
}

export function ruleArraySerializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleSerializer(item);
  });
}

export function ruleArrayDeserializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleDeserializer(item);
  });
}

/** The rules to match resources */
export interface Rule {
  /** property of the rule */
  property: RuleProperty;
  /** property of the rule */
  operator: Operator;
  /** property of the rule */
  value: string;
}

export function ruleSerializer(item: Rule): any {
  return { property: item["property"], operator: item["operator"], value: item["value"] };
}

export function ruleDeserializer(item: any): Rule {
  return {
    property: item["property"],
    operator: item["operator"],
    value: item["value"],
  };
}

/** The Rule property */
export enum KnownRuleProperty {
  /** The resource group of the rule */
  ResourceGroup = "resourceGroup",
  /** The name of the rule */
  Name = "name",
  /** The tag name of the rule */
  TagName = "tagName",
  /** The tag value of the rule */
  TagValue = "tagValue",
  /** The region of the rule */
  Region = "region",
  /** The status of the rule */
  Status = "status",
}

/**
 * The Rule property \
 * {@link KnownRuleProperty} can be used interchangeably with RuleProperty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **resourceGroup**: The resource group of the rule \
 * **name**: The name of the rule \
 * **tagName**: The tag name of the rule \
 * **tagValue**: The tag value of the rule \
 * **region**: The region of the rule \
 * **status**: The status of the rule
 */
export type RuleProperty = string;

/** The types of operator */
export enum KnownOperator {
  /** The operator contains */
  Contains = "contains",
  /** The operator does not contains */
  DoesNotContains = "doesNotContains",
  /** The operator does not equal */
  DoesNotEqual = "doesNotEqual",
  /** The operator starts with */
  StartsWith = "startsWith",
  /** The operator ends with */
  EndsWith = "endsWith",
  /** The operator equals */
  Equals = "equals",
}

/**
 * The types of operator \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **contains**: The operator contains \
 * **doesNotContains**: The operator does not contains \
 * **doesNotEqual**: The operator does not equal \
 * **startsWith**: The operator starts with \
 * **endsWith**: The operator ends with \
 * **equals**: The operator equals
 */
export type Operator = string;

/** The match type */
export enum KnownMatchType {
  /** All rules should match */
  All = "all",
  /** Any rule should match */
  Any = "any",
}

/**
 * The match type \
 * {@link KnownMatchType} can be used interchangeably with MatchType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **all**: All rules should match \
 * **any**: Any rule should match
 */
export type MatchType = string;

/** The Protection Status */
export enum KnownProtectionStatus {
  /** The protection group status is All */
  All = "all",
  /** The protection group status is Protected */
  Protected = "protected",
  /** The protection group status is Not Protected */
  NotProtected = "not_protected",
  /** The protection group status is Pending */
  Pending = "pending",
  /** The protection group status is backed_up_with_error */
  BackedUpWithError = "backed_up_with_error",
  /** The protection group status is discovered */
  Discovered = "discovered",
}

/**
 * The Protection Status \
 * {@link KnownProtectionStatus} can be used interchangeably with ProtectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **all**: The protection group status is All \
 * **protected**: The protection group status is Protected \
 * **not_protected**: The protection group status is Not Protected \
 * **pending**: The protection group status is Pending \
 * **backed_up_with_error**: The protection group status is backed_up_with_error \
 * **discovered**: The protection group status is discovered
 */
export type ProtectionStatus = string;

/** The response of a ProtectionGroup list operation. */
export interface _ProtectionGroupListResult {
  /** The ProtectionGroup items on this page */
  value: ProtectionGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectionGroupListResultDeserializer(item: any): _ProtectionGroupListResult {
  return {
    value: protectionGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectionGroupArraySerializer(result: Array<ProtectionGroup>): any[] {
  return result.map((item) => {
    return protectionGroupSerializer(item);
  });
}

export function protectionGroupArrayDeserializer(result: Array<ProtectionGroup>): any[] {
  return result.map((item) => {
    return protectionGroupDeserializer(item);
  });
}

/** The properties of StopBackupProtectionGroupRequest */
export interface StopBackupProtectionGroupRequest {
  /** The reason for stopping the backup */
  reason: string;
  /** Any further comments */
  comment?: string;
}

export function stopBackupProtectionGroupRequestSerializer(
  item: StopBackupProtectionGroupRequest,
): any {
  return { reason: item["reason"], comment: item["comment"] };
}

/** The properties of RestoreProtectionItemRequest */
export interface RestoreProtectionItemRequest {
  /** Check whether inplace or out of place restore. */
  inPlaceRestore: boolean;
  /** Type of Restore */
  restoreType?: RestoreType;
  /** Time to restore */
  toTime?: string;
  /** The vm destination details of the VM. */
  vmDestinationInfo: VmDestinationInfo;
}

export function restoreProtectionItemRequestSerializer(item: RestoreProtectionItemRequest): any {
  return {
    inPlaceRestore: item["inPlaceRestore"],
    restoreType: item["restoreType"],
    toTime: item["toTime"],
    vmDestinationInfo: vmDestinationInfoSerializer(item["vmDestinationInfo"]),
  };
}

/** Types of Restore Supported */
export enum KnownRestoreType {
  /** Azure In place Restore */
  None = "NONE",
  /** Azure Out of Place */
  VirtualMachine = "VIRTUAL_MACHINE",
  /** Azure Attach disk restore to existing VM */
  DiskAttach = "DISK_ATTACH",
}

/**
 * Types of Restore Supported \
 * {@link KnownRestoreType} can be used interchangeably with RestoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NONE**: Azure In place Restore \
 * **VIRTUAL_MACHINE**: Azure Out of Place \
 * **DISK_ATTACH**: Azure Attach disk restore to existing VM
 */
export type RestoreType = string;

/** The properties of VmDestinationInfo */
export interface VmDestinationInfo {
  /** List of information on VMs */
  vmInfoList: VmInfo[];
}

export function vmDestinationInfoSerializer(item: VmDestinationInfo): any {
  return { vmInfoList: vmInfoArraySerializer(item["vmInfoList"]) };
}

export function vmInfoArraySerializer(result: Array<VmInfo>): any[] {
  return result.map((item) => {
    return vmInfoSerializer(item);
  });
}

/** The properties of information of a VM */
export interface VmInfo {
  /** The GUID of VM to be restored. */
  sourceVmGuid: string;
  /** The storage account to be used for restore. */
  storageAccountId: string;
  /** The identifier to check if VM needs to be powered on. */
  powerOnVmAfterRestore?: boolean;
  /** The name of the VM. */
  name?: string;
  /** The resource group of the VM. */
  resourceGroup?: string;
  /** The region of the VM. */
  region?: string;
  /** The network Id of the VM. */
  networkId?: string;
  /** The subnet Id of the VM. */
  subnetId?: string;
  /** The identifier to check if to attach and swap disk of the VM. */
  attachAndSwapOsDisk?: boolean;
  /** The GUID of target VM used in DISK ATTACH. */
  targetVmGuid?: string;
  /** The vmTag of the VM. */
  vmtags?: VmTag[];
}

export function vmInfoSerializer(item: VmInfo): any {
  return {
    sourceVmGuid: item["sourceVmGuid"],
    storageAccountId: item["storageAccountId"],
    powerOnVmAfterRestore: item["powerOnVmAfterRestore"],
    name: item["name"],
    resourceGroup: item["resourceGroup"],
    region: item["region"],
    networkId: item["networkId"],
    subnetId: item["subnetId"],
    attachAndSwapOsDisk: item["attachAndSwapOsDisk"],
    targetVmGuid: item["targetVmGuid"],
    vmtags: !item["vmtags"] ? item["vmtags"] : vmTagArraySerializer(item["vmtags"]),
  };
}

export function vmTagArraySerializer(result: Array<VmTag>): any[] {
  return result.map((item) => {
    return vmTagSerializer(item);
  });
}

/** The properties of VMTag for Restore Request */
export interface VmTag {
  /** The name of VM tag. */
  name: string;
  /** The value of VM tag. */
  value: string;
}

export function vmTagSerializer(item: VmTag): any {
  return { name: item["name"], value: item["value"] };
}

/** Restore resource response for a Protected Item */
export interface RestoreProtectionItemResponse {
  /** The Commvault response for taskId */
  readonly taskId: number;
  /** The jobIds returned from Commvault. */
  readonly jobIds: string[];
}

export function restoreProtectionItemResponseDeserializer(
  item: any,
): RestoreProtectionItemResponse {
  return {
    taskId: item["taskId"],
    jobIds: item["jobIds"].map((p: any) => {
      return p;
    }),
  };
}

/** The properties of BackupProtectionGroupRequest */
export interface BackupProtectionGroupRequest {
  /** The vm list details. */
  vmList: VmListItem[];
  /** The backup options for the VM backup */
  backupOptions: BackupOptions;
}

export function backupProtectionGroupRequestSerializer(item: BackupProtectionGroupRequest): any {
  return {
    vmList: vmListItemArraySerializer(item["vmList"]),
    backupOptions: backupOptionsSerializer(item["backupOptions"]),
  };
}

export function vmListItemArraySerializer(result: Array<VmListItem>): any[] {
  return result.map((item) => {
    return vmListItemSerializer(item);
  });
}

/** The VM list item for backup */
export interface VmListItem {
  /** The GUID of the VM to backup */
  vmGuid: string;
}

export function vmListItemSerializer(item: VmListItem): any {
  return { vmGuid: item["vmGuid"] };
}

/** The backup options for the VM backup */
export interface BackupOptions {
  /** Indicates whether to stop backup or not for the VM */
  backupLevel?: BackupLevel;
  /** The name of the backup job to be shown in Commvault */
  jobDescription: string;
  /** Indicates whether to run backup immediately or not for the VM */
  backupCopyImmediately: boolean;
  /** Indicates whether to run snapshot backup or not for the VM, if false, it will run regular backup */
  runSnapShotBackup: boolean;
  /** Indicates whether to notify the user on job completion */
  notifyUserOnJobCompletion: boolean;
}

export function backupOptionsSerializer(item: BackupOptions): any {
  return {
    backupLevel: item["backupLevel"],
    jobDescription: item["jobDescription"],
    backupCopyImmediately: item["backupCopyImmediately"],
    runSnapShotBackup: item["runSnapShotBackup"],
    notifyUserOnJobCompletion: item["notifyUserOnJobCompletion"],
  };
}

/** The level of backup */
export enum KnownBackupLevel {
  /** Full backup level */
  Full = "FULL",
  /** Incremental backup level */
  Incremental = "INCREMENTAL",
  /** Differential backup level */
  Differential = "DIFFERENTIAL",
  /** Synthetic full backup level */
  SyntheticFull = "SYNTHETIC_FULL",
}

/**
 * The level of backup \
 * {@link KnownBackupLevel} can be used interchangeably with BackupLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FULL**: Full backup level \
 * **INCREMENTAL**: Incremental backup level \
 * **DIFFERENTIAL**: Differential backup level \
 * **SYNTHETIC_FULL**: Synthetic full backup level
 */
export type BackupLevel = string;

/** Backup job response for a Protection Group */
export interface BackupProtectionGroupResponse {
  /** The Commvault response for taskId */
  readonly taskId: number;
  /** The jobIds returned from Commvault. */
  readonly jobIds: string[];
}

export function backupProtectionGroupResponseDeserializer(
  item: any,
): BackupProtectionGroupResponse {
  return {
    taskId: item["taskId"],
    jobIds: item["jobIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface ProtectedItem extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProtectedItemProperties;
}

export function protectedItemDeserializer(item: any): ProtectedItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Commvault Protected Item */
export interface ProtectedItemProperties {
  /** The Name of the commvault protected item */
  readonly resourceName: string;
  /** The Commvault Protected Item backup time */
  readonly lastBackUpTime: number;
  /** The resource group of the protected item */
  readonly resourceGroup: string;
  /** The location of the protected item */
  readonly location: string;
  /** The GUID of VM */
  readonly vmGuid: string;
}

export function protectedItemPropertiesDeserializer(item: any): ProtectedItemProperties {
  return {
    resourceName: item["resourceName"],
    lastBackUpTime: item["lastBackUpTime"],
    resourceGroup: item["resourceGroup"],
    location: item["location"],
    vmGuid: item["vmGuid"],
  };
}

/** The response of a ProtectedItem list operation. */
export interface _ProtectedItemListResult {
  /** The ProtectedItem items on this page */
  value: ProtectedItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectedItemListResultDeserializer(item: any): _ProtectedItemListResult {
  return {
    value: protectedItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectedItemArrayDeserializer(result: Array<ProtectedItem>): any[] {
  return result.map((item) => {
    return protectedItemDeserializer(item);
  });
}

/** Restore points of a Protected Item */
export interface RestorePoints {
  /** The Commvault Protected Item Restore points */
  readonly restoreTimes: number[];
}

export function restorePointsDeserializer(item: any): RestorePoints {
  return {
    restoreTimes: item["restoreTimes"].map((p: any) => {
      return p;
    }),
  };
}

/** Request to count protected items for the provided CCA resource IDs across subscriptions. */
export interface CountProtectedItemsRequest {
  /** The list of CCA resource IDs. */
  resourceIds: string[];
}

export function countProtectedItemsRequestSerializer(item: CountProtectedItemsRequest): any {
  return {
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Response for count protected items operation. */
export interface CountProtectedItemsResponse {
  /** The count of protected items. */
  count: string;
}

export function countProtectedItemsResponseDeserializer(item: any): CountProtectedItemsResponse {
  return {
    count: item["count"],
  };
}

/** A Commvault Role Mapping Resource. Singleton per Cloud Account - maps Entra security groups to Commvault roles for RBAC enforcement. */
export interface RoleMapping extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RoleMappingProperties;
}

export function roleMappingSerializer(item: RoleMapping): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : roleMappingPropertiesSerializer(item["properties"]),
  };
}

export function roleMappingDeserializer(item: any): RoleMapping {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : roleMappingPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Commvault Role Mapping */
export interface RoleMappingProperties {
  /** The list of role assignments mapping roles to Entra entities (users and groups) */
  roles?: RoleAssignment[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function roleMappingPropertiesSerializer(item: RoleMappingProperties): any {
  return { roles: !item["roles"] ? item["roles"] : roleAssignmentArraySerializer(item["roles"]) };
}

export function roleMappingPropertiesDeserializer(item: any): RoleMappingProperties {
  return {
    roles: !item["roles"] ? item["roles"] : roleAssignmentArrayDeserializer(item["roles"]),
    provisioningState: item["provisioningState"],
  };
}

export function roleAssignmentArraySerializer(result: Array<RoleAssignment>): any[] {
  return result.map((item) => {
    return roleAssignmentSerializer(item);
  });
}

export function roleAssignmentArrayDeserializer(result: Array<RoleAssignment>): any[] {
  return result.map((item) => {
    return roleAssignmentDeserializer(item);
  });
}

/** A role assignment mapping a Commvault role to one or more Entra entities (users or groups) */
export interface RoleAssignment {
  /** The name of the Commvault role */
  roleName?: RoleName;
  /** The Entra entities (users or groups) assigned to this role */
  entities?: EntityInfo[];
}

export function roleAssignmentSerializer(item: RoleAssignment): any {
  return {
    roleName: item["roleName"],
    entities: !item["entities"] ? item["entities"] : entityInfoArraySerializer(item["entities"]),
  };
}

export function roleAssignmentDeserializer(item: any): RoleAssignment {
  return {
    roleName: item["roleName"],
    entities: !item["entities"] ? item["entities"] : entityInfoArrayDeserializer(item["entities"]),
  };
}

/** Supported Commvault role names */
export enum KnownRoleName {
  /** Backup Administrator - full access to all resources */
  BackupAdmin = "BackupAdmin",
  /** Backup Operator - can manage resources but cannot delete storage or plans */
  BackupOperator = "BackupOperator",
  /** Backup User - can manage protection groups, read-only on plans and storage */
  BackupUser = "BackupUser",
  /** Security Administrator - can manage CCA enrollment and user management */
  SecurityAdmin = "SecurityAdmin",
  /** MPA Administrator - can authorize critical operations protected by MPA */
  MultiPersonAuthorization = "MultiPersonAuthorization",
}

/**
 * Supported Commvault role names \
 * {@link KnownRoleName} can be used interchangeably with RoleName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BackupAdmin**: Backup Administrator - full access to all resources \
 * **BackupOperator**: Backup Operator - can manage resources but cannot delete storage or plans \
 * **BackupUser**: Backup User - can manage protection groups, read-only on plans and storage \
 * **SecurityAdmin**: Security Administrator - can manage CCA enrollment and user management \
 * **MultiPersonAuthorization**: MPA Administrator - can authorize critical operations protected by MPA
 */
export type RoleName = string;

export function entityInfoArraySerializer(result: Array<EntityInfo>): any[] {
  return result.map((item) => {
    return entityInfoSerializer(item);
  });
}

export function entityInfoArrayDeserializer(result: Array<EntityInfo>): any[] {
  return result.map((item) => {
    return entityInfoDeserializer(item);
  });
}

/** The response of a RoleMapping list operation. */
export interface _RoleMappingListResult {
  /** The RoleMapping items on this page */
  value: RoleMapping[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleMappingListResultDeserializer(item: any): _RoleMappingListResult {
  return {
    value: roleMappingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleMappingArraySerializer(result: Array<RoleMapping>): any[] {
  return result.map((item) => {
    return roleMappingSerializer(item);
  });
}

export function roleMappingArrayDeserializer(result: Array<RoleMapping>): any[] {
  return result.map((item) => {
    return roleMappingDeserializer(item);
  });
}

/** Supported API versions for the Commvault.ContentStore resource provider. */
export enum KnownVersions {
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V1Preview = "2024-10-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V2Preview = "2025-01-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V3Preview = "2026-03-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V4Preview = "2026-05-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V5Preview = "2026-06-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v3_preview */
  V6Preview = "2026-06-02-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V7Preview = "2026-07-01-preview",
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview */
  V8Preview = "2026-07-03-preview",
}
