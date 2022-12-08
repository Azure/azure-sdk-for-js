// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import { RouterJobItem, RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// List exception policies
async function listRouterJobs(): Promise<void> {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: RouterJobItem[] = [];

  for await (const page of routerClient.listJobs({ jobStateSelector: "queued", maxPageSize: maxPageSize }).byPage()) {
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

listRouterJobs().catch(console.error);

