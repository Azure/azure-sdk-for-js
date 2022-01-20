// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";

export interface Event {
  body: string;
}

export interface SubscribeOptions {
  /**
   * The maximum number of concurrent calls that the library
   * can make to the user's event handler.
   * - **Default**: `1`.
   */
  maxConcurrentCalls?: number;
  /**
   * Raises the error after the specified time.
   */
  raiseErrorAfterInSeconds: number;
}

/**
 * The general event handler interface (used for streaming events).
 */
export interface EventHandlers {
  /**
   * Handler that processes event.
   */
  processEvent(event: Event): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   */
  processError(err: Error): Promise<void>;
}

export class MockEventReceiver {
  private closeCalled: boolean;
  private maxConcurrentCalls: number;
  private minDelay: number; // min delay between events in milliseconds
  private maxDelay: number;
  private timers: NodeJS.Timeout[];

  constructor() {
    this.closeCalled = false;
    this.maxConcurrentCalls = 12;
    this.minDelay = 5;
    this.maxDelay = 10;
    this.timers = [];
  }

  public subscribe(
    handlers: EventHandlers,
    options?: SubscribeOptions
  ): { close: () => Promise<void> } {
    this.internalSubscribe(handlers, options);
    return {
      close: async () => {
        this.closeCalled = true;
        // just clearing out any leftover timeouts
        this.timers.forEach((timer) => clearTimeout(timer));
      },
    };
  }

  private async internalSubscribe(handlers: EventHandlers, options?: SubscribeOptions) {
    this.maxConcurrentCalls = options?.maxConcurrentCalls || this.maxConcurrentCalls;
    const promises = [];
    for (let i = 0; i < this.maxConcurrentCalls; i++) {
      promises.push(this.concurrentCall(handlers.processEvent));
    }
    if (options?.raiseErrorAfterInSeconds) {
      promises.push(
        this.processFuncWithDelay(async () => {
          await handlers.processError(new Error(`new error ${generateUuid()}`));
        }, options?.raiseErrorAfterInSeconds * 1000)
      );
    }

    await Promise.all(promises);
  }

  private async concurrentCall(processEvent: (event: Event) => Promise<void>) {
    while (this.closeCalled === false) {
      await this.processFuncWithDelay(
        async () => processEvent({ body: generateUuid() }),
        this.getRandomInteger(this.minDelay, this.maxDelay)
      );
    }
  }

  private async processFuncWithDelay(func: () => Promise<void>, delayInMilliseconds: number) {
    return new Promise<void>((resolve) =>
      this.timers.push(setTimeout(async () => resolve(await func()), delayInMilliseconds))
    );
  }

  private getRandomInteger(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
