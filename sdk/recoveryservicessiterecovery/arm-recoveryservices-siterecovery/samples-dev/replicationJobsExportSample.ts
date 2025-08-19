// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to export the details of the Azure Site Recovery jobs of the vault.
 *
 * @summary The operation to export the details of the Azure Site Recovery jobs of the vault.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationJobs_Export.json
 */

import {
  JobQueryParameter,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportsTheDetailsOfTheAzureSiteRecoveryJobsOfTheVault(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const jobQueryParameter: JobQueryParameter = {
    affectedObjectTypes: "",
    endTime: "2017-05-04T14:26:51.9161395Z",
    jobStatus: "",
    startTime: "2017-04-27T14:26:51.9161395Z",
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.beginExportAndWait(
    resourceGroupName,
    resourceName,
    jobQueryParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportsTheDetailsOfTheAzureSiteRecoveryJobsOfTheVault();
}

main().catch(console.error);
