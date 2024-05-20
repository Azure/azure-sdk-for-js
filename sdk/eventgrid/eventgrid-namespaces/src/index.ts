// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  BrokerProperties,
  AcknowledgeResult,
  FailedLockToken,
  ReleaseResult,
  RejectResult,
  PublishCloudEventsOptions as SendCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
  ReleaseDelay,
  RenewCloudEventLocksOptions,
  RenewCloudEventLocksResult,
} from "./cadl-generated/models";

export { EventGridNamespacesClient as EventGridClient } from "./eventGridNamespacesClient";

export { EventGridClientOptions } from "./cadl-generated";

export { PublishResultOutput } from "./cadl-generated/rest";

export { OperationOptions } from "@azure-rest/core-client";

export { CloudEvent, SendCloudEventOptions, ReceiveResult, ReceiveDetails } from "./models";

export { EventGridDeserializer } from "@azure/eventgrid";
