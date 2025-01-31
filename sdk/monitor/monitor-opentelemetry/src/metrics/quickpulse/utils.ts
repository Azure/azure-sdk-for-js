// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import type { LogRecord } from "@opentelemetry/sdk-logs";
import type {
  DocumentIngress,
  Exception,
  KeyValuePairString,
  MetricPoint,
  MonitoringDataPoint,
  RemoteDependency,
  /* eslint-disable-next-line @typescript-eslint/no-redeclare */
  Request,
  Trace,
  CollectionConfigurationError,
} from "../../generated/index.js";
import { KnownDocumentType } from "../../generated/index.js";
import type { Attributes } from "@opentelemetry/api";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import {
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_SCHEME,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_TARGET,
  SEMATTRS_HTTP_URL,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_PEER_PORT,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMRESATTRS_TELEMETRY_SDK_VERSION,
  SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_DB_SYSTEM,
  SEMATTRS_RPC_SYSTEM,
  DBSYSTEMVALUES_MONGODB,
  DBSYSTEMVALUES_MYSQL,
  DBSYSTEMVALUES_POSTGRESQL,
  DBSYSTEMVALUES_REDIS,
  SEMATTRS_DB_NAME,
  SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_STATEMENT,
} from "@opentelemetry/semantic-conventions";
import { SDK_INFO, hrTimeToMilliseconds } from "@opentelemetry/core";
import type { Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import { DataPointType } from "@opentelemetry/sdk-metrics";
import {
  AZURE_MONITOR_AUTO_ATTACH,
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  AZURE_MONITOR_PREFIX,
  AttachTypePrefix,
} from "../../types.js";
import type { RequestData, DependencyData, ExceptionData, TraceData, TelemetryData } from "./types.js";
import {
  QuickPulseMetricNames,
  QuickPulseOpenTelemetryMetricNames,
  DependencyTypes,
} from "./types.js";
import { getOsPrefix } from "../../utils/common.js";
import { getResourceProvider } from "../../utils/common.js";
import type { LogAttributes } from "@opentelemetry/api-logs";
import { getDependencyTarget, isSqlDB, isExceptionTelemetry } from "../utils.js";
import { Logger } from "../../shared/logging/index.js";

/** Get the internal SDK version */
export function getSdkVersion(): string {
  const { nodeVersion } = process.versions;
  const opentelemetryVersion = SDK_INFO[SEMRESATTRS_TELEMETRY_SDK_VERSION];
  const version = `ext${AZURE_MONITOR_OPENTELEMETRY_VERSION}`;
  const internalSdkVersion = `${process.env[AZURE_MONITOR_PREFIX] ?? ""}node${nodeVersion}:otel${opentelemetryVersion}:${version}`;
  return internalSdkVersion;
}

// eslint-disable-next-line tsdoc/syntax
/** Set the version prefix to a string in the format "{ResourceProvider}{OS}m_ */
export function setSdkPrefix(): void {
  if (!process.env[AZURE_MONITOR_PREFIX]) {
    const prefixAttachType: string =
      process.env[AZURE_MONITOR_AUTO_ATTACH] === "true"
        ? AttachTypePrefix.INTEGRATED_AUTO
        : AttachTypePrefix.MANUAL;
    process.env[AZURE_MONITOR_PREFIX] =
      `${getResourceProvider()}${getOsPrefix()}${prefixAttachType}_`;
  }
}

export function resourceMetricsToQuickpulseDataPoint(
  metrics: ResourceMetrics,
  baseMonitoringDataPoint: MonitoringDataPoint,
  documents: DocumentIngress[],
  errors: CollectionConfigurationError[],
  derivedMetricValues: Map<string, number>,
): MonitoringDataPoint[] {
  const metricPoints: MetricPoint[] = [];
  metrics.scopeMetrics.forEach((scopeMetric) => {
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        const metricPoint: MetricPoint = {
          weight: 1,
          name: "",
          value: 0,
        };

        // Update name to expected value in Quickpulse, needed because those names are invalid in OTel
        switch (metric.descriptor.name) {
          case QuickPulseOpenTelemetryMetricNames.PHYSICAL_BYTES:
            metricPoint.name = QuickPulseMetricNames.PHYSICAL_BYTES;
            break;
          case QuickPulseOpenTelemetryMetricNames.DEPENDENCY_DURATION:
            metricPoint.name = QuickPulseMetricNames.DEPENDENCY_DURATION;
            break;
          case QuickPulseOpenTelemetryMetricNames.DEPENDENCY_FAILURE_RATE:
            metricPoint.name = QuickPulseMetricNames.DEPENDENCY_FAILURE_RATE;
            break;
          case QuickPulseOpenTelemetryMetricNames.DEPENDENCY_RATE:
            metricPoint.name = QuickPulseMetricNames.DEPENDENCY_RATE;
            break;
          case QuickPulseOpenTelemetryMetricNames.EXCEPTION_RATE:
            metricPoint.name = QuickPulseMetricNames.EXCEPTION_RATE;
            break;
          case QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME_NORMALIZED:
            metricPoint.name = QuickPulseMetricNames.PROCESSOR_TIME_NORMALIZED;
            break;
          case QuickPulseOpenTelemetryMetricNames.REQUEST_DURATION:
            metricPoint.name = QuickPulseMetricNames.REQUEST_DURATION;
            break;
          case QuickPulseOpenTelemetryMetricNames.REQUEST_FAILURE_RATE:
            metricPoint.name = QuickPulseMetricNames.REQUEST_FAILURE_RATE;
            break;
          case QuickPulseOpenTelemetryMetricNames.REQUEST_RATE:
            metricPoint.name = QuickPulseMetricNames.REQUEST_RATE;
            break;
          default:
            metricPoint.name = metric.descriptor.name;
        }

        if (
          metric.dataPointType === DataPointType.SUM ||
          metric.dataPointType === DataPointType.GAUGE
        ) {
          metricPoint.value = dataPoint.value as number;
        } else {
          metricPoint.value = (dataPoint.value as Histogram).sum || 0;
        }
        metricPoints.push(metricPoint);

        // TODO: remove the metric points with the old metric names after
        // UI side has done their changes to support the new names.
        if (
          metricPoint.name === QuickPulseMetricNames.PHYSICAL_BYTES ||
          metricPoint.name === QuickPulseMetricNames.PROCESSOR_TIME_NORMALIZED
        ) {
          const oldMetricPoint: MetricPoint = {
            weight: 1,
            name:
              metricPoint.name === QuickPulseMetricNames.PHYSICAL_BYTES
                ? QuickPulseMetricNames.COMMITTED_BYTES
                : QuickPulseMetricNames.PROCESSOR_TIME,
            value: dataPoint.value as number,
          };
          metricPoints.push(oldMetricPoint);
        }
      });
    });
  });

  derivedMetricValues.forEach((value, id) => {
    const metricPoint: MetricPoint = {
      weight: 1,
      name: id,
      value: value,
    };
    metricPoints.push(metricPoint);
  });

  const quickpulseDataPoint: MonitoringDataPoint = {
    ...baseMonitoringDataPoint,
    timestamp: new Date(),
    metrics: metricPoints,
    documents: documents,
    collectionConfigurationErrors: errors,
  };
  return [quickpulseDataPoint];
}

