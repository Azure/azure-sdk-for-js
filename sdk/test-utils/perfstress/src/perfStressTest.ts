// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  PerfStressOption,
  ParsedPerfStressOptions,
  parsePerfStressOption,
  defaultPerfStressOptions,
  printOptions,
  PrintOptionsFilters
} from "./perfStressOptions";

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {
  public optionsToParse: PerfStressOption[] = defaultPerfStressOptions;
  public parsedOptions: TOptions = {} as TOptions;

  public printOptions(pick?: PrintOptionsFilters[]) {
    printOptions(this.parsedOptions, pick);
  }

  public parseOptions() {
    this.parsedOptions = parsePerfStressOption(this.optionsToParse) as TOptions;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal?: AbortSignalLike): void | Promise<void>;
}

export function findPerfStressTest(
  tests: PerfStressTest<ParsedPerfStressOptions>[],
  matches: string[]
): PerfStressTest<ParsedPerfStressOptions> {
  const testsNames: string[] = tests.map((test) => test.constructor.name);
  const testName = matches.find((arg) => testsNames.includes(arg));

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
