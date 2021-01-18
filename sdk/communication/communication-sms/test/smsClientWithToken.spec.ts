// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import {
  isPlaybackMode,
  record,
  Recorder,
  RecorderEnvironmentSetup,
  env
} from "@azure/test-utils-recorder";
import { DefaultAzureCredential } from "@azure/identity";
import { SendRequest, SmsClient } from "../src/smsClient";
import { assert } from "chai";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";

if (isNode) {
  dotenv.config();
}

const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+18005551234",
    COMMUNICATION_ENDPOINT: "https://endpoint/",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "SomeClientSecret",
    AZURE_TENANT_ID: "SomeTenantId"
  },
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/"messageId"\s?:\s?"[^"]*"/g, `"messageId":"Sanitized"`)
  ],
  queryParametersToSkip: []
};

function createCredential(): TokenCredential | undefined {
  if (isPlaybackMode()) {
    return {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      }
    };
  } else {
    try {
      return new DefaultAzureCredential();
    } catch {
      return undefined;
    }
  }
}

describe("SmsClientWithToken [Playback/Live]", function() {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully issues a token for a user [single scope]", async function() {
    const credential = createCredential();

    if (!credential) {
      this.skip();
    }

    const endpoint = env.COMMUNICATION_ENDPOINT;
    const fromNumber = env["AZURE_PHONE_NUMBER"] as string;
    const toNumber = env["AZURE_PHONE_NUMBER"] as string;

    const smsClient = new SmsClient(endpoint, credential);
    const sendRequest: SendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };

    const response = await smsClient.send(sendRequest);
    assert.equal(response._response.status, 200);
  });

  it("successfully issues a token for a user [multiple scopes]", async function() {
    const credential = createCredential();

    if (!credential) {
      this.skip();
    }

    const endpoint = env.COMMUNICATION_ENDPOINT;
    const fromNumber = env.AZURE_PHONE_NUMBER;
    const toNumber = env.AZURE_PHONE_NUMBER;

    const smsClient = new SmsClient(endpoint, credential);
    const sendRequest: SendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };

    const response = await smsClient.send(sendRequest);
    assert.equal(response._response.status, 200);
  });
});
