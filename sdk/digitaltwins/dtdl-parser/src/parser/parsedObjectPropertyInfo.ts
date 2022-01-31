// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { InDTMI } from "./internal";
import { EntityKinds } from "./internal";
export interface ParsedObjectPropertyInfo {
  expectedKinds?: EntityKinds[];
  // codegen-outline-begin fields
  elementId: string;
  propertyName: string;
  referencedElementId: string;
  keyProperty?: string;
  allowedVersions?: Set<number>;
  badTypeCauseFormat?: string;
  badTypeActionFormat?: string;
  // codegen-outline-end
}
