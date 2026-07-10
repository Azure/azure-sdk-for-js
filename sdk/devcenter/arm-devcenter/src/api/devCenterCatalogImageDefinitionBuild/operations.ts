// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { ImageDefinitionBuild, ImageDefinitionBuildDetails } from "../../models/models.js";
import {
  errorResponseDeserializer,
  imageDefinitionBuildDeserializer,
  imageDefinitionBuildDetailsDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
  DevCenterCatalogImageDefinitionBuildCancelOptionalParams,
  DevCenterCatalogImageDefinitionBuildGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getBuildDetailsSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/getBuildDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      imageDefinitionName: imageDefinitionName,
      buildName: buildName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getBuildDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageDefinitionBuildDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageDefinitionBuildDetailsDeserializer(result.body);
}

/** Gets Build details. */
export async function getBuildDetails(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<ImageDefinitionBuildDetails> {
  const result = await _getBuildDetailsSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    imageDefinitionName,
    buildName,
    options,
  );
  return _getBuildDetailsDeserialize(result);
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      imageDefinitionName: imageDefinitionName,
      buildName: buildName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Cancels the specified build for an image definition. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      imageDefinitionName: imageDefinitionName,
      buildName: buildName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageDefinitionBuild> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageDefinitionBuildDeserializer(result.body);
}

/** Gets a build for a specified image definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  buildName: string,
  options: DevCenterCatalogImageDefinitionBuildGetOptionalParams = { requestOptions: {} },
): Promise<ImageDefinitionBuild> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    imageDefinitionName,
    buildName,
    options,
  );
  return _getDeserialize(result);
}
