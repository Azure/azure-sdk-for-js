// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const _startTime = new Date().getTime();
const _defaultHeader: DiagnosticHeader = {
  cosmosdiagnostics: "Started Cosmos Diagnostics",
  diagnosticStartTime: new Date().toLocaleString(),
  durationInMs: new Date().getTime() - _startTime,
  activityId: "",
  requestCharge: 0,
  transportRequestTimeline: {},
  data: {},
};
const _diagnosticHeader: DiagnosticHeader[] = [];
/**
 * @internal
 */
export function setDiagnostics(message?: string | DiagnosticHeader) {
  if (_diagnosticHeader.length === 0) {
    setDiagnostics(_defaultHeader);
  }
  if (typeof message === "string") {
    _diagnosticHeader.push(parseDiagnosticHeader(message));
  }
}

function parseDiagnosticHeader(data: string): DiagnosticHeader {
  console.log(data);
  const header = {
    cosmosdiagnostics: "Started Cosmos Diagnostics",
    diagnosticStartTime: new Date().toLocaleString(),
    durationInMs: new Date().getTime() - _startTime,
    activityId: "",
    requestCharge: 0,
    transportRequestTimeline: {},
    data: data,
  };
  return header;
}
/**
 * @internal
 */
export function getdiagnosticsdurationMilliseconds(): number | undefined {
  if (_diagnosticHeader.length > 0) {
    return Number(_diagnosticHeader[_diagnosticHeader.length - 1].durationInMs);
  }
  return undefined;
}

/**
 * @internal
 */
export function getCosmosDiagnosticsToString(): string {
  if (_diagnosticHeader !== undefined) {
    return JSON.stringify(_diagnosticHeader);
  }
  setDiagnostics(_defaultHeader);
  return JSON.stringify(_diagnosticHeader);
}

export function getDiagnosticsRaw(): string {
  if (_diagnosticHeader.length > 0) {
    return JSON.stringify(
      _diagnosticHeader.map((diagnostic) => {
        return JSON.stringify(diagnostic.data);
      })
    );
  }
  setDiagnostics(_defaultHeader);
  return JSON.stringify(_diagnosticHeader);
}

export interface DiagnosticHeader {
  cosmosdiagnostics: string;
  diagnosticStartTime: string;
  durationInMs: number;
  activityId: string;
  requestCharge?: number;
  transportRequestTimeline?: any;
  data?: any;
}
