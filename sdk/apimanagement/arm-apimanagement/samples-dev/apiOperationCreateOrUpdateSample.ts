// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new operation in the API or updates an existing one.
 *
 * @summary Creates a new operation in the API or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateApiOperation.json
 */

import {
  OperationContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateApiOperation(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "PetStoreTemplate2";
  const operationId = "newoperations";
  const parameters: OperationContract = {
    method: "POST",
    description: "This can only be done by the logged in user.",
    displayName: "createUser2",
    templateParameters: [],
    urlTemplate: "/user1",
    request: {
      description: "Created user object",
      headers: [],
      queryParameters: [],
      representations: [
        {
          contentType: "application/json",
          schemaId: "592f6c1d0af5840ca8897f0c",
          typeName: "User",
        },
      ],
    },
    responses: [
      {
        description: "successful operation",
        headers: [],
        representations: [
          { contentType: "application/xml" },
          { contentType: "application/json" },
        ],
        statusCode: 200,
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.createOrUpdate(
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiOperation();
}

main().catch(console.error);
