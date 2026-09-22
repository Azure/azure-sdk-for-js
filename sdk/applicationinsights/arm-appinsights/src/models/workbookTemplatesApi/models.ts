// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { TrackedResource, systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Application Insights workbook template definition. */
export interface WorkbookTemplate extends TrackedResource {
  /** Priority of the template. Determines which template to open when a workbook gallery is opened in viewer mode. */
  priority?: number;
  /** Information about the author of the workbook template. */
  author?: string;
  /** Valid JSON object containing workbook template payload. */
  templateData?: any;
  /** Workbook galleries supported by the template. */
  galleries?: WorkbookTemplateGallery[];
  /** Key value pair of localized gallery. Each key is the locale code of languages supported by the Azure portal. */
  localized?: Record<string, WorkbookTemplateLocalizedGallery[]>;
}

export function workbookTemplateSerializer(item: WorkbookTemplate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "priority",
      "author",
      "templateData",
      "galleries",
      "localized",
    ])
      ? undefined
      : _workbookTemplatePropertiesSerializer(item),
  };
}

export function workbookTemplateDeserializer(item: any): WorkbookTemplate {
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
      : _workbookTemplatePropertiesDeserializer(item["properties"])),
  };
}

/** Properties that contain a workbook template. */
export interface WorkbookTemplateProperties {
  /** Priority of the template. Determines which template to open when a workbook gallery is opened in viewer mode. */
  priority?: number;
  /** Information about the author of the workbook template. */
  author?: string;
  /** Valid JSON object containing workbook template payload. */
  templateData: any;
  /** Workbook galleries supported by the template. */
  galleries: WorkbookTemplateGallery[];
  /** Key value pair of localized gallery. Each key is the locale code of languages supported by the Azure portal. */
  localized?: Record<string, WorkbookTemplateLocalizedGallery[]>;
}

export function workbookTemplatePropertiesSerializer(item: WorkbookTemplateProperties): any {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: workbookTemplateGalleryArraySerializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordSerializer(item["localized"]),
  };
}

export function workbookTemplatePropertiesDeserializer(item: any): WorkbookTemplateProperties {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: workbookTemplateGalleryArrayDeserializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordDeserializer(item["localized"]),
  };
}

export function workbookTemplateGalleryArraySerializer(
  result: Array<WorkbookTemplateGallery>,
): any[] {
  return result.map((item) => {
    return workbookTemplateGallerySerializer(item);
  });
}

export function workbookTemplateGalleryArrayDeserializer(
  result: Array<WorkbookTemplateGallery>,
): any[] {
  return result.map((item) => {
    return workbookTemplateGalleryDeserializer(item);
  });
}

/** Gallery information for a workbook template. */
export interface WorkbookTemplateGallery {
  /** Name of the workbook template in the gallery. */
  name?: string;
  /** Category for the gallery. */
  category?: string;
  /** Type of workbook supported by the workbook template. */
  type?: string;
  /** Order of the template within the gallery. */
  order?: number;
  /** Azure resource type supported by the gallery. */
  resourceType?: string;
}

export function workbookTemplateGallerySerializer(item: WorkbookTemplateGallery): any {
  return {
    name: item["name"],
    category: item["category"],
    type: item["type"],
    order: item["order"],
    resourceType: item["resourceType"],
  };
}

export function workbookTemplateGalleryDeserializer(item: any): WorkbookTemplateGallery {
  return {
    name: item["name"],
    category: item["category"],
    type: item["type"],
    order: item["order"],
    resourceType: item["resourceType"],
  };
}

export function workbookTemplateLocalizedGalleryArrayRecordSerializer(
  item: Record<string, Array<WorkbookTemplateLocalizedGallery>>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : workbookTemplateLocalizedGalleryArraySerializer(item[key]);
  });
  return result;
}

export function workbookTemplateLocalizedGalleryArrayRecordDeserializer(
  item: Record<string, any>,
): Record<string, Array<WorkbookTemplateLocalizedGallery>> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : workbookTemplateLocalizedGalleryArrayDeserializer(item[key]);
  });
  return result;
}

export function workbookTemplateLocalizedGalleryArraySerializer(
  result: Array<WorkbookTemplateLocalizedGallery>,
): any[] {
  return result.map((item) => {
    return workbookTemplateLocalizedGallerySerializer(item);
  });
}

export function workbookTemplateLocalizedGalleryArrayDeserializer(
  result: Array<WorkbookTemplateLocalizedGallery>,
): any[] {
  return result.map((item) => {
    return workbookTemplateLocalizedGalleryDeserializer(item);
  });
}

