// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "url";
import { ReadableSpan } from "@opentelemetry/tracing";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { diag, SpanKind, SpanStatusCode, Link } from "@opentelemetry/api";
import { SERVICE_RESOURCE } from "@opentelemetry/resources";
import { Tags, Properties, MSLink, Measurements } from "../types";
import {
  HTTP_METHOD,
  HTTP_ROUTE,
  HTTP_URL,
  HTTP_STATUS_CODE
} from "./constants/span/httpAttributes";
import {
  AI_CLOUD_ROLE,
  AI_CLOUD_ROLE_INSTACE,
  AI_OPERATION_ID,
  AI_OPERATION_PARENT_ID,
  AI_OPERATION_NAME,
  MS_LINKS,
  INPROC
} from "./constants/applicationinsights";
import {
  GRPC_ERROR_MESSAGE,
  GRPC_ERROR_NAME,
  GRPC_METHOD,
  GRPC_STATUS_CODE
} from "./constants/span/grpcAttributes";
import { msToTimeSpan } from "./breezeUtils";
import { getInstance } from "../platform";
import { DB_STATEMENT, DB_TYPE, DB_INSTANCE } from "./constants/span/dbAttributes";
import { parseEventHubSpan } from "./eventhub";
import { AzNamespace, MicrosoftEventHub } from "./constants/span/azAttributes";
import { RemoteDependencyData, RequestData, TelemetryItem as Envelope } from "../generated";

function createTagsFromSpan(span: ReadableSpan): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };

  tags[AI_OPERATION_ID] = span.spanContext.traceId;
  if (span.parentSpanId) {
    tags[AI_OPERATION_PARENT_ID] = span.parentSpanId;
  }
  if (span.resource && span.resource.attributes) {
    const serviceName = span.resource.attributes[SERVICE_RESOURCE.NAME];
    const serviceNamespace = span.resource.attributes[SERVICE_RESOURCE.NAMESPACE];
    const serviceInstanceId = span.resource.attributes[SERVICE_RESOURCE.INSTANCE_ID];
    if (serviceName) {
      if (serviceNamespace) {
        tags[AI_CLOUD_ROLE] = `${serviceNamespace}.${serviceName}`;
      } else {
        tags[AI_CLOUD_ROLE] = String(serviceName);
      }
    }
    if (serviceInstanceId) {
      tags[AI_CLOUD_ROLE_INSTACE] = String(serviceInstanceId);
    }
  }

  // @todo: is this for RequestData only?
  if (
    (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) &&
    span.attributes[GRPC_METHOD]
  ) {
    tags[AI_OPERATION_NAME] = String(span.attributes[GRPC_METHOD]);
  }
  if (
    (span.kind === SpanKind.SERVER || span.kind === SpanKind.CONSUMER) &&
    span.attributes[HTTP_METHOD] &&
    span.attributes[HTTP_ROUTE]
  ) {
    tags[AI_OPERATION_NAME] = `${span.attributes[HTTP_METHOD] as string} ${span.attributes[
      HTTP_ROUTE
    ] as string}`;
  }
  return tags;
}

function createPropertiesFromSpan(span: ReadableSpan): [Properties, Measurements] {
  const properties: Properties = {};
  const measurements: Measurements = {};

  for (const key of Object.keys(span.attributes)) {
    if (
      key === GRPC_ERROR_MESSAGE ||
      key === GRPC_ERROR_NAME ||
      !(key.startsWith("http.") || key.startsWith("grpc.") || key.startsWith("db."))
    ) {
      properties[key] = span.attributes[key] as string;
    }
  }

  const links: MSLink[] = span.links.map((link: Link) => ({
    operation_Id: link.context.traceId,
    id: link.context.spanId
  }));

  if (links.length > 0) {
    properties[MS_LINKS] = JSON.stringify(links);
  }

  return [properties, measurements];
}

