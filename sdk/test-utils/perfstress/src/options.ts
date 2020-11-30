// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";

/**
 * The structure of a PerfStress option. They represent command line parameters.
 */
export interface OptionDetails<TType> {
  /**
   * Whether the option is required or not.
   */
  required?: boolean;
  /**
   * The shortName represents a command line argument that is usually short,
   * and when sent through the command line, it should have a single dash `-` before the shortName specified.
   * The value of shortName should not contain dashes.
   */
  shortName?: string;
  /**
   * The longName represents a command line argument that is usually longer than the shortName,
   * and when sent through the command line, it should have two dashes `--` before the longName specified.
   * Options don't need to define longName, since it will be derived from the properties PerfStressOptionDictionary.
   */
  longName?: string;
  /**
   * The default value that is going to be assigned to the option.
   * Expected: string | number | boolean | undefined
   */
  defaultValue?: TType;
  /**
   * The value specified by the user from the command line after either the shortName or the longName.
   * If no value was specified, the defaultValue will be used.
   * If the shortName or longName was specified, but no value was provided, "true" will be set.
   */
  value?: TType;
  /**
   * The description of each option. Descriptions of the assigned options will be shown at the beginning of the test call.
   * Descriptions of all the available options will be shown if the user sends either --help or -h.
   */
  description: string;
}

// TODO: Add docs
type PerfStressOptionDictionaryOptional<TOptions extends DefaultPerfStressOptions> = {
  [longName in keyof TOptions]?: OptionDetails<TOptions[longName]>;
};

/**
 * A group of options is called PerfStressOptionDictionary,
 * and is shaped as a plain object to make it easier to access them.
 * // TODO: Update docs
 *
 * TNames defines the names of the options. This is necessary to allow TypeScript to suggest the appropriate names
 * for the options.
 */
export type PerfStressOptionDictionary<
  TOptions extends DefaultPerfStressOptions
> = PerfStressOptionDictionaryOptional<TOptions> &
  Pick<
    Required<PerfStressOptionDictionaryOptional<TOptions>>,
    keyof Omit<TOptions, keyof DefaultPerfStressOptions>
  >;

// TODO: Add docs
export interface DefaultPerfStressOptions {
  help: string;
  parallel: number;
  duration: number;
  warmup: number;
  iterations: number;
  "no-cleanup": boolean;
  "milliseconds-to-log": number;
  sync: boolean;
}

/**
 * These are the default options in full.
 */
export const defaultPerfStressOptions: PerfStressOptionDictionary<DefaultPerfStressOptions> = {
  help: {
    description: "Shows all of the available options",
    shortName: "h"
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
    defaultValue: 5
  },
  iterations: {
    description: "Times to repeat the whole process, after warmup",
    shortName: "i",
    defaultValue: 1
  },
  sync: {
    description: "Only runs the 'run' method instead of the 'runAsync' method",
    defaultValue: false
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

/**
 * Parses the given options by extracting their values through `minimist`, or setting the default value defined in each option.
 * It also overwrites any present longName with the property name of each option.
 *
 * // TODO: parse to the expected type
 * // TODO: Change T to something else
 * @param options A dictionary of options to parse using minimist.
 * @returns A new options dictionary.
 */
export function parsePerfStressOption<
  T extends PerfStressOptionDictionary<DefaultPerfStressOptions> | {}
>(options: T): Required<T> {
  const minimistResult: MinimistParsedArgs = minimist(process.argv);
  const result = {};

  for (const longName of Object.keys(options)) {
    const option = (options as any)[longName];
    const { shortName, defaultValue, required } = option;
    const value =
      minimistResult[longName] || (shortName && minimistResult[shortName]) || defaultValue;
    if (required && !value) {
      throw new Error(`Option ${longName} is required`);
    }
    // Options don't need to define longName, it can be derived from the properties PerfStressOptionDictionary.
    (result as any)[longName] = {
      ...option,
      longName,
      value
    };
  }

  return result as any;
}
