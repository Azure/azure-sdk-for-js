// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createDeidentification,
  DeidentificationContext,
  DeidentificationClientOptionalParams,
} from "./api/index.js";
import {
  deidentifyText,
  deleteJob,
  cancelJob,
  listJobDocuments,
  listJobs,
  deidentifyDocuments,
  getJob,
} from "./api/operations.js";
import {
  DeidentifyTextOptionalParams,
  DeleteJobOptionalParams,
  CancelJobOptionalParams,
  ListJobDocumentsOptionalParams,
  ListJobsOptionalParams,
  DeidentifyDocumentsOptionalParams,
  GetJobOptionalParams,
} from "./api/options.js";
import {
  DeidentificationJob,
  DeidentificationDocumentDetails,
  DeidentificationContent,
  DeidentificationResult,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export { DeidentificationClientOptionalParams } from "./api/deidentificationContext.js";

export class DeidentificationClient {
  private _client: DeidentificationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: DeidentificationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeidentification(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** A remote procedure call (RPC) operation. */
  deidentifyText(
    body: DeidentificationContent,
    options: DeidentifyTextOptionalParams = { requestOptions: {} },
  ): Promise<DeidentificationResult> {
    return deidentifyText(this._client, body, options);
  }

  /** Removes the record of the job from the service. Does not delete any documents. */
  deleteJob(
    name: string,
    options: DeleteJobOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteJob(this._client, name, options);
  }

  /**
   * Cancels a job that is in progress.
   *
   * The job will be marked as canceled and the service will stop processing the job. The service will not delete any documents that have already been processed.
   *
   * If the job is already complete, this will have no effect.
   */
  cancelJob(
    name: string,
    options: CancelJobOptionalParams = { requestOptions: {} },
  ): Promise<DeidentificationJob> {
    return cancelJob(this._client, name, options);
  }

  /** Resource list operation template. */
  listJobDocuments(
    name: string,
    options: ListJobDocumentsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DeidentificationDocumentDetails> {
    return listJobDocuments(this._client, name, options);
  }

  /** Resource list operation template. */
  listJobs(
    options: ListJobsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DeidentificationJob> {
    return listJobs(this._client, options);
  }

  /** Long-running resource create or replace operation template. */
  deidentifyDocuments(
    name: string,
    resource: DeidentificationJob,
    options: DeidentifyDocumentsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DeidentificationJob>, DeidentificationJob> {
    return deidentifyDocuments(this._client, name, resource, options);
  }

  /** Resource read operation template. */
  getJob(
    name: string,
    options: GetJobOptionalParams = { requestOptions: {} },
  ): Promise<DeidentificationJob> {
    return getJob(this._client, name, options);
  }
}
