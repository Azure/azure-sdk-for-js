// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** */
export interface Resource {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  description?: string;
  /** */
  type: string;
}

/** Paged collection of Resource items */
export interface CustomPage {
  /** The Resource items on this page */
  value: Resource[];
  /** The link to the next page of items */
  nextLink?: string;
}
