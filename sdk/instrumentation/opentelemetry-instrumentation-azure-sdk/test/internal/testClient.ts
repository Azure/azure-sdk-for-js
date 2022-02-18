// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions, TracingClient, createTracingClient } from "@azure/core-tracing";
import {
  Pipeline,
  PipelineResponse,
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineFromOptions,
} from "@azure/core-rest-pipeline";

import { SDK_VERSION } from "../../src/constants";

/**
 * A partial implementation of OperationOptions.
 */
export interface Options {
  tracingOptions?: OperationTracingOptions;
  throw?: boolean;
}

/**
 * Options passed to {@link createTracingClient}, exported for validation.
 */
export const tracingClientAttributes = {
  namespace: "Microsoft.Test",
  packageName: "@azure/opentelemetry-instrumentation-azure-sdk",
  packageVersion: SDK_VERSION,
};

/**
 * A small client that uses core-rest-pipeline to make requests.
 */
export class TestClient {
  tracingClient: TracingClient;
  pipeline: Pipeline;

  constructor() {
    this.tracingClient = createTracingClient(tracingClientAttributes);
    this.pipeline = createPipelineFromOptions({});
  }

  /**
   * The entrypoint of this client, which the tests will call into
   */
  async outer(options: Options = {}): Promise<PipelineResponse> {
    return this.tracingClient.withSpan("TestClient.outer", options, (updatedOptions) =>
      this.inner(updatedOptions)
    );
  }

  private inner(options: Options = {}): Promise<PipelineResponse> {
    return this.tracingClient.withSpan(
      "TestClient.inner",
      options,
      (updatedOptions) => {
        return this.pipeline.sendRequest(createDefaultHttpClient(), {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 5000,
          url: "https://bing.com",
          withCredentials: false,
          ...updatedOptions,
        });
      },
      { spanKind: "client" }
    );
  }
}
