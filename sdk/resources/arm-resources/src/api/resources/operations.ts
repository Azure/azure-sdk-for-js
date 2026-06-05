// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  _ResourceListResult,
  _resourceListResultDeserializer,
  GenericResourceExpanded,
  GenericResource,
  genericResourceSerializer,
  genericResourceDeserializer,
  ResourcesMoveInfo,
  resourcesMoveInfoSerializer,
  ResourcesCheckExistenceResponse,
  ResourcesCheckExistenceByIdResponse,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ResourcesListOptionalParams,
  ResourcesDeleteOptionalParams,
  ResourcesUpdateOptionalParams,
  ResourcesCreateOrUpdateOptionalParams,
  ResourcesGetOptionalParams,
  ResourcesCheckExistenceOptionalParams,
  ResourcesDeleteByIdOptionalParams,
  ResourcesUpdateByIdOptionalParams,
  ResourcesCreateOrUpdateByIdOptionalParams,
  ResourcesGetByIdOptionalParams,
  ResourcesCheckExistenceByIdOptionalParams,
  ResourcesValidateMoveResourcesOptionalParams,
  ResourcesMoveResourcesOptionalParams,
  ResourcesListByResourceGroupOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: ResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resources{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
      "%24top": options?.top,
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
): Promise<_ResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _resourceListResultDeserializer(result.body);
}

/** Get all the resources in a subscription. */
export function list(
  context: Client,
  options: ResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GenericResourceExpanded> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": apiVersion,
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: genericResourceSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<GenericResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Updates a resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenericResource>, GenericResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GenericResource>, GenericResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: genericResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GenericResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Creates a resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenericResource>, GenericResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GenericResource>, GenericResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GenericResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Gets a resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesGetOptionalParams = { requestOptions: {} },
): Promise<GenericResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourcePath,
    resourceType,
    resourceName,
    apiVersion,
    options,
  );
  return _getDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourcesCheckExistenceResponse> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.status.startsWith("2") };
}

/** Checks whether a resource exists. */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  apiVersion: string,
  options: ResourcesCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<ResourcesCheckExistenceResponse> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    resourceProviderNamespace,
    parentResourcePath,
    resourceType,
    resourceName,
    apiVersion,
    options,
  );
  return _checkExistenceDeserialize(result);
}

export function _deleteByIdSend(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesDeleteByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByIdDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a resource by ID. */
export function deleteById(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesDeleteByIdOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteByIdDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteByIdSend(context, resourceId, apiVersion, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateByIdSend(
  context: Client,
  resourceId: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesUpdateByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: genericResourceSerializer(parameters),
  });
}

export async function _updateByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<GenericResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Update a resource by ID. */
export function updateById(
  context: Client,
  resourceId: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesUpdateByIdOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenericResource>, GenericResource> {
  return getLongRunningPoller(context, _updateByIdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateByIdSend(context, resourceId, apiVersion, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GenericResource>, GenericResource>;
}

export function _createOrUpdateByIdSend(
  context: Client,
  resourceId: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesCreateOrUpdateByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: genericResourceSerializer(parameters),
  });
}

export async function _createOrUpdateByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<GenericResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Create a resource by ID. */
export function createOrUpdateById(
  context: Client,
  resourceId: string,
  apiVersion: string,
  parameters: GenericResource,
  options: ResourcesCreateOrUpdateByIdOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenericResource>, GenericResource> {
  return getLongRunningPoller(context, _createOrUpdateByIdDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateByIdSend(context, resourceId, apiVersion, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<GenericResource>, GenericResource>;
}

export function _getByIdSend(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": apiVersion,
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

export async function _getByIdDeserialize(result: PathUncheckedResponse): Promise<GenericResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return genericResourceDeserializer(result.body);
}

/** Gets a resource by ID. */
export async function getById(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesGetByIdOptionalParams = { requestOptions: {} },
): Promise<GenericResource> {
  const result = await _getByIdSend(context, resourceId, apiVersion, options);
  return _getByIdDeserialize(result);
}

export function _checkExistenceByIdSend(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesCheckExistenceByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourcesCheckExistenceByIdResponse> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.status.startsWith("2") };
}

/** Checks by ID whether a resource exists. This API currently works only for a limited set of Resource providers. In the event that a Resource provider does not implement this API, ARM will respond with a 405. The alternative then is to use the GET API to check for the existence of the resource. */
export async function checkExistenceById(
  context: Client,
  resourceId: string,
  apiVersion: string,
  options: ResourcesCheckExistenceByIdOptionalParams = { requestOptions: {} },
): Promise<ResourcesCheckExistenceByIdResponse> {
  const result = await _checkExistenceByIdSend(context, resourceId, apiVersion, options);
  return _checkExistenceByIdDeserialize(result);
}

export function _validateMoveResourcesSend(
  context: Client,
  sourceResourceGroupName: string,
  parameters: ResourcesMoveInfo,
  options: ResourcesValidateMoveResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{sourceResourceGroupName}/validateMoveResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      sourceResourceGroupName: sourceResourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: resourcesMoveInfoSerializer(parameters),
  });
}

export async function _validateMoveResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This operation checks whether the specified resources can be moved to the target. The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. If validation succeeds, it returns HTTP response code 204 (no content). If validation fails, it returns HTTP response code 409 (Conflict) with an error message. Retrieve the URL in the Location header value to check the result of the long-running operation. */
export function validateMoveResources(
  context: Client,
  sourceResourceGroupName: string,
  parameters: ResourcesMoveInfo,
  options: ResourcesValidateMoveResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _validateMoveResourcesDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateMoveResourcesSend(context, sourceResourceGroupName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _moveResourcesSend(
  context: Client,
  sourceResourceGroupName: string,
  parameters: ResourcesMoveInfo,
  options: ResourcesMoveResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{sourceResourceGroupName}/moveResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      sourceResourceGroupName: sourceResourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: resourcesMoveInfoSerializer(parameters),
  });
}

export async function _moveResourcesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. When moving resources, both the source group and the target group are locked for the duration of the operation. Write and delete operations are blocked on the groups until the move completes. */
export function moveResources(
  context: Client,
  sourceResourceGroupName: string,
  parameters: ResourcesMoveInfo,
  options: ResourcesMoveResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _moveResourcesDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _moveResourcesSend(context, sourceResourceGroupName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/resources{?api%2Dversion,%24filter,%24expand,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
      "%24top": options?.top,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _resourceListResultDeserializer(result.body);
}

/** Get all the resources for a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GenericResourceExpanded> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}
