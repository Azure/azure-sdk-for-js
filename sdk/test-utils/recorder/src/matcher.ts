// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, HttpClient } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths";
import { RecorderError } from "./utils/utils";

export type Matcher = "HeaderlessMatcher" | "BodilessMatcher";

export async function setMatcher(
  recorderUrl: string,
  httpClient: HttpClient,
  matcher: Matcher,
  recordingId?: string
): Promise<void> {
  const url = `${recorderUrl}${paths.admin}${paths.setMatcher}`;

  const request = createPipelineRequest({ url, method: "POST", allowInsecureConnection: true });
  request.headers.set("x-abstraction-identifier", matcher);
  if (recordingId) {
    request.headers.set("x-recording-id", recordingId);
  }

  const { status, bodyAsText } = await httpClient.sendRequest(request);

  if (status < 200 || status > 299) {
    throw new RecorderError(`setMatcher failed: ${bodyAsText}`, status);
  }
}
