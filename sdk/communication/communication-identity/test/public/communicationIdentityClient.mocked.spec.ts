// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier,
} from "@azure/communication-common";
import { getTokenForTeamsUserHttpClient, getTokenHttpClient } from "./utils/mockHttpClients";
import { CommunicationIdentityClient } from "../../src";
import { TestCommunicationIdentityClient } from "./utils/testCommunicationIdentityClient";
import { assert } from "chai";
import { isNode } from "@azure/core-util";
import sinon from "sinon";

describe("CommunicationIdentityClient [Mocked]", () => {
  const dateHeader = "x-ms-date";
  const user: CommunicationUserIdentifier = { communicationUserId: "ACS_ID" };

  afterEach(() => {
    sinon.restore();
  });

  it("creates instance of CommunicationIdentityClient", () => {
    const client = new CommunicationIdentityClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana"
    );
    assert.instanceOf(client, CommunicationIdentityClient);
  });

  it("sets correct headers", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = sinon.spy(getTokenHttpClient, "sendRequest");

    await client.getTokenTest(user, ["chat"]);
    sinon.assert.calledOnce(spy);

    const request = spy.getCall(0).args[0];

    if (isNode) {
      assert.equal(request.headers.get("host"), "contoso.spool.azure.local");
    }

    assert.typeOf(request.headers.get(dateHeader), "string");
    assert.isDefined(request.headers.get("authorization"));
    assert.match(
      request.headers.get("authorization") as string,
      /HMAC-SHA256 SignedHeaders=.+&Signature=.+/
    );
  });

  it("sends scopes in issue token request", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = sinon.spy(getTokenHttpClient, "sendRequest");
    const response = await client.getTokenTest(user, ["chat"]);

    assert.equal(response.token, "token");
    assert.equal(response.expiresOn.toDateString(), new Date("2011/11/30").toDateString());
    sinon.assert.calledOnce(spy);

    const request = spy.getCall(0).args[0];
    assert.deepEqual(JSON.parse(request.body as string), { scopes: ["chat"] });
  });

  it("[getToken] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenTest(user, ["chat"]);

    assert.isFalse("_response" in response);
  });

  it("[createUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const newUser = await client.createUserTest();

    assert.isTrue(isCommunicationUserIdentifier(newUser));
    assert.equal(newUser.communicationUserId, "identity");
    assert.isFalse("_response" in newUser);
  });

  it("exchanges Teams token for ACS token", async () => {
    const client = new TestCommunicationIdentityClient();
    const spy = sinon.spy(getTokenForTeamsUserHttpClient, "sendRequest");
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.equal(response.token, "token");
    assert.equal(response.expiresOn.toDateString(), new Date("2011/11/30").toDateString());
    sinon.assert.calledOnce(spy);
  });

  it("[getTokenForTeamsUser] excludes _response from results", async () => {
    const client = new TestCommunicationIdentityClient();
    const response = await client.getTokenForTeamsUserTest("TeamsToken", "appId", "userId");

    assert.isFalse("_response" in response);
  });
});
