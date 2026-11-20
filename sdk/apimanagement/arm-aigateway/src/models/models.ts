// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

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

/** Parameters for checking an AI Gateway name in a location. */
export interface AiGatewayCheckNameAvailabilityRequest {
  /** Name to validate and check for availability. */
  name: string;
  /** Resource type to check. */
  type: "Microsoft.ApiManagement/aigateways";
}

export function aiGatewayCheckNameAvailabilityRequestSerializer(
  item: AiGatewayCheckNameAvailabilityRequest,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Availability of an AI Gateway name in a location. */
export interface AiGatewayCheckNameAvailabilityResponse {
  /** Whether the name is valid and available. */
  nameAvailable: boolean;
  /** Reason for the availability result. */
  reason?: AiGatewayNameAvailabilityReason;
  /** Additional information about the availability result. */
  message?: string;
}

export function aiGatewayCheckNameAvailabilityResponseDeserializer(
  item: any,
): AiGatewayCheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Result of name validation and availability checking. */
export enum KnownAiGatewayNameAvailabilityReason {
  /** The name does not satisfy gateway naming requirements. */
  Invalid = "Invalid",
  /** A gateway with this name already exists in the location. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Result of name validation and availability checking. \
 * {@link KnownAiGatewayNameAvailabilityReason} can be used interchangeably with AiGatewayNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: The name does not satisfy gateway naming requirements. \
 * **AlreadyExists**: A gateway with this name already exists in the location.
 */
export type AiGatewayNameAvailabilityReason = string;

/** A telemetry export destination in the default AI Gateway workspace. */
export interface AiGatewayTelemetryExporterResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayTelemetryExporterProperties;
}

export function aiGatewayTelemetryExporterResourceSerializer(
  item: AiGatewayTelemetryExporterResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayTelemetryExporterPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayTelemetryExporterResourceDeserializer(
  item: any,
): AiGatewayTelemetryExporterResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayTelemetryExporterPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway telemetry exporter. */
export interface AiGatewayTelemetryExporterProperties {
  /** Exporter type, which cannot change after creation. */
  telemetryExporterType: AiGatewayTelemetryExporterKind;
  /** Capture prompts, completions, and tool input/output; no built-in PII redaction is applied. */
  payloadCapture?: boolean;
  /** Configuration required for the ApplicationInsights exporter type. */
  applicationInsights?: AiGatewayApplicationInsightsConfiguration;
  /** Configuration required for the OpenTelemetry exporter type. At least one signal endpoint is required. */
  openTelemetry?: AiGatewayOpenTelemetryConfiguration;
  /** Outbound authentication for OpenTelemetry export requests. */
  authentication?: AiGatewayTelemetryAuthentication;
  /** Optional observed-claim mappings, supported on native AI Gateway OpenTelemetry exporters. */
  telemetry?: AiGatewayTelemetryConfiguration;
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayTelemetryExporterPropertiesSerializer(
  item: AiGatewayTelemetryExporterProperties,
): any {
  return {
    telemetryExporterType: item["telemetryExporterType"],
    payloadCapture: item["payloadCapture"],
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : aiGatewayApplicationInsightsConfigurationSerializer(item["applicationInsights"]),
    openTelemetry: !item["openTelemetry"]
      ? item["openTelemetry"]
      : aiGatewayOpenTelemetryConfigurationSerializer(item["openTelemetry"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayTelemetryAuthenticationSerializer(item["authentication"]),
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : aiGatewayTelemetryConfigurationSerializer(item["telemetry"]),
  };
}

export function aiGatewayTelemetryExporterPropertiesDeserializer(
  item: any,
): AiGatewayTelemetryExporterProperties {
  return {
    telemetryExporterType: item["telemetryExporterType"],
    payloadCapture: item["payloadCapture"],
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : aiGatewayApplicationInsightsConfigurationDeserializer(item["applicationInsights"]),
    openTelemetry: !item["openTelemetry"]
      ? item["openTelemetry"]
      : aiGatewayOpenTelemetryConfigurationDeserializer(item["openTelemetry"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayTelemetryAuthenticationDeserializer(item["authentication"]),
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : aiGatewayTelemetryConfigurationDeserializer(item["telemetry"]),
    provisioningState: item["provisioningState"],
  };
}

/** Destination kind for gateway telemetry. */
export enum KnownAiGatewayTelemetryExporterKind {
  /** Export to Application Insights. */
  ApplicationInsights = "ApplicationInsights",
  /** Export over OTLP HTTP/protobuf. */
  OpenTelemetry = "OpenTelemetry",
}

/**
 * Destination kind for gateway telemetry. \
 * {@link KnownAiGatewayTelemetryExporterKind} can be used interchangeably with AiGatewayTelemetryExporterKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplicationInsights**: Export to Application Insights. \
 * **OpenTelemetry**: Export over OTLP HTTP\/protobuf.
 */
export type AiGatewayTelemetryExporterKind = string;

/** Application Insights export destination. */
export interface AiGatewayApplicationInsightsConfiguration {
  /** Application Insights connection string. Required when creating this exporter kind. */
  connectionString?: string;
  /** Azure resource identifier of the Application Insights component. */
  resourceId?: string;
}

export function aiGatewayApplicationInsightsConfigurationSerializer(
  item: AiGatewayApplicationInsightsConfiguration,
): any {
  return { connectionString: item["connectionString"], resourceId: item["resourceId"] };
}

export function aiGatewayApplicationInsightsConfigurationDeserializer(
  item: any,
): AiGatewayApplicationInsightsConfiguration {
  return {
    connectionString: item["connectionString"],
    resourceId: item["resourceId"],
  };
}

/** OpenTelemetry export signal destinations. */
export interface AiGatewayOpenTelemetryConfiguration {
  /** Full OTLP metrics endpoint URL, used without appending a signal path. */
  metricsEndpoint?: AiGatewayDestinationEndpoint;
  /** Full OTLP logs endpoint URL, used without appending a signal path. */
  logsEndpoint?: AiGatewayDestinationEndpoint;
  /** Full OTLP traces endpoint URL, used without appending a signal path. */
  tracesEndpoint?: AiGatewayDestinationEndpoint;
}

export function aiGatewayOpenTelemetryConfigurationSerializer(
  item: AiGatewayOpenTelemetryConfiguration,
): any {
  return {
    metricsEndpoint: !item["metricsEndpoint"]
      ? item["metricsEndpoint"]
      : aiGatewayDestinationEndpointSerializer(item["metricsEndpoint"]),
    logsEndpoint: !item["logsEndpoint"]
      ? item["logsEndpoint"]
      : aiGatewayDestinationEndpointSerializer(item["logsEndpoint"]),
    tracesEndpoint: !item["tracesEndpoint"]
      ? item["tracesEndpoint"]
      : aiGatewayDestinationEndpointSerializer(item["tracesEndpoint"]),
  };
}

export function aiGatewayOpenTelemetryConfigurationDeserializer(
  item: any,
): AiGatewayOpenTelemetryConfiguration {
  return {
    metricsEndpoint: !item["metricsEndpoint"]
      ? item["metricsEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["metricsEndpoint"]),
    logsEndpoint: !item["logsEndpoint"]
      ? item["logsEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["logsEndpoint"]),
    tracesEndpoint: !item["tracesEndpoint"]
      ? item["tracesEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["tracesEndpoint"]),
  };
}

/** An outbound service destination URL. */
export interface AiGatewayDestinationEndpoint {
  /** Destination HTTPS or HTTP URL. */
  url: string;
}

export function aiGatewayDestinationEndpointSerializer(item: AiGatewayDestinationEndpoint): any {
  return { url: item["url"] };
}

export function aiGatewayDestinationEndpointDeserializer(item: any): AiGatewayDestinationEndpoint {
  return {
    url: item["url"],
  };
}

/** Outbound authentication settings for an OpenTelemetry exporter. */
export interface AiGatewayTelemetryAuthentication {
  /** Managed identity authentication for export requests. */
  managedIdentity?: AiGatewayTelemetryManagedIdentity;
  /** Secret HTTP headers sent with export requests. */
  headers?: AiGatewaySecretHeader[];
}

export function aiGatewayTelemetryAuthenticationSerializer(
  item: AiGatewayTelemetryAuthentication,
): any {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayTelemetryManagedIdentitySerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArraySerializer(item["headers"]),
  };
}

export function aiGatewayTelemetryAuthenticationDeserializer(
  item: any,
): AiGatewayTelemetryAuthentication {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayTelemetryManagedIdentityDeserializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArrayDeserializer(item["headers"]),
  };
}

/** Managed identity used to authenticate telemetry export requests. */
export interface AiGatewayTelemetryManagedIdentity {
  /** Token audience requested for the managed identity. */
  resource?: string;
  /** User-assigned managed identity client ID; omit for the system-assigned identity. */
  clientId?: string;
}

export function aiGatewayTelemetryManagedIdentitySerializer(
  item: AiGatewayTelemetryManagedIdentity,
): any {
  return { resource: item["resource"], clientId: item["clientId"] };
}

export function aiGatewayTelemetryManagedIdentityDeserializer(
  item: any,
): AiGatewayTelemetryManagedIdentity {
  return {
    resource: item["resource"],
    clientId: item["clientId"],
  };
}

export function aiGatewaySecretHeaderArraySerializer(result: Array<AiGatewaySecretHeader>): any[] {
  return result.map((item) => {
    return aiGatewaySecretHeaderSerializer(item);
  });
}

export function aiGatewaySecretHeaderArrayDeserializer(
  result: Array<AiGatewaySecretHeader>,
): any[] {
  return result.map((item) => {
    return aiGatewaySecretHeaderDeserializer(item);
  });
}

/** A secret HTTP header injected into an outbound request. */
export interface AiGatewaySecretHeader {
  /** HTTP header name. */
  name: string;
  /** Secret HTTP header value. Omitted from ordinary read responses. */
  value?: string;
}

export function aiGatewaySecretHeaderSerializer(item: AiGatewaySecretHeader): any {
  return { name: item["name"], value: item["value"] };
}

export function aiGatewaySecretHeaderDeserializer(item: any): AiGatewaySecretHeader {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Optional telemetry enrichment on a native AI Gateway OpenTelemetry exporter. */
export interface AiGatewayTelemetryConfiguration {
  /** Observed-claim mappings; an empty array removes existing mappings. */
  attributes?: AiGatewayTelemetryAttributeMapping[];
}

export function aiGatewayTelemetryConfigurationSerializer(
  item: AiGatewayTelemetryConfiguration,
): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : aiGatewayTelemetryAttributeMappingArraySerializer(item["attributes"]),
  };
}

export function aiGatewayTelemetryConfigurationDeserializer(
  item: any,
): AiGatewayTelemetryConfiguration {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : aiGatewayTelemetryAttributeMappingArrayDeserializer(item["attributes"]),
  };
}

export function aiGatewayTelemetryAttributeMappingArraySerializer(
  result: Array<AiGatewayTelemetryAttributeMapping>,
): any[] {
  return result.map((item) => {
    return aiGatewayTelemetryAttributeMappingSerializer(item);
  });
}

export function aiGatewayTelemetryAttributeMappingArrayDeserializer(
  result: Array<AiGatewayTelemetryAttributeMapping>,
): any[] {
  return result.map((item) => {
    return aiGatewayTelemetryAttributeMappingDeserializer(item);
  });
}

/** A claim mapping to azure.ai_gateway.identity.claims.{claim}. */
export interface AiGatewayTelemetryAttributeMapping {
  /** Claim source. Source claim names must be unique across mappings. */
  source: AiGatewayTelemetryAttributeSource;
  /** Distinct signals to enrich. Omit to select all configured signals. */
  signals?: AiGatewayTelemetrySignal[];
}

export function aiGatewayTelemetryAttributeMappingSerializer(
  item: AiGatewayTelemetryAttributeMapping,
): any {
  return {
    source: aiGatewayTelemetryAttributeSourceSerializer(item["source"]),
    signals: !item["signals"]
      ? item["signals"]
      : item["signals"].map((p: any) => {
          return p;
        }),
  };
}

export function aiGatewayTelemetryAttributeMappingDeserializer(
  item: any,
): AiGatewayTelemetryAttributeMapping {
  return {
    source: aiGatewayTelemetryAttributeSourceDeserializer(item["source"]),
    signals: !item["signals"]
      ? item["signals"]
      : item["signals"].map((p: any) => {
          return p;
        }),
  };
}

/** A request JWT claim observed for telemetry only, not authentication or billing. */
export interface AiGatewayTelemetryAttributeSource {
  /** Source kind. Only claims is currently supported. */
  kind: "claims";
  /** Nonempty, case-sensitive claim name. */
  value: string;
}

export function aiGatewayTelemetryAttributeSourceSerializer(
  item: AiGatewayTelemetryAttributeSource,
): any {
  return { kind: item["kind"], value: item["value"] };
}

export function aiGatewayTelemetryAttributeSourceDeserializer(
  item: any,
): AiGatewayTelemetryAttributeSource {
  return {
    kind: item["kind"],
    value: item["value"],
  };
}

/** Telemetry signal receiving a claim attribute. */
export enum KnownAiGatewayTelemetrySignal {
  /** Log records. */
  Logs = "logs",
  /** Trace spans. */
  Traces = "traces",
  /** Token-usage and token-cost metrics. */
  Metrics = "metrics",
}

/**
 * Telemetry signal receiving a claim attribute. \
 * {@link KnownAiGatewayTelemetrySignal} can be used interchangeably with AiGatewayTelemetrySignal,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **logs**: Log records. \
 * **traces**: Trace spans. \
 * **metrics**: Token-usage and token-cost metrics.
 */
export type AiGatewayTelemetrySignal = string;

/** Provisioning state of an AI Gateway resource. */
export enum KnownAiGatewayProvisioningState {
  /** The resource is ready. */
  Succeeded = "Succeeded",
  /** The resource operation failed. */
  Failed = "Failed",
  /** The resource operation was canceled. */
  Canceled = "Canceled",
}

/**
 * Provisioning state of an AI Gateway resource. \
 * {@link KnownAiGatewayProvisioningState} can be used interchangeably with AiGatewayProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The resource is ready. \
 * **Failed**: The resource operation failed. \
 * **Canceled**: The resource operation was canceled.
 */
export type AiGatewayProvisioningState = string;

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

/** Parameters for updating an AI Gateway telemetry exporter. */
export interface AiGatewayTelemetryExporterUpdateParameters {
  /** Exporter properties to update. */
  properties?: AiGatewayTelemetryExporterUpdateProperties;
}

export function aiGatewayTelemetryExporterUpdateParametersSerializer(
  item: AiGatewayTelemetryExporterUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayTelemetryExporterUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties to update on an AI Gateway telemetry exporter. */
export interface AiGatewayTelemetryExporterUpdateProperties {
  /** Capture prompts, completions, and tool input/output. */
  payloadCapture?: boolean;
  /** Application Insights configuration. */
  applicationInsights?: AiGatewayApplicationInsightsConfiguration;
  /** OpenTelemetry configuration. */
  openTelemetry?: AiGatewayOpenTelemetryConfigurationUpdate;
  /** Outbound authentication for OpenTelemetry export requests. */
  authentication?: AiGatewayTelemetryAuthenticationUpdate;
  /** Observed-claim mappings to update. */
  telemetry?: AiGatewayTelemetryConfigurationUpdate;
}

export function aiGatewayTelemetryExporterUpdatePropertiesSerializer(
  item: AiGatewayTelemetryExporterUpdateProperties,
): any {
  return {
    payloadCapture: item["payloadCapture"],
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : aiGatewayApplicationInsightsConfigurationSerializer(item["applicationInsights"]),
    openTelemetry: !item["openTelemetry"]
      ? item["openTelemetry"]
      : aiGatewayOpenTelemetryConfigurationUpdateSerializer(item["openTelemetry"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayTelemetryAuthenticationUpdateSerializer(item["authentication"]),
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : aiGatewayTelemetryConfigurationUpdateSerializer(item["telemetry"]),
  };
}

/** OpenTelemetry export signal destinations to update. */
export interface AiGatewayOpenTelemetryConfigurationUpdate {
  /** Full OTLP metrics endpoint URL, used without appending a signal path. */
  metricsEndpoint?: AiGatewayDestinationEndpointUpdate;
  /** Full OTLP logs endpoint URL, used without appending a signal path. */
  logsEndpoint?: AiGatewayDestinationEndpointUpdate;
  /** Full OTLP traces endpoint URL, used without appending a signal path. */
  tracesEndpoint?: AiGatewayDestinationEndpointUpdate;
}

export function aiGatewayOpenTelemetryConfigurationUpdateSerializer(
  item: AiGatewayOpenTelemetryConfigurationUpdate,
): any {
  return {
    metricsEndpoint: !item["metricsEndpoint"]
      ? item["metricsEndpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["metricsEndpoint"]),
    logsEndpoint: !item["logsEndpoint"]
      ? item["logsEndpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["logsEndpoint"]),
    tracesEndpoint: !item["tracesEndpoint"]
      ? item["tracesEndpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["tracesEndpoint"]),
  };
}

/** An outbound service destination URL to update. */
export interface AiGatewayDestinationEndpointUpdate {
  /** Destination HTTPS or HTTP URL. */
  url?: string;
}

export function aiGatewayDestinationEndpointUpdateSerializer(
  item: AiGatewayDestinationEndpointUpdate,
): any {
  return { url: item["url"] };
}

/** Outbound authentication settings to update on an OpenTelemetry exporter. */
export interface AiGatewayTelemetryAuthenticationUpdate {
  /** Managed identity authentication for export requests. */
  managedIdentity?: AiGatewayTelemetryManagedIdentity;
  /** Secret HTTP headers sent with export requests. */
  headers?: AiGatewaySecretHeaderUpdate[];
}

export function aiGatewayTelemetryAuthenticationUpdateSerializer(
  item: AiGatewayTelemetryAuthenticationUpdate,
): any {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayTelemetryManagedIdentitySerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderUpdateArraySerializer(item["headers"]),
  };
}

export function aiGatewaySecretHeaderUpdateArraySerializer(
  result: Array<AiGatewaySecretHeaderUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewaySecretHeaderUpdateSerializer(item);
  });
}

/** A secret HTTP header to update. */
export interface AiGatewaySecretHeaderUpdate {
  /** HTTP header name. */
  name?: string;
  /** Secret HTTP header value. */
  value?: string;
}

export function aiGatewaySecretHeaderUpdateSerializer(item: AiGatewaySecretHeaderUpdate): any {
  return { name: item["name"], value: item["value"] };
}

/** Telemetry enrichment settings to update. */
export interface AiGatewayTelemetryConfigurationUpdate {
  /** Observed-claim mappings; an empty array removes existing mappings. */
  attributes?: AiGatewayTelemetryAttributeMappingUpdate[];
}

export function aiGatewayTelemetryConfigurationUpdateSerializer(
  item: AiGatewayTelemetryConfigurationUpdate,
): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : aiGatewayTelemetryAttributeMappingUpdateArraySerializer(item["attributes"]),
  };
}

export function aiGatewayTelemetryAttributeMappingUpdateArraySerializer(
  result: Array<AiGatewayTelemetryAttributeMappingUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayTelemetryAttributeMappingUpdateSerializer(item);
  });
}

/** A claim mapping to update. */
export interface AiGatewayTelemetryAttributeMappingUpdate {
  /** Claim source. */
  source?: AiGatewayTelemetryAttributeSourceUpdate;
  /** Distinct signals to enrich. */
  signals?: AiGatewayTelemetrySignal[];
}

export function aiGatewayTelemetryAttributeMappingUpdateSerializer(
  item: AiGatewayTelemetryAttributeMappingUpdate,
): any {
  return {
    source: !item["source"]
      ? item["source"]
      : aiGatewayTelemetryAttributeSourceUpdateSerializer(item["source"]),
    signals: !item["signals"]
      ? item["signals"]
      : item["signals"].map((p: any) => {
          return p;
        }),
  };
}

/** A claim source to update. */
export interface AiGatewayTelemetryAttributeSourceUpdate {
  /** Source kind. Only claims is currently supported. */
  kind?: "claims";
  /** Nonempty, case-sensitive claim name. */
  value?: string;
}

export function aiGatewayTelemetryAttributeSourceUpdateSerializer(
  item: AiGatewayTelemetryAttributeSourceUpdate,
): any {
  return { kind: item["kind"], value: item["value"] };
}

/** The response of a AiGatewayTelemetryExporterResource list operation. */
export interface _AiGatewayTelemetryExporterResourceListResult {
  /** The AiGatewayTelemetryExporterResource items on this page */
  value: AiGatewayTelemetryExporterResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayTelemetryExporterResourceListResultDeserializer(
  item: any,
): _AiGatewayTelemetryExporterResourceListResult {
  return {
    value: aiGatewayTelemetryExporterResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayTelemetryExporterResourceArraySerializer(
  result: Array<AiGatewayTelemetryExporterResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayTelemetryExporterResourceSerializer(item);
  });
}

export function aiGatewayTelemetryExporterResourceArrayDeserializer(
  result: Array<AiGatewayTelemetryExporterResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayTelemetryExporterResourceDeserializer(item);
  });
}

/** A stable client-facing model identity backed by an ordered pool of models. */
export interface AiGatewayAliasResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayAliasProperties;
}

export function aiGatewayAliasResourceSerializer(item: AiGatewayAliasResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayAliasPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayAliasResourceDeserializer(item: any): AiGatewayAliasResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayAliasPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a stable client-facing model alias. */
export interface AiGatewayAliasProperties {
  /** Client-facing routing name sent in the request model field. */
  aliasName?: string;
  /** Description of the alias. */
  description?: string;
  /** Ordered target models used for routing. */
  backendModels: AiGatewayAliasTarget[];
  /** Ordered routing stages. */
  selectionOrder?: AiGatewayAliasSelectionStage[];
  /** Stateless backend preference using an existing caller session key. */
  sessionBackendPreference?: AiGatewaySessionBackendPreference;
  /** Automatic model selection settings used with the autoModelSelection stage. */
  autoModelSelection?: AiGatewayModelSelection;
  /** Ordered failure rules; only the first matching rule is applied. */
  failures?: AiGatewayAliasFailureRule[];
  /** Maximum additional backend attempts after the first request. */
  maxRetryAttempts?: number;
  /** Native endpoints common to every target model; translated endpoints are excluded. */
  readonly supportedEndpoints?: string[];
  /** Invocation endpoints, when endpoint metadata is enabled for this gateway. */
  readonly gatewayEndpoints?: AiGatewayEndpoint[];
  /** Inline policies applied to requests routed through the alias. */
  policies?: AiGatewayPolicy[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayAliasPropertiesSerializer(item: AiGatewayAliasProperties): any {
  return {
    aliasName: item["aliasName"],
    description: item["description"],
    backendModels: aiGatewayAliasTargetArraySerializer(item["backendModels"]),
    selectionOrder: !item["selectionOrder"]
      ? item["selectionOrder"]
      : item["selectionOrder"].map((p: any) => {
          return p;
        }),
    sessionBackendPreference: !item["sessionBackendPreference"]
      ? item["sessionBackendPreference"]
      : aiGatewaySessionBackendPreferenceSerializer(item["sessionBackendPreference"]),
    autoModelSelection: !item["autoModelSelection"]
      ? item["autoModelSelection"]
      : aiGatewayModelSelectionSerializer(item["autoModelSelection"]),
    failures: !item["failures"]
      ? item["failures"]
      : aiGatewayAliasFailureRuleArraySerializer(item["failures"]),
    maxRetryAttempts: item["maxRetryAttempts"],
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArraySerializer(item["policies"]),
  };
}

export function aiGatewayAliasPropertiesDeserializer(item: any): AiGatewayAliasProperties {
  return {
    aliasName: item["aliasName"],
    description: item["description"],
    backendModels: aiGatewayAliasTargetArrayDeserializer(item["backendModels"]),
    selectionOrder: !item["selectionOrder"]
      ? item["selectionOrder"]
      : item["selectionOrder"].map((p: any) => {
          return p;
        }),
    sessionBackendPreference: !item["sessionBackendPreference"]
      ? item["sessionBackendPreference"]
      : aiGatewaySessionBackendPreferenceDeserializer(item["sessionBackendPreference"]),
    autoModelSelection: !item["autoModelSelection"]
      ? item["autoModelSelection"]
      : aiGatewayModelSelectionDeserializer(item["autoModelSelection"]),
    failures: !item["failures"]
      ? item["failures"]
      : aiGatewayAliasFailureRuleArrayDeserializer(item["failures"]),
    maxRetryAttempts: item["maxRetryAttempts"],
    supportedEndpoints: !item["supportedEndpoints"]
      ? item["supportedEndpoints"]
      : item["supportedEndpoints"].map((p: any) => {
          return p;
        }),
    gatewayEndpoints: !item["gatewayEndpoints"]
      ? item["gatewayEndpoints"]
      : aiGatewayEndpointArrayDeserializer(item["gatewayEndpoints"]),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArrayDeserializer(item["policies"]),
    provisioningState: item["provisioningState"],
  };
}

export function aiGatewayAliasTargetArraySerializer(result: Array<AiGatewayAliasTarget>): any[] {
  return result.map((item) => {
    return aiGatewayAliasTargetSerializer(item);
  });
}

export function aiGatewayAliasTargetArrayDeserializer(result: Array<AiGatewayAliasTarget>): any[] {
  return result.map((item) => {
    return aiGatewayAliasTargetDeserializer(item);
  });
}

/** A model targeted by an AI Gateway alias. */
export interface AiGatewayAliasTarget {
  /** Azure resource identifier of the target model in the default workspace. */
  resourceId: string;
  /** Unversioned canonical model name grouping equivalent serving deployments. */
  selectorModelName?: string;
  /** Optional Boolean CEL expression wrapped in @cel(...) controlling eligibility for new backend selections. */
  when?: string;
  /** Routing priority. Lower values are preferred; the effective default is zero. */
  priority?: number;
  /** Relative selection weight within a priority group. The effective default is one. */
  weight?: number;
}

export function aiGatewayAliasTargetSerializer(item: AiGatewayAliasTarget): any {
  return {
    resourceId: item["resourceId"],
    selectorModelName: item["selectorModelName"],
    when: item["when"],
    priority: item["priority"],
    weight: item["weight"],
  };
}

export function aiGatewayAliasTargetDeserializer(item: any): AiGatewayAliasTarget {
  return {
    resourceId: item["resourceId"],
    selectorModelName: item["selectorModelName"],
    when: item["when"],
    priority: item["priority"],
    weight: item["weight"],
  };
}

/** Routing stage in an AI Gateway alias selection order. */
export enum KnownAiGatewayAliasSelectionStage {
  /** Deterministic priority and weight routing stage. */
  Priority = "priority",
  /** Automatic model selection stage. */
  AutoModelSelection = "autoModelSelection",
  /** Stateless session backend preference stage. */
  SessionBackendPreference = "sessionBackendPreference",
}

/**
 * Routing stage in an AI Gateway alias selection order. \
 * {@link KnownAiGatewayAliasSelectionStage} can be used interchangeably with AiGatewayAliasSelectionStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **priority**: Deterministic priority and weight routing stage. \
 * **autoModelSelection**: Automatic model selection stage. \
 * **sessionBackendPreference**: Stateless session backend preference stage.
 */
export type AiGatewayAliasSelectionStage = string;

/** Stateless backend preference using an existing caller session key. */
export interface AiGatewaySessionBackendPreference {
  /** CEL expression returning the caller session key. */
  key: string;
}

export function aiGatewaySessionBackendPreferenceSerializer(
  item: AiGatewaySessionBackendPreference,
): any {
  return { key: item["key"] };
}

export function aiGatewaySessionBackendPreferenceDeserializer(
  item: any,
): AiGatewaySessionBackendPreference {
  return {
    key: item["key"],
  };
}

/** Automatic model selection configuration for an AI Gateway alias. */
export interface AiGatewayModelSelection {
  /** Configured quality/cost objective. */
  objective: AiGatewayModelSelectionObjective;
  /** Allowed per-request behaviors. Omitting the property or sending an empty array denies overrides and disables function-tool compatibility filtering. */
  allowedRequestOverrides?: AiGatewayAllowedRequestOverride[];
}

export function aiGatewayModelSelectionSerializer(item: AiGatewayModelSelection): any {
  return {
    objective: item["objective"],
    allowedRequestOverrides: !item["allowedRequestOverrides"]
      ? item["allowedRequestOverrides"]
      : item["allowedRequestOverrides"].map((p: any) => {
          return p;
        }),
  };
}

export function aiGatewayModelSelectionDeserializer(item: any): AiGatewayModelSelection {
  return {
    objective: item["objective"],
    allowedRequestOverrides: !item["allowedRequestOverrides"]
      ? item["allowedRequestOverrides"]
      : item["allowedRequestOverrides"].map((p: any) => {
          return p;
        }),
  };
}

/** Quality and cost objective for automatic model selection. */
export enum KnownAiGatewayModelSelectionObjective {
  /** Balance quality and cost. */
  Balanced = "Balanced",
  /** Prefer lower cost. */
  Cost = "Cost",
  /** Prefer higher quality. */
  Quality = "Quality",
}

/**
 * Quality and cost objective for automatic model selection. \
 * {@link KnownAiGatewayModelSelectionObjective} can be used interchangeably with AiGatewayModelSelectionObjective,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Balanced**: Balance quality and cost. \
 * **Cost**: Prefer lower cost. \
 * **Quality**: Prefer higher quality.
 */
export type AiGatewayModelSelectionObjective = string;

/** Per-request behavior allowed for automatic model selection. */
export enum KnownAiGatewayAllowedRequestOverride {
  /** Allow narrowing the configured selector model pool. */
  Model = "model",
  /** Allow overriding the selection objective. */
  Objective = "objective",
  /** Enable chat function-tool compatibility filtering without granting either override. */
  FilterModelsForToolCompatibility = "filterModelsForToolCompatibility",
}

/**
 * Per-request behavior allowed for automatic model selection. \
 * {@link KnownAiGatewayAllowedRequestOverride} can be used interchangeably with AiGatewayAllowedRequestOverride,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **model**: Allow narrowing the configured selector model pool. \
 * **objective**: Allow overriding the selection objective. \
 * **filterModelsForToolCompatibility**: Enable chat function-tool compatibility filtering without granting either override.
 */
export type AiGatewayAllowedRequestOverride = string;

export function aiGatewayAliasFailureRuleArraySerializer(
  result: Array<AiGatewayAliasFailureRule>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasFailureRuleSerializer(item);
  });
}

export function aiGatewayAliasFailureRuleArrayDeserializer(
  result: Array<AiGatewayAliasFailureRule>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasFailureRuleDeserializer(item);
  });
}

/** An ordered failure rule for an AI Gateway alias. */
export interface AiGatewayAliasFailureRule {
  /** Boolean @cel(...) expression evaluated against the current routing failure. */
  when: string;
  /** Maximum additional attempts on the same backend; defaults to zero. */
  retryAttempts?: number;
  /** Optional ISO 8601 duration or duration-valued @cel(...) expression for excluding the failed backend. */
  excludeFor?: string;
}

export function aiGatewayAliasFailureRuleSerializer(item: AiGatewayAliasFailureRule): any {
  return {
    when: item["when"],
    retryAttempts: item["retryAttempts"],
    excludeFor: item["excludeFor"],
  };
}

export function aiGatewayAliasFailureRuleDeserializer(item: any): AiGatewayAliasFailureRule {
  return {
    when: item["when"],
    retryAttempts: item["retryAttempts"],
    excludeFor: item["excludeFor"],
  };
}

export function aiGatewayEndpointArrayDeserializer(result: Array<AiGatewayEndpoint>): any[] {
  return result.map((item) => {
    return aiGatewayEndpointDeserializer(item);
  });
}

/** A client-facing endpoint for invoking an AI Gateway resource. */
export interface AiGatewayEndpoint {
  /** Complete HTTPS invocation URL. */
  readonly url: string;
  /** HTTPS base URL for SDKs that construct operation paths, when metadata is enabled. */
  readonly baseUrl?: string;
  /** API identifier relative to the provider prefix, when metadata is enabled. */
  readonly api?: string;
}

export function aiGatewayEndpointDeserializer(item: any): AiGatewayEndpoint {
  return {
    url: item["url"],
    baseUrl: item["baseUrl"],
    api: item["api"],
  };
}

export function aiGatewayPolicyArraySerializer(result: Array<AiGatewayPolicy>): any[] {
  return result.map((item) => {
    return aiGatewayPolicySerializer(item);
  });
}

export function aiGatewayPolicyArrayDeserializer(result: Array<AiGatewayPolicy>): any[] {
  return result.map((item) => {
    return aiGatewayPolicyDeserializer(item);
  });
}

/** An inline policy. Supported policy types and scopes depend on the parent resource. */
export interface AiGatewayPolicy {
  /** Policy type. */
  type: AiGatewayPolicyType;
  /** Policy scope. Workspace counter policies use workspace; other policies use resource. Agent hooks require an explicit resource scope. */
  scope?: AiGatewayPolicyScope;
  /** Stable identifier, required for costLimit and agentHooks policies. */
  id?: string;
  /** Token or request count allowed during a tokenLimit or requestRateLimit period. */
  count?: number;
  /** Counter period. Token limits support minute/hour/day; request rate limits support minute/hour/day or whole-second ISO 8601 durations (e.g., PT37S); cost limits support hour/day/week/month/year. */
  period?: AiGatewayPolicyPeriod;
  /** Unique public dimensions used to partition a token, cost, or request counter. */
  counterKey?: AiGatewayCounterDimension[];
  /** Cost budget in US dollars. */
  amount?: number;
  /** Ordered cost-budget overrides; supported only for counterKey [identity]. The first match wins. */
  overrides?: AiGatewayCostLimitOverride[];
  /** Whether to check tool requests for threats. */
  preInvocation?: boolean;
  /** Whether to check tool responses for threats. */
  postInvocation?: boolean;
  /** Default failure mode for agent hooks. */
  mode?: AiGatewayFailureMode;
  /** Default destination URL for agent hooks. */
  endpoint?: AiGatewayDestinationEndpoint;
  /** Default outbound authentication for agent hooks. */
  authentication?: AiGatewayAgentHookAuthentication;
  /** Literal non-secret default HTTP headers for agent hooks. */
  headers?: AiGatewayNameValuePair[];
  /** Lifecycle hooks; requires agent-hook authoring to be enabled on the gateway. */
  hooks?: AiGatewayAgentHooks;
  /** Hate-content severity threshold. */
  hateSeverity?: AiGatewayContentSafetySeverity;
  /** Violence-content severity threshold. */
  violenceSeverity?: AiGatewayContentSafetySeverity;
  /** Sexual-content severity threshold. */
  sexualSeverity?: AiGatewayContentSafetySeverity;
  /** Self-harm-content severity threshold. */
  selfHarmSeverity?: AiGatewayContentSafetySeverity;
  /** Consecutive failure count that opens a fallback circuit. */
  threshold?: number;
  /** Duration for which the fallback circuit remains open. */
  tripDurationSeconds?: number;
  /** Ordered fallback model targets. */
  fallbackTargets?: AiGatewayFallbackTarget[];
  /** IP filtering action. */
  action?: AiGatewayIpFilterAction;
  /** CIDR ranges to allow or deny. */
  cidrRanges?: string[];
  /** Origins allowed by a CORS policy. */
  allowedOrigins?: string[];
  /** HTTP methods allowed by a CORS policy. */
  allowedMethods?: string[];
  /** HTTP headers allowed by a CORS policy. */
  allowedHeaders?: string[];
  /** Response headers exposed to the browser. */
  exposeHeaders?: string[];
  /** Whether browsers may send credentials. */
  allowCredentials?: boolean;
  /** Whether unmatched CORS requests are terminated. */
  terminateUnmatchedRequest?: boolean;
  /** Browser preflight cache duration in seconds. */
  preflightResultMaxAge?: number;
}

export function aiGatewayPolicySerializer(item: AiGatewayPolicy): any {
  return {
    type: item["type"],
    scope: item["scope"],
    id: item["id"],
    count: item["count"],
    period: item["period"],
    counterKey: !item["counterKey"]
      ? item["counterKey"]
      : item["counterKey"].map((p: any) => {
          return p;
        }),
    amount: item["amount"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : aiGatewayCostLimitOverrideArraySerializer(item["overrides"]),
    preInvocation: item["preInvocation"],
    postInvocation: item["postInvocation"],
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointSerializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationSerializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairArraySerializer(item["headers"]),
    hooks: !item["hooks"] ? item["hooks"] : aiGatewayAgentHooksSerializer(item["hooks"]),
    hateSeverity: item["hateSeverity"],
    violenceSeverity: item["violenceSeverity"],
    sexualSeverity: item["sexualSeverity"],
    selfHarmSeverity: item["selfHarmSeverity"],
    threshold: item["threshold"],
    tripDurationSeconds: item["tripDurationSeconds"],
    fallbackTargets: !item["fallbackTargets"]
      ? item["fallbackTargets"]
      : aiGatewayFallbackTargetArraySerializer(item["fallbackTargets"]),
    action: item["action"],
    cidrRanges: !item["cidrRanges"]
      ? item["cidrRanges"]
      : item["cidrRanges"].map((p: any) => {
          return p;
        }),
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
    allowedMethods: !item["allowedMethods"]
      ? item["allowedMethods"]
      : item["allowedMethods"].map((p: any) => {
          return p;
        }),
    allowedHeaders: !item["allowedHeaders"]
      ? item["allowedHeaders"]
      : item["allowedHeaders"].map((p: any) => {
          return p;
        }),
    exposeHeaders: !item["exposeHeaders"]
      ? item["exposeHeaders"]
      : item["exposeHeaders"].map((p: any) => {
          return p;
        }),
    allowCredentials: item["allowCredentials"],
    terminateUnmatchedRequest: item["terminateUnmatchedRequest"],
    preflightResultMaxAge: item["preflightResultMaxAge"],
  };
}

export function aiGatewayPolicyDeserializer(item: any): AiGatewayPolicy {
  return {
    type: item["type"],
    scope: item["scope"],
    id: item["id"],
    count: item["count"],
    period: item["period"],
    counterKey: !item["counterKey"]
      ? item["counterKey"]
      : item["counterKey"].map((p: any) => {
          return p;
        }),
    amount: item["amount"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : aiGatewayCostLimitOverrideArrayDeserializer(item["overrides"]),
    preInvocation: item["preInvocation"],
    postInvocation: item["postInvocation"],
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationDeserializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairArrayDeserializer(item["headers"]),
    hooks: !item["hooks"] ? item["hooks"] : aiGatewayAgentHooksDeserializer(item["hooks"]),
    hateSeverity: item["hateSeverity"],
    violenceSeverity: item["violenceSeverity"],
    sexualSeverity: item["sexualSeverity"],
    selfHarmSeverity: item["selfHarmSeverity"],
    threshold: item["threshold"],
    tripDurationSeconds: item["tripDurationSeconds"],
    fallbackTargets: !item["fallbackTargets"]
      ? item["fallbackTargets"]
      : aiGatewayFallbackTargetArrayDeserializer(item["fallbackTargets"]),
    action: item["action"],
    cidrRanges: !item["cidrRanges"]
      ? item["cidrRanges"]
      : item["cidrRanges"].map((p: any) => {
          return p;
        }),
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
    allowedMethods: !item["allowedMethods"]
      ? item["allowedMethods"]
      : item["allowedMethods"].map((p: any) => {
          return p;
        }),
    allowedHeaders: !item["allowedHeaders"]
      ? item["allowedHeaders"]
      : item["allowedHeaders"].map((p: any) => {
          return p;
        }),
    exposeHeaders: !item["exposeHeaders"]
      ? item["exposeHeaders"]
      : item["exposeHeaders"].map((p: any) => {
          return p;
        }),
    allowCredentials: item["allowCredentials"],
    terminateUnmatchedRequest: item["terminateUnmatchedRequest"],
    preflightResultMaxAge: item["preflightResultMaxAge"],
  };
}

/** The type of an inline AI Gateway policy. */
export enum KnownAiGatewayPolicyType {
  /** Limit consumed tokens. */
  TokenLimit = "tokenLimit",
  /** Filter unsafe content. */
  ContentSafety = "contentSafety",
  /** Route to fallback models after failures. */
  Fallback = "fallback",
  /** Filter clients by IP address. */
  IpFilter = "ipFilter",
  /** Limit requests over time. */
  RequestRateLimit = "requestRateLimit",
  /** Configure cross-origin resource sharing. */
  Cors = "cors",
  /** Limit cumulative spending in US dollars. */
  CostLimit = "costLimit",
  /** Check tool requests and responses for threats. */
  ToolThreatProtection = "toolThreatProtection",
  /** Invoke external pre-tool-call and post-tool-call hooks when authoring is enabled. */
  AgentHooks = "agentHooks",
}

/**
 * The type of an inline AI Gateway policy. \
 * {@link KnownAiGatewayPolicyType} can be used interchangeably with AiGatewayPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tokenLimit**: Limit consumed tokens. \
 * **contentSafety**: Filter unsafe content. \
 * **fallback**: Route to fallback models after failures. \
 * **ipFilter**: Filter clients by IP address. \
 * **requestRateLimit**: Limit requests over time. \
 * **cors**: Configure cross-origin resource sharing. \
 * **costLimit**: Limit cumulative spending in US dollars. \
 * **toolThreatProtection**: Check tool requests and responses for threats. \
 * **agentHooks**: Invoke external pre-tool-call and post-tool-call hooks when authoring is enabled.
 */
export type AiGatewayPolicyType = string;

/** Aggregation scope of an inline policy. */
export enum KnownAiGatewayPolicyScope {
  /** Apply the policy to its resource. */
  Resource = "resource",
  /** Aggregate counters across the workspace. Supported for workspace counter policies only. */
  Workspace = "workspace",
}

/**
 * Aggregation scope of an inline policy. \
 * {@link KnownAiGatewayPolicyScope} can be used interchangeably with AiGatewayPolicyScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **resource**: Apply the policy to its resource. \
 * **workspace**: Aggregate counters across the workspace. Supported for workspace counter policies only.
 */
export type AiGatewayPolicyScope = string;

/** Counter period. Token limits support minute/hour/day; request rate limits support minute/hour/day or whole-second ISO 8601 durations (e.g., PT37S); cost limits support hour/day/week/month/year. */
export enum KnownAiGatewayPolicyPeriod {
  /** One minute. */
  Minute = "minute",
  /** One hour. */
  Hour = "hour",
  /** One day. */
  Day = "day",
  /** One week, for cost limits only. */
  Week = "week",
  /** One month, for cost limits only. */
  Month = "month",
  /** One year, for cost limits only. */
  Year = "year",
}

/**
 * Counter period. Token limits support minute/hour/day; request rate limits support minute/hour/day or whole-second ISO 8601 durations (e.g., PT37S); cost limits support hour/day/week/month/year. \
 * {@link KnownAiGatewayPolicyPeriod} can be used interchangeably with AiGatewayPolicyPeriod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minute**: One minute. \
 * **hour**: One hour. \
 * **day**: One day. \
 * **week**: One week, for cost limits only. \
 * **month**: One month, for cost limits only. \
 * **year**: One year, for cost limits only.
 */
export type AiGatewayPolicyPeriod = string;

/** Public request dimension used to partition a policy counter. */
export enum KnownAiGatewayCounterDimension {
  /** Authenticated request identity. */
  Identity = "identity",
  /** Request source IP address. */
  IpAddress = "ipAddress",
}

/**
 * Public request dimension used to partition a policy counter. \
 * {@link KnownAiGatewayCounterDimension} can be used interchangeably with AiGatewayCounterDimension,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **identity**: Authenticated request identity. \
 * **ipAddress**: Request source IP address.
 */
export type AiGatewayCounterDimension = string;

export function aiGatewayCostLimitOverrideArraySerializer(
  result: Array<AiGatewayCostLimitOverride>,
): any[] {
  return result.map((item) => {
    return aiGatewayCostLimitOverrideSerializer(item);
  });
}

export function aiGatewayCostLimitOverrideArrayDeserializer(
  result: Array<AiGatewayCostLimitOverride>,
): any[] {
  return result.map((item) => {
    return aiGatewayCostLimitOverrideDeserializer(item);
  });
}

/** An ordered cost-budget override; exactly one selector must be specified. */
export interface AiGatewayCostLimitOverride {
  /** Authenticated token claims that must all match; claim names are case-sensitive. */
  claims?: AiGatewayNameValuePair[];
  /** Azure resource identifier of the API key selecting this override. */
  apiKeyResourceId?: string;
  /** Override budget in US dollars. */
  amount: number;
}

export function aiGatewayCostLimitOverrideSerializer(item: AiGatewayCostLimitOverride): any {
  return {
    claims: !item["claims"]
      ? item["claims"]
      : aiGatewayNameValuePairArraySerializer(item["claims"]),
    apiKeyResourceId: item["apiKeyResourceId"],
    amount: item["amount"],
  };
}

export function aiGatewayCostLimitOverrideDeserializer(item: any): AiGatewayCostLimitOverride {
  return {
    claims: !item["claims"]
      ? item["claims"]
      : aiGatewayNameValuePairArrayDeserializer(item["claims"]),
    apiKeyResourceId: item["apiKeyResourceId"],
    amount: item["amount"],
  };
}

export function aiGatewayNameValuePairArraySerializer(
  result: Array<AiGatewayNameValuePair>,
): any[] {
  return result.map((item) => {
    return aiGatewayNameValuePairSerializer(item);
  });
}

export function aiGatewayNameValuePairArrayDeserializer(
  result: Array<AiGatewayNameValuePair>,
): any[] {
  return result.map((item) => {
    return aiGatewayNameValuePairDeserializer(item);
  });
}

/** A name/value pair entry. */
export interface AiGatewayNameValuePair {
  /** Entry name. */
  name: string;
  /** Entry value. */
  value: string;
}

export function aiGatewayNameValuePairSerializer(item: AiGatewayNameValuePair): any {
  return { name: item["name"], value: item["value"] };
}

export function aiGatewayNameValuePairDeserializer(item: any): AiGatewayNameValuePair {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Resilience failure mode for an outbound endpoint or hook. */
export enum KnownAiGatewayFailureMode {
  /** Continue processing when the endpoint or hook fails. */
  FailOpen = "failOpen",
  /** Fail the request when the endpoint or hook fails. */
  FailClosed = "failClosed",
}

/**
 * Resilience failure mode for an outbound endpoint or hook. \
 * {@link KnownAiGatewayFailureMode} can be used interchangeably with AiGatewayFailureMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **failOpen**: Continue processing when the endpoint or hook fails. \
 * **failClosed**: Fail the request when the endpoint or hook fails.
 */
export type AiGatewayFailureMode = string;

/** Outbound authentication settings for an external agent hook. */
export interface AiGatewayAgentHookAuthentication {
  /** Managed identity configuration for the hook endpoint. */
  managedIdentity?: AiGatewayManagedIdentityAuthentication;
  /** Secret HTTP headers injected when calling the hook endpoint. */
  headers?: AiGatewaySecretHeader[];
}

export function aiGatewayAgentHookAuthenticationSerializer(
  item: AiGatewayAgentHookAuthentication,
): any {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArraySerializer(item["headers"]),
  };
}

export function aiGatewayAgentHookAuthenticationDeserializer(
  item: any,
): AiGatewayAgentHookAuthentication {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationDeserializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArrayDeserializer(item["headers"]),
  };
}

/** Managed identity settings for an outbound connection. */
export interface AiGatewayManagedIdentityAuthentication {
  /** Target Entra resource or audience URI requested for managed identity authentication. */
  resource?: string;
  /** Client ID of a user-assigned managed identity; omit for system-assigned identity. */
  clientId?: string;
}

export function aiGatewayManagedIdentityAuthenticationSerializer(
  item: AiGatewayManagedIdentityAuthentication,
): any {
  return { resource: item["resource"], clientId: item["clientId"] };
}

export function aiGatewayManagedIdentityAuthenticationDeserializer(
  item: any,
): AiGatewayManagedIdentityAuthentication {
  return {
    resource: item["resource"],
    clientId: item["clientId"],
  };
}

/** Lifecycle hooks supported on models and tool servers. */
export interface AiGatewayAgentHooks {
  /** Hook invoked before calling a tool. */
  preToolCall?: AiGatewayAgentHook;
  /** Hook invoked after calling a tool. */
  postToolCall?: AiGatewayAgentHook;
  /** Hook invoked before calling a model. */
  preModelCall?: AiGatewayAgentHook;
  /** Hook invoked after calling a model. */
  postModelCall?: AiGatewayAgentHook;
}

export function aiGatewayAgentHooksSerializer(item: AiGatewayAgentHooks): any {
  return {
    preToolCall: !item["preToolCall"]
      ? item["preToolCall"]
      : aiGatewayAgentHookSerializer(item["preToolCall"]),
    postToolCall: !item["postToolCall"]
      ? item["postToolCall"]
      : aiGatewayAgentHookSerializer(item["postToolCall"]),
    preModelCall: !item["preModelCall"]
      ? item["preModelCall"]
      : aiGatewayAgentHookSerializer(item["preModelCall"]),
    postModelCall: !item["postModelCall"]
      ? item["postModelCall"]
      : aiGatewayAgentHookSerializer(item["postModelCall"]),
  };
}

export function aiGatewayAgentHooksDeserializer(item: any): AiGatewayAgentHooks {
  return {
    preToolCall: !item["preToolCall"]
      ? item["preToolCall"]
      : aiGatewayAgentHookDeserializer(item["preToolCall"]),
    postToolCall: !item["postToolCall"]
      ? item["postToolCall"]
      : aiGatewayAgentHookDeserializer(item["postToolCall"]),
    preModelCall: !item["preModelCall"]
      ? item["preModelCall"]
      : aiGatewayAgentHookDeserializer(item["preModelCall"]),
    postModelCall: !item["postModelCall"]
      ? item["postModelCall"]
      : aiGatewayAgentHookDeserializer(item["postModelCall"]),
  };
}

/** External hook settings; omitted fields inherit policy-level settings. */
export interface AiGatewayAgentHook {
  /** Failure mode when the hook call fails. */
  mode?: AiGatewayFailureMode;
  /** Hook destination URL. */
  endpoint?: AiGatewayDestinationEndpoint;
  /** Hook authentication settings. */
  authentication?: AiGatewayAgentHookAuthentication;
  /** Literal, non-secret HTTP headers, returned by read operations. */
  headers?: AiGatewayNameValuePair[];
}

export function aiGatewayAgentHookSerializer(item: AiGatewayAgentHook): any {
  return {
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointSerializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationSerializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairArraySerializer(item["headers"]),
  };
}

export function aiGatewayAgentHookDeserializer(item: any): AiGatewayAgentHook {
  return {
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationDeserializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairArrayDeserializer(item["headers"]),
  };
}

/** Severity threshold used by a content safety policy. */
export enum KnownAiGatewayContentSafetySeverity {
  /** Low severity. */
  Low = "Low",
  /** Medium severity. */
  Medium = "Medium",
  /** High severity. */
  High = "High",
  /** Do not filter this category. */
  None = "None",
}

/**
 * Severity threshold used by a content safety policy. \
 * {@link KnownAiGatewayContentSafetySeverity} can be used interchangeably with AiGatewayContentSafetySeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low severity. \
 * **Medium**: Medium severity. \
 * **High**: High severity. \
 * **None**: Do not filter this category.
 */
export type AiGatewayContentSafetySeverity = string;

export function aiGatewayFallbackTargetArraySerializer(
  result: Array<AiGatewayFallbackTarget>,
): any[] {
  return result.map((item) => {
    return aiGatewayFallbackTargetSerializer(item);
  });
}

export function aiGatewayFallbackTargetArrayDeserializer(
  result: Array<AiGatewayFallbackTarget>,
): any[] {
  return result.map((item) => {
    return aiGatewayFallbackTargetDeserializer(item);
  });
}

/** A fallback target for a model policy. */
export interface AiGatewayFallbackTarget {
  /** Resource identifier of a model in the same workspace. */
  modelId: string;
}

export function aiGatewayFallbackTargetSerializer(item: AiGatewayFallbackTarget): any {
  return { modelId: item["modelId"] };
}

export function aiGatewayFallbackTargetDeserializer(item: any): AiGatewayFallbackTarget {
  return {
    modelId: item["modelId"],
  };
}

/** Action performed by an IP filtering policy. */
export enum KnownAiGatewayIpFilterAction {
  /** Allow matching addresses. */
  Allow = "Allow",
  /** Deny matching addresses. */
  Deny = "Deny",
}

/**
 * Action performed by an IP filtering policy. \
 * {@link KnownAiGatewayIpFilterAction} can be used interchangeably with AiGatewayIpFilterAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow matching addresses. \
 * **Deny**: Deny matching addresses.
 */
export type AiGatewayIpFilterAction = string;

/** Parameters for updating an AI Gateway alias. */
export interface AiGatewayAliasUpdateParameters {
  /** Alias properties to update. */
  properties?: AiGatewayAliasUpdateProperties;
}

export function aiGatewayAliasUpdateParametersSerializer(
  item: AiGatewayAliasUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayAliasUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties to update on an AI Gateway alias. */
export interface AiGatewayAliasUpdateProperties {
  /** Client-facing routing name sent in the request model field. */
  aliasName?: string;
  /** Description of the alias. */
  description?: string;
  /** Ordered target models used for routing. */
  backendModels?: AiGatewayAliasTargetUpdate[];
  /** Ordered routing stages. */
  selectionOrder?: AiGatewayAliasSelectionStage[];
  /** Stateless backend preference using an existing caller session key. */
  sessionBackendPreference?: AiGatewaySessionBackendPreferenceUpdate;
  /** Automatic model selection settings used with the autoModelSelection stage. */
  autoModelSelection?: AiGatewayModelSelectionUpdate;
  /** Ordered failure rules; only the first matching rule is applied. */
  failures?: AiGatewayAliasFailureRuleUpdate[];
  /** Maximum additional backend attempts after the first request. */
  maxRetryAttempts?: number;
  /** Inline policies applied to requests routed through the alias. */
  policies?: AiGatewayPolicyUpdate[];
}

export function aiGatewayAliasUpdatePropertiesSerializer(
  item: AiGatewayAliasUpdateProperties,
): any {
  return {
    aliasName: item["aliasName"],
    description: item["description"],
    backendModels: !item["backendModels"]
      ? item["backendModels"]
      : aiGatewayAliasTargetUpdateArraySerializer(item["backendModels"]),
    selectionOrder: !item["selectionOrder"]
      ? item["selectionOrder"]
      : item["selectionOrder"].map((p: any) => {
          return p;
        }),
    sessionBackendPreference: !item["sessionBackendPreference"]
      ? item["sessionBackendPreference"]
      : aiGatewaySessionBackendPreferenceUpdateSerializer(item["sessionBackendPreference"]),
    autoModelSelection: !item["autoModelSelection"]
      ? item["autoModelSelection"]
      : aiGatewayModelSelectionUpdateSerializer(item["autoModelSelection"]),
    failures: !item["failures"]
      ? item["failures"]
      : aiGatewayAliasFailureRuleUpdateArraySerializer(item["failures"]),
    maxRetryAttempts: item["maxRetryAttempts"],
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyUpdateArraySerializer(item["policies"]),
  };
}

export function aiGatewayAliasTargetUpdateArraySerializer(
  result: Array<AiGatewayAliasTargetUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasTargetUpdateSerializer(item);
  });
}

/** A model target to update on an AI Gateway alias. */
export interface AiGatewayAliasTargetUpdate {
  /** Azure resource identifier of the target model in the default workspace. */
  resourceId?: string;
  /** Unversioned canonical model name grouping equivalent serving deployments. */
  selectorModelName?: string;
  /** Optional Boolean CEL expression wrapped in @cel(...) controlling eligibility for new backend selections. */
  when?: string;
  /** Routing priority. Lower values are preferred; the effective default is zero. */
  priority?: number;
  /** Relative selection weight within a priority group. The effective default is one. */
  weight?: number;
}

export function aiGatewayAliasTargetUpdateSerializer(item: AiGatewayAliasTargetUpdate): any {
  return {
    resourceId: item["resourceId"],
    selectorModelName: item["selectorModelName"],
    when: item["when"],
    priority: item["priority"],
    weight: item["weight"],
  };
}

/** Stateless backend preference settings to update. */
export interface AiGatewaySessionBackendPreferenceUpdate {
  /** CEL expression returning the caller session key. */
  key?: string;
}

export function aiGatewaySessionBackendPreferenceUpdateSerializer(
  item: AiGatewaySessionBackendPreferenceUpdate,
): any {
  return { key: item["key"] };
}

/** Automatic model selection configuration to update. */
export interface AiGatewayModelSelectionUpdate {
  /** Configured quality/cost objective. */
  objective?: AiGatewayModelSelectionObjective;
  /** Allowed per-request behaviors. Omitting the property or sending an empty array denies overrides and disables function-tool compatibility filtering. */
  allowedRequestOverrides?: AiGatewayAllowedRequestOverride[];
}

export function aiGatewayModelSelectionUpdateSerializer(item: AiGatewayModelSelectionUpdate): any {
  return {
    objective: item["objective"],
    allowedRequestOverrides: !item["allowedRequestOverrides"]
      ? item["allowedRequestOverrides"]
      : item["allowedRequestOverrides"].map((p: any) => {
          return p;
        }),
  };
}

export function aiGatewayAliasFailureRuleUpdateArraySerializer(
  result: Array<AiGatewayAliasFailureRuleUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasFailureRuleUpdateSerializer(item);
  });
}

