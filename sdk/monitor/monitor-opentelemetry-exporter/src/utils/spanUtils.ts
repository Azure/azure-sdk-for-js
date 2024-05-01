// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "url";
import { ReadableSpan, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { diag, SpanKind, SpanStatusCode, Link, Attributes } from "@opentelemetry/api";
import { SemanticAttributes, DbSystemValues } from "@opentelemetry/semantic-conventions";

import { createTagsFromResource, getDependencyTarget, getUrl, isSqlDB } from "./common";
import { Tags, Properties, MSLink, Measurements } from "../types";
import { msToTimeSpan } from "./breezeUtils";
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

function createTagsFromSpan(span: ReadableSpan): Tags {
  const tags: Tags = createTagsFromResource(span.resource);
  tags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
  if (span.parentSpanId) {
    tags[KnownContextTagKeys.AiOperationParentId] = span.parentSpanId;
  }
  const httpUserAgent = span.attributes[SemanticAttributes.HTTP_USER_AGENT];
  if (httpUserAgent) {
    // TODO: Not exposed in Swagger, need to update def
    tags["ai.user.userAgent"] = String(httpUserAgent);
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
          key === SemanticAttributes.RPC_GRPC_STATUS_CODE
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
        remoteDependencyData.name = `${httpMethod} ${dependencyUrl.pathname}`;
      } catch (ex: any) {}
    }
    remoteDependencyData.type = DependencyTypes.Http;
    remoteDependencyData.data = getUrl(span.attributes);
    const httpStatusCode = span.attributes[SemanticAttributes.HTTP_STATUS_CODE];
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
    const target = getDependencyTarget(span.attributes);
    const dbName = span.attributes[SemanticAttributes.DB_NAME];
    if (target) {
      remoteDependencyData.target = dbName ? `${target}|${dbName}` : `${target}`;
    } else {
      remoteDependencyData.target = dbName ? `${dbName}` : `${dbSystem}`;
    }
  }
  // grpc Dependency
  else if (rpcSystem) {
    remoteDependencyData.type = DependencyTypes.Grpc;
    const grpcStatusCode = span.attributes[SemanticAttributes.RPC_GRPC_STATUS_CODE];
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
  const httpMethod = span.attributes[SemanticAttributes.HTTP_METHOD];
  const grpcStatusCode = span.attributes[SemanticAttributes.RPC_GRPC_STATUS_CODE];
  if (httpMethod) {
    requestData.url = getUrl(span.attributes);
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
      const time = new Date(hrTimeToMilliseconds(event.time));
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
      if (event.name === "exception" && span.kind === SpanKind.SERVER) {
        name = "Microsoft.ApplicationInsights.Exception";
        baseType = "ExceptionData";
        let typeName = "";
        let message = "Exception";
        let stack = "";
        let hasFullStack = false;
        if (event.attributes) {
          typeName = String(event.attributes[SemanticAttributes.EXCEPTION_TYPE]);
          stack = String(event.attributes[SemanticAttributes.EXCEPTION_STACKTRACE]);
          if (stack) {
            hasFullStack = true;
          }
          const exceptionMsg = event.attributes[SemanticAttributes.EXCEPTION_MESSAGE];
          if (exceptionMsg) {
            message = String(exceptionMsg);
          }
          const escaped = event.attributes[SemanticAttributes.EXCEPTION_ESCAPED];
          if (escaped !== undefined) {
            properties[SemanticAttributes.EXCEPTION_ESCAPED] = String(escaped);
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
