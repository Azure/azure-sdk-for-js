// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fails over from the current primary server to this server allowing data loss.
 *
 * @summary fails over from the current primary server to this server allowing data loss.
 * x-ms-original-file: 2025-02-01-preview/ReplicationLinkFailoverAllowDataLoss.json
 */
async function forcedFailoverOfAReplicationLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.replicationLinks.failoverAllowDataLoss(
    "Default",
    "sourcesvr",
    "gamma-db",
    "4891ca10-ebd0-47d7-9182-c722651780fb",
  );
  console.log(result);
}

async function main() {
  await forcedFailoverOfAReplicationLink();
}

main().catch(console.error);
