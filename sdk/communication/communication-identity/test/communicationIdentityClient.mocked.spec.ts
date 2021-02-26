// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { assert } from "chai";
import sinon from "sinon";
import { CommunicationIdentityClient } from "../src";
import { TestCommunicationIdentityClient } from "./utils/testCommunicationIdentityClient";
import { getTokenHttpClient } from "./utils/mockHttpClients";

describe("CommunicationIdentityClient [Mocked]", () => {
  const dateHeader = isNode ? "date" : "x-ms-date";
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
    assert.deepEqual(JSON.parse(request.body), { scopes: ["chat"] });
  });
});
