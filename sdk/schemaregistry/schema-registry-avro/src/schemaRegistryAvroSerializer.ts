// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SchemaRegistry } from "@azure/schema-registry";
import * as avro from "avsc";
import { toUint8Array } from "./utils/buffer";

// REVIEW: This should go in to a shared doc somewhere that all of the different
//         language serializer's docs can reference.
//
// Wire format
// -----------
//
// This is a standard meant to be reused across schema registry serializers for
// different format. We only have an avro serializer at this point so picking
// apart this format is inlined here, but handling could be extracted and shared
// between serializers of different formats in the future.
//
// - [4 bytes: Format Indicator]
//      - Currently always zero to indicate format below.
//
// - [32 bytes: Schema ID]
//      - UTF-8 hexadecimal representation of GUID.
//      - 32 hex digits, no hyphens.
//      - Same format and byte order as string from Schema Registry service.
//
// - [Remaining bytes: Avro payload (in general, format-specific payload)]
//     - Avro Binary Encoding
//     - NOT Avro Object Container File, which includes the schema and defeats
//       the purpose of this serializer to move the schema out of the message
//       payload and into the schema registry.
//
const FORMAT_INDICATOR = 0;
const SCHEMA_ID_OFFSET = 4;
const SCHEMA_ID_LENGTH = 32;
const PAYLOAD_OFFSET = 36;

interface CacheEntry {
  /** Schema ID */
  id: string;

  /** avsc-specific representation for schema */
  type: avro.Type;
}

/**
 * Options for Schema
 */
export interface SchemaRegistryAvroSerializerOptions {
  /**
   * When true, register new schemas passed to serialize. Otherwise, and by
   * default, fail if schema has not already been registered.
   *
   * Automatic schema registration is NOT recommended for production scenarios.
   */
  autoRegisterSchemas?: boolean;
}

/**
 * Avro serializer that obtains schemas from a schema registry and does not
 * pack schemas into its payloads.
 */
export class SchemaRegistryAvroSerializer {
  /**
   * Creates a new serializer.
   *
   * @param client - Schema Registry where schemas are registered and obtained.
   *                 Usually this is a SchemaRegistryClient instance.
   *
   * @param groupName - The schema group to use when making requests to the
   *                    registry.
   */
  constructor(
    client: SchemaRegistry,
    groupName: string,
    options?: SchemaRegistryAvroSerializerOptions
  ) {
    this.registry = client;
    this.schemaGroup = groupName;
    this.autoRegisterSchemas = options?.autoRegisterSchemas ?? false;
  }

  private readonly schemaGroup: string;
  private readonly registry: SchemaRegistry;
  private readonly autoRegisterSchemas: boolean;

  // REVIEW: signature.
  //
  // - Better to serialize into a stream? I aborted that for now as I wanted to
  //   do the simplest thing that could possibly work first to make sure there
  //   were no blockers in our dependencies. I also wanted to get feedback on
  //   what the API shape should be before diving into that.
  //
  // - This type should ultimately be able to implement a core ObjectSerializer
  //   interface. Do we know what that would look like? Maybe it takes `any` as
  //   the format-specific schema/type info? Or does it always take a
  //   format-specific schema string?
  //
  //   The C#/Java approach of passing Type and assuming every serializer can
  //   get its schema by reflecting on the type does not work for JavaScript. We
  //   need to support arbitrary objects that match a schema.
  //
  //   Maybe each format expects a different property on this arg so that you
  //   could at least pass enough info for multiple formats, and then your call
  //   to ObjectSerializer is at least not tied to a single format?
  //
  // - Should we wrap all errors thrown by avsc to avoid having our exception //
  //   contract being tied to its implementation details?
  /**
   * Serializes a value into a buffer.
   *
   * @param value - The value to serialize.
   * @param schema - The Avro schema to use.
   * @returns A new buffer with the serialized value
   */
  async serialize(value: unknown, schema: string): Promise<Buffer> {
    const entry = await this.getSchemaByContent(schema);
    const payload = entry.type.toBuffer(value);
    const buffer = Buffer.alloc(PAYLOAD_OFFSET + payload.length);

    buffer.writeUInt32BE(FORMAT_INDICATOR, 0);
    buffer.write(entry.id, SCHEMA_ID_OFFSET, SCHEMA_ID_LENGTH, "utf-8");
    payload.copy(buffer, PAYLOAD_OFFSET);
    return buffer;
  }

  // REVIEW: signature. See serialize and s/serialize into/deserialize from/.
  /**
   * Deserializes a value from a buffer.
   *
   * @param buffer - The buffer with the serialized value.
   * @returns The deserialized value.
   */
  async deserialize(input: Buffer | Blob | Uint8Array): Promise<unknown> {
    const arr8 = await toUint8Array(input);
    const buffer = Buffer.isBuffer(arr8) ? arr8 : Buffer.from(arr8);
    if (buffer.length < PAYLOAD_OFFSET) {
      throw new RangeError("Buffer is too small to have the correct format.");
    }

    const format = buffer.readUInt32BE(0);
    if (format !== FORMAT_INDICATOR) {
      throw new TypeError(`Buffer has unknown format indicator: 0x${format.toString(16)}.`);
    }

    const schemaIdBuffer = buffer.slice(SCHEMA_ID_OFFSET, PAYLOAD_OFFSET);
    const schemaId = schemaIdBuffer.toString("utf-8");
    const schema = await this.getSchema(schemaId);
    const payloadBuffer = buffer.slice(PAYLOAD_OFFSET);

    return schema.type.fromBuffer(payloadBuffer);
  }

  private readonly cacheByContent = new Map<string, CacheEntry>();
  private readonly cacheById = new Map<string, CacheEntry>();

  private async getSchema(schemaId: string): Promise<CacheEntry> {
    const cached = this.cacheById.get(schemaId);
    if (cached) {
      return cached;
    }

    const schemaResponse = await this.registry.getSchema(schemaId);
    if (!schemaResponse) {
      throw new Error(`Schema with ID '${schemaId}' not found.`);
    }

    if (!schemaResponse.serializationType.match(/^avro$/i)) {
      throw new Error(
        `Schema with ID '${schemaResponse.id}' has serialization type '${schemaResponse.serializationType}', not 'avro'.`
      );
    }

    const avroType = this.getAvroTypeForSchema(schemaResponse.content);
    return this.cache(schemaId, schemaResponse.content, avroType);
  }

  private async getSchemaByContent(schema: string): Promise<CacheEntry> {
    const cached = this.cacheByContent.get(schema);
    if (cached) {
      return cached;
    }

    const avroType = this.getAvroTypeForSchema(schema);
    if (!avroType.name) {
      throw new Error("Schema must have a name.");
    }

    const description = {
      groupName: this.schemaGroup,
      name: avroType.name,
      serializationType: "avro",
      content: schema
    };

    let id: string;
    if (this.autoRegisterSchemas) {
      id = (await this.registry.registerSchema(description)).id;
    } else {
      const response = await this.registry.getSchemaProperties(description);
      if (!response) {
        throw new Error(
          `Schema '${description.name}' not found in registry group '${description.groupName}', or not found to have matching content.`
        );
      }
      id = response.id;
    }

    return this.cache(id, schema, avroType);
  }

  private cache(id: string, schema: string, type: avro.Type): CacheEntry {
    const entry = { id, type };
    this.cacheByContent.set(schema, entry);
    this.cacheById.set(id, entry);
    return entry;
  }

  private getAvroTypeForSchema(schema: string): avro.Type {
    return avro.Type.forSchema(JSON.parse(schema), { omitRecordMethods: true });
  }
}
