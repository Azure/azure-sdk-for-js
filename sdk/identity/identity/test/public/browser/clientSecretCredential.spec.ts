// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "../../../src";
import { assertClientCredentials } from "../../authTestUtils";
import { prepareIdentityTests } from "../../httpRequests";
import {
  createResponse,
  IdentityTestContext,
  SendCredentialRequests,
} from "../../httpRequestsCommon";

describe("ClientSecretCredential", function () {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function () {
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function () {
    await testContext.restore();
  });

  it("sends an authorization request with the given credentials", async () => {
    const authDetails = await sendCredentialRequests({
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
      "secret"
    );
  });
});
