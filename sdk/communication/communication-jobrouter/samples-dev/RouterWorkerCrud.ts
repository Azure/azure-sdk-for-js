// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import { RouterClient } from "../src";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { RouterWorker } from "../src";
import { RouterWorkerItem } from "../src";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create a router worker
const createRouterWorker = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const request: RouterWorker = {
    id: "router-worker-123",
    state: "active",
    loadRatio: 1,
    totalCapacity: 100,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {}
    },
    labels: {},
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 10
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 100
      }
    }
  };


  const result = await routerClient.createWorker(request.id!, request);

  console.log("router worker: " + result);

};

void createRouterWorker();

// Get a router worker

const getRouterWorker = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "router-worker-123"


  const result = await routerClient.getWorker(entityId);

  console.log("router worker: " + result);

};

void getRouterWorker();


// Update a router worker
const updateRouterWorker = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const request: RouterWorker = {
    id: "router-worker-123",
    loadRatio: 2,
    totalCapacity: 50,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {}
    },
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 2
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 5
      }
    }
  };

  const result = await routerClient.updateWorker(request.id!, request);

  console.log("router worker: " + result);

};

void updateRouterWorker();

// List exception policies
const listRouterWorkers = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: RouterWorkerItem[] = [];

  for await (const page of routerClient.listWorkers( { maxPageSize: maxPageSize }).byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.routerWorker) {
        receivedPagedItems.push(policy);
        console.log("Listing router worker with id: " + policy.routerWorker.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }

};

void listRouterWorkers();


// Delete router worker
const deleteRouterWorker = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "router-worker-123"


  const result = await routerClient.deleteWorker(entityId);

  console.log("router worker: " + result);

};

void deleteRouterWorker();
