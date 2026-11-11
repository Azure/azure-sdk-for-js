// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** The Sovereign View resource type. */
export interface SovereignViewResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SovereignViewResourceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function sovereignViewResourceSerializer(item: SovereignViewResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sovereignViewResourcePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function sovereignViewResourceDeserializer(item: any): SovereignViewResource {
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
      : sovereignViewResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of the sovereign view resource type. */
export interface SovereignViewResourceProperties {
  /** The scope to apply for configuration. */
  scope: SovereignViewScope;
  /** The policy initiatives selected for the sovereign view. */
  policyInitiatives: SovereignViewPolicyInitiativeDetail[];
  /** Stable regulatory-document key selected when this Sovereign View was created. */
  regulatoryDocumentName?: SovereignViewRegulatoryDocumentName;
  /** The status of a user-initiated, control-plane operation on the sovereign view resource type. */
  readonly provisioningState?: ProvisioningState;
  /** Optional per-dimension evaluation settings. */
  dimensionSettings?: SovereignViewDimensionSettings;
  /** Indicates whether the Sovereign View is considered a workload. */
  isWorkload?: boolean;
}

export function sovereignViewResourcePropertiesSerializer(
  item: SovereignViewResourceProperties,
): any {
  return {
    scope: sovereignViewScopeSerializer(item["scope"]),
    policyInitiatives: sovereignViewPolicyInitiativeDetailArraySerializer(
      item["policyInitiatives"],
    ),
    regulatoryDocumentName: item["regulatoryDocumentName"],
    dimensionSettings: !item["dimensionSettings"]
      ? item["dimensionSettings"]
      : sovereignViewDimensionSettingsSerializer(item["dimensionSettings"]),
    isWorkload: item["isWorkload"],
  };
}

export function sovereignViewResourcePropertiesDeserializer(
  item: any,
): SovereignViewResourceProperties {
  return {
    scope: sovereignViewScopeDeserializer(item["scope"]),
    policyInitiatives: sovereignViewPolicyInitiativeDetailArrayDeserializer(
      item["policyInitiatives"],
    ),
    regulatoryDocumentName: item["regulatoryDocumentName"],
    provisioningState: item["provisioningState"],
    dimensionSettings: !item["dimensionSettings"]
      ? item["dimensionSettings"]
      : sovereignViewDimensionSettingsDeserializer(item["dimensionSettings"]),
    isWorkload: item["isWorkload"],
  };
}

/** The scope for the sovereign view in terms of the resources it would evaluate. */
export interface SovereignViewScope {
  /** The management groups in scope. */
  managementGroups?: SovereignViewManagementGroupScope[];
  /** The subscriptions in scope. */
  subscriptions?: SovereignViewSubscriptionScope[];
}

export function sovereignViewScopeSerializer(item: SovereignViewScope): any {
  return {
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : sovereignViewManagementGroupScopeArraySerializer(item["managementGroups"]),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : sovereignViewSubscriptionScopeArraySerializer(item["subscriptions"]),
  };
}

export function sovereignViewScopeDeserializer(item: any): SovereignViewScope {
  return {
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : sovereignViewManagementGroupScopeArrayDeserializer(item["managementGroups"]),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : sovereignViewSubscriptionScopeArrayDeserializer(item["subscriptions"]),
  };
}

export function sovereignViewManagementGroupScopeArraySerializer(
  result: Array<SovereignViewManagementGroupScope>,
): any[] {
  return result.map((item) => {
    return sovereignViewManagementGroupScopeSerializer(item);
  });
}

export function sovereignViewManagementGroupScopeArrayDeserializer(
  result: Array<SovereignViewManagementGroupScope>,
): any[] {
  return result.map((item) => {
    return sovereignViewManagementGroupScopeDeserializer(item);
  });
}

/** A management group scope item for the sovereign view. */
export interface SovereignViewManagementGroupScope {
  /** The resource identifier of the management group. */
  id: string;
  /** The management group name. This is a purely client side label that the service does not validate, normalize, or use for any lookup. */
  name?: string;
}

export function sovereignViewManagementGroupScopeSerializer(
  item: SovereignViewManagementGroupScope,
): any {
  return { id: item["id"], name: item["name"] };
}

export function sovereignViewManagementGroupScopeDeserializer(
  item: any,
): SovereignViewManagementGroupScope {
  return {
    id: item["id"],
    name: item["name"],
  };
}

export function sovereignViewSubscriptionScopeArraySerializer(
  result: Array<SovereignViewSubscriptionScope>,
): any[] {
  return result.map((item) => {
    return sovereignViewSubscriptionScopeSerializer(item);
  });
}

export function sovereignViewSubscriptionScopeArrayDeserializer(
  result: Array<SovereignViewSubscriptionScope>,
): any[] {
  return result.map((item) => {
    return sovereignViewSubscriptionScopeDeserializer(item);
  });
}

/** A subscription scope item for the sovereign view. */
export interface SovereignViewSubscriptionScope {
  /** The subscription id. */
  id: string;
  /** The subscription name. This is a purely client side label that the service does not validate, normalize, or use for any lookup. */
  name?: string;
}

export function sovereignViewSubscriptionScopeSerializer(
  item: SovereignViewSubscriptionScope,
): any {
  return { id: item["id"], name: item["name"] };
}

export function sovereignViewSubscriptionScopeDeserializer(
  item: any,
): SovereignViewSubscriptionScope {
  return {
    id: item["id"],
    name: item["name"],
  };
}

export function sovereignViewPolicyInitiativeDetailArraySerializer(
  result: Array<SovereignViewPolicyInitiativeDetail>,
): any[] {
  return result.map((item) => {
    return sovereignViewPolicyInitiativeDetailSerializer(item);
  });
}

export function sovereignViewPolicyInitiativeDetailArrayDeserializer(
  result: Array<SovereignViewPolicyInitiativeDetail>,
): any[] {
  return result.map((item) => {
    return sovereignViewPolicyInitiativeDetailDeserializer(item);
  });
}

/** The policy initiative details for the sovereign view. */
export interface SovereignViewPolicyInitiativeDetail {
  /** The fully qualified id of the policy initiative. */
  policyInitiativeId: string;
  /** The compliance dimension associated with the policy initiative. */
  dimension: ComplianceDimension;
  /** The resource identifiers of existing policy assignments association with the policy initiative and scopes in the sovereign view. */
  policyAssignmentIds: string[];
  /** The version of the policy initiative. */
  policyVersion: string;
}

export function sovereignViewPolicyInitiativeDetailSerializer(
  item: SovereignViewPolicyInitiativeDetail,
): any {
  return {
    policyInitiativeId: item["policyInitiativeId"],
    dimension: item["dimension"],
    policyAssignmentIds: item["policyAssignmentIds"].map((p: any) => {
      return p;
    }),
    policyVersion: item["policyVersion"],
  };
}

export function sovereignViewPolicyInitiativeDetailDeserializer(
  item: any,
): SovereignViewPolicyInitiativeDetail {
  return {
    policyInitiativeId: item["policyInitiativeId"],
    dimension: item["dimension"],
    policyAssignmentIds: item["policyAssignmentIds"].map((p: any) => {
      return p;
    }),
    policyVersion: item["policyVersion"],
  };
}

/** The compliance dimension to be associated with the policy initiative. */
export enum KnownComplianceDimension {
  /** Data residency compliance dimension. */
  DataResidency = "DataResidency",
  /** Encryption at rest compliance dimension. */
  EncryptionAtRest = "EncryptionAtRest",
  /** Encryption in transit compliance dimension. */
  EncryptionInTransit = "EncryptionInTransit",
  /** Encryption in use compliance dimension. */
  EncryptionInUse = "EncryptionInUse",
  /** Controlled network exposure compliance dimension. */
  ControlledNetworkExposure = "ControlledNetworkExposure",
  /** Business continuity compliance dimension. */
  BusinessContinuity = "BusinessContinuity",
}

/**
 * The compliance dimension to be associated with the policy initiative. \
 * {@link KnownComplianceDimension} can be used interchangeably with ComplianceDimension,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataResidency**: Data residency compliance dimension. \
 * **EncryptionAtRest**: Encryption at rest compliance dimension. \
 * **EncryptionInTransit**: Encryption in transit compliance dimension. \
 * **EncryptionInUse**: Encryption in use compliance dimension. \
 * **ControlledNetworkExposure**: Controlled network exposure compliance dimension. \
 * **BusinessContinuity**: Business continuity compliance dimension.
 */
export type ComplianceDimension = string;

/** Stable regulatory-document keys recognized by the Portal. */
export enum KnownSovereignViewRegulatoryDocumentName {
  /** The Azure Cloud Sovereign Baseline document selected by default in the Portal. */
  SovereignControlBaseline = "SovereignControlBaseline",
}

/**
 * Stable regulatory-document keys recognized by the Portal. \
 * {@link KnownSovereignViewRegulatoryDocumentName} can be used interchangeably with SovereignViewRegulatoryDocumentName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SovereignControlBaseline**: The Azure Cloud Sovereign Baseline document selected by default in the Portal.
 */
export type SovereignViewRegulatoryDocumentName = string;

/** The custom provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The state of the resource when creating */
  Creating = "Creating",
  /** The state of the resource when updating */
  Updating = "Updating",
  /** The state of the resource when deleting */
  Deleting = "Deleting",
}

/**
 * The custom provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The state of the resource when creating \
 * **Updating**: The state of the resource when updating \
 * **Deleting**: The state of the resource when deleting
 */
export type ProvisioningState = string;

/** Per-dimension evaluation settings for the sovereign view. */
export interface SovereignViewDimensionSettings {
  /** Settings for the Data Residency dimension. */
  dataResidency?: SovereignViewDataResidencyDimensionSettings;
}

export function sovereignViewDimensionSettingsSerializer(
  item: SovereignViewDimensionSettings,
): any {
  return {
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : sovereignViewDataResidencyDimensionSettingsSerializer(item["dataResidency"]),
  };
}

export function sovereignViewDimensionSettingsDeserializer(
  item: any,
): SovereignViewDimensionSettings {
  return {
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : sovereignViewDataResidencyDimensionSettingsDeserializer(item["dataResidency"]),
  };
}

/** Evaluation settings for the Data Residency dimension. */
export interface SovereignViewDataResidencyDimensionSettings {
  /** The resource scope evaluated for the Data Residency dimension. */
  resourceEvaluationScope: DataResidencyResourceEvaluationScope;
  /** Parameters used by the Data Residency evaluation. */
  parameters: SovereignViewDataResidencyParameters;
}

export function sovereignViewDataResidencyDimensionSettingsSerializer(
  item: SovereignViewDataResidencyDimensionSettings,
): any {
  return {
    resourceEvaluationScope: item["resourceEvaluationScope"],
    parameters: sovereignViewDataResidencyParametersSerializer(item["parameters"]),
  };
}

export function sovereignViewDataResidencyDimensionSettingsDeserializer(
  item: any,
): SovereignViewDataResidencyDimensionSettings {
  return {
    resourceEvaluationScope: item["resourceEvaluationScope"],
    parameters: sovereignViewDataResidencyParametersDeserializer(item["parameters"]),
  };
}

/** The resource scope evaluated for the Data Residency dimension. */
export enum KnownDataResidencyResourceEvaluationScope {
  /** Evaluate the resource together with the resources linked to it. */
  Residency360 = "Residency360",
  /** Evaluate only the resource itself, without its linked resources. */
  ResourceOnly = "ResourceOnly",
}

/**
 * The resource scope evaluated for the Data Residency dimension. \
 * {@link KnownDataResidencyResourceEvaluationScope} can be used interchangeably with DataResidencyResourceEvaluationScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Residency360**: Evaluate the resource together with the resources linked to it. \
 * **ResourceOnly**: Evaluate only the resource itself, without its linked resources.
 */
export type DataResidencyResourceEvaluationScope = string;

/** Parameters used by the Data Residency evaluation. */
export interface SovereignViewDataResidencyParameters {
  /** Azure regions in which the resource and its linked resources are allowed to reside. */
  allowedLocations: string[];
}

export function sovereignViewDataResidencyParametersSerializer(
  item: SovereignViewDataResidencyParameters,
): any {
  return {
    allowedLocations: item["allowedLocations"].map((p: any) => {
      return p;
    }),
  };
}

export function sovereignViewDataResidencyParametersDeserializer(
  item: any,
): SovereignViewDataResidencyParameters {
  return {
    allowedLocations: item["allowedLocations"].map((p: any) => {
      return p;
    }),
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentitySerializer(item: SystemAssignedServiceIdentity): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityDeserializer(
  item: any,
): SystemAssignedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownSystemAssignedServiceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownSystemAssignedServiceIdentityType} can be used interchangeably with SystemAssignedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type SystemAssignedServiceIdentityType = string;

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

/** The patch model for the sovereign view resource type. */
export interface SovereignViewResourcePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function sovereignViewResourcePatchSerializer(item: SovereignViewResourcePatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a SovereignViewResource list operation. */
export interface _SovereignViewResourceListResult {
  /** The SovereignViewResource items on this page */
  value: SovereignViewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sovereignViewResourceListResultDeserializer(
  item: any,
): _SovereignViewResourceListResult {
  return {
    value: sovereignViewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sovereignViewResourceArraySerializer(result: Array<SovereignViewResource>): any[] {
  return result.map((item) => {
    return sovereignViewResourceSerializer(item);
  });
}

export function sovereignViewResourceArrayDeserializer(
  result: Array<SovereignViewResource>,
): any[] {
  return result.map((item) => {
    return sovereignViewResourceDeserializer(item);
  });
}

/** The response for the sovereign view compliance summary action. */
export interface SovereignViewComplianceSummaryResult {
  /** State indicating whether the data is processed or still being processed. */
  reportStatus: ReportStatus;
  /** Error details when dataState is Error. */
  error?: ErrorDetail;
  /** The resource identifier of the sovereign view. */
  resourceId?: string;
  /** The time when compliance was last evaluated, in RFC3339 format. */
  lastEvaluated: Date;
  /** The overall summary of compliance across all resources in scope. */
  overallSummary?: SovereignViewComplianceOverallSummary;
  /** The list of compliance summaries for the dimensions in scope. */
  dimensionSummaries?: SovereignViewComplianceDimensionSummary[];
}

export function sovereignViewComplianceSummaryResultDeserializer(
  item: any,
): SovereignViewComplianceSummaryResult {
  return {
    reportStatus: reportStatusDeserializer(item["reportStatus"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
    lastEvaluated: new Date(item["lastEvaluated"]),
    overallSummary: !item["overallSummary"]
      ? item["overallSummary"]
      : sovereignViewComplianceOverallSummaryDeserializer(item["overallSummary"]),
    dimensionSummaries: !item["dimensionSummaries"]
      ? item["dimensionSummaries"]
      : sovereignViewComplianceDimensionSummaryArrayDeserializer(item["dimensionSummaries"]),
  };
}

/** The compliance report generation status, including the current state and the next attempt time. */
export interface ReportStatus {
  /** The current compliance report generation state. */
  state: ReportState;
  /** The next scheduled evaluation time, in RFC3339 format. May not be available for all report states. */
  nextAttempt?: Date;
}

export function reportStatusDeserializer(item: any): ReportStatus {
  return {
    state: item["state"],
    nextAttempt: !item["nextAttempt"] ? item["nextAttempt"] : new Date(item["nextAttempt"]),
  };
}

/** The compliance report generation state. */
export enum KnownReportState {
  /** The compliance report is being generated for the first time. */
  Generating = "Generating",
  /** No compliance data is available yet. */
  NoDataYet = "NoDataYet",
  /** The compliance report is up to date. */
  UpToDate = "UpToDate",
  /** The compliance report generation is being retried. */
  Retrying = "Retrying",
  /** The compliance report is being refreshed. */
  Refreshing = "Refreshing",
  /** The compliance report is stale and pending refresh. */
  Stale = "Stale",
  /** The compliance report generation is blocked. */
  Blocked = "Blocked",
}

/**
 * The compliance report generation state. \
 * {@link KnownReportState} can be used interchangeably with ReportState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Generating**: The compliance report is being generated for the first time. \
 * **NoDataYet**: No compliance data is available yet. \
 * **UpToDate**: The compliance report is up to date. \
 * **Retrying**: The compliance report generation is being retried. \
 * **Refreshing**: The compliance report is being refreshed. \
 * **Stale**: The compliance report is stale and pending refresh. \
 * **Blocked**: The compliance report generation is blocked.
 */
export type ReportState = string;

/** The overall compliance summary in the sovereign view compliance summary action. */
export interface SovereignViewComplianceOverallSummary {
  /** Total number of management groups for the sovereign view. */
  totalManagementGroups: number;
  /** Total number of subscriptions for the sovereign view. */
  totalSubscriptions: number;
  /** Total number of resource groups for the sovereign view. */
  totalResourceGroups: number;
  /** Total number of resources for the sovereign view. */
  totalResources: number;
  /** Number of resources in compliant state for the sovereign view. */
  compliantCount: number;
  /** Number of resources in non-compliant state for the sovereign view. */
  nonCompliantCount: number;
  /** Number of resources in constrained state for the sovereign view. */
  constrainedCount: number;
  /** Number of resources in conflict state for the sovereign view. */
  conflictCount: number;
  /** Number of resources in not applicable state for the sovereign view. */
  notApplicableCount: number;
  /** Number of resources in not evaluated state for the sovereign view. */
  notEvaluatedCount: number;
  /** Number of resources in other compliance states for the sovereign view. */
  othersCount: number;
}

export function sovereignViewComplianceOverallSummaryDeserializer(
  item: any,
): SovereignViewComplianceOverallSummary {
  return {
    totalManagementGroups: item["totalManagementGroups"],
    totalSubscriptions: item["totalSubscriptions"],
    totalResourceGroups: item["totalResourceGroups"],
    totalResources: item["totalResources"],
    compliantCount: item["compliantCount"],
    nonCompliantCount: item["nonCompliantCount"],
    constrainedCount: item["constrainedCount"],
    conflictCount: item["conflictCount"],
    notApplicableCount: item["notApplicableCount"],
    notEvaluatedCount: item["notEvaluatedCount"],
    othersCount: item["othersCount"],
  };
}

export function sovereignViewComplianceDimensionSummaryArrayDeserializer(
  result: Array<SovereignViewComplianceDimensionSummary>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDimensionSummaryDeserializer(item);
  });
}

/** The compliance summary for a specific dimension in the sovereign view compliance summary action. */
export interface SovereignViewComplianceDimensionSummary {
  /** The dimension representing this summary. */
  dimension: ComplianceDimension;
  /** Total number of resources for the sovereign view. */
  totalResources: number;
  /** Number of resources in compliant state for the sovereign view. */
  compliantCount: number;
  /** Number of resources in non-compliant state for the sovereign view. */
  nonCompliantCount: number;
  /** Number of resources in constrained state for the sovereign view. */
  constrainedCount: number;
  /** Number of resources in conflict state for the sovereign view. */
  conflictCount: number;
  /** Number of resources in not applicable state for the sovereign view. */
  notApplicableCount: number;
  /** Number of resources in not evaluated state for the sovereign view. */
  notEvaluatedCount: number;
  /** Number of resources in other compliance states for the sovereign view. */
  othersCount: number;
}

export function sovereignViewComplianceDimensionSummaryDeserializer(
  item: any,
): SovereignViewComplianceDimensionSummary {
  return {
    dimension: item["dimension"],
    totalResources: item["totalResources"],
    compliantCount: item["compliantCount"],
    nonCompliantCount: item["nonCompliantCount"],
    constrainedCount: item["constrainedCount"],
    conflictCount: item["conflictCount"],
    notApplicableCount: item["notApplicableCount"],
    notEvaluatedCount: item["notEvaluatedCount"],
    othersCount: item["othersCount"],
  };
}

/** The request for the sovereign view compliance details action. */
export interface SovereignViewComplianceDetailsContent {
  /** The maximum number of resources to return. Used for pagination. */
  top: number;
  /** The resources to skip when the results are returned. Used for pagination. */
  skip?: number;
  /** The filters for compliance dimensions and their states to apply when querying for compliance details. */
  complianceDimensions?: SovereignViewComplianceDetailsDimensionFilter[];
  /** The filters to apply when querying for compliance details. */
  filters?: SovereignViewComplianceDetailsFilters[];
  /** The sorting to apply when querying for compliance details. */
  sort?: SovereignViewComplianceDetailsSort[];
  /** The search to apply when querying for compliance details. */
  search?: SovereignViewComplianceDetailsSearch;
}

export function sovereignViewComplianceDetailsContentSerializer(
  item: SovereignViewComplianceDetailsContent,
): any {
  return {
    top: item["top"],
    skip: item["skip"],
    complianceDimensions: !item["complianceDimensions"]
      ? item["complianceDimensions"]
      : sovereignViewComplianceDetailsDimensionFilterArraySerializer(item["complianceDimensions"]),
    filters: !item["filters"]
      ? item["filters"]
      : sovereignViewComplianceDetailsFiltersArraySerializer(item["filters"]),
    sort: !item["sort"]
      ? item["sort"]
      : sovereignViewComplianceDetailsSortArraySerializer(item["sort"]),
    search: !item["search"]
      ? item["search"]
      : sovereignViewComplianceDetailsSearchSerializer(item["search"]),
  };
}

export function sovereignViewComplianceDetailsDimensionFilterArraySerializer(
  result: Array<SovereignViewComplianceDetailsDimensionFilter>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDetailsDimensionFilterSerializer(item);
  });
}

/** The filter for compliance details based on compliance dimensions and their states. */
export interface SovereignViewComplianceDetailsDimensionFilter {
  /** The compliance dimension to filter on. */
  dimension: ComplianceDimension;
  /** The compliance states to optionally filter on. */
  states: PolicyComplianceState[];
}

export function sovereignViewComplianceDetailsDimensionFilterSerializer(
  item: SovereignViewComplianceDetailsDimensionFilter,
): any {
  return {
    dimension: item["dimension"],
    states: item["states"].map((p: any) => {
      return p;
    }),
  };
}

/** Supported compliance states for the policy initiatives. */
export enum KnownPolicyComplianceState {
  /** The resource is compliant with respect to the given policy. */
  Compliant = "Compliant",
  /** The resource is not compliant with respect to the given policy. */
  NonCompliant = "NonCompliant",
  /** The resource is in a conflict with respect to the given policy. */
  Conflict = "Conflict",
  /** The resource is in a state that is not applicable to the given policy. */
  NotApplicable = "NotApplicable",
  /** The resource has not been evaluated for compliance with respect to the given policy. */
  NotEvaluated = "NotEvaluated",
  /** The resource is non-compliant for Business Continuity, but a validated actionable escape path is available. */
  Constrained = "Constrained",
  /** The resource is in a compliance state other than Compliant, NonCompliant, Conflict, NotApplicable, or NotEvaluated. */
  Others = "Others",
}

/**
 * Supported compliance states for the policy initiatives. \
 * {@link KnownPolicyComplianceState} can be used interchangeably with PolicyComplianceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compliant**: The resource is compliant with respect to the given policy. \
 * **NonCompliant**: The resource is not compliant with respect to the given policy. \
 * **Conflict**: The resource is in a conflict with respect to the given policy. \
 * **NotApplicable**: The resource is in a state that is not applicable to the given policy. \
 * **NotEvaluated**: The resource has not been evaluated for compliance with respect to the given policy. \
 * **Constrained**: The resource is non-compliant for Business Continuity, but a validated actionable escape path is available. \
 * **Others**: The resource is in a compliance state other than Compliant, NonCompliant, Conflict, NotApplicable, or NotEvaluated.
 */
export type PolicyComplianceState = string;

export function sovereignViewComplianceDetailsFiltersArraySerializer(
  result: Array<SovereignViewComplianceDetailsFilters>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDetailsFiltersSerializer(item);
  });
}

/** The filters to apply when querying for compliance details. */
export interface SovereignViewComplianceDetailsFilters {
  /** The field to filter on. */
  field: SovereignViewFilterField;
  /** The operator to apply for the filter. */
  operator: SovereignViewComplianceDetailsFilterOperators;
  /** The values to filter on. */
  value: string[];
}

export function sovereignViewComplianceDetailsFiltersSerializer(
  item: SovereignViewComplianceDetailsFilters,
): any {
  return {
    field: item["field"],
    operator: item["operator"],
    value: item["value"].map((p: any) => {
      return p;
    }),
  };
}

/** Supported filter fields for Sovereign View compliance details. */
export enum KnownSovereignViewFilterField {
  /** Filter by subscription. */
  Subscription = "Subscription",
  /** Filter by resource group. */
  ResourceGroup = "ResourceGroup",
  /** Filter by resource name. */
  ResourceName = "ResourceName",
  /** Filter by resource type. */
  ResourceType = "ResourceType",
  /** Filter by region. */
  Region = "Region",
  /** Filter by Encryption In Transit compliance dimension. */
  EncryptionInTransit = "EncryptionInTransit",
  /** Filter by Data Residency compliance dimension. */
  DataResidency = "DataResidency",
  /** Filter by Encryption At Rest compliance dimension. */
  EncryptionAtRest = "EncryptionAtRest",
  /** Filter by Encryption In Use compliance dimension. */
  EncryptionInUse = "EncryptionInUse",
  /** Filter by Controlled Network Exposure compliance dimension. */
  ControlledNetworkExposure = "ControlledNetworkExposure",
  /** Filter by Business Continuity compliance dimension. */
  BusinessContinuity = "BusinessContinuity",
  /** Filter by the name of the parent resource that contains the resource. */
  ParentResourceName = "ParentResourceName",
}

/**
 * Supported filter fields for Sovereign View compliance details. \
 * {@link KnownSovereignViewFilterField} can be used interchangeably with SovereignViewFilterField,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Subscription**: Filter by subscription. \
 * **ResourceGroup**: Filter by resource group. \
 * **ResourceName**: Filter by resource name. \
 * **ResourceType**: Filter by resource type. \
 * **Region**: Filter by region. \
 * **EncryptionInTransit**: Filter by Encryption In Transit compliance dimension. \
 * **DataResidency**: Filter by Data Residency compliance dimension. \
 * **EncryptionAtRest**: Filter by Encryption At Rest compliance dimension. \
 * **EncryptionInUse**: Filter by Encryption In Use compliance dimension. \
 * **ControlledNetworkExposure**: Filter by Controlled Network Exposure compliance dimension. \
 * **BusinessContinuity**: Filter by Business Continuity compliance dimension. \
 * **ParentResourceName**: Filter by the name of the parent resource that contains the resource.
 */
export type SovereignViewFilterField = string;

/** Supported filter operators for Sovereign View Compliance details. */
export enum KnownSovereignViewComplianceDetailsFilterOperators {
  /** In filter operator. Returns results where the field value is in the provided list of values. */
  In = "In",
}

/**
 * Supported filter operators for Sovereign View Compliance details. \
 * {@link KnownSovereignViewComplianceDetailsFilterOperators} can be used interchangeably with SovereignViewComplianceDetailsFilterOperators,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**: In filter operator. Returns results where the field value is in the provided list of values.
 */
export type SovereignViewComplianceDetailsFilterOperators = string;

export function sovereignViewComplianceDetailsSortArraySerializer(
  result: Array<SovereignViewComplianceDetailsSort>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDetailsSortSerializer(item);
  });
}

