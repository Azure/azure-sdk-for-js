// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  JobRouterAdministrationContext,
  JobRouterAdministrationClientOptionalParams,
  createJobRouterAdministration,
} from "./api/index.js";
import {
  DistributionPolicy,
  ClassificationPolicy,
  ExceptionPolicy,
  RouterQueue,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  deleteQueue,
  listQueues,
  getQueue,
  upsertQueue,
  deleteExceptionPolicy,
  listExceptionPolicies,
  getExceptionPolicy,
  upsertExceptionPolicy,
  deleteClassificationPolicy,
  listClassificationPolicies,
  getClassificationPolicy,
  upsertClassificationPolicy,
  deleteDistributionPolicy,
  listDistributionPolicies,
  getDistributionPolicy,
  upsertDistributionPolicy,
} from "./api/operations.js";
import {
  DeleteQueueOptionalParams,
  ListQueuesOptionalParams,
  GetQueueOptionalParams,
  UpsertQueueOptionalParams,
  DeleteExceptionPolicyOptionalParams,
  ListExceptionPoliciesOptionalParams,
  GetExceptionPolicyOptionalParams,
  UpsertExceptionPolicyOptionalParams,
  DeleteClassificationPolicyOptionalParams,
  ListClassificationPoliciesOptionalParams,
  GetClassificationPolicyOptionalParams,
  UpsertClassificationPolicyOptionalParams,
  DeleteDistributionPolicyOptionalParams,
  ListDistributionPoliciesOptionalParams,
  GetDistributionPolicyOptionalParams,
  UpsertDistributionPolicyOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { JobRouterAdministrationClientOptionalParams } from "./api/jobRouterAdministrationContext.js";

export class JobRouterAdministrationClient {
  private _client: JobRouterAdministrationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: JobRouterAdministrationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createJobRouterAdministration(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Deletes a queue by Id. */
  deleteQueue(
    queueId: string,
    options: DeleteQueueOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteQueue(this._client, queueId, options);
  }

  /** Retrieves existing queues. */
  listQueues(
    options: ListQueuesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<RouterQueue> {
    return listQueues(this._client, options);
  }

  /** Retrieves an existing queue by Id. */
  getQueue(
    queueId: string,
    options: GetQueueOptionalParams = { requestOptions: {} },
  ): Promise<RouterQueue> {
    return getQueue(this._client, queueId, options);
  }

  /** Creates or updates a queue. */
  upsertQueue(
    queueId: string,
    resource: RouterQueue,
    options: UpsertQueueOptionalParams = { requestOptions: {} },
  ): Promise<RouterQueue> {
    return upsertQueue(this._client, queueId, resource, options);
  }

  /** Deletes a exception policy by Id. */
  deleteExceptionPolicy(
    exceptionPolicyId: string,
    options: DeleteExceptionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteExceptionPolicy(this._client, exceptionPolicyId, options);
  }

  /** Retrieves existing exception policies. */
  listExceptionPolicies(
    options: ListExceptionPoliciesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ExceptionPolicy> {
    return listExceptionPolicies(this._client, options);
  }

  /** Retrieves an existing exception policy by Id. */
  getExceptionPolicy(
    exceptionPolicyId: string,
    options: GetExceptionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<ExceptionPolicy> {
    return getExceptionPolicy(this._client, exceptionPolicyId, options);
  }

  /** Creates or updates a exception policy. */
  upsertExceptionPolicy(
    exceptionPolicyId: string,
    resource: ExceptionPolicy,
    options: UpsertExceptionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<ExceptionPolicy> {
    return upsertExceptionPolicy(this._client, exceptionPolicyId, resource, options);
  }

  /** Delete a classification policy by Id. */
  deleteClassificationPolicy(
    classificationPolicyId: string,
    options: DeleteClassificationPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteClassificationPolicy(this._client, classificationPolicyId, options);
  }

  /** Retrieves existing classification policies. */
  listClassificationPolicies(
    options: ListClassificationPoliciesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ClassificationPolicy> {
    return listClassificationPolicies(this._client, options);
  }

  /** Retrieves an existing classification policy by Id. */
  getClassificationPolicy(
    classificationPolicyId: string,
    options: GetClassificationPolicyOptionalParams = { requestOptions: {} },
  ): Promise<ClassificationPolicy> {
    return getClassificationPolicy(this._client, classificationPolicyId, options);
  }

  /** Creates or updates a classification policy. */
  upsertClassificationPolicy(
    classificationPolicyId: string,
    resource: ClassificationPolicy,
    options: UpsertClassificationPolicyOptionalParams = { requestOptions: {} },
  ): Promise<ClassificationPolicy> {
    return upsertClassificationPolicy(this._client, classificationPolicyId, resource, options);
  }

  /** Delete a distribution policy by Id. */
  deleteDistributionPolicy(
    distributionPolicyId: string,
    options: DeleteDistributionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteDistributionPolicy(this._client, distributionPolicyId, options);
  }

  /** Retrieves existing distribution policies. */
  listDistributionPolicies(
    options: ListDistributionPoliciesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DistributionPolicy> {
    return listDistributionPolicies(this._client, options);
  }

  /** Retrieves an existing distribution policy by Id. */
  getDistributionPolicy(
    distributionPolicyId: string,
    options: GetDistributionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<DistributionPolicy> {
    return getDistributionPolicy(this._client, distributionPolicyId, options);
  }

  /** Creates or updates a distribution policy. */
  upsertDistributionPolicy(
    distributionPolicyId: string,
    resource: DistributionPolicy,
    options: UpsertDistributionPolicyOptionalParams = { requestOptions: {} },
  ): Promise<DistributionPolicy> {
    return upsertDistributionPolicy(this._client, distributionPolicyId, resource, options);
  }
}
