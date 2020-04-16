// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "../src";
import { startRecorder, getTokenAuthenticationCredential, CredsAndEndpoint } from "./testHelpers";
import * as assert from "assert";
import { Recorder, env } from "@azure/test-utils-recorder";

describe.only("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;
  let recorder: Recorder;
  let uniqueId: string;

  beforeEach(function() {
    recorder = startRecorder(this);
    uniqueId = recorder.getUniqueName("");
    credsAndEndpoint = getTokenAuthenticationCredential() || this.skip();
  });

  afterEach(function() {
    recorder.stop();
  });

  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/
    );
  });

  // TODO: How do I make this work?
  it.skip("token authentication works", async () => {
    const client = new AppConfigurationClient(
      credsAndEndpoint.endpoint,
      credsAndEndpoint.credential
    );

    // it doesn't matter if any data comes in so long as we were
    // able to connect and call the service
    await client.addConfigurationSetting({
      key: `token-authentication-test-${Date.now()}`,
      value: "hello"
    });
  });
});
