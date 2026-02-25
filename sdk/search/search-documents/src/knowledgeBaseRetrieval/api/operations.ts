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
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RetrieveOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _retrieveSend(
  context: Client,
  knowledgeBaseName: string,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}')/retrieve{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeBaseRetrievalResponseDeserializer(result.body);
}

/** KnowledgeBase retrieves relevant data from backing stores. */
export async function retrieve(
  context: Client,
  knowledgeBaseName: string,
  retrievalRequest: KnowledgeBaseRetrievalRequest,
  options: RetrieveOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBaseRetrievalResponse> {
  const result = await _retrieveSend(context, knowledgeBaseName, retrievalRequest, options);
  return _retrieveDeserialize(result);
}
