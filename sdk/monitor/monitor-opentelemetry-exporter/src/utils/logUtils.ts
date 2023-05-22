// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  KnownSeverityLevel,
  MessageData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../generated";
import { createTagsFromResource } from "./common";
import { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import { SemanticAttributes } from "@opentelemetry/semantic-conventions";
import { Measurements, Properties, Tags } from "../types";
import { hrTimeToMilliseconds } from "@opentelemetry/core";

/**
 * Log to Azure envelope parsing.
 * @internal
 */
export function logToEnvelope(log: ReadableLogRecord, ikey: string): Envelope {
  const time = log.hrTime ? new Date(hrTimeToMilliseconds(log.hrTime)) : new Date();
  let sampleRate = 100;
  const instrumentationKey = ikey;
  const tags = createTagsFromLog(log);
  const [properties, measurements] = createPropertiesFromLog(log);
  let name: string;
  let baseType: "MessageData" | "TelemetryExceptionData";
  let baseData: MessageData | TelemetryExceptionData;
  // Get Exception attributes if available
  let exceptionType = log.attributes[SemanticAttributes.EXCEPTION_TYPE];
  if (exceptionType) {
    let exceptionMessage = log.attributes[SemanticAttributes.EXCEPTION_MESSAGE];
    let exceptionStacktrace = log.attributes[SemanticAttributes.EXCEPTION_STACKTRACE];
    name = "Microsoft.ApplicationInsights.Exception";
    baseType = "TelemetryExceptionData";
    let exceptionDetails: TelemetryExceptionDetails = {
      typeName: String(exceptionType),
      message: String(exceptionMessage),
      hasFullStack: exceptionStacktrace ? true : false,
      stack: String(exceptionStacktrace),
    };
    const exceptionData: TelemetryExceptionData = {
      exceptions: [exceptionDetails],
      severityLevel: String(getSeverity(log.severityNumber)),
      version: 2,
    };
    baseData = exceptionData;
  } else {
    name = "Microsoft.ApplicationInsights.Message";
    baseType = "MessageData";
    const messageData: MessageData = {
      message: String(log.body),
      severityLevel: String(getSeverity(log.severityNumber)),
      version: 2,
    };
    baseData = messageData;
  }
  return {
    name,
    sampleRate,
    time,
    instrumentationKey,
    tags,
    version: 1,
    data: {
      baseType,
      baseData: {
        ...baseData,
        properties,
        measurements,
      },
    },
  };
}

function createTagsFromLog(log: ReadableLogRecord): Tags {
  const tags: Tags = createTagsFromResource(log.resource);
  if (log.spanContext?.traceId) {
    tags[KnownContextTagKeys.AiOperationId] = log.spanContext.traceId;
  }
  if (log.spanContext?.spanId) {
    tags[KnownContextTagKeys.AiOperationParentId] = log.spanContext.spanId;
  }
  return tags;
}

function createPropertiesFromLog(log: ReadableLogRecord): [Properties, Measurements] {
  const measurements: Measurements = {};
  const properties: { [propertyName: string]: string } = {};
  if (log.attributes) {
    for (const key of Object.keys(log.attributes)) {
      // Avoid duplication ignoring fields already mapped.
      if (
        !(
          key.startsWith("_MS.") ||
          key == SemanticAttributes.EXCEPTION_TYPE ||
          key == SemanticAttributes.EXCEPTION_MESSAGE ||
          key == SemanticAttributes.EXCEPTION_STACKTRACE
        )
      ) {
        properties[key] = log.attributes[key] as string;
      }
    }
  }
  return [properties, measurements];
}

// https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/logs/data-model.md#field-severitynumber
function getSeverity(severityNumber: number | undefined): KnownSeverityLevel | undefined {
  if (severityNumber) {
    if (severityNumber > 0 && severityNumber < 9) {
      return KnownSeverityLevel.Verbose;
    } else if (severityNumber >= 9 && severityNumber < 13) {
      return KnownSeverityLevel.Information;
    } else if (severityNumber >= 13 && severityNumber < 17) {
      return KnownSeverityLevel.Warning;
    } else if (severityNumber >= 17 && severityNumber < 21) {
      return KnownSeverityLevel.Error;
    } else if (severityNumber >= 21 && severityNumber < 25) {
      return KnownSeverityLevel.Critical;
    }
  }
  return;
}
