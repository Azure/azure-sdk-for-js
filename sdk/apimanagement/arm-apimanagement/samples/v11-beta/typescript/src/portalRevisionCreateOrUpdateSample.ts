// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new developer portal's revision by running the portal's publishing. The `isCurrent` property indicates if the revision is publicly accessible.
 *
 * @summary creates a new developer portal's revision by running the portal's publishing. The `isCurrent` property indicates if the revision is publicly accessible.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreatePortalRevision.json
 */
async function apiManagementCreatePortalRevision(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalRevision.createOrUpdate(
    "rg1",
    "apimService1",
    "20201112101010",
    { description: "portal revision 1", isCurrent: true },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreatePortalRevision();
}

main().catch(console.error);