/** An ordered failure rule to update on an AI Gateway alias. */
export interface AiGatewayAliasFailureRuleUpdate {
  /** Boolean @cel(...) expression evaluated against the current routing failure. */
  when?: string;
  /** Maximum additional attempts on the same backend; defaults to zero. */
  retryAttempts?: number;
  /** Optional ISO 8601 duration or duration-valued @cel(...) expression for excluding the failed backend. */
  excludeFor?: string;
}

export function aiGatewayAliasFailureRuleUpdateSerializer(
  item: AiGatewayAliasFailureRuleUpdate,
): any {
  return {
    when: item["when"],
    retryAttempts: item["retryAttempts"],
    excludeFor: item["excludeFor"],
  };
}

export function aiGatewayPolicyUpdateArraySerializer(result: Array<AiGatewayPolicyUpdate>): any[] {
  return result.map((item) => {
    return aiGatewayPolicyUpdateSerializer(item);
  });
}

/** An inline policy to update on an AI Gateway model or tool server. */
export interface AiGatewayPolicyUpdate {
  /** Policy type. */
  type?: AiGatewayPolicyType;
  /** Aggregation scope supported by the policy and its parent resource. */
  scope?: AiGatewayPolicyScope;
  /** Stable identifier for costLimit or agentHooks. */
  id?: string;
  /** Token or request count allowed during a tokenLimit or requestRateLimit period. */
  count?: number;
  /** Counter period. Token limits support minute/hour/day; request rate limits support minute/hour/day or whole-second ISO 8601 durations (e.g., PT37S); cost limits support hour/day/week/month/year. */
  period?: AiGatewayPolicyPeriod;
  /** Public dimensions used to partition a token, cost, or request counter. */
  counterKey?: AiGatewayCounterDimension[];
  /** Cost budget in US dollars. */
  amount?: number;
  /** Ordered cost-budget overrides. */
  overrides?: AiGatewayCostLimitOverrideUpdate[];
  /** Whether to check tool requests for threats. */
  preInvocation?: boolean;
  /** Whether to check tool responses for threats. */
  postInvocation?: boolean;
  /** Default failure mode for agent hooks. */
  mode?: AiGatewayFailureMode;
  /** Default destination URL for agent hooks. */
  endpoint?: AiGatewayDestinationEndpointUpdate;
  /** Default outbound authentication for agent hooks. */
  authentication?: AiGatewayAgentHookAuthenticationUpdate;
  /** Literal non-secret default HTTP headers for agent hooks. */
  headers?: AiGatewayNameValuePairUpdate[];
  /** Lifecycle hooks to update. */
  hooks?: AiGatewayAgentHooksUpdate;
  /** Hate-content severity threshold. */
  hateSeverity?: AiGatewayContentSafetySeverity;
  /** Violence-content severity threshold. */
  violenceSeverity?: AiGatewayContentSafetySeverity;
  /** Sexual-content severity threshold. */
  sexualSeverity?: AiGatewayContentSafetySeverity;
  /** Self-harm-content severity threshold. */
  selfHarmSeverity?: AiGatewayContentSafetySeverity;
  /** Consecutive failure count that opens a fallback circuit. */
  threshold?: number;
  /** Duration for which the fallback circuit remains open. */
  tripDurationSeconds?: number;
  /** Ordered fallback model targets. */
  fallbackTargets?: AiGatewayFallbackTargetUpdate[];
  /** IP filtering action. */
  action?: AiGatewayIpFilterAction;
  /** CIDR ranges to allow or deny. */
  cidrRanges?: string[];
  /** Origins allowed by a CORS policy. */
  allowedOrigins?: string[];
  /** HTTP methods allowed by a CORS policy. */
  allowedMethods?: string[];
  /** HTTP headers allowed by a CORS policy. */
  allowedHeaders?: string[];
  /** Response headers exposed to the browser. */
  exposeHeaders?: string[];
  /** Whether browsers may send credentials. */
  allowCredentials?: boolean;
  /** Whether unmatched CORS requests are terminated. */
  terminateUnmatchedRequest?: boolean;
  /** Browser preflight cache duration in seconds. */
  preflightResultMaxAge?: number;
}

