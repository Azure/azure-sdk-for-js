// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IdentityTestContextInterface } from "../../httpRequestsCommon";
import { createResponse } from "../../httpRequestsCommon";

import { AzureApplicationCredential } from "../../../src/credentials/azureApplicationCredential";
import { IdentityTestContext } from "../../httpRequests";
import { RestError } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import * as dac from "../../../src/credentials/defaultAzureCredential";
import { ManagedIdentityCredential } from "../../../src/credentials/managedIdentityCredential/index";
import { ManagedIdentityApplication } from "@azure/msal-node";

describe("AzureApplicationCredential testing Managed Identity (internal)", function () {
  let testContext: IdentityTestContextInterface;

  beforeEach(async () => {
    testContext = new IdentityTestContext({});
    testContext.sandbox
      .stub(dac, "createDefaultManagedIdentityCredential")
      .callsFake(
        (...args) =>
          new ManagedIdentityCredential({ ...args, clientId: process.env.AZURE_CLIENT_ID }),
      );
  });

  afterEach(async () => {
    await testContext.restore();
  });

  it("an unexpected error bubbles all the way up", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";

    const errorMessage = "ManagedIdentityCredential authentication failed.";
    testContext.sandbox
      .stub(ManagedIdentityApplication.prototype, "acquireToken")
      .rejects(new Error(errorMessage));

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new AzureApplicationCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
      ],
    });
    console.log(error);
    assert.ok(error?.message.includes(errorMessage));
  });

  it("returns expected error when the network was unreachable", async function () {
    process.env.AZURE_CLIENT_ID = "errclient";

    const netError: RestError = new RestError("Request Timeout", {
      code: "ENETUNREACH",
      statusCode: 408,
    });

    testContext.sandbox
      .stub(ManagedIdentityApplication.prototype, "acquireToken")
      .rejects(netError);

    const { error } = await testContext.sendCredentialRequests({
      scopes: ["scopes"],
      credential: new AzureApplicationCredential(),
      insecureResponses: [
        createResponse(200), // IMDS Endpoint ping
        { error: netError },
      ],
    });
    assert.ok(error!.message!.indexOf("Network unreachable.") > -1);
  });
});
