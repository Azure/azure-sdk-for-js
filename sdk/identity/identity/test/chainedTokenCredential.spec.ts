// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { assertRejects } from "./authTestUtils";
import {
  ChainedTokenCredential,
  TokenCredential,
  AccessToken,
  AggregateAuthenticationError,
  CredentialUnavailable
} from "../src";

function mockCredential(returnPromise: Promise<AccessToken | null>): TokenCredential {
  return {
    getToken: () => returnPromise
  };
}

describe("ChainedTokenCredential", function() {
  it("returns the first token received from a credential", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new CredentialUnavailable("unavailable."))),
      mockCredential(Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0 })),
      mockCredential(Promise.resolve({ token: "secondToken", expiresOnTimestamp: 0 }))
    );
    const accessToken = await chainedTokenCredential.getToken("scope");
    assert.notStrictEqual(accessToken, null);
    assert.strictEqual(accessToken && accessToken.token, "firstToken");
  });

  it("returns an AggregateAuthenticationError when no token is returned and one credential returned an error", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new CredentialUnavailable("unavailable."))),
      mockCredential(Promise.reject(new CredentialUnavailable("unavailable.")))
    );

    await assertRejects(
      chainedTokenCredential.getToken("scope"),
      (err: AggregateAuthenticationError) => err.errors.length === 2
    );
  });
});
