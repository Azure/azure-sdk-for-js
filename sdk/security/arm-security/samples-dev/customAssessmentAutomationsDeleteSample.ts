// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a custom assessment automation by name for a provided subscription
 *
 * @summary Deletes a custom assessment automation by name for a provided subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2021-07-01-preview/examples/CustomAssessmentAutomations/customAssessmentAutomationDelete_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteACustomAssessmentAutomation(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "e5d1b86c-3051-44d5-8802-aa65d45a279b";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "TestResourceGroup";
  const customAssessmentAutomationName = "MyCustomAssessmentAutomation";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.customAssessmentAutomations.delete(
    resourceGroupName,
    customAssessmentAutomationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteACustomAssessmentAutomation();
}

main().catch(console.error);
