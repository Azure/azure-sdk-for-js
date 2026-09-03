// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkbookSharedTypeKind } from "../applicationInsightsCommonTypes/models.js";
import { TrackedResource, systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Workbook list result. */
export interface _DeletedWorkbooksListResult {
  /** An array of workbooks. */
  readonly value?: DeletedWorkbook[];
  /** The link to the next page of results. */
  nextLink?: string;
}

export function _deletedWorkbooksListResultDeserializer(item: any): _DeletedWorkbooksListResult {
  return {
    value: !item["value"] ? item["value"] : deletedWorkbookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedWorkbookArrayDeserializer(result: Array<DeletedWorkbook>): any[] {
  return result.map((item) => {
    return deletedWorkbookDeserializer(item);
  });
}

/** A workbook definition. */
export interface DeletedWorkbook extends DeletedWorkbookResource {
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

export function deletedWorkbookDeserializer(item: any): DeletedWorkbook {
  return {
    kind: item["kind"],
    etag: item["etag"],
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
      : _deletedWorkbookPropertiesDeserializer(item["properties"])),
  };
}

/** Properties that contain a workbook. */
export interface DeletedWorkbookProperties {
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

export function deletedWorkbookPropertiesDeserializer(item: any): DeletedWorkbookProperties {
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

/** An azure resource object */
export interface DeletedWorkbookResource extends TrackedResource {
  /** The kind of workbook. Only valid value is shared. */
  kind?: WorkbookSharedTypeKind;
  /** Resource etag */
  etag?: string;
}

export function deletedWorkbookResourceDeserializer(item: any): DeletedWorkbookResource {
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
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** Error response. */
export interface DeletedWorkbookError {
  /** The error details. */
  error?: DeletedWorkbookErrorDefinition;
}

export function deletedWorkbookErrorDeserializer(item: any): DeletedWorkbookError {
  return {
    error: !item["error"]
      ? item["error"]
      : deletedWorkbookErrorDefinitionDeserializer(item["error"]),
  };
}

/** Error definition. */
export interface DeletedWorkbookErrorDefinition {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
  /** Internal error details. */
  readonly innererror?: DeletedWorkbookInnerErrorTrace;
}

export function deletedWorkbookErrorDefinitionDeserializer(
  item: any,
): DeletedWorkbookErrorDefinition {
  return {
    code: item["code"],
    message: item["message"],
    innererror: !item["innererror"]
      ? item["innererror"]
      : deletedWorkbookInnerErrorTraceDeserializer(item["innererror"]),
  };
}

/** Error details */
export interface DeletedWorkbookInnerErrorTrace {
  /** detailed error trace */
  readonly trace?: string[];
}

export function deletedWorkbookInnerErrorTraceDeserializer(
  item: any,
): DeletedWorkbookInnerErrorTrace {
  return {
    trace: !item["trace"]
      ? item["trace"]
      : item["trace"].map((p: any) => {
          return p;
        }),
  };
}

export function _deletedWorkbookPropertiesDeserializer(item: any) {
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
