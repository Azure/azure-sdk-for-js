// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { PerfTestBase } from "./perfTestBase";
import { isDefined } from "./utils";

/**
 * Extends PerfTestBase, enables writing perf tests for the APIs that receive events as a stream
 * - Typically, such APIs("subscribe" method) offered by the AMQP based SDKs - event-hubs/service-bus.
 */
export abstract class EventPerfTest<
  TOptions = Record<string, unknown>
> extends PerfTestBase<TOptions> {
  start: [number, number]; // process.hrtime()
  private testDuration = 0;
  private abortController: AbortController | undefined;

  constructor() {
    super();
    this.start = [0, 0];
    this.completedOperations = 0;
    this.lastMillisecondsElapsed = 0;
  }

  /**
   * Waits for the provided duration, aborts if the signal was received before the duration.
   *
   * During this, "subscribe" method which is supposed to be called
   * from the "setup" should be receiving the events as a stream.
   *
   * @param durationMilliseconds When to abort any execution.
   * @param abortController Allows us to send through a signal determining when to abort any execution.
   */
  public async runAll(
    durationMilliseconds: number,
    abortController: AbortController
  ): Promise<void> {
    // call run
    this.start = process.hrtime();
    this.completedOperations = 0;
    this.lastMillisecondsElapsed = 0;
    this.testDuration = durationMilliseconds;
    this.abortController = abortController;
    try {
      await delay(this.testDuration, this.abortController.signal);
    } catch (error) {
      console.warn(error);
    }
  }

  public async eventRaised(): Promise<void> {
    this.completedOperations++;
    this.lastMillisecondsElapsed = this.getTimeElapsedInMilliseconds();
    this.isTimeExceeded() && !this.abortController?.signal.aborted && this.abortController?.abort();
  }

  public async errorRaised(error: Error): Promise<void> {
    console.warn(`Error occurred:\n ${error}`);
    !this.abortController?.signal.aborted && this.abortController?.abort();
  }

  private getTimeElapsedInMilliseconds() {
    const elapsed = process.hrtime(this.start);
    const elapsedMilliseconds = elapsed[0] * 1000 + elapsed[1] / 1000000;
    return elapsedMilliseconds;
  }

  private isTimeExceeded() {
    return this.getTimeElapsedInMilliseconds() > this.testDuration;
  }
}

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @returns - Resolved promise
 */
function delay(delayInMs: number, abortSignal?: AbortSignalLike): Promise<void> {
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    let onAborted: (() => void) | undefined = undefined;

    const rejectOnAbort = (): void => {
      return reject("Aborting...");
    };

    const removeListeners = (): void => {
      if (abortSignal && onAborted) {
        abortSignal.removeEventListener("abort", onAborted);
      }
    };

    onAborted = (): void => {
      if (isDefined(timer)) {
        clearTimeout(timer);
      }
      removeListeners();
      return rejectOnAbort();
    };

    if (abortSignal && abortSignal.aborted) {
      return rejectOnAbort();
    }

    timer = setTimeout(() => {
      removeListeners();
      resolve();
    }, delayInMs);

    if (abortSignal) {
      abortSignal.addEventListener("abort", onAborted);
    }
  });
}
