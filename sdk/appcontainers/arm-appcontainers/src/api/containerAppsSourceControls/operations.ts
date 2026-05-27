// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  SourceControl,
  sourceControlSerializer,
  sourceControlDeserializer,
  _SourceControlCollection,
  _sourceControlCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsSourceControlsListByContainerAppOptionalParams,
  ContainerAppsSourceControlsDeleteOptionalParams,
  ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
  ContainerAppsSourceControlsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByContainerAppSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsSourceControlsListByContainerAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByContainerAppDeserialize(
  result: PathUncheckedResponse,
): Promise<_SourceControlCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _sourceControlCollectionDeserializer(result.body);
}

/** Get the Container App SourceControls in a given resource group. */
export function listByContainerApp(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsSourceControlsListByContainerAppOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SourceControl> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContainerAppSend(context, resourceGroupName, containerAppName, options),
    _listByContainerAppDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  options: ContainerAppsSourceControlsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}{?api%2Dversion,ignoreWorkflowDeletionFailure,deleteWorkflow}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      sourceControlName: sourceControlName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      ignoreWorkflowDeletionFailure: options?.ignoreWorkflowDeletionFailure,
      deleteWorkflow: options?.deleteWorkflow,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsGithubAuxiliary !== undefined
        ? { "x-ms-github-auxiliary": options?.xMsGithubAuxiliary }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Container App SourceControl. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  options: ContainerAppsSourceControlsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, containerAppName, sourceControlName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  sourceControlEnvelope: SourceControl,
  options: ContainerAppsSourceControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      sourceControlName: sourceControlName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsGithubAuxiliary !== undefined
        ? { "x-ms-github-auxiliary": options?.xMsGithubAuxiliary }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sourceControlSerializer(sourceControlEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Create or update the SourceControl for a Container App. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  sourceControlEnvelope: SourceControl,
  options: ContainerAppsSourceControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SourceControl>, SourceControl> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        sourceControlEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<SourceControl>, SourceControl>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  options: ContainerAppsSourceControlsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      sourceControlName: sourceControlName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SourceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Get a SourceControl of a Container App. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  sourceControlName: string,
  options: ContainerAppsSourceControlsGetOptionalParams = { requestOptions: {} },
): Promise<SourceControl> {
  const result = await _getSend(
    context,
    resourceGroupName,
    containerAppName,
    sourceControlName,
    options,
  );
  return _getDeserialize(result);
}
