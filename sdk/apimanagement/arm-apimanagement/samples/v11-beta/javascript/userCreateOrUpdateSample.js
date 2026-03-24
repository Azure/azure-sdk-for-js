// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or Updates a user.
 *
 * @summary creates or Updates a user.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateUser.json
 */
async function apiManagementCreateUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.createOrUpdate(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512288c680b",
    { confirmation: "signup", email: "foobar@outlook.com", firstName: "foo", lastName: "bar" },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateUser();
}

main().catch(console.error);
