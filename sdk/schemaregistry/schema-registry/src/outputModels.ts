// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The list of strings with server paging support. */
export interface StringsListOutput {
  /** The collection of pageable items. */
  value: string[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The list of int32s with server paging support. */
export interface Int32sListOutput {
  /** The collection of pageable items. */
  value: number[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Alias for SchemaContentTypeValuesOutput */
export type SchemaContentTypeValuesOutput =
  | "application/json; serialization=Avro"
  | "application/json; serialization=Json"
  | "text/plain; charset=utf-8"
  | "text/vnd.ms.protobuf";
