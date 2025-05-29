import type { DeserializeOptions, JsonSchemaSerializerOptions, MessageContent } from "./models.js";
import type { SchemaRegistry } from "@azure/schema-registry";
/**
 * Json serializer that obtains schemas from a schema registry and does not
 * pack schemas into its payloads.
 */
export declare class JsonSchemaSerializer<MessageT = MessageContent> {
    /**
     * Creates a new serializer.
     *
     * @param client - Schema Registry where schemas are registered and obtained.
     *                 Usually this is a SchemaRegistryClient instance.
     */
    constructor(client: SchemaRegistry, options?: JsonSchemaSerializerOptions<MessageT>);
    private readonly schemaGroup?;
    private readonly registry;
    private readonly messageAdapter?;
    private readonly cacheIdByDefinition;
    private readonly cacheById;
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
    serialize(value: unknown, schema: string): Promise<MessageT>;
    /**
     * Deserializes the payload of the message using the schema ID in the content type
     * field if no schema was provided.
     *
     * @param message - The message with the payload to be deserialized.
     * @returns The deserialized value.
     * @throws {@link Error}
     * Thrown if the deserialization failed, e.g. because reader and writer schemas are incompatible.
     */
    deserialize<T>(message: MessageT, options?: DeserializeOptions): Promise<T>;
    private getSchemaById;
    private getSchemaByDefinition;
    private cache;
}
//# sourceMappingURL=jsonSchemaSerializer.d.ts.map