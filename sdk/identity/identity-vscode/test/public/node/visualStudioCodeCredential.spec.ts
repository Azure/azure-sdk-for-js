// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-require-imports */

import assert from "assert";
import sinon from "sinon";

import { MsalTestCleanup, msalNodeTestSetup } from "../../../../identity/test/msalTestUtils";
import { VisualStudioCodeCredential } from "@azure/identity";
import { isRecordMode } from "@azure-tools/test-recorder";

const mockedResponse = [
  {
    account: "AzureCloud",
    password: "refresh_token"
  }
];

describe("VisualStudioCodeCredential", function(this: Mocha.Suite) {
  let cleanup: MsalTestCleanup;

  beforeEach(function(this: Mocha.Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;
  });

  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://graph.microsoft.com/.default";

  it("successfully gets a token", async () => {
    if (!isRecordMode()) {
      // In live CI or playback CI, we need to avoid actually using keytar
      // to try to read the Azure Account state, since it won't be available
      const mock = sinon.mock(require("keytar"));
      mock
        .expects("findCredentials")
        .onFirstCall()
        .returns(mockedResponse);
    }

    const cred = new VisualStudioCodeCredential();

    const token = await cred.getToken(scope);

    assert.ok(token.expiresOnTimestamp);
    assert.ok(token.token);
  });
});
