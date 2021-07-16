// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "../../../src";
import {
  assertClientCredentials,
  createResponse,
  IdentityTestContext,
  prepareIdentityTests,
  SendCredentialRequests
} from "./nodeAuthTestUtils";

describe("ClientSecretCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    testContext = await prepareIdentityTests({});
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    await testContext.restore();
  });

  it("sends an authorization request with the given credentials", async () => {
    const authDetails = await sendCredentialRequests({
      scopes: ["scope"],
      credential: new ClientSecretCredential("tenant", "client", "secret"),
      secureResponses: [
        {
          response: createResponse(
            200,
            JSON.stringify({
              access_token: "token",
              expires_on: "06/20/2019 02:57:58 +00:00"
            })
          )
        }
      ]
    });

    const authRequest = authDetails.secureRequestOptions[0];
    const spy = authDetails.secureRequestWriteSpies[0];
    const requestBody = spy.args[0][0];
    assertClientCredentials(authRequest, requestBody, "tenant", "client", "secret");
  });
});
