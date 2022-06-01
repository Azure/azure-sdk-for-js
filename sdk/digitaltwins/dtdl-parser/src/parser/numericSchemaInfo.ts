// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { PrimitiveSchemaInfo } from "./internal";
export interface NumericSchemaInfo extends PrimitiveSchemaInfo {
  entityKind: "double" | "float" | "integer" | "long";
}
