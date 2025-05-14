// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(
  item: any,
): _OperationListResult {
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
    display: !item["display"]
      ? item["display"]
      : operationDisplayDeserializer(item["display"]),
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
    error: !item["error"]
      ? item["error"]
      : errorDetailDeserializer(item["error"]),
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
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(
  result: Array<ErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(
  item: any,
): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(
  item: any,
): _ErrorAdditionalInfoInfo {
  return item;
}

/** Organization Resource by Neon */
export interface OrganizationResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OrganizationProperties;
}

export function organizationResourceSerializer(
  item: OrganizationResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : organizationPropertiesSerializer(item["properties"]),
  };
}

export function organizationResourceDeserializer(
  item: any,
): OrganizationResource {
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

/** Properties specific to Neon Organization resource */
export interface OrganizationProperties {
  /** Marketplace details of the resource. */
  marketplaceDetails: MarketplaceDetails;
  /** Details of the user. */
  userDetails: UserDetails;
  /** Details of the company. */
  companyDetails: CompanyDetails;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Neon Organization properties */
  partnerOrganizationProperties?: PartnerOrganizationProperties;
  /** Neon Project Properties */
  projectProperties?: ProjectProperties;
}

export function organizationPropertiesSerializer(
  item: OrganizationProperties,
): any {
  return {
    marketplaceDetails: marketplaceDetailsSerializer(
      item["marketplaceDetails"],
    ),
    userDetails: userDetailsSerializer(item["userDetails"]),
    companyDetails: companyDetailsSerializer(item["companyDetails"]),
    partnerOrganizationProperties: !item["partnerOrganizationProperties"]
      ? item["partnerOrganizationProperties"]
      : partnerOrganizationPropertiesSerializer(
          item["partnerOrganizationProperties"],
        ),
    projectProperties: !item["projectProperties"]
      ? item["projectProperties"]
      : projectPropertiesSerializer(item["projectProperties"]),
  };
}

export function organizationPropertiesDeserializer(
  item: any,
): OrganizationProperties {
  return {
    marketplaceDetails: marketplaceDetailsDeserializer(
      item["marketplaceDetails"],
    ),
    userDetails: userDetailsDeserializer(item["userDetails"]),
    companyDetails: companyDetailsDeserializer(item["companyDetails"]),
    provisioningState: item["provisioningState"],
    partnerOrganizationProperties: !item["partnerOrganizationProperties"]
      ? item["partnerOrganizationProperties"]
      : partnerOrganizationPropertiesDeserializer(
          item["partnerOrganizationProperties"],
        ),
    projectProperties: !item["projectProperties"]
      ? item["projectProperties"]
      : projectPropertiesDeserializer(item["projectProperties"]),
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

export function partnerOrganizationPropertiesSerializer(
  item: PartnerOrganizationProperties,
): any {
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

export function singleSignOnPropertiesSerializer(
  item: SingleSignOnProperties,
): any {
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

export function singleSignOnPropertiesDeserializer(
  item: any,
): SingleSignOnProperties {
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

/** Properties specific to Project */
export interface ProjectProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** Region where the project is created */
  regionId?: string;
  /** Data Storage bytes per hour for the project */
  storage?: number;
  /** Postgres version for the project */
  pgVersion?: number;
  /** The retention period for project history in seconds. */
  historyRetention?: number;
  /** Default endpoint settings for the project. */
  defaultEndpointSettings?: DefaultEndpointSettings;
  /** The Branch properties of the project. This is optional */
  branch?: BranchProperties;
  /** Roles associated with the project */
  roles?: NeonRoleProperties[];
  /** Neon Databases associated with the project */
  databases?: NeonDatabaseProperties[];
  /** Endpoints associated with the project */
  endpoints?: EndpointProperties[];
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    regionId: item["regionId"],
    storage: item["storage"],
    pgVersion: item["pgVersion"],
    historyRetention: item["historyRetention"],
    defaultEndpointSettings: !item["defaultEndpointSettings"]
      ? item["defaultEndpointSettings"]
      : defaultEndpointSettingsSerializer(item["defaultEndpointSettings"]),
    branch: !item["branch"]
      ? item["branch"]
      : branchPropertiesSerializer(item["branch"]),
    roles: !item["roles"]
      ? item["roles"]
      : neonRolePropertiesArraySerializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArraySerializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArraySerializer(item["endpoints"]),
  };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    regionId: item["regionId"],
    storage: item["storage"],
    pgVersion: item["pgVersion"],
    historyRetention: item["historyRetention"],
    defaultEndpointSettings: !item["defaultEndpointSettings"]
      ? item["defaultEndpointSettings"]
      : defaultEndpointSettingsDeserializer(item["defaultEndpointSettings"]),
    branch: !item["branch"]
      ? item["branch"]
      : branchPropertiesDeserializer(item["branch"]),
    roles: !item["roles"]
      ? item["roles"]
      : neonRolePropertiesArrayDeserializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArrayDeserializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArrayDeserializer(item["endpoints"]),
  };
}

export function attributesArraySerializer(result: Array<Attributes>): any[] {
  return result.map((item) => {
    return attributesSerializer(item);
  });
}

export function attributesArrayDeserializer(result: Array<Attributes>): any[] {
  return result.map((item) => {
    return attributesDeserializer(item);
  });
}

/** Additional attributes specific to Neon Resources */
export interface Attributes {
  /** Name of the attribute */
  name: string;
  /** Value of the attribute */
  value: string;
}

export function attributesSerializer(item: Attributes): any {
  return { name: item["name"], value: item["value"] };
}

export function attributesDeserializer(item: any): Attributes {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Default Endpoint Settings for the project. */
export interface DefaultEndpointSettings {
  /** Minimum compute units for autoscaling. */
  autoscalingLimitMinCu: number;
  /** Maximum compute units for autoscaling. */
  autoscalingLimitMaxCu: number;
}

export function defaultEndpointSettingsSerializer(
  item: DefaultEndpointSettings,
): any {
  return {
    autoscalingLimitMinCu: item["autoscalingLimitMinCu"],
    autoscalingLimitMaxCu: item["autoscalingLimitMaxCu"],
  };
}

export function defaultEndpointSettingsDeserializer(
  item: any,
): DefaultEndpointSettings {
  return {
    autoscalingLimitMinCu: item["autoscalingLimitMinCu"],
    autoscalingLimitMaxCu: item["autoscalingLimitMaxCu"],
  };
}

/** Properties specific to Branch */
export interface BranchProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the project this branch belongs to */
  projectId?: string;
  /** The ID of the parent branch */
  parentId?: string;
  /** Role name associated with the branch */
  roleName?: string;
  /** Database name associated with the branch */
  databaseName?: string;
  /** Roles associated with the branch */
  roles?: NeonRoleProperties[];
  /** Neon Databases associated with the branch */
  databases?: NeonDatabaseProperties[];
  /** Endpoints associated with the branch */
  endpoints?: EndpointProperties[];
}

export function branchPropertiesSerializer(item: BranchProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    projectId: item["projectId"],
    parentId: item["parentId"],
    roleName: item["roleName"],
    databaseName: item["databaseName"],
    roles: !item["roles"]
      ? item["roles"]
      : neonRolePropertiesArraySerializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArraySerializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArraySerializer(item["endpoints"]),
  };
}

export function branchPropertiesDeserializer(item: any): BranchProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    projectId: item["projectId"],
    parentId: item["parentId"],
    roleName: item["roleName"],
    databaseName: item["databaseName"],
    roles: !item["roles"]
      ? item["roles"]
      : neonRolePropertiesArrayDeserializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArrayDeserializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArrayDeserializer(item["endpoints"]),
  };
}

