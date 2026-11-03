// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to export the details of the Azure Site Recovery jobs of the vault.
 *
 * @summary the operation to export the details of the Azure Site Recovery jobs of the vault.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_Export.json
 */
async function exportsTheDetailsOfTheAzureSiteRecoveryJobsOfTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.export("resourceGroupPS1", "vault1", {
    affectedObjectTypes: "",
    endTime: "2017-05-04T14:26:51.9161395Z",
    jobStatus: "",
    startTime: "2017-04-27T14:26:51.9161395Z",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exportsTheDetailsOfTheAzureSiteRecoveryJobsOfTheVault();
}

main().catch(console.error);
