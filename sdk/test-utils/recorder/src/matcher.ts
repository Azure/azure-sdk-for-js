// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPipelineRequest, HttpClient } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths";
import { RecorderError } from "./utils/utils";

export type Matcher = "HeaderlessMatcher" | "BodilessMatcher" | "CustomDefaultMatcher";

/**
 * Body the customer matcher expects.
 */
export interface CustomMatcherBody {
  /**
   * Should the body value be compared during lookup operations?
   */
  compareBodies?: boolean;
  /**
   * Array of additional headers that should be excluded during matching.
   * "Excluded" headers are entirely ignored. Unlike "ignored" headers, the presence (or lack of presence) of a header will not cause mismatch.
   */
  excludedHeaders?: string[];
  /**
   * Array of additional headers that should be ignored during matching.
   * Any headers that are "ignored" will not do value comparison when matching.
   * This means that if the recording has a header that isn't in the request, a test mismatch exception will be thrown noting the lack of header in the request.
   *
   * This also applies if the header is present in the request but not recording.
   */
  ignoredHeaders?: string[];
  /**
   * By default, the test-proxy does not sort query params before matching. Setting true will sort query params alphabetically before comparing URI.
   */
  ignoreQueryOrdering?: boolean;
}

export async function setMatcher(
  recorderUrl: string,
  httpClient: HttpClient,
  matcher: Matcher,
  recordingId?: string,
  matcherBody: CustomMatcherBody = { compareBodies: true, ignoreQueryOrdering: false }
): Promise<void> {
  const url = `${recorderUrl}${paths.admin}${paths.setMatcher}`;

  const request = createPipelineRequest({ url, method: "POST", allowInsecureConnection: true });
  request.headers.set("x-abstraction-identifier", matcher);
  if (recordingId) {
    request.headers.set("x-recording-id", recordingId);
  }
  if (matcherBody) {
    request.body = JSON.stringify({
      compareBodies: matcherBody.compareBodies,
      excludedHeaders: matcherBody.excludedHeaders?.toString(),
      ignoredHeaders: matcherBody.ignoredHeaders?.toString(),
      ignoreQueryOrdering: matcherBody.ignoreQueryOrdering,
    });
  }
  const { status, bodyAsText } = await httpClient.sendRequest(request);

  if (status < 200 || status > 299) {
    throw new RecorderError(`setMatcher failed: ${bodyAsText}`, status);
  }
}
