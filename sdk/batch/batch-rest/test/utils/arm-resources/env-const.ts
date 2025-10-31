// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTestCredential } from "@azure-tools/test-credential";

export function getSubscriptionId(): string {
  const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];
  if (!subscriptionId) {
    throw new Error("AZURE_SUBSCRIPTION_ID must be set");
  }
  return subscriptionId;
}

export function getResourceGroupName(): string {
  return process.env["AZURE_RESOURCE_GROUP"] || "javascript-sdk-test-rg";
}

export function getLocation(): string {
  return process.env["AZURE_LOCATION"] || "brazilsouth";
}

export function getTenantId(): string {
  const tenantId = process.env["AZURE_TENANT_ID"] ?? "72f988bf-86f1-41af-91ab-2d7cd011db47";
  return tenantId;
}

/**
 * Gets the Object ID of the Azure Batch Service Principal used for BYOS scenarios.
 **/
export function getAzureBatchServicePrincipalObjectId(): string {
  const objectId =
    process.env["AZURE_BATCH_SERVICE_PRINCIPAL_OBJECT_ID"] ??
    // Default to public cloud Batch SP object ID
    "f520d84c-3fd3-4cc8-88d4-2ed25b00d27a";
  return objectId;
}

export async function getUserObjectId(): Promise<string> {
  const objectId = process.env["USER_OBJECT_ID"];
  if (!objectId) {
    const credential = createTestCredential();
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
    if (!accessToken) {
      throw new Error("Failed to acquire access token for Microsoft Graph");
    }
    const oid = JSON.parse(atob(accessToken.token.split(".")[1])).oid;
    if (!oid) {
      throw new Error("Failed to extract user object ID from access token");
    }
    return oid;
  }
  return objectId;
}

const hoboBatchAccountName = "jssdkhobobatchacct";
const byosBatchAccountName = "jssdkbyosbatchacct";
const byosKeyVaultName = "jssdkbyoskv";

export function getHoboBatchAccountName(): string {
  return hoboBatchAccountName;
}

export function getByosBatchAccountName(): string {
  return byosBatchAccountName;
}

export function getByosKeyVaultName(): string {
  return byosKeyVaultName;
}
