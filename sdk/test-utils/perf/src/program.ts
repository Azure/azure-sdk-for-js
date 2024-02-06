// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTestConstructor } from "./perfTestBase";
import minimist, { ParsedArgs } from "minimist";
import { WorkerPerfProgram } from "./workerProgram";
import { ManagerPerfProgram } from "./managerProgram";
import { multicoreUtils } from "./multicore";

export interface PerfProgram {
  run(): Promise<void>;
}
/**
 * createPerfProgram
 * receives a series of class(es) extending PerfTest. It selects the appropriate test out of those provided based on command-line arguments, and creates an instance of PerfProgram that can be used to run the perf tests.
 *
 * Use it like:
 *
 * ```ts
 * export class Delay500ms extends PerfTest {
 *   public options = {};
 *   async run(): Promise<void> {
 *     await delay(500);
 *   }
 * }
 *
 * const perfProgram = createPerfProgram(Delay500ms);
 *
 * perfProgram.run();
 * ```
 */
export function createPerfProgram(...testClasses: PerfTestConstructor[]): PerfProgram {
  const testClass = selectPerfTest(testClasses);

  if (multicoreUtils.isManager) {
    return new ManagerPerfProgram(testClass);
  } else {
    return new WorkerPerfProgram(testClass);
  }
}

/**
 * Picks a specific test case by comparing the first command line paramter to the names of the
 * given classes, all of which must extend PerfTest.
 * @param tests An array of classes that extend PerfTest
 */
function selectPerfTest(tests: PerfTestConstructor[]): PerfTestConstructor {
  const testsNames: string[] = tests.map((test) => test.name);

  let testName: string;

  if (multicoreUtils.isManager) {
    const minimistResult: ParsedArgs = minimist(process.argv);
    testName = minimistResult._[minimistResult._.length - 1];
  } else {
    testName = multicoreUtils.workerData.testClassName;
  }

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
