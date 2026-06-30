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

/** An Organization Resource by Informatica. */
export interface InformaticaOrganizationResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OrganizationProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function informaticaOrganizationResourceSerializer(
  item: InformaticaOrganizationResource,
): any {
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

export function informaticaOrganizationResourceDeserializer(
  item: any,
): InformaticaOrganizationResource {
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

/** Properties specific to the Informatica DataManagement Organization resource. */
export interface OrganizationProperties {
  /** Provisioning State of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Informatica Organization properties. */
  informaticaProperties?: InformaticaProperties;
  /** Marketplace details. */
  marketplaceDetails?: MarketplaceDetails;
  /** User details */
  userDetails?: UserDetails;
  /** Company details. */
  companyDetails?: CompanyDetails;
  /** Link Organization */
  linkOrganization?: LinkOrganization;
}

export function organizationPropertiesSerializer(item: OrganizationProperties): any {
  return {
    informaticaProperties: !item["informaticaProperties"]
      ? item["informaticaProperties"]
      : informaticaPropertiesSerializer(item["informaticaProperties"]),
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsSerializer(item["marketplaceDetails"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsSerializer(item["userDetails"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsSerializer(item["companyDetails"]),
    linkOrganization: !item["linkOrganization"]
      ? item["linkOrganization"]
      : linkOrganizationSerializer(item["linkOrganization"]),
  };
}

export function organizationPropertiesDeserializer(item: any): OrganizationProperties {
  return {
    provisioningState: item["provisioningState"],
    informaticaProperties: !item["informaticaProperties"]
      ? item["informaticaProperties"]
      : informaticaPropertiesDeserializer(item["informaticaProperties"]),
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsDeserializer(item["marketplaceDetails"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsDeserializer(item["userDetails"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsDeserializer(item["companyDetails"]),
    linkOrganization: !item["linkOrganization"]
      ? item["linkOrganization"]
      : linkOrganizationDeserializer(item["linkOrganization"]),
  };
}

/** Provisioning State of the Organization resource. */
export enum KnownProvisioningState {
  /** Organization resource creation request accepted */
  Accepted = "Accepted",
  /** Organization resource creation started */
  Creating = "Creating",
  /** Organization resource is being updated */
  Updating = "Updating",
  /** Organization resource deletion started */
  Deleting = "Deleting",
  /** Organization resource creation successful */
  Succeeded = "Succeeded",
  /** Organization resource creation failed */
  Failed = "Failed",
  /** Organization resource creation canceled */
  Canceled = "Canceled",
  /** Organization resource is deleted */
  Deleted = "Deleted",
  /** Organization resource state is unknown */
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning State of the Organization resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Organization resource creation request accepted \
 * **Creating**: Organization resource creation started \
 * **Updating**: Organization resource is being updated \
 * **Deleting**: Organization resource deletion started \
 * **Succeeded**: Organization resource creation successful \
 * **Failed**: Organization resource creation failed \
 * **Canceled**: Organization resource creation canceled \
 * **Deleted**: Organization resource is deleted \
 * **NotSpecified**: Organization resource state is unknown
 */
export type ProvisioningState = string;

/** Properties of the Informatica organization. */
export interface InformaticaProperties {
  /** Organization id */
  organizationId?: string;
  /** Organization name */
  organizationName?: string;
  /** Informatica organization region */
  informaticaRegion?: string;
  /** Single sing on URL for informatica organization */
  singleSignOnUrl?: string;
}

export function informaticaPropertiesSerializer(item: InformaticaProperties): any {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    informaticaRegion: item["informaticaRegion"],
    singleSignOnUrl: item["singleSignOnUrl"],
  };
}

export function informaticaPropertiesDeserializer(item: any): InformaticaProperties {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    informaticaRegion: item["informaticaRegion"],
    singleSignOnUrl: item["singleSignOnUrl"],
  };
}

/** Marketplace details. */
export interface MarketplaceDetails {
  /** Marketplace Subscription Id */
  marketplaceSubscriptionId?: string;
  /** Marketplace subscription status of a resource */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace offer details. */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    offerDetails: offerDetailsDeserializer(item["offerDetails"]),
  };
}

/** Marketplace subscription status of a resource. */
export enum KnownMarketplaceSubscriptionStatus {
  /** Purchased but not yet activated */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace subscription is activated */
  Subscribe = "Subscribe",
  /** This state indicates that a customer's payment for the Marketplace service was not received */
  Suspend = "Suspend",
  /** Customer has cancelled the subscription */
  Unsubscribe = "Unsubscribe",
}

/**
 * Marketplace subscription status of a resource. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Purchased but not yet activated \
 * **Subscribe**: Marketplace subscription is activated \
 * **Suspend**: This state indicates that a customer's payment for the Marketplace service was not received \
 * **Unsubscribe**: Customer has cancelled the subscription
 */
export type MarketplaceSubscriptionStatus = string;

/** Details of the product offering. */
export interface OfferDetails {
  /** Id of the product publisher. */
  publisherId: string;
  /** Id of the product offering. */
  offerId: string;
  /** Id of the product offer plan. */
  planId: string;
  /** Name of the product offer plan. */
  planName: string;
  /** Offer plan term unit. */
  termUnit?: string;
  /** Offer plan term id. */
  termId: string;
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

/** User Info of Informatica Organization resource. */
export interface UserDetails {
  /** User first name. */
  firstName?: string;
  /** User last name. */
  lastName?: string;
  /** User email address. */
  emailAddress?: string;
  /** UPN of user */
  upn?: string;
  /** Phone number of the user used by for contacting them if needed */
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

/** Company Details. */
export interface CompanyDetails {
  /** company Name */
  companyName?: string;
  /** Office Address */
  officeAddress?: string;
  /** Country name */
  country?: string;
  /** Domain name */
  domain?: string;
  /** Business phone number */
  business?: string;
  /** Number Of Employees */
  numberOfEmployees?: number;
}

export function companyDetailsSerializer(item: CompanyDetails): any {
  return {
    companyName: item["companyName"],
    officeAddress: item["officeAddress"],
    country: item["country"],
    domain: item["domain"],
    business: item["business"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

export function companyDetailsDeserializer(item: any): CompanyDetails {
  return {
    companyName: item["companyName"],
    officeAddress: item["officeAddress"],
    country: item["country"],
    domain: item["domain"],
    business: item["business"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

/** Link Organization */
export interface LinkOrganization {
  /** Link organization token */
  token?: string;
}

export function linkOrganizationSerializer(item: LinkOrganization): any {
  return { token: item["token"] };
}

export function linkOrganizationDeserializer(item: any): LinkOrganization {
  return {
    token: item["token"],
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

/** The template for adding optional properties. */
export interface InformaticaOrganizationResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Patchable PropertieInformaticaOrganizationPropertiesUpdates of the Organization observability resource */
  properties?: OrganizationPropertiesCustomUpdate;
}

export function informaticaOrganizationResourceUpdateSerializer(
  item: InformaticaOrganizationResourceUpdate,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationPropertiesCustomUpdateSerializer(item["properties"]),
  };
}

/** Patchable Properties of the Informatica Organization resource */
export interface OrganizationPropertiesCustomUpdate {
  /** Informatica Organization properties */
  informaticaOrganizationProperties?: InformaticaOrganizationResourceUpdate;
  /** Marketplace details */
  marketplaceDetails?: MarketplaceDetailsUpdate;
  /** User details */
  userDetails?: UserDetailsUpdate;
  /** Company Details */
  companyDetails?: CompanyDetailsUpdate;
  /** Existing Resource Id */
  existingResourceId?: string;
}

export function organizationPropertiesCustomUpdateSerializer(
  item: OrganizationPropertiesCustomUpdate,
): any {
  return {
    informaticaOrganizationProperties: !item["informaticaOrganizationProperties"]
      ? item["informaticaOrganizationProperties"]
      : informaticaOrganizationResourceUpdateSerializer(item["informaticaOrganizationProperties"]),
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsUpdateSerializer(item["marketplaceDetails"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsUpdateSerializer(item["userDetails"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsUpdateSerializer(item["companyDetails"]),
    existingResourceId: item["existingResourceId"],
  };
}

/** Marketplace details */
export interface MarketplaceDetailsUpdate {
  /** Marketplace Subscription Id */
  marketplaceSubscriptionId?: string;
  /** Marketplace subscription status of a resource */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace offer details. */
  offerDetails?: OfferDetailsUpdate;
}

export function marketplaceDetailsUpdateSerializer(item: MarketplaceDetailsUpdate): any {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    offerDetails: !item["offerDetails"]
      ? item["offerDetails"]
      : offerDetailsUpdateSerializer(item["offerDetails"]),
  };
}

/** Details of the product offering */
export interface OfferDetailsUpdate {
  /** Id of the product publisher. */
  publisherId?: string;
  /** Id of the product offering. */
  offerId?: string;
  /** Id of the product offer plan. */
  planId?: string;
  /** Name of the product offer plan. */
  planName?: string;
  /** Offer plan term unit. */
  termUnit?: string;
  /** Offer plan term id. */
  termId?: string;
}

export function offerDetailsUpdateSerializer(item: OfferDetailsUpdate): any {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

/** User Info of Informatica Organization resource */
export interface UserDetailsUpdate {
  /** User first name. */
  firstName?: string;
  /** User last name. */
  lastName?: string;
  /** User email address. */
  emailAddress?: string;
  /** UPN of user */
  upn?: string;
  /** Phone number of the user used by for contacting them if needed */
  phoneNumber?: string;
}

export function userDetailsUpdateSerializer(item: UserDetailsUpdate): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
  };
}

/** Company details of Informatica Organization resource */
export interface CompanyDetailsUpdate {
  /** company Name */
  companyName?: string;
  /** Office Address */
  officeAddress?: string;
  /** Country name */
  country?: string;
  /** Domain name */
  domain?: string;
  /** Business phone number */
  business?: string;
  /** Number Of Employees */
  numberOfEmployees?: number;
}

export function companyDetailsUpdateSerializer(item: CompanyDetailsUpdate): any {
  return {
    companyName: item["companyName"],
    officeAddress: item["officeAddress"],
    country: item["country"],
    domain: item["domain"],
    business: item["business"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

/** The response of a InformaticaOrganizationResource list operation. */
export interface _InformaticaOrganizationResourceListResult {
  /** The InformaticaOrganizationResource items on this page */
  value: InformaticaOrganizationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _informaticaOrganizationResourceListResultDeserializer(
  item: any,
): _InformaticaOrganizationResourceListResult {
  return {
    value: informaticaOrganizationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function informaticaOrganizationResourceArraySerializer(
  result: Array<InformaticaOrganizationResource>,
): any[] {
  return result.map((item) => {
    return informaticaOrganizationResourceSerializer(item);
  });
}

export function informaticaOrganizationResourceArrayDeserializer(
  result: Array<InformaticaOrganizationResource>,
): any[] {
  return result.map((item) => {
    return informaticaOrganizationResourceDeserializer(item);
  });
}

/** Serverless Runtime environment Metadata response. */
export interface ServerlessMetadataResponse {
  /** type of the runtime environment. */
  type?: RuntimeType;
  /** serverless config properties */
  serverlessConfigProperties?: ServerlessConfigProperties;
  /** serverless runtime config properties */
  serverlessRuntimeConfigProperties?: ServerlessRuntimeConfigProperties;
}

export function serverlessMetadataResponseDeserializer(item: any): ServerlessMetadataResponse {
  return {
    type: item["type"],
    serverlessConfigProperties: !item["serverlessConfigProperties"]
      ? item["serverlessConfigProperties"]
      : serverlessConfigPropertiesDeserializer(item["serverlessConfigProperties"]),
    serverlessRuntimeConfigProperties: !item["serverlessRuntimeConfigProperties"]
      ? item["serverlessRuntimeConfigProperties"]
      : serverlessRuntimeConfigPropertiesDeserializer(item["serverlessRuntimeConfigProperties"]),
  };
}

/** Various types of the runtime types. */
export enum KnownRuntimeType {
  /** Serverless Runtime type */
  Serverless = "SERVERLESS",
}

/**
 * Various types of the runtime types. \
 * {@link KnownRuntimeType} can be used interchangeably with RuntimeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SERVERLESS**: Serverless Runtime type
 */
export type RuntimeType = string;

/** Metadata Serverless Config Properties */
export interface ServerlessConfigProperties {
  /** Platform types */
  platform?: PlatformType;
  /** List of application types supported by informatica */
  applicationTypes?: ApplicationTypeMetadata[];
  /** The list of compute units with possible array of values */
  computeUnits?: ComputeUnitsMetadata[];
  /** Serverless Runtime execution timeout */
  executionTimeout?: string;
  /** List of supported serverless informatica regions */
  regions?: RegionsMetadata[];
}

export function serverlessConfigPropertiesDeserializer(item: any): ServerlessConfigProperties {
  return {
    platform: item["platform"],
    applicationTypes: !item["applicationTypes"]
      ? item["applicationTypes"]
      : applicationTypeMetadataArrayDeserializer(item["applicationTypes"]),
    computeUnits: !item["computeUnits"]
      ? item["computeUnits"]
      : computeUnitsMetadataArrayDeserializer(item["computeUnits"]),
    executionTimeout: item["executionTimeout"],
    regions: !item["regions"] ? item["regions"] : regionsMetadataArrayDeserializer(item["regions"]),
  };
}

/** Various types of the Platform types. */
export enum KnownPlatformType {
  /** Azure platform type */
  Azure = "AZURE",
}

/**
 * Various types of the Platform types. \
 * {@link KnownPlatformType} can be used interchangeably with PlatformType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AZURE**: Azure platform type
 */
export type PlatformType = string;

export function applicationTypeMetadataArrayDeserializer(
  result: Array<ApplicationTypeMetadata>,
): any[] {
  return result.map((item) => {
    return applicationTypeMetadataDeserializer(item);
  });
}

/** Informatica Serverless Runtime Application type Metadata */
export interface ApplicationTypeMetadata {
  /** Application type name */
  name?: string;
  /** Application type value */
  value?: string;
}

export function applicationTypeMetadataDeserializer(item: any): ApplicationTypeMetadata {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function computeUnitsMetadataArrayDeserializer(result: Array<ComputeUnitsMetadata>): any[] {
  return result.map((item) => {
    return computeUnitsMetadataDeserializer(item);
  });
}

/** Informatica Serverless Runtime Application type Metadata */
export interface ComputeUnitsMetadata {
  /** ComputeUnit name */
  name?: string;
  /** ComputeUnit value */
  value?: string[];
}

export function computeUnitsMetadataDeserializer(item: any): ComputeUnitsMetadata {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function regionsMetadataArrayDeserializer(result: Array<RegionsMetadata>): any[] {
  return result.map((item) => {
    return regionsMetadataDeserializer(item);
  });
}

/** Informatica Serverless Runtime Regions Metadata */
export interface RegionsMetadata {
  /** Region Id */
  id?: string;
  /** Region name */
  name?: string;
}

export function regionsMetadataDeserializer(item: any): RegionsMetadata {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** Serverless Runtime config properties. */
export interface ServerlessRuntimeConfigProperties {
  /** The List of Informatica Serverless Runtime CDI Config Properties. */
  cdiConfigProps?: CdiConfigProps[];
  /** The List of Informatica Serverless Runtime CDIE Config Properties. */
  cdieConfigProps?: CdiConfigProps[];
}

export function serverlessRuntimeConfigPropertiesSerializer(
  item: ServerlessRuntimeConfigProperties,
): any {
  return {
    cdiConfigProps: !item["cdiConfigProps"]
      ? item["cdiConfigProps"]
      : cdiConfigPropsArraySerializer(item["cdiConfigProps"]),
    cdieConfigProps: !item["cdieConfigProps"]
      ? item["cdieConfigProps"]
      : cdiConfigPropsArraySerializer(item["cdieConfigProps"]),
  };
}

export function serverlessRuntimeConfigPropertiesDeserializer(
  item: any,
): ServerlessRuntimeConfigProperties {
  return {
    cdiConfigProps: !item["cdiConfigProps"]
      ? item["cdiConfigProps"]
      : cdiConfigPropsArrayDeserializer(item["cdiConfigProps"]),
    cdieConfigProps: !item["cdieConfigProps"]
      ? item["cdieConfigProps"]
      : cdiConfigPropsArrayDeserializer(item["cdieConfigProps"]),
  };
}

export function cdiConfigPropsArraySerializer(result: Array<CdiConfigProps>): any[] {
  return result.map((item) => {
    return cdiConfigPropsSerializer(item);
  });
}

export function cdiConfigPropsArrayDeserializer(result: Array<CdiConfigProps>): any[] {
  return result.map((item) => {
    return cdiConfigPropsDeserializer(item);
  });
}

/** Informatica CDI Configuration Properties. */
export interface CdiConfigProps {
  /** EngineName of the application config. */
  engineName: string;
  /** EngineVersion of the application config. */
  engineVersion: string;
  /** ApplicationConfigs of the CDI or CDIE. */
  applicationConfigs: ApplicationConfigs[];
}

export function cdiConfigPropsSerializer(item: CdiConfigProps): any {
  return {
    engineName: item["engineName"],
    engineVersion: item["engineVersion"],
    applicationConfigs: applicationConfigsArraySerializer(item["applicationConfigs"]),
  };
}

export function cdiConfigPropsDeserializer(item: any): CdiConfigProps {
  return {
    engineName: item["engineName"],
    engineVersion: item["engineVersion"],
    applicationConfigs: applicationConfigsArrayDeserializer(item["applicationConfigs"]),
  };
}

export function applicationConfigsArraySerializer(result: Array<ApplicationConfigs>): any[] {
  return result.map((item) => {
    return applicationConfigsSerializer(item);
  });
}

export function applicationConfigsArrayDeserializer(result: Array<ApplicationConfigs>): any[] {
  return result.map((item) => {
    return applicationConfigsDeserializer(item);
  });
}

/** Application configs */
export interface ApplicationConfigs {
  /** Type of the application config. */
  type: string;
  /** Name of the application config. */
  name: string;
  /** Value of the application config. */
  value: string;
  /** Platform type of the application config. */
  platform: string;
  /** Customized value of the application config. */
  customized: string;
  /** Default value of the application config. */
  defaultValue: string;
}

export function applicationConfigsSerializer(item: ApplicationConfigs): any {
  return {
    type: item["type"],
    name: item["name"],
    value: item["value"],
    platform: item["platform"],
    customized: item["customized"],
    defaultValue: item["defaultValue"],
  };
}

export function applicationConfigsDeserializer(item: any): ApplicationConfigs {
  return {
    type: item["type"],
    name: item["name"],
    value: item["value"],
    platform: item["platform"],
    customized: item["customized"],
    defaultValue: item["defaultValue"],
  };
}

/** A list of serverless runtime resources as fetched using the informatica APIs */
export interface InformaticaServerlessRuntimeResourceList {
  /** List of runtime resources for the fetch all API */
  informaticaRuntimeResources: InfaRuntimeResourceFetchMetaData[];
}

export function informaticaServerlessRuntimeResourceListDeserializer(
  item: any,
): InformaticaServerlessRuntimeResourceList {
  return {
    informaticaRuntimeResources: infaRuntimeResourceFetchMetaDataArrayDeserializer(
      item["informaticaRuntimeResources"],
    ),
  };
}

export function infaRuntimeResourceFetchMetaDataArrayDeserializer(
  result: Array<InfaRuntimeResourceFetchMetaData>,
): any[] {
  return result.map((item) => {
    return infaRuntimeResourceFetchMetaDataDeserializer(item);
  });
}

/** Informatica runtime resource metadata as received via the informatica fetch all runtime environments API */
export interface InfaRuntimeResourceFetchMetaData {
  /** Environment name */
  name: string;
  /** Created time */
  createdTime: string;
  /** Updated Time */
  updatedTime: string;
  /** Created by */
  createdBy: string;
  /** Last Updated by */
  updatedBy: string;
  /** Informatica serverless runtime id */
  id: string;
  /** Environment Type */
  type: RuntimeType;
  /** Status of the environment */
  status: string;
  /** Display message for the given status */
  statusLocalized: string;
  /** status message */
  statusMessage: string;
  /** Serverless Config Properties */
  serverlessConfigProperties: InfaServerlessFetchConfigProperties;
  /** Description of the runtime resource */
  description?: string;
}

export function infaRuntimeResourceFetchMetaDataDeserializer(
  item: any,
): InfaRuntimeResourceFetchMetaData {
  return {
    name: item["name"],
    createdTime: item["createdTime"],
    updatedTime: item["updatedTime"],
    createdBy: item["createdBy"],
    updatedBy: item["updatedBy"],
    id: item["id"],
    type: item["type"],
    status: item["status"],
    statusLocalized: item["statusLocalized"],
    statusMessage: item["statusMessage"],
    serverlessConfigProperties: infaServerlessFetchConfigPropertiesDeserializer(
      item["serverlessConfigProperties"],
    ),
    description: item["description"],
  };
}

/** InfaServerlessFetchConfigProperties for the fetch all serverless API as received from informatica API response */
export interface InfaServerlessFetchConfigProperties {
  /** subnet name */
  subnet?: string;
  /** applicationType name */
  applicationType?: string;
  /** Resource group name */
  resourceGroupName?: string;
  /** Advanced custom properties */
  advancedCustomProperties?: string;
  /** Supplementary File location */
  supplementaryFileLocation?: string;
  /** Serverless runtime data disks */
  serverlessRuntimeDataDisks?: ServerlessRuntimeDataDisk[];
  /** Serverless Account Platform */
  platform?: string;
  /** Tags for the resource */
  tags?: string;
  /** virtual network */
  vnet?: string;
  /** Execution timeout */
  executionTimeout?: string;
  /** Compute Units */
  computeUnits?: string;
  /** Tenant ID */
  tenantId?: string;
  /** subscription ID */
  subscriptionId?: string;
  /** region name for the runtime environment */
  region?: string;
  /** Serverless Arm Resource ID */
  serverlessArmResourceId?: string;
}

export function infaServerlessFetchConfigPropertiesDeserializer(
  item: any,
): InfaServerlessFetchConfigProperties {
  return {
    subnet: item["subnet"],
    applicationType: item["applicationType"],
    resourceGroupName: item["resourceGroupName"],
    advancedCustomProperties: item["advancedCustomProperties"],
    supplementaryFileLocation: item["supplementaryFileLocation"],
    serverlessRuntimeDataDisks: !item["serverlessRuntimeDataDisks"]
      ? item["serverlessRuntimeDataDisks"]
      : serverlessRuntimeDataDiskArrayDeserializer(item["serverlessRuntimeDataDisks"]),
    platform: item["platform"],
    tags: item["tags"],
    vnet: item["vnet"],
    executionTimeout: item["executionTimeout"],
    computeUnits: item["computeUnits"],
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    region: item["region"],
    serverlessArmResourceId: item["serverlessArmResourceId"],
  };
}

export function serverlessRuntimeDataDiskArraySerializer(
  result: Array<ServerlessRuntimeDataDisk>,
): any[] {
  return result.map((item) => {
    return serverlessRuntimeDataDiskSerializer(item);
  });
}

export function serverlessRuntimeDataDiskArrayDeserializer(
  result: Array<ServerlessRuntimeDataDisk>,
): any[] {
  return result.map((item) => {
    return serverlessRuntimeDataDiskDeserializer(item);
  });
}

/** Serverless Runtime Data Disk */
export interface ServerlessRuntimeDataDisk {
  /** Type of the data disk */
  type?: string;
  /** Server Host or IP Address */
  serverHostOrIpAddress?: string;
  /** Source mount point */
  sourceMount?: string;
  /** Target mount point */
  targetMount?: string;
  /** Mount options */
  mountOptions?: string;
}

export function serverlessRuntimeDataDiskSerializer(item: ServerlessRuntimeDataDisk): any {
  return {
    type: item["type"],
    serverHostOrIpAddress: item["serverHostOrIpAddress"],
    sourceMount: item["sourceMount"],
    targetMount: item["targetMount"],
    mountOptions: item["mountOptions"],
  };
}

export function serverlessRuntimeDataDiskDeserializer(item: any): ServerlessRuntimeDataDisk {
  return {
    type: item["type"],
    serverHostOrIpAddress: item["serverHostOrIpAddress"],
    sourceMount: item["sourceMount"],
    targetMount: item["targetMount"],
    mountOptions: item["mountOptions"],
  };
}

/** A Serverless Runtime environment  resource by Informatica. */
export interface InformaticaServerlessRuntimeResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: InformaticaServerlessRuntimeProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function informaticaServerlessRuntimeResourceSerializer(
  item: InformaticaServerlessRuntimeResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : informaticaServerlessRuntimePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function informaticaServerlessRuntimeResourceDeserializer(
  item: any,
): InformaticaServerlessRuntimeResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : informaticaServerlessRuntimePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Serverless Runtime properties. */
export interface InformaticaServerlessRuntimeProperties {
  /** Provisioning State of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** description of the serverless runtime. */
  description?: string;
  /** Platform type of the Serverless Runtime. */
  platform?: PlatformType;
  /** Application type of the Serverless Runtime environment. */
  applicationType?: ApplicationType;
  /** Compute units of the serverless runtime. */
  computeUnits?: string;
  /** Serverless Execution timeout */
  executionTimeout?: string;
  /** Serverless account creation location */
  serverlessAccountLocation: string;
  /** Informatica Serverless Network profile properties. */
  serverlessRuntimeNetworkProfile?: ServerlessRuntimeNetworkProfile;
  /** String KV pairs indicating Advanced custom properties. */
  advancedCustomProperties?: AdvancedCustomProperties[];
  /** Supplementary file location. */
  supplementaryFileLocation?: string;
  /** Serverless runtime data disks */
  serverlessRuntimeDataDisks?: ServerlessRuntimeDataDisk[];
  /** Serverless config properties */
  serverlessRuntimeConfig?: ServerlessRuntimeConfigProperties;
  /** Serverless Runtime Tags */
  serverlessRuntimeTags?: ServerlessRuntimeTag[];
  /** Serverless runtime user context properties */
  serverlessRuntimeUserContextProperties?: ServerlessRuntimeUserContextProperties;
}

export function informaticaServerlessRuntimePropertiesSerializer(
  item: InformaticaServerlessRuntimeProperties,
): any {
  return {
    description: item["description"],
    platform: item["platform"],
    applicationType: item["applicationType"],
    computeUnits: item["computeUnits"],
    executionTimeout: item["executionTimeout"],
    serverlessAccountLocation: item["serverlessAccountLocation"],
    serverlessRuntimeNetworkProfile: !item["serverlessRuntimeNetworkProfile"]
      ? item["serverlessRuntimeNetworkProfile"]
      : serverlessRuntimeNetworkProfileSerializer(item["serverlessRuntimeNetworkProfile"]),
    advancedCustomProperties: !item["advancedCustomProperties"]
      ? item["advancedCustomProperties"]
      : advancedCustomPropertiesArraySerializer(item["advancedCustomProperties"]),
    supplementaryFileLocation: item["supplementaryFileLocation"],
    serverlessRuntimeDataDisks: !item["serverlessRuntimeDataDisks"]
      ? item["serverlessRuntimeDataDisks"]
      : serverlessRuntimeDataDiskArraySerializer(item["serverlessRuntimeDataDisks"]),
    serverlessRuntimeConfig: !item["serverlessRuntimeConfig"]
      ? item["serverlessRuntimeConfig"]
      : serverlessRuntimeConfigPropertiesSerializer(item["serverlessRuntimeConfig"]),
    serverlessRuntimeTags: !item["serverlessRuntimeTags"]
      ? item["serverlessRuntimeTags"]
      : serverlessRuntimeTagArraySerializer(item["serverlessRuntimeTags"]),
    serverlessRuntimeUserContextProperties: !item["serverlessRuntimeUserContextProperties"]
      ? item["serverlessRuntimeUserContextProperties"]
      : serverlessRuntimeUserContextPropertiesSerializer(
          item["serverlessRuntimeUserContextProperties"],
        ),
  };
}

export function informaticaServerlessRuntimePropertiesDeserializer(
  item: any,
): InformaticaServerlessRuntimeProperties {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    platform: item["platform"],
    applicationType: item["applicationType"],
    computeUnits: item["computeUnits"],
    executionTimeout: item["executionTimeout"],
    serverlessAccountLocation: item["serverlessAccountLocation"],
    serverlessRuntimeNetworkProfile: !item["serverlessRuntimeNetworkProfile"]
      ? item["serverlessRuntimeNetworkProfile"]
      : serverlessRuntimeNetworkProfileDeserializer(item["serverlessRuntimeNetworkProfile"]),
    advancedCustomProperties: !item["advancedCustomProperties"]
      ? item["advancedCustomProperties"]
      : advancedCustomPropertiesArrayDeserializer(item["advancedCustomProperties"]),
    supplementaryFileLocation: item["supplementaryFileLocation"],
    serverlessRuntimeDataDisks: !item["serverlessRuntimeDataDisks"]
      ? item["serverlessRuntimeDataDisks"]
      : serverlessRuntimeDataDiskArrayDeserializer(item["serverlessRuntimeDataDisks"]),
    serverlessRuntimeConfig: !item["serverlessRuntimeConfig"]
      ? item["serverlessRuntimeConfig"]
      : serverlessRuntimeConfigPropertiesDeserializer(item["serverlessRuntimeConfig"]),
    serverlessRuntimeTags: !item["serverlessRuntimeTags"]
      ? item["serverlessRuntimeTags"]
      : serverlessRuntimeTagArrayDeserializer(item["serverlessRuntimeTags"]),
    serverlessRuntimeUserContextProperties: !item["serverlessRuntimeUserContextProperties"]
      ? item["serverlessRuntimeUserContextProperties"]
      : serverlessRuntimeUserContextPropertiesDeserializer(
          item["serverlessRuntimeUserContextProperties"],
        ),
  };
}

/** Various application types of the Serverless Runtime environments */
export enum KnownApplicationType {
  /** Data Integration */
  CDI = "CDI",
  /** Advanced Data Integration */
  Cdie = "CDIE",
}

/**
 * Various application types of the Serverless Runtime environments \
 * {@link KnownApplicationType} can be used interchangeably with ApplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CDI**: Data Integration \
 * **CDIE**: Advanced Data Integration
 */
export type ApplicationType = string;

/** Informatica Serverless Runtime Network Profile. */
export interface ServerlessRuntimeNetworkProfile {
  /** Network Interface Configuration Profile */
  networkInterfaceConfiguration: NetworkInterfaceConfiguration;
}

export function serverlessRuntimeNetworkProfileSerializer(
  item: ServerlessRuntimeNetworkProfile,
): any {
  return {
    networkInterfaceConfiguration: networkInterfaceConfigurationSerializer(
      item["networkInterfaceConfiguration"],
    ),
  };
}

export function serverlessRuntimeNetworkProfileDeserializer(
  item: any,
): ServerlessRuntimeNetworkProfile {
  return {
    networkInterfaceConfiguration: networkInterfaceConfigurationDeserializer(
      item["networkInterfaceConfiguration"],
    ),
  };
}

/** Informatica Serverless Runtime Network Interface configurations. */
export interface NetworkInterfaceConfiguration {
  /** Virtual network resource id */
  vnetId: string;
  /** Virtual network subnet resource id */
  subnetId: string;
  /** Virtual network resource guid */
  vnetResourceGuid?: string;
}

export function networkInterfaceConfigurationSerializer(item: NetworkInterfaceConfiguration): any {
  return {
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    vnetResourceGuid: item["vnetResourceGuid"],
  };
}

export function networkInterfaceConfigurationDeserializer(
  item: any,
): NetworkInterfaceConfiguration {
  return {
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    vnetResourceGuid: item["vnetResourceGuid"],
  };
}

export function advancedCustomPropertiesArraySerializer(
  result: Array<AdvancedCustomProperties>,
): any[] {
  return result.map((item) => {
    return advancedCustomPropertiesSerializer(item);
  });
}

export function advancedCustomPropertiesArrayDeserializer(
  result: Array<AdvancedCustomProperties>,
): any[] {
  return result.map((item) => {
    return advancedCustomPropertiesDeserializer(item);
  });
}

/** Informatica Serverless advanced custom properties */
export interface AdvancedCustomProperties {
  /** advanced custom properties key */
  key?: string;
  /** advanced custom properties value */
  value?: string;
}

export function advancedCustomPropertiesSerializer(item: AdvancedCustomProperties): any {
  return { key: item["key"], value: item["value"] };
}

export function advancedCustomPropertiesDeserializer(item: any): AdvancedCustomProperties {
  return {
    key: item["key"],
    value: item["value"],
  };
}

export function serverlessRuntimeTagArraySerializer(result: Array<ServerlessRuntimeTag>): any[] {
  return result.map((item) => {
    return serverlessRuntimeTagSerializer(item);
  });
}

export function serverlessRuntimeTagArrayDeserializer(result: Array<ServerlessRuntimeTag>): any[] {
  return result.map((item) => {
    return serverlessRuntimeTagDeserializer(item);
  });
}

/** Serverless Runtime Tags */
export interface ServerlessRuntimeTag {
  /** The name (also known as the key) of the tag. */
  name?: string;
  /** The value of the tag. */
  value?: string;
}

export function serverlessRuntimeTagSerializer(item: ServerlessRuntimeTag): any {
  return { name: item["name"], value: item["value"] };
}

export function serverlessRuntimeTagDeserializer(item: any): ServerlessRuntimeTag {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Informatica Serverless Runtime User context properties */
export interface ServerlessRuntimeUserContextProperties {
  /** User context token for OBO flow. */
  userContextToken: string;
}

export function serverlessRuntimeUserContextPropertiesSerializer(
  item: ServerlessRuntimeUserContextProperties,
): any {
  return { userContextToken: item["userContextToken"] };
}

export function serverlessRuntimeUserContextPropertiesDeserializer(
  item: any,
): ServerlessRuntimeUserContextProperties {
  return {
    userContextToken: item["userContextToken"],
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

/** The response of a InformaticaServerlessRuntimeResource list operation. */
export interface _InformaticaServerlessRuntimeResourceListResult {
  /** The InformaticaServerlessRuntimeResource items on this page */
  value: InformaticaServerlessRuntimeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _informaticaServerlessRuntimeResourceListResultDeserializer(
  item: any,
): _InformaticaServerlessRuntimeResourceListResult {
  return {
    value: informaticaServerlessRuntimeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function informaticaServerlessRuntimeResourceArraySerializer(
  result: Array<InformaticaServerlessRuntimeResource>,
): any[] {
  return result.map((item) => {
    return informaticaServerlessRuntimeResourceSerializer(item);
  });
}

export function informaticaServerlessRuntimeResourceArrayDeserializer(
  result: Array<InformaticaServerlessRuntimeResource>,
): any[] {
  return result.map((item) => {
    return informaticaServerlessRuntimeResourceDeserializer(item);
  });
}

/** The template for adding optional properties. */
export interface InformaticaServerlessRuntimeResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Patchable PropertieInformaticaOrganizationPropertiesUpdates of the Organization observability resource */
  properties?: ServerlessRuntimePropertiesCustomUpdate;
}

export function informaticaServerlessRuntimeResourceUpdateSerializer(
  item: InformaticaServerlessRuntimeResourceUpdate,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : serverlessRuntimePropertiesCustomUpdateSerializer(item["properties"]),
  };
}

/** Patchable Properties of the Informatica Serverless Runtime resource */
export interface ServerlessRuntimePropertiesCustomUpdate {
  /** description of the serverless runtime. */
  description?: string;
  /** Platform type of the Serverless Runtime. */
  platform?: PlatformType;
  /** Application type of the Serverless Runtime environment. */
  applicationType?: ApplicationType;
  /** Compute units of the serverless runtime. */
  computeUnits?: string;
  /** Serverless Execution timeout */
  executionTimeout?: string;
  /** Serverless account creation location */
  serverlessAccountLocation?: string;
  /** Informatica Serverless Network profile properties. */
  serverlessRuntimeNetworkProfile?: ServerlessRuntimeNetworkProfileUpdate;
  /** String KV pairs indicating Advanced custom properties. */
  advancedCustomProperties?: AdvancedCustomProperties[];
  /** Supplementary file location. */
  supplementaryFileLocation?: string;
  /** Serverless runtime data disks */
  serverlessRuntimeDataDisks?: ServerlessRuntimeDataDisk[];
  /** Serverless config properties */
  serverlessRuntimeConfig?: ServerlessRuntimeConfigPropertiesUpdate;
  /** Serverless Runtime Tags */
  serverlessRuntimeTags?: ServerlessRuntimeTag[];
  /** Serverless runtime user context properties */
  serverlessRuntimeUserContextProperties?: ServerlessRuntimeUserContextPropertiesUpdate;
}

export function serverlessRuntimePropertiesCustomUpdateSerializer(
  item: ServerlessRuntimePropertiesCustomUpdate,
): any {
  return {
    description: item["description"],
    platform: item["platform"],
    applicationType: item["applicationType"],
    computeUnits: item["computeUnits"],
    executionTimeout: item["executionTimeout"],
    serverlessAccountLocation: item["serverlessAccountLocation"],
    serverlessRuntimeNetworkProfile: !item["serverlessRuntimeNetworkProfile"]
      ? item["serverlessRuntimeNetworkProfile"]
      : serverlessRuntimeNetworkProfileUpdateSerializer(item["serverlessRuntimeNetworkProfile"]),
    advancedCustomProperties: !item["advancedCustomProperties"]
      ? item["advancedCustomProperties"]
      : advancedCustomPropertiesArraySerializer(item["advancedCustomProperties"]),
    supplementaryFileLocation: item["supplementaryFileLocation"],
    serverlessRuntimeDataDisks: !item["serverlessRuntimeDataDisks"]
      ? item["serverlessRuntimeDataDisks"]
      : serverlessRuntimeDataDiskArraySerializer(item["serverlessRuntimeDataDisks"]),
    serverlessRuntimeConfig: !item["serverlessRuntimeConfig"]
      ? item["serverlessRuntimeConfig"]
      : serverlessRuntimeConfigPropertiesUpdateSerializer(item["serverlessRuntimeConfig"]),
    serverlessRuntimeTags: !item["serverlessRuntimeTags"]
      ? item["serverlessRuntimeTags"]
      : serverlessRuntimeTagArraySerializer(item["serverlessRuntimeTags"]),
    serverlessRuntimeUserContextProperties: !item["serverlessRuntimeUserContextProperties"]
      ? item["serverlessRuntimeUserContextProperties"]
      : serverlessRuntimeUserContextPropertiesUpdateSerializer(
          item["serverlessRuntimeUserContextProperties"],
        ),
  };
}

/** Informatica Serverless Network profile properties update. */
export interface ServerlessRuntimeNetworkProfileUpdate {
  /** Network Interface Configuration Profile Update */
  networkInterfaceConfiguration: NetworkInterfaceConfigurationUpdate;
}

export function serverlessRuntimeNetworkProfileUpdateSerializer(
  item: ServerlessRuntimeNetworkProfileUpdate,
): any {
  return {
    networkInterfaceConfiguration: networkInterfaceConfigurationUpdateSerializer(
      item["networkInterfaceConfiguration"],
    ),
  };
}

export function serverlessRuntimeNetworkProfileUpdateDeserializer(
  item: any,
): ServerlessRuntimeNetworkProfileUpdate {
  return {
    networkInterfaceConfiguration: networkInterfaceConfigurationUpdateDeserializer(
      item["networkInterfaceConfiguration"],
    ),
  };
}

/** The template for adding optional properties. */
export interface NetworkInterfaceConfigurationUpdate {
  /** Virtual network resource id */
  vnetId?: string;
  /** Virtual network subnet resource id */
  subnetId?: string;
  /** Virtual network resource guid */
  vnetResourceGuid?: string;
}

export function networkInterfaceConfigurationUpdateSerializer(
  item: NetworkInterfaceConfigurationUpdate,
): any {
  return {
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    vnetResourceGuid: item["vnetResourceGuid"],
  };
}

export function networkInterfaceConfigurationUpdateDeserializer(
  item: any,
): NetworkInterfaceConfigurationUpdate {
  return {
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    vnetResourceGuid: item["vnetResourceGuid"],
  };
}

/** The template for adding optional properties. */
export interface ServerlessRuntimeConfigPropertiesUpdate {
  /** The List of Informatica Serverless Runtime CDI Config Properties. */
  cdiConfigProps?: CdiConfigProps[];
  /** The List of Informatica Serverless Runtime CDIE Config Properties. */
  cdieConfigProps?: CdiConfigProps[];
}

export function serverlessRuntimeConfigPropertiesUpdateSerializer(
  item: ServerlessRuntimeConfigPropertiesUpdate,
): any {
  return {
    cdiConfigProps: !item["cdiConfigProps"]
      ? item["cdiConfigProps"]
      : cdiConfigPropsArraySerializer(item["cdiConfigProps"]),
    cdieConfigProps: !item["cdieConfigProps"]
      ? item["cdieConfigProps"]
      : cdiConfigPropsArraySerializer(item["cdieConfigProps"]),
  };
}

/** The template for adding optional properties. */
export interface ServerlessRuntimeUserContextPropertiesUpdate {
  /** User context token for OBO flow. */
  userContextToken?: string;
}

export function serverlessRuntimeUserContextPropertiesUpdateSerializer(
  item: ServerlessRuntimeUserContextPropertiesUpdate,
): any {
  return { userContextToken: item["userContextToken"] };
}

/** Model for the check dependencies API for an informatica serverless runtime resource */
export interface CheckDependenciesResponse {
  /** Count of dependencies */
  count: number;
  /** id of resource */
  id: string;
  /** List of dependencies */
  references: ServerlessRuntimeDependency[];
}

export function checkDependenciesResponseDeserializer(item: any): CheckDependenciesResponse {
  return {
    count: item["count"],
    id: item["id"],
    references: serverlessRuntimeDependencyArrayDeserializer(item["references"]),
  };
}

export function serverlessRuntimeDependencyArrayDeserializer(
  result: Array<ServerlessRuntimeDependency>,
): any[] {
  return result.map((item) => {
    return serverlessRuntimeDependencyDeserializer(item);
  });
}

/** Dependency reference for a serverless runtime resource */
export interface ServerlessRuntimeDependency {
  /** Dependency ID */
  id: string;
  /** Application context ID */
  appContextId: string;
  /** Dependency path */
  path: string;
  /** document type */
  documentType: string;
  /** description of Dependency */
  description: string;
  /** Last Update Time */
  lastUpdatedTime: string;
}

export function serverlessRuntimeDependencyDeserializer(item: any): ServerlessRuntimeDependency {
  return {
    id: item["id"],
    appContextId: item["appContextId"],
    path: item["path"],
    documentType: item["documentType"],
    description: item["description"],
    lastUpdatedTime: item["lastUpdatedTime"],
  };
}

/** Enum representing the versions. */
export enum KnownVersions {
  /** The 2024-05-08 API version. */
  V20240508 = "2024-05-08",
  /** The 2025-11-27 API version. */
  V20251127 = "2025-11-27",
}
