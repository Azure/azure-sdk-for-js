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

/** An error response for a resource management request. */
export interface CloudError {
  /** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
  error?: ErrorResponse;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorResponseArrayDeserializer(result: Array<ErrorResponse>): any[] {
  return result.map((item) => {
    return errorResponseDeserializer(item);
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
  readonly info?: Record<string, unknown>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Resource group information. */
export interface ResourceGroup extends TrackedResource {
  /** The resource group properties. */
  properties?: ResourceGroupProperties;
  /** The ID of the resource that manages this resource group. */
  managedBy?: string;
}

export function resourceGroupSerializer(item: ResourceGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : resourceGroupPropertiesSerializer(item["properties"]),
    managedBy: item["managedBy"],
  };
}

export function resourceGroupDeserializer(item: any): ResourceGroup {
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
      : resourceGroupPropertiesDeserializer(item["properties"]),
    managedBy: item["managedBy"],
  };
}

/** The resource group properties. */
export interface ResourceGroupProperties {
  /** The provisioning state. */
  readonly provisioningState?: string;
}

export function resourceGroupPropertiesSerializer(_item: ResourceGroupProperties): any {
  return {};
}

export function resourceGroupPropertiesDeserializer(item: any): ResourceGroupProperties {
  return {
    provisioningState: item["provisioningState"],
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

/** Resource group information. */
export interface ResourceGroupPatchable {
  /** The name of the resource group. */
  name?: string;
  /** The resource group properties. */
  properties?: ResourceGroupProperties;
  /** The ID of the resource that manages this resource group. */
  managedBy?: string;
  /** The tags attached to the resource group. */
  tags?: Record<string, string>;
}

export function resourceGroupPatchableSerializer(item: ResourceGroupPatchable): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : resourceGroupPropertiesSerializer(item["properties"]),
    managedBy: item["managedBy"],
    tags: item["tags"],
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

/** The response of a ResourceGroup list operation. */
export interface _ResourceGroupListResult {
  /** The ResourceGroup items on this page */
  value: ResourceGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceGroupListResultDeserializer(item: any): _ResourceGroupListResult {
  return {
    value: resourceGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceGroupArraySerializer(result: Array<ResourceGroup>): any[] {
  return result.map((item) => {
    return resourceGroupSerializer(item);
  });
}

export function resourceGroupArrayDeserializer(result: Array<ResourceGroup>): any[] {
  return result.map((item) => {
    return resourceGroupDeserializer(item);
  });
}

/** Export resource group template request parameters. */
export interface ExportTemplateRequest {
  /** The IDs of the resources to filter the export by. To export all resources, supply an array with single entry '*'. */
  resources?: string[];
  /** The export template options. A CSV-formatted list containing zero or more of the following: 'IncludeParameterDefaultValue', 'IncludeComments', 'SkipResourceNameParameterization', 'SkipAllParameterization' */
  options?: string;
  /** The output format for the exported resources. */
  outputFormat?: ExportTemplateOutputFormat;
}

export function exportTemplateRequestSerializer(item: ExportTemplateRequest): any {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    options: item["options"],
    outputFormat: item["outputFormat"],
  };
}

/** The output format for the exported resources. */
export enum KnownExportTemplateOutputFormat {
  /** Json */
  Json = "Json",
  /** Bicep */
  Bicep = "Bicep",
}

/**
 * The output format for the exported resources. \
 * {@link KnownExportTemplateOutputFormat} can be used interchangeably with ExportTemplateOutputFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Json**: Json \
 * **Bicep**: Bicep
 */
export type ExportTemplateOutputFormat = string;

/** Resource group export result. */
export interface ResourceGroupExportResult {
  /** The template content. Used if outputFormat is empty or set to 'Json'. */
  template?: Record<string, unknown>;
  /** The formatted export content. Used if outputFormat is set to 'Bicep'. */
  output?: string;
  /** The template export error. */
  error?: ErrorDetail;
}

export function resourceGroupExportResultDeserializer(item: any): ResourceGroupExportResult {
  return {
    template: item["template"],
    output: item["output"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Paged collection of GenericResourceExpanded items */
export interface _ResourceListResult {
  /** The GenericResourceExpanded items on this page */
  value: GenericResourceExpanded[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceListResultDeserializer(item: any): _ResourceListResult {
  return {
    value: genericResourceExpandedArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function genericResourceExpandedArrayDeserializer(
  result: Array<GenericResourceExpanded>,
): any[] {
  return result.map((item) => {
    return genericResourceExpandedDeserializer(item);
  });
}

/** Resource information. */
export interface GenericResourceExpanded extends GenericResource {
  /** The created time of the resource. This is only present if requested via the $expand query parameter. */
  readonly createdTime?: Date;
  /** The changed time of the resource. This is only present if requested via the $expand query parameter. */
  readonly changedTime?: Date;
  /** The provisioning state of the resource. This is only present if requested via the $expand query parameter. */
  readonly provisioningState?: string;
}

export function genericResourceExpandedDeserializer(item: any): GenericResourceExpanded {
  return {
    properties: item["properties"],
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    kind: item["kind"],
    managedBy: item["managedBy"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    location: item["location"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    changedTime: !item["changedTime"] ? item["changedTime"] : new Date(item["changedTime"]),
    provisioningState: item["provisioningState"],
  };
}

/** Resource information. */
export interface GenericResource extends Resource {
  /** The resource-specific properties for this resource. */
  properties?: Record<string, unknown>;
  /** The plan of the resource. */
  plan?: Plan;
  /** The kind of the resource. */
  kind?: string;
  /** ID of the resource that manages this resource. */
  managedBy?: string;
  /** The SKU of the resource. */
  sku?: Sku;
  /** The identity of the resource. */
  identity?: Identity;
  /** Resource location */
  location?: string;
  /** Resource extended location. */
  extendedLocation?: ExtendedLocation;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function genericResourceSerializer(item: GenericResource): any {
  return {
    properties: item["properties"],
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    kind: item["kind"],
    managedBy: item["managedBy"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    location: item["location"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    tags: item["tags"],
  };
}

export function genericResourceDeserializer(item: any): GenericResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: item["properties"],
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    kind: item["kind"],
    managedBy: item["managedBy"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    location: item["location"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Plan for the resource. */
export interface Plan {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** The offer ID. */
  product?: string;
  /** The promotion code. */
  promotionCode?: string;
  /** The plan's version. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** SKU for the resource. */
export interface Sku {
  /** The SKU name. */
  name?: string;
  /** The SKU tier. */
  tier?: string;
  /** The SKU size. */
  size?: string;
  /** The SKU family. */
  family?: string;
  /** The SKU model. */
  model?: string;
  /** The SKU capacity. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    model: item["model"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    model: item["model"],
    capacity: item["capacity"],
  };
}

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, IdentityUserAssignedIdentitiesValue>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : identityUserAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : identityUserAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function identityUserAssignedIdentitiesValueRecordSerializer(
  item: Record<string, IdentityUserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : identityUserAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

export function identityUserAssignedIdentitiesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, IdentityUserAssignedIdentitiesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : identityUserAssignedIdentitiesValueDeserializer(item[key]);
  });
  return result;
}

/** model interface IdentityUserAssignedIdentitiesValue */
export interface IdentityUserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function identityUserAssignedIdentitiesValueSerializer(
  _item: IdentityUserAssignedIdentitiesValue,
): any {
  return {};
}

export function identityUserAssignedIdentitiesValueDeserializer(
  item: any,
): IdentityUserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Resource extended location. */
export interface ExtendedLocation {
  /** The extended location type. */
  type?: ExtendedLocationType;
  /** The extended location name. */
  name?: string;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { type: item["type"], name: item["name"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The extended location type. */
export enum KnownExtendedLocationType {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The extended location type. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: EdgeZone
 */
export type ExtendedLocationType = string;

/** Parameters of move resources. */
export interface ResourcesMoveInfo {
  /** The IDs of the resources. */
  resources?: string[];
  /** The target resource group. */
  targetResourceGroup?: string;
}

export function resourcesMoveInfoSerializer(item: ResourcesMoveInfo): any {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    targetResourceGroup: item["targetResourceGroup"],
  };
}

/** Wrapper resource for tags API requests and responses. */
export interface TagsResource extends ExtensionResource {
  /** The set of tags. */
  properties: Tags;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { properties: tagsSerializer(item["properties"]) };
}

export function tagsResourceDeserializer(item: any): TagsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: tagsDeserializer(item["properties"]),
  };
}

/** A dictionary of name and value pairs. */
export interface Tags {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function tagsSerializer(item: Tags): any {
  return { tags: item["tags"] };
}

export function tagsDeserializer(item: any): Tags {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
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

/** Wrapper resource for tags patch API request only. */
export interface TagsPatchResource {
  /** The operation type for the patch API. */
  operation?: TagsPatchOperation;
  /** The set of tags. */
  properties?: Tags;
}

export function tagsPatchResourceSerializer(item: TagsPatchResource): any {
  return {
    operation: item["operation"],
    properties: !item["properties"] ? item["properties"] : tagsSerializer(item["properties"]),
  };
}

/** The operation type for the patch API. */
export enum KnownTagsPatchOperation {
  /** The 'replace' option replaces the entire set of existing tags with a new set. */
  Replace = "Replace",
  /** The 'merge' option allows adding tags with new names and updating the values of tags with existing names. */
  Merge = "Merge",
  /** The 'delete' option allows selectively deleting tags based on given names or name/value pairs. */
  Delete = "Delete",
}

/**
 * The operation type for the patch API. \
 * {@link KnownTagsPatchOperation} can be used interchangeably with TagsPatchOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Replace**: The 'replace' option replaces the entire set of existing tags with a new set. \
 * **Merge**: The 'merge' option allows adding tags with new names and updating the values of tags with existing names. \
 * **Delete**: The 'delete' option allows selectively deleting tags based on given names or name\/value pairs.
 */
export type TagsPatchOperation = string;

/** Tag information. */
export interface TagValue {
  /** The tag value ID. */
  readonly id?: string;
  /** The tag value. */
  tagValue?: string;
  /** The tag value count. */
  count?: TagCount;
}

export function tagValueDeserializer(item: any): TagValue {
  return {
    id: item["id"],
    tagValue: item["tagValue"],
    count: !item["count"] ? item["count"] : tagCountDeserializer(item["count"]),
  };
}

/** Tag count. */
export interface TagCount {
  /** Type of count. */
  type?: string;
  /** Value of count. */
  value?: number;
}

export function tagCountDeserializer(item: any): TagCount {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Tag details. */
export interface TagDetails {
  /** The tag name ID. */
  readonly id?: string;
  /** The tag name. */
  tagName?: string;
  /** The total number of resources that use the resource tag. When a tag is initially created and has no associated resources, the value is 0. */
  count?: TagCount;
  /** The list of tag values. */
  values?: TagValue[];
}

export function tagDetailsDeserializer(item: any): TagDetails {
  return {
    id: item["id"],
    tagName: item["tagName"],
    count: !item["count"] ? item["count"] : tagCountDeserializer(item["count"]),
    values: !item["values"] ? item["values"] : tagValueArrayDeserializer(item["values"]),
  };
}

export function tagValueArrayDeserializer(result: Array<TagValue>): any[] {
  return result.map((item) => {
    return tagValueDeserializer(item);
  });
}

/** List of subscription tags. */
export interface _TagsListResult {
  /** The TagDetails items on this page */
  value: TagDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tagsListResultDeserializer(item: any): _TagsListResult {
  return {
    value: tagDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tagDetailsArrayDeserializer(result: Array<TagDetails>): any[] {
  return result.map((item) => {
    return tagDetailsDeserializer(item);
  });
}

/** List of resource providers. */
export interface _ProviderListResult {
  /** The Provider items on this page */
  value: Provider[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _providerListResultDeserializer(item: any): _ProviderListResult {
  return {
    value: providerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function providerArrayDeserializer(result: Array<Provider>): any[] {
  return result.map((item) => {
    return providerDeserializer(item);
  });
}

/** Resource provider information. */
export interface Provider {
  /** The provider ID. */
  readonly id?: string;
  /** The namespace of the resource provider. */
  namespace?: string;
  /** The registration state of the resource provider. */
  readonly registrationState?: string;
  /** The registration policy of the resource provider. */
  readonly registrationPolicy?: string;
  /** The collection of provider resource types. */
  readonly resourceTypes?: ProviderResourceType[];
  /** The provider authorization consent state. */
  providerAuthorizationConsentState?: ProviderAuthorizationConsentState;
}

export function providerDeserializer(item: any): Provider {
  return {
    id: item["id"],
    namespace: item["namespace"],
    registrationState: item["registrationState"],
    registrationPolicy: item["registrationPolicy"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : providerResourceTypeArrayDeserializer(item["resourceTypes"]),
    providerAuthorizationConsentState: item["providerAuthorizationConsentState"],
  };
}

export function providerResourceTypeArrayDeserializer(result: Array<ProviderResourceType>): any[] {
  return result.map((item) => {
    return providerResourceTypeDeserializer(item);
  });
}

/** Resource type managed by the resource provider. */
export interface ProviderResourceType {
  /** The resource type. */
  resourceType?: string;
  /** The collection of locations where this resource type can be created. */
  locations?: string[];
  /** The location mappings that are supported by this resource type. */
  locationMappings?: ProviderExtendedLocation[];
  /** The aliases that are supported by this resource type. */
  aliases?: Alias[];
  /** The API version. */
  apiVersions?: string[];
  /** The default API version. */
  readonly defaultApiVersion?: string;
  zoneMappings?: ZoneMapping[];
  /** The API profiles for the resource provider. */
  readonly apiProfiles?: ApiProfile[];
  /** The additional capabilities offered by this resource type. */
  capabilities?: string;
  /** The properties. */
  properties?: Record<string, string>;
}

export function providerResourceTypeDeserializer(item: any): ProviderResourceType {
  return {
    resourceType: item["resourceType"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationMappings: !item["locationMappings"]
      ? item["locationMappings"]
      : providerExtendedLocationArrayDeserializer(item["locationMappings"]),
    aliases: !item["aliases"] ? item["aliases"] : aliasArrayDeserializer(item["aliases"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    defaultApiVersion: item["defaultApiVersion"],
    zoneMappings: !item["zoneMappings"]
      ? item["zoneMappings"]
      : zoneMappingArrayDeserializer(item["zoneMappings"]),
    apiProfiles: !item["apiProfiles"]
      ? item["apiProfiles"]
      : apiProfileArrayDeserializer(item["apiProfiles"]),
    capabilities: item["capabilities"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function providerExtendedLocationArrayDeserializer(
  result: Array<ProviderExtendedLocation>,
): any[] {
  return result.map((item) => {
    return providerExtendedLocationDeserializer(item);
  });
}

/** The provider extended location. */
export interface ProviderExtendedLocation {
  /** The azure location. */
  location?: string;
  /** The extended location type. */
  type?: string;
  /** The extended locations for the azure location. */
  extendedLocations?: string[];
}

export function providerExtendedLocationDeserializer(item: any): ProviderExtendedLocation {
  return {
    location: item["location"],
    type: item["type"],
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : item["extendedLocations"].map((p: any) => {
          return p;
        }),
  };
}

export function aliasArrayDeserializer(result: Array<Alias>): any[] {
  return result.map((item) => {
    return aliasDeserializer(item);
  });
}

/** The alias type. */
export interface Alias {
  /** The alias name. */
  name?: string;
  /** The paths for an alias. */
  paths?: AliasPath[];
  /** The type of the alias. */
  type?: AliasType;
  /** The default path for an alias. */
  defaultPath?: string;
  /** The default pattern for an alias. */
  defaultPattern?: AliasPattern;
  /** The default alias path metadata. Applies to the default path and to any alias path that doesn't have metadata */
  readonly defaultMetadata?: AliasPathMetadata;
}

export function aliasDeserializer(item: any): Alias {
  return {
    name: item["name"],
    paths: !item["paths"] ? item["paths"] : aliasPathArrayDeserializer(item["paths"]),
    type: item["type"],
    defaultPath: item["defaultPath"],
    defaultPattern: !item["defaultPattern"]
      ? item["defaultPattern"]
      : aliasPatternDeserializer(item["defaultPattern"]),
    defaultMetadata: !item["defaultMetadata"]
      ? item["defaultMetadata"]
      : aliasPathMetadataDeserializer(item["defaultMetadata"]),
  };
}

export function aliasPathArrayDeserializer(result: Array<AliasPath>): any[] {
  return result.map((item) => {
    return aliasPathDeserializer(item);
  });
}

/** The type of the paths for alias. */
export interface AliasPath {
  /** The path of an alias. */
  path?: string;
  /** The API versions. */
  apiVersions?: string[];
  /** The pattern for an alias path. */
  pattern?: AliasPattern;
  /** The metadata of the alias path. If missing, fall back to the default metadata of the alias. */
  readonly metadata?: AliasPathMetadata;
}

export function aliasPathDeserializer(item: any): AliasPath {
  return {
    path: item["path"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    pattern: !item["pattern"] ? item["pattern"] : aliasPatternDeserializer(item["pattern"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : aliasPathMetadataDeserializer(item["metadata"]),
  };
}

/** The type of the pattern for an alias path. */
export interface AliasPattern {
  /** The alias pattern phrase. */
  phrase?: string;
  /** The alias pattern variable. */
  variable?: string;
  /** The type of alias pattern */
  type?: AliasPatternType;
}

export function aliasPatternDeserializer(item: any): AliasPattern {
  return {
    phrase: item["phrase"],
    variable: item["variable"],
    type: item["type"],
  };
}

/** The type of alias pattern */
export type AliasPatternType = "NotSpecified" | "Extract";

/** model interface AliasPathMetadata */
export interface AliasPathMetadata {
  /** The type of the token that the alias path is referring to. */
  readonly type?: AliasPathTokenType;
  /** The attributes of the token that the alias path is referring to. */
  readonly attributes?: AliasPathAttributes;
}

export function aliasPathMetadataDeserializer(item: any): AliasPathMetadata {
  return {
    type: item["type"],
    attributes: item["attributes"],
  };
}

/** The type of the token that the alias path is referring to. */
export enum KnownAliasPathTokenType {
  /** The token type is not specified. */
  NotSpecified = "NotSpecified",
  /** The token type can be anything. */
  Any = "Any",
  /** The token type is string. */
  String = "String",
  /** The token type is object. */
  Object = "Object",
  /** The token type is array. */
  Array = "Array",
  /** The token type is integer. */
  Integer = "Integer",
  /** The token type is number. */
  Number = "Number",
  /** The token type is boolean. */
  Boolean = "Boolean",
}

/**
 * The type of the token that the alias path is referring to. \
 * {@link KnownAliasPathTokenType} can be used interchangeably with AliasPathTokenType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The token type is not specified. \
 * **Any**: The token type can be anything. \
 * **String**: The token type is string. \
 * **Object**: The token type is object. \
 * **Array**: The token type is array. \
 * **Integer**: The token type is integer. \
 * **Number**: The token type is number. \
 * **Boolean**: The token type is boolean.
 */
export type AliasPathTokenType = string;

/** The attributes of the token that the alias path is referring to. */
export enum KnownAliasPathAttributes {
  /** The token that the alias path is referring to has no attributes. */
  None = "None",
  /** The token that the alias path is referring to is modifiable by policies with 'modify' effect. */
  Modifiable = "Modifiable",
}

/**
 * The attributes of the token that the alias path is referring to. \
 * {@link KnownAliasPathAttributes} can be used interchangeably with AliasPathAttributes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The token that the alias path is referring to has no attributes. \
 * **Modifiable**: The token that the alias path is referring to is modifiable by policies with 'modify' effect.
 */
export type AliasPathAttributes = string;
/** The type of the alias. */
export type AliasType = "NotSpecified" | "PlainText" | "Mask";

export function zoneMappingArrayDeserializer(result: Array<ZoneMapping>): any[] {
  return result.map((item) => {
    return zoneMappingDeserializer(item);
  });
}

/** model interface ZoneMapping */
export interface ZoneMapping {
  /** The location of the zone mapping. */
  location?: string;
  zones?: string[];
}

export function zoneMappingDeserializer(item: any): ZoneMapping {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function apiProfileArrayDeserializer(result: Array<ApiProfile>): any[] {
  return result.map((item) => {
    return apiProfileDeserializer(item);
  });
}

/** model interface ApiProfile */
export interface ApiProfile {
  /** The profile version. */
  readonly profileVersion?: string;
  /** The API version. */
  readonly apiVersion?: string;
}

export function apiProfileDeserializer(item: any): ApiProfile {
  return {
    profileVersion: item["profileVersion"],
    apiVersion: item["apiVersion"],
  };
}

/** The provider authorization consent state. */
export enum KnownProviderAuthorizationConsentState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Required */
  Required = "Required",
  /** NotRequired */
  NotRequired = "NotRequired",
  /** Consented */
  Consented = "Consented",
}

/**
 * The provider authorization consent state. \
 * {@link KnownProviderAuthorizationConsentState} can be used interchangeably with ProviderAuthorizationConsentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Required**: Required \
 * **NotRequired**: NotRequired \
 * **Consented**: Consented
 */
export type ProviderAuthorizationConsentState = string;

/** List of provider permissions. */
export interface ProviderPermissionListResult {
  /** The ProviderPermission items on this page */
  value: ProviderPermission[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function providerPermissionListResultDeserializer(item: any): ProviderPermissionListResult {
  return {
    value: providerPermissionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function providerPermissionArrayDeserializer(result: Array<ProviderPermission>): any[] {
  return result.map((item) => {
    return providerPermissionDeserializer(item);
  });
}

/** The provider permission */
export interface ProviderPermission {
  /** The application id. */
  applicationId?: string;
  /** Role definition properties. */
  roleDefinition?: RoleDefinition;
  /** Role definition properties. */
  managedByRoleDefinition?: RoleDefinition;
  /** The provider authorization consent state. */
  providerAuthorizationConsentState?: ProviderAuthorizationConsentState;
}

export function providerPermissionDeserializer(item: any): ProviderPermission {
  return {
    applicationId: item["applicationId"],
    roleDefinition: !item["roleDefinition"]
      ? item["roleDefinition"]
      : roleDefinitionDeserializer(item["roleDefinition"]),
    managedByRoleDefinition: !item["managedByRoleDefinition"]
      ? item["managedByRoleDefinition"]
      : roleDefinitionDeserializer(item["managedByRoleDefinition"]),
    providerAuthorizationConsentState: item["providerAuthorizationConsentState"],
  };
}

/** Role definition properties. */
export interface RoleDefinition {
  /** The role definition ID. */
  id?: string;
  /** The role definition name. */
  name?: string;
  /** If this is a service role. */
  isServiceRole?: boolean;
  /** Role definition permissions. */
  permissions?: Permission[];
  /** Role definition assignable scopes. */
  scopes?: string[];
}

export function roleDefinitionDeserializer(item: any): RoleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    isServiceRole: item["isServiceRole"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function permissionArrayDeserializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionDeserializer(item);
  });
}

/** Role definition permissions. */
export interface Permission {
  /** Allowed actions. */
  actions?: string[];
  /** Denied actions. */
  notActions?: string[];
  /** Allowed Data actions. */
  dataActions?: string[];
  /** Denied Data actions. */
  notDataActions?: string[];
}

export function permissionDeserializer(item: any): Permission {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

/** The provider registration definition. */
export interface ProviderRegistrationRequest {
  /** The provider consent. */
  thirdPartyProviderConsent?: ProviderConsentDefinition;
}

export function providerRegistrationRequestSerializer(item: ProviderRegistrationRequest): any {
  return {
    thirdPartyProviderConsent: !item["thirdPartyProviderConsent"]
      ? item["thirdPartyProviderConsent"]
      : providerConsentDefinitionSerializer(item["thirdPartyProviderConsent"]),
  };
}

/** The provider consent. */
export interface ProviderConsentDefinition {
  /** A value indicating whether authorization is consented or not. */
  consentToAuthorization?: boolean;
}

export function providerConsentDefinitionSerializer(item: ProviderConsentDefinition): any {
  return { consentToAuthorization: item["consentToAuthorization"] };
}

/** List of resource types of a resource provider. */
export interface ProviderResourceTypeListResult {
  /** The ProviderResourceType items on this page */
  value: ProviderResourceType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function providerResourceTypeListResultDeserializer(
  item: any,
): ProviderResourceTypeListResult {
  return {
    value: providerResourceTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01 API version. */
  V20250401 = "2025-04-01",
}

export type ResourcesCheckExistenceResponse = { body: boolean };

export type ResourcesCheckExistenceByIdResponse = { body: boolean };

export type ResourceGroupsCheckExistenceResponse = { body: boolean };
