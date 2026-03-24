// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a policy fragment.
 *
 * @summary creates or updates a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspacePolicyFragment.json
 */
async function apiManagementCreateWorkspacePolicyFragment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicyFragment.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "policyFragment1",
    {
      format: "xml",
      description: "A policy fragment example",
      value: '<fragment><json-to-xml apply="always" consider-accept-header="false" /></fragment>',
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspacePolicyFragment();
}

main().catch(console.error);
