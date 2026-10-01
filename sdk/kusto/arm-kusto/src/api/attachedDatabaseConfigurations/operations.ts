// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  AttachedDatabaseConfiguration,
  _AttachedDatabaseConfigurationListResult,
  AttachedDatabaseConfigurationsCheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  attachedDatabaseConfigurationSerializer,
  attachedDatabaseConfigurationDeserializer,
  _attachedDatabaseConfigurationListResultDeserializer,
  attachedDatabaseConfigurationsCheckNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams,
  AttachedDatabaseConfigurationsListByClusterOptionalParams,
  AttachedDatabaseConfigurationsDeleteOptionalParams,
  AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams,
  AttachedDatabaseConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: AttachedDatabaseConfigurationsCheckNameRequest,
  options: AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurationCheckNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attachedDatabaseConfigurationsCheckNameRequestSerializer(resourceName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameResultDeserializer(result.body);
}

/** Checks that the attached database configuration resource name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: AttachedDatabaseConfigurationsCheckNameRequest,
  options: AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    clusterName,
    resourceName,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: AttachedDatabaseConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttachedDatabaseConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attachedDatabaseConfigurationListResultDeserializer(result.body);
}

/** Returns the list of attached database configurations of the given Kusto cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: AttachedDatabaseConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AttachedDatabaseConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  options: AttachedDatabaseConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      attachedDatabaseConfigurationName: attachedDatabaseConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

/** Deletes the attached database configuration with the given name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  options: AttachedDatabaseConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  parameters: AttachedDatabaseConfiguration,
  options: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      attachedDatabaseConfigurationName: attachedDatabaseConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attachedDatabaseConfigurationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedDatabaseConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedDatabaseConfigurationDeserializer(result.body);
}

/** Creates or updates an attached database configuration. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  parameters: AttachedDatabaseConfiguration,
  options: AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AttachedDatabaseConfiguration>, AttachedDatabaseConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        attachedDatabaseConfigurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<AttachedDatabaseConfiguration>, AttachedDatabaseConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  options: AttachedDatabaseConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      attachedDatabaseConfigurationName: attachedDatabaseConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
): Promise<AttachedDatabaseConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedDatabaseConfigurationDeserializer(result.body);
}

/** Returns an attached database configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  attachedDatabaseConfigurationName: string,
  options: AttachedDatabaseConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<AttachedDatabaseConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    attachedDatabaseConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
