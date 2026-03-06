// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent connector by name
 *
 * @summary delete confluent connector by name
 * x-ms-original-file: 2025-08-18-preview/Connector_Delete_MaximumSet_Gen.json
 */
async function connectorDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.connector.delete(
    "rgconfluent",
    "xqspbodq",
    "aabxehocioujmjjkgegijsmntw",
    "seivpzvrbyhjfmqb",
    "qznabwwh",
  );
}

/**
 * This sample demonstrates how to delete confluent connector by name
 *
 * @summary delete confluent connector by name
 * x-ms-original-file: 2025-08-18-preview/Connector_Delete_MinimumSet_Gen.json
 */
async function connectorDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.connector.delete(
    "rgconfluent",
    "frwocpndztguhgng",
    "duq",
    "chw",
    "suaugvwtvhexoqdrmxknvyiobq",
  );
}

async function main(): Promise<void> {
  await connectorDeleteMaximumSet();
  await connectorDeleteMinimumSet();
}

main().catch(console.error);
