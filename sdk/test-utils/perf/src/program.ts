// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { PerfTest } from "./perfTest";
import {
  PerfOptionDictionary,
  parsePerfOption,
  defaultPerfOptions,
  DefaultPerfOptions
} from "./options";
import { PerfParallel } from "./parallel";
import { exec } from "child_process";
import { formatDuration } from "./utils";
import { PerfTestBase, PerfTestConstructor } from "./perfTestBase";

/**
 * PerfProgram
 * receives a class extending PerfTest with specific command line parameter names (or just "string"),
 * then gets the test ready for a performance/stress test run.
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
 * const perfProgram = new PerfProgram(Delay500ms);
 *
 * perfProgram.run();
 * ```
 */
export class PerfProgram {
  private testName: string;
  private parsedDefaultOptions: Required<PerfOptionDictionary<DefaultPerfOptions>>;
  private parallelNumber: number;
  private tests: PerfTestBase[];

  /**
   * Receives a test class to instantiate and execute.
   * Parses the test's options and creates some shortcuts.
   * It will instantiate the same test class as many times as the "parallel" command line parameter specifies,
   * which defaults to 1.
   *
   * @param testClass The testClass to be instantiated.
   */
  constructor(testClass: PerfTestConstructor) {
    this.testName = testClass.name;
    this.parsedDefaultOptions = parsePerfOption(defaultPerfOptions);
    this.parallelNumber = Number(this.parsedDefaultOptions.parallel.value);

    console.log(`=== Creating ${this.parallelNumber} instance(s) of ${this.testName} ===`);
    this.tests = new Array<PerfTest<DefaultPerfOptions>>(this.parallelNumber);

    for (let i = 0; i < this.parallelNumber; i++) {
      const test = new testClass();
      this.tests[i] = test;
    }
  }

  private getCompletedOperations(parallels: PerfParallel[]): number {
    return parallels.reduce((sum, i) => sum + i.completedOperations, 0);
  }

  private getOperationsPerSecond(parallels: PerfParallel[]): number {
    return parallels.reduce((sum, parallel) => {
      let parallelResult = 0;
      if (parallel.completedOperations > 0) {
        parallelResult = parallel.completedOperations / (parallel.lastMillisecondsElapsed / 1000);
      }
      return sum + parallelResult;
    }, 0);
  }

  /**
   * Does some calculations based on the parallel executions provided,
   * then logs them in a friendly way.
   *
   * In languages supporting threads, "parallels" mean new threads created in which we run
   * as many functions as possible. Keep in mind that we currently don't support multiple threads in NodeJS.
   * We might be using workers eventually, but for now, "parallel" executions are
   * promises that are executed one after the other without waiting for the previous one to finish.
   * We wait for all of the promises to resolve to consider the "parallel" execution finished.
   *
   * The information logged consists of:
   *
   * - The total operations executed on that parallel run.
   * - The operations per second, which is made through adding up each one of the parallel's
   *   completed operations, divided by the seconds elapsed.
   * - Seconds per operation, which is 1 / operationsPerSecond.
   * - An average of the total operations by the operations per second, which we call weighted-average.
   *
   * @param parallels Parallel executions
   */
  private logResults(parallels: PerfParallel[]): void {
    const totalOperations = this.getCompletedOperations(parallels);
    const operationsPerSecond = this.getOperationsPerSecond(parallels);
    const secondsPerOperation = 1 / operationsPerSecond;
    const weightedAverage = totalOperations / operationsPerSecond;
    console.log(
      `Completed ${totalOperations.toLocaleString(undefined, {
        maximumFractionDigits: 0
      })} ` +
        `operations in a weighted-average of ` +
        `${weightedAverage.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}s ` +
        `(${operationsPerSecond.toLocaleString(undefined, {
          maximumFractionDigits: 2
        })} ops/s, ` +
        `${secondsPerOperation.toLocaleString(undefined, {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3
        })} s/op)`
    );
  }

