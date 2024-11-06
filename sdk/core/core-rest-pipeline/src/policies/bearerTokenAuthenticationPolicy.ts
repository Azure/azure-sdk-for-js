// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureLogger } from "@azure/logger";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { createTokenCycler } from "../util/tokenCycler.js";
import { logger as coreLogger } from "../log.js";
import { isRestError, RestError } from "../restError.js";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";

/**
 * Options sent to the authorizeRequest callback
 */
export interface AuthorizeRequestOptions {
  /**
   * The scopes for which the bearer token applies.
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
   * The scopes for which the bearer token applies.
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
  authorizeRequestOnChallenge?(options: AuthorizeRequestOnChallengeOptions): Promise<boolean>;
}

/**
 * Options to configure the bearerTokenAuthenticationPolicy
 */
export interface BearerTokenAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the bearer token.
   */
  credential?: TokenCredential;
  /**
   * The scopes for which the bearer token applies.
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
 * Try to send the given request.
 *
 * When a response is received, returns a tuple of the response received and, if the response was received
 * inside a thrown RestError, the RestError that was thrown.
 *
 * Otherwise, if an error was thrown while sending the request that did not provide an underlying response, it
 * will be rethrown.
 */
async function trySendRequest(
  request: PipelineRequest,
  next: SendRequest,
): Promise<[PipelineResponse, RestError | undefined]> {
  try {
    return [await next(request), undefined];
  } catch (e: any) {
    if (isRestError(e) && e.response) {
      return [e.response, e];
    } else {
      throw e;
    }
  }
}
/**
 * Default authorize request handler
 */
async function defaultAuthorizeRequest(options: AuthorizeRequestOptions): Promise<void> {
  const { scopes, getAccessToken, request } = options;
  // Enable CAE true by default
  const getTokenOptions: GetTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
    enableCae: true,
  };

  const accessToken = await getAccessToken(scopes, getTokenOptions);

  if (accessToken) {
    options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
  }
}

/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function isChallengeResponse(response: PipelineResponse): boolean {
  return response.status === 401 && response.headers.has("WWW-Authenticate");
}

/**
 * Re-authorize the request for CAE challenge.
 * The response containing the challenge is `options.response`.
 * If this method returns true, the underlying request will be sent once again.
 */
async function authorizeRequestOnCaeChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions,
  caeClaims: string,
): Promise<boolean> {
  const { scopes } = onChallengeOptions;

  const accessToken = await onChallengeOptions.getAccessToken(scopes, {
    enableCae: true,
    claims: caeClaims,
  });
  if (!accessToken) {
    return false;
  }

  onChallengeOptions.request.headers.set(
    "Authorization",
    `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`,
  );
  return true;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions,
): PipelinePolicy {
  const { credential, scopes, challengeCallbacks } = options;
  const logger = options.logger || coreLogger;
  const callbacks = {
    authorizeRequest: challengeCallbacks?.authorizeRequest ?? defaultAuthorizeRequest,
    authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge,
  };

  // This function encapsulates the entire process of reliably retrieving the token
  // The options are left out of the public API until there's demand to configure this.
  // Remember to extend `BearerTokenAuthenticationPolicyOptions` with `TokenCyclerOptions`
  // in order to pass through the `options` object.
  const getAccessToken = credential
    ? createTokenCycler(credential /* , options */)
    : () => Promise.resolve(null);

  return {
    name: bearerTokenAuthenticationPolicyName,
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
          "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs.",
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
      let shouldSendRequest: boolean;
      [response, error] = await trySendRequest(request, next);

      if (isChallengeResponse(response)) {
        let claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
        // Handle CAE by default when receive CAE claim
        if (claims) {
          let parsedClaim: string;
          // Return the response immediately if claims is not a valid base64 encoded string
          try {
            parsedClaim = atob(claims);
          } catch (e) {
            logger.warning(
              `The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`,
            );
            return response;
          }
          shouldSendRequest = await authorizeRequestOnCaeChallenge(
            {
              scopes: Array.isArray(scopes) ? scopes : [scopes],
              response,
              request,
              getAccessToken,
              logger,
            },
            parsedClaim,
          );
          // Send updated request and handle response for RestError
          if (shouldSendRequest) {
            [response, error] = await trySendRequest(request, next);
          }
        } else if (callbacks.authorizeRequestOnChallenge) {
          // Handle custom challenges when client provides custom callback
          shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
            scopes: Array.isArray(scopes) ? scopes : [scopes],
            request,
            response,
            getAccessToken,
            logger,
          });

          // Send updated request and handle response for RestError
          if (shouldSendRequest) {
            [response, error] = await trySendRequest(request, next);
          }

          // If we get another CAE Claim, we will handle it by default and return whatever value we receive for this
          if (isChallengeResponse(response)) {
            claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate") as string);
            if (claims) {
              let parsedClaim: string;
              try {
                parsedClaim = atob(claims);
              } catch (e) {
                logger.warning(
                  `The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`,
                );
                return response;
              }

              shouldSendRequest = await authorizeRequestOnCaeChallenge(
                {
                  scopes: Array.isArray(scopes) ? scopes : [scopes],
                  response,
                  request,
                  getAccessToken,
                  logger,
                },
                parsedClaim,
              );
              // Send updated request and handle response for RestError
              if (shouldSendRequest) {
                [response, error] = await trySendRequest(request, next);
              }
            }
          }
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

/**
 *
 * Interface to represent a parsed challenge.
 *
 * @internal
 */
interface AuthChallenge {
  scheme: string;
  params: Record<string, string>;
}

/**
 * Converts: `Bearer a="b", c="d", Pop e="f", g="h"`.
 * Into: `[ { scheme: 'Bearer', params: { a: 'b', c: 'd' } }, { scheme: 'Pop', params: { e: 'f', g: 'h' } } ]`.
 *
 * @internal
 */
export function parseChallenges(challenges: string): AuthChallenge[] {
  // Challenge regex seperates the string to individual challenges with different schemes in the format `Scheme a="b", c=d`
  // The challenge regex captures parameteres with either quotes values or unquoted values
  const challengeRegex = /(\w+)\s+((?:\w+=(?:"[^"]*"|[^,]*),?\s*)+)/g;
  // Parameter regex captures the claims group removed from the scheme in the format `a="b"` and `c="d"`
  // CAE challenge always have quoted parameters. For more reference, https://learn.microsoft.com/entra/identity-platform/claims-challenge
  const paramRegex = /(\w+)="([^"]*)"/g;

  const parsedChallenges: AuthChallenge[] = [];
  let match;

  // Iterate over each challenge match
  while ((match = challengeRegex.exec(challenges)) !== null) {
    const scheme = match[1];
    const paramsString = match[2];
    const params: Record<string, string> = {};
    let paramMatch;

    // Iterate over each parameter match
    while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
      params[paramMatch[1]] = paramMatch[2];
    }

    parsedChallenges.push({ scheme, params });
  }
  return parsedChallenges;
}

/**
 * Parse a pipeline response and look for a CAE challenge with "Bearer" scheme
 * Return the value in the header without parsing the challenge
 * @internal
 */
function getCaeChallengeClaims(challenges: string | undefined): string | undefined {
  if (!challenges) {
    return;
  }
  // Find all challenges present in the header
  const parsedChallenges = parseChallenges(challenges);
  return parsedChallenges.find(
    (x) => x.scheme === "Bearer" && x.params.claims && x.params.error === "insufficient_claims",
  )?.params.claims;
}
