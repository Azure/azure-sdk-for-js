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

// TODO:
// Use a third party library?
// We want this to run on browsers too though, and to tighten the control over the dependencies...

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
      if (element === `-${option.shortName}` || element === `--${option.longName}`) {
        // Sets true by default.
        value = true;
        // Picks the next element if it doesn't begin with `--`
        const next = argv[index + 1];
        if (next && next[0] !== "-") {
          value = next;
        }
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
  pick?: "defaultOptions" | "nonDefaultOptions" | "assignedOptions"
) {
  const filteredOptions: PerfStressOption[] = [];
  for (const longName of Object.keys(options)) {
    const defaultOption = defaultPerfStressOptions.filter((option) => option.longName === longName);
    if (pick === "nonDefaultOptions" && defaultOption) {
      continue;
    }
    if (pick === "defaultOptions" && !defaultOption) {
      continue;
    }
    const option =
      (options as ParsedPerfStressOptions)[longName] ||
      (options as PerfStressOption[]).filter((option) => option.longName === longName);
    if (!option) {
      continue;
    }
    if (pick === "assignedOptions" && !option.value) {
      continue;
    }
    filteredOptions.push(option);
  }
  if (filteredOptions.length) {
    console.table(filteredOptions);
  }
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
