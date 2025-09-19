// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The paginated list of connected cluster API operations. */
export interface _OperationList {
  /** The list of connected cluster API operations. */
  value: OperationResponse[];
  /** The link to fetch the next page of connected cluster API operations. */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
  return {
    value: operationResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResponseArrayDeserializer(result: Array<OperationResponse>): any[] {
  return result.map((item) => {
    return operationResponseDeserializer(item);
  });
}

/** model interface OperationResponse */
export interface OperationResponse {
  name?: string;
  display?: OperationDisplay;
  origin?: string;
}

export function operationResponseDeserializer(item: any): OperationResponse {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** model interface OperationDisplay */
export interface OperationDisplay {
  /** Provider name. */
  provider?: string;
  /** Resource name. */
  resource?: string;
  /** Operation name. */
  operation?: string;
  /** Operation description. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Error. */
export interface ExceptionResponse {
  /** API error details. */
  error?: ServiceError;
}

export function exceptionResponseDeserializer(item: any): ExceptionResponse {
  return {
    error: !item["error"] ? item["error"] : serviceErrorDeserializer(item["error"]),
  };
}

/** API error details. */
export interface ServiceError {
  /** Error code. */
  code?: string;
  /** Error message. */
  message?: string;
  /** List of error details. */
  readonly details?: ServiceErrorDetail[];
}

export function serviceErrorDeserializer(item: any): ServiceError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : serviceErrorDetailArrayDeserializer(item["details"]),
  };
}

export function serviceErrorDetailArrayDeserializer(result: Array<ServiceErrorDetail>): any[] {
  return result.map((item) => {
    return serviceErrorDetailDeserializer(item);
  });
}

/** Error details. */
export interface ServiceErrorDetail {
  /** Error code. */
  readonly code?: string;
  /** Error message. */
  readonly message?: string;
}

export function serviceErrorDetailDeserializer(item: any): ServiceErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** List of quota requests with details. */
export interface QuotaRequestDetails extends ExtensionResource {
  /** Quota request details. */
  properties?: QuotaRequestProperties;
}

export function quotaRequestDetailsDeserializer(item: any): QuotaRequestDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaRequestPropertiesDeserializer(item["properties"]),
  };
}

/** Quota request properties. */
export interface QuotaRequestProperties {
  /** The quota request status. */
  readonly provisioningState?: QuotaRequestState;
  /** User-friendly status message. */
  readonly message?: string;
  /** Error details of the quota request. */
  error?: ServiceErrorDetail;
  /** The quota request submission time. The date conforms to the following format specified by the ISO 8601 standard: yyyy-MM-ddTHH:mm:ssZ */
  readonly requestSubmitTime?: Date;
  /** Quota request details. */
  value?: SubRequest[];
}

export function quotaRequestPropertiesDeserializer(item: any): QuotaRequestProperties {
  return {
    provisioningState: item["provisioningState"],
    message: item["message"],
    error: !item["error"] ? item["error"] : serviceErrorDetailDeserializer(item["error"]),
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    value: !item["value"] ? item["value"] : subRequestArrayDeserializer(item["value"]),
  };
}

/** Quota request status. */
export enum KnownQuotaRequestState {
  Accepted = "Accepted",
  Invalid = "Invalid",
  Succeeded = "Succeeded",
  Failed = "Failed",
  InProgress = "InProgress",
}

/**
 * Quota request status. \
 * {@link KnownQuotaRequestState} can be used interchangeably with QuotaRequestState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Invalid** \
 * **Succeeded** \
 * **Failed** \
 * **InProgress**
 */
export type QuotaRequestState = string;

export function subRequestArrayDeserializer(result: Array<SubRequest>): any[] {
  return result.map((item) => {
    return subRequestDeserializer(item);
  });
}

/** Request property. */
export interface SubRequest {
  /** Resource name. */
  name?: ResourceName;
  /** Resource type for which the quota properties were requested. */
  readonly resourceType?: string;
  /** Quota limit units, such as Count and Bytes. When requesting quota, use the **unit** value returned in the GET response in the request body of your PUT operation. */
  unit?: string;
  /** The quota request status. */
  readonly provisioningState?: QuotaRequestState;
  /** User-friendly status message. */
  readonly message?: string;
  /** Quota request ID. */
  readonly subRequestId?: string;
  /** Resource quota limit properties. */
  limit?: LimitJsonObjectUnion;
}

export function subRequestDeserializer(item: any): SubRequest {
  return {
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    resourceType: item["resourceType"],
    unit: item["unit"],
    provisioningState: item["provisioningState"],
    message: item["message"],
    subRequestId: item["subRequestId"],
    limit: !item["limit"] ? item["limit"] : limitJsonObjectUnionDeserializer(item["limit"]),
  };
}

