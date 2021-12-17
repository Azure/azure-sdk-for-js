// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import { WebResourceLike } from "@azure/core-http";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { RecorderError } from "./utils/utils";

export class RecorderRequestModifier {
  constructor(public mode: string, private url: string) {}
  /**
   * For core-v1 (core-http)
   */
  redirectRequest(request: WebResourceLike, recordingId?: string): void;

  /**
   * For core-v2 (core-rest-pipeline)
   */
  redirectRequest(request: PipelineRequest, recordingId?: string): void;

  /**
   * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
   * Works for both core-v1 and core-v2
   */
  redirectRequest(request: WebResourceLike | PipelineRequest, recordingId?: string): void {
    if (isPlaybackMode() || isRecordMode()) {
      if (!request.headers.get("x-recording-id")) {
        if (recordingId === undefined) {
          throw new RecorderError("Recording ID must be defined to redirect a request");
        }

        request.headers.set("x-recording-id", recordingId);
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
    }
  }

  /**
   * recorderHttpPolicy calls this method on the request to modify and hit the proxy-tool with appropriate headers.
   */
  async modifyRequest(request: PipelineRequest, recordingId: string): Promise<PipelineRequest> {
    if (isPlaybackMode() || isRecordMode()) {
      if (recordingId) {
        this.redirectRequest(request, recordingId);
        request.allowInsecureConnection = true;
      }
    }
    return request;
  }
}
