// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type { RaiBlocklistPropertiesBasicResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiBlocklistPropertiesBasicResourceSerializer,
  raiBlocklistPropertiesBasicResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectionRaiBlocklistDeleteOptionalParams,
  ConnectionRaiBlocklistCreateOptionalParams,
  ConnectionRaiBlocklistGetOptionalParams,
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
  options: ConnectionRaiBlocklistDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
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

/** Deletes the specified custom blocklist associated with the Azure OpenAI connection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  options: ConnectionRaiBlocklistDeleteOptionalParams = { requestOptions: {} },
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
  body: RaiBlocklistPropertiesBasicResource,
  options: ConnectionRaiBlocklistCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
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
    body: raiBlocklistPropertiesBasicResourceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiBlocklistPropertiesBasicResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiBlocklistPropertiesBasicResourceDeserializer(result.body);
}

/** Update the state of specified blocklist associated with the Azure OpenAI connection. */
export function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  body: RaiBlocklistPropertiesBasicResource,
  options: ConnectionRaiBlocklistCreateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RaiBlocklistPropertiesBasicResource>,
  RaiBlocklistPropertiesBasicResource
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
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<RaiBlocklistPropertiesBasicResource>,
    RaiBlocklistPropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  options: ConnectionRaiBlocklistGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiBlocklistPropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiBlocklistPropertiesBasicResourceDeserializer(result.body);
}

/** Gets the specified custom blocklist associated with the Azure OpenAI connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  options: ConnectionRaiBlocklistGetOptionalParams = { requestOptions: {} },
): Promise<RaiBlocklistPropertiesBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    raiBlocklistName,
    options,
  );
  return _getDeserialize(result);
}
