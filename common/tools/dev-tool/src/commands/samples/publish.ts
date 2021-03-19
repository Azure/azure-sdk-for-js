// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This module is the core of the samples publication system.
 *
 * It handles collecting, checking, and processing all of the package's data
 * that are eventually used to generate a coherent set of sample programs.
 */

import fs from "fs-extra";
import path from "path";

import nodeBuiltins from "builtin-modules";
import ts from "typescript";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { copy, dir, file, temp, FileTreeFactory } from "../../util/fileTree";
import { createPrinter } from "../../util/printer";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";
import {
  getSampleConfiguration,
  MIN_SUPPORTED_NODE_VERSION,
  SampleConfiguration
} from "../../util/sampleConfiguration";

import instantiateSampleReadme from "../../templates/sampleReadme.md";
import { convert } from "./tsToJs";

import devToolPackageJson from "../../../package.json";

const log = createPrinter("publish");

const DEV_SAMPLES_BASE = "samples-dev";
const PUBLIC_SAMPLES_BASE = "samples";

const AZSDK_META_TAG_PREFIX = "azsdk-";

export const commandInfo = makeCommandInfo(
  "publish",
  `make a "camera-ready" copy of a package's samples`,
  {
    "output-path": {
      kind: "string",
      description: "specify the path of the output directory where the samples will be written",
      shortName: "o"
    },
    force: {
      kind: "boolean",
      description:
        "force writing of samples, even if the output directory is not empty (will delete everything in the output directory)",
      shortName: "f",
      default: false
    },
    "override-major-version": {
      kind: "string",
      description:
        "override the major version used for publication (ordinarily the version in package.json)"
    }
  } as const
);

const enum OutputKind {
  TypeScript = "ts",
  JavaScript = "js"
}

