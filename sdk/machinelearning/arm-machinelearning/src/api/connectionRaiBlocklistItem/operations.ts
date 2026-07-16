// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  RaiBlocklistItemBulkRequest,
  RaiBlocklistItemPropertiesBasicResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiBlocklistItemPropertiesBasicResourceSerializer,
  raiBlocklistItemPropertiesBasicResourceDeserializer,
  raiBlocklistItemPropertiesBasicResourceArrayDeserializer,
  raiBlocklistItemBulkRequestArraySerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionRaiBlocklistItemDeleteOptionalParams,
  ConnectionRaiBlocklistItemCreateOptionalParams,
  ConnectionRaiBlocklistItemGetOptionalParams,
  ConnectionRaiBlocklistItemDeleteBulkOptionalParams,
  ConnectionRaiBlocklistItemAddBulkOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: ConnectionRaiBlocklistItemDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
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

/** Deletes the specified custom blocklist item associated with the Azure OpenAI connection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: ConnectionRaiBlocklistItemDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        raiBlocklistItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  body: RaiBlocklistItemPropertiesBasicResource,
  options: ConnectionRaiBlocklistItemCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
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
    body: raiBlocklistItemPropertiesBasicResourceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiBlocklistItemPropertiesBasicResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiBlocklistItemPropertiesBasicResourceDeserializer(result.body);
}

/** Update the state of specified blocklist item associated with the Azure OpenAI connection. */
export function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  body: RaiBlocklistItemPropertiesBasicResource,
  options: ConnectionRaiBlocklistItemCreateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RaiBlocklistItemPropertiesBasicResource>,
  RaiBlocklistItemPropertiesBasicResource
> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        raiBlocklistItemName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<RaiBlocklistItemPropertiesBasicResource>,
    RaiBlocklistItemPropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: ConnectionRaiBlocklistItemGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      raiBlocklistItemName: raiBlocklistItemName,
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
): Promise<RaiBlocklistItemPropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiBlocklistItemPropertiesBasicResourceDeserializer(result.body);
}

/** Gets the specified custom blocklist item associated with the Azure OpenAI connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  raiBlocklistItemName: string,
  options: ConnectionRaiBlocklistItemGetOptionalParams = { requestOptions: {} },
): Promise<RaiBlocklistItemPropertiesBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    raiBlocklistName,
    raiBlocklistItemName,
    options,
  );
  return _getDeserialize(result);
}

export function _deleteBulkSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  body: string[],
  options: ConnectionRaiBlocklistItemDeleteBulkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/deleteRaiBlocklistItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: body.map((p: any) => {
      return p;
    }),
  });
}

export async function _deleteBulkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete multiple blocklist items from the specified blocklist associated with the Azure OpenAI connection. */
export function deleteBulk(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  body: string[],
  options: ConnectionRaiBlocklistItemDeleteBulkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteBulkDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteBulkSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _addBulkSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  body: RaiBlocklistItemBulkRequest[],
  options: ConnectionRaiBlocklistItemAddBulkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/addRaiBlocklistItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: raiBlocklistItemBulkRequestArraySerializer(body),
  });
}

export async function _addBulkDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiBlocklistItemPropertiesBasicResource[]> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiBlocklistItemPropertiesBasicResourceArrayDeserializer(result.body);
}

/** Add multiple blocklist items to the specified blocklist associated with the Azure OpenAI connection. */
export function addBulk(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  body: RaiBlocklistItemBulkRequest[],
  options: ConnectionRaiBlocklistItemAddBulkOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RaiBlocklistItemPropertiesBasicResource[]>,
  RaiBlocklistItemPropertiesBasicResource[]
> {
  return getLongRunningPoller(context, _addBulkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addBulkSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<RaiBlocklistItemPropertiesBasicResource[]>,
    RaiBlocklistItemPropertiesBasicResource[]
  >;
}
