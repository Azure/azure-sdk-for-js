// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { isBrowser, escapeRegExp, env, TestInfo, isPlaybackMode, isRecordMode } from "./utils.common";
import { customConsoleLog } from "./customConsoleLog";

let replaceableVariables: { [x: string]: string } = {};
export function setReplaceableVariables(a: { [x: string]: string }): void {
  replaceableVariables = a;
  if (isPlaybackMode()) {
    // Providing dummy values to avoid the error
    Object.keys(a).map((k) => {
      env[k] = a[k];
    });
  }
}

let replacements: any[] = [];
export function setReplacements(maps: any): void {
  replacements = maps;
}

export let queryParameters: string[] = [];
/**
 *  Query Parameters, for example from the SAS token may contain sensitive information.
 *  Query Parameters provided by calling this method will be skipped.
 * @param {string[]} [params] Query Parameters to be skipped
 */
export function skipQueryParams(params: string[]): void {
  queryParameters = params;
}

export function setEnvironmentOnLoad() {
  if (isBrowser() && isRecordMode()) {
    customConsoleLog();
  }
}

export abstract class BaseRecorder {
  // relative file path of the test recording inside the `recordings` folder
  // Example - node/some_random_test_suite/recording_first_test.js
  protected readonly relativeTestRecordingFilePath: string;
  public uniqueTestInfo: TestInfo = { uniqueName: {}, newDate: {} };

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
   * Additional layer of security to avoid unintended/accidental occurrences of secrets in the recordings
   * */
  protected filterSecrets(recording: string): string {
    let updatedRecording = recording;
    for (const k of Object.keys(replaceableVariables)) {
      if (env[k]) {
        const escaped = escapeRegExp(env[k]);
        updatedRecording = updatedRecording.replace(
          new RegExp(escaped, "g"),
          replaceableVariables[k]
        );
      }
    }
    for (const map of replacements) {
      updatedRecording = map(updatedRecording);
    }

    return updatedRecording;
  }

  public abstract record(): void;
  /**
   * Finds the recording for the corresponding test and replays the saved responses from the recording.
   *
   * @abstract
   * @param {string} filePath Test file path (can be obtained from the mocha's context object - Mocha.Context.currentTest)
   * @memberof BaseRecorder
   */
  public abstract playback(filePath: string): void;
  public abstract stop(): void;
}