interface SampleGenerationInfo extends SampleConfiguration {
  /**
   * The base part of the package name. For example, the base part of "@azure/template" is "template".
   */
  baseName: string;
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
  computeSampleDependencies(
    outputKind: OutputKind
  ): {
    dependencies: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

function createPackageJson(info: SampleGenerationInfo, outputKind: OutputKind): unknown {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "TypeScript" : "JavaScript";
  return {
    name: `azure-${info.baseName}-samples-${outputKind}`,
    private: true,
    version: "0.1.0",
    description: `${info.productName} client library samples for ${fullOutputKind}`,
    engine: {
      node: `>=${MIN_SUPPORTED_NODE_VERSION}`
    },
    ...(outputKind === OutputKind.TypeScript
      ? {
          // We only include these in TypeScript
          scripts: {
            build: "tsc",
            prebuild: "rimraf dist/"
          }
        }
      : {}),
    repository: {
      type: "git",
      url: "git+https://github.com/Azure/azure-sdk-for-js.git",
      directory: info.projectRepoPath
    },
    keywords: info.packageKeywords,
    author: "Microsoft Corporation",
    license: "MIT",
    bugs: {
      url: "https://github.com/Azure/azure-sdk-for-js/issues"
    },
    homepage: `https://github.com/Azure/azure-sdk-for-js/tree/master/${info.projectRepoPath}`,
    ...info.computeSampleDependencies(outputKind)
  };
}

const defaultTypeScriptConfig = {
  compilerOptions: {
    target: "ES6",
    module: "commonjs",
    moduleResolution: "node",

    esModuleInterop: true,
    allowSyntheticDefaultImports: true,

    strict: true,
    alwaysStrict: true,

    outDir: "dist",
    rootDir: "src"
  },
  include: ["src/**.ts"]
};

interface ModuleInfo {
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
  summary: string;
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
 * Metainformation tags supported through `azsdk`-prefixed jsdoc tags.
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
   * Causes the sample file to skip JavaScript output.
   */
  "skip-javascript"?: boolean;
}

const validAzSdkTags: Array<keyof AzSdkMetaTags> = ["weight", "ignore", "skip-javascript"];

async function processSources(
  projectInfo: ProjectInfo,
  sources: string[],
  fail: (...values: unknown[]) => never
): Promise<ModuleInfo[]> {
  const jobs = sources.map(async (source) => {
    const sourceText = (await fs.readFile(source)).toString("utf8");

    let summary: string | undefined = undefined;

    const importedModules: string[] = [];
    const usedEnvironmentVariables: string[] = [];
    const azSdkTags: AzSdkMetaTags = {};

    const relativeSourcePath = path.relative(path.join(projectInfo.path, DEV_SAMPLES_BASE), source);

    const sourceProcessor: ts.TransformerFactory<ts.SourceFile> = (context) => (
      sourceFile: ts.SourceFile
    ) => {
      const visitor: ts.Visitor = (node: ts.Node) => {
        if (ts.isImportDeclaration(node)) {
          importedModules.push((node.moduleSpecifier as ts.StringLiteral).text);
        } else if (ts.isImportEqualsDeclaration(node)) {
          log.error(
            `${relativeSourcePath}: unsupported \`import =\` declaration: \`${node.getText(
              sourceFile
            )}\`.`
          );
          fail(
            [
              "`import =` is not supported when targetting ECMAScript modules.",
              "This dependency will NOT be included in your package's dependencies."
            ].join(" ")
          );
        } else if (ts.isCallExpression(node)) {
          const {
            expression,
            arguments: [firstArgument]
          } = node;
          if (
            (ts.isIdentifier(expression) && expression.text === "require") ||
            expression.kind === ts.SyntaxKind.ImportKeyword
          ) {
            if (ts.isStringLiteralLike(firstArgument)) {
              importedModules.push(firstArgument.text);
            } else {
              log.error(
                `${relativeSourcePath}: unsupported dynamic import: \`${node.getText(sourceFile)}\``
              );
              fail(
                "Dynamic imports (`import` expressions or `require` calls) cannot be statically analyzed."
              );
            }
          }
        } else if (
          ts.isPropertyAccessExpression(node) ||
          (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression))
        ) {
          // Magic that finds out what environment variables you're using in the sources.
          if (node.expression.getText(sourceFile) === "process.env") {
            const value: string = ts.isElementAccessExpression(node)
              ? (node.argumentExpression as ts.StringLiteral).text
              : node.name.text;

            usedEnvironmentVariables.push(value);
          }
        }
        const tags = ts.getJSDocTags(node);

        // Look for the @summary jsdoc tag block as well
        if (summary === undefined && tags.some(({ tagName: { text } }) => text === "summary")) {
          for (const tag of tags) {
            if (tag.tagName.text === "summary") {
              log.debug("Found summary tag on node:", node.getText(sourceFile));
              // Replace is required due to multi-line splitting messing with table formatting
              summary = tag.comment?.replace(/\s*\n\s*/, " ");
            } else if (
              tag.tagName.text.startsWith(`${AZSDK_META_TAG_PREFIX}`) &&
              tag.comment !== undefined
            ) {
              // We ran into an `azsdk` directive in the metadata
              const metaTag = tag.tagName.text.replace(
                new RegExp(`^${AZSDK_META_TAG_PREFIX}`),
                ""
              ) as keyof AzSdkMetaTags;
              if (validAzSdkTags.includes(metaTag)) {
                azSdkTags[metaTag as keyof AzSdkMetaTags] = JSON.parse(tag.comment);
              } else {
                log.warn(`Invalid azsdk tag ${metaTag}. Valid tags include ${validAzSdkTags}`);
              }
            }
          }
        }

        ts.visitEachChild(node, visitor, context);
        return node;
      };

      ts.visitNode(sourceFile, visitor);
      return sourceFile;
    };

    return {
      filePath: source,
      relativeSourcePath,
      text: sourceText,
      jsModuleText: convert(sourceText, {
        fileName: source,
        transformers: {
          before: [sourceProcessor]
        }
      }),
      summary: summary ?? fail(`${relativeSourcePath} does not include an @summary tag.`),
      importedModules: importedModules.filter((name) => !nodeBuiltins.includes(name)),
      usedEnvironmentVariables,
      azSdkTags
    };
  });

  return Promise.all(jobs);
}

/**
 * Extracts the sample generation metainformation from the sample sources and
 * configuration in package.json.
 *
 * This is the function that assembles all the information that the templates
 * use to generate good output.
 */
async function getSampleGenerationInfo(
  projectInfo: ProjectInfo,
  topLevelDirectory: string,
  onError: () => void
): Promise<SampleGenerationInfo> {
  const sampleSourcesPath = path.join(projectInfo.path, DEV_SAMPLES_BASE);
  const sampleSources = (await fs.readdir(sampleSourcesPath))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => path.join(sampleSourcesPath, name));

