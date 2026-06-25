// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobRouterContext, JobRouterClientOptionalParams, createJobRouter } from "./api/index.js";
import {
  RouterJob,
  ReclassifyJobResult,
  CancelJobResult,
  CompleteJobResult,
  CloseJobResult,
  RouterJobPositionDetails,
  UnassignJobResult,
  AcceptJobOfferResult,
  DeclineJobOfferResult,
  RouterQueueStatistics,
  RouterWorker,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  listWorkers,
  deleteWorker,
  getWorker,
  upsertWorker,
  getQueueStatistics,
  declineJobOffer,
  acceptJobOffer,
  unassignJob,
  getQueuePosition,
  listJobs,
  closeJob,
  completeJob,
  cancelJob,
  reclassifyJob,
  deleteJob,
  getJob,
  upsertJob,
} from "./api/operations.js";
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
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { JobRouterClientOptionalParams } from "./api/jobRouterContext.js";

export class JobRouterClient {
  private _client: JobRouterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: JobRouterClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createJobRouter(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Retrieves existing workers. */
  listWorkers(
    options: ListWorkersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<RouterWorker> {
    return listWorkers(this._client, options);
  }

  /** Deletes a worker and all of its traces. */
  deleteWorker(
    workerId: string,
    options: DeleteWorkerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteWorker(this._client, workerId, options);
  }

  /** Retrieves an existing worker by Id. */
  getWorker(
    workerId: string,
    options: GetWorkerOptionalParams = { requestOptions: {} },
  ): Promise<RouterWorker> {
    return getWorker(this._client, workerId, options);
  }

  /** Creates or updates a worker. */
  upsertWorker(
    workerId: string,
    resource: RouterWorker,
    options: UpsertWorkerOptionalParams = { requestOptions: {} },
  ): Promise<RouterWorker> {
    return upsertWorker(this._client, workerId, resource, options);
  }

  /** Retrieves a queue's statistics. */
  getQueueStatistics(
    queueId: string,
    options: GetQueueStatisticsOptionalParams = { requestOptions: {} },
  ): Promise<RouterQueueStatistics> {
    return getQueueStatistics(this._client, queueId, options);
  }

  /** Declines an offer to work on a job. */
  declineJobOffer(
    workerId: string,
    offerId: string,
    options: DeclineJobOfferOptionalParams = { requestOptions: {} },
  ): Promise<DeclineJobOfferResult> {
    return declineJobOffer(this._client, workerId, offerId, options);
  }

  /** Accepts an offer to work on a job and returns a 409/Conflict if another agent accepted the job already. */
  acceptJobOffer(
    workerId: string,
    offerId: string,
    options: AcceptJobOfferOptionalParams = { requestOptions: {} },
  ): Promise<AcceptJobOfferResult> {
    return acceptJobOffer(this._client, workerId, offerId, options);
  }

  /** Unassign a job. */
  unassignJob(
    jobId: string,
    assignmentId: string,
    options: UnassignJobOptionalParams = { requestOptions: {} },
  ): Promise<UnassignJobResult> {
    return unassignJob(this._client, jobId, assignmentId, options);
  }

  /** Gets a job's position details. */
  getQueuePosition(
    jobId: string,
    options: GetQueuePositionOptionalParams = { requestOptions: {} },
  ): Promise<RouterJobPositionDetails> {
    return getQueuePosition(this._client, jobId, options);
  }

  /** Retrieves list of jobs based on filter parameters. */
  listJobs(
    options: ListJobsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<RouterJob> {
    return listJobs(this._client, options);
  }

  /** Closes a completed job. */
  closeJob(
    jobId: string,
    assignmentId: string,
    options: CloseJobOptionalParams = { requestOptions: {} },
  ): Promise<CloseJobResult> {
    return closeJob(this._client, jobId, assignmentId, options);
  }

  /** Completes an assigned job. */
  completeJob(
    jobId: string,
    assignmentId: string,
    options: CompleteJobOptionalParams = { requestOptions: {} },
  ): Promise<CompleteJobResult> {
    return completeJob(this._client, jobId, assignmentId, options);
  }

  /** Submits request to cancel an existing job by Id while supplying free-form cancellation reason. */
  cancelJob(
    jobId: string,
    options: CancelJobOptionalParams = { requestOptions: {} },
  ): Promise<CancelJobResult> {
    return cancelJob(this._client, jobId, options);
  }

  /** Reclassify a job. */
  reclassifyJob(
    jobId: string,
    options: ReclassifyJobOptionalParams = { requestOptions: {} },
  ): Promise<ReclassifyJobResult> {
    return reclassifyJob(this._client, jobId, options);
  }

  /** Deletes a job and all of its traces. */
  deleteJob(
    jobId: string,
    options: DeleteJobOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteJob(this._client, jobId, options);
  }

  /** Retrieves an existing job by Id. */
  getJob(
    jobId: string,
    options: GetJobOptionalParams = { requestOptions: {} },
  ): Promise<RouterJob> {
    return getJob(this._client, jobId, options);
  }

  /** Creates or updates a router job. */
  upsertJob(
    jobId: string,
    resource: RouterJob,
    options: UpsertJobOptionalParams = { requestOptions: {} },
  ): Promise<RouterJob> {
    return upsertJob(this._client, jobId, resource, options);
  }
}
