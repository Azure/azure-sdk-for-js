// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Lists the operations response. */
export interface OperationListResult {
  /** List of operations available in the Microsoft.ResourceHealth resource provider. */
  value: Operation[];
}

export function operationListResultDeserializer(item: any): OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Operation available in the Microsoft.ResourceHealth resource provider. */
export interface Operation {
  /** Name of the operation. */
  name?: string;
  /** Properties of the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** Properties of the operation. */
export interface OperationDisplay {
  /** Provider name. */
  provider?: string;
  /** Resource name. */
  resource?: string;
  /** Operation name. */
  operation?: string;
  /** Description of the operation. */
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

/** Error details. */
export interface ErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error details. */
  readonly details?: string;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
  };
}

/** availabilityStatus of a resource. */
export interface AvailabilityStatus extends CustomizedProxyResource {
  /** Properties of availability state. */
  properties?: AvailabilityStatusProperties;
}

export function availabilityStatusDeserializer(item: any): AvailabilityStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : availabilityStatusPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of availability state. */
export interface AvailabilityStatusProperties {
  /** Availability status of the resource. When it is null, this availabilityStatus object represents an availability impacting event */
  availabilityState?: AvailabilityStateValues;
  /** Title description of the availability status. */
  title?: string;
  /** Summary description of the availability status. */
  summary?: string;
  /** Details of the availability status. */
  detailedStatus?: string;
  /** When the resource's availabilityState is Unavailable, it describes where the health impacting event was originated. Examples are planned, unplanned, user initiated or an outage etc. */
  reasonType?: string;
  /** When an event is created, it can either be triggered by a customer or the platform of the resource and this field will illustrate that. This field is connected to the category field in this object. */
  context?: string;
  /** When a context field is set to Platform, this field will reflect if the event was planned or unplanned. If the context field does not have a value of Platform, then this field will be ignored. */
  category?: string;
  /** The Article Id */
  articleId?: string;
  /** When the resource's availabilityState is Unavailable, it provides the Timestamp for when the health impacting event was received. */
  rootCauseAttributionTime?: Date;
  /** In case of an availability impacting event, it describes when the health impacting event was originated. Examples are Lifecycle, Downtime, Fault Analysis etc. */
  healthEventType?: string;
  /** In case of an availability impacting event, it describes where the health impacting event was originated. Examples are PlatformInitiated, UserInitiated etc. */
  healthEventCause?: string;
  /** In case of an availability impacting event, it describes the category of a PlatformInitiated health impacting event. Examples are Planned, Unplanned etc. */
  healthEventCategory?: string;
  /** It is a unique Id that identifies the event */
  healthEventId?: string;
  /** When the resource's availabilityState is Unavailable and the reasonType is not User Initiated, it provides the date and time for when the issue is expected to be resolved. */
  resolutionETA?: Date;
  /** Timestamp for when last change in health status occurred. */
  occuredTime?: Date;
  /** Chronicity of the availability transition. */
  reasonChronicity?: ReasonChronicityTypes;
  /** Timestamp for when the health was last checked. */
  reportedTime?: Date;
  /** An annotation describing a change in the availabilityState to Available from Unavailable with a reasonType of type Unplanned */
  recentlyResolved?: AvailabilityStatusPropertiesRecentlyResolved;
  /** Lists actions the user can take based on the current availabilityState of the resource. */
  recommendedActions?: RecommendedAction[];
  /** Lists the service impacting events that may be affecting the health of the resource. */
  serviceImpactingEvents?: ServiceImpactingEvent[];
}

export function availabilityStatusPropertiesDeserializer(item: any): AvailabilityStatusProperties {
  return {
    availabilityState: item["availabilityState"],
    title: item["title"],
    summary: item["summary"],
    detailedStatus: item["detailedStatus"],
    reasonType: item["reasonType"],
    context: item["context"],
    category: item["category"],
    articleId: item["articleId"],
    rootCauseAttributionTime: !item["rootCauseAttributionTime"]
      ? item["rootCauseAttributionTime"]
      : new Date(item["rootCauseAttributionTime"]),
    healthEventType: item["healthEventType"],
    healthEventCause: item["healthEventCause"],
    healthEventCategory: item["healthEventCategory"],
    healthEventId: item["healthEventId"],
    resolutionETA: !item["resolutionETA"] ? item["resolutionETA"] : new Date(item["resolutionETA"]),
    occuredTime: !item["occuredTime"] ? item["occuredTime"] : new Date(item["occuredTime"]),
    reasonChronicity: item["reasonChronicity"],
    reportedTime: !item["reportedTime"] ? item["reportedTime"] : new Date(item["reportedTime"]),
    recentlyResolved: !item["recentlyResolved"]
      ? item["recentlyResolved"]
      : availabilityStatusPropertiesRecentlyResolvedDeserializer(item["recentlyResolved"]),
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : recommendedActionArrayDeserializer(item["recommendedActions"]),
    serviceImpactingEvents: !item["serviceImpactingEvents"]
      ? item["serviceImpactingEvents"]
      : serviceImpactingEventArrayDeserializer(item["serviceImpactingEvents"]),
  };
}

