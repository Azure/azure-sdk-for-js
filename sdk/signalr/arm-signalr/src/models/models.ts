// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationList {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** REST API operation supported by resource provider. */
export interface Operation {
  /** Name of the operation with format: {provider}/{resource}/{operation} */
  name?: string;
  /** If the operation is a data action. (for data plane rbac) */
  isDataAction?: boolean;
  /** The object that describes a operation. */
  display?: OperationDisplay;
  /** Optional. The intended executor of the operation; governs the display of the operation in the RBAC UX and the audit logs UX. */
  origin?: string;
  /** Extra Operation properties. */
  properties?: OperationProperties;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** The object that describes a operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider */
  provider?: string;
  /** Resource type on which the operation is performed. */
  resource?: string;
  /** The localized friendly name for the operation. */
  operation?: string;
  /** The localized friendly description for the operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Extra Operation properties. */
export interface OperationProperties {
  /** An object that describes a specification. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** An object that describes a specification. */
export interface ServiceSpecification {
  /** Specifications of the Metrics for Azure Monitoring. */
  metricSpecifications?: MetricSpecification[];
  /** Specifications of the Logs for Azure Monitoring. */
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Specifications of the Metrics for Azure Monitoring. */
export interface MetricSpecification {
  /** Name of the metric. */
  name?: string;
  /** Localized friendly display name of the metric. */
  displayName?: string;
  /** Localized friendly description of the metric. */
  displayDescription?: string;
  /** The unit that makes sense for the metric. */
  unit?: string;
  /** Only provide one value for this field. Valid values: Average, Minimum, Maximum, Total, Count. */
  aggregationType?: string;
  /**
   * Optional. If set to true, then zero will be returned for time duration where no metric is emitted/published.
   * Ex. a metric that returns the number of times a particular error code was emitted. The error code may not appear
   * often, instead of the RP publishing 0, Shoebox can auto fill in 0s for time periods where nothing was emitted.
   */
  fillGapWithZero?: string;
  /** The name of the metric category that the metric belongs to. A metric can only belong to a single category. */
  category?: string;
  /** The dimensions of the metrics. */
  dimensions?: Dimension[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    fillGapWithZero: item["fillGapWithZero"],
    category: item["category"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
  };
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** Specifications of the Dimension of metrics. */
export interface Dimension {
  /** The public facing name of the dimension. */
  name?: string;
  /** Localized friendly display name of the dimension. */
  displayName?: string;
  /** Name of the dimension as it appears in MDM. */
  internalName?: string;
  /** A Boolean flag indicating whether this dimension should be included for the shoebox export scenario. */
  toBeExportedForShoebox?: boolean;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Specifications of the Logs for Azure Monitoring. */
export interface LogSpecification {
  /** Name of the log. */
  name?: string;
  /** Localized friendly display name of the log. */
  displayName?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
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

/** Describes a Shared Private Link Resource */
export interface SharedPrivateLinkResource extends ProxyResource {
  /** The group id from the provider of resource the shared private link resource is for */
  groupId?: string;
  /** The resource id of the resource the shared private link resource is for */
  privateLinkResourceId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The request message for requesting approval of the shared private link resource */
  requestMessage?: string;
  /** A list of FQDNs for third party private link service */
  fqdns?: string[];
  /** Status of the shared private link resource */
  readonly status?: SharedPrivateLinkResourceStatus;
}

export function sharedPrivateLinkResourceSerializer(item: SharedPrivateLinkResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "groupId",
      "privateLinkResourceId",
      "requestMessage",
      "fqdns",
    ])
      ? undefined
      : _sharedPrivateLinkResourcePropertiesSerializer(item),
  };
}

export function sharedPrivateLinkResourceDeserializer(item: any): SharedPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sharedPrivateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of an existing Shared Private Link Resource */
export interface SharedPrivateLinkResourceProperties {
  /** The group id from the provider of resource the shared private link resource is for */
  groupId: string;
  /** The resource id of the resource the shared private link resource is for */
  privateLinkResourceId: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The request message for requesting approval of the shared private link resource */
  requestMessage?: string;
  /** A list of FQDNs for third party private link service */
  fqdns?: string[];
  /** Status of the shared private link resource */
  readonly status?: SharedPrivateLinkResourceStatus;
}

export function sharedPrivateLinkResourcePropertiesSerializer(
  item: SharedPrivateLinkResourceProperties,
): any {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

export function sharedPrivateLinkResourcePropertiesDeserializer(
  item: any,
): SharedPrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    provisioningState: item["provisioningState"],
    requestMessage: item["requestMessage"],
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    status: item["status"],
  };
}

/** Provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Running** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Moving**
 */
export type ProvisioningState = string;

/** Status of the shared private link resource */
export enum KnownSharedPrivateLinkResourceStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Timeout */
  Timeout = "Timeout",
}

/**
 * Status of the shared private link resource \
 * {@link KnownSharedPrivateLinkResourceStatus} can be used interchangeably with SharedPrivateLinkResourceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected** \
 * **Timeout**
 */
export type SharedPrivateLinkResourceStatus = string;

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

/** A list of shared private link resources */
export interface _SharedPrivateLinkResourceList {
  /** The SharedPrivateLinkResource items on this page */
  value: SharedPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedPrivateLinkResourceListDeserializer(
  item: any,
): _SharedPrivateLinkResourceList {
  return {
    value: sharedPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedPrivateLinkResourceArraySerializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceSerializer(item);
  });
}

export function sharedPrivateLinkResourceArrayDeserializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceDeserializer(item);
  });
}

/** A class representing a resource. */
export interface SignalRResource extends TrackedResource {
  /** The billing information of the resource. */
  sku?: ResourceSku;
  /** The kind of the service */
  kind?: ServiceKind;
  /** A class represent managed identities used for request and response */
  identity?: ManagedIdentity;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The publicly accessible IP of the resource. */
  readonly externalIP?: string;
  /** FQDN of the service instance. */
  readonly hostName?: string;
  /** The publicly accessible port of the resource which is designed for browser/client side usage. */
  readonly publicPort?: number;
  /** The publicly accessible port of the resource which is designed for customer server side usage. */
  readonly serverPort?: number;
  /** Version of the resource. Probably you need the same or higher version of client SDKs. */
  readonly version?: string;
  /** Private endpoint connections to the resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The list of shared private link resources. */
  readonly sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** TLS settings for the resource */
  tls?: SignalRTlsSettings;
  /** Deprecated. */
  readonly hostNamePrefix?: string;
  /**
   * List of the featureFlags.
   *
   * FeatureFlags that are not included in the parameters for the update operation will not be modified.
   * And the response will only include featureFlags that are explicitly set.
   * When a featureFlag is not explicitly set, its globally default value will be used
   * But keep in mind, the default value doesn't mean "false". It varies in terms of different FeatureFlags.
   */
  features?: SignalRFeature[];
  /** Live trace configuration of a Microsoft.SignalRService resource. */
  liveTraceConfiguration?: LiveTraceConfiguration;
  /** Resource log configuration of a Microsoft.SignalRService resource. */
  resourceLogConfiguration?: ResourceLogConfiguration;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: SignalRCorsSettings;
  /** Serverless settings. */
  serverless?: ServerlessSettings;
  /** The settings for the Upstream when the service is in server-less mode. */
  upstream?: ServerlessUpstreamSettings;
  /** Network ACLs for the resource */
  networkACLs?: SignalRNetworkACLs;
  /** Application firewall settings for the resource */
  applicationFirewall?: ApplicationFirewallSettings;
  /**
   * Enable or disable public network access. Default to "Enabled".
   * When it's Enabled, network ACLs still apply.
   * When it's Disabled, public network access is always disabled no matter what you set in network ACLs.
   */
  publicNetworkAccess?: string;
  /**
   * DisableLocalAuth
   * Enable or disable local auth with AccessKey
   * When set as true, connection with AccessKey=xxx won't work.
   */
  disableLocalAuth?: boolean;
  /**
   * DisableLocalAuth
   * Enable or disable aad auth
   * When set as true, connection with AuthType=aad won't work.
   */
  disableAadAuth?: boolean;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   * This property is replica specific. Disable the regional endpoint without replica is not allowed.
   */
  regionEndpointEnabled?: string;
  /**
   * Stop or start the resource.  Default to "False".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
  /** Route settings for the resource */
  routeSettings?: RouteSettings;
}

export function signalRResourceSerializer(item: SignalRResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "tls",
      "features",
      "liveTraceConfiguration",
      "resourceLogConfiguration",
      "cors",
      "serverless",
      "upstream",
      "networkACLs",
      "applicationFirewall",
      "publicNetworkAccess",
      "disableLocalAuth",
      "disableAadAuth",
      "regionEndpointEnabled",
      "resourceStopped",
      "routeSettings",
    ])
      ? undefined
      : _signalRResourcePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
  };
}