export function neonRolePropertiesArraySerializer(
  result: Array<NeonRoleProperties>,
): any[] {
  return result.map((item) => {
    return neonRolePropertiesSerializer(item);
  });
}

export function neonRolePropertiesArrayDeserializer(
  result: Array<NeonRoleProperties>,
): any[] {
  return result.map((item) => {
    return neonRolePropertiesDeserializer(item);
  });
}

/** Properties specific to Roles */
export interface NeonRoleProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the branch this role belongs to */
  branchId?: string;
  /** Permissions assigned to the role */
  permissions?: string[];
  /** Indicates whether the role has superuser privileges */
  isSuperUser?: boolean;
}

export function neonRolePropertiesSerializer(item: NeonRoleProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    branchId: item["branchId"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
    isSuperUser: item["isSuperUser"],
  };
}

export function neonRolePropertiesDeserializer(item: any): NeonRoleProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    branchId: item["branchId"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
    isSuperUser: item["isSuperUser"],
  };
}

export function neonDatabasePropertiesArraySerializer(
  result: Array<NeonDatabaseProperties>,
): any[] {
  return result.map((item) => {
    return neonDatabasePropertiesSerializer(item);
  });
}

export function neonDatabasePropertiesArrayDeserializer(
  result: Array<NeonDatabaseProperties>,
): any[] {
  return result.map((item) => {
    return neonDatabasePropertiesDeserializer(item);
  });
}

