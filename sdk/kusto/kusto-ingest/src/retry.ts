// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export class ExponentialRetry {
  public currentAttempt: number;

  constructor(
    public attemptCount: number,
    public sleepBaseSecs: number,
    public maxJitterSecs: number
  ) {
    this.currentAttempt = 0;
  }

  public async backoff(): Promise<void> {
    if (!this.shouldTry()) {
      throw new Error("Max retries exceeded");
    }

    this.currentAttempt++;

    if (!this.shouldTry()) {
      // This was the last retry - no need to sleep
      return;
    }

    const base = this.sleepBaseSecs * Math.pow(2, this.currentAttempt - 1);
    const jitter = Math.floor(this.maxJitterSecs * Math.random());
    await sleep(1000 * (base + jitter));
  }

  public shouldTry(): boolean {
    return this.currentAttempt < this.attemptCount;
  }
}
