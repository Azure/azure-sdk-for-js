// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { AzNamespace, MicrosoftEventHub } from "./constants/span/azAttributes";
import {
  DbSystemValues,
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import { DependencyTypes, MS_LINKS } from "./constants/applicationinsights";
import {
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  RemoteDependencyData,
  RequestData,
} from "../generated";
import { Link, SpanKind, SpanStatusCode, diag } from "@opentelemetry/api";
import { MSLink, Measurements, Properties, Tags } from "../types";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { getInstance } from "../platform";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { msToTimeSpan } from "./breezeUtils";
import os from "os";
import { parseEventHubSpan } from "./eventhub";

function createTagsFromSpan(span: ReadableSpan): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };

  tags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
  if (span.parentSpanId) {
    tags[KnownContextTagKeys.AiOperationParentId] = span.parentSpanId;
  }
  if (span.resource && span.resource.attributes) {
    const serviceName = span.resource.attributes[SemanticResourceAttributes.SERVICE_NAME];
    const serviceNamespace = span.resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        tags[KnownContextTagKeys.AiCloudRole] = `${serviceNamespace}.${serviceName}`;
      } else {
        tags[KnownContextTagKeys.AiCloudRole] = String(serviceName);
      }
    }
    const serviceInstanceId =
      span.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
    if (serviceInstanceId) {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = String(serviceInstanceId);
    } else {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = os && os.hostname();
    }
    const endUserId = span.resource.attributes[SemanticAttributes.ENDUSER_ID];
    if (endUserId) {
      tags[KnownContextTagKeys.AiUserId] = String(endUserId);
    }
  }
  if (span.kind === SpanKind.SERVER) {
    const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
    const httpClientIp = span.attributes[SemanticAttributes.HTTP_CLIENT_IP];
    const netPeerIp = span.attributes[SemanticAttributes.NET_PEER_IP];
    if (httpMethod) {
      const httpRoute = span.attributes[SemanticAttributes.HTTP_ROUTE];
      const httpUrl = span.attributes[SemanticAttributes.HTTP_URL];
      tags[KnownContextTagKeys.AiOperationName] = span.name; // Default
      if (httpRoute) {
        tags[KnownContextTagKeys.AiOperationName] = `${httpMethod as string} ${
          httpRoute as string
        }`;
      } else if (httpUrl) {
        try {
          const url = new URL(String(httpUrl));
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          tags[KnownContextTagKeys.AiOperationName] = `${httpMethod} ${url.pathname}`;
        } catch (ex) {
          // eslint-disable-line no-empty
        }
      }
      if (httpClientIp) {
        tags[KnownContextTagKeys.AiLocationIp] = String(httpClientIp);
      } else if (netPeerIp) {
        tags[KnownContextTagKeys.AiLocationIp] = String(netPeerIp);
      }
    } else {
      tags[KnownContextTagKeys.AiOperationName] = span.name;
      if (netPeerIp) {
        tags[KnownContextTagKeys.AiLocationIp] = String(netPeerIp);
      }
    }
  }
  // TODO: Operation Name and Location IP TBD for non server spans

  const httpUserAgent = span.attributes[SemanticAttributes.HTTP_USER_AGENT];
  if (httpUserAgent) {
    // TODO: Not exposed in Swagger, need to update def
    tags["ai.user.userAgent"] = String(httpUserAgent);
  }

  return tags;
}

function createPropertiesFromSpan(span: ReadableSpan): [Properties, Measurements] {
  const properties: Properties = {};
  const measurements: Measurements = {};

  for (const key of Object.keys(span.attributes)) {
    if (
      !(
        key.startsWith("http.") ||
        key.startsWith("rpc.") ||
        key.startsWith("db.") ||
        key.startsWith("peer.") ||
        key.startsWith("net.")
      )
    ) {
      properties[key] = span.attributes[key] as string;
    }
  }

  const links: MSLink[] = span.links.map((link: Link) => ({
    operation_Id: link.context.traceId,
    id: link.context.spanId,
  }));

  if (links.length > 0) {
    properties[MS_LINKS] = JSON.stringify(links);
  }

  return [properties, measurements];
}

