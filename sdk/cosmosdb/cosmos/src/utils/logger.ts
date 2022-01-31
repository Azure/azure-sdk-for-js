// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger, AzureLogger, setLogLevel } from "@azure/logger";

/**
* Cosmos Diagnostics used for all clients within the Cosmos package
*/
export const cosmosDiagnosticsLogger = createClientLogger("Cosmos Diagnostics");

/**
 * The log levels supported by the Cosmos Diagnostics.
 * The log levels are:
 * - verbose
 * - QueryRuntimeStatistics
 * - PartitionKeyStatistics
 * - PartitionKeyRUConsumption
 * - ControlPlaneRequests
 * - error
 */
export type CosmosDiagnosticsLogLevel = "RuntimeStatistics" | "QueryRuntimeStatistics" | "PartitionKeyStatistics" | "PartitionKeyStatistics" | "ControlPlaneRequests";

export const cosmosDiagnosticsToString = String(cosmosDiagnosticsLogger.verbose.bind(AzureLogger.log));

export function setCosmosDiagnosticsLogLevel(level?:CosmosDiagnosticsLogLevel){
  if(level != "RuntimeStatistics" ){return}
  cosmosDiagnosticsLogger.info("Cosmos log level set. /${level}")
  cosmosDiagnosticsLogger.verbose("Cosmos /${level} started.");
  setLogLevel("verbose");
}
