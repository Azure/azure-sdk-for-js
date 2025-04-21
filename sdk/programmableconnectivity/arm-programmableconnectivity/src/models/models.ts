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

/** A Programmable Connectivity Gateway resource */
export interface Gateway extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: GatewayProperties;
}

export function gatewaySerializer(item: Gateway): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : gatewayPropertiesSerializer(item["properties"]),
  };
}

export function gatewayDeserializer(item: any): Gateway {
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
      : gatewayPropertiesDeserializer(item["properties"]),
  };
}

/** Gateway resource properties */
export interface GatewayProperties {
  /** List of Operator API Connections selected by the user */
  readonly operatorApiConnections?: string[];
  /** Base URL of the Gateway resource. This is the URL that the users would use to make Open API Gateway requests to the Operators via Azure. */
  readonly gatewayBaseUrl?: string;
  /** The status of the last operation on the Gateway resource. */
  readonly provisioningState?: ProvisioningState;
}

export function gatewayPropertiesSerializer(item: GatewayProperties): any {
  return item;
}

export function gatewayPropertiesDeserializer(item: any): GatewayProperties {
  return {
    operatorApiConnections: !item["operatorApiConnections"]
      ? item["operatorApiConnections"]
      : item["operatorApiConnections"].map((p: any) => {
          return p;
        }),
    gatewayBaseUrl: item["gatewayBaseUrl"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of a resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create or update request has been accepted */
  Accepted = "Accepted",
}

/**
 * The provisioning state of a resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create or update request has been accepted
 */
export type ProvisioningState = string;

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

/** The type used for updating tags in Gateway resources. */
export interface GatewayTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function gatewayTagsUpdateSerializer(item: GatewayTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Gateway list operation. */
export interface _GatewayListResult {
  /** The Gateway items on this page */
  value: Gateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gatewayListResultDeserializer(item: any): _GatewayListResult {
  return {
    value: gatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayArraySerializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewaySerializer(item);
  });
}

export function gatewayArrayDeserializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewayDeserializer(item);
  });
}

/** A Programmable Connectivity Operator API Connection resource */
export interface OperatorApiConnection extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiConnectionProperties;
}

export function operatorApiConnectionSerializer(
  item: OperatorApiConnection,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiConnectionPropertiesSerializer(item["properties"]),
  };
}

export function operatorApiConnectionDeserializer(
  item: any,
): OperatorApiConnection {
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
      : operatorApiConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Operator API Connection resource properties that cannot be updated once a resource has been created. */
export interface OperatorApiConnectionProperties {
  /** Reference to the Operator API Plan Resource ID. */
  operatorApiPlanId: string;
  /** Details about the SaaS offer purchased from the marketplace. */
  saasProperties?: SaasProperties;
  /** Details about the Application that would use the Operator's Network APIs. */
  configuredApplication?: ApplicationProperties;
  /** Application ID of the App Developer that is registered with the Operator in a specific country/region. */
  appId?: string;
  /** Reference to the APC Gateway resource ID. */
  gatewayId: string;
  /** Type of the account the user has with the Operator's Network API infrastructure. AzureManaged | UserManaged. */
  accountType: AccountType;
  /** Application secret linked to the 'appId'. This should be stored securely and is not returned back when the resource information is read. */
  appSecret?: string;
  /** Name of the Operator in the linked Operator API Plan belongs to. */
  readonly operatorName?: string;
  /** The Network API for the current operator in the country/region provided in the linked Operator API Plan. */
  readonly camaraApiName?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the OperatorApiConnection resource. */
  readonly status?: Status;
}

export function operatorApiConnectionPropertiesSerializer(
  item: OperatorApiConnectionProperties,
): any {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    saasProperties: !item["saasProperties"]
      ? item["saasProperties"]
      : saasPropertiesSerializer(item["saasProperties"]),
    configuredApplication: !item["configuredApplication"]
      ? item["configuredApplication"]
      : applicationPropertiesSerializer(item["configuredApplication"]),
    appId: item["appId"],
    gatewayId: item["gatewayId"],
    accountType: item["accountType"],
    appSecret: item["appSecret"],
  };
}

export function operatorApiConnectionPropertiesDeserializer(
  item: any,
): OperatorApiConnectionProperties {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    saasProperties: !item["saasProperties"]
      ? item["saasProperties"]
      : saasPropertiesDeserializer(item["saasProperties"]),
    configuredApplication: !item["configuredApplication"]
      ? item["configuredApplication"]
      : applicationPropertiesDeserializer(item["configuredApplication"]),
    appId: item["appId"],
    gatewayId: item["gatewayId"],
    accountType: item["accountType"],
    appSecret: item["appSecret"],
    operatorName: item["operatorName"],
    camaraApiName: item["camaraApiName"],
    provisioningState: item["provisioningState"],
    status: !item["status"]
      ? item["status"]
      : statusDeserializer(item["status"]),
  };
}

