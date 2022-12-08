// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import { RouterClient, RouterWorkerItem } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// List exception policies
async function listRouterWorkers(): Promise<void> {
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

listRouterWorkers().catch(console.error);
