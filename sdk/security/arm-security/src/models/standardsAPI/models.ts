// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { AssignedStandardItem } from "../common/models.js";
import {
  assignedStandardItemSerializer,
  assignedStandardItemDeserializer,
} from "../common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security Standard on a resource */
export interface Standard extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Kind of the resource */
  kind?: string;
  /** Entity tag is used for comparing two or more entities from the same requested resource. */
  etag?: string;
  /** display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** standard type (Custom or BuiltIn only currently) */
  readonly standardType?: string;
  /** description of the standard */
  description?: string;
  /** category of the standard provided */
  category?: string;
  /** List of component objects containing component unique keys (such as assessment keys) to apply to standard scope.  Currently only supports assessment keys. */
  components?: StandardComponentProperties[];
  /** List of all standard supported clouds. */
  supportedClouds?: StandardSupportedClouds[];
}

export function standardSerializer(item: Standard): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "category",
      "components",
      "supportedClouds",
    ])
      ? undefined
      : _standardPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function standardDeserializer(item: any): Standard {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _standardPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Describes properties of a standard. */
export interface StandardProperties {
  /** display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** standard type (Custom or BuiltIn only currently) */
  readonly standardType?: string;
  /** description of the standard */
  description?: string;
  /** category of the standard provided */
  category?: string;
  /** List of component objects containing component unique keys (such as assessment keys) to apply to standard scope.  Currently only supports assessment keys. */
  components?: StandardComponentProperties[];
  /** List of all standard supported clouds. */
  supportedClouds?: StandardSupportedClouds[];
}

export function standardPropertiesSerializer(item: StandardProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardComponentPropertiesArraySerializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function standardPropertiesDeserializer(item: any): StandardProperties {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardComponentPropertiesArrayDeserializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function standardComponentPropertiesArraySerializer(
  result: Array<StandardComponentProperties>,
): any[] {
  return result.map((item) => {
    return standardComponentPropertiesSerializer(item);
  });
}

export function standardComponentPropertiesArrayDeserializer(
  result: Array<StandardComponentProperties>,
): any[] {
  return result.map((item) => {
    return standardComponentPropertiesDeserializer(item);
  });
}

/** Describes properties of an component as related to the standard */
export interface StandardComponentProperties {
  /** Component Key matching componentMetadata */
  key?: string;
}

export function standardComponentPropertiesSerializer(item: StandardComponentProperties): any {
  return { key: item["key"] };
}

export function standardComponentPropertiesDeserializer(item: any): StandardComponentProperties {
  return {
    key: item["key"],
  };
}

/** The cloud that the standard is supported on. */
export type StandardSupportedClouds = "AWS" | "GCP";

/** Page of a Standard list */
export interface _StandardList {
  /** Collection of standards in this page */
  readonly value?: Standard[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _standardListDeserializer(item: any): _StandardList {
  return {
    value: !item["value"] ? item["value"] : standardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standardArraySerializer(result: Array<Standard>): any[] {
  return result.map((item) => {
    return standardSerializer(item);
  });
}

export function standardArrayDeserializer(result: Array<Standard>): any[] {
  return result.map((item) => {
    return standardDeserializer(item);
  });
}

/** Security Assignment on a resource group over a given scope */
export interface Assignment extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Kind of the resource */
  kind?: string;
  /** Entity tag is used for comparing two or more entities from the same requested resource. */
  etag?: string;
  /** display name of the standardAssignment */
  displayName?: string;
  /** description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: AssignedStandardItem;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedComponent?: AssignedComponentItem;
  /** Scope to which the standardAssignment applies - can be a subscription path or a resource group under that subscription */
  scope?: string;
  /** expected effect of this assignment (Disable/Exempt/etc) */
  effect?: string;
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about the assignment */
  additionalData?: AssignmentPropertiesAdditionalData;
  /** The assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
}

export function assignmentSerializer(item: Assignment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "assignedStandard",
      "assignedComponent",
      "scope",
      "effect",
      "expiresOn",
      "additionalData",
      "metadata",
    ])
      ? undefined
      : _assignmentPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function assignmentDeserializer(item: any): Assignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _assignmentPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Describes the properties of a standardAssignment */
export interface AssignmentProperties {
  /** display name of the standardAssignment */
  displayName?: string;
  /** description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: AssignedStandardItem;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedComponent?: AssignedComponentItem;
  /** Scope to which the standardAssignment applies - can be a subscription path or a resource group under that subscription */
  scope?: string;
  /** expected effect of this assignment (Disable/Exempt/etc) */
  effect?: string;
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about the assignment */
  additionalData?: AssignmentPropertiesAdditionalData;
  /** The assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
}

export function assignmentPropertiesSerializer(item: AssignmentProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemSerializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : assignedComponentItemSerializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : assignmentPropertiesAdditionalDataSerializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

export function assignmentPropertiesDeserializer(item: any): AssignmentProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemDeserializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : assignedComponentItemDeserializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : assignmentPropertiesAdditionalDataDeserializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

/** describe the properties of a security assessment object reference (by key) */
export interface AssignedComponentItem {
  /** unique key to a security assessment object */
  key?: string;
}

export function assignedComponentItemSerializer(item: AssignedComponentItem): any {
  return { key: item["key"] };
}

export function assignedComponentItemDeserializer(item: any): AssignedComponentItem {
  return {
    key: item["key"],
  };
}

/** Additional data about the assignment */
export interface AssignmentPropertiesAdditionalData {
  /** Exemption category of this assignment */
  exemptionCategory?: string;
}

export function assignmentPropertiesAdditionalDataSerializer(
  item: AssignmentPropertiesAdditionalData,
): any {
  return { exemptionCategory: item["exemptionCategory"] };
}

export function assignmentPropertiesAdditionalDataDeserializer(
  item: any,
): AssignmentPropertiesAdditionalData {
  return {
    exemptionCategory: item["exemptionCategory"],
  };
}

/** Page of a standard assignment list */
export interface _AssignmentList {
  /** Collection of standardAssignments in this page */
  readonly value?: Assignment[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _assignmentListDeserializer(item: any): _AssignmentList {
  return {
    value: !item["value"] ? item["value"] : assignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assignmentArraySerializer(result: Array<Assignment>): any[] {
  return result.map((item) => {
    return assignmentSerializer(item);
  });
}

export function assignmentArrayDeserializer(result: Array<Assignment>): any[] {
  return result.map((item) => {
    return assignmentDeserializer(item);
  });
}

export function _standardPropertiesSerializer(item: Standard): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardComponentPropertiesArraySerializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function _standardPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardComponentPropertiesArrayDeserializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function _assignmentPropertiesSerializer(item: Assignment): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemSerializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : assignedComponentItemSerializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : assignmentPropertiesAdditionalDataSerializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

export function _assignmentPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : assignedStandardItemDeserializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : assignedComponentItemDeserializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : assignmentPropertiesAdditionalDataDeserializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}
