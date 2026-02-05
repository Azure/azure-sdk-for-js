// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AvailabilityData,
  TelemetryItem as Envelope,
  MessageData,
  PageViewData,
  TelemetryEventData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../generated/index.js";
import { KnownContextTagKeys, KnownSeverityLevel } from "../generated/index.js";
import {
  createTagsFromResource,
  hrTimeToDate,
  isSyntheticSource,
  serializeAttribute,
} from "./common.js";
import type { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import {
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE,
} from "@opentelemetry/semantic-conventions";
import { experimentalOpenTelemetryValues } from "../types.js";
import type { Measurements, Properties, Tags } from "../types.js";
import { httpSemanticValues, legacySemanticValues, MaxPropertyLengths } from "../types.js";
import type { Attributes } from "@opentelemetry/api";
import { diag } from "@opentelemetry/api";
import {
  ApplicationInsightsAvailabilityBaseType,
  ApplicationInsightsAvailabilityName,
  ApplicationInsightsBaseType,
  ApplicationInsightsCustomEventName,
  ApplicationInsightsEventBaseType,
  ApplicationInsightsEventName,
  ApplicationInsightsExceptionBaseType,
  ApplicationInsightsExceptionName,
  ApplicationInsightsMessageBaseType,
  ApplicationInsightsMessageName,
  ApplicationInsightsPageViewBaseType,
  ApplicationInsightsPageViewName,
  DEFAULT_BREEZE_DATA_VERSION,
  MicrosoftClientIp,
} from "./constants/applicationinsights.js";

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
  let baseData: TelemetryEventData | TelemetryExceptionData | MessageData;

  const exceptionStacktrace = log.attributes[ATTR_EXCEPTION_STACKTRACE];
  const exceptionType = log.attributes[ATTR_EXCEPTION_TYPE];
  const isExceptionType: boolean = !!(exceptionType && exceptionStacktrace) || false;
  const isMessageType: boolean =
    !log.attributes[ApplicationInsightsBaseType] &&
    !log.attributes[ApplicationInsightsCustomEventName] &&
    !exceptionType;
  if (isExceptionType) {
    const exceptionMessage = log.attributes[ATTR_EXCEPTION_MESSAGE];
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
      version: DEFAULT_BREEZE_DATA_VERSION,
    };
    baseData = exceptionData;
  } else if (log.attributes[ApplicationInsightsCustomEventName]) {
    name = ApplicationInsightsEventName;
    baseType = ApplicationInsightsEventBaseType;
    const eventData: TelemetryEventData = {
      name: String(log.attributes[ApplicationInsightsCustomEventName]),
      version: DEFAULT_BREEZE_DATA_VERSION,
    };
    baseData = eventData;
    measurements = getLegacyApplicationInsightsMeasurements(log);
  } else if (isMessageType) {
    name = ApplicationInsightsMessageName;
    baseType = ApplicationInsightsMessageBaseType;
    const messageData: MessageData = {
      message: serializeAttribute(log.body),
      severityLevel: String(getSeverity(log.severityNumber)),
      version: DEFAULT_BREEZE_DATA_VERSION,
    };
    baseData = messageData;
  } else {
    // If Legacy Application Insights Log
    baseType = String(log.attributes[ApplicationInsightsBaseType]);
    name = getLegacyApplicationInsightsName(log);
    const legacyBaseData = getLegacyApplicationInsightsBaseData(log);
    if (!legacyBaseData) {
      // Failed to parse log
      return;
    }
    measurements = getLegacyApplicationInsightsMeasurements(log);
    baseData = legacyBaseData;
  }
  // Truncate properties
  if (baseData && "message" in baseData && baseData.message) {
    baseData.message = String(baseData.message).substring(0, MaxPropertyLengths.FIFTEEN_BIT);
  }
  baseData.properties = properties;
  baseData.measurements = measurements;

  return {
    name,
    sampleRate,
    time,
    instrumentationKey,
    tags,
    version: DEFAULT_BREEZE_DATA_VERSION,
    data: {
      baseType,
      baseData: baseData,
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
  if (log.attributes[KnownContextTagKeys.AiOperationName]) {
    tags[KnownContextTagKeys.AiOperationName] = log.attributes[
      KnownContextTagKeys.AiOperationName
    ] as string;
  }
  if (isSyntheticSource(log.attributes as Attributes)) {
    tags[KnownContextTagKeys.AiOperationSyntheticSource] = "True";
  }

  // Set ai.location.ip from microsoft.client.ip if it exists
  const microsoftClientIp = log.attributes?.[MicrosoftClientIp];
  if (microsoftClientIp) {
    tags[KnownContextTagKeys.AiLocationIp] = String(microsoftClientIp);
  }

  // Map user ID attributes
  const attributes = log.attributes as Attributes;
  if (attributes[experimentalOpenTelemetryValues.ATTR_ENDUSER_ID]) {
    const endUserId = String(attributes[experimentalOpenTelemetryValues.ATTR_ENDUSER_ID]);
    if (endUserId && endUserId.length > 0) {
      tags[KnownContextTagKeys.AiUserAuthUserId] = endUserId;
    }
  }
  if (attributes[experimentalOpenTelemetryValues.ATTR_ENDUSER_PSEUDO_ID]) {
    const endUserPseudoId = String(
      attributes[experimentalOpenTelemetryValues.ATTR_ENDUSER_PSEUDO_ID],
    );
    if (endUserPseudoId && endUserPseudoId.length > 0) {
      tags[KnownContextTagKeys.AiUserId] = endUserPseudoId;
    }
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
          key.startsWith("microsoft") ||
          legacySemanticValues.includes(key) ||
          httpSemanticValues.includes(key as any) ||
          key === (KnownContextTagKeys.AiOperationName as string)
        )
      ) {
        properties[key] = serializeAttribute(log.attributes[key]);
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
  const body = log.body as Record<string, unknown> | undefined;
  if (body && "measurements" in body && body.measurements) {
    measurements = { ...(body.measurements as Measurements) };
  }
  return measurements;
}

function getLegacyApplicationInsightsBaseData(
  log: ReadableLogRecord,
):
  | AvailabilityData
  | TelemetryExceptionData
  | MessageData
  | PageViewData
  | TelemetryEventData
  | undefined {
  let baseData:
    | AvailabilityData
    | TelemetryExceptionData
    | MessageData
    | PageViewData
    | TelemetryEventData
    | undefined;
  if (log.body) {
    try {
      switch (log.attributes[ApplicationInsightsBaseType]) {
        case ApplicationInsightsAvailabilityBaseType:
          baseData = log.body as unknown as AvailabilityData;
          break;
        case ApplicationInsightsExceptionBaseType:
          baseData = log.body as unknown as TelemetryExceptionData;
          break;
        case ApplicationInsightsMessageBaseType:
          baseData = log.body as unknown as MessageData;
          if (typeof baseData.message === "object") {
            baseData.message = serializeAttribute(baseData.message);
          }
          break;
        case ApplicationInsightsPageViewBaseType:
          baseData = log.body as unknown as PageViewData;
          break;
        case ApplicationInsightsEventBaseType:
          baseData = log.body as unknown as TelemetryEventData;
          break;
      }
      if (baseData && baseData.version === undefined) {
        baseData.version = DEFAULT_BREEZE_DATA_VERSION;
      }
    } catch (err) {
      diag.error("AzureMonitorLogExporter failed to parse Application Insights Telemetry");
    }
  }
  return baseData;
}
