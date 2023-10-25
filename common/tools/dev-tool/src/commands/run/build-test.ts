// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "node:path";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { spawnSync } from "node:child_process";

const log = createPrinter("build-test");

export const commandInfo = makeCommandInfo("build-test", "build a package for testing", {
  "browser-test": {
    kind: "boolean",
    default: true,
    description: "build a bundle for browser testing",
  },
  "browser-config": {
    kind: "string",
    default: "tsconfig.browser.config.json",
    description: "path to the browser config file",
  },
});

export default leafCommand(commandInfo, async (options) => {
  const browserTest = options["browser-test"];
  const browserConfig = options["browser-config"];

  const info = await resolveProject(process.cwd());

  let moduleField = info.packageJson.module;
  if (!moduleField) {
    const defaultExport = info.packageJson.exports?.["."]?.import as any;
    if (defaultExport) {
      moduleField = defaultExport?.default;
    }
  }

  if (!moduleField) {
    log.error(info.name, "does not specify a `module` field or `exports` top level field.");
    return false;
  }

  // Read the imports
  const importMap = new Map<string, string>();
  const importField = (info.packageJson as any)?.tshy?.imports;
  if (importField) {
    const keys = Object.keys(importField);
    for (const key of keys) {
      importMap.set(key, importField[key]);
    }
  }

  if (browserTest) {
    log.info(`Building for browser testing...`);
    compileForEnvironment("browser", browserConfig, importMap);
  }

  return true;
});

function compileForEnvironment(
  type: string,
  tsConfig: string,
  importMap: Map<string, string>
): boolean {
  const tsconfigPath = path.join(process.cwd(), tsConfig);
  const tsConfigFile = readFileSync(tsconfigPath, "utf8");
  const tsConfigJSON = JSON.parse(tsConfigFile);
  const outputPath = tsConfigJSON.compilerOptions.outDir;
  if (!existsSync(tsconfigPath)) {
    log.error(`TypeScript config ${tsConfig} does not exist`);
    return false;
  }

  const browserTestPath = path.join(process.cwd(), outputPath);
  if (!existsSync(browserTestPath)) {
    mkdirSync(browserTestPath, { recursive: true });
  }

  const packageJson = {
    type: "module",
  };
  writeFileSync(path.join(browserTestPath, "package.json"), JSON.stringify(packageJson, null, 2));

  const res = spawnSync(`tsc -p ${tsConfig}`, [], {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });

  if (res.status || res.signal) {
    log.error(res);
    return false;
  }

  for (const [key, value] of importMap.entries()) {
    log.info(`Replacing for : ${key} => ${value}`);
    copyOverrides(type, outputPath, value);
  }

  return true;
}

function copyOverrides(type: string, rootDir: string, filePath: string): void {
  const fileParsed = path.parse(filePath);
  const fileToReplace = path.join(process.cwd(), path.normalize(fileParsed.dir));
  const fileToReplaceWith = path.join(
    fileParsed.root,
    fileParsed.dir,
    `${fileParsed.name}-${type}.mts`
  );
  if (existsSync(fileToReplace) && existsSync(fileToReplaceWith)) {
    log.info(`Copying over ${fileToReplaceWith} to ${fileToReplace}`);
    const relativeDir = path.relative(process.cwd(), fileParsed.dir);

    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.d.mts`,
      `${fileParsed.name}.d.ts`
    );
    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.d.mts.map`,
      `${fileParsed.name}.d.ts.map`
    );
    overrideFile(rootDir, relativeDir, `${fileParsed.name}-${type}.mjs`, `${fileParsed.name}.js`);
    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.mjs.map`,
      `${fileParsed.name}.js.map`
    );
  }
}

function overrideFile(
  rootDir: string,
  relativeDir: string,
  sourceFile: string,
  destinationFile: string
): void {
  const sourceFileType = path.join(process.cwd(), rootDir, relativeDir, sourceFile);
  const destFileType = path.join(process.cwd(), rootDir, relativeDir, destinationFile);

  cpSync(sourceFileType, destFileType, { force: true });
}
