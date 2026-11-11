// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type DiscriminatedModelShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * Application firewall settings for the resource
 */
export interface ApplicationFirewallSettings {
  /**
   * Rules to control the client connection count
   */
  clientConnectionCountRules?: ClientConnectionCountRule[];
  /**
   * Rules to control the client traffic
   */
  clientTrafficControlRules?: ClientTrafficControlRule[];
  /**
   * Config to control the client connection lifetime in seconds, can be set to 0 to disable the config
   */
  maxClientConnectionLifetimeInSeconds?: number;
}

/**
 * Input type for Application firewall settings for the resource
 */
export interface ApplicationFirewallSettingsInput extends InputOf<ApplicationFirewallSettings> {
  /**
   * Rules to control the client connection count
   */
  clientConnectionCountRules?:
    InputArray<ClientConnectionCountRuleInput, ClientConnectionCountRule[]> | undefined;
  /**
   * Rules to control the client traffic
   */
  clientTrafficControlRules?:
    InputArray<ClientTrafficControlRuleInput, ClientTrafficControlRule[]> | undefined;
  /**
   * Config to control the client connection lifetime in seconds, can be set to 0 to disable the config
   */
  maxClientConnectionLifetimeInSeconds?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Application firewall settings for the resource
 */
export type ApplicationFirewallSettingsView = ApplicationFirewallSettingsInput;

export const applicationFirewallSettingsShape: FlatModelShape = createFlatModelShape({
  clientConnectionCountRules: {
    armPath: ["clientConnectionCountRules"],
    value: createArrayShape(createDeferredShape(() => clientConnectionCountRuleShape)),
  },
  clientTrafficControlRules: {
    armPath: ["clientTrafficControlRules"],
    value: createArrayShape(createDeferredShape(() => clientTrafficControlRuleShape)),
  },
  maxClientConnectionLifetimeInSeconds: {
    armPath: ["maxClientConnectionLifetimeInSeconds"],
    value: createNumberShape(),
  },
});

/**
 * Chat settings.
 */
export interface ChatSettings {
  /**
   * Enable or disable the chat feature.
   */
  mode?: string;
  /**
   * Reference to the the persistent storage for perisisting chat states.
   */
  persistentStorage?: ResourceReference;
}

/**
 * Input type for Chat settings.
 */
export interface ChatSettingsInput extends InputOf<ChatSettings> {
  /**
   * Enable or disable the chat feature.
   */
  mode?: ExpressionOrValue<string> | undefined;
  /**
   * Reference to the the persistent storage for perisisting chat states.
   */
  persistentStorage?: ResourceReferenceInput | undefined;
}

/**
 * View type for Chat settings.
 */
export type ChatSettingsView = ChatSettingsInput;

export const chatSettingsShape: FlatModelShape = createFlatModelShape({
  mode: { armPath: ["mode"], value: createStringShape() },
  persistentStorage: {
    armPath: ["persistentStorage"],
    value: createDeferredShape(() => resourceReferenceShape),
  },
});

/**
 * A base class for client connection count rules
 */
export type ClientConnectionCountRule =
  ThrottleByJwtCustomClaimRule | ThrottleByJwtSignatureRule | ThrottleByUserIdRule;

/**
 * Input type for A base class for client connection count rules
 */
export type ClientConnectionCountRuleInput =
  ThrottleByJwtCustomClaimRuleInput | ThrottleByJwtSignatureRuleInput | ThrottleByUserIdRuleInput;

/**
 * View type for A base class for client connection count rules
 */
export type ClientConnectionCountRuleView =
  ThrottleByJwtCustomClaimRuleView | ThrottleByJwtSignatureRuleView | ThrottleByUserIdRuleView;

export const clientConnectionCountRuleShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("type", {
    ThrottleByJwtCustomClaimRule: createDeferredShape(() => throttleByJwtCustomClaimRuleShape),
    ThrottleByJwtSignatureRule: createDeferredShape(() => throttleByJwtSignatureRuleShape),
    ThrottleByUserIdRule: createDeferredShape(() => throttleByUserIdRuleShape),
  });

/**
 * A base class for client traffic control rules
 */
export type ClientTrafficControlRule =
  | TrafficThrottleByJwtCustomClaimRule
  | TrafficThrottleByJwtSignatureRule
  | TrafficThrottleByUserIdRule;

/**
 * Input type for A base class for client traffic control rules
 */
export type ClientTrafficControlRuleInput =
  | TrafficThrottleByJwtCustomClaimRuleInput
  | TrafficThrottleByJwtSignatureRuleInput
  | TrafficThrottleByUserIdRuleInput;

/**
 * View type for A base class for client traffic control rules
 */
export type ClientTrafficControlRuleView =
  | TrafficThrottleByJwtCustomClaimRuleView
  | TrafficThrottleByJwtSignatureRuleView
  | TrafficThrottleByUserIdRuleView;

export const clientTrafficControlRuleShape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "type",
  {
    TrafficThrottleByJwtCustomClaimRule: createDeferredShape(
      () => trafficThrottleByJwtCustomClaimRuleShape,
    ),
    TrafficThrottleByJwtSignatureRule: createDeferredShape(
      () => trafficThrottleByJwtSignatureRuleShape,
    ),
    TrafficThrottleByUserIdRule: createDeferredShape(() => trafficThrottleByUserIdRuleShape),
  },
);

/**
 * Custom certificate properties.
 */
