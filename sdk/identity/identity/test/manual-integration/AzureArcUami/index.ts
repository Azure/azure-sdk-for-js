// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// cspell:words UAMI

import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const tokenScope = "https://management.azure.com/.default";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

function decodeOid(token: string): string | undefined {
  const payload = token.split(".")[1];
  if (!payload) {
    throw new Error("The access token is not a JWT.");
  }

  const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
    oid?: string;
  };
  return claims.oid;
}

async function assertAttachedCredential(
  label: string,
  credential: ManagedIdentityCredential | DefaultAzureCredential,
  expectedObjectId: string,
): Promise<void> {
  const token = await credential.getToken(tokenScope, {
    abortSignal: AbortSignal.timeout(60_000),
  });
  if (!token?.token) {
    throw new Error(`${label} returned an empty token.`);
  }
  if (decodeOid(token.token) !== expectedObjectId) {
    throw new Error(`${label} returned a token for an unexpected principal.`);
  }

  console.log(`Passed: ${label}`);
}

async function assertUnattachedCredential(
  label: string,
  credential: ManagedIdentityCredential | DefaultAzureCredential,
): Promise<void> {
  try {
    await credential.getToken(tokenScope, {
      abortSignal: AbortSignal.timeout(60_000),
    });
  } catch (error) {
    if (String(error).includes("identity_not_found")) {
      console.log(`Passed: ${label}`);
      return;
    }
    throw error;
  }

  throw new Error(`${label} unexpectedly acquired a token.`);
}

async function main(): Promise<void> {
  const attachedClientId = getRequiredEnv("IDENTITY_ARC_ATTACHED_UAMI_CLIENT_ID");
  const attachedObjectId = getRequiredEnv("IDENTITY_ARC_ATTACHED_UAMI_OBJECT_ID");
  const attachedResourceId = getRequiredEnv("IDENTITY_ARC_ATTACHED_UAMI_RESOURCE_ID");
  const unattachedClientId = getRequiredEnv("IDENTITY_ARC_UNATTACHED_UAMI_CLIENT_ID");
  const unattachedObjectId = getRequiredEnv("IDENTITY_ARC_UNATTACHED_UAMI_OBJECT_ID");
  const unattachedResourceId = getRequiredEnv("IDENTITY_ARC_UNATTACHED_UAMI_RESOURCE_ID");
  const keyVaultUrl = getRequiredEnv("IDENTITY_ARC_KEYVAULT_URL");
  const markerSecretName = getRequiredEnv("IDENTITY_ARC_KEYVAULT_SECRET_NAME");

  await assertAttachedCredential(
    "ManagedIdentityCredential clientId",
    new ManagedIdentityCredential({ clientId: attachedClientId }),
    attachedObjectId,
  );
  await assertAttachedCredential(
    "ManagedIdentityCredential resourceId",
    new ManagedIdentityCredential({ resourceId: attachedResourceId }),
    attachedObjectId,
  );
  await assertAttachedCredential(
    "ManagedIdentityCredential objectId",
    new ManagedIdentityCredential({ objectId: attachedObjectId }),
    attachedObjectId,
  );

  process.env.AZURE_TOKEN_CREDENTIALS = "ManagedIdentityCredential";
  await assertAttachedCredential(
    "DefaultAzureCredential managedIdentityClientId",
    new DefaultAzureCredential({ managedIdentityClientId: attachedClientId }),
    attachedObjectId,
  );
  await assertAttachedCredential(
    "DefaultAzureCredential managedIdentityResourceId",
    new DefaultAzureCredential({ managedIdentityResourceId: attachedResourceId }),
    attachedObjectId,
  );

  const secretClient = new SecretClient(
    keyVaultUrl,
    new ManagedIdentityCredential({ clientId: attachedClientId }),
  );
  const secret = await secretClient.getSecret(markerSecretName, {
    abortSignal: AbortSignal.timeout(60_000),
  });
  if (!secret.value) {
    throw new Error("Key Vault returned an empty marker secret.");
  }
  console.log("Passed: Key Vault marker secret read");

  await assertUnattachedCredential(
    "ManagedIdentityCredential unattached clientId",
    new ManagedIdentityCredential({ clientId: unattachedClientId }),
  );
  await assertUnattachedCredential(
    "ManagedIdentityCredential unattached resourceId",
    new ManagedIdentityCredential({ resourceId: unattachedResourceId }),
  );
  await assertUnattachedCredential(
    "ManagedIdentityCredential unattached objectId",
    new ManagedIdentityCredential({ objectId: unattachedObjectId }),
  );
  await assertUnattachedCredential(
    "DefaultAzureCredential unattached managedIdentityClientId",
    new DefaultAzureCredential({ managedIdentityClientId: unattachedClientId }),
  );
  await assertUnattachedCredential(
    "DefaultAzureCredential unattached managedIdentityResourceId",
    new DefaultAzureCredential({ managedIdentityResourceId: unattachedResourceId }),
  );

  console.log("Passed all Azure Arc UAMI scenarios");
}

await main();
