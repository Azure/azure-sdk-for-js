// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import path from "path";

export function relativeRecordingsPathForNode(testPath: string) {
  // Calculate and return
  return testPath;
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
    .join(sdk, serviceFolder, projectFolder, "recordings/")
    .split(path.sep)
    .join(path.posix.sep);
}
