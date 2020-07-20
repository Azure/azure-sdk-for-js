// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Serializer } from "@azure/core-http";
import { CloudEvent as WireCloudEvent } from "./generated/models";
import { CloudEvent, EventGridEvent, CustomEventDataDecoder } from "./models";
import {
  EventGridEvent as EventGridEventMapper,
  CloudEvent as CloudEventMapper
} from "./generated/models/mappers";
import { parseAndWrap } from "./util";
import { systemDecoders } from "./systemEventDecoders";

const serializer = new Serializer();

function validateRequiredStringProperty(o: any, propertyName: string): void {
  if (typeof o[propertyName] === "undefined") {
    throw new TypeError(`event is missing required property '${propertyName}'`);
  }

  if (typeof o[propertyName] !== "string") {
    throw new TypeError(
      `event property '${propertyName} should be a 'string', but is '${typeof o[propertyName]}'`
    );
  }
}

function validateRequiredAnyProperty(o: any, propertyName: string): void {
  if (typeof o[propertyName] === "undefined") {
    throw new TypeError(`event is missing required property '${propertyName}'`);
  }
}

function validateOptionalStringProperty(propertyName: string, o: any): void {
  if (typeof o[propertyName] !== "undefined" && typeof o[propertyName] !== "string") {
    throw new TypeError(
      `event property '${propertyName}' should be a 'string' but it is a '${typeof o[
        propertyName
      ]}'`
    );
  }
}

/**
 * TODO(matell): Document this.
 */
export class EventGridConsumer {
  readonly customDecoders: Record<string, CustomEventDataDecoder>;
  constructor(decoders: Record<string, CustomEventDataDecoder> = {}) {
    this.customDecoders = decoders;
  }

  /**
   * Decodes events encoded in the Event Grid schema.
   *
   * @param encodedEvents the JSON encoded representation of either a single event or an array of
   * events, encoded in the Event Grid Schema.
   */
  public async decodeEventGridEvents(encodedEvents: string): Promise<EventGridEvent<unknown>[]>;
  /**
   * Decodes events encoded in the Event Grid schema.
   *
   * @param encodedEvents an object representing a single event, encoded in the Event Grid schema.
   */
  public async decodeEventGridEvents(encodedEvents: object): Promise<EventGridEvent<unknown>[]>;
  public async decodeEventGridEvents(
    encodedEvents: string | object
  ): Promise<EventGridEvent<unknown>[]> {
    const decodedArray = parseAndWrap(encodedEvents);

    const events: EventGridEvent<unknown>[] = [];

    for (const o of decodedArray) {
      if (typeof o !== "object") {
        throw new TypeError("event is not an object");
      }

      validateRequiredStringProperty(o, "eventType");
      validateRequiredStringProperty(o, "eventTime");
      validateRequiredStringProperty(o, "id");
      validateRequiredStringProperty(o, "subject");
      validateRequiredStringProperty(o, "topic");
      validateRequiredAnyProperty(o, "data");
      validateRequiredStringProperty(o, "dataVersion");
      validateRequiredStringProperty(o, "metadataVersion");

      if (o.metadataVersion !== "1") {
        throw new TypeError("event is not in the Event Grid schema");
      }

      const deserialized: EventGridEvent<any> = serializer.deserialize(EventGridEventMapper, o, "");

      if (systemDecoders[deserialized.eventType]) {
        deserialized.data = await systemDecoders[deserialized.eventType](deserialized.data);
      } else if (this.customDecoders[deserialized.eventType]) {
        deserialized.data = await this.customDecoders[deserialized.eventType](deserialized.data);
      }

      events.push(deserialized as EventGridEvent<unknown>);
    }

    return events;
  }

  /**
   * Decodes events encoded in the Cloud Events 1.0 schema.
   *
   * @param encodedEvents the JSON encoded representation of either a single event or an array of
   * events, encoded in the Cloud Events 1.0 Schema.
   */
  public async decodeCloudEvents(encodedEvents: string): Promise<CloudEvent<unknown>[]>;
  /**
   * Decodes events encoded in the Cloud Events 1.0 schema.
   *
   * @param encodedEvents an object representing a single event, encoded in the Cloud Events 1.0 schema.
   */
  public async decodeCloudEvents(encodedEvents: object): Promise<CloudEvent<unknown>[]>;
  public async decodeCloudEvents(encodedEvents: string | object): Promise<CloudEvent<unknown>[]> {
    const decodedArray = parseAndWrap(encodedEvents);

    const events: CloudEvent<unknown>[] = [];

    for (const o of decodedArray) {
      if (typeof o !== "object") {
        throw new TypeError("encoded event is not an object");
      }

      // Check that the required fields are present and of the correct type and the optional fields are missing
      // or of the correct type.

      validateRequiredStringProperty(o, "type");
      validateRequiredStringProperty(o, "source");
      validateRequiredStringProperty(o, "id");
      validateRequiredStringProperty(o, "specversion");
      validateOptionalStringProperty(o, "time");
      validateOptionalStringProperty(o, "dataschema");
      validateOptionalStringProperty(o, "datacontenttype");
      validateOptionalStringProperty(o, "subject");

      if (o.specversion !== "1.0") {
        throw new TypeError("event is not in the Cloud Event 1.0 schema");
      }

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
      if (systemDecoders[modelEvent.type]) {
        modelEvent.data = await systemDecoders[modelEvent.type](modelEvent.data);
      } else if (this.customDecoders[modelEvent.type]) {
        modelEvent.data = await this.customDecoders[modelEvent.type](modelEvent.data);
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
