// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";

const log = createPrinter("customization-init");

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
    return true;
  } catch {
    // generated/ doesn't exist, proceed with copying
  }

  await fs.cp(srcDirectory, generatedDirectory, { recursive: true });
  log("✅ Copied src/ to generated/. You can now customize files in src/.");

  return true;
});
