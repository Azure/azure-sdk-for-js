// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureLogger } from "@azure/logger";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { type AccessTokenGetter, createTokenCycler } from "../util/tokenCycler.js";
import { logger as coreLogger } from "../log.js";
import type { AuthorizeRequestOptions } from "./bearerTokenAuthenticationPolicy.js";

/**
 * The programmatic identifier of the auxiliaryAuthenticationHeaderPolicy.
 */
export const auxiliaryAuthenticationHeaderPolicyName = "auxiliaryAuthenticationHeaderPolicy";
const AUTHORIZATION_AUXILIARY_HEADER = "x-ms-authorization-auxiliary";

/**
 * Options to configure the auxiliaryAuthenticationHeaderPolicy
 */
export interface AuxiliaryAuthenticationHeaderPolicyOptions {
  /**
   * TokenCredential list used to get token from auxiliary tenants and
   * one credential for each tenant the client may need to access
   */
  credentials?: TokenCredential[];
  /**
   * Scopes depend on the cloud your application runs in
   */
  scopes: string | string[];
  /**
   * A logger can be sent for debugging purposes.
   */
  logger?: AzureLogger;
}

async function sendAuthorizeRequest(options: AuthorizeRequestOptions): Promise<string> {
  const { scopes, getAccessToken, request } = options;
  const getTokenOptions: GetTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
  };

  return (await getAccessToken(scopes, getTokenOptions))?.token ?? "";
}

/**
 * A policy for external tokens to `x-ms-authorization-auxiliary` header.
 * This header will be used when creating a cross-tenant application we may need to handle authentication requests
 * for resources that are in different tenants.
 * You could see [ARM docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant) for a rundown of how this feature works
 */
export function auxiliaryAuthenticationHeaderPolicy(
  options: AuxiliaryAuthenticationHeaderPolicyOptions,
): PipelinePolicy {
  const { credentials, scopes } = options;
  const logger = options.logger || coreLogger;
  const tokenCyclerMap = new WeakMap<TokenCredential, AccessTokenGetter>();

  return {
    name: auxiliaryAuthenticationHeaderPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "Bearer token authentication for auxiliary header is not permitted for non-TLS protected (non-https) URLs.",
        );
      }
      if (!credentials || credentials.length === 0) {
        logger.info(
          `${auxiliaryAuthenticationHeaderPolicyName} header will not be set due to empty credentials.`,
        );
        return next(request);
      }

      const tokenPromises: Promise<string>[] = [];
      for (const credential of credentials) {
        let getAccessToken = tokenCyclerMap.get(credential);
        if (!getAccessToken) {
          getAccessToken = createTokenCycler(credential);
          tokenCyclerMap.set(credential, getAccessToken);
        }
        tokenPromises.push(
          sendAuthorizeRequest({
            scopes: Array.isArray(scopes) ? scopes : [scopes],
            request,
            getAccessToken,
            logger,
          }),
        );
      }
      const auxiliaryTokens = (await Promise.all(tokenPromises)).filter((token) => Boolean(token));
      if (auxiliaryTokens.length === 0) {
        logger.warning(
          `None of the auxiliary tokens are valid. ${AUTHORIZATION_AUXILIARY_HEADER} header will not be set.`,
        );
        return next(request);
      }
      request.headers.set(
        AUTHORIZATION_AUXILIARY_HEADER,
        auxiliaryTokens.map((token) => `Bearer ${token}`).join(", "),
      );

      return next(request);
    },
  };
}
