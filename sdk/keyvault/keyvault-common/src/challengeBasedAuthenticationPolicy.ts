// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */

import {
  AccessTokenRefresher,
  BearerTokenChallengeAuthenticationPolicy,
  ChallengeCache,
  parseCAEChallenges,
  TokenCredential,
  WebResourceLike
} from "@azure/core-http";
import { RequestPolicy, RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http";
import { AccessTokenCache, ExpiringAccessTokenCache } from "@azure/core-http";
import { createClientLogger } from "@azure/logger";

export const logger = createClientLogger("KeyVaultChallengeBasedAuthenticationPolicy");

/**
 * Key Vault Challenge structure
 */
export interface KeyVaultChallenge {
  authorization: string,
  resource?: string,
  scope?: string
};

/**
 * Creates a new KeyVaultChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the challenge token.
 */
export function keyVaultChallengeAuthenticationPolicy(
  credential: TokenCredential
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(credential, "https://vault.azure.net/.default");
  const challengeCache = new ChallengeCache<KeyVaultChallenge>();
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new KeyVaultChallengeBasedAuthenticationPolicy(
        nextPolicy,
        options,
        tokenCache,
        tokenRefresher,
        challengeCache
      );
    }
  };
}

/**
 * Provides support for Key Vault's challenge authentication.
 *
 * This process gets triggered when the user triggers any request from any of the Key Vault clients.
 * The initial request gets overwritten by an empty one, which causes the service to begin the challenge authentication process.
 * If a challenge is indeed received, we use it to retrieve the token, then finally we send the originally intended request.
 *
 */
export class KeyVaultChallengeBasedAuthenticationPolicy extends BearerTokenChallengeAuthenticationPolicy<KeyVaultChallenge> {
  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param tokenCache - The cache for the most recent AccessToken returned from the TokenCredential.
   * @param tokenRefresher - The AccessToken refresher.
   * @param challengeCache - The Challenge cache.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    tokenCache: AccessTokenCache,
    tokenRefresher: AccessTokenRefresher,
    challengeCache: ChallengeCache<KeyVaultChallenge>
  ) {
    super(nextPolicy, options, tokenCache, tokenRefresher, challengeCache);
  }

  /**
   * To match requests with their bodies, we use the x-ms-client-request-id header
   * which we ensure is populated by default before the requests are sent.
   */
  private getUniqueIdentifier(webResource: WebResourceLike): string {
    return webResource.headers.get("x-ms-client-request-id")!;
  }

  private cachedBodies: Record<string, string> = {};

  /**
   * If there's no cached token, we save a copy of the request's body
   * based on a unique identifier we can find on the request.
   * @param webResource The network request.
   */
  async prepareRequest(webResource: WebResourceLike): Promise<void> {
    if (this.tokenCache.getCachedToken()) {
      logger.info("Cached token found.");
      await this.loadToken(webResource);
    } else {
      logger.info("Cached token not found. Setting up an initial empty request.");
      const bodyId = this.getUniqueIdentifier(webResource);
      this.cachedBodies[bodyId] = webResource.body;
      webResource.body = "";
    }
  }

  /**
   * If a CAE challenge was found, we parse the challenge, then we compare it with the challenge cache
   * (which helps in case we had concurrent requests), then we proceed to load the token based on the challenge received,
   * and finally we return true, so that the BearerTokenAuthenticationPolicy can re-send the request.
   */
  async processChallenge(webResource: WebResourceLike, challenge?: string): Promise<boolean> {
    if (!challenge) {
      return false;
    }
    const [parsedChallenge]: KeyVaultChallenge[] = parseCAEChallenges(challenge) || [];
    if (!parsedChallenge) {
      logger.info("No challenges received. Bypassing the challenge authentication policy.");
      return false;
    }

    const authorization = parsedChallenge.authorization;
    if (!authorization) {
      logger.info(
        "The Key Vault challenge received didn't have an authorization property. Bypassing the challenge authentication policy."
      );
      return false;
    }

    let scope = parsedChallenge.resource || parsedChallenge.scope;
    if (!scope) {
      logger.info("The challenge received didn't have a resource nor a scope. Bypassing the challenge authentication policy.");
      return false;
    }

    const defaultPath = "/.default";
    if (scope?.indexOf(defaultPath) !== scope.length - defaultPath.length) {
      scope += defaultPath;
    }

    // Either if there's no cached challenge at this point (could have happen in parallel),
    // or if the cached challenge has a different scope,
    // we store the just received challenge and reset the cached token, to force a re-authentication.
    if (!this.challengeCache.equalTo(parsedChallenge)) {
      logger.info(
        "The challenge received invalidated previous challenges. Ensuring a new token is requested."
      );
      this.challengeCache.setCachedChallenge(parsedChallenge);
      this.tokenCache.setCachedToken(undefined);
    }

    logger.info("Loading the token.");
    this.tokenRefresher.setScopes(scope);
    await this.loadToken(webResource);

    logger.info("Sending the original request.");
    const bodyId = this.getUniqueIdentifier(webResource);
    webResource.body = this.cachedBodies[bodyId];
    delete this.cachedBodies[bodyId];
    return true;
  }
}
