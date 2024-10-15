// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureLogger } from "@azure/logger";
import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { createTokenCycler } from "./popTokenCycler";

/**
 * The programmatic identifier of the popTokenAuthenticationPolicy.
 */
export const popTokenAuthenticationPolicyName = "popTokenAuthenticationPolicy";

/**
 * Options sent to the authorizeRequest callback
 */
export interface AuthorizeRequestOptions {
  /**
   * The scopes for which the pop token applies.
   */
  scopes: string[];
  /**
   * Function that retrieves either a cached access token or a new access token.
   */
  getAccessToken: (scopes: string[], options: GetTokenOptions) => Promise<AccessToken | null>;
  /**
   * Request that the policy is trying to fulfill.
   */
  request: PipelineRequest;
  /**
   * A logger, if one was sent through the HTTP pipeline.
   */
  logger?: AzureLogger;
}

/**
 * Options sent to the authorizeRequestOnChallenge callback
 */
export interface AuthorizeRequestOnChallengeOptions {
  /**
   * The scopes for which the pop token applies.
   */
  scopes: string[];
  /**
   * Function that retrieves either a cached access token or a new access token.
   */
  getAccessToken: (scopes: string[], options: GetTokenOptions) => Promise<AccessToken | null>;
  /**
   * Request that the policy is trying to fulfill.
   */
  request: PipelineRequest;
  /**
   * Response containing the challenge.
   */
  response: PipelineResponse;
  /**
   * A logger, if one was sent through the HTTP pipeline.
   */
  logger?: AzureLogger;
}

/**
 * Options to override the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
 */
export interface ChallengeCallbacks {
  /**
   * Allows for the authorization of the main request of this policy before it's sent.
   */
  authorizeRequest?(options: AuthorizeRequestOptions): Promise<void>;
  /**
   * Allows to handle authentication challenges and to re-authorize the request.
   * The response containing the challenge is `options.response`.
   * If this method returns true, the underlying request will be sent once again.
   * The request may be modified before being sent.
   */
  authorizeRequestOnChallenge?(options: AuthorizeRequestOnChallengeOptions): Promise<any>;
}

/**
 * Options to configure the popTokenAuthenticationPolicy
 */
export interface PopTokenAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the pop token.
   */
  credential?: TokenCredential;
  /**
   * The scopes for which the pop token applies.
   */
  scopes: string | string[];
  /**
   * Allows for the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
   * If provided, it must contain at least the `authorizeRequestOnChallenge` method.
   * If provided, after a request is sent, if it has a challenge, it can be processed to re-send the original request with the relevant challenge information.
   */
  challengeCallbacks?: ChallengeCallbacks;
  /**
   * A logger can be sent for debugging purposes.
   */
  logger?: AzureLogger;
}

/**
 * Default authorize request handler
 */
async function defaultAuthorizeRequest(options: AuthorizeRequestOptions): Promise<void> {
  const { scopes, getAccessToken, request } = options;
  const getTokenOptions: GetTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
  };

  const accessToken = await getAccessToken(scopes, getTokenOptions);

  if (accessToken) {
    options.request.headers.set("Authorization", `pop ${accessToken.token}`);
  }
}

/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function getChallenge(response: PipelineResponse): string | undefined {
  const challenge = response.headers.get("WWW-Authenticate");
  if (response.status === 401 && challenge) {
    return challenge;
  }
  return;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a pop token.
 */
export function popTokenAuthenticationPolicy(
  options: PopTokenAuthenticationPolicyOptions,
): PipelinePolicy {
  const { credential, scopes, challengeCallbacks } = options;
  const logger = options.logger;
  const callbacks = {
    authorizeRequest: challengeCallbacks?.authorizeRequest ?? defaultAuthorizeRequest,
    authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge,
    // keep all other properties
    ...challengeCallbacks,
  };

  // This function encapsulates the entire process of reliably retrieving the token
  // The options are left out of the public API until there's demand to configure this.
  // Remember to extend `popTokenAuthenticationPolicyOptions` with `TokenCyclerOptions`
  // in order to pass through the `options` object.
  const getAccessToken = credential
    ? createTokenCycler(credential /* , options */)
    : () => Promise.resolve(null);

  return {
    name: popTokenAuthenticationPolicyName,
    /**
     * If there's no challenge parameter:
     * - It will try to retrieve the token using the cache, or the credential's getToken.
     * - Then it will try the next policy with or without the retrieved token.
     *
     * It uses the challenge parameters to:
     * - Skip a first attempt to get the token from the credential if there's no cached token,
     *   since it expects the token to be retrievable only after the challenge.
     * - Prepare the outgoing request if the `prepareRequest` method has been provided.
     * - Send an initial request to receive the challenge if it fails.
     * - Process a challenge if the response contains it.
     * - Retrieve a token with the challenge information, then re-send the request.
     */
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "pop token authentication is not permitted for non-TLS protected (non-https) URLs.",
        );
      }

      await callbacks.authorizeRequest({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        request,
        getAccessToken,
        logger,
      });

      let response: PipelineResponse;
      let error: Error | undefined;
      try {
        response = await next(request);
      } catch (err: any) {
        error = err;
        response = err.response;
      }
      if (
        callbacks.authorizeRequestOnChallenge &&
        response?.status === 401 &&
        getChallenge(response)
      ) {
        const shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          request,
          response,
          getAccessToken,
          logger,
        });

        if (shouldSendRequest) {
          return next(request);
        }
      }

      if (error) {
        throw error;
      } else {
        return response;
      }
    },
  };
}
