// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
    tags: item["tags"],
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
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
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
}

export function experimentPropertiesSerializer(item: ExperimentProperties): any {
  return {
    steps: chaosExperimentStepArraySerializer(item["steps"]),
    selectors: chaosTargetSelectorUnionArraySerializer(item["selectors"]),
  };
}

export function experimentPropertiesDeserializer(item: any): ExperimentProperties {
  return {
    provisioningState: item["provisioningState"],
    steps: chaosExperimentStepArrayDeserializer(item["steps"]),
    selectors: chaosTargetSelectorUnionArrayDeserializer(item["selectors"]),
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
 * **Deleting**: Deletion in progress.
 */
export type ProvisioningState = string;

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
  return {
    name: item["name"],
    branches: chaosExperimentBranchArraySerializer(item["branches"]),
  };
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
  switch (item.type) {
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
  Delay = "delay",
  Discrete = "discrete",
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

/** A map to describe the settings of an action. */
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
  switch (item.type) {
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
  switch (item.type) {
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
    tags: item["tags"],
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
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
}

export function experimentExecutionPropertiesDeserializer(
  item: any,
): ExperimentExecutionProperties {
  return {
    status: item["status"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    stoppedAt: !item["stoppedAt"] ? item["stoppedAt"] : new Date(item["stoppedAt"]),
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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
}

export function capabilityPropertiesSerializer(item: CapabilityProperties): any {
  return item;
}

export function capabilityPropertiesDeserializer(item: any): CapabilityProperties {
  return {
    publisher: item["publisher"],
    targetType: item["targetType"],
    description: item["description"],
    parametersSchema: item["parametersSchema"],
    urn: item["urn"],
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
    properties: item["properties"],
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01 API version. */
  V20250101 = "2025-01-01",
}
