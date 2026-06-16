// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list REST API operations. It contains a list of operations and a URL nextLink to get the next set of results. */
export interface _OperationListResult {
  /** The list of operations supported by the resource provider. */
  value?: Operation[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** A REST API operation */
export interface Operation {
  /** This is of the format {provider}/{resource}/{operation}. */
  name?: string;
  /** The object that describes the operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation. */
  origin?: string;
  /** Properties of the operation. */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider. */
  provider?: string;
  /** For example: read, write, delete. */
  operation?: string;
  /** The resource type on which the operation is performed. */
  resource?: string;
  /** The friendly name of the operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
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

/** Class representing a cluster principal assignment. */
export interface ClusterPrincipalAssignment extends ProxyResource {
  /** The principal ID assigned to the cluster principal. It can be a user email, application ID, or security group name. */
  principalId?: string;
  /** Cluster principal role. */
  role?: ClusterPrincipalRole;
  /** The tenant id of the principal */
  tenantId?: string;
  /** Principal type. */
  principalType?: PrincipalType;
  /** The tenant name of the principal */
  readonly tenantName?: string;
  /** The principal name */
  readonly principalName?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service principal object id in AAD (Azure active directory) */
  readonly aadObjectId?: string;
}

export function clusterPrincipalAssignmentSerializer(item: ClusterPrincipalAssignment): any {
  return {
    properties: areAllPropsUndefined(item, ["principalId", "role", "tenantId", "principalType"])
      ? undefined
      : _clusterPrincipalAssignmentPropertiesSerializer(item),
  };
}

export function clusterPrincipalAssignmentDeserializer(item: any): ClusterPrincipalAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clusterPrincipalAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** A class representing cluster principal property. */
export interface ClusterPrincipalProperties {
  /** The principal ID assigned to the cluster principal. It can be a user email, application ID, or security group name. */
  principalId: string;
  /** Cluster principal role. */
  role: ClusterPrincipalRole;
  /** The tenant id of the principal */
  tenantId?: string;
  /** Principal type. */
  principalType: PrincipalType;
  /** The tenant name of the principal */
  readonly tenantName?: string;
  /** The principal name */
  readonly principalName?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service principal object id in AAD (Azure active directory) */
  readonly aadObjectId?: string;
}

export function clusterPrincipalPropertiesSerializer(item: ClusterPrincipalProperties): any {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
  };
}

export function clusterPrincipalPropertiesDeserializer(item: any): ClusterPrincipalProperties {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
    tenantName: item["tenantName"],
    principalName: item["principalName"],
    provisioningState: item["provisioningState"],
    aadObjectId: item["aadObjectId"],
  };
}

/** Cluster principal role. */
export enum KnownClusterPrincipalRole {
  /** AllDatabasesAdmin */
  AllDatabasesAdmin = "AllDatabasesAdmin",
  /** AllDatabasesViewer */
  AllDatabasesViewer = "AllDatabasesViewer",
  /** AllDatabasesMonitor */
  AllDatabasesMonitor = "AllDatabasesMonitor",
}

/**
 * Cluster principal role. \
 * {@link KnownClusterPrincipalRole} can be used interchangeably with ClusterPrincipalRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllDatabasesAdmin**: AllDatabasesAdmin \
 * **AllDatabasesViewer**: AllDatabasesViewer \
 * **AllDatabasesMonitor**: AllDatabasesMonitor
 */
export type ClusterPrincipalRole = string;

/** Principal type. */
export enum KnownPrincipalType {
  /** App */
  App = "App",
  /** Group */
  Group = "Group",
  /** User */
  User = "User",
}

/**
 * Principal type. \
 * {@link KnownPrincipalType} can be used interchangeably with PrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **App**: App \
 * **Group**: Group \
 * **User**: User
 */
export type PrincipalType = string;

/** The provisioned state of the resource. */
export enum KnownProvisioningState {
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Moving */
  Moving = "Moving",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioned state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Moving**: Moving \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** The list Kusto cluster principal assignments operation response. */
export interface _ClusterPrincipalAssignmentListResult {
  /** The list of Kusto cluster principal assignments. */
  value?: ClusterPrincipalAssignment[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _clusterPrincipalAssignmentListResultDeserializer(
  item: any,
): _ClusterPrincipalAssignmentListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : clusterPrincipalAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterPrincipalAssignmentArraySerializer(
  result: Array<ClusterPrincipalAssignment>,
): any[] {
  return result.map((item) => {
    return clusterPrincipalAssignmentSerializer(item);
  });
}

export function clusterPrincipalAssignmentArrayDeserializer(
  result: Array<ClusterPrincipalAssignment>,
): any[] {
  return result.map((item) => {
    return clusterPrincipalAssignmentDeserializer(item);
  });
}

/** A principal assignment check name availability request. */
export interface ClusterPrincipalAssignmentCheckNameRequest {
  /** Principal Assignment resource name. */
  name: string;
  /** The type of resource, Microsoft.Kusto/clusters/principalAssignments. */
  type: "Microsoft.Kusto/clusters/principalAssignments";
}

export function clusterPrincipalAssignmentCheckNameRequestSerializer(
  item: ClusterPrincipalAssignmentCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The result returned from a check name availability request. */
export interface CheckNameResult {
  /** Specifies a Boolean value that indicates if the name is available. */
  nameAvailable?: boolean;
  /** The name that was checked. */
  name?: string;
  /** Message indicating an unavailable name due to a conflict, or a description of the naming rules that are violated. */
  message?: string;
  /** Message providing the reason why the given name is invalid. */
  reason?: Reason;
}

export function checkNameResultDeserializer(item: any): CheckNameResult {
  return {
    nameAvailable: item["nameAvailable"],
    name: item["name"],
    message: item["message"],
    reason: item["reason"],
  };
}

/** Message providing the reason why the given name is invalid. */
export enum KnownReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * Message providing the reason why the given name is invalid. \
 * {@link KnownReason} can be used interchangeably with Reason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Invalid \
 * **AlreadyExists**: AlreadyExists
 */
export type Reason = string;

/** Class representing a database principal assignment. */
export interface DatabasePrincipalAssignment extends ProxyResource {
  /** The principal ID assigned to the database principal. It can be a user email, application ID, or security group name. */
  principalId?: string;
  /** Database principal role. */
  role?: DatabasePrincipalRole;
  /** The tenant id of the principal */
  tenantId?: string;
  /** Principal type. */
  principalType?: PrincipalType;
  /** The tenant name of the principal */
  readonly tenantName?: string;
  /** The principal name */
  readonly principalName?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service principal object id in AAD (Azure active directory) */
  readonly aadObjectId?: string;
}

export function databasePrincipalAssignmentSerializer(item: DatabasePrincipalAssignment): any {
  return {
    properties: areAllPropsUndefined(item, ["principalId", "role", "tenantId", "principalType"])
      ? undefined
      : _databasePrincipalAssignmentPropertiesSerializer(item),
  };
}

export function databasePrincipalAssignmentDeserializer(item: any): DatabasePrincipalAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databasePrincipalAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** A class representing database principal property. */
export interface DatabasePrincipalProperties {
  /** The principal ID assigned to the database principal. It can be a user email, application ID, or security group name. */
  principalId: string;
  /** Database principal role. */
  role: DatabasePrincipalRole;
  /** The tenant id of the principal */
  tenantId?: string;
  /** Principal type. */
  principalType: PrincipalType;
  /** The tenant name of the principal */
  readonly tenantName?: string;
  /** The principal name */
  readonly principalName?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The service principal object id in AAD (Azure active directory) */
  readonly aadObjectId?: string;
}

export function databasePrincipalPropertiesSerializer(item: DatabasePrincipalProperties): any {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
  };
}

export function databasePrincipalPropertiesDeserializer(item: any): DatabasePrincipalProperties {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
    tenantName: item["tenantName"],
    principalName: item["principalName"],
    provisioningState: item["provisioningState"],
    aadObjectId: item["aadObjectId"],
  };
}

/** Database principal role. */
export enum KnownDatabasePrincipalRole {
  /** Admin */
  Admin = "Admin",
  /** Ingestor */
  Ingestor = "Ingestor",
  /** Monitor */
  Monitor = "Monitor",
  /** User */
  User = "User",
  /** UnrestrictedViewer */
  UnrestrictedViewer = "UnrestrictedViewer",
  /** Viewer */
  Viewer = "Viewer",
}

/**
 * Database principal role. \
 * {@link KnownDatabasePrincipalRole} can be used interchangeably with DatabasePrincipalRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Admin**: Admin \
 * **Ingestor**: Ingestor \
 * **Monitor**: Monitor \
 * **User**: User \
 * **UnrestrictedViewer**: UnrestrictedViewer \
 * **Viewer**: Viewer
 */
export type DatabasePrincipalRole = string;

/** The list Kusto database principal assignments operation response. */
export interface _DatabasePrincipalAssignmentListResult {
  /** The list of Kusto database principal assignments. */
  value?: DatabasePrincipalAssignment[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _databasePrincipalAssignmentListResultDeserializer(
  item: any,
): _DatabasePrincipalAssignmentListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : databasePrincipalAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databasePrincipalAssignmentArraySerializer(
  result: Array<DatabasePrincipalAssignment>,
): any[] {
  return result.map((item) => {
    return databasePrincipalAssignmentSerializer(item);
  });
}

export function databasePrincipalAssignmentArrayDeserializer(
  result: Array<DatabasePrincipalAssignment>,
): any[] {
  return result.map((item) => {
    return databasePrincipalAssignmentDeserializer(item);
  });
}

/** A principal assignment check name availability request. */
export interface DatabasePrincipalAssignmentCheckNameRequest {
  /** Principal Assignment resource name. */
  name: string;
  /** The type of resource, Microsoft.Kusto/clusters/databases/principalAssignments. */
  type: "Microsoft.Kusto/clusters/databases/principalAssignments";
}

export function databasePrincipalAssignmentCheckNameRequestSerializer(
  item: DatabasePrincipalAssignmentCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a database script. */
export interface Script extends ProxyResource {
  /** The url to the KQL script blob file. Must not be used together with scriptContent property */
  scriptUrl?: string;
  /** The SaS token that provide read access to the file which contain the script. Must be provided when using scriptUrl property. */
  scriptUrlSasToken?: string;
  /** The script content. This property should be used when the script is provide inline and not through file in a SA. Must not be used together with scriptUrl and scriptUrlSasToken properties. */
  scriptContent?: string;
  /** A unique string. If changed the script will be applied again. */
  forceUpdateTag?: string;
  /** Flag that indicates whether to continue if one of the command fails. */
  continueOnErrors?: boolean;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Differentiates between the type of script commands included - Database or Cluster. The default is Database. */
  scriptLevel?: ScriptLevel;
  /** Indicates if the permissions for the script caller are kept following completion of the script. */
  principalPermissionsAction?: PrincipalPermissionsAction;
  /** The resource identifier of the managed identity to be used. When provided, the managed identity will be used to read the script content from the scriptUrl. */
  managedIdentityResourceId?: string;
}

export function scriptSerializer(item: Script): any {
  return {
    properties: areAllPropsUndefined(item, [
      "scriptUrl",
      "scriptUrlSasToken",
      "scriptContent",
      "forceUpdateTag",
      "continueOnErrors",
      "scriptLevel",
      "principalPermissionsAction",
      "managedIdentityResourceId",
    ])
      ? undefined
      : _scriptPropertiesSerializer(item),
  };
}

export function scriptDeserializer(item: any): Script {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _scriptPropertiesDeserializer(item["properties"])),
  };
}

/** A class representing database script property. */
export interface ScriptProperties {
  /** The url to the KQL script blob file. Must not be used together with scriptContent property */
  scriptUrl?: string;
  /** The SaS token that provide read access to the file which contain the script. Must be provided when using scriptUrl property. */
  scriptUrlSasToken?: string;
  /** The script content. This property should be used when the script is provide inline and not through file in a SA. Must not be used together with scriptUrl and scriptUrlSasToken properties. */
  scriptContent?: string;
  /** A unique string. If changed the script will be applied again. */
  forceUpdateTag?: string;
  /** Flag that indicates whether to continue if one of the command fails. */
  continueOnErrors?: boolean;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Differentiates between the type of script commands included - Database or Cluster. The default is Database. */
  scriptLevel?: ScriptLevel;
  /** Indicates if the permissions for the script caller are kept following completion of the script. */
  principalPermissionsAction?: PrincipalPermissionsAction;
  /** The resource identifier of the managed identity to be used. When provided, the managed identity will be used to read the script content from the scriptUrl. */
  managedIdentityResourceId?: string;
}

export function scriptPropertiesSerializer(item: ScriptProperties): any {
  return {
    scriptUrl: item["scriptUrl"],
    scriptUrlSasToken: item["scriptUrlSasToken"],
    scriptContent: item["scriptContent"],
    forceUpdateTag: item["forceUpdateTag"],
    continueOnErrors: item["continueOnErrors"],
    scriptLevel: item["scriptLevel"],
    principalPermissionsAction: item["principalPermissionsAction"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

export function scriptPropertiesDeserializer(item: any): ScriptProperties {
  return {
    scriptUrl: item["scriptUrl"],
    scriptUrlSasToken: item["scriptUrlSasToken"],
    scriptContent: item["scriptContent"],
    forceUpdateTag: item["forceUpdateTag"],
    continueOnErrors: item["continueOnErrors"],
    provisioningState: item["provisioningState"],
    scriptLevel: item["scriptLevel"],
    principalPermissionsAction: item["principalPermissionsAction"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

/** Differentiates between the type of script commands included - Database or Cluster. The default is Database. */
export enum KnownScriptLevel {
  /** Database */
  Database = "Database",
  /** Cluster */
  Cluster = "Cluster",
}

/**
 * Differentiates between the type of script commands included - Database or Cluster. The default is Database. \
 * {@link KnownScriptLevel} can be used interchangeably with ScriptLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Database**: Database \
 * **Cluster**: Cluster
 */
export type ScriptLevel = string;

/** Indicates if the permissions for the script caller are kept following completion of the script. */
export enum KnownPrincipalPermissionsAction {
  /** RetainPermissionOnScriptCompletion */
  RetainPermissionOnScriptCompletion = "RetainPermissionOnScriptCompletion",
  /** RemovePermissionOnScriptCompletion */
  RemovePermissionOnScriptCompletion = "RemovePermissionOnScriptCompletion",
}

/**
 * Indicates if the permissions for the script caller are kept following completion of the script. \
 * {@link KnownPrincipalPermissionsAction} can be used interchangeably with PrincipalPermissionsAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RetainPermissionOnScriptCompletion**: RetainPermissionOnScriptCompletion \
 * **RemovePermissionOnScriptCompletion**: RemovePermissionOnScriptCompletion
 */
export type PrincipalPermissionsAction = string;

/** The list Kusto database script operation response. */
export interface _ScriptListResult {
  /** The list of Kusto scripts. */
  value?: Script[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _scriptListResultDeserializer(item: any): _ScriptListResult {
  return {
    value: !item["value"] ? item["value"] : scriptArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scriptArraySerializer(result: Array<Script>): any[] {
  return result.map((item) => {
    return scriptSerializer(item);
  });
}

export function scriptArrayDeserializer(result: Array<Script>): any[] {
  return result.map((item) => {
    return scriptDeserializer(item);
  });
}

/** A script name availability request. */
export interface ScriptCheckNameRequest {
  /** Script name. */
  name: string;
  /** The type of resource, Microsoft.Kusto/clusters/databases/scripts. */
  type: "Microsoft.Kusto/clusters/databases/scripts";
}

export function scriptCheckNameRequestSerializer(item: ScriptCheckNameRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing an data connection. */
export interface DataConnection extends ProxyResource {
  /** Resource location. */
  location?: string;
  /** Kind of the endpoint for the data connection */
  /** The discriminator possible values: EventHub, IotHub, EventGrid, CosmosDb, EventGridWithManagedIdentity, EventHubWithManagedIdentity */
  kind: DataConnectionKind;
}

export function dataConnectionSerializer(item: DataConnection): any {
  return { location: item["location"], kind: item["kind"] };
}

export function dataConnectionDeserializer(item: any): DataConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    kind: item["kind"],
  };
}

/** Alias for DataConnectionUnion */
export type DataConnectionUnion =
  | EventHubDataConnection
  | IotHubDataConnection
  | EventGridDataConnection
  | CosmosDbDataConnection
  | EventGridDataConnectionWithManagedIdentity
  | EventHubDataConnectionWithManagedIdentity
  | DataConnection;

export function dataConnectionUnionSerializer(item: DataConnectionUnion): any {
  switch (item.kind) {
    case "EventHub":
      return eventHubDataConnectionSerializer(item as EventHubDataConnection);

    case "IotHub":
      return iotHubDataConnectionSerializer(item as IotHubDataConnection);

    case "EventGrid":
      return eventGridDataConnectionSerializer(item as EventGridDataConnection);

    case "CosmosDb":
      return cosmosDbDataConnectionSerializer(item as CosmosDbDataConnection);

    case "EventGridWithManagedIdentity":
      return eventGridDataConnectionWithManagedIdentitySerializer(
        item as EventGridDataConnectionWithManagedIdentity,
      );

    case "EventHubWithManagedIdentity":
      return eventHubDataConnectionWithManagedIdentitySerializer(
        item as EventHubDataConnectionWithManagedIdentity,
      );

    default:
      return dataConnectionSerializer(item);
  }
}

export function dataConnectionUnionDeserializer(item: any): DataConnectionUnion {
  switch (item["kind"]) {
    case "EventHub":
      return eventHubDataConnectionDeserializer(item as EventHubDataConnection);

    case "IotHub":
      return iotHubDataConnectionDeserializer(item as IotHubDataConnection);

    case "EventGrid":
      return eventGridDataConnectionDeserializer(item as EventGridDataConnection);

    case "CosmosDb":
      return cosmosDbDataConnectionDeserializer(item as CosmosDbDataConnection);

    case "EventGridWithManagedIdentity":
      return eventGridDataConnectionWithManagedIdentityDeserializer(
        item as EventGridDataConnectionWithManagedIdentity,
      );

    case "EventHubWithManagedIdentity":
      return eventHubDataConnectionWithManagedIdentityDeserializer(
        item as EventHubDataConnectionWithManagedIdentity,
      );

    default:
      return dataConnectionDeserializer(item);
  }
}

/** Kind of the endpoint for the data connection */
export enum KnownDataConnectionKind {
  /** EventHub */
  EventHub = "EventHub",
  /** EventGrid */
  EventGrid = "EventGrid",
  /** IotHub */
  IotHub = "IotHub",
  /** CosmosDb */
  CosmosDb = "CosmosDb",
  /** EventHubWithManagedIdentity */
  EventHubWithManagedIdentity = "EventHubWithManagedIdentity",
  /** EventGridWithManagedIdentity */
  EventGridWithManagedIdentity = "EventGridWithManagedIdentity",
}

/**
 * Kind of the endpoint for the data connection \
 * {@link KnownDataConnectionKind} can be used interchangeably with DataConnectionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventHub**: EventHub \
 * **EventGrid**: EventGrid \
 * **IotHub**: IotHub \
 * **CosmosDb**: CosmosDb \
 * **EventHubWithManagedIdentity**: EventHubWithManagedIdentity \
 * **EventGridWithManagedIdentity**: EventGridWithManagedIdentity
 */
export type DataConnectionKind = string;

/** Class representing an event hub data connection. */
export interface EventHubDataConnection extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "EventHub";
  /** The resource ID of the event hub to be used to create a data connection. */
  eventHubResourceId?: string;
  /** The event hub consumer group. */
  consumerGroup?: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventHubDataFormat;
  /** System properties of the event hub */
  eventSystemProperties?: string[];
  /** The compression type */
  compression?: Compression;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub. */
  managedIdentityResourceId?: string;
  /** The object ID of the managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
}

export function eventHubDataConnectionSerializer(item: EventHubDataConnection): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "eventHubResourceId",
      "consumerGroup",
      "tableName",
      "mappingRuleName",
      "dataFormat",
      "eventSystemProperties",
      "compression",
      "managedIdentityResourceId",
      "databaseRouting",
      "retrievalStartDate",
    ])
      ? undefined
      : _eventHubDataConnectionPropertiesSerializer(item),
  };
}

export function eventHubDataConnectionDeserializer(item: any): EventHubDataConnection {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventHubDataConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto event hub connection properties. */
export interface EventHubConnectionProperties {
  /** The resource ID of the event hub to be used to create a data connection. */
  eventHubResourceId: string;
  /** The event hub consumer group. */
  consumerGroup: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventHubDataFormat;
  /** System properties of the event hub */
  eventSystemProperties?: string[];
  /** The compression type */
  compression?: Compression;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub. */
  managedIdentityResourceId?: string;
  /** The object ID of the managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
}

export function eventHubConnectionPropertiesSerializer(item: EventHubConnectionProperties): any {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function eventHubConnectionPropertiesDeserializer(item: any): EventHubConnectionProperties {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    provisioningState: item["provisioningState"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
  };
}

/** The data format of the message. Optionally the data format can be added to each message. */
export enum KnownEventHubDataFormat {
  /** MULTIJSON */
  Multijson = "MULTIJSON",
  /** JSON */
  Json = "JSON",
  /** CSV */
  CSV = "CSV",
  /** TSV */
  TSV = "TSV",
  /** SCSV */
  Scsv = "SCSV",
  /** SOHSV */
  Sohsv = "SOHSV",
  /** PSV */
  PSV = "PSV",
  /** TXT */
  TXT = "TXT",
  /** RAW */
  RAW = "RAW",
  /** SINGLEJSON */
  Singlejson = "SINGLEJSON",
  /** AVRO */
  Avro = "AVRO",
  /** TSVE */
  Tsve = "TSVE",
  /** PARQUET */
  Parquet = "PARQUET",
  /** ORC */
  ORC = "ORC",
  /** APACHEAVRO */
  Apacheavro = "APACHEAVRO",
  /** W3CLOGFILE */
  W3Clogfile = "W3CLOGFILE",
  /** AZMONSTREAM */
  Azmonstream = "AZMONSTREAM",
}

/**
 * The data format of the message. Optionally the data format can be added to each message. \
 * {@link KnownEventHubDataFormat} can be used interchangeably with EventHubDataFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MULTIJSON**: MULTIJSON \
 * **JSON**: JSON \
 * **CSV**: CSV \
 * **TSV**: TSV \
 * **SCSV**: SCSV \
 * **SOHSV**: SOHSV \
 * **PSV**: PSV \
 * **TXT**: TXT \
 * **RAW**: RAW \
 * **SINGLEJSON**: SINGLEJSON \
 * **AVRO**: AVRO \
 * **TSVE**: TSVE \
 * **PARQUET**: PARQUET \
 * **ORC**: ORC \
 * **APACHEAVRO**: APACHEAVRO \
 * **W3CLOGFILE**: W3CLOGFILE \
 * **AZMONSTREAM**: AZMONSTREAM
 */
export type EventHubDataFormat = string;

/** The compression type */
export enum KnownCompression {
  /** None */
  None = "None",
  /** GZip */
  GZip = "GZip",
}

/**
 * The compression type \
 * {@link KnownCompression} can be used interchangeably with Compression,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **GZip**: GZip
 */
export type Compression = string;

/** Indication for database routing information from the data connection, by default only database routing information is allowed */
export enum KnownDatabaseRouting {
  /** Single */
  Single = "Single",
  /** Multi */
  Multi = "Multi",
}

/**
 * Indication for database routing information from the data connection, by default only database routing information is allowed \
 * {@link KnownDatabaseRouting} can be used interchangeably with DatabaseRouting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: Single \
 * **Multi**: Multi
 */
export type DatabaseRouting = string;

/** Class representing an iot hub data connection. */
export interface IotHubDataConnection extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "IotHub";
  /** The resource ID of the Iot hub to be used to create a data connection. */
  iotHubResourceId?: string;
  /** The iot hub consumer group. */
  consumerGroup?: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: IotHubDataFormat;
  /** System properties of the iot hub */
  eventSystemProperties?: string[];
  /** The name of the share access policy */
  sharedAccessPolicyName?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function iotHubDataConnectionSerializer(item: IotHubDataConnection): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "iotHubResourceId",
      "consumerGroup",
      "tableName",
      "mappingRuleName",
      "dataFormat",
      "eventSystemProperties",
      "sharedAccessPolicyName",
      "databaseRouting",
      "retrievalStartDate",
    ])
      ? undefined
      : _iotHubDataConnectionPropertiesSerializer(item),
  };
}

export function iotHubDataConnectionDeserializer(item: any): IotHubDataConnection {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _iotHubDataConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto Iot hub connection properties. */
export interface IotHubConnectionProperties {
  /** The resource ID of the Iot hub to be used to create a data connection. */
  iotHubResourceId: string;
  /** The iot hub consumer group. */
  consumerGroup: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: IotHubDataFormat;
  /** System properties of the iot hub */
  eventSystemProperties?: string[];
  /** The name of the share access policy */
  sharedAccessPolicyName: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function iotHubConnectionPropertiesSerializer(item: IotHubConnectionProperties): any {
  return {
    iotHubResourceId: item["iotHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    sharedAccessPolicyName: item["sharedAccessPolicyName"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function iotHubConnectionPropertiesDeserializer(item: any): IotHubConnectionProperties {
  return {
    iotHubResourceId: item["iotHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    sharedAccessPolicyName: item["sharedAccessPolicyName"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
    provisioningState: item["provisioningState"],
  };
}

/** The data format of the message. Optionally the data format can be added to each message. */
export enum KnownIotHubDataFormat {
  /** MULTIJSON */
  Multijson = "MULTIJSON",
  /** JSON */
  Json = "JSON",
  /** CSV */
  CSV = "CSV",
  /** TSV */
  TSV = "TSV",
  /** SCSV */
  Scsv = "SCSV",
  /** SOHSV */
  Sohsv = "SOHSV",
  /** PSV */
  PSV = "PSV",
  /** TXT */
  TXT = "TXT",
  /** RAW */
  RAW = "RAW",
  /** SINGLEJSON */
  Singlejson = "SINGLEJSON",
  /** AVRO */
  Avro = "AVRO",
  /** TSVE */
  Tsve = "TSVE",
  /** PARQUET */
  Parquet = "PARQUET",
  /** ORC */
  ORC = "ORC",
  /** APACHEAVRO */
  Apacheavro = "APACHEAVRO",
  /** W3CLOGFILE */
  W3Clogfile = "W3CLOGFILE",
  /** AZMONSTREAM */
  Azmonstream = "AZMONSTREAM",
}

/**
 * The data format of the message. Optionally the data format can be added to each message. \
 * {@link KnownIotHubDataFormat} can be used interchangeably with IotHubDataFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MULTIJSON**: MULTIJSON \
 * **JSON**: JSON \
 * **CSV**: CSV \
 * **TSV**: TSV \
 * **SCSV**: SCSV \
 * **SOHSV**: SOHSV \
 * **PSV**: PSV \
 * **TXT**: TXT \
 * **RAW**: RAW \
 * **SINGLEJSON**: SINGLEJSON \
 * **AVRO**: AVRO \
 * **TSVE**: TSVE \
 * **PARQUET**: PARQUET \
 * **ORC**: ORC \
 * **APACHEAVRO**: APACHEAVRO \
 * **W3CLOGFILE**: W3CLOGFILE \
 * **AZMONSTREAM**: AZMONSTREAM
 */
export type IotHubDataFormat = string;

/** Class representing an Event Grid data connection. */
export interface EventGridDataConnection extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "EventGrid";
  /** The resource ID of the storage account where the data resides. */
  storageAccountResourceId?: string;
  /** The resource ID of the event grid that is subscribed to the storage account events. */
  eventGridResourceId?: string;
  /** The resource ID where the event grid is configured to send events. */
  eventHubResourceId?: string;
  /** The event hub consumer group. */
  consumerGroup?: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventGridDataFormat;
  /** A Boolean value that, if set to true, indicates that ingestion should ignore the first record of every file */
  ignoreFirstRecord?: boolean;
  /** The name of blob storage event type to process. */
  blobStorageEventType?: BlobStorageEventType;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub and storage account. */
  managedIdentityResourceId?: string;
  /** The object ID of managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function eventGridDataConnectionSerializer(item: EventGridDataConnection): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "storageAccountResourceId",
      "eventGridResourceId",
      "eventHubResourceId",
      "consumerGroup",
      "tableName",
      "mappingRuleName",
      "dataFormat",
      "ignoreFirstRecord",
      "blobStorageEventType",
      "managedIdentityResourceId",
      "databaseRouting",
    ])
      ? undefined
      : _eventGridDataConnectionPropertiesSerializer(item),
  };
}

export function eventGridDataConnectionDeserializer(item: any): EventGridDataConnection {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventGridDataConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto event grid connection properties. */
export interface EventGridConnectionProperties {
  /** The resource ID of the storage account where the data resides. */
  storageAccountResourceId: string;
  /** The resource ID of the event grid that is subscribed to the storage account events. */
  eventGridResourceId?: string;
  /** The resource ID where the event grid is configured to send events. */
  eventHubResourceId: string;
  /** The event hub consumer group. */
  consumerGroup: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventGridDataFormat;
  /** A Boolean value that, if set to true, indicates that ingestion should ignore the first record of every file */
  ignoreFirstRecord?: boolean;
  /** The name of blob storage event type to process. */
  blobStorageEventType?: BlobStorageEventType;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub and storage account. */
  managedIdentityResourceId?: string;
  /** The object ID of managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function eventGridConnectionPropertiesSerializer(item: EventGridConnectionProperties): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    eventGridResourceId: item["eventGridResourceId"],
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
  };
}

export function eventGridConnectionPropertiesDeserializer(
  item: any,
): EventGridConnectionProperties {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    eventGridResourceId: item["eventGridResourceId"],
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    provisioningState: item["provisioningState"],
  };
}

/** The data format of the message. Optionally the data format can be added to each message. */
export enum KnownEventGridDataFormat {
  /** MULTIJSON */
  Multijson = "MULTIJSON",
  /** JSON */
  Json = "JSON",
  /** CSV */
  CSV = "CSV",
  /** TSV */
  TSV = "TSV",
  /** SCSV */
  Scsv = "SCSV",
  /** SOHSV */
  Sohsv = "SOHSV",
  /** PSV */
  PSV = "PSV",
  /** TXT */
  TXT = "TXT",
  /** RAW */
  RAW = "RAW",
  /** SINGLEJSON */
  Singlejson = "SINGLEJSON",
  /** AVRO */
  Avro = "AVRO",
  /** TSVE */
  Tsve = "TSVE",
  /** PARQUET */
  Parquet = "PARQUET",
  /** ORC */
  ORC = "ORC",
  /** APACHEAVRO */
  Apacheavro = "APACHEAVRO",
  /** W3CLOGFILE */
  W3Clogfile = "W3CLOGFILE",
  /** AZMONSTREAM */
  Azmonstream = "AZMONSTREAM",
}

/**
 * The data format of the message. Optionally the data format can be added to each message. \
 * {@link KnownEventGridDataFormat} can be used interchangeably with EventGridDataFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MULTIJSON**: MULTIJSON \
 * **JSON**: JSON \
 * **CSV**: CSV \
 * **TSV**: TSV \
 * **SCSV**: SCSV \
 * **SOHSV**: SOHSV \
 * **PSV**: PSV \
 * **TXT**: TXT \
 * **RAW**: RAW \
 * **SINGLEJSON**: SINGLEJSON \
 * **AVRO**: AVRO \
 * **TSVE**: TSVE \
 * **PARQUET**: PARQUET \
 * **ORC**: ORC \
 * **APACHEAVRO**: APACHEAVRO \
 * **W3CLOGFILE**: W3CLOGFILE \
 * **AZMONSTREAM**: AZMONSTREAM
 */
export type EventGridDataFormat = string;

/** The name of blob storage event type to process. */
export enum KnownBlobStorageEventType {
  /** Microsoft.Storage.BlobCreated */
  MicrosoftStorageBlobCreated = "Microsoft.Storage.BlobCreated",
  /** Microsoft.Storage.BlobRenamed */
  MicrosoftStorageBlobRenamed = "Microsoft.Storage.BlobRenamed",
}

/**
 * The name of blob storage event type to process. \
 * {@link KnownBlobStorageEventType} can be used interchangeably with BlobStorageEventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Storage.BlobCreated**: Microsoft.Storage.BlobCreated \
 * **Microsoft.Storage.BlobRenamed**: Microsoft.Storage.BlobRenamed
 */
export type BlobStorageEventType = string;

/** Class representing a CosmosDb data connection. */
export interface CosmosDbDataConnection extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "CosmosDb";
  /** The case-sensitive name of the existing target table in your cluster. Retrieved data is ingested into this table. */
  tableName?: string;
  /** The name of an existing mapping rule to use when ingesting the retrieved data. */
  mappingRuleName?: string;
  /** The resource ID of a managed system or user-assigned identity. The identity is used to authenticate with Cosmos DB. */
  managedIdentityResourceId?: string;
  /** The object ID of the managed identity resource. */
  readonly managedIdentityObjectId?: string;
  /** The resource ID of the Cosmos DB account used to create the data connection. */
  cosmosDbAccountResourceId?: string;
  /** The name of an existing database in the Cosmos DB account. */
  cosmosDbDatabase?: string;
  /** The name of an existing container in the Cosmos DB database. */
  cosmosDbContainer?: string;
  /** Optional. If defined, the data connection retrieves Cosmos DB documents created or updated after the specified retrieval start date. */
  retrievalStartDate?: Date;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function cosmosDbDataConnectionSerializer(item: CosmosDbDataConnection): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "tableName",
      "mappingRuleName",
      "managedIdentityResourceId",
      "cosmosDbAccountResourceId",
      "cosmosDbDatabase",
      "cosmosDbContainer",
      "retrievalStartDate",
    ])
      ? undefined
      : _cosmosDbDataConnectionPropertiesSerializer(item),
  };
}

export function cosmosDbDataConnectionDeserializer(item: any): CosmosDbDataConnection {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cosmosDbDataConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto CosmosDb data connection properties. */
export interface CosmosDbDataConnectionProperties {
  /** The case-sensitive name of the existing target table in your cluster. Retrieved data is ingested into this table. */
  tableName: string;
  /** The name of an existing mapping rule to use when ingesting the retrieved data. */
  mappingRuleName?: string;
  /** The resource ID of a managed system or user-assigned identity. The identity is used to authenticate with Cosmos DB. */
  managedIdentityResourceId: string;
  /** The object ID of the managed identity resource. */
  readonly managedIdentityObjectId?: string;
  /** The resource ID of the Cosmos DB account used to create the data connection. */
  cosmosDbAccountResourceId: string;
  /** The name of an existing database in the Cosmos DB account. */
  cosmosDbDatabase: string;
  /** The name of an existing container in the Cosmos DB database. */
  cosmosDbContainer: string;
  /** Optional. If defined, the data connection retrieves Cosmos DB documents created or updated after the specified retrieval start date. */
  retrievalStartDate?: Date;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function cosmosDbDataConnectionPropertiesSerializer(
  item: CosmosDbDataConnectionProperties,
): any {
  return {
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    cosmosDbAccountResourceId: item["cosmosDbAccountResourceId"],
    cosmosDbDatabase: item["cosmosDbDatabase"],
    cosmosDbContainer: item["cosmosDbContainer"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function cosmosDbDataConnectionPropertiesDeserializer(
  item: any,
): CosmosDbDataConnectionProperties {
  return {
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    cosmosDbAccountResourceId: item["cosmosDbAccountResourceId"],
    cosmosDbDatabase: item["cosmosDbDatabase"],
    cosmosDbContainer: item["cosmosDbContainer"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
    provisioningState: item["provisioningState"],
  };
}

/** Class representing an Event Grid data connection with mandatory managed identity. */
export interface EventGridDataConnectionWithManagedIdentity extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "EventGridWithManagedIdentity";
  /** The resource ID of the storage account where the data resides. */
  storageAccountResourceIdForManagedIdentity?: string;
  /** The resource ID of the event hub that is subscribed to the storage account events. */
  eventHubResourceIdForManagedIdentity?: string;
  /** The resource ID where the event grid is configured to send events. */
  eventGridResourceId?: string;
  /** The event hub consumer group. */
  consumerGroup?: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventGridDataFormat;
  /** A Boolean value that, if set to true, indicates that ingestion should ignore the first record of every file */
  ignoreFirstRecord?: boolean;
  /** The name of blob storage event type to process. */
  blobStorageEventType?: BlobStorageEventType;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub and storage account. */
  managedIdentityResourceId?: string;
  /** The object ID of managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function eventGridDataConnectionWithManagedIdentitySerializer(
  item: EventGridDataConnectionWithManagedIdentity,
): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "storageAccountResourceIdForManagedIdentity",
      "eventHubResourceIdForManagedIdentity",
      "eventGridResourceId",
      "consumerGroup",
      "tableName",
      "mappingRuleName",
      "dataFormat",
      "ignoreFirstRecord",
      "blobStorageEventType",
      "managedIdentityResourceId",
      "databaseRouting",
    ])
      ? undefined
      : _eventGridDataConnectionWithManagedIdentityPropertiesSerializer(item),
  };
}

export function eventGridDataConnectionWithManagedIdentityDeserializer(
  item: any,
): EventGridDataConnectionWithManagedIdentity {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventGridDataConnectionWithManagedIdentityPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto event grid connection with mandatory managed identity properties. */
export interface EventGridConnectionWithManagedIdentityProperties {
  /** The resource ID of the storage account where the data resides. */
  storageAccountResourceIdForManagedIdentity: string;
  /** The resource ID of the event hub that is subscribed to the storage account events. */
  eventHubResourceIdForManagedIdentity: string;
  /** The resource ID where the event grid is configured to send events. */
  eventGridResourceId?: string;
  /** The event hub consumer group. */
  consumerGroup: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventGridDataFormat;
  /** A Boolean value that, if set to true, indicates that ingestion should ignore the first record of every file */
  ignoreFirstRecord?: boolean;
  /** The name of blob storage event type to process. */
  blobStorageEventType?: BlobStorageEventType;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub and storage account. */
  managedIdentityResourceId: string;
  /** The object ID of managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function eventGridConnectionWithManagedIdentityPropertiesSerializer(
  item: EventGridConnectionWithManagedIdentityProperties,
): any {
  return {
    storageAccountResourceIdForManagedIdentity: item["storageAccountResourceIdForManagedIdentity"],
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    eventGridResourceId: item["eventGridResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
  };
}

export function eventGridConnectionWithManagedIdentityPropertiesDeserializer(
  item: any,
): EventGridConnectionWithManagedIdentityProperties {
  return {
    storageAccountResourceIdForManagedIdentity: item["storageAccountResourceIdForManagedIdentity"],
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    eventGridResourceId: item["eventGridResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    provisioningState: item["provisioningState"],
  };
}

/** Class representing an event hub data connection with required managed identity. */
export interface EventHubDataConnectionWithManagedIdentity extends DataConnection {
  /** Kind of the endpoint for the data connection */
  kind: "EventHubWithManagedIdentity";
  /** The resource ID of the event hub to be used to create a data connection. */
  eventHubResourceIdForManagedIdentity?: string;
  /** The event hub consumer group. */
  consumerGroup?: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventHubDataFormat;
  /** System properties of the event hub */
  eventSystemProperties?: string[];
  /** The compression type */
  compression?: Compression;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub. */
  managedIdentityResourceId?: string;
  /** The object ID of the managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
}

export function eventHubDataConnectionWithManagedIdentitySerializer(
  item: EventHubDataConnectionWithManagedIdentity,
): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "eventHubResourceIdForManagedIdentity",
      "consumerGroup",
      "tableName",
      "mappingRuleName",
      "dataFormat",
      "eventSystemProperties",
      "compression",
      "managedIdentityResourceId",
      "databaseRouting",
      "retrievalStartDate",
    ])
      ? undefined
      : _eventHubDataConnectionWithManagedIdentityPropertiesSerializer(item),
  };
}

export function eventHubDataConnectionWithManagedIdentityDeserializer(
  item: any,
): EventHubDataConnectionWithManagedIdentity {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventHubDataConnectionWithManagedIdentityPropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto event hub connection with required managed identity properties. */
export interface EventHubConnectionWithManagedIdentityProperties {
  /** The resource ID of the event hub to be used to create a data connection. */
  eventHubResourceIdForManagedIdentity: string;
  /** The event hub consumer group. */
  consumerGroup: string;
  /** The table where the data should be ingested. Optionally the table information can be added to each message. */
  tableName?: string;
  /** The mapping rule to be used to ingest the data. Optionally the mapping information can be added to each message. */
  mappingRuleName?: string;
  /** The data format of the message. Optionally the data format can be added to each message. */
  dataFormat?: EventHubDataFormat;
  /** System properties of the event hub */
  eventSystemProperties?: string[];
  /** The compression type */
  compression?: Compression;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of a managed identity (system or user assigned) to be used to authenticate with event hub. */
  managedIdentityResourceId: string;
  /** The object ID of the managedIdentityResourceId */
  readonly managedIdentityObjectId?: string;
  /** Indication for database routing information from the data connection, by default only database routing information is allowed */
  databaseRouting?: DatabaseRouting;
  /** When defined, the data connection retrieves existing Event hub events created since the Retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. */
  retrievalStartDate?: Date;
}

export function eventHubConnectionWithManagedIdentityPropertiesSerializer(
  item: EventHubConnectionWithManagedIdentityProperties,
): any {
  return {
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function eventHubConnectionWithManagedIdentityPropertiesDeserializer(
  item: any,
): EventHubConnectionWithManagedIdentityProperties {
  return {
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    provisioningState: item["provisioningState"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
  };
}

/** The list Kusto data connections operation response. */
export interface _DataConnectionListResult {
  /** The list of Kusto data connections. */
  value?: DataConnectionUnion[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _dataConnectionListResultDeserializer(item: any): _DataConnectionListResult {
  return {
    value: !item["value"] ? item["value"] : dataConnectionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataConnectionUnionArraySerializer(result: Array<DataConnectionUnion>): any[] {
  return result.map((item) => {
    return dataConnectionUnionSerializer(item);
  });
}

export function dataConnectionUnionArrayDeserializer(result: Array<DataConnectionUnion>): any[] {
  return result.map((item) => {
    return dataConnectionUnionDeserializer(item);
  });
}

/** Class representing an data connection validation. */
export interface DataConnectionValidation {
  /** The name of the data connection. */
  dataConnectionName?: string;
  /** The data connection properties to validate. */
  properties?: DataConnectionUnion;
}

export function dataConnectionValidationSerializer(item: DataConnectionValidation): any {
  return {
    dataConnectionName: item["dataConnectionName"],
    properties: !item["properties"]
      ? item["properties"]
      : dataConnectionUnionSerializer(item["properties"]),
  };
}

/** The list Kusto data connection validation result. */
export interface DataConnectionValidationListResult {
  /** The list of Kusto data connection validation errors. */
  value?: DataConnectionValidationResult[];
}

export function dataConnectionValidationListResultDeserializer(
  item: any,
): DataConnectionValidationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : dataConnectionValidationResultArrayDeserializer(item["value"]),
  };
}

export function dataConnectionValidationResultArrayDeserializer(
  result: Array<DataConnectionValidationResult>,
): any[] {
  return result.map((item) => {
    return dataConnectionValidationResultDeserializer(item);
  });
}

/** The result returned from a data connection validation request. */
export interface DataConnectionValidationResult {
  /** A message which indicates a problem in data connection validation. */
  errorMessage?: string;
}

export function dataConnectionValidationResultDeserializer(
  item: any,
): DataConnectionValidationResult {
  return {
    errorMessage: item["errorMessage"],
  };
}

/** A data connection check name availability request. */
export interface DataConnectionCheckNameRequest {
  /** Data Connection name. */
  name: string;
  /** The type of resource, Microsoft.Kusto/clusters/databases/dataConnections. */
  type: "Microsoft.Kusto/clusters/databases/dataConnections";
}

export function dataConnectionCheckNameRequestSerializer(
  item: DataConnectionCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a Kusto database. */
export interface Database extends ProxyResource {
  /** Resource location. */
  location?: string;
  /** Kind of the database */
  /** The discriminator possible values: ReadWrite, ReadOnlyFollowing */
  kind: Kind;
}

export function databaseSerializer(item: Database): any {
  return { location: item["location"], kind: item["kind"] };
}

export function databaseDeserializer(item: any): Database {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    kind: item["kind"],
  };
}

/** Alias for DatabaseUnion */
export type DatabaseUnion = ReadWriteDatabase | ReadOnlyFollowingDatabase | Database;

export function databaseUnionSerializer(item: DatabaseUnion): any {
  switch (item.kind) {
    case "ReadWrite":
      return readWriteDatabaseSerializer(item as ReadWriteDatabase);

    case "ReadOnlyFollowing":
      return readOnlyFollowingDatabaseSerializer(item as ReadOnlyFollowingDatabase);

    default:
      return databaseSerializer(item);
  }
}

export function databaseUnionDeserializer(item: any): DatabaseUnion {
  switch (item["kind"]) {
    case "ReadWrite":
      return readWriteDatabaseDeserializer(item as ReadWriteDatabase);

    case "ReadOnlyFollowing":
      return readOnlyFollowingDatabaseDeserializer(item as ReadOnlyFollowingDatabase);

    default:
      return databaseDeserializer(item);
  }
}

/** Kind of the database */
export enum KnownKind {
  /** ReadWrite */
  ReadWrite = "ReadWrite",
  /** ReadOnlyFollowing */
  ReadOnlyFollowing = "ReadOnlyFollowing",
}

/**
 * Kind of the database \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWrite**: ReadWrite \
 * **ReadOnlyFollowing**: ReadOnlyFollowing
 */
export type Kind = string;

/** Class representing a read write database. */
export interface ReadWriteDatabase extends Database {
  /** Kind of the database */
  kind: "ReadWrite";
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The time the data should be kept before it stops being accessible to queries in TimeSpan. */
  softDeletePeriod?: string;
  /** The time the data should be kept in cache for fast queries in TimeSpan. */
  hotCachePeriod?: string;
  /** The statistics of the database. */
  readonly statistics?: DatabaseStatistics;
  /** Indicates whether the database is followed. */
  readonly isFollowed?: boolean;
  /** KeyVault properties for the database encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** The database suspension details. If the database is suspended, this object contains information related to the database's suspension state. */
  readonly suspensionDetails?: SuspensionDetails;
}

export function readWriteDatabaseSerializer(item: ReadWriteDatabase): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "softDeletePeriod",
      "hotCachePeriod",
      "keyVaultProperties",
    ])
      ? undefined
      : _readWriteDatabasePropertiesSerializer(item),
  };
}

export function readWriteDatabaseDeserializer(item: any): ReadWriteDatabase {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _readWriteDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto database properties. */
export interface ReadWriteDatabaseProperties {
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The time the data should be kept before it stops being accessible to queries in TimeSpan. */
  softDeletePeriod?: string;
  /** The time the data should be kept in cache for fast queries in TimeSpan. */
  hotCachePeriod?: string;
  /** The statistics of the database. */
  readonly statistics?: DatabaseStatistics;
  /** Indicates whether the database is followed. */
  readonly isFollowed?: boolean;
  /** KeyVault properties for the database encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** The database suspension details. If the database is suspended, this object contains information related to the database's suspension state. */
  readonly suspensionDetails?: SuspensionDetails;
}

export function readWriteDatabasePropertiesSerializer(item: ReadWriteDatabaseProperties): any {
  return {
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function readWriteDatabasePropertiesDeserializer(item: any): ReadWriteDatabaseProperties {
  return {
    provisioningState: item["provisioningState"],
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    statistics: !item["statistics"]
      ? item["statistics"]
      : databaseStatisticsDeserializer(item["statistics"]),
    isFollowed: item["isFollowed"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    suspensionDetails: !item["suspensionDetails"]
      ? item["suspensionDetails"]
      : suspensionDetailsDeserializer(item["suspensionDetails"]),
  };
}

/** A class that contains database statistics information. */
export interface DatabaseStatistics {
  /** The database size - the total size of compressed data and index in bytes. */
  size?: number;
}

export function databaseStatisticsDeserializer(item: any): DatabaseStatistics {
  return {
    size: item["size"],
  };
}

/** Properties of the key vault. */
export interface KeyVaultProperties {
  /** The name of the key vault key. */
  keyName?: string;
  /** The version of the key vault key. */
  keyVersion?: string;
  /** The Uri of the key vault. */
  keyVaultUri?: string;
  /** The user assigned identity (ARM resource id) that has access to the key. The identity must have 'Get', 'Wrap Key', and 'Unwrap Key' permissions on the Key Vault key, or be assigned the 'Key Vault Crypto Service Encryption User' role. */
  userIdentity?: string;
  /** The application (client) ID of the multi-tenant Microsoft Entra application. Used for cross-tenant customer-managed key scenarios where the encryption key is stored in a different tenant than the cluster. The application must be configured with the user-assigned managed identity as a federated identity credential. */
  federatedIdentityClientId?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    userIdentity: item["userIdentity"],
    federatedIdentityClientId: item["federatedIdentityClientId"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    userIdentity: item["userIdentity"],
    federatedIdentityClientId: item["federatedIdentityClientId"],
  };
}

/** The database suspension details. If the database is suspended, this object contains information related to the database's suspension state. */
export interface SuspensionDetails {
  /** The starting date and time of the suspension state. */
  suspensionStartDate?: Date;
}

export function suspensionDetailsDeserializer(item: any): SuspensionDetails {
  return {
    suspensionStartDate: !item["suspensionStartDate"]
      ? item["suspensionStartDate"]
      : new Date(item["suspensionStartDate"]),
  };
}

/** Class representing a read only following database. */
export interface ReadOnlyFollowingDatabase extends Database {
  /** Kind of the database */
  kind: "ReadOnlyFollowing";
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The time the data should be kept before it stops being accessible to queries in TimeSpan. */
  readonly softDeletePeriod?: string;
  /** The time the data should be kept in cache for fast queries in TimeSpan. */
  hotCachePeriod?: string;
  /** The statistics of the database. */
  readonly statistics?: DatabaseStatistics;
  /** The name of the leader cluster */
  readonly leaderClusterResourceId?: string;
  /** The name of the attached database configuration cluster */
  readonly attachedDatabaseConfigurationName?: string;
  /** The principals modification kind of the database */
  readonly principalsModificationKind?: PrincipalsModificationKind;
  /** Table level sharing specifications */
  readonly tableLevelSharingProperties?: TableLevelSharingProperties;
  /** The original database name, before databaseNameOverride or databaseNamePrefix where applied. */
  readonly originalDatabaseName?: string;
  /** The origin of the following setup. */
  readonly databaseShareOrigin?: DatabaseShareOrigin;
  /** The database suspension details. If the database is suspended, this object contains information related to the database's suspension state. */
  readonly suspensionDetails?: SuspensionDetails;
}

export function readOnlyFollowingDatabaseSerializer(item: ReadOnlyFollowingDatabase): any {
  return {
    location: item["location"],
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["hotCachePeriod"])
      ? undefined
      : _readOnlyFollowingDatabasePropertiesSerializer(item),
  };
}

export function readOnlyFollowingDatabaseDeserializer(item: any): ReadOnlyFollowingDatabase {
  return {
    location: item["location"],
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _readOnlyFollowingDatabasePropertiesDeserializer(item["properties"])),
  };
}

/** Class representing the Kusto database properties. */
export interface ReadOnlyFollowingDatabaseProperties {
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The time the data should be kept before it stops being accessible to queries in TimeSpan. */
  readonly softDeletePeriod?: string;
  /** The time the data should be kept in cache for fast queries in TimeSpan. */
  hotCachePeriod?: string;
  /** The statistics of the database. */
  readonly statistics?: DatabaseStatistics;
  /** The name of the leader cluster */
  readonly leaderClusterResourceId?: string;
  /** The name of the attached database configuration cluster */
  readonly attachedDatabaseConfigurationName?: string;
  /** The principals modification kind of the database */
  readonly principalsModificationKind?: PrincipalsModificationKind;
  /** Table level sharing specifications */
  readonly tableLevelSharingProperties?: TableLevelSharingProperties;
  /** The original database name, before databaseNameOverride or databaseNamePrefix where applied. */
  readonly originalDatabaseName?: string;
  /** The origin of the following setup. */
  readonly databaseShareOrigin?: DatabaseShareOrigin;
  /** The database suspension details. If the database is suspended, this object contains information related to the database's suspension state. */
  readonly suspensionDetails?: SuspensionDetails;
}

export function readOnlyFollowingDatabasePropertiesSerializer(
  item: ReadOnlyFollowingDatabaseProperties,
): any {
  return { hotCachePeriod: item["hotCachePeriod"] };
}

export function readOnlyFollowingDatabasePropertiesDeserializer(
  item: any,
): ReadOnlyFollowingDatabaseProperties {
  return {
    provisioningState: item["provisioningState"],
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    statistics: !item["statistics"]
      ? item["statistics"]
      : databaseStatisticsDeserializer(item["statistics"]),
    leaderClusterResourceId: item["leaderClusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
    principalsModificationKind: item["principalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    originalDatabaseName: item["originalDatabaseName"],
    databaseShareOrigin: item["databaseShareOrigin"],
    suspensionDetails: !item["suspensionDetails"]
      ? item["suspensionDetails"]
      : suspensionDetailsDeserializer(item["suspensionDetails"]),
  };
}

/** The principals modification kind of the database */
export enum KnownPrincipalsModificationKind {
  /** Union */
  Union = "Union",
  /** Replace */
  Replace = "Replace",
  /** None */
  None = "None",
}

/**
 * The principals modification kind of the database \
 * {@link KnownPrincipalsModificationKind} can be used interchangeably with PrincipalsModificationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Union**: Union \
 * **Replace**: Replace \
 * **None**: None
 */
export type PrincipalsModificationKind = string;

/** Tables that will be included and excluded in the follower database */
export interface TableLevelSharingProperties {
  /** List of tables to include in the follower database */
  tablesToInclude?: string[];
  /** List of tables to exclude from the follower database */
  tablesToExclude?: string[];
  /** List of external tables to include in the follower database */
  externalTablesToInclude?: string[];
  /** List of external tables to exclude from the follower database */
  externalTablesToExclude?: string[];
  /** List of materialized views to include in the follower database */
  materializedViewsToInclude?: string[];
  /** List of materialized views to exclude from the follower database */
  materializedViewsToExclude?: string[];
  /** List of functions to include in the follower database */
  functionsToInclude?: string[];
  /** List of functions to exclude from the follower database */
  functionsToExclude?: string[];
}

export function tableLevelSharingPropertiesSerializer(item: TableLevelSharingProperties): any {
  return {
    tablesToInclude: !item["tablesToInclude"]
      ? item["tablesToInclude"]
      : item["tablesToInclude"].map((p: any) => {
          return p;
        }),
    tablesToExclude: !item["tablesToExclude"]
      ? item["tablesToExclude"]
      : item["tablesToExclude"].map((p: any) => {
          return p;
        }),
    externalTablesToInclude: !item["externalTablesToInclude"]
      ? item["externalTablesToInclude"]
      : item["externalTablesToInclude"].map((p: any) => {
          return p;
        }),
    externalTablesToExclude: !item["externalTablesToExclude"]
      ? item["externalTablesToExclude"]
      : item["externalTablesToExclude"].map((p: any) => {
          return p;
        }),
    materializedViewsToInclude: !item["materializedViewsToInclude"]
      ? item["materializedViewsToInclude"]
      : item["materializedViewsToInclude"].map((p: any) => {
          return p;
        }),
    materializedViewsToExclude: !item["materializedViewsToExclude"]
      ? item["materializedViewsToExclude"]
      : item["materializedViewsToExclude"].map((p: any) => {
          return p;
        }),
    functionsToInclude: !item["functionsToInclude"]
      ? item["functionsToInclude"]
      : item["functionsToInclude"].map((p: any) => {
          return p;
        }),
    functionsToExclude: !item["functionsToExclude"]
      ? item["functionsToExclude"]
      : item["functionsToExclude"].map((p: any) => {
          return p;
        }),
  };
}

export function tableLevelSharingPropertiesDeserializer(item: any): TableLevelSharingProperties {
  return {
    tablesToInclude: !item["tablesToInclude"]
      ? item["tablesToInclude"]
      : item["tablesToInclude"].map((p: any) => {
          return p;
        }),
    tablesToExclude: !item["tablesToExclude"]
      ? item["tablesToExclude"]
      : item["tablesToExclude"].map((p: any) => {
          return p;
        }),
    externalTablesToInclude: !item["externalTablesToInclude"]
      ? item["externalTablesToInclude"]
      : item["externalTablesToInclude"].map((p: any) => {
          return p;
        }),
    externalTablesToExclude: !item["externalTablesToExclude"]
      ? item["externalTablesToExclude"]
      : item["externalTablesToExclude"].map((p: any) => {
          return p;
        }),
    materializedViewsToInclude: !item["materializedViewsToInclude"]
      ? item["materializedViewsToInclude"]
      : item["materializedViewsToInclude"].map((p: any) => {
          return p;
        }),
    materializedViewsToExclude: !item["materializedViewsToExclude"]
      ? item["materializedViewsToExclude"]
      : item["materializedViewsToExclude"].map((p: any) => {
          return p;
        }),
    functionsToInclude: !item["functionsToInclude"]
      ? item["functionsToInclude"]
      : item["functionsToInclude"].map((p: any) => {
          return p;
        }),
    functionsToExclude: !item["functionsToExclude"]
      ? item["functionsToExclude"]
      : item["functionsToExclude"].map((p: any) => {
          return p;
        }),
  };
}

/** The origin of the following setup. */
export enum KnownDatabaseShareOrigin {
  /** Direct */
  Direct = "Direct",
  /** DataShare */
  DataShare = "DataShare",
  /** Other */
  Other = "Other",
}

/**
 * The origin of the following setup. \
 * {@link KnownDatabaseShareOrigin} can be used interchangeably with DatabaseShareOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Direct**: Direct \
 * **DataShare**: DataShare \
 * **Other**: Other
 */
export type DatabaseShareOrigin = string;

/** The response of a Database list operation. */
export interface _DatabaseListResult {
  /** The Database items on this page */
  value: DatabaseUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseListResultDeserializer(item: any): _DatabaseListResult {
  return {
    value: databaseUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseUnionArraySerializer(result: Array<DatabaseUnion>): any[] {
  return result.map((item) => {
    return databaseUnionSerializer(item);
  });
}

export function databaseUnionArrayDeserializer(result: Array<DatabaseUnion>): any[] {
  return result.map((item) => {
    return databaseUnionDeserializer(item);
  });
}

/** The list Kusto database principals operation response. */
export interface DatabasePrincipalListResult {
  /** The list of Kusto database principals. */
  value?: DatabasePrincipal[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function databasePrincipalListResultDeserializer(item: any): DatabasePrincipalListResult {
  return {
    value: !item["value"] ? item["value"] : databasePrincipalArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databasePrincipalArraySerializer(result: Array<DatabasePrincipal>): any[] {
  return result.map((item) => {
    return databasePrincipalSerializer(item);
  });
}

export function databasePrincipalArrayDeserializer(result: Array<DatabasePrincipal>): any[] {
  return result.map((item) => {
    return databasePrincipalDeserializer(item);
  });
}

/** A class representing database principal entity. */
export interface DatabasePrincipal {
  /** Database principal role. */
  role: DatabasePrincipalRole;
  /** Database principal name. */
  name: string;
  /** Database principal type. */
  type: DatabasePrincipalType;
  /** Database principal fully qualified name. */
  fqn?: string;
  /** Database principal email if exists. */
  email?: string;
  /** Application id - relevant only for application principal type. */
  appId?: string;
  /** The tenant name of the principal */
  readonly tenantName?: string;
}

export function databasePrincipalSerializer(item: DatabasePrincipal): any {
  return {
    role: item["role"],
    name: item["name"],
    type: item["type"],
    fqn: item["fqn"],
    email: item["email"],
    appId: item["appId"],
  };
}

export function databasePrincipalDeserializer(item: any): DatabasePrincipal {
  return {
    role: item["role"],
    name: item["name"],
    type: item["type"],
    fqn: item["fqn"],
    email: item["email"],
    appId: item["appId"],
    tenantName: item["tenantName"],
  };
}

/** Database principal type. */
export enum KnownDatabasePrincipalType {
  /** App */
  App = "App",
  /** Group */
  Group = "Group",
  /** User */
  User = "User",
}

/**
 * Database principal type. \
 * {@link KnownDatabasePrincipalType} can be used interchangeably with DatabasePrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **App**: App \
 * **Group**: Group \
 * **User**: User
 */
export type DatabasePrincipalType = string;

/** The list Kusto database principals operation request. */
export interface DatabasePrincipalListRequest {
  /** The list of Kusto database principals. */
  value?: DatabasePrincipal[];
}

export function databasePrincipalListRequestSerializer(item: DatabasePrincipalListRequest): any {
  return {
    value: !item["value"] ? item["value"] : databasePrincipalArraySerializer(item["value"]),
  };
}

/** The result returned from a database check name availability request. */
export interface CheckNameRequest {
  /** Resource name. */
  name: string;
  /** The type of resource, for instance Microsoft.Kusto/clusters/databases. */
  type: Type;
}

export function checkNameRequestSerializer(item: CheckNameRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The type of resource, for instance Microsoft.Kusto/clusters/databases. */
export type Type =
  | "Microsoft.Kusto/clusters/databases"
  | "Microsoft.Kusto/clusters/attachedDatabaseConfigurations";

/** Class representing an attached database configuration. */
export interface AttachedDatabaseConfiguration extends ProxyResource {
  /** Resource location. */
  location?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The name of the database which you would like to attach, use * if you want to follow all current and future databases. */
  databaseName?: string;
  /** The resource id of the cluster where the databases you would like to attach reside. */
  clusterResourceId?: string;
  /** The list of databases from the clusterResourceId which are currently attached to the cluster. */
  readonly attachedDatabaseNames?: string[];
  /** The default principals modification kind */
  defaultPrincipalsModificationKind?: DefaultPrincipalsModificationKind;
  /** Table level sharing specifications */
  tableLevelSharingProperties?: TableLevelSharingProperties;
  /** Overrides the original database name. Relevant only when attaching to a specific database. */
  databaseNameOverride?: string;
  /** Adds a prefix to the attached databases name. When following an entire cluster, that prefix would be added to all of the databases original names from leader cluster. */
  databaseNamePrefix?: string;
}

export function attachedDatabaseConfigurationSerializer(item: AttachedDatabaseConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, [
      "databaseName",
      "clusterResourceId",
      "defaultPrincipalsModificationKind",
      "tableLevelSharingProperties",
      "databaseNameOverride",
      "databaseNamePrefix",
    ])
      ? undefined
      : _attachedDatabaseConfigurationPropertiesSerializer(item),
    location: item["location"],
  };
}

export function attachedDatabaseConfigurationDeserializer(
  item: any,
): AttachedDatabaseConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _attachedDatabaseConfigurationPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Class representing the an attached database configuration properties of kind specific. */
export interface AttachedDatabaseConfigurationProperties {
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The name of the database which you would like to attach, use * if you want to follow all current and future databases. */
  databaseName: string;
  /** The resource id of the cluster where the databases you would like to attach reside. */
  clusterResourceId: string;
  /** The list of databases from the clusterResourceId which are currently attached to the cluster. */
  readonly attachedDatabaseNames?: string[];
  /** The default principals modification kind */
  defaultPrincipalsModificationKind: DefaultPrincipalsModificationKind;
  /** Table level sharing specifications */
  tableLevelSharingProperties?: TableLevelSharingProperties;
  /** Overrides the original database name. Relevant only when attaching to a specific database. */
  databaseNameOverride?: string;
  /** Adds a prefix to the attached databases name. When following an entire cluster, that prefix would be added to all of the databases original names from leader cluster. */
  databaseNamePrefix?: string;
}

export function attachedDatabaseConfigurationPropertiesSerializer(
  item: AttachedDatabaseConfigurationProperties,
): any {
  return {
    databaseName: item["databaseName"],
    clusterResourceId: item["clusterResourceId"],
    defaultPrincipalsModificationKind: item["defaultPrincipalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesSerializer(item["tableLevelSharingProperties"]),
    databaseNameOverride: item["databaseNameOverride"],
    databaseNamePrefix: item["databaseNamePrefix"],
  };
}

export function attachedDatabaseConfigurationPropertiesDeserializer(
  item: any,
): AttachedDatabaseConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    databaseName: item["databaseName"],
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseNames: !item["attachedDatabaseNames"]
      ? item["attachedDatabaseNames"]
      : item["attachedDatabaseNames"].map((p: any) => {
          return p;
        }),
    defaultPrincipalsModificationKind: item["defaultPrincipalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    databaseNameOverride: item["databaseNameOverride"],
    databaseNamePrefix: item["databaseNamePrefix"],
  };
}

/** The default principals modification kind */
export enum KnownDefaultPrincipalsModificationKind {
  /** Union */
  Union = "Union",
  /** Replace */
  Replace = "Replace",
  /** None */
  None = "None",
}

/**
 * The default principals modification kind \
 * {@link KnownDefaultPrincipalsModificationKind} can be used interchangeably with DefaultPrincipalsModificationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Union**: Union \
 * **Replace**: Replace \
 * **None**: None
 */
export type DefaultPrincipalsModificationKind = string;

/** The list attached database configurations operation response. */
export interface _AttachedDatabaseConfigurationListResult {
  /** The list of attached database configurations. */
  value?: AttachedDatabaseConfiguration[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _attachedDatabaseConfigurationListResultDeserializer(
  item: any,
): _AttachedDatabaseConfigurationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : attachedDatabaseConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function attachedDatabaseConfigurationArraySerializer(
  result: Array<AttachedDatabaseConfiguration>,
): any[] {
  return result.map((item) => {
    return attachedDatabaseConfigurationSerializer(item);
  });
}

export function attachedDatabaseConfigurationArrayDeserializer(
  result: Array<AttachedDatabaseConfiguration>,
): any[] {
  return result.map((item) => {
    return attachedDatabaseConfigurationDeserializer(item);
  });
}

/** The result returned from a AttachedDatabaseConfigurations check name availability request. */
export interface AttachedDatabaseConfigurationsCheckNameRequest {
  /** Attached database resource name. */
  name: string;
  /** The type of resource, for instance Microsoft.Kusto/clusters/attachedDatabaseConfigurations. */
  type: "Microsoft.Kusto/clusters/attachedDatabaseConfigurations";
}

export function attachedDatabaseConfigurationsCheckNameRequestSerializer(
  item: AttachedDatabaseConfigurationsCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a managed private endpoint. */
export interface ManagedPrivateEndpoint extends ProxyResource {
  /** The ARM resource ID of the resource for which the managed private endpoint is created. */
  privateLinkResourceId?: string;
  /** The region of the resource to which the managed private endpoint is created. */
  privateLinkResourceRegion?: string;
  /** The groupId in which the managed private endpoint is created. */
  groupId?: string;
  /** The user request message. */
  requestMessage?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function managedPrivateEndpointSerializer(item: ManagedPrivateEndpoint): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateLinkResourceId",
      "privateLinkResourceRegion",
      "groupId",
      "requestMessage",
    ])
      ? undefined
      : _managedPrivateEndpointPropertiesSerializer(item),
  };
}

export function managedPrivateEndpointDeserializer(item: any): ManagedPrivateEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managedPrivateEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** A class representing the properties of a managed private endpoint object. */
export interface ManagedPrivateEndpointProperties {
  /** The ARM resource ID of the resource for which the managed private endpoint is created. */
  privateLinkResourceId: string;
  /** The region of the resource to which the managed private endpoint is created. */
  privateLinkResourceRegion?: string;
  /** The groupId in which the managed private endpoint is created. */
  groupId: string;
  /** The user request message. */
  requestMessage?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function managedPrivateEndpointPropertiesSerializer(
  item: ManagedPrivateEndpointProperties,
): any {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
  };
}

export function managedPrivateEndpointPropertiesDeserializer(
  item: any,
): ManagedPrivateEndpointProperties {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    provisioningState: item["provisioningState"],
  };
}

/** The list managed private endpoints operation response. */
export interface _ManagedPrivateEndpointListResult {
  /** The list of managed private endpoints. */
  value?: ManagedPrivateEndpoint[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _managedPrivateEndpointListResultDeserializer(
  item: any,
): _ManagedPrivateEndpointListResult {
  return {
    value: !item["value"] ? item["value"] : managedPrivateEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedPrivateEndpointArraySerializer(
  result: Array<ManagedPrivateEndpoint>,
): any[] {
  return result.map((item) => {
    return managedPrivateEndpointSerializer(item);
  });
}

export function managedPrivateEndpointArrayDeserializer(
  result: Array<ManagedPrivateEndpoint>,
): any[] {
  return result.map((item) => {
    return managedPrivateEndpointDeserializer(item);
  });
}

/** The result returned from a managedPrivateEndpoints check name availability request. */
export interface ManagedPrivateEndpointsCheckNameRequest {
  /** Managed private endpoint resource name. */
  name: string;
  /** The type of resource, for instance Microsoft.Kusto/clusters/managedPrivateEndpoints. */
  type: "Microsoft.Kusto/clusters/managedPrivateEndpoints";
}

export function managedPrivateEndpointsCheckNameRequestSerializer(
  item: ManagedPrivateEndpointsCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a Kusto sandbox custom image. */
export interface SandboxCustomImage extends ProxyResource {
  /** The language name, for example Python. */
  language?: Language;
  /** The version of the language. Either this property or baseImageName should be specified. */
  languageVersion?: string;
  /** The base image name on which the custom image is built on top of. It can be one of the LanguageExtensionImageName (e.g.: 'Python3_10_8', 'Python3_10_8_DL') or the name of an existing custom image. Either this property or languageVersion should be specified. */
  baseImageName?: string;
  /** The requirements file content. */
  requirementsFileContent?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function sandboxCustomImageSerializer(item: SandboxCustomImage): any {
  return {
    properties: areAllPropsUndefined(item, [
      "language",
      "languageVersion",
      "baseImageName",
      "requirementsFileContent",
    ])
      ? undefined
      : _sandboxCustomImagePropertiesSerializer(item),
  };
}

export function sandboxCustomImageDeserializer(item: any): SandboxCustomImage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sandboxCustomImagePropertiesDeserializer(item["properties"])),
  };
}

/** A class representing the properties of a sandbox custom image object. */
export interface SandboxCustomImageProperties {
  /** The language name, for example Python. */
  language: Language;
  /** The version of the language. Either this property or baseImageName should be specified. */
  languageVersion?: string;
  /** The base image name on which the custom image is built on top of. It can be one of the LanguageExtensionImageName (e.g.: 'Python3_10_8', 'Python3_10_8_DL') or the name of an existing custom image. Either this property or languageVersion should be specified. */
  baseImageName?: string;
  /** The requirements file content. */
  requirementsFileContent?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function sandboxCustomImagePropertiesSerializer(item: SandboxCustomImageProperties): any {
  return {
    language: item["language"],
    languageVersion: item["languageVersion"],
    baseImageName: item["baseImageName"],
    requirementsFileContent: item["requirementsFileContent"],
  };
}

export function sandboxCustomImagePropertiesDeserializer(item: any): SandboxCustomImageProperties {
  return {
    language: item["language"],
    languageVersion: item["languageVersion"],
    baseImageName: item["baseImageName"],
    requirementsFileContent: item["requirementsFileContent"],
    provisioningState: item["provisioningState"],
  };
}

/** The language name, for example Python. */
export enum KnownLanguage {
  /** Python */
  Python = "Python",
}

/**
 * The language name, for example Python. \
 * {@link KnownLanguage} can be used interchangeably with Language,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Python**: Python
 */
export type Language = string;

/** The list Kusto sandbox custom images operation response. */
export interface _SandboxCustomImagesListResult {
  /** The SandboxCustomImage items on this page */
  value: SandboxCustomImage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sandboxCustomImagesListResultDeserializer(
  item: any,
): _SandboxCustomImagesListResult {
  return {
    value: sandboxCustomImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sandboxCustomImageArraySerializer(result: Array<SandboxCustomImage>): any[] {
  return result.map((item) => {
    return sandboxCustomImageSerializer(item);
  });
}

export function sandboxCustomImageArrayDeserializer(result: Array<SandboxCustomImage>): any[] {
  return result.map((item) => {
    return sandboxCustomImageDeserializer(item);
  });
}

/** The result returned from a sandboxCustomImage check name availability request. */
export interface SandboxCustomImagesCheckNameRequest {
  /** Sandbox custom image resource name. */
  name: string;
  /** The type of resource, for instance Microsoft.Kusto/clusters/sandboxCustomImages. */
  type: "Microsoft.Kusto/clusters/sandboxCustomImages";
}

export function sandboxCustomImagesCheckNameRequestSerializer(
  item: SandboxCustomImagesCheckNameRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Class representing a Kusto cluster. */
export interface Cluster extends TrackedResource {
  /** The SKU of the cluster. */
  sku: AzureSku;
  /** The availability zones. */
  zones?: string[];
  /** The identity of the cluster, if configured. */
  identity?: Identity;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The state of the resource. */
  readonly state?: State;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The cluster URI. */
  readonly uri?: string;
  /** The cluster data ingestion URI. */
  readonly dataIngestionUri?: string;
  /** The reason for the cluster's current state. */
  readonly stateReason?: string;
  /** The cluster's external tenants. */
  trustedExternalTenants?: TrustedExternalTenant[];
  /** Optimized auto scale definition. */
  optimizedAutoscale?: OptimizedAutoscale;
  /** A boolean value that indicates if the cluster's disks are encrypted. */
  enableDiskEncryption?: boolean;
  /** A boolean value that indicates if the streaming ingest is enabled. */
  enableStreamingIngest?: boolean;
  /** Virtual network definition. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** KeyVault properties for the cluster encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** A boolean value that indicates if the purge operations are enabled. */
  enablePurge?: boolean;
  /** List of the cluster's language extensions. */
  languageExtensions?: _LanguageExtensionsList;
  /** A boolean value that indicates if double encryption is enabled. */
  enableDoubleEncryption?: boolean;
  /** Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of ips in the format of CIDR allowed to connect to the cluster. */
  allowedIpRangeList?: string[];
  /** The engine type */
  engineType?: EngineType;
  /** The cluster's accepted audiences. */
  acceptedAudiences?: AcceptedAudiences[];
  /** A boolean value that indicates if the cluster could be automatically stopped (due to lack of data or no activity for many days). */
  enableAutoStop?: boolean;
  /** Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ClusterNetworkAccessFlag;
  /** List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster. */
  allowedFqdnList?: string[];
  /** List of callout policies for egress from Cluster. */
  calloutPolicies?: CalloutPolicy[];
  /** Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) */
  publicIPType?: PublicIPType;
  /** Virtual Cluster graduation properties */
  virtualClusterGraduationProperties?: string;
  /** A list of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Properties of the peer cluster involved in a migration to/from this cluster. */
  readonly migrationCluster?: MigrationClusterProperties;
  /** Indicates whether the cluster is zonal or non-zonal. */
  readonly zoneStatus?: ZoneStatus;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "trustedExternalTenants",
      "optimizedAutoscale",
      "enableDiskEncryption",
      "enableStreamingIngest",
      "virtualNetworkConfiguration",
      "keyVaultProperties",
      "enablePurge",
      "languageExtensions",
      "enableDoubleEncryption",
      "publicNetworkAccess",
      "allowedIpRangeList",
      "engineType",
      "acceptedAudiences",
      "enableAutoStop",
      "restrictOutboundNetworkAccess",
      "allowedFqdnList",
      "calloutPolicies",
      "publicIPType",
      "virtualClusterGraduationProperties",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    sku: azureSkuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function clusterDeserializer(item: any): Cluster {
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
    ...(!item["properties"]
      ? item["properties"]
      : _clusterPropertiesDeserializer(item["properties"])),
    sku: azureSkuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** Class representing the Kusto cluster properties. */
export interface ClusterProperties {
  /** The state of the resource. */
  readonly state?: State;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The cluster URI. */
  readonly uri?: string;
  /** The cluster data ingestion URI. */
  readonly dataIngestionUri?: string;
  /** The reason for the cluster's current state. */
  readonly stateReason?: string;
  /** The cluster's external tenants. */
  trustedExternalTenants?: TrustedExternalTenant[];
  /** Optimized auto scale definition. */
  optimizedAutoscale?: OptimizedAutoscale;
  /** A boolean value that indicates if the cluster's disks are encrypted. */
  enableDiskEncryption?: boolean;
  /** A boolean value that indicates if the streaming ingest is enabled. */
  enableStreamingIngest?: boolean;
  /** Virtual network definition. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** KeyVault properties for the cluster encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** A boolean value that indicates if the purge operations are enabled. */
  enablePurge?: boolean;
  /** List of the cluster's language extensions. */
  languageExtensions?: _LanguageExtensionsList;
  /** A boolean value that indicates if double encryption is enabled. */
  enableDoubleEncryption?: boolean;
  /** Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of ips in the format of CIDR allowed to connect to the cluster. */
  allowedIpRangeList?: string[];
  /** The engine type */
  engineType?: EngineType;
  /** The cluster's accepted audiences. */
  acceptedAudiences?: AcceptedAudiences[];
  /** A boolean value that indicates if the cluster could be automatically stopped (due to lack of data or no activity for many days). */
  enableAutoStop?: boolean;
  /** Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ClusterNetworkAccessFlag;
  /** List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster. */
  allowedFqdnList?: string[];
  /** List of callout policies for egress from Cluster. */
  calloutPolicies?: CalloutPolicy[];
  /** Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) */
  publicIPType?: PublicIPType;
  /** Virtual Cluster graduation properties */
  virtualClusterGraduationProperties?: string;
  /** A list of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Properties of the peer cluster involved in a migration to/from this cluster. */
  readonly migrationCluster?: MigrationClusterProperties;
  /** Indicates whether the cluster is zonal or non-zonal. */
  readonly zoneStatus?: ZoneStatus;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArraySerializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleSerializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListSerializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArraySerializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArraySerializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
    uri: item["uri"],
    dataIngestionUri: item["dataIngestionUri"],
    stateReason: item["stateReason"],
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArrayDeserializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleDeserializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListDeserializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArrayDeserializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArrayDeserializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    migrationCluster: !item["migrationCluster"]
      ? item["migrationCluster"]
      : migrationClusterPropertiesDeserializer(item["migrationCluster"]),
    zoneStatus: item["zoneStatus"],
  };
}

/** The state of the resource. */
export enum KnownState {
  /** Creating */
  Creating = "Creating",
  /** Unavailable */
  Unavailable = "Unavailable",
  /** Running */
  Running = "Running",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Starting */
  Starting = "Starting",
  /** Updating */
  Updating = "Updating",
  /** Migrated */
  Migrated = "Migrated",
}

/**
 * The state of the resource. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Unavailable**: Unavailable \
 * **Running**: Running \
 * **Deleting**: Deleting \
 * **Deleted**: Deleted \
 * **Stopping**: Stopping \
 * **Stopped**: Stopped \
 * **Starting**: Starting \
 * **Updating**: Updating \
 * **Migrated**: Migrated
 */
export type State = string;

export function trustedExternalTenantArraySerializer(result: Array<TrustedExternalTenant>): any[] {
  return result.map((item) => {
    return trustedExternalTenantSerializer(item);
  });
}

export function trustedExternalTenantArrayDeserializer(
  result: Array<TrustedExternalTenant>,
): any[] {
  return result.map((item) => {
    return trustedExternalTenantDeserializer(item);
  });
}

/** Represents a tenant ID that is trusted by the cluster. */
export interface TrustedExternalTenant {
  /** GUID representing an external tenant. */
  value?: string;
}

export function trustedExternalTenantSerializer(item: TrustedExternalTenant): any {
  return { value: item["value"] };
}

export function trustedExternalTenantDeserializer(item: any): TrustedExternalTenant {
  return {
    value: item["value"],
  };
}

/** A class that contains the optimized auto scale definition. */
export interface OptimizedAutoscale {
  /** The version of the template defined, for instance 1. */
  version: number;
  /** A boolean value that indicate if the optimized autoscale feature is enabled or not. */
  isEnabled: boolean;
  /** Minimum allowed instances count. */
  minimum: number;
  /** Maximum allowed instances count. */
  maximum: number;
}

export function optimizedAutoscaleSerializer(item: OptimizedAutoscale): any {
  return {
    version: item["version"],
    isEnabled: item["isEnabled"],
    minimum: item["minimum"],
    maximum: item["maximum"],
  };
}

export function optimizedAutoscaleDeserializer(item: any): OptimizedAutoscale {
  return {
    version: item["version"],
    isEnabled: item["isEnabled"],
    minimum: item["minimum"],
    maximum: item["maximum"],
  };
}

/** A class that contains virtual network definition. */
export interface VirtualNetworkConfiguration {
  /** The subnet resource id. */
  subnetId: string;
  /** Engine service's public IP address resource id. */
  enginePublicIpId: string;
  /** Data management's service public IP address resource id. */
  dataManagementPublicIpId: string;
  /** When enabled, the cluster is deployed into the configured subnet, when disabled it will be removed from the subnet. */
  state?: VnetState;
}

export function virtualNetworkConfigurationSerializer(item: VirtualNetworkConfiguration): any {
  return {
    subnetId: item["subnetId"],
    enginePublicIpId: item["enginePublicIpId"],
    dataManagementPublicIpId: item["dataManagementPublicIpId"],
    state: item["state"],
  };
}

export function virtualNetworkConfigurationDeserializer(item: any): VirtualNetworkConfiguration {
  return {
    subnetId: item["subnetId"],
    enginePublicIpId: item["enginePublicIpId"],
    dataManagementPublicIpId: item["dataManagementPublicIpId"],
    state: item["state"],
  };
}

/** When enabled, the cluster is deployed into the configured subnet, when disabled it will be removed from the subnet. */
export enum KnownVnetState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * When enabled, the cluster is deployed into the configured subnet, when disabled it will be removed from the subnet. \
 * {@link KnownVnetState} can be used interchangeably with VnetState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type VnetState = string;

/** The list of language extension objects. */
export interface _LanguageExtensionsList {
  /** The list of language extensions. */
  value?: LanguageExtension[];
  /** The link to the next page of resources. */
  nextLink?: string;
}

export function _languageExtensionsListSerializer(item: _LanguageExtensionsList): any {
  return {
    value: !item["value"] ? item["value"] : languageExtensionArraySerializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function _languageExtensionsListDeserializer(item: any): _LanguageExtensionsList {
  return {
    value: !item["value"] ? item["value"] : languageExtensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function languageExtensionArraySerializer(result: Array<LanguageExtension>): any[] {
  return result.map((item) => {
    return languageExtensionSerializer(item);
  });
}

export function languageExtensionArrayDeserializer(result: Array<LanguageExtension>): any[] {
  return result.map((item) => {
    return languageExtensionDeserializer(item);
  });
}

/** The language extension object. */
export interface LanguageExtension {
  /** The language extension name. */
  languageExtensionName?: LanguageExtensionName;
  /** The language extension image name. */
  languageExtensionImageName?: LanguageExtensionImageName;
  /** The sandbox custom image name that should be enabled as the active language extension. Sandbox custom image is a cluster sub resource. When this property is set, LanguageExtensionImageName should be set to 'PythonCustomImage'. */
  languageExtensionCustomImageName?: string;
}

export function languageExtensionSerializer(item: LanguageExtension): any {
  return {
    languageExtensionName: item["languageExtensionName"],
    languageExtensionImageName: item["languageExtensionImageName"],
    languageExtensionCustomImageName: item["languageExtensionCustomImageName"],
  };
}

export function languageExtensionDeserializer(item: any): LanguageExtension {
  return {
    languageExtensionName: item["languageExtensionName"],
    languageExtensionImageName: item["languageExtensionImageName"],
    languageExtensionCustomImageName: item["languageExtensionCustomImageName"],
  };
}

/** Language extension that can run within KQL query. */
export enum KnownLanguageExtensionName {
  /** PYTHON */
  Python = "PYTHON",
  /** R */
  R = "R",
}

/**
 * Language extension that can run within KQL query. \
 * {@link KnownLanguageExtensionName} can be used interchangeably with LanguageExtensionName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PYTHON**: PYTHON \
 * **R**: R
 */
export type LanguageExtensionName = string;

/** Language extension image name. */
export enum KnownLanguageExtensionImageName {
  /** R */
  R = "R",
  /** Python3_6_5 */
  Python365 = "Python3_6_5",
  /** Python3_10_8 */
  Python3108 = "Python3_10_8",
  /** Python3_10_8_DL */
  Python3108DL = "Python3_10_8_DL",
  /** PythonCustomImage */
  PythonCustomImage = "PythonCustomImage",
  /** Python3_11_7 */
  Python3117 = "Python3_11_7",
  /** Python3_11_7_DL */
  Python3117DL = "Python3_11_7_DL",
}

/**
 * Language extension image name. \
 * {@link KnownLanguageExtensionImageName} can be used interchangeably with LanguageExtensionImageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **R**: R \
 * **Python3_6_5**: Python3_6_5 \
 * **Python3_10_8**: Python3_10_8 \
 * **Python3_10_8_DL**: Python3_10_8_DL \
 * **PythonCustomImage**: PythonCustomImage \
 * **Python3_11_7**: Python3_11_7 \
 * **Python3_11_7_DL**: Python3_11_7_DL
 */
export type LanguageExtensionImageName = string;

/** Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type PublicNetworkAccess = string;

/** The engine type */
export enum KnownEngineType {
  /** V2 */
  V2 = "V2",
  /** V3 */
  V3 = "V3",
}

/**
 * The engine type \
 * {@link KnownEngineType} can be used interchangeably with EngineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V2**: V2 \
 * **V3**: V3
 */
export type EngineType = string;

export function acceptedAudiencesArraySerializer(result: Array<AcceptedAudiences>): any[] {
  return result.map((item) => {
    return acceptedAudiencesSerializer(item);
  });
}

export function acceptedAudiencesArrayDeserializer(result: Array<AcceptedAudiences>): any[] {
  return result.map((item) => {
    return acceptedAudiencesDeserializer(item);
  });
}

/** Represents an accepted audience trusted by the cluster. */
export interface AcceptedAudiences {
  /** GUID or valid URL representing an accepted audience. */
  value?: string;
}

export function acceptedAudiencesSerializer(item: AcceptedAudiences): any {
  return { value: item["value"] };
}

export function acceptedAudiencesDeserializer(item: any): AcceptedAudiences {
  return {
    value: item["value"],
  };
}

/** Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
export enum KnownClusterNetworkAccessFlag {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' \
 * {@link KnownClusterNetworkAccessFlag} can be used interchangeably with ClusterNetworkAccessFlag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ClusterNetworkAccessFlag = string;

export function calloutPolicyArraySerializer(result: Array<CalloutPolicy>): any[] {
  return result.map((item) => {
    return calloutPolicySerializer(item);
  });
}

export function calloutPolicyArrayDeserializer(result: Array<CalloutPolicy>): any[] {
  return result.map((item) => {
    return calloutPolicyDeserializer(item);
  });
}

/** Configuration for external callout policies, including URI patterns, access types, and service types. */
export interface CalloutPolicy {
  /** Regular expression or FQDN pattern for the callout URI. */
  calloutUriRegex?: string;
  /** Type of the callout service, specifying the kind of external resource or service being accessed. */
  calloutType?: CalloutType;
  /** Indicates whether outbound access is permitted for the specified URI pattern. */
  outboundAccess?: OutboundAccess;
  /** Unique identifier for the callout configuration. */
  readonly calloutId?: string;
}

export function calloutPolicySerializer(item: CalloutPolicy): any {
  return {
    calloutUriRegex: item["calloutUriRegex"],
    calloutType: item["calloutType"],
    outboundAccess: item["outboundAccess"],
  };
}

export function calloutPolicyDeserializer(item: any): CalloutPolicy {
  return {
    calloutUriRegex: item["calloutUriRegex"],
    calloutType: item["calloutType"],
    outboundAccess: item["outboundAccess"],
    calloutId: item["calloutId"],
  };
}

/** Type of the callout service, specifying the kind of external resource or service being accessed. */
export enum KnownCalloutType {
  /** kusto */
  Kusto = "kusto",
  /** sql */
  Sql = "sql",
  /** cosmosdb */
  Cosmosdb = "cosmosdb",
  /** external_data */
  ExternalData = "external_data",
  /** azure_digital_twins */
  AzureDigitalTwins = "azure_digital_twins",
  /** sandbox_artifacts */
  SandboxArtifacts = "sandbox_artifacts",
  /** webapi */
  Webapi = "webapi",
  /** mysql */
  Mysql = "mysql",
  /** postgresql */
  Postgresql = "postgresql",
  /** genevametrics */
  Genevametrics = "genevametrics",
  /** azure_openai */
  AzureOpenai = "azure_openai",
}

/**
 * Type of the callout service, specifying the kind of external resource or service being accessed. \
 * {@link KnownCalloutType} can be used interchangeably with CalloutType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **kusto**: kusto \
 * **sql**: sql \
 * **cosmosdb**: cosmosdb \
 * **external_data**: external_data \
 * **azure_digital_twins**: azure_digital_twins \
 * **sandbox_artifacts**: sandbox_artifacts \
 * **webapi**: webapi \
 * **mysql**: mysql \
 * **postgresql**: postgresql \
 * **genevametrics**: genevametrics \
 * **azure_openai**: azure_openai
 */
export type CalloutType = string;

/** Indicates whether outbound access is permitted for the specified URI pattern. */
export enum KnownOutboundAccess {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Indicates whether outbound access is permitted for the specified URI pattern. \
 * {@link KnownOutboundAccess} can be used interchangeably with OutboundAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow \
 * **Deny**: Deny
 */
export type OutboundAccess = string;

/** Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) */
export enum KnownPublicIPType {
  /** IPv4 */
  IPv4 = "IPv4",
  /** DualStack */
  DualStack = "DualStack",
}

/**
 * Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) \
 * {@link KnownPublicIPType} can be used interchangeably with PublicIPType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 \
 * **DualStack**: DualStack
 */
export type PublicIPType = string;

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  readonly privateEndpoint?: PrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** Group id of the private endpoint. */
  readonly groupId?: string;
  /** Provisioning state of the private endpoint. */
  readonly provisioningState?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  readonly privateEndpoint?: PrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateProperty;
  /** Group id of the private endpoint. */
  readonly groupId?: string;
  /** Provisioning state of the private endpoint. */
  readonly provisioningState?: string;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateLinkServiceConnectionState: privateLinkServiceConnectionStatePropertySerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStatePropertyDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

/** Private endpoint which the connection belongs to. */
export interface PrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  readonly id?: string;
}

export function privateEndpointPropertyDeserializer(item: any): PrivateEndpointProperty {
  return {
    id: item["id"],
  };
}

/** Connection State of the Private Endpoint Connection. */
export interface PrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status?: string;
  /** The private link service connection description. */
  description?: string;
  /** Any action that is required beyond basic workflow (approve/ reject/ disconnect) */
  readonly actionsRequired?: string;
}

export function privateLinkServiceConnectionStatePropertySerializer(
  item: PrivateLinkServiceConnectionStateProperty,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStatePropertyDeserializer(
  item: any,
): PrivateLinkServiceConnectionStateProperty {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Represents a properties of a cluster that is part of a migration. */
export interface MigrationClusterProperties {
  /** The resource ID of the cluster. */
  readonly id?: string;
  /** The public URL of the cluster. */
  readonly uri?: string;
  /** The public data ingestion URL of the cluster. */
  readonly dataIngestionUri?: string;
  /** The role of the cluster in the migration process. */
  readonly role?: MigrationClusterRole;
}

export function migrationClusterPropertiesDeserializer(item: any): MigrationClusterProperties {
  return {
    id: item["id"],
    uri: item["uri"],
    dataIngestionUri: item["dataIngestionUri"],
    role: item["role"],
  };
}

/** The role of the cluster in the migration process. */
export enum KnownMigrationClusterRole {
  /** Source */
  Source = "Source",
  /** Destination */
  Destination = "Destination",
}

/**
 * The role of the cluster in the migration process. \
 * {@link KnownMigrationClusterRole} can be used interchangeably with MigrationClusterRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Source**: Source \
 * **Destination**: Destination
 */
export type MigrationClusterRole = string;

/** Indicates whether the cluster is zonal or non-zonal. */
export enum KnownZoneStatus {
  /** NonZonal */
  NonZonal = "NonZonal",
  /** ZonalInconsistency */
  ZonalInconsistency = "ZonalInconsistency",
  /** Zonal */
  Zonal = "Zonal",
}

/**
 * Indicates whether the cluster is zonal or non-zonal. \
 * {@link KnownZoneStatus} can be used interchangeably with ZoneStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonZonal**: NonZonal \
 * **ZonalInconsistency**: ZonalInconsistency \
 * **Zonal**: Zonal
 */
export type ZoneStatus = string;

/** Azure SKU definition. */
export interface AzureSku {
  /** SKU name. */
  name: AzureSkuName;
  /** The number of instances of the cluster. */
  capacity?: number;
  /** SKU tier. */
  tier: AzureSkuTier;
}

export function azureSkuSerializer(item: AzureSku): any {
  return { name: item["name"], capacity: item["capacity"], tier: item["tier"] };
}

export function azureSkuDeserializer(item: any): AzureSku {
  return {
    name: item["name"],
    capacity: item["capacity"],
    tier: item["tier"],
  };
}

/** SKU name. */
export enum KnownAzureSkuName {
  /** Dev(No SLA)_Standard_D11_v2 */
  DevNoSLAStandardD11V2 = "Dev(No SLA)_Standard_D11_v2",
  /** Dev(No SLA)_Standard_E2a_v4 */
  DevNoSLAStandardE2AV4 = "Dev(No SLA)_Standard_E2a_v4",
  /** Standard_D11_v2 */
  StandardD11V2 = "Standard_D11_v2",
  /** Standard_D12_v2 */
  StandardD12V2 = "Standard_D12_v2",
  /** Standard_D13_v2 */
  StandardD13V2 = "Standard_D13_v2",
  /** Standard_D14_v2 */
  StandardD14V2 = "Standard_D14_v2",
  /** Standard_D32d_v4 */
  StandardD32DV4 = "Standard_D32d_v4",
  /** Standard_D16d_v5 */
  StandardD16DV5 = "Standard_D16d_v5",
  /** Standard_D32d_v5 */
  StandardD32DV5 = "Standard_D32d_v5",
  /** Standard_DS13_v2+1TB_PS */
  StandardDS13V21TBPS = "Standard_DS13_v2+1TB_PS",
  /** Standard_DS13_v2+2TB_PS */
  StandardDS13V22TBPS = "Standard_DS13_v2+2TB_PS",
  /** Standard_DS14_v2+3TB_PS */
  StandardDS14V23TBPS = "Standard_DS14_v2+3TB_PS",
  /** Standard_DS14_v2+4TB_PS */
  StandardDS14V24TBPS = "Standard_DS14_v2+4TB_PS",
  /** Standard_L4s */
  StandardL4S = "Standard_L4s",
  /** Standard_L8s */
  StandardL8S = "Standard_L8s",
  /** Standard_L16s */
  StandardL16S = "Standard_L16s",
  /** Standard_L8s_v2 */
  StandardL8SV2 = "Standard_L8s_v2",
  /** Standard_L16s_v2 */
  StandardL16SV2 = "Standard_L16s_v2",
  /** Standard_L8s_v3 */
  StandardL8SV3 = "Standard_L8s_v3",
  /** Standard_L16s_v3 */
  StandardL16SV3 = "Standard_L16s_v3",
  /** Standard_L32s_v3 */
  StandardL32SV3 = "Standard_L32s_v3",
  /** Standard_L8as_v3 */
  StandardL8AsV3 = "Standard_L8as_v3",
  /** Standard_L16as_v3 */
  StandardL16AsV3 = "Standard_L16as_v3",
  /** Standard_L32as_v3 */
  StandardL32AsV3 = "Standard_L32as_v3",
  /** Standard_E64i_v3 */
  StandardE64IV3 = "Standard_E64i_v3",
  /** Standard_E80ids_v4 */
  StandardE80IdsV4 = "Standard_E80ids_v4",
  /** Standard_E2a_v4 */
  StandardE2AV4 = "Standard_E2a_v4",
  /** Standard_E4a_v4 */
  StandardE4AV4 = "Standard_E4a_v4",
  /** Standard_E8a_v4 */
  StandardE8AV4 = "Standard_E8a_v4",
  /** Standard_E16a_v4 */
  StandardE16AV4 = "Standard_E16a_v4",
  /** Standard_E8as_v4+1TB_PS */
  StandardE8AsV41TBPS = "Standard_E8as_v4+1TB_PS",
  /** Standard_E8as_v4+2TB_PS */
  StandardE8AsV42TBPS = "Standard_E8as_v4+2TB_PS",
  /** Standard_E16as_v4+3TB_PS */
  StandardE16AsV43TBPS = "Standard_E16as_v4+3TB_PS",
  /** Standard_E16as_v4+4TB_PS */
  StandardE16AsV44TBPS = "Standard_E16as_v4+4TB_PS",
  /** Standard_E8as_v5+1TB_PS */
  StandardE8AsV51TBPS = "Standard_E8as_v5+1TB_PS",
  /** Standard_E8as_v5+2TB_PS */
  StandardE8AsV52TBPS = "Standard_E8as_v5+2TB_PS",
  /** Standard_E16as_v5+3TB_PS */
  StandardE16AsV53TBPS = "Standard_E16as_v5+3TB_PS",
  /** Standard_E16as_v5+4TB_PS */
  StandardE16AsV54TBPS = "Standard_E16as_v5+4TB_PS",
  /** Standard_E2ads_v5 */
  StandardE2AdsV5 = "Standard_E2ads_v5",
  /** Standard_E4ads_v5 */
  StandardE4AdsV5 = "Standard_E4ads_v5",
  /** Standard_E8ads_v5 */
  StandardE8AdsV5 = "Standard_E8ads_v5",
  /** Standard_E16ads_v5 */
  StandardE16AdsV5 = "Standard_E16ads_v5",
  /** Standard_EC8as_v5+1TB_PS */
  StandardEC8AsV51TBPS = "Standard_EC8as_v5+1TB_PS",
  /** Standard_EC8as_v5+2TB_PS */
  StandardEC8AsV52TBPS = "Standard_EC8as_v5+2TB_PS",
  /** Standard_EC16as_v5+3TB_PS */
  StandardEC16AsV53TBPS = "Standard_EC16as_v5+3TB_PS",
  /** Standard_EC16as_v5+4TB_PS */
  StandardEC16AsV54TBPS = "Standard_EC16as_v5+4TB_PS",
  /** Standard_EC8ads_v5 */
  StandardEC8AdsV5 = "Standard_EC8ads_v5",
  /** Standard_EC16ads_v5 */
  StandardEC16AdsV5 = "Standard_EC16ads_v5",
  /** Standard_E8s_v4+1TB_PS */
  StandardE8SV41TBPS = "Standard_E8s_v4+1TB_PS",
  /** Standard_E8s_v4+2TB_PS */
  StandardE8SV42TBPS = "Standard_E8s_v4+2TB_PS",
  /** Standard_E16s_v4+3TB_PS */
  StandardE16SV43TBPS = "Standard_E16s_v4+3TB_PS",
  /** Standard_E16s_v4+4TB_PS */
  StandardE16SV44TBPS = "Standard_E16s_v4+4TB_PS",
  /** Standard_E8s_v5+1TB_PS */
  StandardE8SV51TBPS = "Standard_E8s_v5+1TB_PS",
  /** Standard_E8s_v5+2TB_PS */
  StandardE8SV52TBPS = "Standard_E8s_v5+2TB_PS",
  /** Standard_E16s_v5+3TB_PS */
  StandardE16SV53TBPS = "Standard_E16s_v5+3TB_PS",
  /** Standard_E16s_v5+4TB_PS */
  StandardE16SV54TBPS = "Standard_E16s_v5+4TB_PS",
  /** Standard_E2d_v4 */
  StandardE2DV4 = "Standard_E2d_v4",
  /** Standard_E4d_v4 */
  StandardE4DV4 = "Standard_E4d_v4",
  /** Standard_E8d_v4 */
  StandardE8DV4 = "Standard_E8d_v4",
  /** Standard_E16d_v4 */
  StandardE16DV4 = "Standard_E16d_v4",
  /** Standard_E2d_v5 */
  StandardE2DV5 = "Standard_E2d_v5",
  /** Standard_E4d_v5 */
  StandardE4DV5 = "Standard_E4d_v5",
  /** Standard_E8d_v5 */
  StandardE8DV5 = "Standard_E8d_v5",
  /** Standard_E16d_v5 */
  StandardE16DV5 = "Standard_E16d_v5",
}

/**
 * SKU name. \
 * {@link KnownAzureSkuName} can be used interchangeably with AzureSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dev(No SLA)_Standard_D11_v2**: Dev(No SLA)_Standard_D11_v2 \
 * **Dev(No SLA)_Standard_E2a_v4**: Dev(No SLA)_Standard_E2a_v4 \
 * **Standard_D11_v2**: Standard_D11_v2 \
 * **Standard_D12_v2**: Standard_D12_v2 \
 * **Standard_D13_v2**: Standard_D13_v2 \
 * **Standard_D14_v2**: Standard_D14_v2 \
 * **Standard_D32d_v4**: Standard_D32d_v4 \
 * **Standard_D16d_v5**: Standard_D16d_v5 \
 * **Standard_D32d_v5**: Standard_D32d_v5 \
 * **Standard_DS13_v2+1TB_PS**: Standard_DS13_v2+1TB_PS \
 * **Standard_DS13_v2+2TB_PS**: Standard_DS13_v2+2TB_PS \
 * **Standard_DS14_v2+3TB_PS**: Standard_DS14_v2+3TB_PS \
 * **Standard_DS14_v2+4TB_PS**: Standard_DS14_v2+4TB_PS \
 * **Standard_L4s**: Standard_L4s \
 * **Standard_L8s**: Standard_L8s \
 * **Standard_L16s**: Standard_L16s \
 * **Standard_L8s_v2**: Standard_L8s_v2 \
 * **Standard_L16s_v2**: Standard_L16s_v2 \
 * **Standard_L8s_v3**: Standard_L8s_v3 \
 * **Standard_L16s_v3**: Standard_L16s_v3 \
 * **Standard_L32s_v3**: Standard_L32s_v3 \
 * **Standard_L8as_v3**: Standard_L8as_v3 \
 * **Standard_L16as_v3**: Standard_L16as_v3 \
 * **Standard_L32as_v3**: Standard_L32as_v3 \
 * **Standard_E64i_v3**: Standard_E64i_v3 \
 * **Standard_E80ids_v4**: Standard_E80ids_v4 \
 * **Standard_E2a_v4**: Standard_E2a_v4 \
 * **Standard_E4a_v4**: Standard_E4a_v4 \
 * **Standard_E8a_v4**: Standard_E8a_v4 \
 * **Standard_E16a_v4**: Standard_E16a_v4 \
 * **Standard_E8as_v4+1TB_PS**: Standard_E8as_v4+1TB_PS \
 * **Standard_E8as_v4+2TB_PS**: Standard_E8as_v4+2TB_PS \
 * **Standard_E16as_v4+3TB_PS**: Standard_E16as_v4+3TB_PS \
 * **Standard_E16as_v4+4TB_PS**: Standard_E16as_v4+4TB_PS \
 * **Standard_E8as_v5+1TB_PS**: Standard_E8as_v5+1TB_PS \
 * **Standard_E8as_v5+2TB_PS**: Standard_E8as_v5+2TB_PS \
 * **Standard_E16as_v5+3TB_PS**: Standard_E16as_v5+3TB_PS \
 * **Standard_E16as_v5+4TB_PS**: Standard_E16as_v5+4TB_PS \
 * **Standard_E2ads_v5**: Standard_E2ads_v5 \
 * **Standard_E4ads_v5**: Standard_E4ads_v5 \
 * **Standard_E8ads_v5**: Standard_E8ads_v5 \
 * **Standard_E16ads_v5**: Standard_E16ads_v5 \
 * **Standard_EC8as_v5+1TB_PS**: Standard_EC8as_v5+1TB_PS \
 * **Standard_EC8as_v5+2TB_PS**: Standard_EC8as_v5+2TB_PS \
 * **Standard_EC16as_v5+3TB_PS**: Standard_EC16as_v5+3TB_PS \
 * **Standard_EC16as_v5+4TB_PS**: Standard_EC16as_v5+4TB_PS \
 * **Standard_EC8ads_v5**: Standard_EC8ads_v5 \
 * **Standard_EC16ads_v5**: Standard_EC16ads_v5 \
 * **Standard_E8s_v4+1TB_PS**: Standard_E8s_v4+1TB_PS \
 * **Standard_E8s_v4+2TB_PS**: Standard_E8s_v4+2TB_PS \
 * **Standard_E16s_v4+3TB_PS**: Standard_E16s_v4+3TB_PS \
 * **Standard_E16s_v4+4TB_PS**: Standard_E16s_v4+4TB_PS \
 * **Standard_E8s_v5+1TB_PS**: Standard_E8s_v5+1TB_PS \
 * **Standard_E8s_v5+2TB_PS**: Standard_E8s_v5+2TB_PS \
 * **Standard_E16s_v5+3TB_PS**: Standard_E16s_v5+3TB_PS \
 * **Standard_E16s_v5+4TB_PS**: Standard_E16s_v5+4TB_PS \
 * **Standard_E2d_v4**: Standard_E2d_v4 \
 * **Standard_E4d_v4**: Standard_E4d_v4 \
 * **Standard_E8d_v4**: Standard_E8d_v4 \
 * **Standard_E16d_v4**: Standard_E16d_v4 \
 * **Standard_E2d_v5**: Standard_E2d_v5 \
 * **Standard_E4d_v5**: Standard_E4d_v5 \
 * **Standard_E8d_v5**: Standard_E8d_v5 \
 * **Standard_E16d_v5**: Standard_E16d_v5
 */
export type AzureSkuName = string;

/** SKU tier. */
export enum KnownAzureSkuTier {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
}

/**
 * SKU tier. \
 * {@link KnownAzureSkuTier} can be used interchangeably with AzureSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **Standard**: Standard
 */
export type AzureSkuTier = string;

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove all identities. */
  type: IdentityType;
  /** The list of user identities associated with the Kusto cluster. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove all identities. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove all identities. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssigned, UserAssigned**: SystemAssigned, UserAssigned
 */
export type IdentityType = string;

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
  item: Record<
    string,
    ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
  >,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
          item[key],
        );
  });
  return result;
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<
  string,
  ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
          item[key],
        );
  });
  return result;
}

/** model interface ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties */
export interface ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
  _item: ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties,
): any {
  return {};
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
  item: any,
): ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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

/** Class representing an update to a Kusto cluster. */
export interface ClusterUpdate extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Resource location. */
  location?: string;
  /** The SKU of the cluster. */
  sku?: AzureSku;
  /** The availability zones of the cluster. */
  zones?: string[];
  /** The identity of the cluster, if configured. */
  identity?: Identity;
  /** The state of the resource. */
  readonly state?: State;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The cluster URI. */
  readonly uri?: string;
  /** The cluster data ingestion URI. */
  readonly dataIngestionUri?: string;
  /** The reason for the cluster's current state. */
  readonly stateReason?: string;
  /** The cluster's external tenants. */
  trustedExternalTenants?: TrustedExternalTenant[];
  /** Optimized auto scale definition. */
  optimizedAutoscale?: OptimizedAutoscale;
  /** A boolean value that indicates if the cluster's disks are encrypted. */
  enableDiskEncryption?: boolean;
  /** A boolean value that indicates if the streaming ingest is enabled. */
  enableStreamingIngest?: boolean;
  /** Virtual network definition. */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
  /** KeyVault properties for the cluster encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** A boolean value that indicates if the purge operations are enabled. */
  enablePurge?: boolean;
  /** List of the cluster's language extensions. */
  languageExtensions?: _LanguageExtensionsList;
  /** A boolean value that indicates if double encryption is enabled. */
  enableDoubleEncryption?: boolean;
  /** Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of ips in the format of CIDR allowed to connect to the cluster. */
  allowedIpRangeList?: string[];
  /** The engine type */
  engineType?: EngineType;
  /** The cluster's accepted audiences. */
  acceptedAudiences?: AcceptedAudiences[];
  /** A boolean value that indicates if the cluster could be automatically stopped (due to lack of data or no activity for many days). */
  enableAutoStop?: boolean;
  /** Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' */
  restrictOutboundNetworkAccess?: ClusterNetworkAccessFlag;
  /** List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster. */
  allowedFqdnList?: string[];
  /** List of callout policies for egress from Cluster. */
  calloutPolicies?: CalloutPolicy[];
  /** Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) */
  publicIPType?: PublicIPType;
  /** Virtual Cluster graduation properties */
  virtualClusterGraduationProperties?: string;
  /** A list of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Properties of the peer cluster involved in a migration to/from this cluster. */
  readonly migrationCluster?: MigrationClusterProperties;
  /** Indicates whether the cluster is zonal or non-zonal. */
  readonly zoneStatus?: ZoneStatus;
}

export function clusterUpdateSerializer(item: ClusterUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : azureSkuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "trustedExternalTenants",
      "optimizedAutoscale",
      "enableDiskEncryption",
      "enableStreamingIngest",
      "virtualNetworkConfiguration",
      "keyVaultProperties",
      "enablePurge",
      "languageExtensions",
      "enableDoubleEncryption",
      "publicNetworkAccess",
      "allowedIpRangeList",
      "engineType",
      "acceptedAudiences",
      "enableAutoStop",
      "restrictOutboundNetworkAccess",
      "allowedFqdnList",
      "calloutPolicies",
      "publicIPType",
      "virtualClusterGraduationProperties",
    ])
      ? undefined
      : _clusterUpdatePropertiesSerializer(item),
  };
}

/** The list Kusto clusters operation response. */
export interface _ClusterListResult {
  /** The list of Kusto clusters. */
  value?: Cluster[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
  return {
    value: !item["value"] ? item["value"] : clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** A cluster migrate request. */
export interface ClusterMigrateRequest {
  /** Resource ID of the destination cluster or kusto pool. */
  clusterResourceId: string;
}

export function clusterMigrateRequestSerializer(item: ClusterMigrateRequest): any {
  return { clusterResourceId: item["clusterResourceId"] };
}

/** The list Kusto database principals operation response. */
export interface _FollowerDatabaseListResultGet {
  /** The FollowerDatabaseDefinitionGet items on this page */
  value: FollowerDatabaseDefinitionGet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _followerDatabaseListResultGetDeserializer(
  item: any,
): _FollowerDatabaseListResultGet {
  return {
    value: followerDatabaseDefinitionGetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function followerDatabaseDefinitionGetArrayDeserializer(
  result: Array<FollowerDatabaseDefinitionGet>,
): any[] {
  return result.map((item) => {
    return followerDatabaseDefinitionGetDeserializer(item);
  });
}

/** A class representing follower database object. */
export interface FollowerDatabaseDefinitionGet {
  /** Resource id of the cluster that follows a database owned by this cluster. */
  clusterResourceId?: string;
  /** Resource name of the attached database configuration in the follower cluster. */
  attachedDatabaseConfigurationName?: string;
  /** The database name owned by this cluster that was followed. * in case following all databases. */
  readonly databaseName?: string;
  /** Table level sharing specifications */
  readonly tableLevelSharingProperties?: TableLevelSharingProperties;
  /** The origin of the following setup. */
  readonly databaseShareOrigin?: DatabaseShareOrigin;
}

export function followerDatabaseDefinitionGetDeserializer(
  item: any,
): FollowerDatabaseDefinitionGet {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _followerDatabaseDefinitionGetPropertiesDeserializer(item["properties"])),
  };
}

/** A class representing the properties of a follower database object. */
export interface FollowerDatabaseProperties {
  /** Resource id of the cluster that follows a database owned by this cluster. */
  clusterResourceId: string;
  /** Resource name of the attached database configuration in the follower cluster. */
  attachedDatabaseConfigurationName: string;
  /** The database name owned by this cluster that was followed. * in case following all databases. */
  readonly databaseName?: string;
  /** Table level sharing specifications */
  readonly tableLevelSharingProperties?: TableLevelSharingProperties;
  /** The origin of the following setup. */
  readonly databaseShareOrigin?: DatabaseShareOrigin;
}

export function followerDatabasePropertiesDeserializer(item: any): FollowerDatabaseProperties {
  return {
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
    databaseName: item["databaseName"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    databaseShareOrigin: item["databaseShareOrigin"],
  };
}

/** The list Kusto database principals operation response. */
export interface _FollowerDatabaseListResult {
  /** The list of follower database result. */
  value?: FollowerDatabaseDefinition[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _followerDatabaseListResultDeserializer(item: any): _FollowerDatabaseListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : followerDatabaseDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function followerDatabaseDefinitionArraySerializer(
  result: Array<FollowerDatabaseDefinition>,
): any[] {
  return result.map((item) => {
    return followerDatabaseDefinitionSerializer(item);
  });
}

export function followerDatabaseDefinitionArrayDeserializer(
  result: Array<FollowerDatabaseDefinition>,
): any[] {
  return result.map((item) => {
    return followerDatabaseDefinitionDeserializer(item);
  });
}

/** A class representing follower database request. */
export interface FollowerDatabaseDefinition {
  /** Resource id of the cluster that follows a database owned by this cluster. */
  clusterResourceId: string;
  /** Resource name of the attached database configuration in the follower cluster. */
  attachedDatabaseConfigurationName: string;
  /** The database name owned by this cluster that was followed. * in case following all databases. */
  readonly databaseName?: string;
  /** Table level sharing specifications */
  readonly tableLevelSharingProperties?: TableLevelSharingProperties;
  /** The origin of the following setup. */
  readonly databaseShareOrigin?: DatabaseShareOrigin;
}

export function followerDatabaseDefinitionSerializer(item: FollowerDatabaseDefinition): any {
  return {
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
  };
}

export function followerDatabaseDefinitionDeserializer(item: any): FollowerDatabaseDefinition {
  return {
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
    databaseName: item["databaseName"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    databaseShareOrigin: item["databaseShareOrigin"],
  };
}

/** model interface DiagnoseVirtualNetworkResult */
export interface DiagnoseVirtualNetworkResult {
  /** The list of network connectivity diagnostic finding */
  findings?: string[];
}

export function diagnoseVirtualNetworkResultDeserializer(item: any): DiagnoseVirtualNetworkResult {
  return {
    findings: !item["findings"]
      ? item["findings"]
      : item["findings"].map((p: any) => {
          return p;
        }),
  };
}

/** List of available SKUs for a Kusto Cluster. */
export interface _ListResourceSkusResult {
  /** The collection of available SKUs for an existing resource. */
  value?: AzureResourceSku[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _listResourceSkusResultDeserializer(item: any): _ListResourceSkusResult {
  return {
    value: !item["value"] ? item["value"] : azureResourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureResourceSkuArrayDeserializer(result: Array<AzureResourceSku>): any[] {
  return result.map((item) => {
    return azureResourceSkuDeserializer(item);
  });
}

/** Azure resource SKU definition. */
export interface AzureResourceSku {
  /** Resource Namespace and Type. */
  resourceType?: string;
  /** The SKU details. */
  sku?: AzureSku;
  /** The number of instances of the cluster. */
  capacity?: AzureCapacity;
}

export function azureResourceSkuDeserializer(item: any): AzureResourceSku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : azureSkuDeserializer(item["sku"]),
    capacity: !item["capacity"] ? item["capacity"] : azureCapacityDeserializer(item["capacity"]),
  };
}

/** Azure capacity definition. */
export interface AzureCapacity {
  /** Scale type. */
  scaleType: AzureScaleType;
  /** Minimum allowed capacity. */
  minimum: number;
  /** Maximum allowed capacity. */
  maximum: number;
  /** The default capacity that would be used. */
  default: number;
}

export function azureCapacityDeserializer(item: any): AzureCapacity {
  return {
    scaleType: item["scaleType"],
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
  };
}

/** Scale type. */
export enum KnownAzureScaleType {
  /** automatic */
  Automatic = "automatic",
  /** manual */
  Manual = "manual",
  /** none */
  None = "none",
}

/**
 * Scale type. \
 * {@link KnownAzureScaleType} can be used interchangeably with AzureScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **automatic**: automatic \
 * **manual**: manual \
 * **none**: none
 */
export type AzureScaleType = string;

/** The response of a OutboundNetworkDependenciesEndpoint list operation. */
export interface _OutboundNetworkDependenciesEndpointListResult {
  /** The OutboundNetworkDependenciesEndpoint items on this page */
  value: OutboundNetworkDependenciesEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundNetworkDependenciesEndpointListResultDeserializer(
  item: any,
): _OutboundNetworkDependenciesEndpointListResult {
  return {
    value: outboundNetworkDependenciesEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundNetworkDependenciesEndpointArrayDeserializer(
  result: Array<OutboundNetworkDependenciesEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundNetworkDependenciesEndpointDeserializer(item);
  });
}

/** Endpoints accessed for a common purpose that the Kusto Service Environment requires outbound network access to. */
export interface OutboundNetworkDependenciesEndpoint extends ProxyResource {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** The type of service accessed by the Kusto Service Environment, e.g., Azure Storage, Azure SQL Database, and Azure Active Directory. */
  category?: string;
  /** The endpoints that the Kusto Service Environment reaches the service at. */
  endpoints?: EndpointDependency[];
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function outboundNetworkDependenciesEndpointDeserializer(
  item: any,
): OutboundNetworkDependenciesEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _outboundNetworkDependenciesEndpointPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Endpoints accessed for a common purpose that the Kusto Service Environment requires outbound network access to. */
export interface OutboundNetworkDependenciesEndpointProperties {
  /** The type of service accessed by the Kusto Service Environment, e.g., Azure Storage, Azure SQL Database, and Azure Active Directory. */
  category?: string;
  /** The endpoints that the Kusto Service Environment reaches the service at. */
  endpoints?: EndpointDependency[];
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function outboundNetworkDependenciesEndpointPropertiesDeserializer(
  item: any,
): OutboundNetworkDependenciesEndpointProperties {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
    provisioningState: item["provisioningState"],
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that a service is reached at, including details of the current connection status. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The ports used when connecting to DomainName. */
  endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Current TCP connectivity information from the Kusto cluster to a single endpoint. */
export interface EndpointDetail {
  /** The port an endpoint is connected to. */
  port?: number;
  /** The ip address of the endpoint. */
  ipAddress?: string;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    port: item["port"],
    ipAddress: item["ipAddress"],
  };
}

/** A list of the service's callout policy objects. */
export interface _CalloutPoliciesList {
  /** The CalloutPolicy items on this page */
  value: CalloutPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _calloutPoliciesListSerializer(item: _CalloutPoliciesList): any {
  return { value: calloutPolicyArraySerializer(item["value"]), nextLink: item["nextLink"] };
}

export function _calloutPoliciesListDeserializer(item: any): _CalloutPoliciesList {
  return {
    value: calloutPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Configuration for an external callout policy to remove. */
export interface CalloutPolicyToRemove {
  /** Unique identifier for the callout configuration. */
  calloutId?: string;
}

export function calloutPolicyToRemoveSerializer(item: CalloutPolicyToRemove): any {
  return { calloutId: item["calloutId"] };
}

/** The list of the EngagementFabric SKU descriptions */
export interface _SkuDescriptionList {
  /** SKU descriptions */
  readonly value?: SkuDescription[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _skuDescriptionListDeserializer(item: any): _SkuDescriptionList {
  return {
    value: !item["value"] ? item["value"] : skuDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuDescriptionArrayDeserializer(result: Array<SkuDescription>): any[] {
  return result.map((item) => {
    return skuDescriptionDeserializer(item);
  });
}

/** The Kusto SKU description of given resource type */
export interface SkuDescription {
  /** The resource type */
  readonly resourceType?: string;
  /** The name of the SKU */
  readonly name?: string;
  /** The tier of the SKU */
  readonly tier?: string;
  /** The set of locations that the SKU is available */
  readonly locations?: string[];
  /** Locations and zones */
  readonly locationInfo?: SkuLocationInfoItem[];
  /** The restrictions because of which SKU cannot be used */
  readonly restrictions?: any[];
}

export function skuDescriptionDeserializer(item: any): SkuDescription {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuLocationInfoItemArrayDeserializer(item["locationInfo"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : item["restrictions"].map((p: any) => {
          return p;
        }),
  };
}

export function skuLocationInfoItemArrayDeserializer(result: Array<SkuLocationInfoItem>): any[] {
  return result.map((item) => {
    return skuLocationInfoItemDeserializer(item);
  });
}

/** The locations and zones info for SKU. */
export interface SkuLocationInfoItem {
  /** The available location of the SKU. */
  location: string;
  /** The available zone of the SKU. */
  zones?: string[];
  /** Gets details of capabilities available to a SKU in specific zones. */
  zoneDetails?: ResourceSkuZoneDetails[];
}

export function skuLocationInfoItemDeserializer(item: any): SkuLocationInfoItem {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : resourceSkuZoneDetailsArrayDeserializer(item["zoneDetails"]),
  };
}

export function resourceSkuZoneDetailsArrayDeserializer(
  result: Array<ResourceSkuZoneDetails>,
): any[] {
  return result.map((item) => {
    return resourceSkuZoneDetailsDeserializer(item);
  });
}

/** Describes The zonal capabilities of a SKU. */
export interface ResourceSkuZoneDetails {
  /** The set of zones that the SKU is available in with the specified capabilities. */
  readonly name?: string[];
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  readonly capabilities?: ResourceSkuCapabilities[];
}

export function resourceSkuZoneDetailsDeserializer(item: any): ResourceSkuZoneDetails {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
  };
}

export function resourceSkuCapabilitiesArrayDeserializer(
  result: Array<ResourceSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceSkuCapabilitiesDeserializer(item);
  });
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilities {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

export function resourceSkuCapabilitiesDeserializer(item: any): ResourceSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The result returned from a cluster check name availability request. */
export interface ClusterCheckNameRequest {
  /** Cluster name. */
  name: string;
  /** The type of resource, Microsoft.Kusto/clusters. */
  type: "Microsoft.Kusto/clusters";
}

export function clusterCheckNameRequestSerializer(item: ClusterCheckNameRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** A list of private endpoint connections */
export interface _PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** A list of private link resources */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
  /** Link to the next page of results. */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The request to invite a follower to a database. */
export interface DatabaseInviteFollowerRequest {
  /** The email of the invited user for which the follower invitation is generated. */
  inviteeEmail: string;
  /** Table level sharing specifications */
  tableLevelSharingProperties?: TableLevelSharingProperties;
}

export function databaseInviteFollowerRequestSerializer(item: DatabaseInviteFollowerRequest): any {
  return {
    inviteeEmail: item["inviteeEmail"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesSerializer(item["tableLevelSharingProperties"]),
  };
}

/** The result returned from a follower invitation generation request. */
export interface DatabaseInviteFollowerResult {
  /** The generated invitation token. */
  generatedInvitation?: string;
}

export function databaseInviteFollowerResultDeserializer(item: any): DatabaseInviteFollowerResult {
  return {
    generatedInvitation: item["generatedInvitation"],
  };
}

/** Operation Result Entity. */
export interface OperationResult {
  /** ID of the resource. */
  readonly id?: string;
  /** Name of the resource. */
  readonly name?: string;
  /** status of the Operation result. */
  readonly status?: Status;
  /** The operation start time */
  startTime?: Date;
  /** The operation end time */
  endTime?: Date;
  /** Percentage completed. */
  percentComplete?: number;
  /** The kind of the operation. */
  operationKind?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The state of the operation. */
  operationState?: string;
  /** The code of the error. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationResultPropertiesDeserializer(item["properties"])),
    ...(!item["error"] ? item["error"] : _operationResultErrorDeserializer(item["error"])),
  };
}

/** The status of operation. */
export enum KnownStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Running */
  Running = "Running",
}

/**
 * The status of operation. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Running**: Running
 */
export type Status = string;

/** Operation result properties */
export interface OperationResultProperties {
  /** The kind of the operation. */
  operationKind?: string;
  /** The provisioned state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The state of the operation. */
  operationState?: string;
}

export function operationResultPropertiesDeserializer(item: any): OperationResultProperties {
  return {
    operationKind: item["operationKind"],
    provisioningState: item["provisioningState"],
    operationState: item["operationState"],
  };
}

/** Operation result error properties */
export interface OperationResultErrorProperties {
  /** The code of the error. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function operationResultErrorPropertiesDeserializer(
  item: any,
): OperationResultErrorProperties {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Known values of {@link CallerRole} that the service accepts. */
export enum KnownCallerRole {
  /** Admin */
  Admin = "Admin",
  /** None */
  None = "None",
}

/** Type of CallerRole */
export type CallerRole = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-14 API version. */
  V20250214 = "2025-02-14",
}

export function _clusterPrincipalAssignmentPropertiesSerializer(
  item: ClusterPrincipalAssignment,
): any {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
  };
}

export function _clusterPrincipalAssignmentPropertiesDeserializer(item: any) {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
    tenantName: item["tenantName"],
    principalName: item["principalName"],
    provisioningState: item["provisioningState"],
    aadObjectId: item["aadObjectId"],
  };
}

export function _databasePrincipalAssignmentPropertiesSerializer(
  item: DatabasePrincipalAssignment,
): any {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
  };
}

export function _databasePrincipalAssignmentPropertiesDeserializer(item: any) {
  return {
    principalId: item["principalId"],
    role: item["role"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
    tenantName: item["tenantName"],
    principalName: item["principalName"],
    provisioningState: item["provisioningState"],
    aadObjectId: item["aadObjectId"],
  };
}

export function _scriptPropertiesSerializer(item: Script): any {
  return {
    scriptUrl: item["scriptUrl"],
    scriptUrlSasToken: item["scriptUrlSasToken"],
    scriptContent: item["scriptContent"],
    forceUpdateTag: item["forceUpdateTag"],
    continueOnErrors: item["continueOnErrors"],
    scriptLevel: item["scriptLevel"],
    principalPermissionsAction: item["principalPermissionsAction"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

export function _scriptPropertiesDeserializer(item: any) {
  return {
    scriptUrl: item["scriptUrl"],
    scriptUrlSasToken: item["scriptUrlSasToken"],
    scriptContent: item["scriptContent"],
    forceUpdateTag: item["forceUpdateTag"],
    continueOnErrors: item["continueOnErrors"],
    provisioningState: item["provisioningState"],
    scriptLevel: item["scriptLevel"],
    principalPermissionsAction: item["principalPermissionsAction"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

export function _eventHubDataConnectionPropertiesSerializer(item: EventHubDataConnection): any {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function _eventHubDataConnectionPropertiesDeserializer(item: any) {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    provisioningState: item["provisioningState"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
  };
}

export function _iotHubDataConnectionPropertiesSerializer(item: IotHubDataConnection): any {
  return {
    iotHubResourceId: item["iotHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    sharedAccessPolicyName: item["sharedAccessPolicyName"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function _iotHubDataConnectionPropertiesDeserializer(item: any) {
  return {
    iotHubResourceId: item["iotHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    sharedAccessPolicyName: item["sharedAccessPolicyName"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
    provisioningState: item["provisioningState"],
  };
}

export function _eventGridDataConnectionPropertiesSerializer(item: EventGridDataConnection): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    eventGridResourceId: item["eventGridResourceId"],
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
  };
}

export function _eventGridDataConnectionPropertiesDeserializer(item: any) {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    eventGridResourceId: item["eventGridResourceId"],
    eventHubResourceId: item["eventHubResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    provisioningState: item["provisioningState"],
  };
}

export function _cosmosDbDataConnectionPropertiesSerializer(item: CosmosDbDataConnection): any {
  return {
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    cosmosDbAccountResourceId: item["cosmosDbAccountResourceId"],
    cosmosDbDatabase: item["cosmosDbDatabase"],
    cosmosDbContainer: item["cosmosDbContainer"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function _cosmosDbDataConnectionPropertiesDeserializer(item: any) {
  return {
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    cosmosDbAccountResourceId: item["cosmosDbAccountResourceId"],
    cosmosDbDatabase: item["cosmosDbDatabase"],
    cosmosDbContainer: item["cosmosDbContainer"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
    provisioningState: item["provisioningState"],
  };
}

export function _eventGridDataConnectionWithManagedIdentityPropertiesSerializer(
  item: EventGridDataConnectionWithManagedIdentity,
): any {
  return {
    storageAccountResourceIdForManagedIdentity: item["storageAccountResourceIdForManagedIdentity"],
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    eventGridResourceId: item["eventGridResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
  };
}

export function _eventGridDataConnectionWithManagedIdentityPropertiesDeserializer(item: any) {
  return {
    storageAccountResourceIdForManagedIdentity: item["storageAccountResourceIdForManagedIdentity"],
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    eventGridResourceId: item["eventGridResourceId"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    ignoreFirstRecord: item["ignoreFirstRecord"],
    blobStorageEventType: item["blobStorageEventType"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    provisioningState: item["provisioningState"],
  };
}

export function _eventHubDataConnectionWithManagedIdentityPropertiesSerializer(
  item: EventHubDataConnectionWithManagedIdentity,
): any {
  return {
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : item["retrievalStartDate"].toISOString(),
  };
}

export function _eventHubDataConnectionWithManagedIdentityPropertiesDeserializer(item: any) {
  return {
    eventHubResourceIdForManagedIdentity: item["eventHubResourceIdForManagedIdentity"],
    consumerGroup: item["consumerGroup"],
    tableName: item["tableName"],
    mappingRuleName: item["mappingRuleName"],
    dataFormat: item["dataFormat"],
    eventSystemProperties: !item["eventSystemProperties"]
      ? item["eventSystemProperties"]
      : item["eventSystemProperties"].map((p: any) => {
          return p;
        }),
    compression: item["compression"],
    provisioningState: item["provisioningState"],
    managedIdentityResourceId: item["managedIdentityResourceId"],
    managedIdentityObjectId: item["managedIdentityObjectId"],
    databaseRouting: item["databaseRouting"],
    retrievalStartDate: !item["retrievalStartDate"]
      ? item["retrievalStartDate"]
      : new Date(item["retrievalStartDate"]),
  };
}

export function _readWriteDatabasePropertiesSerializer(item: ReadWriteDatabase): any {
  return {
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function _readWriteDatabasePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    statistics: !item["statistics"]
      ? item["statistics"]
      : databaseStatisticsDeserializer(item["statistics"]),
    isFollowed: item["isFollowed"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    suspensionDetails: !item["suspensionDetails"]
      ? item["suspensionDetails"]
      : suspensionDetailsDeserializer(item["suspensionDetails"]),
  };
}

export function _readOnlyFollowingDatabasePropertiesSerializer(
  item: ReadOnlyFollowingDatabase,
): any {
  return { hotCachePeriod: item["hotCachePeriod"] };
}

export function _readOnlyFollowingDatabasePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    softDeletePeriod: item["softDeletePeriod"],
    hotCachePeriod: item["hotCachePeriod"],
    statistics: !item["statistics"]
      ? item["statistics"]
      : databaseStatisticsDeserializer(item["statistics"]),
    leaderClusterResourceId: item["leaderClusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
    principalsModificationKind: item["principalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    originalDatabaseName: item["originalDatabaseName"],
    databaseShareOrigin: item["databaseShareOrigin"],
    suspensionDetails: !item["suspensionDetails"]
      ? item["suspensionDetails"]
      : suspensionDetailsDeserializer(item["suspensionDetails"]),
  };
}

export function _attachedDatabaseConfigurationPropertiesSerializer(
  item: AttachedDatabaseConfiguration,
): any {
  return {
    databaseName: item["databaseName"],
    clusterResourceId: item["clusterResourceId"],
    defaultPrincipalsModificationKind: item["defaultPrincipalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesSerializer(item["tableLevelSharingProperties"]),
    databaseNameOverride: item["databaseNameOverride"],
    databaseNamePrefix: item["databaseNamePrefix"],
  };
}

export function _attachedDatabaseConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    databaseName: item["databaseName"],
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseNames: !item["attachedDatabaseNames"]
      ? item["attachedDatabaseNames"]
      : item["attachedDatabaseNames"].map((p: any) => {
          return p;
        }),
    defaultPrincipalsModificationKind: item["defaultPrincipalsModificationKind"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    databaseNameOverride: item["databaseNameOverride"],
    databaseNamePrefix: item["databaseNamePrefix"],
  };
}

export function _managedPrivateEndpointPropertiesSerializer(item: ManagedPrivateEndpoint): any {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
  };
}

export function _managedPrivateEndpointPropertiesDeserializer(item: any) {
  return {
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkResourceRegion: item["privateLinkResourceRegion"],
    groupId: item["groupId"],
    requestMessage: item["requestMessage"],
    provisioningState: item["provisioningState"],
  };
}

export function _sandboxCustomImagePropertiesSerializer(item: SandboxCustomImage): any {
  return {
    language: item["language"],
    languageVersion: item["languageVersion"],
    baseImageName: item["baseImageName"],
    requirementsFileContent: item["requirementsFileContent"],
  };
}

export function _sandboxCustomImagePropertiesDeserializer(item: any) {
  return {
    language: item["language"],
    languageVersion: item["languageVersion"],
    baseImageName: item["baseImageName"],
    requirementsFileContent: item["requirementsFileContent"],
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArraySerializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleSerializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListSerializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArraySerializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArraySerializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
    uri: item["uri"],
    dataIngestionUri: item["dataIngestionUri"],
    stateReason: item["stateReason"],
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArrayDeserializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleDeserializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListDeserializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArrayDeserializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArrayDeserializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    migrationCluster: !item["migrationCluster"]
      ? item["migrationCluster"]
      : migrationClusterPropertiesDeserializer(item["migrationCluster"]),
    zoneStatus: item["zoneStatus"],
  };
}

export function _clusterUpdatePropertiesSerializer(item: ClusterUpdate): any {
  return {
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArraySerializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleSerializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationSerializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListSerializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArraySerializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArraySerializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
  };
}

export function _clusterUpdatePropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    provisioningState: item["provisioningState"],
    uri: item["uri"],
    dataIngestionUri: item["dataIngestionUri"],
    stateReason: item["stateReason"],
    trustedExternalTenants: !item["trustedExternalTenants"]
      ? item["trustedExternalTenants"]
      : trustedExternalTenantArrayDeserializer(item["trustedExternalTenants"]),
    optimizedAutoscale: !item["optimizedAutoscale"]
      ? item["optimizedAutoscale"]
      : optimizedAutoscaleDeserializer(item["optimizedAutoscale"]),
    enableDiskEncryption: item["enableDiskEncryption"],
    enableStreamingIngest: item["enableStreamingIngest"],
    virtualNetworkConfiguration: !item["virtualNetworkConfiguration"]
      ? item["virtualNetworkConfiguration"]
      : virtualNetworkConfigurationDeserializer(item["virtualNetworkConfiguration"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    enablePurge: item["enablePurge"],
    languageExtensions: !item["languageExtensions"]
      ? item["languageExtensions"]
      : _languageExtensionsListDeserializer(item["languageExtensions"]),
    enableDoubleEncryption: item["enableDoubleEncryption"],
    publicNetworkAccess: item["publicNetworkAccess"],
    allowedIpRangeList: !item["allowedIpRangeList"]
      ? item["allowedIpRangeList"]
      : item["allowedIpRangeList"].map((p: any) => {
          return p;
        }),
    engineType: item["engineType"],
    acceptedAudiences: !item["acceptedAudiences"]
      ? item["acceptedAudiences"]
      : acceptedAudiencesArrayDeserializer(item["acceptedAudiences"]),
    enableAutoStop: item["enableAutoStop"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    calloutPolicies: !item["calloutPolicies"]
      ? item["calloutPolicies"]
      : calloutPolicyArrayDeserializer(item["calloutPolicies"]),
    publicIPType: item["publicIPType"],
    virtualClusterGraduationProperties: item["virtualClusterGraduationProperties"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    migrationCluster: !item["migrationCluster"]
      ? item["migrationCluster"]
      : migrationClusterPropertiesDeserializer(item["migrationCluster"]),
    zoneStatus: item["zoneStatus"],
  };
}

export function _followerDatabaseDefinitionGetPropertiesDeserializer(item: any) {
  return {
    clusterResourceId: item["clusterResourceId"],
    attachedDatabaseConfigurationName: item["attachedDatabaseConfigurationName"],
    databaseName: item["databaseName"],
    tableLevelSharingProperties: !item["tableLevelSharingProperties"]
      ? item["tableLevelSharingProperties"]
      : tableLevelSharingPropertiesDeserializer(item["tableLevelSharingProperties"]),
    databaseShareOrigin: item["databaseShareOrigin"],
  };
}

export function _outboundNetworkDependenciesEndpointPropertiesDeserializer(item: any) {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _operationResultPropertiesDeserializer(item: any) {
  return {
    operationKind: item["operationKind"],
    provisioningState: item["provisioningState"],
    operationState: item["operationState"],
  };
}

export function _operationResultErrorDeserializer(item: any) {
  return {
    code: item["code"],
    message: item["message"],
  };
}
