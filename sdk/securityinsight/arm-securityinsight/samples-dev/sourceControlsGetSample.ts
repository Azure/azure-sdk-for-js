// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a source control byt its identifier.
 *
 * @summary gets a source control byt its identifier.
 * x-ms-original-file: 2025-07-01-preview/sourcecontrols/GetSourceControlById.json
 */
async function getASourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b28fbe4a-0bb1-4593-960b-061c8655a550";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.sourceControls.get(
    "myRg",
    "myWorkspace",
    "789e0c1f-4a3d-43ad-809c-e713b677b04a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASourceControl();
}

main().catch(console.error);
