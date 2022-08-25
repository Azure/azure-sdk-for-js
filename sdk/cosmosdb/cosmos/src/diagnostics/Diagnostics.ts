// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const _startTime = new Date().getTime();
const _defaultHeader: DiagnosticHeader = {
  cosmosdiagnostics: "Cosmos Diagnostics Summary",
  diagnosticStartTime: new Date().toLocaleString(),
  durationInMs: new Date().getTime() - _startTime,
  activityId: "",
  requestCharge: "0",
  transportRequestTimeline: {},
  contactedRegions: "",
};
const _diagnosticHeader: DiagnosticHeader = _defaultHeader;

/**
 * @internal
 */
export function setDiagnostics(message?: string | DiagnosticHeader) {
  if (!_diagnosticHeader.data) {
    _diagnosticHeader.data = [_defaultHeader];
  }
  if (typeof message === "string") {
    _diagnosticHeader.data.push(parseDiagnosticHeader(message));
  }
}

/**
 * @internal
 */
function parseRequestCharge(data: string): string {
  const _patternMatch = new RegExp(`RequestCharge: \w+,`);
  const requestCharge = data.match(_patternMatch);
  if (requestCharge) {
    return requestCharge.toString().replace("RequestCharge:", "").trim();
  }
  return "0";
}

/**
 * @internal
 */
function parseActivityId(data: string): string {
  const _patternMatch = new RegExp(
    `ActivityId: [a-zA-Z0-9]+[-][a-zA-Z0-9]+[-]+[a-zA-Z0-9]+[-]+[a-zA-Z0-9]+[-]+[a-zA-Z0-9]+`
  );
  const activityId = data.match(_patternMatch);
  if (activityId) {
    return activityId.toString().replace("ActivityId:", "").trim();
  }
  return "";
}

/**
 * @internal
 */
function parseContactedRegions(data: string): string {
  const _patternMatch = new RegExp(`Number of regions \w+:\w`);
  if (_patternMatch.test(data)) {
    const contactedRegions = data.match(_patternMatch);
    if (contactedRegions) {
      return contactedRegions.toString().trim();
    }
  }
  return "";
}

/**
 * @internal
 */
function parseTransportRequestTimeline(data: string): string {
  const _patternMatch = new RegExp(`TransportRequestTimeline: \{(?:[^{}]|(\{(?:[^{}]|())*\}))*\}`);

  if (_patternMatch.test(data)) {
    const transportRequestTimeline = data.match(_patternMatch);
    if (transportRequestTimeline) {
      return transportRequestTimeline.toString().replace("TransportRequestTimeline:", "").trim();
    }
  }
  return "";
}

/**
 * @internal
 */
function parseDiagnosticHeader(data: string): DiagnosticHeader {
  const header: DiagnosticHeader = {
    cosmosdiagnostics: "Started Cosmos Diagnostics",
    diagnosticStartTime: new Date().toLocaleString(),
    durationInMs: new Date().getTime() - _startTime,
    activityId: parseActivityId(data), //parseDiagnosticMessage(data),
    requestCharge: parseRequestCharge(data),
    transportRequestTimeline: parseTransportRequestTimeline(data),
    contactedRegions: parseContactedRegions(data),
  };
  if (header.data) {
    header.data.push(parseDiagnosticHeader(data));
  }
  return header;
}

/*
 * @internal
 */
export function getdiagnosticsdurationMilliseconds(): number {
  if (_diagnosticHeader.durationInMs) {
    return _diagnosticHeader.durationInMs;
  }
  return 0;
}

/**
 * @internal
 */
export function getCosmosDiagnosticsToString(): string {
  if (_diagnosticHeader) {
    return String(_diagnosticHeader);
  }
  setDiagnostics(_defaultHeader);
  return String(_diagnosticHeader);
}

/**
 * @internal
 */
export function getRegionsContacted(): string {
  if (_diagnosticHeader.contactedRegions !== undefined) {
    return _diagnosticHeader.contactedRegions.toString();
  }
  return "";
}

export interface DiagnosticHeader {
  cosmosdiagnostics: string;
  diagnosticStartTime: string;
  durationInMs: number;
  activityId: string;
  requestCharge?: string;
  transportRequestTimeline?: any;
  contactedRegions?: string;
  data?: [DiagnosticHeader];
}
