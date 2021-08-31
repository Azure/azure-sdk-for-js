// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BaseRecorder } from "./baseRecorder";
import { RecorderEnvironmentSetup, isRecordMode, isPlaybackMode } from "./utils";
import { nodeRequireRecordingIfExists } from "./utils/recordings";

import { config as readEnvFile } from "dotenv";
import fs from "fs-extra";
import { applyRequestBodyTransformationsOnFixture } from "./utils/requestBodyTransform";
import { mockMsalAuth, NockType } from "./utils/msalAuth.node";
import { isNode } from "@azure/core-http";

let nock: NockType;

export class NockRecorder extends BaseRecorder {
  constructor(hash: string, testSuiteTitle: string, testTitle: string) {
    super("node", hash, testSuiteTitle, testTitle);
  }

  public record(recorderEnvironmentSetup: RecorderEnvironmentSetup): void {
    super.init(recorderEnvironmentSetup);
    nock.recorder.rec({
      dont_print: true
    });
  }

  public playback(recorderEnvironmentSetup: RecorderEnvironmentSetup, testFilePath: string): void {
    super.init(recorderEnvironmentSetup);
    /**
     * `@azure-tools/test-recorder` package is used for both the browser and node tests
     *
     * During the playback mode,
     *  `path` module is leveraged to import the node test recordings and `path` module can't be imported in the browser.
     *  So, instead of `import`-ing the `path` library, `require` is being used and this code path is never executed in the browser.
     *
     * [A different strategy is in place to import recordings for browser tests by leveraging `karma` plugins.]
     */
    this.uniqueTestInfo = nodeRequireRecordingIfExists(
      this.relativeTestRecordingFilePath,
      testFilePath
    ).testInfo;

    if (isNode) {
      // The following call provides the fake access_token in playback for the msal /oauth2/v2.0/token requests by not matching the request body
      mockMsalAuth(nock, recorderEnvironmentSetup.onLoadCallbackForPlayback);
    }
  }

  public async stop(): Promise<void> {
    if (isRecordMode()) {
      // Importing "nock" library in the recording and appending the testInfo part in the recording
      const importNockStatement =
        "let nock = require('nock');\n" +
        "\n" +
        `module.exports.hash = "${this.hash}";\n` +
        "\n" +
        "module.exports.testInfo = " +
        JSON.stringify(this.uniqueTestInfo) +
        "\n";

      const fixtures = nock.recorder.play() as string[]; // We know it is an array of strings at this point

      // Create the directories recursively incase they don't exist
      try {
        // Stripping away the filename from the filepath and retaining the directory structure
        fs.ensureDirSync(
          "./recordings/" +
            this.relativeTestRecordingFilePath.substring(
              0,
              this.relativeTestRecordingFilePath.lastIndexOf("/") + 1
            )
        );
      } catch (err) {
        if (err.code !== "EEXIST") throw err;
      }

      const file = fs.createWriteStream("./recordings/" + this.relativeTestRecordingFilePath, {
        flags: "w"
      });

      // Some tests expect errors to happen and, if a writing error is thrown in one of these tests, it may be captured in a catch block by accident,
      // resulting in unexpected behavior. For this reason we're printing it to the console as well
      file.on("error", (err: any) => {
        console.log(err);
        throw err;
      });

      file.write(importNockStatement);

      // Saving the recording to the file
      for (const fixture of fixtures) {
        let updatedFixture = fixture;
        // Applying any requestBody transformations that are provided
        updatedFixture = applyRequestBodyTransformationsOnFixture(
          "node",
          fixture,
          this.environmentSetup.requestBodyTransformations
        );

        // We're not matching query string parameters because they may contain sensitive information, and Nock does not allow us to customize it easily
        updatedFixture = updatedFixture.toString().replace(/\.query\(.*\)/, ".query(true)");
        file.write(this.filterSecrets(updatedFixture) + "\n");
      }

      file.end();

      nock.recorder.clear();
      nock.restore();
    } else if (isPlaybackMode()) {
      nock.restore();
      nock.cleanAll();
      nock.enableNetConnect();
    }
  }
}

/**
 * Creates an instance of the recorder that is appropriate for the current
 * environment.
 */
export function createRecorder(
  currentHash: string,
  testHierarchy: string,
  testTitle: string
): BaseRecorder {
  // Initialize the environment
  readEnvFile();

  if (isRecordMode() || isPlaybackMode()) {
    nock = require("nock");
    if (!nock.isActive()) {
      // Nock's restore will also remove the http interceptor itself.
      // We need to run nock.activate() to re-activate the http interceptor. Without re-activation, nock will not intercept any calls.
      nock.activate();
    }
  }

  return new NockRecorder(currentHash, testHierarchy, testTitle);
}
