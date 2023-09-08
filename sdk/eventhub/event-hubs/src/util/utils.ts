// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortSignal, AbortController } from "@azure/abort-controller";
import { StandardAbortMessage } from "@azure/core-amqp";
import { randomUUID } from "@azure/core-util";

/**
 * Returns a random name by appending a guid to the input string as follows:
 * `{name}-{uuid}`.
 * @internal
 */
export function getRandomName(prefix?: string): string {
  const str = randomUUID();
  return prefix ? `${prefix}-${str}` : str;
}

export interface AbortOptions {
  abortSignal: AbortSignal;
  abortErrorMsg: string;
}

/**
 * promise.race() implementation that aborts losers as soon as the first promise fulfills.
 */
export async function racePromisesAndAbortLosers<T>(
  promises: ((abortOptions: AbortOptions) => Promise<T>)[],
  aborter?: AbortSignalLike
): Promise<T> {
  const loserAborter = new AbortController();
  const loserAbortListener = () => {
    loserAborter.abort();
  };
  aborter?.addEventListener("abort", loserAbortListener);
  const options = { abortSignal: loserAborter.signal, abortErrorMsg: StandardAbortMessage };

  return Promise.race(promises.map((p) => p(options))).finally(() => {
    loserAborter.abort();
    aborter?.removeEventListener("abort", loserAbortListener);
  })
}
