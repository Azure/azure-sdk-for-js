// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  EvaluationSuiteVersion,
  _PagedEvaluatorVersion,
  EvaluatorVersion,
  EvaluatorGenerationJob,
  _AgentsPagedResultEvaluatorGenerationJob,
  EvaluationSuiteRunRequest,
  EvaluationSuiteRunResponse,
  EvaluationSuiteGenerationJob,
  _AgentsPagedResultEvaluationSuiteGenerationJob,
} from "../../../models/models.js";
import {
  evaluationSuiteVersionSerializer,
  evaluationSuiteVersionDeserializer,
  evaluatorVersionSerializer,
  evaluatorVersionDeserializer,
  _pagedEvaluatorVersionDeserializer,
  evaluatorGenerationJobSerializer,
  evaluatorGenerationJobDeserializer,
  _agentsPagedResultEvaluatorGenerationJobDeserializer,
  evaluationSuiteRunRequestSerializer,
  evaluationSuiteRunResponseDeserializer,
  evaluationSuiteGenerationJobSerializer,
  evaluationSuiteGenerationJobDeserializer,
  _agentsPagedResultEvaluationSuiteGenerationJobDeserializer,
  apiErrorResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams,
  BetaEvaluatorsCancelGenerationSuiteJobOptionalParams,
  BetaEvaluatorsListGenerationSuiteJobsOptionalParams,
  BetaEvaluatorsGetGenerationSuiteJobOptionalParams,
  BetaEvaluatorsCreateGenerationSuiteJobOptionalParams,
  BetaEvaluatorsRunEvaluationSuiteOptionalParams,
  BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
  BetaEvaluatorsDeleteGenerationJobOptionalParams,
  BetaEvaluatorsCancelGenerationJobOptionalParams,
  BetaEvaluatorsListGenerationJobsOptionalParams,
  BetaEvaluatorsGetGenerationJobOptionalParams,
  BetaEvaluatorsCreateGenerationJobOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteGenerationSuiteJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suite_generation_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _deleteGenerationSuiteJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a job (preview). Returns 204 No Content. */
export async function deleteGenerationSuiteJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsDeleteGenerationSuiteJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteGenerationSuiteJobSend(context, jobId, options);
  return _deleteGenerationSuiteJobDeserialize(result);
}

export function _cancelGenerationSuiteJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsCancelGenerationSuiteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suite_generation_jobs/{jobId}:cancel{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _cancelGenerationSuiteJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluationSuiteGenerationJobDeserializer(result.body);
}

/** Cancel a running job (preview). Returns 200 with the updated job. */
export async function cancelGenerationSuiteJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsCancelGenerationSuiteJobOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteGenerationJob> {
  const result = await _cancelGenerationSuiteJobSend(context, jobId, options);
  return _cancelGenerationSuiteJobDeserialize(result);
}

export function _listGenerationSuiteJobsSend(
  context: Client,
  options: BetaEvaluatorsListGenerationSuiteJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suite_generation_jobs{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
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

export async function _listGenerationSuiteJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultEvaluationSuiteGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultEvaluationSuiteGenerationJobDeserializer(result.body);
}

/** List jobs with cursor-based pagination (preview). Includes optional Foundry-Features header. */
export function listGenerationSuiteJobs(
  context: Client,
  options: BetaEvaluatorsListGenerationSuiteJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationSuiteGenerationJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listGenerationSuiteJobsSend(context, options),
    _listGenerationSuiteJobsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getGenerationSuiteJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsGetGenerationSuiteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suite_generation_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _getGenerationSuiteJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluationSuiteGenerationJobDeserializer(result.body);
}

/** Get a job by ID (preview). Includes optional Foundry-Features header. */
export async function getGenerationSuiteJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsGetGenerationSuiteJobOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteGenerationJob> {
  const result = await _getGenerationSuiteJobSend(context, jobId, options);
  return _getGenerationSuiteJobDeserialize(result);
}

export function _createGenerationSuiteJobSend(
  context: Client,
  job: EvaluationSuiteGenerationJob,
  options: BetaEvaluatorsCreateGenerationSuiteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suite_generation_jobs{?api-version}",
    {
      "api-version": context.apiVersion ?? "v1",
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
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluationSuiteGenerationJobSerializer(job),
  });
}

export async function _createGenerationSuiteJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteGenerationJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluationSuiteGenerationJobDeserializer(result.body);
}

/** Create a new job (preview). Includes optional Foundry-Features header and Operation-Id for idempotent retries. */
export async function createGenerationSuiteJob(
  context: Client,
  job: EvaluationSuiteGenerationJob,
  options: BetaEvaluatorsCreateGenerationSuiteJobOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteGenerationJob> {
  const result = await _createGenerationSuiteJobSend(context, job, options);
  return _createGenerationSuiteJobDeserialize(result);
}

export function _runEvaluationSuiteSend(
  context: Client,
  name: string,
  body: EvaluationSuiteRunRequest,
  options: BetaEvaluatorsRunEvaluationSuiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}:run{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion ?? "v1",
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
    body: evaluationSuiteRunRequestSerializer(body),
  });
}

