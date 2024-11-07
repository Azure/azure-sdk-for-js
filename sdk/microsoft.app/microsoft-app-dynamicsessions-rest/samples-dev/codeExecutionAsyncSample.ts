// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the DynamicSessionsClient to execute code asynchronously,
 * get initial response and long poll till execution is finished and get result.
 *
 *
 * @summary asynchronous code execution.
 * @azsdk-weight 100
 */

import DynamicSessionsClient, { CodeExecutionExecuteParameters, getLongRunningPoller, SessionCodeExecutionResourceOutput } from "@azure-rest/microsoft-app-dynamicsessions-rest";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {

  const endpoint = "https://<REGION>.dynamicsessions.io/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/sessionPools/<SESSION_POOL_NAME>"
  const client = DynamicSessionsClient(endpoint, new DefaultAzureCredential());

  const options: CodeExecutionExecuteParameters = {
    headers: {
      "operation-id": "testExecutionId",
    },
    queryParameters: {
      identifier: "testSessionIdentifier",
    },
    body: {
      codeInputType: "Inline",
      executionType: "Asynchronous",
      code: "print('Hello, world!')",
      timeoutInSeconds: 60
    },
  }

  // Start code execution
  const initialResponse = await client.path("/executions").post(options);
 
  // Create a poller to monitor the long-running operation
  const poller = await getLongRunningPoller(client, initialResponse);

  // Wait for the operation to complete
  const result = await poller.pollUntilDone();

  if (result.status == "200")
  {
    const sessionCodeExecutionResourceOutput = result.body as SessionCodeExecutionResourceOutput;
    
    // Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
    const operationStatus = sessionCodeExecutionResourceOutput.status;

    if (operationStatus == "Succeeded")
    {
      console.log("Code execution succeeded!");
      console.log("Standard output: ", sessionCodeExecutionResourceOutput.result?.stdout);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
