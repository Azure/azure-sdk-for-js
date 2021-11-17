// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  createPipelineRequest,
  HttpMethods,
  PipelineRequestOptions
} from "@azure/core-rest-pipeline";
import { ServiceClient } from "@azure/core-client";
import { recorderHttpPolicy, TestProxyHttpClient } from "../src";
import { expect } from "chai";

type TestMode = "record" | "playback" | "live" | undefined;

const setTestMode = (mode: TestMode): TestMode => {
  env.TEST_MODE = mode;
  console.log(`==== setting TEST_MODE = ${mode} ====`);
  return mode;
};

/**
 * Returns the test server url
 * Acts as the endpoint [ Works as a substitute to the actual Azure Services ]
 */
function getTestServerUrl() {
  // utils/server.ts creates a localhost server at port 8080
  // - In "live" mode, we are hitting directly the localhost endpoint
  // - In "record" and "playback" modes, we need to hit the localhost of the host network
  //   from the proxy tool running in the docker container.
  //   `host.docker.internal` alias can be used in the docker container to access host's network(localhost)
  //
  // if PROXY_MANUAL_START=true, we start the proxy tool using the dotnet tool instead of the `docker run` command
  //  - in this case, we don't need to hit the localhost using the alias
  //  - needed for the CI since we have difficulties with the mac machines
  return !isLiveMode() && !(env.PROXY_MANUAL_START === "true")
    ? `http://host.docker.internal:8080` // Accessing host's network(localhost) through docker container
    : `http://127.0.0.1:8080`;
}

