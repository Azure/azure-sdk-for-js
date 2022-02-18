import { TracingClient, createTracingClient, OperationTracingOptions } from "@azure/core-tracing";
import { SDK_VERSION } from "../../src/constants";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineFromOptions,
  Pipeline,
} from "@azure/core-rest-pipeline";

export interface Options {
  tracingOptions?: OperationTracingOptions;
  throw?: boolean;
}

export const tracingClientAttributes = {
  namespace: "Microsoft.Test",
  packageName: "@azure/opentelemetry-instrumentation-azure-sdk",
  packageVersion: SDK_VERSION,
};

export class TestClient {
  tracingClient: TracingClient;
  pipeline: Pipeline;

  constructor() {
    this.tracingClient = createTracingClient(tracingClientAttributes);

    this.pipeline = createPipelineFromOptions({});
  }
  async outer(options: Options = {}) {
    return this.tracingClient.withSpan("TestClient.outer", options, (updatedOptions) =>
      this.inner(updatedOptions)
    );
  }

  inner(options: Options = {}) {
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

  withContext(_options: Options) {}
}
