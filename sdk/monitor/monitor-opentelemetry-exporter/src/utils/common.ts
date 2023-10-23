// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";
import {
  SemanticResourceAttributes,
  SemanticAttributes,
  DbSystemValues,
} from "@opentelemetry/semantic-conventions";
import { Tags } from "../types";
import { getInstance } from "../platform";
import { KnownContextTagKeys, TelemetryItem as Envelope, MetricsData } from "../generated";
import { Resource } from "@opentelemetry/resources";
import { Attributes } from "@opentelemetry/api";

export function createTagsFromResource(resource: Resource): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };
  if (resource && resource.attributes) {
    tags[KnownContextTagKeys.AiCloudRole] = getCloudRole(resource);
    tags[KnownContextTagKeys.AiCloudRoleInstance] = getCloudRoleInstance(resource);
    const endUserId = resource.attributes[SemanticAttributes.ENDUSER_ID];
    if (endUserId) {
      tags[KnownContextTagKeys.AiUserId] = String(endUserId);
    }
  }
  return tags;
}

function getCloudRole(resource: Resource): string {
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

function getCloudRoleInstance(resource: Resource): string {
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

export function isSqlDB(dbSystem: string) {
  return (
    dbSystem === DbSystemValues.DB2 ||
    dbSystem === DbSystemValues.DERBY ||
    dbSystem === DbSystemValues.MARIADB ||
    dbSystem === DbSystemValues.MSSQL ||
    dbSystem === DbSystemValues.ORACLE ||
    dbSystem === DbSystemValues.SQLITE ||
    dbSystem === DbSystemValues.OTHER_SQL ||
    dbSystem === DbSystemValues.HSQLDB ||
    dbSystem === DbSystemValues.H2
  );
}

export function getUrl(attributes: Attributes): string {
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

export function createResourceMetricEnvelope(
  resource: Resource,
  instrumentationKey: string
): Envelope | undefined {
  if (resource && resource.attributes) {
    const tags = createTagsFromResource(resource);
    const resourceAttributes: { [propertyName: string]: string } = {};
    for (const key of Object.keys(resource.attributes)) {
      // Avoid duplication ignoring fields already mapped.
      if (
        !(
          key.startsWith("_MS.") ||
          key === SemanticResourceAttributes.TELEMETRY_SDK_VERSION ||
          key === SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE ||
          key === SemanticResourceAttributes.TELEMETRY_SDK_NAME
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
