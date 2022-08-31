// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defaultLogger } from "../common/logger";

const _startTime = new Date().getTime();
const _defaultHeader: DiagnosticHeader = {
  diagnostics: "Cosmos Diagnostics Summary",
  diagnosticStartTime: new Date().toLocaleString(),
  durationInMs: new Date().getTime() - _startTime,
  activityId: "",
  data: ["Summary"],
  requestCharge: "0",
  transportRequestTimeline: {},
  contactedRegions: "",
};
const _diagnosticHeader: DiagnosticHeader = _defaultHeader;

/**
 * @internal
 */
export function setDiagnostics(message: string = ""): void {
  const _patternMatch = new RegExp(`[sS]tatusCode: [2-3]\d\d `);
  if (!_patternMatch.test(message)) {
    if (message || message !== undefined) {
      if (_diagnosticHeader || _diagnosticHeader !== undefined) {
        _diagnosticHeader.data.push(parseDiagnosticHeader(message ?? ""));
      }
    }
  }
}

/**
 * @internal
 */
function parseRequestCharge(data: string = "0"): string {
  const _patternMatch = new RegExp(`RequestCharge: \w+,`);
  if (_patternMatch.test(data)) {
    const requestCharge = data.match(_patternMatch);
    if (requestCharge || requestCharge !== undefined) {
      return (requestCharge ?? "").toString().replace("RequestCharge:", "").trim();
    }
  }
  return "0";
}

/**
 * @internal
 */
function parseActivityId(data: string = ""): string {
  const _patternMatch = new RegExp(
    `[aA]ctivityId: [a-zA-Z0-9]+[-][a-zA-Z0-9]+[-]+[a-zA-Z0-9]+[-]+[a-zA-Z0-9]+[-]+[a-zA-Z0-9]+`
  );
  if (_patternMatch.test(data) && typeof data === "string") {
    const activityId = data.match(_patternMatch);
    if (activityId || activityId !== undefined) {
      return (activityId ?? "").toString().replace(new RegExp("[aA]ctivityId:"), "").trim();
    }
  }
  return "";
}

/**
 * @internal
 */
function toString(diagnosticHeader: DiagnosticHeader): string {
  return JSON.stringify(diagnosticHeader);
}
/**
 * @internal
 */
function parseContactedRegions(data: string = ""): string {
  const _patternMatch = new RegExp(`Number of regions \w+:\w`);
  const contactedRegions = data.match(_patternMatch);
  return (contactedRegions ?? "0").toString().replace("TransportRequestTimeline:", "").trim();
}

/**
 * @internal
 */
function parseTransportRequestTimeline(data: string = ""): string {
  const _patternMatch = new RegExp(`TransportRequestTimeline: \{(?:[^{}]|(\{(?:[^{}]|())*\}))*\}`);
  const transportRequestTimeline = data.match(_patternMatch);
  return (transportRequestTimeline ?? "")
    .toString()
    .replace("TransportRequestTimeline:", "")
    .trim();
}

/**
 * @internal
 */
function parseDiagnosticHeader(data: string): string {
  try {
    const header: DiagnosticHeader = {
      diagnostics: `Cosmos Diagnostics at ${_startTime}`,
      diagnosticStartTime: new Date().toLocaleString(),
      durationInMs: new Date().getTime() - _startTime,
      activityId: parseActivityId(data),
      data: [""],
      requestCharge: parseRequestCharge(data),
      transportRequestTimeline: parseTransportRequestTimeline(data),
      contactedRegions: parseContactedRegions(data),
    };

    header.data.push(data);
    return toString(header);
  } catch (e) {
    defaultLogger.warning(e);
  }
  return "";
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
  return toString(_diagnosticHeader);
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
  diagnostics: string;
  diagnosticStartTime: string;
  durationInMs: number;
  activityId: string;
  data: [string];
  requestCharge?: string;
  transportRequestTimeline?: any;
  contactedRegions?: string;
}
