// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { OperationOptions } from "@azure/core-client";
import {
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  JobQueueItem,
  JobRouterAdministrationListClassificationPoliciesOptionalParams,
  JobRouterAdministrationListDistributionPoliciesOptionalParams,
  JobRouterAdministrationListExceptionPoliciesOptionalParams,
  JobRouterAdministrationListQueuesOptionalParams,
  JobRouterApiClient,
} from "./generated/src";
import {
  CreateClassificationPolicyOptions,
  CreateDistributionPolicyOptions,
  CreateExceptionPolicyOptions,
  CreateQueueOptions,
  ListClassificationPoliciesOptions,
  ListDistributionPoliciesOptions,
  ListExceptionPoliciesOptions,
  ListQueuesOptions,
  RouterAdministrationClientOptions,
  UpdateClassificationPolicyOptions,
  UpdateDistributionPolicyOptions,
  UpdateExceptionPolicyOptions,
  UpdateQueueOptions,
} from "./models/options";

import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  CommunicationTokenCredential,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SDK_VERSION } from "./constants";
import { logger } from "./models/logger";
import {
  ClassificationPolicyResponse,
  DistributionPolicyResponse,
  ExceptionPolicyResponse,
  JobQueueResponse,
} from "./models/responses";

/**
 * Checks whether the type of a value is {@link RouterAdministrationClientOptions} or not.
 *
 * @param options - The value being checked.
 */
const isRouterAdministrationClientOptions = (
  options: any
): options is RouterAdministrationClientOptions => !!options && !isKeyCredential(options);

/**
 * The client to do router operations
 */
export class RouterAdministrationClient {
  private readonly client: JobRouterApiClient;

  /**
   * Initializes a new instance of the RouterClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param routerAdministrationClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    routerAdministrationClientOptions?: RouterAdministrationClientOptions
  );

  /**
   * Initializes a new instance of the RouterClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or
   * `@azure/identity` or TokenCredential to create a credential.
   * @param routerAdministrationClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    routerAdministrationClientOptions?: RouterAdministrationClientOptions
  );

  /**
   * Initializes a new instance of the RouterClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - CommunicationTokenCredential that is used to authenticate requests to the service.
   * @param routerAdministrationClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: CommunicationTokenCredential,
    routerAdministrationClientOptions?: RouterAdministrationClientOptions
  );

  /**
   * Creates an instance of the RouterClient for a given resource and user.
   *
   * @param connectionStringOrUrl - The connectionString or url of the Communication Services resource.
   * @param credentialOrOptions - The key or token credential or RouterAdministrationClientOptions. Use AzureCommunicationKeyCredential from \@azure/communication-common to create a credential.
   * @param maybeOptions - Additional client options.
   */
  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?:
      | KeyCredential
      | TokenCredential
      | CommunicationTokenCredential
      | RouterAdministrationClientOptions,
    maybeOptions: RouterAdministrationClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isRouterAdministrationClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

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

