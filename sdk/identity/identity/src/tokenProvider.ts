// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, TracingContext } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

/**
 * The options to configure the token provider.
 */
export interface GetBearerTokenProviderOptions {
  /** The abort signal to abort requests to get tokens */
  abortSignal?: AbortSignal;
  /** The tracing options for the requests to get tokens */
  tracingOptions?: {
    /**
     * Tracing Context for the current request to get a token.
     */
    tracingContext?: TracingContext;
  };
}

/**
 * Returns a callback that provides a bearer token.
 * For example, the bearer token can be used to authenticate a request as follows:
 * ```js
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential();
 * const scope = "https://cognitiveservices.azure.com/.default";
 * const getAccessToken = getBearerTokenProvider(credential, scope);
 * const token = await getAccessToken();
 *
 * // usage
 * const request = createPipelineRequest({ url: "https://example.com" });
 * request.headers.set("Authorization", `Bearer ${token}`);
 * ```
 *
 * @param credential - The credential used to authenticate the request.
 * @param scopes - The scopes required for the bearer token.
 * @param options - Options to configure the token provider.
 * @returns a callback that provides a bearer token.
 */
export function getBearerTokenProvider(
  credential: TokenCredential,
  scopes: string | string[],
  options?: GetBearerTokenProviderOptions,
): () => Promise<string> {
  const { abortSignal, tracingOptions } = options || {};
  const pipeline = createEmptyPipeline();
  pipeline.addPolicy(bearerTokenAuthenticationPolicy({ credential, scopes }));
  async function getRefreshedToken(): Promise<string> {
    // Create a pipeline with just the bearer token policy
    // and run a dummy request through it to get the token
    const res = await pipeline.sendRequest(
      {
        sendRequest: (request) =>
          Promise.resolve({
            request,
            status: 200,
            headers: request.headers,
          }),
      },
      createPipelineRequest({
        url: "https://example.com",
        abortSignal,
        tracingOptions,
      }),
    );
    const accessToken = res.headers.get("authorization")?.split(" ")[1];
    if (!accessToken) {
      throw new Error("Failed to get access token");
    }
    return accessToken;
  }
  return getRefreshedToken;
}
