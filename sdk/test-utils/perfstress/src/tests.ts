// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { default as minimist, ParsedArgs as MinimistParsedArgs } from "minimist";
import { PerfStressOptionDictionary, parsePerfStressOption } from "./options";

/**
 * Defines the behavior of the PerfStressTest constructor, to use the class as a value.
 */
export interface PerfStressTestConstructor<TOptionsNames extends string> {
  new (): PerfStressTest<TOptionsNames>;
}

/**
 * Conveys the structure of any PerfStress test.
 * It allows developers to define the optional parameters to receive
 * in a way that aids them to auto-complete these options while adding code inside of each method.
 * It provides methods to parse the assigned options, as well as to set up and tear down any resources
 * at a global level (only one setup and teardown for the whole execution of a PerfStress test),
 * and at a local level, which happens once for each initialization of the test class
 * (initializations are as many as the "parallel" command line parameter specifies).
 */
export abstract class PerfStressTest<TOptionsNames extends string> {
  public abstract options: PerfStressOptionDictionary<TOptionsNames>;

  public parseOptions() {
    this.options = parsePerfStressOption(this.options) as PerfStressOptionDictionary<TOptionsNames>;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public run?(abortSignal?: AbortSignalLike): void;
  public async runAsync?(abortSignal?: AbortSignalLike): Promise<void>;
}

/**
 * Picks a specific test case by comparing the first command line paramter to the names of the
 * given classes, all of which must extend PerfStressTest.
 * @param tests An array of classes that extend PerfStressTest
 */
export function selectPerfStressTest(
  tests: PerfStressTestConstructor<string>[]
): PerfStressTestConstructor<string> {
  const testsNames: string[] = tests.map((test) => test.name);
  const minimistResult: MinimistParsedArgs = minimist(process.argv);
  const testName = minimistResult._[minimistResult._.length - 1];

  const testIndex = testsNames.indexOf(testName);
  if (testIndex === -1) {
    throw new Error(
      `Couldn't find a test named ${testName}. Try with any of the following: ${testsNames.join(
        ", "
      )}`
    );
  }

  return tests[testIndex];
}
