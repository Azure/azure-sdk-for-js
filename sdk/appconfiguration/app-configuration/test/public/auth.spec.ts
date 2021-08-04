// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "../../src";
import {
  startRecorder,
  getTokenAuthenticationCredential,
  CredsAndEndpoint
} from "./utils/testHelpers";
import * as assert from "assert";
import { Recorder } from "@azure/test-utils-recorder";
import { Context } from "mocha";

describe("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = startRecorder(this);
    credsAndEndpoint = getTokenAuthenticationCredential() || this.skip();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/
    );
  });

  it("token authentication works", async function() {
    switch (process.env["AZURE_AUTHORITY_HOST"]) {
      case "https://login.microsoftonline.us":
        credsAndEndpoint.endpoint = credsAndEndpoint.endpoint.toString().replace(".azconfig.io", ".azconfig.azure.us");
        break;
      case "https://login.chinacloudapi.cn":
        credsAndEndpoint.endpoint = credsAndEndpoint.endpoint.toString().replace(".azconfig.io", ".azconfig.azure.cn");
        break;
    }
    
    const client = new AppConfigurationClient(
      credsAndEndpoint.endpoint,
      credsAndEndpoint.credential
    );

    // it doesn't matter if any data comes in so long as we were
    // able to connect and call the service
    await client.addConfigurationSetting({
      key: `token-authentication-test-${recorder.newDate("label-1").valueOf()}`,
      value: "hello"
    });
  });
});
