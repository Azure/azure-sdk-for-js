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
  required: boolean;
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
   */
  longName: string;
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

export function makePerfStressOption(
  required: boolean,
  description: string,
  longName: string,
  shortName?: string,
  defaultValue?: PerfStressOptionValue
): PerfStressOption {
  return {
    required,
    shortName,
    longName,
    defaultValue,
    description
  };
}

export interface ParsedPerfStressOptions {
  [longName: string]: PerfStressOption;
}

export function parsePerfStressOption(
  options: PerfStressOption[],
  skipRequired?: boolean
): ParsedPerfStressOptions {
  const parsedOptions: ParsedPerfStressOptions = {};
  const minimistResult: MinimistParsedArgs = minimist(process.argv);

  for (const option of options) {
    const { longName, shortName, defaultValue, required } = option;
    const value =
      minimistResult[longName] || (shortName && minimistResult[shortName]) || defaultValue;
    if (!skipRequired && required && !value) {
      throw new Error(`Option ${longName} is required`);
    }
    parsedOptions[longName] = {
      ...option,
      value
    };
  }

  return parsedOptions;
}

export const defaultPerfStressOptions: PerfStressOption[] = [
  makePerfStressOption(false, "Shows all of the available options", "help", "h"),
  makePerfStressOption(false, "Disables all cleanups", "no-cleanups"),
  makePerfStressOption(
    false,
    "How many of the same test to call at the same time",
    "parallel",
    "p",
    1
  ),
  makePerfStressOption(false, "When to stop calling tests at all", "duration", "d", 10),
  makePerfStressOption(false, "Duration of warmup in seconds", "warmup", "w", 0),
  makePerfStressOption(
    false,
    "Times to repeat the whole process, after warmup",
    "iterations",
    "i",
    1
  ),
  makePerfStressOption(false, "Host to redirect HTTP requests", "host"),
  makePerfStressOption(false, "Allow non-trusted SSL certs", "insecure"),
  makePerfStressOption(false, "Print job statistics (used by automation)", "job-statistics"),
  makePerfStressOption(false, "Disables test cleanup", "no-cleanup"),
  makePerfStressOption(false, "Port to redirect HTTP requests", "port"),
  makePerfStressOption(false, "Runs sync version of test", "sync"),
  makePerfStressOption(false, "Number of items", "count", "c", 10),
  makePerfStressOption(false, "Size of payload (in bytes)", "size", "s", 10 * 1024),
  makePerfStressOption(false, "Log frequency in milliseconds", "milliseconds-to-log", "mtl", 1000)
];

export type PrintOptionsFilters = "defaultOptions" | "nonDefaultOptions" | "assignedOptions";

export function printOptions(options: ParsedPerfStressOptions, pick?: PrintOptionsFilters[]) {
  const filteredOptions: PerfStressOption[] = [];
  for (const longName of Object.keys(options)) {
    const option = options[longName];
    const defaultOption = defaultPerfStressOptions.find((option) => option.longName === longName);
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
