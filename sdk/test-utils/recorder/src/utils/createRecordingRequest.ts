// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, HttpMethods } from "@azure/core-rest-pipeline";
import { Agent } from "https";
import { getCertOptions } from "./certs";

let _agent: Agent | undefined;

/**
 * Adds the recording id headers to the requests that are sent to the proxy tool.
 * These are required to appropriately save the recordings in the record mode and picking them up in playback.
 */
export function createRecordingRequest(
  url: string,
  sessionFile?: string,
  recordingId?: string,
  method: HttpMethods = "POST"
) {
  const req = createPipelineRequest({ url: url, method });

  if (sessionFile !== undefined) {
    req.body = JSON.stringify({ "x-recording-file": sessionFile });
  }

  if (recordingId !== undefined) {
    req.headers.set("x-recording-id", recordingId);
  }
  req.agent = getHttpsAgent();
  return req;
}

export function getHttpsAgent() {
  if (!_agent) _agent = new Agent({ ca: getCertOptions().ca });
  return _agent;
}
