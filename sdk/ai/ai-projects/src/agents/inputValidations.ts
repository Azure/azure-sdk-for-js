// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorStoreDataSource } from "../generated/src/models.js";

export function validateVectorStoreDataType(data_sources: VectorStoreDataSource[]): void {
  if (!data_sources.some(value => !["uri_asset", "id_asset"].includes(value.type))) {
    throw new Error("Vector store data type must be one of 'uri_asset', 'id_asset'");
  }
}

export function validateLimit(limit: number): void {
  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }
}

export function validateOrder(order: string): void {
  if (!["asc", "desc"].includes(order)) {
    throw new Error("Order must be 'asc' or 'desc'");
  }
}

export function validateMetadata(metadata: Record<string, string>): void {
  if (Object.keys(metadata).length > 16) {
      throw new Error("Only 16 key/value pairs are allowed");
  }
  if (Object.keys(metadata).some(value => value.length > 64)) {
    throw new Error("Keys must be less than 64 characters");
  }
  if (Object.values(metadata).some(value => value.length > 512)) {
    throw new Error("Values must be less than 512 characters");
  }
}
