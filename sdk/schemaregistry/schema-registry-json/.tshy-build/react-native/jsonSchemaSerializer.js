// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KnownSchemaFormats } from "@azure/schema-registry";
import { isMessageContent } from "./utility.js";
import { errorWithCause, wrapError } from "./errors.js";
import { LRUCache } from "lru-cache";
import { logger } from "./logger.js";
const jsonMimeType = "application/json";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function getSchemaObject(schema) {
    return wrapError(() => JSON.parse(schema), `Parsing Json schema failed:\n\n\t${schema}\n\nSee 'cause' for more details.`);
}
const cacheOptions = {
    max: 128,
    /**
     * This is needed in order to specify `sizeCalculation` but we do not intend
     * to limit the size just yet.
     */
    maxSize: Number.MAX_VALUE,
    sizeCalculation: (_value, key) => {
        return key.length;
    },
};
/**
 * Json serializer that obtains schemas from a schema registry and does not
 * pack schemas into its payloads.
 */
export class JsonSchemaSerializer {
    /**
     * Creates a new serializer.
     *
     * @param client - Schema Registry where schemas are registered and obtained.
     *                 Usually this is a SchemaRegistryClient instance.
     */
    constructor(client, options) {
        this.cacheIdByDefinition = new LRUCache(cacheOptions);
        this.cacheById = new LRUCache(cacheOptions);
        this.registry = client;
        this.schemaGroup = options === null || options === void 0 ? void 0 : options.groupName;
        this.messageAdapter = options === null || options === void 0 ? void 0 : options.messageAdapter;
    }
    /**
     * serializes the value parameter according to the input schema and creates a message
     * with the serialized data.
     *
     * @param value - The value to serialize.
     * @param schema - The Json schema to use.
     * @returns A new message with the serialized value. The structure of message is
     * constrolled by the message factory option.
     * @throws {@link Error}
     * Thrown if the schema can not be parsed or the value does not match the schema.
     */
    async serialize(value, schema) {
        const entry = await this.getSchemaByDefinition(schema);
        const data = wrapError(() => encoder.encode(JSON.stringify(value)), `Json serialization failed. See 'cause' for more details. Schema ID: ${entry.id}`);
        const contentType = `${jsonMimeType}+${entry.id}`;
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
                {
                    data,
                    contentType,
                };
    }
    /**
     * Deserializes the payload of the message using the schema ID in the content type
     * field if no schema was provided.
     *
     * @param message - The message with the payload to be deserialized.
     * @returns The deserialized value.
     * @throws {@link Error}
     * Thrown if the deserialization failed, e.g. because reader and writer schemas are incompatible.
     */
    async deserialize(message, options) {
        const { data, contentType } = convertMessage(message, this.messageAdapter);
        const schemaId = getSchemaId(contentType);
        const schema = await this.getSchemaById(schemaId);
        const returnedMessage = wrapError(() => JSON.parse(decoder.decode(data)), `Json deserialization failed with schema ID (${schemaId}). See 'cause' for more details.`);
        const validate = options === null || options === void 0 ? void 0 : options.validateCallback;
        if (validate) {
            wrapError(() => validate(returnedMessage, schema), `Json validation failed. See 'cause' for more details. Schema ID: ${schemaId}`);
        }
        return returnedMessage;
    }
    async getSchemaById(schemaId) {
        const cached = this.cacheById.get(schemaId);
        if (cached) {
            return cached;
        }
        const schemaResponse = await this.registry.getSchema(schemaId);
        if (!schemaResponse) {
            throw new Error(`Schema with ID '${schemaId}' not found.`);
        }
        if (!schemaResponse.properties.format.match(/^json$/i)) {
            throw new Error(`Schema with ID '${schemaResponse.properties.id}' has format '${schemaResponse.properties.format}', not 'json'.`);
        }
        return this.cache(schemaResponse.definition, schemaId).schema;
    }
    async getSchemaByDefinition(definition) {
        const schemaId = this.cacheIdByDefinition.get(definition);
        if (schemaId) {
            return { id: schemaId, schema: definition };
        }
        if (!this.schemaGroup) {
            throw new Error("Schema group must have been specified in the constructor options when the client was created in order to serialize.");
        }
        const schemaObj = getSchemaObject(definition);
        const description = {
            groupName: this.schemaGroup,
            name: getSchemaName(schemaObj),
            format: KnownSchemaFormats.Json,
            definition,
        };
        let id;
        try {
            id = (await this.registry.getSchemaProperties(description)).id;
        }
        catch (e) {
            if (e.statusCode === 404) {
                throw errorWithCause(`Schema '${description.name}' not found in registry group '${description.groupName}', or not found to have matching definition.`, e);
            }
            else {
                throw e;
            }
        }
        return this.cache(definition, id);
    }
    cache(schema, id) {
        const entry = { schema, id };
        this.cacheIdByDefinition.set(schema, id);
        this.cacheById.set(id, schema);
        logger.verbose(`Cache entry added or updated. Total number of entries: ${this.cacheIdByDefinition.size}; Total schema length ${this.cacheIdByDefinition.calculatedSize}`);
        return entry;
    }
}
function getSchemaId(contentType) {
    const contentTypeParts = contentType.split("+");
    if (contentTypeParts.length !== 2) {
        throw new Error("Content type was not in the expected format of MIME type + schema ID");
    }
    if (contentTypeParts[0] !== jsonMimeType) {
        throw new Error(`Received content of type ${contentTypeParts[0]} but an json serializer may only be used on content that is of '${jsonMimeType}' type`);
    }
    return contentTypeParts[1];
}
function convertMessage(message, adapter) {
    const messageConsumer = adapter === null || adapter === void 0 ? void 0 : adapter.consume;
    if (messageConsumer) {
        return messageConsumer(message);
    }
    else if (isMessageContent(message)) {
        return message;
    }
    else {
        throw new Error(`Expected either a message adapter to be provided to the serializer or the input message to have data and contentType fields`);
    }
}
function getSchemaName(schema) {
    const id = schema.$id || schema.id;
    if (!id) {
        throw new Error("Schema must have an ID.");
    }
    return id;
}
//# sourceMappingURL=jsonSchemaSerializer.js.map