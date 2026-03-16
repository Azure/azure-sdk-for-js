// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Front Door represents a collection of backend endpoints to route traffic to along with rules that specify how traffic is sent there. */
export interface FrontDoor extends Resource {
  /** A friendly name for the frontDoor */
  friendlyName?: string;
  /** Routing rules associated with this Front Door. */
  routingRules?: RoutingRule[];
  /** Load balancing settings associated with this Front Door instance. */
  loadBalancingSettings?: LoadBalancingSettingsModel[];
  /** Health probe settings associated with this Front Door instance. */
  healthProbeSettings?: HealthProbeSettingsModel[];
  /** Backend pools available to routing rules. */
  backendPools?: BackendPool[];
  /** Frontend endpoints available to routing rules. */
  frontendEndpoints?: FrontendEndpoint[];
  /** Settings for all backendPools */
  backendPoolsSettings?: BackendPoolsSettings;
  /** Operational status of the Front Door load balancer. Permitted values are 'Enabled' or 'Disabled' */
  enabledState?: FrontDoorEnabledState;
  /** Resource status of the Front Door. */
  readonly resourceState?: FrontDoorResourceState;
  /** Provisioning state of the Front Door. */
  readonly provisioningState?: string;
  /** The host that each frontendEndpoint must CNAME to. */
  readonly cname?: string;
  /** The Id of the frontdoor. */
  readonly frontdoorId?: string;
  /** Rules Engine Configurations available to routing rules. */
  readonly rulesEngines?: RulesEngine[];
  /** Key-Value pair representing additional properties for frontdoor. */
  readonly extendedProperties?: Record<string, string>;
}

export function frontDoorSerializer(item: FrontDoor): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "friendlyName",
      "routingRules",
      "loadBalancingSettings",
      "healthProbeSettings",
      "backendPools",
      "frontendEndpoints",
      "backendPoolsSettings",
      "enabledState",
    ])
      ? undefined
      : _frontDoorPropertiesSerializer(item),
  };
}

export function frontDoorDeserializer(item: any): FrontDoor {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _frontDoorPropertiesDeserializer(item["properties"])),
  };
}

/** The JSON object that contains the properties required to create an endpoint. */
export interface FrontDoorProperties extends FrontDoorUpdateParameters {
  /** Resource status of the Front Door. */
  readonly resourceState?: FrontDoorResourceState;
  /** Provisioning state of the Front Door. */
  readonly provisioningState?: string;
  /** The host that each frontendEndpoint must CNAME to. */
  readonly cname?: string;
  /** The Id of the frontdoor. */
  readonly frontdoorId?: string;
  /** Rules Engine Configurations available to routing rules. */
  readonly rulesEngines?: RulesEngine[];
  /** Key-Value pair representing additional properties for frontdoor. */
  readonly extendedProperties?: Record<string, string>;
}

export function frontDoorPropertiesSerializer(item: FrontDoorProperties): any {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArraySerializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArraySerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArraySerializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArraySerializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArraySerializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsSerializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
  };
}

export function frontDoorPropertiesDeserializer(item: any): FrontDoorProperties {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArrayDeserializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArrayDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArrayDeserializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArrayDeserializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArrayDeserializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsDeserializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
    provisioningState: item["provisioningState"],
    cname: item["cname"],
    frontdoorId: item["frontdoorId"],
    rulesEngines: !item["rulesEngines"]
      ? item["rulesEngines"]
      : rulesEngineArrayDeserializer(item["rulesEngines"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Resource status of the Front Door or Front Door SubResource. */
export enum KnownFrontDoorResourceState {
  /** Creating */
  Creating = "Creating",
  /** Enabling */
  Enabling = "Enabling",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleting */
  Deleting = "Deleting",
  /** Migrating */
  Migrating = "Migrating",
  /** Migrated */
  Migrated = "Migrated",
}

/**
 * Resource status of the Front Door or Front Door SubResource. \
 * {@link KnownFrontDoorResourceState} can be used interchangeably with FrontDoorResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Enabling**: Enabling \
 * **Enabled**: Enabled \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled \
 * **Deleting**: Deleting \
 * **Migrating**: Migrating \
 * **Migrated**: Migrated
 */
export type FrontDoorResourceState = string;

export function rulesEngineArraySerializer(result: Array<RulesEngine>): any[] {
  return result.map((item) => {
    return rulesEngineSerializer(item);
  });
}

export function rulesEngineArrayDeserializer(result: Array<RulesEngine>): any[] {
  return result.map((item) => {
    return rulesEngineDeserializer(item);
  });
}

/** A rules engine configuration containing a list of rules that will run to modify the runtime behavior of the request and response. */
export interface RulesEngine extends BasicResource {
  /** A list of rules that define a particular Rules Engine Configuration. */
  rules?: RulesEngineRule[];
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function rulesEngineSerializer(item: RulesEngine): any {
  return {
    properties: areAllPropsUndefined(item, ["rules"])
      ? undefined
      : _rulesEnginePropertiesSerializer(item),
  };
}

export function rulesEngineDeserializer(item: any): RulesEngine {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _rulesEnginePropertiesDeserializer(item["properties"])),
  };
}

/** The JSON object that contains the properties required to create a Rules Engine Configuration. */
export interface RulesEngineProperties extends RulesEngineUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function rulesEnginePropertiesSerializer(item: RulesEngineProperties): any {
  return { rules: !item["rules"] ? item["rules"] : rulesEngineRuleArraySerializer(item["rules"]) };
}

export function rulesEnginePropertiesDeserializer(item: any): RulesEngineProperties {
  return {
    rules: !item["rules"] ? item["rules"] : rulesEngineRuleArrayDeserializer(item["rules"]),
    resourceState: item["resourceState"],
  };
}

/** Rules Engine Configuration to apply to a Routing Rule. */
export interface RulesEngineUpdateParameters {
  /** A list of rules that define a particular Rules Engine Configuration. */
  rules?: RulesEngineRule[];
}

export function rulesEngineUpdateParametersSerializer(item: RulesEngineUpdateParameters): any {
  return { rules: !item["rules"] ? item["rules"] : rulesEngineRuleArraySerializer(item["rules"]) };
}

export function rulesEngineUpdateParametersDeserializer(item: any): RulesEngineUpdateParameters {
  return {
    rules: !item["rules"] ? item["rules"] : rulesEngineRuleArrayDeserializer(item["rules"]),
  };
}

export function rulesEngineRuleArraySerializer(result: Array<RulesEngineRule>): any[] {
  return result.map((item) => {
    return rulesEngineRuleSerializer(item);
  });
}

export function rulesEngineRuleArrayDeserializer(result: Array<RulesEngineRule>): any[] {
  return result.map((item) => {
    return rulesEngineRuleDeserializer(item);
  });
}

/** Contains a list of match conditions, and an action on how to modify the request/response. If multiple rules match, the actions from one rule that conflict with a previous rule overwrite for a singular action, or append in the case of headers manipulation. */
export interface RulesEngineRule {
  /** A name to refer to this specific rule. */
  name: string;
  /** A priority assigned to this rule. */
  priority: number;
  /** Actions to perform on the request and response if all of the match conditions are met. */
  action: RulesEngineAction;
  /** A list of match conditions that must meet in order for the actions of this rule to run. Having no match conditions means the actions will always run. */
  matchConditions?: RulesEngineMatchCondition[];
  /** If this rule is a match should the rules engine continue running the remaining rules or stop. If not present, defaults to Continue. */
  matchProcessingBehavior?: MatchProcessingBehavior;
}

export function rulesEngineRuleSerializer(item: RulesEngineRule): any {
  return {
    name: item["name"],
    priority: item["priority"],
    action: rulesEngineActionSerializer(item["action"]),
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : rulesEngineMatchConditionArraySerializer(item["matchConditions"]),
    matchProcessingBehavior: item["matchProcessingBehavior"],
  };
}

export function rulesEngineRuleDeserializer(item: any): RulesEngineRule {
  return {
    name: item["name"],
    priority: item["priority"],
    action: rulesEngineActionDeserializer(item["action"]),
    matchConditions: !item["matchConditions"]
      ? item["matchConditions"]
      : rulesEngineMatchConditionArrayDeserializer(item["matchConditions"]),
    matchProcessingBehavior: item["matchProcessingBehavior"],
  };
}

/** One or more actions that will execute, modifying the request and/or response. */
export interface RulesEngineAction {
  /** A list of header actions to apply from the request from AFD to the origin. */
  requestHeaderActions?: HeaderAction[];
  /** A list of header actions to apply from the response from AFD to the client. */
  responseHeaderActions?: HeaderAction[];
  /** Override the route configuration. */
  routeConfigurationOverride?: RouteConfigurationUnion;
}

export function rulesEngineActionSerializer(item: RulesEngineAction): any {
  return {
    requestHeaderActions: !item["requestHeaderActions"]
      ? item["requestHeaderActions"]
      : headerActionArraySerializer(item["requestHeaderActions"]),
    responseHeaderActions: !item["responseHeaderActions"]
      ? item["responseHeaderActions"]
      : headerActionArraySerializer(item["responseHeaderActions"]),
    routeConfigurationOverride: !item["routeConfigurationOverride"]
      ? item["routeConfigurationOverride"]
      : routeConfigurationUnionSerializer(item["routeConfigurationOverride"]),
  };
}

export function rulesEngineActionDeserializer(item: any): RulesEngineAction {
  return {
    requestHeaderActions: !item["requestHeaderActions"]
      ? item["requestHeaderActions"]
      : headerActionArrayDeserializer(item["requestHeaderActions"]),
    responseHeaderActions: !item["responseHeaderActions"]
      ? item["responseHeaderActions"]
      : headerActionArrayDeserializer(item["responseHeaderActions"]),
    routeConfigurationOverride: !item["routeConfigurationOverride"]
      ? item["routeConfigurationOverride"]
      : routeConfigurationUnionDeserializer(item["routeConfigurationOverride"]),
  };
}

export function headerActionArraySerializer(result: Array<HeaderAction>): any[] {
  return result.map((item) => {
    return headerActionSerializer(item);
  });
}

export function headerActionArrayDeserializer(result: Array<HeaderAction>): any[] {
  return result.map((item) => {
    return headerActionDeserializer(item);
  });
}

/** An action that can manipulate an http header. */
export interface HeaderAction {
  /** Which type of manipulation to apply to the header. */
  headerActionType: HeaderActionType;
  /** The name of the header this action will apply to. */
  headerName: string;
  /** The value to update the given header name with. This value is not used if the actionType is Delete. */
  value?: string;
}

export function headerActionSerializer(item: HeaderAction): any {
  return {
    headerActionType: item["headerActionType"],
    headerName: item["headerName"],
    value: item["value"],
  };
}

export function headerActionDeserializer(item: any): HeaderAction {
  return {
    headerActionType: item["headerActionType"],
    headerName: item["headerName"],
    value: item["value"],
  };
}

/** Which type of manipulation to apply to the header. */
export enum KnownHeaderActionType {
  /** Append */
  Append = "Append",
  /** Delete */
  Delete = "Delete",
  /** Overwrite */
  Overwrite = "Overwrite",
}

/**
 * Which type of manipulation to apply to the header. \
 * {@link KnownHeaderActionType} can be used interchangeably with HeaderActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Append**: Append \
 * **Delete**: Delete \
 * **Overwrite**: Overwrite
 */
export type HeaderActionType = string;

/** Base class for all types of Route. */
export interface RouteConfiguration {
  odataType: string;
}

export function routeConfigurationSerializer(item: RouteConfiguration): any {
  return { "@odata.type": item["odataType"] };
}

export function routeConfigurationDeserializer(item: any): RouteConfiguration {
  return {
    odataType: item["@odata.type"],
  };
}

/** Alias for RouteConfigurationUnion */
export type RouteConfigurationUnion =
  | ForwardingConfiguration
  | RedirectConfiguration
  | RouteConfiguration;

export function routeConfigurationUnionSerializer(item: RouteConfigurationUnion): any {
  switch (item.odataType) {
    case "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration":
      return forwardingConfigurationSerializer(item as ForwardingConfiguration);

    case "#Microsoft.Azure.FrontDoor.Models.FrontdoorRedirectConfiguration":
      return redirectConfigurationSerializer(item as RedirectConfiguration);

    default:
      return routeConfigurationSerializer(item);
  }
}

export function routeConfigurationUnionDeserializer(item: any): RouteConfigurationUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration":
      return forwardingConfigurationDeserializer(item as ForwardingConfiguration);

    case "#Microsoft.Azure.FrontDoor.Models.FrontdoorRedirectConfiguration":
      return redirectConfigurationDeserializer(item as RedirectConfiguration);

    default:
      return routeConfigurationDeserializer(item);
  }
}

/** Describes Forwarding Route. */
export interface ForwardingConfiguration extends RouteConfiguration {
  /** A custom path used to rewrite resource paths matched by this rule. Leave empty to use incoming path. */
  customForwardingPath?: string;
  /** Protocol this rule will use when forwarding traffic to backends. */
  forwardingProtocol?: FrontDoorForwardingProtocol;
  /** The caching configuration associated with this rule. */
  cacheConfiguration?: CacheConfiguration;
  /** A reference to the BackendPool which this rule routes to. */
  backendPool?: SubResource;
  odataType: "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration";
}

export function forwardingConfigurationSerializer(item: ForwardingConfiguration): any {
  return {
    "@odata.type": item["odataType"],
    customForwardingPath: item["customForwardingPath"],
    forwardingProtocol: item["forwardingProtocol"],
    cacheConfiguration: !item["cacheConfiguration"]
      ? item["cacheConfiguration"]
      : cacheConfigurationSerializer(item["cacheConfiguration"]),
    backendPool: !item["backendPool"]
      ? item["backendPool"]
      : subResourceSerializer(item["backendPool"]),
  };
}

export function forwardingConfigurationDeserializer(item: any): ForwardingConfiguration {
  return {
    odataType: item["@odata.type"],
    customForwardingPath: item["customForwardingPath"],
    forwardingProtocol: item["forwardingProtocol"],
    cacheConfiguration: !item["cacheConfiguration"]
      ? item["cacheConfiguration"]
      : cacheConfigurationDeserializer(item["cacheConfiguration"]),
    backendPool: !item["backendPool"]
      ? item["backendPool"]
      : subResourceDeserializer(item["backendPool"]),
  };
}

/** Protocol this rule will use when forwarding traffic to backends. */
export enum KnownFrontDoorForwardingProtocol {
  /** HttpOnly */
  HttpOnly = "HttpOnly",
  /** HttpsOnly */
  HttpsOnly = "HttpsOnly",
  /** MatchRequest */
  MatchRequest = "MatchRequest",
}

/**
 * Protocol this rule will use when forwarding traffic to backends. \
 * {@link KnownFrontDoorForwardingProtocol} can be used interchangeably with FrontDoorForwardingProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HttpOnly**: HttpOnly \
 * **HttpsOnly**: HttpsOnly \
 * **MatchRequest**: MatchRequest
 */
export type FrontDoorForwardingProtocol = string;

/** Caching settings for a caching-type route. To disable caching, do not provide a cacheConfiguration object. */
export interface CacheConfiguration {
  /** Treatment of URL query terms when forming the cache key. */
  queryParameterStripDirective?: FrontDoorQuery;
  /** query parameters to include or exclude (comma separated). */
  queryParameters?: string;
  /** Whether to use dynamic compression for cached content */
  dynamicCompression?: DynamicCompressionEnabled;
  /** The duration for which the content needs to be cached. Allowed format is in ISO 8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations). HTTP requires the value to be no more than a year */
  cacheDuration?: string;
}

export function cacheConfigurationSerializer(item: CacheConfiguration): any {
  return {
    queryParameterStripDirective: item["queryParameterStripDirective"],
    queryParameters: item["queryParameters"],
    dynamicCompression: item["dynamicCompression"],
    cacheDuration: item["cacheDuration"],
  };
}

export function cacheConfigurationDeserializer(item: any): CacheConfiguration {
  return {
    queryParameterStripDirective: item["queryParameterStripDirective"],
    queryParameters: item["queryParameters"],
    dynamicCompression: item["dynamicCompression"],
    cacheDuration: item["cacheDuration"],
  };
}

/** Treatment of URL query terms when forming the cache key. */
export enum KnownFrontDoorQuery {
  /** StripNone */
  StripNone = "StripNone",
  /** StripAll */
  StripAll = "StripAll",
  /** StripOnly */
  StripOnly = "StripOnly",
  /** StripAllExcept */
  StripAllExcept = "StripAllExcept",
}

/**
 * Treatment of URL query terms when forming the cache key. \
 * {@link KnownFrontDoorQuery} can be used interchangeably with FrontDoorQuery,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StripNone**: StripNone \
 * **StripAll**: StripAll \
 * **StripOnly**: StripOnly \
 * **StripAllExcept**: StripAllExcept
 */
export type FrontDoorQuery = string;

