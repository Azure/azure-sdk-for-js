// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BookshelfContext } from "../../api/bookshelfContext.js";
import {
  KnowledgeBase,
  KnowledgeBaseCreateOrUpdateContent,
  KnowledgeBaseOperationResponseUnion,
  SearchRequest,
  KnowledgeBaseSearchOperationResponse,
} from "../../../models/microsoft/discovery/bookshelf/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import {
  $delete,
  search,
  cancelIndexing,
  startIndexing,
  getOperationStatus,
  list,
  get,
  createOrUpdate,
} from "../../api/knowledgeBases/operations.js";
import {
  KnowledgeBasesDeleteOptionalParams,
  KnowledgeBasesSearchOptionalParams,
  KnowledgeBasesCancelIndexingOptionalParams,
  KnowledgeBasesStartIndexingOptionalParams,
  KnowledgeBasesGetOperationStatusOptionalParams,
  KnowledgeBasesListOptionalParams,
  KnowledgeBasesGetOptionalParams,
  KnowledgeBasesCreateOrUpdateOptionalParams,
} from "../../api/knowledgeBases/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a KnowledgeBases operations. */
export interface KnowledgeBasesOperations {
  /** Delete a KnowledgeBase. */
  deleteKnowledgeBase: (
    knowledgeBaseName: string,
    options?: KnowledgeBasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Search the knowledge base. */
  search: (
    knowledgeBaseName: string,
    body: SearchRequest,
    options?: KnowledgeBasesSearchOptionalParams,
  ) => PollerLike<
    OperationState<KnowledgeBaseSearchOperationResponse>,
    KnowledgeBaseSearchOperationResponse
  >;
  /** Cancel indexing. */
  cancelIndexing: (
    knowledgeBaseName: string,
    options?: KnowledgeBasesCancelIndexingOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Start indexing. */
  startIndexing: (
    knowledgeBaseName: string,
    options?: KnowledgeBasesStartIndexingOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get the status of a long-running operation. */
  getOperationStatus: (
    knowledgeBaseName: string,
    operationId: string,
    options?: KnowledgeBasesGetOperationStatusOptionalParams,
  ) => Promise<KnowledgeBaseOperationResponseUnion>;
  /** List KnowledgeBase resources */
  list: (options?: KnowledgeBasesListOptionalParams) => PagedAsyncIterableIterator<KnowledgeBase>;
  /** Fetch a KnowledgeBase by name. */
  get: (
    knowledgeBaseName: string,
    options?: KnowledgeBasesGetOptionalParams,
  ) => Promise<KnowledgeBase>;
  /** Creates or updates a KnowledgeBase. */
  createOrUpdate: (
    knowledgeBaseName: string,
    resource: KnowledgeBaseCreateOrUpdateContent,
    options?: KnowledgeBasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<KnowledgeBase>, KnowledgeBase>;
}
function _getKnowledgeBases(context: BookshelfContext) {
  return {
    deleteKnowledgeBase: (
      knowledgeBaseName: string,
      options?: KnowledgeBasesDeleteOptionalParams,
    ) => $delete(context, knowledgeBaseName, options),
    search: (
      knowledgeBaseName: string,
      body: SearchRequest,
      options?: KnowledgeBasesSearchOptionalParams,
    ) => search(context, knowledgeBaseName, body, options),
    cancelIndexing: (
      knowledgeBaseName: string,
      options?: KnowledgeBasesCancelIndexingOptionalParams,
    ) => cancelIndexing(context, knowledgeBaseName, options),
    startIndexing: (
      knowledgeBaseName: string,
      options?: KnowledgeBasesStartIndexingOptionalParams,
    ) => startIndexing(context, knowledgeBaseName, options),
    getOperationStatus: (
      knowledgeBaseName: string,
      operationId: string,
      options?: KnowledgeBasesGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, knowledgeBaseName, operationId, options),
    list: (options?: KnowledgeBasesListOptionalParams) => list(context, options),
    get: (knowledgeBaseName: string, options?: KnowledgeBasesGetOptionalParams) =>
      get(context, knowledgeBaseName, options),
    createOrUpdate: (
      knowledgeBaseName: string,
      resource: KnowledgeBaseCreateOrUpdateContent,
      options?: KnowledgeBasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, knowledgeBaseName, resource as KnowledgeBase, options),
  };
}
export function _getKnowledgeBasesOperations(context: BookshelfContext): KnowledgeBasesOperations {
  return {
    ..._getKnowledgeBases(context),
  };
}
