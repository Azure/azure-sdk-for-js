// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import LRUCache from "lru-cache";

import LRUCacheOptions = LRUCache.Options;
import { logger } from "./logger";
import { wrapError } from "./errors";

export interface CacheEntry {
  /** Schema ID */
  id: string;
  /** Schema string */
  schema: string;
}

const cacheOptions: LRUCacheOptions<string, any> = {
  max: 128,
  /**
   * This is needed in order to specify `sizeCalculation` but we do not intend
   * to limit the size just yet.
   */
  maxSize: Number.MAX_VALUE,
  sizeCalculation: (_value: any, key: string) => {
    return key.length;
  },
};

const cacheIdByDefinition = new LRUCache<string, string>(cacheOptions);

export function getCacheByDefinition(schema: string): CacheEntry | undefined {
  const id = cacheIdByDefinition.get(schema)
  return id ? {id, schema} : undefined
}

export function cache(schema: string, id: string): CacheEntry {
  const entry = { schema, id };
  cacheIdByDefinition.set(schema, id);
  logger.verbose(
    `Cache entry added or updated. Total number of entries: ${cacheIdByDefinition.size}; Total schema length ${cacheIdByDefinition.calculatedSize}`
  );
  return entry;
}

export function getSchemaObject(schema: string): SchemaObject {
  return wrapError(
    () => JSON.parse(schema),
    `Parsing Json schema failed:\n\n\t${schema}\n\nSee 'cause' for more details.`
  );
}

export interface SchemaObject {
  id?: string;
  $id?: string;
  $schema?: string;
  [x: string]: any;
}
