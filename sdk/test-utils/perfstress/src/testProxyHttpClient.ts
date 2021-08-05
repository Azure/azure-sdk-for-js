// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, URLBuilder } from "@azure/core-http";
import { DefaultHttpClient, WebResource, WebResourceLike } from "@azure/core-http";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  createDefaultHttpClient,
  HttpClient,
  createPipelineRequest
} from "@azure/core-rest-pipeline";

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

export class TestProxyHttpClientV1 extends DefaultHttpClient {
  private _uri: string;
  private _httpClient: DefaultHttpClient;
  private _recordingId?: string;
  public _mode!: string;

  constructor(uri: string) {
    super();
    this._uri = uri;
    this._httpClient = new DefaultHttpClient();
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
      request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
      request.url = redirectedUrl.toString();
    }

    return await super.sendRequest(request);
  }

  async startRecording(): Promise<void> {
    const startUri = this._uri + paths.record + paths.start;
    const req = this._createRecordingRequest(startUri);
    const rsp = await this._httpClient.sendRequest(req);
    if (rsp.status !== 200) {
      throw new Error("Start request failed.");
    }
    const id = rsp.headers.get("x-recording-id");
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    this._recordingId = id;
  }

  async stopRecording(): Promise<void> {
    const stopUri = this._uri + paths.record + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    await this._httpClient.sendRequest(req);
  }

  async startPlayback(): Promise<void> {
    const startUri = this._uri + paths.playback + paths.start;
    const req = this._createRecordingRequest(startUri);
    req.headers.set("x-recording-id", this._recordingId!);
    const rsp = await this._httpClient.sendRequest(req);
    if (rsp.status !== 200) {
      throw new Error("Start request failed.");
    }
    const id = rsp.headers.get("x-recording-id");
    if (!id) {
      throw new Error("No recording ID returned.");
    }
    this._recordingId = id;
  }

  async stopPlayback(): Promise<void> {
    const stopUri = this._uri + paths.playback + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    req.headers.set("x-purge-inmemory-recording", "true");
    await this._httpClient.sendRequest(req);

    this._mode = "live";
    this._recordingId = undefined;
  }

  private _createRecordingRequest(uri: string) {
    const req = new WebResource(uri, "POST");
    if (this._recordingId !== undefined) {
      req.headers.set("x-recording-id", this._recordingId);
    }
    return req;
  }
}

export class TestProxyHttpClient {
  private _uri: string;
  private _httpClient: HttpClient;
  private _recordingId?: string;
  public _mode!: string;

  constructor(uri: string) {
    this._uri = uri;
    this._httpClient = createDefaultHttpClient();
  }

  async sendRequest(request: PipelineRequest): Promise<PipelineRequest> {
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
      request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
      request.url = redirectedUrl.toString();
      request.allowInsecureConnection = true;
    }

    return request;
  }

  async startRecording(): Promise<void> {
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
  }

  async stopRecording(): Promise<void> {
    const stopUri = this._uri + paths.record + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });
  }

  async startPlayback(): Promise<void> {
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
  }

  async stopPlayback(): Promise<void> {
    const stopUri = this._uri + paths.playback + paths.stop;
    const req = this._createRecordingRequest(stopUri);
    req.headers.set("x-recording-id", this._recordingId!);
    req.headers.set("x-purge-inmemory-recording", "true");
    await this._httpClient.sendRequest({ ...req, allowInsecureConnection: true });

    this._mode = "live";
    this._recordingId = undefined;
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
