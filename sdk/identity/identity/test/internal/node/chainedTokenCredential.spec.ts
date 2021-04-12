// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { ChainedTokenCredential, TokenCredential, AccessToken } from "../../../src";
import Sinon from "sinon";
import { logger as chainedTokenCredentialLogger } from "../../../src/credentials/chainedTokenCredential";

class TestMockCredential implements TokenCredential {
  constructor(public returnPromise: Promise<AccessToken | null>) {}

  getToken(): Promise<AccessToken | null> {
    return this.returnPromise;
  }
}

describe("ChainedTokenCredential", function() {
  it("Logs the expected successful message", async () => {
    const chainedTokenCredential = new ChainedTokenCredential(
      new TestMockCredential(Promise.resolve({ token: "firstToken", expiresOnTimestamp: 0 }))
    );

    const infoSpy = Sinon.spy(chainedTokenCredentialLogger.parent, "info");
    const getTokenInfoSpy = Sinon.spy(chainedTokenCredentialLogger.getToken, "info");

    const accessToken = await chainedTokenCredential.getToken("<scope>");
    assert.notStrictEqual(accessToken, null);

    assert.equal(
      infoSpy.getCalls()[0].args.join(" "),
      "ChainedTokenCredential => getToken() => Result for TestMockCredential: SUCCESS. Scopes: <scope>."
    );
    assert.equal(
      getTokenInfoSpy.getCalls()[0].args[0],
      "Result for TestMockCredential: SUCCESS. Scopes: <scope>."
    );

    infoSpy.restore();
    getTokenInfoSpy.restore();
  });
});
