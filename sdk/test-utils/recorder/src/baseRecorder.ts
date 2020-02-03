// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  isBrowser,
  TestInfo,
  isPlaybackMode,
  isRecordMode,
  RecorderEnvironmentSetup,
  filterSecretsFromStrings,
  filterSecretsRecursivelyFromJSON
} from "./utils";
import { customConsoleLog } from "./customConsoleLog";

export let nock: any;

/**
 * Loads the environment variables in both node and browser modes corresponding to the key-value pairs provided.
 *
 * Example-
 *
 * Suppose `replaceableVariables` is { ACCOUNT_NAME: "my_account_name", ACCOUNT_KEY: "fake_secret" },
 * `setEnvironmentVariables` loads the ACCOUNT_NAME and ACCOUNT_KEY in the environment accordingly.
 * @export
 * @param {{ [key: string]: string }} replaceableVariables
 */
export function setEnvironmentVariables(env: any, replaceableVariables: { [key: string]: string }) {
  Object.keys(replaceableVariables).map((key) => {
    env[key] = replaceableVariables[key];
  });
}

export function setEnvironmentOnLoad() {
  if (!isBrowser() && (isRecordMode() || isPlaybackMode())) {
    nock = require("nock");
  }

  if (isBrowser() && isRecordMode()) {
    customConsoleLog();
  }
}

export abstract class BaseRecorder {
  // relative file path of the test recording inside the `recordings` folder
  // Example - node/some_random_test_suite/recording_first_test.js
  protected readonly relativeTestRecordingFilePath: string;
  public uniqueTestInfo: TestInfo = { uniqueName: {}, newDate: {} };
  public environmentSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {},
    customizationsOnRecordings: [],
    queryParametersToSkip: []
  };

  constructor(platform: "node" | "browsers", testSuiteTitle: string, testTitle: string) {
    // File Extension
    // nock recordings for node tests - .js extension
    // recordings are saved in json format for browser tests - .json extension
    const ext = platform === "node" ? "js" : "json";
    // Filepath - `{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`
    this.relativeTestRecordingFilePath =
      platform +
      "/" +
      this.formatPath(testSuiteTitle) +
      "/recording_" +
      this.formatPath(testTitle) +
      "." +
      ext;
  }

  protected formatPath(path: string): string {
    return path
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/<=/g, "lte")
      .replace(/>=/g, "gte")
      .replace(/</g, "lt")
      .replace(/>/g, "gt")
      .replace(/=/g, "eq")
      .replace(/\W/g, "");
  }

  /**
   * Additional layer of security to avoid unintended/accidental occurrences of secrets in the recordings.
   * If the content is a string, a filtered string is returned.
   * If the content is a JSON object, a filtered JSON object is returned.
   *
   * @protected
   * @param content
   * @returns
   * @memberof BaseRecorder
   */
  protected filterSecrets(content: any): any {
    const recordingFilterMethod =
      typeof content === "string" ? filterSecretsFromStrings : filterSecretsRecursivelyFromJSON;
    return recordingFilterMethod(
      content,
      this.environmentSetup.replaceableVariables,
      this.environmentSetup.customizationsOnRecordings
    );
  }

  public abstract record(environmentSetup: RecorderEnvironmentSetup): void;
  /**
   * Finds the recording for the corresponding test and replays the saved responses from the recording.
   *
   * @abstract
   * @param {string} filePath Test file path (can be obtained from the mocha's context object - Mocha.Context.currentTest)
   * @memberof BaseRecorder
   */
  public abstract playback(environmentSetup: RecorderEnvironmentSetup, filePath: string): void;
  public abstract stop(): void;
}


