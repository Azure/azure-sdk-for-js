// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JobAssignment, JobOffer, RouterJob, RouterWorker } from "../../../src/generated/src";
import { RouterClient } from "../../../src/routerClient";

export async function pollForJobOffer(workerId: string, client: RouterClient): Promise<JobOffer> {
  return new Promise<JobOffer>((resolve, _reject) => {
    let worker: RouterWorker = {};

    while (worker.offers?.length === undefined || worker.offers.length < 1) {
      client
        .getWorker(workerId)
        .then((w) => (worker = w))
        .catch((error) => console.log(error));
    }
    const offer: JobOffer = worker.offers[0];

    resolve(offer);
  });
}

export async function pollForJobAssignment(
  jobId: string,
  client: RouterClient
): Promise<JobAssignment> {
  return new Promise<JobAssignment>((resolve, _reject) => {
    let job: RouterJob = {};

    while (job.assignments === undefined || Object.keys(job.assignments).length < 1) {
      client
        .getJob(jobId)
        .then((j) => (job = j))
        .catch((error) => console.log(error));
    }
    const assignment: JobAssignment = Object.values(job.assignments)[0];

    resolve(assignment);
  });
}

export async function pollForJobQueued(jobId: string, client: RouterClient): Promise<RouterJob> {
  return new Promise<RouterJob>((resolve, _reject) => {
    let job: RouterJob = {};

    while (job.jobStatus !== "queued") {
      client
        .getJob(jobId)
        .then((j) => (job = j))
        .catch((error) => console.log(error));
    }

    resolve(job);
  });
}

export async function pollForJobCancelled(jobId: string, client: RouterClient): Promise<RouterJob> {
  return new Promise<RouterJob>((resolve, _reject) => {
    let job: RouterJob = {};

    while (job.jobStatus !== "cancelled") {
      client
        .getJob(jobId)
        .then((j) => (job = j))
        .catch((error) => console.log(error));
    }

    resolve(job);
  });
}
