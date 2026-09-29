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

/** Class representing a Private Traffic Manager endpoint. */
export interface Endpoint extends ProxyResource {
  /** The properties of the Private Traffic Manager endpoint. */
  properties?: EndpointProperties;
}

export function endpointSerializer(item: Endpoint): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : endpointPropertiesSerializer(item["properties"]),
  };
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : endpointPropertiesDeserializer(item["properties"]),
  };
}

/** Class representing a Traffic Manager endpoint properties. */
export interface EndpointProperties {
  /** The fully-qualified DNS name or IP address of the endpoint. Traffic Manager returns this value in DNS responses to direct traffic to this endpoint. */
  target: string;
  /** Monitoring target is where Private Traffic Manager will gather health information.If MonitoringTarget is not configured EndpointTarget will be used instead. If the EndpointTarget is IPv6 then the Monitoring Target MUST be configured. Monitoring Target cannot be an IPv6 address. */
  monitoringTarget?: string;
  /** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
  endpointStatus?: AdministrativeStatus;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: EndpointsKind;
  /** The weight of this endpoint when using the 'Weighted' traffic routing method. Possible values are from 1 to 1000. */
  weight?: number;
  /** The priority of this endpoint when using the 'Priority' traffic routing method. Possible values are from 1 to 1000, lower values represent higher priority. This is an optional parameter.  If specified, it must be specified on all endpoints, and no two endpoints can share the same priority value. */
  priority?: number;
  /** Indicates whether endpoint is Always Serve or not. Always Serve endpoints are always considered to be healthy. */
  alwaysServe?: AlwaysServe;
  /** The health policy associated with this endpoint. */
  healthPolicyId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function endpointPropertiesSerializer(item: EndpointProperties): any {
  return {
    target: item["target"],
    monitoringTarget: item["monitoringTarget"],
    endpointStatus: item["endpointStatus"],
    kind: item["kind"],
    weight: item["weight"],
    priority: item["priority"],
    alwaysServe: item["alwaysServe"],
    healthPolicyId: item["healthPolicyId"],
  };
}

export function endpointPropertiesDeserializer(item: any): EndpointProperties {
  return {
    target: item["target"],
    monitoringTarget: item["monitoringTarget"],
    endpointStatus: item["endpointStatus"],
    kind: item["kind"],
    weight: item["weight"],
    priority: item["priority"],
    alwaysServe: item["alwaysServe"],
    healthPolicyId: item["healthPolicyId"],
    provisioningState: item["provisioningState"],
  };
}

/** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
export enum KnownAdministrativeStatus {
  /** The endpoint is enabled and is probed for health. */
  Enabled = "Enabled",
  /** The endpoint is disabled and is not probed for health. */
  Disabled = "Disabled",
}

/**
 * The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. \
 * {@link KnownAdministrativeStatus} can be used interchangeably with AdministrativeStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The endpoint is enabled and is probed for health. \
 * **Disabled**: The endpoint is disabled and is not probed for health.
 */
export type AdministrativeStatus = string;

/** Class representing the kind of the Private Traffic Manager endpoint. */
export enum KnownEndpointsKind {
  /** Private Traffic Manager Endpoint */
  Endpoint = "Endpoint",
}

/**
 * Class representing the kind of the Private Traffic Manager endpoint. \
 * {@link KnownEndpointsKind} can be used interchangeably with EndpointsKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Endpoint**: Private Traffic Manager Endpoint
 */
export type EndpointsKind = string;

/** If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. */
export enum KnownAlwaysServe {
  /** Always serve is enabled, endpoint health probing is disabled. */
  Enabled = "Enabled",
  /** Always serve is disabled, endpoint health probing is active. */
  Disabled = "Disabled",
}

/**
 * If Always Serve is enabled, probing for endpoint health will be disabled and endpoints will be included in the traffic routing method. \
 * {@link KnownAlwaysServe} can be used interchangeably with AlwaysServe,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Always serve is enabled, endpoint health probing is disabled. \
 * **Disabled**: Always serve is disabled, endpoint health probing is active.
 */
export type AlwaysServe = string;

/** The provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned. */
  Provisioning = "Provisioning",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The resource provisioning request has been accepted. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted. \
 * **Accepted**: The resource provisioning request has been accepted.
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

