// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  SsisObjectMetadataStatusResponse,
  SsisObjectMetadataListResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  ssisObjectMetadataStatusResponseDeserializer,
  getSsisObjectMetadataRequestSerializer,
  ssisObjectMetadataListResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IntegrationRuntimeObjectMetadataGetOptionalParams,
  IntegrationRuntimeObjectMetadataRefreshOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeObjectMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/getObjectMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["getMetadataRequest"]
      ? options["getMetadataRequest"]
      : getSsisObjectMetadataRequestSerializer(options["getMetadataRequest"]),
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SsisObjectMetadataListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ssisObjectMetadataListResponseDeserializer(result.body);
}

/** Get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeObjectMetadataGetOptionalParams = { requestOptions: {} },
): Promise<SsisObjectMetadataListResponse> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  return _getDeserialize(result);
}

export function _refreshSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeObjectMetadataRefreshOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/refreshObjectMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _refreshDeserialize(
  result: PathUncheckedResponse,
): Promise<SsisObjectMetadataStatusResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ssisObjectMetadataStatusResponseDeserializer(result.body);
}

/** Refresh a SSIS integration runtime object metadata. */
export function refresh(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeObjectMetadataRefreshOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SsisObjectMetadataStatusResponse>, SsisObjectMetadataStatusResponse> {
  return getLongRunningPoller(context, _refreshDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshSend(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<
    OperationState<SsisObjectMetadataStatusResponse>,
    SsisObjectMetadataStatusResponse
  >;
}
