// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The list of schema group names with server paging support. */
export interface SchemaGroupsOutput {
  /** The collection of pageable schema group name items. */
  Value: string[];
  /** The link to the next page of items */
  NextLink?: string;
}

/** The list of schema versions with server paging support. */
export interface SchemaVersionsOutput {
  /** The collection of schema version pageable items. */
  Value: number[];
  /** The link to the next page of items */
  NextLink?: string;
}

/** Alias for SchemaContentTypeValuesOutput */
export type SchemaContentTypeValuesOutput =
  | "application/json; serialization=Avro"
  | "application/json; serialization=Json"
  | "text/plain; charset=utf-8";
