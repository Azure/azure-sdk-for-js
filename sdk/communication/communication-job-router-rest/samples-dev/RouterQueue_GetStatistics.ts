// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */



import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";




// Get a router jobQueue's statistics

async function getJobQueueStatistics(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const entityId = "router-jobQueue-123";

  const result = await routerClient.path("/routing/queues/{queueId}/statistics", entityId).get();

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
