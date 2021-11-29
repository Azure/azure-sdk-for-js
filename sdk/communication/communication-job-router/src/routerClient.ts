// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { logger } from "./models/logger";
import { SDK_VERSION } from "./constants";
import { createPipelineFromOptions, InternalPipelineOptions, RestResponse } from "@azure/core-http";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  UpsertDistributionPolicyOptions,
  UpsertExceptionPolicyOptions,
  CreateJobOptions,
  DeleteChannelOptions,
  DeleteDistributionPolicyOptions,
  DeleteExceptionPolicyOptions,
  CancelJobOptions,
  AcceptJobOptions,
  DeclineJobOptions,
  CompleteJobOptions,
  DeleteQueueOptions,
  DeregisterWorkerOptions,
  GetChannelOptions,
  GetClassificationPolicyOptions,
  GetDistributionPolicyOptions,
  GetExceptionPolicyOptions,
  GetJobOptions,
  GetQueueOptions,
  GetWorkerOptions,
  ListChannelsOptions,
  ListClassificationPoliciesOptions,
  ListDistributionPoliciesOptions,
  ListExceptionPoliciesOptions,
  ListJobsOptions,
  ListEnqueuedJobsOptions,
  ListQueuesOptions,
  ListWorkersOptions,
  RegisterWorkerOptions,
  RouterClientOptions,
  UpsertQueueOptions,
  CloseJobOptions,
  ReleaseWorkerOptions,
  DeleteClassificationPolicyOptions,
  UpdateJobClassificationOptions,
  UpdateJobLabelsOptions,
  GetJobPositionOptions,
  UpsertChannelOptions,
  UpsertClassificationPolicyOptions
} from "./models/options";
import { ChannelType } from "./models/models";
import {
  ClassificationPolicy,
  UpsertClassificationPolicyResponse,
  CreateJobResponse,
  UpsertQueueResponse,
  DistributionPolicy,
  ExceptionPolicy,
  JobRouterApiClient,
  UpsertChannelRequest,
  UpsertChannelResponse,
  UpsertClassificationPolicyRequest,
  UpsertExceptionPolicyResponse,
  UpsertDistributionPolicyResponse,
  UpsertDistributionPolicyRequest,
  UpsertExceptionPolicyRequest,
  JobPositionDetails,
  AcceptJobOfferResponse,
  JobQueue,
  RouterChannel,
  RouterJob,
  RouterWorker,
  JobStateSelector,
  WorkerStateSelector
} from "./generated/src";

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments
} from "@azure/communication-common";
import { createSetHeadersPolicy } from "./policies";
import {
  LabelValue,
  RestCreateJobRequest,
  RestReclassifyJobRequest,
  RestRegisterWorkerRequest,
  RestUpsertQueueRequest
} from "./models/requests";

