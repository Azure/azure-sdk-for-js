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

/** The Prepared Image Specification resource. */
export interface PreparedImageSpecification extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PreparedImageSpecificationProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function preparedImageSpecificationSerializer(item: PreparedImageSpecification): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : preparedImageSpecificationPropertiesSerializer(item["properties"]),
  };
}

export function preparedImageSpecificationDeserializer(item: any): PreparedImageSpecification {
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
      : preparedImageSpecificationPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the Prepared Image Specification resource. */
export interface PreparedImageSpecificationProperties {
  /** The list of container images to cache on nodes. See https://kubernetes.io/docs/concepts/containers/images/#image-names */
  containerImages?: string[];
  /**
   * The identity used to execute prepared image specification tasks during image build time and provisioning time.
   * If not specified the default agentpool identity will be used.
   * This does not affect provisioned nodes.
   */
  identityProfile?: PreparedImageSpecificationManagedIdentityProfile;
  /** The client-provided version of the prepared image specification. */
  version?: string;
  /** The provisioning state of the prepared image specification. */
  readonly provisioningState?: ProvisioningState;
  /** The scripts to customize the node before or after image capture. */
  customizationScripts?: PreparedImageSpecificationScript[];
}

export function preparedImageSpecificationPropertiesSerializer(
  item: PreparedImageSpecificationProperties,
): any {
  return {
    containerImages: !item["containerImages"]
      ? item["containerImages"]
      : item["containerImages"].map((p: any) => {
          return p;
        }),
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : preparedImageSpecificationManagedIdentityProfileSerializer(item["identityProfile"]),
    version: item["version"],
    customizationScripts: !item["customizationScripts"]
      ? item["customizationScripts"]
      : preparedImageSpecificationScriptArraySerializer(item["customizationScripts"]),
  };
}

export function preparedImageSpecificationPropertiesDeserializer(
  item: any,
): PreparedImageSpecificationProperties {
  return {
    containerImages: !item["containerImages"]
      ? item["containerImages"]
      : item["containerImages"].map((p: any) => {
          return p;
        }),
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : preparedImageSpecificationManagedIdentityProfileDeserializer(item["identityProfile"]),
    version: item["version"],
    provisioningState: item["provisioningState"],
    customizationScripts: !item["customizationScripts"]
      ? item["customizationScripts"]
      : preparedImageSpecificationScriptArrayDeserializer(item["customizationScripts"]),
  };
}

/** The managed identity profile used by the prepared image specification. */
export interface PreparedImageSpecificationManagedIdentityProfile {
  /** The resource ID of the user-assigned managed identity. */
  resourceId: string;
  /** The object ID of the managed identity. */
  readonly objectId?: string;
  /** The client ID of the managed identity. */
  readonly clientId?: string;
}

export function preparedImageSpecificationManagedIdentityProfileSerializer(
  item: PreparedImageSpecificationManagedIdentityProfile,
): any {
  return { resourceId: item["resourceId"] };
}

export function preparedImageSpecificationManagedIdentityProfileDeserializer(
  item: any,
): PreparedImageSpecificationManagedIdentityProfile {
  return {
    resourceId: item["resourceId"],
    objectId: item["objectId"],
    clientId: item["clientId"],
  };
}

/** The provisioning state of the image customization. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Provisioning the resource is in progress */
  Provisioning = "Provisioning",
  /** Resource is being updated */
  Updating = "Updating",
  /** Resource is being deleted */
  Deleting = "Deleting",
  /** The change request has been accepted */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the image customization. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Provisioning the resource is in progress \
 * **Updating**: Resource is being updated \
 * **Deleting**: Resource is being deleted \
 * **Accepted**: The change request has been accepted
 */
export type ProvisioningState = string;

export function preparedImageSpecificationScriptArraySerializer(
  result: Array<PreparedImageSpecificationScript>,
): any[] {
  return result.map((item) => {
    return preparedImageSpecificationScriptSerializer(item);
  });
}

export function preparedImageSpecificationScriptArrayDeserializer(
  result: Array<PreparedImageSpecificationScript>,
): any[] {
  return result.map((item) => {
    return preparedImageSpecificationScriptDeserializer(item);
  });
}

/** Prepared image specification script */
export interface PreparedImageSpecificationScript {
  /**
   * The name for the customization script.
   * Must be unique within the prepared image specification resource.
   * Can only contain lowercase alphanumeric,'-' or '.' characters.
   */
  name: string;
  /**
   * The stage at which the script is executed.
   * Specifying `NodeImageBuildTime` will ensure changes are persisted into the node image.
   */
  executionPoint: ExecutionPoint;
  /** The runtime environment for the script (e.g. Bash). */
  scriptType: ScriptType;
  /** The script content to be executed in plain text. Do not include secrets. */
  script?: string;
  /** The action to take after successful script execution. */
  postScriptAction?: PostScriptAction;
}

export function preparedImageSpecificationScriptSerializer(
  item: PreparedImageSpecificationScript,
): any {
  return {
    name: item["name"],
    executionPoint: item["executionPoint"],
    scriptType: item["scriptType"],
    script: item["script"],
    postScriptAction: item["postScriptAction"],
  };
}

export function preparedImageSpecificationScriptDeserializer(
  item: any,
): PreparedImageSpecificationScript {
  return {
    name: item["name"],
    executionPoint: item["executionPoint"],
    scriptType: item["scriptType"],
    script: item["script"],
    postScriptAction: item["postScriptAction"],
  };
}

/** The execution point for the script. */
export enum KnownExecutionPoint {
  /** Execute during node image build time. */
  NodeImageBuildTime = "NodeImageBuildTime",
  /** Execute during node provisioning time. */
  NodeProvisionTime = "NodeProvisionTime",
}

/**
 * The execution point for the script. \
 * {@link KnownExecutionPoint} can be used interchangeably with ExecutionPoint,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NodeImageBuildTime**: Execute during node image build time. \
 * **NodeProvisionTime**: Execute during node provisioning time.
 */
export type ExecutionPoint = string;

/** The script type. */
export enum KnownScriptType {
  /** Bash script. */
  Bash = "Bash",
  /** PowerShell script. */
  PowerShell = "PowerShell",
}

/**
 * The script type. \
 * {@link KnownScriptType} can be used interchangeably with ScriptType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bash**: Bash script. \
 * **PowerShell**: PowerShell script.
 */
export type ScriptType = string;

/** The action to take after the script finishes successfully. */
export enum KnownPostScriptAction {
  /** No post-script action is taken. */
  None = "None",
  /** Reboot the node after the script completes. */
  RebootAfter = "RebootAfter",
}

/**
 * The action to take after the script finishes successfully. \
 * {@link KnownPostScriptAction} can be used interchangeably with PostScriptAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No post-script action is taken. \
 * **RebootAfter**: Reboot the node after the script completes.
 */
export type PostScriptAction = string;

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

/** Prepared image specification patch resource */
export interface PreparedImageSpecificationPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function preparedImageSpecificationPatchSerializer(
  item: PreparedImageSpecificationPatch,
): any {
  return { tags: item["tags"] };
}

/** The response of a PreparedImageSpecification list operation. */
export interface _PreparedImageSpecificationListResult {
  /** The PreparedImageSpecification items on this page */
  value: PreparedImageSpecification[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _preparedImageSpecificationListResultDeserializer(
  item: any,
): _PreparedImageSpecificationListResult {
  return {
    value: preparedImageSpecificationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function preparedImageSpecificationArraySerializer(
  result: Array<PreparedImageSpecification>,
): any[] {
  return result.map((item) => {
    return preparedImageSpecificationSerializer(item);
  });
}

export function preparedImageSpecificationArrayDeserializer(
  result: Array<PreparedImageSpecification>,
): any[] {
  return result.map((item) => {
    return preparedImageSpecificationDeserializer(item);
  });
}

/** A version of the Prepared Image Specification resource. */
export interface PreparedImageSpecificationVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PreparedImageSpecificationProperties;
}

export function preparedImageSpecificationVersionDeserializer(
  item: any,
): PreparedImageSpecificationVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : preparedImageSpecificationPropertiesDeserializer(item["properties"]),
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

/** The response of a PreparedImageSpecificationVersion list operation. */
export interface _PreparedImageSpecificationVersionListResult {
  /** The PreparedImageSpecificationVersion items on this page */
  value: PreparedImageSpecificationVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _preparedImageSpecificationVersionListResultDeserializer(
  item: any,
): _PreparedImageSpecificationVersionListResult {
  return {
    value: preparedImageSpecificationVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function preparedImageSpecificationVersionArrayDeserializer(
  result: Array<PreparedImageSpecificationVersion>,
): any[] {
  return result.map((item) => {
    return preparedImageSpecificationVersionDeserializer(item);
  });
}

/** Azure Kubernetes Prepared Image Specification api versions. */
export enum KnownVersions {
  /** Azure Kubernetes Prepared Image Specification api version 2026-02-02-preview. */
  V20260202Preview = "2026-02-02-preview",
}
