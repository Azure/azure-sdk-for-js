// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SeverityNumber } from "@opentelemetry/api-logs";

/**
 * Checks whether the instrumentation logging level disables collection.
 * @internal
 */
export function isLogCollectionDisabled(): boolean {
  return process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL === "NONE";
}

/**
 * Checks whether console log collection is disabled. An explicitly configured
 * `logSeverity` always takes precedence over the
 * `APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL` environment variable,
 * including when that variable is set to `NONE`.
 * @internal
 */
export function isConsoleCollectionDisabled(logSeverity?: SeverityNumber): boolean {
  return isLogCollectionDisabled() && logSeverity === undefined;
}

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
