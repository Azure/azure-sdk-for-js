// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an existing managed application.
 *
 * @summary Updates an existing managed application.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/updateApplicationById.json
 */

import type {
  ApplicationPatchable,
  ApplicationsUpdateByIdOptionalParams,
} from "@azure/arm-managedapplications";
import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updatesAnExistingManagedApplication(): Promise<void> {
  const applicationId =
    "subscriptions/subid/resourceGroups/rg/providers/Microsoft.Solutions/applications/myManagedApplication";
  const parameters: ApplicationPatchable = {
    applicationDefinitionId:
      "/subscriptions/subid/resourceGroups/rg/providers/Microsoft.Solutions/applicationDefinitions/myAppDef",
    kind: "ServiceCatalog",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
  };
  const options: ApplicationsUpdateByIdOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential);
  const result = await client.applications.beginUpdateByIdAndWait(applicationId, options);
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAnExistingManagedApplication();
}

main().catch(console.error);
