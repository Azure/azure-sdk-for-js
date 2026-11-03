// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * Name of the policy that backfills an empty JSON body for responses that
 * legitimately carry no body (e.g. 204 No Content, 304 Not Modified, HEAD
 * responses, and some 4xx error responses with no problem-details payload).
 *
 * The generated deserializers always invoke `errorDeserializer(result.body)`
 * (and, in some success paths, the entity deserializer) with `result.body`
 * directly. When `result.body` is `undefined` the deserializer dereferences
 * `item["type"]` / `item["key"]` and throws a `TypeError`, which masks the
 * proper `RestError` that was just constructed.
 *
 * This policy ensures that whenever the wire response has no body, the
 * downstream JSON parsing step yields `{}` instead of `undefined`, so the
 * generated deserializers see an empty object and behave correctly.
 *
 * @internal
 */
export const emptyBodyPolicyName = "AppConfigEmptyBodyPolicy";

/**
 * Pipeline policy that backfills an empty JSON object body when the service
 * responds with no body.
 * @internal
 */
export function emptyBodyPolicy(): PipelinePolicy {
  return {
    name: emptyBodyPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      const text = response.bodyAsText;
      if (text === undefined || text === null || text.length === 0) {
        response.bodyAsText = "{}";
      }
      return response;
    },
  };
}