/** Details about the SaaS offer purchased from the marketplace. */
export interface SaasProperties {
  /** Subscription ID of the SaaS offer purchased from the marketplace. */
  saasSubscriptionId?: string;
  /** Resource ID of the SaaS offer purchased from the marketplace. */
  saasResourceId?: string;
}

export function saasPropertiesSerializer(item: SaasProperties): any {
  return {
    saasSubscriptionId: item["saasSubscriptionId"],
    saasResourceId: item["saasResourceId"],
  };
}

export function saasPropertiesDeserializer(item: any): SaasProperties {
  return {
    saasSubscriptionId: item["saasSubscriptionId"],
    saasResourceId: item["saasResourceId"],
  };
}

/** Details about the Application that would use the Operator's Network APIs. */
export interface ApplicationProperties {
  /** Name of the application. Example: Contoso App. */
  name?: string;
  /** Description of the application. */
  applicationDescription?: string;
  /** The category that describes the application. */
  applicationType?: string;
  /** Legal name of the organization owning the application. */
  legalName?: string;
  /** A description of the organization owning the application. */
  organizationDescription?: string;
  /** Unique Tax Number for the user's organization in the country/region the APC Gateway is being purchased. */
  taxNumber?: string;
  /** Email address of the Privacy contact or Data Protection officer of the organization. */
  privacyContactEmailAddress?: string;
}

export function applicationPropertiesSerializer(
  item: ApplicationProperties,
): any {
  return {
    name: item["name"],
    applicationDescription: item["applicationDescription"],
    applicationType: item["applicationType"],
    legalName: item["legalName"],
    organizationDescription: item["organizationDescription"],
    taxNumber: item["taxNumber"],
    privacyContactEmailAddress: item["privacyContactEmailAddress"],
  };
}

export function applicationPropertiesDeserializer(
  item: any,
): ApplicationProperties {
  return {
    name: item["name"],
    applicationDescription: item["applicationDescription"],
    applicationType: item["applicationType"],
    legalName: item["legalName"],
    organizationDescription: item["organizationDescription"],
    taxNumber: item["taxNumber"],
    privacyContactEmailAddress: item["privacyContactEmailAddress"],
  };
}

/** The Account Type of the Operator API Connections. */
export enum KnownAccountType {
  /** Managed by Azure on-behalf-of the user. */
  AzureManaged = "AzureManaged",
  /** Managed by the User themselves on the Operator end. */
  UserManaged = "UserManaged",
}

/**
 * The Account Type of the Operator API Connections. \
 * {@link KnownAccountType} can be used interchangeably with AccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureManaged**: Managed by Azure on-behalf-of the user. \
 * **UserManaged**: Managed by the User themselves on the Operator end.
 */
export type AccountType = string;

/** Description of the current status of the OperatorApiConnection resource. */
export interface Status {
  /** Current state of the OperatorApiConnection resource. */
  state?: string;
  /** Explanation of the current state of the OperatorApiConnection resource. */
  reason?: string;
}

export function statusDeserializer(item: any): Status {
  return {
    state: item["state"],
    reason: item["reason"],
  };
}

/** The type used for update operations of the OperatorApiConnection. */
export interface OperatorApiConnectionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiConnectionUpdateProperties;
}

