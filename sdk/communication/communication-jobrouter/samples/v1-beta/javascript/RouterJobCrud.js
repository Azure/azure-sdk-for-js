// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const { RouterAdministrationClient, RouterClient } = require("../src");

// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { assert } = require("chai");
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router job
const createRouterJob = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const distributionPolicyRequest = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false,
    },
    offerTtlSeconds: 15,
  };
  var distributionPolicy = await routerAdministrationClient.createDistributionPolicy(
    distributionPolicyRequest.id,
    distributionPolicyRequest
  );

  const queueRequest = {
    id: "queue-123",
    distributionPolicyId: distributionPolicy.id,
    name: "Main",
    labels: {},
  };
  await routerAdministrationClient.createQueue(queueRequest.id, queueRequest);

  const request = {
    id: "router-job-123",
    channelId: "ChatChannel",
    queueId: queueRequest.id,
    labels: {},
  };

  const result = await routerClient.createJob(request.id, request);

  console.log("router job: " + result);
};

void createRouterJob();

// Get a router job

const getRouterJob = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.getJob(entityId);

  console.log("router job: " + result);
};

void getRouterJob();

// Update a router job
const updateRouterJob = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const queueRequest = {
    id: "queue-2",
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
  };
  await routerAdministrationClient.createQueue(queueRequest.id, queueRequest);

  const request = {
    id: "router-job-123",
    channelId: "general",
    queueId: queueRequest.id,
    labels: {},
  };

  const result = await routerClient.updateJob(request.id, request);

  console.log("router job: " + result);
};

void updateRouterJob();

// List exception policies
const listRouterJobs = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];

  for await (const page of routerClient
    .listJobs({ jobStateSelector: "queued", maxPageSize: maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.routerJob) {
        receivedPagedItems.push(policy);
        console.log("Listing router job with id: " + policy.routerJob.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }
};

void listRouterJobs();

// Delete router job
const deleteRouterJob = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.deleteJob(entityId);

  console.log("router job: " + result);
};

void deleteRouterJob();
