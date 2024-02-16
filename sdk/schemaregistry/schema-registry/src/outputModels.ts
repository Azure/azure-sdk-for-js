// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Schema Group resource. */
export interface SchemaGroupOutput {
  /** Name of schema group. */
  readonly groupName: string;
}

/** Schema versions resource. */
export interface VersionOutput {
  /** Version number of specific schema. */
  readonly schemaVersion: number;
}

/** Paged collection of SchemaGroup items */
export type PagedSchemaGroupOutput = Paged<SchemaGroupOutput>;
/** Alias for SchemaContentTypeValuesOutput */
export type SchemaContentTypeValuesOutput =
  | "application/json; serialization=Avro"
  | "application/json; serialization=json"
  | "text/plain; charset=utf-8"
  | "text/vnd.ms.protobuf";
/** Paged collection of Version items */
export type PagedVersionOutput = Paged<VersionOutput>;
