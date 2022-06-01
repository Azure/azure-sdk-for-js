// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { ContentInfo } from "./internal";
import { CommandTypeInfo } from "./internal";
import { CommandPayloadInfo } from "./internal";
export interface CommandInfo extends ContentInfo {
  entityKind: "command";
  commandType?: CommandTypeInfo;
  request?: CommandPayloadInfo;
  response?: CommandPayloadInfo;
}