/** Name of the resource provided by the resource Provider. When requesting quota, use this property name. */
export interface ResourceName {
  /** Resource name. */
  value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function resourceNameSerializer(item: ResourceName): any {
  return { value: item["value"] };
}

export function resourceNameDeserializer(item: any): ResourceName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** LimitJson abstract class. */
export interface LimitJsonObject {
  /** The limit object type. */
  /** The discriminator possible values: LimitValue */
  limitObjectType: LimitType;
}

export function limitJsonObjectSerializer(item: LimitJsonObject): any {
  return { limitObjectType: item["limitObjectType"] };
}

export function limitJsonObjectDeserializer(item: any): LimitJsonObject {
  return {
    limitObjectType: item["limitObjectType"],
  };
}

/** Alias for LimitJsonObjectUnion */
export type LimitJsonObjectUnion = LimitObject | LimitJsonObject;

export function limitJsonObjectUnionSerializer(item: LimitJsonObjectUnion): any {
  switch (item.limitObjectType) {
    case "LimitValue":
      return limitObjectSerializer(item as LimitObject);

    default:
      return limitJsonObjectSerializer(item);
  }
}

export function limitJsonObjectUnionDeserializer(item: any): LimitJsonObjectUnion {
  switch (item.limitObjectType) {
    case "LimitValue":
      return limitObjectDeserializer(item as LimitObject);

    default:
      return limitJsonObjectDeserializer(item);
  }
}

/** The limit object type. */
export enum KnownLimitType {
  LimitValue = "LimitValue",
}

/**
 * The limit object type. \
 * {@link KnownLimitType} can be used interchangeably with LimitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LimitValue**
 */
export type LimitType = string;

/** The resource quota limit value. */
export interface LimitObject extends LimitJsonObject {
  /** The quota/limit value */
  value: number;
  /** The quota or usages limit types. */
  limitType?: QuotaLimitTypes;
  /** The limit object type. */
  limitObjectType: "LimitValue";
}

export function limitObjectSerializer(item: LimitObject): any {
  return {
    limitObjectType: item["limitObjectType"],
    value: item["value"],
    limitType: item["limitType"],
  };
}

export function limitObjectDeserializer(item: any): LimitObject {
  return {
    limitObjectType: item["limitObjectType"],
    value: item["value"],
    limitType: item["limitType"],
  };
}

/** The quota or usages limit types. */
export enum KnownQuotaLimitTypes {
  Independent = "Independent",
  Shared = "Shared",
}

/**
 * The quota or usages limit types. \
 * {@link KnownQuotaLimitTypes} can be used interchangeably with QuotaLimitTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Independent** \
 * **Shared**
 */
export type QuotaLimitTypes = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Quota request information. */
export interface _QuotaRequestDetailsList {
  /** The QuotaRequestDetails items on this page */
  value: QuotaRequestDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaRequestDetailsListDeserializer(item: any): _QuotaRequestDetailsList {
  return {
    value: quotaRequestDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaRequestDetailsArrayDeserializer(result: Array<QuotaRequestDetails>): any[] {
  return result.map((item) => {
    return quotaRequestDetailsDeserializer(item);
  });
}

/** Properties and filters for ShareQuota. The request parameter is optional, if there are no filters specified. */
export interface GroupQuotasEntity extends ProxyResource {
  /** Properties */
  properties?: GroupQuotasEntityProperties;
}

export function groupQuotasEntitySerializer(item: GroupQuotasEntity): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotasEntityPropertiesSerializer(item["properties"]),
  };
}

export function groupQuotasEntityDeserializer(item: any): GroupQuotasEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotasEntityPropertiesDeserializer(item["properties"]),
  };
}

/** Properties */
export interface GroupQuotasEntityProperties extends GroupQuotasEntityBase {}

export function groupQuotasEntityPropertiesSerializer(item: GroupQuotasEntityProperties): any {
  return { displayName: item["displayName"] };
}

export function groupQuotasEntityPropertiesDeserializer(item: any): GroupQuotasEntityProperties {
  return {
    displayName: item["displayName"],
    groupType: item["groupType"],
    provisioningState: item["provisioningState"],
  };
}

/** Properties and filters for ShareQuota. The request parameter is optional, if there are no filters specified. */
export interface GroupQuotasEntityBase {
  /** Display name of the GroupQuota entity. */
  displayName?: string;
  /** Type of the group. */
  readonly groupType?: GroupType;
  /** Provisioning state of the operation. */
  readonly provisioningState?: RequestState;
}

export function groupQuotasEntityBaseSerializer(item: GroupQuotasEntityBase): any {
  return { displayName: item["displayName"] };
}

export function groupQuotasEntityBaseDeserializer(item: any): GroupQuotasEntityBase {
  return {
    displayName: item["displayName"],
    groupType: item["groupType"],
    provisioningState: item["provisioningState"],
  };
}

/** Type of the group. */
export enum KnownGroupType {
  /** The group is used for subscription group quota allocations. */
  AllocationGroup = "AllocationGroup",
  /** The group is used for the enforced shared limit scenario */
  EnforcedGroup = "EnforcedGroup",
}

/**
 * Type of the group. \
 * {@link KnownGroupType} can be used interchangeably with GroupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllocationGroup**: The group is used for subscription group quota allocations. \
 * **EnforcedGroup**: The group is used for the enforced shared limit scenario
 */
export type GroupType = string;

/** Request status. */
export enum KnownRequestState {
  /** The quota request has been accepted. */
  Accepted = "Accepted",
  /** The quota request has been created. */
  Created = "Created",
  /** The quota request is invalid. */
  Invalid = "Invalid",
  /** The quota request has succeeded. */
  Succeeded = "Succeeded",
  /** The quota request has been escalated for further review. Please file a support ticket. A support engineer will follow up. */
  Escalated = "Escalated",
  /** The quota request has failed. */
  Failed = "Failed",
  /** The quota request is currently being processed. */
  InProgress = "InProgress",
  /** The quota request has been canceled. */
  Canceled = "Canceled",
}