function getIso8601Duration(milliseconds: number): string {
  const seconds = milliseconds / 1000;
  return `PT${seconds}S`;
}

export function getSpanData(span: ReadableSpan): RequestData | DependencyData {
  if (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) {
    // request
    return getRequestData(span);
  } else {
    // dependency
    return getDependencyData(span);
  }
}

export function getSpanExceptionColumns(
  eventAttributes: Attributes,
  spanAttributes: Attributes,
): ExceptionData {
  const exceptionData: ExceptionData = {
    Message: eventAttributes[SEMATTRS_EXCEPTION_MESSAGE] as string,
    StackTrace: eventAttributes[SEMATTRS_EXCEPTION_STACKTRACE] as string,
    CustomDimensions: createCustomDimsFromAttributes(spanAttributes),
  };
  return exceptionData;
}

// A slightly modified version of createRequestData from spanUtils in exporter
function getRequestData(span: ReadableSpan): RequestData {
  const requestData: RequestData = {
    Url: "",
    Duration: hrTimeToMilliseconds(span.duration),
    ResponseCode: 0,
    Success: false,
    Name: span.name || "",
    CustomDimensions: createCustomDimsFromAttributes(span.attributes),
  };

  const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
  const grpcStatusCode = span.attributes[SEMATTRS_RPC_GRPC_STATUS_CODE];
  if (httpMethod) {
    requestData.Url = getUrl(span.attributes);
    if (URL.canParse(requestData.Url)) {
      const urlObj = new URL(requestData.Url);
      requestData.Name = `${httpMethod} ${urlObj.pathname}`;
    } else {
      Logger.getInstance().info("Request data sent to live metrics has no valid URL field.");
    }
    const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
    if (httpStatusCode) {
      requestData.ResponseCode = Number(httpStatusCode);
    }
  } else if (grpcStatusCode) {
    requestData.ResponseCode = Number(grpcStatusCode);
  }
  requestData.Success = span.status.code !== SpanStatusCode.ERROR && requestData.ResponseCode < 400;
  return requestData;
}

