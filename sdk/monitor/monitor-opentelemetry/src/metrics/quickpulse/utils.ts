// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as os from "os";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import {
  DocumentIngress,
  Exception,
  KeyValuePairString,
  KnownDocumentType,
  MetricPoint,
  MonitoringDataPoint,
  RemoteDependency,
  Request,
  Trace,
} from "../../generated";
import { Attributes, SpanKind } from "@opentelemetry/api";
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
  SEMRESATTRS_K8S_CRONJOB_NAME,
  SEMRESATTRS_K8S_DAEMONSET_NAME,
  SEMRESATTRS_K8S_DEPLOYMENT_NAME,
  SEMRESATTRS_K8S_JOB_NAME,
  SEMRESATTRS_K8S_POD_NAME,
  SEMRESATTRS_K8S_REPLICASET_NAME,
  SEMRESATTRS_K8S_STATEFULSET_NAME,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_TELEMETRY_SDK_VERSION,
} from "@opentelemetry/semantic-conventions";
import { SDK_INFO, hrTimeToMilliseconds } from "@opentelemetry/core";
import { DataPointType, Histogram, ResourceMetrics } from "@opentelemetry/sdk-metrics";
import {
  AZURE_MONITOR_AUTO_ATTACH,
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  AZURE_MONITOR_PREFIX,
  AttachTypePrefix,
} from "../../types";
import { Resource } from "@opentelemetry/resources";
import { QuickPulseMetricNames, QuickPulseOpenTelemetryMetricNames } from "./types";
import { getOsPrefix } from "../../utils/common";
import { getResourceProvider } from "../../utils/common";
import { LogAttributes } from "@opentelemetry/api-logs";

/** Get the internal SDK version */
export function getSdkVersion(): string {
  const { nodeVersion } = process.versions;
  const opentelemetryVersion = SDK_INFO[SEMRESATTRS_TELEMETRY_SDK_VERSION];
  const version = `ext${AZURE_MONITOR_OPENTELEMETRY_VERSION}`;
  const internalSdkVersion = `${process.env[AZURE_MONITOR_PREFIX] ?? ""}node${nodeVersion}:otel${opentelemetryVersion}:${version}`;
  return internalSdkVersion;
}

/** Set the version prefix to a string in the format {ResourceProvider}{OS}m_ */
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

export function getCloudRole(resource: Resource): string {
  let cloudRole = "";
  // Service attributes
  const serviceName = resource.attributes[SEMRESATTRS_SERVICE_NAME];
  const serviceNamespace = resource.attributes[SEMRESATTRS_SERVICE_NAMESPACE];
  if (serviceName) {
    // Custom Service name provided by customer is highest precedence
    if (!String(serviceName).startsWith("unknown_service")) {
      if (serviceNamespace) {
        return `${serviceNamespace}.${serviceName}`;
      } else {
        return String(serviceName);
      }
    } else {
      // Service attributes will be only used if K8S attributes are not present
      if (serviceNamespace) {
        cloudRole = `${serviceNamespace}.${serviceName}`;
      } else {
        cloudRole = String(serviceName);
      }
    }
  }
  // Kubernetes attributes should take precedence
  const kubernetesDeploymentName = resource.attributes[SEMRESATTRS_K8S_DEPLOYMENT_NAME];
  if (kubernetesDeploymentName) {
    return String(kubernetesDeploymentName);
  }
  const kuberneteReplicasetName = resource.attributes[SEMRESATTRS_K8S_REPLICASET_NAME];
  if (kuberneteReplicasetName) {
    return String(kuberneteReplicasetName);
  }
  const kubernetesStatefulSetName = resource.attributes[SEMRESATTRS_K8S_STATEFULSET_NAME];
  if (kubernetesStatefulSetName) {
    return String(kubernetesStatefulSetName);
  }
  const kubernetesJobName = resource.attributes[SEMRESATTRS_K8S_JOB_NAME];
  if (kubernetesJobName) {
    return String(kubernetesJobName);
  }
  const kubernetesCronjobName = resource.attributes[SEMRESATTRS_K8S_CRONJOB_NAME];
  if (kubernetesCronjobName) {
    return String(kubernetesCronjobName);
  }
  const kubernetesDaemonsetName = resource.attributes[SEMRESATTRS_K8S_DAEMONSET_NAME];
  if (kubernetesDaemonsetName) {
    return String(kubernetesDaemonsetName);
  }
  return cloudRole;
}