/**
 * Request status. \
 * {@link KnownRequestState} can be used interchangeably with RequestState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The quota request has been accepted. \
 * **Created**: The quota request has been created. \
 * **Invalid**: The quota request is invalid. \
 * **Succeeded**: The quota request has succeeded. \
 * **Escalated**: The quota request has been escalated for further review. Please file a support ticket. A support engineer will follow up. \
 * **Failed**: The quota request has failed. \
 * **InProgress**: The quota request is currently being processed. \
 * **Canceled**: The quota request has been canceled.
 */
export type RequestState = string;

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

/** Properties and filters for ShareQuota. The request parameter is optional, if there are no filters specified. */
export interface GroupQuotasEntityPatch extends ProxyResource {
  /** Properties */
  properties?: GroupQuotasEntityPatchProperties;
}

export function groupQuotasEntityPatchSerializer(item: GroupQuotasEntityPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotasEntityPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties */
export interface GroupQuotasEntityPatchProperties extends GroupQuotasEntityBasePatch {}

export function groupQuotasEntityPatchPropertiesSerializer(
  item: GroupQuotasEntityPatchProperties,
): any {
  return { displayName: item["displayName"] };
}

/** Properties and filters for ShareQuota. The request parameter is optional, if there are no filters specified. */
export interface GroupQuotasEntityBasePatch {
  /** Display name of the GroupQuota entity. */
  displayName?: string;
  /** Provisioning state of the operation. */
  readonly provisioningState?: RequestState;
}

export function groupQuotasEntityBasePatchSerializer(item: GroupQuotasEntityBasePatch): any {
  return { displayName: item["displayName"] };
}

/** List of Group Quotas at MG level. */
export interface _GroupQuotaList {
  /** The GroupQuotasEntity items on this page */
  value: GroupQuotasEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _groupQuotaListDeserializer(item: any): _GroupQuotaList {
  return {
    value: groupQuotasEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupQuotasEntityArraySerializer(result: Array<GroupQuotasEntity>): any[] {
  return result.map((item) => {
    return groupQuotasEntitySerializer(item);
  });
}

export function groupQuotasEntityArrayDeserializer(result: Array<GroupQuotasEntity>): any[] {
  return result.map((item) => {
    return groupQuotasEntityDeserializer(item);
  });
}

/** Share Quota Entity list. */
export interface _SubmittedResourceRequestStatusList {
  /** The SubmittedResourceRequestStatus items on this page */
  value: SubmittedResourceRequestStatus[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _submittedResourceRequestStatusListDeserializer(
  item: any,
): _SubmittedResourceRequestStatusList {
  return {
    value: submittedResourceRequestStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function submittedResourceRequestStatusArrayDeserializer(
  result: Array<SubmittedResourceRequestStatus>,
): any[] {
  return result.map((item) => {
    return submittedResourceRequestStatusDeserializer(item);
  });
}

/** Status of a single GroupQuota request. */
export interface SubmittedResourceRequestStatus extends ProxyResource {
  properties?: SubmittedResourceRequestStatusProperties;
}

export function submittedResourceRequestStatusDeserializer(
  item: any,
): SubmittedResourceRequestStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : submittedResourceRequestStatusPropertiesDeserializer(item["properties"]),
  };
}

/** model interface SubmittedResourceRequestStatusProperties */
export interface SubmittedResourceRequestStatusProperties {
  /** Requested Resource. */
  requestedResource?: GroupQuotaRequestBase;
  /** The request submission time. The date conforms to the following format specified by the ISO 8601 standard: yyyy-MM-ddTHH:mm:ssZ */
  readonly requestSubmitTime?: Date;
  /** Request status. */
  readonly provisioningState?: RequestState;
  /** Details of the failure. */
  readonly faultCode?: string;
}

export function submittedResourceRequestStatusPropertiesDeserializer(
  item: any,
): SubmittedResourceRequestStatusProperties {
  return {
    requestedResource: !item["requestedResource"]
      ? item["requestedResource"]
      : groupQuotaRequestBaseDeserializer(item["requestedResource"]),
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    provisioningState: item["provisioningState"],
    faultCode: item["faultCode"],
  };
}

/** The new GroupQuota limit requested. */
export interface GroupQuotaRequestBase {
  properties?: GroupQuotaRequestBaseProperties;
}

export function groupQuotaRequestBaseDeserializer(item: any): GroupQuotaRequestBase {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaRequestBasePropertiesDeserializer(item["properties"]),
  };
}

/** model interface GroupQuotaRequestBaseProperties */
export interface GroupQuotaRequestBaseProperties {
  /** The new quota limit for the subscription. The incremental quota will be allocated from pre-approved group quota. */
  limit?: number;
  /** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
  readonly name?: GroupQuotaRequestBasePropertiesName;
  /** Location/Azure region for the quota requested for resource. */
  region?: string;
  /** GroupQuota Request comments and details for request. This is optional paramter to provide more details related to the requested resource. */
  comments?: string;
}

export function groupQuotaRequestBasePropertiesDeserializer(
  item: any,
): GroupQuotaRequestBaseProperties {
  return {
    limit: item["limit"],
    name: !item["name"]
      ? item["name"]
      : groupQuotaRequestBasePropertiesNameDeserializer(item["name"]),
    region: item["region"],
    comments: item["comments"],
  };
}

/** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
export interface GroupQuotaRequestBasePropertiesName {
  /** Resource name. */
  readonly value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function groupQuotaRequestBasePropertiesNameDeserializer(
  item: any,
): GroupQuotaRequestBasePropertiesName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** List of Group Quota Limit details. */
export interface GroupQuotaLimitList extends ProxyResource {
  properties?: GroupQuotaLimitListProperties;
}

export function groupQuotaLimitListSerializer(item: GroupQuotaLimitList): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaLimitListPropertiesSerializer(item["properties"]),
  };
}

export function groupQuotaLimitListDeserializer(item: any): GroupQuotaLimitList {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaLimitListPropertiesDeserializer(item["properties"]),
  };
}

/** model interface GroupQuotaLimitListProperties */
export interface GroupQuotaLimitListProperties {
  /** Request status. */
  readonly provisioningState?: RequestState;
  /** List of Group Quota Limit details. */
  value?: GroupQuotaLimit[];
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
}

export function groupQuotaLimitListPropertiesSerializer(item: GroupQuotaLimitListProperties): any {
  return {
    value: !item["value"] ? item["value"] : groupQuotaLimitArraySerializer(item["value"]),
  };
}

export function groupQuotaLimitListPropertiesDeserializer(
  item: any,
): GroupQuotaLimitListProperties {
  return {
    provisioningState: item["provisioningState"],
    value: !item["value"] ? item["value"] : groupQuotaLimitArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupQuotaLimitArraySerializer(result: Array<GroupQuotaLimit>): any[] {
  return result.map((item) => {
    return groupQuotaLimitSerializer(item);
  });
}

export function groupQuotaLimitArrayDeserializer(result: Array<GroupQuotaLimit>): any[] {
  return result.map((item) => {
    return groupQuotaLimitDeserializer(item);
  });
}

/** Group Quota limit. */
export interface GroupQuotaLimit {
  /** Group Quota properties for the specified resource. */
  properties?: GroupQuotaLimitProperties;
}

export function groupQuotaLimitSerializer(item: GroupQuotaLimit): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaLimitPropertiesSerializer(item["properties"]),
  };
}

export function groupQuotaLimitDeserializer(item: any): GroupQuotaLimit {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaLimitPropertiesDeserializer(item["properties"]),
  };
}

/** Group Quota properties for the specified resource. */
export interface GroupQuotaLimitProperties extends GroupQuotaDetails {}

export function groupQuotaLimitPropertiesSerializer(item: GroupQuotaLimitProperties): any {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    comment: item["comment"],
  };
}

