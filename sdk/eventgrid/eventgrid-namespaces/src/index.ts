// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  BrokerProperties,
  AcknowledgeResult,
  FailedLockToken,
  ReleaseResult,
  RejectResult,
  PublishCloudEventsOptions as SendEventsOptions,
  ReceiveCloudEventsOptions as ReceiveEventsOptions,
  AcknowledgeCloudEventsOptions as AcknowledgeEventsOptions,
  ReleaseCloudEventsOptions as ReleaseEventsOptions,
  RejectCloudEventsOptions as RejectEventsOptions,
  ReleaseDelay,
  RenewCloudEventLocksOptions as RenewEventLocksOptions,
  RenewCloudEventLocksResult,
} from "./cadl-generated/models";

export { EventGridSenderClient } from "./eventGridSenderClient";

export { EventGridReceiverClient } from "./eventGridReceiverClient";

export { EventGridClientOptions } from "./cadl-generated";

export { PublishResultOutput } from "./cadl-generated/rest";

export { OperationOptions } from "@azure-rest/core-client";

export { CloudEvent, SendEventOptions, ReceiveResult, ReceiveDetails } from "./models";

export { EventGridDeserializer } from "@azure/eventgrid";