export async function _runEvaluationSuiteDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteRunResponse> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluationSuiteRunResponseDeserializer(result.body);
}

/** Run an evaluation using the suite's testing criteria and dataset. */
export async function runEvaluationSuite(
  context: Client,
  name: string,
  body: EvaluationSuiteRunRequest,
  options: BetaEvaluatorsRunEvaluationSuiteOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteRunResponse> {
  const result = await _runEvaluationSuiteSend(context, name, body, options);
  return _runEvaluationSuiteDeserialize(result);
}

export function _createEvaluationSuiteVersionSend(
  context: Client,
  name: string,
  evaluationSuiteVersion: EvaluationSuiteVersion,
  options: BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluation_suites/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion ?? "v1",
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
    body: evaluationSuiteVersionSerializer(evaluationSuiteVersion),
  });
}

export async function _createEvaluationSuiteVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSuiteVersion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluationSuiteVersionDeserializer(result.body);
}

/** Create a new EvaluationSuiteVersion with auto incremented version id */
export async function createEvaluationSuiteVersion(
  context: Client,
  name: string,
  evaluationSuiteVersion: EvaluationSuiteVersion,
  options: BetaEvaluatorsCreateEvaluationSuiteVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluationSuiteVersion> {
  const result = await _createEvaluationSuiteVersionSend(
    context,
    name,
    evaluationSuiteVersion,
    options,
  );
  return _createEvaluationSuiteVersionDeserialize(result);
}

export function _deleteGenerationJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _deleteGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Deletes an evaluator generation job by its ID. Deletes the job record only;
 * the generated evaluator (if any) is preserved.
 */
export async function deleteGenerationJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteGenerationJobSend(context, jobId, options);
  return _deleteGenerationJobDeserialize(result);
}

export function _cancelGenerationJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsCancelGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}:cancel{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _cancelGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluatorGenerationJobDeserializer(result.body);
}

/** Cancels an evaluator generation job by its ID. */
export async function cancelGenerationJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsCancelGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _cancelGenerationJobSend(context, jobId, options);
  return _cancelGenerationJobDeserialize(result);
}

export function _listGenerationJobsSend(
  context: Client,
  options: BetaEvaluatorsListGenerationJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs{?limit,order,after,before,category,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      category: options?.category,
      "api-version": context.apiVersion ?? "v1",
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

export async function _listGenerationJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultEvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultEvaluatorGenerationJobDeserializer(result.body);
}

/** Returns a list of evaluator generation jobs. */
export function listGenerationJobs(
  context: Client,
  options: BetaEvaluatorsListGenerationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorGenerationJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listGenerationJobsSend(context, options),
    _listGenerationJobsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getGenerationJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsGetGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}{?api-version}",
    {
      jobId: jobId,
      "api-version": context.apiVersion ?? "v1",
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

export async function _getGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluatorGenerationJobDeserializer(result.body);
}

/** Gets the details of an evaluator generation job by its ID. */
export async function getGenerationJob(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsGetGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _getGenerationJobSend(context, jobId, options);
  return _getGenerationJobDeserialize(result);
}

export function _createGenerationJobSend(
  context: Client,
  job: EvaluatorGenerationJob,
  options: BetaEvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs{?api-version}",
    {
      "api-version": context.apiVersion ?? "v1",
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
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorGenerationJobSerializer(job),
  });
}

export async function _createGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorGenerationJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return evaluatorGenerationJobDeserializer(result.body);
}

/**
 * Creates an evaluator generation job. The service generates rubric-based evaluator
 * definitions from the provided source materials asynchronously.
 */
export async function createGenerationJob(
  context: Client,
  job: EvaluatorGenerationJob,
  options: BetaEvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _createGenerationJobSend(context, job, options);
  return _createGenerationJobDeserialize(result);
}

export function _updateVersionSend(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
  });
}

export async function _updateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Update an existing EvaluatorVersion with the given version id */
export async function updateVersion(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(context, name, version, evaluatorVersion, options);
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version}",
    {
      name: name,
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: evaluatorVersionSerializer(evaluatorVersion),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Create a new EvaluatorVersion with auto incremented version id */
export async function createVersion(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(context, name, evaluatorVersion, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the EvaluatorVersion. The service returns 204 No Content if the EvaluatorVersion was deleted successfully or if the EvaluatorVersion does not exist. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluatorVersionDeserializer(result.body);
}

/** Get the specific version of the EvaluatorVersion. The service returns 404 Not Found error if the EvaluatorVersion does not exist. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators{?api-version,type,limit}",
    {
      "api-version": context.apiVersion,
      type: options?.evaluatorType as any,
      limit: options?.limit,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List the latest version of each evaluator */
export function list(
  context: Client,
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
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
          "foundry-features": "Evaluations=V1Preview",
        },
      },
    },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "Evaluations=V1Preview";
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api-version,type,limit}",
    {
      name: name,
      "api-version": context.apiVersion,
      type: options?.evaluatorType as any,
      limit: options?.limit,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluatorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluatorVersionDeserializer(result.body);
}

/** List all versions of the given evaluator */
export function listVersions(
  context: Client,
  name: string,
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "Evaluations=V1Preview",
        },
      },
    },
  );
}
