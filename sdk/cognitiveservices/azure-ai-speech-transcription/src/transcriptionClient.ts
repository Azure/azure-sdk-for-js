// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TranscriptionContext, TranscriptionClientOptionalParams } from "./api/index.js";
import { createTranscription } from "./api/index.js";
import { transcribe } from "./api/operations.js";
import type { TranscribeOptionalParams } from "./api/options.js";
import type { TranscribeRequestContent, TranscriptionResult } from "./models/models.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { TranscriptionClientOptionalParams } from "./api/transcriptionContext.js";

export class TranscriptionClient {
  private _client: TranscriptionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: TranscriptionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createTranscription(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Transcribes the provided audio stream. */
  transcribe(
    body: TranscribeRequestContent,
    options: TranscribeOptionalParams = { requestOptions: {} },
  ): Promise<TranscriptionResult> {
    return transcribe(this._client, body, options);
  }
}
