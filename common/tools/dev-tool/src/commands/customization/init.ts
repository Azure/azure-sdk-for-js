// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { resolveProject } from "../../util/resolveProject.ts";
import { format } from "../../util/prettier.ts";
import { createPrinter } from "../../util/printer.ts";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";

const log = createPrinter("customization-init");
const SOURCE_DIRECTORY = "src";
const GENERATED_SOURCE_DIRECTORY = path.join(SOURCE_DIRECTORY, "generated");
const LEGACY_GENERATED_DIRECTORY = "generated";
const ROOT_ENTRY_POINT = path.join(SOURCE_DIRECTORY, "index.ts");
const CUSTOMIZATION_APPLY_COMMAND =
  /^(?:(?:npx|pnpm exec)\s+)?dev-tool\s+customization\s+apply(?:-v2)?(?:\s|$)/;
const FORMAT_COMMAND = /^(?:npm|pnpm)\s+run\s+format$/;

export const commandInfo = makeCommandInfo(
  "init",
  "moves generated source to src/generated and creates a customization entry point",
  {},
);

export default leafCommand(commandInfo, async () => {
  const info = await resolveProject(process.cwd());
  const srcDirectory = path.join(info.path, SOURCE_DIRECTORY);
  const generatedSourceDirectory = path.join(info.path, GENERATED_SOURCE_DIRECTORY);
  const legacyGeneratedDirectory = path.join(info.path, LEGACY_GENERATED_DIRECTORY);

  try {
    await fs.access(srcDirectory);
  } catch {
    log("❌ Could not find src/ directory. Nothing to initialize.");
    return false;
  }

  let movedSourceTree = false;
  if (!(await pathExists(generatedSourceDirectory))) {
    if (await pathExists(legacyGeneratedDirectory)) {
      await fs.rename(legacyGeneratedDirectory, generatedSourceDirectory);
      log("✅ Moved the legacy generated/ baseline to src/generated/.");
    } else {
      const stagingDirectory = path.join(info.path, ".dev-tool-customization-src");
      if (await pathExists(stagingDirectory)) {
        log(`❌ Could not initialize customization because '${stagingDirectory}' already exists.`);
        return false;
      }

      await fs.rename(srcDirectory, stagingDirectory);
      try {
        await fs.mkdir(srcDirectory, { recursive: true });
        await fs.rename(stagingDirectory, generatedSourceDirectory);
      } catch (error) {
        await fs.rm(srcDirectory, { force: true, recursive: true });
        if (await pathExists(stagingDirectory)) {
          await fs.rename(stagingDirectory, srcDirectory);
        }
        throw error;
      }
      movedSourceTree = true;
      log("✅ Moved generated source from src/ to src/generated/.");
    }
  } else {
    log("src/generated/ already exists. The generated-source layout is already set up.");
  }

  await ensureRootEntryPointFacade(info.path);
  await updatePackageJson(info.path, movedSourceTree);
  if (movedSourceTree) {
    await updateWarpConfig(info.path);
  }

  return true;
});

async function ensureRootEntryPointFacade(packagePath: string): Promise<void> {
  const entryPoint = path.join(packagePath, ROOT_ENTRY_POINT);
  if (await pathExists(entryPoint)) {
    return;
  }

  const generatedEntryPoint = path.join(packagePath, GENERATED_SOURCE_DIRECTORY, "index.ts");
  if (!(await pathExists(generatedEntryPoint))) {
    log(`⚠️  Could not create '${ROOT_ENTRY_POINT}' because its generated file was not found.`);
    return;
  }

  await fs.writeFile(
    entryPoint,
    [
      "// Copyright (c) Microsoft Corporation.",
      "// Licensed under the MIT License.",
      "",
      'export * from "./generated/index.js";',
      "",
    ].join("\n"),
  );
  log(`✅ Created customization entry point '${ROOT_ENTRY_POINT}'.`);
}

