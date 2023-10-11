// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import createClient from "../src/azureCommunicationRoutingServiceClient"

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete exception policy
async function deleteExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  const policyId = "exception-policy-123";

  const result = await routerClient.deleteExceptionPolicy(policyId);

  console.log("exception policy: " + result);
}

deleteExceptionPolicy().catch(console.error);
