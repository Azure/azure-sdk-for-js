// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { run } from "../../util/run";
import { isWindows } from "../../util/platform";
import vendored from "../run/vendored";
import { Project, SourceFile } from "ts-morph";
import { getRushJson, type RushJsonProject } from "../../util/synthesizedRushJson";

const log = createPrinter("migrate-source");

export const commandInfo = makeCommandInfo(
  "migrate-snippets",
  "migrates a package to the latest snippets standards",
  {
    "package-name": {
      description: "The name of the package to migrate",
      kind: "string",
      required: false,
    },
  },
);

export default leafCommand(commandInfo, async ({ "package-name": packageName }) => {
  let projectFolder: string;

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

  log.info(`Update snippets for package ${packageName}`);

  await upgradePackageJson(resolve(projectFolder, "package.json"));
  await updateReadme(resolve(projectFolder, "README.md"));
  await addSnippetFiles(projectFolder);
  await cleanupCode(projectFolder);
  if (!(await runCleanup(projectFolder))) {
    return false;
  }

  return true;
});

async function cleanupCode(projectFolder: string): Promise<void> {
  const project = new Project({ tsConfigFilePath: resolve(projectFolder, "tsconfig.json") });
  for (const sourceFile of project.getSourceFiles()) {
    if (!sourceFile.getFilePath().endsWith(".spec.ts")) {
      continue;
    }

    fixLegacyStatements(sourceFile);

    // Clean up source file after applying the codemod
    if (!sourceFile.getBaseName().includes("snippets.spec.ts")) {
      sourceFile.fixUnusedIdentifiers();
    }

    await sourceFile.save();
  }
}

function fixLegacyStatements(sourceFile: SourceFile): void {
  for (const statement of sourceFile.getStatements()) {
    const patternsToReplace = [
      { pattern: /it\("([^"]+)", async function \(\) \{/g, replace: 'it("$1", async () => {' },
      { pattern: /it\("([^"]+)", function \(\) \{/g, replace: 'it("$1", () => {' },
    ];

    // Replace the patterns in the source file
    for (const { pattern, replace } of patternsToReplace) {
      if (pattern.test(statement.getText())) {
        statement.replaceWithText(statement.getText().replace(pattern, replace));
      }
    }
  }
}

async function runCleanup(projectFolder: string): Promise<boolean> {
  const samplesDevPath = resolve(projectFolder, "samples-dev");
  const hasSamplesDev = existsSync(samplesDevPath);

  const lintCommandArgs = [
    "eslint",
    "--no-inline-config",
    "--rule",
    "@typescript-eslint/consistent-type-imports: error",
    "--rule",
    "@typescript-eslint/explicit-function-return-type: error",
    "--rule",
    "@azure/azure-sdk/github-source-headers: off",
    "--rule",
    "@azure/azure-sdk/ts-package-json-name: off",
    "*.json",
    "test",
    "--fix",
  ];

  if (hasSamplesDev) {
    const testIndex = lintCommandArgs.indexOf("test");
    if (testIndex !== -1) {
      lintCommandArgs.splice(testIndex + 1, 0, "samples-dev");
    }
  }

  const lintCommand = await vendored(...lintCommandArgs);

  if (!lintCommand) {
    return false;
  }

  const prettierCommandArgs = [
    "prettier",
    "--write",
    "--config",
    "../../../.prettierrc.json",
    "--ignore-path",
    "../../../.prettierignore",
    "test/**/*.ts",
    "*.json",
    "*.ts",
  ];

  if (hasSamplesDev) {
    const testIndex = prettierCommandArgs.indexOf("test/**/*.ts");
    if (testIndex !== -1) {
      prettierCommandArgs.splice(testIndex + 1, 0, "samples-dev/**/*.ts");
    }
  }

  const prettierCommand = await vendored(...prettierCommandArgs);

  if (!prettierCommand) {
    return false;
  }

  return true;
}

const README_LOGGING_SNIPPET_FIND =
  '```javascript\nconst { setLogLevel } = require("@azure/logger");\nsetLogLevel("info");\n```';
const README_LOGGING_SNIPPET_REPLACE =
  '```ts snippet:SetLogLevel\nimport { setLogLevel } from "@azure/logger";\nsetLogLevel("info");\n```';

async function updateReadme(readmePath: string): Promise<void> {
  const readme = await readFile(readmePath, "utf-8");

  const updatedReadme = readme.replace(README_LOGGING_SNIPPET_FIND, README_LOGGING_SNIPPET_REPLACE);

  await writeFile(readmePath, updatedReadme);
}

const SNIPPET_TEMPLATE = `
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AstroManagementClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new AstroManagementClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new AstroManagementClient(credential, subscriptionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
`;

async function addSnippetFiles(projectFolder: string): Promise<void> {
  const snippetsFile = resolve(projectFolder, "test", "snippets.spec.ts");
  if (existsSync(snippetsFile)) {
    return;
  }

  await writeFile(snippetsFile, SNIPPET_TEMPLATE);
}

async function upgradePackageJson(packageJsonPath: string): Promise<void> {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

  // Change the module type to ESM
  packageJson.scripts["update-snippets"] = "dev-tool run update-snippets";

  // Add the new packages
  await addNewPackages(packageJson);

  // Sort the devDependencies
  sortPackage(packageJson);

  // Save the updated package.json
  await saveJson(packageJsonPath, packageJson);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function addNewPackages(packageJson: any): Promise<void> {
  // Update dev dependencies on the core projects
  const newCorePackages: Record<string, string | undefined> = {
    "@azure/logger": undefined,
  };

  for (const [newPackage, desiredMinVersion] of Object.entries(newCorePackages)) {
    if (!packageJson.devDependencies[newPackage] && !packageJson.dependencies[newPackage]) {
      let latestVersion = desiredMinVersion;
      if (!latestVersion) {
        // Get the latest version from npm
        latestVersion = (
          await run(["npm", "view", newPackage, "version"], {
            captureOutput: true,
            shell: isWindows(),
          })
        ).output;
      }
      packageJson.devDependencies[newPackage] = `^${latestVersion.replace("\n", "")}`;
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

function saveJson(filePath: string, json: unknown): ReturnType<typeof writeFile> {
  const fileContents = JSON.stringify(json, null, 2) + "\n"; // ensure file ends in blank line per repo rules
  return writeFile(filePath, fileContents);
}
