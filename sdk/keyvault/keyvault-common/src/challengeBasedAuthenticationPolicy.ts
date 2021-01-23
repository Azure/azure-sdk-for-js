// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */

import { AccessTokenRefresher, CAEProperties, parseCAEChallenges, TokenCredential, WebResourceLike } from "@azure/core-http";
import {
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "@azure/core-http";
import { AccessTokenCache, ExpiringAccessTokenCache } from "@azure/core-http";
import { BearerTokenAuthenticationPolicy } from "@azure/core-http";
import { createClientLogger } from "@azure/logger";

export const logger = createClientLogger("KeyVaultChallengeBasedAuthenticationPolicy");

/**
 * Representation of the Authentication Challenge
 */
export class KeyVaultAuthenticationChallenge {
  constructor(public authorization: string, public scope: string) { }

  /**
   * Checks that this KeyVaultAuthenticationChallenge is equal to another one given.
   * Only compares the scope.
   * This is exactly what C# is doing, as we can see here:
   * https://github.com/Azure/azure-sdk-for-net/blob/70e54b878ff1d01a45266fb3674a396b4ab9c1d2/sdk/keyvault/Azure.Security.KeyVault.Shared/src/ChallengeBasedAuthenticationPolicy.cs#L143-L147
   * @param other - The other KeyVaultAuthenticationChallenge
   */
  public equalTo(other: KeyVaultAuthenticationChallenge | undefined): boolean {
    return other
      ? this.scope.toLowerCase() === other.scope.toLowerCase() &&
      this.authorization.toLowerCase() === other.authorization.toLowerCase()
      : false;
  }
}

/**
 * Helps keep a copy of any previous authentication challenges,
 * so that we can compare on any further request.
 */
export class KeyVaultAuthenticationChallengeCache {
  public challenge?: KeyVaultAuthenticationChallenge;

  public setCachedChallenge(challenge: KeyVaultAuthenticationChallenge): void {
    this.challenge = challenge;
  }
}

/**
 * Creates a new KeyVaultChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the challenge token.
 */
export function keyVaultChallengeAuthenticationPolicy(
  credential: TokenCredential
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(
    credential,
    "https://vault.azure.net/.default"
  );
  const challengeCache = new KeyVaultAuthenticationChallengeCache();
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
export class KeyVaultChallengeBasedAuthenticationPolicy extends BearerTokenAuthenticationPolicy {

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
    protected tokenCache: AccessTokenCache,
    protected tokenRefresher: AccessTokenRefresher,
    protected challengeCache: KeyVaultAuthenticationChallengeCache
  ) {
    super(nextPolicy, options, tokenCache, tokenRefresher);
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
  async onBeforeRequest(webResource: WebResourceLike): Promise<void> {
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
  async onChallenge(webResource: WebResourceLike, challenges: string): Promise<boolean> {
    const parsedChallenges = parseCAEChallenges(challenges);
    if (parsedChallenges.length !== 1) {
      logger.info("No challenges received. Bypassing the challenge authentication policy.");
      return false;
    }
    const parsedChallenge: Record<CAEProperties.KeyVault, string> = parsedChallenges[0];

    const authorization = parsedChallenge.authorization;
    const resource = parsedChallenge.resource || parsedChallenge.scope;
    const scope = resource + "/.default";
    if (!(authorization && resource)) {
      logger.info("The Key Vault challenge received is not valid. Bypassing the challenge authentication policy.");
      return false;
    }

    const kvChallenge = new KeyVaultAuthenticationChallenge(authorization, scope);

    // Either if there's no cached challenge at this point (could have happen in parallel),
    // or if the cached challenge has a different scope,
    // we store the just received challenge and reset the cached token, to force a re-authentication.
    if (!this.challengeCache.challenge?.equalTo(kvChallenge)) {
      logger.info("The challenge received invalidated previous challenges. Ensuring a new token is requested.");
      this.challengeCache.setCachedChallenge(kvChallenge);
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
