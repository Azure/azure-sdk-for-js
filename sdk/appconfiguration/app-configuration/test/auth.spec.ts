// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, record, Recorder } from "@azure/test-utils-recorder";
import { AppConfigurationClient } from "../src";
import { applyReplacements, getTokenAuthenticationCredential, CredsAndEndpoint } from "./testHelpers";
import * as assert from "assert";

describe.only("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;
  let recorder: Recorder;
  let uniqueId: string;

  beforeEach(function() {
    applyReplacements();
    recorder = record(this);
    uniqueId = recorder.getUniqueName("");
    credsAndEndpoint = getTokenAuthenticationCredential() || this.skip();
  });

  afterEach(function() {
    recorder.stop();
  });

  it("invalid connection string gives a decent error message", function() {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/
    );
  });

  it("token authentication works", async function() {
    const client = new AppConfigurationClient(
      credsAndEndpoint.endpoint,
      credsAndEndpoint.credential
    );

    // it doesn't matter if any data comes in so long as we were
    // able to connect and call the service
    await client.addConfigurationSetting({
      key: `token-authentication-test-${uniqueId}`,
      value: "hello"
    });
  });
});
