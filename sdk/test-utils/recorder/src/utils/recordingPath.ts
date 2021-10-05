// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 *     `{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`
 *
 * @param platform A string, either "node" or "browsers".
 * @param testSuiteTitle The title of the test suite.
 * @param testTitle The title of the specific test we're running.
 */
export function generateTestRecordingFilePath(
  platform: "node" | "browsers",
  testSuiteTitle: string,
  testTitle: string,
  extension?: "js" | "json"
): string {
  // File Extension
  // nock recordings for node tests - .js extension
  // recordings are saved in json format for browser tests - .json extension
  const ext = extension ?? (platform === "node" ? "js" : "json");
  return `${platform}/${formatPath(testSuiteTitle)}/recording_${formatPath(testTitle)}.${ext}`;
}
