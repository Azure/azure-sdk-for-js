// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

export interface ResourceOutput {
  readonly id: string;
  readonly name: string;
  description?: string;
  type: string;
}

/** Paged collection of Resource items */
export type ResourceListOutput = Paged<ResourceOutput>;
