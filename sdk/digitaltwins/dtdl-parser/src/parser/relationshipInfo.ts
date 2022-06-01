// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ContentInfo } from "./internal";
import { PropertyInfo } from "./internal";
import { InDTMI } from "./internal";
export interface RelationshipInfo extends ContentInfo {
  entityKind: "relationship";
  maxMultiplicity?: number | undefined;
  minMultiplicity?: number | undefined;
  properties?: PropertyInfo[];
  target?: string;
  writable?: boolean;
}