/** Properties specific to Databases */
export interface NeonDatabaseProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the branch this database belongs to */
  branchId?: string;
  /** The name of the role that owns the database */
  ownerName?: string;
}

export function neonDatabasePropertiesSerializer(
  item: NeonDatabaseProperties,
): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    branchId: item["branchId"],
    ownerName: item["ownerName"],
  };
}

export function neonDatabasePropertiesDeserializer(
  item: any,
): NeonDatabaseProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    branchId: item["branchId"],
    ownerName: item["ownerName"],
  };
}

export function endpointPropertiesArraySerializer(
  result: Array<EndpointProperties>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesSerializer(item);
  });
}

export function endpointPropertiesArrayDeserializer(
  result: Array<EndpointProperties>,
): any[] {
  return result.map((item) => {
    return endpointPropertiesDeserializer(item);
  });
}

/** Properties specific to Endpoints */
export interface EndpointProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the project this endpoint belongs to */
  projectId?: string;
  /** The ID of the branch this endpoint belongs to */
  branchId?: string;
  /** The type of the endpoint */
  endpointType?: EndpointType;
}

export function endpointPropertiesSerializer(item: EndpointProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    projectId: item["projectId"],
    branchId: item["branchId"],
    endpointType: item["endpointType"],
  };
}

export function endpointPropertiesDeserializer(item: any): EndpointProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    projectId: item["projectId"],
    branchId: item["branchId"],
    endpointType: item["endpointType"],
  };
}

/** The compute endpoint type. Either read_write or read_only. */
export enum KnownEndpointType {
  /** ReadOnly compute endpoint type */
  ReadOnly = "read_only",
  /** ReadWrite compute endpoint type */
  ReadWrite = "read_write",
}

/**
 * The compute endpoint type. Either read_write or read_only. \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **read_only**: ReadOnly compute endpoint type \
 * **read_write**: ReadWrite compute endpoint type
 */
export type EndpointType = string;

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
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
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

export function organizationResourceArraySerializer(
  result: Array<OrganizationResource>,
): any[] {
  return result.map((item) => {
    return organizationResourceSerializer(item);
  });
}

export function organizationResourceArrayDeserializer(
  result: Array<OrganizationResource>,
): any[] {
  return result.map((item) => {
    return organizationResourceDeserializer(item);
  });
}

/** PostgreSQL Version model */
export interface PgVersion {
  /** The major PostgreSQL version number */
  version?: number;
}

export function pgVersionSerializer(item: PgVersion): any {
  return { version: item["version"] };
}

export function pgVersionDeserializer(item: any): PgVersion {
  return {
    version: item["version"],
  };
}

/** Response model for PostgreSQL versions */
export interface PgVersionsResult {
  /** List of PostgreSQL versions */
  versions: PgVersion[];
}

export function pgVersionsResultDeserializer(item: any): PgVersionsResult {
  return {
    versions: pgVersionArrayDeserializer(item["versions"]),
  };
}

export function pgVersionArraySerializer(result: Array<PgVersion>): any[] {
  return result.map((item) => {
    return pgVersionSerializer(item);
  });
}

export function pgVersionArrayDeserializer(result: Array<PgVersion>): any[] {
  return result.map((item) => {
    return pgVersionDeserializer(item);
  });
}

/** The Project resource type. */
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

/** Connection uri parameters for the associated database */
export interface ConnectionUriProperties {
  /** Project Id associated with this connection */
  projectId?: string;
  /** Branch Id associated with this connection */
  branchId?: string;
  /** Database name associated with this connection */
  databaseName?: string;
  /** The role name used for authentication */
  roleName?: string;
  /** the endpoint Id with this connection */
  endpointId?: string;
  /** Indicates if the connection is pooled */
  isPooled?: boolean;
  /** connection uri returned for the database */
  readonly connectionStringUri?: string;
}

