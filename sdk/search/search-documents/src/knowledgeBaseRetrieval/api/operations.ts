// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KnowledgeBaseRetrievalContext as Client } from "./index.js";
import type {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
  KnowledgeBaseRetrievalStartedEvent,
  KnowledgeBaseActivityStartedEvent,
  KnowledgeBaseActivityRecordUnion,
  KnowledgeBaseAnswerCompletedEvent,
  KnowledgeBaseReferenceUnion,
  KnowledgeBaseStreamErrorEvent,
  KnowledgeBaseResponseCompletedEvent,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import {
  knowledgeBaseRetrievalRequestSerializer,
  knowledgeBaseRetrievalResponseDeserializer,
  knowledgeBaseRetrievalStartedEventDeserializer,
  knowledgeBaseActivityStartedEventDeserializer,
  knowledgeBaseActivityRecordUnionDeserializer,
  knowledgeBaseAnswerCompletedEventDeserializer,
  knowledgeBaseReferenceUnionArrayDeserializer,
  knowledgeBaseStreamErrorEventDeserializer,
  knowledgeBaseResponseCompletedEventDeserializer,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import {
  getSseResponse,
  parseSseErrorResponse,
  cancelSseResponse,
} from "#platform/static-helpers/getSseResponse";
import {
  readSseStream,
  type SseEventDescriptor,
} from "#platform/static-helpers/sseStreamingHelpers";
import { createSseStream, type EventMessage } from "@azure/core-sse";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RetrieveStreamOptionalParams, RetrieveOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _retrieveStreamSend(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}')/retrieve{?api%2Dversion}",
    {
      knowledgeBaseName: context.knowledgeBaseName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "text/event-stream",
      ...(options?.querySourceAuthorization !== undefined
        ? { "x-ms-query-source-authorization": options?.querySourceAuthorization }
        : {}),
      ...(options?.queryWorkIQSourceAuthorization !== undefined
        ? { "x-ms-query-work-iq-source-authorization": options?.queryWorkIQSourceAuthorization }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: knowledgeBaseRetrievalRequestSerializer(retrievalRequest),
  });
}

export async function _retrieveStreamDeserialize(
  events: AsyncIterable<EventMessage>,
  descriptors: SseEventDescriptor<
    | { event: "retrieval.started"; data: KnowledgeBaseRetrievalStartedEvent }
    | { event: "activity.started"; data: KnowledgeBaseActivityStartedEvent }
    | { event: "activity.completed"; data: KnowledgeBaseActivityRecordUnion }
    | { event: "answer.completed"; data: KnowledgeBaseAnswerCompletedEvent }
    | { event: "references.completed"; data: KnowledgeBaseReferenceUnion[] }
    | { event: "error"; data: KnowledgeBaseStreamErrorEvent }
    | { event: "response.completed"; data: KnowledgeBaseResponseCompletedEvent }
  >[],
): Promise<
  AsyncIterable<
    | { event: "retrieval.started"; data: KnowledgeBaseRetrievalStartedEvent }
    | { event: "activity.started"; data: KnowledgeBaseActivityStartedEvent }
    | { event: "activity.completed"; data: KnowledgeBaseActivityRecordUnion }
    | { event: "answer.completed"; data: KnowledgeBaseAnswerCompletedEvent }
    | { event: "references.completed"; data: KnowledgeBaseReferenceUnion[] }
    | { event: "error"; data: KnowledgeBaseStreamErrorEvent }
    | { event: "response.completed"; data: KnowledgeBaseResponseCompletedEvent }
  >
> {
  return readSseStream(events, descriptors);
}

/**
 * Retrieves relevant data from backing stores and streams progress and results as server-sent
 * events.
 *
 * Narrow on the `event` property to access each typed payload. The stream closes at either
 * `response.completed` or `error`, or when iteration ends early.
 *
 * @param context - The retrieval client context.
 * @param retrievalRequest - The retrieval request to process.
 * @param options - Options for the streaming retrieval operation.
 * @returns An async iterable of typed server-sent events.
 */
export async function retrieveStream(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveStreamOptionalParams = { requestOptions: {} },
): Promise<
  AsyncIterable<
    | { event: "retrieval.started"; data: KnowledgeBaseRetrievalStartedEvent }
    | { event: "activity.started"; data: KnowledgeBaseActivityStartedEvent }
    | { event: "activity.completed"; data: KnowledgeBaseActivityRecordUnion }
    | { event: "answer.completed"; data: KnowledgeBaseAnswerCompletedEvent }
    | { event: "references.completed"; data: KnowledgeBaseReferenceUnion[] }
    | { event: "error"; data: KnowledgeBaseStreamErrorEvent }
    | { event: "response.completed"; data: KnowledgeBaseResponseCompletedEvent }
  >
> {
  const response = await getSseResponse(_retrieveStreamSend(context, retrievalRequest, options));
  if (response.status !== "200") {
    const result = await parseSseErrorResponse(response);
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }
    throw error;
  }

  const responseContentType = Object.entries(response.headers)
    .find(([name]) => name.toLowerCase() === "content-type")?.[1]
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (responseContentType !== "text/event-stream" || !response.body) {
    const error = createRestError(response);
    try {
      await cancelSseResponse(response);
    } catch (cleanupError) {
      throw new AggregateError([error, cleanupError], "Unable to cancel invalid SSE response.", {
        cause: cleanupError,
      });
    }
    throw error;
  }

  const descriptors: SseEventDescriptor<
    | { event: "retrieval.started"; data: KnowledgeBaseRetrievalStartedEvent }
    | { event: "activity.started"; data: KnowledgeBaseActivityStartedEvent }
    | { event: "activity.completed"; data: KnowledgeBaseActivityRecordUnion }
    | { event: "answer.completed"; data: KnowledgeBaseAnswerCompletedEvent }
    | { event: "references.completed"; data: KnowledgeBaseReferenceUnion[] }
    | { event: "error"; data: KnowledgeBaseStreamErrorEvent }
    | { event: "response.completed"; data: KnowledgeBaseResponseCompletedEvent }
  >[] = [
    {
      eventName: "retrieval.started",
      isTerminal: false,
      deserialize: (data) => ({
        event: "retrieval.started",
        data: knowledgeBaseRetrievalStartedEventDeserializer(data),
      }),
    },
    {
      eventName: "activity.started",
      isTerminal: false,
      deserialize: (data) => ({
        event: "activity.started",
        data: knowledgeBaseActivityStartedEventDeserializer(data),
      }),
    },
    {
      eventName: "activity.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "activity.completed",
        data: knowledgeBaseActivityRecordUnionDeserializer(data),
      }),
    },
    {
      eventName: "answer.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "answer.completed",
        data: knowledgeBaseAnswerCompletedEventDeserializer(data),
      }),
    },
    {
      eventName: "references.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "references.completed",
        data: knowledgeBaseReferenceUnionArrayDeserializer(data),
      }),
    },
    {
      eventName: "error",
      isTerminal: true,
      deserialize: (data) => ({
        event: "error",
        data: knowledgeBaseStreamErrorEventDeserializer(data),
      }),
    },
    {
      eventName: "response.completed",
      isTerminal: true,
      deserialize: (data) => ({
        event: "response.completed",
        data: knowledgeBaseResponseCompletedEventDeserializer(data),
      }),
    },
  ];
  return _retrieveStreamDeserialize(createSseStream(response.body), descriptors);
}

export function _retrieveSend(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}')/retrieve{?api%2Dversion}",
    {
      knowledgeBaseName: context.knowledgeBaseName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.accept !== undefined
        ? {
            accept: !options?.accept ? options?.accept : "application/json;odata.metadata=minimal",
          }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? { "x-ms-query-source-authorization": options?.querySourceAuthorization }
        : {}),
      ...(options?.queryWorkIQSourceAuthorization !== undefined
        ? { "x-ms-query-work-iq-source-authorization": options?.queryWorkIQSourceAuthorization }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: knowledgeBaseRetrievalRequestSerializer(retrievalRequest),
  });
}

export async function _retrieveDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBaseRetrievalResponse> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return knowledgeBaseRetrievalResponseDeserializer(result.body);
}

/** KnowledgeBase retrieves relevant data from backing stores. */
export async function retrieve(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBaseRetrievalResponse> {
  const result = await _retrieveSend(context, retrievalRequest, options);
  return _retrieveDeserialize(result);
}
