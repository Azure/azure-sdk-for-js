// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import fs from "fs-extra";
import nock from "nock";

/**
 * Returns an array of `nock.Interceptor`s capable of matching the HTTP methods with the regex path provided
 *
 * @param {nock.Scope} nockScope
 * @param {RegExp} regex
 * @returns {Array<nock.Interceptor>}
 */
function getNockInterceptors(nockScope: nock.Scope, regex: RegExp): Array<nock.Interceptor> {
  return [
    nockScope.get(regex),
    nockScope.post(regex),
    nockScope.put(regex),
    nockScope.head(regex),
    nockScope.patch(regex),
    nockScope.merge(regex),
    nockScope.delete(regex),
    nockScope.options(regex)
  ];
}

/**
 * Meant only for node tests during playback mode
 * Delay and reply with errors for the new requests with the base urls from the existing current recording
 *
 * @export
 * @param {*} nock
 * @param {string} recordingPath
 */
export function fakeOutDelaysForNewRequests(nock: any, recordingPath: string) {
  const matchAll = require("match-all");

  // Read the content from the recording
  const content = fs.readFileSync(recordingPath, "utf-8").toString();

  // Find all the mocked urls in the recording
  const setOfUrlsInRecording: Set<string[]> = new Set();
  Array.from(
    matchAll(content, /nock\('(.*?)', {"encodedQueryParams":true}\)/g).toArray(),
    (m: Array<string>) => {
      setOfUrlsInRecording.add(m);
    }
  );

  if (setOfUrlsInRecording.size) {
    setOfUrlsInRecording.forEach(function(url: any) {
      // Get `nock.Interceptor`s for each of the URLs
      const nockInterceptors = getNockInterceptors(nock(url), /.*/);
      for (const interceptor of nockInterceptors) {
        // Initiating all the interceptors...
        // This makes the recorder match with any new request that is not present in the recording but with the base urls from the current recording.
        // If a request is matched, it delays for the specified amount of time and then replies with an error saying "RecordingNotFound"
        interceptor.delay(2).reply(401, {
          error: {
            code: "RecordingNotFound",
            message:
              "No match for the Request. Please try re-recording before playing back the test."
          }
        });
      }
    });
  }
}
