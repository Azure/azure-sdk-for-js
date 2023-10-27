// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import JobRouter from "../src";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureCommunicationRoutingServiceClient } from "../src";

// Update a router jobQueue
async function updateJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const distributionPolicyId = "distribution-policy-123";
  await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "distribution-policy-123",
      mode: {
        kind: "longest-idle",
        minConcurrentOffers: 1,
        maxConcurrentOffers: 5,
        bypassSelectors: false,
      },
      offerExpiresAfterSeconds: 120,
    }
  })

  const queueId = "queue-123";
  const result = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: distributionPolicyId,
      name: "Main",
    }
  })

  console.log("router jobQueue: " + result);
}

updateJobQueue().catch(console.error);