  // Triggers runLoop as many times as parallels have been passed in through the options.
  // Stops all test executions once the durationSeconds has been reached.
  private async runTests(
    iterationIndex: number,
    durationSeconds: number,
    title: string
  ): Promise<void> {
    const parallels: PerfParallel[] = new Array<PerfParallel>(this.parallelNumber);

    const abortController = new AbortController();
    const durationMilliseconds = durationSeconds * 1000;

    // Even though we've set a setTimeout here, the eventLoop might get too busy to load it on time.
    // For this reason, we also check if the time has passed inside of runLoop.
    setTimeout(() => abortController.abort(), durationMilliseconds);

    // This is how we customize how frequently we log how many completed operations have been executed.
    // We don't enforce this inside of runLoop, so it might never be executed, depending on the number
    // of operations running.
    const millisecondsToLog = Number(this.parsedDefaultOptions["milliseconds-to-log"].value);
    console.log(
      `\n=== ${title} mode, iteration ${iterationIndex + 1}. Logs every ${millisecondsToLog /
        1000}s ===`
    );
    console.log(`ElapsedTime\tCurrent\t\tTotal\t\tAverage`);
    let lastCompleted = 0;
    const startMillis = new Date().getTime();

    const logInterval = setInterval(() => {
      const totalCompleted = this.getCompletedOperations(parallels);
      const currentCompleted = totalCompleted - lastCompleted;
      const averageCompleted = this.getOperationsPerSecond(parallels);
      const elapsedTime = formatDuration(new Date().getTime() - startMillis);

      lastCompleted = totalCompleted;
      console.log(
        `${elapsedTime}\t\t${currentCompleted}\t\t${totalCompleted}\t\t${averageCompleted.toFixed(
          2
        )}`
      );
    }, millisecondsToLog);

    // Unhandled exceptions should stop the whole Perf process.
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    // We begin running the test in scope as many times as possible in sequence,
    // but we trigger these sequences as many times as the parallels option specifies.
    //
    // To do so, we call to runLoop as many times as the parallels options specifies without waiting for its promise to be resolved,
    // then in another loop, we wait for each one of these promises to finish.
    // This should allow for the event loop to decide when to process each test call.
    await Promise.all(
      this.tests.map((test, i = 0) => {
        parallels[i] = {
          completedOperations: 0,
          lastMillisecondsElapsed: 0
        };
        return test.runAll(parallels[i], durationMilliseconds, abortController);
      })
    );

    // Once we finish, we clear the log interval.
    clearInterval(logInterval);

    // Finally, we show the results.
    console.log(`=== ${title} mode, results of iteration ${iterationIndex + 1} ===`);
    this.logResults(parallels);
  }

  private async logPackageVersions(listTransitiveDeps: boolean): Promise<void> {
    return new Promise((resolve) => {
      console.log("=== Versions ===");
      exec(`npm list --prod ${listTransitiveDeps ? "" : "--depth=0"}`, (_error, stdout) => {
        for (const dependency of stdout.split("\n").filter((line) => line.includes("@azure"))) {
          console.log(dependency);
        }
        resolve();
      });
    });
  }

  /**
   * The run() public method lets developers specify when to begin running the selected test
   * under the conditions provided by the command line options.
   * If the command line option for help (--help or -h) is passed in, the program will output
   * the information available of all of the options and close, with no test executions.
   *
   * This method will invoke the test class's "globalSetup" and "globalCleanup" exactly once,
   * and the "setup" and "cleanup" as many times as tests were instantiated
   * (up to the "parallel" command line parameter, which defaults to 1).
   *
   * If the "warmup" command line parameter is defined, the tests will be called
   * until as many seconds as the "warmup" parameter says. This is to adjust
   * to any possible real-time optimizations that the JavaScript runtime might
   * do while executing something repeatedly. This is also a requirement to align with the
   * Perf framework in other languages.
   *
   * If any exception is encountered, the whole process will stop, unless
   * these exceptions are instances of the class PerfTestError, which defines expected errors.
   */
  public async run(): Promise<void> {
    // There should be no test execution if the help option is passed.
    // --help, or -h
    if (this.parsedDefaultOptions.help.value) {
      console.log(`=== Help: Options that can be sent to ${this.testName} ===`);
      console.table(this.tests[0].parsedOptions);
      return;
    }

    await this.logPackageVersions(
      this.parsedDefaultOptions["list-transitive-dependencies"].value ?? false
    );

    const options = this.tests[0].parsedOptions;
    console.log("=== Parsed options ===");
    console.table(options);

    if (this.tests[0].globalSetup) {
      console.log(
        `=== Calling globalSetup() once for (all) the instance(s) of ${this.testName} ===`
      );
      await this.tests[0].globalSetup();
    }

    if (this.tests[0].setup) {
      console.log(
        `=== Calling setup() for the ${this.parallelNumber} instantiated ${this.testName} tests ===`
      );
      for (const test of this.tests) {
        await test.setup?.();
      }
    }

    await Promise.all(this.tests.map((test) => test.postSetup?.()));

    if (Number(options.warmup.value) > 0) {
      await this.runTests(0, Number(options.warmup.value), "warmup");
    }

    const iterations = Number(options.iterations.value);
    for (let i = 0; i < iterations; i++) {
      await this.runTests(i, Number(options.duration.value), "test");
    }

    await Promise.all(this.tests.map((test) => test.preCleanup?.()));

    if (!options["no-cleanup"].value && this.tests[0].cleanup) {
      console.log(
        `=== Calling cleanup() for the ${this.parallelNumber} instantiated ${this.testName} tests ===`
      );
      for (const test of this.tests) {
        await test.cleanup?.();
      }
    }

    if (!options["no-cleanup"].value) {
      if (this.tests[0].globalCleanup) {
        console.log(
          `=== Calling globalCleanup() once for (all) the instance(s) of ${this.testName} ===`
        );
        await this.tests[0].globalCleanup();
      }
    }
  }
}
