// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { logger } from "./models/logger";
import { SDK_VERSION } from "./constants";
import { createPipelineFromOptions, InternalPipelineOptions, RestResponse } from "@azure/core-http";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  CreateJobOptions,
  DeleteDistributionPolicyOptions,
  DeleteExceptionPolicyOptions,
  CancelJobOptions,
  AcceptJobOptions,
  DeclineJobOptions,
  CompleteJobOptions,
  DeleteQueueOptions,
  DeregisterWorkerOptions,
  GetClassificationPolicyOptions,
  GetDistributionPolicyOptions,
  GetExceptionPolicyOptions,
  GetJobOptions,
  GetQueueOptions,
  GetWorkerOptions,
  ListClassificationPoliciesOptions,
  ListDistributionPoliciesOptions,
  ListExceptionPoliciesOptions,
  ListJobsOptions,
  ListQueuesOptions,
  ListWorkersOptions,
  RegisterWorkerOptions,
  RouterClientOptions,
  CloseJobOptions,
  ReleaseWorkerOptions,
  DeleteClassificationPolicyOptions,
  UpdateJobLabelsOptions,
  GetJobPositionOptions,
  CreateClassificationPolicyOptions,
  CreateExceptionPolicyOptions,
  UpdateExceptionPolicyOptions,
  UpdateClassificationPolicyOptions,
  CreateDistributionPolicyOptions,
  UpdateDistributionPolicyOptions,
  DeleteJobOptions,
  CreateQueueOptions,
  UpdateQueueOptions,
  DeleteWorkerOptions
} from "./models/options";
import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  JobRouterApiClient,
  JobPositionDetails,
  AcceptJobOfferResponse,
  JobQueue,
  RouterJob,
  RouterWorker,
  JobStateSelector,
  WorkerStateSelector,
  CreateClassificationPolicyRequest,
  ReleaseAssignmentRequest,
  RegisterWorkerRequest
} from "./generated/src";

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments
} from "@azure/communication-common";
import { createSetHeadersPolicy } from "./policies";

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
      ...options,
      userAgentOptions,
      loggingOptions: {
        logger: logger.info
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

  // Classification Policy Actions
  /**
   * Creates a classification policy.
   * Returns classification policy with the id of the created classification policy.
   * @param request - Request for creating a classification policy.
   * @param options - Operation options.
   */
  public async createClassificationPolicy(
    request: CreateClassificationPolicyRequest,
    options: CreateClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicy> {
    return this.client.jobRouter.createClassificationPolicyV2(request, options);
  }

  /**
   * Updates a classification policy.
   * Returns classification policy with the id of the updated classification policy.
   * @param updatedModel - The updating classification policy model.
   * @param options - Operation options.
   */
  public async updateClassificationPolicy(
    updatedModel: ClassificationPolicy,
    options: UpdateClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicy> {
    options.patch = updatedModel;
    if (!updatedModel.id) {
      throw new Error("Updated model must contain id")
    }
    return this.client.jobRouter.patchClassificationPolicyV2(updatedModel.id, options);
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
   * Creates a distribution policy.
   * Returns distribution policy with the id of the created distribution policy.
   * @param request - Request for creating a distribution policy.
   * @param options - Operation options.
   */
  public async createDistributionPolicy(
    request: DistributionPolicy,
    options: CreateDistributionPolicyOptions = {}
  ): Promise<DistributionPolicy> {
    return this.client.jobRouter.createDistributionPolicyV2(request, options);
  }

  /**
   * Updates a distribution policy.
   * Returns distribution policy with the id of the updated distribution policy.
   * @param updatedModel - The updating distribution policy model.
   * @param options - Operation options.
   */
  public async updateDistributionPolicy(
    updatedModel: DistributionPolicy,
    options: UpdateDistributionPolicyOptions = {}
  ): Promise<DistributionPolicy> {
    options.patch = updatedModel;
    if (!updatedModel.id) {
      throw new Error("Updated model must contain id")
    }

    return this.client.jobRouter.patchDistributionPolicy(updatedModel.id, options);
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
   * Creates a exception policy.
   * Returns exception policy with the id of the created exception policy.
   * @param request - Request for creating a exception policy.
   * @param options - Operation options.
   */
  public async createExceptionPolicy(
    request: ExceptionPolicy,
    options: CreateExceptionPolicyOptions = {}
  ): Promise<ExceptionPolicy> {
    return this.client.jobRouter.createExceptionPolicyV2(request, options);
  }

  /**
   * Updates a exception policy.
   * Returns exception policy with the id of the updated exception policy.
   * @param updatedModel - The updating exception policy.
   * @param options - Operation options.
   */
  public async updateExceptionPolicy(
    updatedModel: ExceptionPolicy,
    options: UpdateExceptionPolicyOptions = {}
  ): Promise<ExceptionPolicy> {
    options.patchExceptionPolicy = updatedModel;
    if (!updatedModel.id) {
      throw new Error("Updated model must contain id")
    }

    return this.client.jobRouter.patchExceptionPolicyV2(updatedModel.id, options);
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
    request: RouterJob,
    options: CreateJobOptions = {}
  ): Promise<RouterJob> {
    return this.client.jobRouter.createJobV2(request, options);
  }

  /**
   * Gets an job.
   * Returns job with the id of the job.
   * @param jobId - The id of the job to get.
   * @param options - Operation options.
   */
  public async getJob(
    jobId: string,
    options: GetJobOptions = {}
  ): Promise<RouterJob> {
    return this.client.jobRouter.getJob(jobId, options);
  }

  /**
   * Update or insert labels of a job by Id.
   * @param updatedModel - The updating job
   * @param forceClassification - If forcing classification after update
   * @param options -  Operation options.
   */
  public async updateJobLabels(
    updatedModel: RouterJob,
    forceClassification?: boolean,
    options: UpdateJobLabelsOptions = {}
  ): Promise<RouterJob> {
    options.patch = updatedModel;
    if (!updatedModel.id) {
      throw new Error("Updated model must contain id")
    }
    if (forceClassification) {
      options.forceClassification = forceClassification;
    }

    return this.client.jobRouter.updateJob(updatedModel.id, options);
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
   * Cancel a job.
   * @param jobId - The ID of the job to cancel.
   * @param options - Operation options.
   */
  public async cancelJob(jobId: string, options: CancelJobOptions = {}): Promise<RestResponse> {
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
  ): Promise<RestResponse> {
    return this.client.jobRouter.completeJobAction(jobId, assignmentId, options);
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
    return this.client.jobRouter.closeJobAction(jobId, assignmentId, options);
  }

  /**
   * Deletes a job.
   * @param jobId - The id of the job to delete.
   * @param options - Operation options.
   */
  public async deleteJob(
    jobId: string,
    options: DeleteJobOptions = {}
  ): Promise<RestResponse> {
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
    options: AcceptJobOptions = {}
  ): Promise<AcceptJobOfferResponse> {
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
    options: DeclineJobOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.declineJobAction(offerId, workerId, options);
  }

  // Queue Actions
  /**
   * Creates a queue.
   * Returns queue with the id of the created queue.
   * @param request - Request for creating a queue.
   * @param options - Operation options.
   */
  public async createQueue(
    request: JobQueue,
    options: CreateQueueOptions = {}
  ): Promise<JobQueue> {
    return this.client.jobRouter.createQueue(request, options);
  }

  /**
   * Updates a queue.
   * Returns queue with the id of the created queue.
   * @param updatedModel - The updating queue.
   * @param options - Operation options.
   */
  public async updateQueue(
    updatedModel: JobQueue,
    options: UpdateQueueOptions = {}
  ): Promise<JobQueue> {
    options.patch = updatedModel;
    if (!updatedModel.id) {
      throw new Error("Updated model must contain id")
    }

    return this.client.jobRouter.updateQueue(updatedModel.id, options);
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
   * @param workerId - The worker Id
   * @param request - Request for registing a worker.
   * @param options - Operation options.
   */
  public async registerWorker(
    workerId: string,
    request: RegisterWorkerRequest,
    options: RegisterWorkerOptions = {}
  ): Promise<RouterWorker> {
    return this.client.jobRouter.registerWorkerV2(workerId, request, options);
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
    return this.client.jobRouter.deregisterWorkerV2(workerId, options);
  }

  /**
   * Releases capacity consumed by an assignment within a workers channel configuration.
   * @param workerId - The Id of the worker.
   * @param assignmentId - The Id of the assignemnt.
   * @param releaseAssignmentRequest - The release time if provided
   * @param options - Operation options.
   */
  public async releaseWorkerAssignment(
    workerId: string,
    assignmentId: string,
    releaseAssignmentRequest?: ReleaseAssignmentRequest,
    options: ReleaseWorkerOptions = {}
  ): Promise<RestResponse> {
    if (releaseAssignmentRequest) {
      options.releaseAssignmentRequest = releaseAssignmentRequest
    }

    return this.client.jobRouter.releaseAssignmentAction(workerId, assignmentId, options);
  }

  /**
   * Gets a worker.
   * Returns worker with the id of the worker.
   * @param workerId - The ID of the worker to get.
   * @param options - Operation options.
   */
  public async getWorker(
    workerId: string,
    options: GetWorkerOptions = {}
  ): Promise<RouterWorker> {
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

  /**
   * Deletes a worker.
   * @param workerId - The ID of the worker to delete.
   * @param options -  Operation options.
   */
  public async deleteWorker(
    workerId: string,
    options: DeleteWorkerOptions = {}
  ): Promise<RestResponse> {
    return this.client.jobRouter.deleteWorker(workerId, options);
  }
}
