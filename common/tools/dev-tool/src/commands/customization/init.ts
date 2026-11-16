// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { resolveProject } from "../../util/resolveProject.ts";
import { format } from "../../util/prettier.ts";
import { createPrinter } from "../../util/printer.ts";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";

const log = createPrinter("customization-init");

// Default `customize` script for a package that uses the generated/ + src/ merge flow.
// Automation runs `npm run --if-present customize`, so this keeps the package in sync
// with the customization lifecycle without any additional wiring.
const DEFAULT_CUSTOMIZE_SCRIPT =
  "dev-tool customization apply -s ./generated -t ./src && npm run format";

export const commandInfo = makeCommandInfo(
  "init",
  "sets up a package for customization by copying src/ to generated/",
  {},
);

export default leafCommand(commandInfo, async () => {
  const info = await resolveProject(process.cwd());
  const srcDirectory = path.join(info.path, "src");
  const generatedDirectory = path.join(info.path, "generated");

  try {
    await fs.access(srcDirectory);
  } catch {
    log("❌ Could not find src/ directory. Nothing to initialize.");
    return false;
  }

  try {
    await fs.access(generatedDirectory);
    log("generated/ folder already exists. Customization is already set up.");
  } catch {
    await fs.cp(srcDirectory, generatedDirectory, { recursive: true });
    log("✅ Copied src/ to generated/. You can now customize files in src/.");
  }

  await ensureCustomizeScript(info.path);

  return true;
});

/**
 * Adds a default `customize` script to the package when one is not already present so
 * the package participates in the customization lifecycle. An existing `customize`
 * script is left untouched to preserve any package-specific flags or steps.
 */
async function ensureCustomizeScript(packagePath: string): Promise<void> {
  const packageJsonPath = path.join(packagePath, "package.json");
  let packageJson: { scripts?: Record<string, string>; [key: string]: unknown };
  try {
    packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: "utf-8" }));
  } catch {
    log("⚠️  Could not read package.json; skipping customize script setup.");
    return;
  }

  const scripts = packageJson.scripts ?? {};
  if ("customize" in scripts) {
    log(`Existing 'customize' script left unchanged: ${scripts.customize}`);
    return;
  }

  // Append only the new entry to avoid reordering existing scripts; the repo's
  // package.json formatting (prettier-plugin-packagejson) sorts the field on commit.
  scripts.customize = DEFAULT_CUSTOMIZE_SCRIPT;
  packageJson.scripts = scripts;

  const content = await format(JSON.stringify(packageJson, null, 2), "json-stringify");
  await fs.writeFile(packageJsonPath, content);
  log(`✅ Added 'customize' script: ${DEFAULT_CUSTOMIZE_SCRIPT}`);
}
