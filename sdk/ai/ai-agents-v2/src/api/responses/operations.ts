// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  reasoningSerializer,
  toolUnionArraySerializer,
  apiErrorDeserializer,
  ItemResourceUnion,
  _AgentsPagedResultItemResource,
  _agentsPagedResultItemResourceDeserializer,
  _createResponseRequestTextSerializer,
  promptSerializer,
  agentReferenceSerializer,
  _createResponseRequestToolChoiceSerializer,
  _createResponseRequestInputSerializer,
  _createResponseRequestConversationSerializer,
  Response,
  responseDeserializer,
  CreateResponseRequest,
  createResponseRequestSerializer,
  responseStreamEventUnionDeserializer,
  ResponseStreamEventUnion,
  DeleteResponseResult,
  deleteResponseResultDeserializer,
  _AgentsPagedResultResponse,
  _agentsPagedResultResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ResponsesListResponsesOptionalParams,
  ResponsesListInputItemsOptionalParams,
  ResponsesCancelResponseOptionalParams,
  ResponsesDeleteResponseOptionalParams,
  ResponsesGetResponseStreamOptionalParams,
  ResponsesGetResponseOptionalParams,
  ResponsesCreateResponseStreamOptionalParams,
  ResponsesCreateResponseOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listResponsesSend(
  context: Client,
  options: ResponsesListResponsesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses{?api-version,limit,order,after,before,agent_name,agent_id,conversation_id}",
    {
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      agent_name: options?.agentName,
      agent_id: options?.agentId,
      conversation_id: options?.conversationId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listResponsesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultResponseDeserializer(result.body);
}

/** Returns the list of all responses. */
export function listResponses(
  context: Client,
  options: ResponsesListResponsesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Response> {
  return buildPagedAsyncIterator(
    context,
    () => _listResponsesSend(context, options),
    _listResponsesDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _listInputItemsSend(
  context: Client,
  responseId: string,
  options: ResponsesListInputItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses/{response_id}/input_items{?api-version,limit,order,after,before}",
    {
      response_id: responseId,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listInputItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultItemResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultItemResourceDeserializer(result.body);
}

/** Returns a list of input items for a given response. */
export function listInputItems(
  context: Client,
  responseId: string,
  options: ResponsesListInputItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ItemResourceUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listInputItemsSend(context, responseId, options),
    _listInputItemsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _cancelResponseSend(
  context: Client,
  responseId: string,
  options: ResponsesCancelResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses/{response_id}/cancel{?api-version}",
    {
      response_id: responseId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _cancelResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return responseDeserializer(result.body);
}

/** Cancels a model response. */
export async function cancelResponse(
  context: Client,
  responseId: string,
  options: ResponsesCancelResponseOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _cancelResponseSend(context, responseId, options);
  return _cancelResponseDeserialize(result);
}

export function _deleteResponseSend(
  context: Client,
  responseId: string,
  options: ResponsesDeleteResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses/{response_id}{?api-version}",
    {
      response_id: responseId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteResponseResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return deleteResponseResultDeserializer(result.body);
}

/** Deletes a model response. */
export async function deleteResponse(
  context: Client,
  responseId: string,
  options: ResponsesDeleteResponseOptionalParams = { requestOptions: {} },
): Promise<DeleteResponseResult> {
  const result = await _deleteResponseSend(context, responseId, options);
  return _deleteResponseDeserialize(result);
}

export function _getResponseStreamSend(
  context: Client,
  responseId: string,
  options: ResponsesGetResponseStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses/{response_id}{?include%5B%5D*,starting_after}",
    {
      response_id: responseId,
      "include%5B%5D": !options?.includables
        ? options?.includables
        : options?.includables.map((p: any) => {
            return p;
          }),
      starting_after: options?.startingAfter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "text/event-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getResponseStreamDeserialize(
  result: PathUncheckedResponse,
): Promise<ResponseStreamEventUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return responseStreamEventUnionDeserializer(result.body);
}

/** Retrieves a model response with the given ID (streaming response). */
export async function getResponseStream(
  context: Client,
  responseId: string,
  options: ResponsesGetResponseStreamOptionalParams = { requestOptions: {} },
): Promise<ResponseStreamEventUnion> {
  const result = await _getResponseStreamSend(context, responseId, options);
  return _getResponseStreamDeserialize(result);
}

export function _getResponseSend(
  context: Client,
  responseId: string,
  options: ResponsesGetResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses/{response_id}{?api-version,include%5B%5D*,stream,starting_after}",
    {
      response_id: responseId,
      "api-version": context.apiVersion,
      "include%5B%5D": !options?.includables
        ? options?.includables
        : options?.includables.map((p: any) => {
            return p;
          }),
      stream: options?.stream,
      starting_after: options?.startingAfter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return responseDeserializer(result.body);
}

/** Retrieves a model response with the given ID. */
export async function getResponse(
  context: Client,
  responseId: string,
  options: ResponsesGetResponseOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _getResponseSend(context, responseId, options);
  return _getResponseDeserialize(result);
}

export function _createResponseStreamSend(
  context: Client,
  request: CreateResponseRequest,
  options: ResponsesCreateResponseStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context
    .path("/openai/responses")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "text/event-stream",
        ...options.requestOptions?.headers,
      },
      body: createResponseRequestSerializer(request),
    });
}

export async function _createResponseStreamDeserialize(
  result: PathUncheckedResponse,
): Promise<ResponseStreamEventUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return responseStreamEventUnionDeserializer(result.body);
}

/** Creates a model response (streaming response). */
export async function createResponseStream(
  context: Client,
  request: CreateResponseRequest,
  options: ResponsesCreateResponseStreamOptionalParams = { requestOptions: {} },
): Promise<ResponseStreamEventUnion> {
  const result = await _createResponseStreamSend(context, request, options);
  return _createResponseStreamDeserialize(result);
}

export function _createResponseSend(
  context: Client,
  options: ResponsesCreateResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/openai/responses{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      metadata: options?.metadata,
      temperature: options?.temperature,
      top_p: options?.topP,
      user: options?.user,
      service_tier: options?.serviceTier,
      top_logprobs: options?.topLogprobs,
      previous_response_id: options?.previousResponseId,
      model: options?.model,
      reasoning: !options?.reasoning
        ? options?.reasoning
        : reasoningSerializer(options?.reasoning),
      background: options?.background,
      max_output_tokens: options?.maxOutputTokens,
      max_tool_calls: options?.maxToolCalls,
      text: !options?.text
        ? options?.text
        : _createResponseRequestTextSerializer(options?.text),
      tools: !options?.tools
        ? options?.tools
        : toolUnionArraySerializer(options?.tools),
      tool_choice: !options?.toolChoice
        ? options?.toolChoice
        : _createResponseRequestToolChoiceSerializer(options?.toolChoice),
      prompt: !options?.prompt
        ? options?.prompt
        : promptSerializer(options?.prompt),
      truncation: options?.truncation,
      input: !options?.input
        ? options?.input
        : _createResponseRequestInputSerializer(options?.input),
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      parallel_tool_calls: options?.parallelToolCalls,
      store: options?.store,
      instructions: options?.instructions,
      stream: options?.stream,
      conversation: !options?.conversation
        ? options?.conversation
        : _createResponseRequestConversationSerializer(options?.conversation),
      agent: !options?.agent
        ? options?.agent
        : agentReferenceSerializer(options?.agent),
    },
  });
}

export async function _createResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<Response> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return responseDeserializer(result.body);
}

/** Creates a model response. */
export async function createResponse(
  context: Client,
  options: ResponsesCreateResponseOptionalParams = { requestOptions: {} },
): Promise<Response> {
  const result = await _createResponseSend(context, options);
  return _createResponseDeserialize(result);
}
