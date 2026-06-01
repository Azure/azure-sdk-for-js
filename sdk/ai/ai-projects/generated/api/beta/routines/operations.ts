// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  routineTriggerUnionRecordSerializer,
  RoutineTriggerUnion,
  routineActionUnionSerializer,
  RoutineActionUnion,
  Routine,
  routineDeserializer,
  _AgentsPagedResultRoutine,
  _agentsPagedResultRoutineDeserializer,
  _AgentsPagedResultRoutineRun,
  _agentsPagedResultRoutineRunDeserializer,
  RoutineRun,
  routineDispatchPayloadUnionSerializer,
  DispatchRoutineResponse,
  dispatchRoutineResponseDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaRoutinesDispatchAsyncOptionalParams,
  BetaRoutinesListRunsOptionalParams,
  BetaRoutinesDeleteOptionalParams,
  BetaRoutinesListOptionalParams,
  BetaRoutinesDisableOptionalParams,
  BetaRoutinesEnableOptionalParams,
  BetaRoutinesGetOptionalParams,
  BetaRoutinesCreateOrUpdateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _dispatchAsyncSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDispatchAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}:dispatch_async{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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

export async function _dispatchAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<DispatchRoutineResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return dispatchRoutineResponseDeserializer(result.body);
}

/** Queue an asynchronous routine dispatch. */
export async function dispatchAsync(
  context: Client,
  routineName: string,
  options: BetaRoutinesDispatchAsyncOptionalParams = { requestOptions: {} },
): Promise<DispatchRoutineResponse> {
  const result = await _dispatchAsyncSend(context, routineName, options);
  return _dispatchAsyncDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}/runs{?filter,limit,order,after,before,api%2Dversion}",
    {
      routine_name: routineName,
      filter: options?.filter,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultRoutineRunDeserializer(result.body);
}

/** List prior runs for a routine. */
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
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _$deleteSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a routine. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
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
    "/routines{?limit,order,after,before,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultRoutineDeserializer(result.body);
}

/** List routines. */
export function list(
  context: Client,
  options: BetaRoutinesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Routine> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _disableSend(
  context: Client,
  routineName: string,
  options: BetaRoutinesDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}:disable{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Disable a routine. */
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
    "/routines/{routine_name}:enable{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Enable a routine. */
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
    "/routines/{routine_name}{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Retrieve a routine. */
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
  triggers: Record<string, RoutineTriggerUnion>,
  action: RoutineActionUnion,
  options: BetaRoutinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routines/{routine_name}{?api%2Dversion}",
    {
      routine_name: routineName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        triggers: routineTriggerUnionRecordSerializer(triggers),
        action: routineActionUnionSerializer(action),
      },
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Routine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return routineDeserializer(result.body);
}

/** Create or update a routine. */
export async function createOrUpdate(
  context: Client,
  routineName: string,
  triggers: Record<string, RoutineTriggerUnion>,
  action: RoutineActionUnion,
  options: BetaRoutinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Routine> {
  const result = await _createOrUpdateSend(context, routineName, triggers, action, options);
  return _createOrUpdateDeserialize(result);
}
