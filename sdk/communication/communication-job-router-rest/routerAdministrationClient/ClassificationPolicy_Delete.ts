// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import { JobrouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete classification policy
async function deleteClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: JobrouterClient =
    new JobrouterClient(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerClient.deleteClassificationPolicy(policyId);

  console.log("classification policy: " + result);
}

deleteClassificationPolicy().catch(console.error);
