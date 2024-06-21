// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { Project, SourceFile } from "ts-morph";
import { createPrinter } from "../../util/printer";
import { resolveRoot } from "../../util/resolveProject";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { existsSync, lstatSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { run } from "../../util/run";
import stripJsonComments from "strip-json-comments";

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
  },
);

export default leafCommand(commandInfo, async ({ "package-name": packageName }) => {
  const root = await resolveRoot();

  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  const project = projects.find((p: RushJsonProject) => p.packageName === packageName);
  if (!project) {
    log.error(`Package ${packageName} not found in rush.json`);
    return false;
  }

  const projectFolder = resolve(root, project.projectFolder);

  await upgradePackageJson(projectFolder, resolve(projectFolder, "package.json"));
  await upgradeTypeScriptConfig(resolve(projectFolder, "tsconfig.json"));
  await fixApiExtractorConfig(resolve(projectFolder, "api-extractor.json"));
  await cleanupFiles(projectFolder);
  fixSourceFiles(projectFolder);
  fixTestingImports(projectFolder);

  // TODO: Check if browser supported
  await writeBrowserTestConfig(projectFolder);
  await writeFile(resolve(projectFolder, "vitest.config.ts"), VITEST_CONFIG);
  await writeFile(resolve(projectFolder, "vitest.browser.config.ts"), VITEST_BROWSER_CONFIG);

  return true;
});

