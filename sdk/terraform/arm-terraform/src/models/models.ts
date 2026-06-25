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

/** The base export parameter */
export interface BaseExportModel {
  /** The parameter type */
  /** The discriminator possible values: ExportQuery, ExportResource, ExportResourceGroup */
  type: Type;
  /** The target Azure Terraform provider. Defaults to `azurerm`. */
  targetProvider?: TargetProvider;
  /** Whether to output all non-computed properties in the generated Terraform configuration. If set to `false` empty-valued properties will be omitted from the configuration. Defaults to `true`. */
  fullProperties?: boolean;
  /** Mask sensitive attributes in the Terraform configuration. Defaults to `true`. */
  maskSensitive?: boolean;
  /** Whether to include RBAC role assignments assigned to the resources exported. Only resource-scoped role assignments are supported. Defaults to `false`. */
  includeRoleAssignment?: boolean;
  /** Whether to include internal resources managed by Azure in the exported configuration. Defaults to `false`. */
  includeManagedResource?: boolean;
  /** Excludes specified Azure Resource Ids. Case-insensitive Azure Resource ID regular expression. Example: `["/subscriptions/[0-9a-f-]+/resourceGroups/my-rg.*"]`. */
  excludeAzureResource?: string[];
  /** Excludes specified Terraform resource types. Example: `["azurerm_virtual_network"]`. */
  excludeTerraformResource?: string[];
}

