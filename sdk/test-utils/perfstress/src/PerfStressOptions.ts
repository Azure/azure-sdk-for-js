export type PerfStressOptionValue = string | number | boolean | undefined;

export interface PerfStressOption {
  required: boolean,
  shortName?: string,
  longName: string,
  defaultValue?: PerfStressOptionValue,
  value?: PerfStressOptionValue
  helpText: string,
}

export function makePerfStressOption(required: boolean, helpText: string, longName: string, shortName?: string, defaultValue?: PerfStressOptionValue): PerfStressOption {
  return {
    required,
    shortName,
    longName,
    defaultValue,
    helpText
  }
}

export interface ParsedPerfStressOptions {
  [longName: string]: PerfStressOption
}

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