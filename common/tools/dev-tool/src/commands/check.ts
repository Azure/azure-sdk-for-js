// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../framework/command";

import { createPrinter } from "../util/printer";
import { wrapRenamed } from "../util/etc";
import formatCommand, { commandInfo as formatCommandInfo } from "./run/format";
import checkConfigCommand, { commandInfo as checkConfigCommandInfo } from "./run/checkConfig";
import { exec } from "../util/exec";

const log = createPrinter("check");

export const commandInfo = makeCommandInfo(
  "check",
  "checks the current package for configuration, linting, and formatting errors",
  {
    fix: {
      allowMultiple: false,
      kind: "boolean",
      default: false,
      description: "attempt to fix errors automatically",
    },
  }
);

interface ExecDescriptor {
  command: string | ((...args: string[]) => Promise<boolean>);
  args: string[];
  // Optionally a description of
  description?: string;
  // Optionally, a descriptor that will fix this error, which may be run automatically
  remedy?: ExecDescriptor;
  // Optionally, advice for fixing this error that will be printed for the user
  advice?: string;
}

/**
 * A list of command descriptors to execute.
 */
const checkStack: ExecDescriptor[] = [
  {
    command: "prettier",
    description: "file format",
    remedy: {
      command: wrapRenamed(formatCommandInfo.name, formatCommand),
      args: [],
      description: "format files",
    },
    args: [
      "--list-different",
      "--config",
      "../../../.prettierrc.json",
      "--ignore-path",
      "../../../.prettierignore",
      "src/**/*.ts",
      "test/**/*.ts",
      "*.{js,json}",
    ],
    advice: "ensure files are formatted properly using 'prettier'",
  },
  {
    command: "eslint",
    description: "source lint",
    args: ["src", "test", "--ext", ".ts,.javascript,.js,.tsx,.jsx"],
  },
  {
    command: wrapRenamed(checkConfigCommandInfo.name, checkConfigCommand),
    description: "configuration",
    args: [],
  },
];

export default leafCommand(commandInfo, async () => {
  let allSucceeded = true;

  for (const descriptor of checkStack) {
    allSucceeded = allSucceeded && (await runCommandDescriptor(descriptor));
  }

  return allSucceeded;
});

async function runCommandDescriptor(
  desc: ExecDescriptor,
  isRetry: boolean = false
): Promise<boolean> {
  const { command, description, args, remedy, advice } = desc;
  const name = typeof command === "function" ? command.name : command;
  const handler =
    typeof command === "function" ? command : (...args: string[]) => exec("npx", [name, ...args]);

  let result: boolean;

  log.debug(`running command ${name}, with args:`, args, process.cwd());

  try {
    result = (await handler(...args)) === 0;

    if (!isRetry && !result && remedy !== undefined) {
      log.warn(`${description} failed, trying remedy`);

      if (await runCommandDescriptor(remedy)) {
        result = await runCommandDescriptor(desc, true);

        if (!result) {
          log.error(`remedy for ${name} failed to resolve the problem`);
        }
      } else {
        log.error(`remedy for ${name} failed to execute`);
        result = false;
      }
    }
  } catch (e) {
    log.error(e);

    result = false;
  }

  if (!isRetry) {
    (result ? log.success : log.error)(`${description}: ${result ? "OK" : "ERR"} (${name})`);
  }

  if (!result && advice !== undefined) {
    log.info(`advice: ${advice}`);
  }

  return result;
}
