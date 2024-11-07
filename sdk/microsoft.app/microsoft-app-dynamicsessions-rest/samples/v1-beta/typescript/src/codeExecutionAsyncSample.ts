// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the DynamicSessionsClient to execute code asynchronously,
 * get initial response and long poll till execution is finished and get result.
 *
 *
 * @summary asynchronous code execution.
 */

import DynamicSessionsClient, { CodeExecutionExecuteParameters, getLongRunningPoller, isUnexpected, SessionCodeExecutionResourceOutput } from "@azure-rest/microsoft-app-dynamicsessions-rest";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {

  const poolManagementEndpoint = "https://<your-pool-management-endpoint>";
  const client = DynamicSessionsClient(poolManagementEndpoint, new DefaultAzureCredential());

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

  if (!isUnexpected(initialResponse)) {
    console.log("Code execution started successfully!");
  }
  else {
    console.error("Failed to start code execution:", initialResponse);
    throw initialResponse.body.error;
  }
 
  // Create a poller to monitor the long-running operation
  const poller = await getLongRunningPoller(client, initialResponse);

  // Wait for the operation to complete
  const result = await poller.pollUntilDone();

  if (!isUnexpected(result))
  {
    const sessionCodeExecutionResourceOutput = result.body as SessionCodeExecutionResourceOutput;
    
    // Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
    const operationStatus = sessionCodeExecutionResourceOutput.status;

    if (operationStatus === "Succeeded")
    {
      console.log("Code execution succeeded!");
      console.log("Standard output: ", sessionCodeExecutionResourceOutput.result?.stdout);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
