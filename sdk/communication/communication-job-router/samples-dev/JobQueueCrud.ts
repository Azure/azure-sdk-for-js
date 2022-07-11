// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { DistributionPolicy, RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { JobQueue } from "@azure/communication-job-router";
import { PagedQueue } from "@azure/communication-job-router";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || "";


// Create a router jobQueue
const createJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false
    },
    offerTtlSeconds: 15
  };
  var distributionPolicy = await routerClient.createDistributionPolicy(distributionPolicyRequest.id!, distributionPolicyRequest);

  const request: JobQueue = {
    id: "queue-123",
    distributionPolicyId: distributionPolicy.id!,
    name: "Main",
    labels: {}
  };

  try {

    const result = await routerClient.createQueue(request.id!, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createJobQueue();

// Get a router jobQueue

const getJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "router-jobQueue-123"

  try {
    const result = await routerClient.getQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getJobQueue();


// Update a router jobQueue
const updateJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const request: JobQueue = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "MainNewName",
    labels: {}
  };

  try {

    const result = await routerClient.updateQueue(request.id!, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateJobQueue();

// List exception policies
const listJobQueues = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: PagedQueue[] = [];
  try {
    for await (const page of routerClient.listQueues( { maxpagesize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const policy of page) {
        ++pageSize;
        receivedPagedItems.push(policy);
        console.log("Listing router jobQueue with id: " + policy.id!);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }
  } catch (error) {
    console.log(error);
  }
};

void listJobQueues();


// Delete router jobQueue
const deleteJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "queue-123"

  try {
    const result = await routerClient.deleteQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteJobQueue();
