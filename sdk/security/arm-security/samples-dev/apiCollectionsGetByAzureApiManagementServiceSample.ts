// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Azure API Management API if it has been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected.
 *
 * @summary gets an Azure API Management API if it has been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected.
 * x-ms-original-file: 2023-11-15/ApiCollections/APICollections_GetByAzureApiManagementService_example.json
 */
async function getsAnAzureAPIManagementAPIIfItHasBeenOnboardedToMicrosoftDefenderForAPIs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.apiCollections.getByAzureApiManagementService(
    "rg1",
    "apimService1",
    "echo-api",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnAzureAPIManagementAPIIfItHasBeenOnboardedToMicrosoftDefenderForAPIs();
}

main().catch(console.error);
