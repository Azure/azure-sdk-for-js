// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import {
  PerfStressOptionDictionary,
  parsePerfStressOption,
  printOptions,
  PrintOptionsFilters,
  DefaultPerfStressOptionNames
} from "./perfStressOptions";

export interface PerfStressTestInterface<TOptionsNames extends string> {
  new (): PerfStressTest<TOptionsNames>;
}

export abstract class PerfStressTest<TOptionsNames extends string> {
  public abstract options: PerfStressOptionDictionary<TOptionsNames>;

  public parseOptions() {
    this.options = parsePerfStressOption(this.options) as PerfStressOptionDictionary<TOptionsNames>;
  }

  public printOptions(pick?: PrintOptionsFilters[]) {
    printOptions(this.options as PerfStressOptionDictionary<DefaultPerfStressOptionNames>, pick);
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal?: AbortSignalLike): void | Promise<void>;
}

export function selectPerfStressTest(
  tests: PerfStressTestInterface<string>[]
): PerfStressTestInterface<string> {
  const testsNames: string[] = tests.map((test) => test.name);
  const minimistResult: MinimistParsedArgs = minimist(process.argv);
  const testName = minimistResult._[minimistResult._.length - 1];

  const testIndex = testsNames.indexOf(testName!);
  if (testIndex === -1) {
    throw new Error(
      `Couldn't find a test named ${testName}. Try with any of the following: ${testsNames.join(
        ", "
      )}`
    );
  }

  return tests[testIndex];
}
