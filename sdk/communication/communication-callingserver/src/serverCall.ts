// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { ServerCalls } from "./generated/src/operations";
import { PlayAudioOptions } from "./models";
import { PlayAudioRequest } from "./generated/src/models";
import {
  PlayAudioResult
} from "./models";
import { createSpan } from "./tracing";
import {
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";

/**
 * The client to do call connection operations
 */
 export class ServerCall {
  private readonly serverCallId: string;
  private readonly serverCallRestClient: ServerCalls;

   constructor(
    serverCallId: string,
    serverCallRestClient: ServerCalls
  ) {
    this.serverCallId = serverCallId;
    this.serverCallRestClient = serverCallRestClient;
  }

  public async playAudio(
    audioFileUri: string,
    audioFileId: string,
    callbackUri: string,
    operationContext?: string,
    options: PlayAudioOptions = {}
  ): Promise<PlayAudioResult> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-PlayAudio", options);

    const request: PlayAudioRequest = {
      audioFileUri: audioFileUri,
      audioFileId: audioFileId,
      callbackUri: callbackUri,
      operationContext: operationContext,
    };

    try {
      const result = await this.serverCallRestClient.playAudio(
        this.serverCallId,
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;

    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
