// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

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
 * @returns a callback that provides a bearer token.
 */
export function getBearerTokenProvider(
  credential: TokenCredential,
  scopes: string | string[],
): () => Promise<string> {
  const pipeline = createEmptyPipeline();
  pipeline.addPolicy(bearerTokenAuthenticationPolicy({ credential, scopes }));
  async function getRefereshedToken(): Promise<string> {
    const res = await pipeline.sendRequest(
      {
        sendRequest: (request) =>
          Promise.resolve({
            request,
            status: 200,
            headers: request.headers,
          }),
      },
      {
        headers: createHttpHeaders(),
        method: "GET",
        url: "https://example.com",
        requestId: "",
        timeout: 0,
        withCredentials: false,
      },
    );
    const accessToken = res.headers.get("authorization")?.split(" ")[1];
    if (!accessToken) {
      throw new Error("Failed to get access token");
    }
    return accessToken;
  }
  return getRefereshedToken;
}