/** Whether to use dynamic compression for cached content */
export enum KnownDynamicCompressionEnabled {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to use dynamic compression for cached content \
 * {@link KnownDynamicCompressionEnabled} can be used interchangeably with DynamicCompressionEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type DynamicCompressionEnabled = string;

/** Reference to another subresource. */
export interface SubResource {
  /** Resource ID. */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

/** Describes Redirect Route. */
export interface RedirectConfiguration extends RouteConfiguration {
  /** The redirect type the rule will use when redirecting traffic. */
  redirectType?: FrontDoorRedirectType;
  /** The protocol of the destination to where the traffic is redirected */
  redirectProtocol?: FrontDoorRedirectProtocol;
  /** Host to redirect. Leave empty to use the incoming host as the destination host. */
  customHost?: string;
  /** The full path to redirect. Path cannot be empty and must start with /. Leave empty to use the incoming path as destination path. */
  customPath?: string;
  /** Fragment to add to the redirect URL. Fragment is the part of the URL that comes after #. Do not include the #. */
  customFragment?: string;
  /** The set of query strings to be placed in the redirect URL. Setting this value would replace any existing query string; leave empty to preserve the incoming query string. Query string must be in <key>=<value> format. The first ? and & will be added automatically so do not include them in the front, but do separate multiple query strings with &. */
  customQueryString?: string;
  odataType: "#Microsoft.Azure.FrontDoor.Models.FrontdoorRedirectConfiguration";
}

export function redirectConfigurationSerializer(item: RedirectConfiguration): any {
  return {
    "@odata.type": item["odataType"],
    redirectType: item["redirectType"],
    redirectProtocol: item["redirectProtocol"],
    customHost: item["customHost"],
    customPath: item["customPath"],
    customFragment: item["customFragment"],
    customQueryString: item["customQueryString"],
  };
}

export function redirectConfigurationDeserializer(item: any): RedirectConfiguration {
  return {
    odataType: item["@odata.type"],
    redirectType: item["redirectType"],
    redirectProtocol: item["redirectProtocol"],
    customHost: item["customHost"],
    customPath: item["customPath"],
    customFragment: item["customFragment"],
    customQueryString: item["customQueryString"],
  };
}

/** The redirect type the rule will use when redirecting traffic. */
export enum KnownFrontDoorRedirectType {
  /** Moved */
  Moved = "Moved",
  /** Found */
  Found = "Found",
  /** TemporaryRedirect */
  TemporaryRedirect = "TemporaryRedirect",
  /** PermanentRedirect */
  PermanentRedirect = "PermanentRedirect",
}

/**
 * The redirect type the rule will use when redirecting traffic. \
 * {@link KnownFrontDoorRedirectType} can be used interchangeably with FrontDoorRedirectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Moved**: Moved \
 * **Found**: Found \
 * **TemporaryRedirect**: TemporaryRedirect \
 * **PermanentRedirect**: PermanentRedirect
 */
export type FrontDoorRedirectType = string;

/** The protocol of the destination to where the traffic is redirected */
export enum KnownFrontDoorRedirectProtocol {
  /** HttpOnly */
  HttpOnly = "HttpOnly",
  /** HttpsOnly */
  HttpsOnly = "HttpsOnly",
  /** MatchRequest */
  MatchRequest = "MatchRequest",
}

/**
 * The protocol of the destination to where the traffic is redirected \
 * {@link KnownFrontDoorRedirectProtocol} can be used interchangeably with FrontDoorRedirectProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HttpOnly**: HttpOnly \
 * **HttpsOnly**: HttpsOnly \
 * **MatchRequest**: MatchRequest
 */
export type FrontDoorRedirectProtocol = string;

export function rulesEngineMatchConditionArraySerializer(
  result: Array<RulesEngineMatchCondition>,
): any[] {
  return result.map((item) => {
    return rulesEngineMatchConditionSerializer(item);
  });
}

export function rulesEngineMatchConditionArrayDeserializer(
  result: Array<RulesEngineMatchCondition>,
): any[] {
  return result.map((item) => {
    return rulesEngineMatchConditionDeserializer(item);
  });
}

/** Define a match condition */
export interface RulesEngineMatchCondition {
  /** Match Variable */
  rulesEngineMatchVariable: RulesEngineMatchVariable;
  /** Name of selector in RequestHeader or RequestBody to be matched */
  selector?: string;
  /** Describes operator to apply to the match condition. */
  rulesEngineOperator: RulesEngineOperator;
  /** Describes if this is negate condition or not */
  negateCondition?: boolean;
  /** Match values to match against. The operator will apply to each value in here with OR semantics. If any of them match the variable with the given operator this match condition is considered a match. */
  rulesEngineMatchValue: string[];
  /** List of transforms */
  transforms?: Transform[];
}

export function rulesEngineMatchConditionSerializer(item: RulesEngineMatchCondition): any {
  return {
    rulesEngineMatchVariable: item["rulesEngineMatchVariable"],
    selector: item["selector"],
    rulesEngineOperator: item["rulesEngineOperator"],
    negateCondition: item["negateCondition"],
    rulesEngineMatchValue: item["rulesEngineMatchValue"].map((p: any) => {
      return p;
    }),
    transforms: !item["transforms"]
      ? item["transforms"]
      : item["transforms"].map((p: any) => {
          return p;
        }),
  };
}

export function rulesEngineMatchConditionDeserializer(item: any): RulesEngineMatchCondition {
  return {
    rulesEngineMatchVariable: item["rulesEngineMatchVariable"],
    selector: item["selector"],
    rulesEngineOperator: item["rulesEngineOperator"],
    negateCondition: item["negateCondition"],
    rulesEngineMatchValue: item["rulesEngineMatchValue"].map((p: any) => {
      return p;
    }),
    transforms: !item["transforms"]
      ? item["transforms"]
      : item["transforms"].map((p: any) => {
          return p;
        }),
  };
}

/** Match Variable */
export enum KnownRulesEngineMatchVariable {
  /** IsMobile */
  IsMobile = "IsMobile",
  /** RemoteAddr */
  RemoteAddr = "RemoteAddr",
  /** RequestMethod */
  RequestMethod = "RequestMethod",
  /** QueryString */
  QueryString = "QueryString",
  /** PostArgs */
  PostArgs = "PostArgs",
  /** RequestUri */
  RequestUri = "RequestUri",
  /** RequestPath */
  RequestPath = "RequestPath",
  /** RequestFilename */
  RequestFilename = "RequestFilename",
  /** RequestFilenameExtension */
  RequestFilenameExtension = "RequestFilenameExtension",
  /** RequestHeader */
  RequestHeader = "RequestHeader",
  /** RequestBody */
  RequestBody = "RequestBody",
  /** RequestScheme */
  RequestScheme = "RequestScheme",
}

/**
 * Match Variable \
 * {@link KnownRulesEngineMatchVariable} can be used interchangeably with RulesEngineMatchVariable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IsMobile**: IsMobile \
 * **RemoteAddr**: RemoteAddr \
 * **RequestMethod**: RequestMethod \
 * **QueryString**: QueryString \
 * **PostArgs**: PostArgs \
 * **RequestUri**: RequestUri \
 * **RequestPath**: RequestPath \
 * **RequestFilename**: RequestFilename \
 * **RequestFilenameExtension**: RequestFilenameExtension \
 * **RequestHeader**: RequestHeader \
 * **RequestBody**: RequestBody \
 * **RequestScheme**: RequestScheme
 */
export type RulesEngineMatchVariable = string;

/** Describes operator to apply to the match condition. */
export enum KnownRulesEngineOperator {
  /** Any */
  Any = "Any",
  /** IPMatch */
  IPMatch = "IPMatch",
  /** GeoMatch */
  GeoMatch = "GeoMatch",
  /** Equal */
  Equal = "Equal",
  /** Contains */
  Contains = "Contains",
  /** LessThan */
  LessThan = "LessThan",
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** LessThanOrEqual */
  LessThanOrEqual = "LessThanOrEqual",
  /** GreaterThanOrEqual */
  GreaterThanOrEqual = "GreaterThanOrEqual",
  /** BeginsWith */
  BeginsWith = "BeginsWith",
  /** EndsWith */
  EndsWith = "EndsWith",
}

/**
 * Describes operator to apply to the match condition. \
 * {@link KnownRulesEngineOperator} can be used interchangeably with RulesEngineOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any**: Any \
 * **IPMatch**: IPMatch \
 * **GeoMatch**: GeoMatch \
 * **Equal**: Equal \
 * **Contains**: Contains \
 * **LessThan**: LessThan \
 * **GreaterThan**: GreaterThan \
 * **LessThanOrEqual**: LessThanOrEqual \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **BeginsWith**: BeginsWith \
 * **EndsWith**: EndsWith
 */
export type RulesEngineOperator = string;

/** Describes what transforms are applied before matching */
export enum KnownTransform {
  /** Lowercase */
  Lowercase = "Lowercase",
  /** Uppercase */
  Uppercase = "Uppercase",
  /** Trim */
  Trim = "Trim",
  /** UrlDecode */
  UrlDecode = "UrlDecode",
  /** UrlEncode */
  UrlEncode = "UrlEncode",
  /** RemoveNulls */
  RemoveNulls = "RemoveNulls",
}

/**
 * Describes what transforms are applied before matching \
 * {@link KnownTransform} can be used interchangeably with Transform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Lowercase**: Lowercase \
 * **Uppercase**: Uppercase \
 * **Trim**: Trim \
 * **UrlDecode**: UrlDecode \
 * **UrlEncode**: UrlEncode \
 * **RemoveNulls**: RemoveNulls
 */
export type Transform = string;

/** If this rule is a match should the rules engine continue running the remaining rules or stop. If not present, defaults to Continue. */
export enum KnownMatchProcessingBehavior {
  /** Continue */
  Continue = "Continue",
  /** Stop */
  Stop = "Stop",
}

/**
 * If this rule is a match should the rules engine continue running the remaining rules or stop. If not present, defaults to Continue. \
 * {@link KnownMatchProcessingBehavior} can be used interchangeably with MatchProcessingBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Continue**: Continue \
 * **Stop**: Stop
 */
export type MatchProcessingBehavior = string;

/** Common resource representation. */
export interface BasicResource {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
}

export function basicResourceSerializer(item: BasicResource): any {
  return item;
}

export function basicResourceDeserializer(item: any): BasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties needed to update a Front Door */
export interface FrontDoorUpdateParameters {
  /** A friendly name for the frontDoor */
  friendlyName?: string;
  /** Routing rules associated with this Front Door. */
  routingRules?: RoutingRule[];
  /** Load balancing settings associated with this Front Door instance. */
  loadBalancingSettings?: LoadBalancingSettingsModel[];
  /** Health probe settings associated with this Front Door instance. */
  healthProbeSettings?: HealthProbeSettingsModel[];
  /** Backend pools available to routing rules. */
  backendPools?: BackendPool[];
  /** Frontend endpoints available to routing rules. */
  frontendEndpoints?: FrontendEndpoint[];
  /** Settings for all backendPools */
  backendPoolsSettings?: BackendPoolsSettings;
  /** Operational status of the Front Door load balancer. Permitted values are 'Enabled' or 'Disabled' */
  enabledState?: FrontDoorEnabledState;
}

export function frontDoorUpdateParametersSerializer(item: FrontDoorUpdateParameters): any {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArraySerializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArraySerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArraySerializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArraySerializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArraySerializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsSerializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
  };
}

export function frontDoorUpdateParametersDeserializer(item: any): FrontDoorUpdateParameters {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArrayDeserializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArrayDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArrayDeserializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArrayDeserializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArrayDeserializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsDeserializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
  };
}

export function routingRuleArraySerializer(result: Array<RoutingRule>): any[] {
  return result.map((item) => {
    return routingRuleSerializer(item);
  });
}

export function routingRuleArrayDeserializer(result: Array<RoutingRule>): any[] {
  return result.map((item) => {
    return routingRuleDeserializer(item);
  });
}

/** A routing rule represents a specification for traffic to treat and where to send it, along with health probe information. */
export interface RoutingRule extends SubResource {
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Frontend endpoints associated with this rule */
  frontendEndpoints?: SubResource[];
  /** Protocol schemes to match for this rule */
  acceptedProtocols?: FrontDoorProtocol[];
  /** The route patterns of the rule. */
  patternsToMatch?: string[];
  /** Whether to enable use of this rule. Permitted values are 'Enabled' or 'Disabled' */
  enabledState?: RoutingRuleEnabledState;
  /** A reference to the routing configuration. */
  routeConfiguration?: RouteConfigurationUnion;
  /** A reference to a specific Rules Engine Configuration to apply to this route. */
  rulesEngine?: SubResource;
  /** Defines the Web Application Firewall policy for each routing rule (if applicable) */
  webApplicationFirewallPolicyLink?: RoutingRuleUpdateParametersWebApplicationFirewallPolicyLink;
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function routingRuleSerializer(item: RoutingRule): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "frontendEndpoints",
      "acceptedProtocols",
      "patternsToMatch",
      "enabledState",
      "routeConfiguration",
      "rulesEngine",
      "webApplicationFirewallPolicyLink",
    ])
      ? undefined
      : _routingRulePropertiesSerializer(item),
    name: item["name"],
  };
}

export function routingRuleDeserializer(item: any): RoutingRule {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _routingRulePropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
  };
}

/** The JSON object that contains the properties required to create a routing rule. */
export interface RoutingRuleProperties extends RoutingRuleUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function routingRulePropertiesSerializer(item: RoutingRuleProperties): any {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArraySerializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionSerializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceSerializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function routingRulePropertiesDeserializer(item: any): RoutingRuleProperties {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArrayDeserializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionDeserializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceDeserializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
    resourceState: item["resourceState"],
  };
}

export function loadBalancingSettingsModelArraySerializer(
  result: Array<LoadBalancingSettingsModel>,
): any[] {
  return result.map((item) => {
    return loadBalancingSettingsModelSerializer(item);
  });
}

export function loadBalancingSettingsModelArrayDeserializer(
  result: Array<LoadBalancingSettingsModel>,
): any[] {
  return result.map((item) => {
    return loadBalancingSettingsModelDeserializer(item);
  });
}

/** Load balancing settings for a backend pool */
export interface LoadBalancingSettingsModel extends SubResource {
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
  /** The number of samples to consider for load balancing decisions */
  sampleSize?: number;
  /** The number of samples within the sample period that must succeed */
  successfulSamplesRequired?: number;
  /** The additional latency in milliseconds for probes to fall into the lowest latency bucket */
  additionalLatencyMilliseconds?: number;
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function loadBalancingSettingsModelSerializer(item: LoadBalancingSettingsModel): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "sampleSize",
      "successfulSamplesRequired",
      "additionalLatencyMilliseconds",
    ])
      ? undefined
      : _loadBalancingSettingsModelPropertiesSerializer(item),
    name: item["name"],
  };
}

export function loadBalancingSettingsModelDeserializer(item: any): LoadBalancingSettingsModel {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _loadBalancingSettingsModelPropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
  };
}

/** The JSON object that contains the properties required to create load balancing settings */
export interface LoadBalancingSettingsProperties extends LoadBalancingSettingsUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function loadBalancingSettingsPropertiesSerializer(
  item: LoadBalancingSettingsProperties,
): any {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
  };
}

export function loadBalancingSettingsPropertiesDeserializer(
  item: any,
): LoadBalancingSettingsProperties {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
    resourceState: item["resourceState"],
  };
}

export function healthProbeSettingsModelArraySerializer(
  result: Array<HealthProbeSettingsModel>,
): any[] {
  return result.map((item) => {
    return healthProbeSettingsModelSerializer(item);
  });
}

export function healthProbeSettingsModelArrayDeserializer(
  result: Array<HealthProbeSettingsModel>,
): any[] {
  return result.map((item) => {
    return healthProbeSettingsModelDeserializer(item);
  });
}

/** Load balancing settings for a backend pool */
export interface HealthProbeSettingsModel extends SubResource {
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
  /** The path to use for the health probe. Default is / */
  path?: string;
  /** Protocol scheme to use for this probe */
  protocol?: FrontDoorProtocol;
  /** The number of seconds between health probes. */
  intervalInSeconds?: number;
  /** Configures which HTTP method to use to probe the backends defined under backendPools. */
  healthProbeMethod?: FrontDoorHealthProbeMethod;
  /** Whether to enable health probes to be made against backends defined under backendPools. Health probes can only be disabled if there is a single enabled backend in single enabled backend pool. */
  enabledState?: HealthProbeEnabled;
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function healthProbeSettingsModelSerializer(item: HealthProbeSettingsModel): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "path",
      "protocol",
      "intervalInSeconds",
      "healthProbeMethod",
      "enabledState",
    ])
      ? undefined
      : _healthProbeSettingsModelPropertiesSerializer(item),
    name: item["name"],
  };
}

export function healthProbeSettingsModelDeserializer(item: any): HealthProbeSettingsModel {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _healthProbeSettingsModelPropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
  };
}

/** The JSON object that contains the properties required to create a health probe settings. */
export interface HealthProbeSettingsProperties extends HealthProbeSettingsUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function healthProbeSettingsPropertiesSerializer(item: HealthProbeSettingsProperties): any {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
  };
}

export function healthProbeSettingsPropertiesDeserializer(
  item: any,
): HealthProbeSettingsProperties {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
  };
}

export function backendPoolArraySerializer(result: Array<BackendPool>): any[] {
  return result.map((item) => {
    return backendPoolSerializer(item);
  });
}

