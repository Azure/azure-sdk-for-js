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
import {
  AzSdkMetaTags,
  AZSDK_META_TAG_PREFIX,
  DEFAULT_TYPESCRIPT_CONFIG,
  ModuleInfo,
  OutputKind,
  SampleGenerationInfo,
  VALID_AZSDK_META_TAGS
} from "../../util/sampleGenerationInfo";

import instantiateSampleReadme from "../../templates/sampleReadme.md";
import { convert } from "./tsToJs";

import devToolPackageJson from "../../../package.json";
import { findMatchingFiles } from "../../util/findMatchingFiles";
import { EOL } from "os";

const log = createPrinter("publish");

const DEV_SAMPLES_BASE = "samples-dev";
const PUBLIC_SAMPLES_BASE = "samples";

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

function createPackageJson(info: SampleGenerationInfo, outputKind: OutputKind): unknown {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "TypeScript" : "JavaScript";
  return {
    name: `azure-${info.baseName}-samples-${outputKind}`,
    private: true,
    version: "1.0.0",
    description: `${info.productName} client library samples for ${fullOutputKind}`,
    engines: {
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
    homepage: `https://github.com/Azure/azure-sdk-for-js/tree/main/${info.projectRepoPath}`,
    ...info.computeSampleDependencies(outputKind)
  };
}

/**
 * Determines whether a module specifier is a package dependency.
 *
 * A dependency is a module specifier that does not refer to a node builtin and
 * is not a relative path.
 *
 * Absolute path imports are not supported in samples (because the package base
 * is not fixed relative to the source file).
 *
 * @param moduleSpecifier - the string given to `import` or `require`
 * @returns - true if `moduleSpecifier` should be considered a reference to a
 * node module dependency
 */
function isDependency(moduleSpecifier: string): boolean {
  if (nodeBuiltins.includes(moduleSpecifier)) return false;

  // This seems like a reasonable test for "is a relative path" as long as
  // absolute path imports are forbidden.
  const isRelativePath = /^\.\.?[/\\]/.test(moduleSpecifier);
  return !isRelativePath;
}

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
        if (summary === undefined) {
          for (const tag of tags) {
            log.debug(`File ${relativeSourcePath} has tag ${tag.tagName.text}`);

            // New TS introduced comment: NodeArray, so we join the text if it is made of many nodes.
            const comment = Array.isArray(tag.comment)
              ? tag.comment.map((node: ts.JSDocText) => node.text ?? " ").join(" ")
              : (tag.comment as string | undefined);

            if (tag.tagName.text === "summary") {
              log.debug("Found summary tag on node:", node.getText(sourceFile));
              // Replace is required due to multi-line splitting messing with table formatting
              summary = comment?.replace(/\s*\r?\n\s*/g, " ");
            } else if (tag.tagName.text.startsWith(`${AZSDK_META_TAG_PREFIX}`)) {
              // We ran into an `azsdk` directive in the metadata
              const metaTag = tag.tagName.text.replace(
                new RegExp(`^${AZSDK_META_TAG_PREFIX}`),
                ""
              ) as keyof AzSdkMetaTags;
              log.debug(`File ${relativeSourcePath} has azsdk tag ${tag.tagName.text}`);
              if (VALID_AZSDK_META_TAGS.includes(metaTag)) {
                const trimmedComment = comment?.trim();
                // If there was _no_ comment, then we can assume it is a boolean tag
                // and so being specified at all is an indication that we should use
                // `true`
                azSdkTags[metaTag as keyof AzSdkMetaTags] = trimmedComment
                  ? JSON.parse(trimmedComment)
                  : true;
              } else {
                log.warn(
                  `Invalid azsdk tag ${metaTag}. Valid tags include ${VALID_AZSDK_META_TAGS}`
                );
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

    const jsModuleText = convert(sourceText, {
      fileName: source,
      transformers: {
        before: [sourceProcessor]
      }
    });

    if (summary === undefined && azSdkTags.util !== true) {
      log.debug(azSdkTags.util, summary);
      fail(
        `${relativeSourcePath} does not include an @summary tag and is not marked as a util (using @azsdk-util true).`
      );
    }

    return {
      filePath: source,
      relativeSourcePath,
      text: sourceText,
      jsModuleText,
      summary,
      importedModules: importedModules.filter(isDependency),
      usedEnvironmentVariables,
      azSdkTags
    };
  });

  return Promise.all(jobs);
}

async function collect<T>(i: AsyncIterableIterator<T>): Promise<T[]> {
  const out = [];

  for await (const v of i) {
    out.push(v);
  }

  return out;
}

/**
 * Processes a segmented module path to return the first segment. This is useful for packages that have nested imports
 * such as "dayjs/plugin/duration".
 *
 * @param specifier - the module specifier to resolve to a package name
 * @returns a package name
 */
function resolveModule(specifier: string): string {
  const parts = specifier.split("/", 2);

  // The first part could be a namespace, in which case we need to join them
  if (parts.length > 1 && parts[0].startsWith("@")) return parts[0] + "/" + parts[1];
  else return parts[0];
}

/**
 * Extracts the sample generation metainformation from the sample sources and
 * configuration in package.json.
 *
 * This is the function that assembles all the information that the templates
 * use to generate good output.
 */
async function makeSampleGenerationInfo(
  projectInfo: ProjectInfo,
  topLevelDirectory: string,
  onError: () => void
): Promise<SampleGenerationInfo> {
  const sampleSourcesPath = path.join(projectInfo.path, DEV_SAMPLES_BASE);

  const sampleSources = await collect(
    findMatchingFiles(sampleSourcesPath, (name) => name.endsWith(".ts"))
  );

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
    // to adjust using the sample configuration.
    productName:
      sampleConfiguration.productName ??
      fail(`The sample configuration does not specify a "productName".`),
    apiRefLink: sampleConfiguration.apiRefLink,
    sampleSourcesPath,
    topLevelDirectory,
    moduleInfos,
    // Resolve snippets to actual text
    customSnippets: Object.entries(sampleConfiguration.customSnippets ?? {}).reduce(
      (accum, [name, file]) => {
        if (!file) {
          return accum;
        }

        let contents;

        try {
          contents = fs.readFileSync(file);
        } catch (ex) {
          fail(`Failed to read custom snippet file '${file}'`, ex);
        }
        return {
          ...accum,
          [name]: contents
        };
      },
      {} as SampleConfiguration["customSnippets"]
    ),
    computeSampleDependencies(outputKind: OutputKind) {
      // Store the `@types/*` packages the TS samples might need.
      const typesDependencies: { [packageName: string]: string } = {};
      return {
        dependencies: moduleInfos.reduce((prev, source) => {
          const current: Record<string, string> = {};
          for (const dependency of source.importedModules.map(resolveModule)) {
            if (prev[dependency] === undefined) {
              const dependencyVersion =
                sampleConfiguration.dependencyOverrides?.[dependency] ??
                packageJson.devDependencies[dependency] ??
                packageJson.dependencies[dependency];
              if (dependencyVersion === undefined) {
                log.error(
                  `Dependency "${dependency}", imported by ${source.filePath}, has an unknown version. (Are you missing "./" for a relative path?)`
                );
                log.error(
                  `Specify a version for "${dependency}" by including it in the package's "devDependencies".`
                );
              }

              current[dependency] = dependencyVersion;
              // It would be really weird to depend on `@types/*` in a source file but if we did
              // it'd be handled above.
              if (dependency.indexOf("@types/") !== 0) {
                const typeDependency = `@types/${dependency}`;
                const typeDependencyVersion =
                  sampleConfiguration.dependencyOverrides?.[typeDependency] ??
                  packageJson.devDependencies[typeDependency] ??
                  packageJson.dependencies[typeDependency];

                if (typeDependencyVersion) {
                  typesDependencies[typeDependency] = typeDependencyVersion;
                }
              }
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
              ...typesDependencies,
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
    ...info,
    moduleInfos: info.moduleInfos.filter((mod) => mod.summary !== undefined)
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

  const info = await makeSampleGenerationInfo(projectInfo, topLevelDirectory, onError);

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
    return (
      content
        .replace(new RegExp(`^\\s*\\*\\s*@${AZSDK_META_TAG_PREFIX}.*\n`, "gm"), "")
        // We also need to clean up extra blank lines that might be left behind by
        // removing azsdk tags. These regular expressions are extremely frustrating
        // because they deal almost exclusively in the literal "/" and "*" characters.
        .replace(/(\s+\*)+\//s, EOL + " */")
        // Clean up blank lines at the beginning
        .replace(/\/\*\*(\s+\*)*/s, `/**${EOL} *`)
        // Finally remove empty doc comments.
        .replace(/\s*\/\*\*(\s+\*)*\/\s*/s, EOL + EOL)
    );
  }

  // We use a tempdir at the outer layer to avoid creating dirty trees
  return temp(
    dir(topLevelDirectory, [
      dir("typescript", [
        file("README.md", () => createReadme(OutputKind.TypeScript, info)),
        file("package.json", () => jsonify(createPackageJson(info, OutputKind.TypeScript))),
        // All of the tsconfigs we use for samples should be the same.
        file("tsconfig.json", () => jsonify(DEFAULT_TYPESCRIPT_CONFIG)),
        copy("sample.env", path.join(projectInfo.path, "sample.env")),
        // We copy the samples sources in to the `src` folder on the typescript side
        dir(
          "src",
          info.moduleInfos.map(({ relativeSourcePath, filePath }) =>
            file(relativeSourcePath, () => postProcess(fs.readFileSync(filePath)))
          )
        )
      ]),
      dir("javascript", [
        file("README.md", () => createReadme(OutputKind.JavaScript, info)),
        file("package.json", () => jsonify(createPackageJson(info, OutputKind.JavaScript))),
        copy("sample.env", path.join(projectInfo.path, "sample.env")),
        // Extract the JS Module Text from the module info structures
        ...info.moduleInfos.map(({ relativeSourcePath, jsModuleText }) =>
          file(relativeSourcePath.replace(/\.ts$/, ".js"), () => postProcess(jsModuleText))
        )
      ]),
      // Copy extraFiles by reducing all configured destinations for each input file
      ...Object.entries(info.extraFiles ?? {}).reduce(
        (accum, [source, destinations]) => [
          ...accum,
          ...destinations.map((dest) => copy(dest, source))
        ],
        [] as FileTreeFactory[]
      )
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
    log.error((ex as Error).message);
    return false;
  }

  log.success("Created camera-ready samples at", outputDirectory);

  return true;
});
