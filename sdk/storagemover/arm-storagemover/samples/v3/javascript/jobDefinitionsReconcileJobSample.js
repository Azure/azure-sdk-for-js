// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post action to reconcile the running job.
 *
 * @summary post action to reconcile the running job.
 * x-ms-original-file: 2026-05-01/JobDefinitions_ReconcileJob.json
 */
async function jobDefinitionsReconcileJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.reconcileJob(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
  );
  console.log(result);
}

async function main() {
  await jobDefinitionsReconcileJob();
}

main().catch(console.error);
