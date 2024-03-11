// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as os from "os";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import {
  DocumentIngress,
  Exception,
  KeyValuePairString,
  KnownDocumentIngressDocumentType,
  MetricPoint,
  MonitoringDataPoint,
  RemoteDependency,
  Request,
  Trace,
} from "../../generated";
import { Attributes, SpanKind } from "@opentelemetry/api";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
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
  const opentelemetryVersion = SDK_INFO[SemanticResourceAttributes.TELEMETRY_SDK_VERSION];
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
  const serviceName = resource.attributes[SemanticResourceAttributes.SERVICE_NAME];
  const serviceNamespace = resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
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
  const kubernetesDeploymentName =
    resource.attributes[SemanticResourceAttributes.K8S_DEPLOYMENT_NAME];
  if (kubernetesDeploymentName) {
    return String(kubernetesDeploymentName);
  }
  const kuberneteReplicasetName =
    resource.attributes[SemanticResourceAttributes.K8S_REPLICASET_NAME];
  if (kuberneteReplicasetName) {
    return String(kuberneteReplicasetName);
  }
  const kubernetesStatefulSetName =
    resource.attributes[SemanticResourceAttributes.K8S_STATEFULSET_NAME];
  if (kubernetesStatefulSetName) {
    return String(kubernetesStatefulSetName);
  }
  const kubernetesJobName = resource.attributes[SemanticResourceAttributes.K8S_JOB_NAME];
  if (kubernetesJobName) {
    return String(kubernetesJobName);
  }
  const kubernetesCronjobName = resource.attributes[SemanticResourceAttributes.K8S_CRONJOB_NAME];
  if (kubernetesCronjobName) {
    return String(kubernetesCronjobName);
  }
  const kubernetesDaemonsetName =
    resource.attributes[SemanticResourceAttributes.K8S_DAEMONSET_NAME];
  if (kubernetesDaemonsetName) {
    return String(kubernetesDaemonsetName);
  }
  return cloudRole;
}

export function getCloudRoleInstance(resource: Resource): string {
  // Kubernetes attributes should take precedence
  const kubernetesPodName = resource.attributes[SemanticResourceAttributes.K8S_POD_NAME];
  if (kubernetesPodName) {
    return String(kubernetesPodName);
  }
  // Service attributes
  const serviceInstanceId = resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
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
  let metricPoints: MetricPoint[] = [];
  metrics.scopeMetrics.forEach((scopeMetric) => {
    scopeMetric.metrics.forEach((metric) => {
      metric.dataPoints.forEach((dataPoint) => {
        let metricPoint: MetricPoint = {
          weight: 4,
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
  let quickpulseDataPoint: MonitoringDataPoint = {
    ...baseMonitoringDataPoint,
    timestamp: new Date(),
    metrics: metricPoints,
    documents: documents,
  };
  return [quickpulseDataPoint];
}

export function getSpanDocument(span: ReadableSpan): Request | RemoteDependency {
  let document: Request | RemoteDependency = {
    documentType: KnownDocumentIngressDocumentType.Request,
  };
  const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
  const grpcStatusCode = span.attributes[SemanticAttributes.RPC_GRPC_STATUS_CODE];
  let url = "";
  let code = "";
  if (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) {
    if (httpMethod) {
      url = getUrl(span.attributes);
      const httpStatusCode = span.attributes[SemanticAttributes.HTTP_STATUS_CODE];
      if (httpStatusCode) {
        code = String(httpStatusCode);
      }
    } else if (grpcStatusCode) {
      code = String(grpcStatusCode);
    }

    document = {
      documentType: KnownDocumentIngressDocumentType.Request,
      name: span.name,
      url: url,
      responseCode: code,
      duration: hrTimeToMilliseconds(span.duration).toString(),
    };
  } else {
    url = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SemanticAttributes.HTTP_STATUS_CODE];
    if (httpStatusCode) {
      code = String(httpStatusCode);
    }

    document = {
      documentType: KnownDocumentIngressDocumentType.RemoteDependency,
      name: span.name,
      commandName: url,
      resultCode: code,
      duration: hrTimeToMilliseconds(span.duration).toString(),
    };
  }
  document.properties = createPropertiesFromAttributes(span.attributes);
  return document;
}

export function getLogDocument(logRecord: LogRecord): Trace | Exception {
  let document: Trace | Exception = {
    documentType: KnownDocumentIngressDocumentType.Exception,
  };
  const exceptionType = String(logRecord.attributes[SemanticAttributes.EXCEPTION_TYPE]);
  if (exceptionType) {
    const exceptionMessage = String(logRecord.attributes[SemanticAttributes.EXCEPTION_MESSAGE]);
    document = {
      documentType: KnownDocumentIngressDocumentType.Exception,
      exceptionType: exceptionType,
      exceptionMessage: exceptionMessage,
    };
  } else {
    document = {
      documentType: KnownDocumentIngressDocumentType.Trace,
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
          key === SemanticAttributes.NET_PEER_IP ||
          key === SemanticAttributes.NET_PEER_NAME ||
          key === SemanticAttributes.PEER_SERVICE ||
          key === SemanticAttributes.HTTP_METHOD ||
          key === SemanticAttributes.HTTP_URL ||
          key === SemanticAttributes.HTTP_STATUS_CODE ||
          key === SemanticAttributes.HTTP_ROUTE ||
          key === SemanticAttributes.HTTP_HOST ||
          key === SemanticAttributes.HTTP_URL ||
          key === SemanticAttributes.DB_SYSTEM ||
          key === SemanticAttributes.DB_STATEMENT ||
          key === SemanticAttributes.DB_OPERATION ||
          key === SemanticAttributes.DB_NAME ||
          key === SemanticAttributes.RPC_SYSTEM ||
          key === SemanticAttributes.RPC_GRPC_STATUS_CODE ||
          key === SemanticAttributes.EXCEPTION_TYPE ||
          key === SemanticAttributes.EXCEPTION_MESSAGE
        )
      ) {
        properties.push({ key: key, value: attributes[key] as string });
      }
    }
  }
  return properties;
}

function getUrl(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const httpMethod = attributes[SemanticAttributes.HTTP_METHOD];
  if (httpMethod) {
    const httpUrl = attributes[SemanticAttributes.HTTP_URL];
    if (httpUrl) {
      return String(httpUrl);
    } else {
      const httpScheme = attributes[SemanticAttributes.HTTP_SCHEME];
      const httpTarget = attributes[SemanticAttributes.HTTP_TARGET];
      if (httpScheme && httpTarget) {
        const httpHost = attributes[SemanticAttributes.HTTP_HOST];
        if (httpHost) {
          return `${httpScheme}://${httpHost}${httpTarget}`;
        } else {
          const netPeerPort = attributes[SemanticAttributes.NET_PEER_PORT];
          if (netPeerPort) {
            const netPeerName = attributes[SemanticAttributes.NET_PEER_NAME];
            if (netPeerName) {
              return `${httpScheme}://${netPeerName}:${netPeerPort}${httpTarget}`;
            } else {
              const netPeerIp = attributes[SemanticAttributes.NET_PEER_IP];
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
