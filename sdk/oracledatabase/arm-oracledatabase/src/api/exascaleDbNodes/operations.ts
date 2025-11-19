// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  DbNodeAction,
  ExascaleDbNode,
  _ExascaleDbNodeListResult,
  DbActionResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dbNodeActionSerializer,
  exascaleDbNodeDeserializer,
  _exascaleDbNodeListResultDeserializer,
  dbActionResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExascaleDbNodesActionOptionalParams,
  ExascaleDbNodesListByParentOptionalParams,
  ExascaleDbNodesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _actionSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  exascaleDbNodeName: string,
  body: DbNodeAction,
  options: ExascaleDbNodesActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/dbNodes/{exascaleDbNodeName}/action{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
      exascaleDbNodeName: exascaleDbNodeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dbNodeActionSerializer(body),
  });
}

export async function _actionDeserialize(result: PathUncheckedResponse): Promise<DbActionResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbActionResponseDeserializer(result.body);
}

/** VM actions on DbNode of ExadbVmCluster by the provided filter */
export function action(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  exascaleDbNodeName: string,
  body: DbNodeAction,
  options: ExascaleDbNodesActionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DbActionResponse>, DbActionResponse> {
  return getLongRunningPoller(context, _actionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _actionSend(
        context,
        resourceGroupName,
        exadbVmClusterName,
        exascaleDbNodeName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DbActionResponse>, DbActionResponse>;
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExascaleDbNodesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/dbNodes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExascaleDbNodeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _exascaleDbNodeListResultDeserializer(result.body);
}

/** List ExascaleDbNode resources by ExadbVmCluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExascaleDbNodesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExascaleDbNode> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, exadbVmClusterName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  exascaleDbNodeName: string,
  options: ExascaleDbNodesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/dbNodes/{exascaleDbNodeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
      exascaleDbNodeName: exascaleDbNodeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExascaleDbNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exascaleDbNodeDeserializer(result.body);
}

/** Get a ExascaleDbNode */
export async function get(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  exascaleDbNodeName: string,
  options: ExascaleDbNodesGetOptionalParams = { requestOptions: {} },
): Promise<ExascaleDbNode> {
  const result = await _getSend(
    context,
    resourceGroupName,
    exadbVmClusterName,
    exascaleDbNodeName,
    options,
  );
  return _getDeserialize(result);
}
