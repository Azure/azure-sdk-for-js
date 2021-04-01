// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest, PipelinePolicy } from "../";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";

/**
 * Options sent to the challenge callbacks
 */
export interface ChallengeCallbackOptions {
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string | string[];
  /**
   * Additional claims to be included in the token.
   * For more information on format and content: [the claims parameter specification](href="https://openid.net/specs/openid-connect-core-1_0-final.html#ClaimsParameter).
   */
  claims?: string;
  /**
   * Token cached from a previous authentication.
   */
  cachedToken?: AccessToken;
  /**
   * Credential to use to retrieve a new token.
   */
  credential: TokenCredential;
  /**
   * Request that the policy is trying to fulfill.
   */
  request: PipelineRequest;
  /**
   * Function that allows easily assigning a token to the request.
   */
  setAuthorizationHeader: (accessToken: AccessToken) => void;
}

/**
 * Options to configure the bearerTokenAuthenticationPolicy
 */
export interface BearerTokenAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the bearer token.
   */
  credential: TokenCredential;
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string | string[];
  /**
   * Allows for the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
   * If provided, it must contain at least the `authenticateRequestOnChallenge` method.
   * If provided, after a request is sent, if it has a challenge, it can be processed to re-send the original request with the relevant challenge information.
   */
  challengeCallbacks?: {
    /**
     * Allows for the authentication of the main request of this policy before it's sent.
     * The `setAuthorizationHeader` parameter received through the `ChallengeCallbackOptions`
     * allows developers to easily assign a token to the ongoing request.
     */
    authenticateRequest?(options: ChallengeCallbackOptions): Promise<void>;
    /**
     * Allows to handle authentication challenges and to re-authenticate the request.
     * The `setAuthorizationHeader` parameter received through the `ChallengeCallbackOptions`
     * allows developers to easily assign a token to the ongoing request.
     * If this method returns true, the underlying request will be sent once again.
     */
    authenticateRequestOnChallenge(
      challenge: string,
      options: ChallengeCallbackOptions
    ): Promise<boolean>;
  };
}

/**
 * Retrieves a token from a token cache or a credential.
 */
export async function retrieveToken(
  options: ChallengeCallbackOptions
): Promise<AccessToken | undefined> {
  const { scopes, claims, cachedToken, credential, request } = options;
  let accessToken = cachedToken;

  const getTokenOptions: GetTokenOptions = {
    claims,
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions
  };

  if (!cachedToken) {
    accessToken = (await credential.getToken(scopes, getTokenOptions)) || undefined;
  }
  return accessToken;
}

/**
 * Default authenticate request
 */
export async function defaultAuthenticateRequest(options: ChallengeCallbackOptions): Promise<void> {
  const accessToken = await retrieveToken(options);
  if (!accessToken) {
    return;
  }
  options.setAuthorizationHeader(accessToken);
}

/**
 * Default authenticate request on challenge
 */
export async function defaultAuthenticateRequestOnChallenge(
  challenge: string,
  options: ChallengeCallbackOptions
): Promise<boolean> {
  const { scopes, setAuthorizationHeader } = options;

  if (!challenge) {
    return false;
  }
  const { scope, claims } = parseWWWAuthenticate(challenge);

  const accessToken = await retrieveToken({
    ...options,
    scopes: scope || scopes,
    claims
  });

  if (!accessToken) {
    return false;
  }

  setAuthorizationHeader(accessToken);
  return true;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes, challengeCallbacks } = options;
  const callbacks = {
    authenticateRequest: defaultAuthenticateRequest,
    authenticateRequestOnChallenge: defaultAuthenticateRequestOnChallenge,
    // If any of the properties is set to undefined, it will replace the default values.
    ...challengeCallbacks
  };

  let cachedToken: AccessToken | undefined;

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
      function setAuthorizationHeader(accessToken: AccessToken) {
        cachedToken = accessToken;
        request.headers.set("Authorization", `Bearer ${cachedToken.token}`);
      }

      if (callbacks?.authenticateRequest) {
        await callbacks.authenticateRequest({
          scopes,
          request,
          credential,
          cachedToken,
          setAuthorizationHeader
        });
      }

      let response: PipelineResponse;
      try {
        response = await next(request);
      } catch (err) {
        response = err.response;
      }
      const challenge = getChallenge(response);

      if (challenge && callbacks?.authenticateRequestOnChallenge) {
        // processes challenge
        const sendRequest = await callbacks.authenticateRequestOnChallenge(challenge, {
          scopes,
          request,
          credential,
          cachedToken,
          setAuthorizationHeader
        });

        if (sendRequest) {
          return next(request);
        }
      }

      //@ts-ignore assigned in try block
      return response;
    }
  };
}

type ValidParsedWWWAuthenticateProperties =
  // "authorization_uri" was used in the track 1 version of KeyVault.
  // This is not a relevant property anymore, since the service is consistently answering with "authorization".
  // | "authorization_uri"
  | "authorization"
  | "claims"
  // Even though the service is moving to "scope", both "resource" and "scope" should be supported.
  | "resource"
  | "scope"
  | "service";

type ParsedWWWAuthenticate = {
  [Key in ValidParsedWWWAuthenticateProperties]?: string;
};

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `,`, `, ` or ` `.
  const parts = wwwAuthenticate.split(/, *| +/);
  // Then we only keep the strings with an equal sign after a word and before a quote.
  // also splitting these sections by their equal sign
  const keyValues = parts.reduce<string[][]>(
    (acc, str) => (str.match(/\w="/) ? [...acc, str.split("=")] : acc),
    []
  );
  // Then we transform these key-value pairs back into an object.
  const parsed = keyValues.reduce<ParsedWWWAuthenticate>(
    (result, [key, value]: string[]) => ({
      ...result,
      [key]: value.slice(1, -1)
    }),
    {}
  );
  return parsed;
}
