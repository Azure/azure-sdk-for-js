// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _CloudExadataInfrastructureListResult,
  CloudExadataInfrastructure,
  CloudExadataInfrastructureUpdate,
  ConfigureExascaleCloudExadataInfrastructureDetails,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _cloudExadataInfrastructureListResultDeserializer,
  cloudExadataInfrastructureSerializer,
  cloudExadataInfrastructureDeserializer,
  cloudExadataInfrastructureUpdateSerializer,
  configureExascaleCloudExadataInfrastructureDetailsSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CloudExadataInfrastructuresConfigureExascaleOptionalParams,
  CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  CloudExadataInfrastructuresListByResourceGroupOptionalParams,
  CloudExadataInfrastructuresDeleteOptionalParams,
  CloudExadataInfrastructuresUpdateOptionalParams,
  CloudExadataInfrastructuresGetOptionalParams,
  CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  CloudExadataInfrastructuresListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _configureExascaleSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  body: ConfigureExascaleCloudExadataInfrastructureDetails,
  options: CloudExadataInfrastructuresConfigureExascaleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}/configureExascale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: configureExascaleCloudExadataInfrastructureDetailsSerializer(body),
  });
}

export async function _configureExascaleDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudExadataInfrastructure> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudExadataInfrastructureDeserializer(result.body);
}

/** Configures Exascale on Cloud exadata infrastructure resource */
export function configureExascale(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  body: ConfigureExascaleCloudExadataInfrastructureDetails,
  options: CloudExadataInfrastructuresConfigureExascaleOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure> {
  return getLongRunningPoller(context, _configureExascaleDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _configureExascaleSend(
        context,
        resourceGroupName,
        cloudexadatainfrastructurename,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
}

export function _addStorageCapacitySend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresAddStorageCapacityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}/addStorageCapacity{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _addStorageCapacityDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudExadataInfrastructure> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudExadataInfrastructureDeserializer(result.body);
}

/** Perform add storage capacity on exadata infra */
export function addStorageCapacity(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresAddStorageCapacityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure> {
  return getLongRunningPoller(context, _addStorageCapacityDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addStorageCapacitySend(context, resourceGroupName, cloudexadatainfrastructurename, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CloudExadataInfrastructuresListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CloudExadataInfrastructureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudExadataInfrastructureListResultDeserializer(result.body);
}

/** List CloudExadataInfrastructure resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CloudExadataInfrastructuresListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudExadataInfrastructure> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
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

/** Delete a CloudExadataInfrastructure */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudexadatainfrastructurename, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  properties: CloudExadataInfrastructureUpdate,
  options: CloudExadataInfrastructuresUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cloudExadataInfrastructureUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudExadataInfrastructure> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudExadataInfrastructureDeserializer(result.body);
}

/** Update a CloudExadataInfrastructure */
export function update(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  properties: CloudExadataInfrastructureUpdate,
  options: CloudExadataInfrastructuresUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, cloudexadatainfrastructurename, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudExadataInfrastructure> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudExadataInfrastructureDeserializer(result.body);
}

/** Get a CloudExadataInfrastructure */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: CloudExadataInfrastructuresGetOptionalParams = {
    requestOptions: {},
  },
): Promise<CloudExadataInfrastructure> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudexadatainfrastructurename,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  resource: CloudExadataInfrastructure,
  options: CloudExadataInfrastructuresCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cloudExadataInfrastructureSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudExadataInfrastructure> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudExadataInfrastructureDeserializer(result.body);
}

/** Create a CloudExadataInfrastructure */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  resource: CloudExadataInfrastructure,
  options: CloudExadataInfrastructuresCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudexadatainfrastructurename,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: CloudExadataInfrastructuresListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/cloudExadataInfrastructures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CloudExadataInfrastructureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _cloudExadataInfrastructureListResultDeserializer(result.body);
}

/** List CloudExadataInfrastructure resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: CloudExadataInfrastructuresListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CloudExadataInfrastructure> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
