// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Routine,
  _AgentsPagedResultRoutine,
  _AgentsPagedResultRoutineRun,
  RoutineRun,
  DispatchRoutineResponse,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  routineTriggerUnionRecordSerializer,
  routineActionUnionSerializer,
  routineDeserializer,
  _agentsPagedResultRoutineDeserializer,
  _agentsPagedResultRoutineRunDeserializer,
  routineDispatchPayloadUnionSerializer,
  dispatchRoutineResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaRoutinesDispatchOptionalParams,
  BetaRoutinesListRunsOptionalParams,
  BetaRoutinesDeleteOptionalParams,
  BetaRoutinesListOptionalParams,
  BetaRoutinesDisableOptionalParams,
  BetaRoutinesEnableOptionalParams,
  BetaRoutinesGetOptionalParams,
  BetaRoutinesCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _dispatchSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDispatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}:dispatch_async{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      payload: !options?.payload
        ? options?.payload
        : routineDispatchPayloadUnionSerializer(options?.payload),
    },
  });
}

export async function _dispatchDeserialize(
  result: PathUncheckedResponse,
): Promise<DispatchRoutineResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dispatchRoutineResponseDeserializer(result.body);
}

/** Queues an asynchronous dispatch for the specified routine. */
export async function dispatch(
  context: Client,
  routineName: string,
  options: BetaRoutinesDispatchOptionalParams = { requestOptions: {} },
): Promise<DispatchRoutineResponse> {
  const result = await _dispatchSend(context, routineName, options);
  return _dispatchDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}/runs{?filter,limit,after,before,order,api-version}",
    {
      routine_name: routineName,
      filter: options?.filter,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultRoutineRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultRoutineRunDeserializer(result.body);
}

/** Returns prior runs recorded for the specified routine. */
export function listRuns(
  context: Client,
  routineName: string,
  options: BetaRoutinesListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoutineRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, routineName, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _$deleteSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified routine. */
export async function $delete(
  context: Client,
  routineName: string,
  options: BetaRoutinesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, routineName, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaRoutinesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines{?limit,after,before,order,api-version}",
    {
      limit: options?.limit,
      after: options?.after,
      before: options?.before,
      order: options?.order,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultRoutine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  const body = result.body;
  return {
    data: (body["value"] ?? body["data"] ?? []).map((item: any) => routineDeserializer(item)),
    first_id: body["first_id"],
    last_id: body["last_id"],
    has_more: body["has_more"] ?? false,
  };
}

/** Returns the routines available in the current project. */
export function list(
  context: Client,
  options: BetaRoutinesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Routine> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
    },
  );
}

export function _disableSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}:disable{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<Routine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Disables the specified routine so it no longer runs. */
export async function disable(
  context: Client,
  routineName: string,
  options: BetaRoutinesDisableOptionalParams = { requestOptions: {} },
): Promise<Routine> {
  const result = await _disableSend(context, routineName, options);
  return _disableDeserialize(result);
}

export function _enableSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}:enable{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<Routine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Enables the specified routine so it can be dispatched. */
export async function enable(
  context: Client,
  routineName: string,
  options: BetaRoutinesEnableOptionalParams = { requestOptions: {} },
): Promise<Routine> {
  const result = await _enableSend(context, routineName, options);
  return _enableDeserialize(result);
}

export function _getSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Routine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Retrieves the specified routine and its current configuration. */
export async function get(
  context: Client,
  routineName: string,
  options: BetaRoutinesGetOptionalParams = { requestOptions: {} },
): Promise<Routine> {
  const result = await _getSend(context, routineName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}{?api-version}",
    {
      routine_name: routineName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      description: options?.description,
      enabled: options?.enabled,
      triggers: !options?.triggers
        ? options?.triggers
        : routineTriggerUnionRecordSerializer(options?.triggers),
      action: !options?.action ? options?.action : routineActionUnionSerializer(options?.action),
    },
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Routine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Creates a new routine or replaces an existing routine with the supplied definition. */
export async function createOrUpdate(
  context: Client,
  routineName: string,
  options: BetaRoutinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Routine> {
  const result = await _createOrUpdateSend(context, routineName, options);
  return _createOrUpdateDeserialize(result);
}
