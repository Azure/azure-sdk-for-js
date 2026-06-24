// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  errorDeserializer,
  IotConnector,
  iotConnectorSerializer,
  iotConnectorDeserializer,
  _IotConnectorCollection,
  _iotConnectorCollectionDeserializer,
  IotConnectorPatchResource,
  iotConnectorPatchResourceSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IotConnectorsDeleteOptionalParams,
  IotConnectorsUpdateOptionalParams,
  IotConnectorsListByWorkspaceOptionalParams,
  IotConnectorsCreateOrUpdateOptionalParams,
  IotConnectorsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  iotConnectorName: string,
  workspaceName: string,
  options: IotConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotConnectorName: iotConnectorName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an IoT Connector. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  iotConnectorName: string,
  workspaceName: string,
  options: IotConnectorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, iotConnectorName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  iotConnectorName: string,
  workspaceName: string,
  iotConnectorPatchResource: IotConnectorPatchResource,
  options: IotConnectorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotConnectorName: iotConnectorName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: iotConnectorPatchResourceSerializer(iotConnectorPatchResource),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<IotConnector> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotConnectorDeserializer(result.body);
}

/** Patch an IoT Connector. */
export function update(
  context: Client,
  resourceGroupName: string,
  iotConnectorName: string,
  workspaceName: string,
  iotConnectorPatchResource: IotConnectorPatchResource,
  options: IotConnectorsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotConnector>, IotConnector> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        iotConnectorName,
        workspaceName,
        iotConnectorPatchResource,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<IotConnector>, IotConnector>;
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IotConnectorsListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotConnectorCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotConnectorCollectionDeserializer(result.body);
}

/** Lists all IoT Connectors for the given workspace */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IotConnectorsListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotConnector> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-04-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  iotConnector: IotConnector,
  options: IotConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: iotConnectorSerializer(iotConnector),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IotConnector> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotConnectorDeserializer(result.body);
}

/** Creates or updates an IoT Connector resource with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  iotConnector: IotConnector,
  options: IotConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotConnector>, IotConnector> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        iotConnector,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<IotConnector>, IotConnector>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  options: IotConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IotConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotConnectorDeserializer(result.body);
}

/** Gets the properties of the specified IoT Connector. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  options: IotConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<IotConnector> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    iotConnectorName,
    options,
  );
  return _getDeserialize(result);
}
