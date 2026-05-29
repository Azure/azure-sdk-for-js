// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BuildResource,
  buildResourceSerializer,
  buildResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BuildsDeleteOptionalParams,
  BuildsCreateOrUpdateOptionalParams,
  BuildsGetOptionalParams,
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
  builderName: string,
  buildName: string,
  options: BuildsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      builderName: builderName,
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

/** Delete a BuildResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  builderName: string,
  buildName: string,
  options: BuildsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, builderName, buildName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  builderName: string,
  buildName: string,
  buildEnvelope: BuildResource,
  options: BuildsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      builderName: builderName,
      buildName: buildName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: buildResourceSerializer(buildEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BuildResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return buildResourceDeserializer(result.body);
}

/** Create a BuildResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  builderName: string,
  buildName: string,
  buildEnvelope: BuildResource,
  options: BuildsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BuildResource>, BuildResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        builderName,
        buildName,
        buildEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<BuildResource>, BuildResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  builderName: string,
  buildName: string,
  options: BuildsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      builderName: builderName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BuildResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return buildResourceDeserializer(result.body);
}

/** Get a BuildResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  builderName: string,
  buildName: string,
  options: BuildsGetOptionalParams = { requestOptions: {} },
): Promise<BuildResource> {
  const result = await _getSend(context, resourceGroupName, builderName, buildName, options);
  return _getDeserialize(result);
}
