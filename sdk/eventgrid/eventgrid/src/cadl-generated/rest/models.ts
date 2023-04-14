// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Properties of an event published to an Azure Messaging EventGrid Namespace topic using the CloudEvent 1.0 Schema. */
export interface CloudEventEvent {
  /** An identifier for the event. The combination of id and source must be unique for each distinct event. */
  id: string;
  /** Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event. */
  source: string;
  /** Event data specific to the event type. */
  data?: Object;
  /** Event data specific to the event type, encoded as a base64 string. */
  data_base64?: string;
  /** Type of event related to the originating occurrence. */
  type: string;
  /** The time (in UTC) the event was generated, in RFC3339 format. */
  time?: Date | string;
  /** The version of the CloudEvents specification which the event uses. */
  specversion: string;
  /** Identifies the schema that data adheres to. */
  dataschema?: string;
  /** Content type of data value. */
  datacontenttype?: string;
  /** This describes the subject of the event in the context of the event producer (identified by source). */
  subject?: string;
}

export interface Object {}

/** LockToken information. */
export interface LockToken {
  /** The token used to lock the event. */
  lockToken: string;
}

/** Lock token input formatting. */
export interface LockTokenInput {
  /** LockToken */
  lockTokens: string[];
}
