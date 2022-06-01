// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { CustomMatcherOptions, isPlaybackMode, Recorder } from "../src";
import { isLiveMode, TestMode } from "../src/utils/utils";
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
      client = new ServiceClient(recorder.configureClientOptions({ baseUri: getTestServerUrl() }));
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

    it("redirect (redirect location has host)", async function (this: Mocha.Context) {
      await recorder.start({ envSetupForPlayback: {} });

      await makeRequestAndVerifyResponse(
        client,
        { path: `/redirectWithHost`, method: "GET" },
        { val: "abc" }
      );
    });

    it("redirect (redirect location is relative)", async function (this: Mocha.Context) {
      await recorder.start({ envSetupForPlayback: {} });

      await makeRequestAndVerifyResponse(
        client,
        { path: `/redirectWithoutHost`, method: "GET" },
        { val: "abc" }
      );
    });

    it("retry", async () => {
      await recorder.start({ envSetupForPlayback: {} });
      await makeRequestAndVerifyResponse(
        client,
        { path: "/reset_retry", method: "GET" },
        undefined
      );
      await makeRequestAndVerifyResponse(client, { path: "/retry", method: "GET" }, { val: "abc" });
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
            method: "POST",
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
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }, testHeader],
          },
          { val: "abc" }
        );
      });

      describe("CustomDefaultMatcher", () => {
        it("excludedHeaders - header value is different", async () => {
          const headerName = `X-Test-Dynamic-Header`;
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.setMatcher("CustomDefaultMatcher", {
            excludedHeaders: [headerName],
          });

          const testHeader = {
            headerName, // dynamic header
            value: isPlaybackMode() ? "playback" : "record",
          };

          await makeRequestAndVerifyResponse(
            client,
            {
              path: `/sample_response`,
              body: "body",
              method: "POST",
              headers: [{ headerName: "Content-Type", value: "text/plain" }, testHeader],
            },
            { val: "abc" }
          );
        });

        it("excludedHeaders - header is non-existent", async () => {
          const headerName = `X-Test-Dynamic-Header`;
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.setMatcher("CustomDefaultMatcher", {
            excludedHeaders: [headerName],
          });

          const testHeader = {
            headerName, // dynamic header
            value: "record",
          };

          await makeRequestAndVerifyResponse(
            client,
            {
              path: `/sample_response`,
              body: "body",
              method: "POST",
              headers: [{ headerName: "Content-Type", value: "text/plain" }].concat(
                !isPlaybackMode() ? [testHeader] : []
              ),
            },
            { val: "abc" }
          );
        });

        it("ignoredHeaders", async () => {
          const headerName = `X-Test-Dynamic-Header`;
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.setMatcher("CustomDefaultMatcher", {
            ignoredHeaders: [headerName],
          } as CustomMatcherOptions);

          const testHeader = {
            headerName, // dynamic header
            value: isPlaybackMode() ? "playback" : "record",
          };

          await makeRequestAndVerifyResponse(
            client,
            {
              path: `/sample_response`,
              body: "body",
              method: "POST",
              headers: [{ headerName: "Content-Type", value: "text/plain" }, testHeader],
            },
            { val: "abc" }
          );
        });

        it("compareBodies", async () => {
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.setMatcher("CustomDefaultMatcher", {
            compareBodies: false,
            ignoredHeaders: ["Content-Length"], // adding this header since the body sizes are different
          } as CustomMatcherOptions);

          // The body shouldn't matter for the match; verify this by using a
          // different body in playback vs record mode.
          const body = isPlaybackMode() ? "playback" : "record";

          await makeRequestAndVerifyResponse(
            client,
            {
              path: `/sample_response`,
              body,
              method: "POST",
              headers: [{ headerName: "Content-Type", value: "text/plain" }],
            },
            { val: "abc" }
          );
        });

        it("ignoreQueryOrdering", async () => {
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.setMatcher("CustomDefaultMatcher", {
            ignoreQueryOrdering: true,
          });

          await makeRequestAndVerifyResponse(
            client,
            {
              path: `/sample_response${
                isPlaybackMode() ? "?first=abc&second=def" : "?second=def&first=abc"
              }`,
              body: undefined,
              method: "POST",
              headers: [{ headerName: "Content-Type", value: "text/plain" }],
            },
            { val: "abc" }
          );
        });
      });
    });

    // Transforms

    describe("Transforms", () => {
      it("ApiVersionTransform", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.addTransform({ type: "ApiVersionTransform" });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body: "body",
            method: "POST",
            headers: [
              { headerName: "Content-Type", value: "text/plain" },
              { headerName: "api-version", value: "myapiversion" },
            ],
          },
          { val: "abc" },
          isPlaybackMode() ? { "api-version": "myapiversion" } : {}
        );
      });

      it("ClientIdTransform", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.addTransform({ type: "ClientIdTransform" });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body: "body",
            method: "POST",
            headers: [
              { headerName: "Content-Type", value: "text/plain" },
              { headerName: "x-ms-client-id", value: "myclientid" },
            ],
          },
          { val: "abc" },
          isPlaybackMode() ? { "x-ms-client-id": "myclientid" } : {}
        );
      });

      it("HeaderTransform", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.addTransform({
          type: "HeaderTransform",
          params: { key: "x-test-header", value: "test-value" },
        });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body: "body",
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }],
          },
          { val: "abc" },
          isPlaybackMode() ? { "x-test-header": "test-value" } : {}
        );
      });

      it("StorageRequestIdTransform", async () => {
        await recorder.start({ envSetupForPlayback: {} });
        await recorder.addTransform({ type: "StorageRequestIdTransform" });

        await makeRequestAndVerifyResponse(
          client,
          {
            path: `/sample_response`,
            body: "body",
            method: "POST",
            headers: [
              { headerName: "Content-Type", value: "text/plain" },
              { headerName: "x-ms-client-request-id", value: "requestid" },
            ],
          },
          { val: "abc" },
          isPlaybackMode() ? { "x-ms-client-request-id": "requestid" } : {}
        );
      });
    });

    describe("Other methods", () => {
      it("transformsInfo()", async () => {
        if (!isLiveMode()) {
          await recorder.start({ envSetupForPlayback: {} });
          await recorder.transformsInfo();
        }
      });
    });
  });
});
