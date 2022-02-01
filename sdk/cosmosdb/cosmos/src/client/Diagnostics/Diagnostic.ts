// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { cosmosDiagnosticsLogger, setCosmosDiagnosticsLogLevel } from "../../utils/logger";

export function startCosmosDiagnostics(): void{
  logCosmosDiagnostics();
  setCosmosDiagnosticsLogLevel();
  cosmosDiagnosticsLogger.verbose.enabled = true;
  cosmosDiagnosticsLogger.verbose("Cosmos Diagnostics Started")
}

export function endCosmosDiagnostics(): void{
  cosmosDiagnosticsLogger.verbose("Cosmos Diagnostics Ended")
  cosmosDiagnosticsLogger.verbose.enabled = false;
}

export function logCosmosDiagnostics(): void{
cosmosDiagnosticsLogger.verbose.log = (...args: any) => { console.log(...args); };
};
