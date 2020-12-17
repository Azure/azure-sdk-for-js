// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "@azure/core-http";
import { CloudEvent as WireCloudEvent } from "./generated/models";
import {
  CustomEventDataDeserializer,
  CloudEvent,
  EventGridEvent,
  cloudEventReservedPropertyNames
} from "./models";
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
 * EventGridConsumer is used to aid in processing events delivered by EventGrid. It can deserialize a JSON encoded payload
 * of either a single event or batch of events as well as be used to convert the result of `JSON.parse` into an
 * `EventGridEvent` or `CloudEvent` like object.
 *
 * Unlike normal JSON deseralization, EventGridConsumer does some additional conversions:
 *
 * - The consumer parses the event time property into a `Date` object, for ease of use.
 * - When deserializing an event in the CloudEvent schema, if the event contains binary data, it is base64 decoded
 *   and returned as an instance of the `Uint8Array` type.
 * - The `data` payload from system events is converted to match the interfaces this library defines.
 *
 * When constructing an `EventGridConsumer`, a map of event types to custom deserializers may be provided. When
 * deserializing, if a custom deserializer has been registered for a given event type, it will be called with the
 * data object. The object this deserializer returns will replace the existing data object.
 */
export class EventGridConsumer {
  readonly customDeserializers: Record<string, CustomEventDataDeserializer>;
  constructor(options?: EventGridConsumerOptions) {
    this.customDeserializers = options?.customDeserializers ?? {};
  }

  /**
   * Deserializes events encoded in the Event Grid schema.
   *
   * @param encodedEvents - the JSON encoded representation of either a single event or an array of
   * events, encoded in the Event Grid Schema.
   */
  public async deserializeEventGridEvents(
    encodedEvents: string
  ): Promise<EventGridEvent<unknown>[]>;

  /**
   * Deserializes events encoded in the Event Grid schema.
   *
   * @param encodedEvents - an object representing a single event, encoded in the Event Grid schema.
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
   * @param encodedEvents - the JSON encoded representation of either a single event or an array of
   * events, encoded in the Cloud Events 1.0 Schema.
   */
  public async deserializeCloudEvents(encodedEvents: string): Promise<CloudEvent<unknown>[]>;

  /**
   * Deserializes events encoded in the Cloud Events 1.0 schema.
   *
   * @param encodedEvents - an object representing a single event, encoded in the Cloud Events 1.0 schema.
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

        if (!(deserialized.dataBase64 instanceof Uint8Array)) {
          throw new TypeError("event data_base64 property is invalid");
        }

        modelEvent.data = deserialized.dataBase64;
      }

      // If a decoder is registered, apply it to the data.
      if (systemDeserializers[modelEvent.type]) {
        modelEvent.data = await systemDeserializers[modelEvent.type](modelEvent.data);
      } else if (this.customDeserializers[modelEvent.type]) {
        modelEvent.data = await this.customDeserializers[modelEvent.type](modelEvent.data);
      }

      // Build the "extensionsAttributes" property bag by removing all known top level properties.
      const extensionAttributes = { ...deserialized };
      for (const propName of cloudEventReservedPropertyNames) {
        delete extensionAttributes[propName];
      }
      delete extensionAttributes.dataBase64;

      // If any properties remain, copy them to the model.
      if (Object.keys(extensionAttributes).length > 0) {
        modelEvent.extensionAttributes = extensionAttributes;
      }

      events.push(modelEvent as CloudEvent<unknown>);
    }

    return events;
  }
}
