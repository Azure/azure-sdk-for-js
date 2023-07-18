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
  JobRouterApiClient,
  RouterJobPositionDetails,
  RouterQueueStatistics,
  JobRouterListJobsOptionalParams,
  JobRouterListWorkersOptionalParams,
  RouterJobItem,
  RouterWorkerItem,
} from "./generated/src";
import { logger } from "./models/logger";
import { RouterJob } from "./models/models";
import {
  JobRouterClientOptions,
  CreateJobOptions,
  UpdateJobOptions,
  CancelJobOptions,
  CompleteJobOptions,
  ReclassifyJobOptions,
  CloseJobOptions,
  UnassignJobOptions,
  DeclineJobOfferOptions,
  ListJobsOptions,
  CreateWorkerOptions,
  UpdateWorkerOptions,
  ListWorkersOptions,
} from "./models/options";
import {
  RouterJobResponse,
  CancelJobResponse,
  CompleteJobResponse,
  ReclassifyJobResponse,
  CloseJobResponse,
  UnassignJobResponse,
  AcceptJobOfferResponse,
  DeclineJobOfferResponse,
  RouterWorkerResponse,
} from "./models/responses";

/**
 * Checks whether the type of a value is {@link JobRouterClientOptions} or not.
 * @param options - The value being checked.
 */
const isRouterClientOptions = (options: any): options is JobRouterClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * Maps custom 'notes' type to generated 'notes' type.
 * @param options - Union type of options that have notes.
 * @returns - RouterJob model compliant with generated RouterJob.
 */
const transformJobOptions = (options: CreateJobOptions | UpdateJobOptions): RouterJob => {
  if (options.notes === undefined) {
    return { ...options, notes: {} };
  }

  const transformedNotes = options.notes!.reduce(
    (acc, { time, message }) => ({ ...acc, [time.toISOString()]: message }),
    {}
  );

  return { ...options, notes: transformedNotes };
};

/**
 * The client to do job router operations.
 */
export class JobRouterClient {
  private readonly client: JobRouterApiClient;

  /**
   * Initializes a new instance of the JobRouterClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (ex: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret").
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: JobRouterClientOptions);

  /**
   * Initializes a new instance of the JobRouterClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` or TokenCredential to create a credential.
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: JobRouterClientOptions
  );

  /**
   * Initializes a new instance of the JobRouterClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - CommunicationTokenCredential that is used to authenticate requests to the service.
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: CommunicationTokenCredential,
    options?: JobRouterClientOptions
  );

  /**
   * Creates an instance of the JobRouterClient for a given resource and user.
   * @param connectionStringOrUrl - The connectionString or url of the Communication Services resource.
   * @param credentialOrOptions - The key or token credential or JobRouterClientOptions. Use AzureCommunicationKeyCredential from \@azure/communication-common to create a credential.
   * @param maybeOptions - Additional client options.
   */
  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?:
      | KeyCredential
      | TokenCredential
      | CommunicationTokenCredential
      | JobRouterClientOptions,
    maybeOptions: JobRouterClientOptions = {}
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
  /**
   * Creates a job.
   * Returns the created job.
   * @param jobId - The job to be create
   * @param options - Options for creating a router job.
   */
  public async createJob(
    jobId: string,
    options: CreateJobOptions = {}
  ): Promise<RouterJobResponse> {
    const jobModel = transformJobOptions(options);
    const job = await this.client.jobRouter.upsertJob(jobId, jobModel, options);
    return <RouterJobResponse>job;
  }

  /**
   * Updates a job by id.
   * @param jobId - The job to be updated
   * @param options - Options for updating a router job. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   */
  public async updateJob(
    jobId: string,
    options: UpdateJobOptions = {}
  ): Promise<RouterJobResponse> {
    const jobModel = transformJobOptions(options);
    const job = await this.client.jobRouter.upsertJob(jobId, jobModel, options);
    return <RouterJobResponse>job;
  }

  /**
   * Gets a job.
   * Returns the job.
   * @param jobId - The id of the job to get.
   * @param options - Operation options.
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
    listOptions.maxpagesize = options.maxpagesize;
    listOptions.status = options.jobStateSelector;
    return this.client.jobRouter.listJobs(listOptions);
  }

  /**
   * Gets a job's queue position.
   * Returns job's queue position.
   * @param jobId - The id of the job to get the queue position of.
   * @param options - Operation options.
   */
  public async getJobQueuePosition(
    jobId: string,
    options: OperationOptions = {}
  ): Promise<RouterJobPositionDetails> {
    return this.client.jobRouter.getInQueuePosition(jobId, options);
  }

