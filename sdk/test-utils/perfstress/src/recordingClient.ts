// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, URLBuilder } from "@azure/core-http";
import {
  DefaultHttpClient,
  WebResource,
  WebResourceLike
} from "@azure/core-http";

const paths = {
  playback: "/playback",
  record: "/record",
  start: "/start",
  stop: "/stop"
};

export class RecordingHttpClient extends DefaultHttpClient {
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
    if (!request.headers.contains("x-recording-id") && (this._mode === "record" || this._mode === "playback")) {
      console.log("mode", this._mode);
      console.log("id", this._recordingId);
      request.headers.set("x-recording-id", this._recordingId!);
      request.headers.set("x-recording-mode", this._mode);
      request.headers.set("x-recording-remove", "false");

      const upstreamUrl = URLBuilder.parse(request.url);
      const redirectedUrl: URLBuilder = URLBuilder.parse(request.url);

      const providedUrl = URLBuilder.parse(this._uri);
      redirectedUrl.setHost(providedUrl.getHost());
      redirectedUrl.setScheme(providedUrl.getScheme());
      redirectedUrl.setPort(providedUrl.getPort());
      upstreamUrl.setPath(undefined);
      request.headers.set(
        "x-recording-upstream-base-uri",
        upstreamUrl.toString()
      );
      request.url = redirectedUrl.toString();
    }

    return await super.sendRequest(request);
  }

  async start(): Promise<void> {
    console.log("in start, mode = ", this._mode);
    if (this._recordingId === undefined && (this._mode === "record" || this._mode === "playback")) {
      const startUri =
        this._uri +
        (this._mode === "playback" ? paths.playback : paths.record) +
        paths.start;
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
  }

  async stop(): Promise<void> {
    if (this._recordingId !== undefined && (this._mode === "record" || this._mode === "playback")) {
      const stopUri =
        this._uri +
        (this._mode === "playback" ? paths.playback : paths.record) +
        paths.stop;
      const req = this._createRecordingRequest(stopUri);
      console.log(
        "in the RecordingHttpClient: inside stop - calling _httpClient.sendRequest"
      );
      if (this._mode === "playback") {
        req.headers.set("x-purge-inmemory-recording", "true");
      }
      await this._httpClient.sendRequest(req);
      this._recordingId = undefined;
    }
  }

  private _createRecordingRequest(uri: string) {
    const req = new WebResource(uri, "POST");
    if (this._recordingId !== undefined) {
      req.headers.set("x-recording-id", this._recordingId);
    }
    return req;
  }
}
