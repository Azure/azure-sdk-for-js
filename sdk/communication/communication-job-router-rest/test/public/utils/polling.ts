// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureCommunicationRoutingServiceClient,
  RouterJobOutput,
  RouterJob,
} from "@azure-rest/communication-job-router";

export async function pollForJobQueued(
  jobId: string,
  routerClient: AzureCommunicationRoutingServiceClient,
): Promise<RouterJob> {
  let job: RouterJobOutput = {
    id: "dummy",
    etag: "dummy",
  };
  while (job.status !== "queued") {
    const response = await routerClient.path("/routing/jobs/{jobId}", jobId).get();
    if (response.status !== "200") {
      throw new Error("request fails");
    }
    job = response.body as RouterJobOutput;
  }

  return job;
}

/**
 * Runs the function `fn`
 * and retries automatically if it fails.
 *
 * Tries max `1 + retries` times
 * with `retryIntervalMs` milliseconds between retries.
 *
 * From https://mtsknn.fi/blog/js-retry-on-fail/
 */
export const retry = async <T>(
  fn: () => Promise<T> | T,
  { retries, retryIntervalMs }: { retries: number; retryIntervalMs: number },
): Promise<T> => {
  const sleep = (ms = 0): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await sleep(retryIntervalMs);
    return retry(fn, { retries: retries - 1, retryIntervalMs });
  }
};