function createDependencyData(span: ReadableSpan): RemoteDependencyData {
  const data: RemoteDependencyData = {
    name: span.name,
    id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
    success: span.status.code === SpanStatusCode.OK,
    resultCode: String(span.status.code),
    target: span.attributes[HTTP_URL] as string | undefined,
    type: "Dependency",
    duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
    version: 1
  };

  if (span.attributes[HTTP_STATUS_CODE]) {
    data.type = "HTTP";
    data.resultCode = String(span.attributes[HTTP_STATUS_CODE]);
  }

  if (span.attributes[GRPC_STATUS_CODE] !== undefined) {
    data.type = "GRPC";
    data.resultCode = String(span.attributes[GRPC_STATUS_CODE]);
  }

  if (span.attributes[GRPC_METHOD]) {
    data.target = String(span.attributes[GRPC_METHOD]);
    data.data = String(span.attributes[GRPC_METHOD]);
  }

  if (span.attributes[HTTP_URL]) {
    const url = new URL(span.attributes[HTTP_URL] as string);
    data.target = url.hostname;
    data.data = url.href;

    if (span.attributes[HTTP_METHOD]) {
      data.name = `${span.attributes[HTTP_METHOD] as string} ${url.pathname}`;
    }
  }

  if (span.attributes[DB_STATEMENT]) {
    data.name = String(span.attributes[DB_STATEMENT]);
    data.data = String(span.attributes[DB_STATEMENT]);
    if (span.attributes[DB_TYPE]) {
      data.type = String(span.attributes[DB_TYPE]);
    } else {
      data.type = "DB";
    }

    if (span.attributes[DB_INSTANCE]) {
      data.target = String(span.attributes[DB_INSTANCE]);
    }
  }

  return data;
}

function createRequestData(span: ReadableSpan): RequestData {
  const data: RequestData = {
    name: span.name,
    id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
    success: span.status.code === SpanStatusCode.OK,
    responseCode: String(span.status.code),
    duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
    version: 1,
    source: undefined
  };

  if (span.attributes[HTTP_METHOD]) {
    data.name = span.attributes[HTTP_METHOD] as string;

    if (span.attributes[HTTP_STATUS_CODE]) {
      data.responseCode = String(span.attributes[HTTP_STATUS_CODE]);
    }

    if (span.attributes[HTTP_URL]) {
      data.url = span.attributes[HTTP_URL] as string;
    }

    if (span.attributes[HTTP_ROUTE]) {
      data.name = `${span.attributes[HTTP_METHOD] as string} ${span.attributes[
        HTTP_ROUTE
      ] as string}`;
    } else if (span.attributes[HTTP_URL]) {
      const url = new URL(span.attributes[HTTP_URL] as string);
      data.name = `${span.attributes[HTTP_METHOD] as string} ${url.pathname}`;
    }
  }

  if (span.attributes[GRPC_STATUS_CODE]) {
    data.responseCode = String(span.attributes[GRPC_STATUS_CODE]);
  }
  if (span.attributes[GRPC_METHOD]) {
    data.url = String(span.attributes[GRPC_METHOD]);
  }

  return data;
}

function createInProcData(span: ReadableSpan): RemoteDependencyData {
  const data = createDependencyData(span);
  data.type = INPROC;
  data.success = true;
  return data;
}

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
      name = "Microsoft.ApplicationInsights.RemoteDependency";
      baseType = "RemoteDependencyData";
      baseData = createDependencyData(span);
      break;
    case SpanKind.SERVER:
    case SpanKind.CONSUMER:
      name = "Microsoft.ApplicationInsights.Request";
      baseType = "RequestData";
      baseData = createRequestData(span);
      break;
    case SpanKind.INTERNAL:
      baseType = "RemoteDependencyData";
      name = "Microsoft.ApplicationInsights.RemoteDependency";
      baseData = createInProcData(span);
      break;
    default:
      // never
      diag.error(`Unsupported span kind ${span.kind}`);
      throw new Error(`Unsupported span kind ${span.kind}`);
  }

  if (span.attributes[AzNamespace] === MicrosoftEventHub) {
    parseEventHubSpan(span, baseData);
  } else if (span.attributes[AzNamespace]) {
    switch (span.kind) {
      case SpanKind.INTERNAL:
        (baseData as RemoteDependencyData).type = `${INPROC} | ${span.attributes[AzNamespace]}`;
        break;
      default: // no op
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
        measurements
      }
    }
  };
}
