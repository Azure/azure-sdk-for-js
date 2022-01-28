// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as avro from "avsc";
import {
  DecodeMessageDataOptions,
  MessageAdapter,
  MessageWithMetadata,
  SchemaRegistryAvroEncoderOptions,
} from "./models";
import { SchemaDescription, SchemaRegistry } from "@azure/schema-registry";
import { isMessageWithMetadata } from "./utility";

interface CacheEntry {
  /** Schema ID */
  id: string;

  /** avsc-specific representation for schema */
  type: avro.Type;
}

const avroMimeType = "avro/binary";

/**
 * Avro encoder that obtains schemas from a schema registry and does not
 * pack schemas into its payloads.
 */
export class SchemaRegistryAvroEncoder<MessageT = MessageWithMetadata> {
  /**
   * Creates a new encoder.
   *
   * @param client - Schema Registry where schemas are registered and obtained.
   *                 Usually this is a SchemaRegistryClient instance.
   */
  constructor(client: SchemaRegistry, options?: SchemaRegistryAvroEncoderOptions<MessageT>) {
    this.registry = client;
    this.schemaGroup = options?.groupName;
    this.autoRegisterSchemas = options?.autoRegisterSchemas ?? false;
    this.messageAdapter = options?.messageAdapter;
  }

  private readonly schemaGroup?: string;
  private readonly registry: SchemaRegistry;
  private readonly autoRegisterSchemas: boolean;
  private readonly messageAdapter?: MessageAdapter<MessageT>;

  // REVIEW: signature.
  //
  // - Should we wrap all errors thrown by avsc to avoid having our exception //
  //   contract being tied to its implementation details?
  /**
   * encodes the value parameter according to the input schema and creates a message
   * with the encoded data.
   *
   * @param value - The value to encodeMessageData.
   * @param schema - The Avro schema to use.
   * @returns A new message with the encoded value. The structure of message is
   * constrolled by the message factory option.
   */
  async encodeMessageData(value: unknown, schema: string): Promise<MessageT> {
    const entry = await this.getSchemaByDefinition(schema);
    const buffer = entry.type.toBuffer(value);
    const payload = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT
    );
    const contentType = `${avroMimeType}+${entry.id}`;
    return this.messageAdapter
      ? this.messageAdapter.produceMessage({
          contentType,
          body: payload,
        })
      : /**
         * If no message consumer was provided, then a MessageWithMetadata will be
         * returned. This should work because the MessageT type parameter defaults
         * to MessageWithMetadata.
         */
        ({
          body: payload,
          contentType: contentType,
        } as unknown as MessageT);
  }

  /**
   * Decodes the payload of the message using the schema ID in the content type
   * field if no schema was provided.
   *
   * @param message - The message with the payload to be decoded.
   * @param options - Decoding options.
   * @returns The decoded value.
   */
  async decodeMessageData(
    message: MessageT,
    options: DecodeMessageDataOptions = {}
  ): Promise<unknown> {
    const { schema: readerSchema } = options;
    const { body, contentType } = convertMessage(message, this.messageAdapter);
    const buffer = Buffer.from(body);
    const writerSchemaId = getSchemaId(contentType);
    const writerSchema = await this.getSchema(writerSchemaId);
    if (readerSchema) {
      const avscReaderSchema = this.getAvroTypeForSchema(readerSchema);
      const resolver = avscReaderSchema.createResolver(writerSchema.type);
      return avscReaderSchema.fromBuffer(buffer, resolver, true);
    } else {
      return writerSchema.type.fromBuffer(buffer);
    }
  }

  private readonly cacheBySchemaDefinition = new Map<string, CacheEntry>();
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

    if (!schemaResponse.properties.format.match(/^avro$/i)) {
      throw new Error(
        `Schema with ID '${schemaResponse.properties.id}' has format '${schemaResponse.properties.format}', not 'avro'.`
      );
    }

    const avroType = this.getAvroTypeForSchema(schemaResponse.definition);
    return this.cache(schemaId, schemaResponse.definition, avroType);
  }

  private async getSchemaByDefinition(schema: string): Promise<CacheEntry> {
    const cached = this.cacheBySchemaDefinition.get(schema);
    if (cached) {
      return cached;
    }

    const avroType = this.getAvroTypeForSchema(schema);
    if (!avroType.name) {
      throw new Error("Schema must have a name.");
    }

    if (!this.schemaGroup) {
      throw new Error(
        "Schema group must have been specified in the constructor options when the client was created in order to encode."
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
          throw new Error(
            `Schema '${description.name}' not found in registry group '${description.groupName}', or not found to have matching definition.`
          );
        } else {
          throw e;
        }
      }
    }

    return this.cache(id, schema, avroType);
  }

  private cache(id: string, schema: string, type: avro.Type): CacheEntry {
    const entry = { id, type };
    this.cacheBySchemaDefinition.set(schema, entry);
    this.cacheById.set(id, entry);
    return entry;
  }

  private getAvroTypeForSchema(schema: string): avro.Type {
    return avro.Type.forSchema(JSON.parse(schema), { omitRecordMethods: true });
  }
}

function getSchemaId(contentType: string): string {
  const contentTypeParts = contentType.split("+");
  if (contentTypeParts.length !== 2) {
    throw new Error("Content type was not in the expected format of MIME type + schema ID");
  }
  if (contentTypeParts[0] !== avroMimeType) {
    throw new Error(
      `Received content of type ${contentTypeParts[0]} but an avro encoder may only be used on content that is of '${avroMimeType}' type`
    );
  }
  return contentTypeParts[1];
}

/**
 * Tries to decode a body in the preamble format. If that does not succeed, it
 * returns it as is.
 * @param body - The message body
 * @param contentType - The message content type
 * @returns a message with metadata
 */
function convertPayload(body: Uint8Array, contentType: string): MessageWithMetadata {
  try {
    return tryReadingPreambleFormat(Buffer.from(body));
  } catch (_e: unknown) {
    return {
      body,
      contentType,
    };
  }
}

function convertMessage<MessageT>(
  message: MessageT,
  adapter?: MessageAdapter<MessageT>
): MessageWithMetadata {
  const messageConsumer = adapter?.consumeMessage;
  if (messageConsumer) {
    const { body, contentType } = messageConsumer(message);
    return convertPayload(body, contentType);
  } else if (isMessageWithMetadata(message)) {
    return convertPayload(message.body, message.contentType);
  } else {
    throw new Error(
      `Expected either a message adapter to be provided to the encoder or the input message to have body and contentType fields`
    );
  }
}

/**
 * Maintains backward compatability by supporting the encoded value format created
 * by earlier beta serializers
 * @param buffer - The input buffer
 * @returns a message that contains the body and content type with the schema ID
 */
function tryReadingPreambleFormat(buffer: Buffer): MessageWithMetadata {
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
    body: payloadBuffer,
    contentType: `${avroMimeType}+${schemaId}`,
  };
}
