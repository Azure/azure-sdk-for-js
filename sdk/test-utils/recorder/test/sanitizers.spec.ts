// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { env, isPlaybackMode, Recorder } from "../src";
import { TestMode } from "../src/utils/utils";
import { getTestServerUrl, makeRequestAndVerifyResponse, setTestMode } from "./utils/utils";
import { v4 as generateUuid } from "uuid";

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback", "live"] as TestMode[]).forEach((mode) => {
  describe(`proxy tool - sanitizers`, () => {
    let recorder: Recorder;
    let client: ServiceClient;
    const fakeSecretValue = "fake_secret_info";
    const secretValue = "abcdef";
    let currentValue: string;

    before(() => {
      setTestMode(mode);
    });

    beforeEach(async function () {
      recorder = new Recorder(this.currentTest);
      client = new ServiceClient(recorder.configureClientOptions({ baseUri: getTestServerUrl() }));
      currentValue = isPlaybackMode() ? fakeSecretValue : secretValue;
    });

    afterEach(async () => {
      await recorder.stop();
    });

    describe("Sanitizers - functionalities", () => {
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
          { val: "I am the answer!" }
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
          { val: "I am the answer!" }
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
          { val: "abc" }
        );
      });

      it("BodyKeySanitizer", async () => {
        const secretValue = "ab12cd34ef";
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
          { bodyProvided: reqBody }
        );
      });

      it("BodyRegexSanitizer", async () => {
        const secretValue = "ab12cd34ef";
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
          { bodyProvided: reqBody }
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
        await makeRequestAndVerifyResponse(
          client,
          {
            url: isPlaybackMode()
              ? getTestServerUrl().replace(secretEndpoint, fakeEndpoint) + pathToHit
              : undefined,
            path: pathToHit,
            method: "POST",
          },
          { bodyProvided: {} }
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
          { val: "I am the answer!" }
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
          undefined
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
          { val: "abc" }
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
          undefined
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
        const secretValue = "ab12cd34ef";
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
          { bodyProvided: reqBody }
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
          { bodyProvided: reqBodyAfterReset }
        );
      });
    });

    describe("Sanitizers in playback mode", () => {
      it("GeneralRegexSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
        });
        // currentValue is dynamic
        currentValue = generateUuid() + `-${env.TEST_MODE}`;

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
          ["record", "playback"]
        );
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${currentValue}`, // Request goes with this dynamic value in both the path and the body
            body: currentValue,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "I am the answer!" }
        );
      });
    });
  });
});
