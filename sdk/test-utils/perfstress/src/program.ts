// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { PerfStressTest, PerfStressTestConstructor } from "./tests";
import {
  PerfStressOptionDictionary,
  parsePerfStressOption,
  defaultPerfStressOptions,
  DefaultPerfStressOptions
} from "./options";
import { PerfStressParallel } from "./parallel";
import { TestProxyHttpClientV1, TestProxyHttpClient } from "./testProxyHttpClient";

export type TestType = "";

/**
 * PerfStressProgram
 * receives a class extending PerfStressTest with specific command line parameter names (or just "string"),
 * then gets the test ready for a performance/stress test run.
 *
 * Use it like:
 *
 * ```ts
 * export class Delay500ms extends PerfStressTest<string> {
 *   public options = {};
 *   async run(): Promise<void> {
 *     await delay(500);
 *   }
 * }
 *
 * const perfStressProgram = new PerfStressProgram(Delay500ms);
 *
 * perfStressProgram.run();
 * ```
 */
export class PerfStressProgram {
  private testName: string;
  private parsedDefaultOptions: Required<PerfStressOptionDictionary<DefaultPerfStressOptions>>;
  private parallelNumber: number;
  private tests: PerfStressTest[];

  /**
   * Receives a test class to instantiate and execute.
   * Parses the test's options and creates some shortcuts.
   * It will instantiate the same test class as many times as the "parallel" command line parameter specifies,
   * which defaults to 1.
   *
   * @param testClass The testClass to be instantiated.
   */
  constructor(testClass: PerfStressTestConstructor) {
    this.testName = testClass.name;
    this.parsedDefaultOptions = parsePerfStressOption(defaultPerfStressOptions);
    this.parallelNumber = Number(this.parsedDefaultOptions.parallel.value);

    console.log(`=== Creating ${this.parallelNumber} instance(s) of ${this.testName} ===`);
    this.tests = new Array<PerfStressTest<DefaultPerfStressOptions>>(this.parallelNumber);

    for (let i = 0; i < this.parallelNumber; i++) {
      const test = new testClass();
      this.tests[i] = test;
    }
  }

  private getCompletedOperations(parallels: PerfStressParallel[]): number {
    return parallels.reduce((sum, i) => sum + i.completedOperations, 0);
  }

