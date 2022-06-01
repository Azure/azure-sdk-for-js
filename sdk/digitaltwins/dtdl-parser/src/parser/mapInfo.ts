// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ComplexSchemaInfo } from "./internal";
import { MapKeyInfo } from "./internal";
import { MapValueInfo } from "./internal";
export interface MapInfo extends ComplexSchemaInfo {
  entityKind: "map";
  mapKey?: MapKeyInfo;
  mapValue?: MapValueInfo;
}
