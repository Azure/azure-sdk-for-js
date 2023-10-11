// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import {
  DistributionPolicyResponse,
  AzureCommunicationRoutingServiceClient,
} from "../src";
import createClient from "../src/azureCommunicationRoutingServiceClient"
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a distribution policy
async function updateDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  const distributionPolicyRequest: DistributionPolicyResponse = {
    id: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false,
    },
    offerExpiresAfterSeconds: 15,
  };

  const request = distributionPolicyRequest;

  const result = await routerClient.updateDistributionPolicy(request.id, request);

  console.log("distribution policy: " + result);
}

updateDistributionPolicy().catch(console.error);
