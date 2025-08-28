// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawnSync } from "node:child_process";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { isWindows } from "../../util/platform";

const log = createPrinter("npm-script");

export const commandInfo = makeCommandInfo(
  "npm-script",
  "run a npm script in the context of the project",
  {
    script: {
      shortName: "s",
      kind: "string",
      description: "the name of the npm script to run.",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  if (!options.script) {
    log.error("No npm script specified.");
    return false;
  }

  const { path: projPath, packageJson } = await resolveProject(process.cwd());
  if (packageJson?.scripts?.[options.script] === undefined) {
    log.error(`No npm script "${options.script}" found.`);
    return false;
  }

  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );
  log.info(
    `running npm script "${options.script} -- ${updatedArgs?.join(" ")}" under ${projPath}...`,
  );

  const npmCmd = isWindows() ? "npm.cmd" : "npm";
  const proc = spawnSync(npmCmd, ["run", `${options.script}`, "--", ...(updatedArgs ?? [])], {
    cwd: projPath,
    stdio: "inherit",
    env: process.env,
    shell: isWindows(),
  });

  if (proc.error) {
    log.error(proc.error.message);
    return false;
  }

  if (proc.status !== 0) {
    return false;
  }
  return true;
});
