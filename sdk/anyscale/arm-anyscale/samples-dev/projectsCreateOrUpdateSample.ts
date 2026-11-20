// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a project.
 *
 * @summary creates or updates a project.
 * x-ms-original-file: 2026-09-01/Projects_CreateOrUpdate.json
 */
async function projectsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rganyscale", "testcloud", "testproject", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectsCreateOrUpdate();
}

main().catch(console.error);
