// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import stripJsonComments from "strip-json-comments";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { vendoredWithOptions } from "../run/vendored";

const log = createPrinter("migrate-tests");

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
  "migrate-tests",
  "migrates a package to the latest tests standards",
  {
    all: {
      description: "Migrate all packages",
      kind: "boolean",
      required: false,
      default: false,
    },
    "package-name": {
      description: "The name of the package to migrate",
      kind: "string",
      required: false,
    },
  },
);

const TEST_ESM_NODE = "dev-tool run test:vitest --esm";

export default leafCommand(commandInfo, async ({ all, "package-name": packageName }) => {
  let projectFolder: string;

  if (all) {
    const root = await resolveRoot();
    const rushJson = await getRushJson();
    const projects = rushJson.projects;

    for (const project of projects) {
      log.info(`Migrating package ${project.packageName}`);
      const projectFolder = resolve(root, project.projectFolder);
      const success = await updatePackageJson(projectFolder, project.packageName);
      if (!success) {
        log.error(`Failed to migrate package ${packageName}`);
        return false;
      }
    }
    return true;
  }

  if (!packageName) {
    projectFolder = process.cwd();
    const info = await resolveProject(process.cwd());
    packageName = info.packageJson.name;
  } else {
    const root = await resolveRoot();

    const rushJson = await getRushJson();
    const projects = rushJson.projects;

    const project = projects.find((p: RushJsonProject) => p.packageName === packageName);
    if (!project) {
      log.error(`Package ${packageName} not found in rush.json`);
      return false;
    }
    projectFolder = resolve(root, project.projectFolder);
  }

  log.info(`Migrating package ${packageName}`);
  const success = await updatePackageJson(projectFolder, packageName);
  if (!success) {
    log.error(`Failed to migrate package ${packageName}`);
    return false;
  }

  return true;
});

async function updatePackageJson(projectFolder: string, packageName: string): Promise<boolean> {
  const packageJsonPath = resolve(projectFolder, "package.json");
  const packageJsonContent = await readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonContent);

  if (packageJson.scripts) {
    const unitTestNode = packageJson.scripts["unit-test:node"];
    let unitTestBrowser = packageJson.scripts["unit-test:browser"];

    // If it contains build:test, replace it
    if (unitTestBrowser?.includes("npm run build:test")) {
      log.info("Replacing build:test script");
      unitTestBrowser = unitTestBrowser.replace("npm run build:test", "dev-tool run build-test");
    }

    if (unitTestNode) {
      packageJson.scripts["test:node"] = unitTestNode;
    }
    if (unitTestBrowser) {
      packageJson.scripts["test:browser"] = unitTestBrowser;
    }

    // Save the integration test if it's not the same as the ESM node test
    if (
      packageJson.scripts["integration-test:node"] !== TEST_ESM_NODE &&
      packageJson.scripts["integration-test:node"] !== packageJson.scripts["unit-test:node"] &&
      !packageJson.scripts["integration-test:node"].includes("echo")
    ) {
      log.info("Saving integration-test:node");
      packageJson.scripts["test:node:live"] = packageJson.scripts["integration-test:node"];
    }

    // Clean up integration test scripts
    delete packageJson.scripts["unit-test"];
    delete packageJson.scripts["unit-test:node"];
    delete packageJson.scripts["unit-test:browser"];
    delete packageJson.scripts["integration-test"];
    delete packageJson.scripts["integration-test:node"];
    delete packageJson.scripts["integration-test:browser"];

    // Clean up build scripts
    if (!packageJson.scripts["build:test"]?.includes("echo")) {
      log.info("Removing build:test script");
      log.info(`"build:test": "${packageJson.scripts["build:test"]}"`);
    }
    delete packageJson.scripts["build:test"];
    delete packageJson.scripts["build:browser"];
    delete packageJson.scripts["build:node"];
    delete packageJson.scripts["minify"];

    packageJson.scripts["test:node:esm"] = "dev-tool run test:vitest --esm";
    if (packageJson.scripts["test:node"].includes("--no-test-proxy")) {
      packageJson.scripts["test:node:esm"] += " --no-test-proxy";
    }

    if (
      packageName.startsWith("@azure-tests/perf-") ||
      packageName === "@azure/dev-tool" ||
      packageName === "@azure-tools/vite-plugin-browser-test-map" ||
      packageName === "@azure/eslint-plugin-azure-sdk"
    ) {
      packageJson.scripts["test:node:esm"] = "echo skipped";
    }

    // Set the entry point for testing
    packageJson.scripts["test"] = "npm run test:node && npm run test:browser";

    // Clean it up
    sortPackage(packageJson);

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Clean up package.json
    if (!(await runCleanup(projectFolder))) {
      return false;
    }
  }

  return true;
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

async function runCleanup(projectFolder: string): Promise<boolean> {
  const prettierCommandArgs = [
    "prettier",
    "--write",
    "--config",
    "../../../.prettierrc.json",
    "--ignore-path",
    "../../../.prettierignore",
    "package.json",
  ];

  const prettierCommand = await vendoredWithOptions({ cwd: projectFolder }, ...prettierCommandArgs);

  if (!prettierCommand) {
    return false;
  }

  return true;
}