  private getOperationsPerSecond(parallels: PerfStressParallel[]): number {
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
  private logResults(parallels: PerfStressParallel[]): void {
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

  /**
   * Runs the test in scope repeatedly, without waiting for any promises to finish,
   * as many times as possible until durationMilliseconds is reached.
   * For each test run, it will report one more completedOperations on the PerfStressParallel given,
   * as well as the lastMillisecondsElapsed that reports the last test execution's elapsed time in comparison
   * to the beginning of the execution of runLoop.
   *
   * @param parallel Object where to log the results from each execution.
   * @param durationMilliseconds When to abort any execution.
   * @param abortController Allows us to send through a signal determining when to abort any execution.
   */
  private async runLoopAsync(
    test: PerfStressTest,
    parallel: PerfStressParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void> {
    if (!test.runAsync) {
      throw new Error(`The "runAsync" method is missing in the test ${this.testName}`);
    }
    const start = process.hrtime();
    while (!abortController.signal.aborted) {
      await test.runAsync(abortController.signal);

      const elapsed = process.hrtime(start);
      const elapsedMilliseconds = elapsed[0] * 1000 + elapsed[1] / 1000000;

      parallel.completedOperations += 1;
      parallel.lastMillisecondsElapsed = elapsedMilliseconds;

      // In runTest we create a setTimeout that is intended to abort the abortSignal
      // once the durationMilliseconds have elapsed. That setTimeout might not get queued
      // on time through the event loop, depending on the number of operations we might be executing.
      // For this reason, we're also manually checking the elapsed time here.
      if (abortController.signal.aborted || elapsedMilliseconds > durationMilliseconds) {
        abortController.abort();
        break;
      }
    }
  }

  // Triggers runLoop as many times as parallels have been passed in through the options.
  // Stops all test executions once the durationSeconds has been reached.
  private async runTest(
    iterationIndex: number,
    durationSeconds: number,
    title: string
  ): Promise<void> {
    const parallels: PerfStressParallel[] = new Array<PerfStressParallel>(this.parallelNumber);
    const parallelTestResults: Array<Promise<void>> = new Array<Promise<void>>(this.parallelNumber);

    const abortController = new AbortController();
    const durationMilliseconds = durationSeconds * 1000;

    // Even though we've set a setTimeout here, the eventLoop might get too busy to load it on time.
    // For this reason, we also check if the time has passed inside of runLoop.
    setTimeout(() => abortController.abort(), durationMilliseconds);

    const parallel = Number(this.parsedDefaultOptions.parallel.value);

    // This is how we customize how frequently we log how many completed operations have been executed.
    // We don't enforce this inside of runLoop, so it might never be executed, depending on the number
    // of operations running.
    const millisecondsToLog = Number(this.parsedDefaultOptions["milliseconds-to-log"].value);
    console.log(
      `\n=== ${title} mode, iteration ${iterationIndex + 1}. Logs every ${millisecondsToLog /
        1000}s ===`
    );
    console.log(`Current\t\tTotal\t\tAverage`);
    let lastCompleted = 0;
    const logInterval = setInterval(() => {
      const totalCompleted = this.getCompletedOperations(parallels);
      const currentCompleted = totalCompleted - lastCompleted;
      const averageCompleted = this.getOperationsPerSecond(parallels);

      lastCompleted = totalCompleted;
      console.log(`${currentCompleted}\t\t${totalCompleted}\t\t${averageCompleted.toFixed(2)}`);
    }, millisecondsToLog);

    const runLoop = this.runLoopAsync;

    // Unhandled exceptions should stop the whole PerfStress process.
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    // We begin running the test in scope as many times as possible in sequence,
    // but we trigger these sequences as many times as the parallels option specifies.
    //
    // To do so, we call to runLoop as many times as the parallels options specifies without waiting for its promise to be resolved,
    // then in another loop, we wait for each one of these promises to finish.
    // This should allow for the event loop to decide when to process each test call.
    for (let i = 0; i < parallel; i++) {
      const parallel: PerfStressParallel = {
        completedOperations: 0,
        lastMillisecondsElapsed: 0
      };
      parallels[i] = parallel;
      const test = this.tests[i];
      parallelTestResults[i] = runLoop.bind(this)(
        test,
        parallel,
        durationMilliseconds,
        abortController
      );
    }

    for (const promise of parallelTestResults) {
      await promise;
    }

    // Once we finish, we clear the log interval.
    clearInterval(logInterval);

    // Finally, we show the results.
    console.log(`=== ${title} mode, results of iteration ${iterationIndex + 1} ===`);
    this.logResults(parallels);
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
   * PerfStress framework in other languages.
   *
   * If any exception is encountered, the whole process will stop, unless
   * these exceptions are instances of the class PerfStressTestError, which defines expected errors.
   */
  public async run(): Promise<void> {
    // There should be no test execution if the help option is passed.
    // --help, or -h
    if (this.parsedDefaultOptions.help.value) {
      console.log(`=== Help: Options that can be sent to ${this.testName} ===`);
      console.table(this.tests[0].parsedOptions);
      return;
    }

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
        await test.setup!();
      }
    }

    if (this.tests[0].parsedOptions["test-proxy"].value) {
      // Records requests(in runAsync method) for all the instantiated PerfStressTest classes,
      // and asks the proxy-tool to start playing back for future requests.
      await Promise.all(this.tests.map((test) => this.recordAndStartPlayback(test)));
    }

    if (Number(options.warmup.value) > 0) {
      await this.runTest(0, Number(options.warmup.value), "warmup");
    }

    const iterations = Number(options.iterations.value);
    for (let i = 0; i < iterations; i++) {
      await this.runTest(i, Number(options.duration.value), "test");
    }

    if (this.tests[0].parsedOptions["test-proxy"].value) {
      await Promise.all(this.tests.map((test) => this.stopPlayback(test)));
    }

    if (!options["no-cleanup"].value && this.tests[0].cleanup) {
      console.log(
        `=== Calling cleanup() for the ${this.parallelNumber} instantiated ${this.testName} tests ===`
      );
      for (const test of this.tests) {
        await test.cleanup!();
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

  /**
   * This method records the requests-responses and lets the proxy-server know when to playback.
   * We run runAsync once in record mode to save the requests and responses in memory and then a ton of times in playback.
   *
   * ## Workflow of the perf test
   * - test resources are setup
   *   - hitting the live service
   * - then start record
   *   - making a request to the proxy server to start recording
   *   - proxy server gives a recording id, we'll use this id to save the actual requests and responses
   * - run the runAsync once
   *   - proxy-server saves all the requests and responses in memory
   * - stop record
   *   - making a request to the proxy server to stop recording
   * - start playback
   *   - making a request to the proxy server to start playback
   *   - we use the same recording-id that we used in the record mode since that's the only way proxy-server knows what requests are supposed to be played back
   *   - as a response, we get a new recording-id, which will be used for future playback requests
   * - run runAsync again
   *   - based on the duration, iterations, and parallel options provided for the perf test
   *   - all the requests in the runAsync method are played back since we have already recorded them before
   * - when the runAsync loops end, stop playback
   *   - making a request to the proxy server to stop playing back
   * - delete the live resources that we have created before
   */
  private async recordAndStartPlayback(test: PerfStressTest) {
    // If test-proxy,
    // => then start record
    // => run the runAsync
    // => stop record
    // => start playback
    let recorder: TestProxyHttpClientV1 | TestProxyHttpClient;
    if (test.testProxyHttpClient) {
      recorder = test.testProxyHttpClient;
    } else if (test.testProxyHttpClientV1) {
      recorder = test.testProxyHttpClientV1;
    } else {
      throw new Error(
        "testProxyClient is not set, please make sure the client/options are configured properly."
      );
    }

    await recorder.startRecording();
    recorder._mode = "record";
    await test.runAsync!();

    await recorder.stopRecording();
    await recorder.startPlayback();
    recorder._mode = "playback";
  }

  private async stopPlayback(test: PerfStressTest) {
    if (test.testProxyHttpClient) {
      await test.testProxyHttpClient.stopPlayback();
    } else if (test.testProxyHttpClientV1) {
      await test.testProxyHttpClientV1.stopPlayback();
    }
  }
}
