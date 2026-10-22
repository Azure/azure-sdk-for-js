// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import fs from "node:fs/promises";
import { findWarpConfig } from "@microsoft/warp";
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

  if ((await fs.readdir(info.path)).includes("generated")) {
    log(
      "❌ This package has a root generated/ baseline. Migrate existing customizations separately.",
    );
    return false;
  }

  try {
    await fs.access(srcDirectory);
  } catch {
    log("❌ Could not find src/ directory. Nothing to initialize.");
    return false;
  }

  const resolved = await findWarpConfig(info.path);
  if (!resolved) {
    throw new Error("A Warp configuration is required to locate public source entry points.");
  }
  const barrels = new Map<string, string>();
  for (const source of Object.values(resolved.config.exports)) {
    const file = path.resolve(info.path, source);
    const relativeSource = path.relative(srcDirectory, file);
    if (
      relativeSource === ".." ||
      relativeSource.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeSource)
    ) {
      continue;
    }
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
