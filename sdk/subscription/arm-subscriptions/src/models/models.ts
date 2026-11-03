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

/** Subscription Response for Changed Target Directory. */
export interface TargetDirectoryResult extends ProxyResource {
  /** Subscription Changed Target Directory response properties. */
  properties?: TargetDirectoryResultProperties;
}

export function targetDirectoryResultDeserializer(item: any): TargetDirectoryResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : targetDirectoryResultPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of subscription Response for Changed Target Directory. */
export interface TargetDirectoryResultProperties {
  /** Destination Tenant Id where Subscription will be accepted. */
  readonly destinationTenantId?: string;
  /** Destination Owner Id where Subscription will be accepted. */
  readonly destinationOwnerId?: string;
  /** The id of the subscription being transferred. */
  readonly subscriptionId?: string;
  /** The UTC date and time when the transfer request was created */
  readonly createdDate?: Date;
  /** The UTC date and time when the transfer request was accepted */
  readonly acceptedDate?: Date;
  /** The email address of the user who initiated the transfer request. If the request was generated by a Service Principal, this field may be null. */
  readonly sourceOwnerEmail?: string;
  /** The object id of the user who initiated the transfer request. */
  readonly sourceOwnerId?: string;
  /** The id of the tenant where the subscription originally resided. */
  readonly sourceTenantId?: string;
  /** Status of the subscription transfer operation. */
  readonly status?: ChangeDirectoryOperationStatus;
  /** Subscription Initiate Request Expiry time */
  readonly expiresOn?: Date;
}

