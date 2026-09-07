// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext as Client } from "../index.js";
import type { ExternalAuth, _ExternalAuthListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  externalAuthSerializer,
  externalAuthDeserializer,
  _externalAuthListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalAuthsListByParentOptionalParams,
  ExternalAuthsDeleteOptionalParams,
  ExternalAuthsUpdateOptionalParams,
  ExternalAuthsCreateOrUpdateOptionalParams,
  ExternalAuthsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: ExternalAuthsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/externalAuths{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExternalAuthListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalAuthListResultDeserializer(result.body);
}

/** List ExternalAuth resources by HcpOpenShiftCluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: ExternalAuthsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalAuth> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, hcpOpenShiftClusterName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  options: ExternalAuthsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/externalAuths/{externalAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      externalAuthName: externalAuthName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

/** Delete a ExternalAuth */
export function $delete(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  options: ExternalAuthsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, hcpOpenShiftClusterName, externalAuthName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  properties: ExternalAuth,
  options: ExternalAuthsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/externalAuths/{externalAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      externalAuthName: externalAuthName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalAuthSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExternalAuth> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalAuthDeserializer(result.body);
}

/** Update a ExternalAuth */
export function update(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  properties: ExternalAuth,
  options: ExternalAuthsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalAuth>, ExternalAuth> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        externalAuthName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<ExternalAuth>, ExternalAuth>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  resource: ExternalAuth,
  options: ExternalAuthsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/externalAuths/{externalAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      externalAuthName: externalAuthName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalAuthSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalAuth> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalAuthDeserializer(result.body);
}

/** Create a ExternalAuth */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  resource: ExternalAuth,
  options: ExternalAuthsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalAuth>, ExternalAuth> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        externalAuthName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<ExternalAuth>, ExternalAuth>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  options: ExternalAuthsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/externalAuths/{externalAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      externalAuthName: externalAuthName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExternalAuth> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalAuthDeserializer(result.body);
}

/** Get a ExternalAuth */
export async function get(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  externalAuthName: string,
  options: ExternalAuthsGetOptionalParams = { requestOptions: {} },
): Promise<ExternalAuth> {
  const result = await _getSend(
    context,
    resourceGroupName,
    hcpOpenShiftClusterName,
    externalAuthName,
    options,
  );
  return _getDeserialize(result);
}