/**
 * Checks whether the type of a value is RouterClientOptions or not.
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
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: RouterClientOptions);

  /**
   * Initializes a new instance of the RouterClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: RouterClientOptions);

  /**
   * Initializes a new instance of the RouterClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: RouterClientOptions);

  /**
   * Creates an instance of the RouterClient for a given resource and user.
   *
   * @param connectionStringOrUrl - The connectionString or url of the Communication Services resource.
   * @param credentialOrOptions - The key or token credential or RouterClientOptions. Use AzureCommunicationKeyCredential from \@azure/communication-common to create a credential.
   * @param maybeOptions - Additional client options.
   */
  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | RouterClientOptions,
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
      ...{ ...options, userAgentOptions },
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    if (maybeOptions.headers) {
      const setHeadersPolicy = createSetHeadersPolicy(maybeOptions.headers);
      if (Array.isArray(pipeline.requestPolicyFactories)) {
        pipeline.requestPolicyFactories.push(setHeadersPolicy);
      }
    }

    this.client = new JobRouterApiClient(url, pipeline);
  }

  // Channel Actions
  /**
   * Creates or updates a channel.
   * Returns channel with the id of the created channel.
   * @param request - Request for creating a router channel.
   * @param options - Operation options.
   */
  public async upsertChannel(
    request: UpsertChannelRequest,
    options: UpsertChannelOptions = {}
  ): Promise<UpsertChannelResponse> {
    return this.client.jobRouter.createOrUpdateChannel(request, options);
  }

  /**
   * Gets the list of channels.
   * @param channelType - The type of channels to list.
   * @param options - List channels options.
   */
  public listChannels(
    channelType: ChannelType = ChannelType.All,
    options: ListChannelsOptions = {}
  ): PagedAsyncIterableIterator<RouterChannel> {
    options.typeParam = channelType;
    return this.client.jobRouter.listChannels(options);
  }

  /**
   * Gets a channel.
   * Returns channel with the id of the gotten channel.
   * @param channelId - The ID of the channel to get.
   * @param options - Operation options.
   */
  public async getChannel(
    channelId: string,
    options: GetChannelOptions = {}
  ): Promise<RouterChannel> {
    return this.client.jobRouter.getChannel(channelId, options);
  }

  /**
   * Deletes a channel.
   * @param channelId - The ID of the channel to delete.
   * @param options -  Operation options.
   */
  public async deleteChannel(
    channelId: string,
    options: DeleteChannelOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteChannel(channelId, options);
  }

  // Classification Policy Actions
  /**
   * Creates a classification policy.
   * Returns classification policy with the id of the created classification policy.
   * @param request - Request for creating a router classification policy.
   * @param options - Operation options.
   */
  public async upsertClassificationPolicy(
    request: UpsertClassificationPolicyRequest,
    options: UpsertClassificationPolicyOptions = {}
  ): Promise<UpsertClassificationPolicyResponse> {
    return this.client.jobRouter.createOrUpdateClassificationPolicy(request, options);
  }

  /**
   * Gets the list of classification policies.
   * @param options - List classification policies options.
   */
  public listClassificationPolicies(
    options: ListClassificationPoliciesOptions = {}
  ): PagedAsyncIterableIterator<ClassificationPolicy> {
    return this.client.jobRouter.listClassificationPolicies(options);
  }

  /**
   * Gets a classification policy.
   * Returns classification policy with the id of the classification policy.
   * @param classificationPolicyId - The id of the classification policy to get.
   * @param options - Operation options.
   */
  public async getClassificationPolicy(
    classificationPolicyId: string,
    options: GetClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicy> {
    return this.client.jobRouter.getClassificationPolicy(classificationPolicyId, options);
  }

  /**
   * Deletes a classification policy.
   * @param classificationPolicyId - The id of the classification policy to delete.
   * @param options -  Operation options.
   */
  public async deleteClassificationPolicy(
    classificationPolicyId: string,
    options: DeleteClassificationPolicyOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteClassificationPolicy(classificationPolicyId, options);
  }

  // DistributionPolicy Actions
  /**
   * Create or update a distribution policy.
   * Returns distribution policy with the id of the created distribution policy.
   * @param request - Request for creating a distribution policy.
   * @param options - Operation options.
   */
  public async upsertDistributionPolicy(
    request: UpsertDistributionPolicyRequest,
    options: UpsertDistributionPolicyOptions = {}
  ): Promise<UpsertDistributionPolicyResponse> {
    return this.client.jobRouter.createOrUpdateDistributionPolicy(request, options);
  }

  /**
   * Gets the list of distribution policies.
   * @param options - List distribution policies options.
   */
  public listDistributionPolicies(
    options: ListDistributionPoliciesOptions = {}
  ): PagedAsyncIterableIterator<DistributionPolicy> {
    return this.client.jobRouter.listDistributionPolicies(options);
  }

  /**
   * Gets a distribution policy.
   * Returns distribution policy client with the id of the distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to get.
   * @param options - Operation options.
   */
  public async getDistributionPolicy(
    distributionPolicyId: string,
    options: GetDistributionPolicyOptions = {}
  ): Promise<DistributionPolicy> {
    return this.client.jobRouter.getDistributionPolicy(distributionPolicyId, options);
  }

  /**
   * Deletes a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to delete.
   * @param options - Operation options.
   */
  public async deleteDistributionPolicy(
    distributionPolicyId: string,
    options: DeleteDistributionPolicyOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteDistributionPolicy(distributionPolicyId, options);
  }

  // ExceptionPolicy Actions
  /**
   * Creates or updates a exception policy.
   * Returns exception policy with the id of the created exception policy.
   * @param request - Request for creating a exception policy.
   * @param options - Operation options.
   */
  public async upsertExceptionPolicy(
    request: UpsertExceptionPolicyRequest,
    options: UpsertExceptionPolicyOptions = {}
  ): Promise<UpsertExceptionPolicyResponse> {
    return this.client.jobRouter.createOrUpdateExceptionPolicy(request, options);
  }

  /**
   * Gets the list of exception policies.
   * @param options - List exception policies options.
   */
  public listExceptionPolicies(
    options: ListExceptionPoliciesOptions = {}
  ): PagedAsyncIterableIterator<ExceptionPolicy> {
    return this.client.jobRouter.listExceptionPolicies(options);
  }

  /**
   * Gets an exception policy.
   * Returns exception policy with the id of the exception policy.
   * @param exceptionPolicyId - The id of the exception policy to get.
   * @param options - Operation options.
   */
  public async getExceptionPolicy(
    exceptionPolicyId: string,
    options: GetExceptionPolicyOptions = {}
  ): Promise<ExceptionPolicy> {
    return this.client.jobRouter.getExceptionPolicy(exceptionPolicyId, options);
  }

  /**
   * Deletes an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to delete.
   * @param options - Operation options.
   */
  public async deleteExceptionPolicy(
    exceptionPolicyId: string,
    options: DeleteExceptionPolicyOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteExceptionPolicy(exceptionPolicyId, options);
  }

  // Job Actions
  /**
   * Creates a job.
   * Returns job with the id of the created job.
   * @param request - Request for creating a job.
   * @param options - Operation options.
   */
  public async createJob(
    request: RestCreateJobRequest,
    options: CreateJobOptions = {}
  ): Promise<CreateJobResponse> {
    return this.client.jobRouter.createJob(request, options);
  }

  /**
   * Gets the list of enqueued jobs.
   * @param queueId - The queue id.
   * @param options - List jobs options.
   */
  public listEnqueuedJobs(
    queueId: string,
    options: ListEnqueuedJobsOptions = {}
  ): PagedAsyncIterableIterator<RouterJob> {
    return this.client.jobRouter.listEnqueuedJobs(queueId, options);
  }

  /**
   * Update or insert labels of a job by Id.
   * @param jobId - The ID of the job to update.
   * @param labels - The labels to update.
   * @param options -  Operation options.
   */
  public async updateJobLabels(
    jobId: string,
    labels: { [propertyName: string]: LabelValue },
    options: UpdateJobLabelsOptions = {}
  ): Promise<RouterJob> {
    return this.client.jobRouter.updateJobLabels(jobId, labels, options);
  }

  /**
   * Updates an existing job by Id and forcing it to be reclassified.
   * @param jobId - The ID of the job to update.
   * @param request - The update and classify job request.
   * @param options -  Operation options.
   */
  public async reclassifyJob(
    jobId: string,
    request: RestReclassifyJobRequest,
    options: UpdateJobClassificationOptions = {}
  ): Promise<RouterJob> {
    return this.client.jobRouter.reclassifyJob(jobId, request, options);
  }

  /**
   * Updates an existing job's queueId, priority, requiredAbilities and labels.
   * @param jobId - The ID of the job to update.
   * @param options - UpdateClassification options encapsulating the queueId, priority and worker requirements.
   */
  public async updateJobClassification(
    jobId: string,
    options: UpdateJobClassificationOptions = {}
  ): Promise<RouterJob> {
    return this.client.jobRouter.updateJobClassification(jobId, options);
  }

  /**
   * Gets the list of jobs.
   * @param status - (Optional) If specified, select jobs by status. Valid options are: `all`, `pendingClassification`, `queued`, `assigned`, `completed`, `closed`, `cancelled`, `classificationFailed`, `active`.
   * @param options - List jobs options.
   */
  public listJobs(
    status?: JobStateSelector,
    options: ListJobsOptions = {}
  ): PagedAsyncIterableIterator<RouterJob> {
    if (status) {
      options.status = status;
    }
    return this.client.jobRouter.listJobs(options);
  }

  /**
   * Gets a job's position details.
   * Returns job position details.
   * @param jobId - The ID of the job to get.
   * @param options - Operation options.
   */
  public async getInQueuePosition(
    jobId: string,
    options: GetJobPositionOptions = {}
  ): Promise<JobPositionDetails> {
    return this.client.jobRouter.getInQueuePosition(jobId, options);
  }

  /**
   * Gets a job.
   * Returns job client with the id of the gotten job.
   * @param jobId - The ID of the job to get.
   * @param options - Operation options.
   */
  public async getJob(jobId: string, options: GetJobOptions = {}): Promise<RouterJob> {
    return this.client.jobRouter.getJob(jobId, options);
  }

  /**
   * Cancel a job.
   * @param jobId - The ID of the job to cancel.
   * @param options - Operation options.
   */
  public async cancelJob(jobId: string, options: CancelJobOptions = {}): Promise<RestResponse> {
    return this.client.jobRouter.cancelJob(jobId, options);
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
  ): Promise<RestResponse> {
    return this.client.jobRouter.completeJob(jobId, assignmentId, options);
  }

  /**
   * Close a job.
   * @param jobId - The ID of the job to close.
   * @param assignmentId - The assignment within which the job is to be closed.
   * @param options - Operation options.
   */
  public async closeJob(
    jobId: string,
    assignmentId: string,
    options: CloseJobOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.closeJob(jobId, assignmentId, options);
  }

  /**
   * Accept a job offer.
   * @param workerId - The ID of the worker that accepts the job.
   * @param offerId - The ID of the offer to accept.
   * @param options -  Operation options.
   */
  public async acceptJobOffer(
    workerId: string,
    offerId: string,
    options: AcceptJobOptions = {}
  ): Promise<AcceptJobOfferResponse> {
    return this.client.jobRouter.acceptJob(offerId, workerId, options);
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
    options: DeclineJobOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.declineJob(offerId, workerId, options);
  }

  // Queue Actions
  /**
   * Creates or updates a queue.
   * Returns queue with the id of the created queue.
   * @param request - Request for creating a queue.
   * @param options - Operation options.
   */
  public async upsertQueue(
    request: RestUpsertQueueRequest,
    options: UpsertQueueOptions = {}
  ): Promise<UpsertQueueResponse> {
    return this.client.jobRouter.createOrUpdateQueue(request, options);
  }

  /**
   * Gets the list of queues.
   * @param options - List queues options.
   */
  public listQueues(options: ListQueuesOptions = {}): PagedAsyncIterableIterator<JobQueue> {
    return this.client.jobRouter.listQueues(options);
  }

  /**
   * Gets a queue.
   * Returns queue with the id of the queue.
   * @param queueId - The ID of the queue to get.
   * @param options - Operation options.
   */
  public async getQueue(queueId: string, options: GetQueueOptions = {}): Promise<JobQueue> {
    return this.client.jobRouter.getQueue(queueId, options);
  }

  /**
   * Deletes a queue.
   * @param queueId - The ID of the queue to delete.
   * @param options -  Operation options.
   */
  public async deleteQueue(
    queueId: string,
    options: DeleteQueueOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteQueue(queueId, options);
  }

  // Worker Actions
  /**
   * Registers a worker.
   * Returns worker with the id of the registered worker.
   * @param request - Request for registing a worker.
   * @param options - Operation options.
   */
  public async registerWorker(
    request: RestRegisterWorkerRequest,
    options: RegisterWorkerOptions = {}
  ): Promise<RouterWorker> {
    return this.client.jobRouter.registerWorker(request, options);
  }

  /**
   * Deregisters a worker.
   * @param workerId - The Id of the worker.
   * @param options - Operation options.
   */
  public async deregisterWorker(
    workerId: string,
    options: DeregisterWorkerOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deregisterWorker(workerId, options);
  }

  /**
   * Releases capacity consumed by an assignment within a workers channel configuration.
   * @param workerId - The Id of the worker.
   * @param assignmentId - The Id of the assignemnt.
   * @param options - Operation options.
   */
  public async releaseWorkerAssignment(
    workerId: string,
    assignmentId: string,
    options: ReleaseWorkerOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.releaseAssignment(workerId, assignmentId, options);
  }

  /**
   * Gets a worker.
   * Returns worker with the id of the worker.
   * @param workerId - The ID of the worker to get.
   * @param options - Operation options.
   */
  public async getWorker(workerId: string, options: GetWorkerOptions = {}): Promise<RouterWorker> {
    return this.client.jobRouter.getWorker(workerId, options);
  }

  /**
   * Gets the list of workers.
   * @param status - (Optional) If specified, select workers by worker status. Valid options are: `active`, `draining`, `inactive` and `all`.
   * @param channelId - (Optional) If specified, select workers who have a channel configuration with this channel.
   * @param queueId - (Optional) If specified, select workers who are assigned to this queue.
   * @param hasCapacity - (Optional) If set to true, select only workers who have capacity for the channel specified by `channelId` or for any channel if `channelId` not specified. If set to false, then will return all workers including workers without any capacity for jobs. Defaults to false.
   * @param options - List workers options.
   */
  public listWorkers(
    status?: WorkerStateSelector,
    channelId?: string,
    queueId?: string,
    hasCapacity?: boolean,
    options: ListWorkersOptions = {}
  ): PagedAsyncIterableIterator<RouterWorker> {
    if (status) {
      options.status = status;
    }

    if (channelId) {
      options.channelId = channelId;
    }

    if (queueId) {
      options.queueId = queueId;
    }

    if (hasCapacity) {
      options.hasCapacity = hasCapacity;
    }
    return this.client.jobRouter.listWorkers(options);
  }
}
