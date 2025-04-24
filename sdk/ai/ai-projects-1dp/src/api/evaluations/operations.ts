// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Evaluation,
  evaluationSerializer,
  evaluationDeserializer,
  _PagedEvaluation,
  _pagedEvaluationDeserializer,
} from "../../models/models.js";
import {
  EvaluationsCreateRunOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createRunSend(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs:run{?api-version}",
    {
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluationSerializer(evaluation),
  });
}

export async function _createRunDeserialize(result: PathUncheckedResponse): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Creates an evaluation run. */
export async function createRun(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateRunOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _createRunSend(context, evaluation, options);
  return _createRunDeserialize(result);
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedEvaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationDeserializer(result.body);
}

/** List evaluation runs */
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

export function _getSend(
  context: Client,
  name: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs/{name}{?api-version}",
    {
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Get an evaluation run by name. */
export async function get(
  context: Client,
  name: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
