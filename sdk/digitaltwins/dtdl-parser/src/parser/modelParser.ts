// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { DtmiResolver, ModelParsingOption } from "./internal";
import { SupplementalTypeCollection, ModelDict } from "./internal";
export interface ModelParser {
  dtmiResolver?: DtmiResolver;
  options: ModelParsingOption;
  maxDtdlVersion?: number;
  parse(jsonTexts: string[]): Promise<ModelDict>;

  getSupplementalTypeCollection(): SupplementalTypeCollection;
}
