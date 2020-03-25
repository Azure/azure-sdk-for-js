// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { PerfStressTest } from "./perfStressTest";
import {
  ParsedPerfStressOptions,
  printOptions,
} from "./perfStressOptions";
import { PerfStressTestError } from ".";

export type TestType = "";

export interface PerfStressParallel {
  completedOperations?: number;
  lastMillisecondsElapsed?: number;
}

/**
 * PerfStressProgram
 * receives a PerfStressTest with specific command line parameters,
 * then gets the test ready for a performance/stress test run.
 *
 * Use it like:
 * 
 * ```ts
 * export class Delay500ms extends PerfStressTest<ParsedPerfStressOptions> {
 *   async run(): Promise<void> {
 *     await delay(500);
 *   }
 * }
 * 
 * const perfStressProgram = new PerfStressProgram(new Delay500ms());
 * 
 * perfStressProgram.run();
 * ```
 */
export class PerfStressProgram {
  private test: PerfStressTest<ParsedPerfStressOptions>;
  private testName: string;
  private options: ParsedPerfStressOptions;

  constructor(test: PerfStressTest<ParsedPerfStressOptions>) {
    this.test = test;
    this.testName = this.test.constructor.name;
    this.test.parseOptions();
    this.options = this.test.parsedOptions;

    // --help, or -h
    if (this.options.help.value) {
      console.log(`=== Help: ${this.testName}'s options ===`);
      test.printOptions();
      return;
    }
  }

  private logResults(parallels: PerfStressParallel[]): void {
    const totalOperations = parallels.reduce((sum, i) => sum + i.completedOperations!, 0);
    const operationsPerSecond = parallels.reduce((sum, parallel) => {
      return sum + parallel.completedOperations! / (parallel.lastMillisecondsElapsed! / 1000);
    }, 0);
    const secondsPerOperation = 1 / operationsPerSecond;
    const weightedAverage = totalOperations / operationsPerSecond;
    console.log(
      `Completed ${totalOperations} operations in a weighted-average of ${weightedAverage.toFixed(
        2
      )}s` + ` (${operationsPerSecond.toFixed(2)} ops/s ${secondsPerOperation.toFixed(3)} s/op)`
    );
  }

  private async runLoop(
    parallel: PerfStressParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void> {
    const startedAt = new Date().getTime();
    while (!abortController.signal.aborted) {
      // The event loop is too busy to listen to the setTimeout...
      if (new Date().getTime() - startedAt >= durationMilliseconds) {
        abortController.abort();
      }
      try {
        await this.test.run(abortController.signal);
      } catch (e) {
        if (!(e instanceof PerfStressTestError)) {
          abortController.abort();
          console.error(e);
          break;
        }
      } finally {
        // Nothing to do here
      }
      parallel.completedOperations! += 1;
      parallel.lastMillisecondsElapsed = new Date().getTime() - startedAt!;
    }
  }

  private async runTest(
    iterationIndex: number,
    durationSeconds: number,
    title: string
  ): Promise<void> {
    const parallelNumber = Number(this.options.parallel.value);
    const parallels: PerfStressParallel[] = new Array<PerfStressParallel>(parallelNumber);
    const parallelTestPromises: Promise<void>[] = new Array<Promise<void>>(parallelNumber);

    const abortController = new AbortController();
    const durationMilliseconds = durationSeconds * 1000;
    setTimeout(() => abortController.abort(), durationMilliseconds);

    const millisecondsToLog = Number(this.options["milliseconds-to-log"].value!);

    console.log(
      `\n=== ${title}, iteration ${iterationIndex}: Logs every ${millisecondsToLog / 1000}s ===`
    );
    console.log(`Since Last Log\t\tTotal`);

    const parallel = Number(this.options.parallel.value!);

    let lastInIteration = 0;
    const logInterval = setInterval(() => {
      const inTotal = parallels.reduce((sum, i) => sum + i.completedOperations!, 0);
      const sinceLastLog = inTotal - lastInIteration;
      console.log(sinceLastLog + "\t\t\t" + inTotal);
      lastInIteration = inTotal;
    }, millisecondsToLog);

    for (let i = 0; i < parallel; i++) {
      const parallel: PerfStressParallel = {
        completedOperations: 0
      };
      parallels[i] = parallel;
      parallelTestPromises[i] = this.runLoop(parallel, durationMilliseconds, abortController);
    }
    for (const promise of parallelTestPromises) {
      await promise;
    }

    clearInterval(logInterval);

    console.log(`=== ${title}, iteration ${iterationIndex}: Results ===`);
    this.logResults(parallels);
  }

  public async run(): Promise<void> {
    // There should be no test execution if the help option is passed.
    if (this.options.help.value) {
      return;
    }

    const options = this.options;
    console.log("=== Assigned options ===");
    printOptions(options, ["assignedOptions"]);

    console.log(`=== Assigned options for ${this.testName} ===`);
    this.test.printOptions(["assignedOptions", "nonDefaultOptions"]);

    try {
      console.log(`=== Global setup for ${this.testName} ===`);
      if (this.test.globalSetup) {
        await this.test.globalSetup();
      }
      try {
        if (Number(options.warmup.value) > 0) {
          await this.runTest(0, Number(options.warmup.value), "warmup");
        }

        const iterations = Number(this.options.iterations.value!);
        for (let i = 0; i < iterations; i++) {
          await this.runTest(i, Number(options.duration.value), "test");
        }
      } catch (e) {
        if (!(e instanceof PerfStressTestError)) {
          throw e;
        }
      } finally {
        if (!options["no-cleanups"]) {
          if (this.test.cleanup) {
            await this.test.cleanup();
          }
        }
      }
    } catch (e) {
      if (!(e instanceof PerfStressTestError)) {
        throw e;
      }
    } finally {
      if (!options["no-cleanups"]) {
        if (this.test.globalCleanup) {
          await this.test.globalCleanup();
        }
      }
    }
  }
}
