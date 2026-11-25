// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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

/** SaaS tracked resource for GA API version 2026-04-01. Inherits standard Azure Resource Manager envelope (id, name, type, location, tags, systemData). */
export interface SaasResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SaasResourceProperties;
}

export function saasResourceSerializer(item: SaasResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : saasResourcePropertiesSerializer(item["properties"]),
  };
}

export function saasResourceDeserializer(item: any): SaasResource {
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
      : saasResourcePropertiesDeserializer(item["properties"]),
  };
}

/** SaaS resource properties for GA API version 2026-04-01. */
export interface SaasResourceProperties {
  /** The status of the last provisioning operation performed on the resource. */
  readonly provisioningState?: SaasProvisioningState;
  /** The SaaS asset identifier. Server-assigned unique identifier for the marketplace subscription. */
  readonly assetId?: string;
  /** Optional description. Used as subscription display name by Teams, Admin Center, and other consumers. */
  description?: string;
  /** The SaaS subscription status. Server-assigned. */
  readonly status?: SaasResourceStatus;
  /** The reason for the current status. Server-assigned. */
  readonly statusReason?: SubscriptionStatusReason;
  /** The seat count. */
  quantity?: number;
  /** The publisher name. Server-resolved from ProductCode. */
  readonly publisherName?: string;
  /** The plan name. Server-resolved from ProductCode. */
  readonly planName?: string;
  /** The offer name. Server-resolved from ProductCode. */
  readonly offerName?: string;
  /** The term unit (ISO 8601 duration, for example P1M or P1Y). Server-resolved from ProductCode. */
  readonly termUnit?: string;
  /** The billing period (ISO 8601 duration). Server-resolved from ProductCode. */
  readonly billingPeriod?: string;
  /** The risk property bag header (JSON format). Write-only — not returned in GET responses. */
  riskPropertyBagHeader?: string;
  /** The start date of the current term. Server-calculated. */
  readonly termStartDate?: Date;
  /** The end date of the current term. Server-calculated. */
  readonly termEndDate?: Date;
  /** The future start date of the subscription commitment, when available. Server-calculated. */
  readonly futureStartDate?: Date;
  /** Whether the SaaS subscription will auto-renew upon term end. */
  autoRenew?: boolean;
  /** Whether the current term is a free trial term. Server-determined. */
  readonly isFreeTrial?: boolean;
  /** The storefront. */
  storefront?: string;
  /**
   * The purchaser email. Server-derived from authenticated identity. Read-only.
   *
   * Customer data (PII): NEVER returned in `List` (`listByResourceGroup`,
   * `listByAzureSubscription`, tenant `list`), `PUT`, `PATCH`, or default point `GET`
   * responses, so Azure Resource Graph and control-plane caches never receive or store
   * PII. Returned exclusively on single-resource point `GET` when the caller explicitly
   * passes `$expandCustomerData=true` (per `ARG002`). Present as an optional property on
   * the shared resource model because `RPC-Get-V1-10` requires collection `GET` `value[]`
   * to use the same resource schema as point `GET`. Callers requesting customer data must
   * have appropriate authorization and handle the value per GDPR requirements.
   *
   * `@secret` is applied so SDK generators emit `format: password`, ensuring the value
   * is redacted in logs, CLI output, and diagnostic traces.
   */
  readonly purchaserEmail?: string;
  /** The quote identifier associated with the purchase. */
  quoteId?: string;
  /** The private offer identifier. */
  privateOfferId?: string;
  /** The product code. Primary purchase identifier for GA — used to resolve term details server-side. */
  productCode?: string;
  /** Optional update intent specifying how term dates are handled during plan or term updates. */
  intent?: PatchIntent;
}

