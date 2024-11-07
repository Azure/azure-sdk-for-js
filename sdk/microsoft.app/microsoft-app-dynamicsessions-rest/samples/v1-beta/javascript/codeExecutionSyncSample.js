// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the DynamicSessionsClient to execute code synchronously.
 *
 *
 * @summary synchronous code execution.
 */

const DynamicSessionsClient = require("@azure-rest/microsoft-app-dynamicsessions-rest").default,
  { isUnexpected } = require("@azure-rest/microsoft-app-dynamicsessions-rest");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const poolManagementEndpoint = "https://<your-pool-management-endpoint>";
  const client = DynamicSessionsClient(poolManagementEndpoint, new DefaultAzureCredential());

  const options = {
    queryParameters: {
      identifier: "testSessionIdentifier",
    },
    body: {
      codeInputType: "Inline",
      executionType: "Synchronous",
      code: "print('Hello, world!')",
      timeoutInSeconds: 60,
    },
  };

  // Start code execution
  const response = await client.path("/executions").post(options);

  if (!isUnexpected(response)) {
    console.log("Code execution completed successfully!");
  } else {
    console.error("Failed to execute code:", response);
    throw response.body.error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
