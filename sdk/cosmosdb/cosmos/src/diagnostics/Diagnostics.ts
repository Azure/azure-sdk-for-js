// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const _startTime = new Date().getTime();
export const defaultHeaders: DiagnosticHeaders = {
  cosmosdiagnostics: "Started Cosmos Diagnostics",
  diagnosticStartTime: new Date().toLocaleString(),
  durationInMs: new Date().getTime() - _startTime,
};
const _diagnosticHeaders: DiagnosticHeaders[] = [defaultHeaders];
/**
 * @internal
 */
export function setDiagnostics(message: DiagnosticHeaders | string) {
  if (_diagnosticHeaders.length === 0) {
    setDiagnostics(_diagnosticHeaders);
  }
  _diagnosticHeaders.push({
    diagnosticsthread: _diagnosticHeaders.length.toString(),
    durationInMs: new Date().getTime() - _startTime,
    data: message,
  });
}
/**
 * @internal
 */
export function getdiagnosticsdurationMilliseconds(): number | undefined {
  if (_diagnosticHeaders.length > 0) {
    return Number(_diagnosticHeaders[_diagnosticHeaders.length - 1].durationInMs);
  }
  return undefined;
}

/**
 * @internal
 */
export function getCosmosDiagnosticsToString(): string {
  if (_diagnosticHeaders !== undefined) {
    return JSON.stringify(_diagnosticHeaders);
  }
  setDiagnostics(defaultHeaders);
  return JSON.stringify(_diagnosticHeaders);
}

export function getDiagnosticsRaw(): string {
  if (_diagnosticHeaders.length > 0) {
    return JSON.stringify(
      _diagnosticHeaders.map((diagnostic) => {
        return JSON.stringify(diagnostic.excpetion);
      })
    );
  }
  setDiagnostics(defaultHeaders);
  return JSON.stringify(_diagnosticHeaders);
}

export interface DiagnosticHeaders {
  [key: string]: string | boolean | number | any;
}
