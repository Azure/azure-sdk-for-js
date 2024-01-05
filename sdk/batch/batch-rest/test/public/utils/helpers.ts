// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { wait } from "./wait";

const RESOURCE_PREFIX = "JSSDKTest";

export function getResourceName(type: string): string {
  const _SUFFIX = Math.random().toString(16).slice(2, 6);
  return `${RESOURCE_PREFIX}-${type}-${_SUFFIX}`;
}

export const POLLING_INTERVAL = isPlaybackMode() ? 1 : 10000;
export const LONG_TEST_TIMEOUT = 1000000;

export async function waitForNotNull<T>(fn: () => Promise<T>): Promise<NonNullable<T>> {
  let result: T | null = null;
  const startTime = Date.now();
  while ((result = await fn()) == null) {
    if (Date.now() - startTime > LONG_TEST_TIMEOUT) {
      throw new Error("waitFor timed out");
    }
    await wait(POLLING_INTERVAL);
  }
  return result;
}
