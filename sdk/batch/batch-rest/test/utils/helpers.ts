// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { wait } from "./wait.js";

const RESOURCE_PREFIX = "JSSDKTest";

export function getResourceName(type: string): string {
  const _SUFFIX = Math.random().toString(16).slice(2, 6);
  return `${RESOURCE_PREFIX}-${type}-${_SUFFIX}`;
}

export const POLLING_INTERVAL = isPlaybackMode() ? 1 : 15000;

export const LONG_TEST_TIMEOUT = 1000000;

export async function waitForNotNull<T>(
  fn: () => Promise<T>,
  pollingInterval: number = POLLING_INTERVAL,
): Promise<NonNullable<T>> {
  let result: T | null = null;
  const startTime = Date.now();
  while ((result = await fn()) == null) {
    if (Date.now() - startTime > LONG_TEST_TIMEOUT) {
      throw new Error("waitFor timed out");
    }
    await wait(isPlaybackMode() ? 1 : pollingInterval);
  }
  return result;
}
