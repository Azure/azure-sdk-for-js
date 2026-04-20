// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The log profile resource. */
export interface MicrosoftLogProfilesLogProfileResource extends TrackedResource {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: MicrosoftLogProfilesRetentionPolicy;
}

export function microsoftLogProfilesLogProfileResourceSerializer(
  item: MicrosoftLogProfilesLogProfileResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _logProfileResourcePropertiesSerializer(item),
  };
}

export function microsoftLogProfilesLogProfileResourceDeserializer(
  item: any,
): MicrosoftLogProfilesLogProfileResource {
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
export interface MicrosoftLogProfilesLogProfileProperties {
  /** the resource id of the storage account to which you would like to send the Activity Log. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming the Activity Log. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** List of regions for which Activity Log events should be stored or streamed. It is a comma separated list of valid ARM locations including the 'global' location. */
  locations: string[];
  /** the categories of the logs. These categories are created as is convenient to the user. Some values are: 'Write', 'Delete', and/or 'Action.' */
  categories: string[];
  /** the retention policy for the events in the log. */
  retentionPolicy: MicrosoftLogProfilesRetentionPolicy;
}

export function microsoftLogProfilesLogProfilePropertiesSerializer(
  item: MicrosoftLogProfilesLogProfileProperties,
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
    retentionPolicy: microsoftLogProfilesRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function microsoftLogProfilesLogProfilePropertiesDeserializer(
  item: any,
): MicrosoftLogProfilesLogProfileProperties {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
    categories: item["categories"].map((p: any) => {
      return p;
    }),
    retentionPolicy: microsoftLogProfilesRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Specifies the retention policy for the log. */
export interface MicrosoftLogProfilesRetentionPolicy {
  /** a value indicating whether the retention policy is enabled. */
  enabled: boolean;
  /** the number of days for the retention in days. A value of 0 will retain the events indefinitely. */
  days: number;
}

export function microsoftLogProfilesRetentionPolicySerializer(
  item: MicrosoftLogProfilesRetentionPolicy,
): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function microsoftLogProfilesRetentionPolicyDeserializer(
  item: any,
): MicrosoftLogProfilesRetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
  };
}

/** Describes the format of Error response. */
export interface MicrosoftLogProfilesErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftLogProfilesErrorResponseDeserializer(
  item: any,
): MicrosoftLogProfilesErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The log profile resource for patch operations. */
export interface MicrosoftLogProfilesLogProfileResourcePatch {
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
  retentionPolicy?: MicrosoftLogProfilesRetentionPolicy;
}

export function microsoftLogProfilesLogProfileResourcePatchSerializer(
  item: MicrosoftLogProfilesLogProfileResourcePatch,
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
export interface _MicrosoftLogProfilesLogProfileCollection {
  /** the values of the log profiles. */
  value: MicrosoftLogProfilesLogProfileResource[];
  /** the URL to get the next set of results. */
  nextLink?: string;
}

export function _microsoftLogProfilesLogProfileCollectionDeserializer(
  item: any,
): _MicrosoftLogProfilesLogProfileCollection {
  return {
    value: microsoftLogProfilesLogProfileResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftLogProfilesLogProfileResourceArraySerializer(
  result: Array<MicrosoftLogProfilesLogProfileResource>,
): any[] {
  return result.map((item) => {
    return microsoftLogProfilesLogProfileResourceSerializer(item);
  });
}

export function microsoftLogProfilesLogProfileResourceArrayDeserializer(
  result: Array<MicrosoftLogProfilesLogProfileResource>,
): any[] {
  return result.map((item) => {
    return microsoftLogProfilesLogProfileResourceDeserializer(item);
  });
}

export function _logProfileResourcePropertiesSerializer(
  item: MicrosoftLogProfilesLogProfileResource,
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
    retentionPolicy: microsoftLogProfilesRetentionPolicySerializer(item["retentionPolicy"]),
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
    retentionPolicy: microsoftLogProfilesRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function _logProfileResourcePatchPropertiesSerializer(
  item: MicrosoftLogProfilesLogProfileResourcePatch,
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
      : microsoftLogProfilesRetentionPolicySerializer(item["retentionPolicy"]),
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
      : microsoftLogProfilesRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}
