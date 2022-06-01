// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { SupplementalPropertyInfo } from "./internal";
/**
 * Interface that provides information about a type is not materialized as a material class.
 **/
export interface SupplementalTypeInfo {
  contextId: string;
  type: string;
  isAbstract: boolean;
  parentType?: string;
  properties?: { [x: string]: SupplementalPropertyInfo };
  parentSupplementalType?: SupplementalTypeInfo;
}
