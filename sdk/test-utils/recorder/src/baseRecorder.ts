// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { defaultCustomizationsOnRecordings } from "./defaultCustomizations";
import {
  TestInfo,
  RecorderEnvironmentSetup,
  filterSecretsFromStrings,
  filterSecretsRecursivelyFromJSON,
  generateTestRecordingFilePath
} from "./utils";
import {
  defaultRequestBodyTransforms,
  RequestBodyTransformsType
} from "./utils/requestBodyTransform";

type InternalRecorderEnvironmentSetup = RecorderEnvironmentSetup & {
  /**
   * Used in record and playback modes
   *
   *  Array of callback functions provided to customize the request body
   *  - Record mode: These callbacks will be applied on the request body before the recording is saved
   *  - Playback mode: These callbacks will be applied on the request body of the new requests
   *
   * // Nock doesn't support multiple `.filteringRequestBody` patches in the recordings,
   * // ..hence not exporting `requestBodyTransformations` to the users until we find an alternative
   * // TODO: Best alternative would be to migrate to JSON recordings for node tests
   */
  requestBodyTransformations: Required<RequestBodyTransformsType>;
};
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

export abstract class BaseRecorder {
  // relative file path of the test recording inside the `recordings` folder
  // Example - node/some_random_test_suite/recording_first_test.js
  protected readonly relativeTestRecordingFilePath: string;
  public uniqueTestInfo: TestInfo = { uniqueName: {}, newDate: {} };
  public environmentSetup: InternalRecorderEnvironmentSetup = {
    replaceableVariables: {},
    customizationsOnRecordings: [],
    queryParametersToSkip: [],
    requestBodyTransformations: defaultRequestBodyTransforms
  };
  protected hash: string;
  private defaultCustomizationsOnRecordings = defaultCustomizationsOnRecordings;

  constructor(
    platform: "node" | "browsers",
    hash: string,
    testSuiteTitle: string,
    testTitle: string
  ) {
    this.hash = hash;
    this.relativeTestRecordingFilePath = generateTestRecordingFilePath(
      platform,
      testSuiteTitle,
      testTitle
    );
  }

  /**
   * Additional layer of security to avoid unintended/accidental occurrences of secrets in the recordings.
   * If the content is a string, a filtered string is returned.
   * If the content is a JSON object, a filtered JSON object is returned.
   *
   * @protected
   * @param content
   * @memberof BaseRecorder
   */
  protected filterSecrets(content: any): any {
    let updatedContent = content;
    if (typeof content !== "string") {
      // For the recording as a whole...
      // Methods such as maskAccessTokenInBrowserRecording may have effects here
      for (const customization of this.defaultCustomizationsOnRecordings) {
        updatedContent = customization(updatedContent);
      }
    }

    const recordingFilterMethod =
      typeof updatedContent === "string"
        ? filterSecretsFromStrings
        : filterSecretsRecursivelyFromJSON;

    return recordingFilterMethod(
      updatedContent,
      this.environmentSetup.replaceableVariables,
      this.defaultCustomizationsOnRecordings.concat(
        this.environmentSetup.customizationsOnRecordings
      )
    );
  }

  public init(environmentSetup: RecorderEnvironmentSetup) {
    this.environmentSetup = {
      replaceableVariables: {
        ...this.environmentSetup.replaceableVariables,
        ...environmentSetup.replaceableVariables
      },
      customizationsOnRecordings: [
        ...this.environmentSetup.customizationsOnRecordings,
        ...environmentSetup.customizationsOnRecordings
      ],
      queryParametersToSkip: [
        ...this.environmentSetup.queryParametersToSkip,
        ...environmentSetup.queryParametersToSkip
      ],
      requestBodyTransformations: {
        // TODO: Concat with the requestBodyTransformations once exposed
        stringTransforms: this.environmentSetup.requestBodyTransformations?.stringTransforms,
        jsonTransforms: this.environmentSetup.requestBodyTransformations?.jsonTransforms
      }
    };
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
  public abstract stop(): Promise<void>;
}
