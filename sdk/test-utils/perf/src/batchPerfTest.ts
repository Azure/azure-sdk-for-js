// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { TestProxyHttpClient, testProxyHttpPolicy } from "./testProxyHttpClient";
import { PerfTestBase } from "./perfTestBase";
import { AdditionalPolicyConfig } from "@azure/core-client";

/**
 * Enables writing perf tests where the number of operations are dynamic for the method/call being tested.
 */
export abstract class BatchPerfTest<
  TOptions = Record<string, unknown>,
> extends PerfTestBase<TOptions> {
  private readonly testProxy!: string;
  public testProxyHttpClient!: TestProxyHttpClient;

  public constructor() {
    super();
    const testProxies = this.parsedOptions["test-proxies"].value;
    if (testProxies) {
      const testProxiesArray = testProxies.split(";");
      this.testProxy = testProxiesArray[this.parallelIndex % testProxiesArray.length];
    }
  }

  public abstract runBatch(abortSignal?: AbortSignalLike): Promise<number>;

  /**
   * configureClientOptions
   *
   * For core-v2 - libraries depending on core-rest-pipeline
   * Apply this method on the client options to get the proxy tool support.
   *
   * Note: Client Options must have "additionalPolicies" as part of the options.
   */
  public configureClientOptions<T extends { additionalPolicies?: AdditionalPolicyConfig[] }>(
    options: T,
  ): T {
    if (this.testProxy) {
      this.testProxyHttpClient = new TestProxyHttpClient(
        this.testProxy,
        this.parsedOptions["insecure"].value ?? false,
      );
      if (!options.additionalPolicies) options.additionalPolicies = [];
      options.additionalPolicies.push({
        policy: testProxyHttpPolicy(
          this.testProxyHttpClient,
          this.testProxy.startsWith("https"),
          this.parsedOptions["insecure"].value ?? false,
        ),
        position: "perRetry",
      });
    }
    return options;
  }

  /**
   * Runs the test in scope repeatedly, without waiting for any promises to finish,
   * as many times as possible until durationMilliseconds is reached.
   * For each test run, it will report one more completedOperations on the PerfParallel given,
   * as well as the lastMillisecondsElapsed that reports the last test execution's elapsed time in comparison
   * to the beginning of the execution of runLoop.
   *
   * @param durationMilliseconds When to abort any execution.
   * @param abortController Allows us to send through a signal determining when to abort any execution.
   */
  public async runAll(
    durationMilliseconds: number,
    abortController: AbortController,
  ): Promise<void> {
    this.completedOperations = 0;
    this.lastMillisecondsElapsed = 0;
    const start = process.hrtime();
    while (!abortController.signal.aborted) {
      const completedOperations = await this.runBatch(abortController.signal);

      const elapsed = process.hrtime(start);
      const elapsedMilliseconds = elapsed[0] * 1000 + elapsed[1] / 1000000;

      this.completedOperations += completedOperations;
      this.lastMillisecondsElapsed = elapsedMilliseconds;

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

  /**
   * This runs after the `setup()` method is run.
   */
  public async postSetup() {
    // Records requests(in the run method) for all the instantiated PerfTest classes,
    // and asks the proxy-tool to start playing back for future requests.
    //
    // Only be executed when the test-proxies option is provided.
    // Expects the proxy tool to be up and running
    if (this.testProxy) return this.recordAndStartPlayback();
  }

  /**
   * This runs before the `cleanup()` method is run.
   */
  public async preCleanup() {
    if (this.testProxy) return this.stopPlayback();
  }

  /**
   * This method records the requests-responses and lets the proxy-server know when to playback.
   * We run run() once in record mode to save the requests and responses in memory and then a ton of times in playback.
   *
   * ## Workflow of the perf test
   * - test resources are setup
   *   - hitting the live service
   * - then start record
   *   - making a request to the proxy server to start recording
   *   - proxy server gives a recording id, we'll use this id to save the actual requests and responses
   * - run the run method once
   *   - proxy-server saves all the requests and responses in memory
   * - stop record
   *   - making a request to the proxy server to stop recording
   * - start playback
   *   - making a request to the proxy server to start playback
   *   - we use the same recording-id that we used in the record mode since that's the only way proxy-server knows what requests are supposed to be played back
   *   - as a response, we get a new recording-id, which will be used for future playback requests
   * - run the run method again
   *   - based on the duration, iterations, and parallel options provided for the perf test
   *   - all the requests in the run method are played back since we have already recorded them before
   * - when the run loops end, stop playback
   *   - making a request to the proxy server to stop playing back
   * - delete the live resources that we have created before
   */
  private async recordAndStartPlayback() {
    // If test-proxy,
    // => then start record
    // => call the run method
    // => stop record
    // => start playback
    let recorder: TestProxyHttpClient;
    if (this.testProxyHttpClient) {
      recorder = this.testProxyHttpClient;
    } else {
      throw new Error(
        "testProxyClient is not set, please make sure the client/options are configured properly.",
      );
    }

    // Call Run() once before starting recording, to avoid capturing one-time setup like authorization requests.
    await this.runBatch();

    await recorder.startRecording();
    recorder._mode = "record";
    await this.runBatch();

    await recorder.stopRecording();
    await recorder.startPlayback();
    recorder._mode = "playback";
  }

  private async stopPlayback() {
    if (this.testProxyHttpClient) {
      await this.testProxyHttpClient.stopPlayback();
    }
  }
}
