// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */


import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";




// Get a distribution policy

async function getDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const policyId = "distribution-policy-123";

  const result = await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", policyId).get();

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
