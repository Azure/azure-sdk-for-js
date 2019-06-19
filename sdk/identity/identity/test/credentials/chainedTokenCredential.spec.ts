// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import {
  ChainedTokenCredential,
  TokenCredential,
  AccessToken,
  AggregateAuthenticationError
} from "../../src";

function mockCredential(returnPromise: Promise<AccessToken | null>): TokenCredential {
  return {
    getToken: () => returnPromise
  };
}

describe("ChainedTokenCredential", function () {
  it("returns the first token received from a credential", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.resolve(null)),
      mockCredential(Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0 })),
      mockCredential(Promise.resolve({ token: "secondToken", expiresOnTimestamp: 0 }))
    );
    const accessToken = await chainedTokenCredential.getToken("scope");
    assert.notStrictEqual(accessToken, null);
    assert.strictEqual(accessToken && accessToken.token, "firstToken");
  });

  it("returns an AggregateAuthenticationError when no token is returned and one credential returned an error", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new Error("Boom."))),
      mockCredential(Promise.resolve(null)),
      mockCredential(Promise.reject(new Error("Boom.")))
    );

    await (assert as any).rejects(
      () => chainedTokenCredential.getToken("scope"),
      (err: AggregateAuthenticationError) => err.errors.length === 2
    );
  });
});
