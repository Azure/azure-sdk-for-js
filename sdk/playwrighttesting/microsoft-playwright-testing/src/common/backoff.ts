// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BackoffConstants } from "./constants";
import { IBackOffOptions } from "./types";

const defaultBackOffOptions: IBackOffOptions = {
  numOfAttempts: BackoffConstants.NUMBER_OF_ATTEMPTS,
  retry: BackoffConstants.RETRY,
  jitter: BackoffConstants.JITTER,
};

export const backOff = async <T>(
  fn: () => Promise<T>,
  options: Partial<IBackOffOptions> = {},
): Promise<T> => {
  const backoffOptions: IBackOffOptions = { ...defaultBackOffOptions, ...options };
  const backoff = new BackOff(fn, backoffOptions);
  // eslint-disable-next-line no-return-await
  return await backoff.run();
};

class BackOff<T> {
  private readonly options: IBackOffOptions;
  private readonly fn: () => Promise<T>;
  private attempts: number = 0;

  constructor(fn: () => Promise<T>, options: IBackOffOptions) {
    this.options = options;
    this.fn = fn;
  }

  public run = async (): Promise<T> => {
    while (!this.attemptLimitReached()) {
      try {
        await this.delayExecution();
        return await this.fn();
      } catch (e: any) {
        this.attempts++;
        const canRetry = await this.options.retry(e, this.attempts);
        if (!canRetry || this.attemptLimitReached()) throw e;
      }
    }
    throw new Error("Max attempts reached without success.");
  };

  private attemptLimitReached = (): boolean => {
    return this.attempts >= this.options.numOfAttempts;
  };

  private delayExecution = (): Promise<void> => {
    const delay = this.getJitteredDelay();
    return this.executeDelay(delay);
  };

  private executeDelay = (delay: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  private getJitteredDelay = (): number => {
    const constant = BackoffConstants.STARTING_DELAY;
    const base = BackoffConstants.TIME_MULTIPLE;
    const power = this.attempts;
    const delay = Math.min(BackoffConstants.MAX_DELAY, constant * Math.pow(base, power));
    if (this.options.jitter === "full") {
      return Math.round(Math.random() * delay);
    } else {
      return delay;
    }
  };
}
