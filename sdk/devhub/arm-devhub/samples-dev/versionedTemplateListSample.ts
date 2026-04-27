// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of VersionedTemplate.
 *
 * @summary gets a list of VersionedTemplate.
 * x-ms-original-file: 2025-03-01-preview/VersionedTemplate_List.json
 */
async function listVersionedTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.versionedTemplate.list("test-template")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVersionedTemplate();
}

main().catch(console.error);