async function updatePackageJson(
  packagePath: string,
  updateGeneratedSourcePaths: boolean,
): Promise<void> {
  const packageJsonPath = path.join(packagePath, "package.json");
  let packageJson: {
    scripts?: Record<string, string>;
    exports?: Record<string, unknown>;
    imports?: Record<string, unknown>;
    "//metadata"?: {
      constantPaths?: Array<{ path: string; prefix: string }>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  try {
    packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: "utf-8" }));
  } catch {
    log("⚠️  Could not read package.json; skipping package setup.");
    return;
  }

  let changed = false;
  for (const [name, script] of Object.entries(packageJson.scripts ?? {})) {
    const commands = script.split("&&").map((command) => command.trim());
    const filteredCommands = commands.filter(
      (command) => !CUSTOMIZATION_APPLY_COMMAND.test(command),
    );
    if (filteredCommands.length === commands.length) {
      continue;
    }

    changed = true;
    if (
      filteredCommands.length === 0 ||
      (name === "customize" && filteredCommands.every((command) => FORMAT_COMMAND.test(command)))
    ) {
      delete packageJson.scripts![name];
      log(`✅ Removed obsolete '${name}' customization script.`);
    } else {
      packageJson.scripts![name] = filteredCommands.join(" && ");
      log(`✅ Removed the merge step from the '${name}' script.`);
    }
  }

  if (updateGeneratedSourcePaths && packageJson.imports) {
    const imports = updateSourcePaths(packageJson.imports);
    if (imports.changed) {
      packageJson.imports = imports.value as Record<string, unknown>;
      changed = true;
      log("✅ Updated package import paths to use src/generated/.");
    }
  }

  if (updateGeneratedSourcePaths && packageJson.exports) {
    let exportsChanged = false;
    for (const [subpath, exportValue] of Object.entries(packageJson.exports)) {
      if (subpath === "." || subpath === "./package.json") {
        continue;
      }
      const result = updateDistPaths(exportValue);
      if (result.changed) {
        packageJson.exports[subpath] = result.value;
        exportsChanged = true;
      }
    }
    if (exportsChanged) {
      changed = true;
      log("✅ Updated package subpath exports to use generated output.");
    }
  }

  const constantPaths = updateGeneratedSourcePaths
    ? packageJson["//metadata"]?.constantPaths
    : undefined;
  if (constantPaths) {
    let metadataChanged = false;
    for (const constantPath of constantPaths) {
      if (constantPath.path.startsWith("src/") && !constantPath.path.startsWith("src/generated/")) {
        constantPath.path = `src/generated/${constantPath.path.slice("src/".length)}`;
        changed = true;
        metadataChanged = true;
      }
    }
    if (metadataChanged) {
      log("✅ Updated package metadata paths to use src/generated/.");
    }
  }

  if (changed) {
    const content = await format(JSON.stringify(packageJson, null, 2), "json-stringify");
    await fs.writeFile(packageJsonPath, content);
  }
}

async function updateWarpConfig(packagePath: string): Promise<void> {
  const warpConfigPath = path.join(packagePath, "warp.config.yml");
  let config: { exports?: Record<string, unknown>; [key: string]: unknown };
  try {
    config = parseYaml(await fs.readFile(warpConfigPath, "utf-8"));
  } catch {
    return;
  }

  if (!config.exports) {
    return;
  }

  const exports = updateSourcePaths(config.exports);
  if (!exports.changed) {
    return;
  }

  config.exports = exports.value as Record<string, unknown>;
  const content = await format(stringifyYaml(config), "yaml");
  await fs.writeFile(warpConfigPath, content);
  log("✅ Updated Warp entry points to use src/generated/.");
}

function updateSourcePaths(value: unknown): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    if (value.startsWith("./src/") && !value.startsWith("./src/generated/")) {
      return {
        value: `./src/generated/${value.slice("./src/".length)}`,
        changed: true,
      };
    }
    return { value, changed: false };
  }

  if (Array.isArray(value)) {
    let changed = false;
    const updated = value.map((item) => {
      const result = updateSourcePaths(item);
      changed ||= result.changed;
      return result.value;
    });
    return { value: updated, changed };
  }

  if (typeof value === "object" && value !== null) {
    let changed = false;
    const updated = Object.fromEntries(
      Object.entries(value).map(([key, item]) => {
        const result = updateSourcePaths(item);
        changed ||= result.changed;
        return [key, result.value];
      }),
    );
    return { value: updated, changed };
  }

  return { value, changed: false };
}

function updateDistPaths(value: unknown): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    const match = value.match(/^\.\/dist\/([^/]+)\/(?!generated\/)(.+)$/);
    if (match) {
      return {
        value: `./dist/${match[1]}/generated/${match[2]}`,
        changed: true,
      };
    }
    return { value, changed: false };
  }

  if (Array.isArray(value)) {
    let changed = false;
    const updated = value.map((item) => {
      const result = updateDistPaths(item);
      changed ||= result.changed;
      return result.value;
    });
    return { value: updated, changed };
  }

  if (typeof value === "object" && value !== null) {
    let changed = false;
    const updated = Object.fromEntries(
      Object.entries(value).map(([key, item]) => {
        const result = updateDistPaths(item);
        changed ||= result.changed;
        return [key, result.value];
      }),
    );
    return { value: updated, changed };
  }

  return { value, changed: false };
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
