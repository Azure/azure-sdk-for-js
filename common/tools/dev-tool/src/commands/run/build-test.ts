// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { resolveConfig } from "../../util/resolveTsConfig";
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
  "node-config": {
    kind: "string",
    default: "tsconfig.test.node.json",
    description: "path to the node config file",
  },
});

async function validateConfigFile(configPath: string): Promise<boolean> {
  try {
    const configStat = await stat(configPath);
    if (!configStat.isFile()) {
      log.error(`The path ${configPath} is not a file.`);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function findAndRunTypeScriptConfig(
  config: string,
  fallbackConfig: string,
): Promise<boolean> {
  const configsToTry = [config, fallbackConfig];

  for (const config of configsToTry) {
    if (await validateConfigFile(config)) {
      if (!(await runTypeScript(config))) {
        return false;
      }
      log.info(`Typechecking succeeded using ${config}`);
      return true;
    }
  }

  log.error(
    `No valid TypeScript config found. Please provide a valid config file using --node-config or ensure ${config} or ${fallbackConfig} exists.`,
  );
  return false;
}

export default leafCommand(commandInfo, async (options) => {
  const browserTest = options["browser-test"];
  const browserConfig = options["browser-config"];
  const nodeConfig = options["node-config"];
  const defaultConfig = "tsconfig.test.json";

  if (!browserTest && !(await findAndRunTypeScriptConfig(nodeConfig, defaultConfig))) {
    return false;
  }

  const info = await resolveProject(process.cwd());

  let moduleField = info.packageJson.module;
  if (!moduleField) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const importField = (info.packageJson as any)?.imports;
  if (importField) {
    const keys = Object.keys(importField);
    for (const key of keys) {
      importMap.set(key, importField[key]);
    }
  }

  if (browserTest) {
    if (!(await validateConfigFile(browserConfig))) {
      log.error(`The browser config file ${browserConfig} does not exist.`);
      return false;
    }

    log.info(`Building for browser testing...`);
    const res = await compileForEnvironment(browserConfig, importMap);
    if (!res) {
      return false;
    }
  }

  return true;
});

async function runTypeScript(tsConfig: string): Promise<boolean> {
  const res = spawnSync(`tsc -p ${tsConfig}`, [], {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });

  if (res.status || res.signal) {
    log.error(`TypeScript compilation failed for ${tsConfig}`);
    return false;
  }

  return true;
}

async function compileForEnvironment(
  tsConfig: string,
  importMap: Map<string, string>,
): Promise<boolean> {
  const tsconfigPath = path.join(process.cwd(), tsConfig);
  const tsConfigJSON = await resolveConfig(tsconfigPath);
  const outputPath = tsConfigJSON.compilerOptions.outDir;

  const browserTestPath = outputPath;
  if (!browserTestPath) {
    log.error(`Output path not defined in ${tsConfig}`);
    return false;
  }
  if (!existsSync(browserTestPath)) {
    mkdirSync(browserTestPath, { recursive: true });
  }

  // Create import map
  const imports: Record<string, string> = {};
  for (const [key, value] of importMap.entries()) {
    imports[key] = value;
  }

  const packageJson = {
    type: "module",
    imports,
  };
  writeFileSync(path.join(browserTestPath, "package.json"), JSON.stringify(packageJson, null, 2));

  if (!(await runTypeScript(tsConfig))) {
    return false;
  }

  return true;
}
