// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AuthorizeRequestOnChallengeOptions,
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  PipelineRequest,
  RequestBodyType
} from "@azure/core-rest-pipeline";
import { GetTokenOptions } from "@azure/core-auth";

const validParsedWWWAuthenticateProperties = ["authorization", "resource", "scope"];

/**
 * @internal
 *
 * Holds the known WWWAuthenticate keys and their values as a result of
 * parsing a WWW-Authenticate header.
 */
type ParsedWWWAuthenticate = {
  [Key in "authorization" | "resource" | "scope"]?: string;
};

/**
 * @internal
 * Holds the state of Challenge Auth.
 * When making the first request we force Key Vault to begin a challenge
 * by clearing out the request body and storing it locally.
 *
 * Later on, the authorizeRequestOnChallenge callback will process the
 * challenge and, if ready to resend the original request, reset the body
 * so that it may be sent again.
 *
 * Once a client has succeeded once, we can start skipping CAE.
 */
type ChallengeState =
  | {
      status: "none";
    }
  | {
      status: "started";
      originalBody?: RequestBodyType;
    }
  | {
      status: "complete";
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
  const pairDelimiter = /,? +/;
  return wwwAuthenticate.split(pairDelimiter).reduce<ParsedWWWAuthenticate>((kvPairs, p) => {
    if (p.match(/\w="/)) {
      // 'sampleKey="sample_value"' -> [sampleKey, "sample_value"] -> { sampleKey: sample_value }
      const [key, value] = p.split("=");
      if (validParsedWWWAuthenticateProperties.includes(key)) {
        // The values will be wrapped in quotes, which need to be stripped out.
        return { ...kvPairs, [key]: value.slice(1, -1) };
      }
    }
    return kvPairs;
  }, {});
}

/**
 * @internal
 *
 * Creates challenge callback handlers to manage CAE lifecycle in Azure Key Vault.
 *
 * Key Vault supports other authentication schemes, but we ensure challenge authentication
 * is used by first sending a copy of the request, without authorization or content.
 *
 * when the challenge is received, it will be authenticated and used to send the original
 * request with authorization.
 *
 * Following the first request of a client, follow-up requests will get the cached token
 * if possible.
 */
export function createChallengeCallbacks(): ChallengeCallbacks {
  let challengeState: ChallengeState = { status: "none" };

  function requestToOptions(request: PipelineRequest): GetTokenOptions {
    return {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout
      },
      tracingOptions: request.tracingOptions
    };
  }

  async function authorizeRequest(options: AuthorizeRequestOptions) {
    const { scopes, request } = options;
    const requestOptions: GetTokenOptions = requestToOptions(request);

    switch (challengeState.status) {
      case "none":
        challengeState = {
          status: "started",
          originalBody: request.body
        };
        request.body = null;
        break;
      case "started":
        break; // Retry, we should not overwrite the original body
      case "complete": {
        const token = await options.getAccessToken(scopes, requestOptions);
        if (token) {
          request.headers.set("authorization", `Bearer ${token.token}`);
        }
        break;
      }
    }
    return Promise.resolve();
  }

  async function authorizeRequestOnChallenge(
    options: AuthorizeRequestOnChallengeOptions
  ): Promise<boolean> {
    const { scopes, request, response } = options;

    if (request.body === null && challengeState.status === "started") {
      // Reset the original body before doing anything else.
      // Note: If successful status will be "complete", otherwise "none" will
      // restart the process.
      request.body = challengeState.originalBody;
    }

    const getTokenOptions = requestToOptions(request);

    const challenge = response.headers.get("WWW-Authenticate");
    if (!challenge) {
      throw new Error("Missing challenge.");
    }
    const parsedChallenge: ParsedWWWAuthenticate = parseWWWAuthenticate(challenge) || [];

    const accessToken = await options.getAccessToken(
      parsedChallenge.scope ? [parsedChallenge.scope] : scopes,
      getTokenOptions
    );

    if (!accessToken) {
      return false;
    }

    options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);

    challengeState = {
      status: "complete"
    };

    return true;
  }

  return {
    authorizeRequest,
    authorizeRequestOnChallenge
  };
}
