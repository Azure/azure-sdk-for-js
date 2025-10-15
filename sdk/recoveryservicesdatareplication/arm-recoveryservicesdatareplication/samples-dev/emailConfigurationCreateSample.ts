// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to creates an alert configuration setting for the given vault.
 *
 * @summary creates an alert configuration setting for the given vault.
 * x-ms-original-file: 2024-09-01/EmailConfiguration_Create.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function createsEmailConfigurationSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.emailConfiguration.create("rgswagger_2024-09-01", "4", "0", {
    properties: {
      sendToOwners: true,
      customEmailAddresses: ["ketvbducyailcny"],
      locale: "vpnjxjvdqtebnucyxiyrjiko",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsEmailConfigurationSettings();
}

main().catch(console.error);
