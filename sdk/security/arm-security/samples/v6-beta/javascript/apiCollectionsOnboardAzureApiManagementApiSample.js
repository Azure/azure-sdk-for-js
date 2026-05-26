// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to onboard an Azure API Management API to Microsoft Defender for APIs. The system will start monitoring the operations within the Azure Management API for intrusive behaviors and provide alerts for attacks that have been detected.
 *
 * @summary onboard an Azure API Management API to Microsoft Defender for APIs. The system will start monitoring the operations within the Azure Management API for intrusive behaviors and provide alerts for attacks that have been detected.
 * x-ms-original-file: 2023-11-15/ApiCollections/APICollections_OnboardAzureApiManagementApi_example.json
 */
async function onboardAnAzureAPIManagementAPIToMicrosoftDefenderForAPIs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.apiCollections.onboardAzureApiManagementApi(
    "rg1",
    "apimService1",
    "echo-api",
  );
  console.log(result);
}

async function main() {
  await onboardAnAzureAPIManagementAPIToMicrosoftDefenderForAPIs();
}

main().catch(console.error);
