// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
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

/** A hub setting */
export interface WebPubSubHub extends ProxyResource {
  /** Properties of a hub. */
  properties: WebPubSubHubProperties;
}

export function webPubSubHubSerializer(item: WebPubSubHub): any {
  return { properties: webPubSubHubPropertiesSerializer(item["properties"]) };
}

export function webPubSubHubDeserializer(item: any): WebPubSubHub {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: webPubSubHubPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a hub. */
export interface WebPubSubHubProperties {
  /** Event handler of a hub. */
  eventHandlers?: EventHandler[];
  /**
   * Event listener settings for forwarding your client events to listeners.
   * Event listener is transparent to Web PubSub clients, and it doesn't return any result to clients nor interrupt the lifetime of clients.
   * One event can be sent to multiple listeners, as long as it matches the filters in those listeners. The order of the array elements doesn't matter.
   * Maximum count of event listeners among all hubs is 10.
   */
  eventListeners?: EventListener[];
  /** The settings for configuring if anonymous connections are allowed for this hub: "allow" or "deny". Default to "deny". */
  anonymousConnectPolicy?: string;
  /** The settings for configuring the WebSocket ping-pong interval in seconds for all clients in the hub. Valid range: 1 to 120. Default to 20 seconds. */
  webSocketKeepAliveIntervalInSeconds?: number;
}

export function webPubSubHubPropertiesSerializer(item: WebPubSubHubProperties): any {
  return {
    eventHandlers: !item["eventHandlers"]
      ? item["eventHandlers"]
      : eventHandlerArraySerializer(item["eventHandlers"]),
    eventListeners: !item["eventListeners"]
      ? item["eventListeners"]
      : eventListenerArraySerializer(item["eventListeners"]),
    anonymousConnectPolicy: item["anonymousConnectPolicy"],
    webSocketKeepAliveIntervalInSeconds: item["webSocketKeepAliveIntervalInSeconds"],
  };
}

export function webPubSubHubPropertiesDeserializer(item: any): WebPubSubHubProperties {
  return {
    eventHandlers: !item["eventHandlers"]
      ? item["eventHandlers"]
      : eventHandlerArrayDeserializer(item["eventHandlers"]),
    eventListeners: !item["eventListeners"]
      ? item["eventListeners"]
      : eventListenerArrayDeserializer(item["eventListeners"]),
    anonymousConnectPolicy: item["anonymousConnectPolicy"],
    webSocketKeepAliveIntervalInSeconds: item["webSocketKeepAliveIntervalInSeconds"],
  };
}

export function eventHandlerArraySerializer(result: Array<EventHandler>): any[] {
  return result.map((item) => {
    return eventHandlerSerializer(item);
  });
}

export function eventHandlerArrayDeserializer(result: Array<EventHandler>): any[] {
  return result.map((item) => {
    return eventHandlerDeserializer(item);
  });
}

/** Properties of event handler. */
export interface EventHandler {
  /**
   * Gets or sets the URL template for the event handler. The actual URL is calculated when the corresponding event is triggered.
   * The template supports predefined parameters syntax: `{event}`, `{hub}`, and KeyVault reference syntax `{@Microsoft.KeyVault(SecretUri=_your_secret_identifier_)}`
   * For example, if the template is `http://example.com/api/{event}`, when `connect` event is triggered, a POST request will be sent to the URL `http://example.com/chat/api/connect`.
   * Note: Parameters are not allowed in the hostname of the URL, and curly brackets `{}` are reserved for parameter syntax only. If your URL path contains literal curly brackets, please URL-encode them to ensure proper handling.
   */
  urlTemplate: string;
  /**
   * Gets or sets the matching pattern for event names.
   * There are 3 kinds of patterns supported:
   * 1. "*", it matches any event name
   * 2. Combine multiple events with ",", for example "event1,event2", it matches event "event1" and "event2"
   * 3. A single event name, for example, "event1", it matches "event1"
   */
  userEventPattern?: string;
  /** Gets or sets the list of system events. */
  systemEvents?: string[];
  /** Upstream auth settings. If not set, no auth is used for upstream messages. */
  auth?: UpstreamAuthSettings;
  /** The group presence events that this event handler is concerned with. Group presence events are triggered when connections join or leave groups in the hub. If the value is null, no presence events will be sent to this event handler. */
  groupPresenceEvents?: GroupPresenceEventFilters;
}

export function eventHandlerSerializer(item: EventHandler): any {
  return {
    urlTemplate: item["urlTemplate"],
    userEventPattern: item["userEventPattern"],
    systemEvents: !item["systemEvents"]
      ? item["systemEvents"]
      : item["systemEvents"].map((p: any) => {
          return p;
        }),
    auth: !item["auth"] ? item["auth"] : upstreamAuthSettingsSerializer(item["auth"]),
    groupPresenceEvents: !item["groupPresenceEvents"]
      ? item["groupPresenceEvents"]
      : groupPresenceEventFiltersSerializer(item["groupPresenceEvents"]),
  };
}

export function eventHandlerDeserializer(item: any): EventHandler {
  return {
    urlTemplate: item["urlTemplate"],
    userEventPattern: item["userEventPattern"],
    systemEvents: !item["systemEvents"]
      ? item["systemEvents"]
      : item["systemEvents"].map((p: any) => {
          return p;
        }),
    auth: !item["auth"] ? item["auth"] : upstreamAuthSettingsDeserializer(item["auth"]),
    groupPresenceEvents: !item["groupPresenceEvents"]
      ? item["groupPresenceEvents"]
      : groupPresenceEventFiltersDeserializer(item["groupPresenceEvents"]),
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

/** Represents presence event filters for event handler configuration. */
export interface GroupPresenceEventFilters {
  /** The concerning event names. Valid values are "joined", "left". If the value is null or empty, no presence events will be sent to the event handler. */
  eventNames: GroupPresenceEventName[];
  /** The group filters. Only events from these groups will be sent to the event handler. Each element is a pattern that may match multiple groups. If null or empty, events from all groups will be sent (subject to eventNames). */
  groupFilters?: string[];
}

export function groupPresenceEventFiltersSerializer(item: GroupPresenceEventFilters): any {
  return {
    eventNames: item["eventNames"].map((p: any) => {
      return p;
    }),
    groupFilters: !item["groupFilters"]
      ? item["groupFilters"]
      : item["groupFilters"].map((p: any) => {
          return p;
        }),
  };
}

export function groupPresenceEventFiltersDeserializer(item: any): GroupPresenceEventFilters {
  return {
    eventNames: item["eventNames"].map((p: any) => {
      return p;
    }),
    groupFilters: !item["groupFilters"]
      ? item["groupFilters"]
      : item["groupFilters"].map((p: any) => {
          return p;
        }),
  };
}

/** Allowed event names for group presence events. */
export enum KnownGroupPresenceEventName {
  /** Event triggered when a connection joins a group. */
  Joined = "joined",
  /** Event triggered when a connection leaves a group. */
  Left = "left",
}

/**
 * Allowed event names for group presence events. \
 * {@link KnownGroupPresenceEventName} can be used interchangeably with GroupPresenceEventName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **joined**: Event triggered when a connection joins a group. \
 * **left**: Event triggered when a connection leaves a group.
 */
export type GroupPresenceEventName = string;

export function eventListenerArraySerializer(result: Array<EventListener>): any[] {
  return result.map((item) => {
    return eventListenerSerializer(item);
  });
}

export function eventListenerArrayDeserializer(result: Array<EventListener>): any[] {
  return result.map((item) => {
    return eventListenerDeserializer(item);
  });
}

/** A setting defines which kinds of events should be sent to which endpoint. */
export interface EventListener {
  /** A base class for event filter which determines whether an event should be sent to an event listener. */
  filter: EventListenerFilterUnion;
  /** An endpoint specifying where Web PubSub should send events to. */
  endpoint: EventListenerEndpointUnion;
}

export function eventListenerSerializer(item: EventListener): any {
  return {
    filter: eventListenerFilterUnionSerializer(item["filter"]),
    endpoint: eventListenerEndpointUnionSerializer(item["endpoint"]),
  };
}

export function eventListenerDeserializer(item: any): EventListener {
  return {
    filter: eventListenerFilterUnionDeserializer(item["filter"]),
    endpoint: eventListenerEndpointUnionDeserializer(item["endpoint"]),
  };
}

/** A base class for event filter which determines whether an event should be sent to an event listener. */
export interface EventListenerFilter {
  type: EventListenerFilterDiscriminator;
}

export function eventListenerFilterSerializer(item: EventListenerFilter): any {
  return { type: item["type"] };
}

export function eventListenerFilterDeserializer(item: any): EventListenerFilter {
  return {
    type: item["type"],
  };
}

/** Alias for EventListenerFilterUnion */
export type EventListenerFilterUnion = EventNameFilter | EventListenerFilter;

export function eventListenerFilterUnionSerializer(item: EventListenerFilterUnion): any {
  switch (item.type) {
    case "EventName":
      return eventNameFilterSerializer(item as EventNameFilter);

    default:
      return eventListenerFilterSerializer(item);
  }
}

export function eventListenerFilterUnionDeserializer(item: any): EventListenerFilterUnion {
  switch (item["type"]) {
    case "EventName":
      return eventNameFilterDeserializer(item as EventNameFilter);

    default:
      return eventListenerFilterDeserializer(item);
  }
}

/** Known values of {@link EventListenerFilterDiscriminator} that the service accepts. */
export enum KnownEventListenerFilterDiscriminator {
  /** EventName */
  EventName = "EventName",
}

/** Type of EventListenerFilterDiscriminator */
export type EventListenerFilterDiscriminator = string;

/** Filter events by their name. */
export interface EventNameFilter extends EventListenerFilter {
  /** Gets or sets a list of system events. Supported events: "connected" and "disconnected". Blocking event "connect" is not supported because it requires a response. */
  systemEvents?: string[];
  /**
   * Gets or sets a matching pattern for event names.
   * There are 3 kinds of patterns supported:
   * 1. "*", it matches any event name
   * 2. Combine multiple events with ",", for example "event1,event2", it matches events "event1" and "event2"
   * 3. A single event name, for example, "event1", it matches "event1"
   */
  userEventPattern?: string;
  type: "EventName";
}

export function eventNameFilterSerializer(item: EventNameFilter): any {
  return {
    type: item["type"],
    systemEvents: !item["systemEvents"]
      ? item["systemEvents"]
      : item["systemEvents"].map((p: any) => {
          return p;
        }),
    userEventPattern: item["userEventPattern"],
  };
}

export function eventNameFilterDeserializer(item: any): EventNameFilter {
  return {
    type: item["type"],
    systemEvents: !item["systemEvents"]
      ? item["systemEvents"]
      : item["systemEvents"].map((p: any) => {
          return p;
        }),
    userEventPattern: item["userEventPattern"],
  };
}

/** An endpoint specifying where Web PubSub should send events to. */
export interface EventListenerEndpoint {
  type: EventListenerEndpointDiscriminator;
}

export function eventListenerEndpointSerializer(item: EventListenerEndpoint): any {
  return { type: item["type"] };
}

export function eventListenerEndpointDeserializer(item: any): EventListenerEndpoint {
  return {
    type: item["type"],
  };
}

/** Alias for EventListenerEndpointUnion */
export type EventListenerEndpointUnion = EventHubEndpoint | EventListenerEndpoint;

export function eventListenerEndpointUnionSerializer(item: EventListenerEndpointUnion): any {
  switch (item.type) {
    case "EventHub":
      return eventHubEndpointSerializer(item as EventHubEndpoint);

    default:
      return eventListenerEndpointSerializer(item);
  }
}

export function eventListenerEndpointUnionDeserializer(item: any): EventListenerEndpointUnion {
  switch (item["type"]) {
    case "EventHub":
      return eventHubEndpointDeserializer(item as EventHubEndpoint);

    default:
      return eventListenerEndpointDeserializer(item);
  }
}

/** Known values of {@link EventListenerEndpointDiscriminator} that the service accepts. */
export enum KnownEventListenerEndpointDiscriminator {
  /** EventHub */
  EventHub = "EventHub",
}

/** Type of EventListenerEndpointDiscriminator */
export type EventListenerEndpointDiscriminator = string;

/**
 * An Event Hub endpoint.
 * The managed identity of Web PubSub service must be enabled, and the identity should have the "Azure Event Hubs Data sender" role to access Event Hub.
 */
export interface EventHubEndpoint extends EventListenerEndpoint {
  /** The fully qualified namespace name of the Event Hub resource. */
  fullyQualifiedNamespace: string;
  /** The name of the Event Hub. */
  eventHubName: string;
  type: "EventHub";
}

export function eventHubEndpointSerializer(item: EventHubEndpoint): any {
  return {
    type: item["type"],
    fullyQualifiedNamespace: item["fullyQualifiedNamespace"],
    eventHubName: item["eventHubName"],
  };
}

export function eventHubEndpointDeserializer(item: any): EventHubEndpoint {
  return {
    type: item["type"],
    fullyQualifiedNamespace: item["fullyQualifiedNamespace"],
    eventHubName: item["eventHubName"],
  };
}

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

/** Hub setting list */
export interface _WebPubSubHubList {
  /** The WebPubSubHub items on this page */
  value: WebPubSubHub[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webPubSubHubListDeserializer(item: any): _WebPubSubHubList {
  return {
    value: webPubSubHubArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webPubSubHubArraySerializer(result: Array<WebPubSubHub>): any[] {
  return result.map((item) => {
    return webPubSubHubSerializer(item);
  });
}

export function webPubSubHubArrayDeserializer(result: Array<WebPubSubHub>): any[] {
  return result.map((item) => {
    return webPubSubHubDeserializer(item);
  });
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
  /** Unknown provisioning state */
  Unknown = "Unknown",
  /** Resource successfully provisioned */
  Succeeded = "Succeeded",
  /** Resource provisioning failed */
  Failed = "Failed",
  /** Resource provisioning was canceled */
  Canceled = "Canceled",
  /** Resource provisioning is running */
  Running = "Running",
  /** Resource is being created */
  Creating = "Creating",
  /** Resource is being updated */
  Updating = "Updating",
  /** Resource is being deleted */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown provisioning state \
 * **Succeeded**: Resource successfully provisioned \
 * **Failed**: Resource provisioning failed \
 * **Canceled**: Resource provisioning was canceled \
 * **Running**: Resource provisioning is running \
 * **Creating**: Resource is being created \
 * **Updating**: Resource is being updated \
 * **Deleting**: Resource is being deleted \
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

/** A class represent a resource. */
export interface WebPubSubResource extends TrackedResource {
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
  tls?: WebPubSubTlsSettings;
  /** Deprecated. */
  readonly hostNamePrefix?: string;
  /** Live trace configuration of a Microsoft.SignalRService resource. */
  liveTraceConfiguration?: LiveTraceConfiguration;
  /** Resource log configuration of a Microsoft.SignalRService resource. */
  resourceLogConfiguration?: ResourceLogConfiguration;
  /** Network ACLs for the resource */
  networkACLs?: WebPubSubNetworkACLs;
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
  /** SocketIO settings for the resource */
  socketIO?: WebPubSubSocketIOSettings;
}

export function webPubSubResourceSerializer(item: WebPubSubResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "tls",
      "liveTraceConfiguration",
      "resourceLogConfiguration",
      "networkACLs",
      "applicationFirewall",
      "publicNetworkAccess",
      "disableLocalAuth",
      "disableAadAuth",
      "regionEndpointEnabled",
      "resourceStopped",
      "socketIO",
    ])
      ? undefined
      : _webPubSubResourcePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
  };
}

export function webPubSubResourceDeserializer(item: any): WebPubSubResource {
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
      : _webPubSubResourcePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
  };
}

/** A class that describes the properties of the resource */
export interface WebPubSubProperties {
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
  tls?: WebPubSubTlsSettings;
  /** Deprecated. */
  readonly hostNamePrefix?: string;
  /** Live trace configuration of a Microsoft.SignalRService resource. */
  liveTraceConfiguration?: LiveTraceConfiguration;
  /** Resource log configuration of a Microsoft.SignalRService resource. */
  resourceLogConfiguration?: ResourceLogConfiguration;
  /** Network ACLs for the resource */
  networkACLs?: WebPubSubNetworkACLs;
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
  /** SocketIO settings for the resource */
  socketIO?: WebPubSubSocketIOSettings;
}

export function webPubSubPropertiesSerializer(item: WebPubSubProperties): any {
  return {
    tls: !item["tls"] ? item["tls"] : webPubSubTlsSettingsSerializer(item["tls"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationSerializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationSerializer(item["resourceLogConfiguration"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : webPubSubNetworkACLsSerializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsSerializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    socketIO: !item["socketIO"]
      ? item["socketIO"]
      : webPubSubSocketIOSettingsSerializer(item["socketIO"]),
  };
}

export function webPubSubPropertiesDeserializer(item: any): WebPubSubProperties {
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
    tls: !item["tls"] ? item["tls"] : webPubSubTlsSettingsDeserializer(item["tls"]),
    hostNamePrefix: item["hostNamePrefix"],
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationDeserializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationDeserializer(item["resourceLogConfiguration"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : webPubSubNetworkACLsDeserializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsDeserializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    socketIO: !item["socketIO"]
      ? item["socketIO"]
      : webPubSubSocketIOSettingsDeserializer(item["socketIO"]),
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
export interface WebPubSubTlsSettings {
  /** Request client certificate during TLS handshake if enabled. Not supported for free tier. Any input will be ignored for free tier. */
  clientCertEnabled?: boolean;
}

export function webPubSubTlsSettingsSerializer(item: WebPubSubTlsSettings): any {
  return { clientCertEnabled: item["clientCertEnabled"] };
}

export function webPubSubTlsSettingsDeserializer(item: any): WebPubSubTlsSettings {
  return {
    clientCertEnabled: item["clientCertEnabled"],
  };
}

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

/** Network ACLs for the resource */
export interface WebPubSubNetworkACLs {
  /** Azure Networking ACL Action. */
  defaultAction?: ACLAction;
  /** Network ACL */
  publicNetwork?: NetworkACL;
  /** ACLs for requests from private endpoints */
  privateEndpoints?: PrivateEndpointACL[];
  /** IP rules for filtering public traffic */
  ipRules?: IPRule[];
}

export function webPubSubNetworkACLsSerializer(item: WebPubSubNetworkACLs): any {
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

export function webPubSubNetworkACLsDeserializer(item: any): WebPubSubNetworkACLs {
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
  allow?: WebPubSubRequestType[];
  /** Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI. */
  deny?: WebPubSubRequestType[];
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
export enum KnownWebPubSubRequestType {
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
 * {@link KnownWebPubSubRequestType} can be used interchangeably with WebPubSubRequestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClientConnection** \
 * **ServerConnection** \
 * **RESTAPI** \
 * **Trace**
 */
export type WebPubSubRequestType = string;

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

/** SocketIO settings for the resource */
export interface WebPubSubSocketIOSettings {
  /**
   * The service mode of Web PubSub for Socket.IO. Values allowed:
   * "Default": have your own backend Socket.IO server
   * "Serverless": your application doesn't have a backend server
   */
  serviceMode?: string;
}

export function webPubSubSocketIOSettingsSerializer(item: WebPubSubSocketIOSettings): any {
  return { serviceMode: item["serviceMode"] };
}

export function webPubSubSocketIOSettingsDeserializer(item: any): WebPubSubSocketIOSettings {
  return {
    serviceMode: item["serviceMode"],
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
  tier?: WebPubSubSkuTier;
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
export enum KnownWebPubSubSkuTier {
  /** Free tier for WebPubSub service */
  Free = "Free",
  /** Basic tier for WebPubSub service (deprecated, use Standard instead) */
  Basic = "Basic",
  /** Standard tier for WebPubSub service */
  Standard = "Standard",
  /** Premium tier for WebPubSub service */
  Premium = "Premium",
}

/**
 * Optional tier of this particular SKU. 'Standard' or 'Free'.
 *
 * `Basic` is deprecated, use `Standard` instead. \
 * {@link KnownWebPubSubSkuTier} can be used interchangeably with WebPubSubSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: Free tier for WebPubSub service \
 * **Basic**: Basic tier for WebPubSub service (deprecated, use Standard instead) \
 * **Standard**: Standard tier for WebPubSub service \
 * **Premium**: Premium tier for WebPubSub service
 */
export type WebPubSubSkuTier = string;

/** The kind of the service */
export enum KnownServiceKind {
  /** WebPubSub */
  WebPubSub = "WebPubSub",
  /** SocketIO */
  SocketIO = "SocketIO",
}

/**
 * The kind of the service \
 * {@link KnownServiceKind} can be used interchangeably with ServiceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WebPubSub** \
 * **SocketIO**
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
export interface _WebPubSubResourceList {
  /** The WebPubSubResource items on this page */
  value: WebPubSubResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webPubSubResourceListDeserializer(item: any): _WebPubSubResourceList {
  return {
    value: webPubSubResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webPubSubResourceArraySerializer(result: Array<WebPubSubResource>): any[] {
  return result.map((item) => {
    return webPubSubResourceSerializer(item);
  });
}

export function webPubSubResourceArrayDeserializer(result: Array<WebPubSubResource>): any[] {
  return result.map((item) => {
    return webPubSubResourceDeserializer(item);
  });
}

/** A class represents the access keys of the resource. */
export interface WebPubSubKeys {
  /** The primary access key. */
  primaryKey?: string;
  /** The secondary access key. */
  secondaryKey?: string;
  /** Connection string constructed via the primaryKey */
  primaryConnectionString?: string;
  /** Connection string constructed via the secondaryKey */
  secondaryConnectionString?: string;
}

export function webPubSubKeysDeserializer(item: any): WebPubSubKeys {
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
export interface _SignalRServiceUsageList {
  /** The SignalRServiceUsage items on this page */
  value: SignalRServiceUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _signalRServiceUsageListDeserializer(item: any): _SignalRServiceUsageList {
  return {
    value: signalRServiceUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function signalRServiceUsageArrayDeserializer(result: Array<SignalRServiceUsage>): any[] {
  return result.map((item) => {
    return signalRServiceUsageDeserializer(item);
  });
}

/** Object that describes a specific usage of the resources. */
export interface SignalRServiceUsage {
  /** Fully qualified ARM resource id */
  id?: string;
  /** Current value for the usage quota. */
  currentValue?: number;
  /** The maximum permitted value for the usage quota. If there is no limit, this value will be -1. */
  limit?: number;
  /** Localizable String object containing the name and a localized value. */
  name?: SignalRServiceUsageName;
  /** Representing the units of the usage quota. Possible values are: Count, Bytes, Seconds, Percent, CountPerSecond, BytesPerSecond. */
  unit?: string;
}

export function signalRServiceUsageDeserializer(item: any): SignalRServiceUsage {
  return {
    id: item["id"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : signalRServiceUsageNameDeserializer(item["name"]),
    unit: item["unit"],
  };
}

/** Localizable String object containing the name and a localized value. */
export interface SignalRServiceUsageName {
  /** The identifier of the usage. */
  value?: string;
  /** Localized name of the usage. */
  localizedValue?: string;
}

export function signalRServiceUsageNameDeserializer(item: any): SignalRServiceUsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01-preview API version. */
  V20250101Preview = "2025-01-01-preview",
  /** The 2025-08-01-preview API version. */
  V20250801Preview = "2025-08-01-preview",
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

export function _webPubSubResourcePropertiesSerializer(item: WebPubSubResource): any {
  return {
    tls: !item["tls"] ? item["tls"] : webPubSubTlsSettingsSerializer(item["tls"]),
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationSerializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationSerializer(item["resourceLogConfiguration"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : webPubSubNetworkACLsSerializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsSerializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    socketIO: !item["socketIO"]
      ? item["socketIO"]
      : webPubSubSocketIOSettingsSerializer(item["socketIO"]),
  };
}

export function _webPubSubResourcePropertiesDeserializer(item: any) {
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
    tls: !item["tls"] ? item["tls"] : webPubSubTlsSettingsDeserializer(item["tls"]),
    hostNamePrefix: item["hostNamePrefix"],
    liveTraceConfiguration: !item["liveTraceConfiguration"]
      ? item["liveTraceConfiguration"]
      : liveTraceConfigurationDeserializer(item["liveTraceConfiguration"]),
    resourceLogConfiguration: !item["resourceLogConfiguration"]
      ? item["resourceLogConfiguration"]
      : resourceLogConfigurationDeserializer(item["resourceLogConfiguration"]),
    networkACLs: !item["networkACLs"]
      ? item["networkACLs"]
      : webPubSubNetworkACLsDeserializer(item["networkACLs"]),
    applicationFirewall: !item["applicationFirewall"]
      ? item["applicationFirewall"]
      : applicationFirewallSettingsDeserializer(item["applicationFirewall"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    disableAadAuth: item["disableAadAuth"],
    regionEndpointEnabled: item["regionEndpointEnabled"],
    resourceStopped: item["resourceStopped"],
    socketIO: !item["socketIO"]
      ? item["socketIO"]
      : webPubSubSocketIOSettingsDeserializer(item["socketIO"]),
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
