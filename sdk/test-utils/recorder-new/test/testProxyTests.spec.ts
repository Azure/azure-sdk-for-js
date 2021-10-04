// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { recorderHttpPolicy, TestProxyHttpClient } from "../src";
import { expect } from "chai";

const setTestMode = (
  mode: "record" | "playback" | undefined
): "record" | "playback" | undefined => {
  env.TEST_MODE = mode;
  console.log(`TEST_MODE = ${mode}`);
  return mode as "record" | "playback" | undefined;
};

// const TEST_SERVER_URL = `http://127.0.0.1:8080`;
const TEST_SERVER_URL = `http://host.docker.internal:8080`; // Accessing host's network(localhost) through docker container

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback"] as ("record" | "playback")[]).forEach((mode) => {
  describe(`proxy tool`, () => {
    let recorder: TestProxyHttpClient;

    beforeEach(async function() {
      setTestMode(mode);
      recorder = new TestProxyHttpClient(this.currentTest);
      await recorder.start();
    });

    afterEach(async () => {
      await recorder.stop();
      setTestMode(undefined);
    });

    it("sample_response", async () => {
      const client = new ServiceClient({ baseUri: TEST_SERVER_URL });
      client.pipeline.addPolicy(recorderHttpPolicy(recorder));
      const req = createPipelineRequest({ url: TEST_SERVER_URL + "/sample_response" });
      expect(JSON.parse((await client.sendRequest(req)).bodyAsText!).abc).to.equal("def");
    });
  });
});

// TODO: Can potentially add more tests that use the proxy-tool once we figure out the start/setup scripts for proxy-tool
