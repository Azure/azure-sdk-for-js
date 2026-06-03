// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { WorkbookSharedTypeKind } from "../applicationInsightsCommonTypes/models.js";
import {
  ManagedServiceIdentity,
  userAssignedIdentityRecordSerializer,
  userAssignedIdentityRecordDeserializer,
  TrackedResource,
  systemDataDeserializer,
} from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A workbook definition. */
export interface Workbook extends TrackedResource {
  /** Identity used for BYOS */
  identity?: WorkbookResourceIdentity;
  /** The kind of workbook. Only valid value is shared. */
  kind?: WorkbookSharedTypeKind;
  /** Resource etag */
  etag?: string;
  /** The user-defined name (display name) of the workbook. */
  displayName?: string;
  /** Configuration of this particular workbook. Configuration data is a string containing valid JSON */
  serializedData?: string;
  /** Workbook schema version format, like 'Notebook/1.0', which should match the workbook in serializedData */
  version?: string;
  /** Date and time in UTC of the last modification that was made to this workbook definition. */
  readonly timeModified?: Date;
  /** Workbook category, as defined by the user at creation time. */
  category?: string;
  /** Being deprecated, please use the other tags field */
  tagsPropertiesTags?: string[];
  /** Unique user id of the specific user that owns this workbook. */
  readonly userId?: string;
  /** ResourceId for a source resource. */
  sourceId?: string;
  /** The resourceId to the storage account when bring your own storage is used */
  storageUri?: string;
  /** The description of the workbook. */
  description?: string;
  /** The unique revision id for this workbook definition */
  readonly revision?: string;
}

