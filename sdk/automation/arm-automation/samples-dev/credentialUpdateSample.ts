// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a credential.
 *
 * @summary Update a credential.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/updateCredential_patch.json
 */

import type { CredentialUpdateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateACredential(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount18";
  const credentialName = "myCredential";
  const parameters: CredentialUpdateParameters = {
    name: "myCredential",
    description: "my description goes here",
    password: "<password>",
    userName: "mylingaiah",
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.credentialOperations.update(
    resourceGroupName,
    automationAccountName,
    credentialName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateACredential();
}

main().catch(console.error);
