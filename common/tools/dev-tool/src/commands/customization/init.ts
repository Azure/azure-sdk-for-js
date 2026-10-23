// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { findWarpConfig } from "@microsoft/warp";
import { resolveProject, type ProjectInfo } from "../../util/resolveProject.ts";
import { createPrinter } from "../../util/printer.ts";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";

const log = createPrinter("customization-init");

export const commandInfo = makeCommandInfo(
  "init",
  "sets up a package for customization by moving source to src/generated/",
  {},
);

export default leafCommand(commandInfo, async () => {
  const info = await resolveProject(process.cwd());
  const entryPoints = await validateCustomizationInput(info);
  if (!entryPoints) return false;

  const srcDirectory = path.join(info.path, "src");
  const generatedDirectory = path.join(srcDirectory, "generated");
  const barrels = new Map<string, string>();
  for (const file of entryPoints) {
    const relativeSource = path.relative(srcDirectory, file);
    const generatedFile = path.join(generatedDirectory, relativeSource).replace(/\.ts$/, ".js");
    // src/api/widgets/index.ts -> ../../generated/api/widgets/index.js
    const relativeImport = path
      .relative(path.dirname(file), generatedFile)
      .split(path.sep)
      .join("/");
    const specifier = relativeImport.startsWith(".") ? relativeImport : `./${relativeImport}`;
    barrels.set(
      file,
      `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Customize the public exports for this entry point here.
// This file belongs to the package author. Regeneration preserves it.
//
// Keep handwritten implementations outside src/generated/.
// Do not edit files in src/generated/; the emitter overwrites them.
// Add explicit exports below to expose custom implementations.
//
// See the customization guide:
// https://aka.ms/azsdk/js/customization

export * from ${JSON.stringify(specifier)};
`,
    );
  }

  const entries = await fs.readdir(srcDirectory);
  await fs.mkdir(generatedDirectory);
  for (const entry of entries) {
    await fs.rename(path.join(srcDirectory, entry), path.join(generatedDirectory, entry));
  }
  for (const [file, contents] of barrels) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, contents);
  }
  log("✅ Moved source to src/generated/. Customize files outside src/generated/.");
  return true;
});

async function validateCustomizationInput(project: ProjectInfo): Promise<string[] | undefined> {
  const packageDirectory = project.path;
  const srcDirectory = path.join(packageDirectory, "src");
  if ((await fs.readdir(packageDirectory)).includes("generated")) {
    log(
      "❌ This package has a root generated/ baseline. Migrate existing customizations separately.",
    );
    return undefined;
  }

  try {
    await fs.access(srcDirectory);
  } catch {
    log("❌ Could not find src/ directory. Nothing to initialize.");
    return undefined;
  }
  if ((await fs.readdir(srcDirectory)).includes("generated")) {
    log("❌ src/generated/ already exists. Initialization requires a freshly generated package.");
    return undefined;
  }

  const resolved = await findWarpConfig(packageDirectory);
  if (!resolved) {
    throw new Error("A Warp configuration is required to locate public source entry points.");
  }
  const publicExports: unknown = project.packageJson.exports;
  if (typeof publicExports !== "object" || publicExports === null || Array.isArray(publicExports)) {
    log(
      '❌ package.json must have a public "exports" map. Regenerate package metadata with the current emitter.',
    );
    return undefined;
  }
  for (const subpath of Object.keys(publicExports)) {
    if (!Object.hasOwn(resolved.config.exports, subpath)) {
      log(
        `❌ Public export ${subpath} has no Warp source mapping. Regenerate package metadata with the current emitter.`,
      );
      return undefined;
    }
  }
  const entryPoints = new Set<string>();
  for (const source of Object.values(resolved.config.exports)) {
    const file = path.resolve(packageDirectory, source);
    const relativeSource = path.relative(srcDirectory, file);
    if (
      relativeSource === ".." ||
      relativeSource.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeSource)
    ) {
      continue;
    }
    entryPoints.add(file);
  }

  for (const file of entryPoints) {
    const source = path.relative(packageDirectory, file).split(path.sep).join("/");
    let isFile: boolean;
    try {
      isFile = (await fs.lstat(file)).isFile();
    } catch (error) {
      log(
        `❌ Cannot read public source ${source}: ${
          error instanceof Error ? error.message : String(error)
        }. Regenerate the package with the current emitter.`,
      );
      return undefined;
    }
    if (!isFile) {
      log(
        `❌ Public source ${source} must be a regular file. Regenerate the package with the current emitter.`,
      );
      return undefined;
    }
  }

  // Require current emitter metadata, not inferred or repaired compiler roots.
  for (const target of resolved.config.targets) {
    const configPath = path.resolve(packageDirectory, target.tsconfig);
    const relativeConfig = path.relative(packageDirectory, configPath);
    if (
      relativeConfig === ".." ||
      relativeConfig.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeConfig)
    ) {
      log(
        `❌ ${target.tsconfig} is outside the package. Regenerate package metadata with the current emitter.`,
      );
      return undefined;
    }
    let config: unknown;
    try {
      config = JSON.parse(await fs.readFile(configPath, "utf8"));
    } catch (error) {
      log(
        `❌ Cannot read ${target.tsconfig} as JSON: ${
          error instanceof Error ? error.message : String(error)
        }. Regenerate package metadata with the current emitter.`,
      );
      return undefined;
    }
    if (
      typeof config !== "object" ||
      config === null ||
      !("include" in config) ||
      !Array.isArray(config.include) ||
      !config.include.every((entry): entry is string => typeof entry === "string")
    ) {
      log(
        `❌ ${target.tsconfig} must have an "include" array of public source paths. Regenerate package metadata with the current emitter.`,
      );
      return undefined;
    }
    const included = new Set(
      config.include.map((file) => path.resolve(path.dirname(configPath), file)),
    );
    const missing = [...entryPoints].filter((file) => !included.has(file));
    if (missing.length > 0) {
      const paths = missing
        .map((file) => path.relative(packageDirectory, file).split(path.sep).join("/"))
        .join(", ");
      log(
        `❌ ${target.tsconfig} is missing public source includes: ${paths}. Regenerate package metadata with the current emitter.`,
      );
      return undefined;
    }
  }
  return [...entryPoints];
}
