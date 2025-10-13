// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BatchTranscriptionContext,
  BatchTranscriptionClientOptionalParams} from "./api/index.js";
import {
  createBatchTranscription
} from "./api/index.js";
import {
  listTranscriptionFiles,
  listTranscriptions,
  deleteTranscription,
  getTranscription,
  startTranscription,
} from "./api/operations.js";
import type {
  ListTranscriptionFilesOptionalParams,
  ListTranscriptionsOptionalParams,
  DeleteTranscriptionOptionalParams,
  GetTranscriptionOptionalParams,
  StartTranscriptionOptionalParams,
} from "./api/options.js";
import type { TranscriptionJob, TranscriptionFile } from "./models/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { KeyCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { BatchTranscriptionClientOptionalParams } from "./api/batchTranscriptionContext.js";

export class BatchTranscriptionClient {
  private _client: BatchTranscriptionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential,
    options: BatchTranscriptionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBatchTranscription(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Gets the files of the transcription identified by the given ID */
  listTranscriptionFiles(
    id: string,
    options: ListTranscriptionFilesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TranscriptionFile> {
    return listTranscriptionFiles(this._client, id, options);
  }

  /** Gets a list of transcriptions for the authenticated subscription. */
  listTranscriptions(
    options: ListTranscriptionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TranscriptionJob> {
    return listTranscriptions(this._client, options);
  }

  /** Deletes the specified transcription task. */
  deleteTranscription(
    id: string,
    options: DeleteTranscriptionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTranscription(this._client, id, options);
  }

  /** Gets the transcription identified by the given ID. */
  getTranscription(
    id: string,
    options: GetTranscriptionOptionalParams = { requestOptions: {} },
  ): Promise<TranscriptionJob> {
    return getTranscription(this._client, id, options);
  }

  /** Starts a new transcription job. */
  startTranscription(
    resource: TranscriptionJob,
    options: StartTranscriptionOptionalParams = { requestOptions: {} },
  ): Promise<TranscriptionJob> {
    return startTranscription(this._client, resource, options);
  }
}
