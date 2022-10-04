// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, HttpMethods } from "@azure/core-rest-pipeline";

/**
 * Adds the recording id headers to the requests that are sent to the proxy tool.
 * These are required to appropriately save the recordings in the record mode and picking them up in playback.
 */
export function createRecordingRequest(
  url: string,
  sessionFile?: string,
  recordingId?: string,
  method: HttpMethods = "POST",
  assetsJson: string = ""
) {
  const req = createPipelineRequest({ url: url, method });

  if (sessionFile !== undefined) {
    let body: any = { "x-recording-file": sessionFile };

    if (assetsJson.length > 0) {
      body["x-recording-assets-file"] = assetsJson;
    }

    req.body = JSON.stringify(body);
  }

  if (recordingId !== undefined) {
    req.headers.set("x-recording-id", recordingId);
  }

  return req;
}
