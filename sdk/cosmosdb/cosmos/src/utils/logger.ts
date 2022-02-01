// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
* Cosmos Diagnostics used for all clients within the Cosmos package
*/
const cosmosDiagnostics = require('@azure/logger');
export const cosmosDiagnosticsLogger = cosmosDiagnostics.createClientLogger("Cosmos Diagnostics");

/**
 * The log levels supported by the Cosmos Diagnostics.
 * The log levels are:
 * - verbose
 * - DataPlaneRequests - not implemented
 * - QueryRuntimeStatistics - not implementedv
 * - PartitionKeyStatistics - not implemented
 * - ControlPlaneRequests - not implemented
 */
export function cosmosDiagnosticsToString(){
  cosmosDiagnosticsLogger.verbose.bind(cosmosDiagnostics)
  return String(cosmosDiagnosticsLogger.verbose.bind(cosmosDiagnostics));
}

export function setCosmosDiagnosticsLogLevel(){
  cosmosDiagnosticsLogger.verbose.bind(cosmosDiagnostics);
  cosmosDiagnostics.setLogLevel("verbose");
  cosmosDiagnostics.log = (...args: any) => { console.log(...args); };
  cosmosDiagnosticsLogger.verbose("Cosmos log level set. /${level}");

}
