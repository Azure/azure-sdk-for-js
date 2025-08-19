// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a tenant action group.
 *
 * @summary Get a tenant action group.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2023-05-01-preview/examples/getTenantActionGroup.json
 */

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAnActionGroup(): Promise<void> {
  const managementGroupId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const tenantActionGroupName = "testTenantActionGroup";
  const xMsClientTenantId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.tenantActionGroups.get(
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnActionGroup();
}

main().catch(console.error);
