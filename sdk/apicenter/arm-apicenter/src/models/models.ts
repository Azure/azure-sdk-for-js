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
  readonly value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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

/** The service entity. */
export interface Service extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function serviceSerializer(item: Service): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : servicePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function serviceDeserializer(item: any): Service {
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
      : servicePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of the service. */
export interface ServiceProperties {
  /** Provisioning state of the service. */
  readonly provisioningState?: ProvisioningState;
  /** Flag used to restore soft-deleted API Center service. If specified and set to 'true' all other properties will be ignored. */
  restore?: boolean;
}

export function servicePropertiesSerializer(item: ServiceProperties): any {
  return { restore: item["restore"] };
}

export function servicePropertiesDeserializer(item: any): ServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    restore: item["restore"],
  };
}

/** The provisioning state of the resource */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ProvisioningState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
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

/** The type used for update operations of the Service. */
export interface ServiceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ServiceUpdateProperties;
}

export function serviceUpdateSerializer(item: ServiceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : serviceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Service. */
export interface ServiceUpdateProperties {
  /** Flag used to restore soft-deleted API Center service. If specified and set to 'true' all other properties will be ignored. */
  restore?: boolean;
}

export function serviceUpdatePropertiesSerializer(item: ServiceUpdateProperties): any {
  return { restore: item["restore"] };
}

/** The response of a Service list operation. */
export interface _ServiceListResult {
  /** The Service items on this page */
  readonly value: Service[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _serviceListResultDeserializer(item: any): _ServiceListResult {
  return {
    value: serviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceArraySerializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceSerializer(item);
  });
}

export function serviceArrayDeserializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceDeserializer(item);
  });
}

/** The metadata schema export request. */
export interface MetadataSchemaExportRequest {
  /** An entity the metadata schema is requested for. */
  assignedTo?: MetadataAssignmentEntity;
}

export function metadataSchemaExportRequestSerializer(item: MetadataSchemaExportRequest): any {
  return { assignedTo: item["assignedTo"] };
}

/** Assignment entity for Metadata */
export enum KnownMetadataAssignmentEntity {
  /** Assigned to API */
  Api = "api",
  /** Assigned to Environment */
  Environment = "environment",
  /** Assigned to Deployment */
  Deployment = "deployment",
}

/**
 * Assignment entity for Metadata \
 * {@link KnownMetadataAssignmentEntity} can be used interchangeably with MetadataAssignmentEntity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **api**: Assigned to API \
 * **environment**: Assigned to Environment \
 * **deployment**: Assigned to Deployment
 */
export type MetadataAssignmentEntity = string;

/** The metadata schema export result. */
export interface MetadataSchemaExportResult {
  /** The export format for the schema */
  format?: MetadataSchemaExportFormat;
  /** The result of the export operation. */
  value?: string;
}

export function metadataSchemaExportResultDeserializer(item: any): MetadataSchemaExportResult {
  return {
    format: item["format"],
    value: item["value"],
  };
}

/** The format for schema export */
export enum KnownMetadataSchemaExportFormat {
  /** The inlined content of a schema document. */
  Inline = "inline",
  /** The link to a schema document. The URL is valid for 5 minutes. */
  Link = "link",
}

/**
 * The format for schema export \
 * {@link KnownMetadataSchemaExportFormat} can be used interchangeably with MetadataSchemaExportFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inline**: The inlined content of a schema document. \
 * **link**: The link to a schema document. The URL is valid for 5 minutes.
 */
export type MetadataSchemaExportFormat = string;

/** Soft-deleted service entity. */
export interface DeletedService extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeletedServiceProperties;
}

export function deletedServiceDeserializer(item: any): DeletedService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deletedServicePropertiesDeserializer(item["properties"]),
  };
}

/** Deleted service properties. */
export interface DeletedServiceProperties {
  /** UTC date and time when the service will be automatically purged. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  scheduledPurgeDate?: Date;
  /** UTC date and time when the service was soft-deleted. The date conforms to the following format: yyyy-MM-ddTHH:mm:ssZ as specified by the ISO 8601 standard. */
  softDeletionDate?: Date;
}

export function deletedServicePropertiesDeserializer(item: any): DeletedServiceProperties {
  return {
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    softDeletionDate: !item["softDeletionDate"]
      ? item["softDeletionDate"]
      : new Date(item["softDeletionDate"]),
  };
}

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

