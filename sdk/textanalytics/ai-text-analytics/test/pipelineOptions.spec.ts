// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { TextAnalyticsClient, TextAnalyticsApiKeyCredential } from "../src";
import { environmentSetup } from "./utils/recordedClient";

import { record, Recorder, env } from "@azure/test-utils-recorder";

describe("TextAnalyticsClient Custom PipelineOptions", function() {
  let recorder: Recorder;
  let credential = new TextAnalyticsApiKeyCredential(env.SUBSCRIPTION_KEY);

  this.timeout(10000);

  beforeEach(function() {
    recorder = record(this, environmentSetup);
  });

  afterEach(() => {
    recorder.stop();
  });

  it("use custom user-agent string", async () => {
    const client = new TextAnalyticsClient(env.ENDPOINT, credential, {
      userAgentOptions: {
        userAgentPrefix: "azure_sdk_test"
      }
    });

    const [result] = await client.detectLanguages(["Hello!"], "us");
    assert.ok(result.error === undefined);
  });
});
