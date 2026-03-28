// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new developer portal's revision by running the portal's publishing. The `isCurrent` property indicates if the revision is publicly accessible.
 *
 * @summary creates a new developer portal's revision by running the portal's publishing. The `isCurrent` property indicates if the revision is publicly accessible.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreatePortalRevision.json
 */
async function apiManagementCreatePortalRevision() {
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

async function main() {
  await apiManagementCreatePortalRevision();
}

main().catch(console.error);
