// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to renews the connection certificate for the ASR replication fabric.
 *
 * @summary renews the connection certificate for the ASR replication fabric.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_RenewCertificate.json
 */
async function renewsCertificateForTheFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.renewCertificate(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    { properties: { renewCertificateType: "Cloud" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await renewsCertificateForTheFabric();
}

main().catch(console.error);
