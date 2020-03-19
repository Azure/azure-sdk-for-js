import { PerfStressTestError } from ".";

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
export function parsePerfStressOption(
  options: PerfStressOption[],
  skipRequired?: boolean
): ParsedPerfStressOptions {
  const argv = process.argv;
  const parsedOptions: ParsedPerfStressOptions = {};

  for (const option of options) {
    let value: PerfStressOptionValue = option.defaultValue;
    let index = 0;
    for (; index < argv.length; index += 1) {
      const element = argv[index];
      if (element === option.shortName || element === `--${option.longName}`) {
        value = argv[index + 1];
        break;
      }
    }
    if (!skipRequired && option.required && value === undefined) {
      throw new PerfStressTestError(`Option ${option.longName} is required`);
    }
    parsedOptions[option.longName] = {
      ...option,
      value
    };
  }

  return parsedOptions;
}

export function printOptions(
  options: ParsedPerfStressOptions | PerfStressOption[],
  filter?: "defaultOptions" | "nonDefaultOptions"
) {
  const filteredOptions: PerfStressOption[] = [];
  for (const longName of Object.keys(options)) {
    const defaultOption = defaultPerfStressOptions.filter((option) => option.longName === longName);
    if (filter === "defaultOptions" && defaultOption) {
      continue;
    }
    if (filter === "nonDefaultOptions" && !defaultOption) {
      continue;
    }
    const option =
      (options as ParsedPerfStressOptions)[longName] ||
      (options as PerfStressOption[]).filter((option) => option.longName === longName);
    if (!option) {
      continue;
    }
    filteredOptions.push(option);
  }
  console.table(filteredOptions);
}

export const defaultPerfStressOptions: PerfStressOption[] = [
  makePerfStressOption(false, "Disables all cleanups", "no-cleanups"),
  makePerfStressOption(false, "Duration of test in seconds", "duration", "d", 10),
  makePerfStressOption(false, "Host to redirect HTTP requests", "host"),
  makePerfStressOption(false, "Allow non-trusted SSL certs", "insecure"),
  makePerfStressOption(false, "Number of iterations of main test loop", "iterations", "i", 1),
  makePerfStressOption(false, "Print job statistics (used by automation)", "job-statistics"),
  makePerfStressOption(false, "Disables test cleanup", "no-cleanup"),
  makePerfStressOption(false, "Number of operations to execute in parallel", "parallel", "p", 1),
  makePerfStressOption(false, "Port to redirect HTTP requests", "port"),
  makePerfStressOption(false, "Runs sync version of test", "sync"),
  makePerfStressOption(false, "Duration of warmup in seconds", "warmup", "w", 5),
  makePerfStressOption(false, "Number of items", "count", "c", 10),
  makePerfStressOption(false, "Size of payload (in bytes)", "size", "s", 10 * 1024),
  makePerfStressOption(false, "Log frequency in milliseconds", "milliseconds-to-log", "mtl", 1000)
];
