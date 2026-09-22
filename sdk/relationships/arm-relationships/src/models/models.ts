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

/** DependencyOf relationship resource for create or update. */
export interface DependencyOfRelationshipCreateOrUpdate extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: DependencyOfRelationshipPropertiesCreateOrUpdate;
}

export function dependencyOfRelationshipCreateOrUpdateSerializer(
  item: DependencyOfRelationshipCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dependencyOfRelationshipPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** model interface DependencyOfRelationshipPropertiesCreateOrUpdate */
export interface DependencyOfRelationshipPropertiesCreateOrUpdate {
  /** The relationship target resource id. */
  targetId: string;
  /** The relationship target tenant id. */
  targetTenant?: string;
}

export function dependencyOfRelationshipPropertiesCreateOrUpdateSerializer(
  item: DependencyOfRelationshipPropertiesCreateOrUpdate,
): any {
  return { targetId: item["targetId"], targetTenant: item["targetTenant"] };
}

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

/** Defines a dependencyOf relationship resource. */
export interface DependencyOfRelationship extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: DependencyOfRelationshipProperties;
}

export function dependencyOfRelationshipDeserializer(item: any): DependencyOfRelationship {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dependencyOfRelationshipPropertiesDeserializer(item["properties"]),
  };
}

/** dependencyOf relationship properties. */
export interface DependencyOfRelationshipProperties {
  /** The relationship source resource id. */
  readonly sourceId: string;
  /** The relationship target resource id. */
  targetId: string;
  /** The relationship target tenant id. */
  targetTenant?: string;
  /** Information about the origin of the relationship. */
  readonly originInformation: RelationshipOriginInformation;
  /** Metadata about the relationship. */
  readonly metadata: RelationshipMetadata;
  /** The provisioning state of the relationship. */
  readonly provisioningState?: ProvisioningState;
}

export function dependencyOfRelationshipPropertiesDeserializer(
  item: any,
): DependencyOfRelationshipProperties {
  return {
    sourceId: item["sourceId"],
    targetId: item["targetId"],
    targetTenant: item["targetTenant"],
    originInformation: relationshipOriginInformationDeserializer(item["originInformation"]),
    metadata: relationshipMetadataDeserializer(item["metadata"]),
    provisioningState: item["provisioningState"],
  };
}

/** Provides information about the origin of a relationship. */
export interface RelationshipOriginInformation {
  /** Identifies the origin type of the relationship. */
  readonly relationshipOriginType: RelationshipOrigins;
  /** The name of the discovery engine that created the relationship. */
  readonly discoveryEngine?: string;
}

export function relationshipOriginInformationDeserializer(
  item: any,
): RelationshipOriginInformation {
  return {
    relationshipOriginType: item["relationshipOriginType"],
    discoveryEngine: item["discoveryEngine"],
  };
}

/** The possible origins of a relationship. */
export enum KnownRelationshipOrigins {
  /** The relationship was explicitly created by a system. */
  ServiceExplicitlyCreated = "ServiceExplicitlyCreated",
  /** The relationship was discovered by a system-created rule. */
  SystemDiscoveredByRule = "SystemDiscoveredByRule",
  /** The relationship was explicitly created by a user. */
  UserExplicitlyCreated = "UserExplicitlyCreated",
  /** The relationship was discovered by a user-created rule. */
  UserDiscoveredByRule = "UserDiscoveredByRule",
}

/**
 * The possible origins of a relationship. \
 * {@link KnownRelationshipOrigins} can be used interchangeably with RelationshipOrigins,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceExplicitlyCreated**: The relationship was explicitly created by a system. \
 * **SystemDiscoveredByRule**: The relationship was discovered by a system-created rule. \
 * **UserExplicitlyCreated**: The relationship was explicitly created by a user. \
 * **UserDiscoveredByRule**: The relationship was discovered by a user-created rule.
 */
export type RelationshipOrigins = string;

/** Provides information about the relationship properties. */
export interface RelationshipMetadata {
  /** The type of the relationship source resource. */
  readonly sourceType: string;
  /** The type of the relationship target resource. */
  readonly targetType: string;
}

export function relationshipMetadataDeserializer(item: any): RelationshipMetadata {
  return {
    sourceType: item["sourceType"],
    targetType: item["targetType"],
  };
}

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  Provisioning = "Provisioning",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The resource provisioning request has been accepted. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted. \
 * **Accepted**: The resource provisioning request has been accepted.
 */
export type ProvisioningState = string;

/** ServiceGroupMember relationship resource for create or update. */
export interface ServiceGroupMemberRelationshipCreateOrUpdate extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceGroupMemberRelationshipPropertiesCreateOrUpdate;
}

export function serviceGroupMemberRelationshipCreateOrUpdateSerializer(
  item: ServiceGroupMemberRelationshipCreateOrUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceGroupMemberRelationshipPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

/** model interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate */
export interface ServiceGroupMemberRelationshipPropertiesCreateOrUpdate {
  /** The relationship target resource id. */
  targetId: string;
  /** The relationship target tenant id. */
  targetTenant?: string;
}

export function serviceGroupMemberRelationshipPropertiesCreateOrUpdateSerializer(
  item: ServiceGroupMemberRelationshipPropertiesCreateOrUpdate,
): any {
  return { targetId: item["targetId"], targetTenant: item["targetTenant"] };
}

/** Defines a ServiceGroupMember relationship resource. */
export interface ServiceGroupMemberRelationship extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceGroupMemberRelationshipProperties;
}

export function serviceGroupMemberRelationshipDeserializer(
  item: any,
): ServiceGroupMemberRelationship {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceGroupMemberRelationshipPropertiesDeserializer(item["properties"]),
  };
}

/** ServiceGroupMember relationship properties. */
export interface ServiceGroupMemberRelationshipProperties {
  /** The relationship source resource id. */
  readonly sourceId: string;
  /** The relationship target resource id. */
  targetId: string;
  /** The relationship target tenant id. */
  targetTenant?: string;
  /** Information about the origin of the relationship. */
  readonly originInformation: RelationshipOriginInformation;
  /** Metadata about the relationship. */
  readonly metadata: RelationshipMetadata;
  /** The provisioning state of the relationship. */
  readonly provisioningState?: ProvisioningState;
}

export function serviceGroupMemberRelationshipPropertiesDeserializer(
  item: any,
): ServiceGroupMemberRelationshipProperties {
  return {
    sourceId: item["sourceId"],
    targetId: item["targetId"],
    targetTenant: item["targetTenant"],
    originInformation: relationshipOriginInformationDeserializer(item["originInformation"]),
    metadata: relationshipMetadataDeserializer(item["metadata"]),
    provisioningState: item["provisioningState"],
  };
}

/** Relationships RP API Versions */
export enum KnownVersions {
  /** 2023-09-01-preview version */
  Versions20230901Preview = "2023-09-01-preview",
}
