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
import { env, isPlaybackMode, isRecordMode } from "@azure/test-utils-recorder";
import { RecorderError, RecordingStateManager } from "./utils";

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

export class TestProxyHttpClient {
  private url = "http://localhost:5000";
  public recordingId?: string;
  public mode: string;
  public httpClient: HttpClient;
  private stateManager = new RecordingStateManager();
  private playback: boolean;

  constructor(private sessionFile: string) {
    this.sessionFile = sessionFile;
    this.mode = env.TEST_MODE;
    this.playback = isPlaybackMode();
    this.httpClient = createDefaultHttpClient();
  }
  // For core-v1
  redirectRequest(request: WebResourceLike): WebResourceLike;
  // For core-v2
  redirectRequest(request: PipelineRequest): PipelineRequest;
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

  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (isPlaybackMode() || isRecordMode()) {
      if (this.recordingId) {
        request = this.redirectRequest(request);
        request.allowInsecureConnection = true;
      }
    }
    return request;
  }

  async start(): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "started";
      if (this.recordingId === undefined) {
        const startUri = `${this.url}${this.playback ? paths.playback : paths.record}${
          paths.start
        }`;
        const req = this._createRecordingRequest(startUri);
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

  async stop(): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "stopped";
      if (this.recordingId !== undefined) {
        const stopUri = `${this.url}${this.playback ? paths.playback : paths.record}${paths.stop}`;
        const req = this._createRecordingRequest(stopUri);
        req.headers.set("x-recording-save", "true");

        const rsp = await this.httpClient.sendRequest({ ...req, allowInsecureConnection: true });
        if (rsp.status !== 200) {
          throw new RecorderError("Stop request failed.");
        }
      } else {
        throw new RecorderError("Bad state, recordingId is not defined when called stop.");
      }
    }
  }

  private _createRecordingRequest(url: string) {
    const req = createPipelineRequest({ url: url, method: "POST" });
    req.headers.set("x-recording-file", this.sessionFile);
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}

export function recorderHttpPolicy(testProxyHttpClient: TestProxyHttpClient): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      await testProxyHttpClient.modifyRequest(request);
      return next(request);
    }
  };
}
