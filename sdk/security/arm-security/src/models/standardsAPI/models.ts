// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { CommonAssignedStandardItem } from "../common/models.js";
import {
  commonAssignedStandardItemSerializer,
  commonAssignedStandardItemDeserializer,
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
export interface StandardsAPIStandard extends ProxyResource {
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
  components?: StandardsAPIStandardComponentProperties[];
  /** List of all standard supported clouds. */
  supportedClouds?: StandardsAPIStandardSupportedClouds[];
}

export function standardsAPIStandardSerializer(item: StandardsAPIStandard): any {
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

export function standardsAPIStandardDeserializer(item: any): StandardsAPIStandard {
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
export interface StandardsAPIStandardProperties {
  /** display name of the standard, equivalent to the standardId */
  displayName?: string;
  /** standard type (Custom or BuiltIn only currently) */
  readonly standardType?: string;
  /** description of the standard */
  description?: string;
  /** category of the standard provided */
  category?: string;
  /** List of component objects containing component unique keys (such as assessment keys) to apply to standard scope.  Currently only supports assessment keys. */
  components?: StandardsAPIStandardComponentProperties[];
  /** List of all standard supported clouds. */
  supportedClouds?: StandardsAPIStandardSupportedClouds[];
}

export function standardsAPIStandardPropertiesSerializer(
  item: StandardsAPIStandardProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardsAPIStandardComponentPropertiesArraySerializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function standardsAPIStandardPropertiesDeserializer(
  item: any,
): StandardsAPIStandardProperties {
  return {
    displayName: item["displayName"],
    standardType: item["standardType"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardsAPIStandardComponentPropertiesArrayDeserializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function standardsAPIStandardComponentPropertiesArraySerializer(
  result: Array<StandardsAPIStandardComponentProperties>,
): any[] {
  return result.map((item) => {
    return standardsAPIStandardComponentPropertiesSerializer(item);
  });
}

export function standardsAPIStandardComponentPropertiesArrayDeserializer(
  result: Array<StandardsAPIStandardComponentProperties>,
): any[] {
  return result.map((item) => {
    return standardsAPIStandardComponentPropertiesDeserializer(item);
  });
}

/** Describes properties of an component as related to the standard */
export interface StandardsAPIStandardComponentProperties {
  /** Component Key matching componentMetadata */
  key?: string;
}

export function standardsAPIStandardComponentPropertiesSerializer(
  item: StandardsAPIStandardComponentProperties,
): any {
  return { key: item["key"] };
}

export function standardsAPIStandardComponentPropertiesDeserializer(
  item: any,
): StandardsAPIStandardComponentProperties {
  return {
    key: item["key"],
  };
}

/** The cloud that the standard is supported on. */
export type StandardsAPIStandardSupportedClouds = "AWS" | "GCP";

/** Page of a Standard list */
export interface _StandardsAPIStandardList {
  /** Collection of standards in this page */
  readonly value?: StandardsAPIStandard[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _standardsAPIStandardListDeserializer(item: any): _StandardsAPIStandardList {
  return {
    value: !item["value"] ? item["value"] : standardsAPIStandardArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standardsAPIStandardArraySerializer(result: Array<StandardsAPIStandard>): any[] {
  return result.map((item) => {
    return standardsAPIStandardSerializer(item);
  });
}

export function standardsAPIStandardArrayDeserializer(result: Array<StandardsAPIStandard>): any[] {
  return result.map((item) => {
    return standardsAPIStandardDeserializer(item);
  });
}

/** Security Assignment on a resource group over a given scope */
export interface StandardsAPIAssignment extends ProxyResource {
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
  assignedStandard?: CommonAssignedStandardItem;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedComponent?: StandardsAPIAssignedComponentItem;
  /** Scope to which the standardAssignment applies - can be a subscription path or a resource group under that subscription */
  scope?: string;
  /** expected effect of this assignment (Disable/Exempt/etc) */
  effect?: string;
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about the assignment */
  additionalData?: StandardsAPIAssignmentPropertiesAdditionalData;
  /** The assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
}

export function standardsAPIAssignmentSerializer(item: StandardsAPIAssignment): any {
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

export function standardsAPIAssignmentDeserializer(item: any): StandardsAPIAssignment {
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
export interface StandardsAPIAssignmentProperties {
  /** display name of the standardAssignment */
  displayName?: string;
  /** description of the standardAssignment */
  description?: string;
  /** Standard item with key as applied to this standard assignment over the given scope */
  assignedStandard?: CommonAssignedStandardItem;
  /** Component item with key as applied to this standard assignment over the given scope */
  assignedComponent?: StandardsAPIAssignedComponentItem;
  /** Scope to which the standardAssignment applies - can be a subscription path or a resource group under that subscription */
  scope?: string;
  /** expected effect of this assignment (Disable/Exempt/etc) */
  effect?: string;
  /** Expiration date of this assignment as a full ISO date */
  expiresOn?: Date;
  /** Additional data about the assignment */
  additionalData?: StandardsAPIAssignmentPropertiesAdditionalData;
  /** The assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
}

export function standardsAPIAssignmentPropertiesSerializer(
  item: StandardsAPIAssignmentProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemSerializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : standardsAPIAssignedComponentItemSerializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : standardsAPIAssignmentPropertiesAdditionalDataSerializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

export function standardsAPIAssignmentPropertiesDeserializer(
  item: any,
): StandardsAPIAssignmentProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemDeserializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : standardsAPIAssignedComponentItemDeserializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : standardsAPIAssignmentPropertiesAdditionalDataDeserializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

/** describe the properties of a security assessment object reference (by key) */
export interface StandardsAPIAssignedComponentItem {
  /** unique key to a security assessment object */
  key?: string;
}

export function standardsAPIAssignedComponentItemSerializer(
  item: StandardsAPIAssignedComponentItem,
): any {
  return { key: item["key"] };
}

export function standardsAPIAssignedComponentItemDeserializer(
  item: any,
): StandardsAPIAssignedComponentItem {
  return {
    key: item["key"],
  };
}

/** Additional data about the assignment */
export interface StandardsAPIAssignmentPropertiesAdditionalData {
  /** Exemption category of this assignment */
  exemptionCategory?: string;
}

export function standardsAPIAssignmentPropertiesAdditionalDataSerializer(
  item: StandardsAPIAssignmentPropertiesAdditionalData,
): any {
  return { exemptionCategory: item["exemptionCategory"] };
}

export function standardsAPIAssignmentPropertiesAdditionalDataDeserializer(
  item: any,
): StandardsAPIAssignmentPropertiesAdditionalData {
  return {
    exemptionCategory: item["exemptionCategory"],
  };
}

/** Page of a standard assignment list */
export interface _StandardsAPIAssignmentList {
  /** Collection of standardAssignments in this page */
  readonly value?: StandardsAPIAssignment[];
  /** The URI to fetch the next page */
  readonly nextLink?: string;
}

export function _standardsAPIAssignmentListDeserializer(item: any): _StandardsAPIAssignmentList {
  return {
    value: !item["value"] ? item["value"] : standardsAPIAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function standardsAPIAssignmentArraySerializer(
  result: Array<StandardsAPIAssignment>,
): any[] {
  return result.map((item) => {
    return standardsAPIAssignmentSerializer(item);
  });
}

export function standardsAPIAssignmentArrayDeserializer(
  result: Array<StandardsAPIAssignment>,
): any[] {
  return result.map((item) => {
    return standardsAPIAssignmentDeserializer(item);
  });
}

export function _standardPropertiesSerializer(item: StandardsAPIStandard): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    category: item["category"],
    components: !item["components"]
      ? item["components"]
      : standardsAPIStandardComponentPropertiesArraySerializer(item["components"]),
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
      : standardsAPIStandardComponentPropertiesArrayDeserializer(item["components"]),
    supportedClouds: !item["supportedClouds"]
      ? item["supportedClouds"]
      : item["supportedClouds"].map((p: any) => {
          return p;
        }),
  };
}

export function _assignmentPropertiesSerializer(item: StandardsAPIAssignment): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemSerializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : standardsAPIAssignedComponentItemSerializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : item["expiresOn"].toISOString(),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : standardsAPIAssignmentPropertiesAdditionalDataSerializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}

export function _assignmentPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    assignedStandard: !item["assignedStandard"]
      ? item["assignedStandard"]
      : commonAssignedStandardItemDeserializer(item["assignedStandard"]),
    assignedComponent: !item["assignedComponent"]
      ? item["assignedComponent"]
      : standardsAPIAssignedComponentItemDeserializer(item["assignedComponent"]),
    scope: item["scope"],
    effect: item["effect"],
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : standardsAPIAssignmentPropertiesAdditionalDataDeserializer(item["additionalData"]),
    metadata: item["metadata"],
  };
}
