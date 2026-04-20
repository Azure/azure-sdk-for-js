// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An alert incident indicates the activation status of an alert rule. */
export interface MicrosoftAlertRulesIncidentsIncident {
  /** Incident name. */
  readonly name?: string;
  /** Rule name that is associated with the incident. */
  readonly ruleName?: string;
  /** A boolean to indicate whether the incident is active or resolved. */
  readonly isActive?: boolean;
  /** The time at which the incident was activated in ISO8601 format. */
  readonly activatedTime?: Date;
  /** The time at which the incident was resolved in ISO8601 format. If null, it means the incident is still active. */
  readonly resolvedTime?: Date;
}

export function microsoftAlertRulesIncidentsIncidentDeserializer(
  item: any,
): MicrosoftAlertRulesIncidentsIncident {
  return {
    name: item["name"],
    ruleName: item["ruleName"],
    isActive: item["isActive"],
    activatedTime: !item["activatedTime"] ? item["activatedTime"] : new Date(item["activatedTime"]),
    resolvedTime: !item["resolvedTime"] ? item["resolvedTime"] : new Date(item["resolvedTime"]),
  };
}

/** Describes the format of Error response. */
export interface MicrosoftAlertRulesIncidentsErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftAlertRulesIncidentsErrorResponseDeserializer(
  item: any,
): MicrosoftAlertRulesIncidentsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The List incidents operation response. */
export interface _MicrosoftAlertRulesIncidentsIncidentListResult {
  /** the incident collection. */
  value?: MicrosoftAlertRulesIncidentsIncident[];
  /** the URL to get the next set of results. */
  nextLink?: string;
}

export function _microsoftAlertRulesIncidentsIncidentListResultDeserializer(
  item: any,
): _MicrosoftAlertRulesIncidentsIncidentListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : microsoftAlertRulesIncidentsIncidentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftAlertRulesIncidentsIncidentArrayDeserializer(
  result: Array<MicrosoftAlertRulesIncidentsIncident>,
): any[] {
  return result.map((item) => {
    return microsoftAlertRulesIncidentsIncidentDeserializer(item);
  });
}
