// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the connectors in a cluster
 *
 * @summary lists all the connectors in a cluster
 * x-ms-original-file: 2025-08-18-preview/Connector_List_MaximumSet_Gen.json
 */
async function connectorListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connector.list(
    "rgconfluent",
    "ygxwgulsjztjoxuhmegodplubt",
    "mmxahiyh",
    "rslbzgqdgsnwzsqhlhethe",
    { pageSize: 18, pageToken: "spklebovnebppxshqcmkyundbw" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await connectorListMaximumSet();
}

main().catch(console.error);
