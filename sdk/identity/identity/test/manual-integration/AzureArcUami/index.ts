// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

async function assertPositiveCredential(
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

  console.log(`PASS ${label}`);
}

function collectErrorMessages(error: unknown, visited = new Set<unknown>()): string[] {
  if (visited.has(error)) {
    return [];
  }
  visited.add(error);

  if (!(error instanceof Error)) {
    return [String(error)];
  }

  const messages = [error.message];
  const details = error as Error & { cause?: unknown; errors?: unknown[] };
  if (details.cause) {
    messages.push(...collectErrorMessages(details.cause, visited));
  }
  if (Array.isArray(details.errors)) {
    for (const nestedError of details.errors) {
      messages.push(...collectErrorMessages(nestedError, visited));
    }
  }
  return messages;
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
    if (collectErrorMessages(error).some((message) => message.includes("identity_not_found"))) {
      console.log(`PASS ${label}`);
      return;
    }
    throw error;
  }

  throw new Error(`${label} unexpectedly acquired a token.`);
}

async function main(): Promise<void> {
  const positiveClientId = getRequiredEnv("IDENTITY_ARC_UAMI_CLIENT_ID");
  const positiveObjectId = getRequiredEnv("IDENTITY_ARC_UAMI_OBJECT_ID");
  const positiveResourceId = getRequiredEnv("IDENTITY_ARC_UAMI_RESOURCE_ID");
  const negativeClientId = getRequiredEnv("IDENTITY_ARC_NEGATIVE_UAMI_CLIENT_ID");
  const negativeObjectId = getRequiredEnv("IDENTITY_ARC_NEGATIVE_UAMI_OBJECT_ID");
  const negativeResourceId = getRequiredEnv("IDENTITY_ARC_NEGATIVE_UAMI_RESOURCE_ID");
  const keyVaultUrl = getRequiredEnv("IDENTITY_ARC_KEYVAULT_URL");
  const markerSecretName = getRequiredEnv("IDENTITY_ARC_KEYVAULT_SECRET_NAME");

  await assertPositiveCredential(
    "ManagedIdentityCredential clientId",
    new ManagedIdentityCredential({ clientId: positiveClientId }),
    positiveObjectId,
  );
  await assertPositiveCredential(
    "ManagedIdentityCredential resourceId",
    new ManagedIdentityCredential({ resourceId: positiveResourceId }),
    positiveObjectId,
  );
  await assertPositiveCredential(
    "ManagedIdentityCredential objectId",
    new ManagedIdentityCredential({ objectId: positiveObjectId }),
    positiveObjectId,
  );

  process.env.AZURE_TOKEN_CREDENTIALS = "prod";
  await assertPositiveCredential(
    "DefaultAzureCredential managedIdentityClientId",
    new DefaultAzureCredential({ managedIdentityClientId: positiveClientId }),
    positiveObjectId,
  );
  await assertPositiveCredential(
    "DefaultAzureCredential managedIdentityResourceId",
    new DefaultAzureCredential({ managedIdentityResourceId: positiveResourceId }),
    positiveObjectId,
  );

  const secretClient = new SecretClient(
    keyVaultUrl,
    new ManagedIdentityCredential({ clientId: positiveClientId }),
  );
  const secret = await secretClient.getSecret(markerSecretName, {
    abortSignal: AbortSignal.timeout(60_000),
  });
  if (!secret.value) {
    throw new Error("Key Vault returned an empty marker secret.");
  }
  console.log("PASS Key Vault marker secret read");

  await assertUnattachedCredential(
    "ManagedIdentityCredential negative clientId",
    new ManagedIdentityCredential({ clientId: negativeClientId }),
  );
  await assertUnattachedCredential(
    "ManagedIdentityCredential negative resourceId",
    new ManagedIdentityCredential({ resourceId: negativeResourceId }),
  );
  await assertUnattachedCredential(
    "ManagedIdentityCredential negative objectId",
    new ManagedIdentityCredential({ objectId: negativeObjectId }),
  );
  await assertUnattachedCredential(
    "DefaultAzureCredential negative managedIdentityClientId",
    new DefaultAzureCredential({ managedIdentityClientId: negativeClientId }),
  );
  await assertUnattachedCredential(
    "DefaultAzureCredential negative managedIdentityResourceId",
    new DefaultAzureCredential({ managedIdentityResourceId: negativeResourceId }),
  );

  console.log("Pass all Azure Arc UAMI scenarios");
}

await main();
