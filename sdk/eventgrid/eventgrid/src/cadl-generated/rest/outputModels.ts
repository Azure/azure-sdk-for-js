// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Properties of an event published to an Azure Messaging EventGrid Namespace topic using the CloudEvent 1.0 Schema. */
export interface CloudEventOutput extends Record<string, unknown> {
  /** An identifier for the event. The combination of id and source must be unique for each distinct event. */
  id: string;
  /** Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event. */
  source: string;
  /** Event data specific to the event type. */
  data?: any;
  /** Event data specific to the event type, encoded as a base64 string. */
  data_base64?: string;
  /** Type of event related to the originating occurrence. */
  type: string;
  /** The time (in UTC) the event was generated, in RFC3339 format. */
  time?: string;
  /** The version of the CloudEvents specification which the event uses. */
  specversion: string;
  /** Identifies the schema that data adheres to. */
  dataschema?: string;
  /** Content type of data value. */
  datacontenttype?: string;
  /** This describes the subject of the event in the context of the event producer (identified by source). */
  subject?: string;
}

/** The result of the Publish operation. */
export interface PublishResultOutput {}

/** Details of the Receive operation response. */
export interface ReceiveResultOutput {
  /** Array of receive responses, one per cloud event. */
  value: Array<ReceiveDetailsOutput>;
}

/** Receive operation details per Cloud Event. */
export interface ReceiveDetailsOutput {
  /** The Event Broker details. */
  brokerProperties: BrokerPropertiesOutput;
  /** Cloud Event details. */
  event: CloudEventOutput;
}

/** Properties of the Event Broker operation. */
export interface BrokerPropertiesOutput {
  /** The token used to lock the event. */
  lockToken: string;
  /** The attempt count for delivering the event. */
  deliveryCount: number;
}

/** The result of the Acknowledge operation. */
export interface AcknowledgeResultOutput {
  /** Array of LockToken values for failed cloud events. Each LockToken includes the lock token value along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens values for the successfully acknowledged cloud events. */
  succeededLockTokens: string[];
}

/** Failed LockToken information. */
export interface FailedLockTokenOutput {
  /** LockToken value */
  lockToken: string;
  /** Error code related to the token. Example of such error codes are BadToken: which indicates the Token is not formatted correctly, TokenLost: which indicates that token is not found, and InternalServerError: For any internal server errors. */
  errorCode: string;
  /** Description of the token error. */
  errorDescription: string;
}

/** The result of the Release operation. */
export interface ReleaseResultOutput {
  /** Array of LockToken values for failed cloud events. Each LockToken includes the lock token value along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens values for the successfully released cloud events. */
  succeededLockTokens: string[];
}

/** The result of the Reject operation. */
export interface RejectResultOutput {
  /** Array of LockToken values for failed cloud events. Each LockToken includes the lock token value along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens values for the successfully rejected cloud events. */
  succeededLockTokens: string[];
}
