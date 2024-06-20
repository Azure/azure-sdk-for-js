// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import nock from "nock";
import sinon from "sinon";
import { AzureCommunicationTokenCredential } from "../../../src";
import { assert } from "chai";

const tokenExchangePath = "/access/entra:exchangeToken";
const resourceEndpoint = "https://contoso.communication.azure.com";
const entraToken = "entraToken";
const acsToken = "acsToken";

describe("Entra CommunicationTokenCredential", function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it("Token exchange is called when passing static token", async function () {
    const scope = nock(resourceEndpoint)
    .post(tokenExchangePath)
    .matchHeader("Authorization", `Bearer ${entraToken}`)
    .reply(200, {
      token: {
        token: acsToken,
        expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      }
    });

    const tokenCredential = new AzureCommunicationTokenCredential(resourceEndpoint, entraToken);
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, acsToken);
    assert.isTrue(scope.isDone());
  });

  // it("Token exchange is called when passing tokenRefresher", async function () {
  //   const scope = nock(resourceEndpoint)
  //   .post(tokenExchangePath)
  //   .matchHeader("Authorization", `Bearer ${entraToken}`)
  //   .reply(200, {
  //     token: {
  //       token: acsToken,
  //       expiresOn: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  //     }
  //   });

  //   const tokenCredential = new AzureCommunicationTokenCredential(resourceEndpoint, entraToken);
  //   const tokenResult = (await tokenCredential.getToken()).token;
  //   assert.strictEqual(tokenResult, acsToken);
  //   assert.isTrue(scope.isDone());
  // });

  // test retries
  // test timeout
  // test 404
});
