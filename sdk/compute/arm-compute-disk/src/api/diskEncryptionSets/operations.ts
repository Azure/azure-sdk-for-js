// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeDiskContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  DiskEncryptionSet,
  diskEncryptionSetSerializer,
  diskEncryptionSetDeserializer,
  DiskEncryptionSetUpdate,
  diskEncryptionSetUpdateSerializer,
  _DiskEncryptionSetList,
  _diskEncryptionSetListDeserializer,
  _ResourceUriList,
  _resourceUriListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DiskEncryptionSetsListAssociatedResourcesOptionalParams,
  DiskEncryptionSetsListOptionalParams,
  DiskEncryptionSetsListByResourceGroupOptionalParams,
  DiskEncryptionSetsDeleteOptionalParams,
  DiskEncryptionSetsUpdateOptionalParams,
  DiskEncryptionSetsCreateOrUpdateOptionalParams,
  DiskEncryptionSetsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAssociatedResourcesSend(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsListAssociatedResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}/associatedResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskEncryptionSetName: diskEncryptionSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAssociatedResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceUriList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _resourceUriListDeserializer(result.body);
}

/** Lists all resources that are encrypted with this disk encryption set. */
export function listAssociatedResources(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsListAssociatedResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listAssociatedResourcesSend(context, resourceGroupName, diskEncryptionSetName, options),
    _listAssociatedResourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  options: DiskEncryptionSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskEncryptionSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiskEncryptionSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _diskEncryptionSetListDeserializer(result.body);
}

/** Lists all the disk encryption sets under a subscription. */
export function list(
  context: Client,
  options: DiskEncryptionSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiskEncryptionSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DiskEncryptionSetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiskEncryptionSetList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _diskEncryptionSetListDeserializer(result.body);
}

/** Lists all the disk encryption sets under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DiskEncryptionSetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiskEncryptionSet> {
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
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskEncryptionSetName: diskEncryptionSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a disk encryption set. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, diskEncryptionSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  diskEncryptionSet: DiskEncryptionSetUpdate,
  options: DiskEncryptionSetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskEncryptionSetName: diskEncryptionSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: diskEncryptionSetUpdateSerializer(diskEncryptionSet),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiskEncryptionSet> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return diskEncryptionSetDeserializer(result.body);
}

/** Updates (patches) a disk encryption set. */
export function update(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  diskEncryptionSet: DiskEncryptionSetUpdate,
  options: DiskEncryptionSetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiskEncryptionSet>, DiskEncryptionSet> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, diskEncryptionSetName, diskEncryptionSet, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiskEncryptionSet>, DiskEncryptionSet>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  diskEncryptionSet: DiskEncryptionSet,
  options: DiskEncryptionSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskEncryptionSetName: diskEncryptionSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: diskEncryptionSetSerializer(diskEncryptionSet),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiskEncryptionSet> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return diskEncryptionSetDeserializer(result.body);
}

/** Creates or updates a disk encryption set */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  diskEncryptionSet: DiskEncryptionSet,
  options: DiskEncryptionSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiskEncryptionSet>, DiskEncryptionSet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        diskEncryptionSetName,
        diskEncryptionSet,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiskEncryptionSet>, DiskEncryptionSet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskEncryptionSetName: diskEncryptionSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DiskEncryptionSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return diskEncryptionSetDeserializer(result.body);
}

/** Gets information about a disk encryption set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  diskEncryptionSetName: string,
  options: DiskEncryptionSetsGetOptionalParams = { requestOptions: {} },
): Promise<DiskEncryptionSet> {
  const result = await _getSend(context, resourceGroupName, diskEncryptionSetName, options);
  return _getDeserialize(result);
}
