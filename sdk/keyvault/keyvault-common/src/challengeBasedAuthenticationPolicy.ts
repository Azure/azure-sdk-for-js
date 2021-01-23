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

export const logger = createClientLogger("ChallengeBasedAuthenticationPolicy");

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
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
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
      return new ChallengeBasedAuthenticationPolicy(
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
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class ChallengeBasedAuthenticationPolicy extends BearerTokenAuthenticationPolicy {
  private cachedBody: string | undefined;

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

  // For Key Vault, we try a first request without a body to trigger the challenge based authentication flow.
  async onBeforeRequest(webResource: WebResourceLike): Promise<void> {
    console.log("onBeforeRequest headers:\n", webResource.headers.headerNames().map(x => `${x}=${webResource.headers.get(x)}`).join("\n"));
    // TODO: This header exists: x-ms-client-request I think we can use it.
    if (!this.tokenCache.getCachedToken()) {
      console.log("=== NO CACHED TOKEN ON BEFORE REQUEST ===");
      this.cachedBody = webResource.body;
      webResource.body = "";
    }
  }

  /**
   * Authorizes request according to an authentication challenge.
   * This base implementation only handles CAE claims directives,
   * which means that the WWW-Authenticate header is expected to have
   * only one challenge that must include a "claims" property.
   * Clients expecting other challenges must override.
   */
  async onChallenge(webResource: WebResourceLike, challenges: string): Promise<boolean> {
    const parsedChallenges = parseCAEChallenges(challenges);
    console.log({ parsedChallenges });
    if (parsedChallenges.length !== 1) {
      logger.info("No challenges received. Bypassing the challenge authentication policy.");
      return false;
    }
    const parsedChallenge: Record<CAEProperties.KeyVault, string> = parsedChallenges[0];
    console.log({ parsedChallenge });
    const authorization = parsedChallenge.authorization;
    const resource = parsedChallenge.resource || parsedChallenge.scope;
    console.log({ authorization, resource });
    if (!(authorization && resource)) {
      logger.info("The Key Vault challenge received is not valid. Bypassing the challenge authentication policy.");
      return false;
    }

    const kvChallenge = new KeyVaultAuthenticationChallenge(authorization, resource + "/.default");

    // Either if there's no cached challenge at this point (could have happen in parallel),
    // or if the cached challenge has a different scope,
    // we store the just received challenge and reset the cached token, to force a re-authentication.
    if (!this.challengeCache.challenge?.equalTo(kvChallenge)) {
      this.challengeCache.setCachedChallenge(kvChallenge);
      this.tokenCache.setCachedToken(undefined);
    }

    this.tokenRefresher.setScopes(resource);
    this.loadToken(webResource);
    webResource.body = this.cachedBody;
    return true;
  }
}
