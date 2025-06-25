// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of private link resources for an online experimentation workspace resource.
 *
 * @summary gets the list of private link resources for an online experimentation workspace resource.
 * x-ms-original-file: 2025-08-01-preview/PrivateLinkResource_List.json
 */
async function privateLinkResourceList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list(
    "2025-08-01-preview",
    "res9871",
    "expworkspace3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkResourceList();
}

main().catch(console.error);
