// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */


import {
  AzureCommunicationRoutingServiceClient,
} from "../src";
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";

// Update a distribution policy
async function updateDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const id = "distribution-policy-123";
  const result = await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", id).patch({
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

  console.log("distribution policy: " + result);
}

updateDistributionPolicy().catch(console.error);
