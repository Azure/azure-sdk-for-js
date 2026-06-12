// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to obtains the details of a suppression.
 *
 * @summary obtains the details of a suppression.
 * x-ms-original-file: 2026-02-01-preview/GetSuppressionDetail.json
 */
async function getSuppressionDetail() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.suppressions.get(
    "resourceUri",
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b45",
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b87",
  );
  console.log(result);
}

async function main() {
  await getSuppressionDetail();
}

main().catch(console.error);
