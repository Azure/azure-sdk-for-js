// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { Project } from "ts-morph";
import { createPrinter } from "../../util/printer";
import { resolveRoot } from "../../util/resolveProject";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { run } from "../../util/run";
import stripJsonComments from "strip-json-comments";
import { codemods } from "../../util/admin/migrate-package/codemods";

const log = createPrinter("migrate-package");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rushJson: any = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  const rushJsonText = await readFile(resolve(__dirname, "../../../../../../rush.json"), "utf-8");

  return (_rushJson = JSON.parse(stripJsonComments(rushJsonText)));
}

/**
 * The shape of a rush.json `projects` entry.
 */
export interface RushJsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;

  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

export const commandInfo = makeCommandInfo(
  "migrate-package",
  "migrates a package to ESM and vitest",
  {
    "package-name": {
      description: "The name of the package to migrate",
      kind: "string",
    },
    browser: {
      description: "Generate browser test config",
      kind: "boolean",
      default: true,
    },
  },
);

async function commitChanges(projectFolder: string, message: string): Promise<void> {
  log.info("Committing changes, message: ", message);
  await run(["git", "add", "."], { cwd: projectFolder });
  await run(["git", "commit", "--allow-empty", "-m", `Migration: ${message}`], {
    cwd: projectFolder,
  });
}

export default leafCommand(commandInfo, async ({ "package-name": packageName, browser }) => {
  const root = await resolveRoot();

  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  const project = projects.find((p: RushJsonProject) => p.packageName === packageName);
  if (!project) {
    log.error(`Package ${packageName} not found in rush.json`);
    return false;
  }

  const projectFolder = resolve(root, project.projectFolder);

  await prepareFiles(projectFolder, { browser });
  await applyCodemods(projectFolder);

  log.info("Formatting files");
  await run(["rushx", "format"], { cwd: projectFolder });
  await commitChanges(projectFolder, "rushx format");

  log.info(
    "Done. Please run `rush update`, `rush build -t <project-name>`, and run tests to verify the changes.",
  );

  return true;
});

async function prepareFiles(projectFolder: string, options: { browser: boolean }): Promise<void> {
  log.info("Migrating package.json, tsconfig.json, and api-extractor.json");
  await upgradePackageJson(projectFolder, resolve(projectFolder, "package.json"));
  await upgradeTypeScriptConfig(resolve(projectFolder, "tsconfig.json"));
  await fixApiExtractorConfig(resolve(projectFolder, "api-extractor.json"));
  await commitChanges(projectFolder, "Update package.json, tsconfig.json, and api-extractor.json");

  log.info("Migrating test config");
  if (options.browser) {
    await writeBrowserTestConfig(projectFolder);
    await writeFile(resolve(projectFolder, "vitest.browser.config.ts"), VITEST_BROWSER_CONFIG);
  }
  await writeFile(resolve(projectFolder, "vitest.config.ts"), VITEST_CONFIG);
  await commitChanges(projectFolder, "Update test config");

  log.info("Cleaning up files");
  await cleanupFiles(projectFolder);
  await commitChanges(projectFolder, "Clean up files");
}

async function applyCodemods(projectFolder: string): Promise<void> {
  const project = new Project({ tsConfigFilePath: resolve(projectFolder, "tsconfig.json") });

  // Apply the codemods, one at a time, to all source files in the project.
  // Commit the changes after each codemod is applied for ease of reviewing.
  // For more information on the codemods and how to contribute, see the `codemods` directory.
  for (const mod of codemods) {
    log.info(`Applying codemod: ${mod.name}`);
    for (const sourceFile of project.getSourceFiles()) {
      mod(sourceFile);
      await sourceFile.save();
    }
    await commitChanges(projectFolder, `Apply codemod: "${mod.name}"`);
  }
}

const VITEST_CONFIG = `
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["test/**/*.spec.ts"],
    },
  }),
);
`;

const VITEST_BROWSER_CONFIG = `
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
`;

async function writeBrowserTestConfig(packageFolder: string): Promise<void> {
  const testConfig = {
    extends: "./.tshy/build.json",
    include: ["./src/**/*.ts", "./src/**/*.mts", "./test/**/*.spec.ts", "./test/**/*.mts"],
    exclude: ["./test/**/node/**/*.ts"],
    compilerOptions: {
      outDir: "./dist-test/browser",
      rootDir: ".",
      skipLibCheck: true,
    },
  };

  await saveJson(resolve(packageFolder, "tsconfig.browser.config.json"), testConfig);
}