function isSqlDB(dbSystem: string): boolean {
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

function getUrl(span: ReadableSpan): string {
  const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
  if (httpMethod) {
    const httpUrl = span.attributes[SemanticAttributes.HTTP_URL];
    if (httpUrl) {
      return String(httpUrl);
    } else {
      const httpScheme = span.attributes[SemanticAttributes.HTTP_SCHEME];
      const httpTarget = span.attributes[SemanticAttributes.HTTP_TARGET];
      if (httpScheme && httpTarget) {
        const httpHost = span.attributes[SemanticAttributes.HTTP_HOST];
        if (httpHost) {
          return `${httpScheme}://${httpHost}${httpTarget}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
        } else {
          const netPeerPort = span.attributes[SemanticAttributes.NET_PEER_PORT];
          if (netPeerPort) {
            const netPeerName = span.attributes[SemanticAttributes.NET_PEER_NAME];
            if (netPeerName) {
              return `${httpScheme}://${netPeerName}:${netPeerPort}${httpTarget}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
            } else {
              const netPeerIp = span.attributes[SemanticAttributes.NET_PEER_IP];
              if (netPeerIp) {
                return `${httpScheme}://${netPeerIp}:${netPeerPort}${httpTarget}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
              }
            }
          }
        }
      }
    }
  }
  return "";
}

function getDependencyTarget(span: ReadableSpan): string {
  const peerService = span.attributes[SemanticAttributes.PEER_SERVICE];
  const httpHost = span.attributes[SemanticAttributes.HTTP_HOST];
  const httpUrl = span.attributes[SemanticAttributes.HTTP_URL];
  const netPeerName = span.attributes[SemanticAttributes.NET_PEER_NAME];
  const netPeerIp = span.attributes[SemanticAttributes.NET_PEER_IP];
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

function createDependencyData(span: ReadableSpan): RemoteDependencyData {
  const remoteDependencyData: RemoteDependencyData = {
    name: span.name, // Default
    id: `${span.spanContext().spanId}`,
    success: span.status.code !== SpanStatusCode.ERROR,
    resultCode: "0",
    type: "Dependency",
    duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
    version: 2,
  };
  if (span.kind === SpanKind.PRODUCER) {
    remoteDependencyData.type = DependencyTypes.QueueMessage;
  }
  if (span.kind === SpanKind.INTERNAL && span.parentSpanId) {
    remoteDependencyData.type = DependencyTypes.InProc;
  }

  const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
  const dbSystem = span.attributes[SemanticAttributes.DB_SYSTEM];
  const rpcSystem = span.attributes[SemanticAttributes.RPC_SYSTEM];
  // HTTP Dependency
  if (httpMethod) {
    const httpUrl = span.attributes[SemanticAttributes.HTTP_URL];
    if (httpUrl) {
      try {
        const dependencyUrl = new URL(String(httpUrl));
        remoteDependencyData.name = `${httpMethod} ${dependencyUrl.pathname}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
      } catch (ex) { /* eslint-disable-line no-empty */ }
    }
    remoteDependencyData.type = DependencyTypes.Http;
    remoteDependencyData.data = getUrl(span);
    const httpStatusCode = span.attributes[SemanticAttributes.HTTP_STATUS_CODE];
    if (httpStatusCode) {
      remoteDependencyData.resultCode = String(httpStatusCode);
    }
    let target = getDependencyTarget(span);
    if (target) {
      try {
        // Remove default port
        const portRegex = new RegExp(/(https?)(:\/\/.*)(:\d+)(\S*)/);
        const res = portRegex.exec(target);
        if (res != null) {
          const protocol = res[1];
          const port = res[3];
          if ((protocol === "https" && port === ":443") || (protocol === "http" && port === ":80")) {
            // Drop port
            target = res[1] + res[2] + res[4];
          }
        }
      } catch (error) { /* eslint-disable-line no-empty */ }
      remoteDependencyData.target = `${target}`;
    }
  }
  // DB Dependency
  else if (dbSystem) {
    // TODO: Remove special logic when Azure UX supports OpenTelemetry dbSystem
    if (String(dbSystem) === DbSystemValues.MYSQL) {
      remoteDependencyData.type = "mysql";
    } else if (String(dbSystem) === DbSystemValues.POSTGRESQL) {
      remoteDependencyData.type = "postgresql";
    } else if (String(dbSystem) === DbSystemValues.MONGODB) {
      remoteDependencyData.type = "mongodb";
    } else if (String(dbSystem) === DbSystemValues.REDIS) {
      remoteDependencyData.type = "redis";
    } else if (isSqlDB(String(dbSystem))) {
      remoteDependencyData.type = "SQL";
    } else {
      remoteDependencyData.type = String(dbSystem);
    }
    const dbStatement = span.attributes[SemanticAttributes.DB_STATEMENT];
    const dbOperation = span.attributes[SemanticAttributes.DB_OPERATION];
    if (dbStatement) {
      remoteDependencyData.data = String(dbStatement);
    } else if (dbOperation) {
      remoteDependencyData.data = String(dbOperation);
    }
    const target = getDependencyTarget(span);
    const dbName = span.attributes[SemanticAttributes.DB_NAME];
    if (target) {
      remoteDependencyData.target = dbName ? `${target}|${dbName}` : `${target}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
    } else {
      remoteDependencyData.target = dbName ? `${dbName}` : `${dbSystem}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
    }
  }
  // grpc Dependency
  else if (rpcSystem) {
    remoteDependencyData.type = DependencyTypes.Grpc;
    const grpcStatusCode = span.attributes[SemanticAttributes.RPC_GRPC_STATUS_CODE];
    if (grpcStatusCode) {
      remoteDependencyData.resultCode = String(grpcStatusCode);
    }
    const target = getDependencyTarget(span);
    if (target) {
      remoteDependencyData.target = `${target}`;
    } else if (rpcSystem) {
      remoteDependencyData.target = String(rpcSystem);
    }
  }
  return remoteDependencyData;
}

function createRequestData(span: ReadableSpan): RequestData {
  const requestData: RequestData = {
    id: `${span.spanContext().spanId}`,
    success: span.status.code !== SpanStatusCode.ERROR,
    responseCode: "0",
    duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
    version: 2,
    source: undefined,
  };
  const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
  const grpcStatusCode = span.attributes[SemanticAttributes.RPC_GRPC_STATUS_CODE];
  if (httpMethod) {
    requestData.url = getUrl(span);
    const httpStatusCode = span.attributes[SemanticAttributes.HTTP_STATUS_CODE];
    if (httpStatusCode) {
      requestData.responseCode = String(httpStatusCode);
    }
  } else if (grpcStatusCode) {
    requestData.responseCode = String(grpcStatusCode);
  }
  return requestData;
}

/**
 * Span to Azure envelope parsing.
 * @internal
 */
export function readableSpanToEnvelope(span: ReadableSpan, ikey: string): Envelope {
  let name: string;
  let baseType: "RemoteDependencyData" | "RequestData";
  const sampleRate = 100;
  let baseData: RemoteDependencyData | RequestData;

  const time = new Date(hrTimeToMilliseconds(span.startTime));
  const instrumentationKey = ikey;
  const tags = createTagsFromSpan(span);
  const [properties, measurements] = createPropertiesFromSpan(span);
  switch (span.kind) {
    case SpanKind.CLIENT:
    case SpanKind.PRODUCER:
    case SpanKind.INTERNAL:
      name = "Microsoft.ApplicationInsights.RemoteDependency";
      baseType = "RemoteDependencyData";
      baseData = createDependencyData(span);
      break;
    case SpanKind.SERVER:
    case SpanKind.CONSUMER:
      name = "Microsoft.ApplicationInsights.Request";
      baseType = "RequestData";
      baseData = createRequestData(span);
      baseData.name = tags[KnownContextTagKeys.AiOperationName];
      break;
    default:
      // never
      /* eslint-disable @typescript-eslint/restrict-template-expressions */
      diag.error(`Unsupported span kind ${span.kind}`);
      throw new Error(`Unsupported span kind ${span.kind}`);
      /* eslint-enable @typescript-eslint/restrict-template-expressions */
  }

  // Azure SDK
  if (span.attributes[AzNamespace]) {
    if (span.kind === SpanKind.INTERNAL) {
      baseData.type = `${DependencyTypes.InProc} | ${span.attributes[AzNamespace]}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions
    }
    if (span.attributes[AzNamespace] === MicrosoftEventHub) {
      parseEventHubSpan(span, baseData);
    }
  }

  return {
    name,
    sampleRate,
    time,
    instrumentationKey,
    tags,
    version: 1,
    data: {
      baseType,
      baseData: {
        ...baseData,
        properties,
        measurements,
      },
    },
  };
}
