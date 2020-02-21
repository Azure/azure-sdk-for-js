// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { retry as realRetry } from "./utils/retry";

function isPlaybackMode(): boolean {
  return process.env.TEST_MODE === "playback";
}

export async function retry<T>(
  target: () => Promise<T>,
  delay?: number,
  timeout?: number,
  increaseFactor?: number
): Promise<T> {
  return realRetry(
    target,
    isPlaybackMode() ? 0 : delay || 10000,
    timeout || Infinity,
    increaseFactor
  );
}

export function uniqueString(): string {
  return isPlaybackMode()
    ? ""
    : Math.random()
        .toString()
        .slice(2);
}

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined
};
