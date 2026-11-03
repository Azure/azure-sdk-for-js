// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the two service-created authentication configurations for the cluster: passwordMethod and microsoftEntra.
 *
 * @summary lists the two service-created authentication configurations for the cluster: passwordMethod and microsoftEntra.
 * x-ms-original-file: 2026-10-01-preview/Authentications_List.json
 */
async function listTheServiceCreatedAuthenticationMethods() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authentications.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheServiceCreatedAuthenticationMethods();
}

main().catch(console.error);