/** The response of a DeletedService list operation. */
export interface _DeletedServiceListResult {
  /** The DeletedService items on this page */
  readonly value: DeletedService[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _deletedServiceListResultDeserializer(item: any): _DeletedServiceListResult {
  return {
    value: deletedServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedServiceArrayDeserializer(result: Array<DeletedService>): any[] {
  return result.map((item) => {
    return deletedServiceDeserializer(item);
  });
}

/** Metadata schema entity. Used to define metadata for the entities in API catalog. */
export interface MetadataSchema extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MetadataSchemaProperties;
}

export function metadataSchemaSerializer(item: MetadataSchema): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : metadataSchemaPropertiesSerializer(item["properties"]),
  };
}

export function metadataSchemaDeserializer(item: any): MetadataSchema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : metadataSchemaPropertiesDeserializer(item["properties"]),
  };
}

/** Metadata schema properties. */
export interface MetadataSchemaProperties {
  /** The schema defining the type. */
  schema: string;
  /** The assignees */
  assignedTo?: MetadataAssignment[];
}

export function metadataSchemaPropertiesSerializer(item: MetadataSchemaProperties): any {
  return {
    schema: item["schema"],
    assignedTo: !item["assignedTo"]
      ? item["assignedTo"]
      : metadataAssignmentArraySerializer(item["assignedTo"]),
  };
}

export function metadataSchemaPropertiesDeserializer(item: any): MetadataSchemaProperties {
  return {
    schema: item["schema"],
    assignedTo: !item["assignedTo"]
      ? item["assignedTo"]
      : metadataAssignmentArrayDeserializer(item["assignedTo"]),
  };
}

export function metadataAssignmentArraySerializer(result: Array<MetadataAssignment>): any[] {
  return result.map((item) => {
    return metadataAssignmentSerializer(item);
  });
}

export function metadataAssignmentArrayDeserializer(result: Array<MetadataAssignment>): any[] {
  return result.map((item) => {
    return metadataAssignmentDeserializer(item);
  });
}

/** Assignment metadata */
export interface MetadataAssignment {
  /** The entities this metadata schema component gets applied to. */
  entity?: MetadataAssignmentEntity;
  /** Required assignment */
  required?: boolean;
  /** Deprecated assignment */
  deprecated?: boolean;
}

export function metadataAssignmentSerializer(item: MetadataAssignment): any {
  return { entity: item["entity"], required: item["required"], deprecated: item["deprecated"] };
}

export function metadataAssignmentDeserializer(item: any): MetadataAssignment {
  return {
    entity: item["entity"],
    required: item["required"],
    deprecated: item["deprecated"],
  };
}

/** The response of a MetadataSchema list operation. */
export interface _MetadataSchemaListResult {
  /** The MetadataSchema items on this page */
  readonly value: MetadataSchema[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _metadataSchemaListResultDeserializer(item: any): _MetadataSchemaListResult {
  return {
    value: metadataSchemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metadataSchemaArraySerializer(result: Array<MetadataSchema>): any[] {
  return result.map((item) => {
    return metadataSchemaSerializer(item);
  });
}

export function metadataSchemaArrayDeserializer(result: Array<MetadataSchema>): any[] {
  return result.map((item) => {
    return metadataSchemaDeserializer(item);
  });
}

/** Workspace entity. */
export interface Workspace extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceProperties;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesDeserializer(item["properties"]),
  };
}

/** Workspace properties. */
export interface WorkspaceProperties {
  /** Workspace title. */
  title: string;
  /** Workspace description. */
  description?: string;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return { title: item["title"], description: item["description"] };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    title: item["title"],
    description: item["description"],
  };
}

/** The response of a Workspace list operation. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  readonly value: Workspace[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** API entity. */
export interface Api extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ApiProperties;
}

export function apiSerializer(item: Api): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : apiPropertiesSerializer(item["properties"]),
  };
}

export function apiDeserializer(item: any): Api {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : apiPropertiesDeserializer(item["properties"]),
  };
}

