// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Target,
  targetSerializer,
  targetDeserializer,
  _TargetListResult,
  _targetListResultDeserializer,
} from "../../models/models.js";
import {
  TargetsListOptionalParams,
  TargetsDeleteOptionalParams,
  TargetsCreateOrUpdateOptionalParams,
  TargetsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  options: TargetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parentProviderNamespace: parentProviderNamespace,
      parentResourceType: parentResourceType,
      parentResourceName: parentResourceName,
      "api%2Dversion": context.apiVersion,
      continuationToken: options?.continuationToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_TargetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _targetListResultDeserializer(result.body);
}

/** Get a list of Target resources that extend a tracked regional resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  options: TargetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Target> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        parentProviderNamespace,
        parentResourceType,
        parentResourceName,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parentProviderNamespace: parentProviderNamespace,
      parentResourceType: parentResourceType,
      parentResourceName: parentResourceName,
      targetName: targetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Target resource that extends a tracked regional resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  options: TargetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    parentProviderNamespace,
    parentResourceType,
    parentResourceName,
    targetName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parentProviderNamespace: parentProviderNamespace,
      parentResourceType: parentResourceType,
      parentResourceName: parentResourceName,
      targetName: targetName,
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
    body: targetSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Create or update a Target resource that extends a tracked regional resource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  resource: Target,
  options: TargetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    parentProviderNamespace,
    parentResourceType,
    parentResourceName,
    targetName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parentProviderNamespace: parentProviderNamespace,
      parentResourceType: parentResourceType,
      parentResourceName: parentResourceName,
      targetName: targetName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Target> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetDeserializer(result.body);
}

/** Get a Target resource that extends a tracked regional resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  parentProviderNamespace: string,
  parentResourceType: string,
  parentResourceName: string,
  targetName: string,
  options: TargetsGetOptionalParams = { requestOptions: {} },
): Promise<Target> {
  const result = await _getSend(
    context,
    resourceGroupName,
    parentProviderNamespace,
    parentResourceType,
    parentResourceName,
    targetName,
    options,
  );
  return _getDeserialize(result);
}
