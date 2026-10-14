// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext as Client } from "../index.js";
import type { _DeploymentListResult, Deployment } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _deploymentListResultDeserializer,
  deploymentSerializer,
  deploymentDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeploymentsListByDeviceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDeviceGroupSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeploymentsListByDeviceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24maxpagesize": options?.maxpagesize,
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

export async function _listByDeviceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** List Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function listByDeviceGroup(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeploymentsListByDeviceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDeviceGroupSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    _listByDeviceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

/** Delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  resource: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  resource: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Deployment>, Deployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<Deployment>, Deployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      productName: productName,
      deviceGroupName: deviceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    deploymentName,
    options,
  );
  return _getDeserialize(result);
}
