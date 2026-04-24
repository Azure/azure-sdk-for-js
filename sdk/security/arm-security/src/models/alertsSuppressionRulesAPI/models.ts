// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the suppression rule */
export interface AlertsSuppressionRule extends ProxyResource {
  /** Type of the alert to automatically suppress. For all alert types, use '*' */
  alertType?: string;
  /** The last time this rule was modified */
  readonly lastModifiedUtc?: Date;
  /** Expiration date of the rule, if value is not provided or provided as null there will no expiration at all */
  expirationDateUtc?: Date;
  /** The reason for dismissing the alert */
  reason?: string;
  /** Possible states of the rule */
  state?: RuleState;
  /** Any comment regarding the rule */
  comment?: string;
  /** The suppression conditions */
  suppressionAlertsScope?: SuppressionAlertsScope;
}

export function alertsSuppressionRuleSerializer(item: AlertsSuppressionRule): any {
  return {
    properties: areAllPropsUndefined(item, [
      "alertType",
      "expirationDateUtc",
      "reason",
      "state",
      "comment",
      "suppressionAlertsScope",
    ])
      ? undefined
      : _alertsSuppressionRulePropertiesSerializer(item),
  };
}

export function alertsSuppressionRuleDeserializer(item: any): AlertsSuppressionRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertsSuppressionRulePropertiesDeserializer(item["properties"])),
  };
}

/** describes AlertsSuppressionRule properties */
export interface AlertsSuppressionRuleProperties {
  /** Type of the alert to automatically suppress. For all alert types, use '*' */
  alertType: string;
  /** The last time this rule was modified */
  readonly lastModifiedUtc?: Date;
  /** Expiration date of the rule, if value is not provided or provided as null there will no expiration at all */
  expirationDateUtc?: Date;
  /** The reason for dismissing the alert */
  reason: string;
  /** Possible states of the rule */
  state: RuleState;
  /** Any comment regarding the rule */
  comment?: string;
  /** The suppression conditions */
  suppressionAlertsScope?: SuppressionAlertsScope;
}

export function alertsSuppressionRulePropertiesSerializer(
  item: AlertsSuppressionRuleProperties,
): any {
  return {
    alertType: item["alertType"],
    expirationDateUtc: !item["expirationDateUtc"]
      ? item["expirationDateUtc"]
      : item["expirationDateUtc"].toISOString(),
    reason: item["reason"],
    state: item["state"],
    comment: item["comment"],
    suppressionAlertsScope: !item["suppressionAlertsScope"]
      ? item["suppressionAlertsScope"]
      : suppressionAlertsScopeSerializer(item["suppressionAlertsScope"]),
  };
}

export function alertsSuppressionRulePropertiesDeserializer(
  item: any,
): AlertsSuppressionRuleProperties {
  return {
    alertType: item["alertType"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    expirationDateUtc: !item["expirationDateUtc"]
      ? item["expirationDateUtc"]
      : new Date(item["expirationDateUtc"]),
    reason: item["reason"],
    state: item["state"],
    comment: item["comment"],
    suppressionAlertsScope: !item["suppressionAlertsScope"]
      ? item["suppressionAlertsScope"]
      : suppressionAlertsScopeDeserializer(item["suppressionAlertsScope"]),
  };
}

/** Possible states of the rule */
export type RuleState = "Enabled" | "Disabled" | "Expired";

/** model interface SuppressionAlertsScope */
export interface SuppressionAlertsScope {
  /** All the conditions inside need to be true in order to suppress the alert */
  allOf: ScopeElement[];
}

export function suppressionAlertsScopeSerializer(item: SuppressionAlertsScope): any {
  return { allOf: scopeElementArraySerializer(item["allOf"]) };
}

export function suppressionAlertsScopeDeserializer(item: any): SuppressionAlertsScope {
  return {
    allOf: scopeElementArrayDeserializer(item["allOf"]),
  };
}

export function scopeElementArraySerializer(result: Array<ScopeElement>): any[] {
  return result.map((item) => {
    return scopeElementSerializer(item);
  });
}

export function scopeElementArrayDeserializer(result: Array<ScopeElement>): any[] {
  return result.map((item) => {
    return scopeElementDeserializer(item);
  });
}

/** A more specific scope used to identify the alerts to suppress. */
export interface ScopeElement {
  /** The alert entity type to suppress by. */
  field?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function scopeElementSerializer(item: ScopeElement): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), field: item["field"] };
}

export function scopeElementDeserializer(item: any): ScopeElement {
  return {
    additionalProperties: serializeRecord(item, ["field"]),
    field: item["field"],
  };
}

/** Suppression rules list for subscription. */
export interface _AlertsSuppressionRulesList {
  /** The AlertsSuppressionRule items on this page */
  value: AlertsSuppressionRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertsSuppressionRulesListDeserializer(item: any): _AlertsSuppressionRulesList {
  return {
    value: alertsSuppressionRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertsSuppressionRuleArraySerializer(result: Array<AlertsSuppressionRule>): any[] {
  return result.map((item) => {
    return alertsSuppressionRuleSerializer(item);
  });
}

export function alertsSuppressionRuleArrayDeserializer(
  result: Array<AlertsSuppressionRule>,
): any[] {
  return result.map((item) => {
    return alertsSuppressionRuleDeserializer(item);
  });
}

export function _alertsSuppressionRulePropertiesSerializer(item: AlertsSuppressionRule): any {
  return {
    alertType: item["alertType"],
    expirationDateUtc: !item["expirationDateUtc"]
      ? item["expirationDateUtc"]
      : item["expirationDateUtc"].toISOString(),
    reason: item["reason"],
    state: item["state"],
    comment: item["comment"],
    suppressionAlertsScope: !item["suppressionAlertsScope"]
      ? item["suppressionAlertsScope"]
      : suppressionAlertsScopeSerializer(item["suppressionAlertsScope"]),
  };
}

export function _alertsSuppressionRulePropertiesDeserializer(item: any) {
  return {
    alertType: item["alertType"],
    lastModifiedUtc: !item["lastModifiedUtc"]
      ? item["lastModifiedUtc"]
      : new Date(item["lastModifiedUtc"]),
    expirationDateUtc: !item["expirationDateUtc"]
      ? item["expirationDateUtc"]
      : new Date(item["expirationDateUtc"]),
    reason: item["reason"],
    state: item["state"],
    comment: item["comment"],
    suppressionAlertsScope: !item["suppressionAlertsScope"]
      ? item["suppressionAlertsScope"]
      : suppressionAlertsScopeDeserializer(item["suppressionAlertsScope"]),
  };
}
