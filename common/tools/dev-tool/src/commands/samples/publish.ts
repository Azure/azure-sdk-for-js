// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import os from "os";

import ts from "typescript";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { ProjectInfo, resolveProject } from "../../util/resolveProject";
import { getSampleConfiguration, SampleConfiguration } from "../../util/shouldSkip";

import instantiateSampleReadme from "../../templates/sampleReadme.md";
import { convert } from "./tsToJs";

const log = createPrinter("publish");

/**
 * A helper that allows for wrapping a value in an expression that will yield a
 * warning at runtime.
 */
function withWarning<T>(messageValues: unknown[], v: T): T {
  log.warn(...messageValues, v);
  return v;
}

const PUBLIC_SAMPLES_BASE = "samples-public";

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
    "use-major-version": {
      kind: "string",
      description:
        "override the major version used for publication (ordinarily the version in package.json)"
    }
  } as const
);

/**
 * Provides a way to instantiate a file tree.
 *
 * @param basePath - the ABSOLUTE base of the file tree
 * @returns - a promise that will resolve if the instantiation is successful and reject otherwise.
 */
type FileTreeFactory = (basePath: string) => Promise<void>;

function isAsyncIterable<T>(it: Iterable<T> | AsyncIterable<T>): it is AsyncIterable<T> {
  return (it as AsyncIterable<unknown>)[Symbol.asyncIterator] !== undefined;
}

/**
 * Runs a file tree factory in a temporary directory before copying it for safety.
 */
function temp(worker: FileTreeFactory): FileTreeFactory {
  return async (basePath) => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "devtool"));
    log.debug("Working in temp directory:", tmp);
    await worker(tmp);
    // Now copy and remove the temp
    await fs.copy(tmp, basePath);
    await fs.remove(tmp);
  };
}

function dir(
  name: string,
  contents: Iterable<FileTreeFactory> | AsyncIterable<FileTreeFactory>
): FileTreeFactory {
  return async (basePath) => {
    // Create the directory for this model
    const selfPath = path.join(basePath, name);
    await fs.ensureDir(selfPath);

    if (isAsyncIterable(contents)) {
      for await (const model of contents) {
        await model(selfPath);
      }
    } else {
      for (const model of contents) {
        await model(selfPath);
      }
    }
  };
}

function copy(name: string, source: string): FileTreeFactory {
  return (basePath) => fs.copy(source, path.join(basePath, name));
}

type FileContents = Buffer | string | (() => Buffer | string);

function file(name: string, contentsOrProvider: FileContents): FileTreeFactory {
  const getContentsAsBuffer = (): Buffer => {
    const contents =
      typeof contentsOrProvider === "function" ? contentsOrProvider() : contentsOrProvider;
    return Buffer.isBuffer(contents) ? contents : Buffer.from(contents, "utf8");
  };

  return async (basePath) => fs.writeFile(path.join(basePath, name), getContentsAsBuffer());
}

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
      node: ">=8.0.0"
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
    module: "commonjs",
    moduleResolution: "node",

    allowSyntheticDefaultImports: true,

    strict: true,
    alwaysStrict: true,

    outDir: "dist",
    rootDir: "src"
  },
  include: ["src/**.ts"]
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const defaultKeywords = ["azure", "cloud", "typescript"];

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
}

async function processSources(projectInfo: ProjectInfo, sources: string[]): Promise<ModuleInfo[]> {
  return Promise.all(
    sources.map(async (source) => {
      const sourceText = (await fs.readFile(source)).toString("utf8");

      let summary: string | undefined = undefined;

      const importedModules: string[] = [];

      const relativeSourcePath = path.relative(path.join(projectInfo.path, "samples"), source);

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
            log.error(
              "`import =` is not supported when targetting ECMAScript modules. This dependency will NOT be included."
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
                  `${relativeSourcePath}: unsupported dynamic import: \`${node.getText(
                    sourceFile
                  )}\``
                );
                log.error(
                  "Dynamic imports (`import` expressions or `require` calls) cannot be statically analyzed."
                );
              }
            }
          }

          const tags = ts.getJSDocTags(node);

          // Look for the @summary jsdoc tag as well
          if (summary === undefined && tags.length > 0) {
            for (const tag of tags) {
              if (tag.tagName.text === "summary") {
                summary = tag.comment;
                break;
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
        summary:
          summary ??
          withWarning(
            [
              `${relativeSourcePath} does not include an @summary tag, so it will have an empty table entry.`
            ],
            "<undefined>"
          ),
        importedModules
      };
    })
  );
}

