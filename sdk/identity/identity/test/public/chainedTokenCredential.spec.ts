// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  ChainedTokenCredential,
  TokenCredential,
  AccessToken,
  AggregateAuthenticationError,
  CredentialUnavailableError,
  AuthenticationRequiredError
} from "../../src";
import { getError } from "../authTestUtils";

function mockCredential(returnPromise: Promise<AccessToken | null>): TokenCredential {
  return {
    getToken: () => returnPromise
  };
}

describe("ChainedTokenCredential", function() {
  it("returns the first token received from a credential", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new CredentialUnavailableError("unavailable."))),
      mockCredential(
        Promise.reject(
          new AuthenticationRequiredError(
            ["https://vault.azure.net/.default"],
            {},
            "authentication-required."
          )
        )
      ),
      mockCredential(Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0 })),
      mockCredential(Promise.resolve({ token: "secondToken", expiresOnTimestamp: 0 }))
    );
    const accessToken = await chainedTokenCredential.getToken("scope");
    assert.notStrictEqual(accessToken, null);
    assert.strictEqual(accessToken && accessToken.token, "firstToken");
  });

  it("sets the successful credential on the selectedCredential property", async () => {
    class ExpectedCredential implements TokenCredential {
      async getToken() {
        return { token: "firstToken", expiresOnTimestamp: 0 };
      }
    }
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new CredentialUnavailableError("unavailable."))),
      new ExpectedCredential(),
      mockCredential(Promise.resolve({ token: "secondToken", expiresOnTimestamp: 0 }))
    );
    const accessToken = await chainedTokenCredential.getToken("scope");
    assert.strictEqual(accessToken && accessToken.token, "firstToken");
    assert.strictEqual(
      chainedTokenCredential.selectedCredential!.constructor.name,
      "ExpectedCredential"
    );
  });

  it("returns an AggregateAuthenticationError when no token is returned and one credential returned an error", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(Promise.reject(new CredentialUnavailableError("unavailable."))),
      mockCredential(Promise.reject(new CredentialUnavailableError("unavailable.")))
    );

    const error = await getError<AggregateAuthenticationError>(
      chainedTokenCredential.getToken("scope")
    );
    assert.equal(error.errors.length, 2);
  });
});
