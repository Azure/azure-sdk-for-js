// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * This module contains some types and helper values related to information
 * about generating samples.
 */

import { SampleConfiguration } from "./configuration";

export const DEV_SAMPLES_BASE = "samples-dev";
export const PUBLIC_SAMPLES_BASE = "samples";

/**
 * Default TypeScript compiler configuration for sample projects.
 *
 * The default configuration targets ES2018 to support async iteration
 * by default with no `lib` entry.
 */
export const DEFAULT_TYPESCRIPT_CONFIG = {
  compilerOptions: {
    target: "ES2018",
    module: "commonjs",

    moduleResolution: "node",
    resolveJsonModule: true,

    esModuleInterop: true,
    allowSyntheticDefaultImports: true,

    strict: true,
    alwaysStrict: true,

    outDir: "dist",
    rootDir: "src",
  },
  include: ["src/**.ts"],
};

/**
 * The type of samples to output, either:
 * - "js" to output a plain JavaScript package, or
 * - "ts" to output a TypeScript package
 */
export const enum OutputKind {
  TypeScript = "ts",
  JavaScript = "js",
}

/**
 * Information required for generating sample projects.
 */
export interface SampleGenerationInfo extends SampleConfiguration {
  /**
   * The base part of the package name. For example, the base part of "@azure/template" is "template".
   */
  baseName: string;
  /**
   * Whether or not these samples are for a beta package.
   */
  isBeta?: boolean;
  /**
   * The product name that should be used for prose rendering. For example, the product name for
   * @azure/template is "Azure Template", and the product name for @azure/ai-text-analytics is
   * "Azure Text Analytics".
   */
  productName: string;
  /**
   * Optional link to the API reference. If not provided, one will be generated.
   */
  apiRefLink?: string;
  /**
   * The path to the project in the azure-sdk-for-js repo. For example, the repo path for
   * @azure/template is "sdk/template/template". This should _NOT_ include a leading slash.
   */
  projectRepoPath: string;
  /**
   * The keywords associated with the project. For example ["azure", "cloud", "textanalytics", "typescript"];
   */
  packageKeywords: string[];
  /**
   * The path to the sample source files
   */
  sampleSourcesPath: string;
  /**
   * The top-level directory used for generating samples.
   */
  topLevelDirectory: string;
  /**
   * Information about each of the sample sources, including their text in TypeScript and JavaScript,
   * as well as their dependencies.
   */
  moduleInfos: ModuleInfo[];
  /**
   * A function for computing the dependencies to include in a sample package.
   *
   * @param outputKind - the kind of the samples, either "ts" for TypeScript or "js" for JavaScript
   * @returns - an object with `dependencies` and `devDependencies` keys containing the samples' dependencies
   */
  computeSampleDependencies(outputKind: OutputKind): {
    dependencies: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

/**
 * Information about a sample module (source file)
 */
export interface ModuleInfo {
  /**
   * The absolute path to the source.
   */
  filePath: string;
  /**
   * The relative path to the source within the samples tree.
   */
  relativeSourcePath: string;
  /**
   * The contents of the source file.
   */
  text: string;
  /**
   * The transpiled JavaScript Module
   */
  jsModuleText: string;
  /**
   * The description provided by the first doc comment.
   */
  summary?: string;
  /**
   * A list of module specifiers that are imported by this
   * source file.
   */
  importedModules: string[];
  /**
   * A list of the environment variables that the source file uses.
   *
   * These are determined by analyzing the source code for syntactic forms
   * like:
   *
   * `process.env.<Identifier>` and `process.env[<StringLiteral>]`
   */
  usedEnvironmentVariables: string[];
  /**
   * The contents of any `azsdk` JSDoc directives encountered in the module header.
   *
   * {@see AzSdkMetaTags}
   */
  azSdkTags: AzSdkMetaTags;
}

/**
 * Information required to instantiate a sample README file.
 */
export interface SampleReadmeConfiguration extends SampleGenerationInfo {
  /**
   * YAML frontmatter used for publication on docs.microsoft.com.
   */
  frontmatter: unknown;
  /**
   * Whether or not to add the TypeScript-specific bits.
   */
  useTypeScript: boolean;
  /**
   * The camera-ready samples directory name
   */
  publicationDirectory: string;
}

// #region AZSDK Metadata JSDoc Tags

/**
 * Metainformation tags supported through `azsdk`-prefixed jsdoc tags.
 *
 * If you add a property to this type, then you should also add it to
 * {@link VALID_AZSDK_META_TAGS}.
 */
export interface AzSdkMetaTags {
  /**
   * The weight of the sample when generating its entry in the table.
   *
   * Weighted entries are sorted in decreasing order, and unweighted entries
   * are assigned a default value of zero.
   *
   * This field is used to control the ordering of samples, to force certain
   * samples to appear first when they would ordinarily appear later in the
   * table alphabetically.
   */
  weight?: number;
  /**
   * Causes the sample file to be ignored entirely (will skip publication).
   */
  ignore?: boolean;
  /**
   * Causes the file to be omitted from the generated sample index (README).
   */
  util?: boolean;
  /**
   * Causes the sample file to skip JavaScript output.
   */
  "skip-javascript"?: boolean;
}

/**
 * The prefix of an azsdk JSDoc metadata tag.
 */
export const AZSDK_META_TAG_PREFIX = "azsdk-";

/**
 * An array of known metadata tags for validation.
 *
 * If you add a property to {@link AzSdkMetaTags}, then you should add it to
 * the following array.
 */
export const VALID_AZSDK_META_TAGS: Array<keyof AzSdkMetaTags> = [
  "weight",
  "ignore",
  "util",
  "skip-javascript",
];

// #endregion
