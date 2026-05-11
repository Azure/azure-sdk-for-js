// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  Schedule,
  scheduleSerializer,
  scheduleDeserializer,
  _PagedSchedule,
  _pagedScheduleDeserializer,
  ScheduleRun,
  scheduleRunDeserializer,
  _PagedScheduleRun,
  _pagedScheduleRunDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaSchedulesListRunsOptionalParams,
  BetaSchedulesGetRunOptionalParams,
  BetaSchedulesCreateOrUpdateOptionalParams,
  BetaSchedulesListOptionalParams,
  BetaSchedulesGetOptionalParams,
  BetaSchedulesDeleteOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRunsSend(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{id}/runs{?api%2Dversion,type,enabled}",
    {
      id: scheduleId,
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam,
      enabled: options?.enabled,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedScheduleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedScheduleRunDeserializer(result.body);
}

/** List all schedule runs. */
export function listRuns(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduleRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, scheduleId, foundryFeatures, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getRunSend(
  context: Client,
  scheduleId: string,
  runId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{schedule_id}/runs/{run_id}{?api%2Dversion}",
    {
      schedule_id: scheduleId,
      run_id: runId,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRunDeserialize(result: PathUncheckedResponse): Promise<ScheduleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return scheduleRunDeserializer(result.body);
}

/** Get a schedule run by id. */
export async function getRun(
  context: Client,
  scheduleId: string,
  runId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesGetRunOptionalParams = { requestOptions: {} },
): Promise<ScheduleRun> {
  const result = await _getRunSend(context, scheduleId, runId, foundryFeatures, options);
  return _getRunDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{id}{?api%2Dversion}",
    {
      id: scheduleId,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: scheduleSerializer(schedule),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Schedule> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return scheduleDeserializer(result.body);
}

/** Create or update operation template. */
export async function createOrUpdate(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _createOrUpdateSend(context, scheduleId, foundryFeatures, schedule, options);
  return _createOrUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules{?api%2Dversion,type,enabled}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam,
      enabled: options?.enabled,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedScheduleDeserializer(result.body);
}

/** List all schedules. */
export function list(
  context: Client,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{id}{?api%2Dversion}",
    {
      id: scheduleId,
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Schedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return scheduleDeserializer(result.body);
}

/** Get a schedule by id. */
export async function get(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _getSend(context, scheduleId, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{id}{?api%2Dversion}",
    {
      id: scheduleId,
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
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a schedule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scheduleId: string,
  foundryFeatures: "Schedules=V1Preview",
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scheduleId, foundryFeatures, options);
  return _$deleteDeserialize(result);
}