export function connectionUriPropertiesSerializer(
  item: ConnectionUriProperties,
): any {
  return {
    projectId: item["projectId"],
    branchId: item["branchId"],
    databaseName: item["databaseName"],
    roleName: item["roleName"],
    endpointId: item["endpointId"],
    isPooled: item["isPooled"],
  };
}

export function connectionUriPropertiesDeserializer(
  item: any,
): ConnectionUriProperties {
  return {
    projectId: item["projectId"],
    branchId: item["branchId"],
    databaseName: item["databaseName"],
    roleName: item["roleName"],
    endpointId: item["endpointId"],
    isPooled: item["isPooled"],
    connectionStringUri: item["connectionStringUri"],
  };
}

/** The Branch resource type. */
export interface Branch extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BranchProperties;
}

export function branchSerializer(item: Branch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : branchPropertiesSerializer(item["properties"]),
  };
}

export function branchDeserializer(item: any): Branch {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : branchPropertiesDeserializer(item["properties"]),
  };
}

/** The response of a Branch list operation. */
export interface _BranchListResult {
  /** The Branch items on this page */
  value: Branch[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _branchListResultDeserializer(item: any): _BranchListResult {
  return {
    value: branchArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function branchArraySerializer(result: Array<Branch>): any[] {
  return result.map((item) => {
    return branchSerializer(item);
  });
}

export function branchArrayDeserializer(result: Array<Branch>): any[] {
  return result.map((item) => {
    return branchDeserializer(item);
  });
}

/** The response of a Compute list operation. */
export interface _ComputeListResult {
  /** The Compute items on this page */
  value: Compute[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _computeListResultDeserializer(item: any): _ComputeListResult {
  return {
    value: computeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function computeArrayDeserializer(result: Array<Compute>): any[] {
  return result.map((item) => {
    return computeDeserializer(item);
  });
}

/** The Compute resource type. */
export interface Compute extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ComputeProperties;
}

export function computeDeserializer(item: any): Compute {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : computePropertiesDeserializer(item["properties"]),
  };
}

/** Properties specific to Compute */
export interface ComputeProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** Region where the compute instance is located */
  region?: string;
  /** Number of allocated CPU cores */
  cpuCores?: number;
  /** Memory allocated in GB */
  memory?: number;
  /** Current status of the compute instance */
  status?: string;
}

export function computePropertiesDeserializer(item: any): ComputeProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    region: item["region"],
    cpuCores: item["cpuCores"],
    memory: item["memory"],
    status: item["status"],
  };
}

/** The response of a NeonDatabase list operation. */
export interface _NeonDatabaseListResult {
  /** The NeonDatabase items on this page */
  value: NeonDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neonDatabaseListResultDeserializer(
  item: any,
): _NeonDatabaseListResult {
  return {
    value: neonDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neonDatabaseArrayDeserializer(
  result: Array<NeonDatabase>,
): any[] {
  return result.map((item) => {
    return neonDatabaseDeserializer(item);
  });
}

/** The Neon Database resource type. */
export interface NeonDatabase extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: NeonDatabaseProperties;
}

export function neonDatabaseDeserializer(item: any): NeonDatabase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : neonDatabasePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a NeonRole list operation. */
export interface _NeonRoleListResult {
  /** The NeonRole items on this page */
  value: NeonRole[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neonRoleListResultDeserializer(
  item: any,
): _NeonRoleListResult {
  return {
    value: neonRoleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neonRoleArrayDeserializer(result: Array<NeonRole>): any[] {
  return result.map((item) => {
    return neonRoleDeserializer(item);
  });
}

/** The Neon Role resource type. */
export interface NeonRole extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: NeonRoleProperties;
}

export function neonRoleDeserializer(item: any): NeonRole {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : neonRolePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a Endpoint list operation. */
export interface _EndpointListResult {
  /** The Endpoint items on this page */
  value: Endpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointListResultDeserializer(
  item: any,
): _EndpointListResult {
  return {
    value: endpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** The Neon compute endpoint resource type. */
export interface Endpoint extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EndpointProperties;
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : endpointPropertiesDeserializer(item["properties"]),
  };
}

/** Supported API versions for the Neon.Postgres resource provider. */
export enum KnownVersions {
  /** Dependent on Azure.ResourceManager.Versions.v1_0_Preview_1, LiftrBase.Versions.v1_preview, LiftrBase.Data.Versions.v1_preview */
  V20250301 = "2025-03-01",
}
