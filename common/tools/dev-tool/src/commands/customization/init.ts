// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { resolveProject } from "../../util/resolveProject.ts";
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
  const srcDirectory = path.join(info.path, "src");
  const generatedDirectory = path.join(srcDirectory, "generated");

  try {
    await fs.access(srcDirectory);
  } catch {
    log("❌ Could not find src/ directory. Nothing to initialize.");
    return false;
  }

  const entries = await fs.readdir(srcDirectory);
  await fs.mkdir(generatedDirectory);
  for (const entry of entries) {
    await fs.rename(path.join(srcDirectory, entry), path.join(generatedDirectory, entry));
  }
  await fs.writeFile(
    path.join(srcDirectory, "index.ts"),
    `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./generated/index.js";
`,
  );
  log("✅ Moved source to src/generated/. Customize files outside src/generated/.");
  return true;
});
