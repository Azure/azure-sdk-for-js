// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */


import JobRouter, {
  AzureCommunicationRoutingServiceClient
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete distribution policy
async function deleteDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", policyId).delete();

  console.log("distribution policy: " + result);
}

deleteDistributionPolicy().catch(console.error);
