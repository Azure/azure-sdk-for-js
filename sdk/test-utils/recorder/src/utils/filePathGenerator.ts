// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This method is used while generating the file/folder path using the describe/it block titles.
 *
 * Since those titles may contain symbols such as `<`, "=" or even ' ', we'll replace them
 * with strings representing those symbols or with something that reads better as a file name.
 *
 * If a test has some special character that is not being considered here,
 * feel free to add the symbol and its replacement.
 */
export function formatPath(path: string): string {
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
 * Generates a file path with the following structure:
 *
 *     `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 *
 * @param platform A string, either "node" or "browsers".
 * @param testSuiteTitle The title of the test suite.
 * @param testTitle The title of the specific test we're running.
 */
export function generateTestRecordingFilePath(
  platform: "node" | "browsers",
  testSuiteTitle: string,
  testTitle: string
): string {
  // File Extension
  return `${platform}/${formatPath(testSuiteTitle)}/recording_${formatPath(testTitle)}.json`;
}
