// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "../../src";
import {
  getTokenAuthenticationCredential,
  CredsAndEndpoint,
  recorderStartOptions,
  getRandomNumber
} from "./utils/testHelpers";
import { assert } from "chai";
import { Context } from "mocha";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { isPlaybackMode } from "@azure-tools/test-recorder";

describe("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;
  let recorder: TestProxyHttpClientCoreV1;

  beforeEach(async function(this: Context) {
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);
    await recorder.start(recorderStartOptions);
    credsAndEndpoint = getTokenAuthenticationCredential();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("token authentication works", async function() {
    const client = new AppConfigurationClient(
      credsAndEndpoint.endpoint,
      credsAndEndpoint.credential,
      { httpClient: recorder }
    );

    if (!isPlaybackMode()) {
      recorder.variables["label-1"] = `${getRandomNumber()}`;
    }
    // it doesn't matter if any data comes in so long as we were
    // able to connect and call the service
    await client.addConfigurationSetting({
      key: `token-authentication-test-${recorder.variables["label-1"]}`,
      value: "hello"
    });
  });
});

describe("AppConfigurationClient constructor error cases", () => {
  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/
    );
  });

  it("undefined connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient(undefined as any),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/
    );
  });
});
