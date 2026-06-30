// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  EndpointDeploymentResourcePropertiesBasicResource,
  _EndpointDeploymentResourcePropertiesBasicResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointDeploymentResourcePropertiesBasicResourceSerializer,
  endpointDeploymentResourcePropertiesBasicResourceDeserializer,
  _endpointDeploymentResourcePropertiesBasicResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EndpointDeploymentGetInWorkspaceOptionalParams,
  EndpointDeploymentListOptionalParams,
  EndpointDeploymentDeleteOptionalParams,
  EndpointDeploymentCreateOrUpdateOptionalParams,
  EndpointDeploymentGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getInWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EndpointDeploymentGetInWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/deployments{?api%2Dversion,endpointType,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      endpointType: options?.endpointType,
      "%24skip": options?.skip,
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

export async function _getInWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointDeploymentResourcePropertiesBasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointDeploymentResourcePropertiesBasicResourceArmPaginatedResultDeserializer(
    result.body,
  );
}

/** Get all the deployments under the workspace scope. */
export function getInWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EndpointDeploymentGetInWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _getInWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _getInWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointDeploymentListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/deployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<_EndpointDeploymentResourcePropertiesBasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointDeploymentResourcePropertiesBasicResourceArmPaginatedResultDeserializer(
    result.body,
  );
}

/** Get all the deployments under the endpoint resource scope */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointDeploymentListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, endpointName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: EndpointDeploymentDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "proxy%2Dapi%2Dversion": options?.proxyApiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete  endpoint deployment resource by name */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: EndpointDeploymentDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: EndpointDeploymentResourcePropertiesBasicResource,
  options: EndpointDeploymentCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointDeploymentResourcePropertiesBasicResourceSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointDeploymentResourcePropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeploymentResourcePropertiesBasicResourceDeserializer(result.body);
}

/** Create or update endpoint deployment resource with the specified parameters */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: EndpointDeploymentResourcePropertiesBasicResource,
  options: EndpointDeploymentCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
  EndpointDeploymentResourcePropertiesBasicResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
    EndpointDeploymentResourcePropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: EndpointDeploymentGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<EndpointDeploymentResourcePropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeploymentResourcePropertiesBasicResourceDeserializer(result.body);
}

/** Get deployments under endpoint resource by name */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: EndpointDeploymentGetOptionalParams = { requestOptions: {} },
): Promise<EndpointDeploymentResourcePropertiesBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
    options,
  );
  return _getDeserialize(result);
}
