// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { Client, PipelineResponse, Routes } from "@typespec/ts-http-runtime";
import { AbortError, createTracingClient } from "@typespec/ts-http-runtime";

describe("snippets", () => {
  it("send_request", () => {
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;
  });

  it("http_request", () => {
    export interface HttpClient {
      /**
       * The method that makes the request and returns a response.
       */
      sendRequest: SendRequest;
    }
  });

  it("pipeline_policy", () => {
    export interface PipelinePolicy {
      /**
       * The policy name. Must be a unique string in the pipeline.
       */
      name: string;
      /**
       * The main method to implement that manipulates a request/response.
       * @param request - The request being performed.
       * @param next - The next policy in the pipeline. Must be called to continue the pipeline.
       */
      sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }
  });

  it("custom_policy", () => {
    // @ts-ignore
    const customPolicy = {
      name: "My wonderful policy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        // Change the outgoing request by adding a new header
        request.headers.set("X-Cool-Header", 42);
        const result = await next(request);
        if (response.status === 403) {
          // Do something special if this policy sees Forbidden
        }
        return result;
      },
    };
  });

  it("pipeline", () => {
    export interface Pipeline {
      addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
      removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
      sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse>;
      getOrderedPolicies(): PipelinePolicy[];
      clone(): Pipeline;
    }
  });

  it("add_policy_options", () => {
    export interface AddPolicyOptions {
      beforePolicies?: string[];
      afterPolicies?: string[];
      afterPhase?: PipelinePhase;
      phase?: PipelinePhase;
    }
  });

  it("abort_error", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        throw new AbortError();
      }

      // do async work
    }

    const controller = new AbortController();
    controller.abort();
    try {
      doAsyncWork({ abortSignal: controller.signal });
    } catch (e) {
      if (e.name === "AbortError") {
        // handle abort error here.
      }
    }
  });

  it("path_example", () => {
    export type MyClient = Client & {
      path: Routes;
    };
  });

  it("with_span_example", () => {
    const tracingClient = createTracingClient({
      namespace: "test.namespace",
      packageName: "test-package",
      packageVersion: "1.0.0",
    });

    const options = {};

    const myOperationResult = await tracingClient.withSpan(
      "myClassName.myOperationName",
      options,
      (updatedOptions) => {
        // Do something with the updated options.
        return "myOperationResult";
      },
    );
  });
});
