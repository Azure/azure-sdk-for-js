// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import JobRouter, {
  AzureCommunicationRoutingServiceClient
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a exception policy

async function getExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const policyId = "exception-policy-123";

  const result = await routerClient.path("/routing/exceptionPolicies/{exceptionPolicyId}", policyId).get();

  console.log("exception policy: " + result);
}

getExceptionPolicy().catch(console.error);
