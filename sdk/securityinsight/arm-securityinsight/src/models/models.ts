// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** IP address (v4 or v6) to be enriched */
export interface EnrichmentIpAddressBody {
  /** The dotted-decimal or colon-separated string representation of the IP address */
  ipAddress?: string;
}

export function enrichmentIpAddressBodySerializer(item: EnrichmentIpAddressBody): any {
  return { ipAddress: item["ipAddress"] };
}

/** Geodata information for a given IP address */
export interface EnrichmentIpGeodata {
  /** The autonomous system number associated with this IP address */
  asn?: string;
  /** The name of the carrier for this IP address */
  carrier?: string;
  /** The city this IP address is located in */
  city?: string;
  /** A numeric rating of confidence that the value in the 'city' field is correct, on a scale of 0-100 */
  cityConfidenceFactor?: number;
  /** The continent this IP address is located on */
  continent?: string;
  /** The county this IP address is located in */
  country?: string;
  /** A numeric rating of confidence that the value in the 'country' field is correct on a scale of 0-100 */
  countryConfidenceFactor?: number;
  /** The dotted-decimal or colon-separated string representation of the IP address */
  ipAddr?: string;
  /** A description of the connection type of this IP address */
  ipRoutingType?: string;
  /** The latitude of this IP address */
  latitude?: string;
  /** The longitude of this IP address */
  longitude?: string;
  /** The name of the organization for this IP address */
  organization?: string;
  /** The type of the organization for this IP address */
  organizationType?: string;
  /** The geographic region this IP address is located in */
  region?: string;
  /** The state this IP address is located in */
  state?: string;
  /** A numeric rating of confidence that the value in the 'state' field is correct on a scale of 0-100 */
  stateConfidenceFactor?: number;
  /** The abbreviated name for the state this IP address is located in */
  stateCode?: string;
}

export function enrichmentIpGeodataDeserializer(item: any): EnrichmentIpGeodata {
  return {
    asn: item["asn"],
    carrier: item["carrier"],
    city: item["city"],
    cityConfidenceFactor: item["cityConfidenceFactor"],
    continent: item["continent"],
    country: item["country"],
    countryConfidenceFactor: item["countryConfidenceFactor"],
    ipAddr: item["ipAddr"],
    ipRoutingType: item["ipRoutingType"],
    latitude: item["latitude"],
    longitude: item["longitude"],
    organization: item["organization"],
    organizationType: item["organizationType"],
    region: item["region"],
    state: item["state"],
    stateConfidenceFactor: item["stateConfidenceFactor"],
    stateCode: item["stateCode"],
  };
}

/** Error response structure. */
export interface CloudError {
  /** Error data */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** Error details. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  readonly code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  readonly message?: string;
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Domain name to be enriched */
export interface EnrichmentDomainBody {
  /** The domain name */
  domain?: string;
}

export function enrichmentDomainBodySerializer(item: EnrichmentDomainBody): any {
  return { domain: item["domain"] };
}

/** Whois information for a given domain and associated metadata */
export interface EnrichmentDomainWhois {
  /** The domain for this whois record */
  domain?: string;
  /** The hostname of this registrar's whois server */
  server?: string;
  /** The timestamp at which this record was created */
  created?: Date;
  /** The timestamp at which this record was last updated */
  updated?: Date;
  /** The timestamp at which this record will expire */
  expires?: Date;
  /** The whois record for a given domain */
  parsedWhois?: EnrichmentDomainWhoisDetails;
}

export function enrichmentDomainWhoisDeserializer(item: any): EnrichmentDomainWhois {
  return {
    domain: item["domain"],
    server: item["server"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    expires: !item["expires"] ? item["expires"] : new Date(item["expires"]),
    parsedWhois: !item["parsedWhois"]
      ? item["parsedWhois"]
      : enrichmentDomainWhoisDetailsDeserializer(item["parsedWhois"]),
  };
}

/** The whois record for a given domain */
export interface EnrichmentDomainWhoisDetails {
  /** The registrar associated with this domain */
  registrar?: EnrichmentDomainWhoisRegistrarDetails;
  /** The set of contacts associated with this domain */
  contacts?: EnrichmentDomainWhoisContacts;
  /** A list of name servers associated with this domain */
  nameServers?: string[];
  /** The set of status flags for this whois record */
  statuses?: string[];
}

export function enrichmentDomainWhoisDetailsDeserializer(item: any): EnrichmentDomainWhoisDetails {
  return {
    registrar: !item["registrar"]
      ? item["registrar"]
      : enrichmentDomainWhoisRegistrarDetailsDeserializer(item["registrar"]),
    contacts: !item["contacts"]
      ? item["contacts"]
      : enrichmentDomainWhoisContactsDeserializer(item["contacts"]),
    nameServers: !item["nameServers"]
      ? item["nameServers"]
      : item["nameServers"].map((p: any) => {
          return p;
        }),
    statuses: !item["statuses"]
      ? item["statuses"]
      : item["statuses"].map((p: any) => {
          return p;
        }),
  };
}

/** The registrar associated with this domain */
export interface EnrichmentDomainWhoisRegistrarDetails {
  /** The name of this registrar */
  name?: string;
  /** This registrar's abuse contact email */
  abuseContactEmail?: string;
  /** This registrar's abuse contact phone number */
  abuseContactPhone?: string;
  /** This registrar's Internet Assigned Numbers Authority id */
  ianaId?: string;
  /** This registrar's URL */
  url?: string;
  /** The hostname of this registrar's whois server */
  whoisServer?: string;
}

export function enrichmentDomainWhoisRegistrarDetailsDeserializer(
  item: any,
): EnrichmentDomainWhoisRegistrarDetails {
  return {
    name: item["name"],
    abuseContactEmail: item["abuseContactEmail"],
    abuseContactPhone: item["abuseContactPhone"],
    ianaId: item["ianaId"],
    url: item["url"],
    whoisServer: item["whoisServer"],
  };
}

/** The set of contacts associated with this domain */
export interface EnrichmentDomainWhoisContacts {
  /** The admin contact for this whois record */
  admin?: EnrichmentDomainWhoisContact;
  /** The billing contact for this whois record */
  billing?: EnrichmentDomainWhoisContact;
  /** The registrant contact for this whois record */
  registrant?: EnrichmentDomainWhoisContact;
  /** The technical contact for this whois record */
  tech?: EnrichmentDomainWhoisContact;
}

export function enrichmentDomainWhoisContactsDeserializer(
  item: any,
): EnrichmentDomainWhoisContacts {
  return {
    admin: !item["admin"] ? item["admin"] : enrichmentDomainWhoisContactDeserializer(item["admin"]),
    billing: !item["billing"]
      ? item["billing"]
      : enrichmentDomainWhoisContactDeserializer(item["billing"]),
    registrant: !item["registrant"]
      ? item["registrant"]
      : enrichmentDomainWhoisContactDeserializer(item["registrant"]),
    tech: !item["tech"] ? item["tech"] : enrichmentDomainWhoisContactDeserializer(item["tech"]),
  };
}

/** An individual contact associated with this domain */
export interface EnrichmentDomainWhoisContact {
  /** The name of this contact */
  name?: string;
  /** The organization for this contact */
  org?: string;
  /** A list describing the street address for this contact */
  street?: string[];
  /** The city for this contact */
  city?: string;
  /** The state for this contact */
  state?: string;
  /** The postal code for this contact */
  postal?: string;
  /** The country for this contact */
  country?: string;
  /** The phone number for this contact */
  phone?: string;
  /** The fax number for this contact */
  fax?: string;
  /** The email address for this contact */
  email?: string;
}

export function enrichmentDomainWhoisContactDeserializer(item: any): EnrichmentDomainWhoisContact {
  return {
    name: item["name"],
    org: item["org"],
    street: !item["street"]
      ? item["street"]
      : item["street"].map((p: any) => {
          return p;
        }),
    city: item["city"],
    state: item["state"],
    postal: item["postal"],
    country: item["country"],
    phone: item["phone"],
    fax: item["fax"],
    email: item["email"],
  };
}

/** Lists the operations available in the SecurityInsights RP. */
export interface _OperationsList {
  /** URL to fetch the next set of operations. */
  readonly nextLink?: string;
  /** Array of operations */
  value: Operation[];
}

export function _operationsListDeserializer(item: any): _OperationsList {
  return {
    nextLink: item["nextLink"],
    value: operationArrayDeserializer(item["value"]),
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Operation provided by provider */
export interface Operation {
  /** Properties of the operation */
  display?: OperationDisplay;
  /** Name of the operation */
  name?: string;
  /** The origin of the operation */
  origin?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
}

export function operationDeserializer(item: any): Operation {
  return {
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    name: item["name"],
    origin: item["origin"],
    isDataAction: item["isDataAction"],
  };
}

/** Properties of the operation */
export interface OperationDisplay {
  /** Description of the operation */
  description?: string;
  /** Operation name */
  operation?: string;
  /** Provider name */
  provider?: string;
  /** Resource name */
  resource?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** Alert rule. */
export interface AlertRule extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: MLBehaviorAnalytics, Fusion, ThreatIntelligence, MicrosoftSecurityIncidentCreation, Scheduled, NRT */
  kind: AlertRuleKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function alertRuleSerializer(item: AlertRule): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function alertRuleDeserializer(item: any): AlertRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for AlertRuleUnion */
export type AlertRuleUnion =
  | MLBehaviorAnalyticsAlertRule
  | FusionAlertRule
  | ThreatIntelligenceAlertRule
  | MicrosoftSecurityIncidentCreationAlertRule
  | ScheduledAlertRule
  | NrtAlertRule
  | AlertRule;

export function alertRuleUnionSerializer(item: AlertRuleUnion): any {
  switch (item.kind) {
    case "MLBehaviorAnalytics":
      return mlBehaviorAnalyticsAlertRuleSerializer(item as MLBehaviorAnalyticsAlertRule);

    case "Fusion":
      return fusionAlertRuleSerializer(item as FusionAlertRule);

    case "ThreatIntelligence":
      return threatIntelligenceAlertRuleSerializer(item as ThreatIntelligenceAlertRule);

    case "MicrosoftSecurityIncidentCreation":
      return microsoftSecurityIncidentCreationAlertRuleSerializer(
        item as MicrosoftSecurityIncidentCreationAlertRule,
      );

    case "Scheduled":
      return scheduledAlertRuleSerializer(item as ScheduledAlertRule);

    case "NRT":
      return nrtAlertRuleSerializer(item as NrtAlertRule);

    default:
      return alertRuleSerializer(item);
  }
}

export function alertRuleUnionDeserializer(item: any): AlertRuleUnion {
  switch (item["kind"]) {
    case "MLBehaviorAnalytics":
      return mlBehaviorAnalyticsAlertRuleDeserializer(item as MLBehaviorAnalyticsAlertRule);

    case "Fusion":
      return fusionAlertRuleDeserializer(item as FusionAlertRule);

    case "ThreatIntelligence":
      return threatIntelligenceAlertRuleDeserializer(item as ThreatIntelligenceAlertRule);

    case "MicrosoftSecurityIncidentCreation":
      return microsoftSecurityIncidentCreationAlertRuleDeserializer(
        item as MicrosoftSecurityIncidentCreationAlertRule,
      );

    case "Scheduled":
      return scheduledAlertRuleDeserializer(item as ScheduledAlertRule);

    case "NRT":
      return nrtAlertRuleDeserializer(item as NrtAlertRule);

    default:
      return alertRuleDeserializer(item);
  }
}

/** The kind of the alert rule */
export enum KnownAlertRuleKind {
  /** Scheduled */
  Scheduled = "Scheduled",
  /** MicrosoftSecurityIncidentCreation */
  MicrosoftSecurityIncidentCreation = "MicrosoftSecurityIncidentCreation",
  /** Fusion */
  Fusion = "Fusion",
  /** MLBehaviorAnalytics */
  MLBehaviorAnalytics = "MLBehaviorAnalytics",
  /** ThreatIntelligence */
  ThreatIntelligence = "ThreatIntelligence",
  /** NRT */
  NRT = "NRT",
}

/**
 * The kind of the alert rule \
 * {@link KnownAlertRuleKind} can be used interchangeably with AlertRuleKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Scheduled**: Scheduled \
 * **MicrosoftSecurityIncidentCreation**: MicrosoftSecurityIncidentCreation \
 * **Fusion**: Fusion \
 * **MLBehaviorAnalytics**: MLBehaviorAnalytics \
 * **ThreatIntelligence**: ThreatIntelligence \
 * **NRT**: NRT
 */
export type AlertRuleKind = string;

/** Represents MLBehaviorAnalytics alert rule. */
export interface MLBehaviorAnalyticsAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "MLBehaviorAnalytics";
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function mlBehaviorAnalyticsAlertRuleSerializer(item: MLBehaviorAnalyticsAlertRule): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["alertRuleTemplateName", "enabled"])
      ? undefined
      : _mlBehaviorAnalyticsAlertRulePropertiesSerializer(item),
  };
}

export function mlBehaviorAnalyticsAlertRuleDeserializer(item: any): MLBehaviorAnalyticsAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mlBehaviorAnalyticsAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** MLBehaviorAnalytics alert rule base property bag. */
export interface MLBehaviorAnalyticsAlertRuleProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function mlBehaviorAnalyticsAlertRulePropertiesSerializer(
  item: MLBehaviorAnalyticsAlertRuleProperties,
): any {
  return { alertRuleTemplateName: item["alertRuleTemplateName"], enabled: item["enabled"] };
}

export function mlBehaviorAnalyticsAlertRulePropertiesDeserializer(
  item: any,
): MLBehaviorAnalyticsAlertRuleProperties {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

/** The severity of the alert */
export enum KnownAlertSeverity {
  /** High severity */
  High = "High",
  /** Medium severity */
  Medium = "Medium",
  /** Low severity */
  Low = "Low",
  /** Informational severity */
  Informational = "Informational",
}

/**
 * The severity of the alert \
 * {@link KnownAlertSeverity} can be used interchangeably with AlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High severity \
 * **Medium**: Medium severity \
 * **Low**: Low severity \
 * **Informational**: Informational severity
 */
export type AlertSeverity = string;

/** The severity for alerts created by this alert rule. */
export enum KnownAttackTactic {
  /** Reconnaissance */
  Reconnaissance = "Reconnaissance",
  /** ResourceDevelopment */
  ResourceDevelopment = "ResourceDevelopment",
  /** InitialAccess */
  InitialAccess = "InitialAccess",
  /** Execution */
  Execution = "Execution",
  /** Persistence */
  Persistence = "Persistence",
  /** PrivilegeEscalation */
  PrivilegeEscalation = "PrivilegeEscalation",
  /** DefenseEvasion */
  DefenseEvasion = "DefenseEvasion",
  /** CredentialAccess */
  CredentialAccess = "CredentialAccess",
  /** Discovery */
  Discovery = "Discovery",
  /** LateralMovement */
  LateralMovement = "LateralMovement",
  /** Collection */
  Collection = "Collection",
  /** Exfiltration */
  Exfiltration = "Exfiltration",
  /** CommandAndControl */
  CommandAndControl = "CommandAndControl",
  /** Impact */
  Impact = "Impact",
  /** PreAttack */
  PreAttack = "PreAttack",
  /** ImpairProcessControl */
  ImpairProcessControl = "ImpairProcessControl",
  /** InhibitResponseFunction */
  InhibitResponseFunction = "InhibitResponseFunction",
}

/**
 * The severity for alerts created by this alert rule. \
 * {@link KnownAttackTactic} can be used interchangeably with AttackTactic,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Reconnaissance**: Reconnaissance \
 * **ResourceDevelopment**: ResourceDevelopment \
 * **InitialAccess**: InitialAccess \
 * **Execution**: Execution \
 * **Persistence**: Persistence \
 * **PrivilegeEscalation**: PrivilegeEscalation \
 * **DefenseEvasion**: DefenseEvasion \
 * **CredentialAccess**: CredentialAccess \
 * **Discovery**: Discovery \
 * **LateralMovement**: LateralMovement \
 * **Collection**: Collection \
 * **Exfiltration**: Exfiltration \
 * **CommandAndControl**: CommandAndControl \
 * **Impact**: Impact \
 * **PreAttack**: PreAttack \
 * **ImpairProcessControl**: ImpairProcessControl \
 * **InhibitResponseFunction**: InhibitResponseFunction
 */
export type AttackTactic = string;

/** Represents Fusion alert rule. */
export interface FusionAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "Fusion";
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** Configuration for all supported source signals in fusion detection. */
  sourceSettings?: FusionSourceSettings[];
  /** Configuration to exclude scenarios in fusion detection. */
  scenarioExclusionPatterns?: FusionScenarioExclusionPattern[];
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function fusionAlertRuleSerializer(item: FusionAlertRule): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "alertRuleTemplateName",
      "enabled",
      "sourceSettings",
      "scenarioExclusionPatterns",
    ])
      ? undefined
      : _fusionAlertRulePropertiesSerializer(item),
  };
}

export function fusionAlertRuleDeserializer(item: any): FusionAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fusionAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** Fusion alert rule base property bag. */
export interface FusionAlertRuleProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** Configuration for all supported source signals in fusion detection. */
  sourceSettings?: FusionSourceSettings[];
  /** Configuration to exclude scenarios in fusion detection. */
  scenarioExclusionPatterns?: FusionScenarioExclusionPattern[];
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function fusionAlertRulePropertiesSerializer(item: FusionAlertRuleProperties): any {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    enabled: item["enabled"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionSourceSettingsArraySerializer(item["sourceSettings"]),
    scenarioExclusionPatterns: !item["scenarioExclusionPatterns"]
      ? item["scenarioExclusionPatterns"]
      : fusionScenarioExclusionPatternArraySerializer(item["scenarioExclusionPatterns"]),
  };
}

export function fusionAlertRulePropertiesDeserializer(item: any): FusionAlertRuleProperties {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionSourceSettingsArrayDeserializer(item["sourceSettings"]),
    scenarioExclusionPatterns: !item["scenarioExclusionPatterns"]
      ? item["scenarioExclusionPatterns"]
      : fusionScenarioExclusionPatternArrayDeserializer(item["scenarioExclusionPatterns"]),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

export function fusionSourceSettingsArraySerializer(result: Array<FusionSourceSettings>): any[] {
  return result.map((item) => {
    return fusionSourceSettingsSerializer(item);
  });
}

export function fusionSourceSettingsArrayDeserializer(result: Array<FusionSourceSettings>): any[] {
  return result.map((item) => {
    return fusionSourceSettingsDeserializer(item);
  });
}

/** Represents a supported source signal configuration in Fusion detection. */
export interface FusionSourceSettings {
  /** Determines whether this source signal is enabled or disabled in Fusion detection. */
  enabled: boolean;
  /** Name of the Fusion source signal. Refer to Fusion alert rule template for supported values. */
  sourceName: string;
  /** Configuration for all source subtypes under this source signal consumed in fusion detection. */
  sourceSubTypes?: FusionSourceSubTypeSetting[];
}

export function fusionSourceSettingsSerializer(item: FusionSourceSettings): any {
  return {
    enabled: item["enabled"],
    sourceName: item["sourceName"],
    sourceSubTypes: !item["sourceSubTypes"]
      ? item["sourceSubTypes"]
      : fusionSourceSubTypeSettingArraySerializer(item["sourceSubTypes"]),
  };
}

export function fusionSourceSettingsDeserializer(item: any): FusionSourceSettings {
  return {
    enabled: item["enabled"],
    sourceName: item["sourceName"],
    sourceSubTypes: !item["sourceSubTypes"]
      ? item["sourceSubTypes"]
      : fusionSourceSubTypeSettingArrayDeserializer(item["sourceSubTypes"]),
  };
}

export function fusionSourceSubTypeSettingArraySerializer(
  result: Array<FusionSourceSubTypeSetting>,
): any[] {
  return result.map((item) => {
    return fusionSourceSubTypeSettingSerializer(item);
  });
}

export function fusionSourceSubTypeSettingArrayDeserializer(
  result: Array<FusionSourceSubTypeSetting>,
): any[] {
  return result.map((item) => {
    return fusionSourceSubTypeSettingDeserializer(item);
  });
}

/** Represents a supported source subtype configuration under a source signal in Fusion detection. */
export interface FusionSourceSubTypeSetting {
  /** Determines whether this source subtype under source signal is enabled or disabled in Fusion detection. */
  enabled: boolean;
  /** The Name of the source subtype under a given source signal in Fusion detection. Refer to Fusion alert rule template for supported values. */
  sourceSubTypeName: string;
  /** The display name of source subtype under a source signal consumed in Fusion detection. */
  readonly sourceSubTypeDisplayName?: string;
  /** Severity configuration for a source subtype consumed in fusion detection. */
  severityFilters: FusionSubTypeSeverityFilter;
}

export function fusionSourceSubTypeSettingSerializer(item: FusionSourceSubTypeSetting): any {
  return {
    enabled: item["enabled"],
    sourceSubTypeName: item["sourceSubTypeName"],
    severityFilters: fusionSubTypeSeverityFilterSerializer(item["severityFilters"]),
  };
}

export function fusionSourceSubTypeSettingDeserializer(item: any): FusionSourceSubTypeSetting {
  return {
    enabled: item["enabled"],
    sourceSubTypeName: item["sourceSubTypeName"],
    sourceSubTypeDisplayName: item["sourceSubTypeDisplayName"],
    severityFilters: fusionSubTypeSeverityFilterDeserializer(item["severityFilters"]),
  };
}

/** Represents severity configuration for a source subtype consumed in Fusion detection. */
export interface FusionSubTypeSeverityFilter {
  /** Determines whether this source subtype supports severity configuration or not. */
  readonly isSupported?: boolean;
  /** Individual Severity configuration settings for a given source subtype consumed in Fusion detection. */
  filters?: FusionSubTypeSeverityFiltersItem[];
}

export function fusionSubTypeSeverityFilterSerializer(item: FusionSubTypeSeverityFilter): any {
  return {
    filters: !item["filters"]
      ? item["filters"]
      : fusionSubTypeSeverityFiltersItemArraySerializer(item["filters"]),
  };
}

export function fusionSubTypeSeverityFilterDeserializer(item: any): FusionSubTypeSeverityFilter {
  return {
    isSupported: item["isSupported"],
    filters: !item["filters"]
      ? item["filters"]
      : fusionSubTypeSeverityFiltersItemArrayDeserializer(item["filters"]),
  };
}

export function fusionSubTypeSeverityFiltersItemArraySerializer(
  result: Array<FusionSubTypeSeverityFiltersItem>,
): any[] {
  return result.map((item) => {
    return fusionSubTypeSeverityFiltersItemSerializer(item);
  });
}

export function fusionSubTypeSeverityFiltersItemArrayDeserializer(
  result: Array<FusionSubTypeSeverityFiltersItem>,
): any[] {
  return result.map((item) => {
    return fusionSubTypeSeverityFiltersItemDeserializer(item);
  });
}

/** Represents a Severity filter setting for a given source subtype consumed in Fusion detection. */
export interface FusionSubTypeSeverityFiltersItem {
  /** The Severity for a given source subtype consumed in Fusion detection. */
  severity: AlertSeverity;
  /** Determines whether this severity is enabled or disabled for this source subtype consumed in Fusion detection. */
  enabled: boolean;
}

export function fusionSubTypeSeverityFiltersItemSerializer(
  item: FusionSubTypeSeverityFiltersItem,
): any {
  return { severity: item["severity"], enabled: item["enabled"] };
}

export function fusionSubTypeSeverityFiltersItemDeserializer(
  item: any,
): FusionSubTypeSeverityFiltersItem {
  return {
    severity: item["severity"],
    enabled: item["enabled"],
  };
}

export function fusionScenarioExclusionPatternArraySerializer(
  result: Array<FusionScenarioExclusionPattern>,
): any[] {
  return result.map((item) => {
    return fusionScenarioExclusionPatternSerializer(item);
  });
}

export function fusionScenarioExclusionPatternArrayDeserializer(
  result: Array<FusionScenarioExclusionPattern>,
): any[] {
  return result.map((item) => {
    return fusionScenarioExclusionPatternDeserializer(item);
  });
}

/** Represents a Fusion scenario exclusion patterns in Fusion detection. */
export interface FusionScenarioExclusionPattern {
  /** Scenario exclusion pattern. */
  exclusionPattern: string;
  /** DateTime when scenario exclusion pattern is added in UTC. */
  dateAddedInUTC: string;
}

export function fusionScenarioExclusionPatternSerializer(
  item: FusionScenarioExclusionPattern,
): any {
  return { exclusionPattern: item["exclusionPattern"], dateAddedInUTC: item["dateAddedInUTC"] };
}

export function fusionScenarioExclusionPatternDeserializer(
  item: any,
): FusionScenarioExclusionPattern {
  return {
    exclusionPattern: item["exclusionPattern"],
    dateAddedInUTC: item["dateAddedInUTC"],
  };
}

/** Represents Threat Intelligence alert rule. */
export interface ThreatIntelligenceAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "ThreatIntelligence";
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function threatIntelligenceAlertRuleSerializer(item: ThreatIntelligenceAlertRule): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["alertRuleTemplateName", "enabled"])
      ? undefined
      : _threatIntelligenceAlertRulePropertiesSerializer(item),
  };
}

export function threatIntelligenceAlertRuleDeserializer(item: any): ThreatIntelligenceAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _threatIntelligenceAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** Threat Intelligence alert rule base property bag. */
export interface ThreatIntelligenceAlertRuleProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName: string;
  /** The description of the alert rule. */
  readonly description?: string;
  /** The display name for alerts created by this alert rule. */
  readonly displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The severity for alerts created by this alert rule. */
  readonly severity?: AlertSeverity;
  /** The tactics of the alert rule */
  readonly tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  readonly techniques?: string[];
  /** The sub-techniques of the alert rule */
  readonly subTechniques?: string[];
}

export function threatIntelligenceAlertRulePropertiesSerializer(
  item: ThreatIntelligenceAlertRuleProperties,
): any {
  return { alertRuleTemplateName: item["alertRuleTemplateName"], enabled: item["enabled"] };
}

export function threatIntelligenceAlertRulePropertiesDeserializer(
  item: any,
): ThreatIntelligenceAlertRuleProperties {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents MicrosoftSecurityIncidentCreation rule. */
export interface MicrosoftSecurityIncidentCreationAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "MicrosoftSecurityIncidentCreation";
  /** the alerts' displayNames on which the cases will be generated */
  displayNamesFilter?: string[];
  /** the alerts' displayNames on which the cases will not be generated */
  displayNamesExcludeFilter?: string[];
  /** The alerts' productName on which the cases will be generated */
  productFilter?: MicrosoftSecurityProductName;
  /** the alerts' severities on which the cases will be generated */
  severitiesFilter?: AlertSeverity[];
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The display name for alerts created by this alert rule. */
  displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
}

export function microsoftSecurityIncidentCreationAlertRuleSerializer(
  item: MicrosoftSecurityIncidentCreationAlertRule,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "displayNamesFilter",
      "displayNamesExcludeFilter",
      "productFilter",
      "severitiesFilter",
      "alertRuleTemplateName",
      "description",
      "displayName",
      "enabled",
    ])
      ? undefined
      : _microsoftSecurityIncidentCreationAlertRulePropertiesSerializer(item),
  };
}

export function microsoftSecurityIncidentCreationAlertRuleDeserializer(
  item: any,
): MicrosoftSecurityIncidentCreationAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _microsoftSecurityIncidentCreationAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** MicrosoftSecurityIncidentCreation rule property bag. */
export interface MicrosoftSecurityIncidentCreationAlertRuleProperties extends MicrosoftSecurityIncidentCreationAlertRuleCommonProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The display name for alerts created by this alert rule. */
  displayName: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** The last time that this alert has been modified. */
  readonly lastModifiedUtc?: Date;
}

export function microsoftSecurityIncidentCreationAlertRulePropertiesSerializer(
  item: MicrosoftSecurityIncidentCreationAlertRuleProperties,
): any {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
  };
}

export function microsoftSecurityIncidentCreationAlertRulePropertiesDeserializer(
  item: any,
): MicrosoftSecurityIncidentCreationAlertRuleProperties {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
  };
}

/** Represents scheduled alert rule. */
export interface ScheduledAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "Scheduled";
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The frequency (in ISO 8601 duration format) for this alert rule to run. */
  queryFrequency?: string;
  /** The period (in ISO 8601 duration format) that this alert rule looks at. */
  queryPeriod?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The operation against the threshold that triggers alert rule. */
  triggerOperator?: TriggerOperator;
  /** The threshold triggers this alert rule. */
  triggerThreshold?: number;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The version of the alert rule template used to create this rule - in format <a.b.c>, where all are numbers, for example 0 <1.0.2> */
  templateVersion?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The display name for alerts created by this alert rule. */
  displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The suppression (in ISO 8601 duration format) to wait since last time this alert rule been triggered. */
  suppressionDuration?: string;
  /** Determines whether the suppression for this alert rule is enabled or disabled. */
  suppressionEnabled?: boolean;
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The settings of the incidents that created from alerts triggered by this analytics rule */
  incidentConfiguration?: IncidentConfiguration;
}

export function scheduledAlertRuleSerializer(item: ScheduledAlertRule): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "query",
      "queryFrequency",
      "queryPeriod",
      "severity",
      "triggerOperator",
      "triggerThreshold",
      "eventGroupingSettings",
      "customDetails",
      "entityMappings",
      "alertDetailsOverride",
      "sentinelEntitiesMappings",
      "alertRuleTemplateName",
      "templateVersion",
      "description",
      "displayName",
      "enabled",
      "suppressionDuration",
      "suppressionEnabled",
      "tactics",
      "techniques",
      "subTechniques",
      "incidentConfiguration",
    ])
      ? undefined
      : _scheduledAlertRulePropertiesSerializer(item),
  };
}

export function scheduledAlertRuleDeserializer(item: any): ScheduledAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _scheduledAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** Scheduled alert rule base property bag. */
export interface ScheduledAlertRuleProperties extends ScheduledAlertRuleCommonProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The version of the alert rule template used to create this rule - in format <a.b.c>, where all are numbers, for example 0 <1.0.2> */
  templateVersion?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The display name for alerts created by this alert rule. */
  displayName: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The suppression (in ISO 8601 duration format) to wait since last time this alert rule been triggered. */
  suppressionDuration: string;
  /** Determines whether the suppression for this alert rule is enabled or disabled. */
  suppressionEnabled: boolean;
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The settings of the incidents that created from alerts triggered by this analytics rule */
  incidentConfiguration?: IncidentConfiguration;
}

export function scheduledAlertRulePropertiesSerializer(item: ScheduledAlertRuleProperties): any {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsSerializer(item["eventGroupingSettings"]),
    customDetails: item["customDetails"],
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArraySerializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideSerializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArraySerializer(item["sentinelEntitiesMappings"]),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationSerializer(item["incidentConfiguration"]),
  };
}

export function scheduledAlertRulePropertiesDeserializer(item: any): ScheduledAlertRuleProperties {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationDeserializer(item["incidentConfiguration"]),
  };
}

/** Incident Configuration property bag. */
export interface IncidentConfiguration {
  /** Create incidents from alerts triggered by this analytics rule */
  createIncident: boolean;
  /** Set how the alerts that are triggered by this analytics rule, are grouped into incidents */
  groupingConfiguration?: GroupingConfiguration;
}

export function incidentConfigurationSerializer(item: IncidentConfiguration): any {
  return {
    createIncident: item["createIncident"],
    groupingConfiguration: !item["groupingConfiguration"]
      ? item["groupingConfiguration"]
      : groupingConfigurationSerializer(item["groupingConfiguration"]),
  };
}

export function incidentConfigurationDeserializer(item: any): IncidentConfiguration {
  return {
    createIncident: item["createIncident"],
    groupingConfiguration: !item["groupingConfiguration"]
      ? item["groupingConfiguration"]
      : groupingConfigurationDeserializer(item["groupingConfiguration"]),
  };
}

/** Grouping configuration property bag. */
export interface GroupingConfiguration {
  /** Grouping enabled */
  enabled: boolean;
  /** Re-open closed matching incidents */
  reopenClosedIncident: boolean;
  /** Limit the group to alerts created within the lookback duration (in ISO 8601 duration format) */
  lookbackDuration: string;
  /** Grouping matching method. When method is Selected at least one of groupByEntities, groupByAlertDetails, groupByCustomDetails must be provided and not empty. */
  matchingMethod: MatchingMethod;
  /** A list of entity types to group by (when matchingMethod is Selected). Only entities defined in the current alert rule may be used. */
  groupByEntities?: EntityMappingType[];
  /** A list of alert details to group by (when matchingMethod is Selected) */
  groupByAlertDetails?: AlertDetail[];
  /** A list of custom details keys to group by (when matchingMethod is Selected). Only keys defined in the current alert rule may be used. */
  groupByCustomDetails?: string[];
}

export function groupingConfigurationSerializer(item: GroupingConfiguration): any {
  return {
    enabled: item["enabled"],
    reopenClosedIncident: item["reopenClosedIncident"],
    lookbackDuration: item["lookbackDuration"],
    matchingMethod: item["matchingMethod"],
    groupByEntities: !item["groupByEntities"]
      ? item["groupByEntities"]
      : item["groupByEntities"].map((p: any) => {
          return p;
        }),
    groupByAlertDetails: !item["groupByAlertDetails"]
      ? item["groupByAlertDetails"]
      : item["groupByAlertDetails"].map((p: any) => {
          return p;
        }),
    groupByCustomDetails: !item["groupByCustomDetails"]
      ? item["groupByCustomDetails"]
      : item["groupByCustomDetails"].map((p: any) => {
          return p;
        }),
  };
}

export function groupingConfigurationDeserializer(item: any): GroupingConfiguration {
  return {
    enabled: item["enabled"],
    reopenClosedIncident: item["reopenClosedIncident"],
    lookbackDuration: item["lookbackDuration"],
    matchingMethod: item["matchingMethod"],
    groupByEntities: !item["groupByEntities"]
      ? item["groupByEntities"]
      : item["groupByEntities"].map((p: any) => {
          return p;
        }),
    groupByAlertDetails: !item["groupByAlertDetails"]
      ? item["groupByAlertDetails"]
      : item["groupByAlertDetails"].map((p: any) => {
          return p;
        }),
    groupByCustomDetails: !item["groupByCustomDetails"]
      ? item["groupByCustomDetails"]
      : item["groupByCustomDetails"].map((p: any) => {
          return p;
        }),
  };
}

/** Grouping matching method. When method is Selected at least one of groupByEntities, groupByAlertDetails, groupByCustomDetails must be provided and not empty. */
export enum KnownMatchingMethod {
  /** Grouping alerts into a single incident if all the entities match */
  AllEntities = "AllEntities",
  /** Grouping any alerts triggered by this rule into a single incident */
  AnyAlert = "AnyAlert",
  /** Grouping alerts into a single incident if the selected entities, custom details and alert details match */
  Selected = "Selected",
}

/**
 * Grouping matching method. When method is Selected at least one of groupByEntities, groupByAlertDetails, groupByCustomDetails must be provided and not empty. \
 * {@link KnownMatchingMethod} can be used interchangeably with MatchingMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllEntities**: Grouping alerts into a single incident if all the entities match \
 * **AnyAlert**: Grouping any alerts triggered by this rule into a single incident \
 * **Selected**: Grouping alerts into a single incident if the selected entities, custom details and alert details match
 */
export type MatchingMethod = string;

/** The V3 type of the mapped entity */
export enum KnownEntityMappingType {
  /** User account entity type */
  Account = "Account",
  /** Host entity type */
  Host = "Host",
  /** IP address entity type */
  IP = "IP",
  /** Malware entity type */
  Malware = "Malware",
  /** System file entity type */
  File = "File",
  /** Process entity type */
  Process = "Process",
  /** Cloud app entity type */
  CloudApplication = "CloudApplication",
  /** DNS entity type */
  DNS = "DNS",
  /** Azure resource entity type */
  AzureResource = "AzureResource",
  /** File-hash entity type */
  FileHash = "FileHash",
  /** Registry key entity type */
  RegistryKey = "RegistryKey",
  /** Registry value entity type */
  RegistryValue = "RegistryValue",
  /** Security group entity type */
  SecurityGroup = "SecurityGroup",
  /** URL entity type */
  URL = "URL",
  /** Mailbox entity type */
  Mailbox = "Mailbox",
  /** Mail cluster entity type */
  MailCluster = "MailCluster",
  /** Mail message entity type */
  MailMessage = "MailMessage",
  /** Submission mail entity type */
  SubmissionMail = "SubmissionMail",
}

/**
 * The V3 type of the mapped entity \
 * {@link KnownEntityMappingType} can be used interchangeably with EntityMappingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Account**: User account entity type \
 * **Host**: Host entity type \
 * **IP**: IP address entity type \
 * **Malware**: Malware entity type \
 * **File**: System file entity type \
 * **Process**: Process entity type \
 * **CloudApplication**: Cloud app entity type \
 * **DNS**: DNS entity type \
 * **AzureResource**: Azure resource entity type \
 * **FileHash**: File-hash entity type \
 * **RegistryKey**: Registry key entity type \
 * **RegistryValue**: Registry value entity type \
 * **SecurityGroup**: Security group entity type \
 * **URL**: URL entity type \
 * **Mailbox**: Mailbox entity type \
 * **MailCluster**: Mail cluster entity type \
 * **MailMessage**: Mail message entity type \
 * **SubmissionMail**: Submission mail entity type
 */
export type EntityMappingType = string;

/** Alert detail */
export enum KnownAlertDetail {
  /** Alert display name */
  DisplayName = "DisplayName",
  /** Alert severity */
  Severity = "Severity",
}

/**
 * Alert detail \
 * {@link KnownAlertDetail} can be used interchangeably with AlertDetail,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DisplayName**: Alert display name \
 * **Severity**: Alert severity
 */
export type AlertDetail = string;

/** Represents NRT alert rule. */
export interface NrtAlertRule extends AlertRule {
  /** The kind of the alert rule */
  kind: "NRT";
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The version of the alert rule template used to create this rule - in format <a.b.c>, where all are numbers, for example 0 <1.0.2> */
  templateVersion?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The display name for alerts created by this alert rule. */
  displayName?: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The suppression (in ISO 8601 duration format) to wait since last time this alert rule been triggered. */
  suppressionDuration?: string;
  /** Determines whether the suppression for this alert rule is enabled or disabled. */
  suppressionEnabled?: boolean;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The settings of the incidents that created from alerts triggered by this analytics rule */
  incidentConfiguration?: IncidentConfiguration;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function nrtAlertRuleSerializer(item: NrtAlertRule): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "alertRuleTemplateName",
      "templateVersion",
      "description",
      "query",
      "tactics",
      "techniques",
      "subTechniques",
      "displayName",
      "enabled",
      "suppressionDuration",
      "suppressionEnabled",
      "severity",
      "incidentConfiguration",
      "customDetails",
      "entityMappings",
      "alertDetailsOverride",
      "eventGroupingSettings",
      "sentinelEntitiesMappings",
    ])
      ? undefined
      : _nrtAlertRulePropertiesSerializer(item),
  };
}

export function nrtAlertRuleDeserializer(item: any): NrtAlertRule {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _nrtAlertRulePropertiesDeserializer(item["properties"])),
  };
}

/** Nrt alert rule base property bag. */
export interface NrtAlertRuleProperties {
  /** The Name of the alert rule template used to create this rule. */
  alertRuleTemplateName?: string;
  /** The version of the alert rule template used to create this rule - in format <a.b.c>, where all are numbers, for example 0 <1.0.2> */
  templateVersion?: string;
  /** The description of the alert rule. */
  description?: string;
  /** The query that creates alerts for this rule. */
  query: string;
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The display name for alerts created by this alert rule. */
  displayName: string;
  /** Determines whether this alert rule is enabled or disabled. */
  enabled: boolean;
  /** The last time that this alert rule has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The suppression (in ISO 8601 duration format) to wait since last time this alert rule been triggered. */
  suppressionDuration: string;
  /** Determines whether the suppression for this alert rule is enabled or disabled. */
  suppressionEnabled: boolean;
  /** The severity for alerts created by this alert rule. */
  severity: AlertSeverity;
  /** The settings of the incidents that created from alerts triggered by this analytics rule */
  incidentConfiguration?: IncidentConfiguration;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function nrtAlertRulePropertiesSerializer(item: NrtAlertRuleProperties): any {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    query: item["query"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    enabled: item["enabled"],
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    severity: item["severity"],
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationSerializer(item["incidentConfiguration"]),
    customDetails: item["customDetails"],
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArraySerializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideSerializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsSerializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArraySerializer(item["sentinelEntitiesMappings"]),
  };
}

export function nrtAlertRulePropertiesDeserializer(item: any): NrtAlertRuleProperties {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    query: item["query"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    severity: item["severity"],
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationDeserializer(item["incidentConfiguration"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

export function entityMappingArraySerializer(result: Array<EntityMapping>): any[] {
  return result.map((item) => {
    return entityMappingSerializer(item);
  });
}

export function entityMappingArrayDeserializer(result: Array<EntityMapping>): any[] {
  return result.map((item) => {
    return entityMappingDeserializer(item);
  });
}

/** Single entity mapping for the alert rule */
export interface EntityMapping {
  /** The V3 type of the mapped entity */
  entityType?: EntityMappingType;
  /** array of field mappings for the given entity mapping */
  fieldMappings?: FieldMapping[];
}

export function entityMappingSerializer(item: EntityMapping): any {
  return {
    entityType: item["entityType"],
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : fieldMappingArraySerializer(item["fieldMappings"]),
  };
}

export function entityMappingDeserializer(item: any): EntityMapping {
  return {
    entityType: item["entityType"],
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : fieldMappingArrayDeserializer(item["fieldMappings"]),
  };
}

export function fieldMappingArraySerializer(result: Array<FieldMapping>): any[] {
  return result.map((item) => {
    return fieldMappingSerializer(item);
  });
}

export function fieldMappingArrayDeserializer(result: Array<FieldMapping>): any[] {
  return result.map((item) => {
    return fieldMappingDeserializer(item);
  });
}

/** A single field mapping of the mapped entity */
export interface FieldMapping {
  /** the V3 identifier of the entity */
  identifier?: string;
  /** the column name to be mapped to the identifier */
  columnName?: string;
}

export function fieldMappingSerializer(item: FieldMapping): any {
  return { identifier: item["identifier"], columnName: item["columnName"] };
}

export function fieldMappingDeserializer(item: any): FieldMapping {
  return {
    identifier: item["identifier"],
    columnName: item["columnName"],
  };
}

/** Settings for how to dynamically override alert static details */
export interface AlertDetailsOverride {
  /** the format containing columns name(s) to override the alert name */
  alertDisplayNameFormat?: string;
  /** the format containing columns name(s) to override the alert description */
  alertDescriptionFormat?: string;
  /** the column name to take the alert tactics from */
  alertTacticsColumnName?: string;
  /** the column name to take the alert severity from */
  alertSeverityColumnName?: string;
  /** List of additional dynamic properties to override */
  alertDynamicProperties?: AlertPropertyMapping[];
}

export function alertDetailsOverrideSerializer(item: AlertDetailsOverride): any {
  return {
    alertDisplayNameFormat: item["alertDisplayNameFormat"],
    alertDescriptionFormat: item["alertDescriptionFormat"],
    alertTacticsColumnName: item["alertTacticsColumnName"],
    alertSeverityColumnName: item["alertSeverityColumnName"],
    alertDynamicProperties: !item["alertDynamicProperties"]
      ? item["alertDynamicProperties"]
      : alertPropertyMappingArraySerializer(item["alertDynamicProperties"]),
  };
}

export function alertDetailsOverrideDeserializer(item: any): AlertDetailsOverride {
  return {
    alertDisplayNameFormat: item["alertDisplayNameFormat"],
    alertDescriptionFormat: item["alertDescriptionFormat"],
    alertTacticsColumnName: item["alertTacticsColumnName"],
    alertSeverityColumnName: item["alertSeverityColumnName"],
    alertDynamicProperties: !item["alertDynamicProperties"]
      ? item["alertDynamicProperties"]
      : alertPropertyMappingArrayDeserializer(item["alertDynamicProperties"]),
  };
}

export function alertPropertyMappingArraySerializer(result: Array<AlertPropertyMapping>): any[] {
  return result.map((item) => {
    return alertPropertyMappingSerializer(item);
  });
}

export function alertPropertyMappingArrayDeserializer(result: Array<AlertPropertyMapping>): any[] {
  return result.map((item) => {
    return alertPropertyMappingDeserializer(item);
  });
}

/** A single alert property mapping to override */
export interface AlertPropertyMapping {
  /** The V3 alert property */
  alertProperty?: AlertProperty;
  /** the column name to use to override this property */
  value?: string;
}

export function alertPropertyMappingSerializer(item: AlertPropertyMapping): any {
  return { alertProperty: item["alertProperty"], value: item["value"] };
}

export function alertPropertyMappingDeserializer(item: any): AlertPropertyMapping {
  return {
    alertProperty: item["alertProperty"],
    value: item["value"],
  };
}

/** The V3 alert property */
export enum KnownAlertProperty {
  /** Alert's link */
  AlertLink = "AlertLink",
  /** Confidence level property */
  ConfidenceLevel = "ConfidenceLevel",
  /** Confidence score */
  ConfidenceScore = "ConfidenceScore",
  /** Extended links to the alert */
  ExtendedLinks = "ExtendedLinks",
  /** Product name alert property */
  ProductName = "ProductName",
  /** Provider name alert property */
  ProviderName = "ProviderName",
  /** Product component name alert property */
  ProductComponentName = "ProductComponentName",
  /** Remediation steps alert property */
  RemediationSteps = "RemediationSteps",
  /** Techniques alert property */
  Techniques = "Techniques",
  /** SubTechniques alert property */
  SubTechniques = "SubTechniques",
}

/**
 * The V3 alert property \
 * {@link KnownAlertProperty} can be used interchangeably with AlertProperty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlertLink**: Alert's link \
 * **ConfidenceLevel**: Confidence level property \
 * **ConfidenceScore**: Confidence score \
 * **ExtendedLinks**: Extended links to the alert \
 * **ProductName**: Product name alert property \
 * **ProviderName**: Provider name alert property \
 * **ProductComponentName**: Product component name alert property \
 * **RemediationSteps**: Remediation steps alert property \
 * **Techniques**: Techniques alert property \
 * **SubTechniques**: SubTechniques alert property
 */
export type AlertProperty = string;

/** Event grouping settings property bag. */
export interface EventGroupingSettings {
  /** The event grouping aggregation kinds */
  aggregationKind?: EventGroupingAggregationKind;
}

export function eventGroupingSettingsSerializer(item: EventGroupingSettings): any {
  return { aggregationKind: item["aggregationKind"] };
}

export function eventGroupingSettingsDeserializer(item: any): EventGroupingSettings {
  return {
    aggregationKind: item["aggregationKind"],
  };
}

/** The event grouping aggregation kinds */
export enum KnownEventGroupingAggregationKind {
  /** SingleAlert */
  SingleAlert = "SingleAlert",
  /** AlertPerResult */
  AlertPerResult = "AlertPerResult",
}

/**
 * The event grouping aggregation kinds \
 * {@link KnownEventGroupingAggregationKind} can be used interchangeably with EventGroupingAggregationKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleAlert**: SingleAlert \
 * **AlertPerResult**: AlertPerResult
 */
export type EventGroupingAggregationKind = string;

export function sentinelEntityMappingArraySerializer(result: Array<SentinelEntityMapping>): any[] {
  return result.map((item) => {
    return sentinelEntityMappingSerializer(item);
  });
}

export function sentinelEntityMappingArrayDeserializer(
  result: Array<SentinelEntityMapping>,
): any[] {
  return result.map((item) => {
    return sentinelEntityMappingDeserializer(item);
  });
}

/** A single sentinel entity mapping */
export interface SentinelEntityMapping {
  /** the column name to be mapped to the SentinelEntities */
  columnName?: string;
}

export function sentinelEntityMappingSerializer(item: SentinelEntityMapping): any {
  return { columnName: item["columnName"] };
}

export function sentinelEntityMappingDeserializer(item: any): SentinelEntityMapping {
  return {
    columnName: item["columnName"],
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** MicrosoftSecurityIncidentCreation rule common property bag. */
export interface MicrosoftSecurityIncidentCreationAlertRuleCommonProperties {
  /** the alerts' displayNames on which the cases will be generated */
  displayNamesFilter?: string[];
  /** the alerts' displayNames on which the cases will not be generated */
  displayNamesExcludeFilter?: string[];
  /** The alerts' productName on which the cases will be generated */
  productFilter: MicrosoftSecurityProductName;
  /** the alerts' severities on which the cases will be generated */
  severitiesFilter?: AlertSeverity[];
}

export function microsoftSecurityIncidentCreationAlertRuleCommonPropertiesSerializer(
  item: MicrosoftSecurityIncidentCreationAlertRuleCommonProperties,
): any {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
  };
}

export function microsoftSecurityIncidentCreationAlertRuleCommonPropertiesDeserializer(
  item: any,
): MicrosoftSecurityIncidentCreationAlertRuleCommonProperties {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
  };
}

/** The alerts' productName on which the cases will be generated */
export enum KnownMicrosoftSecurityProductName {
  /** Microsoft Cloud App Security */
  MicrosoftCloudAppSecurity = "Microsoft Cloud App Security",
  /** Azure Security Center */
  AzureSecurityCenter = "Azure Security Center",
  /** Azure Advanced Threat Protection */
  AzureAdvancedThreatProtection = "Azure Advanced Threat Protection",
  /** Azure Active Directory Identity Protection */
  AzureActiveDirectoryIdentityProtection = "Azure Active Directory Identity Protection",
  /** Azure Security Center for IoT */
  AzureSecurityCenterForIoT = "Azure Security Center for IoT",
  /** Office 365 Advanced Threat Protection */
  Office365AdvancedThreatProtection = "Office 365 Advanced Threat Protection",
  /** Microsoft Defender Advanced Threat Protection */
  MicrosoftDefenderAdvancedThreatProtection = "Microsoft Defender Advanced Threat Protection",
}

/**
 * The alerts' productName on which the cases will be generated \
 * {@link KnownMicrosoftSecurityProductName} can be used interchangeably with MicrosoftSecurityProductName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft Cloud App Security**: Microsoft Cloud App Security \
 * **Azure Security Center**: Azure Security Center \
 * **Azure Advanced Threat Protection**: Azure Advanced Threat Protection \
 * **Azure Active Directory Identity Protection**: Azure Active Directory Identity Protection \
 * **Azure Security Center for IoT**: Azure Security Center for IoT \
 * **Office 365 Advanced Threat Protection**: Office 365 Advanced Threat Protection \
 * **Microsoft Defender Advanced Threat Protection**: Microsoft Defender Advanced Threat Protection
 */
export type MicrosoftSecurityProductName = string;

/** Scheduled alert rule template property bag. */
export interface ScheduledAlertRuleCommonProperties {
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The frequency (in ISO 8601 duration format) for this alert rule to run. */
  queryFrequency?: string;
  /** The period (in ISO 8601 duration format) that this alert rule looks at. */
  queryPeriod?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The operation against the threshold that triggers alert rule. */
  triggerOperator?: TriggerOperator;
  /** The threshold triggers this alert rule. */
  triggerThreshold?: number;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function scheduledAlertRuleCommonPropertiesSerializer(
  item: ScheduledAlertRuleCommonProperties,
): any {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsSerializer(item["eventGroupingSettings"]),
    customDetails: item["customDetails"],
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArraySerializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideSerializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArraySerializer(item["sentinelEntitiesMappings"]),
  };
}

export function scheduledAlertRuleCommonPropertiesDeserializer(
  item: any,
): ScheduledAlertRuleCommonProperties {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

/** The operation against the threshold that triggers alert rule. */
export type TriggerOperator = "GreaterThan" | "LessThan" | "Equal" | "NotEqual";

/** List all the alert rules. */
export interface _AlertRulesList {
  /** The AlertRule items on this page */
  value: AlertRuleUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertRulesListDeserializer(item: any): _AlertRulesList {
  return {
    value: alertRuleUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertRuleUnionArraySerializer(result: Array<AlertRuleUnion>): any[] {
  return result.map((item) => {
    return alertRuleUnionSerializer(item);
  });
}

export function alertRuleUnionArrayDeserializer(result: Array<AlertRuleUnion>): any[] {
  return result.map((item) => {
    return alertRuleUnionDeserializer(item);
  });
}

/** Alert rule template. */
export interface AlertRuleTemplate extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: MLBehaviorAnalytics, Fusion, ThreatIntelligence, MicrosoftSecurityIncidentCreation, Scheduled, NRT */
  kind: AlertRuleKind;
}

export function alertRuleTemplateDeserializer(item: any): AlertRuleTemplate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for AlertRuleTemplateUnion */
export type AlertRuleTemplateUnion =
  | MLBehaviorAnalyticsAlertRuleTemplate
  | FusionAlertRuleTemplate
  | ThreatIntelligenceAlertRuleTemplate
  | MicrosoftSecurityIncidentCreationAlertRuleTemplate
  | ScheduledAlertRuleTemplate
  | NrtAlertRuleTemplate
  | AlertRuleTemplate;

export function alertRuleTemplateUnionDeserializer(item: any): AlertRuleTemplateUnion {
  switch (item["kind"]) {
    case "MLBehaviorAnalytics":
      return mlBehaviorAnalyticsAlertRuleTemplateDeserializer(
        item as MLBehaviorAnalyticsAlertRuleTemplate,
      );

    case "Fusion":
      return fusionAlertRuleTemplateDeserializer(item as FusionAlertRuleTemplate);

    case "ThreatIntelligence":
      return threatIntelligenceAlertRuleTemplateDeserializer(
        item as ThreatIntelligenceAlertRuleTemplate,
      );

    case "MicrosoftSecurityIncidentCreation":
      return microsoftSecurityIncidentCreationAlertRuleTemplateDeserializer(
        item as MicrosoftSecurityIncidentCreationAlertRuleTemplate,
      );

    case "Scheduled":
      return scheduledAlertRuleTemplateDeserializer(item as ScheduledAlertRuleTemplate);

    case "NRT":
      return nrtAlertRuleTemplateDeserializer(item as NrtAlertRuleTemplate);

    default:
      return alertRuleTemplateDeserializer(item);
  }
}

/** Represents MLBehaviorAnalytics alert rule template. */
export interface MLBehaviorAnalyticsAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "MLBehaviorAnalytics";
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
}

export function mlBehaviorAnalyticsAlertRuleTemplateDeserializer(
  item: any,
): MLBehaviorAnalyticsAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mlBehaviorAnalyticsAlertRuleTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** MLBehaviorAnalytics alert rule template properties. */
export interface MLBehaviorAnalyticsAlertRuleTemplateProperties extends AlertRuleTemplateWithMitreProperties {
  /** The severity for alerts created by this alert rule. */
  severity: AlertSeverity;
}

export function mlBehaviorAnalyticsAlertRuleTemplatePropertiesDeserializer(
  item: any,
): MLBehaviorAnalyticsAlertRuleTemplateProperties {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
  };
}

/** Represents Fusion alert rule template. */
export interface FusionAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "Fusion";
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The time that this alert rule template was last updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data connectors for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The tactics of the alert rule template */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** All supported source signal configurations consumed in fusion detection. */
  sourceSettings?: FusionTemplateSourceSetting[];
}

export function fusionAlertRuleTemplateDeserializer(item: any): FusionAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fusionAlertRuleTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** Fusion alert rule template properties */
export interface FusionAlertRuleTemplateProperties {
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The time that this alert rule template was last updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data connectors for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The tactics of the alert rule template */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** All supported source signal configurations consumed in fusion detection. */
  sourceSettings?: FusionTemplateSourceSetting[];
}

export function fusionAlertRuleTemplatePropertiesDeserializer(
  item: any,
): FusionAlertRuleTemplateProperties {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionTemplateSourceSettingArrayDeserializer(item["sourceSettings"]),
  };
}

export function alertRuleTemplateDataSourceArrayDeserializer(
  result: Array<AlertRuleTemplateDataSource>,
): any[] {
  return result.map((item) => {
    return alertRuleTemplateDataSourceDeserializer(item);
  });
}

/** alert rule template data sources */
export interface AlertRuleTemplateDataSource {
  /** The connector id that provides the following data types */
  connectorId?: string;
  /** The data types used by the alert rule template */
  dataTypes?: string[];
}

export function alertRuleTemplateDataSourceDeserializer(item: any): AlertRuleTemplateDataSource {
  return {
    connectorId: item["connectorId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : item["dataTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The alert rule template status. */
export enum KnownTemplateStatus {
  /** Alert rule template installed. and can not use more then once */
  Installed = "Installed",
  /** Alert rule template is available. */
  Available = "Available",
  /** Alert rule template is not available */
  NotAvailable = "NotAvailable",
}

/**
 * The alert rule template status. \
 * {@link KnownTemplateStatus} can be used interchangeably with TemplateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Installed**: Alert rule template installed. and can not use more then once \
 * **Available**: Alert rule template is available. \
 * **NotAvailable**: Alert rule template is not available
 */
export type TemplateStatus = string;

export function fusionTemplateSourceSettingArrayDeserializer(
  result: Array<FusionTemplateSourceSetting>,
): any[] {
  return result.map((item) => {
    return fusionTemplateSourceSettingDeserializer(item);
  });
}

/** Represents a source signal consumed in Fusion detection. */
export interface FusionTemplateSourceSetting {
  /** The name of a source signal consumed in Fusion detection. */
  sourceName: string;
  /** All supported source subtypes under this source signal consumed in fusion detection. */
  sourceSubTypes?: FusionTemplateSourceSubType[];
}

export function fusionTemplateSourceSettingDeserializer(item: any): FusionTemplateSourceSetting {
  return {
    sourceName: item["sourceName"],
    sourceSubTypes: !item["sourceSubTypes"]
      ? item["sourceSubTypes"]
      : fusionTemplateSourceSubTypeArrayDeserializer(item["sourceSubTypes"]),
  };
}

export function fusionTemplateSourceSubTypeArrayDeserializer(
  result: Array<FusionTemplateSourceSubType>,
): any[] {
  return result.map((item) => {
    return fusionTemplateSourceSubTypeDeserializer(item);
  });
}

/** Represents a source subtype under a source signal consumed in Fusion detection. */
export interface FusionTemplateSourceSubType {
  /** The name of source subtype under a source signal consumed in Fusion detection. */
  sourceSubTypeName: string;
  /** The display name of source subtype under a source signal consumed in Fusion detection. */
  readonly sourceSubTypeDisplayName?: string;
  /** Severity configuration available for a source subtype consumed in fusion detection. */
  severityFilter: FusionTemplateSubTypeSeverityFilter;
}

export function fusionTemplateSourceSubTypeDeserializer(item: any): FusionTemplateSourceSubType {
  return {
    sourceSubTypeName: item["sourceSubTypeName"],
    sourceSubTypeDisplayName: item["sourceSubTypeDisplayName"],
    severityFilter: fusionTemplateSubTypeSeverityFilterDeserializer(item["severityFilter"]),
  };
}

/** Represents severity configurations available for a source subtype consumed in Fusion detection. */
export interface FusionTemplateSubTypeSeverityFilter {
  /** Determines whether severity configuration is supported for this source subtype consumed in Fusion detection. */
  isSupported: boolean;
  /** List of all supported severities for this source subtype consumed in Fusion detection. */
  severityFilters?: AlertSeverity[];
}

export function fusionTemplateSubTypeSeverityFilterDeserializer(
  item: any,
): FusionTemplateSubTypeSeverityFilter {
  return {
    isSupported: item["isSupported"],
    severityFilters: !item["severityFilters"]
      ? item["severityFilters"]
      : item["severityFilters"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents Threat Intelligence alert rule template. */
export interface ThreatIntelligenceAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "ThreatIntelligence";
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
}

export function threatIntelligenceAlertRuleTemplateDeserializer(
  item: any,
): ThreatIntelligenceAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _threatIntelligenceAlertRuleTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** Threat Intelligence alert rule template properties */
export interface ThreatIntelligenceAlertRuleTemplateProperties extends AlertRuleTemplateWithMitreProperties {
  /** The severity for alerts created by this alert rule. */
  severity: AlertSeverity;
}

export function threatIntelligenceAlertRuleTemplatePropertiesDeserializer(
  item: any,
): ThreatIntelligenceAlertRuleTemplateProperties {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
  };
}

/** Represents MicrosoftSecurityIncidentCreation rule template. */
export interface MicrosoftSecurityIncidentCreationAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "MicrosoftSecurityIncidentCreation";
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** the alerts' displayNames on which the cases will be generated */
  displayNamesFilter?: string[];
  /** the alerts' displayNames on which the cases will not be generated */
  displayNamesExcludeFilter?: string[];
  /** The alerts' productName on which the cases will be generated */
  productFilter?: MicrosoftSecurityProductName;
  /** the alerts' severities on which the cases will be generated */
  severitiesFilter?: AlertSeverity[];
}

export function microsoftSecurityIncidentCreationAlertRuleTemplateDeserializer(
  item: any,
): MicrosoftSecurityIncidentCreationAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _microsoftSecurityIncidentCreationAlertRuleTemplatePropertiesDeserializer(
          item["properties"],
        )),
  };
}

/** MicrosoftSecurityIncidentCreation rule template properties */
export interface MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties extends AlertRuleTemplatePropertiesBase {
  /** the alerts' displayNames on which the cases will be generated */
  displayNamesFilter?: string[];
  /** the alerts' displayNames on which the cases will not be generated */
  displayNamesExcludeFilter?: string[];
  /** The alerts' productName on which the cases will be generated */
  productFilter?: MicrosoftSecurityProductName;
  /** the alerts' severities on which the cases will be generated */
  severitiesFilter?: AlertSeverity[];
}

export function microsoftSecurityIncidentCreationAlertRuleTemplatePropertiesDeserializer(
  item: any,
): MicrosoftSecurityIncidentCreationAlertRuleTemplateProperties {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents scheduled alert rule template. */
export interface ScheduledAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "Scheduled";
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The time that this alert rule template was last updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data connectors for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The frequency (in ISO 8601 duration format) for this alert rule to run. */
  queryFrequency?: string;
  /** The period (in ISO 8601 duration format) that this alert rule looks at. */
  queryPeriod?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The operation against the threshold that triggers alert rule. */
  triggerOperator?: TriggerOperator;
  /** The threshold triggers this alert rule. */
  triggerThreshold?: number;
  /** The tactics of the alert rule template */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The version of this template - in format <a.b.c>, where all are numbers. For example <1.0.2>. */
  version?: string;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function scheduledAlertRuleTemplateDeserializer(item: any): ScheduledAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _scheduledAlertRuleTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** Scheduled alert rule template properties */
export interface ScheduledAlertRuleTemplateProperties {
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The time that this alert rule template was last updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data connectors for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The frequency (in ISO 8601 duration format) for this alert rule to run. */
  queryFrequency?: string;
  /** The period (in ISO 8601 duration format) that this alert rule looks at. */
  queryPeriod?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The operation against the threshold that triggers alert rule. */
  triggerOperator?: TriggerOperator;
  /** The threshold triggers this alert rule. */
  triggerThreshold?: number;
  /** The tactics of the alert rule template */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The sub-techniques of the alert rule */
  subTechniques?: string[];
  /** The version of this template - in format <a.b.c>, where all are numbers. For example <1.0.2>. */
  version?: string;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function scheduledAlertRuleTemplatePropertiesDeserializer(
  item: any,
): ScheduledAlertRuleTemplateProperties {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    version: item["version"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

/** Represents NRT alert rule template. */
export interface NrtAlertRuleTemplate extends AlertRuleTemplate {
  /** The kind of the alert rule */
  kind: "NRT";
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The version of this template - in format <a.b.c>, where all are numbers. For example <1.0.2>. */
  version?: string;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function nrtAlertRuleTemplateDeserializer(item: any): NrtAlertRuleTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _nrtAlertRuleTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** NRT alert rule template properties */
export interface NrtAlertRuleTemplateProperties {
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
  /** The query that creates alerts for this rule. */
  query?: string;
  /** The severity for alerts created by this alert rule. */
  severity?: AlertSeverity;
  /** The version of this template - in format <a.b.c>, where all are numbers. For example <1.0.2>. */
  version?: string;
  /** Dictionary of string key-value pairs of columns to be attached to the alert */
  customDetails?: Record<string, string>;
  /** Array of the entity mappings of the alert rule */
  entityMappings?: EntityMapping[];
  /** The alert details override settings */
  alertDetailsOverride?: AlertDetailsOverride;
  /** The event grouping settings. */
  eventGroupingSettings?: EventGroupingSettings;
  /** Array of the sentinel entity mappings of the alert rule */
  sentinelEntitiesMappings?: SentinelEntityMapping[];
}

export function nrtAlertRuleTemplatePropertiesDeserializer(
  item: any,
): NrtAlertRuleTemplateProperties {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    query: item["query"],
    severity: item["severity"],
    version: item["version"],
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

/** Alert rule template with MITRE property bag. */
export interface AlertRuleTemplateWithMitreProperties extends AlertRuleTemplatePropertiesBase {
  /** The tactics of the alert rule */
  tactics?: AttackTactic[];
  /** The techniques of the alert rule */
  techniques?: string[];
}

export function alertRuleTemplateWithMitrePropertiesDeserializer(
  item: any,
): AlertRuleTemplateWithMitreProperties {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

/** Base alert rule template property bag. */
export interface AlertRuleTemplatePropertiesBase {
  /** The number of alert rules that were created by this template */
  alertRulesCreatedByTemplateCount?: number;
  /** The last time that this alert rule template has been updated. */
  readonly lastUpdatedDateUTC?: Date;
  /** The time that this alert rule template has been added. */
  readonly createdDateUTC?: Date;
  /** The description of the alert rule template. */
  description?: string;
  /** The display name for alert rule template. */
  displayName?: string;
  /** The required data sources for this template */
  requiredDataConnectors?: AlertRuleTemplateDataSource[];
  /** The alert rule template status. */
  status?: TemplateStatus;
}

export function alertRuleTemplatePropertiesBaseDeserializer(
  item: any,
): AlertRuleTemplatePropertiesBase {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
  };
}

/** List all the alert rule templates. */
export interface _AlertRuleTemplatesList {
  /** The AlertRuleTemplate items on this page */
  value: AlertRuleTemplateUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertRuleTemplatesListDeserializer(item: any): _AlertRuleTemplatesList {
  return {
    value: alertRuleTemplateUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertRuleTemplateUnionArrayDeserializer(
  result: Array<AlertRuleTemplateUnion>,
): any[] {
  return result.map((item) => {
    return alertRuleTemplateUnionDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface AutomationRule extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The display name of the automation rule. */
  displayName: string;
  /** The order of execution of the automation rule. */
  order: number;
  /** Describes automation rule triggering logic. */
  triggeringLogic: AutomationRuleTriggeringLogic;
  /** The actions to execute when the automation rule is triggered. */
  actions: AutomationRuleActionUnion[];
  /** The last time the automation rule was updated. */
  readonly lastModifiedTimeUtc?: Date;
  /** The time the automation rule was created. */
  readonly createdTimeUtc?: Date;
  /** Information on the client (user or application) that made some action */
  readonly lastModifiedBy?: ClientInfo;
  /** Information on the client (user or application) that made some action */
  readonly createdBy?: ClientInfo;
}

export function automationRuleSerializer(item: AutomationRule): any {
  return { properties: _automationRulePropertiesSerializer(item), etag: item["etag"] };
}

export function automationRuleDeserializer(item: any): AutomationRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._automationRulePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Automation rule properties */
export interface AutomationRuleProperties {
  /** The display name of the automation rule. */
  displayName: string;
  /** The order of execution of the automation rule. */
  order: number;
  /** Describes automation rule triggering logic. */
  triggeringLogic: AutomationRuleTriggeringLogic;
  /** The actions to execute when the automation rule is triggered. */
  actions: AutomationRuleActionUnion[];
  /** The last time the automation rule was updated. */
  readonly lastModifiedTimeUtc?: Date;
  /** The time the automation rule was created. */
  readonly createdTimeUtc?: Date;
  /** Information on the client (user or application) that made some action */
  readonly lastModifiedBy?: ClientInfo;
  /** Information on the client (user or application) that made some action */
  readonly createdBy?: ClientInfo;
}

export function automationRulePropertiesSerializer(item: AutomationRuleProperties): any {
  return {
    displayName: item["displayName"],
    order: item["order"],
    triggeringLogic: automationRuleTriggeringLogicSerializer(item["triggeringLogic"]),
    actions: automationRuleActionUnionArraySerializer(item["actions"]),
  };
}

export function automationRulePropertiesDeserializer(item: any): AutomationRuleProperties {
  return {
    displayName: item["displayName"],
    order: item["order"],
    triggeringLogic: automationRuleTriggeringLogicDeserializer(item["triggeringLogic"]),
    actions: automationRuleActionUnionArrayDeserializer(item["actions"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoDeserializer(item["lastModifiedBy"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoDeserializer(item["createdBy"]),
  };
}

/** Describes automation rule triggering logic. */
export interface AutomationRuleTriggeringLogic {
  /** Determines whether the automation rule is enabled or disabled. */
  isEnabled: boolean;
  /** Determines when the automation rule should automatically expire and be disabled. */
  expirationTimeUtc?: Date;
  triggersOn: TriggersOn;
  triggersWhen: TriggersWhen;
  /** The conditions to evaluate to determine if the automation rule should be triggered on a given object. */
  conditions?: AutomationRuleConditionUnion[];
}

export function automationRuleTriggeringLogicSerializer(item: AutomationRuleTriggeringLogic): any {
  return {
    isEnabled: item["isEnabled"],
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : item["expirationTimeUtc"].toISOString(),
    triggersOn: item["triggersOn"],
    triggersWhen: item["triggersWhen"],
    conditions: !item["conditions"]
      ? item["conditions"]
      : automationRuleConditionUnionArraySerializer(item["conditions"]),
  };
}

export function automationRuleTriggeringLogicDeserializer(
  item: any,
): AutomationRuleTriggeringLogic {
  return {
    isEnabled: item["isEnabled"],
    expirationTimeUtc: !item["expirationTimeUtc"]
      ? item["expirationTimeUtc"]
      : new Date(item["expirationTimeUtc"]),
    triggersOn: item["triggersOn"],
    triggersWhen: item["triggersWhen"],
    conditions: !item["conditions"]
      ? item["conditions"]
      : automationRuleConditionUnionArrayDeserializer(item["conditions"]),
  };
}

/** Known values of {@link TriggersOn} that the service accepts. */
export enum KnownTriggersOn {
  /** Trigger on Incidents */
  Incidents = "Incidents",
  /** Trigger on Alerts */
  Alerts = "Alerts",
}

/** Type of TriggersOn */
export type TriggersOn = string;

/** Known values of {@link TriggersWhen} that the service accepts. */
export enum KnownTriggersWhen {
  /** Trigger on created objects */
  Created = "Created",
  /** Trigger on updated objects */
  Updated = "Updated",
}

/** Type of TriggersWhen */
export type TriggersWhen = string;

export function automationRuleConditionUnionArraySerializer(
  result: Array<AutomationRuleConditionUnion>,
): any[] {
  return result.map((item) => {
    return automationRuleConditionUnionSerializer(item);
  });
}

export function automationRuleConditionUnionArrayDeserializer(
  result: Array<AutomationRuleConditionUnion>,
): any[] {
  return result.map((item) => {
    return automationRuleConditionUnionDeserializer(item);
  });
}

/** Describes an automation rule condition. */
export interface AutomationRuleCondition {
  conditionType: ConditionType;
}

export function automationRuleConditionSerializer(item: AutomationRuleCondition): any {
  return { conditionType: item["conditionType"] };
}

export function automationRuleConditionDeserializer(item: any): AutomationRuleCondition {
  return {
    conditionType: item["conditionType"],
  };
}

/** Alias for AutomationRuleConditionUnion */
export type AutomationRuleConditionUnion =
  | BooleanConditionProperties
  | PropertyArrayChangedConditionProperties
  | PropertyArrayConditionProperties
  | PropertyChangedConditionProperties
  | PropertyConditionProperties
  | AutomationRuleCondition;

export function automationRuleConditionUnionSerializer(item: AutomationRuleConditionUnion): any {
  switch (item.conditionType) {
    case "Boolean":
      return booleanConditionPropertiesSerializer(item as BooleanConditionProperties);

    case "PropertyArrayChanged":
      return propertyArrayChangedConditionPropertiesSerializer(
        item as PropertyArrayChangedConditionProperties,
      );

    case "PropertyArray":
      return propertyArrayConditionPropertiesSerializer(item as PropertyArrayConditionProperties);

    case "PropertyChanged":
      return propertyChangedConditionPropertiesSerializer(
        item as PropertyChangedConditionProperties,
      );

    case "Property":
      return propertyConditionPropertiesSerializer(item as PropertyConditionProperties);

    default:
      return automationRuleConditionSerializer(item);
  }
}

export function automationRuleConditionUnionDeserializer(item: any): AutomationRuleConditionUnion {
  switch (item["conditionType"]) {
    case "Boolean":
      return booleanConditionPropertiesDeserializer(item as BooleanConditionProperties);

    case "PropertyArrayChanged":
      return propertyArrayChangedConditionPropertiesDeserializer(
        item as PropertyArrayChangedConditionProperties,
      );

    case "PropertyArray":
      return propertyArrayConditionPropertiesDeserializer(item as PropertyArrayConditionProperties);

    case "PropertyChanged":
      return propertyChangedConditionPropertiesDeserializer(
        item as PropertyChangedConditionProperties,
      );

    case "Property":
      return propertyConditionPropertiesDeserializer(item as PropertyConditionProperties);

    default:
      return automationRuleConditionDeserializer(item);
  }
}

/** Known values of {@link ConditionType} that the service accepts. */
export enum KnownConditionType {
  /** Evaluate an object property value */
  Property = "Property",
  /** Evaluate an object array property value */
  PropertyArray = "PropertyArray",
  /** Evaluate an object property changed value */
  PropertyChanged = "PropertyChanged",
  /** Evaluate an object array property changed value */
  PropertyArrayChanged = "PropertyArrayChanged",
  /** Apply a boolean operator (e.g AND, OR) to conditions */
  Boolean = "Boolean",
}

/** Type of ConditionType */
export type ConditionType = string;

/** Describes an automation rule condition that applies a boolean operator (e.g AND, OR) to conditions */
export interface BooleanConditionProperties extends AutomationRuleCondition {
  conditionProperties?: AutomationRuleBooleanCondition;
  conditionType: "Boolean";
}

export function booleanConditionPropertiesSerializer(item: BooleanConditionProperties): any {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRuleBooleanConditionSerializer(item["conditionProperties"]),
  };
}

export function booleanConditionPropertiesDeserializer(item: any): BooleanConditionProperties {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRuleBooleanConditionDeserializer(item["conditionProperties"]),
  };
}

/** model interface AutomationRuleBooleanCondition */
export interface AutomationRuleBooleanCondition {
  operator?: AutomationRuleBooleanConditionSupportedOperator;
  innerConditions?: AutomationRuleConditionUnion[];
}

export function automationRuleBooleanConditionSerializer(
  item: AutomationRuleBooleanCondition,
): any {
  return {
    operator: item["operator"],
    innerConditions: !item["innerConditions"]
      ? item["innerConditions"]
      : automationRuleConditionUnionArraySerializer(item["innerConditions"]),
  };
}

export function automationRuleBooleanConditionDeserializer(
  item: any,
): AutomationRuleBooleanCondition {
  return {
    operator: item["operator"],
    innerConditions: !item["innerConditions"]
      ? item["innerConditions"]
      : automationRuleConditionUnionArrayDeserializer(item["innerConditions"]),
  };
}

/** Known values of {@link AutomationRuleBooleanConditionSupportedOperator} that the service accepts. */
export enum KnownAutomationRuleBooleanConditionSupportedOperator {
  /** Evaluates as true if all the item conditions are evaluated as true */
  And = "And",
  /** Evaluates as true if at least one of the item conditions are evaluated as true */
  Or = "Or",
}

/** Type of AutomationRuleBooleanConditionSupportedOperator */
export type AutomationRuleBooleanConditionSupportedOperator = string;

/** Describes an automation rule condition that evaluates an array property's value change */
export interface PropertyArrayChangedConditionProperties extends AutomationRuleCondition {
  conditionProperties?: AutomationRulePropertyArrayChangedValuesCondition;
  conditionType: "PropertyArrayChanged";
}

export function propertyArrayChangedConditionPropertiesSerializer(
  item: PropertyArrayChangedConditionProperties,
): any {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyArrayChangedValuesConditionSerializer(item["conditionProperties"]),
  };
}

export function propertyArrayChangedConditionPropertiesDeserializer(
  item: any,
): PropertyArrayChangedConditionProperties {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyArrayChangedValuesConditionDeserializer(item["conditionProperties"]),
  };
}

/** model interface AutomationRulePropertyArrayChangedValuesCondition */
export interface AutomationRulePropertyArrayChangedValuesCondition {
  arrayType?: AutomationRulePropertyArrayChangedConditionSupportedArrayType;
  changeType?: AutomationRulePropertyArrayChangedConditionSupportedChangeType;
}

export function automationRulePropertyArrayChangedValuesConditionSerializer(
  item: AutomationRulePropertyArrayChangedValuesCondition,
): any {
  return { arrayType: item["arrayType"], changeType: item["changeType"] };
}

export function automationRulePropertyArrayChangedValuesConditionDeserializer(
  item: any,
): AutomationRulePropertyArrayChangedValuesCondition {
  return {
    arrayType: item["arrayType"],
    changeType: item["changeType"],
  };
}

/** Known values of {@link AutomationRulePropertyArrayChangedConditionSupportedArrayType} that the service accepts. */
export enum KnownAutomationRulePropertyArrayChangedConditionSupportedArrayType {
  /** Evaluate the condition on the alerts */
  Alerts = "Alerts",
  /** Evaluate the condition on the labels */
  Labels = "Labels",
  /** Evaluate the condition on the tactics */
  Tactics = "Tactics",
  /** Evaluate the condition on the comments */
  Comments = "Comments",
}

/** Type of AutomationRulePropertyArrayChangedConditionSupportedArrayType */
export type AutomationRulePropertyArrayChangedConditionSupportedArrayType = string;

/** Known values of {@link AutomationRulePropertyArrayChangedConditionSupportedChangeType} that the service accepts. */
export enum KnownAutomationRulePropertyArrayChangedConditionSupportedChangeType {
  /** Evaluate the condition on items added to the array */
  Added = "Added",
}

/** Type of AutomationRulePropertyArrayChangedConditionSupportedChangeType */
export type AutomationRulePropertyArrayChangedConditionSupportedChangeType = string;

/** Describes an automation rule condition that evaluates an array property's value */
export interface PropertyArrayConditionProperties extends AutomationRuleCondition {
  conditionProperties?: AutomationRulePropertyArrayValuesCondition;
  conditionType: "PropertyArray";
}

export function propertyArrayConditionPropertiesSerializer(
  item: PropertyArrayConditionProperties,
): any {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyArrayValuesConditionSerializer(item["conditionProperties"]),
  };
}

export function propertyArrayConditionPropertiesDeserializer(
  item: any,
): PropertyArrayConditionProperties {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyArrayValuesConditionDeserializer(item["conditionProperties"]),
  };
}

/** model interface AutomationRulePropertyArrayValuesCondition */
export interface AutomationRulePropertyArrayValuesCondition {
  arrayType?: AutomationRulePropertyArrayConditionSupportedArrayType;
  arrayConditionType?: AutomationRulePropertyArrayConditionSupportedArrayConditionType;
  itemConditions?: AutomationRuleConditionUnion[];
}

export function automationRulePropertyArrayValuesConditionSerializer(
  item: AutomationRulePropertyArrayValuesCondition,
): any {
  return {
    arrayType: item["arrayType"],
    arrayConditionType: item["arrayConditionType"],
    itemConditions: !item["itemConditions"]
      ? item["itemConditions"]
      : automationRuleConditionUnionArraySerializer(item["itemConditions"]),
  };
}

export function automationRulePropertyArrayValuesConditionDeserializer(
  item: any,
): AutomationRulePropertyArrayValuesCondition {
  return {
    arrayType: item["arrayType"],
    arrayConditionType: item["arrayConditionType"],
    itemConditions: !item["itemConditions"]
      ? item["itemConditions"]
      : automationRuleConditionUnionArrayDeserializer(item["itemConditions"]),
  };
}

/** Known values of {@link AutomationRulePropertyArrayConditionSupportedArrayType} that the service accepts. */
export enum KnownAutomationRulePropertyArrayConditionSupportedArrayType {
  /** Evaluate the condition on the custom detail keys */
  CustomDetails = "CustomDetails",
  /** Evaluate the condition on a custom detail's values */
  CustomDetailValues = "CustomDetailValues",
  /** Evaluate the condition on the incident labels */
  IncidentLabels = "IncidentLabels",
}

/** Type of AutomationRulePropertyArrayConditionSupportedArrayType */
export type AutomationRulePropertyArrayConditionSupportedArrayType = string;

/** Known values of {@link AutomationRulePropertyArrayConditionSupportedArrayConditionType} that the service accepts. */
export enum KnownAutomationRulePropertyArrayConditionSupportedArrayConditionType {
  /** Evaluate the condition as true if any item fulfills it */
  AnyItem = "AnyItem",
  /** Evaluate the condition as true if all the items fulfill it */
  AllItems = "AllItems",
}

/** Type of AutomationRulePropertyArrayConditionSupportedArrayConditionType */
export type AutomationRulePropertyArrayConditionSupportedArrayConditionType = string;

/** Describes an automation rule condition that evaluates a property's value change */
export interface PropertyChangedConditionProperties extends AutomationRuleCondition {
  conditionProperties?: AutomationRulePropertyValuesChangedCondition;
  conditionType: "PropertyChanged";
}

export function propertyChangedConditionPropertiesSerializer(
  item: PropertyChangedConditionProperties,
): any {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyValuesChangedConditionSerializer(item["conditionProperties"]),
  };
}

export function propertyChangedConditionPropertiesDeserializer(
  item: any,
): PropertyChangedConditionProperties {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyValuesChangedConditionDeserializer(item["conditionProperties"]),
  };
}

/** model interface AutomationRulePropertyValuesChangedCondition */
export interface AutomationRulePropertyValuesChangedCondition {
  propertyName?: AutomationRulePropertyChangedConditionSupportedPropertyType;
  changeType?: AutomationRulePropertyChangedConditionSupportedChangedType;
  operator?: AutomationRulePropertyConditionSupportedOperator;
  propertyValues?: string[];
}

export function automationRulePropertyValuesChangedConditionSerializer(
  item: AutomationRulePropertyValuesChangedCondition,
): any {
  return {
    propertyName: item["propertyName"],
    changeType: item["changeType"],
    operator: item["operator"],
    propertyValues: !item["propertyValues"]
      ? item["propertyValues"]
      : item["propertyValues"].map((p: any) => {
          return p;
        }),
  };
}

export function automationRulePropertyValuesChangedConditionDeserializer(
  item: any,
): AutomationRulePropertyValuesChangedCondition {
  return {
    propertyName: item["propertyName"],
    changeType: item["changeType"],
    operator: item["operator"],
    propertyValues: !item["propertyValues"]
      ? item["propertyValues"]
      : item["propertyValues"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link AutomationRulePropertyChangedConditionSupportedPropertyType} that the service accepts. */
export enum KnownAutomationRulePropertyChangedConditionSupportedPropertyType {
  /** Evaluate the condition on the incident severity */
  IncidentSeverity = "IncidentSeverity",
  /** Evaluate the condition on the incident status */
  IncidentStatus = "IncidentStatus",
  /** Evaluate the condition on the incident owner */
  IncidentOwner = "IncidentOwner",
}

/** Type of AutomationRulePropertyChangedConditionSupportedPropertyType */
export type AutomationRulePropertyChangedConditionSupportedPropertyType = string;

/** Known values of {@link AutomationRulePropertyChangedConditionSupportedChangedType} that the service accepts. */
export enum KnownAutomationRulePropertyChangedConditionSupportedChangedType {
  /** Evaluate the condition on the previous value of the property */
  ChangedFrom = "ChangedFrom",
  /** Evaluate the condition on the updated value of the property */
  ChangedTo = "ChangedTo",
}

/** Type of AutomationRulePropertyChangedConditionSupportedChangedType */
export type AutomationRulePropertyChangedConditionSupportedChangedType = string;

/** Known values of {@link AutomationRulePropertyConditionSupportedOperator} that the service accepts. */
export enum KnownAutomationRulePropertyConditionSupportedOperator {
  /** Evaluates if the property equals at least one of the condition values */
  Equals = "Equals",
  /** Evaluates if the property does not equal any of the condition values */
  NotEquals = "NotEquals",
  /** Evaluates if the property contains at least one of the condition values */
  Contains = "Contains",
  /** Evaluates if the property does not contain any of the condition values */
  NotContains = "NotContains",
  /** Evaluates if the property starts with any of the condition values */
  StartsWith = "StartsWith",
  /** Evaluates if the property does not start with any of the condition values */
  NotStartsWith = "NotStartsWith",
  /** Evaluates if the property ends with any of the condition values */
  EndsWith = "EndsWith",
  /** Evaluates if the property does not end with any of the condition values */
  NotEndsWith = "NotEndsWith",
}

/** Type of AutomationRulePropertyConditionSupportedOperator */
export type AutomationRulePropertyConditionSupportedOperator = string;

/** Describes an automation rule condition that evaluates a property's value */
export interface PropertyConditionProperties extends AutomationRuleCondition {
  conditionProperties?: AutomationRulePropertyValuesCondition;
  conditionType: "Property";
}

export function propertyConditionPropertiesSerializer(item: PropertyConditionProperties): any {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyValuesConditionSerializer(item["conditionProperties"]),
  };
}

export function propertyConditionPropertiesDeserializer(item: any): PropertyConditionProperties {
  return {
    conditionType: item["conditionType"],
    conditionProperties: !item["conditionProperties"]
      ? item["conditionProperties"]
      : automationRulePropertyValuesConditionDeserializer(item["conditionProperties"]),
  };
}

/** model interface AutomationRulePropertyValuesCondition */
export interface AutomationRulePropertyValuesCondition {
  /** The property to evaluate in an automation rule property condition. */
  propertyName?: AutomationRulePropertyConditionSupportedProperty;
  operator?: AutomationRulePropertyConditionSupportedOperator;
  propertyValues?: string[];
}

export function automationRulePropertyValuesConditionSerializer(
  item: AutomationRulePropertyValuesCondition,
): any {
  return {
    propertyName: item["propertyName"],
    operator: item["operator"],
    propertyValues: !item["propertyValues"]
      ? item["propertyValues"]
      : item["propertyValues"].map((p: any) => {
          return p;
        }),
  };
}

export function automationRulePropertyValuesConditionDeserializer(
  item: any,
): AutomationRulePropertyValuesCondition {
  return {
    propertyName: item["propertyName"],
    operator: item["operator"],
    propertyValues: !item["propertyValues"]
      ? item["propertyValues"]
      : item["propertyValues"].map((p: any) => {
          return p;
        }),
  };
}

/** The property to evaluate in an automation rule property condition. */
export enum KnownAutomationRulePropertyConditionSupportedProperty {
  /** The title of the incident */
  IncidentTitle = "IncidentTitle",
  /** The description of the incident */
  IncidentDescription = "IncidentDescription",
  /** The severity of the incident */
  IncidentSeverity = "IncidentSeverity",
  /** The status of the incident */
  IncidentStatus = "IncidentStatus",
  /** The related Analytic rule ids of the incident */
  IncidentRelatedAnalyticRuleIds = "IncidentRelatedAnalyticRuleIds",
  /** The tactics of the incident */
  IncidentTactics = "IncidentTactics",
  /** The labels of the incident */
  IncidentLabel = "IncidentLabel",
  /** The provider name of the incident */
  IncidentProviderName = "IncidentProviderName",
  /** The update source of the incident */
  IncidentUpdatedBySource = "IncidentUpdatedBySource",
  /** The incident custom detail key */
  IncidentCustomDetailsKey = "IncidentCustomDetailsKey",
  /** The incident custom detail value */
  IncidentCustomDetailsValue = "IncidentCustomDetailsValue",
  /** The Custom-Detection rule ids associated with any of the incident alerts */
  IncidentCustomDetectionRuleIds = "IncidentCustomDetectionRuleIds",
  /** The alert title associated with any of the incident alerts */
  IncidentAlertTitle = "IncidentAlertTitle",
  /** The account Azure Active Directory tenant id */
  AccountAadTenantId = "AccountAadTenantId",
  /** The account Azure Active Directory user id */
  AccountAadUserId = "AccountAadUserId",
  /** The account name */
  AccountName = "AccountName",
  /** The account NetBIOS domain name */
  AccountNTDomain = "AccountNTDomain",
  /** The account Azure Active Directory Passport User ID */
  AccountPuid = "AccountPUID",
  /** The account security identifier */
  AccountSid = "AccountSid",
  /** The account unique identifier */
  AccountObjectGuid = "AccountObjectGuid",
  /** The account user principal name suffix */
  AccountUPNSuffix = "AccountUPNSuffix",
  /** The name of the product of the alert */
  AlertProductNames = "AlertProductNames",
  /** The analytic rule ids of the alert */
  AlertAnalyticRuleIds = "AlertAnalyticRuleIds",
  /** The Azure resource id */
  AzureResourceResourceId = "AzureResourceResourceId",
  /** The Azure resource subscription id */
  AzureResourceSubscriptionId = "AzureResourceSubscriptionId",
  /** The cloud application identifier */
  CloudApplicationAppId = "CloudApplicationAppId",
  /** The cloud application name */
  CloudApplicationAppName = "CloudApplicationAppName",
  /** The dns record domain name */
  DNSDomainName = "DNSDomainName",
  /** The file directory full path */
  FileDirectory = "FileDirectory",
  /** The file name without path */
  FileName = "FileName",
  /** The file hash value */
  FileHashValue = "FileHashValue",
  /** The host Azure resource id */
  HostAzureID = "HostAzureID",
  /** The host name without domain */
  HostName = "HostName",
  /** The host NetBIOS name */
  HostNetBiosName = "HostNetBiosName",
  /** The host NT domain */
  HostNTDomain = "HostNTDomain",
  /** The host operating system */
  HostOSVersion = "HostOSVersion",
  /** "The IoT device id */
  IoTDeviceId = "IoTDeviceId",
  /** The IoT device name */
  IoTDeviceName = "IoTDeviceName",
  /** The IoT device type */
  IoTDeviceType = "IoTDeviceType",
  /** The IoT device vendor */
  IoTDeviceVendor = "IoTDeviceVendor",
  /** The IoT device model */
  IoTDeviceModel = "IoTDeviceModel",
  /** The IoT device operating system */
  IoTDeviceOperatingSystem = "IoTDeviceOperatingSystem",
  /** The IP address */
  IPAddress = "IPAddress",
  /** The mailbox display name */
  MailboxDisplayName = "MailboxDisplayName",
  /** The mailbox primary address */
  MailboxPrimaryAddress = "MailboxPrimaryAddress",
  /** The mailbox user principal name */
  MailboxUPN = "MailboxUPN",
  /** The mail message delivery action */
  MailMessageDeliveryAction = "MailMessageDeliveryAction",
  /** The mail message delivery location */
  MailMessageDeliveryLocation = "MailMessageDeliveryLocation",
  /** The mail message recipient */
  MailMessageRecipient = "MailMessageRecipient",
  /** The mail message sender IP address */
  MailMessageSenderIP = "MailMessageSenderIP",
  /** The mail message subject */
  MailMessageSubject = "MailMessageSubject",
  /** The mail message P1 sender */
  MailMessageP1Sender = "MailMessageP1Sender",
  /** The mail message P2 sender */
  MailMessageP2Sender = "MailMessageP2Sender",
  /** The malware category */
  MalwareCategory = "MalwareCategory",
  /** The malware name */
  MalwareName = "MalwareName",
  /** The process execution command line */
  ProcessCommandLine = "ProcessCommandLine",
  /** The process id */
  ProcessId = "ProcessId",
  /** The registry key path */
  RegistryKey = "RegistryKey",
  /** The registry key value in string formatted representation */
  RegistryValueData = "RegistryValueData",
  /** The url */
  Url = "Url",
}

/**
 * The property to evaluate in an automation rule property condition. \
 * {@link KnownAutomationRulePropertyConditionSupportedProperty} can be used interchangeably with AutomationRulePropertyConditionSupportedProperty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IncidentTitle**: The title of the incident \
 * **IncidentDescription**: The description of the incident \
 * **IncidentSeverity**: The severity of the incident \
 * **IncidentStatus**: The status of the incident \
 * **IncidentRelatedAnalyticRuleIds**: The related Analytic rule ids of the incident \
 * **IncidentTactics**: The tactics of the incident \
 * **IncidentLabel**: The labels of the incident \
 * **IncidentProviderName**: The provider name of the incident \
 * **IncidentUpdatedBySource**: The update source of the incident \
 * **IncidentCustomDetailsKey**: The incident custom detail key \
 * **IncidentCustomDetailsValue**: The incident custom detail value \
 * **IncidentCustomDetectionRuleIds**: The Custom-Detection rule ids associated with any of the incident alerts \
 * **IncidentAlertTitle**: The alert title associated with any of the incident alerts \
 * **AccountAadTenantId**: The account Azure Active Directory tenant id \
 * **AccountAadUserId**: The account Azure Active Directory user id \
 * **AccountName**: The account name \
 * **AccountNTDomain**: The account NetBIOS domain name \
 * **AccountPUID**: The account Azure Active Directory Passport User ID \
 * **AccountSid**: The account security identifier \
 * **AccountObjectGuid**: The account unique identifier \
 * **AccountUPNSuffix**: The account user principal name suffix \
 * **AlertProductNames**: The name of the product of the alert \
 * **AlertAnalyticRuleIds**: The analytic rule ids of the alert \
 * **AzureResourceResourceId**: The Azure resource id \
 * **AzureResourceSubscriptionId**: The Azure resource subscription id \
 * **CloudApplicationAppId**: The cloud application identifier \
 * **CloudApplicationAppName**: The cloud application name \
 * **DNSDomainName**: The dns record domain name \
 * **FileDirectory**: The file directory full path \
 * **FileName**: The file name without path \
 * **FileHashValue**: The file hash value \
 * **HostAzureID**: The host Azure resource id \
 * **HostName**: The host name without domain \
 * **HostNetBiosName**: The host NetBIOS name \
 * **HostNTDomain**: The host NT domain \
 * **HostOSVersion**: The host operating system \
 * **IoTDeviceId**: "The IoT device id \
 * **IoTDeviceName**: The IoT device name \
 * **IoTDeviceType**: The IoT device type \
 * **IoTDeviceVendor**: The IoT device vendor \
 * **IoTDeviceModel**: The IoT device model \
 * **IoTDeviceOperatingSystem**: The IoT device operating system \
 * **IPAddress**: The IP address \
 * **MailboxDisplayName**: The mailbox display name \
 * **MailboxPrimaryAddress**: The mailbox primary address \
 * **MailboxUPN**: The mailbox user principal name \
 * **MailMessageDeliveryAction**: The mail message delivery action \
 * **MailMessageDeliveryLocation**: The mail message delivery location \
 * **MailMessageRecipient**: The mail message recipient \
 * **MailMessageSenderIP**: The mail message sender IP address \
 * **MailMessageSubject**: The mail message subject \
 * **MailMessageP1Sender**: The mail message P1 sender \
 * **MailMessageP2Sender**: The mail message P2 sender \
 * **MalwareCategory**: The malware category \
 * **MalwareName**: The malware name \
 * **ProcessCommandLine**: The process execution command line \
 * **ProcessId**: The process id \
 * **RegistryKey**: The registry key path \
 * **RegistryValueData**: The registry key value in string formatted representation \
 * **Url**: The url
 */
export type AutomationRulePropertyConditionSupportedProperty = string;

export function automationRuleActionUnionArraySerializer(
  result: Array<AutomationRuleActionUnion>,
): any[] {
  return result.map((item) => {
    return automationRuleActionUnionSerializer(item);
  });
}

export function automationRuleActionUnionArrayDeserializer(
  result: Array<AutomationRuleActionUnion>,
): any[] {
  return result.map((item) => {
    return automationRuleActionUnionDeserializer(item);
  });
}

/** Describes an automation rule action. */
export interface AutomationRuleAction {
  order: number;
  /** The type of the automation rule action. */
  /** The discriminator possible values: AddIncidentTask, ModifyProperties, RunPlaybook */
  actionType: ActionType;
}

export function automationRuleActionSerializer(item: AutomationRuleAction): any {
  return { order: item["order"], actionType: item["actionType"] };
}

export function automationRuleActionDeserializer(item: any): AutomationRuleAction {
  return {
    order: item["order"],
    actionType: item["actionType"],
  };
}

/** Alias for AutomationRuleActionUnion */
export type AutomationRuleActionUnion =
  | AutomationRuleAddIncidentTaskAction
  | AutomationRuleModifyPropertiesAction
  | AutomationRuleRunPlaybookAction
  | AutomationRuleAction;

export function automationRuleActionUnionSerializer(item: AutomationRuleActionUnion): any {
  switch (item.actionType) {
    case "AddIncidentTask":
      return automationRuleAddIncidentTaskActionSerializer(
        item as AutomationRuleAddIncidentTaskAction,
      );

    case "ModifyProperties":
      return automationRuleModifyPropertiesActionSerializer(
        item as AutomationRuleModifyPropertiesAction,
      );

    case "RunPlaybook":
      return automationRuleRunPlaybookActionSerializer(item as AutomationRuleRunPlaybookAction);

    default:
      return automationRuleActionSerializer(item);
  }
}

export function automationRuleActionUnionDeserializer(item: any): AutomationRuleActionUnion {
  switch (item["actionType"]) {
    case "AddIncidentTask":
      return automationRuleAddIncidentTaskActionDeserializer(
        item as AutomationRuleAddIncidentTaskAction,
      );

    case "ModifyProperties":
      return automationRuleModifyPropertiesActionDeserializer(
        item as AutomationRuleModifyPropertiesAction,
      );

    case "RunPlaybook":
      return automationRuleRunPlaybookActionDeserializer(item as AutomationRuleRunPlaybookAction);

    default:
      return automationRuleActionDeserializer(item);
  }
}

/** The type of the automation rule action. */
export enum KnownActionType {
  /** Modify an object's properties */
  ModifyProperties = "ModifyProperties",
  /** Run a playbook on an object */
  RunPlaybook = "RunPlaybook",
  /** Add a task to an incident object */
  AddIncidentTask = "AddIncidentTask",
}

/**
 * The type of the automation rule action. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ModifyProperties**: Modify an object's properties \
 * **RunPlaybook**: Run a playbook on an object \
 * **AddIncidentTask**: Add a task to an incident object
 */
export type ActionType = string;

/** Describes an automation rule action to add a task to an incident */
export interface AutomationRuleAddIncidentTaskAction extends AutomationRuleAction {
  actionConfiguration?: AddIncidentTaskActionProperties;
  /** The type of the automation rule action. */
  actionType: "AddIncidentTask";
}

export function automationRuleAddIncidentTaskActionSerializer(
  item: AutomationRuleAddIncidentTaskAction,
): any {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : addIncidentTaskActionPropertiesSerializer(item["actionConfiguration"]),
  };
}

export function automationRuleAddIncidentTaskActionDeserializer(
  item: any,
): AutomationRuleAddIncidentTaskAction {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : addIncidentTaskActionPropertiesDeserializer(item["actionConfiguration"]),
  };
}

/** model interface AddIncidentTaskActionProperties */
export interface AddIncidentTaskActionProperties {
  /** The title of the task. */
  title: string;
  /** The description of the task. */
  description?: string;
}

export function addIncidentTaskActionPropertiesSerializer(
  item: AddIncidentTaskActionProperties,
): any {
  return { title: item["title"], description: item["description"] };
}

export function addIncidentTaskActionPropertiesDeserializer(
  item: any,
): AddIncidentTaskActionProperties {
  return {
    title: item["title"],
    description: item["description"],
  };
}

/** Describes an automation rule action to modify an object's properties */
export interface AutomationRuleModifyPropertiesAction extends AutomationRuleAction {
  actionConfiguration?: IncidentPropertiesAction;
  /** The type of the automation rule action. */
  actionType: "ModifyProperties";
}

export function automationRuleModifyPropertiesActionSerializer(
  item: AutomationRuleModifyPropertiesAction,
): any {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : incidentPropertiesActionSerializer(item["actionConfiguration"]),
  };
}

export function automationRuleModifyPropertiesActionDeserializer(
  item: any,
): AutomationRuleModifyPropertiesAction {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : incidentPropertiesActionDeserializer(item["actionConfiguration"]),
  };
}

/** model interface IncidentPropertiesAction */
export interface IncidentPropertiesAction {
  /** The severity of the incident */
  severity?: IncidentSeverity;
  /** The status of the incident */
  status?: IncidentStatus;
  /** The reason the incident was closed */
  classification?: IncidentClassification;
  /** The classification reason the incident was closed with */
  classificationReason?: IncidentClassificationReason;
  /** Describes the reason the incident was closed. */
  classificationComment?: string;
  /** Information on the user an incident is assigned to */
  owner?: IncidentOwnerInfo;
  /** List of labels to add to the incident. */
  labels?: IncidentLabel[];
}

export function incidentPropertiesActionSerializer(item: IncidentPropertiesAction): any {
  return {
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoSerializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArraySerializer(item["labels"]),
  };
}

export function incidentPropertiesActionDeserializer(item: any): IncidentPropertiesAction {
  return {
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoDeserializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArrayDeserializer(item["labels"]),
  };
}

/** The severity of the incident */
export enum KnownIncidentSeverity {
  /** High severity */
  High = "High",
  /** Medium severity */
  Medium = "Medium",
  /** Low severity */
  Low = "Low",
  /** Informational severity */
  Informational = "Informational",
}

/**
 * The severity of the incident \
 * {@link KnownIncidentSeverity} can be used interchangeably with IncidentSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High severity \
 * **Medium**: Medium severity \
 * **Low**: Low severity \
 * **Informational**: Informational severity
 */
export type IncidentSeverity = string;

/** The status of the incident */
export enum KnownIncidentStatus {
  /** An active incident which isn't being handled currently */
  New = "New",
  /** An active incident which is being handled */
  Active = "Active",
  /** A non-active incident */
  Closed = "Closed",
}

/**
 * The status of the incident \
 * {@link KnownIncidentStatus} can be used interchangeably with IncidentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: An active incident which isn't being handled currently \
 * **Active**: An active incident which is being handled \
 * **Closed**: A non-active incident
 */
export type IncidentStatus = string;

/** The reason the incident was closed */
export enum KnownIncidentClassification {
  /** Incident classification was undetermined */
  Undetermined = "Undetermined",
  /** Incident was true positive */
  TruePositive = "TruePositive",
  /** Incident was benign positive */
  BenignPositive = "BenignPositive",
  /** Incident was false positive */
  FalsePositive = "FalsePositive",
}

/**
 * The reason the incident was closed \
 * {@link KnownIncidentClassification} can be used interchangeably with IncidentClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undetermined**: Incident classification was undetermined \
 * **TruePositive**: Incident was true positive \
 * **BenignPositive**: Incident was benign positive \
 * **FalsePositive**: Incident was false positive
 */
export type IncidentClassification = string;

/** The classification reason the incident was closed with */
export enum KnownIncidentClassificationReason {
  /** Classification reason was suspicious activity */
  SuspiciousActivity = "SuspiciousActivity",
  /** Classification reason was suspicious but expected */
  SuspiciousButExpected = "SuspiciousButExpected",
  /** Classification reason was incorrect alert logic */
  IncorrectAlertLogic = "IncorrectAlertLogic",
  /** Classification reason was inaccurate data */
  InaccurateData = "InaccurateData",
}

/**
 * The classification reason the incident was closed with \
 * {@link KnownIncidentClassificationReason} can be used interchangeably with IncidentClassificationReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SuspiciousActivity**: Classification reason was suspicious activity \
 * **SuspiciousButExpected**: Classification reason was suspicious but expected \
 * **IncorrectAlertLogic**: Classification reason was incorrect alert logic \
 * **InaccurateData**: Classification reason was inaccurate data
 */
export type IncidentClassificationReason = string;

/** Information on the user an incident is assigned to */
export interface IncidentOwnerInfo {
  /** The email of the user the incident is assigned to. */
  email?: string;
  /** The name of the user the incident is assigned to. */
  assignedTo?: string;
  /** The object id of the user the incident is assigned to. */
  objectId?: string;
  /** The user principal name of the user the incident is assigned to. */
  userPrincipalName?: string;
  /** The type of the owner the incident is assigned to. */
  ownerType?: OwnerType;
}

export function incidentOwnerInfoSerializer(item: IncidentOwnerInfo): any {
  return {
    email: item["email"],
    assignedTo: item["assignedTo"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
    ownerType: item["ownerType"],
  };
}

export function incidentOwnerInfoDeserializer(item: any): IncidentOwnerInfo {
  return {
    email: item["email"],
    assignedTo: item["assignedTo"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
    ownerType: item["ownerType"],
  };
}

/** The type of the owner the hunt is assigned to. */
export enum KnownOwnerType {
  /** The hunt owner type is unknown */
  Unknown = "Unknown",
  /** The hunt owner type is an AAD user */
  User = "User",
  /** The hunt owner type is an AAD group */
  Group = "Group",
}

/**
 * The type of the owner the hunt is assigned to. \
 * {@link KnownOwnerType} can be used interchangeably with OwnerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The hunt owner type is unknown \
 * **User**: The hunt owner type is an AAD user \
 * **Group**: The hunt owner type is an AAD group
 */
export type OwnerType = string;

export function incidentLabelArraySerializer(result: Array<IncidentLabel>): any[] {
  return result.map((item) => {
    return incidentLabelSerializer(item);
  });
}

export function incidentLabelArrayDeserializer(result: Array<IncidentLabel>): any[] {
  return result.map((item) => {
    return incidentLabelDeserializer(item);
  });
}

/** Represents an incident label */
export interface IncidentLabel {
  /** The name of the label */
  labelName: string;
  /** The type of the label */
  readonly labelType?: IncidentLabelType;
}

export function incidentLabelSerializer(item: IncidentLabel): any {
  return { labelName: item["labelName"] };
}

export function incidentLabelDeserializer(item: any): IncidentLabel {
  return {
    labelName: item["labelName"],
    labelType: item["labelType"],
  };
}

/** The type of the label */
export enum KnownIncidentLabelType {
  /** Label manually created by a user */
  User = "User",
  /** Label automatically created by the system */
  AutoAssigned = "AutoAssigned",
}

/**
 * The type of the label \
 * {@link KnownIncidentLabelType} can be used interchangeably with IncidentLabelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: Label manually created by a user \
 * **AutoAssigned**: Label automatically created by the system
 */
export type IncidentLabelType = string;

/** Describes an automation rule action to run a playbook */
export interface AutomationRuleRunPlaybookAction extends AutomationRuleAction {
  actionConfiguration?: PlaybookActionProperties;
  /** The type of the automation rule action. */
  actionType: "RunPlaybook";
}

export function automationRuleRunPlaybookActionSerializer(
  item: AutomationRuleRunPlaybookAction,
): any {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : playbookActionPropertiesSerializer(item["actionConfiguration"]),
  };
}

export function automationRuleRunPlaybookActionDeserializer(
  item: any,
): AutomationRuleRunPlaybookAction {
  return {
    order: item["order"],
    actionType: item["actionType"],
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : playbookActionPropertiesDeserializer(item["actionConfiguration"]),
  };
}

/** model interface PlaybookActionProperties */
export interface PlaybookActionProperties {
  /** The resource id of the playbook resource. */
  logicAppResourceId: string;
  /** The tenant id of the playbook resource. */
  tenantId?: string;
}

export function playbookActionPropertiesSerializer(item: PlaybookActionProperties): any {
  return { logicAppResourceId: item["logicAppResourceId"], tenantId: item["tenantId"] };
}

export function playbookActionPropertiesDeserializer(item: any): PlaybookActionProperties {
  return {
    logicAppResourceId: item["logicAppResourceId"],
    tenantId: item["tenantId"],
  };
}

/** Information on the client (user or application) that made some action */
export interface ClientInfo {
  /** The email of the client. */
  email?: string;
  /** The name of the client. */
  name?: string;
  /** The object id of the client. */
  objectId?: string;
  /** The user principal name of the client. */
  userPrincipalName?: string;
}

export function clientInfoSerializer(item: ClientInfo): any {
  return {
    email: item["email"],
    name: item["name"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
  };
}

export function clientInfoDeserializer(item: any): ClientInfo {
  return {
    email: item["email"],
    name: item["name"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
  };
}

/** Paged collection of AutomationRule items */
export interface _AutomationRulesList {
  /** The AutomationRule items on this page */
  value: AutomationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _automationRulesListDeserializer(item: any): _AutomationRulesList {
  return {
    value: automationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function automationRuleArraySerializer(result: Array<AutomationRule>): any[] {
  return result.map((item) => {
    return automationRuleSerializer(item);
  });
}

export function automationRuleArrayDeserializer(result: Array<AutomationRule>): any[] {
  return result.map((item) => {
    return automationRuleDeserializer(item);
  });
}

/** Represents an incident in Azure Security Insights. */
export interface Incident extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The title of the incident */
  title?: string;
  /** The description of the incident */
  description?: string;
  /** The severity of the incident */
  severity?: IncidentSeverity;
  /** The status of the incident */
  status?: IncidentStatus;
  /** The reason the incident was closed */
  classification?: IncidentClassification;
  /** The classification reason the incident was closed with */
  classificationReason?: IncidentClassificationReason;
  /** Describes the reason the incident was closed */
  classificationComment?: string;
  /** Describes a user that the incident is assigned to */
  owner?: IncidentOwnerInfo;
  /** List of labels relevant to this incident */
  labels?: IncidentLabel[];
  /** The time of the first activity in the incident */
  firstActivityTimeUtc?: Date;
  /** The time of the last activity in the incident */
  lastActivityTimeUtc?: Date;
  /** The last time the incident was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** The time the incident was created */
  readonly createdTimeUtc?: Date;
  /** A sequential number */
  readonly incidentNumber?: number;
  /** Additional data on the incident */
  readonly additionalData?: IncidentAdditionalData;
  /** List of resource ids of Analytic rules related to the incident */
  readonly relatedAnalyticRuleIds?: string[];
  /** The deep-link url to the incident in Azure portal */
  readonly incidentUrl?: string;
  /** The name of the source provider that generated the incident */
  readonly providerName?: string;
  /** The incident ID assigned by the incident provider */
  readonly providerIncidentId?: string;
  /** Describes a team for the incident */
  teamInformation?: TeamInformation;
}

export function incidentSerializer(item: Incident): any {
  return {
    properties: areAllPropsUndefined(item, [
      "title",
      "description",
      "severity",
      "status",
      "classification",
      "classificationReason",
      "classificationComment",
      "owner",
      "labels",
      "firstActivityTimeUtc",
      "lastActivityTimeUtc",
      "teamInformation",
    ])
      ? undefined
      : _incidentPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function incidentDeserializer(item: any): Incident {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _incidentPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes incident properties */
export interface IncidentProperties {
  /** The title of the incident */
  title: string;
  /** The description of the incident */
  description?: string;
  /** The severity of the incident */
  severity: IncidentSeverity;
  /** The status of the incident */
  status: IncidentStatus;
  /** The reason the incident was closed */
  classification?: IncidentClassification;
  /** The classification reason the incident was closed with */
  classificationReason?: IncidentClassificationReason;
  /** Describes the reason the incident was closed */
  classificationComment?: string;
  /** Describes a user that the incident is assigned to */
  owner?: IncidentOwnerInfo;
  /** List of labels relevant to this incident */
  labels?: IncidentLabel[];
  /** The time of the first activity in the incident */
  firstActivityTimeUtc?: Date;
  /** The time of the last activity in the incident */
  lastActivityTimeUtc?: Date;
  /** The last time the incident was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** The time the incident was created */
  readonly createdTimeUtc?: Date;
  /** A sequential number */
  readonly incidentNumber?: number;
  /** Additional data on the incident */
  readonly additionalData?: IncidentAdditionalData;
  /** List of resource ids of Analytic rules related to the incident */
  readonly relatedAnalyticRuleIds?: string[];
  /** The deep-link url to the incident in Azure portal */
  readonly incidentUrl?: string;
  /** The name of the source provider that generated the incident */
  readonly providerName?: string;
  /** The incident ID assigned by the incident provider */
  readonly providerIncidentId?: string;
  /** Describes a team for the incident */
  teamInformation?: TeamInformation;
}

export function incidentPropertiesSerializer(item: IncidentProperties): any {
  return {
    title: item["title"],
    description: item["description"],
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoSerializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArraySerializer(item["labels"]),
    firstActivityTimeUtc: !item["firstActivityTimeUtc"]
      ? item["firstActivityTimeUtc"]
      : item["firstActivityTimeUtc"].toISOString(),
    lastActivityTimeUtc: !item["lastActivityTimeUtc"]
      ? item["lastActivityTimeUtc"]
      : item["lastActivityTimeUtc"].toISOString(),
    teamInformation: !item["teamInformation"]
      ? item["teamInformation"]
      : teamInformationSerializer(item["teamInformation"]),
  };
}

export function incidentPropertiesDeserializer(item: any): IncidentProperties {
  return {
    title: item["title"],
    description: item["description"],
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoDeserializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArrayDeserializer(item["labels"]),
    firstActivityTimeUtc: !item["firstActivityTimeUtc"]
      ? item["firstActivityTimeUtc"]
      : new Date(item["firstActivityTimeUtc"]),
    lastActivityTimeUtc: !item["lastActivityTimeUtc"]
      ? item["lastActivityTimeUtc"]
      : new Date(item["lastActivityTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    incidentNumber: item["incidentNumber"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : incidentAdditionalDataDeserializer(item["additionalData"]),
    relatedAnalyticRuleIds: !item["relatedAnalyticRuleIds"]
      ? item["relatedAnalyticRuleIds"]
      : item["relatedAnalyticRuleIds"].map((p: any) => {
          return p;
        }),
    incidentUrl: item["incidentUrl"],
    providerName: item["providerName"],
    providerIncidentId: item["providerIncidentId"],
    teamInformation: !item["teamInformation"]
      ? item["teamInformation"]
      : teamInformationDeserializer(item["teamInformation"]),
  };
}

/** Incident additional data property bag. */
export interface IncidentAdditionalData {
  /** The number of alerts in the incident */
  readonly alertsCount?: number;
  /** The number of bookmarks in the incident */
  readonly bookmarksCount?: number;
  /** The number of comments in the incident */
  readonly commentsCount?: number;
  /** List of product names of alerts in the incident */
  readonly alertProductNames?: string[];
  /** The tactics associated with incident */
  readonly tactics?: AttackTactic[];
  /** The techniques associated with incident's tactics */
  readonly techniques?: string[];
  /** The provider incident url to the incident in Microsoft 365 Defender portal */
  readonly providerIncidentUrl?: string;
  /** The incident number of the incident that the current incident was merged into */
  readonly mergedIncidentNumber?: string;
  /** The URL to the incident that the current incident was merged into */
  readonly mergedIncidentUrl?: string;
}

export function incidentAdditionalDataDeserializer(item: any): IncidentAdditionalData {
  return {
    alertsCount: item["alertsCount"],
    bookmarksCount: item["bookmarksCount"],
    commentsCount: item["commentsCount"],
    alertProductNames: !item["alertProductNames"]
      ? item["alertProductNames"]
      : item["alertProductNames"].map((p: any) => {
          return p;
        }),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    providerIncidentUrl: item["providerIncidentUrl"],
    mergedIncidentNumber: item["mergedIncidentNumber"],
    mergedIncidentUrl: item["mergedIncidentUrl"],
  };
}

/** Describes team information */
export interface TeamInformation {
  /** Team ID */
  readonly teamId?: string;
  /** The primary channel URL of the team */
  readonly primaryChannelUrl?: string;
  /** The time the team was created */
  readonly teamCreationTimeUtc?: Date;
  /** The name of the team */
  readonly name?: string;
  /** The description of the team */
  readonly description?: string;
}

export function teamInformationSerializer(item: TeamInformation): any {
  return item;
}

export function teamInformationDeserializer(item: any): TeamInformation {
  return {
    teamId: item["teamId"],
    primaryChannelUrl: item["primaryChannelUrl"],
    teamCreationTimeUtc: !item["teamCreationTimeUtc"]
      ? item["teamCreationTimeUtc"]
      : new Date(item["teamCreationTimeUtc"]),
    name: item["name"],
    description: item["description"],
  };
}

/** List all the incidents. */
export interface _IncidentList {
  /** The Incident items on this page */
  value: Incident[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _incidentListDeserializer(item: any): _IncidentList {
  return {
    value: incidentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function incidentArraySerializer(result: Array<Incident>): any[] {
  return result.map((item) => {
    return incidentSerializer(item);
  });
}

export function incidentArrayDeserializer(result: Array<Incident>): any[] {
  return result.map((item) => {
    return incidentDeserializer(item);
  });
}

/** model interface ManualTriggerRequestBody */
export interface ManualTriggerRequestBody {
  tenantId?: string;
  logicAppsResourceId: string;
}

export function manualTriggerRequestBodySerializer(item: ManualTriggerRequestBody): any {
  return { tenantId: item["tenantId"], logicAppsResourceId: item["logicAppsResourceId"] };
}

/** List of incident alerts. */
export interface IncidentAlertList {
  /** Array of incident alerts. */
  value: SecurityAlert[];
}

export function incidentAlertListDeserializer(item: any): IncidentAlertList {
  return {
    value: securityAlertArrayDeserializer(item["value"]),
  };
}

export function securityAlertArrayDeserializer(result: Array<SecurityAlert>): any[] {
  return result.map((item) => {
    return securityAlertDeserializer(item);
  });
}

/** Represents a security alert entity. */
export interface SecurityAlert extends Entity {
  /** The kind of the entity. */
  kind: "SecurityAlert";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The display name of the alert. */
  readonly alertDisplayName?: string;
  /** The type name of the alert. */
  readonly alertType?: string;
  /** Display name of the main entity being reported on. */
  readonly compromisedEntity?: string;
  /** The confidence level of this alert. */
  readonly confidenceLevel?: ConfidenceLevel;
  /** The confidence reasons */
  readonly confidenceReasons?: SecurityAlertPropertiesConfidenceReasonsItem[];
  /** The confidence score of the alert. */
  readonly confidenceScore?: number;
  /** The confidence score calculation status, i.e. indicating if score calculation is pending for this alert, not applicable or final. */
  readonly confidenceScoreStatus?: ConfidenceScoreStatus;
  /** Alert description. */
  readonly description?: string;
  /** The impact end time of the alert (the time of the last event contributing to the alert). */
  readonly endTimeUtc?: Date;
  /** Holds the alert intent stage(s) mapping for this alert. */
  readonly intent?: KillChainIntent;
  /** The identifier of the alert inside the product which generated the alert. */
  readonly providerAlertId?: string;
  /** The time the alert was made available for consumption. */
  readonly processingEndTime?: Date;
  /** The name of a component inside the product which generated the alert. */
  readonly productComponentName?: string;
  /** The name of the product which published this alert. */
  readonly productName?: string;
  /** The version of the product generating the alert. */
  readonly productVersion?: string;
  /** Manual action items to take to remediate the alert. */
  readonly remediationSteps?: string[];
  /** The severity of the alert */
  severity?: AlertSeverity;
  /** The impact start time of the alert (the time of the first event contributing to the alert). */
  readonly startTimeUtc?: Date;
  /** The lifecycle status of the alert. */
  readonly status?: AlertStatus;
  /** Holds the product identifier of the alert for the product. */
  readonly systemAlertId?: string;
  /** The tactics of the alert */
  readonly tactics?: AttackTactic[];
  /** The time the alert was generated. */
  readonly timeGenerated?: Date;
  /** The name of the vendor that raise the alert. */
  readonly vendorName?: string;
  /** The uri link of the alert. */
  readonly alertLink?: string;
  /** The list of resource identifiers of the alert. */
  readonly resourceIdentifiers?: any[];
}

export function securityAlertDeserializer(item: any): SecurityAlert {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityAlertPropertiesDeserializer(item["properties"])),
  };
}

/** SecurityAlert entity property bag. */
export interface SecurityAlertProperties extends EntityCommonProperties {
  /** The display name of the alert. */
  readonly alertDisplayName?: string;
  /** The type name of the alert. */
  readonly alertType?: string;
  /** Display name of the main entity being reported on. */
  readonly compromisedEntity?: string;
  /** The confidence level of this alert. */
  readonly confidenceLevel?: ConfidenceLevel;
  /** The confidence reasons */
  readonly confidenceReasons?: SecurityAlertPropertiesConfidenceReasonsItem[];
  /** The confidence score of the alert. */
  readonly confidenceScore?: number;
  /** The confidence score calculation status, i.e. indicating if score calculation is pending for this alert, not applicable or final. */
  readonly confidenceScoreStatus?: ConfidenceScoreStatus;
  /** Alert description. */
  readonly description?: string;
  /** The impact end time of the alert (the time of the last event contributing to the alert). */
  readonly endTimeUtc?: Date;
  /** Holds the alert intent stage(s) mapping for this alert. */
  readonly intent?: KillChainIntent;
  /** The identifier of the alert inside the product which generated the alert. */
  readonly providerAlertId?: string;
  /** The time the alert was made available for consumption. */
  readonly processingEndTime?: Date;
  /** The name of a component inside the product which generated the alert. */
  readonly productComponentName?: string;
  /** The name of the product which published this alert. */
  readonly productName?: string;
  /** The version of the product generating the alert. */
  readonly productVersion?: string;
  /** Manual action items to take to remediate the alert. */
  readonly remediationSteps?: string[];
  /** The severity of the alert */
  severity?: AlertSeverity;
  /** The impact start time of the alert (the time of the first event contributing to the alert). */
  readonly startTimeUtc?: Date;
  /** The lifecycle status of the alert. */
  readonly status?: AlertStatus;
  /** Holds the product identifier of the alert for the product. */
  readonly systemAlertId?: string;
  /** The tactics of the alert */
  readonly tactics?: AttackTactic[];
  /** The time the alert was generated. */
  readonly timeGenerated?: Date;
  /** The name of the vendor that raise the alert. */
  readonly vendorName?: string;
  /** The uri link of the alert. */
  readonly alertLink?: string;
  /** The list of resource identifiers of the alert. */
  readonly resourceIdentifiers?: any[];
}

export function securityAlertPropertiesDeserializer(item: any): SecurityAlertProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    alertDisplayName: item["alertDisplayName"],
    alertType: item["alertType"],
    compromisedEntity: item["compromisedEntity"],
    confidenceLevel: item["confidenceLevel"],
    confidenceReasons: !item["confidenceReasons"]
      ? item["confidenceReasons"]
      : securityAlertPropertiesConfidenceReasonsItemArrayDeserializer(item["confidenceReasons"]),
    confidenceScore: item["confidenceScore"],
    confidenceScoreStatus: item["confidenceScoreStatus"],
    description: item["description"],
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    intent: item["intent"],
    providerAlertId: item["providerAlertId"],
    processingEndTime: !item["processingEndTime"]
      ? item["processingEndTime"]
      : new Date(item["processingEndTime"]),
    productComponentName: item["productComponentName"],
    productName: item["productName"],
    productVersion: item["productVersion"],
    remediationSteps: !item["remediationSteps"]
      ? item["remediationSteps"]
      : item["remediationSteps"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    status: item["status"],
    systemAlertId: item["systemAlertId"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    vendorName: item["vendorName"],
    alertLink: item["alertLink"],
    resourceIdentifiers: !item["resourceIdentifiers"]
      ? item["resourceIdentifiers"]
      : item["resourceIdentifiers"].map((p: any) => {
          return p;
        }),
  };
}

/** The confidence level of this alert. */
export enum KnownConfidenceLevel {
  /** Unknown confidence, the is the default value */
  Unknown = "Unknown",
  /** Low confidence, meaning we have some doubts this is indeed malicious or part of an attack */
  Low = "Low",
  /** High confidence that the alert is true positive malicious */
  High = "High",
}

/**
 * The confidence level of this alert. \
 * {@link KnownConfidenceLevel} can be used interchangeably with ConfidenceLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown confidence, the is the default value \
 * **Low**: Low confidence, meaning we have some doubts this is indeed malicious or part of an attack \
 * **High**: High confidence that the alert is true positive malicious
 */
export type ConfidenceLevel = string;

export function securityAlertPropertiesConfidenceReasonsItemArrayDeserializer(
  result: Array<SecurityAlertPropertiesConfidenceReasonsItem>,
): any[] {
  return result.map((item) => {
    return securityAlertPropertiesConfidenceReasonsItemDeserializer(item);
  });
}

/** confidence reason item */
export interface SecurityAlertPropertiesConfidenceReasonsItem {
  /** The reason's description */
  readonly reason?: string;
  /** The type (category) of the reason */
  readonly reasonType?: string;
}

export function securityAlertPropertiesConfidenceReasonsItemDeserializer(
  item: any,
): SecurityAlertPropertiesConfidenceReasonsItem {
  return {
    reason: item["reason"],
    reasonType: item["reasonType"],
  };
}

/** The confidence score calculation status, i.e. indicating if score calculation is pending for this alert, not applicable or final. */
export enum KnownConfidenceScoreStatus {
  /** Score will not be calculated for this alert as it is not supported by virtual analyst */
  NotApplicable = "NotApplicable",
  /** No score was set yet and calculation is in progress */
  InProcess = "InProcess",
  /** Score is calculated and shown as part of the alert, but may be updated again at a later time following the processing of additional data */
  NotFinal = "NotFinal",
  /** Final score was calculated and available */
  Final = "Final",
}

/**
 * The confidence score calculation status, i.e. indicating if score calculation is pending for this alert, not applicable or final. \
 * {@link KnownConfidenceScoreStatus} can be used interchangeably with ConfidenceScoreStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: Score will not be calculated for this alert as it is not supported by virtual analyst \
 * **InProcess**: No score was set yet and calculation is in progress \
 * **NotFinal**: Score is calculated and shown as part of the alert, but may be updated again at a later time following the processing of additional data \
 * **Final**: Final score was calculated and available
 */
export type ConfidenceScoreStatus = string;

/** The intent of the alert. */
export enum KnownKillChainIntent {
  /** The default value. */
  Unknown = "Unknown",
  /** Probing could be an attempt to access a certain resource regardless of a malicious intent or a failed attempt to gain access to a target system to gather information prior to exploitation. This step is usually detected as an attempt originating from outside the network in attempt to scan the target system and find a way in. */
  Probing = "Probing",
  /** Exploitation is the stage where an attacker manage to get foothold on the attacked resource. This stage is applicable not only for compute hosts, but also for resources such as user accounts, certificates etc. Adversaries will often be able to control the resource after this stage. */
  Exploitation = "Exploitation",
  /** Persistence is any access, action, or configuration change to a system that gives an adversary a persistent presence on that system. Adversaries will often need to maintain access to systems through interruptions such as system restarts, loss of credentials, or other failures that would require a remote access tool to restart or alternate backdoor for them to regain access. */
  Persistence = "Persistence",
  /** Privilege escalation is the result of actions that allow an adversary to obtain a higher level of permissions on a system or network. Certain tools or actions require a higher level of privilege to work and are likely necessary at many points throughout an operation. User accounts with permissions to access specific systems or perform specific functions necessary for adversaries to achieve their objective may also be considered an escalation of privilege. */
  PrivilegeEscalation = "PrivilegeEscalation",
  /** Defense evasion consists of techniques an adversary may use to evade detection or avoid other defenses. Sometimes these actions are the same as or variations of techniques in other categories that have the added benefit of subverting a particular defense or mitigation. */
  DefenseEvasion = "DefenseEvasion",
  /** Credential access represents techniques resulting in access to or control over system, domain, or service credentials that are used within an enterprise environment. Adversaries will likely attempt to obtain legitimate credentials from users or administrator accounts (local system administrator or domain users with administrator access) to use within the network. With sufficient access within a network, an adversary can create accounts for later use within the environment. */
  CredentialAccess = "CredentialAccess",
  /** Discovery consists of techniques that allow the adversary to gain knowledge about the system and internal network. When adversaries gain access to a new system, they must navigate themselves to what they now have control of and what benefits operating from that system give to their current objective or overall goals during the intrusion. The operating system provides many native tools that aid in this post-compromise information-gathering phase. */
  Discovery = "Discovery",
  /** Lateral movement consists of techniques that enable an adversary to access and control remote systems on a network and could, but does not necessarily, include execution of tools on remote systems. The lateral movement techniques could allow an adversary to gather information from a system without needing additional tools, such as a remote access tool. An adversary can use lateral movement for many purposes, including remote Execution of tools, pivoting to additional systems, access to specific information or files, access to additional credentials, or to cause an effect. */
  LateralMovement = "LateralMovement",
  /** The execution tactic represents techniques that result in execution of adversary-controlled code on a local or remote system. This tactic is often used in conjunction with lateral movement to expand access to remote systems on a network. */
  Execution = "Execution",
  /** Collection consists of techniques used to identify and gather information, such as sensitive files, from a target network prior to exfiltration. This category also covers locations on a system or network where the adversary may look for information to exfiltrate. */
  Collection = "Collection",
  /** Exfiltration refers to techniques and attributes that result or aid in the adversary removing files and information from a target network. This category also covers locations on a system or network where the adversary may look for information to exfiltrate. */
  Exfiltration = "Exfiltration",
  /** The command and control tactic represents how adversaries communicate with systems under their control within a target network. */
  CommandAndControl = "CommandAndControl",
  /** The impact intent primary objective is to directly reduce the availability or integrity of a system, service, or network; including manipulation of data to impact a business or operational process. This would often refer to techniques such as ransom-ware, defacement, data manipulation and others. */
  Impact = "Impact",
}

/**
 * The intent of the alert. \
 * {@link KnownKillChainIntent} can be used interchangeably with KillChainIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value. \
 * **Probing**: Probing could be an attempt to access a certain resource regardless of a malicious intent or a failed attempt to gain access to a target system to gather information prior to exploitation. This step is usually detected as an attempt originating from outside the network in attempt to scan the target system and find a way in. \
 * **Exploitation**: Exploitation is the stage where an attacker manage to get foothold on the attacked resource. This stage is applicable not only for compute hosts, but also for resources such as user accounts, certificates etc. Adversaries will often be able to control the resource after this stage. \
 * **Persistence**: Persistence is any access, action, or configuration change to a system that gives an adversary a persistent presence on that system. Adversaries will often need to maintain access to systems through interruptions such as system restarts, loss of credentials, or other failures that would require a remote access tool to restart or alternate backdoor for them to regain access. \
 * **PrivilegeEscalation**: Privilege escalation is the result of actions that allow an adversary to obtain a higher level of permissions on a system or network. Certain tools or actions require a higher level of privilege to work and are likely necessary at many points throughout an operation. User accounts with permissions to access specific systems or perform specific functions necessary for adversaries to achieve their objective may also be considered an escalation of privilege. \
 * **DefenseEvasion**: Defense evasion consists of techniques an adversary may use to evade detection or avoid other defenses. Sometimes these actions are the same as or variations of techniques in other categories that have the added benefit of subverting a particular defense or mitigation. \
 * **CredentialAccess**: Credential access represents techniques resulting in access to or control over system, domain, or service credentials that are used within an enterprise environment. Adversaries will likely attempt to obtain legitimate credentials from users or administrator accounts (local system administrator or domain users with administrator access) to use within the network. With sufficient access within a network, an adversary can create accounts for later use within the environment. \
 * **Discovery**: Discovery consists of techniques that allow the adversary to gain knowledge about the system and internal network. When adversaries gain access to a new system, they must navigate themselves to what they now have control of and what benefits operating from that system give to their current objective or overall goals during the intrusion. The operating system provides many native tools that aid in this post-compromise information-gathering phase. \
 * **LateralMovement**: Lateral movement consists of techniques that enable an adversary to access and control remote systems on a network and could, but does not necessarily, include execution of tools on remote systems. The lateral movement techniques could allow an adversary to gather information from a system without needing additional tools, such as a remote access tool. An adversary can use lateral movement for many purposes, including remote Execution of tools, pivoting to additional systems, access to specific information or files, access to additional credentials, or to cause an effect. \
 * **Execution**: The execution tactic represents techniques that result in execution of adversary-controlled code on a local or remote system. This tactic is often used in conjunction with lateral movement to expand access to remote systems on a network. \
 * **Collection**: Collection consists of techniques used to identify and gather information, such as sensitive files, from a target network prior to exfiltration. This category also covers locations on a system or network where the adversary may look for information to exfiltrate. \
 * **Exfiltration**: Exfiltration refers to techniques and attributes that result or aid in the adversary removing files and information from a target network. This category also covers locations on a system or network where the adversary may look for information to exfiltrate. \
 * **CommandAndControl**: The command and control tactic represents how adversaries communicate with systems under their control within a target network. \
 * **Impact**: The impact intent primary objective is to directly reduce the availability or integrity of a system, service, or network; including manipulation of data to impact a business or operational process. This would often refer to techniques such as ransom-ware, defacement, data manipulation and others.
 */
export type KillChainIntent = string;

/** The lifecycle status of the alert. */
export enum KnownAlertStatus {
  /** Unknown value */
  Unknown = "Unknown",
  /** New alert */
  New = "New",
  /** Alert closed after handling */
  Resolved = "Resolved",
  /** Alert dismissed as false positive */
  Dismissed = "Dismissed",
  /** Alert is being handled */
  InProgress = "InProgress",
}

/**
 * The lifecycle status of the alert. \
 * {@link KnownAlertStatus} can be used interchangeably with AlertStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown value \
 * **New**: New alert \
 * **Resolved**: Alert closed after handling \
 * **Dismissed**: Alert dismissed as false positive \
 * **InProgress**: Alert is being handled
 */
export type AlertStatus = string;

/** Entity common property bag. */
export interface EntityCommonProperties {
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
}

export function entityCommonPropertiesSerializer(item: EntityCommonProperties): any {
  return item;
}

export function entityCommonPropertiesDeserializer(item: any): EntityCommonProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
  };
}

/** Specific entity. */
export interface Entity extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: SecurityAlert, Bookmark, Account, AzureResource, CloudApplication, DnsResolution, File, FileHash, Host, IoTDevice, Ip, Mailbox, MailCluster, MailMessage, Malware, Process, RegistryKey, RegistryValue, SecurityGroup, SubmissionMail, Url, Nic */
  kind: EntityKindEnum;
}

export function entityDeserializer(item: any): Entity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for EntityUnion */
export type EntityUnion =
  | SecurityAlert
  | HuntingBookmark
  | AccountEntity
  | AzureResourceEntity
  | CloudApplicationEntity
  | DnsEntity
  | FileEntity
  | FileHashEntity
  | HostEntity
  | IoTDeviceEntity
  | IpEntity
  | MailboxEntity
  | MailClusterEntity
  | MailMessageEntity
  | MalwareEntity
  | ProcessEntity
  | RegistryKeyEntity
  | RegistryValueEntity
  | SecurityGroupEntity
  | SubmissionMailEntity
  | UrlEntity
  | NicEntity
  | Entity;

export function entityUnionDeserializer(item: any): EntityUnion {
  switch (item["kind"]) {
    case "SecurityAlert":
      return securityAlertDeserializer(item as SecurityAlert);

    case "Bookmark":
      return huntingBookmarkDeserializer(item as HuntingBookmark);

    case "Account":
      return accountEntityDeserializer(item as AccountEntity);

    case "AzureResource":
      return azureResourceEntityDeserializer(item as AzureResourceEntity);

    case "CloudApplication":
      return cloudApplicationEntityDeserializer(item as CloudApplicationEntity);

    case "DnsResolution":
      return dnsEntityDeserializer(item as DnsEntity);

    case "File":
      return fileEntityDeserializer(item as FileEntity);

    case "FileHash":
      return fileHashEntityDeserializer(item as FileHashEntity);

    case "Host":
      return hostEntityDeserializer(item as HostEntity);

    case "IoTDevice":
      return ioTDeviceEntityDeserializer(item as IoTDeviceEntity);

    case "Ip":
      return ipEntityDeserializer(item as IpEntity);

    case "Mailbox":
      return mailboxEntityDeserializer(item as MailboxEntity);

    case "MailCluster":
      return mailClusterEntityDeserializer(item as MailClusterEntity);

    case "MailMessage":
      return mailMessageEntityDeserializer(item as MailMessageEntity);

    case "Malware":
      return malwareEntityDeserializer(item as MalwareEntity);

    case "Process":
      return processEntityDeserializer(item as ProcessEntity);

    case "RegistryKey":
      return registryKeyEntityDeserializer(item as RegistryKeyEntity);

    case "RegistryValue":
      return registryValueEntityDeserializer(item as RegistryValueEntity);

    case "SecurityGroup":
      return securityGroupEntityDeserializer(item as SecurityGroupEntity);

    case "SubmissionMail":
      return submissionMailEntityDeserializer(item as SubmissionMailEntity);

    case "Url":
      return urlEntityDeserializer(item as UrlEntity);

    case "Nic":
      return nicEntityDeserializer(item as NicEntity);

    default:
      return entityDeserializer(item);
  }
}

/** The kind of the entity */
export enum KnownEntityKindEnum {
  /** Entity represents account in the system. */
  Account = "Account",
  /** Entity represents host in the system. */
  Host = "Host",
  /** Entity represents file in the system. */
  File = "File",
  /** Entity represents azure resource in the system. */
  AzureResource = "AzureResource",
  /** Entity represents cloud application in the system. */
  CloudApplication = "CloudApplication",
  /** Entity represents dns resolution in the system. */
  DnsResolution = "DnsResolution",
  /** Entity represents file hash in the system. */
  FileHash = "FileHash",
  /** Entity represents ip in the system. */
  Ip = "Ip",
  /** Entity represents malware in the system. */
  Malware = "Malware",
  /** Entity represents process in the system. */
  Process = "Process",
  /** Entity represents registry key in the system. */
  RegistryKey = "RegistryKey",
  /** Entity represents registry value in the system. */
  RegistryValue = "RegistryValue",
  /** Entity represents security group in the system. */
  SecurityGroup = "SecurityGroup",
  /** Entity represents url in the system. */
  Url = "Url",
  /** Entity represents IoT device in the system. */
  IoTDevice = "IoTDevice",
  /** Entity represents security alert in the system. */
  SecurityAlert = "SecurityAlert",
  /** Entity represents bookmark in the system. */
  Bookmark = "Bookmark",
  /** Entity represents mail cluster in the system. */
  MailCluster = "MailCluster",
  /** Entity represents mail message in the system. */
  MailMessage = "MailMessage",
  /** Entity represents mailbox in the system. */
  Mailbox = "Mailbox",
  /** Entity represents submission mail in the system. */
  SubmissionMail = "SubmissionMail",
  /** Entity represents network interface in the system. */
  Nic = "Nic",
}

/**
 * The kind of the entity \
 * {@link KnownEntityKindEnum} can be used interchangeably with EntityKindEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Account**: Entity represents account in the system. \
 * **Host**: Entity represents host in the system. \
 * **File**: Entity represents file in the system. \
 * **AzureResource**: Entity represents azure resource in the system. \
 * **CloudApplication**: Entity represents cloud application in the system. \
 * **DnsResolution**: Entity represents dns resolution in the system. \
 * **FileHash**: Entity represents file hash in the system. \
 * **Ip**: Entity represents ip in the system. \
 * **Malware**: Entity represents malware in the system. \
 * **Process**: Entity represents process in the system. \
 * **RegistryKey**: Entity represents registry key in the system. \
 * **RegistryValue**: Entity represents registry value in the system. \
 * **SecurityGroup**: Entity represents security group in the system. \
 * **Url**: Entity represents url in the system. \
 * **IoTDevice**: Entity represents IoT device in the system. \
 * **SecurityAlert**: Entity represents security alert in the system. \
 * **Bookmark**: Entity represents bookmark in the system. \
 * **MailCluster**: Entity represents mail cluster in the system. \
 * **MailMessage**: Entity represents mail message in the system. \
 * **Mailbox**: Entity represents mailbox in the system. \
 * **SubmissionMail**: Entity represents submission mail in the system. \
 * **Nic**: Entity represents network interface in the system.
 */
export type EntityKindEnum = string;

/** Represents a Hunting bookmark entity. */
export interface HuntingBookmark extends Entity {
  /** The kind of the entity. */
  kind: "Bookmark";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The time the bookmark was created */
  created?: Date;
  /** Describes a user that created the bookmark */
  createdBy?: UserInfo;
  /** The display name of the bookmark */
  displayName?: string;
  /** The time of the event */
  eventTime?: Date;
  /** List of labels relevant to this bookmark */
  labels?: string[];
  /** The notes of the bookmark */
  notes?: string;
  /** The query of the bookmark. */
  query?: string;
  /** The query result of the bookmark. */
  queryResult?: string;
  /** The last time the bookmark was updated */
  updated?: Date;
  /** Describes a user that updated the bookmark */
  updatedBy?: UserInfo;
  /** Describes an incident that relates to bookmark */
  incidentInfo?: IncidentInfo;
}

export function huntingBookmarkDeserializer(item: any): HuntingBookmark {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _huntingBookmarkPropertiesDeserializer(item["properties"])),
  };
}

/** Describes bookmark properties */
export interface HuntingBookmarkProperties extends EntityCommonProperties {
  /** The time the bookmark was created */
  created?: Date;
  /** Describes a user that created the bookmark */
  createdBy?: UserInfo;
  /** The display name of the bookmark */
  displayName: string;
  /** The time of the event */
  eventTime?: Date;
  /** List of labels relevant to this bookmark */
  labels?: string[];
  /** The notes of the bookmark */
  notes?: string;
  /** The query of the bookmark. */
  query: string;
  /** The query result of the bookmark. */
  queryResult?: string;
  /** The last time the bookmark was updated */
  updated?: Date;
  /** Describes a user that updated the bookmark */
  updatedBy?: UserInfo;
  /** Describes an incident that relates to bookmark */
  incidentInfo?: IncidentInfo;
}

export function huntingBookmarkPropertiesDeserializer(item: any): HuntingBookmarkProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    displayName: item["displayName"],
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoDeserializer(item["incidentInfo"]),
  };
}

/** User information that made some action */
export interface UserInfo {
  /** The email of the user. */
  readonly email?: string;
  /** The name of the user. */
  readonly name?: string;
  /** The object id of the user. */
  objectId?: string;
}

export function userInfoSerializer(item: UserInfo): any {
  return { objectId: item["objectId"] };
}

export function userInfoDeserializer(item: any): UserInfo {
  return {
    email: item["email"],
    name: item["name"],
    objectId: item["objectId"],
  };
}

/** Describes related incident information for the bookmark */
export interface IncidentInfo {
  /** Incident Id */
  incidentId?: string;
  /** The severity of the incident */
  severity?: IncidentSeverity;
  /** The title of the incident */
  title?: string;
  /** Relation Name */
  relationName?: string;
}

export function incidentInfoSerializer(item: IncidentInfo): any {
  return {
    incidentId: item["incidentId"],
    severity: item["severity"],
    title: item["title"],
    relationName: item["relationName"],
  };
}

export function incidentInfoDeserializer(item: any): IncidentInfo {
  return {
    incidentId: item["incidentId"],
    severity: item["severity"],
    title: item["title"],
    relationName: item["relationName"],
  };
}

/** Represents an account entity. */
export interface AccountEntity extends Entity {
  /** The kind of the entity. */
  kind: "Account";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The Azure Active Directory tenant id. */
  readonly aadTenantId?: string;
  /** The Azure Active Directory user id. */
  readonly aadUserId?: string;
  /** The name of the account. This field should hold only the name without any domain added to it, i.e. administrator. */
  readonly accountName?: string;
  /** The display name of the account. */
  readonly displayName?: string;
  /** The Host entity id that contains the account in case it is a local account (not domain joined) */
  readonly hostEntityId?: string;
  /** Determines whether this is a domain account. */
  readonly isDomainJoined?: boolean;
  /** The NetBIOS domain name as it appears in the alert format domain/username. Examples: NT AUTHORITY. */
  readonly ntDomain?: string;
  /** The objectGUID attribute is a single-value attribute that is the unique identifier for the object, assigned by active directory. */
  readonly objectGuid?: string;
  /** The Azure Active Directory Passport User ID. */
  readonly puid?: string;
  /** The account security identifier, e.g. S-1-5-18. */
  readonly sid?: string;
  /** The user principal name suffix for the account, in some cases it is also the domain name. Examples: contoso.com. */
  readonly upnSuffix?: string;
  /** The fully qualified domain DNS name. */
  readonly dnsDomain?: string;
}

export function accountEntityDeserializer(item: any): AccountEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accountEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Account entity property bag. */
export interface AccountEntityProperties extends EntityCommonProperties {
  /** The Azure Active Directory tenant id. */
  readonly aadTenantId?: string;
  /** The Azure Active Directory user id. */
  readonly aadUserId?: string;
  /** The name of the account. This field should hold only the name without any domain added to it, i.e. administrator. */
  readonly accountName?: string;
  /** The display name of the account. */
  readonly displayName?: string;
  /** The Host entity id that contains the account in case it is a local account (not domain joined) */
  readonly hostEntityId?: string;
  /** Determines whether this is a domain account. */
  readonly isDomainJoined?: boolean;
  /** The NetBIOS domain name as it appears in the alert format domain/username. Examples: NT AUTHORITY. */
  readonly ntDomain?: string;
  /** The objectGUID attribute is a single-value attribute that is the unique identifier for the object, assigned by active directory. */
  readonly objectGuid?: string;
  /** The Azure Active Directory Passport User ID. */
  readonly puid?: string;
  /** The account security identifier, e.g. S-1-5-18. */
  readonly sid?: string;
  /** The user principal name suffix for the account, in some cases it is also the domain name. Examples: contoso.com. */
  readonly upnSuffix?: string;
  /** The fully qualified domain DNS name. */
  readonly dnsDomain?: string;
}

export function accountEntityPropertiesDeserializer(item: any): AccountEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    aadTenantId: item["aadTenantId"],
    aadUserId: item["aadUserId"],
    accountName: item["accountName"],
    displayName: item["displayName"],
    hostEntityId: item["hostEntityId"],
    isDomainJoined: item["isDomainJoined"],
    ntDomain: item["ntDomain"],
    objectGuid: item["objectGuid"],
    puid: item["puid"],
    sid: item["sid"],
    upnSuffix: item["upnSuffix"],
    dnsDomain: item["dnsDomain"],
  };
}

/** Represents an azure resource entity. */
export interface AzureResourceEntity extends Entity {
  /** The kind of the entity. */
  kind: "AzureResource";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The azure resource id of the resource */
  readonly resourceId?: string;
  /** The subscription id of the resource */
  readonly subscriptionId?: string;
}

export function azureResourceEntityDeserializer(item: any): AzureResourceEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _azureResourceEntityPropertiesDeserializer(item["properties"])),
  };
}

/** AzureResource entity property bag. */
export interface AzureResourceEntityProperties extends EntityCommonProperties {
  /** The azure resource id of the resource */
  readonly resourceId?: string;
  /** The subscription id of the resource */
  readonly subscriptionId?: string;
}

export function azureResourceEntityPropertiesDeserializer(
  item: any,
): AzureResourceEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    resourceId: item["resourceId"],
    subscriptionId: item["subscriptionId"],
  };
}

/** Represents a cloud application entity. */
export interface CloudApplicationEntity extends Entity {
  /** The kind of the entity. */
  kind: "CloudApplication";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The technical identifier of the application. */
  readonly appId?: number;
  /** The name of the related cloud application. */
  readonly appName?: string;
  /** The user defined instance name of the cloud application. It is often used to distinguish between several applications of the same type that a customer has. */
  readonly instanceName?: string;
}

export function cloudApplicationEntityDeserializer(item: any): CloudApplicationEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cloudApplicationEntityPropertiesDeserializer(item["properties"])),
  };
}

/** CloudApplication entity property bag. */
export interface CloudApplicationEntityProperties extends EntityCommonProperties {
  /** The technical identifier of the application. */
  readonly appId?: number;
  /** The name of the related cloud application. */
  readonly appName?: string;
  /** The user defined instance name of the cloud application. It is often used to distinguish between several applications of the same type that a customer has. */
  readonly instanceName?: string;
}

export function cloudApplicationEntityPropertiesDeserializer(
  item: any,
): CloudApplicationEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    appId: item["appId"],
    appName: item["appName"],
    instanceName: item["instanceName"],
  };
}

/** Represents a dns entity. */
export interface DnsEntity extends Entity {
  /** The kind of the entity. */
  kind: "DnsResolution";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** An ip entity id for the dns server resolving the request */
  readonly dnsServerIpEntityId?: string;
  /** The name of the dns record associated with the alert */
  readonly domainName?: string;
  /** An ip entity id for the dns request client */
  readonly hostIpAddressEntityId?: string;
  /** Ip entity identifiers for the resolved ip address. */
  readonly ipAddressEntityIds?: string[];
}

export function dnsEntityDeserializer(item: any): DnsEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dnsEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Dns entity property bag. */
export interface DnsEntityProperties extends EntityCommonProperties {
  /** An ip entity id for the dns server resolving the request */
  readonly dnsServerIpEntityId?: string;
  /** The name of the dns record associated with the alert */
  readonly domainName?: string;
  /** An ip entity id for the dns request client */
  readonly hostIpAddressEntityId?: string;
  /** Ip entity identifiers for the resolved ip address. */
  readonly ipAddressEntityIds?: string[];
}

export function dnsEntityPropertiesDeserializer(item: any): DnsEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    dnsServerIpEntityId: item["dnsServerIpEntityId"],
    domainName: item["domainName"],
    hostIpAddressEntityId: item["hostIpAddressEntityId"],
    ipAddressEntityIds: !item["ipAddressEntityIds"]
      ? item["ipAddressEntityIds"]
      : item["ipAddressEntityIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents a file entity. */
export interface FileEntity extends Entity {
  /** The kind of the entity. */
  kind: "File";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The full path to the file. */
  readonly directory?: string;
  /** The file hash entity identifiers associated with this file */
  readonly fileHashEntityIds?: string[];
  /** The file name without path (some alerts might not include path). */
  readonly fileName?: string;
  /** The Host entity id which the file belongs to */
  readonly hostEntityId?: string;
}

export function fileEntityDeserializer(item: any): FileEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileEntityPropertiesDeserializer(item["properties"])),
  };
}

/** File entity property bag. */
export interface FileEntityProperties extends EntityCommonProperties {
  /** The full path to the file. */
  readonly directory?: string;
  /** The file hash entity identifiers associated with this file */
  readonly fileHashEntityIds?: string[];
  /** The file name without path (some alerts might not include path). */
  readonly fileName?: string;
  /** The Host entity id which the file belongs to */
  readonly hostEntityId?: string;
}

export function fileEntityPropertiesDeserializer(item: any): FileEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    directory: item["directory"],
    fileHashEntityIds: !item["fileHashEntityIds"]
      ? item["fileHashEntityIds"]
      : item["fileHashEntityIds"].map((p: any) => {
          return p;
        }),
    fileName: item["fileName"],
    hostEntityId: item["hostEntityId"],
  };
}

/** Represents a file hash entity. */
export interface FileHashEntity extends Entity {
  /** The kind of the entity. */
  kind: "FileHash";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The hash algorithm type. */
  readonly algorithm?: FileHashAlgorithm;
  /** The file hash value. */
  readonly hashValue?: string;
}

export function fileHashEntityDeserializer(item: any): FileHashEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileHashEntityPropertiesDeserializer(item["properties"])),
  };
}

/** FileHash entity property bag. */
export interface FileHashEntityProperties extends EntityCommonProperties {
  /** The hash algorithm type. */
  readonly algorithm?: FileHashAlgorithm;
  /** The file hash value. */
  readonly hashValue?: string;
}

export function fileHashEntityPropertiesDeserializer(item: any): FileHashEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    algorithm: item["algorithm"],
    hashValue: item["hashValue"],
  };
}

/** The hash algorithm type. */
export enum KnownFileHashAlgorithm {
  /** Unknown hash algorithm */
  Unknown = "Unknown",
  /** MD5 hash type */
  MD5 = "MD5",
  /** SHA1 hash type */
  SHA1 = "SHA1",
  /** SHA256 hash type */
  SHA256 = "SHA256",
  /** SHA256 Authenticode hash type */
  SHA256AC = "SHA256AC",
}

/**
 * The hash algorithm type. \
 * {@link KnownFileHashAlgorithm} can be used interchangeably with FileHashAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown hash algorithm \
 * **MD5**: MD5 hash type \
 * **SHA1**: SHA1 hash type \
 * **SHA256**: SHA256 hash type \
 * **SHA256AC**: SHA256 Authenticode hash type
 */
export type FileHashAlgorithm = string;

/** Represents a host entity. */
export interface HostEntity extends Entity {
  /** The kind of the entity. */
  kind: "Host";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The azure resource id of the VM. */
  readonly azureID?: string;
  /** The DNS domain that this host belongs to. Should contain the compete DNS suffix for the domain */
  readonly dnsDomain?: string;
  /** The hostname without the domain suffix. */
  readonly hostName?: string;
  /** Determines whether this host belongs to a domain. */
  readonly isDomainJoined?: boolean;
  /** The host name (pre-windows2000). */
  readonly netBiosName?: string;
  /** The NT domain that this host belongs to. */
  readonly ntDomain?: string;
  /** The OMS agent id, if the host has OMS agent installed. */
  readonly omsAgentID?: string;
  /** The operating system type. */
  osFamily?: OSFamily;
  /** A free text representation of the operating system. This field is meant to hold specific versions the are more fine grained than OSFamily or future values not supported by OSFamily enumeration */
  readonly osVersion?: string;
}

export function hostEntityDeserializer(item: any): HostEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _hostEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Host entity property bag. */
export interface HostEntityProperties extends EntityCommonProperties {
  /** The azure resource id of the VM. */
  readonly azureID?: string;
  /** The DNS domain that this host belongs to. Should contain the compete DNS suffix for the domain */
  readonly dnsDomain?: string;
  /** The hostname without the domain suffix. */
  readonly hostName?: string;
  /** Determines whether this host belongs to a domain. */
  readonly isDomainJoined?: boolean;
  /** The host name (pre-windows2000). */
  readonly netBiosName?: string;
  /** The NT domain that this host belongs to. */
  readonly ntDomain?: string;
  /** The OMS agent id, if the host has OMS agent installed. */
  readonly omsAgentID?: string;
  /** The operating system type. */
  osFamily?: OSFamily;
  /** A free text representation of the operating system. This field is meant to hold specific versions the are more fine grained than OSFamily or future values not supported by OSFamily enumeration */
  readonly osVersion?: string;
}

export function hostEntityPropertiesDeserializer(item: any): HostEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    azureID: item["azureID"],
    dnsDomain: item["dnsDomain"],
    hostName: item["hostName"],
    isDomainJoined: item["isDomainJoined"],
    netBiosName: item["netBiosName"],
    ntDomain: item["ntDomain"],
    omsAgentID: item["omsAgentID"],
    osFamily: item["osFamily"],
    osVersion: item["osVersion"],
  };
}

/** The operating system type. */
export type OSFamily = "Linux" | "Windows" | "Android" | "IOS" | "Unknown";

/** Represents an IoT device entity. */
export interface IoTDeviceEntity extends Entity {
  /** The kind of the entity. */
  kind: "IoTDevice";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The ID of the IoT Device in the IoT Hub */
  readonly deviceId?: string;
  /** The friendly name of the device */
  readonly deviceName?: string;
  /** The source of the device */
  readonly source?: string;
  /** The ID of the security agent running on the device */
  readonly iotSecurityAgentId?: string;
  /** The type of the device */
  readonly deviceType?: string;
  /** The vendor of the device */
  readonly vendor?: string;
  /** The ID of the edge device */
  readonly edgeId?: string;
  /** The MAC address of the device */
  readonly macAddress?: string;
  /** The model of the device */
  readonly model?: string;
  /** The serial number of the device */
  readonly serialNumber?: string;
  /** The firmware version of the device */
  readonly firmwareVersion?: string;
  /** The operating system of the device */
  readonly operatingSystem?: string;
  /** The AzureResource entity id of the IoT Hub */
  readonly iotHubEntityId?: string;
  /** The Host entity id of this device */
  readonly hostEntityId?: string;
  /** The IP entity if of this device */
  readonly ipAddressEntityId?: string;
  /** A list of TI contexts attached to the IoTDevice entity. */
  readonly threatIntelligence?: ThreatIntelligence[];
  /** A list of protocols of the IoTDevice entity. */
  readonly protocols?: string[];
  /** A list of owners of the IoTDevice entity. */
  readonly owners?: string[];
  /** A list of Nic entity ids of the IoTDevice entity. */
  readonly nicEntityIds?: string[];
  /** The site of the device */
  readonly site?: string;
  /** The zone location of the device within a site */
  readonly zone?: string;
  /** The sensor the device is monitored by */
  readonly sensor?: string;
  /** The subType of the device ('PLC', 'HMI', 'EWS', etc.) */
  readonly deviceSubType?: string;
  /** Device importance, determines if the device classified as 'crown jewel' */
  importance?: DeviceImportance;
  /** The Purdue Layer of the device */
  readonly purdueLayer?: string;
  /** Determines whether the device classified as authorized device */
  readonly isAuthorized?: boolean;
  /** Determines whether the device classified as programming device */
  readonly isProgramming?: boolean;
  /** Is the device classified as a scanner device */
  readonly isScanner?: boolean;
}

export function ioTDeviceEntityDeserializer(item: any): IoTDeviceEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTDeviceEntityPropertiesDeserializer(item["properties"])),
  };
}

/** IoTDevice entity property bag. */
export interface IoTDeviceEntityProperties extends EntityCommonProperties {
  /** The ID of the IoT Device in the IoT Hub */
  readonly deviceId?: string;
  /** The friendly name of the device */
  readonly deviceName?: string;
  /** The source of the device */
  readonly source?: string;
  /** The ID of the security agent running on the device */
  readonly iotSecurityAgentId?: string;
  /** The type of the device */
  readonly deviceType?: string;
  /** The vendor of the device */
  readonly vendor?: string;
  /** The ID of the edge device */
  readonly edgeId?: string;
  /** The MAC address of the device */
  readonly macAddress?: string;
  /** The model of the device */
  readonly model?: string;
  /** The serial number of the device */
  readonly serialNumber?: string;
  /** The firmware version of the device */
  readonly firmwareVersion?: string;
  /** The operating system of the device */
  readonly operatingSystem?: string;
  /** The AzureResource entity id of the IoT Hub */
  readonly iotHubEntityId?: string;
  /** The Host entity id of this device */
  readonly hostEntityId?: string;
  /** The IP entity if of this device */
  readonly ipAddressEntityId?: string;
  /** A list of TI contexts attached to the IoTDevice entity. */
  readonly threatIntelligence?: ThreatIntelligence[];
  /** A list of protocols of the IoTDevice entity. */
  readonly protocols?: string[];
  /** A list of owners of the IoTDevice entity. */
  readonly owners?: string[];
  /** A list of Nic entity ids of the IoTDevice entity. */
  readonly nicEntityIds?: string[];
  /** The site of the device */
  readonly site?: string;
  /** The zone location of the device within a site */
  readonly zone?: string;
  /** The sensor the device is monitored by */
  readonly sensor?: string;
  /** The subType of the device ('PLC', 'HMI', 'EWS', etc.) */
  readonly deviceSubType?: string;
  /** Device importance, determines if the device classified as 'crown jewel' */
  importance?: DeviceImportance;
  /** The Purdue Layer of the device */
  readonly purdueLayer?: string;
  /** Determines whether the device classified as authorized device */
  readonly isAuthorized?: boolean;
  /** Determines whether the device classified as programming device */
  readonly isProgramming?: boolean;
  /** Is the device classified as a scanner device */
  readonly isScanner?: boolean;
}

export function ioTDeviceEntityPropertiesDeserializer(item: any): IoTDeviceEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    deviceId: item["deviceId"],
    deviceName: item["deviceName"],
    source: item["source"],
    iotSecurityAgentId: item["iotSecurityAgentId"],
    deviceType: item["deviceType"],
    vendor: item["vendor"],
    edgeId: item["edgeId"],
    macAddress: item["macAddress"],
    model: item["model"],
    serialNumber: item["serialNumber"],
    firmwareVersion: item["firmwareVersion"],
    operatingSystem: item["operatingSystem"],
    iotHubEntityId: item["iotHubEntityId"],
    hostEntityId: item["hostEntityId"],
    ipAddressEntityId: item["ipAddressEntityId"],
    threatIntelligence: !item["threatIntelligence"]
      ? item["threatIntelligence"]
      : threatIntelligenceArrayDeserializer(item["threatIntelligence"]),
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    owners: !item["owners"]
      ? item["owners"]
      : item["owners"].map((p: any) => {
          return p;
        }),
    nicEntityIds: !item["nicEntityIds"]
      ? item["nicEntityIds"]
      : item["nicEntityIds"].map((p: any) => {
          return p;
        }),
    site: item["site"],
    zone: item["zone"],
    sensor: item["sensor"],
    deviceSubType: item["deviceSubType"],
    importance: item["importance"],
    purdueLayer: item["purdueLayer"],
    isAuthorized: item["isAuthorized"],
    isProgramming: item["isProgramming"],
    isScanner: item["isScanner"],
  };
}

export function threatIntelligenceArrayDeserializer(result: Array<ThreatIntelligence>): any[] {
  return result.map((item) => {
    return threatIntelligenceDeserializer(item);
  });
}

/** ThreatIntelligence property bag. */
export interface ThreatIntelligence {
  /** Confidence (must be between 0 and 1) */
  readonly confidence?: number;
  /** Name of the provider from whom this Threat Intelligence information was received */
  readonly providerName?: string;
  /** Report link */
  readonly reportLink?: string;
  /** Threat description (free text) */
  readonly threatDescription?: string;
  /** Threat name (e.g. "Jedobot malware") */
  readonly threatName?: string;
  /** Threat type (e.g. "Botnet") */
  readonly threatType?: string;
}

export function threatIntelligenceDeserializer(item: any): ThreatIntelligence {
  return {
    confidence: item["confidence"],
    providerName: item["providerName"],
    reportLink: item["reportLink"],
    threatDescription: item["threatDescription"],
    threatName: item["threatName"],
    threatType: item["threatType"],
  };
}

/** Device importance, determines if the device classified as 'crown jewel' */
export enum KnownDeviceImportance {
  /** Unknown - Default value */
  Unknown = "Unknown",
  /** Low */
  Low = "Low",
  /** Normal */
  Normal = "Normal",
  /** High */
  High = "High",
}

/**
 * Device importance, determines if the device classified as 'crown jewel' \
 * {@link KnownDeviceImportance} can be used interchangeably with DeviceImportance,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Default value \
 * **Low**: Low \
 * **Normal**: Normal \
 * **High**: High
 */
export type DeviceImportance = string;

/** Represents an ip entity. */
export interface IpEntity extends Entity {
  /** The kind of the entity. */
  kind: "Ip";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The IP address as string, e.g. 127.0.0.1 (either in Ipv4 or Ipv6) */
  readonly address?: string;
  /** The geo-location context attached to the ip entity */
  readonly location?: GeoLocation;
  /** A list of TI contexts attached to the ip entity. */
  readonly threatIntelligence?: ThreatIntelligence[];
}

export function ipEntityDeserializer(item: any): IpEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ipEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Ip entity property bag. */
export interface IpEntityProperties extends EntityCommonProperties {
  /** The IP address as string, e.g. 127.0.0.1 (either in Ipv4 or Ipv6) */
  readonly address?: string;
  /** The geo-location context attached to the ip entity */
  readonly location?: GeoLocation;
  /** A list of TI contexts attached to the ip entity. */
  readonly threatIntelligence?: ThreatIntelligence[];
}

export function ipEntityPropertiesDeserializer(item: any): IpEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    address: item["address"],
    location: !item["location"] ? item["location"] : geoLocationDeserializer(item["location"]),
    threatIntelligence: !item["threatIntelligence"]
      ? item["threatIntelligence"]
      : threatIntelligenceArrayDeserializer(item["threatIntelligence"]),
  };
}

/** The geo-location context attached to the ip entity */
export interface GeoLocation {
  /** Autonomous System Number */
  readonly asn?: number;
  /** City name */
  readonly city?: string;
  /** The country code according to ISO 3166 format */
  readonly countryCode?: string;
  /** Country name according to ISO 3166 Alpha 2: the lowercase of the English Short Name */
  readonly countryName?: string;
  /** The latitude of the identified location, expressed as a floating point number with range of - 90 to 90. Latitude and longitude are derived from the city or postal code. */
  readonly latitude?: number;
  /** The longitude of the identified location, expressed as a floating point number with range of -180 to 180. Latitude and longitude are derived from the city or postal code. */
  readonly longitude?: number;
  /** State name */
  readonly state?: string;
}

export function geoLocationDeserializer(item: any): GeoLocation {
  return {
    asn: item["asn"],
    city: item["city"],
    countryCode: item["countryCode"],
    countryName: item["countryName"],
    latitude: item["latitude"],
    longitude: item["longitude"],
    state: item["state"],
  };
}

/** Represents a mailbox entity. */
export interface MailboxEntity extends Entity {
  /** The kind of the entity. */
  kind: "Mailbox";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The mailbox's primary address */
  readonly mailboxPrimaryAddress?: string;
  /** The mailbox's display name */
  readonly displayName?: string;
  /** The mailbox's UPN */
  readonly upn?: string;
  /** The AzureAD identifier of mailbox. Similar to AadUserId in account entity but this property is specific to mailbox object on office side */
  readonly externalDirectoryObjectId?: string;
}

export function mailboxEntityDeserializer(item: any): MailboxEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mailboxEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Mailbox entity property bag. */
export interface MailboxEntityProperties extends EntityCommonProperties {
  /** The mailbox's primary address */
  readonly mailboxPrimaryAddress?: string;
  /** The mailbox's display name */
  readonly displayName?: string;
  /** The mailbox's UPN */
  readonly upn?: string;
  /** The AzureAD identifier of mailbox. Similar to AadUserId in account entity but this property is specific to mailbox object on office side */
  readonly externalDirectoryObjectId?: string;
}

export function mailboxEntityPropertiesDeserializer(item: any): MailboxEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    mailboxPrimaryAddress: item["mailboxPrimaryAddress"],
    displayName: item["displayName"],
    upn: item["upn"],
    externalDirectoryObjectId: item["externalDirectoryObjectId"],
  };
}

/** Represents a mail cluster entity. */
export interface MailClusterEntity extends Entity {
  /** The kind of the entity. */
  kind: "MailCluster";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The mail message IDs that are part of the mail cluster */
  readonly networkMessageIds?: string[];
  /** Count of mail messages by DeliveryStatus string representation */
  readonly countByDeliveryStatus?: any;
  /** Count of mail messages by ThreatType string representation */
  readonly countByThreatType?: any;
  /** Count of mail messages by ProtectionStatus string representation */
  readonly countByProtectionStatus?: any;
  /** The threats of mail messages that are part of the mail cluster */
  readonly threats?: string[];
  /** The query that was used to identify the messages of the mail cluster */
  readonly query?: string;
  /** The query time */
  readonly queryTime?: Date;
  /** The number of mail messages that are part of the mail cluster */
  readonly mailCount?: number;
  /** Is this a volume anomaly mail cluster */
  readonly isVolumeAnomaly?: boolean;
  /** The source of the mail cluster (default is 'O365 ATP') */
  readonly source?: string;
  /** The id of the cluster source */
  readonly clusterSourceIdentifier?: string;
  /** The type of the cluster source */
  readonly clusterSourceType?: string;
  /** The cluster query start time */
  readonly clusterQueryStartTime?: Date;
  /** The cluster query end time */
  readonly clusterQueryEndTime?: Date;
  /** The cluster group */
  readonly clusterGroup?: string;
}

export function mailClusterEntityDeserializer(item: any): MailClusterEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mailClusterEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Mail cluster entity property bag. */
export interface MailClusterEntityProperties extends EntityCommonProperties {
  /** The mail message IDs that are part of the mail cluster */
  readonly networkMessageIds?: string[];
  /** Count of mail messages by DeliveryStatus string representation */
  readonly countByDeliveryStatus?: any;
  /** Count of mail messages by ThreatType string representation */
  readonly countByThreatType?: any;
  /** Count of mail messages by ProtectionStatus string representation */
  readonly countByProtectionStatus?: any;
  /** The threats of mail messages that are part of the mail cluster */
  readonly threats?: string[];
  /** The query that was used to identify the messages of the mail cluster */
  readonly query?: string;
  /** The query time */
  readonly queryTime?: Date;
  /** The number of mail messages that are part of the mail cluster */
  readonly mailCount?: number;
  /** Is this a volume anomaly mail cluster */
  readonly isVolumeAnomaly?: boolean;
  /** The source of the mail cluster (default is 'O365 ATP') */
  readonly source?: string;
  /** The id of the cluster source */
  readonly clusterSourceIdentifier?: string;
  /** The type of the cluster source */
  readonly clusterSourceType?: string;
  /** The cluster query start time */
  readonly clusterQueryStartTime?: Date;
  /** The cluster query end time */
  readonly clusterQueryEndTime?: Date;
  /** The cluster group */
  readonly clusterGroup?: string;
}

export function mailClusterEntityPropertiesDeserializer(item: any): MailClusterEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    networkMessageIds: !item["networkMessageIds"]
      ? item["networkMessageIds"]
      : item["networkMessageIds"].map((p: any) => {
          return p;
        }),
    countByDeliveryStatus: item["countByDeliveryStatus"],
    countByThreatType: item["countByThreatType"],
    countByProtectionStatus: item["countByProtectionStatus"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    queryTime: !item["queryTime"] ? item["queryTime"] : new Date(item["queryTime"]),
    mailCount: item["mailCount"],
    isVolumeAnomaly: item["isVolumeAnomaly"],
    source: item["source"],
    clusterSourceIdentifier: item["clusterSourceIdentifier"],
    clusterSourceType: item["clusterSourceType"],
    clusterQueryStartTime: !item["clusterQueryStartTime"]
      ? item["clusterQueryStartTime"]
      : new Date(item["clusterQueryStartTime"]),
    clusterQueryEndTime: !item["clusterQueryEndTime"]
      ? item["clusterQueryEndTime"]
      : new Date(item["clusterQueryEndTime"]),
    clusterGroup: item["clusterGroup"],
  };
}

/** Represents a mail message entity. */
export interface MailMessageEntity extends Entity {
  /** The kind of the entity. */
  kind: "MailMessage";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The File entity ids of this mail message's attachments */
  readonly fileEntityIds?: string[];
  /** The recipient of this mail message. Note that in case of multiple recipients the mail message is forked and each copy has one recipient */
  readonly recipient?: string;
  /** The Urls contained in this mail message */
  readonly urls?: string[];
  /** The threats of this mail message */
  readonly threats?: string[];
  /** The p1 sender's email address */
  readonly p1Sender?: string;
  /** The p1 sender's display name */
  readonly p1SenderDisplayName?: string;
  /** The p1 sender's domain */
  readonly p1SenderDomain?: string;
  /** The sender's IP address */
  readonly senderIP?: string;
  /** The p2 sender's email address */
  readonly p2Sender?: string;
  /** The p2 sender's display name */
  readonly p2SenderDisplayName?: string;
  /** The p2 sender's domain */
  readonly p2SenderDomain?: string;
  /** The receive date of this message */
  readonly receiveDate?: Date;
  /** The network message id of this mail message */
  readonly networkMessageId?: string;
  /** The internet message id of this mail message */
  readonly internetMessageId?: string;
  /** The subject of this mail message */
  readonly subject?: string;
  /** The language of this mail message */
  readonly language?: string;
  /** The threat detection methods */
  readonly threatDetectionMethods?: string[];
  /** The bodyFingerprintBin1 */
  bodyFingerprintBin1?: number;
  /** The bodyFingerprintBin2 */
  bodyFingerprintBin2?: number;
  /** The bodyFingerprintBin3 */
  bodyFingerprintBin3?: number;
  /** The bodyFingerprintBin4 */
  bodyFingerprintBin4?: number;
  /** The bodyFingerprintBin5 */
  bodyFingerprintBin5?: number;
  /** The directionality of this mail message */
  antispamDirection?: AntispamMailDirection;
  /** The delivery action of this mail message like Delivered, Blocked, Replaced etc */
  deliveryAction?: DeliveryAction;
  /** The delivery location of this mail message like Inbox, JunkFolder etc */
  deliveryLocation?: DeliveryLocation;
}

export function mailMessageEntityDeserializer(item: any): MailMessageEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mailMessageEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Mail message entity property bag. */
export interface MailMessageEntityProperties extends EntityCommonProperties {
  /** The File entity ids of this mail message's attachments */
  readonly fileEntityIds?: string[];
  /** The recipient of this mail message. Note that in case of multiple recipients the mail message is forked and each copy has one recipient */
  readonly recipient?: string;
  /** The Urls contained in this mail message */
  readonly urls?: string[];
  /** The threats of this mail message */
  readonly threats?: string[];
  /** The p1 sender's email address */
  readonly p1Sender?: string;
  /** The p1 sender's display name */
  readonly p1SenderDisplayName?: string;
  /** The p1 sender's domain */
  readonly p1SenderDomain?: string;
  /** The sender's IP address */
  readonly senderIP?: string;
  /** The p2 sender's email address */
  readonly p2Sender?: string;
  /** The p2 sender's display name */
  readonly p2SenderDisplayName?: string;
  /** The p2 sender's domain */
  readonly p2SenderDomain?: string;
  /** The receive date of this message */
  readonly receiveDate?: Date;
  /** The network message id of this mail message */
  readonly networkMessageId?: string;
  /** The internet message id of this mail message */
  readonly internetMessageId?: string;
  /** The subject of this mail message */
  readonly subject?: string;
  /** The language of this mail message */
  readonly language?: string;
  /** The threat detection methods */
  readonly threatDetectionMethods?: string[];
  /** The bodyFingerprintBin1 */
  bodyFingerprintBin1?: number;
  /** The bodyFingerprintBin2 */
  bodyFingerprintBin2?: number;
  /** The bodyFingerprintBin3 */
  bodyFingerprintBin3?: number;
  /** The bodyFingerprintBin4 */
  bodyFingerprintBin4?: number;
  /** The bodyFingerprintBin5 */
  bodyFingerprintBin5?: number;
  /** The directionality of this mail message */
  antispamDirection?: AntispamMailDirection;
  /** The delivery action of this mail message like Delivered, Blocked, Replaced etc */
  deliveryAction?: DeliveryAction;
  /** The delivery location of this mail message like Inbox, JunkFolder etc */
  deliveryLocation?: DeliveryLocation;
}

export function mailMessageEntityPropertiesDeserializer(item: any): MailMessageEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    fileEntityIds: !item["fileEntityIds"]
      ? item["fileEntityIds"]
      : item["fileEntityIds"].map((p: any) => {
          return p;
        }),
    recipient: item["recipient"],
    urls: !item["urls"]
      ? item["urls"]
      : item["urls"].map((p: any) => {
          return p;
        }),
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    p1Sender: item["p1Sender"],
    p1SenderDisplayName: item["p1SenderDisplayName"],
    p1SenderDomain: item["p1SenderDomain"],
    senderIP: item["senderIP"],
    p2Sender: item["p2Sender"],
    p2SenderDisplayName: item["p2SenderDisplayName"],
    p2SenderDomain: item["p2SenderDomain"],
    receiveDate: !item["receiveDate"] ? item["receiveDate"] : new Date(item["receiveDate"]),
    networkMessageId: item["networkMessageId"],
    internetMessageId: item["internetMessageId"],
    subject: item["subject"],
    language: item["language"],
    threatDetectionMethods: !item["threatDetectionMethods"]
      ? item["threatDetectionMethods"]
      : item["threatDetectionMethods"].map((p: any) => {
          return p;
        }),
    bodyFingerprintBin1: item["bodyFingerprintBin1"],
    bodyFingerprintBin2: item["bodyFingerprintBin2"],
    bodyFingerprintBin3: item["bodyFingerprintBin3"],
    bodyFingerprintBin4: item["bodyFingerprintBin4"],
    bodyFingerprintBin5: item["bodyFingerprintBin5"],
    antispamDirection: item["antispamDirection"],
    deliveryAction: item["deliveryAction"],
    deliveryLocation: item["deliveryLocation"],
  };
}

/** The directionality of this mail message */
export enum KnownAntispamMailDirection {
  /** Unknown */
  Unknown = "Unknown",
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
  /** Intraorg */
  Intraorg = "Intraorg",
}

/**
 * The directionality of this mail message \
 * {@link KnownAntispamMailDirection} can be used interchangeably with AntispamMailDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Inbound**: Inbound \
 * **Outbound**: Outbound \
 * **Intraorg**: Intraorg
 */
export type AntispamMailDirection = string;
/** The delivery action of this mail message like Delivered, Blocked, Replaced etc */
export type DeliveryAction = "Unknown" | "DeliveredAsSpam" | "Delivered" | "Blocked" | "Replaced";
/** The delivery location of this mail message like Inbox, JunkFolder etc */
export type DeliveryLocation =
  | "Unknown"
  | "Inbox"
  | "JunkFolder"
  | "DeletedFolder"
  | "Quarantine"
  | "External"
  | "Failed"
  | "Dropped"
  | "Forwarded";

/** Represents a malware entity. */
export interface MalwareEntity extends Entity {
  /** The kind of the entity. */
  kind: "Malware";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The malware category by the vendor, e.g. Trojan */
  readonly category?: string;
  /** List of linked file entity identifiers on which the malware was found */
  readonly fileEntityIds?: string[];
  /** The malware name by the vendor, e.g. Win32/Toga!rfn */
  readonly malwareName?: string;
  /** List of linked process entity identifiers on which the malware was found. */
  readonly processEntityIds?: string[];
}

export function malwareEntityDeserializer(item: any): MalwareEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _malwareEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Malware entity property bag. */
export interface MalwareEntityProperties extends EntityCommonProperties {
  /** The malware category by the vendor, e.g. Trojan */
  readonly category?: string;
  /** List of linked file entity identifiers on which the malware was found */
  readonly fileEntityIds?: string[];
  /** The malware name by the vendor, e.g. Win32/Toga!rfn */
  readonly malwareName?: string;
  /** List of linked process entity identifiers on which the malware was found. */
  readonly processEntityIds?: string[];
}

export function malwareEntityPropertiesDeserializer(item: any): MalwareEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    category: item["category"],
    fileEntityIds: !item["fileEntityIds"]
      ? item["fileEntityIds"]
      : item["fileEntityIds"].map((p: any) => {
          return p;
        }),
    malwareName: item["malwareName"],
    processEntityIds: !item["processEntityIds"]
      ? item["processEntityIds"]
      : item["processEntityIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents a process entity. */
export interface ProcessEntity extends Entity {
  /** The kind of the entity. */
  kind: "Process";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The account entity id running the processes. */
  readonly accountEntityId?: string;
  /** The command line used to create the process */
  readonly commandLine?: string;
  /** The time when the process started to run */
  readonly creationTimeUtc?: Date;
  /** The elevation token associated with the process. */
  elevationToken?: ElevationToken;
  /** The host entity id on which the process was running */
  readonly hostEntityId?: string;
  /** The session entity id in which the process was running */
  readonly hostLogonSessionEntityId?: string;
  /** Image file entity id */
  readonly imageFileEntityId?: string;
  /** The parent process entity id. */
  readonly parentProcessEntityId?: string;
  /** The process ID */
  readonly processId?: string;
}

export function processEntityDeserializer(item: any): ProcessEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _processEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Process entity property bag. */
export interface ProcessEntityProperties extends EntityCommonProperties {
  /** The account entity id running the processes. */
  readonly accountEntityId?: string;
  /** The command line used to create the process */
  readonly commandLine?: string;
  /** The time when the process started to run */
  readonly creationTimeUtc?: Date;
  /** The elevation token associated with the process. */
  elevationToken?: ElevationToken;
  /** The host entity id on which the process was running */
  readonly hostEntityId?: string;
  /** The session entity id in which the process was running */
  readonly hostLogonSessionEntityId?: string;
  /** Image file entity id */
  readonly imageFileEntityId?: string;
  /** The parent process entity id. */
  readonly parentProcessEntityId?: string;
  /** The process ID */
  readonly processId?: string;
}

export function processEntityPropertiesDeserializer(item: any): ProcessEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    accountEntityId: item["accountEntityId"],
    commandLine: item["commandLine"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    elevationToken: item["elevationToken"],
    hostEntityId: item["hostEntityId"],
    hostLogonSessionEntityId: item["hostLogonSessionEntityId"],
    imageFileEntityId: item["imageFileEntityId"],
    parentProcessEntityId: item["parentProcessEntityId"],
    processId: item["processId"],
  };
}

/** The elevation token associated with the process. */
export type ElevationToken = "Default" | "Full" | "Limited";

/** Represents a registry key entity. */
export interface RegistryKeyEntity extends Entity {
  /** The kind of the entity. */
  kind: "RegistryKey";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** the hive that holds the registry key. */
  readonly hive?: RegistryHive;
  /** The registry key path. */
  readonly key?: string;
}

export function registryKeyEntityDeserializer(item: any): RegistryKeyEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _registryKeyEntityPropertiesDeserializer(item["properties"])),
  };
}

/** RegistryKey entity property bag. */
export interface RegistryKeyEntityProperties extends EntityCommonProperties {
  /** the hive that holds the registry key. */
  readonly hive?: RegistryHive;
  /** The registry key path. */
  readonly key?: string;
}

export function registryKeyEntityPropertiesDeserializer(item: any): RegistryKeyEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    hive: item["hive"],
    key: item["key"],
  };
}

/** the hive that holds the registry key. */
export enum KnownRegistryHive {
  /** HKEY_LOCAL_MACHINE */
  HkeyLocalMachine = "HKEY_LOCAL_MACHINE",
  /** HKEY_CLASSES_ROOT */
  HkeyClassesRoot = "HKEY_CLASSES_ROOT",
  /** HKEY_CURRENT_CONFIG */
  HkeyCurrentConfig = "HKEY_CURRENT_CONFIG",
  /** HKEY_USERS */
  HkeyUsers = "HKEY_USERS",
  /** HKEY_CURRENT_USER_LOCAL_SETTINGS */
  HkeyCurrentUserLocalSettings = "HKEY_CURRENT_USER_LOCAL_SETTINGS",
  /** HKEY_PERFORMANCE_DATA */
  HkeyPerformanceData = "HKEY_PERFORMANCE_DATA",
  /** HKEY_PERFORMANCE_NLSTEXT */
  HkeyPerformanceNlstext = "HKEY_PERFORMANCE_NLSTEXT",
  /** HKEY_PERFORMANCE_TEXT */
  HkeyPerformanceText = "HKEY_PERFORMANCE_TEXT",
  /** HKEY_A */
  HkeyA = "HKEY_A",
  /** HKEY_CURRENT_USER */
  HkeyCurrentUser = "HKEY_CURRENT_USER",
}

/**
 * the hive that holds the registry key. \
 * {@link KnownRegistryHive} can be used interchangeably with RegistryHive,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HKEY_LOCAL_MACHINE**: HKEY_LOCAL_MACHINE \
 * **HKEY_CLASSES_ROOT**: HKEY_CLASSES_ROOT \
 * **HKEY_CURRENT_CONFIG**: HKEY_CURRENT_CONFIG \
 * **HKEY_USERS**: HKEY_USERS \
 * **HKEY_CURRENT_USER_LOCAL_SETTINGS**: HKEY_CURRENT_USER_LOCAL_SETTINGS \
 * **HKEY_PERFORMANCE_DATA**: HKEY_PERFORMANCE_DATA \
 * **HKEY_PERFORMANCE_NLSTEXT**: HKEY_PERFORMANCE_NLSTEXT \
 * **HKEY_PERFORMANCE_TEXT**: HKEY_PERFORMANCE_TEXT \
 * **HKEY_A**: HKEY_A \
 * **HKEY_CURRENT_USER**: HKEY_CURRENT_USER
 */
export type RegistryHive = string;

/** Represents a registry value entity. */
export interface RegistryValueEntity extends Entity {
  /** The kind of the entity. */
  kind: "RegistryValue";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The registry key entity id. */
  readonly keyEntityId?: string;
  /** String formatted representation of the value data. */
  readonly valueData?: string;
  /** The registry value name. */
  readonly valueName?: string;
  /** Specifies the data types to use when storing values in the registry, or identifies the data type of a value in the registry. */
  readonly valueType?: RegistryValueKind;
}

export function registryValueEntityDeserializer(item: any): RegistryValueEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _registryValueEntityPropertiesDeserializer(item["properties"])),
  };
}

/** RegistryValue entity property bag. */
export interface RegistryValueEntityProperties extends EntityCommonProperties {
  /** The registry key entity id. */
  readonly keyEntityId?: string;
  /** String formatted representation of the value data. */
  readonly valueData?: string;
  /** The registry value name. */
  readonly valueName?: string;
  /** Specifies the data types to use when storing values in the registry, or identifies the data type of a value in the registry. */
  readonly valueType?: RegistryValueKind;
}

export function registryValueEntityPropertiesDeserializer(
  item: any,
): RegistryValueEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    keyEntityId: item["keyEntityId"],
    valueData: item["valueData"],
    valueName: item["valueName"],
    valueType: item["valueType"],
  };
}

/** Specifies the data types to use when storing values in the registry, or identifies the data type of a value in the registry. */
export enum KnownRegistryValueKind {
  /** None */
  None = "None",
  /** Unknown value type */
  Unknown = "Unknown",
  /** String value type */
  String = "String",
  /** ExpandString value type */
  ExpandString = "ExpandString",
  /** Binary value type */
  Binary = "Binary",
  /** DWord value type */
  DWord = "DWord",
  /** MultiString value type */
  MultiString = "MultiString",
  /** QWord value type */
  QWord = "QWord",
}

/**
 * Specifies the data types to use when storing values in the registry, or identifies the data type of a value in the registry. \
 * {@link KnownRegistryValueKind} can be used interchangeably with RegistryValueKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Unknown**: Unknown value type \
 * **String**: String value type \
 * **ExpandString**: ExpandString value type \
 * **Binary**: Binary value type \
 * **DWord**: DWord value type \
 * **MultiString**: MultiString value type \
 * **QWord**: QWord value type
 */
export type RegistryValueKind = string;

/** Represents a security group entity. */
export interface SecurityGroupEntity extends Entity {
  /** The kind of the entity. */
  kind: "SecurityGroup";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The group distinguished name */
  readonly distinguishedName?: string;
  /** A single-value attribute that is the unique identifier for the object, assigned by active directory. */
  readonly objectGuid?: string;
  /** The SID attribute is a single-value attribute that specifies the security identifier (SID) of the group */
  readonly sid?: string;
}

export function securityGroupEntityDeserializer(item: any): SecurityGroupEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityGroupEntityPropertiesDeserializer(item["properties"])),
  };
}

/** SecurityGroup entity property bag. */
export interface SecurityGroupEntityProperties extends EntityCommonProperties {
  /** The group distinguished name */
  readonly distinguishedName?: string;
  /** A single-value attribute that is the unique identifier for the object, assigned by active directory. */
  readonly objectGuid?: string;
  /** The SID attribute is a single-value attribute that specifies the security identifier (SID) of the group */
  readonly sid?: string;
}

export function securityGroupEntityPropertiesDeserializer(
  item: any,
): SecurityGroupEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    distinguishedName: item["distinguishedName"],
    objectGuid: item["objectGuid"],
    sid: item["sid"],
  };
}

/** Represents a submission mail entity. */
export interface SubmissionMailEntity extends Entity {
  /** The kind of the entity. */
  kind: "SubmissionMail";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The network message id of email to which submission belongs */
  readonly networkMessageId?: string;
  /** The submission id */
  readonly submissionId?: string;
  /** The submitter */
  readonly submitter?: string;
  /** The submission date */
  readonly submissionDate?: Date;
  /** The Time stamp when the message is received (Mail) */
  readonly timestamp?: Date;
  /** The recipient of the mail */
  readonly recipient?: string;
  /** The sender of the mail */
  readonly sender?: string;
  /** The sender's IP */
  readonly senderIp?: string;
  /** The subject of submission mail */
  readonly subject?: string;
  /** The submission type for the given instance. This maps to Junk, Phish, Malware or NotJunk. */
  readonly reportType?: string;
}

export function submissionMailEntityDeserializer(item: any): SubmissionMailEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _submissionMailEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Submission mail entity property bag. */
export interface SubmissionMailEntityProperties extends EntityCommonProperties {
  /** The network message id of email to which submission belongs */
  readonly networkMessageId?: string;
  /** The submission id */
  readonly submissionId?: string;
  /** The submitter */
  readonly submitter?: string;
  /** The submission date */
  readonly submissionDate?: Date;
  /** The Time stamp when the message is received (Mail) */
  readonly timestamp?: Date;
  /** The recipient of the mail */
  readonly recipient?: string;
  /** The sender of the mail */
  readonly sender?: string;
  /** The sender's IP */
  readonly senderIp?: string;
  /** The subject of submission mail */
  readonly subject?: string;
  /** The submission type for the given instance. This maps to Junk, Phish, Malware or NotJunk. */
  readonly reportType?: string;
}

export function submissionMailEntityPropertiesDeserializer(
  item: any,
): SubmissionMailEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    networkMessageId: item["networkMessageId"],
    submissionId: item["submissionId"],
    submitter: item["submitter"],
    submissionDate: !item["submissionDate"]
      ? item["submissionDate"]
      : new Date(item["submissionDate"]),
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    recipient: item["recipient"],
    sender: item["sender"],
    senderIp: item["senderIp"],
    subject: item["subject"],
    reportType: item["reportType"],
  };
}

/** Represents a url entity. */
export interface UrlEntity extends Entity {
  /** The kind of the entity. */
  kind: "Url";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** A full URL the entity points to */
  readonly url?: string;
}

export function urlEntityDeserializer(item: any): UrlEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _urlEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Url entity property bag. */
export interface UrlEntityProperties extends EntityCommonProperties {
  /** A full URL the entity points to */
  readonly url?: string;
}

export function urlEntityPropertiesDeserializer(item: any): UrlEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    url: item["url"],
  };
}

/** Represents an network interface entity. */
export interface NicEntity extends Entity {
  /** The kind of the entity. */
  kind: "Nic";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** The MAC address of this network interface */
  readonly macAddress?: string;
  /** The IP entity id of this network interface */
  readonly ipAddressEntityId?: string;
  /** A list of VLANs of the network interface entity. */
  readonly vlans?: string[];
}

export function nicEntityDeserializer(item: any): NicEntity {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _nicEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Nic entity property bag. */
export interface NicEntityProperties extends EntityCommonProperties {
  /** The MAC address of this network interface */
  readonly macAddress?: string;
  /** The IP entity id of this network interface */
  readonly ipAddressEntityId?: string;
  /** A list of VLANs of the network interface entity. */
  readonly vlans?: string[];
}

export function nicEntityPropertiesDeserializer(item: any): NicEntityProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    macAddress: item["macAddress"],
    ipAddressEntityId: item["ipAddressEntityId"],
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
  };
}

/** List of incident bookmarks. */
export interface IncidentBookmarkList {
  /** Array of incident bookmarks. */
  value: HuntingBookmark[];
}

export function incidentBookmarkListDeserializer(item: any): IncidentBookmarkList {
  return {
    value: huntingBookmarkArrayDeserializer(item["value"]),
  };
}

export function huntingBookmarkArrayDeserializer(result: Array<HuntingBookmark>): any[] {
  return result.map((item) => {
    return huntingBookmarkDeserializer(item);
  });
}

/** The incident related entities response. */
export interface IncidentEntitiesResponse {
  /** Array of the incident related entities. */
  entities?: EntityUnion[];
  /** The metadata from the incident related entities results. */
  metaData?: IncidentEntitiesResultsMetadata[];
}

export function incidentEntitiesResponseDeserializer(item: any): IncidentEntitiesResponse {
  return {
    entities: !item["entities"] ? item["entities"] : entityUnionArrayDeserializer(item["entities"]),
    metaData: !item["metaData"]
      ? item["metaData"]
      : incidentEntitiesResultsMetadataArrayDeserializer(item["metaData"]),
  };
}

export function entityUnionArrayDeserializer(result: Array<EntityUnion>): any[] {
  return result.map((item) => {
    return entityUnionDeserializer(item);
  });
}

export function incidentEntitiesResultsMetadataArrayDeserializer(
  result: Array<IncidentEntitiesResultsMetadata>,
): any[] {
  return result.map((item) => {
    return incidentEntitiesResultsMetadataDeserializer(item);
  });
}

/** Information of a specific aggregation in the incident related entities result. */
export interface IncidentEntitiesResultsMetadata {
  /** The kind of the aggregated entity. */
  entityKind: EntityKindEnum;
  /** Total number of aggregations of the given kind in the incident related entities result. */
  count: number;
}

export function incidentEntitiesResultsMetadataDeserializer(
  item: any,
): IncidentEntitiesResultsMetadata {
  return {
    entityKind: item["entityKind"],
    count: item["count"],
  };
}

/** Represents a bookmark in Azure Security Insights. */
export interface Bookmark extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The time the bookmark was created */
  created?: Date;
  /** Describes a user that created the bookmark */
  createdBy?: UserInfo;
  /** The display name of the bookmark */
  displayName?: string;
  /** List of labels relevant to this bookmark */
  labels?: string[];
  /** The notes of the bookmark */
  notes?: string;
  /** The query of the bookmark. */
  query?: string;
  /** The query result of the bookmark. */
  queryResult?: string;
  /** The last time the bookmark was updated */
  updated?: Date;
  /** Describes a user that updated the bookmark */
  updatedBy?: UserInfo;
  /** The bookmark event time */
  eventTime?: Date;
  /** The start time for the query */
  queryStartTime?: Date;
  /** The end time for the query */
  queryEndTime?: Date;
  /** Describes an incident that relates to bookmark */
  incidentInfo?: IncidentInfo;
  /** Describes the entity mappings of the bookmark */
  entityMappings?: BookmarkEntityMappings[];
  /** A list of relevant mitre attacks */
  tactics?: AttackTactic[];
  /** A list of relevant mitre techniques */
  techniques?: string[];
}

export function bookmarkSerializer(item: Bookmark): any {
  return {
    properties: areAllPropsUndefined(item, [
      "created",
      "createdBy",
      "displayName",
      "labels",
      "notes",
      "query",
      "queryResult",
      "updated",
      "updatedBy",
      "eventTime",
      "queryStartTime",
      "queryEndTime",
      "incidentInfo",
      "entityMappings",
      "tactics",
      "techniques",
    ])
      ? undefined
      : _bookmarkPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function bookmarkDeserializer(item: any): Bookmark {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _bookmarkPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes bookmark properties */
export interface BookmarkProperties {
  /** The time the bookmark was created */
  created?: Date;
  /** Describes a user that created the bookmark */
  createdBy?: UserInfo;
  /** The display name of the bookmark */
  displayName: string;
  /** List of labels relevant to this bookmark */
  labels?: string[];
  /** The notes of the bookmark */
  notes?: string;
  /** The query of the bookmark. */
  query: string;
  /** The query result of the bookmark. */
  queryResult?: string;
  /** The last time the bookmark was updated */
  updated?: Date;
  /** Describes a user that updated the bookmark */
  updatedBy?: UserInfo;
  /** The bookmark event time */
  eventTime?: Date;
  /** The start time for the query */
  queryStartTime?: Date;
  /** The end time for the query */
  queryEndTime?: Date;
  /** Describes an incident that relates to bookmark */
  incidentInfo?: IncidentInfo;
  /** Describes the entity mappings of the bookmark */
  entityMappings?: BookmarkEntityMappings[];
  /** A list of relevant mitre attacks */
  tactics?: AttackTactic[];
  /** A list of relevant mitre techniques */
  techniques?: string[];
}

export function bookmarkPropertiesSerializer(item: BookmarkProperties): any {
  return {
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    displayName: item["displayName"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : item["eventTime"].toISOString(),
    queryStartTime: !item["queryStartTime"]
      ? item["queryStartTime"]
      : item["queryStartTime"].toISOString(),
    queryEndTime: !item["queryEndTime"] ? item["queryEndTime"] : item["queryEndTime"].toISOString(),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoSerializer(item["incidentInfo"]),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : bookmarkEntityMappingsArraySerializer(item["entityMappings"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function bookmarkPropertiesDeserializer(item: any): BookmarkProperties {
  return {
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    displayName: item["displayName"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    queryStartTime: !item["queryStartTime"]
      ? item["queryStartTime"]
      : new Date(item["queryStartTime"]),
    queryEndTime: !item["queryEndTime"] ? item["queryEndTime"] : new Date(item["queryEndTime"]),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoDeserializer(item["incidentInfo"]),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : bookmarkEntityMappingsArrayDeserializer(item["entityMappings"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function bookmarkEntityMappingsArraySerializer(
  result: Array<BookmarkEntityMappings>,
): any[] {
  return result.map((item) => {
    return bookmarkEntityMappingsSerializer(item);
  });
}

export function bookmarkEntityMappingsArrayDeserializer(
  result: Array<BookmarkEntityMappings>,
): any[] {
  return result.map((item) => {
    return bookmarkEntityMappingsDeserializer(item);
  });
}

/** Describes the entity mappings of a single entity */
export interface BookmarkEntityMappings {
  /** The entity type */
  entityType?: string;
  /** Array of fields mapping for that entity type */
  fieldMappings?: EntityFieldMapping[];
}

export function bookmarkEntityMappingsSerializer(item: BookmarkEntityMappings): any {
  return {
    entityType: item["entityType"],
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : entityFieldMappingArraySerializer(item["fieldMappings"]),
  };
}

export function bookmarkEntityMappingsDeserializer(item: any): BookmarkEntityMappings {
  return {
    entityType: item["entityType"],
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : entityFieldMappingArrayDeserializer(item["fieldMappings"]),
  };
}

export function entityFieldMappingArraySerializer(result: Array<EntityFieldMapping>): any[] {
  return result.map((item) => {
    return entityFieldMappingSerializer(item);
  });
}

export function entityFieldMappingArrayDeserializer(result: Array<EntityFieldMapping>): any[] {
  return result.map((item) => {
    return entityFieldMappingDeserializer(item);
  });
}

/** Map identifiers of a single entity */
export interface EntityFieldMapping {
  /** Alert V3 identifier */
  identifier?: string;
  /** The value of the identifier */
  value?: string;
}

export function entityFieldMappingSerializer(item: EntityFieldMapping): any {
  return { identifier: item["identifier"], value: item["value"] };
}

export function entityFieldMappingDeserializer(item: any): EntityFieldMapping {
  return {
    identifier: item["identifier"],
    value: item["value"],
  };
}

/** List all the bookmarks. */
export interface _BookmarkList {
  /** The Bookmark items on this page */
  value: Bookmark[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bookmarkListDeserializer(item: any): _BookmarkList {
  return {
    value: bookmarkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bookmarkArraySerializer(result: Array<Bookmark>): any[] {
  return result.map((item) => {
    return bookmarkSerializer(item);
  });
}

export function bookmarkArrayDeserializer(result: Array<Bookmark>): any[] {
  return result.map((item) => {
    return bookmarkDeserializer(item);
  });
}

/**
 * An Azure resource, which encapsulate the entire info requires to display a data connector page in Azure portal,
 * and the info required to define data connections.
 */
export interface DataConnectorDefinition extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: Customizable */
  kind: DataConnectorDefinitionKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function dataConnectorDefinitionSerializer(item: DataConnectorDefinition): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function dataConnectorDefinitionDeserializer(item: any): DataConnectorDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for DataConnectorDefinitionUnion */
export type DataConnectorDefinitionUnion =
  | CustomizableConnectorDefinition
  | DataConnectorDefinition;

export function dataConnectorDefinitionUnionSerializer(item: DataConnectorDefinitionUnion): any {
  switch (item.kind) {
    case "Customizable":
      return customizableConnectorDefinitionSerializer(item as CustomizableConnectorDefinition);

    default:
      return dataConnectorDefinitionSerializer(item);
  }
}

export function dataConnectorDefinitionUnionDeserializer(item: any): DataConnectorDefinitionUnion {
  switch (item["kind"]) {
    case "Customizable":
      return customizableConnectorDefinitionDeserializer(item as CustomizableConnectorDefinition);

    default:
      return dataConnectorDefinitionDeserializer(item);
  }
}

/** The kind of the data connector definitions */
export enum KnownDataConnectorDefinitionKind {
  /** Customizable */
  Customizable = "Customizable",
}

/**
 * The kind of the data connector definitions \
 * {@link KnownDataConnectorDefinitionKind} can be used interchangeably with DataConnectorDefinitionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Customizable**: Customizable
 */
export type DataConnectorDefinitionKind = string;

/** Connector definition for kind 'Customizable'. */
export interface CustomizableConnectorDefinition extends DataConnectorDefinition {
  /** The data connector kind */
  kind: "Customizable";
  /** Gets or sets the connector definition created date in UTC format. */
  createdTimeUtc?: Date;
  /** Gets or sets the connector definition last modified date in UTC format. */
  lastModifiedUtc?: Date;
  /** The UiConfig for 'Customizable' connector definition kind. */
  connectorUiConfig?: CustomizableConnectorUiConfig;
  /** The UiConfig for 'Customizable' connector definition kind. */
  connectionsConfig?: CustomizableConnectionsConfig;
}

export function customizableConnectorDefinitionSerializer(
  item: CustomizableConnectorDefinition,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "createdTimeUtc",
      "lastModifiedUtc",
      "connectorUiConfig",
      "connectionsConfig",
    ])
      ? undefined
      : _customizableConnectorDefinitionPropertiesSerializer(item),
  };
}

export function customizableConnectorDefinitionDeserializer(
  item: any,
): CustomizableConnectorDefinition {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _customizableConnectorDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** The UiConfig for 'Customizable' connector definition kind. */
export interface CustomizableConnectorDefinitionProperties {
  /** Gets or sets the connector definition created date in UTC format. */
  createdTimeUtc?: Date;
  /** Gets or sets the connector definition last modified date in UTC format. */
  lastModifiedUtc?: Date;
  /** The UiConfig for 'Customizable' connector definition kind. */
  connectorUiConfig: CustomizableConnectorUiConfig;
  /** The UiConfig for 'Customizable' connector definition kind. */
  connectionsConfig?: CustomizableConnectionsConfig;
}

export function customizableConnectorDefinitionPropertiesSerializer(
  item: CustomizableConnectorDefinitionProperties,
): any {
  return {
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : item["createdTimeUtc"].toISOString(),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : item["lastModifiedUtc"].toISOString(),
    connectorUiConfig: customizableConnectorUiConfigSerializer(item["connectorUiConfig"]),
    connectionsConfig: !item["connectionsConfig"]
      ? item["connectionsConfig"]
      : customizableConnectionsConfigSerializer(item["connectionsConfig"]),
  };
}

export function customizableConnectorDefinitionPropertiesDeserializer(
  item: any,
): CustomizableConnectorDefinitionProperties {
  return {
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    connectorUiConfig: customizableConnectorUiConfigDeserializer(item["connectorUiConfig"]),
    connectionsConfig: !item["connectionsConfig"]
      ? item["connectionsConfig"]
      : customizableConnectionsConfigDeserializer(item["connectionsConfig"]),
  };
}

/** The UiConfig for 'Customizable' connector definition kind. */
export interface CustomizableConnectorUiConfig {
  /** Gets or sets custom connector id. optional field. */
  id?: string;
  /** Gets or sets the connector blade title. */
  title: string;
  /** Gets or sets the connector publisher name. */
  publisher: string;
  /** Gets or sets the connector description in markdown format. */
  descriptionMarkdown: string;
  /** Gets or sets the graph queries to show the current data volume over time. */
  graphQueries: GraphQuery[];
  /** Gets or sets the data types to check for last data received. */
  dataTypes: ConnectorDataType[];
  /** Gets or sets the way the connector checks whether the connector is connected. */
  connectivityCriteria: ConnectivityCriterion[];
  /** The exposure status of the connector to the customers. */
  availability?: ConnectorDefinitionsAvailability;
  /** The required Permissions for the connector. */
  permissions: ConnectorDefinitionsPermissions;
  /** Gets or sets the instruction steps to enable the connector. */
  instructionSteps: InstructionStep[];
  /**
   * Gets or sets the connector logo to be used when displaying the connector within Azure Sentinel's connector's gallery.
   * The logo value should be in SVG format.
   */
  logo?: string;
  /** Gets or sets a value indicating whether to use 'OR'(SOME) or 'AND' between ConnectivityCriteria items. */
  isConnectivityCriteriasMatchSome?: boolean;
}

export function customizableConnectorUiConfigSerializer(item: CustomizableConnectorUiConfig): any {
  return {
    id: item["id"],
    title: item["title"],
    publisher: item["publisher"],
    descriptionMarkdown: item["descriptionMarkdown"],
    graphQueries: graphQueryArraySerializer(item["graphQueries"]),
    dataTypes: connectorDataTypeArraySerializer(item["dataTypes"]),
    connectivityCriteria: connectivityCriterionArraySerializer(item["connectivityCriteria"]),
    availability: !item["availability"]
      ? item["availability"]
      : connectorDefinitionsAvailabilitySerializer(item["availability"]),
    permissions: connectorDefinitionsPermissionsSerializer(item["permissions"]),
    instructionSteps: instructionStepArraySerializer(item["instructionSteps"]),
    logo: item["logo"],
    isConnectivityCriteriasMatchSome: item["isConnectivityCriteriasMatchSome"],
  };
}

export function customizableConnectorUiConfigDeserializer(
  item: any,
): CustomizableConnectorUiConfig {
  return {
    id: item["id"],
    title: item["title"],
    publisher: item["publisher"],
    descriptionMarkdown: item["descriptionMarkdown"],
    graphQueries: graphQueryArrayDeserializer(item["graphQueries"]),
    dataTypes: connectorDataTypeArrayDeserializer(item["dataTypes"]),
    connectivityCriteria: connectivityCriterionArrayDeserializer(item["connectivityCriteria"]),
    availability: !item["availability"]
      ? item["availability"]
      : connectorDefinitionsAvailabilityDeserializer(item["availability"]),
    permissions: connectorDefinitionsPermissionsDeserializer(item["permissions"]),
    instructionSteps: instructionStepArrayDeserializer(item["instructionSteps"]),
    logo: item["logo"],
    isConnectivityCriteriasMatchSome: item["isConnectivityCriteriasMatchSome"],
  };
}

export function graphQueryArraySerializer(result: Array<GraphQuery>): any[] {
  return result.map((item) => {
    return graphQuerySerializer(item);
  });
}

export function graphQueryArrayDeserializer(result: Array<GraphQuery>): any[] {
  return result.map((item) => {
    return graphQueryDeserializer(item);
  });
}

/** The graph query to show the volume of data arriving into the workspace over time. */
export interface GraphQuery {
  /** Gets or sets the metric name that the query is checking. For example: 'Total data receive'. */
  metricName: string;
  /** Gets or sets the legend for the graph. */
  legend: string;
  /**
   * Gets or sets the base query for the graph.
   * The base query is wrapped by Sentinel UI infra with a KQL query, that measures the volume over time.
   */
  baseQuery: string;
}

export function graphQuerySerializer(item: GraphQuery): any {
  return { metricName: item["metricName"], legend: item["legend"], baseQuery: item["baseQuery"] };
}

export function graphQueryDeserializer(item: any): GraphQuery {
  return {
    metricName: item["metricName"],
    legend: item["legend"],
    baseQuery: item["baseQuery"],
  };
}

export function connectorDataTypeArraySerializer(result: Array<ConnectorDataType>): any[] {
  return result.map((item) => {
    return connectorDataTypeSerializer(item);
  });
}

export function connectorDataTypeArrayDeserializer(result: Array<ConnectorDataType>): any[] {
  return result.map((item) => {
    return connectorDataTypeDeserializer(item);
  });
}

/**
 * The data type which is created by the connector,
 * including a query indicated when was the last time that data type was received in the workspace.
 */
export interface ConnectorDataType {
  /** Gets or sets the name of the data type to show in the graph. */
  name: string;
  /** Gets or sets the query to indicate when relevant data was last received in the workspace. */
  lastDataReceivedQuery: string;
}

export function connectorDataTypeSerializer(item: ConnectorDataType): any {
  return { name: item["name"], lastDataReceivedQuery: item["lastDataReceivedQuery"] };
}

export function connectorDataTypeDeserializer(item: any): ConnectorDataType {
  return {
    name: item["name"],
    lastDataReceivedQuery: item["lastDataReceivedQuery"],
  };
}

export function connectivityCriterionArraySerializer(result: Array<ConnectivityCriterion>): any[] {
  return result.map((item) => {
    return connectivityCriterionSerializer(item);
  });
}

export function connectivityCriterionArrayDeserializer(
  result: Array<ConnectivityCriterion>,
): any[] {
  return result.map((item) => {
    return connectivityCriterionDeserializer(item);
  });
}

/**
 * The criteria by which we determine whether the connector is connected or not.
 * For Example, use a KQL query to check if  the expected data type is flowing).
 */
export interface ConnectivityCriterion {
  /** Gets or sets the type of connectivity. */
  type: string;
  /** Gets or sets the queries for checking connectivity. */
  value?: string[];
}

export function connectivityCriterionSerializer(item: ConnectivityCriterion): any {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function connectivityCriterionDeserializer(item: any): ConnectivityCriterion {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** The exposure status of the connector to the customers. */
export interface ConnectorDefinitionsAvailability {
  /** The exposure status of the connector to the customers. Available values are 0-4 (0=None, 1=Available, 2=FeatureFlag, 3=Internal). */
  status?: number;
  /** Gets or sets a value indicating whether the connector is preview. */
  isPreview?: boolean;
}

export function connectorDefinitionsAvailabilitySerializer(
  item: ConnectorDefinitionsAvailability,
): any {
  return { status: item["status"], isPreview: item["isPreview"] };
}

export function connectorDefinitionsAvailabilityDeserializer(
  item: any,
): ConnectorDefinitionsAvailability {
  return {
    status: item["status"],
    isPreview: item["isPreview"],
  };
}

/** The required Permissions for the connector. */
export interface ConnectorDefinitionsPermissions {
  /** Gets or sets the required tenant permissions for the connector. */
  tenant?: string[];
  /** Gets or sets the required licenses for the user to create connections. */
  licenses?: string[];
  /** Gets or sets the resource provider permissions required for the user to create connections. */
  resourceProvider?: ConnectorDefinitionsResourceProvider[];
  /** Gets or sets the customs permissions required for the user to create connections. */
  customs?: CustomPermissionDetails[];
}

export function connectorDefinitionsPermissionsSerializer(
  item: ConnectorDefinitionsPermissions,
): any {
  return {
    tenant: !item["tenant"]
      ? item["tenant"]
      : item["tenant"].map((p: any) => {
          return p;
        }),
    licenses: !item["licenses"]
      ? item["licenses"]
      : item["licenses"].map((p: any) => {
          return p;
        }),
    resourceProvider: !item["resourceProvider"]
      ? item["resourceProvider"]
      : connectorDefinitionsResourceProviderArraySerializer(item["resourceProvider"]),
    customs: !item["customs"]
      ? item["customs"]
      : customPermissionDetailsArraySerializer(item["customs"]),
  };
}

export function connectorDefinitionsPermissionsDeserializer(
  item: any,
): ConnectorDefinitionsPermissions {
  return {
    tenant: !item["tenant"]
      ? item["tenant"]
      : item["tenant"].map((p: any) => {
          return p;
        }),
    licenses: !item["licenses"]
      ? item["licenses"]
      : item["licenses"].map((p: any) => {
          return p;
        }),
    resourceProvider: !item["resourceProvider"]
      ? item["resourceProvider"]
      : connectorDefinitionsResourceProviderArrayDeserializer(item["resourceProvider"]),
    customs: !item["customs"]
      ? item["customs"]
      : customPermissionDetailsArrayDeserializer(item["customs"]),
  };
}

export function connectorDefinitionsResourceProviderArraySerializer(
  result: Array<ConnectorDefinitionsResourceProvider>,
): any[] {
  return result.map((item) => {
    return connectorDefinitionsResourceProviderSerializer(item);
  });
}

export function connectorDefinitionsResourceProviderArrayDeserializer(
  result: Array<ConnectorDefinitionsResourceProvider>,
): any[] {
  return result.map((item) => {
    return connectorDefinitionsResourceProviderDeserializer(item);
  });
}

/**
 * The resource provider details include the required permissions for the user to create connections.
 * The user should have the required permissions(Read\Write, ..) in the specified scope ProviderPermissionsScope against the specified resource provider.
 */
export interface ConnectorDefinitionsResourceProvider {
  /** Gets or sets the provider name. */
  provider: string;
  /** Gets or sets the permissions description text. */
  permissionsDisplayText: string;
  /** Gets or sets the permissions provider display name. */
  providerDisplayName: string;
  /** The scope on which the user should have permissions, in order to be able to create connections. */
  scope: ProviderPermissionsScope;
  /**
   * Required permissions for the connector resource provider that define in ResourceProviders.
   * For more information about the permissions see <see href="https://docs.microsoft.com/en-us/azure/role-based-access-control/role-definitions#actions-format">here</see>.
   */
  requiredPermissions: ResourceProviderRequiredPermissions;
}

export function connectorDefinitionsResourceProviderSerializer(
  item: ConnectorDefinitionsResourceProvider,
): any {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: resourceProviderRequiredPermissionsSerializer(item["requiredPermissions"]),
  };
}

export function connectorDefinitionsResourceProviderDeserializer(
  item: any,
): ConnectorDefinitionsResourceProvider {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: resourceProviderRequiredPermissionsDeserializer(
      item["requiredPermissions"],
    ),
  };
}

/** The scope on which the user should have permissions, in order to be able to create connections. */
export enum KnownProviderPermissionsScope {
  /** Subscription */
  Subscription = "Subscription",
  /** ResourceGroup */
  ResourceGroup = "ResourceGroup",
  /** Workspace */
  Workspace = "Workspace",
}

/**
 * The scope on which the user should have permissions, in order to be able to create connections. \
 * {@link KnownProviderPermissionsScope} can be used interchangeably with ProviderPermissionsScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Subscription**: Subscription \
 * **ResourceGroup**: ResourceGroup \
 * **Workspace**: Workspace
 */
export type ProviderPermissionsScope = string;

/**
 * Required permissions for the connector resource provider that define in ResourceProviders.
 * For more information about the permissions see <see href="https://docs.microsoft.com/en-us/azure/role-based-access-control/role-definitions#actions-format">here</see>.
 */
export interface ResourceProviderRequiredPermissions {
  /** Gets or sets a value indicating whether the permission is read action (GET). */
  read?: boolean;
  /** Gets or sets a value indicating whether the permission is write action (PUT or PATCH). */
  write?: boolean;
  /** Gets or sets a value indicating whether the permission is delete action (DELETE). */
  delete?: boolean;
  /** Gets or sets a value indicating whether the permission is custom actions (POST). */
  action?: boolean;
}

export function resourceProviderRequiredPermissionsSerializer(
  item: ResourceProviderRequiredPermissions,
): any {
  return {
    read: item["read"],
    write: item["write"],
    delete: item["delete"],
    action: item["action"],
  };
}

export function resourceProviderRequiredPermissionsDeserializer(
  item: any,
): ResourceProviderRequiredPermissions {
  return {
    read: item["read"],
    write: item["write"],
    delete: item["delete"],
    action: item["action"],
  };
}

export function customPermissionDetailsArraySerializer(
  result: Array<CustomPermissionDetails>,
): any[] {
  return result.map((item) => {
    return customPermissionDetailsSerializer(item);
  });
}

export function customPermissionDetailsArrayDeserializer(
  result: Array<CustomPermissionDetails>,
): any[] {
  return result.map((item) => {
    return customPermissionDetailsDeserializer(item);
  });
}

/** The Custom permissions required for the connector. */
export interface CustomPermissionDetails {
  /** Gets or sets the custom permissions name. */
  name: string;
  /** Gets or sets the custom permissions description. */
  description: string;
}

export function customPermissionDetailsSerializer(item: CustomPermissionDetails): any {
  return { name: item["name"], description: item["description"] };
}

export function customPermissionDetailsDeserializer(item: any): CustomPermissionDetails {
  return {
    name: item["name"],
    description: item["description"],
  };
}

export function instructionStepArraySerializer(result: Array<InstructionStep>): any[] {
  return result.map((item) => {
    return instructionStepSerializer(item);
  });
}

export function instructionStepArrayDeserializer(result: Array<InstructionStep>): any[] {
  return result.map((item) => {
    return instructionStepDeserializer(item);
  });
}

/** Instruction steps to enable the connector. */
export interface InstructionStep {
  /** Gets or sets the instruction step title. */
  title?: string;
  /** Gets or sets the instruction step description. */
  description?: string;
  /** Gets or sets the instruction step details. */
  instructions?: InstructionStepDetails[];
  /**
   * Gets or sets the inner instruction steps details.
   * For Example: instruction step 1 might contain inner instruction steps: [instruction step 1.1, instruction step 1.2].
   */
  innerSteps?: InstructionStep[];
}

export function instructionStepSerializer(item: InstructionStep): any {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepDetailsArraySerializer(item["instructions"]),
    innerSteps: !item["innerSteps"]
      ? item["innerSteps"]
      : instructionStepArraySerializer(item["innerSteps"]),
  };
}

export function instructionStepDeserializer(item: any): InstructionStep {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepDetailsArrayDeserializer(item["instructions"]),
    innerSteps: !item["innerSteps"]
      ? item["innerSteps"]
      : instructionStepArrayDeserializer(item["innerSteps"]),
  };
}

export function instructionStepDetailsArraySerializer(
  result: Array<InstructionStepDetails>,
): any[] {
  return result.map((item) => {
    return instructionStepDetailsSerializer(item);
  });
}

export function instructionStepDetailsArrayDeserializer(
  result: Array<InstructionStepDetails>,
): any[] {
  return result.map((item) => {
    return instructionStepDetailsDeserializer(item);
  });
}

/** Instruction step details, to be displayed in the Instructions steps section in the connector's page in Sentinel Portal. */
export interface InstructionStepDetails {
  /** Gets or sets the instruction type parameters settings. */
  parameters: any;
  /** Gets or sets the instruction type name. */
  type: string;
}

export function instructionStepDetailsSerializer(item: InstructionStepDetails): any {
  return { parameters: item["parameters"], type: item["type"] };
}

export function instructionStepDetailsDeserializer(item: any): InstructionStepDetails {
  return {
    parameters: item["parameters"],
    type: item["type"],
  };
}

/** The UiConfig for 'Customizable' connector definition kind. */
export interface CustomizableConnectionsConfig {
  /** Gets or sets the template name. The template includes ARM templates that can be created by the connector, usually it will be the dataConnectors ARM templates. */
  templateSpecName: string;
  /** Gets or sets the template version. */
  templateSpecVersion: string;
}

export function customizableConnectionsConfigSerializer(item: CustomizableConnectionsConfig): any {
  return {
    templateSpecName: item["templateSpecName"],
    templateSpecVersion: item["templateSpecVersion"],
  };
}

export function customizableConnectionsConfigDeserializer(
  item: any,
): CustomizableConnectionsConfig {
  return {
    templateSpecName: item["templateSpecName"],
    templateSpecVersion: item["templateSpecVersion"],
  };
}

/** Encapsulate the data connector definition object */
export interface _DataConnectorDefinitionArmCollectionWrapper {
  /** The DataConnectorDefinition items on this page */
  value: DataConnectorDefinitionUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataConnectorDefinitionArmCollectionWrapperDeserializer(
  item: any,
): _DataConnectorDefinitionArmCollectionWrapper {
  return {
    value: dataConnectorDefinitionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataConnectorDefinitionUnionArraySerializer(
  result: Array<DataConnectorDefinitionUnion>,
): any[] {
  return result.map((item) => {
    return dataConnectorDefinitionUnionSerializer(item);
  });
}

export function dataConnectorDefinitionUnionArrayDeserializer(
  result: Array<DataConnectorDefinitionUnion>,
): any[] {
  return result.map((item) => {
    return dataConnectorDefinitionUnionDeserializer(item);
  });
}

/** Data connector */
export interface DataConnector extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: AzureActiveDirectory, MicrosoftThreatIntelligence, PremiumMicrosoftDefenderForThreatIntelligence, MicrosoftThreatProtection, AzureAdvancedThreatProtection, AzureSecurityCenter, AmazonWebServicesCloudTrail, AmazonWebServicesS3, RestApiPoller, GCP, MicrosoftCloudAppSecurity, Dynamics365, OfficeATP, MicrosoftPurviewInformationProtection, Office365Project, OfficePowerBI, PurviewAudit, OfficeIRM, MicrosoftDefenderAdvancedThreatProtection, Office365, ThreatIntelligence, ThreatIntelligenceTaxii, IOT, GenericUI, APIPolling */
  kind: DataConnectorKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function dataConnectorSerializer(item: DataConnector): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function dataConnectorDeserializer(item: any): DataConnector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for DataConnectorUnion */
export type DataConnectorUnion =
  | AADDataConnector
  | MstiDataConnector
  | PremiumMicrosoftDefenderForThreatIntelligence
  | MTPDataConnector
  | AatpDataConnector
  | ASCDataConnector
  | AwsCloudTrailDataConnector
  | AwsS3DataConnector
  | RestApiPollerDataConnector
  | GCPDataConnector
  | McasDataConnector
  | Dynamics365DataConnector
  | OfficeATPDataConnector
  | MicrosoftPurviewInformationProtectionDataConnector
  | Office365ProjectDataConnector
  | OfficePowerBIDataConnector
  | PurviewAuditDataConnector
  | OfficeIRMDataConnector
  | MdatpDataConnector
  | OfficeDataConnector
  | TIDataConnector
  | TiTaxiiDataConnector
  | IoTDataConnector
  | CodelessUiDataConnector
  | CodelessApiPollingDataConnector
  | DataConnector;

export function dataConnectorUnionSerializer(item: DataConnectorUnion): any {
  switch (item.kind) {
    case "AzureActiveDirectory":
      return aadDataConnectorSerializer(item as AADDataConnector);

    case "MicrosoftThreatIntelligence":
      return mstiDataConnectorSerializer(item as MstiDataConnector);

    case "PremiumMicrosoftDefenderForThreatIntelligence":
      return premiumMicrosoftDefenderForThreatIntelligenceSerializer(
        item as PremiumMicrosoftDefenderForThreatIntelligence,
      );

    case "MicrosoftThreatProtection":
      return mtpDataConnectorSerializer(item as MTPDataConnector);

    case "AzureAdvancedThreatProtection":
      return aatpDataConnectorSerializer(item as AatpDataConnector);

    case "AzureSecurityCenter":
      return ascDataConnectorSerializer(item as ASCDataConnector);

    case "AmazonWebServicesCloudTrail":
      return awsCloudTrailDataConnectorSerializer(item as AwsCloudTrailDataConnector);

    case "AmazonWebServicesS3":
      return awsS3DataConnectorSerializer(item as AwsS3DataConnector);

    case "RestApiPoller":
      return restApiPollerDataConnectorSerializer(item as RestApiPollerDataConnector);

    case "GCP":
      return gcpDataConnectorSerializer(item as GCPDataConnector);

    case "MicrosoftCloudAppSecurity":
      return mcasDataConnectorSerializer(item as McasDataConnector);

    case "Dynamics365":
      return dynamics365DataConnectorSerializer(item as Dynamics365DataConnector);

    case "OfficeATP":
      return officeATPDataConnectorSerializer(item as OfficeATPDataConnector);

    case "MicrosoftPurviewInformationProtection":
      return microsoftPurviewInformationProtectionDataConnectorSerializer(
        item as MicrosoftPurviewInformationProtectionDataConnector,
      );

    case "Office365Project":
      return office365ProjectDataConnectorSerializer(item as Office365ProjectDataConnector);

    case "OfficePowerBI":
      return officePowerBIDataConnectorSerializer(item as OfficePowerBIDataConnector);

    case "PurviewAudit":
      return purviewAuditDataConnectorSerializer(item as PurviewAuditDataConnector);

    case "OfficeIRM":
      return officeIRMDataConnectorSerializer(item as OfficeIRMDataConnector);

    case "MicrosoftDefenderAdvancedThreatProtection":
      return mdatpDataConnectorSerializer(item as MdatpDataConnector);

    case "Office365":
      return officeDataConnectorSerializer(item as OfficeDataConnector);

    case "ThreatIntelligence":
      return tiDataConnectorSerializer(item as TIDataConnector);

    case "ThreatIntelligenceTaxii":
      return tiTaxiiDataConnectorSerializer(item as TiTaxiiDataConnector);

    case "IOT":
      return ioTDataConnectorSerializer(item as IoTDataConnector);

    case "GenericUI":
      return codelessUiDataConnectorSerializer(item as CodelessUiDataConnector);

    case "APIPolling":
      return codelessApiPollingDataConnectorSerializer(item as CodelessApiPollingDataConnector);

    default:
      return dataConnectorSerializer(item);
  }
}

export function dataConnectorUnionDeserializer(item: any): DataConnectorUnion {
  switch (item["kind"]) {
    case "AzureActiveDirectory":
      return aadDataConnectorDeserializer(item as AADDataConnector);

    case "MicrosoftThreatIntelligence":
      return mstiDataConnectorDeserializer(item as MstiDataConnector);

    case "PremiumMicrosoftDefenderForThreatIntelligence":
      return premiumMicrosoftDefenderForThreatIntelligenceDeserializer(
        item as PremiumMicrosoftDefenderForThreatIntelligence,
      );

    case "MicrosoftThreatProtection":
      return mtpDataConnectorDeserializer(item as MTPDataConnector);

    case "AzureAdvancedThreatProtection":
      return aatpDataConnectorDeserializer(item as AatpDataConnector);

    case "AzureSecurityCenter":
      return ascDataConnectorDeserializer(item as ASCDataConnector);

    case "AmazonWebServicesCloudTrail":
      return awsCloudTrailDataConnectorDeserializer(item as AwsCloudTrailDataConnector);

    case "AmazonWebServicesS3":
      return awsS3DataConnectorDeserializer(item as AwsS3DataConnector);

    case "RestApiPoller":
      return restApiPollerDataConnectorDeserializer(item as RestApiPollerDataConnector);

    case "GCP":
      return gcpDataConnectorDeserializer(item as GCPDataConnector);

    case "MicrosoftCloudAppSecurity":
      return mcasDataConnectorDeserializer(item as McasDataConnector);

    case "Dynamics365":
      return dynamics365DataConnectorDeserializer(item as Dynamics365DataConnector);

    case "OfficeATP":
      return officeATPDataConnectorDeserializer(item as OfficeATPDataConnector);

    case "MicrosoftPurviewInformationProtection":
      return microsoftPurviewInformationProtectionDataConnectorDeserializer(
        item as MicrosoftPurviewInformationProtectionDataConnector,
      );

    case "Office365Project":
      return office365ProjectDataConnectorDeserializer(item as Office365ProjectDataConnector);

    case "OfficePowerBI":
      return officePowerBIDataConnectorDeserializer(item as OfficePowerBIDataConnector);

    case "PurviewAudit":
      return purviewAuditDataConnectorDeserializer(item as PurviewAuditDataConnector);

    case "OfficeIRM":
      return officeIRMDataConnectorDeserializer(item as OfficeIRMDataConnector);

    case "MicrosoftDefenderAdvancedThreatProtection":
      return mdatpDataConnectorDeserializer(item as MdatpDataConnector);

    case "Office365":
      return officeDataConnectorDeserializer(item as OfficeDataConnector);

    case "ThreatIntelligence":
      return tiDataConnectorDeserializer(item as TIDataConnector);

    case "ThreatIntelligenceTaxii":
      return tiTaxiiDataConnectorDeserializer(item as TiTaxiiDataConnector);

    case "IOT":
      return ioTDataConnectorDeserializer(item as IoTDataConnector);

    case "GenericUI":
      return codelessUiDataConnectorDeserializer(item as CodelessUiDataConnector);

    case "APIPolling":
      return codelessApiPollingDataConnectorDeserializer(item as CodelessApiPollingDataConnector);

    default:
      return dataConnectorDeserializer(item);
  }
}

/** The kind of the data connector */
export enum KnownDataConnectorKind {
  /** AzureActiveDirectory */
  AzureActiveDirectory = "AzureActiveDirectory",
  /** AzureSecurityCenter */
  AzureSecurityCenter = "AzureSecurityCenter",
  /** MicrosoftCloudAppSecurity */
  MicrosoftCloudAppSecurity = "MicrosoftCloudAppSecurity",
  /** ThreatIntelligence */
  ThreatIntelligence = "ThreatIntelligence",
  /** ThreatIntelligenceTaxii */
  ThreatIntelligenceTaxii = "ThreatIntelligenceTaxii",
  /** Office365 */
  Office365 = "Office365",
  /** OfficeATP */
  OfficeATP = "OfficeATP",
  /** OfficeIRM */
  OfficeIRM = "OfficeIRM",
  /** Office365Project */
  Office365Project = "Office365Project",
  /** MicrosoftPurviewInformationProtection */
  MicrosoftPurviewInformationProtection = "MicrosoftPurviewInformationProtection",
  /** OfficePowerBI */
  OfficePowerBI = "OfficePowerBI",
  /** AmazonWebServicesCloudTrail */
  AmazonWebServicesCloudTrail = "AmazonWebServicesCloudTrail",
  /** AmazonWebServicesS3 */
  AmazonWebServicesS3 = "AmazonWebServicesS3",
  /** AzureAdvancedThreatProtection */
  AzureAdvancedThreatProtection = "AzureAdvancedThreatProtection",
  /** MicrosoftDefenderAdvancedThreatProtection */
  MicrosoftDefenderAdvancedThreatProtection = "MicrosoftDefenderAdvancedThreatProtection",
  /** Dynamics365 */
  Dynamics365 = "Dynamics365",
  /** MicrosoftThreatProtection */
  MicrosoftThreatProtection = "MicrosoftThreatProtection",
  /** MicrosoftThreatIntelligence */
  MicrosoftThreatIntelligence = "MicrosoftThreatIntelligence",
  /** PremiumMicrosoftDefenderForThreatIntelligence */
  PremiumMicrosoftDefenderForThreatIntelligence = "PremiumMicrosoftDefenderForThreatIntelligence",
  /** GenericUI */
  GenericUI = "GenericUI",
  /** APIPolling */
  APIPolling = "APIPolling",
  /** IOT */
  IOT = "IOT",
  /** GCP */
  GCP = "GCP",
  /** RestApiPoller */
  RestApiPoller = "RestApiPoller",
  /** PurviewAudit */
  PurviewAudit = "PurviewAudit",
}

/**
 * The kind of the data connector \
 * {@link KnownDataConnectorKind} can be used interchangeably with DataConnectorKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureActiveDirectory**: AzureActiveDirectory \
 * **AzureSecurityCenter**: AzureSecurityCenter \
 * **MicrosoftCloudAppSecurity**: MicrosoftCloudAppSecurity \
 * **ThreatIntelligence**: ThreatIntelligence \
 * **ThreatIntelligenceTaxii**: ThreatIntelligenceTaxii \
 * **Office365**: Office365 \
 * **OfficeATP**: OfficeATP \
 * **OfficeIRM**: OfficeIRM \
 * **Office365Project**: Office365Project \
 * **MicrosoftPurviewInformationProtection**: MicrosoftPurviewInformationProtection \
 * **OfficePowerBI**: OfficePowerBI \
 * **AmazonWebServicesCloudTrail**: AmazonWebServicesCloudTrail \
 * **AmazonWebServicesS3**: AmazonWebServicesS3 \
 * **AzureAdvancedThreatProtection**: AzureAdvancedThreatProtection \
 * **MicrosoftDefenderAdvancedThreatProtection**: MicrosoftDefenderAdvancedThreatProtection \
 * **Dynamics365**: Dynamics365 \
 * **MicrosoftThreatProtection**: MicrosoftThreatProtection \
 * **MicrosoftThreatIntelligence**: MicrosoftThreatIntelligence \
 * **PremiumMicrosoftDefenderForThreatIntelligence**: PremiumMicrosoftDefenderForThreatIntelligence \
 * **GenericUI**: GenericUI \
 * **APIPolling**: APIPolling \
 * **IOT**: IOT \
 * **GCP**: GCP \
 * **RestApiPoller**: RestApiPoller \
 * **PurviewAudit**: PurviewAudit
 */
export type DataConnectorKind = string;

/** Represents AADIP (Azure Active Directory Identity Protection) data connector. */
export interface AADDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "AzureActiveDirectory";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function aadDataConnectorSerializer(item: AADDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _aadDataConnectorPropertiesSerializer(item),
  };
}

export function aadDataConnectorDeserializer(item: any): AADDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _aadDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** AADIP (Azure Active Directory Identity Protection) data connector properties. */
export interface AADDataConnectorProperties {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function aadDataConnectorPropertiesSerializer(item: AADDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function aadDataConnectorPropertiesDeserializer(item: any): AADDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** Alerts data type for data connectors. */
export interface AlertsDataTypeOfDataConnector {
  /** Alerts data type connection. */
  alerts: DataConnectorDataTypeCommon;
}

export function alertsDataTypeOfDataConnectorSerializer(item: AlertsDataTypeOfDataConnector): any {
  return { alerts: dataConnectorDataTypeCommonSerializer(item["alerts"]) };
}

export function alertsDataTypeOfDataConnectorDeserializer(
  item: any,
): AlertsDataTypeOfDataConnector {
  return {
    alerts: dataConnectorDataTypeCommonDeserializer(item["alerts"]),
  };
}

/** Common field for data type in data connectors. */
export interface DataConnectorDataTypeCommon {
  /** Describe whether this data type connection is enabled or not. */
  state: DataTypeState;
}

export function dataConnectorDataTypeCommonSerializer(item: DataConnectorDataTypeCommon): any {
  return { state: item["state"] };
}

export function dataConnectorDataTypeCommonDeserializer(item: any): DataConnectorDataTypeCommon {
  return {
    state: item["state"],
  };
}

/** Describe whether this data type connection is enabled or not. */
export enum KnownDataTypeState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Describe whether this data type connection is enabled or not. \
 * {@link KnownDataTypeState} can be used interchangeably with DataTypeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type DataTypeState = string;

/** Represents Microsoft Threat Intelligence data connector. */
export interface MstiDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "MicrosoftThreatIntelligence";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: MstiDataConnectorDataTypes;
}

export function mstiDataConnectorSerializer(item: MstiDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _mstiDataConnectorPropertiesSerializer(item),
  };
}

export function mstiDataConnectorDeserializer(item: any): MstiDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mstiDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Microsoft Threat Intelligence data connector properties. */
export interface MstiDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: MstiDataConnectorDataTypes;
}

export function mstiDataConnectorPropertiesSerializer(item: MstiDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: mstiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function mstiDataConnectorPropertiesDeserializer(item: any): MstiDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: mstiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Microsoft Threat Intelligence Platforms data connector. */
export interface MstiDataConnectorDataTypes {
  /** Data type for Microsoft Threat Intelligence Platforms data connector. */
  microsoftEmergingThreatFeed: MstiDataConnectorDataTypesMicrosoftEmergingThreatFeed;
}

export function mstiDataConnectorDataTypesSerializer(item: MstiDataConnectorDataTypes): any {
  return {
    microsoftEmergingThreatFeed: mstiDataConnectorDataTypesMicrosoftEmergingThreatFeedSerializer(
      item["microsoftEmergingThreatFeed"],
    ),
  };
}

export function mstiDataConnectorDataTypesDeserializer(item: any): MstiDataConnectorDataTypes {
  return {
    microsoftEmergingThreatFeed: mstiDataConnectorDataTypesMicrosoftEmergingThreatFeedDeserializer(
      item["microsoftEmergingThreatFeed"],
    ),
  };
}

/** Data type for Microsoft Threat Intelligence Platforms data connector. */
export interface MstiDataConnectorDataTypesMicrosoftEmergingThreatFeed extends DataConnectorDataTypeCommon {
  /** The lookback period for the feed to be imported. */
  lookbackPeriod: Date;
}

export function mstiDataConnectorDataTypesMicrosoftEmergingThreatFeedSerializer(
  item: MstiDataConnectorDataTypesMicrosoftEmergingThreatFeed,
): any {
  return { state: item["state"], lookbackPeriod: item["lookbackPeriod"].toISOString() };
}

export function mstiDataConnectorDataTypesMicrosoftEmergingThreatFeedDeserializer(
  item: any,
): MstiDataConnectorDataTypesMicrosoftEmergingThreatFeed {
  return {
    state: item["state"],
    lookbackPeriod: new Date(item["lookbackPeriod"]),
  };
}

/** Represents Microsoft Defender for Threat Intelligence Premium data connector. */
export interface PremiumMicrosoftDefenderForThreatIntelligence extends DataConnector {
  /** The data connector kind */
  kind: "PremiumMicrosoftDefenderForThreatIntelligence";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The lookback period for the feed to be imported. The date-time to begin importing the feed from, for example: 2024-01-01T00:00:00.000Z. */
  lookbackPeriod?: Date;
  /** The flag to indicate whether the tenant has the premium SKU required to access this connector. */
  requiredSKUsPresent?: boolean;
  /** The available data types for the connector. */
  dataTypes?: PremiumMdtiDataConnectorDataTypes;
}

export function premiumMicrosoftDefenderForThreatIntelligenceSerializer(
  item: PremiumMicrosoftDefenderForThreatIntelligence,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "tenantId",
      "lookbackPeriod",
      "requiredSKUsPresent",
      "dataTypes",
    ])
      ? undefined
      : _premiumMicrosoftDefenderForThreatIntelligencePropertiesSerializer(item),
  };
}

export function premiumMicrosoftDefenderForThreatIntelligenceDeserializer(
  item: any,
): PremiumMicrosoftDefenderForThreatIntelligence {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _premiumMicrosoftDefenderForThreatIntelligencePropertiesDeserializer(item["properties"])),
  };
}

/** Microsoft Defender for Threat Intelligence Premium data connector properties. */
export interface PremiumMdtiDataConnectorProperties extends DataConnectorTenantId {
  /** The lookback period for the feed to be imported. The date-time to begin importing the feed from, for example: 2024-01-01T00:00:00.000Z. */
  lookbackPeriod: Date;
  /** The flag to indicate whether the tenant has the premium SKU required to access this connector. */
  requiredSKUsPresent?: boolean;
  /** The available data types for the connector. */
  dataTypes: PremiumMdtiDataConnectorDataTypes;
}

export function premiumMdtiDataConnectorPropertiesSerializer(
  item: PremiumMdtiDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    lookbackPeriod: item["lookbackPeriod"].toISOString(),
    requiredSKUsPresent: item["requiredSKUsPresent"],
    dataTypes: premiumMdtiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function premiumMdtiDataConnectorPropertiesDeserializer(
  item: any,
): PremiumMdtiDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    lookbackPeriod: new Date(item["lookbackPeriod"]),
    requiredSKUsPresent: item["requiredSKUsPresent"],
    dataTypes: premiumMdtiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Microsoft Defender for Threat Intelligence Premium data connector. */
export interface PremiumMdtiDataConnectorDataTypes {
  /** Data type for Microsoft Defender for Threat Intelligence Premium data connector. */
  connector: PremiumMdtiDataConnectorDataTypesConnector;
}

export function premiumMdtiDataConnectorDataTypesSerializer(
  item: PremiumMdtiDataConnectorDataTypes,
): any {
  return { connector: premiumMdtiDataConnectorDataTypesConnectorSerializer(item["connector"]) };
}

export function premiumMdtiDataConnectorDataTypesDeserializer(
  item: any,
): PremiumMdtiDataConnectorDataTypes {
  return {
    connector: premiumMdtiDataConnectorDataTypesConnectorDeserializer(item["connector"]),
  };
}

/** Data type for Microsoft Defender for Threat Intelligence Premium data connector. */
export interface PremiumMdtiDataConnectorDataTypesConnector extends DataConnectorDataTypeCommon {}

export function premiumMdtiDataConnectorDataTypesConnectorSerializer(
  item: PremiumMdtiDataConnectorDataTypesConnector,
): any {
  return { state: item["state"] };
}

export function premiumMdtiDataConnectorDataTypesConnectorDeserializer(
  item: any,
): PremiumMdtiDataConnectorDataTypesConnector {
  return {
    state: item["state"],
  };
}

/** Represents MTP (Microsoft Threat Protection) data connector. */
export interface MTPDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "MicrosoftThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: MTPDataConnectorDataTypes;
  /** The available filtered providers for the connector. */
  filteredProviders?: MtpFilteredProviders;
}

export function mtpDataConnectorSerializer(item: MTPDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes", "filteredProviders"])
      ? undefined
      : _mtpDataConnectorPropertiesSerializer(item),
  };
}

export function mtpDataConnectorDeserializer(item: any): MTPDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mtpDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** MTP (Microsoft Threat Protection) data connector properties. */
export interface MTPDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: MTPDataConnectorDataTypes;
  /** The available filtered providers for the connector. */
  filteredProviders?: MtpFilteredProviders;
}

export function mtpDataConnectorPropertiesSerializer(item: MTPDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: mtpDataConnectorDataTypesSerializer(item["dataTypes"]),
    filteredProviders: !item["filteredProviders"]
      ? item["filteredProviders"]
      : mtpFilteredProvidersSerializer(item["filteredProviders"]),
  };
}

export function mtpDataConnectorPropertiesDeserializer(item: any): MTPDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: mtpDataConnectorDataTypesDeserializer(item["dataTypes"]),
    filteredProviders: !item["filteredProviders"]
      ? item["filteredProviders"]
      : mtpFilteredProvidersDeserializer(item["filteredProviders"]),
  };
}

/** The available data types for Microsoft Threat Protection Platforms data connector. */
export interface MTPDataConnectorDataTypes {
  /** Incidents data type for Microsoft Threat Protection Platforms data connector. */
  incidents: MTPDataConnectorDataTypesIncidents;
  /** Alerts data type for Microsoft Threat Protection Platforms data connector. */
  alerts?: MTPDataConnectorDataTypesAlerts;
}

export function mtpDataConnectorDataTypesSerializer(item: MTPDataConnectorDataTypes): any {
  return {
    incidents: mtpDataConnectorDataTypesIncidentsSerializer(item["incidents"]),
    alerts: !item["alerts"]
      ? item["alerts"]
      : mtpDataConnectorDataTypesAlertsSerializer(item["alerts"]),
  };
}

export function mtpDataConnectorDataTypesDeserializer(item: any): MTPDataConnectorDataTypes {
  return {
    incidents: mtpDataConnectorDataTypesIncidentsDeserializer(item["incidents"]),
    alerts: !item["alerts"]
      ? item["alerts"]
      : mtpDataConnectorDataTypesAlertsDeserializer(item["alerts"]),
  };
}

/** Incidents data type for Microsoft Threat Protection Platforms data connector. */
export interface MTPDataConnectorDataTypesIncidents extends DataConnectorDataTypeCommon {}

export function mtpDataConnectorDataTypesIncidentsSerializer(
  item: MTPDataConnectorDataTypesIncidents,
): any {
  return { state: item["state"] };
}

export function mtpDataConnectorDataTypesIncidentsDeserializer(
  item: any,
): MTPDataConnectorDataTypesIncidents {
  return {
    state: item["state"],
  };
}

/** Alerts data type for Microsoft Threat Protection Platforms data connector. */
export interface MTPDataConnectorDataTypesAlerts extends DataConnectorDataTypeCommon {}

export function mtpDataConnectorDataTypesAlertsSerializer(
  item: MTPDataConnectorDataTypesAlerts,
): any {
  return { state: item["state"] };
}

export function mtpDataConnectorDataTypesAlertsDeserializer(
  item: any,
): MTPDataConnectorDataTypesAlerts {
  return {
    state: item["state"],
  };
}

/** Represents the connector's Filtered providers */
export interface MtpFilteredProviders {
  /** Alerts filtered providers. When filters are not applied, all alerts will stream through the MTP pipeline, still in private preview for all products EXCEPT MDA and MDI, which are in GA state. */
  alerts: MtpProvider[];
}

export function mtpFilteredProvidersSerializer(item: MtpFilteredProviders): any {
  return {
    alerts: item["alerts"].map((p: any) => {
      return p;
    }),
  };
}

export function mtpFilteredProvidersDeserializer(item: any): MtpFilteredProviders {
  return {
    alerts: item["alerts"].map((p: any) => {
      return p;
    }),
  };
}

/** The available data providers. */
export enum KnownMtpProvider {
  /** microsoftDefenderForCloudApps */
  MicrosoftDefenderForCloudApps = "microsoftDefenderForCloudApps",
  /** microsoftDefenderForIdentity */
  MicrosoftDefenderForIdentity = "microsoftDefenderForIdentity",
}

/**
 * The available data providers. \
 * {@link KnownMtpProvider} can be used interchangeably with MtpProvider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **microsoftDefenderForCloudApps**: microsoftDefenderForCloudApps \
 * **microsoftDefenderForIdentity**: microsoftDefenderForIdentity
 */
export type MtpProvider = string;

/** Represents AATP (Azure Advanced Threat Protection) data connector. */
export interface AatpDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "AzureAdvancedThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function aatpDataConnectorSerializer(item: AatpDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _aatpDataConnectorPropertiesSerializer(item),
  };
}

export function aatpDataConnectorDeserializer(item: any): AatpDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _aatpDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** AATP (Azure Advanced Threat Protection) data connector properties. */
export interface AatpDataConnectorProperties {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function aatpDataConnectorPropertiesSerializer(item: AatpDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function aatpDataConnectorPropertiesDeserializer(item: any): AatpDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** Represents ASC (Azure Security Center) data connector. */
export interface ASCDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "AzureSecurityCenter";
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ascDataConnectorSerializer(item: ASCDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["dataTypes", "subscriptionId"])
      ? undefined
      : _ascDataConnectorPropertiesSerializer(item),
  };
}

export function ascDataConnectorDeserializer(item: any): ASCDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ascDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** ASC (Azure Security Center) data connector properties. */
export interface ASCDataConnectorProperties extends DataConnectorWithAlertsProperties {
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ascDataConnectorPropertiesSerializer(item: ASCDataConnectorProperties): any {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function ascDataConnectorPropertiesDeserializer(item: any): ASCDataConnectorProperties {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

/** Represents Amazon Web Services CloudTrail data connector. */
export interface AwsCloudTrailDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "AmazonWebServicesCloudTrail";
  /** The Aws Role Arn (with CloudTrailReadOnly policy) that is used to access the Aws account. */
  awsRoleArn?: string;
  /** The available data types for the connector. */
  dataTypes?: AwsCloudTrailDataConnectorDataTypes;
}

export function awsCloudTrailDataConnectorSerializer(item: AwsCloudTrailDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["awsRoleArn", "dataTypes"])
      ? undefined
      : _awsCloudTrailDataConnectorPropertiesSerializer(item),
  };
}

export function awsCloudTrailDataConnectorDeserializer(item: any): AwsCloudTrailDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _awsCloudTrailDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Amazon Web Services CloudTrail data connector properties. */
export interface AwsCloudTrailDataConnectorProperties {
  /** The Aws Role Arn (with CloudTrailReadOnly policy) that is used to access the Aws account. */
  awsRoleArn?: string;
  /** The available data types for the connector. */
  dataTypes: AwsCloudTrailDataConnectorDataTypes;
}

export function awsCloudTrailDataConnectorPropertiesSerializer(
  item: AwsCloudTrailDataConnectorProperties,
): any {
  return {
    awsRoleArn: item["awsRoleArn"],
    dataTypes: awsCloudTrailDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function awsCloudTrailDataConnectorPropertiesDeserializer(
  item: any,
): AwsCloudTrailDataConnectorProperties {
  return {
    awsRoleArn: item["awsRoleArn"],
    dataTypes: awsCloudTrailDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Amazon Web Services CloudTrail data connector. */
export interface AwsCloudTrailDataConnectorDataTypes {
  /** Logs data type. */
  logs: AwsCloudTrailDataConnectorDataTypesLogs;
}

export function awsCloudTrailDataConnectorDataTypesSerializer(
  item: AwsCloudTrailDataConnectorDataTypes,
): any {
  return { logs: awsCloudTrailDataConnectorDataTypesLogsSerializer(item["logs"]) };
}

export function awsCloudTrailDataConnectorDataTypesDeserializer(
  item: any,
): AwsCloudTrailDataConnectorDataTypes {
  return {
    logs: awsCloudTrailDataConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface AwsCloudTrailDataConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function awsCloudTrailDataConnectorDataTypesLogsSerializer(
  item: AwsCloudTrailDataConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function awsCloudTrailDataConnectorDataTypesLogsDeserializer(
  item: any,
): AwsCloudTrailDataConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents Amazon Web Services S3 data connector. */
export interface AwsS3DataConnector extends DataConnector {
  /** The data connector kind */
  kind: "AmazonWebServicesS3";
  /** The logs destination table name in LogAnalytics. */
  destinationTable?: string;
  /** The AWS sqs urls for the connector. */
  sqsUrls?: string[];
  /** The Aws Role Arn that is used to access the Aws account. */
  roleArn?: string;
  /** The available data types for the connector. */
  dataTypes?: AwsS3DataConnectorDataTypes;
}

export function awsS3DataConnectorSerializer(item: AwsS3DataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["destinationTable", "sqsUrls", "roleArn", "dataTypes"])
      ? undefined
      : _awsS3DataConnectorPropertiesSerializer(item),
  };
}

export function awsS3DataConnectorDeserializer(item: any): AwsS3DataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _awsS3DataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Amazon Web Services S3 data connector properties. */
export interface AwsS3DataConnectorProperties {
  /** The logs destination table name in LogAnalytics. */
  destinationTable: string;
  /** The AWS sqs urls for the connector. */
  sqsUrls: string[];
  /** The Aws Role Arn that is used to access the Aws account. */
  roleArn: string;
  /** The available data types for the connector. */
  dataTypes: AwsS3DataConnectorDataTypes;
}

export function awsS3DataConnectorPropertiesSerializer(item: AwsS3DataConnectorProperties): any {
  return {
    destinationTable: item["destinationTable"],
    sqsUrls: item["sqsUrls"].map((p: any) => {
      return p;
    }),
    roleArn: item["roleArn"],
    dataTypes: awsS3DataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function awsS3DataConnectorPropertiesDeserializer(item: any): AwsS3DataConnectorProperties {
  return {
    destinationTable: item["destinationTable"],
    sqsUrls: item["sqsUrls"].map((p: any) => {
      return p;
    }),
    roleArn: item["roleArn"],
    dataTypes: awsS3DataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Amazon Web Services S3 data connector. */
export interface AwsS3DataConnectorDataTypes {
  /** Logs data type. */
  logs: AwsS3DataConnectorDataTypesLogs;
}

export function awsS3DataConnectorDataTypesSerializer(item: AwsS3DataConnectorDataTypes): any {
  return { logs: awsS3DataConnectorDataTypesLogsSerializer(item["logs"]) };
}

export function awsS3DataConnectorDataTypesDeserializer(item: any): AwsS3DataConnectorDataTypes {
  return {
    logs: awsS3DataConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface AwsS3DataConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function awsS3DataConnectorDataTypesLogsSerializer(
  item: AwsS3DataConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function awsS3DataConnectorDataTypesLogsDeserializer(
  item: any,
): AwsS3DataConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents Rest Api Poller data connector. */
export interface RestApiPollerDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "RestApiPoller";
  /** The connector definition name (the dataConnectorDefinition resource id). */
  connectorDefinitionName?: string;
  /** The a authentication model. */
  auth?: CcpAuthConfigUnion;
  /** The request configuration. */
  request?: RestApiPollerRequestConfig;
  /** The DCR related properties. */
  dcrConfig?: DCRConfiguration;
  /** Indicates whether the connector is active or not. */
  isActive?: boolean;
  /** The Log Analytics table destination. */
  dataType?: string;
  /** The response configuration. */
  response?: CcpResponseConfig;
  /** The paging configuration. */
  paging?: RestApiPollerRequestPagingConfig;
  /** The add on attributes. The key name will become attribute name (a column) and the value will become the attribute value in the payload. */
  addOnAttributes?: Record<string, string>;
}

export function restApiPollerDataConnectorSerializer(item: RestApiPollerDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "connectorDefinitionName",
      "auth",
      "request",
      "dcrConfig",
      "isActive",
      "dataType",
      "response",
      "paging",
      "addOnAttributes",
    ])
      ? undefined
      : _restApiPollerDataConnectorPropertiesSerializer(item),
  };
}

export function restApiPollerDataConnectorDeserializer(item: any): RestApiPollerDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _restApiPollerDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Rest Api Poller data connector properties. */
export interface RestApiPollerDataConnectorProperties {
  /** The connector definition name (the dataConnectorDefinition resource id). */
  connectorDefinitionName: string;
  /** The a authentication model. */
  auth: CcpAuthConfigUnion;
  /** The request configuration. */
  request: RestApiPollerRequestConfig;
  /** The DCR related properties. */
  dcrConfig?: DCRConfiguration;
  /** Indicates whether the connector is active or not. */
  isActive?: boolean;
  /** The Log Analytics table destination. */
  dataType?: string;
  /** The response configuration. */
  response?: CcpResponseConfig;
  /** The paging configuration. */
  paging?: RestApiPollerRequestPagingConfig;
  /** The add on attributes. The key name will become attribute name (a column) and the value will become the attribute value in the payload. */
  addOnAttributes?: Record<string, string>;
}

export function restApiPollerDataConnectorPropertiesSerializer(
  item: RestApiPollerDataConnectorProperties,
): any {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: ccpAuthConfigUnionSerializer(item["auth"]),
    request: restApiPollerRequestConfigSerializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
    isActive: item["isActive"],
    dataType: item["dataType"],
    response: !item["response"] ? item["response"] : ccpResponseConfigSerializer(item["response"]),
    paging: !item["paging"]
      ? item["paging"]
      : restApiPollerRequestPagingConfigSerializer(item["paging"]),
    addOnAttributes: item["addOnAttributes"],
  };
}

export function restApiPollerDataConnectorPropertiesDeserializer(
  item: any,
): RestApiPollerDataConnectorProperties {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: ccpAuthConfigUnionDeserializer(item["auth"]),
    request: restApiPollerRequestConfigDeserializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
    isActive: item["isActive"],
    dataType: item["dataType"],
    response: !item["response"]
      ? item["response"]
      : ccpResponseConfigDeserializer(item["response"]),
    paging: !item["paging"]
      ? item["paging"]
      : restApiPollerRequestPagingConfigDeserializer(item["paging"]),
    addOnAttributes: !item["addOnAttributes"]
      ? item["addOnAttributes"]
      : Object.fromEntries(
          Object.entries(item["addOnAttributes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Base Model for API authentication. */
export interface CcpAuthConfig {
  /** The auth type */
  /** The discriminator possible values: APIKey, AWS, Basic, GCP, ServiceBus, GitHub, None, JwtToken, OAuth2, Oracle, Session */
  type: CcpAuthType;
}

export function ccpAuthConfigSerializer(item: CcpAuthConfig): any {
  return { type: item["type"] };
}

export function ccpAuthConfigDeserializer(item: any): CcpAuthConfig {
  return {
    type: item["type"],
  };
}

/** Alias for CcpAuthConfigUnion */
export type CcpAuthConfigUnion =
  | ApiKeyAuthModel
  | AWSAuthModel
  | BasicAuthModel
  | GCPAuthModel
  | GenericBlobSbsAuthModel
  | GitHubAuthModel
  | NoneAuthModel
  | JwtAuthModel
  | OAuthModel
  | OracleAuthModel
  | SessionAuthModel
  | CcpAuthConfig;

export function ccpAuthConfigUnionSerializer(item: CcpAuthConfigUnion): any {
  switch (item.type) {
    case "APIKey":
      return apiKeyAuthModelSerializer(item as ApiKeyAuthModel);

    case "AWS":
      return awsAuthModelSerializer(item as AWSAuthModel);

    case "Basic":
      return basicAuthModelSerializer(item as BasicAuthModel);

    case "GCP":
      return gcpAuthModelSerializer(item as GCPAuthModel);

    case "ServiceBus":
      return genericBlobSbsAuthModelSerializer(item as GenericBlobSbsAuthModel);

    case "GitHub":
      return gitHubAuthModelSerializer(item as GitHubAuthModel);

    case "None":
      return noneAuthModelSerializer(item as NoneAuthModel);

    case "JwtToken":
      return jwtAuthModelSerializer(item as JwtAuthModel);

    case "OAuth2":
      return oAuthModelSerializer(item as OAuthModel);

    case "Oracle":
      return oracleAuthModelSerializer(item as OracleAuthModel);

    case "Session":
      return sessionAuthModelSerializer(item as SessionAuthModel);

    default:
      return ccpAuthConfigSerializer(item);
  }
}

export function ccpAuthConfigUnionDeserializer(item: any): CcpAuthConfigUnion {
  switch (item["type"]) {
    case "APIKey":
      return apiKeyAuthModelDeserializer(item as ApiKeyAuthModel);

    case "AWS":
      return awsAuthModelDeserializer(item as AWSAuthModel);

    case "Basic":
      return basicAuthModelDeserializer(item as BasicAuthModel);

    case "GCP":
      return gcpAuthModelDeserializer(item as GCPAuthModel);

    case "ServiceBus":
      return genericBlobSbsAuthModelDeserializer(item as GenericBlobSbsAuthModel);

    case "GitHub":
      return gitHubAuthModelDeserializer(item as GitHubAuthModel);

    case "None":
      return noneAuthModelDeserializer(item as NoneAuthModel);

    case "JwtToken":
      return jwtAuthModelDeserializer(item as JwtAuthModel);

    case "OAuth2":
      return oAuthModelDeserializer(item as OAuthModel);

    case "Oracle":
      return oracleAuthModelDeserializer(item as OracleAuthModel);

    case "Session":
      return sessionAuthModelDeserializer(item as SessionAuthModel);

    default:
      return ccpAuthConfigDeserializer(item);
  }
}

/** Type of paging */
export enum KnownCcpAuthType {
  /** Basic */
  Basic = "Basic",
  /** APIKey */
  APIKey = "APIKey",
  /** OAuth2 */
  OAuth2 = "OAuth2",
  /** AWS */
  AWS = "AWS",
  /** GCP */
  GCP = "GCP",
  /** Session */
  Session = "Session",
  /** JwtToken */
  JwtToken = "JwtToken",
  /** GitHub */
  GitHub = "GitHub",
  /** ServiceBus */
  ServiceBus = "ServiceBus",
  /** Oracle */
  Oracle = "Oracle",
  /** None */
  None = "None",
}

/**
 * Type of paging \
 * {@link KnownCcpAuthType} can be used interchangeably with CcpAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **APIKey**: APIKey \
 * **OAuth2**: OAuth2 \
 * **AWS**: AWS \
 * **GCP**: GCP \
 * **Session**: Session \
 * **JwtToken**: JwtToken \
 * **GitHub**: GitHub \
 * **ServiceBus**: ServiceBus \
 * **Oracle**: Oracle \
 * **None**: None
 */
export type CcpAuthType = string;

/** Model for authentication with the API Key. Will result in additional header on the request (default behavior) to the remote server: 'ApiKeyName: ApiKeyIdentifier ApiKey'. If 'IsApiKeyInPostPayload' is true it will send it in the body of the request and not the header. */
export interface ApiKeyAuthModel extends CcpAuthConfig {
  /** API Key for the user secret key credential */
  apiKey: string;
  /** API Key name */
  apiKeyName: string;
  /** API Key Identifier */
  apiKeyIdentifier?: string;
  /** Flag to indicate if API key is set in HTTP POST payload */
  isApiKeyInPostPayload?: boolean;
  /** The auth type */
  type: "APIKey";
}

export function apiKeyAuthModelSerializer(item: ApiKeyAuthModel): any {
  return {
    type: item["type"],
    apiKey: item["apiKey"],
    apiKeyName: item["apiKeyName"],
    apiKeyIdentifier: item["apiKeyIdentifier"],
    isApiKeyInPostPayload: item["isApiKeyInPostPayload"],
  };
}

export function apiKeyAuthModelDeserializer(item: any): ApiKeyAuthModel {
  return {
    type: item["type"],
    apiKey: item["apiKey"],
    apiKeyName: item["apiKeyName"],
    apiKeyIdentifier: item["apiKeyIdentifier"],
    isApiKeyInPostPayload: item["isApiKeyInPostPayload"],
  };
}

/** Model for API authentication with AWS. */
export interface AWSAuthModel extends CcpAuthConfig {
  /** AWS STS assume role ARN */
  roleArn: string;
  /** AWS STS assume role external ID. This is used to prevent the confused deputy problem: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html' */
  externalId?: string;
  /** The auth type */
  type: "AWS";
}

export function awsAuthModelSerializer(item: AWSAuthModel): any {
  return { type: item["type"], roleArn: item["roleArn"], externalId: item["externalId"] };
}

export function awsAuthModelDeserializer(item: any): AWSAuthModel {
  return {
    type: item["type"],
    roleArn: item["roleArn"],
    externalId: item["externalId"],
  };
}

/** Model for API authentication with basic flow - user name + password. */
export interface BasicAuthModel extends CcpAuthConfig {
  /** The user name. */
  userName: string;
  /** The password */
  password: string;
  /** The auth type */
  type: "Basic";
}

export function basicAuthModelSerializer(item: BasicAuthModel): any {
  return { type: item["type"], userName: item["userName"], password: item["password"] };
}

export function basicAuthModelDeserializer(item: any): BasicAuthModel {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
  };
}

/** Model for API authentication for all GCP kind connectors. */
export interface GCPAuthModel extends CcpAuthConfig {
  /** GCP Service Account Email */
  serviceAccountEmail: string;
  /** GCP Project Number */
  projectNumber: string;
  /** GCP Workload Identity Provider ID */
  workloadIdentityProviderId: string;
  /** The auth type */
  type: "GCP";
}

export function gcpAuthModelSerializer(item: GCPAuthModel): any {
  return {
    type: item["type"],
    serviceAccountEmail: item["serviceAccountEmail"],
    projectNumber: item["projectNumber"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function gcpAuthModelDeserializer(item: any): GCPAuthModel {
  return {
    type: item["type"],
    serviceAccountEmail: item["serviceAccountEmail"],
    projectNumber: item["projectNumber"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** Model for API authentication for working with service bus or storage account. */
export interface GenericBlobSbsAuthModel extends CcpAuthConfig {
  /** Credentials for service bus namespace, keyvault uri for access key */
  credentialsConfig?: Record<string, string>;
  /** Credentials for storage account, keyvault uri for access key */
  storageAccountCredentialsConfig?: Record<string, string>;
  /** The auth type */
  type: "ServiceBus";
}

export function genericBlobSbsAuthModelSerializer(item: GenericBlobSbsAuthModel): any {
  return {
    type: item["type"],
    credentialsConfig: item["credentialsConfig"],
    storageAccountCredentialsConfig: item["storageAccountCredentialsConfig"],
  };
}

export function genericBlobSbsAuthModelDeserializer(item: any): GenericBlobSbsAuthModel {
  return {
    type: item["type"],
    credentialsConfig: !item["credentialsConfig"]
      ? item["credentialsConfig"]
      : Object.fromEntries(
          Object.entries(item["credentialsConfig"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    storageAccountCredentialsConfig: !item["storageAccountCredentialsConfig"]
      ? item["storageAccountCredentialsConfig"]
      : Object.fromEntries(
          Object.entries(item["storageAccountCredentialsConfig"]).map(([k, p]: [string, any]) => [
            k,
            p,
          ]),
        ),
  };
}

/** Model for API authentication for GitHub. For this authentication first we need to approve the Router app (Microsoft Security DevOps) to access the GitHub account, Then we only need the InstallationId to get the access token from https://api.github.com/app/installations/{installId}/access_tokens. */
export interface GitHubAuthModel extends CcpAuthConfig {
  /** The GitHubApp auth installation id. */
  installationId?: string;
  /** The auth type */
  type: "GitHub";
}

export function gitHubAuthModelSerializer(item: GitHubAuthModel): any {
  return { type: item["type"], installationId: item["installationId"] };
}

export function gitHubAuthModelDeserializer(item: any): GitHubAuthModel {
  return {
    type: item["type"],
    installationId: item["installationId"],
  };
}

/** Model for API authentication with no authentication method - public API. */
export interface NoneAuthModel extends CcpAuthConfig {
  /** The auth type */
  type: "None";
}

export function noneAuthModelSerializer(item: NoneAuthModel): any {
  return { type: item["type"] };
}

export function noneAuthModelDeserializer(item: any): NoneAuthModel {
  return {
    type: item["type"],
  };
}

/** Model for API authentication with JWT. Simple exchange between user name + password to access token. */
export interface JwtAuthModel extends CcpAuthConfig {
  /** Token endpoint to request JWT */
  tokenEndpoint: string;
  /** The user name. If user name and password sent in header request we only need to populate the `value` property with the user name (Same as basic auth). If user name and password sent in body request we need to specify the `Key` and `Value`. */
  userName: Record<string, string>;
  /** The password */
  password: Record<string, string>;
  /** The custom query parameter we want to add once we send request to token endpoint. */
  queryParameters?: Record<string, string>;
  /** The custom headers we want to add once we send request to token endpoint. */
  headers?: Record<string, string>;
  /** Flag indicating whether we want to send the user name and password to token endpoint in the headers. */
  isCredentialsInHeaders?: boolean;
  /** Flag indicating whether the body request is JSON (header Content-Type = application/json), meaning its a Form URL encoded request (header Content-Type = application/x-www-form-urlencoded). */
  isJsonRequest?: boolean;
  /** Request timeout in seconds. */
  requestTimeoutInSeconds?: number;
  /** The auth type */
  type: "JwtToken";
}

export function jwtAuthModelSerializer(item: JwtAuthModel): any {
  return {
    type: item["type"],
    tokenEndpoint: item["tokenEndpoint"],
    userName: item["userName"],
    password: item["password"],
    queryParameters: item["queryParameters"],
    headers: item["headers"],
    isCredentialsInHeaders: item["isCredentialsInHeaders"],
    isJsonRequest: item["isJsonRequest"],
    requestTimeoutInSeconds: item["requestTimeoutInSeconds"],
  };
}

export function jwtAuthModelDeserializer(item: any): JwtAuthModel {
  return {
    type: item["type"],
    tokenEndpoint: item["tokenEndpoint"],
    userName: Object.fromEntries(
      Object.entries(item["userName"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    password: Object.fromEntries(
      Object.entries(item["password"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : Object.fromEntries(
          Object.entries(item["queryParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
    isCredentialsInHeaders: item["isCredentialsInHeaders"],
    isJsonRequest: item["isJsonRequest"],
    requestTimeoutInSeconds: item["requestTimeoutInSeconds"],
  };
}

/** Model for API authentication with OAuth2. */
export interface OAuthModel extends CcpAuthConfig {
  /** The user's authorization code. */
  authorizationCode?: string;
  /** The Application (client) secret that the OAuth provider assigned to your app. */
  clientSecret: string;
  /** The Application (client) ID that the OAuth provider assigned to your app. */
  clientId: string;
  /** Indicating whether we want to send the clientId and clientSecret to token endpoint in the headers. */
  isCredentialsInHeaders?: boolean;
  /** The Application (client) Scope that the OAuth provider assigned to your app. */
  scope?: string;
  /** The Application redirect url that the user config in the OAuth provider. */
  redirectUri?: string;
  /** The grant type, usually will be 'authorization code'. */
  grantType: string;
  /** The token endpoint. Defines the OAuth2 refresh token. */
  tokenEndpoint: string;
  /** The token endpoint headers. */
  tokenEndpointHeaders?: Record<string, string>;
  /** The token endpoint query parameters. */
  tokenEndpointQueryParameters?: Record<string, string>;
  /** The authorization endpoint. */
  authorizationEndpoint?: string;
  /** The authorization endpoint headers. */
  authorizationEndpointHeaders?: Record<string, string>;
  /** The authorization endpoint query parameters. */
  authorizationEndpointQueryParameters?: Record<string, string>;
  /** A value indicating whether it's a JWT flow. */
  isJwtBearerFlow?: boolean;
  /** Access token prepend. Default is 'Bearer'. */
  accessTokenPrepend?: string;
  /** The auth type */
  type: "OAuth2";
}

export function oAuthModelSerializer(item: OAuthModel): any {
  return {
    type: item["type"],
    authorizationCode: item["authorizationCode"],
    clientSecret: item["clientSecret"],
    clientId: item["clientId"],
    isCredentialsInHeaders: item["isCredentialsInHeaders"],
    scope: item["scope"],
    redirectUri: item["redirectUri"],
    grantType: item["grantType"],
    tokenEndpoint: item["tokenEndpoint"],
    tokenEndpointHeaders: item["tokenEndpointHeaders"],
    tokenEndpointQueryParameters: item["tokenEndpointQueryParameters"],
    authorizationEndpoint: item["authorizationEndpoint"],
    authorizationEndpointHeaders: item["authorizationEndpointHeaders"],
    authorizationEndpointQueryParameters: item["authorizationEndpointQueryParameters"],
    isJwtBearerFlow: item["isJwtBearerFlow"],
    accessTokenPrepend: item["accessTokenPrepend"],
  };
}

export function oAuthModelDeserializer(item: any): OAuthModel {
  return {
    type: item["type"],
    authorizationCode: item["authorizationCode"],
    clientSecret: item["clientSecret"],
    clientId: item["clientId"],
    isCredentialsInHeaders: item["isCredentialsInHeaders"],
    scope: item["scope"],
    redirectUri: item["redirectUri"],
    grantType: item["grantType"],
    tokenEndpoint: item["tokenEndpoint"],
    tokenEndpointHeaders: !item["tokenEndpointHeaders"]
      ? item["tokenEndpointHeaders"]
      : Object.fromEntries(
          Object.entries(item["tokenEndpointHeaders"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    tokenEndpointQueryParameters: !item["tokenEndpointQueryParameters"]
      ? item["tokenEndpointQueryParameters"]
      : Object.fromEntries(
          Object.entries(item["tokenEndpointQueryParameters"]).map(([k, p]: [string, any]) => [
            k,
            p,
          ]),
        ),
    authorizationEndpoint: item["authorizationEndpoint"],
    authorizationEndpointHeaders: !item["authorizationEndpointHeaders"]
      ? item["authorizationEndpointHeaders"]
      : Object.fromEntries(
          Object.entries(item["authorizationEndpointHeaders"]).map(([k, p]: [string, any]) => [
            k,
            p,
          ]),
        ),
    authorizationEndpointQueryParameters: !item["authorizationEndpointQueryParameters"]
      ? item["authorizationEndpointQueryParameters"]
      : Object.fromEntries(
          Object.entries(item["authorizationEndpointQueryParameters"]).map(
            ([k, p]: [string, any]) => [k, p],
          ),
        ),
    isJwtBearerFlow: item["isJwtBearerFlow"],
    accessTokenPrepend: item["accessTokenPrepend"],
  };
}

/** Model for API authentication for Oracle. */
export interface OracleAuthModel extends CcpAuthConfig {
  /** Oracle tenant ID */
  tenantId: string;
  /** Oracle user ID */
  userId: string;
  /** Public Fingerprint */
  publicFingerprint: string;
  /** Content of the PRM file */
  pemFile: string;
  /** The auth type */
  type: "Oracle";
}

export function oracleAuthModelSerializer(item: OracleAuthModel): any {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    userId: item["userId"],
    publicFingerprint: item["publicFingerprint"],
    pemFile: item["pemFile"],
  };
}

export function oracleAuthModelDeserializer(item: any): OracleAuthModel {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    userId: item["userId"],
    publicFingerprint: item["publicFingerprint"],
    pemFile: item["pemFile"],
  };
}

/** Model for API authentication with session cookie. */
export interface SessionAuthModel extends CcpAuthConfig {
  /** The user name attribute key value. */
  userName: Record<string, string>;
  /** The password attribute name. */
  password: Record<string, string>;
  /** Query parameters to session service endpoint. */
  queryParameters?: Record<string, any>;
  /** Indicating whether API key is set in HTTP POST payload. */
  isPostPayloadJson?: boolean;
  /** HTTP request headers to session service endpoint. */
  headers?: Record<string, string>;
  /** Session timeout in minutes. */
  sessionTimeoutInMinutes?: number;
  /** Session id attribute name from HTTP response header. */
  sessionIdName?: string;
  /** HTTP request URL to session service endpoint. */
  sessionLoginRequestUri?: string;
  /** The auth type */
  type: "Session";
}

export function sessionAuthModelSerializer(item: SessionAuthModel): any {
  return {
    type: item["type"],
    userName: item["userName"],
    password: item["password"],
    queryParameters: item["queryParameters"],
    isPostPayloadJson: item["isPostPayloadJson"],
    headers: item["headers"],
    sessionTimeoutInMinutes: item["sessionTimeoutInMinutes"],
    sessionIdName: item["sessionIdName"],
    sessionLoginRequestUri: item["sessionLoginRequestUri"],
  };
}

export function sessionAuthModelDeserializer(item: any): SessionAuthModel {
  return {
    type: item["type"],
    userName: Object.fromEntries(
      Object.entries(item["userName"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    password: Object.fromEntries(
      Object.entries(item["password"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : Object.fromEntries(
          Object.entries(item["queryParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isPostPayloadJson: item["isPostPayloadJson"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
    sessionTimeoutInMinutes: item["sessionTimeoutInMinutes"],
    sessionIdName: item["sessionIdName"],
    sessionLoginRequestUri: item["sessionLoginRequestUri"],
  };
}

/** The request configuration. */
export interface RestApiPollerRequestConfig {
  /** The API endpoint. */
  apiEndpoint: string;
  /** The Rate limit queries per second for the request.. */
  rateLimitQPS?: number;
  /** The query window in minutes for the request. */
  queryWindowInMin?: number;
  /** The HTTP method, default value GET. */
  httpMethod?: HttpMethodVerb;
  /** The query time format. A remote server can have a query to pull data from range 'start' to 'end'. This property indicate what is the expected time format the remote server know to parse. */
  queryTimeFormat?: string;
  /** The retry count. */
  retryCount?: number;
  /** The timeout in seconds. */
  timeoutInSeconds?: number;
  /** Flag to indicate if HTTP POST payload is in JSON format (vs form-urlencoded). */
  isPostPayloadJson?: boolean;
  /** The header for the request for the remote server. */
  headers?: Record<string, string>;
  /** The HTTP query parameters to RESTful API. */
  queryParameters?: Record<string, any>;
  /** the query parameters template. Defines the query parameters template to use when passing query parameters in advanced scenarios. */
  queryParametersTemplate?: string;
  /** The query parameter name which the remote server expect to start query. This property goes hand to hand with `endTimeAttributeName`. */
  startTimeAttributeName?: string;
  /** The query parameter name which the remote server expect to end query. This property goes hand to hand with `startTimeAttributeName` */
  endTimeAttributeName?: string;
  /** The query parameter name which we need to send the server for query logs in time interval. Should be defined with `queryTimeIntervalPrepend` and `queryTimeIntervalDelimiter` */
  queryTimeIntervalAttributeName?: string;
  /** The string prepend to the value of the query parameter in `queryTimeIntervalAttributeName`. */
  queryTimeIntervalPrepend?: string;
  /** The delimiter string between 2 QueryTimeFormat in the query parameter `queryTimeIntervalAttributeName`. */
  queryTimeIntervalDelimiter?: string;
}

export function restApiPollerRequestConfigSerializer(item: RestApiPollerRequestConfig): any {
  return {
    apiEndpoint: item["apiEndpoint"],
    rateLimitQPS: item["rateLimitQPS"],
    queryWindowInMin: item["queryWindowInMin"],
    httpMethod: item["httpMethod"],
    queryTimeFormat: item["queryTimeFormat"],
    retryCount: item["retryCount"],
    timeoutInSeconds: item["timeoutInSeconds"],
    isPostPayloadJson: item["isPostPayloadJson"],
    headers: item["headers"],
    queryParameters: item["queryParameters"],
    queryParametersTemplate: item["queryParametersTemplate"],
    startTimeAttributeName: item["startTimeAttributeName"],
    endTimeAttributeName: item["endTimeAttributeName"],
    queryTimeIntervalAttributeName: item["queryTimeIntervalAttributeName"],
    queryTimeIntervalPrepend: item["queryTimeIntervalPrepend"],
    queryTimeIntervalDelimiter: item["queryTimeIntervalDelimiter"],
  };
}

export function restApiPollerRequestConfigDeserializer(item: any): RestApiPollerRequestConfig {
  return {
    apiEndpoint: item["apiEndpoint"],
    rateLimitQPS: item["rateLimitQPS"],
    queryWindowInMin: item["queryWindowInMin"],
    httpMethod: item["httpMethod"],
    queryTimeFormat: item["queryTimeFormat"],
    retryCount: item["retryCount"],
    timeoutInSeconds: item["timeoutInSeconds"],
    isPostPayloadJson: item["isPostPayloadJson"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(Object.entries(item["headers"]).map(([k, p]: [string, any]) => [k, p])),
    queryParameters: !item["queryParameters"]
      ? item["queryParameters"]
      : Object.fromEntries(
          Object.entries(item["queryParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    queryParametersTemplate: item["queryParametersTemplate"],
    startTimeAttributeName: item["startTimeAttributeName"],
    endTimeAttributeName: item["endTimeAttributeName"],
    queryTimeIntervalAttributeName: item["queryTimeIntervalAttributeName"],
    queryTimeIntervalPrepend: item["queryTimeIntervalPrepend"],
    queryTimeIntervalDelimiter: item["queryTimeIntervalDelimiter"],
  };
}

/** The HTTP method, default value GET. */
export enum KnownHttpMethodVerb {
  /** GET */
  GET = "GET",
  /** POST */
  Post = "POST",
  /** PUT */
  PUT = "PUT",
  /** DELETE */
  Delete = "DELETE",
}

/**
 * The HTTP method, default value GET. \
 * {@link KnownHttpMethodVerb} can be used interchangeably with HttpMethodVerb,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GET**: GET \
 * **POST**: POST \
 * **PUT**: PUT \
 * **DELETE**: DELETE
 */
export type HttpMethodVerb = string;

/** The configuration of the destination of the data. */
export interface DCRConfiguration {
  /** Represents the data collection ingestion endpoint in log analytics. */
  dataCollectionEndpoint: string;
  /** The data collection rule immutable id, the rule defines the transformation and data destination. */
  dataCollectionRuleImmutableId: string;
  /** The stream we are sending the data to. */
  streamName: string;
}

export function dcrConfigurationSerializer(item: DCRConfiguration): any {
  return {
    dataCollectionEndpoint: item["dataCollectionEndpoint"],
    dataCollectionRuleImmutableId: item["dataCollectionRuleImmutableId"],
    streamName: item["streamName"],
  };
}

export function dcrConfigurationDeserializer(item: any): DCRConfiguration {
  return {
    dataCollectionEndpoint: item["dataCollectionEndpoint"],
    dataCollectionRuleImmutableId: item["dataCollectionRuleImmutableId"],
    streamName: item["streamName"],
  };
}

/** A custom response configuration for a rule. */
export interface CcpResponseConfig {
  /** The json paths, '$' char is the json root. */
  eventsJsonPaths: string[];
  /** The value where the status message/code should appear in the response. */
  successStatusJsonPath?: string;
  /** The status value. */
  successStatusValue?: string;
  /** The value indicating whether the remote server support Gzip and we should expect Gzip response. */
  isGzipCompressed?: boolean;
  /** The compression algorithm. For Example: 'gzip', 'multi-gzip', 'deflate'. */
  compressionAlgo?: string;
  /** The response format. possible values are json,csv,xml */
  format?: string;
  /** The csv delimiter, in case the response format is CSV. */
  csvDelimiter?: string;
  /** The value indicating whether the response has CSV boundary in case the response in CSV format. */
  hasCsvBoundary?: boolean;
  /** The value indicating whether the response has headers in case the response in CSV format. */
  hasCsvHeader?: boolean;
  /** The value indicating whether the response isn't an array of events / logs.  By setting this flag to true it means the remote server will response with an object which each property has as a value an array of events / logs. */
  convertChildPropertiesToArray?: boolean;
  /** The character used to escape characters in CSV. */
  csvEscape?: string;
}

export function ccpResponseConfigSerializer(item: CcpResponseConfig): any {
  return {
    eventsJsonPaths: item["eventsJsonPaths"].map((p: any) => {
      return p;
    }),
    successStatusJsonPath: item["successStatusJsonPath"],
    successStatusValue: item["successStatusValue"],
    isGzipCompressed: item["isGzipCompressed"],
    compressionAlgo: item["compressionAlgo"],
    format: item["format"],
    csvDelimiter: item["csvDelimiter"],
    hasCsvBoundary: item["hasCsvBoundary"],
    hasCsvHeader: item["hasCsvHeader"],
    convertChildPropertiesToArray: item["convertChildPropertiesToArray"],
    csvEscape: item["csvEscape"],
  };
}

export function ccpResponseConfigDeserializer(item: any): CcpResponseConfig {
  return {
    eventsJsonPaths: item["eventsJsonPaths"].map((p: any) => {
      return p;
    }),
    successStatusJsonPath: item["successStatusJsonPath"],
    successStatusValue: item["successStatusValue"],
    isGzipCompressed: item["isGzipCompressed"],
    compressionAlgo: item["compressionAlgo"],
    format: item["format"],
    csvDelimiter: item["csvDelimiter"],
    hasCsvBoundary: item["hasCsvBoundary"],
    hasCsvHeader: item["hasCsvHeader"],
    convertChildPropertiesToArray: item["convertChildPropertiesToArray"],
    csvEscape: item["csvEscape"],
  };
}

/** The request paging configuration. */
export interface RestApiPollerRequestPagingConfig {
  /** Type of paging */
  pagingType: RestApiPollerRequestPagingKind;
  /** Page size */
  pageSize?: number;
  /** Page size parameter name */
  pageSizeParameterName?: string;
}

export function restApiPollerRequestPagingConfigSerializer(
  item: RestApiPollerRequestPagingConfig,
): any {
  return {
    pagingType: item["pagingType"],
    pageSize: item["pageSize"],
    pageSizeParameterName: item["pageSizeParameterName"],
  };
}

export function restApiPollerRequestPagingConfigDeserializer(
  item: any,
): RestApiPollerRequestPagingConfig {
  return {
    pagingType: item["pagingType"],
    pageSize: item["pageSize"],
    pageSizeParameterName: item["pageSizeParameterName"],
  };
}

/** Type of paging */
export enum KnownRestApiPollerRequestPagingKind {
  /** LinkHeader */
  LinkHeader = "LinkHeader",
  /** NextPageToken */
  NextPageToken = "NextPageToken",
  /** NextPageUrl */
  NextPageUrl = "NextPageUrl",
  /** PersistentToken */
  PersistentToken = "PersistentToken",
  /** PersistentLinkHeader */
  PersistentLinkHeader = "PersistentLinkHeader",
  /** Offset */
  Offset = "Offset",
  /** CountBasedPaging */
  CountBasedPaging = "CountBasedPaging",
}

/**
 * Type of paging \
 * {@link KnownRestApiPollerRequestPagingKind} can be used interchangeably with RestApiPollerRequestPagingKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LinkHeader**: LinkHeader \
 * **NextPageToken**: NextPageToken \
 * **NextPageUrl**: NextPageUrl \
 * **PersistentToken**: PersistentToken \
 * **PersistentLinkHeader**: PersistentLinkHeader \
 * **Offset**: Offset \
 * **CountBasedPaging**: CountBasedPaging
 */
export type RestApiPollerRequestPagingKind = string;

/** Represents Google Cloud Platform data connector. */
export interface GCPDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "GCP";
  /** The name of the connector definition that represents the UI config. */
  connectorDefinitionName?: string;
  /** The auth section of the connector. */
  auth?: GCPAuthProperties;
  /** The request section of the connector. */
  request?: GCPRequestProperties;
  /** The configuration of the destination of the data. */
  dcrConfig?: DCRConfiguration;
}

export function gcpDataConnectorSerializer(item: GCPDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "connectorDefinitionName",
      "auth",
      "request",
      "dcrConfig",
    ])
      ? undefined
      : _gcpDataConnectorPropertiesSerializer(item),
  };
}

export function gcpDataConnectorDeserializer(item: any): GCPDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gcpDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Google Cloud Platform data connector properties. */
export interface GCPDataConnectorProperties {
  /** The name of the connector definition that represents the UI config. */
  connectorDefinitionName: string;
  /** The auth section of the connector. */
  auth: GCPAuthProperties;
  /** The request section of the connector. */
  request: GCPRequestProperties;
  /** The configuration of the destination of the data. */
  dcrConfig?: DCRConfiguration;
}

export function gcpDataConnectorPropertiesSerializer(item: GCPDataConnectorProperties): any {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: gcpAuthPropertiesSerializer(item["auth"]),
    request: gcpRequestPropertiesSerializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
  };
}

export function gcpDataConnectorPropertiesDeserializer(item: any): GCPDataConnectorProperties {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: gcpAuthPropertiesDeserializer(item["auth"]),
    request: gcpRequestPropertiesDeserializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
  };
}

/** Google Cloud Platform auth section properties. */
export interface GCPAuthProperties {
  /** The service account that is used to access the GCP project. */
  serviceAccountEmail: string;
  /** The GCP project number. */
  projectNumber: string;
  /** The workload identity provider id that is used to gain access to the GCP project. */
  workloadIdentityProviderId: string;
}

export function gcpAuthPropertiesSerializer(item: GCPAuthProperties): any {
  return {
    serviceAccountEmail: item["serviceAccountEmail"],
    projectNumber: item["projectNumber"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

export function gcpAuthPropertiesDeserializer(item: any): GCPAuthProperties {
  return {
    serviceAccountEmail: item["serviceAccountEmail"],
    projectNumber: item["projectNumber"],
    workloadIdentityProviderId: item["workloadIdentityProviderId"],
  };
}

/** Google Cloud Platform request section properties. */
export interface GCPRequestProperties {
  /** The GCP project id. */
  projectId: string;
  /** The GCP pub/sub subscription names. */
  subscriptionNames: string[];
}

export function gcpRequestPropertiesSerializer(item: GCPRequestProperties): any {
  return {
    projectId: item["projectId"],
    subscriptionNames: item["subscriptionNames"].map((p: any) => {
      return p;
    }),
  };
}

export function gcpRequestPropertiesDeserializer(item: any): GCPRequestProperties {
  return {
    projectId: item["projectId"],
    subscriptionNames: item["subscriptionNames"].map((p: any) => {
      return p;
    }),
  };
}

/** Represents MCAS (Microsoft Cloud App Security) data connector. */
export interface McasDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "MicrosoftCloudAppSecurity";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: McasDataConnectorDataTypes;
}

export function mcasDataConnectorSerializer(item: McasDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _mcasDataConnectorPropertiesSerializer(item),
  };
}

export function mcasDataConnectorDeserializer(item: any): McasDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mcasDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** MCAS (Microsoft Cloud App Security) data connector properties. */
export interface McasDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: McasDataConnectorDataTypes;
}

export function mcasDataConnectorPropertiesSerializer(item: McasDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: mcasDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function mcasDataConnectorPropertiesDeserializer(item: any): McasDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: mcasDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for MCAS (Microsoft Cloud App Security) data connector. */
export interface McasDataConnectorDataTypes extends AlertsDataTypeOfDataConnector {
  /** Discovery log data type connection. */
  discoveryLogs?: DataConnectorDataTypeCommon;
}

export function mcasDataConnectorDataTypesSerializer(item: McasDataConnectorDataTypes): any {
  return {
    alerts: dataConnectorDataTypeCommonSerializer(item["alerts"]),
    discoveryLogs: !item["discoveryLogs"]
      ? item["discoveryLogs"]
      : dataConnectorDataTypeCommonSerializer(item["discoveryLogs"]),
  };
}

export function mcasDataConnectorDataTypesDeserializer(item: any): McasDataConnectorDataTypes {
  return {
    alerts: dataConnectorDataTypeCommonDeserializer(item["alerts"]),
    discoveryLogs: !item["discoveryLogs"]
      ? item["discoveryLogs"]
      : dataConnectorDataTypeCommonDeserializer(item["discoveryLogs"]),
  };
}

/** Represents Dynamics365 data connector. */
export interface Dynamics365DataConnector extends DataConnector {
  /** The data connector kind */
  kind: "Dynamics365";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: Dynamics365DataConnectorDataTypes;
}

export function dynamics365DataConnectorSerializer(item: Dynamics365DataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _dynamics365DataConnectorPropertiesSerializer(item),
  };
}

export function dynamics365DataConnectorDeserializer(item: any): Dynamics365DataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dynamics365DataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Dynamics365 data connector properties. */
export interface Dynamics365DataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: Dynamics365DataConnectorDataTypes;
}

export function dynamics365DataConnectorPropertiesSerializer(
  item: Dynamics365DataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: dynamics365DataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function dynamics365DataConnectorPropertiesDeserializer(
  item: any,
): Dynamics365DataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: dynamics365DataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Dynamics365 data connector. */
export interface Dynamics365DataConnectorDataTypes {
  /** Common Data Service data type connection. */
  dynamics365CdsActivities: Dynamics365DataConnectorDataTypesDynamics365CdsActivities;
}

export function dynamics365DataConnectorDataTypesSerializer(
  item: Dynamics365DataConnectorDataTypes,
): any {
  return {
    dynamics365CdsActivities: dynamics365DataConnectorDataTypesDynamics365CdsActivitiesSerializer(
      item["dynamics365CdsActivities"],
    ),
  };
}

export function dynamics365DataConnectorDataTypesDeserializer(
  item: any,
): Dynamics365DataConnectorDataTypes {
  return {
    dynamics365CdsActivities: dynamics365DataConnectorDataTypesDynamics365CdsActivitiesDeserializer(
      item["dynamics365CdsActivities"],
    ),
  };
}

/** Common Data Service data type connection. */
export interface Dynamics365DataConnectorDataTypesDynamics365CdsActivities extends DataConnectorDataTypeCommon {}

export function dynamics365DataConnectorDataTypesDynamics365CdsActivitiesSerializer(
  item: Dynamics365DataConnectorDataTypesDynamics365CdsActivities,
): any {
  return { state: item["state"] };
}

export function dynamics365DataConnectorDataTypesDynamics365CdsActivitiesDeserializer(
  item: any,
): Dynamics365DataConnectorDataTypesDynamics365CdsActivities {
  return {
    state: item["state"],
  };
}

/** Represents OfficeATP (Office 365 Advanced Threat Protection) data connector. */
export interface OfficeATPDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "OfficeATP";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function officeATPDataConnectorSerializer(item: OfficeATPDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _officeATPDataConnectorPropertiesSerializer(item),
  };
}

export function officeATPDataConnectorDeserializer(item: any): OfficeATPDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _officeATPDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** OfficeATP (Office 365 Advanced Threat Protection) data connector properties. */
export interface OfficeATPDataConnectorProperties {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function officeATPDataConnectorPropertiesSerializer(
  item: OfficeATPDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function officeATPDataConnectorPropertiesDeserializer(
  item: any,
): OfficeATPDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** Represents Microsoft Purview Information Protection data connector. */
export interface MicrosoftPurviewInformationProtectionDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "MicrosoftPurviewInformationProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: MicrosoftPurviewInformationProtectionConnectorDataTypes;
}

export function microsoftPurviewInformationProtectionDataConnectorSerializer(
  item: MicrosoftPurviewInformationProtectionDataConnector,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _microsoftPurviewInformationProtectionDataConnectorPropertiesSerializer(item),
  };
}

export function microsoftPurviewInformationProtectionDataConnectorDeserializer(
  item: any,
): MicrosoftPurviewInformationProtectionDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _microsoftPurviewInformationProtectionDataConnectorPropertiesDeserializer(
          item["properties"],
        )),
  };
}

/** Microsoft Purview Information Protection data connector properties. */
export interface MicrosoftPurviewInformationProtectionDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: MicrosoftPurviewInformationProtectionConnectorDataTypes;
}

export function microsoftPurviewInformationProtectionDataConnectorPropertiesSerializer(
  item: MicrosoftPurviewInformationProtectionDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: microsoftPurviewInformationProtectionConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function microsoftPurviewInformationProtectionDataConnectorPropertiesDeserializer(
  item: any,
): MicrosoftPurviewInformationProtectionDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: microsoftPurviewInformationProtectionConnectorDataTypesDeserializer(
      item["dataTypes"],
    ),
  };
}

/** The available data types for Microsoft Purview Information Protection data connector. */
export interface MicrosoftPurviewInformationProtectionConnectorDataTypes {
  /** Logs data type. */
  logs: MicrosoftPurviewInformationProtectionConnectorDataTypesLogs;
}

export function microsoftPurviewInformationProtectionConnectorDataTypesSerializer(
  item: MicrosoftPurviewInformationProtectionConnectorDataTypes,
): any {
  return {
    logs: microsoftPurviewInformationProtectionConnectorDataTypesLogsSerializer(item["logs"]),
  };
}

export function microsoftPurviewInformationProtectionConnectorDataTypesDeserializer(
  item: any,
): MicrosoftPurviewInformationProtectionConnectorDataTypes {
  return {
    logs: microsoftPurviewInformationProtectionConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface MicrosoftPurviewInformationProtectionConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function microsoftPurviewInformationProtectionConnectorDataTypesLogsSerializer(
  item: MicrosoftPurviewInformationProtectionConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function microsoftPurviewInformationProtectionConnectorDataTypesLogsDeserializer(
  item: any,
): MicrosoftPurviewInformationProtectionConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents Office Microsoft Project data connector. */
export interface Office365ProjectDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "Office365Project";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: Office365ProjectConnectorDataTypes;
}

export function office365ProjectDataConnectorSerializer(item: Office365ProjectDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _office365ProjectDataConnectorPropertiesSerializer(item),
  };
}

export function office365ProjectDataConnectorDeserializer(
  item: any,
): Office365ProjectDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _office365ProjectDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Office Microsoft Project data connector properties. */
export interface Office365ProjectDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: Office365ProjectConnectorDataTypes;
}

export function office365ProjectDataConnectorPropertiesSerializer(
  item: Office365ProjectDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: office365ProjectConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function office365ProjectDataConnectorPropertiesDeserializer(
  item: any,
): Office365ProjectDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: office365ProjectConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Office Microsoft Project data connector. */
export interface Office365ProjectConnectorDataTypes {
  /** Logs data type. */
  logs: Office365ProjectConnectorDataTypesLogs;
}

export function office365ProjectConnectorDataTypesSerializer(
  item: Office365ProjectConnectorDataTypes,
): any {
  return { logs: office365ProjectConnectorDataTypesLogsSerializer(item["logs"]) };
}

export function office365ProjectConnectorDataTypesDeserializer(
  item: any,
): Office365ProjectConnectorDataTypes {
  return {
    logs: office365ProjectConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface Office365ProjectConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function office365ProjectConnectorDataTypesLogsSerializer(
  item: Office365ProjectConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function office365ProjectConnectorDataTypesLogsDeserializer(
  item: any,
): Office365ProjectConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents Office Microsoft PowerBI data connector. */
export interface OfficePowerBIDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "OfficePowerBI";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: OfficePowerBIConnectorDataTypes;
}

export function officePowerBIDataConnectorSerializer(item: OfficePowerBIDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _officePowerBIDataConnectorPropertiesSerializer(item),
  };
}

export function officePowerBIDataConnectorDeserializer(item: any): OfficePowerBIDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _officePowerBIDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Office Microsoft PowerBI data connector properties. */
export interface OfficePowerBIDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: OfficePowerBIConnectorDataTypes;
}

export function officePowerBIDataConnectorPropertiesSerializer(
  item: OfficePowerBIDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: officePowerBIConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function officePowerBIDataConnectorPropertiesDeserializer(
  item: any,
): OfficePowerBIDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: officePowerBIConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for Office Microsoft PowerBI data connector. */
export interface OfficePowerBIConnectorDataTypes {
  /** Logs data type. */
  logs: OfficePowerBIConnectorDataTypesLogs;
}

export function officePowerBIConnectorDataTypesSerializer(
  item: OfficePowerBIConnectorDataTypes,
): any {
  return { logs: officePowerBIConnectorDataTypesLogsSerializer(item["logs"]) };
}

export function officePowerBIConnectorDataTypesDeserializer(
  item: any,
): OfficePowerBIConnectorDataTypes {
  return {
    logs: officePowerBIConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface OfficePowerBIConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function officePowerBIConnectorDataTypesLogsSerializer(
  item: OfficePowerBIConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function officePowerBIConnectorDataTypesLogsDeserializer(
  item: any,
): OfficePowerBIConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents PurviewAudit data connector. */
export interface PurviewAuditDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "PurviewAudit";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The connector definition name (the dataConnectorDefinition resource id). */
  connectorDefinitionName?: string;
  /** The source type indicates which kind of data is relevant for this connector. */
  sourceType?: string;
  /** The DCR related properties. */
  dcrConfig?: DCRConfiguration;
  /** The available data types for the connector. */
  dataTypes?: PurviewAuditConnectorDataTypes;
}

export function purviewAuditDataConnectorSerializer(item: PurviewAuditDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "tenantId",
      "connectorDefinitionName",
      "sourceType",
      "dcrConfig",
      "dataTypes",
    ])
      ? undefined
      : _purviewAuditDataConnectorPropertiesSerializer(item),
  };
}

export function purviewAuditDataConnectorDeserializer(item: any): PurviewAuditDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _purviewAuditDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** PurviewAudit data connector properties. */
export interface PurviewAuditDataConnectorProperties extends DataConnectorTenantId {
  /** The connector definition name (the dataConnectorDefinition resource id). */
  connectorDefinitionName?: string;
  /** The source type indicates which kind of data is relevant for this connector. */
  sourceType?: string;
  /** The DCR related properties. */
  dcrConfig?: DCRConfiguration;
  /** The available data types for the connector. */
  dataTypes: PurviewAuditConnectorDataTypes;
}

export function purviewAuditDataConnectorPropertiesSerializer(
  item: PurviewAuditDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    connectorDefinitionName: item["connectorDefinitionName"],
    sourceType: item["sourceType"],
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
    dataTypes: purviewAuditConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function purviewAuditDataConnectorPropertiesDeserializer(
  item: any,
): PurviewAuditDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    connectorDefinitionName: item["connectorDefinitionName"],
    sourceType: item["sourceType"],
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
    dataTypes: purviewAuditConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for PurviewAudit data connector. */
export interface PurviewAuditConnectorDataTypes {
  /** Logs data type. */
  logs: PurviewAuditConnectorDataTypesLogs;
}

export function purviewAuditConnectorDataTypesSerializer(
  item: PurviewAuditConnectorDataTypes,
): any {
  return { logs: purviewAuditConnectorDataTypesLogsSerializer(item["logs"]) };
}

export function purviewAuditConnectorDataTypesDeserializer(
  item: any,
): PurviewAuditConnectorDataTypes {
  return {
    logs: purviewAuditConnectorDataTypesLogsDeserializer(item["logs"]),
  };
}

/** Logs data type. */
export interface PurviewAuditConnectorDataTypesLogs extends DataConnectorDataTypeCommon {}

export function purviewAuditConnectorDataTypesLogsSerializer(
  item: PurviewAuditConnectorDataTypesLogs,
): any {
  return { state: item["state"] };
}

export function purviewAuditConnectorDataTypesLogsDeserializer(
  item: any,
): PurviewAuditConnectorDataTypesLogs {
  return {
    state: item["state"],
  };
}

/** Represents OfficeIRM (Microsoft Insider Risk Management) data connector. */
export interface OfficeIRMDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "OfficeIRM";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function officeIRMDataConnectorSerializer(item: OfficeIRMDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _officeIRMDataConnectorPropertiesSerializer(item),
  };
}

export function officeIRMDataConnectorDeserializer(item: any): OfficeIRMDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _officeIRMDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** OfficeIRM (Microsoft Insider Risk Management) data connector properties. */
export interface OfficeIRMDataConnectorProperties {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function officeIRMDataConnectorPropertiesSerializer(
  item: OfficeIRMDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function officeIRMDataConnectorPropertiesDeserializer(
  item: any,
): OfficeIRMDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** Represents MDATP (Microsoft Defender Advanced Threat Protection) data connector. */
export interface MdatpDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "MicrosoftDefenderAdvancedThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function mdatpDataConnectorSerializer(item: MdatpDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _mdatpDataConnectorPropertiesSerializer(item),
  };
}

export function mdatpDataConnectorDeserializer(item: any): MdatpDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mdatpDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** MDATP (Microsoft Defender Advanced Threat Protection) data connector properties. */
export interface MdatpDataConnectorProperties {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function mdatpDataConnectorPropertiesSerializer(item: MdatpDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function mdatpDataConnectorPropertiesDeserializer(item: any): MdatpDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** Represents office data connector. */
export interface OfficeDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "Office365";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The available data types for the connector. */
  dataTypes?: OfficeDataConnectorDataTypes;
}

export function officeDataConnectorSerializer(item: OfficeDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "dataTypes"])
      ? undefined
      : _officeDataConnectorPropertiesSerializer(item),
  };
}

export function officeDataConnectorDeserializer(item: any): OfficeDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _officeDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Office data connector properties. */
export interface OfficeDataConnectorProperties extends DataConnectorTenantId {
  /** The available data types for the connector. */
  dataTypes: OfficeDataConnectorDataTypes;
}

export function officeDataConnectorPropertiesSerializer(item: OfficeDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: officeDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function officeDataConnectorPropertiesDeserializer(
  item: any,
): OfficeDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    dataTypes: officeDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for office data connector. */
export interface OfficeDataConnectorDataTypes {
  /** Exchange data type connection. */
  exchange: OfficeDataConnectorDataTypesExchange;
  /** SharePoint data type connection. */
  sharePoint: OfficeDataConnectorDataTypesSharePoint;
  /** Teams data type connection. */
  teams: OfficeDataConnectorDataTypesTeams;
}

export function officeDataConnectorDataTypesSerializer(item: OfficeDataConnectorDataTypes): any {
  return {
    exchange: officeDataConnectorDataTypesExchangeSerializer(item["exchange"]),
    sharePoint: officeDataConnectorDataTypesSharePointSerializer(item["sharePoint"]),
    teams: officeDataConnectorDataTypesTeamsSerializer(item["teams"]),
  };
}

export function officeDataConnectorDataTypesDeserializer(item: any): OfficeDataConnectorDataTypes {
  return {
    exchange: officeDataConnectorDataTypesExchangeDeserializer(item["exchange"]),
    sharePoint: officeDataConnectorDataTypesSharePointDeserializer(item["sharePoint"]),
    teams: officeDataConnectorDataTypesTeamsDeserializer(item["teams"]),
  };
}

/** Exchange data type connection. */
export interface OfficeDataConnectorDataTypesExchange extends DataConnectorDataTypeCommon {}

export function officeDataConnectorDataTypesExchangeSerializer(
  item: OfficeDataConnectorDataTypesExchange,
): any {
  return { state: item["state"] };
}

export function officeDataConnectorDataTypesExchangeDeserializer(
  item: any,
): OfficeDataConnectorDataTypesExchange {
  return {
    state: item["state"],
  };
}

/** SharePoint data type connection. */
export interface OfficeDataConnectorDataTypesSharePoint extends DataConnectorDataTypeCommon {}

export function officeDataConnectorDataTypesSharePointSerializer(
  item: OfficeDataConnectorDataTypesSharePoint,
): any {
  return { state: item["state"] };
}

export function officeDataConnectorDataTypesSharePointDeserializer(
  item: any,
): OfficeDataConnectorDataTypesSharePoint {
  return {
    state: item["state"],
  };
}

/** Teams data type connection. */
export interface OfficeDataConnectorDataTypesTeams extends DataConnectorDataTypeCommon {}

export function officeDataConnectorDataTypesTeamsSerializer(
  item: OfficeDataConnectorDataTypesTeams,
): any {
  return { state: item["state"] };
}

export function officeDataConnectorDataTypesTeamsDeserializer(
  item: any,
): OfficeDataConnectorDataTypesTeams {
  return {
    state: item["state"],
  };
}

/** Represents threat intelligence data connector. */
export interface TIDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "ThreatIntelligence";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The lookback period for the feed to be imported. */
  tipLookbackPeriod?: Date;
  /** The available data types for the connector. */
  dataTypes?: TIDataConnectorDataTypes;
}

export function tiDataConnectorSerializer(item: TIDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["tenantId", "tipLookbackPeriod", "dataTypes"])
      ? undefined
      : _tiDataConnectorPropertiesSerializer(item),
  };
}

export function tiDataConnectorDeserializer(item: any): TIDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tiDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** TI (Threat Intelligence) data connector properties. */
export interface TIDataConnectorProperties extends DataConnectorTenantId {
  /** The lookback period for the feed to be imported. */
  tipLookbackPeriod?: Date;
  /** The available data types for the connector. */
  dataTypes: TIDataConnectorDataTypes;
}

export function tiDataConnectorPropertiesSerializer(item: TIDataConnectorProperties): any {
  return {
    tenantId: item["tenantId"],
    tipLookbackPeriod: !item["tipLookbackPeriod"]
      ? item["tipLookbackPeriod"]
      : item["tipLookbackPeriod"].toISOString(),
    dataTypes: tiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function tiDataConnectorPropertiesDeserializer(item: any): TIDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    tipLookbackPeriod: !item["tipLookbackPeriod"]
      ? item["tipLookbackPeriod"]
      : new Date(item["tipLookbackPeriod"]),
    dataTypes: tiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The available data types for TI (Threat Intelligence) data connector. */
export interface TIDataConnectorDataTypes {
  /** Data type for indicators connection. */
  indicators: TIDataConnectorDataTypesIndicators;
}

export function tiDataConnectorDataTypesSerializer(item: TIDataConnectorDataTypes): any {
  return { indicators: tiDataConnectorDataTypesIndicatorsSerializer(item["indicators"]) };
}

export function tiDataConnectorDataTypesDeserializer(item: any): TIDataConnectorDataTypes {
  return {
    indicators: tiDataConnectorDataTypesIndicatorsDeserializer(item["indicators"]),
  };
}

/** Data type for indicators connection. */
export interface TIDataConnectorDataTypesIndicators extends DataConnectorDataTypeCommon {}

export function tiDataConnectorDataTypesIndicatorsSerializer(
  item: TIDataConnectorDataTypesIndicators,
): any {
  return { state: item["state"] };
}

export function tiDataConnectorDataTypesIndicatorsDeserializer(
  item: any,
): TIDataConnectorDataTypesIndicators {
  return {
    state: item["state"],
  };
}

/** Data connector to pull Threat intelligence data from TAXII 2.0/2.1 server */
export interface TiTaxiiDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "ThreatIntelligenceTaxii";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
  /** The workspace id. */
  workspaceId?: string;
  /** The friendly name for the TAXII server. */
  friendlyName?: string;
  /** The API root for the TAXII server. */
  taxiiServer?: string;
  /** The collection id of the TAXII server. */
  collectionId?: string;
  /** The userName for the TAXII server. */
  userName?: string;
  /** The password for the TAXII server. */
  password?: string;
  /** The lookback period for the TAXII server. */
  taxiiLookbackPeriod?: Date;
  /** The polling frequency for the TAXII server. */
  pollingFrequency?: PollingFrequency;
  /** The available data types for Threat Intelligence TAXII data connector. */
  dataTypes?: TiTaxiiDataConnectorDataTypes;
}

export function tiTaxiiDataConnectorSerializer(item: TiTaxiiDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "tenantId",
      "workspaceId",
      "friendlyName",
      "taxiiServer",
      "collectionId",
      "userName",
      "password",
      "taxiiLookbackPeriod",
      "pollingFrequency",
      "dataTypes",
    ])
      ? undefined
      : _tiTaxiiDataConnectorPropertiesSerializer(item),
  };
}

export function tiTaxiiDataConnectorDeserializer(item: any): TiTaxiiDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tiTaxiiDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Threat Intelligence TAXII data connector properties. */
export interface TiTaxiiDataConnectorProperties extends DataConnectorTenantId {
  /** The workspace id. */
  workspaceId?: string;
  /** The friendly name for the TAXII server. */
  friendlyName?: string;
  /** The API root for the TAXII server. */
  taxiiServer?: string;
  /** The collection id of the TAXII server. */
  collectionId?: string;
  /** The userName for the TAXII server. */
  userName?: string;
  /** The password for the TAXII server. */
  password?: string;
  /** The lookback period for the TAXII server. */
  taxiiLookbackPeriod?: Date;
  /** The polling frequency for the TAXII server. */
  pollingFrequency: PollingFrequency | null;
  /** The available data types for Threat Intelligence TAXII data connector. */
  dataTypes: TiTaxiiDataConnectorDataTypes;
}

export function tiTaxiiDataConnectorPropertiesSerializer(
  item: TiTaxiiDataConnectorProperties,
): any {
  return {
    tenantId: item["tenantId"],
    workspaceId: item["workspaceId"],
    friendlyName: item["friendlyName"],
    taxiiServer: item["taxiiServer"],
    collectionId: item["collectionId"],
    userName: item["userName"],
    password: item["password"],
    taxiiLookbackPeriod: !item["taxiiLookbackPeriod"]
      ? item["taxiiLookbackPeriod"]
      : item["taxiiLookbackPeriod"].toISOString(),
    pollingFrequency: item["pollingFrequency"],
    dataTypes: tiTaxiiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function tiTaxiiDataConnectorPropertiesDeserializer(
  item: any,
): TiTaxiiDataConnectorProperties {
  return {
    tenantId: item["tenantId"],
    workspaceId: item["workspaceId"],
    friendlyName: item["friendlyName"],
    taxiiServer: item["taxiiServer"],
    collectionId: item["collectionId"],
    userName: item["userName"],
    password: item["password"],
    taxiiLookbackPeriod: !item["taxiiLookbackPeriod"]
      ? item["taxiiLookbackPeriod"]
      : new Date(item["taxiiLookbackPeriod"]),
    pollingFrequency: item["pollingFrequency"],
    dataTypes: tiTaxiiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

/** The polling frequency for the TAXII server. */
export enum KnownPollingFrequency {
  /** Once a minute */
  OnceAMinute = "OnceAMinute",
  /** Once an hour */
  OnceAnHour = "OnceAnHour",
  /** Once a day */
  OnceADay = "OnceADay",
}

/**
 * The polling frequency for the TAXII server. \
 * {@link KnownPollingFrequency} can be used interchangeably with PollingFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnceAMinute**: Once a minute \
 * **OnceAnHour**: Once an hour \
 * **OnceADay**: Once a day
 */
export type PollingFrequency = string;

/** The available data types for Threat Intelligence TAXII data connector. */
export interface TiTaxiiDataConnectorDataTypes {
  /** Data type for TAXII connector. */
  taxiiClient: TiTaxiiDataConnectorDataTypesTaxiiClient;
}

export function tiTaxiiDataConnectorDataTypesSerializer(item: TiTaxiiDataConnectorDataTypes): any {
  return { taxiiClient: tiTaxiiDataConnectorDataTypesTaxiiClientSerializer(item["taxiiClient"]) };
}

export function tiTaxiiDataConnectorDataTypesDeserializer(
  item: any,
): TiTaxiiDataConnectorDataTypes {
  return {
    taxiiClient: tiTaxiiDataConnectorDataTypesTaxiiClientDeserializer(item["taxiiClient"]),
  };
}

/** Data type for TAXII connector. */
export interface TiTaxiiDataConnectorDataTypesTaxiiClient extends DataConnectorDataTypeCommon {}

export function tiTaxiiDataConnectorDataTypesTaxiiClientSerializer(
  item: TiTaxiiDataConnectorDataTypesTaxiiClient,
): any {
  return { state: item["state"] };
}

export function tiTaxiiDataConnectorDataTypesTaxiiClientDeserializer(
  item: any,
): TiTaxiiDataConnectorDataTypesTaxiiClient {
  return {
    state: item["state"],
  };
}

/** Represents IoT data connector. */
export interface IoTDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "IOT";
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ioTDataConnectorSerializer(item: IoTDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["dataTypes", "subscriptionId"])
      ? undefined
      : _ioTDataConnectorPropertiesSerializer(item),
  };
}

export function ioTDataConnectorDeserializer(item: any): IoTDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** IoT data connector properties. */
export interface IoTDataConnectorProperties extends DataConnectorWithAlertsProperties {
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ioTDataConnectorPropertiesSerializer(item: IoTDataConnectorProperties): any {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function ioTDataConnectorPropertiesDeserializer(item: any): IoTDataConnectorProperties {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

/** Represents Codeless UI data connector. */
export interface CodelessUiDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "GenericUI";
  /** Config to describe the instructions blade */
  connectorUiConfig?: CodelessUiConnectorConfigProperties;
}

export function codelessUiDataConnectorSerializer(item: CodelessUiDataConnector): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["connectorUiConfig"])
      ? undefined
      : _codelessUiDataConnectorPropertiesSerializer(item),
  };
}

export function codelessUiDataConnectorDeserializer(item: any): CodelessUiDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _codelessUiDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Represents Codeless UI data connector */
export interface CodelessParameters {
  /** Config to describe the instructions blade */
  connectorUiConfig?: CodelessUiConnectorConfigProperties;
}

export function codelessParametersSerializer(item: CodelessParameters): any {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesSerializer(item["connectorUiConfig"]),
  };
}

export function codelessParametersDeserializer(item: any): CodelessParameters {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesDeserializer(item["connectorUiConfig"]),
  };
}

/** Config to describe the instructions blade */
export interface CodelessUiConnectorConfigProperties {
  /** Connector blade title */
  title: string;
  /** Connector publisher name */
  publisher: string;
  /** Connector description */
  descriptionMarkdown: string;
  /** An optional custom image to be used when displaying the connector within Azure Sentinel's connector's gallery */
  customImage?: string;
  /** Name of the table the connector will insert the data to */
  graphQueriesTableName: string;
  /** The graph query to show the current data status */
  graphQueries: CodelessUiConnectorConfigPropertiesGraphQueriesItem[];
  /** The sample queries for the connector */
  sampleQueries: CodelessUiConnectorConfigPropertiesSampleQueriesItem[];
  /** Data types to check for last data received */
  dataTypes: CodelessUiConnectorConfigPropertiesDataTypesItem[];
  /** Define the way the connector check connectivity */
  connectivityCriteria: CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem[];
  /** Connector Availability Status */
  availability: Availability;
  /** Permissions required for the connector */
  permissions: Permissions;
  /** Instruction steps to enable the connector */
  instructionSteps: CodelessUiConnectorConfigPropertiesInstructionStepsItem[];
}

export function codelessUiConnectorConfigPropertiesSerializer(
  item: CodelessUiConnectorConfigProperties,
): any {
  return {
    title: item["title"],
    publisher: item["publisher"],
    descriptionMarkdown: item["descriptionMarkdown"],
    customImage: item["customImage"],
    graphQueriesTableName: item["graphQueriesTableName"],
    graphQueries: codelessUiConnectorConfigPropertiesGraphQueriesItemArraySerializer(
      item["graphQueries"],
    ),
    sampleQueries: codelessUiConnectorConfigPropertiesSampleQueriesItemArraySerializer(
      item["sampleQueries"],
    ),
    dataTypes: codelessUiConnectorConfigPropertiesDataTypesItemArraySerializer(item["dataTypes"]),
    connectivityCriteria:
      codelessUiConnectorConfigPropertiesConnectivityCriteriaItemArraySerializer(
        item["connectivityCriteria"],
      ),
    availability: availabilitySerializer(item["availability"]),
    permissions: permissionsSerializer(item["permissions"]),
    instructionSteps: codelessUiConnectorConfigPropertiesInstructionStepsItemArraySerializer(
      item["instructionSteps"],
    ),
  };
}

export function codelessUiConnectorConfigPropertiesDeserializer(
  item: any,
): CodelessUiConnectorConfigProperties {
  return {
    title: item["title"],
    publisher: item["publisher"],
    descriptionMarkdown: item["descriptionMarkdown"],
    customImage: item["customImage"],
    graphQueriesTableName: item["graphQueriesTableName"],
    graphQueries: codelessUiConnectorConfigPropertiesGraphQueriesItemArrayDeserializer(
      item["graphQueries"],
    ),
    sampleQueries: codelessUiConnectorConfigPropertiesSampleQueriesItemArrayDeserializer(
      item["sampleQueries"],
    ),
    dataTypes: codelessUiConnectorConfigPropertiesDataTypesItemArrayDeserializer(item["dataTypes"]),
    connectivityCriteria:
      codelessUiConnectorConfigPropertiesConnectivityCriteriaItemArrayDeserializer(
        item["connectivityCriteria"],
      ),
    availability: availabilityDeserializer(item["availability"]),
    permissions: permissionsDeserializer(item["permissions"]),
    instructionSteps: codelessUiConnectorConfigPropertiesInstructionStepsItemArrayDeserializer(
      item["instructionSteps"],
    ),
  };
}

export function codelessUiConnectorConfigPropertiesGraphQueriesItemArraySerializer(
  result: Array<CodelessUiConnectorConfigPropertiesGraphQueriesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesGraphQueriesItemSerializer(item);
  });
}

export function codelessUiConnectorConfigPropertiesGraphQueriesItemArrayDeserializer(
  result: Array<CodelessUiConnectorConfigPropertiesGraphQueriesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesGraphQueriesItemDeserializer(item);
  });
}

/** model interface CodelessUiConnectorConfigPropertiesGraphQueriesItem */
export interface CodelessUiConnectorConfigPropertiesGraphQueriesItem extends GraphQueries {}

export function codelessUiConnectorConfigPropertiesGraphQueriesItemSerializer(
  item: CodelessUiConnectorConfigPropertiesGraphQueriesItem,
): any {
  return { metricName: item["metricName"], legend: item["legend"], baseQuery: item["baseQuery"] };
}

export function codelessUiConnectorConfigPropertiesGraphQueriesItemDeserializer(
  item: any,
): CodelessUiConnectorConfigPropertiesGraphQueriesItem {
  return {
    metricName: item["metricName"],
    legend: item["legend"],
    baseQuery: item["baseQuery"],
  };
}

export function codelessUiConnectorConfigPropertiesSampleQueriesItemArraySerializer(
  result: Array<CodelessUiConnectorConfigPropertiesSampleQueriesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesSampleQueriesItemSerializer(item);
  });
}

export function codelessUiConnectorConfigPropertiesSampleQueriesItemArrayDeserializer(
  result: Array<CodelessUiConnectorConfigPropertiesSampleQueriesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesSampleQueriesItemDeserializer(item);
  });
}

/** model interface CodelessUiConnectorConfigPropertiesSampleQueriesItem */
export interface CodelessUiConnectorConfigPropertiesSampleQueriesItem extends SampleQueries {}

export function codelessUiConnectorConfigPropertiesSampleQueriesItemSerializer(
  item: CodelessUiConnectorConfigPropertiesSampleQueriesItem,
): any {
  return { description: item["description"], query: item["query"] };
}

export function codelessUiConnectorConfigPropertiesSampleQueriesItemDeserializer(
  item: any,
): CodelessUiConnectorConfigPropertiesSampleQueriesItem {
  return {
    description: item["description"],
    query: item["query"],
  };
}

export function codelessUiConnectorConfigPropertiesDataTypesItemArraySerializer(
  result: Array<CodelessUiConnectorConfigPropertiesDataTypesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesDataTypesItemSerializer(item);
  });
}

export function codelessUiConnectorConfigPropertiesDataTypesItemArrayDeserializer(
  result: Array<CodelessUiConnectorConfigPropertiesDataTypesItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesDataTypesItemDeserializer(item);
  });
}

/** model interface CodelessUiConnectorConfigPropertiesDataTypesItem */
export interface CodelessUiConnectorConfigPropertiesDataTypesItem extends LastDataReceivedDataType {}

export function codelessUiConnectorConfigPropertiesDataTypesItemSerializer(
  item: CodelessUiConnectorConfigPropertiesDataTypesItem,
): any {
  return { name: item["name"], lastDataReceivedQuery: item["lastDataReceivedQuery"] };
}

export function codelessUiConnectorConfigPropertiesDataTypesItemDeserializer(
  item: any,
): CodelessUiConnectorConfigPropertiesDataTypesItem {
  return {
    name: item["name"],
    lastDataReceivedQuery: item["lastDataReceivedQuery"],
  };
}

export function codelessUiConnectorConfigPropertiesConnectivityCriteriaItemArraySerializer(
  result: Array<CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesConnectivityCriteriaItemSerializer(item);
  });
}

export function codelessUiConnectorConfigPropertiesConnectivityCriteriaItemArrayDeserializer(
  result: Array<CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesConnectivityCriteriaItemDeserializer(item);
  });
}

/** model interface CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem */
export interface CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem extends ConnectivityCriteria {}

export function codelessUiConnectorConfigPropertiesConnectivityCriteriaItemSerializer(
  item: CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem,
): any {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function codelessUiConnectorConfigPropertiesConnectivityCriteriaItemDeserializer(
  item: any,
): CodelessUiConnectorConfigPropertiesConnectivityCriteriaItem {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** Connector Availability Status */
export interface Availability {
  /** The connector Availability Status */
  status?: 1;
  /** Set connector as preview */
  isPreview?: boolean;
}

export function availabilitySerializer(item: Availability): any {
  return { status: item["status"], isPreview: item["isPreview"] };
}

export function availabilityDeserializer(item: any): Availability {
  return {
    status: item["status"],
    isPreview: item["isPreview"],
  };
}

/** Permissions required for the connector */
export interface Permissions {
  /** Resource provider permissions required for the connector */
  resourceProvider?: PermissionsResourceProviderItem[];
  /** Customs permissions required for the connector */
  customs?: PermissionsCustomsItem[];
}

export function permissionsSerializer(item: Permissions): any {
  return {
    resourceProvider: !item["resourceProvider"]
      ? item["resourceProvider"]
      : permissionsResourceProviderItemArraySerializer(item["resourceProvider"]),
    customs: !item["customs"]
      ? item["customs"]
      : permissionsCustomsItemArraySerializer(item["customs"]),
  };
}

export function permissionsDeserializer(item: any): Permissions {
  return {
    resourceProvider: !item["resourceProvider"]
      ? item["resourceProvider"]
      : permissionsResourceProviderItemArrayDeserializer(item["resourceProvider"]),
    customs: !item["customs"]
      ? item["customs"]
      : permissionsCustomsItemArrayDeserializer(item["customs"]),
  };
}

export function permissionsResourceProviderItemArraySerializer(
  result: Array<PermissionsResourceProviderItem>,
): any[] {
  return result.map((item) => {
    return permissionsResourceProviderItemSerializer(item);
  });
}

export function permissionsResourceProviderItemArrayDeserializer(
  result: Array<PermissionsResourceProviderItem>,
): any[] {
  return result.map((item) => {
    return permissionsResourceProviderItemDeserializer(item);
  });
}

/** model interface PermissionsResourceProviderItem */
export interface PermissionsResourceProviderItem extends ResourceProvider {}

export function permissionsResourceProviderItemSerializer(
  item: PermissionsResourceProviderItem,
): any {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: !item["requiredPermissions"]
      ? item["requiredPermissions"]
      : requiredPermissionsSerializer(item["requiredPermissions"]),
  };
}

export function permissionsResourceProviderItemDeserializer(
  item: any,
): PermissionsResourceProviderItem {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: !item["requiredPermissions"]
      ? item["requiredPermissions"]
      : requiredPermissionsDeserializer(item["requiredPermissions"]),
  };
}

export function permissionsCustomsItemArraySerializer(
  result: Array<PermissionsCustomsItem>,
): any[] {
  return result.map((item) => {
    return permissionsCustomsItemSerializer(item);
  });
}

export function permissionsCustomsItemArrayDeserializer(
  result: Array<PermissionsCustomsItem>,
): any[] {
  return result.map((item) => {
    return permissionsCustomsItemDeserializer(item);
  });
}

/** model interface PermissionsCustomsItem */
export interface PermissionsCustomsItem extends Customs {}

export function permissionsCustomsItemSerializer(item: PermissionsCustomsItem): any {
  return { name: item["name"], description: item["description"] };
}

export function permissionsCustomsItemDeserializer(item: any): PermissionsCustomsItem {
  return {
    name: item["name"],
    description: item["description"],
  };
}

export function codelessUiConnectorConfigPropertiesInstructionStepsItemArraySerializer(
  result: Array<CodelessUiConnectorConfigPropertiesInstructionStepsItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesInstructionStepsItemSerializer(item);
  });
}

export function codelessUiConnectorConfigPropertiesInstructionStepsItemArrayDeserializer(
  result: Array<CodelessUiConnectorConfigPropertiesInstructionStepsItem>,
): any[] {
  return result.map((item) => {
    return codelessUiConnectorConfigPropertiesInstructionStepsItemDeserializer(item);
  });
}

/** model interface CodelessUiConnectorConfigPropertiesInstructionStepsItem */
export interface CodelessUiConnectorConfigPropertiesInstructionStepsItem extends InstructionSteps {}

export function codelessUiConnectorConfigPropertiesInstructionStepsItemSerializer(
  item: CodelessUiConnectorConfigPropertiesInstructionStepsItem,
): any {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepsInstructionsItemArraySerializer(item["instructions"]),
  };
}

export function codelessUiConnectorConfigPropertiesInstructionStepsItemDeserializer(
  item: any,
): CodelessUiConnectorConfigPropertiesInstructionStepsItem {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepsInstructionsItemArrayDeserializer(item["instructions"]),
  };
}

/** Represents Codeless API Polling data connector. */
export interface CodelessApiPollingDataConnector extends DataConnector {
  /** The data connector kind */
  kind: "APIPolling";
  /** Config to describe the instructions blade */
  connectorUiConfig?: CodelessUiConnectorConfigProperties;
  /** Config to describe the polling instructions */
  pollingConfig?: CodelessConnectorPollingConfigProperties;
}

export function codelessApiPollingDataConnectorSerializer(
  item: CodelessApiPollingDataConnector,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["connectorUiConfig", "pollingConfig"])
      ? undefined
      : _codelessApiPollingDataConnectorPropertiesSerializer(item),
  };
}

export function codelessApiPollingDataConnectorDeserializer(
  item: any,
): CodelessApiPollingDataConnector {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _codelessApiPollingDataConnectorPropertiesDeserializer(item["properties"])),
  };
}

/** Represents Codeless API Polling data connector */
export interface ApiPollingParameters {
  /** Config to describe the instructions blade */
  connectorUiConfig?: CodelessUiConnectorConfigProperties;
  /** Config to describe the polling instructions */
  pollingConfig?: CodelessConnectorPollingConfigProperties;
}

export function apiPollingParametersSerializer(item: ApiPollingParameters): any {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesSerializer(item["connectorUiConfig"]),
    pollingConfig: !item["pollingConfig"]
      ? item["pollingConfig"]
      : codelessConnectorPollingConfigPropertiesSerializer(item["pollingConfig"]),
  };
}

export function apiPollingParametersDeserializer(item: any): ApiPollingParameters {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesDeserializer(item["connectorUiConfig"]),
    pollingConfig: !item["pollingConfig"]
      ? item["pollingConfig"]
      : codelessConnectorPollingConfigPropertiesDeserializer(item["pollingConfig"]),
  };
}

/** Config to describe the polling config for API poller connector */
export interface CodelessConnectorPollingConfigProperties {
  /** The poller active status */
  isActive?: boolean;
  /** Describe the authentication type of the poller */
  auth: CodelessConnectorPollingAuthProperties;
  /** Describe the poll request config parameters of the poller */
  request: CodelessConnectorPollingRequestProperties;
  /** Describe the poll request paging config of the poller */
  paging?: CodelessConnectorPollingPagingProperties;
  /** Describe the response config parameters of the poller */
  response?: CodelessConnectorPollingResponseProperties;
}

export function codelessConnectorPollingConfigPropertiesSerializer(
  item: CodelessConnectorPollingConfigProperties,
): any {
  return {
    isActive: item["isActive"],
    auth: codelessConnectorPollingAuthPropertiesSerializer(item["auth"]),
    request: codelessConnectorPollingRequestPropertiesSerializer(item["request"]),
    paging: !item["paging"]
      ? item["paging"]
      : codelessConnectorPollingPagingPropertiesSerializer(item["paging"]),
    response: !item["response"]
      ? item["response"]
      : codelessConnectorPollingResponsePropertiesSerializer(item["response"]),
  };
}

export function codelessConnectorPollingConfigPropertiesDeserializer(
  item: any,
): CodelessConnectorPollingConfigProperties {
  return {
    isActive: item["isActive"],
    auth: codelessConnectorPollingAuthPropertiesDeserializer(item["auth"]),
    request: codelessConnectorPollingRequestPropertiesDeserializer(item["request"]),
    paging: !item["paging"]
      ? item["paging"]
      : codelessConnectorPollingPagingPropertiesDeserializer(item["paging"]),
    response: !item["response"]
      ? item["response"]
      : codelessConnectorPollingResponsePropertiesDeserializer(item["response"]),
  };
}

/** Describe the authentication properties needed to successfully authenticate with the server */
export interface CodelessConnectorPollingAuthProperties {
  /** The authentication type */
  authType: string;
  /** The header name which the token is sent with */
  apiKeyName?: string;
  /** A prefix send in the header before the actual token */
  apiKeyIdentifier?: string;
  /** Marks if the key should sent in header */
  isApiKeyInPostPayload?: string;
  /** Describes the flow name, for example 'AuthCode' for Oauth 2.0 */
  flowName?: string;
  /** The endpoint used to issue a token, used in Oauth 2.0 flow */
  tokenEndpoint?: string;
  /** The endpoint used to authorize the user, used in Oauth 2.0 flow */
  authorizationEndpoint?: string;
  /** The query parameters used in authorization request, used in Oauth 2.0 flow */
  authorizationEndpointQueryParameters?: any;
  /** The redirect endpoint where we will get the authorization code, used in Oauth 2.0 flow */
  redirectionEndpoint?: string;
  /** The query headers used in token request, used in Oauth 2.0 flow */
  tokenEndpointHeaders?: any;
  /** The query parameters used in token request, used in Oauth 2.0 flow */
  tokenEndpointQueryParameters?: any;
  /** Marks if we should send the client secret in header or payload, used in Oauth 2.0 flow */
  isClientSecretInHeader?: boolean;
  /** The OAuth token scope */
  scope?: string;
}

export function codelessConnectorPollingAuthPropertiesSerializer(
  item: CodelessConnectorPollingAuthProperties,
): any {
  return {
    authType: item["authType"],
    apiKeyName: item["apiKeyName"],
    apiKeyIdentifier: item["apiKeyIdentifier"],
    isApiKeyInPostPayload: item["isApiKeyInPostPayload"],
    flowName: item["flowName"],
    tokenEndpoint: item["tokenEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    authorizationEndpointQueryParameters: item["authorizationEndpointQueryParameters"],
    redirectionEndpoint: item["redirectionEndpoint"],
    tokenEndpointHeaders: item["tokenEndpointHeaders"],
    tokenEndpointQueryParameters: item["tokenEndpointQueryParameters"],
    isClientSecretInHeader: item["isClientSecretInHeader"],
    scope: item["scope"],
  };
}

export function codelessConnectorPollingAuthPropertiesDeserializer(
  item: any,
): CodelessConnectorPollingAuthProperties {
  return {
    authType: item["authType"],
    apiKeyName: item["apiKeyName"],
    apiKeyIdentifier: item["apiKeyIdentifier"],
    isApiKeyInPostPayload: item["isApiKeyInPostPayload"],
    flowName: item["flowName"],
    tokenEndpoint: item["tokenEndpoint"],
    authorizationEndpoint: item["authorizationEndpoint"],
    authorizationEndpointQueryParameters: item["authorizationEndpointQueryParameters"],
    redirectionEndpoint: item["redirectionEndpoint"],
    tokenEndpointHeaders: item["tokenEndpointHeaders"],
    tokenEndpointQueryParameters: item["tokenEndpointQueryParameters"],
    isClientSecretInHeader: item["isClientSecretInHeader"],
    scope: item["scope"],
  };
}

/** Describe the request properties needed to successfully pull from the server */
export interface CodelessConnectorPollingRequestProperties {
  /** Describe the endpoint we should pull the data from */
  apiEndpoint: string;
  /** Defines the rate limit QPS */
  rateLimitQps?: number;
  /** The window interval we will use the pull the data */
  queryWindowInMin: number;
  /** The http method type we will use in the poll request, GET or POST */
  httpMethod: string;
  /** The time format will be used the query events in a specific window */
  queryTimeFormat: string;
  /** Describe the amount of time we should try and poll the data in case of failure */
  retryCount?: number;
  /** The number of seconds we will consider as a request timeout */
  timeoutInSeconds?: number;
  /** Describe the headers sent in the poll request */
  headers?: any;
  /** Describe the query parameters sent in the poll request */
  queryParameters?: any;
  /** For advanced scenarios for example user name/password embedded in nested JSON payload */
  queryParametersTemplate?: string;
  /** This will be used the query events from a start of the time window */
  startTimeAttributeName?: string;
  /** This will be used the query events from the end of the time window */
  endTimeAttributeName?: string;
}

export function codelessConnectorPollingRequestPropertiesSerializer(
  item: CodelessConnectorPollingRequestProperties,
): any {
  return {
    apiEndpoint: item["apiEndpoint"],
    rateLimitQps: item["rateLimitQps"],
    queryWindowInMin: item["queryWindowInMin"],
    httpMethod: item["httpMethod"],
    queryTimeFormat: item["queryTimeFormat"],
    retryCount: item["retryCount"],
    timeoutInSeconds: item["timeoutInSeconds"],
    headers: item["headers"],
    queryParameters: item["queryParameters"],
    queryParametersTemplate: item["queryParametersTemplate"],
    startTimeAttributeName: item["startTimeAttributeName"],
    endTimeAttributeName: item["endTimeAttributeName"],
  };
}

export function codelessConnectorPollingRequestPropertiesDeserializer(
  item: any,
): CodelessConnectorPollingRequestProperties {
  return {
    apiEndpoint: item["apiEndpoint"],
    rateLimitQps: item["rateLimitQps"],
    queryWindowInMin: item["queryWindowInMin"],
    httpMethod: item["httpMethod"],
    queryTimeFormat: item["queryTimeFormat"],
    retryCount: item["retryCount"],
    timeoutInSeconds: item["timeoutInSeconds"],
    headers: item["headers"],
    queryParameters: item["queryParameters"],
    queryParametersTemplate: item["queryParametersTemplate"],
    startTimeAttributeName: item["startTimeAttributeName"],
    endTimeAttributeName: item["endTimeAttributeName"],
  };
}

/** Describe the properties needed to make a pagination call */
export interface CodelessConnectorPollingPagingProperties {
  /** Describes the type. could be 'None', 'PageToken', 'PageCount', 'TimeStamp' */
  pagingType: string;
  /** Defines the name of a next page attribute */
  nextPageParaName?: string;
  /** Defines the path to a next page token JSON */
  nextPageTokenJsonPath?: string;
  /** Defines the path to a page count attribute */
  pageCountAttributePath?: string;
  /** Defines the path to a page total count attribute */
  pageTotalCountAttributePath?: string;
  /** Defines the path to a paging time stamp attribute */
  pageTimeStampAttributePath?: string;
  /** Determines whether to search for the latest time stamp in the events list */
  searchTheLatestTimeStampFromEventsList?: string;
  /** Defines the name of the page size parameter */
  pageSizeParaName?: string;
  /** Defines the paging size */
  pageSize?: number;
}

export function codelessConnectorPollingPagingPropertiesSerializer(
  item: CodelessConnectorPollingPagingProperties,
): any {
  return {
    pagingType: item["pagingType"],
    nextPageParaName: item["nextPageParaName"],
    nextPageTokenJsonPath: item["nextPageTokenJsonPath"],
    pageCountAttributePath: item["pageCountAttributePath"],
    pageTotalCountAttributePath: item["pageTotalCountAttributePath"],
    pageTimeStampAttributePath: item["pageTimeStampAttributePath"],
    searchTheLatestTimeStampFromEventsList: item["searchTheLatestTimeStampFromEventsList"],
    pageSizeParaName: item["pageSizeParaName"],
    pageSize: item["pageSize"],
  };
}

export function codelessConnectorPollingPagingPropertiesDeserializer(
  item: any,
): CodelessConnectorPollingPagingProperties {
  return {
    pagingType: item["pagingType"],
    nextPageParaName: item["nextPageParaName"],
    nextPageTokenJsonPath: item["nextPageTokenJsonPath"],
    pageCountAttributePath: item["pageCountAttributePath"],
    pageTotalCountAttributePath: item["pageTotalCountAttributePath"],
    pageTimeStampAttributePath: item["pageTimeStampAttributePath"],
    searchTheLatestTimeStampFromEventsList: item["searchTheLatestTimeStampFromEventsList"],
    pageSizeParaName: item["pageSizeParaName"],
    pageSize: item["pageSize"],
  };
}

/** Describes the response from the external server */
export interface CodelessConnectorPollingResponseProperties {
  /** Describes the path we should extract the data in the response */
  eventsJsonPaths: string[];
  /** Describes the path we should extract the status code in the response */
  successStatusJsonPath?: string;
  /** Describes the path we should extract the status value in the response */
  successStatusValue?: string;
  /** Describes if the data in the response is Gzip */
  isGzipCompressed?: boolean;
}

export function codelessConnectorPollingResponsePropertiesSerializer(
  item: CodelessConnectorPollingResponseProperties,
): any {
  return {
    eventsJsonPaths: item["eventsJsonPaths"].map((p: any) => {
      return p;
    }),
    successStatusJsonPath: item["successStatusJsonPath"],
    successStatusValue: item["successStatusValue"],
    isGzipCompressed: item["isGzipCompressed"],
  };
}

export function codelessConnectorPollingResponsePropertiesDeserializer(
  item: any,
): CodelessConnectorPollingResponseProperties {
  return {
    eventsJsonPaths: item["eventsJsonPaths"].map((p: any) => {
      return p;
    }),
    successStatusJsonPath: item["successStatusJsonPath"],
    successStatusValue: item["successStatusValue"],
    isGzipCompressed: item["isGzipCompressed"],
  };
}

/** Properties data connector on tenant level. */
export interface DataConnectorTenantId {
  /** The tenant id to connect to, and get the data from. */
  tenantId: string;
}

export function dataConnectorTenantIdSerializer(item: DataConnectorTenantId): any {
  return { tenantId: item["tenantId"] };
}

export function dataConnectorTenantIdDeserializer(item: any): DataConnectorTenantId {
  return {
    tenantId: item["tenantId"],
  };
}

/** Data connector properties. */
export interface DataConnectorWithAlertsProperties {
  /** The available data types for the connector. */
  dataTypes?: AlertsDataTypeOfDataConnector;
}

export function dataConnectorWithAlertsPropertiesSerializer(
  item: DataConnectorWithAlertsProperties,
): any {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function dataConnectorWithAlertsPropertiesDeserializer(
  item: any,
): DataConnectorWithAlertsProperties {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

/** The graph query to show the current data status */
export interface GraphQueries {
  /** the metric that the query is checking */
  metricName?: string;
  /** The legend for the graph */
  legend?: string;
  /** The base query for the graph */
  baseQuery?: string;
}

export function graphQueriesSerializer(item: GraphQueries): any {
  return { metricName: item["metricName"], legend: item["legend"], baseQuery: item["baseQuery"] };
}

export function graphQueriesDeserializer(item: any): GraphQueries {
  return {
    metricName: item["metricName"],
    legend: item["legend"],
    baseQuery: item["baseQuery"],
  };
}

/** The sample queries for the connector */
export interface SampleQueries {
  /** The sample query description */
  description?: string;
  /** the sample query */
  query?: string;
}

export function sampleQueriesSerializer(item: SampleQueries): any {
  return { description: item["description"], query: item["query"] };
}

export function sampleQueriesDeserializer(item: any): SampleQueries {
  return {
    description: item["description"],
    query: item["query"],
  };
}

/** Data type for last data received */
export interface LastDataReceivedDataType {
  /** Name of the data type to show in the graph. can be use with {{graphQueriesTableName}} placeholder */
  name?: string;
  /** Query for indicate last data received */
  lastDataReceivedQuery?: string;
}

export function lastDataReceivedDataTypeSerializer(item: LastDataReceivedDataType): any {
  return { name: item["name"], lastDataReceivedQuery: item["lastDataReceivedQuery"] };
}

export function lastDataReceivedDataTypeDeserializer(item: any): LastDataReceivedDataType {
  return {
    name: item["name"],
    lastDataReceivedQuery: item["lastDataReceivedQuery"],
  };
}

/** Setting for the connector check connectivity */
export interface ConnectivityCriteria {
  /** type of connectivity */
  type?: ConnectivityType;
  /** Queries for checking connectivity */
  value?: string[];
}

export function connectivityCriteriaSerializer(item: ConnectivityCriteria): any {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function connectivityCriteriaDeserializer(item: any): ConnectivityCriteria {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** type of connectivity */
export enum KnownConnectivityType {
  /** IsConnectedQuery */
  IsConnectedQuery = "IsConnectedQuery",
}

/**
 * type of connectivity \
 * {@link KnownConnectivityType} can be used interchangeably with ConnectivityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IsConnectedQuery**: IsConnectedQuery
 */
export type ConnectivityType = string;

/** Resource provider permissions required for the connector */
export interface ResourceProvider {
  /** Provider name */
  provider?: ProviderName;
  /** Permission description text */
  permissionsDisplayText?: string;
  /** Permission provider display name */
  providerDisplayName?: string;
  /** Permission provider scope */
  scope?: PermissionProviderScope;
  /** Required permissions for the connector */
  requiredPermissions?: RequiredPermissions;
}

export function resourceProviderSerializer(item: ResourceProvider): any {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: !item["requiredPermissions"]
      ? item["requiredPermissions"]
      : requiredPermissionsSerializer(item["requiredPermissions"]),
  };
}

export function resourceProviderDeserializer(item: any): ResourceProvider {
  return {
    provider: item["provider"],
    permissionsDisplayText: item["permissionsDisplayText"],
    providerDisplayName: item["providerDisplayName"],
    scope: item["scope"],
    requiredPermissions: !item["requiredPermissions"]
      ? item["requiredPermissions"]
      : requiredPermissionsDeserializer(item["requiredPermissions"]),
  };
}

/** Provider name */
export enum KnownProviderName {
  /** Microsoft.OperationalInsights/solutions */
  MicrosoftOperationalInsightsSolutions = "Microsoft.OperationalInsights/solutions",
  /** Microsoft.OperationalInsights/workspaces */
  MicrosoftOperationalInsightsWorkspaces = "Microsoft.OperationalInsights/workspaces",
  /** Microsoft.OperationalInsights/workspaces/datasources */
  MicrosoftOperationalInsightsWorkspacesDatasources = "Microsoft.OperationalInsights/workspaces/datasources",
  /** microsoft.aadiam/diagnosticSettings */
  MicrosoftAadiamDiagnosticSettings = "microsoft.aadiam/diagnosticSettings",
  /** Microsoft.OperationalInsights/workspaces/sharedKeys */
  MicrosoftOperationalInsightsWorkspacesSharedKeys = "Microsoft.OperationalInsights/workspaces/sharedKeys",
  /** Microsoft.Authorization/policyAssignments */
  MicrosoftAuthorizationPolicyAssignments = "Microsoft.Authorization/policyAssignments",
}

/**
 * Provider name \
 * {@link KnownProviderName} can be used interchangeably with ProviderName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.OperationalInsights\/solutions**: Microsoft.OperationalInsights\/solutions \
 * **Microsoft.OperationalInsights\/workspaces**: Microsoft.OperationalInsights\/workspaces \
 * **Microsoft.OperationalInsights\/workspaces\/datasources**: Microsoft.OperationalInsights\/workspaces\/datasources \
 * **microsoft.aadiam\/diagnosticSettings**: microsoft.aadiam\/diagnosticSettings \
 * **Microsoft.OperationalInsights\/workspaces\/sharedKeys**: Microsoft.OperationalInsights\/workspaces\/sharedKeys \
 * **Microsoft.Authorization\/policyAssignments**: Microsoft.Authorization\/policyAssignments
 */
export type ProviderName = string;

/** Permission provider scope */
export enum KnownPermissionProviderScope {
  /** ResourceGroup */
  ResourceGroup = "ResourceGroup",
  /** Subscription */
  Subscription = "Subscription",
  /** Workspace */
  Workspace = "Workspace",
}

/**
 * Permission provider scope \
 * {@link KnownPermissionProviderScope} can be used interchangeably with PermissionProviderScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ResourceGroup**: ResourceGroup \
 * **Subscription**: Subscription \
 * **Workspace**: Workspace
 */
export type PermissionProviderScope = string;

/** Required permissions for the connector */
export interface RequiredPermissions {
  /** action permission */
  action?: boolean;
  /** write permission */
  write?: boolean;
  /** read permission */
  read?: boolean;
  /** delete permission */
  delete?: boolean;
}

export function requiredPermissionsSerializer(item: RequiredPermissions): any {
  return {
    action: item["action"],
    write: item["write"],
    read: item["read"],
    delete: item["delete"],
  };
}

export function requiredPermissionsDeserializer(item: any): RequiredPermissions {
  return {
    action: item["action"],
    write: item["write"],
    read: item["read"],
    delete: item["delete"],
  };
}

/** Customs permissions required for the connector */
export interface Customs extends CustomsPermission {}

export function customsSerializer(item: Customs): any {
  return { name: item["name"], description: item["description"] };
}

export function customsDeserializer(item: any): Customs {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** Customs permissions required for the connector */
export interface CustomsPermission {
  /** Customs permissions name */
  name?: string;
  /** Customs permissions description */
  description?: string;
}

export function customsPermissionSerializer(item: CustomsPermission): any {
  return { name: item["name"], description: item["description"] };
}

export function customsPermissionDeserializer(item: any): CustomsPermission {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** Instruction steps to enable the connector */
export interface InstructionSteps {
  /** Instruction step title */
  title?: string;
  /** Instruction step description */
  description?: string;
  /** Instruction step details */
  instructions?: InstructionStepsInstructionsItem[];
}

export function instructionStepsSerializer(item: InstructionSteps): any {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepsInstructionsItemArraySerializer(item["instructions"]),
  };
}

export function instructionStepsDeserializer(item: any): InstructionSteps {
  return {
    title: item["title"],
    description: item["description"],
    instructions: !item["instructions"]
      ? item["instructions"]
      : instructionStepsInstructionsItemArrayDeserializer(item["instructions"]),
  };
}

export function instructionStepsInstructionsItemArraySerializer(
  result: Array<InstructionStepsInstructionsItem>,
): any[] {
  return result.map((item) => {
    return instructionStepsInstructionsItemSerializer(item);
  });
}

export function instructionStepsInstructionsItemArrayDeserializer(
  result: Array<InstructionStepsInstructionsItem>,
): any[] {
  return result.map((item) => {
    return instructionStepsInstructionsItemDeserializer(item);
  });
}

/** model interface InstructionStepsInstructionsItem */
export interface InstructionStepsInstructionsItem extends ConnectorInstructionModelBase {}

export function instructionStepsInstructionsItemSerializer(
  item: InstructionStepsInstructionsItem,
): any {
  return { parameters: item["parameters"], type: item["type"] };
}

export function instructionStepsInstructionsItemDeserializer(
  item: any,
): InstructionStepsInstructionsItem {
  return {
    parameters: item["parameters"],
    type: item["type"],
  };
}

/** Instruction step details */
export interface ConnectorInstructionModelBase {
  /** The parameters for the setting */
  parameters?: any;
  /** The kind of the setting */
  type: SettingType;
}

export function connectorInstructionModelBaseSerializer(item: ConnectorInstructionModelBase): any {
  return { parameters: item["parameters"], type: item["type"] };
}

export function connectorInstructionModelBaseDeserializer(
  item: any,
): ConnectorInstructionModelBase {
  return {
    parameters: item["parameters"],
    type: item["type"],
  };
}

/** The kind of the setting */
export enum KnownSettingType {
  /** CopyableLabel */
  CopyableLabel = "CopyableLabel",
  /** InstructionStepsGroup */
  InstructionStepsGroup = "InstructionStepsGroup",
  /** InfoMessage */
  InfoMessage = "InfoMessage",
}

/**
 * The kind of the setting \
 * {@link KnownSettingType} can be used interchangeably with SettingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CopyableLabel**: CopyableLabel \
 * **InstructionStepsGroup**: InstructionStepsGroup \
 * **InfoMessage**: InfoMessage
 */
export type SettingType = string;

/** List all the data connectors. */
export interface _DataConnectorList {
  /** The DataConnector items on this page */
  value: DataConnectorUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataConnectorListDeserializer(item: any): _DataConnectorList {
  return {
    value: dataConnectorUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataConnectorUnionArraySerializer(result: Array<DataConnectorUnion>): any[] {
  return result.map((item) => {
    return dataConnectorUnionSerializer(item);
  });
}

export function dataConnectorUnionArrayDeserializer(result: Array<DataConnectorUnion>): any[] {
  return result.map((item) => {
    return dataConnectorUnionDeserializer(item);
  });
}

/** Represents Codeless API Polling data connector. */
export interface DataConnectorConnectBody {
  /** The authentication kind used to poll the data */
  kind?: ConnectAuthKind;
  /** The API key of the audit server. */
  apiKey?: string;
  /** Used in v2 logs connector. Represents the data collection ingestion endpoint in log analytics. */
  dataCollectionEndpoint?: string;
  /** Used in v2 logs connector. The data collection rule immutable id, the rule defines the transformation and data destination. */
  dataCollectionRuleImmutableId?: string;
  /** Used in v2 logs connector. The stream we are sending the data to, this is the name of the streamDeclarations defined in the DCR. */
  outputStream?: string;
  /** The client secret of the OAuth 2.0 application. */
  clientSecret?: string;
  /** The client id of the OAuth 2.0 application. */
  clientId?: string;
  /** The authorization code used in OAuth 2.0 code flow to issue a token. */
  authorizationCode?: string;
  /** The user name in the audit log server. */
  userName?: string;
  /** The user password in the audit log server. */
  password?: string;
  requestConfigUserInputValues?: any[];
}

export function dataConnectorConnectBodySerializer(item: DataConnectorConnectBody): any {
  return {
    kind: item["kind"],
    apiKey: item["apiKey"],
    dataCollectionEndpoint: item["dataCollectionEndpoint"],
    dataCollectionRuleImmutableId: item["dataCollectionRuleImmutableId"],
    outputStream: item["outputStream"],
    clientSecret: item["clientSecret"],
    clientId: item["clientId"],
    authorizationCode: item["authorizationCode"],
    userName: item["userName"],
    password: item["password"],
    requestConfigUserInputValues: !item["requestConfigUserInputValues"]
      ? item["requestConfigUserInputValues"]
      : item["requestConfigUserInputValues"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication kind used to poll the data */
export enum KnownConnectAuthKind {
  /** Basic */
  Basic = "Basic",
  /** OAuth2 */
  OAuth2 = "OAuth2",
  /** APIKey */
  APIKey = "APIKey",
}

/**
 * The authentication kind used to poll the data \
 * {@link KnownConnectAuthKind} can be used interchangeably with ConnectAuthKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **OAuth2**: OAuth2 \
 * **APIKey**: APIKey
 */
export type ConnectAuthKind = string;

/** Represents an incident comment */
export interface IncidentComment extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The comment message */
  message?: string;
  /** The time the comment was created */
  readonly createdTimeUtc?: Date;
  /** The time the comment was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** Describes the client that created the comment */
  readonly author?: ClientInfo;
}

export function incidentCommentSerializer(item: IncidentComment): any {
  return {
    properties: areAllPropsUndefined(item, ["message"])
      ? undefined
      : _incidentCommentPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function incidentCommentDeserializer(item: any): IncidentComment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _incidentCommentPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Incident comment property bag. */
export interface IncidentCommentProperties {
  /** The comment message */
  message: string;
  /** The time the comment was created */
  readonly createdTimeUtc?: Date;
  /** The time the comment was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** Describes the client that created the comment */
  readonly author?: ClientInfo;
}

export function incidentCommentPropertiesSerializer(item: IncidentCommentProperties): any {
  return { message: item["message"] };
}

export function incidentCommentPropertiesDeserializer(item: any): IncidentCommentProperties {
  return {
    message: item["message"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    author: !item["author"] ? item["author"] : clientInfoDeserializer(item["author"]),
  };
}

/** List of incident comments. */
export interface _IncidentCommentList {
  /** The IncidentComment items on this page */
  value: IncidentComment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _incidentCommentListDeserializer(item: any): _IncidentCommentList {
  return {
    value: incidentCommentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function incidentCommentArraySerializer(result: Array<IncidentComment>): any[] {
  return result.map((item) => {
    return incidentCommentSerializer(item);
  });
}

export function incidentCommentArrayDeserializer(result: Array<IncidentComment>): any[] {
  return result.map((item) => {
    return incidentCommentDeserializer(item);
  });
}

/** Represents a relation between two resources */
export interface Relation extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The resource ID of the related resource */
  relatedResourceId?: string;
  /** The name of the related resource */
  readonly relatedResourceName?: string;
  /** The resource type of the related resource */
  readonly relatedResourceType?: string;
  /** The resource kind of the related resource */
  readonly relatedResourceKind?: string;
}

export function relationSerializer(item: Relation): any {
  return {
    properties: areAllPropsUndefined(item, ["relatedResourceId"])
      ? undefined
      : _relationPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function relationDeserializer(item: any): Relation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _relationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Relation property bag. */
export interface RelationProperties {
  /** The resource ID of the related resource */
  relatedResourceId: string;
  /** The name of the related resource */
  readonly relatedResourceName?: string;
  /** The resource type of the related resource */
  readonly relatedResourceType?: string;
  /** The resource kind of the related resource */
  readonly relatedResourceKind?: string;
}

export function relationPropertiesSerializer(item: RelationProperties): any {
  return { relatedResourceId: item["relatedResourceId"] };
}

export function relationPropertiesDeserializer(item: any): RelationProperties {
  return {
    relatedResourceId: item["relatedResourceId"],
    relatedResourceName: item["relatedResourceName"],
    relatedResourceType: item["relatedResourceType"],
    relatedResourceKind: item["relatedResourceKind"],
  };
}

/** List of relations. */
export interface _RelationList {
  /** The Relation items on this page */
  value: Relation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _relationListDeserializer(item: any): _RelationList {
  return {
    value: relationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function relationArraySerializer(result: Array<Relation>): any[] {
  return result.map((item) => {
    return relationSerializer(item);
  });
}

export function relationArrayDeserializer(result: Array<Relation>): any[] {
  return result.map((item) => {
    return relationDeserializer(item);
  });
}

/** Describes incident task properties */
export interface IncidentTask extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The title of the task */
  title: string;
  /** The description of the task */
  description?: string;
  /** The status of the task */
  status: IncidentTaskStatus;
  /** The time the task was created */
  readonly createdTimeUtc?: Date;
  /** The last time the task was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** Information on the client (user or application) that made some action */
  createdBy?: ClientInfo;
  /** Information on the client (user or application) that made some action */
  lastModifiedBy?: ClientInfo;
}

export function incidentTaskSerializer(item: IncidentTask): any {
  return { properties: _incidentTaskPropertiesSerializer(item), etag: item["etag"] };
}

export function incidentTaskDeserializer(item: any): IncidentTask {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._incidentTaskPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Describes the properties of an incident task */
export interface IncidentTaskProperties {
  /** The title of the task */
  title: string;
  /** The description of the task */
  description?: string;
  /** The status of the task */
  status: IncidentTaskStatus;
  /** The time the task was created */
  readonly createdTimeUtc?: Date;
  /** The last time the task was updated */
  readonly lastModifiedTimeUtc?: Date;
  /** Information on the client (user or application) that made some action */
  createdBy?: ClientInfo;
  /** Information on the client (user or application) that made some action */
  lastModifiedBy?: ClientInfo;
}

export function incidentTaskPropertiesSerializer(item: IncidentTaskProperties): any {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoSerializer(item["createdBy"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoSerializer(item["lastModifiedBy"]),
  };
}

export function incidentTaskPropertiesDeserializer(item: any): IncidentTaskProperties {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoDeserializer(item["createdBy"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoDeserializer(item["lastModifiedBy"]),
  };
}

/** The status of the task */
export enum KnownIncidentTaskStatus {
  /** A new task */
  New = "New",
  /** A completed task */
  Completed = "Completed",
}

/**
 * The status of the task \
 * {@link KnownIncidentTaskStatus} can be used interchangeably with IncidentTaskStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: A new task \
 * **Completed**: A completed task
 */
export type IncidentTaskStatus = string;

/** List of incident tasks */
export interface _IncidentTaskList {
  /** The IncidentTask items on this page */
  value: IncidentTask[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _incidentTaskListDeserializer(item: any): _IncidentTaskList {
  return {
    value: incidentTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function incidentTaskArraySerializer(result: Array<IncidentTask>): any[] {
  return result.map((item) => {
    return incidentTaskSerializer(item);
  });
}

export function incidentTaskArrayDeserializer(result: Array<IncidentTask>): any[] {
  return result.map((item) => {
    return incidentTaskDeserializer(item);
  });
}

/** Sentinel onboarding state */
export interface SentinelOnboardingState extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** Flag that indicates the status of the CMK setting */
  customerManagedKey?: boolean;
}

export function sentinelOnboardingStateSerializer(item: SentinelOnboardingState): any {
  return {
    properties: areAllPropsUndefined(item, ["customerManagedKey"])
      ? undefined
      : _sentinelOnboardingStatePropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function sentinelOnboardingStateDeserializer(item: any): SentinelOnboardingState {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sentinelOnboardingStatePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The Sentinel onboarding state properties */
export interface SentinelOnboardingStateProperties {
  /** Flag that indicates the status of the CMK setting */
  customerManagedKey?: boolean;
}

export function sentinelOnboardingStatePropertiesSerializer(
  item: SentinelOnboardingStateProperties,
): any {
  return { customerManagedKey: item["customerManagedKey"] };
}

export function sentinelOnboardingStatePropertiesDeserializer(
  item: any,
): SentinelOnboardingStateProperties {
  return {
    customerManagedKey: item["customerManagedKey"],
  };
}

/** List of the Sentinel onboarding states */
export interface SentinelOnboardingStatesList {
  /** Array of Sentinel onboarding states */
  value: SentinelOnboardingState[];
}

export function sentinelOnboardingStatesListDeserializer(item: any): SentinelOnboardingStatesList {
  return {
    value: sentinelOnboardingStateArrayDeserializer(item["value"]),
  };
}

export function sentinelOnboardingStateArraySerializer(
  result: Array<SentinelOnboardingState>,
): any[] {
  return result.map((item) => {
    return sentinelOnboardingStateSerializer(item);
  });
}

export function sentinelOnboardingStateArrayDeserializer(
  result: Array<SentinelOnboardingState>,
): any[] {
  return result.map((item) => {
    return sentinelOnboardingStateDeserializer(item);
  });
}

/** Security ML Analytics Setting */
export interface SecurityMLAnalyticsSetting extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: Anomaly */
  kind: SecurityMLAnalyticsSettingsKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function securityMLAnalyticsSettingSerializer(item: SecurityMLAnalyticsSetting): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function securityMLAnalyticsSettingDeserializer(item: any): SecurityMLAnalyticsSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for SecurityMLAnalyticsSettingUnion */
export type SecurityMLAnalyticsSettingUnion =
  | AnomalySecurityMLAnalyticsSettings
  | SecurityMLAnalyticsSetting;

export function securityMLAnalyticsSettingUnionSerializer(
  item: SecurityMLAnalyticsSettingUnion,
): any {
  switch (item.kind) {
    case "Anomaly":
      return anomalySecurityMLAnalyticsSettingsSerializer(
        item as AnomalySecurityMLAnalyticsSettings,
      );

    default:
      return securityMLAnalyticsSettingSerializer(item);
  }
}

export function securityMLAnalyticsSettingUnionDeserializer(
  item: any,
): SecurityMLAnalyticsSettingUnion {
  switch (item["kind"]) {
    case "Anomaly":
      return anomalySecurityMLAnalyticsSettingsDeserializer(
        item as AnomalySecurityMLAnalyticsSettings,
      );

    default:
      return securityMLAnalyticsSettingDeserializer(item);
  }
}

/** The kind of security ML analytics settings */
export enum KnownSecurityMLAnalyticsSettingsKind {
  /** Anomaly */
  Anomaly = "Anomaly",
}

/**
 * The kind of security ML analytics settings \
 * {@link KnownSecurityMLAnalyticsSettingsKind} can be used interchangeably with SecurityMLAnalyticsSettingsKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Anomaly**: Anomaly
 */
export type SecurityMLAnalyticsSettingsKind = string;

/** Represents Anomaly Security ML Analytics Settings */
export interface AnomalySecurityMLAnalyticsSettings extends SecurityMLAnalyticsSetting {
  /** The kind of security ML Analytics Settings */
  kind: "Anomaly";
  /** The description of the SecurityMLAnalyticsSettings. */
  description?: string;
  /** The display name for settings created by this SecurityMLAnalyticsSettings. */
  displayName?: string;
  /** Determines whether this settings is enabled or disabled. */
  enabled?: boolean;
  /** The last time that this SecurityMLAnalyticsSettings has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The required data sources for this SecurityMLAnalyticsSettings */
  requiredDataConnectors?: SecurityMLAnalyticsSettingsDataSource[];
  /** The tactics of the SecurityMLAnalyticsSettings */
  tactics?: AttackTactic[];
  /** The techniques of the SecurityMLAnalyticsSettings */
  techniques?: string[];
  /** The anomaly version of the AnomalySecurityMLAnalyticsSettings. */
  anomalyVersion?: string;
  /** The customizable observations of the AnomalySecurityMLAnalyticsSettings. */
  customizableObservations?: any;
  /** The frequency that this SecurityMLAnalyticsSettings will be run. */
  frequency?: string;
  /** The anomaly SecurityMLAnalyticsSettings status */
  settingsStatus?: SettingsStatus;
  /** Determines whether this anomaly security ml analytics settings is a default settings */
  isDefaultSettings?: boolean;
  /** The anomaly settings version of the Anomaly security ml analytics settings that dictates whether job version gets updated or not. */
  anomalySettingsVersion?: number;
  /** The anomaly settings definition Id */
  settingsDefinitionId?: string;
}

export function anomalySecurityMLAnalyticsSettingsSerializer(
  item: AnomalySecurityMLAnalyticsSettings,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "description",
      "displayName",
      "enabled",
      "requiredDataConnectors",
      "tactics",
      "techniques",
      "anomalyVersion",
      "customizableObservations",
      "frequency",
      "settingsStatus",
      "isDefaultSettings",
      "anomalySettingsVersion",
      "settingsDefinitionId",
    ])
      ? undefined
      : _anomalySecurityMLAnalyticsSettingsPropertiesSerializer(item),
  };
}

export function anomalySecurityMLAnalyticsSettingsDeserializer(
  item: any,
): AnomalySecurityMLAnalyticsSettings {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _anomalySecurityMLAnalyticsSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** AnomalySecurityMLAnalytics settings base property bag. */
export interface AnomalySecurityMLAnalyticsSettingsProperties {
  /** The description of the SecurityMLAnalyticsSettings. */
  description?: string;
  /** The display name for settings created by this SecurityMLAnalyticsSettings. */
  displayName: string;
  /** Determines whether this settings is enabled or disabled. */
  enabled: boolean;
  /** The last time that this SecurityMLAnalyticsSettings has been modified. */
  readonly lastModifiedUtc?: Date;
  /** The required data sources for this SecurityMLAnalyticsSettings */
  requiredDataConnectors?: SecurityMLAnalyticsSettingsDataSource[];
  /** The tactics of the SecurityMLAnalyticsSettings */
  tactics?: AttackTactic[];
  /** The techniques of the SecurityMLAnalyticsSettings */
  techniques?: string[];
  /** The anomaly version of the AnomalySecurityMLAnalyticsSettings. */
  anomalyVersion: string;
  /** The customizable observations of the AnomalySecurityMLAnalyticsSettings. */
  customizableObservations?: any;
  /** The frequency that this SecurityMLAnalyticsSettings will be run. */
  frequency: string;
  /** The anomaly SecurityMLAnalyticsSettings status */
  settingsStatus: SettingsStatus;
  /** Determines whether this anomaly security ml analytics settings is a default settings */
  isDefaultSettings: boolean;
  /** The anomaly settings version of the Anomaly security ml analytics settings that dictates whether job version gets updated or not. */
  anomalySettingsVersion?: number;
  /** The anomaly settings definition Id */
  settingsDefinitionId?: string;
}

export function anomalySecurityMLAnalyticsSettingsPropertiesSerializer(
  item: AnomalySecurityMLAnalyticsSettingsProperties,
): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : securityMLAnalyticsSettingsDataSourceArraySerializer(item["requiredDataConnectors"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    anomalyVersion: item["anomalyVersion"],
    customizableObservations: item["customizableObservations"],
    frequency: item["frequency"],
    settingsStatus: item["settingsStatus"],
    isDefaultSettings: item["isDefaultSettings"],
    anomalySettingsVersion: item["anomalySettingsVersion"],
    settingsDefinitionId: item["settingsDefinitionId"],
  };
}

export function anomalySecurityMLAnalyticsSettingsPropertiesDeserializer(
  item: any,
): AnomalySecurityMLAnalyticsSettingsProperties {
  return {
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : securityMLAnalyticsSettingsDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    anomalyVersion: item["anomalyVersion"],
    customizableObservations: item["customizableObservations"],
    frequency: item["frequency"],
    settingsStatus: item["settingsStatus"],
    isDefaultSettings: item["isDefaultSettings"],
    anomalySettingsVersion: item["anomalySettingsVersion"],
    settingsDefinitionId: item["settingsDefinitionId"],
  };
}

export function securityMLAnalyticsSettingsDataSourceArraySerializer(
  result: Array<SecurityMLAnalyticsSettingsDataSource>,
): any[] {
  return result.map((item) => {
    return securityMLAnalyticsSettingsDataSourceSerializer(item);
  });
}

export function securityMLAnalyticsSettingsDataSourceArrayDeserializer(
  result: Array<SecurityMLAnalyticsSettingsDataSource>,
): any[] {
  return result.map((item) => {
    return securityMLAnalyticsSettingsDataSourceDeserializer(item);
  });
}

/** security ml analytics settings data sources */
export interface SecurityMLAnalyticsSettingsDataSource {
  /** The connector id that provides the following data types */
  connectorId?: string;
  /** The data types used by the security ml analytics settings */
  dataTypes?: string[];
}

export function securityMLAnalyticsSettingsDataSourceSerializer(
  item: SecurityMLAnalyticsSettingsDataSource,
): any {
  return {
    connectorId: item["connectorId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : item["dataTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function securityMLAnalyticsSettingsDataSourceDeserializer(
  item: any,
): SecurityMLAnalyticsSettingsDataSource {
  return {
    connectorId: item["connectorId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : item["dataTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The anomaly SecurityMLAnalyticsSettings status */
export enum KnownSettingsStatus {
  /** Anomaly settings status in Production mode */
  Production = "Production",
  /** Anomaly settings status in Flighting mode */
  Flighting = "Flighting",
}

/**
 * The anomaly SecurityMLAnalyticsSettings status \
 * {@link KnownSettingsStatus} can be used interchangeably with SettingsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Production**: Anomaly settings status in Production mode \
 * **Flighting**: Anomaly settings status in Flighting mode
 */
export type SettingsStatus = string;

/** List all the SecurityMLAnalyticsSettings */
export interface _SecurityMLAnalyticsSettingsList {
  /** The SecurityMLAnalyticsSetting items on this page */
  value: SecurityMLAnalyticsSettingUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityMLAnalyticsSettingsListDeserializer(
  item: any,
): _SecurityMLAnalyticsSettingsList {
  return {
    value: securityMLAnalyticsSettingUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityMLAnalyticsSettingUnionArraySerializer(
  result: Array<SecurityMLAnalyticsSettingUnion>,
): any[] {
  return result.map((item) => {
    return securityMLAnalyticsSettingUnionSerializer(item);
  });
}

export function securityMLAnalyticsSettingUnionArrayDeserializer(
  result: Array<SecurityMLAnalyticsSettingUnion>,
): any[] {
  return result.map((item) => {
    return securityMLAnalyticsSettingUnionDeserializer(item);
  });
}

/** Represents a SourceControl in Azure Security Insights. */
export interface SourceControl extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The id (a Guid) of the source control */
  readonly idPropertiesId?: string;
  /** The version number associated with the source control */
  readonly version?: Version;
  /** The display name of the source control */
  displayName: string;
  /** A description of the source control */
  description?: string;
  /** The repository type of the source control */
  repoType: RepoType;
  /** Array of source control content types. */
  contentTypes: ContentType[];
  /** Repository metadata. */
  repository: Repository;
  /** Service principal metadata. */
  servicePrincipal?: ServicePrincipal;
  /** Workload Identity metadata. */
  readonly workloadIdentityFederation?: WorkloadIdentityFederation;
  /** Repository access credentials. This is write-only object and it never returns back to a user. */
  repositoryAccess?: RepositoryAccess;
  /** Information regarding the resources created in user's repository. */
  repositoryResourceInfo?: RepositoryResourceInfo;
  /** Information regarding the latest deployment for the source control. */
  readonly lastDeploymentInfo?: DeploymentInfo;
  /** Information regarding the pull request of the source control. */
  readonly pullRequest?: PullRequest;
}

export function sourceControlSerializer(item: SourceControl): any {
  return { properties: _sourceControlPropertiesSerializer(item), etag: item["etag"] };
}

export function sourceControlDeserializer(item: any): SourceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._sourceControlPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Describes source control properties */
export interface SourceControlProperties {
  /** The id (a Guid) of the source control */
  readonly id?: string;
  /** The version number associated with the source control */
  readonly version?: Version;
  /** The display name of the source control */
  displayName: string;
  /** A description of the source control */
  description?: string;
  /** The repository type of the source control */
  repoType: RepoType;
  /** Array of source control content types. */
  contentTypes: ContentType[];
  /** Repository metadata. */
  repository: Repository;
  /** Service principal metadata. */
  servicePrincipal?: ServicePrincipal;
  /** Workload Identity metadata. */
  readonly workloadIdentityFederation?: WorkloadIdentityFederation;
  /** Repository access credentials. This is write-only object and it never returns back to a user. */
  repositoryAccess?: RepositoryAccess;
  /** Information regarding the resources created in user's repository. */
  repositoryResourceInfo?: RepositoryResourceInfo;
  /** Information regarding the latest deployment for the source control. */
  readonly lastDeploymentInfo?: DeploymentInfo;
  /** Information regarding the pull request of the source control. */
  readonly pullRequest?: PullRequest;
}

export function sourceControlPropertiesSerializer(item: SourceControlProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    repoType: item["repoType"],
    contentTypes: item["contentTypes"].map((p: any) => {
      return p;
    }),
    repository: repositorySerializer(item["repository"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalSerializer(item["servicePrincipal"]),
    repositoryAccess: !item["repositoryAccess"]
      ? item["repositoryAccess"]
      : repositoryAccessSerializer(item["repositoryAccess"]),
    repositoryResourceInfo: !item["repositoryResourceInfo"]
      ? item["repositoryResourceInfo"]
      : repositoryResourceInfoSerializer(item["repositoryResourceInfo"]),
  };
}

export function sourceControlPropertiesDeserializer(item: any): SourceControlProperties {
  return {
    id: item["id"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    repoType: item["repoType"],
    contentTypes: item["contentTypes"].map((p: any) => {
      return p;
    }),
    repository: repositoryDeserializer(item["repository"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDeserializer(item["servicePrincipal"]),
    workloadIdentityFederation: !item["workloadIdentityFederation"]
      ? item["workloadIdentityFederation"]
      : workloadIdentityFederationDeserializer(item["workloadIdentityFederation"]),
    repositoryAccess: !item["repositoryAccess"]
      ? item["repositoryAccess"]
      : repositoryAccessDeserializer(item["repositoryAccess"]),
    repositoryResourceInfo: !item["repositoryResourceInfo"]
      ? item["repositoryResourceInfo"]
      : repositoryResourceInfoDeserializer(item["repositoryResourceInfo"]),
    lastDeploymentInfo: !item["lastDeploymentInfo"]
      ? item["lastDeploymentInfo"]
      : deploymentInfoDeserializer(item["lastDeploymentInfo"]),
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestDeserializer(item["pullRequest"]),
  };
}

/** The version of the source control. */
export enum KnownVersion {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The version of the source control. \
 * {@link KnownVersion} can be used interchangeably with Version,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1**: V1 \
 * **V2**: V2
 */
export type Version = string;

/** The type of repository. */
export enum KnownRepoType {
  /** Github */
  Github = "Github",
  /** AzureDevOps */
  AzureDevOps = "AzureDevOps",
}

/**
 * The type of repository. \
 * {@link KnownRepoType} can be used interchangeably with RepoType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Github**: Github \
 * **AzureDevOps**: AzureDevOps
 */
export type RepoType = string;

/** The content type of a source control path. */
export enum KnownContentType {
  /** AnalyticsRule */
  AnalyticsRule = "AnalyticsRule",
  /** AutomationRule */
  AutomationRule = "AutomationRule",
  /** HuntingQuery */
  HuntingQuery = "HuntingQuery",
  /** Parser */
  Parser = "Parser",
  /** Playbook */
  Playbook = "Playbook",
  /** Workbook */
  Workbook = "Workbook",
}

/**
 * The content type of a source control path. \
 * {@link KnownContentType} can be used interchangeably with ContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AnalyticsRule**: AnalyticsRule \
 * **AutomationRule**: AutomationRule \
 * **HuntingQuery**: HuntingQuery \
 * **Parser**: Parser \
 * **Playbook**: Playbook \
 * **Workbook**: Workbook
 */
export type ContentType = string;

/** metadata of a repository. */
export interface Repository {
  /** Url of repository. */
  url: string;
  /** Branch name of repository. */
  branch: string;
  /** Display url of repository. */
  displayUrl?: string;
  /** Url to access repository action logs. */
  readonly deploymentLogsUrl?: string;
}

export function repositorySerializer(item: Repository): any {
  return { url: item["url"], branch: item["branch"], displayUrl: item["displayUrl"] };
}

export function repositoryDeserializer(item: any): Repository {
  return {
    url: item["url"],
    branch: item["branch"],
    displayUrl: item["displayUrl"],
    deploymentLogsUrl: item["deploymentLogsUrl"],
  };
}

/** Service principal metadata. */
export interface ServicePrincipal {
  /** Id of service principal. */
  readonly id?: string;
  /** Tenant id of service principal. */
  readonly tenantId?: string;
  /** App id of service principal. */
  readonly appId?: string;
  /** Expiration time of service principal credentials. */
  credentialsExpireOn?: Date;
}

export function servicePrincipalSerializer(item: ServicePrincipal): any {
  return {
    credentialsExpireOn: !item["credentialsExpireOn"]
      ? item["credentialsExpireOn"]
      : item["credentialsExpireOn"].toISOString(),
  };
}

export function servicePrincipalDeserializer(item: any): ServicePrincipal {
  return {
    id: item["id"],
    tenantId: item["tenantId"],
    appId: item["appId"],
    credentialsExpireOn: !item["credentialsExpireOn"]
      ? item["credentialsExpireOn"]
      : new Date(item["credentialsExpireOn"]),
  };
}

/** Workload Identity Federation metadata. */
export interface WorkloadIdentityFederation {
  /** Id of Workload Identity Federation. */
  readonly id?: string;
  /** Tenant id of Workload Identity Federation. */
  readonly tenantId?: string;
  /** App id of Workload Identity Federation. */
  readonly appId?: string;
  /** Subject of Workload Identity Federation. */
  readonly subject?: string;
  /** Issuer of Workload Identity Federation. */
  readonly issuer?: string;
}

export function workloadIdentityFederationDeserializer(item: any): WorkloadIdentityFederation {
  return {
    id: item["id"],
    tenantId: item["tenantId"],
    appId: item["appId"],
    subject: item["subject"],
    issuer: item["issuer"],
  };
}

/** Credentials to access repository. */
export interface RepositoryAccess {
  /** The kind of repository access credentials */
  kind: RepositoryAccessKind;
  /** OAuth Code. Required when `kind` is `OAuth` */
  code?: string;
  /** OAuth State. Required when `kind` is `OAuth` */
  state?: string;
  /** OAuth ClientId. Required when `kind` is `OAuth` */
  clientId?: string;
  /** Personal Access Token. Required when `kind` is `PAT` */
  token?: string;
  /** Application installation ID. Required when `kind` is `App`. Supported by `GitHub` only. */
  installationId?: string;
}

export function repositoryAccessSerializer(item: RepositoryAccess): any {
  return {
    kind: item["kind"],
    code: item["code"],
    state: item["state"],
    clientId: item["clientId"],
    token: item["token"],
    installationId: item["installationId"],
  };
}

export function repositoryAccessDeserializer(item: any): RepositoryAccess {
  return {
    kind: item["kind"],
    code: item["code"],
    state: item["state"],
    clientId: item["clientId"],
    token: item["token"],
    installationId: item["installationId"],
  };
}

/** The kind of repository access credentials */
export enum KnownRepositoryAccessKind {
  /** OAuth */
  OAuth = "OAuth",
  /** PAT */
  PAT = "PAT",
  /** App */
  App = "App",
}

/**
 * The kind of repository access credentials \
 * {@link KnownRepositoryAccessKind} can be used interchangeably with RepositoryAccessKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OAuth**: OAuth \
 * **PAT**: PAT \
 * **App**: App
 */
export type RepositoryAccessKind = string;

/** Resources created in user's repository for the source-control. */
export interface RepositoryResourceInfo {
  /** The webhook object created for the source-control. */
  webhook?: Webhook;
  /** Resources created in GitHub for this source-control. */
  readonly gitHubResourceInfo?: GitHubResourceInfo;
  /** Resources created in Azure DevOps for this source-control. */
  readonly azureDevOpsResourceInfo?: AzureDevOpsResourceInfo;
}

export function repositoryResourceInfoSerializer(item: RepositoryResourceInfo): any {
  return { webhook: !item["webhook"] ? item["webhook"] : webhookSerializer(item["webhook"]) };
}

export function repositoryResourceInfoDeserializer(item: any): RepositoryResourceInfo {
  return {
    webhook: !item["webhook"] ? item["webhook"] : webhookDeserializer(item["webhook"]),
    gitHubResourceInfo: !item["gitHubResourceInfo"]
      ? item["gitHubResourceInfo"]
      : gitHubResourceInfoDeserializer(item["gitHubResourceInfo"]),
    azureDevOpsResourceInfo: !item["azureDevOpsResourceInfo"]
      ? item["azureDevOpsResourceInfo"]
      : azureDevOpsResourceInfoDeserializer(item["azureDevOpsResourceInfo"]),
  };
}

/** Detail about the webhook object. */
export interface Webhook {
  /** Unique identifier for the webhook. */
  readonly webhookId?: string;
  /** URL that gets invoked by the webhook. */
  readonly webhookUrl?: string;
  /** Time when the webhook secret was updated. */
  readonly webhookSecretUpdateTime?: Date;
  /** A flag to instruct the backend service to rotate webhook secret. */
  rotateWebhookSecret?: boolean;
}

export function webhookSerializer(item: Webhook): any {
  return { rotateWebhookSecret: item["rotateWebhookSecret"] };
}

export function webhookDeserializer(item: any): Webhook {
  return {
    webhookId: item["webhookId"],
    webhookUrl: item["webhookUrl"],
    webhookSecretUpdateTime: !item["webhookSecretUpdateTime"]
      ? item["webhookSecretUpdateTime"]
      : new Date(item["webhookSecretUpdateTime"]),
    rotateWebhookSecret: item["rotateWebhookSecret"],
  };
}

/** Resources created in GitHub repository. */
export interface GitHubResourceInfo {
  /** GitHub application installation id. */
  appInstallationId?: string;
}

export function gitHubResourceInfoDeserializer(item: any): GitHubResourceInfo {
  return {
    appInstallationId: item["appInstallationId"],
  };
}

/** Resources created in Azure DevOps repository. */
export interface AzureDevOpsResourceInfo {
  /** Id of the pipeline created for the source-control. */
  pipelineId?: string;
  /** Id of the service-connection created for the source-control. */
  serviceConnectionId?: string;
}

export function azureDevOpsResourceInfoDeserializer(item: any): AzureDevOpsResourceInfo {
  return {
    pipelineId: item["pipelineId"],
    serviceConnectionId: item["serviceConnectionId"],
  };
}

/** Information regarding a deployment. */
export interface DeploymentInfo {
  /** Status while fetching the last deployment. */
  deploymentFetchStatus?: DeploymentFetchStatus;
  /** Deployment information. */
  deployment?: Deployment;
  /** Additional details about the deployment that can be shown to the user. */
  message?: string;
}

export function deploymentInfoDeserializer(item: any): DeploymentInfo {
  return {
    deploymentFetchStatus: item["deploymentFetchStatus"],
    deployment: !item["deployment"]
      ? item["deployment"]
      : deploymentDeserializer(item["deployment"]),
    message: item["message"],
  };
}

/** Status while trying to fetch the deployment information. */
export enum KnownDeploymentFetchStatus {
  /** Success */
  Success = "Success",
  /** Unauthorized */
  Unauthorized = "Unauthorized",
  /** NotFound */
  NotFound = "NotFound",
}

/**
 * Status while trying to fetch the deployment information. \
 * {@link KnownDeploymentFetchStatus} can be used interchangeably with DeploymentFetchStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Success \
 * **Unauthorized**: Unauthorized \
 * **NotFound**: NotFound
 */
export type DeploymentFetchStatus = string;

/** Description about a deployment. */
export interface Deployment {
  /** Deployment identifier. */
  deploymentId?: string;
  /** Current status of the deployment. */
  deploymentState?: DeploymentState;
  /** The outcome of the deployment. */
  deploymentResult?: DeploymentResult;
  /** The time when the deployment finished. */
  deploymentTime?: Date;
  /** Url to access repository action logs. */
  deploymentLogsUrl?: string;
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    deploymentId: item["deploymentId"],
    deploymentState: item["deploymentState"],
    deploymentResult: item["deploymentResult"],
    deploymentTime: !item["deploymentTime"]
      ? item["deploymentTime"]
      : new Date(item["deploymentTime"]),
    deploymentLogsUrl: item["deploymentLogsUrl"],
  };
}

/** The current state of the deployment. */
export enum KnownDeploymentState {
  /** In_Progress */
  InProgress = "In_Progress",
  /** Completed */
  Completed = "Completed",
  /** Queued */
  Queued = "Queued",
  /** Canceling */
  Canceling = "Canceling",
}

/**
 * The current state of the deployment. \
 * {@link KnownDeploymentState} can be used interchangeably with DeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In_Progress**: In_Progress \
 * **Completed**: Completed \
 * **Queued**: Queued \
 * **Canceling**: Canceling
 */
export type DeploymentState = string;

/** Status while trying to fetch the deployment information. */
export enum KnownDeploymentResult {
  /** Success */
  Success = "Success",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Status while trying to fetch the deployment information. \
 * {@link KnownDeploymentResult} can be used interchangeably with DeploymentResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Success \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DeploymentResult = string;

/** Information regarding pull request for protected branches. */
export interface PullRequest {
  /** URL of pull request */
  readonly url?: string;
  /** State of the pull request */
  readonly state?: State;
}

export function pullRequestDeserializer(item: any): PullRequest {
  return {
    url: item["url"],
    state: item["state"],
  };
}

/** State of recommendation. */
export enum KnownState {
  /** Recommendation is active. */
  Active = "Active",
  /** Recommendation is in progress. */
  InProgress = "InProgress",
  /** Recommendation has been dismissed. */
  Dismissed = "Dismissed",
  /** Recommendation has been completed by user. */
  CompletedByUser = "CompletedByUser",
  /** Recommendation has been completed by the system. */
  CompletedBySystem = "CompletedBySystem",
}

/**
 * State of recommendation. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Recommendation is active. \
 * **InProgress**: Recommendation is in progress. \
 * **Dismissed**: Recommendation has been dismissed. \
 * **CompletedByUser**: Recommendation has been completed by user. \
 * **CompletedBySystem**: Recommendation has been completed by the system.
 */
export type State = string;

/** List all the source controls. */
export interface _SourceControlList {
  /** The SourceControl items on this page */
  value: SourceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlListDeserializer(item: any): _SourceControlList {
  return {
    value: sourceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlArraySerializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlSerializer(item);
  });
}

export function sourceControlArrayDeserializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlDeserializer(item);
  });
}

/** Credentials to access repository. */
export interface RepositoryAccessProperties {
  /** RepositoryAccess properties */
  repositoryAccess: RepositoryAccess;
}

export function repositoryAccessPropertiesSerializer(item: RepositoryAccessProperties): any {
  return { properties: _repositoryAccessPropertiesPropertiesSerializer(item) };
}

/** Credentials to access repository. */
export interface RepositoryAccessObject {
  /** The kind of repository access credentials */
  kind: RepositoryAccessKind;
  /** OAuth Code. Required when `kind` is `OAuth` */
  code?: string;
  /** OAuth State. Required when `kind` is `OAuth` */
  state?: string;
  /** OAuth ClientId. Required when `kind` is `OAuth` */
  clientId?: string;
  /** Personal Access Token. Required when `kind` is `PAT` */
  token?: string;
  /** Application installation ID. Required when `kind` is `App`. Supported by `GitHub` only. */
  installationId?: string;
}

export function repositoryAccessObjectSerializer(item: RepositoryAccessObject): any {
  return { repositoryAccess: _repositoryAccessObjectRepositoryAccessSerializer(item) };
}

/** Warning response structure. */
export interface Warning {
  /** Warning data. */
  readonly warning?: WarningBody;
}

export function warningDeserializer(item: any): Warning {
  return {
    warning: !item["warning"] ? item["warning"] : warningBodyDeserializer(item["warning"]),
  };
}

/** Warning details. */
export interface WarningBody {
  /** An identifier for the warning. Codes are invariant and are intended to be consumed programmatically. */
  readonly code?: WarningCode;
  /** A message describing the warning, intended to be suitable for display in a user interface. */
  readonly message?: string;
  readonly details?: WarningBody[];
}

export function warningBodyDeserializer(item: any): WarningBody {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : warningBodyArrayDeserializer(item["details"]),
  };
}

/** The type of repository. */
export enum KnownWarningCode {
  /** SourceControlWarning_DeleteServicePrincipal */
  SourceControlWarningDeleteServicePrincipal = "SourceControlWarning_DeleteServicePrincipal",
  /** SourceControlWarning_DeletePipelineFromAzureDevOps */
  SourceControlWarningDeletePipelineFromAzureDevOps = "SourceControlWarning_DeletePipelineFromAzureDevOps",
  /** SourceControlWarning_DeleteWorkflowAndSecretFromGitHub */
  SourceControlWarningDeleteWorkflowAndSecretFromGitHub = "SourceControlWarning_DeleteWorkflowAndSecretFromGitHub",
  /** SourceControlWarning_DeleteRoleAssignment */
  SourceControlWarningDeleteRoleAssignment = "SourceControlWarning_DeleteRoleAssignment",
  /** SourceControl_DeletedWithWarnings */
  SourceControlDeletedWithWarnings = "SourceControl_DeletedWithWarnings",
}

/**
 * The type of repository. \
 * {@link KnownWarningCode} can be used interchangeably with WarningCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SourceControlWarning_DeleteServicePrincipal**: SourceControlWarning_DeleteServicePrincipal \
 * **SourceControlWarning_DeletePipelineFromAzureDevOps**: SourceControlWarning_DeletePipelineFromAzureDevOps \
 * **SourceControlWarning_DeleteWorkflowAndSecretFromGitHub**: SourceControlWarning_DeleteWorkflowAndSecretFromGitHub \
 * **SourceControlWarning_DeleteRoleAssignment**: SourceControlWarning_DeleteRoleAssignment \
 * **SourceControl_DeletedWithWarnings**: SourceControl_DeletedWithWarnings
 */
export type WarningCode = string;

export function warningBodyArrayDeserializer(result: Array<WarningBody>): any[] {
  return result.map((item) => {
    return warningBodyDeserializer(item);
  });
}

/** Represents a Watchlist in Azure Security Insights. */
export interface Watchlist extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The id (a Guid) of the watchlist */
  watchlistId?: string;
  /** The display name of the watchlist */
  displayName?: string;
  /** The provider of the watchlist */
  provider?: string;
  /** The filename of the watchlist, called 'source' */
  source?: string;
  /** The sourceType of the watchlist */
  sourceType?: SourceType;
  /** The time the watchlist was created */
  created?: Date;
  /** The last time the watchlist was updated */
  updated?: Date;
  /** Describes a user that created the watchlist */
  createdBy?: UserInfo;
  /** Describes a user that updated the watchlist */
  updatedBy?: UserInfo;
  /** A description of the watchlist */
  description?: string;
  /** The type of the watchlist */
  watchlistType?: string;
  /** The alias of the watchlist */
  watchlistAlias?: string;
  /** A flag that indicates if the watchlist is deleted or not */
  isDeleted?: boolean;
  /** List of labels relevant to this watchlist */
  labels?: string[];
  /** The default duration of a watchlist (in ISO 8601 duration format) */
  defaultDuration?: string;
  /** The tenantId where the watchlist belongs to */
  tenantId?: string;
  /** The number of lines in a csv/tsv content to skip before the header */
  numberOfLinesToSkip?: number;
  /** The raw content that represents to watchlist items to create. In case of csv/tsv content type, it's the content of the file that will parsed by the endpoint */
  rawContent?: string;
  /** The search key is used to optimize query performance when using watchlists for joins with other data. For example, enable a column with IP addresses to be the designated SearchKey field, then use this field as the key field when joining to other event data by IP address. */
  itemsSearchKey?: string;
  /** The content type of the raw content. Example : text/csv or text/tsv */
  contentType?: string;
  /** The status of the Watchlist upload : New, InProgress or Complete. **Note** : When a Watchlist upload status is InProgress, the Watchlist cannot be deleted */
  uploadStatus?: string;
  /** Describes provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function watchlistSerializer(item: Watchlist): any {
  return {
    properties: areAllPropsUndefined(item, [
      "watchlistId",
      "displayName",
      "provider",
      "source",
      "sourceType",
      "created",
      "updated",
      "createdBy",
      "updatedBy",
      "description",
      "watchlistType",
      "watchlistAlias",
      "isDeleted",
      "labels",
      "defaultDuration",
      "tenantId",
      "numberOfLinesToSkip",
      "rawContent",
      "itemsSearchKey",
      "contentType",
      "uploadStatus",
    ])
      ? undefined
      : _watchlistPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function watchlistDeserializer(item: any): Watchlist {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _watchlistPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes watchlist properties */
export interface WatchlistProperties {
  /** The id (a Guid) of the watchlist */
  watchlistId?: string;
  /** The display name of the watchlist */
  displayName: string;
  /** The provider of the watchlist */
  provider: string;
  /** The filename of the watchlist, called 'source' */
  source?: string;
  /** The sourceType of the watchlist */
  sourceType?: SourceType;
  /** The time the watchlist was created */
  created?: Date;
  /** The last time the watchlist was updated */
  updated?: Date;
  /** Describes a user that created the watchlist */
  createdBy?: UserInfo;
  /** Describes a user that updated the watchlist */
  updatedBy?: UserInfo;
  /** A description of the watchlist */
  description?: string;
  /** The type of the watchlist */
  watchlistType?: string;
  /** The alias of the watchlist */
  watchlistAlias?: string;
  /** A flag that indicates if the watchlist is deleted or not */
  isDeleted?: boolean;
  /** List of labels relevant to this watchlist */
  labels?: string[];
  /** The default duration of a watchlist (in ISO 8601 duration format) */
  defaultDuration?: string;
  /** The tenantId where the watchlist belongs to */
  tenantId?: string;
  /** The number of lines in a csv/tsv content to skip before the header */
  numberOfLinesToSkip?: number;
  /** The raw content that represents to watchlist items to create. In case of csv/tsv content type, it's the content of the file that will parsed by the endpoint */
  rawContent?: string;
  /** The search key is used to optimize query performance when using watchlists for joins with other data. For example, enable a column with IP addresses to be the designated SearchKey field, then use this field as the key field when joining to other event data by IP address. */
  itemsSearchKey: string;
  /** The content type of the raw content. Example : text/csv or text/tsv */
  contentType?: string;
  /** The status of the Watchlist upload : New, InProgress or Complete. **Note** : When a Watchlist upload status is InProgress, the Watchlist cannot be deleted */
  uploadStatus?: string;
  /** Describes provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function watchlistPropertiesSerializer(item: WatchlistProperties): any {
  return {
    watchlistId: item["watchlistId"],
    displayName: item["displayName"],
    provider: item["provider"],
    source: item["source"],
    sourceType: item["sourceType"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    description: item["description"],
    watchlistType: item["watchlistType"],
    watchlistAlias: item["watchlistAlias"],
    isDeleted: item["isDeleted"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    defaultDuration: item["defaultDuration"],
    tenantId: item["tenantId"],
    numberOfLinesToSkip: item["numberOfLinesToSkip"],
    rawContent: item["rawContent"],
    itemsSearchKey: item["itemsSearchKey"],
    contentType: item["contentType"],
    uploadStatus: item["uploadStatus"],
  };
}

export function watchlistPropertiesDeserializer(item: any): WatchlistProperties {
  return {
    watchlistId: item["watchlistId"],
    displayName: item["displayName"],
    provider: item["provider"],
    source: item["source"],
    sourceType: item["sourceType"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    description: item["description"],
    watchlistType: item["watchlistType"],
    watchlistAlias: item["watchlistAlias"],
    isDeleted: item["isDeleted"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    defaultDuration: item["defaultDuration"],
    tenantId: item["tenantId"],
    numberOfLinesToSkip: item["numberOfLinesToSkip"],
    rawContent: item["rawContent"],
    itemsSearchKey: item["itemsSearchKey"],
    contentType: item["contentType"],
    uploadStatus: item["uploadStatus"],
    provisioningState: item["provisioningState"],
  };
}

/** The sourceType of the watchlist */
export enum KnownSourceType {
  /** The source from local file. */
  Local = "Local",
  /** The source from Azure storage. */
  AzureStorage = "AzureStorage",
}

/**
 * The sourceType of the watchlist \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: The source from local file. \
 * **AzureStorage**: The source from Azure storage.
 */
export type SourceType = string;

/** The triggered analytics rule run provisioning state */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The triggered analytics rule run provisioning state \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

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

/** List all the watchlists. */
export interface _WatchlistList {
  /** The Watchlist items on this page */
  value: Watchlist[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _watchlistListDeserializer(item: any): _WatchlistList {
  return {
    value: watchlistArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function watchlistArraySerializer(result: Array<Watchlist>): any[] {
  return result.map((item) => {
    return watchlistSerializer(item);
  });
}

export function watchlistArrayDeserializer(result: Array<Watchlist>): any[] {
  return result.map((item) => {
    return watchlistDeserializer(item);
  });
}

/** Represents a Watchlist Item in Azure Security Insights. */
export interface WatchlistItem extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The type of the watchlist item */
  watchlistItemType?: string;
  /** The id (a Guid) of the watchlist item */
  watchlistItemId?: string;
  /** The tenantId to which the watchlist item belongs to */
  tenantId?: string;
  /** A flag that indicates if the watchlist item is deleted or not */
  isDeleted?: boolean;
  /** The time the watchlist item was created */
  created?: Date;
  /** The last time the watchlist item was updated */
  updated?: Date;
  /** Describes a user that created the watchlist item */
  createdBy?: UserInfo;
  /** Describes a user that updated the watchlist item */
  updatedBy?: UserInfo;
  /** key-value pairs for a watchlist item */
  itemsKeyValue?: any;
  /** key-value pairs for a watchlist item entity mapping */
  entityMapping?: any;
}

export function watchlistItemSerializer(item: WatchlistItem): any {
  return {
    properties: areAllPropsUndefined(item, [
      "watchlistItemType",
      "watchlistItemId",
      "tenantId",
      "isDeleted",
      "created",
      "updated",
      "createdBy",
      "updatedBy",
      "itemsKeyValue",
      "entityMapping",
    ])
      ? undefined
      : _watchlistItemPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function watchlistItemDeserializer(item: any): WatchlistItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _watchlistItemPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes watchlist item properties */
export interface WatchlistItemProperties {
  /** The type of the watchlist item */
  watchlistItemType?: string;
  /** The id (a Guid) of the watchlist item */
  watchlistItemId?: string;
  /** The tenantId to which the watchlist item belongs to */
  tenantId?: string;
  /** A flag that indicates if the watchlist item is deleted or not */
  isDeleted?: boolean;
  /** The time the watchlist item was created */
  created?: Date;
  /** The last time the watchlist item was updated */
  updated?: Date;
  /** Describes a user that created the watchlist item */
  createdBy?: UserInfo;
  /** Describes a user that updated the watchlist item */
  updatedBy?: UserInfo;
  /** key-value pairs for a watchlist item */
  itemsKeyValue: any;
  /** key-value pairs for a watchlist item entity mapping */
  entityMapping?: any;
}

export function watchlistItemPropertiesSerializer(item: WatchlistItemProperties): any {
  return {
    watchlistItemType: item["watchlistItemType"],
    watchlistItemId: item["watchlistItemId"],
    tenantId: item["tenantId"],
    isDeleted: item["isDeleted"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    itemsKeyValue: item["itemsKeyValue"],
    entityMapping: item["entityMapping"],
  };
}

export function watchlistItemPropertiesDeserializer(item: any): WatchlistItemProperties {
  return {
    watchlistItemType: item["watchlistItemType"],
    watchlistItemId: item["watchlistItemId"],
    tenantId: item["tenantId"],
    isDeleted: item["isDeleted"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    itemsKeyValue: item["itemsKeyValue"],
    entityMapping: item["entityMapping"],
  };
}

/** List all the watchlist items. */
export interface _WatchlistItemList {
  /** The WatchlistItem items on this page */
  value: WatchlistItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _watchlistItemListDeserializer(item: any): _WatchlistItemList {
  return {
    value: watchlistItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function watchlistItemArraySerializer(result: Array<WatchlistItem>): any[] {
  return result.map((item) => {
    return watchlistItemSerializer(item);
  });
}

export function watchlistItemArrayDeserializer(result: Array<WatchlistItem>): any[] {
  return result.map((item) => {
    return watchlistItemDeserializer(item);
  });
}

/** Billing statistic */
export interface BillingStatistic extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: SapSolutionUsage */
  kind: BillingStatisticKind;
  /** Resource Etag. */
  readonly etag?: string;
}

export function billingStatisticDeserializer(item: any): BillingStatistic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for BillingStatisticUnion */
export type BillingStatisticUnion = SapSolutionUsageStatistic | BillingStatistic;

export function billingStatisticUnionDeserializer(item: any): BillingStatisticUnion {
  switch (item["kind"]) {
    case "SapSolutionUsage":
      return sapSolutionUsageStatisticDeserializer(item as SapSolutionUsageStatistic);

    default:
      return billingStatisticDeserializer(item);
  }
}

/** The kind of the billing statistic */
export enum KnownBillingStatisticKind {
  /** SapSolutionUsage */
  SapSolutionUsage = "SapSolutionUsage",
}

/**
 * The kind of the billing statistic \
 * {@link KnownBillingStatisticKind} can be used interchangeably with BillingStatisticKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SapSolutionUsage**: SapSolutionUsage
 */
export type BillingStatisticKind = string;

/** Billing statistic about the Microsoft Sentinel solution for SAP Usage */
export interface SapSolutionUsageStatistic extends BillingStatistic {
  /** The kind of the billing statistic */
  kind: "SapSolutionUsage";
  /** The latest count of active SAP system IDs under the Microsoft Sentinel solution for SAP Usage */
  readonly activeSystemIdCount?: number;
}

export function sapSolutionUsageStatisticDeserializer(item: any): SapSolutionUsageStatistic {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sapSolutionUsageStatisticPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the billing statistic about the Microsoft Sentinel solution for SAP usage */
export interface SapSolutionUsageStatisticProperties {
  /** The latest count of active SAP system IDs under the Microsoft Sentinel solution for SAP Usage */
  readonly activeSystemIdCount?: number;
}

export function sapSolutionUsageStatisticPropertiesDeserializer(
  item: any,
): SapSolutionUsageStatisticProperties {
  return {
    activeSystemIdCount: item["activeSystemIdCount"],
  };
}

/** List of all Microsoft Sentinel billing statistics. */
export interface _BillingStatisticList {
  /** The BillingStatistic items on this page */
  value: BillingStatisticUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingStatisticListDeserializer(item: any): _BillingStatisticList {
  return {
    value: billingStatisticUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingStatisticUnionArrayDeserializer(
  result: Array<BillingStatisticUnion>,
): any[] {
  return result.map((item) => {
    return billingStatisticUnionDeserializer(item);
  });
}

/** List of all the entities. */
export interface _EntityList {
  /** The Entity items on this page */
  value: EntityUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _entityListDeserializer(item: any): _EntityList {
  return {
    value: entityUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Describes the request body for triggering a playbook on an entity. */
export interface EntityManualTriggerRequestBody {
  /** Incident ARM id. */
  incidentArmId?: string;
  /** The tenant id of the playbook resource. */
  tenantId?: string;
  /** The resource id of the playbook resource. */
  logicAppsResourceId: string;
}

export function entityManualTriggerRequestBodySerializer(
  item: EntityManualTriggerRequestBody,
): any {
  return {
    incidentArmId: item["incidentArmId"],
    tenantId: item["tenantId"],
    logicAppsResourceId: item["logicAppsResourceId"],
  };
}

/** The parameters required to execute an expand operation on the given entity. */
export interface EntityExpandParameters {
  /** The end date filter, so the only expansion results returned are before this date. */
  endTime?: Date;
  /** The Id of the expansion to perform. */
  expansionId?: string;
  /** The start date filter, so the only expansion results returned are after this date. */
  startTime?: Date;
}

export function entityExpandParametersSerializer(item: EntityExpandParameters): any {
  return {
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    expansionId: item["expansionId"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

/** The entity expansion result operation response. */
export interface EntityExpandResponse {
  /** The metadata from the expansion operation results. */
  metaData?: ExpansionResultsMetadata;
  /** The expansion result values. */
  value?: EntityExpandResponseValue;
}

export function entityExpandResponseDeserializer(item: any): EntityExpandResponse {
  return {
    metaData: !item["metaData"]
      ? item["metaData"]
      : expansionResultsMetadataDeserializer(item["metaData"]),
    value: !item["value"] ? item["value"] : entityExpandResponseValueDeserializer(item["value"]),
  };
}

/** Expansion result metadata. */
export interface ExpansionResultsMetadata {
  /** Information of the aggregated nodes in the expansion result. */
  aggregations?: ExpansionResultAggregation[];
}

export function expansionResultsMetadataDeserializer(item: any): ExpansionResultsMetadata {
  return {
    aggregations: !item["aggregations"]
      ? item["aggregations"]
      : expansionResultAggregationArrayDeserializer(item["aggregations"]),
  };
}

export function expansionResultAggregationArrayDeserializer(
  result: Array<ExpansionResultAggregation>,
): any[] {
  return result.map((item) => {
    return expansionResultAggregationDeserializer(item);
  });
}

/** Information of a specific aggregation in the expansion result. */
export interface ExpansionResultAggregation {
  /** The common type of the aggregation. (for e.g. entity field name) */
  aggregationType?: string;
  /** Total number of aggregations of the given kind (and aggregationType if given) in the expansion result. */
  count: number;
  /** The display name of the aggregation by type. */
  displayName?: string;
  /** The kind of the aggregated entity. */
  entityKind: EntityKindEnum;
}

export function expansionResultAggregationDeserializer(item: any): ExpansionResultAggregation {
  return {
    aggregationType: item["aggregationType"],
    count: item["count"],
    displayName: item["displayName"],
    entityKind: item["entityKind"],
  };
}

/** The expansion result values. */
export interface EntityExpandResponseValue {
  /** Array of the expansion result entities. */
  entities?: EntityUnion[];
  /** Array of edges that connects the entity to the list of entities. */
  edges?: EntityEdges[];
}

export function entityExpandResponseValueDeserializer(item: any): EntityExpandResponseValue {
  return {
    entities: !item["entities"] ? item["entities"] : entityUnionArrayDeserializer(item["entities"]),
    edges: !item["edges"] ? item["edges"] : entityEdgesArrayDeserializer(item["edges"]),
  };
}

export function entityEdgesArrayDeserializer(result: Array<EntityEdges>): any[] {
  return result.map((item) => {
    return entityEdgesDeserializer(item);
  });
}

/** The edge that connects the entity to the other entity. */
export interface EntityEdges {
  /** The target entity Id. */
  targetEntityId?: string;
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  additionalData?: Record<string, any>;
}

export function entityEdgesDeserializer(item: any): EntityEdges {
  return {
    targetEntityId: item["targetEntityId"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Retrieve queries for entity result operation response. */
export interface _GetQueriesResponse {
  /** The query result values. */
  value?: EntityQueryItemUnion[];
  nextLink?: string;
}

export function _getQueriesResponseDeserializer(item: any): _GetQueriesResponse {
  return {
    value: !item["value"] ? item["value"] : entityQueryItemUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function entityQueryItemUnionArrayDeserializer(result: Array<EntityQueryItemUnion>): any[] {
  return result.map((item) => {
    return entityQueryItemUnionDeserializer(item);
  });
}

/** An abstract Query item for entity */
export interface EntityQueryItem {
  /** Query Template ARM ID */
  readonly id?: string;
  /** Query Template ARM Name */
  name?: string;
  /** ARM Type */
  type?: string;
  /** The kind of the entity query */
  /** The discriminator possible values: Insight */
  kind: EntityQueryKind;
}

export function entityQueryItemDeserializer(item: any): EntityQueryItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    kind: item["kind"],
  };
}

/** Alias for EntityQueryItemUnion */
export type EntityQueryItemUnion = InsightQueryItem | EntityQueryItem;

export function entityQueryItemUnionDeserializer(item: any): EntityQueryItemUnion {
  switch (item["kind"]) {
    case "Insight":
      return insightQueryItemDeserializer(item as InsightQueryItem);

    default:
      return entityQueryItemDeserializer(item);
  }
}

/** The kind of the entity query */
export enum KnownEntityQueryKind {
  /** Expansion */
  Expansion = "Expansion",
  /** Insight */
  Insight = "Insight",
  /** Activity */
  Activity = "Activity",
}

/**
 * The kind of the entity query \
 * {@link KnownEntityQueryKind} can be used interchangeably with EntityQueryKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Expansion**: Expansion \
 * **Insight**: Insight \
 * **Activity**: Activity
 */
export type EntityQueryKind = string;

/** Represents Insight Query. */
export interface InsightQueryItem extends EntityQueryItem {
  /** Properties bag for InsightQueryItem */
  properties?: InsightQueryItemProperties;
  /** The kind of the entity query */
  kind: "Insight";
}

export function insightQueryItemDeserializer(item: any): InsightQueryItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : insightQueryItemPropertiesDeserializer(item["properties"]),
  };
}

/** Represents Insight Query. */
export interface InsightQueryItemProperties extends EntityQueryItemProperties {
  /** The insight display name. */
  displayName?: string;
  /** The insight description. */
  description?: string;
  /** The base query of the insight. */
  baseQuery?: string;
  /** The insight table query. */
  tableQuery?: InsightQueryItemPropertiesTableQuery;
  /** The insight chart query. */
  chartQuery?: any;
  /** The activity query definitions. */
  additionalQuery?: InsightQueryItemPropertiesAdditionalQuery;
  /** The insight chart query. */
  defaultTimeRange?: InsightQueryItemPropertiesDefaultTimeRange;
  /** The insight chart query. */
  referenceTimeRange?: InsightQueryItemPropertiesReferenceTimeRange;
}

export function insightQueryItemPropertiesDeserializer(item: any): InsightQueryItemProperties {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : entityQueryItemPropertiesDataTypesItemArrayDeserializer(item["dataTypes"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: item["entitiesFilter"],
    displayName: item["displayName"],
    description: item["description"],
    baseQuery: item["baseQuery"],
    tableQuery: !item["tableQuery"]
      ? item["tableQuery"]
      : insightQueryItemPropertiesTableQueryDeserializer(item["tableQuery"]),
    chartQuery: item["chartQuery"],
    additionalQuery: !item["additionalQuery"]
      ? item["additionalQuery"]
      : insightQueryItemPropertiesAdditionalQueryDeserializer(item["additionalQuery"]),
    defaultTimeRange: !item["defaultTimeRange"]
      ? item["defaultTimeRange"]
      : insightQueryItemPropertiesDefaultTimeRangeDeserializer(item["defaultTimeRange"]),
    referenceTimeRange: !item["referenceTimeRange"]
      ? item["referenceTimeRange"]
      : insightQueryItemPropertiesReferenceTimeRangeDeserializer(item["referenceTimeRange"]),
  };
}

/** The insight table query. */
export interface InsightQueryItemPropertiesTableQuery {
  /** List of insight column definitions. */
  columnsDefinitions?: InsightQueryItemPropertiesTableQueryColumnsDefinitionsItem[];
  /** List of insight queries definitions. */
  queriesDefinitions?: InsightQueryItemPropertiesTableQueryQueriesDefinitionsItem[];
}

export function insightQueryItemPropertiesTableQueryDeserializer(
  item: any,
): InsightQueryItemPropertiesTableQuery {
  return {
    columnsDefinitions: !item["columnsDefinitions"]
      ? item["columnsDefinitions"]
      : insightQueryItemPropertiesTableQueryColumnsDefinitionsItemArrayDeserializer(
          item["columnsDefinitions"],
        ),
    queriesDefinitions: !item["queriesDefinitions"]
      ? item["queriesDefinitions"]
      : insightQueryItemPropertiesTableQueryQueriesDefinitionsItemArrayDeserializer(
          item["queriesDefinitions"],
        ),
  };
}

export function insightQueryItemPropertiesTableQueryColumnsDefinitionsItemArrayDeserializer(
  result: Array<InsightQueryItemPropertiesTableQueryColumnsDefinitionsItem>,
): any[] {
  return result.map((item) => {
    return insightQueryItemPropertiesTableQueryColumnsDefinitionsItemDeserializer(item);
  });
}

/** model interface InsightQueryItemPropertiesTableQueryColumnsDefinitionsItem */
export interface InsightQueryItemPropertiesTableQueryColumnsDefinitionsItem {
  /** Insight column header. */
  header?: string;
  /** Insights Column type. */
  outputType?: OutputType;
  /** Is query supports deep-link. */
  supportDeepLink?: boolean;
}

export function insightQueryItemPropertiesTableQueryColumnsDefinitionsItemDeserializer(
  item: any,
): InsightQueryItemPropertiesTableQueryColumnsDefinitionsItem {
  return {
    header: item["header"],
    outputType: item["outputType"],
    supportDeepLink: item["supportDeepLink"],
  };
}

/** Insights Column type. */
export enum KnownOutputType {
  /** Number */
  Number = "Number",
  /** String */
  String = "String",
  /** Date */
  Date = "Date",
  /** Entity */
  Entity = "Entity",
}

/**
 * Insights Column type. \
 * {@link KnownOutputType} can be used interchangeably with OutputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Number**: Number \
 * **String**: String \
 * **Date**: Date \
 * **Entity**: Entity
 */
export type OutputType = string;

export function insightQueryItemPropertiesTableQueryQueriesDefinitionsItemArrayDeserializer(
  result: Array<InsightQueryItemPropertiesTableQueryQueriesDefinitionsItem>,
): any[] {
  return result.map((item) => {
    return insightQueryItemPropertiesTableQueryQueriesDefinitionsItemDeserializer(item);
  });
}

/** model interface InsightQueryItemPropertiesTableQueryQueriesDefinitionsItem */
export interface InsightQueryItemPropertiesTableQueryQueriesDefinitionsItem {
  /** Insight column header. */
  filter?: string;
  /** Insight column header. */
  summarize?: string;
  /** Insight column header. */
  project?: string;
  /** Insight column header. */
  linkColumnsDefinitions?: InsightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItem[];
}

export function insightQueryItemPropertiesTableQueryQueriesDefinitionsItemDeserializer(
  item: any,
): InsightQueryItemPropertiesTableQueryQueriesDefinitionsItem {
  return {
    filter: item["filter"],
    summarize: item["summarize"],
    project: item["project"],
    linkColumnsDefinitions: !item["linkColumnsDefinitions"]
      ? item["linkColumnsDefinitions"]
      : insightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItemArrayDeserializer(
          item["linkColumnsDefinitions"],
        ),
  };
}

export function insightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItemArrayDeserializer(
  result: Array<InsightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItem>,
): any[] {
  return result.map((item) => {
    return insightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItemDeserializer(
      item,
    );
  });
}

/** model interface InsightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItem */
export interface InsightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItem {
  /** Insight Link Definition Projected Name. */
  projectedName?: string;
  /** Insight Link Definition Query. */
  query?: string;
}

export function insightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItemDeserializer(
  item: any,
): InsightQueryItemPropertiesTableQueryQueriesDefinitionsPropertiesItemsItem {
  return {
    projectedName: item["projectedName"],
    query: item["Query"],
  };
}

/** The activity query definitions. */
export interface InsightQueryItemPropertiesAdditionalQuery {
  /** The insight query. */
  query?: string;
  /** The insight text. */
  text?: string;
}

export function insightQueryItemPropertiesAdditionalQueryDeserializer(
  item: any,
): InsightQueryItemPropertiesAdditionalQuery {
  return {
    query: item["query"],
    text: item["text"],
  };
}

/** The insight chart query. */
export interface InsightQueryItemPropertiesDefaultTimeRange {
  /** The padding for the start time of the query. */
  beforeRange?: string;
  /** The padding for the end time of the query. */
  afterRange?: string;
}

export function insightQueryItemPropertiesDefaultTimeRangeDeserializer(
  item: any,
): InsightQueryItemPropertiesDefaultTimeRange {
  return {
    beforeRange: item["beforeRange"],
    afterRange: item["afterRange"],
  };
}

/** The insight chart query. */
export interface InsightQueryItemPropertiesReferenceTimeRange {
  /** Additional query time for looking back. */
  beforeRange?: string;
}

export function insightQueryItemPropertiesReferenceTimeRangeDeserializer(
  item: any,
): InsightQueryItemPropertiesReferenceTimeRange {
  return {
    beforeRange: item["beforeRange"],
  };
}

/** An properties abstract Query item for entity */
export interface EntityQueryItemProperties {
  /** Data types for template */
  dataTypes?: EntityQueryItemPropertiesDataTypesItem[];
  /** The type of the entity */
  inputEntityType?: EntityType;
  /** Data types for template */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: any;
}

export function entityQueryItemPropertiesDeserializer(item: any): EntityQueryItemProperties {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : entityQueryItemPropertiesDataTypesItemArrayDeserializer(item["dataTypes"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: item["entitiesFilter"],
  };
}

export function entityQueryItemPropertiesDataTypesItemArrayDeserializer(
  result: Array<EntityQueryItemPropertiesDataTypesItem>,
): any[] {
  return result.map((item) => {
    return entityQueryItemPropertiesDataTypesItemDeserializer(item);
  });
}

/** model interface EntityQueryItemPropertiesDataTypesItem */
export interface EntityQueryItemPropertiesDataTypesItem {
  /** Data type name */
  dataType?: string;
}

export function entityQueryItemPropertiesDataTypesItemDeserializer(
  item: any,
): EntityQueryItemPropertiesDataTypesItem {
  return {
    dataType: item["dataType"],
  };
}

/** The type of the entity */
export enum KnownEntityType {
  /** Entity represents account in the system. */
  Account = "Account",
  /** Entity represents host in the system. */
  Host = "Host",
  /** Entity represents file in the system. */
  File = "File",
  /** Entity represents azure resource in the system. */
  AzureResource = "AzureResource",
  /** Entity represents cloud application in the system. */
  CloudApplication = "CloudApplication",
  /** Entity represents dns in the system. */
  DNS = "DNS",
  /** Entity represents file hash in the system. */
  FileHash = "FileHash",
  /** Entity represents ip in the system. */
  IP = "IP",
  /** Entity represents malware in the system. */
  Malware = "Malware",
  /** Entity represents process in the system. */
  Process = "Process",
  /** Entity represents registry key in the system. */
  RegistryKey = "RegistryKey",
  /** Entity represents registry value in the system. */
  RegistryValue = "RegistryValue",
  /** Entity represents security group in the system. */
  SecurityGroup = "SecurityGroup",
  /** Entity represents url in the system. */
  URL = "URL",
  /** Entity represents IoT device in the system. */
  IoTDevice = "IoTDevice",
  /** Entity represents security alert in the system. */
  SecurityAlert = "SecurityAlert",
  /** Entity represents HuntingBookmark in the system. */
  HuntingBookmark = "HuntingBookmark",
  /** Entity represents mail cluster in the system. */
  MailCluster = "MailCluster",
  /** Entity represents mail message in the system. */
  MailMessage = "MailMessage",
  /** Entity represents mailbox in the system. */
  Mailbox = "Mailbox",
  /** Entity represents submission mail in the system. */
  SubmissionMail = "SubmissionMail",
  /** Entity represents network interface in the system. */
  Nic = "Nic",
}

/**
 * The type of the entity \
 * {@link KnownEntityType} can be used interchangeably with EntityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Account**: Entity represents account in the system. \
 * **Host**: Entity represents host in the system. \
 * **File**: Entity represents file in the system. \
 * **AzureResource**: Entity represents azure resource in the system. \
 * **CloudApplication**: Entity represents cloud application in the system. \
 * **DNS**: Entity represents dns in the system. \
 * **FileHash**: Entity represents file hash in the system. \
 * **IP**: Entity represents ip in the system. \
 * **Malware**: Entity represents malware in the system. \
 * **Process**: Entity represents process in the system. \
 * **RegistryKey**: Entity represents registry key in the system. \
 * **RegistryValue**: Entity represents registry value in the system. \
 * **SecurityGroup**: Entity represents security group in the system. \
 * **URL**: Entity represents url in the system. \
 * **IoTDevice**: Entity represents IoT device in the system. \
 * **SecurityAlert**: Entity represents security alert in the system. \
 * **HuntingBookmark**: Entity represents HuntingBookmark in the system. \
 * **MailCluster**: Entity represents mail cluster in the system. \
 * **MailMessage**: Entity represents mail message in the system. \
 * **Mailbox**: Entity represents mailbox in the system. \
 * **SubmissionMail**: Entity represents submission mail in the system. \
 * **Nic**: Entity represents network interface in the system.
 */
export type EntityType = string;

/** The parameters required to execute insights operation on the given entity. */
export interface EntityGetInsightsParameters {
  /** The start timeline date, so the results returned are after this date. */
  startTime: Date;
  /** The end timeline date, so the results returned are before this date. */
  endTime: Date;
  /** Indicates if query time range should be extended with default time range of the query. Default value is false */
  addDefaultExtendedTimeRange?: boolean;
  /** List of Insights Query Id. If empty, default value is all insights of this entity */
  insightQueryIds?: string[];
}

export function entityGetInsightsParametersSerializer(item: EntityGetInsightsParameters): any {
  return {
    startTime: item["startTime"].toISOString(),
    endTime: item["endTime"].toISOString(),
    addDefaultExtendedTimeRange: item["addDefaultExtendedTimeRange"],
    insightQueryIds: !item["insightQueryIds"]
      ? item["insightQueryIds"]
      : item["insightQueryIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The Get Insights result operation response. */
export interface EntityGetInsightsResponse {
  /** The metadata from the get insights operation results. */
  metaData?: GetInsightsResultsMetadata;
  /** The insights result values. */
  value?: EntityInsightItem[];
}

export function entityGetInsightsResponseDeserializer(item: any): EntityGetInsightsResponse {
  return {
    metaData: !item["metaData"]
      ? item["metaData"]
      : getInsightsResultsMetadataDeserializer(item["metaData"]),
    value: !item["value"] ? item["value"] : entityInsightItemArrayDeserializer(item["value"]),
  };
}

/** Get Insights result metadata. */
export interface GetInsightsResultsMetadata {
  /** the total items found for the insights request */
  totalCount: number;
  /** information about the failed queries */
  errors?: GetInsightsErrorKind[];
}

export function getInsightsResultsMetadataDeserializer(item: any): GetInsightsResultsMetadata {
  return {
    totalCount: item["totalCount"],
    errors: !item["errors"]
      ? item["errors"]
      : getInsightsErrorKindArrayDeserializer(item["errors"]),
  };
}

export function getInsightsErrorKindArrayDeserializer(result: Array<GetInsightsErrorKind>): any[] {
  return result.map((item) => {
    return getInsightsErrorKindDeserializer(item);
  });
}

/** GetInsights Query Errors. */
export interface GetInsightsErrorKind {
  /** the query kind */
  kind: GetInsightsError;
  /** the query id */
  queryId?: string;
  /** the error message */
  errorMessage: string;
}

export function getInsightsErrorKindDeserializer(item: any): GetInsightsErrorKind {
  return {
    kind: item["kind"],
    queryId: item["queryId"],
    errorMessage: item["errorMessage"],
  };
}

/** the query kind */
export enum KnownGetInsightsError {
  /** Insight */
  Insight = "Insight",
}

/**
 * the query kind \
 * {@link KnownGetInsightsError} can be used interchangeably with GetInsightsError,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Insight**: Insight
 */
export type GetInsightsError = string;

export function entityInsightItemArrayDeserializer(result: Array<EntityInsightItem>): any[] {
  return result.map((item) => {
    return entityInsightItemDeserializer(item);
  });
}

/** Entity insight Item. */
export interface EntityInsightItem {
  /** The query id of the insight */
  queryId?: string;
  /** The Time interval that the query actually executed on. */
  queryTimeInterval?: EntityInsightItemQueryTimeInterval;
  /** Query results for table insights query. */
  tableQueryResults?: InsightsTableResult;
  /** Query results for table insights query. */
  chartQueryResults?: InsightsTableResult[];
}

export function entityInsightItemDeserializer(item: any): EntityInsightItem {
  return {
    queryId: item["queryId"],
    queryTimeInterval: !item["queryTimeInterval"]
      ? item["queryTimeInterval"]
      : entityInsightItemQueryTimeIntervalDeserializer(item["queryTimeInterval"]),
    tableQueryResults: !item["tableQueryResults"]
      ? item["tableQueryResults"]
      : insightsTableResultDeserializer(item["tableQueryResults"]),
    chartQueryResults: !item["chartQueryResults"]
      ? item["chartQueryResults"]
      : insightsTableResultArrayDeserializer(item["chartQueryResults"]),
  };
}

/** The Time interval that the query actually executed on. */
export interface EntityInsightItemQueryTimeInterval {
  /** Insight query start time */
  startTime?: Date;
  /** Insight query end time */
  endTime?: Date;
}

export function entityInsightItemQueryTimeIntervalDeserializer(
  item: any,
): EntityInsightItemQueryTimeInterval {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
  };
}

/** Query results for table insights query. */
export interface InsightsTableResult {
  /** Columns Metadata of the table */
  columns?: InsightsTableResultColumnsItem[];
  /** Rows data of the table */
  rows?: string[][];
}

export function insightsTableResultDeserializer(item: any): InsightsTableResult {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : insightsTableResultColumnsItemArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function insightsTableResultColumnsItemArrayDeserializer(
  result: Array<InsightsTableResultColumnsItem>,
): any[] {
  return result.map((item) => {
    return insightsTableResultColumnsItemDeserializer(item);
  });
}

/** model interface InsightsTableResultColumnsItem */
export interface InsightsTableResultColumnsItem {
  /** the type of the column */
  type?: string;
  /** the name of the column */
  name?: string;
}

export function insightsTableResultColumnsItemDeserializer(
  item: any,
): InsightsTableResultColumnsItem {
  return {
    type: item["type"],
    name: item["name"],
  };
}

export function insightsTableResultArrayDeserializer(result: Array<InsightsTableResult>): any[] {
  return result.map((item) => {
    return insightsTableResultDeserializer(item);
  });
}

/** Specific entity query. */
export interface EntityQuery extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: Expansion, Activity */
  kind: EntityQueryKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function entityQueryDeserializer(item: any): EntityQuery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for EntityQueryUnion */
export type EntityQueryUnion = ExpansionEntityQuery | ActivityEntityQuery | EntityQuery;

export function entityQueryUnionDeserializer(item: any): EntityQueryUnion {
  switch (item["kind"]) {
    case "Expansion":
      return expansionEntityQueryDeserializer(item as ExpansionEntityQuery);

    case "Activity":
      return activityEntityQueryDeserializer(item as ActivityEntityQuery);

    default:
      return entityQueryDeserializer(item);
  }
}

/** Represents Expansion entity query. */
export interface ExpansionEntityQuery extends EntityQuery {
  /** the entity query kind */
  kind: "Expansion";
  /** List of the data sources that are required to run the query */
  dataSources?: string[];
  /** The query display name */
  displayName?: string;
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  inputFields?: string[];
  /** List of the desired output types to be constructed from the result */
  outputEntityTypes?: EntityType[];
  /** The template query string to be parsed and formatted */
  queryTemplate?: string;
}

export function expansionEntityQueryDeserializer(item: any): ExpansionEntityQuery {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _expansionEntityQueryPropertiesDeserializer(item["properties"])),
  };
}

/** Describes expansion entity query properties */
export interface ExpansionEntityQueriesProperties {
  /** List of the data sources that are required to run the query */
  dataSources?: string[];
  /** The query display name */
  displayName?: string;
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  inputFields?: string[];
  /** List of the desired output types to be constructed from the result */
  outputEntityTypes?: EntityType[];
  /** The template query string to be parsed and formatted */
  queryTemplate?: string;
}

export function expansionEntityQueriesPropertiesDeserializer(
  item: any,
): ExpansionEntityQueriesProperties {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    inputEntityType: item["inputEntityType"],
    inputFields: !item["inputFields"]
      ? item["inputFields"]
      : item["inputFields"].map((p: any) => {
          return p;
        }),
    outputEntityTypes: !item["outputEntityTypes"]
      ? item["outputEntityTypes"]
      : item["outputEntityTypes"].map((p: any) => {
          return p;
        }),
    queryTemplate: item["queryTemplate"],
  };
}

/** Represents Activity entity query. */
export interface ActivityEntityQuery extends EntityQuery {
  /** the entity query kind */
  kind: "Activity";
  /** The entity query title */
  title?: string;
  /** The entity query content to display in timeline */
  content?: string;
  /** The entity query description */
  description?: string;
  /** The Activity query definitions */
  queryDefinitions?: ActivityEntityQueriesPropertiesQueryDefinitions;
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: Record<string, string[]>;
  /** The template id this activity was created from */
  templateName?: string;
  /** Determines whether this activity is enabled or disabled. */
  enabled?: boolean;
  /** The time the activity was created */
  readonly createdTimeUtc?: Date;
  /** The last time the activity was updated */
  readonly lastModifiedTimeUtc?: Date;
}

export function activityEntityQueryDeserializer(item: any): ActivityEntityQuery {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _activityEntityQueryPropertiesDeserializer(item["properties"])),
  };
}

/** Describes activity entity query properties */
export interface ActivityEntityQueriesProperties {
  /** The entity query title */
  title?: string;
  /** The entity query content to display in timeline */
  content?: string;
  /** The entity query description */
  description?: string;
  /** The Activity query definitions */
  queryDefinitions?: ActivityEntityQueriesPropertiesQueryDefinitions;
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: Record<string, string[]>;
  /** The template id this activity was created from */
  templateName?: string;
  /** Determines whether this activity is enabled or disabled. */
  enabled?: boolean;
  /** The time the activity was created */
  readonly createdTimeUtc?: Date;
  /** The last time the activity was updated */
  readonly lastModifiedTimeUtc?: Date;
}

export function activityEntityQueriesPropertiesSerializer(
  item: ActivityEntityQueriesProperties,
): any {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsSerializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
    entitiesFilter: item["entitiesFilter"],
    templateName: item["templateName"],
    enabled: item["enabled"],
  };
}

export function activityEntityQueriesPropertiesDeserializer(
  item: any,
): ActivityEntityQueriesProperties {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsDeserializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: !item["entitiesFilter"]
      ? item["entitiesFilter"]
      : Object.fromEntries(
          Object.entries(item["entitiesFilter"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    templateName: item["templateName"],
    enabled: item["enabled"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
  };
}

/** The Activity query definitions */
export interface ActivityEntityQueriesPropertiesQueryDefinitions {
  /** The Activity query to run on a given entity */
  query?: string;
}

export function activityEntityQueriesPropertiesQueryDefinitionsSerializer(
  item: ActivityEntityQueriesPropertiesQueryDefinitions,
): any {
  return { query: item["query"] };
}

export function activityEntityQueriesPropertiesQueryDefinitionsDeserializer(
  item: any,
): ActivityEntityQueriesPropertiesQueryDefinitions {
  return {
    query: item["query"],
  };
}

/** Specific entity query that supports put requests. */
export interface CustomEntityQuery extends ResourceWithEtag {
  /** the entity query kind */
  /** The discriminator possible values: Activity */
  kind: CustomEntityQueryKind;
}

export function customEntityQuerySerializer(item: CustomEntityQuery): any {
  return { etag: item["etag"], kind: item["kind"] };
}

/** Alias for CustomEntityQueryUnion */
export type CustomEntityQueryUnion = ActivityCustomEntityQuery | CustomEntityQuery;

export function customEntityQueryUnionSerializer(item: CustomEntityQueryUnion): any {
  switch (item.kind) {
    case "Activity":
      return activityCustomEntityQuerySerializer(item as ActivityCustomEntityQuery);

    default:
      return customEntityQuerySerializer(item);
  }
}

/** The kind of the entity query that supports put request. */
export enum KnownCustomEntityQueryKind {
  /** Activity */
  Activity = "Activity",
}

/**
 * The kind of the entity query that supports put request. \
 * {@link KnownCustomEntityQueryKind} can be used interchangeably with CustomEntityQueryKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activity**: Activity
 */
export type CustomEntityQueryKind = string;

/** Represents Activity entity query. */
export interface ActivityCustomEntityQuery extends CustomEntityQuery {
  /** the entity query kind */
  kind: "Activity";
  /** The entity query title */
  title?: string;
  /** The entity query content to display in timeline */
  content?: string;
  /** The entity query description */
  description?: string;
  /** The Activity query definitions */
  queryDefinitions?: ActivityEntityQueriesPropertiesQueryDefinitions;
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: Record<string, string[]>;
  /** The template id this activity was created from */
  templateName?: string;
  /** Determines whether this activity is enabled or disabled. */
  enabled?: boolean;
  /** The time the activity was created */
  readonly createdTimeUtc?: Date;
  /** The last time the activity was updated */
  readonly lastModifiedTimeUtc?: Date;
}

export function activityCustomEntityQuerySerializer(item: ActivityCustomEntityQuery): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "title",
      "content",
      "description",
      "queryDefinitions",
      "inputEntityType",
      "requiredInputFieldsSets",
      "entitiesFilter",
      "templateName",
      "enabled",
    ])
      ? undefined
      : _activityCustomEntityQueryPropertiesSerializer(item),
  };
}

/** An azure resource object with an Etag property */
export interface ResourceWithEtag extends Resource {
  /** Etag of the azure resource */
  etag?: string;
}

export function resourceWithEtagSerializer(item: ResourceWithEtag): any {
  return { etag: item["etag"] };
}

/** List of all the entity queries. */
export interface _EntityQueryList {
  /** The EntityQuery items on this page */
  value: EntityQueryUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _entityQueryListDeserializer(item: any): _EntityQueryList {
  return {
    value: entityQueryUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function entityQueryUnionArrayDeserializer(result: Array<EntityQueryUnion>): any[] {
  return result.map((item) => {
    return entityQueryUnionDeserializer(item);
  });
}

/** Specific entity query template. */
export interface EntityQueryTemplate extends ProxyResource {
  /** The kind of the entity query template. */
  /** The discriminator possible values: Activity */
  kind: EntityQueryTemplateKind;
}

export function entityQueryTemplateDeserializer(item: any): EntityQueryTemplate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for EntityQueryTemplateUnion */
export type EntityQueryTemplateUnion = ActivityEntityQueryTemplate | EntityQueryTemplate;

export function entityQueryTemplateUnionDeserializer(item: any): EntityQueryTemplateUnion {
  switch (item["kind"]) {
    case "Activity":
      return activityEntityQueryTemplateDeserializer(item as ActivityEntityQueryTemplate);

    default:
      return entityQueryTemplateDeserializer(item);
  }
}

/** Known values of {@link EntityQueryTemplateKind} that the service accepts. */
export enum KnownEntityQueryTemplateKind {
  /** Activity */
  Activity = "Activity",
  /** Insight */
  Insight = "Insight",
  /** SecurityAlert */
  SecurityAlert = "SecurityAlert",
  /** Bookmark */
  Bookmark = "Bookmark",
  /** Expansion */
  Expansion = "Expansion",
  /** GuidedInsight */
  GuidedInsight = "GuidedInsight",
  /** Anomaly */
  Anomaly = "Anomaly",
}

/** Type of EntityQueryTemplateKind */
export type EntityQueryTemplateKind = string;

/** Represents Activity entity query. */
export interface ActivityEntityQueryTemplate extends EntityQueryTemplate {
  /** the entity query template kind */
  kind: "Activity";
  /** The entity query title */
  title?: string;
  /** The entity query content to display in timeline */
  content?: string;
  /** The entity query description */
  description?: string;
  /** The Activity query definitions */
  queryDefinitions?: ActivityEntityQueryTemplatePropertiesQueryDefinitions;
  /** List of required data types for the given entity query template */
  dataTypes?: DataTypeDefinitions[];
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: Record<string, string[]>;
}

export function activityEntityQueryTemplateDeserializer(item: any): ActivityEntityQueryTemplate {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _activityEntityQueryTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** Describes activity entity query properties */
export interface ActivityEntityQueryTemplateProperties {
  /** The entity query title */
  title?: string;
  /** The entity query content to display in timeline */
  content?: string;
  /** The entity query description */
  description?: string;
  /** The Activity query definitions */
  queryDefinitions?: ActivityEntityQueryTemplatePropertiesQueryDefinitions;
  /** List of required data types for the given entity query template */
  dataTypes?: DataTypeDefinitions[];
  /** The type of the query's source entity */
  inputEntityType?: EntityType;
  /** List of the fields of the source entity that are required to run the query */
  requiredInputFieldsSets?: string[][];
  /** The query applied only to entities matching to all filters */
  entitiesFilter?: Record<string, string[]>;
}

export function activityEntityQueryTemplatePropertiesDeserializer(
  item: any,
): ActivityEntityQueryTemplateProperties {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueryTemplatePropertiesQueryDefinitionsDeserializer(item["queryDefinitions"]),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : dataTypeDefinitionsArrayDeserializer(item["dataTypes"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: !item["entitiesFilter"]
      ? item["entitiesFilter"]
      : Object.fromEntries(
          Object.entries(item["entitiesFilter"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
  };
}

/** The Activity query definitions */
export interface ActivityEntityQueryTemplatePropertiesQueryDefinitions {
  /** The Activity query to run on a given entity */
  query?: string;
  /** The dimensions we want to summarize the timeline results on, this is comma separated list */
  summarizeBy?: string;
}

export function activityEntityQueryTemplatePropertiesQueryDefinitionsDeserializer(
  item: any,
): ActivityEntityQueryTemplatePropertiesQueryDefinitions {
  return {
    query: item["query"],
    summarizeBy: item["summarizeBy"],
  };
}

export function dataTypeDefinitionsArrayDeserializer(result: Array<DataTypeDefinitions>): any[] {
  return result.map((item) => {
    return dataTypeDefinitionsDeserializer(item);
  });
}

/** The data type definition */
export interface DataTypeDefinitions {
  /** The data type name */
  dataType?: string;
}

export function dataTypeDefinitionsDeserializer(item: any): DataTypeDefinitions {
  return {
    dataType: item["dataType"],
  };
}

/** List of all the entity query templates. */
export interface _EntityQueryTemplateList {
  /** The EntityQueryTemplate items on this page */
  value: EntityQueryTemplateUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _entityQueryTemplateListDeserializer(item: any): _EntityQueryTemplateList {
  return {
    value: entityQueryTemplateUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function entityQueryTemplateUnionArrayDeserializer(
  result: Array<EntityQueryTemplateUnion>,
): any[] {
  return result.map((item) => {
    return entityQueryTemplateUnionDeserializer(item);
  });
}

/** Represents a file import in Azure Security Insights. */
export interface FileImport extends ProxyResource {
  /** Describes how to ingest the records in the file. */
  ingestionMode?: IngestionMode;
  /** The content type of this file. */
  contentType?: FileImportContentType;
  /** The time the file was imported. */
  readonly createdTimeUTC?: Date;
  /** Represents the error file (if the import was ingested with errors or failed the validation). */
  readonly errorFile?: FileMetadata;
  /** An ordered list of some of the errors that were encountered during validation. */
  readonly errorsPreview?: ValidationError[];
  /** Represents the imported file. */
  importFile?: FileMetadata;
  /** The number of records that have been successfully ingested. */
  readonly ingestedRecordCount?: number;
  /** The source for the data in the file. */
  source?: string;
  /** The state of the file import. */
  readonly state?: FileImportState;
  /** The number of records in the file. */
  readonly totalRecordCount?: number;
  /** The number of records that have passed validation. */
  readonly validRecordCount?: number;
  /** The time the files associated with this import are deleted from the storage account. */
  readonly filesValidUntilTimeUTC?: Date;
  /** The time the file import record is soft deleted from the database and history. */
  readonly importValidUntilTimeUTC?: Date;
}

export function fileImportSerializer(item: FileImport): any {
  return {
    properties: areAllPropsUndefined(item, ["ingestionMode", "contentType", "importFile", "source"])
      ? undefined
      : _fileImportPropertiesSerializer(item),
  };
}

export function fileImportDeserializer(item: any): FileImport {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileImportPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the FileImport's properties */
export interface FileImportProperties {
  /** Describes how to ingest the records in the file. */
  ingestionMode: IngestionMode;
  /** The content type of this file. */
  contentType: FileImportContentType;
  /** The time the file was imported. */
  readonly createdTimeUTC?: Date;
  /** Represents the error file (if the import was ingested with errors or failed the validation). */
  readonly errorFile?: FileMetadata;
  /** An ordered list of some of the errors that were encountered during validation. */
  readonly errorsPreview?: ValidationError[];
  /** Represents the imported file. */
  importFile: FileMetadata;
  /** The number of records that have been successfully ingested. */
  readonly ingestedRecordCount?: number;
  /** The source for the data in the file. */
  source: string;
  /** The state of the file import. */
  readonly state?: FileImportState;
  /** The number of records in the file. */
  readonly totalRecordCount?: number;
  /** The number of records that have passed validation. */
  readonly validRecordCount?: number;
  /** The time the files associated with this import are deleted from the storage account. */
  readonly filesValidUntilTimeUTC?: Date;
  /** The time the file import record is soft deleted from the database and history. */
  readonly importValidUntilTimeUTC?: Date;
}

export function fileImportPropertiesSerializer(item: FileImportProperties): any {
  return {
    ingestionMode: item["ingestionMode"],
    contentType: item["contentType"],
    importFile: fileMetadataSerializer(item["importFile"]),
    source: item["source"],
  };
}

export function fileImportPropertiesDeserializer(item: any): FileImportProperties {
  return {
    ingestionMode: item["ingestionMode"],
    contentType: item["contentType"],
    createdTimeUTC: !item["createdTimeUTC"]
      ? item["createdTimeUTC"]
      : new Date(item["createdTimeUTC"]),
    errorFile: !item["errorFile"] ? item["errorFile"] : fileMetadataDeserializer(item["errorFile"]),
    errorsPreview: !item["errorsPreview"]
      ? item["errorsPreview"]
      : validationErrorArrayDeserializer(item["errorsPreview"]),
    importFile: fileMetadataDeserializer(item["importFile"]),
    ingestedRecordCount: item["ingestedRecordCount"],
    source: item["source"],
    state: item["state"],
    totalRecordCount: item["totalRecordCount"],
    validRecordCount: item["validRecordCount"],
    filesValidUntilTimeUTC: !item["filesValidUntilTimeUTC"]
      ? item["filesValidUntilTimeUTC"]
      : new Date(item["filesValidUntilTimeUTC"]),
    importValidUntilTimeUTC: !item["importValidUntilTimeUTC"]
      ? item["importValidUntilTimeUTC"]
      : new Date(item["importValidUntilTimeUTC"]),
  };
}

/** Describes how to ingest the records in the file. */
export enum KnownIngestionMode {
  /** No records should be ingested when invalid records are detected. */
  IngestOnlyIfAllAreValid = "IngestOnlyIfAllAreValid",
  /** Valid records should still be ingested when invalid records are detected. */
  IngestAnyValidRecords = "IngestAnyValidRecords",
  /** Unspecified */
  Unspecified = "Unspecified",
}

/**
 * Describes how to ingest the records in the file. \
 * {@link KnownIngestionMode} can be used interchangeably with IngestionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IngestOnlyIfAllAreValid**: No records should be ingested when invalid records are detected. \
 * **IngestAnyValidRecords**: Valid records should still be ingested when invalid records are detected. \
 * **Unspecified**: Unspecified
 */
export type IngestionMode = string;

/** The content type of this file. */
export enum KnownFileImportContentType {
  /** File containing records with the core fields of an indicator, plus the observables to construct the STIX pattern. */
  BasicIndicator = "BasicIndicator",
  /** File containing STIX indicators. */
  StixIndicator = "StixIndicator",
  /** File containing other records. */
  Unspecified = "Unspecified",
}

/**
 * The content type of this file. \
 * {@link KnownFileImportContentType} can be used interchangeably with FileImportContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BasicIndicator**: File containing records with the core fields of an indicator, plus the observables to construct the STIX pattern. \
 * **StixIndicator**: File containing STIX indicators. \
 * **Unspecified**: File containing other records.
 */
export type FileImportContentType = string;

/** Represents a file. */
export interface FileMetadata {
  /** The format of the file */
  fileFormat?: FileFormat;
  /** The name of the file. */
  fileName?: string;
  /** The size of the file. */
  fileSize?: number;
  /** A URI with a valid SAS token to allow uploading / downloading the file. */
  readonly fileContentUri?: string;
  /** Indicates whether the file was deleted from the storage account. */
  readonly deleteStatus?: DeleteStatus;
}

export function fileMetadataSerializer(item: FileMetadata): any {
  return { fileFormat: item["fileFormat"], fileName: item["fileName"], fileSize: item["fileSize"] };
}

export function fileMetadataDeserializer(item: any): FileMetadata {
  return {
    fileFormat: item["fileFormat"],
    fileName: item["fileName"],
    fileSize: item["fileSize"],
    fileContentUri: item["fileContentUri"],
    deleteStatus: item["deleteStatus"],
  };
}

/** The format of the file */
export enum KnownFileFormat {
  /** A CSV file. */
  CSV = "CSV",
  /** A JSON file. */
  Json = "JSON",
  /** A file of other format. */
  Unspecified = "Unspecified",
}

/**
 * The format of the file \
 * {@link KnownFileFormat} can be used interchangeably with FileFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CSV**: A CSV file. \
 * **JSON**: A JSON file. \
 * **Unspecified**: A file of other format.
 */
export type FileFormat = string;

/** Indicates whether the file was deleted from the storage account. */
export enum KnownDeleteStatus {
  /** The file was deleted. */
  Deleted = "Deleted",
  /** The file was not deleted. */
  NotDeleted = "NotDeleted",
  /** Unspecified */
  Unspecified = "Unspecified",
}

/**
 * Indicates whether the file was deleted from the storage account. \
 * {@link KnownDeleteStatus} can be used interchangeably with DeleteStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deleted**: The file was deleted. \
 * **NotDeleted**: The file was not deleted. \
 * **Unspecified**: Unspecified
 */
export type DeleteStatus = string;

export function validationErrorArrayDeserializer(result: Array<ValidationError>): any[] {
  return result.map((item) => {
    return validationErrorDeserializer(item);
  });
}

/** Describes an error encountered in the file during validation. */
export interface ValidationError {
  /** The number of the record that has the error. */
  recordIndex?: number;
  /** A list of descriptions of the error. */
  readonly errorMessages?: string[];
}

export function validationErrorDeserializer(item: any): ValidationError {
  return {
    recordIndex: item["recordIndex"],
    errorMessages: !item["errorMessages"]
      ? item["errorMessages"]
      : item["errorMessages"].map((p: any) => {
          return p;
        }),
  };
}

/** The state of the file import. */
export enum KnownFileImportState {
  /** A fatal error has occurred while ingesting the file. */
  FatalError = "FatalError",
  /** The file has been ingested. */
  Ingested = "Ingested",
  /** The file has been ingested with errors. */
  IngestedWithErrors = "IngestedWithErrors",
  /** The file ingestion is in progress. */
  InProgress = "InProgress",
  /** The file is invalid. */
  Invalid = "Invalid",
  /** Waiting for the file to be uploaded. */
  WaitingForUpload = "WaitingForUpload",
  /** Unspecified state. */
  Unspecified = "Unspecified",
}

/**
 * The state of the file import. \
 * {@link KnownFileImportState} can be used interchangeably with FileImportState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FatalError**: A fatal error has occurred while ingesting the file. \
 * **Ingested**: The file has been ingested. \
 * **IngestedWithErrors**: The file has been ingested with errors. \
 * **InProgress**: The file ingestion is in progress. \
 * **Invalid**: The file is invalid. \
 * **WaitingForUpload**: Waiting for the file to be uploaded. \
 * **Unspecified**: Unspecified state.
 */
export type FileImportState = string;

/** List all the file imports. */
export interface _FileImportList {
  /** The FileImport items on this page */
  value: FileImport[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fileImportListDeserializer(item: any): _FileImportList {
  return {
    value: fileImportArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fileImportArraySerializer(result: Array<FileImport>): any[] {
  return result.map((item) => {
    return fileImportSerializer(item);
  });
}

export function fileImportArrayDeserializer(result: Array<FileImport>): any[] {
  return result.map((item) => {
    return fileImportDeserializer(item);
  });
}

/** Represents a Hunt in Azure Security Insights. */
export interface Hunt extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The display name of the hunt */
  displayName?: string;
  /** The description of the hunt */
  description?: string;
  /** The status of the hunt. */
  status?: Status;
  /** The hypothesis status of the hunt. */
  hypothesisStatus?: HypothesisStatus;
  /** A list of mitre attack tactics the hunt is associated with */
  attackTactics?: AttackTactic[];
  /** A list of a mitre attack techniques the hunt is associated with */
  attackTechniques?: string[];
  /** List of labels relevant to this hunt */
  labels?: string[];
  /** Describes a user that the hunt is assigned to */
  owner?: HuntOwner;
}

export function huntSerializer(item: Hunt): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "status",
      "hypothesisStatus",
      "attackTactics",
      "attackTechniques",
      "labels",
      "owner",
    ])
      ? undefined
      : _huntPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function huntDeserializer(item: any): Hunt {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _huntPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes hunt properties */
export interface HuntProperties {
  /** The display name of the hunt */
  displayName: string;
  /** The description of the hunt */
  description: string;
  /** The status of the hunt. */
  status?: Status;
  /** The hypothesis status of the hunt. */
  hypothesisStatus?: HypothesisStatus;
  /** A list of mitre attack tactics the hunt is associated with */
  attackTactics?: AttackTactic[];
  /** A list of a mitre attack techniques the hunt is associated with */
  attackTechniques?: string[];
  /** List of labels relevant to this hunt */
  labels?: string[];
  /** Describes a user that the hunt is assigned to */
  owner?: HuntOwner;
}

export function huntPropertiesSerializer(item: HuntProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    status: item["status"],
    hypothesisStatus: item["hypothesisStatus"],
    attackTactics: !item["attackTactics"]
      ? item["attackTactics"]
      : item["attackTactics"].map((p: any) => {
          return p;
        }),
    attackTechniques: !item["attackTechniques"]
      ? item["attackTechniques"]
      : item["attackTechniques"].map((p: any) => {
          return p;
        }),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    owner: !item["owner"] ? item["owner"] : huntOwnerSerializer(item["owner"]),
  };
}

export function huntPropertiesDeserializer(item: any): HuntProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    status: item["status"],
    hypothesisStatus: item["hypothesisStatus"],
    attackTactics: !item["attackTactics"]
      ? item["attackTactics"]
      : item["attackTactics"].map((p: any) => {
          return p;
        }),
    attackTechniques: !item["attackTechniques"]
      ? item["attackTechniques"]
      : item["attackTechniques"].map((p: any) => {
          return p;
        }),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    owner: !item["owner"] ? item["owner"] : huntOwnerDeserializer(item["owner"]),
  };
}

/** The status of the hunt. */
export enum KnownStatus {
  /** New */
  New = "New",
  /** Active */
  Active = "Active",
  /** Closed */
  Closed = "Closed",
  /** Backlog */
  Backlog = "Backlog",
  /** Approved */
  Approved = "Approved",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The status of the hunt. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Active**: Active \
 * **Closed**: Closed \
 * **Backlog**: Backlog \
 * **Approved**: Approved \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **InProgress**: InProgress
 */
export type Status = string;

/** The hypothesis status of the hunt. */
export enum KnownHypothesisStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Invalidated */
  Invalidated = "Invalidated",
  /** Validated */
  Validated = "Validated",
}

/**
 * The hypothesis status of the hunt. \
 * {@link KnownHypothesisStatus} can be used interchangeably with HypothesisStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Invalidated**: Invalidated \
 * **Validated**: Validated
 */
export type HypothesisStatus = string;

/** Describes a user that the hunt is assigned to */
export interface HuntOwner {
  /** The email of the user the hunt is assigned to. */
  email?: string;
  /** The name of the user the hunt is assigned to. */
  assignedTo?: string;
  /** The object id of the user the hunt is assigned to. */
  objectId?: string;
  /** The user principal name of the user the hunt is assigned to. */
  userPrincipalName?: string;
  /** The type of the owner the hunt is assigned to. */
  ownerType?: OwnerType;
}

export function huntOwnerSerializer(item: HuntOwner): any {
  return {
    email: item["email"],
    assignedTo: item["assignedTo"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
    ownerType: item["ownerType"],
  };
}

export function huntOwnerDeserializer(item: any): HuntOwner {
  return {
    email: item["email"],
    assignedTo: item["assignedTo"],
    objectId: item["objectId"],
    userPrincipalName: item["userPrincipalName"],
    ownerType: item["ownerType"],
  };
}

/** List all the hunts. */
export interface _HuntList {
  /** The Hunt items on this page */
  value: Hunt[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _huntListDeserializer(item: any): _HuntList {
  return {
    value: huntArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function huntArraySerializer(result: Array<Hunt>): any[] {
  return result.map((item) => {
    return huntSerializer(item);
  });
}

export function huntArrayDeserializer(result: Array<Hunt>): any[] {
  return result.map((item) => {
    return huntDeserializer(item);
  });
}

/** Represents a Hunt Comment in Azure Security Insights */
export interface HuntComment extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The message for the comment */
  message?: string;
}

export function huntCommentSerializer(item: HuntComment): any {
  return {
    properties: areAllPropsUndefined(item, ["message"])
      ? undefined
      : _huntCommentPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function huntCommentDeserializer(item: any): HuntComment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _huntCommentPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes a hunt comment properties */
export interface HuntCommentProperties {
  /** The message for the comment */
  message: string;
}

export function huntCommentPropertiesSerializer(item: HuntCommentProperties): any {
  return { message: item["message"] };
}

export function huntCommentPropertiesDeserializer(item: any): HuntCommentProperties {
  return {
    message: item["message"],
  };
}

/** List of all hunt comments */
export interface _HuntCommentList {
  /** The HuntComment items on this page */
  value: HuntComment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _huntCommentListDeserializer(item: any): _HuntCommentList {
  return {
    value: huntCommentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function huntCommentArraySerializer(result: Array<HuntComment>): any[] {
  return result.map((item) => {
    return huntCommentSerializer(item);
  });
}

export function huntCommentArrayDeserializer(result: Array<HuntComment>): any[] {
  return result.map((item) => {
    return huntCommentDeserializer(item);
  });
}

/** Represents a Hunt Relation in Azure Security Insights. */
export interface HuntRelation extends ProxyResource {
  /** The id of the related resource */
  relatedResourceId?: string;
  /** The name of the related resource */
  readonly relatedResourceName?: string;
  /** The type of the hunt relation */
  readonly relationType?: string;
  /** The resource that the relation is related to */
  readonly relatedResourceKind?: string;
  /** List of labels relevant to this hunt */
  labels?: string[];
}

export function huntRelationSerializer(item: HuntRelation): any {
  return {
    properties: areAllPropsUndefined(item, ["relatedResourceId", "labels"])
      ? undefined
      : _huntRelationPropertiesSerializer(item),
  };
}

export function huntRelationDeserializer(item: any): HuntRelation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _huntRelationPropertiesDeserializer(item["properties"])),
  };
}

/** Describes hunt relation properties */
export interface HuntRelationProperties {
  /** The id of the related resource */
  relatedResourceId: string;
  /** The name of the related resource */
  readonly relatedResourceName?: string;
  /** The type of the hunt relation */
  readonly relationType?: string;
  /** The resource that the relation is related to */
  readonly relatedResourceKind?: string;
  /** List of labels relevant to this hunt */
  labels?: string[];
}

export function huntRelationPropertiesSerializer(item: HuntRelationProperties): any {
  return {
    relatedResourceId: item["relatedResourceId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
  };
}

export function huntRelationPropertiesDeserializer(item: any): HuntRelationProperties {
  return {
    relatedResourceId: item["relatedResourceId"],
    relatedResourceName: item["relatedResourceName"],
    relationType: item["relationType"],
    relatedResourceKind: item["relatedResourceKind"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
  };
}

/** List of all the hunt relations */
export interface _HuntRelationList {
  /** The HuntRelation items on this page */
  value: HuntRelation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _huntRelationListDeserializer(item: any): _HuntRelationList {
  return {
    value: huntRelationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function huntRelationArraySerializer(result: Array<HuntRelation>): any[] {
  return result.map((item) => {
    return huntRelationSerializer(item);
  });
}

export function huntRelationArrayDeserializer(result: Array<HuntRelation>): any[] {
  return result.map((item) => {
    return huntRelationDeserializer(item);
  });
}

/** Consent for Office365 tenant that already made. */
export interface OfficeConsent extends ProxyResource {
  /** The tenantId of the Office365 with the consent. */
  tenantId?: string;
  /** Help to easily cascade among the data layers. */
  consentId?: string;
}

export function officeConsentDeserializer(item: any): OfficeConsent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _officeConsentPropertiesDeserializer(item["properties"])),
  };
}

/** Consent property bag. */
export interface OfficeConsentProperties {
  /** The tenantId of the Office365 with the consent. */
  tenantId?: string;
  /** Help to easily cascade among the data layers. */
  consentId?: string;
}

export function officeConsentPropertiesDeserializer(item: any): OfficeConsentProperties {
  return {
    tenantId: item["tenantId"],
    consentId: item["consentId"],
  };
}

/** List of all the office365 consents. */
export interface _OfficeConsentList {
  /** The OfficeConsent items on this page */
  value: OfficeConsent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _officeConsentListDeserializer(item: any): _OfficeConsentList {
  return {
    value: officeConsentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function officeConsentArrayDeserializer(result: Array<OfficeConsent>): any[] {
  return result.map((item) => {
    return officeConsentDeserializer(item);
  });
}

/** The Setting. */
export interface Settings extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: Anomalies, EyesOn, EntityAnalytics, Ueba */
  kind: SettingKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function settingsSerializer(item: Settings): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function settingsDeserializer(item: any): Settings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for SettingsUnion */
export type SettingsUnion = Anomalies | EyesOn | EntityAnalytics | Ueba | Settings;

export function settingsUnionSerializer(item: SettingsUnion): any {
  switch (item.kind) {
    case "Anomalies":
      return anomaliesSerializer(item as Anomalies);

    case "EyesOn":
      return eyesOnSerializer(item as EyesOn);

    case "EntityAnalytics":
      return entityAnalyticsSerializer(item as EntityAnalytics);

    case "Ueba":
      return uebaSerializer(item as Ueba);

    default:
      return settingsSerializer(item);
  }
}

export function settingsUnionDeserializer(item: any): SettingsUnion {
  switch (item["kind"]) {
    case "Anomalies":
      return anomaliesDeserializer(item as Anomalies);

    case "EyesOn":
      return eyesOnDeserializer(item as EyesOn);

    case "EntityAnalytics":
      return entityAnalyticsDeserializer(item as EntityAnalytics);

    case "Ueba":
      return uebaDeserializer(item as Ueba);

    default:
      return settingsDeserializer(item);
  }
}

/** The kind of the setting */
export enum KnownSettingKind {
  /** Anomalies */
  Anomalies = "Anomalies",
  /** EyesOn */
  EyesOn = "EyesOn",
  /** EntityAnalytics */
  EntityAnalytics = "EntityAnalytics",
  /** Ueba */
  Ueba = "Ueba",
}

/**
 * The kind of the setting \
 * {@link KnownSettingKind} can be used interchangeably with SettingKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Anomalies**: Anomalies \
 * **EyesOn**: EyesOn \
 * **EntityAnalytics**: EntityAnalytics \
 * **Ueba**: Ueba
 */
export type SettingKind = string;

/** Settings with single toggle. */
export interface Anomalies extends Settings {
  /** The kind of the setting */
  kind: "Anomalies";
  /** Determines whether the setting is enable or disabled. */
  readonly isEnabled?: boolean;
}

export function anomaliesSerializer(item: Anomalies): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, []) ? undefined : _anomaliesPropertiesSerializer(item),
  };
}

export function anomaliesDeserializer(item: any): Anomalies {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _anomaliesPropertiesDeserializer(item["properties"])),
  };
}

/** Anomalies property bag. */
export interface AnomaliesSettingsProperties {
  /** Determines whether the setting is enable or disabled. */
  readonly isEnabled?: boolean;
}

export function anomaliesSettingsPropertiesSerializer(item: AnomaliesSettingsProperties): any {
  return item;
}

export function anomaliesSettingsPropertiesDeserializer(item: any): AnomaliesSettingsProperties {
  return {
    isEnabled: item["isEnabled"],
  };
}

/** Settings with single toggle. */
export interface EyesOn extends Settings {
  /** The kind of the setting */
  kind: "EyesOn";
  /** Determines whether the setting is enable or disabled. */
  readonly isEnabled?: boolean;
}

export function eyesOnSerializer(item: EyesOn): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, []) ? undefined : _eyesOnPropertiesSerializer(item),
  };
}

export function eyesOnDeserializer(item: any): EyesOn {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eyesOnPropertiesDeserializer(item["properties"])),
  };
}

/** EyesOn property bag. */
export interface EyesOnSettingsProperties {
  /** Determines whether the setting is enable or disabled. */
  readonly isEnabled?: boolean;
}

export function eyesOnSettingsPropertiesSerializer(item: EyesOnSettingsProperties): any {
  return item;
}

export function eyesOnSettingsPropertiesDeserializer(item: any): EyesOnSettingsProperties {
  return {
    isEnabled: item["isEnabled"],
  };
}

/** Settings with single toggle. */
export interface EntityAnalytics extends Settings {
  /** The kind of the setting */
  kind: "EntityAnalytics";
  /** The relevant entity providers that are synced */
  entityProviders?: EntityProviders[];
}

export function entityAnalyticsSerializer(item: EntityAnalytics): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["entityProviders"])
      ? undefined
      : _entityAnalyticsPropertiesSerializer(item),
  };
}

export function entityAnalyticsDeserializer(item: any): EntityAnalytics {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _entityAnalyticsPropertiesDeserializer(item["properties"])),
  };
}

/** EntityAnalytics property bag. */
export interface EntityAnalyticsProperties {
  /** The relevant entity providers that are synced */
  entityProviders?: EntityProviders[];
}

export function entityAnalyticsPropertiesSerializer(item: EntityAnalyticsProperties): any {
  return {
    entityProviders: !item["entityProviders"]
      ? item["entityProviders"]
      : item["entityProviders"].map((p: any) => {
          return p;
        }),
  };
}

export function entityAnalyticsPropertiesDeserializer(item: any): EntityAnalyticsProperties {
  return {
    entityProviders: !item["entityProviders"]
      ? item["entityProviders"]
      : item["entityProviders"].map((p: any) => {
          return p;
        }),
  };
}

/** The entity provider that is synced. */
export enum KnownEntityProviders {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
  /** AzureActiveDirectory */
  AzureActiveDirectory = "AzureActiveDirectory",
}

/**
 * The entity provider that is synced. \
 * {@link KnownEntityProviders} can be used interchangeably with EntityProviders,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: ActiveDirectory \
 * **AzureActiveDirectory**: AzureActiveDirectory
 */
export type EntityProviders = string;

/** Settings with single toggle. */
export interface Ueba extends Settings {
  /** The kind of the setting */
  kind: "Ueba";
  /** The relevant data sources that enriched by ueba */
  dataSources?: UebaDataSources[];
}

export function uebaSerializer(item: Ueba): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["dataSources"])
      ? undefined
      : _uebaPropertiesSerializer(item),
  };
}

export function uebaDeserializer(item: any): Ueba {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _uebaPropertiesDeserializer(item["properties"])),
  };
}

/** Ueba property bag. */
export interface UebaProperties {
  /** The relevant data sources that enriched by ueba */
  dataSources?: UebaDataSources[];
}

export function uebaPropertiesSerializer(item: UebaProperties): any {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
  };
}

export function uebaPropertiesDeserializer(item: any): UebaProperties {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
  };
}

/** The data source that enriched by ueba. */
export enum KnownUebaDataSources {
  /** AuditLogs */
  AuditLogs = "AuditLogs",
  /** AzureActivity */
  AzureActivity = "AzureActivity",
  /** SecurityEvent */
  SecurityEvent = "SecurityEvent",
  /** SigninLogs */
  SigninLogs = "SigninLogs",
}

/**
 * The data source that enriched by ueba. \
 * {@link KnownUebaDataSources} can be used interchangeably with UebaDataSources,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AuditLogs**: AuditLogs \
 * **AzureActivity**: AzureActivity \
 * **SecurityEvent**: SecurityEvent \
 * **SigninLogs**: SigninLogs
 */
export type UebaDataSources = string;

/** List of all the settings. */
export interface _SettingList {
  /** The Settings items on this page */
  value: SettingsUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _settingListDeserializer(item: any): _SettingList {
  return {
    value: settingsUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function settingsUnionArraySerializer(result: Array<SettingsUnion>): any[] {
  return result.map((item) => {
    return settingsUnionSerializer(item);
  });
}

export function settingsUnionArrayDeserializer(result: Array<SettingsUnion>): any[] {
  return result.map((item) => {
    return settingsUnionDeserializer(item);
  });
}

/** The triggered analytics rule run */
export interface TriggeredAnalyticsRuleRun extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  executionTimeUtc: Date;
  ruleId: string;
  triggeredAnalyticsRuleRunId: string;
  /** The triggered analytics rule run provisioning state */
  readonly provisioningState: ProvisioningState;
  /** Dictionary of <any> */
  ruleRunAdditionalData?: Record<string, any>;
}

export function triggeredAnalyticsRuleRunDeserializer(item: any): TriggeredAnalyticsRuleRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._triggeredAnalyticsRuleRunPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** The triggered analytics rule run Properties */
export interface TriggeredAnalyticsRuleRunProperties {
  executionTimeUtc: Date;
  ruleId: string;
  triggeredAnalyticsRuleRunId: string;
  /** The triggered analytics rule run provisioning state */
  readonly provisioningState: ProvisioningState;
  /** Dictionary of <any> */
  ruleRunAdditionalData?: Record<string, any>;
}

export function triggeredAnalyticsRuleRunPropertiesDeserializer(
  item: any,
): TriggeredAnalyticsRuleRunProperties {
  return {
    executionTimeUtc: new Date(item["executionTimeUtc"]),
    ruleId: item["ruleId"],
    triggeredAnalyticsRuleRunId: item["triggeredAnalyticsRuleRunId"],
    provisioningState: item["provisioningState"],
    ruleRunAdditionalData: !item["ruleRunAdditionalData"]
      ? item["ruleRunAdditionalData"]
      : Object.fromEntries(
          Object.entries(item["ruleRunAdditionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The workspace manager assignment */
export interface WorkspaceManagerAssignment extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** The resource name of the workspace manager group targeted by the workspace manager assignment */
  targetResourceName?: string;
  /** The time the last job associated to this assignment ended at */
  readonly lastJobEndTime?: Date;
  /** State of the last job associated to this assignment */
  readonly lastJobProvisioningState?: ProvisioningState;
  /** List of resources included in this workspace manager assignment */
  items?: AssignmentItem[];
}

export function workspaceManagerAssignmentSerializer(item: WorkspaceManagerAssignment): any {
  return {
    properties: areAllPropsUndefined(item, ["targetResourceName", "items"])
      ? undefined
      : _workspaceManagerAssignmentPropertiesSerializer(item),
  };
}

export function workspaceManagerAssignmentDeserializer(item: any): WorkspaceManagerAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceManagerAssignmentPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The workspace manager assignment properties */
export interface WorkspaceManagerAssignmentProperties {
  /** The resource name of the workspace manager group targeted by the workspace manager assignment */
  targetResourceName: string;
  /** The time the last job associated to this assignment ended at */
  readonly lastJobEndTime?: Date;
  /** State of the last job associated to this assignment */
  readonly lastJobProvisioningState?: ProvisioningState;
  /** List of resources included in this workspace manager assignment */
  items: AssignmentItem[];
}

export function workspaceManagerAssignmentPropertiesSerializer(
  item: WorkspaceManagerAssignmentProperties,
): any {
  return {
    targetResourceName: item["targetResourceName"],
    items: assignmentItemArraySerializer(item["items"]),
  };
}

export function workspaceManagerAssignmentPropertiesDeserializer(
  item: any,
): WorkspaceManagerAssignmentProperties {
  return {
    targetResourceName: item["targetResourceName"],
    lastJobEndTime: !item["lastJobEndTime"]
      ? item["lastJobEndTime"]
      : new Date(item["lastJobEndTime"]),
    lastJobProvisioningState: item["lastJobProvisioningState"],
    items: assignmentItemArrayDeserializer(item["items"]),
  };
}

export function assignmentItemArraySerializer(result: Array<AssignmentItem>): any[] {
  return result.map((item) => {
    return assignmentItemSerializer(item);
  });
}

export function assignmentItemArrayDeserializer(result: Array<AssignmentItem>): any[] {
  return result.map((item) => {
    return assignmentItemDeserializer(item);
  });
}

/** An entity describing a content item. */
export interface AssignmentItem {
  /** The resource id of the content item */
  resourceId?: string;
}

export function assignmentItemSerializer(item: AssignmentItem): any {
  return { resourceId: item["resourceId"] };
}

export function assignmentItemDeserializer(item: any): AssignmentItem {
  return {
    resourceId: item["resourceId"],
  };
}

/** List of all the workspace manager assignments. */
export interface _WorkspaceManagerAssignmentList {
  /** The WorkspaceManagerAssignment items on this page */
  value: WorkspaceManagerAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceManagerAssignmentListDeserializer(
  item: any,
): _WorkspaceManagerAssignmentList {
  return {
    value: workspaceManagerAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceManagerAssignmentArraySerializer(
  result: Array<WorkspaceManagerAssignment>,
): any[] {
  return result.map((item) => {
    return workspaceManagerAssignmentSerializer(item);
  });
}

export function workspaceManagerAssignmentArrayDeserializer(
  result: Array<WorkspaceManagerAssignment>,
): any[] {
  return result.map((item) => {
    return workspaceManagerAssignmentDeserializer(item);
  });
}

/** The workspace manager configuration */
export interface WorkspaceManagerConfiguration extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** The current mode of the workspace manager configuration */
  mode?: Mode;
}

export function workspaceManagerConfigurationSerializer(item: WorkspaceManagerConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, ["mode"])
      ? undefined
      : _workspaceManagerConfigurationPropertiesSerializer(item),
  };
}

export function workspaceManagerConfigurationDeserializer(
  item: any,
): WorkspaceManagerConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceManagerConfigurationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The workspace manager configuration properties */
export interface WorkspaceManagerConfigurationProperties {
  /** The current mode of the workspace manager configuration */
  mode: Mode;
}

export function workspaceManagerConfigurationPropertiesSerializer(
  item: WorkspaceManagerConfigurationProperties,
): any {
  return { mode: item["mode"] };
}

export function workspaceManagerConfigurationPropertiesDeserializer(
  item: any,
): WorkspaceManagerConfigurationProperties {
  return {
    mode: item["mode"],
  };
}

/** The current mode of the workspace manager configuration */
export enum KnownMode {
  /** The workspace manager configuration is enabled */
  Enabled = "Enabled",
  /** The workspace manager configuration is disabled */
  Disabled = "Disabled",
}

/**
 * The current mode of the workspace manager configuration \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The workspace manager configuration is enabled \
 * **Disabled**: The workspace manager configuration is disabled
 */
export type Mode = string;

/** List all the workspace manager configurations for the workspace. */
export interface _WorkspaceManagerConfigurationList {
  /** The WorkspaceManagerConfiguration items on this page */
  value: WorkspaceManagerConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceManagerConfigurationListDeserializer(
  item: any,
): _WorkspaceManagerConfigurationList {
  return {
    value: workspaceManagerConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceManagerConfigurationArraySerializer(
  result: Array<WorkspaceManagerConfiguration>,
): any[] {
  return result.map((item) => {
    return workspaceManagerConfigurationSerializer(item);
  });
}

export function workspaceManagerConfigurationArrayDeserializer(
  result: Array<WorkspaceManagerConfiguration>,
): any[] {
  return result.map((item) => {
    return workspaceManagerConfigurationDeserializer(item);
  });
}

/** The workspace manager group */
export interface WorkspaceManagerGroup extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** The description of the workspace manager group */
  description?: string;
  /** The display name of the workspace manager group */
  displayName?: string;
  /** The names of the workspace manager members participating in this group. */
  memberResourceNames?: string[];
}

export function workspaceManagerGroupSerializer(item: WorkspaceManagerGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "displayName", "memberResourceNames"])
      ? undefined
      : _workspaceManagerGroupPropertiesSerializer(item),
  };
}

export function workspaceManagerGroupDeserializer(item: any): WorkspaceManagerGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceManagerGroupPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The workspace manager group properties */
export interface WorkspaceManagerGroupProperties {
  /** The description of the workspace manager group */
  description?: string;
  /** The display name of the workspace manager group */
  displayName: string;
  /** The names of the workspace manager members participating in this group. */
  memberResourceNames: string[];
}

export function workspaceManagerGroupPropertiesSerializer(
  item: WorkspaceManagerGroupProperties,
): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    memberResourceNames: item["memberResourceNames"].map((p: any) => {
      return p;
    }),
  };
}

export function workspaceManagerGroupPropertiesDeserializer(
  item: any,
): WorkspaceManagerGroupProperties {
  return {
    description: item["description"],
    displayName: item["displayName"],
    memberResourceNames: item["memberResourceNames"].map((p: any) => {
      return p;
    }),
  };
}

/** List of all the workspace manager groups. */
export interface _WorkspaceManagerGroupList {
  /** The WorkspaceManagerGroup items on this page */
  value: WorkspaceManagerGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceManagerGroupListDeserializer(item: any): _WorkspaceManagerGroupList {
  return {
    value: workspaceManagerGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceManagerGroupArraySerializer(result: Array<WorkspaceManagerGroup>): any[] {
  return result.map((item) => {
    return workspaceManagerGroupSerializer(item);
  });
}

export function workspaceManagerGroupArrayDeserializer(
  result: Array<WorkspaceManagerGroup>,
): any[] {
  return result.map((item) => {
    return workspaceManagerGroupDeserializer(item);
  });
}

/** The workspace manager member */
export interface WorkspaceManagerMember extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** Fully qualified resource ID of the target Sentinel workspace joining the given Sentinel workspace manager */
  targetWorkspaceResourceId?: string;
  /** Tenant id of the target Sentinel workspace joining the given Sentinel workspace manager */
  targetWorkspaceTenantId?: string;
}

export function workspaceManagerMemberSerializer(item: WorkspaceManagerMember): any {
  return {
    properties: areAllPropsUndefined(item, ["targetWorkspaceResourceId", "targetWorkspaceTenantId"])
      ? undefined
      : _workspaceManagerMemberPropertiesSerializer(item),
  };
}

export function workspaceManagerMemberDeserializer(item: any): WorkspaceManagerMember {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workspaceManagerMemberPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The workspace manager member properties */
export interface WorkspaceManagerMemberProperties {
  /** Fully qualified resource ID of the target Sentinel workspace joining the given Sentinel workspace manager */
  targetWorkspaceResourceId: string;
  /** Tenant id of the target Sentinel workspace joining the given Sentinel workspace manager */
  targetWorkspaceTenantId: string;
}

export function workspaceManagerMemberPropertiesSerializer(
  item: WorkspaceManagerMemberProperties,
): any {
  return {
    targetWorkspaceResourceId: item["targetWorkspaceResourceId"],
    targetWorkspaceTenantId: item["targetWorkspaceTenantId"],
  };
}

export function workspaceManagerMemberPropertiesDeserializer(
  item: any,
): WorkspaceManagerMemberProperties {
  return {
    targetWorkspaceResourceId: item["targetWorkspaceResourceId"],
    targetWorkspaceTenantId: item["targetWorkspaceTenantId"],
  };
}

/** List of workspace manager members */
export interface _WorkspaceManagerMembersList {
  /** The WorkspaceManagerMember items on this page */
  value: WorkspaceManagerMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceManagerMembersListDeserializer(item: any): _WorkspaceManagerMembersList {
  return {
    value: workspaceManagerMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceManagerMemberArraySerializer(
  result: Array<WorkspaceManagerMember>,
): any[] {
  return result.map((item) => {
    return workspaceManagerMemberSerializer(item);
  });
}

export function workspaceManagerMemberArrayDeserializer(
  result: Array<WorkspaceManagerMember>,
): any[] {
  return result.map((item) => {
    return workspaceManagerMemberDeserializer(item);
  });
}

/** Analytics Rule Run Trigger request */
export interface AnalyticsRuleRunTrigger {
  executionTimeUtc: Date;
}

export function analyticsRuleRunTriggerSerializer(item: AnalyticsRuleRunTrigger): any {
  return { properties: _analyticsRuleRunTriggerPropertiesSerializer(item) };
}

/** The Analytics Rule Run Trigger properties */
export interface AnalyticsRuleRunTriggerProperties {
  executionTimeUtc: Date;
}

export function analyticsRuleRunTriggerPropertiesSerializer(
  item: AnalyticsRuleRunTriggerProperties,
): any {
  return { executionTimeUtc: item["executionTimeUtc"].toISOString() };
}

/** Action for alert rule. */
export interface ActionResponse extends ProxyResource {
  /** Etag of the action. */
  etag?: string;
  /** Logic App Resource Id, /subscriptions/{my-subscription}/resourceGroups/{my-resource-group}/providers/Microsoft.Logic/workflows/{my-workflow-id}. */
  logicAppResourceId?: string;
  /** The name of the logic app's workflow. */
  workflowId?: string;
}

export function actionResponseDeserializer(item: any): ActionResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _actionResponsePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Action property bag. */
export interface ActionResponseProperties extends ActionPropertiesBase {
  /** The name of the logic app's workflow. */
  workflowId?: string;
}

export function actionResponsePropertiesDeserializer(item: any): ActionResponseProperties {
  return {
    logicAppResourceId: item["logicAppResourceId"],
    workflowId: item["workflowId"],
  };
}

/** Action property bag base. */
export interface ActionPropertiesBase {
  /** Logic App Resource Id, /subscriptions/{my-subscription}/resourceGroups/{my-resource-group}/providers/Microsoft.Logic/workflows/{my-workflow-id}. */
  logicAppResourceId: string;
}

export function actionPropertiesBaseSerializer(item: ActionPropertiesBase): any {
  return { logicAppResourceId: item["logicAppResourceId"] };
}

export function actionPropertiesBaseDeserializer(item: any): ActionPropertiesBase {
  return {
    logicAppResourceId: item["logicAppResourceId"],
  };
}

/** Action for alert rule. */
export interface ActionRequest extends ResourceWithEtag {
  /** Logic App Resource Id, /subscriptions/{my-subscription}/resourceGroups/{my-resource-group}/providers/Microsoft.Logic/workflows/{my-workflow-id}. */
  logicAppResourceId?: string;
  /** Logic App Callback URL for this specific workflow. */
  triggerUri?: string;
}

export function actionRequestSerializer(item: ActionRequest): any {
  return {
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["logicAppResourceId", "triggerUri"])
      ? undefined
      : _actionRequestPropertiesSerializer(item),
  };
}

/** Action property bag. */
export interface ActionRequestProperties extends ActionPropertiesBase {
  /** Logic App Callback URL for this specific workflow. */
  triggerUri: string;
}

export function actionRequestPropertiesSerializer(item: ActionRequestProperties): any {
  return { logicAppResourceId: item["logicAppResourceId"], triggerUri: item["triggerUri"] };
}

/** List all the actions. */
export interface _ActionsList {
  /** The ActionResponse items on this page */
  value: ActionResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _actionsListDeserializer(item: any): _ActionsList {
  return {
    value: actionResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function actionResponseArrayDeserializer(result: Array<ActionResponse>): any[] {
  return result.map((item) => {
    return actionResponseDeserializer(item);
  });
}

/** The parameters required to execute an expand operation on the given bookmark. */
export interface BookmarkExpandParameters {
  /** The end date filter, so the only expansion results returned are before this date. */
  endTime?: Date;
  /** The Id of the expansion to perform. */
  expansionId?: string;
  /** The start date filter, so the only expansion results returned are after this date. */
  startTime?: Date;
}

export function bookmarkExpandParametersSerializer(item: BookmarkExpandParameters): any {
  return {
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    expansionId: item["expansionId"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

/** The entity expansion result operation response. */
export interface BookmarkExpandResponse {
  /** The metadata from the expansion operation results. */
  metaData?: ExpansionResultsMetadata;
  /** The expansion result values. */
  value?: BookmarkExpandResponseValue;
}

export function bookmarkExpandResponseDeserializer(item: any): BookmarkExpandResponse {
  return {
    metaData: !item["metaData"]
      ? item["metaData"]
      : expansionResultsMetadataDeserializer(item["metaData"]),
    value: !item["value"] ? item["value"] : bookmarkExpandResponseValueDeserializer(item["value"]),
  };
}

/** The expansion result values. */
export interface BookmarkExpandResponseValue {
  /** Array of the expansion result entities. */
  entities?: EntityUnion[];
  /** Array of expansion result connected entities */
  edges?: ConnectedEntity[];
}

export function bookmarkExpandResponseValueDeserializer(item: any): BookmarkExpandResponseValue {
  return {
    entities: !item["entities"] ? item["entities"] : entityUnionArrayDeserializer(item["entities"]),
    edges: !item["edges"] ? item["edges"] : connectedEntityArrayDeserializer(item["edges"]),
  };
}

export function connectedEntityArrayDeserializer(result: Array<ConnectedEntity>): any[] {
  return result.map((item) => {
    return connectedEntityDeserializer(item);
  });
}

/** Expansion result connected entities */
export interface ConnectedEntity {
  /** Entity Id of the connected entity */
  targetEntityId?: string;
  /** key-value pairs for a connected entity mapping */
  additionalData?: any;
}

export function connectedEntityDeserializer(item: any): ConnectedEntity {
  return {
    targetEntityId: item["targetEntityId"],
    additionalData: item["additionalData"],
  };
}

/** Represents a Package in Azure Security Insights. */
export interface PackageModel extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The content id of the package */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId, contentKind and the contentVersion of the package */
  contentProductId?: string;
  /** The package kind */
  contentKind?: PackageKind;
  /** The version of the content schema. */
  contentSchemaVersion?: string;
  /** Flag indicates if this is a newly published package. */
  isNew?: Flag;
  /** Flag indicates if this package is in preview. */
  isPreview?: Flag;
  /** Flag indicates if this package is among the featured list. */
  isFeatured?: Flag;
  /** Flag indicates if this template is deprecated */
  isDeprecated?: Flag;
  /** the latest version number of the package */
  version?: string;
  /** The display name of the package */
  displayName?: string;
  /** The description of the package */
  description?: string;
  /** The publisher display name of the package */
  publisherDisplayName?: string;
  /** The source of the package */
  source?: MetadataSource;
  /** The author of the package */
  author?: MetadataAuthor;
  /** The support tier of the package */
  support?: MetadataSupport;
  /** The support tier of the package */
  dependencies?: MetadataDependencies;
  /** Providers for the package item */
  providers?: string[];
  /** first publish date package item */
  firstPublishDate?: Date;
  /** last publish date for the package item */
  lastPublishDate?: Date;
  /** The categories of the package */
  categories?: MetadataCategories;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
}

export function packageModelSerializer(item: PackageModel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "contentId",
      "contentProductId",
      "contentKind",
      "contentSchemaVersion",
      "isNew",
      "isPreview",
      "isFeatured",
      "isDeprecated",
      "version",
      "displayName",
      "description",
      "publisherDisplayName",
      "source",
      "author",
      "support",
      "dependencies",
      "providers",
      "firstPublishDate",
      "lastPublishDate",
      "categories",
      "threatAnalysisTactics",
      "threatAnalysisTechniques",
      "icon",
    ])
      ? undefined
      : _packageModelPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function packageModelDeserializer(item: any): PackageModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _packageModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes package properties */
export interface PackageProperties extends PackageBaseProperties {}

export function packagePropertiesSerializer(item: PackageProperties): any {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

export function packagePropertiesDeserializer(item: any): PackageProperties {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

/** Describes package properties */
export interface PackageBaseProperties {
  /** The content id of the package */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId, contentKind and the contentVersion of the package */
  contentProductId?: string;
  /** The package kind */
  contentKind?: PackageKind;
  /** The version of the content schema. */
  contentSchemaVersion?: string;
  /** Flag indicates if this is a newly published package. */
  isNew?: Flag;
  /** Flag indicates if this package is in preview. */
  isPreview?: Flag;
  /** Flag indicates if this package is among the featured list. */
  isFeatured?: Flag;
  /** Flag indicates if this template is deprecated */
  isDeprecated?: Flag;
  /** the latest version number of the package */
  version?: string;
  /** The display name of the package */
  displayName?: string;
  /** The description of the package */
  description?: string;
  /** The publisher display name of the package */
  publisherDisplayName?: string;
  /** The source of the package */
  source?: MetadataSource;
  /** The author of the package */
  author?: MetadataAuthor;
  /** The support tier of the package */
  support?: MetadataSupport;
  /** The support tier of the package */
  dependencies?: MetadataDependencies;
  /** Providers for the package item */
  providers?: string[];
  /** first publish date package item */
  firstPublishDate?: Date;
  /** last publish date for the package item */
  lastPublishDate?: Date;
  /** The categories of the package */
  categories?: MetadataCategories;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
}

export function packageBasePropertiesSerializer(item: PackageBaseProperties): any {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

export function packageBasePropertiesDeserializer(item: any): PackageBaseProperties {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

/** The package kind */
export enum KnownPackageKind {
  /** Solution */
  Solution = "Solution",
  /** Standalone */
  Standalone = "Standalone",
}

/**
 * The package kind \
 * {@link KnownPackageKind} can be used interchangeably with PackageKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Solution**: Solution \
 * **Standalone**: Standalone
 */
export type PackageKind = string;

/** The boolean value the metadata is for. */
export enum KnownFlag {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/**
 * The boolean value the metadata is for. \
 * {@link KnownFlag} can be used interchangeably with Flag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **true**: true \
 * **false**: false
 */
export type Flag = string;

/** The original source of the content item, where it comes from. */
export interface MetadataSource {
  /** Source type of the content */
  kind: SourceKind;
  /** Name of the content source.  The repo name, solution name, LA workspace name etc. */
  name?: string;
  /** ID of the content source.  The solution ID, workspace ID, etc */
  sourceId?: string;
}

export function metadataSourceSerializer(item: MetadataSource): any {
  return { kind: item["kind"], name: item["name"], sourceId: item["sourceId"] };
}

export function metadataSourceDeserializer(item: any): MetadataSource {
  return {
    kind: item["kind"],
    name: item["name"],
    sourceId: item["sourceId"],
  };
}

/** Source type of the content */
export enum KnownSourceKind {
  /** LocalWorkspace */
  LocalWorkspace = "LocalWorkspace",
  /** Community */
  Community = "Community",
  /** Solution */
  Solution = "Solution",
  /** SourceRepository */
  SourceRepository = "SourceRepository",
}

/**
 * Source type of the content \
 * {@link KnownSourceKind} can be used interchangeably with SourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocalWorkspace**: LocalWorkspace \
 * **Community**: Community \
 * **Solution**: Solution \
 * **SourceRepository**: SourceRepository
 */
export type SourceKind = string;

/** Publisher or creator of the content item. */
export interface MetadataAuthor {
  /** Name of the author. Company or person. */
  name?: string;
  /** Email of author contact */
  email?: string;
  /** Link for author/vendor page */
  link?: string;
}

export function metadataAuthorSerializer(item: MetadataAuthor): any {
  return { name: item["name"], email: item["email"], link: item["link"] };
}

export function metadataAuthorDeserializer(item: any): MetadataAuthor {
  return {
    name: item["name"],
    email: item["email"],
    link: item["link"],
  };
}

/** Support information for the content item. */
export interface MetadataSupport {
  /** Type of support for content item */
  tier: SupportTier;
  /** Name of the support contact. Company or person. */
  name?: string;
  /** Email of support contact */
  email?: string;
  /** Link for support help, like to support page to open a ticket etc. */
  link?: string;
}

export function metadataSupportSerializer(item: MetadataSupport): any {
  return { tier: item["tier"], name: item["name"], email: item["email"], link: item["link"] };
}

export function metadataSupportDeserializer(item: any): MetadataSupport {
  return {
    tier: item["tier"],
    name: item["name"],
    email: item["email"],
    link: item["link"],
  };
}

/** Type of support for content item */
export enum KnownSupportTier {
  /** Microsoft */
  Microsoft = "Microsoft",
  /** Partner */
  Partner = "Partner",
  /** Community */
  Community = "Community",
}

/**
 * Type of support for content item \
 * {@link KnownSupportTier} can be used interchangeably with SupportTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft**: Microsoft \
 * **Partner**: Partner \
 * **Community**: Community
 */
export type SupportTier = string;

/** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex dependencies. */
export interface MetadataDependencies {
  /** Id of the content item we depend on */
  contentId?: string;
  /** Type of the content item we depend on */
  kind?: Kind;
  /** Version of the the content item we depend on.  Can be blank, * or missing to indicate any version fulfills the dependency.  If version does not match our defined numeric format then an exact match is required. */
  version?: string;
  /** Name of the content item */
  name?: string;
  /** Operator used for list of dependencies in criteria array. */
  operator?: Operator;
  /** This is the list of dependencies we must fulfill, according to the AND/OR operator */
  criteria?: MetadataDependencies[];
}

export function metadataDependenciesSerializer(item: MetadataDependencies): any {
  return {
    contentId: item["contentId"],
    kind: item["kind"],
    version: item["version"],
    name: item["name"],
    operator: item["operator"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : metadataDependenciesArraySerializer(item["criteria"]),
  };
}

export function metadataDependenciesDeserializer(item: any): MetadataDependencies {
  return {
    contentId: item["contentId"],
    kind: item["kind"],
    version: item["version"],
    name: item["name"],
    operator: item["operator"],
    criteria: !item["criteria"]
      ? item["criteria"]
      : metadataDependenciesArrayDeserializer(item["criteria"]),
  };
}

/** The kind of content the metadata is for. */
export enum KnownKind {
  /** DataConnector */
  DataConnector = "DataConnector",
  /** DataType */
  DataType = "DataType",
  /** Workbook */
  Workbook = "Workbook",
  /** WorkbookTemplate */
  WorkbookTemplate = "WorkbookTemplate",
  /** Playbook */
  Playbook = "Playbook",
  /** PlaybookTemplate */
  PlaybookTemplate = "PlaybookTemplate",
  /** AnalyticsRuleTemplate */
  AnalyticsRuleTemplate = "AnalyticsRuleTemplate",
  /** AnalyticsRule */
  AnalyticsRule = "AnalyticsRule",
  /** HuntingQuery */
  HuntingQuery = "HuntingQuery",
  /** InvestigationQuery */
  InvestigationQuery = "InvestigationQuery",
  /** Parser */
  Parser = "Parser",
  /** Watchlist */
  Watchlist = "Watchlist",
  /** WatchlistTemplate */
  WatchlistTemplate = "WatchlistTemplate",
  /** Solution */
  Solution = "Solution",
  /** AzureFunction */
  AzureFunction = "AzureFunction",
  /** LogicAppsCustomConnector */
  LogicAppsCustomConnector = "LogicAppsCustomConnector",
  /** AutomationRule */
  AutomationRule = "AutomationRule",
  /** ResourcesDataConnector */
  ResourcesDataConnector = "ResourcesDataConnector",
  /** Notebook */
  Notebook = "Notebook",
  /** Standalone */
  Standalone = "Standalone",
  /** SummaryRule */
  SummaryRule = "SummaryRule",
  /** Custom detections enable proactive monitoring and automated response actions for various events and system states across your tenant. */
  CustomDetection = "CustomDetection",
}

/**
 * The kind of content the metadata is for. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataConnector**: DataConnector \
 * **DataType**: DataType \
 * **Workbook**: Workbook \
 * **WorkbookTemplate**: WorkbookTemplate \
 * **Playbook**: Playbook \
 * **PlaybookTemplate**: PlaybookTemplate \
 * **AnalyticsRuleTemplate**: AnalyticsRuleTemplate \
 * **AnalyticsRule**: AnalyticsRule \
 * **HuntingQuery**: HuntingQuery \
 * **InvestigationQuery**: InvestigationQuery \
 * **Parser**: Parser \
 * **Watchlist**: Watchlist \
 * **WatchlistTemplate**: WatchlistTemplate \
 * **Solution**: Solution \
 * **AzureFunction**: AzureFunction \
 * **LogicAppsCustomConnector**: LogicAppsCustomConnector \
 * **AutomationRule**: AutomationRule \
 * **ResourcesDataConnector**: ResourcesDataConnector \
 * **Notebook**: Notebook \
 * **Standalone**: Standalone \
 * **SummaryRule**: SummaryRule \
 * **CustomDetection**: Custom detections enable proactive monitoring and automated response actions for various events and system states across your tenant.
 */
export type Kind = string;

/** Represents an operator in a ConditionClause. */
export enum KnownOperator {
  /** Equals */
  Equals = "Equals",
  /** NotEquals */
  NotEquals = "NotEquals",
  /** LessThan */
  LessThan = "LessThan",
  /** LessThanEqual */
  LessThanEqual = "LessThanEqual",
  /** GreaterThan */
  GreaterThan = "GreaterThan",
  /** GreaterThanEqual */
  GreaterThanEqual = "GreaterThanEqual",
  /** StringContains */
  StringContains = "StringContains",
  /** StringNotContains */
  StringNotContains = "StringNotContains",
  /** StringStartsWith */
  StringStartsWith = "StringStartsWith",
  /** StringNotStartsWith */
  StringNotStartsWith = "StringNotStartsWith",
  /** StringEndsWith */
  StringEndsWith = "StringEndsWith",
  /** StringNotEndsWith */
  StringNotEndsWith = "StringNotEndsWith",
  /** StringIsEmpty */
  StringIsEmpty = "StringIsEmpty",
  /** IsNull */
  IsNull = "IsNull",
  /** IsTrue */
  IsTrue = "IsTrue",
  /** IsFalse */
  IsFalse = "IsFalse",
  /** ArrayContains */
  ArrayContains = "ArrayContains",
  /** ArrayNotContains */
  ArrayNotContains = "ArrayNotContains",
  /** OnOrAfterRelative */
  OnOrAfterRelative = "OnOrAfterRelative",
  /** AfterRelative */
  AfterRelative = "AfterRelative",
  /** OnOrBeforeRelative */
  OnOrBeforeRelative = "OnOrBeforeRelative",
  /** BeforeRelative */
  BeforeRelative = "BeforeRelative",
  /** OnOrAfterAbsolute */
  OnOrAfterAbsolute = "OnOrAfterAbsolute",
  /** AfterAbsolute */
  AfterAbsolute = "AfterAbsolute",
  /** OnOrBeforeAbsolute */
  OnOrBeforeAbsolute = "OnOrBeforeAbsolute",
  /** BeforeAbsolute */
  BeforeAbsolute = "BeforeAbsolute",
}

/**
 * Represents an operator in a ConditionClause. \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **NotEquals**: NotEquals \
 * **LessThan**: LessThan \
 * **LessThanEqual**: LessThanEqual \
 * **GreaterThan**: GreaterThan \
 * **GreaterThanEqual**: GreaterThanEqual \
 * **StringContains**: StringContains \
 * **StringNotContains**: StringNotContains \
 * **StringStartsWith**: StringStartsWith \
 * **StringNotStartsWith**: StringNotStartsWith \
 * **StringEndsWith**: StringEndsWith \
 * **StringNotEndsWith**: StringNotEndsWith \
 * **StringIsEmpty**: StringIsEmpty \
 * **IsNull**: IsNull \
 * **IsTrue**: IsTrue \
 * **IsFalse**: IsFalse \
 * **ArrayContains**: ArrayContains \
 * **ArrayNotContains**: ArrayNotContains \
 * **OnOrAfterRelative**: OnOrAfterRelative \
 * **AfterRelative**: AfterRelative \
 * **OnOrBeforeRelative**: OnOrBeforeRelative \
 * **BeforeRelative**: BeforeRelative \
 * **OnOrAfterAbsolute**: OnOrAfterAbsolute \
 * **AfterAbsolute**: AfterAbsolute \
 * **OnOrBeforeAbsolute**: OnOrBeforeAbsolute \
 * **BeforeAbsolute**: BeforeAbsolute
 */
export type Operator = string;

export function metadataDependenciesArraySerializer(result: Array<MetadataDependencies>): any[] {
  return result.map((item) => {
    return metadataDependenciesSerializer(item);
  });
}

export function metadataDependenciesArrayDeserializer(result: Array<MetadataDependencies>): any[] {
  return result.map((item) => {
    return metadataDependenciesDeserializer(item);
  });
}

/** ies for the solution content item */
export interface MetadataCategories {
  /** domain for the solution content item */
  domains?: string[];
  /** Industry verticals for the solution content item */
  verticals?: string[];
}

export function metadataCategoriesSerializer(item: MetadataCategories): any {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
    verticals: !item["verticals"]
      ? item["verticals"]
      : item["verticals"].map((p: any) => {
          return p;
        }),
  };
}

export function metadataCategoriesDeserializer(item: any): MetadataCategories {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : item["domains"].map((p: any) => {
          return p;
        }),
    verticals: !item["verticals"]
      ? item["verticals"]
      : item["verticals"].map((p: any) => {
          return p;
        }),
  };
}

/** List available packages. */
export interface _PackageList {
  /** The PackageModel items on this page */
  value: PackageModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _packageListDeserializer(item: any): _PackageList {
  return {
    value: packageModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function packageModelArraySerializer(result: Array<PackageModel>): any[] {
  return result.map((item) => {
    return packageModelSerializer(item);
  });
}

export function packageModelArrayDeserializer(result: Array<PackageModel>): any[] {
  return result.map((item) => {
    return packageModelDeserializer(item);
  });
}

/** Represents a Package in Azure Security Insights. */
export interface ProductPackageModel extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The content id of the package */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId, contentKind and the contentVersion of the package */
  contentProductId?: string;
  /** The package kind */
  contentKind?: PackageKind;
  /** The version of the content schema. */
  contentSchemaVersion?: string;
  /** Flag indicates if this is a newly published package. */
  isNew?: Flag;
  /** Flag indicates if this package is in preview. */
  isPreview?: Flag;
  /** Flag indicates if this package is among the featured list. */
  isFeatured?: Flag;
  /** Flag indicates if this template is deprecated */
  isDeprecated?: Flag;
  /** the latest version number of the package */
  version?: string;
  /** The display name of the package */
  displayName?: string;
  /** The description of the package */
  description?: string;
  /** The publisher display name of the package */
  publisherDisplayName?: string;
  /** The source of the package */
  source?: MetadataSource;
  /** The author of the package */
  author?: MetadataAuthor;
  /** The support tier of the package */
  support?: MetadataSupport;
  /** The support tier of the package */
  dependencies?: MetadataDependencies;
  /** Providers for the package item */
  providers?: string[];
  /** first publish date package item */
  firstPublishDate?: Date;
  /** last publish date for the package item */
  lastPublishDate?: Date;
  /** The categories of the package */
  categories?: MetadataCategories;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** The version of the installed package, null or absent means not installed. */
  installedVersion?: string;
  /** The metadata resource id. */
  metadataResourceId?: string;
  /** The json of the ARM template to deploy. Expandable. */
  packagedContent?: any;
}

export function productPackageModelDeserializer(item: any): ProductPackageModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _productPackageModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Describes package properties */
export interface ProductPackageProperties {
  /** The content id of the package */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId, contentKind and the contentVersion of the package */
  contentProductId?: string;
  /** The package kind */
  contentKind?: PackageKind;
  /** The version of the content schema. */
  contentSchemaVersion?: string;
  /** Flag indicates if this is a newly published package. */
  isNew?: Flag;
  /** Flag indicates if this package is in preview. */
  isPreview?: Flag;
  /** Flag indicates if this package is among the featured list. */
  isFeatured?: Flag;
  /** Flag indicates if this template is deprecated */
  isDeprecated?: Flag;
  /** the latest version number of the package */
  version?: string;
  /** The display name of the package */
  displayName?: string;
  /** The description of the package */
  description?: string;
  /** The publisher display name of the package */
  publisherDisplayName?: string;
  /** The source of the package */
  source?: MetadataSource;
  /** The author of the package */
  author?: MetadataAuthor;
  /** The support tier of the package */
  support?: MetadataSupport;
  /** The support tier of the package */
  dependencies?: MetadataDependencies;
  /** Providers for the package item */
  providers?: string[];
  /** first publish date package item */
  firstPublishDate?: Date;
  /** last publish date for the package item */
  lastPublishDate?: Date;
  /** The categories of the package */
  categories?: MetadataCategories;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** The version of the installed package, null or absent means not installed. */
  installedVersion?: string;
  /** The metadata resource id. */
  metadataResourceId?: string;
  /** The json of the ARM template to deploy. Expandable. */
  packagedContent?: any;
}

export function productPackagePropertiesDeserializer(item: any): ProductPackageProperties {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
    installedVersion: item["installedVersion"],
    metadataResourceId: item["metadataResourceId"],
    packagedContent: item["packagedContent"],
  };
}

/** List available packages. */
export interface _ProductPackageList {
  /** The ProductPackageModel items on this page */
  value: ProductPackageModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productPackageListDeserializer(item: any): _ProductPackageList {
  return {
    value: productPackageModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productPackageModelArrayDeserializer(result: Array<ProductPackageModel>): any[] {
  return result.map((item) => {
    return productPackageModelDeserializer(item);
  });
}

/** Template resource definition. */
export interface ProductTemplateModel extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Dynamic for user-created.  This is the resource name */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId of the package, contentId of the template, contentKind of the template and the contentVersion of the template */
  contentProductId?: string;
  /** Version of the package.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  packageVersion?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The display name of the template */
  displayName?: string;
  /** The kind of content the template is for. */
  contentKind?: Kind;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the template - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the item */
  categories?: MetadataCategories;
  /** Providers for the content item */
  providers?: string[];
  /** first publish date content item */
  firstPublishDate?: Date;
  /** last publish date for the content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
  /** the package Id contains this template */
  packageId?: string;
  /** the packageKind of the package contains this template */
  packageKind?: PackageKind;
  /** the name of the package contains this template */
  packageName?: string;
  /** Flag indicates if this template is deprecated */
  readonly isDeprecated?: Flag;
  /** The json of the ARM template to deploy */
  packagedContent?: any;
}

export function productTemplateModelDeserializer(item: any): ProductTemplateModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _productTemplateModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Template property bag. */
export interface ProductTemplateProperties {
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Dynamic for user-created.  This is the resource name */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId of the package, contentId of the template, contentKind of the template and the contentVersion of the template */
  contentProductId?: string;
  /** Version of the package.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  packageVersion?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The display name of the template */
  displayName?: string;
  /** The kind of content the template is for. */
  contentKind?: Kind;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the template - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the item */
  categories?: MetadataCategories;
  /** Providers for the content item */
  providers?: string[];
  /** first publish date content item */
  firstPublishDate?: Date;
  /** last publish date for the content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
  /** the package Id contains this template */
  packageId?: string;
  /** the packageKind of the package contains this template */
  packageKind?: PackageKind;
  /** the name of the package contains this template */
  packageName?: string;
  /** Flag indicates if this template is deprecated */
  readonly isDeprecated?: Flag;
  /** The json of the ARM template to deploy */
  packagedContent?: any;
}

export function productTemplatePropertiesDeserializer(item: any): ProductTemplateProperties {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    isDeprecated: item["isDeprecated"],
    packagedContent: item["packagedContent"],
  };
}

/** List of all the template. */
export interface _ProductTemplateList {
  /** The ProductTemplateModel items on this page */
  value: ProductTemplateModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productTemplateListDeserializer(item: any): _ProductTemplateList {
  return {
    value: productTemplateModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productTemplateModelArrayDeserializer(result: Array<ProductTemplateModel>): any[] {
  return result.map((item) => {
    return productTemplateModelDeserializer(item);
  });
}

/** Template resource definition. */
export interface TemplateModel extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Dynamic for user-created.  This is the resource name */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId of the package, contentId of the template, contentKind of the template and the contentVersion of the template */
  contentProductId?: string;
  /** Version of the package.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  packageVersion?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The display name of the template */
  displayName?: string;
  /** The kind of content the template is for. */
  contentKind?: Kind;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the template - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the item */
  categories?: MetadataCategories;
  /** Providers for the content item */
  providers?: string[];
  /** first publish date content item */
  firstPublishDate?: Date;
  /** last publish date for the content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
  /** the package Id contains this template */
  packageId?: string;
  /** the packageKind of the package contains this template */
  packageKind?: PackageKind;
  /** the name of the package contains this template */
  packageName?: string;
  /** Flag indicates if this template is deprecated */
  readonly isDeprecated?: Flag;
  /** The JSON of the ARM template to deploy active content. Expandable. */
  mainTemplate?: any;
  /** Dependant templates. Expandable. */
  readonly dependantTemplates?: TemplateProperties[];
}

export function templateModelSerializer(item: TemplateModel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "contentId",
      "contentProductId",
      "packageVersion",
      "version",
      "displayName",
      "contentKind",
      "source",
      "author",
      "support",
      "dependencies",
      "categories",
      "providers",
      "firstPublishDate",
      "lastPublishDate",
      "customVersion",
      "contentSchemaVersion",
      "icon",
      "threatAnalysisTactics",
      "threatAnalysisTechniques",
      "previewImages",
      "previewImagesDark",
      "packageId",
      "packageKind",
      "packageName",
      "mainTemplate",
    ])
      ? undefined
      : _templateModelPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function templateModelDeserializer(item: any): TemplateModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _templateModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Template property bag. */
export interface TemplateProperties {
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Dynamic for user-created.  This is the resource name */
  contentId?: string;
  /** Unique ID for the content. It should be generated based on the contentId of the package, contentId of the template, contentKind of the template and the contentVersion of the template */
  contentProductId?: string;
  /** Version of the package.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  packageVersion?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM metadata best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The display name of the template */
  displayName?: string;
  /** The kind of content the template is for. */
  contentKind?: Kind;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the template - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the item */
  categories?: MetadataCategories;
  /** Providers for the content item */
  providers?: string[];
  /** first publish date content item */
  firstPublishDate?: Date;
  /** last publish date for the content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the content metadata */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
  /** the package Id contains this template */
  packageId?: string;
  /** the packageKind of the package contains this template */
  packageKind?: PackageKind;
  /** the name of the package contains this template */
  packageName?: string;
  /** Flag indicates if this template is deprecated */
  readonly isDeprecated?: Flag;
  /** The JSON of the ARM template to deploy active content. Expandable. */
  mainTemplate?: any;
  /** Dependant templates. Expandable. */
  readonly dependantTemplates?: TemplateProperties[];
}

export function templatePropertiesSerializer(item: TemplateProperties): any {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    mainTemplate: item["mainTemplate"],
  };
}

export function templatePropertiesDeserializer(item: any): TemplateProperties {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    isDeprecated: item["isDeprecated"],
    mainTemplate: item["mainTemplate"],
    dependantTemplates: !item["dependantTemplates"]
      ? item["dependantTemplates"]
      : templatePropertiesArrayDeserializer(item["dependantTemplates"]),
  };
}

export function templatePropertiesArraySerializer(result: Array<TemplateProperties>): any[] {
  return result.map((item) => {
    return templatePropertiesSerializer(item);
  });
}

export function templatePropertiesArrayDeserializer(result: Array<TemplateProperties>): any[] {
  return result.map((item) => {
    return templatePropertiesDeserializer(item);
  });
}

/** List of all the template. */
export interface _TemplateList {
  /** The TemplateModel items on this page */
  value: TemplateModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _templateListDeserializer(item: any): _TemplateList {
  return {
    value: templateModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function templateModelArraySerializer(result: Array<TemplateModel>): any[] {
  return result.map((item) => {
    return templateModelSerializer(item);
  });
}

export function templateModelArrayDeserializer(result: Array<TemplateModel>): any[] {
  return result.map((item) => {
    return templateModelDeserializer(item);
  });
}

/** Metadata resource definition. */
export interface MetadataModel extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Can be optionally set for user created content to define dependencies.  If an active content item is made from a template, both will have the same contentId. */
  contentId?: string;
  /** Full parent resource ID of the content item the metadata is for.  This is the full resource ID including the scope (subscription and resource group) */
  parentId?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM template best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The kind of content the metadata is for. */
  kind?: string;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the metadata - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the solution content item */
  categories?: MetadataCategories;
  /** Providers for the solution content item */
  providers?: string[];
  /** first publish date of solution content item */
  firstPublishDate?: Date;
  /** last publish date of solution content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the solution template */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
}

export function metadataModelSerializer(item: MetadataModel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "contentId",
      "parentId",
      "version",
      "kind",
      "source",
      "author",
      "support",
      "dependencies",
      "categories",
      "providers",
      "firstPublishDate",
      "lastPublishDate",
      "customVersion",
      "contentSchemaVersion",
      "icon",
      "threatAnalysisTactics",
      "threatAnalysisTechniques",
      "previewImages",
      "previewImagesDark",
    ])
      ? undefined
      : _metadataModelPropertiesSerializer(item),
    etag: item["etag"],
  };
}

export function metadataModelDeserializer(item: any): MetadataModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _metadataModelPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Metadata property bag. */
export interface MetadataProperties {
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Can be optionally set for user created content to define dependencies.  If an active content item is made from a template, both will have the same contentId. */
  contentId?: string;
  /** Full parent resource ID of the content item the metadata is for.  This is the full resource ID including the scope (subscription and resource group) */
  parentId: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM template best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The kind of content the metadata is for. */
  kind: string;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the metadata - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the solution content item */
  categories?: MetadataCategories;
  /** Providers for the solution content item */
  providers?: string[];
  /** first publish date of solution content item */
  firstPublishDate?: Date;
  /** last publish date of solution content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the solution template */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
}

export function metadataPropertiesSerializer(item: MetadataProperties): any {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

export function metadataPropertiesDeserializer(item: any): MetadataProperties {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

/** Metadata patch request body. */
export interface MetadataPatch extends ResourceWithEtag {
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Can be optionally set for user created content to define dependencies.  If an active content item is made from a template, both will have the same contentId. */
  contentId?: string;
  /** Full parent resource ID of the content item the metadata is for.  This is the full resource ID including the scope (subscription and resource group) */
  parentId?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM template best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The kind of content the metadata is for. */
  kind?: string;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the metadata - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the solution content item */
  categories?: MetadataCategories;
  /** Providers for the solution content item */
  providers?: string[];
  /** first publish date of solution content item */
  firstPublishDate?: Date;
  /** last publish date of solution content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the solution template */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
}

export function metadataPatchSerializer(item: MetadataPatch): any {
  return {
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "contentId",
      "parentId",
      "version",
      "kind",
      "source",
      "author",
      "support",
      "dependencies",
      "categories",
      "providers",
      "firstPublishDate",
      "lastPublishDate",
      "customVersion",
      "contentSchemaVersion",
      "icon",
      "threatAnalysisTactics",
      "threatAnalysisTechniques",
      "previewImages",
      "previewImagesDark",
    ])
      ? undefined
      : _metadataPatchPropertiesSerializer(item),
  };
}

/** Metadata property bag for patch requests.  This is the same as the MetadataProperties, but with nothing required */
export interface MetadataPropertiesPatch {
  /** Static ID for the content.  Used to identify dependencies and content from solutions or community.  Hard-coded/static for out of the box content and solutions. Can be optionally set for user created content to define dependencies.  If an active content item is made from a template, both will have the same contentId. */
  contentId?: string;
  /** Full parent resource ID of the content item the metadata is for.  This is the full resource ID including the scope (subscription and resource group) */
  parentId?: string;
  /** Version of the content.  Default and recommended format is numeric (e.g. 1, 1.0, 1.0.0, 1.0.0.0), following ARM template best practices.  Can also be any string, but then we cannot guarantee any version checks */
  version?: string;
  /** The kind of content the metadata is for. */
  kind?: string;
  /** Source of the content.  This is where/how it was created. */
  source?: MetadataSource;
  /** The creator of the content item. */
  author?: MetadataAuthor;
  /** Support information for the metadata - type, name, contact information */
  support?: MetadataSupport;
  /** Dependencies for the content item, what other content items it requires to work.  Can describe more complex dependencies using a recursive/nested structure. For a single dependency an id/kind/version can be supplied or operator/criteria for complex formats. */
  dependencies?: MetadataDependencies;
  /** Categories for the solution content item */
  categories?: MetadataCategories;
  /** Providers for the solution content item */
  providers?: string[];
  /** first publish date of solution content item */
  firstPublishDate?: Date;
  /** last publish date of solution content item */
  lastPublishDate?: Date;
  /** The custom version of the content. A optional free text */
  customVersion?: string;
  /** Schema version of the content. Can be used to distinguish between different flow based on the schema version */
  contentSchemaVersion?: string;
  /** the icon identifier. this id can later be fetched from the solution template */
  icon?: string;
  /** the tactics the resource covers */
  threatAnalysisTactics?: string[];
  /** the techniques the resource covers, these have to be aligned with the tactics being used */
  threatAnalysisTechniques?: string[];
  /** preview image file names. These will be taken from the solution artifacts */
  previewImages?: string[];
  /** preview image file names. These will be taken from the solution artifacts. used for dark theme support */
  previewImagesDark?: string[];
}

export function metadataPropertiesPatchSerializer(item: MetadataPropertiesPatch): any {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

/** List of all the metadata. */
export interface _MetadataList {
  /** The MetadataModel items on this page */
  value: MetadataModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metadataListDeserializer(item: any): _MetadataList {
  return {
    value: metadataModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metadataModelArraySerializer(result: Array<MetadataModel>): any[] {
  return result.map((item) => {
    return metadataModelSerializer(item);
  });
}

export function metadataModelArrayDeserializer(result: Array<MetadataModel>): any[] {
  return result.map((item) => {
    return metadataModelDeserializer(item);
  });
}

/** Threat intelligence information object. */
export interface ThreatIntelligenceInformation extends ProxyResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: indicator */
  kind: ThreatIntelligenceResourceInnerKind;
  /** Etag of the azure resource */
  etag?: string;
}

export function threatIntelligenceInformationSerializer(item: ThreatIntelligenceInformation): any {
  return { kind: item["kind"], etag: item["etag"] };
}

export function threatIntelligenceInformationDeserializer(
  item: any,
): ThreatIntelligenceInformation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Alias for ThreatIntelligenceInformationUnion */
export type ThreatIntelligenceInformationUnion =
  | ThreatIntelligenceIndicatorModel
  | ThreatIntelligenceInformation;

export function threatIntelligenceInformationUnionSerializer(
  item: ThreatIntelligenceInformationUnion,
): any {
  switch (item.kind) {
    case "indicator":
      return threatIntelligenceIndicatorModelSerializer(item as ThreatIntelligenceIndicatorModel);

    default:
      return threatIntelligenceInformationSerializer(item);
  }
}

export function threatIntelligenceInformationUnionDeserializer(
  item: any,
): ThreatIntelligenceInformationUnion {
  switch (item["kind"]) {
    case "indicator":
      return threatIntelligenceIndicatorModelDeserializer(item as ThreatIntelligenceIndicatorModel);

    default:
      return threatIntelligenceInformationDeserializer(item);
  }
}

/** The kind of the threat intelligence entity */
export enum KnownThreatIntelligenceResourceInnerKind {
  /** Entity represents threat intelligence indicator in the system. */
  Indicator = "indicator",
}

/**
 * The kind of the threat intelligence entity \
 * {@link KnownThreatIntelligenceResourceInnerKind} can be used interchangeably with ThreatIntelligenceResourceInnerKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **indicator**: Entity represents threat intelligence indicator in the system.
 */
export type ThreatIntelligenceResourceInnerKind = string;

/** Threat intelligence indicator entity. */
export interface ThreatIntelligenceIndicatorModel extends ThreatIntelligenceInformation {
  kind: "indicator";
  /** A bag of custom fields that should be part of the entity and will be presented to the user. */
  readonly additionalData?: Record<string, any>;
  /** The graph item display name which is a short humanly readable description of the graph item instance. This property is optional and might be system generated. */
  readonly friendlyName?: string;
  /** List of tags */
  threatIntelligenceTags?: string[];
  /** Last updated time in UTC */
  lastUpdatedTimeUtc?: string;
  /** Source of a threat intelligence entity */
  source?: string;
  /** Display name of a threat intelligence entity */
  displayName?: string;
  /** Description of a threat intelligence entity */
  description?: string;
  /** Indicator types of threat intelligence entities */
  indicatorTypes?: string[];
  /** Pattern of a threat intelligence entity */
  pattern?: string;
  /** Pattern type of a threat intelligence entity */
  patternType?: string;
  /** Pattern version of a threat intelligence entity */
  patternVersion?: string;
  /** Kill chain phases */
  killChainPhases?: ThreatIntelligenceKillChainPhase[];
  /** Parsed patterns */
  parsedPattern?: ThreatIntelligenceParsedPattern[];
  /** External ID of threat intelligence entity */
  externalId?: string;
  /** Created by reference of threat intelligence entity */
  createdByRef?: string;
  /** Is threat intelligence entity defanged */
  defanged?: boolean;
  /** External last updated time in UTC */
  externalLastUpdatedTimeUtc?: string;
  /** External References */
  externalReferences?: ThreatIntelligenceExternalReference[];
  /** Granular Markings */
  granularMarkings?: ThreatIntelligenceGranularMarkingModel[];
  /** Labels  of threat intelligence entity */
  labels?: string[];
  /** Is threat intelligence entity revoked */
  revoked?: boolean;
  /** Confidence of threat intelligence entity */
  confidence?: number;
  /** Threat intelligence entity object marking references */
  objectMarkingRefs?: string[];
  /** Language of threat intelligence entity */
  language?: string;
  /** Threat types */
  threatTypes?: string[];
  /** Valid from */
  validFrom?: string;
  /** Valid until */
  validUntil?: string;
  /** Created by */
  created?: string;
  /** Modified by */
  modified?: string;
  /** Extensions map */
  extensions?: Record<string, any>;
}

export function threatIntelligenceIndicatorModelSerializer(
  item: ThreatIntelligenceIndicatorModel,
): any {
  return {
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "threatIntelligenceTags",
      "lastUpdatedTimeUtc",
      "source",
      "displayName",
      "description",
      "indicatorTypes",
      "pattern",
      "patternType",
      "patternVersion",
      "killChainPhases",
      "parsedPattern",
      "externalId",
      "createdByRef",
      "defanged",
      "externalLastUpdatedTimeUtc",
      "externalReferences",
      "granularMarkings",
      "labels",
      "revoked",
      "confidence",
      "objectMarkingRefs",
      "language",
      "threatTypes",
      "validFrom",
      "validUntil",
      "created",
      "modified",
      "extensions",
    ])
      ? undefined
      : _threatIntelligenceIndicatorModelPropertiesSerializer(item),
  };
}

export function threatIntelligenceIndicatorModelDeserializer(
  item: any,
): ThreatIntelligenceIndicatorModel {
  return {
    kind: item["kind"],
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _threatIntelligenceIndicatorModelPropertiesDeserializer(item["properties"])),
  };
}

/** Describes threat intelligence entity properties */
export interface ThreatIntelligenceIndicatorProperties extends EntityCommonProperties {
  /** List of tags */
  threatIntelligenceTags?: string[];
  /** Last updated time in UTC */
  lastUpdatedTimeUtc?: string;
  /** Source of a threat intelligence entity */
  source?: string;
  /** Display name of a threat intelligence entity */
  displayName?: string;
  /** Description of a threat intelligence entity */
  description?: string;
  /** Indicator types of threat intelligence entities */
  indicatorTypes?: string[];
  /** Pattern of a threat intelligence entity */
  pattern?: string;
  /** Pattern type of a threat intelligence entity */
  patternType?: string;
  /** Pattern version of a threat intelligence entity */
  patternVersion?: string;
  /** Kill chain phases */
  killChainPhases?: ThreatIntelligenceKillChainPhase[];
  /** Parsed patterns */
  parsedPattern?: ThreatIntelligenceParsedPattern[];
  /** External ID of threat intelligence entity */
  externalId?: string;
  /** Created by reference of threat intelligence entity */
  createdByRef?: string;
  /** Is threat intelligence entity defanged */
  defanged?: boolean;
  /** External last updated time in UTC */
  externalLastUpdatedTimeUtc?: string;
  /** External References */
  externalReferences?: ThreatIntelligenceExternalReference[];
  /** Granular Markings */
  granularMarkings?: ThreatIntelligenceGranularMarkingModel[];
  /** Labels  of threat intelligence entity */
  labels?: string[];
  /** Is threat intelligence entity revoked */
  revoked?: boolean;
  /** Confidence of threat intelligence entity */
  confidence?: number;
  /** Threat intelligence entity object marking references */
  objectMarkingRefs?: string[];
  /** Language of threat intelligence entity */
  language?: string;
  /** Threat types */
  threatTypes?: string[];
  /** Valid from */
  validFrom?: string;
  /** Valid until */
  validUntil?: string;
  /** Created by */
  created?: string;
  /** Modified by */
  modified?: string;
  /** Extensions map */
  extensions?: Record<string, any>;
}

export function threatIntelligenceIndicatorPropertiesSerializer(
  item: ThreatIntelligenceIndicatorProperties,
): any {
  return {
    threatIntelligenceTags: !item["threatIntelligenceTags"]
      ? item["threatIntelligenceTags"]
      : item["threatIntelligenceTags"].map((p: any) => {
          return p;
        }),
    lastUpdatedTimeUtc: item["lastUpdatedTimeUtc"],
    source: item["source"],
    displayName: item["displayName"],
    description: item["description"],
    indicatorTypes: !item["indicatorTypes"]
      ? item["indicatorTypes"]
      : item["indicatorTypes"].map((p: any) => {
          return p;
        }),
    pattern: item["pattern"],
    patternType: item["patternType"],
    patternVersion: item["patternVersion"],
    killChainPhases: !item["killChainPhases"]
      ? item["killChainPhases"]
      : threatIntelligenceKillChainPhaseArraySerializer(item["killChainPhases"]),
    parsedPattern: !item["parsedPattern"]
      ? item["parsedPattern"]
      : threatIntelligenceParsedPatternArraySerializer(item["parsedPattern"]),
    externalId: item["externalId"],
    createdByRef: item["createdByRef"],
    defanged: item["defanged"],
    externalLastUpdatedTimeUtc: item["externalLastUpdatedTimeUtc"],
    externalReferences: !item["externalReferences"]
      ? item["externalReferences"]
      : threatIntelligenceExternalReferenceArraySerializer(item["externalReferences"]),
    granularMarkings: !item["granularMarkings"]
      ? item["granularMarkings"]
      : threatIntelligenceGranularMarkingModelArraySerializer(item["granularMarkings"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    revoked: item["revoked"],
    confidence: item["confidence"],
    objectMarkingRefs: !item["objectMarkingRefs"]
      ? item["objectMarkingRefs"]
      : item["objectMarkingRefs"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    threatTypes: !item["threatTypes"]
      ? item["threatTypes"]
      : item["threatTypes"].map((p: any) => {
          return p;
        }),
    validFrom: item["validFrom"],
    validUntil: item["validUntil"],
    created: item["created"],
    modified: item["modified"],
    extensions: item["extensions"],
  };
}

export function threatIntelligenceIndicatorPropertiesDeserializer(
  item: any,
): ThreatIntelligenceIndicatorProperties {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    threatIntelligenceTags: !item["threatIntelligenceTags"]
      ? item["threatIntelligenceTags"]
      : item["threatIntelligenceTags"].map((p: any) => {
          return p;
        }),
    lastUpdatedTimeUtc: item["lastUpdatedTimeUtc"],
    source: item["source"],
    displayName: item["displayName"],
    description: item["description"],
    indicatorTypes: !item["indicatorTypes"]
      ? item["indicatorTypes"]
      : item["indicatorTypes"].map((p: any) => {
          return p;
        }),
    pattern: item["pattern"],
    patternType: item["patternType"],
    patternVersion: item["patternVersion"],
    killChainPhases: !item["killChainPhases"]
      ? item["killChainPhases"]
      : threatIntelligenceKillChainPhaseArrayDeserializer(item["killChainPhases"]),
    parsedPattern: !item["parsedPattern"]
      ? item["parsedPattern"]
      : threatIntelligenceParsedPatternArrayDeserializer(item["parsedPattern"]),
    externalId: item["externalId"],
    createdByRef: item["createdByRef"],
    defanged: item["defanged"],
    externalLastUpdatedTimeUtc: item["externalLastUpdatedTimeUtc"],
    externalReferences: !item["externalReferences"]
      ? item["externalReferences"]
      : threatIntelligenceExternalReferenceArrayDeserializer(item["externalReferences"]),
    granularMarkings: !item["granularMarkings"]
      ? item["granularMarkings"]
      : threatIntelligenceGranularMarkingModelArrayDeserializer(item["granularMarkings"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    revoked: item["revoked"],
    confidence: item["confidence"],
    objectMarkingRefs: !item["objectMarkingRefs"]
      ? item["objectMarkingRefs"]
      : item["objectMarkingRefs"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    threatTypes: !item["threatTypes"]
      ? item["threatTypes"]
      : item["threatTypes"].map((p: any) => {
          return p;
        }),
    validFrom: item["validFrom"],
    validUntil: item["validUntil"],
    created: item["created"],
    modified: item["modified"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : Object.fromEntries(
          Object.entries(item["extensions"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function threatIntelligenceKillChainPhaseArraySerializer(
  result: Array<ThreatIntelligenceKillChainPhase>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceKillChainPhaseSerializer(item);
  });
}

export function threatIntelligenceKillChainPhaseArrayDeserializer(
  result: Array<ThreatIntelligenceKillChainPhase>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceKillChainPhaseDeserializer(item);
  });
}

/** Describes threat kill chain phase entity */
export interface ThreatIntelligenceKillChainPhase {
  /** Kill chainName name */
  killChainName?: string;
  /** Phase name */
  phaseName?: string;
}

export function threatIntelligenceKillChainPhaseSerializer(
  item: ThreatIntelligenceKillChainPhase,
): any {
  return { killChainName: item["killChainName"], phaseName: item["phaseName"] };
}

export function threatIntelligenceKillChainPhaseDeserializer(
  item: any,
): ThreatIntelligenceKillChainPhase {
  return {
    killChainName: item["killChainName"],
    phaseName: item["phaseName"],
  };
}

export function threatIntelligenceParsedPatternArraySerializer(
  result: Array<ThreatIntelligenceParsedPattern>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceParsedPatternSerializer(item);
  });
}

export function threatIntelligenceParsedPatternArrayDeserializer(
  result: Array<ThreatIntelligenceParsedPattern>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceParsedPatternDeserializer(item);
  });
}

/** Describes parsed pattern entity */
export interface ThreatIntelligenceParsedPattern {
  /** Pattern type key */
  patternTypeKey?: string;
  /** Pattern type keys */
  patternTypeValues?: ThreatIntelligenceParsedPatternTypeValue[];
}

export function threatIntelligenceParsedPatternSerializer(
  item: ThreatIntelligenceParsedPattern,
): any {
  return {
    patternTypeKey: item["patternTypeKey"],
    patternTypeValues: !item["patternTypeValues"]
      ? item["patternTypeValues"]
      : threatIntelligenceParsedPatternTypeValueArraySerializer(item["patternTypeValues"]),
  };
}

export function threatIntelligenceParsedPatternDeserializer(
  item: any,
): ThreatIntelligenceParsedPattern {
  return {
    patternTypeKey: item["patternTypeKey"],
    patternTypeValues: !item["patternTypeValues"]
      ? item["patternTypeValues"]
      : threatIntelligenceParsedPatternTypeValueArrayDeserializer(item["patternTypeValues"]),
  };
}

export function threatIntelligenceParsedPatternTypeValueArraySerializer(
  result: Array<ThreatIntelligenceParsedPatternTypeValue>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceParsedPatternTypeValueSerializer(item);
  });
}

export function threatIntelligenceParsedPatternTypeValueArrayDeserializer(
  result: Array<ThreatIntelligenceParsedPatternTypeValue>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceParsedPatternTypeValueDeserializer(item);
  });
}

/** Describes threat kill chain phase entity */
export interface ThreatIntelligenceParsedPatternTypeValue {
  /** Type of the value */
  valueType?: string;
  /** Value of parsed pattern */
  value?: string;
}

export function threatIntelligenceParsedPatternTypeValueSerializer(
  item: ThreatIntelligenceParsedPatternTypeValue,
): any {
  return { valueType: item["valueType"], value: item["value"] };
}

export function threatIntelligenceParsedPatternTypeValueDeserializer(
  item: any,
): ThreatIntelligenceParsedPatternTypeValue {
  return {
    valueType: item["valueType"],
    value: item["value"],
  };
}

export function threatIntelligenceExternalReferenceArraySerializer(
  result: Array<ThreatIntelligenceExternalReference>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceExternalReferenceSerializer(item);
  });
}

export function threatIntelligenceExternalReferenceArrayDeserializer(
  result: Array<ThreatIntelligenceExternalReference>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceExternalReferenceDeserializer(item);
  });
}

/** Describes external reference */
export interface ThreatIntelligenceExternalReference {
  /** External reference description */
  description?: string;
  /** External reference ID */
  externalId?: string;
  /** External reference source name */
  sourceName?: string;
  /** External reference URL */
  url?: string;
  /** External reference hashes */
  hashes?: Record<string, string>;
}

export function threatIntelligenceExternalReferenceSerializer(
  item: ThreatIntelligenceExternalReference,
): any {
  return {
    description: item["description"],
    externalId: item["externalId"],
    sourceName: item["sourceName"],
    url: item["url"],
    hashes: item["hashes"],
  };
}

export function threatIntelligenceExternalReferenceDeserializer(
  item: any,
): ThreatIntelligenceExternalReference {
  return {
    description: item["description"],
    externalId: item["externalId"],
    sourceName: item["sourceName"],
    url: item["url"],
    hashes: !item["hashes"]
      ? item["hashes"]
      : Object.fromEntries(Object.entries(item["hashes"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function threatIntelligenceGranularMarkingModelArraySerializer(
  result: Array<ThreatIntelligenceGranularMarkingModel>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceGranularMarkingModelSerializer(item);
  });
}

export function threatIntelligenceGranularMarkingModelArrayDeserializer(
  result: Array<ThreatIntelligenceGranularMarkingModel>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceGranularMarkingModelDeserializer(item);
  });
}

/** Describes threat granular marking model entity */
export interface ThreatIntelligenceGranularMarkingModel {
  /** Language granular marking model */
  language?: string;
  /** marking reference granular marking model */
  markingRef?: number;
  /** granular marking model selectors */
  selectors?: string[];
}

export function threatIntelligenceGranularMarkingModelSerializer(
  item: ThreatIntelligenceGranularMarkingModel,
): any {
  return {
    language: item["language"],
    markingRef: item["markingRef"],
    selectors: !item["selectors"]
      ? item["selectors"]
      : item["selectors"].map((p: any) => {
          return p;
        }),
  };
}

export function threatIntelligenceGranularMarkingModelDeserializer(
  item: any,
): ThreatIntelligenceGranularMarkingModel {
  return {
    language: item["language"],
    markingRef: item["markingRef"],
    selectors: !item["selectors"]
      ? item["selectors"]
      : item["selectors"].map((p: any) => {
          return p;
        }),
  };
}

/** Array of tags to be appended to the threat intelligence indicator. */
export interface ThreatIntelligenceAppendTags {
  /** List of tags to be appended. */
  threatIntelligenceTags?: string[];
}

export function threatIntelligenceAppendTagsSerializer(item: ThreatIntelligenceAppendTags): any {
  return {
    threatIntelligenceTags: !item["threatIntelligenceTags"]
      ? item["threatIntelligenceTags"]
      : item["threatIntelligenceTags"].map((p: any) => {
          return p;
        }),
  };
}

/** Filtering criteria for querying threat intelligence indicators. */
export interface ThreatIntelligenceFilteringCriteria {
  /** Page size */
  pageSize?: number;
  /** Minimum confidence. */
  minConfidence?: number;
  /** Maximum confidence. */
  maxConfidence?: number;
  /** Start time for ValidUntil filter. */
  minValidUntil?: string;
  /** End time for ValidUntil filter. */
  maxValidUntil?: string;
  /** Parameter to include/exclude disabled indicators. */
  includeDisabled?: boolean;
  /** Columns to sort by and sorting order */
  sortBy?: ThreatIntelligenceSortingCriteria[];
  /** Sources of threat intelligence indicators */
  sources?: string[];
  /** Pattern types */
  patternTypes?: string[];
  /** Threat types of threat intelligence indicators */
  threatTypes?: string[];
  /** Ids of threat intelligence indicators */
  ids?: string[];
  /** Keywords for searching threat intelligence indicators */
  keywords?: string[];
  /** Skip token. */
  skipToken?: string;
}

export function threatIntelligenceFilteringCriteriaSerializer(
  item: ThreatIntelligenceFilteringCriteria,
): any {
  return {
    pageSize: item["pageSize"],
    minConfidence: item["minConfidence"],
    maxConfidence: item["maxConfidence"],
    minValidUntil: item["minValidUntil"],
    maxValidUntil: item["maxValidUntil"],
    includeDisabled: item["includeDisabled"],
    sortBy: !item["sortBy"]
      ? item["sortBy"]
      : threatIntelligenceSortingCriteriaArraySerializer(item["sortBy"]),
    sources: !item["sources"]
      ? item["sources"]
      : item["sources"].map((p: any) => {
          return p;
        }),
    patternTypes: !item["patternTypes"]
      ? item["patternTypes"]
      : item["patternTypes"].map((p: any) => {
          return p;
        }),
    threatTypes: !item["threatTypes"]
      ? item["threatTypes"]
      : item["threatTypes"].map((p: any) => {
          return p;
        }),
    ids: !item["ids"]
      ? item["ids"]
      : item["ids"].map((p: any) => {
          return p;
        }),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    skipToken: item["skipToken"],
  };
}

export function threatIntelligenceSortingCriteriaArraySerializer(
  result: Array<ThreatIntelligenceSortingCriteria>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceSortingCriteriaSerializer(item);
  });
}

/** List of available columns for sorting */
export interface ThreatIntelligenceSortingCriteria {
  /** Column name */
  itemKey?: string;
  /** Sorting order (ascending/descending/unsorted). */
  sortOrder?: ThreatIntelligenceSortingOrder;
}

export function threatIntelligenceSortingCriteriaSerializer(
  item: ThreatIntelligenceSortingCriteria,
): any {
  return { itemKey: item["itemKey"], sortOrder: item["sortOrder"] };
}

/** Sorting order (ascending/descending/unsorted). */
export enum KnownThreatIntelligenceSortingOrder {
  /** unsorted */
  Unsorted = "unsorted",
  /** ascending */
  Ascending = "ascending",
  /** descending */
  Descending = "descending",
}

/**
 * Sorting order (ascending/descending/unsorted). \
 * {@link KnownThreatIntelligenceSortingOrder} can be used interchangeably with ThreatIntelligenceSortingOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unsorted**: unsorted \
 * **ascending**: ascending \
 * **descending**: descending
 */
export type ThreatIntelligenceSortingOrder = string;

/** List of all the threat intelligence information objects. */
export interface _ThreatIntelligenceInformationList {
  /** The ThreatIntelligenceInformation items on this page */
  value: ThreatIntelligenceInformationUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _threatIntelligenceInformationListDeserializer(
  item: any,
): _ThreatIntelligenceInformationList {
  return {
    value: threatIntelligenceInformationUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function threatIntelligenceInformationUnionArraySerializer(
  result: Array<ThreatIntelligenceInformationUnion>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceInformationUnionSerializer(item);
  });
}

export function threatIntelligenceInformationUnionArrayDeserializer(
  result: Array<ThreatIntelligenceInformationUnion>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceInformationUnionDeserializer(item);
  });
}

/** Data connector requirements properties. */
export interface DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  /** The discriminator possible values: AzureActiveDirectory, AzureAdvancedThreatProtection, AzureSecurityCenter, AmazonWebServicesCloudTrail, AmazonWebServicesS3, Dynamics365, MicrosoftCloudAppSecurity, MicrosoftDefenderAdvancedThreatProtection, MicrosoftThreatIntelligence, MicrosoftThreatProtection, OfficeATP, OfficeIRM, MicrosoftPurviewInformationProtection, Office365Project, OfficePowerBI, PurviewAudit, ThreatIntelligence, ThreatIntelligenceTaxii, IOT */
  kind: DataConnectorKind;
}

export function dataConnectorsCheckRequirementsSerializer(
  item: DataConnectorsCheckRequirements,
): any {
  return { kind: item["kind"] };
}

/** Alias for DataConnectorsCheckRequirementsUnion */
export type DataConnectorsCheckRequirementsUnion =
  | AADCheckRequirements
  | AatpCheckRequirements
  | ASCCheckRequirements
  | AwsCloudTrailCheckRequirements
  | AwsS3CheckRequirements
  | Dynamics365CheckRequirements
  | McasCheckRequirements
  | MdatpCheckRequirements
  | MstiCheckRequirements
  | MtpCheckRequirements
  | OfficeATPCheckRequirements
  | OfficeIRMCheckRequirements
  | MicrosoftPurviewInformationProtectionCheckRequirements
  | Office365ProjectCheckRequirements
  | OfficePowerBICheckRequirements
  | PurviewAuditCheckRequirements
  | TICheckRequirements
  | TiTaxiiCheckRequirements
  | IoTCheckRequirements
  | DataConnectorsCheckRequirements;

export function dataConnectorsCheckRequirementsUnionSerializer(
  item: DataConnectorsCheckRequirementsUnion,
): any {
  switch (item.kind) {
    case "AzureActiveDirectory":
      return aadCheckRequirementsSerializer(item as AADCheckRequirements);

    case "AzureAdvancedThreatProtection":
      return aatpCheckRequirementsSerializer(item as AatpCheckRequirements);

    case "AzureSecurityCenter":
      return ascCheckRequirementsSerializer(item as ASCCheckRequirements);

    case "AmazonWebServicesCloudTrail":
      return awsCloudTrailCheckRequirementsSerializer(item as AwsCloudTrailCheckRequirements);

    case "AmazonWebServicesS3":
      return awsS3CheckRequirementsSerializer(item as AwsS3CheckRequirements);

    case "Dynamics365":
      return dynamics365CheckRequirementsSerializer(item as Dynamics365CheckRequirements);

    case "MicrosoftCloudAppSecurity":
      return mcasCheckRequirementsSerializer(item as McasCheckRequirements);

    case "MicrosoftDefenderAdvancedThreatProtection":
      return mdatpCheckRequirementsSerializer(item as MdatpCheckRequirements);

    case "MicrosoftThreatIntelligence":
      return mstiCheckRequirementsSerializer(item as MstiCheckRequirements);

    case "MicrosoftThreatProtection":
      return mtpCheckRequirementsSerializer(item as MtpCheckRequirements);

    case "OfficeATP":
      return officeATPCheckRequirementsSerializer(item as OfficeATPCheckRequirements);

    case "OfficeIRM":
      return officeIRMCheckRequirementsSerializer(item as OfficeIRMCheckRequirements);

    case "MicrosoftPurviewInformationProtection":
      return microsoftPurviewInformationProtectionCheckRequirementsSerializer(
        item as MicrosoftPurviewInformationProtectionCheckRequirements,
      );

    case "Office365Project":
      return office365ProjectCheckRequirementsSerializer(item as Office365ProjectCheckRequirements);

    case "OfficePowerBI":
      return officePowerBICheckRequirementsSerializer(item as OfficePowerBICheckRequirements);

    case "PurviewAudit":
      return purviewAuditCheckRequirementsSerializer(item as PurviewAuditCheckRequirements);

    case "ThreatIntelligence":
      return tiCheckRequirementsSerializer(item as TICheckRequirements);

    case "ThreatIntelligenceTaxii":
      return tiTaxiiCheckRequirementsSerializer(item as TiTaxiiCheckRequirements);

    case "IOT":
      return ioTCheckRequirementsSerializer(item as IoTCheckRequirements);

    default:
      return dataConnectorsCheckRequirementsSerializer(item);
  }
}

/** Represents AADIP (Azure Active Directory Identity Protection) requirements check request. */
export interface AADCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "AzureActiveDirectory";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function aadCheckRequirementsSerializer(item: AADCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _aadCheckRequirementsPropertiesSerializer(item),
  };
}

/** AADIP (Azure Active Directory Identity Protection) requirements check properties. */
export interface AADCheckRequirementsProperties extends DataConnectorTenantId {}

export function aadCheckRequirementsPropertiesSerializer(
  item: AADCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents AATP (Azure Advanced Threat Protection) requirements check request. */
export interface AatpCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "AzureAdvancedThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function aatpCheckRequirementsSerializer(item: AatpCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _aatpCheckRequirementsPropertiesSerializer(item),
  };
}

/** AATP (Azure Advanced Threat Protection) requirements check properties. */
export interface AatpCheckRequirementsProperties extends DataConnectorTenantId {}

export function aatpCheckRequirementsPropertiesSerializer(
  item: AatpCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents ASC (Azure Security Center) requirements check request. */
export interface ASCCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "AzureSecurityCenter";
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ascCheckRequirementsSerializer(item: ASCCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["subscriptionId"])
      ? undefined
      : _ascCheckRequirementsPropertiesSerializer(item),
  };
}

/** ASC (Azure Security Center) requirements check properties. */
export interface ASCCheckRequirementsProperties {
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ascCheckRequirementsPropertiesSerializer(
  item: ASCCheckRequirementsProperties,
): any {
  return { subscriptionId: item["subscriptionId"] };
}

/** Amazon Web Services CloudTrail requirements check request. */
export interface AwsCloudTrailCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "AmazonWebServicesCloudTrail";
}

export function awsCloudTrailCheckRequirementsSerializer(
  item: AwsCloudTrailCheckRequirements,
): any {
  return { kind: item["kind"] };
}

/** Amazon Web Services S3 requirements check request. */
export interface AwsS3CheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "AmazonWebServicesS3";
}

export function awsS3CheckRequirementsSerializer(item: AwsS3CheckRequirements): any {
  return { kind: item["kind"] };
}

/** Represents Dynamics365 requirements check request. */
export interface Dynamics365CheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "Dynamics365";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function dynamics365CheckRequirementsSerializer(item: Dynamics365CheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _dynamics365CheckRequirementsPropertiesSerializer(item),
  };
}

/** Dynamics365 requirements check properties. */
export interface Dynamics365CheckRequirementsProperties extends DataConnectorTenantId {}

export function dynamics365CheckRequirementsPropertiesSerializer(
  item: Dynamics365CheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents MCAS (Microsoft Cloud App Security) requirements check request. */
export interface McasCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "MicrosoftCloudAppSecurity";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function mcasCheckRequirementsSerializer(item: McasCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _mcasCheckRequirementsPropertiesSerializer(item),
  };
}

/** MCAS (Microsoft Cloud App Security) requirements check properties. */
export interface McasCheckRequirementsProperties extends DataConnectorTenantId {}

export function mcasCheckRequirementsPropertiesSerializer(
  item: McasCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents MDATP (Microsoft Defender Advanced Threat Protection) requirements check request. */
export interface MdatpCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "MicrosoftDefenderAdvancedThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function mdatpCheckRequirementsSerializer(item: MdatpCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _mdatpCheckRequirementsPropertiesSerializer(item),
  };
}

/** MDATP (Microsoft Defender Advanced Threat Protection) requirements check properties. */
export interface MdatpCheckRequirementsProperties extends DataConnectorTenantId {}

export function mdatpCheckRequirementsPropertiesSerializer(
  item: MdatpCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents Microsoft Threat Intelligence requirements check request. */
export interface MstiCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "MicrosoftThreatIntelligence";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function mstiCheckRequirementsSerializer(item: MstiCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _mstiCheckRequirementsPropertiesSerializer(item),
  };
}

/** Microsoft Threat Intelligence requirements check properties. */
export interface MstiCheckRequirementsProperties extends DataConnectorTenantId {}

export function mstiCheckRequirementsPropertiesSerializer(
  item: MstiCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents MTP (Microsoft Threat Protection) requirements check request. */
export interface MtpCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "MicrosoftThreatProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function mtpCheckRequirementsSerializer(item: MtpCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _mtpCheckRequirementsPropertiesSerializer(item),
  };
}

/** MTP (Microsoft Threat Protection) requirements check properties. */
export interface MTPCheckRequirementsProperties extends DataConnectorTenantId {}

export function mtpCheckRequirementsPropertiesSerializer(
  item: MTPCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents OfficeATP (Office 365 Advanced Threat Protection) requirements check request. */
export interface OfficeATPCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "OfficeATP";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function officeATPCheckRequirementsSerializer(item: OfficeATPCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _officeATPCheckRequirementsPropertiesSerializer(item),
  };
}

/** OfficeATP (Office 365 Advanced Threat Protection) requirements check properties. */
export interface OfficeATPCheckRequirementsProperties extends DataConnectorTenantId {}

export function officeATPCheckRequirementsPropertiesSerializer(
  item: OfficeATPCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents OfficeIRM (Microsoft Insider Risk Management) requirements check request. */
export interface OfficeIRMCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "OfficeIRM";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function officeIRMCheckRequirementsSerializer(item: OfficeIRMCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _officeIRMCheckRequirementsPropertiesSerializer(item),
  };
}

/** OfficeIRM (Microsoft Insider Risk Management) requirements check properties. */
export interface OfficeIRMCheckRequirementsProperties extends DataConnectorTenantId {}

export function officeIRMCheckRequirementsPropertiesSerializer(
  item: OfficeIRMCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents MicrosoftPurviewInformationProtection requirements check request. */
export interface MicrosoftPurviewInformationProtectionCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "MicrosoftPurviewInformationProtection";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function microsoftPurviewInformationProtectionCheckRequirementsSerializer(
  item: MicrosoftPurviewInformationProtectionCheckRequirements,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _microsoftPurviewInformationProtectionCheckRequirementsPropertiesSerializer(item),
  };
}

/** MicrosoftPurviewInformationProtection requirements check properties. */
export interface MicrosoftPurviewInformationProtectionCheckRequirementsProperties extends DataConnectorTenantId {}

export function microsoftPurviewInformationProtectionCheckRequirementsPropertiesSerializer(
  item: MicrosoftPurviewInformationProtectionCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents Office365 Project requirements check request. */
export interface Office365ProjectCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "Office365Project";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function office365ProjectCheckRequirementsSerializer(
  item: Office365ProjectCheckRequirements,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _office365ProjectCheckRequirementsPropertiesSerializer(item),
  };
}

/** Office365 Project requirements check properties. */
export interface Office365ProjectCheckRequirementsProperties extends DataConnectorTenantId {}

export function office365ProjectCheckRequirementsPropertiesSerializer(
  item: Office365ProjectCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents Office PowerBI requirements check request. */
export interface OfficePowerBICheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "OfficePowerBI";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function officePowerBICheckRequirementsSerializer(
  item: OfficePowerBICheckRequirements,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _officePowerBICheckRequirementsPropertiesSerializer(item),
  };
}

/** Office PowerBI requirements check properties. */
export interface OfficePowerBICheckRequirementsProperties extends DataConnectorTenantId {}

export function officePowerBICheckRequirementsPropertiesSerializer(
  item: OfficePowerBICheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents PurviewAudit requirements check request. */
export interface PurviewAuditCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "PurviewAudit";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function purviewAuditCheckRequirementsSerializer(item: PurviewAuditCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _purviewAuditCheckRequirementsPropertiesSerializer(item),
  };
}

/** PurviewAudit requirements check properties. */
export interface PurviewAuditCheckRequirementsProperties extends DataConnectorTenantId {}

export function purviewAuditCheckRequirementsPropertiesSerializer(
  item: PurviewAuditCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Threat Intelligence Platforms data connector check requirements */
export interface TICheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "ThreatIntelligence";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function tiCheckRequirementsSerializer(item: TICheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _tiCheckRequirementsPropertiesSerializer(item),
  };
}

/** Threat Intelligence Platforms data connector required properties. */
export interface TICheckRequirementsProperties extends DataConnectorTenantId {}

export function tiCheckRequirementsPropertiesSerializer(item: TICheckRequirementsProperties): any {
  return { tenantId: item["tenantId"] };
}

/** Threat Intelligence TAXII data connector check requirements */
export interface TiTaxiiCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "ThreatIntelligenceTaxii";
  /** The tenant id to connect to, and get the data from. */
  tenantId?: string;
}

export function tiTaxiiCheckRequirementsSerializer(item: TiTaxiiCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["tenantId"])
      ? undefined
      : _tiTaxiiCheckRequirementsPropertiesSerializer(item),
  };
}

/** Threat Intelligence TAXII data connector required properties. */
export interface TiTaxiiCheckRequirementsProperties extends DataConnectorTenantId {}

export function tiTaxiiCheckRequirementsPropertiesSerializer(
  item: TiTaxiiCheckRequirementsProperties,
): any {
  return { tenantId: item["tenantId"] };
}

/** Represents IoT requirements check request. */
export interface IoTCheckRequirements extends DataConnectorsCheckRequirements {
  /** Describes the kind of connector to be checked. */
  kind: "IOT";
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ioTCheckRequirementsSerializer(item: IoTCheckRequirements): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["subscriptionId"])
      ? undefined
      : _ioTCheckRequirementsPropertiesSerializer(item),
  };
}

/** IoT requirements check properties. */
export interface IoTCheckRequirementsProperties {
  /** The subscription id to connect to, and get the data from. */
  subscriptionId?: string;
}

export function ioTCheckRequirementsPropertiesSerializer(
  item: IoTCheckRequirementsProperties,
): any {
  return { subscriptionId: item["subscriptionId"] };
}

/** Data connector requirements status. */
export interface DataConnectorRequirementsState {
  /** Authorization state for this connector */
  authorizationState?: DataConnectorAuthorizationState;
  /** License state for this connector */
  licenseState?: DataConnectorLicenseState;
}

export function dataConnectorRequirementsStateDeserializer(
  item: any,
): DataConnectorRequirementsState {
  return {
    authorizationState: item["authorizationState"],
    licenseState: item["licenseState"],
  };
}

/** Describes the state of user's authorization for a connector kind. */
export enum KnownDataConnectorAuthorizationState {
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Describes the state of user's authorization for a connector kind. \
 * {@link KnownDataConnectorAuthorizationState} can be used interchangeably with DataConnectorAuthorizationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Valid \
 * **Invalid**: Invalid
 */
export type DataConnectorAuthorizationState = string;

/** Describes the state of user's license for a connector kind. */
export enum KnownDataConnectorLicenseState {
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Describes the state of user's license for a connector kind. \
 * {@link KnownDataConnectorLicenseState} can be used interchangeably with DataConnectorLicenseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Valid \
 * **Invalid**: Invalid \
 * **Unknown**: Unknown
 */
export type DataConnectorLicenseState = string;

/** List all the source controls. */
export interface _RepoList {
  /** The Repo items on this page */
  value: Repo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _repoListDeserializer(item: any): _RepoList {
  return {
    value: repoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function repoArrayDeserializer(result: Array<Repo>): any[] {
  return result.map((item) => {
    return repoDeserializer(item);
  });
}

/** Represents a repository. */
export interface Repo {
  /** The url to access the repository. */
  url?: string;
  /** The name of the repository. */
  fullName?: string;
  /** The installation id of the repository. */
  installationId?: number;
  /** Array of branches. */
  branches?: string[];
}

export function repoDeserializer(item: any): Repo {
  return {
    url: item["url"],
    fullName: item["fullName"],
    installationId: item["installationId"],
    branches: !item["branches"]
      ? item["branches"]
      : item["branches"].map((p: any) => {
          return p;
        }),
  };
}

/** List of all the threat intelligence metric fields (type/threat type/source). */
export interface ThreatIntelligenceMetricsList {
  /** Array of threat intelligence metric fields (type/threat type/source). */
  value: ThreatIntelligenceMetrics[];
}

export function threatIntelligenceMetricsListDeserializer(
  item: any,
): ThreatIntelligenceMetricsList {
  return {
    value: threatIntelligenceMetricsArrayDeserializer(item["value"]),
  };
}

export function threatIntelligenceMetricsArrayDeserializer(
  result: Array<ThreatIntelligenceMetrics>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceMetricsDeserializer(item);
  });
}

/** Threat intelligence metrics. */
export interface ThreatIntelligenceMetrics {
  /** Threat intelligence metrics. */
  properties?: ThreatIntelligenceMetric;
}

export function threatIntelligenceMetricsDeserializer(item: any): ThreatIntelligenceMetrics {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : threatIntelligenceMetricDeserializer(item["properties"]),
  };
}

/** Describes threat intelligence metric */
export interface ThreatIntelligenceMetric {
  /** Last updated indicator metric */
  lastUpdatedTimeUtc?: string;
  /** Threat type metrics */
  threatTypeMetrics?: ThreatIntelligenceMetricEntity[];
  /** Pattern type metrics */
  patternTypeMetrics?: ThreatIntelligenceMetricEntity[];
  /** Source metrics */
  sourceMetrics?: ThreatIntelligenceMetricEntity[];
}

export function threatIntelligenceMetricDeserializer(item: any): ThreatIntelligenceMetric {
  return {
    lastUpdatedTimeUtc: item["lastUpdatedTimeUtc"],
    threatTypeMetrics: !item["threatTypeMetrics"]
      ? item["threatTypeMetrics"]
      : threatIntelligenceMetricEntityArrayDeserializer(item["threatTypeMetrics"]),
    patternTypeMetrics: !item["patternTypeMetrics"]
      ? item["patternTypeMetrics"]
      : threatIntelligenceMetricEntityArrayDeserializer(item["patternTypeMetrics"]),
    sourceMetrics: !item["sourceMetrics"]
      ? item["sourceMetrics"]
      : threatIntelligenceMetricEntityArrayDeserializer(item["sourceMetrics"]),
  };
}

export function threatIntelligenceMetricEntityArrayDeserializer(
  result: Array<ThreatIntelligenceMetricEntity>,
): any[] {
  return result.map((item) => {
    return threatIntelligenceMetricEntityDeserializer(item);
  });
}

/** Describes threat intelligence metric entity */
export interface ThreatIntelligenceMetricEntity {
  /** Metric name */
  metricName?: string;
  /** Metric value */
  metricValue?: number;
}

export function threatIntelligenceMetricEntityDeserializer(
  item: any,
): ThreatIntelligenceMetricEntity {
  return {
    metricName: item["metricName"],
    metricValue: item["metricValue"],
  };
}

/** Represents a query to run on the TI objects in the workspace. */
export interface CountQuery {
  /** Represents a condition used to query for TI objects. */
  condition?: ConditionProperties;
}

export function countQuerySerializer(item: CountQuery): any {
  return {
    properties: areAllPropsUndefined(item, ["condition"])
      ? undefined
      : _countQueryPropertiesSerializer(item),
  };
}

/** Describes the query properties */
export interface QueryProperties {
  /** Represents a condition used to query for TI objects. */
  condition?: ConditionProperties;
}

export function queryPropertiesSerializer(item: QueryProperties): any {
  return {
    condition: !item["condition"]
      ? item["condition"]
      : conditionPropertiesSerializer(item["condition"]),
  };
}

/** Represents a condition used to query for TI objects. */
export interface ConditionProperties {
  /** The STIX type for the objects returned by this query. */
  readonly stixObjectType?: string;
  /** The list of clauses to be evaluated in disjunction or conjunction base on the specified top level connective operator. */
  clauses: ConditionClause[];
  /** The top level connective operator for this condition. */
  readonly conditionConnective?: Connective;
}

export function conditionPropertiesSerializer(item: ConditionProperties): any {
  return { clauses: conditionClauseArraySerializer(item["clauses"]) };
}

export function conditionClauseArraySerializer(result: Array<ConditionClause>): any[] {
  return result.map((item) => {
    return conditionClauseSerializer(item);
  });
}

/** Represents a single clause to be evaluated by a NormalizedCondition. */
export interface ConditionClause {
  /** The connective used to join all values in this ConditionClause */
  readonly clauseConnective?: Connective;
  /** The name of the field that is evaluated. */
  field: string;
  /** Represents an operator in a ConditionClause. */
  operator: Operator;
  /** The top level connective operator for this condition. */
  values: string[];
}

export function conditionClauseSerializer(item: ConditionClause): any {
  return {
    field: item["field"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Represents boolean connectives used to join clauses in conditions. */
export enum KnownConnective {
  /** 'And' connective */
  And = "And",
  /** 'Or' connective */
  Or = "Or",
}

/**
 * Represents boolean connectives used to join clauses in conditions. \
 * {@link KnownConnective} can be used interchangeably with Connective,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **And**: 'And' connective \
 * **Or**: 'Or' connective
 */
export type Connective = string;

/** Count of all the threat intelligence objects on the workspace that match the provided query. */
export interface ThreatIntelligenceCount {
  /** Count of all the threat intelligence objects on the workspace that match the provided query. */
  readonly count: number;
}

export function threatIntelligenceCountDeserializer(item: any): ThreatIntelligenceCount {
  return {
    count: item["count"],
  };
}

/** Represents a query to run on the TI objects in the workspace. */
export interface Query {
  /** Represents a condition used to query for TI objects. */
  condition?: QueryCondition;
  /** Specifies how to sort the query results. */
  sortBy?: QuerySortBy;
  /** Represents the maximum size of the page that will be returned from the query API. */
  maxPageSize?: number;
  /** Represents the minimum size of the page that will be returned from the query API. */
  minPageSize?: number;
}

export function querySerializer(item: Query): any {
  return {
    condition: !item["condition"] ? item["condition"] : queryConditionSerializer(item["condition"]),
    sortBy: !item["sortBy"] ? item["sortBy"] : querySortBySerializer(item["sortBy"]),
    maxPageSize: item["maxPageSize"],
    minPageSize: item["minPageSize"],
  };
}

/** Represents a condition used to query for TI objects. */
export interface QueryCondition {
  /** The STIX type for the objects returned by this query. */
  stixObjectType?: string;
  /** The list of clauses to be evaluated in disjunction or conjunction base on the specified top level connective operator. */
  clauses: ConditionClause[];
  /** The top level connective operator for this condition. */
  conditionConnective?: Connective;
}

export function queryConditionSerializer(item: QueryCondition): any {
  return {
    stixObjectType: item["stixObjectType"],
    clauses: conditionClauseArraySerializer(item["clauses"]),
    conditionConnective: item["conditionConnective"],
  };
}

/** Specifies how to sort the query results. */
export interface QuerySortBy {
  /** The direction to sort the results by. */
  direction?: SortingDirection;
  /** Represents the field to sort the results by. */
  field?: string;
}

export function querySortBySerializer(item: QuerySortBy): any {
  return { direction: item["direction"], field: item["field"] };
}

/** The direction to sort the results by. */
export enum KnownSortingDirection {
  /** Indicates that the query should be sorted from lowest-to-highest value. */
  ASC = "ASC",
  /** Indicates that the query should be sorted from lowest-to-highest value. */
  Desc = "DESC",
}

/**
 * The direction to sort the results by. \
 * {@link KnownSortingDirection} can be used interchangeably with SortingDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ASC**: Indicates that the query should be sorted from lowest-to-highest value. \
 * **DESC**: Indicates that the query should be sorted from lowest-to-highest value.
 */
export type SortingDirection = string;

/** List all the threat intelligence objects on the workspace that match the provided query. */
export interface _ThreatIntelligenceList {
  /** The TIObject items on this page */
  value: TIObjectUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _threatIntelligenceListDeserializer(item: any): _ThreatIntelligenceList {
  return {
    value: tiObjectUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tiObjectUnionArrayDeserializer(result: Array<TIObjectUnion>): any[] {
  return result.map((item) => {
    return tiObjectUnionDeserializer(item);
  });
}

/** Represents a threat intelligence object in Azure Security Insights. */
export interface TIObject extends Resource {
  /** The kind of the TI object */
  /** The discriminator possible values: ThreatActor, AttackPattern, Identity, Relationship, Indicator */
  kind: TIObjectKind;
  /** The core STIX object that this TI object represents. */
  readonly data?: Record<string, any>;
  /** The UserInfo of the user/entity which originally created this TI object. */
  readonly createdBy?: UserInfo;
  /** The source name for this TI object. */
  readonly source?: string;
  /** The timestamp for the first time this object was ingested. */
  readonly firstIngestedTimeUtc?: Date;
  /** The timestamp for the last time this object was ingested. */
  readonly lastIngestedTimeUtc?: Date;
  /** The ID of the rules version that was active when this TI object was last ingested. */
  readonly ingestionRulesVersion?: string;
  /** The name of the method/application that initiated the last write to this TI object. */
  readonly lastUpdateMethod?: string;
  /** The UserInfo of the user/entity which last modified this TI object. */
  readonly lastModifiedBy?: UserInfo;
  /** The timestamp for the last time this TI object was updated. */
  readonly lastUpdatedDateTimeUtc?: Date;
  /** A dictionary used to help follow relationships from this object to other STIX objects. The keys are field names from the STIX object (in the 'data' field), and the values are lists of sources that can be prepended to the object ID in order to efficiently locate the target TI object. */
  readonly relationshipHints?: RelationshipHint[];
}

export function tiObjectDeserializer(item: any): TIObject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Alias for TIObjectUnion */
export type TIObjectUnion =
  | ThreatActor
  | AttackPattern
  | Identity
  | Relationship
  | Indicator
  | TIObject;

export function tiObjectUnionDeserializer(item: any): TIObjectUnion {
  switch (item["kind"]) {
    case "ThreatActor":
      return threatActorDeserializer(item as ThreatActor);

    case "AttackPattern":
      return attackPatternDeserializer(item as AttackPattern);

    case "Identity":
      return identityDeserializer(item as Identity);

    case "Relationship":
      return relationshipDeserializer(item as Relationship);

    case "Indicator":
      return indicatorDeserializer(item as Indicator);

    default:
      return tiObjectDeserializer(item);
  }
}

/** Describes properties common to all threat intelligence objects */
export interface TIObjectCommonProperties {
  /** The core STIX object that this TI object represents. */
  readonly data?: Record<string, any>;
  /** The UserInfo of the user/entity which originally created this TI object. */
  readonly createdBy?: UserInfo;
  /** The source name for this TI object. */
  readonly source?: string;
  /** The timestamp for the first time this object was ingested. */
  readonly firstIngestedTimeUtc?: Date;
  /** The timestamp for the last time this object was ingested. */
  readonly lastIngestedTimeUtc?: Date;
  /** The ID of the rules version that was active when this TI object was last ingested. */
  readonly ingestionRulesVersion?: string;
  /** The name of the method/application that initiated the last write to this TI object. */
  readonly lastUpdateMethod?: string;
  /** The UserInfo of the user/entity which last modified this TI object. */
  readonly lastModifiedBy?: UserInfo;
  /** The timestamp for the last time this TI object was updated. */
  readonly lastUpdatedDateTimeUtc?: Date;
  /** A dictionary used to help follow relationships from this object to other STIX objects. The keys are field names from the STIX object (in the 'data' field), and the values are lists of sources that can be prepended to the object ID in order to efficiently locate the target TI object. */
  readonly relationshipHints?: RelationshipHint[];
}

export function tiObjectCommonPropertiesDeserializer(item: any): TIObjectCommonProperties {
  return {
    data: !item["data"]
      ? item["data"]
      : Object.fromEntries(Object.entries(item["data"]).map(([k, p]: [string, any]) => [k, p])),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    source: item["source"],
    firstIngestedTimeUtc: !item["firstIngestedTimeUtc"]
      ? item["firstIngestedTimeUtc"]
      : new Date(item["firstIngestedTimeUtc"]),
    lastIngestedTimeUtc: !item["lastIngestedTimeUtc"]
      ? item["lastIngestedTimeUtc"]
      : new Date(item["lastIngestedTimeUtc"]),
    ingestionRulesVersion: item["ingestionRulesVersion"],
    lastUpdateMethod: item["lastUpdateMethod"],
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : userInfoDeserializer(item["lastModifiedBy"]),
    lastUpdatedDateTimeUtc: !item["lastUpdatedDateTimeUtc"]
      ? item["lastUpdatedDateTimeUtc"]
      : new Date(item["lastUpdatedDateTimeUtc"]),
    relationshipHints: !item["relationshipHints"]
      ? item["relationshipHints"]
      : relationshipHintArrayDeserializer(item["relationshipHints"]),
  };
}

export function relationshipHintArrayDeserializer(result: Array<RelationshipHint>): any[] {
  return result.map((item) => {
    return relationshipHintDeserializer(item);
  });
}

/** An object used to help follow relationships from this object to other STIX objects. */
export interface RelationshipHint {
  fieldName?: string;
  source?: string;
}

export function relationshipHintDeserializer(item: any): RelationshipHint {
  return {
    fieldName: item["fieldName"],
    source: item["source"],
  };
}

/** The kind of the TI object */
export enum KnownTIObjectKind {
  /** A TI object that represents an attack pattern. */
  AttackPattern = "AttackPattern",
  /** A TI object that represents an identity. */
  Identity = "Identity",
  /** A TI object that represents an indicator. */
  Indicator = "Indicator",
  /** A TI object that represents a relationship between two TI objects. */
  Relationship = "Relationship",
  /** A TI object that represents a threat actor. */
  ThreatActor = "ThreatActor",
}

/**
 * The kind of the TI object \
 * {@link KnownTIObjectKind} can be used interchangeably with TIObjectKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AttackPattern**: A TI object that represents an attack pattern. \
 * **Identity**: A TI object that represents an identity. \
 * **Indicator**: A TI object that represents an indicator. \
 * **Relationship**: A TI object that represents a relationship between two TI objects. \
 * **ThreatActor**: A TI object that represents a threat actor.
 */
export type TIObjectKind = string;

/** Represents a threat actor in Azure Security Insights. */
export interface ThreatActor extends TIObject {
  /** The kind of the TI object */
  kind: "ThreatActor";
}

export function threatActorDeserializer(item: any): ThreatActor {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Represents an attack pattern in Azure Security Insights. */
export interface AttackPattern extends TIObject {
  /** The kind of the TI object */
  kind: "AttackPattern";
}

export function attackPatternDeserializer(item: any): AttackPattern {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Represents an identity in Azure Security Insights. */
export interface Identity extends TIObject {
  /** The kind of the TI object */
  kind: "Identity";
}

export function identityDeserializer(item: any): Identity {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Represents a relationship in Azure Security Insights. */
export interface Relationship extends TIObject {
  /** The kind of the TI object */
  kind: "Relationship";
}

export function relationshipDeserializer(item: any): Relationship {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Represents an indicator in Azure Security Insights. */
export interface Indicator extends TIObject {
  /** The observables of this indicator */
  observables?: IndicatorObservablesItem[];
  /** The kind of the TI object */
  kind: "Indicator";
}

export function indicatorDeserializer(item: any): Indicator {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _tiObjectPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    observables: !item["observables"]
      ? item["observables"]
      : indicatorObservablesItemArrayDeserializer(item["observables"]),
  };
}

export function indicatorObservablesItemArrayDeserializer(
  result: Array<IndicatorObservablesItem>,
): any[] {
  return result.map((item) => {
    return indicatorObservablesItemDeserializer(item);
  });
}

/** An observable of this indicator */
export interface IndicatorObservablesItem {
  /** The type of the observable of this indicator */
  type?: string;
  /** The value of the observable of this indicator */
  value?: string;
}

export function indicatorObservablesItemDeserializer(item: any): IndicatorObservablesItem {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The parameters required to execute s timeline operation on the given entity. */
export interface EntityTimelineParameters {
  /** Array of timeline Item kinds. */
  kinds?: EntityTimelineKind[];
  /** The start timeline date, so the results returned are after this date. */
  startTime: Date;
  /** The end timeline date, so the results returned are before this date. */
  endTime: Date;
  /** The number of bucket for timeline queries aggregation. */
  numberOfBucket?: number;
}

export function entityTimelineParametersSerializer(item: EntityTimelineParameters): any {
  return {
    kinds: !item["kinds"]
      ? item["kinds"]
      : item["kinds"].map((p: any) => {
          return p;
        }),
    startTime: item["startTime"].toISOString(),
    endTime: item["endTime"].toISOString(),
    numberOfBucket: item["numberOfBucket"],
  };
}

/** The entity query kind */
export enum KnownEntityTimelineKind {
  /** activity */
  Activity = "Activity",
  /** bookmarks */
  Bookmark = "Bookmark",
  /** security alerts */
  SecurityAlert = "SecurityAlert",
  /** anomaly */
  Anomaly = "Anomaly",
}

/**
 * The entity query kind \
 * {@link KnownEntityTimelineKind} can be used interchangeably with EntityTimelineKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activity**: activity \
 * **Bookmark**: bookmarks \
 * **SecurityAlert**: security alerts \
 * **Anomaly**: anomaly
 */
export type EntityTimelineKind = string;

/** The entity timeline result operation response. */
export interface EntityTimelineResponse {
  /** The metadata from the timeline operation results. */
  metaData?: TimelineResultsMetadata;
  /** The timeline result values. */
  value?: EntityTimelineItemUnion[];
}

export function entityTimelineResponseDeserializer(item: any): EntityTimelineResponse {
  return {
    metaData: !item["metaData"]
      ? item["metaData"]
      : timelineResultsMetadataDeserializer(item["metaData"]),
    value: !item["value"] ? item["value"] : entityTimelineItemUnionArrayDeserializer(item["value"]),
  };
}

/** Expansion result metadata. */
export interface TimelineResultsMetadata {
  /** the total items found for the timeline request */
  totalCount: number;
  /** timeline aggregation per kind */
  aggregations: TimelineAggregation[];
  /** information about the failure queries */
  errors?: TimelineError[];
}

export function timelineResultsMetadataDeserializer(item: any): TimelineResultsMetadata {
  return {
    totalCount: item["totalCount"],
    aggregations: timelineAggregationArrayDeserializer(item["aggregations"]),
    errors: !item["errors"] ? item["errors"] : timelineErrorArrayDeserializer(item["errors"]),
  };
}

export function timelineAggregationArrayDeserializer(result: Array<TimelineAggregation>): any[] {
  return result.map((item) => {
    return timelineAggregationDeserializer(item);
  });
}

/** timeline aggregation information per kind */
export interface TimelineAggregation {
  /** the total items found for a kind */
  count: number;
  /** the query kind */
  kind: EntityTimelineKind;
}

export function timelineAggregationDeserializer(item: any): TimelineAggregation {
  return {
    count: item["count"],
    kind: item["kind"],
  };
}

export function timelineErrorArrayDeserializer(result: Array<TimelineError>): any[] {
  return result.map((item) => {
    return timelineErrorDeserializer(item);
  });
}

/** Timeline Query Errors. */
export interface TimelineError {
  /** the query kind */
  kind: EntityTimelineKind;
  /** the query id */
  queryId?: string;
  /** the error message */
  errorMessage: string;
}

export function timelineErrorDeserializer(item: any): TimelineError {
  return {
    kind: item["kind"],
    queryId: item["queryId"],
    errorMessage: item["errorMessage"],
  };
}

export function entityTimelineItemUnionArrayDeserializer(
  result: Array<EntityTimelineItemUnion>,
): any[] {
  return result.map((item) => {
    return entityTimelineItemUnionDeserializer(item);
  });
}

/** Entity timeline Item. */
export interface EntityTimelineItem {
  /** The entity query kind type. */
  /** The discriminator possible values: Activity, Bookmark, Anomaly, SecurityAlert */
  kind: EntityTimelineKind;
}

export function entityTimelineItemDeserializer(item: any): EntityTimelineItem {
  return {
    kind: item["kind"],
  };
}

/** Alias for EntityTimelineItemUnion */
export type EntityTimelineItemUnion =
  | ActivityTimelineItem
  | BookmarkTimelineItem
  | AnomalyTimelineItem
  | SecurityAlertTimelineItem
  | EntityTimelineItem;

export function entityTimelineItemUnionDeserializer(item: any): EntityTimelineItemUnion {
  switch (item["kind"]) {
    case "Activity":
      return activityTimelineItemDeserializer(item as ActivityTimelineItem);

    case "Bookmark":
      return bookmarkTimelineItemDeserializer(item as BookmarkTimelineItem);

    case "Anomaly":
      return anomalyTimelineItemDeserializer(item as AnomalyTimelineItem);

    case "SecurityAlert":
      return securityAlertTimelineItemDeserializer(item as SecurityAlertTimelineItem);

    default:
      return entityTimelineItemDeserializer(item);
  }
}

/** Represents Activity timeline item. */
export interface ActivityTimelineItem extends EntityTimelineItem {
  /** The activity query id. */
  queryId: string;
  /** The grouping bucket start time. */
  bucketStartTimeUTC: Date;
  /** The grouping bucket end time. */
  bucketEndTimeUTC: Date;
  /** The time of the first activity in the grouping bucket. */
  firstActivityTimeUTC: Date;
  /** The time of the last activity in the grouping bucket. */
  lastActivityTimeUTC: Date;
  /** The activity timeline content. */
  content: string;
  /** The activity timeline title. */
  title: string;
  /** The entity query kind type. */
  kind: "Activity";
}

export function activityTimelineItemDeserializer(item: any): ActivityTimelineItem {
  return {
    kind: item["kind"],
    queryId: item["queryId"],
    bucketStartTimeUTC: new Date(item["bucketStartTimeUTC"]),
    bucketEndTimeUTC: new Date(item["bucketEndTimeUTC"]),
    firstActivityTimeUTC: new Date(item["firstActivityTimeUTC"]),
    lastActivityTimeUTC: new Date(item["lastActivityTimeUTC"]),
    content: item["content"],
    title: item["title"],
  };
}

/** Represents bookmark timeline item. */
export interface BookmarkTimelineItem extends EntityTimelineItem {
  /** The bookmark azure resource id. */
  azureResourceId: string;
  /** The bookmark display name. */
  displayName?: string;
  /** The notes of the bookmark */
  notes?: string;
  /** The bookmark end time. */
  endTimeUtc?: Date;
  /** The bookmark start time. */
  startTimeUtc?: Date;
  /** The bookmark event time. */
  eventTime?: Date;
  /** Describes a user that created the bookmark */
  createdBy?: UserInfo;
  /** List of labels relevant to this bookmark */
  labels?: string[];
  /** The entity query kind type. */
  kind: "Bookmark";
}

export function bookmarkTimelineItemDeserializer(item: any): BookmarkTimelineItem {
  return {
    kind: item["kind"],
    azureResourceId: item["azureResourceId"],
    displayName: item["displayName"],
    notes: item["notes"],
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents anomaly timeline item. */
export interface AnomalyTimelineItem extends EntityTimelineItem {
  /** The anomaly azure resource id. */
  azureResourceId: string;
  /** The anomaly product name. */
  productName?: string;
  /** The anomaly description. */
  description?: string;
  /** The anomaly name. */
  displayName: string;
  /** The anomaly end time. */
  endTimeUtc: Date;
  /** The anomaly start time. */
  startTimeUtc: Date;
  /** The anomaly generated time. */
  timeGenerated: Date;
  /** The name of the anomaly vendor. */
  vendor?: string;
  /** The intent of the anomaly. */
  intent?: string;
  /** The techniques of the anomaly. */
  techniques?: string[];
  /** The reasons that cause the anomaly. */
  reasons?: string[];
  /** The entity query kind type. */
  kind: "Anomaly";
}

export function anomalyTimelineItemDeserializer(item: any): AnomalyTimelineItem {
  return {
    kind: item["kind"],
    azureResourceId: item["azureResourceId"],
    productName: item["productName"],
    description: item["description"],
    displayName: item["displayName"],
    endTimeUtc: new Date(item["endTimeUtc"]),
    startTimeUtc: new Date(item["startTimeUtc"]),
    timeGenerated: new Date(item["timeGenerated"]),
    vendor: item["vendor"],
    intent: item["intent"],
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    reasons: !item["reasons"]
      ? item["reasons"]
      : item["reasons"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents security alert timeline item. */
export interface SecurityAlertTimelineItem extends EntityTimelineItem {
  /** The alert azure resource id. */
  azureResourceId: string;
  /** The alert product name. */
  productName?: string;
  /** The alert description. */
  description?: string;
  /** The alert name. */
  displayName: string;
  /** The alert severity. */
  severity: AlertSeverity;
  /** The alert end time. */
  endTimeUtc: Date;
  /** The alert start time. */
  startTimeUtc: Date;
  /** The alert generated time. */
  timeGenerated: Date;
  /** The name of the alert type. */
  alertType: string;
  /** The intent of the alert. */
  readonly intent?: KillChainIntent;
  /** The techniques of the alert. */
  techniques?: string[];
  /** The entity query kind type. */
  kind: "SecurityAlert";
}

export function securityAlertTimelineItemDeserializer(item: any): SecurityAlertTimelineItem {
  return {
    kind: item["kind"],
    azureResourceId: item["azureResourceId"],
    productName: item["productName"],
    description: item["description"],
    displayName: item["displayName"],
    severity: item["severity"],
    endTimeUtc: new Date(item["endTimeUtc"]),
    startTimeUtc: new Date(item["startTimeUtc"]),
    timeGenerated: new Date(item["timeGenerated"]),
    alertType: item["alertType"],
    intent: item["intent"],
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

/** Recommendation object. */
export interface Recommendation extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** Id of the recommendation type. */
  recommendationTypeId?: string;
  /** State of the recommendation. */
  state?: State;
  /** Title of the recommendation. */
  title?: string;
  /** Description of the recommendation. */
  description?: string;
  /** The time stamp (UTC) when the recommendation was created. */
  creationTimeUtc?: Date;
  /** The time stamp (UTC) when the recommendation was last evaluated. */
  lastEvaluatedTimeUtc?: Date;
  /** The time stamp (UTC) when the recommendation was last modified. */
  lastModifiedTimeUtc?: Date;
  /** List of suggestions to take for this recommendation. */
  suggestions?: RecommendedSuggestion[];
  /** Id of the resource this recommendation refers to. */
  resourceId?: string;
  /** Collection of additional properties for the recommendation. */
  additionalProperties?: Record<string, string>;
}

export function recommendationDeserializer(item: any): Recommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recommendationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Recommendation properties object. */
export interface RecommendationProperties {
  /** Id of the recommendation type. */
  recommendationTypeId: string;
  /** State of the recommendation. */
  state: State;
  /** Title of the recommendation. */
  title: string;
  /** Description of the recommendation. */
  description: string;
  /** The time stamp (UTC) when the recommendation was created. */
  creationTimeUtc: Date;
  /** The time stamp (UTC) when the recommendation was last evaluated. */
  lastEvaluatedTimeUtc: Date;
  /** The time stamp (UTC) when the recommendation was last modified. */
  lastModifiedTimeUtc: Date;
  /** List of suggestions to take for this recommendation. */
  suggestions: RecommendedSuggestion[];
  /** Id of the resource this recommendation refers to. */
  resourceId?: string;
  /** Collection of additional properties for the recommendation. */
  additionalProperties?: Record<string, string>;
}

export function recommendationPropertiesDeserializer(item: any): RecommendationProperties {
  return {
    recommendationTypeId: item["recommendationTypeId"],
    state: item["state"],
    title: item["title"],
    description: item["description"],
    creationTimeUtc: new Date(item["creationTimeUtc"]),
    lastEvaluatedTimeUtc: new Date(item["lastEvaluatedTimeUtc"]),
    lastModifiedTimeUtc: new Date(item["lastModifiedTimeUtc"]),
    suggestions: recommendedSuggestionArrayDeserializer(item["suggestions"]),
    resourceId: item["resourceId"],
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : Object.fromEntries(
          Object.entries(item["additionalProperties"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

export function recommendedSuggestionArrayDeserializer(
  result: Array<RecommendedSuggestion>,
): any[] {
  return result.map((item) => {
    return recommendedSuggestionDeserializer(item);
  });
}

/** What suggestions should be taken to complete the recommendation. */
export interface RecommendedSuggestion {
  /** Id of the suggestion type. */
  suggestionTypeId: string;
  /** Title of the suggestion. */
  title: string;
  /** Description of the suggestion. */
  description: string;
  /** Action of the suggestion. */
  action: string;
  /** Collection of additional properties for the suggestion. */
  additionalProperties?: Record<string, string>;
}

export function recommendedSuggestionDeserializer(item: any): RecommendedSuggestion {
  return {
    suggestionTypeId: item["suggestionTypeId"],
    title: item["title"],
    description: item["description"],
    action: item["action"],
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : Object.fromEntries(
          Object.entries(item["additionalProperties"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

/** Recommendation Fields to update. */
export interface RecommendationPatch {
  /** Recommendation Fields Properties to update. */
  properties?: RecommendationPatchProperties;
}

export function recommendationPatchSerializer(item: RecommendationPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : recommendationPatchPropertiesSerializer(item["properties"]),
  };
}

/** Recommendation Fields Properties to update. */
export interface RecommendationPatchProperties {
  /** State of the recommendation. */
  state?: State;
}

export function recommendationPatchPropertiesSerializer(item: RecommendationPatchProperties): any {
  return { state: item["state"] };
}

/** A list of recommendations */
export interface _RecommendationList {
  /** The Recommendation items on this page */
  value: Recommendation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recommendationListDeserializer(item: any): _RecommendationList {
  return {
    value: recommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recommendationArrayDeserializer(result: Array<Recommendation>): any[] {
  return result.map((item) => {
    return recommendationDeserializer(item);
  });
}

/** Reevaluate response object. */
export interface ReevaluateResponse {
  /** The time stamp (UTC) when the recommendation was last evaluated. */
  lastEvaluatedTimeUtc?: Date;
}

export function reevaluateResponseDeserializer(item: any): ReevaluateResponse {
  return {
    lastEvaluatedTimeUtc: !item["lastEvaluatedTimeUtc"]
      ? item["lastEvaluatedTimeUtc"]
      : new Date(item["lastEvaluatedTimeUtc"]),
  };
}

/** The triggered analytics rule run array */
export interface _TriggeredAnalyticsRuleRuns {
  /** The TriggeredAnalyticsRuleRun items on this page */
  value: TriggeredAnalyticsRuleRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triggeredAnalyticsRuleRunsDeserializer(item: any): _TriggeredAnalyticsRuleRuns {
  return {
    value: triggeredAnalyticsRuleRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggeredAnalyticsRuleRunArrayDeserializer(
  result: Array<TriggeredAnalyticsRuleRun>,
): any[] {
  return result.map((item) => {
    return triggeredAnalyticsRuleRunDeserializer(item);
  });
}

/** The assignment job */
export interface Job extends ProxyResource {
  /** Etag of the azure resource */
  etag?: string;
  /** The time the job completed */
  readonly endTime?: Date;
  /** List of items published by the job */
  items?: JobItem[];
  /** State of the job */
  readonly provisioningState?: ProvisioningState;
  /** The time the job started */
  readonly startTime?: Date;
  /** Message to describe error, if an error exists */
  readonly errorMessage?: string;
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _jobPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The job properties */
export interface JobProperties {
  /** The time the job completed */
  readonly endTime?: Date;
  /** List of items published by the job */
  items?: JobItem[];
  /** State of the job */
  readonly provisioningState?: ProvisioningState;
  /** The time the job started */
  readonly startTime?: Date;
  /** Message to describe error, if an error exists */
  readonly errorMessage?: string;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    items: !item["items"] ? item["items"] : jobItemArrayDeserializer(item["items"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    errorMessage: item["errorMessage"],
  };
}

export function jobItemArrayDeserializer(result: Array<JobItem>): any[] {
  return result.map((item) => {
    return jobItemDeserializer(item);
  });
}

/** An entity describing the publish status of a content item. */
export interface JobItem {
  /** The resource id of the content item */
  resourceId?: string;
  /** Status of the item publication */
  readonly status?: Status;
  /** The time the item publishing was completed */
  readonly executionTime?: Date;
  /** The list of error descriptions if the item publication fails. */
  errors?: ErrorModel[];
}

export function jobItemDeserializer(item: any): JobItem {
  return {
    resourceId: item["resourceId"],
    status: item["status"],
    executionTime: !item["executionTime"] ? item["executionTime"] : new Date(item["executionTime"]),
    errors: !item["errors"] ? item["errors"] : errorArrayDeserializer(item["errors"]),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/** The error description for why a publication failed */
export interface ErrorModel {
  /** The member resource name for which the publication error occured */
  memberResourceName: string;
  /** The error message */
  errorMessage: string;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    memberResourceName: item["memberResourceName"],
    errorMessage: item["errorMessage"],
  };
}

/** List of all the jobs */
export interface _JobList {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobListDeserializer(item: any): _JobList {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** Known values of {@link EnrichmentType} that the service accepts. */
export enum KnownEnrichmentType {
  /** main */
  Main = "main",
}

/** Type of EnrichmentType */
export type EnrichmentType = string;

/** Known values of {@link EntityItemQueryKind} that the service accepts. */
export enum KnownEntityItemQueryKind {
  /** insight */
  Insight = "Insight",
}

/** Type of EntityItemQueryKind */
export type EntityItemQueryKind = string;

/** Known values of {@link TiType} that the service accepts. */
export enum KnownTiType {
  /** main */
  Main = "main",
}

/** Type of TiType */
export type TiType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01-preview API version. */
  V20250701Preview = "2025-07-01-preview",
}

export function _mlBehaviorAnalyticsAlertRulePropertiesSerializer(
  item: MLBehaviorAnalyticsAlertRule,
): any {
  return { alertRuleTemplateName: item["alertRuleTemplateName"], enabled: item["enabled"] };
}

export function _mlBehaviorAnalyticsAlertRulePropertiesDeserializer(item: any) {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _fusionAlertRulePropertiesSerializer(item: FusionAlertRule): any {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    enabled: item["enabled"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionSourceSettingsArraySerializer(item["sourceSettings"]),
    scenarioExclusionPatterns: !item["scenarioExclusionPatterns"]
      ? item["scenarioExclusionPatterns"]
      : fusionScenarioExclusionPatternArraySerializer(item["scenarioExclusionPatterns"]),
  };
}

export function _fusionAlertRulePropertiesDeserializer(item: any) {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionSourceSettingsArrayDeserializer(item["sourceSettings"]),
    scenarioExclusionPatterns: !item["scenarioExclusionPatterns"]
      ? item["scenarioExclusionPatterns"]
      : fusionScenarioExclusionPatternArrayDeserializer(item["scenarioExclusionPatterns"]),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _threatIntelligenceAlertRulePropertiesSerializer(
  item: ThreatIntelligenceAlertRule,
): any {
  return { alertRuleTemplateName: item["alertRuleTemplateName"], enabled: item["enabled"] };
}

export function _threatIntelligenceAlertRulePropertiesDeserializer(item: any) {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _microsoftSecurityIncidentCreationAlertRulePropertiesSerializer(
  item: MicrosoftSecurityIncidentCreationAlertRule,
): any {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
  };
}

export function _microsoftSecurityIncidentCreationAlertRulePropertiesDeserializer(item: any) {
  return {
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
  };
}

export function _scheduledAlertRulePropertiesSerializer(item: ScheduledAlertRule): any {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsSerializer(item["eventGroupingSettings"]),
    customDetails: item["customDetails"],
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArraySerializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideSerializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArraySerializer(item["sentinelEntitiesMappings"]),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationSerializer(item["incidentConfiguration"]),
  };
}

export function _scheduledAlertRulePropertiesDeserializer(item: any) {
  return {
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationDeserializer(item["incidentConfiguration"]),
  };
}

export function _nrtAlertRulePropertiesSerializer(item: NrtAlertRule): any {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    query: item["query"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    enabled: item["enabled"],
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    severity: item["severity"],
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationSerializer(item["incidentConfiguration"]),
    customDetails: item["customDetails"],
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArraySerializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideSerializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsSerializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArraySerializer(item["sentinelEntitiesMappings"]),
  };
}

export function _nrtAlertRulePropertiesDeserializer(item: any) {
  return {
    alertRuleTemplateName: item["alertRuleTemplateName"],
    templateVersion: item["templateVersion"],
    description: item["description"],
    query: item["query"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    suppressionDuration: item["suppressionDuration"],
    suppressionEnabled: item["suppressionEnabled"],
    severity: item["severity"],
    incidentConfiguration: !item["incidentConfiguration"]
      ? item["incidentConfiguration"]
      : incidentConfigurationDeserializer(item["incidentConfiguration"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

export function _mlBehaviorAnalyticsAlertRuleTemplatePropertiesDeserializer(item: any) {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
  };
}

export function _fusionAlertRuleTemplatePropertiesDeserializer(item: any) {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : fusionTemplateSourceSettingArrayDeserializer(item["sourceSettings"]),
  };
}

export function _threatIntelligenceAlertRuleTemplatePropertiesDeserializer(item: any) {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    severity: item["severity"],
  };
}

export function _microsoftSecurityIncidentCreationAlertRuleTemplatePropertiesDeserializer(
  item: any,
) {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    displayNamesFilter: !item["displayNamesFilter"]
      ? item["displayNamesFilter"]
      : item["displayNamesFilter"].map((p: any) => {
          return p;
        }),
    displayNamesExcludeFilter: !item["displayNamesExcludeFilter"]
      ? item["displayNamesExcludeFilter"]
      : item["displayNamesExcludeFilter"].map((p: any) => {
          return p;
        }),
    productFilter: item["productFilter"],
    severitiesFilter: !item["severitiesFilter"]
      ? item["severitiesFilter"]
      : item["severitiesFilter"].map((p: any) => {
          return p;
        }),
  };
}

export function _scheduledAlertRuleTemplatePropertiesDeserializer(item: any) {
  return {
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    query: item["query"],
    queryFrequency: item["queryFrequency"],
    queryPeriod: item["queryPeriod"],
    severity: item["severity"],
    triggerOperator: item["triggerOperator"],
    triggerThreshold: item["triggerThreshold"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    subTechniques: !item["subTechniques"]
      ? item["subTechniques"]
      : item["subTechniques"].map((p: any) => {
          return p;
        }),
    version: item["version"],
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

export function _nrtAlertRuleTemplatePropertiesDeserializer(item: any) {
  return {
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    alertRulesCreatedByTemplateCount: item["alertRulesCreatedByTemplateCount"],
    lastUpdatedDateUTC: !item["lastUpdatedDateUTC"]
      ? item["lastUpdatedDateUTC"]
      : new Date(item["lastUpdatedDateUTC"]),
    createdDateUTC: !item["createdDateUTC"]
      ? item["createdDateUTC"]
      : new Date(item["createdDateUTC"]),
    description: item["description"],
    displayName: item["displayName"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : alertRuleTemplateDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    status: item["status"],
    query: item["query"],
    severity: item["severity"],
    version: item["version"],
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : Object.fromEntries(
          Object.entries(item["customDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : entityMappingArrayDeserializer(item["entityMappings"]),
    alertDetailsOverride: !item["alertDetailsOverride"]
      ? item["alertDetailsOverride"]
      : alertDetailsOverrideDeserializer(item["alertDetailsOverride"]),
    eventGroupingSettings: !item["eventGroupingSettings"]
      ? item["eventGroupingSettings"]
      : eventGroupingSettingsDeserializer(item["eventGroupingSettings"]),
    sentinelEntitiesMappings: !item["sentinelEntitiesMappings"]
      ? item["sentinelEntitiesMappings"]
      : sentinelEntityMappingArrayDeserializer(item["sentinelEntitiesMappings"]),
  };
}

export function _automationRulePropertiesSerializer(item: AutomationRule): any {
  return {
    displayName: item["displayName"],
    order: item["order"],
    triggeringLogic: automationRuleTriggeringLogicSerializer(item["triggeringLogic"]),
    actions: automationRuleActionUnionArraySerializer(item["actions"]),
  };
}

export function _automationRulePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    order: item["order"],
    triggeringLogic: automationRuleTriggeringLogicDeserializer(item["triggeringLogic"]),
    actions: automationRuleActionUnionArrayDeserializer(item["actions"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoDeserializer(item["lastModifiedBy"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoDeserializer(item["createdBy"]),
  };
}

export function _incidentPropertiesSerializer(item: Incident): any {
  return {
    title: item["title"],
    description: item["description"],
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoSerializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArraySerializer(item["labels"]),
    firstActivityTimeUtc: !item["firstActivityTimeUtc"]
      ? item["firstActivityTimeUtc"]
      : item["firstActivityTimeUtc"].toISOString(),
    lastActivityTimeUtc: !item["lastActivityTimeUtc"]
      ? item["lastActivityTimeUtc"]
      : item["lastActivityTimeUtc"].toISOString(),
    teamInformation: !item["teamInformation"]
      ? item["teamInformation"]
      : teamInformationSerializer(item["teamInformation"]),
  };
}

export function _incidentPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    description: item["description"],
    severity: item["severity"],
    status: item["status"],
    classification: item["classification"],
    classificationReason: item["classificationReason"],
    classificationComment: item["classificationComment"],
    owner: !item["owner"] ? item["owner"] : incidentOwnerInfoDeserializer(item["owner"]),
    labels: !item["labels"] ? item["labels"] : incidentLabelArrayDeserializer(item["labels"]),
    firstActivityTimeUtc: !item["firstActivityTimeUtc"]
      ? item["firstActivityTimeUtc"]
      : new Date(item["firstActivityTimeUtc"]),
    lastActivityTimeUtc: !item["lastActivityTimeUtc"]
      ? item["lastActivityTimeUtc"]
      : new Date(item["lastActivityTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    incidentNumber: item["incidentNumber"],
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : incidentAdditionalDataDeserializer(item["additionalData"]),
    relatedAnalyticRuleIds: !item["relatedAnalyticRuleIds"]
      ? item["relatedAnalyticRuleIds"]
      : item["relatedAnalyticRuleIds"].map((p: any) => {
          return p;
        }),
    incidentUrl: item["incidentUrl"],
    providerName: item["providerName"],
    providerIncidentId: item["providerIncidentId"],
    teamInformation: !item["teamInformation"]
      ? item["teamInformation"]
      : teamInformationDeserializer(item["teamInformation"]),
  };
}

export function _securityAlertPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    alertDisplayName: item["alertDisplayName"],
    alertType: item["alertType"],
    compromisedEntity: item["compromisedEntity"],
    confidenceLevel: item["confidenceLevel"],
    confidenceReasons: !item["confidenceReasons"]
      ? item["confidenceReasons"]
      : securityAlertPropertiesConfidenceReasonsItemArrayDeserializer(item["confidenceReasons"]),
    confidenceScore: item["confidenceScore"],
    confidenceScoreStatus: item["confidenceScoreStatus"],
    description: item["description"],
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    intent: item["intent"],
    providerAlertId: item["providerAlertId"],
    processingEndTime: !item["processingEndTime"]
      ? item["processingEndTime"]
      : new Date(item["processingEndTime"]),
    productComponentName: item["productComponentName"],
    productName: item["productName"],
    productVersion: item["productVersion"],
    remediationSteps: !item["remediationSteps"]
      ? item["remediationSteps"]
      : item["remediationSteps"].map((p: any) => {
          return p;
        }),
    severity: item["severity"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    status: item["status"],
    systemAlertId: item["systemAlertId"],
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    timeGenerated: !item["timeGenerated"] ? item["timeGenerated"] : new Date(item["timeGenerated"]),
    vendorName: item["vendorName"],
    alertLink: item["alertLink"],
    resourceIdentifiers: !item["resourceIdentifiers"]
      ? item["resourceIdentifiers"]
      : item["resourceIdentifiers"].map((p: any) => {
          return p;
        }),
  };
}

export function _huntingBookmarkPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    displayName: item["displayName"],
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoDeserializer(item["incidentInfo"]),
  };
}

export function _accountEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    aadTenantId: item["aadTenantId"],
    aadUserId: item["aadUserId"],
    accountName: item["accountName"],
    displayName: item["displayName"],
    hostEntityId: item["hostEntityId"],
    isDomainJoined: item["isDomainJoined"],
    ntDomain: item["ntDomain"],
    objectGuid: item["objectGuid"],
    puid: item["puid"],
    sid: item["sid"],
    upnSuffix: item["upnSuffix"],
    dnsDomain: item["dnsDomain"],
  };
}

export function _azureResourceEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    resourceId: item["resourceId"],
    subscriptionId: item["subscriptionId"],
  };
}

export function _cloudApplicationEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    appId: item["appId"],
    appName: item["appName"],
    instanceName: item["instanceName"],
  };
}

export function _dnsEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    dnsServerIpEntityId: item["dnsServerIpEntityId"],
    domainName: item["domainName"],
    hostIpAddressEntityId: item["hostIpAddressEntityId"],
    ipAddressEntityIds: !item["ipAddressEntityIds"]
      ? item["ipAddressEntityIds"]
      : item["ipAddressEntityIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _fileEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    directory: item["directory"],
    fileHashEntityIds: !item["fileHashEntityIds"]
      ? item["fileHashEntityIds"]
      : item["fileHashEntityIds"].map((p: any) => {
          return p;
        }),
    fileName: item["fileName"],
    hostEntityId: item["hostEntityId"],
  };
}

export function _fileHashEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    algorithm: item["algorithm"],
    hashValue: item["hashValue"],
  };
}

export function _hostEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    azureID: item["azureID"],
    dnsDomain: item["dnsDomain"],
    hostName: item["hostName"],
    isDomainJoined: item["isDomainJoined"],
    netBiosName: item["netBiosName"],
    ntDomain: item["ntDomain"],
    omsAgentID: item["omsAgentID"],
    osFamily: item["osFamily"],
    osVersion: item["osVersion"],
  };
}

export function _ioTDeviceEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    deviceId: item["deviceId"],
    deviceName: item["deviceName"],
    source: item["source"],
    iotSecurityAgentId: item["iotSecurityAgentId"],
    deviceType: item["deviceType"],
    vendor: item["vendor"],
    edgeId: item["edgeId"],
    macAddress: item["macAddress"],
    model: item["model"],
    serialNumber: item["serialNumber"],
    firmwareVersion: item["firmwareVersion"],
    operatingSystem: item["operatingSystem"],
    iotHubEntityId: item["iotHubEntityId"],
    hostEntityId: item["hostEntityId"],
    ipAddressEntityId: item["ipAddressEntityId"],
    threatIntelligence: !item["threatIntelligence"]
      ? item["threatIntelligence"]
      : threatIntelligenceArrayDeserializer(item["threatIntelligence"]),
    protocols: !item["protocols"]
      ? item["protocols"]
      : item["protocols"].map((p: any) => {
          return p;
        }),
    owners: !item["owners"]
      ? item["owners"]
      : item["owners"].map((p: any) => {
          return p;
        }),
    nicEntityIds: !item["nicEntityIds"]
      ? item["nicEntityIds"]
      : item["nicEntityIds"].map((p: any) => {
          return p;
        }),
    site: item["site"],
    zone: item["zone"],
    sensor: item["sensor"],
    deviceSubType: item["deviceSubType"],
    importance: item["importance"],
    purdueLayer: item["purdueLayer"],
    isAuthorized: item["isAuthorized"],
    isProgramming: item["isProgramming"],
    isScanner: item["isScanner"],
  };
}

export function _ipEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    address: item["address"],
    location: !item["location"] ? item["location"] : geoLocationDeserializer(item["location"]),
    threatIntelligence: !item["threatIntelligence"]
      ? item["threatIntelligence"]
      : threatIntelligenceArrayDeserializer(item["threatIntelligence"]),
  };
}

export function _mailboxEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    mailboxPrimaryAddress: item["mailboxPrimaryAddress"],
    displayName: item["displayName"],
    upn: item["upn"],
    externalDirectoryObjectId: item["externalDirectoryObjectId"],
  };
}

export function _mailClusterEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    networkMessageIds: !item["networkMessageIds"]
      ? item["networkMessageIds"]
      : item["networkMessageIds"].map((p: any) => {
          return p;
        }),
    countByDeliveryStatus: item["countByDeliveryStatus"],
    countByThreatType: item["countByThreatType"],
    countByProtectionStatus: item["countByProtectionStatus"],
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    queryTime: !item["queryTime"] ? item["queryTime"] : new Date(item["queryTime"]),
    mailCount: item["mailCount"],
    isVolumeAnomaly: item["isVolumeAnomaly"],
    source: item["source"],
    clusterSourceIdentifier: item["clusterSourceIdentifier"],
    clusterSourceType: item["clusterSourceType"],
    clusterQueryStartTime: !item["clusterQueryStartTime"]
      ? item["clusterQueryStartTime"]
      : new Date(item["clusterQueryStartTime"]),
    clusterQueryEndTime: !item["clusterQueryEndTime"]
      ? item["clusterQueryEndTime"]
      : new Date(item["clusterQueryEndTime"]),
    clusterGroup: item["clusterGroup"],
  };
}

export function _mailMessageEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    fileEntityIds: !item["fileEntityIds"]
      ? item["fileEntityIds"]
      : item["fileEntityIds"].map((p: any) => {
          return p;
        }),
    recipient: item["recipient"],
    urls: !item["urls"]
      ? item["urls"]
      : item["urls"].map((p: any) => {
          return p;
        }),
    threats: !item["threats"]
      ? item["threats"]
      : item["threats"].map((p: any) => {
          return p;
        }),
    p1Sender: item["p1Sender"],
    p1SenderDisplayName: item["p1SenderDisplayName"],
    p1SenderDomain: item["p1SenderDomain"],
    senderIP: item["senderIP"],
    p2Sender: item["p2Sender"],
    p2SenderDisplayName: item["p2SenderDisplayName"],
    p2SenderDomain: item["p2SenderDomain"],
    receiveDate: !item["receiveDate"] ? item["receiveDate"] : new Date(item["receiveDate"]),
    networkMessageId: item["networkMessageId"],
    internetMessageId: item["internetMessageId"],
    subject: item["subject"],
    language: item["language"],
    threatDetectionMethods: !item["threatDetectionMethods"]
      ? item["threatDetectionMethods"]
      : item["threatDetectionMethods"].map((p: any) => {
          return p;
        }),
    bodyFingerprintBin1: item["bodyFingerprintBin1"],
    bodyFingerprintBin2: item["bodyFingerprintBin2"],
    bodyFingerprintBin3: item["bodyFingerprintBin3"],
    bodyFingerprintBin4: item["bodyFingerprintBin4"],
    bodyFingerprintBin5: item["bodyFingerprintBin5"],
    antispamDirection: item["antispamDirection"],
    deliveryAction: item["deliveryAction"],
    deliveryLocation: item["deliveryLocation"],
  };
}

export function _malwareEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    category: item["category"],
    fileEntityIds: !item["fileEntityIds"]
      ? item["fileEntityIds"]
      : item["fileEntityIds"].map((p: any) => {
          return p;
        }),
    malwareName: item["malwareName"],
    processEntityIds: !item["processEntityIds"]
      ? item["processEntityIds"]
      : item["processEntityIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _processEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    accountEntityId: item["accountEntityId"],
    commandLine: item["commandLine"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    elevationToken: item["elevationToken"],
    hostEntityId: item["hostEntityId"],
    hostLogonSessionEntityId: item["hostLogonSessionEntityId"],
    imageFileEntityId: item["imageFileEntityId"],
    parentProcessEntityId: item["parentProcessEntityId"],
    processId: item["processId"],
  };
}

export function _registryKeyEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    hive: item["hive"],
    key: item["key"],
  };
}

export function _registryValueEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    keyEntityId: item["keyEntityId"],
    valueData: item["valueData"],
    valueName: item["valueName"],
    valueType: item["valueType"],
  };
}

export function _securityGroupEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    distinguishedName: item["distinguishedName"],
    objectGuid: item["objectGuid"],
    sid: item["sid"],
  };
}

export function _submissionMailEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    networkMessageId: item["networkMessageId"],
    submissionId: item["submissionId"],
    submitter: item["submitter"],
    submissionDate: !item["submissionDate"]
      ? item["submissionDate"]
      : new Date(item["submissionDate"]),
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    recipient: item["recipient"],
    sender: item["sender"],
    senderIp: item["senderIp"],
    subject: item["subject"],
    reportType: item["reportType"],
  };
}

export function _urlEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    url: item["url"],
  };
}

export function _nicEntityPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    macAddress: item["macAddress"],
    ipAddressEntityId: item["ipAddressEntityId"],
    vlans: !item["vlans"]
      ? item["vlans"]
      : item["vlans"].map((p: any) => {
          return p;
        }),
  };
}

export function _bookmarkPropertiesSerializer(item: Bookmark): any {
  return {
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    displayName: item["displayName"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : item["eventTime"].toISOString(),
    queryStartTime: !item["queryStartTime"]
      ? item["queryStartTime"]
      : item["queryStartTime"].toISOString(),
    queryEndTime: !item["queryEndTime"] ? item["queryEndTime"] : item["queryEndTime"].toISOString(),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoSerializer(item["incidentInfo"]),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : bookmarkEntityMappingsArraySerializer(item["entityMappings"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _bookmarkPropertiesDeserializer(item: any) {
  return {
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    displayName: item["displayName"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    notes: item["notes"],
    query: item["query"],
    queryResult: item["queryResult"],
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    eventTime: !item["eventTime"] ? item["eventTime"] : new Date(item["eventTime"]),
    queryStartTime: !item["queryStartTime"]
      ? item["queryStartTime"]
      : new Date(item["queryStartTime"]),
    queryEndTime: !item["queryEndTime"] ? item["queryEndTime"] : new Date(item["queryEndTime"]),
    incidentInfo: !item["incidentInfo"]
      ? item["incidentInfo"]
      : incidentInfoDeserializer(item["incidentInfo"]),
    entityMappings: !item["entityMappings"]
      ? item["entityMappings"]
      : bookmarkEntityMappingsArrayDeserializer(item["entityMappings"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
  };
}

export function _customizableConnectorDefinitionPropertiesSerializer(
  item: CustomizableConnectorDefinition,
): any {
  return {
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : item["createdTimeUtc"].toISOString(),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : item["lastModifiedUtc"].toISOString(),
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : customizableConnectorUiConfigSerializer(item["connectorUiConfig"]),
    connectionsConfig: !item["connectionsConfig"]
      ? item["connectionsConfig"]
      : customizableConnectionsConfigSerializer(item["connectionsConfig"]),
  };
}

export function _customizableConnectorDefinitionPropertiesDeserializer(item: any) {
  return {
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : customizableConnectorUiConfigDeserializer(item["connectorUiConfig"]),
    connectionsConfig: !item["connectionsConfig"]
      ? item["connectionsConfig"]
      : customizableConnectionsConfigDeserializer(item["connectionsConfig"]),
  };
}

export function _aadDataConnectorPropertiesSerializer(item: AADDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function _aadDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

export function _mstiDataConnectorPropertiesSerializer(item: MstiDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mstiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _mstiDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mstiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _premiumMicrosoftDefenderForThreatIntelligencePropertiesSerializer(
  item: PremiumMicrosoftDefenderForThreatIntelligence,
): any {
  return {
    tenantId: item["tenantId"],
    lookbackPeriod: !item["lookbackPeriod"]
      ? item["lookbackPeriod"]
      : item["lookbackPeriod"].toISOString(),
    requiredSKUsPresent: item["requiredSKUsPresent"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : premiumMdtiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _premiumMicrosoftDefenderForThreatIntelligencePropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    lookbackPeriod: !item["lookbackPeriod"]
      ? item["lookbackPeriod"]
      : new Date(item["lookbackPeriod"]),
    requiredSKUsPresent: item["requiredSKUsPresent"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : premiumMdtiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _mtpDataConnectorPropertiesSerializer(item: MTPDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mtpDataConnectorDataTypesSerializer(item["dataTypes"]),
    filteredProviders: !item["filteredProviders"]
      ? item["filteredProviders"]
      : mtpFilteredProvidersSerializer(item["filteredProviders"]),
  };
}

export function _mtpDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mtpDataConnectorDataTypesDeserializer(item["dataTypes"]),
    filteredProviders: !item["filteredProviders"]
      ? item["filteredProviders"]
      : mtpFilteredProvidersDeserializer(item["filteredProviders"]),
  };
}

export function _aatpDataConnectorPropertiesSerializer(item: AatpDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function _aatpDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

export function _ascDataConnectorPropertiesSerializer(item: ASCDataConnector): any {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function _ascDataConnectorPropertiesDeserializer(item: any) {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function _awsCloudTrailDataConnectorPropertiesSerializer(
  item: AwsCloudTrailDataConnector,
): any {
  return {
    awsRoleArn: item["awsRoleArn"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : awsCloudTrailDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _awsCloudTrailDataConnectorPropertiesDeserializer(item: any) {
  return {
    awsRoleArn: item["awsRoleArn"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : awsCloudTrailDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _awsS3DataConnectorPropertiesSerializer(item: AwsS3DataConnector): any {
  return {
    destinationTable: item["destinationTable"],
    sqsUrls: !item["sqsUrls"]
      ? item["sqsUrls"]
      : item["sqsUrls"].map((p: any) => {
          return p;
        }),
    roleArn: item["roleArn"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : awsS3DataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _awsS3DataConnectorPropertiesDeserializer(item: any) {
  return {
    destinationTable: item["destinationTable"],
    sqsUrls: !item["sqsUrls"]
      ? item["sqsUrls"]
      : item["sqsUrls"].map((p: any) => {
          return p;
        }),
    roleArn: item["roleArn"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : awsS3DataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _restApiPollerDataConnectorPropertiesSerializer(
  item: RestApiPollerDataConnector,
): any {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: !item["auth"] ? item["auth"] : ccpAuthConfigUnionSerializer(item["auth"]),
    request: !item["request"]
      ? item["request"]
      : restApiPollerRequestConfigSerializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
    isActive: item["isActive"],
    dataType: item["dataType"],
    response: !item["response"] ? item["response"] : ccpResponseConfigSerializer(item["response"]),
    paging: !item["paging"]
      ? item["paging"]
      : restApiPollerRequestPagingConfigSerializer(item["paging"]),
    addOnAttributes: item["addOnAttributes"],
  };
}

export function _restApiPollerDataConnectorPropertiesDeserializer(item: any) {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: !item["auth"] ? item["auth"] : ccpAuthConfigUnionDeserializer(item["auth"]),
    request: !item["request"]
      ? item["request"]
      : restApiPollerRequestConfigDeserializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
    isActive: item["isActive"],
    dataType: item["dataType"],
    response: !item["response"]
      ? item["response"]
      : ccpResponseConfigDeserializer(item["response"]),
    paging: !item["paging"]
      ? item["paging"]
      : restApiPollerRequestPagingConfigDeserializer(item["paging"]),
    addOnAttributes: !item["addOnAttributes"]
      ? item["addOnAttributes"]
      : Object.fromEntries(
          Object.entries(item["addOnAttributes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _gcpDataConnectorPropertiesSerializer(item: GCPDataConnector): any {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: !item["auth"] ? item["auth"] : gcpAuthPropertiesSerializer(item["auth"]),
    request: !item["request"] ? item["request"] : gcpRequestPropertiesSerializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
  };
}

export function _gcpDataConnectorPropertiesDeserializer(item: any) {
  return {
    connectorDefinitionName: item["connectorDefinitionName"],
    auth: !item["auth"] ? item["auth"] : gcpAuthPropertiesDeserializer(item["auth"]),
    request: !item["request"] ? item["request"] : gcpRequestPropertiesDeserializer(item["request"]),
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
  };
}

export function _mcasDataConnectorPropertiesSerializer(item: McasDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mcasDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _mcasDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : mcasDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _dynamics365DataConnectorPropertiesSerializer(item: Dynamics365DataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : dynamics365DataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _dynamics365DataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : dynamics365DataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _officeATPDataConnectorPropertiesSerializer(item: OfficeATPDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function _officeATPDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

export function _microsoftPurviewInformationProtectionDataConnectorPropertiesSerializer(
  item: MicrosoftPurviewInformationProtectionDataConnector,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : microsoftPurviewInformationProtectionConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _microsoftPurviewInformationProtectionDataConnectorPropertiesDeserializer(
  item: any,
) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : microsoftPurviewInformationProtectionConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _office365ProjectDataConnectorPropertiesSerializer(
  item: Office365ProjectDataConnector,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : office365ProjectConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _office365ProjectDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : office365ProjectConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _officePowerBIDataConnectorPropertiesSerializer(
  item: OfficePowerBIDataConnector,
): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : officePowerBIConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _officePowerBIDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : officePowerBIConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _purviewAuditDataConnectorPropertiesSerializer(
  item: PurviewAuditDataConnector,
): any {
  return {
    tenantId: item["tenantId"],
    connectorDefinitionName: item["connectorDefinitionName"],
    sourceType: item["sourceType"],
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationSerializer(item["dcrConfig"]),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : purviewAuditConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _purviewAuditDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    connectorDefinitionName: item["connectorDefinitionName"],
    sourceType: item["sourceType"],
    dcrConfig: !item["dcrConfig"]
      ? item["dcrConfig"]
      : dcrConfigurationDeserializer(item["dcrConfig"]),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : purviewAuditConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _officeIRMDataConnectorPropertiesSerializer(item: OfficeIRMDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function _officeIRMDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

export function _mdatpDataConnectorPropertiesSerializer(item: MdatpDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
  };
}

export function _mdatpDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
  };
}

export function _officeDataConnectorPropertiesSerializer(item: OfficeDataConnector): any {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : officeDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _officeDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : officeDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _tiDataConnectorPropertiesSerializer(item: TIDataConnector): any {
  return {
    tenantId: item["tenantId"],
    tipLookbackPeriod: !item["tipLookbackPeriod"]
      ? item["tipLookbackPeriod"]
      : item["tipLookbackPeriod"].toISOString(),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : tiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _tiDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    tipLookbackPeriod: !item["tipLookbackPeriod"]
      ? item["tipLookbackPeriod"]
      : new Date(item["tipLookbackPeriod"]),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : tiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _tiTaxiiDataConnectorPropertiesSerializer(item: TiTaxiiDataConnector): any {
  return {
    tenantId: item["tenantId"],
    workspaceId: item["workspaceId"],
    friendlyName: item["friendlyName"],
    taxiiServer: item["taxiiServer"],
    collectionId: item["collectionId"],
    userName: item["userName"],
    password: item["password"],
    taxiiLookbackPeriod: !item["taxiiLookbackPeriod"]
      ? item["taxiiLookbackPeriod"]
      : item["taxiiLookbackPeriod"].toISOString(),
    pollingFrequency: item["pollingFrequency"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : tiTaxiiDataConnectorDataTypesSerializer(item["dataTypes"]),
  };
}

export function _tiTaxiiDataConnectorPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    workspaceId: item["workspaceId"],
    friendlyName: item["friendlyName"],
    taxiiServer: item["taxiiServer"],
    collectionId: item["collectionId"],
    userName: item["userName"],
    password: item["password"],
    taxiiLookbackPeriod: !item["taxiiLookbackPeriod"]
      ? item["taxiiLookbackPeriod"]
      : new Date(item["taxiiLookbackPeriod"]),
    pollingFrequency: item["pollingFrequency"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : tiTaxiiDataConnectorDataTypesDeserializer(item["dataTypes"]),
  };
}

export function _ioTDataConnectorPropertiesSerializer(item: IoTDataConnector): any {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorSerializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function _ioTDataConnectorPropertiesDeserializer(item: any) {
  return {
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : alertsDataTypeOfDataConnectorDeserializer(item["dataTypes"]),
    subscriptionId: item["subscriptionId"],
  };
}

export function _codelessUiDataConnectorPropertiesSerializer(item: CodelessUiDataConnector): any {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesSerializer(item["connectorUiConfig"]),
  };
}

export function _codelessUiDataConnectorPropertiesDeserializer(item: any) {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesDeserializer(item["connectorUiConfig"]),
  };
}

export function _codelessApiPollingDataConnectorPropertiesSerializer(
  item: CodelessApiPollingDataConnector,
): any {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesSerializer(item["connectorUiConfig"]),
    pollingConfig: !item["pollingConfig"]
      ? item["pollingConfig"]
      : codelessConnectorPollingConfigPropertiesSerializer(item["pollingConfig"]),
  };
}

export function _codelessApiPollingDataConnectorPropertiesDeserializer(item: any) {
  return {
    connectorUiConfig: !item["connectorUiConfig"]
      ? item["connectorUiConfig"]
      : codelessUiConnectorConfigPropertiesDeserializer(item["connectorUiConfig"]),
    pollingConfig: !item["pollingConfig"]
      ? item["pollingConfig"]
      : codelessConnectorPollingConfigPropertiesDeserializer(item["pollingConfig"]),
  };
}

export function _incidentCommentPropertiesSerializer(item: IncidentComment): any {
  return { message: item["message"] };
}

export function _incidentCommentPropertiesDeserializer(item: any) {
  return {
    message: item["message"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    author: !item["author"] ? item["author"] : clientInfoDeserializer(item["author"]),
  };
}

export function _relationPropertiesSerializer(item: Relation): any {
  return { relatedResourceId: item["relatedResourceId"] };
}

export function _relationPropertiesDeserializer(item: any) {
  return {
    relatedResourceId: item["relatedResourceId"],
    relatedResourceName: item["relatedResourceName"],
    relatedResourceType: item["relatedResourceType"],
    relatedResourceKind: item["relatedResourceKind"],
  };
}

export function _incidentTaskPropertiesSerializer(item: IncidentTask): any {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoSerializer(item["createdBy"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoSerializer(item["lastModifiedBy"]),
  };
}

export function _incidentTaskPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : clientInfoDeserializer(item["createdBy"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : clientInfoDeserializer(item["lastModifiedBy"]),
  };
}

export function _sentinelOnboardingStatePropertiesSerializer(item: SentinelOnboardingState): any {
  return { customerManagedKey: item["customerManagedKey"] };
}

export function _sentinelOnboardingStatePropertiesDeserializer(item: any) {
  return {
    customerManagedKey: item["customerManagedKey"],
  };
}

export function _anomalySecurityMLAnalyticsSettingsPropertiesSerializer(
  item: AnomalySecurityMLAnalyticsSettings,
): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : securityMLAnalyticsSettingsDataSourceArraySerializer(item["requiredDataConnectors"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    anomalyVersion: item["anomalyVersion"],
    customizableObservations: item["customizableObservations"],
    frequency: item["frequency"],
    settingsStatus: item["settingsStatus"],
    isDefaultSettings: item["isDefaultSettings"],
    anomalySettingsVersion: item["anomalySettingsVersion"],
    settingsDefinitionId: item["settingsDefinitionId"],
  };
}

export function _anomalySecurityMLAnalyticsSettingsPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    displayName: item["displayName"],
    enabled: item["enabled"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    requiredDataConnectors: !item["requiredDataConnectors"]
      ? item["requiredDataConnectors"]
      : securityMLAnalyticsSettingsDataSourceArrayDeserializer(item["requiredDataConnectors"]),
    tactics: !item["tactics"]
      ? item["tactics"]
      : item["tactics"].map((p: any) => {
          return p;
        }),
    techniques: !item["techniques"]
      ? item["techniques"]
      : item["techniques"].map((p: any) => {
          return p;
        }),
    anomalyVersion: item["anomalyVersion"],
    customizableObservations: item["customizableObservations"],
    frequency: item["frequency"],
    settingsStatus: item["settingsStatus"],
    isDefaultSettings: item["isDefaultSettings"],
    anomalySettingsVersion: item["anomalySettingsVersion"],
    settingsDefinitionId: item["settingsDefinitionId"],
  };
}

export function _sourceControlPropertiesSerializer(item: SourceControl): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    repoType: item["repoType"],
    contentTypes: item["contentTypes"].map((p: any) => {
      return p;
    }),
    repository: repositorySerializer(item["repository"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalSerializer(item["servicePrincipal"]),
    repositoryAccess: !item["repositoryAccess"]
      ? item["repositoryAccess"]
      : repositoryAccessSerializer(item["repositoryAccess"]),
    repositoryResourceInfo: !item["repositoryResourceInfo"]
      ? item["repositoryResourceInfo"]
      : repositoryResourceInfoSerializer(item["repositoryResourceInfo"]),
  };
}

export function _sourceControlPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    repoType: item["repoType"],
    contentTypes: item["contentTypes"].map((p: any) => {
      return p;
    }),
    repository: repositoryDeserializer(item["repository"]),
    servicePrincipal: !item["servicePrincipal"]
      ? item["servicePrincipal"]
      : servicePrincipalDeserializer(item["servicePrincipal"]),
    workloadIdentityFederation: !item["workloadIdentityFederation"]
      ? item["workloadIdentityFederation"]
      : workloadIdentityFederationDeserializer(item["workloadIdentityFederation"]),
    repositoryAccess: !item["repositoryAccess"]
      ? item["repositoryAccess"]
      : repositoryAccessDeserializer(item["repositoryAccess"]),
    repositoryResourceInfo: !item["repositoryResourceInfo"]
      ? item["repositoryResourceInfo"]
      : repositoryResourceInfoDeserializer(item["repositoryResourceInfo"]),
    lastDeploymentInfo: !item["lastDeploymentInfo"]
      ? item["lastDeploymentInfo"]
      : deploymentInfoDeserializer(item["lastDeploymentInfo"]),
    pullRequest: !item["pullRequest"]
      ? item["pullRequest"]
      : pullRequestDeserializer(item["pullRequest"]),
  };
}

export function _repositoryAccessObjectRepositoryAccessSerializer(
  item: RepositoryAccessObject,
): any {
  return {
    kind: item["kind"],
    code: item["code"],
    state: item["state"],
    clientId: item["clientId"],
    token: item["token"],
    installationId: item["installationId"],
  };
}

export function _repositoryAccessObjectRepositoryAccessDeserializer(item: any) {
  return {
    kind: item["kind"],
    code: item["code"],
    state: item["state"],
    clientId: item["clientId"],
    token: item["token"],
    installationId: item["installationId"],
  };
}

export function _repositoryAccessPropertiesPropertiesSerializer(
  item: RepositoryAccessProperties,
): any {
  return { repositoryAccess: repositoryAccessSerializer(item["repositoryAccess"]) };
}

export function _watchlistPropertiesSerializer(item: Watchlist): any {
  return {
    watchlistId: item["watchlistId"],
    displayName: item["displayName"],
    provider: item["provider"],
    source: item["source"],
    sourceType: item["sourceType"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    description: item["description"],
    watchlistType: item["watchlistType"],
    watchlistAlias: item["watchlistAlias"],
    isDeleted: item["isDeleted"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    defaultDuration: item["defaultDuration"],
    tenantId: item["tenantId"],
    numberOfLinesToSkip: item["numberOfLinesToSkip"],
    rawContent: item["rawContent"],
    itemsSearchKey: item["itemsSearchKey"],
    contentType: item["contentType"],
    uploadStatus: item["uploadStatus"],
  };
}

export function _watchlistPropertiesDeserializer(item: any) {
  return {
    watchlistId: item["watchlistId"],
    displayName: item["displayName"],
    provider: item["provider"],
    source: item["source"],
    sourceType: item["sourceType"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    description: item["description"],
    watchlistType: item["watchlistType"],
    watchlistAlias: item["watchlistAlias"],
    isDeleted: item["isDeleted"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    defaultDuration: item["defaultDuration"],
    tenantId: item["tenantId"],
    numberOfLinesToSkip: item["numberOfLinesToSkip"],
    rawContent: item["rawContent"],
    itemsSearchKey: item["itemsSearchKey"],
    contentType: item["contentType"],
    uploadStatus: item["uploadStatus"],
    provisioningState: item["provisioningState"],
  };
}

export function _watchlistItemPropertiesSerializer(item: WatchlistItem): any {
  return {
    watchlistItemType: item["watchlistItemType"],
    watchlistItemId: item["watchlistItemId"],
    tenantId: item["tenantId"],
    isDeleted: item["isDeleted"],
    created: !item["created"] ? item["created"] : item["created"].toISOString(),
    updated: !item["updated"] ? item["updated"] : item["updated"].toISOString(),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoSerializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoSerializer(item["updatedBy"]),
    itemsKeyValue: item["itemsKeyValue"],
    entityMapping: item["entityMapping"],
  };
}

export function _watchlistItemPropertiesDeserializer(item: any) {
  return {
    watchlistItemType: item["watchlistItemType"],
    watchlistItemId: item["watchlistItemId"],
    tenantId: item["tenantId"],
    isDeleted: item["isDeleted"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    updatedBy: !item["updatedBy"] ? item["updatedBy"] : userInfoDeserializer(item["updatedBy"]),
    itemsKeyValue: item["itemsKeyValue"],
    entityMapping: item["entityMapping"],
  };
}

export function _sapSolutionUsageStatisticPropertiesDeserializer(item: any) {
  return {
    activeSystemIdCount: item["activeSystemIdCount"],
  };
}

export function _expansionEntityQueryPropertiesDeserializer(item: any) {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    inputEntityType: item["inputEntityType"],
    inputFields: !item["inputFields"]
      ? item["inputFields"]
      : item["inputFields"].map((p: any) => {
          return p;
        }),
    outputEntityTypes: !item["outputEntityTypes"]
      ? item["outputEntityTypes"]
      : item["outputEntityTypes"].map((p: any) => {
          return p;
        }),
    queryTemplate: item["queryTemplate"],
  };
}

export function _activityEntityQueryPropertiesSerializer(item: ActivityEntityQuery): any {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsSerializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
    entitiesFilter: item["entitiesFilter"],
    templateName: item["templateName"],
    enabled: item["enabled"],
  };
}

export function _activityEntityQueryPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsDeserializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: !item["entitiesFilter"]
      ? item["entitiesFilter"]
      : Object.fromEntries(
          Object.entries(item["entitiesFilter"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    templateName: item["templateName"],
    enabled: item["enabled"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
  };
}

export function _activityCustomEntityQueryPropertiesSerializer(
  item: ActivityCustomEntityQuery,
): any {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsSerializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p: any) => {
            return p;
          });
        }),
    entitiesFilter: item["entitiesFilter"],
    templateName: item["templateName"],
    enabled: item["enabled"],
  };
}

export function _activityCustomEntityQueryPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueriesPropertiesQueryDefinitionsDeserializer(item["queryDefinitions"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: !item["entitiesFilter"]
      ? item["entitiesFilter"]
      : Object.fromEntries(
          Object.entries(item["entitiesFilter"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    templateName: item["templateName"],
    enabled: item["enabled"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
  };
}

export function _activityEntityQueryTemplatePropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    content: item["content"],
    description: item["description"],
    queryDefinitions: !item["queryDefinitions"]
      ? item["queryDefinitions"]
      : activityEntityQueryTemplatePropertiesQueryDefinitionsDeserializer(item["queryDefinitions"]),
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : dataTypeDefinitionsArrayDeserializer(item["dataTypes"]),
    inputEntityType: item["inputEntityType"],
    requiredInputFieldsSets: !item["requiredInputFieldsSets"]
      ? item["requiredInputFieldsSets"]
      : item["requiredInputFieldsSets"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
    entitiesFilter: !item["entitiesFilter"]
      ? item["entitiesFilter"]
      : Object.fromEntries(
          Object.entries(item["entitiesFilter"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
  };
}

export function _fileImportPropertiesSerializer(item: FileImport): any {
  return {
    ingestionMode: item["ingestionMode"],
    contentType: item["contentType"],
    importFile: !item["importFile"]
      ? item["importFile"]
      : fileMetadataSerializer(item["importFile"]),
    source: item["source"],
  };
}

export function _fileImportPropertiesDeserializer(item: any) {
  return {
    ingestionMode: item["ingestionMode"],
    contentType: item["contentType"],
    createdTimeUTC: !item["createdTimeUTC"]
      ? item["createdTimeUTC"]
      : new Date(item["createdTimeUTC"]),
    errorFile: !item["errorFile"] ? item["errorFile"] : fileMetadataDeserializer(item["errorFile"]),
    errorsPreview: !item["errorsPreview"]
      ? item["errorsPreview"]
      : validationErrorArrayDeserializer(item["errorsPreview"]),
    importFile: !item["importFile"]
      ? item["importFile"]
      : fileMetadataDeserializer(item["importFile"]),
    ingestedRecordCount: item["ingestedRecordCount"],
    source: item["source"],
    state: item["state"],
    totalRecordCount: item["totalRecordCount"],
    validRecordCount: item["validRecordCount"],
    filesValidUntilTimeUTC: !item["filesValidUntilTimeUTC"]
      ? item["filesValidUntilTimeUTC"]
      : new Date(item["filesValidUntilTimeUTC"]),
    importValidUntilTimeUTC: !item["importValidUntilTimeUTC"]
      ? item["importValidUntilTimeUTC"]
      : new Date(item["importValidUntilTimeUTC"]),
  };
}

export function _huntPropertiesSerializer(item: Hunt): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    status: item["status"],
    hypothesisStatus: item["hypothesisStatus"],
    attackTactics: !item["attackTactics"]
      ? item["attackTactics"]
      : item["attackTactics"].map((p: any) => {
          return p;
        }),
    attackTechniques: !item["attackTechniques"]
      ? item["attackTechniques"]
      : item["attackTechniques"].map((p: any) => {
          return p;
        }),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    owner: !item["owner"] ? item["owner"] : huntOwnerSerializer(item["owner"]),
  };
}

export function _huntPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    status: item["status"],
    hypothesisStatus: item["hypothesisStatus"],
    attackTactics: !item["attackTactics"]
      ? item["attackTactics"]
      : item["attackTactics"].map((p: any) => {
          return p;
        }),
    attackTechniques: !item["attackTechniques"]
      ? item["attackTechniques"]
      : item["attackTechniques"].map((p: any) => {
          return p;
        }),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    owner: !item["owner"] ? item["owner"] : huntOwnerDeserializer(item["owner"]),
  };
}

export function _huntCommentPropertiesSerializer(item: HuntComment): any {
  return { message: item["message"] };
}

export function _huntCommentPropertiesDeserializer(item: any) {
  return {
    message: item["message"],
  };
}

export function _huntRelationPropertiesSerializer(item: HuntRelation): any {
  return {
    relatedResourceId: item["relatedResourceId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
  };
}

export function _huntRelationPropertiesDeserializer(item: any) {
  return {
    relatedResourceId: item["relatedResourceId"],
    relatedResourceName: item["relatedResourceName"],
    relationType: item["relationType"],
    relatedResourceKind: item["relatedResourceKind"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
  };
}

export function _officeConsentPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    consentId: item["consentId"],
  };
}

export function _anomaliesPropertiesSerializer(_item: Anomalies): any {
  return {};
}

export function _anomaliesPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
  };
}

export function _eyesOnPropertiesSerializer(_item: EyesOn): any {
  return {};
}

export function _eyesOnPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
  };
}

export function _entityAnalyticsPropertiesSerializer(item: EntityAnalytics): any {
  return {
    entityProviders: !item["entityProviders"]
      ? item["entityProviders"]
      : item["entityProviders"].map((p: any) => {
          return p;
        }),
  };
}

export function _entityAnalyticsPropertiesDeserializer(item: any) {
  return {
    entityProviders: !item["entityProviders"]
      ? item["entityProviders"]
      : item["entityProviders"].map((p: any) => {
          return p;
        }),
  };
}

export function _uebaPropertiesSerializer(item: Ueba): any {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
  };
}

export function _uebaPropertiesDeserializer(item: any) {
  return {
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : item["dataSources"].map((p: any) => {
          return p;
        }),
  };
}

export function _triggeredAnalyticsRuleRunPropertiesDeserializer(item: any) {
  return {
    executionTimeUtc: new Date(item["executionTimeUtc"]),
    ruleId: item["ruleId"],
    triggeredAnalyticsRuleRunId: item["triggeredAnalyticsRuleRunId"],
    provisioningState: item["provisioningState"],
    ruleRunAdditionalData: !item["ruleRunAdditionalData"]
      ? item["ruleRunAdditionalData"]
      : Object.fromEntries(
          Object.entries(item["ruleRunAdditionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _workspaceManagerAssignmentPropertiesSerializer(
  item: WorkspaceManagerAssignment,
): any {
  return {
    targetResourceName: item["targetResourceName"],
    items: !item["items"] ? item["items"] : assignmentItemArraySerializer(item["items"]),
  };
}

export function _workspaceManagerAssignmentPropertiesDeserializer(item: any) {
  return {
    targetResourceName: item["targetResourceName"],
    lastJobEndTime: !item["lastJobEndTime"]
      ? item["lastJobEndTime"]
      : new Date(item["lastJobEndTime"]),
    lastJobProvisioningState: item["lastJobProvisioningState"],
    items: !item["items"] ? item["items"] : assignmentItemArrayDeserializer(item["items"]),
  };
}

export function _workspaceManagerConfigurationPropertiesSerializer(
  item: WorkspaceManagerConfiguration,
): any {
  return { mode: item["mode"] };
}

export function _workspaceManagerConfigurationPropertiesDeserializer(item: any) {
  return {
    mode: item["mode"],
  };
}

export function _workspaceManagerGroupPropertiesSerializer(item: WorkspaceManagerGroup): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    memberResourceNames: !item["memberResourceNames"]
      ? item["memberResourceNames"]
      : item["memberResourceNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _workspaceManagerGroupPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    displayName: item["displayName"],
    memberResourceNames: !item["memberResourceNames"]
      ? item["memberResourceNames"]
      : item["memberResourceNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _workspaceManagerMemberPropertiesSerializer(item: WorkspaceManagerMember): any {
  return {
    targetWorkspaceResourceId: item["targetWorkspaceResourceId"],
    targetWorkspaceTenantId: item["targetWorkspaceTenantId"],
  };
}

export function _workspaceManagerMemberPropertiesDeserializer(item: any) {
  return {
    targetWorkspaceResourceId: item["targetWorkspaceResourceId"],
    targetWorkspaceTenantId: item["targetWorkspaceTenantId"],
  };
}

export function _analyticsRuleRunTriggerPropertiesSerializer(item: AnalyticsRuleRunTrigger): any {
  return { executionTimeUtc: item["executionTimeUtc"].toISOString() };
}

export function _actionResponsePropertiesDeserializer(item: any) {
  return {
    logicAppResourceId: item["logicAppResourceId"],
    workflowId: item["workflowId"],
  };
}

export function _actionRequestPropertiesSerializer(item: ActionRequest): any {
  return { logicAppResourceId: item["logicAppResourceId"], triggerUri: item["triggerUri"] };
}

export function _packageModelPropertiesSerializer(item: PackageModel): any {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

export function _packageModelPropertiesDeserializer(item: any) {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

export function _productPackageModelPropertiesDeserializer(item: any) {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    contentKind: item["contentKind"],
    contentSchemaVersion: item["contentSchemaVersion"],
    isNew: item["isNew"],
    isPreview: item["isPreview"],
    isFeatured: item["isFeatured"],
    isDeprecated: item["isDeprecated"],
    version: item["version"],
    displayName: item["displayName"],
    description: item["description"],
    publisherDisplayName: item["publisherDisplayName"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
    installedVersion: item["installedVersion"],
    metadataResourceId: item["metadataResourceId"],
    packagedContent: item["packagedContent"],
  };
}

export function _productTemplateModelPropertiesDeserializer(item: any) {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    isDeprecated: item["isDeprecated"],
    packagedContent: item["packagedContent"],
  };
}

export function _templateModelPropertiesSerializer(item: TemplateModel): any {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    mainTemplate: item["mainTemplate"],
  };
}

export function _templateModelPropertiesDeserializer(item: any) {
  return {
    contentId: item["contentId"],
    contentProductId: item["contentProductId"],
    packageVersion: item["packageVersion"],
    version: item["version"],
    displayName: item["displayName"],
    contentKind: item["contentKind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
    packageId: item["packageId"],
    packageKind: item["packageKind"],
    packageName: item["packageName"],
    isDeprecated: item["isDeprecated"],
    mainTemplate: item["mainTemplate"],
    dependantTemplates: !item["dependantTemplates"]
      ? item["dependantTemplates"]
      : templatePropertiesArrayDeserializer(item["dependantTemplates"]),
  };
}

export function _metadataModelPropertiesSerializer(item: MetadataModel): any {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

export function _metadataModelPropertiesDeserializer(item: any) {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceDeserializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorDeserializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportDeserializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesDeserializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesDeserializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : new Date(item["firstPublishDate"]),
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : new Date(item["lastPublishDate"]),
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

export function _metadataPatchPropertiesSerializer(item: MetadataPatch): any {
  return {
    contentId: item["contentId"],
    parentId: item["parentId"],
    version: item["version"],
    kind: item["kind"],
    source: !item["source"] ? item["source"] : metadataSourceSerializer(item["source"]),
    author: !item["author"] ? item["author"] : metadataAuthorSerializer(item["author"]),
    support: !item["support"] ? item["support"] : metadataSupportSerializer(item["support"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : metadataDependenciesSerializer(item["dependencies"]),
    categories: !item["categories"]
      ? item["categories"]
      : metadataCategoriesSerializer(item["categories"]),
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
    firstPublishDate: !item["firstPublishDate"]
      ? item["firstPublishDate"]
      : item["firstPublishDate"].toISOString().split("T")[0],
    lastPublishDate: !item["lastPublishDate"]
      ? item["lastPublishDate"]
      : item["lastPublishDate"].toISOString().split("T")[0],
    customVersion: item["customVersion"],
    contentSchemaVersion: item["contentSchemaVersion"],
    icon: item["icon"],
    threatAnalysisTactics: !item["threatAnalysisTactics"]
      ? item["threatAnalysisTactics"]
      : item["threatAnalysisTactics"].map((p: any) => {
          return p;
        }),
    threatAnalysisTechniques: !item["threatAnalysisTechniques"]
      ? item["threatAnalysisTechniques"]
      : item["threatAnalysisTechniques"].map((p: any) => {
          return p;
        }),
    previewImages: !item["previewImages"]
      ? item["previewImages"]
      : item["previewImages"].map((p: any) => {
          return p;
        }),
    previewImagesDark: !item["previewImagesDark"]
      ? item["previewImagesDark"]
      : item["previewImagesDark"].map((p: any) => {
          return p;
        }),
  };
}

export function _threatIntelligenceIndicatorModelPropertiesSerializer(
  item: ThreatIntelligenceIndicatorModel,
): any {
  return {
    threatIntelligenceTags: !item["threatIntelligenceTags"]
      ? item["threatIntelligenceTags"]
      : item["threatIntelligenceTags"].map((p: any) => {
          return p;
        }),
    lastUpdatedTimeUtc: item["lastUpdatedTimeUtc"],
    source: item["source"],
    displayName: item["displayName"],
    description: item["description"],
    indicatorTypes: !item["indicatorTypes"]
      ? item["indicatorTypes"]
      : item["indicatorTypes"].map((p: any) => {
          return p;
        }),
    pattern: item["pattern"],
    patternType: item["patternType"],
    patternVersion: item["patternVersion"],
    killChainPhases: !item["killChainPhases"]
      ? item["killChainPhases"]
      : threatIntelligenceKillChainPhaseArraySerializer(item["killChainPhases"]),
    parsedPattern: !item["parsedPattern"]
      ? item["parsedPattern"]
      : threatIntelligenceParsedPatternArraySerializer(item["parsedPattern"]),
    externalId: item["externalId"],
    createdByRef: item["createdByRef"],
    defanged: item["defanged"],
    externalLastUpdatedTimeUtc: item["externalLastUpdatedTimeUtc"],
    externalReferences: !item["externalReferences"]
      ? item["externalReferences"]
      : threatIntelligenceExternalReferenceArraySerializer(item["externalReferences"]),
    granularMarkings: !item["granularMarkings"]
      ? item["granularMarkings"]
      : threatIntelligenceGranularMarkingModelArraySerializer(item["granularMarkings"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    revoked: item["revoked"],
    confidence: item["confidence"],
    objectMarkingRefs: !item["objectMarkingRefs"]
      ? item["objectMarkingRefs"]
      : item["objectMarkingRefs"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    threatTypes: !item["threatTypes"]
      ? item["threatTypes"]
      : item["threatTypes"].map((p: any) => {
          return p;
        }),
    validFrom: item["validFrom"],
    validUntil: item["validUntil"],
    created: item["created"],
    modified: item["modified"],
    extensions: item["extensions"],
  };
}

export function _threatIntelligenceIndicatorModelPropertiesDeserializer(item: any) {
  return {
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : Object.fromEntries(
          Object.entries(item["additionalData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    friendlyName: item["friendlyName"],
    threatIntelligenceTags: !item["threatIntelligenceTags"]
      ? item["threatIntelligenceTags"]
      : item["threatIntelligenceTags"].map((p: any) => {
          return p;
        }),
    lastUpdatedTimeUtc: item["lastUpdatedTimeUtc"],
    source: item["source"],
    displayName: item["displayName"],
    description: item["description"],
    indicatorTypes: !item["indicatorTypes"]
      ? item["indicatorTypes"]
      : item["indicatorTypes"].map((p: any) => {
          return p;
        }),
    pattern: item["pattern"],
    patternType: item["patternType"],
    patternVersion: item["patternVersion"],
    killChainPhases: !item["killChainPhases"]
      ? item["killChainPhases"]
      : threatIntelligenceKillChainPhaseArrayDeserializer(item["killChainPhases"]),
    parsedPattern: !item["parsedPattern"]
      ? item["parsedPattern"]
      : threatIntelligenceParsedPatternArrayDeserializer(item["parsedPattern"]),
    externalId: item["externalId"],
    createdByRef: item["createdByRef"],
    defanged: item["defanged"],
    externalLastUpdatedTimeUtc: item["externalLastUpdatedTimeUtc"],
    externalReferences: !item["externalReferences"]
      ? item["externalReferences"]
      : threatIntelligenceExternalReferenceArrayDeserializer(item["externalReferences"]),
    granularMarkings: !item["granularMarkings"]
      ? item["granularMarkings"]
      : threatIntelligenceGranularMarkingModelArrayDeserializer(item["granularMarkings"]),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    revoked: item["revoked"],
    confidence: item["confidence"],
    objectMarkingRefs: !item["objectMarkingRefs"]
      ? item["objectMarkingRefs"]
      : item["objectMarkingRefs"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    threatTypes: !item["threatTypes"]
      ? item["threatTypes"]
      : item["threatTypes"].map((p: any) => {
          return p;
        }),
    validFrom: item["validFrom"],
    validUntil: item["validUntil"],
    created: item["created"],
    modified: item["modified"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : Object.fromEntries(
          Object.entries(item["extensions"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _aadCheckRequirementsPropertiesSerializer(item: AADCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _aatpCheckRequirementsPropertiesSerializer(item: AatpCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _ascCheckRequirementsPropertiesSerializer(item: ASCCheckRequirements): any {
  return { subscriptionId: item["subscriptionId"] };
}

export function _dynamics365CheckRequirementsPropertiesSerializer(
  item: Dynamics365CheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _mcasCheckRequirementsPropertiesSerializer(item: McasCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _mdatpCheckRequirementsPropertiesSerializer(item: MdatpCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _mstiCheckRequirementsPropertiesSerializer(item: MstiCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _mtpCheckRequirementsPropertiesSerializer(item: MtpCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _officeATPCheckRequirementsPropertiesSerializer(
  item: OfficeATPCheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _officeIRMCheckRequirementsPropertiesSerializer(
  item: OfficeIRMCheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _microsoftPurviewInformationProtectionCheckRequirementsPropertiesSerializer(
  item: MicrosoftPurviewInformationProtectionCheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _office365ProjectCheckRequirementsPropertiesSerializer(
  item: Office365ProjectCheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _officePowerBICheckRequirementsPropertiesSerializer(
  item: OfficePowerBICheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _purviewAuditCheckRequirementsPropertiesSerializer(
  item: PurviewAuditCheckRequirements,
): any {
  return { tenantId: item["tenantId"] };
}

export function _tiCheckRequirementsPropertiesSerializer(item: TICheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _tiTaxiiCheckRequirementsPropertiesSerializer(item: TiTaxiiCheckRequirements): any {
  return { tenantId: item["tenantId"] };
}

export function _ioTCheckRequirementsPropertiesSerializer(item: IoTCheckRequirements): any {
  return { subscriptionId: item["subscriptionId"] };
}

export function _countQueryPropertiesSerializer(item: CountQuery): any {
  return {
    condition: !item["condition"]
      ? item["condition"]
      : conditionPropertiesSerializer(item["condition"]),
  };
}

export function _tiObjectPropertiesDeserializer(item: any) {
  return {
    data: !item["data"]
      ? item["data"]
      : Object.fromEntries(Object.entries(item["data"]).map(([k, p]: [string, any]) => [k, p])),
    createdBy: !item["createdBy"] ? item["createdBy"] : userInfoDeserializer(item["createdBy"]),
    source: item["source"],
    firstIngestedTimeUtc: !item["firstIngestedTimeUtc"]
      ? item["firstIngestedTimeUtc"]
      : new Date(item["firstIngestedTimeUtc"]),
    lastIngestedTimeUtc: !item["lastIngestedTimeUtc"]
      ? item["lastIngestedTimeUtc"]
      : new Date(item["lastIngestedTimeUtc"]),
    ingestionRulesVersion: item["ingestionRulesVersion"],
    lastUpdateMethod: item["lastUpdateMethod"],
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : userInfoDeserializer(item["lastModifiedBy"]),
    lastUpdatedDateTimeUtc: !item["lastUpdatedDateTimeUtc"]
      ? item["lastUpdatedDateTimeUtc"]
      : new Date(item["lastUpdatedDateTimeUtc"]),
    relationshipHints: !item["relationshipHints"]
      ? item["relationshipHints"]
      : relationshipHintArrayDeserializer(item["relationshipHints"]),
  };
}

export function _recommendationPropertiesDeserializer(item: any) {
  return {
    recommendationTypeId: item["recommendationTypeId"],
    state: item["state"],
    title: item["title"],
    description: item["description"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    lastEvaluatedTimeUtc: !item["lastEvaluatedTimeUtc"]
      ? item["lastEvaluatedTimeUtc"]
      : new Date(item["lastEvaluatedTimeUtc"]),
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    suggestions: !item["suggestions"]
      ? item["suggestions"]
      : recommendedSuggestionArrayDeserializer(item["suggestions"]),
    resourceId: item["resourceId"],
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : Object.fromEntries(
          Object.entries(item["additionalProperties"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

export function _jobPropertiesDeserializer(item: any) {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    items: !item["items"] ? item["items"] : jobItemArrayDeserializer(item["items"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    errorMessage: item["errorMessage"],
  };
}

export type IncidentsRunPlaybookResponse = { body: any };

export type AutomationRulesDeleteResponse = { body: any };
