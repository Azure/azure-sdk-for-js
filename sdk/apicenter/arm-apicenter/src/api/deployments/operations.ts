// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext as Client } from "../index.js";
import type { Deployment, _DeploymentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  deploymentSerializer,
  deploymentDeserializer,
  _deploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeploymentsListOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsHeadOptionalParams,
  DeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  options: DeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
      "%24filter": options?.filter,
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
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Returns a collection of API deployments. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  options: DeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, workspaceName, apiName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-06-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes API deployment. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    deploymentName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  payload: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentSerializer(payload),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Creates new or updates existing API deployment. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  payload: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    deploymentName,
    payload,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _headSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsHeadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _headDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks if specified API deployment exists. */
export async function head(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsHeadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _headSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    deploymentName,
    options,
  );
  return _headDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Returns details of the API deployment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    deploymentName,
    options,
  );
  return _getDeserialize(result);
}
