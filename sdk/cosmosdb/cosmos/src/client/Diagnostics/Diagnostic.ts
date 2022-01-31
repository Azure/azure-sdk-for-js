// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { cosmosDiagnosticsLogger, CosmosDiagnosticsLogLevel, setCosmosDiagnosticsLogLevel } from "../../utils/logger";

export function startCosmosDiagnostics({ level, toConsole }: { level: CosmosDiagnosticsLogLevel; toConsole?: true; }): void{
    if (toConsole) { logCosmosDiagnostics(); }
  setCosmosDiagnosticsLogLevel(level);
  cosmosDiagnosticsLogger.verbose.enabled = true;
  cosmosDiagnosticsLogger.verbose("Cosmos Diagnostics Started")
}

export function endCosmosDiagnostics(): void{
  cosmosDiagnosticsLogger.verbose("Cosmos Diagnostics Ended")
  cosmosDiagnosticsLogger.verbose.enabled = false;
}

export function logCosmosDiagnostics(): void{
cosmosDiagnosticsLogger.verbose.log = (...args) => { console.log(...args); };
};
