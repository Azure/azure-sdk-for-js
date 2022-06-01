// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ContentInfo } from "./internal";
import { InterfaceInfo } from "./internal";
export interface ComponentInfo extends ContentInfo {
  entityKind: "component";
  schema?: InterfaceInfo;
}
