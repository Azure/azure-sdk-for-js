// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { WebResourceLike, toPipelineRequest, toWebResourceLike } from "../util.js";
import { CompatResponse, toCompatResponse, toPipelineResponse } from "../response.js";

/**
 * A compatible interface for core-http request policies
 */
export interface RequestPolicy {
  sendRequest(httpRequest: WebResourceLike): Promise<CompatResponse>;
}

/**
 * An enum for compatibility with RequestPolicy
 */
export enum HttpPipelineLogLevel {
  ERROR = 1,
  INFO = 3,
  OFF = 0,
  WARNING = 2,
}

/**
 * An interface for compatibility with RequestPolicy
 */
export interface RequestPolicyOptionsLike {
  log(logLevel: HttpPipelineLogLevel, message: string): void;
  shouldLog(logLevel: HttpPipelineLogLevel): boolean;
}

const mockRequestPolicyOptions: RequestPolicyOptionsLike = {
  log(_logLevel: HttpPipelineLogLevel, _message: string): void {
    /* do nothing */
  },
  shouldLog(_logLevel: HttpPipelineLogLevel): boolean {
    return false;
  },
};

/**
 * An interface for compatibility with core-http's RequestPolicyFactory
 */
export interface RequestPolicyFactory {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): RequestPolicy;
}

/**
 * The name of the RequestPolicyFactoryPolicy
 */
export const requestPolicyFactoryPolicyName = "RequestPolicyFactoryPolicy";

/**
 * A policy that wraps policies written for core-http.
 * @param factories - An array of `RequestPolicyFactory` objects from a core-http pipeline
 */
export function createRequestPolicyFactoryPolicy(
  factories: RequestPolicyFactory[],
): PipelinePolicy {
  const orderedFactories = factories.slice().reverse();

  return {
    name: requestPolicyFactoryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let httpPipeline: RequestPolicy = {
        async sendRequest(httpRequest) {
          const response = await next(toPipelineRequest(httpRequest));
          return toCompatResponse(response, { createProxy: true });
        },
      };
      for (const factory of orderedFactories) {
        httpPipeline = factory.create(httpPipeline, mockRequestPolicyOptions);
      }

      const webResourceLike = toWebResourceLike(request, { createProxy: true });
      const response = await httpPipeline.sendRequest(webResourceLike);
      return toPipelineResponse(response);
    },
  };
}
