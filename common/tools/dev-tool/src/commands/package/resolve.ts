// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import path from "path";

import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";

const log = createPrinter("resolve-package");

export const commandInfo = makeCommandInfo(
  "resolve",
  "display information about the project that owns a directory",
  {
    directory: {
      shortName: "d",
      kind: "string",
      description: "base directory for resolution (uses CWD if unset)",
      allowMultiple: true
    },
    quiet: {
      shortName: "q",
      kind: "boolean",
      default: false,
      description: "output only the directory name with no extra formatting"
    }
  }
);

export default leafCommand(commandInfo, async (options) => {
  const dirs = (options.directory ?? [process.cwd()]).map((p) => path.resolve(p));
  for (const dir of dirs) {
    try {
      const currentPackage = await resolveProject(dir);
      if (options.quiet) {
        console.log(currentPackage.path);
      } else {
        log.success("== Detected package:", currentPackage.name);
        log.info(`Version specifier: ${currentPackage.name}@${currentPackage.version}`);
        log.info(`Location: ${path.resolve(dir, currentPackage.path)}`);
      }
    } catch (error) {
      log.error("Could not find package starting from", dir);
      log.error(error);
    }
  }

  return true;
});
