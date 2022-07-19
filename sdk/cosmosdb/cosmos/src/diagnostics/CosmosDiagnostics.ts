// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// /**
//  * Cosmos Diagnostics for this package.
//  *
//  * @internal

import { jsonStringifyAndEscapeNonASCII } from "../common";
import { DiagnosticSpan } from "./CosmosException";

export function getCosmosDiagnostics(): string {
  return jsonStringifyAndEscapeNonASCII(_diagnosticsSpan);
};

const _startTime = new Date().getTime();

const _root: DiagnosticSpan  = {
"cosmosdiagnostics": "Started Cosmos Diagnostics",
"diagnosticStartTime": new Date().toLocaleString(),
"durationInMs": (new Date().getTime() - _startTime)
}

const _diagnosticsSpan: DiagnosticSpan[] = [_root];

export function recordDiagnostics(message: DiagnosticSpan | string) {
  if(_diagnosticsSpan.length === 0){
recordDiagnostics(_diagnosticsSpan);
  }
  _diagnosticsSpan.push({"diagnosticsthread": _diagnosticsSpan.length.toString(),
  "excpetion": message,
  "durationInMs": (new Date().getTime() - _startTime)},
  )}; 
export function getdiagnosticsdurationMilliseconds() {
return (_diagnosticsSpan[ _diagnosticsSpan.length - 1 ]);
}
