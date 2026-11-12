// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KnowledgeBaseRetrievalContext as Client } from "./index.js";
import {
  KnowledgeBaseRetrievalRequest,
  knowledgeBaseRetrievalRequestSerializer,
  KnowledgeBaseRetrievalResponse,
  knowledgeBaseRetrievalResponseDeserializer,
  knowledgeBaseActivityRecordUnionDeserializer,
  KnowledgeBaseActivityRecordUnion,
  knowledgeBaseReferenceUnionArrayDeserializer,
  KnowledgeBaseReferenceUnion,
  KnowledgeBaseRetrievalStartedEvent,
  knowledgeBaseRetrievalStartedEventDeserializer,
  KnowledgeBaseActivityStartedEvent,
  knowledgeBaseActivityStartedEventDeserializer,
  KnowledgeBaseAnswerCompletedEvent,
  knowledgeBaseAnswerCompletedEventDeserializer,
  KnowledgeBaseStreamErrorEvent,
  knowledgeBaseStreamErrorEventDeserializer,
  KnowledgeBaseResponseCompletedEvent,
  knowledgeBaseResponseCompletedEventDeserializer,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import {
  getSseResponse,
  parseSseErrorResponse,
  cancelSseResponse,
} from "../../static-helpers/getSseResponse.js";
import { SseEventDescriptor, readSseStream } from "../../static-helpers/sseStreamingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RetrieveStreamOptionalParams, RetrieveOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { createSseStream, EventMessage } from "@azure/core-sse";

export function _retrieveStreamSend(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}')/retrieve{?api%2Dversion}",
    {
      knowledgeBaseName: context.knowledgeBaseName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
 * Process the response incrementally using server-sent event framing. Each event contains an
 * event name and a JSON-encoded data payload. The stream ends with either a `response.completed`
 * event or an `error` event. OpenAPI 2.0 represents the response body as a string, so generated
 * clients may expose the raw response without typed event parsing. Do not deserialize the
 * complete response body as a single JSON document.
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
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(response.status)) {
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
        cause: error,
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
      contentType: "application/json",
    },
    {
      eventName: "activity.started",
      isTerminal: false,
      deserialize: (data) => ({
        event: "activity.started",
        data: knowledgeBaseActivityStartedEventDeserializer(data),
      }),
      contentType: "application/json",
    },
    {
      eventName: "activity.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "activity.completed",
        data: knowledgeBaseActivityRecordUnionDeserializer(data),
      }),
      contentType: "application/json",
    },
    {
      eventName: "answer.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "answer.completed",
        data: knowledgeBaseAnswerCompletedEventDeserializer(data),
      }),
      contentType: "application/json",
    },
    {
      eventName: "references.completed",
      isTerminal: false,
      deserialize: (data) => ({
        event: "references.completed",
        data: knowledgeBaseReferenceUnionArrayDeserializer(data),
      }),
      contentType: "application/json",
    },
    {
      eventName: "error",
      isTerminal: true,
      deserialize: (data) => ({
        event: "error",
        data: knowledgeBaseStreamErrorEventDeserializer(data),
      }),
      contentType: "application/json",
    },
    {
      eventName: "response.completed",
      isTerminal: true,
      deserialize: (data) => ({
        event: "response.completed",
        data: knowledgeBaseResponseCompletedEventDeserializer(data),
      }),
      contentType: "application/json",
    },
  ];
  const eventStream = createSseStream(response.body);
  return _retrieveStreamDeserialize(eventStream, descriptors);
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
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
