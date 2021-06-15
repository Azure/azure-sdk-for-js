// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";

import { MsalTestCleanup, msalNodeTestSetup } from "../../../../identity/test/msalTestUtils";
import { VisualStudioCodeCredential } from "@azure/identity";

import "@azure/test-utils-recorder";

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
    const cred = new VisualStudioCodeCredential();

    const token = await cred.getToken(scope);

    assert.ok(token.expiresOnTimestamp);
    assert.ok(token.token);
  });
});
