// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const deploymentTimeoutMs = 40 * 60 * 1000;
export function lifecycleTimeoutMs(deploymentCount: number): number {
  if (!Number.isInteger(deploymentCount) || deploymentCount < 0) {
    throw new RangeError("Deployment count must be a nonnegative integer.");
  }
  return deploymentCount === 0
    ? 20 * 60 * 1000
    : deploymentCount * deploymentTimeoutMs + 10 * 60 * 1000;
}

export function createDeadline(
  timeoutMs: number,
  message: string,
): { signal: AbortSignal; dispose: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(message)), timeoutMs);
  return {
    signal: controller.signal,
    dispose: () => clearTimeout(timer),
  };
}
