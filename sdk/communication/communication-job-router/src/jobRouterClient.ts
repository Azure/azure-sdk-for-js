// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import {
  CommunicationTokenCredential,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { OperationOptions } from "@azure/core-client";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "./constants";
import {
  JobRouterApiClient,
  JobRouterListJobsOptionalParams,
  JobRouterListWorkersOptionalParams,
  RouterJobPositionDetails,
  RouterQueueStatistics,
  RouterJob as RouterJobGenerated,
  RouterJobItem as RouterJobItemGenerated,
  RouterWorkerItem as RouterWorkerItemGenerated,
  KnownJobMatchModeType,
  JobMatchingMode,
} from "./generated/src";
import { logger } from "./logger";
import {
  RouterJobItem,
  RouterWorkerItem,
  RouterJobNote,
  RouterJobStatus,
  RouterWorkerSelector,
  RouterJobMatchingMode,
  RouterWorkerState,
} from "./models";
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
} from "./options";
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
} from "./responses";
import { TransformingPagedAsyncIterableIterator } from "./clientUtils";

/**
 * Checks whether a value is of type {@link JobRouterClientOptions}.
 * @param value - The value being checked.
 * @returns - True or false.
 */
const isRouterClientOptions = (value: any): value is JobRouterClientOptions =>
  !!value && !isKeyCredential(value);

/**
 * Transforms an array of notes from their generated type to {@link RouterJobNote}.
 * @param notes - An array of notes as their generated type.
 * @returns - An array of notes as {@link RouterJobNote}.
 */
const transformNotesForSDK = (
  notes: { [propertyName: string]: string } | undefined,
): RouterJobNote[] => {
  if (notes === undefined) return [];

  return Object.keys(notes).map((key) => ({ addedAt: new Date(key), message: notes[key] }));
};

/**
 * Transforms an array of notes from {@link RouterJobNote} to their generated type.
 * @param notes - An array of notes as {@link RouterJobNote}.
 * @returns - An array of notes as their generated type.
 */
const transformNotesForService = (
  notes: RouterJobNote[] | undefined | null,
): { [propertyName: string]: string } | undefined => {
  if (notes === undefined || notes === null || !Array.isArray(notes)) return {};

  return notes.reduce(
    (acc, { addedAt, message }) => ({ ...acc, [addedAt.toISOString()]: message }),
    {},
  );
};

/**
 * Transforms a job matching mode from {@link RouterJobMatchingMode} to {@link JobMatchingMode}.
 * @param matchingMode - A job matching mode as {@link RouterJobMatchingMode}.
 * @returns - The job matching mode as {@link JobMatchingMode}.
 */
const transformMatchingModeForService = (
  matchingMode: RouterJobMatchingMode | undefined | null,
): JobMatchingMode | undefined => {
  if (matchingMode === undefined || matchingMode === null) {
    return null!;
  }

  const tranformedMode = {} as RouterJobMatchingMode;

  if (matchingMode.scheduleAndSuspendMode) {
    tranformedMode.modeType = KnownJobMatchModeType.ScheduleAndSuspendMode;
    tranformedMode.scheduleAndSuspendMode = matchingMode.scheduleAndSuspendMode;
    tranformedMode.queueAndMatchMode = null!;
    tranformedMode.suspendMode = null!;
  } else if (matchingMode.queueAndMatchMode) {
    tranformedMode.modeType = KnownJobMatchModeType.QueueAndMatchMode;
    tranformedMode.queueAndMatchMode = matchingMode.queueAndMatchMode;
    tranformedMode.suspendMode = null!;
    tranformedMode.scheduleAndSuspendMode = null!;
  } else if (matchingMode.suspendMode) {
    tranformedMode.modeType = KnownJobMatchModeType.SuspendMode;
    tranformedMode.suspendMode = matchingMode.suspendMode;
    tranformedMode.queueAndMatchMode = null!;
    tranformedMode.scheduleAndSuspendMode = null!;
  } else {
    return null!;
  }

  return tranformedMode;
};

/**
 * Transforms a job item from {@link RouterJobItemGenerated} to {@link RouterJobItem}.
 * @param item - A job item as {@link RouterJobItemGenerated}.
 * @returns - The job item as {@link RouterJobItem}.
 */
const listJobsTransform = (item: RouterJobItemGenerated): RouterJobItem => ({
  ...item,
  job: {
    ...item.job,
    notes: transformNotesForSDK(item.job!.notes),
    status: item.job?.status as RouterJobStatus,
    requestedWorkerSelectors: item.job?.requestedWorkerSelectors as RouterWorkerSelector[],
    attachedWorkerSelectors: item.job?.attachedWorkerSelectors as RouterWorkerSelector[],
    matchingMode: item.job?.matchingMode as RouterJobMatchingMode,
  },
});

