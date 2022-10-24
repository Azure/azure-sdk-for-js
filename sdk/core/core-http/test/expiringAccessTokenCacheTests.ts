// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "../src";
import { ExpiringAccessTokenCache } from "../src/credentials/accessTokenCache";
import { assert } from "chai";

function mockToken(expirationDeltaMs: number): AccessToken {
  return {
    token: "token",
    expiresOnTimestamp: Date.now() + expirationDeltaMs,
  };
}

describe("ExpiringAccessTokenCache", function () {
  it("returns a cached token within the expiration window", function () {
    const tokenCache = new ExpiringAccessTokenCache(2000);
    const accessToken = mockToken(5000);
    tokenCache.setCachedToken(accessToken);

    const cachedToken = tokenCache.getCachedToken();
    assert.isDefined(cachedToken, "A cached token was not returned!");
  });

  it("returns undefined when refresh buffer is passed", function () {
    const tokenCache = new ExpiringAccessTokenCache(5000);
    const accessToken = mockToken(-5000);
    tokenCache.setCachedToken(accessToken);

    const cachedToken = tokenCache.getCachedToken();
    assert.isUndefined(cachedToken, "A cached token was returned!");
  });

  it("clears the cached token when undefined is passed to setCachedToken", function () {
    const tokenCache = new ExpiringAccessTokenCache(2000);
    const accessToken = mockToken(5000);
    tokenCache.setCachedToken(accessToken);
    tokenCache.setCachedToken(undefined);

    const cachedToken = tokenCache.getCachedToken();
    assert.isUndefined(cachedToken, "A cached token was returned!");
  });
});
