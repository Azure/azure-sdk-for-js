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

function getTestServerUrl() {
  return !isLiveMode()
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
        path: string;
        body?: string;
        headers?: { headerName: string; value: string }[];
        method: HttpMethods;
      },
      expectedResponse: { [key: string]: unknown } | undefined
    ) {
      const req = createPipelineRequest({
        url: getTestServerUrl() + request.path,
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
      await recorder.start({});
      await makeRequestAndVerifyResponse(
        { path: `/sample_response`, method: "GET" },
        { val: "abc" }
      );
    });

    describe("Sanitizers", () => {
      it("GeneralRegexSanitizer", async () => {
        env.SECRET_INFO = "abcdef";
        const fakeSecretInfo = "fake_secret_info";
        await recorder.start({ SECRET_INFO: fakeSecretInfo });
        await recorder.addSanitizers({
          generalRegexSanitizers: [{ regex: env.SECRET_INFO, value: fakeSecretInfo }]
        });
        await makeRequestAndVerifyResponse(
          {
            path: `/sample_response/${env.SECRET_INFO}`,
            method: "GET"
          },
          { val: "I am the answer!" }
        );
      });

      it("RemoveHeaderSanitizer", async () => {
        await recorder.start({});
        await recorder.addSanitizers({
          removeHeaderSanitizer: {
            headersForRemoval: ["ETag", "Date"]
          }
        });
        await makeRequestAndVerifyResponse(
          { path: `/sample_response`, method: "GET" },
          { val: "abc" }
        );
      });

      it("BodyKeySanitizer", async () => {
        await recorder.start({});
        const secretValue = "ab12cd34ef";
        const fakeSecretValue = "fake_secret_info";
        await recorder.addSanitizers({
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
        await recorder.start({});
        const secretValue = "ab12cd34ef";
        const fakeSecretValue = "fake_secret_info";
        await recorder.addSanitizers({
          bodyRegexSanitizers: [
            {
              regex: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
              value: fakeSecretValue,
              groupForReplace: "secret_content"
            }
          ]
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

      it.skip("UriRegexSanitizer", async () => {
        await recorder.start({});
        const secretEndpoint = "random_endpoint";
        const fakeEndpoint = "fake_random_endpoint";
        await recorder.addSanitizers({
          uriRegexSanitizers: [
            {
              regex: secretEndpoint,
              value: fakeEndpoint
            }
          ]
        });

        // TODO:
        // `https://random_endpoint.io/random_path?secret_token=ab12cd34ef&random=random`;
        // Changing ab12cd34ef with fake_token is not allowed (doesn't work?)
        // Same for random_endpoint to fake_random_endpoint
        const headerWithUrl = `https://${
          isPlaybackMode() ? fakeEndpoint : secretEndpoint
        }.io/random_path?secret_token=&random=random`;

        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: "abcd",
            method: "POST",
            headers: [
              {
                headerName: "Content-Type",
                value: "text/plain"
              },
              {
                headerName: "some_url",
                value: headerWithUrl
              }
            ]
          },
          { bodyProvided: "abcd" }
        );
      });

      it.skip("UriSubscriptionIdSanitizer", async () => {
        await recorder.start({});
        const id = "73c83158-bd73-4cda-aa11-a0c2a34e2544";
        const fakeId = "00000000-0000-0000-0000-000000000000";
        await recorder.addSanitizers({
          uriSubscriptionIdSanitizer: {
            value: fakeId
          }
        });

        // TODO:
        // Doesn't replace the id - sanitizer did not work
        const headerWithUrl = `https://endpoint.io/subscriptions/${isPlaybackMode() ? fakeId : id}`;

        await makeRequestAndVerifyResponse(
          {
            path: `/api/sample_request_body`,
            body: "abcd",
            method: "POST",
            headers: [
              {
                headerName: "Content-Type",
                value: "text/plain"
              },
              {
                headerName: "some_url",
                value: headerWithUrl
              }
            ]
          },
          { bodyProvided: "abcd" }
        );
      });

      it.skip("ContinuationSanitizer", async () => {
        await recorder.start({});
        // What if the id is part of the response body and not response headers?
        await recorder.addSanitizers({
          continuationSanitizers: [
            {
              key: "your_uuid",
              method: "guid", // What is this method exactly?
              resetAfterFirst: false
            }
          ]
        });

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
        await recorder.start({});
        const sanitizedValue = "Sanitized";
        await recorder.addSanitizers({
          headerRegexSanitizers: [
            {
              key: "your_uuid",
              value: sanitizedValue
            }
          ]
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

      it.only("ResetSanitizer (uses BodyRegexSanitizer as example)", async () => {
        await recorder.start({});
        const secretValue = "ab12cd34ef";
        const fakeSecretValue = "fake_secret_info";
        await recorder.addSanitizers({
          bodyRegexSanitizers: [
            {
              regex: "(.*)&SECRET=(?<secret_content>[^&]*)&(.*)",
              value: fakeSecretValue,
              groupForReplace: "secret_content"
            }
          ]
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

      // it("RemoveHeaderSanitizer", async () => {
      //   await recorder.start({});
      //   if (isRecordMode()) {
      //     console.log(await recorder["sanitizer"].transformsInfo());
      //   }
      // });

      // it("connection string santizer", async () => {
      //   await recorder.start({});
      //   const client = new ServiceClient({
      //     baseUri: getTestServerUrl()
      //   });
      //   client.pipeline.addPolicy(recorderHttpPolicy(recorder));
      //   // // await recorder.addSanitizer({ regex: "harshanstoragetest", value: "fakeaccount" });
      //   // await recorder.addConnectionStringSanitizer({
      //   //   fakeConnString:
      //   //     "TableEndpoint=https://fakeaccountname.table.core.windows.net/;SharedAccessSignature=st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval",
      //   //   actualConnString: env.TABLES_SAS_CONNECTION_STRING
      //   // });
      //   // // console.log(await recorder.transformsInfo());
      //   // await recorder.removeHeaderSanitizer(["x-ms-version", "X-Content-Type-Options"]);
      //   const req = createPipelineRequest({
      //     url: getTestServerUrl() + "/sample_response",
      //     ...basePipelineReqOptions
      //   });
      //   expect(JSON.parse((await client.sendRequest(req)).bodyAsText!).val).to.equal("abc");
      // });
    });

    // Matchers
    // Transforms
  });
});

// TODO: Can potentially add more tests that use the proxy-tool once we figure out the start/setup scripts for proxy-tool
