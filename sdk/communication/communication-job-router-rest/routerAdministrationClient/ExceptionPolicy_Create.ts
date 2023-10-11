// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import createClient from "../src/azureCommunicationRoutingServiceClient"

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { ExceptionPolicy, QueueLengthExceptionTrigger } from "../src";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create an exception policy
async function createExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 10,
  };

  const id = "exception-policy-123";
  const exceptionPolicyRequest: ExceptionPolicy = {
    id: "exception-policy-123",
    name: "test-policy",
    exceptionRules: {
      MaxWaitTimeExceeded: {
        actions: {
          MoveJobToEscalatedQueue: {
            kind: "reclassify",
            classificationPolicyId: "Main",
            labelsToUpsert: {
              escalated: true,
            },
          },
        },
        trigger: queueLengthExceptionTrigger,
      },
    },
  };

  const request = exceptionPolicyRequest;

  const result = await routerClient.createExceptionPolicy(id, request);

  console.log("exception policy: " + result);
}

createExceptionPolicy().catch(console.error);
