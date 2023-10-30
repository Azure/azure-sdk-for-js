// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */


import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import { DefaultAzureCredential } from "@azure/identity";




// Delete distribution policy
async function deleteDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const policyId = "distribution-policy-123";

  const result = await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", policyId).delete();

  console.log("distribution policy: " + result);
}

deleteDistributionPolicy().catch(console.error);
