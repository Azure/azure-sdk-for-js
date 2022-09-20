// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JobAssignment, JobOffer, RouterJob, RouterWorker } from "../../../src/generated/src";
import { RouterClient } from "../../../src/routerClient";

export async function pollForJobOffer(workerId: string, client: RouterClient): Promise<JobOffer> {
  return new Promise<JobOffer>(async (resolve, _) => {
    let worker: RouterWorker = {};
    while (worker.offers?.length == undefined || worker.offers.length < 1) {
      worker = await client.getWorker(workerId);
    }
    const offer: JobOffer = worker.offers[0];

    resolve(offer);
  });
}

export async function pollForJobAssignment(
  jobId: string,
  client: RouterClient
): Promise<JobAssignment> {
  return new Promise<JobAssignment>(async (resolve, _) => {
    let job: RouterJob = {};
    while (job.assignments == undefined || Object.keys(job.assignments).length < 1) {
      job = await client.getJob(jobId);
    }
    const assignment: JobAssignment = Object.values(job.assignments)[0];

    resolve(assignment);
  });
}

export async function pollForJobQueued(jobId: string, client: RouterClient): Promise<RouterJob> {
  return new Promise<RouterJob>(async (resolve, _) => {
    let job: RouterJob = {};
    while (job.jobStatus !== "queued") {
      job = await client.getJob(jobId);
    }

    resolve(job);
  });
}

export async function pollForJobCancelled(jobId: string, client: RouterClient): Promise<RouterJob> {
  return new Promise<RouterJob>(async (resolve, _) => {
    let job: RouterJob = {};
    while (job.jobStatus !== "cancelled") {
      job = await client.getJob(jobId);
    }

    resolve(job);
  });
}