const VITEST_CONFIG = `
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
// Licensed under the MIT license.

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
    include: ["./src/**/*.ts", "./src/**/*.mts", "./test/**/*.spec.ts"],
    exclude: ["./test/**/node/**/*.ts"],
    compilerOptions: {
      outDir: "./dist-test/browser",
      rootDir: ".",
      skipLibCheck: true,
    },
  };

  await writeFile(
    resolve(packageFolder, "test.browser.config.json"),
    JSON.stringify(testConfig, null, 2),
  );
}

function fixTestingImports(packageFolder: string): void {
  // Create a new project
  const project = new Project({
    tsConfigFilePath: resolve(packageFolder, "tsconfig.json"),
  });

  // Iterate over all the source files
  for (const sourceFile of project.getSourceFiles()) {
    // Remove if the file is a test utility for chai
    if (
      sourceFile.getFilePath().includes("/test") &&
      !sourceFile.getBaseName().endsWith(".spec.ts")
    ) {
      for (const importDeclaration of sourceFile.getImportDeclarations()) {
        const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
        if (["chai", "assert"].includes(moduleSpecifier)) {
          importDeclaration.remove();
          sourceFile.addImportDeclaration({
            namedImports: ["assert"],
            moduleSpecifier: "vitest",
          });
        }
      }
    }

    if (sourceFile.getBaseName().endsWith(".spec.ts")) {
      if (!sourceFile.getImportDeclaration("vitest")) {
        // If the file ends with .spec.ts, add the import statement
        const hasMocking = sourceFile.getImportDeclarations().some((importDeclaration) => {
          const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
          return moduleSpecifier === "sinon" || moduleSpecifier === "@azure-tools/test-recorder";
        });

        const viTestImports = ["describe", "it", "assert"];
        // Insert typical mocking imports if needed
        if (hasMocking) {
          viTestImports.push("expect, vi, beforeEach, afterEach");
        }

        sourceFile.addImportDeclaration({
          namedImports: viTestImports,
          moduleSpecifier: "vitest",
        });
      }
    }

    const modulesToRemove = ["chai", "chai-as-promised", "chai-exclude", "sinon", "mocha"];

    // Iterate over all the import declarations
    for (const importDeclaration of sourceFile.getImportDeclarations()) {
      const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
      // If the module specifier is legacy, remove the import declaration
      if (modulesToRemove.includes(moduleSpecifier)) {
        importDeclaration.remove();
      } else if (moduleSpecifier === "@azure-tools/test-utils") {
        // If the module specifier is "@azure-tools/test-utils", remove the "assert" named import
        const namedImports = importDeclaration.getNamedImports();
        const assertImport = namedImports.find((namedImport) => namedImport.getName() === "assert");
        if (assertImport) {
          assertImport.remove();
        }

        // If there are no named imports left, remove the entire import declaration
        if (importDeclaration.getNamedImports().length === 0) {
          importDeclaration.remove();
        }
      }
    }
    // Save the changes to the source file
    sourceFile.saveSync();
  }
}

function fixSourceFiles(packageFolder: string): void {
  const sourceLinesToRemove = [
    "const should = chai.should();",
    "chai.use(chaiAsPromised);",
    "chai.use(chaiExclude);",
    "const expect = chai.expect;",
  ];

  // Create a new project
  const project = new Project({
    tsConfigFilePath: resolve(packageFolder, "tsconfig.json"),
  });

  // Iterate over all the source files
  for (const sourceFile of project.getSourceFiles()) {
    // Iterate over all the statements in the source file
    for (const statement of sourceFile.getStatements()) {
      // Remove old legacy lines
      for (const line of sourceLinesToRemove) {
        if (statement.getText() === line) {
          statement.remove();
        }
      }

      const patternsToReplace = [
        { pattern: /sinon\.stub/gi, replace: "vi.spyOn" },
        { pattern: /\(this: Context\)/g, replace: "(ctx)" },
        { pattern: /\(this\.currentTest\)/g, replace: "(ctx)" },
        { pattern: /\(!this\.currentTest\?\.\isPending\(\)\)/g, replace: "(!ctx.task.pending)" },
        { pattern: /this\.skip\(\);/g, replace: "ctx.task.skip();" },
      ];

      // Replace the patterns in the source file
      for (const { pattern, replace } of patternsToReplace) {
        if (pattern.test(statement.getText())) {
          statement.replaceWithText(statement.getText().replace(pattern, replace));
        }
      }
    }

    // Iterate over all the import declarations
    for (const importExportDeclaration of sourceFile.getImportDeclarations()) {
      let moduleSpecifier = importExportDeclaration.getModuleSpecifierValue();
      moduleSpecifier = fixDeclaration(sourceFile, moduleSpecifier);
      importExportDeclaration.setModuleSpecifier(moduleSpecifier);
    }

    // iterate over all the export declarations
    for (const exportDeclaration of sourceFile.getExportDeclarations()) {
      let moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
      if (moduleSpecifier) {
        moduleSpecifier = fixDeclaration(sourceFile, moduleSpecifier);
        exportDeclaration.setModuleSpecifier(moduleSpecifier);
      }
    }
    // Save the changes to the source file
    sourceFile.saveSync();
  }
}

function fixNodeDeclaration(moduleSpecifier: string): string {
  const nodeModules = [
    "assert",
    "crypto",
    "events",
    "fs",
    "fs/promises",
    "http",
    "https",
    "net",
    "os",
    "path",
    "process",
    "stream",
    "tls",
    "util",
  ];

  if (nodeModules.includes(moduleSpecifier)) {
    moduleSpecifier = `node:${moduleSpecifier}`;
  }

  return moduleSpecifier;
}

function fixDeclaration(sourceFile: SourceFile, moduleSpecifier: string): string {
  if (moduleSpecifier.startsWith(".") || moduleSpecifier.startsWith("..")) {
    if (!moduleSpecifier.endsWith(".js")) {
      // If the module specifier ends with "/", add "index.js", otherwise add ".js"
      if (moduleSpecifier.endsWith("/")) {
        moduleSpecifier += "index.js";
      } else {
        // Check if the module specifier is a directory
        const path = resolve(sourceFile.getDirectoryPath(), moduleSpecifier);
        if (existsSync(path) && lstatSync(path).isDirectory()) {
          moduleSpecifier += "/index.js";
        } else {
          moduleSpecifier += ".js";
        }
      }
    }
  }
  // Fix the node module declaration as well
  return fixNodeDeclaration(moduleSpecifier);
}

async function fixApiExtractorConfig(apiExtractorJsonPath: string): Promise<void> {
  const apiExtractorJson = JSON.parse(await readFile(apiExtractorJsonPath, "utf-8"));

  const oldPath = apiExtractorJson.dtsRollup.publicTrimmedFilePath;
  const projectName = basename(oldPath, ".d.ts");

  apiExtractorJson.mainEntryPointFilePath = "dist/esm/index.d.ts";
  apiExtractorJson.dtsRollup.publicTrimmedFilePath = `dist/${projectName}.d.ts`;

  // TODO: Clean up the betaTrimmedFilePath
  delete apiExtractorJson.dtsRollup.betaTrimmedFilePath;

  await writeFile(apiExtractorJsonPath, JSON.stringify(apiExtractorJson, null, 2));
}

async function cleanupFiles(projectFolder: string): Promise<void> {
  // Remove the old test files
  const filesToRemove = ["karma.conf.js", ".nycrc"];
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
    "./src/**/*.ts",
    "./src/**/*.mts",
    "./src/**/*.cts",
    "./samples-dev/**/*.ts", // TODO: Check if samples-dev is needed
    "./test/**/*.ts",
  ];

  // Remove old options
  delete tsConfig.compilerOptions.outDir;
  delete tsConfig.compilerOptions.declarationDir;

  await writeFile(tsconfigPath, JSON.stringify(tsConfig, null, 2));
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
  sortDevDependencies(packageJson);

  // Add tshy
  addTypeScriptHybridizer(packageJson);

  // Set files
  setFilesSection(packageJson);

  // Set scripts
  setScriptsSection(packageJson);

  // Rename files and rewrite browser field
  await renameFieldFiles("browser", "browser", projectFolder, packageJson);
  await renameFieldFiles("react-native", "native", projectFolder, packageJson);
  packageJson.browser = "./dist/browser/index.js";
  delete packageJson["react-native"];

  // Save the updated package.json
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setScriptsSection(packageJson: any): void {
  packageJson.scripts["build"] = "npm run clean && tshy && dev-tool run extract-api";

  // TODO: Check if web package or not
  packageJson.scripts["unit-test:browser"] =
    "npm run clean && tshy && dev-tool run build-test && dev-tool run test:vitest --no-test-proxy --browser";
  packageJson.scripts["unit-test:node"] = "dev-tool run test:vitest --no-test-proxy";
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
  const newPackages = [
    "@vitest/browser",
    "@vitest/coverage-istanbul",
    "playwright",
    "tshy",
    "vitest",
  ];

  for (const newPackage of newPackages) {
    const latestVersion = await run(["npm", "view", newPackage, "version"], {
      captureOutput: true,
    });
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
    "karma-junit-reporter",
    "karma-mocha",
    "karma-mocha-reporter",
    "karma-sourcemap-loader",
    "nyc",
    "puppeteer",
    "source-map-support",
    "ts-node",
    "uglify-js",
    "@types/chai-as-promised",
    "@types/mocha",
    "@types/chai",
    "@types/sinon",
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
function sortDevDependencies(packageJson: any): void {
  if (packageJson.devDependencies) {
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
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
