// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Attributes } from "@opentelemetry/api";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import {
  MetricDependencyDimensions,
  MetricDimensionTypeKeys,
  MetricRequestDimensions,
  StandardMetricBaseDimensions,
  StandardMetricPropertyNames,
} from "./types";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { Resource } from "@opentelemetry/resources";

export function getRequestDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricRequestDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = "requests/duration";
  const statusCode = String(span.attributes["http.status_code"]);
  dimensions.requestResultCode = statusCode;
  dimensions.requestSuccess = statusCode === "200" ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions) as Attributes;
}

export function getDependencyDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricDependencyDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = "dependencies/duration";
  const statusCode = String(span.attributes["http.status_code"]);
  dimensions.dependencyTarget = getDependencyTarget(span.attributes);
  dimensions.dependencyResultCode = statusCode;
  dimensions.dependencyType = "http";
  dimensions.dependencySuccess = statusCode === "200" ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions) as Attributes;
}

export function getExceptionDimensions(resource: Resource): Attributes {
  const dimensions: StandardMetricBaseDimensions = getBaseDimensions(resource);
  dimensions.metricId = "exceptions/count";
  return dimensions as Attributes;
}

export function getTraceDimensions(resource: Resource): Attributes {
  const dimensions: StandardMetricBaseDimensions = getBaseDimensions(resource);
  dimensions.metricId = "traces/count";
  return dimensions as Attributes;
}

export function getBaseDimensions(resource: Resource): StandardMetricBaseDimensions {
  const dimensions: StandardMetricBaseDimensions = {};
  dimensions.IsAutocollected = "True";
  if (resource) {
    const spanResourceAttributes = resource.attributes;
    const serviceName = spanResourceAttributes[SemanticResourceAttributes.SERVICE_NAME];
    const serviceNamespace = spanResourceAttributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        dimensions.cloudRoleName = `${serviceNamespace}.${serviceName}`;
      } else {
        dimensions.cloudRoleName = String(serviceName);
      }
    }
    const serviceInstanceId =
      spanResourceAttributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
    dimensions.cloudRoleInstance = String(serviceInstanceId);
  }
  return dimensions;
}

export function getDependencyTarget(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const peerService = attributes[SemanticAttributes.PEER_SERVICE];
  const httpHost = attributes[SemanticAttributes.HTTP_HOST];
  const httpUrl = attributes[SemanticAttributes.HTTP_URL];
  const netPeerName = attributes[SemanticAttributes.NET_PEER_NAME];
  const netPeerIp = attributes[SemanticAttributes.NET_PEER_IP];
  if (peerService) {
    return String(peerService);
  } else if (httpHost) {
    return String(httpHost);
  } else if (httpUrl) {
    return String(httpUrl);
  } else if (netPeerName) {
    return String(netPeerName);
  } else if (netPeerIp) {
    return String(netPeerIp);
  }
  return "";
}

export function isExceptionTelemetry(logRecord: LogRecord) {
  const baseType = logRecord.attributes["_MS.baseType"];
  // If Application Insights Legacy logs
  if (baseType && baseType === "ExceptionData") {
    return true;
  } else if (
    logRecord.attributes[SemanticAttributes.EXCEPTION_MESSAGE] ||
    logRecord.attributes[SemanticAttributes.EXCEPTION_TYPE]
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
    !logRecord.attributes[SemanticAttributes.EXCEPTION_MESSAGE] &&
    !logRecord.attributes[SemanticAttributes.EXCEPTION_TYPE]
  ) {
    return true;
  }
  return false;
}

export function isSyntheticLoad(record: LogRecord | ReadableSpan): boolean {
  const userAgent = String(record.attributes[SemanticAttributes.HTTP_USER_AGENT]);
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
