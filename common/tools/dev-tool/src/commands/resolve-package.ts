// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import path from "path";

import { resolveProject } from "../util/resolveProject";
import { createPrinter } from "../util/printer";

const log = createPrinter("resolve-package");

export const helpText =
  "display information about the project that owns the current directory";

export default async function(..._: string[]): Promise<boolean> {
  const cwd = process.cwd();
  try {
    const currentPackage = await resolveProject(cwd);
    log.success("== Detected package:", currentPackage.name);
    log.info(
      `Version specifier: ${currentPackage.name}@${currentPackage.version}`
    );
    log.info(`Location: ${path.resolve(cwd, currentPackage.path)}`);
  } catch (error) {
    log.error("Could not find package starting from", cwd);
    log.error(error);
    return false;
  }

  return true;
}