// A slightly modified version of createDependencyData from spanUtils in exporter
function getDependencyData(span: ReadableSpan): DependencyData {
  const dependencyData: DependencyData = {
    Target: "",
    Duration: hrTimeToMilliseconds(span.duration),
    Success: span.status.code !== SpanStatusCode.ERROR,
    Name: span.name,
    ResultCode: 0,
    Type: "",
    Data: "",
    CustomDimensions: createCustomDimsFromAttributes(span.attributes),
  };

  if (span.kind === SpanKind.PRODUCER) {
    dependencyData.Type = DependencyTypes.QueueMessage;
  }
  if (span.kind === SpanKind.INTERNAL && span.parentSpanId) {
    dependencyData.Type = DependencyTypes.InProc;
  }

  const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
  const dbSystem = span.attributes[SEMATTRS_DB_SYSTEM];
  const rpcSystem = span.attributes[SEMATTRS_RPC_SYSTEM];
  // HTTP Dependency
  if (httpMethod) {
    const httpUrl = span.attributes[SEMATTRS_HTTP_URL];
    if (httpUrl) {
      if (URL.canParse(String(httpUrl))) {
        const dependencyUrl = new URL(String(httpUrl));
        dependencyData.Name = `${httpMethod} ${dependencyUrl.pathname}`;
      } else {
        Logger.getInstance().info("Dependency data sent to live metrics has no valid URL field.");
      }
    }
    dependencyData.Type = DependencyTypes.Http;
    dependencyData.Data = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
    if (httpStatusCode) {
      dependencyData.ResultCode = Number(httpStatusCode);
    }
    let target = getDependencyTarget(span.attributes);
    if (target) {
      try {
        // Remove default port
        const portRegex = new RegExp(/(https?)(:\/\/.*)(:\d+)(\S*)/);
        const res = portRegex.exec(target);
        if (res !== null) {
          const protocol = res[1];
          const port = res[3];
          if (
            (protocol === "https" && port === ":443") ||
            (protocol === "http" && port === ":80")
          ) {
            // Drop port
            target = res[1] + res[2] + res[4];
          }
        }
      } catch (ex: any) {
        /* no-op */
      }
      dependencyData.Target = `${target}`;
    }
  }
  // DB Dependency
  else if (dbSystem) {
    // TODO: Remove special logic when Azure UX supports OpenTelemetry dbSystem
    if (String(dbSystem) === DBSYSTEMVALUES_MYSQL) {
      dependencyData.Type = DependencyTypes.mysql;
    } else if (String(dbSystem) === DBSYSTEMVALUES_POSTGRESQL) {
      dependencyData.Type = DependencyTypes.postgresql;
    } else if (String(dbSystem) === DBSYSTEMVALUES_MONGODB) {
      dependencyData.Type = DependencyTypes.mongodb;
    } else if (String(dbSystem) === DBSYSTEMVALUES_REDIS) {
      dependencyData.Type = DependencyTypes.redis;
    } else if (isSqlDB(String(dbSystem))) {
      dependencyData.Type = DependencyTypes.Sql;
    } else {
      dependencyData.Type = String(dbSystem);
    }
    const dbStatement = span.attributes[SEMATTRS_DB_STATEMENT];
    const dbOperation = span.attributes[SEMATTRS_DB_OPERATION];
    if (dbStatement) {
      dependencyData.Data = String(dbStatement);
    } else if (dbOperation) {
      dependencyData.Data = String(dbOperation);
    }
    const target = getDependencyTarget(span.attributes);
    const dbName = span.attributes[SEMATTRS_DB_NAME];
    if (target) {
      dependencyData.Target = dbName ? `${target}|${dbName}` : `${target}`;
    } else {
      dependencyData.Target = dbName ? `${dbName}` : `${dbSystem}`;
    }
  }

  // grpc Dependency
  else if (rpcSystem) {
    if (rpcSystem === DependencyTypes.Wcf) {
      dependencyData.Type = DependencyTypes.Wcf;
    } else {
      dependencyData.Type = DependencyTypes.Grpc;
    }
    const grpcStatusCode = span.attributes[SEMATTRS_RPC_GRPC_STATUS_CODE];
    if (grpcStatusCode) {
      dependencyData.ResultCode = Number(grpcStatusCode);
    }
    const target = getDependencyTarget(span.attributes);
    if (target) {
      dependencyData.Target = `${target}`;
    } else if (rpcSystem) {
      dependencyData.Target = String(rpcSystem);
    }
  }
  return dependencyData;
}