  const sampleConfiguration = getSampleConfiguration(projectInfo.packageJson);

  const baseName = projectInfo.name.split("/").slice(-1)[0];

  log.debug("Determined project baseName:", baseName);

  // A helper to handle configuration errors.
  function fail(...values: unknown[]): never {
    log.error(...values);
    onError();
    return undefined as never;
  }

  const moduleInfos = await processSources(projectInfo, sampleSources, fail);

  const defaultDependencies: Record<string, string> = {
    // If we are a beta package, use "next", otherwise we will use "latest"
    [projectInfo.name]: projectInfo.version.includes("beta") ? "next" : "latest",
    // We use this universally
    dotenv: "latest"
  };

  const { packageJson } = projectInfo;

  if (!sampleConfiguration.productSlugs && !sampleConfiguration.disableDocsMs) {
    log.error("No extra product slugs provided (`productSlugs` in the sample configuration).");
    log.warn(
      "There is probably a more specific product that applies to this package! Reach out for help with the docs platform."
    );
    log.warn(
      'If you do not want to publish samples to docs.microsoft.com, set `"disableDocsMs": true` in the sample configuration.'
    );
    onError();
  }

  return {
    ...sampleConfiguration,
    baseName,
    packageKeywords:
      projectInfo.packageJson.keywords ??
      fail(`The package.json for ${projectInfo.name} does not specify "keywords".`),
    projectRepoPath:
      "sdk/" +
      projectInfo.path
        .split(path.sep + "sdk" + path.sep)
        .slice(-1)[0]
        .replace("\\", "/"),
    // This'll be good enough most of the time, but products like Azure Form Recognizer will have
    // too adjust using the sample configuration.
    productName:
      sampleConfiguration.productName ??
      fail(`The sample configuration does not specify a "productName".`),
    apiRefLink: sampleConfiguration.apiRefLink,
    sampleSourcesPath,
    topLevelDirectory,
    moduleInfos,
    computeSampleDependencies(outputKind: OutputKind) {
      return {
        dependencies: moduleInfos.reduce((prev, source) => {
          const current: Record<string, string> = {};
          for (const dependency of source.importedModules) {
            if (prev[dependency] === undefined) {
              const dependencyVersion =
                sampleConfiguration.dependencyOverrides?.[dependency] ??
                packageJson.devDependencies[dependency] ??
                packageJson.dependencies[dependency];
              if (dependencyVersion === undefined) {
                log.error(
                  `Dependency "${dependency}", imported by ${source.filePath}, has an unknown version.`
                );
                log.error(
                  "Specify a version for it by including it in the package's `devDependencies`."
                );
              }

              current[dependency] = dependencyVersion;
            }
          }
          return {
            ...prev,
            ...current
          };
        }, defaultDependencies),
        ...(outputKind === OutputKind.TypeScript
          ? {
              // In TypeScript samples, we include TypeScript and `rimraf`, because they're used
              // in the package scripts.
              devDependencies: {
                typescript: devToolPackageJson.dependencies.typescript,
                rimraf: "latest"
              }
            }
          : {})
      };
    }
  };
}

/**
 * Calls the template to instantiate the sample README for this configuration
 * and output kind.
 */
function createReadme(outputKind: OutputKind, info: SampleGenerationInfo): string {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "typescript" : "javascript";

  return instantiateSampleReadme({
    frontmatter: info.disableDocsMs
      ? undefined
      : {
          page_type: "sample",
          languages: [fullOutputKind],
          products: info.productSlugs,
          urlFragment: `${info.baseName}-${fullOutputKind}`
        },
    publicationDirectory: PUBLIC_SAMPLES_BASE + "/" + info.topLevelDirectory,
    useTypeScript: outputKind === OutputKind.TypeScript,
    ...info
  });
}

/**
 * Create a filesystem tree factory representing a camera-ready samples
 * tree.
 *
 * @param packageBasePath - the path to the SDK client package (where package.json resides)
 * @param topLevelDirectory - the name of the top-level directory to create when instantiating the tree
 * @param config - the SampleConfiguration to use during generation (ordinarily defined in package.json)
 */
