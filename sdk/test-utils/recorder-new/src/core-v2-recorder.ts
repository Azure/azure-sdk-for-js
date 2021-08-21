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

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

export class TestProxyHttpClient {
  private url: string;
  public recordingId?: string;
  public mode: string;
  private httpClient: HttpClient;
  private _sessionFile: string;
  private _playback: boolean;

  constructor(sessionFile: string, playback: boolean) {
    this._sessionFile = sessionFile;
    this._playback = playback;
    this.url = "http://localhost:5000";
    this.mode = playback ? "playback" : "record";
    this.httpClient = createDefaultHttpClient();
  }
  // For core-v1
  redirectRequest(request: WebResourceLike): WebResourceLike;
  // For core-v2
  redirectRequest(request: PipelineRequest): PipelineRequest;
  redirectRequest(request: WebResourceLike | PipelineRequest) {
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
      return request;
    } else {
      throw new Error("I think should not reach here");
    }
  }

  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (this.recordingId && (this.mode === "record" || this.mode === "playback")) {
      request = this.redirectRequest(request);
      request.allowInsecureConnection = true;
    }

    return request;
  }

  async start(): Promise<void> {
    if (this.recordingId === undefined) {
      const startUri = this._playback
        ? this.url + paths.playback + paths.start
        : this.url + paths.record + paths.start;
      const req = this._createRecordingRequest(startUri);
      const rsp = await this.httpClient.sendRequest({
        ...req,
        allowInsecureConnection: true
      });
      if (rsp.status !== 200) {
        throw new Error("Start request failed.");
      }
      const id = rsp.headers.get("x-recording-id");
      if (!id) {
        throw new Error("No recording ID returned.");
      }
      this.recordingId = id;
    }
  }

  async stop(): Promise<void> {
    if (this.recordingId !== undefined) {
      const stopUri = this._playback
        ? this.url + paths.playback + paths.stop
        : this.url + paths.record + paths.stop;
      const req = this._createRecordingRequest(stopUri);
      req.headers.set("x-recording-save", "true");

      await this.httpClient.sendRequest({ ...req, allowInsecureConnection: true });
    }
  }

  private _createRecordingRequest(url: string) {
    const req = createPipelineRequest({ url: url, method: "POST" });
    req.headers.set("x-recording-file", this._sessionFile);
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
      const modifiedRequest = await testProxyHttpClient.modifyRequest(request);
      return next(modifiedRequest);
    }
  };
}
