// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KnowledgeBaseRetrievalContext as Client } from "./index.js";
import {
  KnowledgeBaseRetrievalRequest,
  knowledgeBaseRetrievalRequestSerializer,
  KnowledgeBaseRetrievalResponse,
  knowledgeBaseRetrievalResponseDeserializer,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import { getBinaryResponse } from "../../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RetrieveStreamOptionalParams, RetrieveOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _retrieveStreamSend(
  context: Client,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}')/retrieve{?api%2Dversion}",
    {
      knowledgeBaseName: context.knowledgeBaseName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body;
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
): Promise<Uint8Array> {
  const streamableMethod = _retrieveStreamSend(context, retrievalRequest, options);
  const result = await getBinaryResponse(streamableMethod);
  return _retrieveStreamDeserialize(result);
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