async function fixApiExtractorConfig(apiExtractorJsonPath: string): Promise<void> {
  const apiExtractorJson = JSON.parse(await readFile(apiExtractorJsonPath, "utf-8"));

  const oldPath = apiExtractorJson.dtsRollup.publicTrimmedFilePath;
  const projectName = basename(oldPath, ".d.ts");

  apiExtractorJson.mainEntryPointFilePath = "dist/esm/index.d.ts";
  apiExtractorJson.dtsRollup.publicTrimmedFilePath = `dist/${projectName}.d.ts`;

  // TODO: Clean up the betaTrimmedFilePath
  delete apiExtractorJson.dtsRollup.betaTrimmedFilePath;

  await saveJson(apiExtractorJsonPath, apiExtractorJson);
}

async function cleanupFiles(projectFolder: string): Promise<void> {
  // Remove the old test files
  const filesToRemove = ["karma.conf.js", "karma.conf.cjs", ".nycrc"];
  for (const file of filesToRemove) {
    try {
      await unlink(resolve(projectFolder, file));
    } catch {
      log.warn(`Could not remove ${file}`);
    }
  }
}

async function upgradeTypeScriptConfig(tsconfigPath: string): Promise<void> {
  const tsConfig = JSON.parse(await readFile(tsconfigPath, "utf-8"));

  // Set module resolution
  tsConfig.compilerOptions.module = "NodeNext";
  tsConfig.compilerOptions.moduleResolution = "NodeNext";
  tsConfig.compilerOptions.rootDir = ".";
  tsConfig.include = [
    "src/**/*.ts",
    "src/**/*.mts",
    "src/**/*.cts",
    "samples-dev/**/*.ts", // TODO: Check if samples-dev is needed
    "test/**/*.ts",
    "test/**/*.mts",
    "test/**/*.cts",
  ];

  // Remove old options
  delete tsConfig.compilerOptions.outDir;
  delete tsConfig.compilerOptions.declarationDir;

  await saveJson(tsconfigPath, tsConfig);
}

async function upgradePackageJson(projectFolder: string, packageJsonPath: string): Promise<void> {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

  // Change the module type to ESM
  packageJson.type = "module";

  // Remove the legacy packages
  removeLegacyPackages(packageJson);

  // Add the new packages
  await addNewPackages(packageJson);

  // Sort the devDependencies
  sortPackage(packageJson);

  // Add tshy
  addTypeScriptHybridizer(packageJson);

  // Set files
  setFilesSection(packageJson);

  // Set scripts
  setScriptsSection(packageJson.scripts);

  // Rename files and rewrite browser field
  await renameFieldFiles("browser", "browser", projectFolder, packageJson);
  await renameFieldFiles("react-native", "native", projectFolder, packageJson);
  packageJson.browser = "./dist/browser/index.js";
  delete packageJson["react-native"];

  // Save the updated package.json
  await saveJson(packageJsonPath, packageJson);
}

