// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ReachabilityAnalysisIntent } from "../../models/microsoft/network/models.js";
import {
  commonErrorResponseDeserializer,
  reachabilityAnalysisIntentSerializer,
  reachabilityAnalysisIntentDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ReachabilityAnalysisIntentListResult } from "../../models/models.js";
import { _reachabilityAnalysisIntentListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReachabilityAnalysisIntentsListOptionalParams,
  ReachabilityAnalysisIntentsDeleteOptionalParams,
  ReachabilityAnalysisIntentsCreateOptionalParams,
  ReachabilityAnalysisIntentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  options: ReachabilityAnalysisIntentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisIntents{?api%2Dversion,skipToken,skip,top,sortKey,sortValue}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      "api%2Dversion": "2025-05-01",
      skipToken: options?.skipToken,
      skip: options?.skip,
      top: options?.top,
      sortKey: options?.sortKey,
      sortValue: options?.sortValue,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReachabilityAnalysisIntentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _reachabilityAnalysisIntentListResultDeserializer(result.body);
}

/** Gets list of Reachability Analysis Intents . */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  options: ReachabilityAnalysisIntentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReachabilityAnalysisIntent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  options: ReachabilityAnalysisIntentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisIntents/{reachabilityAnalysisIntentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisIntentName: reachabilityAnalysisIntentName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes Reachability Analysis Intent. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  options: ReachabilityAnalysisIntentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisIntentName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  body: ReachabilityAnalysisIntent,
  options: ReachabilityAnalysisIntentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisIntents/{reachabilityAnalysisIntentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisIntentName: reachabilityAnalysisIntentName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: reachabilityAnalysisIntentSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReachabilityAnalysisIntent> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return reachabilityAnalysisIntentDeserializer(result.body);
}

/** Creates Reachability Analysis Intent. */
export async function create(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  body: ReachabilityAnalysisIntent,
  options: ReachabilityAnalysisIntentsCreateOptionalParams = { requestOptions: {} },
): Promise<ReachabilityAnalysisIntent> {
  const result = await _createSend(
    context,
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisIntentName,
    body,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  options: ReachabilityAnalysisIntentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisIntents/{reachabilityAnalysisIntentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      workspaceName: workspaceName,
      reachabilityAnalysisIntentName: reachabilityAnalysisIntentName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ReachabilityAnalysisIntent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return reachabilityAnalysisIntentDeserializer(result.body);
}

/** Get the Reachability Analysis Intent. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  workspaceName: string,
  reachabilityAnalysisIntentName: string,
  options: ReachabilityAnalysisIntentsGetOptionalParams = { requestOptions: {} },
): Promise<ReachabilityAnalysisIntent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisIntentName,
    options,
  );
  return _getDeserialize(result);
}
