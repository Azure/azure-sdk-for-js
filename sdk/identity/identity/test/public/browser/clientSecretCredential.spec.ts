// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IdentityTestContextInterface } from "../../httpRequestsCommon.js";
import { createResponse } from "../../httpRequestsCommon.js";
import { ClientSecretCredential } from "@azure/identity";
import { IdentityTestContext } from "./httpRequests.js";
import { assertClientCredentials } from "../../authTestUtils.js";
import { describe, it, beforeEach, afterEach } from "vitest";

describe("ClientSecretCredential", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(async function () {
    testContext = new IdentityTestContext({});
  });
  afterEach(async function () {
    await testContext.restore();
  });

  it("sends an authorization request with the given credentials", async () => {
    const authDetails = await testContext.sendCredentialRequests({
      scopes: ["scope"],
      credential: new ClientSecretCredential("tenant", "client", "secret"),
      secureResponses: [
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00",
        }),
      ],
    });

    assertClientCredentials(
      authDetails.requests[0].url,
      authDetails.requests[0].body,
      "tenant",
      "client",
      "secret",
    );
  });
});
