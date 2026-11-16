// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Model that represents a Capability resource. */
export interface Capability extends ProxyResource {
  /** The properties of a capability resource. */
  properties?: CapabilityProperties;
}

export function capabilitySerializer(item: Capability): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : capabilityPropertiesSerializer(item["properties"]),
  };
}

export function capabilityDeserializer(item: any): Capability {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capabilityPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the Capability properties model. */
export interface CapabilityProperties {
  /** String of the Publisher that this Capability extends. */
  readonly publisher?: string;
  /** String of the Target Type that this Capability extends. */
  readonly targetType?: string;
  /** Localized string of the description. */
  readonly description?: string;
  /** URL to retrieve JSON schema of the Capability parameters. */
  readonly parametersSchema?: string;
  /** String of the URN for this Capability Type. */
  readonly urn?: string;
  /** Resource provisioning state. Not currently in use because resource is created synchronously. */
  readonly provisioningState?: ProvisioningState;
}

export function capabilityPropertiesSerializer(_item: CapabilityProperties): any {
  return {};
}

export function capabilityPropertiesDeserializer(item: any): CapabilityProperties {
  return {
    publisher: item["publisher"],
    targetType: item["targetType"],
    description: item["description"],
    parametersSchema: item["parametersSchema"],
    urn: item["urn"],
    provisioningState: item["provisioningState"],
  };
}

/** Current provisioning state for a given Azure Chaos resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Initial creation in progress. */
  Creating = "Creating",
  /** Update in progress. */
  Updating = "Updating",
  /** Deletion in progress. */
  Deleting = "Deleting",
  /** Action is running. */
  Running = "Running",
}

/**
 * Current provisioning state for a given Azure Chaos resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Initial creation in progress. \
 * **Updating**: Update in progress. \
 * **Deleting**: Deletion in progress. \
 * **Running**: Action is running.
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

/** Model that represents a list of Capability resources and a link for pagination. */
export interface _CapabilityListResult {
  /** The Capability items on this page */
  value: Capability[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilityListResultDeserializer(item: any): _CapabilityListResult {
  return {
    value: capabilityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityArraySerializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilitySerializer(item);
  });
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
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

/** Model that represents a Target resource. */
export interface Target extends ProxyResource {
  /** The properties of the target resource. */
  properties: Record<string, any>;
  /** Azure resource location. */
  location?: string;
}

export function targetSerializer(item: Target): any {
  return { properties: item["properties"], location: item["location"] };
}

export function targetDeserializer(item: any): Target {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: Object.fromEntries(
      Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    location: item["location"],
  };
}

/** Model that represents a list of Target resources and a link for pagination. */
export interface _TargetListResult {
  /** The Target items on this page */
  value: Target[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _targetListResultDeserializer(item: any): _TargetListResult {
  return {
    value: targetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetArraySerializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetSerializer(item);
  });
}

export function targetArrayDeserializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetDeserializer(item);
  });
}

/** Model that represents a Capability Type resource. */
export interface CapabilityType extends ProxyResource {
  /** The properties of the capability type resource. */
  properties?: CapabilityTypeProperties;
}

export function capabilityTypeDeserializer(item: any): CapabilityType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capabilityTypePropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the Capability Type properties model. */
export interface CapabilityTypeProperties {
  /** String of the Publisher that this Capability Type extends. */
  readonly publisher?: string;
  /** String of the Target Type that this Capability Type extends. */
  readonly targetType?: string;
  /** Localized string of the display name. */
  readonly displayName?: string;
  /** Localized string of the description. */
  readonly description?: string;
  /** URL to retrieve JSON schema of the Capability Type parameters. */
  readonly parametersSchema?: string;
  /** String of the URN for this Capability Type. */
  readonly urn?: string;
  /** String of the kind of this Capability Type. */
  readonly kind?: string;
  /** Control plane actions necessary to execute capability type. */
  readonly azureRbacActions?: string[];
  /** Data plane actions necessary to execute capability type. */
  readonly azureRbacDataActions?: string[];
  /** Required Azure Role Definition Ids to execute capability type. */
  readonly requiredAzureRoleDefinitionIds?: string[];
  /** Runtime properties of this Capability Type. */
  readonly runtimeProperties?: CapabilityTypePropertiesRuntimeProperties;
}

export function capabilityTypePropertiesDeserializer(item: any): CapabilityTypeProperties {
  return {
    publisher: item["publisher"],
    targetType: item["targetType"],
    displayName: item["displayName"],
    description: item["description"],
    parametersSchema: item["parametersSchema"],
    urn: item["urn"],
    kind: item["kind"],
    azureRbacActions: !item["azureRbacActions"]
      ? item["azureRbacActions"]
      : item["azureRbacActions"].map((p: any) => {
          return p;
        }),
    azureRbacDataActions: !item["azureRbacDataActions"]
      ? item["azureRbacDataActions"]
      : item["azureRbacDataActions"].map((p: any) => {
          return p;
        }),
    requiredAzureRoleDefinitionIds: !item["requiredAzureRoleDefinitionIds"]
      ? item["requiredAzureRoleDefinitionIds"]
      : item["requiredAzureRoleDefinitionIds"].map((p: any) => {
          return p;
        }),
    runtimeProperties: !item["runtimeProperties"]
      ? item["runtimeProperties"]
      : capabilityTypePropertiesRuntimePropertiesDeserializer(item["runtimeProperties"]),
  };
}

/** Runtime properties of this Capability Type. */
export interface CapabilityTypePropertiesRuntimeProperties {
  /** String of the kind of the resource's action type (continuous or discrete). */
  readonly kind?: string;
}

export function capabilityTypePropertiesRuntimePropertiesDeserializer(
  item: any,
): CapabilityTypePropertiesRuntimeProperties {
  return {
    kind: item["kind"],
  };
}

/** Model that represents a list of Capability Type resources and a link for pagination. */
export interface _CapabilityTypeListResult {
  /** The CapabilityType items on this page */
  value: CapabilityType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilityTypeListResultDeserializer(item: any): _CapabilityTypeListResult {
  return {
    value: capabilityTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityTypeArrayDeserializer(result: Array<CapabilityType>): any[] {
  return result.map((item) => {
    return capabilityTypeDeserializer(item);
  });
}

/** Model that represents a Experiment resource. */
export interface Experiment extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The properties of the experiment resource. */
  properties: ExperimentProperties;
}

export function experimentSerializer(item: Experiment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: experimentPropertiesSerializer(item["properties"]),
  };
}

export function experimentDeserializer(item: any): Experiment {
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
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    properties: experimentPropertiesDeserializer(item["properties"]),
  };
}

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

/** Model that represents the Experiment properties model. */
export interface ExperimentProperties {
  /** Most recent provisioning state for the given experiment resource. */
  readonly provisioningState?: ProvisioningState;
  /** List of steps. */
  steps: ChaosExperimentStep[];
  /** List of selectors. */
  selectors: ChaosTargetSelectorUnion[];
  /** Optional customer-managed Storage account where Experiment schema will be stored. */
  customerDataStorage?: CustomerDataStorageProperties;
}

export function experimentPropertiesSerializer(item: ExperimentProperties): any {
  return {
    steps: chaosExperimentStepArraySerializer(item["steps"]),
    selectors: chaosTargetSelectorUnionArraySerializer(item["selectors"]),
    customerDataStorage: !item["customerDataStorage"]
      ? item["customerDataStorage"]
      : customerDataStoragePropertiesSerializer(item["customerDataStorage"]),
  };
}

export function experimentPropertiesDeserializer(item: any): ExperimentProperties {
  return {
    provisioningState: item["provisioningState"],
    steps: chaosExperimentStepArrayDeserializer(item["steps"]),
    selectors: chaosTargetSelectorUnionArrayDeserializer(item["selectors"]),
    customerDataStorage: !item["customerDataStorage"]
      ? item["customerDataStorage"]
      : customerDataStoragePropertiesDeserializer(item["customerDataStorage"]),
  };
}

export function chaosExperimentStepArraySerializer(result: Array<ChaosExperimentStep>): any[] {
  return result.map((item) => {
    return chaosExperimentStepSerializer(item);
  });
}

export function chaosExperimentStepArrayDeserializer(result: Array<ChaosExperimentStep>): any[] {
  return result.map((item) => {
    return chaosExperimentStepDeserializer(item);
  });
}

/** Model that represents a step in the Experiment resource. */
export interface ChaosExperimentStep {
  /** String of the step name. */
  name: string;
  /** List of branches. */
  branches: ChaosExperimentBranch[];
}

export function chaosExperimentStepSerializer(item: ChaosExperimentStep): any {
  return { name: item["name"], branches: chaosExperimentBranchArraySerializer(item["branches"]) };
}

export function chaosExperimentStepDeserializer(item: any): ChaosExperimentStep {
  return {
    name: item["name"],
    branches: chaosExperimentBranchArrayDeserializer(item["branches"]),
  };
}

export function chaosExperimentBranchArraySerializer(result: Array<ChaosExperimentBranch>): any[] {
  return result.map((item) => {
    return chaosExperimentBranchSerializer(item);
  });
}

export function chaosExperimentBranchArrayDeserializer(
  result: Array<ChaosExperimentBranch>,
): any[] {
  return result.map((item) => {
    return chaosExperimentBranchDeserializer(item);
  });
}

/** Model that represents a branch in the step. 9 total per experiment. */
export interface ChaosExperimentBranch {
  /** String of the branch name. */
  name: string;
  /** List of actions. */
  actions: ChaosExperimentActionUnion[];
}

export function chaosExperimentBranchSerializer(item: ChaosExperimentBranch): any {
  return {
    name: item["name"],
    actions: chaosExperimentActionUnionArraySerializer(item["actions"]),
  };
}

export function chaosExperimentBranchDeserializer(item: any): ChaosExperimentBranch {
  return {
    name: item["name"],
    actions: chaosExperimentActionUnionArrayDeserializer(item["actions"]),
  };
}

export function chaosExperimentActionUnionArraySerializer(
  result: Array<ChaosExperimentActionUnion>,
): any[] {
  return result.map((item) => {
    return chaosExperimentActionUnionSerializer(item);
  });
}

export function chaosExperimentActionUnionArrayDeserializer(
  result: Array<ChaosExperimentActionUnion>,
): any[] {
  return result.map((item) => {
    return chaosExperimentActionUnionDeserializer(item);
  });
}

/** Model that represents the base action model. 9 total per experiment. */
export interface ChaosExperimentAction {
  /** String that represents a Capability URN. */
  name: string;
  /** Chaos experiment action discriminator type */
  /** The discriminator possible values: continuous, delay, discrete */
  type: ExperimentActionType;
}

export function chaosExperimentActionSerializer(item: ChaosExperimentAction): any {
  return { name: item["name"], type: item["type"] };
}

export function chaosExperimentActionDeserializer(item: any): ChaosExperimentAction {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Alias for ChaosExperimentActionUnion */
export type ChaosExperimentActionUnion =
  ContinuousAction | DelayAction | DiscreteAction | ChaosExperimentAction;

export function chaosExperimentActionUnionSerializer(item: ChaosExperimentActionUnion): any {
  switch (item.type) {
    case "continuous":
      return continuousActionSerializer(item as ContinuousAction);

    case "delay":
      return delayActionSerializer(item as DelayAction);

    case "discrete":
      return discreteActionSerializer(item as DiscreteAction);

    default:
      return chaosExperimentActionSerializer(item);
  }
}

export function chaosExperimentActionUnionDeserializer(item: any): ChaosExperimentActionUnion {
  switch (item["type"]) {
    case "continuous":
      return continuousActionDeserializer(item as ContinuousAction);

    case "delay":
      return delayActionDeserializer(item as DelayAction);

    case "discrete":
      return discreteActionDeserializer(item as DiscreteAction);

    default:
      return chaosExperimentActionDeserializer(item);
  }
}

/** Enum union of Chaos experiment action types. */
export enum KnownExperimentActionType {
  /** delay */
  Delay = "delay",
  /** discrete */
  Discrete = "discrete",
  /** continuous */
  Continuous = "continuous",
}

/**
 * Enum union of Chaos experiment action types. \
 * {@link KnownExperimentActionType} can be used interchangeably with ExperimentActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **delay** \
 * **discrete** \
 * **continuous**
 */
export type ExperimentActionType = string;

/** Model that represents a continuous action. */
export interface ContinuousAction extends ChaosExperimentAction {
  /** ISO8601 formatted string that represents a duration. */
  duration: string;
  /** List of key value pairs. */
  parameters: KeyValuePair[];
  /** String that represents a selector. */
  selectorId: string;
  /** Enum that discriminates between action models. */
  type: "continuous";
}

export function continuousActionSerializer(item: ContinuousAction): any {
  return {
    name: item["name"],
    type: item["type"],
    duration: item["duration"],
    parameters: keyValuePairArraySerializer(item["parameters"]),
    selectorId: item["selectorId"],
  };
}

export function continuousActionDeserializer(item: any): ContinuousAction {
  return {
    name: item["name"],
    type: item["type"],
    duration: item["duration"],
    parameters: keyValuePairArrayDeserializer(item["parameters"]),
    selectorId: item["selectorId"],
  };
}

export function keyValuePairArraySerializer(result: Array<KeyValuePair>): any[] {
  return result.map((item) => {
    return keyValuePairSerializer(item);
  });
}

export function keyValuePairArrayDeserializer(result: Array<KeyValuePair>): any[] {
  return result.map((item) => {
    return keyValuePairDeserializer(item);
  });
}

/** A key-value pair used to describe parameters for actions or configurations. */
export interface KeyValuePair {
  /** The name of the setting for the action. */
  key: string;
  /** The value of the setting for the action. */
  value: string;
}

export function keyValuePairSerializer(item: KeyValuePair): any {
  return { key: item["key"], value: item["value"] };
}

export function keyValuePairDeserializer(item: any): KeyValuePair {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Model that represents a delay action. */
export interface DelayAction extends ChaosExperimentAction {
  /** ISO8601 formatted string that represents a duration. */
  duration: string;
  /** Enum that discriminates between action models. */
  type: "delay";
}

export function delayActionSerializer(item: DelayAction): any {
  return { name: item["name"], type: item["type"], duration: item["duration"] };
}

export function delayActionDeserializer(item: any): DelayAction {
  return {
    name: item["name"],
    type: item["type"],
    duration: item["duration"],
  };
}

/** Model that represents a discrete action. */
export interface DiscreteAction extends ChaosExperimentAction {
  /** List of key value pairs. */
  parameters: KeyValuePair[];
  /** String that represents a selector. */
  selectorId: string;
  /** Enum that discriminates between action models. */
  type: "discrete";
}

export function discreteActionSerializer(item: DiscreteAction): any {
  return {
    name: item["name"],
    type: item["type"],
    parameters: keyValuePairArraySerializer(item["parameters"]),
    selectorId: item["selectorId"],
  };
}

export function discreteActionDeserializer(item: any): DiscreteAction {
  return {
    name: item["name"],
    type: item["type"],
    parameters: keyValuePairArrayDeserializer(item["parameters"]),
    selectorId: item["selectorId"],
  };
}

export function chaosTargetSelectorUnionArraySerializer(
  result: Array<ChaosTargetSelectorUnion>,
): any[] {
  return result.map((item) => {
    return chaosTargetSelectorUnionSerializer(item);
  });
}

export function chaosTargetSelectorUnionArrayDeserializer(
  result: Array<ChaosTargetSelectorUnion>,
): any[] {
  return result.map((item) => {
    return chaosTargetSelectorUnionDeserializer(item);
  });
}

/** Model that represents a selector in the Experiment resource. */
export interface ChaosTargetSelector {
  /** String of the selector ID. */
  id: string;
  /** Chaos target selector discriminator type */
  /** The discriminator possible values: List, Query */
  type: SelectorType;
  /** Model that represents available filter types that can be applied to a targets list. */
  filter?: ChaosTargetFilterUnion;
}

export function chaosTargetSelectorSerializer(item: ChaosTargetSelector): any {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionSerializer(item["filter"]),
  };
}

export function chaosTargetSelectorDeserializer(item: any): ChaosTargetSelector {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionDeserializer(item["filter"]),
  };
}

/** Alias for ChaosTargetSelectorUnion */
export type ChaosTargetSelectorUnion =
  ChaosTargetListSelector | ChaosTargetQuerySelector | ChaosTargetSelector;

export function chaosTargetSelectorUnionSerializer(item: ChaosTargetSelectorUnion): any {
  switch (item.type) {
    case "List":
      return chaosTargetListSelectorSerializer(item as ChaosTargetListSelector);

    case "Query":
      return chaosTargetQuerySelectorSerializer(item as ChaosTargetQuerySelector);

    default:
      return chaosTargetSelectorSerializer(item);
  }
}

export function chaosTargetSelectorUnionDeserializer(item: any): ChaosTargetSelectorUnion {
  switch (item["type"]) {
    case "List":
      return chaosTargetListSelectorDeserializer(item as ChaosTargetListSelector);

    case "Query":
      return chaosTargetQuerySelectorDeserializer(item as ChaosTargetQuerySelector);

    default:
      return chaosTargetSelectorDeserializer(item);
  }
}

/** Enum of the selector type. */
export enum KnownSelectorType {
  /** List selector type. */
  List = "List",
  /** Query selector type. */
  Query = "Query",
}

/**
 * Enum of the selector type. \
 * {@link KnownSelectorType} can be used interchangeably with SelectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **List**: List selector type. \
 * **Query**: Query selector type.
 */
export type SelectorType = string;

/** Model that represents available filter types that can be applied to a targets list. */
export interface ChaosTargetFilter {
  /** Chaos target filter discriminator type */
  /** The discriminator possible values: Simple */
  type: FilterType;
}

