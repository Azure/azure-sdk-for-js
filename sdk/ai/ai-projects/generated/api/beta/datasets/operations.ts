// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  DataGenerationJob,
  dataGenerationJobSerializer,
  dataGenerationJobDeserializer,
  _AgentsPagedResultDataGenerationJob,
  _agentsPagedResultDataGenerationJobDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaDatasetsDeleteGenerationJobOptionalParams,
  BetaDatasetsCancelGenerationJobOptionalParams,
  BetaDatasetsCreateGenerationJobOptionalParams,
  BetaDatasetsListGenerationJobsOptionalParams,
  BetaDatasetsGetGenerationJobOptionalParams,
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
  options: BetaDatasetsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data_generation_jobs/{jobId}{?api%2Dversion}",
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

/** Deletes a data generation job by its ID. */
export async function deleteGenerationJob(
  context: Client,
  jobId: string,
  options: BetaDatasetsDeleteGenerationJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteGenerationJobSend(context, jobId, options);
  return _deleteGenerationJobDeserialize(result);
}

export function _cancelGenerationJobSend(
  context: Client,
  jobId: string,
  options: BetaDatasetsCancelGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data_generation_jobs/{jobId}:cancel{?api%2Dversion}",
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
): Promise<DataGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return dataGenerationJobDeserializer(result.body);
}

/** Cancels a data generation job by its ID. */
export async function cancelGenerationJob(
  context: Client,
  jobId: string,
  options: BetaDatasetsCancelGenerationJobOptionalParams = { requestOptions: {} },
): Promise<DataGenerationJob> {
  const result = await _cancelGenerationJobSend(context, jobId, options);
  return _cancelGenerationJobDeserialize(result);
}

export function _createGenerationJobSend(
  context: Client,
  job: DataGenerationJob,
  options: BetaDatasetsCreateGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data_generation_jobs{?api%2Dversion}",
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
      body: dataGenerationJobSerializer(job),
    });
}

export async function _createGenerationJobDeserialize(
  result: PathUncheckedResponse,
): Promise<DataGenerationJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return dataGenerationJobDeserializer(result.body);
}

/** Creates a data generation job. */
export async function createGenerationJob(
  context: Client,
  job: DataGenerationJob,
  options: BetaDatasetsCreateGenerationJobOptionalParams = { requestOptions: {} },
): Promise<DataGenerationJob> {
  const result = await _createGenerationJobSend(context, job, options);
  return _createGenerationJobDeserialize(result);
}

export function _listGenerationJobsSend(
  context: Client,
  options: BetaDatasetsListGenerationJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data_generation_jobs{?limit,order,after,before,scenario,type,api%2Dversion}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      scenario: options?.scenario,
      type: !options?.typeParam
        ? options?.typeParam
        : options?.typeParam.map((p: any) => {
            return p;
          }),
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
): Promise<_AgentsPagedResultDataGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultDataGenerationJobDeserializer(result.body);
}

/** Returns a list of data generation jobs. */
export function listGenerationJobs(
  context: Client,
  options: BetaDatasetsListGenerationJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataGenerationJob> {
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
  options: BetaDatasetsGetGenerationJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/data_generation_jobs/{jobId}{?api%2Dversion}",
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
): Promise<DataGenerationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return dataGenerationJobDeserializer(result.body);
}

/** Gets the details of a data generation job by its ID. */
export async function getGenerationJob(
  context: Client,
  jobId: string,
  options: BetaDatasetsGetGenerationJobOptionalParams = { requestOptions: {} },
): Promise<DataGenerationJob> {
  const result = await _getGenerationJobSend(context, jobId, options);
  return _getGenerationJobDeserialize(result);
}
