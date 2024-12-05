// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { Project, SourceFile } from "ts-morph";
import { createPrinter } from "../../util/printer";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import stripJsonComments from "strip-json-comments";
import { existsSync, lstatSync } from "node:fs";

const log = createPrinter("migrate-source");

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
  "migrate-source",
  "migrates a package to the latest source code standards",
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

  log.info(`Migrating package ${packageName}`);

  const projectFile = resolve(projectFolder, "tsconfig.json");

  const projectFileContents = await readFile(projectFile, "utf-8");
  const projectFileJSON = JSON.parse(projectFileContents);
  const module = projectFileJSON.compilerOptions.module;
  const moduleResolution = projectFileJSON.compilerOptions.moduleResolution;

  if (module !== "NodeNext" || moduleResolution !== "NodeNext") {
    log.info("Package does not use NodeNext module resolution. Skipping.");
    return true;
  }

  const tsProject = new Project({ tsConfigFilePath: projectFile });
  for (const sourceFile of tsProject.getSourceFiles()) {
    fixSourceFile(sourceFile);
    await sourceFile.save();
  }

  return true;
});

function fixSourceFile(sourceFile: SourceFile): void {
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

function fixNodeDeclaration(moduleSpecifier: string): string {
  const nodeModules = [
    "assert",
    "child_process",
    "crypto",
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
