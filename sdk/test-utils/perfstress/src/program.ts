// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { PerfStressTest } from "./perfStressTest";
import { ParsedPerfStressOptions, printOptions } from "./perfStressOptions";
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

  /**
   * Receives a test to execute.
   * Parses the test's options and creates some shortcuts.
   *
   * @param test The test to be executed.
   */
  constructor(test: PerfStressTest<ParsedPerfStressOptions>) {
    this.test = test;
    this.testName = this.test.constructor.name;
    this.test.parseOptions();
    this.options = this.test.parsedOptions;
  }

  /**
   * Does some calculations based on the parallel executions provided,
   * then logs them in a friendly way.
   *
   * @param parallels Parallel executions
   */
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

  /**
   * Runs the test in scope repeatedly, as many times as possible until durationMilliseconds is reached.
   * For each test run, it will report one more completedOperations on the PerfStressParallel given,
   * as well as the lastMillisecondsElapsed that reports the last test execution's elapsed time in comparison
   * to the beginning of the execution of runLoop.
   *
   * @param parallel Object where to log the results from each execution.
   * @param durationMilliseconds When to abort any execution.
   * @param abortController Allows us to send through a signal determining when to abort any execution.
   */
  private async runLoop(
    parallel: PerfStressParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void> {
    const startedAt = new Date().getTime();
    while (!abortController.signal.aborted) {
      // In runTest we create a setTimeout that is intended to abort the abortSignal
      // once the durationMilliseconds have elapsed. That setTimeout might not get queued
      // on time through the event loop, depending on the number of operations we might be executing.
      // For this reason, we're also manually checking the elapsed time here.
      if (
        abortController.signal.aborted ||
        new Date().getTime() - startedAt >= durationMilliseconds
      ) {
        abortController.abort();
        break;
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

  // Triggers runLoop as many times as parallels have been passed in through the options.
  // Stops all test executions once the durationSeconds has been reached.
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

    // Even though we've set a setTimeout here, the eventLoop might get too busy to load it on time.
    // For this reason, we also check if the time has passed inside of runLoop.
    setTimeout(() => abortController.abort(), durationMilliseconds);

    const parallel = Number(this.options.parallel.value!);

    // This is how we customize how frequently we log how many completed operations have been executed.
    // We don't enforce this inside of runLoop, so it might never be executed, depending on the number
    // of operations running.
    const millisecondsToLog = Number(this.options["milliseconds-to-log"].value!);
    console.log(
      `\n=== ${title}, iteration ${iterationIndex}: Logs every ${millisecondsToLog / 1000}s ===`
    );
    console.log(`Since Last Log\t\tTotal`);
    let lastInIteration = 0;
    const logInterval = setInterval(() => {
      const inTotal = parallels.reduce((sum, i) => sum + i.completedOperations!, 0);
      const sinceLastLog = inTotal - lastInIteration;
      console.log(sinceLastLog + "\t\t\t" + inTotal);
      lastInIteration = inTotal;
    }, millisecondsToLog);

    // We begin running the test in scope as many times as possible in sequence,
    // but we trigger these sequences as many times as the parallels option specifies.
    //
    // To do so, we call to runLoop as many times as the parallels options specifies without waiting for its promise to be resolved,
    // then in another loop, we wait for each one of these promises to finish.
    // This should allow for the event loop to decide when to process each test call.
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

    // Once we finish, we clear the log interval.
    clearInterval(logInterval);

    // Finally, we show the results.
    console.log(`=== ${title}, iteration ${iterationIndex}: Results ===`);
    this.logResults(parallels);
  }

  /**
   * The run() public method lets developers specify when to begin running the selected test
   * under the conditions provided by the command line options.
   * If the command line option for help (--help or -h) is passed in, the program will output
   * the information available of all of the options and close, with no test executions.
   */
  public async run(): Promise<void> {
    // There should be no test execution if the help option is passed.
    // --help, or -h
    if (this.options.help.value) {
      console.log(`=== Help: Options that can be sent to ${this.testName} ===`);
      this.test.printOptions();
      return;
    }

    const options = this.options;
    console.log("=== Assigned options ===");
    printOptions(options, ["assignedOptions"]);

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