async function makeSamplesFactory(
  projectInfo: ProjectInfo,
  topLevelDirectory: string
): Promise<FileTreeFactory> {
  let hadError = false;

  const onError = () => {
    hadError = true;
  };

  const info = await getSampleGenerationInfo(projectInfo, topLevelDirectory, onError);

  if (hadError) {
    throw new Error("Instantiation of sample metadata information failed with errors.");
  }

  // Helper for writing JSON files with a terminating newline
  const jsonify = (value: unknown) => {
    let output = JSON.stringify(value, undefined, 2);
    if (!output.endsWith("\n")) {
      output += "\n";
    }
    return output;
  };

  /**
   * Helper to remove azsdk- directives from the resulting module code.
   */
  function postProcess(moduleText: string | Buffer): string {
    const content = Buffer.isBuffer(moduleText) ? moduleText.toString("utf8") : moduleText;
    return content.replace(new RegExp(`^\\s*\\*\\s*@${AZSDK_META_TAG_PREFIX}.*\n`, "gm"), "");
  }

  // We use a tempdir at the outer layer to avoid creating dirty trees
  return temp(
    dir(topLevelDirectory, [
      dir("typescript", [
        file("README.md", () => createReadme(OutputKind.TypeScript, info)),
        file("package.json", () => jsonify(createPackageJson(info, OutputKind.TypeScript))),
        // All of the tsconfigs we use for samples should be the same.
        file("tsconfig.json", () => jsonify(defaultTypeScriptConfig)),
        copy("sample.env", path.join(projectInfo.path, "sample.env")),
        // We copy the samples sources in to the `src` folder on the typescript side
        dir(
          "src",
          info.moduleInfos.map(({ filePath }) =>
            file(path.basename(filePath), () => postProcess(fs.readFileSync(filePath)))
          )
        )
      ]),
      dir("javascript", [
        file("README.md", () => createReadme(OutputKind.JavaScript, info)),
        file("package.json", () => jsonify(createPackageJson(info, OutputKind.JavaScript))),
        copy("sample.env", path.join(projectInfo.path, "sample.env")),
        // Extract the JS Module Text from the module info structures
        ...info.moduleInfos.map(({ filePath, jsModuleText }) =>
          file(path.basename(filePath).replace(/\.ts$/, ".js"), () => postProcess(jsModuleText))
        )
      ])
    ])
  );
}

/**
 * "Publishes" samples by creating copies of the existing samples sources that
 * have the associated metadata used to publish samples.
 */
export default leafCommand(commandInfo, async (options) => {
  const projectInfo = await resolveProject(process.cwd());

  // This will become the name of the directory
  const majorVersion = `v${options["override-major-version"] ?? projectInfo.version.split(".")[0]}`;

  log.info(`Creating camera-ready samples for ${projectInfo.name}@${projectInfo.version}`);

  const basePath = options["output-path"] ?? path.join(projectInfo.path, PUBLIC_SAMPLES_BASE);

  const outputDirectory = path.join(basePath, majorVersion);

  log.info("Using output path:", outputDirectory);

  // We'll do a few checks to make sure we don't blow up important files on accident.
  if (await fs.pathExists(outputDirectory)) {
    const stats = await fs.stat(outputDirectory);
    if (!stats.isDirectory) {
      log.error(`Output directory ${outputDirectory} exists and is a file.`);
      log.error("Refusing to continue. Delete the file or specify a different output directory.");
      return false;
    } else if (!options.force) {
      log.error(
        `Output directory ${outputDirectory} exists. Pass --force to delete it and create the new directory anyway.`
      );
      return false;
    } else {
      log.warn("Deleting existing samples directory:", outputDirectory);
      await fs.remove(outputDirectory);
    }
  }

  // This creates the samples output
  try {
    // Gather sample metainformation and use it to assemble a template
    await makeSamplesFactory(projectInfo, majorVersion).then((factory) => {
      // This is where the actual magic of creating the output from the template happens
      return factory(basePath);
    });
  } catch (ex) {
    log.error(ex.message);
    return false;
  }

  log.success("Created camera-ready samples at", outputDirectory);

  return true;
});
