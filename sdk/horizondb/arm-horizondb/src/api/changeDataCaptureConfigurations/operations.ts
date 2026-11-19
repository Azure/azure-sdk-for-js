// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  ChangeDataCaptureConfiguration,
  _ChangeDataCaptureConfigurationListResult,
  ChangeDataCaptureConfigurationCreateOrUpdate,
  ChangeDataCaptureConfigurationForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  changeDataCaptureConfigurationDeserializer,
  _changeDataCaptureConfigurationListResultDeserializer,
  changeDataCaptureConfigurationCreateOrUpdateSerializer,
  changeDataCaptureConfigurationForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChangeDataCaptureConfigurationsListOptionalParams,
  ChangeDataCaptureConfigurationsDeleteOptionalParams,
  ChangeDataCaptureConfigurationsUpdateOptionalParams,
  ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
  ChangeDataCaptureConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_ChangeDataCaptureConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _changeDataCaptureConfigurationListResultDeserializer(result.body);
}

/** Lists change data capture configurations in a HorizonDB cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChangeDataCaptureConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ChangeDataCaptureConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

/** Deletes a change data capture configuration after destination-side replication has been stopped or detached. This operation never deletes the Microsoft Fabric mirrored-database item. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ChangeDataCaptureConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, configurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
  options: ChangeDataCaptureConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeDataCaptureConfigurationForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureConfigurationDeserializer(result.body);
}

/** Updates mutable change data capture configuration properties. Omitted properties preserve their current values. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
  options: ChangeDataCaptureConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, configurationName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  resource: ChangeDataCaptureConfigurationCreateOrUpdate,
  options: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeDataCaptureConfigurationCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureConfigurationDeserializer(result.body);
}

/** Creates or replaces a change data capture configuration that enrolls a PostgreSQL database for Microsoft Fabric Mirroring. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  resource: ChangeDataCaptureConfigurationCreateOrUpdate,
  options: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ChangeDataCaptureConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<ChangeDataCaptureConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureConfigurationDeserializer(result.body);
}

/** Gets a change data capture configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ChangeDataCaptureConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
