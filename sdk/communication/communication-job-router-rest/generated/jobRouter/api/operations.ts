// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobRouterContext as Client } from "./index.js";
import {
  RouterJob,
  routerJobSerializer,
  routerJobDeserializer,
  reclassifyJobOptionsSerializer,
  ReclassifyJobResult,
  reclassifyJobResultDeserializer,
  cancelJobOptionsSerializer,
  CancelJobResult,
  cancelJobResultDeserializer,
  completeJobOptionsSerializer,
  CompleteJobResult,
  completeJobResultDeserializer,
  closeJobOptionsSerializer,
  CloseJobResult,
  closeJobResultDeserializer,
  _PagedRouterJob,
  _pagedRouterJobDeserializer,
  RouterJobPositionDetails,
  routerJobPositionDetailsDeserializer,
  unassignJobOptionsSerializer,
  UnassignJobResult,
  unassignJobResultDeserializer,
  AcceptJobOfferResult,
  acceptJobOfferResultDeserializer,
  declineJobOfferOptionsSerializer,
  DeclineJobOfferResult,
  declineJobOfferResultDeserializer,
  RouterQueueStatistics,
  routerQueueStatisticsDeserializer,
  RouterWorker,
  routerWorkerSerializer,
  routerWorkerDeserializer,
  _PagedRouterWorker,
  _pagedRouterWorkerDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ListWorkersOptionalParams,
  DeleteWorkerOptionalParams,
  GetWorkerOptionalParams,
  UpsertWorkerOptionalParams,
  GetQueueStatisticsOptionalParams,
  DeclineJobOfferOptionalParams,
  AcceptJobOfferOptionalParams,
  UnassignJobOptionalParams,
  GetQueuePositionOptionalParams,
  ListJobsOptionalParams,
  CloseJobOptionalParams,
  CompleteJobOptionalParams,
  CancelJobOptionalParams,
  ReclassifyJobOptionalParams,
  DeleteJobOptionalParams,
  GetJobOptionalParams,
  UpsertJobOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listWorkersSend(
  context: Client,
  options: ListWorkersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers{?api%2Dversion,maxpagesize,state,channelId,queueId,hasCapacity}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
      state: options?.state,
      channelId: options?.channelId,
      queueId: options?.queueId,
      hasCapacity: options?.hasCapacity,
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

export async function _listWorkersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedRouterWorker> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedRouterWorkerDeserializer(result.body);
}

/** Retrieves existing workers. */
export function listWorkers(
  context: Client,
  options: ListWorkersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RouterWorker> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkersSend(context, options),
    _listWorkersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _deleteWorkerSend(
  context: Client,
  workerId: string,
  options: DeleteWorkerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers/{workerId}{?api%2Dversion}",
    {
      workerId: workerId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteWorkerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a worker and all of its traces. */
export async function deleteWorker(
  context: Client,
  workerId: string,
  options: DeleteWorkerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteWorkerSend(context, workerId, options);
  return _deleteWorkerDeserialize(result);
}

export function _getWorkerSend(
  context: Client,
  workerId: string,
  options: GetWorkerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers/{workerId}{?api%2Dversion}",
    {
      workerId: workerId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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

export async function _getWorkerDeserialize(result: PathUncheckedResponse): Promise<RouterWorker> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerWorkerDeserializer(result.body);
}

/** Retrieves an existing worker by Id. */
export async function getWorker(
  context: Client,
  workerId: string,
  options: GetWorkerOptionalParams = { requestOptions: {} },
): Promise<RouterWorker> {
  const result = await _getWorkerSend(context, workerId, options);
  return _getWorkerDeserialize(result);
}

export function _upsertWorkerSend(
  context: Client,
  workerId: string,
  resource: RouterWorker,
  options: UpsertWorkerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers/{workerId}{?api%2Dversion}",
    {
      workerId: workerId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: routerWorkerSerializer(resource),
    });
}

export async function _upsertWorkerDeserialize(
  result: PathUncheckedResponse,
): Promise<RouterWorker> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerWorkerDeserializer(result.body);
}

/** Creates or updates a worker. */
export async function upsertWorker(
  context: Client,
  workerId: string,
  resource: RouterWorker,
  options: UpsertWorkerOptionalParams = { requestOptions: {} },
): Promise<RouterWorker> {
  const result = await _upsertWorkerSend(context, workerId, resource, options);
  return _upsertWorkerDeserialize(result);
}

export function _getQueueStatisticsSend(
  context: Client,
  queueId: string,
  options: GetQueueStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/queues/{queueId}/statistics{?api%2Dversion}",
    {
      queueId: queueId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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

export async function _getQueueStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<RouterQueueStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerQueueStatisticsDeserializer(result.body);
}

/** Retrieves a queue's statistics. */
export async function getQueueStatistics(
  context: Client,
  queueId: string,
  options: GetQueueStatisticsOptionalParams = { requestOptions: {} },
): Promise<RouterQueueStatistics> {
  const result = await _getQueueStatisticsSend(context, queueId, options);
  return _getQueueStatisticsDeserialize(result);
}

export function _declineJobOfferSend(
  context: Client,
  workerId: string,
  offerId: string,
  options: DeclineJobOfferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers/{workerId}/offers/{offerId}:decline{?api%2Dversion}",
    {
      workerId: workerId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options
        ? options?.options
        : declineJobOfferOptionsSerializer(options?.options),
    });
}

export async function _declineJobOfferDeserialize(
  result: PathUncheckedResponse,
): Promise<DeclineJobOfferResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return declineJobOfferResultDeserializer(result.body);
}

/** Declines an offer to work on a job. */
export async function declineJobOffer(
  context: Client,
  workerId: string,
  offerId: string,
  options: DeclineJobOfferOptionalParams = { requestOptions: {} },
): Promise<DeclineJobOfferResult> {
  const result = await _declineJobOfferSend(context, workerId, offerId, options);
  return _declineJobOfferDeserialize(result);
}

export function _acceptJobOfferSend(
  context: Client,
  workerId: string,
  offerId: string,
  options: AcceptJobOfferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/workers/{workerId}/offers/{offerId}:accept{?api%2Dversion}",
    {
      workerId: workerId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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

export async function _acceptJobOfferDeserialize(
  result: PathUncheckedResponse,
): Promise<AcceptJobOfferResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return acceptJobOfferResultDeserializer(result.body);
}

/** Accepts an offer to work on a job and returns a 409/Conflict if another agent accepted the job already. */
export async function acceptJobOffer(
  context: Client,
  workerId: string,
  offerId: string,
  options: AcceptJobOfferOptionalParams = { requestOptions: {} },
): Promise<AcceptJobOfferResult> {
  const result = await _acceptJobOfferSend(context, workerId, offerId, options);
  return _acceptJobOfferDeserialize(result);
}

export function _unassignJobSend(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: UnassignJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}/assignments/{assignmentId}:unassign{?api%2Dversion}",
    {
      jobId: jobId,
      assignmentId: assignmentId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options ? options?.options : unassignJobOptionsSerializer(options?.options),
    });
}

export async function _unassignJobDeserialize(
  result: PathUncheckedResponse,
): Promise<UnassignJobResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return unassignJobResultDeserializer(result.body);
}