export function chaosTargetFilterSerializer(item: ChaosTargetFilter): any {
  return { type: item["type"] };
}

export function chaosTargetFilterDeserializer(item: any): ChaosTargetFilter {
  return {
    type: item["type"],
  };
}

/** Alias for ChaosTargetFilterUnion */
export type ChaosTargetFilterUnion = ChaosTargetSimpleFilter | ChaosTargetFilter;

export function chaosTargetFilterUnionSerializer(item: ChaosTargetFilterUnion): any {
  switch (item.type) {
    case "Simple":
      return chaosTargetSimpleFilterSerializer(item as ChaosTargetSimpleFilter);

    default:
      return chaosTargetFilterSerializer(item);
  }
}

export function chaosTargetFilterUnionDeserializer(item: any): ChaosTargetFilterUnion {
  switch (item["type"]) {
    case "Simple":
      return chaosTargetSimpleFilterDeserializer(item as ChaosTargetSimpleFilter);

    default:
      return chaosTargetFilterDeserializer(item);
  }
}

/** Enum that discriminates between filter types. Currently only `Simple` type is supported. */
export enum KnownFilterType {
  /** Simple filter type. */
  Simple = "Simple",
}

/**
 * Enum that discriminates between filter types. Currently only `Simple` type is supported. \
 * {@link KnownFilterType} can be used interchangeably with FilterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Simple**: Simple filter type.
 */
export type FilterType = string;

/** Model that represents a simple target filter. */
export interface ChaosTargetSimpleFilter extends ChaosTargetFilter {
  /** Model that represents the Simple filter parameters. */
  parameters?: ChaosTargetSimpleFilterParameters;
  /** Enum that discriminates between filter types. Currently only `Simple` type is supported. */
  type: "Simple";
}

