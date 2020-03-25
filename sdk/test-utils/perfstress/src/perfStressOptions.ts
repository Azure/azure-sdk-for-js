// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";

/**
 * Possible values for each PerfStress option
 */
export type PerfStressOptionValue = string | number | boolean | undefined;

/**
 * Details for a PerfStress option
 */
export interface PerfStressOption {
  /**
   * Wether the option is required or not.
   */
  required?: boolean;
  /**
   * The shortName represents a command line argument that is usually short,
   * and when sent through the command line, it should have a single dash `-` before the shortName specified.
   * The value of shortName should not contain dashes.
   * Only alpha-numeric values are accepted.
   */
  shortName?: string;
  /**
   * The longName represents a command line argument that is usually longer than the shortName,
   * and when sent through the command line, it should have two dashes `--` before the longName specified.
   * The value of longName should not contain dashes.
   * Only alpha-numeric values are accepted.
   * Options don't need to define longName, it can be derived from the properties PerfStressOptionDictionary.
   */
  longName?: string;
  /**
   * The default value that is going to be assigned to the option.
   */
  defaultValue?: PerfStressOptionValue;
  /**
   * The value specified by the user from the command line after either the shortName or the longName.
   * If no value was specified, the defaultValue will be used.
   * If the shortName or longName was specified, but no value was provided, "true" will be set.
   */
  value?: PerfStressOptionValue;
  description: string;
}

export type DefaultPerfStressOptionNames =
  | "help"
  | "no-cleanups"
  | "parallel"
  | "duration"
  | "warmup"
  | "iterations"
  | "no-cleanup"
  | "milliseconds-to-log";

export const defaultPerfStressOptions: PerfStressOptionDictionary<DefaultPerfStressOptionNames> = {
  help: {
    description: "Shows all of the available options",
    shortName: "h"
  },
  "no-cleanups": {
    description: "Disables all cleanups"
  },
  parallel: {
    description: "How many of the same test to call at the same time",
    shortName: "p",
    defaultValue: 1
  },
  duration: {
    description: "When to stop calling tests at all",
    shortName: "d",
    defaultValue: 10
  },
  warmup: {
    description: "Duration of warmup in seconds",
    shortName: "w",
    defaultValue: 0
  },
  iterations: {
    description: "Times to repeat the whole process, after warmup",
    shortName: "i",
    defaultValue: 1
  },
  "no-cleanup": {
    description: "Disables test cleanup"
  },
  "milliseconds-to-log": {
    description: "Log frequency in milliseconds",
    shortName: "mtl",
    defaultValue: 1000
  }
};

export type PerfStressOptionDictionary<TNames extends string> = {
  [longName in TNames]: PerfStressOption;
};

export function parsePerfStressOption(
  options: PerfStressOptionDictionary<string>,
  skipRequired?: boolean
): PerfStressOptionDictionary<DefaultPerfStressOptionNames> {
  const minimistResult: MinimistParsedArgs = minimist(process.argv);
  const result: PerfStressOptionDictionary<DefaultPerfStressOptionNames> = defaultPerfStressOptions;

  for (const longName of Object.keys(options)) {
    const option = (options as any)[longName];
    const { shortName, defaultValue, required } = option;
    const value =
      minimistResult[longName] || (shortName && minimistResult[shortName]) || defaultValue;
    if (!skipRequired && required && !value) {
      throw new Error(`Option ${longName} is required`);
    }
    // Options don't need to define longName, it can be derived from the properties PerfStressOptionDictionary.
    (result as any)[longName] = {
      longName,
      ...option,
      value
    };
  }

  return result;
}

export type PrintOptionsFilters = "defaultOptions" | "nonDefaultOptions" | "assignedOptions";

export function printOptions(
  options: PerfStressOptionDictionary<DefaultPerfStressOptionNames>,
  pick?: PrintOptionsFilters[]
) {
  const filteredOptions: PerfStressOption[] = [];
  for (const longName of Object.keys(options)) {
    const option = (options as any)[longName];
    const defaultOption = (defaultPerfStressOptions as any)[longName];
    if (pick?.includes("nonDefaultOptions") && defaultOption) {
      continue;
    }
    if (pick?.includes("defaultOptions") && !defaultOption) {
      continue;
    }
    if (pick?.includes("assignedOptions") && !option.value) {
      continue;
    }
    filteredOptions.push(option);
  }
  if (filteredOptions.length) {
    console.table(filteredOptions);
  }
}
