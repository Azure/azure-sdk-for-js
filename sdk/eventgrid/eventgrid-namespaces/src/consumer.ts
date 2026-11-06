// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";
import type { CloudEvent } from "./models.js";
import { cloudEventReservedPropertyNames } from "./models.js";
import { parseAndWrap, validateCloudEventEvent } from "./util.js";

/**
 * EventGridDeserializer is used to aid in processing events delivered by EventGrid. It can deserialize a JSON encoded payload
 * of either a single event or batch of events as well as be used to convert the result of `JSON.parse` into an
 * `EventGridEvent` or `CloudEvent` like object.
 *
 * Unlike normal JSON deseralization, EventGridDeserializer does some additional conversions:
 *
 * - The consumer parses the event time property into a `Date` object, for ease of use.
 * - When deserializing an event in the CloudEvent schema, if the event contains binary data, it is base64 decoded
 *   and returned as an instance of the `Uint8Array` type.
 */
export class EventGridDeserializer {
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
  public async deserializeCloudEvents(
    encodedEvents: Record<string, unknown>,
  ): Promise<CloudEvent<unknown>[]>;
  public async deserializeCloudEvents(
    encodedEvents: string | Record<string, unknown>,
  ): Promise<CloudEvent<unknown>[]> {
    const decodedArray = parseAndWrap(encodedEvents);

    const events: CloudEvent<unknown>[] = [];

    for (const o of decodedArray) {
      validateCloudEventEvent(o);

      const modelEvent: CloudEvent<unknown> & Record<string, unknown> = {
        specversion: o.specversion,
        id: o.id,
        source: o.source,
        type: o.type,
      };

      if (o.datacontenttype !== undefined) {
        modelEvent.datacontenttype = o.datacontenttype;
      }

      if (o.dataschema !== undefined) {
        modelEvent.dataschema = o.dataschema;
      }

      if (o.subject !== undefined) {
        modelEvent.subject = o.subject;
      }

      if (o.time !== undefined) {
        modelEvent.time = new Date(o.time);
      }

      if (o.data !== undefined) {
        modelEvent.data = o.data;
      }

      // If the data the event represents binary, it is encoded as base64 text in a different property on the event and we need to transform it.
      const decodedData =
        o.data_base64 === undefined || o.data_base64 === null
          ? o.data_base64
          : stringToUint8Array(o.data_base64, "base64");
      // The mapper allowed an own dataBase64 attribute to override the decoded wire value.
      const binaryData = Object.hasOwn(o, "dataBase64") ? o.dataBase64 : decodedData;
      if (binaryData !== undefined) {
        if (o.data !== undefined) {
          throw new TypeError("event contains both a data and data_base64 field");
        }

        if (!(binaryData instanceof Uint8Array)) {
          throw new TypeError("event data_base64 property is not an instance of Uint8Array");
        }

        modelEvent.data = binaryData;
      }

      // Build the "extensionsAttributes" property bag by removing all known top level properties.
      const extensionAttributes = Object.fromEntries(Object.entries(o));
      // Preserve the mapper's wire-cased metadata, including inherited values but not undefined ones.
      for (const propName of ["specversion", "dataschema", "datacontenttype"]) {
        if (o[propName] !== undefined) {
          extensionAttributes[propName] = o[propName];
        } else {
          delete extensionAttributes[propName];
        }
      }
      for (const propName of cloudEventReservedPropertyNames) {
        delete extensionAttributes[propName];
      }
      delete extensionAttributes.dataBase64;
      delete extensionAttributes.data_base64;

      // If any properties remain, copy them to the model.
      if (Object.keys(extensionAttributes).length > 0) {
        modelEvent.extensionAttributes = extensionAttributes;
      }

      events.push(modelEvent);
    }

    return events;
  }
}
