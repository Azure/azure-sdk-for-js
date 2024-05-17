// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  ReceiveResult,
  ReceiveDetails,
  BrokerProperties,
  AcknowledgeResult,
  FailedLockToken,
  ReleaseResult,
  RejectResult,
  PublishCloudEventsOptions,
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

export { CloudEvent, PublishCloudEventOptions } from "./models";

export { EventGridDeserializer } from "@azure/eventgrid";
