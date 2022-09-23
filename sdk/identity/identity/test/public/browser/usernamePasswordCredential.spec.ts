// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IdentityTestContextInterface, createResponse } from "../../httpRequestsCommon";
import { IdentityTestContext } from "../../httpRequests";
import { UsernamePasswordCredential } from "../../../src";
import { assert } from "chai";
import { assertClientCredentials } from "../../authTestUtils";
import { fakeTestPasswordPlaceholder } from "@azure/test-utils";

describe("UsernamePasswordCredential", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(async function () {
    testContext = new IdentityTestContext({});
  });
  afterEach(async function () {
    await testContext.restore();
  });

  it("sends an authorization request with the given username and password", async () => {
    const password = fakeTestPasswordPlaceholder;

    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["scope"],
      credential: new UsernamePasswordCredential("tenant", "client", "user@domain.com", password),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });

    const authRequest = authDetails.requests[0];
    assertClientCredentials(authRequest.url, authRequest.body, "tenant", "client");

    assert.strictEqual(
      authRequest.body.indexOf(`password=${encodeURIComponent(password)}`) > -1,
      true,
      "Request body doesn't contain expected password"
    );
  });
});
