// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
  RestError,
} from "@azure/core-rest-pipeline";

export interface NextInjectErrorHolder {
  nextInjectError?: RestError;
}

export type Injector = () => RestError | undefined;

/**
 * The programmatic identifier of the injectorPolicy.
 */
export const injectorPolicyName = "injectorPolicy";

/**
 * injectorPolicy is a policy used to introduce errors into the pipeline
 * for the purposes of testing policies such as retry.
 */
export function injectorPolicy(injector: Injector): PipelinePolicy {
  return {
    name: injectorPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const error = injector();
      if (error) {
        throw error;
      }
      return next(request);
    },
  };
}