export function saasResourcePropertiesSerializer(item: SaasResourceProperties): any {
  return {
    description: item["description"],
    quantity: item["quantity"],
    riskPropertyBagHeader: item["riskPropertyBagHeader"],
    autoRenew: item["autoRenew"],
    storefront: item["storefront"],
    quoteId: item["quoteId"],
    privateOfferId: item["privateOfferId"],
    productCode: item["productCode"],
    intent: item["intent"],
  };
}

export function saasResourcePropertiesDeserializer(item: any): SaasResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    assetId: item["assetId"],
    description: item["description"],
    status: item["status"],
    statusReason: item["statusReason"],
    quantity: item["quantity"],
    publisherName: item["publisherName"],
    planName: item["planName"],
    offerName: item["offerName"],
    termUnit: item["termUnit"],
    billingPeriod: item["billingPeriod"],
    riskPropertyBagHeader: item["riskPropertyBagHeader"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    futureStartDate: !item["futureStartDate"]
      ? item["futureStartDate"]
      : new Date(item["futureStartDate"]),
    autoRenew: item["autoRenew"],
    isFreeTrial: item["isFreeTrial"],
    storefront: item["storefront"],
    purchaserEmail: item["purchaserEmail"],
    quoteId: item["quoteId"],
    privateOfferId: item["privateOfferId"],
    productCode: item["productCode"],
    intent: item["intent"],
  };
}

/** The provisioning state of the SaaS resource. */
export enum KnownSaasProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** A resource write was accepted and is still being processed. */
  Accepted = "Accepted",
  /** The provisioning operation has not started. */
  NotStarted = "NotStarted",
  /** The provisioning operation is currently running. */
  InProgress = "InProgress",
}

/**
 * The provisioning state of the SaaS resource. \
 * {@link KnownSaasProvisioningState} can be used interchangeably with SaasProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: A resource write was accepted and is still being processed. \
 * **NotStarted**: The provisioning operation has not started. \
 * **InProgress**: The provisioning operation is currently running.
 */
export type SaasProvisioningState = string;

/** The SaaS Subscription Status. */
export enum KnownSaasResourceStatus {
  /** Subscription has not started */
  NotStarted = "NotStarted",
  /** Pending fulfillment start */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** The subscription is active and in use */
  Subscribed = "Subscribed",
  /** The subscription has been cancelled */
  Unsubscribed = "Unsubscribed",
  /** The subscription is suspended */
  Suspended = "Suspended",
}

/**
 * The SaaS Subscription Status. \
 * {@link KnownSaasResourceStatus} can be used interchangeably with SaasResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Subscription has not started \
 * **PendingFulfillmentStart**: Pending fulfillment start \
 * **Subscribed**: The subscription is active and in use \
 * **Unsubscribed**: The subscription has been cancelled \
 * **Suspended**: The subscription is suspended
 */
export type SaasResourceStatus = string;

/** The reason for the subscription status. */
export enum KnownSubscriptionStatusReason {
  /** No specific reason */
  None = "None",
  /** Suspended internally */
  SuspendedInternal = "SuspendedInternal",
  /** Azure subscription deleted */
  AzureSubscriptionDeletion = "AzureSubscriptionDeletion",
}

/**
 * The reason for the subscription status. \
 * {@link KnownSubscriptionStatusReason} can be used interchangeably with SubscriptionStatusReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No specific reason \
 * **SuspendedInternal**: Suspended internally \
 * **AzureSubscriptionDeletion**: Azure subscription deleted
 */
export type SubscriptionStatusReason = string;

/** The intent for a patch operation. */
export enum KnownPatchIntent {
  /** Retain the current subscription */
  Retain = "Retain",
  /** Reset the subscription */
  Reset = "Reset",
  /** Schedule a change */
  ScheduleChange = "ScheduleChange",
}

/**
 * The intent for a patch operation. \
 * {@link KnownPatchIntent} can be used interchangeably with PatchIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Retain**: Retain the current subscription \
 * **Reset**: Reset the subscription \
 * **ScheduleChange**: Schedule a change
 */
export type PatchIntent = string;

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