/** The sorting for compliance details. */
export interface SovereignViewComplianceDetailsSort {
  /** The field to sort on. */
  field: string;
  /** The direction to sort in. */
  direction: SovereignViewComplianceDetailsSortDirections;
  /** Explicit ordering of policy compliance states to apply when sorting on a compliance-state field. The states are ranked in the order listed. When provided for a compliance-state field, this takes precedence over `direction`, which is ignored for that field. */
  sortingOrder?: PolicyComplianceState[];
}

export function sovereignViewComplianceDetailsSortSerializer(
  item: SovereignViewComplianceDetailsSort,
): any {
  return {
    field: item["field"],
    direction: item["direction"],
    sortingOrder: !item["sortingOrder"]
      ? item["sortingOrder"]
      : item["sortingOrder"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported sort directions for Sovereign View Compliance details. */
export enum KnownSovereignViewComplianceDetailsSortDirections {
  /** Ascending sort direction. */
  Asc = "asc",
  /** Descending sort direction. */
  Desc = "desc",
}

/**
 * Supported sort directions for Sovereign View Compliance details. \
 * {@link KnownSovereignViewComplianceDetailsSortDirections} can be used interchangeably with SovereignViewComplianceDetailsSortDirections,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **asc**: Ascending sort direction. \
 * **desc**: Descending sort direction.
 */
export type SovereignViewComplianceDetailsSortDirections = string;

/** Search field and query for Sovereign View Compliance details. */
export interface SovereignViewComplianceDetailsSearch {
  /** The field to search on. */
  field: string;
  /** The value to search for in the specified field. */
  value: string;
}

export function sovereignViewComplianceDetailsSearchSerializer(
  item: SovereignViewComplianceDetailsSearch,
): any {
  return { field: item["field"], value: item["value"] };
}

/** The response for the sovereign view compliance details action. */
export interface SovereignViewComplianceDetailsResult {
  /** State indicating whether the data is processed or still being processed. */
  reportStatus: ReportStatus;
  /** Error details when dataState is Error. */
  error?: ErrorDetail;
  /** The time when compliance was last evaluated overall, in RFC3339 format. */
  lastEvaluated: Date;
  /** Total number of resources for the sovereign view. */
  totalResources?: number;
  /** The list of compliance detail resources. */
  resources?: SovereignViewComplianceDetailResource[];
}

export function sovereignViewComplianceDetailsResultDeserializer(
  item: any,
): SovereignViewComplianceDetailsResult {
  return {
    reportStatus: reportStatusDeserializer(item["reportStatus"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    lastEvaluated: new Date(item["lastEvaluated"]),
    totalResources: item["totalResources"],
    resources: !item["resources"]
      ? item["resources"]
      : sovereignViewComplianceDetailResourceArrayDeserializer(item["resources"]),
  };
}

export function sovereignViewComplianceDetailResourceArrayDeserializer(
  result: Array<SovereignViewComplianceDetailResource>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDetailResourceDeserializer(item);
  });
}

/** A compliance detail item for a resource. */
export interface SovereignViewComplianceDetailResource {
  /** The resource identifier. */
  resourceId: string;
  /** The fully qualified Azure Resource Manager ID of the parent resource. When a resource is created as part of another Azure resource's creation and its lifecycle is managed by the platform, this is the ID of that parent resource. For a resource that was created standalone and has no parent resource, this will be empty. */
  parentResourceId?: string;
  /** The location of the resource. */
  location: string;
  /** The compliance details for the resource across the dimensions. */
  dimensionDetails: SovereignViewDimensionDetail[];
}

export function sovereignViewComplianceDetailResourceDeserializer(
  item: any,
): SovereignViewComplianceDetailResource {
  return {
    resourceId: item["resourceId"],
    parentResourceId: item["parentResourceId"],
    location: item["location"],
    dimensionDetails: sovereignViewDimensionDetailArrayDeserializer(item["dimensionDetails"]),
  };
}

export function sovereignViewDimensionDetailArrayDeserializer(
  result: Array<SovereignViewDimensionDetail>,
): any[] {
  return result.map((item) => {
    return sovereignViewDimensionDetailDeserializer(item);
  });
}

/** A compliance detail item for a resource in the sovereign view compliance details action. */
export interface SovereignViewDimensionDetail {
  /** The compliance dimension for the compliance detail. */
  dimension: ComplianceDimension;
  /** The compliance state of the resource for the dimension. */
  state: PolicyComplianceState;
  /** The compliance details for the given dimension. */
  complianceDetails: SovereignViewComplianceDetail[];
  /** The snapshot timestamp stored for this resource and dimension, in RFC3339 format. */
  evaluatedAt: Date;
  /** Distinct evaluation sources for this resource and dimension in the same snapshot. An empty array means that the state has no underlying evaluation. */
  sources: SovereignViewResourceEvaluationSource[];
}

export function sovereignViewDimensionDetailDeserializer(item: any): SovereignViewDimensionDetail {
  return {
    dimension: item["dimension"],
    state: item["state"],
    complianceDetails: sovereignViewComplianceDetailArrayDeserializer(item["complianceDetails"]),
    evaluatedAt: new Date(item["evaluatedAt"]),
    sources: item["sources"].map((p: any) => {
      return p;
    }),
  };
}

export function sovereignViewComplianceDetailArrayDeserializer(
  result: Array<SovereignViewComplianceDetail>,
): any[] {
  return result.map((item) => {
    return sovereignViewComplianceDetailDeserializer(item);
  });
}

/** A compliance detail item for a resource in the sovereign view compliance details action. */
export interface SovereignViewComplianceDetail {
  /** The fully qualified id of the policy initiative associated with the compliance detail. */
  policyInitiativeId: string;
  /** The policy assignment for the compliance detail. */
  policyAssignmentId: string;
  /** The time when compliance was last evaluated by Azure Policy, in RFC3339 format. */
  evaluatedAt?: Date;
}

export function sovereignViewComplianceDetailDeserializer(
  item: any,
): SovereignViewComplianceDetail {
  return {
    policyInitiativeId: item["policyInitiativeId"],
    policyAssignmentId: item["policyAssignmentId"],
    evaluatedAt: !item["evaluatedAt"] ? item["evaluatedAt"] : new Date(item["evaluatedAt"]),
  };
}

/** The evaluation source that produced a compliance state for a resource and dimension. */
export enum KnownSovereignViewResourceEvaluationSource {
  /** The evaluation was produced by Azure Policy. */
  Policy = "Policy",
  /** The evaluation was produced by Sovereign Intelligence. */
  SovereignIntelligence = "SovereignIntelligence",
}

/**
 * The evaluation source that produced a compliance state for a resource and dimension. \
 * {@link KnownSovereignViewResourceEvaluationSource} can be used interchangeably with SovereignViewResourceEvaluationSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Policy**: The evaluation was produced by Azure Policy. \
 * **SovereignIntelligence**: The evaluation was produced by Sovereign Intelligence.
 */
export type SovereignViewResourceEvaluationSource = string;

/** The request for the sovereign view filter values action. */
export interface SovereignViewFilterValuesContent {
  /** The filter field for which values are requested. */
  requestedFilter: SovereignViewFilterField;
  /** Optional filters to apply before returning filter values. */
  filters?: SovereignViewComplianceDetailsFilters[];
  /** Optional search term applied to the requested filter field. */
  searchTerm?: string;
}

export function sovereignViewFilterValuesContentSerializer(
  item: SovereignViewFilterValuesContent,
): any {
  return {
    requestedFilter: item["requestedFilter"],
    filters: !item["filters"]
      ? item["filters"]
      : sovereignViewComplianceDetailsFiltersArraySerializer(item["filters"]),
    searchTerm: item["searchTerm"],
  };
}

/** The response for the sovereign view filter values action. */
export interface SovereignViewFilterValuesResult {
  /** State indicating whether the data is processed or still being processed. */
  dataState: DataState;
  /** Error details when dataState is Error. */
  error?: ErrorDetail;
  /** The filter field for which values are returned. */
  requestedFilter?: SovereignViewFilterField;
  /** Total number of values available for the requested filter. */
  totalCount?: number;
  /** The list of filter values and their counts. */
  values?: SovereignViewFilterValueItem[];
}

export function sovereignViewFilterValuesResultDeserializer(
  item: any,
): SovereignViewFilterValuesResult {
  return {
    dataState: item["dataState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    requestedFilter: item["requestedFilter"],
    totalCount: item["totalCount"],
    values: !item["values"]
      ? item["values"]
      : sovereignViewFilterValueItemArrayDeserializer(item["values"]),
  };
}

/** The state of the report data. */
export enum KnownDataState {
  /** The data is still being processed and is not yet available. */
  Processing = "Processing",
  /** The data is processed and available. */
  Processed = "Processed",
  /** An error occurred while processing the data. */
  Error = "Error",
}

/**
 * The state of the report data. \
 * {@link KnownDataState} can be used interchangeably with DataState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Processing**: The data is still being processed and is not yet available. \
 * **Processed**: The data is processed and available. \
 * **Error**: An error occurred while processing the data.
 */
export type DataState = string;

export function sovereignViewFilterValueItemArrayDeserializer(
  result: Array<SovereignViewFilterValueItem>,
): any[] {
  return result.map((item) => {
    return sovereignViewFilterValueItemDeserializer(item);
  });
}

/** A filter value item with the associated count. */
export interface SovereignViewFilterValueItem {
  /** The value for the filter. */
  value: string;
  /** The display name for the filter value. */
  displayName?: string;
  /** The count of resources that match the filter value. */
  count: number;
}

export function sovereignViewFilterValueItemDeserializer(item: any): SovereignViewFilterValueItem {
  return {
    value: item["value"],
    displayName: item["displayName"],
    count: item["count"],
  };
}

/** The request for the sovereign view operational status action. */
export interface SovereignViewOperationalStatusContent {
  /** The level of detail to return in the operational status response. Defaults to Detailed. */
  mode?: OperationalStatusRequestMode;
  /** The evaluation parameters that control which checks are performed when determining operational status. */
  evaluationParameters?: OperationalStatusEvaluationParameter[];
}

export function sovereignViewOperationalStatusContentSerializer(
  item: SovereignViewOperationalStatusContent,
): any {
  return {
    mode: item["mode"],
    evaluationParameters: !item["evaluationParameters"]
      ? item["evaluationParameters"]
      : item["evaluationParameters"].map((p: any) => {
          return p;
        }),
  };
}

/** The level of detail to return in the sovereign view operational status response. */
export enum KnownOperationalStatusRequestMode {
  /** Returns a high-level operational status suitable for quickly determining overall view health. */
  Summary = "Summary",
  /** Returns a comprehensive operational status, including detailed information about individual checks, dependencies, and any issues impacting view operability. */
  Detailed = "Detailed",
}

/**
 * The level of detail to return in the sovereign view operational status response. \
 * {@link KnownOperationalStatusRequestMode} can be used interchangeably with OperationalStatusRequestMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Summary**: Returns a high-level operational status suitable for quickly determining overall view health. \
 * **Detailed**: Returns a comprehensive operational status, including detailed information about individual checks, dependencies, and any issues impacting view operability.
 */
export type OperationalStatusRequestMode = string;

/** An evaluation parameter that controls which checks are performed when determining operational status. */
export enum KnownOperationalStatusEvaluationParameter {
  /** Evaluate managed identity permissions on the scopes in the sovereign view. */
  PermissionsEvaluation = "PermissionsEvaluation",
  /** Evaluate policy assignments on the scopes in the sovereign view. */
  PolicyAssignmentEvaluation = "PolicyAssignmentEvaluation",
}

/**
 * An evaluation parameter that controls which checks are performed when determining operational status. \
 * {@link KnownOperationalStatusEvaluationParameter} can be used interchangeably with OperationalStatusEvaluationParameter,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PermissionsEvaluation**: Evaluate managed identity permissions on the scopes in the sovereign view. \
 * **PolicyAssignmentEvaluation**: Evaluate policy assignments on the scopes in the sovereign view.
 */
export type OperationalStatusEvaluationParameter = string;

/** The response for the sovereign view operational status action. */
export interface SovereignViewOperationalStatusResult {
  /** The name of the sovereign view. */
  name: string;
  /** The overall operational status of the sovereign view. */
  status: OperationalStatusStates;
  /** The detailed operational status information. Returned when the operational status is evaluated in Detailed mode. */
  details?: SovereignViewOperationalStatusDetails[];
}

export function sovereignViewOperationalStatusResultDeserializer(
  item: any,
): SovereignViewOperationalStatusResult {
  return {
    name: item["name"],
    status: item["status"],
    details: !item["details"]
      ? item["details"]
      : sovereignViewOperationalStatusDetailsArrayDeserializer(item["details"]),
  };
}

/** The overall operational status states for a sovereign view. */
export enum KnownOperationalStatusStates {
  /** The sovereign view is healthy and fully operational. */
  Healthy = "Healthy",
  /** The sovereign view is unhealthy and its operability is impacted. */
  Unhealthy = "Unhealthy",
  /** The operational status of the sovereign view could not be determined. */
  Unknown = "Unknown",
}

/**
 * The overall operational status states for a sovereign view. \
 * {@link KnownOperationalStatusStates} can be used interchangeably with OperationalStatusStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: The sovereign view is healthy and fully operational. \
 * **Unhealthy**: The sovereign view is unhealthy and its operability is impacted. \
 * **Unknown**: The operational status of the sovereign view could not be determined.
 */
export type OperationalStatusStates = string;

export function sovereignViewOperationalStatusDetailsArrayDeserializer(
  result: Array<SovereignViewOperationalStatusDetails>,
): any[] {
  return result.map((item) => {
    return sovereignViewOperationalStatusDetailsDeserializer(item);
  });
}

/** An operational status detail item describing an issue impacting the operability of the sovereign view. */
export interface SovereignViewOperationalStatusDetails {
  /** The reason the sovereign view is unhealthy. */
  reason: OperationalStatusUnhealthyReason;
  /** The scopes affected by the issue. */
  affectedScopes?: SovereignViewAffectedScopes[];
}

export function sovereignViewOperationalStatusDetailsDeserializer(
  item: any,
): SovereignViewOperationalStatusDetails {
  return {
    reason: item["reason"],
    affectedScopes: !item["affectedScopes"]
      ? item["affectedScopes"]
      : sovereignViewAffectedScopesArrayDeserializer(item["affectedScopes"]),
  };
}

/** The reasons a sovereign view or an individual scope is unhealthy. */
export enum KnownOperationalStatusUnhealthyReason {
  /** The managed identity is missing. */
  MIMissing = "MIMissing",
  /** The managed identity is missing required permissions. */
  MIPermissionMissing = "MIPermissionMissing",
  /** A required policy assignment is missing. */
  PolicyAssignmentMissing = "PolicyAssignmentMissing",
}

/**
 * The reasons a sovereign view or an individual scope is unhealthy. \
 * {@link KnownOperationalStatusUnhealthyReason} can be used interchangeably with OperationalStatusUnhealthyReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MIMissing**: The managed identity is missing. \
 * **MIPermissionMissing**: The managed identity is missing required permissions. \
 * **PolicyAssignmentMissing**: A required policy assignment is missing.
 */
export type OperationalStatusUnhealthyReason = string;

export function sovereignViewAffectedScopesArrayDeserializer(
  result: Array<SovereignViewAffectedScopes>,
): any[] {
  return result.map((item) => {
    return sovereignViewAffectedScopesDeserializer(item);
  });
}

/** An affected scope in a sovereign view operational status detail. */
export interface SovereignViewAffectedScopes {
  /** The name of the management group or subscription affected. */
  name: string;
  /** The identifier of the management group or subscription affected. */
  id: string;
  /** The type of the affected scope. */
  type: SovereignViewScopeType;
  /** The operational status of the affected scope. */
  status: ScopeLevelOperationalStatusStates;
  /** The action required to remediate the affected scope, such as a role name or a policy initiative id. */
  actionRequired?: string;
}

export function sovereignViewAffectedScopesDeserializer(item: any): SovereignViewAffectedScopes {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    status: item["status"],
    actionRequired: item["actionRequired"],
  };
}

/** The type of scope in a sovereign view. */
export enum KnownSovereignViewScopeType {
  /** A management group scope. */
  ManagementGroup = "ManagementGroup",
  /** A subscription scope. */
  Subscription = "Subscription",
}

/**
 * The type of scope in a sovereign view. \
 * {@link KnownSovereignViewScopeType} can be used interchangeably with SovereignViewScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ManagementGroup**: A management group scope. \
 * **Subscription**: A subscription scope.
 */
export type SovereignViewScopeType = string;

/** The operational status states for an individual scope within a sovereign view. */
export enum KnownScopeLevelOperationalStatusStates {
  /** The scope is unhealthy and its operability is impacted. */
  Unhealthy = "Unhealthy",
  /** The operational status of the scope could not be determined. */
  Unknown = "Unknown",
  /** The scope has been deleted. */
  Deleted = "Deleted",
}

/**
 * The operational status states for an individual scope within a sovereign view. \
 * {@link KnownScopeLevelOperationalStatusStates} can be used interchangeably with ScopeLevelOperationalStatusStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unhealthy**: The scope is unhealthy and its operability is impacted. \
 * **Unknown**: The operational status of the scope could not be determined. \
 * **Deleted**: The scope has been deleted.
 */
export type ScopeLevelOperationalStatusStates = string;

/** The request for the compliance reasoning of one resource and dimension. */
export interface SovereignViewComplianceResourceDetailsContent {
  /** The full Azure Resource Manager resource identifier of the resource for which compliance reasoning is requested. */
  resourceId: string;
  /** The compliance dimension for which reasoning is requested. */
  dimension: ComplianceDimension;
  /** The snapshot timestamp from the compliance-details response. When omitted, the latest completed snapshot is returned. */
  evaluatedAt?: Date;
}

export function sovereignViewComplianceResourceDetailsContentSerializer(
  item: SovereignViewComplianceResourceDetailsContent,
): any {
  return {
    resourceId: item["resourceId"],
    dimension: item["dimension"],
    evaluatedAt: !item["evaluatedAt"] ? item["evaluatedAt"] : item["evaluatedAt"].toISOString(),
  };
}

/** The compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources. */
export interface SovereignViewComplianceResourceDetailsResult {
  /** The evaluated resource Azure Resource Manager identifier. */
  resourceId: string;
  /** The compliance dimension for which reasoning is returned. */
  dimension: ComplianceDimension;
  /** The snapshot timestamp from which the response was produced. */
  evaluatedAt: Date;
  /** The compliance state for this dimension. */
  state: PolicyComplianceState;
  /** The linked and replica resource evaluations for this resource and dimension. */
  evaluations: SovereignViewDataEvaluation[];
}

export function sovereignViewComplianceResourceDetailsResultDeserializer(
  item: any,
): SovereignViewComplianceResourceDetailsResult {
  return {
    resourceId: item["resourceId"],
    dimension: item["dimension"],
    evaluatedAt: new Date(item["evaluatedAt"]),
    state: item["state"],
    evaluations: sovereignViewDataEvaluationArrayDeserializer(item["evaluations"]),
  };
}

export function sovereignViewDataEvaluationArrayDeserializer(
  result: Array<SovereignViewDataEvaluation>,
): any[] {
  return result.map((item) => {
    return sovereignViewDataEvaluationDeserializer(item);
  });
}

/** A linked or replica resource evaluation contributing to the compliance reasoning. */
export interface SovereignViewDataEvaluation {
  /** The stable identifier of the query that produced this evaluation. */
  evaluationSourceId: string;
  /** What the query was run to find. */
  intent: SovereignViewEvaluationIntent;
  /** The source that produced this linked or replica resource evaluation. */
  source: SovereignViewLinkedResourceEvaluationSource;
  /** The outcomes produced by the query, one per evaluated linked or replica resource. */
  evaluationOutcomes: SovereignViewDataEvaluationOutcome[];
}

export function sovereignViewDataEvaluationDeserializer(item: any): SovereignViewDataEvaluation {
  return {
    evaluationSourceId: item["evaluationSourceId"],
    intent: item["intent"],
    source: item["source"],
    evaluationOutcomes: sovereignViewDataEvaluationOutcomeArrayDeserializer(
      item["evaluationOutcomes"],
    ),
  };
}

/** What an evaluation query was run to find. */
export enum KnownSovereignViewEvaluationIntent {
  /** Resources linked to the evaluated resource. */
  LinkedResources = "LinkedResources",
  /** Geo-replicas of the evaluated resource. */
  GeoReplica = "GeoReplica",
  /** Business continuity characteristics of the evaluated resource. */
  BusinessContinuity = "BusinessContinuity",
}

/**
 * What an evaluation query was run to find. \
 * {@link KnownSovereignViewEvaluationIntent} can be used interchangeably with SovereignViewEvaluationIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LinkedResources**: Resources linked to the evaluated resource. \
 * **GeoReplica**: Geo-replicas of the evaluated resource. \
 * **BusinessContinuity**: Business continuity characteristics of the evaluated resource.
 */
export type SovereignViewEvaluationIntent = string;

/** The source that produced a linked or replica resource evaluation. */
export enum KnownSovereignViewLinkedResourceEvaluationSource {
  /** Azure Resource Graph. */
  ARG = "ARG",
  /** Log Analytics. */
  LogAnalytics = "LogAnalytics",
  /** The business continuity evaluation source. */
  BusinessContinuity = "BusinessContinuity",
}

/**
 * The source that produced a linked or replica resource evaluation. \
 * {@link KnownSovereignViewLinkedResourceEvaluationSource} can be used interchangeably with SovereignViewLinkedResourceEvaluationSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ARG**: Azure Resource Graph. \
 * **LogAnalytics**: Log Analytics. \
 * **BusinessContinuity**: The business continuity evaluation source.
 */
export type SovereignViewLinkedResourceEvaluationSource = string;

export function sovereignViewDataEvaluationOutcomeArrayDeserializer(
  result: Array<SovereignViewDataEvaluationOutcome>,
): any[] {
  return result.map((item) => {
    return sovereignViewDataEvaluationOutcomeDeserializer(item);
  });
}

/** The compliance reasoning outcome produced by an evaluation query for a single resource. */
export interface SovereignViewDataEvaluationOutcome {
  /** The Azure Resource Manager identifier of the linked or replica resource associated with the outcome. */
  resourceId?: string;
  /** The compliance state of the outcome. */
  state: PolicyComplianceState;
  /** The actual value observed by the evaluation. */
  actualValue?: string;
  /** The value expected by the evaluation. */
  expectedValue?: string;
  /** The reason for the outcome, in the service default language. Empty when the outcome has no reason. Clients that need a localized reason should resolve reasonCodeId instead. */
  reason?: string;
  /** The stable, language-neutral code that identifies the reason. Clients use this code to look up the localized reason string. */
  reasonCodeId?: string;
  /** Additional remediation or explanatory information, in the service default language. Clients that need localized text should resolve additionalInfoCodeId instead. */
  additionalInfo?: string;
  /** The stable, language-neutral code that identifies the additional information. Clients use this code to look up the localized additional information string. */
  additionalInfoCodeId?: string;
}

export function sovereignViewDataEvaluationOutcomeDeserializer(
  item: any,
): SovereignViewDataEvaluationOutcome {
  return {
    resourceId: item["resourceId"],
    state: item["state"],
    actualValue: item["actualValue"],
    expectedValue: item["expectedValue"],
    reason: item["reason"],
    reasonCodeId: item["reasonCodeId"],
    additionalInfo: item["additionalInfo"],
    additionalInfoCodeId: item["additionalInfoCodeId"],
  };
}

/** The request for the sovereign view remediate action. */
export interface SovereignViewRemediateContent {
  /** The remediation dimension being addressed. Only "DataResidency" is currently supported for remediation. */
  dimensionType: ComplianceDimension;
  /** The residency-specific remediation request, present when dimensionType is "DataResidency". */
  residencyRemediationRequest: SovereignViewResidencyRemediationContent;
}

export function sovereignViewRemediateContentSerializer(item: SovereignViewRemediateContent): any {
  return {
    dimensionType: item["dimensionType"],
    residencyRemediationRequest: sovereignViewResidencyRemediationContentSerializer(
      item["residencyRemediationRequest"],
    ),
  };
}

/** The residency remediation request payload. */
export interface SovereignViewResidencyRemediationContent {
  /** The residency remediation configuration. */
  configuration: SovereignViewResidencyRemediationConfiguration;
  /** The resources to remediate. */
  resources: SovereignViewResidencyRemediationResource[];
}

export function sovereignViewResidencyRemediationContentSerializer(
  item: SovereignViewResidencyRemediationContent,
): any {
  return {
    configuration: sovereignViewResidencyRemediationConfigurationSerializer(item["configuration"]),
    resources: sovereignViewResidencyRemediationResourceArraySerializer(item["resources"]),
  };
}

/** The configuration for a residency remediation request. */
export interface SovereignViewResidencyRemediationConfiguration {
  /** The target region resources should be remediated into. */
  targetRegion: string;
  /** The default resource group the remediated resources should be created in, if different from their source resource group. Can be overridden per-resource. */
  targetResourceGroupName?: string;
}

export function sovereignViewResidencyRemediationConfigurationSerializer(
  item: SovereignViewResidencyRemediationConfiguration,
): any {
  return {
    targetRegion: item["targetRegion"],
    targetResourceGroupName: item["targetResourceGroupName"],
  };
}

export function sovereignViewResidencyRemediationResourceArraySerializer(
  result: Array<SovereignViewResidencyRemediationResource>,
): any[] {
  return result.map((item) => {
    return sovereignViewResidencyRemediationResourceSerializer(item);
  });
}

/** A single resource targeted by a residency remediation request. */
export interface SovereignViewResidencyRemediationResource {
  /** The Azure Resource Manager resource ID of the resource to remediate. */
  id: string;
  /** The residency remediation configuration for this resource. */
  configuration: SovereignViewResidencyRemediationResourceConfiguration;
}

export function sovereignViewResidencyRemediationResourceSerializer(
  item: SovereignViewResidencyRemediationResource,
): any {
  return {
    id: item["id"],
    configuration: sovereignViewResidencyRemediationResourceConfigurationSerializer(
      item["configuration"],
    ),
  };
}

/** The per-resource configuration for a residency remediation request. */
export interface SovereignViewResidencyRemediationResourceConfiguration {
  /** The current region of the resource. */
  sourceRegion: string;
  /** The resource group the remediated resource should be created in, if different from the source resource group. */
  targetResourceGroupName?: string;
}

export function sovereignViewResidencyRemediationResourceConfigurationSerializer(
  item: SovereignViewResidencyRemediationResourceConfiguration,
): any {
  return {
    sourceRegion: item["sourceRegion"],
    targetResourceGroupName: item["targetResourceGroupName"],
  };
}

/** The response for the sovereign view remediate action. */
export interface SovereignViewRemediateResult {
  /** The identifier used to fetch the remediation result via the remediationResult action. */
  remediationId: string;
  /** The error encountered while starting remediation, if any. */
  error?: ErrorDetail;
}

export function sovereignViewRemediateResultDeserializer(item: any): SovereignViewRemediateResult {
  return {
    remediationId: item["remediationId"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The request for the sovereign view remediationResult action. */
export interface SovereignViewRemediationResultContent {
  /** The remediation identifier returned by the remediate action. */
  remediationId: string;
}

export function sovereignViewRemediationResultContentSerializer(
  item: SovereignViewRemediationResultContent,
): any {
  return { remediationId: item["remediationId"] };
}

/** The response for the sovereign view remediationResult action. */
export interface SovereignViewRemediationResult {
  /** The remediation identifier this result corresponds to. */
  remediationId: string;
  /** The remediation dimension this result corresponds to. Only "DataResidency" is currently supported for remediation. */
  dimensionType: ComplianceDimension;
  /** The status of the remediation, e.g. "Succeeded". */
  status: SovereignViewRemediationStatus;
  /** The remediation results. */
  results?: SovereignViewRemediationResultItem[];
  /** The error encountered while remediating, if any. */
  error?: ErrorDetail;
  /** The time of creation of this remediation result. */
  createdAt?: Date;
  /** The time at which this remediation result expires and is no longer retrievable. */
  expiresAt?: Date;
}

export function sovereignViewRemediationResultDeserializer(
  item: any,
): SovereignViewRemediationResult {
  return {
    remediationId: item["remediationId"],
    dimensionType: item["dimensionType"],
    status: item["status"],
    results: !item["results"]
      ? item["results"]
      : sovereignViewRemediationResultItemArrayDeserializer(item["results"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    expiresAt: !item["expiresAt"] ? item["expiresAt"] : new Date(item["expiresAt"]),
  };
}

/** The status of a sovereign view remediation. */
export enum KnownSovereignViewRemediationStatus {
  /** The remediation completed successfully. */
  Succeeded = "Succeeded",
  /** The remediation failed. */
  Failed = "Failed",
}

/**
 * The status of a sovereign view remediation. \
 * {@link KnownSovereignViewRemediationStatus} can be used interchangeably with SovereignViewRemediationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The remediation completed successfully. \
 * **Failed**: The remediation failed.
 */
export type SovereignViewRemediationStatus = string;

export function sovereignViewRemediationResultItemArrayDeserializer(
  result: Array<SovereignViewRemediationResultItem>,
): any[] {
  return result.map((item) => {
    return sovereignViewRemediationResultItemDeserializer(item);
  });
}

/** A single remediation result item. */
export interface SovereignViewRemediationResultItem {
  /** The Azure Resource Manager resource IDs this result item applies to. */
  resourceIds: string[];
  /** The type of remediation payload returned. */
  type: SovereignViewRemediationPayloadType;
  /** The remediation payload. */
  result: SovereignViewArmTemplateBundle;
}

export function sovereignViewRemediationResultItemDeserializer(
  item: any,
): SovereignViewRemediationResultItem {
  return {
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
    type: item["type"],
    result: sovereignViewArmTemplateBundleDeserializer(item["result"]),
  };
}

/** The type of remediation payload returned in a remediation result item. */
export enum KnownSovereignViewRemediationPayloadType {
  /** The remediation payload is an Azure Resource Manager template bundle. */
  ArmTemplateBundle = "ArmTemplateBundle",
}

/**
 * The type of remediation payload returned in a remediation result item. \
 * {@link KnownSovereignViewRemediationPayloadType} can be used interchangeably with SovereignViewRemediationPayloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ArmTemplateBundle**: The remediation payload is an Azure Resource Manager template bundle.
 */
export type SovereignViewRemediationPayloadType = string;

/** An Azure Resource Manager template bundle produced by a remediation. */
export interface SovereignViewArmTemplateBundle {
  /** The Azure Resource Manager template, serialized as a JSON string. */
  template: string;
  /** The Azure Resource Manager template parameters, serialized as a JSON string. */
  parameters: string;
}

export function sovereignViewArmTemplateBundleDeserializer(
  item: any,
): SovereignViewArmTemplateBundle {
  return {
    template: item["template"],
    parameters: item["parameters"],
  };
}

/** The Microsoft Sovereign Provider version. */
export enum KnownVersions {
  /** The 2026-10-31 preview version. */
  Preview20261031 = "2026-10-31-preview",
}