export function chaosTargetSimpleFilterSerializer(item: ChaosTargetSimpleFilter): any {
  return {
    type: item["type"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : chaosTargetSimpleFilterParametersSerializer(item["parameters"]),
  };
}

export function chaosTargetSimpleFilterDeserializer(item: any): ChaosTargetSimpleFilter {
  return {
    type: item["type"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : chaosTargetSimpleFilterParametersDeserializer(item["parameters"]),
  };
}

/** Model that represents the Simple filter parameters. */
export interface ChaosTargetSimpleFilterParameters {
  /** List of Azure availability zones to filter targets by. */
  zones?: string[];
}

export function chaosTargetSimpleFilterParametersSerializer(
  item: ChaosTargetSimpleFilterParameters,
): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function chaosTargetSimpleFilterParametersDeserializer(
  item: any,
): ChaosTargetSimpleFilterParameters {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Model that represents a list selector. */
export interface ChaosTargetListSelector extends ChaosTargetSelector {
  /** List of Target references. */
  targets: TargetReference[];
  /** Enum of the selector type. */
  type: "List";
}

export function chaosTargetListSelectorSerializer(item: ChaosTargetListSelector): any {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionSerializer(item["filter"]),
    targets: targetReferenceArraySerializer(item["targets"]),
  };
}

export function chaosTargetListSelectorDeserializer(item: any): ChaosTargetListSelector {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionDeserializer(item["filter"]),
    targets: targetReferenceArrayDeserializer(item["targets"]),
  };
}

export function targetReferenceArraySerializer(result: Array<TargetReference>): any[] {
  return result.map((item) => {
    return targetReferenceSerializer(item);
  });
}

export function targetReferenceArrayDeserializer(result: Array<TargetReference>): any[] {
  return result.map((item) => {
    return targetReferenceDeserializer(item);
  });
}

/** Model that represents a reference to a Target in the selector. */
export interface TargetReference {
  /** Enum of the Target reference type. */
  type: TargetReferenceType;
  /** String of the resource ID of a Target resource. */
  id: string;
}

export function targetReferenceSerializer(item: TargetReference): any {
  return { type: item["type"], id: item["id"] };
}

export function targetReferenceDeserializer(item: any): TargetReference {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Enum of the Target reference type. */
export enum KnownTargetReferenceType {
  /** Chaos target reference type. */
  ChaosTarget = "ChaosTarget",
}

/**
 * Enum of the Target reference type. \
 * {@link KnownTargetReferenceType} can be used interchangeably with TargetReferenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ChaosTarget**: Chaos target reference type.
 */
export type TargetReferenceType = string;

/** Model that represents a query selector. */
export interface ChaosTargetQuerySelector extends ChaosTargetSelector {
  /** Azure Resource Graph (ARG) Query Language query for target resources. */
  queryString: string;
  /** Subscription id list to scope resource query. */
  subscriptionIds: string[];
  /** Enum of the selector type. */
  type: "Query";
}

export function chaosTargetQuerySelectorSerializer(item: ChaosTargetQuerySelector): any {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionSerializer(item["filter"]),
    queryString: item["queryString"],
    subscriptionIds: item["subscriptionIds"].map((p: any) => {
      return p;
    }),
  };
}

export function chaosTargetQuerySelectorDeserializer(item: any): ChaosTargetQuerySelector {
  return {
    id: item["id"],
    type: item["type"],
    filter: !item["filter"] ? item["filter"] : chaosTargetFilterUnionDeserializer(item["filter"]),
    queryString: item["queryString"],
    subscriptionIds: item["subscriptionIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Model that represents the Customer Managed Storage for an Experiment. */
export interface CustomerDataStorageProperties {
  /** Azure Resource ID of the Storage account to use for Customer Data storage. */
  storageAccountResourceId?: string;
  /** Name of the Azure Blob Storage container to use or create. */
  blobContainerName?: string;
}

export function customerDataStoragePropertiesSerializer(item: CustomerDataStorageProperties): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainerName: item["blobContainerName"],
  };
}

export function customerDataStoragePropertiesDeserializer(
  item: any,
): CustomerDataStorageProperties {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainerName: item["blobContainerName"],
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

/** Describes an experiment update. */
export interface ExperimentUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function experimentUpdateSerializer(item: ExperimentUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Model that represents a list of Experiment resources and a link for pagination. */
export interface _ExperimentListResult {
  /** The Experiment items on this page */
  value: Experiment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _experimentListResultDeserializer(item: any): _ExperimentListResult {
  return {
    value: experimentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function experimentArraySerializer(result: Array<Experiment>): any[] {
  return result.map((item) => {
    return experimentSerializer(item);
  });
}

export function experimentArrayDeserializer(result: Array<Experiment>): any[] {
  return result.map((item) => {
    return experimentDeserializer(item);
  });
}

/** Model that represents the execution of a Experiment. */
export interface ExperimentExecution extends ProxyResource {
  /** The properties of experiment execution status. */
  properties?: ExperimentExecutionProperties;
}

export function experimentExecutionDeserializer(item: any): ExperimentExecution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : experimentExecutionPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the execution properties of an Experiment. */
export interface ExperimentExecutionProperties {
  /** The status of the execution. */
  readonly status?: string;
  /** String that represents the start date time. */
  readonly startedAt?: Date;
  /** String that represents the stop date time. */
  readonly stoppedAt?: Date;
  /** Resource provisioning state. Not currently in use for executions. */
  readonly provisioningState?: ProvisioningState;
}

export function experimentExecutionPropertiesDeserializer(
  item: any,
): ExperimentExecutionProperties {
  return {
    status: item["status"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    stoppedAt: !item["stoppedAt"] ? item["stoppedAt"] : new Date(item["stoppedAt"]),
    provisioningState: item["provisioningState"],
  };
}

/** Model that represents a list of Experiment executions and a link for pagination. */
export interface _ExperimentExecutionListResult {
  /** The ExperimentExecution items on this page */
  value: ExperimentExecution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _experimentExecutionListResultDeserializer(
  item: any,
): _ExperimentExecutionListResult {
  return {
    value: experimentExecutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function experimentExecutionArrayDeserializer(result: Array<ExperimentExecution>): any[] {
  return result.map((item) => {
    return experimentExecutionDeserializer(item);
  });
}

/** Model that represents the execution details of an Experiment. */
export interface ExperimentExecutionDetails {
  /** String of the resource type. */
  readonly type?: string;
  /** String of the fully qualified resource ID. */
  readonly id?: string;
  /** String of the resource name. */
  readonly name?: string;
  /** The properties of the experiment execution details. */
  readonly properties?: ExperimentExecutionDetailsProperties;
}

export function experimentExecutionDetailsDeserializer(item: any): ExperimentExecutionDetails {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : experimentExecutionDetailsPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the extended properties of an experiment execution. */
export interface ExperimentExecutionDetailsProperties {
  /** The status of the execution. */
  readonly status?: string;
  /** String that represents the start date time. */
  readonly startedAt?: Date;
  /** String that represents the stop date time. */
  readonly stoppedAt?: Date;
  /** Resource provisioning state. Not currently in use for executions. */
  readonly provisioningState?: ProvisioningState;
  /** The reason why the execution failed. */
  readonly failureReason?: string;
  /** String that represents the last action date time. */
  readonly lastActionAt?: Date;
  /** The information of the experiment run. */
  readonly runInformation?: ExperimentExecutionDetailsPropertiesRunInformation;
}

export function experimentExecutionDetailsPropertiesDeserializer(
  item: any,
): ExperimentExecutionDetailsProperties {
  return {
    status: item["status"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    stoppedAt: !item["stoppedAt"] ? item["stoppedAt"] : new Date(item["stoppedAt"]),
    provisioningState: item["provisioningState"],
    failureReason: item["failureReason"],
    lastActionAt: !item["lastActionAt"] ? item["lastActionAt"] : new Date(item["lastActionAt"]),
    runInformation: !item["runInformation"]
      ? item["runInformation"]
      : experimentExecutionDetailsPropertiesRunInformationDeserializer(item["runInformation"]),
  };
}

/** The information of the experiment run. */
export interface ExperimentExecutionDetailsPropertiesRunInformation {
  /** The steps of the experiment run. */
  readonly steps?: StepStatus[];
}

export function experimentExecutionDetailsPropertiesRunInformationDeserializer(
  item: any,
): ExperimentExecutionDetailsPropertiesRunInformation {
  return {
    steps: !item["steps"] ? item["steps"] : stepStatusArrayDeserializer(item["steps"]),
  };
}

export function stepStatusArrayDeserializer(result: Array<StepStatus>): any[] {
  return result.map((item) => {
    return stepStatusDeserializer(item);
  });
}

/** Model that represents the a list of branches and branch statuses. */
export interface StepStatus {
  /** The name of the step. */
  readonly stepName?: string;
  /** The id of the step. */
  readonly stepId?: string;
  /** The value of the status of the step. */
  readonly status?: string;
  /** The array of branches. */
  readonly branches?: BranchStatus[];
}

export function stepStatusDeserializer(item: any): StepStatus {
  return {
    stepName: item["stepName"],
    stepId: item["stepId"],
    status: item["status"],
    branches: !item["branches"]
      ? item["branches"]
      : branchStatusArrayDeserializer(item["branches"]),
  };
}

export function branchStatusArrayDeserializer(result: Array<BranchStatus>): any[] {
  return result.map((item) => {
    return branchStatusDeserializer(item);
  });
}

/** Model that represents the a list of actions and action statuses. */
export interface BranchStatus {
  /** The name of the branch status. */
  readonly branchName?: string;
  /** The id of the branch status. */
  readonly branchId?: string;
  /** The status of the branch. */
  readonly status?: string;
  /** The array of actions. */
  readonly actions?: ActionStatus[];
}

export function branchStatusDeserializer(item: any): BranchStatus {
  return {
    branchName: item["branchName"],
    branchId: item["branchId"],
    status: item["status"],
    actions: !item["actions"] ? item["actions"] : actionStatusArrayDeserializer(item["actions"]),
  };
}

export function actionStatusArrayDeserializer(result: Array<ActionStatus>): any[] {
  return result.map((item) => {
    return actionStatusDeserializer(item);
  });
}

/** Model that represents the an action and its status. */
export interface ActionStatus {
  /** The name of the action status. */
  readonly actionName?: string;
  /** The id of the action status. */
  readonly actionId?: string;
  /** The status of the action. */
  readonly status?: string;
  /** String that represents the start time of the action. */
  readonly startTime?: Date;
  /** String that represents the end time of the action. */
  readonly endTime?: Date;
  /** The array of targets. */
  readonly targets?: ExperimentExecutionActionTargetDetailsProperties[];
}

export function actionStatusDeserializer(item: any): ActionStatus {
  return {
    actionName: item["actionName"],
    actionId: item["actionId"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    targets: !item["targets"]
      ? item["targets"]
      : experimentExecutionActionTargetDetailsPropertiesArrayDeserializer(item["targets"]),
  };
}

export function experimentExecutionActionTargetDetailsPropertiesArrayDeserializer(
  result: Array<ExperimentExecutionActionTargetDetailsProperties>,
): any[] {
  return result.map((item) => {
    return experimentExecutionActionTargetDetailsPropertiesDeserializer(item);
  });
}

/** Model that represents the Experiment action target details properties model. */
export interface ExperimentExecutionActionTargetDetailsProperties {
  /** The status of the execution. */
  readonly status?: string;
  /** The target for the action. */
  readonly target?: string;
  /** String that represents the failed date time. */
  readonly targetFailedTime?: Date;
  /** String that represents the completed date time. */
  readonly targetCompletedTime?: Date;
  /** The error of the action. */
  readonly error?: ExperimentExecutionActionTargetDetailsError;
}

export function experimentExecutionActionTargetDetailsPropertiesDeserializer(
  item: any,
): ExperimentExecutionActionTargetDetailsProperties {
  return {
    status: item["status"],
    target: item["target"],
    targetFailedTime: !item["targetFailedTime"]
      ? item["targetFailedTime"]
      : new Date(item["targetFailedTime"]),
    targetCompletedTime: !item["targetCompletedTime"]
      ? item["targetCompletedTime"]
      : new Date(item["targetCompletedTime"]),
    error: !item["error"]
      ? item["error"]
      : experimentExecutionActionTargetDetailsErrorDeserializer(item["error"]),
  };
}

/** Model that represents the Experiment action target details error model. */
export interface ExperimentExecutionActionTargetDetailsError {
  /** The error code. */
  readonly code?: string;
  /** The error message */
  readonly message?: string;
}

export function experimentExecutionActionTargetDetailsErrorDeserializer(
  item: any,
): ExperimentExecutionActionTargetDetailsError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Model that represents an Action resource. */
export interface Action extends ProxyResource {
  /** The properties of the action resource. */
  properties: ActionProperties;
}

export function actionDeserializer(item: any): Action {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: actionPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of an Action resource. */
export interface ActionProperties {
  /** Canonical identifier of the action (e.g., "microsoft-compute-shutdown/1.0"). */
  readonly canonicalId?: string;
  /** Human-readable display name of the action. */
  readonly displayName?: string;
  /** Description of what this action does. */
  readonly description?: string;
  /** The short name of the action (e.g., "Shutdown"). */
  readonly actionName?: string;
  /** The version of the action (e.g., "1.0.0"). */
  readonly version?: string;
  /** The type of the action. */
  readonly actionType?: ActionKind;
  /** List of target types supported by this action. */
  readonly supportedTargetTypes?: ActionSupportedTargetType[];
  /** JSON Schema describing the parameters for this action. */
  readonly parametersSchema?: Record<string, any>;
  /** Recommended Azure RBAC role definition GUIDs for this action. */
  readonly recommendedRoles?: string[];
}

export function actionPropertiesDeserializer(item: any): ActionProperties {
  return {
    canonicalId: item["canonicalId"],
    displayName: item["displayName"],
    description: item["description"],
    actionName: item["actionName"],
    version: item["version"],
    actionType: item["actionType"],
    supportedTargetTypes: !item["supportedTargetTypes"]
      ? item["supportedTargetTypes"]
      : actionSupportedTargetTypeArrayDeserializer(item["supportedTargetTypes"]),
    parametersSchema: !item["parametersSchema"]
      ? item["parametersSchema"]
      : _actionPropertiesParametersSchemaDeserializer(item["parametersSchema"]),
    recommendedRoles: !item["recommendedRoles"]
      ? item["recommendedRoles"]
      : item["recommendedRoles"].map((p: any) => {
          return p;
        }),
  };
}

/** Union of action types. */
export enum KnownActionKind {
  /** Discrete action type. */
  Discrete = "Discrete",
  /** Continuous action type. */
  Continuous = "Continuous",
  /** Cancelable action type. */
  Cancelable = "Cancelable",
}

/**
 * Union of action types. \
 * {@link KnownActionKind} can be used interchangeably with ActionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Discrete**: Discrete action type. \
 * **Continuous**: Continuous action type. \
 * **Cancelable**: Cancelable action type.
 */
export type ActionKind = string;

export function actionSupportedTargetTypeArrayDeserializer(
  result: Array<ActionSupportedTargetType>,
): any[] {
  return result.map((item) => {
    return actionSupportedTargetTypeDeserializer(item);
  });
}

/** Model that represents a target type supported by an action. */
export interface ActionSupportedTargetType {
  /** The Azure resource type (e.g., "Microsoft.Compute/virtualMachines"). */
  targetType?: string;
  /** List of Azure permissions required for this target type. */
  requiredPermissions?: string[];
}

export function actionSupportedTargetTypeDeserializer(item: any): ActionSupportedTargetType {
  return {
    targetType: item["targetType"],
    requiredPermissions: !item["requiredPermissions"]
      ? item["requiredPermissions"]
      : item["requiredPermissions"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface _ActionPropertiesParametersSchema */
export interface _ActionPropertiesParametersSchema {}

export function _actionPropertiesParametersSchemaDeserializer(
  item: any,
): _ActionPropertiesParametersSchema {
  return item;
}

/** Model that represents a list of Action resources and a link for pagination. */
export interface _ActionListResult {
  /** The Action items on this page */
  value: Action[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _actionListResultDeserializer(item: any): _ActionListResult {
  return {
    value: actionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function actionArrayDeserializer(result: Array<Action>): any[] {
  return result.map((item) => {
    return actionDeserializer(item);
  });
}

/** Model that represents an Action Version resource. */
export interface ActionVersion extends ProxyResource {
  /** The properties of the action version resource. */
  properties: ActionProperties;
}

export function actionVersionDeserializer(item: any): ActionVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: actionPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents a list of Action Version resources and a link for pagination. */
export interface _ActionVersionListResult {
  /** The ActionVersion items on this page */
  value: ActionVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _actionVersionListResultDeserializer(item: any): _ActionVersionListResult {
  return {
    value: actionVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function actionVersionArrayDeserializer(result: Array<ActionVersion>): any[] {
  return result.map((item) => {
    return actionVersionDeserializer(item);
  });
}

/** Model that represents a Target Type resource. */
export interface TargetType extends ProxyResource {
  /** The properties of the target type resource. */
  properties: TargetTypeProperties;
}

export function targetTypeDeserializer(item: any): TargetType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: targetTypePropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the base Target Type properties model. */
export interface TargetTypeProperties {
  /** Localized string of the display name. */
  readonly displayName?: string;
  /** Localized string of the description. */
  readonly description?: string;
  /** URL to retrieve JSON schema of the Target Type properties. */
  readonly propertiesSchema?: string;
  /** List of resource types this Target Type can extend. */
  readonly resourceTypes?: string[];
}

export function targetTypePropertiesDeserializer(item: any): TargetTypeProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    propertiesSchema: item["propertiesSchema"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Model that represents a list of Target Type resources and a link for pagination. */
export interface _TargetTypeListResult {
  /** The TargetType items on this page */
  value: TargetType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _targetTypeListResultDeserializer(item: any): _TargetTypeListResult {
  return {
    value: targetTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetTypeArrayDeserializer(result: Array<TargetType>): any[] {
  return result.map((item) => {
    return targetTypeDeserializer(item);
  });
}

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

/** Model that represents a Workspace resource. */
export interface Workspace extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The properties of the Workspace resource. */
  properties: WorkspaceProperties;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: workspacePropertiesSerializer(item["properties"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
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
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    properties: workspacePropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the Workspace properties model. */
export interface WorkspaceProperties {
  /** Most recent provisioning state for the given Workspace resource. */
  readonly provisioningState?: ProvisioningState;
  /** The intended workspace-level resource scope to be used by child scenarios. */
  scopes: string[];
  /**
   * The requested customer key and service observations. Accepted creation fixes
   * whether customerManagedKeyEncryption is present. On PUT, omission of
   * encryption or its CMK object, or an empty encryption object, is valid for
   * Microsoft-managed Workspaces but rejected for CMK-created Workspaces.
   * Null is not a valid PUT value. A CMK-created Workspace can replace its key.
   */
  encryption?: WorkspaceEncryption;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspaceEncryptionSerializer(item["encryption"]),
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspaceEncryptionDeserializer(item["encryption"]),
  };
}

/** The validated requested key and vault reference, onboarding information, and service observations. */
export interface WorkspaceEncryption {
  /**
   * The requested customer-managed key. Its presence is fixed by accepted
   * Workspace creation: adding CMK to a Microsoft-managed Workspace or removing
   * CMK from a CMK-created Workspace is rejected with InvalidEncryptionConfiguration.
   * The key pair remains updateable on CMK-created Workspaces, including after
   * a failed creation. A present object requires a coherent keyEncryptionKeyUrl and
   * keyVaultResourceId pair. After synchronous caller and vault validation,
   * the accepted pair can be returned while configuration is Pending.
   * It does not prove that active data already uses the requested key.
   */
  customerManagedKeyEncryption?: WorkspaceCustomerManagedKeyEncryption;
  /** The service application to authorize before creating a new CMK Workspace; also returned for existing Workspaces. */
  readonly customerManagedKeyOnboarding?: WorkspaceCustomerManagedKeyOnboarding;
  /** The observed result, separate from the requested setting. */
  readonly status?: WorkspaceEncryptionStatus;
}

export function workspaceEncryptionSerializer(item: WorkspaceEncryption): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : workspaceCustomerManagedKeyEncryptionSerializer(item["customerManagedKeyEncryption"]),
  };
}

export function workspaceEncryptionDeserializer(item: any): WorkspaceEncryption {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : workspaceCustomerManagedKeyEncryptionDeserializer(item["customerManagedKeyEncryption"]),
    customerManagedKeyOnboarding: !item["customerManagedKeyOnboarding"]
      ? item["customerManagedKeyOnboarding"]
      : workspaceCustomerManagedKeyOnboardingDeserializer(item["customerManagedKeyOnboarding"]),
    status: !item["status"]
      ? item["status"]
      : workspaceEncryptionStatusDeserializer(item["status"]),
  };
}

/** A customer-managed key reference, not key material. */
export interface WorkspaceCustomerManagedKeyEncryption {
  /**
   * The versionless HTTPS Key Vault key URI in the supported cloud and Workspace
   * tenant. The key vault must belong to the same Microsoft Entra tenant as
   * the Workspace. Its HTTPS origin must match the vault referenced by
   * keyVaultResourceId. The service validates the effective pair and caller
   * vault-read permission synchronously through Azure Resource Manager before
   * creating public operation metadata, accepting the configuration operation,
   * persisting requested encryption, or changing Storage or customer data.
   * Supports RSA keys in Azure Key Vault and RSA-HSM keys in Premium Key Vault,
   * with key sizes of 2048, 3072, or 4096 bits. Premium RSA-HSM keys use the same
   * vault URL. The separate Azure Managed HSM service is not supported;
   * Managed HSM endpoints are rejected before operation acceptance.
   * A key version, query string, or fragment is not permitted.
   * Azure Storage follows key versions automatically. Keep the previous version
   * available for at least 24 hours after rotation.
   */
  keyEncryptionKeyUrl: string;
  /**
   * The fully qualified Azure resource ID of the key vault that contains the key.
   * Use /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName},
   * not a key child resource, Managed HSM, or URL. Full PUT with CMK and PATCH
   * that changes either CMK member require Microsoft.KeyVault/vaults/read on
   * the effective vault. The service compares its canonical ID, tenant, and
   * vault URI with the requested pair before accepting the operation.
   */
  keyVaultResourceId: string;
}

export function workspaceCustomerManagedKeyEncryptionSerializer(
  item: WorkspaceCustomerManagedKeyEncryption,
): any {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

export function workspaceCustomerManagedKeyEncryptionDeserializer(
  item: any,
): WorkspaceCustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

/** The service application that the customer authorizes to use the key. */
export interface WorkspaceCustomerManagedKeyOnboarding {
  /**
   * The Microsoft Entra application ID used for customer consent, returned for
   * existing Workspaces, including Microsoft-managed Workspaces. This does not
   * permit adding CMK to an existing Microsoft-managed Workspace. Before
   * creating a Workspace with a customer key, obtain the application name and
   * ID for the target cloud from the service onboarding documentation or Portal,
   * then consent and grant key access. The configuring caller separately needs
   * Microsoft.KeyVault/vaults/read on the referenced vault.
   * GET returns the same application ID.
   * This is not a service principal object ID or an identity selector.
   * The Workspace's top-level identity does not select this application.
   */
  readonly applicationId: string;
}

export function workspaceCustomerManagedKeyOnboardingDeserializer(
  item: any,
): WorkspaceCustomerManagedKeyOnboarding {
  return {
    applicationId: item["applicationId"],
  };
}

/** Service observations of protection and access for customer data under the Workspace encryption scope. */
export interface WorkspaceEncryptionStatus {
  /** The result of configuration or the most recent usable health observation. */
  readonly state: WorkspaceEncryptionState;
  /** The last directly observed active protection. Omitted when unknown. */
  readonly observedProtection?: WorkspaceEncryptionProtection;
  /**
   * The active key URI reported by Azure Storage, including its version when
   * available. Omitted when unknown or when protection is Microsoft-managed.
   * This value is not inferred from the requested key.
   */
  readonly observedKeyEncryptionKeyUrl?: string;
  /** The UTC time of the observation, including a failed check. */
  readonly lastCheckedAt?: Date;
  /**
   * The configuration or health error. Failed state includes a code and message.
   * CustomerKeyAccessFailed means Azure Storage cannot use the customer key.
   * EncryptionConfigurationFailed means a service-side configuration step failed.
   * A more specific cause is included only when the platform response identifies it.
   */
  readonly error?: ErrorDetail;
}

export function workspaceEncryptionStatusDeserializer(item: any): WorkspaceEncryptionStatus {
  return {
    state: item["state"],
    observedProtection: item["observedProtection"],
    observedKeyEncryptionKeyUrl: item["observedKeyEncryptionKeyUrl"],
    lastCheckedAt: !item["lastCheckedAt"] ? item["lastCheckedAt"] : new Date(item["lastCheckedAt"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The observed encryption state; this does not replace Workspace provisioningState. */
export enum KnownWorkspaceEncryptionState {
  /** No per-Workspace encryption configuration exists. Microsoft-managed protection applies. */
  NotConfigured = "NotConfigured",
  /** An encryption configuration operation is in progress. */
  Pending = "Pending",
  /** A fresh check confirms the requested customer key and scoped customer-data access. */
  Applied = "Applied",
  /** An encryption configuration step or health check failed. See the error for corrective action. */
  Failed = "Failed",
  /** No usable fresh observation is available. */
  Unknown = "Unknown",
}

/**
 * The observed encryption state; this does not replace Workspace provisioningState. \
 * {@link KnownWorkspaceEncryptionState} can be used interchangeably with WorkspaceEncryptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotConfigured**: No per-Workspace encryption configuration exists. Microsoft-managed protection applies. \
 * **Pending**: An encryption configuration operation is in progress. \
 * **Applied**: A fresh check confirms the requested customer key and scoped customer-data access. \
 * **Failed**: An encryption configuration step or health check failed. See the error for corrective action. \
 * **Unknown**: No usable fresh observation is available.
 */
export type WorkspaceEncryptionState = string;

/** The last directly observed protection of active Workspace customer data. */
export enum KnownWorkspaceEncryptionProtection {
  /** Active customer data uses customer-managed key protection. */
  CustomerManaged = "CustomerManaged",
  /** Active customer data uses Microsoft-managed key protection. */
  MicrosoftManaged = "MicrosoftManaged",
}

/**
 * The last directly observed protection of active Workspace customer data. \
 * {@link KnownWorkspaceEncryptionProtection} can be used interchangeably with WorkspaceEncryptionProtection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomerManaged**: Active customer data uses customer-managed key protection. \
 * **MicrosoftManaged**: Active customer data uses Microsoft-managed key protection.
 */
export type WorkspaceEncryptionProtection = string;

/** Describes a workspace update. */
export interface WorkspaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The resource-specific fields to update. Omitted fields are unchanged. */
  properties?: WorkspaceUpdateProperties;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspaceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The Workspace properties supported by partial updates. */
export interface WorkspaceUpdateProperties {
  /**
   * A JSON Merge Patch of the requested encryption setting. Omission leaves the
   * setting unchanged. Null deletion is rejected on a CMK-created Workspace
   * and is a no-op only when the setting is already absent on a Microsoft-managed
   * Workspace. The service validates the creation choice and merged pair first.
   */
  encryption?: WorkspaceEncryptionPatchMergePatchUpdateOrCreate;
}

export function workspaceUpdatePropertiesSerializer(item: WorkspaceUpdateProperties): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : workspaceEncryptionPatchMergePatchUpdateOrCreateSerializer(item["encryption"]),
  };
}

/**
 * A partial encryption setting. Omitted fields are unchanged and null deletes a
 * writable field. A remaining customerManagedKeyEncryption object must have a
 * coherent key URL and vault resource ID. Read-only onboarding and status
 * inputs are ignored. The accepted creation choice cannot change. Only a
 * CMK-created Workspace can update the pair. Changing either member requires synchronous caller and
 * vault validation of the merged pair, including any retained member.
 */
export interface WorkspaceEncryptionPatchMergePatchUpdateOrCreate {
  /**
   * The customer key configuration to merge on a CMK-created Workspace.
   * Null deletion is rejected on CMK and is a no-op only when already absent
   * on a Microsoft-managed Workspace. An empty object retains an existing
   * complete pair without a lookup when neither member changes, but is invalid
   * when the merged pair is incomplete. Unsupported mode changes are rejected
   * before vault lookup, operation creation, desired mutation, or Storage effects.
   */
  customerManagedKeyEncryption?: WorkspaceCustomerManagedKeyEncryptionPatchMergePatchUpdateOrCreate;
}

export function workspaceEncryptionPatchMergePatchUpdateOrCreateSerializer(
  item: WorkspaceEncryptionPatchMergePatchUpdateOrCreate,
): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : workspaceCustomerManagedKeyEncryptionPatchMergePatchUpdateOrCreateSerializer(
          item["customerManagedKeyEncryption"],
        ),
  };
}

/** A partial customer key reference, validated after merging with the stored setting. */
export interface WorkspaceCustomerManagedKeyEncryptionPatchMergePatchUpdateOrCreate {
  /**
   * The replacement versionless key URI. Omission retains the URI; null deletes
   * it. A same-vault replacement retains the stored vault ID. The effective
   * pair is authorized and validated before acceptance; an incomplete or
   * mismatched pair is rejected. Key path and name casing is preserved.
   */
  keyEncryptionKeyUrl?: string;
  /**
   * The vault resource ID to merge with the key URL. Omission retains the ID,
   * but does not bypass caller authorization when the URL changes. Null deletes
   * the ID; a remaining CMK object without both members is invalid. Changing
   * vault requires a coherent new URL and ID pair.
   */
  keyVaultResourceId?: string;
}

export function workspaceCustomerManagedKeyEncryptionPatchMergePatchUpdateOrCreateSerializer(
  item: WorkspaceCustomerManagedKeyEncryptionPatchMergePatchUpdateOrCreate,
): any {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

/** Model that represents a list of Workspace resources and a link for pagination. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  nextLink?: string;
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

/** A retained workspace discovery result and its accepted coverage facts. */
export interface WorkspaceDiscovery extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceDiscoveryProperties;
}

export function workspaceDiscoveryDeserializer(item: any): WorkspaceDiscovery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspaceDiscoveryPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the workspace discovery. */
export interface WorkspaceDiscoveryProperties {
  /** The discovery status. */
  readonly status: WorkspaceDiscoveryStatus;
  /** The discovery UTC start time. */
  readonly startTime?: Date;
  /** The discovery UTC end time. */
  readonly endTime?: Date;
  /** System or infrastructure errors encountered during discovery. */
  readonly errors?: OperationError[];
  /** The workspace ID this discovery belongs to. */
  readonly workspaceId: string;
  /** The resource snapshot ID produced by this discovery. */
  readonly resourceSnapshotId?: string;
  /** The coverage established by the accepted discovery result for Azure Resource Manager scopes. Present with coverageSummary on newly produced snapshot results; absence is not Established or a known zero. */
  readonly completeness?: WorkspaceDiscoveryCompleteness;
  /** Coverage facts for the accepted result. Scope counts, resource-occurrence counts, warning counts, and returned inventory-row counts are different units and must not be combined. */
  readonly coverageSummary?: WorkspaceDiscoveryCoverageSummary;
  /** Confirmed access, missing-resource, or access-indeterminate guidance. System verification failures are reported in errors, not as permission warnings. The returned array may be a subset; use warningsTotalCount and warningsTruncated. */
  readonly warnings?: WorkspaceDiscoveryWarningUnion[];
  /** The deduplicated number of warning identities before sampling. Identity consists of the expanded scope, affected resource, and reason. Absent means no accepted warning population was recorded, not zero warnings. */
  readonly warningsTotalCount?: number;
  /** Whether warnings contains fewer entries than warningsTotalCount. False requires equality; true requires a smaller returned array. An accepted empty warning population is an empty array, zero total, and false. */
  readonly warningsTruncated?: boolean;
}

export function workspaceDiscoveryPropertiesDeserializer(item: any): WorkspaceDiscoveryProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"] ? item["errors"] : operationErrorArrayDeserializer(item["errors"]),
    workspaceId: item["workspaceId"],
    resourceSnapshotId: item["resourceSnapshotId"],
    completeness: item["completeness"],
    coverageSummary: !item["coverageSummary"]
      ? item["coverageSummary"]
      : workspaceDiscoveryCoverageSummaryDeserializer(item["coverageSummary"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : workspaceDiscoveryWarningUnionArrayDeserializer(item["warnings"]),
    warningsTotalCount: item["warningsTotalCount"],
    warningsTruncated: item["warningsTruncated"],
  };
}

/** Enum of the workspace discovery status. */
export enum KnownWorkspaceDiscoveryStatus {
  /** The discovery is pending and has not started. */
  Pending = "Pending",
  /** The discovery has been accepted and is queued for execution. */
  Queued = "Queued",
  /** The discovery is in progress. */
  InProgress = "InProgress",
  /** The discovery completed successfully. */
  Succeeded = "Succeeded",
  /** Discovery produced an admissible result with an observed coverage shortfall. This status does not itself block scenario runs or evaluations; consumers requiring established coverage must also check completeness. */
  PartiallySucceeded = "PartiallySucceeded",
  /** The discovery failed. */
  Failed = "Failed",
  /** The discovery was canceled. */
  Canceled = "Canceled",
}

/**
 * Enum of the workspace discovery status. \
 * {@link KnownWorkspaceDiscoveryStatus} can be used interchangeably with WorkspaceDiscoveryStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The discovery is pending and has not started. \
 * **Queued**: The discovery has been accepted and is queued for execution. \
 * **InProgress**: The discovery is in progress. \
 * **Succeeded**: The discovery completed successfully. \
 * **PartiallySucceeded**: Discovery produced an admissible result with an observed coverage shortfall. This status does not itself block scenario runs or evaluations; consumers requiring established coverage must also check completeness. \
 * **Failed**: The discovery failed. \
 * **Canceled**: The discovery was canceled.
 */
export type WorkspaceDiscoveryStatus = string;

export function operationErrorArrayDeserializer(result: Array<OperationError>): any[] {
  return result.map((item) => {
    return operationErrorDeserializer(item);
  });
}

/** Represents a system or infrastructure error encountered during an async operation. */
export interface OperationError {
  /** The error code identifying the type of system error. */
  errorCode: string;
  /** A human-readable description of the system error. */
  errorMessage: string;
}

export function operationErrorDeserializer(item: any): OperationError {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** The coverage classification of the accepted Azure Resource Manager discovery result, independent of operation status and cause. */
export enum KnownWorkspaceDiscoveryCompleteness {
  /** All attainable expected resource occurrences were classified and represented, with no observed shortfall. */
  Established = "Established",
  /** Required work completed without an observed gap, but a complete inventory denominator is structurally unavailable. */
  BaselineUnknown = "BaselineUnknown",
  /** Required system verification did not complete or a proven accessible required resource was not represented. */
  VerificationIncomplete = "VerificationIncomplete",
  /** Confirmed undelivered obligations remain and no required system-verification gap remains. */
  KnownPartial = "KnownPartial",
}

/**
 * The coverage classification of the accepted Azure Resource Manager discovery result, independent of operation status and cause. \
 * {@link KnownWorkspaceDiscoveryCompleteness} can be used interchangeably with WorkspaceDiscoveryCompleteness,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Established**: All attainable expected resource occurrences were classified and represented, with no observed shortfall. \
 * **BaselineUnknown**: Required work completed without an observed gap, but a complete inventory denominator is structurally unavailable. \
 * **VerificationIncomplete**: Required system verification did not complete or a proven accessible required resource was not represented. \
 * **KnownPartial**: Confirmed undelivered obligations remain and no required system-verification gap remains.
 */
export type WorkspaceDiscoveryCompleteness = string;

/** Aggregate coverage of expanded Azure Resource Manager scope occurrences. Non-Azure Resource Manager discovery ingress is outside this population. VerificationIncomplete dominates KnownPartial, then BaselineUnknown, then Established. */
export interface WorkspaceDiscoveryCoverageSummary {
  /** The scope-occurrence coverage partitions for this discovery result. */
  readonly scopes: WorkspaceDiscoveryScopeCoverageSummary;
  /** Required resource occurrences only from scopes with a known complete expected inventory set. Absent exactly when knownExpectedSetCount is zero. Unknown is not a known empty set. */
  readonly resources?: WorkspaceDiscoveryResourceCoverageSummary;
}

export function workspaceDiscoveryCoverageSummaryDeserializer(
  item: any,
): WorkspaceDiscoveryCoverageSummary {
  return {
    scopes: workspaceDiscoveryScopeCoverageSummaryDeserializer(item["scopes"]),
    resources: !item["resources"]
      ? item["resources"]
      : workspaceDiscoveryResourceCoverageSummaryDeserializer(item["resources"]),
  };
}

/** Two independent partitions of expanded scope occurrences after normalized-scope deduplication. Distinct service groups remain distinct even if their members coincide. The known/unknown counts and the four completeness counts each sum to totalCount. */
export interface WorkspaceDiscoveryScopeCoverageSummary {
  /** The number of expanded Azure Resource Manager scope occurrences represented by the result. */
  readonly totalCount: number;
  /** The number of scopes with an authoritative complete expected resource-occurrence set, including authoritatively empty sets. */
  readonly knownExpectedSetCount: number;
  /** The number of scopes whose complete expected inventory set is unavailable. A service group's known subscription or resource-group membership does not establish its descendant-resource denominator. */
  readonly unknownExpectedSetCount: number;
  /** The number of scopes with Established coverage. */
  readonly establishedCount: number;
  /** The number of scopes with a structurally unavailable denominator and no observed shortfall, including successful observed-empty container scans. */
  readonly baselineUnknownCount: number;
  /** The number of scopes with required verification failure, unavailable required child enumeration, or a proven accessible required resource absent from the snapshot. */
  readonly verificationIncompleteCount: number;
  /** The number of scopes with confirmed undelivered obligations and no remaining system-verification gap. */
  readonly knownPartialCount: number;
}

export function workspaceDiscoveryScopeCoverageSummaryDeserializer(
  item: any,
): WorkspaceDiscoveryScopeCoverageSummary {
  return {
    totalCount: item["totalCount"],
    knownExpectedSetCount: item["knownExpectedSetCount"],
    unknownExpectedSetCount: item["unknownExpectedSetCount"],
    establishedCount: item["establishedCount"],
    baselineUnknownCount: item["baselineUnknownCount"],
    verificationIncompleteCount: item["verificationIncompleteCount"],
    knownPartialCount: item["knownPartialCount"],
  };
}

/** Required resource occurrences from known-set scopes, keyed by normalized scope and resource before global inventory-row deduplication. classifiedCount plus unclassifiedCount equals expectedCount, and coveredCount does not exceed classifiedCount. */
export interface WorkspaceDiscoveryResourceCoverageSummary {
  /** The number of unique required resource occurrences across known-set scopes, not the number of service-group container members or listed inventory rows. */
  readonly expectedCount: number;
  /** The number of expected occurrences with a terminal access or presence classification. */
  readonly classifiedCount: number;
  /** The number of expected occurrences that required system verification could not classify. */
  readonly unclassifiedCount: number;
  /** The number of classified expected occurrences actually represented in the produced snapshot. Access to a container or its descendants does not invent a resource occurrence. */
  readonly coveredCount: number;
}

export function workspaceDiscoveryResourceCoverageSummaryDeserializer(
  item: any,
): WorkspaceDiscoveryResourceCoverageSummary {
  return {
    expectedCount: item["expectedCount"],
    classifiedCount: item["classifiedCount"],
    unclassifiedCount: item["unclassifiedCount"],
    coveredCount: item["coveredCount"],
  };
}

export function workspaceDiscoveryWarningUnionArrayDeserializer(
  result: Array<WorkspaceDiscoveryWarningUnion>,
): any[] {
  return result.map((item) => {
    return workspaceDiscoveryWarningUnionDeserializer(item);
  });
}

/** The common fields of a discovery guidance warning, discriminated by reason. Known reasons use their corresponding subtype; unknown future reasons retain these base fields. */
export interface WorkspaceDiscoveryWarning {
  /** The normalized expanded source scope where the affected obligation was encountered. */
  readonly scopeId: string;
  /** The source scope kind, such as Subscription, ResourceGroup, ServiceGroup, or Resource. */
  readonly scopeKind: string;
  /** The confirmed guidance reason, not a system-verification failure. */
  /** The discriminator possible values: RbacValidationFailed, TargetNotFound, AccessIndeterminate */
  readonly reason: WorkspaceDiscoveryWarningReason;
  /** Human-readable guidance with attribution appropriate to the reason. */
  readonly message: string;
}

export function workspaceDiscoveryWarningDeserializer(item: any): WorkspaceDiscoveryWarning {
  return {
    scopeId: item["scopeId"],
    scopeKind: item["scopeKind"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Alias for WorkspaceDiscoveryWarningUnion */
export type WorkspaceDiscoveryWarningUnion =
  | WorkspaceDiscoveryPermissionWarning
  | WorkspaceDiscoveryResourceWarning
  | WorkspaceDiscoveryAccessWarning
  | WorkspaceDiscoveryWarning;

export function workspaceDiscoveryWarningUnionDeserializer(
  item: any,
): WorkspaceDiscoveryWarningUnion {
  switch (item["reason"]) {
    case "RbacValidationFailed":
      return workspaceDiscoveryPermissionWarningDeserializer(
        item as WorkspaceDiscoveryPermissionWarning,
      );

    case "TargetNotFound":
      return workspaceDiscoveryResourceWarningDeserializer(
        item as WorkspaceDiscoveryResourceWarning,
      );

    case "AccessIndeterminate":
      return workspaceDiscoveryAccessWarningDeserializer(item as WorkspaceDiscoveryAccessWarning);

    default:
      return workspaceDiscoveryWarningDeserializer(item);
  }
}

/** The confirmed guidance reason. Unknown future reasons preserve the common warning fields and must not be interpreted as a permission denial. */
export enum KnownWorkspaceDiscoveryWarningReason {
  /** The affected resource could not be read because of a confirmed authorization denial. */
  RbacValidationFailed = "RbacValidationFailed",
  /** The affected resource or configured membership was confirmed missing. */
  TargetNotFound = "TargetNotFound",
  /** Access versus absence could not be determined; guidance must state both possibilities. */
  AccessIndeterminate = "AccessIndeterminate",
}

/**
 * The confirmed guidance reason. Unknown future reasons preserve the common warning fields and must not be interpreted as a permission denial. \
 * {@link KnownWorkspaceDiscoveryWarningReason} can be used interchangeably with WorkspaceDiscoveryWarningReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RbacValidationFailed**: The affected resource could not be read because of a confirmed authorization denial. \
 * **TargetNotFound**: The affected resource or configured membership was confirmed missing. \
 * **AccessIndeterminate**: Access versus absence could not be determined; guidance must state both possibilities.
 */
export type WorkspaceDiscoveryWarningReason = string;

/** Confirmed read-authorization guidance. Permission details are required composition, not an optional shell reused for other causes. */
export interface WorkspaceDiscoveryPermissionWarning extends WorkspaceDiscoveryWarning {
  /** Identifies confirmed read-authorization guidance. */
  readonly reason: "RbacValidationFailed";
  /** The affected resource, required permissions, recommended roles, and optional identity details. */
  readonly permission: PermissionError;
}

export function workspaceDiscoveryPermissionWarningDeserializer(
  item: any,
): WorkspaceDiscoveryPermissionWarning {
  return {
    scopeId: item["scopeId"],
    scopeKind: item["scopeKind"],
    reason: item["reason"],
    message: item["message"],
    permission: permissionErrorDeserializer(item["permission"]),
  };
}

/** Model that represents the permission error. */
export interface PermissionError {
  /** The resource id for the affected resource. */
  readonly resourceId: string;
  /** The missing permissions. */
  readonly missingPermissions: string[];
  /** The required permissions. */
  readonly requiredPermissions: string[];
  /** The recommended roles. */
  readonly recommendedRoles: string[];
  /** The identity. */
  readonly identity?: EntraIdentity;
  /**
   * The error message describing the permission validation failure, when the
   * failure carries a distinct message (for example, when the target could not
   * be read to evaluate access).
   */
  readonly errorMessage?: string;
}

export function permissionErrorDeserializer(item: any): PermissionError {
  return {
    resourceId: item["resourceId"],
    missingPermissions: item["missingPermissions"].map((p: any) => {
      return p;
    }),
    requiredPermissions: item["requiredPermissions"].map((p: any) => {
      return p;
    }),
    recommendedRoles: item["recommendedRoles"].map((p: any) => {
      return p;
    }),
    identity: !item["identity"] ? item["identity"] : entraIdentityDeserializer(item["identity"]),
    errorMessage: item["errorMessage"],
  };
}

/** Model that represents the Azure Entra identity. */
export interface EntraIdentity {
  /** The identity object id. */
  readonly objectId: string;
  /** The identity tenant id. */
  readonly tenantId: string;
}

export function entraIdentityDeserializer(item: any): EntraIdentity {
  return {
    objectId: item["objectId"],
    tenantId: item["tenantId"],
  };
}

/** Guidance for a resource or membership confirmed missing. */
export interface WorkspaceDiscoveryResourceWarning extends WorkspaceDiscoveryWarning {
  /** Identifies confirmed missing-resource guidance. */
  readonly reason: "TargetNotFound";
  /** The affected resource or member identity. */
  readonly resourceId: string;
}

export function workspaceDiscoveryResourceWarningDeserializer(
  item: any,
): WorkspaceDiscoveryResourceWarning {
  return {
    scopeId: item["scopeId"],
    scopeKind: item["scopeKind"],
    reason: item["reason"],
    message: item["message"],
    resourceId: item["resourceId"],
  };
}

/** Neutral guidance when access versus absence could not be established. */
export interface WorkspaceDiscoveryAccessWarning extends WorkspaceDiscoveryWarning {
  /** Identifies neutral access-versus-absence guidance. */
  readonly reason: "AccessIndeterminate";
  /** The affected resource or member identity. */
  readonly resourceId: string;
}

export function workspaceDiscoveryAccessWarningDeserializer(
  item: any,
): WorkspaceDiscoveryAccessWarning {
  return {
    scopeId: item["scopeId"],
    scopeKind: item["scopeKind"],
    reason: item["reason"],
    message: item["message"],
    resourceId: item["resourceId"],
  };
}

/** A retained workspace evaluation of published scenario-template versions. */
export interface WorkspaceEvaluation extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceEvaluationProperties;
}

export function workspaceEvaluationDeserializer(item: any): WorkspaceEvaluation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspaceEvaluationPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the workspace evaluation. */
export interface WorkspaceEvaluationProperties {
  /** The evaluation status. */
  readonly status: WorkspaceEvaluationStatus;
  /** The evaluation UTC start time. */
  readonly startTime?: Date;
  /** The evaluation UTC end time. */
  readonly endTime?: Date;
  /** System or infrastructure errors encountered during evaluation. */
  readonly errors?: OperationError[];
  /** The workspace ID this evaluation belongs to. */
  readonly workspaceId: string;
  /** The resource snapshot ID used for this evaluation. */
  readonly resourceSnapshotId: string;
  /** The canonical Azure resource ID of the retained discovery result that supplied resourceSnapshotId. This reference does not change when the latest discovery changes and never identifies the latest alias or a protected LRO polling handle. */
  readonly discoveryResultId: string;
  /** The number of templates to evaluate. */
  readonly numTemplatesToEvaluate: number;
  /** The number of templates that evaluated successfully. */
  readonly numTemplatesEvaluatedSucceeded: number;
  /** The number of templates that failed evaluation. */
  readonly numTemplatesEvaluatedFailed: number;
  /** The number of templates that were cancelled during evaluation. */
  readonly numTemplatesEvaluatedCancelled: number;
  /** Per-template evaluation results. */
  readonly results?: TemplateEvaluationResultItem[];
}

export function workspaceEvaluationPropertiesDeserializer(
  item: any,
): WorkspaceEvaluationProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: !item["errors"] ? item["errors"] : operationErrorArrayDeserializer(item["errors"]),
    workspaceId: item["workspaceId"],
    resourceSnapshotId: item["resourceSnapshotId"],
    discoveryResultId: item["discoveryResultId"],
    numTemplatesToEvaluate: item["numTemplatesToEvaluate"],
    numTemplatesEvaluatedSucceeded: item["numTemplatesEvaluatedSucceeded"],
    numTemplatesEvaluatedFailed: item["numTemplatesEvaluatedFailed"],
    numTemplatesEvaluatedCancelled: item["numTemplatesEvaluatedCancelled"],
    results: !item["results"]
      ? item["results"]
      : templateEvaluationResultItemArrayDeserializer(item["results"]),
  };
}

/** Enum of the workspace evaluation status. */
export enum KnownWorkspaceEvaluationStatus {
  /** The evaluation is pending and has not started. */
  Pending = "Pending",
  /** The evaluation has been accepted and is queued for execution. */
  Queued = "Queued",
  /** The evaluation is in progress. */
  InProgress = "InProgress",
  /** The evaluation completed successfully. */
  Succeeded = "Succeeded",
  /** Unless cancellation won terminal settlement, at least one template applicability test completed and at least one failed or was canceled. Discovery completeness does not determine this processing status. The first terminal settlement is authoritative; a later cancellation does not replace it. */
  PartiallySucceeded = "PartiallySucceeded",
  /** No template applicability test completed and at least one failed, unless cancellation won terminal settlement. The accepted resource snapshot and discovery result reference remain present; an admission failure creates no evaluation result. */
  Failed = "Failed",
  /** Cancellation won terminal settlement, or all admitted template tests were canceled. Previously recorded outcomes may remain. A later callback cannot replace this terminal result, and cancellation cannot replace an already settled result. */
  Canceled = "Canceled",
}

/**
 * Enum of the workspace evaluation status. \
 * {@link KnownWorkspaceEvaluationStatus} can be used interchangeably with WorkspaceEvaluationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The evaluation is pending and has not started. \
 * **Queued**: The evaluation has been accepted and is queued for execution. \
 * **InProgress**: The evaluation is in progress. \
 * **Succeeded**: The evaluation completed successfully. \
 * **PartiallySucceeded**: Unless cancellation won terminal settlement, at least one template applicability test completed and at least one failed or was canceled. Discovery completeness does not determine this processing status. The first terminal settlement is authoritative; a later cancellation does not replace it. \
 * **Failed**: No template applicability test completed and at least one failed, unless cancellation won terminal settlement. The accepted resource snapshot and discovery result reference remain present; an admission failure creates no evaluation result. \
 * **Canceled**: Cancellation won terminal settlement, or all admitted template tests were canceled. Previously recorded outcomes may remain. A later callback cannot replace this terminal result, and cancellation cannot replace an already settled result.
 */
export type WorkspaceEvaluationStatus = string;

export function templateEvaluationResultItemArrayDeserializer(
  result: Array<TemplateEvaluationResultItem>,
): any[] {
  return result.map((item) => {
    return templateEvaluationResultItemDeserializer(item);
  });
}

/** Model that represents a single template evaluation result. */
export interface TemplateEvaluationResultItem {
  /** The canonical ARM ID of the evaluated scenario-template version. Scenario IDs and versionless template aliases are not valid substitutes. */
  readonly templateId: string;
  /** The stable catalog name of the evaluated scenario template, not a localized display name. */
  readonly templateName: string;
  /** The evaluation result for this template. */
  evaluationResult: RecommendationStatus;
}

export function templateEvaluationResultItemDeserializer(item: any): TemplateEvaluationResultItem {
  return {
    templateId: item["templateId"],
    templateName: item["templateName"],
    evaluationResult: item["evaluationResult"],
  };
}

/** Enum of the scenario validation state. */
export enum KnownRecommendationStatus {
  /** The scenario recommendation status has not been evaluated. */
  NotEvaluated = "NotEvaluated",
  /** The scenario recommendation status is recommended. */
  Recommended = "Recommended",
  /** The scenario recommendation status is not applicable. */
  NotApplicable = "NotApplicable",
  /** The scenario recommendation status is currently being evaluated. */
  Evaluating = "Evaluating",
  /** The scenario recommendation evaluation has failed. */
  EvaluationFailed = "EvaluationFailed",
  /** The scenario recommendation evaluation was cancelled. */
  EvaluationCancelled = "EvaluationCancelled",
}

/**
 * Enum of the scenario validation state. \
 * {@link KnownRecommendationStatus} can be used interchangeably with RecommendationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotEvaluated**: The scenario recommendation status has not been evaluated. \
 * **Recommended**: The scenario recommendation status is recommended. \
 * **NotApplicable**: The scenario recommendation status is not applicable. \
 * **Evaluating**: The scenario recommendation status is currently being evaluated. \
 * **EvaluationFailed**: The scenario recommendation evaluation has failed. \
 * **EvaluationCancelled**: The scenario recommendation evaluation was cancelled.
 */
export type RecommendationStatus = string;

/** The response of a WorkspaceDiscovery list operation. */
export interface _WorkspaceDiscoveryListResult {
  /** The WorkspaceDiscovery items on this page */
  value: WorkspaceDiscovery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceDiscoveryListResultDeserializer(
  item: any,
): _WorkspaceDiscoveryListResult {
  return {
    value: workspaceDiscoveryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceDiscoveryArrayDeserializer(result: Array<WorkspaceDiscovery>): any[] {
  return result.map((item) => {
    return workspaceDiscoveryDeserializer(item);
  });
}

/** The response of a WorkspaceEvaluation list operation. */
export interface _WorkspaceEvaluationListResult {
  /** The WorkspaceEvaluation items on this page */
  value: WorkspaceEvaluation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceEvaluationListResultDeserializer(
  item: any,
): _WorkspaceEvaluationListResult {
  return {
    value: workspaceEvaluationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceEvaluationArrayDeserializer(result: Array<WorkspaceEvaluation>): any[] {
  return result.map((item) => {
    return workspaceEvaluationDeserializer(item);
  });
}

/** Model that represents a discovered resource. */
export interface DiscoveredResource extends ProxyResource {
  /** The properties of the discovered resource. */
  properties?: DiscoveredResourceProperties;
}

export function discoveredResourceDeserializer(item: any): DiscoveredResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : discoveredResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of a discovered resource. */
export interface DiscoveredResourceProperties {
  /** The namespace of the discovered resource. */
  readonly resourceNamespace: string;
  /** The name of the discovered resource. */
  readonly resourceName: string;
  /** The resource type of the discovered resource. */
  readonly resourceType: string;
  /** The fully qualified identifier of the discovered resource. */
  readonly fullyQualifiedIdentifier: string;
  /** The date and time when the resource was discovered. */
  readonly discoveredAt: Date;
  /** The scope of the discovered resource. */
  readonly scope: string;
  /** The Azure region the discovered resource is deployed to, in lowercase with no spaces. Absent when no single deployment region was captured, including global and multi-region resources. */
  readonly location?: string;
  /** The availability zones the discovered resource occupies. Values are logical zone identifiers, such as `["1", "2"]` for a zone-pinned resource, or the single value `zone-redundant` when redundancy is expressed as a flag or SKU rather than a zone list. Absent, and never empty, when no zone information was captured; a non-zone-aware resource and a zone-aware resource without an assigned zone are not distinguished. */
  readonly zones?: string[];
}

export function discoveredResourcePropertiesDeserializer(item: any): DiscoveredResourceProperties {
  return {
    resourceNamespace: item["namespace"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    fullyQualifiedIdentifier: item["fullyQualifiedIdentifier"],
    discoveredAt: new Date(item["discoveredAt"]),
    scope: item["scope"],
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Model that represents a list of discovered resources and a link for pagination. */
export interface _DiscoveredResourceListResult {
  /** The DiscoveredResource items on this page */
  value: DiscoveredResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoveredResourceListResultDeserializer(
  item: any,
): _DiscoveredResourceListResult {
  return {
    value: discoveredResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoveredResourceArrayDeserializer(result: Array<DiscoveredResource>): any[] {
  return result.map((item) => {
    return discoveredResourceDeserializer(item);
  });
}

/** Model that represents the scenario. */
export interface Scenario extends ProxyResource {
  /** The properties of scenario. */
  properties?: ScenarioProperties;
}

export function scenarioSerializer(item: Scenario): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scenarioPropertiesSerializer(item["properties"]),
  };
}

export function scenarioDeserializer(item: any): Scenario {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scenarioPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the scenario. */
export interface ScenarioProperties {
  /** Most recent provisioning state for the given scenario resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Resource ID of the template version this scenario was created from (optional).
   * The ID has the form
   * `/providers/Microsoft.Chaos/scenarioTemplates/{scenarioTemplateName}/versions/{version}`.
   * This property retains its existing string representation for compatibility
   * with earlier API versions and SDKs.
   *
   * A scenario's structure comes from exactly one of two mutually exclusive sources.
   * When `createdFrom` is supplied on create, the referenced template version is the
   * authoritative source for the scenario's structure; inline `parameters` and
   * `actions` are not used. When `createdFrom` is absent, the structure comes from
   * the inline `parameters` and `actions` supplied in the request.
   * Supplying neither source is rejected by request validation.
   */
  createdFrom?: string;
  /**
   * Version of the scenario, supplied by the author. Defaults to `1.0` when not
   * supplied on create. This is the scenario's own version and is independent of
   * the version of any template it was created from.
   */
  version?: string;
  /** Description of what this scenario does (optional). */
  description?: string;
  /** Parameter definitions for the scenario. */
  parameters?: ScenarioParameter[];
  /** Array of actions that define the scenario's orchestration. */
  actions?: ScenarioAction[];
  /**
   * Scenario-wide default for how a scenario run reacts when one of its actions fails.
   * An action that does not supply its own `failureBehavior` inherits this value; when
   * neither is supplied the effective behavior is `Stop`.
   *
   * Not used when `createdFrom` is supplied, for the same reason as `parameters` and
   * `actions`: the referenced template version is then the authoritative source for the
   * scenario's structure, and it supplies this policy too. A value sent in the request is
   * ignored in that case — on create the referenced template's policy is used, and on update
   * the policy of the already persisted template is preserved.
   */
  failureBehavior?: FailureBehavior;
  /** The recommendation information for this scenario. */
  readonly recommendation?: Recommendation;
}

export function scenarioPropertiesSerializer(item: ScenarioProperties): any {
  return {
    createdFrom: item["createdFrom"],
    version: item["version"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scenarioParameterArraySerializer(item["parameters"]),
    actions: !item["actions"] ? item["actions"] : scenarioActionArraySerializer(item["actions"]),
    failureBehavior: item["failureBehavior"],
  };
}

export function scenarioPropertiesDeserializer(item: any): ScenarioProperties {
  return {
    provisioningState: item["provisioningState"],
    createdFrom: item["createdFrom"],
    version: item["version"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scenarioParameterArrayDeserializer(item["parameters"]),
    actions: !item["actions"] ? item["actions"] : scenarioActionArrayDeserializer(item["actions"]),
    failureBehavior: item["failureBehavior"],
    recommendation: !item["recommendation"]
      ? item["recommendation"]
      : recommendationDeserializer(item["recommendation"]),
  };
}

export function scenarioParameterArraySerializer(result: Array<ScenarioParameter>): any[] {
  return result.map((item) => {
    return scenarioParameterSerializer(item);
  });
}

export function scenarioParameterArrayDeserializer(result: Array<ScenarioParameter>): any[] {
  return result.map((item) => {
    return scenarioParameterDeserializer(item);
  });
}

/** Model that represents a single scenario parameter definition. */
export interface ScenarioParameter {
  /** The name of the parameter. */
  name: string;
  /** Parameter data type. */
  type: ParameterType;
  /** Default value for the parameter. */
  default?: string;
  /** Whether this parameter is required. */
  required?: boolean;
  /** Description of the parameter. */
  description?: string;
  /** Format validation applied to the parameter's value, and examples of values that satisfy it. */
  format?: ScenarioParameterFormat;
}

export function scenarioParameterSerializer(item: ScenarioParameter): any {
  return {
    name: item["name"],
    type: item["type"],
    default: item["default"],
    required: item["required"],
    description: item["description"],
    format: !item["format"] ? item["format"] : scenarioParameterFormatSerializer(item["format"]),
  };
}

export function scenarioParameterDeserializer(item: any): ScenarioParameter {
  return {
    name: item["name"],
    type: item["type"],
    default: item["default"],
    required: item["required"],
    description: item["description"],
    format: !item["format"] ? item["format"] : scenarioParameterFormatDeserializer(item["format"]),
  };
}

/** Enum for parameter types. */
export enum KnownParameterType {
  /** String parameter type. */
  String = "string",
  /** Number parameter type. */
  Number = "number",
  /** Boolean parameter type. */
  Boolean = "boolean",
  /** Object parameter type. */
  Object = "object",
  /** Array parameter type. */
  Array = "array",
}

/**
 * Enum for parameter types. \
 * {@link KnownParameterType} can be used interchangeably with ParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: String parameter type. \
 * **number**: Number parameter type. \
 * **boolean**: Boolean parameter type. \
 * **object**: Object parameter type. \
 * **array**: Array parameter type.
 */
export type ParameterType = string;

/** Model that represents the format validation applied to a scenario parameter's value. */
export interface ScenarioParameterFormat {
  /** The built-in format the value is validated against. */
  formatType?: ParameterFormatType;
  /** Human-readable examples of values that satisfy the format. */
  examples?: string[];
}

export function scenarioParameterFormatSerializer(item: ScenarioParameterFormat): any {
  return {
    formatType: item["formatType"],
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

export function scenarioParameterFormatDeserializer(item: any): ScenarioParameterFormat {
  return {
    formatType: item["formatType"],
    examples: !item["examples"]
      ? item["examples"]
      : item["examples"].map((p: any) => {
          return p;
        }),
  };
}

/** Enum of the built-in formats a scenario parameter's value can be validated against. */
export enum KnownParameterFormatType {
  /** The value must be an Azure resource ID. */
  AzureResourceId = "AzureResourceId",
  /** The value must be an Azure region name. */
  AzureRegion = "AzureRegion",
  /** The value must be an Azure availability zone. */
  AzureZone = "AzureZone",
  /** The value must be an ISO 8601 duration. */
  Duration = "Duration",
  /** The value must be well-formed JSON. */
  Json = "Json",
}

/**
 * Enum of the built-in formats a scenario parameter's value can be validated against. \
 * {@link KnownParameterFormatType} can be used interchangeably with ParameterFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureResourceId**: The value must be an Azure resource ID. \
 * **AzureRegion**: The value must be an Azure region name. \
 * **AzureZone**: The value must be an Azure availability zone. \
 * **Duration**: The value must be an ISO 8601 duration. \
 * **Json**: The value must be well-formed JSON.
 */
export type ParameterFormatType = string;

export function scenarioActionArraySerializer(result: Array<ScenarioAction>): any[] {
  return result.map((item) => {
    return scenarioActionSerializer(item);
  });
}

export function scenarioActionArrayDeserializer(result: Array<ScenarioAction>): any[] {
  return result.map((item) => {
    return scenarioActionDeserializer(item);
  });
}

/** Model that represents a scenario action. */
export interface ScenarioAction {
  /** Unique name for the action. */
  name: string;
  /** Identifier of the action and version (e.g., "microsoft-compute-shutdown/1.0"). */
  actionId: string;
  /** Human-readable description of what this action does. */
  description?: string;
  /** ISO 8601 duration for how long the action runs (e.g., PT30M for 30 minutes). Supports template macro syntax (%%\{parameters.\<name\>\}%%). */
  duration: string;
  /** Action-specific parameter values. */
  parameters?: KeyValuePair[];
  /**
   * Action-specific target selectors evaluated during execution. When provided,
   * the collection must contain either `logicalZone` and `location`, or `physicalZone`.
   * Selector names must be unique, the two modes cannot be combined, and the service
   * enforces the cross-item combination at runtime.
   */
  selectors?: ScenarioActionSelector[];
  /** Action dependencies that control when this action starts. */
  runAfter?: RunAfter;
  /** ISO 8601 duration to wait before action starts (e.g., PT30S for 30 seconds). Supports template macro syntax. */
  waitBefore?: string;
  /** ISO 8601 duration for maximum action execution time. Supports template macro syntax. */
  timeout?: string;
  /** External resource reference for the action. */
  externalResource?: ExternalResource;
  /**
   * Per-action override for how the scenario run reacts when this action fails. When omitted,
   * the action inherits the scenario-level `failureBehavior`; when neither is supplied the
   * effective behavior is `Stop`.
   */
  failureBehavior?: FailureBehavior;
}

export function scenarioActionSerializer(item: ScenarioAction): any {
  return {
    name: item["name"],
    actionId: item["actionId"],
    description: item["description"],
    duration: item["duration"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : keyValuePairArraySerializer(item["parameters"]),
    selectors: !item["selectors"]
      ? item["selectors"]
      : scenarioActionSelectorArraySerializer(item["selectors"]),
    runAfter: !item["runAfter"] ? item["runAfter"] : runAfterSerializer(item["runAfter"]),
    waitBefore: item["waitBefore"],
    timeout: item["timeout"],
    externalResource: !item["externalResource"]
      ? item["externalResource"]
      : externalResourceSerializer(item["externalResource"]),
    failureBehavior: item["failureBehavior"],
  };
}

export function scenarioActionDeserializer(item: any): ScenarioAction {
  return {
    name: item["name"],
    actionId: item["actionId"],
    description: item["description"],
    duration: item["duration"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : keyValuePairArrayDeserializer(item["parameters"]),
    selectors: !item["selectors"]
      ? item["selectors"]
      : scenarioActionSelectorArrayDeserializer(item["selectors"]),
    runAfter: !item["runAfter"] ? item["runAfter"] : runAfterDeserializer(item["runAfter"]),
    waitBefore: item["waitBefore"],
    timeout: item["timeout"],
    externalResource: !item["externalResource"]
      ? item["externalResource"]
      : externalResourceDeserializer(item["externalResource"]),
    failureBehavior: item["failureBehavior"],
  };
}

export function scenarioActionSelectorArraySerializer(
  result: Array<ScenarioActionSelector>,
): any[] {
  return result.map((item) => {
    return scenarioActionSelectorSerializer(item);
  });
}

export function scenarioActionSelectorArrayDeserializer(
  result: Array<ScenarioActionSelector>,
): any[] {
  return result.map((item) => {
    return scenarioActionSelectorDeserializer(item);
  });
}

/** Model that represents an action-specific target selector. */
export interface ScenarioActionSelector {
  /** The selector name, such as `logicalZone`, `physicalZone`, or `location`. */
  name: ScenarioActionSelectorName;
  /** The value that targets must match. Supports template macro syntax. */
  value: string;
}

export function scenarioActionSelectorSerializer(item: ScenarioActionSelector): any {
  return { name: item["name"], value: item["value"] };
}

export function scenarioActionSelectorDeserializer(item: any): ScenarioActionSelector {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The supported action selector names. */
export enum KnownScenarioActionSelectorName {
  /** Select targets by logical availability zone. */
  LogicalZone = "logicalZone",
  /** Select targets by physical availability zone. */
  PhysicalZone = "physicalZone",
  /** Select targets by Azure location. */
  Location = "location",
}

/**
 * The supported action selector names. \
 * {@link KnownScenarioActionSelectorName} can be used interchangeably with ScenarioActionSelectorName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **logicalZone**: Select targets by logical availability zone. \
 * **physicalZone**: Select targets by physical availability zone. \
 * **location**: Select targets by Azure location.
 */
export type ScenarioActionSelectorName = string;

/** Model that represents action dependencies. */
export interface RunAfter {
  /** Defines how multiple dependencies are evaluated. */
  behavior?: RunAfterBehavior;
  /** Array of action dependencies. */
  items: ActionDependency[];
}

export function runAfterSerializer(item: RunAfter): any {
  return { behavior: item["behavior"], items: actionDependencyArraySerializer(item["items"]) };
}

export function runAfterDeserializer(item: any): RunAfter {
  return {
    behavior: item["behavior"],
    items: actionDependencyArrayDeserializer(item["items"]),
  };
}

/** Enum for run after behavior. */
export enum KnownRunAfterBehavior {
  /** Always continues after all dependencies (like a finally block). */
  Any = "Any",
  /** All dependencies must be satisfied to continue. */
  All = "All",
  /** At least one dependency must be satisfied to continue. */
  AtLeastOne = "AtLeastOne",
}

/**
 * Enum for run after behavior. \
 * {@link KnownRunAfterBehavior} can be used interchangeably with RunAfterBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any**: Always continues after all dependencies (like a finally block). \
 * **All**: All dependencies must be satisfied to continue. \
 * **AtLeastOne**: At least one dependency must be satisfied to continue.
 */
export type RunAfterBehavior = string;

export function actionDependencyArraySerializer(result: Array<ActionDependency>): any[] {
  return result.map((item) => {
    return actionDependencySerializer(item);
  });
}

export function actionDependencyArrayDeserializer(result: Array<ActionDependency>): any[] {
  return result.map((item) => {
    return actionDependencyDeserializer(item);
  });
}

/** Model that represents an action dependency. */
export interface ActionDependency {
  /** The type of dependency. */
  type: ActionDependencyType;
  /** Name of the action this depends on. */
  name: string;
  /** The lifecycle state of the dependency action that triggers this action to start. */
  onActionLifecycle?: ActionLifecycle;
}

export function actionDependencySerializer(item: ActionDependency): any {
  return { type: item["type"], name: item["name"], onActionLifecycle: item["onActionLifecycle"] };
}

export function actionDependencyDeserializer(item: any): ActionDependency {
  return {
    type: item["type"],
    name: item["name"],
    onActionLifecycle: item["onActionLifecycle"],
  };
}

/** Enum for action dependency type. */
export enum KnownActionDependencyType {
  /** Action dependency type. */
  Action = "Action",
}

/**
 * Enum for action dependency type. \
 * {@link KnownActionDependencyType} can be used interchangeably with ActionDependencyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Action**: Action dependency type.
 */
export type ActionDependencyType = string;

/** Enum for action lifecycle states. */
export enum KnownActionLifecycle {
  /** Trigger when action reaches any terminal state. */
  AnyTerminal = "AnyTerminal",
  /** Trigger when action starts. */
  Start = "Start",
  /** Trigger when action is running. */
  Running = "Running",
  /** Trigger on success. */
  Success = "Success",
  /** Trigger on failure. */
  Failure = "Failure",
  /** Trigger when action is skipped. */
  Skipped = "Skipped",
}

/**
 * Enum for action lifecycle states. \
 * {@link KnownActionLifecycle} can be used interchangeably with ActionLifecycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AnyTerminal**: Trigger when action reaches any terminal state. \
 * **Start**: Trigger when action starts. \
 * **Running**: Trigger when action is running. \
 * **Success**: Trigger on success. \
 * **Failure**: Trigger on failure. \
 * **Skipped**: Trigger when action is skipped.
 */
export type ActionLifecycle = string;

/** Model that represents an external resource reference. */
export interface ExternalResource {
  /** The resource ID of the external resource. */
  resourceId?: string;
}

export function externalResourceSerializer(item: ExternalResource): any {
  return { resourceId: item["resourceId"] };
}

export function externalResourceDeserializer(item: any): ExternalResource {
  return {
    resourceId: item["resourceId"],
  };
}

/** Enum of how a scenario run reacts when an action fails. */
export enum KnownFailureBehavior {
  /**
   * The action failure stops the scenario run and drives it to the `Failed` terminal state.
   * This is the effective behavior when no `failureBehavior` is supplied.
   */
  Stop = "Stop",
  /**
   * The action failure is suppressed: it does not by itself end the scenario run, and the run
   * continues with its remaining actions. Suppression affects the run's result only. It does not
   * change dependency scheduling, which stays under the control of each action's `runAfter` —
   * an action that should still start after a failed dependency says so there.
   *
   * A run that completes normally and whose action failures were all suppressed terminates as
   * `PartiallySucceeded`. Any failure that is not suppressed still drives the run to `Failed`,
   * and cancellation keeps its existing result.
   */
  Continue = "Continue",
}

/**
 * Enum of how a scenario run reacts when an action fails. \
 * {@link KnownFailureBehavior} can be used interchangeably with FailureBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stop**: The action failure stops the scenario run and drives it to the `Failed` terminal state.
 * This is the effective behavior when no `failureBehavior` is supplied. \
 * **Continue**: The action failure is suppressed: it does not by itself end the scenario run, and the run
 * continues with its remaining actions. Suppression affects the run's result only. It does not
 * change dependency scheduling, which stays under the control of each action's `runAfter` —
 * an action that should still start after a failed dependency says so there.
 *
 * A run that completes normally and whose action failures were all suppressed terminates as
 * `PartiallySucceeded`. Any failure that is not suppressed still drives the run to `Failed`,
 * and cancellation keeps its existing result.
 */
export type FailureBehavior = string;

/** Model that represents a scenario recommendation. */
export interface Recommendation {
  /** The recommendation status. */
  readonly recommendationStatus: RecommendationStatus;
  /** The UTC time when the recommendation was evaluated. */
  readonly evaluationRunAt?: Date;
}

export function recommendationDeserializer(item: any): Recommendation {
  return {
    recommendationStatus: item["recommendationStatus"],
    evaluationRunAt: !item["evaluationRunAt"]
      ? item["evaluationRunAt"]
      : new Date(item["evaluationRunAt"]),
  };
}

/** Model that represents a list of scenarios and a link for pagination. */
export interface _ScenarioListResult {
  /** The Scenario items on this page */
  value: Scenario[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scenarioListResultDeserializer(item: any): _ScenarioListResult {
  return {
    value: scenarioArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scenarioArraySerializer(result: Array<Scenario>): any[] {
  return result.map((item) => {
    return scenarioSerializer(item);
  });
}

export function scenarioArrayDeserializer(result: Array<Scenario>): any[] {
  return result.map((item) => {
    return scenarioDeserializer(item);
  });
}

/**
 * Model that represents a built-in scenario template. A scenario template is a versioned,
 * read-only blueprint published by Microsoft that can be used to create a scenario. Templates
 * are the same shape as the scenarios they produce, so an action read from a template is valid
 * input to a scenario create.
 *
 * The template is addressed without a version, and always describes its newest published
 * version. Address a specific version through the child versions resource.
 */
export interface ScenarioTemplate extends ProxyResource {
  /** The properties of the scenario template's newest published version. */
  properties: ScenarioTemplateProperties;
}

export function scenarioTemplateDeserializer(item: any): ScenarioTemplate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: scenarioTemplatePropertiesDeserializer(item["properties"]),
  };
}

/**
 * Model that represents the properties of a scenario template. These are the properties of the
 * template's newest published version, together with the version number that identifies it.
 */
export interface ScenarioTemplateProperties {
  /**
   * The newest published version of the template, for example 1.2. This is the version whose
   * content the remaining properties describe, and the version a scenario records when it is
   * created from the template without naming one.
   */
  readonly latestVersion: string;
  /** Localized display name of the template. */
  readonly displayName?: string;
  /** Description of what the template does, and what resilience question it answers. */
  readonly description?: string;
  /**
   * Parameter definitions the template accepts. Values are supplied when the scenario created
   * from this template is configured, and are referenced from an action through the
   * `%%\{parameters.\<name\>\}%%` macro.
   */
  readonly parameters?: ScenarioParameter[];
  /**
   * The actions that define the template's orchestration. These are the same model a scenario
   * publishes, and carry unresolved `%%\{...\}%%` macros; the macros are substituted when the
   * scenario runs, not when it is read or created.
   *
   * Three macro namespaces may appear:
   *
   * - `%%\{parameters.\<name\>\}%%` — resolves from the parameter values supplied when the
   * scenario is configured. The accepted names are declared by `parameters`.
   * - `%%\{resourceTargeting.include.\<dimension\>\}%%` — resolves from the resource targeting
   * of the scenario's configuration (for example `zones`, `locations`). The template does not
   * declare these; they are dimensions of the configuration supplied at run time.
   * - `%%\{filters.\<dimension\>\}%%` — deprecated spelling of `resourceTargeting.include.`,
   * retained only so that superseded template versions keep resolving. Do not depend on it;
   * the newest version of every template uses `resourceTargeting.include.`.
   *
   * An action's `failureBehavior` overrides the template-wide `failureBehavior` for that action
   * alone; an action that does not carry one inherits the template-wide value.
   */
  readonly actions: ScenarioAction[];
  /**
   * Template-wide default for how a scenario run reacts when one of this template's actions
   * fails. An action that does not carry its own `failureBehavior` inherits this value; when
   * neither is present the effective behavior is `Stop`.
   *
   * A scenario created from this template takes this policy with the rest of the template's
   * structure, so it is also the scenario's resolved `failureBehavior`. Template versions
   * published before this policy existed do not carry one and report it as absent, which the
   * run resolves as `Stop`.
   */
  readonly failureBehavior?: FailureBehavior;
}

export function scenarioTemplatePropertiesDeserializer(item: any): ScenarioTemplateProperties {
  return {
    latestVersion: item["latestVersion"],
    displayName: item["displayName"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scenarioParameterArrayDeserializer(item["parameters"]),
    actions: scenarioActionArrayDeserializer(item["actions"]),
    failureBehavior: item["failureBehavior"],
  };
}

/** Model that represents a list of scenario templates and a link for pagination. */
export interface _ScenarioTemplateListResult {
  /** The ScenarioTemplate items on this page */
  value: ScenarioTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scenarioTemplateListResultDeserializer(item: any): _ScenarioTemplateListResult {
  return {
    value: scenarioTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scenarioTemplateArrayDeserializer(result: Array<ScenarioTemplate>): any[] {
  return result.map((item) => {
    return scenarioTemplateDeserializer(item);
  });
}

/**
 * Model that represents a single published version of a scenario template. A published version
 * is immutable: corrections are shipped as a new version rather than by changing an existing
 * one, so a scenario that records the version it was created from always resolves to the same
 * content.
 */
export interface ScenarioTemplateVersion extends ProxyResource {
  /** The properties of the scenario template version. */
  properties: ScenarioTemplateVersionProperties;
}

export function scenarioTemplateVersionDeserializer(item: any): ScenarioTemplateVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: scenarioTemplateVersionPropertiesDeserializer(item["properties"]),
  };
}

/**
 * Model that represents the properties of a single published version of a scenario template —
 * the blueprint content itself.
 */
export interface ScenarioTemplateVersionProperties {
  /** Localized display name of the template. */
  readonly displayName?: string;
  /** Description of what the template does, and what resilience question it answers. */
  readonly description?: string;
  /**
   * Parameter definitions the template accepts. Values are supplied when the scenario created
   * from this template is configured, and are referenced from an action through the
   * `%%\{parameters.\<name\>\}%%` macro.
   */
  readonly parameters?: ScenarioParameter[];
  /**
   * The actions that define the template's orchestration. These are the same model a scenario
   * publishes, and carry unresolved `%%\{...\}%%` macros; the macros are substituted when the
   * scenario runs, not when it is read or created.
   *
   * Three macro namespaces may appear:
   *
   * - `%%\{parameters.\<name\>\}%%` — resolves from the parameter values supplied when the
   * scenario is configured. The accepted names are declared by `parameters`.
   * - `%%\{resourceTargeting.include.\<dimension\>\}%%` — resolves from the resource targeting
   * of the scenario's configuration (for example `zones`, `locations`). The template does not
   * declare these; they are dimensions of the configuration supplied at run time.
   * - `%%\{filters.\<dimension\>\}%%` — deprecated spelling of `resourceTargeting.include.`,
   * retained only so that superseded template versions keep resolving. Do not depend on it;
   * the newest version of every template uses `resourceTargeting.include.`.
   *
   * An action's `failureBehavior` overrides the template-wide `failureBehavior` for that action
   * alone; an action that does not carry one inherits the template-wide value.
   */
  readonly actions: ScenarioAction[];
  /**
   * Template-wide default for how a scenario run reacts when one of this template's actions
   * fails. An action that does not carry its own `failureBehavior` inherits this value; when
   * neither is present the effective behavior is `Stop`.
   *
   * A scenario created from this template takes this policy with the rest of the template's
   * structure, so it is also the scenario's resolved `failureBehavior`. Template versions
   * published before this policy existed do not carry one and report it as absent, which the
   * run resolves as `Stop`.
   */
  readonly failureBehavior?: FailureBehavior;
}

export function scenarioTemplateVersionPropertiesDeserializer(
  item: any,
): ScenarioTemplateVersionProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : scenarioParameterArrayDeserializer(item["parameters"]),
    actions: scenarioActionArrayDeserializer(item["actions"]),
    failureBehavior: item["failureBehavior"],
  };
}

/** Model that represents a list of scenario template versions and a link for pagination. */
export interface _ScenarioTemplateVersionListResult {
  /** The ScenarioTemplateVersion items on this page */
  value: ScenarioTemplateVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scenarioTemplateVersionListResultDeserializer(
  item: any,
): _ScenarioTemplateVersionListResult {
  return {
    value: scenarioTemplateVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scenarioTemplateVersionArrayDeserializer(
  result: Array<ScenarioTemplateVersion>,
): any[] {
  return result.map((item) => {
    return scenarioTemplateVersionDeserializer(item);
  });
}

/** Model that represents the scenario. */
export interface ScenarioConfiguration extends ProxyResource {
  /** The properties of scenario definition. */
  properties?: ScenarioConfigurationProperties;
}

export function scenarioConfigurationSerializer(item: ScenarioConfiguration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scenarioConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function scenarioConfigurationDeserializer(item: any): ScenarioConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scenarioConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the scenario configuration. */
export interface ScenarioConfigurationProperties {
  /** Resource ID of the scenario this configuration applies to. */
  scenarioId: string;
  /** Runtime parameter values for the scenario. Keys must match parameter names defined in the scenario. */
  parameters?: KeyValuePair[];
  /** Most recent provisioning state for the given scenario resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Unified resource targeting policy that controls which discovered resources participate
   * in fault injection. Replaces the separate `exclusions` and `filters` properties with
   * symmetric include/exclude criteria.
   *
   * Include uses AND logic — a resource must match ALL active include dimensions.
   * Exclude uses OR logic — a resource is removed if it matches ANY exclude dimension.
   * When include and exclude conflict on the same resource, exclude wins.
   *
   * Null or omitted means all discovered resources participate (no targeting constraints).
   */
  resourceTargeting?: ResourceTargeting;
}

export function scenarioConfigurationPropertiesSerializer(
  item: ScenarioConfigurationProperties,
): any {
  return {
    scenarioId: item["scenarioId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : keyValuePairArraySerializer(item["parameters"]),
    resourceTargeting: !item["resourceTargeting"]
      ? item["resourceTargeting"]
      : resourceTargetingSerializer(item["resourceTargeting"]),
  };
}

export function scenarioConfigurationPropertiesDeserializer(
  item: any,
): ScenarioConfigurationProperties {
  return {
    scenarioId: item["scenarioId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : keyValuePairArrayDeserializer(item["parameters"]),
    provisioningState: item["provisioningState"],
    resourceTargeting: !item["resourceTargeting"]
      ? item["resourceTargeting"]
      : resourceTargetingDeserializer(item["resourceTargeting"]),
  };
}

/**
 * Model that represents unified resource targeting with symmetric include/exclude criteria.
 * Both sides support the same set of dimensions.
 */
export interface ResourceTargeting {
  /**
   * Inclusion criteria. Resources must match ALL active dimensions to be candidates.
   * Null or omitted means no inclusion filtering (all resources are candidates).
   */
  include?: ResourceTargetingCriteria;
  /**
   * Exclusion criteria. Resources matching ANY active dimension are removed.
   * Null or omitted means no exclusions applied.
   */
  exclude?: ResourceTargetingCriteria;
}

export function resourceTargetingSerializer(item: ResourceTargeting): any {
  return {
    include: !item["include"]
      ? item["include"]
      : resourceTargetingCriteriaSerializer(item["include"]),
    exclude: !item["exclude"]
      ? item["exclude"]
      : resourceTargetingCriteriaSerializer(item["exclude"]),
  };
}

export function resourceTargetingDeserializer(item: any): ResourceTargeting {
  return {
    include: !item["include"]
      ? item["include"]
      : resourceTargetingCriteriaDeserializer(item["include"]),
    exclude: !item["exclude"]
      ? item["exclude"]
      : resourceTargetingCriteriaDeserializer(item["exclude"]),
  };
}

/**
 * Model that represents a set of targeting criteria for resource selection.
 * Used on both the include and exclude sides of ResourceTargeting.
 *
 * All dimensions use unified null/empty semantics:
 * - Null or omitted means "no constraint" (this dimension is inactive).
 * - Empty array is treated the same as null (no constraint).
 * - Non-empty array means the dimension is active.
 */
export interface ResourceTargetingCriteria {
  /**
   * Array of Azure location strings (e.g., "eastus", "westeurope", "global").
   * Case-insensitive, normalized form only (e.g., "eastus" not "East US").
   */
  locations?: string[];
  /**
   * Array of logical availability zone identifiers (e.g., "1", "2", "3", "zone-redundant").
   *
   * Mutually exclusive with `physicalZones` — set one or the other, not both.
   * When set, `locations` must also be set on the same side (zone IDs are only meaningful within a region).
   */
  zones?: string[];
  /**
   * Array of physical datacenter zone identifiers in `{region}-az{N}` format
   * (e.g., "westus2-az1"). Resolved to logical zones per-subscription at execution time.
   *
   * Mutually exclusive with `zones` — set one or the other, not both.
   */
  physicalZones?: string[];
  /**
   * Array of Azure resource type strings (e.g., "Microsoft.Compute/virtualMachines").
   * Case-insensitive equality. Supports trailing wildcard (e.g., "Microsoft.Compute/*").
   */
  types?: string[];
  /**
   * Array of tag key-value pairs for filtering by Azure resource tags.
   * Key and value are matched case-insensitively. Use "*" as value to match any value for a key.
   */
  tags?: KeyValuePair[];
  /** Array of fully qualified Azure resource IDs. Case-insensitive equality. */
  resources?: string[];
}

export function resourceTargetingCriteriaSerializer(item: ResourceTargetingCriteria): any {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    physicalZones: !item["physicalZones"]
      ? item["physicalZones"]
      : item["physicalZones"].map((p: any) => {
          return p;
        }),
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
    tags: !item["tags"] ? item["tags"] : keyValuePairArraySerializer(item["tags"]),
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
  };
}

export function resourceTargetingCriteriaDeserializer(item: any): ResourceTargetingCriteria {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    physicalZones: !item["physicalZones"]
      ? item["physicalZones"]
      : item["physicalZones"].map((p: any) => {
          return p;
        }),
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
    tags: !item["tags"] ? item["tags"] : keyValuePairArrayDeserializer(item["tags"]),
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
  };
}

/** Model that represents a list of scenario configurations and a link for pagination. */
export interface _ScenarioConfigurationListResult {
  /** The ScenarioConfiguration items on this page */
  value: ScenarioConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scenarioConfigurationListResultDeserializer(
  item: any,
): _ScenarioConfigurationListResult {
  return {
    value: scenarioConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scenarioConfigurationArraySerializer(result: Array<ScenarioConfiguration>): any[] {
  return result.map((item) => {
    return scenarioConfigurationSerializer(item);
  });
}

export function scenarioConfigurationArrayDeserializer(
  result: Array<ScenarioConfiguration>,
): any[] {
  return result.map((item) => {
    return scenarioConfigurationDeserializer(item);
  });
}

/** Model that represents the scenario run. */
export interface ScenarioRun extends ProxyResource {
  /** The properties of scenario run. */
  properties?: ScenarioRunProperties;
}

export function scenarioRunDeserializer(item: any): ScenarioRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scenarioRunPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the scenario run. */
export interface ScenarioRunProperties {
  /** The workspace name. */
  readonly workspaceName: string;
  /** The scenario name. */
  readonly scenarioName: string;
  /** The scenario configuration name. */
  readonly scenarioConfigurationName: string;
  /** The principal id for the managed identity used for the run. */
  readonly managedIdentityPrincipalId: string;
  /**
   * The resource snapshot ID this run is pinned to. Resolved from the scenario's
   * pinned evaluation snapshot (template scenarios) or the latest discovery
   * snapshot (custom scenarios) at run creation, ensuring the run executes against
   * the same set of discovered resources that produced the recommendation.
   */
  readonly resourceSnapshotId?: string;
  /** The scenario run status. */
  readonly status: ScenarioRunState;
  /** All resources discovered for the scenario run. */
  readonly resources: ScenarioRunResource[];
  /**
   * Resources that matched the scenario's target resource types but were excluded
   * from fault injection by the configuration's resource-targeting filters
   * (for example zone, location, or explicit exclusions). These resources will not be impacted by the run.
   */
  readonly excludedResources?: ScenarioRunResource[];
  /** System or infrastructure errors encountered during the scenario run. */
  readonly errors?: OperationError[];
  /** Customer-actionable warnings encountered during the scenario run. */
  readonly warnings?: ScenarioRunWarning[];
  /** Business errors from fault injection — permission and resource state issues. */
  readonly executionErrors?: ScenarioErrors;
  /** The scenario run json. */
  readonly scenarioRunJson?: string;
  /** The scenario run summary. */
  readonly scenarioRunSummary?: ScenarioRunSummaryAction[];
  /** When the scenario run was started. */
  readonly startTime: Date;
  /** When the scenario run was completed. */
  readonly endTime?: Date;
  /**
   * Zone resolution information. Present when the scenario configuration
   * used physical zone targeting (`physicalZones`). Contains the mode,
   * requested physical zones, and per-subscription logical zone mappings.
   */
  readonly zoneResolution?: ZoneResolutionInfo;
}

export function scenarioRunPropertiesDeserializer(item: any): ScenarioRunProperties {
  return {
    workspaceName: item["workspaceName"],
    scenarioName: item["scenarioName"],
    scenarioConfigurationName: item["scenarioConfigurationName"],
    managedIdentityPrincipalId: item["managedIdentityPrincipalId"],
    resourceSnapshotId: item["resourceSnapshotId"],
    status: item["status"],
    resources: scenarioRunResourceArrayDeserializer(item["resources"]),
    excludedResources: !item["excludedResources"]
      ? item["excludedResources"]
      : scenarioRunResourceArrayDeserializer(item["excludedResources"]),
    errors: !item["errors"] ? item["errors"] : operationErrorArrayDeserializer(item["errors"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : scenarioRunWarningArrayDeserializer(item["warnings"]),
    executionErrors: !item["executionErrors"]
      ? item["executionErrors"]
      : scenarioErrorsDeserializer(item["executionErrors"]),
    scenarioRunJson: item["scenarioRunJson"],
    scenarioRunSummary: !item["scenarioRunSummary"]
      ? item["scenarioRunSummary"]
      : scenarioRunSummaryActionArrayDeserializer(item["scenarioRunSummary"]),
    startTime: new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    zoneResolution: !item["zoneResolution"]
      ? item["zoneResolution"]
      : zoneResolutionInfoDeserializer(item["zoneResolution"]),
  };
}

/** Enum of the scenario run state. */
export enum KnownScenarioRunState {
  /** The scenario run has been queued and is waiting to start. */
  Queued = "Queued",
  /** The scenario run is in the process of being resolved. */
  Resolving = "Resolving",
  /** The scenario run is in the process of being generated. */
  Generating = "Generating",
  /** The scenario run is in the process of being validated. */
  Validating = "Validating",
  /** The scenario run validation has completed successfully. */
  ValidationSucceeded = "ValidationSucceeded",
  /** The scenario run is in the process of being started. */
  Starting = "Starting",
  /** The scenario run is in the process of being prepared. */
  Preparing = "Preparing",
  /** The scenario run is in the process of running. */
  Running = "Running",
  /** The scenario run is in the process of being cleaned up. */
  CleaningUp = "CleaningUp",
  /** The scenario run is in the process of being canceled. */
  Canceling = "Canceling",
  /** The scenario run has been canceled. */
  Canceled = "Canceled",
  /** The scenario run has completed successfully. */
  Succeeded = "Succeeded",
  /**
   * The scenario run completed, but one or more actions failed and every one of those
   * failures was suppressed by the effective `failureBehavior`.
   */
  PartiallySucceeded = "PartiallySucceeded",
  /** The scenario run has failed. */
  Failed = "Failed",
}

/**
 * Enum of the scenario run state. \
 * {@link KnownScenarioRunState} can be used interchangeably with ScenarioRunState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued**: The scenario run has been queued and is waiting to start. \
 * **Resolving**: The scenario run is in the process of being resolved. \
 * **Generating**: The scenario run is in the process of being generated. \
 * **Validating**: The scenario run is in the process of being validated. \
 * **ValidationSucceeded**: The scenario run validation has completed successfully. \
 * **Starting**: The scenario run is in the process of being started. \
 * **Preparing**: The scenario run is in the process of being prepared. \
 * **Running**: The scenario run is in the process of running. \
 * **CleaningUp**: The scenario run is in the process of being cleaned up. \
 * **Canceling**: The scenario run is in the process of being canceled. \
 * **Canceled**: The scenario run has been canceled. \
 * **Succeeded**: The scenario run has completed successfully. \
 * **PartiallySucceeded**: The scenario run completed, but one or more actions failed and every one of those
 * failures was suppressed by the effective `failureBehavior`. \
 * **Failed**: The scenario run has failed.
 */
export type ScenarioRunState = string;

export function scenarioRunResourceArrayDeserializer(result: Array<ScenarioRunResource>): any[] {
  return result.map((item) => {
    return scenarioRunResourceDeserializer(item);
  });
}

/** Model that represents the scenario run resource. */
export interface ScenarioRunResource {
  /** The resource id. */
  readonly id: string;
}

export function scenarioRunResourceDeserializer(item: any): ScenarioRunResource {
  return {
    id: item["id"],
  };
}

export function scenarioRunWarningArrayDeserializer(result: Array<ScenarioRunWarning>): any[] {
  return result.map((item) => {
    return scenarioRunWarningDeserializer(item);
  });
}

/** Customer-actionable warning associated with a scenario run. */
export interface ScenarioRunWarning {
  /** The stable code that identifies the warning. */
  readonly code: string;
  /** The customer-safe description of the warning. */
  readonly message: string;
  /** Additional customer-safe details about the warning. */
  readonly details?: ScenarioRunWarningDetail[];
}

export function scenarioRunWarningDeserializer(item: any): ScenarioRunWarning {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : scenarioRunWarningDetailArrayDeserializer(item["details"]),
  };
}

export function scenarioRunWarningDetailArrayDeserializer(
  result: Array<ScenarioRunWarningDetail>,
): any[] {
  return result.map((item) => {
    return scenarioRunWarningDetailDeserializer(item);
  });
}

/** Additional information about a scenario run warning. */
export interface ScenarioRunWarningDetail {
  /** The stable code that identifies the warning detail. */
  readonly code: string;
  /** The customer-safe description of the warning detail. */
  readonly message: string;
  /** The target associated with the warning detail. */
  readonly target?: string;
}

export function scenarioRunWarningDetailDeserializer(item: any): ScenarioRunWarningDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Model that represents the scenario run errors. */
export interface ScenarioErrors {
  /** Error code for internal server errors. */
  errorCode?: string;
  /** Error message for internal server errors. */
  errorMessage?: string;
  /** Any permission errors associated with the scenario run. */
  readonly permission: PermissionError[];
  /** Any resource state errors associated with the scenario run. */
  readonly resource: ResourceStateError[];
}

export function scenarioErrorsDeserializer(item: any): ScenarioErrors {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    permission: permissionErrorArrayDeserializer(item["permission"]),
    resource: resourceStateErrorArrayDeserializer(item["resource"]),
  };
}

export function permissionErrorArrayDeserializer(result: Array<PermissionError>): any[] {
  return result.map((item) => {
    return permissionErrorDeserializer(item);
  });
}

export function resourceStateErrorArrayDeserializer(result: Array<ResourceStateError>): any[] {
  return result.map((item) => {
    return resourceStateErrorDeserializer(item);
  });
}

/** Model that represents the resource state error. */
export interface ResourceStateError {
  /** The resource id for the affected resource. */
  readonly resourceId: string;
  /** The error code. */
  readonly errorCode: string;
  /** The error message. */
  readonly errorMessage: string;
  /** The remediation uri. */
  readonly remediationUri: string;
}

export function resourceStateErrorDeserializer(item: any): ResourceStateError {
  return {
    resourceId: item["resourceId"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    remediationUri: item["remediationUri"],
  };
}

export function scenarioRunSummaryActionArrayDeserializer(
  result: Array<ScenarioRunSummaryAction>,
): any[] {
  return result.map((item) => {
    return scenarioRunSummaryActionDeserializer(item);
  });
}

/** Model that represents the scenario run action. */
export interface ScenarioRunSummaryAction {
  /**
   * The resources associated with the specified action, including the concrete targets
   * evaluated during execution.
   */
  readonly resources: ScenarioRunSummaryResource[];
  /** The urn for the given chaos action. */
  readonly actionUrn: string;
  /** The state of the action. */
  readonly state: ScenarioSummaryState;
  /** When the action was started. */
  readonly startedAt?: Date;
  /** When the action was completed. */
  readonly completedAt?: Date;
  /** Structured information about the action failure. */
  readonly error?: ActionError;
  /**
   * Whether this action's failure was suppressed by the effective `failureBehavior`
   * and therefore did not fail the scenario run. Present only for actions in the
   * `Failed` state; absent otherwise.
   */
  readonly failureSuppressed?: boolean;
}

export function scenarioRunSummaryActionDeserializer(item: any): ScenarioRunSummaryAction {
  return {
    resources: scenarioRunSummaryResourceArrayDeserializer(item["resources"]),
    actionUrn: item["actionUrn"],
    state: item["state"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    error: !item["error"] ? item["error"] : actionErrorDeserializer(item["error"]),
    failureSuppressed: item["failureSuppressed"],
  };
}

export function scenarioRunSummaryResourceArrayDeserializer(
  result: Array<ScenarioRunSummaryResource>,
): any[] {
  return result.map((item) => {
    return scenarioRunSummaryResourceDeserializer(item);
  });
}

/** Model that represents a resource associated with a scenario run action. */
export interface ScenarioRunSummaryResource {
  /** The resource ID. */
  readonly id: string;
  /** The resources affected during action execution. */
  readonly affectedResources?: ScenarioRunEffectiveTarget[];
}

export function scenarioRunSummaryResourceDeserializer(item: any): ScenarioRunSummaryResource {
  return {
    id: item["id"],
    affectedResources: !item["affectedResources"]
      ? item["affectedResources"]
      : scenarioRunEffectiveTargetArrayDeserializer(item["affectedResources"]),
  };
}

export function scenarioRunEffectiveTargetArrayDeserializer(
  result: Array<ScenarioRunEffectiveTarget>,
): any[] {
  return result.map((item) => {
    return scenarioRunEffectiveTargetDeserializer(item);
  });
}

/** Model that represents the outcome for a concrete action target. */
export interface ScenarioRunEffectiveTarget {
  /** The target resource ID. */
  readonly id: string;
  /** The target execution state. */
  readonly state: ScenarioRunTargetState;
  /** When target processing started. */
  readonly startedAt?: Date;
  /** When target processing completed. */
  readonly completedAt?: Date;
}

export function scenarioRunEffectiveTargetDeserializer(item: any): ScenarioRunEffectiveTarget {
  return {
    id: item["id"],
    state: item["state"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
  };
}

/** Enum of the execution states for a concrete action target. */
export enum KnownScenarioRunTargetState {
  /** The action completed successfully for the target. */
  Succeeded = "Succeeded",
  /**
   * Evaluation determined that the action cannot apply because the target lacks required
   * properties or capabilities, or does not satisfy the action criteria. For example,
   * a SQL server without failover configured.
   */
  NotApplicable = "NotApplicable",
  /**
   * The action applies, but execution intentionally made no change because the target is
   * already in the desired state or the change would not be safely recoverable. For example,
   * a virtual machine that is already shut down.
   */
  Skipped = "Skipped",
  /** Evaluation, authorization, lookup, mutation, or cleanup failed for the target. */
  Failed = "Failed",
}

/**
 * Enum of the execution states for a concrete action target. \
 * {@link KnownScenarioRunTargetState} can be used interchangeably with ScenarioRunTargetState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The action completed successfully for the target. \
 * **NotApplicable**: Evaluation determined that the action cannot apply because the target lacks required
 * properties or capabilities, or does not satisfy the action criteria. For example,
 * a SQL server without failover configured. \
 * **Skipped**: The action applies, but execution intentionally made no change because the target is
 * already in the desired state or the change would not be safely recoverable. For example,
 * a virtual machine that is already shut down. \
 * **Failed**: Evaluation, authorization, lookup, mutation, or cleanup failed for the target.
 */
export type ScenarioRunTargetState = string;

/** Enum of the scenario run summary action state. */
export enum KnownScenarioSummaryState {
  /** The action is pending and has not started. */
  Pending = "Pending",
  /** The action is in the process of starting. */
  Starting = "Starting",
  /** The action is in the process of running. */
  Running = "Running",
  /** The action is in the process of stopping. */
  Stopping = "Stopping",
  /** The action has completed successfully. */
  Succeeded = "Succeeded",
  /** The action is in the process of being canceled. */
  Canceling = "Canceling",
  /** The action has been canceled. */
  Canceled = "Canceled",
  /** The action is failing due to an error. */
  FailingOnError = "FailingOnError",
  /** The action has failed. */
  Failed = "Failed",
  /** The action was skipped. */
  Skipped = "Skipped",
}

/**
 * Enum of the scenario run summary action state. \
 * {@link KnownScenarioSummaryState} can be used interchangeably with ScenarioSummaryState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The action is pending and has not started. \
 * **Starting**: The action is in the process of starting. \
 * **Running**: The action is in the process of running. \
 * **Stopping**: The action is in the process of stopping. \
 * **Succeeded**: The action has completed successfully. \
 * **Canceling**: The action is in the process of being canceled. \
 * **Canceled**: The action has been canceled. \
 * **FailingOnError**: The action is failing due to an error. \
 * **Failed**: The action has failed. \
 * **Skipped**: The action was skipped.
 */
export type ScenarioSummaryState = string;

/** Structured information about a scenario action failure. */
export interface ActionError {
  /** The stable code that identifies the action failure. */
  readonly code: string;
  /** The customer-safe description of the action failure. */
  readonly message: string;
  /** Additional customer-safe details about the action failure. */
  readonly details?: ActionErrorDetail[];
}

export function actionErrorDeserializer(item: any): ActionError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : actionErrorDetailArrayDeserializer(item["details"]),
  };
}

export function actionErrorDetailArrayDeserializer(result: Array<ActionErrorDetail>): any[] {
  return result.map((item) => {
    return actionErrorDetailDeserializer(item);
  });
}

/** Additional information about a scenario action failure. */
export interface ActionErrorDetail {
  /** The stable code that identifies the failure detail. */
  readonly code: string;
  /** The customer-safe description of the failure detail. */
  readonly message: string;
  /** The target associated with the failure detail. */
  readonly target?: string;
}

export function actionErrorDetailDeserializer(item: any): ActionErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/**
 * Information about how physical zones were resolved to logical zones
 * for each subscription during scenario execution.
 */
export interface ZoneResolutionInfo {
  /**
   * The zone targeting mode used for this run.
   * `logical` — customer specified logical zone identifiers directly.
   * `physical` — customer specified physical zone identifiers; the system
   * resolved them to per-subscription logical zones at execution time.
   */
  readonly mode: ZoneResolutionMode;
  /**
   * The physical zone identifiers requested by the customer in the
   * scenario configuration (e.g., `["westus2-az1"]`).
   * Empty array when `mode` is `logical`.
   */
  readonly requestedPhysicalZones: string[];
  /**
   * Per-subscription zone resolution results. Each entry maps a subscription
   * to the logical zone resolved from the requested physical zone.
   * Empty when `mode` is `logical`.
   */
  readonly subscriptionZoneMappings: ZoneResolutionMapping[];
}

export function zoneResolutionInfoDeserializer(item: any): ZoneResolutionInfo {
  return {
    mode: item["mode"],
    requestedPhysicalZones: item["requestedPhysicalZones"].map((p: any) => {
      return p;
    }),
    subscriptionZoneMappings: zoneResolutionMappingArrayDeserializer(
      item["subscriptionZoneMappings"],
    ),
  };
}

/** The zone resolution mode for a scenario run. */
export enum KnownZoneResolutionMode {
  /** Logical zone mode — customer specified logical zone identifiers directly. */
  Logical = "logical",
  /**
   * Physical zone mode — system resolved physical zones to per-subscription
   * logical zones at execution time.
   */
  Physical = "physical",
}

/**
 * The zone resolution mode for a scenario run. \
 * {@link KnownZoneResolutionMode} can be used interchangeably with ZoneResolutionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **logical**: Logical zone mode — customer specified logical zone identifiers directly. \
 * **physical**: Physical zone mode — system resolved physical zones to per-subscription
 * logical zones at execution time.
 */
export type ZoneResolutionMode = string;

export function zoneResolutionMappingArrayDeserializer(
  result: Array<ZoneResolutionMapping>,
): any[] {
  return result.map((item) => {
    return zoneResolutionMappingDeserializer(item);
  });
}

/** Maps a single subscription to its physical-to-logical zone resolutions. */
export interface ZoneResolutionMapping {
  /** The subscription ID (e.g., `"6b052e15-03d3-4f17-b2e1-be7f07588291"`). */
  readonly subscriptionId: string;
  /** The physical-to-logical zone mappings for this subscription. */
  readonly zoneMappings: PhysicalToLogicalZoneMapping[];
}

export function zoneResolutionMappingDeserializer(item: any): ZoneResolutionMapping {
  return {
    subscriptionId: item["subscriptionId"],
    zoneMappings: physicalToLogicalZoneMappingArrayDeserializer(item["zoneMappings"]),
  };
}

export function physicalToLogicalZoneMappingArrayDeserializer(
  result: Array<PhysicalToLogicalZoneMapping>,
): any[] {
  return result.map((item) => {
    return physicalToLogicalZoneMappingDeserializer(item);
  });
}

/** Maps a physical zone to the resolved logical zone for a given subscription. */
export interface PhysicalToLogicalZoneMapping {
  /** The physical availability zone (e.g., `"westus2-az1"`). */
  readonly physicalZone: string;
  /**
   * The logical availability zone resolved for this subscription
   * (e.g., `"1"`, `"2"`, `"3"`).
   */
  readonly logicalZone: string;
}

export function physicalToLogicalZoneMappingDeserializer(item: any): PhysicalToLogicalZoneMapping {
  return {
    physicalZone: item["physicalZone"],
    logicalZone: item["logicalZone"],
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface Validation extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidationProperties;
}

export function validationDeserializer(item: any): Validation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validationPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the scenario validation. */
export interface ValidationProperties {
  /** The scenario validation status. */
  readonly status: ScenarioValidationState;
  /** The scenario validation UTC start time. */
  readonly startTime: Date;
  /** Execution plan created from validation. This plan will be executed as-is on next scenario execution. */
  executionPlanJson?: string;
  /** The scenario validation UTC end time. */
  readonly endTime?: Date;
  /**
   * Resources that matched the scenario's target resource types and will be impacted
   * by the run, resolved after applying the configuration's resource-targeting filters.
   */
  readonly resources?: ScenarioRunResource[];
  /**
   * Resources that matched the scenario's target resource types but were excluded
   * from fault injection by the configuration's resource-targeting filters
   * (for example zone, location, or explicit exclusions). These resources will not be impacted.
   */
  readonly excludedResources?: ScenarioRunResource[];
  /** System or infrastructure errors encountered during validation. */
  readonly errors?: OperationError[];
  /** Business errors from validation — permission and resource state issues. */
  validationErrors?: ScenarioErrors;
}

export function validationPropertiesDeserializer(item: any): ValidationProperties {
  return {
    status: item["status"],
    startTime: new Date(item["startTime"]),
    executionPlanJson: item["executionPlanJson"],
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    resources: !item["resources"]
      ? item["resources"]
      : scenarioRunResourceArrayDeserializer(item["resources"]),
    excludedResources: !item["excludedResources"]
      ? item["excludedResources"]
      : scenarioRunResourceArrayDeserializer(item["excludedResources"]),
    errors: !item["errors"] ? item["errors"] : operationErrorArrayDeserializer(item["errors"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : scenarioErrorsDeserializer(item["validationErrors"]),
  };
}

/** Enum of the scenario validation state. */
export enum KnownScenarioValidationState {
  /** The scenario validation is in a resolving state. */
  Resolving = "Resolving",
  /** The scenario validation is in a generating state. */
  Generating = "Generating",
  /** The scenario validation is in a validating state. */
  Validating = "Validating",
  /** The scenario validation has been accepted. */
  Accepted = "Accepted",
  /** The scenario validation has not yet started. */
  NotStarted = "NotStarted",
  /**
   * The scenario validation reflects a state that requires attention.
   * This is a terminal failure state indicating validation issues were found.
   */
  RequiresAttention = "RequiresAttention",
  /**
   * The scenario validation found no valid resources to perform fault behaviors against.
   * This is a terminal failure state.
   */
  NoResolvedResources = "NoResolvedResources",
  /** The scenario validation completed successfully and the scenario is ready to execute. */
  Succeeded = "Succeeded",
}

/**
 * Enum of the scenario validation state. \
 * {@link KnownScenarioValidationState} can be used interchangeably with ScenarioValidationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resolving**: The scenario validation is in a resolving state. \
 * **Generating**: The scenario validation is in a generating state. \
 * **Validating**: The scenario validation is in a validating state. \
 * **Accepted**: The scenario validation has been accepted. \
 * **NotStarted**: The scenario validation has not yet started. \
 * **RequiresAttention**: The scenario validation reflects a state that requires attention.
 * This is a terminal failure state indicating validation issues were found. \
 * **NoResolvedResources**: The scenario validation found no valid resources to perform fault behaviors against.
 * This is a terminal failure state. \
 * **Succeeded**: The scenario validation completed successfully and the scenario is ready to execute.
 */
export type ScenarioValidationState = string;

/** Request body for fixing resource permissions. */
export interface FixResourcePermissionsRequest {
  /** Optional value that indicates whether to run a "dry run" of fixing resource permissions. */
  whatIf?: boolean;
}

export function fixResourcePermissionsRequestSerializer(item: FixResourcePermissionsRequest): any {
  return { whatIf: item["whatIf"] };
}

/** Model that represents the fix resource permissions result. */
export interface PermissionsFix extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PermissionsFixProperties;
}

export function permissionsFixDeserializer(item: any): PermissionsFix {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : permissionsFixPropertiesDeserializer(item["properties"]),
  };
}

/** Model that represents the properties of the permission fix operation. */
export interface PermissionsFixProperties {
  /** The permission fix state. */
  readonly state: PermissionsFixState;
  /** The permission fix UTC start time. */
  readonly startedAt: Date;
  /** The permission fix UTC end time. */
  readonly completedAt?: Date;
  /** Whether this was a what-if (dry run) operation. */
  readonly whatIfMode: boolean;
  /** The list of role assignment results. */
  readonly roleAssignments: RoleAssignmentResult[];
  /** Summary of the permission fix operation. */
  readonly summary: PermissionsFixSummary;
}

export function permissionsFixPropertiesDeserializer(item: any): PermissionsFixProperties {
  return {
    state: item["state"],
    startedAt: new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    whatIfMode: item["whatIfMode"],
    roleAssignments: roleAssignmentResultArrayDeserializer(item["roleAssignments"]),
    summary: permissionsFixSummaryDeserializer(item["summary"]),
  };
}

/** Enum of the permission fix state. */
export enum KnownPermissionsFixState {
  /** The permission fix has not started. */
  NotStarted = "NotStarted",
  /** The permission fix is in progress. */
  InProgress = "InProgress",
  /** All role assignments succeeded. */
  Succeeded = "Succeeded",
  /** All role assignments failed. */
  Failed = "Failed",
  /** Some role assignments succeeded and some failed. */
  PartiallySucceeded = "PartiallySucceeded",
  /** What-if analysis completed (no changes made). */
  WhatIfCompleted = "WhatIfCompleted",
}

/**
 * Enum of the permission fix state. \
 * {@link KnownPermissionsFixState} can be used interchangeably with PermissionsFixState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The permission fix has not started. \
 * **InProgress**: The permission fix is in progress. \
 * **Succeeded**: All role assignments succeeded. \
 * **Failed**: All role assignments failed. \
 * **PartiallySucceeded**: Some role assignments succeeded and some failed. \
 * **WhatIfCompleted**: What-if analysis completed (no changes made).
 */
export type PermissionsFixState = string;

export function roleAssignmentResultArrayDeserializer(result: Array<RoleAssignmentResult>): any[] {
  return result.map((item) => {
    return roleAssignmentResultDeserializer(item);
  });
}

/** Result of a single role assignment operation. */
export interface RoleAssignmentResult {
  /** The target Azure resource ID. */
  readonly targetResourceId: string;
  /** The managed identity principal ID. */
  readonly principalId: string;
  /** The Azure RBAC role definition ID. */
  readonly roleDefinitionId: string;
  /** Human-readable role name. */
  readonly roleDefinitionName: string;
  /** The scope at which the role was/will be assigned. */
  readonly scope: string;
  /** The status of the role assignment operation. */
  readonly status: RoleAssignmentStatus;
  /** The created role assignment resource ID (null if failed or what-if mode). */
  readonly roleAssignmentId?: string;
  /** Error details if the assignment failed. */
  readonly error?: RoleAssignmentError;
}

export function roleAssignmentResultDeserializer(item: any): RoleAssignmentResult {
  return {
    targetResourceId: item["targetResourceId"],
    principalId: item["principalId"],
    roleDefinitionId: item["roleDefinitionId"],
    roleDefinitionName: item["roleDefinitionName"],
    scope: item["scope"],
    status: item["status"],
    roleAssignmentId: item["roleAssignmentId"],
    error: !item["error"] ? item["error"] : roleAssignmentErrorDeserializer(item["error"]),
  };
}

/** Enum of the role assignment status. */
export enum KnownRoleAssignmentStatus {
  /** The role assignment succeeded. */
  Succeeded = "Succeeded",
  /** The role assignment failed. */
  Failed = "Failed",
  /** The role assignment was skipped (already exists). */
  Skipped = "Skipped",
  /** The role assignment is pending (what-if mode). */
  Pending = "Pending",
}

/**
 * Enum of the role assignment status. \
 * {@link KnownRoleAssignmentStatus} can be used interchangeably with RoleAssignmentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The role assignment succeeded. \
 * **Failed**: The role assignment failed. \
 * **Skipped**: The role assignment was skipped (already exists). \
 * **Pending**: The role assignment is pending (what-if mode).
 */
export type RoleAssignmentStatus = string;

/** Error details for a failed role assignment. */
export interface RoleAssignmentError {
  /** Azure error code. */
  readonly code: string;
  /** Error message. */
  readonly message: string;
}

export function roleAssignmentErrorDeserializer(item: any): RoleAssignmentError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Summary of the permission fix operation. */
export interface PermissionsFixSummary {
  /** Total number of role assignments required. */
  readonly totalRequired: number;
  /** Number of successful role assignments. */
  readonly succeeded: number;
  /** Number of failed role assignments. */
  readonly failed: number;
  /** Number of skipped role assignments (already existed). */
  readonly skipped: number;
}

export function permissionsFixSummaryDeserializer(item: any): PermissionsFixSummary {
  return {
    totalRequired: item["totalRequired"],
    succeeded: item["succeeded"],
    failed: item["failed"],
    skipped: item["skipped"],
  };
}

/** Model that represents a list of scenario runs and a link for pagination. */
export interface _ScenarioRunListResult {
  /** The ScenarioRun items on this page */
  value: ScenarioRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scenarioRunListResultDeserializer(item: any): _ScenarioRunListResult {
  return {
    value: scenarioRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scenarioRunArrayDeserializer(result: Array<ScenarioRun>): any[] {
  return result.map((item) => {
    return scenarioRunDeserializer(item);
  });
}

/**
 * Model that represents a connection between a workspace and a target resource.
 * A connection provisions and tracks the trust relationship that authorizes the
 * actor to reach the Chaos Studio data plane for the workspace and target during
 * fault injection.
 */
export interface Connection extends ProxyResource {
  /** The properties of the connection. */
  properties?: ConnectionProperties;
}

export function connectionSerializer(item: Connection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectionPropertiesSerializer(item["properties"]),
  };
}

export function connectionDeserializer(item: any): Connection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectionPropertiesDeserializer(item["properties"]),
  };
}

/**
 * Model that represents the properties of a connection.
 *
 * The schema is flat and discriminated by `kind`. Optional fields form the
 * superset across all connection kinds; which fields are required is
 * validated by the service per kind.
 */
export interface ConnectionProperties {
  /** The kind of connection, indicating the actor type authorized to reach the Chaos Studio data plane for the workspace and target. */
  kind: ConnectionKind;
  /** The fully qualified Azure resource ID of the target resource this connection is established with. */
  targetResourceId: string;
  /** The Microsoft Entra principal (object) ID of the identity used by the connection. */
  principalId?: string;
  /** The Microsoft Entra tenant ID that the connection identity belongs to. */
  tenantId?: string;
  /** The subject name of the certificate used to authenticate the connection. */
  certificateSubjectName?: string;
  /** The issuer of the certificate used to authenticate the connection. */
  certificateIssuer?: string;
  /**
   * The regional Chaos Studio data-plane endpoint assigned to this connection.
   * Clients and agents use this endpoint to reach the Chaos Studio data plane
   * for the connection.
   */
  readonly dataPlaneEndpoint?: string;
  /** The current status of the connection. */
  readonly status?: ConnectionStatus;
  /** The most recent provisioning state for the connection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function connectionPropertiesSerializer(item: ConnectionProperties): any {
  return {
    kind: item["kind"],
    targetResourceId: item["targetResourceId"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    certificateSubjectName: item["certificateSubjectName"],
    certificateIssuer: item["certificateIssuer"],
  };
}

export function connectionPropertiesDeserializer(item: any): ConnectionProperties {
  return {
    kind: item["kind"],
    targetResourceId: item["targetResourceId"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    certificateSubjectName: item["certificateSubjectName"],
    certificateIssuer: item["certificateIssuer"],
    dataPlaneEndpoint: item["dataPlaneEndpoint"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

/** The kind of connection, indicating the actor type authorized to reach the Chaos Studio data plane for the workspace and target. */
export enum KnownConnectionKind {
  /** A connection backed by the Chaos AKS cluster extension. */
  AksExtension = "AksExtension",
  /** A connection backed by the Chaos agent installed on the target resource. */
  ChaosAgent = "ChaosAgent",
}

/**
 * The kind of connection, indicating the actor type authorized to reach the Chaos Studio data plane for the workspace and target. \
 * {@link KnownConnectionKind} can be used interchangeably with ConnectionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AksExtension**: A connection backed by the Chaos AKS cluster extension. \
 * **ChaosAgent**: A connection backed by the Chaos agent installed on the target resource.
 */
export type ConnectionKind = string;

/** The status of a connection. */
export enum KnownConnectionStatus {
  /** The connection has been created but is not yet sending heartbeats; the trust relationship is not yet established. */
  Pending = "Pending",
  /** The connection is established and actively heartbeating. */
  Connected = "Connected",
  /** The connection's heartbeat has gone stale; heartbeats are no longer being received. */
  Disconnected = "Disconnected",
  /** The connection's credentials have been revoked. */
  Revoked = "Revoked",
}

/**
 * The status of a connection. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The connection has been created but is not yet sending heartbeats; the trust relationship is not yet established. \
 * **Connected**: The connection is established and actively heartbeating. \
 * **Disconnected**: The connection's heartbeat has gone stale; heartbeats are no longer being received. \
 * **Revoked**: The connection's credentials have been revoked.
 */
export type ConnectionStatus = string;

/** Model that represents a list of connections and a link for pagination. */
export interface _ConnectionListResult {
  /** The Connection items on this page */
  value: Connection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionListResultDeserializer(item: any): _ConnectionListResult {
  return {
    value: connectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionArraySerializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionSerializer(item);
  });
}

export function connectionArrayDeserializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01 API version. */
  V20250101 = "2025-01-01",
  /** The 2026-11-01 API version. */
  V20261101 = "2026-11-01",
}
