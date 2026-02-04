// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  ModelIdsCompaction,
  _modelIdsCompactionSerializer,
  _compactResponseMethodPublicBodyInputSerializer,
  CompactResource,
  compactResourceDeserializer,
} from "../../models/models.js";
import { ResponsesCompactResponseConversationOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _compactResponseConversationSend(
  context: Client,
  model: ModelIdsCompaction,
  options: ResponsesCompactResponseConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path("/openai/v1/responses/compact")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        model: !model ? model : _modelIdsCompactionSerializer(model),
        input: !options?.input
          ? options?.input
          : _compactResponseMethodPublicBodyInputSerializer(options?.input),
        previous_response_id: options?.previousResponseId,
        instructions: options?.instructions,
      },
    });
}

export async function _compactResponseConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<CompactResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return compactResourceDeserializer(result.body);
}

/** Produces a compaction of a responses conversation. */
export async function compactResponseConversation(
  context: Client,
  model: ModelIdsCompaction,
  options: ResponsesCompactResponseConversationOptionalParams = { requestOptions: {} },
): Promise<CompactResource> {
  const result = await _compactResponseConversationSend(context, model, options);
  return _compactResponseConversationDeserialize(result);
}
