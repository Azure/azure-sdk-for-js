// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpOperationResponse } from "@azure/core-http";
import { DefaultHttpClient, WebResourceLike } from "@azure/core-http";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { RequestOptions } from "http";
import { Agent as HttpsAgent } from "https";
import { getCachedHttpsAgent, makeRequest } from "./utils";

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
 * => run the run method
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
  ): void {
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
  ): void {
    this.state = state;
  }
}
export class TestProxyHttpClient {
  private _uri: string;
  public _recordingId?: string;
  public _mode!: string;
  private stateManager: RecordingStateManager = new RecordingStateManager();
  public insecure: boolean;

  constructor(uri: string, insecure: boolean) {
    this._uri = uri;
    this.insecure = insecure;
  }
  // For core-v1
  redirectRequest(request: WebResourceLike, recordingId: string): WebResourceLike;
  // For core-v2
  redirectRequest(request: PipelineRequest, recordingId: string): PipelineRequest;
  redirectRequest<T extends WebResourceLike | PipelineRequest>(request: T, recordingId: string): T {
    request.headers.set("x-recording-id", recordingId);
    request.headers.set("x-recording-mode", this._mode);
    request.headers.set("x-recording-remove", "false");
    const redirectedUrl = new URL(request.url);
    const providedUrl = new URL(this._uri);
    redirectedUrl.host = providedUrl.host;
    redirectedUrl.port = providedUrl.port;
    redirectedUrl.protocol = providedUrl.protocol;
    if (!request.headers.get("x-recording-upstream-base-uri")) {
      const upstreamUrl = new URL(request.url);
      upstreamUrl.pathname = "";
      request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
    }
    request.url = redirectedUrl.toString();
    return request;
  }

  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (this._recordingId && (this._mode === "record" || this._mode === "playback")) {
      request = this.redirectRequest(request, this._recordingId);
      request.allowInsecureConnection = this._uri.startsWith("http:");
    }

    return request;
  }

  async startRecording(): Promise<void> {
    this.stateManager.validateState("starting-recording");
    const options = this._createRecordingRequestOptions({
      path: paths.record + paths.start
    });
    const rsp = await makeRequest(this._uri, options, this.insecure);
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
    const options = this._createRecordingRequestOptions({
      path: paths.record + paths.stop
    });
    options.headers = {
      ...options.headers,
      "x-recording-id": this._recordingId
    };
    await makeRequest(this._uri, options, this.insecure);
    this.stateManager.setState("stopped-recording");
  }

  async startPlayback(): Promise<void> {
    this.stateManager.validateState("starting-playback");
    const options = this._createRecordingRequestOptions({
      path: paths.playback + paths.start
    });
    options.headers = {
      ...options.headers,
      "x-recording-id": this._recordingId
    };
    const rsp = await makeRequest(this._uri, options, this.insecure);
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
    const options = this._createRecordingRequestOptions({
      path: paths.playback + paths.stop
    });
    options.headers = {
      ...options.headers,
      "x-recording-id": this._recordingId,
      "x-purge-inmemory-recording": "true"
    };
    await makeRequest(this._uri, options, this.insecure);
    this._mode = "live";
    this._recordingId = undefined;
    this.stateManager.setState("stopped-playback");
  }

  private _createRecordingRequestOptions(options: RequestOptions): RequestOptions {
    if (this._recordingId !== undefined) {
      options.headers = {
        ...options.headers,
        "x-recording-id": this._recordingId
      };
    }
    return { ...options, method: "POST" };
  }
}

export function testProxyHttpPolicy(
  testProxyHttpClient: TestProxyHttpClient,
  isHttps: boolean,
  insecure: boolean
): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const modifiedRequest = await testProxyHttpClient.modifyRequest(request);
      if (isHttps) {
        modifiedRequest.agent = getCachedHttpsAgent(insecure);
      }
      return next(modifiedRequest);
    }
  };
}

export class TestProxyHttpClientV1 extends TestProxyHttpClient {
  public _httpClient: HttpClient;
  constructor(uri: string, insecure: boolean) {
    super(uri, insecure);
    this._httpClient = new DefaultHttpClientCoreV1(uri.startsWith("https"), insecure);
  }

  async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (this._recordingId && (this._mode === "record" || this._mode === "playback")) {
      request = this.redirectRequest(request, this._recordingId);
    }
    return this._httpClient.sendRequest(request);
  }
}

class DefaultHttpClientCoreV1 extends DefaultHttpClient {
  constructor(private isHttps: boolean, private insecure: boolean) {
    super();
  }

  async prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    const req: Partial<RequestInit & {
      agent?: HttpsAgent;
      compress?: boolean;
    }> = await super.prepareRequest(httpRequest);
    if (this.isHttps) {
      req.agent = getCachedHttpsAgent(this.insecure);
    }
    return req;
  }
}
