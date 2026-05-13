// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTranscription } from "./api/index.js";
import type { TranscriptionContext, TranscriptionClientOptions } from "./api/index.js";
import { transcribe as transcribeOperation } from "./api/operations.js";
import type { TranscribeOptions } from "./api/options.js";
import type {
  TranscriptionContent,
  TranscriptionOptions,
  TranscriptionResult,
} from "./models/models.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { TranscriptionClientOptions } from "./api/transcriptionContext.js";

export class TranscriptionClient {
  private _client: TranscriptionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: TranscriptionClientOptions = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createTranscription(endpoint, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Transcribes audio from a URL. */
  transcribe(
    audioUrl: string,
    options?: Omit<TranscriptionOptions, "audioUrl">,
    operationOptions?: TranscribeOptions,
  ): Promise<TranscriptionResult>;
  /** Transcribes audio from a binary source (buffer, stream, or blob). */
  transcribe(
    audio: Uint8Array | NodeJS.ReadableStream | ReadableStream<Uint8Array> | Blob,
    options?: Omit<TranscriptionOptions, "audioUrl">,
    operationOptions?: TranscribeOptions,
  ): Promise<TranscriptionResult>;
  transcribe(
    source: string | Uint8Array | NodeJS.ReadableStream | ReadableStream<Uint8Array> | Blob,
    options: Omit<TranscriptionOptions, "audioUrl"> = {},
    operationOptions: TranscribeOptions = { requestOptions: {} },
  ): Promise<TranscriptionResult> {
    let body: TranscriptionContent;
    if (typeof source === "string") {
      body = {
        options: { ...options, audioUrl: source },
      };
    } else {
      body = {
        audio: source,
        options,
      };
    }

    return transcribeOperation(this._client, body, operationOptions);
  }
}