export interface CustomCertificateProperties {
  /**
   * Base uri of the KeyVault that stores certificate.
   */
  keyVaultBaseUri: string;
  /**
   * Certificate secret name.
   */
  keyVaultSecretName: string;
  /**
   * Certificate secret version.
   */
  keyVaultSecretVersion?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for Custom certificate properties.
 */
export interface CustomCertificatePropertiesInput extends InputOf<CustomCertificateProperties> {
  /**
   * Base uri of the KeyVault that stores certificate.
   */
  keyVaultBaseUri: ExpressionOrValue<string>;
  /**
   * Certificate secret name.
   */
  keyVaultSecretName: ExpressionOrValue<string>;
  /**
   * Certificate secret version.
   */
  keyVaultSecretVersion?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Custom certificate properties.
 */
export interface CustomCertificatePropertiesView extends InputOf<CustomCertificateProperties> {
  /**
   * Base uri of the KeyVault that stores certificate.
   */
  keyVaultBaseUri: ExpressionOrValue<string>;
  /**
   * Certificate secret name.
   */
  keyVaultSecretName: ExpressionOrValue<string>;
  /**
   * Certificate secret version.
   */
  keyVaultSecretVersion?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const customCertificatePropertiesShape: FlatModelShape = createFlatModelShape({
  keyVaultBaseUri: { armPath: ["keyVaultBaseUri"], value: createStringShape() },
  keyVaultSecretName: { armPath: ["keyVaultSecretName"], value: createStringShape() },
  keyVaultSecretVersion: { armPath: ["keyVaultSecretVersion"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of a custom domain.
 */
export interface CustomDomainProperties {
  /**
   * Reference to a resource.
   */
  customCertificate: ResourceReference;
  /**
   * The custom domain name.
   */
  domainName: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for Properties of a custom domain.
 */
export interface CustomDomainPropertiesInput extends InputOf<CustomDomainProperties> {
  /**
   * Reference to a resource.
   */
  customCertificate: ResourceReferenceInput;
  /**
   * The custom domain name.
   */
  domainName: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a custom domain.
 */
export interface CustomDomainPropertiesView extends InputOf<CustomDomainProperties> {
  /**
   * Reference to a resource.
   */
  customCertificate: ResourceReferenceView;
  /**
   * The custom domain name.
   */
  domainName: ExpressionOrValue<string>;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const customDomainPropertiesShape: FlatModelShape = createFlatModelShape({
  customCertificate: {
    armPath: ["customCertificate"],
    value: createDeferredShape(() => resourceReferenceShape),
  },
  domainName: { armPath: ["domainName"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of event handler.
 */
export interface EventHandler {
  /**
   * Upstream auth settings. If not set, no auth is used for upstream messages.
   */
  auth?: UpstreamAuthSettings;
  /**
   * The group presence events that this event handler is concerned with. Group presence events are triggered when connections join or leave groups in the hub. If the value is null, no presence events will be sent to this event handler.
   */
  groupPresenceEvents?: GroupPresenceEventFilters;
  /**
   * Gets or sets the list of system events.
   */
  systemEvents?: string[];
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
}

/**
 * Input type for Properties of event handler.
 */
export interface EventHandlerInput extends InputOf<EventHandler> {
  /**
   * Upstream auth settings. If not set, no auth is used for upstream messages.
   */
  auth?: UpstreamAuthSettingsInput | undefined;
  /**
   * The group presence events that this event handler is concerned with. Group presence events are triggered when connections join or leave groups in the hub. If the value is null, no presence events will be sent to this event handler.
   */
  groupPresenceEvents?: GroupPresenceEventFiltersInput | undefined;
  /**
   * Gets or sets the list of system events.
   */
  systemEvents?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Gets or sets the URL template for the event handler. The actual URL is calculated when the corresponding event is triggered.
   * The template supports predefined parameters syntax: `{event}`, `{hub}`, and KeyVault reference syntax `{@Microsoft.KeyVault(SecretUri=_your_secret_identifier_)}`
   * For example, if the template is `http://example.com/api/{event}`, when `connect` event is triggered, a POST request will be sent to the URL `http://example.com/chat/api/connect`.
   * Note: Parameters are not allowed in the hostname of the URL, and curly brackets `{}` are reserved for parameter syntax only. If your URL path contains literal curly brackets, please URL-encode them to ensure proper handling.
   */
  urlTemplate: ExpressionOrValue<string>;
  /**
   * Gets or sets the matching pattern for event names.
   * There are 3 kinds of patterns supported:
   * 1. "*", it matches any event name
   * 2. Combine multiple events with ",", for example "event1,event2", it matches event "event1" and "event2"
   * 3. A single event name, for example, "event1", it matches "event1"
   */
  userEventPattern?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of event handler.
 */
export type EventHandlerView = EventHandlerInput;

export const eventHandlerShape: FlatModelShape = createFlatModelShape({
  auth: { armPath: ["auth"], value: createDeferredShape(() => upstreamAuthSettingsShape) },
  groupPresenceEvents: {
    armPath: ["groupPresenceEvents"],
    value: createDeferredShape(() => groupPresenceEventFiltersShape),
  },
  systemEvents: { armPath: ["systemEvents"], value: createArrayShape(createStringShape()) },
  urlTemplate: { armPath: ["urlTemplate"], value: createStringShape() },
  userEventPattern: { armPath: ["userEventPattern"], value: createStringShape() },
});

/**
 * An Event Hub endpoint.
 * The managed identity of Web PubSub service must be enabled, and the identity should have the "Azure Event Hubs Data sender" role to access Event Hub.
 */
export interface EventHubEndpoint {
  /**
   * The name of the Event Hub.
   */
  eventHubName: string;
  /**
   * The fully qualified namespace name of the Event Hub resource.
   */
  fullyQualifiedNamespace: string;
  /**
   * Selects this variant. Must be "EventHub".
   */
  type: "EventHub";
}

/**
 * Input type for An Event Hub endpoint.
 * The managed identity of Web PubSub service must be enabled, and the identity should have the "Azure Event Hubs Data sender" role to access Event Hub.
 */
export interface EventHubEndpointInput extends InputOf<EventHubEndpoint> {
  /**
   * The name of the Event Hub.
   */
  eventHubName: ExpressionOrValue<string>;
  /**
   * The fully qualified namespace name of the Event Hub resource.
   */
  fullyQualifiedNamespace: ExpressionOrValue<string>;
  /**
   * Selects this variant. Must be "EventHub".
   */
  type: "EventHub";
}

/**
 * View type for An Event Hub endpoint.
 * The managed identity of Web PubSub service must be enabled, and the identity should have the "Azure Event Hubs Data sender" role to access Event Hub.
 */
export type EventHubEndpointView = EventHubEndpointInput;

export const eventHubEndpointShape: FlatModelShape = createFlatModelShape({
  eventHubName: { armPath: ["eventHubName"], value: createStringShape() },
  fullyQualifiedNamespace: { armPath: ["fullyQualifiedNamespace"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * A setting defines which kinds of events should be sent to which endpoint.
 */
export interface EventListener {
  /**
   * An endpoint specifying where Web PubSub should send events to.
   */
  endpoint: EventListenerEndpoint;
  /**
   * A base class for event filter which determines whether an event should be sent to an event listener.
   */
  filter: EventListenerFilter;
}

/**
 * Input type for A setting defines which kinds of events should be sent to which endpoint.
 */
export interface EventListenerInput extends InputOf<EventListener> {
  /**
   * An endpoint specifying where Web PubSub should send events to.
   */
  endpoint: EventListenerEndpointInput;
  /**
   * A base class for event filter which determines whether an event should be sent to an event listener.
   */
  filter: EventListenerFilterInput;
}

/**
 * View type for A setting defines which kinds of events should be sent to which endpoint.
 */
export type EventListenerView = EventListenerInput;

export const eventListenerShape: FlatModelShape = createFlatModelShape({
  endpoint: { armPath: ["endpoint"], value: createDeferredShape(() => eventListenerEndpointShape) },
  filter: { armPath: ["filter"], value: createDeferredShape(() => eventListenerFilterShape) },
});

/**
 * An endpoint specifying where Web PubSub should send events to.
 */
export type EventListenerEndpoint = EventHubEndpoint;

/**
 * Input type for An endpoint specifying where Web PubSub should send events to.
 */
export type EventListenerEndpointInput = EventHubEndpointInput;

/**
 * View type for An endpoint specifying where Web PubSub should send events to.
 */
export type EventListenerEndpointView = EventHubEndpointView;

export const eventListenerEndpointShape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "type",
  {
    EventHub: createDeferredShape(() => eventHubEndpointShape),
  },
);

/**
 * A base class for event filter which determines whether an event should be sent to an event listener.
 */
export type EventListenerFilter = EventNameFilter;

/**
 * Input type for A base class for event filter which determines whether an event should be sent to an event listener.
 */
export type EventListenerFilterInput = EventNameFilterInput;

/**
 * View type for A base class for event filter which determines whether an event should be sent to an event listener.
 */
export type EventListenerFilterView = EventNameFilterView;

export const eventListenerFilterShape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "type",
  {
    EventName: createDeferredShape(() => eventNameFilterShape),
  },
);

/**
 * Filter events by their name.
 */
export interface EventNameFilter {
  /**
   * Gets or sets a list of system events. Supported events: "connected" and "disconnected". Blocking event "connect" is not supported because it requires a response.
   */
  systemEvents?: string[];
  /**
   * Selects this variant. Must be "EventName".
   */
  type: "EventName";
  /**
   * Gets or sets a matching pattern for event names.
   * There are 3 kinds of patterns supported:
   * 1. "*", it matches any event name
   * 2. Combine multiple events with ",", for example "event1,event2", it matches events "event1" and "event2"
   * 3. A single event name, for example, "event1", it matches "event1"
   */
  userEventPattern?: string;
}

/**
 * Input type for Filter events by their name.
 */
export interface EventNameFilterInput extends InputOf<EventNameFilter> {
  /**
   * Gets or sets a list of system events. Supported events: "connected" and "disconnected". Blocking event "connect" is not supported because it requires a response.
   */
  systemEvents?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Selects this variant. Must be "EventName".
   */
  type: "EventName";
  /**
   * Gets or sets a matching pattern for event names.
   * There are 3 kinds of patterns supported:
   * 1. "*", it matches any event name
   * 2. Combine multiple events with ",", for example "event1,event2", it matches events "event1" and "event2"
   * 3. A single event name, for example, "event1", it matches "event1"
   */
  userEventPattern?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Filter events by their name.
 */
export type EventNameFilterView = EventNameFilterInput;

export const eventNameFilterShape: FlatModelShape = createFlatModelShape({
  systemEvents: { armPath: ["systemEvents"], value: createArrayShape(createStringShape()) },
  type: { armPath: ["type"], value: createStringLiteralShape() },
  userEventPattern: { armPath: ["userEventPattern"], value: createStringShape() },
});

/**
 * Represents presence event filters for event handler configuration.
 */
export interface GroupPresenceEventFilters {
  /**
   * The concerning event names. Valid values are "joined", "left". If the value is null or empty, no presence events will be sent to the event handler.
   */
  eventNames: GroupPresenceEventName[];
  /**
   * The group filters. Only events from these groups will be sent to the event handler. Each element is a pattern that may match multiple groups. If null or empty, events from all groups will be sent (subject to eventNames).
   */
  groupFilters?: string[];
}

/**
 * Input type for Represents presence event filters for event handler configuration.
 */
export interface GroupPresenceEventFiltersInput extends InputOf<GroupPresenceEventFilters> {
  /**
   * The concerning event names. Valid values are "joined", "left". If the value is null or empty, no presence events will be sent to the event handler.
   */
  eventNames: InputArray<ExpressionOrValue<GroupPresenceEventName>, GroupPresenceEventName[]>;
  /**
   * The group filters. Only events from these groups will be sent to the event handler. Each element is a pattern that may match multiple groups. If null or empty, events from all groups will be sent (subject to eventNames).
   */
  groupFilters?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Represents presence event filters for event handler configuration.
 */
export type GroupPresenceEventFiltersView = GroupPresenceEventFiltersInput;

export const groupPresenceEventFiltersShape: FlatModelShape = createFlatModelShape({
  eventNames: { armPath: ["eventNames"], value: createArrayShape(createUnionShape()) },
  groupFilters: { armPath: ["groupFilters"], value: createArrayShape(createStringShape()) },
});

/**
 * An IP rule
 */
export interface IpRule {
  /**
   * Azure Networking ACL Action.
   */
  action?: AclAction;
  /**
   * An IP or CIDR or ServiceTag
   */
  value?: string;
}

/**
 * Input type for An IP rule
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * Azure Networking ACL Action.
   */
  action?: ExpressionOrValue<AclAction> | undefined;
  /**
   * An IP or CIDR or ServiceTag
   */
  value?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for An IP rule
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * Live trace category configuration of a Microsoft.SignalRService resource.
 */
export interface LiveTraceCategory {
  /**
   * Indicates whether or the live trace category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
  /**
   * Gets or sets the live trace category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: string;
}

/**
 * Input type for Live trace category configuration of a Microsoft.SignalRService resource.
 */
export interface LiveTraceCategoryInput extends InputOf<LiveTraceCategory> {
  /**
   * Indicates whether or the live trace category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: ExpressionOrValue<string> | undefined;
  /**
   * Gets or sets the live trace category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Live trace category configuration of a Microsoft.SignalRService resource.
 */
export type LiveTraceCategoryView = LiveTraceCategoryInput;

export const liveTraceCategoryShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * Live trace configuration of a Microsoft.SignalRService resource.
 */
export interface LiveTraceConfiguration {
  /**
   * Gets or sets the list of category configurations.
   */
  categories?: LiveTraceCategory[];
  /**
   * Indicates whether or not enable live trace.
   * When it's set to true, live trace client can connect to the service.
   * Otherwise, live trace client can't connect to the service, so that you are unable to receive any log, no matter what you configure in "categories".
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
}

/**
 * Input type for Live trace configuration of a Microsoft.SignalRService resource.
 */
export interface LiveTraceConfigurationInput extends InputOf<LiveTraceConfiguration> {
  /**
   * Gets or sets the list of category configurations.
   */
  categories?: InputArray<LiveTraceCategoryInput, LiveTraceCategory[]> | undefined;
  /**
   * Indicates whether or not enable live trace.
   * When it's set to true, live trace client can connect to the service.
   * Otherwise, live trace client can't connect to the service, so that you are unable to receive any log, no matter what you configure in "categories".
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Live trace configuration of a Microsoft.SignalRService resource.
 */
export type LiveTraceConfigurationView = LiveTraceConfigurationInput;

export const liveTraceConfigurationShape: FlatModelShape = createFlatModelShape({
  categories: {
    armPath: ["categories"],
    value: createArrayShape(createDeferredShape(() => liveTraceCategoryShape)),
  },
  enabled: { armPath: ["enabled"], value: createStringShape() },
});

/**
 * A class represent managed identities used for request and response
 */
export interface ManagedIdentity {
  /**
   * Get the principal id for the system assigned identity.
   * Only be used in response.
   */
  principalId?: string;
  /**
   * Get the tenant id for the system assigned identity.
   * Only be used in response
   */
  tenantId?: string;
  /**
   * Represents the identity type: systemAssigned, userAssigned, None
   */
  type?: ManagedIdentityType;
  /**
   * Get or set the user assigned identities
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentityProperty>;
}

/**
 * Input type for A class represent managed identities used for request and response
 */
export interface ManagedIdentityInput extends InputOf<ManagedIdentity> {
  /**
   * Represents the identity type: systemAssigned, userAssigned, None
   */
  type?: ExpressionOrValue<ManagedIdentityType> | undefined;
  /**
   * Get or set the user assigned identities
   */
  userAssignedIdentities?:
    | InputRecord<UserAssignedIdentityPropertyInput, Record<string, UserAssignedIdentityProperty>>
    | undefined;
}

/**
 * View type for A class represent managed identities used for request and response
 */
export interface ManagedIdentityView extends InputOf<ManagedIdentity> {
  /**
   * Read-only output: Get the principal id for the system assigned identity.
   * Only be used in response.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: Get the tenant id for the system assigned identity.
   * Only be used in response
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Represents the identity type: systemAssigned, userAssigned, None
   */
  type?: ExpressionOrValue<ManagedIdentityType> | undefined;
  /**
   * Get or set the user assigned identities
   */
  userAssignedIdentities?:
    | InputRecord<UserAssignedIdentityPropertyView, Record<string, UserAssignedIdentityProperty>>
    | undefined;
}

export const managedIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityPropertyShape)),
  },
});

/**
 * Managed identity settings for upstream.
 */
export interface ManagedIdentitySettings {
  /**
   * The Resource indicating the App ID URI of the target resource.
   * It also appears in the aud (audience) claim of the issued token.
   */
  resource?: string;
}

/**
 * Input type for Managed identity settings for upstream.
 */
export interface ManagedIdentitySettingsInput extends InputOf<ManagedIdentitySettings> {
  /**
   * The Resource indicating the App ID URI of the target resource.
   * It also appears in the aud (audience) claim of the issued token.
   */
  resource?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Managed identity settings for upstream.
 */
export type ManagedIdentitySettingsView = ManagedIdentitySettingsInput;

export const managedIdentitySettingsShape: FlatModelShape = createFlatModelShape({
  resource: { armPath: ["resource"], value: createStringShape() },
});

/**
 * Network ACL
 */
export interface NetworkAcl {
  /**
   * Allowed request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  allow?: WebPubSubRequestType[];
  /**
   * Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  deny?: WebPubSubRequestType[];
}

/**
 * Input type for Network ACL
 */
export interface NetworkAclInput extends InputOf<NetworkAcl> {
  /**
   * Allowed request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  allow?: InputArray<ExpressionOrValue<WebPubSubRequestType>, WebPubSubRequestType[]> | undefined;
  /**
   * Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  deny?: InputArray<ExpressionOrValue<WebPubSubRequestType>, WebPubSubRequestType[]> | undefined;
}

/**
 * View type for Network ACL
 */
export type NetworkAclView = NetworkAclInput;

export const networkAclShape: FlatModelShape = createFlatModelShape({
  allow: { armPath: ["allow"], value: createArrayShape(createUnionShape()) },
  deny: { armPath: ["deny"], value: createArrayShape(createUnionShape()) },
});

/**
 * Properties of a persistent storage.
 */
export interface PersistentStorageProperties {
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * Reference to the storage account to be used for persistent storage.
   */
  storageAccount: ResourceReference;
}

/**
 * Input type for Properties of a persistent storage.
 */
export interface PersistentStoragePropertiesInput extends InputOf<PersistentStorageProperties> {
  /**
   * Reference to the storage account to be used for persistent storage.
   */
  storageAccount: ResourceReferenceInput;
}

/**
 * View type for Properties of a persistent storage.
 */
export interface PersistentStoragePropertiesView extends InputOf<PersistentStorageProperties> {
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Reference to the storage account to be used for persistent storage.
   */
  storageAccount: ResourceReferenceView;
}

export const persistentStoragePropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  storageAccount: {
    armPath: ["storageAccount"],
    value: createDeferredShape(() => resourceReferenceShape),
  },
});

/**
 * Private endpoint
 */
export interface PrivateEndpoint {
  /**
   * Full qualified Id of the private endpoint
   */
  id?: string;
}

/**
 * Input type for Private endpoint
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {
  /**
   * Full qualified Id of the private endpoint
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Private endpoint
 */
export type PrivateEndpointView = PrivateEndpointInput;

export const privateEndpointShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * ACL for a private endpoint
 */
export interface PrivateEndpointAcl {
  /**
   * Allowed request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  allow?: WebPubSubRequestType[];
  /**
   * Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  deny?: WebPubSubRequestType[];
  /**
   * Name of the private endpoint connection
   */
  name: string;
}

/**
 * Input type for ACL for a private endpoint
 */
export interface PrivateEndpointAclInput extends InputOf<PrivateEndpointAcl> {
  /**
   * Allowed request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  allow?: InputArray<ExpressionOrValue<WebPubSubRequestType>, WebPubSubRequestType[]> | undefined;
  /**
   * Denied request types. The value can be one or more of: ClientConnection, ServerConnection, RESTAPI.
   */
  deny?: InputArray<ExpressionOrValue<WebPubSubRequestType>, WebPubSubRequestType[]> | undefined;
  /**
   * Name of the private endpoint connection
   */
  name: ExpressionOrValue<string>;
}

/**
 * View type for ACL for a private endpoint
 */
export type PrivateEndpointAclView = PrivateEndpointAclInput;

export const privateEndpointAclShape: FlatModelShape = createFlatModelShape({
  allow: { armPath: ["allow"], value: createArrayShape(createUnionShape()) },
  deny: { armPath: ["deny"], value: createArrayShape(createUnionShape()) },
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * Private endpoint connection properties
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * Group IDs
   */
  groupIds?: string[];
  /**
   * Private endpoint
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * Connection state of the private endpoint connection
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for Private endpoint connection properties
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Private endpoint
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * Connection state of the private endpoint connection
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateInput | undefined;
}

/**
 * View type for Private endpoint connection properties
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Read-only output: Group IDs
   */
  readonly groupIds?: Expression<string[]> | undefined;
  /**
   * Private endpoint
   */
  privateEndpoint?: PrivateEndpointView | undefined;
  /**
   * Connection state of the private endpoint connection
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateView | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  groupIds: { armPath: ["groupIds"], value: createArrayShape(createStringShape()), readOnly: true },
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStateShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Connection state of the private endpoint connection
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: string;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: PrivateLinkServiceConnectionStatus;
}

/**
 * Input type for Connection state of the private endpoint connection
 */
export interface PrivateLinkServiceConnectionStateInput extends InputOf<PrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ExpressionOrValue<string> | undefined;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: ExpressionOrValue<PrivateLinkServiceConnectionStatus> | undefined;
}

/**
 * View type for Connection state of the private endpoint connection
 */
export type PrivateLinkServiceConnectionStateView = PrivateLinkServiceConnectionStateInput;

export const privateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

export interface ReplicaProperties {
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   */
  regionEndpointEnabled?: string;
  /**
   * Stop or start the resource. Default to "false".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
}

export interface ReplicaPropertiesInput extends InputOf<ReplicaProperties> {
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   */
  regionEndpointEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Stop or start the resource. Default to "false".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: ExpressionOrValue<string> | undefined;
}

export interface ReplicaPropertiesView extends InputOf<ReplicaProperties> {
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   */
  regionEndpointEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Stop or start the resource. Default to "false".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: ExpressionOrValue<string> | undefined;
}

export const replicaPropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  regionEndpointEnabled: { armPath: ["regionEndpointEnabled"], value: createStringShape() },
  resourceStopped: { armPath: ["resourceStopped"], value: createStringShape() },
});

/**
 * Resource log category configuration of a Microsoft.SignalRService resource.
 */
export interface ResourceLogCategory {
  /**
   * Indicates whether or the resource log category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: string;
  /**
   * Gets or sets the resource log category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: string;
}

/**
 * Input type for Resource log category configuration of a Microsoft.SignalRService resource.
 */
export interface ResourceLogCategoryInput extends InputOf<ResourceLogCategory> {
  /**
   * Indicates whether or the resource log category is enabled.
   * Available values: true, false.
   * Case insensitive.
   */
  enabled?: ExpressionOrValue<string> | undefined;
  /**
   * Gets or sets the resource log category's name.
   * Available values: ConnectivityLogs, MessagingLogs.
   * Case insensitive.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Resource log category configuration of a Microsoft.SignalRService resource.
 */
export type ResourceLogCategoryView = ResourceLogCategoryInput;

export const resourceLogCategoryShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * Resource log configuration of a Microsoft.SignalRService resource.
 */
export interface ResourceLogConfiguration {
  /**
   * Gets or sets the list of category configurations.
   */
  categories?: ResourceLogCategory[];
}

/**
 * Input type for Resource log configuration of a Microsoft.SignalRService resource.
 */
export interface ResourceLogConfigurationInput extends InputOf<ResourceLogConfiguration> {
  /**
   * Gets or sets the list of category configurations.
   */
  categories?: InputArray<ResourceLogCategoryInput, ResourceLogCategory[]> | undefined;
}

/**
 * View type for Resource log configuration of a Microsoft.SignalRService resource.
 */
export type ResourceLogConfigurationView = ResourceLogConfigurationInput;

export const resourceLogConfigurationShape: FlatModelShape = createFlatModelShape({
  categories: {
    armPath: ["categories"],
    value: createArrayShape(createDeferredShape(() => resourceLogCategoryShape)),
  },
});

/**
 * Reference to a resource.
 */
export interface ResourceReference {
  /**
   * Resource ID.
   */
  id?: string;
}

/**
 * Input type for Reference to a resource.
 */
export interface ResourceReferenceInput extends InputOf<ResourceReference> {
  /**
   * Resource ID.
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Reference to a resource.
 */
export type ResourceReferenceView = ResourceReferenceInput;

export const resourceReferenceShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * The billing information of the resource.
 */
export interface ResourceSku {
  /**
   * Optional, integer. The unit count of the resource.
   * 1 for Free_F1/Standard_S1/Premium_P1, 100 for Premium_P2 by default.
   *
   * If present, following values are allowed:
   * Free_F1: 1;
   * Standard_S1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P2: 100,200,300,400,500,600,700,800,900,1000;
   */
  capacity?: number;
  /**
   * Not used. Retained for future use.
   */
  family?: string;
  /**
   * The name of the SKU. Required.
   *
   * Allowed values: Standard_S1, Free_F1, Premium_P1, Premium_P2
   */
  name: string;
  /**
   * Not used. Retained for future use.
   */
  size?: string;
  /**
   * Optional tier of this particular SKU. 'Standard' or 'Free'.
   *
   * `Basic` is deprecated, use `Standard` instead.
   */
  tier?: WebPubSubSkuTier;
}

/**
 * Input type for The billing information of the resource.
 */
export interface ResourceSkuInput extends InputOf<ResourceSku> {
  /**
   * Optional, integer. The unit count of the resource.
   * 1 for Free_F1/Standard_S1/Premium_P1, 100 for Premium_P2 by default.
   *
   * If present, following values are allowed:
   * Free_F1: 1;
   * Standard_S1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P2: 100,200,300,400,500,600,700,800,900,1000;
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * The name of the SKU. Required.
   *
   * Allowed values: Standard_S1, Free_F1, Premium_P1, Premium_P2
   */
  name: ExpressionOrValue<string>;
  /**
   * Optional tier of this particular SKU. 'Standard' or 'Free'.
   *
   * `Basic` is deprecated, use `Standard` instead.
   */
  tier?: ExpressionOrValue<WebPubSubSkuTier> | undefined;
}

/**
 * View type for The billing information of the resource.
 */
export interface ResourceSkuView extends InputOf<ResourceSku> {
  /**
   * Optional, integer. The unit count of the resource.
   * 1 for Free_F1/Standard_S1/Premium_P1, 100 for Premium_P2 by default.
   *
   * If present, following values are allowed:
   * Free_F1: 1;
   * Standard_S1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P1: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100;
   * Premium_P2: 100,200,300,400,500,600,700,800,900,1000;
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Not used. Retained for future use.
   */
  readonly family?: Expression<string> | undefined;
  /**
   * The name of the SKU. Required.
   *
   * Allowed values: Standard_S1, Free_F1, Premium_P1, Premium_P2
   */
  name: ExpressionOrValue<string>;
  /**
   * Read-only output: Not used. Retained for future use.
   */
  readonly size?: Expression<string> | undefined;
  /**
   * Optional tier of this particular SKU. 'Standard' or 'Free'.
   *
   * `Basic` is deprecated, use `Standard` instead.
   */
  tier?: ExpressionOrValue<WebPubSubSkuTier> | undefined;
}

export const resourceSkuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  family: { armPath: ["family"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape() },
  size: { armPath: ["size"], value: createStringShape(), readOnly: true },
  tier: { armPath: ["tier"], value: createUnionShape() },
});

/**
 * Describes a Shared Private Link Resource
 */
export interface SharedPrivateLinkResource {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the shared private link resource.
   */
  name?: string;
  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  properties?: SharedPrivateLinkResourceProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for Describes a Shared Private Link Resource
 */
export interface SharedPrivateLinkResourceInput extends InputOf<SharedPrivateLinkResource> {
  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  properties?: SharedPrivateLinkResourcePropertiesInput | undefined;
}

/**
 * View type for Describes a Shared Private Link Resource
 */
export interface SharedPrivateLinkResourceView extends InputOf<SharedPrivateLinkResource> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the shared private link resource.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  properties?: SharedPrivateLinkResourcePropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const sharedPrivateLinkResourceShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => sharedPrivateLinkResourcePropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Describes the properties of an existing Shared Private Link Resource
 */
export interface SharedPrivateLinkResourceProperties {
  /**
   * A list of FQDNs for third party private link service
   */
  fqdns?: string[];
  /**
   * The group id from the provider of resource the shared private link resource is for
   */
  groupId: string;
  /**
   * The resource id of the resource the shared private link resource is for
   */
  privateLinkResourceId: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * The request message for requesting approval of the shared private link resource
   */
  requestMessage?: string;
  /**
   * Status of the shared private link resource
   */
  status?: SharedPrivateLinkResourceStatus;
}

/**
 * Input type for Describes the properties of an existing Shared Private Link Resource
 */
export interface SharedPrivateLinkResourcePropertiesInput extends InputOf<SharedPrivateLinkResourceProperties> {
  /**
   * A list of FQDNs for third party private link service
   */
  fqdns?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The group id from the provider of resource the shared private link resource is for
   */
  groupId: ExpressionOrValue<string>;
  /**
   * The resource id of the resource the shared private link resource is for
   */
  privateLinkResourceId: ExpressionOrValue<string>;
  /**
   * The request message for requesting approval of the shared private link resource
   */
  requestMessage?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Describes the properties of an existing Shared Private Link Resource
 */
export interface SharedPrivateLinkResourcePropertiesView extends InputOf<SharedPrivateLinkResourceProperties> {
  /**
   * A list of FQDNs for third party private link service
   */
  fqdns?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The group id from the provider of resource the shared private link resource is for
   */
  groupId: ExpressionOrValue<string>;
  /**
   * The resource id of the resource the shared private link resource is for
   */
  privateLinkResourceId: ExpressionOrValue<string>;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * The request message for requesting approval of the shared private link resource
   */
  requestMessage?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Status of the shared private link resource
   */
  readonly status?: Expression<SharedPrivateLinkResourceStatus> | undefined;
}

export const sharedPrivateLinkResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  fqdns: { armPath: ["fqdns"], value: createArrayShape(createStringShape()) },
  groupId: { armPath: ["groupId"], value: createStringShape() },
  privateLinkResourceId: { armPath: ["privateLinkResourceId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  requestMessage: { armPath: ["requestMessage"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * A private endpoint connection to an azure resource
 */
export interface SignalRServicePrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the private endpoint connection associated with the Azure resource.
   */
  name?: string;
  /**
   * Private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for A private endpoint connection to an azure resource
 */
export interface SignalRServicePrivateEndpointConnectionInput extends InputOf<SignalRServicePrivateEndpointConnection> {
  /**
   * Private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for A private endpoint connection to an azure resource
 */
export interface SignalRServicePrivateEndpointConnectionView extends InputOf<SignalRServicePrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection associated with the Azure resource.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const signalRServicePrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
}

/**
 * Input type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataInput extends InputOf<SystemData> {}

/**
 * View type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataView extends InputOf<SystemData> {
  /**
   * Read-only output: The timestamp of resource creation (UTC).
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that created the resource.
   */
  readonly createdBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that created the resource.
   */
  readonly createdByType?: Expression<CreatedByType> | undefined;
  /**
   * Read-only output: The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that last modified the resource.
   */
  readonly lastModifiedBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that last modified the resource.
   */
  readonly lastModifiedByType?: Expression<CreatedByType> | undefined;
}

export const systemDataShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  createdBy: { armPath: ["createdBy"], value: createStringShape(), readOnly: true },
  createdByType: { armPath: ["createdByType"], value: createUnionShape(), readOnly: true },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastModifiedBy: { armPath: ["lastModifiedBy"], value: createStringShape(), readOnly: true },
  lastModifiedByType: {
    armPath: ["lastModifiedByType"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * Throttle the client connection by a custom JWT claim
 */
export interface ThrottleByJwtCustomClaimRule {
  /**
   * The name of the claim in the JWT token. The client connection with the same claim value will be aggregated. If the claim is not found in the token, the connection will be allowed.
   */
  claimName: string;
  /**
   * Maximum connection count allowed for the same Jwt claim value. Clients with the same Jwt claim will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: number;
  /**
   * Selects this variant. Must be "ThrottleByJwtCustomClaimRule".
   */
  type: "ThrottleByJwtCustomClaimRule";
}

/**
 * Input type for Throttle the client connection by a custom JWT claim
 */
export interface ThrottleByJwtCustomClaimRuleInput extends InputOf<ThrottleByJwtCustomClaimRule> {
  /**
   * The name of the claim in the JWT token. The client connection with the same claim value will be aggregated. If the claim is not found in the token, the connection will be allowed.
   */
  claimName: ExpressionOrValue<string>;
  /**
   * Maximum connection count allowed for the same Jwt claim value. Clients with the same Jwt claim will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "ThrottleByJwtCustomClaimRule".
   */
  type: "ThrottleByJwtCustomClaimRule";
}

/**
 * View type for Throttle the client connection by a custom JWT claim
 */
export type ThrottleByJwtCustomClaimRuleView = ThrottleByJwtCustomClaimRuleInput;

export const throttleByJwtCustomClaimRuleShape: FlatModelShape = createFlatModelShape({
  claimName: { armPath: ["claimName"], value: createStringShape() },
  maxCount: { armPath: ["maxCount"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Throttle the client connection by the JWT signature
 */
export interface ThrottleByJwtSignatureRule {
  /**
   * Maximum connection count allowed for the same JWT signature. Clients with the same JWT signature will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: number;
  /**
   * Selects this variant. Must be "ThrottleByJwtSignatureRule".
   */
  type: "ThrottleByJwtSignatureRule";
}

/**
 * Input type for Throttle the client connection by the JWT signature
 */
export interface ThrottleByJwtSignatureRuleInput extends InputOf<ThrottleByJwtSignatureRule> {
  /**
   * Maximum connection count allowed for the same JWT signature. Clients with the same JWT signature will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "ThrottleByJwtSignatureRule".
   */
  type: "ThrottleByJwtSignatureRule";
}

/**
 * View type for Throttle the client connection by the JWT signature
 */
export type ThrottleByJwtSignatureRuleView = ThrottleByJwtSignatureRuleInput;

export const throttleByJwtSignatureRuleShape: FlatModelShape = createFlatModelShape({
  maxCount: { armPath: ["maxCount"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Throttle the client connection by the user ID
 */
export interface ThrottleByUserIdRule {
  /**
   * Maximum connection count allowed for the same user ID. Clients with the same user ID will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: number;
  /**
   * Selects this variant. Must be "ThrottleByUserIdRule".
   */
  type: "ThrottleByUserIdRule";
}

/**
 * Input type for Throttle the client connection by the user ID
 */
export interface ThrottleByUserIdRuleInput extends InputOf<ThrottleByUserIdRule> {
  /**
   * Maximum connection count allowed for the same user ID. Clients with the same user ID will get rejected if the connection count exceeds this value. Default value is 20.
   */
  maxCount?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "ThrottleByUserIdRule".
   */
  type: "ThrottleByUserIdRule";
}

/**
 * View type for Throttle the client connection by the user ID
 */
export type ThrottleByUserIdRuleView = ThrottleByUserIdRuleInput;

export const throttleByUserIdRuleShape: FlatModelShape = createFlatModelShape({
  maxCount: { armPath: ["maxCount"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Throttle the client traffic by a custom JWT claim
 */
export interface TrafficThrottleByJwtCustomClaimRule {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: number;
  /**
   * The name of the claim in the JWT token. The message bytes with the same claim value will be aggregated. If the claim is not found in the token, the rule will be skipped.
   */
  claimName: string;
  /**
   * Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT claim will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: number;
  /**
   * Selects this variant. Must be "TrafficThrottleByJwtCustomClaimRule".
   */
  type: "TrafficThrottleByJwtCustomClaimRule";
}

/**
 * Input type for Throttle the client traffic by a custom JWT claim
 */
export interface TrafficThrottleByJwtCustomClaimRuleInput extends InputOf<TrafficThrottleByJwtCustomClaimRule> {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * The name of the claim in the JWT token. The message bytes with the same claim value will be aggregated. If the claim is not found in the token, the rule will be skipped.
   */
  claimName: ExpressionOrValue<string>;
  /**
   * Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT claim will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "TrafficThrottleByJwtCustomClaimRule".
   */
  type: "TrafficThrottleByJwtCustomClaimRule";
}

/**
 * View type for Throttle the client traffic by a custom JWT claim
 */
export type TrafficThrottleByJwtCustomClaimRuleView = TrafficThrottleByJwtCustomClaimRuleInput;

export const trafficThrottleByJwtCustomClaimRuleShape: FlatModelShape = createFlatModelShape({
  aggregationWindowInSeconds: {
    armPath: ["aggregationWindowInSeconds"],
    value: createNumberShape(),
  },
  claimName: { armPath: ["claimName"], value: createStringShape() },
  maxInboundMessageBytes: { armPath: ["maxInboundMessageBytes"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Throttle the client traffic by the JWT signature
 */
export interface TrafficThrottleByJwtSignatureRule {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: number;
  /**
   * Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT signature will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: number;
  /**
   * Selects this variant. Must be "TrafficThrottleByJwtSignatureRule".
   */
  type: "TrafficThrottleByJwtSignatureRule";
}

/**
 * Input type for Throttle the client traffic by the JWT signature
 */
export interface TrafficThrottleByJwtSignatureRuleInput extends InputOf<TrafficThrottleByJwtSignatureRule> {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum accumulated inbound message bytes allowed for the same JWT signature within a time window. Clients with the same JWT signature will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "TrafficThrottleByJwtSignatureRule".
   */
  type: "TrafficThrottleByJwtSignatureRule";
}

/**
 * View type for Throttle the client traffic by the JWT signature
 */
export type TrafficThrottleByJwtSignatureRuleView = TrafficThrottleByJwtSignatureRuleInput;

export const trafficThrottleByJwtSignatureRuleShape: FlatModelShape = createFlatModelShape({
  aggregationWindowInSeconds: {
    armPath: ["aggregationWindowInSeconds"],
    value: createNumberShape(),
  },
  maxInboundMessageBytes: { armPath: ["maxInboundMessageBytes"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Throttle the client traffic by the user ID
 */
export interface TrafficThrottleByUserIdRule {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: number;
  /**
   * Maximum accumulated inbound message bytes allowed for the same user ID within a time window. Clients with the same user ID will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: number;
  /**
   * Selects this variant. Must be "TrafficThrottleByUserIdRule".
   */
  type: "TrafficThrottleByUserIdRule";
}

/**
 * Input type for Throttle the client traffic by the user ID
 */
export interface TrafficThrottleByUserIdRuleInput extends InputOf<TrafficThrottleByUserIdRule> {
  /**
   * The aggregation window for the message bytes. The message bytes will be aggregated in this window and be reset after the window. Default value is 60 seconds.
   */
  aggregationWindowInSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum accumulated inbound message bytes allowed for the same user ID within a time window. Clients with the same user ID will get disconnected if the message bytes exceeds this value. Default value is 1GB.
   */
  maxInboundMessageBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Selects this variant. Must be "TrafficThrottleByUserIdRule".
   */
  type: "TrafficThrottleByUserIdRule";
}

/**
 * View type for Throttle the client traffic by the user ID
 */
export type TrafficThrottleByUserIdRuleView = TrafficThrottleByUserIdRuleInput;

export const trafficThrottleByUserIdRuleShape: FlatModelShape = createFlatModelShape({
  aggregationWindowInSeconds: {
    armPath: ["aggregationWindowInSeconds"],
    value: createNumberShape(),
  },
  maxInboundMessageBytes: { armPath: ["maxInboundMessageBytes"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Upstream auth settings. If not set, no auth is used for upstream messages.
 */
export interface UpstreamAuthSettings {
  /**
   * Managed identity settings for upstream.
   */
  managedIdentity?: ManagedIdentitySettings;
  /**
   * Upstream auth type enum.
   */
  type?: UpstreamAuthType;
}

/**
 * Input type for Upstream auth settings. If not set, no auth is used for upstream messages.
 */
export interface UpstreamAuthSettingsInput extends InputOf<UpstreamAuthSettings> {
  /**
   * Managed identity settings for upstream.
   */
  managedIdentity?: ManagedIdentitySettingsInput | undefined;
  /**
   * Upstream auth type enum.
   */
  type?: ExpressionOrValue<UpstreamAuthType> | undefined;
}

/**
 * View type for Upstream auth settings. If not set, no auth is used for upstream messages.
 */
export type UpstreamAuthSettingsView = UpstreamAuthSettingsInput;

export const upstreamAuthSettingsShape: FlatModelShape = createFlatModelShape({
  managedIdentity: {
    armPath: ["managedIdentity"],
    value: createDeferredShape(() => managedIdentitySettingsShape),
  },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Properties of user assigned identity.
 */
export interface UserAssignedIdentityProperty {
  /**
   * Get the client id for the user assigned identity
   */
  clientId?: string;
  /**
   * Get the principal id for the user assigned identity
   */
  principalId?: string;
}

/**
 * Input type for Properties of user assigned identity.
 */
export interface UserAssignedIdentityPropertyInput extends InputOf<UserAssignedIdentityProperty> {}

/**
 * View type for Properties of user assigned identity.
 */
export interface UserAssignedIdentityPropertyView extends InputOf<UserAssignedIdentityProperty> {
  /**
   * Read-only output: Get the client id for the user assigned identity
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: Get the principal id for the user assigned identity
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityPropertyShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a hub.
 */
export interface WebPubSubHubProperties {
  /**
   * The settings for configuring if anonymous connections are allowed for this hub: "allow" or "deny". Default to "deny".
   */
  anonymousConnectPolicy?: string;
  /**
   * The chat settings for the hub.
   */
  chat?: ChatSettings;
  /**
   * Event handler of a hub.
   */
  eventHandlers?: EventHandler[];
  /**
   * Event listener settings for forwarding your client events to listeners.
   * Event listener is transparent to Web PubSub clients, and it doesn't return any result to clients nor interrupt the lifetime of clients.
   * One event can be sent to multiple listeners, as long as it matches the filters in those listeners. The order of the array elements doesn't matter.
   * Maximum count of event listeners among all hubs is 10.
   */
  eventListeners?: EventListener[];
  /**
   * The settings for configuring the WebSocket ping-pong interval in seconds for all clients in the hub. Valid range: 1 to 120. Default to 20 seconds.
   */
  webSocketKeepAliveIntervalInSeconds?: number;
}

/**
 * Input type for Properties of a hub.
 */
export interface WebPubSubHubPropertiesInput extends InputOf<WebPubSubHubProperties> {
  /**
   * The settings for configuring if anonymous connections are allowed for this hub: "allow" or "deny". Default to "deny".
   */
  anonymousConnectPolicy?: ExpressionOrValue<string> | undefined;
  /**
   * The chat settings for the hub.
   */
  chat?: ChatSettingsInput | undefined;
  /**
   * Event handler of a hub.
   */
  eventHandlers?: InputArray<EventHandlerInput, EventHandler[]> | undefined;
  /**
   * Event listener settings for forwarding your client events to listeners.
   * Event listener is transparent to Web PubSub clients, and it doesn't return any result to clients nor interrupt the lifetime of clients.
   * One event can be sent to multiple listeners, as long as it matches the filters in those listeners. The order of the array elements doesn't matter.
   * Maximum count of event listeners among all hubs is 10.
   */
  eventListeners?: InputArray<EventListenerInput, EventListener[]> | undefined;
  /**
   * The settings for configuring the WebSocket ping-pong interval in seconds for all clients in the hub. Valid range: 1 to 120. Default to 20 seconds.
   */
  webSocketKeepAliveIntervalInSeconds?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Properties of a hub.
 */
export type WebPubSubHubPropertiesView = WebPubSubHubPropertiesInput;

export const webPubSubHubPropertiesShape: FlatModelShape = createFlatModelShape({
  anonymousConnectPolicy: { armPath: ["anonymousConnectPolicy"], value: createStringShape() },
  chat: { armPath: ["chat"], value: createDeferredShape(() => chatSettingsShape) },
  eventHandlers: {
    armPath: ["eventHandlers"],
    value: createArrayShape(createDeferredShape(() => eventHandlerShape)),
  },
  eventListeners: {
    armPath: ["eventListeners"],
    value: createArrayShape(createDeferredShape(() => eventListenerShape)),
  },
  webSocketKeepAliveIntervalInSeconds: {
    armPath: ["webSocketKeepAliveIntervalInSeconds"],
    value: createNumberShape(),
  },
});

/**
 * Network ACLs for the resource
 */
export interface WebPubSubNetworkAcLs {
  /**
   * Azure Networking ACL Action.
   */
  defaultAction?: AclAction;
  /**
   * IP rules for filtering public traffic
   */
  ipRules?: IpRule[];
  /**
   * ACLs for requests from private endpoints
   */
  privateEndpoints?: PrivateEndpointAcl[];
  /**
   * Network ACL
   */
  publicNetwork?: NetworkAcl;
}

/**
 * Input type for Network ACLs for the resource
 */
export interface WebPubSubNetworkAcLsInput extends InputOf<WebPubSubNetworkAcLs> {
  /**
   * Azure Networking ACL Action.
   */
  defaultAction?: ExpressionOrValue<AclAction> | undefined;
  /**
   * IP rules for filtering public traffic
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
  /**
   * ACLs for requests from private endpoints
   */
  privateEndpoints?: InputArray<PrivateEndpointAclInput, PrivateEndpointAcl[]> | undefined;
  /**
   * Network ACL
   */
  publicNetwork?: NetworkAclInput | undefined;
}

/**
 * View type for Network ACLs for the resource
 */
export type WebPubSubNetworkAcLsView = WebPubSubNetworkAcLsInput;

export const webPubSubNetworkAcLsShape: FlatModelShape = createFlatModelShape({
  defaultAction: { armPath: ["defaultAction"], value: createUnionShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
  privateEndpoints: {
    armPath: ["privateEndpoints"],
    value: createArrayShape(createDeferredShape(() => privateEndpointAclShape)),
  },
  publicNetwork: { armPath: ["publicNetwork"], value: createDeferredShape(() => networkAclShape) },
});

/**
 * A class that describes the properties of the resource
 */
export interface WebPubSubProperties {
  /**
   * Application firewall settings for the resource
   */
  applicationFirewall?: ApplicationFirewallSettings;
  /**
   * DisableLocalAuth
   * Enable or disable aad auth
   * When set as true, connection with AuthType=aad won't work.
   */
  disableAadAuth?: boolean;
  /**
   * DisableLocalAuth
   * Enable or disable local auth with AccessKey
   * When set as true, connection with AccessKey=xxx won't work.
   */
  disableLocalAuth?: boolean;
  /**
   * The publicly accessible IP of the resource.
   */
  externalIp?: string;
  /**
   * FQDN of the service instance.
   */
  hostName?: string;
  /**
   * Deprecated.
   */
  hostNamePrefix?: string;
  /**
   * Live trace configuration of a Microsoft.SignalRService resource.
   */
  liveTraceConfiguration?: LiveTraceConfiguration;
  /**
   * Network ACLs for the resource
   */
  networkAcLs?: WebPubSubNetworkAcLs;
  /**
   * Private endpoint connections to the resource.
   */
  privateEndpointConnections?: SignalRServicePrivateEndpointConnection[];
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: ProvisioningState;
  /**
   * Enable or disable public network access. Default to "Enabled".
   * When it's Enabled, network ACLs still apply.
   * When it's Disabled, public network access is always disabled no matter what you set in network ACLs.
   */
  publicNetworkAccess?: string;
  /**
   * The publicly accessible port of the resource which is designed for browser/client side usage.
   */
  publicPort?: number;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   * This property is replica specific. Disable the regional endpoint without replica is not allowed.
   */
  regionEndpointEnabled?: string;
  /**
   * Resource log configuration of a Microsoft.SignalRService resource.
   */
  resourceLogConfiguration?: ResourceLogConfiguration;
  /**
   * Stop or start the resource. Default to "False".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: string;
  /**
   * The publicly accessible port of the resource which is designed for customer server side usage.
   */
  serverPort?: number;
  /**
   * The list of shared private link resources.
   */
  sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /**
   * SocketIO settings for the resource
   */
  socketIo?: WebPubSubSocketIoSettings;
  /**
   * TLS settings for the resource
   */
  tls?: WebPubSubTlsSettings;
  /**
   * Version of the resource. Probably you need the same or higher version of client SDKs.
   */
  version?: string;
}

/**
 * Input type for A class that describes the properties of the resource
 */
export interface WebPubSubPropertiesInput extends InputOf<WebPubSubProperties> {
  /**
   * Application firewall settings for the resource
   */
  applicationFirewall?: ApplicationFirewallSettingsInput | undefined;
  /**
   * DisableLocalAuth
   * Enable or disable aad auth
   * When set as true, connection with AuthType=aad won't work.
   */
  disableAadAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * DisableLocalAuth
   * Enable or disable local auth with AccessKey
   * When set as true, connection with AccessKey=xxx won't work.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Live trace configuration of a Microsoft.SignalRService resource.
   */
  liveTraceConfiguration?: LiveTraceConfigurationInput | undefined;
  /**
   * Network ACLs for the resource
   */
  networkAcLs?: WebPubSubNetworkAcLsInput | undefined;
  /**
   * Enable or disable public network access. Default to "Enabled".
   * When it's Enabled, network ACLs still apply.
   * When it's Disabled, public network access is always disabled no matter what you set in network ACLs.
   */
  publicNetworkAccess?: ExpressionOrValue<string> | undefined;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   * This property is replica specific. Disable the regional endpoint without replica is not allowed.
   */
  regionEndpointEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Resource log configuration of a Microsoft.SignalRService resource.
   */
  resourceLogConfiguration?: ResourceLogConfigurationInput | undefined;
  /**
   * Stop or start the resource. Default to "False".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: ExpressionOrValue<string> | undefined;
  /**
   * SocketIO settings for the resource
   */
  socketIo?: WebPubSubSocketIoSettingsInput | undefined;
  /**
   * TLS settings for the resource
   */
  tls?: WebPubSubTlsSettingsInput | undefined;
}

/**
 * View type for A class that describes the properties of the resource
 */
export interface WebPubSubPropertiesView extends InputOf<WebPubSubProperties> {
  /**
   * Application firewall settings for the resource
   */
  applicationFirewall?: ApplicationFirewallSettingsView | undefined;
  /**
   * DisableLocalAuth
   * Enable or disable aad auth
   * When set as true, connection with AuthType=aad won't work.
   */
  disableAadAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * DisableLocalAuth
   * Enable or disable local auth with AccessKey
   * When set as true, connection with AccessKey=xxx won't work.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The publicly accessible IP of the resource.
   */
  readonly externalIp?: Expression<string> | undefined;
  /**
   * Read-only output: FQDN of the service instance.
   */
  readonly hostName?: Expression<string> | undefined;
  /**
   * Read-only output: Deprecated.
   */
  readonly hostNamePrefix?: Expression<string> | undefined;
  /**
   * Live trace configuration of a Microsoft.SignalRService resource.
   */
  liveTraceConfiguration?: LiveTraceConfigurationView | undefined;
  /**
   * Network ACLs for the resource
   */
  networkAcLs?: WebPubSubNetworkAcLsView | undefined;
  /**
   * Read-only output: Private endpoint connections to the resource.
   */
  readonly privateEndpointConnections?:
    Expression<SignalRServicePrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Enable or disable public network access. Default to "Enabled".
   * When it's Enabled, network ACLs still apply.
   * When it's Disabled, public network access is always disabled no matter what you set in network ACLs.
   */
  publicNetworkAccess?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The publicly accessible port of the resource which is designed for browser/client side usage.
   */
  readonly publicPort?: Expression<number> | undefined;
  /**
   * Enable or disable the regional endpoint. Default to "Enabled".
   * When it's Disabled, new connections will not be routed to this endpoint, however existing connections will not be affected.
   * This property is replica specific. Disable the regional endpoint without replica is not allowed.
   */
  regionEndpointEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Resource log configuration of a Microsoft.SignalRService resource.
   */
  resourceLogConfiguration?: ResourceLogConfigurationView | undefined;
  /**
   * Stop or start the resource. Default to "False".
   * When it's true, the data plane of the resource is shutdown.
   * When it's false, the data plane of the resource is started.
   */
  resourceStopped?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The publicly accessible port of the resource which is designed for customer server side usage.
   */
  readonly serverPort?: Expression<number> | undefined;
  /**
   * Read-only output: The list of shared private link resources.
   */
  readonly sharedPrivateLinkResources?: Expression<SharedPrivateLinkResource[]> | undefined;
  /**
   * SocketIO settings for the resource
   */
  socketIo?: WebPubSubSocketIoSettingsView | undefined;
  /**
   * TLS settings for the resource
   */
  tls?: WebPubSubTlsSettingsView | undefined;
  /**
   * Read-only output: Version of the resource. Probably you need the same or higher version of client SDKs.
   */
  readonly version?: Expression<string> | undefined;
}

export const webPubSubPropertiesShape: FlatModelShape = createFlatModelShape({
  applicationFirewall: {
    armPath: ["applicationFirewall"],
    value: createDeferredShape(() => applicationFirewallSettingsShape),
  },
  disableAadAuth: { armPath: ["disableAadAuth"], value: createBooleanShape() },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  externalIp: { armPath: ["externalIP"], value: createStringShape(), readOnly: true },
  hostName: { armPath: ["hostName"], value: createStringShape(), readOnly: true },
  hostNamePrefix: { armPath: ["hostNamePrefix"], value: createStringShape(), readOnly: true },
  liveTraceConfiguration: {
    armPath: ["liveTraceConfiguration"],
    value: createDeferredShape(() => liveTraceConfigurationShape),
  },
  networkAcLs: {
    armPath: ["networkACLs"],
    value: createDeferredShape(() => webPubSubNetworkAcLsShape),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(
      createDeferredShape(() => signalRServicePrivateEndpointConnectionShape),
    ),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createStringShape() },
  publicPort: { armPath: ["publicPort"], value: createNumberShape(), readOnly: true },
  regionEndpointEnabled: { armPath: ["regionEndpointEnabled"], value: createStringShape() },
  resourceLogConfiguration: {
    armPath: ["resourceLogConfiguration"],
    value: createDeferredShape(() => resourceLogConfigurationShape),
  },
  resourceStopped: { armPath: ["resourceStopped"], value: createStringShape() },
  serverPort: { armPath: ["serverPort"], value: createNumberShape(), readOnly: true },
  sharedPrivateLinkResources: {
    armPath: ["sharedPrivateLinkResources"],
    value: createArrayShape(createDeferredShape(() => sharedPrivateLinkResourceShape)),
    readOnly: true,
  },
  socketIo: {
    armPath: ["socketIO"],
    value: createDeferredShape(() => webPubSubSocketIoSettingsShape),
  },
  tls: { armPath: ["tls"], value: createDeferredShape(() => webPubSubTlsSettingsShape) },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * SocketIO settings for the resource
 */
export interface WebPubSubSocketIoSettings {
  /**
   * The service mode of Web PubSub for Socket.IO. Values allowed:
   * "Default": have your own backend Socket.IO server
   * "Serverless": your application doesn't have a backend server
   */
  serviceMode?: string;
}

/**
 * Input type for SocketIO settings for the resource
 */
export interface WebPubSubSocketIoSettingsInput extends InputOf<WebPubSubSocketIoSettings> {
  /**
   * The service mode of Web PubSub for Socket.IO. Values allowed:
   * "Default": have your own backend Socket.IO server
   * "Serverless": your application doesn't have a backend server
   */
  serviceMode?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for SocketIO settings for the resource
 */
export type WebPubSubSocketIoSettingsView = WebPubSubSocketIoSettingsInput;

export const webPubSubSocketIoSettingsShape: FlatModelShape = createFlatModelShape({
  serviceMode: { armPath: ["serviceMode"], value: createStringShape() },
});

/**
 * TLS settings for the resource
 */
export interface WebPubSubTlsSettings {
  /**
   * Request client certificate during TLS handshake if enabled. Not supported for free tier. Any input will be ignored for free tier.
   */
  clientCertEnabled?: boolean;
}

/**
 * Input type for TLS settings for the resource
 */
export interface WebPubSubTlsSettingsInput extends InputOf<WebPubSubTlsSettings> {
  /**
   * Request client certificate during TLS handshake if enabled. Not supported for free tier. Any input will be ignored for free tier.
   */
  clientCertEnabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for TLS settings for the resource
 */
export type WebPubSubTlsSettingsView = WebPubSubTlsSettingsInput;

export const webPubSubTlsSettingsShape: FlatModelShape = createFlatModelShape({
  clientCertEnabled: { armPath: ["clientCertEnabled"], value: createBooleanShape() },
});

/**
 * Azure Networking ACL Action.
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type AclAction = string;

/**
 * The kind of entity that created the resource.
 *
 * Known values:
 *
 * - `"User"`: The entity was created by a user.
 *
 * - `"Application"`: The entity was created by an application.
 *
 * - `"ManagedIdentity"`: The entity was created by a managed identity.
 *
 * - `"Key"`: The entity was created by a key.
 */
export type CreatedByType = string;

/**
 * Allowed event names for group presence events.
 *
 * Known values:
 *
 * - `"joined"`: Event triggered when a connection joins a group.
 *
 * - `"left"`: Event triggered when a connection leaves a group.
 */
export type GroupPresenceEventName = string;

/**
 * Represents the identity type: systemAssigned, userAssigned, None
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"SystemAssigned"`
 *
 * - `"UserAssigned"`
 */
export type ManagedIdentityType = string;

/**
 * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
 *
 * Known values:
 *
 * - `"Pending"`
 *
 * - `"Approved"`
 *
 * - `"Rejected"`
 *
 * - `"Disconnected"`
 */
export type PrivateLinkServiceConnectionStatus = string;

/**
 * Provisioning state of the resource.
 *
 * Known values:
 *
 * - `"Unknown"`: Unknown provisioning state
 *
 * - `"Succeeded"`: Resource successfully provisioned
 *
 * - `"Failed"`: Resource provisioning failed
 *
 * - `"Canceled"`: Resource provisioning was canceled
 *
 * - `"Running"`: Resource provisioning is running
 *
 * - `"Creating"`: Resource is being created
 *
 * - `"Updating"`: Resource is being updated
 *
 * - `"Deleting"`: Resource is being deleted
 *
 * - `"Moving"`
 */
export type ProvisioningState = string;

/**
 * The kind of the service
 *
 * Known values:
 *
 * - `"WebPubSub"`
 *
 * - `"SocketIO"`
 */
export type ServiceKind = string;

/**
 * Status of the shared private link resource
 *
 * Known values:
 *
 * - `"Pending"`
 *
 * - `"Approved"`
 *
 * - `"Rejected"`
 *
 * - `"Disconnected"`
 *
 * - `"Timeout"`
 */
export type SharedPrivateLinkResourceStatus = string;

/**
 * Upstream auth type enum.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"ManagedIdentity"`
 */
export type UpstreamAuthType = string;

/**
 * The incoming request type to the service
 *
 * Known values:
 *
 * - `"ClientConnection"`
 *
 * - `"ServerConnection"`
 *
 * - `"RESTAPI"`
 *
 * - `"Trace"`
 */
export type WebPubSubRequestType = string;

/**
 * Optional tier of this particular SKU. 'Standard' or 'Free'.
 *
 * `Basic` is deprecated, use `Standard` instead.
 *
 * Known values:
 *
 * - `"Free"`: Free tier for WebPubSub service
 *
 * - `"Basic"`: Basic tier for WebPubSub service (deprecated, use Standard instead)
 *
 * - `"Standard"`: Standard tier for WebPubSub service
 *
 * - `"Premium"`: Premium tier for WebPubSub service
 */
export type WebPubSubSkuTier = string;
