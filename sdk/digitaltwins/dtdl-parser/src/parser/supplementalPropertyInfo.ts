// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ValueConstraint } from "./internal";
/**
 * Interface that provides information about a property that can be applied to a DTDL element that has a supplemental type.
 **/
export interface SupplementalPropertyInfo {
  type: string;
  isPlural: boolean;
  isOptional: boolean;
  minCount?: number;
  maxCount?: number;
  dictionaryKey?: string;
  instanceProperty?: string;
  valueConstraint?: ValueConstraint;
}
