// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const { RouterClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { assert } = require("chai");
dotenv.config();

const connectionString = process.env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || "";

// Create a router worker
const createRouterWorker = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const request = {
    id: "router-worker-123",
    state: "active",
    loadRatio: 1,
    totalCapacity: 100,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {},
    },
    labels: {},
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 10,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 100,
      },
    },
  };

  try {
    const result = await routerClient.createWorker(request.id, request);

    console.log("router worker: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createRouterWorker();

// Get a router worker

const getRouterWorker = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const entityId = "router-worker-123";

  try {
    const result = await routerClient.getWorker(entityId);

    console.log("router worker: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getRouterWorker();

// Update a router worker
const updateRouterWorker = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const request = {
    id: "router-worker-123",
    loadRatio: 2,
    totalCapacity: 50,
    queueAssignments: {
      MainQueue: {},
      SecondaryQueue: {},
    },
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 2,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 5,
      },
    },
  };

  try {
    const result = await routerClient.updateWorker(request.id, request);

    console.log("router worker: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateRouterWorker();

// List exception policies
const listRouterWorkers = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];
  try {
    for await (const page of routerClient.listWorkers({ maxPageSize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const policy of page) {
        ++pageSize;
        receivedPagedItems.push(policy);
        console.log("Listing router worker with id: " + policy.routerWorker.id);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }
  } catch (error) {
    console.log(error);
  }
};

void listRouterWorkers();

// Delete router worker
const deleteRouterWorker = async () => {
  // Create the Router Client
  const routerClient = new RouterClient(connectionString);

  const entityId = "router-worker-123";

  try {
    const result = await routerClient.deleteWorker(entityId);

    console.log("router worker: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteRouterWorker();
