// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import JobRouter from "../src"; import * as dotenv from "dotenv";
dotenv.config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";



import { QueueLengthExceptionTrigger } from "../src";




// Create an exception policy
async function createExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 10,
  };

  const id = "exception-policy-123";

  const result = await routerClient.path("/routing/exceptionPolicies/{exceptionPolicyId}", id).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "test-policy",
      exceptionRules: [{
        id: "MaxWaitTimeExceeded",
        actions: [{
          kind: "reclassify",
          classificationPolicyId: "Main",
          labelsToUpsert: {
            escalated: true,
          },
        }],
        trigger: queueLengthExceptionTrigger,
      }]
    }
  });

  console.log("exception policy: " + result);
}

createExceptionPolicy().catch(console.error);
