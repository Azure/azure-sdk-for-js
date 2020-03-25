// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import { PerfStressTest, PerfStressOptionDictionary } from "../src";

type OptionNames = "non-req" | "non-req-short" | "non-req-default";

export class OptionsTest extends PerfStressTest<OptionNames> {
  public options: PerfStressOptionDictionary<OptionNames> = {
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
    }
  };
  public minimistResult: MinimistParsedArgs;

  constructor() {
    super();
    this.minimistResult = minimist(process.argv);
  }

  compare(longName: OptionNames) {
    if (!(this.options[longName] && this.minimistResult[longName])) {
      return;
    }
    if (this.options[longName].required && !this.options[longName].value) {
      throw new Error(`The option ${longName} is required. It should have a value.`);
    }
    if (this.options[longName].defaultValue && !this.options[longName].value) {
      throw new Error(
        `The option ${longName} says it has a default value. It should therefore have a value.`
      );
    }
    if (
      this.options[longName] !==
      (this.minimistResult[longName] || this.options[longName].defaultValue)
    ) {
      throw new Error(
        `The option ${longName} should be equal in both the inner options object, and the values obtained from minimist, or at least equal to its default value.`
      );
    }
  }

  async run(): Promise<void> {
    for (const key in this.options) {
      this.compare(key as OptionNames);
    }
  }
}
