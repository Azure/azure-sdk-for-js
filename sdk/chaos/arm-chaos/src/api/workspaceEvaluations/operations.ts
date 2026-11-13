// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type { WorkspaceEvaluation, _WorkspaceEvaluationListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceEvaluationDeserializer,
  _workspaceEvaluationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceEvaluationsListOptionalParams,
  WorkspaceEvaluationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceEvaluationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/evaluations{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
      continuationToken: options?.continuationToken,
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
): Promise<_WorkspaceEvaluationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workspaceEvaluationListResultDeserializer(result.body);
}

/** Lists retained GA template evaluations under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend retention or convert scenario-backed legacy evaluations. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceEvaluationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceEvaluation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  evaluationName: string,
  options: WorkspaceEvaluationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/evaluations/{evaluationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      evaluationName: evaluationName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkspaceEvaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceEvaluationDeserializer(result.body);
}

/** Gets a retained template evaluation by its ID, or uses latest to select the most recently durably admitted GA template evaluation. Returns 200 with the current representation while processing or terminal. Returns 404 if no qualifying retained result exists; scenario-backed legacy operations are not substituted. This is not an LRO polling endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  evaluationName: string,
  options: WorkspaceEvaluationsGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceEvaluation> {
  const result = await _getSend(context, resourceGroupName, workspaceName, evaluationName, options);
  return _getDeserialize(result);
}
