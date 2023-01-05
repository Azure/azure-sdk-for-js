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
import { KnownContextTagKeys } from "../generated";
import { Resource } from "@opentelemetry/resources";
import { Attributes } from "@opentelemetry/api";

export function createTagsFromResource(resource: Resource): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };
  if (resource && resource.attributes) {
    const serviceName = resource.attributes[SemanticResourceAttributes.SERVICE_NAME];
    const serviceNamespace = resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        tags[KnownContextTagKeys.AiCloudRole] = `${serviceNamespace}.${serviceName}`;
      } else {
        tags[KnownContextTagKeys.AiCloudRole] = String(serviceName);
      }
    }
    const serviceInstanceId = resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
    if (serviceInstanceId) {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = String(serviceInstanceId);
    } else {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = os && os.hostname();
    }
    const endUserId = resource.attributes[SemanticAttributes.ENDUSER_ID];
    if (endUserId) {
      tags[KnownContextTagKeys.AiUserId] = String(endUserId);
    }
  }
  return tags;
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
