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
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  JobRouterAdministrationListClassificationPoliciesOptionalParams,
  JobRouterAdministrationListDistributionPoliciesOptionalParams,
  JobRouterAdministrationListExceptionPoliciesOptionalParams,
  JobRouterAdministrationListQueuesOptionalParams,
  JobRouterApiClient,
} from "./generated/src";
import {
  ClassificationPolicyItem,
  DistributionPolicyItem,
  ExceptionPolicyItem,
  RouterQueueItem,
  DistributionPolicy,
  ExceptionPolicy,
  RouterQueue,
  ClassificationPolicy,
} from "./models";
import {
  CreateClassificationPolicyOptions,
  CreateDistributionPolicyOptions,
  CreateExceptionPolicyOptions,
  CreateQueueOptions,
  ListClassificationPoliciesOptions,
  ListDistributionPoliciesOptions,
  ListExceptionPoliciesOptions,
  ListQueuesOptions,
  JobRouterAdministrationClientOptions as JobRouterAdministrationClientOptions,
  UpdateClassificationPolicyOptions,
  UpdateDistributionPolicyOptions,
  UpdateExceptionPolicyOptions,
  UpdateQueueOptions,
} from "./options";
import {
  ClassificationPolicyResponse,
  DistributionPolicyResponse,
  ExceptionPolicyResponse,
  RouterQueueResponse,
} from "./responses";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";

/**
 * Checks whether a value is of type {@link JobRouterAdministrationClientOptions}.
 * @param value - The value being checked.
 */
const isRouterAdministrationClientOptions = (
  value: any,
): value is JobRouterAdministrationClientOptions => !!value && !isKeyCredential(value);

/**
 * The client to do administrative job router operations.
 */
export class JobRouterAdministrationClient {
  private readonly client: JobRouterApiClient;

  /**
   * Constructs an instance of {@link JobRouterAdministrationClient}.
   * @param connectionString - The connection string of the Azure Communication Services resource. (ex: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret").
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: JobRouterAdministrationClientOptions);

  /**
   * Constructs an instance of {@link JobRouterAdministrationClient} using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` or TokenCredential to create a credential.
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: JobRouterAdministrationClientOptions,
  );

  /**
   * Constructs an instance of {@link JobRouterAdministrationClient} using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - CommunicationTokenCredential that is used to authenticate requests to the service.
   * @param options - (Optional) Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: CommunicationTokenCredential,
    options?: JobRouterAdministrationClientOptions,
  );

  /**
   * Constructs an instance of {@link JobRouterAdministrationClient} for a given resource and user.
   * @param connectionStringOrUrl - The connection string or url of the Azure Communication Services resource.
   * @param credentialOrOptions - The key or token credential or {@link RouterAdministrationClientOptions}. Use AzureCommunicationKeyCredential from \@azure/communication-common to create a credential.
   * @param maybeOptions - Additional client options.
   */
  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?:
      | KeyCredential
      | TokenCredential
      | CommunicationTokenCredential
      | JobRouterAdministrationClientOptions,
    maybeOptions: JobRouterAdministrationClientOptions = {},
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

