// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileInfo } from "../findMatchingFiles.ts";
import { METADATA_KEY } from "../resolveProject.ts";

/**
 * The oldest Node version that we guarantee sample programs will support.
 * Samples may support older versions, but must support at least this version.
 */
export const MIN_SUPPORTED_NODE_VERSION = "22.0.0";

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
   * Product slugs to use on learn.microsoft.com in addition to "azure".
   */
  productSlugs?: string[];
  /**
   * Disable generation of learn.microsoft.com publication metadata.
   */
  disableDocsMs?: boolean;
  /**
   * Link to the API reference documentation. If this is not provided, we
   * assume the API reference is located at
   * `learn.microsoft.com/javascript/api/<packageName>`.
   */
  apiRefLink?: string;
  /**
   * Override sample dependency versions. These dependency versions will be
   * preferred when publishing samples package.json files rather than the
   * versions listed in the package's own dependencies or devDependencies.
   */
  dependencyOverrides?: Record<string, string>;
  /**
   * Specify Azure resources that must exist in order to run the samples. This
   * object is a map from resource name (should be a noun, e.g. "Azure
   * Cognitive Services instance") to URL providing documentation about how to
   * instantiate that resource. You do not need to specify an "Azure
   * Subscription" as a required resource, as this resource is _always_
   * included.
   */
  requiredResources?: Record<string, string>;
  /**
   * Specify optional snippets to include in the README files. The values of
   * these snippets are interpreted as paths to files that will be included in
   * the final README markdown verbatim.
   */
  customSnippets?: {
    /**
     * A snippet to be included at the top of the file, directly beneath the
     * title.
     *
     * This snippet is useful for providing important information about changes
     * or deprecations.
     */
    header?: string;
    /**
     * A snippet that specifies extra prerequisites for the samples, shown
     * beneath the list of required resources.
     */
    prerequisites?: string;
    /**
     * A snippet to be included at the bottom of the file.
     */
    footer?: string;
  };
  /**
   * Specify extra files or directories that should be copied into the samples
   * directory, represented as a map from source files (relative to the package
   * root), to destination paths (relative to the samples output path, e.g.
   * `samples/v1`).
   *
   * @example
   *
   * ```javascript
   * "//metadata": {
   *   "sampleConfiguration": {
   *     ...,
   *     "extraFiles": {
   *       "./assets": ["typescript/assets", "javascript/assets"]
   *     }
   *   },
   *   ...
   * }
   * ```
   */
  extraFiles?: Record<string, string[]>;
  /**
   * Overrides the path used to create README links. This is only useful for testing.
   *
   * @hidden
   */
  overridePublicationLinkFragment?: string;
}

declare global {
  interface PackageJson {
    /**
     * The sample configuration for the package.
     *
     * Will be undefined for internal and non-client packages.
     *
     * @deprecated use `<package.json>["//metadata"].sampleConfiguration` instead
     */
    "//sampleConfiguration"?: SampleConfiguration;
  }
}

/**
 * Gets the sample configuration for a package.
 *
 * @param packageJson - the package.json of the package to get the sample configuration for
 * @returns the sample configuration for the package
 */
export function getSampleConfiguration(packageJson: PackageJson): SampleConfiguration {
  return (
    packageJson[METADATA_KEY]?.sampleConfiguration ?? packageJson["//sampleConfiguration"] ?? {}
  );
}

/**
 * A single problem discovered while validating a sample configuration against
 * its expected schema.
 */