export function operatorApiConnectionUpdateSerializer(
  item: OperatorApiConnectionUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiConnectionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the OperatorApiConnection. */
export interface OperatorApiConnectionUpdateProperties {
  /** Reference to the Operator API Plan Resource ID. */
  operatorApiPlanId?: string;
  /** Details about the SaaS offer purchased from the marketplace. */
  saasProperties?: SaasProperties;
  /** Details about the Application that would use the Operator's Network APIs. */
  configuredApplication?: ApplicationProperties;
  /** Application ID of the App Developer that is registered with the Operator in a specific country/region. */
  appId?: string;
  /** Application secret linked to the 'appId'. This should be stored securely and is not returned back when the resource information is read. */
  appSecret?: string;
}

export function operatorApiConnectionUpdatePropertiesSerializer(
  item: OperatorApiConnectionUpdateProperties,
): any {
  return {
    operatorApiPlanId: item["operatorApiPlanId"],
    saasProperties: !item["saasProperties"]
      ? item["saasProperties"]
      : saasPropertiesSerializer(item["saasProperties"]),
    configuredApplication: !item["configuredApplication"]
      ? item["configuredApplication"]
      : applicationPropertiesSerializer(item["configuredApplication"]),
    appId: item["appId"],
    appSecret: item["appSecret"],
  };
}

/** The response of a OperatorApiConnection list operation. */
export interface _OperatorApiConnectionListResult {
  /** The OperatorApiConnection items on this page */
  value: OperatorApiConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operatorApiConnectionListResultDeserializer(
  item: any,
): _OperatorApiConnectionListResult {
  return {
    value: operatorApiConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operatorApiConnectionArraySerializer(
  result: Array<OperatorApiConnection>,
): any[] {
  return result.map((item) => {
    return operatorApiConnectionSerializer(item);
  });
}

export function operatorApiConnectionArrayDeserializer(
  result: Array<OperatorApiConnection>,
): any[] {
  return result.map((item) => {
    return operatorApiConnectionDeserializer(item);
  });
}

/** A Programmable Connectivity Operator API Plans resource. This is a readonly resource that indicates which Operator Network APIs are available in the user's subscription. */
export interface OperatorApiPlan extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: OperatorApiPlanProperties;
}

export function operatorApiPlanDeserializer(item: any): OperatorApiPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : operatorApiPlanPropertiesDeserializer(item["properties"]),
  };
}

/** Operator API Plan properties. */
export interface OperatorApiPlanProperties {
  /** Name of the Operator this plan belongs to. */
  operatorName?: string;
  /** Standardized Network API name defined by CAMARA specifications. */
  camaraApiName?: string;
  /** List of Azure regions where this offer is supported. */
  supportedLocations?: string[];
  /** List of country/region names where this plan is being supported by the Operator. */
  operatorRegions?: string[];
  /** List of country/region names where this plan is being supported by Azure Marketplace. */
  markets?: string[];
  /** The limits, if any, will be imposed by the operator. */
  limits?: string;
  /** Azure marketplace properties for this plan. */
  marketplaceProperties?: MarketplaceProperties;
  /** The status of the last operation on the Gateway resource. */
  readonly provisioningState?: ProvisioningState;
}

export function operatorApiPlanPropertiesDeserializer(
  item: any,
): OperatorApiPlanProperties {
  return {
    operatorName: item["operatorName"],
    camaraApiName: item["camaraApiName"],
    supportedLocations: !item["supportedLocations"]
      ? item["supportedLocations"]
      : item["supportedLocations"].map((p: any) => {
          return p;
        }),
    operatorRegions: !item["operatorRegions"]
      ? item["operatorRegions"]
      : item["operatorRegions"].map((p: any) => {
          return p;
        }),
    markets: !item["markets"]
      ? item["markets"]
      : item["markets"].map((p: any) => {
          return p;
        }),
    limits: item["limits"],
    marketplaceProperties: !item["marketplaceProperties"]
      ? item["marketplaceProperties"]
      : marketplacePropertiesDeserializer(item["marketplaceProperties"]),
    provisioningState: item["provisioningState"],
  };
}

/** Azure marketplace properties for a plan. */
export interface MarketplaceProperties {
  /** Azure marketplace Offer ID for this plan. */
  offerId?: string;
  /** Azure marketplace Legacy Offer ID for this plan. This is used to fetch the details of the plan from the Azure marketplace. */
  legacyOfferId?: string;
  /** Azure marketplace Publisher ID for this plan. */
  publisherId?: string;
  /** Azure marketplace Plan ID for this plan. */
  planId?: string;
  /** Azure marketplace Term ID for this plan. */
  termId?: string;
}

export function marketplacePropertiesDeserializer(
  item: any,
): MarketplaceProperties {
  return {
    offerId: item["offerId"],
    legacyOfferId: item["legacyOfferId"],
    publisherId: item["publisherId"],
    planId: item["planId"],
    termId: item["termId"],
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

/** The response of a OperatorApiPlan list operation. */
export interface _OperatorApiPlanListResult {
  /** The OperatorApiPlan items on this page */
  value: OperatorApiPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operatorApiPlanListResultDeserializer(
  item: any,
): _OperatorApiPlanListResult {
  return {
    value: operatorApiPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operatorApiPlanArrayDeserializer(
  result: Array<OperatorApiPlan>,
): any[] {
  return result.map((item) => {
    return operatorApiPlanDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-01-15-preview API version. */
  V20240115Preview = "2024-01-15-preview",
}
