// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Schedule,
  _PagedSchedule,
  ScheduleRun,
  _PagedScheduleRun,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  scheduleSerializer,
  scheduleDeserializer,
  _pagedScheduleDeserializer,
  scheduleRunDeserializer,
  _pagedScheduleRunDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaSchedulesListRunsOptionalParams,
  BetaSchedulesGetRunOptionalParams,
  BetaSchedulesCreateOrUpdateOptionalParams,
  BetaSchedulesListOptionalParams,
  BetaSchedulesGetOptionalParams,
  BetaSchedulesDeleteOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listRunsSend(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}/runs{?api-version,type,enabled}",
    {
      id: scheduleId,
      "api-version": context.apiVersion,
      type: options?.scheduleType,
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

/** Returns schedule runs that match the supplied filters. */
export function listRuns(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduleRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, scheduleId, options),
    _listRunsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Schedules=V1Preview",
        },
      },
    },
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scheduleRunDeserializer(result.body);
}

/** Retrieves the specified run for a schedule. */
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
  scheduleId: string,
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: scheduleId,
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

/** Creates a new schedule or updates an existing schedule with the supplied definition. */
export async function createOrUpdate(
  context: Client,
  scheduleId: string,
  schedule: Schedule,
  options: BetaSchedulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _createOrUpdateSend(context, scheduleId, schedule, options);
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
      type: options?.scheduleType,
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

/** Returns schedules that match the supplied type and enabled filters. */
export function list(
  context: Client,
  options: BetaSchedulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Schedules=V1Preview",
        },
      },
    },
  );
}

export function _getSend(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: scheduleId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Schedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return scheduleDeserializer(result.body);
}

/** Retrieves the specified schedule resource. */
export async function get(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _getSend(context, scheduleId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Schedules=V1Preview";
  const path = expandUrlTemplate(
    "/schedules/{id}{?api-version}",
    {
      id: scheduleId,
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

/** Deletes the specified schedule resource. */
export async function $delete(
  context: Client,
  scheduleId: string,
  options: BetaSchedulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scheduleId, options);
  return _$deleteDeserialize(result);
}
