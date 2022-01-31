// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ComplexSchemaInfo } from "./internal";
import { EnumValueInfo } from "./internal";
import { PrimitiveSchemaInfo } from "./internal";
export interface EnumInfo extends ComplexSchemaInfo {
  entityKind: "enum";
  enumValues?: EnumValueInfo[];
  valueSchema?: PrimitiveSchemaInfo;
}
