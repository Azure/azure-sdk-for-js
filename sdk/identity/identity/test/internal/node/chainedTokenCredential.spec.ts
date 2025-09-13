// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/identity";
import { ChainedTokenCredential } from "@azure/identity";
import { logger as chainedTokenCredentialLogger } from "$internal/credentials/chainedTokenCredential.js";
import { describe, it, assert, expect, vi, afterEach } from "vitest";

class TestMockCredential implements TokenCredential {
  constructor(public returnPromise: Promise<AccessToken | null>) {}

  getToken(): Promise<AccessToken | null> {
    return this.returnPromise;
  }
}

describe("ChainedTokenCredential", function () {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("Logs the expected successful message", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      new TestMockCredential(
        Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0, tokenType: "Bearer" }),
      ),
    );

    const infoSpy = vi.spyOn(chainedTokenCredentialLogger.parent, "info");
    const getTokenInfoSpy = vi.spyOn(chainedTokenCredentialLogger.getToken, "info");

    const accessToken = await chainedTokenCredential.getToken("<scope>");
    assert.notStrictEqual(accessToken, null);

    expect(infoSpy).toHaveBeenCalled();
    assert.equal(
      infoSpy.mock.calls[0].join(" "),
      "ChainedTokenCredential => getToken() => Result for TestMockCredential: SUCCESS. Scopes: <scope>.",
    );
    expect(getTokenInfoSpy).toHaveBeenCalled();
    assert.equal(
      getTokenInfoSpy.mock.calls[0][0],
      "Result for TestMockCredential: SUCCESS. Scopes: <scope>.",
    );
  });

  it("Doesn't throw with a clossure credential", async () => {
    function mockCredential(returnPromise: Promise<AccessToken | null>): TokenCredential {
      return {
        getToken: () => returnPromise,
      };
    }

    const chainedTokenCredential = new ChainedTokenCredential(
      mockCredential(
        Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0, tokenType: "Bearer" }),
      ),
    );

    const infoSpy = vi.spyOn(chainedTokenCredentialLogger.parent, "info");
    const getTokenInfoSpy = vi.spyOn(chainedTokenCredentialLogger.getToken, "info");

    const accessToken = await chainedTokenCredential.getToken("<scope>");
    assert.notStrictEqual(accessToken, null);

    expect(infoSpy).toHaveBeenCalled();
    assert.equal(
      infoSpy.mock.calls[0].join(" "),
      "ChainedTokenCredential => getToken() => Result for Object: SUCCESS. Scopes: <scope>.",
    );
    expect(getTokenInfoSpy).toHaveBeenCalled();
    assert.equal(getTokenInfoSpy.mock.calls[0][0], "Result for Object: SUCCESS. Scopes: <scope>.");
  });
});
