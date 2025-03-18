// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectContext as Client,
  EvaluationsCreateOptionalParams,
  EvaluationsCreateOrReplaceScheduleOptionalParams,
  EvaluationsDisableScheduleOptionalParams,
  EvaluationsGetOptionalParams,
  EvaluationsGetScheduleOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsListScheduleOptionalParams,
  EvaluationsUpdateOptionalParams,
} from "../index.js";
import {
  Evaluation,
  evaluationSerializer,
  evaluationDeserializer,
  _PagedEvaluation,
  _pagedEvaluationDeserializer,
  EvaluationSchedule,
  evaluationScheduleSerializer,
  evaluationScheduleDeserializer,
  _PagedEvaluationSchedule,
  _pagedEvaluationScheduleDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _disableScheduleSend(
  context: Client,
  name: string,
  options: EvaluationsDisableScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/schedules/{name}/disable{?apiVersion}",
    {
      name: name,
      apiVersion: context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _disableScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Disable the evaluation schedule. */
export async function disableSchedule(
  context: Client,
  name: string,
  options: EvaluationsDisableScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableScheduleSend(context, name, options);
  return _disableScheduleDeserialize(result);
}

export function _listScheduleSend(
  context: Client,
  options: EvaluationsListScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/schedules{?api-version,top,skip,maxpagesize}",
    {
      "api-version": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationScheduleDeserializer(result.body);
}

/** Resource list operation template. */
export function listSchedule(
  context: Client,
  options: EvaluationsListScheduleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listScheduleSend(context, options),
    _listScheduleDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createOrReplaceScheduleSend(
  context: Client,
  name: string,
  resource: EvaluationSchedule,
  options: EvaluationsCreateOrReplaceScheduleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/schedules/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationScheduleSerializer(resource),
    });
}

export async function _createOrReplaceScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSchedule> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationScheduleDeserializer(result.body);
}

/** Create or replace operation template. */
export async function createOrReplaceSchedule(
  context: Client,
  name: string,
  resource: EvaluationSchedule,
  options: EvaluationsCreateOrReplaceScheduleOptionalParams = {
    requestOptions: {},
  },
): Promise<EvaluationSchedule> {
  const result = await _createOrReplaceScheduleSend(
    context,
    name,
    resource,
    options,
  );
  return _createOrReplaceScheduleDeserialize(result);
}

export function _getScheduleSend(
  context: Client,
  name: string,
  options: EvaluationsGetScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/schedules/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationScheduleDeserializer(result.body);
}

/** Resource read operation template. */
export async function getSchedule(
  context: Client,
  name: string,
  options: EvaluationsGetScheduleOptionalParams = { requestOptions: {} },
): Promise<EvaluationSchedule> {
  const result = await _getScheduleSend(context, name, options);
  return _getScheduleDeserialize(result);
}

export function _updateSend(
  context: Client,
  id: string,
  resource: Evaluation,
  options: EvaluationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs/{id}{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationSerializer(resource),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Resource update operation template. */
export async function update(
  context: Client,
  id: string,
  resource: Evaluation,
  options: EvaluationsUpdateOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _updateSend(context, id, resource, options);
  return _updateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: EvaluationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs{?api-version,top,skip,maxpagesize}",
    {
      "api-version": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationDeserializer(result.body);
}

/** Resource list operation template. */
export function list(
  context: Client,
  options: EvaluationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Evaluation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createSend(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs:run{?apiVersion}",
    {
      apiVersion: context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationSerializer(evaluation),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Run the evaluation. */
export async function create(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _createSend(context, evaluation, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  id: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs/{id}{?api-version}",
    {
      id: id,
      "api-version": context.apiVersion,
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Resource read operation template. */
export async function get(
  context: Client,
  id: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}
