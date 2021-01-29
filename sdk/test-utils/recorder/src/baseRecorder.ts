// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  isBrowser,
  TestInfo,
  RecorderEnvironmentSetup,
  filterSecretsFromStrings,
  filterSecretsRecursivelyFromJSON,
  generateTestRecordingFilePath,
  decodeHexEncodingIfExistsInNockFixture,
  handleSingleQuotesInUrlPath
} from "./utils";

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
         public environmentSetup: RecorderEnvironmentSetup = {
           replaceableVariables: {},
           customizationsOnRecordings: [],
           queryParametersToSkip: []
         };
         protected hash: string;
         private defaultCustomizationsOnRecordings = !isBrowser()
           ? [
               // Decodes "hex" strings in the response from the recorded fixture if any exists.
               decodeHexEncodingIfExistsInNockFixture,
               // Nock bug: Single quotes in the path of the url are not handled by nock.
               // The following is the workaround we use in the recorder until nock fixes it.
               handleSingleQuotesInUrlPath
             ]
           : [];

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
           const recordingFilterMethod =
             typeof content === "string"
               ? filterSecretsFromStrings
               : filterSecretsRecursivelyFromJSON;

           return recordingFilterMethod(
             content,
             this.environmentSetup.replaceableVariables,
             this.defaultCustomizationsOnRecordings.concat(
               this.environmentSetup.customizationsOnRecordings
             )
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
         public abstract playback(
           environmentSetup: RecorderEnvironmentSetup,
           filePath: string
         ): void;
         public abstract stop(): Promise<void>;
       }
