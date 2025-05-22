// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { Project, SourceFile } from "ts-morph";
import { createPrinter } from "../../util/printer";
import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { resolve } from "node:path";
import { existsSync, lstatSync } from "node:fs";
import { getRushJson, type RushJsonProject } from "../../util/synthesizedRushJson";

const log = createPrinter("migrate-source");

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

  const skipPatterns = [/^vitest.*\.config\.ts$/];

  const tsProject = new Project({ tsConfigFilePath: projectFile });
  for (const sourceFile of tsProject.getSourceFiles()) {
    // Skip config files
    if (skipPatterns.some((pattern) => pattern.test(sourceFile.getBaseName()))) {
      continue;
    }

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
