// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { type Config, resolveConfig } from "../../util/resolveTsConfig";
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

  // Build the overrides - hard code to browser for now
  const overrides = new Map<string, OverrideSet>();
  overrides.set("esm", new OverrideSet("esm", "browser"));
  // Check for browser specific file under "src" and "test"
  const sources = new Set([...getSources(), ...getSources("test")]);
  for (const file of sources) {
    for (const override of overrides.values()) {
      override.addOverride(file, sources);
    }
  }

  for (const [name, pf] of overrides.entries()) {
    if (pf.map.size === 0) {
      overrides.delete(name);
    }
  }

  if (browserTest) {
    if (!(await validateConfigFile(browserConfig))) {
      log.error(`The browser config file ${browserConfig} does not exist.`);
      return false;
    }

    log.info(`Building for browser testing...`);
    const esmMap = overrides.has("esm") ? overrides.get("esm")!.map : new Map<string, string>();
    return compileForEnvironment("browser", browserConfig, importMap, esmMap);
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
    log.error(`TypeScript compilation failed for ${tsConfig}:`, res);
    return false;
  }

  return true;
}

async function compileForEnvironment(
  type: string,
  tsConfig: string,
  importMap: Map<string, string>,
  overrideMap: Map<string, string>,
): Promise<boolean> {
  const tsconfigPath = path.join(process.cwd(), tsConfig);
  const tsConfigJSON = await resolveConfig(tsconfigPath);
  const outputPath = tsConfigJSON.compilerOptions.outDir;
  if (!existsSync(tsconfigPath)) {
    log.error(`TypeScript config ${tsConfig} does not exist`);
    return false;
  }

  const browserTestPath = outputPath;
  if (!browserTestPath) {
    log.error(`Output path not defined in ${tsConfig}`);
    return false;
  }
  if (!existsSync(browserTestPath)) {
    mkdirSync(browserTestPath, { recursive: true });
  }

  // Check if the TypeScript config uses package name imports or "internal" paths
  // TODO: use hasPackageOrInternalPaths once all tests are migrated to import from package name
  const shouldSkipOverrides = false; //hasPackageOrInternalPaths(tsConfigJSON);
  if (shouldSkipOverrides) {
    log.info("Detected package name or internal path mappings, skipping file overrides");
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

  // Only apply overrides if not using package name or internal path imports
  if (!shouldSkipOverrides) {
    for (const [override, original] of overrideMap.entries()) {
      log.info(`Replacing for : ${original} => ${override}`);
      copyOverrides(type, outputPath, original);
    }
  }

  return true;
}

export function hasPackageOrInternalPaths(tsConfig: Config): boolean {
  const paths = tsConfig?.compilerOptions?.paths;
  if (!paths || typeof paths !== "object") {
    return false;
  }

  const pathKeys = Object.keys(paths);

  // Check for package name imports (e.g., @azure/identity, @azure/identity/*)
  const hasPackageImports = pathKeys.some((key) => key.startsWith("@") && key.includes("/"));

  // Check for internal path imports (e.g., internal/*)
  const hasInternalImports = pathKeys.some((key) => key.startsWith("internal/"));

  return hasPackageImports || hasInternalImports;
}

function copyOverrides(type: string, rootDir: string, filePath: string): void {
  const fileParsed = path.parse(filePath);
  const fileToReplace = path.join(process.cwd(), path.normalize(fileParsed.dir));
  const fileToReplaceWith = path.join(
    fileParsed.root,
    fileParsed.dir,
    `${fileParsed.name}-${type}.mts`,
  );
  if (existsSync(fileToReplace) && existsSync(fileToReplaceWith)) {
    log.info(`Copying over ${fileToReplaceWith} to ${fileToReplace}`);
    const relativeDir = path.relative(process.cwd(), fileParsed.dir);

    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.d.mts`,
      `${fileParsed.name}.d.ts`,
    );
    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.d.mts.map`,
      `${fileParsed.name}.d.ts.map`,
    );
    overrideFile(rootDir, relativeDir, `${fileParsed.name}-${type}.mjs`, `${fileParsed.name}.js`);
    overrideFile(
      rootDir,
      relativeDir,
      `${fileParsed.name}-${type}.mjs.map`,
      `${fileParsed.name}.js.map`,
    );
  }
}

function overrideFile(
  rootDir: string,
  relativeDir: string,
  sourceFile: string,
  destinationFile: string,
): void {
  const sourceFileType = path.join(rootDir, relativeDir, sourceFile);
  const destFileType = path.join(rootDir, relativeDir, destinationFile);

  cpSync(sourceFileType, destFileType, { force: true });
}

class OverrideSet {
  public map: Map<string, string>;

  constructor(
    public type: "esm" | "commonjs",
    public name: string,
  ) {
    this.map = new Map();
  }

  addOverride(file: string, sources: Set<string>) {
    const extension = this.type === "esm" ? "mts" : "cts";
    const suffix = `-${this.name}.${extension}`;
    if (!file.endsWith(suffix)) {
      return;
    }
    const originalFile = file.substring(0, file.length - suffix.length) + ".ts";
    if (sources.has(originalFile)) {
      this.map.set(file, originalFile);
    }
  }
}

function getSources(dir = "src"): string[] {
  const sources: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      sources.push(...getSources(path.join(dir, entry.name)));
    } else if (entry.isFile()) {
      sources.push(path.join(dir, entry.name));
    }
  }

  return sources;
}
