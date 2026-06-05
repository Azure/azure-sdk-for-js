// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  ScheduledAction,
  scheduledActionSerializer,
  scheduledActionDeserializer,
  errorResponseWithNestedDetailsDeserializer,
  _ScheduledActionListResult,
  _scheduledActionListResultDeserializer,
  CheckNameAvailabilityRequest,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ScheduledActionsCheckNameAvailabilityByScopeOptionalParams,
  ScheduledActionsCheckNameAvailabilityOptionalParams,
  ScheduledActionsRunByScopeOptionalParams,
  ScheduledActionsListByScopeOptionalParams,
  ScheduledActionsDeleteByScopeOptionalParams,
  ScheduledActionsCreateOrUpdateByScopeOptionalParams,
  ScheduledActionsGetByScopeOptionalParams,
  ScheduledActionsRunOptionalParams,
  ScheduledActionsListOptionalParams,
  ScheduledActionsDeleteOptionalParams,
  ScheduledActionsCreateOrUpdateOptionalParams,
  ScheduledActionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkNameAvailabilityByScopeSend(
  context: Client,
  scope: string,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ScheduledActionsCheckNameAvailabilityByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/checkNameAvailability{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(checkNameAvailabilityRequest),
  });
}

export async function _checkNameAvailabilityByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks availability and correctness of the name for a scheduled action within the given scope. */
export async function checkNameAvailabilityByScope(
  context: Client,
  scope: string,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ScheduledActionsCheckNameAvailabilityByScopeOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilityByScopeSend(
    context,
    scope,
    checkNameAvailabilityRequest,
    options,
  );
  return _checkNameAvailabilityByScopeDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ScheduledActionsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/checkNameAvailability{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(checkNameAvailabilityRequest),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks availability and correctness of the name for a scheduled action. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ScheduledActionsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityRequest, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _runByScopeSend(
  context: Client,
  scope: string,
  name: string,
  options: ScheduledActionsRunByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}/execute{?api%2Dversion}",
    {
      scope: scope,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runByScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Runs a shared scheduled action within the given scope. */
export async function runByScope(
  context: Client,
  scope: string,
  name: string,
  options: ScheduledActionsRunByScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runByScopeSend(context, scope, name, options);
  return _runByScopeDeserialize(result);
}

export function _listByScopeSend(
  context: Client,
  scope: string,
  options: ScheduledActionsListByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/scheduledActions{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
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
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}

/** List all shared scheduled actions within the given scope. */
export function listByScope(
  context: Client,
  scope: string,
  options: ScheduledActionsListByScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduledAction> {
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
  name: string,
  options: ScheduledActionsDeleteByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      scope: scope,
      name: name,
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
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a scheduled action within the given scope. */
export async function deleteByScope(
  context: Client,
  scope: string,
  name: string,
  options: ScheduledActionsDeleteByScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByScopeSend(context, scope, name, options);
  return _deleteByScopeDeserialize(result);
}

export function _createOrUpdateByScopeSend(
  context: Client,
  scope: string,
  name: string,
  scheduledAction: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      scope: scope,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: scheduledActionSerializer(scheduledAction),
  });
}

export async function _createOrUpdateByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledAction> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}

/** Create or update a shared scheduled action within the given scope. */
export async function createOrUpdateByScope(
  context: Client,
  scope: string,
  name: string,
  scheduledAction: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateByScopeOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _createOrUpdateByScopeSend(context, scope, name, scheduledAction, options);
  return _createOrUpdateByScopeDeserialize(result);
}

export function _getByScopeSend(
  context: Client,
  scope: string,
  name: string,
  options: ScheduledActionsGetByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      scope: scope,
      name: name,
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

export async function _getByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}

/** Get the shared scheduled action from the given scope by name. */
export async function getByScope(
  context: Client,
  scope: string,
  name: string,
  options: ScheduledActionsGetByScopeOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _getByScopeSend(context, scope, name, options);
  return _getByScopeDeserialize(result);
}

export function _runSend(
  context: Client,
  name: string,
  options: ScheduledActionsRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/scheduledActions/{name}/execute{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Processes a private scheduled action. */
export async function run(
  context: Client,
  name: string,
  options: ScheduledActionsRunOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runSend(context, name, options);
  return _runDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ScheduledActionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/scheduledActions{?api%2Dversion,%24filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
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
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}

/** List all private scheduled actions. */
export function list(
  context: Client,
  options: ScheduledActionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduledAction> {
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
  name: string,
  options: ScheduledActionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      name: name,
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
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a private scheduled action. */
export async function $delete(
  context: Client,
  name: string,
  options: ScheduledActionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  name: string,
  scheduledAction: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: scheduledActionSerializer(scheduledAction),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledAction> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}

/** Create or update a private scheduled action. */
export async function createOrUpdate(
  context: Client,
  name: string,
  scheduledAction: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _createOrUpdateSend(context, name, scheduledAction, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  options: ScheduledActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/scheduledActions/{name}{?api%2Dversion}",
    {
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScheduledAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseWithNestedDetailsDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}

/** Get the private scheduled action by name. */
export async function get(
  context: Client,
  name: string,
  options: ScheduledActionsGetOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