export function getCloudRoleInstance(resource: Resource): string {
  // Kubernetes attributes should take precedence
  const kubernetesPodName = resource.attributes[SEMRESATTRS_K8S_POD_NAME];
  if (kubernetesPodName) {
    return String(kubernetesPodName);
  }
  // Service attributes
  const serviceInstanceId = resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID];
  if (serviceInstanceId) {
    return String(serviceInstanceId);
  }
  // Default
  return os && os.hostname();
}

export function resourceMetricsToQuickpulseDataPoint(
  metrics: ResourceMetrics,
  baseMonitoringDataPoint: MonitoringDataPoint,
  documents: DocumentIngress[],
): MonitoringDataPoint[] {
  const metricPoints: MetricPoint[] = [];
  metrics.scopeMetrics.forEach((scopeMetric) => {
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        const metricPoint: MetricPoint = {
          weight: 4,
          name: "",
          value: 0,
        };

        // Update name to expected value in Quickpulse, needed because those names are invalid in OTel
        switch (metric.descriptor.name) {
          case QuickPulseOpenTelemetryMetricNames.COMMITTED_BYTES:
            metricPoint.name = QuickPulseMetricNames.COMMITTED_BYTES;
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
          case QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME:
            metricPoint.name = QuickPulseMetricNames.PROCESSOR_TIME;
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
      });
    });
  });
  const quickpulseDataPoint: MonitoringDataPoint = {
    ...baseMonitoringDataPoint,
    timestamp: new Date(),
    metrics: metricPoints,
    documents: documents,
  };
  return [quickpulseDataPoint];
}

function getIso8601Duration(milliseconds: number) {
  const seconds = milliseconds / 1000;
  return `PT${seconds}S`;
}

export function getSpanDocument(span: ReadableSpan): Request | RemoteDependency {
  let document: Request | RemoteDependency = {
    documentType: KnownDocumentType.Request,
  };
  const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
  const grpcStatusCode = span.attributes[SEMATTRS_RPC_GRPC_STATUS_CODE];
  let url = "";
  let code = "";
  if (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) {
    if (httpMethod) {
      url = getUrl(span.attributes);
      const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
      if (httpStatusCode) {
        code = String(httpStatusCode);
      }
    } else if (grpcStatusCode) {
      code = String(grpcStatusCode);
    }

    document = {
      documentType: KnownDocumentType.Request,
      name: span.name,
      url: url,
      responseCode: code,
      duration: getIso8601Duration(hrTimeToMilliseconds(span.duration)),
    };
  } else {
    url = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
    if (httpStatusCode) {
      code = String(httpStatusCode);
    }

    document = {
      documentType: KnownDocumentType.RemoteDependency,
      name: span.name,
      commandName: url,
      resultCode: code,
      duration: getIso8601Duration(hrTimeToMilliseconds(span.duration)),
    };
  }
  document.properties = createPropertiesFromAttributes(span.attributes);
  return document;
}

export function getLogDocument(logRecord: LogRecord): Trace | Exception {
  let document: Trace | Exception = {
    documentType: KnownDocumentType.Exception,
  };
  const exceptionType = String(logRecord.attributes[SEMATTRS_EXCEPTION_TYPE]);
  if (exceptionType) {
    const exceptionMessage = String(logRecord.attributes[SEMATTRS_EXCEPTION_MESSAGE]);
    document = {
      documentType: KnownDocumentType.Exception,
      exceptionType: exceptionType,
      exceptionMessage: exceptionMessage,
    };
  } else {
    document = {
      documentType: KnownDocumentType.Trace,
      message: String(logRecord.body),
    };
  }
  document.properties = createPropertiesFromAttributes(logRecord.attributes);
  return document;
}

function createPropertiesFromAttributes(
  attributes?: Attributes | LogAttributes,
): KeyValuePairString[] {
  const properties: KeyValuePairString[] = [];
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      // Avoid duplication ignoring fields already mapped.
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
          key === SEMATTRS_EXCEPTION_MESSAGE
        )
      ) {
        properties.push({ key: key, value: String(attributes[key]) });
      }
    }
  }
  return properties;
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
 * @description UTC time the request was made. Expressed as the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001. This is used for clock skew calculations, so the value can never be stale (cached).
 *
 * @example
 * 8/5/2020 10:15:00 PM UTC => 637322625000000000
 * 8/5/2020 10:15:01 PM UTC => 637322625010000000
 *
 * @returns {number}
 */
export function getTransmissionTime(): number {
  return (Date.now() + 62135596800000) * 10000;
}
