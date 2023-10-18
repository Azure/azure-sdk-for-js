// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the ndJsonPolicy.
 */
export const ndJsonPolicyName = "ndJsonPolicy";

/**
 * ndJsonPolicy is a policy used to control keep alive settings for every request.
 */
export function ndJsonPolicy(): PipelinePolicy {
  return {
    name: ndJsonPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // There currently isn't a good way to bypass the serializer
      if (typeof request.body === "string" && request.body.startsWith("[")) {
        const body = JSON.parse(request.body);
        if (Array.isArray(body)) {
          request.body = body.map((item) => JSON.stringify(item) + "\n").join("");
        }
      }
      return next(request);
    },
  };
}
