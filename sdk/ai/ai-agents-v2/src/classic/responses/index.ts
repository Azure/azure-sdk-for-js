// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  listResponses,
  listInputItems,
  cancelResponse,
  deleteResponse,
  getResponseStream,
  getResponse,
  createResponseStream,
  createResponse,
} from "../../api/responses/operations.js";
import {
  ResponsesListResponsesOptionalParams,
  ResponsesListInputItemsOptionalParams,
  ResponsesCancelResponseOptionalParams,
  ResponsesDeleteResponseOptionalParams,
  ResponsesGetResponseStreamOptionalParams,
  ResponsesGetResponseOptionalParams,
  ResponsesCreateResponseStreamOptionalParams,
  ResponsesCreateResponseOptionalParams,
} from "../../api/responses/options.js";
import {
  ItemResourceUnion,
  Response,
  CreateResponseRequest,
  ResponseStreamEventUnion,
  DeleteResponseResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Responses operations. */
export interface ResponsesOperations {
  /** Returns the list of all responses. */
  listResponses: (
    options?: ResponsesListResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<Response>;
  /** Returns a list of input items for a given response. */
  listInputItems: (
    responseId: string,
    options?: ResponsesListInputItemsOptionalParams,
  ) => PagedAsyncIterableIterator<ItemResourceUnion>;
  /** Cancels a model response. */
  cancelResponse: (
    responseId: string,
    options?: ResponsesCancelResponseOptionalParams,
  ) => Promise<Response>;
  /** Deletes a model response. */
  deleteResponse: (
    responseId: string,
    options?: ResponsesDeleteResponseOptionalParams,
  ) => Promise<DeleteResponseResult>;
  /** Retrieves a model response with the given ID (streaming response). */
  getResponseStream: (
    responseId: string,
    options?: ResponsesGetResponseStreamOptionalParams,
  ) => Promise<ResponseStreamEventUnion>;
  /** Retrieves a model response with the given ID. */
  getResponse: (
    responseId: string,
    options?: ResponsesGetResponseOptionalParams,
  ) => Promise<Response>;
  /** Creates a model response (streaming response). */
  createResponseStream: (
    request: CreateResponseRequest,
    options?: ResponsesCreateResponseStreamOptionalParams,
  ) => Promise<ResponseStreamEventUnion>;
  /** Creates a model response. */
  createResponse: (
    options?: ResponsesCreateResponseOptionalParams,
  ) => Promise<Response>;
}

function _getResponses(context: AgentsContext) {
  return {
    listResponses: (options?: ResponsesListResponsesOptionalParams) =>
      listResponses(context, options),
    listInputItems: (
      responseId: string,
      options?: ResponsesListInputItemsOptionalParams,
    ) => listInputItems(context, responseId, options),
    cancelResponse: (
      responseId: string,
      options?: ResponsesCancelResponseOptionalParams,
    ) => cancelResponse(context, responseId, options),
    deleteResponse: (
      responseId: string,
      options?: ResponsesDeleteResponseOptionalParams,
    ) => deleteResponse(context, responseId, options),
    getResponseStream: (
      responseId: string,
      options?: ResponsesGetResponseStreamOptionalParams,
    ) => getResponseStream(context, responseId, options),
    getResponse: (
      responseId: string,
      options?: ResponsesGetResponseOptionalParams,
    ) => getResponse(context, responseId, options),
    createResponseStream: (
      request: CreateResponseRequest,
      options?: ResponsesCreateResponseStreamOptionalParams,
    ) => createResponseStream(context, request, options),
    createResponse: (options?: ResponsesCreateResponseOptionalParams) =>
      createResponse(context, options),
  };
}

export function _getResponsesOperations(
  context: AgentsContext,
): ResponsesOperations {
  return {
    ..._getResponses(context),
  };
}
