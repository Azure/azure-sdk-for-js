// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GiMinorVersion resources by GiVersion
 *
 * @summary list GiMinorVersion resources by GiVersion
 * x-ms-original-file: 2025-09-01/GiMinorVersions_ListByParent_MaximumSet_Gen.json
 */
async function giMinorVersionsListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.giMinorVersions.listByParent("eastus", "name1", {
    shapeFamily: "EXADATA",
    zone: "zone1",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list GiMinorVersion resources by GiVersion
 *
 * @summary list GiMinorVersion resources by GiVersion
 * x-ms-original-file: 2025-09-01/GiMinorVersions_ListByParent_MinimumSet_Gen.json
 */
async function giMinorVersionsListByParentMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.giMinorVersions.listByParent("eastus", "giMinorVersionName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await giMinorVersionsListByParentMaximumSet();
  await giMinorVersionsListByParentMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
