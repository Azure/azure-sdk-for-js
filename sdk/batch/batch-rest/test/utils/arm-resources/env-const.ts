// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-unused-expressions */

import { getResourceName } from "../helpers.js";

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
  return process.env["AZURE_LOCATION"] || "eastus";
}

export function getTenantId(): string {
  const tenantId = process.env["AZURE_TENANT_ID"];
  return tenantId ? tenantId : "88888888-8888-8888-8888-888888888888";
}

/**
 * Gets the Object ID of the Azure Batch Service Principal used for BYOS scenarios.
 **/
export function getAzureBatchServicePrincipalObjectId(): string {
  const objectId = process.env["AZURE_BATCH_SERVICE_PRINCIPAL_OBJECT_ID"];
  if (!objectId) {
    throw new Error("AZURE_BATCH_SERVICE_PRINCIPAL_OBJECT_ID must be set");
  }
  return objectId;
}

export function getUserObjectId(): string {
  const objectId = process.env["USER_OBJECT_ID"];
  if (!objectId) {
    throw new Error("USER_OBJECT_ID must be set");
  }
  return objectId;
}

const hoboBatchAccountName = "jssdkhobobatchacct";
const byosBatchAccountName = "jssdkbyosbatchacct";

export function getHoboBatchAccountName(): string {
  return hoboBatchAccountName;
}

export function getByosBatchAccountName(): string {
  return byosBatchAccountName;
}
