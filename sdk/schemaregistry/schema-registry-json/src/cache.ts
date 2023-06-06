// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Ajv, { SchemaObject } from "ajv";
import LRUCache from "lru-cache";

import LRUCacheOptions = LRUCache.Options;
import { logger } from "./logger";
import { wrapError } from "./errors";

export type AjvValidator = ReturnType<Ajv["compile"]>;

export interface CacheEntry {
  /** Schema ID */
  id: string;
  /** the Ajv validator */
  validator: AjvValidator;
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

const cacheBySchemaDefinition = new LRUCache<string, CacheEntry>(cacheOptions);
const cacheById = new LRUCache<string, AjvValidator>(cacheOptions);

const ajv = new Ajv();

export function getCacheById(schemaId: string): AjvValidator | undefined {
  return cacheById.get(schemaId);
}

export function getCacheByDefinition(schema: string): CacheEntry | undefined {
  return cacheBySchemaDefinition.get(schema);
}

function getSchemaValidator(schema: string, schemaObj?: SchemaObject): { validator: AjvValidator } {
  const schemaObject = schemaObj === undefined ? getSchemaObject(schema) : schemaObj;
  return wrapError(() => {
    const validator = ajv.compile(schemaObject);
    return { validator };
  }, `Validating Json schema failed:\n\n\t${schema}\n\nSee 'cause' for more details.`);
}

export function cache(id: string, schema: string, schemaObj?: SchemaObject): CacheEntry {
  const entry = { id, ...getSchemaValidator(schema, schemaObj) };
  cacheById.set(id, entry.validator);
  cacheBySchemaDefinition.set(schema, entry);
  logger.verbose(
    `Cache entry added or updated. Total number of entries: ${cacheBySchemaDefinition.size}; Total schema length ${cacheBySchemaDefinition.calculatedSize}`
  );
  return entry;
}

export function getSchemaObject(schema: string): SchemaObject {
  return wrapError(
    () => JSON.parse(schema),
    `Parsing Json schema failed:\n\n\t${schema}\n\nSee 'cause' for more details.`
  );
}
