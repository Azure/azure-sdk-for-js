// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import minimist, { ParsedArgs as MinimistParsedArgs } from "minimist";
import {
  PerfOptionDictionary,
  parsePerfOption,
  DefaultPerfOptions,
  defaultPerfOptions,
  validateOptions,
  ParsedPerfOptions
} from "./options";
import { PerfParallel } from "./parallel";
import { AbortController } from "@azure/abort-controller";

/**
 * Defines the behavior of the PerfTest constructor, to use the class as a value.
 */
export interface PerfTestConstructor<
  TOptions extends Record<string, unknown> = Record<string, unknown>
> {
  new (): PerfTestBase<TOptions>;
}

/**
 * Conveys the structure of any Perf test.
 * It allows developers to define the optional parameters to receive
 * in a way that aids them to auto-complete these options while adding code inside of each method.
 * It provides methods to parse the assigned options, as well as to set up and tear down any resources
 * at a global level (only one setup and teardown for the whole execution of a Perf test),
 * and at a local level, which happens once for each initialization of the test class
 * (initializations are as many as the "parallel" command line parameter specifies).
 */
export abstract class PerfTestBase<TOptions = Record<string, unknown>> {
  public abstract options: PerfOptionDictionary<TOptions>;

  public get parsedOptions(): ParsedPerfOptions<TOptions & DefaultPerfOptions> {
    // Only validate the options if they are defined: if (when) parsedOptions is called
    // in the constructor, options will be undefined.
    if (this.options) {
      validateOptions({
        ...this.options,
        ...defaultPerfOptions
      });
    }

    // This cast is needed because TS thinks
    //   ```ts
    //   PerfOptionDictionary<TOptions & DefaultPerfOptions>
    //   ```
    //    is different from
    //   ```ts
    //    PerfOptionDictionary<TOptions> & PerfOptionDictionary<DefaultPerfOptions>
    //   ```
    return parsePerfOption({
      ...this.options,
      ...defaultPerfOptions
    } as PerfOptionDictionary<TOptions & DefaultPerfOptions>);
  }

  private static globalParallelIndex = 0;
  protected readonly parallelIndex: number;

  public constructor() {
    this.parallelIndex = PerfTestBase.globalParallelIndex;
    PerfTestBase.globalParallelIndex++;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public postSetup?(): void | Promise<void>;
  public preCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract runAll(
    parallel: PerfParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void>;
}

/**
 * Picks a specific test case by comparing the first command line paramter to the names of the
 * given classes, all of which must extend PerfTest.
 * @param tests An array of classes that extend PerfTest
 */
export function selectPerfTest(tests: PerfTestConstructor[]): PerfTestConstructor {
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
