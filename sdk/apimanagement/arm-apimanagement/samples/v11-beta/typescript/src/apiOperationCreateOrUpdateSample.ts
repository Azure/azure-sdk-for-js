// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new operation in the API or updates an existing one.
 *
 * @summary creates a new operation in the API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiOperation.json
 */
async function apiManagementCreateApiOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.createOrUpdate(
    "rg1",
    "apimService1",
    "PetStoreTemplate2",
    "newoperations",
    {
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiOperation();
}

main().catch(console.error);