/** Unassign a job. */
export async function unassignJob(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: UnassignJobOptionalParams = { requestOptions: {} },
): Promise<UnassignJobResult> {
  const result = await _unassignJobSend(context, jobId, assignmentId, options);
  return _unassignJobDeserialize(result);
}

export function _getQueuePositionSend(
  context: Client,
  jobId: string,
  options: GetQueuePositionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}/position{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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

export async function _getQueuePositionDeserialize(
  result: PathUncheckedResponse,
): Promise<RouterJobPositionDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerJobPositionDetailsDeserializer(result.body);
}

/** Gets a job's position details. */
export async function getQueuePosition(
  context: Client,
  jobId: string,
  options: GetQueuePositionOptionalParams = { requestOptions: {} },
): Promise<RouterJobPositionDetails> {
  const result = await _getQueuePositionSend(context, jobId, options);
  return _getQueuePositionDeserialize(result);
}

export function _listJobsSend(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs{?api%2Dversion,maxpagesize,status,queueId,channelId,classificationPolicyId,scheduledBefore,scheduledAfter}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
      status: options?.status,
      queueId: options?.queueId,
      channelId: options?.channelId,
      classificationPolicyId: options?.classificationPolicyId,
      scheduledBefore: !options?.scheduledBefore
        ? options?.scheduledBefore
        : options?.scheduledBefore.toISOString(),
      scheduledAfter: !options?.scheduledAfter
        ? options?.scheduledAfter
        : options?.scheduledAfter.toISOString(),
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

export async function _listJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedRouterJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedRouterJobDeserializer(result.body);
}

