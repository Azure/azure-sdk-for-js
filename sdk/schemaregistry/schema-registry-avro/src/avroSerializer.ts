// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as avro from "avsc";
import {
  AvroError,
  AvroSerializerOptions,
  DeserializeOptions,
  MessageAdapter,
  MessageContent,
} from "./models";
import { SchemaDescription, SchemaRegistry } from "@azure/schema-registry";
import LRUCache from "lru-cache";
import LRUCacheOptions = LRUCache.Options;
import { isMessageContent } from "./utility";
import { logger } from "./logger";

type AVSCSerializer = avro.Type;

interface CacheEntry {
  /** Schema ID */
  id: string;

  /** avsc-specific representation for schema */
  serializer: AVSCSerializer;
}

const avroMimeType = "avro/binary";
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

/**
 * Avro serializer that obtains schemas from a schema registry and does not
 * pack schemas into its payloads.
 */
export class AvroSerializer<MessageT = MessageContent> {
  /**
   * Creates a new serializer.
   *
   * @param client - Schema Registry where schemas are registered and obtained.
   *                 Usually this is a SchemaRegistryClient instance.
   */
  constructor(client: SchemaRegistry, options?: AvroSerializerOptions<MessageT>) {
    this.registry = client;
    this.schemaGroup = options?.groupName;
    this.autoRegisterSchemas = options?.autoRegisterSchemas ?? false;
    this.messageAdapter = options?.messageAdapter;
  }

  private readonly schemaGroup?: string;
  private readonly registry: SchemaRegistry;
  private readonly autoRegisterSchemas: boolean;
  private readonly messageAdapter?: MessageAdapter<MessageT>;
  private readonly cacheBySchemaDefinition = new LRUCache<string, CacheEntry>(cacheOptions);
  private readonly cacheById = new LRUCache<string, AVSCSerializer>(cacheOptions);
  /**
   * serializes the value parameter according to the input schema and creates a message
   * with the serialized data.
   *
   * @param value - The value to serialize.
   * @param schema - The Avro schema to use.
   * @returns A new message with the serialized value. The structure of message is
   * constrolled by the message factory option.
   * @throws {@link AvroError}
   * Thrown if the schema can not be parsed or the value does not match the schema.
   */
  async serialize(value: unknown, schema: string): Promise<MessageT> {
    const entry = await this.getSchemaByDefinition(schema);
    const buffer = wrapError(
      () => entry.serializer.toBuffer(value),
      "Avro serialization failed. See innerError for more details.",
      {
        schemaId: entry.id,
      }
    );
    const data = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT
    );
    const contentType = `${avroMimeType}+${entry.id}`;
    return this.messageAdapter
      ? this.messageAdapter.produce({
          contentType,
          data,
        })
      : /**
         * If no message consumer was provided, then a MessageContent will be
         * returned. This should work because the MessageT type parameter defaults
         * to MessageContent.
         */
        ({
          data,
          contentType: contentType,
        } as MessageContent as unknown as MessageT);
  }

  /**
   * Deserializes the payload of the message using the schema ID in the content type
   * field if no schema was provided.
   *
   * @param message - The message with the payload to be deserialized.
   * @param options - Decoding options.
   * @returns The deserialized value.
   * @throws {@link AvroError}
   * Thrown if the deserialization failed, e.g. because reader and writer schemas are incompatible.
   */
  async deserialize(message: MessageT, options: DeserializeOptions = {}): Promise<unknown> {
    const { schema: readerSchema } = options;
    const { data, contentType } = convertMessage(message, this.messageAdapter);
    const buffer = Buffer.from(data);
    const writerSchemaId = getSchemaId(contentType);
    const writerSchemaSerializer = await this.getSchemaById(writerSchemaId);
    if (readerSchema) {
      const readerSchemaSerializer = getSerializerForSchema(readerSchema, {
        schemaId: writerSchemaId,
      });
      const resolver = wrapError(
        () => readerSchemaSerializer.createResolver(writerSchemaSerializer),
        `Avro reader schema is incompatible with the writer schema (schema ID: (${writerSchemaId})):\n\n\treader schema: ${readerSchema}\n\nSee innerError for more details.`,
        {
          schemaId: writerSchemaId,
        }
      );
      return wrapError(
        () => readerSchemaSerializer.fromBuffer(buffer, resolver, true),
        `Avro deserialization with reader schema failed: \n\treader schema: ${readerSchema}\nSee innerError for more details.`,
        {
          schemaId: writerSchemaId,
        }
      );
    } else {
      return wrapError(
        () => writerSchemaSerializer.fromBuffer(buffer),
        `Avro deserialization failed with schema ID (${writerSchemaId}). See innerError for more details.`,
        {
          schemaId: writerSchemaId,
        }
      );
    }
  }

  private async getSchemaById(schemaId: string): Promise<AVSCSerializer> {
    const cached = this.cacheById.get(schemaId);
    if (cached) {
      return cached;
    }

    const schemaResponse = await this.registry.getSchema(schemaId);
    if (!schemaResponse) {
      throw new AvroError(`Schema with ID '${schemaId}' not found.`);
    }

    if (!schemaResponse.properties.format.match(/^avro$/i)) {
      throw new AvroError(
        `Schema with ID '${schemaResponse.properties.id}' has format '${schemaResponse.properties.format}', not 'avro'.`
      );
    }

    const avroType = getSerializerForSchema(schemaResponse.definition, {
      schemaId: schemaResponse.properties.id,
    });
    return this.cache(schemaId, schemaResponse.definition, avroType).serializer;
  }

  private async getSchemaByDefinition(schema: string): Promise<CacheEntry> {
    const cached = this.cacheBySchemaDefinition.get(schema);
    if (cached) {
      return cached;
    }

    const avroType = getSerializerForSchema(schema);
    if (!avroType.name) {
      throw new AvroError("Schema must have a name.");
    }

    if (!this.schemaGroup) {
      throw new AvroError(
        "Schema group must have been specified in the constructor options when the client was created in order to serialize."
      );
    }

    const description: SchemaDescription = {
      groupName: this.schemaGroup,
      name: avroType.name,
      format: "Avro",
      definition: schema,
    };

    let id: string;
    if (this.autoRegisterSchemas) {
      id = (await this.registry.registerSchema(description)).id;
    } else {
      try {
        id = (await this.registry.getSchemaProperties(description)).id;
      } catch (e) {
        if (e.statusCode === 404) {
          throw new AvroError(
            `Schema '${description.name}' not found in registry group '${description.groupName}', or not found to have matching definition.`
          );
        } else {
          throw e;
        }
      }
    }

    return this.cache(id, schema, avroType);
  }

  private cache(id: string, schema: string, serializer: AVSCSerializer): CacheEntry {
    const entry = { id, serializer };
    this.cacheBySchemaDefinition.set(schema, entry);
    this.cacheById.set(id, serializer);
    logger.verbose(
      `Cache entry added or updated. Total number of entries: ${this.cacheBySchemaDefinition.size}; Total schema length ${this.cacheBySchemaDefinition.calculatedSize}`
    );
    return entry;
  }
}

