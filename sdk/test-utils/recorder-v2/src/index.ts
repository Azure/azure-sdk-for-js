// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as url from "url";
import { DefaultHttpClient, WebResource, WebResourceLike } from "@azure/core-http";

export class RecordingHttpClient extends DefaultHttpClient {
  private static s_recordingServerUri = "http://localhost:5000";
  private static s_startPlaybackUri = RecordingHttpClient.s_recordingServerUri + "/playback/start";
  private static s_stopPlaybackUri = RecordingHttpClient.s_recordingServerUri + "/playback/stop";
  private static s_startRecordUri = RecordingHttpClient.s_recordingServerUri + "/record/start";
  private static s_stopRecordUri = RecordingHttpClient.s_recordingServerUri + "/record/stop";

  private _httpClient: DefaultHttpClient;
  private _recordingId?: string;
  private _sessionFile: string;
  private _startUri: string;
  private _stopUri: string;
  private _mode: string;

  constructor(sessionFile: string, playback: boolean) {
    super();
    this._sessionFile = sessionFile;
    this._startUri = playback
      ? RecordingHttpClient.s_startPlaybackUri
      : RecordingHttpClient.s_startRecordUri;
    this._stopUri = playback
      ? RecordingHttpClient.s_stopPlaybackUri
      : RecordingHttpClient.s_stopRecordUri;
    this._mode = playback ? "playback" : "record";
    this._httpClient = new DefaultHttpClient();
  }

  async prepareRequest(request: WebResourceLike): Promise<Partial<RequestInit>> {
    await this.start();

    if (!request.headers.contains("x-recording-id")) {
      request.headers.set("x-recording-id", this._recordingId!);
      request.headers.set("x-recording-mode", this._mode);
      const upstreamUrl = url.parse(request.url);
      const redirectedUrl = { ...upstreamUrl, host: "localhost:5000", protocol: "http" };
      upstreamUrl.path = undefined;
      request.headers.set("x-recording-upstream-base-uri", url.format(upstreamUrl));
      request.url = url.format(redirectedUrl);
      console.log(redirectedUrl);
    }

    return await super.prepareRequest(request);
  }

  async start(): Promise<void> {
    if (this._recordingId === undefined) {
      const req = this._createRecordingRequest(this._startUri);
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
    if (this._recordingId !== undefined) {
      const req = this._createRecordingRequest(this._stopUri);
      req.headers.set("x-recording-save", "true");
      await this._httpClient.sendRequest(req);
    }
  }

  private _createRecordingRequest(uri: string) {
    const req = new WebResource(uri, "POST");
    req.headers.set("x-recording-file", this._sessionFile);
    if (this._recordingId !== undefined) {
      req.headers.set("x-recording-id", this._recordingId);
    }
    return req;
  }
}