/**
 * Transforms a worker item from {@link RouterWorkerItemGenerated} to {@link RouterWorkerItem}.
 * @param item - A job item as {@link RouterWorkerItemGenerated}.
 * @returns - The job item as {@link RouterWorkerItem}.
 */
const listWorkersTransform = (item: RouterWorkerItemGenerated): RouterWorkerItem => ({
  ...item,
  worker: {
    ...item.worker,
    state: item.worker?.state as RouterWorkerState,
  },
});

/**
 * The client to do job router operations.
 */
export class JobRouterClient {
  private readonly client: JobRouterApiClient;

  /**
   * Constructs an instance of {@link JobRouterClient}.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (ex: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret").
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: JobRouterClientOptions);

  /**
   * Constructs an instance of {@link JobRouterClient} using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` or TokenCredential to create a credential.
   * @param options - (Optional) usingOptions to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: JobRouterClientOptions,
  );

  /**
   * Constructs an instance of {@link JobRouterClient} using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - CommunicationTokenCredential that is used to authenticate requests to the service.
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: CommunicationTokenCredential,
    options?: JobRouterClientOptions,
  );

  /**
   * Constructs an instance of {@link JobRouterClient} using a given resource and user.
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
    maybeOptions: JobRouterClientOptions = {},
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
   * @param jobId - The id of the job to create.
   * @param options - Options for creating a job.
   * @returns - The created job.
   */
  public async createJob(
    jobId: string,
    options: CreateJobOptions = {},
  ): Promise<RouterJobResponse> {
    const patch = options as RouterJobGenerated;
    patch.notes = transformNotesForService(options.notes);
    patch.matchingMode = transformMatchingModeForService(options?.matchingMode);
    if (patch.matchingMode === undefined) {
      delete patch.matchingMode;
    }

    const response = await this.client.jobRouter.upsertJob(jobId, patch, options);
    return response as RouterJobResponse;
  }

  /**
   * Updates a job.
   * @param jobId - The id of the job to update.
   * @param options - Options for updating a job. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated job.
   */
  public async updateJob(
    jobId: string,
    options: UpdateJobOptions = {},
  ): Promise<RouterJobResponse> {
    const patch = options as RouterJobGenerated;
    patch.notes = transformNotesForService(options.notes);
    patch.matchingMode = transformMatchingModeForService(options?.matchingMode);
    if (patch.matchingMode === undefined) {
      delete patch.matchingMode;
    }

    const response = await this.client.jobRouter.upsertJob(jobId, patch, options);
    return response as RouterJobResponse;
  }

  /**
   * Gets a job.
   * @param jobId - The id of the job to get.
   * @param options - Options for getting a job.
   * @returns - The job.
   */
  public async getJob(jobId: string, options: OperationOptions = {}): Promise<RouterJobResponse> {
    const response = await this.client.jobRouter.getJob(jobId, options);
    return response as RouterJobResponse;
  }

  /**
   * Gets a list of jobs.
   * @param options - Options for listing jobs.
   * @returns - The list of jobs.
   */
  public listJobs(
    options: ListJobsOptions = {},
  ): TransformingPagedAsyncIterableIterator<RouterJobItemGenerated, RouterJobItem> {
    const listOptions = <JobRouterListJobsOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    listOptions.status = options.statusSelector;

    const transformingIterator = new TransformingPagedAsyncIterableIterator(
      this.client.jobRouter.listJobs(listOptions),
      listJobsTransform,
    );

    return transformingIterator;
  }

  /**
   * Gets a job's queue position.
   * @param jobId - The id of the job to get the queue position of.
   * @param options - Options for getting a job's queue position.
   * @returns - The job's queue position.
   */
  public async getJobQueuePosition(
    jobId: string,
    options: OperationOptions = {},
  ): Promise<RouterJobPositionDetails> {
    return this.client.jobRouter.getInQueuePosition(jobId, options);
  }

  /**
   * Cancels a job.
   * @param jobId - The id of the job to cancel.
   * @param options - Options for cancelling a job.
   */
  public async cancelJob(
    jobId: string,
    options: CancelJobOptions = {},
  ): Promise<CancelJobResponse> {
    return this.client.jobRouter.cancelJobAction(jobId, options);
  }

  /**
   * Completes a job.
   * @param jobId - The id of the job to complete.
   * @param assignmentId - The id of the assignment to complete.
   * @param options - Options for completing a job.
   */
  public async completeJob(
    jobId: string,
    assignmentId: string,
    options: CompleteJobOptions = {},
  ): Promise<CompleteJobResponse> {
    return this.client.jobRouter.completeJobAction(jobId, assignmentId, options);
  }