/** API properties. */
export interface ApiProperties {
  /** API title. */
  title: string;
  /** Kind of API. For example, REST or GraphQL. */
  kind: ApiKind;
  /** Description of the API. */
  description?: string;
  /** Short description of the API. */
  summary?: string;
  /** Current lifecycle stage of the API. */
  readonly lifecycleStage?: LifecycleStage;
  /** Terms of service for the API. */
  termsOfService?: TermsOfService;
  /** The set of external documentation */
  externalDocumentation?: ExternalDocumentation[];
  /** The set of contacts */
  contacts?: Contact[];
  /** The license information for the API. */
  license?: License;
  /** The custom metadata defined for API catalog entities. */
  customProperties?: CustomProperties;
}

export function apiPropertiesSerializer(item: ApiProperties): any {
  return {
    title: item["title"],
    kind: item["kind"],
    description: item["description"],
    summary: item["summary"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServiceSerializer(item["termsOfService"]),
    externalDocumentation: !item["externalDocumentation"]
      ? item["externalDocumentation"]
      : externalDocumentationArraySerializer(item["externalDocumentation"]),
    contacts: !item["contacts"] ? item["contacts"] : contactArraySerializer(item["contacts"]),
    license: !item["license"] ? item["license"] : licenseSerializer(item["license"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesSerializer(item["customProperties"]),
  };
}

export function apiPropertiesDeserializer(item: any): ApiProperties {
  return {
    title: item["title"],
    kind: item["kind"],
    description: item["description"],
    summary: item["summary"],
    lifecycleStage: item["lifecycleStage"],
    termsOfService: !item["termsOfService"]
      ? item["termsOfService"]
      : termsOfServiceDeserializer(item["termsOfService"]),
    externalDocumentation: !item["externalDocumentation"]
      ? item["externalDocumentation"]
      : externalDocumentationArrayDeserializer(item["externalDocumentation"]),
    contacts: !item["contacts"] ? item["contacts"] : contactArrayDeserializer(item["contacts"]),
    license: !item["license"] ? item["license"] : licenseDeserializer(item["license"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesDeserializer(item["customProperties"]),
  };
}

/** The kind of the API */
export enum KnownApiKind {
  /** A Representational State Transfer Api */
  Rest = "rest",
  /** A Graph query language Api */
  Graphql = "graphql",
  /** A gRPC Api */
  Grpc = "grpc",
  /** A SOAP Api */
  Soap = "soap",
  /** Web Hook */
  Webhook = "webhook",
  /** Web Socket */
  Websocket = "websocket",
}

/**
 * The kind of the API \
 * {@link KnownApiKind} can be used interchangeably with ApiKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **rest**: A Representational State Transfer Api \
 * **graphql**: A Graph query language Api \
 * **grpc**: A gRPC Api \
 * **soap**: A SOAP Api \
 * **webhook**: Web Hook \
 * **websocket**: Web Socket
 */
export type ApiKind = string;

/** The stage of the Api development lifecycle */
export enum KnownLifecycleStage {
  /** design stage */
  Design = "design",
  /** development stage */
  Development = "development",
  /** testing stage */
  Testing = "testing",
  /** In preview */
  Preview = "preview",
  /** In production */
  Production = "production",
  /** deprecated stage */
  Deprecated = "deprecated",
  /** Retired stage */
  Retired = "retired",
}

/**
 * The stage of the Api development lifecycle \
 * {@link KnownLifecycleStage} can be used interchangeably with LifecycleStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **design**: design stage \
 * **development**: development stage \
 * **testing**: testing stage \
 * **preview**: In preview \
 * **production**: In production \
 * **deprecated**: deprecated stage \
 * **retired**: Retired stage
 */
export type LifecycleStage = string;

/** Terms of service for the API. */
export interface TermsOfService {
  /** URL pointing to the terms of service. */
  url: string;
}

export function termsOfServiceSerializer(item: TermsOfService): any {
  return { url: item["url"] };
}

export function termsOfServiceDeserializer(item: any): TermsOfService {
  return {
    url: item["url"],
  };
}

export function externalDocumentationArraySerializer(result: Array<ExternalDocumentation>): any[] {
  return result.map((item) => {
    return externalDocumentationSerializer(item);
  });
}

export function externalDocumentationArrayDeserializer(
  result: Array<ExternalDocumentation>,
): any[] {
  return result.map((item) => {
    return externalDocumentationDeserializer(item);
  });
}

/** Additional, external documentation for the API. */
export interface ExternalDocumentation {
  /** Title of the documentation. */
  title?: string;
  /** Description of the documentation. */
  description?: string;
  /** URL pointing to the documentation. */
  url: string;
}

export function externalDocumentationSerializer(item: ExternalDocumentation): any {
  return { title: item["title"], description: item["description"], url: item["url"] };
}

export function externalDocumentationDeserializer(item: any): ExternalDocumentation {
  return {
    title: item["title"],
    description: item["description"],
    url: item["url"],
  };
}

export function contactArraySerializer(result: Array<Contact>): any[] {
  return result.map((item) => {
    return contactSerializer(item);
  });
}

export function contactArrayDeserializer(result: Array<Contact>): any[] {
  return result.map((item) => {
    return contactDeserializer(item);
  });
}

/** Contact information */
export interface Contact {
  /** Name of the contact. */
  name?: string;
  /** URL for the contact. */
  url?: string;
  /** Email address of the contact. */
  email?: string;
}

export function contactSerializer(item: Contact): any {
  return { name: item["name"], url: item["url"], email: item["email"] };
}

export function contactDeserializer(item: any): Contact {
  return {
    name: item["name"],
    url: item["url"],
    email: item["email"],
  };
}

/** The license information for the API. */
export interface License {
  /** Name of the license. */
  name?: string;
  /**
   * URL pointing to the license details. The URL field is mutually exclusive of the
   * identifier field.
   */
  url?: string;
  /**
   * SPDX license information for the API. The identifier field is mutually
   * exclusive of the URL field.
   */
  identifier?: string;
}

export function licenseSerializer(item: License): any {
  return { name: item["name"], url: item["url"], identifier: item["identifier"] };
}

export function licenseDeserializer(item: any): License {
  return {
    name: item["name"],
    url: item["url"],
    identifier: item["identifier"],
  };
}

/** The custom metadata defined for API catalog entities. */
export interface CustomProperties {}

export function customPropertiesSerializer(_item: CustomProperties): any {
  return {};
}

export function customPropertiesDeserializer(item: any): CustomProperties {
  return item;
}

/** The response of a Api list operation. */
export interface _ApiListResult {
  /** The Api items on this page */
  readonly value: Api[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _apiListResultDeserializer(item: any): _ApiListResult {
  return {
    value: apiArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiArraySerializer(result: Array<Api>): any[] {
  return result.map((item) => {
    return apiSerializer(item);
  });
}

export function apiArrayDeserializer(result: Array<Api>): any[] {
  return result.map((item) => {
    return apiDeserializer(item);
  });
}

/** API version entity. */
export interface ApiVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ApiVersionProperties;
}

export function apiVersionSerializer(item: ApiVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : apiVersionPropertiesSerializer(item["properties"]),
  };
}

export function apiVersionDeserializer(item: any): ApiVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : apiVersionPropertiesDeserializer(item["properties"]),
  };
}

/** API version properties entity. */
export interface ApiVersionProperties {
  /** API version title. */
  title: string;
  /** Current lifecycle stage of the API. */
  lifecycleStage: LifecycleStage;
}

export function apiVersionPropertiesSerializer(item: ApiVersionProperties): any {
  return { title: item["title"], lifecycleStage: item["lifecycleStage"] };
}

export function apiVersionPropertiesDeserializer(item: any): ApiVersionProperties {
  return {
    title: item["title"],
    lifecycleStage: item["lifecycleStage"],
  };
}

/** The response of a ApiVersion list operation. */
export interface _ApiVersionListResult {
  /** The ApiVersion items on this page */
  readonly value: ApiVersion[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _apiVersionListResultDeserializer(item: any): _ApiVersionListResult {
  return {
    value: apiVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiVersionArraySerializer(result: Array<ApiVersion>): any[] {
  return result.map((item) => {
    return apiVersionSerializer(item);
  });
}

export function apiVersionArrayDeserializer(result: Array<ApiVersion>): any[] {
  return result.map((item) => {
    return apiVersionDeserializer(item);
  });
}

/** API definition entity. */
export interface ApiDefinition extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ApiDefinitionProperties;
}

export function apiDefinitionSerializer(item: ApiDefinition): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : apiDefinitionPropertiesSerializer(item["properties"]),
  };
}

export function apiDefinitionDeserializer(item: any): ApiDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : apiDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** API definition properties entity. */
export interface ApiDefinitionProperties {
  /** API definition title. */
  title: string;
  /** API definition description. */
  description?: string;
  /** API specification details. */
  readonly specification?: ApiDefinitionPropertiesSpecification;
}

export function apiDefinitionPropertiesSerializer(item: ApiDefinitionProperties): any {
  return { title: item["title"], description: item["description"] };
}

export function apiDefinitionPropertiesDeserializer(item: any): ApiDefinitionProperties {
  return {
    title: item["title"],
    description: item["description"],
    specification: !item["specification"]
      ? item["specification"]
      : apiDefinitionPropertiesSpecificationDeserializer(item["specification"]),
  };
}

/** API specification details. */
export interface ApiDefinitionPropertiesSpecification {
  /** Specification name. */
  name?: string;
  /** Specification version. */
  version?: string;
}

export function apiDefinitionPropertiesSpecificationDeserializer(
  item: any,
): ApiDefinitionPropertiesSpecification {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** The response of a ApiDefinition list operation. */
export interface _ApiDefinitionListResult {
  /** The ApiDefinition items on this page */
  readonly value: ApiDefinition[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _apiDefinitionListResultDeserializer(item: any): _ApiDefinitionListResult {
  return {
    value: apiDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiDefinitionArraySerializer(result: Array<ApiDefinition>): any[] {
  return result.map((item) => {
    return apiDefinitionSerializer(item);
  });
}

export function apiDefinitionArrayDeserializer(result: Array<ApiDefinition>): any[] {
  return result.map((item) => {
    return apiDefinitionDeserializer(item);
  });
}

/** The API specification source entity properties. */
export interface ApiSpecImportRequest {
  /** Value of the API specification source. */
  value?: string;
  /** Format of the API specification source. */
  format?: ApiSpecImportSourceFormat;
  /** API specification details. */
  specification?: ApiSpecImportRequestSpecification;
}

export function apiSpecImportRequestSerializer(item: ApiSpecImportRequest): any {
  return {
    value: item["value"],
    format: item["format"],
    specification: !item["specification"]
      ? item["specification"]
      : apiSpecImportRequestSpecificationSerializer(item["specification"]),
  };
}

/** Source format for imported Api spec */
export enum KnownApiSpecImportSourceFormat {
  /** The inlined content of a specification document. */
  Inline = "inline",
  /**
   * The link to a specification document hosted on a publicly accessible internet
   * address.
   */
  Link = "link",
}

/**
 * Source format for imported Api spec \
 * {@link KnownApiSpecImportSourceFormat} can be used interchangeably with ApiSpecImportSourceFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inline**: The inlined content of a specification document. \
 * **link**: The link to a specification document hosted on a publicly accessible internet
 * address.
 */
export type ApiSpecImportSourceFormat = string;

/** API specification details. */
export interface ApiSpecImportRequestSpecification {
  /** Specification name. */
  name?: string;
  /** Specification version. */
  version?: string;
}

export function apiSpecImportRequestSpecificationSerializer(
  item: ApiSpecImportRequestSpecification,
): any {
  return { name: item["name"], version: item["version"] };
}

/** The API specification export result. */
export interface ApiSpecExportResult {
  /** The format of exported result */
  format?: ApiSpecExportResultFormat;
  /** The result of the export operation. */
  value?: string;
}

export function apiSpecExportResultDeserializer(item: any): ApiSpecExportResult {
  return {
    format: item["format"],
    value: item["value"],
  };
}

/** Result format for exported Api spec */
export enum KnownApiSpecExportResultFormat {
  /** The inlined content of a specification document. */
  Inline = "inline",
  /** The link to the result of the export operation. The URL is valid for 5 minutes. */
  Link = "link",
}

/**
 * Result format for exported Api spec \
 * {@link KnownApiSpecExportResultFormat} can be used interchangeably with ApiSpecExportResultFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inline**: The inlined content of a specification document. \
 * **link**: The link to the result of the export operation. The URL is valid for 5 minutes.
 */
export type ApiSpecExportResultFormat = string;

/** API source entity. */
export interface ApiSource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ApiSourceProperties;
}

export function apiSourceSerializer(item: ApiSource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : apiSourcePropertiesSerializer(item["properties"]),
  };
}

export function apiSourceDeserializer(item: any): ApiSource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : apiSourcePropertiesDeserializer(item["properties"]),
  };
}

/** API source properties. */
export interface ApiSourceProperties {
  /** Indicates if the specification should be imported along with metadata. */
  importSpecification?: ImportSpecificationOptions;
  /** API source configuration for Azure API Management. */
  azureApiManagementSource?: AzureApiManagementSource;
  /** The target environment resource ID. */
  targetEnvironmentId?: string;
  /** The target lifecycle stage. */
  targetLifecycleStage?: LifecycleStage;
  /** The state of the API source link */
  readonly linkState?: LinkState;
}

export function apiSourcePropertiesSerializer(item: ApiSourceProperties): any {
  return {
    importSpecification: item["importSpecification"],
    azureApiManagementSource: !item["azureApiManagementSource"]
      ? item["azureApiManagementSource"]
      : azureApiManagementSourceSerializer(item["azureApiManagementSource"]),
    targetEnvironmentId: item["targetEnvironmentId"],
    targetLifecycleStage: item["targetLifecycleStage"],
  };
}

export function apiSourcePropertiesDeserializer(item: any): ApiSourceProperties {
  return {
    importSpecification: item["importSpecification"],
    azureApiManagementSource: !item["azureApiManagementSource"]
      ? item["azureApiManagementSource"]
      : azureApiManagementSourceDeserializer(item["azureApiManagementSource"]),
    targetEnvironmentId: item["targetEnvironmentId"],
    targetLifecycleStage: item["targetLifecycleStage"],
    linkState: !item["linkState"] ? item["linkState"] : linkStateDeserializer(item["linkState"]),
  };
}

/** The API source specification import options. */
export enum KnownImportSpecificationOptions {
  /** Indicates that the specification should be never be imported. */
  Never = "never",
  /** Indicates that the specification should be imported only by request. */
  OnDemand = "ondemand",
  /** Indicates that the specification should always be imported along with metadata. */
  Always = "always",
}

/**
 * The API source specification import options. \
 * {@link KnownImportSpecificationOptions} can be used interchangeably with ImportSpecificationOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **never**: Indicates that the specification should be never be imported. \
 * **ondemand**: Indicates that the specification should be imported only by request. \
 * **always**: Indicates that the specification should always be imported along with metadata.
 */
export type ImportSpecificationOptions = string;

/** API source configuration for Azure API Management. */
export interface AzureApiManagementSource {
  /** API Management service resource ID. */
  resourceId: string;
  /** The resource ID of the managed identity that has access to the API Management instance. */
  msiResourceId?: string;
}

export function azureApiManagementSourceSerializer(item: AzureApiManagementSource): any {
  return { resourceId: item["resourceId"], msiResourceId: item["msiResourceId"] };
}

export function azureApiManagementSourceDeserializer(item: any): AzureApiManagementSource {
  return {
    resourceId: item["resourceId"],
    msiResourceId: item["msiResourceId"],
  };
}

/** The link state. */
export interface LinkState {
  /** The state of the link. */
  state?: ApiSourceLinkState;
  /** The state message. */
  message?: string;
  /** The timestamp of the last update of the link state. */
  lastUpdatedOn: Date;
}

export function linkStateDeserializer(item: any): LinkState {
  return {
    state: item["state"],
    message: item["message"],
    lastUpdatedOn: new Date(item["lastUpdatedOn"]),
  };
}

/** The API source link state. */
export enum KnownApiSourceLinkState {
  /** The API source link is initializing. */
  Initializing = "initializing",
  /**
   * *
   * The API source is syncing.
   */
  Syncing = "syncing",
  /** The API source sync is blocked due to an error. */
  Error = "error",
  /** The API source is being deleted. */
  Deleting = "deleting",
}

/**
 * The API source link state. \
 * {@link KnownApiSourceLinkState} can be used interchangeably with ApiSourceLinkState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **initializing**: The API source link is initializing. \
 * **syncing**: *
 * The API source is syncing. \
 * **error**: The API source sync is blocked due to an error. \
 * **deleting**: The API source is being deleted.
 */
export type ApiSourceLinkState = string;

/** The response of a ApiSource list operation. */
export interface _ApiSourceListResult {
  /** The ApiSource items on this page */
  readonly value: ApiSource[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _apiSourceListResultDeserializer(item: any): _ApiSourceListResult {
  return {
    value: apiSourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiSourceArraySerializer(result: Array<ApiSource>): any[] {
  return result.map((item) => {
    return apiSourceSerializer(item);
  });
}

export function apiSourceArrayDeserializer(result: Array<ApiSource>): any[] {
  return result.map((item) => {
    return apiSourceDeserializer(item);
  });
}

/** API deployment entity. */
export interface Deployment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeploymentProperties;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesSerializer(item["properties"]),
  };
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesDeserializer(item["properties"]),
  };
}

/** API deployment entity properties. */
export interface DeploymentProperties {
  /** API deployment title */
  title?: string;
  /** Description of the deployment. */
  description?: string;
  /** API center-scoped environment resource ID. */
  environmentId?: string;
  /** API center-scoped definition resource ID. */
  definitionId?: string;
  /** State of API deployment. */
  state?: DeploymentState;
  /** The deployment server */
  server?: DeploymentServer;
  /** The custom metadata defined for API catalog entities. */
  customProperties?: CustomProperties;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    title: item["title"],
    description: item["description"],
    environmentId: item["environmentId"],
    definitionId: item["definitionId"],
    state: item["state"],
    server: !item["server"] ? item["server"] : deploymentServerSerializer(item["server"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesSerializer(item["customProperties"]),
  };
}

export function deploymentPropertiesDeserializer(item: any): DeploymentProperties {
  return {
    title: item["title"],
    description: item["description"],
    environmentId: item["environmentId"],
    definitionId: item["definitionId"],
    state: item["state"],
    server: !item["server"] ? item["server"] : deploymentServerDeserializer(item["server"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesDeserializer(item["customProperties"]),
  };
}

/** State of the Deployment */
export enum KnownDeploymentState {
  /** Active State */
  Active = "active",
  /** Inactive State */
  Inactive = "inactive",
}

/**
 * State of the Deployment \
 * {@link KnownDeploymentState} can be used interchangeably with DeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Active State \
 * **inactive**: Inactive State
 */
export type DeploymentState = string;

/** Server */
export interface DeploymentServer {
  /** Base runtime URLs for this deployment. */
  runtimeUri?: string[];
}

export function deploymentServerSerializer(item: DeploymentServer): any {
  return {
    runtimeUri: !item["runtimeUri"]
      ? item["runtimeUri"]
      : item["runtimeUri"].map((p: any) => {
          return p;
        }),
  };
}

export function deploymentServerDeserializer(item: any): DeploymentServer {
  return {
    runtimeUri: !item["runtimeUri"]
      ? item["runtimeUri"]
      : item["runtimeUri"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a Deployment list operation. */
export interface _DeploymentListResult {
  /** The Deployment items on this page */
  readonly value: Deployment[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _deploymentListResultDeserializer(item: any): _DeploymentListResult {
  return {
    value: deploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentArraySerializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentSerializer(item);
  });
}

export function deploymentArrayDeserializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentDeserializer(item);
  });
}

/** Environment entity. */
export interface Environment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EnvironmentProperties;
}

export function environmentSerializer(item: Environment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : environmentPropertiesSerializer(item["properties"]),
  };
}

export function environmentDeserializer(item: any): Environment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : environmentPropertiesDeserializer(item["properties"]),
  };
}

/** Environment properties entity. */
export interface EnvironmentProperties {
  /** Environment title. */
  title: string;
  /** The environment description. */
  description?: string;
  /** Environment kind. */
  kind: EnvironmentKind;
  /** Server information of the environment. */
  server?: EnvironmentServer;
  /** Environment onboarding information */
  onboarding?: Onboarding;
  /** The custom metadata defined for API catalog entities. */
  customProperties?: CustomProperties;
}

export function environmentPropertiesSerializer(item: EnvironmentProperties): any {
  return {
    title: item["title"],
    description: item["description"],
    kind: item["kind"],
    server: !item["server"] ? item["server"] : environmentServerSerializer(item["server"]),
    onboarding: !item["onboarding"] ? item["onboarding"] : onboardingSerializer(item["onboarding"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesSerializer(item["customProperties"]),
  };
}

export function environmentPropertiesDeserializer(item: any): EnvironmentProperties {
  return {
    title: item["title"],
    description: item["description"],
    kind: item["kind"],
    server: !item["server"] ? item["server"] : environmentServerDeserializer(item["server"]),
    onboarding: !item["onboarding"]
      ? item["onboarding"]
      : onboardingDeserializer(item["onboarding"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : customPropertiesDeserializer(item["customProperties"]),
  };
}

/** The kind of environment */
export enum KnownEnvironmentKind {
  /** Development environment */
  Development = "development",
  /** Testing environment */
  Testing = "testing",
  /** Staging environment */
  Staging = "staging",
  /** Production environment */
  Production = "production",
}

/**
 * The kind of environment \
 * {@link KnownEnvironmentKind} can be used interchangeably with EnvironmentKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **development**: Development environment \
 * **testing**: Testing environment \
 * **staging**: Staging environment \
 * **production**: Production environment
 */
export type EnvironmentKind = string;

/** Server information of the environment. */
export interface EnvironmentServer {
  /** Type of the server that represents the environment. */
  type?: EnvironmentServerType;
  /** The location of the management portal */
  managementPortalUri?: string[];
}

export function environmentServerSerializer(item: EnvironmentServer): any {
  return {
    type: item["type"],
    managementPortalUri: !item["managementPortalUri"]
      ? item["managementPortalUri"]
      : item["managementPortalUri"].map((p: any) => {
          return p;
        }),
  };
}

export function environmentServerDeserializer(item: any): EnvironmentServer {
  return {
    type: item["type"],
    managementPortalUri: !item["managementPortalUri"]
      ? item["managementPortalUri"]
      : item["managementPortalUri"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of environment server */
export enum KnownEnvironmentServerType {
  /** Api Management Server */
  AzureAPIManagement = "Azure API Management",
  /** Compute server */
  AzureComputeService = "Azure compute service",
  /** Apigee server */
  ApigeeAPIManagement = "Apigee API Management",
  /** AWS Api Gateway server */
  AWSAPIGateway = "AWS API Gateway",
  /** Kong API Gateway server */
  KongAPIGateway = "Kong API Gateway",
  /** Kubernetes server */
  Kubernetes = "Kubernetes",
  /** Mulesoft Api Management server */
  MuleSoftAPIManagement = "MuleSoft API Management",
}

/**
 * The type of environment server \
 * {@link KnownEnvironmentServerType} can be used interchangeably with EnvironmentServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure API Management**: Api Management Server \
 * **Azure compute service**: Compute server \
 * **Apigee API Management**: Apigee server \
 * **AWS API Gateway**: AWS Api Gateway server \
 * **Kong API Gateway**: Kong API Gateway server \
 * **Kubernetes**: Kubernetes server \
 * **MuleSoft API Management**: Mulesoft Api Management server
 */
export type EnvironmentServerType = string;

/** Onboarding information */
export interface Onboarding {
  /** Onboarding guide. */
  instructions?: string;
  /** The location of the development portal */
  developerPortalUri?: string[];
}

export function onboardingSerializer(item: Onboarding): any {
  return {
    instructions: item["instructions"],
    developerPortalUri: !item["developerPortalUri"]
      ? item["developerPortalUri"]
      : item["developerPortalUri"].map((p: any) => {
          return p;
        }),
  };
}

export function onboardingDeserializer(item: any): Onboarding {
  return {
    instructions: item["instructions"],
    developerPortalUri: !item["developerPortalUri"]
      ? item["developerPortalUri"]
      : item["developerPortalUri"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a Environment list operation. */
export interface _EnvironmentListResult {
  /** The Environment items on this page */
  readonly value: Environment[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _environmentListResultDeserializer(item: any): _EnvironmentListResult {
  return {
    value: environmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentArraySerializer(result: Array<Environment>): any[] {
  return result.map((item) => {
    return environmentSerializer(item);
  });
}

export function environmentArrayDeserializer(result: Array<Environment>): any[] {
  return result.map((item) => {
    return environmentDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The initial service version */
  V20240301 = "2024-03-01",
  /** Azure API Center 2024-03-15-preview */
  V20240315Preview = "2024-03-15-preview",
  /** Azure API Center 2024-06-01-preview */
  V20240601Preview = "2024-06-01-preview",
}
