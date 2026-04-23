// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { RetentionPolicy } from "../common/models.js";
import { retentionPolicySerializer, retentionPolicyDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The log profile resource. */
export interface LogProfileResource extends TrackedResource {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: RetentionPolicy;
}

export function logProfileResourceSerializer(item: LogProfileResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _logProfileResourcePropertiesSerializer(item),
  };
}

export function logProfileResourceDeserializer(item: any): LogProfileResource {
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
    ..._logProfileResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The log profile properties. */
export interface LogProfileProperties {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: RetentionPolicy;
}

export function logProfilePropertiesSerializer(item: LogProfileProperties): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function logProfilePropertiesDeserializer(item: any): LogProfileProperties {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** The log profile resource for patch operations. */
export interface LogProfileResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations?: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories?: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy?: RetentionPolicy;
}

export function logProfileResourcePatchSerializer(item: LogProfileResourcePatch): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "storageAccountId",
      "serviceBusRuleId",
      "locations",
      "categories",
      "retentionPolicy",
    ])
      ? undefined
      : _logProfileResourcePatchPropertiesSerializer(item),
  };
}

/** Represents a collection of log profiles. */
export interface _LogProfileCollection {
  /** the values of the log profiles. */
  value: LogProfileResource[];
  /** the URL to get the next set of results. */
  nextLink?: string;
}

export function _logProfileCollectionDeserializer(item: any): _LogProfileCollection {
  return {
    value: logProfileResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logProfileResourceArraySerializer(result: Array<LogProfileResource>): any[] {
  return result.map((item) => {
    return logProfileResourceSerializer(item);
  });
}

export function logProfileResourceArrayDeserializer(result: Array<LogProfileResource>): any[] {
  return result.map((item) => {
    return logProfileResourceDeserializer(item);
  });
}

export function _logProfileResourcePropertiesSerializer(item: LogProfileResource): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function _logProfileResourcePropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function _logProfileResourcePatchPropertiesSerializer(item: LogProfileResourcePatch): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function _logProfileResourcePatchPropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}
