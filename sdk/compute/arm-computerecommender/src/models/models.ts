// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Contains metadata of a diagnostic type */
export interface ComputeDiagnosticBase extends ProxyResource {
  /** Contains additional properties of a diagnostic */
  properties?: DiagnosticProperties;
}

export function computeDiagnosticBaseDeserializer(item: any): ComputeDiagnosticBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticPropertiesDeserializer(item["properties"]),
  };
}

/** Contains additional properties of a diagnostic */
export interface DiagnosticProperties {
  /** Describes what are the supported resource types for a diagnostic. */
  supportedResourceTypes?: string[];
}

export function diagnosticPropertiesDeserializer(item: any): DiagnosticProperties {
  return {
    supportedResourceTypes: !item["supportedResourceTypes"]
      ? item["supportedResourceTypes"]
      : item["supportedResourceTypes"].map((p: any) => {
          return p;
        }),
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

/** SpotPlacementScores API Input. */
export interface SpotPlacementScoresInput {
  /** The desired regions */
  desiredLocations?: string[];
  /** The desired virtual machine SKU sizes. */
  desiredSizes?: ResourceSize[];
  /** Desired instance count per region/zone based on the scope. */
  desiredCount?: number;
  /** Defines if the scope is zonal or regional. */
  availabilityZones?: boolean;
}

export function spotPlacementScoresInputSerializer(item: SpotPlacementScoresInput): any {
  return {
    desiredLocations: !item["desiredLocations"]
      ? item["desiredLocations"]
      : item["desiredLocations"].map((p: any) => {
          return p;
        }),
    desiredSizes: !item["desiredSizes"]
      ? item["desiredSizes"]
      : resourceSizeArraySerializer(item["desiredSizes"]),
    desiredCount: item["desiredCount"],
    availabilityZones: item["availabilityZones"],
  };
}

export function resourceSizeArraySerializer(result: Array<ResourceSize>): any[] {
  return result.map((item) => {
    return resourceSizeSerializer(item);
  });
}

export function resourceSizeArrayDeserializer(result: Array<ResourceSize>): any[] {
  return result.map((item) => {
    return resourceSizeDeserializer(item);
  });
}

/** SpotPlacementRecommender API response. */
export interface ResourceSize {
  /** The resource's CRP virtual machine SKU size. */
  sku?: string;
}

export function resourceSizeSerializer(item: ResourceSize): any {
  return { sku: item["sku"] };
}

export function resourceSizeDeserializer(item: any): ResourceSize {
  return {
    sku: item["sku"],
  };
}

/** SpotPlacementScores API response. */
export interface SpotPlacementScoresResponse {
  /** The desired regions */
  desiredLocations?: string[];
  /** The desired virtual machine SKU sizes. */
  desiredSizes?: ResourceSize[];
  /** Desired instance count per region/zone based on the scope. */
  desiredCount?: number;
  /** Defines if the scope is zonal or regional. */
  availabilityZones?: boolean;
  /** A placement score indicating the likelihood of successfully allocating the specified Spot VM(s), as well as the expected lifetimes of the Spot VM(s) after allocation. */
  placementScores?: PlacementScore[];
}

export function spotPlacementScoresResponseDeserializer(item: any): SpotPlacementScoresResponse {
  return {
    desiredLocations: !item["desiredLocations"]
      ? item["desiredLocations"]
      : item["desiredLocations"].map((p: any) => {
          return p;
        }),
    desiredSizes: !item["desiredSizes"]
      ? item["desiredSizes"]
      : resourceSizeArrayDeserializer(item["desiredSizes"]),
    desiredCount: item["desiredCount"],
    availabilityZones: item["availabilityZones"],
    placementScores: !item["placementScores"]
      ? item["placementScores"]
      : placementScoreArrayDeserializer(item["placementScores"]),
  };
}

export function placementScoreArrayDeserializer(result: Array<PlacementScore>): any[] {
  return result.map((item) => {
    return placementScoreDeserializer(item);
  });
}

/** The spot placement score for sku/region/zone combination. */
export interface PlacementScore {
  /** The resource's CRP virtual machine SKU size. */
  sku?: string;
  /** The region. */
  region?: string;
  /** The availability zone. */
  availabilityZone?: string;
  /** A placement score indicating the likelihood of successfully allocating the specified Spot VM(s), as well as the expected lifetimes of the Spot VM(s) after allocation. */
  score?: string;
  /** Whether the desired quota is available. */
  isQuotaAvailable?: boolean;
}

export function placementScoreDeserializer(item: any): PlacementScore {
  return {
    sku: item["sku"],
    region: item["region"],
    availabilityZone: item["availabilityZone"],
    score: item["score"],
    isQuotaAvailable: item["isQuotaAvailable"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-06-05 API version. */
  V20250605 = "2025-06-05",
}