/** Impacted resource status of the resource. */
export enum KnownAvailabilityStateValues {
  /** Available */
  Available = "Available",
  /** Unavailable */
  Unavailable = "Unavailable",
  /** Degraded */
  Degraded = "Degraded",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Impacted resource status of the resource. \
 * {@link KnownAvailabilityStateValues} can be used interchangeably with AvailabilityStateValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: Available \
 * **Unavailable**: Unavailable \
 * **Degraded**: Degraded \
 * **Unknown**: Unknown
 */
export type AvailabilityStateValues = string;

/** Chronicity of the availability transition. */
export enum KnownReasonChronicityTypes {
  /** Transient */
  Transient = "Transient",
  /** Persistent */
  Persistent = "Persistent",
}

/**
 * Chronicity of the availability transition. \
 * {@link KnownReasonChronicityTypes} can be used interchangeably with ReasonChronicityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Transient**: Transient \
 * **Persistent**: Persistent
 */
export type ReasonChronicityTypes = string;

/** An annotation describing a change in the availabilityState to Available from Unavailable with a reasonType of type Unplanned */
export interface AvailabilityStatusPropertiesRecentlyResolved {
  /** Timestamp for when the availabilityState changed to Unavailable */
  unavailableOccuredTime?: Date;
  /** Timestamp when the availabilityState changes to Available. */
  resolvedTime?: Date;
  /** Brief description of cause of the resource becoming unavailable. */
  unavailableSummary?: string;
}

export function availabilityStatusPropertiesRecentlyResolvedDeserializer(
  item: any,
): AvailabilityStatusPropertiesRecentlyResolved {
  return {
    unavailableOccuredTime: !item["unavailableOccuredTime"]
      ? item["unavailableOccuredTime"]
      : new Date(item["unavailableOccuredTime"]),
    resolvedTime: !item["resolvedTime"] ? item["resolvedTime"] : new Date(item["resolvedTime"]),
    unavailableSummary: item["unavailableSummary"],
  };
}

export function recommendedActionArrayDeserializer(result: Array<RecommendedAction>): any[] {
  return result.map((item) => {
    return recommendedActionDeserializer(item);
  });
}

/** Lists actions the user can take based on the current availabilityState of the resource. */
export interface RecommendedAction {
  /** Recommended action. */
  action?: string;
  /** Link to the action */
  actionUrl?: string;
  /** the comment for the Action */
  actionUrlComment?: string;
  /** Substring of action, it describes which text should host the action URL. */
  actionUrlText?: string;
}

export function recommendedActionDeserializer(item: any): RecommendedAction {
  return {
    action: item["action"],
    actionUrl: item["actionUrl"],
    actionUrlComment: item["_ActionUrl.Comment"],
    actionUrlText: item["actionUrlText"],
  };
}

export function serviceImpactingEventArrayDeserializer(
  result: Array<ServiceImpactingEvent>,
): any[] {
  return result.map((item) => {
    return serviceImpactingEventDeserializer(item);
  });
}

/** Lists the service impacting events that may be affecting the health of the resource. */
export interface ServiceImpactingEvent {
  /** Timestamp for when the event started. */
  eventStartTime?: Date;
  /** Timestamp for when event was submitted/detected. */
  eventStatusLastModifiedTime?: Date;
  /** Correlation id for the event */
  correlationId?: string;
  /** Status of the service impacting event. */
  status?: ServiceImpactingEventStatus;
  /** Properties of the service impacting event. */
  incidentProperties?: ServiceImpactingEventIncidentProperties;
}

export function serviceImpactingEventDeserializer(item: any): ServiceImpactingEvent {
  return {
    eventStartTime: !item["eventStartTime"]
      ? item["eventStartTime"]
      : new Date(item["eventStartTime"]),
    eventStatusLastModifiedTime: !item["eventStatusLastModifiedTime"]
      ? item["eventStatusLastModifiedTime"]
      : new Date(item["eventStatusLastModifiedTime"]),
    correlationId: item["correlationId"],
    status: !item["status"]
      ? item["status"]
      : serviceImpactingEventStatusDeserializer(item["status"]),
    incidentProperties: !item["incidentProperties"]
      ? item["incidentProperties"]
      : serviceImpactingEventIncidentPropertiesDeserializer(item["incidentProperties"]),
  };
}

/** Status of the service impacting event. */
export interface ServiceImpactingEventStatus {
  /** Current status of the event */
  value?: string;
}

export function serviceImpactingEventStatusDeserializer(item: any): ServiceImpactingEventStatus {
  return {
    value: item["value"],
  };
}

/** Properties of the service impacting event. */
export interface ServiceImpactingEventIncidentProperties {
  /** Title of the incident. */
  title?: string;
  /** Service impacted by the event. */
  service?: string;
  /** Region impacted by the event. */
  region?: string;
  /** Type of Event. */
  incidentType?: string;
}

export function serviceImpactingEventIncidentPropertiesDeserializer(
  item: any,
): ServiceImpactingEventIncidentProperties {
  return {
    title: item["title"],
    service: item["service"],
    region: item["region"],
    incidentType: item["incidentType"],
  };
}

/** ARM proxy resource. */
export interface CustomizedProxyResource {
  /** Azure Resource Manager Identity for the availabilityStatuses resource. */
  id?: string;
  name?: string;
  /** Microsoft.ResourceHealth/AvailabilityStatuses. */
  type?: string;
  /** Azure Resource Manager geo location of the resource. */
  location?: string;
}

export function customizedProxyResourceDeserializer(item: any): CustomizedProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
  };
}

/** The List availabilityStatus operation response. */
export interface _AvailabilityStatusListResult {
  /** The list of availabilityStatuses. */
  value: AvailabilityStatus[];
  /** The URI to fetch the next page of availabilityStatuses. Call ListNext() with this URI to fetch the next page of availabilityStatuses. */
  nextLink?: string;
}

