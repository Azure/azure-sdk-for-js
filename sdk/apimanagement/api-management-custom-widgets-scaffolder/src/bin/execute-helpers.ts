// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ReplaceTypesPreserveOptional,
  TValidate,
  TValidateFnc,
  fieldIdToName,
} from "./execute-configs";

import { TConfigs } from "../scaffolding";
import { hideBin } from "yargs/helpers";
import yargsParser from "yargs-parser";

export const extractConfigFromArgs = <TConfig extends TConfigs>(
  argv: yargsParser.Arguments,
  validateConfig: TValidate<TConfig>,
  red: (msg: string) => void
): { configPartial: Partial<TConfig>; missing: boolean } => {
  const configPartial: Partial<TConfig> = {};
  let missing: boolean = false;

  Object.entries(validateConfig).forEach(([key, v]) => {
    const validate = v as TValidateFnc;
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

export type TLog = (msg: string) => void;
type Config = <TConfig extends TConfigs>(
  promptForConfig: (partial: Partial<TConfig>) => Promise<TConfig>,
  validateConfig: ReplaceTypesPreserveOptional<TConfig, TValidateFnc>
) => Promise<TConfig>;

export const buildGetConfig = (gray: TLog, red: TLog): Config => {
  const argv = yargsParser(hideBin(process.argv));
  return async <TConfig extends TConfigs>(
    promptForConfig: (partial: Partial<TConfig>) => Promise<TConfig>,
    validateConfig: TValidate<TConfig>
  ) => {
    const { configPartial, missing } = extractConfigFromArgs(argv, validateConfig, red);

    if (missing || !Object.values(configPartial).length) {
      return promptForConfig(configPartial);
    } else {
      gray("Retrieved from the command parameters");
      Object.entries(configPartial).forEach(
        ([key, value]) => value != null && gray(`${fieldIdToName[key] ?? key}: ${value}`)
      );
      return configPartial as TConfig;
    }
  };
};
