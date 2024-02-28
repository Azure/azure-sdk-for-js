// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  createHttpHeaders,
  HttpClient,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { env, Recorder } from "../src/index.js";
import { createRecordingRequest } from "../src/utils/createRecordingRequest.js";
import { paths } from "../src/utils/paths.js";
import { getTestMode, isLiveMode, isRecordMode, RecorderError } from "../src/utils/utils.js";
import { TestInfo } from "../src/testInfo.js";

const testRedirectedRequest = (
  client: Recorder,
  makeRequest: () => PipelineRequest,
  expectedModification: (req: PipelineRequest) => PipelineRequest,
) => {
  const redirectedRequest = makeRequest();
  client["redirectRequest"](redirectedRequest);
  assert.deepEqual(redirectedRequest, expectedModification(makeRequest()));
};

describe("TestProxyClient functions", () => {
  let client: Recorder;
  let clientHttpClient: HttpClient;
  let testContext: TestInfo | undefined;
  beforeEach(function (ctx) {
    client = new Recorder(ctx);
    clientHttpClient = client["httpClient"] as HttpClient;
    testContext = ctx;
  });

  afterEach(() => {
    env.TEST_MODE = undefined;
  });

  const initialRequest: PipelineRequest = {
    headers: createHttpHeaders({}),
    method: "POST",
    url: "https://dummy_url.windows.net/dummy_path?sas=sas",
    withCredentials: false,
    requestId: "abcd",
    timeout: 0,
    allowInsecureConnection: false,
  };

  describe("redirectRequest method", () => {
    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "request unchanged if request URL already points to test proxy",
        function () {
          env.TEST_MODE = testMode;
          testRedirectedRequest(
            client,
            () => ({
              ...initialRequest,
              url: "http://localhost:5000/dummy_path?sas=sas",
              headers: createHttpHeaders({
                "x-recording-upstream-uri": "https://dummy_url.windows.net/dummy_path?sas=sas",
              }),
            }),
            (req) => req,
          );
        },
      );

      it(
        `${testMode} mode: ` + "url and headers get updated if no `x-recording-id` in headers",
        function () {
          env.TEST_MODE = testMode;
          client = new Recorder(testContext);
          client.recordingId = "dummy-recording-id";

          testRedirectedRequest(
            client,
            () => ({
              ...initialRequest,
              headers: createHttpHeaders({}),
            }),
            (req) => {
              if (!client.recordingId) {
                throw new Error("client.recordingId should be defined");
              }

              return {
                ...req,
                url: "http://localhost:5000/dummy_path?sas=sas",
                headers: createHttpHeaders({
                  "x-recording-upstream-base-uri": new URL(initialRequest.url).origin,
                  "x-recording-id": client.recordingId,
                  "x-recording-mode": getTestMode(),
                }),
                allowInsecureConnection: !isLiveMode(),
              };
            },
          );
        },
      );
    });
  });

  describe("start method", () => {
    it("nothing happens if not playback or record modes", async function () {
      env.TEST_MODE = "live";
      clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
        throw new Error("should not have reached here");
      };
      await client.start({ envSetupForPlayback: {} });
    });

    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "succeeds in playback or record modes and gets a recordingId",
        async function () {
          env.TEST_MODE = testMode;
          const recordingId = "dummy-recording-id";
          clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
            return Promise.resolve({
              status: 200,
              headers: createHttpHeaders({ "x-recording-id": recordingId }),
              request: initialRequest,
            });
          };
          await client.start({ envSetupForPlayback: {} });
          assert.equal(client.recordingId, recordingId);
        },
      );

      it("throws if not received a 200 status code", async function () {
        env.TEST_MODE = testMode;
        const recordingId = "dummy-recording-id";
        clientHttpClient.sendRequest = (req): Promise<PipelineResponse> => {
          if (req.url.endsWith(paths.setRecordingOptions) || req.url.endsWith(paths.setMatcher)) {
            return Promise.resolve({
              headers: createHttpHeaders(),
              status: 200,
              request: initialRequest,
            });
          } else {
            return Promise.resolve({
              status: 404,
              headers: createHttpHeaders({ "x-recording-id": recordingId }),
              request: initialRequest,
            });
          }
        };
        try {
          await client.start({ envSetupForPlayback: {} });
          throw new Error("should not have reached here, start() call should have failed");
        } catch (error: any) {
          assert.equal((error as RecorderError).name, "RecorderError");
          assert.equal((error as RecorderError).message, "Start request failed.");
        }
      });

      it("throws if not received a recording id upon 200 status code", async function () {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 200,
            headers: createHttpHeaders({}),
            request: initialRequest,
          });
        };
        try {
          await client.start({ envSetupForPlayback: {} });
          throw new Error("should not have reached here, start() call should have failed");
        } catch (error: any) {
          assert.equal((error as RecorderError).name, "RecorderError");
          assert.equal(
            (error as RecorderError).message,
            "No recording ID returned for a successful start request.",
          );
        }
      });
    });
  });

  describe("stop method", () => {
    it("nothing happens if not playback or record modes", async function () {
      env.TEST_MODE = "live";
      clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
        throw new Error("should not have reached here");
      };
      await client.stop();
    });

    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "fails in playback or record modes if no recordingId",
        async function () {
          env.TEST_MODE = testMode;
          clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
            return Promise.resolve({
              status: 200,
              headers: createHttpHeaders(),
              request: initialRequest,
            });
          };
          client["stateManager"].state = "started";
          try {
            await client.stop();
            throw new Error("should not have reached here, stop() call should have failed");
          } catch (error: any) {
            assert.equal((error as RecorderError).name, "RecorderError");
            assert.equal(
              (error as RecorderError).message,
              "Bad state, recordingId is not defined when called stop.",
            );
          }
        },
      );

      it("throws if status code is not 200", async function () {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 401,
            headers: createHttpHeaders(),
            request: initialRequest,
          });
        };
        client.recordingId = "dummy-id";
        client["stateManager"].state = "started";
        try {
          await client.stop();
          throw new Error("should not have reached here, stop() call should have failed");
        } catch (error: any) {
          assert.equal((error as RecorderError).name, "RecorderError");
          assert.equal((error as RecorderError).message, "Stop request failed.");
        }
      });

      it("succeeds in playback or record modes", async function () {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 200,
            headers: createHttpHeaders(),
            request: initialRequest,
          });
        };
        client.recordingId = "dummy-id";
        client["stateManager"].state = "started";
        await client.stop();
      });
    });
  });

  describe("variable method", () => {
    it("throws an error in record mode if a variable is accessed without giving it a value", () => {
      env.TEST_MODE = "record";
      assert.throws(
        () => client.variable("nonExistentVariable"),
        "Tried to access uninitialized variable: nonExistentVariable. You must initialize it with a value before using it.",
      );
    });

    it("sets the variable correctly in record mode", () => {
      env.TEST_MODE = "record";
      client.variable("var1", "value");
      assert.equal(client["variables"]["var1"], "value");
    });

    it("allows for the shorthand syntax to be used in record mode after a variable is initialized", () => {
      env.TEST_MODE = "record";
      client.variable("var1", "value");
      assert.equal(client.variable("var1"), "value");
    });

    it("recalls the variable in playback mode", () => {
      env.TEST_MODE = "playback";
      client["variables"]["var1"] = "realValue";
      assert.equal(client.variable("var1", "ignored"), "realValue");
    });

    it("throws an error if a variable does not exist in playback mode", () => {
      env.TEST_MODE = "playback";
      assert.throws(
        () => client.variable("var1", "ignored"),
        "Tried to access a variable in playback that was not set in recording: var1",
      );
    });
  });

  describe("createRecordingRequest", () => {
    it("createRecordingRequest adds the recording-file and recording-id headers", () => {
      const returnedRequest = createRecordingRequest(
        initialRequest.url,
        client["sessionFile"],
        client.recordingId,
      );
      assert.equal(returnedRequest.url, initialRequest.url);
      assert.equal(returnedRequest.method, "POST");
      assert.isDefined(returnedRequest.body);
      assert.equal(returnedRequest.headers.get("x-recording-id"), client.recordingId);
      assert.equal(returnedRequest.url, initialRequest.url);
    });
  });

  describe("getTestMode", () => {
    it("treats the TEST_MODE environment variable case-insensitively", () => {
      [
        "record",
        "RECORD",
        "Record",
        "playback",
        "PLAYBACK",
        "Playback",
        "live",
        "LIVE",
        "Live",
      ].forEach((testMode) => {
        env.TEST_MODE = testMode;
        assert.equal(getTestMode(), testMode.toLowerCase());
        assert.equal(isRecordMode(), testMode.toLowerCase() === "record");
        assert.equal(isLiveMode(), testMode.toLowerCase() === "live");
      });
    });
  });
});
