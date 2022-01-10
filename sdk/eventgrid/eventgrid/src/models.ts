// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The shape of the input for EventGridProducerClient#sendEventGridEvents
 */
export interface SendEventGridEventInput<T> {
  /**
   * The type of the event.
   */
  eventType: string;
  /**
   * The time the event was generated. If not provided, the current time will be used.
   */
  eventTime?: Date;
  /**
   * An unique identifier for the event. If an ID is not provided, a random UUID will be generated
   * and used.
   */
  id?: string;
  /**
   * The resource path of the event source.
   */
  topic?: string;
  /**
   * A resource path relative to the topic path.
   */
  subject: string;
  /**
   * The schema version of the data object.
   */
  dataVersion: string;
  /**
   * Event data specific to the event type.
   */
  data: T;
}

/**
 * An event in the in the Event Grid Schema.
 */
export interface EventGridEvent<T> {
  /**
   * The type of the event.
   */
  eventType: string;
  /**
   * The time the event was generated.
   */
  eventTime: Date;
  /**
   * An unique identifier for the event.
   */
  id: string;
  /**
   * The resource path of the event source.
   */
  topic?: string;
  /**
   * A resource path relative to the topic path.
   */
  subject: string;
  /**
   * The schema version of the data object.
   */
  dataVersion: string;
  /**
   * Event data specific to the event type.
   */
  data: T;
}

/**
 * * The shape of the input for EventGridProducerClient#sendCloudEvents
 */
export interface SendCloudEventInput<T> {
  /**
   * Type of event related to the originating occurrence.
   */
  type: string;
  /**
   * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
   */
  source: string;
  /**
   * An identifier for the event. The combination of id and source must be unique for each distinct event. If an ID is not provided,
   * a random UUID will be generated and used.
   */
  id?: string;
  /**
   * The time the event was generated. If not provided, the current time will be used.
   */
  time?: Date;
  /**
   * Identifies the schema that data adheres to.
   */
  dataschema?: string;
  /**
   * Content type of data value.
   */
  datacontenttype?: string;
  /**
   * Event data specific to the event type.
   */
  data?: T;
  /**
   * This describes the subject of the event in the context of the event producer (identified by source).
   */
  subject?: string;
  /**
   * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
   */
  extensionAttributes?: Record<string, unknown>;
}

/**
 * An event in the Cloud Event 1.0 schema.
 */
export interface CloudEvent<T> {
  /**
   * Type of event related to the originating occurrence.
   */
  type: string;
  /**
   * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
   */
  source: string;
  /**
   * An identifier for the event. The combination of id and source must be unique for each distinct event.
   */
  id: string;
  /**
   * The time the event was generated.
   */
  time?: Date;
  /**
   * Identifies the schema that data adheres to.
   */
  dataschema?: string;
  /**
   * Content type of data value.
   */
  datacontenttype?: string;
  /**
   * Event data specific to the event type.
   */
  data?: T;
  /**
   * This describes the subject of the event in the context of the event producer (identified by source).
   */
  subject?: string;
  /**
   * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
   */
  extensionAttributes?: Record<string, unknown>;
}

/**
 * Property names defined by the CloudEvents 1.0 specification, these may not be reused as the names of extension properties.
 */
export const cloudEventReservedPropertyNames = [
  "specversion",
  "id",
  "source",
  "type",
  "datacontenttype",
  "dataschema",
  "subject",
  "time",
  "data",
];

/**
 * A function which provides custom logic to be used when decoding events.
 */
export type CustomEventDataDeserializer = (o: any) => Promise<any>;
