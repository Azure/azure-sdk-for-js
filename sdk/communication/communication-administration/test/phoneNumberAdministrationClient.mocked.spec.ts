// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { assert } from "chai";
import sinon from "sinon";
import { NumberConfiguration, PhoneNumberAdministrationClient, PhoneNumberCapabilitiesUpdates } from "../src";
import { NumberConfigurationPhoneNumber } from '../src/phoneNumber/generated/src/models';
import { baseHttpClient, updatePhoneNumbersCapabilitiesHttpClient } from "./utils/mockHttpClients";
import { TestPhoneNumberAdministrationClient } from "./utils/testPhoneNumberAdministrationClient";

describe("PhoneNumberAdministrationClient [Mocked]", () => {
  const dateHeader = isNode ? "date" : "x-ms-date";

  afterEach(() => {
    sinon.restore();
  });

  it("creates instance of PhoneNumberAdministrationClient", () => {
    const client = new PhoneNumberAdministrationClient(
      "endpoint=https://contoso.spool.azure.local;accesskey=banana"
    );
    assert.instanceOf(client, PhoneNumberAdministrationClient);
  });

  it("sets correct headers", async () => {
    const client = new TestPhoneNumberAdministrationClient();
    const spy = sinon.spy(baseHttpClient, "sendRequest");

    await client.configurePhoneNumberTest({
      phoneNumber: "+18765432109",
      callbackUrl: "https://callback/"
    });
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

  it("sends correct NumberConfiguration in configureNumber request", async () => {
    const client = new TestPhoneNumberAdministrationClient();
    const spy = sinon.spy(baseHttpClient, "sendRequest");
    const response = await client.configurePhoneNumberTest({
      phoneNumber: "+18765432109",
      callbackUrl: "https://callback/"
    });

    assert.equal(response._response.status, 200);
    sinon.assert.calledOnce(spy);

    const request = spy.getCall(0).args[0];
    const expected: NumberConfiguration = {
      phoneNumber: "+18765432109",
      pstnConfiguration: {
        callbackUrl: "https://callback/"
      }
    };
    assert.deepEqual(JSON.parse(request.body), expected);
  });

  it("sends correct phone number in unconfigureNumber request", async () => {
    const client = new TestPhoneNumberAdministrationClient();
    const spy = sinon.spy(baseHttpClient, "sendRequest");
    const response = await client.unconfigurePhoneNumberTest("+18765432109");

    assert.equal(response._response.status, 200);
    sinon.assert.calledOnce(spy);

    const request = spy.getCall(0).args[0];
    const expected: NumberConfigurationPhoneNumber = {
      phoneNumber: "+18765432109"
    };
    assert.deepEqual(JSON.parse(request.body), expected);
  });

  it("sends correct UpdateNumberCapabilitiesRequest in updatePhoneNumbersCapabilities request", async () => {
    const client = new TestPhoneNumberAdministrationClient();
    const spy = sinon.spy(updatePhoneNumbersCapabilitiesHttpClient, "sendRequest");
    const phoneNumberCapabilitiesUpdate: PhoneNumberCapabilitiesUpdates = {
      "+18765432109": { add: ["Calling"], remove: ["Office365"] }
    };
    const response = await client.updatePhoneNumberCapabilitiesTest(phoneNumberCapabilitiesUpdate);

    assert.equal(response.capabilitiesUpdateId, "1")
    assert.equal(response._response.status, 200);
    sinon.assert.calledOnce(spy);

     const request = spy.getCall(0).args[0];
     assert.deepEqual(JSON.parse(request.body), { phoneNumberCapabilitiesUpdate });
  });
});