  /**
   * Updates a job and forces it to be reclassified.
   * @param jobId - The id of the job to reclassify.
   * @param options - Options for reclassifying a job.
   */
  public async reclassifyJob(
    jobId: string,
    options: ReclassifyJobOptions = {},
  ): Promise<ReclassifyJobResponse> {
    return this.client.jobRouter.reclassifyJobAction(jobId, options);
  }

  /**
   * Closes a job.
   * @param jobId - The id of the job to close.
   * @param assignmentId - The assignment id corresponding to the job to be closed.
   * @param options - Options for closing a job.
   */
  public async closeJob(
    jobId: string,
    assignmentId: string,
    options: CloseJobOptions = {},
  ): Promise<CloseJobResponse> {
    return this.client.jobRouter.closeJobAction(jobId, assignmentId, options);
  }

  /**
   * Unassigns a job.
   * @param jobId - The id of the job to unassign.
   * @param assignmentId - The assignment id corresponding to the job to be unassigned.
   * @param options - Options for unassigning a job.
   */
  public async unassignJob(
    jobId: string,
    assignmentId: string,
    options: UnassignJobOptions = {},
  ): Promise<UnassignJobResponse> {
    return this.client.jobRouter.unassignJobAction(jobId, assignmentId, options);
  }

  /**
   * Deletes a job.
   * @param jobId - The id of the job to delete.
   * @param options - Options for deleting a job.
   */
  public async deleteJob(jobId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteJob(jobId, options);
  }

  /**
   * Accepts a job offer.
   * @param workerId - The id of the worker that accepts the job.
   * @param offerId - The id of the offer to accept.
   * @param options - Options for accepting a job offer.
   */
  public async acceptJobOffer(
    workerId: string,
    offerId: string,
    options: OperationOptions = {},
  ): Promise<AcceptJobOfferResponse> {
    return this.client.jobRouter.acceptJobAction(workerId, offerId, options);
  }

  /**
   * Declines a job offer.
   * @param workerId - The id of the worker holding the offer.
   * @param offerId - The id of the offer to decline.
   * @param options - Options for declining a job offer.
   */
  public async declineJobOffer(
    workerId: string,
    offerId: string,
    options: DeclineJobOfferOptions = {},
  ): Promise<DeclineJobOfferResponse> {
    return this.client.jobRouter.declineJobAction(workerId, offerId, options);
  }

  /**
   * Creates a worker.
   * @param workerId - The id of the worker to create.
   * @param options - Options for creating a worker.
   * @returns - The created worker.
   */
  public async createWorker(
    workerId: string,
    options: CreateWorkerOptions = {},
  ): Promise<RouterWorkerResponse> {
    const response = await this.client.jobRouter.upsertWorker(workerId, options, options);
    return response as RouterWorkerResponse;
  }

  /**
   * Updates a worker.
   * @param workerId - The id of the worker to update.
   * @param options - Options for updating a worker. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated worker.
   */
  public async updateWorker(
    workerId: string,
    options: UpdateWorkerOptions = {},
  ): Promise<RouterWorkerResponse> {
    const response = await this.client.jobRouter.upsertWorker(workerId, options, options);
    return response as RouterWorkerResponse;
  }

  /**
   * Gets a worker.
   * @param workerId - The id of the worker to get.
   * @param options - Options for getting a worker.
   * @returns - The worker.
   */
  public async getWorker(
    workerId: string,
    options: OperationOptions = {},
  ): Promise<RouterWorkerResponse> {
    const response = await this.client.jobRouter.getWorker(workerId, options);
    return response as RouterWorkerResponse;
  }

  /**
   * Gets a list of workers.
   * @param options - Options for listing workers.
   * @returns - The list of workers.
   */
  public listWorkers(
    options: ListWorkersOptions = {},
  ): TransformingPagedAsyncIterableIterator<RouterWorkerItemGenerated, RouterWorkerItem> {
    const listOptions = <JobRouterListWorkersOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;

    const transformingIterator = new TransformingPagedAsyncIterableIterator(
      this.client.jobRouter.listWorkers(listOptions),
      listWorkersTransform,
    );

    return transformingIterator;
  }

  /**
   * Deletes a worker.
   * @param workerId - The id of the worker to delete.
   * @param options - Options for deleting a worker.
   */
  public async deleteWorker(workerId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouter.deleteWorker(workerId, options);
  }

  /**
   * Gets a queue's statistics.
   * @param queueId - The id of the queue to get statistics of.
   * @param options - Options for getting a queue's statistics.
   * @returns - The queue's statistics.
   */
  public async getQueueStatistics(
    queueId: string,
    options: OperationOptions = {},
  ): Promise<RouterQueueStatistics> {
    return this.client.jobRouter.getQueueStatistics(queueId, options);
  }
}
