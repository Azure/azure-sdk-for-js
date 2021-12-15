// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import { isDefined } from "./utils";

/**
 * The structure of a Perf option. They represent command line parameters.
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
   * Options don't need to define longName, since it will be derived from the properties PerfOptionDictionary.
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

/**
 * A group of options is called PerfOptionDictionary,
 * and is shaped as a plain object to make it easier to access them.
 *
 * `keyof TOptions` provides the names of the options. This is necessary to allow TypeScript to suggest the appropriate names
 * for the options and parsedOptions.
 */
export type PerfOptionDictionary<TOptions = Record<string, unknown>> = {
  [longName in keyof TOptions]: OptionDetails<TOptions[longName]>;
};

/**
 * This is exactly same as {@link PerfOptionDictionary}, but the `value` is required.
 * If it's absent and is required, we throw during validation.
 */
export type ParsedPerfOptions<TOptions = Record<string, unknown>> = {
  [longName in keyof TOptions]: OptionDetails<TOptions[longName]> & { value: TOptions[longName] };
};

/**
 * These represent the default options the tests can assume.
 *
 * @interface DefaultPerfOptions
 */
export interface DefaultPerfOptions {
  help: string;
  parallel: number;
  duration: number;
  warmup: number;
  iterations: number;
  "no-cleanup": boolean;
  "milliseconds-to-log": number;
  "test-proxies": string;
  insecure: boolean;
  "list-transitive-dependencies": boolean;
}

/**
 * These are the default options in full.
 */
export const defaultPerfOptions: PerfOptionDictionary<DefaultPerfOptions> = {
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
  "no-cleanup": {
    description: "Disables test cleanup"
  },
  "test-proxies": {
    description: "URIs of TestProxy servers (separated by ';')",
    defaultValue: undefined
  },
  insecure: {
    description:
      "Applied when test-proxies option is defined, connects with https(insecurely by disabling SSL validation)",
    shortName: "ins",
    defaultValue: false
  },
  "milliseconds-to-log": {
    description: "Log frequency in milliseconds",
    shortName: "mtl",
    defaultValue: 1000
  },
  "list-transitive-dependencies": {
    description: "List all dependencies, instead of only direct ones, before test run",
    shortName: "ltd",
    defaultValue: false
  }
};

/**
 * Parses the given options by extracting their values through `minimist`, or setting the default value defined in each option.
 * It also overwrites any present longName with the property name of each option.
 *
 * @param options A dictionary of options to parse using minimist.
 * @returns A new options dictionary.
 */
export function parsePerfOption<TOptions>(
  options: PerfOptionDictionary<TOptions>
): ParsedPerfOptions<TOptions> {
  const minimistResult: MinimistParsedArgs = minimist(
    process.argv,
    getBooleanOptionDetails(options)
  );
  const result: Partial<PerfOptionDictionary<TOptions>> = {};

  for (const optionName of Object.keys(options)) {
    // This cast is needed since we're picking up options from process.argv
    const option = options[optionName as keyof TOptions];

    // Options don't need to define longName, it can be derived from the properties PerfOptionDictionary.
    // That said if longName is defined, it should should override object's key.
    const longName = option.longName ?? optionName;

    const { shortName, defaultValue, required } = option;
    let value: unknown;
    if (isDefined(minimistResult[longName])) {
      value = minimistResult[longName];
    } else if (shortName && isDefined(minimistResult[shortName])) {
      value = minimistResult[shortName];
    } else {
      value = defaultValue;
    }

    if (required && !isDefined(value)) {
      throw new Error(`Option ${longName} is required`);
    }

    result[optionName as keyof TOptions] = {
      ...option,
      longName,
      value
    };
  }

  return result as ParsedPerfOptions<TOptions>;
}

/**
 * Validate that the provided command-line options are all recognized, throwing an error if an unrecognized
 * option is provided.
 *
 * @param options A dictionary of options which should be passed.
 */
export function validateOptions<TOptions>(options: PerfOptionDictionary<TOptions>): void {
  const minimistResult: MinimistParsedArgs = minimist(
    process.argv,
    getBooleanOptionDetails(options)
  );

  const longNames = Object.entries<OptionDetails<unknown>>(options).map(
    ([optionName, { longName }]) => longName ?? optionName
  );
  const shortNames = Object.values<OptionDetails<unknown>>(options)
    .map(({ shortName }) => shortName)
    .filter(Boolean);

  // include _ and -- as these may be present in the MinimistParsedArgs object
  const acceptedOptions = ["_", "--", ...longNames, ...shortNames];
  const unknownOptions = Object.keys(minimistResult).filter((x) => !acceptedOptions.includes(x));

  if (unknownOptions.length !== 0) {
    throw new Error(`Encountered invalid options: ${unknownOptions.join(", ")}`);
  }
}

function getBooleanOptionDetails<TOptions>(options: PerfOptionDictionary<TOptions>) {
  const booleanProps: { boolean: string[]; default: { [key: string]: boolean } } = {
    boolean: [],
    default: {}
  };

  for (const key in options) {
    const defaultValue = options[key].defaultValue;
    if (typeof defaultValue === "boolean") {
      booleanProps.boolean.push(key);
      booleanProps.default[key] = defaultValue;
    }
  }
  return booleanProps;
}
