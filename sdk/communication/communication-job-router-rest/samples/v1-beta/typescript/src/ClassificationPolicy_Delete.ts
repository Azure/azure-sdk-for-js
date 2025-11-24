// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


/**
 * @summary Classification policy crud
 */
import JobRouter, {
  AzureCommunicationRoutingServiceClient
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete classification policy
async function deleteClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerClient.path("/routing/classificationPolicies/{classificationPolicyId}", policyId).delete();

  console.log("classification policy: " + result);
}

deleteClassificationPolicy().catch(console.error);
