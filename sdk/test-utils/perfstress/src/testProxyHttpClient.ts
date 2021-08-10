// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, URLBuilder } from "@azure/core-http";
import { DefaultHttpClient, WebResourceLike } from "@azure/core-http";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import { Dispatcher, request } from 'undici';

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 *
 * => then start record
 * => run the runAsync
 * => stop record
 * => start playback
 * => stop playback
 */
export class RecordingStateManager {
  public state:
    | "started-recording"
    | "stopped-recording"
    | "started-playback"
    | "stopped-playback"
    | undefined;

  /**
   * validateState
   */
  public validateState(
    currentFlow:
      | "starting-recording"
      | "stopping-recording"
      | "starting-playback"
      | "stopping-playback"
  ) {
    if (currentFlow === "starting-recording") {
      if (this.state === "started-recording") {
        throw new Error("Already started recording, should not have called again.");
      }
    }
    if (currentFlow === "stopping-recording") {
      if (this.state === "stopped-recording") {
        throw new Error("Already stopped recording, should not have called again.");
      }
      if (this.state !== "started-recording") {
        throw new Error("Please start recording before calling stop.");
      }
    }
    if (currentFlow === "starting-playback") {
      if (this.state !== "stopped-recording") {
        throw new Error("Did not stop recording, stop recording before starting playback.");
      }
    }
    if (currentFlow === "stopping-playback") {
      if (this.state !== "started-playback") {
        throw new Error("Did not start playback, start playback before calling stop.");
      }
    }
  }

  /**
   * setState
   */
  public setState(
    state: "started-recording" | "stopped-recording" | "started-playback" | "stopped-playback"
  ) {
    this.state = state;
  }
}

export class TestProxyHttpClientV1 extends DefaultHttpClient {
  private _uri: string;
  private _recordingId?: string;
  public _mode!: string;
  private stateManager: RecordingStateManager = new RecordingStateManager();

  constructor(uri: string) {
    super();
    this._uri = uri;
  }

  async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (this._recordingId && (this._mode === "record" || this._mode === "playback")) {
      request.headers.set("x-recording-id", this._recordingId);
      request.headers.set("x-recording-mode", this._mode);
      request.headers.set("x-recording-remove", "false");

      const upstreamUrl = URLBuilder.parse(request.url);
      const redirectedUrl: URLBuilder = URLBuilder.parse(request.url);

      const providedUrl = URLBuilder.parse(this._uri);
      redirectedUrl.setHost(providedUrl.getHost());
      redirectedUrl.setScheme(providedUrl.getScheme());
      redirectedUrl.setPort(providedUrl.getPort());
      upstreamUrl.setPath(undefined);
      if (!request.headers.get("x-recording-upstream-base-uri")) {
        request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
      }
      request.url = redirectedUrl.toString();
    }

    return await super.sendRequest(request);
  }

  async startRecording(): Promise<void> {
    this.stateManager.validateState("starting-recording");
    const options = this._createRecordingRequestOptions({ path: paths.record + paths.start });
    const rsp = await request(this._uri, options);
    if (rsp.statusCode !== 200) {
      throw new Error("Start request failed.");
    }
    if (!rsp.headers) {
      throw new Error("Headers are not defined, something is wrong.");
    }
    const id = rsp.headers["x-recording-id"];
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    if (typeof id !== "string") {
      throw new Error("recording ID returned is not a string.");
    }
    this._recordingId = id;
    this.stateManager.setState("started-recording");
  }

  async stopRecording(): Promise<void> {
    this.stateManager.validateState("stopping-recording");
    const options = this._createRecordingRequestOptions({ path: paths.record + paths.stop });
    options.headers = { ...options.headers, "x-recording-id": this._recordingId };
    await request(this._uri, options);
    this.stateManager.setState("stopped-recording");
  }

  async startPlayback(): Promise<void> {
    this.stateManager.validateState("starting-playback");
    const options = this._createRecordingRequestOptions({ path: paths.playback + paths.start });
    options.headers = { ...options.headers, "x-recording-id": this._recordingId };
    const rsp = await request(this._uri, options);
    if (rsp.statusCode !== 200) {
      throw new Error("Start request failed.");
    }
    if (!rsp.headers) {
      throw new Error("Headers are not defined, something is wrong.");
    }
    const id = rsp.headers["x-recording-id"];
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    if (typeof id !== "string") {
      throw new Error("recording ID returned is not a string.");
    }
    this._recordingId = id;
    this.stateManager.setState("started-playback");
  }

  async stopPlayback(): Promise<void> {
    this.stateManager.validateState("stopping-playback");
    const options = this._createRecordingRequestOptions({ path: paths.playback + paths.stop });
    options.headers = { ...options.headers, "x-recording-id": this._recordingId, "x-purge-inmemory-recording": "true" };
    await request(this._uri, options);
    this._mode = "live";
    this._recordingId = undefined;
    this.stateManager.setState("stopped-playback");
  }

  private _createRecordingRequestOptions(options: Omit<Dispatcher.RequestOptions, "method">): Dispatcher.RequestOptions {
    if (this._recordingId !== undefined) {
      options.headers = { ...options.headers, "x-recording-id": this._recordingId }
    }
    return { ...options, method: "POST", };
  }
}