export function groupQuotaLimitPropertiesDeserializer(item: any): GroupQuotaLimitProperties {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    comment: item["comment"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : groupQuotaDetailsNameDeserializer(item["name"]),
    availableLimit: item["availableLimit"],
    allocatedToSubscriptions: !item["allocatedToSubscriptions"]
      ? item["allocatedToSubscriptions"]
      : allocatedQuotaToSubscriptionListDeserializer(item["allocatedToSubscriptions"]),
  };
}

/** Group Quota details. */
export interface GroupQuotaDetails {
  /** The resource name, such as SKU name. */
  resourceName?: string;
  /** The current Group Quota Limit at the parentId level. */
  limit?: number;
  /** Any comment related to quota request. */
  comment?: string;
  /** The usages units, such as Count and Bytes. When requesting quota, use the **unit** value returned in the GET response in the request body of your PUT operation. */
  readonly unit?: string;
  /** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
  readonly name?: GroupQuotaDetailsName;
  /** The available Group Quota Limit at the MG level. This Group quota can be allocated to subscription(s). */
  readonly availableLimit?: number;
  /** Quota allocated to subscriptions */
  readonly allocatedToSubscriptions?: AllocatedQuotaToSubscriptionList;
}

export function groupQuotaDetailsSerializer(item: GroupQuotaDetails): any {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    comment: item["comment"],
  };
}

export function groupQuotaDetailsDeserializer(item: any): GroupQuotaDetails {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    comment: item["comment"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : groupQuotaDetailsNameDeserializer(item["name"]),
    availableLimit: item["availableLimit"],
    allocatedToSubscriptions: !item["allocatedToSubscriptions"]
      ? item["allocatedToSubscriptions"]
      : allocatedQuotaToSubscriptionListDeserializer(item["allocatedToSubscriptions"]),
  };
}

/** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
export interface GroupQuotaDetailsName {
  /** Resource name. */
  readonly value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function groupQuotaDetailsNameDeserializer(item: any): GroupQuotaDetailsName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Quota allocated to subscriptions */
export interface AllocatedQuotaToSubscriptionList {
  /** List of Group Quota Limit allocated to subscriptions. */
  value?: AllocatedToSubscription[];
}

export function allocatedQuotaToSubscriptionListDeserializer(
  item: any,
): AllocatedQuotaToSubscriptionList {
  return {
    value: !item["value"] ? item["value"] : allocatedToSubscriptionArrayDeserializer(item["value"]),
  };
}

export function allocatedToSubscriptionArrayDeserializer(
  result: Array<AllocatedToSubscription>,
): any[] {
  return result.map((item) => {
    return allocatedToSubscriptionDeserializer(item);
  });
}

