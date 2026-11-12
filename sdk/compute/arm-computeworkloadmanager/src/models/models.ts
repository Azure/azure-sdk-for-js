// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** A regional governance and lifecycle boundary for composed runtimes. */
export interface WorkloadSpace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkloadSpaceProperties;
}

export function workloadSpaceSerializer(item: WorkloadSpace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workloadSpacePropertiesSerializer(item["properties"]),
  };
}

export function workloadSpaceDeserializer(item: any): WorkloadSpace {
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
      : workloadSpacePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a workload space. */
export interface WorkloadSpaceProperties {
  /** The provisioning state of the workload space. */
  readonly provisioningState?: ProvisioningState;
}

export function workloadSpacePropertiesSerializer(_item: WorkloadSpaceProperties): any {
  return {};
}

export function workloadSpacePropertiesDeserializer(item: any): WorkloadSpaceProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of a Workload Manager resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The request has been accepted for processing. */
  Accepted = "Accepted",
  /** The resource is being provisioned. */
  Provisioning = "Provisioning",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of a Workload Manager resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: The request has been accepted for processing. \
 * **Provisioning**: The resource is being provisioned. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted.
 */
export type ProvisioningState = string;

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

/** Mutable properties of a workload space. */
export interface WorkloadSpaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function workloadSpaceUpdateSerializer(item: WorkloadSpaceUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a WorkloadSpace list operation. */
export interface _WorkloadSpaceListResult {
  /** The WorkloadSpace items on this page */
  value: WorkloadSpace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workloadSpaceListResultDeserializer(item: any): _WorkloadSpaceListResult {
  return {
    value: workloadSpaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadSpaceArraySerializer(result: Array<WorkloadSpace>): any[] {
  return result.map((item) => {
    return workloadSpaceSerializer(item);
  });
}

export function workloadSpaceArrayDeserializer(result: Array<WorkloadSpace>): any[] {
  return result.map((item) => {
    return workloadSpaceDeserializer(item);
  });
}

/** A runtime participant in a workload space. */
export interface RuntimeBinding extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: RuntimeBindingPropertiesUnion;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: RuntimeBindingKind;
}

export function runtimeBindingSerializer(item: RuntimeBinding): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : runtimeBindingPropertiesUnionSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function runtimeBindingDeserializer(item: any): RuntimeBinding {
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
      : runtimeBindingPropertiesUnionDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Common properties of managed and referenced runtime bindings. */
export interface RuntimeBindingProperties {
  /** The provisioning state of the runtime binding. */
  readonly provisioningState?: ProvisioningState;
  /** The provider resource created or referenced by the binding. */
  readonly providerResourceId?: string;
  /** Indicates whether Workload Manager owns or references the runtime. */
  /** The discriminator possible values: Managed, Referenced */
  provisioningMode: RuntimeBindingProvisioningMode;
  /** The runtime identity configuration for a managed runtime. */
  identityProfile?: RuntimeIdentityProfile;
  /** The runtime network configuration for a managed runtime. */
  networkProfile?: RuntimeNetworkProfile;
}

export function runtimeBindingPropertiesSerializer(item: RuntimeBindingProperties): any {
  return {
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileSerializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileSerializer(item["networkProfile"]),
  };
}

export function runtimeBindingPropertiesDeserializer(item: any): RuntimeBindingProperties {
  return {
    provisioningState: item["provisioningState"],
    providerResourceId: item["providerResourceId"],
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileDeserializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileDeserializer(item["networkProfile"]),
  };
}

/** Alias for RuntimeBindingPropertiesUnion */
export type RuntimeBindingPropertiesUnion =
  ManagedRuntimeBindingProperties | ReferencedRuntimeBindingProperties | RuntimeBindingProperties;

export function runtimeBindingPropertiesUnionSerializer(item: RuntimeBindingPropertiesUnion): any {
  switch (item.provisioningMode) {
    case "Managed":
      return managedRuntimeBindingPropertiesSerializer(item as ManagedRuntimeBindingProperties);

    case "Referenced":
      return referencedRuntimeBindingPropertiesSerializer(
        item as ReferencedRuntimeBindingProperties,
      );

    default:
      return runtimeBindingPropertiesSerializer(item);
  }
}

export function runtimeBindingPropertiesUnionDeserializer(
  item: any,
): RuntimeBindingPropertiesUnion {
  switch (item["provisioningMode"]) {
    case "Managed":
      return managedRuntimeBindingPropertiesDeserializer(item as ManagedRuntimeBindingProperties);

    case "Referenced":
      return referencedRuntimeBindingPropertiesDeserializer(
        item as ReferencedRuntimeBindingProperties,
      );

    default:
      return runtimeBindingPropertiesDeserializer(item);
  }
}

/** The ownership mode for a runtime binding. */
export enum KnownRuntimeBindingProvisioningMode {
  /** Workload Manager creates and owns the provider resource. */
  Managed = "Managed",
  /** Workload Manager attaches an existing customer-owned resource. */
  Referenced = "Referenced",
}

/**
 * The ownership mode for a runtime binding. \
 * {@link KnownRuntimeBindingProvisioningMode} can be used interchangeably with RuntimeBindingProvisioningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Workload Manager creates and owns the provider resource. \
 * **Referenced**: Workload Manager attaches an existing customer-owned resource.
 */
export type RuntimeBindingProvisioningMode = string;

/** Identity configuration for a managed runtime. */
export interface RuntimeIdentityProfile {
  /** The identity made available to the execution runtime. */
  executionIdentity?: ExecutionIdentityUnion;
}

export function runtimeIdentityProfileSerializer(item: RuntimeIdentityProfile): any {
  return {
    executionIdentity: !item["executionIdentity"]
      ? item["executionIdentity"]
      : executionIdentityUnionSerializer(item["executionIdentity"]),
  };
}

export function runtimeIdentityProfileDeserializer(item: any): RuntimeIdentityProfile {
  return {
    executionIdentity: !item["executionIdentity"]
      ? item["executionIdentity"]
      : executionIdentityUnionDeserializer(item["executionIdentity"]),
  };
}

/** Configuration for an identity used by an execution runtime. */
export interface ExecutionIdentity {
  /** Indicates whether the identity is managed by the service or supplied by the customer. */
  /** The discriminator possible values: Referenced, ServiceManaged */
  provisioningMode: ExecutionIdentityProvisioningMode;
  /** The execution boundary across which the identity is shared. */
  scope: ExecutionIdentityScope;
}

export function executionIdentitySerializer(item: ExecutionIdentity): any {
  return { provisioningMode: item["provisioningMode"], scope: item["scope"] };
}

export function executionIdentityDeserializer(item: any): ExecutionIdentity {
  return {
    provisioningMode: item["provisioningMode"],
    scope: item["scope"],
  };
}

/** Alias for ExecutionIdentityUnion */
export type ExecutionIdentityUnion =
  ReferencedExecutionIdentity | ServiceManagedExecutionIdentity | ExecutionIdentity;

export function executionIdentityUnionSerializer(item: ExecutionIdentityUnion): any {
  switch (item.provisioningMode) {
    case "Referenced":
      return referencedExecutionIdentitySerializer(item as ReferencedExecutionIdentity);

    case "ServiceManaged":
      return serviceManagedExecutionIdentitySerializer(item as ServiceManagedExecutionIdentity);

    default:
      return executionIdentitySerializer(item);
  }
}

export function executionIdentityUnionDeserializer(item: any): ExecutionIdentityUnion {
  switch (item["provisioningMode"]) {
    case "Referenced":
      return referencedExecutionIdentityDeserializer(item as ReferencedExecutionIdentity);

    case "ServiceManaged":
      return serviceManagedExecutionIdentityDeserializer(item as ServiceManagedExecutionIdentity);

    default:
      return executionIdentityDeserializer(item);
  }
}

/** The provisioning mode for an execution identity. */
export enum KnownExecutionIdentityProvisioningMode {
  /** Uses a customer-provided identity. */
  Referenced = "Referenced",
  /** Workload Manager creates and owns the identity. */
  ServiceManaged = "ServiceManaged",
}

/**
 * The provisioning mode for an execution identity. \
 * {@link KnownExecutionIdentityProvisioningMode} can be used interchangeably with ExecutionIdentityProvisioningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Referenced**: Uses a customer-provided identity. \
 * **ServiceManaged**: Workload Manager creates and owns the identity.
 */
export type ExecutionIdentityProvisioningMode = string;

/** The scope at which an execution identity is shared. */
export enum KnownExecutionIdentityScope {
  /** The identity is shared by sandboxes in the execution group. */
  SandboxGroup = "SandboxGroup",
}

/**
 * The scope at which an execution identity is shared. \
 * {@link KnownExecutionIdentityScope} can be used interchangeably with ExecutionIdentityScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SandboxGroup**: The identity is shared by sandboxes in the execution group.
 */
export type ExecutionIdentityScope = string;

/** A customer-provided identity used by an execution runtime. */
export interface ReferencedExecutionIdentity extends ExecutionIdentity {
  /** Indicates that the customer supplies the identity. */
  provisioningMode: "Referenced";
  /** The customer-provided user-assigned identity. */
  userAssignedIdentityResourceId: string;
}

export function referencedExecutionIdentitySerializer(item: ReferencedExecutionIdentity): any {
  return {
    provisioningMode: item["provisioningMode"],
    scope: item["scope"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function referencedExecutionIdentityDeserializer(item: any): ReferencedExecutionIdentity {
  return {
    provisioningMode: item["provisioningMode"],
    scope: item["scope"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** An identity created and owned by Workload Manager. */
export interface ServiceManagedExecutionIdentity extends ExecutionIdentity {
  /** Indicates that Workload Manager creates and owns the identity. */
  provisioningMode: "ServiceManaged";
  /** The service-created user-assigned identity. */
  readonly userAssignedIdentityResourceId?: string;
}

export function serviceManagedExecutionIdentitySerializer(
  item: ServiceManagedExecutionIdentity,
): any {
  return { provisioningMode: item["provisioningMode"], scope: item["scope"] };
}

export function serviceManagedExecutionIdentityDeserializer(
  item: any,
): ServiceManagedExecutionIdentity {
  return {
    provisioningMode: item["provisioningMode"],
    scope: item["scope"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** Network configuration for a managed runtime. */
export interface RuntimeNetworkProfile {
  /** The customer-provided subnet used by the runtime. */
  subnetResourceId?: string;
  /** Indicates who manages runtime egress. */
  egressMode?: EgressMode;
}

export function runtimeNetworkProfileSerializer(item: RuntimeNetworkProfile): any {
  return { subnetResourceId: item["subnetResourceId"], egressMode: item["egressMode"] };
}

export function runtimeNetworkProfileDeserializer(item: any): RuntimeNetworkProfile {
  return {
    subnetResourceId: item["subnetResourceId"],
    egressMode: item["egressMode"],
  };
}

/** The egress ownership mode for a managed runtime. */
export enum KnownEgressMode {
  /** The customer supplies and manages the egress configuration. */
  CustomerManaged = "CustomerManaged",
}

/**
 * The egress ownership mode for a managed runtime. \
 * {@link KnownEgressMode} can be used interchangeably with EgressMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomerManaged**: The customer supplies and manages the egress configuration.
 */
export type EgressMode = string;

/** Properties of a runtime provisioned and owned by Workload Manager. */
export interface ManagedRuntimeBindingProperties extends RuntimeBindingProperties {
  /** Indicates that Workload Manager owns the runtime. */
  provisioningMode: "Managed";
  /** The limited service-managed runtime configuration. */
  managedProfile: ManagedRuntimeProfile;
}

export function managedRuntimeBindingPropertiesSerializer(
  item: ManagedRuntimeBindingProperties,
): any {
  return {
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileSerializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileSerializer(item["networkProfile"]),
    managedProfile: managedRuntimeProfileSerializer(item["managedProfile"]),
  };
}

export function managedRuntimeBindingPropertiesDeserializer(
  item: any,
): ManagedRuntimeBindingProperties {
  return {
    provisioningState: item["provisioningState"],
    providerResourceId: item["providerResourceId"],
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileDeserializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileDeserializer(item["networkProfile"]),
    managedProfile: managedRuntimeProfileDeserializer(item["managedProfile"]),
  };
}

/** Customer-selected configuration for a service-managed runtime. */
export interface ManagedRuntimeProfile {
  /** The required product offering when the runtime binding kind is Kubernetes. */
  offering?: string;
  /** The required provider when the runtime binding kind is ServerlessContainers. */
  provider?: string;
}

export function managedRuntimeProfileSerializer(item: ManagedRuntimeProfile): any {
  return { offering: item["offering"], provider: item["provider"] };
}

export function managedRuntimeProfileDeserializer(item: any): ManagedRuntimeProfile {
  return {
    offering: item["offering"],
    provider: item["provider"],
  };
}

/** Properties of a customer-owned runtime attached to a workload space. */
export interface ReferencedRuntimeBindingProperties extends RuntimeBindingProperties {
  /** Indicates that the runtime is customer-owned. */
  provisioningMode: "Referenced";
  /** The existing customer-owned runtime resource. */
  resourceId: string;
}

export function referencedRuntimeBindingPropertiesSerializer(
  item: ReferencedRuntimeBindingProperties,
): any {
  return {
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileSerializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileSerializer(item["networkProfile"]),
    resourceId: item["resourceId"],
  };
}

export function referencedRuntimeBindingPropertiesDeserializer(
  item: any,
): ReferencedRuntimeBindingProperties {
  return {
    provisioningState: item["provisioningState"],
    providerResourceId: item["providerResourceId"],
    provisioningMode: item["provisioningMode"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileDeserializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileDeserializer(item["networkProfile"]),
    resourceId: item["resourceId"],
  };
}

/** The runtime technology represented by a binding. */
export enum KnownRuntimeBindingKind {
  /** A Kubernetes orchestration runtime. */
  Kubernetes = "Kubernetes",
  /** A serverless container execution runtime. */
  ServerlessContainers = "ServerlessContainers",
}

/**
 * The runtime technology represented by a binding. \
 * {@link KnownRuntimeBindingKind} can be used interchangeably with RuntimeBindingKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Kubernetes**: A Kubernetes orchestration runtime. \
 * **ServerlessContainers**: A serverless container execution runtime.
 */
export type RuntimeBindingKind = string;

/** Mutable properties of a runtime binding. */
export interface RuntimeBindingUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: RuntimeBindingUpdateProperties;
}

export function runtimeBindingUpdateSerializer(item: RuntimeBindingUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : runtimeBindingUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the RuntimeBinding. */
export interface RuntimeBindingUpdateProperties {
  /** The runtime identity configuration. */
  identityProfile?: RuntimeIdentityProfileUpdate;
  /** The runtime network configuration. */
  networkProfile?: RuntimeNetworkProfile;
}

export function runtimeBindingUpdatePropertiesSerializer(
  item: RuntimeBindingUpdateProperties,
): any {
  return {
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : runtimeIdentityProfileUpdateSerializer(item["identityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : runtimeNetworkProfileSerializer(item["networkProfile"]),
  };
}

/** Identity configuration that may be updated for a managed runtime. */
export interface RuntimeIdentityProfileUpdate {
  /** The identity made available to the execution runtime. */
  executionIdentity?: ExecutionIdentityUpdate;
}

export function runtimeIdentityProfileUpdateSerializer(item: RuntimeIdentityProfileUpdate): any {
  return {
    executionIdentity: !item["executionIdentity"]
      ? item["executionIdentity"]
      : executionIdentityUpdateSerializer(item["executionIdentity"]),
  };
}

/** Execution identity configuration that may be updated. */
export interface ExecutionIdentityUpdate {
  /** The execution boundary across which the identity is shared. */
  scope?: ExecutionIdentityScope;
}

export function executionIdentityUpdateSerializer(item: ExecutionIdentityUpdate): any {
  return { scope: item["scope"] };
}

/** The response of a RuntimeBinding list operation. */
export interface _RuntimeBindingListResult {
  /** The RuntimeBinding items on this page */
  value: RuntimeBinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _runtimeBindingListResultDeserializer(item: any): _RuntimeBindingListResult {
  return {
    value: runtimeBindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runtimeBindingArraySerializer(result: Array<RuntimeBinding>): any[] {
  return result.map((item) => {
    return runtimeBindingSerializer(item);
  });
}

export function runtimeBindingArrayDeserializer(result: Array<RuntimeBinding>): any[] {
  return result.map((item) => {
    return runtimeBindingDeserializer(item);
  });
}

/** A relationship between an orchestrator runtime and an optional execution runtime. */
export interface RuntimeLink extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: RuntimeLinkProperties;
}

export function runtimeLinkSerializer(item: RuntimeLink): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : runtimeLinkPropertiesSerializer(item["properties"]),
  };
}

export function runtimeLinkDeserializer(item: any): RuntimeLink {
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
      : runtimeLinkPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a relationship between runtime bindings. */
export interface RuntimeLinkProperties {
  /** The sibling runtime binding that provides orchestration. */
  orchestratorBindingResourceId: string;
  /** The optional sibling runtime binding that provides execution. */
  executionBindingResourceId?: string;
  /** The provider integration identity configuration. */
  integrationProfile?: RuntimeLinkIntegrationProfile;
  /** The mutable capacity policy for the runtime composition. */
  capacityProfile?: CapacityProfile;
  /** The provisioning state of the runtime link. */
  readonly provisioningState?: ProvisioningState;
  /** The provider resource that realizes the runtime composition. */
  readonly providerResourceId?: string;
}

export function runtimeLinkPropertiesSerializer(item: RuntimeLinkProperties): any {
  return {
    orchestratorBindingResourceId: item["orchestratorBindingResourceId"],
    executionBindingResourceId: item["executionBindingResourceId"],
    integrationProfile: !item["integrationProfile"]
      ? item["integrationProfile"]
      : runtimeLinkIntegrationProfileSerializer(item["integrationProfile"]),
    capacityProfile: !item["capacityProfile"]
      ? item["capacityProfile"]
      : capacityProfileSerializer(item["capacityProfile"]),
  };
}

export function runtimeLinkPropertiesDeserializer(item: any): RuntimeLinkProperties {
  return {
    orchestratorBindingResourceId: item["orchestratorBindingResourceId"],
    executionBindingResourceId: item["executionBindingResourceId"],
    integrationProfile: !item["integrationProfile"]
      ? item["integrationProfile"]
      : runtimeLinkIntegrationProfileDeserializer(item["integrationProfile"]),
    capacityProfile: !item["capacityProfile"]
      ? item["capacityProfile"]
      : capacityProfileDeserializer(item["capacityProfile"]),
    provisioningState: item["provisioningState"],
    providerResourceId: item["providerResourceId"],
  };
}

/** Identity configuration used to integrate runtime bindings. */
export interface RuntimeLinkIntegrationProfile {
  /** The user-assigned identity used by the provider integration. */
  managedIdentityResourceId?: string;
}

export function runtimeLinkIntegrationProfileSerializer(item: RuntimeLinkIntegrationProfile): any {
  return { managedIdentityResourceId: item["managedIdentityResourceId"] };
}

export function runtimeLinkIntegrationProfileDeserializer(
  item: any,
): RuntimeLinkIntegrationProfile {
  return {
    managedIdentityResourceId: item["managedIdentityResourceId"],
  };
}

/** Capacity policy for the runtime composition. */
export interface CapacityProfile {
  /** The minimum number of execution nodes. */
  minimumNodes: number;
  /** The maximum number of execution nodes. */
  maximumNodes: number;
}

export function capacityProfileSerializer(item: CapacityProfile): any {
  return { minimumNodes: item["minimumNodes"], maximumNodes: item["maximumNodes"] };
}

export function capacityProfileDeserializer(item: any): CapacityProfile {
  return {
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
  };
}

/** Mutable properties of a runtime link. */
export interface RuntimeLinkUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: RuntimeLinkUpdateProperties;
}

export function runtimeLinkUpdateSerializer(item: RuntimeLinkUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : runtimeLinkUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the RuntimeLink. */
export interface RuntimeLinkUpdateProperties {
  /** The mutable capacity policy for the runtime composition. */
  capacityProfile?: CapacityProfileUpdate;
}

export function runtimeLinkUpdatePropertiesSerializer(item: RuntimeLinkUpdateProperties): any {
  return {
    capacityProfile: !item["capacityProfile"]
      ? item["capacityProfile"]
      : capacityProfileUpdateSerializer(item["capacityProfile"]),
  };
}

/** Capacity policy values that may be updated for the runtime composition. */
export interface CapacityProfileUpdate {
  /** The minimum number of execution nodes. */
  minimumNodes?: number;
  /** The maximum number of execution nodes. */
  maximumNodes?: number;
}

export function capacityProfileUpdateSerializer(item: CapacityProfileUpdate): any {
  return { minimumNodes: item["minimumNodes"], maximumNodes: item["maximumNodes"] };
}

/** The response of a RuntimeLink list operation. */
export interface _RuntimeLinkListResult {
  /** The RuntimeLink items on this page */
  value: RuntimeLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _runtimeLinkListResultDeserializer(item: any): _RuntimeLinkListResult {
  return {
    value: runtimeLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runtimeLinkArraySerializer(result: Array<RuntimeLink>): any[] {
  return result.map((item) => {
    return runtimeLinkSerializer(item);
  });
}

export function runtimeLinkArrayDeserializer(result: Array<RuntimeLink>): any[] {
  return result.map((item) => {
    return runtimeLinkDeserializer(item);
  });
}

/** A capability enabled for a workload space. */
export interface Capability extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CapabilityProperties;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: CapabilityKind;
}

export function capabilitySerializer(item: Capability): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : capabilityPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function capabilityDeserializer(item: any): Capability {
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
      : capabilityPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Properties of a capability enabled for a workload space. */
export interface CapabilityProperties {
  /** The version selection policy for the capability. */
  versionPolicy: VersionPolicy;
  /** The effective capability version selected by the service. */
  readonly effectiveVersion?: string;
  /** The provisioning state of the capability. */
  readonly provisioningState?: ProvisioningState;
}

export function capabilityPropertiesSerializer(item: CapabilityProperties): any {
  return { versionPolicy: item["versionPolicy"] };
}

export function capabilityPropertiesDeserializer(item: any): CapabilityProperties {
  return {
    versionPolicy: item["versionPolicy"],
    effectiveVersion: item["effectiveVersion"],
    provisioningState: item["provisioningState"],
  };
}

/** The version selection policy for a capability. */
export enum KnownVersionPolicy {
  /** Workload Manager selects and upgrades the capability version. */
  ServiceManaged = "ServiceManaged",
}

/**
 * The version selection policy for a capability. \
 * {@link KnownVersionPolicy} can be used interchangeably with VersionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceManaged**: Workload Manager selects and upgrades the capability version.
 */
export type VersionPolicy = string;

/** The capability enabled for a workload space. */
export enum KnownCapabilityKind {
  /** Enables isolated agent sandbox execution. */
  AgentSandbox = "AgentSandbox",
}

/**
 * The capability enabled for a workload space. \
 * {@link KnownCapabilityKind} can be used interchangeably with CapabilityKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AgentSandbox**: Enables isolated agent sandbox execution.
 */
export type CapabilityKind = string;

/** Mutable properties of a capability. */
export interface CapabilityUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CapabilityUpdateProperties;
}

export function capabilityUpdateSerializer(item: CapabilityUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : capabilityUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Capability. */
export interface CapabilityUpdateProperties {
  /** The version selection policy for the capability. */
  versionPolicy?: VersionPolicy;
}

export function capabilityUpdatePropertiesSerializer(item: CapabilityUpdateProperties): any {
  return { versionPolicy: item["versionPolicy"] };
}

/** The response of a Capability list operation. */
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-11-01-preview API version. */
  V20261101Preview = "2026-11-01-preview",
}
