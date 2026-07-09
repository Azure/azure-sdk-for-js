// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An alert incident indicates the activation status of an alert rule. */
export interface Incident {
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

export function incidentDeserializer(item: any): Incident {
  return {
    name: item["name"],
    ruleName: item["ruleName"],
    isActive: item["isActive"],
    activatedTime: !item["activatedTime"] ? item["activatedTime"] : new Date(item["activatedTime"]),
    resolvedTime: !item["resolvedTime"] ? item["resolvedTime"] : new Date(item["resolvedTime"]),
  };
}

/** The List incidents operation response. */
export interface _IncidentListResult {
  /** the incident collection. */
  value?: Incident[];
  /** the URL to get the next set of results. */
  nextLink?: string;
}

export function _incidentListResultDeserializer(item: any): _IncidentListResult {
  return {
    value: !item["value"] ? item["value"] : incidentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function incidentArrayDeserializer(result: Array<Incident>): any[] {
  return result.map((item) => {
    return incidentDeserializer(item);
  });
}
