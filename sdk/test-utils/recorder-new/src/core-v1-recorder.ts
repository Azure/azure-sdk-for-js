// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpOperationResponse } from "@azure/core-http";
import { DefaultHttpClient, WebResourceLike } from "@azure/core-http";
import { isLiveMode } from "@azure-tools/test-recorder";
import { RecorderClient } from "./core-v2-recorder";
import { Test } from "mocha";
import { ensureExistence, RecorderError } from "./utils/utils";
import { env } from "./utils/env";
import { RecorderRequestModifier } from "./recorderRequestModifier";

/**
 * This client modifies the sendRequest to redirect the requests to the proxy tool instead of directly going to the service.
 * This client is supposed to be passed as the httpClient for the SDKs based on core-http.
 *
 * @export
 * @class TestProxyHttpClientCoreV1
 * @implements {HttpClient}
 */
export class TestProxyHttpClientCoreV1 implements HttpClient {
  private _httpClient: HttpClient;
  constructor(
    private client: {
      requestModifier?: RecorderRequestModifier;
      getRecordingId: () => string | undefined;
    }
  ) {
    this._httpClient = new DefaultHttpClient();
  }

  async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    // If check needed because we only modify requests in record/playback modes.
    if (
      !isLiveMode() &&
      ensureExistence(
        this.client.requestModifier,
        "this.requestModifier",
        env.TEST_MODE || "undefined"
      )
    ) {
      const recordingId = this.client.getRecordingId();
      if (!recordingId) {
        throw new RecorderError("Something went wrong - recordingId should have been defined");
      }
      this.client.requestModifier.redirectRequest(request, recordingId);
    }
    return this._httpClient.sendRequest(request);
  }
}

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * This client is meant for the core-v1 SDKs(depending on core-http) and `httpClientCoreV1` property
 * is supposed to be passed as the httpClient option in the options bag of your client.
 */
export class RecorderClientCoreV1 extends RecorderClient {
  public httpClientCoreV1: TestProxyHttpClientCoreV1;

  constructor(testContext?: Test) {
    super(testContext);
    this.httpClientCoreV1 = new TestProxyHttpClientCoreV1({
      requestModifier: this.requestModifier,
      getRecordingId: () => this.getRecordingId()
    });
  }
}
