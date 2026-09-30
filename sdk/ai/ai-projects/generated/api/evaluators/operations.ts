// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  _PagedEvaluatorVersion,
  _pagedEvaluatorVersionDeserializer,
  EvaluatorVersion,
  evaluatorVersionSerializer,
  evaluatorVersionDeserializer,
  EvaluatorGenerationJob,
  evaluatorGenerationJobSerializer,
  evaluatorGenerationJobDeserializer,
  _AgentsPagedResultEvaluatorGenerationJob,
  _agentsPagedResultEvaluatorGenerationJobDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluatorsDeleteGenerationJobOptionalParams,
  EvaluatorsCancelGenerationJobOptionalParams,
  EvaluatorsListGenerationJobsOptionalParams,
  EvaluatorsGetGenerationJobOptionalParams,
  EvaluatorsCreateGenerationJobOptionalParams,
  EvaluatorsUpdateVersionOptionalParams,
  EvaluatorsCreateVersionOptionalParams,
  EvaluatorsDeleteVersionOptionalParams,
  EvaluatorsGetVersionOptionalParams,
  EvaluatorsListOptionalParams,
  EvaluatorsListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteGenerationJobSend(
  context: Client,
  jobId: string,
  options: EvaluatorsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/**
 * Deletes an evaluator generation job by its ID. Deletes the job record only;
 * the generated evaluator (if any) is preserved.
 */
export async function deleteGenerationJob(
  context: Client,
  jobId: string,
  options: EvaluatorsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteGenerationJobSend(context, jobId, options);
  return _deleteGenerationJobDeserialize(result);
}

export function _cancelGenerationJobSend(
  context: Client,
  jobId: string,
  options: EvaluatorsCancelGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}:cancel{?api%2Dversion}",
    {
      jobId: jobId,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return evaluatorGenerationJobDeserializer(result.body);
}

/** Cancels an evaluator generation job by its ID. */
export async function cancelGenerationJob(
  context: Client,
  jobId: string,
  options: EvaluatorsCancelGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _cancelGenerationJobSend(context, jobId, options);
  return _cancelGenerationJobDeserialize(result);
}

export function _listGenerationJobsSend(
  context: Client,
  options: EvaluatorsListGenerationJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs{?limit,order,after,before,api%2Dversion}",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listGenerationJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultEvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultEvaluatorGenerationJobDeserializer(result.body);
}

/**
 * Returns a list of evaluator generation jobs. The List API has up to a few
 * seconds of propagation delay, so a recently created job may not appear
 * immediately; use the Get evaluator generation job API with the job ID to
 * retrieve a specific job without delay.
 */
export function listGenerationJobs(
  context: Client,
  options: EvaluatorsListGenerationJobsOptionalParams = { requestOptions: {} },
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
  options: EvaluatorsGetGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return evaluatorGenerationJobDeserializer(result.body);
}

/** Gets the details of an evaluator generation job by its ID. */
export async function getGenerationJob(
  context: Client,
  jobId: string,
  options: EvaluatorsGetGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _getGenerationJobSend(context, jobId, options);
  return _getGenerationJobDeserialize(result);
}

export function _createGenerationJobSend(
  context: Client,
  job: EvaluatorGenerationJob,
  options: EvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluator_generation_jobs{?api%2Dversion}",
    {
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
        ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluatorGenerationJobSerializer(job),
    });
}

export async function _createGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluatorVersion> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return evaluatorVersionDeserializer(result.body.result);
}

/**
 * Creates an evaluator generation job. The service generates rubric-based evaluator
 * definitions from the provided source materials asynchronously.
 */
export function createGenerationJob(
  context: Client,
  job: EvaluatorGenerationJob,
  options: EvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EvaluatorVersion>, EvaluatorVersion> {
  return getLongRunningPoller(context, _createGenerationJobDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createGenerationJobSend(context, job, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<EvaluatorVersion>, EvaluatorVersion>;
}

export function _updateVersionSend(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: EvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Updates the specified evaluator version in place. */
export async function updateVersion(
  context: Client,
  name: string,
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: EvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(context, name, version, evaluatorVersion, options);
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: EvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api%2Dversion}",
    {
      name: name,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Creates a new evaluator version with an auto-incremented version identifier. */
export async function createVersion(
  context: Client,
  name: string,
  evaluatorVersion: EvaluatorVersion,
  options: EvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(context, name, evaluatorVersion, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Removes the specified evaluator version. Returns 204 whether the version existed or not. */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Retrieves the specified evaluator version, returning 404 if it does not exist. */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: EvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  options: EvaluatorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators{?api%2Dversion,type,limit}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam as any,
      limit: options?.limit,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Lists the latest version of each evaluator. */
export function list(
  context: Client,
  options: EvaluatorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: EvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluators/{name}/versions{?api%2Dversion,type,limit}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "v1",
      type: options?.typeParam as any,
      limit: options?.limit,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Returns the available versions for the specified evaluator. */
export function listVersions(
  context: Client,
  name: string,
  options: EvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}
