import fs from "fs-extra";
import path from "path";
import { copy, dir, file, FileTreeFactory, lazy, safeClean, temp } from "../fileTree";
import { findMatchingFiles } from "../findMatchingFiles";
import { createPrinter } from "../printer";
import { ProjectInfo, resolveRoot } from "../resolveProject";
import {
  getSampleConfiguration,
  MIN_SUPPORTED_NODE_VERSION,
  SampleConfiguration,
} from "./configuration";
import {
  AZSDK_META_TAG_PREFIX,
  DEFAULT_TYPESCRIPT_CONFIG,
  DEV_SAMPLES_BASE,
  OutputKind,
  SampleGenerationInfo,
} from "./info";
import { processSources } from "./processor";

import devToolPackageJson from "../../../package.json";
import instantiateSampleReadme from "../../templates/sampleReadme.md";
import { resolveModule } from "./transforms";

const log = createPrinter("generator");

export function createPackageJson(info: SampleGenerationInfo, outputKind: OutputKind): unknown {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "TypeScript" : "JavaScript";
  return {
    name: `@azure-samples/${info.baseName}-${outputKind}${info.isBeta ? "-beta" : ""}`,
    private: true,
    version: "1.0.0",
    description: `${info.productName} client library samples for ${fullOutputKind}${
      info.isBeta ? " (Beta)" : ""
    }`,
    engines: {
      node: `>=${MIN_SUPPORTED_NODE_VERSION}`,
    },
    ...(outputKind === OutputKind.TypeScript
      ? {
          // We only include these in TypeScript
          scripts: {
            build: "tsc",
            prebuild: "rimraf dist/",
          },
        }
      : {}),
    repository: {
      type: "git",
      url: "git+https://github.com/Azure/azure-sdk-for-js.git",
      directory: info.overridePublicationLinkFragment ?? info.projectRepoPath,
    },
    keywords: info.packageKeywords,
    author: "Microsoft Corporation",
    license: "MIT",
    bugs: {
      url: "https://github.com/Azure/azure-sdk-for-js/issues",
    },
    homepage: `https://github.com/Azure/azure-sdk-for-js/tree/main/${
      info.overridePublicationLinkFragment ?? info.projectRepoPath
    }`,
    ...info.computeSampleDependencies(outputKind),
  };
}

async function collect<T>(i: AsyncIterableIterator<T>): Promise<T[]> {
  const out = [];

  for await (const v of i) {
    out.push(v);
  }

  return out;
}

/**
 * Extracts the sample generation meta-information from the sample sources and
 * configuration in package.json.
 *
 * This is the function that assembles all the information that the templates
 * use to generate good output.
 */
export async function makeSampleGenerationInfo(
  projectInfo: ProjectInfo,
  sampleSourcesPath: string,
  topLevelDirectory: string,
  onError: () => void
): Promise<SampleGenerationInfo> {
  const sampleSources = await collect(
    findMatchingFiles(sampleSourcesPath, (name) => name.endsWith(".ts") && !name.endsWith(".d.ts"))
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

  const requireInScope = (moduleSpecifier: string) => {
    try {
      return require(path.join(
        projectInfo.path,
        "node_modules",
        moduleSpecifier.split("/").join(path.sep)
      ));
    } catch {
      return require(moduleSpecifier);
    }
  };

  const moduleInfos = await processSources(sampleSourcesPath, sampleSources, fail, requireInScope);

  const defaultDependencies: Record<string, string> = {
    // If we are a beta package, use "next", otherwise we will use "latest"
    [projectInfo.name]: projectInfo.version.includes("beta") ? "next" : "latest",
    // We use this universally
    dotenv: "latest",
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
          contents = fs.readFileSync(path.resolve(projectInfo.path, file));
        } catch (ex) {
          fail(`Failed to read custom snippet file '${file}'`, ex);
        }
        return {
          ...accum,
          [name]: contents,
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
            ...current,
          };
        }, defaultDependencies),
        ...(outputKind === OutputKind.TypeScript
          ? {
              // In TypeScript samples, we include TypeScript and `rimraf`, because they're used
              // in the package scripts as well as @types/node.
              devDependencies: {
                ...typesDependencies,
                "@types/node": `^${MIN_SUPPORTED_NODE_VERSION}`,
                typescript: devToolPackageJson.dependencies.typescript,
                rimraf: "latest",
              },
            }
          : {}),
      };
    },
  };
}

/**
 * Calls the template to instantiate the sample README for this configuration
 * and output kind.
 */