export function aiGatewayPolicyUpdateSerializer(item: AiGatewayPolicyUpdate): any {
  return {
    type: item["type"],
    scope: item["scope"],
    id: item["id"],
    count: item["count"],
    period: item["period"],
    counterKey: !item["counterKey"]
      ? item["counterKey"]
      : item["counterKey"].map((p: any) => {
          return p;
        }),
    amount: item["amount"],
    overrides: !item["overrides"]
      ? item["overrides"]
      : aiGatewayCostLimitOverrideUpdateArraySerializer(item["overrides"]),
    preInvocation: item["preInvocation"],
    postInvocation: item["postInvocation"],
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationUpdateSerializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairUpdateArraySerializer(item["headers"]),
    hooks: !item["hooks"] ? item["hooks"] : aiGatewayAgentHooksUpdateSerializer(item["hooks"]),
    hateSeverity: item["hateSeverity"],
    violenceSeverity: item["violenceSeverity"],
    sexualSeverity: item["sexualSeverity"],
    selfHarmSeverity: item["selfHarmSeverity"],
    threshold: item["threshold"],
    tripDurationSeconds: item["tripDurationSeconds"],
    fallbackTargets: !item["fallbackTargets"]
      ? item["fallbackTargets"]
      : aiGatewayFallbackTargetUpdateArraySerializer(item["fallbackTargets"]),
    action: item["action"],
    cidrRanges: !item["cidrRanges"]
      ? item["cidrRanges"]
      : item["cidrRanges"].map((p: any) => {
          return p;
        }),
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
    allowedMethods: !item["allowedMethods"]
      ? item["allowedMethods"]
      : item["allowedMethods"].map((p: any) => {
          return p;
        }),
    allowedHeaders: !item["allowedHeaders"]
      ? item["allowedHeaders"]
      : item["allowedHeaders"].map((p: any) => {
          return p;
        }),
    exposeHeaders: !item["exposeHeaders"]
      ? item["exposeHeaders"]
      : item["exposeHeaders"].map((p: any) => {
          return p;
        }),
    allowCredentials: item["allowCredentials"],
    terminateUnmatchedRequest: item["terminateUnmatchedRequest"],
    preflightResultMaxAge: item["preflightResultMaxAge"],
  };
}

