// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseRecorder } from "./baseRecorder";
import { findRecordingsFolderPath } from "./utils.node";
import nock from "nock";
import fs from "fs-extra";
import path from "path";

export class NockRecorder extends BaseRecorder {
  constructor(testSuiteTitle: string, testTitle: string) {
    super("node", testSuiteTitle, testTitle);
  }

  public record(): void {
    nock.recorder.rec({
      dont_print: true
    });
  }

  public playback(filePath: string): void {
    /**
     * `@azure/test-utils-recorder` package is used for both the browser and node tests
     *
     * During the playback mode,
     *  `path` module is leveraged to import the node test recordings and `path` module can't be imported in the browser.
     *  So, instead of `import`-ing the `path` library, `require` is being used and this code path is never executed in the browser.
     *
     * [A diiferent strategy is in place to import recordings for browser tests by leveraging `karma` plugins.]
     */
    // Get the full path of the `recordings` folder by navigating through the hierarchy of the test file path.
    const recordingsFolderPath = findRecordingsFolderPath(filePath);
    const recordingPath = path.resolve(recordingsFolderPath, this.relativeTestRecordingFilePath);
    if (fs.existsSync(recordingPath)) {
      this.uniqueTestInfo = require(recordingPath).testInfo;
    } else {
      throw new Error(
        `Recording (${this.relativeTestRecordingFilePath}) is not found at ${recordingsFolderPath}`
      );
    }
  }

  public stop(): void {
    // Importing "nock" library in the recording and appending the testInfo part in the recording
    const importNockStatement =
      "let nock = require('nock');\n" +
      "\n" +
      "module.exports.testInfo = " +
      JSON.stringify(this.uniqueTestInfo) +
      "\n";

    const fixtures = nock.recorder.play();

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
      // We're not matching query string parameters because they may contain sensitive information, and Nock does not allow us to customize it easily
      const updatedFixture = fixture.toString().replace(/\.query\(.*\)/, ".query(true)");
      file.write(this.filterSecrets(updatedFixture) + "\n");
    }

    file.end();

    nock.recorder.clear();
    nock.restore();
  }
}
