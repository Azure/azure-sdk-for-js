// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "../../../core-auth/types/latest/core-auth";
import { PipelinePolicy } from "../pipeline";
import {
  AuthorizeRequestOnChallengeOptions,
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  defaultAuthorizeRequest
} from "./bearerTokenAuthenticationPolicy";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const ARMChallengeAuthenticationPolicyName = "armChallengeAuthenticationPolicy";

/**
 * Options to configure the armChallengeAuthenticationPolicy
 */
export interface ARMChallengeAuthenticationPolicyOptions
  extends BearerTokenAuthenticationPolicyOptions {}

/**
 * Converts a uint8Array to a string.
 * @internal
 */
export function uint8ArrayToString(ab: Uint8Array): string {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(ab);
}

/**
 * Encodes a string in base64 format.
 * @param value - The string to encode
 * @internal
 */
export function encodeString(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 * @internal
 */
export function decodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

/**
 * Converts: `Bearer a="b", c="d", Bearer d="e", f="g"`.
 * Into: `[ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]`.
 *
 * Important:
 * Do not use this in production, as values might contain the strings we use to split things up.
 *
 * @internal
 */
function parseCAEChallenge(challenges: string): any[] {
  return challenges
    .split("Bearer ")
    .filter((x) => x)
    .map((challenge) =>
      `${challenge.trim()}, `
        .split('", ')
        .filter((x) => x)
        .map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );
}

/**
 * CAE Challenge structure
 */
export interface CAEChallenge {
  scope: string;
  claims: string;
}

/**
 * A policy that extends the `bearerTokenAuthenticationPolicy` to support CAE challenges:
 * [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation).
 */
export function armChallengeAuthenticationPolicy(
  options: ARMChallengeAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes, challengeCallbacks } = options;
  const callbacks = {
    authorizeRequest: challengeCallbacks?.authorizeRequest ?? defaultAuthorizeRequest,
    authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge,
    // keep all other properties
    ...challengeCallbacks
  };

  if (!callbacks.authorizeRequestOnChallenge) {
    let cachedChallenge: string | undefined;

    callbacks.authorizeRequestOnChallenge = async (
      onChallengeOptions: AuthorizeRequestOnChallengeOptions
    ): Promise<boolean> => {
      const { scopes: onChallengeScopes } = onChallengeOptions;

      const challenge = onChallengeOptions.response.headers.get("WWW-Authenticate");
      if (!challenge) {
        throw new Error("Missing challenge");
      }
      const challenges: CAEChallenge[] = parseCAEChallenge(challenge) || [];

      const parsedChallenge = challenges.find((x) => x.claims);
      if (!parsedChallenge) {
        throw new Error("Missing claims");
      }
      if (cachedChallenge !== challenge) {
        cachedChallenge = challenge;
      }

      const accessToken = await onChallengeOptions.getAccessToken(
        parsedChallenge.scope ? [parsedChallenge.scope] : onChallengeScopes,
        {
          ...onChallengeOptions,
          claims: uint8ArrayToString(Buffer.from(parsedChallenge.claims, "base64"))
        } as GetTokenOptions
      );

      if (!accessToken) {
        return false;
      }

      onChallengeOptions.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
      return true;
    };
  }

  return {
    ...bearerTokenAuthenticationPolicy({ credential, scopes, challengeCallbacks: callbacks }),
    name: ARMChallengeAuthenticationPolicyName
  };
}
