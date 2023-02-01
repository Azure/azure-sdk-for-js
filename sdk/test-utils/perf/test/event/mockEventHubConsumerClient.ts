// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";

export interface Event {
  body: string;
}

export interface SubscribeOptions {
  /**
   * The maximum number of partitions to receive from.
   * - **Default**: `12`.
   */
  partitions?: number;
  /**
   * Raises the error after the specified time.
   *
   * If not provided or is less than 0, no error is thrown.
   */
  delayToRaiseErrorInSeconds: number;
  /**
   * Max number of events a batch can have.
   */
  maxBatchSize: number;
  /**
   * Max number of events to return per second
   *
   * If not provided or is less than 1, we'll default it to max (Infinity)
   */
  maxEventsPerSecond: number;
}

/**
 * The general event handler interface (used for streaming events).
 */
export interface EventHandlers {
  /**
   * Handler that processes event.
   */
  processEvents(event: Event[], context: { partitionId: number }): Promise<void>;
  /**
   * Handler that processes errors that occur during receiving.
   */
  processError(err: Error): Promise<void>;
}

export class MockEventHubConsumerClient {
  private closeCalled: boolean;
  private partitions: number;
  private timers: NodeJS.Timeout[];
  private maxBatchSize: number;

  constructor() {
    this.closeCalled = false;
    this.partitions = 12;
    this.maxBatchSize = 10;
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
    this.partitions = options?.partitions ?? this.partitions;
    let maxEventsPerSecond: number;
    if (options && options.maxEventsPerSecond > 0) {
      maxEventsPerSecond = options.maxEventsPerSecond;
    } else {
      maxEventsPerSecond = Infinity;
    }
    const maxEventsPerSecondPerPartition = Math.ceil(maxEventsPerSecond / this.partitions);
    const promises = [];
    for (let i = 0; i < this.partitions; i++) {
      promises.push(
        this.handlePartition(handlers.processEvents, i, maxEventsPerSecondPerPartition)
      );
    }
    if (options && options?.delayToRaiseErrorInSeconds > 0) {
      promises.push(
        this.processFuncWithDelay(async () => {
          await handlers.processError(new Error(`new error ${generateUuid()}`));
        }, options?.delayToRaiseErrorInSeconds * 1000)
      );
    }

    await Promise.all(promises);
  }

  private async handlePartition(
    processEvents: (events: Event[], context: { partitionId: number }) => Promise<void>,
    partitionId: number,
    maxEventsPerSecondPerPartition: number
  ) {
    // eventArrays[i] contains an array of events with length i
    const eventArrays: Event[][] = new Array(this.maxBatchSize);
    for (let i = 0; i <= this.maxBatchSize; i++) {
      const events: Event[] = new Array(i);
      for (let j = 0; j < i; j++) {
        events[j] = { body: generateUuid() };
      }
      eventArrays[i] = events;
    }

    const startTime = process.hrtime();
    let eventsRaised = 0;

    while (!this.closeCalled) {
      await this.waitForEventLoop();
      const numberOfEvents = this.getRandomInteger(1, this.maxBatchSize);

      if (maxEventsPerSecondPerPartition === Infinity) {
        await processEvents(eventArrays[numberOfEvents], { partitionId });
      } else {
        const elapsed = process.hrtime(startTime);
        const elapsedSeconds = elapsed[0] + elapsed[1] / 1000000000;
        const targetEventsRaised = elapsedSeconds * maxEventsPerSecondPerPartition;

        if (eventsRaised < targetEventsRaised) {
          await processEvents(eventArrays[numberOfEvents], { partitionId });
          eventsRaised += numberOfEvents;
        } else {
          await this.processFuncWithDelay(async () => {
            /* empty */
          }, 1000 / maxEventsPerSecondPerPartition);
        }
      }
    }
  }

  private async processFuncWithDelay(func: () => Promise<void>, delayInMilliseconds: number) {
    return new Promise<void>((resolve) =>
      this.timers.push(setTimeout(async () => resolve(await func()), delayInMilliseconds))
    );
  }

  private waitForEventLoop(): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve));
  }

  private getRandomInteger(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
