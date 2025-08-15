// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OperationUpdateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the details of the operation in the API specified by its identifier.
 *
 * @summary Updates the details of the operation in the API specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateApiOperation.json
 */
async function apiManagementUpdateApiOperation(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "echo-api";
  const operationId = "operationId";
  const ifMatch = "*";
  const parameters: OperationUpdateContract = {
    method: "GET",
    displayName: "Retrieve resource",
    templateParameters: [],
    urlTemplate: "/resource",
    request: {
      queryParameters: [
        {
          name: "param1",
          type: "string",
          description:
            'A sample parameter that is required and has a default value of "sample".',
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
      {
        description: "Server Error.",
        headers: [],
        representations: [],
        statusCode: 500,
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.update(
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateApiOperation();
}

main().catch(console.error);
