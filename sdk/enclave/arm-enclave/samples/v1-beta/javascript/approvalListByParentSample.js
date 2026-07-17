// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ApprovalResource resources by parent
 *
 * @summary list ApprovalResource resources by parent
 * x-ms-original-file: 2026-03-01-preview/Approvals_ListByParent.json
 */
async function approvalListByParent() {
  const credential = new DefaultAzureCredential();
  const client = new MissionClient(credential);
  const resArray = new Array();
  for await (const item of client.approval.listByParent(
    "subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/enclaveconnections/TestMyEnclaveConnection",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await approvalListByParent();
}

main().catch(console.error);
