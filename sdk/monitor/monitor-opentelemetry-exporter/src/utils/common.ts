// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";
import {
  SEMRESATTRS_DEVICE_ID,
  SEMRESATTRS_DEVICE_MODEL_NAME,
  SEMRESATTRS_SERVICE_VERSION,
  SEMRESATTRS_K8S_POD_NAME,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  DBSYSTEMVALUES_DB2,
  DBSYSTEMVALUES_DERBY,
  DBSYSTEMVALUES_MARIADB,
  DBSYSTEMVALUES_MSSQL,
  DBSYSTEMVALUES_ORACLE,
  DBSYSTEMVALUES_SQLITE,
  DBSYSTEMVALUES_OTHER_SQL,
  DBSYSTEMVALUES_HSQLDB,
  DBSYSTEMVALUES_H2,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_URL,
  SEMATTRS_HTTP_SCHEME,
  SEMATTRS_HTTP_TARGET,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_NET_PEER_PORT,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_PEER_SERVICE,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_K8S_DEPLOYMENT_NAME,
  SEMRESATTRS_K8S_REPLICASET_NAME,
  SEMRESATTRS_K8S_STATEFULSET_NAME,
  SEMRESATTRS_K8S_JOB_NAME,
  SEMRESATTRS_K8S_CRONJOB_NAME,
  SEMRESATTRS_K8S_DAEMONSET_NAME,
  SEMRESATTRS_TELEMETRY_SDK_VERSION,
  SEMRESATTRS_TELEMETRY_SDK_LANGUAGE,
  SEMRESATTRS_TELEMETRY_SDK_NAME,
} from "@opentelemetry/semantic-conventions";
import { Tags } from "../types";
import { getInstance } from "../platform";
import { KnownContextTagKeys, TelemetryItem as Envelope, MetricsData } from "../generated";
import { Resource } from "@opentelemetry/resources";
import { Attributes, HrTime } from "@opentelemetry/api";
import { hrTimeToNanoseconds } from "@opentelemetry/core";

export function hrTimeToDate(hrTime: HrTime): Date {
  return new Date(hrTimeToNanoseconds(hrTime) / 1000000);
}

export function createTagsFromResource(resource: Resource): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };
  if (resource && resource.attributes) {
    tags[KnownContextTagKeys.AiCloudRole] = getCloudRole(resource);
    tags[KnownContextTagKeys.AiCloudRoleInstance] = getCloudRoleInstance(resource);
    if (resource.attributes[SEMRESATTRS_DEVICE_ID]) {
      tags[KnownContextTagKeys.AiDeviceId] = String(resource.attributes[SEMRESATTRS_DEVICE_ID]);
    }
    if (resource.attributes[SEMRESATTRS_DEVICE_MODEL_NAME]) {
      tags[KnownContextTagKeys.AiDeviceModel] = String(
        resource.attributes[SEMRESATTRS_DEVICE_MODEL_NAME],
      );
    }
    if (resource.attributes[SEMRESATTRS_SERVICE_VERSION]) {
      tags[KnownContextTagKeys.AiApplicationVer] = String(
        resource.attributes[SEMRESATTRS_SERVICE_VERSION],
      );
    }
  }
  return tags;
}

function getCloudRole(resource: Resource): string {
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

function getCloudRoleInstance(resource: Resource): string {
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

export function getUrl(attributes: Attributes): string {
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

export function getDependencyTarget(attributes: Attributes): string {
  if (!attributes) {
    return "";
  }
  const peerService = attributes[SEMATTRS_PEER_SERVICE];
  const httpHost = attributes[SEMATTRS_HTTP_HOST];
  const httpUrl = attributes[SEMATTRS_HTTP_URL];
  const netPeerName = attributes[SEMATTRS_NET_PEER_NAME];
  const netPeerIp = attributes[SEMATTRS_NET_PEER_IP];
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

export function createResourceMetricEnvelope(
  resource: Resource,
  instrumentationKey: string,
): Envelope | undefined {
  if (resource && resource.attributes) {
    const tags = createTagsFromResource(resource);
    const resourceAttributes: { [propertyName: string]: string } = {};
    for (const key of Object.keys(resource.attributes)) {
      // Avoid duplication ignoring fields already mapped.
      if (
        !(
          key.startsWith("_MS.") ||
          key === SEMRESATTRS_TELEMETRY_SDK_VERSION ||
          key === SEMRESATTRS_TELEMETRY_SDK_LANGUAGE ||
          key === SEMRESATTRS_TELEMETRY_SDK_NAME
        )
      ) {
        resourceAttributes[key] = resource.attributes[key] as string;
      }
    }
    // Only send event when resource attributes are available
    if (Object.keys(resourceAttributes).length > 0) {
      const baseData: MetricsData = {
        version: 2,
        metrics: [{ name: "_OTELRESOURCE_", value: 1 }],
        properties: resourceAttributes,
      };
      const envelope: Envelope = {
        name: "Microsoft.ApplicationInsights.Metric",
        time: new Date(),
        sampleRate: 100, // Metrics are never sampled
        instrumentationKey: instrumentationKey,
        version: 1,
        data: {
          baseType: "MetricData",
          baseData: baseData,
        },
        tags: tags,
      };
      return envelope;
    }
  }
  return;
}
