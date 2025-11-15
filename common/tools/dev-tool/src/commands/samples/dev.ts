// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdir, symlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";

const log = createPrinter("dev-samples");

export const commandInfo = makeCommandInfo(
  "dev",
  "link samples to local sources for access to IntelliSense during development",
);

export default leafCommand(commandInfo, async () => {
  const pkg = await resolveProject(process.cwd());

  const relativeLinkName = path.join("samples", "typescript", "node_modules", pkg.name);
  const linkName = path.join(pkg.path, relativeLinkName);
  const relativeLinkTarget = path.relative(linkName, path.join(pkg.path, "samples"));

  await mkdir(path.dirname(linkName), { recursive: true });

  if (existsSync(linkName)) {
    log.error("Link already exists:", linkName);
    log.error("Make sure your samples tree is pristine before running dev-samples.");
    return false;
  }

  log.info(`Linking ${relativeLinkName} to ${relativeLinkTarget}`);

  await symlink(relativeLinkTarget, linkName);

  return true;
});
