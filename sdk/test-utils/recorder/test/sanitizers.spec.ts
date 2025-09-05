// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceClient } from "@azure/core-client";
import { isPlaybackMode, Recorder } from "../src/index.js";
import { TestMode } from "../src/utils/utils.js";
import { TEST_SERVER_URL, makeRequestAndVerifyResponse, setTestMode } from "./utils/utils.js";
import { randomUUID } from "@azure/core-util";
import { describe, it, beforeEach, afterEach, beforeAll } from "vitest";
import { env } from "../src/index.js";

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback", "live"] as TestMode[]).forEach((mode) => {
  describe(`proxy tool - sanitizers`, () => {
    let recorder: Recorder;
    let client: ServiceClient;
    const fakeSecretValue = "fake_secret_info";
    let secretValue = "abcdef";
    let currentValue: string;

    beforeAll(() => {
      setTestMode(mode);
    });

    beforeEach(async function (context) {
      env.TEST_VARIABLE_1 = "the answer!";
      env.TEST_VARIABLE_2 = "answer!";
      recorder = new Recorder(context);
      client = new ServiceClient(recorder.configureClientOptions({ baseUri: TEST_SERVER_URL }));
      currentValue = isPlaybackMode() ? fakeSecretValue : secretValue;
    });

    describe("envSetupForPlayback", () => {
      afterEach(async () => {
        await recorder.stop();
      });

      it("Handles overlapping environment variables", async () => {
        const envSetupForPlayback = {
          TEST_VARIABLE_2: "Variable2",
          TEST_VARIABLE_1: "Variable1",
        };

        await recorder.start({ envSetupForPlayback });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/aaa`,
            body: "aaaaa",
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          {
            val: isPlaybackMode() ? "I am Variable1" : "I am the answer!",
          },
        );
      });
    });

    describe("Sanitizers - functionalities", () => {
      afterEach(async () => {
        await recorder.stop();
      });

      it("GeneralRegexSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            generalSanitizers: [
              {
                regex: true,
                target: "abc+def",
                value: fakeSecretValue,
              },
            ],
          },
        });
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`,
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );
      });

      it("GeneralStringSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            generalSanitizers: [
              {
                target: currentValue,
                value: fakeSecretValue,
              },
            ],
          },
        });
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`,
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );
      });

      it("RemoveHeaderSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            removeHeaderSanitizer: {
              headersForRemoval: ["ETag", "Date"],
            },
          },
        });
        await makeRequestAndVerifyResponse(
          client,
          { path: `/sample_response`, method: "GET" },
          { val: "abc" },
        );
      });

      it("Connection string sanitizer - singular", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            connectionStringSanitizers: [
              {
                fakeConnString: "endpoint=https://endpoint/;accesskey=banana",
                actualConnString: "endpoint=https://realEndpoint/;accessKey=realBanana",
              },
            ],
          },
        });
      });

      it("Connection string sanitizer - multiple", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            connectionStringSanitizers: [
              {
                fakeConnString: "endpoint=https://endpoint/;accessKey=banana",
                actualConnString: "endpoint=https://realEndpoint/;accessKey=realBanana",
              },
              {
                fakeConnString: "endpoint2=https://randomEndpoint/;Key3=banana",
                actualConnString: "endpoint2=https://finalEndpoint/;Key3=realBanana",
              },
            ],
          },
        });
      });

      it("BodyKeySanitizer", async () => {
        secretValue = "ab12cd34ef";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            bodyKeySanitizers: [
              {
                jsonPath: "$.secret_info", // Handles the request body
                regex: secretValue,
                value: fakeSecretValue,
              },
              {
                jsonPath: "$.bodyProvided.secret_info", // Handles the response body
                regex: secretValue,
                value: fakeSecretValue,
              },
            ],
          },
        });
        const reqBody = {
          secret_info: isPlaybackMode() ? fakeSecretValue : secretValue,
        };
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_request_body`,
            body: JSON.stringify(reqBody),
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "application/json" }],
          },
          { bodyProvided: reqBody },
        );
      });

      it("BodyRegexSanitizer", async () => {
        secretValue = "ab12cd34ef";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            bodySanitizers: [
              {
                regex: true,
                target: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
                value: fakeSecretValue,
                groupForReplace: "secret_content",
              },
            ],
          },
        });
        const reqBody = `non_secret=i'm_no_secret&SECRET=${
          isPlaybackMode() ? fakeSecretValue : secretValue
        }&random=random`;
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_request_body`,
            body: reqBody,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { bodyProvided: reqBody },
        );
      });

      it("UriSanitizer", async () => {
        const secretEndpoint = "host.docker.internal";
        const fakeEndpoint = "fake_endpoint";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            uriSanitizers: [
              {
                target: secretEndpoint,
                value: fakeEndpoint,
              },
            ],
          },
        });
        const pathToHit = `/api/sample_request_body`;
        const reqBody = "test=data";
        await makeRequestAndVerifyResponse(
          client,
          {
            url: isPlaybackMode()
              ? TEST_SERVER_URL.replace(secretEndpoint, fakeEndpoint) + pathToHit
              : undefined,
            path: pathToHit,
            method: "POST",
            body: reqBody,
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { bodyProvided: reqBody },
        );
      });

      it("UriSubscriptionIdSanitizer", async () => {
        const id = "73c83158-bd73-4cda-aa11-a0c2a34e2544";
        const fakeId = "00000000-0000-0000-0000-000000000000";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            uriSubscriptionIdSanitizer: {
              value: fakeId,
            },
          },
        });
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/subscriptions/${isPlaybackMode() ? fakeId : id}`,
            method: "GET",
          },
          { val: "I am the answer!" },
        );
      });

      it.skip("ContinuationSanitizer", async () => {
        // Skipping since the test is failing in the browser
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            continuationSanitizers: [
              {
                key: "your_uuid",
                method: "guid", // What is this method exactly?
                resetAfterFirst: false,
              },
            ],
          },
        });
        // What if the id is part of the response body and not response headers?

        const firstResponse = await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_uuid_in_header`,
            method: "GET",
          },
          undefined,
        );

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            method: "GET",
            headers: [
              {
                headerName: "your_uuid",
                value: firstResponse.headers.get("your_uuid") || "",
              },
            ],
          },
          { val: "abc" },
        );
      });

      it("HeaderRegexSanitizer", async () => {
        const sanitizedValue = "Sanitized";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            headerSanitizers: [
              {
                key: "your_uuid",
                value: sanitizedValue,
              },
            ],
          },
        });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_uuid_in_header`,
            method: "GET",
          },
          undefined,
        );
        // TODO: Add more tests to cover groupForReplace
      });

      // it("OAuthResponseSanitizer", async () => {
      //   await recorder.start({});
      //   await recorder.addSanitizers({
      //     oAuthResponseSanitizer: true
      //   });

      //   await makeRequestAndVerifyResponse(client,
      //     {
      //       path: `/api/sample_uuid_in_header`,
      //       method: "GET"
      //     },
      //     undefined
      //   );
      //   // TODO: Add more tests to cover groupForReplace
      // });

      it.skip("ResetSanitizer (uses BodyRegexSanitizer as example)", async () => {
        secretValue = "ab12cd34ef";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            bodySanitizers: [
              {
                regex: true,
                target: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
                value: fakeSecretValue,
                groupForReplace: "secret_content",
              },
            ],
          },
        });
        const reqBody = `non_secret=i'm_no_secret&SECRET=${
          isPlaybackMode() ? fakeSecretValue : secretValue
        }&random=random`;
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_request_body`,
            body: reqBody,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { bodyProvided: reqBody },
        );

        await recorder.addSanitizers({
          resetSanitizer: true,
        });

        const reqBodyAfterReset = `non_secret=i'm_no_secret&SECRET=${secretValue}&random=random`;
        // TODO: BUG OBSERVED - The following request should not be sanitized, but is sanitized
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/api/sample_request_body`,
            body: reqBodyAfterReset,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { bodyProvided: reqBodyAfterReset },
        );
      });
    });

    describe("Sanitizers in playback mode", () => {
      afterEach(async () => {
        await recorder.stop();
      });

      it("GeneralRegexSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
        });
        // currentValue is dynamic
        currentValue = randomUUID() + `-${env.TEST_MODE}`;

        // In record mode, the proxy tool santizes the value 'generateUuid() + `-${env.TEST_MODE}`' as fakeSecretValue
        // In playback mode, the proxy tool santizes the value before matching the request to fakeSecretValue and hence the request matches with what's in the recording
        await recorder.addSanitizers(
          {
            generalSanitizers: [
              {
                regex: true,
                target: `[0-9a-z-]+-${env.TEST_MODE}`,
                value: fakeSecretValue,
              },
            ],
          },
          ["record", "playback"],
        );
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`, // Request goes with this dynamic value in both the path and the body
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );
      });
    });

    describe.skip("Session-level sanitizer", () => {
      it("Allows a sanitizer to be set before the recorder is started", async () => {
        await Recorder.addSessionSanitizers({
          generalSanitizers: [{ target: currentValue, value: fakeSecretValue }],
        });

        await recorder.start({
          envSetupForPlayback: {},
        });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`,
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );

        await recorder.stop();
        await Recorder.addSessionSanitizers({ resetSanitizer: true });
      });

      it("Sanitizers persist over multiple tests (1)", async () => {
        await Recorder.addSessionSanitizers({
          generalSanitizers: [{ target: currentValue, value: fakeSecretValue }],
        });

        await recorder.start({
          envSetupForPlayback: {},
        });
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`,
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );

        await recorder.stop();
      });

      it("Sanitizers persist over multiple tests (2)", async () => {
        await recorder.start({
          envSetupForPlayback: {},
        });
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`,
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" },
        );

        await recorder.stop();
        await Recorder.addSessionSanitizers({ resetSanitizer: true });
      });
    });
  });
});
