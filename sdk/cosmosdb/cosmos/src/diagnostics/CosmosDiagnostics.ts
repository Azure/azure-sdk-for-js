// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getCosmosDiagnosticsToString,
  getdiagnosticsdurationMilliseconds,
  getRegionsContacted,
} from "./Diagnostics";

export class CosmosDiagnostics {
  /**
   * Regions contacted for this request.
   */
  getRegionsContacted() {
    return getRegionsContacted();
  }
  /**
   * 	Retrieves duration related to the completion of the request. This represents end to end duration of an operation including all the retries. This is meant for point operation only, for query please use toString() to get full query diagnostics.
   */
  getDuration() {
    return getdiagnosticsdurationMilliseconds();
  }
  /**
   * Retrieves Response Diagnostic String.
   */
  getCosmosDiagnostics(): string {
    console.log(getCosmosDiagnosticsToString());
    return getCosmosDiagnosticsToString();
  }
}
