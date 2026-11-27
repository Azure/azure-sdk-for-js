// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationState, PollerLike } from "@azure/core-lro";
import { isRestError } from "@azure/core-rest-pipeline";
import type { ValidationTestRun } from "../../../src/index.js";

export function requireCredentialFreeVhd(value: string): string {
  const message = "An approved credential-free HTTPS VHD URI is required";
  let uri: URL;
  try {
    uri = new URL(value);
  } catch {
    throw new Error(message);
  }
  if (
    uri.protocol !== "https:" ||
    uri.username ||
    uri.password ||
    uri.search ||
    uri.hash ||
    !uri.pathname.toLowerCase().endsWith(".vhd")
  ) {
    throw new Error(message);
  }
  return value;
}

export async function completeMutation<T>(
  state: { inProgress: boolean },
  poller: Pick<PollerLike<OperationState<T>, T>, "pollUntilDone">,
  timeoutMinutes = 15,
): Promise<T> {
  state.inProgress = true;
  const result = await poller.pollUntilDone({
    abortSignal: AbortSignal.timeout(timeoutMinutes * 60 * 1000),
  });
  // A polling exception cannot establish that the remote mutation has stopped.
  state.inProgress = false;
  return result;
}

export async function deleteIfPresent(action: () => Promise<unknown>): Promise<void> {
  try {
    await action();
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) {
      throw error;
    }
  }
}

export async function waitForTerminalTestRun(
  state: { inProgress: boolean },
  read: () => Promise<ValidationTestRun>,
  pause: () => Promise<void>,
): Promise<ValidationTestRun> {
  state.inProgress = true;
  for (let attempt = 0; attempt < 180; attempt++) {
    const result = await read();
    if (
      ["Succeeded", "Failed", "Canceled"].includes(result.properties?.provisioningState ?? "") &&
      ["Completed", "Failed", "TimedOut", "Canceled"].includes(result.properties?.status ?? "")
    ) {
      state.inProgress = false;
      return result;
    }
    if (attempt < 179) {
      await pause();
    }
  }
  throw new Error("Test result did not reach a terminal state; resources retained");
}
