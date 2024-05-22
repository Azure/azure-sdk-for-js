// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  BrokerProperties,
  AcknowledgeResult,
  FailedLockToken,
  ReleaseResult,
  RejectResult,
  ReleaseDelay,
  RenewCloudEventLocksResult,
  AcknowledgeCloudEventsOptions,
  ReceiveCloudEventsOptions,
  RejectCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RenewCloudEventLocksOptions,
  PublishCloudEventsOptions,
} from "./cadl-generated/models";

export { EventGridSenderClient } from "./eventGridSenderClient";

export { EventGridReceiverClient } from "./eventGridReceiverClient";

export { EventGridClientOptions } from "./cadl-generated";

export { OperationOptions } from "@azure-rest/core-client";

export {
  CloudEvent,
  SendEventOptions,
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
} from "./models";

export { EventGridDeserializer } from "@azure/eventgrid";
