// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Graph Query entity definition. */
export interface GraphQueryResource extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The location of the resource */
  location?: string;
  /** This will be used to handle Optimistic Concurrency. If not present, it will always overwrite the existing resource without checking conflict. */
  etag?: string;
  /** Date and time in UTC of the last modification that was made to this graph query definition. */
  readonly timeModified?: Date;
  /** The description of a graph query. */
  description?: string;
  /** KQL query that will be graph. */
  query?: string;
  /** Enum indicating a type of graph query. */
  readonly resultKind?: ResultKind;
}

export function graphQueryResourceSerializer(item: GraphQueryResource): any {
  return {
    properties: areAllPropsUndefined(item, ["description", "query"])
      ? undefined
      : _graphQueryResourcePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
  };
}

export function graphQueryResourceDeserializer(item: any): GraphQueryResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _graphQueryResourcePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
  };
}

/** Properties that contain a graph query. */
export interface GraphQueryProperties {
  /** Date and time in UTC of the last modification that was made to this graph query definition. */
  readonly timeModified?: Date;
  /** The description of a graph query. */
  description?: string;
  /** KQL query that will be graph. */
  query: string;
  /** Enum indicating a type of graph query. */
  readonly resultKind?: ResultKind;
}

export function graphQueryPropertiesSerializer(item: GraphQueryProperties): any {
  return { description: item["description"], query: item["query"] };
}

export function graphQueryPropertiesDeserializer(item: any): GraphQueryProperties {
  return {
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    description: item["description"],
    query: item["query"],
    resultKind: item["resultKind"],
  };
}

/** Enum indicating a type of graph query. */
export enum KnownResultKind {
  /** basic */
  Basic = "basic",
}

/**
 * Enum indicating a type of graph query. \
 * {@link KnownResultKind} can be used interchangeably with ResultKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **basic**: basic
 */
export type ResultKind = string;

/** Error message body that will indicate why the operation failed. */
export interface GraphQueryError {
  /** The error object. */
  error?: GraphQueryErrorError;
}

export function graphQueryErrorDeserializer(item: any): GraphQueryError {
  return {
    error: !item["error"] ? item["error"] : graphQueryErrorErrorDeserializer(item["error"]),
  };
}

/** The error object. */
export interface GraphQueryErrorError {
  /** Service-defined error code. This code serves as a sub-status for the HTTP error code specified in the response. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
  /** The list of invalid fields send in request, in case of validation error. */
  details?: ErrorFieldContract[];
}

export function graphQueryErrorErrorDeserializer(item: any): GraphQueryErrorError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : errorFieldContractArrayDeserializer(item["details"]),
  };
}

export function errorFieldContractArrayDeserializer(result: Array<ErrorFieldContract>): any[] {
  return result.map((item) => {
    return errorFieldContractDeserializer(item);
  });
}

/** Error Field contract. */
export interface ErrorFieldContract {
  /** Property level error code. */
  code?: string;
  /** Human-readable representation of property-level error. */
  message?: string;
  /** Property name. */
  target?: string;
}

export function errorFieldContractDeserializer(item: any): ErrorFieldContract {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** The parameters that can be provided when updating workbook properties properties. */
export interface GraphQueryUpdateParameters {
  /** Resource tags */
  tags?: Record<string, string>;
  /** This will be used to handle Optimistic Concurrency. If not present, it will always overwrite the existing resource without checking conflict. */
  etag?: string;
  /** The description of a graph query. */
  description?: string;
  /** KQL query that will be graph. */
  query?: string;
}

export function graphQueryUpdateParametersSerializer(item: GraphQueryUpdateParameters): any {
  return {
    tags: item["tags"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, ["description", "query"])
      ? undefined
      : _graphQueryUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties that contain a workbook for PATCH operation. */
export interface GraphQueryPropertiesUpdateParameters {
  /** The description of a graph query. */
  description?: string;
  /** KQL query that will be graph. */
  query?: string;
}

export function graphQueryPropertiesUpdateParametersSerializer(
  item: GraphQueryPropertiesUpdateParameters,
): any {
  return { description: item["description"], query: item["query"] };
}

/** Graph query list result. */
export interface _GraphQueryListResult {
  /** The GraphQueryResource items on this page */
  value: GraphQueryResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _graphQueryListResultDeserializer(item: any): _GraphQueryListResult {
  return {
    value: graphQueryResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function graphQueryResourceArraySerializer(result: Array<GraphQueryResource>): any[] {
  return result.map((item) => {
    return graphQueryResourceSerializer(item);
  });
}

export function graphQueryResourceArrayDeserializer(result: Array<GraphQueryResource>): any[] {
  return result.map((item) => {
    return graphQueryResourceDeserializer(item);
  });
}

export function _graphQueryResourcePropertiesSerializer(item: GraphQueryResource): any {
  return { description: item["description"], query: item["query"] };
}

export function _graphQueryResourcePropertiesDeserializer(item: any) {
  return {
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    description: item["description"],
    query: item["query"],
    resultKind: item["resultKind"],
  };
}

export function _graphQueryUpdateParametersPropertiesSerializer(
  item: GraphQueryUpdateParameters,
): any {
  return { description: item["description"], query: item["query"] };
}
