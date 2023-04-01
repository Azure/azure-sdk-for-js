// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Ajv, { SchemaObject } from "ajv/dist/jtd";
import LRUCache from "lru-cache";

import LRUCacheOptions = LRUCache.Options;
import { logger } from "./logger";
import { wrapError } from "./errors";

export type AjvSerializer = ReturnType<Ajv["compileSerializer"]>;
export type AjvDeserializer = ReturnType<Ajv["compileParser"]>;

export interface CacheEntry {
  /** Schema ID */
  id: string;
  /** the Ajv serializer */
  serializer: AjvSerializer;
  /** the Ajv deserializer */
  derserializer: AjvDeserializer;
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
  const cacheById = new LRUCache<string, AjvDeserializer>(cacheOptions);

const ajv = new Ajv();

export function getCacheById(schemaId: string): AjvDeserializer | undefined {
    return cacheById.get(schemaId);
}

export function getCacheByDefinition(schema: string): CacheEntry | undefined {
    return cacheBySchemaDefinition.get(schema);
}

function getSchemaSerializers(schema: string , schemaObj?: SchemaObject): { serializer: AjvSerializer, derserializer: AjvDeserializer } {
    const schemaObject = schemaObj === undefined ? getSchemaObject(schema) : schemaObj;
    return wrapError(
      () => {
        const serializer = ajv.compileSerializer(schemaObject);
        const derserializer = ajv.compileParser(schemaObject);
        return { serializer, derserializer };},
      `Parsing Json schema failed:\n\n\t${schema}\n\nSee 'cause' for more details.`
    );
  }
  

export function cache(id: string, schema: string, schemaObj?: SchemaObject): CacheEntry {
    const entry = { id, ...getSchemaSerializers(schema, schemaObj) };
    cacheById.set(id, entry.derserializer);
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