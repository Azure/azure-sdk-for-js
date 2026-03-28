// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the operation in the API specified by its identifier.
 *
 * @summary updates the details of the operation in the API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceApiOperation.json
 */
async function apiManagementUpdateWorkspaceApiOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiOperation.update(
    "rg1",
    "apimService1",
    "wks1",
    "echo-api",
    "operationId",
    "*",
    {
      method: "GET",
      displayName: "Retrieve resource",
      templateParameters: [],
      urlTemplate: "/resource",
      request: {
        queryParameters: [
          {
            name: "param1",
            type: "string",
            description: 'A sample parameter that is required and has a default value of "sample".',
            defaultValue: "sample",
            required: true,
            values: ["sample"],
          },
        ],
      },
      responses: [
        {
          description: "Returned in all cases.",
          headers: [],
          representations: [],
          statusCode: 200,
        },
        { description: "Server Error.", headers: [], representations: [], statusCode: 500 },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateWorkspaceApiOperation();
}

main().catch(console.error);
