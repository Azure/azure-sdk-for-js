// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { MicrosoftCommonRetentionPolicy } from "../microsoft/common/models.js";
import {
  microsoftCommonRetentionPolicySerializer,
  microsoftCommonRetentionPolicyDeserializer,
} from "../microsoft/common/models.js";
import type { TrackedResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The log profile resource. */
export interface LogProfilesApiLogProfileResource extends TrackedResource {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: MicrosoftCommonRetentionPolicy;
}

export function logProfilesApiLogProfileResourceSerializer(
  item: LogProfilesApiLogProfileResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _logProfileResourcePropertiesSerializer(item),
  };
}

export function logProfilesApiLogProfileResourceDeserializer(
  item: any,
): LogProfilesApiLogProfileResource {
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
export interface LogProfilesApiLogProfileProperties {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: MicrosoftCommonRetentionPolicy;
}

export function logProfilesApiLogProfilePropertiesSerializer(
  item: LogProfilesApiLogProfileProperties,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function logProfilesApiLogProfilePropertiesDeserializer(
  item: any,
): LogProfilesApiLogProfileProperties {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** The log profile resource for patch operations. */
export interface LogProfilesApiLogProfileResourcePatch {
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
  retentionPolicy?: MicrosoftCommonRetentionPolicy;
}

export function logProfilesApiLogProfileResourcePatchSerializer(
  item: LogProfilesApiLogProfileResourcePatch,
): any {
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
export interface _LogProfilesApiLogProfileCollection {
  /** the values of the log profiles. */
  value: LogProfilesApiLogProfileResource[];
  /** the URL to get the next set of results. */
  nextLink?: string;
}

export function _logProfilesApiLogProfileCollectionDeserializer(
  item: any,
): _LogProfilesApiLogProfileCollection {
  return {
    value: logProfilesApiLogProfileResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logProfilesApiLogProfileResourceArraySerializer(
  result: Array<LogProfilesApiLogProfileResource>,
): any[] {
  return result.map((item) => {
    return logProfilesApiLogProfileResourceSerializer(item);
  });
}

export function logProfilesApiLogProfileResourceArrayDeserializer(
  result: Array<LogProfilesApiLogProfileResource>,
): any[] {
  return result.map((item) => {
    return logProfilesApiLogProfileResourceDeserializer(item);
  });
}

export function _logProfileResourcePropertiesSerializer(
  item: LogProfilesApiLogProfileResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
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
    retentionPolicy: microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function _logProfileResourcePatchPropertiesSerializer(
  item: LogProfilesApiLogProfileResourcePatch,
): any {
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
      : microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
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
      : microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}
