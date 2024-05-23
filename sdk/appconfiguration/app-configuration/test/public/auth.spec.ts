// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CredsAndEndpoint,
  getTokenAuthenticationCredential,
  startRecorder,
} from "./utils/testHelpers";
import { Recorder } from "@azure-tools/test-recorder";
import { AppConfigurationClient } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { isNodeRuntime } from "@azure/core-util";

describe("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    credsAndEndpoint = getTokenAuthenticationCredential();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("token authentication works", async function () {
    if (!isNodeRuntime) {
      this.skip();
    }
    const client = new AppConfigurationClient(
      credsAndEndpoint.endpoint,
      credsAndEndpoint.credential,
      recorder.configureClientOptions({}),
    );

    // it doesn't matter if any data comes in so long as we were
    // able to connect and call the service
    await client.addConfigurationSetting({
      key: `token-authentication-test-${recorder.variable("label-1", new Date().toString())}`,
      value: "hello",
    });
  });
});

describe("AppConfigurationClient constructor error cases", () => {
  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });

  it("undefined connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient(undefined as any),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });
});
