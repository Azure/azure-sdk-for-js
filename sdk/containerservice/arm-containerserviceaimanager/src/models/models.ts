// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { stringToUint8Array } from "@azure/core-util";

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

/** The AI Manager resource. For more information, see https://aka.ms/aks/aimanager. */
export interface AIManager extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AIManagerProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function aiManagerSerializer(item: AIManager): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : aiManagerPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function aiManagerDeserializer(item: any): AIManager {
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
      : aiManagerPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** AI Manager properties. */
export interface AIManagerProperties {
  /** The status of the last operation. */
  readonly provisioningState?: AIManagerProvisioningState;
  /** Delete options of the AI Manager. Defaults to `Delete` if not specified. */
  deletePolicy?: DeletePolicy;
  /** The name of the managed resource group created by the AI Manager to hold underlying infrastructure resources. */
  readonly managedResourceGroupName?: string;
}

export function aiManagerPropertiesSerializer(item: AIManagerProperties): any {
  return { deletePolicy: item["deletePolicy"] };
}

export function aiManagerPropertiesDeserializer(item: any): AIManagerProperties {
  return {
    provisioningState: item["provisioningState"],
    deletePolicy: item["deletePolicy"],
    managedResourceGroupName: item["managedResourceGroupName"],
  };
}

/** The provisioning state of the AI Manager resource. */
export enum KnownAIManagerProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is being created. */
  Creating = "Creating",
  /** Resource is updating. */
  Updating = "Updating",
  /** Resource is deleting. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the AI Manager resource. \
 * {@link KnownAIManagerProvisioningState} can be used interchangeably with AIManagerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Resource is being created. \
 * **Updating**: Resource is updating. \
 * **Deleting**: Resource is deleting.
 */
export type AIManagerProvisioningState = string;

/** Delete options of the AI Manager. */
export enum KnownDeletePolicy {
  /** Keep the underlying cluster resources even if the AIManager resource is deleted. */
  Keep = "Keep",
  /** Delete both the underlying cluster resources and the AIManager resource together. */
  Delete = "Delete",
}

/**
 * Delete options of the AI Manager. \
 * {@link KnownDeletePolicy} can be used interchangeably with DeletePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Keep the underlying cluster resources even if the AIManager resource is deleted. \
 * **Delete**: Delete both the underlying cluster resources and the AIManager resource together.
 */
export type DeletePolicy = string;

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

/** The AI Manager resource patch model. */
export interface AIManagerPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function aiManagerPatchSerializer(item: AIManagerPatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a AIManager list operation. */
export interface _AIManagerListResult {
  /** The AIManager items on this page */
  value: AIManager[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiManagerListResultDeserializer(item: any): _AIManagerListResult {
  return {
    value: aiManagerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiManagerArraySerializer(result: Array<AIManager>): any[] {
  return result.map((item) => {
    return aiManagerSerializer(item);
  });
}

export function aiManagerArrayDeserializer(result: Array<AIManager>): any[] {
  return result.map((item) => {
    return aiManagerDeserializer(item);
  });
}

/** The list credential result response. */
export interface CredentialResults {
  /** Array of credential results. */
  readonly kubeconfigs?: CredentialResult[];
}

export function credentialResultsDeserializer(item: any): CredentialResults {
  return {
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : credentialResultArrayDeserializer(item["kubeconfigs"]),
  };
}

export function credentialResultArrayDeserializer(result: Array<CredentialResult>): any[] {
  return result.map((item) => {
    return credentialResultDeserializer(item);
  });
}

/** The credential result response. */
export interface CredentialResult {
  /** The name of the credential. */
  readonly name?: string;
  /** Base64-encoded Kubernetes configuration file. */
  readonly value?: Uint8Array;
}

export function credentialResultDeserializer(item: any): CredentialResult {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** The AI Manager namespace resource. */
export interface AIManagerNamespace extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AIManagerNamespaceProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function aiManagerNamespaceSerializer(item: AIManagerNamespace): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiManagerNamespacePropertiesSerializer(item["properties"]),
  };
}

export function aiManagerNamespaceDeserializer(item: any): AIManagerNamespace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiManagerNamespacePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** AI Manager namespace properties. */
export interface AIManagerNamespaceProperties {
  /** The status of the last operation. */
  readonly provisioningState?: AIManagerNamespaceProvisioningState;
  /** Labels applied to the Kubernetes namespace. */
  labels?: Record<string, string>;
  /** Annotations applied to the Kubernetes namespace. */
  annotations?: Record<string, string>;
}

export function aiManagerNamespacePropertiesSerializer(item: AIManagerNamespaceProperties): any {
  return { labels: item["labels"], annotations: item["annotations"] };
}

export function aiManagerNamespacePropertiesDeserializer(item: any): AIManagerNamespaceProperties {
  return {
    provisioningState: item["provisioningState"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    annotations: !item["annotations"]
      ? item["annotations"]
      : Object.fromEntries(
          Object.entries(item["annotations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The provisioning state of the AI Manager namespace resource. */
export enum KnownAIManagerNamespaceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a namespace being created. */
  Creating = "Creating",
  /** The provisioning state of a namespace being updated. */
  Updating = "Updating",
  /** The provisioning state of a namespace being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the AI Manager namespace resource. \
 * {@link KnownAIManagerNamespaceProvisioningState} can be used interchangeably with AIManagerNamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The provisioning state of a namespace being created. \
 * **Updating**: The provisioning state of a namespace being updated. \
 * **Deleting**: The provisioning state of a namespace being deleted.
 */
export type AIManagerNamespaceProvisioningState = string;

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

/** The response of a AIManagerNamespace list operation. */
export interface _AIManagerNamespaceListResult {
  /** The AIManagerNamespace items on this page */
  value: AIManagerNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiManagerNamespaceListResultDeserializer(
  item: any,
): _AIManagerNamespaceListResult {
  return {
    value: aiManagerNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiManagerNamespaceArraySerializer(result: Array<AIManagerNamespace>): any[] {
  return result.map((item) => {
    return aiManagerNamespaceSerializer(item);
  });
}

export function aiManagerNamespaceArrayDeserializer(result: Array<AIManagerNamespace>): any[] {
  return result.map((item) => {
    return aiManagerNamespaceDeserializer(item);
  });
}

/** Access information for an AI Manager namespace, including the OpenAI-compatible gateway endpoint and the API keys used to authenticate against it. */
export interface NamespaceAccessInfo {
  /** OpenAI-compatible inference gateway base URL (for example, `https://team-alpha.<cluster>.<region>.aksapp.io/v1`). */
  readonly endpoint: string;
  /** Primary API key. Send as `Authorization: Bearer <key>` or `api-key: <key>`. Treat as secret; do not log or persist in plaintext. */
  readonly primaryKey: string;
  /** Secondary API key, accepted by the gateway in the same headers as `primaryKey`. Generated independently when the namespace is created, then overwritten by the previous `primaryKey` on each `rotateKeys` call so clients can roll over without downtime. Treat as secret; do not log or persist in plaintext. */
  readonly secondaryKey: string;
  /** UTC time the keys were last rotated by `rotateKeys`. Absent until the first rotation. Clients can use this to detect rotation and refresh cached credentials. */
  readonly lastRotatedAt?: Date;
}

export function namespaceAccessInfoDeserializer(item: any): NamespaceAccessInfo {
  return {
    endpoint: item["endpoint"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    lastRotatedAt: !item["lastRotatedAt"] ? item["lastRotatedAt"] : new Date(item["lastRotatedAt"]),
  };
}

/** An AI model exposed by Microsoft.ContainerService. Read-only, globally-shared catalog entry that is platform-maintained and auto-provisioned by the resource provider. Can be referenced by `ModelDeployment` resources. */
export interface AIModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AIModelProperties;
}

export function aiModelDeserializer(item: any): AIModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiModelPropertiesDeserializer(item["properties"]),
  };
}

/** AI model properties. */
export interface AIModelProperties {
  /** The Hugging Face model identifier in `<org>/<repo>` form, e.g. `microsoft/Phi-4-mini-instruct`. Uniquely identifies the upstream model that backs this catalog entry. */
  readonly modelId: string;
  /** An optional, free-form description of the model. */
  readonly description?: string;
  /** Specification of the model. */
  readonly spec: ModelSpec;
}

export function aiModelPropertiesDeserializer(item: any): AIModelProperties {
  return {
    modelId: item["modelId"],
    description: item["description"],
    spec: modelSpecDeserializer(item["spec"]),
  };
}

/** The specification of a model. All fields are read-only. */
export interface ModelSpec {
  /** The license of the model, when known. SPDX license identifier, e.g. `mit`, `apache-2.0`. */
  readonly license?: string;
  /** Whether access to the model is restricted and requires credential. */
  readonly isRestricted: boolean;
  /** The maximum context length supported by the model, in tokens. */
  readonly maxContextLength: number;
}

export function modelSpecDeserializer(item: any): ModelSpec {
  return {
    license: item["license"],
    isRestricted: item["isRestricted"],
    maxContextLength: item["maxContextLength"],
  };
}

/** The response of a AIModel list operation. */
export interface _AIModelListResult {
  /** The AIModel items on this page */
  value: AIModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiModelListResultDeserializer(item: any): _AIModelListResult {
  return {
    value: aiModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiModelArrayDeserializer(result: Array<AIModel>): any[] {
  return result.map((item) => {
    return aiModelDeserializer(item);
  });
}

/** Request body for the AI model `calculateCost` action. */
export interface CalculateCostRequest {}

export function calculateCostRequestSerializer(_item: CalculateCostRequest): any {
  return {};
}

/** Response body for the AI model `calculateCost` action. */
export interface CalculateCostResponse {
  /** ISO 4217 currency code, e.g. "USD". */
  readonly currency: string;
  /** Ranked list of GPU SKU pricing plans. Feasible plans first, ordered by `totalHourlyPrice` ascending; infeasible plans last. */
  readonly plans: CalculateCostPlan[];
}

export function calculateCostResponseDeserializer(item: any): CalculateCostResponse {
  return {
    currency: item["currency"],
    plans: calculateCostPlanArrayDeserializer(item["plans"]),
  };
}

export function calculateCostPlanArrayDeserializer(result: Array<CalculateCostPlan>): any[] {
  return result.map((item) => {
    return calculateCostPlanDeserializer(item);
  });
}

/** A GPU SKU pricing plan returned by the `calculateCost` action. Describes the cost of running a single model replica on the specified `vmSize`. To estimate the cost of running multiple replicas, scale `totalHourlyPrice` by the desired replica count, bounded by `maxAvailableReplicas`. */
export interface CalculateCostPlan {
  /** Azure VM SKU, e.g. "Standard_ND96isr_H100_v5". Matches the value accepted by `ModelDeploymentProperties.vmSize`. */
  readonly vmSize: string;
  /** Resolved quantization on this SKU. */
  readonly quantization?: string;
  /** Number of VMs required to host one replica on this SKU. */
  readonly vmsPerReplica: number;
  /** Maximum number of replicas the caller's subscription can deploy on this SKU today, computed from the available GPU quota in the target region. */
  readonly maxAvailableReplicas: number;
  /** Estimated relative inference performance of a single model replica on this SKU. Omitted when an estimate is unavailable. */
  readonly servingPerformanceEstimation?: ServingPerformanceEstimation;
  /** On-demand hourly price for a single VM of this SKU, in `currency`. */
  readonly vmHourlyPrice: number;
  /** Projected hourly cost for one replica (`vmsPerReplica` VMs), in `currency`. */
  readonly totalHourlyPrice?: number;
  /** UTC timestamp of the price snapshot used for this plan. */
  readonly priceAsOf?: Date;
  /**
   * Whether the caller can actually deploy this plan today (region availability, GPU quota, model fit, etc.). This field gates the mutually exclusive properties on this model:
   * - When `feasible` is `true`: `totalHourlyPrice` is set and `infeasibilityReason` is omitted.
   * - When `feasible` is `false`: `infeasibilityReason` is set and `totalHourlyPrice` is omitted.
   */
  readonly feasible: boolean;
  /** Reason explaining why the plan is not deployable. This is a per-plan annotation, not an ARM error envelope. */
  readonly infeasibilityReason?: InfeasibilityReason;
}

export function calculateCostPlanDeserializer(item: any): CalculateCostPlan {
  return {
    vmSize: item["vmSize"],
    quantization: item["quantization"],
    vmsPerReplica: item["vmsPerReplica"],
    maxAvailableReplicas: item["maxAvailableReplicas"],
    servingPerformanceEstimation: !item["servingPerformanceEstimation"]
      ? item["servingPerformanceEstimation"]
      : servingPerformanceEstimationDeserializer(item["servingPerformanceEstimation"]),
    vmHourlyPrice: item["vmHourlyPrice"],
    totalHourlyPrice: item["totalHourlyPrice"],
    priceAsOf: !item["priceAsOf"] ? item["priceAsOf"] : new Date(item["priceAsOf"]),
    feasible: item["feasible"],
    infeasibilityReason: !item["infeasibilityReason"]
      ? item["infeasibilityReason"]
      : infeasibilityReasonDeserializer(item["infeasibilityReason"]),
  };
}

/** Estimated relative inference performance of a single model replica on a given GPU SKU. Each metric is a scaling coefficient in the range `[0, 1]` relative to the best-performing SKU for this model, which scores `1`. */
export interface ServingPerformanceEstimation {
  /** Relative inference latency score in `[0, 1]`. Higher is better (`1` matches the best-performing SKU's latency for this model). Note: this is a normalized score, not a raw latency ratio -- a larger value indicates lower latency. */
  readonly relativeLatencyScore: number;
  /** Relative inference throughput score in `[0, 1]`. Higher is better (`1` matches the best-performing SKU's throughput for this model). */
  readonly relativeThroughputScore: number;
}

export function servingPerformanceEstimationDeserializer(item: any): ServingPerformanceEstimation {
  return {
    relativeLatencyScore: item["relativeLatencyScore"],
    relativeThroughputScore: item["relativeThroughputScore"],
  };
}

/** Reason explaining why a `CalculateCostPlan` is not deployable. This is a per-plan annotation surfaced inside a successful `calculateCost` response, not an ARM error envelope. */
export interface InfeasibilityReason {
  /** Machine-readable reason code. */
  readonly code: InfeasibleCode;
  /** Human-readable message accompanying `code`. */
  readonly message: string;
}

export function infeasibilityReasonDeserializer(item: any): InfeasibilityReason {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The reason a `CalculateCostPlan` is not deployable. */
export enum KnownInfeasibleCode {
  /** The caller's subscription does not have enough GPU quota in the target region to deploy this plan. */
  InsufficientQuota = "InsufficientQuota",
  /** The VM SKU is not available in the target region. */
  RegionUnavailable = "RegionUnavailable",
  /** The deployment can start successfully on this SKU, but its estimated runtime performance falls below the acceptable threshold for serving this model. */
  InefficientDeployment = "InefficientDeployment",
}

/**
 * The reason a `CalculateCostPlan` is not deployable. \
 * {@link KnownInfeasibleCode} can be used interchangeably with InfeasibleCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InsufficientQuota**: The caller's subscription does not have enough GPU quota in the target region to deploy this plan. \
 * **RegionUnavailable**: The VM SKU is not available in the target region. \
 * **InefficientDeployment**: The deployment can start successfully on this SKU, but its estimated runtime performance falls below the acceptable threshold for serving this model.
 */
export type InfeasibleCode = string;

/** A model source registered with an AI Manager. Describes an external model registry (e.g. Hugging Face) and the credentials the platform uses to pull artifacts from it. */
export interface ModelSource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ModelSourceProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function modelSourceSerializer(item: ModelSource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : modelSourcePropertiesSerializer(item["properties"]),
  };
}

export function modelSourceDeserializer(item: any): ModelSource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : modelSourcePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Model source properties. */
export interface ModelSourceProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Model source type. Constrains the legal authentication kinds. Immutable after creation. */
  sourceType: ModelSourceType;
  /** An optional, free-form description of the source. */
  description?: string;
  /** Credential the platform uses to authenticate to the source. Optional for public sources (e.g. ungated Hugging Face models). */
  credential?: CredentialValue;
}

export function modelSourcePropertiesSerializer(item: ModelSourceProperties): any {
  return {
    sourceType: item["sourceType"],
    description: item["description"],
    credential: !item["credential"]
      ? item["credential"]
      : credentialValueSerializer(item["credential"]),
  };
}

export function modelSourcePropertiesDeserializer(item: any): ModelSourceProperties {
  return {
    provisioningState: item["provisioningState"],
    sourceType: item["sourceType"],
    description: item["description"],
    credential: !item["credential"]
      ? item["credential"]
      : credentialValueDeserializer(item["credential"]),
  };
}

/** The type of a model source. */
export enum KnownModelSourceType {
  /** A Hugging Face model registry. */
  HuggingFace = "HuggingFace",
}

/**
 * The type of a model source. \
 * {@link KnownModelSourceType} can be used interchangeably with ModelSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HuggingFace**: A Hugging Face model registry.
 */
export type ModelSourceType = string;

/**
 * A credential value. Exactly one variant must be set.
 *
 * In the current API version, only the `inline` variant is supported. Future
 * API versions are expected to add additional credential kinds (for example,
 * managed identity and Key Vault secret references) as sibling variants on
 * this model.
 */
export interface CredentialValue {
  /** An inline credential containing a secret value supplied in the request payload. */
  inline?: InlineCredential;
}

export function credentialValueSerializer(item: CredentialValue): any {
  return { inline: !item["inline"] ? item["inline"] : inlineCredentialSerializer(item["inline"]) };
}

export function credentialValueDeserializer(item: any): CredentialValue {
  return {
    inline: !item["inline"] ? item["inline"] : inlineCredentialDeserializer(item["inline"]),
  };
}

/** A credential provided inline. */
export interface InlineCredential {
  /** The access token, password, or other secret value. */
  value: string;
}

export function inlineCredentialSerializer(item: InlineCredential): any {
  return { value: item["value"] };
}

export function inlineCredentialDeserializer(item: any): InlineCredential {
  return {
    value: item["value"],
  };
}

/** The response of a ModelSource list operation. */
export interface _ModelSourceListResult {
  /** The ModelSource items on this page */
  value: ModelSource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _modelSourceListResultDeserializer(item: any): _ModelSourceListResult {
  return {
    value: modelSourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modelSourceArraySerializer(result: Array<ModelSource>): any[] {
  return result.map((item) => {
    return modelSourceSerializer(item);
  });
}

export function modelSourceArrayDeserializer(result: Array<ModelSource>): any[] {
  return result.map((item) => {
    return modelSourceDeserializer(item);
  });
}

/**
 * A running deployment of a model in an AI Manager namespace.
 *
 * PUT (create or update) on this resource is a full replace: the request body
 * represents the complete desired state, and any optional property omitted
 * from the body is reset to its default value (or cleared, if it has no
 * default). Callers must always send the full desired state on every PUT.
 */
export interface ModelDeployment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ModelDeploymentProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function modelDeploymentSerializer(item: ModelDeployment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : modelDeploymentPropertiesSerializer(item["properties"]),
  };
}

export function modelDeploymentDeserializer(item: any): ModelDeployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : modelDeploymentPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Model deployment properties. */
export interface ModelDeploymentProperties {
  /** The status of the last reconciliation. */
  readonly provisioningState?: ModelDeploymentProvisioningState;
  /** Full ARM resource id of the model to deploy. Phase 1 accepts an `AIModel` resource id only. Immutable after creation. */
  modelResourceId: string;
  /** Full ARM resource id of a `ModelSource` to use when pulling artifacts for this deployment. Immutable after creation. */
  modelSourceResourceId?: string;
  /** Runtime performance mode. */
  performanceMode?: ModelDeploymentPerformanceMode;
  /** Azure VM SKU used to host the deployment, e.g. "Standard_NC96ads_A100_v4". Immutable after creation. */
  vmSize: string;
  /** Scaling configuration for the deployment. Provide either `manual` (fixed replica count) or `autoscale` (autoscaling between min/max replicas), but not both. */
  scale?: ScalingProfile;
  /** User overrides layered on top of profile resolution. */
  overrides?: ModelDeploymentOverrides;
  /** Runtime status, populated once reconciliation begins. */
  readonly status?: ModelDeploymentStatus;
}

export function modelDeploymentPropertiesSerializer(item: ModelDeploymentProperties): any {
  return {
    modelResourceId: item["modelResourceId"],
    modelSourceResourceId: item["modelSourceResourceId"],
    performanceMode: item["performanceMode"],
    vmSize: item["vmSize"],
    scale: !item["scale"] ? item["scale"] : scalingProfileSerializer(item["scale"]),
    overrides: !item["overrides"]
      ? item["overrides"]
      : modelDeploymentOverridesSerializer(item["overrides"]),
  };
}

export function modelDeploymentPropertiesDeserializer(item: any): ModelDeploymentProperties {
  return {
    provisioningState: item["provisioningState"],
    modelResourceId: item["modelResourceId"],
    modelSourceResourceId: item["modelSourceResourceId"],
    performanceMode: item["performanceMode"],
    vmSize: item["vmSize"],
    scale: !item["scale"] ? item["scale"] : scalingProfileDeserializer(item["scale"]),
    overrides: !item["overrides"]
      ? item["overrides"]
      : modelDeploymentOverridesDeserializer(item["overrides"]),
    status: !item["status"] ? item["status"] : modelDeploymentStatusDeserializer(item["status"]),
  };
}

/** The provisioning state of a model deployment resource. */
export enum KnownModelDeploymentProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is being created. */
  Creating = "Creating",
  /** Resource is updating. */
  Updating = "Updating",
  /** Resource is deleting. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of a model deployment resource. \
 * {@link KnownModelDeploymentProvisioningState} can be used interchangeably with ModelDeploymentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Resource is being created. \
 * **Updating**: Resource is updating. \
 * **Deleting**: Resource is deleting.
 */
export type ModelDeploymentProvisioningState = string;

/** The runtime performance mode of a model deployment. */
export enum KnownModelDeploymentPerformanceMode {
  /** A balanced trade-off between latency and throughput (default). */
  Balanced = "Balanced",
  /** Optimize for low request latency. */
  Latency = "Latency",
  /** Optimize for high aggregate throughput. */
  Throughput = "Throughput",
}

/**
 * The runtime performance mode of a model deployment. \
 * {@link KnownModelDeploymentPerformanceMode} can be used interchangeably with ModelDeploymentPerformanceMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Balanced**: A balanced trade-off between latency and throughput (default). \
 * **Latency**: Optimize for low request latency. \
 * **Throughput**: Optimize for high aggregate throughput.
 */
export type ModelDeploymentPerformanceMode = string;

/**
 * Scaling configuration for a model deployment. Exactly one of `manual` or
 * `autoscale` must be set.
 *
 * This mutual-exclusion constraint is enforced by the service at request
 * validation time, not by the schema. A PUT request that sets both `manual`
 * and `autoscale`, or sets neither, is rejected with HTTP 400 (Bad Request)
 * and an `InvalidScalingProfile` error code;
 *
 * Scale-to-zero semantics differ between the two modes:
 * - `manual` permits `replicas: 0`. This is an explicit operator action to
 *   stop serving traffic while keeping the `ModelDeployment` resource (and
 *   its configuration) in place. While at zero replicas the endpoint
 *   returns errors for inference requests, and the deployment releases its
 *   GPU capacity.
 * - `autoscale` does not permit `minReplicas: 0`. Autoscaling decisions are
 *   driven by serving-server runtime metrics (request rate, queue depth,
 *   GPU utilization); at zero replicas there is no signal for the
 *   autoscaler to scale back up from. Combined with GPU cold-start time
 *   (on the order of minutes) and constrained regional GPU capacity, a
 *   scale-from-zero event would produce unacceptable first-request latency
 *   and a high risk of capacity unavailability. Callers that want
 *   autoscaling with an idle state should delete the `ModelDeployment`
 *   instead.
 */
export interface ScalingProfile {
  /** Manual scaling configuration with a fixed replica count. Mutually exclusive with `autoscale`. */
  manual?: ManualScalingProfile;
  /** Autoscaling configuration. Mutually exclusive with `manual`. */
  autoscale?: AutoscaleProfile;
}

export function scalingProfileSerializer(item: ScalingProfile): any {
  return {
    manual: !item["manual"] ? item["manual"] : manualScalingProfileSerializer(item["manual"]),
    autoscale: !item["autoscale"]
      ? item["autoscale"]
      : autoscaleProfileSerializer(item["autoscale"]),
  };
}

export function scalingProfileDeserializer(item: any): ScalingProfile {
  return {
    manual: !item["manual"] ? item["manual"] : manualScalingProfileDeserializer(item["manual"]),
    autoscale: !item["autoscale"]
      ? item["autoscale"]
      : autoscaleProfileDeserializer(item["autoscale"]),
  };
}

/** Manual scaling configuration: fixed replica count. */
export interface ManualScalingProfile {
  /** Fixed number of replicas. May be `0` to stop serving traffic while keeping the deployment configuration (see `ScalingProfile`). */
  replicas: number;
}

export function manualScalingProfileSerializer(item: ManualScalingProfile): any {
  return { replicas: item["replicas"] };
}

export function manualScalingProfileDeserializer(item: any): ManualScalingProfile {
  return {
    replicas: item["replicas"],
  };
}

/** Autoscaling configuration: scale replica count between a minimum and maximum. */
export interface AutoscaleProfile {
  /** The minimum number of replicas. Must be at least `1`; scale-to-zero is not supported in autoscale mode (see `ScalingProfile`). */
  minReplicas: number;
  /** The maximum number of replicas. If not specified, the service derives a default from the subscription GPU quota. */
  maxReplicas?: number;
}

export function autoscaleProfileSerializer(item: AutoscaleProfile): any {
  return { minReplicas: item["minReplicas"], maxReplicas: item["maxReplicas"] };
}

export function autoscaleProfileDeserializer(item: any): AutoscaleProfile {
  return {
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
  };
}

/** User overrides for a model deployment. */
export interface ModelDeploymentOverrides {
  /** Experimental free-form override key/value pairs. Subject to change without notice; not part of the stable contract. Recognized keys are documented per release and may be added, renamed, or removed at any time. */
  values?: Record<string, string>;
}

export function modelDeploymentOverridesSerializer(item: ModelDeploymentOverrides): any {
  return { values: item["values"] };
}

export function modelDeploymentOverridesDeserializer(item: any): ModelDeploymentOverrides {
  return {
    values: !item["values"]
      ? item["values"]
      : Object.fromEntries(Object.entries(item["values"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The runtime status of a model deployment. All fields are read-only and populated once reconciliation has started. */
export interface ModelDeploymentStatus {
  /** The inference endpoint URL exposed by the deployment, once ready. */
  readonly endpoint?: string;
  /** The inference engine used to serve the model, e.g. "vllm". */
  readonly engine?: string;
  /** The version of the inference engine, e.g. "0.17". */
  readonly engineVersion?: string;
  /** The maximum model context length, in tokens, configured for this deployment. */
  readonly maxModelLen?: number;
  /** The quantization level applied to the model weights, e.g. "fp16", "awq-int4". */
  readonly quantization?: string;
  /** The desired replica count reported by the controller. Equals `properties.scale.manual.replicas` when manual scaling is used; current target replica count derived from autoscaler otherwise. */
  readonly desiredReplicas?: number;
  /** The current number of ready replicas serving traffic. */
  readonly currentReplicas?: number;
  /** The peak tokens per minute measured by live stress test. */
  readonly peakTokensPerMinute?: number;
  /** Estimated total time, in seconds, for the deployment to become ready end-to-end (GPU vm provisioning, image/weight pull, engine warm-up). */
  readonly estimatedProvisionTimeSeconds?: number;
}

export function modelDeploymentStatusDeserializer(item: any): ModelDeploymentStatus {
  return {
    endpoint: item["endpoint"],
    engine: item["engine"],
    engineVersion: item["engineVersion"],
    maxModelLen: item["maxModelLen"],
    quantization: item["quantization"],
    desiredReplicas: item["desiredReplicas"],
    currentReplicas: item["currentReplicas"],
    peakTokensPerMinute: item["peakTokensPerMinute"],
    estimatedProvisionTimeSeconds: item["estimatedProvisionTimeSeconds"],
  };
}

/** The response of a ModelDeployment list operation. */
export interface _ModelDeploymentListResult {
  /** The ModelDeployment items on this page */
  value: ModelDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _modelDeploymentListResultDeserializer(item: any): _ModelDeploymentListResult {
  return {
    value: modelDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modelDeploymentArraySerializer(result: Array<ModelDeployment>): any[] {
  return result.map((item) => {
    return modelDeploymentSerializer(item);
  });
}

export function modelDeploymentArrayDeserializer(result: Array<ModelDeployment>): any[] {
  return result.map((item) => {
    return modelDeploymentDeserializer(item);
  });
}

/** Azure Kubernetes AI Manager api versions. */
export enum KnownVersions {
  /** Azure Kubernetes AI Manager api version 2026-04-02-preview. */
  V20260402Preview = "2026-04-02-preview",
  /** Azure Kubernetes AI Manager api version 2026-05-02-preview. */
  V20260502Preview = "2026-05-02-preview",
}
