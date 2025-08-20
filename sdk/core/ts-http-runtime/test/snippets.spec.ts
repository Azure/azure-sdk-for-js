// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint "@typescript-eslint/no-shadow": "off" */

import { describe, it } from "vitest";
import type {
  HttpClient,
  PipelinePhase,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  AddPolicyOptions,
  Client,
} from "@typespec/ts-http-runtime";
import { AbortError } from "@typespec/ts-http-runtime";

interface GetOperationResult {}
interface DetectFromUrl {}
interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperationResult;
  /** Resource for '/detect' has methods for the following verbs: post */
  (path: "/detect"): DetectFromUrl;
}

describe("snippets", () => {
  it("ReadmeSampleSendRequest", () => {
    type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;
  });

  it("ReadmeSampleHttpRequest", () => {
    interface HttpClient {
      /**
       * The method that makes the request and returns a response.
       */
      sendRequest: SendRequest;
    }
  });

  it("ReadmeSamplePipelinePolicy", () => {
    interface PipelinePolicy {
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

  it("ReadmeSampleCustomPolicy", () => {
    // @ts-ignore
    const customPolicy = {
      name: "My wonderful policy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        // Change the outgoing request by adding a new header
        request.headers.set("X-Cool-Header", 42);
        const result = await next(request);
        if (result.status === 403) {
          // Do something special if this policy sees Forbidden
        }
        // @ts-preserve-whitespace
        return result;
      },
    };
  });

  it("ReadmeSamplePipeline", () => {
    interface Pipeline {
      addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
      removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
      sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse>;
      getOrderedPolicies(): PipelinePolicy[];
      clone(): Pipeline;
    }
  });

  it("ReadmeSampleAddPipelineOptions", () => {
    interface AddPipelineOptions {
      beforePolicies?: string[];
      afterPolicies?: string[];
      afterPhase?: PipelinePhase;
      phase?: PipelinePhase;
    }
  });

  it("ReadmeSampleAbortError", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        throw new AbortError();
      }
      // @ts-preserve-whitespace
      // do async work
    }
    // @ts-preserve-whitespace
    const controller = new AbortController();
    controller.abort();
    // @ts-preserve-whitespace
    try {
      doAsyncWork({ abortSignal: controller.signal });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        // handle abort error here.
      }
    }
  });

  it("ReadmeSamplePathExample", () => {
    type MyClient = Client & {
      path: Routes;
    };
  });
});
