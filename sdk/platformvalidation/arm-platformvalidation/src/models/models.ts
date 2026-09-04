// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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

/** Cloud Validation Resource */
export interface CloudValidation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudValidationProperties;
}

export function cloudValidationSerializer(item: CloudValidation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudValidationPropertiesSerializer(item["properties"]),
  };
}

export function cloudValidationDeserializer(item: any): CloudValidation {
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
      : cloudValidationPropertiesDeserializer(item["properties"]),
  };
}

/** Cloud Validation properties */
export interface CloudValidationProperties {
  /** The description of the resource. */
  description?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Error details. Populated when provisioningState is Failed or Canceled. */
  readonly error?: ErrorDetail;
  /** The overall state of the resource. */
  overallState?: CloudValidationOverallState;
  /** Managed On Behalf Of Configuration. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
}

export function cloudValidationPropertiesSerializer(item: CloudValidationProperties): any {
  return { description: item["description"], overallState: item["overallState"] };
}

export function cloudValidationPropertiesDeserializer(item: any): CloudValidationProperties {
  return {
    description: item["description"],
    provisioningState: item["provisioningState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    overallState: item["overallState"],
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
  };
}

/** The resource provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  Creating = "Creating",
  /** The resource is updating. */
  Updating = "Updating",
  /** The resource is being disabled. */
  Disabling = "Disabling",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * The resource provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The resource is being provisioned. \
 * **Updating**: The resource is updating. \
 * **Disabling**: The resource is being disabled. \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

/** The Overall states of the validation resource. */
export enum KnownCloudValidationOverallState {
  /** The resource is in enabled state. */
  Enabled = "Enabled",
  /** The resource is in disabled state. */
  Disabled = "Disabled",
}

/**
 * The Overall states of the validation resource. \
 * {@link KnownCloudValidationOverallState} can be used interchangeably with CloudValidationOverallState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The resource is in enabled state. \
 * **Disabled**: The resource is in disabled state.
 */
export type CloudValidationOverallState = string;

/** Managed-On-Behalf-Of configuration properties. This configuration exists for the resources where a resource provider manages those resources on behalf of the resource owner. */
export interface ManagedOnBehalfOfConfiguration {
  /** Managed-On-Behalf-Of broker resources */
  readonly moboBrokerResources?: MoboBrokerResource[];
}

export function managedOnBehalfOfConfigurationDeserializer(
  item: any,
): ManagedOnBehalfOfConfiguration {
  return {
    moboBrokerResources: !item["moboBrokerResources"]
      ? item["moboBrokerResources"]
      : moboBrokerResourceArrayDeserializer(item["moboBrokerResources"]),
  };
}

export function moboBrokerResourceArrayDeserializer(result: Array<MoboBrokerResource>): any[] {
  return result.map((item) => {
    return moboBrokerResourceDeserializer(item);
  });
}

/** Managed-On-Behalf-Of broker resource. This resource is created by the Resource Provider to manage some resources on behalf of the user. */
export interface MoboBrokerResource {
  /** Resource identifier of a Managed-On-Behalf-Of broker resource */
  id?: string;
}

export function moboBrokerResourceDeserializer(item: any): MoboBrokerResource {
  return {
    id: item["id"],
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

/** The type used for update operations of the CloudValidation. */
export interface CloudValidationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudValidationUpdateProperties;
}

export function cloudValidationUpdateSerializer(item: CloudValidationUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudValidationUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the CloudValidation. */
export interface CloudValidationUpdateProperties {
  /** The description of the resource. */
  description?: string;
  /** The overall state of the resource. */
  overallState?: CloudValidationOverallState;
}

export function cloudValidationUpdatePropertiesSerializer(
  item: CloudValidationUpdateProperties,
): any {
  return { description: item["description"], overallState: item["overallState"] };
}

/** The response of a CloudValidation list operation. */
export interface _CloudValidationListResult {
  /** The CloudValidation items on this page */
  value: CloudValidation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudValidationListResultDeserializer(item: any): _CloudValidationListResult {
  return {
    value: cloudValidationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudValidationArraySerializer(result: Array<CloudValidation>): any[] {
  return result.map((item) => {
    return cloudValidationSerializer(item);
  });
}

export function cloudValidationArrayDeserializer(result: Array<CloudValidation>): any[] {
  return result.map((item) => {
    return cloudValidationDeserializer(item);
  });
}

/** Validation Test Execution Plan */
export interface ValidationExecutionPlan extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationExecutionPlanProperties;
}

export function validationExecutionPlanSerializer(item: ValidationExecutionPlan): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : validationExecutionPlanPropertiesSerializer(item["properties"]),
  };
}

export function validationExecutionPlanDeserializer(item: any): ValidationExecutionPlan {
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
      : validationExecutionPlanPropertiesDeserializer(item["properties"]),
  };
}

/** Validation Test Execution Plan properties */
export interface ValidationExecutionPlanProperties {
  /** The description of the resource. */
  description?: string;
  /**
   * URI where the configuration of the execution plan is defined.
   * Either this property or `planConfigurationJson` is mandatory while creating; they are mutually exclusive.
   * This value is returned as-is in get responses, so it must not contain credentials or other secrets.
   */
  planConfigurationUri?: string;
  /**
   * Entire execution plan configuration/manifest json.
   * Either this property or `planConfigurationUri` is mandatory while creating; they are mutually exclusive.
   * In get, always return the entire json configuration.
   * This value is returned as-is in get responses, so it must not contain credentials or other secrets.
   */
  planConfigurationJson?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ValidationExecutionPlanProvisioningState;
  /** Error details. Populated when provisioningState is Failed or Canceled. */
  readonly error?: ErrorDetail;
  /** The overall state of the resource. */
  overallState?: ValidationExecutionPlanOverallState;
}

export function validationExecutionPlanPropertiesSerializer(
  item: ValidationExecutionPlanProperties,
): any {
  return {
    description: item["description"],
    planConfigurationUri: item["planConfigurationUri"],
    planConfigurationJson: item["planConfigurationJson"],
    overallState: item["overallState"],
  };
}

export function validationExecutionPlanPropertiesDeserializer(
  item: any,
): ValidationExecutionPlanProperties {
  return {
    description: item["description"],
    planConfigurationUri: item["planConfigurationUri"],
    planConfigurationJson: item["planConfigurationJson"],
    provisioningState: item["provisioningState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    overallState: item["overallState"],
  };
}

/** The execution plan resource provisioning state. */
export enum KnownValidationExecutionPlanProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  Creating = "Creating",
  /** The resource is updating. */
  Updating = "Updating",
}

/**
 * The execution plan resource provisioning state. \
 * {@link KnownValidationExecutionPlanProvisioningState} can be used interchangeably with ValidationExecutionPlanProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The resource is being provisioned. \
 * **Updating**: The resource is updating.
 */
export type ValidationExecutionPlanProvisioningState = string;

/** The Overall states of the validation execution plan. */
export enum KnownValidationExecutionPlanOverallState {
  /** The resource is in enabled state. */
  Enabled = "Enabled",
  /** The resource is in disabled state. */
  Disabled = "Disabled",
}

/**
 * The Overall states of the validation execution plan. \
 * {@link KnownValidationExecutionPlanOverallState} can be used interchangeably with ValidationExecutionPlanOverallState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The resource is in enabled state. \
 * **Disabled**: The resource is in disabled state.
 */
export type ValidationExecutionPlanOverallState = string;

/** The type used for update operations of the ValidationExecutionPlan. */
export interface ValidationExecutionPlanUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ValidationExecutionPlanUpdateProperties;
}

export function validationExecutionPlanUpdateSerializer(item: ValidationExecutionPlanUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : validationExecutionPlanUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ValidationExecutionPlan. */
export interface ValidationExecutionPlanUpdateProperties {
  /** The description of the resource. */
  description?: string;
  /**
   * URI where the configuration of the execution plan is defined.
   * Either this property or `planConfigurationJson` is mandatory while creating; they are mutually exclusive.
   * This value is returned as-is in get responses, so it must not contain credentials or other secrets.
   */
  planConfigurationUri?: string;
  /**
   * Entire execution plan configuration/manifest json.
   * Either this property or `planConfigurationUri` is mandatory while creating; they are mutually exclusive.
   * In get, always return the entire json configuration.
   * This value is returned as-is in get responses, so it must not contain credentials or other secrets.
   */
  planConfigurationJson?: string;
  /** The overall state of the resource. */
  overallState?: ValidationExecutionPlanOverallState;
}

export function validationExecutionPlanUpdatePropertiesSerializer(
  item: ValidationExecutionPlanUpdateProperties,
): any {
  return {
    description: item["description"],
    planConfigurationUri: item["planConfigurationUri"],
    planConfigurationJson: item["planConfigurationJson"],
    overallState: item["overallState"],
  };
}

/** The response of a ValidationExecutionPlan list operation. */
export interface _ValidationExecutionPlanListResult {
  /** The ValidationExecutionPlan items on this page */
  value: ValidationExecutionPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validationExecutionPlanListResultDeserializer(
  item: any,
): _ValidationExecutionPlanListResult {
  return {
    value: validationExecutionPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validationExecutionPlanArraySerializer(
  result: Array<ValidationExecutionPlan>,
): any[] {
  return result.map((item) => {
    return validationExecutionPlanSerializer(item);
  });
}

export function validationExecutionPlanArrayDeserializer(
  result: Array<ValidationExecutionPlan>,
): any[] {
  return result.map((item) => {
    return validationExecutionPlanDeserializer(item);
  });
}

/** The properties of the execution plan run. */
export interface ExecutionPlanRun extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ExecutionPlanRunProperties;
}

export function executionPlanRunSerializer(item: ExecutionPlanRun): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : executionPlanRunPropertiesSerializer(item["properties"]),
  };
}

export function executionPlanRunDeserializer(item: any): ExecutionPlanRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : executionPlanRunPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the execution plan run. */
export interface ExecutionPlanRunProperties {
  /** The description of the resource. */
  description?: string;
  /** The status of the execution plan run. */
  readonly status?: ExecutionPlanRunStatus;
  /** Error details. Populated when status is Failed, TimedOut, or Unknown. */
  readonly error?: ErrorDetail;
  /** The start time of the execution plan run. */
  readonly startedAt?: Date;
  /** The completion time of the execution plan run. */
  readonly completedAt?: Date;
  /** The time at which the execution result was reported. */
  readonly reportedAt?: Date;
  /** Summary of tests executed for this run. */
  readonly testRunSummary?: TestRunSummary;
  /** Snapshot of the execution plan configuration captured at trigger time. */
  readonly planConfigurationSnapshot?: string;
  /** The ARM resource IDs of the validation test runs (ValidationTestRun resources) executed as part of this execution plan run. */
  readonly testRunIds?: string[];
  /** The provisioning state of the execution plan run. */
  readonly provisioningState?: ExecutionPlanRunProvisioningState;
}

export function executionPlanRunPropertiesSerializer(item: ExecutionPlanRunProperties): any {
  return { description: item["description"] };
}

export function executionPlanRunPropertiesDeserializer(item: any): ExecutionPlanRunProperties {
  return {
    description: item["description"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    reportedAt: !item["reportedAt"] ? item["reportedAt"] : new Date(item["reportedAt"]),
    testRunSummary: !item["testRunSummary"]
      ? item["testRunSummary"]
      : testRunSummaryDeserializer(item["testRunSummary"]),
    planConfigurationSnapshot: item["planConfigurationSnapshot"],
    testRunIds: !item["testRunIds"]
      ? item["testRunIds"]
      : item["testRunIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The status of the execution plan run. */
export enum KnownExecutionPlanRunStatus {
  /** The execution plan run is succeeded. */
  Succeeded = "Succeeded",
  /** The execution plan run has been queued. */
  Queued = "Queued",
  /** The execution plan run is running. */
  Running = "Running",
  /** The execution plan run is completed. */
  Completed = "Completed",
  /** The execution plan run is failed. */
  Failed = "Failed",
  /** The execution plan run is timed out. */
  TimedOut = "TimedOut",
  /** The execution plan run is unknown. */
  Unknown = "Unknown",
}

/**
 * The status of the execution plan run. \
 * {@link KnownExecutionPlanRunStatus} can be used interchangeably with ExecutionPlanRunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The execution plan run is succeeded. \
 * **Queued**: The execution plan run has been queued. \
 * **Running**: The execution plan run is running. \
 * **Completed**: The execution plan run is completed. \
 * **Failed**: The execution plan run is failed. \
 * **TimedOut**: The execution plan run is timed out. \
 * **Unknown**: The execution plan run is unknown.
 */
export type ExecutionPlanRunStatus = string;

/** Execution summary details for a validation test run collection. */
export interface TestRunSummary {
  /** Total number of tests executed. */
  totalTests?: number;
  /** Number of passed tests. */
  passedTests?: number;
  /** Number of failed tests. */
  failedTests?: number;
  /** Number of skipped tests. */
  skippedTests?: number;
  /** Overall result for the execution plan run. */
  overallResult?: TestRunOverallResult;
  /** Human-readable summary message. */
  message?: string;
}

export function testRunSummaryDeserializer(item: any): TestRunSummary {
  return {
    totalTests: item["totalTests"],
    passedTests: item["passedTests"],
    failedTests: item["failedTests"],
    skippedTests: item["skippedTests"],
    overallResult: item["overallResult"],
    message: item["message"],
  };
}

/** The overall result of a validation test run collection. */
export enum KnownTestRunOverallResult {
  /** All tests passed. */
  Passed = "Passed",
  /** One or more tests failed. */
  Failed = "Failed",
  /** Some tests passed and some failed. */
  PartiallyPassed = "PartiallyPassed",
}

/**
 * The overall result of a validation test run collection. \
 * {@link KnownTestRunOverallResult} can be used interchangeably with TestRunOverallResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Passed**: All tests passed. \
 * **Failed**: One or more tests failed. \
 * **PartiallyPassed**: Some tests passed and some failed.
 */
export type TestRunOverallResult = string;

/** The provisioning state of the execution plan run. */
export enum KnownExecutionPlanRunProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The execution plan run is in progress. */
  Creating = "Creating",
  /** The execution plan run is running. */
  Running = "Running",
  /** The execution plan run is waiting. */
  Waiting = "Waiting",
  /** The execution plan run is partially executed. */
  Processing = "Processing",
}

/**
 * The provisioning state of the execution plan run. \
 * {@link KnownExecutionPlanRunProvisioningState} can be used interchangeably with ExecutionPlanRunProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The execution plan run is in progress. \
 * **Running**: The execution plan run is running. \
 * **Waiting**: The execution plan run is waiting. \
 * **Processing**: The execution plan run is partially executed.
 */
export type ExecutionPlanRunProvisioningState = string;

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

/** The response of a ExecutionPlanRun list operation. */
export interface _ExecutionPlanRunListResult {
  /** The ExecutionPlanRun items on this page */
  value: ExecutionPlanRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _executionPlanRunListResultDeserializer(item: any): _ExecutionPlanRunListResult {
  return {
    value: executionPlanRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function executionPlanRunArraySerializer(result: Array<ExecutionPlanRun>): any[] {
  return result.map((item) => {
    return executionPlanRunSerializer(item);
  });
}

export function executionPlanRunArrayDeserializer(result: Array<ExecutionPlanRun>): any[] {
  return result.map((item) => {
    return executionPlanRunDeserializer(item);
  });
}

/** Validation Test Run represents execution instance(s) of a Validation Test instance under execution plan. */
export interface ValidationTestRun extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationTestRunProperties;
}

export function validationTestRunDeserializer(item: any): ValidationTestRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validationTestRunPropertiesDeserializer(item["properties"]),
  };
}

/** Validation Test Run properties. */
export interface ValidationTestRunProperties {
  /** The overall status of the test run. */
  readonly status?: ValidationTestRunStatus;
  /** Error details. Populated when status is Error. */
  readonly error?: ErrorDetail;
  /** The state of the test run. */
  readonly provisioningState?: ValidationTestRunProvisioningState;
  /** The start time of the test run. */
  readonly startedAt?: Date;
  /** The completion time of the test run. */
  readonly completedAt?: Date;
  /** The time at which the test run result was reported. */
  readonly reportedAt?: Date;
  /** The name of the validation test (ValidationTest resource name, not an ARM resource ID) in the validation test catalog. */
  testId?: string;
  /**
   * Validation test run inputs json, conforming to the input contract declared by `ValidationTestInput` on the corresponding validation test.
   * This value is returned as-is in get responses, so it must not contain credentials or other secrets.
   */
  inputsJson?: string;
  /** Detailed pass information when the test passes. */
  readonly passDetails?: ValidationTestPassDetails[];
  /** Detailed failure information when the test fails. */
  readonly failureDetails?: ValidationTestFailureDetails[];
}

export function validationTestRunPropertiesDeserializer(item: any): ValidationTestRunProperties {
  return {
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    provisioningState: item["provisioningState"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    reportedAt: !item["reportedAt"] ? item["reportedAt"] : new Date(item["reportedAt"]),
    testId: item["testId"],
    inputsJson: item["inputsJson"],
    passDetails: !item["passDetails"]
      ? item["passDetails"]
      : validationTestPassDetailsArrayDeserializer(item["passDetails"]),
    failureDetails: !item["failureDetails"]
      ? item["failureDetails"]
      : validationTestFailureDetailsArrayDeserializer(item["failureDetails"]),
  };
}

/** The overall status of the test run. */
export enum KnownValidationTestRunStatus {
  /** The test run is not running. */
  NotRunning = "NotRunning",
  /** The test run is scheduled. */
  Scheduled = "Scheduled",
  /** The test run is ready. */
  Ready = "Ready",
  /** The test run is running. */
  Running = "Running",
  /** The test run is completed. */
  Completed = "Completed",
  /** The test run is stopped. */
  Stopped = "Stopped",
  /** The test run is errored out. */
  Error = "Error",
}

/**
 * The overall status of the test run. \
 * {@link KnownValidationTestRunStatus} can be used interchangeably with ValidationTestRunStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotRunning**: The test run is not running. \
 * **Scheduled**: The test run is scheduled. \
 * **Ready**: The test run is ready. \
 * **Running**: The test run is running. \
 * **Completed**: The test run is completed. \
 * **Stopped**: The test run is stopped. \
 * **Error**: The test run is errored out.
 */
export type ValidationTestRunStatus = string;

/** The provisioning state of the validation test run. */
export enum KnownValidationTestRunProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The validation test run is in progress. */
  Running = "Running",
}

/**
 * The provisioning state of the validation test run. \
 * {@link KnownValidationTestRunProvisioningState} can be used interchangeably with ValidationTestRunProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Running**: The validation test run is in progress.
 */
export type ValidationTestRunProvisioningState = string;

export function validationTestPassDetailsArrayDeserializer(
  result: Array<ValidationTestPassDetails>,
): any[] {
  return result.map((item) => {
    return validationTestPassDetailsDeserializer(item);
  });
}

/** Detailed information about test pass. */
export interface ValidationTestPassDetails {
  /** Result code categorizing the type of pass. */
  readonly resultCode?: string;
  /** test name which passed. */
  readonly testName?: string;
  /** Detailed information about the passed test. */
  readonly resultDetails?: string;
}

export function validationTestPassDetailsDeserializer(item: any): ValidationTestPassDetails {
  return {
    resultCode: item["resultCode"],
    testName: item["testName"],
    resultDetails: item["resultDetails"],
  };
}

export function validationTestFailureDetailsArrayDeserializer(
  result: Array<ValidationTestFailureDetails>,
): any[] {
  return result.map((item) => {
    return validationTestFailureDetailsDeserializer(item);
  });
}

/** Detailed information about test failure. */
export interface ValidationTestFailureDetails {
  /** Error code categorizing the type of failure. */
  readonly errorCode?: string;
  /** Human-readable error message describing the failure. */
  readonly errorMessage?: string;
  /** Detailed information about the failure. */
  readonly details?: string;
  /** Additional diagnostic information. */
  readonly diagnosticInfo?: string;
  /** Suggested remediation steps for the customer. */
  readonly recommendedActions?: string[];
}

export function validationTestFailureDetailsDeserializer(item: any): ValidationTestFailureDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    details: item["details"],
    diagnosticInfo: item["diagnosticInfo"],
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : item["recommendedActions"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a ValidationTestRun list operation. */
export interface _ValidationTestRunListResult {
  /** The ValidationTestRun items on this page */
  value: ValidationTestRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validationTestRunListResultDeserializer(item: any): _ValidationTestRunListResult {
  return {
    value: validationTestRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validationTestRunArrayDeserializer(result: Array<ValidationTestRun>): any[] {
  return result.map((item) => {
    return validationTestRunDeserializer(item);
  });
}

/** Validation test catalog entry. */
export interface ValidationTest extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationTestProperties;
}

export function validationTestDeserializer(item: any): ValidationTest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validationTestPropertiesDeserializer(item["properties"]),
  };
}

/** Validation test catalog properties. */
export interface ValidationTestProperties {
  /** Validation test description. */
  description?: string;
  /** Audience visibility of this validation test. */
  audience?: CatalogAudience;
  /** Provisioning state of the validation test catalog resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The names of the validation test categories (ValidationTestCategory resource names, not ARM resource IDs) associated with this test. */
  categoryIds?: string[];
  /** Overall state of the validation test. */
  overallState?: ValidationTestOverallState;
  /**
   * Owners of the validation test definition, expressed as aliases.
   * Only catalog publishers(limited to microsoft internal only) set this value through an internal publishing process; end users of the validation
   * service consume catalog entries read-only through Get/List and cannot modify it.
   */
  owners?: string[];
  /** Declared input contract for this validation test. */
  inputs?: ValidationTestInput[];
  /** URI of the location where the test artifact is stored. */
  testStoreUri?: string;
  /** The resource ID of the current immutable version snapshot. */
  currentVersion?: string;
  /** The resource ID of the latest published version snapshot. */
  latestPublishedVersion?: string;
  /** Timestamp of the last version publication. */
  lastPublishedAt?: Date;
}

export function validationTestPropertiesDeserializer(item: any): ValidationTestProperties {
  return {
    description: item["description"],
    audience: item["audience"],
    provisioningState: item["provisioningState"],
    categoryIds: !item["categoryIds"]
      ? item["categoryIds"]
      : item["categoryIds"].map((p: any) => {
          return p;
        }),
    overallState: item["overallState"],
    owners: !item["owners"]
      ? item["owners"]
      : item["owners"].map((p: any) => {
          return p;
        }),
    inputs: !item["inputs"] ? item["inputs"] : validationTestInputArrayDeserializer(item["inputs"]),
    testStoreUri: item["testStoreUri"],
    currentVersion: item["currentVersion"],
    latestPublishedVersion: item["latestPublishedVersion"],
    lastPublishedAt: !item["lastPublishedAt"]
      ? item["lastPublishedAt"]
      : new Date(item["lastPublishedAt"]),
  };
}

/** Audience visibility of a published catalog item. */
export enum KnownCatalogAudience {
  /** Visible to all customers, including first-party and third-party callers. */
  Public = "Public",
  /** Visible only to authorized Microsoft-internal callers. */
  Internal = "Internal",
}

/**
 * Audience visibility of a published catalog item. \
 * {@link KnownCatalogAudience} can be used interchangeably with CatalogAudience,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Visible to all customers, including first-party and third-party callers. \
 * **Internal**: Visible only to authorized Microsoft-internal callers.
 */
export type CatalogAudience = string;

/** The overall state of a validation test or test version. */
export enum KnownValidationTestOverallState {
  /** The validation test definition is in draft state. */
  Draft = "Draft",
  /** The validation test definition is active. */
  Active = "Active",
  /** The validation test definition is published. */
  Published = "Published",
  /** The validation test definition is disabled. */
  Disabled = "Disabled",
}

/**
 * The overall state of a validation test or test version. \
 * {@link KnownValidationTestOverallState} can be used interchangeably with ValidationTestOverallState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Draft**: The validation test definition is in draft state. \
 * **Active**: The validation test definition is active. \
 * **Published**: The validation test definition is published. \
 * **Disabled**: The validation test definition is disabled.
 */
export type ValidationTestOverallState = string;

export function validationTestInputArrayDeserializer(result: Array<ValidationTestInput>): any[] {
  return result.map((item) => {
    return validationTestInputDeserializer(item);
  });
}

/** A named declared input parameter for a validation test contract. */
export interface ValidationTestInput {
  /** The input parameter name. */
  name: string;
  /** The declared contract for this input parameter. */
  definition: ValidationTestInputDefinition;
}

export function validationTestInputDeserializer(item: any): ValidationTestInput {
  return {
    name: item["name"],
    definition: validationTestInputDefinitionDeserializer(item["definition"]),
  };
}

/** Declared contract for a validation test input parameter. */
export interface ValidationTestInputDefinition {
  /** Description of the declared input parameter. */
  description?: string;
  /** The data type expected for this input parameter. */
  type?: ValidationTestInputDataType;
  /** Whether this input parameter is required. */
  required?: boolean;
  /** Optional default value to use when input is not provided. */
  defaultValue?: string;
  /** Allowed values for this input parameter. */
  allowedValues?: string[];
}

export function validationTestInputDefinitionDeserializer(
  item: any,
): ValidationTestInputDefinition {
  return {
    description: item["description"],
    type: item["type"],
    required: item["required"],
    defaultValue: item["defaultValue"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported data types for a declared test input. */
export enum KnownValidationTestInputDataType {
  /** String input value. */
  String = "String",
  /** Integer input value. */
  Integer = "Integer",
  /** Numeric input value. */
  Number = "Number",
  /** Boolean input value. */
  Boolean = "Boolean",
  /** Object input value. */
  Object = "Object",
  /** Array input value. */
  Array = "Array",
}

/**
 * Supported data types for a declared test input. \
 * {@link KnownValidationTestInputDataType} can be used interchangeably with ValidationTestInputDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String input value. \
 * **Integer**: Integer input value. \
 * **Number**: Numeric input value. \
 * **Boolean**: Boolean input value. \
 * **Object**: Object input value. \
 * **Array**: Array input value.
 */
export type ValidationTestInputDataType = string;

/** The response of a ValidationTest list operation. */
export interface _ValidationTestListResult {
  /** The ValidationTest items on this page */
  value: ValidationTest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validationTestListResultDeserializer(item: any): _ValidationTestListResult {
  return {
    value: validationTestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validationTestArrayDeserializer(result: Array<ValidationTest>): any[] {
  return result.map((item) => {
    return validationTestDeserializer(item);
  });
}

/** Validation test version catalog entry. */
export interface ValidationTestVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationTestVersionProperties;
}

export function validationTestVersionDeserializer(item: any): ValidationTestVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validationTestVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Validation test version catalog properties. */
export interface ValidationTestVersionProperties {
  /** Validation test description. */
  description?: string;
  /** Audience visibility of this validation test version. */
  audience?: CatalogAudience;
  /** Provisioning state of the validation test version catalog resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The names of the validation test categories (ValidationTestCategory resource names, not ARM resource IDs) associated with this test version. */
  categoryIds?: string[];
  /** Overall state of the validation test. */
  overallState?: ValidationTestOverallState;
  /**
   * Owners of the validation test version definition, expressed as email aliases or Microsoft Entra object IDs.
   * Only catalog publishers set this value through an internal publishing process; end users of the validation
   * service consume catalog entries read-only through Get/List and cannot modify it.
   */
  owners?: string[];
  /** Declared input contract for this validation test version. */
  inputs?: ValidationTestInput[];
  /** SHA-256 hash of the version content used for integrity and deduplication. */
  contentHash?: string;
  /** URI of the location where the test artifact is stored. */
  testStoreUri?: string;
}

export function validationTestVersionPropertiesDeserializer(
  item: any,
): ValidationTestVersionProperties {
  return {
    description: item["description"],
    audience: item["audience"],
    provisioningState: item["provisioningState"],
    categoryIds: !item["categoryIds"]
      ? item["categoryIds"]
      : item["categoryIds"].map((p: any) => {
          return p;
        }),
    overallState: item["overallState"],
    owners: !item["owners"]
      ? item["owners"]
      : item["owners"].map((p: any) => {
          return p;
        }),
    inputs: !item["inputs"] ? item["inputs"] : validationTestInputArrayDeserializer(item["inputs"]),
    contentHash: item["contentHash"],
    testStoreUri: item["testStoreUri"],
  };
}

/** The response of a ValidationTestVersion list operation. */
export interface _ValidationTestVersionListResult {
  /** The ValidationTestVersion items on this page */
  value: ValidationTestVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validationTestVersionListResultDeserializer(
  item: any,
): _ValidationTestVersionListResult {
  return {
    value: validationTestVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validationTestVersionArrayDeserializer(
  result: Array<ValidationTestVersion>,
): any[] {
  return result.map((item) => {
    return validationTestVersionDeserializer(item);
  });
}

/** Validation test category catalog entry. */
export interface ValidationTestCategory extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationTestCategoryProperties;
}

export function validationTestCategoryDeserializer(item: any): ValidationTestCategory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validationTestCategoryPropertiesDeserializer(item["properties"]),
  };
}

/** Validation test category properties. */
export interface ValidationTestCategoryProperties {
  /** Display name of the validation test category. */
  displayName?: string;
  /** Validation test category description. */
  description?: string;
  /** Audience visibility of this validation test category. */
  audience?: CatalogAudience;
  /** Provisioning state of the validation test category catalog resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /**
   * Parent validation test category id. Categories form a two-level hierarchy only:
   * a top-level category leaves this unset, and a sub-category sets this to its
   * top-level parent's category id. Sub-categories cannot themselves have sub-categories,
   * and a category must not reference itself as its own parent.
   */
  parentCategoryId?: string;
  /**
   * Owners of the validation test category, expressed as email aliases or Microsoft Entra object IDs.
   * Only catalog publishers set this value through an internal publishing process; end users of the validation
   * service consume catalog entries read-only through Get/List and cannot modify it.
   */
  owners?: string[];
}

export function validationTestCategoryPropertiesDeserializer(
  item: any,
): ValidationTestCategoryProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    audience: item["audience"],
    provisioningState: item["provisioningState"],
    parentCategoryId: item["parentCategoryId"],
    owners: !item["owners"]
      ? item["owners"]
      : item["owners"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a ValidationTestCategory list operation. */
export interface _ValidationTestCategoryListResult {
  /** The ValidationTestCategory items on this page */
  value: ValidationTestCategory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validationTestCategoryListResultDeserializer(
  item: any,
): _ValidationTestCategoryListResult {
  return {
    value: validationTestCategoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validationTestCategoryArrayDeserializer(
  result: Array<ValidationTestCategory>,
): any[] {
  return result.map((item) => {
    return validationTestCategoryDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-08-01-preview version */
  V20260801Preview = "2026-08-01-preview",
}