// These tests require the following to be running in parallel
// - utils/server.ts (to serve requests to act as a service)
// - proxy-tool (to save/mock the responses)
(["record", "playback", "live"] as TestMode[]).forEach((mode) => {
  describe(`proxy tool`, () => {
    let recorder: TestProxyHttpClient;
    let client: ServiceClient;

    const basePipelineReqOptions: Partial<PipelineRequestOptions> =
      mode === "live" ? { allowInsecureConnection: true } : {};

    before(() => {
      setTestMode(mode);
    });

    beforeEach(async function() {
      recorder = new TestProxyHttpClient(this.currentTest);
      client = new ServiceClient({ baseUri: getTestServerUrl() });
      client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    async function makeRequestAndVerifyResponse(
      request: {
        url?: string;
        path: string;
        body?: string;
        headers?: { headerName: string; value: string }[];
        method: HttpMethods;
      },
      expectedResponse: { [key: string]: unknown } | undefined
    ) {
      const req = createPipelineRequest({
        url: request.url ?? getTestServerUrl() + request.path,
        body: request.body,
        method: request.method,
        ...basePipelineReqOptions
      });
      request.headers?.forEach(({ headerName, value }) => {
        req.headers.set(headerName, value);
      });
      const response = await client.sendRequest(req);
      if (expectedResponse) {
        expect(JSON.parse(response.bodyAsText!)).to.deep.equal(expectedResponse);
      }
      // Add code to also check expected headers
      return response;
    }

    it("sample_response", async () => {
      await recorder.start({ envSetupForPlayback: {} });
      await makeRequestAndVerifyResponse(
        { path: `/sample_response`, method: "GET" },
        { val: "abc" }
      );
    });

    it("sample_response with random string in path", async () => {
      await recorder.start({ envSetupForPlayback: {} });

      if (!isPlaybackMode()) {
        recorder.variables["random-1"] = `random-${Math.ceil(Math.random() * 1000 + 1000)}`;
        recorder.variables["random-2"] = "known-string";
      }

      await makeRequestAndVerifyResponse(
        { path: `/sample_response/${recorder.variables["random-1"]}`, method: "GET" },
        { val: "I am the answer!" }
      );
      await makeRequestAndVerifyResponse(
        { path: `/sample_response/${recorder.variables["random-2"]}`, method: "GET" },
        { val: "I am the answer!" }
      );
    });

    describe("Sanitizers", () => {
      it("GeneralRegexSanitizer", async () => {
        env.SECRET_INFO = "abcdef";
        const fakeSecretInfo = "fake_secret_info";
        await recorder.start({
          envSetupForPlayback: {
            SECRET_INFO: fakeSecretInfo
          }
        }); // Adds generalRegexSanitizers by default based on envSetupForPlayback
        await makeRequestAndVerifyResponse(
          {
            path: `/sample_response/${env.SECRET_INFO}`,
            method: "GET"
          },
          { val: "I am the answer!" }
        );
      });

      it("RemoveHeaderSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            removeHeaderSanitizer: {
              headersForRemoval: ["ETag", "Date"]
            }
          }
        });
        await makeRequestAndVerifyResponse(
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
                value: fakeSecretValue
              },
              {
                jsonPath: "$.bodyProvided.secret_info", // Handles the response body
                regex: secretValue,
                value: fakeSecretValue
              }
            ]
          }
        });
        const reqBody = {
          secret_info: isPlaybackMode() ? fakeSecretValue : secretValue
        };
        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: JSON.stringify(reqBody),
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "application/json" }]
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
                groupForReplace: "secret_content"
              }
            ]
          }
        });
        const reqBody = `non_secret=i'm_no_secret&SECRET=${
          isPlaybackMode() ? fakeSecretValue : secretValue
        }&random=random`;
        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: reqBody,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }]
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
                value: fakeEndpoint
              }
            ]
          }
        });
        const pathToHit = `/api/sample_request_body`;
        await makeRequestAndVerifyResponse(
          {
            url: isPlaybackMode()
              ? getTestServerUrl().replace(secretEndpoint, fakeEndpoint) + pathToHit
              : undefined,
            path: pathToHit,
            method: "POST"
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
              value: fakeId
            }
          }
        });
        await makeRequestAndVerifyResponse(
          {
            path: `/subscriptions/${isPlaybackMode() ? fakeId : id}`,
            method: "GET"
          },
          { val: "I am the answer!" }
        );
      });

      it.skip("ContinuationSanitizer", async () => {
        await recorder.start({
          envSetupForPlayback: {},
          sanitizerOptions: {
            continuationSanitizers: [
              {
                key: "your_uuid",
                method: "guid", // What is this method exactly?
                resetAfterFirst: false
              }
            ]
          }
        });
        // What if the id is part of the response body and not response headers?

        const firstResponse = await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_uuid_in_header`,
            method: "GET"
          },
          undefined
        );

        // Seems to fail with
        // Unable to find a record for the request GET http://host.docker.internal:8080/sample_response
        // Header differences:
        //  <your_uuid> values differ, request <985e1725-6d96-467c-89fc-fe45ef0409e4>, record <7460db09-3140-4f76-b59c-16f23e91bc4c>
        // TODO: Scott is working on fixing the sanitizer
        await makeRequestAndVerifyResponse(
          {
            path: `/sample_response`,
            method: "GET",
            headers: [
              {
                headerName: "your_uuid",
                value: firstResponse.headers.get("your_uuid") || ""
              }
            ]
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
                value: sanitizedValue
              }
            ]
          }
        });

        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_uuid_in_header`,
            method: "GET"
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

      //   await makeRequestAndVerifyResponse(
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
                groupForReplace: "secret_content"
              }
            ]
          }
        });
        const reqBody = `non_secret=i'm_no_secret&SECRET=${
          isPlaybackMode() ? fakeSecretValue : secretValue
        }&random=random`;
        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: reqBody,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }]
          },
          { bodyProvided: reqBody }
        );

        await recorder.addSanitizers({
          resetSanitizer: true
        });

        const reqBodyAfterReset = `non_secret=i'm_no_secret&SECRET=${secretValue}&random=random`;
        // TODO: BUG OBSERVED - The following request should not be sanitized, but is sanitized
        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: reqBodyAfterReset,
            method: "POST",
            headers: [{ headerName: "Content-Type", value: "text/plain" }]
          },
          { bodyProvided: reqBodyAfterReset }
        );
      });
    });

    // Matchers
    // Transforms

    describe("Other methods", () => {
      it("transformsInfo()", async () => {
        if (!isLiveMode()) {
          await recorder.start({ envSetupForPlayback: {} });
          await recorder["sanitizer"]!.transformsInfo();
        }
      });
    });
  });
});
