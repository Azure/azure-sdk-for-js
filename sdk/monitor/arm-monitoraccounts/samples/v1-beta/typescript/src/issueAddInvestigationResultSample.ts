// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoraccounts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds investigation result
 *
 * @summary adds investigation result
 * x-ms-original-file: 2025-10-03/Issue_AddInvestigationResult_MaximumSet_Gen.json
 */
async function issueAddInvestigationResultMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.addInvestigationResult(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    { id: "76399e8c-f7b2-421e-a97b-40182cfa2743", result: "" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await issueAddInvestigationResultMaximumSet();
}

main().catch(console.error);
