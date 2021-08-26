// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpOperationResponse } from "@azure/core-http";
import { DefaultHttpClient, WebResourceLike } from "@azure/core-http";
import { isPlaybackMode, isRecordMode } from "@azure/test-utils-recorder";
import { TestProxyHttpClient } from "./core-v2-recorder";

export class TestProxyHttpClientCoreV1 extends TestProxyHttpClient {
  public httpClientCoreV1: HttpClient;
  constructor(sessionFile: string) {
    super(sessionFile);
    this.httpClientCoreV1 = new DefaultHttpClient();
  }

  async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (isPlaybackMode() || isRecordMode()) {
      if (this.recordingId) {
        request = this.redirectRequest(request);
      }
    }
    return this.httpClientCoreV1.sendRequest(request);
  }
}
