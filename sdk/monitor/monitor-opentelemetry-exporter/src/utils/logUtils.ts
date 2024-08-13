// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AvailabilityData,
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  KnownSeverityLevel,
  MessageData,
  MonitorDomain,
  PageViewData,
  TelemetryEventData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../generated";
import { createTagsFromResource, hrTimeToDate } from "./common";
import { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import {
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_EXCEPTION_TYPE,
} from "@opentelemetry/semantic-conventions";
import { Measurements, Properties, Tags } from "../types";
import { diag } from "@opentelemetry/api";
import {
  ApplicationInsightsAvailabilityBaseType,
  ApplicationInsightsAvailabilityName,
  ApplicationInsightsBaseType,
  ApplicationInsightsEventBaseType,
  ApplicationInsightsEventName,
  ApplicationInsightsExceptionBaseType,
  ApplicationInsightsExceptionName,
  ApplicationInsightsMessageBaseType,
  ApplicationInsightsMessageName,
  ApplicationInsightsPageViewBaseType,
  ApplicationInsightsPageViewName,
} from "./constants/applicationinsights";

/**
 * Log to Azure envelope parsing.
 * @internal
 */
export function logToEnvelope(log: ReadableLogRecord, ikey: string): Envelope | undefined {
  const time = hrTimeToDate(log.hrTime);
  const sampleRate = 100;
  const instrumentationKey = ikey;
  const tags = createTagsFromLog(log);
  // eslint-disable-next-line prefer-const
  let [properties, measurements] = createPropertiesFromLog(log);
  let name: string;
  let baseType: string;
  let baseData: MonitorDomain;

  if (!log.attributes[ApplicationInsightsBaseType]) {
    // Get Exception attributes if available
    const exceptionType = log.attributes[SEMATTRS_EXCEPTION_TYPE];
    if (exceptionType) {
      const exceptionMessage = log.attributes[SEMATTRS_EXCEPTION_MESSAGE];
      const exceptionStacktrace = log.attributes[SEMATTRS_EXCEPTION_STACKTRACE];
      name = ApplicationInsightsExceptionName;
      baseType = ApplicationInsightsExceptionBaseType;
      const exceptionDetails: TelemetryExceptionDetails = {
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
      name = ApplicationInsightsMessageName;
      baseType = ApplicationInsightsMessageBaseType;
      const messageData: MessageData = {
        message: String(log.body),
        severityLevel: String(getSeverity(log.severityNumber)),
        version: 2,
      };
      baseData = messageData;
    }
  } else {
    // If Legacy Application Insights Log
    baseType = String(log.attributes[ApplicationInsightsBaseType]);
    name = getLegacyApplicationInsightsName(log);
    baseData = getLegacyApplicationInsightsBaseData(log);
    measurements = getLegacyApplicationInsightsMeasurements(log);
    if (!baseData) {
      // Failed to parse log
      return;
    }
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
          key === SEMATTRS_EXCEPTION_TYPE ||
          key === SEMATTRS_EXCEPTION_MESSAGE ||
          key === SEMATTRS_EXCEPTION_STACKTRACE
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

function getLegacyApplicationInsightsName(log: ReadableLogRecord): string {
  let name = "";
  switch (log.attributes[ApplicationInsightsBaseType]) {
    case ApplicationInsightsAvailabilityBaseType:
      name = ApplicationInsightsAvailabilityName;
      break;
    case ApplicationInsightsExceptionBaseType:
      name = ApplicationInsightsExceptionName;
      break;
    case ApplicationInsightsMessageBaseType:
      name = ApplicationInsightsMessageName;
      break;
    case ApplicationInsightsPageViewBaseType:
      name = ApplicationInsightsPageViewName;
      break;
    case ApplicationInsightsEventBaseType:
      name = ApplicationInsightsEventName;
      break;
  }
  return name;
}

function getLegacyApplicationInsightsMeasurements(log: ReadableLogRecord): Measurements {
  let measurements: Measurements = {};
  if ((log.body as MonitorDomain)?.measurements) {
    measurements = { ...(log.body as MonitorDomain).measurements };
  }
  return measurements;
}

function getLegacyApplicationInsightsBaseData(log: ReadableLogRecord): MonitorDomain {
  let baseData: MonitorDomain = {
    version: 2,
  };
  if (log.body) {
    try {
      switch (log.attributes[ApplicationInsightsBaseType]) {
        case ApplicationInsightsAvailabilityBaseType:
          baseData = log.body as AvailabilityData;
          break;
        case ApplicationInsightsExceptionBaseType:
          baseData = log.body as TelemetryExceptionData;
          break;
        case ApplicationInsightsMessageBaseType:
          baseData = log.body as MessageData;
          break;
        case ApplicationInsightsPageViewBaseType:
          baseData = log.body as PageViewData;
          break;
        case ApplicationInsightsEventBaseType:
          baseData = log.body as TelemetryEventData;
          break;
      }
      if (typeof baseData?.message === "object") {
        baseData.message = JSON.stringify(baseData.message);
      }
    } catch (err) {
      diag.error("AzureMonitorLogExporter failed to parse Application Insights Telemetry");
    }
  }
  return baseData;
}