export function aiGatewayCostLimitOverrideUpdateArraySerializer(
  result: Array<AiGatewayCostLimitOverrideUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayCostLimitOverrideUpdateSerializer(item);
  });
}

/** An ordered cost-budget override to update. */
export interface AiGatewayCostLimitOverrideUpdate {
  /** Authenticated token claims that must all match; claim names are case-sensitive. */
  claims?: AiGatewayNameValuePairUpdate[];
  /** Azure resource identifier of the API key selecting this override. */
  apiKeyResourceId?: string;
  /** Override budget in US dollars. */
  amount?: number;
}

export function aiGatewayCostLimitOverrideUpdateSerializer(
  item: AiGatewayCostLimitOverrideUpdate,
): any {
  return {
    claims: !item["claims"]
      ? item["claims"]
      : aiGatewayNameValuePairUpdateArraySerializer(item["claims"]),
    apiKeyResourceId: item["apiKeyResourceId"],
    amount: item["amount"],
  };
}

export function aiGatewayNameValuePairUpdateArraySerializer(
  result: Array<AiGatewayNameValuePairUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayNameValuePairUpdateSerializer(item);
  });
}

/** A name/value pair entry to update. */
export interface AiGatewayNameValuePairUpdate {
  /** Entry name. */
  name?: string;
  /** Entry value. */
  value?: string;
}

export function aiGatewayNameValuePairUpdateSerializer(item: AiGatewayNameValuePairUpdate): any {
  return { name: item["name"], value: item["value"] };
}

/** Outbound authentication settings to update on an external agent hook. */
export interface AiGatewayAgentHookAuthenticationUpdate {
  /** Managed identity configuration for the hook endpoint. */
  managedIdentity?: AiGatewayManagedIdentityAuthentication;
  /** Secret HTTP headers injected when calling the hook endpoint. */
  headers?: AiGatewaySecretHeaderUpdate[];
}

export function aiGatewayAgentHookAuthenticationUpdateSerializer(
  item: AiGatewayAgentHookAuthenticationUpdate,
): any {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderUpdateArraySerializer(item["headers"]),
  };
}

/** Lifecycle hook settings to update. */
export interface AiGatewayAgentHooksUpdate {
  /** Hook invoked before calling a tool. */
  preToolCall?: AiGatewayAgentHookUpdate;
  /** Hook invoked after calling a tool. */
  postToolCall?: AiGatewayAgentHookUpdate;
  /** Hook invoked before calling a model. */
  preModelCall?: AiGatewayAgentHookUpdate;
  /** Hook invoked after calling a model. */
  postModelCall?: AiGatewayAgentHookUpdate;
}

export function aiGatewayAgentHooksUpdateSerializer(item: AiGatewayAgentHooksUpdate): any {
  return {
    preToolCall: !item["preToolCall"]
      ? item["preToolCall"]
      : aiGatewayAgentHookUpdateSerializer(item["preToolCall"]),
    postToolCall: !item["postToolCall"]
      ? item["postToolCall"]
      : aiGatewayAgentHookUpdateSerializer(item["postToolCall"]),
    preModelCall: !item["preModelCall"]
      ? item["preModelCall"]
      : aiGatewayAgentHookUpdateSerializer(item["preModelCall"]),
    postModelCall: !item["postModelCall"]
      ? item["postModelCall"]
      : aiGatewayAgentHookUpdateSerializer(item["postModelCall"]),
  };
}

/** External hook settings to update. */
export interface AiGatewayAgentHookUpdate {
  /** Failure mode when the hook call fails. */
  mode?: AiGatewayFailureMode;
  /** Hook destination URL. */
  endpoint?: AiGatewayDestinationEndpointUpdate;
  /** Hook authentication settings. */
  authentication?: AiGatewayAgentHookAuthenticationUpdate;
  /** Literal, non-secret HTTP headers. */
  headers?: AiGatewayNameValuePairUpdate[];
}

export function aiGatewayAgentHookUpdateSerializer(item: AiGatewayAgentHookUpdate): any {
  return {
    mode: item["mode"],
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["endpoint"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayAgentHookAuthenticationUpdateSerializer(item["authentication"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewayNameValuePairUpdateArraySerializer(item["headers"]),
  };
}

export function aiGatewayFallbackTargetUpdateArraySerializer(
  result: Array<AiGatewayFallbackTargetUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayFallbackTargetUpdateSerializer(item);
  });
}

/** A fallback target to update on a model policy. */
export interface AiGatewayFallbackTargetUpdate {
  /** Resource identifier of a model in the same workspace. */
  modelId?: string;
}

export function aiGatewayFallbackTargetUpdateSerializer(item: AiGatewayFallbackTargetUpdate): any {
  return { modelId: item["modelId"] };
}

/** The response of a AiGatewayAliasResource list operation. */
export interface _AiGatewayAliasResourceListResult {
  /** The AiGatewayAliasResource items on this page */
  value: AiGatewayAliasResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayAliasResourceListResultDeserializer(
  item: any,
): _AiGatewayAliasResourceListResult {
  return {
    value: aiGatewayAliasResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayAliasResourceArraySerializer(
  result: Array<AiGatewayAliasResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasResourceSerializer(item);
  });
}

export function aiGatewayAliasResourceArrayDeserializer(
  result: Array<AiGatewayAliasResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayAliasResourceDeserializer(item);
  });
}

