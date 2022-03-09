// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { expect } from "chai";
import { env, isPlaybackMode, Recorder } from "../src";
import { isRecordMode, RecorderError, TestMode } from "../src/utils/utils";
import { getTestServerUrl, makeRequestAndVerifyResponse, setTestMode } from "./utils/utils";

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback", "live"] as TestMode[]).forEach((mode) => {
  describe(`proxy tool - sanitizers`, () => {
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

    describe("Sanitizers - functionalities", () => {
      it("GeneralRegexSanitizer", async () => {
        env.SECRET_INFO = "abcdef";
        const fakeSecretInfo = "fake_secret_info";
        await recorder.start({
          envSetupForPlayback: {
            SECRET_INFO: fakeSecretInfo,
          },
        }); // Adds generalRegexSanitizers by default based on envSetupForPlayback
        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response/${env.SECRET_INFO}`,
            method: "GET",
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
        const fakeSecretValue = "fake_secret_info";
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
        const fakeSecretValue = "fake_secret_info";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            bodyRegexSanitizers: [
              {
                regex: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
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

      it("UriRegexSanitizer", async () => {
        const secretEndpoint = "host.docker.internal";
        const fakeEndpoint = "fake_endpoint";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            uriRegexSanitizers: [
              {
                regex: secretEndpoint,
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
            headerRegexSanitizers: [
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
        const fakeSecretValue = "fake_secret_info";
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            bodyRegexSanitizers: [
              {
                regex: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
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

    describe("Sanitizers - handling undefined", () => {
      beforeEach(async () => {
        await recorder.start({ envSetupForPlayback: {} });
      });

      const cases = [
        {
          options: {
            connectionStringSanitizers: [
              { actualConnString: undefined, fakeConnString: "a=b;c=d" },
            ],
            generalRegexSanitizers: [{ regex: undefined, value: "fake-value" }],
          },
          title: "all sanitizers are undefined",
          type: "negative",
        },
        {
          options: {
            connectionStringSanitizers: [
              { actualConnString: undefined, fakeConnString: "a=b;c=d" },
              { actualConnString: "1=2,3=4", fakeConnString: "a=b;c=d" },
            ],
            generalRegexSanitizers: [{ regex: undefined, value: "fake-value" }],
          },
          title: "partial sanitizers are undefined",
          type: "negative",
        },
        {
          options: {
            connectionStringSanitizers: [
              { actualConnString: "1=2,3=4", fakeConnString: "a=b;c=d" },
            ],
            generalRegexSanitizers: [{ regex: "value", value: "fake-value" }],
          },
          title: "all sanitizers are defined",
          type: "positive",
        },
      ];

      cases.forEach((testCase) => {
        it(`case - ${testCase.title}`, async () => {
          try {
            await recorder.addSanitizers(testCase.options);
            throw new Error("error was not thrown from addSanitizers call");
          } catch (error) {
            if (isRecordMode() && testCase.type === "negative") {
              expect((error as RecorderError).message).includes(
                `Attempted to add an invalid sanitizer`
              );
            } else {
              expect((error as RecorderError).message).includes(
                `error was not thrown from addSanitizers call`
              );
            }
          }
        });
      });
    });
  });
});