  // Classification Policy Actions
  /**
   * Creates a classification policy.
   * Returns classification policy with the id of the created classification policy.
   * @param classificationPolicyId - Id of the classification policy.
   * @param options - Operation options.
   */
  public async createClassificationPolicy(
    classificationPolicyId: string,
    options: CreateClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      options,
      options
    );
    return <ClassificationPolicyResponse>policy;
  }

  /**
   * Updates a classification policy.
   * Returns classification policy with the id of the updated classification policy.
   * @param classificationPolicyId - Id of the classification policy.
   * @param options - Operation options.
   */
  public async updateClassificationPolicy(
    classificationPolicyId: string,
    options: UpdateClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      options,
      options
    );
    return <ClassificationPolicyResponse>policy;
  }

  /**
   * Gets the list of classification policies.
   * @param options - List classification policies options.
   */
  public listClassificationPolicies(
    options: ListClassificationPoliciesOptions = {}
  ): PagedAsyncIterableIterator<ClassificationPolicyItem> {
    const listOptions = <JobRouterAdministrationListClassificationPoliciesOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listClassificationPolicies(listOptions);
  }

  /**
   * Gets a classification policy.
   * Returns classification policy with the id of the classification policy.
   * @param classificationPolicyId - The id of the classification policy to get.
   * @param options -  Operation options.
   */
  public async getClassificationPolicy(
    classificationPolicyId: string,
    options: OperationOptions = {}
  ): Promise<ClassificationPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.getClassificationPolicy(
      classificationPolicyId,
      options
    );
    return <ClassificationPolicyResponse>policy;
  }

  /**
   * Deletes a classification policy.
   * @param classificationPolicyId - The id of the classification policy to delete.
   * @param options -  Operation options.
   */
  public async deleteClassificationPolicy(
    classificationPolicyId: string,
    options: OperationOptions = {}
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteClassificationPolicy(
      classificationPolicyId,
      options
    );
  }

  // DistributionPolicy Actions
  /**
   * Creates a distribution policy.
   * Returns distribution policy with the id of the created distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to create.
   * @param options - Operation options.
   */
  public async createDistributionPolicy(
    distributionPolicyId: string,
    options: CreateDistributionPolicyOptions = {}
  ): Promise<DistributionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      options,
      options
    );
    return <DistributionPolicyResponse>policy;
  }

  /**
   * Updates a distribution policy.
   * Returns distribution policy with the id of the updated distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to update.
   * @param options - Operation options.
   */
  public async updateDistributionPolicy(
    distributionPolicyId: string,
    options: UpdateDistributionPolicyOptions = {}
  ): Promise<DistributionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      options,
      options
    );
    return <DistributionPolicyResponse>policy;
  }

  /**
   * Gets the list of distribution policies.
   * @param options - List distribution policies options.
   */
  public listDistributionPolicies(
    options: ListDistributionPoliciesOptions = {}
  ): PagedAsyncIterableIterator<DistributionPolicyItem> {
    const listOptions = <JobRouterAdministrationListDistributionPoliciesOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listDistributionPolicies(listOptions);
  }

  /**
   * Gets a distribution policy.
   * Returns distribution policy client with the id of the distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to get.
   * @param options -  Operation options.
   */
  public async getDistributionPolicy(
    distributionPolicyId: string,
    options: OperationOptions = {}
  ): Promise<DistributionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.getDistributionPolicy(
      distributionPolicyId,
      options
    );
    return <DistributionPolicyResponse>policy;
  }

  /**
   * Deletes a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to delete.
   * @param options -  Operation options.
   */
  public async deleteDistributionPolicy(
    distributionPolicyId: string,
    options: OperationOptions = {}
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteDistributionPolicy(
      distributionPolicyId,
      options
    );
  }

  // ExceptionPolicy Actions
  /**
   * Creates a exception policy.
   * Returns exception policy with the id of the created exception policy.
   * @param exceptionPolicyId - The id of the exception policy to create.
   * @param options - Operation options.
   */
  public async createExceptionPolicy(
    exceptionPolicyId: string,
    options: CreateExceptionPolicyOptions = {}
  ): Promise<ExceptionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      options,
      options
    );
    return <ExceptionPolicyResponse>policy;
  }

  /**
   * Updates a exception policy.
   * Returns exception policy with the id of the updated exception policy.
   * @param exceptionPolicyId - The id of the exception policy to update.
   * @param options - Operation options.
   */
  public async updateExceptionPolicy(
    exceptionPolicyId: string,
    options: UpdateExceptionPolicyOptions = {}
  ): Promise<ExceptionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      options,
      options
    );
    return <ExceptionPolicyResponse>policy;
  }

  /**
   * Gets the list of exception policies.
   * @param options - List exception policies options.
   */
  public listExceptionPolicies(
    options: ListExceptionPoliciesOptions = {}
  ): PagedAsyncIterableIterator<ExceptionPolicyItem> {
    const listOptions = <JobRouterAdministrationListExceptionPoliciesOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listExceptionPolicies(listOptions);
  }

  /**
   * Gets an exception policy.
   * Returns exception policy with the id of the exception policy.
   * @param exceptionPolicyId - The id of the exception policy to get.
   * @param options -  Operation options.
   */
  public async getExceptionPolicy(
    exceptionPolicyId: string,
    options: OperationOptions = {}
  ): Promise<ExceptionPolicyResponse> {
    const policy = await this.client.jobRouterAdministration.getExceptionPolicy(
      exceptionPolicyId,
      options
    );
    return <ExceptionPolicyResponse>policy;
  }

  /**
   * Deletes an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to delete.
   * @param options -  Operation options.
   */
  public async deleteExceptionPolicy(
    exceptionPolicyId: string,
    options: OperationOptions = {}
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteExceptionPolicy(exceptionPolicyId, options);
  }

  // Queue Actions
  /**
   * Creates a queue.
   * Returns queue with the id of the created queue.
   * @param queueId - The ID of the queue to create.
   * @param options - Operation options.
   */
  public async createQueue(
    queueId: string,
    options: CreateQueueOptions = {}
  ): Promise<JobQueueResponse> {
    const queueModel = <JobQueueResponse>options;
    const queue = await this.client.jobRouterAdministration.upsertQueue(
      queueId,
      <JobQueueResponse>queueModel,
      options
    );
    return <JobQueueResponse>queue;
  }

  /**
   * Updates a queue.
   * Returns queue with the id of the created queue.
   * @param queueId - The ID of the queue to update.
   * @param options - Operation options.
   */
  public async updateQueue(
    queueId: string,
    options: UpdateQueueOptions = {}
  ): Promise<JobQueueResponse> {
    const queueModel = options;
    const queue = await this.client.jobRouterAdministration.upsertQueue(
      queueId,
      <JobQueueResponse>queueModel,
      options
    );
    return <JobQueueResponse>queue;
  }

  /**
   * Gets the list of queues.
   * @param options - List queues options.
   */
  public listQueues(options: ListQueuesOptions = {}): PagedAsyncIterableIterator<JobQueueItem> {
    const listOptions = <JobRouterAdministrationListQueuesOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listQueues(listOptions);
  }

  /**
   * Gets a queue.
   * Returns queue with the id of the queue.
   * @param queueId - The ID of the queue to get.
   * @param options -  Operation options.
   */
  public async getQueue(
    queueId: string,
    options: OperationOptions = {}
  ): Promise<JobQueueResponse> {
    const queue = await this.client.jobRouterAdministration.getQueue(queueId, options);
    return <JobQueueResponse>queue;
  }

  /**
   * Deletes a queue.
   * @param queueId - The ID of the queue to delete.
   * @param options -  Operation options.
   */
  public async deleteQueue(queueId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouterAdministration.deleteQueue(queueId, options);
  }
}
