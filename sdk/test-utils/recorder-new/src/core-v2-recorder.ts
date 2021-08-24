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

/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 *
 * => then start
 * => run the runAsync
 * => stop record
 * => start playback
 * => stop playback
 */
export class RecordingStateManager {
  public state: "started" | "stopped" | undefined;

  /**
   * validateState
   */
  public validateState(currentFlow: "starting" | "stopping") {
    if (currentFlow === "starting") {
      if (this.state === "started") {
        throw new Error("Recorder Error: Already started, should not have called start again.");
      }
    }
    if (currentFlow === "stopping") {
      if (this.state === "stopped") {
        throw new Error("Recorder Error: Already stopped, should not have called stop again.");
      }
      if (this.state !== "started") {
        throw new Error("Recorder Error: Please start before calling stop.");
      }
    }
    if (currentFlow === "starting") {
      if (this.state !== "stopped" && this.state !== undefined) {
        throw new Error("Recorder Error: Please stop before calling start.");
      }
    }
    if (currentFlow === "stopping") {
      if (this.state !== "started") {
        throw new Error("Recorder Error: Please start before calling stop.");
      }
    }
  }

  /**
   * setState
   */
  public setState(state: "started" | "stopped") {
    this.state = state;
  }
}

export class TestProxyHttpClient {
  private url: string;
  public recordingId?: string;
  public mode: string;
  public httpClient: HttpClient;
  private sessionFile: string;
  private playback: boolean;
  private stateManager = new RecordingStateManager();

  constructor(sessionFile: string, playback: boolean) {
    this.sessionFile = sessionFile;
    this.playback = playback;
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
    }
    return request;
  }

  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (this.recordingId && (this.mode === "record" || this.mode === "playback")) {
      request = this.redirectRequest(request);
      request.allowInsecureConnection = true;
    }

    return request;
  }

  async start(): Promise<void> {
    this.stateManager.validateState("starting");
    if (this.recordingId === undefined) {
      const startUri = `${this.url}${this.playback ? paths.playback : paths.record}${paths.start}`;
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
    this.stateManager.setState("started");
  }

  async stop(): Promise<void> {
    this.stateManager.validateState("stopping");
    if (this.recordingId !== undefined) {
      const stopUri = `${this.url}${this.playback ? paths.playback : paths.record}${paths.stop}`;
      const req = this._createRecordingRequest(stopUri);
      req.headers.set("x-recording-save", "true");

      await this.httpClient.sendRequest({ ...req, allowInsecureConnection: true });
    } else {
      throw new Error("Recorder Error: Bad state, recordingId is not defined when called stop.");
    }
    this.stateManager.setState("stopped");
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
      const modifiedRequest = await testProxyHttpClient.modifyRequest(request);
      return next(modifiedRequest);
    }
  };
}
