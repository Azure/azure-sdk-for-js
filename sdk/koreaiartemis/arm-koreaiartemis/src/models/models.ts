// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type {
  MarketplaceDetails,
  SingleSignOnType,
  SingleSignOnStates,
} from "./liftrBase/models.js";
import {
  marketplaceDetailsArraySerializer,
  marketplaceDetailsArrayDeserializer,
} from "./liftrBase/models.js";

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

/**
 * An Organization resource in the Kore.AgentPlatform provider.
 *
 * Top-level tracked ARM resource. Each Organization is provisioned with a default
 * Workspace atomically; additional Workspaces are managed via the
 * `createWorkspace` and `deleteWorkspace` actions defined below.
 */
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
  };
}

/** Properties of a Kore.AgentPlatform Organization. */
export interface OrganizationProperties {
  /** Partner-specific (Kore) Organization properties. */
  partnerProperties: OrganizationPartnerProperties;
  /** Azure customer profile metadata used by the partner for JIT provisioning. */
  user: UserDetails;
  /** Organization-tier company metadata. */
  companyDetails?: CompanyDetails;
  /** Single sign-on metadata returned by the partner after Organization creation. */
  readonly singleSignOn?: SingleSignOnProperties;
  /** Partner-issued identifier of the default Workspace for this Organization. */
  readonly defaultWorkspaceId?: string;
  /** Total count of Workspaces under this Organization. */
  readonly workspaceCount?: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function organizationPropertiesSerializer(item: OrganizationProperties): any {
  return {
    partnerProperties: organizationPartnerPropertiesSerializer(item["partnerProperties"]),
    user: userDetailsSerializer(item["user"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsSerializer(item["companyDetails"]),
  };
}

export function organizationPropertiesDeserializer(item: any): OrganizationProperties {
  return {
    partnerProperties: organizationPartnerPropertiesDeserializer(item["partnerProperties"]),
    user: userDetailsDeserializer(item["user"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsDeserializer(item["companyDetails"]),
    singleSignOn: !item["singleSignOn"]
      ? item["singleSignOn"]
      : singleSignOnPropertiesDeserializer(item["singleSignOn"]),
    defaultWorkspaceId: item["defaultWorkspaceId"],
    workspaceCount: item["workspaceCount"],
    provisioningState: item["provisioningState"],
  };
}

/** Partner-specific (Kore) properties for an Organization. */
export interface OrganizationPartnerProperties {
  /** Display name of the Organization on the partner side. */
  organizationName: string;
  /** Billing contact email address for the Organization. */
  billingEmail: string;
  /** Initial owner email for the Organization. JIT-provisioned by the partner if the user does not already exist. */
  ownerEmail: string;
  /**
   * Default Workspace created atomically with the Organization.
   * Required at create time and immutable thereafter.
   * After create, manage workspaces (including this default) via the standard
   * Workspace child resource operations.
   */
  defaultWorkspace: DefaultWorkspaceProperties;
  /** Partner-issued Organization identifier (e.g., "org_01..."). */
  readonly partnerResourceId?: string;
}

export function organizationPartnerPropertiesSerializer(item: OrganizationPartnerProperties): any {
  return {
    organizationName: item["organizationName"],
    billingEmail: item["billingEmail"],
    ownerEmail: item["ownerEmail"],
    defaultWorkspace: defaultWorkspacePropertiesSerializer(item["defaultWorkspace"]),
  };
}

export function organizationPartnerPropertiesDeserializer(
  item: any,
): OrganizationPartnerProperties {
  return {
    organizationName: item["organizationName"],
    billingEmail: item["billingEmail"],
    ownerEmail: item["ownerEmail"],
    defaultWorkspace: defaultWorkspacePropertiesDeserializer(item["defaultWorkspace"]),
    partnerResourceId: item["partnerResourceId"],
  };
}

/** Properties of the default Workspace created with the Organization. */
export interface DefaultWorkspaceProperties {
  /** Display name of the default Workspace. */
  name: string;
  /** Marketplace product selected for this Workspace. */
  product?: Product;
  /**
   * Azure Marketplace SaaS subscriptions linked to this Workspace.
   * At least one entry is required. Mutable to support Marketplace-driven
   * plan changes.
   */
  marketplaceDetails: MarketplaceDetails[];
}

export function defaultWorkspacePropertiesSerializer(item: DefaultWorkspaceProperties): any {
  return {
    name: item["name"],
    product: item["product"],
    marketplaceDetails: marketplaceDetailsArraySerializer(item["marketplaceDetails"]),
  };
}

export function defaultWorkspacePropertiesDeserializer(item: any): DefaultWorkspaceProperties {
  return {
    name: item["name"],
    product: item["product"],
    marketplaceDetails: marketplaceDetailsArrayDeserializer(item["marketplaceDetails"]),
  };
}

/** Marketplace product options available for a Workspace. */
export enum KnownProduct {
  /** AI for Work product. <!-- cspell:words aiforservice aiforwork --> */
  Aiforwork = "aiforwork",
  /** AI for Service product. */
  Aiforservice = "aiforservice",
}

/**
 * Marketplace product options available for a Workspace. \
 * {@link KnownProduct} can be used interchangeably with Product,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **aiforwork**: AI for Work product. <!-- cspell:words aiforservice aiforwork --> \
 * **aiforservice**: AI for Service product.
 */
export type Product = string;

/**
 * Azure customer profile metadata used by the partner for JIT provisioning.
 *
 * Composes the standard `LiftrBase.UserDetails` (firstName, lastName,
 * emailAddress, upn, phoneNumber) with Kore-specific extensions.
 */
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
  /** Alternate email address of the user. */
  alternateEmail?: string;
  /** Mailing or office address. */
  address?: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    alternateEmail: item["alternateEmail"],
    address: item["address"],
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    alternateEmail: item["alternateEmail"],
    address: item["address"],
  };
}

/** Organization-tier company metadata. */
export interface CompanyDetails {
  /** Company name. */
  companyName?: string;
  /** Office address of the company. */
  officeAddress?: string;
  /** Country or region of the company. */
  country?: string;
  /** Primary domain of the company. */
  domain?: string;
  /** Industry or line of business. */
  businessType?: string;
  /** Approximate number of employees. */
  numberOfEmployees?: number;
}

export function companyDetailsSerializer(item: CompanyDetails): any {
  return {
    companyName: item["companyName"],
    officeAddress: item["officeAddress"],
    country: item["country"],
    domain: item["domain"],
    businessType: item["businessType"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

export function companyDetailsDeserializer(item: any): CompanyDetails {
  return {
    companyName: item["companyName"],
    officeAddress: item["officeAddress"],
    country: item["country"],
    domain: item["domain"],
    businessType: item["businessType"],
    numberOfEmployees: item["numberOfEmployees"],
  };
}

/**
 * Single Sign-On metadata returned by the partner after Organization creation.
 *
 * Spreads the standard `LiftrBase.SingleSignOnPropertiesV2` shape
 * (`type`, `state`, `enterpriseAppId`, `url`, `aadDomains`).
 */
export interface SingleSignOnProperties {
  /** Type of Single Sign-On mechanism being used */
  type: SingleSignOnType;
  /** State of the Single Sign On for the resource */
  state?: SingleSignOnStates;
  /** AAD enterprise application Id used to setup SSO */
  enterpriseAppId?: string;
  /** URL for SSO to be used by the partner to redirect the user to their system */
  url?: string;
  /** List of AAD domains fetched from Microsoft Graph for user. */
  aadDomains?: string[];
}

export function singleSignOnPropertiesDeserializer(item: any): SingleSignOnProperties {
  return {
    type: item["type"],
    state: item["state"],
    enterpriseAppId: item["enterpriseAppId"],
    url: item["url"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
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

/** PATCH body for the Organization resource. */
export interface OrganizationResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties to update. */
  properties?: OrganizationPropertiesUpdate;
}

export function organizationResourceUpdateSerializer(item: OrganizationResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationPropertiesUpdateSerializer(item["properties"]),
  };
}

/** Mutable Organization properties (subset of OrganizationProperties). */
export interface OrganizationPropertiesUpdate {
  /** Partner-specific (Kore) Organization properties. */
  partnerProperties?: OrganizationPartnerPropertiesUpdate;
  /** Azure customer profile metadata. */
  user?: UserDetails;
  /** Organization-tier company metadata. */
  companyDetails?: CompanyDetails;
}

export function organizationPropertiesUpdateSerializer(item: OrganizationPropertiesUpdate): any {
  return {
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : organizationPartnerPropertiesUpdateSerializer(item["partnerProperties"]),
    user: !item["user"] ? item["user"] : userDetailsSerializer(item["user"]),
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsSerializer(item["companyDetails"]),
  };
}

/** Mutable partner properties for PATCH. */
export interface OrganizationPartnerPropertiesUpdate {
  /** Display name of the Organization on the partner side. */
  organizationName?: string;
  /** Billing contact email address for the Organization. */
  billingEmail?: string;
  /** Initial owner email for the Organization. */
  ownerEmail?: string;
}

export function organizationPartnerPropertiesUpdateSerializer(
  item: OrganizationPartnerPropertiesUpdate,
): any {
  return {
    organizationName: item["organizationName"],
    billingEmail: item["billingEmail"],
    ownerEmail: item["ownerEmail"],
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

/** Response containing all Workspaces in a Kore Organization. */
export interface ListWorkspacesResponse {
  /** Workspaces returned by Kore, including Liftr-managed and partner-managed Workspaces. */
  value: DiscoveredWorkspace[];
}

export function listWorkspacesResponseDeserializer(item: any): ListWorkspacesResponse {
  return {
    value: discoveredWorkspaceArrayDeserializer(item["value"]),
  };
}

export function discoveredWorkspaceArrayDeserializer(result: Array<DiscoveredWorkspace>): any[] {
  return result.map((item) => {
    return discoveredWorkspaceDeserializer(item);
  });
}

/** Workspace returned by the Organization listWorkspaces discovery action. */
export interface DiscoveredWorkspace {
  /** Partner-issued Workspace identifier. */
  partnerResourceId: string;
  /** Display name of the Workspace on the partner side. */
  name: string;
  /** Email address of the Workspace owner. */
  ownerEmail?: string;
  /** Indicates whether this is the default Workspace created with the Organization. */
  isDefault?: boolean;
  /** Lifecycle status of the Workspace as reported by the Kore partner. */
  status?: WorkspaceLifecycleStatus;
  /** Marketplace product selected for this Workspace. */
  product?: Product;
  /** Azure Marketplace SaaS subscriptions linked to this Workspace. */
  marketplaceDetails?: MarketplaceDetails[];
  /** Indicates whether the Workspace is managed as an ARM resource through Liftr. */
  isManagedByLiftr: boolean;
  /** ARM resource ID when the Workspace is managed through Liftr. */
  armResourceId?: string;
}

export function discoveredWorkspaceDeserializer(item: any): DiscoveredWorkspace {
  return {
    partnerResourceId: item["partnerResourceId"],
    name: item["name"],
    ownerEmail: item["ownerEmail"],
    isDefault: item["isDefault"],
    status: item["status"],
    product: item["product"],
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsArrayDeserializer(item["marketplaceDetails"]),
    isManagedByLiftr: item["isManagedByLiftr"],
    armResourceId: item["armResourceId"],
  };
}

/** Lifecycle status of a Workspace as reported by the Kore partner. */
export enum KnownWorkspaceLifecycleStatus {
  /** Workspace is active and operational. */
  Active = "active",
  /** Workspace is suspended; operations are blocked but resource is retained. */
  Suspended = "suspended",
  /** Workspace is archived (delete pending). */
  Archived = "archived",
}

/**
 * Lifecycle status of a Workspace as reported by the Kore partner. \
 * {@link KnownWorkspaceLifecycleStatus} can be used interchangeably with WorkspaceLifecycleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Workspace is active and operational. \
 * **suspended**: Workspace is suspended; operations are blocked but resource is retained. \
 * **archived**: Workspace is archived (delete pending).
 */
export type WorkspaceLifecycleStatus = string;

/** SaaS guid & PublisherId for Activate and Validate SaaS Resource. */
export interface ActivateSaaSParameterRequest {
  /** SaaS subscription identifier (GUID) issued by the Azure Marketplace fulfillment API. */
  saasGuid: string;
  /** Publisher Id for the marketplace offer. */
  publisherId: string;
}

export function activateSaaSParameterRequestSerializer(item: ActivateSaaSParameterRequest): any {
  return { saasGuid: item["saasGuid"], publisherId: item["publisherId"] };
}

/** Marketplace SaaS resource details. */
export interface SaaSResourceDetailsResponse extends ProxyResource {
  /** SaaS subscription identifier (GUID) issued by the Azure Marketplace fulfillment API for the activated SaaS resource. */
  saasId?: string;
}

export function saaSResourceDetailsResponseDeserializer(item: any): SaaSResourceDetailsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    saasId: item["saasId"],
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

/**
 * A Workspace resource in the Kore.AgentPlatform provider.
 *
 * Child proxy resource type under an Organization. Workspaces are not tracked
 * (no `location`/`tags`). Lifecycle is managed through the standard ARM verbs
 * on the child URL:
 *
 * - PUT    .../organizations/{org}/workspaces/{workspaceName}  (create or update)
 * - DELETE .../organizations/{org}/workspaces/{workspaceName}
 * - GET    .../organizations/{org}/workspaces/{workspaceName}
 * - GET    .../organizations/{org}/workspaces                  (list by parent)
 *
 * A default Workspace is also provisioned atomically when the parent
 * Organization is created (see `OrganizationProperties.defaultWorkspace`);
 * additional Workspaces are managed via the operations defined here.
 */
export interface WorkspaceResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceProperties;
}

export function workspaceResourceSerializer(item: WorkspaceResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
  };
}

export function workspaceResourceDeserializer(item: any): WorkspaceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Kore.AgentPlatform Workspace. */
export interface WorkspaceProperties {
  /** Marketplace product selected for this Workspace. */
  product?: Product;
  /**
   * Azure Marketplace SaaS subscriptions linked to this Workspace.
   * At least one entry is required. Mutable to support Marketplace-driven
   * plan changes.
   */
  marketplaceDetails: MarketplaceDetails[];
  /** Partner-specific (Kore) Workspace properties. */
  partnerProperties: WorkspacePartnerProperties;
  /** Indicates whether this is the default Workspace created with the Organization. */
  readonly isDefault?: boolean;
  /** Lifecycle status of the Workspace as reported by the Kore partner. */
  readonly status?: WorkspaceLifecycleStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    product: item["product"],
    marketplaceDetails: marketplaceDetailsArraySerializer(item["marketplaceDetails"]),
    partnerProperties: workspacePartnerPropertiesSerializer(item["partnerProperties"]),
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    product: item["product"],
    marketplaceDetails: marketplaceDetailsArrayDeserializer(item["marketplaceDetails"]),
    partnerProperties: workspacePartnerPropertiesDeserializer(item["partnerProperties"]),
    isDefault: item["isDefault"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

/** Partner-specific (Kore) properties for a Workspace. */
export interface WorkspacePartnerProperties {
  /** Display name of the Workspace on the partner side. */
  name: string;
  /** Email address of the Workspace owner. */
  ownerEmail?: string;
  /** Partner-issued Workspace identifier (e.g., "ws_01..."). */
  readonly partnerResourceId?: string;
}

export function workspacePartnerPropertiesSerializer(item: WorkspacePartnerProperties): any {
  return { name: item["name"], ownerEmail: item["ownerEmail"] };
}

export function workspacePartnerPropertiesDeserializer(item: any): WorkspacePartnerProperties {
  return {
    name: item["name"],
    ownerEmail: item["ownerEmail"],
    partnerResourceId: item["partnerResourceId"],
  };
}

/** The response of a WorkspaceResource list operation. */
export interface _WorkspaceResourceListResult {
  /** The WorkspaceResource items on this page */
  value: WorkspaceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceResourceListResultDeserializer(item: any): _WorkspaceResourceListResult {
  return {
    value: workspaceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceResourceArraySerializer(result: Array<WorkspaceResource>): any[] {
  return result.map((item) => {
    return workspaceResourceSerializer(item);
  });
}

export function workspaceResourceArrayDeserializer(result: Array<WorkspaceResource>): any[] {
  return result.map((item) => {
    return workspaceResourceDeserializer(item);
  });
}

/** SaaS-related data properties. Contains the full list of SaaS resource IDs to link. */
export interface WorkspaceSaaSData {
  /** ARM resource IDs of the Microsoft.SaaS marketplace resources to link to this Workspace. */
  saaSResourceIds: string[];
}

export function workspaceSaaSDataSerializer(item: WorkspaceSaaSData): any {
  return {
    saaSResourceIds: item["saaSResourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Response containing the list of SaaS resources linked to the Workspace. */
export interface WorkspaceLinkedSaaSListResponse {
  /** List of SaaS resources linked to this Workspace. */
  value: WorkspaceLinkedSaaSItem[];
}

export function workspaceLinkedSaaSListResponseDeserializer(
  item: any,
): WorkspaceLinkedSaaSListResponse {
  return {
    value: workspaceLinkedSaaSItemArrayDeserializer(item["value"]),
  };
}

export function workspaceLinkedSaaSItemArrayDeserializer(
  result: Array<WorkspaceLinkedSaaSItem>,
): any[] {
  return result.map((item) => {
    return workspaceLinkedSaaSItemDeserializer(item);
  });
}

/** Individual SaaS resource linked to the Workspace. */
export interface WorkspaceLinkedSaaSItem {
  /** ARM resource ID of the Microsoft.SaaS marketplace resource linked to this Workspace. */
  saaSResourceId: string;
  /** Flag indicating if the SaaS resource is hidden. */
  isHiddenSaaS?: boolean;
}

export function workspaceLinkedSaaSItemDeserializer(item: any): WorkspaceLinkedSaaSItem {
  return {
    saaSResourceId: item["saaSResourceId"],
    isHiddenSaaS: item["isHiddenSaaS"],
  };
}

/** Complete Workspace details returned by Kore. */
export interface WorkspaceDetail {
  /** Partner-issued Workspace identifier. */
  id: string;
  /** Full Azure resource ID of the Workspace. */
  azureResourceId: string;
  /** Partner-issued identifier of the parent Organization. */
  organizationId: string;
  /** Partner-specific fields returned by the Workspace details action. */
  partnerProperties: WorkspaceDetailPartnerProperties;
  /** Lifecycle status of the Workspace. */
  status: WorkspaceLifecycleStatus;
  /** Projects under the Workspace. */
  projects: WorkspaceProject[];
  /** Time when the partner Workspace was created, as reported by Kore. This is distinct from ARM-managed `systemData.createdAt`. */
  createdAt: Date;
  /** Time when the partner Workspace was last updated, as reported by Kore. This is distinct from ARM-managed `systemData.lastModifiedAt`. */
  updatedAt: Date;
}

export function workspaceDetailDeserializer(item: any): WorkspaceDetail {
  return {
    id: item["id"],
    azureResourceId: item["azureResourceId"],
    organizationId: item["organizationId"],
    partnerProperties: workspaceDetailPartnerPropertiesDeserializer(item["partnerProperties"]),
    status: item["status"],
    projects: workspaceProjectArrayDeserializer(item["projects"]),
    createdAt: new Date(item["createdAt"]),
    updatedAt: new Date(item["updatedAt"]),
  };
}

/** Partner-specific fields returned by the Workspace details action. */
export interface WorkspaceDetailPartnerProperties {
  /** Workspace display name. */
  name: string;
  /** Email address of the Workspace owner. */
  ownerEmail: string;
  /** Conversation retention period in days. Valid values are 1 through 365. */
  retentionDays: number;
  /** Indicates whether this is the Organization's default Workspace. */
  default: boolean;
  /** Marketplace SaaS subscriptions owned by the Workspace. */
  marketplaceDetails: WorkspaceMarketplaceDetails[];
}

export function workspaceDetailPartnerPropertiesDeserializer(
  item: any,
): WorkspaceDetailPartnerProperties {
  return {
    name: item["name"],
    ownerEmail: item["ownerEmail"],
    retentionDays: item["retentionDays"],
    default: item["default"],
    marketplaceDetails: workspaceMarketplaceDetailsArrayDeserializer(item["marketplaceDetails"]),
  };
}

export function workspaceMarketplaceDetailsArrayDeserializer(
  result: Array<WorkspaceMarketplaceDetails>,
): any[] {
  return result.map((item) => {
    return workspaceMarketplaceDetailsDeserializer(item);
  });
}

/** Marketplace SaaS subscription details returned by Kore. */
export interface WorkspaceMarketplaceDetails {
  /** Azure resource ID of the Marketplace SaaS resource. */
  resourceId: string;
  /** Globally unique Marketplace SaaS identifier used for billing. */
  mpId: string;
  /** Plan identifier within the Marketplace offer. */
  planId: string;
  /** Human-readable plan display name. */
  planName?: string;
  /** Marketplace offer identifier. */
  offerId: string;
  /** Publisher identifier from Partner Center. */
  publisherId?: string;
  /** Marketplace subscription term identifier. */
  termId?: string;
  /** Azure Marketplace fulfillment subscription status. */
  status?: WorkspaceMarketplaceStatus;
}

export function workspaceMarketplaceDetailsDeserializer(item: any): WorkspaceMarketplaceDetails {
  return {
    resourceId: item["resourceId"],
    mpId: item["mpId"],
    planId: item["planId"],
    planName: item["planName"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    termId: item["termId"],
    status: item["status"],
  };
}

/** Azure Marketplace fulfillment status reported by Kore. */
export enum KnownWorkspaceMarketplaceStatus {
  /** Fulfillment has not started. */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** The subscription is active. */
  Subscribed = "Subscribed",
  /** The subscription is suspended. */
  Suspended = "Suspended",
  /** The subscription is unsubscribed. */
  Unsubscribed = "Unsubscribed",
}

/**
 * Azure Marketplace fulfillment status reported by Kore. \
 * {@link KnownWorkspaceMarketplaceStatus} can be used interchangeably with WorkspaceMarketplaceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Fulfillment has not started. \
 * **Subscribed**: The subscription is active. \
 * **Suspended**: The subscription is suspended. \
 * **Unsubscribed**: The subscription is unsubscribed.
 */
export type WorkspaceMarketplaceStatus = string;

export function workspaceProjectArrayDeserializer(result: Array<WorkspaceProject>): any[] {
  return result.map((item) => {
    return workspaceProjectDeserializer(item);
  });
}

/** Project summary returned with complete Workspace details. */
export interface WorkspaceProject {
  /** Partner-issued Project identifier. */
  id: string;
  /** Project display name. */
  name: string;
  /** Project description. */
  description?: string;
  /** Email address of the user who created the Project. */
  createdBy: string;
  /** Lifecycle status of the Project. */
  status: WorkspaceProjectStatus;
  /** Number of agents in the Project. */
  agentCount: number;
  /** Time when the Project was created. */
  createdAt: Date;
  /** Time when the Project was last updated. */
  updatedAt: Date;
}

export function workspaceProjectDeserializer(item: any): WorkspaceProject {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    createdBy: item["createdBy"],
    status: item["status"],
    agentCount: item["agentCount"],
    createdAt: new Date(item["createdAt"]),
    updatedAt: new Date(item["updatedAt"]),
  };
}

/** Lifecycle status of a Workspace Project. */
export enum KnownWorkspaceProjectStatus {
  /** The Project is active. */
  Active = "active",
  /** The Project is under development. */
  InDevelopment = "in-development",
  /** The Project is deployed. */
  Deployed = "deployed",
  /** The Project is archived. */
  Archived = "archived",
}

/**
 * Lifecycle status of a Workspace Project. \
 * {@link KnownWorkspaceProjectStatus} can be used interchangeably with WorkspaceProjectStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: The Project is active. \
 * **in-development**: The Project is under development. \
 * **deployed**: The Project is deployed. \
 * **archived**: The Project is archived.
 */
export type WorkspaceProjectStatus = string;

/** Supported versions for the Kore.AgentPlatform resource model */
export enum KnownVersions {
  /** 2026-07-01 preview version */
  V20260701Preview = "2026-07-01-preview",
}
