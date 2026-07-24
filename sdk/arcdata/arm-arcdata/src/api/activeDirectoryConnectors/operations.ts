// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  ActiveDirectoryConnectorResource,
  _ActiveDirectoryConnectorListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  activeDirectoryConnectorResourceSerializer,
  activeDirectoryConnectorResourceDeserializer,
  _activeDirectoryConnectorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ActiveDirectoryConnectorsListOptionalParams,
  ActiveDirectoryConnectorsDeleteOptionalParams,
  ActiveDirectoryConnectorsCreateOptionalParams,
  ActiveDirectoryConnectorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: ActiveDirectoryConnectorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_ActiveDirectoryConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _activeDirectoryConnectorListResultDeserializer(result.body);
}

/** List the active directory connectors associated with the given data controller. */
export function list(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: ActiveDirectoryConnectorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ActiveDirectoryConnectorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dataControllerName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  options: ActiveDirectoryConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      activeDirectoryConnectorName: activeDirectoryConnectorName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an Active Directory connector resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  options: ActiveDirectoryConnectorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        dataControllerName,
        activeDirectoryConnectorName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  activeDirectoryConnectorResource: ActiveDirectoryConnectorResource,
  options: ActiveDirectoryConnectorsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      activeDirectoryConnectorName: activeDirectoryConnectorName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activeDirectoryConnectorResourceSerializer(activeDirectoryConnectorResource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveDirectoryConnectorResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return activeDirectoryConnectorResourceDeserializer(result.body);
}

/** Creates or replaces an Active Directory connector resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  activeDirectoryConnectorResource: ActiveDirectoryConnectorResource,
  options: ActiveDirectoryConnectorsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ActiveDirectoryConnectorResource>, ActiveDirectoryConnectorResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        dataControllerName,
        activeDirectoryConnectorName,
        activeDirectoryConnectorResource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<
    OperationState<ActiveDirectoryConnectorResource>,
    ActiveDirectoryConnectorResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  options: ActiveDirectoryConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}/activeDirectoryConnectors/{activeDirectoryConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      activeDirectoryConnectorName: activeDirectoryConnectorName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<ActiveDirectoryConnectorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return activeDirectoryConnectorResourceDeserializer(result.body);
}

/** Retrieves an Active Directory connector resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  activeDirectoryConnectorName: string,
  options: ActiveDirectoryConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<ActiveDirectoryConnectorResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    dataControllerName,
    activeDirectoryConnectorName,
    options,
  );
  return _getDeserialize(result);
}
