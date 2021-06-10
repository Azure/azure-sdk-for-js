import {
  AuthorizeRequestOnChallengeOptions,
  AuthorizeRequestOptions,
  ChallengeCallbacks,
  RequestBodyType
} from "@azure/core-rest-pipeline";
import { GetTokenOptions } from "@azure/core-auth";

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
 * Later on the authorizeRequestOnChallenge callback will process the
 * challenge and if ready to resend the original request reset the body
 * so that it may be sent again.
 *
 * Once a client has succeeded once, we can start skipping CAE.
 */
type ChallengeState =
  | {
      firstRequestState: "none";
    }
  | { firstRequestState: "started"; originalBody?: RequestBodyType }
  | { firstRequestState: "complete" };

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `, ` or ` `.
  const parts = wwwAuthenticate.split(/,* +/);
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

/**
 * @internal
 *
 * A class that manages continuous access evaluation challenges for Key Vault.
 *
 * Key Vault supports non-CAE requests but discourages them. This class applies
 * best practices by forcing the challenge whenever a client makes a request for
 * first time by clearing the request body.
 *
 * At some point downstream, the challenge will be processed and the original request
 * body will be restored to be sent again.
 *
 * Following the first request of a client, follow-up requests will get the cached token
 * if possible.
 */
export class ChallengeCallbackHandler implements ChallengeCallbacks {
  private challengeState: ChallengeState;
  constructor() {
    this.challengeState = { firstRequestState: "none" };
  }

  async authorizeRequest(options: AuthorizeRequestOptions) {
    const { scopes, request } = options;
    const requestOptions: GetTokenOptions = {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout
      },
      tracingOptions: request.tracingOptions
    };

    if (this.challengeState.firstRequestState === "complete") {
      const token = await options.getAccessToken(scopes, requestOptions);
      if (token) {
        options.request.headers.set("authorization", `Bearer ${token.token}`);
      }
    } else {
      this.challengeState = {
        firstRequestState: "started",
        originalBody: request.body
      };
    }
    return Promise.resolve();
  }

  async authorizeRequestOnChallenge(options: AuthorizeRequestOnChallengeOptions): Promise<boolean> {
    const { scopes, request } = options;

    const getTokenOptions: GetTokenOptions = {
      abortSignal: request.abortSignal,
      requestOptions: {
        timeout: request.timeout
      },
      tracingOptions: request.tracingOptions
    };
    const challenge = options.response.headers.get("WWW-Authenticate");
    if (!challenge) {
      throw new Error("Missing challenge");
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
    options.request.body =
      this.challengeState.firstRequestState === "started" && this.challengeState.originalBody;

    this.challengeState = {
      firstRequestState: "complete"
    };

    return true;
  }
}