/** The type used for update operations of the SaasResource. */
export interface SaasResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SaasResourceUpdateProperties;
}

export function saasResourceUpdateSerializer(item: SaasResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : saasResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SaasResource. */
export interface SaasResourceUpdateProperties {
  /** Optional description. Used as subscription display name by Teams, Admin Center, and other consumers. */
  description?: string;
  /** The seat count. */
  quantity?: number;
  /** The risk property bag header (JSON format). Write-only — not returned in GET responses. */
  riskPropertyBagHeader?: string;
  /** Whether the SaaS subscription will auto-renew upon term end. */
  autoRenew?: boolean;
  /** The storefront. */
  storefront?: string;
  /** The quote identifier associated with the purchase. */
  quoteId?: string;
  /** The private offer identifier. */
  privateOfferId?: string;
  /** The product code. Primary purchase identifier for GA — used to resolve term details server-side. */
  productCode?: string;
  /** Optional update intent specifying how term dates are handled during plan or term updates. */
  intent?: PatchIntent;
}

export function saasResourceUpdatePropertiesSerializer(item: SaasResourceUpdateProperties): any {
  return {
    description: item["description"],
    quantity: item["quantity"],
    riskPropertyBagHeader: item["riskPropertyBagHeader"],
    autoRenew: item["autoRenew"],
    storefront: item["storefront"],
    quoteId: item["quoteId"],
    privateOfferId: item["privateOfferId"],
    productCode: item["productCode"],
    intent: item["intent"],
  };
}

/** The response of a SaasResource list operation. */
export interface _SaasResourceListResult {
  /** The SaasResource items on this page */
  value: SaasResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _saasResourceListResultDeserializer(item: any): _SaasResourceListResult {
  return {
    value: saasResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function saasResourceArraySerializer(result: Array<SaasResource>): any[] {
  return result.map((item) => {
    return saasResourceSerializer(item);
  });
}

export function saasResourceArrayDeserializer(result: Array<SaasResource>): any[] {
  return result.map((item) => {
    return saasResourceDeserializer(item);
  });
}

/** The ISV access token result response. */
export interface AccessTokenResult {
  /** The Publisher Offer Base Uri. */
  publisherOfferBaseUri?: string;
  /** The generated token. */
  token?: string;
  /** The offer URI with the embedded token. */
  offerUriWithToken?: string;
  /** The token expiry time. */
  expiryTime?: Date;
}

export function accessTokenResultDeserializer(item: any): AccessTokenResult {
  return {
    publisherOfferBaseUri: item["publisherOfferBaseUri"],
    token: item["token"],
    offerUriWithToken: item["offerUriWithToken"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
  };
}

/** Unsubscribe options for a SaaS resource. */
export interface UnsubscribeOptions {
  /** Whether it is unsubscribe only. */
  unsubscribeOnly?: boolean;
  /** The reason code. */
  reasonCode?: number;
  /** The feedback. */
  feedback?: string;
  /** The deletion source. Defaults to CustomerCancellation if not specified. */
  deletionSource?: DeletionSource;
}

export function unsubscribeOptionsSerializer(item: UnsubscribeOptions): any {
  return {
    unsubscribeOnly: item["unsubscribeOnly"],
    reasonCode: item["reasonCode"],
    feedback: item["feedback"],
    deletionSource: item["deletionSource"],
  };
}

/** The deletion source. */
export enum KnownDeletionSource {
  /** Customer initiated cancellation */
  CustomerCancellation = "CustomerCancellation",
  /** Azure subscription deletion */
  AzureSubscriptionDeletion = "AzureSubscriptionDeletion",
}

/**
 * The deletion source. \
 * {@link KnownDeletionSource} can be used interchangeably with DeletionSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomerCancellation**: Customer initiated cancellation \
 * **AzureSubscriptionDeletion**: Azure subscription deletion
 */
export type DeletionSource = string;

/** The result of validating a proposed purchase or resource update without modifying state. */
export interface ResourceValidationResult {
  /** Indicates whether the proposed purchase or update passed validation. */
  isValid: boolean;
  /** The list of validation failures. Empty when `isValid` is `true`. */
  details: ResourceValidationError[];
}

export function resourceValidationResultDeserializer(item: any): ResourceValidationResult {
  return {
    isValid: item["isValid"],
    details: resourceValidationErrorArrayDeserializer(item["details"]),
  };
}

export function resourceValidationErrorArrayDeserializer(
  result: Array<ResourceValidationError>,
): any[] {
  return result.map((item) => {
    return resourceValidationErrorDeserializer(item);
  });
}

/** A machine-readable error code and human-readable message describing a validation failure. */
export interface ResourceValidationError {
  /** Machine-readable validation error code. */
  code: string;
  /** Human-readable description of the validation failure. */
  message: string;
}

export function resourceValidationErrorDeserializer(item: any): ResourceValidationError {
  return {
    code: item["code"],
    message: item["message"],
  };
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

/** Request payload for validating a proposed SaaS purchase without creating the resource. */
export interface SaasPurchaseValidationRequest {
  /** The geo-location where the resource lives. Must be `global` for SaaS resources. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The proposed SaaS purchase properties, including the proposed resource name. */
  properties: SaasPurchaseValidationProperties;
}

export function saasPurchaseValidationRequestSerializer(item: SaasPurchaseValidationRequest): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: saasPurchaseValidationPropertiesSerializer(item["properties"]),
  };
}

/** SaaS purchase validation properties including the proposed resource name. */
export interface SaasPurchaseValidationProperties {
  /** The status of the last provisioning operation performed on the resource. */
  readonly provisioningState?: SaasProvisioningState;
  /** The SaaS asset identifier. Server-assigned unique identifier for the marketplace subscription. */
  readonly assetId?: string;
  /** Optional description. Used as subscription display name by Teams, Admin Center, and other consumers. */
  description?: string;
  /** The SaaS subscription status. Server-assigned. */
  readonly status?: SaasResourceStatus;
  /** The reason for the current status. Server-assigned. */
  readonly statusReason?: SubscriptionStatusReason;
  /** The seat count. */
  quantity?: number;
  /** The publisher name. Server-resolved from ProductCode. */
  readonly publisherName?: string;
  /** The plan name. Server-resolved from ProductCode. */
  readonly planName?: string;
  /** The offer name. Server-resolved from ProductCode. */
  readonly offerName?: string;
  /** The term unit (ISO 8601 duration, for example P1M or P1Y). Server-resolved from ProductCode. */
  readonly termUnit?: string;
  /** The billing period (ISO 8601 duration). Server-resolved from ProductCode. */
  readonly billingPeriod?: string;
  /** The risk property bag header (JSON format). Write-only — not returned in GET responses. */
  riskPropertyBagHeader?: string;
  /** The start date of the current term. Server-calculated. */
  readonly termStartDate?: Date;
  /** The end date of the current term. Server-calculated. */
  readonly termEndDate?: Date;
  /** The future start date of the subscription commitment, when available. Server-calculated. */
  readonly futureStartDate?: Date;
  /** Whether the SaaS subscription will auto-renew upon term end. */
  autoRenew?: boolean;
  /** Whether the current term is a free trial term. Server-determined. */
  readonly isFreeTrial?: boolean;
  /** The storefront. */
  storefront?: string;
  /**
   * The purchaser email. Server-derived from authenticated identity. Read-only.
   *
   * Customer data (PII): NEVER returned in `List` (`listByResourceGroup`,
   * `listByAzureSubscription`, tenant `list`), `PUT`, `PATCH`, or default point `GET`
   * responses, so Azure Resource Graph and control-plane caches never receive or store
   * PII. Returned exclusively on single-resource point `GET` when the caller explicitly
   * passes `$expandCustomerData=true` (per `ARG002`). Present as an optional property on
   * the shared resource model because `RPC-Get-V1-10` requires collection `GET` `value[]`
   * to use the same resource schema as point `GET`. Callers requesting customer data must
   * have appropriate authorization and handle the value per GDPR requirements.
   *
   * `@secret` is applied so SDK generators emit `format: password`, ensuring the value
   * is redacted in logs, CLI output, and diagnostic traces.
   */
  readonly purchaserEmail?: string;
  /** The quote identifier associated with the purchase. */
  quoteId?: string;
  /** The private offer identifier. */
  privateOfferId?: string;
  /** The product code. Primary purchase identifier for GA — used to resolve term details server-side. */
  productCode?: string;
  /** Optional update intent specifying how term dates are handled during plan or term updates. */
  intent?: PatchIntent;
  /** The proposed SaaS resource name to validate. */
  name: string;
}

export function saasPurchaseValidationPropertiesSerializer(
  item: SaasPurchaseValidationProperties,
): any {
  return {
    description: item["description"],
    quantity: item["quantity"],
    riskPropertyBagHeader: item["riskPropertyBagHeader"],
    autoRenew: item["autoRenew"],
    storefront: item["storefront"],
    quoteId: item["quoteId"],
    privateOfferId: item["privateOfferId"],
    productCode: item["productCode"],
    intent: item["intent"],
    name: item["name"],
  };
}

/** Tenant-level SaaS proxy resource for GA API version 2026-04-01. */
export interface SaasTenantResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SaasResourceProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function saasTenantResourceDeserializer(item: any): SaasTenantResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : saasResourcePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

/** The type used for update operations of the SaasTenantResource. */
export interface SaasTenantResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SaasTenantResourceUpdateProperties;
}

export function saasTenantResourceUpdateSerializer(item: SaasTenantResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : saasTenantResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SaasTenantResource. */
export interface SaasTenantResourceUpdateProperties {
  /** Optional description. Used as subscription display name by Teams, Admin Center, and other consumers. */
  description?: string;
  /** The seat count. */
  quantity?: number;
  /** The risk property bag header (JSON format). Write-only — not returned in GET responses. */
  riskPropertyBagHeader?: string;
  /** Whether the SaaS subscription will auto-renew upon term end. */
  autoRenew?: boolean;
  /** The storefront. */
  storefront?: string;
  /** The quote identifier associated with the purchase. */
  quoteId?: string;
  /** The private offer identifier. */
  privateOfferId?: string;
  /** The product code. Primary purchase identifier for GA — used to resolve term details server-side. */
  productCode?: string;
  /** Optional update intent specifying how term dates are handled during plan or term updates. */
  intent?: PatchIntent;
}

export function saasTenantResourceUpdatePropertiesSerializer(
  item: SaasTenantResourceUpdateProperties,
): any {
  return {
    description: item["description"],
    quantity: item["quantity"],
    riskPropertyBagHeader: item["riskPropertyBagHeader"],
    autoRenew: item["autoRenew"],
    storefront: item["storefront"],
    quoteId: item["quoteId"],
    privateOfferId: item["privateOfferId"],
    productCode: item["productCode"],
    intent: item["intent"],
  };
}

/** The response of a SaasTenantResource list operation. */
export interface _SaasTenantResourceListResult {
  /** The SaasTenantResource items on this page */
  value: SaasTenantResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _saasTenantResourceListResultDeserializer(
  item: any,
): _SaasTenantResourceListResult {
  return {
    value: saasTenantResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function saasTenantResourceArrayDeserializer(result: Array<SaasTenantResource>): any[] {
  return result.map((item) => {
    return saasTenantResourceDeserializer(item);
  });
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** API versions */
export enum KnownVersions {
  /** 2026-04-01 GA version */
  V20260401 = "2026-04-01",
}
