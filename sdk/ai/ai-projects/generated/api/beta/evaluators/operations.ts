// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
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
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaEvaluatorsDeleteGenerationJobOptionalParams,
  BetaEvaluatorsCancelGenerationJobOptionalParams,
  BetaEvaluatorsListGenerationJobsOptionalParams,
  BetaEvaluatorsGetGenerationJobOptionalParams,
  BetaEvaluatorsCreateGenerationJobOptionalParams,
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteGenerationJobSend(
  context: Client,
  jobId: string,
  options: BetaEvaluatorsDeleteGenerationJobOptionalParams = { requestOptions: {} },
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
    "/evaluator_generation_jobs{?limit,order,after,before,category,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      category: options?.category,
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
  body: EvaluatorGenerationJob,
  options: BetaEvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
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
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluatorGenerationJobSerializer(body),
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
  body: EvaluatorGenerationJob,
  options: BetaEvaluatorsCreateGenerationJobOptionalParams = { requestOptions: {} },
): Promise<EvaluatorGenerationJob> {
  const result = await _createGenerationJobSend(context, body, options);
  return _createGenerationJobDeserialize(result);
}

export function _updateVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsUpdateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _updateVersionSend(
    context,
    name,
    foundryFeatures,
    version,
    evaluatorVersion,
    options,
  );
  return _updateVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
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
  foundryFeatures: "Evaluations=V1Preview",
  evaluatorVersion: EvaluatorVersion,
  options: BetaEvaluatorsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _createVersionSend(
    context,
    name,
    foundryFeatures,
    evaluatorVersion,
    options,
  );
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
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
    .delete({
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, foundryFeatures, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
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
  foundryFeatures: "Evaluations=V1Preview",
  version: string,
  options: BetaEvaluatorsGetVersionOptionalParams = { requestOptions: {} },
): Promise<EvaluatorVersion> {
  const result = await _getVersionSend(context, name, foundryFeatures, version, options);
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
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
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
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
  foundryFeatures: "Evaluations=V1Preview",
  options: BetaEvaluatorsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluatorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, foundryFeatures, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}
