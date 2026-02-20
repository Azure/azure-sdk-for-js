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
  id: string,
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}/runs{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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
  id: string,
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduleRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, id, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}

export function _getRunSend(
  context: Client,
  scheduleId: string,
  runId: string,
  options: BetaSchedulesGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{schedule_id}/runs/{run_id}{?api-version}",
    {
      schedule_id: scheduleId,
      run_id: runId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
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
  options: BetaSchedulesGetRunOptionalParams = { requestOptions: {} },
): Promise<ScheduleRun> {
  const result = await _getRunSend(context, scheduleId, runId, options);
  return _getRunDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  id: string,
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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
  id: string,
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _createOrUpdateSend(context, id, schedule, options);
  return _createOrUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaSchedulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules{?api-version,type,enabled}",
    {
      "api-version": context.apiVersion,
      type: options?.typeParam,
      enabled: options?.enabled,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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
  options: BetaSchedulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion },
  );
}

export function _getSend(
  context: Client,
  id: string,
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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
  id: string,
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  id: string,
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
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
export async function $delete(
  context: Client,
  id: string,
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, id, options);
  return _$deleteDeserialize(result);
}