export function backendPoolArrayDeserializer(result: Array<BackendPool>): any[] {
  return result.map((item) => {
    return backendPoolDeserializer(item);
  });
}

/** A backend pool is a collection of backends that can be routed to. */
export interface BackendPool extends SubResource {
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
  /** The set of backends for this pool */
  backends?: Backend[];
  /** Load balancing settings for a backend pool */
  loadBalancingSettings?: SubResource;
  /** L7 health probe settings for a backend pool */
  healthProbeSettings?: SubResource;
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function backendPoolSerializer(item: BackendPool): any {
  return {
    id: item["id"],
    properties: areAllPropsUndefined(item, [
      "backends",
      "loadBalancingSettings",
      "healthProbeSettings",
    ])
      ? undefined
      : _backendPoolPropertiesSerializer(item),
    name: item["name"],
  };
}

export function backendPoolDeserializer(item: any): BackendPool {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _backendPoolPropertiesDeserializer(item["properties"])),
    name: item["name"],
    type: item["type"],
  };
}

/** The JSON object that contains the properties required to create a Backend Pool. */
export interface BackendPoolProperties extends BackendPoolUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
}

export function backendPoolPropertiesSerializer(item: BackendPoolProperties): any {
  return {
    backends: !item["backends"] ? item["backends"] : backendArraySerializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceSerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceSerializer(item["healthProbeSettings"]),
  };
}

export function backendPoolPropertiesDeserializer(item: any): BackendPoolProperties {
  return {
    backends: !item["backends"] ? item["backends"] : backendArrayDeserializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceDeserializer(item["healthProbeSettings"]),
    resourceState: item["resourceState"],
  };
}

export function frontendEndpointArraySerializer(result: Array<FrontendEndpoint>): any[] {
  return result.map((item) => {
    return frontendEndpointSerializer(item);
  });
}

export function frontendEndpointArrayDeserializer(result: Array<FrontendEndpoint>): any[] {
  return result.map((item) => {
    return frontendEndpointDeserializer(item);
  });
}

/** A frontend endpoint used for routing. */
export interface FrontendEndpoint extends BasicResourceWithSettableIDName {
  /** The host name of the frontendEndpoint. Must be a domain name. */
  hostName?: string;
  /** Whether to allow session affinity on this host. Valid options are 'Enabled' or 'Disabled' */
  sessionAffinityEnabledState?: SessionAffinityEnabledState;
  /** UNUSED. This field will be ignored. The TTL to use in seconds for session affinity, if applicable. */
  sessionAffinityTtlSeconds?: number;
  /** Defines the Web Application Firewall policy for each host (if applicable) */
  webApplicationFirewallPolicyLink?: FrontendEndpointUpdateParametersWebApplicationFirewallPolicyLink;
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
  /** Provisioning status of Custom Https of the frontendEndpoint. */
  readonly customHttpsProvisioningState?: CustomHttpsProvisioningState;
  /** Provisioning substate shows the progress of custom HTTPS enabling/disabling process step by step. */
  readonly customHttpsProvisioningSubstate?: CustomHttpsProvisioningSubstate;
  /** The configuration specifying how to enable HTTPS */
  readonly customHttpsConfiguration?: CustomHttpsConfiguration;
}

export function frontendEndpointSerializer(item: FrontendEndpoint): any {
  return {
    id: item["id"],
    name: item["name"],
    properties: areAllPropsUndefined(item, [
      "hostName",
      "sessionAffinityEnabledState",
      "sessionAffinityTtlSeconds",
      "webApplicationFirewallPolicyLink",
    ])
      ? undefined
      : _frontendEndpointPropertiesSerializer(item),
  };
}

export function frontendEndpointDeserializer(item: any): FrontendEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _frontendEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** The JSON object that contains the properties required to create a frontend endpoint. */
export interface FrontendEndpointProperties extends FrontendEndpointUpdateParameters {
  /** Resource status. */
  readonly resourceState?: FrontDoorResourceState;
  /** Provisioning status of Custom Https of the frontendEndpoint. */
  readonly customHttpsProvisioningState?: CustomHttpsProvisioningState;
  /** Provisioning substate shows the progress of custom HTTPS enabling/disabling process step by step. */
  readonly customHttpsProvisioningSubstate?: CustomHttpsProvisioningSubstate;
  /** The configuration specifying how to enable HTTPS */
  readonly customHttpsConfiguration?: CustomHttpsConfiguration;
}

export function frontendEndpointPropertiesSerializer(item: FrontendEndpointProperties): any {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function frontendEndpointPropertiesDeserializer(item: any): FrontendEndpointProperties {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
    resourceState: item["resourceState"],
    customHttpsProvisioningState: item["customHttpsProvisioningState"],
    customHttpsProvisioningSubstate: item["customHttpsProvisioningSubstate"],
    customHttpsConfiguration: !item["customHttpsConfiguration"]
      ? item["customHttpsConfiguration"]
      : customHttpsConfigurationDeserializer(item["customHttpsConfiguration"]),
  };
}

