// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ContainerAppsBuildResource,
  containerAppsBuildResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsBuildsDeleteOptionalParams,
  ContainerAppsBuildsGetOptionalParams,
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
  containerAppName: string,
  buildName: string,
  options: ContainerAppsBuildsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      buildName: buildName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Container Apps Build resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  buildName: string,
  options: ContainerAppsBuildsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, containerAppName, buildName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  buildName: string,
  options: ContainerAppsBuildsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      buildName: buildName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppsBuildResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return containerAppsBuildResourceDeserializer(result.body);
}

/** Get a Container Apps Build resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  buildName: string,
  options: ContainerAppsBuildsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsBuildResource> {
  const result = await _getSend(context, resourceGroupName, containerAppName, buildName, options);
  return _getDeserialize(result);
}
