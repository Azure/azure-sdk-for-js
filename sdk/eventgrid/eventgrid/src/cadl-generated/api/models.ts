// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Properties of an event published to an Azure Messaging EventGrid Namespace topic using the CloudEvent 1.0 Schema. */
export interface CloudEventEvent {
  /** An identifier for the event. The combination of id and source must be unique for each distinct event. */
  id: string;
  /** Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event. */
  source: string;
  /** Event data specific to the event type. */
  data?: object;
  /** Event data specific to the event type, encoded as a base64 string. */
  dataBase64?: string;
  /** Type of event related to the originating occurrence. */
  type: string;
  /** The time (in UTC) the event was generated, in RFC3339 format. */
  time?: Date;
  /** The version of the CloudEvents specification which the event uses. */
  specversion: string;
  /** Identifies the schema that data adheres to. */
  dataschema?: string;
  /** Content type of data value. */
  datacontenttype?: string;
  /** This describes the subject of the event in the context of the event producer (identified by source). */
  subject?: string;
}

/** */
export interface ReceiveResponse {
  /** Array of receive responses, one per cloud event. */
  value: ReceiveDetails[];
}

/** Receive operation details per Cloud Event. */
export interface ReceiveDetails {
  /** The Event Broker details. */
  brokerProperties: BrokerProperties;
  /** Cloud Event details. */
  event: CloudEventEvent;
}

/** Properties of the Event Broker operation. */
export interface BrokerProperties {
  /** The token used to lock the event. */
  lockToken: LockToken;
}

/** LockToken information. */
export interface LockToken {
  /** The token used to lock the event. */
  lockToken: string;
}

/** Details of the LockTokens information. This is used for both Acknowledge and Release operation response. */
export interface LockTokensResponse {
  /** Array of LockToken values for failed cloud events. */
  failedLockTokens: FailedLockToken[];
  /** Array of LockToken values for succeeded cloud events. */
  succeededLockTokens: string[];
}

/** Failed LockToken information. */
export interface FailedLockToken {
  /** LockToken value */
  lockToken: LockToken;
  /** Error code */
  errorCode: number;
  /** Description of the error */
  errorDescription: string;
}

/** Lock token input formatting. */
export interface LockTokenInput {
  /** LockToken */
  lockTokens: string[];
}
