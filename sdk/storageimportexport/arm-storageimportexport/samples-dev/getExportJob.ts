// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets information about an existing job.
 *
 * @summary Gets information about an existing job.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetExportJob.json
 */
import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";

async function getExportJob(): Promise<void> {
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const jobName = "myJob";
  const resourceGroupName = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const result = await client.jobs.get(jobName, resourceGroupName);
  console.log(result);
}

getExportJob().catch(console.error);
