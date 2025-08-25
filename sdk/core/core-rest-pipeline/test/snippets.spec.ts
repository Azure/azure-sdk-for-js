// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import {
  AddPipelineOptions,
  HttpClient,
  PipelinePhase,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

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
        return result;
      },
    };
  });

  it("ReadmeSamplePipeline", () => {
    interface Pipeline {
      addPolicy(policy: PipelinePolicy, options?: AddPipelineOptions): void;
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
});
