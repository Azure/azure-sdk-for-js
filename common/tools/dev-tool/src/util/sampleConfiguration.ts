// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {FileInfo} from "./findMatchingFiles";

/**
 * An interface for the sample configuration metadata within an Azure SDK for
 * JavaScript package.json file.
 */
export interface SampleConfiguration {
  /**
   * If specified as true, should skip the entire folder for CI/Smoke Tests
   */
  skipFolder?: boolean;
  /**
   * The names of sample files to skip (if a file extension is provided, it
   * will be ignored)
   */
  skip?: string[];
  /**
   * Optionally override the default method of generating a product name.
   */
  productName?: string;
  /**
   * Product slugs to use on docs.microsoft.com in addition to "azure".
   */
  productSlugs?: string[];
  /**
   * Disable generation of docs.microsoft.com publication metadata.
   */
  disableDocsMs?: boolean;
  /**
   * Link to the API reference documentation. If this is not provided, we
   * assume the API reference is located at
   * `docs.microsoft.com/javascript/api/<packageName>`.
   */
  apiRefLink?: string;
  /**
   * Override sample dependency versions. These dependency versions will be
   * preferred when publishing samples package.json files rather than the
   * versions listed in the package's own dependencies or devDependencies.
   */
  dependencyOverrides?: Record<string, string>;
}

export const SAMPLE_CONFIGURATION_KEY = "//sampleConfiguration";

declare global {
  interface PackageJson {
    /**
     * The sample configuration for the package.
     *
     * Will be undefined for internal and non-client packages.
     */
    [SAMPLE_CONFIGURATION_KEY]?: SampleConfiguration;
  }
}

export function getSampleConfiguration(packageJson: PackageJson): SampleConfiguration {
  return packageJson[SAMPLE_CONFIGURATION_KEY] ?? {};
}

/**
 * A helper function for removing ".js"/".ts" from the end of a string
 */
const removeJsTsExtensions = (name: string): string => name.replace(/\.[jt]s$/, "");

/**
 * Determines whether or not a `skip` entry from the sample configuration
 * should match a given sample `FileInfo`.
 *
 * A FileInfo is considered to be "skipped" if _any_ string in the `skips`
 * matches the file according one of the following two rules, where a file
 * extension of ".js"/".ts" is _always_ ignored in the file's name or full
 * path, and a forward slash is _always_ added at the beginning of the skip
 * string if it does not already exist:
 *
 * - the skip string does not contain a forward slash and the skip string is
 *   strictly equal to the file name
 * - the file's full path ends with the entire skip string
 *
 * @param info - FileInfo of a sample file to be considered
 * @param skips - a list of strings that identify files to be skipped
 */
export function shouldSkip(info: FileInfo, skips: string[]) {
  // Add a slash to the skip if necessary
  const addFirstSlash = (skip: string): string => (skip.startsWith("/") ? skip : "/" + skip);

  // Helper for testing against a single skip entry
  const shouldSkipSingle = (skip: string): boolean =>
    removeJsTsExtensions(info.name) === skip ||
    removeJsTsExtensions(info.fullPath) === skip ||
    (skip.includes("/") && removeJsTsExtensions(info.fullPath).endsWith(addFirstSlash(skip)));

  return skips.map(removeJsTsExtensions).some((skip) => shouldSkipSingle(skip));
}