export function workbookSerializer(item: Workbook): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "displayName",
      "serializedData",
      "version",
      "category",
      "tags",
      "sourceId",
      "storageUri",
      "description",
    ])
      ? undefined
      : _workbookPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : workbookResourceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function workbookDeserializer(item: any): Workbook {
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
    ...(!item["properties"]
      ? item["properties"]
      : _workbookPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : workbookResourceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Properties that contain a workbook. */
export interface WorkbookProperties {
  /** The user-defined name (display name) of the workbook. */
  displayName: string;
  /** Configuration of this particular workbook. Configuration data is a string containing valid JSON */
  serializedData: string | null;
  /** Workbook schema version format, like 'Notebook/1.0', which should match the workbook in serializedData */
  version?: string;
  /** Date and time in UTC of the last modification that was made to this workbook definition. */
  readonly timeModified?: Date;
  /** Workbook category, as defined by the user at creation time. */
  category: string;
  /** Being deprecated, please use the other tags field */
  tags?: string[];
  /** Unique user id of the specific user that owns this workbook. */
  readonly userId?: string;
  /** ResourceId for a source resource. */
  sourceId?: string;
  /** The resourceId to the storage account when bring your own storage is used */
  storageUri?: string;
  /** The description of the workbook. */
  description?: string;
  /** The unique revision id for this workbook definition */
  readonly revision?: string;
}

export function workbookPropertiesSerializer(item: WorkbookProperties): any {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    version: item["version"],
    category: item["category"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    sourceId: item["sourceId"],
    storageUri: item["storageUri"],
    description: item["description"],
  };
}

export function workbookPropertiesDeserializer(item: any): WorkbookProperties {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    version: item["version"],
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    category: item["category"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    userId: item["userId"],
    sourceId: item["sourceId"],
    storageUri: item["storageUri"],
    description: item["description"],
    revision: item["revision"],
  };
}

/** Identity used for BYOS */
export interface WorkbookResourceIdentity extends ManagedServiceIdentity {}

export function workbookResourceIdentitySerializer(item: WorkbookResourceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function workbookResourceIdentityDeserializer(item: any): WorkbookResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Error response. */
export interface WorkbookError {
  /** The error details. */
  error?: WorkbookErrorDefinition;
}

export function workbookErrorDeserializer(item: any): WorkbookError {
  return {
    error: !item["error"] ? item["error"] : workbookErrorDefinitionDeserializer(item["error"]),
  };
}

/** Error definition. */
export interface WorkbookErrorDefinition {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
  /** Internal error details. */
  readonly innererror?: WorkbookInnerErrorTrace;
}

export function workbookErrorDefinitionDeserializer(item: any): WorkbookErrorDefinition {
  return {
    code: item["code"],
    message: item["message"],
    innererror: !item["innererror"]
      ? item["innererror"]
      : workbookInnerErrorTraceDeserializer(item["innererror"]),
  };
}

/** Error details */
export interface WorkbookInnerErrorTrace {
  /** detailed error trace */
  readonly trace?: string[];
}

export function workbookInnerErrorTraceDeserializer(item: any): WorkbookInnerErrorTrace {
  return {
    trace: !item["trace"]
      ? item["trace"]
      : item["trace"].map((p: any) => {
          return p;
        }),
  };
}

/** The parameters that can be provided when updating workbook properties properties. */
export interface WorkbookUpdateParameters {
  /** The kind of workbook. Only valid value is shared. */
  kind?: WorkbookUpdateSharedTypeKind;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The user-defined name (display name) of the workbook. */
  displayName?: string;
  /** Configuration of this particular workbook. Configuration data is a string containing valid JSON */
  serializedData?: string;
  /** Workbook category, as defined by the user at creation time. */
  category?: string;
  /** A list of 0 or more tags that are associated with this workbook definition */
  tagsPropertiesTags?: string[];
  /** The description of the workbook. */
  description?: string;
  /** The unique revision id for this workbook definition */
  revision?: string;
}

export function workbookUpdateParametersSerializer(item: WorkbookUpdateParameters): any {
  return {
    kind: item["kind"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "displayName",
      "serializedData",
      "category",
      "tags",
      "description",
      "revision",
    ])
      ? undefined
      : _workbookUpdateParametersPropertiesSerializer(item),
  };
}

/** The kind of workbook. Only valid value is shared. */
export enum KnownWorkbookUpdateSharedTypeKind {
  /** shared */
  Shared = "shared",
}

/**
 * The kind of workbook. Only valid value is shared. \
 * {@link KnownWorkbookUpdateSharedTypeKind} can be used interchangeably with WorkbookUpdateSharedTypeKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **shared**: shared
 */
export type WorkbookUpdateSharedTypeKind = string;

/** Properties that contain a workbook for PATCH operation. */
export interface WorkbookPropertiesUpdateParameters {
  /** The user-defined name (display name) of the workbook. */
  displayName?: string;
  /** Configuration of this particular workbook. Configuration data is a string containing valid JSON */
  serializedData?: string;
  /** Workbook category, as defined by the user at creation time. */
  category?: string;
  /** A list of 0 or more tags that are associated with this workbook definition */
  tags?: string[];
  /** The description of the workbook. */
  description?: string;
  /** The unique revision id for this workbook definition */
  revision?: string;
}

export function workbookPropertiesUpdateParametersSerializer(
  item: WorkbookPropertiesUpdateParameters,
): any {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    category: item["category"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    revision: item["revision"],
  };
}

/** Workbook list result. */
export interface _WorkbooksListResult {
  /** An array of workbooks. */
  readonly value?: Workbook[];
  /** The link to the next page of results. */
  nextLink?: string;
}

export function _workbooksListResultDeserializer(item: any): _WorkbooksListResult {
  return {
    value: !item["value"] ? item["value"] : workbookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workbookArraySerializer(result: Array<Workbook>): any[] {
  return result.map((item) => {
    return workbookSerializer(item);
  });
}

export function workbookArrayDeserializer(result: Array<Workbook>): any[] {
  return result.map((item) => {
    return workbookDeserializer(item);
  });
}

export function _workbookPropertiesSerializer(item: Workbook): any {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    version: item["version"],
    category: item["category"],
    tags: !item["tagsPropertiesTags"]
      ? item["tagsPropertiesTags"]
      : item["tagsPropertiesTags"].map((p: any) => {
          return p;
        }),
    sourceId: item["sourceId"],
    storageUri: item["storageUri"],
    description: item["description"],
  };
}

export function _workbookPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    version: item["version"],
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    category: item["category"],
    tagsPropertiesTags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
    userId: item["userId"],
    sourceId: item["sourceId"],
    storageUri: item["storageUri"],
    description: item["description"],
    revision: item["revision"],
  };
}

export function _workbookUpdateParametersPropertiesSerializer(item: WorkbookUpdateParameters): any {
  return {
    displayName: item["displayName"],
    serializedData: item["serializedData"],
    category: item["category"],
    tags: !item["tagsPropertiesTags"]
      ? item["tagsPropertiesTags"]
      : item["tagsPropertiesTags"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    revision: item["revision"],
  };
}
