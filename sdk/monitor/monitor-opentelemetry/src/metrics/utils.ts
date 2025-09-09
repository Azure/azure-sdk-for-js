// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Attributes } from "@opentelemetry/api";
import { SpanStatusCode } from "@opentelemetry/api";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import {
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_TYPE,
  DBSYSTEMVALUES_DB2,
  DBSYSTEMVALUES_DERBY,
  DBSYSTEMVALUES_MARIADB,
  DBSYSTEMVALUES_MSSQL,
  DBSYSTEMVALUES_ORACLE,
  DBSYSTEMVALUES_SQLITE,
  DBSYSTEMVALUES_OTHER_SQL,
  DBSYSTEMVALUES_HSQLDB,
  DBSYSTEMVALUES_H2,
  SEMRESATTRS_K8S_DEPLOYMENT_NAME,
  SEMRESATTRS_K8S_REPLICASET_NAME,
  SEMRESATTRS_K8S_STATEFULSET_NAME,
  SEMRESATTRS_K8S_JOB_NAME,
  SEMRESATTRS_K8S_CRONJOB_NAME,
  SEMRESATTRS_K8S_DAEMONSET_NAME,
  SEMRESATTRS_K8S_POD_NAME,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
} from "@opentelemetry/semantic-conventions";
import { StandardMetricIds, StandardMetricPropertyNames } from "./types.js";
import type {
  MetricDependencyDimensions,
  MetricDimensionTypeKeys,
  MetricRequestDimensions,
  StandardMetricBaseDimensions,
} from "./types.js";
import type { Resource } from "@opentelemetry/resources";
import {
  getHttpStatusCode,
  getNetHostPort,
  getNetPeerName,
  getUserAgent,
} from "./quickpulse/utils.js";
import { Logger } from "../shared/logging/logger.js";
import os from "node:os";
import process from "node:process";

export function getRequestDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricRequestDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = StandardMetricIds.REQUEST_DURATION;
  const statusCode = String(getHttpStatusCode(span.attributes));
  dimensions.requestResultCode = statusCode;
  // OTel treats 4xx request responses as UNSET SpanStatusCode, but we should count them as failed
  dimensions.requestSuccess =
    span.status.code !== SpanStatusCode.ERROR && (Number(statusCode) || 0) < 400 ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions);
}

export function getDependencyDimensions(span: ReadableSpan): Attributes {
  const dimensions: MetricDependencyDimensions = getBaseDimensions(span.resource);
  dimensions.metricId = StandardMetricIds.DEPENDENCIES_DURATION;
  const statusCode = String(getHttpStatusCode(span.attributes));
  dimensions.dependencyTarget = getDependencyTarget(span.attributes);
  dimensions.dependencyResultCode = statusCode;
  dimensions.dependencyType = "http";
  dimensions.dependencySuccess = span.status.code !== SpanStatusCode.ERROR ? "True" : "False";
  if (isSyntheticLoad(span)) {
    dimensions.operationSynthetic = "True";
  }
  return convertDimensions(dimensions);
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
    dimensions.cloudRoleName = getCloudRole(resource);
    dimensions.cloudRoleInstance = getCloudRoleInstance(resource);
  }
  return dimensions;
}

// Get metric dependency target, avoiding high cardinality.
export function getDependencyTarget(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const peerService = attributes[SEMATTRS_PEER_SERVICE];
  const hostPort = getNetHostPort(attributes);
  const netPeerName = getNetPeerName(attributes);
  if (peerService) {
    return String(peerService);
  } else if (hostPort && netPeerName) {
    return `${netPeerName}:${hostPort}`;
  } else if (netPeerName) {
    return String(netPeerName);
  }
  return "";
}

export function isSqlDB(dbSystem: string): boolean {
  return (
    dbSystem === DBSYSTEMVALUES_DB2 ||
    dbSystem === DBSYSTEMVALUES_DERBY ||
    dbSystem === DBSYSTEMVALUES_MARIADB ||
    dbSystem === DBSYSTEMVALUES_MSSQL ||
    dbSystem === DBSYSTEMVALUES_ORACLE ||
    dbSystem === DBSYSTEMVALUES_SQLITE ||
    dbSystem === DBSYSTEMVALUES_OTHER_SQL ||
    dbSystem === DBSYSTEMVALUES_HSQLDB ||
    dbSystem === DBSYSTEMVALUES_H2
  );
}

export function isExceptionTelemetry(logRecord: SdkLogRecord): boolean {
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

export function isTraceTelemetry(logRecord: SdkLogRecord): boolean {
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

export function isSyntheticLoad(record: SdkLogRecord | ReadableSpan): boolean {
  const userAgent = String(getUserAgent(record.attributes as Attributes));
  return userAgent !== null && userAgent.includes("AlwaysOn") ? true : false;
}

export function convertDimensions(
  dimensions: MetricDependencyDimensions | MetricRequestDimensions,
): Attributes {
  const convertedDimensions: any = {};
  for (const dim in dimensions) {
    convertedDimensions[StandardMetricPropertyNames[dim as MetricDimensionTypeKeys]] = (
      dimensions as any
    )[dim];
  }
  return convertedDimensions as Attributes;
}

// to get physical memory bytes
export function getPhysicalMemory(): number {
  if (process?.memoryUsage) {
    return process.memoryUsage.rss();
  } else {
    Logger.getInstance().debug("process.memoryUsage is not available");
    return 0;
  }
}

// This function can get the normalized cpu, but it assumes that after this function is called,
// that the process.hrtime.bigint() & process.cpuUsage() are called/stored to be used as the
// parameters for the next call.
export function getProcessorTimeNormalized(
  lastHrTime: bigint,
  lastCpuUsage: NodeJS.CpuUsage,
): number {
  let numCpus = os.cpus().length;
  const usageDif = process.cpuUsage(lastCpuUsage);
  const elapsedTimeNs = process.hrtime.bigint() - lastHrTime;

  const usageDifMs = (usageDif.user + usageDif.system) / 1000.0;
  const elapsedTimeMs = elapsedTimeNs === BigInt(0) ? 1 : Number(elapsedTimeNs) / 1000000.0;
  // just for division safety, don't know a case in which this would actually happen
  numCpus = numCpus === 0 ? 1 : numCpus;

  return (usageDifMs / elapsedTimeMs / numCpus) * 100;
}

// This function can get the cpu %, but it assumes that after this function is called,
// that the process.hrtime.bigint() & process.cpuUsage() are called/stored to be used as the
// parameters for the next call.
export function getProcessorTime(lastHrTime: bigint, lastCpuUsage: NodeJS.CpuUsage): number {
  if (process?.cpuUsage) {
    const usageDif = process.cpuUsage(lastCpuUsage);
    const elapsedTimeNs = process.hrtime.bigint() - lastHrTime;

    const usageDifMs = (usageDif.user + usageDif.system) / 1000.0;
    const elapsedTimeMs = elapsedTimeNs === BigInt(0) ? 1 : Number(elapsedTimeNs) / 1000000.0;

    return (usageDifMs / elapsedTimeMs) * 100;
  } else {
    Logger.getInstance().debug("process.cpuUsage is not available");
    return 0;
  }
}

/**
 * Gets the cloud role name based on the resource attributes
 */
export function getCloudRole(resource: Resource): string {
  let cloudRole = "";
  // Service attributes
  const serviceName: string = resource.attributes[SEMRESATTRS_SERVICE_NAME] as string;
  const serviceNamespace: string = resource.attributes[SEMRESATTRS_SERVICE_NAMESPACE] as string;
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

/**
 * Gets the cloud role instance based on the resource attributes
 */
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
