// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { ConfigurationClient } from "../../src";

import { env } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder-new";
import { createTestCredential } from "@azure-tools/test-credential";

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const replaceableVariables: Record<string, string> = {
  APPCONFIG_ENDPOINT: "https://myappconfig.azconfig.io",
  APPCONFIG_TEST_SETTING_KEY: "test-key",
  APPCONFIG_TEST_SETTING_EXPECTED_VALUE: "test-value",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

function createConfigurationClient(recorder: Recorder): ConfigurationClient {
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = env.APPCONFIG_ENDPOINT;

  // We use the createTestCredential helper from the test-credential tools package.
  // This function returns the special NoOpCredential in playback mode, which
  // is a special TokenCredential implementation that does not make any requests
  // to AAD.

  // recorder.configureClientOptionsCoreV1 mixes in the necessary options that
  // need to be passed to the corev1 ConfigurationClient for the recorder to
  // capture requests.
  return new ConfigurationClient(
    endpoint,
    createTestCredential(),
    recorder.configureClientOptionsCoreV1({})
  );
}

// You want to give the test suite a descriptive name. Here, I add [AAD] to
// indicate that the tests are authenticating with the service using Azure
// Active Directory.
describe("[AAD] ConfigurationClient functional tests", function () {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let client: ConfigurationClient;
  let recorder: Recorder;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function (this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = new Recorder(this.currentTest);

    await recorder.start({ envSetupForPlayback: replaceableVariables });

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createConfigurationClient(recorder);
  });

  // After each test, we need to stop the recording.
  afterEach(async function () {
    await recorder.stop();
  });

  it("predetermined setting has expected value", async () => {
    const key = env.APPCONFIG_TEST_SETTING_KEY;
    const expectedValue = env.APPCONFIG_TEST_SETTING_EXPECTED_VALUE;

    const setting = await client.getConfigurationSetting(key);

    // Make sure the key returned is the same as the key we asked for
    assert.equal(key, setting.key);

    // Make sure the value of the setting is the same as the value we entered
    // on the environment
    assert.equal(expectedValue, setting.value);
  });
});
