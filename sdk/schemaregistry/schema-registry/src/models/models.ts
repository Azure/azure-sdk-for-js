// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Paged collection of SchemaGroup items */
export interface CustomPage {
  /** The SchemaGroup items on this page */
  value: SchemaGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Schema Group resource. */
export interface SchemaGroup {
  /** Name of schema group. */
  readonly groupName: string;
}

/** Paged collection of Version items */
export interface CustomVersionPage {
  /** The Version items on this page */
  value: Version[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Schema versions resource. */
export interface Version {
  /** Version number of specific schema. */
  readonly schemaVersion: number;
}
