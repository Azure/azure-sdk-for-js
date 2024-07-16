// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { exec } from "child_process";
import fs from "fs";
import path, { extname } from "path";
import { PlaywrightServiceInitConfig } from "./types";
import { ErrorMessages, Extensions, Languages } from "./constants";

export const executeCommand = (command: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, _) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

export const getLanguageAndConfigInfoFromDirectory = (): PlaywrightServiceInitConfig => {
  const playwrightServiceInitConfig: PlaywrightServiceInitConfig = {
    playwrightConfigFile: null,
    projectLanguage: null,
  };
  if (fs.existsSync("playwright.config.js")) {
    playwrightServiceInitConfig.playwrightConfigFile = "playwright.config.js";
    playwrightServiceInitConfig.projectLanguage = Languages.JavaScript;
  } else if (fs.existsSync("playwright.config.ts")) {
    playwrightServiceInitConfig.playwrightConfigFile = "playwright.config.ts";
    playwrightServiceInitConfig.projectLanguage = Languages.TypeScript;
  } else {
    throw new Error(ErrorMessages.NO_CONFIGURATION_FILE_FOUND);
  }
  return playwrightServiceInitConfig;
};

export const getLanguageAndConfigInfoFromConfigurationFile = (
  playwrightConfigFile: string,
): PlaywrightServiceInitConfig => {
  const playwrightServiceInitConfig: PlaywrightServiceInitConfig = {
    playwrightConfigFile: null,
    projectLanguage: null,
  };
  playwrightServiceInitConfig.playwrightConfigFile = playwrightConfigFile;
  const extension = extname(playwrightConfigFile);
  if (extension === Extensions.TypeScript) {
    playwrightServiceInitConfig.projectLanguage = Languages.TypeScript;
  } else if (extension === Extensions.JavaScript) {
    playwrightServiceInitConfig.projectLanguage = Languages.JavaScript;
  } else throw new Error(ErrorMessages.UNSUPPORTED_CONFIGURATION_FILE);
  return playwrightServiceInitConfig;
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
