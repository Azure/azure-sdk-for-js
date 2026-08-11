// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to obtains the details of a suppression.
 *
 * @summary obtains the details of a suppression.
 * x-ms-original-file: 2026-02-01-preview/GetSuppressionDetail.json
 */
async function getSuppressionDetail(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.suppressions.get(
    "resourceUri",
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b45",
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b87",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSuppressionDetail();
}

main().catch(console.error);
