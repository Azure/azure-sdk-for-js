// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../src";

import { env, record, Recorder } from "@azure/test-utils-recorder";
import { SipConfigurationPatch } from "../src/models";

const replaceableVariables: Record<string, string> = {
  // This must at least look like connection string to pass the validation.
  CONNECTION_STRING: "endpoint=https://dummy-connection-string/;accesskey=YQ==",
  APPCONFIG_TEST_SETTING_KEY: "test-key",
  APPCONFIG_TEST_SETTING_EXPECTED_VALUE: "test-value",
  AZURE_TENANT_ID: "azure_tenant_id",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret"
};

function createSipRoutingClient(): SipRoutingClient {
  const connectionString = env.CONNECTION_STRING;
  return new SipRoutingClient(connectionString);
}

function sleep(milliseconds: number) {  
  // We only need the delay for live testing.
  if (env.TEST_MODE === "playback") {
    milliseconds = 0;
  }

  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  

describe("[ACS] SipRoutingClient functional tests", function() {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let client: SipRoutingClient;
  let recorder: Recorder;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(function(this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = record(this, {
      // == Recorder Environment Setup == Add the replaceable variables from
      // above
      replaceableVariables,

      // We don't use this in the template, but if we had any query parameters
      // we wished to discard, we could add them here
      queryParametersToSkip: [],

      // Finally, we need to remove the AAD `access_token` from any requests.
      // This is very important, as it cannot be removed using environment
      // variable or query parameter replacement.  The
      // `customizationsOnRecordings` field allows us to make arbitrary
      // replacements within recordings.
      customizationsOnRecordings: [
        (recording: any): any =>
          recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
      ]
    });

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createSipRoutingClient();
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });

  it("can retrieve an existing config", async () => {
    const sipConfiguration = await client.getSipConfiguration();

    assert.isObject(sipConfiguration.trunks);
    assert.isArray(sipConfiguration.routes);
  });

  it("can create new trunk and route and read it back", async () => {    
    const patch: SipConfigurationPatch = {
      trunks: {
        "my-sbc.foo.bar": {
          sipSignalingPort: 1234
        }
      },
      routes: [{
        name: "myRoute",
        description: "myRoute's description",
        numberPattern: "^\+[1-9][0-9]{3,23}$",
        trunks: [
          "my-sbc.foo.bar"
        ]
      }]
    };

    await client.updateSipConfiguration(patch);

    const sipConfig = await client.getSipConfiguration();

    assert.deepEqual(sipConfig, patch);
  });

  it("can update trunk", async () => {
    const patch: SipConfigurationPatch = {
      trunks: {
        "my-sbc.foo.bar": {
          sipSignalingPort: 5678
        }
      }
    };

    await client.updateSipConfiguration(patch);

    // Needed because the changes aren't instantenous.
    sleep(1000);

    const sipConfig = await client.getSipConfiguration();

    assert.equal(sipConfig.trunks!["my-sbc.foo.bar"].sipSignalingPort, 5678);
  });

  it("can delete route", async () => {
    const patch: SipConfigurationPatch = {
      routes: []
    };

    await client.updateSipConfiguration(patch);
    
    // Needed because the changes aren't instantenous.
    sleep(2000);

    const sipConfig = await client.getSipConfiguration();

    assert.isEmpty(sipConfig.routes);
  });
});