/** SubscriptionIds and quota allocated to subscriptions from the GroupQuota. */
export interface AllocatedToSubscription {
  /** An Azure subscriptionId. */
  subscriptionId?: string;
  /** The amount of quota allocated to this subscriptionId from the GroupQuotasEntity. */
  quotaAllocated?: number;
}

export function allocatedToSubscriptionDeserializer(item: any): AllocatedToSubscription {
  return {
    subscriptionId: item["subscriptionId"],
    quotaAllocated: item["quotaAllocated"],
  };
}

/** List of resource usages and quotas for GroupQuota. */
export interface _ResourceUsageList {
  /** The ResourceUsages items on this page */
  value: ResourceUsages[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceUsageListDeserializer(item: any): _ResourceUsageList {
  return {
    value: resourceUsagesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceUsagesArrayDeserializer(result: Array<ResourceUsages>): any[] {
  return result.map((item) => {
    return resourceUsagesDeserializer(item);
  });
}

/** Resource details with usages and GroupQuota. */
export interface ResourceUsages extends ProxyResource {
  /** Resource details with usages and GroupQuota. */
  properties?: GroupQuotaUsagesBase;
}

export function resourceUsagesDeserializer(item: any): ResourceUsages {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaUsagesBaseDeserializer(item["properties"]),
  };
}

/** Resource details with usages and GroupQuota. */
export interface GroupQuotaUsagesBase {
  /** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
  name?: GroupQuotaUsagesBaseName;
  /** Quota/limits for the resource. */
  limit?: number;
  /** Usages for the resource. */
  usages?: number;
  /** Representing the units of the usage quota. Possible values are: Count, Bytes, Seconds, Percent, CountPerSecond, BytesPerSecond. Based on - https://armwiki.azurewebsites.net/api_contracts/UsagesAPIContract.html?q=usages . Different RPs may have different units, Count, type as int64 should work for most of the integer values. */
  readonly unit?: string;
}

export function groupQuotaUsagesBaseDeserializer(item: any): GroupQuotaUsagesBase {
  return {
    name: !item["name"] ? item["name"] : groupQuotaUsagesBaseNameDeserializer(item["name"]),
    limit: item["limit"],
    usages: item["usages"],
    unit: item["unit"],
  };
}

/** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
export interface GroupQuotaUsagesBaseName {
  /** Resource name. */
  value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function groupQuotaUsagesBaseNameDeserializer(item: any): GroupQuotaUsagesBaseName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** This represents a Azure subscriptionId that is associated with a GroupQuotasEntity. */
export interface GroupQuotaSubscriptionId extends ProxyResource {
  properties?: GroupQuotaSubscriptionIdProperties;
}

export function groupQuotaSubscriptionIdDeserializer(item: any): GroupQuotaSubscriptionId {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaSubscriptionIdPropertiesDeserializer(item["properties"]),
  };
}

/** model interface GroupQuotaSubscriptionIdProperties */
export interface GroupQuotaSubscriptionIdProperties {
  /** An Azure subscriptionId. */
  subscriptionId?: string;
  /** Status of this subscriptionId being associated with the GroupQuotasEntity. */
  readonly provisioningState?: RequestState;
}

export function groupQuotaSubscriptionIdPropertiesDeserializer(
  item: any,
): GroupQuotaSubscriptionIdProperties {
  return {
    subscriptionId: item["subscriptionId"],
    provisioningState: item["provisioningState"],
  };
}

/** List of GroupQuotaSubscriptionIds */
export interface _GroupQuotaSubscriptionIdList {
  /** The GroupQuotaSubscriptionId items on this page */
  value: GroupQuotaSubscriptionId[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _groupQuotaSubscriptionIdListDeserializer(
  item: any,
): _GroupQuotaSubscriptionIdList {
  return {
    value: groupQuotaSubscriptionIdArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupQuotaSubscriptionIdArrayDeserializer(
  result: Array<GroupQuotaSubscriptionId>,
): any[] {
  return result.map((item) => {
    return groupQuotaSubscriptionIdDeserializer(item);
  });
}

/** The new quota limit request status. */
export interface GroupQuotaSubscriptionRequestStatus extends ProxyResource {
  properties?: GroupQuotaSubscriptionRequestStatusProperties;
}

export function groupQuotaSubscriptionRequestStatusDeserializer(
  item: any,
): GroupQuotaSubscriptionRequestStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotaSubscriptionRequestStatusPropertiesDeserializer(item["properties"]),
  };
}

/** model interface GroupQuotaSubscriptionRequestStatusProperties */
export interface GroupQuotaSubscriptionRequestStatusProperties {
  /** The subscription Id */
  subscriptionId?: string;
  /** The request submission time. The date conforms to the following format specified by the ISO 8601 standard: yyyy-MM-ddTHH:mm:ssZ */
  requestSubmitTime?: Date;
  /** Status of this subscriptionId being associated with the GroupQuotasEntity. */
  readonly provisioningState?: RequestState;
}

export function groupQuotaSubscriptionRequestStatusPropertiesDeserializer(
  item: any,
): GroupQuotaSubscriptionRequestStatusProperties {
  return {
    subscriptionId: item["subscriptionId"],
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    provisioningState: item["provisioningState"],
  };
}

/** List of GroupQuotaSubscriptionRequests Status */
export interface _GroupQuotaSubscriptionRequestStatusList {
  /** The GroupQuotaSubscriptionRequestStatus items on this page */
  value: GroupQuotaSubscriptionRequestStatus[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _groupQuotaSubscriptionRequestStatusListDeserializer(
  item: any,
): _GroupQuotaSubscriptionRequestStatusList {
  return {
    value: groupQuotaSubscriptionRequestStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupQuotaSubscriptionRequestStatusArrayDeserializer(
  result: Array<GroupQuotaSubscriptionRequestStatus>,
): any[] {
  return result.map((item) => {
    return groupQuotaSubscriptionRequestStatusDeserializer(item);
  });
}

/** Subscription quota list. */
export interface SubscriptionQuotaAllocationsList extends ProxyResource {
  properties?: SubscriptionQuotaAllocationsListProperties;
}

export function subscriptionQuotaAllocationsListSerializer(
  item: SubscriptionQuotaAllocationsList,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionQuotaAllocationsListPropertiesSerializer(item["properties"]),
  };
}

export function subscriptionQuotaAllocationsListDeserializer(
  item: any,
): SubscriptionQuotaAllocationsList {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionQuotaAllocationsListPropertiesDeserializer(item["properties"]),
  };
}

/** model interface SubscriptionQuotaAllocationsListProperties */
export interface SubscriptionQuotaAllocationsListProperties {
  /** Request status. */
  readonly provisioningState?: RequestState;
  /** Subscription quota list. */
  value?: SubscriptionQuotaAllocations[];
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
}

export function subscriptionQuotaAllocationsListPropertiesSerializer(
  item: SubscriptionQuotaAllocationsListProperties,
): any {
  return {
    value: !item["value"]
      ? item["value"]
      : subscriptionQuotaAllocationsArraySerializer(item["value"]),
  };
}

export function subscriptionQuotaAllocationsListPropertiesDeserializer(
  item: any,
): SubscriptionQuotaAllocationsListProperties {
  return {
    provisioningState: item["provisioningState"],
    value: !item["value"]
      ? item["value"]
      : subscriptionQuotaAllocationsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionQuotaAllocationsArraySerializer(
  result: Array<SubscriptionQuotaAllocations>,
): any[] {
  return result.map((item) => {
    return subscriptionQuotaAllocationsSerializer(item);
  });
}

export function subscriptionQuotaAllocationsArrayDeserializer(
  result: Array<SubscriptionQuotaAllocations>,
): any[] {
  return result.map((item) => {
    return subscriptionQuotaAllocationsDeserializer(item);
  });
}

/** Quota allocated to a subscription for the specific Resource Provider, Location, ResourceName. This will include the GroupQuota and total quota allocated to the subscription. Only the Group quota allocated to the subscription can be allocated back to the MG Group Quota. */
export interface SubscriptionQuotaAllocations {
  /** Quota properties for the specified resource. */
  properties?: SubscriptionQuotaAllocationsProperties;
}

export function subscriptionQuotaAllocationsSerializer(item: SubscriptionQuotaAllocations): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionQuotaAllocationsPropertiesSerializer(item["properties"]),
  };
}

export function subscriptionQuotaAllocationsDeserializer(item: any): SubscriptionQuotaAllocations {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionQuotaAllocationsPropertiesDeserializer(item["properties"]),
  };
}

/** Quota properties for the specified resource. */
export interface SubscriptionQuotaAllocationsProperties extends SubscriptionQuotaDetails {}

export function subscriptionQuotaAllocationsPropertiesSerializer(
  item: SubscriptionQuotaAllocationsProperties,
): any {
  return { resourceName: item["resourceName"], limit: item["limit"] };
}

export function subscriptionQuotaAllocationsPropertiesDeserializer(
  item: any,
): SubscriptionQuotaAllocationsProperties {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    shareableQuota: item["shareableQuota"],
    name: !item["name"] ? item["name"] : subscriptionQuotaDetailsNameDeserializer(item["name"]),
  };
}

/** Subscription Quota details. */
export interface SubscriptionQuotaDetails {
  /** The resource name, such as SKU name. */
  resourceName?: string;
  /** The total quota limit for the subscription. */
  limit?: number;
  /** The shareable quota for the subscription. */
  readonly shareableQuota?: number;
  /** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
  readonly name?: SubscriptionQuotaDetailsName;
}

export function subscriptionQuotaDetailsSerializer(item: SubscriptionQuotaDetails): any {
  return { resourceName: item["resourceName"], limit: item["limit"] };
}

export function subscriptionQuotaDetailsDeserializer(item: any): SubscriptionQuotaDetails {
  return {
    resourceName: item["resourceName"],
    limit: item["limit"],
    shareableQuota: item["shareableQuota"],
    name: !item["name"] ? item["name"] : subscriptionQuotaDetailsNameDeserializer(item["name"]),
  };
}

/** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
export interface SubscriptionQuotaDetailsName {
  /** Resource name. */
  readonly value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function subscriptionQuotaDetailsNameDeserializer(item: any): SubscriptionQuotaDetailsName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The subscription quota allocation status. */
export interface QuotaAllocationRequestStatus extends ProxyResource {
  properties?: QuotaAllocationRequestStatusProperties;
}

export function quotaAllocationRequestStatusDeserializer(item: any): QuotaAllocationRequestStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaAllocationRequestStatusPropertiesDeserializer(item["properties"]),
  };
}

/** model interface QuotaAllocationRequestStatusProperties */
export interface QuotaAllocationRequestStatusProperties {
  /** The new quota request allocated to subscription. */
  requestedResource?: QuotaAllocationRequestBase;
  /** The request submission time. The date conforms to the following format specified by the ISO 8601 standard: yyyy-MM-ddTHH:mm:ssZ */
  readonly requestSubmitTime?: Date;
  /** Request status. */
  readonly provisioningState?: RequestState;
  /** Details of the failure. */
  readonly faultCode?: string;
}

export function quotaAllocationRequestStatusPropertiesDeserializer(
  item: any,
): QuotaAllocationRequestStatusProperties {
  return {
    requestedResource: !item["requestedResource"]
      ? item["requestedResource"]
      : quotaAllocationRequestBaseDeserializer(item["requestedResource"]),
    requestSubmitTime: !item["requestSubmitTime"]
      ? item["requestSubmitTime"]
      : new Date(item["requestSubmitTime"]),
    provisioningState: item["provisioningState"],
    faultCode: item["faultCode"],
  };
}

/** The new quota request allocated to subscription. */
export interface QuotaAllocationRequestBase {
  properties?: QuotaAllocationRequestBaseProperties;
}

export function quotaAllocationRequestBaseDeserializer(item: any): QuotaAllocationRequestBase {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : quotaAllocationRequestBasePropertiesDeserializer(item["properties"]),
  };
}

/** model interface QuotaAllocationRequestBaseProperties */
export interface QuotaAllocationRequestBaseProperties {
  /** The new quota limit for the subscription. The incremental quota will be allocated from pre-approved group quota. */
  limit?: number;
  /** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
  readonly name?: QuotaAllocationRequestBasePropertiesName;
  /** The location for which the subscription is allocated */
  region?: string;
}

export function quotaAllocationRequestBasePropertiesDeserializer(
  item: any,
): QuotaAllocationRequestBaseProperties {
  return {
    limit: item["limit"],
    name: !item["name"]
      ? item["name"]
      : quotaAllocationRequestBasePropertiesNameDeserializer(item["name"]),
    region: item["region"],
  };
}

/** Name of the resource provided by the resource provider. This property is already included in the request URI, so it is a readonly property returned in the response. */
export interface QuotaAllocationRequestBasePropertiesName {
  /** Resource name. */
  readonly value?: string;
  /** Resource display name. */
  readonly localizedValue?: string;
}

export function quotaAllocationRequestBasePropertiesNameDeserializer(
  item: any,
): QuotaAllocationRequestBasePropertiesName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** List of QuotaAllocation Request Status */
export interface _QuotaAllocationRequestStatusList {
  /** The QuotaAllocationRequestStatus items on this page */
  value: QuotaAllocationRequestStatus[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaAllocationRequestStatusListDeserializer(
  item: any,
): _QuotaAllocationRequestStatusList {
  return {
    value: quotaAllocationRequestStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaAllocationRequestStatusArrayDeserializer(
  result: Array<QuotaAllocationRequestStatus>,
): any[] {
  return result.map((item) => {
    return quotaAllocationRequestStatusDeserializer(item);
  });
}

/** The GroupQuota Enforcement status for a Azure Location/Region. */
export interface GroupQuotasEnforcementStatus extends ProxyResource {
  properties?: GroupQuotasEnforcementStatusProperties;
}

export function groupQuotasEnforcementStatusSerializer(item: GroupQuotasEnforcementStatus): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotasEnforcementStatusPropertiesSerializer(item["properties"]),
  };
}

export function groupQuotasEnforcementStatusDeserializer(item: any): GroupQuotasEnforcementStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : groupQuotasEnforcementStatusPropertiesDeserializer(item["properties"]),
  };
}

/** model interface GroupQuotasEnforcementStatusProperties */
export interface GroupQuotasEnforcementStatusProperties {
  /** Is the GroupQuota Enforcement enabled for the Azure region. */
  enforcementEnabled?: EnforcementState;
  /** The name of the group that is enforced. */
  readonly enforcedGroupName?: string;
  /** Request status. */
  readonly provisioningState?: RequestState;
  /** Details of the failure. */
  readonly faultCode?: string;
}

export function groupQuotasEnforcementStatusPropertiesSerializer(
  item: GroupQuotasEnforcementStatusProperties,
): any {
  return { enforcementEnabled: item["enforcementEnabled"] };
}

export function groupQuotasEnforcementStatusPropertiesDeserializer(
  item: any,
): GroupQuotasEnforcementStatusProperties {
  return {
    enforcementEnabled: item["enforcementEnabled"],
    enforcedGroupName: item["enforcedGroupName"],
    provisioningState: item["provisioningState"],
    faultCode: item["faultCode"],
  };
}

/** Enforcement status. */
export enum KnownEnforcementState {
  Enabled = "Enabled",
  Disabled = "Disabled",
  NotAvailable = "NotAvailable",
}

/**
 * Enforcement status. \
 * {@link KnownEnforcementState} can be used interchangeably with EnforcementState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **NotAvailable**
 */
export type EnforcementState = string;

/** Resource usage. */
export interface CurrentUsagesBase extends ExtensionResource {
  /** Usage properties for the specified resource. */
  properties?: UsagesProperties;
}

export function currentUsagesBaseDeserializer(item: any): CurrentUsagesBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : usagesPropertiesDeserializer(item["properties"]),
  };
}

