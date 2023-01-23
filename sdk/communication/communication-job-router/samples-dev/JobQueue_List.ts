// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { JobQueueItem, RouterAdministrationClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// List exception policies
async function listJobQueues(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: JobQueueItem[] = [];

  for await (const page of routerAdministrationClient.listQueues( { maxPageSize: maxPageSize }).byPage()) {
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

listJobQueues().catch(console.error);