export function _availabilityStatusListResultDeserializer(
  item: any,
): _AvailabilityStatusListResult {
  return {
    value: availabilityStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availabilityStatusArrayDeserializer(result: Array<AvailabilityStatus>): any[] {
  return result.map((item) => {
    return availabilityStatusDeserializer(item);
  });
}

/** Impacted resource for an event. */
export interface EventImpactedResource extends ProxyResource {
  /** Resource type within Microsoft cloud. */
  readonly targetResourceType?: string;
  /** Identity for resource within Microsoft cloud. */
  readonly targetResourceId?: string;
  /** Impacted resource region name. */
  readonly targetRegion?: string;
  /** Additional information. */
  info?: KeyValueItem[];
}

export function eventImpactedResourceDeserializer(item: any): EventImpactedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventImpactedResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of impacted resource. */
export interface EventImpactedResourceProperties {
  /** Resource type within Microsoft cloud. */
  readonly targetResourceType?: string;
  /** Identity for resource within Microsoft cloud. */
  readonly targetResourceId?: string;
  /** Impacted resource region name. */
  readonly targetRegion?: string;
  /** Additional information. */
  info?: KeyValueItem[];
}

export function eventImpactedResourcePropertiesDeserializer(
  item: any,
): EventImpactedResourceProperties {
  return {
    targetResourceType: item["targetResourceType"],
    targetResourceId: item["targetResourceId"],
    targetRegion: item["targetRegion"],
    info: !item["info"] ? item["info"] : keyValueItemArrayDeserializer(item["info"]),
  };
}

export function keyValueItemArrayDeserializer(result: Array<KeyValueItem>): any[] {
  return result.map((item) => {
    return keyValueItemDeserializer(item);
  });
}

/** Key value tuple. */
export interface KeyValueItem {
  /** Key of tuple. */
  readonly key?: string;
  /** Value of tuple. */
  readonly value?: string;
}

export function keyValueItemDeserializer(item: any): KeyValueItem {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The List of eventImpactedResources operation response. */
export interface _EventImpactedResourceListResult {
  /** The list of eventImpactedResources. */
  value: EventImpactedResource[];
  /** The URI to fetch the next page of events. Call ListNext() with this URI to fetch the next page of impacted resource. */
  nextLink?: string;
}

export function _eventImpactedResourceListResultDeserializer(
  item: any,
): _EventImpactedResourceListResult {
  return {
    value: eventImpactedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventImpactedResourceArrayDeserializer(
  result: Array<EventImpactedResource>,
): any[] {
  return result.map((item) => {
    return eventImpactedResourceDeserializer(item);
  });
}

/** The metadata entity contract. */
export interface MetadataEntity extends ProxyResource {
  /** The display name. */
  displayName?: string;
  /** The list of keys on which this entity depends on. */
  dependsOn?: string[];
  /** The list of scenarios applicable to this metadata entity. */
  applicableScenarios?: Scenario[];
  /** The list of supported values. */
  supportedValues?: MetadataSupportedValueDetail[];
}

export function metadataEntityDeserializer(item: any): MetadataEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _metadataEntityPropertiesDeserializer(item["properties"])),
  };
}

/** The metadata entity properties */
export interface MetadataEntityProperties {
  /** The display name. */
  displayName?: string;
  /** The list of keys on which this entity depends on. */
  dependsOn?: string[];
  /** The list of scenarios applicable to this metadata entity. */
  applicableScenarios?: Scenario[];
  /** The list of supported values. */
  supportedValues?: MetadataSupportedValueDetail[];
}

export function metadataEntityPropertiesDeserializer(item: any): MetadataEntityProperties {
  return {
    displayName: item["displayName"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    applicableScenarios: !item["applicableScenarios"]
      ? item["applicableScenarios"]
      : item["applicableScenarios"].map((p: any) => {
          return p;
        }),
    supportedValues: !item["supportedValues"]
      ? item["supportedValues"]
      : metadataSupportedValueDetailArrayDeserializer(item["supportedValues"]),
  };
}

/** Known values of {@link Scenario} that the service accepts. */
export enum KnownScenario {
  /** Alerts */
  Alerts = "Alerts",
}

/** Type of Scenario */
export type Scenario = string;

export function metadataSupportedValueDetailArrayDeserializer(
  result: Array<MetadataSupportedValueDetail>,
): any[] {
  return result.map((item) => {
    return metadataSupportedValueDetailDeserializer(item);
  });
}

/** The metadata supported value detail. */
export interface MetadataSupportedValueDetail {
  /** The id of the metadata value */
  id?: string;
  /** The previous value of the id field in case the data has changed. */
  previousId?: string;
  /** The permanent guid for the service. Used when the id is a service name. */
  serviceGuid?: string;
  /** The display name. */
  displayName?: string;
  /** The list of associated resource types. */
  resourceTypes?: string[];
  /** Priority of this metadata supported value. Lower number is given higher preference. */
  priority?: number;
}

export function metadataSupportedValueDetailDeserializer(item: any): MetadataSupportedValueDetail {
  return {
    id: item["id"],
    previousId: item["previousId"],
    serviceGuid: item["serviceGuid"],
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    priority: item["priority"],
  };
}

/** The list of metadata entities */
export interface _MetadataEntityListResult {
  /** The list of metadata entities. */
  value?: MetadataEntity[];
  /** The link used to get the next page of metadata. */
  nextLink?: string;
}

export function _metadataEntityListResultDeserializer(item: any): _MetadataEntityListResult {
  return {
    value: !item["value"] ? item["value"] : metadataEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metadataEntityArrayDeserializer(result: Array<MetadataEntity>): any[] {
  return result.map((item) => {
    return metadataEntityDeserializer(item);
  });
}

/** Service health event */
export interface Event extends ProxyResource {
  /** Type of event. */
  eventType?: EventTypeValues;
  /** Sub-type of event. */
  eventSubType?: EventSubTypeValues;
  /** Source of event. */
  eventSource?: EventSourceValues;
  /** Current status of event. */
  status?: EventStatusValues;
  /** Title text of event. */
  title?: string;
  /** Summary text of event. Use fetchEventDetails endpoint to get summary of sensitive events. */
  summary?: string;
  /** Header text of event. */
  header?: string;
  /** Level of insight. */
  level?: LevelValues;
  /** Level of event. */
  eventLevel?: EventLevelValues;
  /** If true the event may contains sensitive data. Use the post events/{trackingId}/fetchEventDetails endpoint to fetch sensitive data see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
  isEventSensitive?: boolean;
  /** The id of the Incident */
  externalIncidentId?: string;
  /** The reason for the Incident */
  reason?: string;
  /** Article of event. */
  article?: EventPropertiesArticle;
  /** Useful links of event. */
  links?: Link[];
  /** It provides the Timestamp for when the health impacting event started. */
  impactStartTime?: Date;
  /** It provides the Timestamp for when the health impacting event resolved. */
  impactMitigationTime?: Date;
  /** List services impacted by the service health event. */
  impact?: Impact[];
  /** Recommended actions of event. */
  recommendedActions?: EventPropertiesRecommendedActions;
  /** Frequently asked questions for the service health event. */
  faqs?: Faq[];
  /** It provides information if the event is High incident rate event or not. */
  isHIR?: boolean;
  /** Tells if we want to enable or disable Microsoft Support for this event. */
  enableMicrosoftSupport?: boolean;
  /** Contains the communication message for the event, that could include summary, root cause and other details. Use fetchEventDetails endpoint to get description of sensitive events. */
  description?: string;
  /** Is true if the event is platform initiated. */
  platformInitiated?: boolean;
  /** Tells if we want to enable or disable Microsoft Support for this event. */
  enableChatWithUs?: boolean;
  /** Priority level of the event. Has value from 0 to 23. 0 is the highest priority. Service issue events have higher priority followed by planned maintenance and health advisory. Critical events have higher priority followed by error, warning and informational. Furthermore, active events have higher priority than resolved. */
  priority?: number;
  /** It provides the Timestamp for when the health impacting event was last updated. */
  lastUpdateTime?: Date;
  /** Stage for HIR Document */
  hirStage?: string;
  /** Additional information */
  additionalInformation?: EventPropertiesAdditionalInformation;
  /** duration in seconds */
  duration?: number;
  /** The type of the impact */
  impactType?: string;
  /**
   * A list of metadata tags associated with the event. Possible values include:
   * -Action Recommended: Action may be required by you to avoid possible disruptions or mitigate risks for your services. It is recommended to evaluate these actions and the potential impact on your services.
   * - False Positive: After investigation, we've determined your service is healthy and service issues did not impact your services as originally communicated.
   * - Preliminary PIR: For our largest, most impactful service issues a Preliminary Post Incident Review (PIR) is published generally within 72 hours of mitigation, to summarize what we have learned so far from the still-in-progress investigation.
   * - Final PIR: For service issues, a Final Post Incident Review (PIR) may be published to provide additional details or learnings. Sometimes this requires us to complete an internal retrospective, generally within 14 days of mitigation.
   */
  eventTags?: string[];
  /** Billing rate change information - new rate */
  newRate?: number;
  /** Billing rate change information - old rate */
  oldRate?: number;
  /** Billing currency type information. Example: USD, CAD */
  currencyType?: string;
  /** Billing identifier information. */
  billingId?: string;
}

export function eventDeserializer(item: any): Event {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of event. */
export interface EventProperties {
  /** Type of event. */
  eventType?: EventTypeValues;
  /** Sub-type of event. */
  eventSubType?: EventSubTypeValues;
  /** Source of event. */
  eventSource?: EventSourceValues;
  /** Current status of event. */
  status?: EventStatusValues;
  /** Title text of event. */
  title?: string;
  /** Summary text of event. Use fetchEventDetails endpoint to get summary of sensitive events. */
  summary?: string;
  /** Header text of event. */
  header?: string;
  /** Level of insight. */
  level?: LevelValues;
  /** Level of event. */
  eventLevel?: EventLevelValues;
  /** If true the event may contains sensitive data. Use the post events/{trackingId}/fetchEventDetails endpoint to fetch sensitive data see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
  isEventSensitive?: boolean;
  /** The id of the Incident */
  externalIncidentId?: string;
  /** The reason for the Incident */
  reason?: string;
  /** Article of event. */
  article?: EventPropertiesArticle;
  /** Useful links of event. */
  links?: Link[];
  /** It provides the Timestamp for when the health impacting event started. */
  impactStartTime?: Date;
  /** It provides the Timestamp for when the health impacting event resolved. */
  impactMitigationTime?: Date;
  /** List services impacted by the service health event. */
  impact?: Impact[];
  /** Recommended actions of event. */
  recommendedActions?: EventPropertiesRecommendedActions;
  /** Frequently asked questions for the service health event. */
  faqs?: Faq[];
  /** It provides information if the event is High incident rate event or not. */
  isHIR?: boolean;
  /** Tells if we want to enable or disable Microsoft Support for this event. */
  enableMicrosoftSupport?: boolean;
  /** Contains the communication message for the event, that could include summary, root cause and other details. Use fetchEventDetails endpoint to get description of sensitive events. */
  description?: string;
  /** Is true if the event is platform initiated. */
  platformInitiated?: boolean;
  /** Tells if we want to enable or disable Microsoft Support for this event. */
  enableChatWithUs?: boolean;
  /** Priority level of the event. Has value from 0 to 23. 0 is the highest priority. Service issue events have higher priority followed by planned maintenance and health advisory. Critical events have higher priority followed by error, warning and informational. Furthermore, active events have higher priority than resolved. */
  priority?: number;
  /** It provides the Timestamp for when the health impacting event was last updated. */
  lastUpdateTime?: Date;
  /** Stage for HIR Document */
  hirStage?: string;
  /** Additional information */
  additionalInformation?: EventPropertiesAdditionalInformation;
  /** duration in seconds */
  duration?: number;
  /** The type of the impact */
  impactType?: string;
  /**
   * A list of metadata tags associated with the event. Possible values include:
   * -Action Recommended: Action may be required by you to avoid possible disruptions or mitigate risks for your services. It is recommended to evaluate these actions and the potential impact on your services.
   * - False Positive: After investigation, we've determined your service is healthy and service issues did not impact your services as originally communicated.
   * - Preliminary PIR: For our largest, most impactful service issues a Preliminary Post Incident Review (PIR) is published generally within 72 hours of mitigation, to summarize what we have learned so far from the still-in-progress investigation.
   * - Final PIR: For service issues, a Final Post Incident Review (PIR) may be published to provide additional details or learnings. Sometimes this requires us to complete an internal retrospective, generally within 14 days of mitigation.
   */
  eventTags?: string[];
  /** Billing rate change information - new rate */
  newRate?: number;
  /** Billing rate change information - old rate */
  oldRate?: number;
  /** Billing currency type information. Example: USD, CAD */
  currencyType?: string;
  /** Billing identifier information. */
  billingId?: string;
}

export function eventPropertiesDeserializer(item: any): EventProperties {
  return {
    eventType: item["eventType"],
    eventSubType: item["eventSubType"],
    eventSource: item["eventSource"],
    status: item["status"],
    title: item["title"],
    summary: item["summary"],
    header: item["header"],
    level: item["level"],
    eventLevel: item["eventLevel"],
    isEventSensitive: item["isEventSensitive"],
    externalIncidentId: item["externalIncidentId"],
    reason: item["reason"],
    article: !item["article"]
      ? item["article"]
      : eventPropertiesArticleDeserializer(item["article"]),
    links: !item["links"] ? item["links"] : linkArrayDeserializer(item["links"]),
    impactStartTime: !item["impactStartTime"]
      ? item["impactStartTime"]
      : new Date(item["impactStartTime"]),
    impactMitigationTime: !item["impactMitigationTime"]
      ? item["impactMitigationTime"]
      : new Date(item["impactMitigationTime"]),
    impact: !item["impact"] ? item["impact"] : impactArrayDeserializer(item["impact"]),
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : eventPropertiesRecommendedActionsDeserializer(item["recommendedActions"]),
    faqs: !item["faqs"] ? item["faqs"] : faqArrayDeserializer(item["faqs"]),
    isHIR: item["isHIR"],
    enableMicrosoftSupport: item["enableMicrosoftSupport"],
    description: item["description"],
    platformInitiated: item["platformInitiated"],
    enableChatWithUs: item["enableChatWithUs"],
    priority: item["priority"],
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
    hirStage: item["hirStage"],
    additionalInformation: !item["additionalInformation"]
      ? item["additionalInformation"]
      : eventPropertiesAdditionalInformationDeserializer(item["additionalInformation"]),
    duration: item["duration"],
    impactType: item["impactType"],
    eventTags: !item["eventTags"]
      ? item["eventTags"]
      : item["eventTags"].map((p: any) => {
          return p;
        }),
    newRate: item["newRate"],
    oldRate: item["oldRate"],
    currencyType: item["currencyType"],
    billingId: item["billingId"],
  };
}

/** Type of event. */
export enum KnownEventTypeValues {
  /** ServiceIssue */
  ServiceIssue = "ServiceIssue",
  /** PlannedMaintenance */
  PlannedMaintenance = "PlannedMaintenance",
  /** HealthAdvisory */
  HealthAdvisory = "HealthAdvisory",
  /** RCA */
  RCA = "RCA",
  /** EmergingIssues */
  EmergingIssues = "EmergingIssues",
  /** SecurityAdvisory */
  SecurityAdvisory = "SecurityAdvisory",
  /** Billing */
  Billing = "Billing",
}

/**
 * Type of event. \
 * {@link KnownEventTypeValues} can be used interchangeably with EventTypeValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceIssue**: ServiceIssue \
 * **PlannedMaintenance**: PlannedMaintenance \
 * **HealthAdvisory**: HealthAdvisory \
 * **RCA**: RCA \
 * **EmergingIssues**: EmergingIssues \
 * **SecurityAdvisory**: SecurityAdvisory \
 * **Billing**: Billing
 */
export type EventTypeValues = string;

/** Sub-type of event. */
export enum KnownEventSubTypeValues {
  /** Retirement */
  Retirement = "Retirement",
  /** ForeignExchangeRateChange */
  ForeignExchangeRateChange = "ForeignExchangeRateChange",
  /** Underbilling */
  Underbilling = "Underbilling",
  /** Overbilling */
  Overbilling = "Overbilling",
  /** PriceChanges */
  PriceChanges = "PriceChanges",
  /** TaxChanges */
  TaxChanges = "TaxChanges",
  /** MeterIDChanges */
  MeterIDChanges = "MeterIDChanges",
  /** UnauthorizedPartyAbuse */
  UnauthorizedPartyAbuse = "UnauthorizedPartyAbuse",
}

/**
 * Sub-type of event. \
 * {@link KnownEventSubTypeValues} can be used interchangeably with EventSubTypeValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Retirement**: Retirement \
 * **ForeignExchangeRateChange**: ForeignExchangeRateChange \
 * **Underbilling**: Underbilling \
 * **Overbilling**: Overbilling \
 * **PriceChanges**: PriceChanges \
 * **TaxChanges**: TaxChanges \
 * **MeterIDChanges**: MeterIDChanges \
 * **UnauthorizedPartyAbuse**: UnauthorizedPartyAbuse
 */
export type EventSubTypeValues = string;

/** Source of event. */
export enum KnownEventSourceValues {
  /** ResourceHealth */
  ResourceHealth = "ResourceHealth",
  /** ServiceHealth */
  ServiceHealth = "ServiceHealth",
}

/**
 * Source of event. \
 * {@link KnownEventSourceValues} can be used interchangeably with EventSourceValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ResourceHealth**: ResourceHealth \
 * **ServiceHealth**: ServiceHealth
 */
export type EventSourceValues = string;

/** Current status of event. */
export enum KnownEventStatusValues {
  /** Active */
  Active = "Active",
  /** Resolved */
  Resolved = "Resolved",
}

/**
 * Current status of event. \
 * {@link KnownEventStatusValues} can be used interchangeably with EventStatusValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Resolved**: Resolved
 */
export type EventStatusValues = string;

/** Level of insight. */
export enum KnownLevelValues {
  /** Critical */
  Critical = "Critical",
  /** Warning */
  Warning = "Warning",
}

/**
 * Level of insight. \
 * {@link KnownLevelValues} can be used interchangeably with LevelValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical \
 * **Warning**: Warning
 */
export type LevelValues = string;

/** Level of event. */
export enum KnownEventLevelValues {
  /** Critical */
  Critical = "Critical",
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Informational */
  Informational = "Informational",
}

/**
 * Level of event. \
 * {@link KnownEventLevelValues} can be used interchangeably with EventLevelValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Informational**: Informational
 */
export type EventLevelValues = string;

/** Article of event. */
export interface EventPropertiesArticle {
  /** Article content of event. */
  articleContent?: string;
  /** Article Id */
  articleId?: string;
  /** It provides a map of parameter name and value */
  parameters?: any;
}

export function eventPropertiesArticleDeserializer(item: any): EventPropertiesArticle {
  return {
    articleContent: item["articleContent"],
    articleId: item["articleId"],
    parameters: item["parameters"],
  };
}

export function linkArrayDeserializer(result: Array<Link>): any[] {
  return result.map((item) => {
    return linkDeserializer(item);
  });
}

/** Useful links for service health event. */
export interface Link {
  /** Type of link. */
  type?: LinkTypeValues;
  /** Display text of link. */
  displayText?: LinkDisplayText;
  /** It provides the name of portal extension to produce link for given service health event. */
  extensionName?: string;
  /** It provides the name of portal extension blade to produce link for given service health event. */
  bladeName?: string;
  /** It provides a map of parameter name and value for portal extension blade to produce lik for given service health event. */
  parameters?: any;
}

export function linkDeserializer(item: any): Link {
  return {
    type: item["type"],
    displayText: !item["displayText"]
      ? item["displayText"]
      : linkDisplayTextDeserializer(item["displayText"]),
    extensionName: item["extensionName"],
    bladeName: item["bladeName"],
    parameters: item["parameters"],
  };
}

/** Type of link. */
export enum KnownLinkTypeValues {
  /** Button */
  Button = "Button",
  /** Hyperlink */
  Hyperlink = "Hyperlink",
}

/**
 * Type of link. \
 * {@link KnownLinkTypeValues} can be used interchangeably with LinkTypeValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Button**: Button \
 * **Hyperlink**: Hyperlink
 */
export type LinkTypeValues = string;

/** Display text of link. */
export interface LinkDisplayText {
  /** Display text of link. */
  value?: string;
  /** Localized display text of link. */
  localizedValue?: string;
}

export function linkDisplayTextDeserializer(item: any): LinkDisplayText {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

export function impactArrayDeserializer(result: Array<Impact>): any[] {
  return result.map((item) => {
    return impactDeserializer(item);
  });
}

/** Azure service impacted by the service health event. */
export interface Impact {
  /** Impacted service name. */
  impactedService?: string;
  /** Impacted service guid. This is the permanent identifier for the impacted service. */
  impactedServiceGuid?: string;
  /** List regions impacted by the service health event. */
  impactedRegions?: ImpactedServiceRegion[];
}

export function impactDeserializer(item: any): Impact {
  return {
    impactedService: item["impactedService"],
    impactedServiceGuid: item["impactedServiceGuid"],
    impactedRegions: !item["impactedRegions"]
      ? item["impactedRegions"]
      : impactedServiceRegionArrayDeserializer(item["impactedRegions"]),
  };
}

export function impactedServiceRegionArrayDeserializer(
  result: Array<ImpactedServiceRegion>,
): any[] {
  return result.map((item) => {
    return impactedServiceRegionDeserializer(item);
  });
}

/** Azure region impacted by the service health event. */
export interface ImpactedServiceRegion {
  /** Impacted region name. */
  impactedRegion?: string;
  /** Current status of event in the region. */
  status?: EventStatusValues;
  /** List subscription impacted by the service health event. */
  impactedSubscriptions?: string[];
  /** List tenant impacted by the service health event. */
  impactedTenants?: string[];
  /** It provides the Timestamp for when the last update for the service health event. */
  lastUpdateTime?: Date;
  /** List of updates for given service health event.  Use fetchEventDetails endpoint to get updates of sensitive events. */
  updates?: Update[];
}

export function impactedServiceRegionDeserializer(item: any): ImpactedServiceRegion {
  return {
    impactedRegion: item["impactedRegion"],
    status: item["status"],
    impactedSubscriptions: !item["impactedSubscriptions"]
      ? item["impactedSubscriptions"]
      : item["impactedSubscriptions"].map((p: any) => {
          return p;
        }),
    impactedTenants: !item["impactedTenants"]
      ? item["impactedTenants"]
      : item["impactedTenants"].map((p: any) => {
          return p;
        }),
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
    updates: !item["updates"] ? item["updates"] : updateArrayDeserializer(item["updates"]),
  };
}

export function updateArrayDeserializer(result: Array<Update>): any[] {
  return result.map((item) => {
    return updateDeserializer(item);
  });
}

/** Update for service health event. */
export interface Update {
  /** Summary text for the given update for the service health event. */
  summary?: string;
  /** It provides the Timestamp for the given update for the service health event. */
  updateDateTime?: Date;
  /**
   * A list of metadata tags associated with the event. Possible values include:
   * -Action Recommended: Action may be required by you to avoid possible disruptions or mitigate risks for your services. It is recommended to evaluate these actions and the potential impact on your services.
   * - False Positive: After investigation, we've determined your service is healthy and service issues did not impact your services as originally communicated.
   * - Preliminary PIR: For our largest, most impactful service issues a Preliminary Post Incident Review (PIR) is published generally within 72 hours of mitigation, to summarize what we have learned so far from the still-in-progress investigation.
   * - Final PIR: For service issues, a Final Post Incident Review (PIR) may be published to provide additional details or learnings. Sometimes this requires us to complete an internal retrospective, generally within 14 days of mitigation.
   */
  eventTags?: string[];
}

export function updateDeserializer(item: any): Update {
  return {
    summary: item["summary"],
    updateDateTime: !item["updateDateTime"]
      ? item["updateDateTime"]
      : new Date(item["updateDateTime"]),
    eventTags: !item["eventTags"]
      ? item["eventTags"]
      : item["eventTags"].map((p: any) => {
          return p;
        }),
  };
}

/** Recommended actions of event. */
export interface EventPropertiesRecommendedActions {
  /** Recommended action title for the service health event. */
  message?: string;
  /** Recommended actions for the service health event. */
  actions?: EventPropertiesRecommendedActionsItem[];
  /** Recommended action locale for the service health event. */
  localeCode?: string;
}

export function eventPropertiesRecommendedActionsDeserializer(
  item: any,
): EventPropertiesRecommendedActions {
  return {
    message: item["message"],
    actions: !item["actions"]
      ? item["actions"]
      : eventPropertiesRecommendedActionsItemArrayDeserializer(item["actions"]),
    localeCode: item["localeCode"],
  };
}

export function eventPropertiesRecommendedActionsItemArrayDeserializer(
  result: Array<EventPropertiesRecommendedActionsItem>,
): any[] {
  return result.map((item) => {
    return eventPropertiesRecommendedActionsItemDeserializer(item);
  });
}

/** Recommended action for the service health event. */
export interface EventPropertiesRecommendedActionsItem {
  /** Recommended action group Id for the service health event. */
  groupId?: number;
  /** Recommended action text */
  actionText?: string;
}

export function eventPropertiesRecommendedActionsItemDeserializer(
  item: any,
): EventPropertiesRecommendedActionsItem {
  return {
    groupId: item["groupId"],
    actionText: item["actionText"],
  };
}

export function faqArrayDeserializer(result: Array<Faq>): any[] {
  return result.map((item) => {
    return faqDeserializer(item);
  });
}

/** Frequently asked question for the service health event */
export interface Faq {
  /** FAQ question for the service health event. */
  question?: string;
  /** FAQ answer for the service health event. */
  answer?: string;
  /** FAQ locale for the service health event. */
  localeCode?: string;
}

export function faqDeserializer(item: any): Faq {
  return {
    question: item["question"],
    answer: item["answer"],
    localeCode: item["localeCode"],
  };
}

/** Additional information */
export interface EventPropertiesAdditionalInformation {
  /** Additional information Message */
  message?: string;
}

export function eventPropertiesAdditionalInformationDeserializer(
  item: any,
): EventPropertiesAdditionalInformation {
  return {
    message: item["message"],
  };
}

/** The List events operation response. */
export interface _Events {
  /** The Event items on this page */
  value: Event[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventsDeserializer(item: any): _Events {
  return {
    value: eventArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** The Get EmergingIssues operation response. */
export interface EmergingIssuesGetResult extends ProxyResource {
  /** Timestamp for when last time refreshed for ongoing emerging issue. */
  refreshTimestamp?: Date;
  /** The list of emerging issues of banner type. */
  statusBanners?: StatusBanner[];
  /** The list of emerging issues of active event type. */
  statusActiveEvents?: StatusActiveEvent[];
}

export function emergingIssuesGetResultDeserializer(item: any): EmergingIssuesGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _emergingIssuesGetResultPropertiesDeserializer(item["properties"])),
  };
}

/** On-going emerging issue from azure status. */
export interface EmergingIssue {
  /** Timestamp for when last time refreshed for ongoing emerging issue. */
  refreshTimestamp?: Date;
  /** The list of emerging issues of banner type. */
  statusBanners?: StatusBanner[];
  /** The list of emerging issues of active event type. */
  statusActiveEvents?: StatusActiveEvent[];
}

export function emergingIssueDeserializer(item: any): EmergingIssue {
  return {
    refreshTimestamp: !item["refreshTimestamp"]
      ? item["refreshTimestamp"]
      : new Date(item["refreshTimestamp"]),
    statusBanners: !item["statusBanners"]
      ? item["statusBanners"]
      : statusBannerArrayDeserializer(item["statusBanners"]),
    statusActiveEvents: !item["statusActiveEvents"]
      ? item["statusActiveEvents"]
      : statusActiveEventArrayDeserializer(item["statusActiveEvents"]),
  };
}

export function statusBannerArrayDeserializer(result: Array<StatusBanner>): any[] {
  return result.map((item) => {
    return statusBannerDeserializer(item);
  });
}

/** Banner type of emerging issue. */
export interface StatusBanner {
  /** The banner title. */
  title?: string;
  /** The details of banner. */
  message?: string;
  /** The cloud type of this banner. */
  cloud?: string;
  /** The last time modified on this banner. */
  lastModifiedTime?: Date;
}

export function statusBannerDeserializer(item: any): StatusBanner {
  return {
    title: item["title"],
    message: item["message"],
    cloud: item["cloud"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

export function statusActiveEventArrayDeserializer(result: Array<StatusActiveEvent>): any[] {
  return result.map((item) => {
    return statusActiveEventDeserializer(item);
  });
}

/** Active event type of emerging issue. */
export interface StatusActiveEvent {
  /** The active event title. */
  title?: string;
  /** The details of active event. */
  description?: string;
  /** The tracking id of this active event. */
  trackingId?: string;
  /** The impact start time on this active event. */
  startTime?: Date;
  /** The cloud type of this active event. */
  cloud?: string;
  /** The severity level of this active event. */
  severity?: SeverityValues;
  /** The stage of this active event. */
  stage?: StageValues;
  /** The boolean value of this active event if published or not. */
  published?: boolean;
  /** The last time modified on this banner. */
  lastModifiedTime?: Date;
  /** The list of emerging issues impacts. */
  impacts?: EmergingIssueImpact[];
}

export function statusActiveEventDeserializer(item: any): StatusActiveEvent {
  return {
    title: item["title"],
    description: item["description"],
    trackingId: item["trackingId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    cloud: item["cloud"],
    severity: item["severity"],
    stage: item["stage"],
    published: item["published"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    impacts: !item["impacts"]
      ? item["impacts"]
      : emergingIssueImpactArrayDeserializer(item["impacts"]),
  };
}

/** The severity level of this active event. */
export enum KnownSeverityValues {
  /** Information */
  Information = "Information",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * The severity level of this active event. \
 * {@link KnownSeverityValues} can be used interchangeably with SeverityValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Information**: Information \
 * **Warning**: Warning \
 * **Error**: Error
 */
export type SeverityValues = string;

/** The stage of this active event. */
export enum KnownStageValues {
  /** Active */
  Active = "Active",
  /** Resolve */
  Resolve = "Resolve",
  /** Archived */
  Archived = "Archived",
}

/**
 * The stage of this active event. \
 * {@link KnownStageValues} can be used interchangeably with StageValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Resolve**: Resolve \
 * **Archived**: Archived
 */
export type StageValues = string;

export function emergingIssueImpactArrayDeserializer(result: Array<EmergingIssueImpact>): any[] {
  return result.map((item) => {
    return emergingIssueImpactDeserializer(item);
  });
}

/** Object of the emerging issue impact on services and regions. */
export interface EmergingIssueImpact {
  /** The impacted service id. */
  id?: string;
  /** The impacted service name. */
  name?: string;
  /** The list of impacted regions for corresponding emerging issues. */
  regions?: ImpactedRegion[];
}

export function emergingIssueImpactDeserializer(item: any): EmergingIssueImpact {
  return {
    id: item["id"],
    name: item["name"],
    regions: !item["regions"] ? item["regions"] : impactedRegionArrayDeserializer(item["regions"]),
  };
}

export function impactedRegionArrayDeserializer(result: Array<ImpactedRegion>): any[] {
  return result.map((item) => {
    return impactedRegionDeserializer(item);
  });
}

/** Object of impacted region. */
export interface ImpactedRegion {
  /** The impacted region id. */
  id?: string;
  /** The impacted region name. */
  name?: string;
}

export function impactedRegionDeserializer(item: any): ImpactedRegion {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** Known values of {@link IssueNameParameter} that the service accepts. */
export enum KnownIssueNameParameter {
  /** default */
  Default = "default",
}

/** Type of IssueNameParameter */
export type IssueNameParameter = string;

/** The list of emerging issues. */
export interface _EmergingIssueListResult {
  /** The list of emerging issues. */
  value?: EmergingIssuesGetResult[];
  /** The link used to get the next page of emerging issues. */
  nextLink?: string;
}

export function _emergingIssueListResultDeserializer(item: any): _EmergingIssueListResult {
  return {
    value: !item["value"] ? item["value"] : emergingIssuesGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function emergingIssuesGetResultArrayDeserializer(
  result: Array<EmergingIssuesGetResult>,
): any[] {
  return result.map((item) => {
    return emergingIssuesGetResultDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
}

export function _eventImpactedResourcePropertiesDeserializer(item: any) {
  return {
    targetResourceType: item["targetResourceType"],
    targetResourceId: item["targetResourceId"],
    targetRegion: item["targetRegion"],
    info: !item["info"] ? item["info"] : keyValueItemArrayDeserializer(item["info"]),
  };
}

export function _metadataEntityPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    applicableScenarios: !item["applicableScenarios"]
      ? item["applicableScenarios"]
      : item["applicableScenarios"].map((p: any) => {
          return p;
        }),
    supportedValues: !item["supportedValues"]
      ? item["supportedValues"]
      : metadataSupportedValueDetailArrayDeserializer(item["supportedValues"]),
  };
}

export function _eventPropertiesDeserializer(item: any) {
  return {
    eventType: item["eventType"],
    eventSubType: item["eventSubType"],
    eventSource: item["eventSource"],
    status: item["status"],
    title: item["title"],
    summary: item["summary"],
    header: item["header"],
    level: item["level"],
    eventLevel: item["eventLevel"],
    isEventSensitive: item["isEventSensitive"],
    externalIncidentId: item["externalIncidentId"],
    reason: item["reason"],
    article: !item["article"]
      ? item["article"]
      : eventPropertiesArticleDeserializer(item["article"]),
    links: !item["links"] ? item["links"] : linkArrayDeserializer(item["links"]),
    impactStartTime: !item["impactStartTime"]
      ? item["impactStartTime"]
      : new Date(item["impactStartTime"]),
    impactMitigationTime: !item["impactMitigationTime"]
      ? item["impactMitigationTime"]
      : new Date(item["impactMitigationTime"]),
    impact: !item["impact"] ? item["impact"] : impactArrayDeserializer(item["impact"]),
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : eventPropertiesRecommendedActionsDeserializer(item["recommendedActions"]),
    faqs: !item["faqs"] ? item["faqs"] : faqArrayDeserializer(item["faqs"]),
    isHIR: item["isHIR"],
    enableMicrosoftSupport: item["enableMicrosoftSupport"],
    description: item["description"],
    platformInitiated: item["platformInitiated"],
    enableChatWithUs: item["enableChatWithUs"],
    priority: item["priority"],
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
    hirStage: item["hirStage"],
    additionalInformation: !item["additionalInformation"]
      ? item["additionalInformation"]
      : eventPropertiesAdditionalInformationDeserializer(item["additionalInformation"]),
    duration: item["duration"],
    impactType: item["impactType"],
    eventTags: !item["eventTags"]
      ? item["eventTags"]
      : item["eventTags"].map((p: any) => {
          return p;
        }),
    newRate: item["newRate"],
    oldRate: item["oldRate"],
    currencyType: item["currencyType"],
    billingId: item["billingId"],
  };
}

export function _emergingIssuesGetResultPropertiesDeserializer(item: any) {
  return {
    refreshTimestamp: !item["refreshTimestamp"]
      ? item["refreshTimestamp"]
      : new Date(item["refreshTimestamp"]),
    statusBanners: !item["statusBanners"]
      ? item["statusBanners"]
      : statusBannerArrayDeserializer(item["statusBanners"]),
    statusActiveEvents: !item["statusActiveEvents"]
      ? item["statusActiveEvents"]
      : statusActiveEventArrayDeserializer(item["statusActiveEvents"]),
  };
}
