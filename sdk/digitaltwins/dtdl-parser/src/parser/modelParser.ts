// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

export type GetModelsFunctionType = (
  dtmis: string | string[],
  options?: unknown
) => Promise<{ [dtmi: string]: unknown }>;

import { SupplementalTypeCollection, ModelDict, ModelParsingOption } from "./internal";
export interface ModelParser {
  getModels?: GetModelsFunctionType;
  options: ModelParsingOption;
  maxDtdlVersion?: number;
  parse(jsonTexts: string[]): Promise<ModelDict>;

  getSupplementalTypeCollection(): SupplementalTypeCollection;
}
