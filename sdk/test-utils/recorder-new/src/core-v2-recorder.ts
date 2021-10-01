// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebResourceLike } from "@azure/core-http";
import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { env, isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import { RecorderError, RecordingStateManager } from "./utils/utils";
import { Test } from "mocha";
import { sessionFilePath } from "./utils/sessionFilePath";

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * This client is meant for the core-v2 SDKs(depending on core-rest-pipeline) and
 * is supposed to be passed as an argument to the recorderHttpPolicy.
 */
export class TestProxyHttpClient {
  private url = "http://localhost:5000";
  public recordingId?: string;
  public mode: string;
  private stateManager = new RecordingStateManager();
  public httpClient: HttpClient | undefined = undefined;
  private sessionFile: string | undefined = undefined;

  constructor(private testContext?: Test | undefined) {
    this.mode = env.TEST_MODE;
    if (isRecordMode() || isPlaybackMode()) {
      if (this.testContext) {
        this.sessionFile = sessionFilePath(this.testContext);
        this.httpClient = createDefaultHttpClient();
      } else {
        throw new Error(
          "Unable to determine the recording file path, testContext provided is not defined."
        );
      }
    }
  }

  /**
   * For core-v1 (core-http)
   */
  redirectRequest(request: WebResourceLike): WebResourceLike;

  /**
   * For core-v2 (core-rest-pipeline)
   */
  redirectRequest(request: PipelineRequest): PipelineRequest;

  /**
   * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
   * Works for both core-v1 and core-v2
   */
  redirectRequest(request: WebResourceLike | PipelineRequest) {
    if (isPlaybackMode() || isRecordMode()) {
      if (!request.headers.get("x-recording-id")) {
        request.headers.set("x-recording-id", this.recordingId!);
        request.headers.set("x-recording-mode", this.mode);

        const upstreamUrl = new URL(request.url);
        const redirectedUrl = new URL(request.url);
        const providedUrl = new URL(this.url);

        redirectedUrl.host = providedUrl.host;
        redirectedUrl.port = providedUrl.port;
        redirectedUrl.protocol = providedUrl.protocol;
        request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
        request.url = redirectedUrl.toString();
      }
    }
    return request;
  }

  /**
   * recorderHttpPolicy calls this method on the request to modify and hit the proxy-tool with appropriate headers.
   */
  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (isPlaybackMode() || isRecordMode()) {
      if (this.recordingId) {
        request = this.redirectRequest(request);
        request.allowInsecureConnection = true;
      }
    }
    return request;
  }

  /**
   * Call this method to ping the proxy-tool with a start request
   * signalling to start recording in the record mode
   * or to start playing back in the playback mode.
   */
  async start(): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "started";
      if (this.recordingId === undefined) {
        const startUri = `${this.url}${isPlaybackMode() ? paths.playback : paths.record}${
          paths.start
        }`;
        const req = this._createRecordingRequest(startUri);
        if (!this.httpClient) {
          throw new RecorderError(
            `Something went wrong, TestProxyHttpClient.httpClient should not have been undefined in ${this.mode} mode.`
          );
        }
        const rsp = await this.httpClient.sendRequest({
          ...req,
          allowInsecureConnection: true
        });
        if (rsp.status !== 200) {
          throw new RecorderError("Start request failed.");
        }
        const id = rsp.headers.get("x-recording-id");
        if (!id) {
          throw new RecorderError("No recording ID returned for a successful start request.");
        }
        this.recordingId = id;
      }
    }
  }

  /**
   * Call this method to ping the proxy-tool with a stop request, this helps saving the recording in record mode.
   */
  async stop(): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "stopped";
      if (this.recordingId !== undefined) {
        const stopUri = `${this.url}${isPlaybackMode() ? paths.playback : paths.record}${
          paths.stop
        }`;
        const req = this._createRecordingRequest(stopUri);
        req.headers.set("x-recording-save", "true");

        if (!this.httpClient) {
          throw new RecorderError(
            `Something went wrong, TestProxyHttpClient.httpClient should not have been undefined in ${this.mode} mode.`
          );
        }
        const rsp = await this.httpClient.sendRequest({
          ...req,
          allowInsecureConnection: true
        });
        if (rsp.status !== 200) {
          throw new RecorderError("Stop request failed.");
        }
      } else {
        throw new RecorderError("Bad state, recordingId is not defined when called stop.");
      }
    }
  }

  /**
   * Adds the recording file and the recording id headers to the requests that are sent to the proxy tool.
   * These are required to appropriately save the recordings in the record mode and picking them up in playback.
   *
   * @private
   * @param {string} url
   */
  private _createRecordingRequest(url: string) {
    const req = createPipelineRequest({ url: url, method: "POST" });
    if (!this.sessionFile) {
      throw new RecorderError(
        `Something went wrong, TestProxyHttpClient.sessionFile should not have been undefined in ${this.mode} mode.`
      );
    }
    req.headers.set("x-recording-file", this.sessionFile);
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}

/**
 * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
 *
 * @export
 * @param {TestProxyHttpClient} testProxyHttpClient
 */
export function recorderHttpPolicy(testProxyHttpClient: TestProxyHttpClient): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      await testProxyHttpClient.modifyRequest(request);
      return next(request);
    }
  };
}