export function targetDirectoryResultPropertiesDeserializer(
  item: any,
): TargetDirectoryResultProperties {
  return {
    destinationTenantId: item["destinationTenantId"],
    destinationOwnerId: item["destinationOwnerId"],
    subscriptionId: item["subscriptionId"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    acceptedDate: !item["acceptedDate"] ? item["acceptedDate"] : new Date(item["acceptedDate"]),
    sourceOwnerEmail: item["sourceOwnerEmail"],
    sourceOwnerId: item["sourceOwnerId"],
    sourceTenantId: item["sourceTenantId"],
    status: item["status"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
  };
}

/** Status of the subscription transfer operation. */
export enum KnownChangeDirectoryOperationStatus {
  /** The subscription transfer request has been created and is waiting for acceptance by the destination tenant. */
  Initialized = "Initialized",
  /** The subscription transfer request has been accepted by the destination tenant and the transfer is in progress. */
  InProgress = "InProgress",
  /** The subscription transfer has been completed and is now owned by the destination tenant. */
  Completed = "Completed",
}

/**
 * Status of the subscription transfer operation. \
 * {@link KnownChangeDirectoryOperationStatus} can be used interchangeably with ChangeDirectoryOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initialized**: The subscription transfer request has been created and is waiting for acceptance by the destination tenant. \
 * **InProgress**: The subscription transfer request has been accepted by the destination tenant and the transfer is in progress. \
 * **Completed**: The subscription transfer has been completed and is now owned by the destination tenant.
 */
export type ChangeDirectoryOperationStatus = string;

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

/** Subscription Request for Changed Target Directory. */
export interface TargetDirectoryRequest {
  /** Target Directory request properties. */
  properties?: TargetDirectoryRequestProperties;
}

export function targetDirectoryRequestSerializer(item: TargetDirectoryRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : targetDirectoryRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties of subscription Request for Changed Target Directory. */
export interface TargetDirectoryRequestProperties {
  /** The destination OwnerId, can be object id or email address */
  destinationOwnerId?: string;
  /** The destination Tenant id where subscription needs to be accepted */
  destinationTenantId?: string;
}

export function targetDirectoryRequestPropertiesSerializer(
  item: TargetDirectoryRequestProperties,
): any {
  return {
    destinationOwnerId: item["destinationOwnerId"],
    destinationTenantId: item["destinationTenantId"],
  };
}

/** Subscription Response to list out Changed Target Directory. */
export interface _TargetDirectoryListResult {
  /** The list of subscription response to changed target directory. */
  readonly value?: TargetDirectoryResult[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _targetDirectoryListResultDeserializer(item: any): _TargetDirectoryListResult {
  return {
    value: !item["value"] ? item["value"] : targetDirectoryResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetDirectoryResultArrayDeserializer(
  result: Array<TargetDirectoryResult>,
): any[] {
  return result.map((item) => {
    return targetDirectoryResultDeserializer(item);
  });
}

/** Subscription Information with the alias. */
export interface SubscriptionAliasResponse extends ProxyResource {
  /** Subscription Alias response properties. */
  properties?: SubscriptionAliasResponseProperties;
}

export function subscriptionAliasResponseDeserializer(item: any): SubscriptionAliasResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionAliasResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Put subscription creation result properties. */
export interface SubscriptionAliasResponseProperties {
  /** Newly created subscription Id. */
  readonly subscriptionId?: string;
  /** The display name of the subscription. */
  displayName?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Url to accept ownership of the subscription. */
  readonly acceptOwnershipUrl?: string;
  /** The accept ownership state of the resource. */
  readonly acceptOwnershipState?: AcceptOwnership;
  /**
   * Billing scope of the subscription.
   * For CustomerLed and FieldLed - /billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}
   * For PartnerLed - /billingAccounts/{billingAccountName}/customers/{customerName}
   * For Legacy EA - /billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}
   */
  billingScope?: string;
  /** The workload type of the subscription. It can be either Production or DevTest. */
  workload?: Workload;
  /** Reseller Id */
  resellerId?: string;
  /** Owner Id of the subscription */
  subscriptionOwnerId?: string;
  /** The Management Group Id. */
  managementGroupId?: string;
  /** Created Time */
  createdTime?: string;
  /** Tags for the subscription */
  tags?: Record<string, string>;
}

export function subscriptionAliasResponsePropertiesDeserializer(
  item: any,
): SubscriptionAliasResponseProperties {
  return {
    subscriptionId: item["subscriptionId"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    acceptOwnershipUrl: item["acceptOwnershipUrl"],
    acceptOwnershipState: item["acceptOwnershipState"],
    billingScope: item["billingScope"],
    workload: item["workload"],
    resellerId: item["resellerId"],
    subscriptionOwnerId: item["subscriptionOwnerId"],
    managementGroupId: item["managementGroupId"],
    createdTime: item["createdTime"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type ProvisioningState = string;

/** The accept ownership state of the resource. */
export enum KnownAcceptOwnership {
  /** Pending */
  Pending = "Pending",
  /** Completed */
  Completed = "Completed",
  /** Expired */
  Expired = "Expired",
}

/**
 * The accept ownership state of the resource. \
 * {@link KnownAcceptOwnership} can be used interchangeably with AcceptOwnership,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Completed**: Completed \
 * **Expired**: Expired
 */
export type AcceptOwnership = string;

/** The workload type of the subscription. It can be either Production or DevTest. */
export enum KnownWorkload {
  /** Production */
  Production = "Production",
  /** DevTest */
  DevTest = "DevTest",
}

/**
 * The workload type of the subscription. It can be either Production or DevTest. \
 * {@link KnownWorkload} can be used interchangeably with Workload,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Production**: Production \
 * **DevTest**: DevTest
 */
export type Workload = string;

/** The parameters required to create a new subscription. */
export interface PutAliasRequest {
  /** Put alias request properties. */
  properties?: PutAliasRequestProperties;
}

export function putAliasRequestSerializer(item: PutAliasRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : putAliasRequestPropertiesSerializer(item["properties"]),
  };
}

/** Put subscription properties. */
export interface PutAliasRequestProperties {
  /** The friendly name of the subscription. */
  displayName?: string;
  /** The workload type of the subscription. It can be either Production or DevTest. */
  workload?: Workload;
  /**
   * Billing scope of the subscription.
   * For CustomerLed and FieldLed - /billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}
   * For PartnerLed - /billingAccounts/{billingAccountName}/customers/{customerName}
   * For Legacy EA - /billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}
   */
  billingScope?: string;
  /** This parameter can be used to create alias for existing subscription Id */
  subscriptionId?: string;
  /** Reseller Id */
  resellerId?: string;
  /** Put alias request additional properties. */
  additionalProperties?: PutAliasRequestAdditionalProperties;
}

export function putAliasRequestPropertiesSerializer(item: PutAliasRequestProperties): any {
  return {
    displayName: item["displayName"],
    workload: item["workload"],
    billingScope: item["billingScope"],
    subscriptionId: item["subscriptionId"],
    resellerId: item["resellerId"],
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : putAliasRequestAdditionalPropertiesSerializer(item["additionalProperties"]),
  };
}

/** Put subscription additional properties. */
export interface PutAliasRequestAdditionalProperties {
  /** Management group Id for the subscription. */
  managementGroupId?: string;
  /** Tenant Id of the subscription */
  subscriptionTenantId?: string;
  /** Owner Id of the subscription */
  subscriptionOwnerId?: string;
  /** Tags for the subscription */
  tags?: Record<string, string>;
}

export function putAliasRequestAdditionalPropertiesSerializer(
  item: PutAliasRequestAdditionalProperties,
): any {
  return {
    managementGroupId: item["managementGroupId"],
    subscriptionTenantId: item["subscriptionTenantId"],
    subscriptionOwnerId: item["subscriptionOwnerId"],
    tags: item["tags"],
  };
}

/** The list of aliases. */
export interface _SubscriptionAliasListResult {
  /** The list of subscription aliases. */
  readonly value?: SubscriptionAliasResponse[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
}

export function _subscriptionAliasListResultDeserializer(item: any): _SubscriptionAliasListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : subscriptionAliasResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionAliasResponseArrayDeserializer(
  result: Array<SubscriptionAliasResponse>,
): any[] {
  return result.map((item) => {
    return subscriptionAliasResponseDeserializer(item);
  });
}

/** Tenant policy Information. */
export interface GetTenantPolicyResponse extends ProxyResource {
  /** Tenant policy properties. */
  properties?: TenantPolicy;
}

export function getTenantPolicyResponseDeserializer(item: any): GetTenantPolicyResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : tenantPolicyDeserializer(item["properties"]),
  };
}

/** Tenant policy. */
export interface TenantPolicy {
  /** Policy Id. */
  readonly policyId?: string;
  /** Blocks the leaving of subscriptions from user's tenant. */
  blockSubscriptionsLeavingTenant?: boolean;
  /** Blocks the entering of subscriptions into user's tenant. */
  blockSubscriptionsIntoTenant?: boolean;
  /** List of user objectIds that are exempted from the set subscription tenant policies for the user's tenant. */
  exemptedPrincipals?: string[];
}

export function tenantPolicyDeserializer(item: any): TenantPolicy {
  return {
    policyId: item["policyId"],
    blockSubscriptionsLeavingTenant: item["blockSubscriptionsLeavingTenant"],
    blockSubscriptionsIntoTenant: item["blockSubscriptionsIntoTenant"],
    exemptedPrincipals: !item["exemptedPrincipals"]
      ? item["exemptedPrincipals"]
      : item["exemptedPrincipals"].map((p: any) => {
          return p;
        }),
  };
}

/** Put tenant policy request properties. */
export interface PutTenantPolicyRequestProperties {
  /** Blocks the leaving of subscriptions from user's tenant. */
  blockSubscriptionsLeavingTenant?: boolean;
  /** Blocks the entering of subscriptions into user's tenant. */
  blockSubscriptionsIntoTenant?: boolean;
  /** List of user objectIds that are exempted from the set subscription tenant policies for the user's tenant. */
  exemptedPrincipals?: string[];
}

export function putTenantPolicyRequestPropertiesSerializer(
  item: PutTenantPolicyRequestProperties,
): any {
  return {
    blockSubscriptionsLeavingTenant: item["blockSubscriptionsLeavingTenant"],
    blockSubscriptionsIntoTenant: item["blockSubscriptionsIntoTenant"],
    exemptedPrincipals: !item["exemptedPrincipals"]
      ? item["exemptedPrincipals"]
      : item["exemptedPrincipals"].map((p: any) => {
          return p;
        }),
  };
}

/** Tenant policy information list. */
export interface _GetTenantPolicyListResponse {
  /** The GetTenantPolicyResponse items on this page */
  value: GetTenantPolicyResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _getTenantPolicyListResponseDeserializer(item: any): _GetTenantPolicyListResponse {
  return {
    value: getTenantPolicyResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function getTenantPolicyResponseArrayDeserializer(
  result: Array<GetTenantPolicyResponse>,
): any[] {
  return result.map((item) => {
    return getTenantPolicyResponseDeserializer(item);
  });
}

/** Billing account policies information. */
export interface BillingAccountPoliciesResponse extends ProxyResource {
  /** Billing account policies response properties. */
  properties?: BillingAccountPoliciesResponseProperties;
}

export function billingAccountPoliciesResponseDeserializer(
  item: any,
): BillingAccountPoliciesResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingAccountPoliciesResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Put billing account policies response properties. */
export interface BillingAccountPoliciesResponseProperties {
  /** Service tenant for the billing account. */
  serviceTenants?: ServiceTenantResponse[];
  /** Determine if the transfers are allowed for the billing account */
  allowTransfers?: boolean;
}

export function billingAccountPoliciesResponsePropertiesDeserializer(
  item: any,
): BillingAccountPoliciesResponseProperties {
  return {
    serviceTenants: !item["serviceTenants"]
      ? item["serviceTenants"]
      : serviceTenantResponseArrayDeserializer(item["serviceTenants"]),
    allowTransfers: item["allowTransfers"],
  };
}

export function serviceTenantResponseArrayDeserializer(
  result: Array<ServiceTenantResponse>,
): any[] {
  return result.map((item) => {
    return serviceTenantResponseDeserializer(item);
  });
}

/** Billing account service tenant. */
export interface ServiceTenantResponse {
  /** Service tenant id. */
  tenantId?: string;
  /** Service tenant name. */
  tenantName?: string;
}

export function serviceTenantResponseDeserializer(item: any): ServiceTenantResponse {
  return {
    tenantId: item["tenantId"],
    tenantName: item["tenantName"],
  };
}

/** The ID of the canceled subscription */
export interface CanceledSubscriptionId {
  /** The ID of the canceled subscription */
  readonly subscriptionId?: string;
}

export function canceledSubscriptionIdDeserializer(item: any): CanceledSubscriptionId {
  return {
    subscriptionId: item["subscriptionId"],
  };
}

/** The new name of the subscription. */
export interface SubscriptionName {
  /** New subscription name */
  subscriptionName?: string;
}

export function subscriptionNameSerializer(item: SubscriptionName): any {
  return { subscriptionName: item["subscriptionName"] };
}

/** The ID of the subscriptions that is being renamed */
export interface RenamedSubscriptionId {
  /** The ID of the subscriptions that is being renamed */
  readonly subscriptionId?: string;
}

export function renamedSubscriptionIdDeserializer(item: any): RenamedSubscriptionId {
  return {
    subscriptionId: item["subscriptionId"],
  };
}

/** The ID of the subscriptions that is being enabled */
export interface EnabledSubscriptionId {
  /** The ID of the subscriptions that is being enabled */
  readonly subscriptionId?: string;
}

export function enabledSubscriptionIdDeserializer(item: any): EnabledSubscriptionId {
  return {
    subscriptionId: item["subscriptionId"],
  };
}

/** The parameters required to accept subscription ownership. */
export interface AcceptOwnershipRequest {
  /** Accept subscription ownership request properties. */
  properties?: AcceptOwnershipRequestProperties;
}

export function acceptOwnershipRequestSerializer(item: AcceptOwnershipRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : acceptOwnershipRequestPropertiesSerializer(item["properties"]),
  };
}

/** Accept subscription ownership request properties. */
export interface AcceptOwnershipRequestProperties {
  /** The friendly name of the subscription. */
  displayName: string;
  /** Management group Id for the subscription. */
  managementGroupId?: string;
  /** Tags for the subscription */
  tags?: Record<string, string>;
}

export function acceptOwnershipRequestPropertiesSerializer(
  item: AcceptOwnershipRequestProperties,
): any {
  return {
    displayName: item["displayName"],
    managementGroupId: item["managementGroupId"],
    tags: item["tags"],
  };
}

/** Subscription Accept Ownership Response */
export interface AcceptOwnershipStatusResponse {
  /** Newly created subscription Id. */
  readonly subscriptionId?: string;
  /** The accept ownership state of the resource. */
  readonly acceptOwnershipState?: AcceptOwnership;
  /** The provisioning state of the resource. */
  readonly provisioningState?: Provisioning;
  /** UPN of the billing owner */
  readonly billingOwner?: string;
  /** Tenant Id of the subscription */
  subscriptionTenantId?: string;
  /** The display name of the subscription. */
  displayName?: string;
  /** Tags for the subscription */
  tags?: Record<string, string>;
}

export function acceptOwnershipStatusResponseDeserializer(
  item: any,
): AcceptOwnershipStatusResponse {
  return {
    subscriptionId: item["subscriptionId"],
    acceptOwnershipState: item["acceptOwnershipState"],
    provisioningState: item["provisioningState"],
    billingOwner: item["billingOwner"],
    subscriptionTenantId: item["subscriptionTenantId"],
    displayName: item["displayName"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The provisioning state of the resource. */
export enum KnownProvisioning {
  /** Pending */
  Pending = "Pending",
  /** Accepted */
  Accepted = "Accepted",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioning} can be used interchangeably with Provisioning,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Accepted**: Accepted \
 * **Succeeded**: Succeeded
 */
export type Provisioning = string;

/** The created subscription object. */
export interface SubscriptionCreationResult {
  /** The link to the new subscription. Use this link to check the status of subscription creation operation. */
  subscriptionLink?: string;
}

export function subscriptionCreationResultDeserializer(item: any): SubscriptionCreationResult {
  return {
    subscriptionLink: item["subscriptionLink"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
}
