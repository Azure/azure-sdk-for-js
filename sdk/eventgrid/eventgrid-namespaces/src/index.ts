// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  type BrokerProperties,
  type AcknowledgeResult,
  type FailedLockToken,
  type ReleaseResult,
  type RejectResult,
  type ReleaseDelay,
  KnownReleaseDelay,
  type RenewLocksResult,
  type AcknowledgeCloudEventsOptionalParams as AcknowledgeEventsOptionalParams,
  type ReceiveCloudEventsOptionalParams as ReceiveEventsOptionalParams,
  type RejectCloudEventsOptionalParams as RejectEventsOptionalParams,
  type RenewCloudEventLocksOptionalParams as RenewEventLocksOptionalParams,
  type PublishCloudEventsOptionalParams as SendEventsOptionalParams,
  type PublishCloudEventOptionalParams as SendEventOptionalParams,
} from "./generated/index.js";

export { EventGridSenderClient } from "./eventGridSenderClient.js";

export { EventGridReceiverClient } from "./eventGridReceiverClient.js";

export type { EventGridClientOptionalParams as EventGridClientOptions } from "./generated/index.js";

export { OperationOptions } from "@azure-rest/core-client";

export type {
  CloudEvent,
  SendEventsOptions,
  ReceiveResult,
  ReceiveDetails,
  ReceiveEventsOptions,
  AcknowledgeEventsOptions,
  ReleaseEventsOptions,
  RejectEventsOptions,
  RenewEventLocksOptions,
  EventGridSenderClientOptions,
  EventGridReceiverClientOptions,
} from "./models.js";

export { EventGridDeserializer } from "./consumer.js";