  /**
   * Cancels a job.
   * @param jobId - The id of the job to cancel.
   * @param options - Cancel job options.
   */
  public async cancelJob(
    jobId: string,
    options: CancelJobOptions = {}
  ): Promise<CancelJobResponse> {
    return this.client.jobRouter.cancelJobAction(jobId, options);
  }

  /**
   * Completes a job.
   * @param jobId - The id of the job to complete.
   * @param assignmentId - The assignment id to complete.
   * @param options - Complete job options.
   */
  public async completeJob(
    jobId: string,
    assignmentId: string,
    options: CompleteJobOptions = {}
  ): Promise<CompleteJobResponse> {
    return this.client.jobRouter.completeJobAction(jobId, assignmentId, options);
  }

  /**
   * Updates an existing job by id and forces it to be reclassified.
   * @param jobId - The id of the job to reclassify.
   * @param options - Reclassify job options.
   */
  public async reclassifyJob(
    jobId: string,
    options: ReclassifyJobOptions = {}
  ): Promise<ReclassifyJobResponse> {
    return this.client.jobRouter.reclassifyJobAction(jobId, options);
  }

  /**
   * Closes a job.
   * @param jobId - The id of the job to close.
   * @param assignmentId - The assignment id corresponding to the job to be closed.
   * @param options - Close job options.
   */
  public async closeJob(
    jobId: string,
    assignmentId: string,
    options: CloseJobOptions = {}
  ): Promise<CloseJobResponse> {
    return this.client.jobRouter.closeJobAction(jobId, assignmentId, options);
  }

  /**
   * Unassigns a job.
   * @param jobId - The id of the job to unassign.
   * @param assignmentId - The assignment id corresponding to the job to be unassigned.
   * @param options - Operation options.
   */
  public async unassignJob(
    jobId: string,
    assignmentId: string,
    options: UnassignJobOptions = {}
  ): Promise<UnassignJobResponse> {
    const response = await this.client.jobRouter.unassignJobAction(jobId, assignmentId, options);
    return {
      jobId: response.jobId,
      unassignmentCount: response.unassignmentCount,
    };
  }

  /**
   * Deletes a job.
   * @param jobId - The id of the job to delete.
   * @param options - Operation options.
   */
  public async deleteJob(jobId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteJob(jobId, options);
  }

  /**
   * Accepts a job offer.
   * @param workerId - The id of the worker that accepts the job.
   * @param offerId - The id of the offer to accept.
   * @param options - Operation options.
   */
  public async acceptJobOffer(
    workerId: string,
    offerId: string,
    options: OperationOptions = {}
  ): Promise<AcceptJobOfferResponse> {
    return this.client.jobRouter.acceptJobAction(workerId, offerId, options);
  }

  /**
   * Declines a job offer.
   * @param workerId - The id of the worker holding the offer.
   * @param offerId - The id of the offer to decline.
   * @param options - Decline job options.
   */
  public async declineJobOffer(
    workerId: string,
    offerId: string,
    options: DeclineJobOfferOptions = {}
  ): Promise<DeclineJobOfferResponse> {
    if (options.retryOfferAt) {
      options.declineJobOfferRequest = {
        retryOfferAt: options.retryOfferAt,
      };
    }
    return this.client.jobRouter.declineJobAction(workerId, offerId, options);
  }

  /**
   * Creates a worker.
   * Returns the registered worker.
   * @param workerId - The id of the worker to create.
   * @param options - Options for creating a router worker.
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
   * @param workerId - The id of the worker to update.
   * @param options - Options for updating a router worker. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
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
   * Gets a worker.
   * Returns the worker.
   * @param workerId - The id of the worker to get.
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
    listOptions.maxpagesize = options.maxpagesize;
    return this.client.jobRouter.listWorkers(listOptions);
  }

  /**
   * Deletes a worker.
   * @param workerId - The id of the worker to delete.
   * @param options -  Operation options.
   */
  public async deleteWorker(workerId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteWorker(workerId, options);
  }

  /**
   * Gets a queue's statistics.
   * Returns queue's statistics.
   * @param queueId - The id of the queue to get statistics of.
   * @param options -  Operation options.
   */
  public async getQueueStatistics(
    queueId: string,
    options: OperationOptions = {}
  ): Promise<RouterQueueStatistics> {
    return this.client.jobRouter.getQueueStatistics(queueId, options);
  }
}