/** The type used for update operations of the Endpoint. */
export interface EndpointUpdate {
  /** The resource-specific properties for this resource. */
  properties?: EndpointUpdateProperties;
}

export function endpointUpdateSerializer(item: EndpointUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : endpointUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Endpoint. */
export interface EndpointUpdateProperties {
  /** The fully-qualified DNS name or IP address of the endpoint. Traffic Manager returns this value in DNS responses to direct traffic to this endpoint. */
  target?: string;
  /** Monitoring target is where Private Traffic Manager will gather health information.If MonitoringTarget is not configured EndpointTarget will be used instead. If the EndpointTarget is IPv6 then the Monitoring Target MUST be configured. Monitoring Target cannot be an IPv6 address. */
  monitoringTarget?: string;
  /** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
  endpointStatus?: AdministrativeStatus;
  /** The weight of this endpoint when using the 'Weighted' traffic routing method. Possible values are from 1 to 1000. */
  weight?: number;
  /** The priority of this endpoint when using the 'Priority' traffic routing method. Possible values are from 1 to 1000, lower values represent higher priority. This is an optional parameter.  If specified, it must be specified on all endpoints, and no two endpoints can share the same priority value. */
  priority?: number;
  /** Indicates whether endpoint is Always Serve or not. Always Serve endpoints are always considered to be healthy. */
  alwaysServe?: AlwaysServe;
  /** The health policy associated with this endpoint. */
  healthPolicyId?: string;
}

export function endpointUpdatePropertiesSerializer(item: EndpointUpdateProperties): any {
  return {
    target: item["target"],
    monitoringTarget: item["monitoringTarget"],
    endpointStatus: item["endpointStatus"],
    weight: item["weight"],
    priority: item["priority"],
    alwaysServe: item["alwaysServe"],
    healthPolicyId: item["healthPolicyId"],
  };
}

/** The response of a Endpoint list operation. */
export interface _EndpointListResult {
  /** The Endpoint items on this page */
  value: Endpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointListResultDeserializer(item: any): _EndpointListResult {
  return {
    value: endpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointArraySerializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointSerializer(item);
  });
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** Class representing a Traffic Manager health policy. */
export interface HealthPolicy extends ProxyResource {
  /** The properties of the Traffic Manager health policy. */
  properties?: HealthPolicyProperties;
  /** The kind of the Traffic Manager health policy. */
  /** The discriminator possible values: Probe */
  kind?: HealthPolicyKind;
}

export function healthPolicySerializer(item: HealthPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : healthPolicyPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function healthPolicyDeserializer(item: any): HealthPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : healthPolicyPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
  };
}

/** Alias for HealthPolicyUnion */
export type HealthPolicyUnion = ProbeHealthPolicy | HealthPolicy;

export function healthPolicyUnionSerializer(item: HealthPolicyUnion): any {
  switch (item.kind) {
    case "Probe":
      return probeHealthPolicySerializer(item as ProbeHealthPolicy);

    default:
      return healthPolicySerializer(item);
  }
}

export function healthPolicyUnionDeserializer(item: any): HealthPolicyUnion {
  switch (item["kind"]) {
    case "Probe":
      return probeHealthPolicyDeserializer(item as ProbeHealthPolicy);

    default:
      return healthPolicyDeserializer(item);
  }
}

/** Class representing the health policy for Traffic Manager profile properties. */
export interface HealthPolicyProperties {
  /** Probe monitoring settings of the Traffic Manager profile. Only applicable when the parent health policy `kind` is `Probe`. */
  probeConfig?: ProbeConfig;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function healthPolicyPropertiesSerializer(item: HealthPolicyProperties): any {
  return {
    probeConfig: !item["probeConfig"]
      ? item["probeConfig"]
      : probeConfigSerializer(item["probeConfig"]),
  };
}

export function healthPolicyPropertiesDeserializer(item: any): HealthPolicyProperties {
  return {
    probeConfig: !item["probeConfig"]
      ? item["probeConfig"]
      : probeConfigDeserializer(item["probeConfig"]),
    provisioningState: item["provisioningState"],
  };
}

/** Class containing endpoint monitoring settings in a Traffic Manager profile. */
export interface ProbeConfig {
  /** The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. */
  protocol?: Protocol;
  /** The TCP port used to probe for endpoint health. */
  port?: number;
  /** The path relative to the endpoint domain name used to probe for endpoint health. */
  path?: string;
  /** The monitor interval for endpoints in this profile. This is the interval at which Traffic Manager will check the health of each endpoint in this profile. Allowed values: 10 or 30 seconds. */
  intervalInSeconds?: number;
  /** The monitor timeout for endpoints in this profile. This is the time that Traffic Manager allows endpoints in this profile to response to the health check. */
  timeoutInSeconds?: number;
  /** The number of consecutive failed health check that Traffic Manager tolerates before declaring an endpoint in this profile Degraded after the next failed health check. */
  toleratedNumberOfFailures?: number;
  /** List of custom headers. */
  customHeaders?: CustomHeader[];
  /** List of expected status code ranges. */
  expectedStatusCodeRanges?: ExpectedStatusCodeRange[];
}

export function probeConfigSerializer(item: ProbeConfig): any {
  return {
    protocol: item["protocol"],
    port: item["port"],
    path: item["path"],
    intervalInSeconds: item["intervalInSeconds"],
    timeoutInSeconds: item["timeoutInSeconds"],
    toleratedNumberOfFailures: item["toleratedNumberOfFailures"],
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : customHeaderArraySerializer(item["customHeaders"]),
    expectedStatusCodeRanges: !item["expectedStatusCodeRanges"]
      ? item["expectedStatusCodeRanges"]
      : expectedStatusCodeRangeArraySerializer(item["expectedStatusCodeRanges"]),
  };
}

export function probeConfigDeserializer(item: any): ProbeConfig {
  return {
    protocol: item["protocol"],
    port: item["port"],
    path: item["path"],
    intervalInSeconds: item["intervalInSeconds"],
    timeoutInSeconds: item["timeoutInSeconds"],
    toleratedNumberOfFailures: item["toleratedNumberOfFailures"],
    customHeaders: !item["customHeaders"]
      ? item["customHeaders"]
      : customHeaderArrayDeserializer(item["customHeaders"]),
    expectedStatusCodeRanges: !item["expectedStatusCodeRanges"]
      ? item["expectedStatusCodeRanges"]
      : expectedStatusCodeRangeArrayDeserializer(item["expectedStatusCodeRanges"]),
  };
}

/** The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. */
export enum KnownProtocol {
  /** Hypertext Transfer Protocol for health probing. */
  Http = "HTTP",
  /** Hypertext Transfer Protocol Secure for health probing. */
  Https = "HTTPS",
  /** Transmission Control Protocol for health probing. */
  TCP = "TCP",
}

/**
 * The protocol (HTTP, HTTPS or TCP) used to probe for endpoint health. \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HTTP**: Hypertext Transfer Protocol for health probing. \
 * **HTTPS**: Hypertext Transfer Protocol Secure for health probing. \
 * **TCP**: Transmission Control Protocol for health probing.
 */
export type Protocol = string;

export function customHeaderArraySerializer(result: Array<CustomHeader>): any[] {
  return result.map((item) => {
    return customHeaderSerializer(item);
  });
}

export function customHeaderArrayDeserializer(result: Array<CustomHeader>): any[] {
  return result.map((item) => {
    return customHeaderDeserializer(item);
  });
}

/** Custom header name and value. */
export interface CustomHeader {
  /** Header name. */
  name?: string;
  /** Header value. */
  value?: string;
}

export function customHeaderSerializer(item: CustomHeader): any {
  return { name: item["name"], value: item["value"] };
}

export function customHeaderDeserializer(item: any): CustomHeader {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function expectedStatusCodeRangeArraySerializer(
  result: Array<ExpectedStatusCodeRange>,
): any[] {
  return result.map((item) => {
    return expectedStatusCodeRangeSerializer(item);
  });
}

export function expectedStatusCodeRangeArrayDeserializer(
  result: Array<ExpectedStatusCodeRange>,
): any[] {
  return result.map((item) => {
    return expectedStatusCodeRangeDeserializer(item);
  });
}

/** Min and max value of a status code range. */
export interface ExpectedStatusCodeRange {
  /** Min status code. */
  min?: number;
  /** Max status code. */
  max?: number;
}

export function expectedStatusCodeRangeSerializer(item: ExpectedStatusCodeRange): any {
  return { min: item["min"], max: item["max"] };
}

export function expectedStatusCodeRangeDeserializer(item: any): ExpectedStatusCodeRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** Class representing kind of Traffic Manager health policy. */
export enum KnownHealthPolicyKind {
  /** Health policy that uses probing to monitor endpoint health. */
  Probe = "Probe",
}

/**
 * Class representing kind of Traffic Manager health policy. \
 * {@link KnownHealthPolicyKind} can be used interchangeably with HealthPolicyKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Probe**: Health policy that uses probing to monitor endpoint health.
 */
export type HealthPolicyKind = string;

/** Class representing a Traffic Manager health policy of kind Probe. */
export interface ProbeHealthPolicy extends HealthPolicy {
  kind: "Probe";
}

export function probeHealthPolicySerializer(item: ProbeHealthPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : healthPolicyPropertiesSerializer(item["properties"]),
    kind: item["kind"],
  };
}

export function probeHealthPolicyDeserializer(item: any): ProbeHealthPolicy {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : healthPolicyPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a HealthPolicy list operation. */
export interface _HealthPolicyListResult {
  /** The HealthPolicy items on this page */
  value: HealthPolicyUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _healthPolicyListResultDeserializer(item: any): _HealthPolicyListResult {
  return {
    value: healthPolicyUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthPolicyUnionArraySerializer(result: Array<HealthPolicyUnion>): any[] {
  return result.map((item) => {
    return healthPolicyUnionSerializer(item);
  });
}

export function healthPolicyUnionArrayDeserializer(result: Array<HealthPolicyUnion>): any[] {
  return result.map((item) => {
    return healthPolicyUnionDeserializer(item);
  });
}

/** Class representing a Private Traffic Manager profile. */
export interface PrivateTrafficManagerProfile extends TrackedResource {
  /** The properties of the Private Traffic Manager profile. */
  properties?: ProfileProperties;
}

export function privateTrafficManagerProfileSerializer(item: PrivateTrafficManagerProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : profilePropertiesSerializer(item["properties"]),
  };
}

export function privateTrafficManagerProfileDeserializer(item: any): PrivateTrafficManagerProfile {
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
      : profilePropertiesDeserializer(item["properties"]),
  };
}

/** Class representing the Traffic Manager profile properties. */
export interface ProfileProperties {
  /** The mode for custom topology map of the Private Traffic Manager profile. */
  customTopologyMapMode?: CustomTopologyMapMode;
  /** The DNS related configuration properties of the Private Traffic Manager */
  dnsConfig?: DnsConfig;
  /** The ARM resource ID of the topology map associated with this Private Traffic Manager profile. */
  topologyMapId?: string;
  /** The status of the Private Traffic Manager profile. */
  profileStatus?: ProfileStatus;
  /** The traffic routing method of the Private Traffic Manager profile. */
  trafficRoutingMethod?: TrafficRoutingMethod;
  /** The list of endpoints in the Private Traffic Manager profile. */
  endpoints?: ProfileEndpoint[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function profilePropertiesSerializer(item: ProfileProperties): any {
  return {
    customTopologyMapMode: item["customTopologyMapMode"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigSerializer(item["dnsConfig"]),
    topologyMapId: item["topologyMapId"],
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : profileEndpointArraySerializer(item["endpoints"]),
  };
}

export function profilePropertiesDeserializer(item: any): ProfileProperties {
  return {
    customTopologyMapMode: item["customTopologyMapMode"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigDeserializer(item["dnsConfig"]),
    topologyMapId: item["topologyMapId"],
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : profileEndpointArrayDeserializer(item["endpoints"]),
    provisioningState: item["provisioningState"],
  };
}

/** The mode for custom topology map of the Private Traffic Manager profile. */
export enum KnownCustomTopologyMapMode {
  /** Custom topology map is disabled. */
  Disabled = "Disabled",
  /** Custom topology map is enabled. */
  Enabled = "Enabled",
}

/**
 * The mode for custom topology map of the Private Traffic Manager profile. \
 * {@link KnownCustomTopologyMapMode} can be used interchangeably with CustomTopologyMapMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Custom topology map is disabled. \
 * **Enabled**: Custom topology map is enabled.
 */
export type CustomTopologyMapMode = string;

/** DNS configuration of the Traffic Manager profile. */
export interface DnsConfig {
  /** The record type of the Traffic Manager profile. */
  recordType?: RecordType;
  /** The TTL of the DNS records in seconds. */
  ttl?: number;
}

export function dnsConfigSerializer(item: DnsConfig): any {
  return { recordType: item["recordType"], ttl: item["ttl"] };
}

export function dnsConfigDeserializer(item: any): DnsConfig {
  return {
    recordType: item["recordType"],
    ttl: item["ttl"],
  };
}

/** The record type of the Traffic Manager profile. */
export enum KnownRecordType {
  /** IPv4 address record type for DNS resolution. */
  A = "A",
  /** IPv6 address record type for DNS resolution. */
  Aaaa = "AAAA",
  /** Canonical name record type that maps an alias to a domain name. */
  Cname = "CNAME",
}

/**
 * The record type of the Traffic Manager profile. \
 * {@link KnownRecordType} can be used interchangeably with RecordType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **A**: IPv4 address record type for DNS resolution. \
 * **AAAA**: IPv6 address record type for DNS resolution. \
 * **CNAME**: Canonical name record type that maps an alias to a domain name.
 */
export type RecordType = string;

/** The status of the Traffic Manager profile. */
export enum KnownProfileStatus {
  /** The profile is enabled and traffic routing is active. */
  Enabled = "Enabled",
  /** The profile is disabled and traffic routing is inactive. */
  Disabled = "Disabled",
}

/**
 * The status of the Traffic Manager profile. \
 * {@link KnownProfileStatus} can be used interchangeably with ProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The profile is enabled and traffic routing is active. \
 * **Disabled**: The profile is disabled and traffic routing is inactive.
 */
export type ProfileStatus = string;

/** The traffic routing method of the Traffic Manager profile. */
export enum KnownTrafficRoutingMethod {
  /** Routes traffic to endpoints based on priority values, directing to the highest priority available endpoint. */
  Priority = "Priority",
  /** Distributes traffic across endpoints based on assigned weight values. */
  Weighted = "Weighted",
}

/**
 * The traffic routing method of the Traffic Manager profile. \
 * {@link KnownTrafficRoutingMethod} can be used interchangeably with TrafficRoutingMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Priority**: Routes traffic to endpoints based on priority values, directing to the highest priority available endpoint. \
 * **Weighted**: Distributes traffic across endpoints based on assigned weight values.
 */
export type TrafficRoutingMethod = string;

export function profileEndpointArraySerializer(result: Array<ProfileEndpoint>): any[] {
  return result.map((item) => {
    return profileEndpointSerializer(item);
  });
}

export function profileEndpointArrayDeserializer(result: Array<ProfileEndpoint>): any[] {
  return result.map((item) => {
    return profileEndpointDeserializer(item);
  });
}

/** Class representing an inline endpoint within a Traffic Manager profile. */
export interface ProfileEndpoint {
  /** The name of the endpoint. */
  name: string;
  /** The fully-qualified DNS name or IP address of the endpoint. Traffic Manager returns this value in DNS responses to direct traffic to this endpoint. */
  target: string;
  /** Monitoring target is where Private Traffic Manager will gather health information.If MonitoringTarget is not configured EndpointTarget will be used instead. If the EndpointTarget is IPv6 then the Monitoring Target MUST be configured. Monitoring Target cannot be an IPv6 address. */
  monitoringTarget?: string;
  /** The status of the endpoint. If the endpoint is Enabled, it is probed for endpoint health and is included in the traffic routing method. */
  endpointStatus?: AdministrativeStatus;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: EndpointsKind;
  /** The weight of this endpoint when using the 'Weighted' traffic routing method. Possible values are from 1 to 1000. */
  weight?: number;
  /** The priority of this endpoint when using the 'Priority' traffic routing method. Possible values are from 1 to 1000, lower values represent higher priority. This is an optional parameter.  If specified, it must be specified on all endpoints, and no two endpoints can share the same priority value. */
  priority?: number;
  /** Indicates whether endpoint is Always Serve or not. Always Serve endpoints are always considered to be healthy. */
  alwaysServe?: AlwaysServe;
  /** The health policy associated with this endpoint. */
  healthPolicyId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function profileEndpointSerializer(item: ProfileEndpoint): any {
  return {
    name: item["name"],
    target: item["target"],
    monitoringTarget: item["monitoringTarget"],
    endpointStatus: item["endpointStatus"],
    kind: item["kind"],
    weight: item["weight"],
    priority: item["priority"],
    alwaysServe: item["alwaysServe"],
    healthPolicyId: item["healthPolicyId"],
  };
}

export function profileEndpointDeserializer(item: any): ProfileEndpoint {
  return {
    name: item["name"],
    target: item["target"],
    monitoringTarget: item["monitoringTarget"],
    endpointStatus: item["endpointStatus"],
    kind: item["kind"],
    weight: item["weight"],
    priority: item["priority"],
    alwaysServe: item["alwaysServe"],
    healthPolicyId: item["healthPolicyId"],
    provisioningState: item["provisioningState"],
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

/** The type used for update operations of the PrivateTrafficManagerProfile. */
export interface PrivateTrafficManagerProfileUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: PrivateTrafficManagerProfileUpdateProperties;
}

export function privateTrafficManagerProfileUpdateSerializer(
  item: PrivateTrafficManagerProfileUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : privateTrafficManagerProfileUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the PrivateTrafficManagerProfile. */
export interface PrivateTrafficManagerProfileUpdateProperties {
  /** The mode for custom topology map of the Private Traffic Manager profile. */
  customTopologyMapMode?: CustomTopologyMapMode;
  /** The DNS related configuration properties of the Private Traffic Manager */
  dnsConfig?: DnsConfig;
  /** The ARM resource ID of the topology map associated with this Private Traffic Manager profile. */
  topologyMapId?: string;
  /** The status of the Private Traffic Manager profile. */
  profileStatus?: ProfileStatus;
  /** The traffic routing method of the Private Traffic Manager profile. */
  trafficRoutingMethod?: TrafficRoutingMethod;
  /** The list of endpoints in the Private Traffic Manager profile. */
  endpoints?: ProfileEndpoint[];
}

export function privateTrafficManagerProfileUpdatePropertiesSerializer(
  item: PrivateTrafficManagerProfileUpdateProperties,
): any {
  return {
    customTopologyMapMode: item["customTopologyMapMode"],
    dnsConfig: !item["dnsConfig"] ? item["dnsConfig"] : dnsConfigSerializer(item["dnsConfig"]),
    topologyMapId: item["topologyMapId"],
    profileStatus: item["profileStatus"],
    trafficRoutingMethod: item["trafficRoutingMethod"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : profileEndpointArraySerializer(item["endpoints"]),
  };
}

/** The response of a PrivateTrafficManagerProfile list operation. */
export interface _PrivateTrafficManagerProfileListResult {
  /** The PrivateTrafficManagerProfile items on this page */
  value: PrivateTrafficManagerProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateTrafficManagerProfileListResultDeserializer(
  item: any,
): _PrivateTrafficManagerProfileListResult {
  return {
    value: privateTrafficManagerProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateTrafficManagerProfileArraySerializer(
  result: Array<PrivateTrafficManagerProfile>,
): any[] {
  return result.map((item) => {
    return privateTrafficManagerProfileSerializer(item);
  });
}

export function privateTrafficManagerProfileArrayDeserializer(
  result: Array<PrivateTrafficManagerProfile>,
): any[] {
  return result.map((item) => {
    return privateTrafficManagerProfileDeserializer(item);
  });
}

/** Class representing a probing gateway associated with a Private Traffic Manager profile. This resource is only available when the parent profile has `customTopologyMapMode` set to `Disabled` (Basic experience). */
export interface ProfileProbingGateway extends ProxyResource {
  /** The properties of the probing gateway association. */
  properties?: ProfileProbingGatewayProperties;
}

export function profileProbingGatewaySerializer(item: ProfileProbingGateway): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : profileProbingGatewayPropertiesSerializer(item["properties"]),
  };
}

export function profileProbingGatewayDeserializer(item: any): ProfileProbingGateway {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : profileProbingGatewayPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a probing gateway association with a Private Traffic Manager profile. */
export interface ProfileProbingGatewayProperties {
  /** The ARM resource ID of the probing gateway. */
  probingGatewayId: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function profileProbingGatewayPropertiesSerializer(
  item: ProfileProbingGatewayProperties,
): any {
  return { probingGatewayId: item["probingGatewayId"] };
}

export function profileProbingGatewayPropertiesDeserializer(
  item: any,
): ProfileProbingGatewayProperties {
  return {
    probingGatewayId: item["probingGatewayId"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the ProfileProbingGateway. */
export interface ProfileProbingGatewayUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ProfileProbingGatewayUpdateProperties;
}

export function profileProbingGatewayUpdateSerializer(item: ProfileProbingGatewayUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : profileProbingGatewayUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ProfileProbingGateway. */
export interface ProfileProbingGatewayUpdateProperties {
  /** The ARM resource ID of the probing gateway. */
  probingGatewayId?: string;
}

export function profileProbingGatewayUpdatePropertiesSerializer(
  item: ProfileProbingGatewayUpdateProperties,
): any {
  return { probingGatewayId: item["probingGatewayId"] };
}

/** The response of a ProfileProbingGateway list operation. */
export interface _ProfileProbingGatewayListResult {
  /** The ProfileProbingGateway items on this page */
  value: ProfileProbingGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _profileProbingGatewayListResultDeserializer(
  item: any,
): _ProfileProbingGatewayListResult {
  return {
    value: profileProbingGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function profileProbingGatewayArraySerializer(result: Array<ProfileProbingGateway>): any[] {
  return result.map((item) => {
    return profileProbingGatewaySerializer(item);
  });
}

export function profileProbingGatewayArrayDeserializer(
  result: Array<ProfileProbingGateway>,
): any[] {
  return result.map((item) => {
    return profileProbingGatewayDeserializer(item);
  });
}

/** Class representing a Site. */
export interface Site extends ProxyResource {
  /** The properties of the Site. */
  properties?: SiteProperties;
}

export function siteSerializer(item: Site): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesSerializer(item["properties"]),
  };
}

export function siteDeserializer(item: any): Site {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesDeserializer(item["properties"]),
  };
}

/** Class representing the Site properties. */
export interface SiteProperties {
  /** The ARM resource ID of the probing gateway that can be used to monitor health as surrogate to the networks in the Site. */
  probingGatewayIds?: string[];
  /** The list of Network IDs that forms the Site. */
  virtualNetworkIds?: string[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function sitePropertiesSerializer(item: SiteProperties): any {
  return {
    probingGatewayIds: !item["probingGatewayIds"]
      ? item["probingGatewayIds"]
      : item["probingGatewayIds"].map((p: any) => {
          return p;
        }),
    virtualNetworkIds: !item["virtualNetworkIds"]
      ? item["virtualNetworkIds"]
      : item["virtualNetworkIds"].map((p: any) => {
          return p;
        }),
  };
}

export function sitePropertiesDeserializer(item: any): SiteProperties {
  return {
    probingGatewayIds: !item["probingGatewayIds"]
      ? item["probingGatewayIds"]
      : item["probingGatewayIds"].map((p: any) => {
          return p;
        }),
    virtualNetworkIds: !item["virtualNetworkIds"]
      ? item["virtualNetworkIds"]
      : item["virtualNetworkIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the Site. */
export interface SiteUpdate {
  /** The resource-specific properties for this resource. */
  properties?: SiteUpdateProperties;
}

export function siteUpdateSerializer(item: SiteUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : siteUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Site. */
export interface SiteUpdateProperties {
  /** The ARM resource ID of the probing gateway that can be used to monitor health as surrogate to the networks in the Site. */
  probingGatewayIds?: string[];
  /** The list of Network IDs that forms the Site. */
  virtualNetworkIds?: string[];
}

export function siteUpdatePropertiesSerializer(item: SiteUpdateProperties): any {
  return {
    probingGatewayIds: !item["probingGatewayIds"]
      ? item["probingGatewayIds"]
      : item["probingGatewayIds"].map((p: any) => {
          return p;
        }),
    virtualNetworkIds: !item["virtualNetworkIds"]
      ? item["virtualNetworkIds"]
      : item["virtualNetworkIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a Site list operation. */
export interface _SiteListResult {
  /** The Site items on this page */
  value: Site[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteListResultDeserializer(item: any): _SiteListResult {
  return {
    value: siteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteArraySerializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteSerializer(item);
  });
}

export function siteArrayDeserializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteDeserializer(item);
  });
}

/** Class representing a Topology Map. */
export interface TopologyMap extends TrackedResource {
  /** The properties of the Topology Map. */
  properties?: TopologyMapProperties;
}

export function topologyMapSerializer(item: TopologyMap): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : topologyMapPropertiesSerializer(item["properties"]),
  };
}

export function topologyMapDeserializer(item: any): TopologyMap {
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
      : topologyMapPropertiesDeserializer(item["properties"]),
  };
}

/** Class representing the Topology Map properties. */
export interface TopologyMapProperties {
  /** The list of Sites in the Topology Map. */
  sites?: TopologyMapInlineSite[];
  /** The Name of the CatchAll site. There is only one CatchAll site in a TopologyMap */
  catchAllSiteName?: string;
  /** The provisioning state of the TopologyMap resource. */
  readonly provisioningState?: ProvisioningState;
}

export function topologyMapPropertiesSerializer(item: TopologyMapProperties): any {
  return {
    sites: !item["sites"] ? item["sites"] : topologyMapInlineSiteArraySerializer(item["sites"]),
    catchAllSiteName: item["catchAllSiteName"],
  };
}

export function topologyMapPropertiesDeserializer(item: any): TopologyMapProperties {
  return {
    sites: !item["sites"] ? item["sites"] : topologyMapInlineSiteArrayDeserializer(item["sites"]),
    catchAllSiteName: item["catchAllSiteName"],
    provisioningState: item["provisioningState"],
  };
}

export function topologyMapInlineSiteArraySerializer(result: Array<TopologyMapInlineSite>): any[] {
  return result.map((item) => {
    return topologyMapInlineSiteSerializer(item);
  });
}

export function topologyMapInlineSiteArrayDeserializer(
  result: Array<TopologyMapInlineSite>,
): any[] {
  return result.map((item) => {
    return topologyMapInlineSiteDeserializer(item);
  });
}

/** A Site embedded in a Topology Map. */
export interface TopologyMapInlineSite {
  /** The name of the Site. */
  name: string;
  /** The properties of the Site. */
  properties?: SiteProperties;
}

export function topologyMapInlineSiteSerializer(item: TopologyMapInlineSite): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesSerializer(item["properties"]),
  };
}

export function topologyMapInlineSiteDeserializer(item: any): TopologyMapInlineSite {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesDeserializer(item["properties"]),
  };
}

/** The type used for update operations of the Topology Map. */
export interface TopologyMapPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties of the Topology Map that can be updated. */
  properties?: TopologyMapPatchProperties;
}

export function topologyMapPatchSerializer(item: TopologyMapPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : topologyMapPatchPropertiesSerializer(item["properties"]),
  };
}

/** The properties of a Topology Map that can be updated. */
export interface TopologyMapPatchProperties {
  /** The Name of the CatchAll site. There is only one CatchAll site in a TopologyMap */
  catchAllSiteName?: string;
}

export function topologyMapPatchPropertiesSerializer(item: TopologyMapPatchProperties): any {
  return { catchAllSiteName: item["catchAllSiteName"] };
}

/** The response of a TopologyMap list operation. */
export interface _TopologyMapListResult {
  /** The TopologyMap items on this page */
  value: TopologyMap[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _topologyMapListResultDeserializer(item: any): _TopologyMapListResult {
  return {
    value: topologyMapArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topologyMapArraySerializer(result: Array<TopologyMap>): any[] {
  return result.map((item) => {
    return topologyMapSerializer(item);
  });
}

export function topologyMapArrayDeserializer(result: Array<TopologyMap>): any[] {
  return result.map((item) => {
    return topologyMapDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-02-09-preview version */
  V20260209Preview = "2026-02-09-preview",
}
