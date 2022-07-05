// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  HttpClient,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { expect } from "chai";
import { env, Recorder } from "../src";
import { createRecordingRequest } from "../src/utils/createRecordingRequest";
import { paths } from "../src/utils/paths";
import { getTestMode, isLiveMode, isRecordMode, RecorderError } from "../src/utils/utils";

const testRedirectedRequest = (
  client: Recorder,
  makeRequest: () => PipelineRequest,
  expectedModification: (req: PipelineRequest) => PipelineRequest
) => {
  const redirectedRequest = makeRequest();
  client["redirectRequest"](redirectedRequest);
  expect(redirectedRequest).to.deep.equal(expectedModification(makeRequest()));
};

describe("TestProxyClient functions", () => {
  let client: Recorder;
  let clientHttpClient: HttpClient;
  let testContext: Mocha.Test | undefined;
  beforeEach(function () {
    client = new Recorder(this.currentTest);
    clientHttpClient = client["httpClient"] as HttpClient;
    testContext = this.currentTest;
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
            (req) => req
          );
        }
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
                  "x-recording-upstream-base-uri": initialRequest.url,
                  "x-recording-id": client.recordingId,
                  "x-recording-mode": getTestMode(),
                }),
                allowInsecureConnection: !isLiveMode(),
              };
            }
          );
        }
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
          expect(client.recordingId).to.eql(recordingId);
        }
      );

      it("throws if not received a 200 status code", async function () {
        env.TEST_MODE = testMode;
        const recordingId = "dummy-recording-id";
        clientHttpClient.sendRequest = (req): Promise<PipelineResponse> => {
          if (req.url.endsWith(paths.setRecordingOptions)) {
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
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal("Start request failed.");
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
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal(
            "No recording ID returned for a successful start request."
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
            expect((error as RecorderError).name).to.equal("RecorderError");
            expect((error as RecorderError).message).to.equal(
              "Bad state, recordingId is not defined when called stop."
            );
          }
        }
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
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal("Stop request failed.");
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
      expect(() => client.variable("nonExistentVariable")).to.throw(
        "Tried to access uninitialized variable: nonExistentVariable. You must initialize it with a value before using it."
      );
    });

    it("sets the variable correctly in record mode", () => {
      env.TEST_MODE = "record";
      client.variable("var1", "value");
      expect(client["variables"]["var1"]).to.equal("value");
    });

    it("allows for the shorthand syntax to be used in record mode after a variable is initialized", () => {
      env.TEST_MODE = "record";
      client.variable("var1", "value");
      expect(client.variable("var1")).to.equal("value");
    });

    it("recalls the variable in playback mode", () => {
      env.TEST_MODE = "playback";
      client["variables"]["var1"] = "realValue";
      expect(client.variable("var1", "ignored")).to.equal("realValue");
    });

    it("throws an error if a variable does not exist in playback mode", () => {
      env.TEST_MODE = "playback";
      expect(() => client.variable("var1", "ignored")).to.throw(
        "Tried to access a variable in playback that was not set in recording: var1"
      );
    });
  });

  describe("createRecordingRequest", () => {
    it("createRecordingRequest adds the recording-file and recording-id headers", () => {
      const returnedRequest = createRecordingRequest(
        initialRequest.url,
        client["sessionFile"],
        client.recordingId
      );
      expect(returnedRequest.url).to.equal(initialRequest.url);
      expect(returnedRequest.method).to.equal("POST");
      expect(returnedRequest.body).not.to.be.undefined;
      expect(returnedRequest.headers.get("x-recording-id")).to.equal(client.recordingId);
      expect(returnedRequest.url).to.equal(initialRequest.url);
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
        expect(getTestMode()).to.equal(testMode.toLowerCase());
        expect(isRecordMode()).to.equal(testMode.toLowerCase() === "record");
        expect(isLiveMode()).to.equal(testMode.toLowerCase() === "live");
      });
    });
  });
});