export function createReadme(
  outputKind: OutputKind,
  info: SampleGenerationInfo,
  publicationDirectory: string
): string {
  const fullOutputKind = outputKind === OutputKind.TypeScript ? "typescript" : "javascript";

  return instantiateSampleReadme({
    frontmatter: info.disableDocsMs
      ? undefined
      : {
          page_type: "sample",
          languages: [fullOutputKind],
          products: info.productSlugs,
          urlFragment: `${info.baseName}-${fullOutputKind}${info.isBeta ? "-beta" : ""}`,
        },
    publicationDirectory: publicationDirectory.split(path.sep).join("/"),
    useTypeScript: outputKind === OutputKind.TypeScript,
    ...info,
    moduleInfos: info.moduleInfos.filter((mod) => mod.summary !== undefined),
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
export async function makeSamplesFactory(
  projectInfo: ProjectInfo,
  sourcePath?: string
): Promise<FileTreeFactory> {
  let hadError = false;

  const onError = () => {
    hadError = true;
  };

  const isBeta = /-beta/.test(projectInfo.version);
  const majorVersion = projectInfo.version.split(".")[0];
  const versionFolder = `v${majorVersion}${isBeta ? "-beta" : ""}`;

  const repoRoot = await resolveRoot();

  log.debug("Computed full generation path:", versionFolder);

  const finalSourcePath = sourcePath ?? path.join(projectInfo.path, DEV_SAMPLES_BASE);

  const info = await makeSampleGenerationInfo(projectInfo, finalSourcePath, versionFolder, onError);
  info.isBeta = isBeta;

  // Ambient declarations ().d.ts files) are excluded from the compile graph in the transpiler. We will still copy them
  // into typescript/src so that they will be availabled for transpilation.
  const dtsFiles: Array<[string, string]> = [];
  for await (const name of findMatchingFiles(finalSourcePath, (name) => name.endsWith(".d.ts"))) {
    dtsFiles.push([path.relative(finalSourcePath, name), name]);
  }

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
        .replace(/(\s+\*)+\//s, "\n */")
        // Clean up blank lines at the beginning
        .replace(/\/\*\*(\s+\*)*/s, `/**\n *`)
        // Finally remove empty doc comments.
        .replace(/\s*\/\*\*(\s+\*)*\/\s*/s, "\n\n")
    );
  }

  // We use a tempdir at the outer layer to avoid creating dirty trees
  return dir(
    versionFolder,
    safeClean(
      lazy((outputDirectory) =>
        temp(
          dir(".", [
            dir("typescript", [
              file("README.md", () =>
                createReadme(OutputKind.TypeScript, info, path.relative(repoRoot, outputDirectory))
              ),
              file("package.json", () => jsonify(createPackageJson(info, OutputKind.TypeScript))),
              // All of the tsconfigs we use for samples should be the same.
              file("tsconfig.json", () => jsonify(DEFAULT_TYPESCRIPT_CONFIG)),
              copy("sample.env", path.join(projectInfo.path, "sample.env")),
              // We copy the samples sources in to the `src` folder on the typescript side
              dir("src", [
                ...info.moduleInfos.map(({ relativeSourcePath, filePath }) =>
                  file(relativeSourcePath, () => postProcess(fs.readFileSync(filePath)))
                ),
                ...dtsFiles.map(([relative, absolute]) =>
                  file(relative, fs.readFileSync(absolute))
                ),
              ]),
            ]),
            dir("javascript", [
              file("README.md", () =>
                createReadme(OutputKind.JavaScript, info, path.relative(repoRoot, outputDirectory))
              ),
              file("package.json", () => jsonify(createPackageJson(info, OutputKind.JavaScript))),
              copy("sample.env", path.join(projectInfo.path, "sample.env")),
              // Extract the JS Module Text from the module info structures
              ...info.moduleInfos
                // Only include the modules if they were not skipped
                .filter(({ azSdkTags: { "skip-javascript": skip } }) => !skip)
                .map(({ relativeSourcePath, jsModuleText }) =>
                  file(relativeSourcePath.replace(/\.ts$/, ".js"), () => postProcess(jsModuleText))
                ),
            ]),
            // Copy extraFiles by reducing all configured destinations for each input file
            ...Object.entries(info.extraFiles ?? {}).reduce(
              (accum, [source, destinations]) => [
                ...accum,
                ...destinations.map((dest) => copy(dest, path.resolve(projectInfo.path, source))),
              ],
              [] as FileTreeFactory[]
            ),
          ])
        )
      )
    )
  );
}