export function signalRResourceDeserializer(item: any): SignalRResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _signalRResourcePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
  };
}

/** A class that describes the properties of the resource */
export interface SignalRProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The publicly accessible IP of the resource. */
  readonly externalIP?: string;
  /** FQDN of the service instance. */
  readonly hostName?: string;
  /** The publicly accessible port of the resource which is designed for browser/client side usage. */
  readonly publicPort?: number;
  /** The publicly accessible port of the resource which is designed for customer server side usage. */
  readonly serverPort?: number;
  /** Version of the resource. Probably you need the same or higher version of client SDKs. */
  readonly version?: string;
  /** Private endpoint connections to the resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The list of shared private link resources. */
  readonly sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** TLS settings for the resource */
  tls?: SignalRTlsSettings;
  /** Deprecated. */
  readonly hostNamePrefix?: string;
  /**
   * List of the featureFlags.
   *
   * FeatureFlags that are not included in the parameters for the update operation will not be modified.
   * And the response will only include featureFlags that are explicitly set.
   * When a featureFlag is not explicitly set, its globally default value will be used
   * But keep in mind, the default value doesn't mean "false". It varies in terms of different FeatureFlags.
   */
  features?: SignalRFeature[];
  /** Live trace configuration of a Microsoft.SignalRService resource. */
  liveTraceConfiguration?: LiveTraceConfiguration;
  /** Resource log configuration of a Microsoft.SignalRService resource. */
  resourceLogConfiguration?: ResourceLogConfiguration;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: SignalRCorsSettings;
  /** Serverless settings. */
  serverless?: ServerlessSettings;
  /** The settings for the Upstream when the service is in server-less mode. */
  upstream?: ServerlessUpstreamSettings;
  /** Network ACLs for the resource */
  networkACLs?: SignalRNetworkACLs;
  /** Application firewall settings for the resource */
  applicationFirewall?: ApplicationFirewallSettings;
  /**
   * Enable or disable public network access. Default to "Enabled".
   * When it's Enabled, network ACLs still apply.
   * When it's Disabled, public network access is always disabled no matter what you set in network ACLs.
   */
  publicNetworkAccess?: string;
  /**
   * DisableLocalAuth
   * Enable or disable local auth with AccessKey
   * When set as true, connection with AccessKey=xxx won't work.
   */
  disableLocalAuth?: boolean;
  /**
   * DisableLocalAuth
   * Enable or disable aad auth
   * When set as true, connection with AuthType=aad won't work.
   */
  disableAadAuth?: boolean;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   * This property is replica specific. Disable the regional endpoint without replica is not allowed.
   */
  regionEndpointEnabled?: string;
  /**
   * Stop or start the resource.  Default to "False".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
  /** Route settings for the resource */
  routeSettings?: RouteSettings;
}

