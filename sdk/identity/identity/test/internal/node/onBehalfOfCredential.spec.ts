// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as path from "path";
import { assert } from "chai";
import { isNode } from "@azure/core-util";
import { OnBehalfOfCredential } from "../../../src";
import {
  createResponse,
  IdentityTestContext,
  SendCredentialRequests
} from "../../httpRequestsCommon";
import { prepareIdentityTests, prepareMSALResponses } from "../../httpRequests";

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

  it("authenticates with a secret", async () => {
    const credential = new OnBehalfOfCredential({
      tenantId: "adfs",
      clientId: "client",
      clientSecret: "secret",
      userAssertionToken: "user-assertion"
    });

    const newMSALClientLogs = () =>
      testContext.logMessages.filter((message) =>
        message.match("Initialized MSAL's On-Behalf-Of flow")
      ).length;

    const authDetails = await sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    assert.isNumber(authDetails.result?.expiresOnTimestamp);

    // Just checking that a new MSAL client was created.
    // This kind of testing will be important as we improve the On-Behalf-Of Credential.
    assert.equal(newMSALClientLogs(), 1);
  });

  it("authenticates with a certificate path", async () => {
    const certificatePath = path.join("assets", "fake-cert.pem");
    const credential = new OnBehalfOfCredential({
      tenantId: "adfs",
      clientId: "client",
      certificatePath,
      userAssertionToken: "user-assertion"
    });

    const newMSALClientLogs = () =>
      testContext.logMessages.filter((message) =>
        message.match("Initialized MSAL's On-Behalf-Of flow")
      ).length;

    const authDetails = await sendCredentialRequests({
      scopes: ["https://test/.default"],
      credential,
      secureResponses: [
        ...prepareMSALResponses(),
        createResponse(200, {
          access_token: "token",
          expires_on: "06/20/2019 02:57:58 +00:00"
        })
      ]
    });

    assert.isNumber(authDetails.result?.expiresOnTimestamp);

    // Just checking that a new MSAL client was created.
    // This kind of testing will be important as we improve the On-Behalf-Of Credential.
    assert.equal(newMSALClientLogs(), 1);
  });
});
