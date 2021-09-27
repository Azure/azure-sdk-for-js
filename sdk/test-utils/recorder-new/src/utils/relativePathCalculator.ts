// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { findRecordingsFolderPath } from "@azure-tools/test-recorder";
import path from "path";
import { RecorderError } from "./utils";

export function relativeRecordingsPathForNode(testContext: Mocha.Test) {
  const testAbsolutePath = testContext.file;
  if (!testAbsolutePath) {
    throw new RecorderError("Unable to grab the file path from the test run");
  }

  const recordingsPath = findRecordingsFolderPath(testAbsolutePath);
  const recordingsFolder = path.basename(recordingsPath);
  const projectFolder = path.basename(path.resolve(recordingsPath, ".."));
  const serviceFolder = path.basename(path.resolve(recordingsPath, "..", ".."));
  const sdk = path.basename(path.resolve(recordingsPath, "..", "..", ".."));
  if (sdk !== "sdk") {
    throw new Error("Unexpected location for recordings, please fix the location.");
  }
  return path
    .join(sdk, serviceFolder, projectFolder, recordingsFolder)
    .split(path.sep)
    .join(path.posix.sep);
}

export function relativeRecordingsPathForBrowser() {
  const pathFormatted = process.cwd();
  const projectFolder = path.basename(pathFormatted);
  const serviceFolder = path.basename(path.resolve(pathFormatted, ".."));
  const sdk = path.basename(path.resolve(pathFormatted, "..", ".."));
  if (sdk !== "sdk") {
    throw new Error("Unexpected location for recordings, please fix the location.");
  }
  return path
    .join(sdk, serviceFolder, projectFolder, "recordings")
    .split(path.sep)
    .join(path.posix.sep);
}
