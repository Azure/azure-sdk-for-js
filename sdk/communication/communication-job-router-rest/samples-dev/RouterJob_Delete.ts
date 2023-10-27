// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";







// Delete router job
async function deleteRouterJob(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const entityId = "router-job-123";

  const result = await routerClient.path("/routing/jobs/{jobId}", entityId).delete();

  console.log("router job: " + result);
}

deleteRouterJob().catch(console.error);
