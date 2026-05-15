// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
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
  | ContinuousAction
  | DelayAction
  | DiscreteAction
  | ChaosExperimentAction;

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
  | ChaosTargetListSelector
  | ChaosTargetQuerySelector
  | ChaosTargetSelector;

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

/** PrivateAccesses tracked resource. */
export interface PrivateAccess extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: PrivateAccessProperties;
}

export function privateAccessSerializer(item: PrivateAccess): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: privateAccessPropertiesSerializer(item["properties"]),
  };
}

export function privateAccessDeserializer(item: any): PrivateAccess {
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
    properties: privateAccessPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a private access resource */
export interface PrivateAccessProperties {
  /** Most recent provisioning state for the given privateAccess resource. */
  readonly provisioningState?: ProvisioningState;
  /** A readonly collection of private endpoint connection. Currently only one endpoint connection is supported. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Public Network Access Control for PrivateAccess resource. */
  publicNetworkAccess?: PublicNetworkAccessOption;
}

export function privateAccessPropertiesSerializer(item: PrivateAccessProperties): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function privateAccessPropertiesDeserializer(item: any): PrivateAccessProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** The private endpoint connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The Azure identifier for private endpoint. */
  readonly id?: string;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Pending status. */
  Pending = "Pending",
  /** Approved status. */
  Approved = "Approved",
  /** Rejected status. */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending status. \
 * **Approved**: Approved status. \
 * **Rejected**: Rejected status.
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** Public Network Access Control for PrivateAccess resource. */
export enum KnownPublicNetworkAccessOption {
  /** Enabled access. */
  Enabled = "Enabled",
  /** Disabled access. */
  Disabled = "Disabled",
}

/**
 * Public Network Access Control for PrivateAccess resource. \
 * {@link KnownPublicNetworkAccessOption} can be used interchangeably with PublicNetworkAccessOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled access. \
 * **Disabled**: Disabled access.
 */
export type PublicNetworkAccessOption = string;

/** Describes a private access update. */
export interface PrivateAccessPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function privateAccessPatchSerializer(item: PrivateAccessPatch): any {
  return { tags: item["tags"] };
}

/** Model that represents a list of private access resources and a link for pagination. */
export interface _PrivateAccessListResult {
  /** The PrivateAccess items on this page */
  value: PrivateAccess[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateAccessListResultDeserializer(item: any): _PrivateAccessListResult {
  return {
    value: privateAccessArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateAccessArraySerializer(result: Array<PrivateAccess>): any[] {
  return result.map((item) => {
    return privateAccessSerializer(item);
  });
}

export function privateAccessArrayDeserializer(result: Array<PrivateAccess>): any[] {
  return result.map((item) => {
    return privateAccessDeserializer(item);
  });
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource. */
export interface PrivateLinkResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
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
    properties: privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
  /** Resource provisioning state. Not currently in use. */
  readonly provisioningState?: ProvisioningState;
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
    provisioningState: item["provisioningState"],
  };
}

/** A list of private link resources */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
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
  /** The communication endpoint used to connect and communicate with the workspace for fault-injection orchestration. */
  readonly communicationEndpoint?: string;
  /** The intended workspace-level resource scope to be used by child scenarios. */
  scopes: string[];
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    communicationEndpoint: item["communicationEndpoint"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
  };
}

/** Describes a workspace update. */
export interface WorkspaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
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

/** Model that represents the latest workspace evaluation result. */
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
  /** The number of scenarios to evaluate. */
  readonly numScenariosToEvaluate?: number;
  /** The number of scenarios that evaluated successfully. */
  readonly numScenariosEvaluatedSucceeded?: number;
  /** The number of scenarios that failed evaluation. */
  readonly numScenariosEvaluatedFailed?: number;
  /** The number of scenarios that were cancelled during evaluation. */
  readonly numScenariosEvaluatedCancelled?: number;
  /** The overall evaluation result. */
  readonly evaluationResult?: RecommendationStatus;
  /** Per-scenario evaluation results. */
  readonly results?: ScenarioEvaluationResultItem[];
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
    numScenariosToEvaluate: item["numScenariosToEvaluate"],
    numScenariosEvaluatedSucceeded: item["numScenariosEvaluatedSucceeded"],
    numScenariosEvaluatedFailed: item["numScenariosEvaluatedFailed"],
    numScenariosEvaluatedCancelled: item["numScenariosEvaluatedCancelled"],
    evaluationResult: item["evaluationResult"],
    results: !item["results"]
      ? item["results"]
      : scenarioEvaluationResultItemArrayDeserializer(item["results"]),
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
  /** The evaluation partially succeeded — some scenarios succeeded while others failed. */
  PartiallySucceeded = "PartiallySucceeded",
  /** The evaluation failed. */
  Failed = "Failed",
  /** The evaluation was canceled. */
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
 * **PartiallySucceeded**: The evaluation partially succeeded — some scenarios succeeded while others failed. \
 * **Failed**: The evaluation failed. \
 * **Canceled**: The evaluation was canceled.
 */
export type WorkspaceEvaluationStatus = string;

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

export function scenarioEvaluationResultItemArrayDeserializer(
  result: Array<ScenarioEvaluationResultItem>,
): any[] {
  return result.map((item) => {
    return scenarioEvaluationResultItemDeserializer(item);
  });
}

/** Model that represents a single scenario evaluation result. */
export interface ScenarioEvaluationResultItem {
  /** The name of the scenario that was evaluated. */
  scenarioName: string;
  /** The evaluation result for this scenario. */
  evaluationResult: RecommendationStatus;
}

export function scenarioEvaluationResultItemDeserializer(item: any): ScenarioEvaluationResultItem {
  return {
    scenarioName: item["scenarioName"],
    evaluationResult: item["evaluationResult"],
  };
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
}

export function discoveredResourcePropertiesDeserializer(item: any): DiscoveredResourceProperties {
  return {
    resourceNamespace: item["namespace"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    fullyQualifiedIdentifier: item["fullyQualifiedIdentifier"],
    discoveredAt: new Date(item["discoveredAt"]),
    scope: item["scope"],
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
  /** Resource ID of the template version this scenario was created from (optional). */
  readonly createdFrom?: string;
  /** Version of the scenario. */
  readonly version?: string;
  /** Description of what this scenario does (optional). */
  description?: string;
  /** Parameter definitions for the scenario. */
  parameters: ScenarioParameter[];
  /** Array of actions that define the scenario's orchestration. */
  actions: ScenarioAction[];
  /** The recommendation information for this scenario. */
  readonly recommendation?: Recommendation;
}

export function scenarioPropertiesSerializer(item: ScenarioProperties): any {
  return {
    description: item["description"],
    parameters: scenarioParameterArraySerializer(item["parameters"]),
    actions: scenarioActionArraySerializer(item["actions"]),
  };
}

export function scenarioPropertiesDeserializer(item: any): ScenarioProperties {
  return {
    provisioningState: item["provisioningState"],
    createdFrom: item["createdFrom"],
    version: item["version"],
    description: item["description"],
    parameters: scenarioParameterArrayDeserializer(item["parameters"]),
    actions: scenarioActionArrayDeserializer(item["actions"]),
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
}

export function scenarioParameterSerializer(item: ScenarioParameter): any {
  return {
    name: item["name"],
    type: item["type"],
    default: item["default"],
    required: item["required"],
    description: item["description"],
  };
}

export function scenarioParameterDeserializer(item: any): ScenarioParameter {
  return {
    name: item["name"],
    type: item["type"],
    default: item["default"],
    required: item["required"],
    description: item["description"],
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
  /** Action dependencies that control when this action starts. */
  runAfter?: RunAfter;
  /** ISO 8601 duration to wait before action starts (e.g., PT30S for 30 seconds). Supports template macro syntax. */
  waitBefore?: string;
  /** ISO 8601 duration for maximum action execution time. Supports template macro syntax. */
  timeout?: string;
  /** External resource reference for the action. */
  externalResource?: ExternalResource;
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
    runAfter: !item["runAfter"] ? item["runAfter"] : runAfterSerializer(item["runAfter"]),
    waitBefore: item["waitBefore"],
    timeout: item["timeout"],
    externalResource: !item["externalResource"]
      ? item["externalResource"]
      : externalResourceSerializer(item["externalResource"]),
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
    runAfter: !item["runAfter"] ? item["runAfter"] : runAfterDeserializer(item["runAfter"]),
    waitBefore: item["waitBefore"],
    timeout: item["timeout"],
    externalResource: !item["externalResource"]
      ? item["externalResource"]
      : externalResourceDeserializer(item["externalResource"]),
  };
}

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
  /** The scenario run status. */
  readonly status: ScenarioRunState;
  /** All resources discovered for the scenario run. */
  readonly resources: ScenarioRunResource[];
  /** System or infrastructure errors encountered during the scenario run. */
  readonly errors?: OperationError[];
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
    status: item["status"],
    resources: scenarioRunResourceArrayDeserializer(item["resources"]),
    errors: !item["errors"] ? item["errors"] : operationErrorArrayDeserializer(item["errors"]),
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
  readonly errorCode: number;
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
  /** The resources associated with the specified action. */
  readonly resources: ScenarioRunResource[];
  /** The urn for the given chaos action. */
  readonly actionUrn: string;
  /** The state of the action. */
  readonly state: ScenarioSummaryState;
  /** When the action was started. */
  readonly startedAt?: Date;
  /** When the action was completed. */
  readonly completedAt?: Date;
}

export function scenarioRunSummaryActionDeserializer(item: any): ScenarioRunSummaryAction {
  return {
    resources: scenarioRunResourceArrayDeserializer(item["resources"]),
    actionUrn: item["actionUrn"],
    state: item["state"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
  };
}

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
  /** Exclusion criteria for protecting resources from fault injection. */
  exclusions?: ConfigurationExclusions;
  /** Most recent provisioning state for the given scenario resource. */
  readonly provisioningState?: ProvisioningState;
  /** Filter criteria used to constrain which discovered resources participate in fault injection. */
  filters?: ConfigurationFilters;
}

export function scenarioConfigurationPropertiesSerializer(
  item: ScenarioConfigurationProperties,
): any {
  return {
    scenarioId: item["scenarioId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : keyValuePairArraySerializer(item["parameters"]),
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : configurationExclusionsSerializer(item["exclusions"]),
    filters: !item["filters"] ? item["filters"] : configurationFiltersSerializer(item["filters"]),
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
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : configurationExclusionsDeserializer(item["exclusions"]),
    provisioningState: item["provisioningState"],
    filters: !item["filters"] ? item["filters"] : configurationFiltersDeserializer(item["filters"]),
  };
}

/**
 * Model that represents exclusion criteria for protecting resources from fault injection.
 * Uses union (OR) logic - a resource is excluded if it matches ANY criteria.
 */
export interface ConfigurationExclusions {
  /** Array of specific resource IDs to exclude from fault injection. */
  resources?: string[];
  /** Array of tag key-value pairs. Resources with matching tags are excluded. */
  tags?: KeyValuePair[];
  /** Array of resource types. All resources of these types are excluded. */
  types?: string[];
}

export function configurationExclusionsSerializer(item: ConfigurationExclusions): any {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    tags: !item["tags"] ? item["tags"] : keyValuePairArraySerializer(item["tags"]),
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
  };
}

export function configurationExclusionsDeserializer(item: any): ConfigurationExclusions {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    tags: !item["tags"] ? item["tags"] : keyValuePairArrayDeserializer(item["tags"]),
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * Model that represents filter criteria for constraining which discovered
 * resources participate in fault injection.
 *
 * Uses intersection (AND) logic — a resource is included only if it matches all criteria.
 */
export interface ConfigurationFilters {
  /**
   * Array of Azure location strings. Only resources in these locations are included.
   *
   * Null or omitted means all locations (no filter). Empty array means include nothing.
   */
  locations?: string[];
  /**
   * Array of availability zone identifiers ("1", "2", "3", "zone-redundant").
   * Only resources whose zones intersect this list are included.
   *
   * Null or omitted means all zones (including non-zonal). Empty array means include nothing.
   *
   * Mutually exclusive with `physicalZones` — set one or the other, not both.
   */
  zones?: string[];
  /**
   * Array of physical availability zone identifiers in `{region}-az{N}` format
   * (e.g., `"westus2-az1"`). Only resources in the corresponding logical zone
   * for each subscription are included.
   *
   * At execution time, each physical zone is resolved to per-subscription
   * logical zones via the Azure locations API. The resolved mapping is surfaced
   * on the scenario run response (`zoneResolution`).
   *
   * Null or omitted means physical zone targeting is not used.
   * Only one physical zone is supported in preview.
   *
   * Mutually exclusive with `zones` — set one or the other, not both.
   */
  physicalZones?: string[];
}

export function configurationFiltersSerializer(item: ConfigurationFilters): any {
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
  };
}

export function configurationFiltersDeserializer(item: any): ConfigurationFilters {
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01 API version. */
  V20250101 = "2025-01-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}
