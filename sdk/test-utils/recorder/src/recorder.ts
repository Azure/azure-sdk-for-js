// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  getUniqueName,
  isBrowser,
  isRecordMode,
  isPlaybackMode,
  RecorderEnvironmentSetup,
  env,
  isSoftRecordMode,
  testHasChanged,
  stripNewLines
} from "./utils";
import {
  NiseRecorder,
  NockRecorder,
  BaseRecorder,
  setEnvironmentOnLoad,
  setEnvironmentVariables
} from "./baseRecorder";
import MD5 from "md5";

/**
 * @export
 * An interface that allows recording and playback capabilities for the tests in Azure TS SDKs.
 */
export interface Recorder {
  /**
   * `stop()` method is supposed to be called at the end of the test, stops and saves the recording in the "record" mode.
   * Has no effect in the playback/live test modes.
   */
  stop(): Promise<void>;
  /**
   * `{recorder.skip("node")}` and `{recorder.skip("browser")}` will skip the test in node.js and browser runtimes respectively.
   * If the `{runtime}` is `{undefined}`, the test will be skipped in both the node and browser runtimes.
   * Has no effect in the live test mode.
   */
  skip(runtime?: "node" | "browser", reason?: string): void;
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
 * An interface representing Mocha's Runnable
 */
export interface TestContextTest {
  parent?: {
    fullTitle: () => string;
  };
  fn?: () => any;
  title?: string;
  type?: string;
  file: string;
}

/**
 * An interface representing only the public properties of Mocha.Context
 */
export interface TestContextInterface {
  test?: TestContextTest;
  currentTest?: TestContextTest;
  skip: () => void;
}

/**
 * A simple class that lets us make fake contexts for tests.
 */
export class TestContext implements TestContextInterface {
  public test: TestContextTest | undefined;
  public currentTest: TestContextTest | undefined;
  public skip() {}

  constructor(test: TestContextTest, currentTest: TestContextTest) {
    this.test = test;
    this.currentTest = currentTest;
  }
}

/**
 *
 * @param {Mocha.Context} [testContext]
 * @returns {Recorder}
 */
export function record(
  testContext: TestContextInterface | Mocha.Context,
  recorderEnvironmentSetup: RecorderEnvironmentSetup
): Recorder {
  let recorder: BaseRecorder;
  let testHierarchy: string;
  let testTitle: string;

  // In a hook ("before all" or "before each"), testContext.test points to the hook, while testContext.currentTest
  // points to the individual test that will be run next.  A "before all" hook is run once before all tests,
  // so the hook itself should be used to identify recordings.  However, a "before each" hook is run once before each
  // test, so the individual test should be used instead.
  if ((testContext as any).test!.type == "hook" && testContext.test!.title!.includes("each")) {
    testHierarchy = testContext.currentTest!.parent!.fullTitle();
    testTitle = testContext.currentTest!.title!;
  } else {
    testHierarchy = testContext.test!.parent!.fullTitle();
    testTitle = testContext.test!.title!;
  }

  const stringTest = testContext.currentTest!.fn!.toString();
  // We strip new lines to make it easier for the browser builds to make a predictable output after small changes on the files.
  const currentHash = MD5(stripNewLines(stringTest));
  const testAbsolutePath = testContext.currentTest!.file!;

  if (
    isSoftRecordMode() &&
    !testHasChanged(testHierarchy, testTitle, testAbsolutePath, currentHash)
  ) {
    testContext.test!.title = `${testContext.test!.title} (Test unchanged since last recording)`;
    testContext.skip();
  }

  setEnvironmentOnLoad();

  if (isBrowser()) {
    recorder = new NiseRecorder(currentHash, testHierarchy, testTitle);
  } else {
    recorder = new NockRecorder(currentHash, testHierarchy, testTitle);
  }

  if (isRecordMode()) {
    // If TEST_MODE=record, invokes the recorder, hits the live-service,
    // expects that the appropriate environment variables are present
    recorder.record(recorderEnvironmentSetup);
  } else if (isPlaybackMode()) {
    // If TEST_MODE=playback,
    //  1. sets up the ENV variables
    //  2. invokes the recorder, play the existing test recording.
    setEnvironmentVariables(env, recorderEnvironmentSetup.replaceableVariables);
    recorder.playback(recorderEnvironmentSetup, testAbsolutePath);
  }
  // If TEST_MODE=live, hits the live-service and no recordings are generated.

  return {
    stop: async function() {
      // We check wether we're on record or playback inside of the recorder's stop method.
      if (recorder) {
        await recorder.stop();
      }
    },
    /**
     * `{recorder.skip("node")}` and `{recorder.skip("browser")}` will skip the test in node.js and browser runtimes respectively.
     * `{recorder.skip()}` If the `{runtime}` is undefined, the test will be skipped in both the node and browser runtimes.
     * @param runtime Can either be `"node"` or `"browser"` or `undefined`
     * @param reason Reason for skipping the test
     */
    skip: function(runtime?: "node" | "browser", reason?: string): void {
      if (!reason) reason = "Reason to skip the test is not specified";
      // 1. skipping the test only in node
      // 2. skipping the test only in browser
      // 3. skipping the test in both the node and browser runtimes
      if (
        (runtime === "node" && !isBrowser()) ||
        (runtime === "browser" && isBrowser()) ||
        !runtime
      ) {
        // record/playback modes
        // - test title is updated with the given reason
        // - test is skipped
        if (isRecordMode() || isPlaybackMode()) {
          testContext.test!.title = testContext.test!.title + ` (${reason})`;
          testContext.skip();
        } else {
          // live mode - no effect
        }
      }
    },
    getUniqueName: function(prefix: string, label?: string): string {
      let name: string;
      if (!label) {
        label = prefix;
      }
      if (isRecordMode()) {
        name = getUniqueName(prefix);
        if (recorder.uniqueTestInfo["uniqueName"][label]) {
          throw new Error(
            `getUniqueName: function(prefix: string, label?: string),
            Label "${label}" is already taken,
            please provide a different prefix OR give a new label while keeping the same prefix "${prefix}".`
          );
        } else {
          recorder.uniqueTestInfo["uniqueName"][label] = name;
        }
      } else if (isPlaybackMode()) {
        if (recorder.uniqueTestInfo["uniqueName"]) {
          name = recorder.uniqueTestInfo["uniqueName"][label];
        } else {
          name = (recorder.uniqueTestInfo as any)[label];
        }
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(label: string): Date {
      let date: Date;
      if (isRecordMode()) {
        date = new Date();
        if (recorder.uniqueTestInfo["newDate"][label]) {
          throw new Error(
            `newDate: function(label: string),
            Label "${label}" is already taken, please provide a new label.`
          );
        } else {
          recorder.uniqueTestInfo["newDate"][label] = date.toISOString();
        }
      } else if (isPlaybackMode()) {
        if (recorder.uniqueTestInfo["newDate"]) {
          date = new Date(recorder.uniqueTestInfo["newDate"][label]);
        } else {
          date = new Date((recorder.uniqueTestInfo as any)[label]);
        }
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
