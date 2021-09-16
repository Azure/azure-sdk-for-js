// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { recorderHttpPolicy, TestProxyHttpClient } from "../src";

const setTestMode = (
  mode: "record" | "playback" | undefined
): "record" | "playback" | undefined => {
  env.TEST_MODE = mode;
  return mode as "record" | "playback" | undefined;
};

const TEST_SERVER_URL = `http://127.0.0.1:8080`;

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
describe.only("TestProxyClient Sanitizers", () => {
  afterEach(() => {
    setTestMode(undefined);
  });

  (["record", "playback"] as ("record" | "playback")[]).forEach((mode) => {
    it(mode + ": add sanitizer", async () => {
      setTestMode(mode);
      const file = `browser_add_sanitizer.json`;
      const client = new ServiceClient({ baseUri: TEST_SERVER_URL });
      const recorder = new TestProxyHttpClient(file);
      client.pipeline.addPolicy(recorderHttpPolicy(recorder));
      const req = createPipelineRequest({ url: TEST_SERVER_URL + "/secret/ultimate_secret" });
      await recorder.start();
      console.log(await client.sendRequest(req));
      await recorder.stop();
    });
    describe(mode + ": connection string sanitizer", () => {});
  });
});

// TODO: Can potentially add more tests that use the proxy-tool once we figure out the start/setup scripts for proxy-tool
