// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** Properties of an event published to an Azure Messaging EventGrid Namespace topic using the CloudEvent 1.0 Schema. */
export interface CloudEventOutput {
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
  /** The token of the lock on the event. */
  lockToken: string;
  /** The attempt count for delivering the event. */
  deliveryCount: number;
}

/** The result of the Acknowledge operation. */
export interface AcknowledgeResultOutput {
  /** Array of FailedLockToken for failed cloud events. Each FailedLockToken includes the lock token along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens for the successfully acknowledged cloud events. */
  succeededLockTokens: string[];
}

/** Failed LockToken information. */
export interface FailedLockTokenOutput {
  /** The lock token of an entry in the request. */
  lockToken: string;
  /** Error information of the failed operation result for the lock token in the request. */
  error: ErrorModel;
}

/** The result of the Release operation. */
export interface ReleaseResultOutput {
  /** Array of FailedLockToken for failed cloud events. Each FailedLockToken includes the lock token along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens for the successfully released cloud events. */
  succeededLockTokens: string[];
}

/** The result of the Reject operation. */
export interface RejectResultOutput {
  /** Array of FailedLockToken for failed cloud events. Each FailedLockToken includes the lock token along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens for the successfully rejected cloud events. */
  succeededLockTokens: string[];
}

/** The result of the RenewLock operation. */
export interface RenewCloudEventLocksResultOutput {
  /** Array of FailedLockToken for failed cloud events. Each FailedLockToken includes the lock token along with the related error information (namely, the error code and description). */
  failedLockTokens: Array<FailedLockTokenOutput>;
  /** Array of lock tokens for the successfully renewed locks. */
  succeededLockTokens: string[];
}