export class TestProxyHttpClient {
  private _uri: string;
  private _httpClient: HttpClient;
  private _recordingId?: string;
  public _mode!: string;
  private stateManager: RecordingStateManager = new RecordingStateManager();

  constructor(uri: string) {
    this._uri = uri;
    this._httpClient = createDefaultHttpClient();
  }

  async sendRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (this._recordingId && (this._mode === "record" || this._mode === "playback")) {
      request.headers.set("x-recording-id", this._recordingId);
      request.headers.set("x-recording-mode", this._mode);
      request.headers.set("x-recording-remove", "false");

      const upstreamUrl = new URL(request.url);
      const redirectedUrl = new URL(request.url);

      const providedUrl = new URL(this._uri);
      redirectedUrl.host = providedUrl.host;
      redirectedUrl.port = providedUrl.port;
      redirectedUrl.protocol = providedUrl.protocol;
      upstreamUrl.pathname = "";
      if (!request.headers.get("x-recording-upstream-base-uri")) {
        request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
      }
      request.url = redirectedUrl.toString();
      request.allowInsecureConnection = true;
    }

    return request;
  }

  async startRecording(): Promise<void> {
    this.stateManager.validateState("starting-recording");
    const startUri = this._uri + paths.record + paths.start;
    const req = this._createRecordingRequest(startUri);
    const rsp = await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });
    if (rsp.status !== 200) {
      throw new Error("Start request failed.");
    }
    const id = rsp.headers.get("x-recording-id");
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    this._recordingId = id;
    this.stateManager.setState("started-recording");
  }

  async stopRecording(): Promise<void> {
    this.stateManager.validateState("stopping-recording");
    const stopUri = this._uri + paths.record + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });
    this.stateManager.setState("stopped-recording");
  }

  async startPlayback(): Promise<void> {
    this.stateManager.validateState("starting-playback");
    const startUri = this._uri + paths.playback + paths.start;
    const req = this._createRecordingRequest(startUri);
    req.headers.set("x-recording-id", this._recordingId!);
    const rsp = await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });
    if (rsp.status !== 200) {
      throw new Error("Start request failed.");
    }
    const id = rsp.headers.get("x-recording-id");
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    this._recordingId = id;
    this.stateManager.setState("started-playback");
  }

  async stopPlayback(): Promise<void> {
    this.stateManager.validateState("stopping-playback");
    const stopUri = this._uri + paths.playback + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    req.headers.set("x-purge-inmemory-recording", "true");
    await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });

    this._mode = "live";
    this._recordingId = undefined;
    this.stateManager.setState("stopped-playback");
  }

  private _createRecordingRequest(uri: string): PipelineRequest {
    const req = createPipelineRequest({ url: uri, method: "POST" });
    if (this._recordingId !== undefined) {
      req.headers.set("x-recording-id", this._recordingId);
    }
    return req;
  }
}

export function testProxyHttpPolicy(testProxyHttpClient: TestProxyHttpClient): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const modifiedRequest = await testProxyHttpClient.sendRequest(request);
      return next(modifiedRequest);
    }
  };
}
