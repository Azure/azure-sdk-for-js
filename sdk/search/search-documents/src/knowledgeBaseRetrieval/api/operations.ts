// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KnowledgeBaseRetrievalContext as Client } from "./index.js";
import type {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import {
  knowledgeBaseRetrievalRequestSerializer,
  knowledgeBaseRetrievalResponseDeserializer,
} from "../../models/azure/search/documents/knowledgeBases/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RetrieveOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
        ? { accept: "application/json;odata.metadata=minimal" }
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
