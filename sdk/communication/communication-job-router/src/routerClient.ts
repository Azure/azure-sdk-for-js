// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  CommunicationTokenCredential,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { OperationOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "./constants";
import {
  AcceptJobOfferResult,
  JobPositionDetails,
  JobRouterApiClient,
  JobRouterCancelJobActionResponse,
  JobRouterCloseJobActionResponse,
  JobRouterCompleteJobActionResponse,
  JobRouterDeclineJobActionResponse,
  JobRouterListJobsOptionalParams,
  JobRouterListWorkersOptionalParams,
  JobRouterReclassifyJobActionResponse,
  QueueStatistics,
  RouterJobItem,
  RouterWorkerItem,
} from "./generated/src";
import { logger } from "./models/logger";
import {
  CancelJobOptions,
  CloseJobOptions,
  CompleteJobOptions,
  CreateJobOptions,
  CreateWorkerOptions,
  ListJobsOptions,
  ListWorkersOptions,
  ReclassifyJobOptions,
  RouterClientOptions,
  UpdateJobOptions,
  UpdateWorkerOptions,
} from "./models/options";
import { RouterJobResponse, RouterWorkerResponse, UnassignJobResult } from "./models/responses";

/**
 * Checks whether the type of a value is {@link RouterClientOptions} or not.
 *
 * @param options - The value being checked.
 */
const isRouterClientOptions = (options: any): options is RouterClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * The client to do router operations
 */
export class RouterClient {
  private readonly client: JobRouterApiClient;

