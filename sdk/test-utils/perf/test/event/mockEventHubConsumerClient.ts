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
   */
  raiseErrorAfterInSeconds: number;
  /**
   * Max number of events a batch can have.
   */
  maxBatchSize: number;
  /**
   * Max number of events to return per second
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
  private maxEventsPerSecond: number;
  private maxEventsPerSecondPerPartition: number;

  constructor() {
    this.closeCalled = false;
    this.partitions = 12;
    this.maxBatchSize = 10;
    this.timers = [];
    this.maxEventsPerSecond = 1000;
    this.maxEventsPerSecondPerPartition = Math.ceil(this.maxEventsPerSecond / this.partitions);
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
    this.partitions = options?.partitions || this.partitions;
    const promises = [];
    for (let i = 0; i < this.partitions; i++) {
      promises.push(this.handlePartition(handlers.processEvents, i));
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

  private async handlePartition(
    processEvents: (events: Event[], context: { partitionId: number }) => Promise<void>,
    partitionId: number
  ) {
    const startTime = process.hrtime();
    let eventsRaised = 0;
    while (this.closeCalled === false) {
      const elapsed = process.hrtime(startTime);
      const elapsedSeconds = elapsed[0] + elapsed[1] / 1000000000;
      const targetEventsRaised = elapsedSeconds * this.maxEventsPerSecondPerPartition;

      if (eventsRaised < targetEventsRaised) {
        let numberOfEvents = this.getRandomInteger(1, this.maxBatchSize);
        const events: Event[] = [];
        while (numberOfEvents--) events.push({ body: generateUuid() });
        await processEvents(events, { partitionId });
        eventsRaised += events.length;
      } else {
        await this.processFuncWithDelay(async () => {
          /* empty */
        }, 1000 / this.maxEventsPerSecondPerPartition);
      }
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
