import { defaultPerfStressOptions } from "./defaults";

export type PerfStressOptionValue = string | number | boolean | undefined;

export interface PerfStressOption {
  required: boolean;
  shortName?: string;
  longName: string;
  defaultValue?: PerfStressOptionValue;
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

// Probably use a third party library
export function parsePerfStressOption(...options: PerfStressOption[]): ParsedPerfStressOptions {
  const argv = process.argv;
  const parsedOptions: ParsedPerfStressOptions = {};

  for (const option of options) {
    let value: PerfStressOptionValue = option.defaultValue;
    let index = 0;
    for (; index < argv.length; index += 1) {
      const element = argv[index];
      if (element === option.shortName || element === option.longName) {
        value = argv[index + 1];
        break;
      }
    }
    parsedOptions[option.longName] = {
      ...option,
      value
    };
  }

  return parsedOptions;
}

export function printOptions(
  options: ParsedPerfStressOptions,
  filter?: "defaultOptions" | "nonDefaultOptions"
) {
  console.log("longName\t\tshortName\t\tdescription\t\trequired\t\tvalue\t\tdefaultValue");
  for (const key in Object.keys(options)) {
    if (filter === "nonDefaultOptions" && defaultPerfStressOptions[key]) {
      continue;
    }
    if (filter === "defaultOptions" && !defaultPerfStressOptions[key]) {
      continue;
    }
    const { longName, shortName, description, required, value, defaultValue } = options[key];
    console.log(
      `${longName}\t\t${shortName}\t\t${description}\t\t${required}\t\t${value}\t\t${defaultValue}`
    );
  }
}
