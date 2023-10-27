// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";







// Delete router jobQueue
async function deleteJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const entityId = "queue-123";

  const result = await routerClient.path("/routing/queues/{queueId}", entityId).delete();

  console.log("router jobQueue: " + result);
}

deleteJobQueue().catch(console.error);
