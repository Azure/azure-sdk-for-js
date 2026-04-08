// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  AdvancedThreatProtectionName,
  ManagedInstanceAdvancedThreatProtection,
  _ManagedInstanceAdvancedThreatProtectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstanceAdvancedThreatProtectionSerializer,
  managedInstanceAdvancedThreatProtectionDeserializer,
  _managedInstanceAdvancedThreatProtectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams,
  ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceAdvancedThreatProtectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceAdvancedThreatProtectionListResultDeserializer(result.body);
}

/** Get the managed instance's Advanced Threat Protection settings. */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedInstanceAdvancedThreatProtection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ManagedInstanceAdvancedThreatProtection,
  options: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      advancedThreatProtectionName: advancedThreatProtectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedInstanceAdvancedThreatProtectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedInstanceAdvancedThreatProtection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceAdvancedThreatProtectionDeserializer(result.body);
}

/** Creates or updates Advanced Threat Protection settings. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: ManagedInstanceAdvancedThreatProtection,
  options: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<ManagedInstanceAdvancedThreatProtection>,
  ManagedInstanceAdvancedThreatProtection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<ManagedInstanceAdvancedThreatProtection>,
    ManagedInstanceAdvancedThreatProtection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      advancedThreatProtectionName: advancedThreatProtectionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedInstanceAdvancedThreatProtection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceAdvancedThreatProtectionDeserializer(result.body);
}

/** Get a managed instance's Advanced Threat Protection state. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedInstanceAdvancedThreatProtection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    advancedThreatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
