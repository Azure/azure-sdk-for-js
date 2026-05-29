// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  View,
  viewSerializer,
  viewDeserializer,
  _ViewListResult,
  _viewListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ViewsListByScopeOptionalParams,
  ViewsDeleteByScopeOptionalParams,
  ViewsCreateOrUpdateByScopeOptionalParams,
  ViewsGetByScopeOptionalParams,
  ViewsListOptionalParams,
  ViewsDeleteOptionalParams,
  ViewsCreateOrUpdateOptionalParams,
  ViewsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByScopeSend(
  context: Client,
  scope: string,
  options: ViewsListByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/views{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_ViewListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _viewListResultDeserializer(result.body);
}

/** Lists all views at the given scope. */
export function listByScope(
  context: Client,
  scope: string,
  options: ViewsListByScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<View> {
  return buildPagedAsyncIterator(
    context,
    () => _listByScopeSend(context, scope, options),
    _listByScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _deleteByScopeSend(
  context: Client,
  scope: string,
  viewName: string,
  options: ViewsDeleteByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      scope: scope,
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation to delete a view. */
export async function deleteByScope(
  context: Client,
  scope: string,
  viewName: string,
  options: ViewsDeleteByScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByScopeSend(context, scope, viewName, options);
  return _deleteByScopeDeserialize(result);
}

export function _createOrUpdateByScopeSend(
  context: Client,
  scope: string,
  viewName: string,
  parameters: View,
  options: ViewsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      scope: scope,
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: viewSerializer(parameters),
  });
}

export async function _createOrUpdateByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<View> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return viewDeserializer(result.body);
}

/** The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
export async function createOrUpdateByScope(
  context: Client,
  scope: string,
  viewName: string,
  parameters: View,
  options: ViewsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): Promise<View> {
  const result = await _createOrUpdateByScopeSend(context, scope, viewName, parameters, options);
  return _createOrUpdateByScopeDeserialize(result);
}

export function _getByScopeSend(
  context: Client,
  scope: string,
  viewName: string,
  options: ViewsGetByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      scope: scope,
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getByScopeDeserialize(result: PathUncheckedResponse): Promise<View> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return viewDeserializer(result.body);
}

/** Gets the view for the defined scope by view name. */
export async function getByScope(
  context: Client,
  scope: string,
  viewName: string,
  options: ViewsGetByScopeOptionalParams = { requestOptions: {} },
): Promise<View> {
  const result = await _getByScopeSend(context, scope, viewName, options);
  return _getByScopeDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ViewsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/views{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ViewListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _viewListResultDeserializer(result.body);
}

/** Lists all views by tenant and object. */
export function list(
  context: Client,
  options: ViewsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<View> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  viewName: string,
  options: ViewsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** The operation to delete a view. */
export async function $delete(
  context: Client,
  viewName: string,
  options: ViewsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, viewName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  viewName: string,
  parameters: View,
  options: ViewsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: viewSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<View> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return viewDeserializer(result.body);
}

/** The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
export async function createOrUpdate(
  context: Client,
  viewName: string,
  parameters: View,
  options: ViewsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<View> {
  const result = await _createOrUpdateSend(context, viewName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  viewName: string,
  options: ViewsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/views/{viewName}{?api%2Dversion}",
    {
      viewName: viewName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<View> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return viewDeserializer(result.body);
}

/** Gets the view by view name. */
export async function get(
  context: Client,
  viewName: string,
  options: ViewsGetOptionalParams = { requestOptions: {} },
): Promise<View> {
  const result = await _getSend(context, viewName, options);
  return _getDeserialize(result);
}
