// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to offboard an Azure API Management API from Microsoft Defender for APIs. The system will stop monitoring the operations within the Azure API Management API for intrusive behaviors.
 *
 * @summary offboard an Azure API Management API from Microsoft Defender for APIs. The system will stop monitoring the operations within the Azure API Management API for intrusive behaviors.
 * x-ms-original-file: 2023-11-15/ApiCollections/APICollections_OffboardAzureApiManagementApi_example.json
 */
async function offboardAnAzureAPIManagementAPIFromMicrosoftDefenderForAPIs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.apiCollections.offboardAzureApiManagementApi("rg1", "apimService1", "echo-api");
}

async function main() {
  await offboardAnAzureAPIManagementAPIFromMicrosoftDefenderForAPIs();
}

main().catch(console.error);
