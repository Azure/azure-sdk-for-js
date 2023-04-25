// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AzureLogger } from "@azure/logger";
import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { AccessTokenGetter, createTokenCycler } from "../util/tokenCycler";
import { logger as coreLogger } from "../log";
import { AuthorizeRequestOptions } from "./bearerTokenAuthenticationPolicy";

export const multiTenantAuthenticationPolicyName = "multiTenantAuthenticationPolicy";
const AUTHORIZATION_AUXILIARY_HEADER = "x-ms-authorization-auxiliary";


export interface MultiTenantAuthenticationPolicyOptions {
  /**
   * The TokenCredential list that can supply the multi tenant authentication token.
   */
  credentials?: TokenCredential[];
  /**
   * The scopes for which the Multi tenant token applies.
   */
  scopes: string | string[];
  /**
   * A logger can be sent for debugging purposes.
   */
  logger?: AzureLogger;
}

type NullableString = string | null | undefined;

async function sendAuthorizeRequest(options: AuthorizeRequestOptions): Promise<NullableString> {
  const { scopes, getAccessToken, request } = options;
  const getTokenOptions: GetTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
  };

  return (await getAccessToken(scopes, getTokenOptions))?.token;
}

export function multiTenantAuthenticationPolicy(
  options: MultiTenantAuthenticationPolicyOptions
): PipelinePolicy {
  const { credentials, scopes } = options;
  const logger = options.logger || coreLogger;
  const tokenCyclerMap = new WeakMap<TokenCredential, AccessTokenGetter>();

  return {
    name: multiTenantAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "Multi-tenant token authentication is not permitted for non-TLS protected (non-https) URLs."
        );
      }
      if (!credentials || credentials.length === 0) {
        return next(request);
      }

      const tokenPromises: Promise<NullableString>[] = [];
      for (const credential of credentials) {
        if (!tokenCyclerMap.has(credential)) {
          tokenCyclerMap.set(credential, createTokenCycler(credential));
        }
        tokenPromises.push(sendAuthorizeRequest({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          request,
          getAccessToken: tokenCyclerMap.get(credential)!,
          logger,
        }));
      }
      const auxiliaryTokens: NullableString[] = await Promise.all(tokenPromises);
      request.headers.set(
        AUTHORIZATION_AUXILIARY_HEADER,
        auxiliaryTokens.filter(token => Boolean(token)).map((token) => `Bearer ${token}`).join(", ")
      );

      return next(request);
    },
  };
}