function setScriptsSection(scripts: PackageJson["scripts"]): void {
  scripts["build"] = "npm run clean && dev-tool run build-package && dev-tool run extract-api";

  scripts["unit-test:browser"] =
    "npm run clean && dev-tool run build-package && dev-tool run build-test && dev-tool run test:vitest --browser";
  scripts["unit-test:node"] = "dev-tool run test:vitest";

  for (const script of Object.keys(scripts)) {
    if (scripts[script].includes("tsc -p .")) {
      log.info(`Replacing usage of "tsc -p ." with "dev-tool run build-package" in ${script}`);
      scripts[script] = scripts[script].replace("tsc -p .", "dev-tool run build-package");
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setFilesSection(packageJson: any): void {
  packageJson.files = ["dist/", "README.md", "LICENSE"];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addTypeScriptHybridizer(packageJson: any): void {
  packageJson["tshy"] = {
    exports: {
      "./package.json": "./package.json",
      ".": "./src/index.ts",
    },
    dialects: ["esm", "commonjs"],
    esmDialects: ["browser", "react-native"],
    selfLink: false,
  };

  // Check if there are subpath exports
  if (packageJson.exports) {
    for (const key of Object.keys(packageJson.exports)) {
      // Don't set for package.json or root
      if (key !== "." && key !== "./package.json") {
        packageJson["tshy"].exports[key] = `./src/${key.replace("./", "")}/index.ts`;
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function addNewPackages(packageJson: any): Promise<void> {
  const newPackages = {
    "@azure-tools/test-utils-vitest": "1.0.0",
    "@vitest/browser": undefined,
    "@vitest/coverage-istanbul": undefined,
    playwright: undefined,
    vitest: undefined,
  };

  for (const [newPackage, desiredMinVersion] of Object.entries(newPackages)) {
    let latestVersion = desiredMinVersion;
    if (!latestVersion) {
      // Get the latest version from npm
      latestVersion = (
        await run(["npm", "view", newPackage, "version"], {
          captureOutput: true,
        })
      ).output;
    }
    packageJson.devDependencies[newPackage] = `^${latestVersion.replace("\n", "")}`;
  }

  const packagesToUpdate = [
    { package: "@azure-tools/test-credential", version: "^2.0.0" },
    { package: "@azure-tools/test-recorder", version: "^4.1.0" },
  ];

  // Update additional if there
  for (const { package: packageName, version } of packagesToUpdate) {
    if (packageJson.devDependencies[packageName]) {
      packageJson.devDependencies[packageName] = version;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeLegacyPackages(packageJson: any): void {
  const legacyPackages = [
    "chai",
    "chai-as-promised",
    "chai-exclude",
    "mocha",
    "sinon",
    "karma",
    "karma-chrome-launcher",
    "karma-coverage",
    "karma-env-preprocessor",
    "karma-firefox-launcher",
    "karma-json-preprocessor",
    "karma-json-to-file-reporter",
    "karma-junit-reporter",
    "karma-mocha",
    "karma-mocha-reporter",
    "karma-sourcemap-loader",
    "karma-source-map-support",
    "nyc",
    "puppeteer",
    "source-map-support",
    "ts-node",
    "uglify-js",
    "@types/chai-as-promised",
    "@types/mocha",
    "@types/chai",
    "@types/sinon",
    "@azure-tools/test-utils",
  ];
  for (const legacyPackage of legacyPackages) {
    if (packageJson.devDependencies[legacyPackage]) {
      delete packageJson.devDependencies[legacyPackage];
    }
  }
}

function sortObjectByKeys(unsortedObj: { [key: string]: string }): { [key: string]: string } {
  const sortedEntries = Object.entries(unsortedObj).sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(sortedEntries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortPackage(packageJson: any): void {
  if (packageJson.dependencies) {
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }
  if (packageJson.devDependencies) {
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
  }
  if (packageJson.peerDependencies) {
    packageJson.peerDependencies = sortObjectByKeys(packageJson.peerDependencies);
  }
  if (packageJson.scripts) {
    packageJson.scripts = sortObjectByKeys(packageJson.scripts);
  }
}

async function renameFieldFiles(
  field: string,
  altFieldName: string,
  packageFolder: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJson: any,
): Promise<void> {
  if (packageJson[field]) {
    // Iterate over the entries in the given field
    for (const value of Object.values(packageJson[field])) {
      if (!value) {
        continue;
      }

      // Resolve the paths relative to the package folder
      const destinationPath = value as string;
      if (!destinationPath.includes(altFieldName)) {
        continue;
      }

      const oldPath = resolve(
        packageFolder,
        "src",
        destinationPath.replace("./dist-esm/src/", "").replace(".js", ".ts"),
      );
      let newFileName = basename(oldPath, ".ts");
      // Remove the prefix from the filename
      newFileName = newFileName.replace(`.${altFieldName}`, "") + `-${field}.mts`;
      const newPath = resolve(dirname(oldPath), newFileName);

      try {
        // Rename the file
        await rename(oldPath, newPath);
      } catch {
        log.warn(`Could not rename ${oldPath} to ${newPath}`);
      }
    }
  }
}

function saveJson(filePath: string, json: unknown): ReturnType<typeof writeFile> {
  const fileContents = JSON.stringify(json, null, 2) + "\n"; // ensure file ends in blank line per repo rules
  return writeFile(filePath, fileContents);
}
