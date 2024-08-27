// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { HttpClient } from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { TokenCredential } from "@azure/identity";
import { assert } from "chai";
import sinon from "sinon";
import { SmsClient, SmsClientOptions, SmsSendRequest } from "../../src";
import { MockHttpClient } from "./utils/mockHttpClient";

const TEST_NUMBER = "+14255550123";

describe("[mocked] SmsClient", async function () {
  const baseUri = "https://contoso.api.fake";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  const dateHeader = "x-ms-date";
  let sendRequestSpy: sinon.SinonSpy;
  const mockHttpClient: HttpClient = new MockHttpClient(TEST_NUMBER);

  const testSendRequest: SmsSendRequest = {
    from: TEST_NUMBER,
    to: [TEST_NUMBER],
    message: "message",
  };

  describe("when instantiating SMS client", function () {
    it("can instantiate with a connection string", async function () {
      new SmsClient(connectionString);
    });

    it("can instantiate with a url and KeyCredential ", async function () {
      new SmsClient(baseUri, new AzureKeyCredential("banana"));
    });

    it("can instantiate with a token", async function () {
      const fakeToken: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      new SmsClient(baseUri, fakeToken);
    });
  });

  describe("when sending an SMS", function () {
    let smsClient: SmsClient;
    beforeEach(function () {
      sendRequestSpy = sinon.spy(mockHttpClient, "sendRequest");
      sinon.useFakeTimers();
      // workaround: casting because min testing has issues with httpClient newer versions having extra optional fields
      smsClient = new SmsClient(connectionString, {
        httpClient: mockHttpClient,
      } as SmsClientOptions);
    });

    it("sends with the correct headers", async function () {
      await smsClient.send(testSendRequest);

      const request = sendRequestSpy.getCall(0).args[0];
      if (isNode) {
        assert.equal(request.headers.get("host"), "contoso.api.fake");
      }
      assert.typeOf(request.headers.get(dateHeader), "string");
      assert.isDefined(request.headers.get("authorization"));
      assert.match(
        request.headers.get("authorization") as string,
        /HMAC-SHA256 SignedHeaders=.+&Signature=.+/,
      );
    });

    it("returns the correct results", async function () {
      const smsTestResults = await smsClient.send(testSendRequest);

      const smsTestResult = smsTestResults[0];
      sinon.assert.calledOnce(sendRequestSpy);
      assert.equal(smsTestResult.httpStatusCode, 202);
      assert.equal(smsTestResult.messageId, "id");
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