export function getLogData(log: LogRecord): ExceptionData | TraceData {
  const customDims = createCustomDimsFromAttributes(log.attributes);
  if (isExceptionTelemetry(log)) {
    return {
      Message: String(log.attributes[SEMATTRS_EXCEPTION_MESSAGE]),
      StackTrace: String(log.attributes[SEMATTRS_EXCEPTION_STACKTRACE]),
      CustomDimensions: customDims,
    };
  } else {
    return {
      Message: String(log.body),
      CustomDimensions: customDims,
    };
  }
}

export function getLogDocument(data: TelemetryData, exceptionType?: string): Trace | Exception {
  if (isExceptionData(data) && exceptionType) {
    return {
      documentType: KnownDocumentType.Exception,
      exceptionMessage: data.Message,
      exceptionType: exceptionType,
      properties: mapToKeyValuePairList(data.CustomDimensions),
    };
  } else {
    // trace
    return {
      documentType: KnownDocumentType.Trace,
      message: (data as TraceData).Message,
      properties: mapToKeyValuePairList(data.CustomDimensions),
    };
  }
}

export function isRequestData(data: TelemetryData): data is RequestData {
  return (data as RequestData).Url !== undefined;
}

export function isDependencyData(data: TelemetryData): data is DependencyData {
  return (data as DependencyData).Target !== undefined;
}

export function isTraceData(data: TelemetryData): data is TraceData {
  return (data as TraceData).Message !== undefined && (data as any).StackTrace === undefined;
}

export function isExceptionData(data: TelemetryData): data is ExceptionData {
  return (data as ExceptionData).StackTrace !== undefined;
}

export function getSpanDocument(telemetryData: TelemetryData): Request | RemoteDependency {
  let document: Request | RemoteDependency = {
    documentType: KnownDocumentType.Request,
  };

  if (isRequestData(telemetryData)) {
    document = {
      documentType: KnownDocumentType.Request,
      name: telemetryData.Name,
      url: telemetryData.Url,
      responseCode: String(telemetryData.ResponseCode),
      duration: getIso8601Duration(telemetryData.Duration),
    };
  } else if (isDependencyData(telemetryData)) {
    document = {
      documentType: KnownDocumentType.RemoteDependency,
      name: telemetryData.Name,
      commandName: telemetryData.Data,
      resultCode: String(telemetryData.ResultCode),
      duration: getIso8601Duration(telemetryData.Duration),
    };
  }

  document.properties = mapToKeyValuePairList(telemetryData.CustomDimensions);
  return document;
}

