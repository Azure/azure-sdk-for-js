// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A quota resource for a Playwright service account. */
export interface AccountQuota extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AccountQuotaProperties;
}

export function accountQuotaDeserializer(item: any): AccountQuota {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : accountQuotaPropertiesDeserializer(item["properties"]),
  };
}

/** The Playwright service account quota resource properties. */
export interface AccountQuotaProperties {
  /** The Playwright service account quota resource free-trial properties. */
  freeTrial?: AccountFreeTrialProperties;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function accountQuotaPropertiesDeserializer(item: any): AccountQuotaProperties {
  return {
    freeTrial: !item["freeTrial"]
      ? item["freeTrial"]
      : accountFreeTrialPropertiesDeserializer(item["freeTrial"]),
    provisioningState: item["provisioningState"],
  };
}

/** The Playwright service account quota resource free-trial properties. */
export interface AccountFreeTrialProperties {
  /** The free-trial createdAt utcDateTime. */
  readonly createdAt: Date;
  /** The free-trial expiryAt utcDateTime. */
  readonly expiryAt: Date;
  /** The free-trial allocated limit value eg. allocated free minutes. */
  readonly allocatedValue: number;
  /** The free-trial used value eg. used free minutes. */
  readonly usedValue: number;
  /** The free-trial percentage used. */
  readonly percentageUsed: number;
}

export function accountFreeTrialPropertiesDeserializer(item: any): AccountFreeTrialProperties {
  return {
    createdAt: new Date(item["createdAt"]),
    expiryAt: new Date(item["expiryAt"]),
    allocatedValue: item["allocatedValue"],
    usedValue: item["usedValue"],
    percentageUsed: item["percentageUsed"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Creation in progress.. */
  Creating = "Creating",
  /** Deletion in progress.. */
  Deleting = "Deleting",
  /** Change accepted for processing.. */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Creation in progress.. \
 * **Deleting**: Deletion in progress.. \
 * **Accepted**: Change accepted for processing..
 */
export type ProvisioningState = string;

/** The enum for quota name. */
export enum KnownQuotaNames {
  /** The quota details for scalable execution feature. When enabled, Playwright client workers can connect to cloud-hosted browsers. This can increase the number of parallel workers for a test run, significantly minimizing test completion durations. */
  ScalableExecution = "ScalableExecution",
  /** The quota details for reporting feature. When enabled, Playwright client will be able to upload and display test results, including artifacts like traces and screenshots, in the Playwright portal. This enables faster and more efficient troubleshooting. */
  Reporting = "Reporting",
}

/**
 * The enum for quota name. \
 * {@link KnownQuotaNames} can be used interchangeably with QuotaNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ScalableExecution**: The quota details for scalable execution feature. When enabled, Playwright client workers can connect to cloud-hosted browsers. This can increase the number of parallel workers for a test run, significantly minimizing test completion durations. \
 * **Reporting**: The quota details for reporting feature. When enabled, Playwright client will be able to upload and display test results, including artifacts like traces and screenshots, in the Playwright portal. This enables faster and more efficient troubleshooting.
 */
export type QuotaNames = string;

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

/** The response of a AccountQuota list operation. */
export interface _AccountQuotaListResult {
  /** The AccountQuota items on this page */
  value: AccountQuota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accountQuotaListResultDeserializer(item: any): _AccountQuotaListResult {
  return {
    value: accountQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accountQuotaArrayDeserializer(result: Array<AccountQuota>): any[] {
  return result.map((item) => {
    return accountQuotaDeserializer(item);
  });
}

/** A subscription quota resource. */
export interface Quota extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: QuotaProperties;
}

export function quotaDeserializer(item: any): Quota {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaPropertiesDeserializer(item["properties"]),
  };
}

/** The subscription quota resource properties. */
export interface QuotaProperties {
  /** The subscription quota resource free-trial properties. */
  freeTrial?: FreeTrialProperties;
  /** Indicates the offering type for the subscription. */
  readonly offeringType?: OfferingType;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function quotaPropertiesDeserializer(item: any): QuotaProperties {
  return {
    freeTrial: !item["freeTrial"]
      ? item["freeTrial"]
      : freeTrialPropertiesDeserializer(item["freeTrial"]),
    offeringType: item["offeringType"],
    provisioningState: item["provisioningState"],
  };
}

/** The subscription quota resource free-trial properties. */
export interface FreeTrialProperties {
  /** The Playwright service account id. */
  readonly accountId: string;
  /** The free-trial state. */
  readonly state: FreeTrialState;
}

export function freeTrialPropertiesDeserializer(item: any): FreeTrialProperties {
  return {
    accountId: item["accountId"],
    state: item["state"],
  };
}

/** The free-trial state. */
export enum KnownFreeTrialState {
  /** The free-trial is Active. */
  Active = "Active",
  /** The free-trial is Expired. */
  Expired = "Expired",
  /** The free-trial is Not Eligible. */
  NotEligible = "NotEligible",
  /** The free-trial is Not Registered. */
  NotRegistered = "NotRegistered",
}

/**
 * The free-trial state. \
 * {@link KnownFreeTrialState} can be used interchangeably with FreeTrialState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The free-trial is Active. \
 * **Expired**: The free-trial is Expired. \
 * **NotEligible**: The free-trial is Not Eligible. \
 * **NotRegistered**: The free-trial is Not Registered.
 */
export type FreeTrialState = string;

/** Offering type state. */
export enum KnownOfferingType {
  /** The offeringType is NotApplicable. */
  NotApplicable = "NotApplicable",
  /** The offeringType is PrivatePreview. */
  PrivatePreview = "PrivatePreview",
  /** The offeringType is PublicPreview. */
  PublicPreview = "PublicPreview",
  /** The offeringType is GeneralAvailability. */
  GeneralAvailability = "GeneralAvailability",
}

/**
 * Offering type state. \
 * {@link KnownOfferingType} can be used interchangeably with OfferingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: The offeringType is NotApplicable. \
 * **PrivatePreview**: The offeringType is PrivatePreview. \
 * **PublicPreview**: The offeringType is PublicPreview. \
 * **GeneralAvailability**: The offeringType is GeneralAvailability.
 */
export type OfferingType = string;

/** The response of a Quota list operation. */
export interface _QuotaListResult {
  /** The Quota items on this page */
  value: Quota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaListResultDeserializer(item: any): _QuotaListResult {
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

/** A Playwright service account resource. */
export interface Account extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AccountProperties;
}

export function accountSerializer(item: Account): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesSerializer(item["properties"]),
  };
}

export function accountDeserializer(item: any): Account {
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
      : accountPropertiesDeserializer(item["properties"]),
  };
}

/** Account resource properties. */
export interface AccountProperties {
  /** The Playwright testing dashboard URI for the account resource. */
  readonly dashboardUri?: string;
  /** This property sets the connection region for Playwright client workers to cloud-hosted browsers. If enabled, workers connect to browsers in the closest Azure region, ensuring lower latency. If disabled, workers connect to browsers in the Azure region in which the workspace was initially created. */
  regionalAffinity?: EnablementStatus;
  /** When enabled, Playwright client workers can connect to cloud-hosted browsers. This can increase the number of parallel workers for a test run, significantly minimizing test completion durations. */
  scalableExecution?: EnablementStatus;
  /** When enabled, this feature allows the workspace to upload and display test results, including artifacts like traces and screenshots, in the Playwright portal. This enables faster and more efficient troubleshooting. */
  reporting?: EnablementStatus;
  /** When enabled, this feature allows the workspace to use local auth(through access key) for authentication of test runs. */
  localAuth?: EnablementStatus;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function accountPropertiesSerializer(item: AccountProperties): any {
  return {
    regionalAffinity: item["regionalAffinity"],
    scalableExecution: item["scalableExecution"],
    reporting: item["reporting"],
    localAuth: item["localAuth"],
  };
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    dashboardUri: item["dashboardUri"],
    regionalAffinity: item["regionalAffinity"],
    scalableExecution: item["scalableExecution"],
    reporting: item["reporting"],
    localAuth: item["localAuth"],
    provisioningState: item["provisioningState"],
  };
}

/** The enablement status of a feature. */
export enum KnownEnablementStatus {
  /** The feature is Enabled. */
  Enabled = "Enabled",
  /** The feature is Disabled. */
  Disabled = "Disabled",
}

/**
 * The enablement status of a feature. \
 * {@link KnownEnablementStatus} can be used interchangeably with EnablementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The feature is Enabled. \
 * **Disabled**: The feature is Disabled.
 */
export type EnablementStatus = string;

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

/** The type used for update operations of the Account. */
export interface AccountUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AccountUpdateProperties;
}

export function accountUpdateSerializer(item: AccountUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : accountUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Account. */
export interface AccountUpdateProperties {
  /** This property sets the connection region for Playwright client workers to cloud-hosted browsers. If enabled, workers connect to browsers in the closest Azure region, ensuring lower latency. If disabled, workers connect to browsers in the Azure region in which the workspace was initially created. */
  regionalAffinity?: EnablementStatus;
  /** When enabled, Playwright client workers can connect to cloud-hosted browsers. This can increase the number of parallel workers for a test run, significantly minimizing test completion durations. */
  scalableExecution?: EnablementStatus;
  /** When enabled, this feature allows the workspace to upload and display test results, including artifacts like traces and screenshots, in the Playwright portal. This enables faster and more efficient troubleshooting. */
  reporting?: EnablementStatus;
  /** When enabled, this feature allows the workspace to use local auth(through access key) for authentication of test runs. */
  localAuth?: EnablementStatus;
}

export function accountUpdatePropertiesSerializer(item: AccountUpdateProperties): any {
  return {
    regionalAffinity: item["regionalAffinity"],
    scalableExecution: item["scalableExecution"],
    reporting: item["reporting"],
    localAuth: item["localAuth"],
  };
}

/** The response of a Account list operation. */
export interface _AccountListResult {
  /** The Account items on this page */
  value: Account[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accountListResultDeserializer(item: any): _AccountListResult {
  return {
    value: accountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accountArraySerializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountSerializer(item);
  });
}

export function accountArrayDeserializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountDeserializer(item);
  });
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

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

/** Microsoft.AzurePlaywrightService Management API Versions. */
export enum KnownVersions {
  /** 2024-12-01 version */
  "V2024-12-01" = "2024-12-01",
}
