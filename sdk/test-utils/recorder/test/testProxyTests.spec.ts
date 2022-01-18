// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { isLiveMode, isPlaybackMode, Recorder } from "../src";
import { TestMode } from "../src/utils/utils";
import { getTestServerUrl, makeRequestAndVerifyResponse, setTestMode } from "./utils/utils";

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback", "live"] as TestMode[]).forEach((mode) => {
  describe(`proxy tool`, () => {
    let recorder: Recorder;
    let client: ServiceClient;

    before(() => {
      setTestMode(mode);
    });

    beforeEach(async function () {
      recorder = new Recorder(this.currentTest);
      client = new ServiceClient({ baseUri: getTestServerUrl() });
      recorder.configureClient(client);
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("sample_response", async () => {
      await recorder.start({ envSetupForPlayback: {} });
      await makeRequestAndVerifyResponse(
        client,
        { path: `/sample_response`, method: "GET" },
        { val: "abc" }
      );
    });

    it("sample_response with random string in path", async () => {
      await recorder.start({ envSetupForPlayback: {} });

      await makeRequestAndVerifyResponse(
        client,
        {
          path: `/sample_response/${recorder.variable(
            "random-1",
            `random-${Math.ceil(Math.random() * 1000 + 1000)}`
          )}`,
          method: "GET",
        },
        { val: "I am the answer!" }
      );
      await makeRequestAndVerifyResponse(
        client,
        {
          path: `/sample_response/${recorder.variable("random-2", "known-string")}`,
          method: "GET",
        },
        { val: "I am the answer!" }
      );
    });

    // Matchers
    describe("Matchers", () => {
      it("BodilessMatcher", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.setMatcher("BodilessMatcher");

        // The body shouldn't matter for the match; verify this by using a
        // different body in playback vs record mode.
        const body = isPlaybackMode() ? "playback" : "record";

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body,
            method: "GET",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "abc" }
        );
      });

      it("HeaderlessMatcher", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.setMatcher("HeaderlessMatcher");

        const testHeader = {
          headerName: `X-Test-Header-${isPlaybackMode() ? "Playback" : "Record"}`,
          value: isPlaybackMode() ? "playback" : "record",
        };

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body: "body",
            method: "GET",
            headers: [{ headerName: "Content-Type", value: "text/plain" }, testHeader],
          },
          { val: "abc" }
        );
      });
    });

    // Transforms

    describe("Other methods", () => {
      it("transformsInfo()", async () => {
        if (!isLiveMode()) {
          await recorder.start({ envSetupForPlayback: {} });

          if (!recorder["sanitizer"]) {
            throw new Error("expected recorder.sanitizer to be defined at this point");
          }

          await recorder["sanitizer"].transformsInfo();
        }
      });
    });
  });
});
