// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// /**
//  * Cosmos Diagnostics for this package.
//  *
//  * @internal

import { CosmosException } from "./CosmosException";

export function diagnosticToString(): string {
  return JSON.stringify(cosmosException);
};

const _startTime = new Date().getTime();

const startDiagnostics: CosmosException = {
"cosmosdiagnostics": "Started Cosmos Diagnostics",
"diagnosticStartTime": new Date().toLocaleString(),
"durationInMs": (new Date().getTime() - _startTime)
}

const cosmosException: CosmosException[] = [startDiagnostics];

export function recordDiagnostics(message: CosmosException | string) {
  if(cosmosException.length === 0){
recordDiagnostics(startDiagnostics);
  }
  cosmosException.push({"diagnosticsthread": cosmosException.length.toString(),
  "excpetion": message,
  "durationInMs": (new Date().getTime() - _startTime)},
  )}; 
export function getdiagnosticsdurationMilliseconds() {
return (cosmosException[ cosmosException.length - 1 ]);
}