export function signalRPropertiesSerializer(item: SignalRProperties): any {
  return {
    tls: !item["tls"] ? item["tls"] : signalRTlsSettingsSerializer(item["tls"]),
    features: !item["features"]
      ? item["features"]
      : signalRFeatureArraySerializer(item["features"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationSerializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationSerializer(item["resourceLogConfiguration"]),
    cors: !item["cors"] ? item["cors"] : signalRCorsSettingsSerializer(item["cors"]),
    serverless: !item["serverless"]
      ? item["serverless"]
      : serverlessSettingsSerializer(item["serverless"]),
    upstream: !item["upstream"]
      ? item["upstream"]
      : serverlessUpstreamSettingsSerializer(item["upstream"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : signalRNetworkACLsSerializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsSerializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    routeSettings: !item["routeSettings"]
      ? item["routeSettings"]
      : routeSettingsSerializer(item["routeSettings"]),
  };
}

export function signalRPropertiesDeserializer(item: any): SignalRProperties {
  return {
    provisioningState: item["provisioningState"],
    externalIP: item["externalIP"],
    hostName: item["hostName"],
    publicPort: item["publicPort"],
    serverPort: item["serverPort"],
    version: item["version"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    tls: !item["tls"] ? item["tls"] : signalRTlsSettingsDeserializer(item["tls"]),
    hostNamePrefix: item["hostNamePrefix"],
    features: !item["features"]
      ? item["features"]
      : signalRFeatureArrayDeserializer(item["features"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationDeserializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationDeserializer(item["resourceLogConfiguration"]),
    cors: !item["cors"] ? item["cors"] : signalRCorsSettingsDeserializer(item["cors"]),
    serverless: !item["serverless"]
      ? item["serverless"]
      : serverlessSettingsDeserializer(item["serverless"]),
    upstream: !item["upstream"]
      ? item["upstream"]
      : serverlessUpstreamSettingsDeserializer(item["upstream"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : signalRNetworkACLsDeserializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsDeserializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    routeSettings: !item["routeSettings"]
      ? item["routeSettings"]
      : routeSettingsDeserializer(item["routeSettings"]),
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection to an azure resource */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Private endpoint */
  privateEndpoint?: PrivateEndpoint;
  /** Group IDs */
  readonly groupIds?: string[];
  /** Connection state of the private endpoint connection */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Private endpoint connection properties */
export interface PrivateEndpointConnectionProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Private endpoint */
  privateEndpoint?: PrivateEndpoint;
  /** Group IDs */
  readonly groupIds?: string[];
  /** Connection state of the private endpoint connection */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

/** Private endpoint */
export interface PrivateEndpoint {
  /** Full qualified Id of the private endpoint */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** Connection state of the private endpoint connection */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateLinkServiceConnectionStatus;
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

/** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
export enum KnownPrivateLinkServiceConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. \
 * {@link KnownPrivateLinkServiceConnectionStatus} can be used interchangeably with PrivateLinkServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkServiceConnectionStatus = string;

/** TLS settings for the resource */
export interface SignalRTlsSettings {
  /** Request client certificate during TLS handshake if enabled. Not supported for free tier. Any input will be ignored for free tier. */
  clientCertEnabled?: boolean;
}

export function signalRTlsSettingsSerializer(item: SignalRTlsSettings): any {
  return { clientCertEnabled: item["clientCertEnabled"] };
}

export function signalRTlsSettingsDeserializer(item: any): SignalRTlsSettings {
  return {
    clientCertEnabled: item["clientCertEnabled"],
  };
}

export function signalRFeatureArraySerializer(result: Array<SignalRFeature>): any[] {
  return result.map((item) => {
    return signalRFeatureSerializer(item);
  });
}

export function signalRFeatureArrayDeserializer(result: Array<SignalRFeature>): any[] {
  return result.map((item) => {
    return signalRFeatureDeserializer(item);
  });
}

/** Feature of a resource, which controls the runtime behavior. */
export interface SignalRFeature {
  /**
   * FeatureFlags is the supported features of Azure SignalR service.
   * - ServiceMode: Flag for backend server for SignalR service. Values allowed: "Default": have your own backend server; "Serverless": your application doesn't have a backend server; "Classic": for backward compatibility. Support both Default and Serverless mode but not recommended; "PredefinedOnly": for future use.
   * - EnableConnectivityLogs: "true"/"false", to enable/disable the connectivity log category respectively.
   * - EnableMessagingLogs: "true"/"false", to enable/disable the connectivity log category respectively.
   * - EnableLiveTrace: Live Trace allows you to know what's happening inside Azure SignalR service, it will give you live traces in real time, it will be helpful when you developing your own Azure SignalR based web application or self-troubleshooting some issues. Please note that live traces are counted as outbound messages that will be charged. Values allowed: "true"/"false", to enable/disable live trace feature.
   */
  flag: FeatureFlags;
  /** Value of the feature flag. See Azure SignalR service document https://docs.microsoft.com/azure/azure-signalr/ for allowed values. */
  value: string;
  /** Optional properties related to this feature. */
  properties?: Record<string, string>;
}

export function signalRFeatureSerializer(item: SignalRFeature): any {
  return { flag: item["flag"], value: item["value"], properties: item["properties"] };
}

export function signalRFeatureDeserializer(item: any): SignalRFeature {
  return {
    flag: item["flag"],
    value: item["value"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * FeatureFlags is the supported features of Azure SignalR service.
 * - ServiceMode: Flag for backend server for SignalR service. Values allowed: "Default": have your own backend server; "Serverless": your application doesn't have a backend server; "Classic": for backward compatibility. Support both Default and Serverless mode but not recommended; "PredefinedOnly": for future use.
 * - EnableConnectivityLogs: "true"/"false", to enable/disable the connectivity log category respectively.
 * - EnableMessagingLogs: "true"/"false", to enable/disable the connectivity log category respectively.
 * - EnableLiveTrace: Live Trace allows you to know what's happening inside Azure SignalR service, it will give you live traces in real time, it will be helpful when you developing your own Azure SignalR based web application or self-troubleshooting some issues. Please note that live traces are counted as outbound messages that will be charged. Values allowed: "true"/"false", to enable/disable live trace feature.
 */
export enum KnownFeatureFlags {
  /** ServiceMode */
  ServiceMode = "ServiceMode",
  /** EnableConnectivityLogs */
  EnableConnectivityLogs = "EnableConnectivityLogs",
  /** EnableMessagingLogs */
  EnableMessagingLogs = "EnableMessagingLogs",
  /** EnableLiveTrace */
  EnableLiveTrace = "EnableLiveTrace",
}

/**
 * FeatureFlags is the supported features of Azure SignalR service.
 * - ServiceMode: Flag for backend server for SignalR service. Values allowed: "Default": have your own backend server; "Serverless": your application doesn't have a backend server; "Classic": for backward compatibility. Support both Default and Serverless mode but not recommended; "PredefinedOnly": for future use.
 * - EnableConnectivityLogs: "true"/"false", to enable/disable the connectivity log category respectively.
 * - EnableMessagingLogs: "true"/"false", to enable/disable the connectivity log category respectively.
 * - EnableLiveTrace: Live Trace allows you to know what's happening inside Azure SignalR service, it will give you live traces in real time, it will be helpful when you developing your own Azure SignalR based web application or self-troubleshooting some issues. Please note that live traces are counted as outbound messages that will be charged. Values allowed: "true"/"false", to enable/disable live trace feature. \
 * {@link KnownFeatureFlags} can be used interchangeably with FeatureFlags,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceMode** \
 * **EnableConnectivityLogs** \
 * **EnableMessagingLogs** \
 * **EnableLiveTrace**
 */
export type FeatureFlags = string;

/** Live trace configuration of a Microsoft.SignalRService resource. */
export interface LiveTraceConfiguration {
  /**
   * Indicates whether or not enable live trace.
   * When it's set to true, live trace client can connect to the service.
   * Otherwise, live trace client can't connect to the service, so that you are unable to receive any log, no matter what you configure in "categories".
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
  /** Gets or sets the list of category configurations. */
  categories?: LiveTraceCategory[];
}

export function liveTraceConfigurationSerializer(item: LiveTraceConfiguration): any {
  return {
    enabled: item["enabled"],
    categories: !item["categories"]
      ? item["categories"]
      : liveTraceCategoryArraySerializer(item["categories"]),
  };
}

export function liveTraceConfigurationDeserializer(item: any): LiveTraceConfiguration {
  return {
    enabled: item["enabled"],
    categories: !item["categories"]
      ? item["categories"]
      : liveTraceCategoryArrayDeserializer(item["categories"]),
  };
}

export function liveTraceCategoryArraySerializer(result: Array<LiveTraceCategory>): any[] {
  return result.map((item) => {
    return liveTraceCategorySerializer(item);
  });
}

export function liveTraceCategoryArrayDeserializer(result: Array<LiveTraceCategory>): any[] {
  return result.map((item) => {
    return liveTraceCategoryDeserializer(item);
  });
}

/** Live trace category configuration of a Microsoft.SignalRService resource. */
export interface LiveTraceCategory {
  /**
   * Gets or sets the live trace category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: string;
  /**
   * Indicates whether or the live trace category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
}

export function liveTraceCategorySerializer(item: LiveTraceCategory): any {
  return { name: item["name"], enabled: item["enabled"] };
}

export function liveTraceCategoryDeserializer(item: any): LiveTraceCategory {
  return {
    name: item["name"],
    enabled: item["enabled"],
  };
}

/** Resource log configuration of a Microsoft.SignalRService resource. */
export interface ResourceLogConfiguration {
  /** Gets or sets the list of category configurations. */
  categories?: ResourceLogCategory[];
}

export function resourceLogConfigurationSerializer(item: ResourceLogConfiguration): any {
  return {
    categories: !item["categories"]
      ? item["categories"]
      : resourceLogCategoryArraySerializer(item["categories"]),
  };
}

export function resourceLogConfigurationDeserializer(item: any): ResourceLogConfiguration {
  return {
    categories: !item["categories"]
      ? item["categories"]
      : resourceLogCategoryArrayDeserializer(item["categories"]),
  };
}

export function resourceLogCategoryArraySerializer(result: Array<ResourceLogCategory>): any[] {
  return result.map((item) => {
    return resourceLogCategorySerializer(item);
  });
}

export function resourceLogCategoryArrayDeserializer(result: Array<ResourceLogCategory>): any[] {
  return result.map((item) => {
    return resourceLogCategoryDeserializer(item);
  });
}

/** Resource log category configuration of a Microsoft.SignalRService resource. */
export interface ResourceLogCategory {
  /**
   * Gets or sets the resource log category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: string;
  /**
   * Indicates whether or the resource log category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
}

export function resourceLogCategorySerializer(item: ResourceLogCategory): any {
  return { name: item["name"], enabled: item["enabled"] };
}

export function resourceLogCategoryDeserializer(item: any): ResourceLogCategory {
  return {
    name: item["name"],
    enabled: item["enabled"],
  };
}

/** Cross-Origin Resource Sharing (CORS) settings. */
export interface SignalRCorsSettings {
  /** Gets or sets the list of origins that should be allowed to make cross-origin calls (for example: http://example.com:12345). Use "*" to allow all. If omitted, allow all by default. */
  allowedOrigins?: string[];
}

export function signalRCorsSettingsSerializer(item: SignalRCorsSettings): any {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
  };
}

export function signalRCorsSettingsDeserializer(item: any): SignalRCorsSettings {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
  };
}

/** Serverless settings. */
export interface ServerlessSettings {
  /**
   * Gets or sets Client Connection Timeout. Optional to be set.
   * Value in seconds.
   * Default value is 30 seconds.
   * Customer should set the timeout to a shorter period if messages are expected to be sent in shorter intervals,
   * and want the client to disconnect more quickly after the last message is sent.
   * You can set the timeout to a longer period if messages are expected to be sent in longer intervals,
   * and they want to keep the same client connection alive during this session.
   * The service considers the client disconnected if it hasn't received a message (including keep-alive) in this interval.
   */
  connectionTimeoutInSeconds?: number;
  /**
   * Gets or sets the Keep-Alive Interval. Optional to set.
   * Value is in seconds.
   * The default value is 15 seconds.
   * Customers should set this value to a shorter period if they want the service to send keep-alive messages more frequently,
   * ensuring timely checks of the connection status.
   * Conversely, customers can set this value to a longer period if they want the service to send keep-alive messages less frequently,
   * reducing network traffic, but note that it may take longer to detect a disconnection.
   * This interval ensures that the connection is maintained by sending periodic keep-alive messages to the client.
   */
  keepAliveIntervalInSeconds?: number;
}

export function serverlessSettingsSerializer(item: ServerlessSettings): any {
  return {
    connectionTimeoutInSeconds: item["connectionTimeoutInSeconds"],
    keepAliveIntervalInSeconds: item["keepAliveIntervalInSeconds"],
  };
}

export function serverlessSettingsDeserializer(item: any): ServerlessSettings {
  return {
    connectionTimeoutInSeconds: item["connectionTimeoutInSeconds"],
    keepAliveIntervalInSeconds: item["keepAliveIntervalInSeconds"],
  };
}

/** The settings for the Upstream when the service is in server-less mode. */
export interface ServerlessUpstreamSettings {
  /** Gets or sets the list of Upstream URL templates. Order matters, and the first matching template takes effects. */
  templates?: UpstreamTemplate[];
}

export function serverlessUpstreamSettingsSerializer(item: ServerlessUpstreamSettings): any {
  return {
    templates: !item["templates"]
      ? item["templates"]
      : upstreamTemplateArraySerializer(item["templates"]),
  };
}

export function serverlessUpstreamSettingsDeserializer(item: any): ServerlessUpstreamSettings {
  return {
    templates: !item["templates"]
      ? item["templates"]
      : upstreamTemplateArrayDeserializer(item["templates"]),
  };
}

export function upstreamTemplateArraySerializer(result: Array<UpstreamTemplate>): any[] {
  return result.map((item) => {
    return upstreamTemplateSerializer(item);
  });
}

export function upstreamTemplateArrayDeserializer(result: Array<UpstreamTemplate>): any[] {
  return result.map((item) => {
    return upstreamTemplateDeserializer(item);
  });
}

/**
 * Upstream template item settings. It defines the Upstream URL of the incoming requests.
 * The template defines the pattern of the event, the hub or the category of the incoming request that matches current URL template.
 */
export interface UpstreamTemplate {
  /**
   * Gets or sets the matching pattern for hub names. If not set, it matches any hub.
   * There are 3 kind of patterns supported:
   * 1. "*", it to matches any hub name.
   * 2. Combine multiple hubs with ",", for example "hub1,hub2", it matches "hub1" and "hub2".
   * 3. The single hub name, for example, "hub1", it matches "hub1".
   */
  hubPattern?: string;
  /**
   * Gets or sets the matching pattern for event names. If not set, it matches any event.
   * There are 3 kind of patterns supported:
   * 1. "*", it to matches any event name.
   * 2. Combine multiple events with ",", for example "connect,disconnect", it matches event "connect" and "disconnect".
   * 3. The single event name, for example, "connect", it matches "connect".
   */
  eventPattern?: string;
  /**
   * Gets or sets the matching pattern for category names. If not set, it matches any category.
   * There are 3 kind of patterns supported:
   * 1. "*", it to matches any category name.
   * 2. Combine multiple categories with ",", for example "connections,messages", it matches category "connections" and "messages".
   * 3. The single category name, for example, "connections", it matches the category "connections".
   */
  categoryPattern?: string;
  /**
   * Gets or sets the Upstream URL template. You can use 3 predefined parameters {hub}, {category} {event} inside the template, the value of the Upstream URL is dynamically calculated when the client request comes in.
   * For example, if the urlTemplate is `http://example.com/{hub}/api/{event}`, with a client request from hub `chat` connects, it will first POST to this URL: `http://example.com/chat/api/connect`.
   */
  urlTemplate: string;
  /** Upstream auth settings. If not set, no auth is used for upstream messages. */
  auth?: UpstreamAuthSettings;
}

export function upstreamTemplateSerializer(item: UpstreamTemplate): any {
  return {
    hubPattern: item["hubPattern"],
    eventPattern: item["eventPattern"],
    categoryPattern: item["categoryPattern"],
    urlTemplate: item["urlTemplate"],
    auth: !item["auth"] ? item["auth"] : upstreamAuthSettingsSerializer(item["auth"]),
  };
}

export function upstreamTemplateDeserializer(item: any): UpstreamTemplate {
  return {
    hubPattern: item["hubPattern"],
    eventPattern: item["eventPattern"],
    categoryPattern: item["categoryPattern"],
    urlTemplate: item["urlTemplate"],
    auth: !item["auth"] ? item["auth"] : upstreamAuthSettingsDeserializer(item["auth"]),
  };
}

/** Upstream auth settings. If not set, no auth is used for upstream messages. */
export interface UpstreamAuthSettings {
  /** Upstream auth type enum. */
  type?: UpstreamAuthType;
  /** Managed identity settings for upstream. */
  managedIdentity?: ManagedIdentitySettings;
}

export function upstreamAuthSettingsSerializer(item: UpstreamAuthSettings): any {
  return {
    type: item["type"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentitySettingsSerializer(item["managedIdentity"]),
  };
}

export function upstreamAuthSettingsDeserializer(item: any): UpstreamAuthSettings {
  return {
    type: item["type"],
    managedIdentity: !item["managedIdentity"]
      ? item["managedIdentity"]
      : managedIdentitySettingsDeserializer(item["managedIdentity"]),
  };
}

/** Upstream auth type enum. */
export enum KnownUpstreamAuthType {
  /** None */
  None = "None",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * Upstream auth type enum. \
 * {@link KnownUpstreamAuthType} can be used interchangeably with UpstreamAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ManagedIdentity**
 */
export type UpstreamAuthType = string;

/** Managed identity settings for upstream. */
export interface ManagedIdentitySettings {
  /**
   * The Resource indicating the App ID URI of the target resource.
   * It also appears in the aud (audience) claim of the issued token.
   */
  resource?: string;
}

export function managedIdentitySettingsSerializer(item: ManagedIdentitySettings): any {
  return { resource: item["resource"] };
}

export function managedIdentitySettingsDeserializer(item: any): ManagedIdentitySettings {
  return {
    resource: item["resource"],
  };
}

/** Network ACLs for the resource */
export interface SignalRNetworkACLs {
  /** Azure Networking ACL Action. */
  defaultAction?: ACLAction;
  /** Network ACL */
  publicNetwork?: NetworkACL;
  /** ACLs for requests from private endpoints */
  privateEndpoints?: PrivateEndpointACL[];
  /** IP rules for filtering public traffic */
  ipRules?: IPRule[];
}

export function signalRNetworkACLsSerializer(item: SignalRNetworkACLs): any {
  return {
    defaultAction: item["defaultAction"],
    publicNetwork: !item["publicNetwork"]
      ? item["publicNetwork"]
      : networkACLSerializer(item["publicNetwork"]),
    privateEndpoints: !item["privateEndpoints"]
      ? item["privateEndpoints"]
      : privateEndpointACLArraySerializer(item["privateEndpoints"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
  };
}

export function signalRNetworkACLsDeserializer(item: any): SignalRNetworkACLs {
  return {
    defaultAction: item["defaultAction"],
    publicNetwork: !item["publicNetwork"]
      ? item["publicNetwork"]
      : networkACLDeserializer(item["publicNetwork"]),
    privateEndpoints: !item["privateEndpoints"]
      ? item["privateEndpoints"]
      : privateEndpointACLArrayDeserializer(item["privateEndpoints"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
  };
}

/** Azure Networking ACL Action. */
export enum KnownACLAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Azure Networking ACL Action. \
 * {@link KnownACLAction} can be used interchangeably with ACLAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type ACLAction = string;

/** Network ACL */
export interface NetworkACL {
  /** Allowed request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI. */
  allow?: SignalRRequestType[];
  /** Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI. */
  deny?: SignalRRequestType[];
}

export function networkACLSerializer(item: NetworkACL): any {
  return {
    allow: !item["allow"]
      ? item["allow"]
      : item["allow"].map((p: any) => {
          return p;
        }),
    deny: !item["deny"]
      ? item["deny"]
      : item["deny"].map((p: any) => {
          return p;
        }),
  };
}

export function networkACLDeserializer(item: any): NetworkACL {
  return {
    allow: !item["allow"]
      ? item["allow"]
      : item["allow"].map((p: any) => {
          return p;
        }),
    deny: !item["deny"]
      ? item["deny"]
      : item["deny"].map((p: any) => {
          return p;
        }),
  };
}

/** The incoming request type to the service */
export enum KnownSignalRRequestType {
  /** ClientConnection */
  ClientConnection = "ClientConnection",
  /** ServerConnection */
  ServerConnection = "ServerConnection",
  /** RESTAPI */
  Restapi = "RESTAPI",
  /** Trace */
  Trace = "Trace",
}

/**
 * The incoming request type to the service \
 * {@link KnownSignalRRequestType} can be used interchangeably with SignalRRequestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClientConnection** \
 * **ServerConnection** \
 * **RESTAPI** \
 * **Trace**
 */
export type SignalRRequestType = string;

export function privateEndpointACLArraySerializer(result: Array<PrivateEndpointACL>): any[] {
  return result.map((item) => {
    return privateEndpointACLSerializer(item);
  });
}

export function privateEndpointACLArrayDeserializer(result: Array<PrivateEndpointACL>): any[] {
  return result.map((item) => {
    return privateEndpointACLDeserializer(item);
  });
}

/** ACL for a private endpoint */
export interface PrivateEndpointACL extends NetworkACL {
  /** Name of the private endpoint connection */
  name: string;
}

export function privateEndpointACLSerializer(item: PrivateEndpointACL): any {
  return {
    allow: !item["allow"]
      ? item["allow"]
      : item["allow"].map((p: any) => {
          return p;
        }),
    deny: !item["deny"]
      ? item["deny"]
      : item["deny"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function privateEndpointACLDeserializer(item: any): PrivateEndpointACL {
  return {
    allow: !item["allow"]
      ? item["allow"]
      : item["allow"].map((p: any) => {
          return p;
        }),
    deny: !item["deny"]
      ? item["deny"]
      : item["deny"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function ipRuleArraySerializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** An IP rule */
export interface IPRule {
  /** An IP or CIDR or ServiceTag */
  value?: string;
  /** Azure Networking ACL Action. */
  action?: ACLAction;
}

export function ipRuleSerializer(item: IPRule): any {
  return { value: item["value"], action: item["action"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    value: item["value"],
    action: item["action"],
  };
}

/** Application firewall settings for the resource */
export interface ApplicationFirewallSettings {
  /** Rules to control the client connection count */
  clientConnectionCountRules?: ClientConnectionCountRuleUnion[];
  /** Rules to control the client traffic */
  clientTrafficControlRules?: ClientTrafficControlRuleUnion[];
  /** Config to control the client connection lifetime in seconds, can be set to 0 to disable the config */
  maxClientConnectionLifetimeInSeconds?: number;
}

export function applicationFirewallSettingsSerializer(item: ApplicationFirewallSettings): any {
  return {
    clientConnectionCountRules: !item["clientConnectionCountRules"]
      ? item["clientConnectionCountRules"]
      : clientConnectionCountRuleUnionArraySerializer(item["clientConnectionCountRules"]),
    clientTrafficControlRules: !item["clientTrafficControlRules"]
      ? item["clientTrafficControlRules"]
      : clientTrafficControlRuleUnionArraySerializer(item["clientTrafficControlRules"]),
    maxClientConnectionLifetimeInSeconds: item["maxClientConnectionLifetimeInSeconds"],
  };
}

export function applicationFirewallSettingsDeserializer(item: any): ApplicationFirewallSettings {
  return {
    clientConnectionCountRules: !item["clientConnectionCountRules"]
      ? item["clientConnectionCountRules"]
      : clientConnectionCountRuleUnionArrayDeserializer(item["clientConnectionCountRules"]),
    clientTrafficControlRules: !item["clientTrafficControlRules"]
      ? item["clientTrafficControlRules"]
      : clientTrafficControlRuleUnionArrayDeserializer(item["clientTrafficControlRules"]),
    maxClientConnectionLifetimeInSeconds: item["maxClientConnectionLifetimeInSeconds"],
  };
}

export function clientConnectionCountRuleUnionArraySerializer(
  result: Array<ClientConnectionCountRuleUnion>,
): any[] {
  return result.map((item) => {
    return clientConnectionCountRuleUnionSerializer(item);
  });
}

export function clientConnectionCountRuleUnionArrayDeserializer(
  result: Array<ClientConnectionCountRuleUnion>,
): any[] {
  return result.map((item) => {
    return clientConnectionCountRuleUnionDeserializer(item);
  });
}

/** A base class for client connection count rules */
export interface ClientConnectionCountRule {
  type: ClientConnectionCountRuleDiscriminator;
}

export function clientConnectionCountRuleSerializer(item: ClientConnectionCountRule): any {
  return { type: item["type"] };
}

export function clientConnectionCountRuleDeserializer(item: any): ClientConnectionCountRule {
  return {
    type: item["type"],
  };
}

/** Alias for ClientConnectionCountRuleUnion */
export type ClientConnectionCountRuleUnion =
  | ThrottleByJwtCustomClaimRule
  | ThrottleByJwtSignatureRule
  | ThrottleByUserIdRule
  | ClientConnectionCountRule;

export function clientConnectionCountRuleUnionSerializer(
  item: ClientConnectionCountRuleUnion,
): any {
  switch (item.type) {
    case "ThrottleByJwtCustomClaimRule":
      return throttleByJwtCustomClaimRuleSerializer(item as ThrottleByJwtCustomClaimRule);

    case "ThrottleByJwtSignatureRule":
      return throttleByJwtSignatureRuleSerializer(item as ThrottleByJwtSignatureRule);

    case "ThrottleByUserIdRule":
      return throttleByUserIdRuleSerializer(item as ThrottleByUserIdRule);

    default:
      return clientConnectionCountRuleSerializer(item);
  }
}

export function clientConnectionCountRuleUnionDeserializer(
  item: any,
): ClientConnectionCountRuleUnion {
  switch (item["type"]) {
    case "ThrottleByJwtCustomClaimRule":
      return throttleByJwtCustomClaimRuleDeserializer(item as ThrottleByJwtCustomClaimRule);

    case "ThrottleByJwtSignatureRule":
      return throttleByJwtSignatureRuleDeserializer(item as ThrottleByJwtSignatureRule);

    case "ThrottleByUserIdRule":
      return throttleByUserIdRuleDeserializer(item as ThrottleByUserIdRule);

    default:
      return clientConnectionCountRuleDeserializer(item);
  }
}

/** Known values of {@link ClientConnectionCountRuleDiscriminator} that the service accepts. */
export enum KnownClientConnectionCountRuleDiscriminator {
  /** ThrottleByJwtSignatureRule */
  ThrottleByJwtSignatureRule = "ThrottleByJwtSignatureRule",
  /** ThrottleByUserIdRule */
  ThrottleByUserIdRule = "ThrottleByUserIdRule",
  /** ThrottleByJwtCustomClaimRule */
  ThrottleByJwtCustomClaimRule = "ThrottleByJwtCustomClaimRule",
}

/** Type of ClientConnectionCountRuleDiscriminator */
export type ClientConnectionCountRuleDiscriminator = string;

/** Throttle the client connection by a custom JWT claim */
export interface ThrottleByJwtCustomClaimRule extends ClientConnectionCountRule {
  /** The name of the claim in the JWT token. The client connection with the same claim value will be aggregated. If the claim is not found in the token, the connection will be allowed. */
  claimName: string;
  /** Maximum connection count allowed for the same Jwt claim value. Clients with the same Jwt claim will get rejected if the connection count exceeds this value. Default value is 20. */
  maxCount?: number;
  type: "ThrottleByJwtCustomClaimRule";
}

export function throttleByJwtCustomClaimRuleSerializer(item: ThrottleByJwtCustomClaimRule): any {
  return { type: item["type"], claimName: item["claimName"], maxCount: item["maxCount"] };
}

export function throttleByJwtCustomClaimRuleDeserializer(item: any): ThrottleByJwtCustomClaimRule {
  return {
    type: item["type"],
    claimName: item["claimName"],
    maxCount: item["maxCount"],
  };
}

/** Throttle the client connection by the JWT signature */
export interface ThrottleByJwtSignatureRule extends ClientConnectionCountRule {
  /** Maximum connection count allowed for the same JWT signature. Clients with the same JWT signature will get rejected if the connection count exceeds this value. Default value is 20. */
  maxCount?: number;
  type: "ThrottleByJwtSignatureRule";
}

export function throttleByJwtSignatureRuleSerializer(item: ThrottleByJwtSignatureRule): any {
  return { type: item["type"], maxCount: item["maxCount"] };
}

export function throttleByJwtSignatureRuleDeserializer(item: any): ThrottleByJwtSignatureRule {
  return {
    type: item["type"],
    maxCount: item["maxCount"],
  };
}

/** Throttle the client connection by the user ID */
export interface ThrottleByUserIdRule extends ClientConnectionCountRule {
  /** Maximum connection count allowed for the same user ID. Clients with the same user ID will get rejected if the connection count exceeds this value. Default value is 20. */
  maxCount?: number;
  type: "ThrottleByUserIdRule";
}

export function throttleByUserIdRuleSerializer(item: ThrottleByUserIdRule): any {
  return { type: item["type"], maxCount: item["maxCount"] };
}

export function throttleByUserIdRuleDeserializer(item: any): ThrottleByUserIdRule {
  return {
    type: item["type"],
    maxCount: item["maxCount"],
  };
}

export function clientTrafficControlRuleUnionArraySerializer(
  result: Array<ClientTrafficControlRuleUnion>,
): any[] {
  return result.map((item) => {
    return clientTrafficControlRuleUnionSerializer(item);
  });
}

export function clientTrafficControlRuleUnionArrayDeserializer(
  result: Array<ClientTrafficControlRuleUnion>,
): any[] {
  return result.map((item) => {
    return clientTrafficControlRuleUnionDeserializer(item);
  });
}

/** A base class for client traffic control rules */
export interface ClientTrafficControlRule {
  type: ClientTrafficControlRuleDiscriminator;
}

export function clientTrafficControlRuleSerializer(item: ClientTrafficControlRule): any {
  return { type: item["type"] };
}

export function clientTrafficControlRuleDeserializer(item: any): ClientTrafficControlRule {
  return {
    type: item["type"],
  };
}

/** Alias for ClientTrafficControlRuleUnion */
export type ClientTrafficControlRuleUnion =
  | TrafficThrottleByJwtCustomClaimRule
  | TrafficThrottleByJwtSignatureRule
  | TrafficThrottleByUserIdRule
  | ClientTrafficControlRule;

export function clientTrafficControlRuleUnionSerializer(item: ClientTrafficControlRuleUnion): any {
  switch (item.type) {
    case "TrafficThrottleByJwtCustomClaimRule":
      return trafficThrottleByJwtCustomClaimRuleSerializer(
        item as TrafficThrottleByJwtCustomClaimRule,
      );

    case "TrafficThrottleByJwtSignatureRule":
      return trafficThrottleByJwtSignatureRuleSerializer(item as TrafficThrottleByJwtSignatureRule);

    case "TrafficThrottleByUserIdRule":
      return trafficThrottleByUserIdRuleSerializer(item as TrafficThrottleByUserIdRule);

    default:
      return clientTrafficControlRuleSerializer(item);
  }
}

export function clientTrafficControlRuleUnionDeserializer(
  item: any,
): ClientTrafficControlRuleUnion {
  switch (item["type"]) {
    case "TrafficThrottleByJwtCustomClaimRule":
      return trafficThrottleByJwtCustomClaimRuleDeserializer(
        item as TrafficThrottleByJwtCustomClaimRule,
      );

    case "TrafficThrottleByJwtSignatureRule":
      return trafficThrottleByJwtSignatureRuleDeserializer(
        item as TrafficThrottleByJwtSignatureRule,
      );

    case "TrafficThrottleByUserIdRule":
      return trafficThrottleByUserIdRuleDeserializer(item as TrafficThrottleByUserIdRule);

    default:
      return clientTrafficControlRuleDeserializer(item);
  }
}

/** Known values of {@link ClientTrafficControlRuleDiscriminator} that the service accepts. */
export enum KnownClientTrafficControlRuleDiscriminator {
  /** TrafficThrottleByJwtSignatureRule */
  TrafficThrottleByJwtSignatureRule = "TrafficThrottleByJwtSignatureRule",
  /** TrafficThrottleByUserIdRule */
  TrafficThrottleByUserIdRule = "TrafficThrottleByUserIdRule",
  /** TrafficThrottleByJwtCustomClaimRule */
  TrafficThrottleByJwtCustomClaimRule = "TrafficThrottleByJwtCustomClaimRule",
}

/** Type of ClientTrafficControlRuleDiscriminator */
export type ClientTrafficControlRuleDiscriminator = string;

/** Throttle the client traffic by a custom JWT claim */
export interface TrafficThrottleByJwtCustomClaimRule extends ClientTrafficControlRule {
  /** The name of the claim in the JWT token. The message bytes with the same claim value will be aggregated. If the claim is not found in the token, the rule will be skipped. */
  claimName: string;
  /** Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT claim will get disconnected if the message bytes exceeds this value. Default value is 1GB. */
  maxInboundMessageBytes?: number;
  /** The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds. */
  aggregationWindowInSeconds?: number;
  type: "TrafficThrottleByJwtCustomClaimRule";
}

export function trafficThrottleByJwtCustomClaimRuleSerializer(
  item: TrafficThrottleByJwtCustomClaimRule,
): any {
  return {
    type: item["type"],
    claimName: item["claimName"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

export function trafficThrottleByJwtCustomClaimRuleDeserializer(
  item: any,
): TrafficThrottleByJwtCustomClaimRule {
  return {
    type: item["type"],
    claimName: item["claimName"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

/** Throttle the client traffic by the JWT signature */
export interface TrafficThrottleByJwtSignatureRule extends ClientTrafficControlRule {
  /** Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT signature will get disconnected if the message bytes exceeds this value. Default value is 1GB. */
  maxInboundMessageBytes?: number;
  /** The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds. */
  aggregationWindowInSeconds?: number;
  type: "TrafficThrottleByJwtSignatureRule";
}

export function trafficThrottleByJwtSignatureRuleSerializer(
  item: TrafficThrottleByJwtSignatureRule,
): any {
  return {
    type: item["type"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

export function trafficThrottleByJwtSignatureRuleDeserializer(
  item: any,
): TrafficThrottleByJwtSignatureRule {
  return {
    type: item["type"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

/** Throttle the client traffic by the user ID */
export interface TrafficThrottleByUserIdRule extends ClientTrafficControlRule {
  /** Maximum accumulated inbound message bytes allowed for the same user ID within a time window. Clients with the same user ID will get disconnected if the message bytes exceeds this value. Default value is 1GB. */
  maxInboundMessageBytes?: number;
  /** The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds. */
  aggregationWindowInSeconds?: number;
  type: "TrafficThrottleByUserIdRule";
}

export function trafficThrottleByUserIdRuleSerializer(item: TrafficThrottleByUserIdRule): any {
  return {
    type: item["type"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

export function trafficThrottleByUserIdRuleDeserializer(item: any): TrafficThrottleByUserIdRule {
  return {
    type: item["type"],
    maxInboundMessageBytes: item["maxInboundMessageBytes"],
    aggregationWindowInSeconds: item["aggregationWindowInSeconds"],
  };
}

/** Route settings for the resource */
export interface RouteSettings {
  /**
   * Gets or sets the server balance weight.
   * A higher value means a greater balance of client connections across different app server instances.
   * A value of 0 distributes connections randomly, while a value of 255 ensures maximum balancing.
   * The default value is 255.
   * Recommended ```255``` for multiple app servers in same size.
   */
  serverBalanceWeight?: number;
  /**
   * Gets or sets the connection balance weight.
   * A higher value means a greater balance of client connections across different server connections.
   * A value of 0 distributes connections randomly, while a value of 255 ensures maximum balancing.
   * The default value is 255.
   * Recommended ```255``` for all of the cases.
   */
  connectionBalanceWeight?: number;
  /**
   * Gets or sets the weight for latency-based routing.
   * A higher value increases the influence of latency-based routing.
   * A value of 0 disables latency-based routing entirely, while a value of 255 enables it fully.
   * The default value is 0.
   * Recommended ```255``` for replicas or app servers in different regions for disaster recovery.
   */
  latencyWeight?: number;
}

export function routeSettingsSerializer(item: RouteSettings): any {
  return {
    serverBalanceWeight: item["serverBalanceWeight"],
    connectionBalanceWeight: item["connectionBalanceWeight"],
    latencyWeight: item["latencyWeight"],
  };
}

export function routeSettingsDeserializer(item: any): RouteSettings {
  return {
    serverBalanceWeight: item["serverBalanceWeight"],
    connectionBalanceWeight: item["connectionBalanceWeight"],
    latencyWeight: item["latencyWeight"],
  };
}

/** The billing information of the resource. */
export interface ResourceSku {
  /**
   * The name of the SKU. Required.
   *
   * Allowed values: Standard_S1, Free_F1, Premium_P1, Premium_P2
   */
  name: string;
  /**
   * Optional tier of this particular SKU. 'Standard' or 'Free'.
   *
   * `Basic` is deprecated, use `Standard` instead.
   */
  tier?: SignalRSkuTier;
  /** Not used. Retained for future use. */
  readonly size?: string;
  /** Not used. Retained for future use. */
  readonly family?: string;
  /**
   * Optional, integer. The unit count of the resource.
   * 1 for Free_F1/Standard_S1/Premium_P1, 100 for Premium_P2 by default.
   *
   * If present, following values are allowed:
   * Free_F1: 1;
   * Standard_S1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P1:  1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P2:  100,200,300,400,500,600,700,800,900,1000;
   */
  capacity?: number;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/**
 * Optional tier of this particular SKU. 'Standard' or 'Free'.
 *
 * `Basic` is deprecated, use `Standard` instead.
 */
export enum KnownSignalRSkuTier {
  /** Free */
  Free = "Free",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * Optional tier of this particular SKU. 'Standard' or 'Free'.
 *
 * `Basic` is deprecated, use `Standard` instead. \
 * {@link KnownSignalRSkuTier} can be used interchangeably with SignalRSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free** \
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type SignalRSkuTier = string;

/** The kind of the service */
export enum KnownServiceKind {
  /** SignalR */
  SignalR = "SignalR",
  /** RawWebSockets */
  RawWebSockets = "RawWebSockets",
}

/**
 * The kind of the service \
 * {@link KnownServiceKind} can be used interchangeably with ServiceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SignalR** \
 * **RawWebSockets**
 */
export type ServiceKind = string;

/** A class represent managed identities used for request and response */
export interface ManagedIdentity {
  /** Represents the identity type: systemAssigned, userAssigned, None */
  type?: ManagedIdentityType;
  /** Get or set the user assigned identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentityProperty>;
  /**
   * Get the principal id for the system assigned identity.
   * Only be used in response.
   */
  readonly principalId?: string;
  /**
   * Get the tenant id for the system assigned identity.
   * Only be used in response
   */
  readonly tenantId?: string;
}

export function managedIdentitySerializer(item: ManagedIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityPropertyRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedIdentityDeserializer(item: any): ManagedIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityPropertyRecordDeserializer(item["userAssignedIdentities"]),
    principalId: item["principalId"],
    tenantId: item["tenantId"],
  };
}

/** Represents the identity type: systemAssigned, userAssigned, None */
export enum KnownManagedIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Represents the identity type: systemAssigned, userAssigned, None \
 * {@link KnownManagedIdentityType} can be used interchangeably with ManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned**
 */
export type ManagedIdentityType = string;

export function userAssignedIdentityPropertyRecordSerializer(
  item: Record<string, UserAssignedIdentityProperty>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityPropertySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityPropertyRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentityProperty> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityPropertyDeserializer(item[key]);
  });
  return result;
}

/** Properties of user assigned identity. */
export interface UserAssignedIdentityProperty {
  /** Get the principal id for the user assigned identity */
  readonly principalId?: string;
  /** Get the client id for the user assigned identity */
  readonly clientId?: string;
}

export function userAssignedIdentityPropertySerializer(_item: UserAssignedIdentityProperty): any {
  return {};
}

export function userAssignedIdentityPropertyDeserializer(item: any): UserAssignedIdentityProperty {
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

/** Object that includes an array of resources and a possible link for next set. */
export interface _SignalRResourceList {
  /** The SignalRResource items on this page */
  value: SignalRResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _signalRResourceListDeserializer(item: any): _SignalRResourceList {
  return {
    value: signalRResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function signalRResourceArraySerializer(result: Array<SignalRResource>): any[] {
  return result.map((item) => {
    return signalRResourceSerializer(item);
  });
}

export function signalRResourceArrayDeserializer(result: Array<SignalRResource>): any[] {
  return result.map((item) => {
    return signalRResourceDeserializer(item);
  });
}

/** A class represents the access keys of the resource. */
export interface SignalRKeys {
  /** The primary access key. */
  primaryKey?: string;
  /** The secondary access key. */
  secondaryKey?: string;
  /** Connection string constructed via the primaryKey */
  primaryConnectionString?: string;
  /** Connection string constructed via the secondaryKey */
  secondaryConnectionString?: string;
}

export function signalRKeysDeserializer(item: any): SignalRKeys {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
  };
}

/** Parameters describes the request to regenerate access keys */
export interface RegenerateKeyParameters {
  /** The type of access key. */
  keyType?: KeyType;
}

export function regenerateKeyParametersSerializer(item: RegenerateKeyParameters): any {
  return { keyType: item["keyType"] };
}

/** The type of access key. */
export enum KnownKeyType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
  /** Salt */
  Salt = "Salt",
}

/**
 * The type of access key. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary** \
 * **Salt**
 */
export type KeyType = string;

/** The list skus operation response */
export interface SkuList {
  /** The list of skus available for the resource. */
  readonly value?: Sku[];
  /**
   * The URL the client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  readonly nextLink?: string;
}

export function skuListDeserializer(item: any): SkuList {
  return {
    value: !item["value"] ? item["value"] : skuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuArrayDeserializer(result: Array<Sku>): any[] {
  return result.map((item) => {
    return skuDeserializer(item);
  });
}

/** Describes an available sku." */
export interface Sku {
  /** The resource type that this object applies to */
  readonly resourceType?: string;
  /** The billing information of the resource. */
  readonly sku?: ResourceSku;
  /** Describes scaling information of a sku. */
  readonly capacity?: SkuCapacity;
}

export function skuDeserializer(item: any): Sku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
  };
}

/** Describes scaling information of a sku. */
export interface SkuCapacity {
  /** The lowest permitted capacity for this resource */
  readonly minimum?: number;
  /** The highest permitted capacity for this resource */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** Allows capacity value list. */
  readonly allowedValues?: number[];
  /** The scale type applicable to the sku. */
  readonly scaleType?: ScaleType;
}

export function skuCapacityDeserializer(item: any): SkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export enum KnownScaleType {
  /** None */
  None = "None",
  /** Manual */
  Manual = "Manual",
  /** Automatic */
  Automatic = "Automatic",
}

/**
 * The scale type applicable to the sku. \
 * {@link KnownScaleType} can be used interchangeably with ScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Manual** \
 * **Automatic**
 */
export type ScaleType = string;

/** Data POST-ed to the nameAvailability action */
export interface NameAvailabilityParameters {
  /** The resource type. Can be "Microsoft.SignalRService/SignalR", "Microsoft.SignalRService/WebPubSub", "Microsoft.SignalRService/SignalR/replicas" or "Microsoft.SignalRService/WebPubSub/replicas" */
  type: string;
  /** The resource name to validate. e.g."my-resource-name" */
  name: string;
}

export function nameAvailabilityParametersSerializer(item: NameAvailabilityParameters): any {
  return { type: item["type"], name: item["name"] };
}

/** Result of the request to check name availability. It contains a flag and possible reason of failure. */
export interface NameAvailability {
  /** Indicates whether the name is available or not. */
  nameAvailable?: boolean;
  /** The reason of the availability. Required if name is not available. */
  reason?: string;
  /** The message of the operation. */
  message?: string;
}

export function nameAvailabilityDeserializer(item: any): NameAvailability {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Contains a list of PrivateLinkResource and a possible link to query more results */
export interface _PrivateLinkResourceList {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListDeserializer(item: any): _PrivateLinkResourceList {
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

/** Private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** Group Id of the private link resource */
  groupId?: string;
  /** Required members of the private link resource */
  requiredMembers?: string[];
  /** Required private DNS zone names */
  requiredZoneNames?: string[];
  /** The list of resources that are onboarded to private link service */
  shareablePrivateLinkResourceTypes?: ShareablePrivateLinkResourceType[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Private link resource properties */
export interface PrivateLinkResourceProperties {
  /** Group Id of the private link resource */
  groupId?: string;
  /** Required members of the private link resource */
  requiredMembers?: string[];
  /** Required private DNS zone names */
  requiredZoneNames?: string[];
  /** The list of resources that are onboarded to private link service */
  shareablePrivateLinkResourceTypes?: ShareablePrivateLinkResourceType[];
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
    shareablePrivateLinkResourceTypes: !item["shareablePrivateLinkResourceTypes"]
      ? item["shareablePrivateLinkResourceTypes"]
      : shareablePrivateLinkResourceTypeArrayDeserializer(
          item["shareablePrivateLinkResourceTypes"],
        ),
  };
}

export function shareablePrivateLinkResourceTypeArrayDeserializer(
  result: Array<ShareablePrivateLinkResourceType>,
): any[] {
  return result.map((item) => {
    return shareablePrivateLinkResourceTypeDeserializer(item);
  });
}

/** Describes a  resource type that has been onboarded to private link service */
export interface ShareablePrivateLinkResourceType {
  /** The name of the resource type that has been onboarded to private link service */
  name?: string;
  /** Describes the properties of a resource type that has been onboarded to private link service */
  properties?: ShareablePrivateLinkResourceProperties;
}

export function shareablePrivateLinkResourceTypeDeserializer(
  item: any,
): ShareablePrivateLinkResourceType {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : shareablePrivateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a resource type that has been onboarded to private link service */
export interface ShareablePrivateLinkResourceProperties {
  /** The description of the resource type that has been onboarded to private link service */
  description?: string;
  /** The resource provider group id for the resource that has been onboarded to private link service */
  groupId?: string;
  /** The resource provider type for the resource that has been onboarded to private link service */
  type?: string;
}

export function shareablePrivateLinkResourcePropertiesDeserializer(
  item: any,
): ShareablePrivateLinkResourceProperties {
  return {
    description: item["description"],
    groupId: item["groupId"],
    type: item["type"],
  };
}

/** A custom certificate. */
export interface CustomCertificate extends ProxyResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Base uri of the KeyVault that stores certificate. */
  keyVaultBaseUri: string;
  /** Certificate secret name. */
  keyVaultSecretName: string;
  /** Certificate secret version. */
  keyVaultSecretVersion?: string;
}

export function customCertificateSerializer(item: CustomCertificate): any {
  return { properties: _customCertificatePropertiesSerializer(item) };
}

export function customCertificateDeserializer(item: any): CustomCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._customCertificatePropertiesDeserializer(item["properties"]),
  };
}

/** Custom certificate properties. */
export interface CustomCertificateProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Base uri of the KeyVault that stores certificate. */
  keyVaultBaseUri: string;
  /** Certificate secret name. */
  keyVaultSecretName: string;
  /** Certificate secret version. */
  keyVaultSecretVersion?: string;
}

export function customCertificatePropertiesSerializer(item: CustomCertificateProperties): any {
  return {
    keyVaultBaseUri: item["keyVaultBaseUri"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretVersion: item["keyVaultSecretVersion"],
  };
}

export function customCertificatePropertiesDeserializer(item: any): CustomCertificateProperties {
  return {
    provisioningState: item["provisioningState"],
    keyVaultBaseUri: item["keyVaultBaseUri"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretVersion: item["keyVaultSecretVersion"],
  };
}

/** Custom certificates list. */
export interface _CustomCertificateList {
  /** The CustomCertificate items on this page */
  value: CustomCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customCertificateListDeserializer(item: any): _CustomCertificateList {
  return {
    value: customCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customCertificateArraySerializer(result: Array<CustomCertificate>): any[] {
  return result.map((item) => {
    return customCertificateSerializer(item);
  });
}

export function customCertificateArrayDeserializer(result: Array<CustomCertificate>): any[] {
  return result.map((item) => {
    return customCertificateDeserializer(item);
  });
}

/** A custom domain */
export interface CustomDomain extends ProxyResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The custom domain name. */
  domainName: string;
  /** Reference to a resource. */
  customCertificate: ResourceReference;
}

export function customDomainSerializer(item: CustomDomain): any {
  return { properties: _customDomainPropertiesSerializer(item) };
}

export function customDomainDeserializer(item: any): CustomDomain {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._customDomainPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a custom domain. */
export interface CustomDomainProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The custom domain name. */
  domainName: string;
  /** Reference to a resource. */
  customCertificate: ResourceReference;
}

export function customDomainPropertiesSerializer(item: CustomDomainProperties): any {
  return {
    domainName: item["domainName"],
    customCertificate: resourceReferenceSerializer(item["customCertificate"]),
  };
}

export function customDomainPropertiesDeserializer(item: any): CustomDomainProperties {
  return {
    provisioningState: item["provisioningState"],
    domainName: item["domainName"],
    customCertificate: resourceReferenceDeserializer(item["customCertificate"]),
  };
}

/** Reference to a resource. */
export interface ResourceReference {
  /** Resource ID. */
  id?: string;
}

export function resourceReferenceSerializer(item: ResourceReference): any {
  return { id: item["id"] };
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
  };
}

/** Custom domains list */
export interface _CustomDomainList {
  /** The CustomDomain items on this page */
  value: CustomDomain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customDomainListDeserializer(item: any): _CustomDomainList {
  return {
    value: customDomainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customDomainArraySerializer(result: Array<CustomDomain>): any[] {
  return result.map((item) => {
    return customDomainSerializer(item);
  });
}

export function customDomainArrayDeserializer(result: Array<CustomDomain>): any[] {
  return result.map((item) => {
    return customDomainDeserializer(item);
  });
}

/** A list of private endpoint connections */
export interface _PrivateEndpointConnectionList {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListDeserializer(
  item: any,
): _PrivateEndpointConnectionList {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A class represent a replica resource. */
export interface Replica extends TrackedResource {
  /** The billing information of the resource. */
  sku?: ResourceSku;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   */
  regionEndpointEnabled?: string;
  /**
   * Stop or start the resource.  Default to "false".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
}

export function replicaSerializer(item: Replica): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["regionEndpointEnabled", "resourceStopped"])
      ? undefined
      : _replicaPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
  };
}

export function replicaDeserializer(item: any): Replica {
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
    ...(!item["properties"]
      ? item["properties"]
      : _replicaPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
  };
}

/** model interface ReplicaProperties */
export interface ReplicaProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   */
  regionEndpointEnabled?: string;
  /**
   * Stop or start the resource.  Default to "false".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
}

export function replicaPropertiesSerializer(item: ReplicaProperties): any {
  return {
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
  };
}

export function replicaPropertiesDeserializer(item: any): ReplicaProperties {
  return {
    provisioningState: item["provisioningState"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
  };
}

/** Paged collection of Replica items */
export interface _ReplicaList {
  /** The Replica items on this page */
  value: Replica[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicaListDeserializer(item: any): _ReplicaList {
  return {
    value: replicaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicaArraySerializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaSerializer(item);
  });
}

export function replicaArrayDeserializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaDeserializer(item);
  });
}

/** Object that includes an array of the resource usages and a possible link for next set. */
export interface _SignalRUsageList {
  /** The SignalRUsage items on this page */
  value: SignalRUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _signalRUsageListDeserializer(item: any): _SignalRUsageList {
  return {
    value: signalRUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function signalRUsageArrayDeserializer(result: Array<SignalRUsage>): any[] {
  return result.map((item) => {
    return signalRUsageDeserializer(item);
  });
}

/** Object that describes a specific usage of the resources. */
export interface SignalRUsage {
  /** Fully qualified ARM resource id */
  id?: string;
  /** Current value for the usage quota. */
  currentValue?: number;
  /** The maximum permitted value for the usage quota. If there is no limit, this value will be -1. */
  limit?: number;
  /** Localizable String object containing the name and a localized value. */
  name?: SignalRUsageName;
  /** Representing the units of the usage quota. Possible values are: Count, Bytes, Seconds, Percent, CountPerSecond, BytesPerSecond. */
  unit?: string;
}

export function signalRUsageDeserializer(item: any): SignalRUsage {
  return {
    id: item["id"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : signalRUsageNameDeserializer(item["name"]),
    unit: item["unit"],
  };
}

/** Localizable String object containing the name and a localized value. */
export interface SignalRUsageName {
  /** The identifier of the usage. */
  value?: string;
  /** Localized name of the usage. */
  localizedValue?: string;
}

export function signalRUsageNameDeserializer(item: any): SignalRUsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01-preview API version. */
  V20250101Preview = "2025-01-01-preview",
}

export function _sharedPrivateLinkResourcePropertiesSerializer(
  item: SharedPrivateLinkResource,
): any {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

export function _sharedPrivateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    provisioningState: item["provisioningState"],
    requestMessage: item["requestMessage"],
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
    status: item["status"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _signalRResourcePropertiesSerializer(item: SignalRResource): any {
  return {
    tls: !item["tls"] ? item["tls"] : signalRTlsSettingsSerializer(item["tls"]),
    features: !item["features"]
      ? item["features"]
      : signalRFeatureArraySerializer(item["features"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationSerializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationSerializer(item["resourceLogConfiguration"]),
    cors: !item["cors"] ? item["cors"] : signalRCorsSettingsSerializer(item["cors"]),
    serverless: !item["serverless"]
      ? item["serverless"]
      : serverlessSettingsSerializer(item["serverless"]),
    upstream: !item["upstream"]
      ? item["upstream"]
      : serverlessUpstreamSettingsSerializer(item["upstream"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : signalRNetworkACLsSerializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsSerializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    routeSettings: !item["routeSettings"]
      ? item["routeSettings"]
      : routeSettingsSerializer(item["routeSettings"]),
  };
}

export function _signalRResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    externalIP: item["externalIP"],
    hostName: item["hostName"],
    publicPort: item["publicPort"],
    serverPort: item["serverPort"],
    version: item["version"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    tls: !item["tls"] ? item["tls"] : signalRTlsSettingsDeserializer(item["tls"]),
    hostNamePrefix: item["hostNamePrefix"],
    features: !item["features"]
      ? item["features"]
      : signalRFeatureArrayDeserializer(item["features"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationDeserializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationDeserializer(item["resourceLogConfiguration"]),
    cors: !item["cors"] ? item["cors"] : signalRCorsSettingsDeserializer(item["cors"]),
    serverless: !item["serverless"]
      ? item["serverless"]
      : serverlessSettingsDeserializer(item["serverless"]),
    upstream: !item["upstream"]
      ? item["upstream"]
      : serverlessUpstreamSettingsDeserializer(item["upstream"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : signalRNetworkACLsDeserializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsDeserializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    routeSettings: !item["routeSettings"]
      ? item["routeSettings"]
      : routeSettingsDeserializer(item["routeSettings"]),
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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
    shareablePrivateLinkResourceTypes: !item["shareablePrivateLinkResourceTypes"]
      ? item["shareablePrivateLinkResourceTypes"]
      : shareablePrivateLinkResourceTypeArrayDeserializer(
          item["shareablePrivateLinkResourceTypes"],
        ),
  };
}

export function _customCertificatePropertiesSerializer(item: CustomCertificate): any {
  return {
    keyVaultBaseUri: item["keyVaultBaseUri"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretVersion: item["keyVaultSecretVersion"],
  };
}

export function _customCertificatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    keyVaultBaseUri: item["keyVaultBaseUri"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretVersion: item["keyVaultSecretVersion"],
  };
}

export function _customDomainPropertiesSerializer(item: CustomDomain): any {
  return {
    domainName: item["domainName"],
    customCertificate: resourceReferenceSerializer(item["customCertificate"]),
  };
}

export function _customDomainPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    domainName: item["domainName"],
    customCertificate: resourceReferenceDeserializer(item["customCertificate"]),
  };
}

export function _replicaPropertiesSerializer(item: Replica): any {
  return {
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
  };
}

export function _replicaPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
  };
}
