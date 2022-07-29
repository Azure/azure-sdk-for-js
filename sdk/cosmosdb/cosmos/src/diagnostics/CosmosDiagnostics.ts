// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getCosmosDiagnosticsToString, getdiagnosticsdurationMilliseconds } from "./Diagnostics"; //static?
export class CosmosDiagnostic {
  /**
   * Regions contacted for this request.
   */
  getRegionsContacted() {}
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
    return getCosmosDiagnosticsToString();
  }
}
