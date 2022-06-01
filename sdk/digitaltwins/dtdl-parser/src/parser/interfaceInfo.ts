// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { EntityInfo } from "./internal";
import { ContentInfo } from "./internal";
import { ComplexSchemaInfo } from "./internal";
export interface InterfaceInfo extends EntityInfo {
  entityKind: "interface";
  contents?: { [value: string]: ContentInfo };
  extends?: InterfaceInfo[];
  schemas?: ComplexSchemaInfo[];
}