/** Usage properties for the specified resource. */
export interface UsagesProperties {
  /** The quota limit properties for this resource. */
  usages?: UsagesObject;
  /** The units for the quota usage, such as Count and Bytes. When requesting quota, use the **unit** value returned in the GET response in the request body of your PUT operation. */
  readonly unit?: string;
  /** Resource name provided by the resource provider. Use this property name when requesting quota. */
  name?: ResourceName;
  /** The name of the resource type. Optional field. */
  resourceType?: string;
  /**
   * The time period for the summary of the quota usage values. For example:
   * *P1D (per one day)
   * *PT1M (per one minute)
   * *PT1S (per one second).
   * This parameter is optional because it is not relevant for all resources such as compute.
   */
  readonly quotaPeriod?: string;
  /** States if quota can be requested for this resource. */
  readonly isQuotaApplicable?: boolean;
  /** Additional properties for the specific resource provider. */
  properties?: any;
}

export function usagesPropertiesDeserializer(item: any): UsagesProperties {
  return {
    usages: !item["usages"] ? item["usages"] : usagesObjectDeserializer(item["usages"]),
    unit: item["unit"],
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    resourceType: item["resourceType"],
    quotaPeriod: item["quotaPeriod"],
    isQuotaApplicable: item["isQuotaApplicable"],
    properties: item["properties"],
  };
}

