// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ReplaceTypesPreserveOptional,
  Validate,
  ValidateFnc,
  fieldIdToName,
} from "./execute-configs.js";
import { Configs } from "../scaffolding.js";
import { hideBin } from "yargs/helpers";
import yargsParser from "yargs-parser";

export const extractConfigFromArgs = <TConfig extends Configs>(
  argv: yargsParser.Arguments,
  validateConfig: Validate<TConfig>,
  red: (msg: string) => void,
): { configPartial: Partial<TConfig>; missing: boolean } => {
  const configPartial: Partial<TConfig> = {};
  let missing: boolean = false;

  Object.entries(validateConfig).forEach(([key, v]) => {
    const validate = v as ValidateFnc;
    const value = argv[key];
    const response = validate(value);

    if (response === true) {
      if (value !== null && value !== undefined) {
        configPartial[key as keyof typeof validateConfig] = value;
      }
    } else if (value === null || value === undefined) {
      missing = true;
    } else {
      missing = true;
      red(`"${value}" is not a valid value for "${key}"`);
      if (typeof response === "string") red(response);
    }
  });

  return { configPartial, missing };
};

export type Log = (msg: string) => void;
type Config = <C extends Configs>(
  promptForConfig: (partial: Partial<C>) => Promise<C>,
  validateConfig: ReplaceTypesPreserveOptional<C, ValidateFnc>,
) => Promise<C>;

export const buildGetConfig = (gray: Log, red: Log): Config => {
  const argv = yargsParser(hideBin(process.argv));
  return async <C extends Configs>(
    promptForConfig: (partial: Partial<C>) => Promise<C>,
    validateConfig: Validate<C>,
  ) => {
    const { configPartial, missing } = extractConfigFromArgs(argv, validateConfig, red);

    if (missing || !Object.values(configPartial).length) {
      return promptForConfig(configPartial);
    } else {
      gray("Retrieved from the command parameters");
      Object.entries(configPartial).forEach(
        ([key, value]) => value != null && gray(`${fieldIdToName[key] ?? key}: ${value}`),
      );
      return configPartial as C;
    }
  };
};
