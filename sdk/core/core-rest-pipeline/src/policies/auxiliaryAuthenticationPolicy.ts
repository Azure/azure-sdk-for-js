// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AzureLogger } from "@azure/logger";
import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { createTokenCycler } from "../util/tokenCycler";
import { logger as coreLogger } from "../log";
import { AuthorizeRequestOptions } from "./bearerTokenAuthenticationPolicy";

/**
 * The programmatic identifier of the auxiliaryAuthenticationPolicy.
 */
export const auxiliaryAuthenticationPolicyName = "auxiliaryAuthenticationPolicy";
const AUTHORIZATION_AUXILIARY_HEADER = "x-ms-authorization-auxiliary";

/**
 * Options to configure the auxiliaryAuthenticationPolicy
 */
export interface AuxiliaryAuthenticationPolicyOptions {
  /**
   * The TokenCredential list that can supply the auxiliary authentication token.
   */
  credentials?: TokenCredential[];
  /**
   * The scopes for which the auxiliary token applies.
   */
  scopes: string | string[];
  /**
   * A logger can be sent for debugging purposes.
   */
  logger?: AzureLogger;
}

/**
 * Default authorize request handler
 */
async function defaultAuthorizeRequest(options: AuthorizeRequestOptions): Promise<string | null> {
  const { scopes, getAccessToken, request } = options;
  const getTokenOptions: GetTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
  };

  const accessToken = await getAccessToken(scopes, getTokenOptions);

  if (accessToken) {
    return accessToken.token;
  }
  return null;
}

function buildAccessTokenCycler(credential: TokenCredential) {
  return credential ? createTokenCycler(credential /* , options */) : () => Promise.resolve(null);
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function auxiliaryAuthenticationPolicy(
  options: AuxiliaryAuthenticationPolicyOptions
): PipelinePolicy {
  const { credentials, scopes } = options;
  const logger = options.logger || coreLogger;
  const tokenCyclerMap = new Map();

  return {
    name: auxiliaryAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "Auxiliary token authentication is not permitted for non-TLS protected (non-https) URLs."
        );
      }

      const tokenList: string[] = [];
      for (const credential of credentials ?? []) {
        if (!tokenCyclerMap.has(credential)) {
          tokenCyclerMap.set(credential, buildAccessTokenCycler(credential));
        }
        const getAccessToken = tokenCyclerMap.get(credential);
        const singleAccessToken = await defaultAuthorizeRequest({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          request,
          getAccessToken,
          logger,
        });
        if (singleAccessToken) {
          tokenList.push(singleAccessToken);
        }
      }

      request.headers.set(
        AUTHORIZATION_AUXILIARY_HEADER,
        tokenList.map((token) => `Bearer ${token}`).join(",")
      );

      let response: PipelineResponse;
      let error: Error | undefined;
      try {
        response = await next(request);
      } catch (err: any) {
        error = err;
        response = err.response;
      }

      if (error) {
        throw error;
      } else {
        return response;
      }
    },
  };
}
