// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { AzureLogger } from "@azure/logger";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { createTokenCycler } from "../util/tokenCycler.js";
import { logger as coreLogger } from "../log.js";
import { isRestError } from "../restError.js";

/**
 * Parameters parsed out of the WWW-Authenticate header value by the parseWWWAuthenticate function.
 */
interface WWWAuthenticate {
  /**
   * The authorization_url parameter, if present.
   */
  authorization_url?: string;

  /**
   * The claims parameter, if present.
   */
  claims?: string;

  /**
   * The error parameter, if present.
   */
  error?: string;
}

const validWWWAuthenticateProperties: readonly (keyof WWWAuthenticate)[] = [
  "authorization_url",
  "claims",
  "error",
] as const;

/**
 * Parses an WWW-Authenticate response header.
 * This transforms a string value like:
 * `Bearer authorization="https://some.url/tenantId", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "https://some.url/tenantId", resource: "https://some.url" }`
 * @param headerValue - String value in the WWW-Authenticate header
 */
function parseWWWAuthenticateHeader(headerValue: string): WWWAuthenticate {
  const pairDelimiter = /,? +/;
  const parsed = headerValue.split(pairDelimiter).reduce<WWWAuthenticate>((kvPairs, p) => {
    if (p.match(/\w="/)) {
      // 'sampleKey="sample_value"' -> [sampleKey, "sample_value"] -> { sampleKey: sample_value }
      const [key, ...value] = p.split("=");
      if (validWWWAuthenticateProperties.includes(key as keyof WWWAuthenticate)) {
        // The values will be wrapped in quotes, which need to be stripped out.
        return { ...kvPairs, [key]: value.join("=").slice(1, -1) };
      }
    }
    return kvPairs;
  }, {});
  return parsed;
}

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
  if (response.status === 401 && response.headers.get("WWW-Authenticate")) {
    return true;
  }
  return false;
}

/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
async function authorizeRequestOnCaeChallenge(
  onChallengeOptions: AuthorizeRequestOnChallengeOptions,
): Promise<boolean> {
  const { scopes, response } = onChallengeOptions;
  const logger = onChallengeOptions.logger || coreLogger;

  const challenge = response.headers.get("WWW-Authenticate");
  // Parsing the challenge
  const { claims: base64EncodedClaims, error }: WWWAuthenticate = parseWWWAuthenticateHeader(
    challenge as string,
  );

  if (base64EncodedClaims === undefined) {
    logger.info(
      `The WWW-Authenticate header was missing the necessary "claims". Failed to perform the Continuous Access Evaluation authentication flow.`,
    );
    return false;
  }

  if (error !== "insufficient_claims") {
    logger.info(
      `The WWW-Authenticate header ran into "insufficient_claims" error. Failed to perform the Continuous Access Evaluation authentication flow.`,
    );
    return false;
  }

  const claims = atob(base64EncodedClaims);

  const accessToken = await onChallengeOptions.getAccessToken(scopes, {
    enableCae: true,
    claims,
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
    // keep all other properties
    ...challengeCallbacks,
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
      try {
        response = await next(request);
      } catch (err: any) {
        if (isRestError(error)) {
          response = err.response;
          error = err;
        } else {
          throw err;
        }
      }

      // Handle challenge using client provided callback when a challenge is returned
      if (isChallengeResponse(response) && callbacks.authorizeRequestOnChallenge) {
        const shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          request,
          response,
          getAccessToken,
          logger,
        });

        // Send updated request and handle response for RestError
        try {
          if (shouldSendRequest) {
            error = undefined;
            response = await next(request);
          }
        } catch (err: any) {
          if (isRestError(error)) {
            response = err.response;
            error = err;
          } else {
            throw err;
          }
        }
      }

      // Handle CAE challenge by default when a challenge is returned regardless of whether the callback is provided
      if (isChallengeResponse(response)) {
        const shouldSendRequestAfterCaeChallenge = await authorizeRequestOnCaeChallenge({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          response,
          request,
          getAccessToken,
          logger,
        });

        if (shouldSendRequestAfterCaeChallenge) {
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