export interface SampleConfigurationProblem {
  /**
   * A dot-path to the offending property, relative to the sample configuration
   * object. The root object itself is represented by ".".
   */
  path: string;
  /**
   * A human-readable, actionable description of the problem.
   */
  message: string;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * A validator returns `undefined` when a value is acceptable, or a short
 * message describing why it is not.
 */
type PropertyValidator = (value: unknown) => string | undefined;

const isString: PropertyValidator = (value) =>
  typeof value === "string" ? undefined : "must be a string";

const isBoolean: PropertyValidator = (value) =>
  typeof value === "boolean" ? undefined : "must be a boolean";

const isStringArray: PropertyValidator = (value) =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string")
    ? undefined
    : "must be an array of strings";

const isStringRecord: PropertyValidator = (value) =>
  isPlainObject(value) && Object.values(value).every((entry) => typeof entry === "string")
    ? undefined
    : "must be an object mapping strings to strings";

const isStringArrayRecord: PropertyValidator = (value) =>
  isPlainObject(value) &&
  Object.values(value).every(
    (entry) => Array.isArray(entry) && entry.every((item) => typeof item === "string"),
  )
    ? undefined
    : "must be an object mapping strings to arrays of strings";

const KNOWN_CUSTOM_SNIPPET_KEYS = ["header", "prerequisites", "footer"];

const isCustomSnippets: PropertyValidator = (value) => {
  if (!isPlainObject(value)) {
    return "must be an object";
  }
  for (const [key, entry] of Object.entries(value)) {
    if (!KNOWN_CUSTOM_SNIPPET_KEYS.includes(key)) {
      return `has unknown property "${key}" (known properties: ${KNOWN_CUSTOM_SNIPPET_KEYS.join(", ")})`;
    }
    if (typeof entry !== "string") {
      return `property "${key}" must be a string`;
    }
  }
  return undefined;
};

/**
 * The expected schema for a sample configuration, derived from the
 * {@link SampleConfiguration} interface. Every recognized property maps to a
 * validator that checks the property's value.
 */
const SAMPLE_CONFIGURATION_SCHEMA: Record<keyof SampleConfiguration, PropertyValidator> = {
  skipFolder: isBoolean,
  skip: isStringArray,
  productName: isString,
  productSlugs: isStringArray,
  disableDocsMs: isBoolean,
  apiRefLink: isString,
  dependencyOverrides: isStringRecord,
  requiredResources: isStringRecord,
  customSnippets: isCustomSnippets,
  extraFiles: isStringArrayRecord,
  overridePublicationLinkFragment: isString,
};

const KNOWN_SAMPLE_CONFIGURATION_KEYS = Object.keys(SAMPLE_CONFIGURATION_SCHEMA);

/**
 * Validates a sample configuration object against the {@link SampleConfiguration}
 * schema, returning a list of problems.
 *
 * A misspelled or misplaced property (for example `skipFolders` instead of
 * `skipFolder`) is silently ignored by {@link getSampleConfiguration}, which can
 * cause samples to be generated or published incorrectly. This function makes
 * such drift visible by rejecting unknown properties and values whose types do
 * not match the schema.
 *
 * @param configuration - the value of a `sampleConfiguration` field to validate
 * @returns an array of problems; an empty array means the configuration is valid
 */
export function validateSampleConfiguration(configuration: unknown): SampleConfigurationProblem[] {
  const problems: SampleConfigurationProblem[] = [];

  if (!isPlainObject(configuration)) {
    problems.push({ path: ".", message: "sample configuration must be a JSON object" });
    return problems;
  }

  for (const [key, value] of Object.entries(configuration)) {
    const validator = SAMPLE_CONFIGURATION_SCHEMA[key as keyof SampleConfiguration];
    if (!validator) {
      problems.push({
        path: key,
        message: `unknown property "${key}" (known properties: ${KNOWN_SAMPLE_CONFIGURATION_KEYS.join(", ")})`,
      });
      continue;
    }

    const message = validator(value);
    if (message) {
      problems.push({ path: key, message: `"${key}" ${message}` });
    }
  }

  return problems;
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
export function shouldSkip(info: FileInfo, skips: string[]): boolean {
  // Add a slash to the skip if necessary
  const addFirstSlash = (skip: string): string => (skip.startsWith("/") ? skip : "/" + skip);

  // Helper for testing against a single skip entry
  const shouldSkipSingle = (skip: string): boolean =>
    removeJsTsExtensions(info.name) === skip ||
    removeJsTsExtensions(info.fullPath) === skip ||
    (skip.includes("/") && removeJsTsExtensions(info.fullPath).endsWith(addFirstSlash(skip)));

  return skips.map(removeJsTsExtensions).some((skip) => shouldSkipSingle(skip));
}
