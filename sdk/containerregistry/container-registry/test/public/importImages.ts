// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { loginWithServicePrincipalSecretWithAuthResponse } from "@azure/ms-rest-nodeauth";
import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { env, isPlaybackMode } from "@azure/test-utils-recorder";

export async function importImage(name: string, targetTags?: string[]): Promise<void> {
  const authResponse = await loginWithServicePrincipalSecretWithAuthResponse(
    env.AZURE_CLIENT_ID || "",
    env.AZURE_CLIENT_SECRET || "",
    env.AZURE_TENANT_ID || ""
  );

  const client = new ContainerRegistryManagementClient(
    authResponse.credentials,
    env.SUBSCRIPTION_ID || ""
  );
  if (isPlaybackMode()) {
    client.longRunningOperationRetryTimeout = 1;
  }
  await client.registries.importImage(env.RESOURCE_GROUP || "", env.REGISTRY || "", {
    source: {
      sourceImage: name,
      registryUri: "registry.hub.docker.com"
    },
    mode: "Force",
    targetTags: targetTags?.map((tag) => `${name}:${tag}`) ?? [`${name}:latest`]
  });
}
