// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { RouterQueueItem, JobrouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List exception policies
async function listJobQueues(): Promise<void> {
  // Create the Router Client
  const routerClient: JobrouterClient =
    new JobrouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: RouterQueueItem[] = [];

  for await (const page of routerClient
    .listQueues({ maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const queue of page) {
      if (queue.queue) {
        receivedPagedItems.push(queue);
        console.log("Listing router jobQueue with id: " + queue.queue.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }
}

listJobQueues().catch(console.error);