function getSchemaId(contentType: string): string {
  const contentTypeParts = contentType.split("+");
  if (contentTypeParts.length !== 2) {
    throw new AvroError("Content type was not in the expected format of MIME type + schema ID");
  }
  if (contentTypeParts[0] !== avroMimeType) {
    throw new AvroError(
      `Received content of type ${contentTypeParts[0]} but an avro serializer may only be used on content that is of '${avroMimeType}' type`
    );
  }
  return contentTypeParts[1];
}

/**
 * Tries to deserialize data in the preamble format. If that does not succeed, it
 * returns it as is.
 * @param data - The message content
 * @param contentType - The message content type
 * @returns a message
 */
function convertPayload(data: Uint8Array, contentType: string): MessageContent {
  try {
    return tryReadingPreambleFormat(Buffer.from(data));
  } catch (_e: unknown) {
    return {
      data,
      contentType,
    };
  }
}

function convertMessage<MessageT>(
  message: MessageT,
  adapter?: MessageAdapter<MessageT>
): MessageContent {
  const messageConsumer = adapter?.consume;
  if (messageConsumer) {
    const { data, contentType } = messageConsumer(message);
    return convertPayload(data, contentType);
  } else if (isMessageContent(message)) {
    return convertPayload(message.data, message.contentType);
  } else {
    throw new AvroError(
      `Expected either a message adapter to be provided to the serializer or the input message to have data and contentType fields`
    );
  }
}

/**
 * Maintains backward compatability by supporting the serialized value format created
 * by earlier beta serializers
 * @param buffer - The input buffer
 * @returns a message that contains the data and content type with the schema ID
 */
function tryReadingPreambleFormat(buffer: Buffer): MessageContent {
  const FORMAT_INDICATOR = 0;
  const SCHEMA_ID_OFFSET = 4;
  const PAYLOAD_OFFSET = 36;
  if (buffer.length < PAYLOAD_OFFSET) {
    throw new RangeError("Buffer is too small to have the correct format.");
  }
  const format = buffer.readUInt32BE(0);
  if (format !== FORMAT_INDICATOR) {
    throw new TypeError(`Buffer has unknown format indicator.`);
  }
  const schemaIdBuffer = buffer.slice(SCHEMA_ID_OFFSET, PAYLOAD_OFFSET);
  const schemaId = schemaIdBuffer.toString("utf-8");
  const payloadBuffer = buffer.slice(PAYLOAD_OFFSET);
  return {
    data: payloadBuffer,
    contentType: `${avroMimeType}+${schemaId}`,
  };
}

function getSerializerForSchema(
  schema: string,
  options: {
    schemaId?: string;
  } = {}
): AVSCSerializer {
  return wrapError(
    () => avro.Type.forSchema(JSON.parse(schema), { omitRecordMethods: true }),
    `Parsing Avro schema failed:\n\n\t${schema}\n\nSee innerError for more details.`,
    options
  );
}

function wrapError<T>(
  f: () => T,
  message: string,
  options: {
    schemaId?: string;
  } = {}
): T {
  let result: T;
  try {
    result = f();
  } catch (innerError) {
    const { schemaId } = options;
    throw new AvroError(message, {
      innerError,
      schemaId,
    });
  }
  return result;
}
