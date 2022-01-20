// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createClientLogger, AzureLogger, setLogLevel  } from "@azure/logger";

setLogLevel("verbose");
AzureLogger.log = (...args) => { console.log(...args); };
cosmosDiagnosticsLog(`Starting Cosmos Diagnostics ${new Date()}`);
/**
* The Cosmos Diagnostice used for all clients within the Cosmos package
*/
export const cosmosDiagnostics = createClientLogger("Cosmos Diagnostics");
var cosmosException: string[] = AzureLogger.log.bind(cosmosDiagnostics.verbose.log);

export function cosmosDiagnosticsLog(message: any, consoleRedirect: boolean = true){
  cosmosDiagnostics.verbose(message);
  cosmosException.push(AzureLogger.log.bind(AzureLogger.log));
  if(consoleRedirect){}
  AzureLogger.log = (...args) => { console.log(...args); };
}
export function cosmosDiagnosticsToSring(){
  return cosmosException;
}
