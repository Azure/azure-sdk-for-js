// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  BrokerProperties,
  AcknowledgeResult,
  FailedLockToken,
  ReleaseResult,
  RejectResult,
  ReleaseDelay,
  RenewLocksResult,
  AcknowledgeCloudEventsOptionalParams as AcknowledgeEventsOptionalParams,
  ReceiveCloudEventsOptionalParams as ReceiveEventsOptionalParams,
  RejectCloudEventsOptionalParams as RejectEventsOptionalParams,
  RenewCloudEventLocksOptionalParams as RenewEventLocksOptionalParams,
  PublishCloudEventsOptionalParams as SendEventsOptionalParams,
  PublishCloudEventOptionalParams as SendEventOptionalParams,
} from "./cadl-generated/models/index.js";

export { EventGridSenderClient } from "./eventGridSenderClient.js";

export { EventGridReceiverClient } from "./eventGridReceiverClient.js";

export { EventGridClientOptions } from "./cadl-generated/index.js";

export { OperationOptions } from "@azure-rest/core-client";

export {
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
  KnownReleaseDelay,
} from "./models.js";

export { EventGridDeserializer } from "./consumer.js";
