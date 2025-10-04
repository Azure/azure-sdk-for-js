// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DbNode, _DbNodeListResult, DbNodeAction } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dbNodeDeserializer,
  _dbNodeListResultDeserializer,
  dbNodeActionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DbNodesActionOptionalParams,
  DbNodesListByParentOptionalParams,
  DbNodesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _actionSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  dbnodeocid: string,
  body: DbNodeAction,
  options: DbNodesActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes/{dbnodeocid}/action{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      dbnodeocid: dbnodeocid,
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

export async function _actionDeserialize(result: PathUncheckedResponse): Promise<DbNode> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbNodeDeserializer(result.body);
}

/** VM actions on DbNode of VM Cluster by the provided filter */
export function action(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  dbnodeocid: string,
  body: DbNodeAction,
  options: DbNodesActionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DbNode>, DbNode> {
  return getLongRunningPoller(context, _actionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _actionSend(context, resourceGroupName, cloudvmclustername, dbnodeocid, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DbNode>, DbNode>;
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: DbNodesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
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
): Promise<_DbNodeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dbNodeListResultDeserializer(result.body);
}

/** List DbNode resources by CloudVmCluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: DbNodesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DbNode> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, cloudvmclustername, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  dbnodeocid: string,
  options: DbNodesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes/{dbnodeocid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      dbnodeocid: dbnodeocid,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DbNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbNodeDeserializer(result.body);
}

/** Get a DbNode */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  dbnodeocid: string,
  options: DbNodesGetOptionalParams = { requestOptions: {} },
): Promise<DbNode> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudvmclustername,
    dbnodeocid,
    options,
  );
  return _getDeserialize(result);
}
