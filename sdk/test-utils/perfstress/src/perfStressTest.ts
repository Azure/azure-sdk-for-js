// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import {
  PerfStressOption,
  ParsedPerfStressOptions,
  parsePerfStressOption,
  defaultPerfStressOptions,
  printOptions,
  PrintOptionsFilters
} from "./perfStressOptions";

export interface PerfStressTestInterface<TOptions extends ParsedPerfStressOptions> {
  new (): PerfStressTest<TOptions>;
}

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {
  public customOptions: PerfStressOption[] = defaultPerfStressOptions;
  public parsedOptions: TOptions = {} as TOptions;

  public parseOptions() {
    this.parsedOptions = parsePerfStressOption([
      ...defaultPerfStressOptions,
      ...this.customOptions
    ]) as TOptions;
  }

  public printOptions(pick?: PrintOptionsFilters[]) {
    printOptions(this.parsedOptions, pick);
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal?: AbortSignalLike): void | Promise<void>;
}

export function selectPerfStressTest(
  tests: PerfStressTestInterface<ParsedPerfStressOptions>[]
): PerfStressTestInterface<ParsedPerfStressOptions> {
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
