// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary Gets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileServicesGet.json
 */
async function getFileServices() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.getServiceProperties(resourceGroupName, accountName);
  console.log(result);
}

async function main() {
  await getFileServices();
}

main().catch(console.error);
