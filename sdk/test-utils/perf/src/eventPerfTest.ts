// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import { TestProxyHttpClient, TestProxyHttpClientV1 } from "./testProxyHttpClient";
import { PerfTestBase } from "./perfTestBase";
import { PerfParallel } from "./parallel";

/**
 * Extends PerfTestBase, enables writing perf tests with more flexibility for the methods
 * where the number of operations are dynamic for the method/call being tested.
 */
export abstract class BatchPerfTest<TOptions = Record<string, unknown>> extends PerfTestBase<
  TOptions
> {
  public testProxyHttpClient!: TestProxyHttpClient;
  public testProxyHttpClientV1!: TestProxyHttpClientV1;

  public constructor() {
    super();
    if (this.parsedOptions["test-proxies"].value) {
      
    }
  }

  // Before and after running a bunch of the same this.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract runBatch(abortSignal?: AbortSignalLike): Promise<number>;

  /**
   * Runs the test in scope repeatedly, without waiting for any promises to finish,
   * as many times as possible until durationMilliseconds is reached.
   * For each test run, it will report one more completedOperations on the PerfParallel given,
   * as well as the lastMillisecondsElapsed that reports the last test execution's elapsed time in comparison
   * to the beginning of the execution of runLoop.
   *
   * @param parallel Object where to log the results from each execution.
   * @param durationMilliseconds When to abort any execution.
   * @param abortController Allows us to send through a signal determining when to abort any execution.
   */
  public async runAll(
    parallel: PerfParallel,
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void> {
    parallel.completedOperations = 0;
    parallel.lastMillisecondsElapsed = 0;
    const start = process.hrtime();
    while (!abortController.signal.aborted) {
      const completedOperations = await this.runBatch(abortController.signal);

      const elapsed = process.hrtime(start);
      const elapsedMilliseconds = elapsed[0] * 1000 + elapsed[1] / 1000000;

      parallel.completedOperations += completedOperations;
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
}
