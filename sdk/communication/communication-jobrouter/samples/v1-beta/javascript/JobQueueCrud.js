// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
const { RouterAdministrationClient } = require("../src");

// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { assert } = require("chai");
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router jobQueue
const createJobQueue = async () => {
  // Create the Router Client
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

  const request = {
    id: "queue-123",
    distributionPolicyId: distributionPolicy.id,
    name: "Main",
  };

  const result = await routerAdministrationClient.createQueue(request.id, request);

  console.log("router jobQueue: " + result);
};

void createJobQueue();

// Get a router jobQueue

const getJobQueue = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerAdministrationClient.getQueue(entityId);

  console.log("router jobQueue: " + result);
};

void getJobQueue();

// Update a router jobQueue
const updateJobQueue = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const request = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "MainNewName",
    labels: {},
  };

  const result = await routerAdministrationClient.updateQueue(request.id, request);

  console.log("router jobQueue: " + result);
};

void updateJobQueue();

// List exception policies
const listJobQueues = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];

  for await (const page of routerAdministrationClient
    .listQueues({ maxPageSize: maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const queue of page) {
      if (queue.jobQueue) {
        receivedPagedItems.push(queue);
        console.log("Listing router jobQueue with id: " + queue.jobQueue.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }
};

void listJobQueues();

// Delete router jobQueue
const deleteJobQueue = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "queue-123";

  const result = await routerAdministrationClient.deleteQueue(entityId);

  console.log("router jobQueue: " + result);
};

void deleteJobQueue();
