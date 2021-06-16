// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Client, PathUncheckedResponse, RequestParameters } from "@azure-rest/core-client";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DataFlowDebugSessionInfo,
  DataFlowResource,
  DatasetResource,
  LibraryResource,
  LinkedServiceResource,
  NotebookListResponse,
  NotebookResource,
  PipelineResource,
  SparkJobDefinitionResource,
  SqlScriptsListResponse,
  TriggerResource
} from "./models";

import {
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceParameters,
  DataFlowGetDataFlowsByWorkspaceParameters,
  DatasetGetDatasetsByWorkspaceParameters,
  LibraryListParameters,
  LinkedServiceGetLinkedServicesByWorkspaceParameters,
  NotebookGetNotebooksByWorkspaceParameters,
  NotebookGetNotebookSummaryByWorkSpaceParameters,
  PipelineGetPipelinesByWorkspaceParameters,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceParameters,
  SqlScriptGetSqlScriptsByWorkspaceParameters,
  TriggerGetTriggersByWorkspaceParameters
} from "./parameters";

const Http2xxStatusCodes = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"];

interface PageablePaths {
  "/linkedservices": {
    parameters: LinkedServiceGetLinkedServicesByWorkspaceParameters;
    result: LinkedServiceResource;
  };
  "/datasets": {
    parameters: DatasetGetDatasetsByWorkspaceParameters;
    result: DatasetResource;
  };
  "/pipelines": {
    parameters: PipelineGetPipelinesByWorkspaceParameters;
    result: PipelineResource;
  };
  "/triggers": {
    parameters: TriggerGetTriggersByWorkspaceParameters;
    result: TriggerResource;
  };
  "/dataflows": {
    parameters: DataFlowGetDataFlowsByWorkspaceParameters;
    result: DataFlowResource;
  };
  "/queryDataFlowDebugSessions": {
    parameters: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceParameters;
    result: DataFlowDebugSessionInfo;
  };
  "/sqlScripts": {
    parameters: SqlScriptGetSqlScriptsByWorkspaceParameters;
    result: SqlScriptsListResponse;
  };
  "/sparkJobDefinitions": {
    parameters: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceParameters;
    result: SparkJobDefinitionResource;
  };
  "/notebooks": {
    parameters: NotebookGetNotebooksByWorkspaceParameters;
    result: NotebookListResponse;
  };
  "/notebooks/summary": {
    parameters: NotebookGetNotebookSummaryByWorkSpaceParameters;
    result: NotebookResource;
  };
  "/libraries": {
    parameters: LibraryListParameters;
    result: LibraryResource;
  };
}

const DEFAULT_NEXTLINK = "nextLink";
const DEFAULT_VALUES = "value";

interface PaginateOptions {
  nextLinkName?: string;
  valuesName?: string;
}

export function paginate<TPath extends keyof PageablePaths>(
  client: Client,
  path: TPath,
  options?: PageablePaths[TPath]["parameters"]
): PagedAsyncIterableIterator<
  PageablePaths[TPath]["result"],
  PageablePaths[TPath]["result"][],
  {}
> {
  return corePaginate<TPath, PageablePaths[TPath]["result"]>(client, path, {
    requestOptions: options
  });
}

interface PagingOptions {
  paginateOptions?: PaginateOptions;
  requestOptions?: RequestParameters;
}

function corePaginate<TPath extends string, TReturn = Record<string, unknown>>(
  client: Client,
  path: TPath,
  options: PagingOptions
): PagedAsyncIterableIterator<TReturn, TReturn[], {}> {
  const iter = listAll<TReturn>(client, path, options);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: () => {
      return listPage<TReturn>(client, path, options);
    }
  };
}

async function* listAll<T>(
  client: Client,
  path: string,
  paginateOptions: PagingOptions
): AsyncIterableIterator<T> {
  for await (const page of listPage<T>(client, path, paginateOptions)) {
    yield* page;
  }
}

async function* listPage<T = Record<string, any>[]>(
  client: Client,
  path: string,
  options: PagingOptions
): AsyncIterableIterator<T[]> {
  const { paginateOptions = {}, requestOptions = {} } = options;
  let result = await client.pathUnchecked(path).get();
  checkPagingRequest(result);
  let nextLink = getNextLink(result.body, paginateOptions);
  let values = getElements<T>(result.body, paginateOptions);

  yield values;

  while (nextLink) {
    result = await client.pathUnchecked(nextLink).get(requestOptions);
    checkPagingRequest(result);
    nextLink = getNextLink(result.body, paginateOptions);
    values = getElements<T>(result.body, paginateOptions);
    yield values;
  }
}

function checkPagingRequest(response: PathUncheckedResponse) {
  if (!Http2xxStatusCodes.includes(response.status)) {
    throw response.body?.error ?? {
      message: `Pagination failed`,
      request: response.request,
      response: response,
      status: response.status
    };
  }
}

function getNextLink(body: Record<string, unknown>, paginateOptions: PaginateOptions) {
  const nextLinkName = paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK;
  return (body[nextLinkName] as string) ?? undefined;
}
function getElements<T = unknown>(
  body: Record<string, unknown>,
  paginateOptions: PaginateOptions
): T[] {
  const valueName = paginateOptions?.valuesName ?? DEFAULT_VALUES;
  return (body[valueName] as T[]) ?? [];
}
