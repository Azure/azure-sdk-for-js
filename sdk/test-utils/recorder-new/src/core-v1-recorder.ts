// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpOperationResponse } from "@azure/core-http";
import { DefaultHttpClient, WebResourceLike } from "@azure/core-http";
import { isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import { TestProxyHttpClient } from "./core-v2-recorder";

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * This client is meant for the core-v1 SDKs(depending on core-http) and
 * is supposed to be passed as the httpClient option in the options bag of your client.
 */
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
