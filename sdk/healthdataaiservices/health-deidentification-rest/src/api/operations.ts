// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeidentificationContext as Client } from "./index.js";
import {
  DeidentificationJob,
  deidentificationJobSerializer,
  deidentificationJobDeserializer,
  _PagedDeidentificationJob,
  _pagedDeidentificationJobDeserializer,
  _PagedDeidentificationDocumentDetails,
  _pagedDeidentificationDocumentDetailsDeserializer,
  DeidentificationDocumentDetails,
  DeidentificationContent,
  deidentificationContentSerializer,
  DeidentificationResult,
  deidentificationResultDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  DeidentifyTextOptionalParams,
  DeleteJobOptionalParams,
  CancelJobOptionalParams,
  ListJobDocumentsOptionalParams,
  ListJobsOptionalParams,
  DeidentifyDocumentsOptionalParams,
  GetJobOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deidentifyTextSend(
  context: Client,
  body: DeidentificationContent,
  options: DeidentifyTextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deid{?api%2Dversion}",
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
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: deidentificationContentSerializer(body),
  });
}

export async function _deidentifyTextDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidentificationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidentificationResultDeserializer(result.body);
}

/** A remote procedure call (RPC) operation. */
export async function deidentifyText(
  context: Client,
  body: DeidentificationContent,
  options: DeidentifyTextOptionalParams = { requestOptions: {} },
): Promise<DeidentificationResult> {
  const result = await _deidentifyTextSend(context, body, options);
  return _deidentifyTextDeserialize(result);
}

export function _deleteJobSend(
  context: Client,
  name: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
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

export async function _deleteJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Removes the record of the job from the service. Does not delete any documents. */
export async function deleteJob(
  context: Client,
  name: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteJobSend(context, name, options);
  return _deleteJobDeserialize(result);
}

export function _cancelJobSend(
  context: Client,
  name: string,
  options: CancelJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{name}:cancel{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
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

export async function _cancelJobDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidentificationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidentificationJobDeserializer(result.body);
}

/**
 * Cancels a job that is in progress.
 *
 * The job will be marked as canceled and the service will stop processing the job. The service will not delete any documents that have already been processed.
 *
 * If the job is already complete, this will have no effect.
 */
export async function cancelJob(
  context: Client,
  name: string,
  options: CancelJobOptionalParams = { requestOptions: {} },
): Promise<DeidentificationJob> {
  const result = await _cancelJobSend(context, name, options);
  return _cancelJobDeserialize(result);
}

export function _listJobDocumentsSend(
  context: Client,
  name: string,
  options: ListJobDocumentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{name}/documents{?api%2Dversion,maxpagesize,continuationToken}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
      maxpagesize: options?.maxpagesize,
      continuationToken: options?.continuationToken,
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

export async function _listJobDocumentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDeidentificationDocumentDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDeidentificationDocumentDetailsDeserializer(result.body);
}

/** Resource list operation template. */
export function listJobDocuments(
  context: Client,
  name: string,
  options: ListJobDocumentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeidentificationDocumentDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobDocumentsSend(context, name, options),
    _listJobDocumentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listJobsSend(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs{?api%2Dversion,maxpagesize,continuationToken}",
    {
      "api%2Dversion": context.apiVersion,
      maxpagesize: options?.maxpagesize,
      continuationToken: options?.continuationToken,
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

export async function _listJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDeidentificationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDeidentificationJobDeserializer(result.body);
}

/** Resource list operation template. */
export function listJobs(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeidentificationJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobsSend(context, options),
    _listJobsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deidentifyDocumentsSend(
  context: Client,
  name: string,
  resource: DeidentificationJob,
  options: DeidentifyDocumentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: deidentificationJobSerializer(resource),
  });
}

export async function _deidentifyDocumentsDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidentificationJob> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidentificationJobDeserializer(result.body);
}

/** Long-running resource create or replace operation template. */
export function deidentifyDocuments(
  context: Client,
  name: string,
  resource: DeidentificationJob,
  options: DeidentifyDocumentsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeidentificationJob>, DeidentificationJob> {
  return getLongRunningPoller(context, _deidentifyDocumentsDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deidentifyDocumentsSend(context, name, resource, options),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<DeidentificationJob>, DeidentificationJob>;
}

export function _getJobSend(
  context: Client,
  name: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/jobs/{name}{?api%2Dversion}",
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

export async function _getJobDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidentificationJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidentificationJobDeserializer(result.body);
}

/** Resource read operation template. */
export async function getJob(
  context: Client,
  name: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): Promise<DeidentificationJob> {
  const result = await _getJobSend(context, name, options);
  return _getJobDeserialize(result);
}
