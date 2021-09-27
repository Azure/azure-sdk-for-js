// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnections } from "./generated/src/operations";
import { HangUpOptions } from "./models";
import { createSpan } from "./tracing";
import {
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";

/**
 * The client to do call connection operations
 */
export class CallConnection {
  private readonly callConnectionId: string;
  private readonly callConnectionRestClient: CallConnections;

  constructor(
    callConnectionId: string,
    callConnectionRestClient: CallConnections,
  ) {
    this.callConnectionId = callConnectionId;
    this.callConnectionRestClient = callConnectionRestClient;
  }

  public async hangUp(options: HangUpOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-HangUp", options);

    try {
      await this.callConnectionRestClient.hangupCall(
        this.callConnectionId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
