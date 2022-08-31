// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { ErrorBody, ErrorResponse } from "../request";
import {
  getCosmosDiagnosticsToString,
  getdiagnosticsdurationMilliseconds,
  getRegionsContacted,
  setDiagnostics,
} from "./Diagnostics";

export class CosmosException extends Error implements ErrorResponse {
  constructor(m?: any) {
    super(`${m}`);
    Object.setPrototypeOf(this, CosmosException.prototype);
    if (typeof m !== "undefined") {
      setDiagnostics(`${m}`);
    }
  }
  [key: string]: any;
  code?: number;
  substatus?: number;
  body?: ErrorBody;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMs?: number;
  retryAfterInMilliseconds?: number;
  name: string;
  message: string;
  stack?: string;
  getDiagnostics() {
    const diagnostic = getCosmosDiagnosticsToString();
    return diagnostic;
  }
  getDuration() {
    const duration = getdiagnosticsdurationMilliseconds();
    return duration;
  }
  getRegions() {
    const regions = getRegionsContacted();
    return regions;
  }
}