/** Retrieves list of jobs based on filter parameters. */
export function listJobs(
  context: Client,
  options: ListJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RouterJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobsSend(context, options),
    _listJobsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _closeJobSend(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: CloseJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}/assignments/{assignmentId}:close{?api%2Dversion}",
    {
      jobId: jobId,
      assignmentId: assignmentId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options ? options?.options : closeJobOptionsSerializer(options?.options),
    });
}

export async function _closeJobDeserialize(result: PathUncheckedResponse): Promise<CloseJobResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return closeJobResultDeserializer(result.body);
}

/** Closes a completed job. */
export async function closeJob(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: CloseJobOptionalParams = { requestOptions: {} },
): Promise<CloseJobResult> {
  const result = await _closeJobSend(context, jobId, assignmentId, options);
  return _closeJobDeserialize(result);
}

export function _completeJobSend(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: CompleteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}/assignments/{assignmentId}:complete{?api%2Dversion}",
    {
      jobId: jobId,
      assignmentId: assignmentId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options ? options?.options : completeJobOptionsSerializer(options?.options),
    });
}

export async function _completeJobDeserialize(
  result: PathUncheckedResponse,
): Promise<CompleteJobResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return completeJobResultDeserializer(result.body);
}

/** Completes an assigned job. */
export async function completeJob(
  context: Client,
  jobId: string,
  assignmentId: string,
  options: CompleteJobOptionalParams = { requestOptions: {} },
): Promise<CompleteJobResult> {
  const result = await _completeJobSend(context, jobId, assignmentId, options);
  return _completeJobDeserialize(result);
}

export function _cancelJobSend(
  context: Client,
  jobId: string,
  options: CancelJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}:cancel{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options ? options?.options : cancelJobOptionsSerializer(options?.options),
    });
}

export async function _cancelJobDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelJobResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cancelJobResultDeserializer(result.body);
}

/** Submits request to cancel an existing job by Id while supplying free-form cancellation reason. */
export async function cancelJob(
  context: Client,
  jobId: string,
  options: CancelJobOptionalParams = { requestOptions: {} },
): Promise<CancelJobResult> {
  const result = await _cancelJobSend(context, jobId, options);
  return _cancelJobDeserialize(result);
}

export function _reclassifyJobSend(
  context: Client,
  jobId: string,
  options: ReclassifyJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}:reclassify{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
      body: !options?.options ? options?.options : reclassifyJobOptionsSerializer(options?.options),
    });
}

export async function _reclassifyJobDeserialize(
  result: PathUncheckedResponse,
): Promise<ReclassifyJobResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return reclassifyJobResultDeserializer(result.body);
}

/** Reclassify a job. */
export async function reclassifyJob(
  context: Client,
  jobId: string,
  options: ReclassifyJobOptionalParams = { requestOptions: {} },
): Promise<ReclassifyJobResult> {
  const result = await _reclassifyJobSend(context, jobId, options);
  return _reclassifyJobDeserialize(result);
}

export function _deleteJobSend(
  context: Client,
  jobId: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a job and all of its traces. */
export async function deleteJob(
  context: Client,
  jobId: string,
  options: DeleteJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteJobSend(context, jobId, options);
  return _deleteJobDeserialize(result);
}

export function _getJobSend(
  context: Client,
  jobId: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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

export async function _getJobDeserialize(result: PathUncheckedResponse): Promise<RouterJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerJobDeserializer(result.body);
}

/** Retrieves an existing job by Id. */
export async function getJob(
  context: Client,
  jobId: string,
  options: GetJobOptionalParams = { requestOptions: {} },
): Promise<RouterJob> {
  const result = await _getJobSend(context, jobId, options);
  return _getJobDeserialize(result);
}

export function _upsertJobSend(
  context: Client,
  jobId: string,
  resource: RouterJob,
  options: UpsertJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/jobs/{jobId}{?api%2Dversion}",
    {
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
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
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: routerJobSerializer(resource),
    });
}

export async function _upsertJobDeserialize(result: PathUncheckedResponse): Promise<RouterJob> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerJobDeserializer(result.body);
}

/** Creates or updates a router job. */
export async function upsertJob(
  context: Client,
  jobId: string,
  resource: RouterJob,
  options: UpsertJobOptionalParams = { requestOptions: {} },
): Promise<RouterJob> {
  const result = await _upsertJobSend(context, jobId, resource, options);
  return _upsertJobDeserialize(result);
}