export function baseExportModelSerializer(item: BaseExportModel): any {
  return {
    type: item["type"],
    targetProvider: item["targetProvider"],
    fullProperties: item["fullProperties"],
    maskSensitive: item["maskSensitive"],
    includeRoleAssignment: item["includeRoleAssignment"],
    includeManagedResource: item["includeManagedResource"],
    excludeAzureResource: !item["excludeAzureResource"]
      ? item["excludeAzureResource"]
      : item["excludeAzureResource"].map((p: any) => {
          return p;
        }),
    excludeTerraformResource: !item["excludeTerraformResource"]
      ? item["excludeTerraformResource"]
      : item["excludeTerraformResource"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for BaseExportModelUnion */
export type BaseExportModelUnion =
  | ExportQuery
  | ExportResource
  | ExportResourceGroup
  | BaseExportModel;

export function baseExportModelUnionSerializer(item: BaseExportModelUnion): any {
  switch (item.type) {
    case "ExportQuery":
      return exportQuerySerializer(item as ExportQuery);

    case "ExportResource":
      return exportResourceSerializer(item as ExportResource);

    case "ExportResourceGroup":
      return exportResourceGroupSerializer(item as ExportResourceGroup);

    default:
      return baseExportModelSerializer(item);
  }
}

/** The parameter type */
export enum KnownType {
  /** ExportResource */
  ExportResource = "ExportResource",
  /** ExportResourceGroup */
  ExportResourceGroup = "ExportResourceGroup",
  /** ExportQuery */
  ExportQuery = "ExportQuery",
}

/**
 * The parameter type \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExportResource** \
 * **ExportResourceGroup** \
 * **ExportQuery**
 */
export type Type = string;

/** The target Azure Terraform Provider */
export enum KnownTargetProvider {
  /** https://registry.terraform.io/providers/hashicorp/azurerm/latest */
  Azurerm = "azurerm",
  /** https://registry.terraform.io/providers/Azure/azapi/latest */
  Azapi = "azapi",
}

/**
 * The target Azure Terraform Provider \
 * {@link KnownTargetProvider} can be used interchangeably with TargetProvider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azurerm**: https:\//registry.terraform.io\/providers\/hashicorp\/azurerm\/latest \
 * **azapi**: https:\//registry.terraform.io\/providers\/Azure\/azapi\/latest
 */
export type TargetProvider = string;

/** Uses ARG (Azure Resource Graph) query to choose resources to be exported. */
export interface ExportQuery extends BaseExportModel {
  /** The ARG where predicate. Multiple predicates can be combined using `and` operator. Example: `resourceGroup =~ "my-rg" and type =~ "microsoft.network/virtualnetworks"`. The default ARG table is `Resources`, use 'table' property to query a different table. */
  query: string;
  /** The id prefix for the exported Terraform resources. Defaults to `res-`. */
  namePattern?: string;
  /** Recursively includes child resources. Defaults to `false`. */
  recursive?: boolean;
  /** Has to be `ExportQuery` to distinguish from other types. */
  type: "ExportQuery";
  /** Includes the resource group in the exported Terraform resources. Defaults to `false`. */
  includeResourceGroup?: boolean;
  /** The ARG table name. Defaults to 'Resources'. */
  table?: string;
  /** The ARG Scope Filter parameter. */
  authorizationScopeFilter?: AuthorizationScopeFilter;
}

export function exportQuerySerializer(item: ExportQuery): any {
  return {
    type: item["type"],
    targetProvider: item["targetProvider"],
    fullProperties: item["fullProperties"],
    maskSensitive: item["maskSensitive"],
    includeRoleAssignment: item["includeRoleAssignment"],
    includeManagedResource: item["includeManagedResource"],
    excludeAzureResource: !item["excludeAzureResource"]
      ? item["excludeAzureResource"]
      : item["excludeAzureResource"].map((p: any) => {
          return p;
        }),
    excludeTerraformResource: !item["excludeTerraformResource"]
      ? item["excludeTerraformResource"]
      : item["excludeTerraformResource"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    namePattern: item["namePattern"],
    recursive: item["recursive"],
    includeResourceGroup: item["includeResourceGroup"],
    table: item["table"],
    authorizationScopeFilter: item["authorizationScopeFilter"],
  };
}

/** The Azure Resource Graph Authorization Scope Filter parameter */
export enum KnownAuthorizationScopeFilter {
  /** Returns assignments for the given scope and all child scopes. */
  AtScopeAndBelow = "AtScopeAndBelow",
  /** Returns assignments for the given scope and all parent scopes, but not child scopes. */
  AtScopeAndAbove = "AtScopeAndAbove",
  /** Returns assignments for the given scope, all parent scopes, and all child scopes. */
  AtScopeAboveAndBelow = "AtScopeAboveAndBelow",
  /** Returns assignments only for the given scope; no parent or child scopes are included. */
  AtScopeExact = "AtScopeExact",
}

/**
 * The Azure Resource Graph Authorization Scope Filter parameter \
 * {@link KnownAuthorizationScopeFilter} can be used interchangeably with AuthorizationScopeFilter,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AtScopeAndBelow**: Returns assignments for the given scope and all child scopes. \
 * **AtScopeAndAbove**: Returns assignments for the given scope and all parent scopes, but not child scopes. \
 * **AtScopeAboveAndBelow**: Returns assignments for the given scope, all parent scopes, and all child scopes. \
 * **AtScopeExact**: Returns assignments only for the given scope; no parent or child scopes are included.
 */
export type AuthorizationScopeFilter = string;

/** Specified resources to be exported by their ids. */
export interface ExportResource extends BaseExportModel {
  /** The id(s) of the resource to be exported. Example: `["/subscriptions/12345678-1234-1234-1234-1234567890ab/resourceGroups/my-rg"]. */
  resourceIds: string[];
  /** The Terraform id of the exported resource. Only effective when `resourceIds` contains only one item. Defaults to `res-0`. */
  resourceName?: string;
  /** The Terraform resource type to map to. Only effective when `resourceIds` has one item. Example: `azurerm_virtual_network`. Automatic type mapping will be performed if not provided. */
  resourceType?: string;
  /** The id prefix for the exported Terraform resources. Defaults to `res-`. */
  namePattern?: string;
  /** Has to be `ExportResource` to distinguish from other types. */
  type: "ExportResource";
  /** Recursively includes child resources. Defaults to `false`. */
  recursive?: boolean;
  /** Includes the resource group in the exported Terraform resources. Defaults to `false`. */
  includeResourceGroup?: boolean;
}

export function exportResourceSerializer(item: ExportResource): any {
  return {
    type: item["type"],
    targetProvider: item["targetProvider"],
    fullProperties: item["fullProperties"],
    maskSensitive: item["maskSensitive"],
    includeRoleAssignment: item["includeRoleAssignment"],
    includeManagedResource: item["includeManagedResource"],
    excludeAzureResource: !item["excludeAzureResource"]
      ? item["excludeAzureResource"]
      : item["excludeAzureResource"].map((p: any) => {
          return p;
        }),
    excludeTerraformResource: !item["excludeTerraformResource"]
      ? item["excludeTerraformResource"]
      : item["excludeTerraformResource"].map((p: any) => {
          return p;
        }),
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    namePattern: item["namePattern"],
    recursive: item["recursive"],
    includeResourceGroup: item["includeResourceGroup"],
  };
}

/** Export parameter for a resource group */
export interface ExportResourceGroup extends BaseExportModel {
  /** The name of the resource group to be exported. */
  resourceGroupName: string;
  /** The id prefix for the exported Terraform resources. Defaults to `res-`. */
  namePattern?: string;
  /** Has to be `ExportResourceGroup` to distinguish from other types. */
  type: "ExportResourceGroup";
}

export function exportResourceGroupSerializer(item: ExportResourceGroup): any {
  return {
    type: item["type"],
    targetProvider: item["targetProvider"],
    fullProperties: item["fullProperties"],
    maskSensitive: item["maskSensitive"],
    includeRoleAssignment: item["includeRoleAssignment"],
    includeManagedResource: item["includeManagedResource"],
    excludeAzureResource: !item["excludeAzureResource"]
      ? item["excludeAzureResource"]
      : item["excludeAzureResource"].map((p: any) => {
          return p;
        }),
    excludeTerraformResource: !item["excludeTerraformResource"]
      ? item["excludeTerraformResource"]
      : item["excludeTerraformResource"].map((p: any) => {
          return p;
        }),
    resourceGroupName: item["resourceGroupName"],
    namePattern: item["namePattern"],
  };
}

/** The status of the LRO (Long Running Operation) and the export result. */
export interface TerraformOperationStatus {
  /** RP-specific properties for the operationStatus resource, only appears when operation ended with Succeeded status */
  readonly properties?: ExportResult;
  /** The operation status */
  status: ResourceProvisioningState;
  /** The unique identifier for the operationStatus resource */
  id: string;
  /** The name of the  operationStatus resource */
  readonly name?: string;
  /** Operation start time */
  readonly startTime?: Date;
  /** Operation complete time */
  readonly endTime?: Date;
  /** The progress made toward completing the operation */
  readonly percentComplete?: number;
  /** Errors that occurred if the operation ended with Canceled or Failed status */
  readonly error?: ErrorDetail;
}

export function terraformOperationStatusDeserializer(item: any): TerraformOperationStatus {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : exportResultDeserializer(item["properties"]),
    status: item["status"],
    id: item["id"],
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The Terraform export result */
export interface ExportResult {
  /** The exported Terraform HCL configuration. */
  configuration?: string;
  /** The Terraform import blocks for the configuration, necessary for managing existing Azure resources in Terraform. */
  import?: string;
  /** A list of Azure resources which could not be exported to Terraform. The most common cause is lack of Terraform provider support. Change the provider type to `azapi` for bigger set of supported resources. */
  skippedResources?: string[];
  /** A list of errors encountered during export operation. */
  errors?: ErrorDetail[];
}

export function exportResultDeserializer(item: any): ExportResult {
  return {
    configuration: item["configuration"],
    import: item["import"],
    skippedResources: !item["skippedResources"]
      ? item["skippedResources"]
      : item["skippedResources"].map((p: any) => {
          return p;
        }),
    errors: !item["errors"] ? item["errors"] : errorDetailArrayDeserializer(item["errors"]),
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-07-01-preview API version. */
  V20230701Preview = "2023-07-01-preview",
  /** The 2025-06-01-preview API version. */
  V20250601Preview = "2025-06-01-preview",
  /** The 2025-09-01-preview API version. */
  V20250901Preview = "2025-09-01-preview",
}
