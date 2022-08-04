// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
const { RouterAdministrationClient } = require("@azure/communication-jobrouter");

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
    labels: {},
  };

  try {
    const result = await routerAdministrationClient.createQueue(request.id, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createJobQueue();

// Get a router jobQueue

const getJobQueue = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "router-jobQueue-123";

  try {
    const result = await routerAdministrationClient.getQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
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

  try {
    const result = await routerAdministrationClient.updateQueue(request.id, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateJobQueue();

// List exception policies
const listJobQueues = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];
  try {
    for await (const page of routerAdministrationClient
      .listQueues({ maxPageSize: maxPageSize })
      .byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const queue of page) {
        ++pageSize;
        receivedPagedItems.push(queue);
        console.log("Listing router jobQueue with id: " + queue.jobQueue.id);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }
  } catch (error) {
    console.log(error);
  }
};

void listJobQueues();

// Delete router jobQueue
const deleteJobQueue = async () => {
  // Create the Router Client
  const routerAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "queue-123";

  try {
    const result = await routerAdministrationClient.deleteQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteJobQueue();
