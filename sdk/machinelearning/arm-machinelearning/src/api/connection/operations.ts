// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  EndpointDeploymentResourcePropertiesBasicResource,
  _EndpointDeploymentResourcePropertiesBasicResourceArmPaginatedResult,
  EndpointModels,
  EndpointModelProperties,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointDeploymentResourcePropertiesBasicResourceSerializer,
  endpointDeploymentResourcePropertiesBasicResourceDeserializer,
  _endpointDeploymentResourcePropertiesBasicResourceArmPaginatedResultDeserializer,
  endpointModelsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionListDeploymentsOptionalParams,
  ConnectionDeleteDeploymentOptionalParams,
  ConnectionCreateOrUpdateDeploymentOptionalParams,
  ConnectionGetDeploymentOptionalParams,
  ConnectionGetModelsOptionalParams,
  ConnectionGetAllModelsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listDeploymentsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: ConnectionListDeploymentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/deployments{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "proxy%2Dapi%2Dversion": options?.proxyApiVersion,
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

export async function _listDeploymentsDeserialize(
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

/** Get all the deployments under the Azure OpenAI connection. */
export function listDeployments(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: ConnectionListDeploymentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointDeploymentResourcePropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsSend(context, resourceGroupName, workspaceName, connectionName, options),
    _listDeploymentsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _deleteDeploymentSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  options: ConnectionDeleteDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/deployments/{deploymentName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
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

export async function _deleteDeploymentDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Delete Azure OpenAI connection deployment resource by name */
export function deleteDeployment(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  options: ConnectionDeleteDeploymentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteDeploymentDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteDeploymentSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        deploymentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateDeploymentSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  body: EndpointDeploymentResourcePropertiesBasicResource,
  options: ConnectionCreateOrUpdateDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/deployments/{deploymentName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "proxy%2Dapi%2Dversion": options?.proxyApiVersion,
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

export async function _createOrUpdateDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointDeploymentResourcePropertiesBasicResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeploymentResourcePropertiesBasicResourceDeserializer(result.body);
}

/** Create or update Azure OpenAI connection deployment resource with the specified parameters */
export function createOrUpdateDeployment(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  body: EndpointDeploymentResourcePropertiesBasicResource,
  options: ConnectionCreateOrUpdateDeploymentOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
  EndpointDeploymentResourcePropertiesBasicResource
> {
  return getLongRunningPoller(
    context,
    _createOrUpdateDeploymentDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateDeploymentSend(
          context,
          resourceGroupName,
          workspaceName,
          connectionName,
          deploymentName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  ) as PollerLike<
    OperationState<EndpointDeploymentResourcePropertiesBasicResource>,
    EndpointDeploymentResourcePropertiesBasicResource
  >;
}

export function _getDeploymentSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  options: ConnectionGetDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
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

export async function _getDeploymentDeserialize(
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

/** Get deployments under the Azure OpenAI connection by name. */
export async function getDeployment(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  deploymentName: string,
  options: ConnectionGetDeploymentOptionalParams = { requestOptions: {} },
): Promise<EndpointDeploymentResourcePropertiesBasicResource> {
  const result = await _getDeploymentSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    deploymentName,
    options,
  );
  return _getDeploymentDeserialize(result);
}

export function _getModelsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: ConnectionGetModelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/models{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "proxy%2Dapi%2Dversion": options?.proxyApiVersion,
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

export async function _getModelsDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointModels> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointModelsDeserializer(result.body);
}

/** Get available models under the Azure OpenAI connection. */
export function getModels(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: ConnectionGetModelsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointModelProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _getModelsSend(context, resourceGroupName, workspaceName, connectionName, options),
    _getModelsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _getAllModelsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ConnectionGetAllModelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listConnectionModels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAllModelsDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointModels> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointModelsDeserializer(result.body);
}

/** Get models under the Azure ML workspace for all Azure OpenAI connections that the user can deploy. */
export async function getAllModels(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ConnectionGetAllModelsOptionalParams = { requestOptions: {} },
): Promise<EndpointModels> {
  const result = await _getAllModelsSend(context, resourceGroupName, workspaceName, options);
  return _getAllModelsDeserialize(result);
}
