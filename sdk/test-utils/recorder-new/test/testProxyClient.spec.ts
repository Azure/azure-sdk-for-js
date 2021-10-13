// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  HttpClient,
  PipelineRequest,
  PipelineResponse
} from "@azure/core-rest-pipeline";
import { env } from "@azure-tools/test-recorder";
import { expect } from "chai";
import { TestProxyHttpClient } from "../src";
import { RecorderError, RecordingStateManager } from "../src/utils/utils";

describe("TestProxyClient functions", () => {
  let client: TestProxyHttpClient;
  let clientHttpClient: HttpClient;
  let testContext: Mocha.Test;
  beforeEach(function() {
    client = new TestProxyHttpClient(this.currentTest);
    clientHttpClient = client.httpClient as HttpClient;
    testContext = this.currentTest!;
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
    allowInsecureConnection: false
  };

  describe("redirectRequest method", () => {
    it("request unchanged if not playback or record modes", function() {
      env.TEST_MODE = "live";
      expect(client.redirectRequest(initialRequest)).to.deep.equal(initialRequest);
    });

    ["record", "playback"].forEach((testMode) => {
      it(`${testMode} mode: ` + "request unchanged if `x-recording-id` in headers", function() {
        env.TEST_MODE = testMode;
        const request: PipelineRequest = {
          ...initialRequest,
          headers: createHttpHeaders({ "x-recording-id": "dummy-recording-id" })
        };
        expect(client.redirectRequest(request)).to.deep.equal(request);
      });

      it(
        `${testMode} mode: ` + "url and headers get updated if no `x-recording-id` in headers",
        function() {
          env.TEST_MODE = testMode;
          client = new TestProxyHttpClient(testContext);
          const request: PipelineRequest = {
            ...initialRequest,
            headers: createHttpHeaders({})
          };
          client.recordingId = "dummy-recording-id";
          expect(client.redirectRequest(request)).to.deep.equal({
            ...request,
            url: "http://localhost:5000/dummy_path?sas=sas",
            headers: createHttpHeaders({
              "x-recording-upstream-base-uri": initialRequest.url,
              "x-recording-id": client.recordingId,
              "x-recording-mode": env.TEST_MODE
            })
          });
        }
      );
    });
  });

  describe("start method", () => {
    it("nothing happens if not playback or record modes", async function() {
      env.TEST_MODE = "live";
      clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
        throw new Error("should not have reached here");
      };
      await client.start({ envSetupForPlayback: {} });
    });

    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "succeeds in playback or record modes and gets a recordingId",
        async function() {
          env.TEST_MODE = testMode;
          const recordingId = "dummy-recording-id";
          clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
            return Promise.resolve({
              status: 200,
              headers: createHttpHeaders({ "x-recording-id": recordingId }),
              request: initialRequest
            });
          };
          await client.start({ envSetupForPlayback: {} });
          expect(client.recordingId).to.eql(recordingId);
        }
      );

      it("throws if not received a 200 status code", async function() {
        env.TEST_MODE = testMode;
        const recordingId = "dummy-recording-id";
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 404,
            headers: createHttpHeaders({ "x-recording-id": recordingId }),
            request: initialRequest
          });
        };
        try {
          await client.start({ envSetupForPlayback: {} });
          throw new Error("should not have reached here, start() call should have failed");
        } catch (error) {
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal("Start request failed.");
        }
      });

      it("throws if not received a recording id upon 200 status code", async function() {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 200,
            headers: createHttpHeaders({}),
            request: initialRequest
          });
        };
        try {
          await client.start({ envSetupForPlayback: {} });
          throw new Error("should not have reached here, start() call should have failed");
        } catch (error) {
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal(
            "No recording ID returned for a successful start request."
          );
        }
      });
    });
  });

  describe("stop method", () => {
    it("nothing happens if not playback or record modes", async function() {
      env.TEST_MODE = "live";
      clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
        throw new Error("should not have reached here");
      };
      await client.stop();
    });

    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "fails in playback or record modes if no recordingId",
        async function() {
          env.TEST_MODE = testMode;
          clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
            return Promise.resolve({
              status: 200,
              headers: createHttpHeaders(),
              request: initialRequest
            });
          };
          client["stateManager"].state = "started";
          try {
            await client.stop();
            throw new Error("should not have reached here, stop() call should have failed");
          } catch (error) {
            expect((error as RecorderError).name).to.equal("RecorderError");
            expect((error as RecorderError).message).to.equal(
              "Bad state, recordingId is not defined when called stop."
            );
          }
        }
      );

      it("throws if status code is not 200", async function() {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 401,
            headers: createHttpHeaders(),
            request: initialRequest
          });
        };
        client.recordingId = "dummy-id";
        client["stateManager"].state = "started";
        try {
          await client.stop();
          throw new Error("should not have reached here, stop() call should have failed");
        } catch (error) {
          expect((error as RecorderError).name).to.equal("RecorderError");
          expect((error as RecorderError).message).to.equal("Stop request failed.");
        }
      });

      it("succeeds in playback or record modes", async function() {
        env.TEST_MODE = testMode;
        clientHttpClient.sendRequest = (): Promise<PipelineResponse> => {
          return Promise.resolve({
            status: 200,
            headers: createHttpHeaders(),
            request: initialRequest
          });
        };
        client.recordingId = "dummy-id";
        client["stateManager"].state = "started";
        await client.stop();
      });
    });
  });

  describe("modifyRequest method", () => {
    it("request unchanged if not playback or record modes", async function() {
      env.TEST_MODE = "live";
      expect(await client.modifyRequest(initialRequest)).to.deep.equal(initialRequest);
    });

    ["record", "playback"].forEach((testMode) => {
      it(
        `${testMode} mode: ` + "request unchanged if `x-recording-id` in headers",
        async function() {
          env.TEST_MODE = testMode;
          const request: PipelineRequest = {
            ...initialRequest,
            headers: createHttpHeaders({ "x-recording-id": "dummy-recording-id" })
          };
          expect(await client.modifyRequest(request)).to.deep.equal(request);
        }
      );

      it(
        `${testMode} mode: ` + "url and headers get updated if no `x-recording-id` in headers",
        async function() {
          env.TEST_MODE = testMode;
          client = new TestProxyHttpClient(testContext);
          const request: PipelineRequest = {
            ...initialRequest,
            headers: createHttpHeaders({})
          };
          client.recordingId = "dummy-recording-id";
          expect(await client.modifyRequest(request)).to.deep.equal({
            ...request,
            url: "http://localhost:5000/dummy_path?sas=sas",
            headers: createHttpHeaders({
              "x-recording-upstream-base-uri": initialRequest.url,
              "x-recording-id": client.recordingId,
              "x-recording-mode": env.TEST_MODE
            })
          });
        }
      );
    });
  });

  describe("_createRecordingRequest", () => {
    it("_createRecordingRequest adds the recording-file and recording-id headers", () => {
      client.recordingId = "dummy-recording-id";
      const returnedRequest = client["_createRecordingRequest"](initialRequest.url);
      expect(returnedRequest.url).to.equal(initialRequest.url);
      expect(returnedRequest.method).to.equal("POST");
      expect(returnedRequest.headers.get("x-recording-file")).not.to.be.undefined;
      expect(returnedRequest.headers.get("x-recording-id")).to.equal(client.recordingId);
      expect(returnedRequest.url).to.equal(initialRequest.url);
    });
  });
});

describe("State Manager", function() {
  it("throws error if started twice", function() {
    const manager = new RecordingStateManager();
    manager.state = "started";
    try {
      manager.state = "started";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error) {
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already started, should not have called start again."
      );
    }
  });

  it("throws error if stopped twice", function() {
    const manager = new RecordingStateManager();
    try {
      manager.state = "stopped";
      throw new Error("should not have reached here, previous assignment should have failed");
    } catch (error) {
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already stopped, should not have called stop again."
      );
    }
  });
});

// TODO: Can potentially add more tests that use the proxy-tool once we figure out the start/setup scripts for proxy-tool