/** Provisioning status of Custom Https of the frontendEndpoint. */
export enum KnownCustomHttpsProvisioningState {
  /** Enabling */
  Enabling = "Enabling",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning status of Custom Https of the frontendEndpoint. \
 * {@link KnownCustomHttpsProvisioningState} can be used interchangeably with CustomHttpsProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabling**: Enabling \
 * **Enabled**: Enabled \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled \
 * **Failed**: Failed
 */
export type CustomHttpsProvisioningState = string;

/** Provisioning substate shows the progress of custom HTTPS enabling/disabling process step by step. */
export enum KnownCustomHttpsProvisioningSubstate {
  /** SubmittingDomainControlValidationRequest */
  SubmittingDomainControlValidationRequest = "SubmittingDomainControlValidationRequest",
  /** PendingDomainControlValidationREquestApproval */
  PendingDomainControlValidationREquestApproval = "PendingDomainControlValidationREquestApproval",
  /** DomainControlValidationRequestApproved */
  DomainControlValidationRequestApproved = "DomainControlValidationRequestApproved",
  /** DomainControlValidationRequestRejected */
  DomainControlValidationRequestRejected = "DomainControlValidationRequestRejected",
  /** DomainControlValidationRequestTimedOut */
  DomainControlValidationRequestTimedOut = "DomainControlValidationRequestTimedOut",
  /** IssuingCertificate */
  IssuingCertificate = "IssuingCertificate",
  /** DeployingCertificate */
  DeployingCertificate = "DeployingCertificate",
  /** CertificateDeployed */
  CertificateDeployed = "CertificateDeployed",
  /** DeletingCertificate */
  DeletingCertificate = "DeletingCertificate",
  /** CertificateDeleted */
  CertificateDeleted = "CertificateDeleted",
}

/**
 * Provisioning substate shows the progress of custom HTTPS enabling/disabling process step by step. \
 * {@link KnownCustomHttpsProvisioningSubstate} can be used interchangeably with CustomHttpsProvisioningSubstate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SubmittingDomainControlValidationRequest**: SubmittingDomainControlValidationRequest \
 * **PendingDomainControlValidationREquestApproval**: PendingDomainControlValidationREquestApproval \
 * **DomainControlValidationRequestApproved**: DomainControlValidationRequestApproved \
 * **DomainControlValidationRequestRejected**: DomainControlValidationRequestRejected \
 * **DomainControlValidationRequestTimedOut**: DomainControlValidationRequestTimedOut \
 * **IssuingCertificate**: IssuingCertificate \
 * **DeployingCertificate**: DeployingCertificate \
 * **CertificateDeployed**: CertificateDeployed \
 * **DeletingCertificate**: DeletingCertificate \
 * **CertificateDeleted**: CertificateDeleted
 */
export type CustomHttpsProvisioningSubstate = string;

/** Https settings for a domain */
export interface CustomHttpsConfiguration {
  /** Defines the source of the SSL certificate */
  certificateSource: FrontDoorCertificateSource;
  /** Defines the TLS extension protocol that is used for secure delivery */
  protocolType: FrontDoorTlsProtocolType;
  /** The minimum TLS version required from the clients to establish an SSL handshake with Front Door. */
  minimumTlsVersion: MinimumTLSVersion;
  /** The Key Vault containing the SSL certificate */
  vault?: KeyVaultCertificateSourceParametersVault;
  /** The name of the Key Vault secret representing the full certificate PFX */
  secretName?: string;
  /** The version of the Key Vault secret representing the full certificate PFX */
  secretVersion?: string;
  /** Defines the type of the certificate used for secure connections to a frontendEndpoint */
  certificateType?: FrontDoorCertificateType;
}

export function customHttpsConfigurationSerializer(item: CustomHttpsConfiguration): any {
  return {
    certificateSource: item["certificateSource"],
    protocolType: item["protocolType"],
    minimumTlsVersion: item["minimumTlsVersion"],
    keyVaultCertificateSourceParameters: areAllPropsUndefined(item, [
      "vault",
      "secretName",
      "secretVersion",
    ])
      ? undefined
      : _customHttpsConfigurationKeyVaultCertificateSourceParametersSerializer(item),
    frontDoorCertificateSourceParameters: areAllPropsUndefined(item, ["certificateType"])
      ? undefined
      : _customHttpsConfigurationFrontDoorCertificateSourceParametersSerializer(item),
  };
}

export function customHttpsConfigurationDeserializer(item: any): CustomHttpsConfiguration {
  return {
    certificateSource: item["certificateSource"],
    protocolType: item["protocolType"],
    minimumTlsVersion: item["minimumTlsVersion"],
    ...(!item["keyVaultCertificateSourceParameters"]
      ? item["keyVaultCertificateSourceParameters"]
      : _customHttpsConfigurationKeyVaultCertificateSourceParametersDeserializer(
          item["keyVaultCertificateSourceParameters"],
        )),
    ...(!item["frontDoorCertificateSourceParameters"]
      ? item["frontDoorCertificateSourceParameters"]
      : _customHttpsConfigurationFrontDoorCertificateSourceParametersDeserializer(
          item["frontDoorCertificateSourceParameters"],
        )),
  };
}

/** Defines the source of the SSL certificate */
export enum KnownFrontDoorCertificateSource {
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
  /** FrontDoor */
  FrontDoor = "FrontDoor",
}

/**
 * Defines the source of the SSL certificate \
 * {@link KnownFrontDoorCertificateSource} can be used interchangeably with FrontDoorCertificateSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureKeyVault**: AzureKeyVault \
 * **FrontDoor**: FrontDoor
 */
export type FrontDoorCertificateSource = string;

/** Defines the TLS extension protocol that is used for secure delivery */
export enum KnownFrontDoorTlsProtocolType {
  /** ServerNameIndication */
  ServerNameIndication = "ServerNameIndication",
}

/**
 * Defines the TLS extension protocol that is used for secure delivery \
 * {@link KnownFrontDoorTlsProtocolType} can be used interchangeably with FrontDoorTlsProtocolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerNameIndication**: ServerNameIndication
 */
export type FrontDoorTlsProtocolType = string;

/** The minimum TLS version required from the clients to establish an SSL handshake with Front Door. */
export enum KnownMinimumTLSVersion {
  /** 1.0 */
  One0 = "1.0",
  /** 1.2 */
  One2 = "1.2",
}

/**
 * The minimum TLS version required from the clients to establish an SSL handshake with Front Door. \
 * {@link KnownMinimumTLSVersion} can be used interchangeably with MinimumTLSVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0**: 1.0 \
 * **1.2**: 1.2
 */
export type MinimumTLSVersion = string;

/** Parameters required for bring-your-own-certification via Key Vault */
export interface KeyVaultCertificateSourceParameters {
  /** The Key Vault containing the SSL certificate */
  vault?: KeyVaultCertificateSourceParametersVault;
  /** The name of the Key Vault secret representing the full certificate PFX */
  secretName?: string;
  /** The version of the Key Vault secret representing the full certificate PFX */
  secretVersion?: string;
}

export function keyVaultCertificateSourceParametersSerializer(
  item: KeyVaultCertificateSourceParameters,
): any {
  return {
    vault: !item["vault"]
      ? item["vault"]
      : keyVaultCertificateSourceParametersVaultSerializer(item["vault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

export function keyVaultCertificateSourceParametersDeserializer(
  item: any,
): KeyVaultCertificateSourceParameters {
  return {
    vault: !item["vault"]
      ? item["vault"]
      : keyVaultCertificateSourceParametersVaultDeserializer(item["vault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

/** The Key Vault containing the SSL certificate */
export interface KeyVaultCertificateSourceParametersVault {
  /** Resource ID. */
  id?: string;
}

export function keyVaultCertificateSourceParametersVaultSerializer(
  item: KeyVaultCertificateSourceParametersVault,
): any {
  return { id: item["id"] };
}

export function keyVaultCertificateSourceParametersVaultDeserializer(
  item: any,
): KeyVaultCertificateSourceParametersVault {
  return {
    id: item["id"],
  };
}

/** Parameters required for enabling SSL with Front Door-managed certificates */
export interface FrontDoorCertificateSourceParameters {
  /** Defines the type of the certificate used for secure connections to a frontendEndpoint */
  certificateType?: FrontDoorCertificateType;
}

export function frontDoorCertificateSourceParametersSerializer(
  item: FrontDoorCertificateSourceParameters,
): any {
  return { certificateType: item["certificateType"] };
}

export function frontDoorCertificateSourceParametersDeserializer(
  item: any,
): FrontDoorCertificateSourceParameters {
  return {
    certificateType: item["certificateType"],
  };
}

/** Defines the type of the certificate used for secure connections to a frontendEndpoint */
export enum KnownFrontDoorCertificateType {
  /** Dedicated */
  Dedicated = "Dedicated",
}

/**
 * Defines the type of the certificate used for secure connections to a frontendEndpoint \
 * {@link KnownFrontDoorCertificateType} can be used interchangeably with FrontDoorCertificateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dedicated**: Dedicated
 */
export type FrontDoorCertificateType = string;

/** Settings that apply to all backend pools. */
export interface BackendPoolsSettings {
  /** Whether to enforce certificate name check on HTTPS requests to all backend pools. No effect on non-HTTPS requests. */
  enforceCertificateNameCheck?: EnforceCertificateNameCheckEnabledState;
  /** Send and receive timeout on forwarding request to the backend. When timeout is reached, the request fails and returns. */
  sendRecvTimeoutSeconds?: number;
}

export function backendPoolsSettingsSerializer(item: BackendPoolsSettings): any {
  return {
    enforceCertificateNameCheck: item["enforceCertificateNameCheck"],
    sendRecvTimeoutSeconds: item["sendRecvTimeoutSeconds"],
  };
}

export function backendPoolsSettingsDeserializer(item: any): BackendPoolsSettings {
  return {
    enforceCertificateNameCheck: item["enforceCertificateNameCheck"],
    sendRecvTimeoutSeconds: item["sendRecvTimeoutSeconds"],
  };
}

/** Whether to enforce certificate name check on HTTPS requests to all backend pools. No effect on non-HTTPS requests. */
export enum KnownEnforceCertificateNameCheckEnabledState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to enforce certificate name check on HTTPS requests to all backend pools. No effect on non-HTTPS requests. \
 * {@link KnownEnforceCertificateNameCheckEnabledState} can be used interchangeably with EnforceCertificateNameCheckEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type EnforceCertificateNameCheckEnabledState = string;

/** Operational status of the Front Door load balancer. Permitted values are 'Enabled' or 'Disabled' */
export enum KnownFrontDoorEnabledState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Operational status of the Front Door load balancer. Permitted values are 'Enabled' or 'Disabled' \
 * {@link KnownFrontDoorEnabledState} can be used interchangeably with FrontDoorEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type FrontDoorEnabledState = string;

/** Routing rules to apply to an endpoint */
export interface RoutingRuleUpdateParameters {
  /** Frontend endpoints associated with this rule */
  frontendEndpoints?: SubResource[];
  /** Protocol schemes to match for this rule */
  acceptedProtocols?: FrontDoorProtocol[];
  /** The route patterns of the rule. */
  patternsToMatch?: string[];
  /** Whether to enable use of this rule. Permitted values are 'Enabled' or 'Disabled' */
  enabledState?: RoutingRuleEnabledState;
  /** A reference to the routing configuration. */
  routeConfiguration?: RouteConfigurationUnion;
  /** A reference to a specific Rules Engine Configuration to apply to this route. */
  rulesEngine?: SubResource;
  /** Defines the Web Application Firewall policy for each routing rule (if applicable) */
  webApplicationFirewallPolicyLink?: RoutingRuleUpdateParametersWebApplicationFirewallPolicyLink;
}

export function routingRuleUpdateParametersSerializer(item: RoutingRuleUpdateParameters): any {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArraySerializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionSerializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceSerializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function routingRuleUpdateParametersDeserializer(item: any): RoutingRuleUpdateParameters {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArrayDeserializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionDeserializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceDeserializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

export function subResourceArrayDeserializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceDeserializer(item);
  });
}

/** Accepted protocol schemes. */
export enum KnownFrontDoorProtocol {
  /** Http */
  Http = "Http",
  /** Https */
  Https = "Https",
}

/**
 * Accepted protocol schemes. \
 * {@link KnownFrontDoorProtocol} can be used interchangeably with FrontDoorProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http**: Http \
 * **Https**: Https
 */
export type FrontDoorProtocol = string;

/** Whether to enable use of this rule. Permitted values are 'Enabled' or 'Disabled' */
export enum KnownRoutingRuleEnabledState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to enable use of this rule. Permitted values are 'Enabled' or 'Disabled' \
 * {@link KnownRoutingRuleEnabledState} can be used interchangeably with RoutingRuleEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type RoutingRuleEnabledState = string;

/** Defines the Web Application Firewall policy for each routing rule (if applicable) */
export interface RoutingRuleUpdateParametersWebApplicationFirewallPolicyLink {
  /** Resource ID. */
  id?: string;
}

export function routingRuleUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
  item: RoutingRuleUpdateParametersWebApplicationFirewallPolicyLink,
): any {
  return { id: item["id"] };
}

export function routingRuleUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
  item: any,
): RoutingRuleUpdateParametersWebApplicationFirewallPolicyLink {
  return {
    id: item["id"],
  };
}

/** Round-Robin load balancing settings for a backend pool */
export interface LoadBalancingSettingsUpdateParameters {
  /** The number of samples to consider for load balancing decisions */
  sampleSize?: number;
  /** The number of samples within the sample period that must succeed */
  successfulSamplesRequired?: number;
  /** The additional latency in milliseconds for probes to fall into the lowest latency bucket */
  additionalLatencyMilliseconds?: number;
}

export function loadBalancingSettingsUpdateParametersSerializer(
  item: LoadBalancingSettingsUpdateParameters,
): any {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
  };
}

export function loadBalancingSettingsUpdateParametersDeserializer(
  item: any,
): LoadBalancingSettingsUpdateParameters {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
  };
}

/** L7 health probe settings for a backend pool */
export interface HealthProbeSettingsUpdateParameters {
  /** The path to use for the health probe. Default is / */
  path?: string;
  /** Protocol scheme to use for this probe */
  protocol?: FrontDoorProtocol;
  /** The number of seconds between health probes. */
  intervalInSeconds?: number;
  /** Configures which HTTP method to use to probe the backends defined under backendPools. */
  healthProbeMethod?: FrontDoorHealthProbeMethod;
  /** Whether to enable health probes to be made against backends defined under backendPools. Health probes can only be disabled if there is a single enabled backend in single enabled backend pool. */
  enabledState?: HealthProbeEnabled;
}

export function healthProbeSettingsUpdateParametersSerializer(
  item: HealthProbeSettingsUpdateParameters,
): any {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
  };
}

export function healthProbeSettingsUpdateParametersDeserializer(
  item: any,
): HealthProbeSettingsUpdateParameters {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
  };
}

/** Configures which HTTP method to use to probe the backends defined under backendPools. */
export enum KnownFrontDoorHealthProbeMethod {
  /** GET */
  GET = "GET",
  /** HEAD */
  Head = "HEAD",
}

/**
 * Configures which HTTP method to use to probe the backends defined under backendPools. \
 * {@link KnownFrontDoorHealthProbeMethod} can be used interchangeably with FrontDoorHealthProbeMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GET**: GET \
 * **HEAD**: HEAD
 */
export type FrontDoorHealthProbeMethod = string;

/** Whether to enable health probes to be made against backends defined under backendPools. Health probes can only be disabled if there is a single enabled backend in single enabled backend pool. */
export enum KnownHealthProbeEnabled {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to enable health probes to be made against backends defined under backendPools. Health probes can only be disabled if there is a single enabled backend in single enabled backend pool. \
 * {@link KnownHealthProbeEnabled} can be used interchangeably with HealthProbeEnabled,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type HealthProbeEnabled = string;

/** A collection of backends that can be routed to. */
export interface BackendPoolUpdateParameters {
  /** The set of backends for this pool */
  backends?: Backend[];
  /** Load balancing settings for a backend pool */
  loadBalancingSettings?: SubResource;
  /** L7 health probe settings for a backend pool */
  healthProbeSettings?: SubResource;
}

export function backendPoolUpdateParametersSerializer(item: BackendPoolUpdateParameters): any {
  return {
    backends: !item["backends"] ? item["backends"] : backendArraySerializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceSerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceSerializer(item["healthProbeSettings"]),
  };
}

export function backendPoolUpdateParametersDeserializer(item: any): BackendPoolUpdateParameters {
  return {
    backends: !item["backends"] ? item["backends"] : backendArrayDeserializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceDeserializer(item["healthProbeSettings"]),
  };
}

export function backendArraySerializer(result: Array<Backend>): any[] {
  return result.map((item) => {
    return backendSerializer(item);
  });
}

export function backendArrayDeserializer(result: Array<Backend>): any[] {
  return result.map((item) => {
    return backendDeserializer(item);
  });
}

/** Backend address of a frontDoor load balancer. */
export interface Backend {
  /** Location of the backend (IP address or FQDN) */
  address?: string;
  /** The Alias of the Private Link resource. Populating this optional field indicates that this backend is 'Private' */
  privateLinkAlias?: string;
  /** The Resource Id of the Private Link resource. Populating this optional field indicates that this backend is 'Private' */
  privateLinkResourceId?: string;
  /** The location of the Private Link resource. Required only if 'privateLinkResourceId' is populated */
  privateLinkLocation?: string;
  /** The Approval status for the connection to the Private Link */
  readonly privateEndpointStatus?: PrivateEndpointStatus;
  /** A custom message to be included in the approval request to connect to the Private Link */
  privateLinkApprovalMessage?: string;
  /** The HTTP TCP port number. Must be between 1 and 65535. */
  httpPort?: number;
  /** The HTTPS TCP port number. Must be between 1 and 65535. */
  httpsPort?: number;
  /** Whether to enable use of this backend. Permitted values are 'Enabled' or 'Disabled' */
  enabledState?: BackendEnabledState;
  /** Priority to use for load balancing. Higher priorities will not be used for load balancing if any lower priority backend is healthy. */
  priority?: number;
  /** Weight of this endpoint for load balancing purposes. */
  weight?: number;
  /** The value to use as the host header sent to the backend. If blank or unspecified, this defaults to the incoming host. */
  backendHostHeader?: string;
}

export function backendSerializer(item: Backend): any {
  return {
    address: item["address"],
    privateLinkAlias: item["privateLinkAlias"],
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkLocation: item["privateLinkLocation"],
    privateLinkApprovalMessage: item["privateLinkApprovalMessage"],
    httpPort: item["httpPort"],
    httpsPort: item["httpsPort"],
    enabledState: item["enabledState"],
    priority: item["priority"],
    weight: item["weight"],
    backendHostHeader: item["backendHostHeader"],
  };
}

export function backendDeserializer(item: any): Backend {
  return {
    address: item["address"],
    privateLinkAlias: item["privateLinkAlias"],
    privateLinkResourceId: item["privateLinkResourceId"],
    privateLinkLocation: item["privateLinkLocation"],
    privateEndpointStatus: item["privateEndpointStatus"],
    privateLinkApprovalMessage: item["privateLinkApprovalMessage"],
    httpPort: item["httpPort"],
    httpsPort: item["httpsPort"],
    enabledState: item["enabledState"],
    priority: item["priority"],
    weight: item["weight"],
    backendHostHeader: item["backendHostHeader"],
  };
}

/** The Approval status for the connection to the Private Link */
export enum KnownPrivateEndpointStatus {
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
 * The Approval status for the connection to the Private Link \
 * {@link KnownPrivateEndpointStatus} can be used interchangeably with PrivateEndpointStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected \
 * **Timeout**: Timeout
 */
export type PrivateEndpointStatus = string;

/** Whether to enable use of this backend. Permitted values are 'Enabled' or 'Disabled' */
export enum KnownBackendEnabledState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to enable use of this backend. Permitted values are 'Enabled' or 'Disabled' \
 * {@link KnownBackendEnabledState} can be used interchangeably with BackendEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type BackendEnabledState = string;

/** Frontend endpoint used in routing rule */
export interface FrontendEndpointUpdateParameters {
  /** The host name of the frontendEndpoint. Must be a domain name. */
  hostName?: string;
  /** Whether to allow session affinity on this host. Valid options are 'Enabled' or 'Disabled' */
  sessionAffinityEnabledState?: SessionAffinityEnabledState;
  /** UNUSED. This field will be ignored. The TTL to use in seconds for session affinity, if applicable. */
  sessionAffinityTtlSeconds?: number;
  /** Defines the Web Application Firewall policy for each host (if applicable) */
  webApplicationFirewallPolicyLink?: FrontendEndpointUpdateParametersWebApplicationFirewallPolicyLink;
}

export function frontendEndpointUpdateParametersSerializer(
  item: FrontendEndpointUpdateParameters,
): any {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function frontendEndpointUpdateParametersDeserializer(
  item: any,
): FrontendEndpointUpdateParameters {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

/** Whether to allow session affinity on this host. Valid options are 'Enabled' or 'Disabled' */
export enum KnownSessionAffinityEnabledState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether to allow session affinity on this host. Valid options are 'Enabled' or 'Disabled' \
 * {@link KnownSessionAffinityEnabledState} can be used interchangeably with SessionAffinityEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SessionAffinityEnabledState = string;

/** Defines the Web Application Firewall policy for each host (if applicable) */
export interface FrontendEndpointUpdateParametersWebApplicationFirewallPolicyLink {
  /** Resource ID. */
  id?: string;
}

export function frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
  item: FrontendEndpointUpdateParametersWebApplicationFirewallPolicyLink,
): any {
  return { id: item["id"] };
}

export function frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
  item: any,
): FrontendEndpointUpdateParametersWebApplicationFirewallPolicyLink {
  return {
    id: item["id"],
  };
}

/** Common resource representation. */
export interface BasicResourceWithSettableIDName {
  /** Resource ID. */
  id?: string;
  /** Resource name. */
  name?: string;
  /** Resource type. */
  readonly type?: string;
}

export function basicResourceWithSettableIDNameSerializer(
  item: BasicResourceWithSettableIDName,
): any {
  return { id: item["id"], name: item["name"] };
}

export function basicResourceWithSettableIDNameDeserializer(
  item: any,
): BasicResourceWithSettableIDName {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Common resource representation. */
export interface Resource {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourceSerializer(item: Resource): any {
  return { location: item["location"], tags: item["tags"] };
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Error response indicates Front Door service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponse {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Paged collection of FrontDoor items */
export interface _FrontDoorListResult {
  /** The FrontDoor items on this page */
  readonly value: FrontDoor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _frontDoorListResultDeserializer(item: any): _FrontDoorListResult {
  return {
    value: frontDoorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function frontDoorArraySerializer(result: Array<FrontDoor>): any[] {
  return result.map((item) => {
    return frontDoorSerializer(item);
  });
}

export function frontDoorArrayDeserializer(result: Array<FrontDoor>): any[] {
  return result.map((item) => {
    return frontDoorDeserializer(item);
  });
}

/** Input of the custom domain to be validated for DNS mapping. */
export interface ValidateCustomDomainInput {
  /** The host name of the custom domain. Must be a domain name. */
  hostName: string;
}

export function validateCustomDomainInputSerializer(item: ValidateCustomDomainInput): any {
  return { hostName: item["hostName"] };
}

/** Output of custom domain validation. */
export interface ValidateCustomDomainOutput {
  /** Indicates whether the custom domain is valid or not. */
  readonly customDomainValidated?: boolean;
  /** The reason why the custom domain is not valid. */
  readonly reason?: string;
  /** Error message describing why the custom domain is not valid. */
  readonly message?: string;
}

export function validateCustomDomainOutputDeserializer(item: any): ValidateCustomDomainOutput {
  return {
    customDomainValidated: item["customDomainValidated"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Paged collection of FrontendEndpoint items */
export interface _FrontendEndpointsListResult {
  /** The FrontendEndpoint items on this page */
  readonly value: FrontendEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _frontendEndpointsListResultDeserializer(item: any): _FrontendEndpointsListResult {
  return {
    value: frontendEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of RulesEngine items */
export interface _RulesEngineListResult {
  /** The RulesEngine items on this page */
  readonly value: RulesEngine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _rulesEngineListResultDeserializer(item: any): _RulesEngineListResult {
  return {
    value: rulesEngineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Defines the properties of an Experiment */
export interface Experiment extends Resource {
  /** The description of the details or intents of the Experiment */
  description?: string;
  /** The endpoint A of an experiment */
  endpointA?: Endpoint;
  /** The endpoint B of an experiment */
  endpointB?: Endpoint;
  /** The state of the Experiment */
  enabledState?: State;
  /** Resource status. */
  readonly resourceState?: NetworkExperimentResourceState;
  /** The description of Experiment status from the server side */
  readonly status?: string;
  /** The uri to the Script used in the Experiment */
  readonly scriptFileUri?: string;
}

export function experimentSerializer(item: Experiment): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "endpointA",
      "endpointB",
      "enabledState",
    ])
      ? undefined
      : _experimentPropertiesSerializer(item),
  };
}

export function experimentDeserializer(item: any): Experiment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _experimentPropertiesDeserializer(item["properties"])),
  };
}

/** Defines the properties of an experiment */
export interface ExperimentProperties {
  /** The description of the details or intents of the Experiment */
  description?: string;
  /** The endpoint A of an experiment */
  endpointA?: Endpoint;
  /** The endpoint B of an experiment */
  endpointB?: Endpoint;
  /** The state of the Experiment */
  enabledState?: State;
  /** Resource status. */
  readonly resourceState?: NetworkExperimentResourceState;
  /** The description of Experiment status from the server side */
  readonly status?: string;
  /** The uri to the Script used in the Experiment */
  readonly scriptFileUri?: string;
}

export function experimentPropertiesSerializer(item: ExperimentProperties): any {
  return {
    description: item["description"],
    endpointA: !item["endpointA"] ? item["endpointA"] : endpointSerializer(item["endpointA"]),
    endpointB: !item["endpointB"] ? item["endpointB"] : endpointSerializer(item["endpointB"]),
    enabledState: item["enabledState"],
  };
}

export function experimentPropertiesDeserializer(item: any): ExperimentProperties {
  return {
    description: item["description"],
    endpointA: !item["endpointA"] ? item["endpointA"] : endpointDeserializer(item["endpointA"]),
    endpointB: !item["endpointB"] ? item["endpointB"] : endpointDeserializer(item["endpointB"]),
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
    status: item["status"],
    scriptFileUri: item["scriptFileUri"],
  };
}

/** Defines the endpoint properties */
export interface Endpoint {
  /** The name of the endpoint */
  name?: string;
  /** The endpoint URL */
  endpoint?: string;
}

export function endpointSerializer(item: Endpoint): any {
  return { name: item["name"], endpoint: item["endpoint"] };
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    name: item["name"],
    endpoint: item["endpoint"],
  };
}

/** The state of the Experiment */
export enum KnownState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of the Experiment \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type State = string;

/** Defines the server side resource status */
export enum KnownNetworkExperimentResourceState {
  /** Creating */
  Creating = "Creating",
  /** Enabling */
  Enabling = "Enabling",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Defines the server side resource status \
 * {@link KnownNetworkExperimentResourceState} can be used interchangeably with NetworkExperimentResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Enabling**: Enabling \
 * **Enabled**: Enabled \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled \
 * **Deleting**: Deleting
 */
export type NetworkExperimentResourceState = string;

/** Defines modifiable attributes of an Experiment */
export interface ExperimentUpdateModel {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The description of the intent or details of the Experiment */
  description?: string;
  /** The state of the Experiment */
  enabledState?: State;
}

export function experimentUpdateModelSerializer(item: ExperimentUpdateModel): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["description", "enabledState"])
      ? undefined
      : _experimentUpdateModelPropertiesSerializer(item),
  };
}

/** Defines the properties of an experiment */
export interface ExperimentUpdateProperties {
  /** The description of the intent or details of the Experiment */
  description?: string;
  /** The state of the Experiment */
  enabledState?: State;
}

export function experimentUpdatePropertiesSerializer(item: ExperimentUpdateProperties): any {
  return { description: item["description"], enabledState: item["enabledState"] };
}

/** Defines a list of Experiments. It contains a list of Experiment objects and a URL link to get the next set of results. */
export interface _ExperimentList {
  /** The Experiment items on this page */
  readonly value: Experiment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _experimentListDeserializer(item: any): _ExperimentList {
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

/** Defines web application firewall policy. */
export interface WebApplicationFirewallPolicy extends Resource {
  /** Gets a unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** The pricing tier of web application firewall policy. Defaults to Classic_AzureFrontDoor if not specified. */
  sku?: Sku;
  /** Describes settings for the policy. */
  policySettings?: PolicySettings;
  /** Describes custom rules inside the policy. */
  customRules?: CustomRuleList;
  /** Describes managed rules inside the policy. */
  managedRules?: ManagedRuleSetList;
  /** Describes Frontend Endpoints associated with this Web Application Firewall policy. */
  readonly frontendEndpointLinks?: FrontendEndpointLink[];
  /** Describes Routing Rules associated with this Web Application Firewall policy. */
  readonly routingRuleLinks?: RoutingRuleLink[];
  /** Describes Security Policy associated with this Web Application Firewall policy. */
  readonly securityPolicyLinks?: SecurityPolicyLink[];
  /** Provisioning state of the policy. */
  readonly provisioningState?: string;
  /** Resource status of the policy. */
  readonly resourceState?: PolicyResourceState;
}

export function webApplicationFirewallPolicySerializer(item: WebApplicationFirewallPolicy): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["policySettings", "customRules", "managedRules"])
      ? undefined
      : _webApplicationFirewallPolicyPropertiesSerializer(item),
    etag: item["etag"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function webApplicationFirewallPolicyDeserializer(item: any): WebApplicationFirewallPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _webApplicationFirewallPolicyPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Defines web application firewall policy properties. */
export interface WebApplicationFirewallPolicyProperties {
  /** Describes settings for the policy. */
  policySettings?: PolicySettings;
  /** Describes custom rules inside the policy. */
  customRules?: CustomRuleList;
  /** Describes managed rules inside the policy. */
  managedRules?: ManagedRuleSetList;
  /** Describes Frontend Endpoints associated with this Web Application Firewall policy. */
  readonly frontendEndpointLinks?: FrontendEndpointLink[];
  /** Describes Routing Rules associated with this Web Application Firewall policy. */
  readonly routingRuleLinks?: RoutingRuleLink[];
  /** Describes Security Policy associated with this Web Application Firewall policy. */
  readonly securityPolicyLinks?: SecurityPolicyLink[];
  /** Provisioning state of the policy. */
  readonly provisioningState?: string;
  /** Resource status of the policy. */
  readonly resourceState?: PolicyResourceState;
}

export function webApplicationFirewallPolicyPropertiesSerializer(
  item: WebApplicationFirewallPolicyProperties,
): any {
  return {
    policySettings: !item["policySettings"]
      ? item["policySettings"]
      : policySettingsSerializer(item["policySettings"]),
    customRules: !item["customRules"]
      ? item["customRules"]
      : customRuleListSerializer(item["customRules"]),
    managedRules: !item["managedRules"]
      ? item["managedRules"]
      : managedRuleSetListSerializer(item["managedRules"]),
  };
}

export function webApplicationFirewallPolicyPropertiesDeserializer(
  item: any,
): WebApplicationFirewallPolicyProperties {
  return {
    policySettings: !item["policySettings"]
      ? item["policySettings"]
      : policySettingsDeserializer(item["policySettings"]),
    customRules: !item["customRules"]
      ? item["customRules"]
      : customRuleListDeserializer(item["customRules"]),
    managedRules: !item["managedRules"]
      ? item["managedRules"]
      : managedRuleSetListDeserializer(item["managedRules"]),
    frontendEndpointLinks: !item["frontendEndpointLinks"]
      ? item["frontendEndpointLinks"]
      : frontendEndpointLinkArrayDeserializer(item["frontendEndpointLinks"]),
    routingRuleLinks: !item["routingRuleLinks"]
      ? item["routingRuleLinks"]
      : routingRuleLinkArrayDeserializer(item["routingRuleLinks"]),
    securityPolicyLinks: !item["securityPolicyLinks"]
      ? item["securityPolicyLinks"]
      : securityPolicyLinkArrayDeserializer(item["securityPolicyLinks"]),
    provisioningState: item["provisioningState"],
    resourceState: item["resourceState"],
  };
}

/** Defines top-level WebApplicationFirewallPolicy configuration settings. */
export interface PolicySettings {
  /** Describes if the policy is in enabled or disabled state. Defaults to Enabled if not specified. */
  enabledState?: PolicyEnabledState;
  /** Describes if it is in detection mode or prevention mode at policy level. */
  mode?: PolicyMode;
  /** If action type is redirect, this field represents redirect URL for the client. */
  redirectUrl?: string;
  /** If the action type is block, customer can override the response status code. */
  customBlockResponseStatusCode?: number;
  /** If the action type is block, customer can override the response body. The body must be specified in base64 encoding. */
  customBlockResponseBody?: string;
  /** Describes if policy managed rules will inspect the request body content. */
  requestBodyCheck?: PolicyRequestBodyCheck;
  /** Defines the JavaScript challenge cookie validity lifetime in minutes. This setting is only applicable to Premium_AzureFrontDoor. Value must be an integer between 5 and 1440 with the default value being 30. */
  javascriptChallengeExpirationInMinutes?: number;
  /** Defines the Captcha cookie validity lifetime in minutes. This setting is only applicable to Premium_AzureFrontDoor. Value must be an integer between 5 and 1440 with the default value being 30. */
  captchaExpirationInMinutes?: number;
  /** State of the log scrubbing config. Default value is Enabled. */
  state?: WebApplicationFirewallScrubbingState;
  /** List of log scrubbing rules applied to the Web Application Firewall logs. */
  scrubbingRules?: WebApplicationFirewallScrubbingRules[];
}

export function policySettingsSerializer(item: PolicySettings): any {
  return {
    enabledState: item["enabledState"],
    mode: item["mode"],
    redirectUrl: item["redirectUrl"],
    customBlockResponseStatusCode: item["customBlockResponseStatusCode"],
    customBlockResponseBody: item["customBlockResponseBody"],
    requestBodyCheck: item["requestBodyCheck"],
    javascriptChallengeExpirationInMinutes: item["javascriptChallengeExpirationInMinutes"],
    captchaExpirationInMinutes: item["captchaExpirationInMinutes"],
    logScrubbing: areAllPropsUndefined(item, ["state", "scrubbingRules"])
      ? undefined
      : _policySettingsLogScrubbingSerializer(item),
  };
}

export function policySettingsDeserializer(item: any): PolicySettings {
  return {
    enabledState: item["enabledState"],
    mode: item["mode"],
    redirectUrl: item["redirectUrl"],
    customBlockResponseStatusCode: item["customBlockResponseStatusCode"],
    customBlockResponseBody: item["customBlockResponseBody"],
    requestBodyCheck: item["requestBodyCheck"],
    javascriptChallengeExpirationInMinutes: item["javascriptChallengeExpirationInMinutes"],
    captchaExpirationInMinutes: item["captchaExpirationInMinutes"],
    ...(!item["logScrubbing"]
      ? item["logScrubbing"]
      : _policySettingsLogScrubbingDeserializer(item["logScrubbing"])),
  };
}

/** Describes if the policy is in enabled or disabled state. Defaults to Enabled if not specified. */
export enum KnownPolicyEnabledState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Describes if the policy is in enabled or disabled state. Defaults to Enabled if not specified. \
 * {@link KnownPolicyEnabledState} can be used interchangeably with PolicyEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type PolicyEnabledState = string;

/** Describes if it is in detection mode or prevention mode at policy level. */
export enum KnownPolicyMode {
  /** Prevention */
  Prevention = "Prevention",
  /** Detection */
  Detection = "Detection",
}

/**
 * Describes if it is in detection mode or prevention mode at policy level. \
 * {@link KnownPolicyMode} can be used interchangeably with PolicyMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Prevention**: Prevention \
 * **Detection**: Detection
 */
export type PolicyMode = string;

/** Describes if policy managed rules will inspect the request body content. */
export enum KnownPolicyRequestBodyCheck {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Describes if policy managed rules will inspect the request body content. \
 * {@link KnownPolicyRequestBodyCheck} can be used interchangeably with PolicyRequestBodyCheck,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type PolicyRequestBodyCheck = string;

/** Defines rules that scrub sensitive fields in the Web Application Firewall logs. */
export interface PolicySettingsLogScrubbing {
  /** State of the log scrubbing config. Default value is Enabled. */
  state?: WebApplicationFirewallScrubbingState;
  /** List of log scrubbing rules applied to the Web Application Firewall logs. */
  scrubbingRules?: WebApplicationFirewallScrubbingRules[];
}

export function policySettingsLogScrubbingSerializer(item: PolicySettingsLogScrubbing): any {
  return {
    state: item["state"],
    scrubbingRules: !item["scrubbingRules"]
      ? item["scrubbingRules"]
      : webApplicationFirewallScrubbingRulesArraySerializer(item["scrubbingRules"]),
  };
}

export function policySettingsLogScrubbingDeserializer(item: any): PolicySettingsLogScrubbing {
  return {
    state: item["state"],
    scrubbingRules: !item["scrubbingRules"]
      ? item["scrubbingRules"]
      : webApplicationFirewallScrubbingRulesArrayDeserializer(item["scrubbingRules"]),
  };
}

/** State of the log scrubbing config. Default value is Enabled. */
export enum KnownWebApplicationFirewallScrubbingState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * State of the log scrubbing config. Default value is Enabled. \
 * {@link KnownWebApplicationFirewallScrubbingState} can be used interchangeably with WebApplicationFirewallScrubbingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type WebApplicationFirewallScrubbingState = string;

export function webApplicationFirewallScrubbingRulesArraySerializer(
  result: Array<WebApplicationFirewallScrubbingRules>,
): any[] {
  return result.map((item) => {
    return webApplicationFirewallScrubbingRulesSerializer(item);
  });
}

export function webApplicationFirewallScrubbingRulesArrayDeserializer(
  result: Array<WebApplicationFirewallScrubbingRules>,
): any[] {
  return result.map((item) => {
    return webApplicationFirewallScrubbingRulesDeserializer(item);
  });
}

/** Defines the contents of the log scrubbing rules. */
export interface WebApplicationFirewallScrubbingRules {
  /** The variable to be scrubbed from the logs. */
  matchVariable: ScrubbingRuleEntryMatchVariable;
  /** When matchVariable is a collection, operate on the selector to specify which elements in the collection this rule applies to. */
  selectorMatchOperator: ScrubbingRuleEntryMatchOperator;
  /** When matchVariable is a collection, operator used to specify which elements in the collection this rule applies to. */
  selector?: string;
  /** Defines the state of a log scrubbing rule. Default value is enabled. */
  state?: ScrubbingRuleEntryState;
}

export function webApplicationFirewallScrubbingRulesSerializer(
  item: WebApplicationFirewallScrubbingRules,
): any {
  return {
    matchVariable: item["matchVariable"],
    selectorMatchOperator: item["selectorMatchOperator"],
    selector: item["selector"],
    state: item["state"],
  };
}

export function webApplicationFirewallScrubbingRulesDeserializer(
  item: any,
): WebApplicationFirewallScrubbingRules {
  return {
    matchVariable: item["matchVariable"],
    selectorMatchOperator: item["selectorMatchOperator"],
    selector: item["selector"],
    state: item["state"],
  };
}

/** The variable to be scrubbed from the logs. */
export enum KnownScrubbingRuleEntryMatchVariable {
  /** RequestIPAddress */
  RequestIPAddress = "RequestIPAddress",
  /** RequestUri */
  RequestUri = "RequestUri",
  /** QueryStringArgNames */
  QueryStringArgNames = "QueryStringArgNames",
  /** RequestHeaderNames */
  RequestHeaderNames = "RequestHeaderNames",
  /** RequestCookieNames */
  RequestCookieNames = "RequestCookieNames",
  /** RequestBodyPostArgNames */
  RequestBodyPostArgNames = "RequestBodyPostArgNames",
  /** RequestBodyJsonArgNames */
  RequestBodyJsonArgNames = "RequestBodyJsonArgNames",
}

/**
 * The variable to be scrubbed from the logs. \
 * {@link KnownScrubbingRuleEntryMatchVariable} can be used interchangeably with ScrubbingRuleEntryMatchVariable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RequestIPAddress**: RequestIPAddress \
 * **RequestUri**: RequestUri \
 * **QueryStringArgNames**: QueryStringArgNames \
 * **RequestHeaderNames**: RequestHeaderNames \
 * **RequestCookieNames**: RequestCookieNames \
 * **RequestBodyPostArgNames**: RequestBodyPostArgNames \
 * **RequestBodyJsonArgNames**: RequestBodyJsonArgNames
 */
export type ScrubbingRuleEntryMatchVariable = string;

/** When matchVariable is a collection, operate on the selector to specify which elements in the collection this rule applies to. */
export enum KnownScrubbingRuleEntryMatchOperator {
  /** EqualsAny */
  EqualsAny = "EqualsAny",
  /** Equals */
  Equals = "Equals",
}

/**
 * When matchVariable is a collection, operate on the selector to specify which elements in the collection this rule applies to. \
 * {@link KnownScrubbingRuleEntryMatchOperator} can be used interchangeably with ScrubbingRuleEntryMatchOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EqualsAny**: EqualsAny \
 * **Equals**: Equals
 */
export type ScrubbingRuleEntryMatchOperator = string;

/** Defines the state of a log scrubbing rule. Default value is enabled. */
export enum KnownScrubbingRuleEntryState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Defines the state of a log scrubbing rule. Default value is enabled. \
 * {@link KnownScrubbingRuleEntryState} can be used interchangeably with ScrubbingRuleEntryState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ScrubbingRuleEntryState = string;

/** Defines contents of custom rules */
export interface CustomRuleList {
  /** List of rules */
  rules?: CustomRule[];
}

export function customRuleListSerializer(item: CustomRuleList): any {
  return { rules: !item["rules"] ? item["rules"] : customRuleArraySerializer(item["rules"]) };
}

export function customRuleListDeserializer(item: any): CustomRuleList {
  return {
    rules: !item["rules"] ? item["rules"] : customRuleArrayDeserializer(item["rules"]),
  };
}

export function customRuleArraySerializer(result: Array<CustomRule>): any[] {
  return result.map((item) => {
    return customRuleSerializer(item);
  });
}

export function customRuleArrayDeserializer(result: Array<CustomRule>): any[] {
  return result.map((item) => {
    return customRuleDeserializer(item);
  });
}

/** Defines contents of a web application rule */
export interface CustomRule {
  /** Describes the name of the rule. */
  name?: string;
  /** Describes priority of the rule. Rules with a lower value will be evaluated before rules with a higher value. */
  priority: number;
  /** Describes if the custom rule is in enabled or disabled state. Defaults to Enabled if not specified. */
  enabledState?: CustomRuleEnabledState;
  /** Describes type of rule. */
  ruleType: RuleType;
  /** Time window for resetting the rate limit count. Default is 1 minute. */
  rateLimitDurationInMinutes?: number;
  /** Number of allowed requests per client within the time window. */
  rateLimitThreshold?: number;
  /** Describes the list of variables to group the rate limit requests */
  groupBy?: GroupByVariable[];
  /** List of match conditions. */
  matchConditions: MatchCondition[];
  /** Describes what action to be applied when rule matches. */
  action: ActionType;
}

export function customRuleSerializer(item: CustomRule): any {
  return {
    name: item["name"],
    priority: item["priority"],
    enabledState: item["enabledState"],
    ruleType: item["ruleType"],
    rateLimitDurationInMinutes: item["rateLimitDurationInMinutes"],
    rateLimitThreshold: item["rateLimitThreshold"],
    groupBy: !item["groupBy"] ? item["groupBy"] : groupByVariableArraySerializer(item["groupBy"]),
    matchConditions: matchConditionArraySerializer(item["matchConditions"]),
    action: item["action"],
  };
}

export function customRuleDeserializer(item: any): CustomRule {
  return {
    name: item["name"],
    priority: item["priority"],
    enabledState: item["enabledState"],
    ruleType: item["ruleType"],
    rateLimitDurationInMinutes: item["rateLimitDurationInMinutes"],
    rateLimitThreshold: item["rateLimitThreshold"],
    groupBy: !item["groupBy"] ? item["groupBy"] : groupByVariableArrayDeserializer(item["groupBy"]),
    matchConditions: matchConditionArrayDeserializer(item["matchConditions"]),
    action: item["action"],
  };
}

/** Describes if the custom rule is in enabled or disabled state. Defaults to Enabled if not specified. */
export enum KnownCustomRuleEnabledState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Describes if the custom rule is in enabled or disabled state. Defaults to Enabled if not specified. \
 * {@link KnownCustomRuleEnabledState} can be used interchangeably with CustomRuleEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type CustomRuleEnabledState = string;

/** Describes type of rule. */
export enum KnownRuleType {
  /** MatchRule */
  MatchRule = "MatchRule",
  /** RateLimitRule */
  RateLimitRule = "RateLimitRule",
}

/**
 * Describes type of rule. \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MatchRule**: MatchRule \
 * **RateLimitRule**: RateLimitRule
 */
export type RuleType = string;

export function groupByVariableArraySerializer(result: Array<GroupByVariable>): any[] {
  return result.map((item) => {
    return groupByVariableSerializer(item);
  });
}

export function groupByVariableArrayDeserializer(result: Array<GroupByVariable>): any[] {
  return result.map((item) => {
    return groupByVariableDeserializer(item);
  });
}

/** Describes the variables available to group the rate limit requests */
export interface GroupByVariable {
  /** Describes the supported variable for group by */
  variableName: VariableName;
}

export function groupByVariableSerializer(item: GroupByVariable): any {
  return { variableName: item["variableName"] };
}

export function groupByVariableDeserializer(item: any): GroupByVariable {
  return {
    variableName: item["variableName"],
  };
}

/** Describes the supported variable for group by */
export enum KnownVariableName {
  /** SocketAddr */
  SocketAddr = "SocketAddr",
  /** GeoLocation */
  GeoLocation = "GeoLocation",
  /** None */
  None = "None",
}

/**
 * Describes the supported variable for group by \
 * {@link KnownVariableName} can be used interchangeably with VariableName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SocketAddr**: SocketAddr \
 * **GeoLocation**: GeoLocation \
 * **None**: None
 */
export type VariableName = string;

export function matchConditionArraySerializer(result: Array<MatchCondition>): any[] {
  return result.map((item) => {
    return matchConditionSerializer(item);
  });
}

export function matchConditionArrayDeserializer(result: Array<MatchCondition>): any[] {
  return result.map((item) => {
    return matchConditionDeserializer(item);
  });
}

/** Define a match condition. */
export interface MatchCondition {
  /** Request variable to compare with. */
  matchVariable: MatchVariable;
  /** Match against a specific key from the QueryString, PostArgs, RequestHeader or Cookies variables. Default is null. */
  selector?: string;
  /** Comparison type to use for matching with the variable value. */
  operator: Operator;
  /** Describes if the result of this condition should be negated. */
  negateCondition?: boolean;
  /** List of possible match values. */
  matchValue: string[];
  /** List of transforms. */
  transforms?: TransformType[];
}

export function matchConditionSerializer(item: MatchCondition): any {
  return {
    matchVariable: item["matchVariable"],
    selector: item["selector"],
    operator: item["operator"],
    negateCondition: item["negateCondition"],
    matchValue: item["matchValue"].map((p: any) => {
      return p;
    }),
    transforms: !item["transforms"]
      ? item["transforms"]
      : item["transforms"].map((p: any) => {
          return p;
        }),
  };
}

export function matchConditionDeserializer(item: any): MatchCondition {
  return {
    matchVariable: item["matchVariable"],
    selector: item["selector"],
    operator: item["operator"],
    negateCondition: item["negateCondition"],
    matchValue: item["matchValue"].map((p: any) => {
      return p;
    }),
    transforms: !item["transforms"]
      ? item["transforms"]
      : item["transforms"].map((p: any) => {
          return p;
        }),
  };
}

/** Request variable to compare with. */
export enum KnownMatchVariable {
  /** RemoteAddr */
  RemoteAddr = "RemoteAddr",
  /** RequestMethod */
  RequestMethod = "RequestMethod",
  /** QueryString */
  QueryString = "QueryString",
  /** PostArgs */
  PostArgs = "PostArgs",
  /** RequestUri */
  RequestUri = "RequestUri",
  /** RequestHeader */
  RequestHeader = "RequestHeader",
  /** RequestBody */
  RequestBody = "RequestBody",
  /** Cookies */
  Cookies = "Cookies",
  /** SocketAddr */
  SocketAddr = "SocketAddr",
}

/**
 * Request variable to compare with. \
 * {@link KnownMatchVariable} can be used interchangeably with MatchVariable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RemoteAddr**: RemoteAddr \
 * **RequestMethod**: RequestMethod \
 * **QueryString**: QueryString \
 * **PostArgs**: PostArgs \
 * **RequestUri**: RequestUri \
 * **RequestHeader**: RequestHeader \
 * **RequestBody**: RequestBody \
 * **Cookies**: Cookies \
 * **SocketAddr**: SocketAddr
 */
export type MatchVariable = string;

/** Comparison type to use for matching with the variable value. */
export enum KnownOperator {
  /** Any */
  Any = "Any",
  /** IPMatch */
  IPMatch = "IPMatch",
  /** GeoMatch */
  GeoMatch = "GeoMatch",
  /** Equal */
  Equal = "Equal",
  /** Contains */
  Contains = "Contains",
  /** LessThan */
  LessThan = "LessThan",
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** LessThanOrEqual */
  LessThanOrEqual = "LessThanOrEqual",
  /** GreaterThanOrEqual */
  GreaterThanOrEqual = "GreaterThanOrEqual",
  /** BeginsWith */
  BeginsWith = "BeginsWith",
  /** EndsWith */
  EndsWith = "EndsWith",
  /** RegEx */
  RegEx = "RegEx",
  /** ServiceTagMatch */
  ServiceTagMatch = "ServiceTagMatch",
}

/**
 * Comparison type to use for matching with the variable value. \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any**: Any \
 * **IPMatch**: IPMatch \
 * **GeoMatch**: GeoMatch \
 * **Equal**: Equal \
 * **Contains**: Contains \
 * **LessThan**: LessThan \
 * **GreaterThan**: GreaterThan \
 * **LessThanOrEqual**: LessThanOrEqual \
 * **GreaterThanOrEqual**: GreaterThanOrEqual \
 * **BeginsWith**: BeginsWith \
 * **EndsWith**: EndsWith \
 * **RegEx**: RegEx \
 * **ServiceTagMatch**: ServiceTagMatch
 */
export type Operator = string;

/** Describes what transforms applied before matching. */
export enum KnownTransformType {
  /** Lowercase */
  Lowercase = "Lowercase",
  /** Uppercase */
  Uppercase = "Uppercase",
  /** Trim */
  Trim = "Trim",
  /** UrlDecode */
  UrlDecode = "UrlDecode",
  /** UrlEncode */
  UrlEncode = "UrlEncode",
  /** RemoveNulls */
  RemoveNulls = "RemoveNulls",
}

/**
 * Describes what transforms applied before matching. \
 * {@link KnownTransformType} can be used interchangeably with TransformType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Lowercase**: Lowercase \
 * **Uppercase**: Uppercase \
 * **Trim**: Trim \
 * **UrlDecode**: UrlDecode \
 * **UrlEncode**: UrlEncode \
 * **RemoveNulls**: RemoveNulls
 */
export type TransformType = string;

/** Defines the action to take on rule match. */
export enum KnownActionType {
  /** Allow */
  Allow = "Allow",
  /** Block */
  Block = "Block",
  /** Log */
  Log = "Log",
  /** Redirect */
  Redirect = "Redirect",
  /** AnomalyScoring */
  AnomalyScoring = "AnomalyScoring",
  /** JSChallenge */
  JSChallenge = "JSChallenge",
  /** CAPTCHA */
  Captcha = "CAPTCHA",
}

/**
 * Defines the action to take on rule match. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow \
 * **Block**: Block \
 * **Log**: Log \
 * **Redirect**: Redirect \
 * **AnomalyScoring**: AnomalyScoring \
 * **JSChallenge**: JSChallenge \
 * **CAPTCHA**: CAPTCHA
 */
export type ActionType = string;

/** Defines the list of managed rule sets for the policy. */
export interface ManagedRuleSetList {
  /** List of rule sets. */
  managedRuleSets?: ManagedRuleSet[];
}

export function managedRuleSetListSerializer(item: ManagedRuleSetList): any {
  return {
    managedRuleSets: !item["managedRuleSets"]
      ? item["managedRuleSets"]
      : managedRuleSetArraySerializer(item["managedRuleSets"]),
  };
}

export function managedRuleSetListDeserializer(item: any): ManagedRuleSetList {
  return {
    managedRuleSets: !item["managedRuleSets"]
      ? item["managedRuleSets"]
      : managedRuleSetArrayDeserializer(item["managedRuleSets"]),
  };
}

export function managedRuleSetArraySerializer(result: Array<ManagedRuleSet>): any[] {
  return result.map((item) => {
    return managedRuleSetSerializer(item);
  });
}

export function managedRuleSetArrayDeserializer(result: Array<ManagedRuleSet>): any[] {
  return result.map((item) => {
    return managedRuleSetDeserializer(item);
  });
}

/** Defines a managed rule set. */
export interface ManagedRuleSet {
  /** Defines the rule set type to use. */
  ruleSetType: string;
  /** Defines the version of the rule set to use. */
  ruleSetVersion: string;
  /** Defines the rule set action. */
  ruleSetAction?: ManagedRuleSetActionType;
  /** Describes the exclusions that are applied to all rules in the set. */
  exclusions?: ManagedRuleExclusion[];
  /** Defines the rule group overrides to apply to the rule set. */
  ruleGroupOverrides?: ManagedRuleGroupOverride[];
}

export function managedRuleSetSerializer(item: ManagedRuleSet): any {
  return {
    ruleSetType: item["ruleSetType"],
    ruleSetVersion: item["ruleSetVersion"],
    ruleSetAction: item["ruleSetAction"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArraySerializer(item["exclusions"]),
    ruleGroupOverrides: !item["ruleGroupOverrides"]
      ? item["ruleGroupOverrides"]
      : managedRuleGroupOverrideArraySerializer(item["ruleGroupOverrides"]),
  };
}

export function managedRuleSetDeserializer(item: any): ManagedRuleSet {
  return {
    ruleSetType: item["ruleSetType"],
    ruleSetVersion: item["ruleSetVersion"],
    ruleSetAction: item["ruleSetAction"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArrayDeserializer(item["exclusions"]),
    ruleGroupOverrides: !item["ruleGroupOverrides"]
      ? item["ruleGroupOverrides"]
      : managedRuleGroupOverrideArrayDeserializer(item["ruleGroupOverrides"]),
  };
}

/** Defines the action to take when a managed rule set score threshold is met. */
export enum KnownManagedRuleSetActionType {
  /** Block */
  Block = "Block",
  /** Log */
  Log = "Log",
  /** Redirect */
  Redirect = "Redirect",
}

/**
 * Defines the action to take when a managed rule set score threshold is met. \
 * {@link KnownManagedRuleSetActionType} can be used interchangeably with ManagedRuleSetActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Block**: Block \
 * **Log**: Log \
 * **Redirect**: Redirect
 */
export type ManagedRuleSetActionType = string;

export function managedRuleExclusionArraySerializer(result: Array<ManagedRuleExclusion>): any[] {
  return result.map((item) => {
    return managedRuleExclusionSerializer(item);
  });
}

export function managedRuleExclusionArrayDeserializer(result: Array<ManagedRuleExclusion>): any[] {
  return result.map((item) => {
    return managedRuleExclusionDeserializer(item);
  });
}

/** Exclude variables from managed rule evaluation. */
export interface ManagedRuleExclusion {
  /** The variable type to be excluded. */
  matchVariable: ManagedRuleExclusionMatchVariable;
  /** Comparison operator to apply to the selector when specifying which elements in the collection this exclusion applies to. */
  selectorMatchOperator: ManagedRuleExclusionSelectorMatchOperator;
  /** Selector value for which elements in the collection this exclusion applies to. */
  selector: string;
}

export function managedRuleExclusionSerializer(item: ManagedRuleExclusion): any {
  return {
    matchVariable: item["matchVariable"],
    selectorMatchOperator: item["selectorMatchOperator"],
    selector: item["selector"],
  };
}

export function managedRuleExclusionDeserializer(item: any): ManagedRuleExclusion {
  return {
    matchVariable: item["matchVariable"],
    selectorMatchOperator: item["selectorMatchOperator"],
    selector: item["selector"],
  };
}

/** The variable type to be excluded. */
export enum KnownManagedRuleExclusionMatchVariable {
  /** RequestHeaderNames */
  RequestHeaderNames = "RequestHeaderNames",
  /** RequestCookieNames */
  RequestCookieNames = "RequestCookieNames",
  /** QueryStringArgNames */
  QueryStringArgNames = "QueryStringArgNames",
  /** RequestBodyPostArgNames */
  RequestBodyPostArgNames = "RequestBodyPostArgNames",
  /** RequestBodyJsonArgNames */
  RequestBodyJsonArgNames = "RequestBodyJsonArgNames",
}

/**
 * The variable type to be excluded. \
 * {@link KnownManagedRuleExclusionMatchVariable} can be used interchangeably with ManagedRuleExclusionMatchVariable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RequestHeaderNames**: RequestHeaderNames \
 * **RequestCookieNames**: RequestCookieNames \
 * **QueryStringArgNames**: QueryStringArgNames \
 * **RequestBodyPostArgNames**: RequestBodyPostArgNames \
 * **RequestBodyJsonArgNames**: RequestBodyJsonArgNames
 */
export type ManagedRuleExclusionMatchVariable = string;

/** Comparison operator to apply to the selector when specifying which elements in the collection this exclusion applies to. */
export enum KnownManagedRuleExclusionSelectorMatchOperator {
  /** Equals */
  Equals = "Equals",
  /** Contains */
  Contains = "Contains",
  /** StartsWith */
  StartsWith = "StartsWith",
  /** EndsWith */
  EndsWith = "EndsWith",
  /** EqualsAny */
  EqualsAny = "EqualsAny",
}

/**
 * Comparison operator to apply to the selector when specifying which elements in the collection this exclusion applies to. \
 * {@link KnownManagedRuleExclusionSelectorMatchOperator} can be used interchangeably with ManagedRuleExclusionSelectorMatchOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **Contains**: Contains \
 * **StartsWith**: StartsWith \
 * **EndsWith**: EndsWith \
 * **EqualsAny**: EqualsAny
 */
export type ManagedRuleExclusionSelectorMatchOperator = string;

export function managedRuleGroupOverrideArraySerializer(
  result: Array<ManagedRuleGroupOverride>,
): any[] {
  return result.map((item) => {
    return managedRuleGroupOverrideSerializer(item);
  });
}

export function managedRuleGroupOverrideArrayDeserializer(
  result: Array<ManagedRuleGroupOverride>,
): any[] {
  return result.map((item) => {
    return managedRuleGroupOverrideDeserializer(item);
  });
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleGroupOverride {
  /** Describes the managed rule group to override. */
  ruleGroupName: string;
  /** Describes the exclusions that are applied to all rules in the group. */
  exclusions?: ManagedRuleExclusion[];
  /** List of rules that will be disabled. If none specified, all rules in the group will be disabled. */
  rules?: ManagedRuleOverride[];
}

export function managedRuleGroupOverrideSerializer(item: ManagedRuleGroupOverride): any {
  return {
    ruleGroupName: item["ruleGroupName"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArraySerializer(item["exclusions"]),
    rules: !item["rules"] ? item["rules"] : managedRuleOverrideArraySerializer(item["rules"]),
  };
}

export function managedRuleGroupOverrideDeserializer(item: any): ManagedRuleGroupOverride {
  return {
    ruleGroupName: item["ruleGroupName"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArrayDeserializer(item["exclusions"]),
    rules: !item["rules"] ? item["rules"] : managedRuleOverrideArrayDeserializer(item["rules"]),
  };
}

export function managedRuleOverrideArraySerializer(result: Array<ManagedRuleOverride>): any[] {
  return result.map((item) => {
    return managedRuleOverrideSerializer(item);
  });
}

export function managedRuleOverrideArrayDeserializer(result: Array<ManagedRuleOverride>): any[] {
  return result.map((item) => {
    return managedRuleOverrideDeserializer(item);
  });
}

/** Defines a managed rule group override setting. */
export interface ManagedRuleOverride {
  /** Identifier for the managed rule. */
  ruleId: string;
  /** Describes if the managed rule is in enabled or disabled state. Defaults to Disabled if not specified. */
  enabledState?: ManagedRuleEnabledState;
  /** Describes the override action to be applied when rule matches. */
  action?: ActionType;
  /** Describes the override sensitivity to be applied when rule matches. */
  sensitivity?: SensitivityType;
  /** Describes the exclusions that are applied to this specific rule. */
  exclusions?: ManagedRuleExclusion[];
}

export function managedRuleOverrideSerializer(item: ManagedRuleOverride): any {
  return {
    ruleId: item["ruleId"],
    enabledState: item["enabledState"],
    action: item["action"],
    sensitivity: item["sensitivity"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArraySerializer(item["exclusions"]),
  };
}

export function managedRuleOverrideDeserializer(item: any): ManagedRuleOverride {
  return {
    ruleId: item["ruleId"],
    enabledState: item["enabledState"],
    action: item["action"],
    sensitivity: item["sensitivity"],
    exclusions: !item["exclusions"]
      ? item["exclusions"]
      : managedRuleExclusionArrayDeserializer(item["exclusions"]),
  };
}

/** Describes if the managed rule is in enabled or disabled state. */
export enum KnownManagedRuleEnabledState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Describes if the managed rule is in enabled or disabled state. \
 * {@link KnownManagedRuleEnabledState} can be used interchangeably with ManagedRuleEnabledState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type ManagedRuleEnabledState = string;

/** Defines the sensitivity for the rule. */
export enum KnownSensitivityType {
  /** Low Sensitivity - triggers the rule by larger spikes in traffic */
  Low = "Low",
  /** Medium Sensitivity - triggers the rule by moderate spikes in traffic */
  Medium = "Medium",
  /** High Sensitivity - triggers the rule by smaller spikes in traffic */
  High = "High",
}

/**
 * Defines the sensitivity for the rule. \
 * {@link KnownSensitivityType} can be used interchangeably with SensitivityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low Sensitivity - triggers the rule by larger spikes in traffic \
 * **Medium**: Medium Sensitivity - triggers the rule by moderate spikes in traffic \
 * **High**: High Sensitivity - triggers the rule by smaller spikes in traffic
 */
export type SensitivityType = string;

export function frontendEndpointLinkArrayDeserializer(result: Array<FrontendEndpointLink>): any[] {
  return result.map((item) => {
    return frontendEndpointLinkDeserializer(item);
  });
}

/** Defines the Resource ID for a Frontend Endpoint. */
export interface FrontendEndpointLink {
  /** Resource ID. */
  id?: string;
}

export function frontendEndpointLinkDeserializer(item: any): FrontendEndpointLink {
  return {
    id: item["id"],
  };
}

export function routingRuleLinkArrayDeserializer(result: Array<RoutingRuleLink>): any[] {
  return result.map((item) => {
    return routingRuleLinkDeserializer(item);
  });
}

/** Defines the Resource ID for a Routing Rule. */
export interface RoutingRuleLink {
  /** Resource ID. */
  id?: string;
}

export function routingRuleLinkDeserializer(item: any): RoutingRuleLink {
  return {
    id: item["id"],
  };
}

export function securityPolicyLinkArrayDeserializer(result: Array<SecurityPolicyLink>): any[] {
  return result.map((item) => {
    return securityPolicyLinkDeserializer(item);
  });
}

/** Defines the Resource ID for a Security Policy. */
export interface SecurityPolicyLink {
  /** Resource ID. */
  id?: string;
}

export function securityPolicyLinkDeserializer(item: any): SecurityPolicyLink {
  return {
    id: item["id"],
  };
}

/** Resource status of the policy. */
export enum KnownPolicyResourceState {
  /** Creating */
  Creating = "Creating",
  /** Enabling */
  Enabling = "Enabling",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Resource status of the policy. \
 * {@link KnownPolicyResourceState} can be used interchangeably with PolicyResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Enabling**: Enabling \
 * **Enabled**: Enabled \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled \
 * **Deleting**: Deleting
 */
export type PolicyResourceState = string;

/** The pricing tier of the web application firewall policy. */
export interface Sku {
  /** Name of the pricing tier. */
  name?: SkuName;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** Name of the pricing tier. */
export enum KnownSkuName {
  /** Classic_AzureFrontDoor */
  ClassicAzureFrontDoor = "Classic_AzureFrontDoor",
  /** Standard_AzureFrontDoor */
  StandardAzureFrontDoor = "Standard_AzureFrontDoor",
  /** Premium_AzureFrontDoor */
  PremiumAzureFrontDoor = "Premium_AzureFrontDoor",
}

/**
 * Name of the pricing tier. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Classic_AzureFrontDoor**: Classic_AzureFrontDoor \
 * **Standard_AzureFrontDoor**: Standard_AzureFrontDoor \
 * **Premium_AzureFrontDoor**: Premium_AzureFrontDoor
 */
export type SkuName = string;

/** Tags object for patch operations. */
export interface TagsObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function tagsObjectSerializer(item: TagsObject): any {
  return { tags: item["tags"] };
}

/** Defines a list of WebApplicationFirewallPolicies. It contains a list of WebApplicationFirewallPolicy objects and a URL link to get the next set of results. */
export interface _WebApplicationFirewallPolicyList {
  /** The WebApplicationFirewallPolicy items on this page */
  readonly value: WebApplicationFirewallPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webApplicationFirewallPolicyListDeserializer(
  item: any,
): _WebApplicationFirewallPolicyList {
  return {
    value: webApplicationFirewallPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webApplicationFirewallPolicyArraySerializer(
  result: Array<WebApplicationFirewallPolicy>,
): any[] {
  return result.map((item) => {
    return webApplicationFirewallPolicySerializer(item);
  });
}

export function webApplicationFirewallPolicyArrayDeserializer(
  result: Array<WebApplicationFirewallPolicy>,
): any[] {
  return result.map((item) => {
    return webApplicationFirewallPolicyDeserializer(item);
  });
}

/** Error response indicates Front Door service is not able to process the incoming request. The reason is provided in the error message. */
export interface DefaultErrorResponse {
  /** Error model. */
  error?: DefaultErrorResponseError;
}

export function defaultErrorResponseDeserializer(item: any): DefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : defaultErrorResponseErrorDeserializer(item["error"]),
  };
}

/** Error model. */
export interface DefaultErrorResponseError {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function defaultErrorResponseErrorDeserializer(item: any): DefaultErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Parameters required for content purge. */
export interface PurgeParameters {
  /** The path to the content to be purged. Can describe a file path or a wild card directory. */
  contentPaths: string[];
}

export function purgeParametersSerializer(item: PurgeParameters): any {
  return {
    contentPaths: item["contentPaths"].map((p: any) => {
      return p;
    }),
  };
}

/** Defines an Network Experiment Profile and lists of Experiments */
export interface Profile extends ResourcewithSettableName {
  /** Gets a unique read-only string that changes whenever the resource is updated. */
  etag?: string;
  /** Resource status. */
  readonly resourceState?: NetworkExperimentResourceState;
  /** The state of the Experiment */
  enabledState?: State;
}

export function profileSerializer(item: Profile): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabledState"])
      ? undefined
      : _profilePropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function profileDeserializer(item: any): Profile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _profilePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Defines the properties of an experiment */
export interface ProfileProperties {
  /** Resource status. */
  readonly resourceState?: NetworkExperimentResourceState;
  /** The state of the Experiment */
  enabledState?: State;
}

export function profilePropertiesSerializer(item: ProfileProperties): any {
  return { enabledState: item["enabledState"] };
}

export function profilePropertiesDeserializer(item: any): ProfileProperties {
  return {
    resourceState: item["resourceState"],
    enabledState: item["enabledState"],
  };
}

/** Common resource representation. */
export interface ResourcewithSettableName {
  /** Resource ID. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourcewithSettableNameSerializer(item: ResourcewithSettableName): any {
  return { location: item["location"], tags: item["tags"] };
}

export function resourcewithSettableNameDeserializer(item: any): ResourcewithSettableName {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Defines modifiable attributes of a Profile */
export interface ProfileUpdateModel {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The enabled state of the Profile */
  enabledState?: State;
}

export function profileUpdateModelSerializer(item: ProfileUpdateModel): any {
  return {
    properties: areAllPropsUndefined(item, ["enabledState"])
      ? undefined
      : _profileUpdateModelPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Defines the properties of an experiment */
export interface ProfileUpdateProperties {
  /** The enabled state of the Profile */
  enabledState?: State;
}

export function profileUpdatePropertiesSerializer(item: ProfileUpdateProperties): any {
  return { enabledState: item["enabledState"] };
}

/** Defines a list of Profiles. It contains a list of Profile objects and a URL link to get the next set of results. */
export interface _ProfileList {
  /** The Profile items on this page */
  readonly value: Profile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _profileListDeserializer(item: any): _ProfileList {
  return {
    value: profileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function profileArraySerializer(result: Array<Profile>): any[] {
  return result.map((item) => {
    return profileSerializer(item);
  });
}

export function profileArrayDeserializer(result: Array<Profile>): any[] {
  return result.map((item) => {
    return profileDeserializer(item);
  });
}

/** Defines a list of preconfigured endpoints. */
export interface _PreconfiguredEndpointList {
  /** The PreconfiguredEndpoint items on this page */
  readonly value: PreconfiguredEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _preconfiguredEndpointListDeserializer(item: any): _PreconfiguredEndpointList {
  return {
    value: preconfiguredEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function preconfiguredEndpointArrayDeserializer(
  result: Array<PreconfiguredEndpoint>,
): any[] {
  return result.map((item) => {
    return preconfiguredEndpointDeserializer(item);
  });
}

/** Defines the properties of a preconfigured endpoint */
export interface PreconfiguredEndpoint extends ResourcewithSettableName {
  /** The description of the endpoint */
  description?: string;
  /** The endpoint that is preconfigured */
  endpoint?: string;
  /** The type of endpoint */
  endpointType?: EndpointType;
  /** The preconfigured endpoint backend */
  backend?: string;
}

export function preconfiguredEndpointDeserializer(item: any): PreconfiguredEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _preconfiguredEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** Defines the properties of a preconfigured endpoint */
export interface PreconfiguredEndpointProperties {
  /** The description of the endpoint */
  description?: string;
  /** The endpoint that is preconfigured */
  endpoint?: string;
  /** The type of endpoint */
  endpointType?: EndpointType;
  /** The preconfigured endpoint backend */
  backend?: string;
}

export function preconfiguredEndpointPropertiesDeserializer(
  item: any,
): PreconfiguredEndpointProperties {
  return {
    description: item["description"],
    endpoint: item["endpoint"],
    endpointType: item["endpointType"],
    backend: item["backend"],
  };
}

/** The type of endpoint */
export enum KnownEndpointType {
  /** AFD */
  AFD = "AFD",
  /** AzureRegion */
  AzureRegion = "AzureRegion",
  /** CDN */
  CDN = "CDN",
  /** ATM */
  ATM = "ATM",
}

/**
 * The type of endpoint \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AFD**: AFD \
 * **AzureRegion**: AzureRegion \
 * **CDN**: CDN \
 * **ATM**: ATM
 */
export type EndpointType = string;

/** Defines the LatencyScorecard */
export interface LatencyScorecard extends Resource {
  /** The unique identifier of the Latency Scorecard */
  readonly idPropertiesId?: string;
  /** The name of the Latency Scorecard */
  readonly namePropertiesName?: string;
  /** The description of the Latency Scorecard */
  readonly description?: string;
  /** The A endpoint in the scorecard */
  readonly endpointA?: string;
  /** The B endpoint in the scorecard */
  readonly endpointB?: string;
  /** The start time of the Latency Scorecard in UTC */
  readonly startDateTimeUTC?: Date;
  /** The end time of the Latency Scorecard in UTC */
  readonly endDateTimeUTC?: Date;
  /** The country associated with the Latency Scorecard. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  readonly country?: string;
  /** The latency metrics of the Latency Scorecard */
  latencyMetrics?: LatencyMetric[];
}

export function latencyScorecardDeserializer(item: any): LatencyScorecard {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _latencyScorecardPropertiesDeserializer(item["properties"])),
  };
}

/** Defines a the properties of a Latency Scorecard */
export interface LatencyScorecardProperties {
  /** The unique identifier of the Latency Scorecard */
  readonly id?: string;
  /** The name of the Latency Scorecard */
  readonly name?: string;
  /** The description of the Latency Scorecard */
  readonly description?: string;
  /** The A endpoint in the scorecard */
  readonly endpointA?: string;
  /** The B endpoint in the scorecard */
  readonly endpointB?: string;
  /** The start time of the Latency Scorecard in UTC */
  readonly startDateTimeUTC?: Date;
  /** The end time of the Latency Scorecard in UTC */
  readonly endDateTimeUTC?: Date;
  /** The country associated with the Latency Scorecard. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  readonly country?: string;
  /** The latency metrics of the Latency Scorecard */
  latencyMetrics?: LatencyMetric[];
}

export function latencyScorecardPropertiesDeserializer(item: any): LatencyScorecardProperties {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    endpointA: item["endpointA"],
    endpointB: item["endpointB"],
    startDateTimeUTC: !item["startDateTimeUTC"]
      ? item["startDateTimeUTC"]
      : new Date(item["startDateTimeUTC"]),
    endDateTimeUTC: !item["endDateTimeUTC"]
      ? item["endDateTimeUTC"]
      : new Date(item["endDateTimeUTC"]),
    country: item["country"],
    latencyMetrics: !item["latencyMetrics"]
      ? item["latencyMetrics"]
      : latencyMetricArrayDeserializer(item["latencyMetrics"]),
  };
}

export function latencyMetricArrayDeserializer(result: Array<LatencyMetric>): any[] {
  return result.map((item) => {
    return latencyMetricDeserializer(item);
  });
}

/** Defines the properties of a latency metric used in the latency scorecard */
export interface LatencyMetric {
  /** The name of the Latency Metric */
  readonly name?: string;
  /** The end time of the Latency Scorecard in UTC */
  readonly endDateTimeUTC?: string;
  /** The metric value of the A endpoint */
  readonly aValue?: number;
  /** The metric value of the B endpoint */
  readonly bValue?: number;
  /** The difference in value between endpoint A and B */
  readonly delta?: number;
  /** The percent difference between endpoint A and B */
  readonly deltaPercent?: number;
  /** The lower end of the 95% confidence interval for endpoint A */
  readonly aCLower95CI?: number;
  /** The upper end of the 95% confidence interval for endpoint A */
  readonly aHUpper95CI?: number;
  /** The lower end of the 95% confidence interval for endpoint B */
  readonly bCLower95CI?: number;
  /** The upper end of the 95% confidence interval for endpoint B */
  readonly bUpper95CI?: number;
}

export function latencyMetricDeserializer(item: any): LatencyMetric {
  return {
    name: item["name"],
    endDateTimeUTC: item["endDateTimeUTC"],
    aValue: item["aValue"],
    bValue: item["bValue"],
    delta: item["delta"],
    deltaPercent: item["deltaPercent"],
    aCLower95CI: item["aCLower95CI"],
    aHUpper95CI: item["aHUpper95CI"],
    bCLower95CI: item["bCLower95CI"],
    bUpper95CI: item["bUpper95CI"],
  };
}

/** Defines the Timeseries */
export interface Timeseries extends Resource {
  /** The endpoint associated with the Timeseries data point */
  endpoint?: string;
  /** The start DateTime of the Timeseries in UTC */
  startDateTimeUTC?: string;
  /** The end DateTime of the Timeseries in UTC */
  endDateTimeUTC?: string;
  /** The aggregation interval of the Timeseries */
  aggregationInterval?: AggregationInterval;
  /** The type of Timeseries */
  timeseriesType?: TimeseriesType;
  /** The country associated with the Timeseries. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  country?: string;
  /** The set of data points for the timeseries */
  timeseriesData?: TimeseriesDataPoint[];
}

export function timeseriesDeserializer(item: any): Timeseries {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _timeseriesPropertiesDeserializer(item["properties"])),
  };
}

/** Defines the properties of a timeseries */
export interface TimeseriesProperties {
  /** The endpoint associated with the Timeseries data point */
  endpoint?: string;
  /** The start DateTime of the Timeseries in UTC */
  startDateTimeUTC?: string;
  /** The end DateTime of the Timeseries in UTC */
  endDateTimeUTC?: string;
  /** The aggregation interval of the Timeseries */
  aggregationInterval?: AggregationInterval;
  /** The type of Timeseries */
  timeseriesType?: TimeseriesType;
  /** The country associated with the Timeseries. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  country?: string;
  /** The set of data points for the timeseries */
  timeseriesData?: TimeseriesDataPoint[];
}

export function timeseriesPropertiesDeserializer(item: any): TimeseriesProperties {
  return {
    endpoint: item["endpoint"],
    startDateTimeUTC: item["startDateTimeUTC"],
    endDateTimeUTC: item["endDateTimeUTC"],
    aggregationInterval: item["aggregationInterval"],
    timeseriesType: item["timeseriesType"],
    country: item["country"],
    timeseriesData: !item["timeseriesData"]
      ? item["timeseriesData"]
      : timeseriesDataPointArrayDeserializer(item["timeseriesData"]),
  };
}

/** The aggregation interval of the Timeseries */
export enum KnownAggregationInterval {
  /** Hourly */
  Hourly = "Hourly",
  /** Daily */
  Daily = "Daily",
}

/**
 * The aggregation interval of the Timeseries \
 * {@link KnownAggregationInterval} can be used interchangeably with AggregationInterval,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hourly**: Hourly \
 * **Daily**: Daily
 */
export type AggregationInterval = string;

/** The type of Timeseries */
export enum KnownTimeseriesType {
  /** MeasurementCounts */
  MeasurementCounts = "MeasurementCounts",
  /** LatencyP50 */
  LatencyP50 = "LatencyP50",
  /** LatencyP75 */
  LatencyP75 = "LatencyP75",
  /** LatencyP95 */
  LatencyP95 = "LatencyP95",
}

/**
 * The type of Timeseries \
 * {@link KnownTimeseriesType} can be used interchangeably with TimeseriesType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MeasurementCounts**: MeasurementCounts \
 * **LatencyP50**: LatencyP50 \
 * **LatencyP75**: LatencyP75 \
 * **LatencyP95**: LatencyP95
 */
export type TimeseriesType = string;

export function timeseriesDataPointArrayDeserializer(result: Array<TimeseriesDataPoint>): any[] {
  return result.map((item) => {
    return timeseriesDataPointDeserializer(item);
  });
}

/** Defines a timeseries datapoint used in a timeseries */
export interface TimeseriesDataPoint {
  /** The DateTime of the Timeseries data point in UTC */
  dateTimeUTC?: string;
  /** The Value of the Timeseries data point */
  value?: number;
}

export function timeseriesDataPointDeserializer(item: any): TimeseriesDataPoint {
  return {
    dateTimeUTC: item["dateTimeUTC"],
    value: item["value"],
  };
}

/** List of managed rule set definitions available for use in a policy. */
export interface _ManagedRuleSetDefinitionList {
  /** The ManagedRuleSetDefinition items on this page */
  readonly value: ManagedRuleSetDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedRuleSetDefinitionListDeserializer(
  item: any,
): _ManagedRuleSetDefinitionList {
  return {
    value: managedRuleSetDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedRuleSetDefinitionArrayDeserializer(
  result: Array<ManagedRuleSetDefinition>,
): any[] {
  return result.map((item) => {
    return managedRuleSetDefinitionDeserializer(item);
  });
}

/** Describes the a managed rule set definition. */
export interface ManagedRuleSetDefinition extends Resource {
  /** Provisioning state of the managed rule set. */
  readonly provisioningState?: string;
  /** Id of the managed rule set. */
  readonly ruleSetId?: string;
  /** Type of the managed rule set. */
  readonly ruleSetType?: string;
  /** Version of the managed rule set type. */
  readonly ruleSetVersion?: string;
  /** Rule groups of the managed rule set. */
  readonly ruleGroups?: ManagedRuleGroupDefinition[];
}

export function managedRuleSetDefinitionDeserializer(item: any): ManagedRuleSetDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["properties"]
      ? item["properties"]
      : _managedRuleSetDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for a managed rule set definition. */
export interface ManagedRuleSetDefinitionProperties {
  /** Provisioning state of the managed rule set. */
  readonly provisioningState?: string;
  /** Id of the managed rule set. */
  readonly ruleSetId?: string;
  /** Type of the managed rule set. */
  readonly ruleSetType?: string;
  /** Version of the managed rule set type. */
  readonly ruleSetVersion?: string;
  /** Rule groups of the managed rule set. */
  readonly ruleGroups?: ManagedRuleGroupDefinition[];
}

export function managedRuleSetDefinitionPropertiesDeserializer(
  item: any,
): ManagedRuleSetDefinitionProperties {
  return {
    provisioningState: item["provisioningState"],
    ruleSetId: item["ruleSetId"],
    ruleSetType: item["ruleSetType"],
    ruleSetVersion: item["ruleSetVersion"],
    ruleGroups: !item["ruleGroups"]
      ? item["ruleGroups"]
      : managedRuleGroupDefinitionArrayDeserializer(item["ruleGroups"]),
  };
}

export function managedRuleGroupDefinitionArrayDeserializer(
  result: Array<ManagedRuleGroupDefinition>,
): any[] {
  return result.map((item) => {
    return managedRuleGroupDefinitionDeserializer(item);
  });
}

/** Describes a managed rule group. */
export interface ManagedRuleGroupDefinition {
  /** Name of the managed rule group. */
  readonly ruleGroupName?: string;
  /** Description of the managed rule group. */
  readonly description?: string;
  /** List of rules within the managed rule group. */
  readonly rules?: ManagedRuleDefinition[];
}

export function managedRuleGroupDefinitionDeserializer(item: any): ManagedRuleGroupDefinition {
  return {
    ruleGroupName: item["ruleGroupName"],
    description: item["description"],
    rules: !item["rules"] ? item["rules"] : managedRuleDefinitionArrayDeserializer(item["rules"]),
  };
}

export function managedRuleDefinitionArrayDeserializer(
  result: Array<ManagedRuleDefinition>,
): any[] {
  return result.map((item) => {
    return managedRuleDefinitionDeserializer(item);
  });
}

/** Describes a managed rule definition. */
export interface ManagedRuleDefinition {
  /** Identifier for the managed rule. */
  readonly ruleId?: string;
  /** Describes the default state for the managed rule. */
  readonly defaultState?: ManagedRuleEnabledState;
  /** Describes the default action to be applied when the managed rule matches. */
  readonly defaultAction?: ActionType;
  /** Describes the default sensitivity to be applied when the managed rule matches. */
  readonly defaultSensitivity?: SensitivityType;
  /** Describes the functionality of the managed rule. */
  readonly description?: string;
}

export function managedRuleDefinitionDeserializer(item: any): ManagedRuleDefinition {
  return {
    ruleId: item["ruleId"],
    defaultState: item["defaultState"],
    defaultAction: item["defaultAction"],
    defaultSensitivity: item["defaultSensitivity"],
    description: item["description"],
  };
}

/** Input of CheckNameAvailability API. */
export interface CheckNameAvailabilityInput {
  /** The resource name to validate. */
  name: string;
  /** The type of the resource whose name is to be validated. */
  type: ResourceType;
}

export function checkNameAvailabilityInputSerializer(item: CheckNameAvailabilityInput): any {
  return { name: item["name"], type: item["type"] };
}

/** Type of Front Door resource used in CheckNameAvailability. */
export type ResourceType =
  | "Microsoft.Network/frontDoors"
  | "Microsoft.Network/frontDoors/frontendEndpoints";

/** Output of check name availability API. */
export interface CheckNameAvailabilityOutput {
  /** Indicates whether the name is available. */
  readonly nameAvailability?: Availability;
  /** The reason why the name is not available. */
  readonly reason?: string;
  /** The detailed error message describing why the name is not available. */
  readonly message?: string;
}

export function checkNameAvailabilityOutputDeserializer(item: any): CheckNameAvailabilityOutput {
  return {
    nameAvailability: item["nameAvailability"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Indicates whether the name is available. */
export enum KnownAvailability {
  /** Available */
  Available = "Available",
  /** Unavailable */
  Unavailable = "Unavailable",
}

/**
 * Indicates whether the name is available. \
 * {@link KnownAvailability} can be used interchangeably with Availability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: Available \
 * **Unavailable**: Unavailable
 */
export type Availability = string;

/** Known values of {@link LatencyScorecardAggregationInterval} that the service accepts. */
export enum KnownLatencyScorecardAggregationInterval {
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
  /** Monthly */
  Monthly = "Monthly",
}

/** Type of LatencyScorecardAggregationInterval */
export type LatencyScorecardAggregationInterval = string;

/** Known values of {@link TimeseriesAggregationInterval} that the service accepts. */
export enum KnownTimeseriesAggregationInterval {
  /** Hourly */
  Hourly = "Hourly",
  /** Daily */
  Daily = "Daily",
}

/** Type of TimeseriesAggregationInterval */
export type TimeseriesAggregationInterval = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01 API version. */
  V20251001 = "2025-10-01",
}

export function _rulesEnginePropertiesSerializer(item: RulesEngine): any {
  return { rules: !item["rules"] ? item["rules"] : rulesEngineRuleArraySerializer(item["rules"]) };
}

export function _rulesEnginePropertiesDeserializer(item: any) {
  return {
    rules: !item["rules"] ? item["rules"] : rulesEngineRuleArrayDeserializer(item["rules"]),
    resourceState: item["resourceState"],
  };
}

export function _frontDoorPropertiesSerializer(item: FrontDoor): any {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArraySerializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArraySerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArraySerializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArraySerializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArraySerializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsSerializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
  };
}

export function _frontDoorPropertiesDeserializer(item: any) {
  return {
    friendlyName: item["friendlyName"],
    routingRules: !item["routingRules"]
      ? item["routingRules"]
      : routingRuleArrayDeserializer(item["routingRules"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : loadBalancingSettingsModelArrayDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : healthProbeSettingsModelArrayDeserializer(item["healthProbeSettings"]),
    backendPools: !item["backendPools"]
      ? item["backendPools"]
      : backendPoolArrayDeserializer(item["backendPools"]),
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : frontendEndpointArrayDeserializer(item["frontendEndpoints"]),
    backendPoolsSettings: !item["backendPoolsSettings"]
      ? item["backendPoolsSettings"]
      : backendPoolsSettingsDeserializer(item["backendPoolsSettings"]),
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
    provisioningState: item["provisioningState"],
    cname: item["cname"],
    frontdoorId: item["frontdoorId"],
    rulesEngines: !item["rulesEngines"]
      ? item["rulesEngines"]
      : rulesEngineArrayDeserializer(item["rulesEngines"]),
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _routingRulePropertiesSerializer(item: RoutingRule): any {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArraySerializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionSerializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceSerializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function _routingRulePropertiesDeserializer(item: any) {
  return {
    frontendEndpoints: !item["frontendEndpoints"]
      ? item["frontendEndpoints"]
      : subResourceArrayDeserializer(item["frontendEndpoints"]),
    acceptedProtocols: !item["acceptedProtocols"]
      ? item["acceptedProtocols"]
      : item["acceptedProtocols"].map((p: any) => {
          return p;
        }),
    patternsToMatch: !item["patternsToMatch"]
      ? item["patternsToMatch"]
      : item["patternsToMatch"].map((p: any) => {
          return p;
        }),
    enabledState: item["enabledState"],
    routeConfiguration: !item["routeConfiguration"]
      ? item["routeConfiguration"]
      : routeConfigurationUnionDeserializer(item["routeConfiguration"]),
    rulesEngine: !item["rulesEngine"]
      ? item["rulesEngine"]
      : subResourceDeserializer(item["rulesEngine"]),
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : routingRuleUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
    resourceState: item["resourceState"],
  };
}

export function _loadBalancingSettingsModelPropertiesSerializer(
  item: LoadBalancingSettingsModel,
): any {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
  };
}

export function _loadBalancingSettingsModelPropertiesDeserializer(item: any) {
  return {
    sampleSize: item["sampleSize"],
    successfulSamplesRequired: item["successfulSamplesRequired"],
    additionalLatencyMilliseconds: item["additionalLatencyMilliseconds"],
    resourceState: item["resourceState"],
  };
}

export function _healthProbeSettingsModelPropertiesSerializer(item: HealthProbeSettingsModel): any {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
  };
}

export function _healthProbeSettingsModelPropertiesDeserializer(item: any) {
  return {
    path: item["path"],
    protocol: item["protocol"],
    intervalInSeconds: item["intervalInSeconds"],
    healthProbeMethod: item["healthProbeMethod"],
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
  };
}

export function _backendPoolPropertiesSerializer(item: BackendPool): any {
  return {
    backends: !item["backends"] ? item["backends"] : backendArraySerializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceSerializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceSerializer(item["healthProbeSettings"]),
  };
}

export function _backendPoolPropertiesDeserializer(item: any) {
  return {
    backends: !item["backends"] ? item["backends"] : backendArrayDeserializer(item["backends"]),
    loadBalancingSettings: !item["loadBalancingSettings"]
      ? item["loadBalancingSettings"]
      : subResourceDeserializer(item["loadBalancingSettings"]),
    healthProbeSettings: !item["healthProbeSettings"]
      ? item["healthProbeSettings"]
      : subResourceDeserializer(item["healthProbeSettings"]),
    resourceState: item["resourceState"],
  };
}

export function _customHttpsConfigurationKeyVaultCertificateSourceParametersSerializer(
  item: CustomHttpsConfiguration,
): any {
  return {
    vault: !item["vault"]
      ? item["vault"]
      : keyVaultCertificateSourceParametersVaultSerializer(item["vault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

export function _customHttpsConfigurationKeyVaultCertificateSourceParametersDeserializer(
  item: any,
) {
  return {
    vault: !item["vault"]
      ? item["vault"]
      : keyVaultCertificateSourceParametersVaultDeserializer(item["vault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

export function _customHttpsConfigurationFrontDoorCertificateSourceParametersSerializer(
  item: CustomHttpsConfiguration,
): any {
  return { certificateType: item["certificateType"] };
}

export function _customHttpsConfigurationFrontDoorCertificateSourceParametersDeserializer(
  item: any,
) {
  return {
    certificateType: item["certificateType"],
  };
}

export function _frontendEndpointPropertiesSerializer(item: FrontendEndpoint): any {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkSerializer(
          item["webApplicationFirewallPolicyLink"],
        ),
  };
}

export function _frontendEndpointPropertiesDeserializer(item: any) {
  return {
    hostName: item["hostName"],
    sessionAffinityEnabledState: item["sessionAffinityEnabledState"],
    sessionAffinityTtlSeconds: item["sessionAffinityTtlSeconds"],
    webApplicationFirewallPolicyLink: !item["webApplicationFirewallPolicyLink"]
      ? item["webApplicationFirewallPolicyLink"]
      : frontendEndpointUpdateParametersWebApplicationFirewallPolicyLinkDeserializer(
          item["webApplicationFirewallPolicyLink"],
        ),
    resourceState: item["resourceState"],
    customHttpsProvisioningState: item["customHttpsProvisioningState"],
    customHttpsProvisioningSubstate: item["customHttpsProvisioningSubstate"],
    customHttpsConfiguration: !item["customHttpsConfiguration"]
      ? item["customHttpsConfiguration"]
      : customHttpsConfigurationDeserializer(item["customHttpsConfiguration"]),
  };
}

export function _experimentPropertiesSerializer(item: Experiment): any {
  return {
    description: item["description"],
    endpointA: !item["endpointA"] ? item["endpointA"] : endpointSerializer(item["endpointA"]),
    endpointB: !item["endpointB"] ? item["endpointB"] : endpointSerializer(item["endpointB"]),
    enabledState: item["enabledState"],
  };
}

export function _experimentPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    endpointA: !item["endpointA"] ? item["endpointA"] : endpointDeserializer(item["endpointA"]),
    endpointB: !item["endpointB"] ? item["endpointB"] : endpointDeserializer(item["endpointB"]),
    enabledState: item["enabledState"],
    resourceState: item["resourceState"],
    status: item["status"],
    scriptFileUri: item["scriptFileUri"],
  };
}

export function _experimentUpdateModelPropertiesSerializer(item: ExperimentUpdateModel): any {
  return { description: item["description"], enabledState: item["enabledState"] };
}

export function _policySettingsLogScrubbingSerializer(item: PolicySettings): any {
  return {
    state: item["state"],
    scrubbingRules: !item["scrubbingRules"]
      ? item["scrubbingRules"]
      : webApplicationFirewallScrubbingRulesArraySerializer(item["scrubbingRules"]),
  };
}

export function _policySettingsLogScrubbingDeserializer(item: any) {
  return {
    state: item["state"],
    scrubbingRules: !item["scrubbingRules"]
      ? item["scrubbingRules"]
      : webApplicationFirewallScrubbingRulesArrayDeserializer(item["scrubbingRules"]),
  };
}

export function _webApplicationFirewallPolicyPropertiesSerializer(
  item: WebApplicationFirewallPolicy,
): any {
  return {
    policySettings: !item["policySettings"]
      ? item["policySettings"]
      : policySettingsSerializer(item["policySettings"]),
    customRules: !item["customRules"]
      ? item["customRules"]
      : customRuleListSerializer(item["customRules"]),
    managedRules: !item["managedRules"]
      ? item["managedRules"]
      : managedRuleSetListSerializer(item["managedRules"]),
  };
}

export function _webApplicationFirewallPolicyPropertiesDeserializer(item: any) {
  return {
    policySettings: !item["policySettings"]
      ? item["policySettings"]
      : policySettingsDeserializer(item["policySettings"]),
    customRules: !item["customRules"]
      ? item["customRules"]
      : customRuleListDeserializer(item["customRules"]),
    managedRules: !item["managedRules"]
      ? item["managedRules"]
      : managedRuleSetListDeserializer(item["managedRules"]),
    frontendEndpointLinks: !item["frontendEndpointLinks"]
      ? item["frontendEndpointLinks"]
      : frontendEndpointLinkArrayDeserializer(item["frontendEndpointLinks"]),
    routingRuleLinks: !item["routingRuleLinks"]
      ? item["routingRuleLinks"]
      : routingRuleLinkArrayDeserializer(item["routingRuleLinks"]),
    securityPolicyLinks: !item["securityPolicyLinks"]
      ? item["securityPolicyLinks"]
      : securityPolicyLinkArrayDeserializer(item["securityPolicyLinks"]),
    provisioningState: item["provisioningState"],
    resourceState: item["resourceState"],
  };
}

export function _profilePropertiesSerializer(item: Profile): any {
  return { enabledState: item["enabledState"] };
}

export function _profilePropertiesDeserializer(item: any) {
  return {
    resourceState: item["resourceState"],
    enabledState: item["enabledState"],
  };
}

export function _profileUpdateModelPropertiesSerializer(item: ProfileUpdateModel): any {
  return { enabledState: item["enabledState"] };
}

export function _preconfiguredEndpointPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    endpoint: item["endpoint"],
    endpointType: item["endpointType"],
    backend: item["backend"],
  };
}

export function _latencyScorecardPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    namePropertiesName: item["name"],
    description: item["description"],
    endpointA: item["endpointA"],
    endpointB: item["endpointB"],
    startDateTimeUTC: !item["startDateTimeUTC"]
      ? item["startDateTimeUTC"]
      : new Date(item["startDateTimeUTC"]),
    endDateTimeUTC: !item["endDateTimeUTC"]
      ? item["endDateTimeUTC"]
      : new Date(item["endDateTimeUTC"]),
    country: item["country"],
    latencyMetrics: !item["latencyMetrics"]
      ? item["latencyMetrics"]
      : latencyMetricArrayDeserializer(item["latencyMetrics"]),
  };
}

export function _timeseriesPropertiesDeserializer(item: any) {
  return {
    endpoint: item["endpoint"],
    startDateTimeUTC: item["startDateTimeUTC"],
    endDateTimeUTC: item["endDateTimeUTC"],
    aggregationInterval: item["aggregationInterval"],
    timeseriesType: item["timeseriesType"],
    country: item["country"],
    timeseriesData: !item["timeseriesData"]
      ? item["timeseriesData"]
      : timeseriesDataPointArrayDeserializer(item["timeseriesData"]),
  };
}

export function _managedRuleSetDefinitionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    ruleSetId: item["ruleSetId"],
    ruleSetType: item["ruleSetType"],
    ruleSetVersion: item["ruleSetVersion"],
    ruleGroups: !item["ruleGroups"]
      ? item["ruleGroups"]
      : managedRuleGroupDefinitionArrayDeserializer(item["ruleGroups"]),
  };
}
