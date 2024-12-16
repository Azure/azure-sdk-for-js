// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Organization Resource by Neon */
export interface OrganizationResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OrganizationProperties;
}

export function organizationResourceSerializer(item: OrganizationResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationPropertiesSerializer(item["properties"]),
  };
}

export function organizationResourceDeserializer(item: any): OrganizationResource {
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
      : organizationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties specific to Data Organization resource */
export interface OrganizationProperties {
  /** Marketplace details of the resource. */
  marketplaceDetails: MarketplaceDetails;
  /** Details of the user. */
  userDetails: UserDetails;
  /** Details of the company. */
  companyDetails: CompanyDetails;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Organization properties */
  partnerOrganizationProperties?: PartnerOrganizationProperties;
}

export function organizationPropertiesSerializer(item: OrganizationProperties): any {
  return {
    marketplaceDetails: marketplaceDetailsSerializer(item["marketplaceDetails"]),
    userDetails: userDetailsSerializer(item["userDetails"]),
    companyDetails: companyDetailsSerializer(item["companyDetails"]),
    partnerOrganizationProperties: !item["partnerOrganizationProperties"]
      ? item["partnerOrganizationProperties"]
      : partnerOrganizationPropertiesSerializer(item["partnerOrganizationProperties"]),
  };
}

export function organizationPropertiesDeserializer(item: any): OrganizationProperties {
  return {
    marketplaceDetails: marketplaceDetailsDeserializer(item["marketplaceDetails"]),
    userDetails: userDetailsDeserializer(item["userDetails"]),
    companyDetails: companyDetailsDeserializer(item["companyDetails"]),
    provisioningState: item["provisioningState"],
    partnerOrganizationProperties: !item["partnerOrganizationProperties"]
      ? item["partnerOrganizationProperties"]
      : partnerOrganizationPropertiesDeserializer(item["partnerOrganizationProperties"]),
  };
}

/** Marketplace details for an organization */
export interface MarketplaceDetails {
  /** SaaS subscription id for the the marketplace offer */
  subscriptionId?: string;
  /** Marketplace subscription status */
  subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
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
  /** Term Name for the marketplace offer */
  termUnit?: string;
  /** Term Id for the marketplace offer */
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

/** Company details for an organization */
export interface CompanyDetails {
  /** Company name */
  companyName?: string;
  /** Country name of the company */
  country?: string;
  /** Office address of the company */
  officeAddress?: string;
  /** Business phone number of the company */
  businessPhone?: string;
  /** Domain of the user */
  domain?: string;
  /** Number of employees in the company */
  numberOfEmployees?: number;
}

export function companyDetailsSerializer(item: CompanyDetails): any {
  return {
    companyName: item["companyName"],
    country: item["country"],
    officeAddress: item["officeAddress"],
    businessPhone: item["businessPhone"],
    domain: item["domain"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

export function companyDetailsDeserializer(item: any): CompanyDetails {
  return {
    companyName: item["companyName"],
    country: item["country"],
    officeAddress: item["officeAddress"],
    businessPhone: item["businessPhone"],
    domain: item["domain"],
    numberOfEmployees: item["numberOfEmployees"],
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

/** Properties specific to Partner's organization */
export interface PartnerOrganizationProperties {
  /** Organization Id in partner's system */
  organizationId?: string;
  /** Organization name in partner's system */
  organizationName: string;
  /** Single Sign On properties for the organization */
  singleSignOnProperties?: SingleSignOnProperties;
}

export function partnerOrganizationPropertiesSerializer(item: PartnerOrganizationProperties): any {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : singleSignOnPropertiesSerializer(item["singleSignOnProperties"]),
  };
}

export function partnerOrganizationPropertiesDeserializer(
  item: any,
): PartnerOrganizationProperties {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : singleSignOnPropertiesDeserializer(item["singleSignOnProperties"]),
  };
}

/** Properties specific to Single Sign On Resource */
export interface SingleSignOnProperties {
  /** State of the Single Sign On for the organization */
  singleSignOnState?: SingleSignOnStates;
  /** AAD enterprise application Id used to setup SSO */
  enterpriseAppId?: string;
  /** URL for SSO to be used by the partner to redirect the user to their system */
  singleSignOnUrl?: string;
  /** List of AAD domains fetched from Microsoft Graph for user. */
  aadDomains?: string[];
}

export function singleSignOnPropertiesSerializer(item: SingleSignOnProperties): any {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
  };
}

export function singleSignOnPropertiesDeserializer(item: any): SingleSignOnProperties {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
  };
}

/** Various states of the SSO resource */
export enum KnownSingleSignOnStates {
  /** Initial state of the SSO resource */
  Initial = "Initial",
  /** SSO is enabled for the organization */
  Enable = "Enable",
  /** SSO is disabled for the organization */
  Disable = "Disable",
}

/**
 * Various states of the SSO resource \
 * {@link KnownSingleSignOnStates} can be used interchangeably with SingleSignOnStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial**: Initial state of the SSO resource \
 * **Enable**: SSO is enabled for the organization \
 * **Disable**: SSO is disabled for the organization
 */
export type SingleSignOnStates = string;

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

/** Supported API versions for the Neon.Postgres resource provider. */
export enum KnownVersions {
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview, LiftrBase.Data.Versions.v1_preview */
  V1_Preview = "2024-08-01-preview",
}
