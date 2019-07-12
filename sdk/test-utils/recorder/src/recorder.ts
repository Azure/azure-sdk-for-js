// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { getUniqueName, isBrowser } from "./utils";
import { NiseRecorder, NockRecorder, Recorder } from "./baseRecorder";

const env = isBrowser() ? (window as any).__env__ : process.env;
const isRecording = env.TEST_MODE === "record";
const isPlayingBack = env.TEST_MODE === "playback";

export function record(testContext: any) {
  let recorder: Recorder;
  let testHierarchy: string;
  let testTitle: string;

  if (testContext.currentTest) {
    testHierarchy = testContext.currentTest.parent.fullTitle();
    testTitle = testContext.currentTest.title;
  } else {
    testHierarchy = testContext.test.parent.fullTitle();
    testTitle = testContext.test.title;
  }

  if (isBrowser()) {
    recorder = new NiseRecorder(testHierarchy, testTitle);
  } else {
    recorder = new NockRecorder(testHierarchy, testTitle);
  }

  if (recorder.skip() && (isRecording || isPlayingBack)) {
    testContext.skip();
  }

  // If neither recording nor playback is enabled, requests hit the live-service and no recordings are generated
  if (isRecording) {
    recorder.record();
  } else if (isPlayingBack) {
    recorder.playback();
  }

  return {
    stop: function() {
      if (isRecording) {
        recorder.stop();
      }
    },
    getUniqueName: function(prefix: string, recorderId?: string): string {
      let name: string;
      if (!recorderId) {
        recorderId = prefix;
      }
      if (isRecording) {
        name = getUniqueName(prefix);
        recorder.uniqueTestInfo[recorderId] = name;
      } else if (isPlayingBack) {
        name = recorder.uniqueTestInfo[recorderId];
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(recorderId: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        recorder.uniqueTestInfo[recorderId] = date.toISOString();
      } else if (isPlayingBack) {
        date = new Date(recorder.uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