  /**
   * Creates a classification policy.
   * @param classificationPolicyId - The id of the classification policy to create.
   * @param options - Options for creating a classification policy.
   * @returns - The created classification policy.
   */
  public async createClassificationPolicy(
    classificationPolicyId: string,
    options: CreateClassificationPolicyOptions = {},
  ): Promise<ClassificationPolicyResponse> {
    const patch = options as ClassificationPolicy;
    const response = await this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      patch,
      options,
    );
    return response as ClassificationPolicyResponse;
  }

  /**
   * Updates a classification policy.
   * @param classificationPolicyId - The id of the classification policy to update.
   * @param options - Options for updating a classification policy. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated classification policy.
   */
  public async updateClassificationPolicy(
    classificationPolicyId: string,
    options: UpdateClassificationPolicyOptions = {},
  ): Promise<ClassificationPolicyResponse> {
    const patch = options as ClassificationPolicy;
    const response = await this.client.jobRouterAdministration.upsertClassificationPolicy(
      classificationPolicyId,
      patch,
      options,
    );
    return response as ClassificationPolicyResponse;
  }

  /**
   * Gets a list of classification policies.
   * @param options - Options for listing classification policies.
   * @returns - The list of classification policies.
   */
  public listClassificationPolicies(
    options: ListClassificationPoliciesOptions = {},
  ): PagedAsyncIterableIterator<ClassificationPolicyItem> {
    const listOptions = options as JobRouterAdministrationListClassificationPoliciesOptionalParams;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listClassificationPolicies(listOptions);
  }

  /**
   * Gets a classification policy.
   * @param classificationPolicyId - The id of the classification policy to get.
   * @param options - Options for getting a classification policy.
   * @returns - The classification policy.
   */
  public async getClassificationPolicy(
    classificationPolicyId: string,
    options: OperationOptions = {},
  ): Promise<ClassificationPolicyResponse> {
    const response = await this.client.jobRouterAdministration.getClassificationPolicy(
      classificationPolicyId,
      options,
    );
    return response as ClassificationPolicyResponse;
  }

  /**
   * Deletes a classification policy.
   * @param classificationPolicyId - The id of the classification policy to delete.
   * @param options - Options for deleting a classification policy.
   */
  public async deleteClassificationPolicy(
    classificationPolicyId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteClassificationPolicy(
      classificationPolicyId,
      options,
    );
  }

  /**
   * Creates a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to create.
   * @param options - Options for creating a distribution policy.
   * @returns - The created distribution policy.
   */
  public async createDistributionPolicy(
    distributionPolicyId: string,
    options: CreateDistributionPolicyOptions = {},
  ): Promise<DistributionPolicyResponse> {
    const patch = options as DistributionPolicy;
    const response = await this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      patch,
      options,
    );
    return response as DistributionPolicyResponse;
  }

  /**
   * Updates a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to update.
   * @param options - Options for updating a distribution policy. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated distribution policy.
   */
  public async updateDistributionPolicy(
    distributionPolicyId: string,
    options: UpdateDistributionPolicyOptions = {},
  ): Promise<DistributionPolicyResponse> {
    const patch = options as DistributionPolicy;
    const response = await this.client.jobRouterAdministration.upsertDistributionPolicy(
      distributionPolicyId,
      patch,
      options,
    );
    return response as DistributionPolicyResponse;
  }

  /**
   * Gets a list of distribution policies.
   * @param options - Options for listing distribution policies.
   * @returns - The list of distribution policies.
   */
  public listDistributionPolicies(
    options: ListDistributionPoliciesOptions = {},
  ): PagedAsyncIterableIterator<DistributionPolicyItem> {
    const listOptions = options as JobRouterAdministrationListDistributionPoliciesOptionalParams;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listDistributionPolicies(listOptions);
  }

  /**
   * Gets a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to get.
   * @param options - Options for getting a distribution policy.
   * @returns - The distribution policy.
   */
  public async getDistributionPolicy(
    distributionPolicyId: string,
    options: OperationOptions = {},
  ): Promise<DistributionPolicyResponse> {
    const response = await this.client.jobRouterAdministration.getDistributionPolicy(
      distributionPolicyId,
      options,
    );
    return response as DistributionPolicyResponse;
  }

  /**
   * Deletes a distribution policy.
   * @param distributionPolicyId - The id of the distribution policy to delete.
   * @param options - Options for deleting a distribution policy.
   */
  public async deleteDistributionPolicy(
    distributionPolicyId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteDistributionPolicy(
      distributionPolicyId,
      options,
    );
  }

  /**
   * Creates an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to create.
   * @param options - Options for creating an exception policy.
   * @returns - The created exception policy.
   */
  public async createExceptionPolicy(
    exceptionPolicyId: string,
    options: CreateExceptionPolicyOptions = {},
  ): Promise<ExceptionPolicyResponse> {
    const patch = options as ExceptionPolicy;
    const response = await this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      patch,
      options,
    );
    return response as ExceptionPolicyResponse;
  }

  /**
   * Updates an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to update.
   * @param options - Options for updating an exception policy. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated exception policy.
   */
  public async updateExceptionPolicy(
    exceptionPolicyId: string,
    options: UpdateExceptionPolicyOptions = {},
  ): Promise<ExceptionPolicyResponse> {
    const patch = options as ExceptionPolicy;
    const response = await this.client.jobRouterAdministration.upsertExceptionPolicy(
      exceptionPolicyId,
      patch,
      options,
    );
    return response as ExceptionPolicyResponse;
  }

  /**
   * Gets a list of exception policies.
   * @param options - Options for listing exception policies.
   * @returns - The list of exception policies.
   */
  public listExceptionPolicies(
    options: ListExceptionPoliciesOptions = {},
  ): PagedAsyncIterableIterator<ExceptionPolicyItem> {
    const listOptions = <JobRouterAdministrationListExceptionPoliciesOptionalParams>options;
    listOptions.maxpagesize = options.maxPageSize;
    return this.client.jobRouterAdministration.listExceptionPolicies(listOptions);
  }

  /**
   * Gets an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to get.
   * @param options - Options for getting an exception policy.
   * @returns - The exception policy.
   */
  public async getExceptionPolicy(
    exceptionPolicyId: string,
    options: OperationOptions = {},
  ): Promise<ExceptionPolicyResponse> {
    const response = await this.client.jobRouterAdministration.getExceptionPolicy(
      exceptionPolicyId,
      options,
    );
    return response as ExceptionPolicyResponse;
  }

  /**
   * Deletes an exception policy.
   * @param exceptionPolicyId - The id of the exception policy to delete.
   * @param options - Options for deleting an exception policy.
   */
  public async deleteExceptionPolicy(
    exceptionPolicyId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return this.client.jobRouterAdministration.deleteExceptionPolicy(exceptionPolicyId, options);
  }

  /**
   * Creates a queue.
   * @param queueId - The id of the queue to create.
   * @param options - Options for creating a queue.
   * @returns - The created queue.
   */
  public async createQueue(
    queueId: string,
    options: CreateQueueOptions = {},
  ): Promise<RouterQueueResponse> {
    const patch = options as RouterQueue;
    const response = await this.client.jobRouterAdministration.upsertQueue(queueId, patch, options);
    return response as RouterQueueResponse;
  }

  /**
   * Updates a queue.
   * @param queueId - The id of the queue to update.
   * @param options - Options for updating a queue. Uses merge-patch semantics: https://datatracker.ietf.org/doc/html/rfc7386.
   * @returns - The updated queue.
   */
  public async updateQueue(
    queueId: string,
    options: UpdateQueueOptions = {},
  ): Promise<RouterQueueResponse> {
    const patch = options as RouterQueue;
    const response = await this.client.jobRouterAdministration.upsertQueue(queueId, patch, options);
    return response as RouterQueueResponse;
  }

  /**
   * Gets a list of queues.
   * @param options - Options for listing queues.
   * @returns - The list of queues.
   */
  public listQueues(options: ListQueuesOptions = {}): PagedAsyncIterableIterator<RouterQueueItem> {
    const listOptions = options as JobRouterAdministrationListQueuesOptionalParams;
    listOptions.maxpagesize = options.maxPageSize || undefined;
    return this.client.jobRouterAdministration.listQueues(listOptions);
  }

  /**
   * Gets a queue.
   * @param queueId - The id of the queue to get.
   * @param options - Options for a getting a queue.
   * @returns - The queue.
   */
  public async getQueue(
    queueId: string,
    options: OperationOptions = {},
  ): Promise<RouterQueueResponse> {
    const response = await this.client.jobRouterAdministration.getQueue(queueId, options);
    return response as RouterQueueResponse;
  }

  /**
   * Deletes a queue.
   * @param queueId - The id of the queue to delete.
   * @param options - Options for deleting a queue.
   */
  public async deleteQueue(queueId: string, options: OperationOptions = {}): Promise<void> {
    return this.client.jobRouterAdministration.deleteQueue(queueId, options);
  }
}