  /**
   * Initializes a new instance of the RouterClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param routerClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, routerClientOptions?: RouterClientOptions);

  /**
   * Initializes a new instance of the RouterClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or
   * `@azure/identity` or TokenCredential to create a credential.
   * @param routerClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    routerClientOptions?: RouterClientOptions
  );

  /**
   * Initializes a new instance of the RouterClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - CommunicationTokenCredential that is used to authenticate requests to the service.
   * @param routerClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: CommunicationTokenCredential,
    routerClientOptions?: RouterClientOptions
  );

  /**
   * Creates an instance of the RouterClient for a given resource and user.
   *
   * @param connectionStringOrUrl - The connectionString or url of the Communication Services resource.
   * @param credentialOrOptions - The key or token credential or RouterClientOptions. Use AzureCommunicationKeyCredential from \@azure/communication-common to create a credential.
   * @param maybeOptions - Additional client options.
   */
  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?:
      | KeyCredential
      | TokenCredential
      | CommunicationTokenCredential
      | RouterClientOptions,
    maybeOptions: RouterClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isRouterClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const libInfo = `azsdk-js-communication-job-router/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    const userAgentOptions = { ...options.userAgentOptions };
    if (options.userAgentOptions.userAgentPrefix) {
      userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      userAgentOptions,
      loggingOptions: {
        logger: logger.info,
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);

    this.client = new JobRouterApiClient(url, internalPipelineOptions);
    this.client.pipeline.addPolicy(authPolicy);
  }

  // TODO. Add tracing to both clients https://github.com/Azure/azure-sdk-for-js/issues/23008
  // Job Actions
  /**
   * Creates a job.
   * Returns the created job.
   * @param jobId - The job to be create
   * @param options - Operation options.
   */
  public async createJob(
    jobId: string,
    options: CreateJobOptions = {}
  ): Promise<RouterJobResponse> {
    const jobModel = options;
    const job = await this.client.jobRouter.upsertJob(jobId, jobModel, options);
    return <RouterJobResponse>job;
  }

  /**
   * Update a job by Id.
   * @param jobId - The job to be updated
   * @param options -  Operation options.
   */
  public async updateJob(
    jobId: string,
    options: UpdateJobOptions = {}
  ): Promise<RouterJobResponse> {
    const jobModel = options;
    const job = await this.client.jobRouter.upsertJob(jobId, jobModel, options);
    return <RouterJobResponse>job;
  }

  /**
   * Gets a job.
   * Returns the job.
   * @param jobId - The id of the job to get.
   * @param options -  Operation options.
   */
  public async getJob(jobId: string, options: OperationOptions = {}): Promise<RouterJobResponse> {
    const job = await this.client.jobRouter.getJob(jobId, options);
    return <RouterJobResponse>job;
  }

  /**
   * Gets the list of jobs.
   * @param options - List jobs options.
   */
  public listJobs(options: ListJobsOptions = {}): PagedAsyncIterableIterator<RouterJobItem> {
    const listOptions = <JobRouterListJobsOptionalParams>options;
    listOptions.maxPageSize = options.maxPageSize;
    listOptions.status = options.jobStateSelector;
    return this.client.jobRouter.listJobs(listOptions);
  }

  /**
   * Gets a job's position details.
   * Returns job position details.
   * @param jobId - The ID of the job to get position details.
   * @param options -  Operation options.
   */
  public async getQueuePosition(
    jobId: string,
    options: OperationOptions = {}
  ): Promise<JobPositionDetails> {
    return this.client.jobRouter.getInQueuePosition(jobId, options);
  }

  /**
   * Cancel a job.
   * @param jobId - The ID of the job to cancel.
   * @param options - Operation options.
   */
  public async cancelJob(
    jobId: string,
    options: CancelJobOptions = {}
  ): Promise<JobRouterCancelJobActionResponse> {
    return this.client.jobRouter.cancelJobAction(jobId, options);
  }

  /**
   * Complete a job.
   * @param jobId - The ID of the job to complete.
   * @param assignmentId - The assignment Id to complete.
   * @param options - Operation options.
   */
  public async completeJob(
    jobId: string,
    assignmentId: string,
    options: CompleteJobOptions = {}
  ): Promise<JobRouterCompleteJobActionResponse> {
    return this.client.jobRouter.completeJobAction(jobId, assignmentId, options);
  }

  /**
   * Updates an existing job by Id and forcing it to be reclassified.
   * @param jobId - The ID of the job to reclassify.
   * @param options -  Operation options.
   */
  public async reclassifyJob(
    jobId: string,
    options: ReclassifyJobOptions = {}
  ): Promise<JobRouterReclassifyJobActionResponse> {
    return this.client.jobRouter.reclassifyJobAction(jobId, options);
  }

  /**
   * Close a job.
   * @param jobId - The ID of the job to close.
   * @param assignmentId - The assignment id corresponding to the job to be closed.
   * @param options - Operation options.
   */
  public async closeJob(
    jobId: string,
    assignmentId: string,
    options: CloseJobOptions = {}
  ): Promise<JobRouterCloseJobActionResponse> {
    return this.client.jobRouter.closeJobAction(jobId, assignmentId, options);
  }

  /**
   * Unassign a job.
   * @param jobId - The ID of the job to unassign.
   * @param assignmentId - The assignment id corresponding to the job to be unassigned.
   * @param options - Operation options.
   */
  public async unassignJob(
    jobId: string,
    assignmentId: string,
    options: OperationOptions = {}
  ): Promise<UnassignJobResult> {
    const result = await this.client.jobRouter.unassignJobAction(jobId, assignmentId, options);
    return {
      jobId: result.jobId,
      unassignmentCount: result.unassignmentCount,
    };
  }

  /**
   * Deletes a job.
   * @param jobId - The id of the job to delete.
   * @param options -  Operation options.
   */
  public async deleteJob(jobId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteJob(jobId, options);
  }

  // Offer Actions
  /**
   * Accept a job offer.
   * @param workerId - The ID of the worker that accepts the job.
   * @param offerId - The ID of the offer to accept.
   * @param options -  Operation options.
   */
  public async acceptJobOffer(
    workerId: string,
    offerId: string,
    options: OperationOptions = {}
  ): Promise<AcceptJobOfferResult> {
    return this.client.jobRouter.acceptJobAction(offerId, workerId, options);
  }

  /**
   * Decline a job offer.
   * @param workerId - The ID of the worker holding the offer.
   * @param offerId - The ID of the offer to decline.
   * @param options -  Operation options.
   */
  public async declineJobOffer(
    workerId: string,
    offerId: string,
    options: OperationOptions = {}
  ): Promise<JobRouterDeclineJobActionResponse> {
    return this.client.jobRouter.declineJobAction(offerId, workerId, options);
  }

  // Worker Actions
  /**
   * Creates a worker.
   * Returns the registered worker.
   * @param workerId - The ID of the worker to create.
   * @param options - Operation options.
   */
  public async createWorker(
    workerId: string,
    options: CreateWorkerOptions = {}
  ): Promise<RouterWorkerResponse> {
    const workerModel = options;
    const worker = await this.client.jobRouter.upsertWorker(workerId, workerModel, options);
    return <RouterWorkerResponse>worker;
  }

  /**
   * Updates a worker.
   * Returns the updated worker.
   * @param workerId - The ID of the worker to update.
   * @param options - Model of the worker to update
   */
  public async updateWorker(
    workerId: string,
    options: UpdateWorkerOptions = {}
  ): Promise<RouterWorkerResponse> {
    const workerModel = options;
    const worker = await this.client.jobRouter.upsertWorker(workerId, workerModel, options);
    return <RouterWorkerResponse>worker;
  }

  /**
   * Registers a worker.
   * Returns the registered worker.
   * @param workerId - The ID of the worker to register.
   * @param options - Operation options.
   */
  public async registerWorker(
    workerId: string,
    options: OperationOptions = {}
  ): Promise<RouterWorkerResponse> {
    const worker = {
      availableForOffers: true,
    };
    const workerResult = await this.client.jobRouter.upsertWorker(workerId, worker, options);
    return <RouterWorkerResponse>workerResult;
  }

  /**
   * De-registers a worker.
   * Returns the de-registered worker.
   * @param workerId - The ID of the worker to deregister.
   * @param options - Operation options.
   */
  public async deregisterWorker(
    workerId: string,
    options: OperationOptions = {}
  ): Promise<RouterWorkerResponse> {
    const worker = {
      availableForOffers: false,
    };
    const workerResult = await this.client.jobRouter.upsertWorker(workerId, worker, options);
    return <RouterWorkerResponse>workerResult;
  }

  /**
   * Gets a worker.
   * Returns the worker.
   * @param workerId - The ID of the worker to get.
   * @param options -  Operation options.
   */
  public async getWorker(
    workerId: string,
    options: OperationOptions = {}
  ): Promise<RouterWorkerResponse> {
    const worker = await this.client.jobRouter.getWorker(workerId, options);
    return <RouterWorkerResponse>worker;
  }

  /**
   * Gets the list of workers.
   * @param options - List workers options.
   */
  public listWorkers(
    options: ListWorkersOptions = {}
  ): PagedAsyncIterableIterator<RouterWorkerItem> {
    const listOptions = <JobRouterListWorkersOptionalParams>options;
    listOptions.maxPageSize = options.maxPageSize;
    return this.client.jobRouter.listWorkers(listOptions);
  }

  /**
   * Deletes a worker.
   * @param workerId - The ID of the worker to delete.
   * @param options -  Operation options.
   */
  public async deleteWorker(workerId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteWorker(workerId, options);
  }

  // Queue Actions
  /**
   * Gets a queue's statistics.
   * Returns queue's statistics.
   * @param queueId - The ID of the queue to get statistics.
   * @param options -  Operation options.
   */
  public async getQueueStatistics(
    queueId: string,
    options: OperationOptions = {}
  ): Promise<QueueStatistics> {
    return this.client.jobRouter.getQueueStatistics(queueId, options);
  }
}
