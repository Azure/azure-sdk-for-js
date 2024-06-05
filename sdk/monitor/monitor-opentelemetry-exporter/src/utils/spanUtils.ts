// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "url";
import { ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { diag, SpanKind, SpanStatusCode, Link, Attributes } from "@opentelemetry/api";
import {
  DBSYSTEMVALUES_MONGODB,
  DBSYSTEMVALUES_MYSQL,
  DBSYSTEMVALUES_POSTGRESQL,
  DBSYSTEMVALUES_REDIS,
  SEMATTRS_DB_NAME,
  SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_STATEMENT,
  SEMATTRS_DB_SYSTEM,
  SEMATTRS_ENDUSER_ID,
  SEMATTRS_EXCEPTION_ESCAPED,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_HTTP_CLIENT_IP,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_URL,
  SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_RPC_SYSTEM,
} from "@opentelemetry/semantic-conventions";

import {
  createTagsFromResource,
  getDependencyTarget,
  getUrl,
  hrTimeToDate,
  isSqlDB,
} from "./common";
import { Tags, Properties, MSLink, Measurements } from "../types";
import { parseEventHubSpan } from "./eventhub";
import { AzureMonitorSampleRate, DependencyTypes, MS_LINKS } from "./constants/applicationinsights";
import { AzNamespace, MicrosoftEventHub } from "./constants/span/azAttributes";
import {
  TelemetryExceptionData,
  MessageData,
  RemoteDependencyData,
  RequestData,
  TelemetryItem as Envelope,
  KnownContextTagKeys,
  TelemetryExceptionDetails,
} from "../generated";
import { msToTimeSpan } from "./breezeUtils";

function createTagsFromSpan(span: ReadableSpan): Tags {
  const tags: Tags = createTagsFromResource(span.resource);
  tags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
  if (span.parentSpanId) {
    tags[KnownContextTagKeys.AiOperationParentId] = span.parentSpanId;
  }
  const endUserId = span.attributes[SEMATTRS_ENDUSER_ID];
  if (endUserId) {
    tags[KnownContextTagKeys.AiUserId] = String(endUserId);
  }
  const httpUserAgent = span.attributes[SEMATTRS_HTTP_USER_AGENT];
  if (httpUserAgent) {
    // TODO: Not exposed in Swagger, need to update def
    tags["ai.user.userAgent"] = String(httpUserAgent);
  }
  if (span.kind === SpanKind.SERVER) {
    const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
    const httpClientIp = span.attributes[SEMATTRS_HTTP_CLIENT_IP];
    const netPeerIp = span.attributes[SEMATTRS_NET_PEER_IP];
    if (httpMethod) {
      const httpRoute = span.attributes[SEMATTRS_HTTP_ROUTE];
      const httpUrl = span.attributes[SEMATTRS_HTTP_URL];
      tags[KnownContextTagKeys.AiOperationName] = span.name; // Default
      if (httpRoute) {
        tags[KnownContextTagKeys.AiOperationName] = `${httpMethod as string} ${
          httpRoute as string
        }`;
      } else if (httpUrl) {
        try {
          const url = new URL(String(httpUrl));
          tags[KnownContextTagKeys.AiOperationName] = `${httpMethod} ${url.pathname}`;
        } catch (ex: any) {}
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

  return tags;
}

function createPropertiesFromSpanAttributes(attributes?: Attributes): {
  [propertyName: string]: string;
} {
  const properties: { [propertyName: string]: string } = {};
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      // Avoid duplication ignoring fields already mapped.
      if (
        !(
          key.startsWith("_MS.") ||
          key === SEMATTRS_NET_PEER_IP ||
          key === SEMATTRS_NET_PEER_NAME ||
          key === SEMATTRS_PEER_SERVICE ||
          key === SEMATTRS_HTTP_METHOD ||
          key === SEMATTRS_HTTP_URL ||
          key === SEMATTRS_HTTP_STATUS_CODE ||
          key === SEMATTRS_HTTP_ROUTE ||
          key === SEMATTRS_HTTP_HOST ||
          key === SEMATTRS_HTTP_URL ||
          key === SEMATTRS_DB_SYSTEM ||
          key === SEMATTRS_DB_STATEMENT ||
          key === SEMATTRS_DB_OPERATION ||
          key === SEMATTRS_DB_NAME ||
          key === SEMATTRS_RPC_SYSTEM ||
          key === SEMATTRS_RPC_GRPC_STATUS_CODE ||
          key === SEMATTRS_EXCEPTION_TYPE ||
          key === SEMATTRS_EXCEPTION_MESSAGE ||
          key === SEMATTRS_EXCEPTION_STACKTRACE
        )
      ) {
        properties[key] = attributes[key] as string;
      }
    }
  }
  return properties;
}

function createPropertiesFromSpan(span: ReadableSpan): [Properties, Measurements] {
  const properties: Properties = createPropertiesFromSpanAttributes(span.attributes);
  const measurements: Measurements = {};

  const links: MSLink[] = span.links.map((link: Link) => ({
    operation_Id: link.context.traceId,
    id: link.context.spanId,
  }));
  if (links.length > 0) {
    properties[MS_LINKS] = JSON.stringify(links);
  }
  return [properties, measurements];
}

function createDependencyData(span: ReadableSpan): RemoteDependencyData {
  const remoteDependencyData: RemoteDependencyData = {
    name: span.name, // Default
    id: `${span.spanContext().spanId}`,
    success: span.status?.code !== SpanStatusCode.ERROR,
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

  const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
  const dbSystem = span.attributes[SEMATTRS_DB_SYSTEM];
  const rpcSystem = span.attributes[SEMATTRS_RPC_SYSTEM];
  // HTTP Dependency
  if (httpMethod) {
    const httpUrl = span.attributes[SEMATTRS_HTTP_URL];
    if (httpUrl) {
      try {
        const dependencyUrl = new URL(String(httpUrl));
        remoteDependencyData.name = `${httpMethod} ${dependencyUrl.pathname}`;
      } catch (ex: any) {}
    }
    remoteDependencyData.type = DependencyTypes.Http;
    remoteDependencyData.data = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
    if (httpStatusCode) {
      remoteDependencyData.resultCode = String(httpStatusCode);
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
      } catch (ex: any) {}
      remoteDependencyData.target = `${target}`;
    }
  }
  // DB Dependency
  else if (dbSystem) {
    // TODO: Remove special logic when Azure UX supports OpenTelemetry dbSystem
    if (String(dbSystem) === DBSYSTEMVALUES_MYSQL) {
      remoteDependencyData.type = "mysql";
    } else if (String(dbSystem) === DBSYSTEMVALUES_POSTGRESQL) {
      remoteDependencyData.type = "postgresql";
    } else if (String(dbSystem) === DBSYSTEMVALUES_MONGODB) {
      remoteDependencyData.type = "mongodb";
    } else if (String(dbSystem) === DBSYSTEMVALUES_REDIS) {
      remoteDependencyData.type = "redis";
    } else if (isSqlDB(String(dbSystem))) {
      remoteDependencyData.type = "SQL";
    } else {
      remoteDependencyData.type = String(dbSystem);
    }
    const dbStatement = span.attributes[SEMATTRS_DB_STATEMENT];
    const dbOperation = span.attributes[SEMATTRS_DB_OPERATION];
    if (dbStatement) {
      remoteDependencyData.data = String(dbStatement);
    } else if (dbOperation) {
      remoteDependencyData.data = String(dbOperation);
    }
    const target = getDependencyTarget(span.attributes);
    const dbName = span.attributes[SEMATTRS_DB_NAME];
    if (target) {
      remoteDependencyData.target = dbName ? `${target}|${dbName}` : `${target}`;
    } else {
      remoteDependencyData.target = dbName ? `${dbName}` : `${dbSystem}`;
    }
  }
  // grpc Dependency
  else if (rpcSystem) {
    if (rpcSystem == DependencyTypes.Wcf) {
      remoteDependencyData.type = DependencyTypes.Wcf;
    } else {
      remoteDependencyData.type = DependencyTypes.Grpc;
    }
    const grpcStatusCode = span.attributes[SEMATTRS_RPC_GRPC_STATUS_CODE];
    if (grpcStatusCode) {
      remoteDependencyData.resultCode = String(grpcStatusCode);
    }
    const target = getDependencyTarget(span.attributes);
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
  const httpMethod = span.attributes[SEMATTRS_HTTP_METHOD];
  const grpcStatusCode = span.attributes[SEMATTRS_RPC_GRPC_STATUS_CODE];
  if (httpMethod) {
    requestData.url = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SEMATTRS_HTTP_STATUS_CODE];
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
  let baseData: RemoteDependencyData | RequestData;

  const time = hrTimeToDate(span.startTime);
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
      diag.error(`Unsupported span kind ${span.kind}`);
      throw new Error(`Unsupported span kind ${span.kind}`);
  }

  let sampleRate = 100;
  if (span.attributes[AzureMonitorSampleRate]) {
    sampleRate = Number(span.attributes[AzureMonitorSampleRate]);
  }

  // Azure SDK
  if (span.attributes[AzNamespace]) {
    if (span.kind === SpanKind.INTERNAL) {
      baseData.type = `${DependencyTypes.InProc} | ${span.attributes[AzNamespace]}`;
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

/**
 * Span Events to Azure envelopes parsing.
 * @internal
 */
export function spanEventsToEnvelopes(span: ReadableSpan, ikey: string): Envelope[] {
  const envelopes: Envelope[] = [];
  if (span.events) {
    span.events.forEach((event: TimedEvent) => {
      let baseType: "ExceptionData" | "MessageData";
      const time = hrTimeToDate(event.time);
      let name = "";
      let baseData: TelemetryExceptionData | MessageData;
      const properties = createPropertiesFromSpanAttributes(event.attributes);

      const tags: Tags = createTagsFromResource(span.resource);
      tags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
      const spanId = span.spanContext()?.spanId;
      if (spanId) {
        tags[KnownContextTagKeys.AiOperationParentId] = spanId;
      }

      // Only generate exception telemetry for incoming requests
      if (event.name === "exception") {
        if (span.kind === SpanKind.SERVER) {
          name = "Microsoft.ApplicationInsights.Exception";
          baseType = "ExceptionData";
          let typeName = "";
          let message = "Exception";
          let stack = "";
          let hasFullStack = false;
          if (event.attributes) {
            typeName = String(event.attributes[SEMATTRS_EXCEPTION_TYPE]);
            stack = String(event.attributes[SEMATTRS_EXCEPTION_STACKTRACE]);
            if (stack) {
              hasFullStack = true;
            }
            const exceptionMsg = event.attributes[SEMATTRS_EXCEPTION_MESSAGE];
            if (exceptionMsg) {
              message = String(exceptionMsg);
            }
            const escaped = event.attributes[SEMATTRS_EXCEPTION_ESCAPED];
            if (escaped !== undefined) {
              properties[SEMATTRS_EXCEPTION_ESCAPED] = String(escaped);
            }
          }
          const exceptionDetails: TelemetryExceptionDetails = {
            typeName: typeName,
            message: message,
            stack: stack,
            hasFullStack: hasFullStack,
          };
          const exceptionData: TelemetryExceptionData = {
            exceptions: [exceptionDetails],
            version: 2,
            properties: properties,
          };
          baseData = exceptionData;
        } else {
          // Drop non-server exception span events
          return;
        }
      } else {
        name = "Microsoft.ApplicationInsights.Message";
        baseType = "MessageData";
        const messageData: MessageData = {
          message: event.name,
          version: 2,
          properties: properties,
        };
        baseData = messageData;
      }
      let sampleRate = 100;
      if (span.attributes[AzureMonitorSampleRate]) {
        sampleRate = Number(span.attributes[AzureMonitorSampleRate]);
      }
      const env: Envelope = {
        name: name,
        time: time,
        instrumentationKey: ikey,
        version: 1,
        sampleRate: sampleRate,
        data: {
          baseType: baseType,
          baseData: baseData,
        },
        tags: tags,
      };
      envelopes.push(env);
    });
  }
  return envelopes;
}