async function getSampleGenerationInfo(
  projectInfo: ProjectInfo,
  topLevelDirectory: string
): Promise<SampleGenerationInfo> {
  const sampleSourcesPath = path.join(projectInfo.path, "samples");
  const sampleSources = (await fs.readdir(sampleSourcesPath))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => path.join(sampleSourcesPath, name));

  const sampleConfiguration = getSampleConfiguration(projectInfo.packageJson);

  const baseName = projectInfo.name.split("/").slice(-1)[0];

  log.debug("Determined project baseName:", baseName);

  const moduleInfos = await processSources(projectInfo, sampleSources);

  const defaultDependencies: Record<string, string> = {
    // If we are a beta package, use "next", otherwise we will use "latest"
    [projectInfo.name]: projectInfo.version.includes("beta") ? "next" : "latest",
    // We use this universally
    dotenv: "latest"
  };

  const { packageJson } = projectInfo;

  return {
    ...sampleConfiguration,
    baseName,
    packageKeywords:
      (projectInfo.packageJson.keywords as string[]) ??
      withWarning(
        [
          "The package.json does not specify keywords (this is a bug!), so default keywords will be used for samples:"
        ],
        defaultKeywords
      ),
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
      withWarning(
        ["The sample configuration does not specify a `productName`, so one was generated:"],
        `Azure ${baseName
          .split("-")
          .map(capitalize)
          .join(" ")}`
      ),
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
                packageJson.devDependencies[dependency] ?? packageJson.dependencies[dependency];
              if (dependencyVersion === undefined) {
                log.error(
                  `Dependency "${dependency}", imported by ${source.filePath}, has an unknown version.`
                );
                log.error(
                  "Specify a version for it by including it in the package's `devDependencies`."
                );
                log.warn('Using `"latest"` as a default version.');
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
              // In TypeScript samples, we include TypeScript and `rimraf`, because it's used
              // in the package scripts.
              devDependencies: {
                typescript: "~4.1.0",
                rimraf: "latest"
              }
            }
          : {})
      };
    }
  };
}

function createReadme(outputKind: OutputKind, info: SampleGenerationInfo): string {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "typescript" : "javascript";

  if (!info.productSlugs && !info.disableDocsMs) {
    log.warn(
      'No extra product slugs provided (`productSlugs` in the sample configuration). Only "azure" will be used!'
    );
    log.warn(
      "There is probably a more specific product that applies to this package! Reach out for help with the docs platform."
    );
    log.warn(
      'If you do not want to publish samples to docs.microsoft.com, set `"disableDocsMs": true` in the sample configuration.'
    );
  }

  return instantiateSampleReadme({
    frontmatter: info.disableDocsMs
      ? undefined
      : {
          page_type: "sample",
          languages: [fullOutputKind],
          products: ["azure", ...(info.productSlugs ?? [])],
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
  const info = await getSampleGenerationInfo(projectInfo, topLevelDirectory);

  // Helper for writing JSON files with a terminating newline
  const jsonify = (value: unknown) => {
    let output = JSON.stringify(value, undefined, 2);
    if (!output.endsWith("\n")) {
      output += "\n";
    }
    return output;
  };

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
          info.moduleInfos.map(({ filePath }) => copy(path.basename(filePath), filePath))
        )
      ]),
      dir("javascript", [
        file("README.md", () => createReadme(OutputKind.JavaScript, info)),
        file("package.json", () => jsonify(createPackageJson(info, OutputKind.JavaScript))),
        copy("sample.env", path.join(projectInfo.path, "sample.env")),
        // Extract the JS Module Text from the module info structures
        ...info.moduleInfos.map(({ filePath, jsModuleText }) =>
          file(path.basename(filePath), jsModuleText)
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
  const majorVersion = `v${options["use-major-version"] ?? projectInfo.version.split(".")[0]}`;

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

  const createCameraReadySamples = await makeSamplesFactory(projectInfo, majorVersion);

  // This creates the samples output
  try {
    await createCameraReadySamples(basePath);
  } catch (ex) {
    log.error("An exception was encountered while instantiating the samples configuration.");
    throw ex;
  }

  log.success("Created camera-ready samples at", outputDirectory);

  return true;
});
