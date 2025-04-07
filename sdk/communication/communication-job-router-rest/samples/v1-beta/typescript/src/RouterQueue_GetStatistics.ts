// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */

import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Get a router jobQueue's statistics

async function getJobQueueStatistics(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  const entityId = "router-jobQueue-123";

  const result = await routerClient.path("/routing/queues/{queueId}/statistics", entityId).get();

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