/** Localized template data and gallery information. */
export interface WorkbookTemplateLocalizedGallery {
  /** Valid JSON object containing workbook template payload. */
  templateData?: any;
  /** Workbook galleries supported by the template. */
  galleries?: WorkbookTemplateGallery[];
}

export function workbookTemplateLocalizedGallerySerializer(
  item: WorkbookTemplateLocalizedGallery,
): any {
  return {
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArraySerializer(item["galleries"]),
  };
}

export function workbookTemplateLocalizedGalleryDeserializer(
  item: any,
): WorkbookTemplateLocalizedGallery {
  return {
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArrayDeserializer(item["galleries"]),
  };
}

/** Error message that will indicate why the operation failed. */
export interface WorkbookTemplateError {
  /** Error message object that will indicate why the operation failed. */
  error?: WorkbookTemplateErrorBody;
}

export function workbookTemplateErrorDeserializer(item: any): WorkbookTemplateError {
  return {
    error: !item["error"] ? item["error"] : workbookTemplateErrorBodyDeserializer(item["error"]),
  };
}

/** Error message body that will indicate why the operation failed. */
export interface WorkbookTemplateErrorBody {
  /** Service-defined error code. This code serves as a sub-status for the HTTP error code specified in the response. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
  /** The list of invalid fields send in request, in case of validation error. */
  details?: WorkbookTemplateErrorFieldContract[];
}

export function workbookTemplateErrorBodyDeserializer(item: any): WorkbookTemplateErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : workbookTemplateErrorFieldContractArrayDeserializer(item["details"]),
  };
}

export function workbookTemplateErrorFieldContractArrayDeserializer(
  result: Array<WorkbookTemplateErrorFieldContract>,
): any[] {
  return result.map((item) => {
    return workbookTemplateErrorFieldContractDeserializer(item);
  });
}

/** Error Field contract. */
export interface WorkbookTemplateErrorFieldContract {
  /** Property level error code. */
  code?: string;
  /** Human-readable representation of property-level error. */
  message?: string;
  /** Property name. */
  target?: string;
}

export function workbookTemplateErrorFieldContractDeserializer(
  item: any,
): WorkbookTemplateErrorFieldContract {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** The parameters that can be provided when updating workbook template. */
export interface WorkbookTemplateUpdateParameters {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Priority of the template. Determines which template to open when a workbook gallery is opened in viewer mode. */
  priority?: number;
  /** Information about the author of the workbook template. */
  author?: string;
  /** Valid JSON object containing workbook template payload. */
  templateData?: any;
  /** Workbook galleries supported by the template. */
  galleries?: WorkbookTemplateGallery[];
  /** Key value pair of localized gallery. Each key is the locale code of languages supported by the Azure portal. */
  localized?: Record<string, WorkbookTemplateLocalizedGallery[]>;
}

export function workbookTemplateUpdateParametersSerializer(
  item: WorkbookTemplateUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "priority",
      "author",
      "templateData",
      "galleries",
      "localized",
    ])
      ? undefined
      : _workbookTemplateUpdateParametersPropertiesSerializer(item),
  };
}

/** WorkbookTemplate list result. */
export interface _WorkbookTemplatesListResult {
  /** An array of workbook templates. */
  value?: WorkbookTemplate[];
  /** The URL to get the next page of results. */
  nextLink?: string;
}

export function _workbookTemplatesListResultDeserializer(item: any): _WorkbookTemplatesListResult {
  return {
    value: !item["value"] ? item["value"] : workbookTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workbookTemplateArraySerializer(result: Array<WorkbookTemplate>): any[] {
  return result.map((item) => {
    return workbookTemplateSerializer(item);
  });
}

export function workbookTemplateArrayDeserializer(result: Array<WorkbookTemplate>): any[] {
  return result.map((item) => {
    return workbookTemplateDeserializer(item);
  });
}

export function _workbookTemplatePropertiesSerializer(item: WorkbookTemplate): any {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArraySerializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordSerializer(item["localized"]),
  };
}

export function _workbookTemplatePropertiesDeserializer(item: any) {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArrayDeserializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordDeserializer(item["localized"]),
  };
}

export function _workbookTemplateUpdateParametersPropertiesSerializer(
  item: WorkbookTemplateUpdateParameters,
): any {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArraySerializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordSerializer(item["localized"]),
  };
}

export function _workbookTemplateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    priority: item["priority"],
    author: item["author"],
    templateData: item["templateData"],
    galleries: !item["galleries"]
      ? item["galleries"]
      : workbookTemplateGalleryArrayDeserializer(item["galleries"]),
    localized: !item["localized"]
      ? item["localized"]
      : workbookTemplateLocalizedGalleryArrayRecordDeserializer(item["localized"]),
  };
}