function createCustomDimsFromAttributes(
  attributes?: Attributes | LogAttributes,
): Map<string, string> {
  const customDims = new Map<string, string>();
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      if (
        !(
          key.startsWith("_MS.") ||
          key === SEMATTRS_NET_PEER_IP ||
          key === SEMATTRS_NET_PEER_NAME ||
          key === SEMATTRS_HTTP_METHOD ||
          key === SEMATTRS_HTTP_URL ||
          key === SEMATTRS_HTTP_STATUS_CODE ||
          key === SEMATTRS_HTTP_HOST ||
          key === SEMATTRS_HTTP_URL ||
          key === SEMATTRS_EXCEPTION_TYPE ||
          key === SEMATTRS_EXCEPTION_MESSAGE ||
          key === SEMATTRS_EXCEPTION_STACKTRACE
        )
      ) {
        customDims.set(key, String(attributes[key]));
      }
    }
  }
  return customDims;
}

function mapToKeyValuePairList(map: Map<string, string>): KeyValuePairString[] {
  const list: KeyValuePairString[] = [];
  map.forEach((value, key) => {
    list.push({ key, value });
  });
  return list;
}

function getUrl(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const httpMethod = attributes[SEMATTRS_HTTP_METHOD];
  if (httpMethod) {
    const httpUrl = attributes[SEMATTRS_HTTP_URL];
    if (httpUrl) {
      return String(httpUrl);
    } else {
      const httpScheme = attributes[SEMATTRS_HTTP_SCHEME];
      const httpTarget = attributes[SEMATTRS_HTTP_TARGET];
      if (httpScheme && httpTarget) {
        const httpHost = attributes[SEMATTRS_HTTP_HOST];
        if (httpHost) {
          return `${httpScheme}://${httpHost}${httpTarget}`;
        } else {
          const netPeerPort = attributes[SEMATTRS_NET_PEER_PORT];
          if (netPeerPort) {
            const netPeerName = attributes[SEMATTRS_NET_PEER_NAME];
            if (netPeerName) {
              return `${httpScheme}://${netPeerName}:${netPeerPort}${httpTarget}`;
            } else {
              const netPeerIp = attributes[SEMATTRS_NET_PEER_IP];
              if (netPeerIp) {
                return `${httpScheme}://${netPeerIp}:${netPeerPort}${httpTarget}`;
              }
            }
          }
        }
      }
    }
  }
  return "";
}

/**
 * UTC time the request was made. Expressed as the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001. This is used for clock skew calculations, so the value can never be stale (cached).
 *
 * @example
 * 8/5/2020 10:15:00 PM UTC =\> 637322625000000000
 * 8/5/2020 10:15:01 PM UTC =\> 637322625010000000
 */
export function getTransmissionTime(): number {
  return (Date.now() + 62135596800000) * 10000;
}

export function getMsFromFilterTimestampString(timestamp: string): number {
  // The service side will return a timestamp in the following format:
  // [days].[hours]:[minutes]:[seconds]
  // the seconds may be a whole number or something like 7.89. 7.89 seconds translates to 7890 ms.
  // writing this method because date.getmilliseconds() returns incorrect result on large timestamps.
  // examples: "14.6:56:7.89" = 1234567890 ms, "0.0:0:0.2" = 200 ms
  const parts = timestamp.split(":");
  if (parts.length !== 3) {
    return NaN;
  }
  const seconds = parseFloat(parts[2]);
  const minutes = parseFloat(parts[1]);
  const firstPart = parts[0].split(".");
  if (firstPart.length !== 2) {
    return NaN;
  }
  const hours = parseFloat(firstPart[1]);
  const days = parseFloat(firstPart[0]);

  if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return NaN;
  }

  return seconds * 1000 + minutes * 60000 + hours * 3600000 + days * 86400000;
}
