// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { WorkflowVersion, _WorkflowVersionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  workflowVersionDeserializer,
  _workflowVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowVersionsListOptionalParams,
  WorkflowVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/versions{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24top": options?.top,
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
): Promise<_WorkflowVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowVersionListResultDeserializer(result.body);
}

/** Gets a list of workflow versions. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, workflowName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  versionId: string,
  options: WorkflowVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/versions/{versionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      versionId: versionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkflowVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowVersionDeserializer(result.body);
}

/** Gets a workflow version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  versionId: string,
  options: WorkflowVersionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowVersion> {
  const result = await _getSend(context, resourceGroupName, name, workflowName, versionId, options);
  return _getDeserialize(result);
}
