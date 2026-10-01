// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "@azure-tools/test-recorder";

export function getEndpoint(): string {
  return env.PLANETARYCOMPUTER_ENDPOINT ?? "";
}

export function getCollectionId(): string {
  return env.PLANETARYCOMPUTER_COLLECTION_ID ?? "naip";
}

export function getItemId(): string {
  return env.PLANETARYCOMPUTER_ITEM_ID ?? "ga_m_3308421_se_16_060_20211114";
}

export function getIngestionContainerUri(): string {
  return env.PLANETARYCOMPUTER_INGESTION_CONTAINER_URI ?? "";
}

export function getIngestionCatalogUrl(): string {
  return env.PLANETARYCOMPUTER_INGESTION_CATALOG_URL ?? "";
}

export function getManagedIdentityObjectId(): string {
  return env.PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID ?? "";
}

export function getIngestionSasContainerUri(): string {
  return env.PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI ?? "";
}

export function getIngestionSasToken(): string {
  return env.PLANETARYCOMPUTER_INGESTION_SAS_TOKEN ?? "";
}
