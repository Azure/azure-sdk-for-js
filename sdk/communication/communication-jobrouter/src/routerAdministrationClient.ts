// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CommunicationTokenCredential } from "../../communication-common";
import {
  ClassificationPolicy,
  ClassificationPolicyItem,
  DistributionPolicy,
  DistributionPolicyItem,
  ExceptionPolicy,
  ExceptionPolicyItem,
  JobQueue,
  JobQueueItem,
  JobRouterAdministrationListClassificationPoliciesOptionalParams,
  JobRouterAdministrationListDistributionPoliciesOptionalParams,
  JobRouterAdministrationListExceptionPoliciesOptionalParams,
  JobRouterAdministrationListQueuesOptionalParams,
  JobRouterApiClient
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
  UpdateQueueOptions
} from "./models/options";

import { InternalPipelineOptions, RestResponse, createPipelineFromOptions } from "@azure/core-http";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments
} from "@azure/communication-common";

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SDK_VERSION } from "./constants";
import { logger } from "./models/logger";
import { createSetHeadersPolicy } from "./policies";

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
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param routerAdministrationClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential,
    routerAdministrationClientOptions?: RouterAdministrationClientOptions
  );

  /**
   * Initializes a new instance of the RouterClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param routerAdministrationClientOptions - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: TokenCredential,
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

    const libInfo = `azsdk-js-communication-jobrouter/${SDK_VERSION}`;

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
   * @param classificationPolicyId - Id of the classification policy.
   * @param options - Operation options.
   */
  public async createClassificationPolicy(
    classificationPolicyId: string,
    options: CreateClassificationPolicyOptions = {}
  ): Promise<ClassificationPolicy> {
    return this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      options,
      options
    );
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
  ): Promise<ClassificationPolicy> {
    return this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      options,
      options
    );
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
   */
  public async getClassificationPolicy(
    classificationPolicyId: string
  ): Promise<ClassificationPolicy> {
    return this.client.jobRouterAdministration.getClassificationPolicy(classificationPolicyId);
  }

  /**
   * Deletes a classification policy.
   * @param classificationPolicyId - The id of the classification policy to delete.
   */
  public async deleteClassificationPolicy(classificationPolicyId: string): Promise<RestResponse> {
    return this.client.jobRouterAdministration.deleteClassificationPolicy(classificationPolicyId);
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
  ): Promise<DistributionPolicy> {
    return this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      options,
      options
    );
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
  ): Promise<DistributionPolicy> {
    return this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      options,
      options
    );
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
   */
  public async getDistributionPolicy(distributionPolicyId: string): Promise<DistributionPolicy> {
    return this.client.jobRouterAdministration.getDistributionPolicy(distributionPolicyId);
  }

  /**
   * Deletes a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to delete.
   */
  public async deleteDistributionPolicy(distributionPolicyId: string): Promise<RestResponse> {
    return this.client.jobRouterAdministration.deleteDistributionPolicy(distributionPolicyId);
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
  ): Promise<ExceptionPolicy> {
    return this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      options,
      options
    );
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
  ): Promise<ExceptionPolicy> {
    return this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      options,
      options
    );
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
   */
  public async getExceptionPolicy(exceptionPolicyId: string): Promise<ExceptionPolicy> {
    return this.client.jobRouterAdministration.getExceptionPolicy(exceptionPolicyId);
  }

  /**
   * Deletes an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to delete.
   */
  public async deleteExceptionPolicy(exceptionPolicyId: string): Promise<RestResponse> {
    return this.client.jobRouterAdministration.deleteExceptionPolicy(exceptionPolicyId);
  }

  // Queue Actions
  /**
   * Creates a queue.
   * Returns queue with the id of the created queue.
   * @param queueId - The ID of the queue to create.
   * @param options - Operation options.
   */
  public async createQueue(queueId: string, options: CreateQueueOptions = {}): Promise<JobQueue> {
    const queueModel = <JobQueue>options;
    return this.client.jobRouterAdministration.upsertQueue(queueId, <JobQueue>queueModel, options);
  }

  /**
   * Updates a queue.
   * Returns queue with the id of the created queue.
   * @param queueId - The ID of the queue to update.
   * @param options - Operation options.
   */
  public async updateQueue(queueId: string, options: UpdateQueueOptions = {}): Promise<JobQueue> {
    const queueModel = options;
    return this.client.jobRouterAdministration.upsertQueue(queueId, <JobQueue>queueModel, options);
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
   */
  public async getQueue(queueId: string): Promise<JobQueue> {
    return this.client.jobRouterAdministration.getQueue(queueId);
  }

  /**
   * Deletes a queue.
   * @param queueId - The ID of the queue to delete.
   */
  public async deleteQueue(queueId: string): Promise<RestResponse> {
    return this.client.jobRouterAdministration.deleteQueue(queueId);
  }
}
