// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Allows modifying tags of artifact sources. All other properties will be ignored.
 *
 * @summary Allows modifying tags of artifact sources. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ArtifactSources_Update.json
 */

import type { ArtifactSourceFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function artifactSourcesUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{artifactSourceName}";
  const artifactSource: ArtifactSourceFragment = {
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.artifactSources.update(
    resourceGroupName,
    labName,
    name,
    artifactSource,
  );
  console.log(result);
}

artifactSourcesUpdate().catch(console.error);
