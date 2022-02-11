// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { EntityInfo } from "./internal";
export interface SchemaInfo extends EntityInfo {
  entityKind:
    | "array"
    | "boolean"
    | "date"
    | "datetime"
    | "double"
    | "duration"
    | "enum"
    | "float"
    | "integer"
    | "long"
    | "map"
    | "object"
    | "string"
    | "time";
}
