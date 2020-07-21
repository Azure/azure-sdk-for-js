// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "@azure/core-http";
import { CloudEvent as WireCloudEvent } from "./generated/models";
import { CustomEventDataDeserializer, CloudEvent, EventGridEvent } from "./models";
import {
  EventGridEvent as EventGridEventMapper,
  CloudEvent as CloudEventMapper
} from "./generated/models/mappers";
import { parseAndWrap, validateEventGridEvent, validateCloudEventEvent } from "./util";
import { systemDeserializers } from "./systemEventDecoders";

const serializer = new Serializer();

/**
 * Options for the Event Grid Consumer
 */
export interface EventGridConsumerOptions {
  /**
   * Custom deserializers to use when decoding a specific event's data, based on the type
   * field of the event.
   */
  customDeserializers: Record<string, CustomEventDataDeserializer>;
}

/**
 * TODO(matell): Document this.
 */
export class EventGridConsumer {
  readonly customDeserializers: Record<string, CustomEventDataDeserializer>;
  constructor(options?: EventGridConsumerOptions) {
    this.customDeserializers = options?.customDeserializers ?? {};
  }

  /**
   * Deserializes events encoded in the Event Grid schema.
   *
   * @param encodedEvents the JSON encoded representation of either a single event or an array of
   * events, encoded in the Event Grid Schema.
   */
  public async deserializeEventGridEvents(
    encodedEvents: string
  ): Promise<EventGridEvent<unknown>[]>;

  /**
   * Deserializes events encoded in the Event Grid schema.
   *
   * @param encodedEvents an object representing a single event, encoded in the Event Grid schema.
   */
  public async deserializeEventGridEvents(
    encodedEvents: object
  ): Promise<EventGridEvent<unknown>[]>;
  public async deserializeEventGridEvents(
    encodedEvents: string | object
  ): Promise<EventGridEvent<unknown>[]> {
    const decodedArray = parseAndWrap(encodedEvents);

    const events: EventGridEvent<unknown>[] = [];

    for (const o of decodedArray) {
      validateEventGridEvent(o);

      const deserialized: EventGridEvent<any> = serializer.deserialize(EventGridEventMapper, o, "");

      if (systemDeserializers[deserialized.eventType]) {
        deserialized.data = await systemDeserializers[deserialized.eventType](deserialized.data);
      } else if (this.customDeserializers[deserialized.eventType]) {
        deserialized.data = await this.customDeserializers[deserialized.eventType](
          deserialized.data
        );
      }

      events.push(deserialized as EventGridEvent<unknown>);
    }

    return events;
  }

  /**
   * Deserializes events encoded in the Cloud Events 1.0 schema.
   *
   * @param encodedEvents the JSON encoded representation of either a single event or an array of
   * events, encoded in the Cloud Events 1.0 Schema.
   */
  public async deserializeCloudEvents(encodedEvents: string): Promise<CloudEvent<unknown>[]>;

  /**
   * Deserializes events encoded in the Cloud Events 1.0 schema.
   *
   * @param encodedEvents an object representing a single event, encoded in the Cloud Events 1.0 schema.
   */
  public async deserializeCloudEvents(encodedEvents: object): Promise<CloudEvent<unknown>[]>;
  public async deserializeCloudEvents(
    encodedEvents: string | object
  ): Promise<CloudEvent<unknown>[]> {
    const decodedArray = parseAndWrap(encodedEvents);

    const events: CloudEvent<unknown>[] = [];

    for (const o of decodedArray) {
      validateCloudEventEvent(o);

      // Check that the required fields are present and of the correct type and the optional fields are missing
      // or of the correct type.

      const deserialized: WireCloudEvent = serializer.deserialize(CloudEventMapper, o, "");
      const modelEvent: Record<string, any> = {
        specversion: deserialized.specversion,
        id: deserialized.id,
        source: deserialized.source,
        type: deserialized.type
      };

      if (deserialized.datacontenttype !== undefined) {
        modelEvent.datacontenttype = deserialized.datacontenttype;
      }

      if (deserialized.dataschema !== undefined) {
        modelEvent.dataschema = deserialized.dataschema;
      }

      if (deserialized.subject !== undefined) {
        modelEvent.subject = deserialized.subject;
      }

      if (deserialized.time !== undefined) {
        modelEvent.time = deserialized.time;
      }

      if (deserialized.data !== undefined) {
        modelEvent.data = deserialized.data;
      }

      // If the data the event represents binary, it is encoded as base64 text in a different property on the event and we need to transform it.
      if (deserialized.dataBase64 !== undefined) {
        if (deserialized.data !== undefined) {
          throw new TypeError("event contains both a data and data_base64 field");
        }

        if (typeof deserialized.dataBase64 !== "string") {
          throw new TypeError("event data_base64 property should be a string");
        }

        modelEvent.data = Buffer.from(deserialized.dataBase64, "base64");
      }

      // If a decoder is registered, apply it to the data.
      if (systemDeserializers[modelEvent.type]) {
        modelEvent.data = await systemDeserializers[modelEvent.type](modelEvent.data);
      } else if (this.customDeserializers[modelEvent.type]) {
        modelEvent.data = await this.customDeserializers[modelEvent.type](modelEvent.data);
      }

      // Build the "extensionsAttributes" property bag by removing all known top level properties.
      const extensionAttributes = { ...deserialized };
      delete extensionAttributes.specversion;
      delete extensionAttributes.id;
      delete extensionAttributes.source;
      delete extensionAttributes.type;
      delete extensionAttributes.datacontenttype;
      delete extensionAttributes.dataschema;
      delete extensionAttributes.subject;
      delete extensionAttributes.time;
      delete extensionAttributes.data;

      if (Object.keys(extensionAttributes).length > 0) {
        modelEvent.extensionAttributes = extensionAttributes;
      }

      events.push(modelEvent as CloudEvent<unknown>);
    }

    return events;
  }
}
