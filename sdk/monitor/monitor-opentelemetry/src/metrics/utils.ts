// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Attributes, SpanStatusCode } from "@opentelemetry/api";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_HOST_PORT,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_HTTP_STATUS_CODE,
} from "@opentelemetry/semantic-conventions";
import {
  MetricDependencyDimensions,
  MetricDimensionTypeKeys,
  MetricRequestDimensions,
  StandardMetricBaseDimensions,
  StandardMetricIds,
  StandardMetricPropertyNames,
} from "./types";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { Resource } from "@opentelemetry/resources";

export function getRequestDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricRequestDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = StandardMetricIds.REQUEST_DURATION;
  const statusCode = String(span.attributes[SEMATTRS_HTTP_STATUS_CODE]);
  dimensions.requestResultCode = statusCode;
  // OTel treats 4xx request responses as UNSET SpanStatusCode, but we should count them as failed
  dimensions.requestSuccess =
    span.status.code !== SpanStatusCode.ERROR && (Number(statusCode) || 0) < 400 ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions) as Attributes;
}

export function getDependencyDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricDependencyDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = StandardMetricIds.DEPENDENCIES_DURATION;
  const statusCode = String(span.attributes[SEMATTRS_HTTP_STATUS_CODE]);
  dimensions.dependencyTarget = getDependencyTarget(span.attributes);
  dimensions.dependencyResultCode = statusCode;
  dimensions.dependencyType = "http";
  dimensions.dependencySuccess = span.status.code !== SpanStatusCode.ERROR ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions) as Attributes;
}

export function getExceptionDimensions(resource: Resource): Attributes {
  const dimensions: StandardMetricBaseDimensions = getBaseDimensions(resource);
  dimensions.metricId = StandardMetricIds.EXCEPTIONS_COUNT;
  return dimensions as Attributes;
}

export function getTraceDimensions(resource: Resource): Attributes {
  const dimensions: StandardMetricBaseDimensions = getBaseDimensions(resource);
  dimensions.metricId = StandardMetricIds.TRACES_COUNT;
  return dimensions as Attributes;
}

export function getBaseDimensions(resource: Resource): StandardMetricBaseDimensions {
  const dimensions: StandardMetricBaseDimensions = {};
  dimensions.IsAutocollected = "True";
  if (resource) {
    const spanResourceAttributes = resource.attributes;
    const serviceName = spanResourceAttributes[SEMRESATTRS_SERVICE_NAME];
    const serviceNamespace = spanResourceAttributes[SEMRESATTRS_SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        dimensions.cloudRoleName = `${serviceNamespace}.${serviceName}`;
      } else {
        dimensions.cloudRoleName = String(serviceName);
      }
    }
    const serviceInstanceId = spanResourceAttributes[SEMRESATTRS_SERVICE_INSTANCE_ID];
    dimensions.cloudRoleInstance = String(serviceInstanceId);
  }
  return dimensions;
}

// Get metric dependency target, avoiding high cardinality.
export function getDependencyTarget(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const peerService = attributes[SEMATTRS_PEER_SERVICE];
  const hostPort = attributes[SEMATTRS_NET_HOST_PORT];
  const netPeerName = attributes[SEMATTRS_NET_PEER_NAME];
  if (peerService) {
    return String(peerService);
  } else if (hostPort && netPeerName) {
    return String(netPeerName) + String(hostPort);
  } else if (netPeerName) {
    return String(netPeerName);
  }
  return "";
}

export function isExceptionTelemetry(logRecord: LogRecord) {
  const baseType = logRecord.attributes["_MS.baseType"];
  // If Application Insights Legacy logs
  if (baseType && baseType === "ExceptionData") {
    return true;
  } else if (
    logRecord.attributes[SEMATTRS_EXCEPTION_MESSAGE] ||
    logRecord.attributes[SEMATTRS_EXCEPTION_TYPE]
  ) {
    return true;
  }
  return false;
}

export function isTraceTelemetry(logRecord: LogRecord) {
  const baseType = logRecord.attributes["_MS.baseType"];
  // If Application Insights Legacy logs
  if (baseType && baseType === "MessageData") {
    return true;
  } else if (
    !logRecord.attributes[SEMATTRS_EXCEPTION_MESSAGE] &&
    !logRecord.attributes[SEMATTRS_EXCEPTION_TYPE]
  ) {
    return true;
  }
  return false;
}

export function isSyntheticLoad(record: LogRecord | ReadableSpan): boolean {
  const userAgent = String(record.attributes[SEMATTRS_HTTP_USER_AGENT]);
  return userAgent !== null && userAgent.includes("AlwaysOn") ? true : false;
}

export function convertDimensions(
  dimensions: MetricDependencyDimensions | MetricRequestDimensions,
): Attributes {
  let convertedDimensions: any = {};
  for (let dim in dimensions) {
    convertedDimensions[StandardMetricPropertyNames[dim as MetricDimensionTypeKeys]] = (
      dimensions as any
    )[dim];
  }
  return convertedDimensions as Attributes;
}
