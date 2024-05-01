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

// Get a distribution policy

async function getDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", policyId).get();

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
