// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "@azure/core-process";
import fs from "node:fs";
import path, { extname } from "node:path";
import type { CLIArguments, PlaywrightServiceInitConfig, ProcessCommand } from "./types.js";
import { ErrorMessages, Extensions, Languages } from "./constants.js";

export const executeCommand = async (command: ProcessCommand): Promise<string> => {
  const { stdout } = await execFile(command.command, command.args, {
    allowWindowsBatchFiles: true,
    encoding: "utf8",
  });
  return stdout;
};

export const formatCommand = (command: ProcessCommand): string => {
  return [command.command, ...command.args].join(" ");
};

export const getLanguageAndConfigInfoFromDirectory = (): PlaywrightServiceInitConfig => {
  if (fs.existsSync("playwright.config.js")) {
    return {
      playwrightConfigFile: "playwright.config.js",
      projectLanguage: Languages.JavaScript,
    };
  } else if (fs.existsSync("playwright.config.ts")) {
    return {
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    };
  } else {
    throw new Error(ErrorMessages.NO_CONFIGURATION_FILE_FOUND);
  }
};

export const getLanguageAndConfigInfoFromConfigurationFile = (
  playwrightConfigFile: string,
): PlaywrightServiceInitConfig => {
  const extension = extname(playwrightConfigFile);
  if (extension === Extensions.TypeScript) {
    return {
      playwrightConfigFile,
      projectLanguage: Languages.TypeScript,
    };
  } else if (extension === Extensions.JavaScript) {
    return {
      playwrightConfigFile,
      projectLanguage: Languages.JavaScript,
    };
  } else throw new Error(ErrorMessages.UNSUPPORTED_CONFIGURATION_FILE);
};

export const getFileReferenceForImport = (filePath: string): string => {
  const normalizedPath = filePath.split(path.sep).join("/");
  const parsedPath = path.parse(normalizedPath);
  const withoutExtension = path.posix.join(parsedPath.dir, parsedPath.name);
  if (path.isAbsolute(filePath)) {
    return withoutExtension;
  }
  if (!withoutExtension.startsWith("./") && !withoutExtension.startsWith("../")) {
    return `./${withoutExtension}`;
  }
  return withoutExtension;
};

export const showHelpForCLI = (): string => {
  return `
Usage: index [options]

playwright configuration file

Options:
  -c, --config <config>
  -h, --help             display help for command
`;
};

export const parseCLIArguments = (): CLIArguments => {
  const args = process.argv.slice(2);
  const cliArguments: CLIArguments = {
    config: "",
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-c" || args[i] === "--config") {
      cliArguments.config = args[i + 1];
    } else if (args[i] === "-h" || args[i] === "--help") {
      console.log(showHelpForCLI());
      process.exit(0);
    }
  }
  return cliArguments;
};
