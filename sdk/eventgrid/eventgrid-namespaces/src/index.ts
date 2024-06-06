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
  RenewLocksResult,
  AcknowledgeCloudEventsOptionalParams as AcknowledgeEventsOptionalParams,
  ReceiveCloudEventsOptionalParams as ReceiveEventsOptionalParams,
  RejectCloudEventsOptionalParams as RejectEventsOptionalParams,
  RenewCloudEventLocksOptionalParams as RenewEventLocksOptionalParams,
  PublishCloudEventsOptionalParams as SendEventsOptionalParams,
  PublishCloudEventOptionalParams as SendEventOptionalParams,
} from "./cadl-generated/models";

export { EventGridSenderClient } from "./eventGridSenderClient";

export { EventGridReceiverClient } from "./eventGridReceiverClient";

export { EventGridClientOptions } from "./cadl-generated";

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
} from "./models";

export { EventGridDeserializer } from "@azure/eventgrid";
