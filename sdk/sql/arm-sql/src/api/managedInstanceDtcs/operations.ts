// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ManagedInstanceDtc,
  DtcName,
  _ManagedInstanceDtcListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstanceDtcSerializer,
  managedInstanceDtcDeserializer,
  _managedInstanceDtcListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedInstanceDtcsListByManagedInstanceOptionalParams,
  ManagedInstanceDtcsCreateOrUpdateOptionalParams,
  ManagedInstanceDtcsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstanceDtcsListByManagedInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc{?api%2Dversion}",
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

export async function _listByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceDtcListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceDtcListResultDeserializer(result.body);
}

/** Gets a list of managed instance DTC settings. */
export function listByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstanceDtcsListByManagedInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedInstanceDtc> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByManagedInstanceDeserialize,
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
  dtcName: DtcName,
  parameters: ManagedInstanceDtc,
  options: ManagedInstanceDtcsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc/{dtcName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dtcName: dtcName,
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
    body: managedInstanceDtcSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedInstanceDtc> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDtcDeserializer(result.body);
}

/** Updates managed instance DTC settings. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dtcName: DtcName,
  parameters: ManagedInstanceDtc,
  options: ManagedInstanceDtcsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedInstanceDtc>, ManagedInstanceDtc> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        dtcName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedInstanceDtc>, ManagedInstanceDtc>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dtcName: DtcName,
  options: ManagedInstanceDtcsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc/{dtcName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      dtcName: dtcName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedInstanceDtc> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDtcDeserializer(result.body);
}

/** Gets managed instance DTC settings. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  dtcName: DtcName,
  options: ManagedInstanceDtcsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedInstanceDtc> {
  const result = await _getSend(context, resourceGroupName, managedInstanceName, dtcName, options);
  return _getDeserialize(result);
}