/** An AI Gateway resource. */
export interface AiGatewayResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: AiGatewayProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function aiGatewayResourceSerializer(item: AiGatewayResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: aiGatewayPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function aiGatewayResourceDeserializer(item: any): AiGatewayResource {
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
    properties: aiGatewayPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    eTag: item["eTag"],
  };
}

/** Properties of an AI Gateway. */
export interface AiGatewayProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
  /** Frontend configuration of the AI Gateway. */
  readonly frontend?: AiGatewayFrontend;
  /** Backend networking configuration. */
  backend?: AiGatewayBackend;
  /** Whether public network access is allowed for the AI Gateway. */
  publicNetworkAccess?: AiGatewayPublicNetworkAccess;
  /** Private endpoint connections associated with the AI Gateway. */
  readonly privateEndpointConnections?: AiGatewayPrivateEndpointConnection[];
}

export function aiGatewayPropertiesSerializer(item: AiGatewayProperties): any {
  return {
    backend: !item["backend"] ? item["backend"] : aiGatewayBackendSerializer(item["backend"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function aiGatewayPropertiesDeserializer(item: any): AiGatewayProperties {
  return {
    provisioningState: item["provisioningState"],
    frontend: !item["frontend"]
      ? item["frontend"]
      : aiGatewayFrontendDeserializer(item["frontend"]),
    backend: !item["backend"] ? item["backend"] : aiGatewayBackendDeserializer(item["backend"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : aiGatewayPrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** Frontend configuration of an AI Gateway. */
export interface AiGatewayFrontend {
  /** Default hostname used to invoke the AI Gateway. */
  readonly defaultHostname?: string;
}

export function aiGatewayFrontendDeserializer(item: any): AiGatewayFrontend {
  return {
    defaultHostname: item["defaultHostname"],
  };
}

/** Backend networking configuration of an AI Gateway. */
export interface AiGatewayBackend {
  /** Subnet through which the AI Gateway reaches backends. */
  subnet?: AiGatewaySubnet;
}

export function aiGatewayBackendSerializer(item: AiGatewayBackend): any {
  return { subnet: !item["subnet"] ? item["subnet"] : aiGatewaySubnetSerializer(item["subnet"]) };
}

export function aiGatewayBackendDeserializer(item: any): AiGatewayBackend {
  return {
    subnet: !item["subnet"] ? item["subnet"] : aiGatewaySubnetDeserializer(item["subnet"]),
  };
}

/** Subnet used by an AI Gateway. */
export interface AiGatewaySubnet {
  /** Resource identifier of the subnet. The subnet must be delegated to Microsoft.App/environments and be in the same region as the AI Gateway. */
  id: string;
}

export function aiGatewaySubnetSerializer(item: AiGatewaySubnet): any {
  return { id: item["id"] };
}

export function aiGatewaySubnetDeserializer(item: any): AiGatewaySubnet {
  return {
    id: item["id"],
  };
}

/** Public network access state for an AI Gateway. */
export enum KnownAiGatewayPublicNetworkAccess {
  /** Public network access is enabled. */
  Enabled = "Enabled",
  /** Public network access is disabled. */
  Disabled = "Disabled",
}

/**
 * Public network access state for an AI Gateway. \
 * {@link KnownAiGatewayPublicNetworkAccess} can be used interchangeably with AiGatewayPublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public network access is enabled. \
 * **Disabled**: Public network access is disabled.
 */
export type AiGatewayPublicNetworkAccess = string;

export function aiGatewayPrivateEndpointConnectionArraySerializer(
  result: Array<AiGatewayPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return aiGatewayPrivateEndpointConnectionSerializer(item);
  });
}

export function aiGatewayPrivateEndpointConnectionArrayDeserializer(
  result: Array<AiGatewayPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return aiGatewayPrivateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection of an AI Gateway. */
export interface AiGatewayPrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function aiGatewayPrivateEndpointConnectionSerializer(
  item: AiGatewayPrivateEndpointConnection,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayPrivateEndpointConnectionDeserializer(
  item: any,
): AiGatewayPrivateEndpointConnection {
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
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
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
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
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

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
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
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

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

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export type SkuTier = "Free" | "Basic" | "Standard" | "Premium";

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

/** Parameters for updating an AI Gateway. */
export interface AiGatewayUpdateParameters {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: AiGatewaySkuUpdate;
  /** AI Gateway properties to update. */
  properties?: AiGatewayUpdateProperties;
}

export function aiGatewayUpdateParametersSerializer(item: AiGatewayUpdateParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : aiGatewaySkuUpdateSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayUpdatePropertiesSerializer(item["properties"]),
  };
}

/** SKU fields to update on an AI Gateway. */
export interface AiGatewaySkuUpdate {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name?: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function aiGatewaySkuUpdateSerializer(item: AiGatewaySkuUpdate): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Properties for updating an AI Gateway. */
export interface AiGatewayUpdateProperties {
  /** Whether public network access is allowed for the AI Gateway. */
  publicNetworkAccess?: AiGatewayPublicNetworkAccess;
  /** Backend networking configuration. */
  backend?: AiGatewayBackendUpdate;
}

export function aiGatewayUpdatePropertiesSerializer(item: AiGatewayUpdateProperties): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    backend: !item["backend"] ? item["backend"] : aiGatewayBackendUpdateSerializer(item["backend"]),
  };
}

/** Backend networking configuration to update on an AI Gateway. */
export interface AiGatewayBackendUpdate {
  /** Subnet through which the AI Gateway reaches backends. Omit it to keep the current subnet, or set it to null to remove it. */
  subnet?: AiGatewaySubnetUpdate;
}

export function aiGatewayBackendUpdateSerializer(item: AiGatewayBackendUpdate): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : aiGatewaySubnetUpdateSerializer(item["subnet"]),
  };
}

/** Subnet fields to update on an AI Gateway. */
export interface AiGatewaySubnetUpdate {
  /** Resource identifier of the subnet. The subnet must be delegated to Microsoft.App/environments and be in the same region as the AI Gateway. */
  id?: string;
}

export function aiGatewaySubnetUpdateSerializer(item: AiGatewaySubnetUpdate): any {
  return { id: item["id"] };
}

/** The response of a AiGatewayResource list operation. */
export interface _AiGatewayResourceListResult {
  /** The AiGatewayResource items on this page */
  value: AiGatewayResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayResourceListResultDeserializer(item: any): _AiGatewayResourceListResult {
  return {
    value: aiGatewayResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayResourceArraySerializer(result: Array<AiGatewayResource>): any[] {
  return result.map((item) => {
    return aiGatewayResourceSerializer(item);
  });
}

export function aiGatewayResourceArrayDeserializer(result: Array<AiGatewayResource>): any[] {
  return result.map((item) => {
    return aiGatewayResourceDeserializer(item);
  });
}

/** The response of a AiGatewayPrivateEndpointConnection list operation. */
export interface _AiGatewayPrivateEndpointConnectionListResult {
  /** The AiGatewayPrivateEndpointConnection items on this page */
  value: AiGatewayPrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayPrivateEndpointConnectionListResultDeserializer(
  item: any,
): _AiGatewayPrivateEndpointConnectionListResult {
  return {
    value: aiGatewayPrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A private link resource of an AI Gateway. */
export interface AiGatewayPrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function aiGatewayPrivateLinkResourceDeserializer(item: any): AiGatewayPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
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
  };
}

/** The response of a AiGatewayPrivateLinkResource list operation. */
export interface _AiGatewayPrivateLinkResourceListResult {
  /** The AiGatewayPrivateLinkResource items on this page */
  value: AiGatewayPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayPrivateLinkResourceListResultDeserializer(
  item: any,
): _AiGatewayPrivateLinkResourceListResult {
  return {
    value: aiGatewayPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayPrivateLinkResourceArrayDeserializer(
  result: Array<AiGatewayPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayPrivateLinkResourceDeserializer(item);
  });
}

/** An AI Gateway workspace resource. */
export interface AiGatewayWorkspaceResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayWorkspaceProperties;
}

export function aiGatewayWorkspaceResourceDeserializer(item: any): AiGatewayWorkspaceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayWorkspacePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway workspace. */
export interface AiGatewayWorkspaceProperties {
  /** Display name of the workspace. */
  readonly displayName: string;
  /** Description of the workspace. */
  readonly description: string;
  /** Inline governance policies for the default workspace. */
  policies?: AiGatewayPolicy[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayWorkspacePropertiesDeserializer(item: any): AiGatewayWorkspaceProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArrayDeserializer(item["policies"]),
    provisioningState: item["provisioningState"],
  };
}

/** Parameters for updating an AI Gateway workspace. */
export interface AiGatewayWorkspaceUpdateParameters {
  /** Workspace properties to update. */
  properties?: AiGatewayWorkspaceUpdateProperties;
}

export function aiGatewayWorkspaceUpdateParametersSerializer(
  item: AiGatewayWorkspaceUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayWorkspaceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties for updating an AI Gateway workspace. */
export interface AiGatewayWorkspaceUpdateProperties {
  /** Inline governance policies to replace on the default workspace. */
  policies?: AiGatewayPolicyUpdate[];
}

export function aiGatewayWorkspaceUpdatePropertiesSerializer(
  item: AiGatewayWorkspaceUpdateProperties,
): any {
  return {
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyUpdateArraySerializer(item["policies"]),
  };
}

/** The response of a AiGatewayWorkspaceResource list operation. */
export interface _AiGatewayWorkspaceResourceListResult {
  /** The AiGatewayWorkspaceResource items on this page */
  value: AiGatewayWorkspaceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayWorkspaceResourceListResultDeserializer(
  item: any,
): _AiGatewayWorkspaceResourceListResult {
  return {
    value: aiGatewayWorkspaceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayWorkspaceResourceArrayDeserializer(
  result: Array<AiGatewayWorkspaceResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayWorkspaceResourceDeserializer(item);
  });
}

/** An AI Gateway model provider resource. */
export interface AiGatewayModelProviderResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayModelProviderProperties;
}

export function aiGatewayModelProviderResourceSerializer(
  item: AiGatewayModelProviderResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelProviderPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayModelProviderResourceDeserializer(
  item: any,
): AiGatewayModelProviderResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelProviderPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway model provider. */
export interface AiGatewayModelProviderProperties {
  /** Model provider type. This value cannot be changed after creation. */
  modelProviderType: AiGatewayModelProviderKind;
  /** Display name of the model provider. */
  displayName: string;
  /** Description of the model provider. */
  description?: string;
  /** Foundry configuration. Required when modelProviderType is Foundry. */
  foundry?: AiGatewayFoundryProviderConfiguration;
  /** Custom provider configuration. Required when modelProviderType is Custom. */
  custom?: AiGatewayCustomProviderConfiguration;
  /** Outbound authentication configuration. */
  authentication?: AiGatewayModelProviderAuthentication;
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayModelProviderPropertiesSerializer(
  item: AiGatewayModelProviderProperties,
): any {
  return {
    modelProviderType: item["modelProviderType"],
    displayName: item["displayName"],
    description: item["description"],
    foundry: !item["foundry"]
      ? item["foundry"]
      : aiGatewayFoundryProviderConfigurationSerializer(item["foundry"]),
    custom: !item["custom"]
      ? item["custom"]
      : aiGatewayCustomProviderConfigurationSerializer(item["custom"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayModelProviderAuthenticationSerializer(item["authentication"]),
  };
}

export function aiGatewayModelProviderPropertiesDeserializer(
  item: any,
): AiGatewayModelProviderProperties {
  return {
    modelProviderType: item["modelProviderType"],
    displayName: item["displayName"],
    description: item["description"],
    foundry: !item["foundry"]
      ? item["foundry"]
      : aiGatewayFoundryProviderConfigurationDeserializer(item["foundry"]),
    custom: !item["custom"]
      ? item["custom"]
      : aiGatewayCustomProviderConfigurationDeserializer(item["custom"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayModelProviderAuthenticationDeserializer(item["authentication"]),
    provisioningState: item["provisioningState"],
  };
}

/** The type of an AI model provider. */
export enum KnownAiGatewayModelProviderKind {
  /** Azure AI Foundry provider. */
  Foundry = "Foundry",
  /** Custom model provider. */
  Custom = "Custom",
  /** GitHub model provider. */
  GitHub = "GitHub",
}

/**
 * The type of an AI model provider. \
 * {@link KnownAiGatewayModelProviderKind} can be used interchangeably with AiGatewayModelProviderKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Foundry**: Azure AI Foundry provider. \
 * **Custom**: Custom model provider. \
 * **GitHub**: GitHub model provider.
 */
export type AiGatewayModelProviderKind = string;

/** Foundry model provider configuration. */
export interface AiGatewayFoundryProviderConfiguration {
  /** Foundry endpoint. */
  endpoint?: AiGatewayDestinationEndpoint;
  /** Cognitive Services account resource identifiers available to this provider. */
  resourceIds: string[];
}

export function aiGatewayFoundryProviderConfigurationSerializer(
  item: AiGatewayFoundryProviderConfiguration,
): any {
  return {
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointSerializer(item["endpoint"]),
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

export function aiGatewayFoundryProviderConfigurationDeserializer(
  item: any,
): AiGatewayFoundryProviderConfiguration {
  return {
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["endpoint"]),
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Custom model provider configuration. */
export interface AiGatewayCustomProviderConfiguration {
  /** Provider base endpoint. */
  endpoint: AiGatewayDestinationEndpoint;
}

export function aiGatewayCustomProviderConfigurationSerializer(
  item: AiGatewayCustomProviderConfiguration,
): any {
  return { endpoint: aiGatewayDestinationEndpointSerializer(item["endpoint"]) };
}

export function aiGatewayCustomProviderConfigurationDeserializer(
  item: any,
): AiGatewayCustomProviderConfiguration {
  return {
    endpoint: aiGatewayDestinationEndpointDeserializer(item["endpoint"]),
  };
}

/** Outbound authentication configuration for a model provider. */
export interface AiGatewayModelProviderAuthentication {
  /** GitHub App credentials when modelProviderType is GitHub. */
  githubApp?: AiGatewayGitHubAppAuthentication;
  /** Managed identity configuration when modelProviderType is Foundry. */
  managedIdentity?: AiGatewayManagedIdentityAuthentication;
  /** Secret HTTP headers injected when calling the model provider. */
  headers?: AiGatewaySecretHeader[];
}

export function aiGatewayModelProviderAuthenticationSerializer(
  item: AiGatewayModelProviderAuthentication,
): any {
  return {
    githubApp: !item["githubApp"]
      ? item["githubApp"]
      : aiGatewayGitHubAppAuthenticationSerializer(item["githubApp"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArraySerializer(item["headers"]),
  };
}

export function aiGatewayModelProviderAuthenticationDeserializer(
  item: any,
): AiGatewayModelProviderAuthentication {
  return {
    githubApp: !item["githubApp"]
      ? item["githubApp"]
      : aiGatewayGitHubAppAuthenticationDeserializer(item["githubApp"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationDeserializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArrayDeserializer(item["headers"]),
  };
}

/** GitHub App credentials for a GitHub model provider. */
export interface AiGatewayGitHubAppAuthentication {
  /** GitHub App identifier. */
  appId?: string;
  /** GitHub App installation identifier. */
  installationId?: string;
  /** GitHub App private key. Omitted from ordinary read responses. */
  privateKey?: string;
}

export function aiGatewayGitHubAppAuthenticationSerializer(
  item: AiGatewayGitHubAppAuthentication,
): any {
  return {
    appId: item["appId"],
    installationId: item["installationId"],
    privateKey: item["privateKey"],
  };
}

export function aiGatewayGitHubAppAuthenticationDeserializer(
  item: any,
): AiGatewayGitHubAppAuthentication {
  return {
    appId: item["appId"],
    installationId: item["installationId"],
    privateKey: item["privateKey"],
  };
}

/** Parameters for updating an AI Gateway model provider. */
export interface AiGatewayModelProviderUpdateParameters {
  /** Model provider properties to update. */
  properties?: AiGatewayModelProviderUpdateProperties;
}

export function aiGatewayModelProviderUpdateParametersSerializer(
  item: AiGatewayModelProviderUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelProviderUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties for updating an AI Gateway model provider. */
export interface AiGatewayModelProviderUpdateProperties {
  /** Display name of the model provider. */
  displayName?: string;
  /** Description of the model provider. */
  description?: string;
  /** Foundry configuration. */
  foundry?: AiGatewayFoundryProviderConfigurationUpdate;
  /** Custom provider configuration. */
  custom?: AiGatewayCustomProviderConfigurationUpdate;
  /** Outbound authentication configuration. */
  authentication?: AiGatewayModelProviderAuthenticationUpdate;
}

export function aiGatewayModelProviderUpdatePropertiesSerializer(
  item: AiGatewayModelProviderUpdateProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    foundry: !item["foundry"]
      ? item["foundry"]
      : aiGatewayFoundryProviderConfigurationUpdateSerializer(item["foundry"]),
    custom: !item["custom"]
      ? item["custom"]
      : aiGatewayCustomProviderConfigurationUpdateSerializer(item["custom"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayModelProviderAuthenticationUpdateSerializer(item["authentication"]),
  };
}

/** Foundry model provider settings to update. */
export interface AiGatewayFoundryProviderConfigurationUpdate {
  /** Foundry endpoint. */
  endpoint?: AiGatewayDestinationEndpointUpdate;
  /** Cognitive Services account resource identifiers available to this provider. */
  resourceIds?: string[];
}

export function aiGatewayFoundryProviderConfigurationUpdateSerializer(
  item: AiGatewayFoundryProviderConfigurationUpdate,
): any {
  return {
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["endpoint"]),
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Custom model provider settings to update. */
export interface AiGatewayCustomProviderConfigurationUpdate {
  /** Provider base endpoint. */
  endpoint?: AiGatewayDestinationEndpointUpdate;
}

export function aiGatewayCustomProviderConfigurationUpdateSerializer(
  item: AiGatewayCustomProviderConfigurationUpdate,
): any {
  return {
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["endpoint"]),
  };
}

/** Outbound authentication configuration to update on a model provider. */
export interface AiGatewayModelProviderAuthenticationUpdate {
  /** GitHub App credentials when modelProviderType is GitHub. */
  githubApp?: AiGatewayGitHubAppAuthentication;
  /** Managed identity configuration when modelProviderType is Foundry. */
  managedIdentity?: AiGatewayManagedIdentityAuthentication;
  /** Secret HTTP headers injected when calling the model provider. */
  headers?: AiGatewaySecretHeaderUpdate[];
}

export function aiGatewayModelProviderAuthenticationUpdateSerializer(
  item: AiGatewayModelProviderAuthenticationUpdate,
): any {
  return {
    githubApp: !item["githubApp"]
      ? item["githubApp"]
      : aiGatewayGitHubAppAuthenticationSerializer(item["githubApp"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderUpdateArraySerializer(item["headers"]),
  };
}

/** The response of a AiGatewayModelProviderResource list operation. */
export interface _AiGatewayModelProviderResourceListResult {
  /** The AiGatewayModelProviderResource items on this page */
  value: AiGatewayModelProviderResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayModelProviderResourceListResultDeserializer(
  item: any,
): _AiGatewayModelProviderResourceListResult {
  return {
    value: aiGatewayModelProviderResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayModelProviderResourceArraySerializer(
  result: Array<AiGatewayModelProviderResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelProviderResourceSerializer(item);
  });
}

export function aiGatewayModelProviderResourceArrayDeserializer(
  result: Array<AiGatewayModelProviderResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelProviderResourceDeserializer(item);
  });
}

/** Secret values configured on a model provider. */
export interface AiGatewayModelProviderSecrets {
  /** Outbound authentication configuration including secret values. */
  authentication?: AiGatewayModelProviderSecretAuthentication;
}

export function aiGatewayModelProviderSecretsDeserializer(
  item: any,
): AiGatewayModelProviderSecrets {
  return {
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayModelProviderSecretAuthenticationDeserializer(item["authentication"]),
  };
}

/** Authentication settings returned by the model-provider secret retrieval action. */
export interface AiGatewayModelProviderSecretAuthentication {
  /** GitHub App credentials when modelProviderType is GitHub. */
  githubApp?: AiGatewayModelProviderSecretGitHubAppAuthentication;
  /** Managed identity configuration when modelProviderType is Foundry. */
  managedIdentity?: AiGatewayManagedIdentityAuthentication;
  /** Secret HTTP headers injected when calling the model provider. */
  headers?: AiGatewaySecretHeaderValue[];
}

export function aiGatewayModelProviderSecretAuthenticationDeserializer(
  item: any,
): AiGatewayModelProviderSecretAuthentication {
  return {
    githubApp: !item["githubApp"]
      ? item["githubApp"]
      : aiGatewayModelProviderSecretGitHubAppAuthenticationDeserializer(item["githubApp"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayManagedIdentityAuthenticationDeserializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderValueArrayDeserializer(item["headers"]),
  };
}

/** GitHub App credentials returned by the model-provider secret retrieval action. */
export interface AiGatewayModelProviderSecretGitHubAppAuthentication {
  /** GitHub App identifier. */
  appId?: string;
  /** GitHub App installation identifier. */
  installationId?: string;
  /** GitHub App private key. */
  privateKey?: string;
}

export function aiGatewayModelProviderSecretGitHubAppAuthenticationDeserializer(
  item: any,
): AiGatewayModelProviderSecretGitHubAppAuthentication {
  return {
    appId: item["appId"],
    installationId: item["installationId"],
    privateKey: item["privateKey"],
  };
}

export function aiGatewaySecretHeaderValueArrayDeserializer(
  result: Array<AiGatewaySecretHeaderValue>,
): any[] {
  return result.map((item) => {
    return aiGatewaySecretHeaderValueDeserializer(item);
  });
}

/** A secret HTTP header returned by a secret-retrieval action. */
export interface AiGatewaySecretHeaderValue {
  /** HTTP header name. */
  name: string;
  /** Secret HTTP header value. */
  value?: string;
}

export function aiGatewaySecretHeaderValueDeserializer(item: any): AiGatewaySecretHeaderValue {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** An AI Gateway model resource. */
export interface AiGatewayModelResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayModelProperties;
}

export function aiGatewayModelResourceSerializer(item: AiGatewayModelResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayModelResourceDeserializer(item: any): AiGatewayModelResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway model. */
export interface AiGatewayModelProperties {
  /** Display name of the model. */
  displayName: string;
  /** Description of the model. */
  description?: string;
  /** Parent model provider type. */
  readonly providerKind?: AiGatewayModelProviderKind;
  /** Provider deployment details. */
  deployment: AiGatewayModelDeployment;
  /** API-to-backend-path mappings served by this model. */
  endpoints?: AiGatewayModelEndpoint[];
  /** Runtime endpoints supported by this model. */
  supportedEndpoints?: string[];
  /** Inline policies applied to this model. */
  policies?: AiGatewayPolicy[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayModelPropertiesSerializer(item: AiGatewayModelProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    deployment: aiGatewayModelDeploymentSerializer(item["deployment"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayModelEndpointArraySerializer(item["endpoints"]),
    supportedEndpoints: !item["supportedEndpoints"]
      ? item["supportedEndpoints"]
      : item["supportedEndpoints"].map((p: any) => {
          return p;
        }),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArraySerializer(item["policies"]),
  };
}

export function aiGatewayModelPropertiesDeserializer(item: any): AiGatewayModelProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    providerKind: item["providerKind"],
    deployment: aiGatewayModelDeploymentDeserializer(item["deployment"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayModelEndpointArrayDeserializer(item["endpoints"]),
    supportedEndpoints: !item["supportedEndpoints"]
      ? item["supportedEndpoints"]
      : item["supportedEndpoints"].map((p: any) => {
          return p;
        }),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArrayDeserializer(item["policies"]),
    provisioningState: item["provisioningState"],
  };
}

/** Deployment details for an AI Gateway model. */
export interface AiGatewayModelDeployment {
  /** ARM resource identifier of the provider deployment. */
  resourceId?: string;
  /** Provider-side model name. */
  modelName: string;
  /** Provider-side model version. */
  modelVersion?: string;
}

export function aiGatewayModelDeploymentSerializer(item: AiGatewayModelDeployment): any {
  return {
    resourceId: item["resourceId"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
  };
}

export function aiGatewayModelDeploymentDeserializer(item: any): AiGatewayModelDeployment {
  return {
    resourceId: item["resourceId"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
  };
}

export function aiGatewayModelEndpointArraySerializer(
  result: Array<AiGatewayModelEndpoint>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelEndpointSerializer(item);
  });
}

export function aiGatewayModelEndpointArrayDeserializer(
  result: Array<AiGatewayModelEndpoint>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelEndpointDeserializer(item);
  });
}

/** Maps a canonical AI Gateway API identifier to a relative backend path served by the model provider. */
export interface AiGatewayModelEndpoint {
  /** Canonical AI Gateway API identifier (for example, v1/chat/completions, v1/responses, v1/messages, or v1/embeddings). */
  api: string;
  /** Backend path relative to the model provider's base endpoint, starting with '/'. */
  path: string;
}

export function aiGatewayModelEndpointSerializer(item: AiGatewayModelEndpoint): any {
  return { api: item["api"], path: item["path"] };
}

export function aiGatewayModelEndpointDeserializer(item: any): AiGatewayModelEndpoint {
  return {
    api: item["api"],
    path: item["path"],
  };
}

/** Parameters for updating an AI Gateway model. */
export interface AiGatewayModelUpdateParameters {
  /** Model properties to update. */
  properties?: AiGatewayModelUpdateProperties;
}

export function aiGatewayModelUpdateParametersSerializer(
  item: AiGatewayModelUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayModelUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties for updating an AI Gateway model. */
export interface AiGatewayModelUpdateProperties {
  /** Display name of the model. */
  displayName?: string;
  /** Description of the model. */
  description?: string;
  /** Provider deployment details. */
  deployment?: AiGatewayModelDeploymentUpdate;
  /** API-to-backend-path mappings served by this model. */
  endpoints?: AiGatewayModelEndpointUpdate[];
  /** Inline policies applied to this model. */
  policies?: AiGatewayPolicyUpdate[];
  /** Runtime endpoints supported by this model. */
  supportedEndpoints?: string[];
}

export function aiGatewayModelUpdatePropertiesSerializer(
  item: AiGatewayModelUpdateProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    deployment: !item["deployment"]
      ? item["deployment"]
      : aiGatewayModelDeploymentUpdateSerializer(item["deployment"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayModelEndpointUpdateArraySerializer(item["endpoints"]),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyUpdateArraySerializer(item["policies"]),
    supportedEndpoints: !item["supportedEndpoints"]
      ? item["supportedEndpoints"]
      : item["supportedEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** Deployment details to update on an AI Gateway model. */
export interface AiGatewayModelDeploymentUpdate {
  /** ARM resource identifier of the provider deployment. */
  resourceId?: string;
  /** Provider-side model name. */
  modelName?: string;
  /** Provider-side model version. */
  modelVersion?: string;
}

export function aiGatewayModelDeploymentUpdateSerializer(
  item: AiGatewayModelDeploymentUpdate,
): any {
  return {
    resourceId: item["resourceId"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
  };
}

export function aiGatewayModelEndpointUpdateArraySerializer(
  result: Array<AiGatewayModelEndpointUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelEndpointUpdateSerializer(item);
  });
}

/** A model endpoint mapping to update. */
export interface AiGatewayModelEndpointUpdate {
  /** Canonical AI Gateway API identifier (for example, v1/chat/completions, v1/responses, v1/messages, or v1/embeddings). */
  api?: string;
  /** Backend path relative to the model provider's base endpoint, starting with '/'. */
  path?: string;
}

export function aiGatewayModelEndpointUpdateSerializer(item: AiGatewayModelEndpointUpdate): any {
  return { api: item["api"], path: item["path"] };
}

/** The response of a AiGatewayModelResource list operation. */
export interface _AiGatewayModelResourceListResult {
  /** The AiGatewayModelResource items on this page */
  value: AiGatewayModelResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayModelResourceListResultDeserializer(
  item: any,
): _AiGatewayModelResourceListResult {
  return {
    value: aiGatewayModelResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayModelResourceArraySerializer(
  result: Array<AiGatewayModelResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelResourceSerializer(item);
  });
}

export function aiGatewayModelResourceArrayDeserializer(
  result: Array<AiGatewayModelResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayModelResourceDeserializer(item);
  });
}

/** An AI Gateway tool server resource. */
export interface AiGatewayToolServerResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayToolServerProperties;
}

export function aiGatewayToolServerResourceSerializer(item: AiGatewayToolServerResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayToolServerPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayToolServerResourceDeserializer(item: any): AiGatewayToolServerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayToolServerPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway tool server. */
export interface AiGatewayToolServerProperties {
  /** Display name of the tool server. */
  displayName?: string;
  /** Description of the tool server. */
  description?: string;
  /** Whether the tool server is available to callers. */
  accessState?: AiGatewayToolServerAccessState;
  /** Tool server type. */
  toolServerType: AiGatewayToolServerType;
  /** Runtime API versions exposed by this tool server. */
  versions?: string[];
  /** Tool names or patterns explicitly allowed. */
  allowList?: string[];
  /** Tool names or patterns explicitly blocked. */
  blockList?: string[];
  /** Endpoint configurations exposed by this tool server. */
  endpoints?: AiGatewayToolServerEndpoint[];
  /** Inline policies applied to this tool server. */
  policies?: AiGatewayPolicy[];
  /** Runtime path for the tool server. */
  path?: string;
  /** Whether a subscription is required to invoke the tool server. */
  subscriptionRequired?: boolean;
  /** Read-only invocation URLs, with optional SDK metadata when endpoint enrichment is enabled. */
  readonly gatewayEndpoints?: AiGatewayEndpoint[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayToolServerPropertiesSerializer(item: AiGatewayToolServerProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    accessState: item["accessState"],
    toolServerType: item["toolServerType"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    allowList: !item["allowList"]
      ? item["allowList"]
      : item["allowList"].map((p: any) => {
          return p;
        }),
    blockList: !item["blockList"]
      ? item["blockList"]
      : item["blockList"].map((p: any) => {
          return p;
        }),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayToolServerEndpointArraySerializer(item["endpoints"]),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArraySerializer(item["policies"]),
    path: item["path"],
    subscriptionRequired: item["subscriptionRequired"],
  };
}

export function aiGatewayToolServerPropertiesDeserializer(
  item: any,
): AiGatewayToolServerProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    accessState: item["accessState"],
    toolServerType: item["toolServerType"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    allowList: !item["allowList"]
      ? item["allowList"]
      : item["allowList"].map((p: any) => {
          return p;
        }),
    blockList: !item["blockList"]
      ? item["blockList"]
      : item["blockList"].map((p: any) => {
          return p;
        }),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayToolServerEndpointArrayDeserializer(item["endpoints"]),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyArrayDeserializer(item["policies"]),
    path: item["path"],
    subscriptionRequired: item["subscriptionRequired"],
    gatewayEndpoints: !item["gatewayEndpoints"]
      ? item["gatewayEndpoints"]
      : aiGatewayEndpointArrayDeserializer(item["gatewayEndpoints"]),
    provisioningState: item["provisioningState"],
  };
}

/** Tool server access state. */
export enum KnownAiGatewayToolServerAccessState {
  /** Tool server is available. */
  Active = "active",
  /** Tool server is blocked. */
  Blocked = "blocked",
}

/**
 * Tool server access state. \
 * {@link KnownAiGatewayToolServerAccessState} can be used interchangeably with AiGatewayToolServerAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Tool server is available. \
 * **blocked**: Tool server is blocked.
 */
export type AiGatewayToolServerAccessState = string;

/** How a tool server is exposed. */
export enum KnownAiGatewayToolServerType {
  /** Federates one or more MCP servers. */
  Mcp = "mcp",
  /** Exposes tools generated from OpenAPI documents. */
  OpenApi = "openApi",
  /** Exposes a connector-backed tool server. */
  Connector = "connector",
}

/**
 * How a tool server is exposed. \
 * {@link KnownAiGatewayToolServerType} can be used interchangeably with AiGatewayToolServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **mcp**: Federates one or more MCP servers. \
 * **openApi**: Exposes tools generated from OpenAPI documents. \
 * **connector**: Exposes a connector-backed tool server.
 */
export type AiGatewayToolServerType = string;

export function aiGatewayToolServerEndpointArraySerializer(
  result: Array<AiGatewayToolServerEndpoint>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerEndpointSerializer(item);
  });
}

export function aiGatewayToolServerEndpointArrayDeserializer(
  result: Array<AiGatewayToolServerEndpoint>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerEndpointDeserializer(item);
  });
}

/** A tool server endpoint. */
export interface AiGatewayToolServerEndpoint {
  /** Stable endpoint identifier. Up to 64 alphanumeric characters or hyphens, starting and ending with an alphanumeric character. Generated when omitted. */
  id?: string;
  /** Optional namespace used to prefix tool names. */
  namespace?: string;
  /** Endpoint type. */
  kind: AiGatewayToolServerEndpointSourceKind;
  /** Backend MCP configuration. Required when kind is mcp. */
  mcp?: AiGatewayMcpUrlConfiguration;
  /** OpenAPI configuration. Required when kind is openApi. */
  openApi?: AiGatewayOpenApiConfiguration;
  /** Backend authentication configuration. */
  authentication?: AiGatewayToolServerAuthentication;
  /** Upstream tool names or glob patterns to expose. */
  tools?: string[];
  /** Failure mode when the endpoint fails. Defaults to failOpen. */
  mode?: AiGatewayFailureMode;
}

export function aiGatewayToolServerEndpointSerializer(item: AiGatewayToolServerEndpoint): any {
  return {
    id: item["id"],
    namespace: item["namespace"],
    kind: item["kind"],
    mcp: !item["mcp"] ? item["mcp"] : aiGatewayMcpUrlConfigurationSerializer(item["mcp"]),
    openApi: !item["openApi"]
      ? item["openApi"]
      : aiGatewayOpenApiConfigurationSerializer(item["openApi"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayToolServerAuthenticationSerializer(item["authentication"]),
    tools: !item["tools"]
      ? item["tools"]
      : item["tools"].map((p: any) => {
          return p;
        }),
    mode: item["mode"],
  };
}

export function aiGatewayToolServerEndpointDeserializer(item: any): AiGatewayToolServerEndpoint {
  return {
    id: item["id"],
    namespace: item["namespace"],
    kind: item["kind"],
    mcp: !item["mcp"] ? item["mcp"] : aiGatewayMcpUrlConfigurationDeserializer(item["mcp"]),
    openApi: !item["openApi"]
      ? item["openApi"]
      : aiGatewayOpenApiConfigurationDeserializer(item["openApi"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayToolServerAuthenticationDeserializer(item["authentication"]),
    tools: !item["tools"]
      ? item["tools"]
      : item["tools"].map((p: any) => {
          return p;
        }),
    mode: item["mode"],
  };
}

/** Endpoint source kind. */
export enum KnownAiGatewayToolServerEndpointSourceKind {
  /** MCP server endpoint. */
  Mcp = "mcp",
  /** OpenAPI document endpoint. */
  OpenApi = "openApi",
}

/**
 * Endpoint source kind. \
 * {@link KnownAiGatewayToolServerEndpointSourceKind} can be used interchangeably with AiGatewayToolServerEndpointSourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **mcp**: MCP server endpoint. \
 * **openApi**: OpenAPI document endpoint.
 */
export type AiGatewayToolServerEndpointSourceKind = string;

/** MCP endpoint configuration. */
export interface AiGatewayMcpUrlConfiguration {
  /** Backend MCP server endpoint. */
  endpoint: AiGatewayDestinationEndpoint;
  /** MCP transport. */
  transport?: AiGatewayToolServerMcpTransport;
}

export function aiGatewayMcpUrlConfigurationSerializer(item: AiGatewayMcpUrlConfiguration): any {
  return {
    endpoint: aiGatewayDestinationEndpointSerializer(item["endpoint"]),
    transport: item["transport"],
  };
}

export function aiGatewayMcpUrlConfigurationDeserializer(item: any): AiGatewayMcpUrlConfiguration {
  return {
    endpoint: aiGatewayDestinationEndpointDeserializer(item["endpoint"]),
    transport: item["transport"],
  };
}

/** MCP transport protocol. */
export enum KnownAiGatewayToolServerMcpTransport {
  /** Streamable HTTP transport. */
  StreamableHttp = "streamableHttp",
}

/**
 * MCP transport protocol. \
 * {@link KnownAiGatewayToolServerMcpTransport} can be used interchangeably with AiGatewayToolServerMcpTransport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **streamableHttp**: Streamable HTTP transport.
 */
export type AiGatewayToolServerMcpTransport = string;

/** OpenAPI-backed MCP endpoint configuration. */
export interface AiGatewayOpenApiConfiguration {
  /** OpenAPI document source. */
  specSource: AiGatewayOpenApiSpecSource;
}

export function aiGatewayOpenApiConfigurationSerializer(item: AiGatewayOpenApiConfiguration): any {
  return { specSource: aiGatewayOpenApiSpecSourceSerializer(item["specSource"]) };
}

export function aiGatewayOpenApiConfigurationDeserializer(
  item: any,
): AiGatewayOpenApiConfiguration {
  return {
    specSource: aiGatewayOpenApiSpecSourceDeserializer(item["specSource"]),
  };
}

/** Source of an OpenAPI document. */
export interface AiGatewayOpenApiSpecSource {
  /** Source type. */
  type: AiGatewayToolServerOpenApiSourceType;
  /** Base64-encoded OpenAPI document. Required when type is inline. */
  contentBase64?: Uint8Array;
  /** URL of the OpenAPI document. Required when type is url. */
  url?: string;
}

export function aiGatewayOpenApiSpecSourceSerializer(item: AiGatewayOpenApiSpecSource): any {
  return {
    type: item["type"],
    contentBase64: !item["contentBase64"]
      ? item["contentBase64"]
      : uint8ArrayToString(item["contentBase64"], "base64"),
    url: item["url"],
  };
}

export function aiGatewayOpenApiSpecSourceDeserializer(item: any): AiGatewayOpenApiSpecSource {
  return {
    type: item["type"],
    contentBase64: !item["contentBase64"]
      ? item["contentBase64"]
      : typeof item["contentBase64"] === "string"
        ? stringToUint8Array(item["contentBase64"], "base64")
        : item["contentBase64"],
    url: item["url"],
  };
}

/** OpenAPI document source type. */
export enum KnownAiGatewayToolServerOpenApiSourceType {
  /** Inline OpenAPI document. */
  Inline = "inline",
  /** OpenAPI document fetched from a URL. */
  Url = "url",
}

/**
 * OpenAPI document source type. \
 * {@link KnownAiGatewayToolServerOpenApiSourceType} can be used interchangeably with AiGatewayToolServerOpenApiSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inline**: Inline OpenAPI document. \
 * **url**: OpenAPI document fetched from a URL.
 */
export type AiGatewayToolServerOpenApiSourceType = string;

/** Outbound authentication for a tool server endpoint. */
export interface AiGatewayToolServerAuthentication {
  /** Static headers injected when calling the endpoint. */
  headers?: AiGatewaySecretHeader[];
  /** OAuth 2.0 configuration. */
  oauth2?: AiGatewayToolServerOauth2Authentication;
  /** Managed identity configuration. */
  managedIdentity?: AiGatewayToolServerManagedIdentityAuthentication;
}

export function aiGatewayToolServerAuthenticationSerializer(
  item: AiGatewayToolServerAuthentication,
): any {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArraySerializer(item["headers"]),
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : aiGatewayToolServerOauth2AuthenticationSerializer(item["oauth2"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayToolServerManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
  };
}

export function aiGatewayToolServerAuthenticationDeserializer(
  item: any,
): AiGatewayToolServerAuthentication {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderArrayDeserializer(item["headers"]),
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : aiGatewayToolServerOauth2AuthenticationDeserializer(item["oauth2"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayToolServerManagedIdentityAuthenticationDeserializer(item["managedIdentity"]),
  };
}

/** OAuth 2.0 authentication for a tool server endpoint. */
export interface AiGatewayToolServerOauth2Authentication {
  /** Expected OAuth authorization-server issuer for remote MCP discovery. */
  issuer?: string;
  /** OAuth authorization endpoint. */
  authorizationEndpoint?: AiGatewayDestinationEndpoint;
  /** OAuth token endpoint. */
  tokenEndpoint?: AiGatewayDestinationEndpoint;
  /** OAuth client identifier. */
  clientId?: string;
  /** OAuth client secret. */
  clientSecret?: string;
  /** OAuth scopes to request. */
  scopes?: string[];
  /** OAuth grant type. */
  grantType?: AiGatewayToolServerOauth2GrantType;
  /** Chained token-exchange configuration. */
  tokenExchange?: AiGatewayToolServerTokenExchange;
  /** Additional authorization endpoint parameters. */
  authorizationParameters?: AiGatewayToolServerOauth2Parameter[];
  /** Additional token endpoint parameters. */
  tokenParameters?: AiGatewayToolServerOauth2Parameter[];
  /** Current OAuth connection status. */
  readonly status?: string;
  /** Login link used to complete interactive authorization. */
  readonly loginLink?: string;
  /** UTC timestamp of the last OAuth connection-status transition. */
  readonly statusUpdatedUtc?: Date;
}

export function aiGatewayToolServerOauth2AuthenticationSerializer(
  item: AiGatewayToolServerOauth2Authentication,
): any {
  return {
    issuer: item["issuer"],
    authorizationEndpoint: !item["authorizationEndpoint"]
      ? item["authorizationEndpoint"]
      : aiGatewayDestinationEndpointSerializer(item["authorizationEndpoint"]),
    tokenEndpoint: !item["tokenEndpoint"]
      ? item["tokenEndpoint"]
      : aiGatewayDestinationEndpointSerializer(item["tokenEndpoint"]),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    grantType: item["grantType"],
    tokenExchange: !item["tokenExchange"]
      ? item["tokenExchange"]
      : aiGatewayToolServerTokenExchangeSerializer(item["tokenExchange"]),
    authorizationParameters: !item["authorizationParameters"]
      ? item["authorizationParameters"]
      : aiGatewayToolServerOauth2ParameterArraySerializer(item["authorizationParameters"]),
    tokenParameters: !item["tokenParameters"]
      ? item["tokenParameters"]
      : aiGatewayToolServerOauth2ParameterArraySerializer(item["tokenParameters"]),
  };
}

export function aiGatewayToolServerOauth2AuthenticationDeserializer(
  item: any,
): AiGatewayToolServerOauth2Authentication {
  return {
    issuer: item["issuer"],
    authorizationEndpoint: !item["authorizationEndpoint"]
      ? item["authorizationEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["authorizationEndpoint"]),
    tokenEndpoint: !item["tokenEndpoint"]
      ? item["tokenEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["tokenEndpoint"]),
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    grantType: item["grantType"],
    tokenExchange: !item["tokenExchange"]
      ? item["tokenExchange"]
      : aiGatewayToolServerTokenExchangeDeserializer(item["tokenExchange"]),
    authorizationParameters: !item["authorizationParameters"]
      ? item["authorizationParameters"]
      : aiGatewayToolServerOauth2ParameterArrayDeserializer(item["authorizationParameters"]),
    tokenParameters: !item["tokenParameters"]
      ? item["tokenParameters"]
      : aiGatewayToolServerOauth2ParameterArrayDeserializer(item["tokenParameters"]),
    status: item["status"],
    loginLink: item["loginLink"],
    statusUpdatedUtc: !item["statusUpdatedUtc"]
      ? item["statusUpdatedUtc"]
      : new Date(item["statusUpdatedUtc"]),
  };
}

/** OAuth 2.0 grant type. */
export enum KnownAiGatewayToolServerOauth2GrantType {
  /** Client credentials grant. */
  ClientCredentials = "clientCredentials",
  /** Authorization code grant. */
  AuthorizationCode = "authorizationCode",
}

/**
 * OAuth 2.0 grant type. \
 * {@link KnownAiGatewayToolServerOauth2GrantType} can be used interchangeably with AiGatewayToolServerOauth2GrantType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **clientCredentials**: Client credentials grant. \
 * **authorizationCode**: Authorization code grant.
 */
export type AiGatewayToolServerOauth2GrantType = string;

/** Chained token-exchange configuration for a tool server endpoint. */
export interface AiGatewayToolServerTokenExchange {
  /** Token-exchange profile. */
  profile: AiGatewayToolServerTokenExchangeProfile;
  /** Customer-owned federated client application identity. */
  federatedClientApplication?: AiGatewayToolServerFederation;
  /** Delegated scopes requested from the target tool server resource. */
  scopes?: string[];
}

export function aiGatewayToolServerTokenExchangeSerializer(
  item: AiGatewayToolServerTokenExchange,
): any {
  return {
    profile: item["profile"],
    federatedClientApplication: !item["federatedClientApplication"]
      ? item["federatedClientApplication"]
      : aiGatewayToolServerFederationSerializer(item["federatedClientApplication"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function aiGatewayToolServerTokenExchangeDeserializer(
  item: any,
): AiGatewayToolServerTokenExchange {
  return {
    profile: item["profile"],
    federatedClientApplication: !item["federatedClientApplication"]
      ? item["federatedClientApplication"]
      : aiGatewayToolServerFederationDeserializer(item["federatedClientApplication"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported token-exchange profiles for a tool server endpoint. */
export enum KnownAiGatewayToolServerTokenExchangeProfile {
  /** Microsoft Entra chained on-behalf-of token exchange. */
  EntraOnBehalfOf = "entraOnBehalfOf",
}

/**
 * Supported token-exchange profiles for a tool server endpoint. \
 * {@link KnownAiGatewayToolServerTokenExchangeProfile} can be used interchangeably with AiGatewayToolServerTokenExchangeProfile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **entraOnBehalfOf**: Microsoft Entra chained on-behalf-of token exchange.
 */
export type AiGatewayToolServerTokenExchangeProfile = string;

/** Customer-owned federation application identity for a tool server endpoint. */
export interface AiGatewayToolServerFederation {
  /** Application (client) ID of the customer-owned federation application. */
  applicationId?: string;
  /** Credential used to authenticate the federation application. */
  appCredential?: AiGatewayToolServerFederationAppCredential;
}

export function aiGatewayToolServerFederationSerializer(item: AiGatewayToolServerFederation): any {
  return {
    applicationId: item["applicationId"],
    appCredential: !item["appCredential"]
      ? item["appCredential"]
      : aiGatewayToolServerFederationAppCredentialSerializer(item["appCredential"]),
  };
}

export function aiGatewayToolServerFederationDeserializer(
  item: any,
): AiGatewayToolServerFederation {
  return {
    applicationId: item["applicationId"],
    appCredential: !item["appCredential"]
      ? item["appCredential"]
      : aiGatewayToolServerFederationAppCredentialDeserializer(item["appCredential"]),
  };
}

/** Credential used to authenticate a tool server endpoint federation application. */
export interface AiGatewayToolServerFederationAppCredential {
  /** Federation application credential type. */
  type: AiGatewayToolServerFederationAppCredentialType;
  /** Client ID of a user-assigned managed identity available to this AI Gateway. */
  clientId?: string;
}

export function aiGatewayToolServerFederationAppCredentialSerializer(
  item: AiGatewayToolServerFederationAppCredential,
): any {
  return { type: item["type"], clientId: item["clientId"] };
}

export function aiGatewayToolServerFederationAppCredentialDeserializer(
  item: any,
): AiGatewayToolServerFederationAppCredential {
  return {
    type: item["type"],
    clientId: item["clientId"],
  };
}

/** Supported federation application credential types for a tool server endpoint. */
export enum KnownAiGatewayToolServerFederationAppCredentialType {
  /** A user-assigned managed identity assigned to the AI Gateway. */
  UserAssignedManagedIdentity = "userAssignedManagedIdentity",
}

/**
 * Supported federation application credential types for a tool server endpoint. \
 * {@link KnownAiGatewayToolServerFederationAppCredentialType} can be used interchangeably with AiGatewayToolServerFederationAppCredentialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userAssignedManagedIdentity**: A user-assigned managed identity assigned to the AI Gateway.
 */
export type AiGatewayToolServerFederationAppCredentialType = string;

export function aiGatewayToolServerOauth2ParameterArraySerializer(
  result: Array<AiGatewayToolServerOauth2Parameter>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerOauth2ParameterSerializer(item);
  });
}

export function aiGatewayToolServerOauth2ParameterArrayDeserializer(
  result: Array<AiGatewayToolServerOauth2Parameter>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerOauth2ParameterDeserializer(item);
  });
}

/** An additional parameter sent to an OAuth 2.0 endpoint. */
export interface AiGatewayToolServerOauth2Parameter {
  /** OAuth parameter name. */
  name: string;
  /** OAuth parameter value. */
  value: string;
}

export function aiGatewayToolServerOauth2ParameterSerializer(
  item: AiGatewayToolServerOauth2Parameter,
): any {
  return { name: item["name"], value: item["value"] };
}

export function aiGatewayToolServerOauth2ParameterDeserializer(
  item: any,
): AiGatewayToolServerOauth2Parameter {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Managed identity authentication for a tool server endpoint. */
export interface AiGatewayToolServerManagedIdentityAuthentication {
  /** Token audience for managed identity authentication. */
  resource?: string;
  /** Client ID of a user-assigned managed identity. */
  clientId?: string;
}

export function aiGatewayToolServerManagedIdentityAuthenticationSerializer(
  item: AiGatewayToolServerManagedIdentityAuthentication,
): any {
  return { resource: item["resource"], clientId: item["clientId"] };
}

export function aiGatewayToolServerManagedIdentityAuthenticationDeserializer(
  item: any,
): AiGatewayToolServerManagedIdentityAuthentication {
  return {
    resource: item["resource"],
    clientId: item["clientId"],
  };
}

/** Parameters for updating an AI Gateway tool server. */
export interface AiGatewayToolServerUpdateParameters {
  /** Tool server properties to update. */
  properties?: AiGatewayToolServerUpdateProperties;
}

export function aiGatewayToolServerUpdateParametersSerializer(
  item: AiGatewayToolServerUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayToolServerUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties for updating an AI Gateway tool server. */
export interface AiGatewayToolServerUpdateProperties {
  /** Display name of the tool server. */
  displayName?: string;
  /** Description of the tool server. */
  description?: string;
  /** Whether the tool server is available to callers. */
  accessState?: AiGatewayToolServerAccessState;
  /** Tool server type. */
  toolServerType?: AiGatewayToolServerType;
  /** Runtime API versions exposed by this tool server. */
  versions?: string[];
  /** Tool names or patterns explicitly allowed. */
  allowList?: string[];
  /** Tool names or patterns explicitly blocked. */
  blockList?: string[];
  /** Endpoint configurations exposed by this tool server. */
  endpoints?: AiGatewayToolServerEndpointUpdate[];
  /** Inline policies applied to this tool server. */
  policies?: AiGatewayPolicyUpdate[];
  /** Runtime path for the tool server. */
  path?: string;
  /** Whether a subscription is required to invoke the tool server. */
  subscriptionRequired?: boolean;
}

export function aiGatewayToolServerUpdatePropertiesSerializer(
  item: AiGatewayToolServerUpdateProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    accessState: item["accessState"],
    toolServerType: item["toolServerType"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    allowList: !item["allowList"]
      ? item["allowList"]
      : item["allowList"].map((p: any) => {
          return p;
        }),
    blockList: !item["blockList"]
      ? item["blockList"]
      : item["blockList"].map((p: any) => {
          return p;
        }),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aiGatewayToolServerEndpointUpdateArraySerializer(item["endpoints"]),
    policies: !item["policies"]
      ? item["policies"]
      : aiGatewayPolicyUpdateArraySerializer(item["policies"]),
    path: item["path"],
    subscriptionRequired: item["subscriptionRequired"],
  };
}

export function aiGatewayToolServerEndpointUpdateArraySerializer(
  result: Array<AiGatewayToolServerEndpointUpdate>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerEndpointUpdateSerializer(item);
  });
}

/** A tool server endpoint to update. */
export interface AiGatewayToolServerEndpointUpdate {
  /** Stable endpoint identifier. */
  id?: string;
  /** Optional namespace used to prefix tool names. */
  namespace?: string;
  /** Endpoint type. */
  kind?: AiGatewayToolServerEndpointSourceKind;
  /** Backend MCP configuration. */
  mcp?: AiGatewayMcpUrlConfigurationUpdate;
  /** OpenAPI configuration. */
  openApi?: AiGatewayOpenApiConfigurationUpdate;
  /** Backend authentication configuration. */
  authentication?: AiGatewayToolServerAuthenticationUpdate;
  /** Upstream tool names or glob patterns to expose. */
  tools?: string[];
  /** Failure mode when the endpoint fails. */
  mode?: AiGatewayFailureMode;
}

export function aiGatewayToolServerEndpointUpdateSerializer(
  item: AiGatewayToolServerEndpointUpdate,
): any {
  return {
    id: item["id"],
    namespace: item["namespace"],
    kind: item["kind"],
    mcp: !item["mcp"] ? item["mcp"] : aiGatewayMcpUrlConfigurationUpdateSerializer(item["mcp"]),
    openApi: !item["openApi"]
      ? item["openApi"]
      : aiGatewayOpenApiConfigurationUpdateSerializer(item["openApi"]),
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayToolServerAuthenticationUpdateSerializer(item["authentication"]),
    tools: !item["tools"]
      ? item["tools"]
      : item["tools"].map((p: any) => {
          return p;
        }),
    mode: item["mode"],
  };
}

/** MCP endpoint settings to update. */
export interface AiGatewayMcpUrlConfigurationUpdate {
  /** Backend MCP server endpoint. */
  endpoint?: AiGatewayDestinationEndpointUpdate;
  /** MCP transport. */
  transport?: AiGatewayToolServerMcpTransport;
}

export function aiGatewayMcpUrlConfigurationUpdateSerializer(
  item: AiGatewayMcpUrlConfigurationUpdate,
): any {
  return {
    endpoint: !item["endpoint"]
      ? item["endpoint"]
      : aiGatewayDestinationEndpointUpdateSerializer(item["endpoint"]),
    transport: item["transport"],
  };
}

/** OpenAPI-backed MCP endpoint settings to update. */
export interface AiGatewayOpenApiConfigurationUpdate {
  /** OpenAPI document source. */
  specSource?: AiGatewayOpenApiSpecSourceUpdate;
}

export function aiGatewayOpenApiConfigurationUpdateSerializer(
  item: AiGatewayOpenApiConfigurationUpdate,
): any {
  return {
    specSource: !item["specSource"]
      ? item["specSource"]
      : aiGatewayOpenApiSpecSourceUpdateSerializer(item["specSource"]),
  };
}

/** OpenAPI document source settings to update. */
export interface AiGatewayOpenApiSpecSourceUpdate {
  /** Source type. */
  type?: AiGatewayToolServerOpenApiSourceType;
  /** Base64-encoded OpenAPI document. */
  contentBase64?: Uint8Array;
  /** URL of the OpenAPI document. */
  url?: string;
}

export function aiGatewayOpenApiSpecSourceUpdateSerializer(
  item: AiGatewayOpenApiSpecSourceUpdate,
): any {
  return {
    type: item["type"],
    contentBase64: !item["contentBase64"]
      ? item["contentBase64"]
      : uint8ArrayToString(item["contentBase64"], "base64"),
    url: item["url"],
  };
}

/** Tool server authentication settings to update. */
export interface AiGatewayToolServerAuthenticationUpdate {
  /** Static headers injected when calling the endpoint. */
  headers?: AiGatewaySecretHeaderUpdate[];
  /** OAuth 2.0 configuration. */
  oauth2?: AiGatewayToolServerOauth2Authentication;
  /** Managed identity configuration. */
  managedIdentity?: AiGatewayToolServerManagedIdentityAuthentication;
}

export function aiGatewayToolServerAuthenticationUpdateSerializer(
  item: AiGatewayToolServerAuthenticationUpdate,
): any {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderUpdateArraySerializer(item["headers"]),
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : aiGatewayToolServerOauth2AuthenticationSerializer(item["oauth2"]),
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayToolServerManagedIdentityAuthenticationSerializer(item["managedIdentity"]),
  };
}

/** The response of a AiGatewayToolServerResource list operation. */
export interface _AiGatewayToolServerResourceListResult {
  /** The AiGatewayToolServerResource items on this page */
  value: AiGatewayToolServerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayToolServerResourceListResultDeserializer(
  item: any,
): _AiGatewayToolServerResourceListResult {
  return {
    value: aiGatewayToolServerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayToolServerResourceArraySerializer(
  result: Array<AiGatewayToolServerResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerResourceSerializer(item);
  });
}

export function aiGatewayToolServerResourceArrayDeserializer(
  result: Array<AiGatewayToolServerResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerResourceDeserializer(item);
  });
}

/** Secret values configured on tool server endpoints. */
export interface AiGatewayToolServerSecrets {
  /** Endpoint secret values. */
  endpoints: AiGatewayToolServerSecret[];
}

export function aiGatewayToolServerSecretsDeserializer(item: any): AiGatewayToolServerSecrets {
  return {
    endpoints: aiGatewayToolServerSecretArrayDeserializer(item["endpoints"]),
  };
}

export function aiGatewayToolServerSecretArrayDeserializer(
  result: Array<AiGatewayToolServerSecret>,
): any[] {
  return result.map((item) => {
    return aiGatewayToolServerSecretDeserializer(item);
  });
}

/** Secret value configured on one tool server endpoint. */
export interface AiGatewayToolServerSecret {
  /** Stable endpoint identifier. */
  id: string;
  /** Endpoint authentication including secret values. */
  authentication?: AiGatewayToolServerSecretAuthentication;
  /** OpenAPI configuration including inline content. */
  openApi?: AiGatewayToolServerSecretOpenApiConfiguration;
}

export function aiGatewayToolServerSecretDeserializer(item: any): AiGatewayToolServerSecret {
  return {
    id: item["id"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : aiGatewayToolServerSecretAuthenticationDeserializer(item["authentication"]),
    openApi: !item["openApi"]
      ? item["openApi"]
      : aiGatewayToolServerSecretOpenApiConfigurationDeserializer(item["openApi"]),
  };
}

/** Endpoint authentication returned by the secret retrieval action. */
export interface AiGatewayToolServerSecretAuthentication {
  /** Managed identity configuration. */
  managedIdentity?: AiGatewayToolServerManagedIdentityAuthentication;
  /** Static headers injected when calling the endpoint. */
  headers?: AiGatewaySecretHeaderValue[];
  /** OAuth 2.0 configuration. */
  oauth2?: AiGatewayToolServerSecretOauth2Authentication;
}

export function aiGatewayToolServerSecretAuthenticationDeserializer(
  item: any,
): AiGatewayToolServerSecretAuthentication {
  return {
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : aiGatewayToolServerManagedIdentityAuthenticationDeserializer(item["managedIdentity"]),
    headers: !item["headers"]
      ? item["headers"]
      : aiGatewaySecretHeaderValueArrayDeserializer(item["headers"]),
    oauth2: !item["oauth2"]
      ? item["oauth2"]
      : aiGatewayToolServerSecretOauth2AuthenticationDeserializer(item["oauth2"]),
  };
}

/** OAuth settings returned by the secret retrieval action. */
export interface AiGatewayToolServerSecretOauth2Authentication {
  /** Expected OAuth authorization-server issuer for remote MCP discovery. */
  issuer?: string;
  /** OAuth authorization endpoint. */
  authorizationEndpoint?: AiGatewayDestinationEndpoint;
  /** OAuth token endpoint. */
  tokenEndpoint?: AiGatewayDestinationEndpoint;
  /** OAuth client identifier. */
  clientId?: string;
  /** OAuth scopes to request. */
  scopes?: string[];
  /** OAuth grant type. */
  grantType?: AiGatewayToolServerOauth2GrantType;
  /** Chained token-exchange configuration. */
  tokenExchange?: AiGatewayToolServerTokenExchange;
  /** Additional authorization endpoint parameters. */
  authorizationParameters?: AiGatewayToolServerOauth2Parameter[];
  /** Additional token endpoint parameters. */
  tokenParameters?: AiGatewayToolServerOauth2Parameter[];
  /** Current OAuth connection status. */
  readonly status?: string;
  /** Login link used to complete interactive authorization. */
  readonly loginLink?: string;
  /** UTC timestamp of the last OAuth connection-status transition. */
  readonly statusUpdatedUtc?: Date;
  /** OAuth client secret. */
  clientSecret?: string;
}

export function aiGatewayToolServerSecretOauth2AuthenticationDeserializer(
  item: any,
): AiGatewayToolServerSecretOauth2Authentication {
  return {
    issuer: item["issuer"],
    authorizationEndpoint: !item["authorizationEndpoint"]
      ? item["authorizationEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["authorizationEndpoint"]),
    tokenEndpoint: !item["tokenEndpoint"]
      ? item["tokenEndpoint"]
      : aiGatewayDestinationEndpointDeserializer(item["tokenEndpoint"]),
    clientId: item["clientId"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    grantType: item["grantType"],
    tokenExchange: !item["tokenExchange"]
      ? item["tokenExchange"]
      : aiGatewayToolServerTokenExchangeDeserializer(item["tokenExchange"]),
    authorizationParameters: !item["authorizationParameters"]
      ? item["authorizationParameters"]
      : aiGatewayToolServerOauth2ParameterArrayDeserializer(item["authorizationParameters"]),
    tokenParameters: !item["tokenParameters"]
      ? item["tokenParameters"]
      : aiGatewayToolServerOauth2ParameterArrayDeserializer(item["tokenParameters"]),
    status: item["status"],
    loginLink: item["loginLink"],
    statusUpdatedUtc: !item["statusUpdatedUtc"]
      ? item["statusUpdatedUtc"]
      : new Date(item["statusUpdatedUtc"]),
    clientSecret: item["clientSecret"],
  };
}

/** OpenAPI settings returned by the secret retrieval action. */
export interface AiGatewayToolServerSecretOpenApiConfiguration {
  /** OpenAPI document source. */
  specSource: AiGatewayToolServerSecretOpenApiSpecSource;
}

export function aiGatewayToolServerSecretOpenApiConfigurationDeserializer(
  item: any,
): AiGatewayToolServerSecretOpenApiConfiguration {
  return {
    specSource: aiGatewayToolServerSecretOpenApiSpecSourceDeserializer(item["specSource"]),
  };
}

/** OpenAPI document source returned by the secret retrieval action. */
export interface AiGatewayToolServerSecretOpenApiSpecSource {
  /** Source type. */
  type: AiGatewayToolServerOpenApiSourceType;
  /** URL of the OpenAPI document. Required when type is url. */
  url?: string;
  /** Base64-encoded OpenAPI document. Required when type is inline. */
  contentBase64?: Uint8Array;
}

export function aiGatewayToolServerSecretOpenApiSpecSourceDeserializer(
  item: any,
): AiGatewayToolServerSecretOpenApiSpecSource {
  return {
    type: item["type"],
    url: item["url"],
    contentBase64: !item["contentBase64"]
      ? item["contentBase64"]
      : typeof item["contentBase64"] === "string"
        ? stringToUint8Array(item["contentBase64"], "base64")
        : item["contentBase64"],
  };
}

/** Parameters for getting OAuth consent links for a tool server endpoint. */
export interface AiGatewayToolServerLoginLinksRequest {
  /** Identifier of the endpoint configured on the tool server. */
  endpointId: string;
}

export function aiGatewayToolServerLoginLinksRequestSerializer(
  item: AiGatewayToolServerLoginLinksRequest,
): any {
  return { endpointId: item["endpointId"] };
}

/** Links for completing OAuth consent for a tool-server endpoint. */
export interface AiGatewayToolServerOauth2LoginLinks {
  /** Gateway URL to open to begin consent; includes an expiring signed capability. */
  loginLink?: string;
  /** Gateway callback URI to register with the identity provider. */
  redirectUri?: string;
  /** UTC expiry of the signed start capability. */
  expiresUtc: Date;
}

export function aiGatewayToolServerOauth2LoginLinksDeserializer(
  item: any,
): AiGatewayToolServerOauth2LoginLinks {
  return {
    loginLink: item["loginLink"],
    redirectUri: item["redirectUri"],
    expiresUtc: new Date(item["expiresUtc"]),
  };
}

/** An AI Gateway API key resource. */
export interface AiGatewayApiKeyResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AiGatewayApiKeyProperties;
}

export function aiGatewayApiKeyResourceSerializer(item: AiGatewayApiKeyResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayApiKeyPropertiesSerializer(item["properties"]),
  };
}

export function aiGatewayApiKeyResourceDeserializer(item: any): AiGatewayApiKeyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayApiKeyPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an AI Gateway API key. */
export interface AiGatewayApiKeyProperties {
  /** Display name of the key. */
  displayName?: string;
  /** Subscription state. */
  state?: string;
  /** Creation time. */
  readonly createdDate?: Date;
  /** Optional expiration time. */
  expirationDate?: Date;
  /** Primary key value. Omitted from ordinary read responses. */
  primaryKey?: string;
  /** Secondary key value. Omitted from ordinary read responses. */
  secondaryKey?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: AiGatewayProvisioningState;
}

export function aiGatewayApiKeyPropertiesSerializer(item: AiGatewayApiKeyProperties): any {
  return {
    displayName: item["displayName"],
    state: item["state"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

export function aiGatewayApiKeyPropertiesDeserializer(item: any): AiGatewayApiKeyProperties {
  return {
    displayName: item["displayName"],
    state: item["state"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    provisioningState: item["provisioningState"],
  };
}

/** Parameters for updating an AI Gateway API key. */
export interface AiGatewayApiKeyUpdateParameters {
  /** API key properties to update. */
  properties?: AiGatewayApiKeyUpdateProperties;
}

export function aiGatewayApiKeyUpdateParametersSerializer(
  item: AiGatewayApiKeyUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aiGatewayApiKeyUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties for updating an AI Gateway API key. */
export interface AiGatewayApiKeyUpdateProperties {
  /** Display name of the key. */
  displayName?: string;
  /** Subscription state. */
  state?: string;
  /** Optional expiration time. */
  expirationDate?: Date;
  /** Replacement primary key value. */
  primaryKey?: string;
  /** Replacement secondary key value. */
  secondaryKey?: string;
}

export function aiGatewayApiKeyUpdatePropertiesSerializer(
  item: AiGatewayApiKeyUpdateProperties,
): any {
  return {
    displayName: item["displayName"],
    state: item["state"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** The response of a AiGatewayApiKeyResource list operation. */
export interface _AiGatewayApiKeyResourceListResult {
  /** The AiGatewayApiKeyResource items on this page */
  value: AiGatewayApiKeyResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aiGatewayApiKeyResourceListResultDeserializer(
  item: any,
): _AiGatewayApiKeyResourceListResult {
  return {
    value: aiGatewayApiKeyResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aiGatewayApiKeyResourceArraySerializer(
  result: Array<AiGatewayApiKeyResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayApiKeyResourceSerializer(item);
  });
}

export function aiGatewayApiKeyResourceArrayDeserializer(
  result: Array<AiGatewayApiKeyResource>,
): any[] {
  return result.map((item) => {
    return aiGatewayApiKeyResourceDeserializer(item);
  });
}

/** Primary and secondary API key values. */
export interface AiGatewayApiKeyValues {
  /** Primary API key value. */
  primaryKey: string;
  /** Secondary API key value. */
  secondaryKey: string;
}

export function aiGatewayApiKeyValuesDeserializer(item: any): AiGatewayApiKeyValues {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-11-01 API version. */
  V20261101 = "2026-11-01",
}
