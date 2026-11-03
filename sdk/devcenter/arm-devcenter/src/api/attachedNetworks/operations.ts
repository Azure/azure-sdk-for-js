// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { AttachedNetworkConnection, _AttachedNetworkListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  attachedNetworkConnectionSerializer,
  attachedNetworkConnectionDeserializer,
  _attachedNetworkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AttachedNetworksListByProjectOptionalParams,
  AttachedNetworksGetByProjectOptionalParams,
  AttachedNetworksListByDevCenterOptionalParams,
  AttachedNetworksDeleteOptionalParams,
  AttachedNetworksCreateOrUpdateOptionalParams,
  AttachedNetworksGetByDevCenterOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: AttachedNetworksListByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/attachednetworks{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttachedNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attachedNetworkListResultDeserializer(result.body);
}

/** Lists the attached NetworkConnections for a Project. */
export function listByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: AttachedNetworksListByProjectOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AttachedNetworkConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProjectSend(context, resourceGroupName, projectName, options),
    _listByProjectDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksGetByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/attachednetworks/{attachedNetworkConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      attachedNetworkConnectionName: attachedNetworkConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedNetworkConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedNetworkConnectionDeserializer(result.body);
}

/** Gets an attached NetworkConnection. */
export async function getByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksGetByProjectOptionalParams = { requestOptions: {} },
): Promise<AttachedNetworkConnection> {
  const result = await _getByProjectSend(
    context,
    resourceGroupName,
    projectName,
    attachedNetworkConnectionName,
    options,
  );
  return _getByProjectDeserialize(result);
}

export function _listByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: AttachedNetworksListByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttachedNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attachedNetworkListResultDeserializer(result.body);
}

/** Lists the attached NetworkConnections for a DevCenter. */
export function listByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: AttachedNetworksListByDevCenterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AttachedNetworkConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDevCenterSend(context, resourceGroupName, devCenterName, options),
    _listByDevCenterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      attachedNetworkConnectionName: attachedNetworkConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

/** Un-attach a NetworkConnection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  body: AttachedNetworkConnection,
  options: AttachedNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      attachedNetworkConnectionName: attachedNetworkConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attachedNetworkConnectionSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedNetworkConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedNetworkConnectionDeserializer(result.body);
}

/** Creates or updates an attached NetworkConnection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  body: AttachedNetworkConnection,
  options: AttachedNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AttachedNetworkConnection>, AttachedNetworkConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<AttachedNetworkConnection>, AttachedNetworkConnection>;
}

export function _getByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksGetByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      attachedNetworkConnectionName: attachedNetworkConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedNetworkConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedNetworkConnectionDeserializer(result.body);
}

/** Gets an attached NetworkConnection. */
export async function getByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  attachedNetworkConnectionName: string,
  options: AttachedNetworksGetByDevCenterOptionalParams = { requestOptions: {} },
): Promise<AttachedNetworkConnection> {
  const result = await _getByDevCenterSend(
    context,
    resourceGroupName,
    devCenterName,
    attachedNetworkConnectionName,
    options,
  );
  return _getByDevCenterDeserialize(result);
}
