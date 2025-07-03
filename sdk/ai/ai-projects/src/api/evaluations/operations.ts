// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Evaluation,
  evaluationSerializer,
  evaluationDeserializer,
  _PagedEvaluation,
  _pagedEvaluationDeserializer,
  AgentEvaluationRequest,
  agentEvaluationRequestSerializer,
  AgentEvaluation,
  agentEvaluationDeserializer,
} from "../../models/models.js";
import {
  EvaluationsCreateAgentEvaluationOptionalParams,
  EvaluationsCreateOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "./options.js";
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

export function _createAgentEvaluationSend(
  context: Client,
  evaluation: AgentEvaluationRequest,
  options: EvaluationsCreateAgentEvaluationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs:runAgent{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
    body: agentEvaluationRequestSerializer(evaluation),
  });
}

export async function _createAgentEvaluationDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentEvaluation> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentEvaluationDeserializer(result.body);
}

/** Creates an agent evaluation run. */
export async function createAgentEvaluation(
  context: Client,
  evaluation: AgentEvaluationRequest,
  options: EvaluationsCreateAgentEvaluationOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentEvaluation> {
  const result = await _createAgentEvaluationSend(context, evaluation, options);
  return _createAgentEvaluationDeserialize(result);
}

export function _createSend(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs:run{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Evaluation> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationDeserializer(result.body);
}

/** Creates an evaluation run. */
export async function create(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _createSend(context, evaluation, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: EvaluationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluations/runs{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
    "/evaluations/runs/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
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
