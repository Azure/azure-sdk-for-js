// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isNode } from "@azure/core-util";
import { OnBehalfOfCredential } from "../../src";
import { createResponse, IdentityTestContext, SendCredentialRequests } from "../httpRequestsCommon";
import { prepareIdentityTests, prepareMSALResponses } from "../httpRequests";
import { createUserAssertion } from "@azure/core-auth";

describe("OnBehalfOfCredential", function() {
  let testContext: IdentityTestContext;
  let sendCredentialRequests: SendCredentialRequests;

  beforeEach(async function() {
    testContext = await prepareIdentityTests({ replaceLogger: true, logLevel: "verbose" });
    sendCredentialRequests = testContext.sendCredentialRequests;
  });
  afterEach(async function() {
    if (isNode) {
      delete process.env.AZURE_AUTHORITY_HOST;
    }
    await testContext.restore();
  });

  it("generates a new msalOnBehalfOf client on each getToken call", async () => {
    const userAssertion = createUserAssertion("access-token");
    const credential = new OnBehalfOfCredential("adfs", "client", "secret");
    const newMSALClientLogs = () =>
      testContext.logMessages.filter((message) =>
        message.match("Initialized MSAL's On-Behalf-Of flow")
      ).length;

    const authDetails = await sendCredentialRequests({
      scopes: ["https://test/.default"],
      getTokenOptions: {
        authenticationOptions: {
          userAssertion
        }
      },
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });
    assert.isNumber(authDetails.result?.refreshOnTimestamp);
    assert.equal(newMSALClientLogs(), 1);

    await sendCredentialRequests({
      scopes: ["https://test/.default"],
      getTokenOptions: {
        authenticationOptions: {
          userAssertion
        }
      },
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });
    // Same userAssertion means re-used MSAL client
    assert.equal(newMSALClientLogs(), 1);

    await sendCredentialRequests({
      scopes: ["https://test/.default"],
      getTokenOptions: {
        authenticationOptions: {
          userAssertion: createUserAssertion("another-access-token")
        }
      },
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });
    // The MsalOnBehalfOf constructor should have been called twice.
    assert.equal(newMSALClientLogs(), 2);
  });
});
