// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { DistributionPolicy, RouterAdministrationClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { JobQueue } from "@azure/communication-job-router";
import { JobQueueItem } from "@azure/communication-job-router";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || "";


// Create a router jobQueue
const createJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);
  
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
  var distributionPolicy = await routerAdministrationClient.createDistributionPolicy(distributionPolicyRequest.id!, distributionPolicyRequest);

  const request: JobQueue = {
    id: "queue-123",
    distributionPolicyId: distributionPolicy.id!,
    name: "Main",
    labels: {}
  };

  try {

    const result = await routerAdministrationClient.createQueue(request.id!, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createJobQueue();

// Get a router jobQueue

const getJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "router-jobQueue-123"

  try {
    const result = await routerAdministrationClient.getQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getJobQueue();


// Update a router jobQueue
const updateJobQueue = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const request: JobQueue = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "MainNewName",
    labels: {}
  };

  try {

    const result = await routerAdministrationClient.updateQueue(request.id!, request);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateJobQueue();

// List exception policies
const listJobQueues = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: JobQueueItem[] = [];
  try {
    for await (const page of routerAdministrationClient.listQueues( { maxPageSize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const queue of page) {
        ++pageSize;
        receivedPagedItems.push(queue);
        console.log("Listing router jobQueue with id: " + queue.jobQueue!.id!);
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
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "queue-123"

  try {
    const result = await routerAdministrationClient.deleteQueue(entityId);

    console.log("router jobQueue: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteJobQueue();
