// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { getUniqueName, isBrowser, env } from "./utils";
import { NiseRecorder, NockRecorder, BaseRecorder, setEnviromentOnLoad } from "./baseRecorder";

/**
 * @export
 * An interface that allows recording and playback capabilities for the tests in Azure TS SDKs.
 */
export interface Recorder {
  /**
   * `stop()` method is supposed to be called at the end of the test, stops and saves the recording in the "record" mode.
   * Has no effect in the playback/live test modes.
   */
  stop(): void;
  /**
   * In live test mode, random string is generated, appended to `prefix` and returned.
   *
   * In record mode, random string is generated, appended to `prefix` and returned, and is saved in the recordings by assigning the `label`.
   *
   * In playback mode, the string in the recordings associated to the `label` is returned.
   *
   * If the `label`(optional param) is not provided, `prefix` is used as the `label`.
   *
   * @param {string} [prefix] Prefix for the generated random string
   * @param {string} [label] (Optional) Label to be assigned for the generated string [necessary for playing back the recordings]. If label is not provided, prefix is assumed as the label
   * @returns {string}
   */
  getUniqueName: (prefix: string, label?: string) => string;
  /**
   * In live test mode, `new Date();` is returned.
   *
   * In record mode, `new Date();` is returned, and is saved in the recordings by assigning the `label`.
   *
   * In playback mode, the date in the recordings associated to the `label` is returned.
   *
   * @param {string} [label] Label to be assigned for the date [necessary for playing back the recordings]
   * @returns {Date}
   */
  newDate: (label: string) => Date;
}

/**
 *
 * @param {Mocha.Context} [testContext]
 * @returns {Recorder}
 */
export function record(testContext: Mocha.Context): Recorder {
  let recorder: BaseRecorder;
  let testHierarchy: string;
  let testTitle: string;

  if (testContext.currentTest) {
    testHierarchy = testContext.currentTest.parent!.fullTitle();
    testTitle = testContext.currentTest.title;
  } else {
    testHierarchy = testContext.test!.parent!.fullTitle();
    testTitle = testContext.test!.title;
  }

  const isRecording = env.TEST_MODE === "record";
  const isPlayingBack = env.TEST_MODE === "playback";

  setEnviromentOnLoad();

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
    recorder.playback(testContext.currentTest!.file!);
  }

  return {
    stop: function() {
      if (isRecording) {
        recorder.stop();
      }
    },
    getUniqueName: function(prefix: string, label?: string): string {
      let name: string;
      if (!label) {
        label = prefix;
      }
      if (isRecording) {
        name = getUniqueName(prefix);
        recorder.uniqueTestInfo["uniqueName"][label] = name;
      } else if (isPlayingBack) {
        name = recorder.uniqueTestInfo["uniqueName"][label];
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(label: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        recorder.uniqueTestInfo["newDate"][label] = date.toISOString();
      } else if (isPlayingBack) {
        date = new Date(recorder.uniqueTestInfo["newDate"][label]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
