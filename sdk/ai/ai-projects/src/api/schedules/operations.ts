// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Schedule,
  scheduleSerializer,
  scheduleDeserializer,
  _PagedSchedule,
  _pagedScheduleDeserializer,
  ScheduleRun,
  scheduleRunDeserializer,
  PagedScheduleRun,
  pagedScheduleRunDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SchedulesListRunsOptionalParams,
  SchedulesGetRunOptionalParams,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesListOptionalParams,
  SchedulesGetOptionalParams,
  SchedulesDeleteOptionalParams,
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
  options: SchedulesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{scheduleId}/runs{?api-version}",
    {
      scheduleId: scheduleId,
      "api-version": context.apiVersion,
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

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedScheduleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pagedScheduleRunDeserializer(result.body);
}

/** List all schedule runs. */
export async function listRuns(
  context: Client,
  scheduleId: string,
  options: SchedulesListRunsOptionalParams = { requestOptions: {} },
): Promise<PagedScheduleRun> {
  const result = await _listRunsSend(context, scheduleId, options);
  return _listRunsDeserialize(result);
}

export function _getRunSend(
  context: Client,
  scheduleId: string,
  runId: string,
  options: SchedulesGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules/{scheduleId}/runs/{runId}{?api-version}",
    {
      scheduleId: scheduleId,
      runId: runId,
      "api-version": context.apiVersion,
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

export async function _getRunDeserialize(result: PathUncheckedResponse): Promise<ScheduleRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return scheduleRunDeserializer(result.body);
}

/** Get a schedule run by id. */
export async function getRun(
  context: Client,
  scheduleId: string,
  runId: string,
  options: SchedulesGetRunOptionalParams = { requestOptions: {} },
): Promise<ScheduleRun> {
  const result = await _getRunSend(context, scheduleId, runId, options);
  return _getRunDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  id: string,
  schedule: Schedule,
  options: SchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
    contentType: "application/json",
    headers: {
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

/** Create or update a schedule by id. */
export async function createOrUpdate(
  context: Client,
  id: string,
  schedule: Schedule,
  options: SchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _createOrUpdateSend(context, id, schedule, options);
  return _createOrUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SchedulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/schedules{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
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
  options: SchedulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  id: string,
  options: SchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
  options: SchedulesGetOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  id: string,
  options: SchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
  options: SchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, id, options);
  return _$deleteDeserialize(result);
}
