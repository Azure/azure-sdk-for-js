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
    case "NONE":
      // Map "NONE" to a threshold above every severity emitted by the console
      // instrumentation (its highest is `console.error` -> ERROR). Using a value
      // greater than all console severities ensures no console record passes the
      // `severityNumber < logSeverity` filter, so nothing is collected.
      severityNumber = SeverityNumber.FATAL4;
      break;
  }
  return severityNumber;
}
