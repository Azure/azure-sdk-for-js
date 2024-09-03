// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobRouterClient } from "../../../src/jobRouterClient";
import { RouterJob, RouterWorker, RouterJobAssignment, RouterJobOffer } from "../../../src";

export async function pollForJobOffer(
  workerId: string,
  client: JobRouterClient,
): Promise<RouterJobOffer> {
  let worker: RouterWorker = {};
  while (worker.offers?.length === undefined || worker.offers.length < 1) {
    worker = await client.getWorker(workerId);
  }

  return worker.offers[0];
}

export async function pollForJobAssignment(
  jobId: string,
  client: JobRouterClient,
): Promise<RouterJobAssignment> {
  let job: RouterJob = {};
  while (job.assignments === undefined || Object.keys(job.assignments).length < 1) {
    job = await client.getJob(jobId);
  }

  return Object.values(job.assignments)[0];
}

export async function pollForJobQueued(jobId: string, client: JobRouterClient): Promise<RouterJob> {
  let job: RouterJob = {};
  while (job.status !== "queued") {
    job = await client.getJob(jobId);
  }

  return job;
}

export async function pollForJobCancelled(
  jobId: string,
  client: JobRouterClient,
): Promise<RouterJob> {
  let job: RouterJob = {};
  while (job.status !== "cancelled") {
    job = await client.getJob(jobId);
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
  const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
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
