// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import { PerfTest, PerfOptionDictionary } from "../src";

interface OptionsTestOptions {
  "non-req": string;
  "non-req-short": string;
  "non-req-default": number;
  req: string;
  "req-short": string;
  "req-default": number;
  longName: string;
}

/**
 * Showcases and verifies some of the expected behaviors of the Perf options
 */
export class OptionsTest extends PerfTest<OptionsTestOptions> {
  public options: PerfOptionDictionary<OptionsTestOptions> = {
    "non-req": {
      description: "Non-required option"
    },
    "non-req-short": {
      description: "Non-required option with short name",
      shortName: "nro"
    },
    "non-req-default": {
      description: "Non-required option with default value",
      defaultValue: 10
    },
    req: {
      required: true,
      description: "Required option"
    },
    "req-short": {
      description: "Required option with short name",
      shortName: "ro"
    },
    "req-default": {
      description: "Required option with default value",
      defaultValue: 10
    },
    longName: {
      description: "Option with long name specified in option body",
      longName: "long-name",
      defaultValue: "ln"
    }
  };
  public minimistResult: MinimistParsedArgs;

  constructor() {
    super();
    this.minimistResult = minimist(process.argv);
  }

  compare(optionName: keyof OptionsTestOptions): void {
    const longName = (this.options[optionName].longName ??
      optionName) as keyof PerfOptionDictionary<OptionsTestOptions>;

    if (!(this.options[optionName] && this.parsedOptions[longName])) {
      return;
    }
    if (this.options[optionName].required && !this.parsedOptions[longName].value) {
      throw new Error(`The option ${optionName} is required. It should have a value.`);
    }
    if (this.options[optionName].defaultValue && !this.parsedOptions[longName].value) {
      throw new Error(
        `The option ${optionName} says it has a default value. It should therefore have a value.`
      );
    }
    if (
      this.parsedOptions[optionName].value !==
      (this.minimistResult[longName] || this.options[optionName].defaultValue)
    ) {
      throw new Error(
        `The option ${optionName} should be equal in both the inner options object, and the values obtained from minimist, or at least equal to its default value.`
      );
    }
  }

  async run(): Promise<void> {
    for (const key in this.options) {
      this.compare(key as keyof OptionsTestOptions);
    }
  }

  async runAsync(): Promise<void> {
    // do nothing
  }
}
