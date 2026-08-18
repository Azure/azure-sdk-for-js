// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** The list of schema group names with server paging support. */
export interface _SchemaGroups {
  /** The collection of pageable schema group name items. */
  value: string[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaGroupsDeserializer(item: any): _SchemaGroups {
  return {
    value: item["Value"].map((p: any) => {
      return p;
    }),
    nextLink: item["NextLink"],
  };
}

/** The list of schema versions with server paging support. */
export interface _SchemaVersions {
  /** The collection of schema version pageable items. */
  value: number[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaVersionsDeserializer(item: any): _SchemaVersions {
  return {
    value: item["Value"].map((p: any) => {
      return p;
    }),
    nextLink: item["NextLink"],
  };
}

/** Describes closed list of schema content type values. */
export type SchemaContentTypeValues =
  | "application/json; serialization=Avro"
  | "application/json; serialization=Json"
  | "text/plain; charset=utf-8"
  | "text/vnd.ms.protobuf";

/** Represents the Schema Registry API version to use for requests. */
export enum KnownServiceVersion {
  /** Azure Schema Registry 2021-10 Version */
  V202110 = "2021-10",
  /** Azure Schema Registry 2022-10 Version */
  V202210 = "2022-10",
  /** Azure Schema Registry 2023-07-01 Version. This is the default version. */
  V20230701 = "2023-07-01",
}

export type GetSchemaByVersionResponse = { body: Uint8Array };

export type GetSchemaByIdResponse = { body: Uint8Array };