/** The resource usages value. */
export interface UsagesObject {
  /** The usages value. */
  value: number;
  /** The quota or usages limit types. */
  usagesType?: UsagesTypes;
}

export function usagesObjectDeserializer(item: any): UsagesObject {
  return {
    value: item["value"],
    usagesType: item["usagesType"],
  };
}

/** The quota or usages limit types. */
export enum KnownUsagesTypes {
  Individual = "Individual",
  Combined = "Combined",
}

/**
 * The quota or usages limit types. \
 * {@link KnownUsagesTypes} can be used interchangeably with UsagesTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Individual** \
 * **Combined**
 */
export type UsagesTypes = string;

/** Quota limits. */
export interface _UsagesLimits {
  /** The CurrentUsagesBase items on this page */
  value: CurrentUsagesBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usagesLimitsDeserializer(item: any): _UsagesLimits {
  return {
    value: currentUsagesBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function currentUsagesBaseArrayDeserializer(result: Array<CurrentUsagesBase>): any[] {
  return result.map((item) => {
    return currentUsagesBaseDeserializer(item);
  });
}

/** Quota limit. */
export interface CurrentQuotaLimitBase extends ExtensionResource {
  /** Quota properties for the specified resource, based on the API called, Quotas or Usages. */
  properties?: QuotaProperties;
}

export function currentQuotaLimitBaseSerializer(item: CurrentQuotaLimitBase): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : quotaPropertiesSerializer(item["properties"]),
  };
}

export function currentQuotaLimitBaseDeserializer(item: any): CurrentQuotaLimitBase {
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

/** Quota properties for the specified resource. */
export interface QuotaProperties {
  /** Resource quota limit properties. */
  limit?: LimitJsonObjectUnion;
  /** The quota units, such as Count and Bytes. When requesting quota, use the **unit** value returned in the GET response in the request body of your PUT operation. */
  readonly unit?: string;
  /** Resource name provided by the resource provider. Use this property name when requesting quota. */
  name?: ResourceName;
  /** The name of the resource type. Optional field. */
  resourceType?: string;
  /**
   * The time period over which the quota usage values are summarized. For example:
   * *P1D (per one day)
   * *PT1M (per one minute)
   * *PT1S (per one second).
   * This parameter is optional because, for some resources like compute, the period is irrelevant.
   */
  readonly quotaPeriod?: string;
  /** States if quota can be requested for this resource. */
  readonly isQuotaApplicable?: boolean;
  /** Additional properties for the specific resource provider. */
  properties?: any;
}

export function quotaPropertiesSerializer(item: QuotaProperties): any {
  return {
    limit: !item["limit"] ? item["limit"] : limitJsonObjectUnionSerializer(item["limit"]),
    name: !item["name"] ? item["name"] : resourceNameSerializer(item["name"]),
    resourceType: item["resourceType"],
    properties: item["properties"],
  };
}

export function quotaPropertiesDeserializer(item: any): QuotaProperties {
  return {
    limit: !item["limit"] ? item["limit"] : limitJsonObjectUnionDeserializer(item["limit"]),
    unit: item["unit"],
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    resourceType: item["resourceType"],
    quotaPeriod: item["quotaPeriod"],
    isQuotaApplicable: item["isQuotaApplicable"],
    properties: item["properties"],
  };
}

/** Quota limits. */
export interface _QuotaLimits {
  /** The CurrentQuotaLimitBase items on this page */
  value: CurrentQuotaLimitBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaLimitsDeserializer(item: any): _QuotaLimits {
  return {
    value: currentQuotaLimitBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function currentQuotaLimitBaseArraySerializer(result: Array<CurrentQuotaLimitBase>): any[] {
  return result.map((item) => {
    return currentQuotaLimitBaseSerializer(item);
  });
}

export function currentQuotaLimitBaseArrayDeserializer(
  result: Array<CurrentQuotaLimitBase>,
): any[] {
  return result.map((item) => {
    return currentQuotaLimitBaseDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-01 API version. */
  V20250901 = "2025-09-01",
}
