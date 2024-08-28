// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SeverityNumber } from "@opentelemetry/api-logs";

/**
 * Convert log level to severity number.
 * @internal
 */
export function logLevelToSeverityNumber(logLevel: string): SeverityNumber {
  let severityNumber = SeverityNumber.UNSPECIFIED;
  switch (logLevel) {
    case "ALL":
      severityNumber = SeverityNumber.UNSPECIFIED;
      break;
    case "DEBUG":
      severityNumber = SeverityNumber.DEBUG;
      break;
    case "ERROR":
      severityNumber = SeverityNumber.ERROR;
      break;
    case "INFO":
      severityNumber = SeverityNumber.INFO;
      break;
    case "VERBOSE":
      severityNumber = SeverityNumber.TRACE;
      break;
    case "WARN":
      severityNumber = SeverityNumber.WARN;
      break;
  }
  return severityNumber;
}
